
import { Attrs } from 'elt'

import S from './styling'
import { s, cls } from 'osun';

export function Toolbar(_: Attrs, children: DocumentFragment): Element {

  return <div style={{height: '3rem'}} class={[
    S.contrast_on_tint,
    S.text.bold,
    S.flex.row.align_center.gap.normal,
    S.padding.big.horizontal,
    Toolbar.cls_toolbar,
  ]}>{children}</div>
}

Toolbar.cls_toolbar = cls('toolbar')
s`h3`.childOf(Toolbar.cls_toolbar, {
  fontSize: (S.SIZES.big as any).$size
})