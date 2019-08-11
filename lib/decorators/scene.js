"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const lodash_1 = require("lodash");
const scenes = {};
exports.TelegrafRegisterScene = (name) => {
    return (target, propertyKey, descriptor) => {
        const Scene = require('telegraf/scenes/base');
        if (!lodash_1.includes(lodash_1.keys(scenes), name)) {
            const newScene = new Scene(name);
            helpers_1.getRegistry().get('telegrafStage').register(newScene);
            scenes[name] = newScene;
        }
    };
};
exports.TelegrafScene = (nameScene, name, ...args) => {
    return (target, propertyKey, descriptor) => {
        const actionPath = helpers_1.getPath(target) + '/' + propertyKey;
        helpers_1.getRegistry().get('telegrafScenes').push({
            actionPath,
            args,
            name,
            scene: scenes[nameScene],
        });
    };
};
//# sourceMappingURL=scene.js.map