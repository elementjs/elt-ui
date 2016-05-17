
import {c, o, bind, cls, If} from 'carbyne';

import {Icon} from './icon';

import './input.styl';

var id_gen = 0;

export function Input(attrs, content) {

  // Used in validation ???
  // this.valid = true;

  let id = attrs.id || `input_${id_gen++}`;

  let data = {
    model: o(attrs.model || ''), // model is necessarily an observable.
    type: attrs.type || 'text',
    label: attrs.label || attrs.placeholder || false, // we may not have a label, and we don't try to.
    error: o(attrs.error)
  };

  const o_focused = o(false)
  const input = <input id={id} max={attrs.max} min={attrs.min} class='carbm-input-element' type={data.type} $$={bind(data.model)}/>
  input.listen('blur', ev => {
    o_focused.set(false)
  })
  input.listen('focus', ev => {
    o_focused.set(true)
  })

  const o_unfocus_and_empty = o(data.model, o_focused, (value, focused) => !focused && !value)

  return <div class='carbm-input-container' $$={cls({
    focused: o_focused,
    empty_unfocused: o_unfocus_and_empty,
    error: attrs.error
  })}>
      {input}
      {data.label ?
          <label for={id} class='carbm-input-floating-label'>{data.label}</label>
      : null}
      {If(data.error, val => <div class='carbm--input--error'>{val}</div>)}
    </div>;
}
