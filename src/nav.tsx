
import {
	d,
	click,
	BasicAttributes,
	Component
} from 'domic'

import {inkClickDelay} from './ink'

import {Icon} from './icon'
import {Column} from './flex'


import {cssAnimator} from './animate'

export const navRootAnimation = cssAnimator
export const navOverlayAnimation = cssAnimator


export interface NavAttributes extends BasicAttributes {

}

export class Nav extends Component {

	detach() {
		// FIXME should add this.node in the end...
		// this.node.remove()
	}

	render(ch: DocumentFragment): Node {
		return <div $$={[cssAnimator]}>
			<div class='dm-navigation-overlay' $$={[navOverlayAnimation, click(function (this: HTMLElement, e: Event) {
				if (e.target === this)
					this.parentElement.parentElement.removeChild(this.parentElement)
			})]}/>
			<Column class='dm-navigation-drawer' $$={navRootAnimation}>
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
