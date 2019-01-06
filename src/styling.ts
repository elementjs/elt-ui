
import {cls, s, CSSProperties, raw, rule} from 'osun'


// background
// text
// color
// text on color -- for reverse ?
// current-bg (color or background)
// current-fg (color or text-on-color or text)

// text_on_color

export const RATIO = 1.618033
// export const RATIO = 16 / 9

declare module 'osun/lib/types' {

  interface CSSProperties {

    '--eltui-ratio'?: string

    '--eltui-colors-current-fg'?: string
    '--eltui-colors-current-bg'?: string
    '--eltui-colors-current-tint'?: string

    '--eltui-colors-fg'?: string
    '--eltui-colors-tint'?: string
    '--eltui-colors-bg'?: string
    '--eltui-colors-contrast'?: string
    // Bottom of this is color.
  }
}


export interface colorTheme {
  tint: string
  text: string
  background: string
  contrast: string
}


export namespace Styling {

  export function Setcolor(theme: colorTheme) {
    return cls(`set-color-x`, {
      '--eltui-colors-tint': theme.tint,
      '--eltui-colors-fg': theme.text,
      '--eltui-colors-bg': theme.background,
      '--eltui-colors-contrast': theme.contrast
    })
  }

  export const Tint = (alpha: number = 1) => `rgba(var(--eltui-colors-current-color), ${alpha})`
  export const Fg = (alpha: number = 1) => `rgba(var(--eltui-colors-current-fg), ${alpha})`
  export const Bg = (alpha: number = 1) => `rgba(var(--eltui-colors-current-bg), ${alpha})`

  export const TINT = Tint()
  export const TINT75 = Tint(0.75)
  export const TINT50 = Tint(0.50)
  export const TINT25 = Tint(0.25)
  export const TINT07 = Tint(0.07)

  export const FG = Fg()
  export const FG75 = Fg(0.75)
  export const FG50 = Fg(0.50)
  export const FG25 = Fg(0.25)
  export const FG07 = Fg(0.07)

  export const BG = Bg()
  export const BG75 = Bg(0.75)
  export const BG50 = Bg(0.50)
  export const BG25 = Bg(0.25)
  export const BG07 = Bg(0.07)

  const bg = (name: string, s: string) => cls(`background-${name}`, {backgroundColor: s})
  export const background_tint = bg('tint', TINT)
  export const background_tint75 = bg('tint75', TINT75)
  export const background_tint50 = bg('tint50', TINT50)
  export const background_tint14 = bg('tint25', TINT25)
  export const background_tint07 = bg('tint07', TINT07)

  export const background_fg = bg('fg', FG)
  export const background_fg75 = bg('fg75', FG75)
  export const background_fg50 = bg('fg50', FG50)
  export const background_fg14 = bg('fg25', FG25)
  export const background_fg07 = bg('fg07', FG07)

  export const background_bg = bg('bg', BG)
  export const background_bg75 = bg('bg75', BG75)
  export const background_bg50 = bg('bg50', BG50)
  export const background_bg14 = bg('bg25', BG25)
  export const background_bg07 = bg('bg07', BG07)

  const txt = (name: string, s: string) => cls(`color-${name}`, {color: s})
  export const color_tint = txt('tint', TINT)
  export const color_tint75 = txt('tint75', TINT75)
  export const color_tint50 = txt('tint50', TINT50)
  export const color_tint14 = txt('tint25', TINT25)
  export const color_tint07 = txt('tint07', TINT07)

  export const color_fg = txt('fg', FG)
  export const color_fg75 = txt('fg75', FG75)
  export const color_fg50 = txt('fg50', FG50)
  export const color_fg14 = txt('fg25', FG25)
  export const color_fg07 = txt('fg07', FG07)

  export const color_bg = txt('bg', BG)
  export const color_bg75 = txt('bg75', BG75)
  export const color_bg50 = txt('bg50', BG50)
  export const color_bg25 = txt('bg25', BG25)
  export const color_bg07 = txt('bg07', BG07)

  export const TRANSPARENT = `rgba(0, 0, 0, 0)`

