
import {
  $click,
  $init,
  o,
  If,
  append_child_and_init,
  remove_node,
  $class,
  Attrs,
  Renderable,
  $removed,
  e,
  $inserted
} from 'elt';

import { animate } from './animate'
import { Button, } from './button';
import S from './styling'
import { theme as T } from './colors'
import { style, rule } from 'osun'


export type DialogBuilder<T> = (dlc: Dialog<T>) => Node

export interface DialogOpts {
  noanimate?: boolean
  clickOutsideToClose?: boolean
  noEscapeKey?: boolean
  closeIntercept?: () => Promise<boolean>
  parent?: Node
  animationEnter?: string
  animationLeave?: string
}


var _dialog_stack = [] as Node[]


export class Dialog<T> {

  _resolve: (v: T) => any = undefined!
  _reject: (...a: Array<any>) => any = undefined!

  constructor(
    public builder: DialogBuilder<T>,
    public opts: DialogOpts
  ) { }

  node = <Overlay/> as HTMLDivElement

  promise: Promise<T> = new Promise((resolve, reject) => {
    this._resolve = resolve;
    this._reject = reject;
  })

  async tryclose(): Promise<boolean> {
    if (this.opts.closeIntercept && !(await this.opts.closeIntercept()))
      // Do nothing if closing was prevented.
      return false
    await animate(this.node, this.opts.animationLeave ?? dialog.leave)
    _dialog_stack = _dialog_stack.filter(n => n !== this.node)
    remove_node(this.node)
    return true
  }

  async resolve(value: T) {
    if (await this.tryclose())
      this._resolve(value);
  }

  async reject(value: any) {
    if (await this.tryclose())
      this._reject(value);
  }

  handleEscape = (ev: KeyboardEvent) => {
    // Ignore the event if it was not meant for us
    if (_dialog_stack[_dialog_stack.length - 1] !== this.node) return

    if (this.opts.noEscapeKey) return
    if (ev.code === "Escape")
      this.reject('pressed escape')
  }

  render() {
    return e(
      this.node,
      $click((e) => {
        if (e.target === e.currentTarget && this.opts.clickOutsideToClose)
          this.reject('clicked outside to close')
      }),
      $init(node => {
        _dialog_stack.push(this.node)
        if (!this.opts.noanimate) {
          animate(this.node, this.opts.animationEnter ?? dialog.enter)
        }
      }),
      $inserted(node => {
        node.ownerDocument!.addEventListener('keyup', this.handleEscape)
      }),
      $removed(node => {
        node.ownerDocument!.removeEventListener('keyup', this.handleEscape)
      }),
      this.builder(this),
    )
  }
}

export function Overlay(attrs: Attrs<HTMLDivElement>, children: Renderable[]) {
  return E('div', $class(dialog.overlay, S.flex.column.alignCenter.justifyCenter),
    children
  )
}

export function Title(attrs: Attrs<HTMLHeadingElement>, children: Renderable[]) {
  return E('h3', $class(S.text.uppercase.bold.color(T.tint)),
    children
  )
}

export function Content(attrs: Attrs<HTMLDivElement>, children: Renderable[]) {
  return E('div', $class(S.text.preLine),
    children
  )
}


export function Root(attrs: Attrs<HTMLDivElement>, children: Renderable[]) {
  return E.DIV($class(dialog.root, S.flex.column, S.box.border(T.tint07).borderRound.boxShadow),
    children
  )
}


/**
 * A function that returns a promise and that allows us to show a nice dialog.
 */
export function dialog<T>(opts: DialogOpts, builder: DialogBuilder<T>): Promise<T> {

  const ctrl = new Dialog(builder, opts)

  let parent = opts.parent || document.body
  append_child_and_init(parent, ctrl.render())

  return ctrl.promise

}


export interface ModalOptions extends DialogOpts {
  text: o.RO<Renderable>
  title: o.RO<Renderable>
  agree?: o.RO<Renderable>
  disagree?: o.RO<Renderable>,
}

/**
 * A modal dialog.
 * @param  {Object} opts Options
 * @return {Promise}
 */
export function modal(opts: ModalOptions) {

  return dialog<boolean>(opts, (dlg) => <Root class={[S.box.padding(S.SIZE_NORMAL), S.flex.gappedColumn(S.SIZE_NORMAL)]}>
    {opts.title ? <Title>{opts.title}</Title> : null}
    <Content>
      {(typeof opts.text === 'string' ? opts.text.split(/\s*\n\s*/).map((item) => <p>{item}</p>) : opts.text)}
    </Content>
    <div class={S.flex.gappedRow(24).justifyCenter}>
      {If(o(opts.agree), agree =>
        <Button kind={"noborder"} click={() => dlg.resolve(true)}>{agree}</Button>
      )}
      {If(o(opts.disagree), disagree =>
        <Button kind={"noborder"} class={[T.fg, S.text.color(T.fg50)]} click={() => dlg.resolve(false)}>{disagree}</Button>
      )}
    </div>
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
    animation: `${animate.fade_in} ${animate.ANIM_DURATION}ms both ease-in`
  })

  rule`${overlay}${enter} > ${root}`({
    animation: `${animate.top_enter} ${animate.ANIM_DURATION}ms both ease-in`
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
