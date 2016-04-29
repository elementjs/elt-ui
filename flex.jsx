
import {c, exists} from 'carbyne'

import './flex.styl'

// flex-direction
// flex-wrap
// justify-content
// align-items
// align-content

// CHILDREN :
// order
// shrink
// grow
// basis !
// align-self

function _(elt, prop, value) {
	switch (value) {
		case 'around': value = 'space-around'; break
		case 'between': value = 'space-between'; break
		case 'start': value = 'flex-start'; break
		case 'end': value = 'flex-end'; break
		case 'no': value = 'nowrap'; break
	}

	elt.style[prop] = value
	elt.style[`-webkit-${prop}`] = value
}

function _parse_attributes(atom) {

	var at = atom.attrs

	atom.on('create', function (ev) {
		var el = ev.target.element

		if (exists(at.wrap)) _(el, 'flex-wrap', at.wrap)
		if (exists(at.direction)) {
			if (!at.reverse)
				_(el, 'flex-direction', at.direction)
			else
				_(el, 'flex-direction', at.direction === 'column' ? 'column-reverse' : 'row-reverse')
		} else if (exists(at.reverse)) _(el, 'flex-direction', 'row-reverse')

		if (exists(at.grow)) _(el, 'flex-grow', at.grow)
		if (exists(at.basis)) _(el, 'flex-basis', at.basis)

		if (exists(at['absolute-grow'])) {
			_(el, 'flex-grow', at['absolute-grow'])
			_(el, 'flex-basis', 0)
		}

		if (exists(at.align)) _(el, 'align-items', at.align)
		if (exists(at.justify)) _(el, 'justify-content', at.justify)

	})

	return atom
}

export function Row(at, ch) {
	return _parse_attributes(<div {...at} class='carbm-flex'>{ch}</div>)
}

export function Column(at, ch) {
	at.direction = 'column'
	return _parse_attributes(<div {...at} class='carbm-flex'>{ch}</div>)
}

/**
 * A child that's not a flex itself (otherwise we'd use Row or Column), on which
 * there is hence no point in using the special align-items, ...
 */
export function Child(at, ch) {
	return _parse_attributes(<div {...at}>{ch}</div>)
}
