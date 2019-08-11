import {  getPath, getRegistry } from '../helpers'

export const Telegraf = (name: string, ...args: any[]) => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    const actionPath = getPath(target) + '/' + propertyKey
    getRegistry().get('telegrafRootScenes').push({
      actionPath,
      name,
      args,
    })
  }
}
