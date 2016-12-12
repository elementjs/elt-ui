
import {o, d, O, BasicAttributes} from 'domic'


export interface IconAttributes extends BasicAttributes {
  name: O<string>
}


export function Icon({name}: IconAttributes, content: DocumentFragment): Node {
  return d('i', {
    'class': ['zmdi', o(name).tf(name => `zmdi-${name || 'help-outline'}`)]
  })
}
