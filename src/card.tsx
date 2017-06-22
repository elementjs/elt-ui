
import {BasicAttributes} from 'domic'
import {Column} from './flex'


export function Card(a: BasicAttributes, children: DocumentFragment): Element {
	var {$$children, ...attrs} = a
	return <Column class='dm-card-frame' {...attrs}>{children}</Column>
}
