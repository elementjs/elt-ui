
import {
	click,
	Component,
	Attrs,
	remove_and_unmount
} from 'elt'

import {inkClickDelay} from './ink'

import {Icon} from './icon'
import {Flex} from './flex'

import {animate} from './animate'
import {Css} from './styling'


export interface NavAttributes extends Attrs {

}

export class Nav extends Component<Attrs, HTMLElement> {

	detach() {
		this.node.classList.remove(Nav.enter)
		animate(this.node, Nav.leave).then(() => {
			remove_and_unmount(this.node)
		}).catch(e => {
			console.error(e)
		})
	}

	inserted(node: HTMLElement) {
		animate(node, Nav.enter)
	}

	render(ch: DocumentFragment): HTMLElement {

		return <div>
			<div class={Nav.overlay} $$={[click((e, overlay) => {
				if (e.target === overlay)
					this.detach()
			})]}/>
			<div class={[Nav.drawer, Flex.column]}>
				{ch}
			</div>
		</div> as HTMLElement
	}

}

export namespace Nav {

	export const overlay = Css('overlay', {
		position: 'fixed',
		top: 0,
		left: 0,
		height: '100vh',
		width: '100vw',
		backgroundColor: `rgba(0, 0, 0, 0.24)`,
		transform: `translateZ(0)`
	})

	export const drawer = Css('drawer', {
		position: 'fixed',
		fontSize: '14px',
		transform: `translateZ(0)`,
		top: 0,
		left: 0,
		height: '100vh',
		width: '250px',
		boxShadow: `5px 0px 10px rgba(0, 0, 0, 0.14)`,
		backgroundColor: Css.colors.BG
	})

	export const enter = Css('enter')

	Css.combine(s => s.childOf(enter), () => {
		Css.s(overlay, {
			animation: `${animate.fade_in} 0.2s ease-in forwards`,
		})

		Css.s(drawer, {
			animation: `${animate.slide_from_left} 0.2s ease-in forwards`
		})
	})

	export const leave = Css('leave')

	Css.combine(s => s.childOf(leave), () => {
		Css.s(overlay, { animation: `${animate.FADE_OUT} 0.2s ease-out forwards` })
		Css.s(drawer, { animation: `${animate.SLIDE_TO_LEFT} 0.2s ease-out forwards` })
	})


}

export function NavHeader(a: Attrs, ch: DocumentFragment): Element {
	return <div class={NavHeader.header}>{ch}</div>
}

export namespace NavHeader {
	export const header = Css('header', {
		paddingTop: '16px',
		paddingLeft: '16px'
	})


}

export function NavSubheader(a: Attrs, ch: DocumentFragment): Element {
	return <div class={NavSubheader.subheader}>{ch}</div>
}

export namespace NavSubheader {
	export const subheader = Css('subheader', {paddingLeft: '16px'})
}

export function NavDivider(a: Attrs, ch: DocumentFragment): Element {
	return <div class={NavDivider.divider}/>
}

export namespace NavDivider {
	export const divider = Css('divider', {
		position: 'relative',
		width: '100%',
		borderBottom: `1px solid ${Css.colors.FG6}`,
		marginTop: '4px',
		marginBottom: '3px'
	})
}

export interface NavItemAttributes extends Attrs {
	icon: string
	click?: (ev: MouseEvent) => any
}

export function NavItem(a: NavItemAttributes, ch: DocumentFragment): Element {
	let res = <div class={[NavItem.item, Flex.row, Flex.align_center]} $$={[inkClickDelay(function (e) {
		if (a.click && a.click(e) !== false) {
			let c = Nav.get(res)
			// XXX should we log an error here if c was null ?

			if (c) c.detach()
			else console.warn('could not get Nav')
		}
	})]}>
		<Icon class={NavItem.itemIcon} name={a.icon}/>
		{ch}
	</div>

	return res
}

export namespace NavItem {

	export const item = Css('item', {
		position: 'relative',
		height: '48px',
		fontWeight: 'bold'
	})

	export const itemIcon = Css('item-icon', {
		paddingLeft: '16px',
		width: '72px',
		color: `rgba(0, 0, 0, 0.65)`,
	})

	Css.s(itemIcon).append(`:before`, {
		fontSize: '24px'
	})

}

export function NavBody(a: Attrs, ch: DocumentFragment): Element {
	return <div class={[Flex.column, Flex.absolute_grow]}>{ch}</div>
}


export function NavFooter(a: Attrs, ch: DocumentFragment): Element {
	return <div class={NavFooter.footer}>{ch}</div>
}

export namespace NavFooter {

	export const footer = Css('footer', {textAlign: 'center', paddingBottom: '16px'})

}
