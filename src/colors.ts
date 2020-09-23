import { style, CssClass } from 'osun'


function expand(hex: string) {
  var result = "#";

  for (var i = 1; i < hex.length; i++) {
    var val = hex.charAt(i);
    result += val + val;
  }

  return result;
}


function hex2rgb(hex: string): [number, number, number] {
  // #RGB or #RGBA
  if(hex.length === 4 || hex.length === 5) {
    hex = expand(hex);
  }

  var rgb = [
    parseInt(hex.substring(1,3), 16),
    parseInt(hex.substring(3,5), 16),
    parseInt(hex.substring(5,7), 16)
  ] as [number, number, number]

  // #RRGGBBAA
  // if (hex.length === 9) {
  //   var alpha = parseFloat((parseInt(hex.substring(7,9), 16) / 255).toFixed(2));
  //   rgb.push(alpha);
  // }

  return rgb;
}


function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}


function componentToHex(c: number) {
  var value = Math.round(clamp(c, 0, 255));
  var hex   = value.toString(16)

  return hex.length == 1 ? "0" + hex : hex
}


function rgb2hex(rgb: [number, number, number]): string {
  // var alpha = rgb.length === 4 ? componentToHex(rgb[3] * 255) : "";

  return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2])
}


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


/**
 * Adjust a color from its old background to its new background, keeping its distance
 * from the old to the new.
 *
 * The distances are calculated in the lch color space
 *
 * @param color
 * @param old_bg
 * @param new_bg
 */
function luminosity_adjuster(old_bg: string, new_bg: string) {
  // old background
  const ob = rgb2lch(hex2rgb(old_bg))
  // new background
  const nb = rgb2lch(hex2rgb(new_bg))
  const luminosity_center = (nb[0] + ob[0]) / 2
  console.log(old_bg, new_bg, luminosity_center)
  // const hue_distance = nb[2] * nb[1] - ob[2] * ob[1]

  return function adjust_color(color: string, ): string {
    // old_color
    const oc = rgb2lch(hex2rgb(color))

    const res = rgb2hex(xyz2rgb(lab2xyz(lch2lab([
      oc[0] - (oc[0] - luminosity_center) * 2, // luminosity_center is used as a symmetry point
      oc[1], // chroma is untouched, colors keep their original saturation.
      oc[2],
      // (oc[2] + hue_distance) % 360
    ]))))
    return res
    // now, try to maintain this distance to the new background
  }
}

var nbthemes = 0
/**
 * From a color theme, I need to be able to
 *   - define a default tint
 *   - switch tint easily
 *   - every time a tint is used, all corresponding colors are generated as part of the class
 *   - create "derived" themes that keep the colors but change them according to a new bg
 *   - get the true RGB colors.
 */
export class ColorTheme<T extends ColorTheme.Spec> {
  own_class: string & CssClass
  public static fromColors<T extends ColorTheme.Spec>(spec: ColorTheme.Spec, levels = ['75', '50', '14', '07']): ColorTheme<T> & {[K in keyof T]: string} & {
    tint: string
    tint75: string
    tint50: string
    tint14: string
    tint07: string
    fg: string
    fg75: string
    fg50: string
    fg14: string
    fg07: string
    bg: string
    disabled: string
  } {
    return new ColorTheme(spec, levels) as any
  }

  private reversed_cache = new Map<string, ColorTheme<any>>()

  /**
   * All the color variables as var(--eltui-colors-...)
   */
  colorvars: T = {} as any
  /**
   * The original definitions of the colors, with computed values.
   */
  colors: T = {} as any

  private original_colors = {} as any
  /**
   * Temporary colors used for computation.
   */
  private _colors: {[K in keyof T]: Color} = {} as any

