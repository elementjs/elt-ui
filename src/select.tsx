
//////////////////////////////////////////////////////////////
import {
	Attrs,
	bind,
	Component,
	o,
	on,
	Insertable,
	Repeat,
	Mixin
} from 'elt'


export type LabelFn<T> = (opt: T) => o.RO<Insertable>
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
		let attrs = this.attrs

		let options = o(attrs.options)
		let {model, labelfn, onchange} = attrs
		const o_model = o(model)

		var in_protection = false
		function protect(fn: () => void) {
			if (in_protection) return
			in_protection = true
			fn()
			in_protection = false
		}

		this.observe(options, (opts) => {
			protect(() => {
				this.selected.set('' + opts.indexOf(o_model.get()));
			})
		});

		this.observe(model, (v) => {
			protect(() => {
				this.selected.set(''+ options.get().indexOf(v));
			})
		});

		this.observe(this.selected, (v) => {
			protect(() => {
				o_model.set(options.get()[parseInt(v)]);
			})
		});

		////////////////////////////////

		let decorators: Mixin[] = [bind(this.selected)];

		if (onchange) {
			var fn = onchange // used this for typing matters.
			decorators.push(on('change', ev => fn(o_model.get(), ev)))
		}

		return <label class={Select.css.label}>
			<select class={Select.css.select} $$={decorators}>
				{Repeat(options, (opt, i) => <option
						value={i}
						selected={o.virtual([o_model, opt], ([m, o]) => m === o)}>
							{opt.tf(val => <>{labelfn(val)}</>)}
					</option>
				)}
			</select>
		</label>
	}

}

import S from './styling'
import { style, rule } from 'osun'

export namespace Select.css {

	export const select = style('select',
		S.box
			.noSpuriousBorders.noNativeAppearance
			.padding('0 16px 0 8px')
			.marginNone
			.height(32)
			.border(S.FG07)
			.background(S.BG)
			.borderRound
			.cursorPointer
			.inlineBlock
		,
			S.text.color(S.FG75)
	)

	rule`${select}:-moz-focusring`({
		color: S.TRANSPARENT,
		textShadow: `0 0 0 ${S.FG75}`
	})

	export const label = style('label', {position: 'relative'})
}
