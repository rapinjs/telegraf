"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
exports.Telegraf = (name, ...args) => {
    return (target, propertyKey, descriptor) => {
        const actionPath = helpers_1.getPath(target) + '/' + propertyKey;
        helpers_1.getRegistry().get('telegrafRootScenes').push({
            actionPath,
            name,
            args,
        });
    };
};
//# sourceMappingURL=telegraf.js.map