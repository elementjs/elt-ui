import { Attrs, e, Renderable, o, If } from 'elt'
import { style } from 'osun'
import { theme as T } from './colors'

export class PathBuilder {
  constructor(public readonly buffer: Readonly<string[]>) { }

  protected clone(append: string) {
    return new PathBuilder([...this.buffer, append]) as any as PathBuilder & string
  }

  moveTo(x: number, y: number) {
    return this.clone(`M${x} ${y}`)
  }

  lineTo(x: number, y: number) {
    return this.clone(`L${x} ${y}`)
  }

  curveTo(x1: number, y1: number, x2: number, y2: number, xto: number, yto: number) {
    return this.clone(`C `)
  }

  quadraTo(xto: number, yto: number, xinf: number, yinf: number) {
    return this.clone(`Q${xinf} ${yinf} ${xto} ${yto}`)
  }

  arc(xr: number, yr: number, rot: number, large_arc: boolean, sweep: boolean, x: number, y: number) {
    return this.clone(`A ${xr} ${yr} ${rot} ${large_arc ? 1 : 0} ${sweep ? 1 : 0} ${x} ${y}`)
  }

  circle(x: number, y: number, r: number) {
    return this.moveTo(x - r, y)
      .arc(
        r, r, 0,
        true, false,
        x + r, y
      )
      .arc(
        r, r, 0,
        true, false,
        x - r, y
      )
  }

  rect(x1: number, y1: number, x2: number, y2: number, r?: number) {
    [x1, x2] = x1 > x2 ? [x2, x1] : [x1, x2];
    [y1, y2] = y1 > y2 ? [y2, y1] : [y1, y2]
    // x1, y1 is always the upper left
    // x2, y2 is always the lower right
    if (r != undefined) {
      var rx = (x2 - x1) * r / 100
      var ry = (y2 - y1) * r / 100
      return this.moveTo(x1, y1 + ry)
        .quadraTo(x1 + rx, y1,
          x1, y1)
        .lineTo(x2 - rx, y1)
        .quadraTo(x2, y1 + ry,
          x2, y1,
        )
        .lineTo(x2, y2 - ry)
        .quadraTo(x2 - rx, y2,
          x2, y2,
        )
        .lineTo(x1 + rx, y2)
        .quadraTo(x1, y2 - ry,
          x1, y2)
        .lineTo(x1, y1 + ry)
    }

    return this.moveTo(x1, y1)
      .lineTo(x2, y1)
      .lineTo(x2, y2)
      .lineTo(x1, y2)
      .close
  }

  get close() {
    // :-|
    return this.clone(`z`)
  }

  toString() {
    return this.valueOf()
  }

  valueOf() {
    return this.buffer.join(' ')
  }

  get length() {
    return this.buffer.join(' ').length
  }
}

export const d = new PathBuilder([])


export const cls_icon = style('icon', {
  height: '1em',
  fill: 'currentcolor',
  verticalAlign: '-.125em'
})

export const cls_stroked = style('icon-stroked-path', {
  stroke: 'currentcolor',
  strokeWidth: '1.5px',
  fill: 'none',
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
})

export function SvgCheckBox(attrs: Attrs<SVGSVGElement> & { checked?: o.RO<any>, filled?: o.RO<boolean> }, ch: Renderable[]) {
  var thickness = 1.5
  return <svg class={cls_icon} viewBox='0 0 14 16'>
    <path style={{fillRule: 'evenodd'}} d={d.rect(0, 1, 14, 15, 15).rect(thickness, 1 + thickness, 14 - thickness, 15 - thickness, 15)}/>
    {ch}
    {If(attrs.checked, () => <path d={d.moveTo(3.5, 8).lineTo(6, 11).lineTo(10.5, 4.5)} // 'M3 8 L6 11 L11 4'
      class={cls_stroked}
    />)}
  </svg>
}


export function SvgSelectThingy(a: Attrs<SVGSVGElement>) {
	return <svg viewBox='0 0 14 16'>
		<path style={{strokeWidth: '1.5px', strokeLinecap: 'round', strokeLinejoin: 'round', stroke: T.tint50, fill: 'none'}} d={d.moveTo(4, 7).lineTo(7, 9).lineTo(10, 7)}/>
	</svg>
}


export function SvgCircle(a: Attrs<SVGSVGElement> & { checked: o.RO<boolean> }, ch: Renderable[]) {
  return <svg viewBox='0 0 14 16' class={cls_icon}>
    <path style={{fillRule: 'evenodd'}} d={d.circle(7, 8, 7).circle(7, 8, 5.5)}/>
    {If(a.checked, () => <circle
      cx={7}
      cy={8}
      r={3}
    />)}
    {ch}
  </svg>
}