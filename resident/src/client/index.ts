/**
 * @deepseek-ai/dsh-client-ui-pet — Client entry.
 *
 * Pure client-side plugin: no Host half, no Remote calls.  The pet reads
 * the active session's ConversationSnapshot via useSessions/bind and
 * derives running / tool / step / turn state from it.  GrokBot expression
 * data is bundled as a JSON module (no runtime fs read).
 *
 * @module @deepseek-ai/dsh-client-ui-pet/client
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { createElement } from 'react'
import { createPetStateStore } from './store.ts'
import { PetView, PetSettingsPage } from './pet.tsx'

export const inject = ['slots', 'sessions', 'timer'] as const

export function apply(ctx: ClientContext): void {
  const store = createPetStateStore(ctx.sessions as any)

  ctx.effect(() => () => { store.dispose() }, 'ui-pet: dispose store')

  // Pet overlay in the frame-wide floating layer
  ctx.slots.inject('shell.overlay' as any, () => ctx.slots.register(
    { name: 'shell.overlay' as any, id: 'dsh-pet', order: 900, label: () => 'DSH 桌宠' },
    () => createElement(PetView, { store, ctx }),
  ))

  // Appearance settings page (sidebar → settings → section)
  ctx.slots.inject('sidebar.settings' as any, () => {
    ctx.slots.inject('settings.section' as any, () => ctx.slots.register(
      { name: 'settings.section' as any, id: 'dsh-pet-appearance', order: 900, label: () => '桌宠外观' },
      () => createElement(PetSettingsPage),
    ))
    return () => {}
  })
}
