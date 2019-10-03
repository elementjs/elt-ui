
import { Attrs } from 'elt'

import S from './styling'
import { style, rule } from 'osun';

export function Toolbar(_: Attrs, children: DocumentFragment): Element {

  return <div style={{height: '3rem'}} class={Toolbar.css.toolbar}>{children}</div>
}

export namespace Toolbar.css {

  export const toolbar = style('toolbar',
    S.contrast_on_tint,
    S.text.bold,
    S.flex.row.alignCenter.gap(16),
    S.box.padding(16).paddingHorizontal(16),
  )

  rule `${toolbar} > h3`({
    fontSize: S.SIZES.big
  })
}

