import {Attrs} from 'elt'
import {cls, rule, combine, s} from 'osun'
import {Css} from './styling'

export function TypographicZone(a: Attrs, ch: DocumentFragment) {
  return <div class={TypographicZone.container}>{ch}</div>
}

export namespace TypographicZone {

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
    color: Css.colors.FG,
    fontSize: '16px'
  })

  export const container = cls('textzone')

  combine(s => s.childOf(container), () => {

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
      color: Css.colors.FG2,
      paddingLeft: '12px',
      borderLeftWidth: '4px',
      borderLeftStyle: 'solid',
      borderLeftColor: Css.colors.PRIMARY3
    })
  })


  rule('::-webkit-scrollbar', {
    width: '8px'
  })

  rule('::-webkit-scrollbar-track', {
    background: Css.colors.PRIMARY6
  })

  rule('::-webkit-scrollbar-thumb', {
    background: Css.colors.PRIMARY5,
    borderRadius: '3px'
  })

}
