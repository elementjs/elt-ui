
import {
  o,
  Component,
  click,
  DisplayIf,
  MaybeObservable,
  Attrs,
  Listener
} from 'elt'

import {Icon} from './icon'
import {Row} from './flex'

import {inker} from './ink'

import * as css from './button.styl'

export interface ButtonAttrs extends Attrs {
  disabled?: MaybeObservable<boolean>
  raised?: MaybeObservable<boolean>
  click?: Listener<MouseEvent>
  icon?: MaybeObservable<string>
}

export interface ButtonBarAttrs extends Attrs {
  stacked?: boolean
}


export class ButtonBar extends Component {

  attrs: ButtonBarAttrs

  inserted(node: Element, parent: Element) {
    parent.classList.add(css.hasButtonBar)
  }

  removed(node: Element, parent: Element) {
    parent.classList.remove(css.hasButtonBar)
  }

  render(children: DocumentFragment): Element {
    return <Row class={css.buttonBar}>{children}</Row>
  }
}


export function Button(attrs : ButtonAttrs, children: DocumentFragment): Element {

  function doClick(this: Node, event: MouseEvent) {
    let click = o.get(attrs.click)
    if (!o.get(attrs.disabled)) {
      // in this context, this is the Node.
      inker(event.target as Node, event)
      click && click.call(this, event)
      // this.element.blur() // to prevent focus lingering.
    }
  }

  return <button
    class={css.button}
    disabled={o(attrs.disabled).tf(val => !!val)}
    $$={click(doClick)}
  >
    {DisplayIf(attrs.icon || '',
      o_name => <Icon
        class={[css.buttonIcon, {[css.disabled]: attrs.disabled, [css.raised]: attrs.raised}]}
        name={o_name}
      />
    ,
      () => <span
        class={[css.buttonContent, {[css.disabled]: attrs.disabled, [css.raised]: attrs.raised}]}
      >
        {children}
      </span>
    )}

  </button>

}
