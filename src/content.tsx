
import {Child, ChildAttributes} from './flex'


export function Content(attrs: ChildAttributes, children: DocumentFragment): Node {

  return <Child {...attrs} class='dm-content'>{children}</Child>;

}
