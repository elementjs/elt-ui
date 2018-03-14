
import {Attrs} from 'elt'

import {cls, s} from 'osun'
import {css as flex} from './flex'
import {css as base} from './styling'

export namespace css {

  export const toolbar = cls('toolbar',
    base.colors.reverse_primary
  )

  export const toolbar_main = cls('toolbar-main',
    {
      fontSize: '24px',
      padding: `0 16px 0 0`,
      height: '64px',
    },
  )

  s`*`.childOf(toolbar_main, {
    marginLeft: '16px'
  })

  s`h3`.childOf(toolbar_main, {fontSize: '24px', margin: '0 0 0 16px', padding: 0})

}


export function Toolbar(attrs: Attrs, children: DocumentFragment): Element {

  return <div class={[css.toolbar, flex.row, flex.align_center]}>
      <div class={[css.toolbar_main, flex.row, flex.align_center, flex.absoluteGrow]}>{children}</div>
    </div>;

}
