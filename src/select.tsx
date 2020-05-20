
//////////////////////////////////////////////////////////////
import {
	Component,
	o,
	Repeat,
	Mixin,
	$click,
	Decorator,
	$style,
	$class,
	Renderable,
	Attrs,
	$scrollable,
} from 'elt'

import S from './styling'
import { style } from 'osun'
import { Control, ControlBox } from './control'
import { $float, Float } from './float'
import { I } from './icon'

export type LabelFn<T> = (opt: T) => Renderable
// export type ChangeFn<T> = (value: T, event: Event, atom: Atom) => any


export interface SelectAttributes<T> extends Attrs<HTMLDivElement> {
	model: o.Observable<T>
	options: o.RO<T[]>
	labelfn: (opt: T) => Renderable
	onchange?: (val: T) => void
	disabled?: o.RO<boolean>
}


export class Select<T> extends Component<SelectAttributes<T>> {

	/**
	 * Setup the observation logic.
	 */
	render(children: Renderable[]) {
		let attrs = this.attrs

		let options = o(attrs.options)
		let {model, labelfn, onchange} = attrs
		const o_model = o(model)
		////////////////////////////////

		let $decorators: (Mixin<HTMLDivElement> | Decorator<HTMLDivElement>)[] = [];

		$decorators.push($float(acc =>
			<Float class={Control.css.control_border}><ControlBox vertical style={{maxHeight: '50vh'}}>
				{$scrollable}
				{$style({width: `${select_container.clientWidth}px`})}
				{$class(S.box.background(S.BG).border(S.TINT14))}
				{Repeat(options, (opt, i) => <div
						class={[Control.css.control, {[Select.css.selected]: o.combine(o.tuple(o_model, opt), ([m, o]) => m === o)}]}
					>
						{$click(() => {
							var val = o.get(opt)
							acc(model.set(val))
							if (onchange) onchange(val)
						})}
						{opt.tf(val => labelfn(val))}
					</div>
				)}
		</ControlBox></Float> as HTMLDivElement))

		const select_container = <div class={[Control.css.control, Select.css.select]}>
			{$decorators}
			{model.tf(m => labelfn(m))}
			<span class={S.flex.absoluteGrow(1)}/>
			<I style={{color: S.TINT75, marginLeft: '8px'}} name='caret-down'/>

		</div> as HTMLDivElement

		return select_container
	}

}

export namespace Select.css {

	export const select = style('select', S.box.cursorPointer.border(S.TINT14).flex.row.inline.alignBaseline)

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
