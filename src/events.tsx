
import { o } from 'elt'

export function listenWhenWatched<N extends EventTarget, K extends Parameters<N["addEventListener"]>[0]>(obs: o.Observable<any>, target: N, type: K, listener: Parameters<N["addEventListener"]>[1]) {
  const watched = obs.watched.bind(obs)
  const unwatched = obs.unwatched.bind(obs)
  var watching = undefined as any
  obs.watched = function () {
    watched()
    if (watching) return
    watching = listener
    target.addEventListener(type as any, listener as any)
  }
  obs.unwatched = function () {
    unwatched()
    if (!watching) return
    target.removeEventListener(type as any, listener as any)
    watching = undefined
  }
}


// window resize -> update o_viewport_width and o_viewoir
function updresize() { o_viewport_height.set(window.innerHeight); o_viewport_width.set(window.innerWidth) }

export const o_viewport_width = o(window.innerWidth)
export const o_viewport_height = o(window.innerHeight)
listenWhenWatched(o_viewport_width, window, 'resize', updresize)
listenWhenWatched(o_viewport_height, window, 'resize', updresize)

export const o_aspect_ratio = o.combine(o.tuple(o_viewport_width, o_viewport_height), ([width, height]) => width / height)
export const o_portrait = o_aspect_ratio.tf(a => a <= 1)
export const o_landscape = o_aspect_ratio.tf(a => a > 1)


function updonline() { o_online.set(window.navigator.onLine) }
export const o_online = o(window.navigator.onLine)
listenWhenWatched(o_online, window, 'online', updonline)
listenWhenWatched(o_online, window, 'offline', updonline)

function updhash() { o_location_hash.set(location.hash) }
export const o_location_hash = o(location.hash)
listenWhenWatched(o_location_hash, window, 'hashchange', updhash)

export const oMouseHovering = function (node: Element) {
  const o_res = o(false)
  listenWhenWatched(o_res, node, 'mouseover', () => o_res.set(true))
  listenWhenWatched(o_res, node as HTMLElement, "mouseout", ev => {
    if (!node.contains(ev.relatedTarget as Node)) {
      o_res.set(false)
    }
  })

  return o_res
}

// returns an observable that tells you if a given node has the focus
export const oHasFocus = function (node: Element) {

}

export const oScrollPosition = function (node: Element) {
  const o_res = o({left: node.clientLeft, top: node.scrollTop})
  // maybe should add $init() somewhere since scrollleft and scrolltop are only valid
  // once rendered ?
  function upd() { o_res.set({left: node.scrollLeft, top: node.scrollTop}) }
  listenWhenWatched(o_res, node, 'scroll', upd)
  listenWhenWatched(o_res, window, 'resize', upd)
  return o_res
}

export const oScrollStatus = function (node: HTMLElement) {
  const o_res = o({left: node.scrollLeft, top: node.scrollTop})
  // maybe should add $init() somewhere since scrollleft and scrolltop are only valid
  // once rendered ?
  function upd() { o_res.set({left: node.offsetLeft, top: node.offsetTop}) }
  listenWhenWatched(o_res, node, 'scroll', upd)
  listenWhenWatched(o_res, window, 'resize', upd)
  return o_res
}

