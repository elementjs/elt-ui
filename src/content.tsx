
import {Child, ChildAttributes} from './flex'


export function Content(attrs: ChildAttributes, children: DocumentFragment): Element {
  var {$$children, ...a} = attrs
  return <Child {...a} class='em-content'>{children}</Child>;
}
