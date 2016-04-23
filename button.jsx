
import {o, c, cls, click} from 'carbyne';
import {Icon} from './icon';

import './button.styl';
import {inkable} from './ink'

export function Button(attrs, children) {

  // FIXME missing ripple.
  // let fn = attrs.click || function () {};

  let data = o.all({
    disabled: attrs.disabled,
    raised: attrs.raised,
    fn: attrs.click || function () {}
  });

  function doClick(event) {
    if (!data.disabled.get()) {
      // in this context, this is the Node.
      data.fn.get().call(this, event);
      // this.element.blur() // to prevent focus lingering.
    }
  }

  return <button class='carbm-button' disabled={o(data.disabled, val => val ? val : undefined)} $$={click(doClick)}>
    {o(attrs.icon, (v) => {
      if (v) return <Icon class='carbm-button-icon' name={v} $$={[inkable, cls({disabled: data.disabled, raised: data.raised})]}/>;
      return <span class='carbm-button-content' $$={[inkable, cls({disabled: data.disabled, raised: data.raised})]} >{children}</span>
    })}
  </button>;

}
