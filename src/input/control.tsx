import { style, rule, builder as CSS } from 'osun'
import { o, Attrs, Renderable, e, Insertable, $shadow } from 'elt'
import { theme as T } from '../colors'

export var TOPLEFT_CONTROL_RADIUS = '0.25em'
export var TOPRIGHT_CONTROL_RADIUS = '0.5em'
export var BOTTOM_LEFT_CONTROL_RADIUS = '0.5em'
export var BOTTOM_RIGHT_CONTROL_RADIUS = '0.6em'
export var CONTROL_PADDING = '0.25em 0.5em'
export var CONTROL_RADIUS = '0.25em 0.5em'

export function Control(a: Attrs<HTMLDivElement>) {
  return <div class={css_control}></div> as HTMLDivElement
}


export function ControlTable(a: Attrs<HTMLDivElement>) {
  return <table class={css_control_table}></table>
}

ControlTable.build = function (...args: (Renderable[] | Insertable<HTMLElement>)[]) {
  return <ControlTable>
    {args.map(line => {
      if (!Array.isArray(line))
        return line

      let colspans: (number | null)[] = []
      let rowspans: (number | null)[] = []
      let renderables: Renderable[] = []
      for (let elt of line) {
        if (typeof elt === "number" && elt !== 0) {
          if (elt < 0) rowspans[renderables.length] = -elt
          else colspans[renderables.length] = elt
        } else {
          renderables.push(elt as Renderable)
          colspans.push(null)
          rowspans.push(null)
        }
      }

      return <tr>
        {renderables.map((elt, idx) => {
          const td = <td>{elt}</td> as HTMLTableCellElement
          if (!(elt instanceof Node)) {
            td.setAttribute("class", css_control_label_td.toString())
          }
          let colspan = colspans[idx]
          let rowspan = rowspans[idx]
          if (colspan) td.colSpan = colspan
          if (rowspan) td.rowSpan = rowspan
          return td
        })}
      </tr>
    })}
  </ControlTable>
}

export function ControlRow(a: Attrs<HTMLDivElement>) {
  return <tr></tr>
}

export function ControlBox(a: Attrs<HTMLDivElement> & {vertical?: o.RO<boolean>}) {
  return <div class={o.tf(a.vertical, v => v ? css_control_box_vertical : css_control_box)}></div> as HTMLDivElement
}


export function ControlLabel(a: Attrs<HTMLDivElement>) {
  return <div class={[css_control, css_control_label_container]}>
    {$shadow(<e.Fragment>
      <span>&zwnj;</span>
      <span part="label"><slot></slot></span>
    </e.Fragment>)}
  </div> as HTMLDivElement
}


////////////////////////////////////////////////////////////

export const css_control_label_container = style('ctrllabel', CSS.background(T.tint07).border(T.tint14).row.inline.alignCenter.justifyCenter)
rule`${css_control_label_container}::part(label)`(CSS.color(T.fg75).uppercase.fontSize('0.7em'), { verticalAlign: '.142em' })
export const css_control_label_td = style('ctrllabel-span', CSS.color(T.fg75).uppercase.fontSize('0.7em').background(T.tint07).padding("0.2rem 0.5rem"), { verticalAlign: '.142em' })

rule`th > ${css_control_label_container}`(CSS.background(T.tint14))
rule`${css_control_label_td}::before`({
  content: "'\u200B'",
  fontSize: "1rem"
})



export const css_control_border = style('control-border', {borderRadius: CONTROL_RADIUS})

export const css_control = style('control',
  CSS.positionRelative
    .padding(CONTROL_PADDING)
    .noSpuriousBorders
    .noNativeAppearance
    .inlineBlock,
  {
    WebkitTapHighlightColor: `rgba(0, 0, 0, 0)`,
    lineHeight: 'normal',
    userSelect: 'none',
    verticalAlign: 'baseline',
    transition: `border 0.3s, padding 0.3s, box-shadow 0.3s, background 0.3s`,
  },
  css_control_border
)

export const css_control_active = style('active', {
  boxShadow: `inset 0 -2px 0 0 ${T.tint07}`,
})

export const css_control_box = style('control-box', css_control_border, CSS.row.inline)

rule`${css_control_box} > ${css_control}`({
  borderRadius: '0',
})

rule`${css_control_box} > ${css_control}:not(:last-child)`({
  borderRight: 'hidden'
})

rule`${css_control_box} > ${css_control}:last-child`({
  borderTopRightRadius: '0.5em',
  borderBottomRightRadius: '0.25em',
})

rule`${css_control_box} > ${css_control}:first-child`({
  borderTopLeftRadius: '0.25em',
  borderBottomLeftRadius: '0.5em'
})

export const css_control_box_vertical = style('control-box-vertical', CSS.column.inline, css_control_border)

rule`${css_control_box_vertical} > ${css_control}`({
  borderRadius: '0',
})

rule`${css_control_box_vertical} > ${css_control}:not(:last-child)`({borderBottomWidth: '0'})

rule`${css_control_box_vertical} > ${css_control}:first-child`({
  borderTopRightRadius: '0.5em',
  borderTopLeftRadius: '0.25em',
})

rule`${css_control_box_vertical} > ${css_control}:last-child`({
  borderRadius: '0 0 0.25em 0.5em',
})


export const css_control_table = style('table', {
  position: 'relative',
  display: 'inline-table',
  borderCollapse: 'separate',
  borderSpacing: 0,
})

rule`${css_control_table} > tr > th`({ fontWeight: "bolder" })
rule`${css_control_table} > tr > ${["td","th"]}`({verticalAlign: 'middle'})
rule`${css_control_table} > tr > ${["td","th"]}:not(:last-child) > ${css_control}`({ borderRight: 0 })

rule`${css_control_table} > tr:first-child > ${["td","th"]}:first-child`({ borderTopLeftRadius: '0.25em', })
rule`${css_control_table} > tr:last-child > ${["td","th"]}:first-child`({ borderBottomLeftRadius: '0.5em', })
rule`${css_control_table} > tr:first-child > ${["td","th"]}:last-child`({ borderTopRightRadius: '0.5em', })
rule`${css_control_table} > tr:last-child > ${["td","th"]}:last-child`({ borderBottomRightRadius: '0.25em', })

rule`${css_control_table} ${["td","th"]} > ${css_control}`({
  // display: 'block !important',
  width: '100%',
})
rule`${css_control_table} > tr:not(:first-child) > ${[css_control, `td > ${css_control.selector()}`, `th > ${css_control.selector()}`]}`({
  borderTop: 0
})

rule`${css_control_table} > tr > ${["td", "th"]}`({ border: `1px solid ${T.tint14}`, borderStyle: "none solid solid none" })
rule`${css_control_table} > tr:first-child > ${["td", "th"]}`({ borderTopStyle: "solid" })
rule`${css_control_table} > tr > ${["td", "th"]}:first-child`({ borderLeftStyle: "solid" })
rule`${css_control_table} > tr > ${["td", "th"]} > ${css_control}`({border: 0, borderRadius: 0})

rule`${css_control_table} > tr > ${css_control}`({ borderRadius: 0 })
rule`${css_control_table} > tr > ${css_control}, ${css_control_table} > tr > ${["td","th"]} > ${css_control}`({
  borderRadius: 0,
})