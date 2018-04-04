
import {Attrs} from 'elt'
import { Flex } from './flex'
import { Styling } from './styling'
import { cls, s } from 'osun'

export function Card(a: Attrs, children: DocumentFragment): Element {
	var {$$children, class: kls, ...attrs} = a
	return <div class={[Card.frame, Flex.column]} {...attrs}>{children}</div>
}

export namespace Card {
	export const frame = cls('card-frame',
		Styling.raised,
		{
			borderRadius: '2px',
			backgroundColor: Styling.colors.BG,
		},

	)

	s`h3`.childOf(frame, {
		fontSize: '16px',
		padding: '16px',
		margin: 0,
		textAlign: 'center',
		backgroundColor: Styling.colors.PRIMARY,
		color: 'white'
	})
}
