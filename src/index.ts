import Telegraf from 'telegraf'
export * from './decorators'
import { setRegistry } from './helpers/registry'
export default class TelegrafPlugin {
  public afterInitRegistry({ registry, config }) {
    const options = {
      token: '',
      options: {},
      ...config.telegraf
    }
    registry.set('telegraf', new Telegraf(options.token, options.options))
    const session = require('telegraf/session')
    registry.get('telegraf').use(session())

    setRegistry(registry)
  }
  public onAfterInitRouter({ registry }) {
    registry.get('telegraf').launch()
  }
}
