
import {d, BasicAttributes} from 'domic'
import {Column} from './flex'

import './card.styl'

export function Card(attrs: BasicAttributes, children: DocumentFragment): Node {
	return <Column class='carbm-card-frame' {...attrs}>{children}</Column>
}
