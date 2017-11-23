
import {o, e, MaybeReadonlyObservable, Attrs} from 'elt'


export interface IconAttributes extends Attrs {
  name: MaybeReadonlyObservable<string>
}


export function Icon({name}: IconAttributes, content: DocumentFragment): Element {
  return e('i', {
    'class': ['zmdi', o(name).tf(name => `zmdi-${name || 'help-outline'}`)]
  })
}
