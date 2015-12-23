
import {c, o, transition} from 'carbyne';

import './toast.styl'

class Toaster {

	constructor() {
		this._holder = <div class='carbm--toast-holder'/>;
	}

	mount(elt, before) {
		this._holder.mount(elt, before);
	}

	toast(msg) {
		if (this._current) {
			this._current.destroy();
			clearTimeout(this._cancel);
			this._current = null;
		}

		let atom = <div class='carbm--toast' $$={transition()}>{msg}</div>;
		this._holder.append(atom);
		this._current = atom;
		this._cancel = setTimeout(() => {
			atom.destroy()
			this._current = null;
		}, 3000);
		// timeout !
	}

}

export default new Toaster;