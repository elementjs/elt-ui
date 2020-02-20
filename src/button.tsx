
import {
  o,
  Component,
  $click,
  Listener
} from 'elt'

import S from './styling'
import { style, rule } from 'osun'
import {inker} from './ink'
import { Control } from './control'


export interface ButtonAttrs extends E.JSX.Attrs<HTMLButtonElement> {
  bordered?: o.RO<boolean>
  disabled?: o.RO<boolean>
  contrast?: o.RO<boolean>
  click?: Listener<MouseEvent>
  icon?: o.RO<boolean>
}


export function Button(attrs : ButtonAttrs, children: E.JSX.Renderable[]) {

  function doClick(event: MouseEvent & {currentTarget: HTMLButtonElement}) {
    let click = o.get(attrs.click)
    if (!o.get(attrs.disabled)) {
      // in this context, this is the Node.
      inker(event)
      click && click(event)
    }
  }

  return <button
    class={[
      Button.cls_button,
      Control.css.control,
      o.tf(attrs.contrast, c => c ? Button.cls_button_contrast : Button.cls_button_classic),
      {
        [Button.cls_disabled]: attrs.disabled,
        [Button.cls_icon_button]: attrs.icon,
      }
    ]}
    disabled={o.tf(attrs.disabled, val => !!val)}
  >
    {$click(doClick)}
    {children}
  </button> as HTMLButtonElement

}

Button.cls_bordered = style('button-bordered', {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: S.TINT
})


export namespace Button {

  export const cls_button = style('button',
    S.box.inlineBlock.noSpuriousBorders.positionRelative.cursorPointer,
    S.text.centered.bold,
    // Control.css.color_middle,
  )

  export const cls_button_classic = style('button-classic', S.text.color(S.TINT).box.border(S.TINT))
  export const cls_button_contrast = style('button-contrast', S.text.color(S.BG).box.background(S.TINT).border(S.TINT))
  rule`${cls_button_contrast} ${inker.cls_container}`({'--eltui-colors-tint': `var(--eltui-colors-bg)`})

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


export interface ButtonBarAttrs extends E.JSX.Attrs<HTMLDivElement> {
  stacked?: boolean
}


export class ButtonBar extends Component<ButtonBarAttrs> {

  init(node = this.node) {
    requestAnimationFrame(() => {
      node.parentElement!.classList.add(ButtonBar.cls_has_button_bar)
    })
  }

  removed(node = this.node, parent: Node) {
    (parent as Element).classList.remove(ButtonBar.cls_has_button_bar)
  }

  render(children: E.JSX.Renderable[]) {
    return <div class={[ButtonBar.cls_button_bar, S.flex.row.justifyCenter]}>{children}</div> as HTMLDivElement
  }
}

export namespace ButtonBar {
  export const cls_button_bar = style('button-bar')
  // s(Button.button).childOf(button_bar, {padding: '0 16px',})

  export const cls_has_button_bar = style('has-button-bar', {
    paddingBottom: '0 !important'
  })

}
