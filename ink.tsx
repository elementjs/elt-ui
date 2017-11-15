
import {click, Mixin} from 'elt'

import s from './styling'
import {CSS as A} from './animate'

export const ANIM_DURATION = 300


export function inker(node: Node, event: MouseEvent) {

	var clientX = event.pageX
	var clientY = event.pageY

	const inker = <div class={CSS.ink}/> as HTMLDivElement
	const ink_container = <div class={CSS.container}>
		{inker}
	</div> as HTMLDivElement

	node.appendChild(ink_container)

	requestAnimationFrame(e => {
		const bb = ink_container.getBoundingClientRect()
		const x = clientX - bb.left
		const y = clientY - bb.top

		// we want the biggest distance to an edge, as it will determine
		// the size of our ink.
		const biggest = Math.max(bb.width - x, bb.height - y, x, y) * 1.2

		const size = `${Math.round(biggest * 2)}px`
		const halved = `-${Math.round(biggest)}px`
		inker.style.left = `${x}px`
		inker.style.top = `${y}px`
		inker.style.width = size
		inker.style.height = size
		inker.style.marginTop = halved
		inker.style.marginLeft = halved

		inker.classList.add(CSS.animate)
		setTimeout(() => ink_container.remove(), ANIM_DURATION + 100)
	})
}


export function inkable(): Mixin {
	return click(function (ev, node) {
		inker(node, ev)
	})
}


export function inkClickDelay(fn: (ev: MouseEvent) => void) {
	return click(function (ev, node) {
		inker(node, ev)
		setTimeout(() => {
			fn(ev)
		// The callback is fired when the opacity starts to decrease
		}, Math.round(ANIM_DURATION * 0.75))
	})
}


export namespace CSS {

		export const rippleAnim = s.keyframes('ripple', {
			'0%': {transform: `scale(0) translateZ(0)`, opacity: 0},
			'10%': { opacity: 0.36 },
			'75%': {transform: `scale(1) translateZ(0)`, opacity: 0.36},
			'100%': { opacity: 0 }
		})

		export const animate = s.style('em-ink-animate')

		export const ink = s.style('ink', {
				display: 'block',
				position: 'absolute',
				backgroundColor: s.colors.Primary,
				opacity: 0.4,
				borderRadius: '50%',
				transform: 'scale(0)',
				pointerEvents: 'none',
				marginTop: '-25px',
				marginLeft: '-25px',
				width: '50px',
				height: '50px',
			},
			s.and(animate, {animation: `${rippleAnim} ${ANIM_DURATION}ms ${A.standard}`})
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

	}
