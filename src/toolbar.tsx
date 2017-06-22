
import {BasicAttributes} from 'domic';


export function Toolbar(attrs: BasicAttributes, children: DocumentFragment): Element {

  return <div class='dm-toolbar'>
      {children}
    </div>;

}
