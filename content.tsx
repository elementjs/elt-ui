
import {Child, ChildAttributes} from './flex'

import * as s from './styling'

export namespace CSS {
  export const content = s.style('content', {
    padding: '16px'
  })
}


export function Content(attrs: ChildAttributes, children: DocumentFragment): Element {
  var {$$children, ...a} = attrs
  return <Child {...a} class={CSS.content}>{children}</Child>;
}
