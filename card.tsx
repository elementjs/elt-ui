
import {Attrs} from 'elt'
import {Column} from './flex'


import * as s from './styling'

export namespace CSS {
	export const frame = s.style('card-frame',
		s.values.BoxShadow,
		{
			borderRadius: '2px',
			backgroundColor: s.colors.Bg,
		},
		s.child('h3', {
			fontSize: '16px',
			padding: '16px',
			margin: 0,
			textAlign: 'center',
			backgroundColor: s.colors.Primary,
			color: 'white'
		})
	)
}

export function Card(a: Attrs, children: DocumentFragment): Element {
	var {$$children, class: kls, ...attrs} = a
	return <Column class={CSS.frame} {...attrs}>{children}</Column>
}
