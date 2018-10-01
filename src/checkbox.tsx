
import {
  o,
  click,
  Attrs,
  Component
} from 'elt'

import {Flex} from './flex'

import FaSquareRegular from './icons/square-regular'
import FaMinusSquare from './icons/minus-square'
import FaCheckSquareRegular from './icons/check-square-regular'
import {inkable} from './ink'


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
      if (value === undefined) return <FaMinusSquare class={[Checkbox.icon, classes]}/>
      if (value) return <FaCheckSquareRegular class={[Checkbox.icon, classes]}/>
      return <FaSquareRegular class={[Checkbox.icon, classes]}/>
    }

    let classes = {
      [Checkbox.on]: this.o_model,
      [Checkbox.off]: this.o_model.isFalse(),
      [Checkbox.disabled]: this.o_disabled
    }

    return <label class={[Checkbox.label, Styling.control]} $$={[inkable(), click(e => this.toggle())]}>
        <Flex row class={[Flex.align_center]}>
          {this.o_model.tf(getIcon)}
          <span class={[Checkbox.content, classes]}>{children}</span>
        </Flex>
      </label>;

  }
}

import { cls, s } from 'osun'
import { Styling } from './styling'

export namespace Checkbox {

  export const on = cls('on')
  export const off = cls('off')
  export const disabled = cls('disabled')

  export const label = cls('label', {
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
  })

  export const content = cls('content', { verticalAlign: 'middle' })

  s(content).and(off, {fill: `rgba(0, 0, 0, 0.74)`})
  s(content).and(disabled, {fill: `rgba(0, 0, 0, 0.26)`})

  export const icon = cls('icon',
    {
      marginRight: '8px',
      transition: 'color linear 0.3s',
      '--eltui-color-fg': 'var(--eltui-color-primary)'
    },
  )

  s(icon).and(off, {fill: `rgba(0, 0, 0, 0.74)`}),
  s(icon).and(disabled, {fill: `rgba(0, 0, 0, 0.26)`}),
  s(icon).and(on, {fill: Styling.colors.PRIMARY}),
  s(icon).append('::before', {fontSize: '18px'})
}
