
import {c, o, click} from 'carbyne';

var velocity = () => () => {}
try {
  velocity = require('carbyne-velocity').velocity
} catch (e) { }

import './toast.styl'

class Toaster {

	constructor() {
		this._mounted = false;
		this._holder = <div class='carbm--toast-holder'/>;
	}

	mount(elt, before) {
		this._holder.mount(elt, before);
		this._mounted = true;
	}

	toast(msg) {
		if (!this._mounted)
			this.mount(document.body);

		if (this._current) {
			clearTimeout(this._cancel);
		}

		(this._current ?
			this._current.destroy() :
			Promise.resolve(true)
		).then(done => {
			let cancel = null;
			let atom = <div class='carbm--toast' $$={[click(ev => {
					atom.destroy();
					clearTimeout(cancel);
					if (atom === this._current) this._current = null;
				}),
				velocity({
					enter: {opacity: [1, 0], translateY: [0, '100%']},
					leave: {opacity: 0, translateY: '100%'}
				})
			]}>{msg}</div>;
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
