
import { Attrs } from 'elt'

import S from './styling'
import { style, rule } from 'osun';

export function Toolbar(_: Attrs, children: DocumentFragment): Element {

  return <div style={{height: '3rem'}} class={[
    S.contrast_on_tint,
    S.text.bold,
    S.flex.row.alignCenter.gap('16px'),
    S.box.padding('16px').paddingHorizontal('16px'),
    Toolbar.css.toolbar,
  ]}>{children}</div>
}

export namespace Toolbar.css {
  export const toolbar = style('toolbar')
  rule `${toolbar} > h3`({
    fontSize: S.SIZES.big
  })
}

