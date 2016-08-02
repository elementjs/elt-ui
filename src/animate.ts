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

import {Controller, Atom} from 'carbyne'

/**
* KeySpline - use bezier curve for transition easing function
* is inspired from Firefox's nsSMILKeySpline.cpp and really stolen from some blog (don't
* remember which, blame internet.)
* Usage:
* var spline = KeySpline(0.25, 0.1, 0.25, 1.0)
* spline(pct)
*/
function KeySpline(mX1: number, mY1: number, mX2: number, mY2: number) {

  function A(aA1: number, aA2: number): number { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
  function B(aA1: number, aA2: number): number { return 3.0 * aA2 - 6.0 * aA1; }
  function C(aA1: number) { return 3.0 * aA1; }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function CalcBezier(aT: number, aA1: number, aA2: number): number {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function GetSlope(aT: number, aA1: number, aA2: number): number {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }

  function GetTForX(aX: number): number {
    // Newton raphson iteration
    var aGuessT = aX;
    for (var i = 0; i < 4; ++i) {
      var currentSlope = GetSlope(aGuessT, mX1, mX2);
      if (currentSlope == 0.0) return aGuessT;
      var currentX = CalcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  return function(aX: number): number {
    if (mX1 == mY1 && mX2 == mY2) return aX; // linear
    return CalcBezier(GetTForX(aX), mY1, mY2);
  }
}


export class ValueAnimator {

	bezier: (n: number) => number

	constructor(easing: number[]) {
		this.bezier = KeySpline(easing[0], easing[1], easing[2], easing[3])
	}

	interval(begin: number, end: number, valuefn: (v: number) => string = null): (pct: number) => string {
		valuefn = valuefn || ((v: number) => `${v}`)
		let bez = this.bezier
		return (pct) => valuefn(begin + bez(pct)*(end - begin))
	}

	from(begin: number, valuefn: (v: number) => string = null): (pct: number) => string {
		return this.interval(begin, 0, valuefn)
	}

	to(end: number, valuefn: (v: number) => string = null): (pct: number) => string {
		return this.interval(0, end, valuefn)
	}

}

export const easings = {
	linear: new ValueAnimator([0.00, 0.0, 1.00, 1.0]),
	ease: new ValueAnimator([0.25, 0.1, 0.25, 1.0]),
	easeIn: new ValueAnimator([0.42, 0.0, 1.00, 1.0]),
	easeOut: new ValueAnimator([0.00, 0.0, 0.58, 1.0]),
	easeInOut: new ValueAnimator([0.42, 0.0, 0.58, 1.0]),
	easeInSine: new ValueAnimator([0.47, 0, 0.745, 0.715]),
	easeOutSine: new ValueAnimator([0.39, 0.575, 0.565, 1]),
	easeInOutSine: new ValueAnimator([0.445, 0.05, 0.55, 0.95]),
	easeInQuad: new ValueAnimator([0.55, 0.085, 0.68, 0.53]),
	easeOutQuad: new ValueAnimator([0.25, 0.46, 0.45, 0.94]),
	easeInOutQuad: new ValueAnimator([0.455, 0.03, 0.515, 0.955]),
	easeInCubic: new ValueAnimator([0.55, 0.055, 0.675, 0.19]),
	easeOutCubic: new ValueAnimator([0.215, 0.61, 0.355, 1]),
	easeInOutCubic: new ValueAnimator([0.645, 0.045, 0.355, 1]),
	easeInQuart: new ValueAnimator([0.895, 0.03, 0.685, 0.22]),
	easeOutQuart: new ValueAnimator([0.165, 0.84, 0.44, 1]),
	easeInOutQuart: new ValueAnimator([0.77, 0, 0.175, 1]),
	easeInQuint: new ValueAnimator([0.755, 0.05, 0.855, 0.06]),
	easeOutQuint: new ValueAnimator([0.23, 1, 0.32, 1]),
	easeInOutQuint: new ValueAnimator([0.86, 0, 0.07, 1]),
	easeInExpo: new ValueAnimator([0.95, 0.05, 0.795, 0.035]),
	easeOutExpo: new ValueAnimator([0.19, 1, 0.22, 1]),
	easeInOutExpo: new ValueAnimator([1, 0, 0, 1]),
	easeInCirc: new ValueAnimator([0.6, 0.04, 0.98, 0.335]),
	easeOutCirc: new ValueAnimator([0.075, 0.82, 0.165, 1]),
	easeInOutCirc: new ValueAnimator([0.785, 0.135, 0.15, 0.86]),
}


export interface Props {
	[name: string]: (stamp: number) => string|number
}


export function animate(element: HTMLElement, props: Props, dur: number): Promise<any> {

	let start: number = null
	// ease in
	// let E = easings.easeInSine
	// let bezier = KeySpline(E[0], E[1], E[2], E[3])
	let style: any = element.style

	for (let x in props)
		style[x] = props[x](0)

	return new Promise((resolve, reject) => {

		function _next(stamp: number) {
			if (!start) start = stamp
			let progress = stamp - start

			// let now = performance.now() - start
			// let step = Math.min(now, dur) / dur
			let step = Math.min(progress, dur) / dur

			for (let x in props)
				style[x] = props[x](step)

			if (progress < dur)
				requestAnimationFrame(_next)
			else {
				resolve(true)
			}
		}

		requestAnimationFrame(_next)
	})
}


export interface AnimationSpec {
	enter?: Props
	leave?: Props
	[name: string]: Props
}


export class Animator extends Controller {

	protected specs: AnimationSpec
	protected duration: number

	constructor(specs: AnimationSpec, duration: number = 200) {
		super()
		this.specs = specs
		this.duration = duration
	}

	onMount() {
		if (this.specs.enter) {
			animate(this.atom.element, this.specs.enter, this.duration)
		}
	}

	onUnmountBefore() {
		if (this.specs.leave) {
			return animate(this.atom.element, this.specs.leave, this.duration)
		}
		return null
	}

}


export function animator(specs: AnimationSpec, duration: number = 200) {
	return function _decorate(atom: Atom): Atom {
		let c = new Animator(specs, duration)
		atom.addController(c)
		return atom
	}
}
