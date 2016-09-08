
import {o, c, Atom, Controller, O, BasicAttributes, Appendable} from 'carbyne';


export interface IconAttributes extends BasicAttributes {
  name: O<string>
}


export function Icon({name}: IconAttributes, content: Appendable) : Atom {
  return c('i.zmdi', {'class': o(name).tf(name => `zmdi-${name || 'help-outline'}`)})
}
