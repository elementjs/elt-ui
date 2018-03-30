
import {Attrs} from 'elt'
import {Flex} from './flex'
import {Css} from './styling'

export function Card(a: Attrs, children: DocumentFragment): Element {
	var {$$children, class: kls, ...attrs} = a
	return <div class={[Card.frame, Flex.column]} {...attrs}>{children}</div>
}

export namespace Card {
	export const frame = Css('card-frame',
		Css.raised,
		{
			borderRadius: '2px',
			backgroundColor: Css.colors.BG,
		},

	)

	Css.s`h3`.childOf(frame, {
		fontSize: '16px',
		padding: '16px',
		margin: 0,
		textAlign: 'center',
		backgroundColor: Css.colors.PRIMARY,
		color: 'white'
	})
}
