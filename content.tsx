
import {Child, ChildAttributes} from './flex'

import {style} from 'typestyle'

export namespace CSS {
  export const content = style({
    padding: '16px'
  })
}


export function Content(attrs: ChildAttributes, children: DocumentFragment): Element {
  var {$$children, ...a} = attrs
  return <Child {...a} class={CSS.content}>{children}</Child>;
}
