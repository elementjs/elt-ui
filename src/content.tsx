
import {Child, ChildAttributes} from './flex'


export function Content(attrs: ChildAttributes, children: DocumentFragment): HTMLElement {
  var {$$children, ...a} = attrs
  return <Child {...a} class='dm-content'>{children}</Child>;
}
