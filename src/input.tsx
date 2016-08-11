
import {c, o, bind, If, Atom, BasicAttributes, Appendable, Observable, click} from 'carbyne';

import './input.styl';

var id_gen = 0;

export interface InputAttributes extends BasicAttributes {
  model: Observable<string>
  type?: string
  id?: string
  label?: string
  placeholder?: string
  autocapitalize?: 'word' | 'words' | 'sentences' | 'sentence' | 'characters' | 'character' | 'off'
  spellcheck?: boolean
  autofocus?: boolean
  error?: Observable<string>
}

export function Input(attrs: InputAttributes, content: Appendable): Atom {

  // Used in validation ???
  // this.valid = true;

  let id = attrs.id || `input_${id_gen++}`;

  let data = {
    model: o(attrs.model || ''), // model is necessarily an observable.
    type: attrs.type || 'text',
    label: attrs.label || attrs.placeholder || false, // we may not have a label, and we don't try to.
    error: o(attrs.error)
  };

  let other_attrs = {autofocus: attrs.autofocus, autocapitalize: attrs.autocapitalize}

  const o_focused: Observable<boolean> = o(false)
    // max={attrs.max}
    // min={attrs.min}
  const input = <input
    id={id}
    class='carbm-input-element'
    type={data.type}
    $$={[bind(data.model), click((e, atom) => {
      atom.element.focus()
    })]}
    {...other_attrs}
  /> as Atom

  input.listen('blur', ev => {
    o_focused.set(false)
  })
  input.listen('focus', ev => {
    o_focused.set(true)
  })

  const o_unfocus_and_empty = o(data.model, o_focused, (value: string, focused: boolean) => !focused && !value)

  return <div class={['carbm-input-container', {
    focused: o_focused,
    empty_unfocused: o_unfocus_and_empty,
    error: attrs.error
  }]}>
      {input}
      {data.label ?
          <label for={id} class='carbm-input-floating-label'>{data.label}</label>
      : null}
      {If(data.error, val => <div class='carbm--input--error'>{val}</div>)}
    </div>;
}
