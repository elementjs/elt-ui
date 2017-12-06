
import {
  Attrs,
  ClassDefinition,
  click,
  Renderable,
  Mixin,
  DisplayIf,
  Fragment as F,
  RO,
  inserted,
  removed,
} from 'elt';

import flex from './flex'
import {animateClass, CSS as AnimateCSS} from './animate'
import {Button} from './button';

export class DialogCtrl<T> extends Mixin {
  promise: Promise<T>
  _resolve: (v: T) => any
  _reject: (...a: Array<any>) => any


  constructor() {
    super()

    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resolve(value: T) {
    this._resolve(value);
  }

  reject(value: any) {
    this._reject(value);
  }

}

export function Overlay(attrs: Attrs, children: DocumentFragment): Element {
  return <div class={[CSS.overlay, flex.column, flex.alignCenter, flex.justifyCenter]}>{children}</div>
}

export function Title(attrs: Attrs, children: DocumentFragment): Element { return <h3 class={CSS.title}>{children}</h3> }
export function Content(attrs: Attrs, children: DocumentFragment): Element { return <div class={CSS.content}>{children}</div> }

export interface ButtonbarAttributes extends Attrs {
  stacked?: RO<boolean>
}

// FIXME this node should watch the width of its children to be able
// to switch to the vertical presentation for dialog buttons.
export function Buttonbar(attrs: ButtonbarAttributes, children: DocumentFragment): Element {
  return <div class={[flex.row, flex.justifyEnd]}>{children}</div>
}

export function Root(attrs: Attrs, children: DocumentFragment): Element {
  return <div class={[CSS.root, flex.column]}>{children}</div>
}

export interface DialogOptions {
  parent?: Node
  class?: ClassDefinition | ClassDefinition[]
  noanimate?: boolean
  clickOutsideToClose?: boolean
  noEscapeKey?: boolean
  animationEnter?: string
  animationLeave?: string
}

export type DialogBuilder<T> = (dlc: DialogCtrl<T>) => Node

/**
 * A function that returns a promise and that allows us to show a nice dialog.
 */
export function dialog<T>(opts: DialogOptions, cbk: DialogBuilder<T>): Promise<T> {

  let dlg = new DialogCtrl<T>();

  let contents = cbk(dlg)

  function bye(res: T) {
    return animateClass(dialog_holder, CSS.leave).then(() => {
      dialog_holder.remove()
      return res
    })
  }

  function handleEscape(ev: KeyboardEvent) {
    if (opts.noEscapeKey) return
    if (ev.keyCode === 27)
      dlg.reject('pressed escape')
  }

  let dialog_holder = <Overlay $$={[
    click(function (e, node) {
      if (e.target === node && opts.clickOutsideToClose) dlg.reject('clicked outside to close')
    }),
    dlg,
    // Handle the escape key.
    inserted(node => node.ownerDocument.addEventListener('keyup', handleEscape)),
    removed(node => node.ownerDocument.removeEventListener('keyup', handleEscape))
  ]}>
    <Root class={opts.class ? opts.class : ''}>{contents}</Root>
  </Overlay> as HTMLElement

  if (!opts.noanimate) {
    animateClass(dialog_holder, CSS.enter)
  }

  // Remove the dialog from the DOM once we have answered it.

  let parent = opts.parent || document.body

  parent.appendChild(dialog_holder)

  return dlg.promise.then(bye, (err) => bye(Promise.reject(err) as any))

}


export interface ModalOptions extends DialogOptions {
  text: Renderable
  title: Renderable
  agree?: Renderable
  disagree?: Renderable,
}

/**
 * A modal dialog.
 * @param  {Object} opts Options
 * @return {Promise}
 */
export function modal(opts: ModalOptions) {

  return dialog<boolean>(opts, (dlg) =>
    <F>
      {opts.title ? <Title>{opts.title}</Title> : null}
      <Content>
        {(typeof opts.text === 'string' ? opts.text.split(/\s*\n\s*/).map((e) => <p>{e}</p>) : opts.text)}
      </Content>
      <Buttonbar>
        {DisplayIf(opts.disagree, disagree =>
          <Button click={() => dlg.resolve(false)}>{disagree}</Button>
        )}
        {DisplayIf(opts.agree, agree =>
          <Button click={() => dlg.resolve(true)}>{agree}</Button>
        )}
      </Buttonbar>
    </F>
  );

}


import s from './styling'

/**
 * Our CSS Declarations.
 */
export namespace CSS {

  export const stacked = s.style('stacked')
  export const enter = s.style('enter')
  export const leave = s.style('leave')

  export const root = s.style('root', {
    '-webkit-transform-style': 'preserve-3d',
    '-webkit-backface-visibility': 'hidden',
    transform: `translateZ(0)`,
    transformOrigin: `50% 0`,
    margin: `24px 24px`,
    backgroundColor: `white`
  })

  export const overlay = s.style('overlay', {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',

    transform: 'translateZ(0)',
    backgroundColor: `rgba(0, 0, 0, 0.75)`,

    $nest: {
      [`&.${enter}`]: {
        animation: `${AnimateCSS.fadeIn} 0.2s both ease-in`,
        $nest: {
          [`& .${root}`]: {
            animation: `${AnimateCSS.topEnter} 0.2s both ease-in`
          }
        }
      },
      [`&.${leave}`]: {
        animation: `${AnimateCSS.fadeOut} 0.2s both ease-out`,
        $nest: {
          [`& .${root}`]: {
            animation: `${AnimateCSS.topLeave} 0.2s both ease-out`
          }
        }
      }
    }
  })

  export const content = s.style('content', {
    padding: '0 24px',
    paddingBottom: '24px',
    color: 'var(--em-text-color)',
    $nest: {
      '&:first-child': {
        paddingTop: '24px'
      },
      '> *:last-child': {
        marginBottom: 0
      }
    }
  })

  export const title = s.style('title', {
    margin: 0,
    padding: 0
  })

}
