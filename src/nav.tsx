
import {c, click, Atom, BasicAttributes, Appendable, Controller} from 'carbyne'
import {inkClickDelay} from './ink'

import {Icon} from './icon'
import {Column} from './flex'

import './nav.styl'

import {cssAnimator} from './animate'

export const navRootAnimation = cssAnimator
export const navOverlayAnimation = cssAnimator

export class NavController extends Controller {

	remove() {
		this.atom.destroy()
	}

}


export interface NavAttributes extends BasicAttributes {

}

export function Nav(a: NavAttributes, ch: Appendable): Atom {

	return <div class='carbm-navigation-overlay' $$={[navOverlayAnimation, click(function (e, atom) {
		if (e.target === atom.element) atom.destroy()
	}), new NavController]}>
		<Column class='carbm-navigation-drawer' $$={navRootAnimation}>
				{ch}
		</Column>
	</div>

}

export function NavHeader(a: BasicAttributes, ch: Appendable): Atom {
	return c('.carbm-navigation-header', null, ch)
}

export function NavSubheader(a: BasicAttributes, ch: Appendable): Atom {
	return c('.carbm-navigation-subheader', null, ch)
}

export function NavDivider(a: BasicAttributes, ch: Appendable): Atom {
	return c('.carbm-navigation-divider')
}

export interface NavItemAttributes extends BasicAttributes {
	icon: string
	click?: (ev: MouseEvent, atom?: Atom) => (void|boolean)
}

export function NavItem(a: NavItemAttributes, ch: Appendable): Atom {
	let res = <div class='carbm-navigation-item' $$={inkClickDelay(function (e, atom) {
		if (a.click && a.click(e, atom) !== false) {
			let c = atom.getController(NavController)
			c.remove()
		}
	})}>
		<Icon class='carbm-navigation-item-icon' name={a.icon}/>
		{ch}
	</div>

	return res
}

export function NavBody(a: BasicAttributes, ch: Appendable): Atom {
	return c('.carbm-navigation-body', null, ch)
}

export function NavFooter(a: BasicAttributes, ch: Appendable): Atom {
	return c('.carbm-navigation-footer', null, ch)
}
