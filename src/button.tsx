
import {
  o,
  $click,
  Listener,
  Attrs,
  Renderable,
  $init,
  $removed,
  e
} from 'elt'

import S from './styling'
import { style, rule } from 'osun'
import {inker} from './ink'
import { Control } from './control'
import { theme } from './colors'


export interface ButtonAttrs extends Attrs<HTMLButtonElement> {
  bordered?: o.RO<boolean>
  disabled?: o.RO<boolean>
  contrast?: o.RO<boolean>
  click?: Listener<MouseEvent>
  icon?: o.RO<boolean>
}


export function Button(attrs : ButtonAttrs, children: Renderable[]) {

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
    {$click(event => {
      let click = o.get(attrs.click)
      if (!o.get(attrs.disabled)) {
        // in this context, this is the Node.
        inker(event)
        click && click(event)
      }
    })}
    {children}
  </button> as HTMLButtonElement

}

Button.cls_bordered = style('button-bordered', {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.tint
})


export namespace Button {

  export const cls_button = style('button',
    S.box.inlineBlock.noSpuriousBorders.positionRelative.cursorPointer,
    S.text.centered,
    // Control.css.color_middle,
  )

  export const cls_button_classic = style('button-classic', S.text.color(theme.tint).box.border(theme.tint).background(theme.bg))
  export const cls_button_contrast = style('button-contrast', S.text.color(theme.bg).box.background(theme.tint).border(theme.tint))
  // rule`${cls_button_contrast} ${inker.cls_container}`(colors.setTint('bg'))

  export const cls_icon_button = style('icon-button', {
    minWidth: '0',
    fontSize: '1.2em',
    color: theme.tint
  })

  rule`${cls_button}::-moz-focus-inner`({
    border: 0
  })

  rule`${cls_button} > *`({
    pointerEvents: 'none'
  })

  export const cls_disabled = style('disabled', S.text.color(theme.fg14).box.border(theme.fg14))

}


export interface ButtonBarAttrs extends Attrs<HTMLDivElement> {
  stacked?: boolean
}


export function ButtonBar(attrs: Attrs & ButtonBarAttrs, children: Renderable[]) {

  return <div class={[ButtonBar.cls_button_bar, S.flex.row.justifyCenter]}>
    {$init(node => {
      requestAnimationFrame(() => {
        node.parentElement!.classList.add(ButtonBar.cls_has_button_bar)
      })
    })}
    {$removed((node, parent) => {
      (parent as Element).classList.remove(ButtonBar.cls_has_button_bar)
    })}
    {children}
  </div> as HTMLDivElement
}

export namespace ButtonBar {
  export const cls_button_bar = style('button-bar')
  // s(Button.button).childOf(button_bar, {padding: '0 16px',})

  export const cls_has_button_bar = style('has-button-bar', {
    paddingBottom: '0 !important'
  })

}
