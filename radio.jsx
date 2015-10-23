
import {elt} from 'elt/node';
import {Component} from 'elt/controller';
import {Icon} from './icon';
import {o} from 'elt/observable';
import {click} from 'elt/touch';
import {bind, cls} from 'elt/decorators';

import './checkbox.styl';

var CHECKED = 'radio_button_checked';
var UNCHECKED = 'radio_button_unchecked';

export class Radio extends Component {

  view(attrs, children) {

    let data = this.data = {
      model: o(attrs.model || undefined),
      value: o(attrs.value),
      disabled: o(attrs.disabled)
    };

    let classes = cls({
      on: o(data.model, data.value, (m, v) => m === v),
      off: o(data.model, data.value, (m, v) => m !== v),
      disabled: data.disabled
    });

    return <label class='eltm-checkbox-label' $$={click(this.toggle.bind(this))}>
        <Icon class='eltm-checkbox-icon' name={o(data.model, this.getIcon.bind(this))}
              $$={classes}/>
        <span class='eltm-checkbox-content' $$={classes}>{attrs.title || children}</span>
      </label>;
  }

  toggle() {
    let value = this.data.value.get();
    this.data.model.set(value);
  }

  getIcon(value) {
    let self = this.data.value.get();
    if (value === self) return CHECKED;
    return UNCHECKED;
  }

}
