
import {
	BasicAttributes,
	click,
	Component,
	d,
	Display,
	getDocumentFragment,
	getChildren,
	o,
	O,
	onmount,
	onfirstmount,
	onunmount,
	Observable,
	Observe,
	NodeCreatorFn,
	VirtualHolder
} from 'domic'

import {inkable} from './ink'

import {
	Row,
	Column,
	FlexAttributes
} from './flex'


export class TabContainer extends Component {

	attrs: FlexAttributes
	o_content: Observable<Node> = o(null)
	o_active_tab: Observable<Tab> = o(null)

	render(children: DocumentFragment): Node {

		return <Column {...this.attrs}>
			<Row justify='center' class='dm-tab-bar'>{children}</Row>
			<Column absoluteGrow='1' class='dm-tab-content'>
				{Observe(this.o_content)}
			</Column>
		</Column>

	}

}


export interface TabAttributes extends BasicAttributes {
	title: O<string>,
	// render: NodeCreatorFn
}


export class TabContents extends VirtualHolder {
	name = 'tab contents'
}

/**
 * FIXME missing is_active logic, since I don't know how to dynamically
 * watch the parent container observable.
 */
export class Tab extends Component {

	attrs: TabAttributes

	container: TabContainer
	o_is_active = o(false)
	children: Node[] = []

	@onfirstmount
	linkToTabs(node: Node) {
		this.container = TabContainer.get(node)

		if (!this.container)
			throw new Error('Tab must be inside a TabContainer')

		// This this tab as the active one if no tab is being displayed
		if (this.container.o_active_tab.get() == null)
			this.activate()

		this.observe(this.container.o_active_tab, tab => {
			this.o_is_active.set(tab === this)
		})
		// ...............
		this.onmount[this.onmount.length - 1]()
	}

	activate() {
		if (this.container.o_active_tab.get() === this) return

		this.container.o_active_tab.set(this)
		requestAnimationFrame(() => {
			this.container.o_content.set(getDocumentFragment(this.children))
		})
	}

	render(children: DocumentFragment): Node {

		this.children = getChildren(children)

		return <div
			class={['dm-tab-title', {active: this.o_is_active}]}
			$$={[
				click(ev => this.activate()),
				inkable
		]}>
			{this.attrs.title}
		</div>

	}
}


