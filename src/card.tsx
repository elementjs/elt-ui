
import {Attrs} from 'elt'
import {Column} from './flex'

import * as css from './card.styl'

export function Card(a: Attrs, children: DocumentFragment): Element {
	var {$$children, class: kls, ...attrs} = a
	return <Column class={css.frame} {...attrs}>{children}</Column>
}
