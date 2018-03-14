
import {Attrs} from 'elt'
import {css as flex} from './flex'
import {cls, s} from 'osun'

import {css as base} from './styling'

export namespace css {
	export const frame = cls('card-frame',
		base.raised,
		{
			borderRadius: '2px',
			backgroundColor: base.colors.BG,
		},

	)

	s`h3`.childOf(frame, {
		fontSize: '16px',
		padding: '16px',
		margin: 0,
		textAlign: 'center',
		backgroundColor: base.colors.PRIMARY,
		color: 'white'
	})
}

export function Card(a: Attrs, children: DocumentFragment): Element {
	var {$$children, class: kls, ...attrs} = a
	return <div class={[css.frame, flex.column]} {...attrs}>{children}</div>
}
