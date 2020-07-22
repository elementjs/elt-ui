
import { $init, insert_before_and_init, remove_node, $click, $class, Attrs, Renderable, e } from 'elt'
import { animate } from './animate'
import { Styling as S } from './styling'
import { style, rule } from 'osun';
import { inker } from './ink';

export function Triangle(a: Attrs<SVGSVGElement>) {
  return <svg viewBox={`0 0 ${TRI_WIDTH} ${TRI_HEIGHT}`} class={Triangle.css.cls_triangle}>
    <path d={`M0 ${TRI_HEIGHT} C${TRI_WIDTH * 0.7} ${9 * 0.3 - 1} ${TRI_WIDTH * 0.3} ${9 * 0.3 - 1} ${TRI_WIDTH} ${TRI_HEIGHT}`}></path>
  </svg> as SVGSVGElement
}

const TRI_HEIGHT = 12
const TRI_WIDTH = 17

export namespace Triangle.css {
  export const cls_triangle = style('triangle', {
    zIndex: 1,
    height: `${TRI_HEIGHT}px`,
    width: `${TRI_WIDTH}px`,
    position: 'absolute',
    fill: S.BG,
    stroke: S.TINT14,
    strokeWidth: '1px',
    strokeLinejoin: 'round',
    transformOrigin: `50% 50%`,
  })
}

/**
 * Parent needs to be at least absolute.
 */
export function Float(a: Attrs<HTMLDivElement>, ch: Renderable[]) {

  return e.DIV(
    $class(Float.css.float),
    e(Triangle, {}),
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
          n.style.bottom = `${vh - prect.top + TRI_HEIGHT}px`
          n.style.transformOrigin = 'bottom center'
          n.classList.add(Float.css.bottom)
        } else {
          n.style.top = `${prect.bottom + TRI_HEIGHT}px`
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

  export const top = style('float-top')
  export const bottom = style('float-bottom')
  export const left = style('float-left')
  export const right = style('float-right')

  export const float = style('float', {
    maxHeight: '90vh',
    position: 'fixed',
    zIndex: 2,
    // backgroundColor: S.BG,
    boxShadow: `0px 0px 10px ${S.TINT14}`,
    animationFillMode: 'forwards',
    animationName: animate.top_enter,
    animationDuration: '0.1s',
    animationTimingFunction: 'ease-in',
    transformOrigin: 'top center',
  })

  export const leave_float = style('leave-float', {
    animationName: animate.top_leave
  })

  rule`${Float.css.float}${bottom} ${Triangle.css.cls_triangle}`(S.box.bottom(`-${TRI_HEIGHT - 1}px`), {
    transform: 'rotateZ(180deg)',
  })
  rule`${Float.css.float}${top} ${Triangle.css.cls_triangle}`({
    top: `-${TRI_HEIGHT - 1}px`,
  })
  rule`${Float.css.float}${left} ${Triangle.css.cls_triangle}`(S.box.left(TRI_HEIGHT))
  rule`${Float.css.float}${right} ${Triangle.css.cls_triangle}`(S.box.right(TRI_HEIGHT))

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
    remove_node(children)
    wm.delete(node)
    _reject(null)
  }

  // Remove the float if we clicked outside of it.
  const off = (ev: MouseEvent | KeyboardEvent | TouchEvent) => {
    if (!children.contains(ev.target as Node) && (ev.target as Element).isConnected) {
      remove()
    }
  }

  var children!: Node
  var _reject: (e: any) => any
  const prom = new Promise<T>((accept, reject) => {
    _reject = reject
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


export function $float<T, N extends HTMLElement | SVGElement>(ch: (accept: (t: T) => void, reject: (e: any) => void) => Element, cbk?: (promise: Promise<T>) => void) {
  return $click<N>(ev => {
    inker(ev)
    const prom = create_float(ev.currentTarget, ch)
    cbk?.(prom)
  })
}
