
import {d} from 'domic'

import {Child, ChildAttributes} from './flex'


export function Content(attrs: ChildAttributes, children: DocumentFragment): Node {

  return <Child {...attrs} class='carbm-content'>{children}</Child>;

}
