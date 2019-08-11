import { getRegistry, getPath } from '../helpers'
import {includes, keys} from 'lodash'

const scenes: any = {}

export const TelegrafRegisterScene = (name: string) => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    const Scene = require('telegraf/scenes/base')

    if (!includes(keys(scenes), name)) {
      const newScene = new Scene(name)
      getRegistry().get('telegrafStage').register(newScene)
      scenes[name] = newScene
    }
  }
}

export const TelegrafScene = (nameScene: string, name: string, ...args: any[]) => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    const actionPath = getPath(target) + '/' + propertyKey
    getRegistry().get('telegrafScenes').push({
      actionPath,
      args,
      name,
      scene: scenes[nameScene],
    })
  }
}

