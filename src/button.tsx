
import {o, c, cls, click, If, Then, Else, O, BasicAttributes} from 'carbyne';
import {Icon} from './icon';

import './button.styl';
import {inkable} from './ink'

export interface ButtonAttributes extends BasicAttributes {
  disabled?: O<boolean>
  raised?: O<boolean>
  click?: O<(ev: MouseEvent) => any>
  icon?: O<string>
}

export function Button(attrs : ButtonAttributes, children) {

  // FIXME missing ripple.
  // let fn = attrs.click || function () {};

  let data = {
    disabled: o(attrs.disabled),
    raised: o(attrs.raised),
    fn: o(attrs.click || function () {})
  };

  function doClick(event) {
    if (!data.disabled.get()) {
      // in this context, this is the Node.
      data.fn.get().call(this, event);
      // this.element.blur() // to prevent focus lingering.
    }
  }

  return <button class='carbm-button' disabled={o(data.disabled).tf(val => val ? val : undefined)} $$={click(doClick)}>
    {If(attrs.icon,
      Then(name => <Icon
        class='carbm-button-icon'
        name={name}
        $$={[inkable, cls({disabled: data.disabled, raised: data.raised})]}
      />),
      Else(_ => <span
        class='carbm-button-content'
        $$={[inkable, cls({disabled: data.disabled, raised: data.raised})]} >
          {children}
      </span>)
    )}
  </button>

}
