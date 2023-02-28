
import {
  o,
  $click,
  Listener,
  Attrs,
  e
} from 'elt'

import { style, rule, builder as CSS } from 'osun'

import {inker} from '../ink'
import { theme } from '../colors'

import * as control from './control'


export type ButtonStyle = "contrast" | "bordered" | "noborder"

export interface ButtonAttrs extends Attrs<HTMLButtonElement> {
  disabled?: o.RO<boolean>
  kind?: o.RO<ButtonStyle>
  click?: Listener<MouseEvent>
  icon?: o.RO<boolean>
}


export function Button(attrs : ButtonAttrs) {

  return <button
    class={[
      css_button,
      control.css_control,
      control.css_control_border,
      o.tf(attrs.kind, k =>
        k === "contrast" ? css_button_contrast :
        k === "noborder" ? css_button_no_border :
        css_button_classic
      ),
      {
        [css_button_disabled]: attrs.disabled,
        [css_button_icon]: attrs.icon,
      }
    ]}
    disabled={o.tf(attrs.disabled, val => !!val)}
  >
    {$click(event => {
      let click = o.get(attrs.click)
      if (!o.get(attrs.disabled)) {
        // in this context, this is the Node.
        inker(event)
        click && click(event)
      }
    })}
  </button> as HTMLButtonElement

}


export const css_button = style('button', CSS.inlineBlock.noSpuriousBorders.positionRelative.cursorPointer.color(theme.tint))
export const css_button_classic = style('button-classic', CSS.color(theme.tint).border(theme.tint).background(theme.bg))
export const css_button_no_border = style('button-classic', CSS.color(theme.tint).bold.uppercase.background(theme.bg).paddingLeft(0).paddingRight(0))
export const css_button_contrast = style('button-contrast', CSS.color(theme.bg).background(theme.tint).border(theme.tint))
export const css_button_icon = style('icon-button', CSS.minWidth(0).fontSize("1em").color(theme.tint))
export const css_button_disabled = style('disabled', CSS.color(theme.fg14).border(theme.fg14))

rule`${css_button}::-moz-focus-inner`({
  border: 0
})

rule`${css_button} > *`({
  pointerEvents: 'none'
})
