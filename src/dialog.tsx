
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


import {animate} from './animate'
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
  return <div class='dm-dialog-overlay'>{children}</div>
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

export var Root = (attrs: BasicAttributes, children: DocumentFragment): Node => <div class='dm-dialog-root'>{children}</div>

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

  let dlg = new DialogCtrl;

  let outSideToClose = opts.clickOutsideToClose ?
    click(ev => ev.target === overlay && dlg.resolve(undefined))
    : (node: Node) => node

  let contents = cbk(dlg)
  let root = <Root>{contents}</Root> as HTMLElement
  let overlay: HTMLElement = <Overlay class={opts.class ? opts.class : null} $$={[
    outSideToClose,
  ]}>{root}</Overlay> as HTMLElement

  if (!opts.noanimate) {
    animate(overlay, 'dm-fade-in 0.2s both ease-in')
    animate(root, 'dm-dialog-root-enter 0.2s both ease-in')
  }

  dlg.bindToNode(overlay)

  function bye() {
    return Promise.all([
      animate(overlay, 'dm-fade-out 0.2s both ease-out'),
      animate(root, 'dm-dialog-root-leave 0.2s both ease-out')
    ]).then(() => {
      overlay.remove()
    })
  }

  // Remove the dialog from the DOM once we have answered it.
  dlg.promise.then(bye, bye);

  (opts.parent || document.body).appendChild(overlay)


  return dlg.promise

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
