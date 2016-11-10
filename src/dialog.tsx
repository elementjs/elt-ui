
import {
  BasicAttributes,
  ClassDefinition,
  click,
  ctrl,
  Controller,
  d,
  DisplayIf,
  Fragment as F,
  getDocumentFragment,
  o,
  O,
} from 'domic';

import {Column} from './flex'
import {animateClass} from './animate'
import {Button} from './button';


export class DialogCtrl<T> extends Controller {
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

export var Overlay = (attrs: BasicAttributes, children: DocumentFragment): Node => {
  return <Column align='center' justify='center' class='dm-dialog-overlay'>{children}</Column>
}

export var Title = (attrs: BasicAttributes, children: DocumentFragment): Node => <h3 class='dm-dialog-title'>{children}</h3>
export var Content = (attrs: BasicAttributes, children: DocumentFragment): Node => <div class='dm-dialog-content'>{children}</div>

export interface ButtonbarAttributes extends BasicAttributes {
  stacked?: O<boolean>
}

// FIXME this node should watch the width of its children to be able
// to switch to the vertical presentation for dialog buttons.
export var Buttonbar = (attrs: ButtonbarAttributes, children: DocumentFragment): Node =>
  <div class={['dm-dialog-buttonbar', {stacked: attrs.stacked}]}>{children}</div>

export var Root = (attrs: BasicAttributes, children: DocumentFragment): Node => <Column class='dm-dialog-root'>{children}</Column>

export interface DialogOptions {
  parent?: Node
  class?: string
  noanimate?: boolean
  clickOutsideToClose?: boolean
  animationEnter?: string
  animationLeave?: string
}

export type DialogBuilder<T> = (dlc: DialogCtrl<T>) => Node

/**
 * A function that returns a promise and that allows us to show a nice dialog.
 */
export function dialog<T>(opts: DialogOptions, cbk: DialogBuilder<T>): Promise<T> {

  let dlg = new DialogCtrl();

  let contents = cbk(dlg)

  function bye(res: T) {
    return animateClass(dialog_holder, 'animation-leave').then(() => {
      dialog_holder.remove()
      return res
    })
  }

  let dialog_holder = <Overlay  $$={[click(function (e) {
    if (e.target === this && opts.clickOutsideToClose) dlg.resolve(undefined)
  }), ctrl(dlg)]}>
    <Root class={opts.class ? opts.class : null}>{contents}</Root>
  </Overlay> as HTMLElement

  if (!opts.noanimate) {
    animateClass(dialog_holder, 'animation-enter')
  }

  // Remove the dialog from the DOM once we have answered it.

  let parent = opts.parent || document.body

  parent.appendChild(dialog_holder)

  return dlg.promise.then(bye, bye)

}


export interface ModalOptions extends DialogOptions {
  text: string
  title: string
  agree?: string
  disagree?: string,
}

/**
 * A modal dialog.
 * @param  {Object} opts Options
 * @return {Promise}
 */
export function modal(opts: ModalOptions) {

  return dialog(opts, (dlg) =>
    <F>
      {opts.title ? <Title>{opts.title}</Title> : null}
      <Content>
        {opts.text.split(/\s*\n\s*/).map((e) => <p>{e}</p>)}
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
