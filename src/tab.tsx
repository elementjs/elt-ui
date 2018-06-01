
import {
	Attrs,
	click,
	Component,
	Repeat,
	o,
	Observable,
	Insertable,
	Fragment as F
} from 'elt'

import { inkable } from './ink'

import { Flex } from './flex'
import { Styling } from './styling'
import { cls } from 'osun'


export class TabContainer extends Component {

	o_content: Observable<Node|null> = o(null as Node | null)
	o_active_tab = o(null as Tab | null)
	o_titles = o([] as Node[])

	render(children: DocumentFragment): Element {
		return <div class={Flex.column}>
			<div class={[TabContainer.bar, Flex.row, Flex.justify_center]}>{Repeat(this.o_titles, o_t => o_t.get())}</div>
			{children}
		</div>

	}

}

export namespace TabContainer {
	export const bar = cls('bar', {
		backgroundColor: Styling.colors.BG,
		borderBottom: `1px solid rgba(0, 0, 0, 0.14)`,
		height: '48px'
	})
}


export interface TabAttributes extends Attrs {
	title: Insertable,
}


/**
 * FIXME missing is_active logic, since I don't know how to dynamically
 * watch the parent container observable.
 */
export class Tab extends Component<TabAttributes> {

	container: TabContainer | null = null
	children: Node[] = []
	o_is_active = o(false)

	inserted(node: Element) {
		if (this.container) return

		this.container = TabContainer.get(node)

		if (!this.container)
			throw new Error('Tab must be inside a TabContainer')

		this.container.o_titles.push(<div
			class={Tab.title}
			$$={[
				click(ev => this.activate()),
				inkable()
			]}>
			<div class={[Tab.secondborder, {[Tab.active]: this.o_is_active}]}>&nbsp;</div>
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

		const frag = <F>{children}</F>

		return <div
			class={[
				Tab.content,
				this.o_is_active.tf(act => act ? Flex.column : Styling.display_none),
				Flex.absolute_grow
			]}
		>
			{this.o_is_active.tf(a => a ? frag : null)}
		</div>

	}
}


export namespace Tab {

	export const title = cls('title', {
		color: Styling.colors.PRIMARY,
		userSelect: 'none',
		textTransform: 'uppercase',
		textAlign: 'center',
		fontWeight: 'bold',
		borderBottom: `1px solid ${Styling.colors.PRIMARY}`,
		height: '48px',
		lineHeight: '48px',
		fontSize: '14px',
		maxWidth: '264px',
		minWidth: '160px',
		cursor: 'pointer',
		transition: `border-bottom-color linear 0.2s`,
		position: 'relative'
	})

	export const secondborder = cls('second-border', {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: 'calc(100% - 1px)',
		transition: 'transform 0.2s linear',
		transform: 'scaleX(0)',
		borderBottom: `1px solid ${Styling.colors.PRIMARY}`,
	})

	export const active = cls('active', {
		transform: 'scaleX(1)'
	})

	export const content = cls('content', {backgroundColor: Styling.colors.BG})

}
