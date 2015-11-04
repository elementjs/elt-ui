
import {o, c, bind, cls, click} from 'carbyne';

import {Icon} from './icon';

import './checkbox.styl';

var CHECKED = 'radio_button_checked';
var UNCHECKED = 'radio_button_unchecked';

export function Radio(attrs, children) {

  function toggle() {
    let value = data.value.get();
    data.model.set(value);
  }

  function getIcon(value) {
    let self = data.value.get();
    if (value === self) return CHECKED;
    return UNCHECKED;
  }

  let data = {
    model: o(attrs.model || undefined),
    value: o(attrs.value),
    disabled: o(attrs.disabled)
  };

  let classes = cls({
    on: o(data.model, data.value, (m, v) => m === v),
    off: o(data.model, data.value, (m, v) => m !== v),
    disabled: data.disabled
  });

  return <label class='carbm-checkbox-label' $$={click(toggle)}>
      <Icon class='carbm-checkbox-icon' name={o(data.model, getIcon)}
            $$={classes}/>
      <span class='carbm-checkbox-content' $$={classes}>{attrs.title || children}</span>
    </label>;

}
