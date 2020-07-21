
import {
  o,
  $click,
  Renderable,
  Attrs,
  If,
  e,
} from 'elt'

import { Checkbox } from './checkbox'
import { $inkable } from './ink'
import { Control } from './control'
import { Styling as S } from './styling'
import { style } from 'osun'
import { d } from './svg'


export interface RadioAttributes<T> extends Attrs<HTMLButtonElement> {
  model: o.Observable<T>
  value: o.RO<T>
  disabled?: o.RO<boolean>
}

export const cls_icon = style('icon', {
  height: '1em',
  fill: S.TINT50,
  verticalAlign: '-.125em'
})
export const cls_empty = style('icon-empty', {
  fill: S.BG
})


export function SvgCircle(a: Attrs<SVGSVGElement> & { checked: o.RO<boolean> }, ch: Renderable[]) {
  return <svg viewBox='0 0 14 16' class={cls_icon}>
    <path style={{fillRule: 'evenodd'}} d={d.circle(7, 8, 7).circle(7, 8, 5.5)}/>
    {/* <circle
      cx={7}
      cy={8}
      r={7}
    />
    <circle
      class={cls_empty}
      cx={7}
      cy={8}
      r={5.5}
    /> */}
    {If(a.checked, () => <circle
      cx={7}
      cy={8}
      r={3}
    />)}
    {ch}
  </svg>
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

