import './checkbox.styl'

import {
  o,
  d,
  click,
  BasicAttributes,
  Observable,
  O,
  Component
} from 'domic'

import {Icon} from './icon'

import {inkable} from './ink'

var CHECKED = 'dot-circle'
var UNCHECKED = 'circle-o'

export interface RadioAttributes<T> extends BasicAttributes {
  model: Observable<T>
  value: T
  disabled?: O<boolean>
}


export class Radio<T> extends Component {

  attrs: RadioAttributes<T>

  disabled: Observable<boolean>
  value: T
  model: Observable<T>

  constructor(attrs: RadioAttributes<T>) {
    super(attrs)

    this.disabled = o(attrs.disabled||false)
    this.value = attrs.value
    this.model = o(attrs.model)
  }

  setValue() {
    this.model.set(this.value)
  }

  render(children: DocumentFragment): Node {

    let classes = {
      on: this.model.eq(this.value),
      off: this.model.ne(this.value),
      disabled: this.disabled
    };

    return <label class='carbm-checkbox-label' $$={[inkable, click(e => this.setValue())]}>
        <Icon
          class={['carbm-checkbox-icon']}
          name={this.model.tf(m => m === this.value ? CHECKED : UNCHECKED)}
        />
        <span class={['carbm-checkbox-content', classes]}>{children}</span>
      </label>;

  }
}

