import {cssRule} from 'typestyle'
import s from './styling'

export namespace CSS {

  cssRule('*', {
    boxSizing: 'border-box'
  })

  cssRule('html', {
    '--em-color-primary': '63, 81, 181',
    '--em-color-fg': `0, 0, 0`,
    '--em-color-bg': `255, 255, 255`,
    '--em-color-accent': `244, 67, 54`
  })

  cssRule('html, body', {
    color: s.colors.Fg,
    fontSize: '16px'
  })

  cssRule('body, p, button, textarea, select, option', {
    fontFamily: `'Roboto', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`,
  })

  cssRule('h1', {
    fontSize: '45px',
    fontWeight: 'bold'
  })

  cssRule('h2', {
    fontSize: '34px',
    fontWeight: 'bold',
    marginBottom: '32px'
  })

  cssRule('h3', {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px'
  })

  cssRule('h4', {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '18px'
  })

  cssRule('h5', {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '16px'
  })

  cssRule('h6', {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '14px'
  })

  cssRule('h1, h2, h3, h4, h5, h6, p, ul', {
    textAlign: 'left',
    marginTop: 0,
    marginBottom: '0.625em'
  })

  cssRule('p, ul', {
    marginBottom: '16px'
  })

  cssRule('b', {
    fontWeight: 'bold'
  })

  cssRule('em', {
    fontStyle: 'italic'
  })

  cssRule('::-webkit-scrollbar', {
    width: '8px'
  })

  cssRule('::-webkit-scrollbar-track', {
    background: s.colors.Primary6
  })

  cssRule('::-webkit-scrollbar-thumb', {
    background: s.colors.Primary5,
    borderRadius: '3px'
  })

}