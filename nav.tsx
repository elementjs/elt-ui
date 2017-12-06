
import {
	click,
	Component,
	Attrs,
	removeNode
} from 'elt'

import {inkClickDelay} from './ink'

import {Icon} from './icon'
import flex from './flex'


import {animateClass, CSS as AnimCSS} from './animate'

export interface NavAttributes extends Attrs {

}

export class Nav extends Component {

	node: HTMLElement

	detach() {
		this.node.classList.remove(CSS.enter)
		animateClass(this.node, CSS.leave).then(() => {
			removeNode(this.node)
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
			<div class={[CSS.drawer, flex.column]}>
				{ch}
			</div>
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
	let res = <div class={[CSS.item, flex.row, flex.alignCenter]} $$={[inkClickDelay(function (e) {
		if (a.click && a.click(e) !== false) {
			let c = Nav.get(res)
			// XXX should we log an error here if c was null ?

			if (c) c.detach()
			else console.warn('could not get Nav')
		}
	})]}>
		<Icon class={CSS.itemIcon} name={a.icon}/>
		{ch}
	</div>

	return res
}

export function NavBody(a: Attrs, ch: DocumentFragment): Element {
	return <div class={[flex.column, flex.absoluteGrow]}>{ch}</div>
}

export function NavFooter(a: Attrs, ch: DocumentFragment): Element {
	return <div class={CSS.footer}>{ch}</div>
}


import s from './styling'

export namespace CSS {

	export const overlay = s.style('overlay', {
		position: 'fixed',
		top: 0,
		left: 0,
		height: '100vh',
		width: '100vw',
		backgroundColor: `rgba(0, 0, 0, 0.24)`,
		transform: `translateZ(0)`
	})

	export const drawer = s.style('drawer',
		{
			position: 'fixed',
			fontSize: '14px',
			transform: `translateZ(0)`,
			top: 0,
			left: 0,
			height: '100vh',
			width: '250px',
			boxShadow: `5px 0px 10px rgba(0, 0, 0, 0.14)`,
			backgroundColor: s.colors.Bg
		})

	export const item = s.style('item', {
		position: 'relative',
		height: '48px',
		fontWeight: 'bold'
	})

	export const itemIcon = s.style('item-icon', {
		paddingLeft: '16px',
		width: '72px',
		color: `rgba(0, 0, 0, 0.65)`,

		$nest: {'&:before': {fontSize: '24px'}}
	})

	export const divider = s.style('divider', {
		position: 'relative',
		width: '100%',
		borderBottom: `1px solid ${s.colors.Fg6}`,
		marginTop: '4px',
		marginBottom: '3px'
	})

	export const header = s.style('header', {
		paddingTop: '16px',
		paddingLeft: '16px'
	})

	export const subheader = s.style('subheader', {paddingLeft: '16px'})
	export const footer = s.style('footer', {textAlign: 'center', paddingBottom: '16px'})

	export const enter = s.style('enter',
	s.child('.' + overlay, { animation: `${AnimCSS.fadeIn} 0.2s ease-in forwards` }),
	s.child('.' + drawer, { animation: `${AnimCSS.slideFromLeft} 0.2s ease-in forwards` })
	)

	export const leave = s.style('leave',
		s.child('.' + overlay, { animation: `${AnimCSS.fadeOut} 0.2s ease-out forwards` }),
		s.child('.' + drawer, { animation: `${AnimCSS.slideToLeft} 0.2s ease-out forwards` })
	)

}

