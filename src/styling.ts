
import { o } from 'elt'
import {style, CSSProperties, raw, rule } from 'osun'
import * as helpers from 'osun/lib/helpers'

// Breakpoint	Purpose
// (default)	Mobile-portrait
// min-width: 480px	Mobile-landscape (and larger)
// min-width: 768px	Tablet-portrait (and larger)
// min-width: 992px	Tablet-landscape (and larger)
// min-width: 1200px	Laptops (and langer)

var watcher = false
function update(ev: UIEvent) {
  o_viewport_width.set(window.innerWidth)
  o_viewport_height.set(window.innerHeight)
  console.log(window.innerWidth)
}

function start_watching() {
  if (!watcher)
    window.addEventListener('resize', update)
  watcher = true
}

function stop_watching() {
  if (watcher)
    window.removeEventListener('resize', update)
  watcher = false
}

export const o_viewport_width = o(window.innerWidth)
o_viewport_width.watched = start_watching
o_viewport_width.unwatched = stop_watching

export const o_viewport_height = o(window.innerHeight)
o_viewport_height.watched = start_watching
o_viewport_height.unwatched = stop_watching


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


  const STEPS = [80, 60, 25, 10]

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

    rotate(rotation: number): Color {
      return new Color([this.lch[0], this.lch[1], (this.lch[2] + rotation) % 360])
    }

    interpolate(pct_from: number, other: Color): Color {
      const oc = other.lch
      const diff = this.lch.map((n, i) => i < 2 ? n + (oc[i] - n) * pct_from : n) as [number, number, number]
      return new Color(diff)
    }

    toRGBarray(): [number, number, number] {
      return xyz2rgb(lab2xyz(lch2lab(this.lch)))
    }

    toRGB(): string {
      return `rgb(${this.toRGBarray().join(', ')})`
    }

    toRGBA(alpha: number): string {
      return `rgba(${this.toRGBarray().join(', ')}, ${alpha})`
    }
    /**
     * Convert back to rgb space and back to hex
     */
    toHex(): string {
      function pad(n: string) { return n.length < 2 ? '0' + n : n }
      return '#' + this.toRGBarray().map(c => pad(Math.round(c).toString(16))).join('')
    }
  }

  export class ColorTheme {
    props: CSSProperties
    _bg: Color
    _fg: Color
    _tint: Color

    constructor(public spec: ColorThemeSpec) {
      var props = {} as {[name: string]: string}
      var bg = this._bg = Color.parse(spec.bg)
      var fg = this._fg = Color.parse(spec.fg)
      var tint = this._tint = Color.parse(spec.tint)

      props[`--eltui-colors-bg`] = bg.toHex()
      props[`--eltui-colors-tint`] = tint.toHex()
      props[`--eltui-colors-fg`] = fg.toHex()
      for (var i of STEPS) {
        props[`--eltui-colors-tint-${i}`] = tint.interpolate(1 - i/100, bg).toHex()
        props[`--eltui-colors-fg-${i}`] = fg.interpolate(1 - i/100, bg).toHex()
      }
      this.props = props
    }

    tint(s: string): CSSProperties {
      var props = {} as {[name: string]: string}
      var bg = this._bg
      var tint = Color.parse(s)
      props[`--eltui-colors-tint`] = tint.toHex()
      for (var i of STEPS) {
        props[`--eltui-colors-tint-${i}`] = tint.interpolate(1 - i/100, bg).toHex()
      }
      return props
    }

    fg(s: string): CSSProperties {
      var props = {} as {[name: string]: string}
      var bg = this._bg
      var fg = Color.parse(s)
      props[`--eltui-colors-fg`] = fg.toHex()
      for (var i of STEPS) {
        props[`--eltui-colors-fg-${i}`] = fg.interpolate(1 - i/100, bg).toHex()
      }
      return props
    }

  }

  export const box = helpers.box
  export const flex = helpers.flex
  export const text = helpers.text
  // export const grid = helpers.grid

  export function Theme(theme: ColorThemeSpec) {
    return new ColorTheme(theme)
  }

  var disabled = {} as any
  disabled['--eltui-colors-tint'] = `var(--eltui-colors-fg)`
  for (var i of STEPS) {
    disabled[`--eltui-colors-tint-${i}`] = `var(--eltui-colors-fg-${i})`
  }
  export const disabled_colors = style('disabled-colors', disabled)

  export const Tint = (alpha?: number) => `var(--eltui-colors-tint${alpha ? `-${alpha}` : ''})`
  export const Fg = (alpha?: number) => `var(--eltui-colors-fg${alpha ? `-${alpha}` : ''})`
  export const Bg = (alpha?: number) => `var(--eltui-colors-bg${alpha ? `-${alpha}` : ''})`

  export const TINT = Tint()
  export const TINT75 = Tint(STEPS[0])
  export const TINT50 = Tint(STEPS[1])
  export const TINT14 = Tint(STEPS[2])
  export const TINT07 = Tint(STEPS[3])

  export const FG = Fg()
  export const FG75 = Fg(STEPS[0])
  export const FG50 = Fg(STEPS[1])
  export const FG14 = Fg(STEPS[2])
  export const FG07 = Fg(STEPS[3])

  export const BG = Bg()
  export const BG75 = Bg(STEPS[0])
  export const BG50 = Bg(STEPS[1])
  export const BG14 = Bg(STEPS[2])
  export const BG07 = Bg(STEPS[3])

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

rule`html`(Styling.Theme({
  fg: '#1c1c1b',
  bg: '#ffffff',
  tint: '#652DC1' // steelblue by default
}).props)

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
  position: 'absolute',
  width: 'calc(1rem / 2)'
})

rule`::-webkit-scrollbar-track`({
  background: Styling.TINT07
})

rule`::-webkit-scrollbar-thumb`({
  background: Styling.TINT14,
  // borderRadius: 'calc(1rem / 4)'
})

export default Styling
