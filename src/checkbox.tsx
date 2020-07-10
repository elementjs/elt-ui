
import {
  o,
  $click,
  Component,
  Attrs,
  Renderable,
  If,
  Fragment as $
} from 'elt'


import {$inkable} from './ink'
import { style, rule } from 'osun'
import S, { Styling } from './styling'
import { Control } from './control'
import { I } from './icon'


export interface CheckboxAttributes extends Attrs<HTMLButtonElement> {
  model: o.Observable<boolean>
  disabled?: o.RO<boolean>
}

export class Checkbox extends Component<CheckboxAttributes> {

  o_model: o.Observable<boolean> = o(this.attrs.model)

  toggle() {
    if (o.get(this.attrs.disabled)) return
    this.o_model.set(!this.o_model.get())
  }

  render(children: Renderable[]) {

    function getIcon(value: boolean) {
      if (value === undefined) return <I class={[Checkbox.cls_icon]} regular name='minus-square'/>
      if (value) return <I class={[Checkbox.cls_icon]} regular name='check-square'/>
      return <I class={[Checkbox.cls_icon]} regular name='square'/>
    }

    let classes = {
      [Checkbox.cls_on]: this.o_model,
      [Checkbox.cls_off]: this.o_model.tf(m => m == false),
      [Checkbox.cls_disabled]: this.attrs.disabled
    }

    return <button disabled={this.attrs.disabled} class={[Checkbox.cls_label, Control.css.control, classes]}>
      {$inkable()}
      {$click(e => this.toggle())}

      {this.o_model.tf(getIcon)}
      {If(children.length > 0, () => <$>
        {' '}
        <span class={[Checkbox.cls_content]}>{children}</span>
      </$>)}
    </button> as HTMLButtonElement

  }
}


export namespace Checkbox {

  export const cls_on = style('on', Control.css.active)
  export const cls_off = style('off')
  export const cls_disabled = style('disabled', Styling.disabled_colors)

  export const cls_label = style('label', S.box.border(S.TINT14).background(S.BG).cursorPointer)
  rule`${cls_label}[disabled]`(S.box.border(S.FG14).background(S.BG).text.color(S.FG50))
  rule`${cls_label}[disabled] {['i', 'i::before', 'span']}`(S.text.color(S.FG50))

  export const cls_content = style('content', S.box.paddingLeft('0.25em'))

  export const cls_icon = style('icon', S.text.color(S.TINT))
  rule`${[cls_off, cls_disabled]} ${cls_icon}`(S.text.color(S.TINT50))
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
  export const on = style('toggle-on', S.box.background(S.TINT))
  export const off = style('toggle-off', {
    boxShadow: `inset 0 0 3px ${S.TINT14}`
  })
}
