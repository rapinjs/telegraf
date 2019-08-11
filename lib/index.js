"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
__export(require("./decorators"));
const registry_1 = require("./helpers/registry");
class TelegrafPlugin {
    afterInitRegistry({ registry, config }) {
        const options = Object.assign({ token: '', options: {} }, config.telegraf);
        registry.set('telegraf', new telegraf_1.default(options.token, options.options));
        const session = require('telegraf/session');
        registry.get('telegraf').use(session());
        registry_1.setRegistry(registry);
    }
    onAfterInitRouter({ registry }) {
        registry.get('telegraf').launch();
    }
}
exports.default = TelegrafPlugin;
//# sourceMappingURL=index.js.map