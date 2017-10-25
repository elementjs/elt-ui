
import {Attrs} from 'elt'

import * as s from './styling'


export namespace CSS {

	export const flex = s.style('flex', {
		display: 'flex'
	})

	export const absoluteGrow = s.style('absolute-grow', {
		flexGrow: 1,
		flexBasis: 0
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

	export const alignItemsStart = s.style('align-start', {alignItems: 'flex-start'})
	export const alignItemsEnd = s.style('align-end', {alignItems: 'flex-end'})
	export const alignItemsCenter = s.style('align-center', {alignItems: 'center'})
	export const alignItemsBaseline = s.style('align-baseline', {alignItems: 'baseline'})
	export const alignItemsStretch = s.style('align-stretch', {alignItems: 'stretch'})

}


export function Row(at: Attrs, ch: DocumentFragment): Element {
	return <div class={CSS.row}>{ch}</div>
}

export function Column(at: Attrs, ch: DocumentFragment): Element {
	return <div class={CSS.column}>{ch}</div>
}
