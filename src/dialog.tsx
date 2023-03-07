
import {
  animate,
  $click,
  o,
  If,
  node_remove,
  $class,
  Attrs,
  Renderable,
  $removed,
  e,
  $inserted,
  node_append
} from 'elt';

import { style, rule, builder as CSS } from 'osun'

import { Button, } from './input'
import { theme as T } from './colors'


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
    await animate(this.node, fade_out, { duration: 200, })
    _dialog_stack = _dialog_stack.filter(n => n !== this.node)
    node_remove(this.node)
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
      node => {
        _dialog_stack.push(this.node)

      },
      $inserted(node => {
        if (!this.opts.noanimate) {
          animate(this.node, fade_in, { duration: 200 })
        }
        node.ownerDocument!.addEventListener('keyup', this.handleEscape)
      }),
      $removed(node => {
        node.ownerDocument!.removeEventListener('keyup', this.handleEscape)
      }),
      this.builder(this),
    )
  }
}

export function Overlay(attrs: Attrs<HTMLDivElement>) {
  return E('div', $class(css_dialog_overlay, CSS.column.alignCenter.justifyCenter))
}

export function Title(attrs: Attrs<HTMLHeadingElement>) {
  return E('h3', $class(CSS.uppercase.bold.color(T.tint)))
}

export function Content(attrs: Attrs<HTMLDivElement>) {
  return E('div', $class(CSS.preLine))
}


export function Root(attrs: Attrs<HTMLDivElement>) {
  return E.DIV($class(css_dialog_root, CSS.column, CSS.borderRound.boxShadow), $inserted(node => {
    animate(node, top_enter, { duration: 200 })
  }))
}


/**
 * A function that returns a promise and that allows us to show a nice dialog.
 */
export function dialog<T>(opts: DialogOpts, builder: DialogBuilder<T>): Promise<T> {

  const ctrl = new Dialog(builder, opts)

  let parent = opts.parent || document.body
  node_append(parent, ctrl.render())

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

  return dialog<boolean>(opts, (dlg) => <Root class={[CSS.padding("1rem"), CSS.column.gap("1rem")]}>
    {opts.title ? <Title>{opts.title}</Title> : null}
    <Content>
      {(typeof opts.text === 'string' ? opts.text.split(/\s*\n\s*/).map((item) => <p>{item}</p>) : opts.text)}
    </Content>
    <div class={CSS.row.gap(24).justifyCenter}>
      {If(o(opts.agree), agree =>
        <Button kind={"noborder"} click={() => dlg.resolve(true)}>{agree}</Button>
      )}
      {If(o(opts.disagree), disagree =>
        <Button kind={"noborder"} class={[T.fg, CSS.color(T.fg50)]} click={() => dlg.resolve(false)}>{disagree}</Button>
      )}
    </div>
  </Root>);

}


export const css_dialog_stacked = style('stacked')
export const css_dialog_enter_animation = style('enter')
export const css_dialog_leave_animation = style('leave')

export const css_dialog_root = style('root', {
  WebkitTransformStyle: 'preserve-3d',
  WebkitBackfaceVisibility: 'hidden',
  transform: `translateZ(0)`,
  transformOrigin: `50% 0`,
  margin: `24px 24px`,
  backgroundColor: `white`
})

export const css_dialog_overlay = style('overlay', {
  overflow: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  height: '100%',
  width: '100%',

  transform: 'translateZ(0)',
  backgroundColor: `rgba(0, 0, 0, 0.54)`,
})

// rule`${css_dialog_overlay}${css_dialog_enter_animation}`({
//   animation: `${animate.fade_in} ${animate.ANIM_DURATION}ms both ease-in`
// })

// rule`${css_dialog_overlay}${css_dialog_enter_animation} > ${css_dialog_root}`({
//   animation: `${animate.top_enter} ${animate.ANIM_DURATION}ms both ease-in`
// })

// rule`${css_dialog_overlay}${css_dialog_leave_animation}`({
//   animation: `${animate.fade_out} 0.2s both ease-in`
// })

// rule`${css_dialog_overlay}${css_dialog_leave_animation} > ${css_dialog_root}`({
//   animation: `${animate.top_leave} 0.2s both ease-in`
// })

const fade_in: Keyframe[] = [
  { opacity: 0 },
  { opacity: 1 },
]

const fade_out: Keyframe[] = [
  { opacity: 1 },
  { opacity: 0 },
]

const top_enter: Keyframe[] = [
  {transform: `scale3d(1.2, 1.2, 1)`, transformOrigin: 'top 50%', opacity: 0},
  {transform: `scale3d(1, 1, 1)`, opacity: 1},
]

export const css_dialog_content = style('content', {
  padding: '0 24px',
  paddingBottom: '24px',
  color: 'var(--eltui-text-color)',
})
rule`${css_dialog_content} > :first-child`({ paddingTop: '24px' })
rule`${css_dialog_content} > :last-child`({ marginBottom: 0 })

export const css_dialog_title = style('title', {
  margin: '16px 24px',
  fontSize: '1.25em',
  fontWeight: 'bolder',
  padding: 0
})
