
import {BasicAttributes} from 'domic';


export function Toolbar(attrs: BasicAttributes, children: DocumentFragment): HTMLElement {

  return <div class='dm-toolbar'>
      {children}
    </div>;

}
