
import {Attrs} from 'elt'

import {Row} from './flex'
import {style} from 'typestyle'

export namespace CSS {

  export const toolbar = style({
    padding: `0 16px 0 0`,
    height: '64px',
    backgroundColor: `var(--em-color-primary)`,
    color: `var(--em-text-inverted)`,
    boxShadow: `0 2px 2px rgba(0,0, 0, 0.54)`,
    '--em-color-primary-save': 'var(--em-color-primary)',
    '--em-color-text-save': 'var(--em-color-text)',
    '--em-color-text-inverted-save': 'var(--em-color-text-inverted)',

    $nest: {
      ['& > *']: {
        marginLeft: '16px',
        color: `var(--em-color-text-inverted)`,
        '--em-color-primary': 'var(--em-color-inverted-text-save)',
      },
      ['& > h3']: {fontSize: '24px'}
    }
  })

}


export function Toolbar(attrs: Attrs, children: DocumentFragment): Element {

  return <Row class={CSS.toolbar} align='center'>
      {children}
    </Row>;

}
