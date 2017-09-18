
import {
	click,
	Component,
	BasicAttributes
} from 'domic'

import {inkClickDelay} from './ink'

import {Icon} from './icon'
import {Column} from './flex'


import {animateClass} from './animate'


export interface NavAttributes extends BasicAttributes {

}

export class Nav extends Component {

	detach() {
		animateClass(this.node, 'animation-leave').then(() => {
			this.node.remove()
		})
	}

	onmount(node: HTMLElement) {
		animateClass(node, 'animation-enter')
	}

	render(ch: DocumentFragment): Element {

		return <div class='dm-nav-holder'>
			<div class='dm-navigation-overlay' $$={[click((e, overlay) => {
				if (e.target === overlay)
					this.detach()
			})]}/>
			<Column class='dm-navigation-drawer'>
				{ch}
			</Column>
		</div>
	}

}

export function NavHeader(a: BasicAttributes, ch: DocumentFragment): Element {
	return <div class='dm-navigation-header'>{ch}</div>
}

export function NavSubheader(a: BasicAttributes, ch: DocumentFragment): Element {
	return <div class='dm-navigation-subheader'>{ch}</div>
}

export function NavDivider(a: BasicAttributes, ch: DocumentFragment): Element {
	return <div class='dm-navigation-divider'/>
}

export interface NavItemAttributes extends BasicAttributes {
	icon: string
	click?: (ev: MouseEvent) => any
}

export function NavItem(a: NavItemAttributes, ch: DocumentFragment): Element {
	let res = <div class='dm-navigation-item' $$={[inkClickDelay(function (e) {
		if (a.click && a.click(e) !== false) {
			let c = Nav.get(res)
			// XXX should we log an error here if c was null ?
			if (c) c.detach()
		}
	})]}>
		<Icon class='dm-navigation-item-icon' name={a.icon}/>
		{ch}
	</div>

	return res
}

export function NavBody(a: BasicAttributes, ch: DocumentFragment): Element {
	return <div class='dm-navigation-body'>{ch}</div>
}

export function NavFooter(a: BasicAttributes, ch: DocumentFragment): Element {
	return <div class='dm-navigation-footer'>{ch}</div>
}
