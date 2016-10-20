
import {d, click} from 'domic'
import {animator, easings} from './animate'

import './ink.styl'

export function inker(node: Node, event: MouseEvent = null) {

	var clientX = event.pageX
	var clientY = event.pageY


	var inker = d('div', {class: 'carbm-ink'}) as HTMLDivElement
	var ink_container = d('div', {class: 'carbm-ink-container'},
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


export function inkable(node: Node) {
	return click(function (ev: MouseEvent) {
		inker(node, ev)
	})(node as HTMLElement)
}


export function inkClickDelay(fn: (ev: MouseEvent) => void) {
	return function (node: Node) {
		return click(function (ev: MouseEvent) {
			inker(node, ev)
			setTimeout(() => fn(ev), 150)
		})(node as HTMLElement)
	}
}
