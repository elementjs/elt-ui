import S from './styling'
import { style, rule } from 'osun';
import { Renderable, Attrs, e } from 'elt'
import { theme } from './colors'

export function Toolbar(_: Attrs<HTMLDivElement>, children: Renderable[]) {

  return <div style={{height: '3rem'}} class={Toolbar.css.toolbar}>{children}</div>
}

export namespace Toolbar.css {

  export const toolbar = style('toolbar',
    theme.derive({bg: 'tint'}),
    S.text.bold,
    S.flex.alignCenter.gappedRow(16),
    S.box.padding(16).paddingHorizontal(16),
  )

  rule `${toolbar} > h3`({
    fontSize: S.SIZE_BIG
  })
}

