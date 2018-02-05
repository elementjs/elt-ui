
import {
  o,
  click,
  Attrs,
  O,
  Observable,
  RO,
  Component
} from 'elt'

import flex from './flex'

import {Icon} from './icon'

import {inkable} from './ink'
import {CSS} from './checkbox'


var CHECKED = 'dot-circle'
var UNCHECKED = 'circle-o'

export interface RadioAttributes<T> extends Attrs {
  model: O<T>
  value: RO<T>
  disabled?: RO<boolean>
}


export class Radio<T> extends Component {

  attrs!: RadioAttributes<T>

  disabled!: RO<boolean>
  value!: RO<T>
  model!: Observable<T>

  setValue() {
    this.model.set(o.get(this.value))
  }

  render(children: DocumentFragment): Element {

    this.disabled = o(this.attrs.disabled||false)
    this.value = this.attrs.value
    this.model = o(this.attrs.model)

    let classes = {
      [CSS.on]: this.model.equals(this.value),
      [CSS.off]: this.model.differs(this.value),
      [CSS.disabled]: this.disabled
    };

    return <label class={CSS.label} $$={[inkable(), click(e => this.setValue())]}>
        <div class={[flex.row, flex.alignCenter]}>
          <Icon
            class={[CSS.icon, classes]}
            name={o.merge({model: this.model, value: this.value}).tf(({model: m, value: v}) => m === v ? CHECKED : UNCHECKED)}
          />
          <span class={[CSS.content, classes]}>{children}</span>
        </div>
      </label>;

  }
}

