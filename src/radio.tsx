
import {
  o,
  $click,
  Renderable,
  Attrs,
  e,
} from 'elt'

import { Checkbox } from './checkbox'
import { $inkable } from './ink'
import { Control } from './control'
import { SvgCircle } from './svg'


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
    [Checkbox.css.on]: equals,
    [Checkbox.css.off]: equals.tf(e => !e),
    [Checkbox.css.disabled]: disabled
  };

  return <button disabled={attrs.disabled} class={[Control.css.control, Checkbox.css.label, classes]}>
      {$inkable}
      {$click(e => setValue())}

      <SvgCircle class={Checkbox.css.icon} checked={o_checked}/>
      {' '}
      <span class={Checkbox.css.content}>{children}</span>
    </button> as HTMLButtonElement

}

