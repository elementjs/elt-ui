
import { Attrs } from 'elt'

import { Flex } from './flex'
import S from './styling'
import { cls } from 'osun'

export function Toolbar(_: Attrs, children: DocumentFragment): Element {

  return <Flex class={[S.contrast_on_tint, S.text_bigger]} spacing='16' inner-class={Toolbar.cls_inner_toolbar} align='center'>{children}</Flex>

}


export namespace Toolbar {
  export const cls_inner_toolbar = cls('inner-toolbar', {
    padding: '0 16px 0 16px'
  })
}