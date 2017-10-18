
import {
	click,
	Component,
	Attrs
} from 'elt'

import {inkClickDelay} from './ink'

import {Icon} from './icon'
import {Column} from './flex'


import {animateClass, animations} from './animate'
import {style} from 'typestyle'
import * as t from 'csstips'

export namespace CSS {

	export const overlay = style({
		position: 'fixed',
		top: 0,
		left: 0,
		height: '100vh',
		width: '100vw',
		backgroundColor: `rgba(0, 0, 0, 0.24)`,
		transform: `translateZ(0)`
	})

	export const drawer = style({
		position: 'fixed',
		fontSize: '14px',
		transform: `translateZ(0)`,
		top: 0,
		left: 0,
		height: '100vh',
		width: '250px',
		boxShadow: `5px 0px 10px rgba(0, 0, 0, 0.14)`,
		backgroundColor: 'white'
	})

	export const item = style(t.horizontal, t.center, {
		position: 'relative',
		height: '48px',
		fontWeight: 'bold'
	})

	export const itemIcon = style({
		paddingLeft: '16px',
		width: '72px',
		color: `rgba(0, 0, 0, 0.65)`,

		$nest: {'&:before': {fontSize: '24px'}}
	})

	export const divider = style({
		position: 'relative',
		width: '100%',
		borderBottom: `1px solid rgba(0, 0, 0, 0.07)`,
		marginTop: '4px',
		marginBottom: '3px'
	})

	export const body = style(t.vertical, {
		flexGrow: 1
	})

	export const header = style({
		paddingTop: '16px',
		paddingLeft: '16px'
	})

	export const subheader = style({paddingLeft: '16px'})
	export const footer = style({textAlign: 'center', paddingBottom: '16px'})

	export const leave = style({
		$nest: {
			[`& > .${overlay}`]: { animation: `${animations.fadeOut} 0.2s ease-out` },
			[`& > .${drawer}`]: { animation: `${animations.slideToLeft} 0.2s ease-out` }
		}
	})

	export const enter = style({
		$nest: {
			[`& > .${overlay}`]: { animation: `${animations.fadeIn} 0.2s ease-in` },
			[`& > .${drawer}`]: { animation: `${animations.slideFromLeft} 0.2s ease-in` }
		}
	})

}


export interface NavAttributes extends Attrs {

}

export class Nav extends Component {

	node: HTMLElement

	detach() {
		animateClass(this.node, CSS.leave).then(() => {
			this.node.remove()
		}).catch(e => {
			console.error(e)
		})
	}

	inserted(node: HTMLElement) {
		this.node = node
		animateClass(node, CSS.enter)
	}

	removed() {
		this.node = null!
	}

	render(ch: DocumentFragment): Element {

		return <div>
			<div class={CSS.overlay} $$={[click((e, overlay) => {
				if (e.target === overlay)
					this.detach()
			})]}/>
			<Column class={CSS.drawer}>
				{ch}
			</Column>
		</div>
	}

}

export function NavHeader(a: Attrs, ch: DocumentFragment): Element {
	return <div class={CSS.header}>{ch}</div>
}

export function NavSubheader(a: Attrs, ch: DocumentFragment): Element {
	return <div class={CSS.subheader}>{ch}</div>
}

export function NavDivider(a: Attrs, ch: DocumentFragment): Element {
	return <div class={CSS.divider}/>
}

export interface NavItemAttributes extends Attrs {
	icon: string
	click?: (ev: MouseEvent) => any
}

export function NavItem(a: NavItemAttributes, ch: DocumentFragment): Element {
	let res = <div class={CSS.item} $$={[inkClickDelay(function (e) {
		if (a.click && a.click(e) !== false) {
			let c = Nav.get(res)
			// XXX should we log an error here if c was null ?
			if (c) c.detach()
		}
	})]}>
		<Icon class={CSS.itemIcon} name={a.icon}/>
		{ch}
	</div>

	return res
}

export function NavBody(a: Attrs, ch: DocumentFragment): Element {
	return <div class={CSS.body}>{ch}</div>
}

export function NavFooter(a: Attrs, ch: DocumentFragment): Element {
	return <div class={CSS.footer}>{ch}</div>
}
