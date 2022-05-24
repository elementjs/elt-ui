
import {
	e,
	$click,
	remove_node,
	o,
	Renderable,
	Attrs,
	$init,
} from 'elt'

import { $inkClickDelay } from './ink'

import { animate } from './animate'
import S from './styling'
import { theme as T } from './colors'
import { style, rule } from 'osun'


export function Nav(attrs: Attrs<HTMLDivElement>, ch: Renderable[]) {
	function detach() {
		node.classList.remove(Nav.enter)
		animate(node, Nav.leave).then(() => {
			remove_node(node)
		}).catch(e => {
			console.error(e)
		})
	}

	const node = <div>
		{$init(node => {
			animate(node, Nav.enter)
		})}
		<div class={Nav.overlay}>
			{$click(e => {
				if (e.target === e.currentTarget)
					detach()
			})}
		</div>
		<div class={[Nav.drawer, S.flex.column]}>{ch}</div>
	</div> as HTMLDivElement
	return node
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
		backgroundColor: T.bg
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
		animation: `${animate.slide_to_left} 0.2s ease-out forwards`
	})

}

export function NavHeader(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
	return <div class={NavHeader.header}>{ch}</div> as HTMLDivElement
}

export namespace NavHeader {
	export const header = style('header', {
		paddingTop: '16px',
		paddingLeft: '16px'
	})


}

export function NavSubheader(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
	return <div class={NavSubheader.subheader}>{ch}</div> as HTMLDivElement
}

export namespace NavSubheader {
	export const subheader = style('subheader', {paddingLeft: '16px'})
}

export function NavDivider(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
	return <div class={NavDivider.divider}/> as HTMLDivElement
}

export namespace NavDivider {
	export const divider = style('divider', {
		position: 'relative',
		width: '100%',
		borderBottom: `1px solid ${T.fg07}`,
		marginTop: '4px',
		marginBottom: '3px'
	})
}

export interface NavItemAttributes extends Attrs<HTMLDivElement> {
	icon: o.RO<(a: Attrs<HTMLElement | SVGElement>) => HTMLElement | SVGElement>
	click?: (ev: MouseEvent) => any
}

export function NavItem(a: NavItemAttributes, ch: Renderable[]) {
	let res = <div class={[NavItem.item, S.flex.row.alignCenter]}>
		{$inkClickDelay(function (e) {
			if (a.click && a.click(e) !== false) {
				databus.inClosestParent(e.currentTarget, Nav, nav => nav.detach())
			}
		})}
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

export function NavBody(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
	return <div class={[S.flex.column.absoluteGrow(1)]}>{ch}</div>
}


export function NavFooter(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
	return <div class={NavFooter.footer}>{ch}</div>
}

export namespace NavFooter {

	export const footer = style('footer', {textAlign: 'center', paddingBottom: '16px'})

}
