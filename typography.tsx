import {Attrs} from 'elt'
import {cls, rule, combine, s} from 'osun'
import {css as base} from './styling'

export function TypographicZone(a: Attrs, ch: DocumentFragment) {
  return <div>{ch}</div>
}

export namespace css {

  rule('*', {
    boxSizing: 'border-box'
  })

  rule('html', {
    '--em-color-primary': '63, 81, 181',
    '--em-color-fg': `0, 0, 0`,
    '--em-color-bg': `255, 255, 255`,
    '--em-color-accent': `244, 67, 54`,
  })

  rule('html, body', {
    color: base.colors.FG,
    fontSize: '16px'
  })

  export const typographic_zone = cls('textzone')

  combine(s => s.childOf(typographic_zone), () => {

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
      color: base.colors.FG2,
      paddingLeft: '12px',
      borderLeftWidth: '4px',
      borderLeftStyle: 'solid',
      borderLeftColor: base.colors.PRIMARY3
    })
  })


  rule('::-webkit-scrollbar', {
    width: '8px'
  })

  rule('::-webkit-scrollbar-track', {
    background: base.colors.PRIMARY6
  })

  rule('::-webkit-scrollbar-thumb', {
    background: base.colors.PRIMARY5,
    borderRadius: '3px'
  })

}
