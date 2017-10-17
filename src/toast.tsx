
import {Insertable} from 'elt'
import {animate} from './animate'

import * as cssanim from './animations.styl'
import * as css from './toast.styl'

/**
 * FIXME: there should be a queue instead of brutally dismissing everything.
 */
export class Toaster {

	_mounted: boolean
	_holder: Node
	_current: HTMLElement
	_cancel: number

	constructor() {
		this._mounted = false
		this._holder = <div class={css.holder}/>
	}

	kill(node: HTMLElement) {
		animate(node, `${cssanim.fadeOut} 0.2s ease-out both`).then(node =>
			node.remove()
		)
	}

	toast(msg: Insertable) {
		// if (!this._mounted)
		// 	this.mount(document.body);

		if (this._current) {
			clearTimeout(this._cancel);
			this.kill(this._current)
		}

		// let promise: Promise<any> = this._current ? this._current.destroy() : Promise.resolve(true)

		if (!this._holder.parentNode)
			document.body.appendChild(this._holder)

		let toast = (msg instanceof Node ? msg
			: <div class={css.toast}>{msg}</div>) as HTMLElement

		animate(toast, `${cssanim.fadeIn} 0.2s ease-in both`)
		this._holder.appendChild(toast)

		this._cancel = setTimeout(() => this.kill(toast), 3000)
		this._current = toast

	}

}

export default new Toaster;
