
import {c, o, Controller, Atom, click, ctrl, cls, Observable, Builder} from 'carbyne'
import {inkable} from './ink'
import './tab.styl'


export class TabsController extends Controller {

	o_render: Observable<Builder>

	constructor() {
		super()

		this.o_render = o(null)
	}

}

export class TabController extends Controller {

	o_is_active: Observable<boolean>
	render: Builder

	constructor(render) {
		super()
		this.o_is_active = o(false)
		this.render = render
	}

	onMount() {
		const tcs = this.getController(TabsController) as TabsController
		if (tcs == null) throw new Error('<Tab/> must be inside a <TabContainer/>')

		this.observe(tcs.o_render, rend => this.o_is_active.set(rend === this.render))

		if (tcs.o_render.get() == null)
			this.activate()
	}

	activate() {
		const tcs = this.getController(TabsController) as TabsController
		tcs.o_render.set(this.render)
	}

}

/**
 * Children are ignored
 */
export function Tab(attrs, children) {

	const tc = new TabController(attrs.render)

	return <div class='carbm-tab-title' $$={[
		tc,
		click(ev => tc.activate()),
		cls({active: tc.o_is_active}),
		inkable
	]}>
		{attrs.title}
	</div>

}


/**
 *
 */
export function TabContainer(attrs, children) {

	const tcs = new TabsController()

	return <div $$={tcs}>
		<div class='carbm-tab-bar'>{children}</div>
		<div class='carbm-tab-content'>
			{tcs.o_render}
		</div>
	</div>

}
