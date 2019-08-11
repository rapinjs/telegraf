import {  getPath, getRegistry } from '../helpers'

export const Telegraf = (name: string, ...args: any[]) => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    const actionPath = getPath(target) + '/' + propertyKey
    getRegistry().get('telegraf')[name](...args, async ctx => {
      await getRegistry().get('load').controller(actionPath, ctx)
    })
  }
}
