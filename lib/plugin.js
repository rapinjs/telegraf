"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
class TelegrafApiPlugin {
    constructor({ token }) {
        this.token = '';
        this.token = token;
        this.telegraf = new telegraf_1.default(token);
        this.telegraf.start((ctx) => ctx.reply('Welcome!'));
        this.telegraf.help((ctx) => ctx.reply('Send me a sticker'));
        this.telegraf.on('sticker', (ctx) => ctx.reply('👍'));
        this.telegraf.hears('hi', (ctx) => ctx.reply('Hey there'));
        this.telegraf.launch();
    }
}
exports.TelegrafApiPlugin = TelegrafApiPlugin;
//# sourceMappingURL=plugin.js.map