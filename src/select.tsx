
//////////////////////////////////////////////////////////////
import {
	o,
	Repeat,
	$click,
	Decorator,
	Renderable,
	Attrs,
	$scrollable,
	$inserted,
	$removed,
	e
} from 'elt'

import S from './styling'
import { style } from 'osun'
import { Control, ControlBox } from './control'
import { $float, Float } from './float'
import { SvgSelectThingy } from './svg'
import { $inkable } from './ink'
import { animate } from './animate'

export type LabelFn<T> = (opt: T) => Renderable


export interface SelectAttributes<T> extends Attrs<HTMLDivElement> {
	model: o.Observable<T>
	options: o.RO<T[]>
	labelfn: (opt: T) => Renderable
	onchange?: (val: T) => void
	disabled?: o.RO<boolean>
}


export function Select<T>(attrs: Attrs<HTMLDivElement> & SelectAttributes<T>, children: Renderable[]) {

	let options = o(attrs.options)
	let {model, labelfn, onchange} = attrs
	const o_model = o(model)
	////////////////////////////////

	const o_active = o(false)
	let $decorators: Decorator<HTMLDivElement>[] = [];

	$decorators.push($float<void, HTMLElement>(acc =>
		<Float class={Control.css.control_border}><ControlBox
			class={S.box.background(S.BG).border(S.TINT14)}
			style={{width: `${select_container.clientWidth}px`, maxHeight: '50vh'}}
			vertical
		>
			{$inserted(() => o_active.set(true))}
			{$removed(() => o_active.set(false))}
			{$scrollable}
			{Repeat(options, (opt, i) => <div
					class={[Control.css.control, {[Select.css.selected]: o.combine(o.tuple(o_model, opt), ([m, o]) => m === o)}]}
				>
					{$click(() => {
						var val = o.get(opt)
						model.set(val)
						setTimeout(acc, animate.ANIM_DURATION * 0.25)
						if (onchange) onchange(val)
					})}
					{$inkable}
					{opt.tf(val => labelfn(val))}
				</div>
			)}
	</ControlBox></Float> as HTMLDivElement))

	const select_container = <div class={[Control.css.control, Select.css.select, {[Control.css.active]: o_active}]}>
		{$decorators}
		{model.tf(m => labelfn(m))}
		<span class={S.flex.absoluteGrow(1)}/>
		<SvgSelectThingy style={{height: '1em'}} />

	</div> as HTMLDivElement

	return select_container
}

export namespace Select.css {

	export const select = style('select', S.box.cursorPointer.border(S.TINT14).flex.row.inline.alignCenter)
	export const select_thingy = style('thingy', { color: S.TINT50 })

	export const selected = style('selected', S.box.background(S.TINT07))

	// rule`${select}:-moz-focusring`({
	// 	color: S.TRANSPARENT,
	// 	textShadow: `0 0 0 ${S.FG75}`
	// })

	export const label = style('label', {position: 'relative'})
}
