
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