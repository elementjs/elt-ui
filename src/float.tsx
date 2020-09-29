
import { $init, insert_before_and_init, remove_node, $click, $class, Attrs, Renderable, e, $inserted, $removed, o } from 'elt'
import { animate } from './animate'
import { Styling as S } from './styling'
import { style, rule } from 'osun';
import { inker } from './ink';
import { theme as T } from './colors'

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
    fill: T.bg,
    stroke: T.tint14,
    strokeWidth: '1px',
    strokeLinejoin: 'round',
    transformOrigin: `50% 50%`,
  })
}

/**
 * Parent needs to be at least absolute.
 */
export function Float(a: Attrs<HTMLDivElement>, ch: Renderable[]) {

  const o_topbottom = o(undefined as undefined | string)
  const o_leftright = o(undefined as undefined | string)

  function eval_position(n: HTMLDivElement) {
    const doc = n.ownerDocument!
    if (!n.isConnected) doc.body!.appendChild(n)

    const rect = n.getBoundingClientRect()
    var parent = n.parentElement as HTMLElement
    parent.style.transform = `translateZ(0)`
    // const parent = n.parentElement!
    const prect = (parent as Element).getBoundingClientRect()
    // const vw = (window.innerWidth || doc.documentElement!.clientWidth)
    const vh = (window.innerHeight || doc.documentElement!.clientHeight)

    if (prect.bottom + rect.height > vh) {
      // The bottom of my parent + the height of the float would go away from the screen
      // so I have to put it at the top
      n.style.bottom = `${prect.height + TRI_HEIGHT}px`
      n.style.top = ''
      o_topbottom.set(Float.css.bottom)
    } else {
      n.style.top = `${prect.height + TRI_HEIGHT}px`
      n.style.bottom = ''
      o_topbottom.set(Float.css.top)
    }

    // if (prect.left + rect.width > vw) {
    //   n.style.right = `${vw - prect.right}px`
    //   n.style.left = ''
    //   o_leftright.set(Float.css.right)
    // } else {
    //   n.style.left = `${prect.left}px`
    //   n.style.right = ''
    //   o_leftright.set(Float.css.left)
    // }
  }

  return e.DIV(
    $class(Float.css.float, o_topbottom, o_leftright),
    e(Triangle, {}),
    node => {
      var upd = eval_position.bind(null, node)
      return [
        $init(() => requestAnimationFrame(upd)),
        $inserted(() => document.addEventListener('scroll', upd)),
        $removed(() => document.removeEventListener('scroll', upd)),
    ]},
    ch
  )
}


export namespace Float.css {

  export const top = style('float-top', {
    transformOrigin: `top center`
  })
  export const bottom = style('float-bottom', {
    transformOrigin: 'bottom center'
  })
  export const left = style('float-left')
  export const right = style('float-right')

  export const float = style('float', {
    // maxHeight: '90vh',
    zIndex: 1,
    position: 'absolute',
    boxShadow: `0px 0px 10px ${T.tint14}`,
    animationFillMode: 'forwards',
    animationName: animate.top_enter,
    animationDuration: `${animate.ANIM_DURATION}ms`,
    animationTimingFunction: 'ease-in',
  })

  export const leave_float = style('leave-float', {
    animationName: animate.top_leave,
    animationTimingFunction: animate.FN_SHARP
  })

  rule`${Float.css.float}${bottom} ${Triangle.css.cls_triangle}`(S.box.bottom(`-${TRI_HEIGHT - 1}px`), {
    transform: 'rotateZ(180deg)',
    left: `${TRI_WIDTH}px`
  })
  rule`${Float.css.float}${top} ${Triangle.css.cls_triangle}`({
    top: `-${TRI_HEIGHT - 1}px`,
    left: `${TRI_WIDTH}px`
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
    wm.delete(node)
    await animate(children as HTMLElement, Float.css.leave_float)
    remove_node(cont)
    _reject(null)
  }

  // Remove the float if we clicked outside of it.
  const off = (ev: MouseEvent | KeyboardEvent | TouchEvent) => {
    if (!children.contains(ev.target as Node) && (ev.target as Element).isConnected) {
      // console.log(ev)
      remove()
    }
  }

  var children!: Element
  var _reject: (e: any) => any
  const prom = new Promise<T>((accept, reject) => {
    _reject = reject
    children = ch(accept, reject)
  })
  wm.set(node, prom)

  prom.then(() => remove()).catch(() => remove)

  const cont = <div style={{position: 'absolute', transform: 'translateZ(0)', top: '0', left: '0', height: '100%', width: '100%', zIndex: '1'}}>{children}</div>
  insert_before_and_init(node, cont)
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
