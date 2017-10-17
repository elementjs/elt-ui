
import {Attrs} from 'elt'


export function Toolbar(attrs: Attrs, children: DocumentFragment): Element {

  return <div class='em-toolbar'>
      {children}
    </div>;

}
