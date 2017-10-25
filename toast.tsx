
import {Insertable} from 'elt'
import {animate, CSS as AnimCSS} from './animate'
import flex from './flex'

import * as s from './styling'

export namespace CSS {
	export const holder = s.style('toast-holder',
		{
			position: 'fixed',
			bottom: 0,
			left: 0,
			width: '100%',
	})

	export const toast = s.style('toast', {
		padding: '14px 24px',
		fontSize: '14px',
		background: 'alpha(#323232, 0.87)',
		borderRadius: '2px 2px 0 0',
		color: 'white',
		cursor: 'pointer'
	})

}



// import * as css from './toast.styl'

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
		this._holder = <div class={[CSS.holder, flex.row, flex.justifyCenter]}/>
	}

	kill(node: HTMLElement) {
		animate(node, `${AnimCSS.fadeOut} 0.2s ease-out both`).then(node =>
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
			: <div class={CSS.toast}>{msg}</div>) as HTMLElement

		animate(toast, `${AnimCSS.fadeIn} 0.2s ease-in both`)
		this._holder.appendChild(toast)

		this._cancel = setTimeout(() => this.kill(toast), 3000)
		this._current = toast

	}

}

export default new Toaster;
