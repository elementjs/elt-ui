
import {
  o,
  bind,
  DisplayIf,
  Attrs,
  MaybeObservable,
  Observable
} from 'elt';


import * as s from './styling'

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
    color: s.colors.FgFaint,
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
      // padding-bottom: 1px
      paddingRight: '4px',
      paddingLeft: '4px',
      paddingBottom: '4px',
      borderBottom: `1px solid ${s.colors.FgFaintest}`,
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
    color: `var(--em-color-warn)`,
    fontSize: '10px',
    top: '48px'
  })

  export const container = s.style('container', {
    display: 'inline-block',
    position: 'relative',
    height: '64px',

    $nest: {
      [`&.${error} > .${label}`]: {color: `var(--em-color-warn)`},
      [`$.${error} > .${inputElement}`]: {borderBottomColor: `var(--em-color-warn)`},
      [`&.${focused} > .${label}`]: {color: s.colors.Primary},
      [`&.${emptyUnfocused} > .${label}`]: {
        fontSize: `14px`,
        transform: `translateY(20px) translateZ(0) scaleX(1.1) scaleY(1.1)`
      },
    }
  })
}


var id_gen = 0;

export interface InputAttributes extends Attrs {
  model: Observable<string>
  disabled?: MaybeObservable<boolean>
  type?: string
  id?: string
  label?: MaybeObservable<string>
  placeholder?: MaybeObservable<string>
  autocomplete?: 'on' | 'off' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'email' | 'nickname' | 'current-password' | 'organization-title' | 'organization' | 'street-address' | 'country' | 'country-name' | 'bday' | 'bday-day' | 'sex' | 'url' | 'tel' | 'photo'
  autocapitalize?: 'word' | 'words' | 'sentences' | 'sentence' | 'characters' | 'character' | 'off'
  autocorrect?: 'on' | 'off'
  spellcheck?: boolean
  autofocus?: boolean
  error?: Observable<string>
}

export function Input(attrs: InputAttributes, content: DocumentFragment): Element {

  // Used in validation ???
  // this.valid = true;

  let id = attrs.id || `input_${id_gen++}`;

  let data = {
    model: o(attrs.model || ''), // model is necessarily an observable.
    type: attrs.type || 'text',
    label: attrs.label || attrs.placeholder || '', // we may not have a label, and we don't try to.
    error: o(attrs.error),
    disabled: o(attrs.disabled).tf(v => !!v)
  };

  let other_attrs = {
    autofocus: attrs.autofocus,
    autocapitalize: attrs.autocapitalize,
    spellcheck: attrs.spellcheck,
    autocorrect: attrs.autocorrect,
    autocomplete: attrs.autocomplete
  }

  const o_focused: Observable<boolean> = o(false)

  const input = <input
    id={id}
    class={CSS.inputElement}
    disabled={data.disabled}
    type={data.type}
    $$={[bind(data.model)]}
    {...other_attrs}
  />

  input.addEventListener('blur', ev => {
    o_focused.set(false)
  })
  input.addEventListener('focus', ev => {
    o_focused.set(true)
  })

  // const o_unfocus_and_empty = o(data.model, o_focused, (value: string, focused: boolean) => !focused && !value)
  const o_unfocus_and_empty = o.merge({model: data.model, focus: o_focused})
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
      {data.label ?
          <label class={CSS.label} for={id}>{data.label}</label>
      : null}
      {DisplayIf(data.error, error => <div class={CSS.inputError}>{error}</div>)}
    </div>;
}
