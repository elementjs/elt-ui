import { Attrs } from 'elt'

import { Styling } from './styling'
import { cls } from 'osun'

export function Content(attrs: Attrs, children: DocumentFragment): Element {
  return <div class={Content.container}>{children}</div>;
}

export namespace Content {
  export const container = cls('content', {
    padding: '16px',
    background: Styling.colors.BG
  })
}

