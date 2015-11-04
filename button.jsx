
import {o, c, cls, click} from 'carbyne';

import './button.styl';

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
    }
  }

  return <button class='eltm-button' disabled={data.disabled} $$={click(doClick)}>
    <span class='eltm-button-content' $$={cls({disabled: data.disabled, raised: data.raised})} >{children}</span>
  </button>;

}
