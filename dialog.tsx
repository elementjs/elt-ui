
import {
  Attrs,
  ClassDefinition,
  click,
  o,
  Renderable,
  Mixin,
  DisplayIf,
  inserted,
  removed,
  append_child_and_mount,
  remove_and_unmount
} from 'elt';

import {css as flex} from './flex'
import {animateClass, css as AnimateCSS} from './animate'
import {Button, ButtonBar} from './button';

export class DialogCtrl<T> extends Mixin {
  promise: Promise<T>
  _resolve: (v: T) => any = () => null
  _reject: (...a: Array<any>) => any = () => null


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
  return <div class={[css.overlay, flex.column, flex.align_center, flex.justify_center]}>{children}</div>
}

export function Title(attrs: Attrs, children: DocumentFragment): Element { return <h3 class={css.title}>{children}</h3> }
export function Content(attrs: Attrs, children: DocumentFragment): Element { return <div class={css.content}>{children}</div> }


export function Root(attrs: Attrs, children: DocumentFragment): Element {
  return <div class={[css.root, flex.column]}>{children}</div>
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
    return animateClass(dialog_holder, css.leave).then(() => {
      remove_and_unmount(dialog_holder)
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
    animateClass(dialog_holder, css.enter)
  }

  // Remove the dialog from the DOM once we have answered it.

  let parent = opts.parent || document.body

  append_child_and_mount(parent, dialog_holder)

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
    <Content>
      {opts.title ? <Title>{opts.title}</Title> : null}
      {(typeof opts.text === 'string' ? opts.text.split(/\s*\n\s*/).map((e) => <p>{e}</p>) : opts.text)}
      <ButtonBar>
        {DisplayIf(o(opts.disagree), disagree =>
          <Button click={() => dlg.resolve(false)}>{disagree}</Button>
        )}
        {DisplayIf(o(opts.agree), agree =>
          <Button click={() => dlg.resolve(true)}>{agree}</Button>
        )}
      </ButtonBar>
    </Content>
  );

}


import {cls, s} from 'osun'

/**
 * Our CSS Declarations.
 */
export namespace css {

  export const stacked = cls('stacked')
  export const enter = cls('enter')
  export const leave = cls('leave')

  export const root = cls('root', {
    '-webkit-transform-style': 'preserve-3d',
    '-webkit-backface-visibility': 'hidden',
    transform: `translateZ(0)`,
    transformOrigin: `50% 0`,
    margin: `24px 24px`,
    backgroundColor: `white`
  })

  export const overlay = cls('overlay', {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',

    transform: 'translateZ(0)',
    backgroundColor: `rgba(0, 0, 0, 0.75)`,
  })

  s(overlay).and(enter, {
    animation: `${AnimateCSS.fade_in} 0.2s both ease-in`
  })

  s(root).childOf(s(overlay).and(enter), {
    animation: `${AnimateCSS.top_enter} 0.2s both ease-in`
  })

  s(overlay).and(leave, {
    animation: `${AnimateCSS.fade_out} 0.2s both ease-in`
  })

  s(root).childOf(s(overlay).and(leave), {
    animation: `${AnimateCSS.top_leave} 0.2s both ease-in`
  })


  export const content = cls('content', {
    padding: '0 24px',
    paddingBottom: '24px',
    color: 'var(--em-text-color)',
  })

  s(content).append(':first-child', {
    paddingTop: '24px'
  })

  s`*:last-child`.childOf(content, {
    marginBottom: 0
  })

  export const title = cls('title', {
    margin: '0 0 0.625em 0',
    padding: 0
  })

}
