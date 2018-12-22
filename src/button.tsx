
import {
  o,
  Component,
  click,
  Attrs,
  Listener
} from 'elt'

import S from './styling'
import { cls, s } from 'osun'
import {Flex} from './flex'
import {inker} from './ink'


export interface ButtonAttrs extends Attrs {
  bordered?: o.RO<boolean>
  disabled?: o.RO<boolean>
  reversed?: o.RO<boolean>
  click?: Listener<MouseEvent>
  icon?: o.RO<boolean>
}


export function Button(attrs : ButtonAttrs, children: DocumentFragment): Element {

  function doClick(this: Node, event: MouseEvent, node: Node) {
    let click = o.get(attrs.click)
    if (!o.get(attrs.disabled)) {
      // in this context, this is the Node.
      var n = event.target as Node
      inker(n, event)
      click && click.call(this, event, node)
    }
  }

  return <button
    class={[
      Button.cls_button,
      S.control,
      {
        [S.reverse_primary]: attrs.reversed,
        [Button.cls_disabled]: attrs.disabled,
        [Button.cls_icon_button]: attrs.icon
      }
    ]}
    disabled={o.tf(attrs.disabled, val => !!val)}
    $$={click(doClick)}
  >
    {children}
  </button>

}


export namespace Button {

  export const cls_button = cls('button',
    S.no_spurious_borders,
    {
      // This style applies to a button, that we want to completely reset.
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
      textAlign: 'center',
      minWidth: '64px',
      background: S.BG,
      color: S.PRIMARY,
      textTransform: 'uppercase',
      fontWeight: 'bold'
    },
  )

  export const cls_icon_button = cls('icon-button', {
    minWidth: '0',
    fontSize: '1.2em',
    color: S.PRIMARY
  })

  s(cls_button).append(`::-moz-focus-inner`, {border: 0})
  s(cls_button).children(() => {
    s(`*`, {pointerEvents: 'none'})
  })

  export const cls_disabled = cls('disabled', {
    color: S.FG4,
    boxShadow: 'none'
  })

}


export interface ButtonBarAttrs extends Attrs {
  stacked?: boolean
}


export class ButtonBar extends Component<ButtonBarAttrs> {

  inserted(node: Element, parent: Element) {
    parent.classList.add(ButtonBar.cls_has_button_bar)
  }

  removed(node: Element, parent: Element) {
    parent.classList.remove(ButtonBar.cls_has_button_bar)
  }

  render(children: DocumentFragment): Element {
    return <div class={[ButtonBar.cls_button_bar, Flex.row, Flex.justify_center]}>{children}</div>
  }
}

export namespace ButtonBar {
  export const cls_button_bar = cls('button-bar')
  // s(Button.button).childOf(button_bar, {padding: '0 16px',})

  export const cls_has_button_bar = cls('has-button-bar', {
    paddingBottom: '0 !important'
  })

}
