
import {Component} from 'elt/controller';
import {o} from 'elt/observable';
import {cls, click} from 'elt/decorators';
import {elt} from 'elt/node';

import './button.styl';

export class Button extends Component {

  view(attrs, children) {
    // FIXME missing ripple.
    // let fn = attrs.click || function () {};

    let data = this.data = o.all({
      disabled: attrs.disabled,
      raised: attrs.raised,
      fn: attrs.click || function () {}
    });

    return <button class='eltm-button' disabled={data.disabled} $$={click(this.doClick.bind(this))}>
      <span class='eltm-button-content' $$={cls({disabled: data.disabled, raised: data.raised})} >{children}</span>
    </button>;
    // class={o(attrs.class, attrs.disabled, (v, d) => `${v||''} ${d ? 'disabled' : ''} eltm-button-content`)}
  }

  doClick(event) {
    if (!this.data.disabled.get()) {
      this.data.fn.get().call(this, event);
    }
  }

}
