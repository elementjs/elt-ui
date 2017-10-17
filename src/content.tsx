
import {Child, ChildAttributes} from './flex'


import * as css from './content.styl'

export function Content(attrs: ChildAttributes, children: DocumentFragment): Element {
  var {$$children, ...a} = attrs
  return <Child {...a} class={css.content}>{children}</Child>;
}
