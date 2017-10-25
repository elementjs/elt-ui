

import * as s from './styling'

export namespace CSS {

	export const flex = s.style('flex', {
		display: 'flex'
	})

	/**
	 * Use this if you want the element to take all available space on the
	 * flex parent regardless of its size. Useful in combination with overflow,
	 * so that the child will not push the parent's boundaries.
	 */
	export const absoluteGrow = s.style('absolute-grow', {
		flexGrow: 1,
		flexBasis: 0
	})

	export const grow = s.style('grow', {
		flexGrow: 1
	})

	export const row = s.style('flex-row', {flexDirection: 'row', display: 'flex'})
	export const rowReverse = s.style('flex-row-reverse', {flexDirection: 'row-reverse', display: 'flex'})
	export const column = s.style('flex-column', {flexDirection: 'column', display: 'flex'})
	export const columnReverse = s.style('flex-column-revrse', {flexDirection: 'column-reverse', display: 'flex'})

	export const wrap = s.style('wrap', {flexWrap: 'wrap'})
	export const wrapReverse = s.style('wrap-reverse', {flexWrap: 'wrap-reverse'})
	export const wrapUnset = s.style('wrap-unset', {flexWrap: 'unset'})

	export const justifyAround = s.style('justify-around', {justifyContent: 'space-around'})
	export const justifyBetween = s.style('justify-between', {justifyContent: 'space-between'})
	export const justifyEvenly = s.style('justify-evenly', {justifyContent: 'space-evenly'} as any) // experimental
	export const justifyStart = s.style('justify-start', {justifyContent: 'flex-start'})
	export const justifyEnd = s.style('justify-end', {justifyContent: 'flex-end'})
	export const justifyCenter = s.style('justify-center', {justifyContent: 'center'})

	export const alignContentStart = s.style('align-content-start', {alignContent: 'flex-start'})
	export const alignContentEnd = s.style('align-content-end', {alignContent: 'flex-end'})
	export const alignContentCenter = s.style('align-content-center', {alignContent: 'center'})
	export const alignContentStretch = s.style('align-content-stretch', {alignContent: 'stretch'})
	export const alignContentAround = s.style('align-content-baseline', {alignContent: 'space-around'})
	export const alignContentBetween = s.style('align-content-baseline', {alignContent: 'space-between'})

	export const alignStart = s.style('align-start', {alignItems: 'flex-start'})
	export const alignEnd = s.style('align-end', {alignItems: 'flex-end'})
	export const alignCenter = s.style('align-center', {alignItems: 'center'})
	export const alignBaseline = s.style('align-baseline', {alignItems: 'baseline'})
	export const alignStretch = s.style('align-stretch', {alignItems: 'stretch'})

	export const selfAlignStart = s.style('self-align-start', {alignSelf: 'flex-start'})
	export const selfAlignEnd = s.style('self-align-end', {alignSelf: 'flex-end'})
	export const selfAlignCenter = s.style('self-align-center', {alignSelf: 'center'})
	export const selfAlignBaseline = s.style('self-align-baseline', {alignSelf: 'baseline'})
	export const selfAlignStretch = s.style('self-align-stretch', {alignSelf: 'stretch'})
}

export default CSS