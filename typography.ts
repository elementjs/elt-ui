import {cls, rule, combine, s} from 'osun'
import {css as base} from './styling'

export namespace css {

  rule('*', {
    boxSizing: 'border-box'
  })

  rule('html', {
    '--em-color-primary': '63, 81, 181',
    '--em-color-fg': `0, 0, 0`,
    '--em-color-bg': `255, 255, 255`,
    '--em-color-accent': `244, 67, 54`
  })

  rule('html, body', {
    color: base.colors.FG,
    fontSize: '16px'
  })

  export const typographic_zone = cls('textzone')

  combine(s => s.childOf(typographic_zone), () => {

    // cssRule('body, p, button, textarea, select, option', {
    s`body, p, button, textarea, select, option`
    .define({
      fontFamily: `'Roboto', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`,
    })

    s`h1`.define({
      fontSize: '45px',
      fontWeight: 'bold'
    })

    s`h2`.define({
      fontSize: '34px',
      fontWeight: 'bold',
      marginBottom: '32px'
    })

    s`h3`.define({
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '24px'
    })

    s`h4`.define({
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '18px'
    })

    s`h5`.define({
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '16px'
    })

    s`h6`.define({
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '14px'
    })

    s`h1, h2, h3, h4, h5, h6, p, ul`.define({
      textAlign: 'left',
      marginTop: 0,
      marginBottom: '0.625em'
    })

    s`p, ul`.define({
      marginBottom: '16px'
    })

    s`b`.define({
      fontWeight: 'bold'
    })

    s`em`.define({
      fontStyle: 'italic'
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
