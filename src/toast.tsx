
import {d, click} from 'domic';

import {animator} from './animate'


export class Toaster {

	_mounted: boolean
	_holder: Node
	_current: Node
	_cancel: number

	constructor() {
		this._mounted = false
		this._holder = <div class='dm--toast-holder'/>
	}

	toast(msg: string|Node) {
		// if (!this._mounted)
		// 	this.mount(document.body);

		if (this._current) {
			clearTimeout(this._cancel);
		}

		// let promise: Promise<any> = this._current ? this._current.destroy() : Promise.resolve(true)

		// promise.then(done => {
		// 	let cancel: number = null;
		// 	let atom = d('.dm--toast', {
		// 		$$: [
		// 			click(ev => {
		// 				// atom.destroy();
		// 				clearTimeout(cancel);
		// 				if (atom === this._current) this._current = null;
		// 			}),
		// 			animator({
		// 				enter: {
		// 					opacity: pct => pct,
		// 					transform: pct => `translateY(${100 - pct * 100}%)`
		// 				},
		// 				leave: {
		// 					opacity: pct => 1 - pct,
		// 					transform: pct => `translateY(${pct * 100}%)`
		// 				}
		// 			})
		// 		]
		// 	}, [msg])
		// 	// this._holder.append(atom);
		// 	this._current = atom;
		// 	this._cancel = cancel = setTimeout(() => {
		// 		// atom.destroy()
		// 		this._current = null;
		// 	}, 3000);
		// 	// timeout !
		// });

	}

}

export default new Toaster;
