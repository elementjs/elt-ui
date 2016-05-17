
import {c, o} from 'carbyne'

import './card.styl'

export function Content(attrs, children) {
	return c('.carbm-card-content', attrs, children)
}

export function Card(attrs, children) {
	return c('.carbm-card-frame', attrs, children)
}
