import { Attrs } from 'elt'
import S from './styling'
import { cls, rule } from 'osun'

export function TypographicZone(a: Attrs, ch: DocumentFragment) {
  return <div class={TypographicZone.css.container}>{ch}</div>
}

export namespace TypographicZone.css {

  export const titles = `h1, h2, h3, h4, h5, h6`

  export const container = cls('textzone')
  rule`${container} > :first-child`({ marginTop: 0 })
  rule`${container} > *`({ marginTop: '24px' })

  rule`${container} > ${titles}`({ marginTop: '48px' })
  rule`${container} > ${titles} + ${container} > ${titles}`({ marginTop: '24px' })

  rule`${container} > h1`({ fontSize: 'xx-large', fontWeight: 'bold', })
  rule`${container} > h2`({ fontSize: 'x-large', fontWeight: 'bold', })
  rule`${container} > h3`({ fontSize: 'large', fontWeight: 'bold', })
  rule`${container} > h4`({ fontSize: 'normal', fontWeight: 'bold', })
  rule`${container} > h5`({ fontSize: 'normal', fontWeight: 'bold', })
  rule`${container} > h6`({ fontSize: 'small', fontWeight: 'bold', })
  rule`${container} > p`({ lineHeight: '20px' })
  rule`${container} > b`({ fontWeight: 'bold' })
  rule`${container} > em`({ fontStyle: 'italic' })
  rule`${container} > blockquote`({
    color: S.Fg(0.84),
    paddingLeft: '12px',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    borderLeftColor: S.FG14
  })

}
