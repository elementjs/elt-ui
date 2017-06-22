
import {o, d, MaybeObservable, BasicAttributes} from 'domic'


export interface IconAttributes extends BasicAttributes {
  name: MaybeObservable<string>
}


export function Icon({name}: IconAttributes, content: DocumentFragment): Element {
  return d('i', {
    'class': ['zmdi', o(name).tf(name => `zmdi-${name || 'help-outline'}`)]
  })
}
