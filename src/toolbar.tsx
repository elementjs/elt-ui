
import {c, BasicAttributes, Appendable, Atom} from 'carbyne';

import './toolbar.styl';

export function Toolbar(attrs: BasicAttributes, children: Appendable): Atom {

  return <div class='carbm-toolbar'>
      {children}
    </div>;

}
