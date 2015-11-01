
import {elt} from 'elt/node';
import {Controller} from 'elt/controller';
import {o} from 'elt/observable';
import {bind, cls, ctrl, click} from 'elt/decorators';

import {Button} from './button';

import './dialog.styl';

var NOSCROLL_CLASS = 'eltm-dialog-noscroll';

export class DialogCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resolve(value) {
    this._resolve(value);
  }

  reject(value) {
    this._reject(value);
  }

}


export var Overlay = (attrs, children) => <div class='eltm-dialog-overlay'>{children}</div>
export var Title = (attrs, children) => <h3 class='eltm-dialog-title'>{children}</h3>
export var Content = (attrs, children) => <div class='eltm-dialog-content'>{children}</div>

// FIXME this node should watch the width of its children to be able
// to switch to the vertical presentation for dialog buttons.
export var Buttonbar = (attrs, children) => <div class='eltm-dialog-buttonbar'>{children}</div>
export var Root = (attrs, children) => <div class='eltm-dialog-root'>{children}</div>

/**
 * A function that returns a promise and that allows us to show a nice dialog.
 */
export function dialog(opts, cbk) {

  if (cbk === undefined) {
    cbk = opts;
    opts = {};
  }

  let dlg = new DialogCtrl;

  let res = <Overlay $$={[ctrl(dlg), click((ev) => dlg.reject())]}>{cbk(dlg)}</Overlay>;

  if (opts.disableScrolling !== false) {
    let parent_elt = null;
    res.on('mount', function (ev, parent) {
      parent_elt = parent;
      parent.classList.add(NOSCROLL_CLASS);
    });

    res.on('unmount', function (ev) {
      parent_elt.classList.remove(NOSCROLL_CLASS);
    });
  }

  // Remove the dialog from the DOM once we have answered it.
  dlg.promise.then(() => res.remove(), () => res.remove());

  res.mount(opts.parent || document.body);

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