  private constructor(
    /**
     * The original colors, stored in an object + all the calculated ones...
     */
    colors: T,
    private levels: string[]
  ) {
    // the original colors
    this.original_colors = colors = Object.assign({}, colors)
    if (!colors['disabled']) {
      (colors as any)['disabled'] = Color.fromHex(colors.bg).interpolate(0.5, Color.fromHex(colors.fg)).toHex()
    }
    const colordefs: any = this.colors = Object.assign({}, colors)

    const keys = Object.keys(colors) as (keyof T)[]
    for (var k of keys) {
      this._colors[k] = Color.fromHex(colors[k])
    }
    var bg = this._colors.bg

    const props = {} as any
    const self = this as any

    for (var k of keys) {
      const col = colors[k]
      const is_basic = k === 'bg' || k === 'fg' || k === 'tint'
      this.colors[k] = col

      var self_props = {} as any

      var addcol = (value: string, level?: string) => {
        var key = `${k}${level ?? ''}`
        var keyvar = `--eltui-colors-${k}${level ?? ''}`
        if (!is_basic)
          self_props[`--eltui-colors-tint${level ?? ''}`] = `var(${keyvar})`
        props[keyvar] = value
        colordefs[key] = value as any
        (this.colorvars as any)[key] = `var(${keyvar})` as any
      }

      addcol(col)
      for (var level of this.levels) {
        // generate all levels
        const l = parseInt(level)
        addcol(bg.interpolate(l / 100, this._colors[k]).toHex(), level)
      }

      // this.[color] as the class that changes tint.
      if (!is_basic)
        self[k] = style(`tint-color-${k}`, self_props)
    }

    self[`bg`] = `var(--eltui-colors-bg)`
    self[`tint`] = `var(--eltui-colors-tint)`
    self[`fg`] = `var(--eltui-colors-fg)`
    for (var l of this.levels) {
      self[`tint${l}`] = `var(--eltui-colors-tint${l})`
      self[`fg${l}`] = `var(--eltui-colors-fg${l})`
    }

    // Push a regular theme
    this.own_class = style(`color-theme-${nbthemes++}`, props, {
      color: `var(--eltui-colors-fg)`,
      background: `var(--eltui-colors-bg)`,
    })
  }

  getClass() {
    return this.own_class
  }

  /**
   * Reverse puts the given color as the background.
   * The fg color is changed to the value of bg if the contrast of the color is too low
   * with the current bg, otherwise it stays fg.
   * The tint becomes what color was chosen as FG.
   *
   * If recompute is true, all colors are recalculated to fit the new BG and keep their contrast
   * more or less the same it was before.
   */
  derive(opts: { bg: string, fg?: string, tint?: string, recompute?: boolean}): string {
    var key = `${opts.bg}-${opts.fg ?? ''}-${opts.tint ?? ''}-${opts.recompute ?? 'false'}`
    if (this.reversed_cache.has(key)) {
      return this.reversed_cache.get(key)!.getClass()
    }

    const op = {...opts}
    const colors = Object.assign({}, this.original_colors)
    var old_bg = colors.bg

    if (op.bg[0] !== '#') {
      op.bg = colors[op.bg]
    }
    if (op.fg && op.fg[0] !== '#') {
      op.fg = colors[op.fg]
    }
    if (op.tint && op.tint[0] !== '#') {
      op.tint = colors[op.tint]
    }
    const adj = luminosity_adjuster(old_bg, op.bg)

    if (op.recompute) {
      const keys = Object.keys(colors)
      for (var k of keys) {
        if (k in op) continue
        colors[k] = adj(colors[k])
      }
    }

    colors.bg = op.bg
    colors.fg = op.fg ?? colors.fg
    colors.tint = op.tint ?? colors.tint
    console.log(colors)
    const res = new ColorTheme(colors, this.levels)
    this.reversed_cache.set(key, res)
    return res.getClass()
    // return style('pouet')
  }

  /**
   * Will be made useless by typescript 4.1 with the template string props.
   */
  getColor(name: string, level: number) {
    var key = `${name}${level}`
    return this.colorvars[key]
  }

  /**
   * Will be made useless by typescript 4.1 with the template string props.
   */
  getColorDef(name: string, level: number) {
    var key = `${name}${level}`
    return this.colorvars[key]
  }

}

export namespace ColorTheme {
  export interface Spec {
    tint: string
    fg: string
    bg: string
    [name: string]: string
    // contrast: string
  }
}

export const theme = ColorTheme.fromColors({
  fg: '#1c1c1b',
  bg: '#ffffff',
  tint: '#652DC1',
})

requestAnimationFrame(() => document.body.classList.add(theme.getClass()))
