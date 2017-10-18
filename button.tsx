
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
import {Row} from './flex'

import {inker} from './ink'


import {style, cssRule} from 'typestyle'

export namespace CSS {

  export const button = style({
    // This style applies to a button, that we want to completely reset.
    border: 0,
    margin: 0,
    background: 'none',
    position: 'relative',
    display: 'inline-block',
    padding: '8px', // this is to allow more space for touch events.
    outline: 0,
    '-webkit-tap-highlight-color': `rgba(0,0,0,0)`
  })

  export const baseButton = style({
    '-webkit-tap-highlight-color': `rgba(0,0,0,0)`,
    verticalAlign: 'middle',
    color: `var(--em-color-primary)`,
    display: 'inline-block',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative' // needed for inker.
  })

  export const buttonContent = style({
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

  export const buttonIcon = style({
    $nest: {
      '&:before': {
        fontSize: '24px',
        color: `var(--em-color-primary)`,
      }
    }
  })

  export const raised = style({
    color: 'var(--em-color-text-inverted, white)',
    backgroundColor: 'var(--em-color-primary)',
    boxShadow: `3px 3px 5px rgba(0, 0, 0, 0.54)`
  })

  export const disabled = style({
    color: `var(--em-color-disabled)`,
    boxShadow: 'none'
  })

  export const iconButton = style({
    $nest: {
      ['&:before']: {
        fontSize: '24px'
      }
    }
  })


  cssRule(`.${button} + .${button}`, {
    marginLeft: 0,
    marginTop: 0
  })

  export const buttonBar = style({
    $nest: {
      [`& > .${button}`]: {
        paddingBottom: 0
      }
    }
  })

  export const hasButtonBar = style({
    paddingBottom: 0
  })

}


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
    return <Row class={CSS.buttonBar}>{children}</Row>
  }
}


export interface ButtonAttrs extends Attrs {
  disabled?: MaybeObservable<boolean>
  raised?: MaybeObservable<boolean>
  click?: Listener<MouseEvent>
  icon?: MaybeObservable<string>
}


export function Button(attrs : ButtonAttrs, children: DocumentFragment): Element {

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
    class={CSS.button}
    disabled={o(attrs.disabled).tf(val => !!val)}
    $$={click(doClick)}
  >
    {DisplayIf(attrs.icon || '',
      o_name => <Icon
        class={[
          CSS.baseButton,
          CSS.buttonIcon,
          {[CSS.disabled]: attrs.disabled, [CSS.raised]: attrs.raised}
        ]}
        name={o_name}
      />
    ,
      () => <span
        class={[
          CSS.baseButton,
          CSS.buttonContent,
          {[CSS.disabled]: attrs.disabled, [CSS.raised]: attrs.raised}
        ]}
      >
        {children}
      </span>
    )}

  </button>

}
