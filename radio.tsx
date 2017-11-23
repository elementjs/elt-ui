
import {
  o,
  click,
  Attrs,
  Observable,
  MRO,
  Component
} from 'elt'

import flex from './flex'

import {Icon} from './icon'

import {inkable} from './ink'
import {CSS} from './checkbox'


var CHECKED = 'dot-circle'
var UNCHECKED = 'circle-o'

export interface RadioAttributes<T> extends Attrs {
  model: Observable<T>
  value: T
  disabled?: MRO<boolean>
}


export class Radio<T> extends Component {

  attrs: RadioAttributes<T>

  disabled: Observable<boolean>
  value: T
  model: Observable<T>

  init() {
    this.disabled = o(this.attrs.disabled||false)
    this.value = this.attrs.value
    this.model = o(this.attrs.model)
  }

  setValue() {
    this.model.set(this.value)
  }

  render(children: DocumentFragment): Element {

    let classes = {
      [CSS.on]: this.model.equals(this.value),
      [CSS.off]: this.model.differs(this.value),
      [CSS.disabled]: this.disabled
    };

    return <label class={CSS.label} $$={[inkable(), click(e => this.setValue())]}>
        <div class={[flex.row, flex.alignCenter]}>
          <Icon
            class={[CSS.icon, classes]}
            name={this.model.tf(m => m === this.value ? CHECKED : UNCHECKED)}
          />
          <span class={[CSS.content, classes]}>{children}</span>
        </div>
      </label>;

  }
}

