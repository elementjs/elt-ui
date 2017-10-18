
import {Attrs} from 'elt'
import {Column} from './flex'

import {style} from 'typestyle'

export namespace CSS {
	export const frame = style({
		borderRadius: '2px',
		boxShadow: `0 1px 2px 1px rgba(0, 0, 0, 0.34)`,
		backgroundColor: 'white',

		$nest: {
			[`& > h3`]: {
				fontSize: '16px',
				padding: '16px',
				margin: 0,
				textAlign: 'center',
				backgroundColor: `var(--em-color-primary)`,
				color: 'white'
			}
		}
	})
}

export function Card(a: Attrs, children: DocumentFragment): Element {
	var {$$children, class: kls, ...attrs} = a
	return <Column class={CSS.frame} {...attrs}>{children}</Column>
}
