
import { Attrs } from 'elt'

import { Flex } from './flex'
import S from './styling'

export function Toolbar(_: Attrs, children: DocumentFragment): Element {

  return <Flex class={[S.reverse_primary, S.text_bigger]} spacing='16' inner-class={S.padding}>{children}</Flex>

}
