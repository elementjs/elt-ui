import './scroll.styl'

import {Atom} from 'carbyne'

var _noscrollsetup = false


function _setUpNoscroll() {

	document.body.addEventListener('touchmove', function event(ev) {
		// If no div marked as scrollable set the moving attribute, then simply don't scroll.
		if (!(ev as any).scrollable) ev.preventDefault()
	}, false)

	_noscrollsetup = true
}


/**
 * Setup scroll on an atom so that touchstart and touchmove events don't
 * trigger the ugly scroll band.
 *
 * Calling this functions makes anything not marked scrollable as non-scrollable.
 */
export function scrollable(atom: Atom): Atom {

	if (!_noscrollsetup) _setUpNoscroll()

	atom.on('create', function () {
		const e: HTMLElement = atom.element
		e.classList.add('carbm-scrollable')

		e.addEventListener('touchstart', function (ev: TouchEvent) {
			if (e.scrollTop == 0) {
				e.scrollTop = 1
			} else if (e.scrollTop + e.offsetHeight >= e.scrollHeight - 1) e.scrollTop -= 1
		}, true)

		e.addEventListener('touchmove', function event (ev: TouchEvent) {
			if (e.offsetHeight < e.scrollHeight)
				(ev as any).scrollable = true
		}, true)
	})

	return atom

}
