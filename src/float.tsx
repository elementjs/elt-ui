
import { init, insert_before_and_mount, remove_and_unmount, click } from 'elt'
import { animate } from './animate'
import { Styling as S } from './styling'
import { style } from 'osun';
import { inker } from './ink';


/**
 * Parent needs to be at least absolute.
 */
export function Float(a: E.JSX.Attrs, ch: DocumentFragment) {

  return <div class={[Float.css.float]} $$={init(elt => {
    requestAnimationFrame(() => {
      const n = elt as HTMLElement
      const doc = n.ownerDocument!
      const rect = n.getBoundingClientRect()
      const parent = elt.parentElement!
      const prect = (parent as Element).getBoundingClientRect()
      const vw = (window.innerWidth || doc.documentElement!.clientWidth)
      const vh = (window.innerHeight || doc.documentElement!.clientHeight)
      doc.body!.appendChild(elt)

      if (prect.bottom + rect.height > vh) {
        // console.log(prect.bottom)
        n.style.bottom = `${vh - prect.top}px`
        n.style.transformOrigin = 'bottom center'
      } else {
        n.style.top = `${prect.bottom}px`
        n.style.transformOrigin = 'top center'
      }

      if (prect.left + rect.width > vw) {
        n.style.right = `${vw - prect.right}px`
      } else {
        n.style.left = `${prect.left}px`
      }
    })
  })}>
    {ch}
  </div>
}


Float.css = {
  float: style('float', {
    maxHeight: '90vh',
    position: 'fixed',
    zIndex: 2,
    backgroundColor: S.BG,
    boxShadow: `2px 2px 10px ${S.FG14}`,
    animationFillMode: 'forwards',
    animationName: animate.top_enter,
    animationDuration: '0.1s',
    animationTimingFunction: 'ease-in',
    transformOrigin: 'top center',
    overflow: 'hidden'
  }),

  leave_float: style('leave-float', {
    animationName: animate.top_leave
  })
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
    remove_and_unmount(children)
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

  insert_before_and_mount(node, children)
  setTimeout(() => {
    node.ownerDocument!.body.addEventListener('click', off)
  }, 1)

  return prom
}


export function float<T>(ch: (accept: (t: T) => void, reject: (e: any) => void) => Element) {
  return click((ev, node) => {
    inker(node, ev)
    create_float(node, ch)
  })
}
