
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


export interface ColorThemeSpec {
  tint: string
  fg: string
  bg: string
  // contrast: string
}


export namespace Styling {

  export function rgb2xyz(rgb: [number, number, number]): [number, number, number] {
    var r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255;

    // assume sRGB
    r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
    g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
    b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

    var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
    var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
    var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

    return [x * 100, y *100, z * 100];
  }

  export function xyz2lab(xyz: [number, number, number]): [number, number, number] {
    var x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

    x /= 95.047;
    y /= 100;
    z /= 108.883;

    x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
    y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
    z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

    l = (116 * y) - 16;
    a = 500 * (x - y);
    b = 200 * (y - z);

    return [l, a, b];
  }

  export function lab2lch(lab: [number, number, number]): [number, number, number] {
    var l = lab[0],
        a = lab[1],
        b = lab[2],
        hr, h, c;

    hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  }

  export function rgb2lch(rgb: [number, number, number]): [number, number, number] {
    return lab2lch(xyz2lab(rgb2xyz(rgb)))
  }

  export function lch2lab(lch: [number, number, number]): [number, number, number] {
    var l = lch[0],
        c = lch[1],
        h = lch[2],
        a, b, hr;

    hr = h / 360 * 2 * Math.PI;
    a = c * Math.cos(hr);
    b = c * Math.sin(hr);
    return [l, a, b];
  }

  export function lab2xyz(lab: [number, number, number]): [number, number, number] {
    let y = (lab[0] + 16) / 116;
    let x = lab[1] / 500 + y;
    let z = y - lab[2] / 200;

    [x, y, z] = [x, y, z].map(v => {
      return v ** 3 > 0.008856 ? v ** 3 : (v - 16 / 116) / 7.787;
    });

    const D65 = [95.047, 100, 108.883];
    x = x * D65[0];
    y = y * D65[1];
    z = z * D65[2];

    return [x, y, z];
  }

  export function xyz2rgb(xyz: [number, number, number]): [number, number, number] {
    var x = xyz[0] / 100,
        y = xyz[1] / 100,
        z = xyz[2] / 100,
        r, g, b;

    r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
    g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
    b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

    // assume sRGB
    r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
      : r = (r * 12.92);

    g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
      : g = (g * 12.92);

    b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
      : b = (b * 12.92);

    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);

