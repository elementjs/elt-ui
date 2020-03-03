
import { $init, insert_before_and_init, remove_and_deinit, $click, $class } from 'elt'
import { animate } from './animate'
import { Styling as S } from './styling'
import { style, rule } from 'osun';
import { inker } from './ink';

/**
 * Parent needs to be at least absolute.
 */
export function Float(a: E.JSX.Attrs<HTMLDivElement>, ch: E.JSX.Renderable[]) {

  return E.$DIV(
    $class(Float.css.float),
    $init(n => {
      requestAnimationFrame(() => {
        const doc = n.ownerDocument!
        const rect = n.getBoundingClientRect()
        const parent = n.parentElement!
        const prect = (parent as Element).getBoundingClientRect()
        const vw = (window.innerWidth || doc.documentElement!.clientWidth)
        const vh = (window.innerHeight || doc.documentElement!.clientHeight)
        doc.body!.appendChild(n)

        if (prect.bottom + rect.height > vh) {
          // console.log(prect.bottom)
          n.style.bottom = `${vh - prect.top}px`
          n.style.transformOrigin = 'bottom center'
          n.classList.add(Float.css.bottom)
        } else {
          n.style.top = `${prect.bottom + 16}px`
          n.style.transformOrigin = 'top center'
          n.classList.add(Float.css.top)
        }

        if (prect.left + rect.width > vw) {
          n.style.right = `${vw - prect.right}px`
          n.classList.add(Float.css.right)
        } else {
          n.style.left = `${prect.left}px`
          n.classList.add(Float.css.left)
        }
      })
    }),
    ch
  )
}


export namespace Float.css {
  const M = 17

  export const top = style('float-top', {marginTop: `${M/2}px`})
  export const bottom = style('float-bottom', {marginBottom: `${M/2}px`})
  export const left = style('float-left')
  export const right = style('float-right')

  export const float = style('float', {
    maxHeight: '90vh',
    position: 'fixed',
    zIndex: 2,
    // backgroundColor: S.BG,
    boxShadow: `2px 2px 10px ${S.FG14}`,
    animationFillMode: 'forwards',
    animationName: animate.top_enter,
    animationDuration: '0.1s',
    animationTimingFunction: 'ease-in',
    transformOrigin: 'top center',
  })

  export const leave_float = style('leave-float', {
    animationName: animate.top_leave
  })

  rule`${Float.css.float}::before`({content: '"\u00a0"'},
    S.box.block.width(M).height(M).border(S.TINT14).positionAbsolute.background(S.BG),
    {borderRadius: '0.15em', zIndex: -1, transform: `translateZ(0) rotate(-45deg)`, transformOrigin: '50% 50%', boxShadow: `2px 2px 10px ${S.FG14}`}
  )
  rule`${Float.css.float}${bottom}::before`(S.box.bottom(-M / 2))
  rule`${Float.css.float}${top}::before`(S.box.top(-M / 2))
  rule`${Float.css.float}${left}::before`(S.box.left(M))
  rule`${Float.css.float}${right}::before`(S.box.right(M))

}



const wm = new WeakMap<Node, Promise<any>>()

export function create_float<T>(
  node: Node,
  ch: (accept: (t: T) => void, reject: (e: any) => void) => Element
): Promise<T> {
  if (wm.has(node))
    return wm.get(node)!

  const remove = async () => {
    node.ownerDocument!.body.removeEventListener('click', off)
    await animate(children as HTMLElement, Float.css.leave_float)
    remove_and_deinit(children)
    wm.delete(node)
  }

  // Remove the float if we clicked outside of it.
  const off = (ev: MouseEvent | KeyboardEvent | TouchEvent) => {
    if (!children.contains(ev.target as Node)) {
      remove()
    }
  }

  var children!: Node
  const prom = new Promise<T>((accept, reject) => {
    children = ch(accept, reject)
  })
  wm.set(node, prom)

  prom.then(() => remove()).catch(() => remove)

  insert_before_and_init(node, children)
  setTimeout(() => {
    node.ownerDocument!.body.addEventListener('click', off)
  }, 1)

  return prom
}


export function $float<T, N extends HTMLElement | SVGElement>(ch: (accept: (t: T) => void, reject: (e: any) => void) => Element) {
  return $click<N>(ev => {
    inker(ev)
    create_float(ev.currentTarget, ch)
  })
}
