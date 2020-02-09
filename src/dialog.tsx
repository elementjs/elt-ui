
import {
  $click,
  $init,
  $deinit,
  o,
  If,
  append_child_and_mount,
  remove_and_unmount,
  Component,
} from 'elt';

import { animate } from './animate'
import { Button, ButtonBar } from './button';
import S from './styling'
import { style, rule } from 'osun'


export type DialogBuilder<T> = (dlc: Dialog<T>) => Node

export interface DialogCommon {
  noanimate?: boolean
  clickOutsideToClose?: boolean
  noEscapeKey?: boolean
  animationEnter?: string
  animationLeave?: string
  closeIntercept?: () => Promise<boolean>
}


export interface DialogOptions extends DialogCommon {
  parent?: Node
  class?: E.JSX.ClassDefinition | E.JSX.ClassDefinition[]
}


export interface DialogAttrs<T> extends E.JSX.Attrs, DialogCommon {
  builder: DialogBuilder<T>
  animationEnter: string
  animationLeave: string
}


var _dialog_stack = [] as Node[]


export class Dialog<T> extends Component<DialogAttrs<T>> {

  _resolve: (v: T) => any = undefined!
  _reject: (...a: Array<any>) => any = undefined!

  promise: Promise<T> = new Promise((resolve, reject) => {
    this._resolve = resolve;
    this._reject = reject;
  })

  async tryclose(): Promise<boolean> {
    if (this.attrs.closeIntercept && !(await this.attrs.closeIntercept()))
      // Do nothing if closing was prevented.
      return false
    await animate(this.node, this.attrs.animationLeave)
    _dialog_stack = _dialog_stack.filter(n => n !== this.node)
    remove_and_unmount(this.node)
    return true
  }

  async resolve(value: T) {
    if (this.tryclose())
      this._resolve(value);
  }

  async reject(value: any) {
    if (this.tryclose())
      this._reject(value);
  }

  handleEscape = (ev: KeyboardEvent) => {
    // Ignore the event if it was not meant for us
    if (_dialog_stack[_dialog_stack.length - 1] !== this.node) return

    if (this.attrs.noEscapeKey) return
    if (ev.keyCode === 27)
      this.reject('pressed escape')
  }

  render() {
    var opts = this.attrs
    return <Overlay>
      {$click((e, node) => {
        if (e.target === node && opts.clickOutsideToClose)
          this.reject('clicked outside to close')
      })}
      {$init(node => {
        requestAnimationFrame(() => {
          node.ownerDocument!.addEventListener('keyup', this.handleEscape)
        })
      })}
      {$deinit(node => {
        node.ownerDocument!.removeEventListener('keyup', this.handleEscape)
      })}
      {this.attrs.builder(this)}
    </Overlay> as HTMLElement
  }

  init() {
    _dialog_stack.push(this.node)
    if (!this.attrs.noanimate) {
      animate(this.node, this.attrs.animationEnter)
    }
  }

}

export function Overlay(attrs: E.JSX.Attrs, children: E.JSX.Renderable[]) {
  return <div class={[dialog.overlay, S.flex.column.alignCenter.justifyCenter]}>{children}</div>
}

export function Title(attrs: E.JSX.Attrs, children: E.JSX.Renderable[]) { return <h3 class={S.text.uppercase.bold.color(S.TINT)}>{children}</h3> }

export function Content(attrs: E.JSX.Attrs, children: E.JSX.Renderable[]) { return <div class={S.text.preLine}>{children}</div> }


export function Root(attrs: E.JSX.Attrs, children: E.JSX.Renderable[]) {
  return <div class={[dialog.root, S.flex.column, S.box.border(S.TINT07).borderRound.boxShadow]}>{children}</div>
}


/**
 * A function that returns a promise and that allows us to show a nice dialog.
 */
export function dialog<T>(opts: DialogOptions, builder: DialogBuilder<T>): Promise<T> {

  let dialo = <Dialog
    builder={builder}
    clickOutsideToClose={opts.clickOutsideToClose}
    closeIntercept={opts.closeIntercept}
    noanimate={opts.noanimate}
    animationEnter={opts.animationEnter || dialog.enter}
    animationLeave={opts.animationLeave || dialog.leave}
  />
  // BOOO ugly cast !
  let ctrl = Dialog.get(dialo) as any as Dialog<T>

  let parent = opts.parent || document.body
  append_child_and_mount(parent, dialo)

  return ctrl.promise

}


export interface ModalOptions extends DialogOptions {
  text: o.RO<E.JSX.Renderable>
  title: o.RO<E.JSX.Renderable>
  agree?: o.RO<E.JSX.Renderable>
  disagree?: o.RO<E.JSX.Renderable>,
}

/**
 * A modal dialog.
 * @param  {Object} opts Options
 * @return {Promise}
 */
export function modal(opts: ModalOptions) {

  return dialog<boolean>(opts, (dlg) => <Root class={[S.box.padding(S.SIZE_NORMAL).paddingBottom('none'), S.flex.gappedColumn(S.SIZE_NORMAL)]}>
    {opts.title ? <Title>{opts.title}</Title> : null}
    <Content>
      {(typeof opts.text === 'string' ? opts.text.split(/\s*\n\s*/).map((e) => <p>{e}</p>) : opts.text)}
    </Content>
    <ButtonBar>
      {If(o(opts.agree), agree =>
        <Button click={() => dlg.resolve(true)}>{agree}</Button>
      )}
      {If(o(opts.disagree), disagree =>
        <Button click={() => dlg.resolve(false)}>{disagree}</Button>
      )}
    </ButtonBar>
  </Root>);

}


/**
 * Our CSS Declarations.
 */
export namespace dialog {

  export const stacked = style('stacked')
  export const enter = style('enter')
  export const leave = style('leave')

  export const root = style('root', {
    WebkitTransformStyle: 'preserve-3d',
    WebkitBackfaceVisibility: 'hidden',
    transform: `translateZ(0)`,
    transformOrigin: `50% 0`,
    margin: `24px 24px`,
    backgroundColor: `white`
  })

  export const overlay = style('overlay', {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    height: '100vh',
    width: '100vw',

    transform: 'translateZ(0)',
    backgroundColor: `rgba(0, 0, 0, 0.54)`,
  })
  rule`${overlay}${enter}`({
    animation: `${animate.fade_in} 0.2s both ease-in`
  })

  rule`${overlay}${enter} > ${root}`({
    animation: `${animate.top_enter} 0.2s both ease-in`
  })

  rule`${overlay}${leave}`({
    animation: `${animate.fade_out} 0.2s both ease-in`
  })

  rule`${overlay}${leave} > ${root}`({
    animation: `${animate.top_leave} 0.2s both ease-in`
  })

  export const content = style('content', {
    padding: '0 24px',
    paddingBottom: '24px',
    color: 'var(--eltui-text-color)',
  })
  rule`${content} > :first-child`({ paddingTop: '24px' })
  rule`${content} > :last-child`({ marginBottom: 0 })

  export const title = style('title', {
    margin: '16px 24px',
    fontSize: '1.25em',
    fontWeight: 'bolder',
    padding: 0
  })

}
