
import {style as _style, types, cssRule, keyframes as _keyframes} from 'typestyle'

declare module 'typestyle/lib/types' {
  interface CSSProperties {

    '--em-color-primary'?: string
    '--em-color-fg'?: string
    '--em-color-contrast'?: string
    '--em-color-bg'?: string

    '--em-color-primary-save'?: string
    '--em-color-fg-save'?: string
    '--em-color-contrast-save'?: string
    '--em-color-bg-save'?: string
  }
}

export namespace CSS {
  export const displayNone = style('display-none', {display: 'none'})
}

export type Props = types.NestedCSSProperties

export const FontNormal = {fontSize: '14px'} as Props
export const FontBigger = {fontSize: '18px'} as Props
export const FontBig = {fontSize: '24px'} as Props
export const FontVeryBig = {fontSize: '32px'} as Props
export const FontHuge = {fontSize: '48px'} as Props

export namespace colors {
  export const Primary = `rgba(var(--em-color-primary), 1)`

  export const Contrast = `rgba(var(--em-color-contrast), 0.87)`
  export const ContrastLight = `rgba(var(--em-color-contrast), 0.74)`
  export const ContrastLighter = `rgba(var(--em-color-contrast), 0.54)`
  export const ContrastVeryLight = `rgba(var(--em-color-contrast), 0.24)`
  export const ContrastFaint = `rgba(var(--em-color-contrast), 0.14)`
  export const ContrastFaintest = `rgba(var(--em-color-contrast), 0.07)`

  export const Fg = `rgba(var(--em-color-fg), 0.87)`
  export const FgLight = `rgba(var(--em-color-fg), 0.74)`
  export const FgLighter = `rgba(var(--em-color-fg), 0.54)`
  export const FgVeryLight = `rgba(var(--em-color-fg), 0.24)`
  export const FgFaint = `rgba(var(--em-color-fg), 0.14)`
  export const FgFaintest = `rgba(var(--em-color-fg), 0.07)`

  export const Bg = `rgba(var(--em-color-bg), 1)`

  export const Invisible = `rgba(0, 0, 0, 0)`
}

export namespace values {
  // Standard Box Shadow
  export const BoxShadow = {
    boxShadow: `0 2px 2px ${colors.FgLighter}`
  } as Props

  export const NoSpuriousBorders = {
    '-webkit-tap-highlight-color': colors.Invisible,
    'outline': 0
  } as Props

  export const NoNativeAppearance = {
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    appearance: 'none'
  } as Props

}

function _merge<T extends Object>(objs: T[]): T {
  var res: T = {} as T
  for (var ob of objs) {
    for (var key in ob) {
      res[key] = ob[key]
    }
  }
  return res
}

export function nest(spec: string, ...props: Props[]): Props {
  return {$nest: {['&' + spec]: _merge(props)}} as Props
}

export function child(spec: string, ...props: Props[]): Props {
  return nest('& > ' + spec, ...props)
}


export function and(cls: string, ...props: Props[]): Props {
  const res = {$nest: {[`&.${cls}`]: _merge(props)}} as Props
  return res
}

function mknest(sel: string) {
  return function (...props: Props[]): Props {
    return {$nest: {[`&${sel}`]: _merge(props)}}
  }
}

export const firstChild = mknest(':first-child')
export const focus = mknest(':focus')
export const hover = mknest(':hover')
export const before = mknest(':before')
export const after = mknest(':after')

export function style(name: string, ...props: Props[]) {
  return _style({$debugName: name}, ...props)
}

export function rule(sel: string, ...props: Props[]) {
  return cssRule(sel, ...props)
}

export function keyframes(name: string, frames: types.KeyFrames) {
  frames.$debugName = name
  return _keyframes(frames)
}
