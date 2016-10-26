
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
} from 'domic'

import {Icon} from './icon'
import {Row} from './flex'

import {inkable} from './ink'

export interface ButtonAttributes extends BasicAttributes {
  disabled?: O<boolean>
  raised?: O<boolean>
  click?: (ev: MouseEvent) => any
  icon?: O<string>
}

export interface ButtonBarAttributes extends BasicAttributes {
  stacked?: boolean
}


export class ButtonBar extends Component {

  attrs: ButtonBarAttributes

  @onmount
  addCls(node: HTMLElement) {
    node.parentElement.classList.add('carbm-has-button-bar')
  }

  @onunmount
  removeCls(node: HTMLElement) {
    node.parentElement.classList.remove('carbm-has-button-bar')
  }

  render(children: DocumentFragment): Node {
    return <Row class='carbm-button-bar'>{children}</Row>
  }
}


export function Button(attrs : ButtonAttributes, children: DocumentFragment): Node {

  // FIXME missing ripple.
  // let fn = attrs.click || function () {};

  function doClick(this: Node, event: MouseEvent) {
    let click = o.get(attrs.click)
    if (!o.get(attrs.disabled)) {
      // in this context, this is the Node.
      click(event);
      // this.element.blur() // to prevent focus lingering.
    }
  }

  return <button
    class='carbm-button'
    disabled={o(attrs.disabled).tf((val: boolean) => val ? val : undefined)}
    $$={[click(doClick), inkable]}
  >
    {DisplayIf(attrs.icon,
      name => <Icon
        class={['carbm-button-icon', {disabled: attrs.disabled, raised: attrs.raised}]}
        name={attrs.icon}
      />)}
    {DisplayUnless(attrs.icon, () => <span
      class={['carbm-button-content', {disabled: attrs.disabled, raised: attrs.raised}]}
    >
        {children}
    </span>
    )}
  </button>

}
