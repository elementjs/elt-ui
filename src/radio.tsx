import './checkbox.styl'

import {o, c, cls, click, Atom, BasicAttributes, Appendable, Observable, O} from 'carbyne'

import {Icon} from './icon'

import {inkable} from './ink'

var CHECKED = 'dot-circle'
var UNCHECKED = 'circle-o'

export interface RadioAttributes<T> extends BasicAttributes {
  model: Observable<T>
  value: O<T>
  title: O<string>
  disabled?: O<boolean>
}

export function Radio<T>(attrs: RadioAttributes<T>, children: Appendable): Atom {

  const o_value: Observable<T> = o(attrs.value)
  const o_disabled: Observable<boolean> = o(attrs.disabled)

  function toggle() {
    attrs.model.set(o_value.get());
  }

  function getIcon(value: T) {
    if (value === o_value.get()) return CHECKED;
    return UNCHECKED;
  }

  let classes = cls({
    on: o(attrs.model, o_value, (m: T, v: T) => m === v),
    off: o(attrs.model, o_value, (m: T, v: T) => m !== v),
    disabled: o_disabled
  });

  return <label class='carbm-checkbox-label' $$={[inkable, click(toggle)]}>
      <Icon class='carbm-checkbox-icon' name={o(attrs.model, getIcon)}
            $$={classes}/>
      <span class='carbm-checkbox-content' $$={classes}>{attrs.title || children}</span>
    </label>;

}
