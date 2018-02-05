
import {
  o,
  Observable,
  O,
  RO,
  click,
  Attrs,
  Component
} from 'elt'

import flex from './flex'
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
      [CSS.on]: this.o_model,
      [CSS.off]: this.o_model.isFalse(),
      [CSS.disabled]: this.o_disabled
    }

    return <label class={CSS.label} $$={[inkable(), click(e => this.toggle())]}>
        <div class={[flex.row, flex.alignCenter]}>
          <Icon class={[CSS.icon, classes]} name={this.o_model.tf(getIcon)}/>
          <span class={[CSS.content, classes]}>{children}</span>
        </div>
      </label>;

  }
}

import s from './styling'

export namespace CSS {
  export const on = s.style('on')
  export const off = s.style('off')
  export const disabled = s.style('disabled')

  export const label = s.style('label', {
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'inline-block',
    minHeight: '36px',
    padding: '8px',
    '-webkit-tap-highlight-color': s.colors.Invisible
  })

  export const content = s.style('content',
    { verticalAlign: 'middle' },
    s.and(off, {color: `rgba(0, 0, 0, 0.74)`}),
    s.and(disabled, {color: `rgba(0, 0, 0, 0.26)`})
  )

  export const icon = s.style('icon',
    {
      marginRight: '8px',
      verticalAlign: 'middle',
      transition: 'color linear 0.3s',
    },
    s.and(off, {color: `rgba(0, 0, 0, 0.74)`}),
    s.and(disabled, {color: `rgba(0, 0, 0, 0.26)`}),
    s.and(on, {color: s.colors.Primary}),
    s.before({fontSize: '18px'})
  )
}
