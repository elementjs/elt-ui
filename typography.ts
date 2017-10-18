import {cssRule} from 'typestyle'

export namespace CSS {

  cssRule('*', {
    boxSizing: 'border-box'
  })

  cssRule('html, body', {
    color: `rgba(0, 0, 0, 0.87)`,
    fontSize: '14px'
  })
  cssRule('body, p, button, textarea, select, option', {
    fontFamily: `'Roboto', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`,
  })

  cssRule('h1', {
    fontSize: '45px'
  })

  cssRule('h2', {
    fontSize: '34px',
    fontWeight: 500,
    marginBottom: '32px'
  })

  cssRule('h3', {
    fontSize: '24px',
    fontWeight: 500,
    marginBottom: '24px'
  })

  cssRule('h4', {
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '18px'
  })

  cssRule('h5', {
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '16px'
  })

  cssRule('h6', {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '14px'
  })

  cssRule('h1, h2, h3, h4, h5, h6, p', {
    textAlign: 'left'
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


}