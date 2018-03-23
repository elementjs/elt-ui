
import {cls, s, raw} from 'osun'

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

declare module 'osun/lib/types' {
  interface CSSProperties {

    '--em-color-primary'?: string
    '--em-color-fg'?: string
    '--em-color-bg'?: string
    '--em-color-accent'?: string

    '--em-color-primary-save'?: string
    '--em-color-fg-save'?: string
    '--em-color-bg-save'?: string
    '--em-color-accent-save'?: string
  }
}


export namespace css {

  export namespace colors {

    export function toRGB(str: string): string {
      if (str.indexOf(',') > -1) return str
      str = str.trim().toLowerCase()
      if (str[0] === '#') str = str.slice(1)
      const R = parseInt(str.slice(0, 2), 16)
      const G = parseInt(str.slice(2, 4), 16)
      const B = parseInt(str.slice(4, 6), 16)
      return `${R}, ${G}, ${B}`
    }

    export function SetPrimary(value: string) { return {'--em-color-primary': toRGB(value)} }
    export function SetAccent(value: string) { return {'--em-color-accent': toRGB(value)} }
    export function SetFg(value: string) { return {'--em-color-fg': toRGB(value)} }
    export function SetBg(value: string) { return {'--em-color-bg': toRGB(value)} }

    export const ACCENT = `rgba(var(--em-color-accent), 1)`
    export const ACCENT2 = `rgba(var(--em-color-accent), 0.74)`
    export const ACCENT3 = `rgba(var(--em-color-accent), 0.54)`
    export const ACCENT4 = `rgba(var(--em-color-accent), 0.24)`
    export const ACCENT5 = `rgba(var(--em-color-accent), 0.14)`
    export const ACCENT6 = `rgba(var(--em-color-accent), 0.07)`

    export const PRIMARY = `rgba(var(--em-color-primary), 1)`
    export const PRIMARY2 = `rgba(var(--em-color-primary), 0.74)`
    export const PRIMARY3 = `rgba(var(--em-color-primary), 0.54)`
    export const PRIMARY4 = `rgba(var(--em-color-primary), 0.24)`
    export const PRIMARY5 = `rgba(var(--em-color-primary), 0.14)`
    export const PRIMARY6 = `rgba(var(--em-color-primary), 0.07)`

    export const BG = `rgba(var(--em-color-bg), 1)`
    export const BG2 = `rgba(var(--em-color-bg), 0.74)`
    export const BG3 = `rgba(var(--em-color-bg), 0.54)`
    export const BG4 = `rgba(var(--em-color-bg), 0.24)`
    export const BG5 = `rgba(var(--em-color-bg), 0.14)`
    export const BG6 = `rgba(var(--em-color-bg), 0.07)`

    export const FG = `rgba(var(--em-color-fg), 1)`
    export const FG2 = `rgba(var(--em-color-fg), 0.74)`
    export const FG3 = `rgba(var(--em-color-fg), 0.54)`
    export const FG4 = `rgba(var(--em-color-fg), 0.24)`
    export const FG5 = `rgba(var(--em-color-fg), 0.14)`
    export const FG6 = `rgba(var(--em-color-fg), 0.07)`

    export const TRANSPARENT = `rgba(0, 0, 0, 0)`

    export const reverse_primary = cls('reverse_primary', {
      backgroundColor: PRIMARY,
      color: BG,

      // Doing a little trick to swap out primary and contrast
      '--em-color-primary-save': 'var(--em-color-primary)',
      '--em-color-fg-save': 'var(--em-color-fg)',
      '--em-color-bg-save': 'var(--em-color-bg)'
    })

    s`*`.childOf(reverse_primary).define({
      '--em-color-fg': `var(--em-color-bg-save)`,
      '--em-color-primary': 'var(--em-color-bg-save)',
      '--em-color-bg': 'var(--em-color-primary-save)'
    })
  }


  export namespace text {
    export const bold = cls('bold', {fontWeight: 'bold'})

