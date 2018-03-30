
import {
  o,
  click,
  Attrs,
  O,
  Observable,
  RO,
  Component
} from 'elt'

import {Flex} from './flex'
import {Checkbox} from './checkbox'

import {Icon} from './icon'

import {inkable} from './ink'


var CHECKED = 'dot-circle'
var UNCHECKED = 'circle-o'

export interface RadioAttributes<T> extends Attrs {
  model: O<T>
  value: RO<T>
  disabled?: RO<boolean>
}


export class Radio<T> extends Component<RadioAttributes<T>> {

  disabled: RO<boolean> = o(this.attrs.disabled||false)
  value: RO<T> = this.attrs.value
  model: Observable<T> = o(this.attrs.model)

  setValue() {
    this.model.set(o.get(this.value))
  }

  render(children: DocumentFragment): Element {

    let classes = {
      [Checkbox.on]: this.model.equals(this.value),
      [Checkbox.off]: this.model.differs(this.value),
      [Checkbox.disabled]: this.disabled
    };

    return <label class={Checkbox.label} $$={[inkable(), click(e => this.setValue())]}>
        <div class={[Flex.row, Flex.align_center]}>
          <Icon
            class={[Checkbox.icon, classes]}
            name={o.merge({model: this.model, value: this.value}).tf(({model: m, value: v}) => m === v ? CHECKED : UNCHECKED)}
          />
          <span class={[Checkbox.content, classes]}>{children}</span>
        </div>
      </label>;

  }
}

