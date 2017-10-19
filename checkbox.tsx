
import {
  o,
  MaybeObservable,
  Observable,
  click,
  Attrs,
  Component
} from 'elt'

import {Row} from './flex'
import {Icon} from './icon'

import {inkable} from './ink'

import * as s from './styling'

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


var OFF = 'square-o'
var ON = 'check-square'
var INDETERMINATE = 'minus-square'

export interface CheckboxAttributes extends Attrs {
  model: Observable<boolean>
  disabled?: MaybeObservable<boolean>
}

export class Checkbox extends Component {

  attrs: CheckboxAttributes

  o_model: Observable<boolean>
  o_disabled: Observable<boolean|undefined>

  toggle() {
    if (this.o_disabled.get()) return
    this.o_model.toggle()
  }

  render(children: DocumentFragment): Element {
    this.o_model = o(this.attrs.model)
    this.o_disabled = o(this.attrs.disabled)

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
        <Row align='center'>
          <Icon class={[CSS.icon, classes]} name={this.o_model.tf(getIcon)}/>
          <span class={[CSS.content, classes]}>{children}</span>
        </Row>
      </label>;

  }
}