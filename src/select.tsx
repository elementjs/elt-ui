
import {o, c, bind, cls, click} from 'carbyne'
import './select.styl'

export function Select(attrs, children) {

	let model = o(attrs.model);
	let options = o(attrs.options || []);

	let labelfn = attrs.labelfn || (o => o.label || o.name || o);

	let _select = o(-1);
	let decorators = [bind(_select)];

	if (attrs.change) {
		decorators.push(atom => atom.listen('change', ev => attrs.change.call(atom, model.get(), ev)))
	}

	let atom = <label class='carbm-select-label'>
		<select class='carbm-select' $$={decorators}>
			{options.tf((opts) => {
				return opts.map((o, i) => <option value={i} selected={model.get() === o ? true : undefined}>{labelfn(o)}</option>);
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
