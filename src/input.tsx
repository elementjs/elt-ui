
import {
  o,
  bind,
  DisplayIf,
  Attrs,
  MaybeObservable,
  Observable,
  click,
} from 'elt';


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
    class='em-input-element'
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

  return <div class={['em-input-container', {
    focused: o_focused,
    empty_unfocused: o_unfocus_and_empty,
    error: attrs.error
  }]}>
      {input}
      {data.label ?
          <label for={id} class='em-input-floating-label'>{data.label}</label>
      : null}
      {DisplayIf(data.error, error => <div class='em--input--error'>{error}</div>)}
    </div>;
}
