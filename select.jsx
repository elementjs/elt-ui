
var {o, c, bind, cls, click} = require('carbyne');
import './select.styl';

export function Select(attrs, children) {

	let model = o(attrs.model);
	let options = o(attrs.options || []);

	let _select = o(-1);

	let atom = <label class='carbm-select-label'>
		<select class='carbm-select' $$={bind(_select)}>
			{options.tf((opts) => {
				return opts.map((o, i) => <option value={i} selected={model.get() === o}>{o.label||o.name||o}</option>);
			})}
		</select>
	</label>

	let mod = false;
	let touched = () => { if (mod) return true; mod = true; requestAnimationFrame(() => { mod = false; }); };

	atom.observe(options, (opts) => {
		if (touched()) return;

		_select.set('' + opts.indexOf(model.get()));

	});

	atom.observe(model, (v) => {
		if (touched()) return;

		_select.set(''+ options.get().indexOf(v));
	});

	atom.observe(_select, (v) => {
		if (touched()) return;

		model.set(options.get()[v]);
	});

	return atom;
}
