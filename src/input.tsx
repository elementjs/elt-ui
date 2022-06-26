
import {
  o,
  $on,
  $bind,
  Attrs,
  Renderable,
  e,
  $observe,
  node_observe
} from 'elt'

import S from './styling'
import { style, rule } from 'osun'
import { Control } from './control'
import { theme as T } from './colors'

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
  const type = attrs.type ?? "text"

  const res = <input
    {...other_attrs}
    placeholder={o_placeholder}
    id={id}
    class={[Control.css.control, Input.css.input, {
       [Input.css.focused]: o_focused,
       [Input.css.empty_filled]: o_unfocus_and_filled,
       [Input.css.hidden_placeholder]: o.tf(placeholder, p => !p?.trim()),
       [Input.css.disabled]: attrs.disabled
    }]}
    // class={Input.element}
    type="text"
  >
    {/* {attrs.type === "number" ? $bind.number(attrs.model) : $bind.string(attrs.model)} */}
    {node => {
      node_observe(node, o.join(o_focused, attrs.model, transformer), ([foc, value, transformer]) => {
        lock(() => {
          if (!foc && transformer) {
            node.value = transformer(value)
          } else {
            node.value = value ?? ""
          }
        })
      }, undefined, true)

      node.addEventListener("input", ev => {
        lock(() => {
          if (type === "number") {
            const m = re_number.exec(node.value)
            if (m) {
              node.value = m[0]
              model.set(Number(m[0]))
            }
          } else {
            model.set(node.value as any)
          }
        })
      })
    }}
    {$on("focusout", () => o_focused.set(false))}
    {$on("focusin", () => o_focused.set(true))}
  </input> as HTMLInputElement

  return res
}

Input.css = new class {
  focused = style('focused', Control.css.active)
  empty_filled = style('empty-unfocused')
  input = style('input', S.box.border(T.tint14) )
  hidden_placeholder = style('hidden-placeholder')
  disabled = style("input-disabled", { color: T.fg50 })

  constructor() {
    rule`${this.input}::placeholder`(S.text.color(T.fg14).size('1em').box.padding(0).margin(0).inlineBlock, {
      lineHeight: 'normal'
    })
    rule`${this.hidden_placeholder}::placeholder`(S.text.color(T.bg))
  }
}
