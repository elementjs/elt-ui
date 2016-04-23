
import {c, click} from 'carbyne'
import './ink.styl'

export function inker(atom, event = null) {

	var offset_x = -25 + (event ? event.offsetX : 0)
	var offset_y = -25 + (event ? event.offsetY : 0)

	var style = `left: ${offset_x}px; top: ${offset_y}px;`
	// console.log(style)

	var inker = <div class='carbm-ink' style={style}/>
	var ink_container = <div class='carbm-ink-container'/>
	ink_container.append(inker)


	// console.log(offset_x, offset_y)

	ink_container.mount(atom.element)
	// atom.append(inker)
	requestAnimationFrame(e => {
		inker.element.classList.add('animate')
		setTimeout(e => ink_container.destroy(), 1000)
	})
	// var bb = atom.element.getBounding
}

export function inkable(atom) {
	return click(function (ev) { inker(this, ev) })(atom)
}