
import {c, click, Atom, BasicAttributes, Appendable, CarbyneEvent, CarbyneListener} from 'carbyne'
import {Router, State, StateParams} from 'carbyne-router'
import {inkClickDelay} from './ink'

import {Icon} from './icon'

import './nav.styl'

import {animator} from './animate'

export var navRootAnimation = animator({
  enter: {
  	transform: pct => `translateZ(0) translateX(${pct * 100 - 100}%)`
  },
  leave: {
  	transform: pct => `translateZ(0) translateX(${-pct * 100}%)`
  }
})

export var navOverlayAnimation = animator({
  enter: {
  	'background-color': pct => `rgba(0, 0, 0, ${pct*0.24})`
  },
  leave: {
  	'background-color': pct => `rgba(0, 0, 0, ${0.24 - pct*0.24})`
  }
})


export interface NavAttributes extends BasicAttributes {
	router: any // should we prevent linking to carbyne-router ?

}

export function Nav(a: NavAttributes, ch: Appendable): Atom {
	var router = a.router

	var res = <div class='carbm-navigation-overlay' $$={[navOverlayAnimation, click(function (e, atom) {
		if (e.target === atom.element) res.destroy()
	})]}>
			<div class='carbm-navigation-drawer' $$={navRootAnimation}>
				{ch}
		</div>
	</div>

	res.on('nav-go', function (e: CarbyneEvent<Atom>, state_name: string, args: StateParams) {
		if (router) {
			router.go(state_name, args)
		}
		// anyway, we're going to kill the nav.
		res.destroy()
	})

	return res
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
	state: string
	stateArgs?: StateParams
}

export function NavItem(a: NavItemAttributes, ch: Appendable): Atom {
	let res = <div class='carbm-navigation-item' $$={inkClickDelay(function (e, atom) {
		atom.emit('nav-go', a.state, a.stateArgs || {})
	})}>
		<Icon class='carbm-navigation-item-icon' name={a.icon}/>
		{ch}
	</div>

	return res
}

export function NavBody(a: BasicAttributes, ch: Appendable): Atom {
	return c('.carbm-navigation-body', null, ch)
}
