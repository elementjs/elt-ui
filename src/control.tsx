import { style, rule } from 'osun'
import { Styling as S } from './styling'
import { inker } from './ink'
import { o, Attrs, Renderable, e } from 'elt'

export var TOPLEFT_CONTROL_RADIUS = '0.25em'
export var TOPRIGHT_CONTROL_RADIUS = '0.5em'
export var BOTTOM_LEFT_CONTROL_RADIUS = '0.5em'
export var BOTTOM_RIGHT_CONTROL_RADIUS = '0.6em'
export var CONTROL_PADDING = '0.25em 0.5em'
export var CONTROL_RADIUS = '0.25em 0.5em'

export function Control(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
  return <div class={Control.css.control}>{ch}</div> as HTMLDivElement
}

export namespace Control.css {
  export const control_border = style('control-border', {borderRadius: CONTROL_RADIUS})

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
      WebkitTapHighlightColor: `rgba(0, 0, 0, 0)`,
      lineHeight: 'normal',
      userSelect: 'none',
      verticalAlign: 'baseline',
      transition: `border 0.3s, padding 0.3s, box-shadow 0.3s, background 0.3s`,
    },
    control_border
  )

  export const active = style('active', {
    boxShadow: `inset 0 -2px 0 0 ${S.TINT07}`,
  })

  export const color_full = style('color-full', S.box.background(S.TINT).border(S.TINT14).text.color(S.BG))
  rule`${color_full} ${inker.cls_container}`({'--eltui-colors-tint': 'var(--eltui-colors-bg)'})
  export const color_middle = style('color-faint', S.box.background(S.TINT14).border(S.TINT14).text.color(S.TINT))
  export const color_faint = style('color-faint', S.box.background(S.TINT07).border(S.TINT14))

  export const control_box = style('control-box',
    S.flex.row.inline,
    control_border
  )

  rule`${control_box} > ${control}`({
    borderRadius: '0',
  })

  rule`${control_box} > ${control}:not(:last-child)`({
    borderRight: 'hidden'
  })

  rule`${control_box} > ${control}:last-child`({
    borderTopRightRadius: '0.5em',
    borderBottomRightRadius: '0.25em',
  })

  rule`${control_box} > ${control}:first-child`({
    borderTopLeftRadius: '0.25em',
    borderBottomLeftRadius: '0.5em'
  })

  export const control_box_vertical = style('control-box-vertical', S.flex.inline, {flexDirection: 'column'}, control_border)

  rule`${control_box_vertical} > ${control}`({
    borderRadius: '0',
  })

  rule`${control_box_vertical} > ${control}:not(:last-child)`({borderBottomWidth: '0'})

  rule`${control_box_vertical} > ${control}:first-child`({
    borderTopRightRadius: '0.5em',
    borderTopLeftRadius: '0.25em',
  })

  rule`${control_box_vertical} > ${control}:last-child`({
    borderRadius: '0 0 0.25em 0.5em',
  })


  export const ctrl_table = style('table', {
    position: 'relative',
    display: 'inline-table',
    borderCollapse: 'separate',
  })

  rule`${ctrl_table} > tr > td:not(:last-child) > ${control}`({ borderRight: 0 })

  rule`${ctrl_table} > tr:first-child > td:first-child > ${control}`({ borderTopLeftRadius: '0.25em', })
  rule`${ctrl_table} > tr:last-child > td:first-child > ${control}`({ borderBottomLeftRadius: '0.5em', })
  rule`${ctrl_table} > tr:first-child > td:last-child > ${control}`({ borderTopRightRadius: '0.5em', })
  rule`${ctrl_table} > tr:last-child > td:last-child > ${control}`({ borderBottomRightRadius: '0.25em', })

  rule`${ctrl_table} td > ${control}`({
    display: 'block !important',
    width: '100%',
  })
  rule`${ctrl_table} > tr:not(:first-child) > ${[control, `td > ${control.selector()}`]}`({
    borderTop: 0
  })

  rule`${ctrl_table} > tr > ${control}`({ borderRadius: 0 })
  rule`${ctrl_table} > tr > ${control}, ${ctrl_table} > tr > td > ${control}`({
    borderRadius: 0,
  })
}

export function ControlTable(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
  return <table class={Control.css.ctrl_table}>{ch}</table>
}

export function ControlRow(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
  return <tr>{ch}</tr>
}

export function ControlBox(a: Attrs<HTMLDivElement> & {vertical?: o.RO<boolean>}, ch: Renderable[]) {
  return <div class={o.tf(a.vertical, v => v ? Control.css.control_box_vertical : Control.css.control_box)}>{ch}</div> as HTMLDivElement
}


export function ControlLabel(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
  return <div class={[Control.css.control, ControlLabel.css.container]}>
    <span>&zwnj;</span>
    <span class={ControlLabel.css.span}>{ch}</span>
  </div> as HTMLDivElement
}

export namespace ControlLabel.css {
  export const container = style('ctrllabel', S.box.background(S.TINT07).border(S.TINT14).flex.row.inline.alignCenter)
  export const span = style('ctrllabel-span', S.text.color(S.FG75).uppercase.size('0.7em'), { verticalAlign: '.142em' })
}
