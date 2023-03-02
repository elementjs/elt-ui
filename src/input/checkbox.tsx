
import {
  o,
  $click,
  Attrs,
  $shadow,
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


export function Checkbox(attrs: Attrs<HTMLButtonElement> & CheckboxAttributes) {

  const o_model = o(attrs.model) as o.Observable<boolean>

  function toggle() {
    if (o.get(attrs.disabled)) return
    o_model.set(!o_model.get())
  }

  let classes = {
    [css_checkbox_on]: o_model,
    [css_checkbox_off]: o_model.tf<boolean>((m: boolean | null) => m == false),
  }

  return <div class={[css_checkbox, control.css_control, classes, {[css_checkbox_disabled]: attrs.disabled}]}>
    {$inkable()}
    {$click(e => {
      e.stopPropagation()
      toggle()
    })}
    {$shadow(<>
      <SvgCheckBox part="icon" checked={o_model}/>
      {' '}
      <span part="content"><slot></slot></span>
    </>)}
  </div> as HTMLButtonElement

}

export const css_checkbox_on = style('on', control.css_control_active)
export const css_checkbox_off = style('off')
export const css_checkbox_disabled = style("disabled")

export const css_checkbox = style('label', CSS.border(T.tint14).background(T.bg).cursorPointer.gap(8).alignCenter, {
  display: "inline-flex"
})
css_checkbox.part('icon', CSS.color(T.tint), { height: "1em" })
css_checkbox.part('content', CSS.absoluteGrow(1))

rule`${css_checkbox}${css_checkbox_disabled}`(CSS.border(T.fg14).background(T.bg).color(T.fg50))
rule`${css_checkbox}${css_checkbox_disabled}{['::part(icon)', '::part(content)']}`(CSS.color(T.fg50))






export function Toggle({model, disabled}: Attrs<HTMLButtonElement> & {model: o.Observable<boolean>, disabled?: o.RO<boolean>}) {
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
  </button> as HTMLButtonElement
}


export const css_toggle_container = style('toggle-container', CSS.border(T.tint14).background(T.bg).cursorPointer, control.css_control)
export const css_toggle_on = style('toggle-on', CSS.border(T.tint).background(T.tint75))
export const css_toggle_off = style('toggle-off', { boxShadow: `inset 0 0 3px ${T.tint14}` })
