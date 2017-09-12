
import {
  o,
  Component,
  click,
  clickfix,
  DisplayIf,
  MaybeObservable,
  BasicAttributes,
  Listener
} from 'domic'

import {Icon} from './icon'
import {Row} from './flex'

import {inker} from './ink'

export interface ButtonAttributes extends BasicAttributes {
  disabled?: MaybeObservable<boolean>
  raised?: MaybeObservable<boolean>
  click?: Listener<MouseEvent>
  icon?: MaybeObservable<string>
}

export interface ButtonBarAttributes extends BasicAttributes {
  stacked?: boolean
}


export class ButtonBar extends Component {

  attrs: ButtonBarAttributes

  onmount(node: Element, parent: Element) {
    parent.classList.add('dm-has-button-bar')
  }

  onunmount(node: Element, parent: Element) {
    parent.classList.remove('dm-has-button-bar')
  }

  render(children: DocumentFragment): Element {
    return <Row class='dm-button-bar'>{children}</Row>
  }
}


export function Button(attrs : ButtonAttributes, children: DocumentFragment): Element {

  function doClick(this: Node, event: MouseEvent) {
    let click = o.get(attrs.click)
    if (!o.get(attrs.disabled)) {
      // in this context, this is the Node.
      inker(event.target as Node, event)
      click && click.call(this, event)
      // this.element.blur() // to prevent focus lingering.
    }
  }

  return <button
    class='dm-button'
    disabled={o(attrs.disabled).tf(val => !!val)}
    $$={[clickfix, click(doClick)]}
  >
    {DisplayIf(attrs.icon || '',
      o_name => <Icon
        class={['dm-button-icon', {disabled: attrs.disabled, raised: attrs.raised}]}
        name={o_name}
      />
    ,
      () => <span
        class={['dm-button-content', {disabled: attrs.disabled, raised: attrs.raised}]}
      >
        {children}
      </span>
    )}

  </button>

}
