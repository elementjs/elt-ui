
import {c, click, Atom} from 'carbyne'
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



export function Nav(a, ch) {
	var router = a.router

	var res = <div class='carbm-navigation-overlay' $$={[navOverlayAnimation, click(function (e, atom) {
		if (e.target === atom.element) res.destroy()
	})]}>
			<div class='carbm-navigation-drawer' $$={navRootAnimation}>
				{ch}
		</div>
	</div>

	res.on('nav-go', function (e, state, args) {
		if (router) {
			router.go(state)
		}
		res.destroy()
	})

	return res
}

export function NavHeader(a, ch) {
	return c('.carbm-navigation-header', null, ch)
}

export function NavSubheader(a, ch) {
	return c('.carbm-navigation-subheader', null, ch)
}

export function NavDivider(a, ch) {
	return c('.carbm-navigation-divider')
}

export function NavItem(a, ch) {
	let res = <div class='carbm-navigation-item' $$={inkClickDelay(function (e, atom) {
		atom.emit('nav-go', a.state, a.stateArgs || {})
	})}>
		<Icon class='carbm-navigation-item-icon' name={a.icon}/>
		{ch}
	</div>

	return res
}

export function NavBody(a, ch) {
	return c('.carbm-navigation-body', null, ch)
}
