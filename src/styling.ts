
import {style, CSSProperties, raw, rule } from 'osun'
import * as helpers from 'osun/lib/helpers'

declare module 'csstype' {

  interface PropertiesFallback {

    '--eltui-ratio'?: string

    '--eltui-colors-fg'?: string
    '--eltui-colors-tint'?: string
    '--eltui-colors-bg'?: string
    // Bottom of this is color.
  }
}


export interface ColorTheme {
  tint: string
  fg: string
  bg: string
  // contrast: string
}


export namespace Styling {

  export const box = helpers.box
  export const flex = helpers.flex
  export const text = helpers.text
  export const grid = helpers.grid

  export const RATIO = 1.618033

  export const VAR_RATIO = '--eltui-ratio'
  export const VAR_FG = '--eltui-colors-fg'
  export const VAR_TINT = '--eltui-colors-tint'
  export const VAR_BG = '--eltui-colors-bg'

  export function toRGB(s: string | [number, number, number]): string {
    if (Array.isArray(s))
      return `${s[0], s[1], s[2]}`
    if (s[0] === '#')
      s = s.slice(1)
    if (s.length !== 6)
      return s
    return `${parseInt(s.slice(0, 2), 16)}, ${parseInt(s.slice(2, 4), 16)}, ${parseInt(s.slice(4, 6), 16)}`
  }

  export function SetTheme(theme: ColorTheme) {
    return {
      '--eltui-colors-tint': toRGB(theme.tint),
      '--eltui-colors-fg': toRGB(theme.fg),
      '--eltui-colors-bg': toRGB(theme.bg),
      // backgroundColor: 'rgba(var(--eltui-colors-bg))',
      color: 'rgba(var(--eltui-colors-fg), 1)',
    } as CSSProperties
  }

  export function SetTint(tint: string) {
    return {
      '--eltui-colors-tint': toRGB(tint),
    } as CSSProperties
  }

  export function SetFg(tint: string) {
    return {
      '--eltui-colors-fg': toRGB(tint)
    } as CSSProperties
  }

  export function SetBg(tint: string) {
    return {
      '--eltui-colors-bg': toRGB(tint)
    } as CSSProperties
  }

  export function SetContrast(tint: string) {
    return {
      '--eltui-colors-contrast': toRGB(tint)
    } as CSSProperties
  }

  export const Tint = (alpha: number = 1) => `rgba(var(--eltui-colors-tint), ${alpha})`
  export const Fg = (alpha: number = 1) => `rgba(var(--eltui-colors-fg), ${alpha})`
  export const Bg = (alpha: number = 1) => `rgba(var(--eltui-colors-bg), ${alpha})`

  export const TINT = Tint()
  export const TINT75 = Tint(0.75)
  export const TINT50 = Tint(0.5)
  export const TINT14 = Tint(0.14)
  export const TINT07 = Tint(0.07)

  export const FG = Fg()
  export const FG75 = Fg(0.75)
  export const FG50 = Fg(0.50)
  export const FG14 = Fg(0.14)
  export const FG07 = Fg(0.07)

  export const BG = Bg()
  export const BG75 = Bg(0.75)
  export const BG50 = Bg(0.50)
  export const BG14 = Bg(0.14)
  export const BG07 = Bg(0.07)

  export const SIZE_VERY_TINY = `0.4rem`
  export const SIZE_TINY = `0.6rem`
  export const SIZE_VERY_SMALL = `0.8rem`
  export const SIZE_SMALL = `0.9rem`
  export const SIZE_NORMAL = `1rem`
  export const SIZE_BIG = `1.2rem`
  export const SIZE_VERY_BIG = `1.5rem`
  export const SIZE_HUGE = `2rem`
  export const SIZE_VERY_HUGE = `3rem`
  export const SIZE_PX6 = `6px`
  export const SIZE_PX4 = `4px`
  export const SIZE_PX3 = `3px`
  export const SIZE_PX2 = `2px`
  export const SIZE_PX1 = `1px`

  export const contrast_on_tint = style('tint-reverse', {
    // '--eltui-colors-current-tint': 'var(--eltui-colors-contrast)',
    // '--eltui-colors-current-fg': 'var(--eltui-colors-contrast)',
    // '--eltui-colors-current-bg': 'var(--eltui-colors-tint)',
    color: FG,
    background: BG
  })

  export const TRANSPARENT = `rgba(0, 0, 0, 0)`

  export const control = style('control', {
    fontSize: '16px',
    display: 'inline-block',
    WebkitTapHighlightColor: Styling.TRANSPARENT,
    position: 'relative', // needed for inking.
    // background: BG
  }, box.padding('4px 12px'))

}

// Reset !
raw(`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center, button, input,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
	display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`)

rule`*`({
  boxSizing: 'border-box'
})

rule`:root`({
  '--eltui-colors-tint': '63, 81, 181',
  '--eltui-colors-fg': `0, 0, 0`,
  '--eltui-colors-bg': `255, 255, 255`,
  // '--eltui-colors-contrast': `255, 255, 255`,
  // '--eltui-colors-current-fg': `var(--eltui-colors-fg)`,
  // '--eltui-colors-current-tint': `var(--eltui-colors-tint)`,
  // '--eltui-colors-current-bg': `var(--eltui-colors-bg)`,
  // '--eltui-colors-accent': `244, 67, 54`,
  color: Styling.FG,
  background: Styling.BG,
  fontSize: '16px'
})

rule`button, input, select, textarea`({
  fontSize: 'inherit'
})

rule`::-webkit-scrollbar`({
  width: 'calc(1rem / 2)'
})

rule`::-webkit-scrollbar-track`({
  background: Styling.TINT07
})

rule`::-webkit-scrollbar-thumb`({
  background: Styling.Tint(0.24),
  borderRadius: 'calc(1rem / 4)'
})

export default Styling
