
import {
	BasicAttributes,
	d,
} from 'domic'


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

function _parse_attributes(node: HTMLElement, at: FlexAttributes) {

	var el = node
	var cls = el.classList

	if (at.wrap != null) cls.add('carbm-flex-wrap')
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

}

export interface FlexAttributes extends BasicAttributes {
	wrap?: string | boolean
	direction?: string
	align?: string
	reverse?: boolean
	grow?: string
	basis?: string
	justify?: string
	absoluteGrow?: string
}

export function Row(at: FlexAttributes, ch: DocumentFragment): Node {
	let node = d('div', {class: 'carbm-flex'}, ch)
	_parse_attributes(node, at)
	return node
}

export function Column(at: FlexAttributes, ch: DocumentFragment): Node {
	at.direction = 'column'
	let node = d('div', {class: 'carbm-flex'}, ch)
	_parse_attributes(node, at)
	return node
}

export interface ChildAttributes extends FlexAttributes {
	// FIXME this should be specified differently
}

/**
 * A child that's not a flex itself (otherwise we'd use Row or Column), on which
 * there is hence no point in using the special align-items, ...
 */
export function Child(at: ChildAttributes, ch: DocumentFragment): Node {
	let node = d('div', null, ch)
	_parse_attributes(node, at)
	return node
}
