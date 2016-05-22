
import {c, click, Atom, CarbyneEvent} from 'carbyne'
import './ink.styl'

export function inker(atom: Atom, event: MouseEvent = null) {

	var clientX = event.clientX
	var clientY = event.clientY


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
		setTimeout(e => ink_container.destroy(), 1000)
	})
	// var bb = atom.element.getBounding
}

export function inkable(atom) {
	return click(function (ev: MouseEvent, atom: Atom) {
		inker(atom, ev)
	})(atom)
}

export function inkClickDelay(fn) {
	return click(function (ev: MouseEvent, atom: Atom) {
		inker(atom, ev)
		setTimeout(e => fn.call(this, e), 150)
	})
}
