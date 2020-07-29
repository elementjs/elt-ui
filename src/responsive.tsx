
import { o, Renderable } from 'elt'
import { o_viewport_width, o_aspect_ratio } from './events';
import { media } from 'osun';


// see https://ricostacruz.com/til/css-media-query-breakpoints
// for a reference of why these breakpoints where chosen


// need :
//  ability to differ from landscape / portrait
//  similar API between observables, verbs and media queries

export class ResponsiveObservable<T> extends o.CombinedObservable<[number, number], T> {
  values: {orientation?: 'landscape' | 'portrait', width?: number, value: () => T}[] = []

  constructor(def: () => T) {
    super([o_viewport_width, o_aspect_ratio])
    this.values.push({value: def})
  }

  getter([width, aspect]: [number, number]) {
    var rule = this.values[0]
    for (var r of this.values) {
      if ((!r.width || width >= r.width) && (!r.orientation || r.orientation === 'landscape' && aspect >= 1 || r.orientation === 'portrait' && aspect < 1)) {
        rule = r
      }
    }
    return rule.value()
  }

  atWidth(width: number, value: () => T) {
    this.values.push({width, value})
    return this
  }

  atLandscape(value: () => T): this
  atLandscape(width: number, value: () => T): this
  atLandscape(width: number | (() => T), value?: () => T) {
    if (typeof width === 'number')
      this.values.push({width, value: value!, orientation: 'landscape'})
    else
      this.values.push({value: width, orientation: 'landscape'})
    return this
  }

  atPortrait(value: () => T): this
  atPortrait(width: number, value: () => T): this
  atPortrait(width: number | (() => T), value?: () => T) {
    if (typeof width === 'number')
      this.values.push({width, value: value!, orientation: 'portrait'})
    else
      this.values.push({value: width, orientation: 'portrait'})
    return this
  }

}


export function Responsive(def?: () => Renderable): o.ReadonlyObservable<Renderable> & { atWidth: ResponsiveObservable<Renderable>['atWidth'], atPortrait: ResponsiveObservable<Renderable>['atPortrait'], atLandscape: ResponsiveObservable<Renderable>['atLandscape'] } {
  return new ResponsiveObservable(def ?? (() => undefined))
}



export namespace Responsive {
  /**
   * The default is always portrait and the smallest possible width
   */
  export const MOBILE_PORTRAIT = null
  export const MOBILE = MOBILE_PORTRAIT
  export const MOBILE_LANDSCAPE = 480
  export const TABLET_PORTRAIT = 768
  export const TABLET = TABLET_PORTRAIT
  export const TABLET_LANDSCAPE = 992
  export const DESKTOP = 1200

  export class MediaQuerier {
    atWidth(width: number, rules: () => void) {
      media(`only screen and (min-width: ${width}px)`, rules)
    }
  }
}
