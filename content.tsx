import {Attrs} from 'elt'

import * as s from './styling'

export namespace CSS {
  export const content = s.style('content', {
    padding: '16px'
  })
}


export function Content(attrs: Attrs, children: DocumentFragment): Element {
  var {$$children, ...a} = attrs
  return <div {...a} class={CSS.content}>{children}</div>;
}
