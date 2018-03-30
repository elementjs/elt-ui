
import {Attrs} from 'elt'

import {Flex} from './flex'
import {Css} from './styling'

export function Toolbar(attrs: Attrs, children: DocumentFragment): Element {

  return <div class={[Toolbar.container, Flex.row, Flex.align_center]}>
      <div class={[Toolbar.toolbar_main, Flex.row, Flex.align_center, Flex.absolute_grow]}>{children}</div>
    </div>;

}


export namespace Toolbar {
  const s = Css.s

  export const container = Css('toolbar',
    Css.colors.reverse_primary
  )

  export const toolbar_main = Css('toolbar-main',
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
