
import { remove_node, Insertable, e, node_add_child } from 'elt'
import { animate } from './animate'

import { style, builder as CSS } from 'osun'
import { theme } from './colors'


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
		this._holder = <div class={[Toaster.cls_holder, CSS.row.justifyCenter]}/>
	}

	kill(node: HTMLElement) {
		animate(node, animate.fade_out).then(node =>
			remove_node(node)
		)
	}

	toast(msg: Insertable<HTMLDivElement>) {
		// if (!this._mounted)
		// 	this.mount(document.body);

		if (this._current) {
			clearTimeout(this._cancel);
			this.kill(this._current)
	}

		// let promise: Promise<any> = this._current ? this._current.destroy() : Promise.resolve(true)

		if (!this._holder.parentNode) {
			node_add_child(document.body, this._holder)
		}

		let toast = (msg instanceof Node ? msg
			: <div class={Toaster.cls_toast}>{msg}</div>) as HTMLElement

		animate(toast, animate.fade_in)
		node_add_child(this._holder, toast)

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
		borderRadius: '2px 2px 0 0',
		cursor: 'pointer',
	}, theme.derive({bg: `#3c3c3b`}).className)

}


export const toast = new Toaster;
