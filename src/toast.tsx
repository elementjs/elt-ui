
import {c, o, click, Atom} from 'carbyne';

import {animator} from './animate'

import './toast.styl'

export class Toaster {

	_mounted: boolean
	_holder: Atom
	_current: Atom
	_cancel: number

	constructor() {
		this._mounted = false
		this._holder = c('.carbm--toast-holder')
	}

	mount(elt: Node, before: Node = null) {
		this._holder.mount(elt, before);
		this._mounted = true;
	}

	toast(msg) {
		if (!this._mounted)
			this.mount(document.body);

		if (this._current) {
			clearTimeout(this._cancel);
		}

		let promise: Promise<any> = this._current ? this._current.destroy() : Promise.resolve(true)
		promise.then(done => {
			let cancel = null;
			let atom = c('.carbm--toast', {
				$$: [click(ev => {
						atom.destroy();
						clearTimeout(cancel);
						if (atom === this._current) this._current = null;
					}),
					animator({
						enter: {
							opacity: pct => pct,
							transform: pct => `translateY(${100 - pct * 100}%)`
						},
						leave: {
							opacity: pct => 1 - pct,
							transform: pct => `translateY(${pct * 100}%)`
						}
					})
				]
			}, [msg])
			this._holder.append(atom);
			this._current = atom;
			this._cancel = cancel = setTimeout(() => {
				atom.destroy()
				this._current = null;
			}, 3000);
			// timeout !
		});

	}

}

export default new Toaster;
