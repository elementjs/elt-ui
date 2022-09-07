
import {
  o,
  node_add_event_listener,
  Attrs,
  Renderable,
  e,
  node_observe
} from 'elt'

import { style, rule, builder as CSS } from 'osun'
import * as cnt from './control'
import { theme as T } from '../colors'

var id_gen = 0;

export interface BaseInputAttributes extends Attrs<HTMLInputElement> {
  disabled?: o.RO<boolean>
  label?: o.RO<string>
  placeholder?: o.RO<string>
  autocomplete?: o.RO<'on' | 'off' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'email' | 'nickname' | 'current-password' | 'organization-title' | 'organization' | 'street-address' | 'country' | 'country-name' | 'bday' | 'bday-day' | 'sex' | 'url' | 'tel' | 'photo'>
  autocapitalize?: o.RO<'word' | 'words' | 'sentences' | 'sentence' | 'characters' | 'character' | 'off'>
  autocorrect?: o.RO<'on' | 'off'>
  spellcheck?: o.RO<boolean>
  autofocus?: o.RO<boolean>
  error?: o.RO<string>
  tabindex?: o.RO<number>
  transformer?: o.RO<(v: any) => string>
}

export interface NumberInputAttributes extends BaseInputAttributes {
  model: o.Observable<number> | o.Observable<number | null>
  transformer?: o.RO<(v: number) => string>
  min?: number
  max?: number
  step?: number
  type: "number"
}

export interface StringInputAttributes extends BaseInputAttributes {
  model: o.Observable<string> | o.Observable<string | null>
  transformer?: o.RO<(v: string) => string>
  type?: "text"
}


export type InputAttributes = NumberInputAttributes | StringInputAttributes

const re_number = /\d+(\.\d*)?/

export function Input(attrs: InputAttributes, content: Renderable[]) {

  let id = attrs.id || `input_${id_gen++}`;

  let {
    model,
    label,
    // placeholder,
    error,
    placeholder,
    transformer,
    ...other_attrs
  } = attrs

  const o_placeholder = o.tf(placeholder, p => p || '-')
  const o_model = model//o(model)
  // label = label || placeholder || ''

  const o_focused: o.Observable<boolean> = o(false as boolean)

  // const o_unfocus_and_empty = o(data.model, o_focused, (value: string, focused: boolean) => !focused && !value)
  const o_unfocus_and_filled = o.merge({model: o_model, focus: o_focused})
    .tf(value => {
      var res = !!value.model && !value.focus
      return res
    })

  const lock = o.exclusive_lock()

  const res = <input
    {...other_attrs}
    placeholder={o_placeholder}
    id={id}
    class={[cnt.css_control, css_input, {
       [css_input_focused]: o_focused,
       [css_input_empty_filled]: o_unfocus_and_filled,
       [css_input_hidden_placeholder]: o.tf(placeholder, p => !p?.trim()),
       [css_input_disabled]: attrs.disabled
    }]}
    // class={Input.element}
    type="text"
  >
    {/* {attrs.type === "number" ? $bind.number(attrs.model) : $bind.string(attrs.model)} */}
    {node => {
      node_observe(node, o.join(o_focused, attrs.model, transformer), ([foc, value, transformer]) => {
        lock(() => {
          if (!foc && transformer) {
            node.value = (transformer as any)(value)
          } else {
            node.value = ""+value ?? ""
          }
        })
      }, undefined, true)

      node_add_event_listener(node, "input", ev => {
        lock(() => {
          if (attrs.type === "number") {
            const m = re_number.exec(node.value)
            if (m) {
              node.value = m[0]
              attrs.model.set(Number(m[0]))
            }
          } else {
            attrs.model.set(node.value)
          }
        })
      })

      node_add_event_listener(node, "focusout", () => o_focused.set(false))
      node_add_event_listener(node, "focusin", () => o_focused.set(true))
    }}
  </input> as HTMLInputElement

  return res
}

export const css_input_focused = style('focused', cnt.css_control_active)
export const css_input_empty_filled = style('empty-unfocused')
export const css_input = style('input', CSS.border(T.tint14) )
export const css_input_hidden_placeholder = style('hidden-placeholder')
export const css_input_disabled = style("input-disabled", { color: T.fg50 })

rule`${css_input}::placeholder`(CSS.color(T.fg14).fontSize('1em').padding(0).margin(0).inlineBlock, {
  lineHeight: 'normal'
})
rule`${css_input_hidden_placeholder}::placeholder`(CSS.color(T.bg))
