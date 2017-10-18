
import {Attrs} from 'elt'

import {Row} from './flex'
import {style} from 'typestyle'

export namespace CSS {

  export const toolbar = style({
    padding: `0 16px`,
    height: '64px',
    backgroundColor: `var(--em-color-primary)`,
    color: `var(--em-text-inverted)`,

    $nest: {
      ['& > *']: {
        color: `var(--em-color-text-inverted)`,
      },
      ['& > h3']: {fontSize: '24px'}
    }
  })

}


export function Toolbar(attrs: Attrs, children: DocumentFragment): Element {

  return <Row class={CSS.toolbar}>
      {children}
    </Row>;

}
