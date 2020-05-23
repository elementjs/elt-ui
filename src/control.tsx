import { style, rule } from 'osun'
import { Styling as S } from './styling'
import { inker } from './ink'
import { o, Attrs, Renderable } from 'elt'

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
    },
    control_border
  )

  rule`${control}::before`({
    content: '"\u00a0"',
    display: 'inline-block',
    height: '1em',
    width: 0
  })

  rule`${control_border} > ${inker.cls_container}`({
    borderRadius: CONTROL_RADIUS
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
    control_border
  )

  rule`${control_box} > ${control}`({
    borderRadius: '0',
  })

  rule`${control_box} > ${control}:not(:last-child)`({
    borderRightWidth: '0'
  })

  rule`${control_box} > ${control}:last-child, ${control_box} > ${control}:last-child > ${inker.cls_container}`({
    borderTopRightRadius: '0.5em',
    borderBottomRightRadius: '0.25em',
  })

  rule`${control_box} > ${control}:first-child, ${control_box} > ${control}:first-child > ${inker.cls_container}`({
    borderTopLeftRadius: '0.25em',
    borderBottomLeftRadius: '0.5em'
  })

  export const control_box_vertical = style('control-box-vertical', S.flex.inline, {flexDirection: 'column'}, control_border)

  rule`${control_box_vertical} > ${control}`({
    borderRadius: '0',
  })

  rule`${control_box_vertical} > ${control}:not(:last-child)`({borderBottomWidth: '0'})

  rule`${control_box_vertical} > ${control}:first-child, ${control_box_vertical} > ${control}:first-child > ${inker.cls_container}`({
    borderTopRightRadius: '0.5em',
    borderTopLeftRadius: '0.25em',
  })

  rule`${control_box_vertical} > ${control}:last-child, ${control_box_vertical} > ${control}:last-child > ${inker.cls_container}`({
    borderRadius: '0 0 0.25em 0.5em',
  })


  export const ctrl_table = style('table', {
    position: 'relative',
    display: 'inline-table',
    borderCollapse: 'separate',
  })

  export const ctrl_row = style('row', {
    position: 'relative',
    display: 'table-row'
  })

  rule`${ctrl_table} > ${control}`({
    display: 'table-row',
  })

  rule`${ctrl_row} > ${control}:not(:last-child)`({ borderRight: 0 })

  rule`${ctrl_row}:first-child > ${control}:first-child`({ borderTopLeftRadius: '0.25em', })
  rule`${ctrl_row}:last-child > ${control}:first-child`({ borderBottomLeftRadius: '0.5em', })
  rule`${ctrl_row}:first-child > ${control}:last-child`({ borderTopRightRadius: '0.5em', })
  rule`${ctrl_row}:last-child > ${control}:last-child`({ borderBottomRightRadius: '0.25em', })


  rule`${ctrl_row}:not(:first-child) > ${control}`({
    borderTop: 0
  })

  rule`${ctrl_table} > ${control}`({ borderRadius: 0 })
  rule`${ctrl_row} > ${control}`({
    borderRadius: 0,
    display: 'table-cell',
  })
}

export function ControlTable(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
  return <div class={Control.css.ctrl_table}>{ch}</div>
}

export function ControlRow(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
  return <div class={Control.css.ctrl_row}>{ch}</div>
}

export function ControlBox(a: Attrs<HTMLDivElement> & {vertical?: o.RO<boolean>}, ch: Renderable[]) {
  return <div class={o.tf(a.vertical, v => v ? Control.css.control_box_vertical : Control.css.control_box)}>{ch}</div> as HTMLDivElement
}


export function ControlLabel(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
  return <div class={[Control.css.control, ControlLabel.css.container]}><span class={ControlLabel.css.span}>{ch}</span></div> as HTMLDivElement
}

export namespace ControlLabel.css {
  export const container = style('ctrllabel', S.box.background(S.FG07).border(S.FG14))
  export const span = style('ctrllabel-span', S.text.color(S.FG75).uppercase.size('0.7em'), {verticalAlign: '.125em'})
}