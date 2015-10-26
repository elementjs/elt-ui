
import {elt} from 'elt/node';
import {Component} from 'elt/controller';
import {o} from 'elt/observable';
import {click} from 'elt/touch';
import {bind, cls} from 'elt/decorators';

import './dialog.styl';

export class Dialog extends Component {

  constructor() {
    super(...arguments);
  }

  view(attrs, content) {

    return <div class='eltm-dialog-overlay' $$={click(this.close.bind(this))}>
        <div class='eltm-dialog-root'>
          {content}
        </div>
      </div>;

  }

  link() {
    this.node.element.classList.add('elm-enter');
    requestAnimationFrame(() => {
      this.node.element.classList.remove('elm-enter');
    })
  }

  close(event) {
    if (event.target === this.node.element) {
      // Cancel everything.
      this.node.remove();
      console.log(arguments);
      if (this.promise) this.promise.reject('cancel');      
    }
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


export async function modal(text, agree, disagree) {

  <Dialog>
    <h3 class='eltm-dialog-title'>My Title Here</h3>
    <p>Hullo</p>
  </Dialog>.mount(document.body);

}
