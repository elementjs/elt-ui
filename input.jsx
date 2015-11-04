
import {c, o, bind, cls} from 'carbyne';

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
    label: attrs.label || false, // we may not have a label, and we don't try to.
  };

  return <div class='carbm-input-container'>
      {data.label ?
          <label for={id} class='carbm-input-floating-label'>{data.label}</label>
      : null}
      <input id={id} placeholder={attrs.placeholder} class='carbm-input-element' type={data.type} $$={bind(data.model)}/>
    </div>;
}
