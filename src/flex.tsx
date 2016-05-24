
import {c, Atom, BasicAttributes, Appendable} from 'carbyne'

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

function _(elt: HTMLElement, prop: string, value: string) {
	switch (value) {
		case 'around': value = 'space-around'; break
		case 'between': value = 'space-between'; break
		case 'start': value = 'flex-start'; break
		case 'end': value = 'flex-end'; break
		case 'no': value = 'nowrap'; break
	}

	var style: any = elt.style
	style[prop] = value
	style[`-webkit-${prop}`] = value
}

function _parse_attributes(atom: Atom) {

	var at = atom.attrs as FlexAttributes

	atom.on('create', function (ev) {
		var el = ev.target.element

		if (at.wrap != null) _(el, 'flex-wrap', at.wrap)
		if (at.direction != null) {
			if (!at.reverse)
				_(el, 'flex-direction', at.direction)
			else
				_(el, 'flex-direction', at.direction === 'column' ? 'column-reverse' : 'row-reverse')
		} else if (at.reverse != null) _(el, 'flex-direction', 'row-reverse')

		if (at.grow != null) _(el, 'flex-grow', at.grow)
		if (at.basis != null) _(el, 'flex-basis', at.basis)

		if (at.absoluteGrow != null) {
			_(el, 'flex-grow', at.absoluteGrow)
			_(el, 'flex-basis', '0')
		}

		if (at.align != null) _(el, 'align-items', at.align)
		if (at.justify != null) _(el, 'justify-content', at.justify)

	})

	return atom
}

export interface FlexAttributes extends BasicAttributes {
	wrap?: string
	direction?: string
	align?: string
	reverse?: boolean
	grow?: string
	basis?: string
	justify?: string
	absoluteGrow?: string
}

export function Row(at: FlexAttributes, ch: Appendable): Atom {
	return _parse_attributes(<div {...at} class='carbm-flex'>{ch}</div>)
}

export function Column(at: FlexAttributes, ch: Appendable): Atom {
	at.direction = 'column'
	return _parse_attributes(<div {...at} class='carbm-flex'>{ch}</div>)
}

export interface ChildAttributes extends FlexAttributes {
	// FIXME this should be specified differently
}

/**
 * A child that's not a flex itself (otherwise we'd use Row or Column), on which
 * there is hence no point in using the special align-items, ...
 */
export function Child(at: ChildAttributes, ch: Appendable): Atom {
	return _parse_attributes(<div {...at}>{ch}</div>)
}
