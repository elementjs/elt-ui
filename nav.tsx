
import {
	click,
	Component,
	Attrs,
	remove_and_unmount
} from 'elt'

import {inkClickDelay} from './ink'

import {Icon} from './icon'
import {css as flex} from './flex'


import {animateClass, css as AnimCSS} from './animate'

export interface NavAttributes extends Attrs {

}

export class Nav extends Component<Attrs, HTMLElement> {

	detach() {
		this.node.classList.remove(css.enter)
		animateClass(this.node, css.leave).then(() => {
			remove_and_unmount(this.node)
		}).catch(e => {
			console.error(e)
		})
	}

	inserted(node: HTMLElement) {
		animateClass(node, css.enter)
	}

	render(ch: DocumentFragment): HTMLElement {

		return <div>
			<div class={css.overlay} $$={[click((e, overlay) => {
				if (e.target === overlay)
					this.detach()
			})]}/>
			<div class={[css.drawer, flex.column]}>
				{ch}
			</div>
		</div> as HTMLElement
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
	let res = <div class={[css.item, flex.row, flex.align_center]} $$={[inkClickDelay(function (e) {
		if (a.click && a.click(e) !== false) {
			let c = Nav.get(res)
			// XXX should we log an error here if c was null ?

			if (c) c.detach()
			else console.warn('could not get Nav')
		}
	})]}>
		<Icon class={css.itemIcon} name={a.icon}/>
		{ch}
	</div>

	return res
}

export function NavBody(a: Attrs, ch: DocumentFragment): Element {
	return <div class={[flex.column, flex.absoluteGrow]}>{ch}</div>
}

export function NavFooter(a: Attrs, ch: DocumentFragment): Element {
	return <div class={css.footer}>{ch}</div>
}


import {css as base} from './styling'
import {cls, s, combine} from 'osun'

export namespace css {

	export const overlay = cls('overlay', {
		position: 'fixed',
		top: 0,
		left: 0,
		height: '100vh',
		width: '100vw',
		backgroundColor: `rgba(0, 0, 0, 0.24)`,
		transform: `translateZ(0)`
	})

	export const drawer = cls('drawer',
		{
			position: 'fixed',
			fontSize: '14px',
			transform: `translateZ(0)`,
			top: 0,
			left: 0,
			height: '100vh',
			width: '250px',
			boxShadow: `5px 0px 10px rgba(0, 0, 0, 0.14)`,
			backgroundColor: base.colors.BG
		})

	export const item = cls('item', {
		position: 'relative',
		height: '48px',
		fontWeight: 'bold'
	})

	export const itemIcon = cls('item-icon', {
		paddingLeft: '16px',
		width: '72px',
		color: `rgba(0, 0, 0, 0.65)`,
	})

	s(itemIcon).append(`:before`, {
		fontSize: '24px'
	})

	export const divider = cls('divider', {
		position: 'relative',
		width: '100%',
		borderBottom: `1px solid ${base.colors.FG6}`,
		marginTop: '4px',
		marginBottom: '3px'
	})

	export const header = cls('header', {
		paddingTop: '16px',
		paddingLeft: '16px'
	})

	export const subheader = cls('subheader', {paddingLeft: '16px'})
	export const footer = cls('footer', {textAlign: 'center', paddingBottom: '16px'})

	export const enter = cls('enter')

	combine(s => s.childOf(enter), () => {
		s(overlay, {
			animation: `${AnimCSS.fade_in} 0.2s ease-in forwards`,
		})

		s(drawer, {
			animation: `${AnimCSS.slide_from_left} 0.2s ease-in forwards`
		})
	})

	export const leave = cls('leave')

	combine(s => s.childOf(leave), () => {
		s(overlay, { animation: `${AnimCSS.fade_out} 0.2s ease-out forwards` })
		s(drawer, { animation: `${AnimCSS.slide_to_left} 0.2s ease-out forwards` })
	})

}

