
import {c, BasicAttributes, Appendable, Atom} from 'carbyne';

import {Child, ChildAttributes} from './flex'

import './content.styl';

export function Content(attrs: ChildAttributes, children: Appendable): Atom {

  return <Child {...attrs} class='carbm-content'>{children}</Child>;

}
