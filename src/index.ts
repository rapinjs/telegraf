import Telegraf from 'telegraf'
export * from './decorators'
import { setRegistry } from './helpers/registry'
export default class TelegrafPlugin {
  public afterInitRegistry({ registry, config }) {
    const options = {
      token: '',
      options: {},
      ...config.telegraf,
    }

    const Stage = require('telegraf/stage')
    registry.set('telegrafStage', new Stage())

    registry.set('telegraf', new Telegraf(options.token, options.options))

    registry.set('telegrafScenes', [])
    registry.set('telegrafRootScenes', [])
    const session = require('telegraf/session')
    registry.get('telegraf').use(session())

    setRegistry(registry)
  }
  public onAfterInitRouter({ registry }) {
    registry.get('telegraf').use(registry.get('telegrafStage').middleware())

    registry.get('telegrafRootScenes').forEach(({actionPath, name, args}) => {
      registry.get('telegraf')[name](...args, async ctx => {
        await registry.get('load').controller(actionPath, ctx)
      })
    })

    registry.get('telegrafScenes').forEach(({actionPath, args, name, scene}) => {
      scene[name](...args, async ctx => {
        await registry.get('load').controller(actionPath, ctx)
      })
    })

    registry.get('telegraf').startPolling()
  }
}
