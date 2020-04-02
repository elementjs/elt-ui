
import {
  o,
  $click,
  Component,
  Attrs,
  Renderable,
} from 'elt'


import {$inkable} from './ink'
import { style, rule } from 'osun'
import S from './styling'
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
    }

    return <button disabled={this.attrs.disabled} class={[Checkbox.cls_label, Control.css.control, classes]}>
      {$inkable()}
      {$click(e => this.toggle())}

      {this.o_model.tf(getIcon)}
      {' '}
      <span class={[Checkbox.cls_content]}>{children}</span>
    </button> as HTMLButtonElement

  }
}


export namespace Checkbox {

  export const cls_on = style('on')
  export const cls_off = style('off')
  export const cls_disabled = style('disabled')

  export const cls_label = style('label', S.box.border(S.TINT14).background(S.BG).cursorPointer)
  // rule`${cls_label}${cls_on}`(S.box.background(S.TINT14))
  rule`${cls_label}[disabled]`(S.SetTint('#dddddd'))

  export const cls_content = style('content', S.box.paddingLeft('0.25em'))

  export const cls_icon = style('icon', S.text.color(S.TINT))
}


export function Toggle({model, disabled}: Attrs<HTMLButtonElement> & {model: o.Observable<boolean>, disabled?: o.RO<boolean>}, ch: Renderable[]) {
  return <button disabled={disabled} class={[
    S.box.cursorPointer,
    Control.css.control,
    Toggle.css.container,
    {[Toggle.css.on]: model},
    // model.tf(m => m ? Control.css.color_middle : Control.css.color_faint)
  ]}
  >
    {$inkable()}
    {$click(() => model.set(!model.get()))}
    {ch}
  </button> as HTMLButtonElement
}

export namespace Toggle.css {
  export const container = style('toggle-container', S.box.border(S.TINT14))
  export const on = style('toggle-on', S.box.background(S.TINT75).text.color(S.BG))
}
