
import {elt} from 'elt/node';
import {Component} from 'elt/controller';
import {Icon} from './icon';
import {o} from 'elt/observable';
import {click} from 'elt/touch';
import {bind, cls} from 'elt/decorators';

import './checkbox.styl';

var OFF = 'check_box_outline_blank';
var ON = 'check_box';
var INDETERMINATE = 'indeterminate_check_box';

export class Checkbox extends Component {

  view(attrs, children) {

    let data = this.data = {
      model: o(attrs.model || undefined),
      disabled: o(attrs.disabled)
    };

    let classes = cls({on: data.model, off: o(data.model, (v) => !v), disabled: data.disabled});

    return <label class='eltm-checkbox-label' $$={click(this.toggle.bind(this))}>
        <Icon class='eltm-checkbox-icon' name={o(data.model, this.getIcon)}
          $$={classes}/>
        <span class='eltm-checkbox-content' $$={classes}>{attrs.title || children}</span>
      </label>;
  }

  toggle() {
    if (this.data.disabled.get()) return;

    let val = this.data.model.get();
    this.data.model.set(!val);
  }

  getIcon(value) {
    if (value === undefined) return INDETERMINATE;
    if (value) return ON;
    return OFF;
  }

}
