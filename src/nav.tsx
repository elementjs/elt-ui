
import {
	click,
	clickfix,
	BasicAttributes,
	HTMLComponent
} from 'domic'

import {inkClickDelay} from './ink'

import {Icon} from './icon'
import {Column} from './flex'


import {animateClass} from './animate'


export interface NavAttributes extends BasicAttributes {

}

export class Nav extends HTMLComponent {

	detach() {
		animateClass(this.node, 'animation-leave').then(() => {
			this.node.remove()
		})
	}

	show() {
		animateClass(this.node, 'animation-enter')
		document.body.appendChild(this.node)
	}

	render(ch: DocumentFragment): Node {

		let overlay = <div class='dm-navigation-overlay' $$={[clickfix, click((e) => {
				if (e.target === overlay)
					this.detach()
			})]}/>

		return <div class='dm-nav-holder'>
			{overlay}
			<Column class='dm-navigation-drawer'>
				{ch}
			</Column>
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
	let res = <div class='dm-navigation-item' $$={[clickfix, inkClickDelay(function (e) {
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

export function NavBody(a: BasicAttributes, ch: DocumentFragment): Node {
	return <div class='dm-navigation-body'>{ch}</div>
}

export function NavFooter(a: BasicAttributes, ch: DocumentFragment): Node {
	return <div class='dm-navigation-footer'>{ch}</div>
}
