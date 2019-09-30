
import { Attrs } from 'elt'

import S from './styling'
import { cls } from 'osun';

export function Toolbar(_: Attrs, children: DocumentFragment): Element {

  return <div style={{height: '3rem'}} class={[
    S.contrast_on_tint,
    S.text.bold,
    S.flex.row.alignCenter.gap('16px'),
    S.box.padding('16px').paddingHorizontal('16px'),
    Toolbar.cls_toolbar,
  ]}>{children}</div>
}

Toolbar.cls_toolbar = cls('toolbar')
.children('h3', {
  fontSize: (S.SIZES.big as any).$size
})
