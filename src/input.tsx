
import {
  d,
  o,
  bind,
  DisplayIf,
  BasicAttributes,
  MaybeObservable,
  Observable,
  click,
} from 'domic';


var id_gen = 0;

export interface InputAttributes extends BasicAttributes {
  model: Observable<string>
  disabled?: MaybeObservable<boolean>
  type?: string
  id?: string
  label?: string
  placeholder?: string
  autocomplete?: 'on' | 'off' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'email' | 'nickname' | 'current-password' | 'organization-title' | 'organization' | 'street-address' | 'country' | 'country-name' | 'bday' | 'bday-day' | 'sex' | 'url' | 'tel' | 'photo'
  autocapitalize?: 'word' | 'words' | 'sentences' | 'sentence' | 'characters' | 'character' | 'off'
  autocorrect?: 'on' | 'off'
  spellcheck?: boolean
  autofocus?: boolean
  error?: Observable<string>
}

export function Input(attrs: InputAttributes, content: DocumentFragment): Node {

  // Used in validation ???
  // this.valid = true;

  let id = attrs.id || `input_${id_gen++}`;

  let data = {
    model: o(attrs.model || ''), // model is necessarily an observable.
    type: attrs.type || 'text',
    label: attrs.label || attrs.placeholder || false, // we may not have a label, and we don't try to.
    error: o(attrs.error),
    disabled: o(attrs.disabled).tf(v => v ? 'disabled' : undefined)
  };

  let other_attrs = {
    autofocus: attrs.autofocus,
    autocapitalize: attrs.autocapitalize,
    spellcheck: attrs.spellcheck,
    autocorrect: attrs.autocorrect,
    autocomplete: attrs.autocomplete
  }

  const o_focused: Observable<boolean> = o(false)
    // max={attrs.max}
    // min={attrs.min}
  const input = <input
    id={id}
    class='dm-input-element'
    disabled={data.disabled}
    type={data.type}
    $$={[bind(data.model), click(function (this: HTMLInputElement, e: Event) {
      this.focus()
    })]}
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

  return <div class={['dm-input-container', {
    focused: o_focused,
    empty_unfocused: o_unfocus_and_empty,
    error: attrs.error
  }]}>
      {input}
      {data.label ?
          <label for={id} class='dm-input-floating-label'>{data.label}</label>
      : null}
      {DisplayIf(data.error, error => <div class='dm--input--error'>{error}</div>)}
    </div>;
}
