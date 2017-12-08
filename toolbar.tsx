
import {Attrs} from 'elt'

import flex from './flex'

import s from './styling'

export namespace CSS {

  export const toolbar = s.style('toolbar', {
      padding: `0 16px 0 0`,
      height: '64px',
    },
    s.colors.ReversePrimary
  )

  export const toolbarMain = s.style('toolbar-main',
    {fontSize: '24px'},
    s.child('h3', {fontSize: '24px'}),
    s.child('*', {marginLeft: '16px'})
  )

}


export function Toolbar(attrs: Attrs, children: DocumentFragment): Element {

  return <div class={[CSS.toolbar, flex.row, flex.alignCenter]}>
      <div class={[CSS.toolbarMain, flex.row, flex.alignCenter, flex.absoluteGrow]}>{children}</div>
    </div>;

}
