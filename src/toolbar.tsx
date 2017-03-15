
import {BasicAttributes} from 'domic';


export function Toolbar(attrs: BasicAttributes, children: DocumentFragment): Node {

  return <div class='dm-toolbar'>
      {children}
    </div>;

}
