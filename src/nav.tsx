
import {c, click, Atom, BasicAttributes, Appendable, Controller} from 'carbyne'
import {inkClickDelay} from './ink'

import {Icon} from './icon'
import {Column} from './flex'

import './nav.styl'

import {animator, easings} from './animate'

export var navRootAnimation = animator({
  enter: {
  	transform: easings.easeIn.from(-100, v => `translateZ(0) translateX(${v}%)`)
  },
  leave: {
  	transform: easings.easeOut.to(-100, v => `translateZ(0) translateX(${v}%)`)
  }
})

export var navOverlayAnimation = animator({
  enter: {
  	'background-color': easings.easeIn.to(0.24, v => `rgba(0, 0, 0, ${v})`)
  },
  leave: {
  	'background-color': easings.easeOut.from(0.24, v => `rgba(0, 0, 0, ${v})`)
  }
})


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
