import './select.styl'

//////////////////////////////////////////////////////////////
import {o, O, c, bind, Atom, BasicAttributes, Appendable, Observable, Component} from 'carbyne'

export type LabelFn<T> = (opt: T) => string
export type ChangeFn<T> = (value: T, event: Event, atom: Atom) => any

export interface SelectAttributes<T> extends BasicAttributes {
	model: Observable<T>
	options: O<T[]>
	labelfn?: LabelFn<T>
	change?: ChangeFn<T>
}

export class Select<T> extends Component {

	attrs: SelectAttributes<T>

	model: Observable<T>
	options: Observable<T[]>
	labelfn: LabelFn<T>
	change: ChangeFn<T>

	protected selected: Observable<string>

	constructor(attrs: SelectAttributes<T>) {
		super(attrs)

		this.model = o(attrs.model)
		this.options = o(attrs.options || [])
		this.labelfn = attrs.labelfn || ((o: any) => o.label || o.name || o);
		this.change = attrs.change

		this.selected = o('-1')
	}

	/**
	 * Setup the observation logic.
	 * We use a touched() function to avoid infinite loops since there
	 * is a circular logic here.
	 */
	onCreate() {
		let atom = this.atom
		let mod = false;

		let touched = () => {
			if (mod)
				return true
			mod = true
			requestAnimationFrame(() => { mod = false; });
			return false
		}

		atom.observe(this.options, (opts) => {
			if (touched()) return;

			this.selected.set('' + opts.indexOf(this.model.get()));

		});

		atom.observe(this.model, (v) => {
			if (touched()) return;

			this.selected.set(''+ this.options.get().indexOf(v));
		});

		atom.observe(this.selected, (v) => {
			if (touched()) return;

			this.model.set(this.options.get()[parseInt(v)]);
		});

	}

	render(children: Appendable): Atom {

		let decorators = [bind(this.selected)];

		if (this.change) {
			decorators.push(atom => atom.listen('change', ev => this.change(this.model.get(), ev, atom)))
		}

		return <label class='carbm-select-label'>
			<select class='carbm-select' $$={decorators}>
				{this.options.tf((opts) => {
					return opts.map((o, i) => <option
						value={i}
						selected={this.model.get() === o ? true : undefined}>{this.labelfn(o)}</option>);
				})}
			</select>
		</label>
	}

}

