import { style, rule } from 'osun'
import { Styling as S } from './styling'
import { inker } from './ink'
import { o } from 'elt'

export var CONTROL_PADDING = '0.25em 0.5em'
export var CONTROL_RADIUS = '0.25em 0.5em'

export function Control(a: E.JSX.Attrs, ch: DocumentFragment) {
  return <div class={Control.css.control}>{ch}</div>
}

export namespace Control.css {

  export const control = style('control',
    S.box
      .positionRelative
      // .height('calc(1.5em + 2px)')
      .padding(CONTROL_PADDING)
      // .overflowHidden
      .noSpuriousBorders
      .noNativeAppearance
      .inlineBlock,
    // S.flex.row.inline,
    {
      borderRadius: CONTROL_RADIUS,
      WebkitTapHighlightColor: `rgba(0, 0, 0, 0)`,
      lineHeight: 'normal',
      userSelect: 'none',
      verticalAlign: 'baseline',
    },
  )
  rule`${control}::before`({
    content: '"\u00a0"',
    display: 'inline-block',
    height: '1em',
    width: 0
  })
  // rule`${control}::after`({
  //   content: '"\u00a0"',
  //   display: 'inline-block',
  //   height: '1em',
  //   width: 0
  // })

  export const color_full = style('color-full', S.box.background(S.TINT).border(S.BG14).text.color(S.BG))
  rule`${color_full} ${inker.cls_container}`({'--eltui-colors-tint': 'var(--eltui-colors-bg)'})
  export const color_middle = style('color-faint', S.box.background(S.TINT14).border(S.TINT14).text.color(S.TINT))
  export const color_faint = style('color-faint', S.box.background(S.TINT07).border(S.TINT14))

  export const control_box = style('control-box',
    S.flex.row.inline,
  )

  rule`${control_box} > ${control}`({
    borderRadius: '0',
  })

  rule`${control_box} > ${control}:not(:last-child)`({borderRightWidth: '0'})

  rule`${control_box} > ${control}:last-child`({
    borderRadius: '0 0.5em 0.25em 0',
  })

  rule`${control_box} > ${control}:first-child`({
    borderRadius: '0.25em 0 0 0.5em',
  })

  export const control_box_vertical = style('control-box-vertical', S.flex.inline, {flexDirection: 'column'})

  rule`${control_box_vertical} > ${control}`({
    borderRadius: '0',
  })

  rule`${control_box_vertical} > ${control}:not(:last-child)`({borderBottomWidth: '0'})

  rule`${control_box_vertical} > ${control}:first-child`({
    borderRadius: '0.25em 0.5em 0 0',
  })

  rule`${control_box_vertical} > ${control}:last-child`({
    borderRadius: '0 0 0.25em 0.5em',
  })

}

export function ControlBox(a: E.JSX.Attrs & {vertical?: o.RO<boolean>}, ch: DocumentFragment) {
  return <div class={o.tf(a.vertical, v => v ? Control.css.control_box_vertical : Control.css.control_box)}>{ch}</div>
}


export function ControlLabel(a: E.JSX.Attrs, ch: DocumentFragment) {
  return <div class={[Control.css.control, ControlLabel.css.container]}><span class={ControlLabel.css.span}>{ch}</span></div>
}

export namespace ControlLabel.css {
  export const container = style('span', S.box.background(S.TINT07).border(S.TINT14))
  export const span = style('span', S.text.bold.color(S.TINT75).uppercase.size('0.7em'), {verticalAlign: '.125em'})
}