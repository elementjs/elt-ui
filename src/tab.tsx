
import {
	BasicAttributes,
	click,
	Component,
	d,
	Display,
	o,
	O,
	onmount,
	onunmount,
	Observable,
	NodeCreatorFn,
} from 'domic'

import {inkable} from './ink'

import {
	Row,
	Column,
	FlexAttributes
} from './flex'


export class TabContainer extends Component {

	attrs: FlexAttributes
	o_render: Observable<NodeCreatorFn> = o(null)

	render(children: DocumentFragment): Node {

		return <Column {...this.attrs}>
			<Row justify='center' class='dm-tab-bar'>{children}</Row>
			<Column absoluteGrow='1' class='dm-tab-content'>
				{Display(this.o_render)}
			</Column>
		</Column>

	}

}


export interface TabAttributes extends BasicAttributes {
	title: O<string>,
	render: NodeCreatorFn
}


/**
 * FIXME missing is_active logic, since I don't know how to dynamically
 * watch the parent container observable.
 */
export class Tab extends Component {

	attrs: TabAttributes
	container: TabContainer

	o_is_active = o(false)

	activate() {
		this.container.o_render.set(this.attrs.render)
	}

	@onmount
	linkToTabs(node: Node) {
		this.container = TabContainer.get(node)

		if (!this.container)
			throw new Error('Tab must be inside a TabContainer')

		// This this tab as the active one if no tab is being displayed
		if (this.container.o_render.get() == null)
			this.container.o_render.set(this.attrs.render)

	}

	render(children: DocumentFragment): Node {

		// const tc = new TabController(this.attrs.render)

		return <div
			class={['dm-tab-title', {active: this.o_is_active}]}
			$$={[
				click(ev => this.container.o_render.set(this.attrs.render)),
				inkable
		]}>
			{this.attrs.title}
		</div>

	}
}


