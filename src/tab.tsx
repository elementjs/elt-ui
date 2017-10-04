
import {
	Attrs,
	click,
	Component,
	Repeat,
	o,
	MaybeObservable,
	Observable
} from 'domic'

import {inkable} from './ink'

import {
	Row,
	Column,
	FlexAttributes
} from './flex'


export class TabContainer extends Component {

	attrs: FlexAttributes
	o_content: Observable<Node|null> = o(null)
	o_active_tab: Observable<Tab|null> = o(null)
	o_titles: Observable<Node[]> = o([])

	render(children: DocumentFragment): Element {
		var {$$children, ...attrs} = this.attrs
		return <Column {...attrs}>
			<Row justify='center' class='dm-tab-bar'>{Repeat(this.o_titles, o_t => o_t.get())}</Row>
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
			class={['dm-tab-title', {active: this.o_is_active}]}
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
			class='dm-tab-content'
			style={ {display: this.o_is_active.tf(act => act ? 'flex' : 'none')} }>
			{children}
		</Column>

	}
}


