
//////////////////////////////////////////////////////////////
import {
	bind,
	Component,
	o,
	on,
	Repeat,
	Mixin,
	click
} from 'elt'

import S from './styling'
import { style } from 'osun'
import { Control, ControlBox } from './control'
import { $float, Float } from './float'

import FaCaretDown from 'elt-fa/caret-down'

export type LabelFn<T> = (opt: T) => E.JSX.Insertable
// export type ChangeFn<T> = (value: T, event: Event, atom: Atom) => any
export type ChangeFn<T> = (value: T, ev?: Event) => any


export interface SelectAttributes<T> extends E.JSX.Attrs {
	model: o.Observable<T>
	options: o.RO<T[]>
	labelfn: LabelFn<T>
	onchange?: ChangeFn<T>
}


export class Select<T> extends Component<SelectAttributes<T>> {

	protected selected: o.Observable<string> = o('-1')

	/**
	 * Setup the observation logic.
	 */
	render(children: E.JSX.Renderable[]) {
		let attrs = this.attrs

		let options = o(attrs.options)
		let {model, labelfn, onchange} = attrs
		const o_model = o(model)
		////////////////////////////////

		let decorators: Mixin[] = [bind(this.selected)];

		decorators.push($float(acc => <Float><ControlBox style={{width: `${select_container.clientWidth}px`}} class={S.box.background(S.BG).border(S.TINT14)} vertical>
			{Repeat(options, (opt, i) => <div
				class={[Control.css.control, S.box.border(S.TINT14), {[Select.css.selected]: o.virtual([o_model, opt], ([m, o]) => m === o)}]}
				$$={[click(() => acc(model.set(o.get(opt))))]}
				>
						{opt.tf(val => labelfn(val))}
				</div>
			)}
		</ControlBox></Float>))

		if (onchange) {
			var fn = onchange // used this for typing matters.
			decorators.push(on('change', ev => fn(o_model.get(), ev)))
		}

		const select_container = <div class={[Control.css.control, Select.css.select]} $$={decorators}>
			{model.tf(m => labelfn(m))}
			<span class={S.flex.absoluteGrow(1)}/>
			<FaCaretDown style={{color: S.TINT75}}/>

		</div>

		return select_container
	}

}

export namespace Select.css {

	export const select = style('select', S.box.cursorPointer.border(S.TINT14).flex.row.inline)

	export const select_options = style('select-options',
		S.box.positionAbsolute
	)

	export const selected = style('selected', S.box.background(S.TINT07))

	// rule`${select}:-moz-focusring`({
	// 	color: S.TRANSPARENT,
	// 	textShadow: `0 0 0 ${S.FG75}`
	// })

	export const label = style('label', {position: 'relative'})
}
