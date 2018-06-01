import { Attrs } from 'elt'
import { Styling } from './styling'
import { cls, s } from 'osun'

export function TypographicZone(a: Attrs, ch: DocumentFragment) {
  return <div class={TypographicZone.container}>{ch}</div>
}

export namespace TypographicZone {

  export const container = cls('textzone')

  s(container).children(() => {

    s(`*`, {
      marginTop: '24px'
    })

    s(`:first-child`, {
      marginTop: 0
    })

    const titles = s(`h1, h2, h3, h4, h5, h6`, {
      marginTop: '48px'
    })
    titles.after(titles, {
      marginTop: '24px'
    })

    s(`h1`, {
      fontSize: 'xx-large',
      fontWeight: 'bold'
    })

    s(`h2`, {
      fontSize: 'x-large',
      fontWeight: 'bold',
    })

    s(`h3`, {
      fontSize: 'large',
      fontWeight: 'bold',
    })

    s(`h4`, {
      fontSize: 'normal',
      fontWeight: 'bold',
    })

    s(`h5`, {
      fontSize: 'normal',
      fontWeight: 'bold',
    })

    s(`h6`, {
      fontSize: 'small',
      fontWeight: 'bold',
    })

    s(`p`, {
      lineHeight: '20px'
    })

    s(`b`, {
      fontWeight: 'bold'
    })

    s(`em`, {
      fontStyle: 'italic'
    })

    s(`blockquote`, {
      color: Styling.colors.FG2,
      paddingLeft: '12px',
      borderLeftWidth: '4px',
      borderLeftStyle: 'solid',
      borderLeftColor: Styling.colors.PRIMARY3
    })
  })

}
