
import {elt} from 'elt/node';
import {Component} from 'elt/controller';
import {o} from 'elt/observable';
import {click} from 'elt/touch';
import {bind, cls} from 'elt/decorators';


export class Dialog extends Component {

  view(attrs, content) {

    return <div class='eltm-dialog-overlay'>
        {content}
      </div>;

  }

}

/**
 * A function that returns a promise and that allows us to show a nice dialog.
 */
export function dialog(opts) {

  let title = <h3>{opts.title}</h3>;
  let content = <Dialog.Content>{content}</Dialog.Content>;
  let buttons = <Dialog.Buttonbar>{opts.buttons}</Dialog.Buttonbar>;

  // opts.toolbar
  // opts.title
  // opts.fullscreen -- if we want the dialog to take up the whole space.

}


export function modal(opts) {

}
