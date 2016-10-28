
import {
  o,
  d,
  on,
  Component,
  click,
  DisplayIf,
  DisplayUnless,
  O,
  onmount,
  onunmount,
  BasicAttributes,
  Listener
} from 'domic'

import {Icon} from './icon'
import {Row} from './flex'

import {inkable} from './ink'

export interface ButtonAttributes extends BasicAttributes {
  disabled?: O<boolean>
  raised?: O<boolean>
  click?: Listener<MouseEvent>
  icon?: O<string>
}

export interface ButtonBarAttributes extends BasicAttributes {
  stacked?: boolean
}


export class ButtonBar extends Component {

  attrs: ButtonBarAttributes

  @onmount
  addCls(node: HTMLElement) {
    node.parentElement.classList.add('dm-has-button-bar')
  }

  @onunmount
  removeCls(node: HTMLElement) {
    node.parentElement.classList.remove('dm-has-button-bar')
  }

  render(children: DocumentFragment): Node {
    return <Row class='dm-button-bar'>{children}</Row>
  }
}


export function Button(attrs : ButtonAttributes, children: DocumentFragment): Node {

  function doClick(this: Node, event: MouseEvent) {
    let click = o.get(attrs.click)
    if (!o.get(attrs.disabled)) {
      // in this context, this is the Node.
      click && click.call(this, event);
      // this.element.blur() // to prevent focus lingering.
    }
  }

  return <button
    class='dm-button'
    disabled={o(attrs.disabled).tf((val: boolean) => val ? val : undefined)}
    $$={[click(doClick), inkable]}
  >
    {DisplayIf(attrs.icon,
      name => <Icon
        class={['dm-button-icon', {disabled: attrs.disabled, raised: attrs.raised}]}
        name={attrs.icon}
      />)}
    {DisplayUnless(attrs.icon, () => <span
      class={['dm-button-content', {disabled: attrs.disabled, raised: attrs.raised}]}
    >
        {children}
    </span>
    )}
  </button>

}
