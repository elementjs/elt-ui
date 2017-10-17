
import {
	click,
	Component,
	Attrs
} from 'elt'

import {inkClickDelay} from './ink'

import {Icon} from './icon'
import {Column} from './flex'


import {animateClass} from './animate'

import * as css from './nav.styl'


export interface NavAttributes extends Attrs {

}

export class Nav extends Component {

	node: HTMLElement

	detach() {
		animateClass(this.node, 'animation-leave').then(() => {
			this.node.remove()
		}).catch(e => {
			console.error(e)
		})
	}

	inserted(node: HTMLElement) {
		this.node = node
		animateClass(node, 'animation-enter')
	}

	removed() {
		this.node = null!
	}

	render(ch: DocumentFragment): Element {

		return <div class={css.holder}>
			<div class={css.overlay} $$={[click((e, overlay) => {
				if (e.target === overlay)
					this.detach()
			})]}/>
			<Column class={css.drawer}>
				{ch}
			</Column>
		</div>
	}

}

export function NavHeader(a: Attrs, ch: DocumentFragment): Element {
	return <div class={css.header}>{ch}</div>
}

export function NavSubheader(a: Attrs, ch: DocumentFragment): Element {
	return <div class={css.subheader}>{ch}</div>
}

export function NavDivider(a: Attrs, ch: DocumentFragment): Element {
	return <div class={css.divider}/>
}

export interface NavItemAttributes extends Attrs {
	icon: string
	click?: (ev: MouseEvent) => any
}

export function NavItem(a: NavItemAttributes, ch: DocumentFragment): Element {
	let res = <div class={css.item} $$={[inkClickDelay(function (e) {
		if (a.click && a.click(e) !== false) {
			let c = Nav.get(res)
			// XXX should we log an error here if c was null ?
			if (c) c.detach()
		}
	})]}>
		<Icon class={css.itemIcon} name={a.icon}/>
		{ch}
	</div>

	return res
}

export function NavBody(a: Attrs, ch: DocumentFragment): Element {
	return <div class={css.body}>{ch}</div>
}

export function NavFooter(a: Attrs, ch: DocumentFragment): Element {
	return <div class={css.footer}>{ch}</div>
}
