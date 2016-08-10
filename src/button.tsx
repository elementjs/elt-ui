
import {o, c, on, cls, click, If, Then, Else, O, BasicAttributes, Appendable, Atom, CarbyneEvent} from 'carbyne';
import {Icon} from './icon';

import './button.styl';
import {inkable} from './ink'

export interface ButtonAttributes extends BasicAttributes {
  disabled?: O<boolean>
  raised?: O<boolean>
  click?: (ev: MouseEvent, atom: Atom) => any
  icon?: O<string>
}

export interface ButtonBarAttributes extends BasicAttributes {
  stacked?: boolean
}

export function ButtonBar(attrs: ButtonBarAttributes, children: Appendable): Atom {
  return <div class='carbm-button-bar' $$={[
    on('mount', (ev: CarbyneEvent<Atom>) => ev.target.element.parentElement.classList.add('carbm-has-button-bar')),
    on('unmount:before', (ev: CarbyneEvent<Atom>) => ev.target.element.parentElement.classList.remove('carbm-has-button-bar'))
  ]}>
      {children}
    </div>
}

export function Button(attrs : ButtonAttributes, children: Appendable): Atom {

  // FIXME missing ripple.
  // let fn = attrs.click || function () {};

  let data = {
    disabled: o(attrs.disabled),
    raised: o(attrs.raised),
    fn: o(attrs.click || function () {})
  };

  function doClick(event: MouseEvent, atom: Atom) {
    if (!data.disabled.get()) {
      // in this context, this is the Node.
      data.fn.get()(event, atom);
      // this.element.blur() // to prevent focus lingering.
    }
  }

  return <button class='carbm-button' disabled={o(data.disabled).tf((val: boolean) => val ? val : undefined)} $$={click(doClick)}>
    {If(attrs.icon,
      name => <Icon
        class='carbm-button-icon'
        name={name}
        $$={[inkable, cls({disabled: data.disabled, raised: data.raised})]}
      />,
      _ => <span
        class='carbm-button-content'
        $$={[inkable, cls({disabled: data.disabled, raised: data.raised})]} >
          {children}
      </span>
    )}
  </button>

}
