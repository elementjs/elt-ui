
import * as s from './styling'

export const animations = {

	fadeIn: s.keyframes('fade-in', {
		'0%': {opacity: 0},
		'100%': {opacity: 1}
	}),

	fadeOut: s.keyframes('fade-out', {
		'100%': {opacity: 0}
	}),

	slideFromLeft: s.keyframes('slide-from-left', {
		'0%': {transform: `translateX(-100%) translateZ(0)`},
		'100%': {transform: `translateX(0) translateZ(0)`}
	}),

	slideToLeft: s.keyframes('slide-to-left', {
		'0%': {transform: `translateX(0) translateZ(0)`},
		'100%': {transform: `translateX(-100%) translateZ(0)`}
	}),

	topEnter: s.keyframes('top-enter', {
		'0%': {transform: `translate3d(0, 50px, 0) scale3d(1.1, 1.1, 1)`},
		'100%': {transform: `translate3d(0, 0, 0) scale3d(1, 1, 1)`}
	}),

	topLeave: s.keyframes('top-leave', {
		'0%': {transform: `translate3d(0, 0, 0) scale3d(1, 1, 1)`},
		'100%': {transform: `translate3d(0, -50px, 0) scale3d(0.9, 0.9, 1)`}
	})

}


export function transition() {

}


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

		let fnend = function () {
			anim_end_count += 1
			// Remove all the event listeners.
			if (anim_start_count == anim_end_count) {
				START_EVENTS.forEach(name => node.removeEventListener(name, fnstart))
				END_EVENTS.forEach(name => node.removeEventListener(name, fnend))
				resolve()
			}
		}

		let fnstart = function () {
			anim_start_count += 1
		}

		let anim_start_count = 0
		let anim_end_count = 0

		START_EVENTS.forEach(name => node.addEventListener(name, fnstart))
		END_EVENTS.forEach(name => node.addEventListener(name, fnend))

		// We leave 100 ms to the animations to potentially start. If during
		// this delay nothing started, we call the end function.
		setTimeout(() => {
			if (anim_start_count === 0) {
				console.warn('no animations were started, executing end function anyway.')
				anim_end_count -= 1
				fnend()
			}
		}, 100)

	})
}