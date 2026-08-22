return {
  name: 'desktop-pet-host',
  inject: ['fs'],
  apply(ctx) {
    const now = () => Date.now()
    const num = (v) => typeof v === 'number' && Number.isFinite(v) ? v : null
    const str = (v) => typeof v === 'string' ? v : null

    const snapshot = {
      running: false,
      runningCount: 0,
      requests: 0,
      steps: 0,
      tools: 0,
      currentTool: null,
      lastTool: null,
      activeSubagents: 0,
      totalSubagents: 0,
      runStartedAt: null,
      runEndedAt: null,
      lastRequestAt: null,
      lastModel: null,
    }
    const agentState = new Map()
    let eventSeq = 0
    const events = []
    const push = (type, fields) => {
      eventSeq += 1
      events.push(Object.assign({ seq: eventSeq, at: now(), type: type }, fields))
      if (events.length > 256) events.splice(0, events.length - 256)
    }
    const recompute = () => {
      let running = false
      let runningCount = 0
      agentState.forEach((state) => {
        if (state.running === true) { running = true; runningCount += 1 }
      })
      const wasRunning = snapshot.running
      snapshot.running = running
      snapshot.runningCount = runningCount
      if (running && !wasRunning) {
        snapshot.runStartedAt = now()
        snapshot.runEndedAt = null
      } else if (!running && wasRunning) {
        snapshot.runEndedAt = now()
      }
    }

    ctx.on('agent/status', (payload) => {
      if (payload === null || typeof payload !== 'object') return
      const agent = payload.agent === null || typeof payload.agent !== 'object' ? null : payload.agent
      const id = str(agent === null ? null : agent.id)
      const status = payload.status === 'running' ? 'running' : payload.status === 'idle' ? 'idle' : null
      if (id === null || status === null) return
      const running = status === 'running'
      const prev = agentState.get(id)
      agentState.set(id, { running: running })
      recompute()
      if (prev === undefined || prev.running !== running) push('status', { agent: id, status: status })
    })

    ctx.on('agent/request', (payload, next) => {
      const turn = num(payload === null ? null : payload.turn)
      const step = num(payload === null ? null : payload.step)
      snapshot.requests += 1
      snapshot.lastRequestAt = now()
      push('request', { turn: turn, step: step })
      const result = next()
      if (result !== null && typeof result === 'object' && typeof result.then === 'function') {
        return result.then((config) => {
          if (config !== null && typeof config === 'object' && typeof config.model === 'string') {
            snapshot.lastModel = config.model
          }
          return config
        })
      }
      return result
    })

    ctx.on('agent/pre-step', (payload, next) => {
      const step = num(payload === null ? null : payload.step)
      snapshot.steps += 1
      push('step', { step: step })
      return next()
    })

    ctx.on('tools/execute', (exec, next) => {
      const name = str(exec === null || typeof exec !== 'object' ? null : exec.name)
      snapshot.tools += 1
      snapshot.currentTool = name
      snapshot.lastTool = name
      push('toolStart', { tool: name })
      return next()
    })

    ctx.on('tools/result', (exec) => {
      const name = str(exec === null || typeof exec !== 'object' ? null : exec.name)
      if (snapshot.currentTool === name) snapshot.currentTool = null
      push('toolEnd', { tool: name })
    })

    ctx.on('subagent/start', (info) => {
      snapshot.activeSubagents += 1
      snapshot.totalSubagents += 1
      push('subagentStart', {
        provider: str(info === null ? null : info.provider),
        id: str(info === null ? null : info.id),
      })
    })

    ctx.on('subagent/end', (info) => {
      snapshot.activeSubagents = Math.max(0, snapshot.activeSubagents - 1)
      push('subagentEnd', {
        provider: str(info === null ? null : info.provider),
        id: str(info === null ? null : info.id),
      })
    })

    ctx.effect(() => harness.handle('state', async (args) => {
      const since = num(args === null ? null : args.seq)
      const floor = since === null ? 0 : since
      const fresh = floor >= eventSeq ? [] : events.filter((ev) => ev.seq > floor).slice(-160)
      return {
        seq: eventSeq,
        snapshot: {
          running: snapshot.running,
          runningCount: snapshot.runningCount,
          requests: snapshot.requests,
          steps: snapshot.steps,
          tools: snapshot.tools,
          currentTool: snapshot.currentTool,
          lastTool: snapshot.lastTool,
          activeSubagents: snapshot.activeSubagents,
          totalSubagents: snapshot.totalSubagents,
          runStartedAt: snapshot.runStartedAt,
          runEndedAt: snapshot.runEndedAt,
          lastRequestAt: snapshot.lastRequestAt,
          lastModel: snapshot.lastModel,
        },
        events: fresh,
      }
    }))

    let exprsData = null
    let exprsError = null
    ctx.effect(() => harness.handle('exprs', async () => {
      if (exprsData !== null) return exprsData
      if (exprsError !== null) return { error: exprsError }
      // 表情数据按候选路径依次查找：DSH 进程工作目录 → 插件目录 → 开发者工作区。
      // install.ps1 会把 data/grokbot-exprs.json 复制为工作目录下的 .dsh-pet-data.json。
      const tryRead = async (candidate) => {
        try {
          const target = await ctx.fs.resolve(candidate)
          return await ctx.fs.readText(target)
        } catch (err) { return null }
      }
      const candidates = [
        '.dsh-pet-data.json',
        'plugin/data/grokbot-exprs.json',
        'D:/Files/Codes/Projects/Deepseek Harness/.dsh-pet-data.json',
      ]
      for (const candidate of candidates) {
        const text = await tryRead(candidate)
        if (text === null) continue
        exprsData = JSON.parse(text)
        break
      }
      if (exprsData === null) {
        exprsError = '未找到 GrokBot 表情数据：请运行 install.ps1，或把 plugin/data/grokbot-exprs.json 复制为 DSH 工作目录下的 .dsh-pet-data.json'
        return { error: exprsError }
      }
      return exprsData
    }))

    console.log('desktop-pet host half: observing request/tool/status events; serving Grokbot expression data from workspace file')
  },
}