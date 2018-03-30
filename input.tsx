
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
  return <input placeholder={placeholder} class={[Search.element]} $$={bind(o(model))}>
      <Button class={Search.button} icon='close'/>
    </input>
}

export namespace Search {

  export const element = Css('search', {
      borderRadius: '3px',
      border: '1px solid',
      position: 'relative',
      borderColor: Css.colors.FG5,
      color: Css.colors.FG,
      backgroundColor: Css.colors.FG6,
      fontSize: '0.8em',
      padding: '8px 16px'
    },
    Css.no_spurious_borders,
    Css.no_native_appearance,
  )

  Css.s(element).append(`::placeholder`, {
    color: Css.colors.FG5
  })

  export const button = Css('search-btn', {
    position: 'absolute',
    right: 0
  })
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


import {Css} from './styling'


export namespace Input {

  export const error = Css('error')
  export const focused = Css('focused')
  export const empty_unfocused = Css('unfocused')

  export const label = Css('label', {
    position: 'absolute',
    top: '12px',
    left: '4px',

    fontSize: '12px',
    pointerEvents: 'none',
    color: Css.colors.FG6,
    transformOrigin: 'top left',
    transform: 'translateZ(0)',
    transition: `transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.2s`
  })

  export const element = Css('input-elt',
    Css.no_spurious_borders,
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
      borderBottom: `1px solid ${Css.colors.FG6}`,
      width: '100%',
      transition: `border-bottom-color linear 0.3s`,
    }
  )

  Css.s(element).append(`[type="time"]`, {
    '-webkit-appearance': 'none',
    minWidth: '15px',
    minHeight: '48px'
  })

  Css.s(element).append(`:focus`, {
    paddingBottom: '3px', borderBottom: `2px solid ${Css.colors.PRIMARY}`
  })

  export const input_error = Css('input-error', {
    position: 'absolute',
    color: Css.colors.ACCENT,
    fontSize: '10px',
    top: '48px'
  })

  export const container = Css('container', {
    display: 'inline-block',
    position: 'relative',
    height: '64px',
  })

  // Styling labels that are children of different container combinations
  // The label is always the one being styled here
  Css.combine(_ => Css.s(label).childOf(_.and(container)), () => {
    Css.s(error, { color: Css.colors.ACCENT })
    Css.s(focused, { color: Css.colors.PRIMARY })
    Css.s(empty_unfocused, {
      fontSize: `14px`,
      transform: `translateY(20px) translateZ(0) scaleX(1.1) scaleY(1.1)`
    })
  })

  Css.s(element).childOf(Css.s(container).and(error), {
    borderBottomColor: Css.colors.ACCENT
  })
}
