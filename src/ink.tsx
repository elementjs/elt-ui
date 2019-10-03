
import {click, Mixin, append_child_and_mount, remove_and_unmount} from 'elt'

import { animate } from './animate'
import S from './styling'
import { keyframes, cls, rule } from 'osun'

export const ANIM_DURATION = 300


export function inker(node: Node, event: MouseEvent) {

	var clientX = event.pageX
	var clientY = event.pageY

	const position = (window.getComputedStyle((node as HTMLElement)).position)
	const is_relative = position === 'relative' || position === 'absolute'

	const ink_circle = <div class={inker.cls_ink}/> as HTMLDivElement
	const ink_container = <div class={inker.cls_container}>
		{ink_circle}
	</div> as HTMLDivElement

	append_child_and_mount(is_relative ? node : document.body, ink_container)

	// Some CSS rules may mess up the container positioning, so we enforce them
	// here
	const ink_size = 64
	const st = ink_container.style
	st.marginLeft = '0px'
	st.paddingLeft = '0px'
	if (is_relative) {
		st.left = '0px'
		st.top = '0px'
		st.position = 'absolute'
		st.width = '100%'
		st.height = '100%'
	} else {
		st.backgroundColor = 'rgba(0, 0, 0, 0)'
		st.left = `${event.clientX - ink_size / 2}px`
		st.top = `${event.clientY - ink_size / 2}px`
		st.position = 'fixed'
		st.width = `${ink_size}px`
		st.height = `${ink_size}px`
	}

	requestAnimationFrame(e => {
		const bb = ink_container.getBoundingClientRect()

		const x = clientX - bb.left
		const y = clientY - bb.top
		const mx = bb.width - x
		const my = bb.height - y

		// we want the biggest distance to an edge, as it will determine
		// the size of our inker.
		const biggest = is_relative ? Math.sqrt(
			Math.max(
				x * x + y * y,
				x * x + my * my,
				mx * mx + y * y,
				mx * mx + my * my
			)
		) :
			// Alternatively, if we're not in relative mode, we will keep
			ink_size / 2

		const size = `${Math.round(biggest * 2)}px`
		const halved = `-${Math.round(biggest)}px`
		const it = ink_circle.style
		it.left = `${x}px`
		it.top = `${y}px`
		it.width = size
		it.height = size
		it.marginTop = halved
		it.marginLeft = halved

		animate(ink_container, inker.cls_ink_animate).then(() => {
			remove_and_unmount(ink_container)
		})
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


export namespace inker {

		export const kf_ripple_opacity = keyframes('ripple', {
			'0%': { opacity: 0},
			'10%': { opacity: 0.26 },
			'75%': { opacity: 0.26},
			'100%': { opacity: 0 }
		})

		export const kf_ripple_size = keyframes('size', {
			'0%': {transform: `scale(0) translateZ(0)`},
			'75%': {transform: `scale(1) translateZ(0)`},
			'100%': { transform: `scale(1) translateZ(0)` }
		})

		export const cls_ink_animate = cls('em-ink-animate')

		export const cls_ink = cls('ink', {
				display: 'block',
				position: 'absolute',
				backgroundColor: S.TINT,
				borderRadius: '50%',
				transform: 'scale(0)',
				pointerEvents: 'none',
				marginTop: '-25px',
				marginLeft: '-25px',
				width: '50px',
				height: '50px',
			}
		)

		export const cls_container = cls('container', {
				display: 'block',
				width: '100%',
				height: '100%',
				top: '0px',
				left: '0px',
				opacity: 0,
				backgroundColor: S.TINT14,
				overflow: 'hidden',
				position: 'absolute',
				pointerEvents: 'none',
			}
		)

		rule`${cls_container}${cls_ink_animate}`({
			animation: `${kf_ripple_opacity} ${ANIM_DURATION}ms ${animate.FN_STANDARD}`
		})

		rule`${cls_container}${cls_ink_animate} ${cls_ink}`({
			animation: `${kf_ripple_size} ${ANIM_DURATION}ms ${animate.FN_STANDARD}`
		})

	}