    export const big = cls('small', {fontSize: '18px'})
    export const bigger = cls('bigger', {fontSize: '22px'})
    export const very_big = cls('very_big', {fontSize: '28px'})

    export const small = cls('small', {fontSize: '14px'})
    export const smaller = cls('smaller', {fontSize: '12px'})
    export const verysmall = cls('very-small', {fontSize: '10px'})

    export const centered = cls('text-center', {textAlign: 'center'})
    export const right = cls('text-right', {textAlign: 'right'})
    export const justified = cls('text-right', {textAlign: 'justify'})

    export const fg = cls('text-fg', {color: colors.FG})
    export const fg2 = cls('text-fg2', {color: colors.FG2})
    export const fg3 = cls('text-fg3', {color: colors.FG3})
    export const fg4 = cls('text-fg4', {color: colors.FG4})
    export const fg5 = cls('text-fg5', {color: colors.FG5})
    export const fg6 = cls('text-fg6', {color: colors.FG6})

    export const primary = cls('text-primary', {color: colors.PRIMARY})
    export const primary2 = cls('text-primary2', {color: colors.PRIMARY2})
    export const primary3 = cls('text-primary3', {color: colors.PRIMARY3})
    export const primary4 = cls('text-primary4', {color: colors.PRIMARY4})
    export const primary5 = cls('text-primary5', {color: colors.PRIMARY5})
    export const primary6 = cls('text-primary6', {color: colors.PRIMARY6})

    export const bg = cls('text-bg', {color: colors.BG})
    export const bg2 = cls('text-bg2', {color: colors.BG2})
    export const bg3 = cls('text-bg3', {color: colors.BG3})
    export const bg4 = cls('text-bg4', {color: colors.BG4})
    export const bg5 = cls('text-bg5', {color: colors.BG5})
    export const bg6 = cls('text-bg6', {color: colors.BG6})

    export const accent = cls('text-accent', {color: colors.ACCENT})
    export const accent2 = cls('text-accent2', {color: colors.ACCENT2})
    export const accent3 = cls('text-accent3', {color: colors.ACCENT3})
    export const accent4 = cls('text-accent4', {color: colors.ACCENT4})
    export const accent5 = cls('text-accent5', {color: colors.ACCENT5})
    export const accent6 = cls('text-accent6', {color: colors.ACCENT6})
  }


  export namespace background {
    export const primary = cls('bg-primary', {backgroundColor: colors.PRIMARY})
    export const primary2 = cls('bg-primary2', {backgroundColor: colors.PRIMARY2})
    export const primary3 = cls('bg-primary3', {backgroundColor: colors.PRIMARY3})
    export const primary4 = cls('bg-primary4', {backgroundColor: colors.PRIMARY4})
    export const primary5 = cls('bg-primary5', {backgroundColor: colors.PRIMARY5})
    export const primary6 = cls('bg-primary6', {backgroundColor: colors.PRIMARY6})
  }


  export const no_spurious_borders = cls('no-spurious-borders', {
    '-webkit-tap-highlight-color': colors.TRANSPARENT,
    'outline': 0
  })

  export const no_native_appearance = cls('no-native-appearance', {
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    appearance: 'none'
  })

  export const full_width = cls('full-width', {width: '100%'})
  export const full_height = cls('full-height', {height: '100%'})
  export const full_screen = cls('fullscreen', {
    width: '100%', height: '100%', position: 'fixed',
    left: 0,
    top: 0,
    transformOrigin: '50% 50%'
  })
  export const display_none = cls('display-none', {display: 'none'})

  export const padded = cls('padded', {padding: '16px'})
  export const bold = cls('bold', {fontWeight: 'bold'})
  export const raised = cls('raised', {boxShadow: `0 2px 2px ${colors.FG3}`})
  export const cursor_pointer = cls('cursor-pointer', {cursor: 'pointer'})
  export const relative = cls('relative', {position: 'relative'})
  export const absolute = cls('absolute', {position: 'absolute'})
  export const no_pointer_events = cls('no-pointer-events', {pointerEvents: 'none'})

}

export default css
