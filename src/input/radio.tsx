
import {
  o,
  $click,
  Attrs,
  e,
  $shadow,
} from 'elt'

import { $inkable } from '../ink'
import { SvgCircle } from '../svg'
import * as chk from './checkbox'
import * as cnt from './control'


export interface RadioAttributes<T> extends Attrs<HTMLButtonElement> {
  model: o.Observable<T>
  value: o.RO<T>
  disabled?: o.RO<boolean>
}


export function Radio<T>(attrs: Attrs<HTMLButtonElement> & RadioAttributes<T>) {
  const value: o.RO<T> = attrs.value
  const model: o.Observable<T> = o(attrs.model)

  const o_checked = o.merge({model: model, value: value}).tf(({model: m, value: v}) => m === v)

  function setValue() {
    if (o.get(attrs.disabled)) return
    model.set(o.get(value))
  }

  const equals = o.combine([model, value], ([m, v]) => m === v)

  let classes = {
    [chk.css_checkbox_on]: equals,
    [chk.css_checkbox_off]: equals.tf(e => !e),
  };

  return <div class={[cnt.css_control, chk.css_checkbox, classes, {[chk.css_checkbox_disabled]: attrs.disabled}]}>
      {$inkable}
      {$click(e => setValue())}
      {$shadow(<>
        <SvgCircle part="icon" checked={o_checked}/>
        {' '}
        <span part="content"><slot/></span>
      </>)}
    </div> as HTMLButtonElement

}

