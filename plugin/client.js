const STYLE = [
  '.dsh-pet-root { position: fixed; z-index: 1000; width: 0; height: 0; pointer-events: none; }',
  '.dsh-pet-box { position: absolute; left: 0; top: 0; width: 84px; height: 84px; pointer-events: auto; user-select: none; -webkit-user-select: none; perspective: 600px; }',
  '.dsh-pet-body { position: absolute; left: 10px; top: 14px; width: 64px; height: 64px; cursor: grab; touch-action: none; filter: drop-shadow(0 5px 4px rgba(35, 48, 80, 0.2)); will-change: left, top, filter; }',
  '.dsh-pet-body:active { cursor: grabbing; }',
  '.dsh-pet-ghost { position: absolute; width: 64px; height: 64px; border-radius: 50%; pointer-events: none; filter: blur(2px); display: none; }',
  '.dsh-pet-figure { display: block; width: 100%; height: 100%; overflow: visible; }',
  '.dsh-pet-eye { fill: #fffdf7; }',
  '.dsh-pet-bodypath { transition: fill 0.22s; }',
  '.dsh-pet-part { fill: none; stroke-width: 12; stroke-linecap: round; stroke-linejoin: round; }',
  '.dsh-pet-body.dsh-pet-act-bounce { animation: dshPetBounce 0.85s ease; }',
  '.dsh-pet-body.dsh-pet-act-tilt { animation: dshPetTilt 0.8s ease; }',
  '.dsh-pet-body.dsh-pet-act-scan .dsh-pet-eyes { animation: dshPetScan 0.8s ease; }',
  '.dsh-pet-body.dsh-pet-act-turn { animation: dshPetTurn 0.9s ease; }',
  '.dsh-pet-body.dsh-pet-act-pulse { animation: dshPetPulse 0.9s ease; }',
  '.dsh-pet-body.dsh-pet-act-glitch { animation: dshPetGlitch 0.55s steps(2); }',
  '.dsh-pet-heart { position: absolute; left: 34px; top: 6px; font-size: 14px; color: #ff7da8; pointer-events: none; animation: dshPetHeart 0.9s ease-out forwards; }',
  '.dsh-pet-bubble { position: absolute; right: -8px; bottom: 100px; min-width: 150px; max-width: 224px; padding: 8px 10px; border: 1px solid var(--dsw-alias-border-inverted, rgba(0, 0, 0, 0.08)); border-radius: 12px; background: var(--dsw-specific-menu, #ffffff); box-shadow: var(--dsw-shadow-lv3, 0 8px 24px rgba(0, 0, 0, 0.18)); color: var(--dsw-alias-label-primary, #20242e); font-size: 12px; line-height: 17px; pointer-events: none; }',
  '.dsh-pet-bubble::after { content: ""; position: absolute; right: 28px; bottom: -6px; width: 10px; height: 10px; background: inherit; border-right: 1px solid var(--dsw-alias-border-inverted, rgba(0, 0, 0, 0.08)); border-bottom: 1px solid var(--dsw-alias-border-inverted, rgba(0, 0, 0, 0.08)); transform: rotate(45deg); }',
  '.dsh-pet-bubble-title { font-weight: 600; }',
  '.dsh-pet-bubble-line { margin-top: 2px; color: var(--dsw-alias-label-secondary, #3a4150); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
  '.dsh-pet-bubble-sub { margin-top: 1px; color: var(--dsw-alias-label-caption, #7a8292); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
  '.dsh-pet-bar { height: 4px; margin-top: 6px; border-radius: 2px; background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, 0.06)); overflow: hidden; }',
  '.dsh-pet-bar-fill { height: 100%; width: 45%; border-radius: 2px; background: linear-gradient(90deg, #6f93ff, #a5b8ff, #6f93ff); background-size: 200% 100%; animation: dshPetShimmer 1.2s linear infinite; }',
  '.dsh-pet-ctls { position: absolute; left: 6px; top: 86px; display: flex; gap: 4px; opacity: 0; transition: opacity 160ms ease; pointer-events: none; }',
  '.dsh-pet-box:hover .dsh-pet-ctls, .dsh-pet-ctls:focus-within { opacity: 1; pointer-events: auto; }',
  '.dsh-pet-ctl { width: 24px; height: 24px; display: grid; place-items: center; padding: 0; border: 1px solid var(--dsw-alias-border-inverted, rgba(0, 0, 0, 0.08)); border-radius: 12px; background: var(--dsw-specific-menu, #ffffff); color: var(--dsw-alias-label-secondary, #3a4150); font-size: 12px; cursor: pointer; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12); }',
  '.dsh-pet-ctl:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, 0.05)); }',
  '.dsh-pet-ctl-on { background: var(--dsw-alias-state-info-primary, #4a7dff); color: #ffffff; }',
  '.dsh-pet-ctl-on:hover { background: var(--dsw-alias-state-info-primary, #4a7dff); }',
  '.dsh-pet-notice { position: absolute; left: 6px; top: 116px; max-width: 200px; padding: 4px 8px; border-radius: 8px; background: var(--dsw-specific-menu, #ffffff); border: 1px solid var(--dsw-alias-border-inverted, rgba(0, 0, 0, 0.08)); color: var(--dsw-alias-label-secondary, #3a4150); font-size: 11px; line-height: 15px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12); }',
  '.dsh-pet-reshow { position: fixed; right: 14px; bottom: 14px; z-index: 1000; width: 36px; height: 36px; padding: 0; border: 1px solid var(--dsw-alias-border-inverted, rgba(0, 0, 0, 0.08)); border-radius: 50%; background: var(--dsw-specific-menu, #ffffff); font-size: 17px; cursor: pointer; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18); pointer-events: auto; }',
  '.dsh-pet-panel-wrap { position: fixed; z-index: 1001; width: 244px; }',
  '.dsh-pet-panel { padding: 10px; border: 1px solid var(--dsw-alias-border-inverted, rgba(0, 0, 0, 0.08)); border-radius: 14px; background: var(--dsw-specific-menu, #ffffff); box-shadow: var(--dsw-shadow-lv3, 0 10px 30px rgba(0, 0, 0, 0.2)); color: var(--dsw-alias-label-primary, #20242e); font-size: 12px; pointer-events: auto; }',
  '.dsh-pet-panel-title { font-weight: 600; }',
  '.dsh-pet-panel-label { display: flex; align-items: baseline; justify-content: space-between; margin: 9px 2px 6px; }',
  '.dsh-pet-panel-label strong { font-size: 12px; }',
  '.dsh-pet-panel-label span { color: var(--dsw-alias-label-tertiary, #74766e); font-size: 10px; }',
  '.dsh-pet-panel-row { display: flex; flex-wrap: wrap; gap: 5px; }',
  '.dsh-pet-dot { position: relative; flex: 0 0 30px; width: 30px; height: 30px; padding: 0; border: 0; border-radius: 50%; background: var(--swatch); cursor: pointer; }',
  '.dsh-pet-dot-on::after { content: ""; position: absolute; inset: -4px; border: 2px solid var(--dsw-alias-label-tertiary, #74766e); border-radius: 50%; }',
  '.dsh-pet-shapebtn { flex: 0 0 42px; width: 42px; height: 42px; padding: 4px; border: 1px solid transparent; border-radius: 11px; background: transparent; cursor: pointer; }',
  '.dsh-pet-shapebtn svg { display: block; width: 100%; height: 100%; }',
  '.dsh-pet-shapebtn-on { border-color: var(--dsw-alias-label-tertiary, #74766e); background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, 0.05)); }',
  '.dsh-pet-togglebtn { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }',
  '.dsh-pet-togglebtn button { min-width: 0; min-height: 44px; padding: 5px 2px; border: 1px solid var(--dsw-alias-border-inverted, rgba(0, 0, 0, 0.1)); border-radius: 11px; background: transparent; color: var(--dsw-alias-label-tertiary, #74766e); cursor: pointer; }',
  '.dsh-pet-togglebtn button[aria-pressed=true] { border-color: var(--dsw-alias-state-info-primary, #2f86ed); background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, 0.05)); color: var(--dsw-alias-label-primary, #20242e); box-shadow: inset 0 0 0 1px var(--dsw-alias-state-info-primary, #2f86ed); }',
  '.dsh-pet-togglebtn b { display: block; height: 17px; color: var(--dsw-alias-state-info-primary, #2f86ed); font-size: 15px; font-weight: 400; }',
  '.dsh-pet-togglebtn span { display: block; margin-top: 1px; font-size: 9px; white-space: nowrap; }',
  '.dsh-pet-reset { margin-top: 10px; width: 100%; padding: 6px; border: 1px solid var(--dsw-alias-border-inverted, rgba(0, 0, 0, 0.1)); border-radius: 8px; background: transparent; color: var(--dsw-alias-label-secondary, #3a4150); cursor: pointer; }',
  '.dsh-pet-settings { padding: 16px; max-width: 460px; }',
  '.dsh-pet-settings-preview { display: grid; place-items: center; padding: 14px; border: 1px dashed var(--dsw-alias-border-inverted, rgba(0, 0, 0, 0.12)); border-radius: 14px; }',
  '.dsh-pet-preview-figure { width: 150px; height: 150px; filter: drop-shadow(0 11px 9px rgba(35, 48, 80, 0.2)); perspective: 600px; }',
  '.dsh-pet-settings-foot { margin-top: 12px; color: var(--dsw-alias-label-tertiary, #7a8292); font-size: 11px; line-height: 16px; }',
  '@keyframes dshPetBounce { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(-34px) scale(0.96, 1.04); } 65% { transform: translateY(4px) scale(1.05, 0.94); } }',
  '@keyframes dshPetTilt { 35% { transform: rotate(-19deg) translate(-8px, 5px); } 70% { transform: rotate(8deg); } }',
  '@keyframes dshPetScan { 0%, 100% { transform: translate(0); } 30% { transform: translate(-24px, 2px); } 70% { transform: translate(24px, -2px); } }',
  '@keyframes dshPetTurn { 0%, 100% { transform: rotateY(0); } 48% { transform: rotateY(180deg) scale(0.82); } }',
  '@keyframes dshPetPulse { 0%, 100% { transform: scale(1); } 35% { transform: scale(1.08, 0.92); } 65% { transform: scale(0.94, 1.08); } }',
  '@keyframes dshPetGlitch { 0%, 100% { transform: translate(0); } 25% { transform: translate(-9px, 3px); filter: drop-shadow(8px 0 #e36f3d); } 50% { transform: translate(10px, -3px); filter: drop-shadow(-8px 0 #79e2d0); } 75% { transform: translate(-4px, 1px); } }',
  '@keyframes dshPetHeart { 0% { opacity: 0; transform: translate(var(--dx, 0px), 6px) scale(0.5); } 25% { opacity: 1; } 100% { opacity: 0; transform: translate(calc(var(--dx, 0px) * 1.6), -26px) scale(1.2); } }',
  '@keyframes dshPetShimmer { to { background-position: -200% 0; } }',
  '@media (prefers-reduced-motion: reduce) { .dsh-pet-body, .dsh-pet-bar-fill, .dsh-pet-heart, .dsh-pet-eyes { animation: none !important; } }',
].join('\n')

