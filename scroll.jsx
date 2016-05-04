
var _noscrollsetup = false

function _setUpNoscroll() {

	document.body.addEventListener('touchmove', function event(ev) {
		// If no div marked as scrollable set the moving attribute, then simply don't scroll.
		if (!ev.scrollable) ev.preventDefault()
	}, false);

	_noscrollsetup = true
}


/**
 * Setup scroll on an atom so that touchstart and touchmove events don't
 * trigger the ugly scroll band.
 *
 * Calling this functions makes anything not marked scrollable as non-scrollable.
 */
export function scrollable(atom) {

	if (!_noscrollsetup) _setUpNoscroll()

	node.on('create', function () {
		const atom = this
		const e = atom.element

		atom.listen('touchstart', function (ev) {
			if (e.scrollTop == 0) {
				e.scrollTop = 1;
			} else if (e.scrollHeight == e.scrollTop + e.offsetHeight) e.scrollTop -= 1;
		}, true);

		atom.listen('touchmove', function event (ev) {
			if (e.scrollHeight > e.offsetHeight) ev.scrollable = true;
		}, false);
	});

}
