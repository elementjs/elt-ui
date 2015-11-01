
import {elt} from 'elt/node';
import {Controller} from 'elt/controller';
import {Icon} from './icon';
import {o} from 'elt/observable';
import {bind, cls} from 'elt/decorators';

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

  return <div class='eltm-input-container'>
      {data.label ?
          <label for={id} class='eltm-input-floating-label'>{data.label}</label>
      : null}
      <input id={id} placeholder={attrs.placeholder} class='eltm-input-element' type={data.type} $$={bind(data.model)}/>
    </div>;
}
