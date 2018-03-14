import {Attrs} from 'elt'

import {css as base} from './styling'
import {cls} from 'osun'

export namespace css {
  export const content = cls('content', {
    padding: '16px',
    background: base.colors.BG
  })
}


export function Content(attrs: Attrs, children: DocumentFragment): Element {
  var {$$children, ...a} = attrs
  return <div {...a} class={css.content}>{children}</div>;
}
