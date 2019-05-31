
import { Attrs } from 'elt'

import S from './styling'

export function Toolbar(_: Attrs, children: DocumentFragment): Element {

  return <div class={[
    S.contrast_on_tint,
    S.text.big,
    S.flex.row.align_center,
    S.colgap,
    S.padding.big.horizontal
  ]}>{children}</div>

}
