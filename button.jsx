
import {Component} from 'elt/controller';
import {o} from 'elt/observable';
import {cls} from 'elt/decorators';
import {elt} from 'elt/node';

import './button.styl';

export class Button extends Component {

  view(attrs, children) {
    // FIXME missing ripple.
    let fn = attrs.click || function () {};

    return <button class='eltm-button' disabled={attrs.disabled}>
      <span class='eltm-button-content' $$={cls({disabled: attrs.disabled, raised: attrs.raised})} >{children}</span>
    </button>;
    // class={o(attrs.class, attrs.disabled, (v, d) => `${v||''} ${d ? 'disabled' : ''} eltm-button-content`)}
  }

}
