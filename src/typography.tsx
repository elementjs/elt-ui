import { Attrs } from 'elt'
import S from './styling'
import { cls, rule } from 'osun'

export function TypographicZone(a: Attrs, ch: DocumentFragment) {
  return <div class={TypographicZone.container}>{ch}</div>
}

export namespace TypographicZone {

  export const titles = `h1, h2, h3, h4, h5, h6`

  export const container = cls('textzone')
  .firstChild({ marginTop: 0})
  .children({ marginTop: '24px' })
  .children(titles, {
    marginTop: '48px'
  })
  .children('h1', {
    fontSize: 'xx-large',
    fontWeight: 'bold',
  })
  .children('h2', {
    fontSize: 'x-large',
    fontWeight: 'bold',
  })
  .children(`h3`, {
    fontSize: 'large',
    fontWeight: 'bold',
  })
  .children(`h4`, {
    fontSize: 'normal',
    fontWeight: 'bold',
  })
  .children(`h5`, {
    fontSize: 'normal',
    fontWeight: 'bold',
  })
  .children(`h6`, {
    fontSize: 'small',
    fontWeight: 'bold',
  })
  .children(`p`, {
    lineHeight: '20px'
  })
  .children(`b`, {
    fontWeight: 'bold'
  })
  .children(`em`, {
    fontStyle: 'italic'
  })
  .children(`blockquote`, {
    color: S.Fg(0.84),
    paddingLeft: '12px',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    borderLeftColor: S.FG14
  })

  rule`${container} > ${titles} + ${container} ${titles}`({
    marginTop: '24px'
  })
}
