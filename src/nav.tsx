
import {
	d,
	click,
	BasicAttributes,
	HTMLComponent
} from 'domic'

import {inkClickDelay} from './ink'

import {Icon} from './icon'
import {Column} from './flex'


import {animate} from './animate'


export interface NavAttributes extends BasicAttributes {

}

export class Nav extends HTMLComponent {

	overlay: HTMLElement
	drawer: HTMLElement

	detach() {
		this.node.remove()
	}

	show() {
		this.drawer.style.animation = 'dm-slide-from-right 0.2s'
		this.overlay.style.animation = 'dm-fade-in 0.2s'
		document.body.appendChild(this.node)
	}

	render(ch: DocumentFragment): Node {
		this.overlay = <div class='dm-navigation-overlay' $$={[click((e) => {
				if (e.target === this.overlay)
					this.detach()
			})]}/> as HTMLElement

		this.drawer = <Column class='dm-navigation-drawer'>
			{ch}
		</Column> as HTMLElement

		return <div>
			{this.overlay}
			{this.drawer}
		</div>
	}

}

export function NavHeader(a: BasicAttributes, ch: DocumentFragment): Node {
	return <div class='dm-navigation-header'>{ch}</div>
}

export function NavSubheader(a: BasicAttributes, ch: DocumentFragment): Node {
	return <div class='dm-navigation-subheader'>{ch}</div>
}

export function NavDivider(a: BasicAttributes, ch: DocumentFragment): Node {
	return <div class='dm-navigation-divider'/>
}

export interface NavItemAttributes extends BasicAttributes {
	icon: string
	click?: (ev: MouseEvent) => any
}

export function NavItem(a: NavItemAttributes, ch: DocumentFragment): Node {
	let res = <div class='dm-navigation-item' $$={inkClickDelay(function (e) {
		if (a.click && a.click(e) !== false) {
			let c = Nav.get(res)
			c.detach()
		}
	})}>
		<Icon class='dm-navigation-item-icon' name={a.icon}/>
		{ch}
	</div>

	return res
}

export function NavBody(a: BasicAttributes, ch: DocumentFragment): Node {
	return <div class='dm-navigation-body'>{ch}</div>
}

export function NavFooter(a: BasicAttributes, ch: DocumentFragment): Node {
	return <div class='dm-navigation-footer'>{ch}</div>
}
