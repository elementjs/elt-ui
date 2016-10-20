
import {d, BasicAttributes} from 'domic';

import './toolbar.styl';

export function Toolbar(attrs: BasicAttributes, children: DocumentFragment): Node {

  return <div class='carbm-toolbar'>
      {children}
    </div>;

}
