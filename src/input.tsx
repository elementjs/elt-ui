
import {
  o,
  bind,
  DisplayIf,
  Attrs
} from 'elt'

import { Button } from './button'
import { Styling } from './styling'
import { cls, s, combine } from 'osun'
import FaClose from 'elt-fa/window-close'

var id_gen = 0;


export interface SearchAttributes extends Attrs {
  model: o.O<string>
  placeholder?: o.RO<string|null|undefined>
}

export function Search({model, placeholder}: SearchAttributes) {
  return <input placeholder={placeholder} class={[Search.element]} $$={bind(o(model))}>
      <Button class={Search.button} icon><FaClose/></Button>
    </input>
}

export namespace Search {

  export const element = cls('search', {
      borderRadius: '3px',
      border: '1px solid',
      position: 'relative',
      borderColor: Styling.colors.FG5,
      color: Styling.colors.FG,
      backgroundColor: Styling.colors.FG6,
      fontSize: '0.8em',
      padding: '8px 16px'
    },
    Styling.no_spurious_borders,
    Styling.no_native_appearance,
  )

  s(element).append(`::placeholder`, {
    color: Styling.colors.FG5
  })

  export const button = cls('search-btn', {
    position: 'absolute',
    right: 0
  })
}

export interface InputAttributes extends Attrs {
  model: o.O<string>
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

  const o_focused: o.Observable<boolean> = o(false)

  const input = <input
    {...other_attrs}
    id={id}
    class={Input.element}
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

  return <div class={[Input.container, {
    [Input.focused]: o_focused,
    [Input.empty_unfocused]: o_unfocus_and_empty,
    [Input.error]: attrs.error
  }]}>
      {input}
      {label ?
          <label class={Input.label} for={id}>{label}</label>
      : null}
      {DisplayIf(o(error), error => <div class={Input.input_error}>{error}</div>)}
    </div>;
}


export namespace Input {

  export const error = cls('error')
  export const focused = cls('focused')
  export const empty_unfocused = cls('unfocused')

  export const label = cls('label', {
    position: 'absolute',
    top: '12px',
    left: '4px',

    fontSize: '12px',
    pointerEvents: 'none',
    color: Styling.colors.FG6,
    transformOrigin: 'top left',
    transform: 'translateZ(0)',
    transition: `transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.2s`
  })

  export const element = cls('input-elt',
    Styling.no_spurious_borders,
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
      borderBottom: `1px solid ${Styling.colors.FG6}`,
      width: '100%',
      transition: `border-bottom-color linear 0.3s`,
    }
  )

  s(element).append(`[type="time"]`, {
    '-webkit-appearance': 'none',
    minWidth: '15px',
    minHeight: '48px'
  })

  s(element).append(`:focus`, {
    paddingBottom: '3px', borderBottom: `2px solid ${Styling.colors.PRIMARY}`
  })

  export const input_error = cls('input-error', {
    position: 'absolute',
    fontSize: '10px',
    top: '48px'
  })

  export const container = cls('container', {
    display: 'inline-block',
    position: 'relative',
    height: '64px',
  })

  // Styling labels that are children of different container combinations
  // The label is always the one being styled here
  combine(_ => s(label).childOf(_.and(container)), () => {
    s(focused, { color: Styling.colors.PRIMARY })
    s(empty_unfocused, {
      fontSize: `14px`,
      transform: `translateY(20px) translateZ(0) scaleX(1.1) scaleY(1.1)`
    })
  })
}