const GROKBOT_COLORS = [
  ['cocoa', '可可棕', '#9a6737'], ['red', '活力红', '#ff3347'], ['orange', '暖橙', '#ff6a00'],
  ['amber', '琥珀', '#ff9800'], ['green', '青绿', '#08c77a'], ['teal', '湖蓝', '#08b9a9'],
  ['blue', '经典蓝', '#2f86ed'], ['purple', '梦幻紫', '#8656f6'], ['pink', '桃粉', '#ff2d8b'],
  ['black', '纯黑', '#000000'],
]
const GROKBOT_SHAPES = [
  ['blob', '原始形态', 'M228.541 114.228C228.541 130.133 225.184 145.994 218.738 160.534C212.674 174.217 203.904 186.669 193.065 196.988C155.933 232.34 99.497 238.596 55.5255 212.24C45.097 205.99 35.6851 198.072 27.7451 188.866C19.1926 178.953 12.3686 167.569 7.65781 155.351C2.60712 142.264 0 128.257 0 114.228C0 98.3219 3.35751 82.4611 9.80315 67.9215C15.8672 54.2382 24.6377 41.7862 35.4767 31.4668C72.6081 -3.88483 129.044 -10.1413 173.016 16.2153C183.444 22.4653 192.856 30.3829 200.796 39.5896C209.349 49.5018 216.173 60.8859 220.883 73.1037C225.934 86.1906 228.541 100.198 228.541 114.228Z'],
  ['pebble', '鹅卵石', 'M114 8C177 8 217 45 217 109C217 178 181 219 112 219C43 219 12 181 12 113C12 48 51 8 114 8Z'],
  ['squircle', '圆角方', 'M55 10H174Q219 10 219 55V174Q219 219 174 219H55Q10 219 10 174V55Q10 10 55 10Z'],
  ['capsule', '胶囊', 'M61 31H168C202 31 220 65 220 114C220 163 202 197 168 197H61C27 197 9 163 9 114C9 65 27 31 61 31Z'],
  ['triangle', '三角体', 'M114 9Q122 9 128 21L220 194Q227 210 207 210H21Q1 210 9 194L101 21Q106 9 114 9Z'],
  ['hex', '六边体', 'M114 5L207 58Q218 64 218 78V153Q218 167 207 173L128 218Q114 226 100 218L21 173Q10 167 10 153V78Q10 64 21 58L100 12Q114 5 114 5Z'],
  ['cloud', '云朵', 'M55 188C21 188 6 169 12 142C-1 113 20 86 51 84C61 48 96 35 124 55C151 28 195 46 195 82C226 91 235 128 213 149C214 174 193 190 165 188Z'],
  ['drop', '水滴', 'M114 5C137 42 202 103 202 151C202 196 165 222 114 222C63 222 26 196 26 151C26 103 91 42 114 5Z'],
]
const GROKBOT_PARTS = [
  ['hands', '双手', '⌁'], ['feet', '双脚', '⌄'], ['tail', '尾巴', '〜'], ['antenna', '天线', '⌃'],
]
const GROKBOT_ACCESSORIES = [
  ['straw-hat', '草帽', '◒'], ['glasses', '眼镜', '◎'], ['bowtie', '蝴蝶结', '⋈'], ['cape', '披风', '◢'],
]
const DEFAULT_APPEARANCE = { shape: 'blob', color: '#2f86ed', accessories: [], parts: [] }

function clamp(value, lo, hi) { return Math.min(Math.max(value, lo), hi) }
function ringPath(ring) { return 'M' + ring.map((p) => p[0].toFixed(2) + ' ' + p[1].toFixed(2)).join('L') + 'Z' }
function centroid(ring) { return ring.reduce((a, p) => [a[0] + p[0] / ring.length, a[1] + p[1] / ring.length], [0, 0]) }

