
import {
	click,
	Component,
	Attrs,
	remove_and_unmount,
	o,
} from 'elt'

import { inkClickDelay } from './ink'

import { animate } from './animate'
import S from './styling'
import { style, rule } from 'osun'


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

	init(node: HTMLElement) {
		animate(node, Nav.enter)
	}

	render(ch: DocumentFragment): HTMLElement {

		return <div>
			<div class={Nav.overlay} $$={[click((e, overlay) => {
				if (e.target === overlay)
					this.detach()
			})]}/>
			<div class={[Nav.drawer, S.flex.column]}>
				{ch}
			</div>
		</div> as HTMLElement
	}

}

export namespace Nav {

	export const overlay = style('overlay', {
		position: 'fixed',
		top: 0,
		left: 0,
		height: '100vh',
		width: '100vw',
		backgroundColor: `rgba(0, 0, 0, 0.24)`,
		transform: `translateZ(0)`
	})

	export const drawer = style('drawer', {
		position: 'fixed',
		fontSize: '14px',
		transform: `translateZ(0)`,
		top: 0,
		left: 0,
		height: '100vh',
		width: '250px',
		boxShadow: `5px 0px 10px rgba(0, 0, 0, 0.14)`,
		backgroundColor: S.BG
	})

	export const enter = style('enter')
	rule`${enter} > ${overlay}`({
		animation: `${animate.fade_in} 0.2s ease-in forwards`,
	})
	rule`${enter} > ${drawer}`({
		animation: `${animate.slide_from_left} 0.2s ease-in forwards`
	})

	export const leave = style('leave')
	rule`${leave} > ${overlay}`({
		animation: `${animate.fade_out} 0.2s ease-out forwards`
	})
	rule`${leave} > ${drawer}`({
		animation: `${animate.SLIDE_TO_LEFT} 0.2s ease-out forwards`
	})

}

export function NavHeader(a: Attrs, ch: DocumentFragment): Element {
	return <div class={NavHeader.header}>{ch}</div>
}

export namespace NavHeader {
	export const header = style('header', {
		paddingTop: '16px',
		paddingLeft: '16px'
	})


}

export function NavSubheader(a: Attrs, ch: DocumentFragment): Element {
	return <div class={NavSubheader.subheader}>{ch}</div>
}

export namespace NavSubheader {
	export const subheader = style('subheader', {paddingLeft: '16px'})
}

export function NavDivider(a: Attrs, ch: DocumentFragment): Element {
	return <div class={NavDivider.divider}/>
}

export namespace NavDivider {
	export const divider = style('divider', {
		position: 'relative',
		width: '100%',
		borderBottom: `1px solid ${S.FG07}`,
		marginTop: '4px',
		marginBottom: '3px'
	})
}

export interface NavItemAttributes extends Attrs {
	icon: o.RO<(a: Attrs) => Element>
	click?: (ev: MouseEvent) => any
}

export function NavItem(a: NavItemAttributes, ch: DocumentFragment): Element {
	let res = <div class={[NavItem.item, S.flex.row.alignCenter]} $$={[inkClickDelay(function (e) {
		if (a.click && a.click(e) !== false) {
			let c = Nav.get(res)
			// XXX should we log an error here if c was null ?

			if (c) c.detach()
			else console.warn('could not get Nav')
		}
	})]}>
		{o.tf(a.icon, I => <I class={NavItem.item_icon}/>)}
		{ch}
	</div>

	return res
}

export namespace NavItem {

	export const item = style('item', {
		position: 'relative',
		height: '48px',
		fontWeight: 'bolder',
		cursor: 'pointer',
	})

	export const item_icon = style('item-icon', {
		width: '64px',
		fontSize: '20px',
		color: `rgba(0, 0, 0, 0.65)`,
	})

}

export function NavBody(a: Attrs, ch: DocumentFragment): Element {
	return <div class={[S.flex.column.absoluteGrow(1)]}>{ch}</div>
}


export function NavFooter(a: Attrs, ch: DocumentFragment): Element {
	return <div class={NavFooter.footer}>{ch}</div>
}

export namespace NavFooter {

	export const footer = style('footer', {textAlign: 'center', paddingBottom: '16px'})

}
