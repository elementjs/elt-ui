
export interface Animation {
	name: string
	keyframes: Keyframe[]
	opts?: KeyframeAnimationOptions
}

export function animation(
	name: string,
	keyframes: Keyframe[],
	opts?: KeyframeAnimationOptions): Animation {
		opts = Object.assign({}, { duration: 200, easing: "linear" }, opts ?? {})
		return {name, keyframes, opts}
}

/**
 * Create a Promise that will be resolved once all of the animations
 * that started after the class was added to the node end.
 */
export function animate<N extends Element>(node: N, ...animation_definition: Animation[]) {

	return Promise.all(animation_definition.map(animation_definition => new Promise<N>((accept, reject) => {
		requestAnimationFrame(() => {
			const anim = node.animate(animation_definition.keyframes, animation_definition.opts)
			anim.oncancel = () => accept(node)
			anim.onfinish = () => accept(node)
			anim.onremove = () => reject()
		})
	})))

}

animate.animation = animation


export namespace animate {
	export const ANIM_DURATION = 200

	export const FN_DECELERATION = `cubic-bezier(0, 0, .2, 1)`
	export const FN_STANDARD = `cubic-bezier(.4, 0, .2, 1)`
	export const FN_ACCELERATION = `cubic-bezier(.4, 0, 1, 1)`
	export const FN_SHARP = `cubic-bezier(.4, 0, .6, 1)`

	export const fade_in = animation("fade-in", [
		{ opacity: 0 },
		{ opacity: 1 },
	], {
		easing: FN_DECELERATION
	})

	export const fade_out = animation("fade-out", [
		{ opacity: 0 }
	], { easing: FN_ACCELERATION })

	function slide(axis: "X" | "Y", start: number, end: number, enter = true) {
		return animation("slide-", [
			{transform: `translate${axis}(${start}%) translateZ(0)`},
			{transform: `translate${axis}(${end}%) translateZ(0)`}
		], { easing: enter ? FN_DECELERATION : FN_ACCELERATION })
	}

	export const slide_from_left = slide("X", -100, 0, true)
	export const slide_to_left = slide("X", 0, -100, false)
	export const slide_from_bottom = slide("Y", 100, 0, true)
	export const slide_to_bottom = slide("Y", 0, 100, true)

	export const top_enter = animation('top-enter', [
		{transform: `scale3d(1.2, 1.2, 1)`, transformOrigin: 'top 50%', opacity: 0},
		{transform: `scale3d(1, 1, 1)`, opacity: 1}
	], {
		easing: FN_DECELERATION
	})

	export const top_leave = animation('top-leave', [
		{transform: `scale3d(1, 1, 1)`, transformOrigin: 'top 50%'},
		{transform: `scale3d(0.7, 0.7, 1)`, opacity: 0}
	], {
		easing: FN_SHARP
	})

}

