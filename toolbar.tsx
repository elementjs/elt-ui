
import {Attrs} from 'elt'

import flex from './flex'

import * as s from './styling'

export namespace CSS {

  export const toolbar = s.style('toolbar', {
      padding: `0 16px 0 0`,
      height: '64px',
      backgroundColor: s.colors.Primary,
      color: s.colors.Contrast,
      boxShadow: `0 2px 2px ${s.colors.FgLighter}`,

      // Doing a little trick to swap out primary and contrast
      '--em-color-primary-save': 'var(--em-color-primary)',
      '--em-color-fg-save': 'var(--em-color-text)',
      '--em-color-contrast-save': 'var(--em-color-contrast)',
    },
    s.child('*', {
      marginLeft: '16px',
      '--em-color-fg': `var(--em-color-contrast)`,
      '--em-color-primary': 'var(--em-color-contrast-save)',
      '--em-color-contrast': `var(--em-color-fg-save)`
    }),
    s.child('h3', {fontSize: '24px'})
  )

}


export function Toolbar(attrs: Attrs, children: DocumentFragment): Element {

  return <div class={[CSS.toolbar, flex.row, flex.alignCenter]}>
      {children}
    </div>;

}
