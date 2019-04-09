
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

		this.observe(options, (opts) => {
			if (touched()) return;

			this.selected.set('' + opts.indexOf(o_model.get()));

		});

		this.observe(model, (v) => {
			if (touched()) return;

			this.selected.set(''+ options.get().indexOf(v));
		});

		this.observe(this.selected, (v) => {
			if (touched()) return;
			o_model.set(options.get()[parseInt(v)]);
		});

		////////////////////////////////

		let decorators: Mixin[] = [bind(this.selected)];

		if (onchange) {
			var fn = onchange // used this for typing matters.
			decorators.push(on('change', ev => fn(o_model.get(), ev)))
		}

		return <label class={Select.cls_label}>
			<select class={Select.cls_select} $$={decorators}>
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

import S from './styling'
import { cls, s } from 'osun'

export namespace Select {

	export const cls_select = cls('select',
		S.no_spurious_borders,
		S.no_native_appearance,
		{
			padding: '0 16px 0 8px',
			height: '32px',
			margin: 0,
			border: `1px solid ${S.FG07}`,
			borderColor: S.FG07,
			borderRadius: '2px',
			background: S.BG,
			color: S.FG75,
			display: 'inline-block',
			cursor: 'pointer'
		},
	)

	s(cls_select).append(`:-moz-focusring`).define({
		color: S.TRANSPARENT,
		textShadow: `0 0 0 ${S.FG75}`
	})

	export const cls_label = cls('label', {position: 'relative'})
}
