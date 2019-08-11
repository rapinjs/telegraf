"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        const Stage = require('telegraf/stage');
        registry.set('telegrafStage', new Stage());
        registry.set('telegraf', new telegraf_1.default(options.token, options.options));
        registry.set('telegrafScenes', []);
        registry.set('telegrafRootScenes', []);
        const session = require('telegraf/session');
        registry.get('telegraf').use(session());
        registry_1.setRegistry(registry);
    }
    onAfterInitRouter({ registry }) {
        registry.get('telegraf').use(registry.get('telegrafStage').middleware());
        registry.get('telegrafRootScenes').forEach(({ actionPath, name, args }) => {
            registry.get('telegraf')[name](...args, (ctx) => __awaiter(this, void 0, void 0, function* () {
                yield registry.get('load').controller(actionPath, ctx);
            }));
        });
        registry.get('telegrafScenes').forEach(({ actionPath, args, name, scene }) => {
            scene[name](...args, (ctx) => __awaiter(this, void 0, void 0, function* () {
                yield registry.get('load').controller(actionPath, ctx);
            }));
        });
        registry.get('telegraf').startPolling();
    }
}
exports.default = TelegrafPlugin;
//# sourceMappingURL=index.js.map