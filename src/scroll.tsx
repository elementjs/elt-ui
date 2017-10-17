
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
export function scrollable(nod: Node): void {
	if (!(nod instanceof HTMLElement)) throw new Error(`scrollable() only works on HTMLElement`)

	let node = nod as HTMLElement

	if (!_noscrollsetup) _setUpNoscroll()

	node.classList.add('em-scrollable')

	node.addEventListener('touchstart', function (ev: TouchEvent) {
		if (node.scrollTop == 0) {
			node.scrollTop = 1
		} else if (node.scrollTop + node.offsetHeight >= node.scrollHeight - 1) node.scrollTop -= 1
	}, true)

	node.addEventListener('touchmove', function event (ev: TouchEvent) {
		if (node.offsetHeight < node.scrollHeight)
			(ev as any).scrollable = true
	}, true)


}
