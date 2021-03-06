
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
  ClassDefinition,
  $removed,
  Component,
  e,
  databus,
  $inserted
} from 'elt';

import { animate } from './animate'
import { Button, ButtonBar } from './button';
import S from './styling'
import { theme as T } from './colors'
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
  class?: ClassDefinition | ClassDefinition[]
}


export interface DialogAttrs<T> extends Attrs<HTMLElement>, DialogCommon {
  builder: DialogBuilder<T>
  animationEnter: string
  animationLeave: string
}


var _dialog_stack = [] as Node[]


export class Dialog<T> extends Component<Attrs<HTMLDivElement> & DialogAttrs<T>> {

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
    remove_node(this.node)
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

  render(): HTMLDivElement {
    return <Overlay>
      {$click((e) => {
        if (e.target === e.currentTarget && this.attrs.clickOutsideToClose)
          this.reject('clicked outside to close')
      })}
      {$init(node => {
        _dialog_stack.push(this.node)
        if (!this.attrs.noanimate) {
          animate(this.node, this.attrs.animationEnter)
        }
      })}
      {$inserted(node => {
        node.ownerDocument!.addEventListener('keyup', this.handleEscape)
      })}
      {$removed(node => {
        node.ownerDocument!.removeEventListener('keyup', this.handleEscape)
      })}
      {this.attrs.builder(this)}
    </Overlay> as HTMLDivElement
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
  let ctrl = databus.getInClosestParent(dialo, Dialog) as Dialog<T>

  let parent = opts.parent || document.body
  append_child_and_init(parent, dialo)

  return ctrl.promise

}


export interface ModalOptions extends DialogOptions {
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

  return dialog<boolean>(opts, (dlg) => <Root class={[S.box.padding(S.SIZE_NORMAL).paddingBottom('none'), S.flex.gappedColumn(S.SIZE_NORMAL)]}>
    {opts.title ? <Title>{opts.title}</Title> : null}
    <Content>
      {(typeof opts.text === 'string' ? opts.text.split(/\s*\n\s*/).map((item) => <p>{item}</p>) : opts.text)}
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
