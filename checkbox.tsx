
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


import * as css from './checkbox.styl'


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
      [css.on]: this.o_model,
      [css.off]: this.o_model.isFalse(),
      [css.disabled]: this.o_disabled
    }

    return <label class={css.label} $$={[inkable(), click(e => this.toggle())]}>
        <Row align='center'>
          <Icon class={[css.icon, classes]} name={this.o_model.tf(getIcon)}/>
          <span class={[css.content, classes]}>{children}</span>
        </Row>
      </label>;

  }
}