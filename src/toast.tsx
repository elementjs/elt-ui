
import { Insertable, append_child_and_mount, remove_and_unmount } from 'elt'
import { animate } from './animate'

import S from './styling'
import { style } from 'osun'


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
		this._holder = <div class={[Toaster.cls_holder, S.flex.row.justifyCenter]}/>
	}

	kill(node: HTMLElement) {
		animate(node, animate.FADE_OUT).then(node =>
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
			: <div class={Toaster.cls_toast}>{msg}</div>) as HTMLElement

		animate(toast, animate.fade_in)
		append_child_and_mount(this._holder, toast)

		this._cancel = window.setTimeout(() => this.kill(toast), 3000)
		this._current = toast

	}

}


export namespace Toaster {

	export const cls_holder = style('toast-holder',
		{
			position: 'fixed',
			bottom: 0,
			left: 0,
			width: '100%',
	})

	export const cls_toast = style('toast', {
		padding: '14px 24px',
		fontSize: '14px',
		background: S.FG75,
		borderRadius: '2px 2px 0 0',
		color: S.BG,
		cursor: 'pointer'
	})

}


export default new Toaster;
