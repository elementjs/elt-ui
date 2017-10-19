
import {click, Mixin} from 'elt'

import * as s from './styling'


export function inker(node: Node, event: MouseEvent) {

	var clientX = event.pageX
	var clientY = event.pageY

	const inker = <div class={CSS.ink}/> as HTMLDivElement
	const backdrop = <div class={CSS.backdrop}/> as HTMLDivElement
	const ink_container = <div class={CSS.container}>
		{backdrop}
		{inker}
	</div> as HTMLDivElement

	node.appendChild(ink_container)

	// atom.append(inker)
	requestAnimationFrame(e => {
		var bb = ink_container.getBoundingClientRect()
		inker.style.top = `${clientY - bb.top}px`
		inker.style.left = `${clientX - bb.left}px`
		inker.classList.add(CSS.animate)
		backdrop.classList.add(CSS.animate)
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


export namespace CSS {

		export const rippleAnim = s.keyframes('ripple', {
			'0%': {backgroundColor: s.colors.Primary},
			'100%': { transform: `scale(4)` }
		})

		export const backdropRipple = s.keyframes('container-ripple', {
			'0%': {opacity: 0.5, backgroundColor: s.colors.Primary},
			'50%': {opacity: 0.2},
			'100%': {opacity: 0}
		})

		export const animate = s.style('em-ink-animate')

		export const ink = s.style('ink', {
				display: 'block',
				position: 'absolute',
				opacity: 0.4,
				borderRadius: '100%',
				transform: 'scale(0)',
				pointerEvents: 'none',
				marginTop: '-25px',
				marginLeft: '-25px',
				width: '50px',
				height: '50px',
			},
			s.and(animate, {animation: `${rippleAnim} 0.45s ease-out`})
		)

		export const container = s.style('container', {
				display: 'block',
				width: '100%',
				height: '100%',
				top: 0,
				left: 0,
				overflow: 'hidden',
				position: 'absolute',
				pointerEvents: 'none',

			},
		)

		export const backdrop = s.style('backdrop',
			{
				width: '100%',
				height: '100%',
				top: 0,
				left: 0,
				position: 'absolute',
			},
			s.and(animate, {animation: `${backdropRipple} 0.45s ease-out`})
		)

	}
