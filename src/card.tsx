
import {c, o, Atom, BasicAttributes, Appendable} from 'carbyne'
import {Column} from './flex'

import './card.styl'

export function Card(attrs: BasicAttributes, children: Appendable): Atom {
	return <Column class='carbm-card-frame' {...attrs}>{children}</Column>
}