function storageGet(key, fallback) {
  try {
    const w = typeof window !== 'undefined' ? window : null
    if (w === null || w.localStorage === undefined || w.localStorage === null) return fallback
    const raw = w.localStorage.getItem('dsh-pet:' + key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch (err) { return fallback }
}

function storageSet(key, value) {
  try {
    const w = typeof window !== 'undefined' ? window : null
    if (w === null || w.localStorage === undefined || w.localStorage === null) return
    w.localStorage.setItem('dsh-pet:' + key, JSON.stringify(value))
  } catch (err) {}
}

function tabHidden() {
  const d = typeof document !== 'undefined' ? document : null
  return d !== null && d.hidden === true
}

const appearanceListeners = new Set()
let appearance = (() => {
  const saved = storageGet('appearance', null)
  if (saved === null || typeof saved !== 'object') return { ...DEFAULT_APPEARANCE, accessories: [], parts: [] }
  const shapeOk = GROKBOT_SHAPES.some((s) => s[0] === saved.shape)
  const colorOk = GROKBOT_COLORS.some((c) => c[2] === saved.color)
  const accs = Array.isArray(saved.accessories) ? saved.accessories.filter((id) => GROKBOT_ACCESSORIES.some((a) => a[0] === id)) : []
  const parts = Array.isArray(saved.parts) ? saved.parts.filter((id) => GROKBOT_PARTS.some((p) => p[0] === id)) : []
  return {
    shape: shapeOk ? saved.shape : DEFAULT_APPEARANCE.shape,
    color: colorOk ? saved.color : DEFAULT_APPEARANCE.color,
    accessories: accs,
    parts: parts,
  }
})()
function setAppearance(next) {
  appearance = next
  storageSet('appearance', next)
  appearanceListeners.forEach((fn) => { try { fn(appearance) } catch (err) {} })
}
function subscribeAppearance(fn) {
  appearanceListeners.add(fn)
  return () => { appearanceListeners.delete(fn) }
}
function useAppearance() {
  const [value, setValue] = React.useState(appearance)
  React.useEffect(() => subscribeAppearance(setValue), [])
  return value
}
function colorOf(a) {
  return GROKBOT_COLORS.some((c) => c[2] === a.color) ? a.color : DEFAULT_APPEARANCE.color
}
function shapePathOf(a) {
  const found = GROKBOT_SHAPES.find((s) => s[0] === a.shape)
  return found === undefined ? GROKBOT_SHAPES[0][2] : found[2]
}
function toggleIn(list, id) {
  return list.indexOf(id) >= 0 ? list.filter((x) => x !== id) : list.concat([id])
}
function selectionText(items, selected, empty) {
  if (selected.length === 0) return empty
  return items.filter((i) => selected.indexOf(i[0]) >= 0).map((i) => i[1]).join('、')
}

let audioCtx = null
function ensureAudio() {
  try {
    const w = typeof window !== 'undefined' ? window : null
    if (w === null) return null
    const AC = w.AudioContext || w.webkitAudioContext
    if (AC === undefined || AC === null) return null
    if (audioCtx === null) audioCtx = new AC()
    if (audioCtx.state === 'suspended') {
      const p = audioCtx.resume()
      if (p !== null && typeof p.catch === 'function') p.catch(() => {})
    }
    return audioCtx
  } catch (err) { return null }
}

function tone(c, f0, f1, offset, duration, type, volume) {
  try {
    const t = c.currentTime + offset
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(f0, t)
    if (f1 !== null) osc.frequency.exponentialRampToValueAtTime(f1, t + duration)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
    osc.connect(gain)
    gain.connect(c.destination)
    osc.start(t)
    osc.stop(t + duration + 0.06)
  } catch (err) {}
}

function playSound(kind) {
  const c = ensureAudio()
  if (c === null) return
  if (kind === 'request') tone(c, 1150, 1350, 0, 0.07, 'sine', 0.05)
  else if (kind === 'tool') tone(c, 620, 700, 0, 0.045, 'triangle', 0.028)
  else if (kind === 'start') {
    tone(c, 523.25, 587.33, 0, 0.09, 'sine', 0.06)
    tone(c, 587.33, 783.99, 0.1, 0.12, 'sine', 0.06)
  } else if (kind === 'end') {
    tone(c, 783.99, 659.25, 0, 0.09, 'sine', 0.06)
    tone(c, 659.25, 523.25, 0.1, 0.14, 'sine', 0.06)
  } else if (kind === 'sub') tone(c, 880, 880, 0, 0.05, 'square', 0.03)
  else if (kind === 'pet') tone(c, 880, 1320, 0, 0.06, 'sine', 0.07)
  else if (kind === 'bye') tone(c, 660, 440, 0, 0.1, 'sine', 0.05)
  else if (kind === 'throw') tone(c, 300, 640, 0, 0.12, 'sine', 0.05)
  else if (kind === 'bounce') tone(c, 240, 180, 0, 0.08, 'triangle', 0.06)
}

function notificationApi() {
  const w = typeof window !== 'undefined' ? window : null
  if (w === null) return null
  const N = w.Notification
  return typeof N === 'function' ? N : null
}

function sendNotification(title, body, tag) {
  const N = notificationApi()
  if (N === null || N.permission !== 'granted') return
  try { new N(title, { body: body, tag: tag }) } catch (err) {}
}

function fmtElapsed(snap, nowMs) {
  if (snap === null || typeof snap.runStartedAt !== 'number') return ''
  const secs = Math.max(0, Math.round((nowMs - snap.runStartedAt) / 1000))
  return secs + 's'
}

function GrokbotFigure(props) {
  const { petState, data, simHolder } = props
  const appearance = useAppearance()
  const eye0Ref = React.useRef(null)
  const eye1Ref = React.useRef(null)
  const applyStateRef = React.useRef(null)
  const clipId = React.useRef('dsh-pet-clip-' + Math.random().toString(36).slice(2, 9)).current

  React.useEffect(() => {
    if (data === null || typeof data !== 'object' || data.exprs === undefined) return
    const s = {
      current: data.exprs['0'].map((r) => r.map((p) => [p[0], p[1]])),
      target: data.exprs['0'],
      exprIdx: 0,
      morph: 1,
      velocity: 0,
      last: 0,
      blinkStart: 0,
      gazeX: 0,
      gazeY: 0,
      turn: 0,
      state: 'idle',
      nextExprAt: 0,
      nextBlinkAt: 0,
    }
    if (simHolder !== undefined && simHolder !== null) simHolder.current = s
    const blinkNow = () => { s.blinkStart = performance.now() }
    const chooseExpression = (index) => {
      s.current = s.current.map((ring, e) => ring.map((p, i) => [
        p[0] + (s.target[e][i][0] - p[0]) * clamp(s.morph, 0, 1),
        p[1] + (s.target[e][i][1] - p[1]) * clamp(s.morph, 0, 1),
      ]))
      s.target = data.exprs[String(index)]
      s.exprIdx = index
      s.morph = 0
      s.velocity = 0
    }
    const applyState = (name) => {
      if (name === s.state) return
      s.state = name
      const pool = (data.pools[name] || [0]).filter((i) => data.exprs[String(i)] !== undefined)
      if (pool.length === 0) return
      const next = pool.find((i) => i !== s.exprIdx)
      chooseExpression(next !== undefined ? next : pool[0])
      const cadence = data.cadence[name]
      s.nextExprAt = performance.now() + (cadence === undefined ? 4000 : cadence[0])
      s.nextBlinkAt = performance.now() + 4600
      if (name === 'surprised') blinkNow()
    }
    applyStateRef.current = applyState
    s.nextExprAt = performance.now() + 9000
    s.nextBlinkAt = performance.now() + 4600
    let raf = 0
    const frame = (now) => {
      if (s.last === 0) s.last = now
      const dt = Math.min((now - s.last) / 1000, 0.1)
      s.last = now
      s.velocity += (-14 * s.velocity - 49 * (s.morph - 1)) * dt
      s.morph += s.velocity * dt
      if (!Number.isFinite(s.morph)) { s.morph = 1; s.velocity = 0 }
      const shown = s.current.map((ring, e) => ring.map((p, i) => [
        p[0] + (s.target[e][i][0] - p[0]) * clamp(s.morph, 0, 1),
        p[1] + (s.target[e][i][1] - p[1]) * clamp(s.morph, 0, 1),
      ]))
      let bs = 1
      if (s.blinkStart !== 0) {
        const t = (now - s.blinkStart) / 320
        if (t >= 1) { s.blinkStart = 0; bs = 1 }
        else bs = Math.max(t < 0.42 ? 1 - t / 0.42 : (t - 0.42) / 0.58, 0.04)
      }
      const rad = s.turn * Math.PI / 180
      shown.forEach((ring, i) => {
        const c = centroid(ring)
        const base = Math.asin(clamp((c[0] - 114.2705) / 105, -1, 1))
        const longitude = base + rad
        const depth = Math.cos(longitude)
        const perspective = Math.max(depth, 0.02) / Math.max(Math.cos(base), 0.02)
        const x = 114.2705 + 105 * Math.sin(longitude) + s.gazeX
        const y = c[1] + s.gazeY
        const el = i === 0 ? eye0Ref.current : eye1Ref.current
        if (el !== null) {
          el.setAttribute('d', ringPath(ring))
          el.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + clamp(perspective, 0.02, 2.4) + ' ' + bs + ') translate(' + -c[0] + ' ' + -c[1] + ')')
          el.style.opacity = depth > 0.02 ? '1' : '0'
        }
      })
      if (now >= s.nextBlinkAt) {
        if (data.blink[s.state]) blinkNow()
        s.nextBlinkAt = now + 4600
      }
      if (now >= s.nextExprAt) {
        const pool = (data.pools[s.state] || [0]).filter((i) => data.exprs[String(i)] !== undefined)
        if (pool.length > 1) {
          chooseExpression(pool[Math.floor(Math.random() * pool.length)])
        }
        const cadence = data.cadence[s.state]
        s.nextExprAt = now + (cadence === undefined ? 4000 : cadence[0])
      }
      raf = window.requestAnimationFrame(frame)
    }
    raf = window.requestAnimationFrame(frame)
    return () => {
      window.cancelAnimationFrame(raf)
      applyStateRef.current = null
      if (simHolder !== undefined && simHolder !== null && simHolder.current === s) simHolder.current = null
    }
  }, [data])

  React.useEffect(() => {
    if (applyStateRef.current !== null) applyStateRef.current(petState)
  }, [petState])

  const color = colorOf(appearance)
  const shape = shapePathOf(appearance)
  const accs = appearance.accessories
  const parts = appearance.parts
  return React.createElement('svg', { className: 'dsh-pet-figure', viewBox: '0 0 229 229', 'aria-hidden': 'true' },
    React.createElement('defs', null,
      React.createElement('clipPath', { id: clipId }, React.createElement('path', { d: shape })),
    ),
    accs.indexOf('cape') >= 0 ? React.createElement('g', { fill: '#7657d8', opacity: 0.88 },
      React.createElement('path', { d: 'M25 79Q-2 119 13 210Q65 192 90 168ZM204 79Q231 119 216 210Q164 192 139 168Z' }),
    ) : null,
    parts.indexOf('antenna') >= 0 ? React.createElement('g', { className: 'dsh-pet-part', stroke: color },
      React.createElement('path', { d: 'M114 18V-5' }),
      React.createElement('circle', { cx: 114, cy: -12, r: 8, fill: color, stroke: 'none' }),
    ) : null,
    parts.indexOf('tail') >= 0 ? React.createElement('path', { className: 'dsh-pet-part', stroke: color, d: 'M205 154C246 151 254 181 230 198C216 208 214 220 227 228' }) : null,
    parts.indexOf('hands') >= 0 ? React.createElement('g', { className: 'dsh-pet-part', stroke: color },
      React.createElement('path', { d: 'M25 132C5 136-8 148-17 165' }),
      React.createElement('path', { d: 'M204 132C224 136 237 148 246 165' }),
      React.createElement('circle', { cx: -20, cy: 170, r: 10, fill: color, stroke: 'none' }),
      React.createElement('circle', { cx: 249, cy: 170, r: 10, fill: color, stroke: 'none' }),
    ) : null,
    parts.indexOf('feet') >= 0 ? React.createElement('g', { className: 'dsh-pet-part', stroke: color },
      React.createElement('path', { d: 'M72 202V224' }),
      React.createElement('path', { d: 'M157 202V224' }),
      React.createElement('ellipse', { cx: 62, cy: 230, rx: 24, ry: 10, fill: color, stroke: 'none' }),
      React.createElement('ellipse', { cx: 167, cy: 230, rx: 24, ry: 10, fill: color, stroke: 'none' }),
    ) : null,
    React.createElement('path', { d: shape, fill: color, className: 'dsh-pet-bodypath' }),
    React.createElement('g', { clipPath: 'url(#' + clipId + ')', className: 'dsh-pet-eyes' },
      React.createElement('path', { className: 'dsh-pet-eye', ref: eye0Ref }),
      React.createElement('path', { className: 'dsh-pet-eye', ref: eye1Ref }),
    ),
    accs.indexOf('straw-hat') >= 0 ? React.createElement('g', { fill: '#e9bd57', stroke: '#b57b24', strokeWidth: 3 },
      React.createElement('path', { d: 'M63 28Q72-24 114-28Q156-24 165 28Z' }),
      React.createElement('ellipse', { cx: 114, cy: 31, rx: 91, ry: 18, fill: '#efcb70' }),
      React.createElement('path', { d: 'M64 10Q114 22 164 10L166 27Q114 38 62 27Z', fill: '#d94b5d', stroke: 'none' }),
    ) : null,
    accs.indexOf('glasses') >= 0 ? React.createElement('g', { fill: 'none', stroke: '#171813', strokeWidth: 8, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('circle', { cx: 72, cy: 108, r: 37, fill: 'rgba(255,255,255,0.12)' }),
      React.createElement('circle', { cx: 157, cy: 108, r: 37, fill: 'rgba(255,255,255,0.12)' }),
      React.createElement('path', { d: 'M109 106Q114 99 120 106' }),
      React.createElement('path', { d: 'M35 102L12 94' }),
      React.createElement('path', { d: 'M194 102L217 94' }),
    ) : null,
    accs.indexOf('bowtie') >= 0 ? React.createElement('g', { fill: '#ff2d8b', stroke: 'none' },
      React.createElement('path', { d: 'M114 172L78 151Q62 143 64 176Q65 205 82 194L114 178ZM114 172L150 151Q166 143 164 176Q163 205 146 194L114 178Z' }),
      React.createElement('circle', { cx: 114, cy: 175, r: 12 }),
    ) : null,
  )
}

function AppearancePanel() {
  const appearance = useAppearance()
  const color = colorOf(appearance)
  return React.createElement('div', { className: 'dsh-pet-panel' },
    React.createElement('div', { className: 'dsh-pet-panel-title' }, '桌宠外观'),
    React.createElement('div', { className: 'dsh-pet-panel-label' },
      React.createElement('strong', null, '颜色'),
      React.createElement('span', null, GROKBOT_COLORS.find((c) => c[2] === color) === undefined ? '' : GROKBOT_COLORS.find((c) => c[2] === color)[1]),
    ),
    React.createElement('div', { className: 'dsh-pet-panel-row' },
      GROKBOT_COLORS.map((c) => React.createElement('button', {
        key: c[0],
        type: 'button',
        title: c[1],
        'aria-label': '颜色 ' + c[1],
        'aria-pressed': String(appearance.color === c[2]),
        className: 'dsh-pet-dot' + (appearance.color === c[2] ? ' dsh-pet-dot-on' : ''),
        style: { '--swatch': c[2] },
        onClick: () => setAppearance({ ...appearance, color: c[2] }),
      })),
    ),
    React.createElement('div', { className: 'dsh-pet-panel-label' },
      React.createElement('strong', null, '形状'),
      React.createElement('span', null, GROKBOT_SHAPES.find((s) => s[0] === appearance.shape) === undefined ? '' : GROKBOT_SHAPES.find((s) => s[0] === appearance.shape)[1]),
    ),
    React.createElement('div', { className: 'dsh-pet-panel-row' },
      GROKBOT_SHAPES.map((s) => React.createElement('button', {
        key: s[0],
        type: 'button',
        title: s[1],
        'aria-label': '形状 ' + s[1],
        'aria-pressed': String(appearance.shape === s[0]),
        className: 'dsh-pet-shapebtn' + (appearance.shape === s[0] ? ' dsh-pet-shapebtn-on' : ''),
        onClick: () => setAppearance({ ...appearance, shape: s[0] }),
      }, React.createElement('svg', { viewBox: '0 0 229 229' },
        React.createElement('path', { d: s[2], fill: color }),
        React.createElement('ellipse', { cx: 87, cy: 102, rx: 9, ry: 21, fill: '#fffdf7' }),
        React.createElement('ellipse', { cx: 143, cy: 102, rx: 9, ry: 21, fill: '#fffdf7' })))),
    ),
    React.createElement('div', { className: 'dsh-pet-panel-label' },
      React.createElement('strong', null, '身体部件'),
      React.createElement('span', null, selectionText(GROKBOT_PARTS, appearance.parts, '默认无部件')),
    ),
    React.createElement('div', { className: 'dsh-pet-togglebtn' },
      GROKBOT_PARTS.map((p) => React.createElement('button', {
        key: p[0],
        type: 'button',
        title: p[1],
        'aria-label': '部件 ' + p[1],
        'aria-pressed': String(appearance.parts.indexOf(p[0]) >= 0),
        onClick: () => setAppearance({ ...appearance, parts: toggleIn(appearance.parts, p[0]) }),
      },
        React.createElement('b', null, p[2]),
        React.createElement('span', null, p[1]))),
    ),
    React.createElement('div', { className: 'dsh-pet-panel-label' },
      React.createElement('strong', null, '趣味配饰'),
      React.createElement('span', null, selectionText(GROKBOT_ACCESSORIES, appearance.accessories, '默认无配饰')),
    ),
    React.createElement('div', { className: 'dsh-pet-togglebtn' },
      GROKBOT_ACCESSORIES.map((a) => React.createElement('button', {
        key: a[0],
        type: 'button',
        title: a[1],
        'aria-label': '配饰 ' + a[1],
        'aria-pressed': String(appearance.accessories.indexOf(a[0]) >= 0),
        onClick: () => setAppearance({ ...appearance, accessories: toggleIn(appearance.accessories, a[0]) }),
      },
        React.createElement('b', null, a[2]),
        React.createElement('span', null, a[1]))),
    ),
    React.createElement('button', {
      type: 'button',
      className: 'dsh-pet-reset',
      onClick: () => setAppearance({ ...DEFAULT_APPEARANCE, accessories: [], parts: [] }),
    }, '恢复默认'),
  )
}

function useGrokData() {
  const [data, setData] = React.useState(null)
  React.useEffect(() => {
    let alive = true
    host.call('exprs', null).then((res) => {
      if (!alive || res === null || typeof res !== 'object') return
      setData(res)
    }).catch(() => {})
    return () => { alive = false }
  }, [])
  return data
}

function PetSettingsPage() {
  const data = useGrokData()
  return React.createElement('div', { className: 'dsh-pet-settings' },
    React.createElement('h3', null, '桌宠外观设置'),
    React.createElement('div', { className: 'dsh-pet-settings-preview' },
      React.createElement('div', { className: 'dsh-pet-preview-figure' },
        React.createElement(GrokbotFigure, { petState: 'idle', data: data })),
    ),
    React.createElement('div', { style: { height: 10 } }),
    React.createElement(AppearancePanel, null),
    React.createElement('div', { className: 'dsh-pet-settings-foot' },
      '外观即时同步到右下角桌宠，并自动保存。颜色 / 形状 / 身体部件 / 趣味配饰均严格移植自 LaoA-GrokBot（MIT License），配饰与部件支持多选叠穿 — 也可以在桌宠上右键直接换装。'),
  )
}

function PetView(props) {
  const { ctx } = props
  const data = useGrokData()
  const appearance = useAppearance()
  const simHolder = React.useRef({ current: null })
  const rootRef = React.useRef(null)
  const bodyRef = React.useRef(null)
  const ghostRefs = React.useRef([null, null, null])
  const posRef = React.useRef({ x: 0, y: 0 })
  const dragSamplesRef = React.useRef([])
  const flightRef = React.useRef({ active: false, vx: 0, vy: 0, last: 0, trail: [], raf: 0, lastBounceSound: 0 })
  const [snap, setSnap] = React.useState(null)
  const [pos, setPos] = React.useState(() => {
    const w = typeof window !== 'undefined' ? window : null
    const vw = w === null ? 1200 : w.innerWidth
    const vh = w === null ? 800 : w.innerHeight
    const saved = storageGet('pos', null)
    if (saved !== null && typeof saved.x === 'number' && typeof saved.y === 'number') {
      return { x: clamp(saved.x, 0, Math.max(0, vw - 84)), y: clamp(saved.y, 0, Math.max(0, vh - 84)) }
    }
    return { x: Math.max(0, vw - 100), y: Math.max(0, vh - 130) }
  })
  const [visible, setVisible] = React.useState(() => storageGet('visible', true) !== false)
  const [soundOn, setSoundOn] = React.useState(() => storageGet('sound', true) !== false)
  const [notifyOn, setNotifyOn] = React.useState(() => {
    const N = notificationApi()
    return N !== null && N.permission === 'granted' && storageGet('notify', true) !== false
  })
  const [bubbleOpen, setBubbleOpen] = React.useState(false)
  const [hearts, setHearts] = React.useState([])
  const [happyUntil, setHappyUntil] = React.useState(0)
  const [surprisedUntil, setSurprisedUntil] = React.useState(0)
  const [workingUntil, setWorkingUntil] = React.useState(0)
  const [hovering, setHovering] = React.useState(false)
  const [flying, setFlying] = React.useState(false)
  const [nowMs, setNowMs] = React.useState(() => Date.now())
  const [notice, setNotice] = React.useState(null)
  const [menu, setMenu] = React.useState(null)
  const [motionCls, setMotionCls] = React.useState('')
  const soundOnRef = React.useRef(soundOn)
  const notifyOnRef = React.useRef(notifyOn)
  const prevRunningRef = React.useRef(null)
  const prevPetStateRef = React.useRef(null)
  const dragRef = React.useRef(null)
  const heartSeqRef = React.useRef(0)
  soundOnRef.current = soundOn
  notifyOnRef.current = notifyOn
  if (!flightRef.current.active) posRef.current = pos

  const applySnap = React.useCallback((next) => {
    if (next === null || typeof next !== 'object') return
    const wasRunning = prevRunningRef.current
    const running = next.running === true
    setSnap(next)
    prevRunningRef.current = running
    if (wasRunning === null) return
    if (running && !wasRunning) {
      if (soundOnRef.current && !tabHidden()) playSound('start')
      sendNotification('DSH · 请求已开始', '正在处理请求 · 已累计 ' + next.requests + ' 次模型请求', 'dsh-pet-turn-start')
      setHappyUntil(0)
    } else if (!running && wasRunning) {
      if (soundOnRef.current && !tabHidden()) playSound('end')
      const started = typeof next.runStartedAt === 'number' ? next.runStartedAt : Date.now()
      const secs = Math.max(0, Math.round((Date.now() - started) / 1000))
      sendNotification('DSH · 请求完成', '用时 ' + secs + ' 秒 · 共 ' + next.requests + ' 次请求 · ' + next.steps + ' 步', 'dsh-pet-turn-end')
      setHappyUntil(Date.now() + 2600)
    }
  }, [])

  const flashNotice = React.useCallback((text) => {
    setNotice(text)
    ctx.timeout(() => setNotice(null), 2600)
  }, [ctx])

  const stopFlight = React.useCallback(() => {
    const f = flightRef.current
    if (!f.active) return
    f.active = false
    if (f.raf !== 0) window.cancelAnimationFrame(f.raf)
    f.raf = 0
    f.trail = []
    setFlying(false)
    if (bodyRef.current !== null) bodyRef.current.style.filter = ''
    ghostRefs.current.forEach((g) => { if (g !== null) g.style.display = 'none' })
    setPos(posRef.current)
  }, [])

  const startFlight = React.useCallback((vx, vy) => {
    const f = flightRef.current
    f.active = true
    f.vx = vx
    f.vy = vy
    f.last = performance.now()
    f.trail = []
    f.lastBounceSound = 0
    setFlying(true)
    const bounceFx = () => {
      const nowT = performance.now()
      if (soundOnRef.current && !tabHidden() && nowT - f.lastBounceSound > 140) {
        f.lastBounceSound = nowT
        playSound('bounce')
      }
      setMotionCls('dsh-pet-act-pulse')
      ctx.timeout(() => setMotionCls((cur) => (cur === 'dsh-pet-act-pulse' ? '' : cur)), 900)
    }
    const step = (now) => {
      if (!f.active) return
      const dt = Math.min((now - f.last) / 1000, 0.05)
      f.last = now
      const damping = Math.exp(-0.9 * dt)
      f.vx *= damping
      f.vy *= damping
      let x = posRef.current.x + f.vx * dt
      let y = posRef.current.y + f.vy * dt
      const w = typeof window !== 'undefined' ? window.innerWidth : 1200
      const h = typeof window !== 'undefined' ? window.innerHeight : 800
      const minX = 8
      const maxX = Math.max(8, w - 92)
      const minY = 8
      const maxY = Math.max(8, h - 92)
      if (x < minX) { x = minX; if (f.vx < 0) { f.vx = -f.vx * 0.7; if (Math.abs(f.vx) > 60) bounceFx() } }
      else if (x > maxX) { x = maxX; if (f.vx > 0) { f.vx = -f.vx * 0.7; if (Math.abs(f.vx) > 60) bounceFx() } }
      if (y < minY) { y = minY; if (f.vy < 0) { f.vy = -f.vy * 0.7; if (Math.abs(f.vy) > 60) bounceFx() } }
      else if (y > maxY) { y = maxY; if (f.vy > 0) { f.vy = -f.vy * 0.7; if (Math.abs(f.vy) > 60) bounceFx() } }
      const card = typeof document !== 'undefined' ? document.querySelector('[data-composer-card]') : null
      if (card !== null) {
        const r = card.getBoundingClientRect()
        if (r.width > 0 && r.height > 0) {
          const pLeft = x + 8
          const pTop = y + 8
          const pRight = x + 76
          const pBottom = y + 76
          if (pRight > r.left && pLeft < r.right && pBottom > r.top && pTop < r.bottom) {
            const ovL = pRight - r.left
            const ovR = r.right - pLeft
            const ovT = pBottom - r.top
            const ovB = r.bottom - pTop
            const minXo = Math.min(ovL, ovR)
            const minYo = Math.min(ovT, ovB)
            if (minXo < minYo) {
              if (ovL < ovR) { x = r.left - 76 - 8; if (f.vx > 0) { f.vx = -f.vx * 0.7; if (Math.abs(f.vx) > 60) bounceFx() } }
              else { x = r.right + 8; if (f.vx < 0) { f.vx = -f.vx * 0.7; if (Math.abs(f.vx) > 60) bounceFx() } }
            } else {
              if (ovT < ovB) { y = r.top - 76 - 8; if (f.vy > 0) { f.vy = -f.vy * 0.7; if (Math.abs(f.vy) > 60) bounceFx() } }
              else { y = r.bottom + 8; if (f.vy < 0) { f.vy = -f.vy * 0.7; if (Math.abs(f.vy) > 60) bounceFx() } }
            }
          }
        }
      }
      posRef.current = { x: x, y: y }
      if (rootRef.current !== null) {
        rootRef.current.style.left = x + 'px'
        rootRef.current.style.top = y + 'px'
      }
      const speed = Math.hypot(f.vx, f.vy)
      if (bodyRef.current !== null) {
        bodyRef.current.style.filter = 'drop-shadow(0 5px 4px rgba(35, 48, 80, 0.2)) blur(' + clamp(speed / 240, 0, 4).toFixed(2) + 'px)'
      }
      f.trail.unshift({ x: x, y: y })
      if (f.trail.length > 3) f.trail.pop()
      ghostRefs.current.forEach((g, i) => {
        if (g === null) return
        const tp = f.trail[i + 1]
        if (tp === undefined) { g.style.display = 'none'; return }
        g.style.display = 'block'
        g.style.left = (tp.x - x + 10) + 'px'
        g.style.top = (tp.y - y + 14) + 'px'
        g.style.opacity = String(0.32 - i * 0.1)
      })
      if (speed < 14) {
        f.active = false
        f.trail = []
        setFlying(false)
        if (bodyRef.current !== null) bodyRef.current.style.filter = ''
        ghostRefs.current.forEach((g) => { if (g !== null) g.style.display = 'none' })
        setPos(posRef.current)
        return
      }
      f.raf = window.requestAnimationFrame(step)
    }
    f.raf = window.requestAnimationFrame(step)
  }, [ctx])

  React.useEffect(() => () => {
    const f = flightRef.current
    if (f.active && f.raf !== 0) window.cancelAnimationFrame(f.raf)
    f.active = false
  }, [])

  React.useEffect(() => {
    const w = typeof window !== 'undefined' ? window : null
    if (w === null) return
    const unlock = () => { ensureAudio() }
    w.addEventListener('pointerdown', unlock, { capture: true, passive: true })
    w.addEventListener('keydown', unlock, { capture: true, passive: true })
    return () => {
      w.removeEventListener('pointerdown', unlock, { capture: true })
      w.removeEventListener('keydown', unlock, { capture: true })
    }
  }, [])

  React.useEffect(() => {
    let alive = true
    let seq = 0
    let first = true
    const tick = () => {
      host.call('state', { seq: seq }).then((res) => {
        if (!alive || res === null || typeof res !== 'object') return
        if (typeof res.seq === 'number') seq = res.seq
        if (res.snapshot !== null && typeof res.snapshot === 'object') applySnap(res.snapshot)
        if (Array.isArray(res.events)) {
          for (let i = 0; i < res.events.length; i += 1) {
            const ev = res.events[i]
            if (ev === null || typeof ev !== 'object') continue
            if (ev.type === 'request') {
              if (!first && soundOnRef.current && !tabHidden()) playSound('request')
              setSurprisedUntil(Date.now() + 650)
            } else if (ev.type === 'toolStart') {
              if (!first && soundOnRef.current && !tabHidden()) playSound('tool')
              setWorkingUntil(Date.now() + 1500)
            } else if (ev.type === 'subagentStart') {
              if (!first && soundOnRef.current && !tabHidden()) playSound('sub')
            }
          }
        }
        first = false
      }).catch(() => {})
    }
    tick()
    const dispose = ctx.interval(tick, 700)
    return () => { alive = false; dispose() }
  }, [applySnap, ctx])

  const running = snap !== null && snap.running === true
  React.useEffect(() => {
    if (!running) return
    const dispose = ctx.interval(() => setNowMs(Date.now()), 1000)
    return dispose
  }, [running, ctx])

  React.useEffect(() => { storageSet('pos', pos) }, [pos])

  const menuOpen = menu !== null
  React.useEffect(() => {
    if (!menuOpen) return
    const close = (event) => {
      const target = event.target
      if (target !== null && typeof target.closest === 'function' && target.closest('.dsh-pet-panel') !== null) return
      setMenu(null)
    }
    const onKey = (event) => { if (event.key === 'Escape') setMenu(null) }
    const w = typeof window !== 'undefined' ? window : null
    if (w === null) return
    w.addEventListener('pointerdown', close, { capture: true })
    w.addEventListener('keydown', onKey)
    return () => {
      w.removeEventListener('pointerdown', close, { capture: true })
      w.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const spawnHearts = React.useCallback(() => {
    heartSeqRef.current += 1
    const batch = heartSeqRef.current
    const items = [0, 1, 2].map((i) => ({ id: batch * 10 + i, dx: (i - 1) * 15, delay: i * 70 }))
    setHearts((prev) => prev.concat(items))
    ctx.timeout(() => setHearts((prev) => prev.filter((h) => Math.floor(h.id / 10) !== batch)), 1200)
  }, [ctx])

  const onPointerDown = (event) => {
    if (typeof event.button === 'number' && event.button !== 0) return
    const target = event.target
    if (target !== null && typeof target.closest === 'function' && target.closest('.dsh-pet-ctl') !== null) return
    ensureAudio()
    stopFlight()
    const s = simHolder.current.current
    if (s !== null) s.blinkStart = performance.now()
    dragRef.current = { sx: event.clientX, sy: event.clientY, ox: posRef.current.x, oy: posRef.current.y, moved: false }
    dragSamplesRef.current = [{ t: performance.now(), x: event.clientX, y: event.clientY }]
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      try { event.currentTarget.setPointerCapture(event.pointerId) } catch (err) {}
    }
  }

  const onPointerMove = (event) => {
    const drag = dragRef.current
    if (drag === null) return
    const dx = event.clientX - drag.sx
    const dy = event.clientY - drag.sy
    if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 5) return
    drag.moved = true
    const w = typeof window !== 'undefined' ? window : null
    const vw = w === null ? 1200 : w.innerWidth
    const vh = w === null ? 800 : w.innerHeight
    const next = { x: clamp(drag.ox + dx, 0, Math.max(0, vw - 84)), y: clamp(drag.oy + dy, 0, Math.max(0, vh - 84)) }
    posRef.current = next
    setPos(next)
    const nowT = performance.now()
    const samples = dragSamplesRef.current
    samples.push({ t: nowT, x: event.clientX, y: event.clientY })
    if (samples.length > 12) samples.shift()
  }

  const onPointerUp = () => {
    const drag = dragRef.current
    dragRef.current = null
    if (drag === null) return
    if (!drag.moved) {
      if (soundOnRef.current) playSound('pet')
      setBubbleOpen((open) => !open)
      spawnHearts()
      return
    }
    // 释放速度 = 最近 120ms 采样窗口的位移；最后一个采样超过 100ms 视为静止放下
    const nowT = performance.now()
    const samples = dragSamplesRef.current.filter((sp) => nowT - sp.t <= 120)
    if (samples.length < 2 || nowT - samples[samples.length - 1].t > 100) return
    const first = samples[0]
    const lastPt = samples[samples.length - 1]
    const dtms = lastPt.t - first.t
    if (dtms <= 8) return
    let vx = (lastPt.x - first.x) / dtms * 1000
    let vy = (lastPt.y - first.y) / dtms * 1000
    const speed = Math.hypot(vx, vy)
    if (speed < 120) return
    const boost = 1.35
    vx *= boost
    vy *= boost
    const boosted = Math.hypot(vx, vy)
    if (boosted > 3800) {
      const scale = 3800 / boosted
      vx *= scale
      vy *= scale
    }
    startFlight(vx, vy)
    if (soundOnRef.current && !tabHidden()) playSound('throw')
    setSurprisedUntil(Date.now() + 900)
  }

  const onBoxMove = (event) => {
    const s = simHolder.current.current
    if (s === null) return
    const rect = event.currentTarget.getBoundingClientRect()
    s.gazeX = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -0.6, 0.6) * 22
    s.gazeY = clamp((event.clientY - rect.top) / rect.height * 2 - 1, -0.6, 0.6) * 14
  }

  const onBoxLeave = () => {
    setHovering(false)
    const s = simHolder.current.current
    if (s !== null) { s.gazeX = 0; s.gazeY = 0 }
  }

  const onContextMenu = (event) => {
    event.preventDefault()
    if (typeof event.button === 'number' && event.button !== 2) return
    ensureAudio()
    stopFlight()
    const w = typeof window !== 'undefined' ? window : null
    const vw = w === null ? 1200 : w.innerWidth
    const vh = w === null ? 800 : w.innerHeight
    setMenu({
      x: clamp(event.clientX - 122, 8, Math.max(8, vw - 260)),
      y: clamp(event.clientY - 380, 8, Math.max(8, vh - 400)),
    })
  }

  const toggleSound = () => {
    const next = !soundOnRef.current
    soundOnRef.current = next
    setSoundOn(next)
    storageSet('sound', next)
    if (next) { ensureAudio(); playSound('pet') }
  }

  const toggleNotify = () => {
    const N = notificationApi()
    if (N === null) { flashNotice('此浏览器不支持桌面通知'); return }
    if (N.permission === 'denied') { flashNotice('通知被浏览器阻止：请在地址栏的站点设置里允许通知'); return }
    if (N.permission === 'granted') {
      const next = !notifyOnRef.current
      notifyOnRef.current = next
      setNotifyOn(next)
      storageSet('notify', next)
      if (next) sendNotification('DSH · 桌宠通知已开启', '每次请求开始和完成时，会通过 Chrome 向你发送 Windows 通知', 'dsh-pet-hello')
      else flashNotice('桌面通知已关闭')
      return
    }
    const done = (permission) => {
      if (permission === 'granted') {
        notifyOnRef.current = true
        setNotifyOn(true)
        storageSet('notify', true)
        sendNotification('DSH · 桌宠通知已开启', '每次请求开始和完成时，会通过 Chrome 向你发送 Windows 通知', 'dsh-pet-hello')
      } else if (permission === 'denied') {
        flashNotice('通知权限被拒绝')
      }
    }
    try {
      const result = N.requestPermission(done)
      if (result !== null && typeof result.then === 'function') result.then(done).catch(() => {})
    } catch (err) { flashNotice('无法请求通知权限') }
  }

  const hidePet = () => {
    stopFlight()
    if (soundOnRef.current) playSound('bye')
    setVisible(false)
    setBubbleOpen(false)
    storageSet('visible', false)
  }

  const showPet = () => {
    setVisible(true)
    storageSet('visible', true)
    if (soundOnRef.current) { ensureAudio(); playSound('pet') }
  }

  if (!visible) {
    return React.createElement('button', {
      type: 'button',
      className: 'dsh-pet-reshow',
      title: '显示 DSH 桌宠',
      onClick: showPet,
    }, '🐾')
  }

  const isHappy = Date.now() < happyUntil
  const nowRender = Date.now()
  const petState = flying ? 'surprised'
    : surprisedUntil > nowRender ? 'surprised'
      : isHappy ? 'happy'
        : running ? (workingUntil > nowRender ? 'working' : 'thinking')
          : hovering ? 'listening'
            : 'idle'

  React.useEffect(() => {
    const prev = prevPetStateRef.current
    prevPetStateRef.current = petState
    if (prev === null || prev === petState) return
    const map = {
      surprised: 'dsh-pet-act-glitch',
      happy: 'dsh-pet-act-bounce',
      listening: 'dsh-pet-act-tilt',
      thinking: 'dsh-pet-act-tilt',
      working: 'dsh-pet-act-scan',
    }
    const cls = map[petState] || ''
    setMotionCls(cls)
    if (cls !== '') {
      ctx.timeout(() => setMotionCls((cur) => (cur === cls ? '' : cur)), 1100)
    }
  }, [petState, ctx])

  const bodyClass = 'dsh-pet-body' + (motionCls === '' ? '' : ' ' + motionCls)
  const toolName = snap === null || snap.currentTool === null || snap.currentTool === undefined
    ? '模型推理'
    : snap.currentTool

  const bubbleChildren = []
  if (running) {
    bubbleChildren.push(React.createElement('div', { key: 'title', className: 'dsh-pet-bubble-title' }, '正在思考 · ' + fmtElapsed(snap, nowMs)))
    bubbleChildren.push(React.createElement('div', { key: 'tool', className: 'dsh-pet-bubble-line' }, '执行 ' + toolName))
    bubbleChildren.push(React.createElement('div', { key: 'stats', className: 'dsh-pet-bubble-sub' },
      '请求 ' + snap.requests + ' 次 · 第 ' + snap.steps + ' 步' + (snap.activeSubagents > 0 ? ' · 子代理 ' + snap.activeSubagents : '')))
    bubbleChildren.push(React.createElement('div', { key: 'bar', className: 'dsh-pet-bar' },
      React.createElement('div', { className: 'dsh-pet-bar-fill' })))
  } else {
    bubbleChildren.push(React.createElement('div', { key: 'title', className: 'dsh-pet-bubble-title' }, 'DSH 桌宠'))
    bubbleChildren.push(React.createElement('div', { key: 'stats', className: 'dsh-pet-bubble-line' },
      snap === null ? '正在连接…' : '就绪 · 累计 ' + snap.requests + ' 次请求 · ' + snap.steps + ' 步'))
  }

  return React.createElement(
    'div',
    { className: 'dsh-pet-root', style: { left: pos.x, top: pos.y }, ref: rootRef },
    React.createElement('div', {
      className: 'dsh-pet-box',
      onPointerEnter: () => setHovering(true),
      onPointerLeave: onBoxLeave,
      onPointerMove: onBoxMove,
    },
      (bubbleOpen || running) ? React.createElement('div', { className: 'dsh-pet-bubble' }, bubbleChildren) : null,
      hearts.map((heart) => React.createElement('span', {
        key: heart.id,
        className: 'dsh-pet-heart',
        style: { '--dx': heart.dx + 'px', animationDelay: heart.delay + 'ms' },
      }, '♥')),
      ghostRefs.current.map((_, i) => React.createElement('div', {
        key: 'ghost' + i,
        ref: (node) => { ghostRefs.current[i] = node },
        className: 'dsh-pet-ghost',
        style: { background: colorOf(appearance) },
      })),
      React.createElement(
        'div',
        {
          className: bodyClass,
          ref: bodyRef,
          role: 'img',
          'aria-label': running ? 'DSH 桌宠：正在处理请求' : 'DSH 桌宠：就绪',
          title: 'DSH 桌宠 · 左键拖动 / 快速甩出（带惯性） / 点击互动 · 右键换装',
          onPointerDown: onPointerDown,
          onPointerMove: onPointerMove,
          onPointerUp: onPointerUp,
          onPointerCancel: onPointerUp,
          onContextMenu: onContextMenu,
        },
        React.createElement(GrokbotFigure, { petState: petState, data: data, simHolder: simHolder }),
      ),
      React.createElement('div', { className: 'dsh-pet-ctls' },
        React.createElement('button', { type: 'button', className: 'dsh-pet-ctl', title: soundOn ? '关闭音效' : '开启音效', onClick: toggleSound }, soundOn ? '🔊' : '🔇'),
        React.createElement('button', { type: 'button', className: 'dsh-pet-ctl' + (notifyOn ? ' dsh-pet-ctl-on' : ''), title: '桌面通知（Chrome → Windows）', onClick: toggleNotify }, notifyOn ? '🔔' : '🔕'),
        React.createElement('button', { type: 'button', className: 'dsh-pet-ctl', title: '隐藏桌宠', onClick: hidePet }, '👋'),
      ),
      notice !== null ? React.createElement('div', { className: 'dsh-pet-notice' }, notice) : null,
    ),
    menuOpen ? React.createElement('div', { className: 'dsh-pet-panel-wrap', style: { left: menu.x, top: menu.y } },
      React.createElement(AppearancePanel, null)) : null,
  )
}

return {
  name: 'dsh-pet-client',
  inject: ['timer'],
  apply(ctx) {
    const slots = ctx.get('slots')
    if (slots === undefined) return
    ctx.effect(() => styles.insert(STYLE))
    slots.inject('shell.overlay', () => slots.register(
      { name: 'shell.overlay', id: 'dsh-pet', order: 900, label: () => 'DSH 桌宠' },
      () => React.createElement(PetView, { ctx }),
    ))
    slots.inject('settings.section', () => slots.register(
      { name: 'settings.section', id: 'dsh-pet-appearance', order: 900, label: () => '桌宠外观' },
      () => React.createElement(PetSettingsPage, null),
    ))
    console.log('desktop-pet client half mounted: Grokbot renderer + physics throw/inertia/motion-blur + appearance settings')
  },
}