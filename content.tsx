import {Attrs} from 'elt'

import {Css} from './styling'

export function Content(attrs: Attrs, children: DocumentFragment): Element {
  return <div class={Content.container}>{children}</div>;
}

export namespace Content {
  export const container = Css('content', {
    padding: '16px',
    background: Css.colors.BG
  })
}

