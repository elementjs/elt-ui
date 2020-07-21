
import {
  o,
  $click,
  Attrs,
  Renderable,
  If,
  Fragment as $,
  e
} from 'elt'


import {$inkable} from './ink'
import { style, rule } from 'osun'
import S, { Styling } from './styling'
import { Control } from './control'
import { d } from './svg'


export interface CheckboxAttributes extends Attrs<HTMLButtonElement> {
  model: o.Observable<boolean>
  disabled?: o.RO<boolean>
}

export const cls_icon = style('icon', {
  height: '1em',
  fill: 'currentcolor',
  verticalAlign: '-.125em'
})

export const cls_stroked = style('icon-stroked-path', {
  stroke: 'currentcolor',
  strokeWidth: '1.5px',
  fill: 'none',
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
})

export function SvgCheckBox(attrs: Attrs<SVGSVGElement> & { checked?: o.RO<any>, filled?: o.RO<boolean> }, ch: Renderable[]) {
  var thickness = 1.5
  return <svg class={cls_icon} viewBox='0 0 14 16'>
    <path style={{fillRule: 'evenodd'}} d={d.rect(0, 1, 14, 15, 15).rect(thickness, 1 + thickness, 14 - thickness, 15 - thickness, 15)}/>
    {ch}
    {If(attrs.checked, () => <path d={d.moveTo(3.5, 8).lineTo(6, 11).lineTo(10.5, 4.5)} // 'M3 8 L6 11 L11 4'
      class={cls_stroked}
    />)}
  </svg>
}


export function Checkbox(attrs: Attrs<HTMLButtonElement> & CheckboxAttributes, children: Renderable[]) {

  const o_model: o.Observable<boolean> = o(attrs.model)

  function toggle() {
    if (o.get(attrs.disabled)) return
    o_model.set(!o_model.get())
  }

  let classes = {
    [Checkbox.css.on]: o_model,
    [Checkbox.css.off]: o_model.tf(m => m == false),
    [Checkbox.css.disabled]: attrs.disabled
  }

  return <button disabled={attrs.disabled} class={[Checkbox.css.label, Control.css.control, classes]}>
    {$inkable()}
    {$click(e => toggle())}

    <SvgCheckBox class={Checkbox.css.icon} checked={o_model}/>
    {If(children.length > 0, () => <$>
      {' '}
      <span class={[Checkbox.css.content]}>{children}</span>
    </$>)}
  </button> as HTMLButtonElement

}


export namespace Checkbox.css {

  export const on = style('on', Control.css.active)
  export const off = style('off')
  export const disabled = style('disabled', Styling.disabled_colors)

  export const label = style('label', S.box.border(S.TINT14).background(S.BG).cursorPointer)
  rule`${label}[disabled]`(S.box.border(S.FG14).background(S.BG).text.color(S.FG50))
  rule`${label}[disabled] {['i', 'i::before', 'span']}`(S.text.color(S.FG50))

  export const content = style('content')

  export const icon = style('icon', S.text.color(S.TINT))
  rule`${[off, disabled]} ${icon}`(S.text.color(S.TINT50))
}


export function Toggle({model, disabled}: Attrs<HTMLButtonElement> & {model: o.Observable<boolean>, disabled?: o.RO<boolean>}, ch: Renderable[]) {
  return <button disabled={disabled} class={[
    S.box.cursorPointer,
    Control.css.control,
    Toggle.css.container,
    o.tf(model, m => `${S.text.color(m ? S.BG : S.TINT50)} ${m ? Toggle.css.on : Toggle.css.off}`)
  ]}
  >
    {$inkable()}
    {$click(() => model.set(!model.get()))}
    {ch}
  </button> as HTMLButtonElement
}

export namespace Toggle.css {
  export const container = style('toggle-container', S.box.border(S.TINT14))
  export const on = style('toggle-on', S.box.background(S.TINT).border(S.TINT))
  export const off = style('toggle-off', {
    boxShadow: `inset 0 0 3px ${S.TINT14}`
  })
}
