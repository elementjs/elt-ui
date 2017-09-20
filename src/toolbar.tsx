
import {Attrs} from 'domic';


export function Toolbar(attrs: Attrs, children: DocumentFragment): Element {

  return <div class='dm-toolbar'>
      {children}
    </div>;

}
