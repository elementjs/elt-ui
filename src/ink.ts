
import {c, click, Atom} from 'carbyne'
import {animator, easings} from './animate'

import './ink.styl'

export function inker(atom: Atom, event: MouseEvent = null) {

	var clientX = event.pageX
	var clientY = event.pageY


	var inker = c('.carbm-ink')
	var ink_container = c('.carbm-ink-container')
	ink_container.append(inker)


	// console.log(offset_x, offset_y)

	ink_container.mount(atom.element)
	// atom.append(inker)
	requestAnimationFrame(e => {
		var bb = ink_container.element.getBoundingClientRect()
		inker.element.style.top = `${clientY - bb.top}px`
		inker.element.style.left = `${clientX - bb.left}px`
		inker.element.classList.add('animate')
		ink_container.element.classList.add('animate')
		setTimeout(() => ink_container.destroy(), 1000)
	})
	// var bb = atom.element.getBounding
}

export function inkable(atom: Atom) {
	return click(function (ev: MouseEvent, atom: Atom) {
		inker(atom, ev)
	})(atom)
}

export type MouseEventCbk = (ev: MouseEvent, atom: Atom) => any

export function inkClickDelay(fn: MouseEventCbk) {
	return click(function (ev: MouseEvent, atom: Atom) {
		inker(atom, ev)
		setTimeout(() => fn(ev, atom), 150)
	})
}
