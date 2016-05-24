
import {c, o, Atom, BasicAttributes, Appendable} from 'carbyne'

import './card.styl'

export function Content(attrs: BasicAttributes, children: Appendable): Atom {
	return c('.carbm-card-content', attrs, children)
}

export function Card(attrs: BasicAttributes, children: Appendable): Atom {
	return c('.carbm-card-frame', attrs, children)
}
