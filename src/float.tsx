
import { node_remove, $click, $class, Attrs, e, $inserted, $removed, o, node_append } from 'elt'
import { animate } from './animate'
import { style, rule, builder as CSS } from 'osun'
import { inker } from './ink';
import { theme as T } from './colors'

export function Triangle(a: Attrs<SVGSVGElement>) {
  return <svg viewBox={`0 0 ${TRI_WIDTH} ${TRI_HEIGHT}`} class={css_float_triangle}>
    <path d={`M0 ${TRI_HEIGHT} C${TRI_WIDTH * 0.7} ${9 * 0.3 - 1} ${TRI_WIDTH * 0.3} ${9 * 0.3 - 1} ${TRI_WIDTH} ${TRI_HEIGHT}`}></path>
  </svg> as SVGSVGElement
}



/**
 * Parent needs to be at least absolute.
 */
export function Float(a: Attrs<HTMLDivElement>) {

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
      o_topbottom.set(css_float_bottom)
    } else {
      n.style.top = `${prect.height + TRI_HEIGHT}px`
      n.style.bottom = ''
      o_topbottom.set(css_float_top)
    }

  }

  return e.DIV(
    $class(css_float, o_topbottom, o_leftright),
    e(Triangle, {}),
    node => {
      var upd = eval_position.bind(null, node)
      requestAnimationFrame(upd)
      return [
        $inserted(() => document.addEventListener('scroll', upd)),
        $removed(() => document.removeEventListener('scroll', upd)),
    ]},
  )
}




interface FloatNode {
  root: Node
  reject: (e: any) => any
  /** outside clicks will stop at the first context */
  creates_context: boolean
}

function _check_float_click(ev: MouseEvent | KeyboardEvent | TouchEvent) {
  for (let fn of [...active_floats].reverse()) {
    if (!fn.root.contains(ev.target as Node)) {
      // This float can't survive
      fn.reject(null!) // This will remove the node graphically
    } else { break }
    if (fn.creates_context) { break } // stop checking
  }
}

const active_floats = new Set<FloatNode>()

export function create_float<T>(
  node: HTMLElement | SVGElement,
  ch: (accept: (t: T) => void, reject: (e: any) => void) => Element,
  opts: { creates_context?: boolean } = {}
): Promise<T> {

  /** We first want to know if we are part of another float */

  var _reject!: (e: any) => any
  const prom = new Promise<T>((accept, reject) => {
    _reject = reject
    children = ch(accept, reject)
  })

  prom.finally(() => remove())

  const fn: FloatNode = {
    root: children,
    reject: _reject,
    creates_context: !!opts.creates_context,
  }

  setTimeout(() => {
    if (active_floats.size === 0) {
      document.body.addEventListener("click", _check_float_click)
    }
    active_floats.add(fn)
  })


  const remove = async () => {
    await animate(children as HTMLElement, css_float_leave_animation)
    node_remove(cont)
    active_floats.delete(fn)
    if (active_floats.size === 0) {
      // No more active floats, we remove our event listeners
      document.body.removeEventListener("click", _check_float_click)
    }
  }

  var children!: Element

  const bbox = node.getBoundingClientRect()
  const cont = <div style={{position: 'absolute', transform: 'translateZ(0)', top: `${bbox.y}px`, left: `${bbox.x}px`, height: `${bbox.height}px`, width: `${bbox.width}px`, zIndex: '1'}}>{children}</div> as HTMLDivElement
  node_append(document.body, cont)

  return prom
}


export function $float<T, N extends HTMLElement | SVGElement>(ch: (accept: (t: T) => void, reject: (e: any) => void) => Element, cbk?: (promise: Promise<T>) => void) {
  return $click<N>(ev => {
    inker(ev)
    const prom = create_float(ev.currentTarget as N, ch)
    cbk?.(prom)
  })
}

/////////////////

const TRI_HEIGHT = 12
const TRI_WIDTH = 17

export const css_float_triangle = style('triangle', CSS.zIndex(2).height(TRI_HEIGHT).width(TRI_WIDTH).positionAbsolute.fill(T.bg).stroke(T.tint14), {
  strokeWidth: '1px',
  strokeLinejoin: 'round',
  transformOrigin: `50% 50%`,
})


export const css_float_top = style('float-top', {
  transformOrigin: `top center`
})
export const css_float_bottom = style('float-bottom', {
  transformOrigin: 'bottom center'
})
export const css_float_left = style('float-left')
export const css_float_right = style('float-right')

export const css_float = style('float', {
  // maxHeight: '90vh',
  zIndex: 2,
  position: 'absolute',
  boxShadow: `0px 0px 10px ${T.tint14}`,
  animationFillMode: 'forwards',
  animationName: animate.top_enter,
  animationDuration: `${animate.ANIM_DURATION}ms`,
  animationTimingFunction: 'ease-in',
})

export const css_float_leave_animation = style('leave-float', {
  animationName: animate.top_leave,
  animationTimingFunction: animate.FN_SHARP
})

rule`${css_float}${css_float_bottom} ${css_float_triangle}`(CSS.bottom(`-${TRI_HEIGHT - 1}px`), {
  transform: 'rotateZ(180deg)',
  left: `${TRI_WIDTH}px`
})
rule`${css_float}${css_float_top} ${css_float_triangle}`({
  top: `-${TRI_HEIGHT - 1}px`,
  left: `${TRI_WIDTH}px`
})
rule`${css_float}${css_float_left} ${css_float_triangle}`(CSS.left(TRI_HEIGHT))
rule`${css_float}${css_float_right} ${css_float_triangle}`(CSS.right(TRI_HEIGHT))
