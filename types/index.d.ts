import oTelegraf, {ContextMessageUpdate} from 'telegraf'


declare module 'rapin' {
  interface Context {
    telegraf: oTelegraf<ContextMessageUpdate>
  }
}

export declare const Telegraf: (name: string, ...args: any[]) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void
export declare const TelegrafScene: (nameScene:string, name: string, ...args: any[]) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void

export declare const TelegrafRegisterScene: (name: string) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void