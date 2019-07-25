
import {cls, s, CSSProperties, raw, rule, CssBuilder} from 'osun'

// background
// text
// color
// text on color -- for reverse ?
// current-bg (color or background)
// current-fg (color or text-on-color or text)

// text_on_color
// export const RATIO = 16 / 9

declare module 'csstype' {

  interface PropertiesFallback {

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

  export const SIZES = {
    very_tiny: { $size: `${1 / Math.pow(RATIO, 2)}rem` },
    tiny: { $size: `${1 / Math.pow(RATIO, 1)}rem` },
    very_small: { $size: `${1 / Math.pow(RATIO, 1 / 2)}rem` },
    small: { $size: `${1 / Math.pow(RATIO, 1 / 3)}rem` },
    normal: { $size: '1rem' },
    big: { $size: `${RATIO}rem` },
    very_big: { $size: `${Math.pow(RATIO, 3 / 2)}rem` },
    huge: { $size: `${RATIO * RATIO}rem` },
    very_huge: { $size: `${Math.pow(RATIO, 3)}rem` }
  }

  export const COLORS = {
    tint: { $color: TINT },
    tint75: { $color: TINT75 },
    tint50: { $color: TINT50 },
    tint14: { $color: TINT14 },
    tint07: { $color: TINT07 },
    fg: { $color: FG },
    fg75: { $color: FG75 },
    fg50: { $color: FG50 },
    fg14: { $color: FG14 },
    fg07: { $color: FG07 },
    bg: { $color: BG },
    bg75: { $color: BG75 },
    bg50: { $color: BG50 },
    bg14: { $color: BG14 },
    bg07: { $color: BG07 },
  }

  export const padding = CssBuilder.from('padding', {
    top: { paddingTop: `$size` },
    bottom: { paddingBottom: '$size' },
    left: { paddingLeft: '$size' },
    right: { paddingRight: '$size' },
    vertical: { paddingTop: '$size', paddingBottom: '$size' },
    horizontal: { paddingLeft: '$size', paddingRight: '$size' },
    all: { padding: '$size' },
    squashed: { padding: `calc($size / ${RATIO}) $size` },
    none: { $size: '0' }
  }).more(SIZES)

  export const margin = CssBuilder.from('margins', {
    top: { marginTop: `$size` },
    bottom: { marginBottom: '$size' },
    left: { marginLeft: '$size' },
    right: { marginRight: '$size' },
    vertical: { margin: '$size 0' },
    horizontal: { margin: '0 $size' },
    all: { margin: '$size' },
    none: { $size: '0' }
  }).more(SIZES)

  export const border = CssBuilder.from('borders', {
    top: { borderTopStyle: `solid`, borderTopColor: '$color', borderTopWidth: '1px' },
    bottom: { borderBottomStyle: `solid`, borderBottomColor: '$color', borderBottomWidth: '1px' },
    left: { borderLeftStyle: `solid`, borderLeftColor: '$color', borderLeftWidth: '1px' },
    right: { borderRightStyle: `solid`, borderRightColor: '$color', borderRightWidth: '1px' },
    vertical: { borderTopStyle: `solid`, borderTopColor: '$color', borderTopWidth: '1px', borderBottomStyle: `solid`, borderBottomColor: '$color', borderBottomWidth: '1px' },
    horizontal: { borderLeftStyle: `solid`, borderLeftColor: '$color', borderLeftWidth: '1px', borderRightStyle: `solid`, borderRightColor: '$color', borderRightWidth: '1px' },
    all: { borderStyle: `solid`, borderColor: '$color', borderWidth: '1px' },
    width2px: { borderWidth: '2px' },
    width3px: { borderWidth: '3px' },
    width4px: { borderWidth: '4px' },
    circle: { borderRadius: '50%' },
    round: { borderRadius: `4px` },
    shadow: { boxShadow: `0 2px 2px rgba(var(--eltui-colors-fg), 0.54)` }
  }, { borderColor: '$color' })
  .more(COLORS)

  export const background = CssBuilder.from('background', {

  }, { backgroundColor: '$color' }).more(COLORS)

  export const text = CssBuilder.from('text', {
    bold: { fontWeight: 'bold' },
    italic: { fontStyle: 'italic' },
    underline: { textDecoration: 'underline' },
    uppercase: {textTransform: 'uppercase'},
    lowercase: {textTransform: 'lowercase'},
    capitalize: {textTransform: 'capitalize'},
    superscript: {verticalAlign: 'super'},
    subscript: {verticalAlign: 'sub'},
    centered: {textAlign: 'center'},
    right: {textAlign: 'right'},
    justified: {textAlign: 'justify'},
    align_middle: {verticalAlign: 'middle'},
    pre_line: { whiteSpace: 'pre-line' },
    pre: { whiteSpace: 'pre' },
    pre_wrap: { whiteSpace: 'pre-wrap' },
    nowrap: { whiteSpace: 'nowrap' },
  }, { fontSize: '$size', color: '$color' }).more(COLORS).more(SIZES)

  const _fag = (n: number) => { return { flexGrow: n, flexBasis: 0 } as CSSProperties }
  const _flexjust = (val: CSSProperties['justifyContent']) => { return {justifyContent: val} as CSSProperties }
  const _flexalign = (val: CSSProperties['alignItems']) => { return {alignItems: val} as CSSProperties }

