
import { keyframes } from 'osun'

/**
 * Create a Promise that will be resolved once all of the animations
 * that started after the class was added to the node end.
 */
export function animate(node: HTMLElement, cls: string) {

	return new Promise<HTMLElement>((resolve, reject) => {
		var ended = false
		const anims = new Set<string>()

		function end() {
			ended = true
			node.removeEventListener('animationend', fnend)
			node.removeEventListener('animationstart', fnstart)
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

		node.addEventListener('animationstart', fnstart)
		node.addEventListener('animationend', fnend)
		node.classList.add(cls)

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


export namespace animate {
	export const ANIM_DURATION = 200

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
		'0%': {transform: `scale3d(1.2, 1.2, 1)`, transformOrigin: 'top 50%', opacity: 0},
		'100%': {transform: `scale3d(1, 1, 1)`, opacity: 1}
	})

	export const top_leave = keyframes('top-leave', {
		'0%': {transform: `scale3d(1, 1, 1)`, transformOrigin: 'top 50%'},
		'100%': {transform: `scale3d(0.7, 0.7, 1)`, opacity: 0}
	})

}

