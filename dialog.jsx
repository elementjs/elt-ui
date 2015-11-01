
import {elt} from 'elt/node';
import {Controller} from 'elt/controller';
import {o} from 'elt/observable';
import {click} from 'elt/touch';
import {bind, cls} from 'elt/decorators';

import {Button} from './button';

import './dialog.styl';

export class DialogCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resolve(value) {
    this.remove();
    this._resolve(value);
  }

  reject(value) {
    this.remove();
    this._reject(value);
  }

}

// export class Dialog extends Component {
//
//   view(attrs, content) {
//
//     return <div class='eltm-dialog-overlay' $$={click(this.close.bind(this))}>
//         <div class='eltm-dialog-root'>
//           {content}
//         </div>
//       </div>;
//
//   }
//
//   link() {
//     // FIXME should be a special decorator to add enter and leave.
//     this.node.element.classList.add('elm-enter');
//     requestAnimationFrame(() => {
//       this.node.element.classList.remove('elm-enter');
//     });
//
//     this.node.on('mount', (event, root, before) => {
//       this.root = root;
//       root.classList.add('eltm-modal-showing');
//     })
//   }
//
//   remove() {
//     this.node.remove();
//     this.root.classList.remove('eltm-modal-showing');
//   }
//
//
//   close(event) {
//     if (event.target === this.node.element) {
//       // Cancel everything.
//       this.reject();
//     }
//   }
//
// }

export function Modal(attrs, children) {

  return <div class='eltm-dialog-overlay' $$={click(this.close.bind(this))}>
      <div class='eltm-dialog-root'>
        {attrs.title ? <h3 class='elt-dialog-title'>{attrs.title}</h3> : null}
        <div class='eltm-dialog-content'>
          {o(attrs.text, (v) => v.split(/\s*\n\s*/).map((e) => <p>{e}</p>))}
        </div>
        <div class='eltm-dialog-buttonbar'>
          {attrs.disagree ? <Button click={() => this.resolve(false)}>{attrs.disagree}</Button> : null}
          {attrs.agree ? <Button click={() => this.resolve(true)}>{attrs.agree}</Button> : null}
        </div>
      </div>
    </div>;

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


export function modal(title, text, agree, disagree) {

  let m = <Modal title={title} text={text} agree={agree} disagree={disagree}/>;
  m.mount(document.body);

  // maybe a .ctrl when we have a component ?
  let ctrl = m.getController(Modal);

  return ctrl.promise;

}
