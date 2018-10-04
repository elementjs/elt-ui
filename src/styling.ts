
import * as osun from 'osun'


export namespace Styling {

  const _cls = osun.cls

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

    export function SetPrimary(value: string) { return {
      '--eltui-color-primary': toRGB(value),
      '--eltui-color-reverse-bg': toRGB(value)
    } }
    export function SetAccent(value: string) { return {'--eltui-color-accent': toRGB(value)} }
    export function SetFg(value: string) { return {'--eltui-color-fg': toRGB(value)} }
    export function SetBg(value: string) { return {'--eltui-color-bg': toRGB(value)} }

    export function SetReversePrimary(value: string) { return {'--eltui-color-reverse-primary': toRGB(value)} }
    export function SetReverseAccent(value: string) { return {'--eltui-color-reverse-accent': toRGB(value)} }
    export function SetReverseFg(value: string) { return {'--eltui-color-reverse-fg': toRGB(value)} }
    export function SetReverseBg(value: string) { return {'--eltui-color-reverse-bg': toRGB(value)} }

    export function SimpleTheme(
      primary: string,
      accent: string = '#f44336',
      fg: string = '#3c3c3b',
      bg: string = '#ffffff') {
        return {
          '--eltui-color-primary': toRGB(primary),
          '--eltui-color-accent': toRGB(accent),
          '--eltui-color-fg': toRGB(fg),
          '--eltui-color-bg': toRGB(bg),
          '--eltui-color-reverse-primary': toRGB(bg),
          '--eltui-color-reverse-accent': toRGB(accent),
          '--eltui-color-reverse-fg': toRGB(bg),
          '--eltui-color-reverse-bg': toRGB(primary)
        } as osun.CSSProperties
    }

    export const ACCENT = `rgba(var(--eltui-color-accent), 1)`
    export const ACCENT2 = `rgba(var(--eltui-color-accent), 0.74)`
    export const ACCENT3 = `rgba(var(--eltui-color-accent), 0.54)`
    export const ACCENT4 = `rgba(var(--eltui-color-accent), 0.24)`
    export const ACCENT5 = `rgba(var(--eltui-color-accent), 0.14)`
    export const ACCENT6 = `rgba(var(--eltui-color-accent), 0.07)`

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

