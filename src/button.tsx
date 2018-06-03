
import {
  o,
  Component,
  click,
  RO,
  Attrs,
  Listener
} from 'elt'

import { Styling } from './styling'
import { cls, s } from 'osun'
import {Flex} from './flex'
import {inker} from './ink'


export interface ButtonAttrs extends Attrs {
  bordered?: RO<boolean>
  disabled?: RO<boolean>
  raised?: RO<boolean>
  click?: Listener<MouseEvent>
  icon?: RO<boolean>
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
      Button.button,
      Styling.control,
      {
        [Styling.colors.reverse_primary]: attrs.raised,
        [Button.disabled]: attrs.disabled,
        [Button.raised]: attrs.raised,
      }
    ]}
    disabled={o(attrs.disabled).tf(val => !!val)}
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
      color: Styling.colors.FG,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      '--eltui-color-fg': 'var(--eltui-color-primary)'
    },
  )

  export const raised = cls('raised', {
    '--eltui-color-fg': 'var(--eltui-color-bg) !important',
    '--eltui-color-bg': 'var(--eltui-color-primary)'
  })

  s(button).append(`::-moz-focus-inner`, {border: 0})

  export const button_content = cls('button-content', {

    // Should probably have a mixin for that
    // as it should be some global configuration option.
    borderRadius: '2px',
    borderStyle: 'none',
    userSelect: 'none'
  })

  export const button_icon = cls('button-icon')

  s(button_icon).append(`::before`, {
    fontSize: '24px',
    // color: Styling.colors.PRIMARY
  })

  export const bordered = cls('bordered', {
    border: `1px solid`,
    borderColor: Styling.colors.FG
  })

  export const disabled = cls('disabled', {
    color: Styling.colors.FG4,
    boxShadow: 'none'
  })

  export const icon_button = cls('icon-button')
  s(icon_button).append('::before', {fontSize: '24px'})

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
    return <div class={[ButtonBar.button_bar, Flex.row, Flex.justify_end]}>{children}</div>
  }
}

export namespace ButtonBar {
  export const button_bar = cls('button-bar')
  s(Button.button).childOf(button_bar, {padding: '0 16px',})

  export const has_button_bar = cls('has-button-bar', {
    paddingBottom: '0 !important'
  })

}
