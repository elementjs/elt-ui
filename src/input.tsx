
import {
  o,
  $on,
  $bind,
  Attrs,
  Renderable,
  e
} from 'elt'

import S from './styling'
import { style, rule, CssNamespace } from 'osun'
import { Control } from './control'

var id_gen = 0;

export interface InputAttributes extends Attrs<HTMLInputElement> {
  model: o.Observable<string>
  disabled?: o.RO<boolean>
  type?: o.RO<string>
  label?: o.RO<string>
  placeholder?: o.RO<string>
  autocomplete?: o.RO<'on' | 'off' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'email' | 'nickname' | 'current-password' | 'organization-title' | 'organization' | 'street-address' | 'country' | 'country-name' | 'bday' | 'bday-day' | 'sex' | 'url' | 'tel' | 'photo'>
  autocapitalize?: o.RO<'word' | 'words' | 'sentences' | 'sentence' | 'characters' | 'character' | 'off'>
  autocorrect?: o.RO<'on' | 'off'>
  spellcheck?: o.RO<boolean>
  autofocus?: o.RO<boolean>
  error?: o.RO<string>
  tabindex?: o.RO<number>
}


export function Input(attrs: InputAttributes, content: Renderable[]) {

  let id = attrs.id || `input_${id_gen++}`;

  let {
    model,
    label,
    // placeholder,
    error,
    type,
    placeholder,
    ...other_attrs
  } = attrs

  const o_placeholder = o.tf(placeholder, p => p || '-')
  const o_model = o(model)
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
    type={type || 'text'}
  >
    {$bind.string(o_model)}
    {$on('focusout', () => o_focused.set(false))}
    {$on('focusin', () => o_focused.set(true))}
  </input> as HTMLInputElement

  return res
}

Input.css = CssNamespace({
  focused: style('focused', Control.css.active),
  empty_filled: style('empty-unfocused'),
  input: style('input', S.box.border(S.TINT14), {flexGrow: 1}),
  hidden_placeholder: style('hidden-placeholder'),
}, ({input, hidden_placeholder}) => {
  rule`${input}::placeholder`(S.text.color(S.FG14).size('1em').box.padding(0).margin(0).inlineBlock, {
    lineHeight: 'normal'
  })
  rule`${hidden_placeholder}::placeholder`(S.text.color(S.BG))
})