    export const reverse_primary = _cls('reverse_primary', {
      // Doing a little trick to swap out primary and contrast
      '--eltui-color-primary': 'var(--eltui-color-reverse-primary)',
      '--eltui-color-fg': 'var(--eltui-color-reverse-fg)',
      '--eltui-color-bg': 'var(--eltui-color-reverse-bg)',
      '--eltui-color-accent': 'var(--eltui-color-reverse-accent)',
      backgroundColor: BG,
      color: FG
    })
  }


  export namespace text {
    export const bold = _cls('bold', {fontWeight: 'bold'})

    export const big = _cls('small', {fontSize: '18px'})
    export const bigger = _cls('bigger', {fontSize: '22px'})
    export const very_big = _cls('very_big', {fontSize: '28px'})
    export const huge = _cls('huge', {fontSize: '48px'})
    export const very_huge = _cls('very-huge', {fontSize: '64px'})

    export const small = _cls('small', {fontSize: '14px'})
    export const smaller = _cls('smaller', {fontSize: '12px'})
    export const verysmall = _cls('very-small', {fontSize: '10px'})

    export const centered = _cls('text-center', {textAlign: 'center'})
    export const right = _cls('text-right', {textAlign: 'right'})
    export const justified = _cls('text-right', {textAlign: 'justify'})

    export const fg = _cls('text-fg', {color: colors.FG})
    export const fg2 = _cls('text-fg2', {color: colors.FG2})
    export const fg3 = _cls('text-fg3', {color: colors.FG3})
    export const fg4 = _cls('text-fg4', {color: colors.FG4})
    export const fg5 = _cls('text-fg5', {color: colors.FG5})
    export const fg6 = _cls('text-fg6', {color: colors.FG6})

    export const primary = _cls('text-primary', {color: colors.PRIMARY})
    export const primary2 = _cls('text-primary2', {color: colors.PRIMARY2})
    export const primary3 = _cls('text-primary3', {color: colors.PRIMARY3})
    export const primary4 = _cls('text-primary4', {color: colors.PRIMARY4})
    export const primary5 = _cls('text-primary5', {color: colors.PRIMARY5})
    export const primary6 = _cls('text-primary6', {color: colors.PRIMARY6})

    export const bg = _cls('text-bg', {color: colors.BG})
    export const bg2 = _cls('text-bg2', {color: colors.BG2})
    export const bg3 = _cls('text-bg3', {color: colors.BG3})
    export const bg4 = _cls('text-bg4', {color: colors.BG4})
    export const bg5 = _cls('text-bg5', {color: colors.BG5})
    export const bg6 = _cls('text-bg6', {color: colors.BG6})

    export const accent = _cls('text-accent', {color: colors.ACCENT})
    export const accent2 = _cls('text-accent2', {color: colors.ACCENT2})
    export const accent3 = _cls('text-accent3', {color: colors.ACCENT3})
    export const accent4 = _cls('text-accent4', {color: colors.ACCENT4})
    export const accent5 = _cls('text-accent5', {color: colors.ACCENT5})
    export const accent6 = _cls('text-accent6', {color: colors.ACCENT6})
  }


  export namespace background {
    export const primary = _cls('bg-primary', {backgroundColor: colors.PRIMARY})
    export const primary2 = _cls('bg-primary2', {backgroundColor: colors.PRIMARY2})
    export const primary3 = _cls('bg-primary3', {backgroundColor: colors.PRIMARY3})
    export const primary4 = _cls('bg-primary4', {backgroundColor: colors.PRIMARY4})
    export const primary5 = _cls('bg-primary5', {backgroundColor: colors.PRIMARY5})
    export const primary6 = _cls('bg-primary6', {backgroundColor: colors.PRIMARY6})

    export const bg = _cls('bg-bg', {backgroundColor: colors.BG})
    export const bg2 = _cls('bg-bg2', {backgroundColor: colors.BG2})
    export const bg3 = _cls('bg-bg3', {backgroundColor: colors.BG3})
    export const bg4 = _cls('bg-bg4', {backgroundColor: colors.BG4})
    export const bg5 = _cls('bg-bg5', {backgroundColor: colors.BG5})
    export const bg6 = _cls('bg-bg6', {backgroundColor: colors.BG6})
  }

  export function Border(color: string, opts: {width?: string, style?: string} = {}) {
    return {
      borderColor: color,
      borderWidth: opts.width || '1px',
      borderStyle: opts.style || 'solid'
    } as osun.CSSProperties
  }

  export const no_spurious_borders = _cls('no-spurious-borders', {
    '-webkit-tap-highlight-color': colors.TRANSPARENT,
    'outline': 0
  })

  export const no_native_appearance = _cls('no-native-appearance', {
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    appearance: 'none'
  })

  export const full_width = _cls('full-width', {width: '100%'})
  export const full_height = _cls('full-height', {height: '100%'})
  export const full_screen = _cls('fullscreen', {
    width: '100%', height: '100%', position: 'fixed',
    left: 0,
    top: 0,
    transformOrigin: '50% 50%'
  })
  export const display_none = _cls('display-none', {display: 'none'})

  export const padded = _cls('padded', {padding: '16px'})
  export const control = _cls('control', {
    padding: '8px',
    fontSize: '16px',
    display: 'inline-block',
    '-webkit-tap-highlight-color': Styling.colors.TRANSPARENT,
    position: 'relative', // needed for inking.
    background: colors.BG
  })
  export const bold = _cls('bold', {fontWeight: 'bold'})
  export const raised = _cls('raised', {boxShadow: `0 2px 2px ${colors.FG3}`})
  export const cursor_pointer = _cls('cursor-pointer', {cursor: 'pointer'})
  export const relative = _cls('relative', {position: 'relative'})
  export const absolute = _cls('absolute', {position: 'absolute'})
  export const no_pointer_events = _cls('no-pointer-events', {pointerEvents: 'none'})

}

// Reset !
osun.raw(`
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

osun.rule('*', {
  boxSizing: 'border-box'
})

osun.rule('html', {
  '--eltui-color-primary': '63, 81, 181',
  '--eltui-color-fg': `0, 0, 0`,
  '--eltui-color-bg': `255, 255, 255`,
  '--eltui-color-accent': `244, 67, 54`,
})

osun.rule('html, body', {
  color: Styling.colors.FG,
  fontSize: '16px'
})

osun.rule('button, input, select, textarea', {
  fontSize: 'inherit'
})

osun.rule('::-webkit-scrollbar', {
  width: '8px'
})

osun.rule('::-webkit-scrollbar-track', {
  background: Styling.colors.PRIMARY6
})

osun.rule('::-webkit-scrollbar-thumb', {
  background: Styling.colors.PRIMARY5,
  borderRadius: '3px'
})



export default Styling
