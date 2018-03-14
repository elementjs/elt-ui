
import {Insertable, append_child_and_mount, remove_and_unmount} from 'elt'
import {animate, css as AnimCSS} from './animate'
import {css as flex} from './flex'

import {cls} from 'osun'
import {css as base} from './styling'

export namespace css {
	export const holder = cls('toast-holder',
		{
			position: 'fixed',
			bottom: 0,
			left: 0,
			width: '100%',
	})

	export const toast = cls('toast', {
		padding: '14px 24px',
		fontSize: '14px',
		background: base.colors.FG2,
		borderRadius: '2px 2px 0 0',
		color: base.colors.BG,
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
	_current: HTMLElement | null = null
	_cancel: number = -1

	constructor() {
		this._mounted = false
		this._holder = <div class={[css.holder, flex.row, flex.justify_center]}/>
	}

	kill(node: HTMLElement) {
		animate(node, `${AnimCSS.fade_out} 0.2s ease-out both`).then(node =>
			remove_and_unmount(node)
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

		if (!this._holder.parentNode) {
			append_child_and_mount(document.body, this._holder)
		}

		let toast = (msg instanceof Node ? msg
			: <div class={css.toast}>{msg}</div>) as HTMLElement

		animate(toast, `${AnimCSS.fade_in} 0.2s ease-in both`)
		append_child_and_mount(this._holder, toast)

		this._cancel = window.setTimeout(() => this.kill(toast), 3000)
		this._current = toast

	}

}

export default new Toaster;
