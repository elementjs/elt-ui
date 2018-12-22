
import {cls, s, CSSProperties, raw, rule} from 'osun'


export namespace Styling {

  export function toRGB(str: string): string {
    if (str.indexOf(',') > -1) return str
    str = str.trim().toLowerCase()
    if (str[0] === '#') str = str.slice(1)
    const R = parseInt(str.slice(0, 2), 16)
    const G = parseInt(str.slice(2, 4), 16)
    const B = parseInt(str.slice(4, 6), 16)
    return `${R}, ${G}, ${B}`
  }

  export function SetPrimary(value: string) { return {
    '--eltui-color-primary': toRGB(value),
    '--eltui-color-reverse-bg': toRGB(value)
  } }
  export function SetFg(value: string) { return {'--eltui-color-fg': toRGB(value)} }
  export function SetBg(value: string) { return {'--eltui-color-bg': toRGB(value)} }

  export function SetReversePrimary(value: string) { return {'--eltui-color-reverse-primary': toRGB(value)} }
  export function SetReverseFg(value: string) { return {'--eltui-color-reverse-fg': toRGB(value)} }
  export function SetReverseBg(value: string) { return {'--eltui-color-reverse-bg': toRGB(value)} }

  export function SimpleTheme(
    primary: string,
    fg: string = '#3c3c3b',
    bg: string = '#ffffff') {
      return {
        '--eltui-color-primary': toRGB(primary),
        '--eltui-color-fg': toRGB(fg),
        '--eltui-color-bg': toRGB(bg),
        '--eltui-color-reverse-primary': toRGB(bg),
        '--eltui-color-reverse-fg': toRGB(bg),
        '--eltui-color-reverse-bg': toRGB(primary)
      } as CSSProperties
  }

  export const PRIMARY = `rgba(var(--eltui-color-primary), 1)`
  export const PRIMARY2 = `rgba(var(--eltui-color-primary), 0.74)`
  export const PRIMARY3 = `rgba(var(--eltui-color-primary), 0.54)`
  export const PRIMARY4 = `rgba(var(--eltui-color-primary), 0.24)`
  export const PRIMARY5 = `rgba(var(--eltui-color-primary), 0.14)`
  export const PRIMARY6 = `rgba(var(--eltui-color-primary), 0.07)`

  export const BG = `rgba(var(--eltui-color-bg), 1)`
  export const BG2 = `rgba(var(--eltui-color-bg), 0.74)`
  export const BG3 = `rgba(var(--eltui-color-bg), 0.54)`
  export const BG4 = `rgba(var(--eltui-color-bg), 0.24)`
  export const BG5 = `rgba(var(--eltui-color-bg), 0.14)`
  export const BG6 = `rgba(var(--eltui-color-bg), 0.07)`

  export const FG = `rgba(var(--eltui-color-fg), 1)`
  export const FG2 = `rgba(var(--eltui-color-fg), 0.74)`
  export const FG3 = `rgba(var(--eltui-color-fg), 0.54)`
  export const FG4 = `rgba(var(--eltui-color-fg), 0.24)`
  export const FG5 = `rgba(var(--eltui-color-fg), 0.14)`
  export const FG6 = `rgba(var(--eltui-color-fg), 0.07)`

  export const TRANSPARENT = `rgba(0, 0, 0, 0)`

  export const reverse_primary = cls('reverse_primary', {
    // Doing a little trick to swap out primary and contrast
    '--eltui-color-reverse-primary': 'var(--eltui-color-bg)',
    '--eltui-color-reverse-fg': 'var(--eltui-color-bg)',
    '--eltui-color-reverse-bg': 'var(--eltui-color-primary)',
    color: BG,
    backgroundColor: PRIMARY
  })

  s`*`.childOf(reverse_primary, {
    '--eltui-color-bg': 'var(--eltui-color-reverse-bg)',
    '--eltui-color-fg': 'var(--eltui-color-reverse-fg)',
    '--eltui-color-primary': 'var(--eltui-color-reverse-primary)',
    color: FG,
    // backgroundColor: BG
  })

  export const text_italic = cls('italic', {fontStyle: 'italic'})
  export const text_oblique = cls('oblique', {fontStyle: 'oblique'})
  export const text_uppercase = cls('uppercase', {textTransform: 'uppercase'})
  export const text_lowercase = cls('lowercase', {textTransform: 'lowercase'})
  export const text_capitalize = cls('capitalize', {textTransform: 'capitalize'})

  export const text_bold = cls('bold', {fontWeight: 'bold'})

  export const text_big = cls('small', {fontSize: '18px'})
  export const text_bigger = cls('bigger', {fontSize: '22px'})
  export const text_very_big = cls('very_big', {fontSize: '28px'})
  export const text_huge = cls('huge', {fontSize: '48px'})
  export const text_very_huge = cls('very-huge', {fontSize: '64px'})

  export const text_small = cls('small', {fontSize: '14px'})
  export const text_smaller = cls('smaller', {fontSize: '12px'})
  export const text_verysmall = cls('very-small', {fontSize: '10px'})

  export const text_centered = cls('text-center', {textAlign: 'center'})
  export const text_right = cls('text-right', {textAlign: 'right'})
  export const text_justified = cls('text-right', {textAlign: 'justify'})

  export const text_fg = cls('text-fg', {color: FG})
  export const text_fg2 = cls('text-fg2', {color: FG2})
  export const text_fg3 = cls('text-fg3', {color: FG3})
  export const text_fg4 = cls('text-fg4', {color: FG4})
  export const text_fg5 = cls('text-fg5', {color: FG5})
  export const text_fg6 = cls('text-fg6', {color: FG6})

