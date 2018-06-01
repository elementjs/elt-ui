
import {o, e, RO, Attrs} from 'elt'


export interface IconAttributes extends Attrs {
  name: RO<string>
}


export function Icon({name}: IconAttributes, content: DocumentFragment): Element {
  return e('i', {
    'class': ['zmdi', o(name).tf(name => `zmdi-${name || 'help-outline'}`)]
  })
}
