
import {elt} from '../node';
import {Component} from '../controller';
import {Icon} from './icon';
import {o} from '../observable';
import {click} from '../touch';
import {bind} from '../decorators';

import './checkbox.styl';

var OFF = 'check_box_outline_blank';
var ON = 'check_box';
var INDETERMINATE = 'indeterminate_check_box';

export class Checkbox extends Component {

  view(attrs, children) {

    let data = this.data = {
      model: o(attrs.value || undefined)
    };

    return <label class='eltm-checkbox-label'>
        <Icon class='eltm-checkbox-icon' name={o(data.model, this.getIcon)}/>
        <span>{attrs.title || children}</span>
        <input type='checkbox' style='display: none;' $$={bind(data.model)}/>
      </label>;
  }

  toggle() {
    let val = this.data.model.get();
    this.data.model.set(!val);
  }

  getIcon(value) {
    if (value === undefined) return INDETERMINATE;
    if (value) return ON;
    return OFF;
  }

}

var CHECKED = 'radio_button_checked';
var UNCHECKED = 'radio_button_unchecked';

export class Radio extends Component {

  view(attrs, children) {

    let data = this.data = {
      model: o(attrs.model || undefined),
      value: o(attrs.value)
    };

    return <label class='eltm-radio-label'>
        <Icon class='eltm-radio-icon' name={o(data.model, this.getIcon)}/>
        <span>{attrs.title || children}</span>
        <input type='radio' style='display: none;' $$={bind(data.model)}/>
      </label>;
  }

  toggle() {
    let val = this.data.model.get();
    this.data.model.set(!val);
  }

  getIcon(value) {
    let self = this.data.value.get();
    if (value === self) return CHECKED;
    return UNCHECKED;
  }

}
