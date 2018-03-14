
import {
  o,
  Component,
  click,
  DisplayIf,
  RO,
  Attrs,
  Listener
} from 'elt'

import {Icon} from './icon'
import {css as flex} from './flex'

import {inker} from './ink'


export interface ButtonBarAttrs extends Attrs {
  stacked?: boolean
}


export class ButtonBar extends Component<ButtonBarAttrs> {

  inserted(node: Element, parent: Element) {
    parent.classList.add(css.has_button_bar)
  }

  removed(node: Element, parent: Element) {
    parent.classList.remove(css.has_button_bar)
  }

  render(children: DocumentFragment): Element {
    return <div class={[css.button_bar, flex.row, flex.justify_end]}>{children}</div>
  }
}


export interface ButtonAttrs extends Attrs {
  bordered?: RO<boolean>
  disabled?: RO<boolean>
  raised?: RO<boolean>
  click?: Listener<MouseEvent>
  icon?: RO<string>
}


export function Button(attrs : ButtonAttrs, children: DocumentFragment): Element {

  function doClick(this: Node, event: MouseEvent, node: Node) {
    let click = o.get(attrs.click)
    if (!o.get(attrs.disabled)) {
      // in this context, this is the Node.
      var n = event.target as Node
      inker(n === node ? n.firstChild! : n, event)
      click && click.call(this, event, node)
    }
  }

  return <button
    class={css.button}
    disabled={o(attrs.disabled).tf(val => !!val)}
    $$={click(doClick)}
  >
    {DisplayIf(o(attrs.icon),
      o_name => <Icon
        class={[
          css.base_button,
          css.button_icon,
          {[css.disabled]: attrs.disabled, [css.raised]: attrs.raised, [css.bordered]: attrs.bordered}
        ]}
        name={o_name}
      />
    ,
      () => <span
        class={[
          css.base_button,
          css.button_content,
          {[css.disabled]: attrs.disabled, [css.raised]: attrs.raised, [css.bordered]: attrs.bordered}
        ]}
      >
        {children}
      </span>
    )}

  </button>

}


import {css as base} from './styling'
import {cls, s} from 'osun'

export namespace css {

    export const button = cls('button',
      base.no_spurious_borders,
      {
        // This style applies to a button, that we want to completely reset.
        border: 0,
        margin: 0,
        background: 'none',
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        padding: '8px', // this is to allow more space for touch events.
      },
    )

    s(button).append(`::-moz-focus-inner`, {border: 0})

    export const base_button = cls('base-button',
      base.no_spurious_borders,
      {
        verticalAlign: 'middle',
        color: base.colors.PRIMARY,
        display: 'inline-block',
        textAlign: 'center',
        cursor: 'pointer',
        position: 'relative' // needed for inker.
      }
    )

    export const button_content = cls('button-content', {
      minWidth: '64px',
      textTransform: 'uppercase',
      fontWeight: 'bold',

      // Should probably have a mixin for that
      // as it should be some global configuration option.
      borderRadius: '2px',
      borderStyle: 'none',

      padding: `0 6px`,
      lineHeight: '36px',
      height: '36px',
      userSelect: 'none'
    })

    export const button_icon = cls('button-icon')

    s(button_icon).append(`::before`, {
      fontSize: '24px',
      color: base.colors.PRIMARY
    })

    export const raised = cls('raised',
      base.raised,
      base.colors.reverse_primary
    )

    export const bordered = cls('bordered', {
      border: `1px solid`,
      borderColor: base.colors.PRIMARY
    })

    export const disabled = cls('disabled', {
      color: base.colors.FG4,
      boxShadow: 'none'
    })

    export const icon_button = cls('icon-button')
    s(icon_button).append('::before', {fontSize: '24px'})

    s(button).after(s(button), {
      marginLeft: 0,
      marginTop: 0
    })

    export const button_bar = cls('button-bar')
    s(button).childOf(button_bar, {paddingBottom: 0})

    export const has_button_bar = cls('has-button-bar', {
      paddingBottom: '0 !important'
    })

  }

