

const END_EVENTS = ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend']
const START_EVENTS = ['webkitAnimationStart', 'mozAnimationStart', 'MSAnimationStart', 'oanimationstart', 'animationstart']


export function animate(node: HTMLElement, anim: string): Promise<HTMLElement> {

	return new Promise((resolve, reject) => {

		node.style.animation = anim
		let events = ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend']

		function bye() {
			events.forEach(name => node.removeEventListener(name, bye))
			resolve(node)
		}
		events.forEach(name => node.addEventListener(name, bye))

	})

}


export function animateClass(node: HTMLElement, cls: string) {
	node.classList.add(cls)

	return new Promise((resolve, reject) => {
		var ended = false
		const anims = new Set<string>()

		function end() {
			ended = true
			START_EVENTS.forEach(name => node.removeEventListener(name as any, fnstart))
			END_EVENTS.forEach(name => node.removeEventListener(name as any, fnend))
			resolve()
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


import s from './styling'

export namespace CSS {

	export const deceleration = `cubic-bezier(0, 0, .2, 1)`
	export const standard = `cubic-bezier(.4, 0, .2, 1)`
	export const acceleration = `cubic-bezier(.4, 0, 1, 1)`
	export const sharp = `cubic-bezier(.4, 0, .6, 1)`

	export const fadeIn = s.keyframes('fade-in', {
		'0%': {opacity: 0},
		'100%': {opacity: 1}
	})

	export const fadeOut = s.keyframes('fade-out', {
		'100%': {opacity: 0}
	})

	export const slideFromLeft = s.keyframes('slide-from-left', {
		'0%': {transform: `translateX(-100%) translateZ(0)`},
		'100%': {transform: `translateX(0) translateZ(0)`}
	})

	export const slideToLeft = s.keyframes('slide-to-left', {
		'0%': {transform: `translateX(0) translateZ(0)`},
		'100%': {transform: `translateX(-100%) translateZ(0)`}
	})

	export const topEnter = s.keyframes('top-enter', {
		'0%': {transform: `translate3d(0, 50px, 0) scale3d(1.1, 1.1, 1)`},
		'100%': {transform: `translate3d(0, 0, 0) scale3d(1, 1, 1)`}
	})

	export const topLeave = s.keyframes('top-leave', {
		'0%': {transform: `translate3d(0, 0, 0) scale3d(1, 1, 1)`},
		'100%': {transform: `translate3d(0, -50px, 0) scale3d(0.9, 0.9, 1)`}
	})

}

