
import {
  o,
  $on,
  $bind,
  Attrs,
  Renderable,
  e
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
  transformer?: o.RO<(v: string | number) => string>
}

export interface NumberInputAttributes extends BaseInputAttributes {
  model: o.Observable<number>
  min?: number
  max?: number
  step?: number
  type: "number"
}

export interface StringInputAttributes extends BaseInputAttributes {
  model: o.Observable<string>
  type?: "text"
}


export type InputAttributes = NumberInputAttributes | StringInputAttributes


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

  const res = <input
    {...other_attrs}
    placeholder={o_placeholder}
    id={id}
    class={[Control.css.control, Input.css.input, {
       [Input.css.focused]: o_focused,
       [Input.css.empty_filled]: o_unfocus_and_filled,
       [Input.css.hidden_placeholder]: o.tf(placeholder, p => !p?.trim())
    }]}
    // class={Input.element}
    type={transformer ? o.join(attrs.type, o_focused).tf(([type, focused]) => {
      if (!focused) return type ?? "text"
      return "text"
    }) : attrs.type ?? 'text'}
  >
    {attrs.type === "number" ? $bind.number(attrs.model) : $bind.string(attrs.model)}
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

  constructor() {
    rule`${this.input}::placeholder`(S.text.color(T.fg14).size('1em').box.padding(0).margin(0).inlineBlock, {
      lineHeight: 'normal'
    })
    rule`${this.hidden_placeholder}::placeholder`(S.text.color(T.bg))
  }
}
