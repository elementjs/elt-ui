
import {
  o,
  bind,
  $on,
} from 'elt'

import { Button } from './button'
import S from './styling'
import { style, rule, CssNamespace } from 'osun'
import { Control } from './control'
import { I } from './icon'

var id_gen = 0;


export interface SearchAttributes extends E.JSX.Attrs<HTMLInputElement> {
  model: o.Observable<string>
  placeholder?: o.RO<string|null|undefined>
}

export function Search({model, placeholder}: SearchAttributes) {
  return <input placeholder={placeholder} class={[Search.element]}>
      {bind(o(model))}
      <Button class={Search.button} icon><I name='window-close'/></Button>
    </input> as HTMLInputElement
}

export namespace Search {

  export const element = style('search',
    S.box
      .positionRelative
      .noSpuriousBorders
      .noNativeAppearance
      .background(S.FG07)
      .border(S.FG14).borderRound
      .padding('8px 16px'),
    S.text.size('0.8em').color(S.FG)
  )

  rule`${element}:placeholder`(
    S.text.color(S.FG14)
  )

  export const button = style('search-btn', S.box.positionAbsolute.right(0))

}

export interface InputAttributes extends E.JSX.Attrs<HTMLInputElement> {
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


export function Input(attrs: InputAttributes, content: E.JSX.Renderable[]) {

  let id = attrs.id || `input_${id_gen++}`;

  let {
    model,
    label,
    // placeholder,
    error,
    type,
    ...other_attrs
  } = attrs

  const o_model = o(model)
  // label = label || placeholder || ''

  const o_focused: o.Observable<boolean> = o(false as boolean)

  // const o_unfocus_and_empty = o(data.model, o_focused, (value: string, focused: boolean) => !focused && !value)
  const o_unfocus_and_empty = o.merge({model: o_model, focus: o_focused})
    .tf(value => {
      var res = !value.model && !value.focus
      return res
    })

  const res = <input
    {...other_attrs}
    id={id}
    class={[Control.css.control, Input.css.input, {
       [Input.css.focused]: o_focused,
       [Input.css.empty_unfocused]: o_unfocus_and_empty,
    }]}
    // class={Input.element}
    type={type || 'text'}
  >
    {bind(o_model)}
    {$on('focusout', () => o_focused.set(false))}
    {$on('focusin', () => o_focused.set(true))}
  </input> as HTMLInputElement

  return res
}

Input.css = CssNamespace({
  focused: style('focused', S.box.border(S.TINT50)),
  empty_unfocused: style('empty-unfocused'),
  input: style('input', S.box.border(S.TINT14), {flexGrow: 1})
}, ({input}) => {
  rule`${input}::placeholder`(S.text.color(S.FG14).size('1em').box.padding(0).margin(0).inlineBlock)
})
