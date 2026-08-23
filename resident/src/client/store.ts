/**
 * Reactive store bridging the active session's ConversationSnapshot
 * to a lightweight PetState that the pet component subscribes to.
 *
 * @module @deepseek-ai/dsh-client-ui-pet/client/store
 */
import type { ConversationSnapshot } from '@deepseek-ai/dsh-client-runtime/client'
import type { SessionId } from '@deepseek-ai/dsh-api-remotes/client'

/** Derived pet state computed from the active session's ConversationSnapshot. */
export interface PetState {
  running: boolean
  currentTool: string | null
  step: number | null
  turn: number | null
  elapsedMs: number
  turnCount: number
  hasSession: boolean
}

const ZERO_STATE: PetState = {
  running: false,
  currentTool: null,
  step: null,
  turn: null,
  elapsedMs: 0,
  turnCount: 0,
  hasSession: false,
}

function derivePetState(snap: ConversationSnapshot | null): PetState {
  if (snap == null) return ZERO_STATE

  const running = snap.running === true
  const partial = snap.partial
  const step = partial?.step ?? null
  const turn = partial?.step != null ? partial.turn ?? null : null

  // Current tool: first entry from runningCalls (non-subagent)
  const firstCall = snap.runningCalls.find(
    (c) => !c.name.startsWith('subagent') && !c.name.startsWith('workflow'),
  )
  const currentTool = firstCall?.name ?? null

  // Elapsed: from the latest turn start
  let elapsedMs = 0
  if (snap.turnTimings.size > 0) {
    const entries = Array.from(snap.turnTimings.values())
    const latest = entries[entries.length - 1]
    if (latest != null) {
      elapsedMs = (latest.endTime ?? Date.now()) - latest.startTime
    }
  }

  return {
    running,
    currentTool,
    step,
    turn,
    elapsedMs,
    turnCount: snap.turnTimings.size,
    hasSession: true,
  }
}

export interface PetStateStore {
  subscribe(listener: () => void): () => void
  getSnapshot(): PetState
  dispose(): void
}

/**
 * Create a store that reactively tracks the active session's
 * ConversationSnapshot.  The store subscribes to sessions.list for the
 * current session ID, then subscribes to that session's snapshot.
 */
export function createPetStateStore(sessions: {
  list: { subscribe(cb: () => void): () => void; getSnapshot(): { current?: SessionId } | null }
  binding(id: any): { session: { subscribe(cb: () => void): () => void; getSnapshot(): ConversationSnapshot | null } } | undefined
}): PetStateStore {
  let currentId: SessionId | undefined
  let convUnsub: (() => void) | null = null
  let snapshot: PetState = ZERO_STATE
  const listeners = new Set<() => void>()

  const notify = () => { listeners.forEach((fn) => { try { fn() } catch (err) {} }) }

  function onConvUpdate() {
    const binding = currentId != null ? sessions.binding(currentId) : undefined
    const snap = binding?.session?.getSnapshot() ?? null
    const next = derivePetState(snap)
    if (next !== snapshot) {
      snapshot = next
      notify()
    }
  }

  function onListUpdate() {
    const listSnap = sessions.list.getSnapshot()
    const id = listSnap?.current
    if (id === currentId) return
    currentId = id
    convUnsub?.()
    convUnsub = null
    if (id != null) {
      const binding = sessions.binding(id)
      if (binding?.session != null) {
        convUnsub = binding.session.subscribe(onConvUpdate)
      }
    }
    onConvUpdate()
  }

  const listUnsub = sessions.list.subscribe(onListUpdate)
  // Initial read
  onListUpdate()

  return {
    subscribe(listener) {
      listeners.add(listener)
      return () => { listeners.delete(listener) }
    },
    getSnapshot() { return snapshot },
    dispose() {
      listUnsub()
      convUnsub?.()
      listeners.clear()
    },
  }
}
