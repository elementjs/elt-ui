
import {c, o, Controller, Atom, click, ctrl, cls} from 'carbyne'
import './tab.styl'

export type TabOptions = {
	render : AtomBuilder,
	title : string,
	onactivate : () => any
};


export class TabsController extends Controller {

	constructor() {
		super();

		this._tab_count = 0
		this._registered_tabs = {}
		this._o_render = o(null)
	}

	onDestroy() {
		this._registered_tabs = null
	}

	register(id, o_is_active, render, onactivate) {

		this._registered_tabs[id] = {
			o_is_active: o_is_active,
			render: render,
			onactivate: onactivate
		}

		if (this._tab_count === 0)
			this.activate(id)
		this._tab_count++
	}

	activate(id) {
		const tabs = this._registered_tabs
		id = id.toString()

		for (let own_id in tabs) {
			let tab = tabs[own_id]
			tab.o_is_active.set(own_id === id)
		}

		this._o_render.set(tabs[id].render)
		tabs[id].onactivate && tabs[id].onactivate()

	}

}

let tab_id = 0;

/**
 * Children are ignored
 */
export function Tab(attrs : TabOptions, children : AtomChildren) : Atom {

	const o_is_active = o(false)
	const own_id = tab_id++
	let tc : TabsController = null

	return <div class='carbm-tab-title' $$={[
		click(ev => tc.activate(own_id)),
		cls({active: o_is_active})
	]}>
		{attrs.title}
	</div>.on('mount', ev => {
		tc = ev.target.getController(TabsController)
		if (!tc) throw new Error('must be inside a TabContainer')
		tc.register(own_id, o_is_active, attrs.render, attrs.onactivate)
	})

}


/**
 *
 */
export function TabContainer(attrs, children : AtomChildren) : Atom {

	const tc = new TabsController()
	const tabs = children.filter(atom => atom.builder === Tab)
	const content = children.filter(atom => atom.builder !== Tab)

	return <div $$={ctrl(tc)}>
		<div class='carbm-tab-bar'>{tabs}</div>
		<div class='carbm-tab-content'>
			{tc._o_render}
			{content}
		</div>
	</div>

}
