
import {Attrs, RO} from 'elt'
import { Css } from './styling'

export interface FlexAttrs extends Attrs {
	row?: RO<boolean>
	column?: RO<boolean>
}

export function Flex({row, column}: FlexAttrs, ch: DocumentFragment) {
	return <div class={[Flex.flex, {
		[Flex.row]: row,
		[Flex.column]: column
	}]}/>
}

export namespace Flex {

	export const flex = Css('flex', {
		display: 'flex'
	})

	/**
	 * Use this if you want the element to take all available space on the
	 * flex parent regardless of its size. Useful in combination with overflow,
	 * so that the child will not push the parent's boundaries.
	 */
	export const absolute_grow = Css('absolute-grow', {
		flexGrow: 1,
		flexBasis: 0
	})
	export const absolute_grow2 = Css('absolute-grow2', {
		flexGrow: 2,
		flexBasis: 0
	})
	export const absolute_grow3 = Css('absolute-grow3', {
		flexGrow: 3,
		flexBasis: 0
	})
	export const absolute_grow4 = Css('absolute-grow4', {
		flexGrow: 4,
		flexBasis: 0
	})

	export const grow = Css('grow', {flexGrow: 1})
	export const grow2 = Css('grow2', {flexGrow: 2})
	export const grow3 = Css('grow3', {flexGrow: 3})
	export const grow4 = Css('grow4', {flexGrow: 4})
	export const basis0 = Css('basis0', {flexBasis: 0})

	export const row = Css('flex-row', {flexDirection: 'row', display: 'flex'})
	export const row_reverse = Css('flex-row-reverse', {flexDirection: 'row-reverse', display: 'flex'})
	export const column = Css('flex-column', {flexDirection: 'column', display: 'flex'})
	export const column_reverse = Css('flex-column-revrse', {flexDirection: 'column-reverse', display: 'flex'})

	export const wrap = Css('wrap', {flexWrap: 'wrap'})
	export const wrap_reverse = Css('wrap-reverse', {flexWrap: 'wrap-reverse'})
	export const wrap_unset = Css('wrap-unset', {flexWrap: 'unset'})

	export const center = Css('flex-center', {
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	})

	export const justify_around = Css('justify-around', {justifyContent: 'space-around'})
	export const justify_between = Css('justify-between', {justifyContent: 'space-between'})
	export const justify_evenly = Css('justify-evenly', {justifyContent: 'space-evenly'} as any) // experimental
	export const justify_start = Css('justify-start', {justifyContent: 'flex-start'})
	export const justify_end = Css('justify-end', {justifyContent: 'flex-end'})
	export const justify_center = Css('justify-center', {justifyContent: 'center'})

	export const align_content_start = Css('align-content-start', {alignContent: 'flex-start'})
	export const align_content_end = Css('align-content-end', {alignContent: 'flex-end'})
	export const align_content_center = Css('align-content-center', {alignContent: 'center'})
	export const align_content_stretch = Css('align-content-stretch', {alignContent: 'stretch'})
	export const align_content_around = Css('align-content-baseline', {alignContent: 'space-around'})
	export const align_content_between = Css('align-content-baseline', {alignContent: 'space-between'})

	export const align_start = Css('align-start', {alignItems: 'flex-start'})
	export const align_end = Css('align-end', {alignItems: 'flex-end'})
	export const align_center = Css('align-center', {alignItems: 'center'})
	export const align_baseline = Css('align-baseline', {alignItems: 'baseline'})
	export const align_stretch = Css('align-stretch', {alignItems: 'stretch'})

	export const self_align_start = Css('self-align-start', {alignSelf: 'flex-start'})
	export const self_align_end = Css('self-align-end', {alignSelf: 'flex-end'})
	export const self_align_center = Css('self-align-center', {alignSelf: 'center'})
	export const self_align_baseline = Css('self-align-baseline', {alignSelf: 'baseline'})
	export const self_align_stretch = Css('self-align-stretch', {alignSelf: 'stretch'})

	export const spaced_inside8 = Css('spaced_inside8', {
		marginBottom: `-8px`,
		marginLeft: `-8px`
	})

	Css.all.childOf(spaced_inside8, {
		marginBottom: '8px',
		marginLeft: '8px'
	})

	export const spaced_inside16 = Css('spaced_inside16', {
		marginBottom: `-16px`,
		marginLeft: `-16px`
	})

	Css.all.childOf(spaced_inside16, {
		marginBottom: '16px',
		marginLeft: '16px'
	})

	export const spaced_inside24 = Css('spaced_inside24', {
		marginBottom: `-24px`,
		marginLeft: `-24px`
	})

	Css.all.childOf(spaced_inside24, {
		marginBottom: '24px',
		marginLeft: '24px'
	})

	Css.s(spaced_inside8).or(spaced_inside16).or(spaced_inside24).append(':empty', {
		marginBottom: 0,
		marginLeft: 0
	})
}

export function Row(attrs: Attrs, ch: DocumentFragment) {
	return <div class={Flex.row}>{ch}</div>
}

export function Column(attrs: Attrs, ch: DocumentFragment) {
	return <div class={Flex.column}>{ch}</div>
}
