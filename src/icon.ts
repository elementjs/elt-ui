
import {o, d, MaybeObservable, Attrs} from 'domic'


export interface IconAttributes extends Attrs {
  name: MaybeObservable<string>
}


export function Icon({name}: IconAttributes, content: DocumentFragment): Element {
  return d('i', {
    'class': ['zmdi', o(name).tf(name => `zmdi-${name || 'help-outline'}`)]
  })
}
