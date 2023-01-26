
import {
  o,
  $click,
  Attrs,
  Renderable,
  If,
  e,
} from 'elt'

import { style, rule, builder as CSS } from 'osun'

import {$inkable} from '../ink'
import { theme as T } from '../colors'
import { SvgCheckBox } from '../svg'
import * as control from './control'


export interface CheckboxAttributes extends Attrs<HTMLButtonElement> {
  model: o.Observable<boolean> | o.Observable<boolean | null>
  disabled?: o.RO<boolean>
}


export function Checkbox(attrs: Attrs<HTMLButtonElement> & CheckboxAttributes, children: Renderable[]) {

  const o_model = o(attrs.model) as o.Observable<boolean>

  function toggle() {
    if (o.get(attrs.disabled)) return
    o_model.set(!o_model.get())
  }

  let classes = {
    [css_checkbox_on]: o_model,
    [css_checkbox_off]: o_model.tf<boolean>((m: boolean | null) => m == false),
    [css_checkbox_disabled]: attrs.disabled
  }

  return <button disabled={attrs.disabled} class={[css_checkbox_label, control.css_control, classes]}>
    {$inkable()}
    {$click(e => {
      e.stopPropagation()
      toggle()
    })}
    <SvgCheckBox class={css_checkbox_icon} checked={o_model}/>
    {If(children.length > 0, () => <span class={[css_checkbox_content]}>{children}</span>)}
  </button> as HTMLButtonElement

}


export function Toggle({model, disabled}: Attrs<HTMLButtonElement> & {model: o.Observable<boolean>, disabled?: o.RO<boolean>}, ch: Renderable[]) {
  return <button disabled={disabled} class={[
    css_toggle_container,
    o.tf(model, m => `${CSS.color(m ? T.bg : T.tint50)} ${m ? css_toggle_on : css_toggle_off}`)
  ]}
  >
    {$inkable()}
    {$click(e => {
      e.stopPropagation()
      model.set(!model.get())
    })}
    {ch}
  </button> as HTMLButtonElement
}



export const css_checkbox_on = style('on', control.css_control_active)
export const css_checkbox_off = style('off')
export const css_checkbox_disabled = style('disabled', T.disabled)

export const css_checkbox_label = style('label', CSS.border(T.tint14).background(T.bg).cursorPointer.gap(8).alignCenter, {
  display: "inline-flex"
})
rule`${css_checkbox_label}[disabled]`(CSS.border(T.fg14).background(T.bg).color(T.fg50))
rule`${css_checkbox_label}[disabled] {['i', 'i::before', 'span']}`(CSS.color(T.fg50))

export const css_checkbox_content = style('content', CSS.absoluteGrow(1))

export const css_checkbox_icon = style('icon', CSS.color(T.tint))
rule`${[css_checkbox_off, css_checkbox_disabled]} ${css_checkbox_icon}`(CSS.color(T.tint50))


export const css_toggle_container = style('toggle-container', CSS.border(T.tint14).background(T.bg).cursorPointer, control.css_control)
export const css_toggle_on = style('toggle-on', CSS.border(T.tint).background(T.tint75))
export const css_toggle_off = style('toggle-off', { boxShadow: `inset 0 0 3px ${T.tint14}` })
