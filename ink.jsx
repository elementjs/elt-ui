
import {c, click} from 'carbyne'
import './ink.styl'

export function inker(atom, event = null) {

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
		setTimeout(e => ink_container.destroy(), 1000)
	})
	// var bb = atom.element.getBounding
}

export function inkable(atom) {
	return click(function (ev) { inker(this, ev) })(atom)
}

export function inkClickDelay(fn) {
	return click(function (ev) { inker(this, ev); setTimeout(e => fn.call(this, e), 150) })
}
