
import {
	$click,
	Component,
	$Repeat,
	o,
	$Fragment as $F,
	Renderable,
	Insertable,
	Attrs,
} from 'elt'

import { $inkable } from './ink'

import S from './styling'
import { style } from 'osun'


export class TabContainer extends Component {

	o_content: o.Observable<Node|null> = o(null as Node | null)
	o_active_tab = o(null as Tab | null)
	o_titles = o([] as Node[])

	render(children: Renderable[]) {
		return <div class={S.flex.column}>
			<div class={[TabContainer.bar, S.flex.row.justifyCenter]}>{$Repeat(this.o_titles, o_t => o_t.get())}</div>
			{children}
		</div> as HTMLDivElement

	}

}

export namespace TabContainer {
	export const bar = style('bar', {
		backgroundColor: S.BG,
		borderBottom: `1px solid rgba(0, 0, 0, 0.14)`,
		height: '48px'
	})
}


export interface TabAttributes extends Attrs<HTMLDivElement> {
	text: Insertable<HTMLDivElement>,
}


/**
 * FIXME missing is_active logic, since I don't know how to dynamically
 * watch the parent container observable.
 */
export class Tab extends Component<TabAttributes> {

	container: TabContainer | null = null
	children: Node[] = []
	o_is_active = o(false)

	init(node = this.node) {
		if (this.container) return

		this.container = TabContainer.get(node)

		if (!this.container)
			throw new Error('Tab must be inside a TabContainer')

		this.container.o_titles.mutate(titles => {
			var t = titles.slice()
			t.push(<div
				class={Tab.title}
			>
				{$click(ev => this.activate())}
				{$inkable}
				<div class={[Tab.secondborder, {[Tab.active]: this.o_is_active}]}>&nbsp;</div>
				{this.attrs.text}
			</div>)
			return t
		})

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

	render(children: Renderable[]) {

		const frag = <$F>{children}</$F>

		return <div
			class={[
				Tab.content,
			this.o_is_active.tf(act => act ? S.flex.column : S.box.displayNone),
				S.flex.absoluteGrow(1)
			]}
		>
			{this.o_is_active.tf(a => a ? frag : null)}
		</div> as HTMLDivElement

	}
}


export namespace Tab {

	export const title = style('title', {
		color: S.TINT,
		userSelect: 'none',
		textTransform: 'uppercase',
		textAlign: 'center',
		fontWeight: 'bolder',
		borderBottom: `1px solid ${S.TINT}`,
		height: '48px',
		lineHeight: '48px',
		fontSize: '14px',
		maxWidth: '264px',
		minWidth: '160px',
		cursor: 'pointer',
		transition: `border-bottom-color linear 0.2s`,
		position: 'relative'
	})

	export const secondborder = style('second-border', {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: 'calc(100% - 1px)',
		transition: 'transform 0.2s linear',
		transform: 'scaleX(0)',
		borderBottom: `1px solid ${S.TINT}`,
	})

	export const active = style('active', {
		transform: 'scaleX(1)'
	})

	export const content = style('content', {backgroundColor: S.BG})

}
