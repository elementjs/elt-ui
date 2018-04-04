
import {
  o,
  Observable,
  O,
  RO,
  click,
  Attrs,
  Component
} from 'elt'

import {Flex} from './flex'
import {Icon} from './icon'

import {inkable} from './ink'


var OFF = 'square-o'
var ON = 'check-square'
var INDETERMINATE = 'minus-square'

export interface CheckboxAttributes extends Attrs {
  model: O<boolean>
  disabled?: RO<boolean>
}

export class Checkbox extends Component<CheckboxAttributes> {

  o_model: Observable<boolean> = o(this.attrs.model)
  o_disabled: RO<boolean|undefined> = o(this.attrs.disabled)

  toggle() {
    if (o.get(this.o_disabled)) return
    this.o_model.toggle()
  }

  render(children: DocumentFragment): Element {

    function getIcon(value: boolean) {
      if (value === undefined) return INDETERMINATE
      if (value) return ON
      return OFF
    }

    let classes = {
      [Checkbox.on]: this.o_model,
      [Checkbox.off]: this.o_model.isFalse(),
      [Checkbox.disabled]: this.o_disabled
    }

    return <label class={Checkbox.label} $$={[inkable(), click(e => this.toggle())]}>
        <Flex row class={[Flex.align_center]}>
          <Icon class={[Checkbox.icon, classes]} name={this.o_model.tf(getIcon)}/>
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
    display: 'inline-block',
    minHeight: '36px',
    padding: '8px',
    '-webkit-tap-highlight-color': Styling.colors.TRANSPARENT
  })

  export const content = cls('content', { verticalAlign: 'middle' })

  s(content).and(off, {color: `rgba(0, 0, 0, 0.74)`})
  s(content).and(disabled, {color: `rgba(0, 0, 0, 0.26)`})

  export const icon = cls('icon',
    {
      marginRight: '8px',
      verticalAlign: 'middle',
      transition: 'color linear 0.3s',
    },
  )

  s(icon).and(off, {color: `rgba(0, 0, 0, 0.74)`}),
  s(icon).and(disabled, {color: `rgba(0, 0, 0, 0.26)`}),
  s(icon).and(on, {color: Styling.colors.PRIMARY}),
  s(icon).append('::before', {fontSize: '18px'})
}