    return [r * 255, g * 255, b * 255];
  }


  /**
   * Color is an LCH color
   */
  export class Color {

    constructor(public lch: [number, number, number]) { }

    static fromRGB(rgb: [number, number, number]) {
      return new Color(rgb2lch(rgb))
    }

    static fromHex(s: string) {
      if (s[0] === '#') s = s.slice(1)
      return this.fromRGB([parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)])
    }

    static parse(s: string | [number, number, number]) {
      return typeof s === 'string' ? this.fromHex(s) : this.fromRGB(s)
    }

    interpolate(pct_from: number, other: Color): Color {
      const oc = other.lch
      const diff = this.lch.map((n, i) => n + (oc[i] - n) * pct_from) as [number, number, number]
      console.log(this.lch, other.lch, diff)
      return new Color(diff)
    }

    toRGB(): [number, number, number] {
      return xyz2rgb(lab2xyz(lch2lab(this.lch)))
    }
    /**
     * Convert back to rgb space and back to hex
     */
    toHex(): string {
      return '#' + this.toRGB().map(c => Math.round(c).toString(16)).join('')
    }
  }

  export class ColorTheme {
    props: CSSProperties
    constructor(public spec: ColorThemeSpec) {
      var props = {} as {[name: string]: string}
      var bg = Color.parse(spec.bg)
      var fg = Color.parse(spec.fg)
      var tint = Color.parse(spec.tint)

      props[`--eltui-colors-bg`] = bg.toHex()
      props[`--eltui-colors-tint`] = tint.toHex()
      props[`--eltui-colors-fg`] = fg.toHex()
      for (var i of [7, 14, 50, 75]) {
        props[`--eltui-colors-tint-${i}`] = bg.interpolate(i/100, tint).toHex()
        props[`--eltui-colors-fg-${i}`] = bg.interpolate(i/100, fg).toHex()
      }
      this.props = props
    }
  }

  export const box = helpers.box
  export const flex = helpers.flex
  export const text = helpers.text
  // export const grid = helpers.grid

  export function toRGB(s: string | [number, number, number]): string {
    if (Array.isArray(s))
      return `${s[0]}, ${s[1]}, ${s[2]}`
    if (s[0] === '#')
      s = s.slice(1)
    if (s.length !== 6)
      return s
    return `${parseInt(s.slice(0, 2), 16)}, ${parseInt(s.slice(2, 4), 16)}, ${parseInt(s.slice(4, 6), 16)}`
  }

  export function Theme(theme: ColorThemeSpec) {
    const clt = new ColorTheme(theme)
    return clt.props
    // return {
    //   '--eltui-colors-tint': toRGB(theme.tint),
    //   '--eltui-colors-fg': toRGB(theme.fg),
    //   '--eltui-colors-bg': toRGB(theme.bg),
    //   // backgroundColor: 'rgba(var(--eltui-colors-bg))',
    //   color: 'rgba(var(--eltui-colors-fg), 1)',
    //   backgroundColor: 'rgba(var(--eltui-colors-bg), 1)'
    // } as CSSProperties
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

  export const Tint = (alpha?: number) => `var(--eltui-colors-tint${alpha ? `-${alpha}` : ''})`
  export const Fg = (alpha?: number) => `var(--eltui-colors-fg${alpha ? `-${alpha}` : ''})`
  export const Bg = (alpha?: number) => `var(--eltui-colors-bg${alpha ? `-${alpha}` : ''})`

  export const TINT = Tint()
  export const TINT75 = Tint(75)
  export const TINT50 = Tint(50)
  export const TINT14 = Tint(14)
  export const TINT07 = Tint(7)

  export const FG = Fg()
  export const FG75 = Fg(75)
  export const FG50 = Fg(50)
  export const FG14 = Fg(14)
  export const FG07 = Fg(7)

  export const BG = Bg()
  export const BG75 = Bg(75)
  export const BG50 = Bg(50)
  export const BG14 = Bg(14)
  export const BG07 = Bg(7)

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
    color: FG,
    background: BG
  })

  export const TRANSPARENT = `rgba(0, 0, 0, 0)`

}

// Reset !
raw(`
/*
 * https://github.com/jtrost/Complete-CSS-Reset
*/

/* Displays for HTML 5 */
article, aside, audio, command, datagrid, details, dialog, embed,
figcaption, figure, footer, header, hgroup, menu, nav, section, summary,
video, wbr {
	display: block;
}

bdi, figcaption, keygen, mark, meter, progress, rp, rt, ruby, time {
	display: inline;
}

/* Deprecated tags */
acronym, applet, big, center, dir, font, frame, frameset, noframes, s,
strike, tt, u, xmp {
	display: none;
}

/* Reset styles for all structural tags */
a, abbr, area, article, aside, audio, b, bdo, blockquote, body, button,
canvas, caption, cite, code, col, colgroup, command, datalist, dd, del,
details, dialog, dfn, div, dl, dt, em, embed, fieldset, figure, form,
h1, h2, h3, h4, h5, h6, head, header, hgroup, hr, html, i, iframe, img,
input, ins, keygen, kbd, label, legend, li, map, mark, menu, meter, nav,
noscript, object, ol, optgroup, option, output, p, param, pre, progress,
q, rp, rt, ruby, samp, section, select, small, span, strong, sub, sup,
table, tbody, td, textarea, tfoot, th, thead, time, tr, ul, var, video {
	background: transparent;
	border: 0;
	font-size: 100%;
	font: inherit;
	margin: 0;
	outline: none;
	padding: 0;
	text-align: left;
	text-decoration: none;
	vertical-align: baseline;
	z-index: 1;
}

/* Miscellaneous resets */
body {
	line-height: normal;
}

ol, ul {
	list-style: none;
}

blockquote, q {
	quotes: none;

}

blockquote:before, blockquote:after, q:before, q:after {
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

rule`:root`(Styling.Theme({
  fg: '#3c3c3b',
  bg: '#ffffff',
  tint: '#36648B' // steelblue by default
}))

rule`:root`({
  // '--eltui-colors-tint': '63, 81, 181',
  // '--eltui-colors-fg': `0, 0, 0`,
  // '--eltui-colors-bg': `255, 255, 255`,
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
