
//////////////////////////////////////////////////////////////
import {
	Attrs,
	bind,
	Component,
	o,
	on,
	Renderable,
	Repeat,
	Mixin
} from 'elt'


export type LabelFn<T> = (opt: T) => o.RO<Renderable>
// export type ChangeFn<T> = (value: T, event: Event, atom: Atom) => any
export type ChangeFn<T> = (value: T, ev?: Event) => any


export interface SelectAttributes<T> extends Attrs {
	model: o.O<T>
	options: o.RO<T[]>
	labelfn: LabelFn<T>
	onchange?: ChangeFn<T>
	placeholder?: o.RO<string>
}

export class Select<T> extends Component<SelectAttributes<T>> {

	protected selected: o.Observable<string> = o('-1')

	/**
	 * Setup the observation logic.
	 */
	render(children: DocumentFragment): Element {
		let mod = false;

		let attrs = this.attrs

		let options = o(attrs.options)
		let {model, labelfn, onchange} = attrs
		const o_model = o(model)

		//  We use a touched() function to avoid infinite loops since there
		//  is a circular logic here.
		let touched = () => {
			if (mod)
				return true
			mod = true
			requestAnimationFrame(() => { mod = false; });
			return false
		}

		this.observers.observe(options, (opts) => {
			if (touched()) return;

			this.selected.set('' + opts.indexOf(o_model.get()));

		});

		this.observers.observe(model, (v) => {
			if (touched()) return;

			this.selected.set(''+ options.get().indexOf(v));
		});

		this.observers.observe(this.selected, (v) => {
			if (touched()) return;
			o_model.set(options.get()[parseInt(v)]);
		});

		////////////////////////////////

		let decorators: Mixin[] = [bind(this.selected)];

		if (onchange) {
			var fn = onchange // used this for typing matters.
			decorators.push(on('change', ev => fn(o_model.get(), ev)))
		}

		return <label class={Select.label}>
			<select class={Select.select} $$={decorators}>
				{Repeat(options, (opt, i) => <option
						value={i}
						selected={o_model.equals(opt)}>
							{opt.tf(val => <>{labelfn(val)}</>)}
					</option>
				)}
			</select>
		</label>
	}

}

import { Styling } from './styling'
import { cls, s } from 'osun'

export namespace Select {

	export const select = cls('select',
		Styling.no_spurious_borders,
		Styling.no_native_appearance,
		{
			padding: '0 16px 0 8px',
			height: '32px',
			margin: 0,
			border: `1px solid ${Styling.colors.FG5}`,
			borderColor: Styling.colors.FG5,
			borderRadius: '2px',
			background: Styling.colors.BG,
			color: Styling.colors.FG3,
			display: 'inline-block',
			cursor: 'pointer'
		},
	)

	s(select).append(`:-moz-focusring`).define({
		color: Styling.colors.TRANSPARENT,
		textShadow: `0 0 0 ${Styling.colors.FG3}`
	})

	export const label = cls('label', {position: 'relative'})

	s(label).append('::after').define({
		content: "'\\f2f2'",
		fontFamily: '"Material-Design-Iconic-Font", monospace',
		color: Styling.colors.FG3,
		right: '8px',
		top: '9px',
		padding: '0 0 2px',
		position: 'absolute',
		pointerEvents: 'none',
		verticalAlign: 'middle'
	})
}
