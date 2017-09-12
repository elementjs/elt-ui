
import {
  o,
  MaybeObservable,
  Observable,
  click,
  clickfix,
  BasicAttributes,
  Component
} from 'domic'

import {Row} from './flex'
import {Icon} from './icon'

import {inkable} from './ink'

var OFF = 'square-o'
var ON = 'check-square'
var INDETERMINATE = 'minus-square'

export interface CheckboxAttributes extends BasicAttributes {
  model: Observable<boolean>
  disabled?: MaybeObservable<boolean>
}

export class Checkbox extends Component {

  attrs: CheckboxAttributes

  o_model: Observable<boolean> = o(this.attrs.model)
  o_disabled: Observable<boolean|undefined> = o(this.attrs.disabled)

  toggle() {
    if (this.o_disabled.get()) return
    this.o_model.toggle()
  }

  render(children: DocumentFragment): Element {

    function getIcon(value: boolean) {
      if (value === undefined) return INDETERMINATE
      if (value) return ON
      return OFF
    }

    let classes = {
      on: this.o_model,
      off: this.o_model.isFalse(),
      disabled: this.o_disabled
    }

    return <label class='dm-checkbox-label' $$={[inkable, clickfix, click(e => this.toggle())]}>
        <Row class='dm-checkbox-row' align='center'>
          <Icon class={['dm-checkbox-icon', classes]} name={this.o_model.tf(getIcon)}/>
          <span class={['dm-checkbox-content', classes]}>{children}</span>
        </Row>
      </label>;

  }
}