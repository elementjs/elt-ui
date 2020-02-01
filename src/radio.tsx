
import {
  o,
  click,
  Component,
} from 'elt'

import {Checkbox} from './checkbox'

import FaCircle from 'elt-fa/circle-regular'
import FaDotCircle from 'elt-fa/dot-circle-regular'
import {inkable} from './ink'
import { Control } from './control'


export interface RadioAttributes<T> extends E.JSX.Attrs {
  model: o.Observable<T>
  value: o.RO<T>
  disabled?: o.RO<boolean>
}


export class Radio<T> extends Component<RadioAttributes<T>> {

  disabled: o.ReadonlyObservable<boolean> = o(this.attrs.disabled||false)
  value: o.RO<T> = this.attrs.value
  model: o.Observable<T> = o(this.attrs.model)

  o_checked = o.merge({model: this.model, value: this.value}).tf(({model: m, value: v}) => m === v)

  setValue() {
    this.model.set(o.get(this.value))
  }

  render(children: DocumentFragment): Element {

    const equals = o.virtual([this.model, this.value], ([m, v]) => m === v)

    let classes = {
      [Checkbox.cls_on]: equals,
      [Checkbox.cls_off]: equals.tf(e => !e),
      [Checkbox.cls_disabled]: this.disabled
    };

    return <label class={[Control.css.control, Checkbox.cls_label, classes]} $$={[inkable(), click(e => this.setValue())]}>
        {this.o_checked.tf(v => v ?
          <FaDotCircle class={Checkbox.cls_icon}/> :
          <FaCircle class={Checkbox.cls_icon}/>
        )}
        <span class={Checkbox.cls_content}>{children}</span>
      </label>;

  }
}

