
import {cls, s, CSSProperties, raw, rule} from 'osun'


// background
// text
// color
// text on color -- for reverse ?
// current-bg (color or background)
// current-fg (color or text-on-color or text)

// text_on_color
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


export interface ColorTheme {
  tint: string
  fg: string
  bg: string
  contrast: string
}


export namespace Styling {

  export const RATIO = 1.618033

  export const VAR_RATIO = '--eltui-ratio'
  export const VAR_CURRENT_FG = '--eltui-colors-current-fg'
  export const VAR_CURRENT_BG = '--eltui-colors-current-bg'
  export const VAR_CURRENT_TINT = '--eltui-colors-current-tint'
  export const VAR_FG = '--eltui-colors-fg'
  export const VAR_TINT = '--eltui-colors-tint'
  export const VAR_BG = '--eltui-colors-bg'
  export const VAR_CONTRAST = '--eltui-colors-contrast'

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
      '--eltui-colors-contrast': toRGB(theme.contrast),
      '--eltui-colors-current-tint': 'var(--eltui-colors-tint)',
      '--eltui-colors-current-fg': 'var(--eltui-colors-fg)',
      '--eltui-colors-current-bg': 'var(--eltui-colors-bg)'
    } as CSSProperties
  }

  export function SetTint(tint: string) {
    return {
      '--eltui-colors-tint': toRGB(tint),
      '--eltui-colors-current-tint': 'var(--eltui-colors-tint)'
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

  export const Tint = (alpha: number = 1) => `rgba(var(--eltui-colors-current-tint), ${alpha})`
  export const Fg = (alpha: number = 1) => `rgba(var(--eltui-colors-current-fg), ${alpha})`
  export const Bg = (alpha: number = 1) => `rgba(var(--eltui-colors-current-bg), ${alpha})`

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

  export const contrast_on_tint = cls('tint-reverse', {
    '--eltui-colors-current-tint': 'var(--eltui-colors-contrast)',
    '--eltui-colors-current-fg': 'var(--eltui-colors-contrast)',
    '--eltui-colors-current-bg': 'var(--eltui-colors-tint)',
    color: FG,
    background: BG
  })

  const bg = (name: string, s: string) => cls(`background-${name}`, {backgroundColor: s})
  export const background_tint = bg('tint', TINT)
  export const background_tint75 = bg('tint75', TINT75)
  export const background_tint50 = bg('tint50', TINT50)
  export const background_tint14 = bg('tint14', TINT14)
  export const background_tint07 = bg('tint07', TINT07)

  export const background_fg = bg('fg', FG)
  export const background_fg75 = bg('fg75', FG75)
  export const background_fg50 = bg('fg50', FG50)
  export const background_fg14 = bg('fg14', FG14)
  export const background_fg07 = bg('fg07', FG07)

  export const background_bg = bg('bg', BG)
  export const background_bg75 = bg('bg75', BG75)
  export const background_bg50 = bg('bg50', BG50)
  export const background_bg14 = bg('bg14', BG14)
  export const background_bg07 = bg('bg07', BG07)

  const txt = (name: string, s: string) => cls(`color-${name}`, {color: s})
  export const color_tint = txt('tint', TINT)
  export const color_tint75 = txt('tint75', TINT75)
  export const color_tint50 = txt('tint50', TINT50)
  export const color_tint14 = txt('tint14', TINT14)
  export const color_tint07 = txt('tint07', TINT07)

  export const color_fg = txt('fg', FG)
  export const color_fg75 = txt('fg75', FG75)
  export const color_fg50 = txt('fg50', FG50)
  export const color_fg14 = txt('fg14', FG14)
  export const color_fg07 = txt('fg07', FG07)

  export const color_bg = txt('bg', BG)
  export const color_bg75 = txt('bg75', BG75)
  export const color_bg50 = txt('bg50', BG50)
  export const color_bg14 = txt('bg14', BG14)
  export const color_bg07 = txt('bg07', BG07)

  export const TRANSPARENT = `rgba(0, 0, 0, 0)`

  export const text_italic = cls('italic', {fontStyle: 'italic'})
  export const text_oblique = cls('oblique', {fontStyle: 'oblique'})
  export const text_uppercase = cls('uppercase', {textTransform: 'uppercase'})
  export const text_lowercase = cls('lowercase', {textTransform: 'lowercase'})
  export const text_capitalize = cls('capitalize', {textTransform: 'capitalize'})
  export const text_superscript = cls('superscript', {verticalAlign: 'super'})
  export const text_subscript = cls('subscript', {verticalAlign: 'sub'})

  export const text_bold = cls('bold', {fontWeight: 'bold'})

  export const text_normal = cls('normal', {
    fontSize: '1rem',
    fontWeight: 'normal',
    textDecoration: 'none'
  })

  export const text_big = cls('big', {fontSize: '1.2rem'})
  export const text_bigger = cls('bigger', {fontSize: '1.4rem'})
  export const text_very_big = cls('very_big', {fontSize: '1.8rem'})
  export const text_huge = cls('huge', {fontSize: '2.4rem'})
  export const text_very_huge = cls('very-huge', {fontSize: '4rem'})

  export const text_small = cls('small', {fontSize: '0.8rem'})
  export const text_smaller = cls('smaller', {fontSize: '0.7rem'})
  export const text_verysmall = cls('very-small', {fontSize: '0.6rem'})

  export const text_centered = cls('text-center', {textAlign: 'center'})
  export const text_right = cls('text-right', {textAlign: 'right'})
  export const text_justified = cls('text-right', {textAlign: 'justify'})

  export const vertical_align_middle = cls('middle', {verticalAlign: 'middle'})

  function mkborder(col: string) {
    return {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: col
    } as CSSProperties
  }

  export const border_fg = cls('border-fg', mkborder(FG))
  export const border_bg = cls('border-bg', mkborder(BG))
  export const border_tint = cls('border-tint', mkborder(TINT))
  export const border_fg75 = cls('border-fg75', mkborder(FG75))
  export const border_bg75 = cls('border-bg75', mkborder(BG75))
  export const border_tint75 = cls('border-tint75', mkborder(TINT75))
  export const border_fg50 = cls('border-fg50', mkborder(FG50))
  export const border_bg50 = cls('border-bg50', mkborder(BG50))
  export const border_tint50 = cls('border-tint50', mkborder(TINT50))
  export const border_fg14 = cls('border-fg14', mkborder(FG14))
  export const border_bg14 = cls('border-bg14', mkborder(BG14))
  export const border_tint14 = cls('border-tint14', mkborder(TINT14))
  export const border_fg07 = cls('border-fg07', mkborder(FG07))
  export const border_bg07 = cls('border-bg07', mkborder(BG07))
  export const border_tint07 = cls('border-tint07', mkborder(TINT07))

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
    width: '100vw', height: '100vh', position: 'fixed',
    left: 0,
    top: 0,
    transformOrigin: '50% 50%'
  })

  export const display_none = cls('display-none', {display: 'none'})

  const opaque_pad = (n: number) => cls(`padding${n.toString().replace('.', '-')}`, {
    borderStyle: 'solid',
    borderTopWidth: `${n / RATIO}rem`,
    borderBottomWidth: `${n / RATIO}rem`,
    borderRightWidth: `${n}rem`,
    borderLeftWidth: `${n}rem`,
    borderColor: BG
  })

  export const padding_opaque_2 = opaque_pad(1 / RATIO / 2)
  export const padding_opaque_1 = opaque_pad(1 / RATIO / 2)
  export const padding_opaque = opaque_pad(1)
  export const padding_opaque2 = opaque_pad(2)
  export const padding_opaque3 = opaque_pad(3)
  export const padding_opaque4 = opaque_pad(4)

  const pad = (n: number) => cls(`padding${n.toString().replace('.', '-')}`, {padding: `${n / RATIO}rem ${n}rem`})
  export const padding0 = cls('padding-0', {padding: '0'})
  export const padding_2 = pad(1 / RATIO / 2)
  export const padding_1 = pad(1 / RATIO)
  export const padding = pad(1)
  export const padding2 = pad(2)
  export const padding3 = pad(3)
  export const padding4 = pad(4)

  const mar = (n: number) => cls(`margin${n.toString().replace('.', '_')}`, {margin: `${n / RATIO}rem ${n}rem`})
  export const margin0 = cls('margin0', {margin: '0'})
  export const margin_1 = mar(1 / RATIO)
  export const margin_2 = mar(1 / RATIO / 2)
  export const margin = mar(1)
  export const margin2 = mar(2)
  export const margin3 = mar(3)
  export const margin4 = mar(4)

  export const control = cls('control', {
    fontSize: '16px',
    display: 'inline-block',
    '-webkit-tap-highlight-color': Styling.TRANSPARENT,
    position: 'relative', // needed for inking.
    // background: BG
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

  const hover = (name: string, color: string) => {
    const hov = cls(`hover-${name}`)
    s(hov).append(':hover', {
      backgroundColor: color
    })
    return hov
  }
  export const hover_tint = hover('tint', TINT)
  export const hover_fg = hover('fg', FG)
  export const hover_bg = hover('bg', BG)
  export const hover_tint75 = hover('tint75', TINT75)
  export const hover_fg75 = hover('fg75', FG75)
  export const hover_bg75 = hover('bg75', BG75)
  export const hover_tint50 = hover('tint50', TINT50)
  export const hover_fg50 = hover('fg50', FG50)
  export const hover_bg50 = hover('bg50', BG50)
  export const hover_tint14 = hover('tint14', TINT14)
  export const hover_fg14 = hover('fg14', FG14)
  export const hover_bg14 = hover('tint14', BG14)
  export const hover_tint07 = hover('tint07', TINT07)
  export const hover_fg07 = hover('fg07', FG07)
  export const hover_bg07 = hover('bg07', BG07)

  const pos = (s: CSSProperties['position']) => cls(`position-${s}`, {position: s})
  export const position_relative = pos('relative')
  export const position_absolute = pos('absolute')
  export const position_sticky = cls('sticky', {
    position: ['-webkit-sticky', 'sticky']
  })
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
    flexGrow: n
  })

  const flexalign = (val: CSSProperties['alignItems']) => cls(`flex-align-${val}`, {alignItems: val})
  export const align_items_center = flexalign('center')
  export const align_items_stretch = flexalign('stretch')
  export const align_items_start = flexalign('flex-start')
  export const align_items_end = flexalign('flex-end')
  export const align_items_baseline = flexalign('baseline')
  export const align_items_first_baseline = flexalign('first baseline')
  export const align_items_last_baseline = flexalign('last baseline')

  const flexjust = (val: CSSProperties['justifyContent']) => cls(`flex-align-${val}`, {justifyContent: val})
  export const justify_content_center = flexjust('center')
  export const justify_content_stretch = flexjust('stretch')
  export const justify_content_start = flexjust('flex-start')
  export const justify_content_end = flexjust('flex-end')
  export const justify_content_left = flexjust('left')
  export const justify_content_right = flexjust('right')
  export const justify_content_space_between = flexjust('space-between')
  export const justify_content_space_evenly = flexjust('space-evenly')
  export const justify_content_space_around = flexjust('space-around')

  export const flex_absolute_grow = fag(1)
  export const flex_absolute_grow2 = fag(2)
  export const flex_absolute_grow3 = fag(3)
  export const flex_absolute_grow4 = fag(4)
  export const flex_absolute_grow5 = fag(5)

  export const flex_wrap = cls('flex-wrap', {flexWrap: 'wrap'})
  export const flex_wrap_reverse = cls('flex-wrap', {flexWrap: 'wrap-reverse'})

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

  const _colgap = (cl: string, n: number) => {
    const c = cls(`colgap-${cl}`)
    s`*`.childOf(c, {marginLeft: `${n}rem`})
    s`:first-child`.childOf(c, {marginLeft: 0})
    return c
  }

  export const colgap_2 = _colgap(`_2`, 1 / RATIO / 2)
  export const colgap_1 = _colgap(`_1`, 1 / RATIO)
  export const colgap = _colgap('1', RATIO)
  export const colgap2 = _colgap('1', RATIO)

  const _rowgap = (cl: string, n: number) => {
    const c = cls(`rowgap-${cl}`)
    s`*`.childOf(c, {marginTop: `${n}rem`})
    s`:first-child`.childOf(c, {marginTop: 0})
    return c
  }

  export const rowgap_2 = _rowgap(`_2`, 1 / RATIO / 2)
  export const rowgap_1 = _rowgap(`_1`, 1 / RATIO)
  export const rowgap = _rowgap('1', RATIO)
  export const rowgap2 = _rowgap('1', RATIO)

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