  export const text_primary = cls('text-primary', {color: PRIMARY})
  export const text_primary2 = cls('text-primary2', {color: PRIMARY2})
  export const text_primary3 = cls('text-primary3', {color: PRIMARY3})
  export const text_primary4 = cls('text-primary4', {color: PRIMARY4})
  export const text_primary5 = cls('text-primary5', {color: PRIMARY5})
  export const text_primary6 = cls('text-primary6', {color: PRIMARY6})

  export const text_bg = cls('text-bg', {color: BG})
  export const text_bg2 = cls('text-bg2', {color: BG2})
  export const text_bg3 = cls('text-bg3', {color: BG3})
  export const text_bg4 = cls('text-bg4', {color: BG4})
  export const text_bg5 = cls('text-bg5', {color: BG5})
  export const text_bg6 = cls('text-bg6', {color: BG6})

  export const bg_primary = cls('bg-primary', {backgroundColor: PRIMARY})
  export const bg_primary2 = cls('bg-primary2', {backgroundColor: PRIMARY2})
  export const bg_primary3 = cls('bg-primary3', {backgroundColor: PRIMARY3})
  export const bg_primary4 = cls('bg-primary4', {backgroundColor: PRIMARY4})
  export const bg_primary5 = cls('bg-primary5', {backgroundColor: PRIMARY5})
  export const bg_primary6 = cls('bg-primary6', {backgroundColor: PRIMARY6})

  export const bg_bg = cls('bg-bg', {backgroundColor: BG})
  export const bg_bg2 = cls('bg-bg2', {backgroundColor: BG2})
  export const bg_bg3 = cls('bg-bg3', {backgroundColor: BG3})
  export const bg_bg4 = cls('bg-bg4', {backgroundColor: BG4})
  export const bg_bg5 = cls('bg-bg5', {backgroundColor: BG5})
  export const bg_bg6 = cls('bg-bg6', {backgroundColor: BG6})

  function mkborder(col: string) {
    return {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: col
    } as CSSProperties
  }

  export const border_fg = cls('border-fg', mkborder(FG))
  export const border_bg = cls('border-fg', mkborder(BG))
  export const border_primary = cls('border-fg', mkborder(PRIMARY))
  export const border_fg5 = cls('border-fg', mkborder(FG5))
  export const border_bg5 = cls('border-fg', mkborder(BG5))
  export const border_primary5 = cls('border-fg', mkborder(PRIMARY5))

  export const no_spurious_borders = cls('no-spurious-borders', {
    '-webkit-tap-highlight-color': TRANSPARENT,
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

  const pad = (n: number) => cls(`padding${n}`, {padding: `${n / 1.618}px ${n}px`})
  export const padding0 = pad(0)
  export const padding4 = pad(4)
  export const padding8 = pad(8)
  export const padding16 = pad(16)
  export const padding24 = pad(24)
  export const padding32 = pad(32)

  const mar = (n: number) => cls(`margin${n}`, {margin: `${n / 1.618}px ${n}px`})
  export const margin0 = mar(0)
  export const margin4 = mar(4)
  export const margin8 = mar(8)
  export const margin16 = mar(16)
  export const margin24 = mar(24)
  export const margin32 = mar(32)

  export const control = cls('control', {
    fontSize: '16px',
    display: 'inline-block',
    '-webkit-tap-highlight-color': Styling.TRANSPARENT,
    position: 'relative', // needed for inking.
    background: BG
  }, padding8)

  const curs = (s: string) => cls(`cursor-${s}`, {cursor: s})
  export const cursor_pointer = curs('pointer')
  export const cursor_help = curs('help')
  export const cursor_move = curs('move')
  export const cursor_grab = curs('grab')
  export const cursor_grabbing = curs('grabbing')
  export const cursor_progress = curs('progress')
  export const cursor_row_resize = curs('row-resize')
  export const cursor_text = curs('text')
  export const cursor_zoom_in = curs('zoom-in')
  export const cursor_zoom_out = curs('zoom-out')

  const pos = (s: string) => cls(`position-${s}`, {position: s as any})
  export const position_relative = pos('relative')
  export const position_absolute = pos('absolute')
  export const position_sticky = pos('sticky')
  export const position_fixed = pos('fixed')

  export const pointer_events_none = cls('no-pointer-events', {pointerEvents: 'none'})

  export const raised = cls('raised', {boxShadow: `0 2px 2px ${FG3}`})

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

declare module 'osun/lib/types' {
  interface CSSProperties {

    '--eltui-color-primary'?: string
    '--eltui-color-fg'?: string
    '--eltui-color-bg'?: string
    '--eltui-color-accent'?: string
    '--eltui-color-reverse-fg'?: string
    '--eltui-color-reverse-bg'?: string
    '--eltui-color-reverse-accent'?: string
    '--eltui-color-reverse-primary'?: string
  }
}

rule('*', {
  boxSizing: 'border-box'
})

rule('html', {
  '--eltui-color-primary': '63, 81, 181',
  '--eltui-color-fg': `0, 0, 0`,
  '--eltui-color-bg': `255, 255, 255`,
  '--eltui-color-accent': `244, 67, 54`,
})

rule('html, body', {
  color: Styling.FG,
  fontSize: '16px'
})

rule('button, input, select, textarea', {
  fontSize: 'inherit'
})

rule('::-webkit-scrollbar', {
  width: '8px'
})

rule('::-webkit-scrollbar-track', {
  background: Styling.PRIMARY6
})

rule('::-webkit-scrollbar-thumb', {
  background: Styling.PRIMARY5,
  borderRadius: '3px'
})



export default Styling
