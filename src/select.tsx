import './select.styl'

//////////////////////////////////////////////////////////////
import {
	BasicAttributes,
	bind,
	Component,
	d,
	o,
	O,
	Observable,
} from 'domic'


export type LabelFn<T> = (opt: T) => string
// export type ChangeFn<T> = (value: T, event: Event, atom: Atom) => any
export type ChangeFn<T> = (value: T, ev?: Event) => any


export interface SelectAttributes<T> extends BasicAttributes {
	model: Observable<T>
	options: O<T[]>
	labelfn?: LabelFn<T>
	onchange?: ChangeFn<T>
}

export class Select<T> extends Component {

	// FIXME attrs handling is probably not wonderful.

	attrs: SelectAttributes<T>

	// model: Observable<T>
	// options: Observable<T[]>
	// labelfn: LabelFn<T>
	// onchange: ChangeFn<T>

	protected selected: Observable<string>

	/**
	 * Setup the observation logic.
	 */
	render(children: DocumentFragment): Node {
		let mod = false;

		let attrs = this.attrs

		let options = o(attrs.options)
		let {model, labelfn, onchange} = attrs

		if (!labelfn) labelfn = (obj: any) => obj.label || obj.text || obj

		//  We use a touched() function to avoid infinite loops since there
		//  is a circular logic here.
		let touched = () => {
			if (mod)
				return true
			mod = true
			requestAnimationFrame(() => { mod = false; });
			return false
		}

		this.observe(options, (opts) => {
			if (touched()) return;

			this.selected.set('' + opts.indexOf(model.get()));

		});

		this.observe(model, (v) => {
			if (touched()) return;

			this.selected.set(''+ options.get().indexOf(v));
		});

		this.observe(this.selected, (v) => {
			if (touched()) return;

			model.set(options.get()[parseInt(v)]);
		});

		////////////////////////////////

		let decorators = [bind(this.selected)];

		if (onchange) {
			decorators.push(node => node.addEventListener(
				'change',
				ev => onchange(model.get(), ev))
			)
		}

		return <label class='carbm-select-label'>
			<select class='carbm-select' $$={decorators}>
				{options.tf((opts) => {
					return opts.map((o, i) => <option
						value={i}
						selected={model.get() === o ? true : undefined}>{labelfn(o)}</option>);
				})}
			</select>
		</label>
	}

}

