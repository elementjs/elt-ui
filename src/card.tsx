
import {BasicAttributes} from 'domic'
import {Column} from './flex'


export function Card(a: BasicAttributes, children: DocumentFragment): HTMLElement {
	var {$$children, ...attrs} = a
	return <Column class='dm-card-frame' {...attrs}>{children}</Column>
}
