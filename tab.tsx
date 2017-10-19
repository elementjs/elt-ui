
import {
	Attrs,
	click,
	Component,
	Repeat,
	o,
	MaybeObservable,
	Observable
} from 'elt'

import {inkable} from './ink'

import {
	Row,
	Column,
	FlexAttributes
} from './flex'

import * as s from './styling'

export namespace CSS {

	export const bar = s.style('bar', {
		backgroundColor: `var(--em-color-background)`,
		borderBottom: `1px solid rgba(0, 0, 0, 0.14)`,
		height: '48px'
	})

	export const active = s.style('active')

	export const title = s.style('title', {
		color: s.colors.Primary,
		userSelect: 'none',
		textTransform: 'uppercase',
		textAlign: 'center',
		fontWeight: 'bold',
		borderBottom: `1px solid ${s.colors.FgFaint}`,
		height: '48px',
		lineHeight: '48px',
		fontSize: '14px',
		maxWidth: '264px',
		minWidth: '160px',
		cursor: 'pointer',
		transition: `border-bottom-color linear 0.2s`,

		$nest: {[`&.${active}`]: {borderBottom: `2px solid var(--em-color-primary)`}}
	})

	export const content = s.style('content', {backgroundColor: s.colors.Bg})

}

export class TabContainer extends Component {

	attrs: FlexAttributes
	o_content: Observable<Node|null> = o(null)
	o_active_tab: Observable<Tab|null> = o(null)
	o_titles: Observable<Node[]> = o([])

	render(children: DocumentFragment): Element {
		var {$$children, ...attrs} = this.attrs
		return <Column {...attrs}>
			<Row justify='center' class={CSS.bar}>{Repeat(this.o_titles, o_t => o_t.get())}</Row>
			{children}
		</Column>

	}

}


export interface TabAttributes extends Attrs {
	title: MaybeObservable<string|number|Node>,
}


/**
 * FIXME missing is_active logic, since I don't know how to dynamically
 * watch the parent container observable.
 */
export class Tab extends Component {

	attrs: TabAttributes

	container: TabContainer|null
	children: Node[] = []
	o_is_active = o(false)

	inserted(node: Element) {
		if (this.container) return

		this.container = TabContainer.get(node)

		if (!this.container)
			throw new Error('Tab must be inside a TabContainer')

		this.container.o_titles.push(<div
			class={[CSS.title, {[CSS.active]: this.o_is_active}]}
			$$={[
				click(ev => this.activate()),
				inkable()
			]}>
			{this.attrs.title}
		</div>)

		this.observe(this.container.o_active_tab, tab => {
			this.o_is_active.set(tab === this)
		})

		// This this tab as the active one if no tab is being displayed
		if (this.container.o_active_tab.get() == null)
			this.activate()
	}

	activate() {
		if (!this.container) throw new Error('No container')
		if (this.container.o_active_tab.get() === this) return

		this.container.o_active_tab.set(this)
	}

	render(children: DocumentFragment): Element {

		return <Column
			absoluteGrow='1'
			class={CSS.content}
			style={ {display: this.o_is_active.tf(act => act ? 'flex' : 'none')} }>
			{children}
		</Column>

	}
}


