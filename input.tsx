
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
  return <input placeholder={placeholder} class={[css.search]} $$={bind(o(model))}>
      <Button class={css.search_btn} icon='close'/>
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
    class={css.input_element}
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

  return <div class={[css.container, {
    [css.focused]: o_focused,
    [css.empty_unfocused]: o_unfocus_and_empty,
    [css.error]: attrs.error
  }]}>
      {input}
      {label ?
          <label class={css.label} for={id}>{label}</label>
      : null}
      {DisplayIf(o(error), error => <div class={css.input_error}>{error}</div>)}
    </div>;
}


import {css as base} from './styling'
import {cls, s, combine} from 'osun'

export namespace css {

  export const error = cls('error')
  export const focused = cls('focused')
  export const empty_unfocused = cls('unfocused')

  export const label = cls('label', {
    position: 'absolute',
    top: '12px',
    left: '4px',

    fontSize: '12px',
    pointerEvents: 'none',
    color: base.colors.FG6,
    transformOrigin: 'top left',
    transform: 'translateZ(0)',
    transition: `transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.2s`
  })

  export const input_element = cls('input-elt',
    base.no_spurious_borders,
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
      borderBottom: `1px solid ${base.colors.FG6}`,
      width: '100%',
      transition: `border-bottom-color linear 0.3s`,
    }
  )

  s(input_element).append(`[type="time"]`, {
    '-webkit-appearance': 'none',
    minWidth: '15px',
    minHeight: '48px'
  })

  s(input_element).append(`:focus`, {
    paddingBottom: '3px', borderBottom: `2px solid ${base.colors.PRIMARY}`
  })

  export const input_error = cls('input-error', {
    position: 'absolute',
    color: base.colors.ACCENT,
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
    s(error, { color: base.colors.ACCENT })
    s(focused, { color: base.colors.PRIMARY })
    s(empty_unfocused, {
      fontSize: `14px`,
      transform: `translateY(20px) translateZ(0) scaleX(1.1) scaleY(1.1)`
    })
  })

  s(input_element).childOf(s(container).and(error), {
    borderBottomColor: base.colors.ACCENT
  })

  export const search = cls('search', {
      borderRadius: '3px',
      border: '1px solid',
      position: 'relative',
      borderColor: base.colors.FG5,
      color: base.colors.FG,
      backgroundColor: base.colors.FG6,
      fontSize: '0.8em',
      padding: '8px 16px'
    },
    base.no_spurious_borders,
    base.no_native_appearance,
  )

  s(search).append(`::placeholder`, {
    color: base.colors.FG5
  })

  export const search_btn = cls('search-btn', {
    position: 'absolute',
    right: 0
  })
}
