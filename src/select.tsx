import './select.styl'

//////////////////////////////////////////////////////////////
import {o, c, bind, cls, click, Atom, BasicAttributes, Appendable, Observable} from 'carbyne'

export type LabelFn<T> = (opt: T) => string
export type ChangeFn<T> = (value: T, event: Event, atom: Atom) => any

export interface SelectAttributes<T> extends BasicAttributes {
	model: Observable<T>
	options: T[]
	labelfn: LabelFn<T>
	change: ChangeFn<T>
}

export function Select<T>(attrs: SelectAttributes<T>, children: Appendable): Atom {

	let model: Observable<T> = attrs.model
	let options: Observable<T[]> = o(attrs.options || []);

	let labelfn = attrs.labelfn || ((o: any) => o.label || o.name || o);

	let _select = o(-1);
	let decorators = [bind(_select)];

	if (attrs.change) {
		decorators.push(atom => atom.listen('change', ev => attrs.change(model.get(), ev, atom)))
	}

	let atom = <label class='carbm-select-label'>
		<select class='carbm-select' $$={decorators}>
			{options.tf((opts) => {
				return opts.map((o, i) => <option value={i} selected={model.get() === o ? true : undefined}>{labelfn(o)}</option>);
			})}
		</select>
	</label> as Atom

	let mod = false;

	let touched = () => {
		if (mod)
			return true
		mod = true
		requestAnimationFrame(() => { mod = false; });
		return false
	}

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
