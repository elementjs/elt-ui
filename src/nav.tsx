
import {
	e,
	$click,
	node_remove,
	o,
	Attrs,
	$shadow,
} from 'elt'

import { $inkable, } from './ink'

// import { animate } from './animate'
import { theme as T } from './colors'
import { style, rule, builder as CSS } from "osun"


export function Nav(_: Attrs<HTMLDivElement>) {
	function detach() {
		// animate(node, css_animate_leave).then(() => {
		node_remove(node)
		// }).catch(e => {
		// 	console.error(e)
		// })
	}

	const node = <div class="nav">
		{$shadow(<>
			<div part="overlay">
				{$click(e => {
					detach()
				})}
			</div>
			<div part="drawer">
				<slot/>
			</div>
		</>)}

	</div> as HTMLDivElement

	// {node => {
	// 	// animate(node, css_animate_enter)
	// }}

	return node
}


export function NavHeader(_: Attrs<HTMLDivElement>) {
	return <div class={css_nav_header}></div> as HTMLDivElement
}


export function NavSubheader(_: Attrs<HTMLDivElement>) {
	return <div class={css_nav_subheader}></div> as HTMLDivElement
}


export function NavDivider(_: Attrs<HTMLDivElement>) {
	return <div class={css_nav_divider}/> as HTMLDivElement
}


export function NavItem(a: {
	icon: o.RO<(a: Attrs<HTMLElement | SVGElement>) => HTMLElement | SVGElement>
	click?: (ev: MouseEvent) => any
} & Attrs<HTMLDivElement>) {
	let res = <div class={[css_nav_item, CSS.row.alignCenter]}>
		{$inkable}
		{$click(function (e) {
			a.click?.(e)
		})}
		{o.tf(a.icon, I => <I class={css_nav_item_icon}/>)}
	</div>

	return res
}


export function NavBody(a: Attrs<HTMLDivElement>) {
	return <div class={[CSS.column.absoluteGrow(1)]}></div>
}


export function NavFooter(_: Attrs<HTMLDivElement>) {
	return <div class={css_nav_footer}></div>
}

//////////////////////////////////////////////////////////////////////////////////////////

export const css_nav_header = /** @__PURE__ */ style("nav-header", CSS.paddingTop(16).paddingLeft(16))
export const css_nav_subheader = /** @__PURE__ */ style("nav-sub-header", CSS.paddingLeft(16))

export const css_nav_divider = /** @__PURE__ */ style("nav-divider", CSS.positionRelative.width("100%").borderBottom(T.fg07).marginTop(4).marginBottom(3))

export const css_nav_item = /** @__PURE__ */ style("nav-item", CSS.positionRelative.height(48).cursorPointer.bold)
export const css_nav_item_icon = /** @__PURE__ */ style("nav-item-icon", CSS.width(64).color(0.65).fontSize(64))

export const css_nav_footer = style("footer", CSS.textCenter.paddingBottom(16))


const css_nav = style("nav")
rule`${css_nav}::part(overlay)`(CSS.positionFixed.top(0).left(0).height("100vh").width("100vw").background(-0.24).translateZ(0))
rule`${css_nav}::part(drawer)`(CSS.column.positionFixed.translateZ(0).top(0).left(0).height("100vh").width(250).boxShadow.background(T.bg).fontSize("14px"))

