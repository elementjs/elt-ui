
import { Attrs, RO } from 'elt'
import { cls, all, s } from 'osun'

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

	export const flex = cls('flex', {
		display: 'flex'
	})

	/**
	 * Use this if you want the element to take all available space on the
	 * flex parent regardless of its size. Useful in combination with overflow,
	 * so that the child will not push the parent's boundaries.
	 */
	export const absolute_grow = cls('absolute-grow', {
		flexGrow: 1,
		flexBasis: 0
	})
	export const absolute_grow2 = cls('absolute-grow2', {
		flexGrow: 2,
		flexBasis: 0
	})
	export const absolute_grow3 = cls('absolute-grow3', {
		flexGrow: 3,
		flexBasis: 0
	})
	export const absolute_grow4 = cls('absolute-grow4', {
		flexGrow: 4,
		flexBasis: 0
	})

	export const grow = cls('grow', {flexGrow: 1})
	export const grow2 = cls('grow2', {flexGrow: 2})
	export const grow3 = cls('grow3', {flexGrow: 3})
	export const grow4 = cls('grow4', {flexGrow: 4})
	export const basis0 = cls('basis0', {flexBasis: 0})

	export const row = cls('flex-row', {flexDirection: 'row', display: 'flex'})
	export const row_reverse = cls('flex-row-reverse', {flexDirection: 'row-reverse', display: 'flex'})
	export const column = cls('flex-column', {flexDirection: 'column', display: 'flex'})
	export const column_reverse = cls('flex-column-revrse', {flexDirection: 'column-reverse', display: 'flex'})

	export const wrap = cls('wrap', {flexWrap: 'wrap'})
	export const wrap_reverse = cls('wrap-reverse', {flexWrap: 'wrap-reverse'})
	export const wrap_unset = cls('wrap-unset', {flexWrap: 'unset'})

	export const center = cls('flex-center', {
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	})

	export const justify_around = cls('justify-around', {justifyContent: 'space-around'})
	export const justify_between = cls('justify-between', {justifyContent: 'space-between'})
	export const justify_evenly = cls('justify-evenly', {justifyContent: 'space-evenly'} as any) // experimental
	export const justify_start = cls('justify-start', {justifyContent: 'flex-start'})
	export const justify_end = cls('justify-end', {justifyContent: 'flex-end'})
	export const justify_center = cls('justify-center', {justifyContent: 'center'})

	export const align_content_start = cls('align-content-start', {alignContent: 'flex-start'})
	export const align_content_end = cls('align-content-end', {alignContent: 'flex-end'})
	export const align_content_center = cls('align-content-center', {alignContent: 'center'})
	export const align_content_stretch = cls('align-content-stretch', {alignContent: 'stretch'})
	export const align_content_around = cls('align-content-baseline', {alignContent: 'space-around'})
	export const align_content_between = cls('align-content-baseline', {alignContent: 'space-between'})

	export const align_start = cls('align-start', {alignItems: 'flex-start'})
	export const align_end = cls('align-end', {alignItems: 'flex-end'})
	export const align_center = cls('align-center', {alignItems: 'center'})
	export const align_baseline = cls('align-baseline', {alignItems: 'baseline'})
	export const align_stretch = cls('align-stretch', {alignItems: 'stretch'})

	export const self_align_start = cls('self-align-start', {alignSelf: 'flex-start'})
	export const self_align_end = cls('self-align-end', {alignSelf: 'flex-end'})
	export const self_align_center = cls('self-align-center', {alignSelf: 'center'})
	export const self_align_baseline = cls('self-align-baseline', {alignSelf: 'baseline'})
	export const self_align_stretch = cls('self-align-stretch', {alignSelf: 'stretch'})

	export const spaced_inside8 = cls('spaced_inside8', {
		marginBottom: `-8px`,
		marginLeft: `-8px`
	})

	all.childOf(spaced_inside8, {
		marginBottom: '8px',
		marginLeft: '8px'
	})

	export const spaced_inside16 = cls('spaced_inside16', {
		marginBottom: `-16px`,
		marginLeft: `-16px`
	})

	all.childOf(spaced_inside16, {
		marginBottom: '16px',
		marginLeft: '16px'
	})

	export const spaced_inside24 = cls('spaced_inside24', {
		marginBottom: `-24px`,
		marginLeft: `-24px`
	})

	all.childOf(spaced_inside24, {
		marginBottom: '24px',
		marginLeft: '24px'
	})

	s(spaced_inside8).or(spaced_inside16).or(spaced_inside24).append(':empty', {
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
