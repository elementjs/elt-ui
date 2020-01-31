import { CssNamespace, style, rule } from 'osun'
import { Styling as S } from './styling'
import { inker } from './ink'

export var CONTROL_PADDING = '4px 8px'
export var CONTROL_RADIUS = '4px 8px'

export function Control(a: E.JSX.Attrs, ch: DocumentFragment) {
  return <div class={Control.css.control}>{ch}</div>
}

export namespace Control.css {

  export const control = style('control',
    S.box
      .positionRelative
      .padding(CONTROL_PADDING)
      .overflowHidden
      .noSpuriousBorders
      .noNativeAppearance,
    S.flex.row.inline.alignBaseline,
    {
      borderRadius: CONTROL_RADIUS,
      WebkitTapHighlightColor: `rgba(0, 0, 0, 0)`,
      userSelect: 'none',
      verticalAlign: 'baseline',
    },
  )
  rule`${control} > ::before`({content: '\u00a0'})

  export const color_full = style('color-full', S.box.background(S.TINT).border(S.BG14).text.color(S.BG))
  rule`${color_full} ${inker.cls_container}`({'--eltui-colors-tint': 'var(--eltui-colors-bg)'})
  export const color_faint = style('color-faint', S.box.background(S.TINT07).border(S.TINT14))

  export const control_box = style('control-box',
    S.box.overflowHidden, S.flex.row.inline,
  )

  rule`${control_box} > ${control}`({
    borderRadius: '0',
  })

  rule`${control_box} > ${control}:not(:last-child)`({borderRightWidth: '0'})

  rule`${control_box} > ${control}:last-child`({
    borderRadius: '0 8px 4px 0',
  })

  rule`${control_box} > ${control}:first-child`({
    borderRadius: '4px 0 0 8px',
  })

}

export function ControlBox(a: E.JSX.Attrs, ch: DocumentFragment) {
  return <div class={Control.css.control_box}>{ch}</div>
}