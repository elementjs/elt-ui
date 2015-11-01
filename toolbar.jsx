
import {elt} from 'elt/node';

import './toolbar.styl';

export function Toolbar(attrs, children) {

  return <div class='eltm-toolbar'>
      {children}
    </div>;

}
