
import { ColorTheme, theme } from './colors'
import { raw, rule } from 'osun'
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


export namespace Styling {

  export const box = helpers.box
  export const flex = helpers.flex
  export const text = helpers.text
  // export const grid = helpers.grid

  export function Theme<T extends ColorTheme.Spec>(theme: T) {
    return ColorTheme.fromColors<T>(theme)
  }

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
  color: currentcolor;
	text-align: left;
	text-decoration: none;
	vertical-align: baseline;
	z-index: auto;
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

rule`:root`({
  fontSize: '16px'
})

rule`button, input, select, textarea`({
  fontSize: 'inherit'
})

rule`::-webkit-scrollbar`({
  position: 'absolute',
  width: 'calc(1rem / 2)',
  height: 'calc(1rem / 2)'
})

rule`::-webkit-scrollbar-track`({
  background: theme.tint07
})

rule`::-webkit-scrollbar-thumb`({
  background: theme.tint14,
  // borderRadius: 'calc(1rem / 4)'
})

export default Styling
