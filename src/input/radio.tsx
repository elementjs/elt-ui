
import {
  o,
  $click,
  Renderable,
  Attrs,
  e,
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


export function Radio<T>(attrs: Attrs<HTMLButtonElement> & RadioAttributes<T>, children: Renderable[]) {
  const disabled: o.ReadonlyObservable<boolean> = o(attrs.disabled||false)
  const value: o.RO<T> = attrs.value
  const model: o.Observable<T> = o(attrs.model)

  const o_checked = o.merge({model: model, value: value}).tf(({model: m, value: v}) => m === v)

  function setValue() {
    model.set(o.get(value))
  }

  const equals = o.combine([model, value], ([m, v]) => m === v)

  let classes = {
    [chk.css_checkbox_on]: equals,
    [chk.css_checkbox_off]: equals.tf(e => !e),
    [chk.css_checkbox_disabled]: disabled
  };

  return <button disabled={attrs.disabled} class={[cnt.css_control, chk.css_checkbox_label, classes]}>
      {$inkable}
      {$click(e => setValue())}

      <SvgCircle class={chk.css_checkbox_icon} checked={o_checked}/>
      {' '}
      <span class={chk.css_checkbox_content}>{children}</span>
    </button> as HTMLButtonElement

}

