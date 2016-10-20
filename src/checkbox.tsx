
import {
  o,
  O,
  Observable,
  d,
  click,
  BasicAttributes,
  Component
} from 'domic'

import {Icon} from './icon'

import {inkable} from './ink'
import './checkbox.styl'

var OFF = 'square-o'
var ON = 'check-square'
var INDETERMINATE = 'minus-square'

export interface CheckboxAttributes extends BasicAttributes {
  model: Observable<boolean>
  disabled?: O<boolean>
}

export class Checkbox extends Component {

  attrs: CheckboxAttributes

  o_model: Observable<boolean>
  o_disabled: Observable<boolean>

  constructor(attrs: CheckboxAttributes) {
    super(attrs)

    this.o_model = o(this.attrs.model)
    this.o_disabled = o(this.attrs.disabled)
  }

  toggle() {
    if (this.o_disabled.get()) return;

    this.o_model.set(!this.o_model.get());
  }

  render(children: DocumentFragment): Node {

    function getIcon(value: boolean) {
      if (value === undefined) return INDETERMINATE
      if (value) return ON
      return OFF
    }

    let classes = {on: this.o_model, off: this.o_model.isFalse(), disabled: this.o_disabled}

    return <label class='carbm-checkbox-label' $$={[inkable, click(e => this.toggle())]}>
        <Icon class={['carbm-checkbox-icon', classes]} name={this.o_model.tf(getIcon)}/>
        <span class={['carbm-checkbox-content', classes]}>{children}</span>
      </label>;

  }
}