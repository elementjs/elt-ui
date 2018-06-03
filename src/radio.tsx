
import {
  o,
  click,
  Attrs,
  O,
  RO,
  Component,
  ReadonlyObservable,
  Observable
} from 'elt'

import {Flex} from './flex'
import {Checkbox} from './checkbox'

import FaCircle from './icons/circle-regular'
import FaDotCircle from './icons/dot-circle-regular'
import { Styling } from './styling'
import {inkable} from './ink'


export interface RadioAttributes<T> extends Attrs {
  model: O<T>
  value: RO<T>
  disabled?: RO<boolean>
}


export class Radio<T> extends Component<RadioAttributes<T>> {

  disabled: ReadonlyObservable<boolean> = o(this.attrs.disabled||false)
  value: RO<T> = this.attrs.value
  model: Observable<T> = o(this.attrs.model)

  o_checked = o.merge({model: this.model, value: this.value}).tf(({model: m, value: v}) => m === v)

  setValue() {
    this.model.set(o.get(this.value))
  }

  render(children: DocumentFragment): Element {

    let classes = {
      [Checkbox.on]: this.model.equals(this.value),
      [Checkbox.off]: this.model.differs(this.value),
      [Checkbox.disabled]: this.disabled
    };

    return <label class={[Styling.control, Checkbox.label]} $$={[inkable(), click(e => this.setValue())]}>
        <div class={[Flex.row, Flex.align_center]}>
          {this.o_checked.tf(v => v ?
            <FaDotCircle class={[Checkbox.icon, classes]}/> :
            <FaCircle class={[Checkbox.icon, classes]}/>
          )}
          <span class={[Checkbox.content, classes]}>{children}</span>
        </div>
      </label>;

  }
}

