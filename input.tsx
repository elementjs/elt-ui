
import {
  o,
  bind,
  DisplayIf,
  Attrs,
  O,
  RO,
  Observable
} from 'elt';

import {Button} from './button'


var id_gen = 0;


export interface SearchAttributes extends Attrs {
  model: O<string>
  placeholder?: RO<string|null|undefined>
}

export function Search({model, placeholder}: SearchAttributes) {
  return <input placeholder={placeholder} class={[CSS.search]} $$={bind(o(model))}>
      <Button class={CSS.searchBtn} icon='close'/>
    </input>
}

export interface InputAttributes extends Attrs {
  model: O<string>
  disabled?: RO<boolean>
  type?: RO<string>
  label?: RO<string>
  placeholder?: RO<string>
  autocomplete?: RO<'on' | 'off' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'email' | 'nickname' | 'current-password' | 'organization-title' | 'organization' | 'street-address' | 'country' | 'country-name' | 'bday' | 'bday-day' | 'sex' | 'url' | 'tel' | 'photo'>
  autocapitalize?: RO<'word' | 'words' | 'sentences' | 'sentence' | 'characters' | 'character' | 'off'>
  autocorrect?: RO<'on' | 'off'>
  spellcheck?: RO<boolean>
  autofocus?: RO<boolean>
  error?: RO<string>
  tabindex?: RO<number>
}


export function Input(attrs: InputAttributes, content: DocumentFragment): Element {

  let id = attrs.id || `input_${id_gen++}`;

  let {
    model,
    label,
    placeholder,
    error,
    type,
    ...other_attrs
  } = attrs

  const o_model = o(model)
  label = label || placeholder || ''

  const o_focused: Observable<boolean> = o(false)

  const input = <input
    {...other_attrs}
    id={id}
    class={CSS.inputElement}
    type={type || 'text'}
    $$={[bind(o_model)]}
  />

  input.addEventListener('blur', ev => {
    o_focused.set(false)
  })
  input.addEventListener('focus', ev => {
    o_focused.set(true)
  })

  // const o_unfocus_and_empty = o(data.model, o_focused, (value: string, focused: boolean) => !focused && !value)
  const o_unfocus_and_empty = o.merge({model: o_model, focus: o_focused})
    .tf(value => {
      var res = !value.model && !value.focus
      return res
    })

  return <div class={[CSS.container, {
    [CSS.focused]: o_focused,
    [CSS.emptyUnfocused]: o_unfocus_and_empty,
    [CSS.error]: attrs.error
  }]}>
      {input}
      {label ?
          <label class={CSS.label} for={id}>{label}</label>
      : null}
      {DisplayIf(error, error => <div class={CSS.inputError}>{error}</div>)}
    </div>;
}


import s from './styling'

export namespace CSS {

  export const error = s.style('error')
  export const focused = s.style('focused')
  export const emptyUnfocused = s.style('unfocused')

  export const label = s.style('label', {
    position: 'absolute',
    top: '12px',
    left: '4px',

    fontSize: '12px',
    pointerEvents: 'none',
    color: s.colors.Fg6,
    transformOrigin: 'top left',
    transform: 'translateZ(0)',
    transition: `transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.2s`
  })

  export const inputElement = s.style('input-elt',
    s.values.NoSpuriousBorders,
    {
      position: 'relative',
      borderRadius: 0,
      fontSize: '14px',
      height: '32px',
      border: 'none',
      top: '24px',
      paddingRight: '4px',
      paddingLeft: '4px',
      paddingBottom: '4px',
      borderBottom: `1px solid ${s.colors.Fg6}`,
      width: '100%',
      transition: `border-bottom-color linear 0.3s`,
    },
    s.nest('[type="time"]', {
      '-webkit-appearance': 'none',
      minWidth: '15px',
      minHeight: '48px'
    }),
    s.focus({paddingBottom: '3px', borderBottom: `2px solid ${s.colors.Primary}`})
  )

  export const inputError = s.style('input-error', {
    position: 'absolute',
    color: s.colors.Accent,
    fontSize: '10px',
    top: '48px'
  })

  export const container = s.style('container', {
    display: 'inline-block',
    position: 'relative',
    height: '64px',

    $nest: {
      [`&.${error} > .${label}`]: {color: s.colors.Accent},
      [`$.${error} > .${inputElement}`]: {borderBottomColor: s.colors.Accent},
      [`&.${focused} > .${label}`]: {color: s.colors.Primary},
      [`&.${emptyUnfocused} > .${label}`]: {
        fontSize: `14px`,
        transform: `translateY(20px) translateZ(0) scaleX(1.1) scaleY(1.1)`
      },
    }
  })

  export const search = s.style('search', {
      borderRadius: '3px',
      border: '1px solid',
      position: 'relative',
      borderColor: s.colors.Fg5,
      color: s.colors.Fg,
      backgroundColor: s.colors.Fg6,
      fontSize: '0.8em',
      padding: '8px 16px'
    },
    s.values.NoSpuriousBorders,
    s.values.NoNativeAppearance,
    s.nest('&::placeholder', {color: s.colors.Fg5})
  )

  export const searchBtn = s.style('search-btn', {
    position: 'absolute',
    right: 0
  })
}