  export const swap_contrast_color = cls('swap-contrast-color', {
    '--eltui-colors-current-bg': 'var(--eltui-colors-tint)',
    '--eltui-colors-current-fg': 'var(--eltui-colors-contrast)',
    '--eltui-colors-current-tint': 'var(--eltui-colors-contrast)'
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

  function mkborder(col: string) {
    return {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: col
    } as CSSProperties
  }

  export const border_text_color = cls('border-fg', mkborder(FG))
  export const border_background_color = cls('border-fg', mkborder(BG))
  export const border_color = cls('border-fg', mkborder(TINT))

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

  const pad = (n: number) => cls(`padding${n}`, {padding: `${n / RATIO}rem ${n}rem`})
  export const padding0 = cls('padding-0', {padding: '0'})
  export const padding_1 = pad(RATIO)
  export const padding = pad(1)
  export const padding2 = pad(2)
  export const padding3 = pad(3)
  export const padding4 = pad(4)

  const mar = (n: number) => cls(`margin${n}`, {margin: `${n / RATIO}px ${n}px`})
  export const margin0 = cls('margin0', {margin: '0'})
  export const margin_1 = mar(RATIO)
  export const margin = mar(1)
  export const margin2 = mar(2)
  export const margin3 = mar(3)
  export const margin4 = mar(4)

  export const control = cls('control', {
    fontSize: '16px',
    display: 'inline-block',
    '-webkit-tap-highlight-color': Styling.TRANSPARENT,
    position: 'relative', // needed for inking.
    background: BG
  }, padding)

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

  export const box_shadow = cls('raised', {boxShadow: `0 2px 2px rgba(var(--eltui-colors-fg), 0.54)`})

  export const round_borders = cls('round-borders', {
    borderRadius: `calc(1rem / 4.5)`
  })


  /// FLEX

  export const flex_row = cls('flex-row', {
    display: 'flex',
    flexDirection: 'row'
  })

  export const flex_column = cls('flex-column', {
    display: 'flex',
    flexDirection: 'column'
  })


  const fag = (n: number) => cls(`flex-absolute-grow${n}`, {
    flexBasis: 0,
    flexGrow: 1
  })

  export const flex_absolute_grow = fag(1)
  export const flex_absolute_grow2 = fag(2)
  export const flex_absolute_grow3 = fag(3)
  export const flex_absolute_grow4 = fag(4)
  export const flex_absolute_grow5 = fag(5)

  export const flex_grow1 = cls('flex-grow-1', {flexGrow: 1})
  export const flex_grow2 = cls('flex-grow-2', {flexGrow: 2})
  export const flex_grow3 = cls('flex-grow-3', {flexGrow: 3})
  export const flex_grow4 = cls('flex-grow-4', {flexGrow: 4})
  export const flex_grow5 = cls('flex-grow-5', {flexGrow: 5})

  const flexgap = (n: number) => {
    const c = cls(`flex-gap-${n}`, {
      marginLeft: `-${n}rem`,
      marginTop: `-${n / RATIO}rem`
    })
    s`*`.childOf(c, {marginTop: `${n / RATIO}rem`, marginLeft: `${n}rem`})
    s(c).append(':empty', {
      marginLeft: 0,
      marginTop: 0
    })
    return c
  }

  export const flex_gap = flexgap(1)
  export const flex_gap2 = flexgap(2)

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

rule('*', {
  boxSizing: 'border-box'
})

rule(':root', {
  '--eltui-colors-tint': '63, 81, 181',
  '--eltui-colors-fg': `0, 0, 0`,
  '--eltui-colors-bg': `255, 255, 255`,
  '--eltui-colors-contrast': `255, 255, 255`,
  '--eltui-colors-current-fg': `var(--eltui-colors-fg)`,
  '--eltui-colors-current-tint': `var(--eltui-colors-tint)`,
  '--eltui-colors-current-bg': `var(--eltui-colors-bg)`,
  // '--eltui-colors-accent': `244, 67, 54`,
  color: Styling.FG,
  background: Styling.BG,
  fontSize: '16px'
})

rule('button, input, select, textarea', {
  fontSize: 'inherit'
})

rule('::-webkit-scrollbar', {
  width: 'calc(1rem / 2)'
})

rule('::-webkit-scrollbar-track', {
  background: Styling.background_tint07
})

rule('::-webkit-scrollbar-thumb', {
  background: Styling.Tint(0.24),
  borderRadius: 'calc(1rem / 4)'
})

export default Styling
