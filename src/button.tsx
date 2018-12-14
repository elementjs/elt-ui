
import {
  o,
  Component,
  click,
  Attrs,
  Listener
} from 'elt'

import { Styling } from './styling'
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
      click && click.call(this, event, node, null!)
    }
  }

  return <button
    class={[
      Button.button,
      Styling.control,
      {
        [Styling.colors.reverse_primary]: attrs.reversed,
        [Button.disabled]: attrs.disabled,
        [Button.icon_button]: attrs.icon
      }
    ]}
    disabled={o.tf(attrs.disabled, val => !!val)}
    $$={click(doClick)}
  >
    {children}
  </button>

}


export namespace Button {

  export const button = cls('button',
    Styling.no_spurious_borders,
    {
      // This style applies to a button, that we want to completely reset.
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
      textAlign: 'center',
      minWidth: '64px',
      background: Styling.colors.BG,
      color: Styling.colors.PRIMARY,
      textTransform: 'uppercase',
      fontWeight: 'bold'
    },
  )

  export const icon_button = cls('icon-button', {
    minWidth: '0',
    fontSize: '1.2em',
    color: Styling.colors.PRIMARY
  })

  s(button).append(`::-moz-focus-inner`, {border: 0})
  s(button).children(() => {
    s(`*`, {pointerEvents: 'none'})
  })

  export const bordered = cls('bordered', {
    border: `1px solid`,
    borderColor: Styling.colors.FG
  })

  export const disabled = cls('disabled', {
    color: Styling.colors.FG4,
    boxShadow: 'none'
  })

}


export interface ButtonBarAttrs extends Attrs {
  stacked?: boolean
}


export class ButtonBar extends Component<ButtonBarAttrs> {

  inserted(node: Element, parent: Element) {
    parent.classList.add(ButtonBar.has_button_bar)
  }

  removed(node: Element, parent: Element) {
    parent.classList.remove(ButtonBar.has_button_bar)
  }

  render(children: DocumentFragment): Element {
    return <div class={[ButtonBar.button_bar, Flex.row, Flex.justify_center]}>{children}</div>
  }
}

export namespace ButtonBar {
  export const button_bar = cls('button-bar')
  // s(Button.button).childOf(button_bar, {padding: '0 16px',})

  export const has_button_bar = cls('has-button-bar', {
    paddingBottom: '0 !important'
  })

}
