
import {
  o,
  click,
  Attrs,
  Observable,
  MaybeObservable,
  Component
} from 'elt'

import {Row} from './flex'

import {Icon} from './icon'

import {inkable} from './ink'

import * as css from './checkbox.styl'

var CHECKED = 'dot-circle'
var UNCHECKED = 'circle-o'

export interface RadioAttributes<T> extends Attrs {
  model: Observable<T>
  value: T
  disabled?: MaybeObservable<boolean>
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
      [css.on]: this.model.equals(this.value),
      [css.off]: this.model.differs(this.value),
      [css.disabled]: this.disabled
    };

    return <label class={css.label} $$={[inkable(), click(e => this.setValue())]}>
        <Row align='center'>
          <Icon
            class={[css.icon, classes]}
            name={this.model.tf(m => m === this.value ? CHECKED : UNCHECKED)}
          />
          <span class={[css.content, classes]}>{children}</span>
        </Row>
      </label>;

  }
}

