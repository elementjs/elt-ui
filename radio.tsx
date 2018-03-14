
import {
  o,
  click,
  Attrs,
  O,
  Observable,
  RO,
  Component
} from 'elt'

import {css as flex} from './flex'
import {css} from './checkbox'

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
      [css.on]: this.model.equals(this.value),
      [css.off]: this.model.differs(this.value),
      [css.disabled]: this.disabled
    };

    return <label class={css.label} $$={[inkable(), click(e => this.setValue())]}>
        <div class={[flex.row, flex.align_center]}>
          <Icon
            class={[css.icon, classes]}
            name={o.merge({model: this.model, value: this.value}).tf(({model: m, value: v}) => m === v ? CHECKED : UNCHECKED)}
          />
          <span class={[css.content, classes]}>{children}</span>
        </div>
      </label>;

  }
}

