import Telegraf, { ContextMessageUpdate } from 'telegraf'

export class TelegrafApiPlugin {
  
  private token: string = ''
  private telegraf: Telegraf<ContextMessageUpdate>
  constructor({ token }) {
    this.token = token
    this.telegraf = new Telegraf(token)

    this.telegraf.start((ctx) => ctx.reply('Welcome!'))
    this.telegraf.help((ctx) => ctx.reply('Send me a sticker'))
    this.telegraf.on('sticker', (ctx) => ctx.reply('👍'))
    this.telegraf.hears('hi', (ctx) => ctx.reply('Hey there'))
    this.telegraf.launch()

  }
}
