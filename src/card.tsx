
import {d, BasicAttributes} from 'domic'
import {Column} from './flex'


export function Card(attrs: BasicAttributes, children: DocumentFragment): Node {
	return <Column class='dm-card-frame' {...attrs}>{children}</Column>
}
