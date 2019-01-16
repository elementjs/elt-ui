
import { Attrs } from 'elt'

import S from './styling'
import { cls } from 'osun'

export function Toolbar(_: Attrs, children: DocumentFragment): Element {

  return <div class={[S.contrast_on_tint, S.text_bigger, S.align_items_baseline, S.flex_row, S.colgap, Toolbar.cls_pad]}>{children}</div>

}


export namespace Toolbar {
  export const cls_pad = cls('inner-toolbar', {
    padding: '0 16px 0 16px'
  })
}