
import {
  o,
  click,
  Attrs,
  Component
} from 'elt'


import FaSquareRegular from 'elt-fa/square-regular'
import FaMinusSquare from 'elt-fa/minus-square'
import FaCheckSquareRegular from 'elt-fa/check-square-regular'
import {inkable} from './ink'
import { cls } from 'osun'
import S from './styling'


export interface CheckboxAttributes extends Attrs {
  model: o.O<boolean>
  disabled?: o.RO<boolean>
}

export class Checkbox extends Component<CheckboxAttributes> {

  o_model: o.Observable<boolean> = o(this.attrs.model)
  o_disabled: o.RO<boolean|undefined> = o(this.attrs.disabled)

  toggle() {
    if (o.get(this.o_disabled)) return
    this.o_model.toggle()
  }

  render(children: DocumentFragment): Element {

    function getIcon(value: boolean) {
      if (value === undefined) return <FaMinusSquare class={[Checkbox.cls_icon, classes]}/>
      if (value) return <FaCheckSquareRegular class={[Checkbox.cls_icon, classes]}/>
      return <FaSquareRegular class={[Checkbox.cls_icon, classes]}/>
    }

    let classes = {
      [Checkbox.cls_on]: this.o_model,
      [Checkbox.cls_off]: this.o_model.isFalse(),
      [Checkbox.cls_disabled]: this.o_disabled
    }

    return <label class={[Checkbox.cls_label, S.control]} $$={[inkable(), click(e => this.toggle())]}>
      <div class={[S.flex.row.alignCenter]}>
        {this.o_model.tf(getIcon)}
        <span class={[Checkbox.cls_content, classes]}>{children}</span>
      </div>
    </label>

  }
}


export namespace Checkbox {

  export const cls_on = cls('on')
  export const cls_off = cls('off')
  export const cls_disabled = cls('disabled')

  export const cls_label = cls('label', {
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
  })

  export const cls_content = cls('content', { verticalAlign: 'middle' })
    .and(cls_off, {fill: `rgba(0, 0, 0, 0.74)`})
    .and(cls_disabled, {fill: `rgba(0, 0, 0, 0.26)`})

  export const cls_icon = cls('icon',
    {
      marginRight: '8px',
      transition: 'color linear 0.3s',
    },
  )
  .and(cls_off, {fill: `rgba(0, 0, 0, 0.74)`})
  .and(cls_disabled, {fill: `rgba(0, 0, 0, 0.26)`})
  .and('::before', {fontSize: '18px'})
}