  export const flex = CssBuilder.from('flex', {
    row: { display: 'flex', flexDirection: 'row' },
    column: { display: 'flex', flexDirection: 'column' },
    inline: { display: 'inline-flex' },
    wrap: { flexWrap: 'wrap' },
    wrap_reverse: { flexWrap: 'wrap-reverse' },
    absolute_grow1: _fag(1),
    absolute_grow2: _fag(2),
    absolute_grow3: _fag(3),
    absolute_grow4: _fag(4),
    absolute_grow5: _fag(5),
    grow1: { flexGrow: 1 },
    grow2: { flexGrow: 2 },
    grow3: { flexGrow: 3 },
    grow4: { flexGrow: 4 },
    grow5: { flexGrow: 5 },
    justify_center: _flexjust('center'),
    justify_stretch: _flexjust('stretch'),
    justify_start: _flexjust('flex-start'),
    justify_end: _flexjust('flex-end'),
    justify_left: _flexjust('left'),
    justify_right: _flexjust('right'),
    justify_space_between: _flexjust('space-between'),
    justify_space_evenly: _flexjust('space-evenly'),
    justify_space_around: _flexjust('space-around'),
    align_center: _flexalign('center'),
    align_stretch: _flexalign('stretch'),
    align_start: _flexalign('flex-start'),
    align_end: _flexalign('flex-end'),
    align_baseline: _flexalign('baseline'),
    align_first_baseline: _flexalign('first baseline'),
    align_last_baseline: _flexalign('last baseline'),
    gap(kls: string) {
      if (this.path.indexOf('wrap') > -1 || this.path.indexOf('wrap_reverse') > -1) {
        s(kls, this.getProps({
          position: 'relative',
          top: '-$size',
          left: '-$size',
          marginBottom: '-$size',
          marginRight: '-$size'
        }))
        s`*`.childOf(kls, this.getProps({
          marginTop: '$size',
          marginLeft: '$size'
        }))
      } else if (this.path.indexOf('row') === -1) {
        s`*`.childOf(kls, this.getProps({
          marginTop: '$size'
        }))
        s`:first-child`.childOf(kls, {
          marginTop: 0
        })
      } else {
        s`*`.childOf(kls, this.getProps({
          marginLeft: '$size'
        }))
        s`:first-child`.childOf(kls, {
          marginLeft: 0
        })
      }
      // this.path
    },
  }).more(SIZES)

  /// Positions
  const P = (k: CSSProperties['position']) => { return { position: k } as CSSProperties }
  export const position = CssBuilder.from('position', {
    absolute: P('absolute'),
    relative: P('relative'),
    static: P('static'),
    fixed: P('fixed'),
    sticky: P(['-webkit-sticky', 'sticky']),
    top: { top: 0 },
    bottom: { bottom: 0 },
    left: { left: 0 },
    right: { right: 0 }
  })

  const _curs = (s: string) => { return {cursor: s} as CSSProperties }
  export const cursor = CssBuilder.from('mouse', {
    pointer: _curs('pointer'),
    help: _curs('help'),
    move: _curs('move'),
    grab: _curs('grab'),
    grabbing: _curs('grabbing'),
    progress: _curs('progress'),
    row_resize: _curs('row-resize'),
    text: _curs('text'),
    zoom_in: _curs('zoom-in'),
    zoom_out: _curs('zoom-out'),
    events_none: { pointerEvents: 'none' },
    events_auto: { pointerEvents: 'auto' },
  })

  export const display = CssBuilder.from('display', {
    block: { display: 'block' },
    inline: { display: 'inline-block' }
  })

  export const contrast_on_tint = cls('tint-reverse', {
    '--eltui-colors-current-tint': 'var(--eltui-colors-contrast)',
    '--eltui-colors-current-fg': 'var(--eltui-colors-contrast)',
    '--eltui-colors-current-bg': 'var(--eltui-colors-tint)',
    color: FG,
    background: BG
  })

  export const TRANSPARENT = `rgba(0, 0, 0, 0)`

  export const no_spurious_borders = cls('no-spurious-borders', {
    WebkitTapHighlightColor: TRANSPARENT,
    'outline': 0
  })

  export const no_native_appearance = cls('no-native-appearance', {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
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
    borderTopWidth: `${n}rem`,
    borderBottomWidth: `${n}rem`,
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

  export const control = cls('control', {
    fontSize: '16px',
    display: 'inline-block',
    WebkitTapHighlightColor: Styling.TRANSPARENT,
    position: 'relative', // needed for inking.
    // background: BG
  }, padding.all)

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

  export const pointer_events_none = cls('no-pointer-events', {pointerEvents: 'none'})

  export const box_shadow = cls('raised', {boxShadow: `0 2px 2px rgba(var(--eltui-colors-fg), 0.54)`})

  export const round_borders = cls('round-borders', {
    borderRadius: `calc(1rem / 4.5)`
  })

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
  background: Styling.TINT07
})

rule('::-webkit-scrollbar-thumb', {
  background: Styling.Tint(0.24),
  borderRadius: 'calc(1rem / 4)'
})

export default Styling
