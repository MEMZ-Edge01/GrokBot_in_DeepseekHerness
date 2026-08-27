import { Context } from '@deepseek-ai/cordis'
import { describe, expect, it } from 'vitest'
import * as plugin from '../src/index.ts'

describe('ui-pet node plugin', () => {
  it('mounts as the host half of the browser-only plugin', async () => {
    const ctx = new Context()
    const fiber = ctx.plugin(plugin)

    await fiber.await()
    expect(typeof plugin.apply).toBe('function')
    await fiber.dispose()
  })
})
