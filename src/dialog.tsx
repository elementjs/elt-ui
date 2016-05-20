
import {c, o, Controller, bind, cls, ctrl, click, Atom} from 'carbyne';

import {velocity} from 'carbyne-velocity'

import {Button} from './button';

import './dialog.styl';

var NOSCROLL_CLASS = 'carbm-dialog-noscroll';

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

  reject(value) {
    this._reject(value);
  }

}

export var dialogRootAnimation = velocity({
  enter: {translateY: ['0px', '50px'], opacity: [1, 0], translateZ: 0},
  leave: {translateY: '50px', opacity: 0, translateZ: 0}
})

export var dialogOverlayAnimation = velocity({
  enter: {backgroundColor: '#000', backgroundColorAlpha: [0.75, 0], translateZ: 0},
  leave: {backgroundColorAlpha: 0, translateZ: 0}
})


export var Overlay = (attrs, children) => <div class='carbm-dialog-overlay'>{children}</div>
export var Title = (attrs, children) => <h3 class='carbm-dialog-title'>{children}</h3>
export var Content = (attrs, children) => <div class='carbm-dialog-content'>{children}</div>

// FIXME this node should watch the width of its children to be able
// to switch to the vertical presentation for dialog buttons.
export var Buttonbar = (attrs, children) => <div class='carbm-dialog-buttonbar' $$={cls({stacked: attrs.stacked})}>{children}</div>
export var Root = (attrs, children) => <div class='carbm-dialog-root'
  $$={dialogRootAnimation}>{children}</div>

/**
 * A function that returns a promise and that allows us to show a nice dialog.
 */
export function dialog(opts, cbk) {

  if (cbk === undefined) {
    cbk = opts;
    opts = {};
  }

  let dlg = new DialogCtrl;

  let atom = <Overlay $$={[
    dlg,
    click((ev) => ev.target === atom.element && dlg.resolve(undefined)),
    dialogOverlayAnimation
  ]}>{cbk(dlg)}</Overlay> as Atom

  if (opts.disableScrolling !== false) {
    let parent_elt = null;

    // atom.on('mount', function (ev, parent) {
    //   parent_elt = ev.target.element.parentNode;
    //   parent.classList.add(NOSCROLL_CLASS);
    // });

    // atom.on('unmount', function (ev) {
    //   parent_elt.classList.remove(NOSCROLL_CLASS);
    // });
  }

  // Remove the dialog from the DOM once we have answered it.
  dlg.promise.then(() => atom.destroy(), () => atom.destroy());

  atom.mount(opts.parent || document.body);

  return dlg.promise;

}


/**
 * A modal dialog.
 * @param  {Object} opts Options
 * @return {Promise}
 */
export function modal(opts) {

  return dialog(opts, (dlg) =>
    <Root>
      {opts.title ? <Title>{opts.title}</Title> : null}
      <Content>
        {/* Split the text at \n into distinct paragraphs. */}
        {o(opts.text, (v) => v.split(/\s*\n\s*/).map((e) => <p>{e}</p>))}
      </Content>
      <Buttonbar>
        {opts.disagree ? <Button click={() => dlg.resolve(false)}>{opts.disagree}</Button> : null}
        {opts.agree ? <Button click={() => dlg.resolve(true)}>{opts.agree}</Button> : null}
      </Buttonbar>
    </Root>
  );

}
