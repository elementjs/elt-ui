
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
import { theme as T } from './colors'
import { style } from 'osun'
import { Control, ControlBox } from './control'
import { $float, Float } from './float'
import { SvgSelectThingy } from './svg'
import { $inkable } from './ink'
import { animate } from './animate'

export type LabelFn<T> = (opt: T) => Renderable


function zwnj(val: any) {
	if (!!val && val != '')
		return val
	return '\u200c'
}

export interface SelectAttributes<T> extends Attrs<HTMLDivElement> {
	model: o.Observable<T>
	options: o.RO<Iterable<T>>
	prelabelfn?: (opt: o.ReadonlyObservable<T>) => Renderable
	labelfn: (opt: T) => Renderable
	postlabelfn?: (opt: o.ReadonlyObservable<T>) => Renderable
	onchange?: (val: T) => void
	disabled?: o.RO<boolean>
}


export function Select<T>(attrs: Attrs<HTMLDivElement> & SelectAttributes<T>, children: Renderable[]) {

	let options = o(attrs.options)
	let {model, labelfn, onchange} = attrs
	const o_model = o(model)
	const o_opts = o.tf(options, opts => Array.isArray(opts) ? opts:  [...opts])
	////////////////////////////////

	const o_active = o(false)
	let $decorators: Decorator<HTMLDivElement>[] = [];

	$decorators.push($float<void, HTMLElement>(acc =>
		<Float class={Control.css.control_border}><ControlBox
			class={S.box.background(T.bg).border(T.tint14)}
			style={{width: `${select_container.clientWidth}px`, maxHeight: '50vh'}}
			vertical
		>
			{$inserted(() => o_active.set(true))}
			{$removed(() => o_active.set(false))}
			{$scrollable}
			{Repeat(o_opts, (opt, i) => <div
					class={[Control.css.control, {[Select.css.selected]: o.combine(o.tuple(o_model, opt), ([m, o]) => m === o)}]}
				>
					{$click(() => {
						var val = o.get(opt)
						model.set(val)
						setTimeout(acc, animate.ANIM_DURATION * 0.25)
						if (onchange) onchange(val)
					})}
					{$inkable}
					{o.tf(opt, val => zwnj(labelfn(val)))}
				</div>
			)}
	</ControlBox></Float> as HTMLDivElement))

	const select_container = <div class={[Control.css.control, Select.css.select, {[Control.css.active]: o_active}]}>
		{$decorators}
		{attrs.prelabelfn?.(model)}
		{model.tf(m => zwnj(labelfn(m)))}
		{attrs.postlabelfn?.(model)}
		<span class={S.flex.absoluteGrow(1)}/>
		<SvgSelectThingy style={{height: '1em'}} />

	</div> as HTMLDivElement

	return select_container
}

export namespace Select.css {

	export const select = style('select', S.box.cursorPointer.border(T.tint14).flex.row.inline.alignCenter)
	export const select_thingy = style('thingy', { color: T.tint50 })

	export const selected = style('selected', S.box.background(T.tint07))

	// rule`${select}:-moz-focusring`({
	// 	color: S.TRANSPARENT,
	// 	textShadow: `0 0 0 ${T.fg75}`
	// })

	export const label = style('label', {position: 'relative'})
}
