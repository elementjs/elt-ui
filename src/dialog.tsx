
import {c, o, O, Controller, cls, click, Atom, BasicAttributes, Appendable, ClassDef} from 'carbyne';

import {animator, easings} from './animate'

import {Button} from './button';

import './dialog.styl';

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

export var dialogRootAnimation = animator({
  enter: {
    transform: easings.easeIn.interval(50, 0, v => `translateY(${v}px) translateZ(0)`),
    opacity: easings.easeIn.interval(0, 1)
  },
  leave: {
    transform: easings.easeOut.interval(0, 50, v => `translateY(${v}px) translateZ(0)`),
    opacity: easings.easeOut.interval(1, 0)
  }
})

export var dialogOverlayAnimation = animator({
  enter: {
    'background-color': pct => `rgba(0, 0, 0, ${0.75 * pct})`
  },
  leave: {
    'background-color': pct => `rgba(0, 0, 0, ${0.75 - 0.75 * pct})`
  }
})


export var Overlay = (attrs: BasicAttributes, children: Appendable): Atom => {
  let classes: ClassDef[] = ['carbm-dialog-overlay']
  if (attrs.class) { 
    if (attrs.class instanceof Array)
      classes = classes.concat(attrs.class)
    else
      classes.push(attrs.class) 
  }

  return <div class={classes}>{children}</div>
}

export var Title = (attrs: BasicAttributes, children: Appendable): Atom => <h3 class='carbm-dialog-title'>{children}</h3>
export var Content = (attrs: BasicAttributes, children: Appendable): Atom => <div class='carbm-dialog-content'>{children}</div>

export interface ButtonbarAttributes extends BasicAttributes {
  stacked?: O<boolean>
}

// FIXME this node should watch the width of its children to be able
// to switch to the vertical presentation for dialog buttons.
export var Buttonbar = (attrs: ButtonbarAttributes, children: Appendable): Atom =>
  <div class='carbm-dialog-buttonbar' $$={cls({stacked: attrs.stacked})}>{children}</div>

export var Root = (attrs: BasicAttributes, children: Appendable): Atom => <div class='carbm-dialog-root'
  $$={dialogRootAnimation}>{children}</div>

export interface DialogOptions {
  parent?: Node
  class?: string
}

export type DialogBuilder<T> = (dlc: DialogCtrl<T>) => Atom

/**
 * A function that returns a promise and that allows us to show a nice dialog.
 */
export function dialog<T>(opts: DialogOptions, cbk: DialogBuilder<T>): Promise<T> {

  let dlg = new DialogCtrl;

  let atom: Atom = <Overlay class={opts.class ? opts.class : null} $$={[
    dlg,
    click((ev) => ev.target === atom.element && dlg.resolve(undefined)),
    dialogOverlayAnimation
  ]}>{cbk(dlg)}</Overlay> as Atom

  // Remove the dialog from the DOM once we have answered it.
  dlg.promise.then(() => atom.destroy(), () => atom.destroy());

  atom.mount(opts.parent || document.body);

  return dlg.promise;

}


export interface ModalOptions extends DialogOptions {
  text: string
  title: string
  agree?: string
  disagree?: string
}

/**
 * A modal dialog.
 * @param  {Object} opts Options
 * @return {Promise}
 */
export function modal(opts: ModalOptions) {

  return dialog(opts, (dlg) =>
    <Root>
      {opts.title ? <Title>{opts.title}</Title> : null}
      <Content>
        {/* Split the text at \n into distinct paragraphs. */}
        {o(opts.text, (v: string) => v.split(/\s*\n\s*/).map((e) => <p>{e}</p>))}
      </Content>
      <Buttonbar>
        {opts.disagree ? <Button click={() => dlg.resolve(false)}>{opts.disagree}</Button> : null}
        {opts.agree ? <Button click={() => dlg.resolve(true)}>{opts.agree}</Button> : null}
      </Buttonbar>
    </Root>
  );

}
