
import {Attrs} from 'elt'

import * as css from './toolbar.styl'


export function Toolbar(attrs: Attrs, children: DocumentFragment): Element {

  return <div class={css.toolbar}>
      {children}
    </div>;

}
