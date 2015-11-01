
import {elt} from 'elt/node';
import {Controller} from 'elt/controller';
import {Icon} from './icon';
import {o} from 'elt/observable';
import {click} from 'elt/touch';
import {bind, cls} from 'elt/decorators';

import './checkbox.styl';

var OFF = 'check_box_outline_blank';
var ON = 'check_box';
var INDETERMINATE = 'indeterminate_check_box';

export function Checkbox(attrs, children) {

  let data = {
    model: o(attrs.model || undefined),
    disabled: o(attrs.disabled)
  };

  function toggle(event) {
    if (data.disabled.get()) return;

    let val = data.model.get();
    data.model.set(!val);
  }

  function getIcon(value) {
    if (value === undefined) return INDETERMINATE;
    if (value) return ON;
    return OFF;
  }

  let classes = cls({on: data.model, off: o(data.model, (v) => !v), disabled: data.disabled});

  return <label class='eltm-checkbox-label' $$={click(toggle)}>
      <Icon class='eltm-checkbox-icon' name={o(data.model, getIcon)}
        $$={classes}/>
      <span class='eltm-checkbox-content' $$={classes}>{attrs.title || children}</span>
    </label>;

}
