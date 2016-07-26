
import {o, O, Observable, c, cls, click, BasicAttributes, Appendable, Atom} from 'carbyne';

import {Icon} from './icon';

import {inkable} from './ink'
import './checkbox.styl';

var OFF = 'square-o';
var ON = 'check-square';
var INDETERMINATE = 'minus-square';

export interface CheckboxAttributes extends BasicAttributes {
  model: Observable<boolean>
  disabled?: O<boolean>
  title?: string
}

export function Checkbox(attrs: CheckboxAttributes, children: Appendable): Atom {

  let data = {
    model: o(attrs.model || undefined) as Observable<boolean>,
    disabled: o(attrs.disabled)
  };

  function toggle(event: MouseEvent) {
    if (data.disabled.get()) return;

    let val = data.model.get();
    data.model.set(!val);
  }

  function getIcon(value: boolean) {
    if (value === undefined) return INDETERMINATE;
    if (value) return ON;
    return OFF;
  }

  let classes = cls({on: data.model, off: o(data.model, (v: boolean) => !v), disabled: data.disabled});

  return <label class='carbm-checkbox-label' $$={[inkable, click(toggle)]}>
      <Icon class='carbm-checkbox-icon' name={o(data.model, getIcon)}
        $$={classes}/>
      <span class='carbm-checkbox-content' $$={classes}>{attrs.title || children}</span>
    </label>;

}
