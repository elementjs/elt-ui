

const END_EVENTS = ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend']
const START_EVENTS = ['webkitAnimationStart', 'mozAnimationStart', 'MSAnimationStart', 'oanimationstart', 'animationstart']


export function animate(node: HTMLElement, cls: string) {
	node.classList.add(cls)

	return new Promise<HTMLElement>((resolve, reject) => {
		var ended = false
		const anims = new Set<string>()

		function end() {
			ended = true
			START_EVENTS.forEach(name => node.removeEventListener(name as any, fnstart))
			END_EVENTS.forEach(name => node.removeEventListener(name as any, fnend))
			resolve(node)
		}

		function fnend (ev: AnimationEvent) {
			// We didn't see this animation get started here, so we just
			// won't handle it.
			if (!anims.has(ev.animationName))
				return

			anims.delete(ev.animationName)

			// We should be done once we reach here.
			if (!ended && anims.size === 0) {
				end()
			}
		}

		function fnstart (ev: AnimationEvent) {
			anims.add(ev.animationName)
		}

		START_EVENTS.forEach(name => node.addEventListener(name as any, fnstart))
		END_EVENTS.forEach(name => node.addEventListener(name as any, fnend))

		// We leave 100 ms to the animations to potentially start. If during
		// this delay nothing started, we call the end function.
		setTimeout(() => {
			if (!ended && anims.size === 0) {
				console.warn('no animations were started, executing end function anyway.')
				end()
			}
		}, 100)

	})
}


import { keyframes } from 'osun'

export namespace animate {

	export const FN_DECELERATION = `cubic-bezier(0, 0, .2, 1)`
	export const FN_STANDARD = `cubic-bezier(.4, 0, .2, 1)`
	export const FN_ACCELERATION = `cubic-bezier(.4, 0, 1, 1)`
	export const FN_SHARP = `cubic-bezier(.4, 0, .6, 1)`

	export const fade_in = keyframes('fade-in', {
		'0%': {opacity: 0},
		'100%': {opacity: 1}
	})

	export const fade_out = keyframes('fade-out', {
		'100%': {opacity: 0}
	})

	export const slide_from_left = keyframes('slide-from-left', {
		'0%': {transform: `translateX(-100%) translateZ(0)`},
		'100%': {transform: `translateX(0) translateZ(0)`}
	})

	export const slide_to_left = keyframes('slide-to-left', {
		'0%': {transform: `translateX(0) translateZ(0)`},
		'100%': {transform: `translateX(-100%) translateZ(0)`}
	})

	export const top_enter = keyframes('top-enter', {
		'0%': {transform: `translate3d(0, 50px, 0) scale3d(1.1, 1.1, 1)`},
		'100%': {transform: `translate3d(0, 0, 0) scale3d(1, 1, 1)`}
	})

	export const top_leave = keyframes('top-leave', {
		'0%': {transform: `translate3d(0, 0, 0) scale3d(1, 1, 1)`},
		'100%': {transform: `translate3d(0, -50px, 0) scale3d(0.9, 0.9, 1)`}
	})

}

