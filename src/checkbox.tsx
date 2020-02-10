
import {
  o,
  $click,
  Component,
} from 'elt'


import FaSquareRegular from 'elt-fa/square-regular'
import FaMinusSquare from 'elt-fa/minus-square'
import FaCheckSquareRegular from 'elt-fa/check-square-regular'
import {$inkable} from './ink'
import { style } from 'osun'
import S from './styling'
import { Control } from './control'


export interface CheckboxAttributes extends E.JSX.Attrs<HTMLButtonElement> {
  model: o.Observable<boolean>
  disabled?: o.RO<boolean>
}

export class Checkbox extends Component<CheckboxAttributes> {

  o_model: o.Observable<boolean> = o(this.attrs.model)
  o_disabled: o.RO<boolean|undefined> = o(this.attrs.disabled)

  toggle() {
    if (o.get(this.o_disabled)) return
    this.o_model.mutate(v => !v)
  }

  render(children: E.JSX.Renderable[]) {

    function getIcon(value: boolean) {
      if (value === undefined) return <FaMinusSquare class={[Checkbox.cls_icon]}/>
      if (value) return <FaCheckSquareRegular class={[Checkbox.cls_icon]}/>
      return <FaSquareRegular class={[Checkbox.cls_icon]}/>
    }

    let classes = {
      [Checkbox.cls_on]: this.o_model,
      [Checkbox.cls_off]: this.o_model.tf(m => m == false),
      [Checkbox.cls_disabled]: this.o_disabled
    }

    return <button class={[Checkbox.cls_label, Control.css.control, classes]}>
      {$inkable}
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

  export const cls_content = style('content', S.box.paddingLeft('0.25em'))

  export const cls_icon = style('icon', S.text.color(S.TINT))
}


export function Toggle({model}: E.JSX.Attrs<HTMLButtonElement> & {model: o.Observable<boolean>}, ch: E.JSX.Renderable[]) {
  return <button class={[
    S.box.cursorPointer,
    Control.css.control,
    Toggle.css.container,
    {[Toggle.css.on]: model},
    // model.tf(m => m ? Control.css.color_middle : Control.css.color_faint)
  ]}
  >
    {$inkable}
    {$click(() => model.mutate(m => !m))}
    {ch}
  </button> as HTMLButtonElement
}

export namespace Toggle.css {
  export const container = style('toggle-container', S.box.border(S.TINT14))
  export const on = style('toggle-on', S.box.background(S.TINT75).text.color(S.BG))
}
