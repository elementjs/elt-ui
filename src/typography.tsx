import S from './styling'
import { style, rule } from 'osun'
import { Attrs, Renderable, e } from 'elt'

export function TypographicZone(a: Attrs<HTMLDivElement>, ch: Renderable[]) {
  return <div class={TypographicZone.css.container}>{ch}</div> as HTMLDivElement
}

export namespace TypographicZone.css {

  export const titles = `h1, h2, h3, h4, h5, h6`

  export const container = style('textzone')
  rule`${container} > :first-child`({ marginTop: 0 })
  rule`${container} > *`({ marginTop: '24px' })

  rule`${container} > ${titles}`({ marginTop: '48px' })
  rule`${container} > ${titles} + ${container} > ${titles}`({ marginTop: '24px' })

  rule`${container} > h1`({ fontSize: 'xx-large', fontWeight: 'bolder', })
  rule`${container} > h2`({ fontSize: 'x-large', fontWeight: 'bolder', })
  rule`${container} > h3`({ fontSize: 'large', fontWeight: 'bolder', })
  rule`${container} > h4`({ fontSize: 'normal', fontWeight: 'bolder', })
  rule`${container} > h5`({ fontSize: 'normal', fontWeight: 'bolder', })
  rule`${container} > h6`({ fontSize: 'small', fontWeight: 'bolder', })
  rule`${container} > p`({ lineHeight: '20px' })
  rule`${container} > b`({ fontWeight: 'bolder' })
  rule`${container} > em`({ fontStyle: 'italic' })
  rule`${container} > blockquote`({
    color: S.Fg(0.84),
    paddingLeft: '12px',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    borderLeftColor: S.FG14
  })

}
