import {getRegistry} from './registry'
export const resolverAction = async (actionPath, args) => {
  let output = {}
  output = await getRegistry()
    .get('load')
    .controller(actionPath, args)

  return output
}