
import {
  o,
  Component,
  click,
  Attrs,
  Listener,
} from 'elt'

import S from './styling'
import { style, rule } from 'osun'
import {inker} from './ink'


export interface ButtonAttrs extends Attrs {
  bordered?: o.RO<boolean>
  disabled?: o.RO<boolean>
  contrast?: o.RO<boolean>
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
      S.box.paddingSquashed(8),
      {
        [S.contrast_on_tint]: attrs.contrast,
        [Button.cls_disabled]: attrs.disabled,
        [Button.cls_icon_button]: attrs.icon,
      }
    ]}
    disabled={o.tf(attrs.disabled, val => !!val)}
    $$={click(doClick)}
  >
    {children}
  </button>

}

Button.cls_bordered = style('button-bordered', {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: S.TINT
})


export namespace Button {

  export const cls_button = style('button',
    S.box.inlineBlock.noSpuriousBorders.positionRelative.cursorPointer.background('none'),
    S.text.centered.uppercase.bold.color(S.TINT),
    // {
    //   // This style applies to a button, that we want to completely reset.
    //   position: 'relative',
    //   display: 'inline-block',
    //   cursor: 'pointer',
    //   textAlign: 'center',
    //   minWidth: '64px',
    //   background: 'none',
    //   color: S.TINT,
    //   textTransform: 'uppercase',
    //   fontWeight: 'bold'
    // },
  )

  export const cls_icon_button = style('icon-button', {
    minWidth: '0',
    fontSize: '1.2em',
    color: S.TINT
  })

  rule`${cls_button}::-moz-focus-inner`({
    border: 0
  })

  rule`${cls_button} > *`({
    pointerEvents: 'none'
  })

  export const cls_disabled = style('disabled', {
    color: S.FG14,
    boxShadow: 'none'
  })

}


export interface ButtonBarAttrs extends Attrs {
  stacked?: boolean
}


export class ButtonBar extends Component<ButtonBarAttrs> {

  init(node: Element) {
    requestAnimationFrame(() => {
      node.parentElement!.classList.add(ButtonBar.cls_has_button_bar)
    })
  }

  removed(node: Element, parent: Element) {
    parent.classList.remove(ButtonBar.cls_has_button_bar)
  }

  render(children: DocumentFragment): Element {
    return <div class={[ButtonBar.cls_button_bar, S.flex.row.justifyCenter]}>{children}</div>
  }
}

export namespace ButtonBar {
  export const cls_button_bar = style('button-bar')
  // s(Button.button).childOf(button_bar, {padding: '0 16px',})

  export const cls_has_button_bar = style('has-button-bar', {
    paddingBottom: '0 !important'
  })

}
