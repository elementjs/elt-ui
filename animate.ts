/* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
	 To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
	 devices to avoid wasting battery power on inactive tabs. */
/* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */
// if (!Velocity.State.isMobile && document.hidden !== undefined) {
// 	document.addEventListener("visibilitychange", function() {
// 		/* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
// 		if (document.hidden) {
// 			ticker = function(callback) {
// 				 // The tick function needs a truthy first argument in order to pass its internal timestamp check.
// 				return setTimeout(function() { callback(true) }, 16);
// 			};

// 			/* The rAF loop has been paused by the browser, so we manually restart the tick. */
// 			tick();
// 		} else {
// 			ticker = window.requestAnimationFrame || rAFShim;
// 		}
// 	});
// }


import {keyframes} from 'typestyle'

export const animations = {

	fadeIn: keyframes({
		'0%': {opacity: 0},
		'100%': {opacity: 1}
	}),

	fadeOut: keyframes({
		'100%': {opacity: 0}
	}),

	slideFromRight: keyframes({
		'0%': {transform: `translateX(-100%) translateZ(0)`},
		'100%': {transform: `translateX(0) translateZ(0)`}
	}),

	slideToRight: keyframes({
		'0%': {transform: `translateX(-100%) translateZ(0)`}
	}),

	topEnter: keyframes({
		'0%': {transform: `translate3d(0, 50px, 0) scale3d(1.1, 1.1, 1)`},
		'100%': {transform: `translate3d(0, 0, 0) scale3d(1, 1, 1)`}
	}),

	topLeave: keyframes({
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
				// setTimeout(() => node.classList.remove(cls), 100)
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
				anim_end_count -= 1
				fnend()
			}
		}, 100)

	})
}