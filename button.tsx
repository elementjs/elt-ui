
import {
  o,
  Component,
  click,
  DisplayIf,
  MaybeObservable,
  Attrs,
  Listener
} from 'elt'

import {Icon} from './icon'
import flex from './flex'

import {inker} from './ink'


import s from './styling'


export interface ButtonBarAttrs extends Attrs {
  stacked?: boolean
}


export class ButtonBar extends Component {

  attrs: ButtonBarAttrs

  inserted(node: Element, parent: Element) {
    parent.classList.add(CSS.hasButtonBar)
  }

  removed(node: Element, parent: Element) {
    parent.classList.remove(CSS.hasButtonBar)
  }

  render(children: DocumentFragment): Element {
    return <div class={[CSS.buttonBar, flex.row]}>{children}</div>
  }
}


export interface ButtonAttrs extends Attrs {
  bordered?: MaybeObservable<boolean>
  disabled?: MaybeObservable<boolean>
  raised?: MaybeObservable<boolean>
  click?: Listener<MouseEvent>
  icon?: MaybeObservable<string>
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
    class={CSS.button}
    disabled={o(attrs.disabled).tf(val => !!val)}
    $$={click(doClick)}
  >
    {DisplayIf(attrs.icon || '',
      o_name => <Icon
        class={[
          CSS.baseButton,
          CSS.buttonIcon,
          {[CSS.disabled]: attrs.disabled, [CSS.raised]: attrs.raised, [CSS.bordered]: attrs.bordered}
        ]}
        name={o_name}
      />
    ,
      () => <span
        class={[
          CSS.baseButton,
          CSS.buttonContent,
          {[CSS.disabled]: attrs.disabled, [CSS.raised]: attrs.raised, [CSS.bordered]: attrs.bordered}
        ]}
      >
        {children}
      </span>
    )}

  </button>

}


export namespace CSS {

    export const button = s.style('button',
      s.values.NoSpuriousBorders,
      {
        // This style applies to a button, that we want to completely reset.
        border: 0,
        margin: 0,
        background: 'none',
        position: 'relative',
        display: 'inline-block',
        padding: '8px', // this is to allow more space for touch events.
      }
    )

    export const baseButton = s.style('base-button',
      s.values.NoSpuriousBorders,
      {
        verticalAlign: 'middle',
        color: s.colors.Primary,
        display: 'inline-block',
        textAlign: 'center',
        cursor: 'pointer',
        position: 'relative' // needed for inker.
      }
    )

    export const buttonContent = s.style('button-content', {
      minWidth: '64px',
      textTransform: 'uppercase',
      fontWeight: 500,

      // Should probably have a mixin for that
      // as it should be some global configuration option.
      borderRadius: '2px',
      borderStyle: 'none',

      padding: `0 6px`,
      lineHeight: '36px',
      height: '36px',
      userSelect: 'none'
    })

    export const buttonIcon = s.style('button-icon',
      s.before({
        fontSize: '24px',
        color: s.colors.Primary
    }))

    export const raised = s.style('raised',
      s.values.BoxShadow,
      {
        color: s.colors.Contrast,
        backgroundColor: s.colors.Primary
      }
    )

    export const bordered = s.style('bordered', {
      border: `1px solid`,
      borderColor: s.colors.Primary
    })

    export const disabled = s.style('disabled', {
      color: s.colors.FgVeryLight,
      boxShadow: 'none'
    })

    export const iconButton = s.style('icon-button',
      s.before({fontSize: '24px'})
    )

    s.rule(`.${button} + .${button}`, {
      marginLeft: 0,
      marginTop: 0
    })


    export const buttonBar = s.style('button-bar',
      s.child(button, {paddingBottom: 0})
    )

    export const hasButtonBar = s.style('has-button-bar', {
      paddingBottom: 0
    })

  }

