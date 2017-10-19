
import {e, click, Mixin} from 'elt'

import {keyframes, style} from 'typestyle'
import * as s from './styling'

export namespace CSS {

	export const rippleAnim = keyframes({
		'100%': { transform: `scale(4)` }
	})

	export const containerRippleAnim = keyframes({
		'50%': {opacity: 0.2},
		'100%': {opacity: 0}
	})

	export const animate = 'em-ink-animate'

	export const ink = style({
		display: 'block',
		position: 'absolute',
		backgroundColor: s.colors.Primary,
		opacity: 0.4,
		borderRadius: '100%',
		transform: 'scale(0)',
		pointerEvents: 'none',
		marginTop: '-25px',
		marginLeft: '-25px',
		width: '50px',
		height: '50px',

		$nest: {[`&.${animate}`]: {animation: `${rippleAnim} 0.45s both ease-out`}}
	})

	export const container = style({
		display: 'block',
		width: '100%',
		height: '100%',
		top: 0,
		left: 0,
		overflow: 'hidden',
		position: 'absolute',
		pointerEvents: 'none',

		backgroundColor: s.colors.Primary,
		$nest: {[`&.${animate}`]: {animation: `${containerRippleAnim} 0.45s both ease-out`}}

	})

}


export function inker(node: Node, event: MouseEvent) {

	var clientX = event.pageX
	var clientY = event.pageY

	const inker = e('div', {class: CSS.ink}) as HTMLDivElement
	const ink_container = e('div', {class: CSS.container},
		inker
	) as HTMLDivElement

	node.appendChild(ink_container)

	// atom.append(inker)
	requestAnimationFrame(e => {
		var bb = ink_container.getBoundingClientRect()
		inker.style.top = `${clientY - bb.top}px`
		inker.style.left = `${clientX - bb.left}px`
		inker.classList.add(CSS.animate)
		ink_container.classList.add(CSS.animate)
		setTimeout(() => ink_container.remove(), 1000)
	})
	// var bb = atom.element.getBounding
}


export function inkable(): Mixin {
	return click(function (ev, node) {
		inker(node, ev)
	})
}


export function inkClickDelay(fn: (ev: MouseEvent) => void) {
	return click(function (ev, node) {
		inker(node, ev)
		setTimeout(() => fn(ev), 150)
	})
}
