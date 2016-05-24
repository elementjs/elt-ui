
import {c, BasicAttributes, Appendable, Atom} from 'carbyne';

import './content.styl';

export function Content(attrs: BasicAttributes, children: Appendable): Atom {

  return <div class='carbm-content'>{children}</div>;

}
