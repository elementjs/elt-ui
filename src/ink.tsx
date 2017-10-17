
import {e, click, Mixin} from 'elt'


export function inker(node: Node, event: MouseEvent) {

	var clientX = event.pageX
	var clientY = event.pageY

	var inker = e('div', {class: 'em-ink'}) as HTMLDivElement
	var ink_container = e('div', {class: 'em-ink-container'},
		inker
	) as HTMLDivElement

	node.appendChild(ink_container)

	// atom.append(inker)
	requestAnimationFrame(e => {
		var bb = ink_container.getBoundingClientRect()
		inker.style.top = `${clientY - bb.top}px`
		inker.style.left = `${clientX - bb.left}px`
		inker.classList.add('animate')
		ink_container.classList.add('animate')
		setTimeout(() => ink_container.remove(), 1000)
	})
	// var bb = atom.element.getBounding
}


export function inkable(): Mixin {
	return click(function (ev, node) {
		inker(node, ev)
	})
}


export function inkClickDelay(fn: (ev: MouseEvent) => void) {
	return click(function (ev, node) {
		inker(node, ev)
		setTimeout(() => fn(ev), 150)
	})
}
