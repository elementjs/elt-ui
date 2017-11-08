
import {style as _style, types, cssRule, keyframes as _keyframes} from 'typestyle'

declare module 'typestyle/lib/types' {
  interface CSSProperties {

    '--em-color-primary'?: string
    '--em-color-fg'?: string
    '--em-color-bg'?: string

    '--em-color-primary-save'?: string
    '--em-color-fg-save'?: string
    '--em-color-bg-save'?: string
  }
}

export type Props = types.NestedCSSProperties

export namespace CSS {

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

    export function setPrimary(value: string): Props { return {'--em-color-primary': toRGB(value)} }
    export function setFg(value: string): Props { return {'--em-color-fg': toRGB(value)} }
    export function setBg(value: string): Props { return {'--em-color-bg': toRGB(value)} }

    export const Primary = `rgba(var(--em-color-primary), 1)`
    export const PrimaryLight = `rgba(var(--em-color-primary), 0.74)`
    export const PrimaryLighter = `rgba(var(--em-color-primary), 0.54)`
    export const PrimaryVeryLight = `rgba(var(--em-color-primary), 0.24)`
    export const PrimaryFaint = `rgba(var(--em-color-primary), 0.14)`
    export const PrimaryFaintest = `rgba(var(--em-color-primary), 0.07)`

    export const Bg = `rgba(var(--em-color-bg), 1)`
    export const Bg2 = `rgba(var(--em-color-bg), 0.74)`
    export const Bg3 = `rgba(var(--em-color-bg), 0.54)`
    export const Bg4 = `rgba(var(--em-color-bg), 0.24)`
    export const Bg5 = `rgba(var(--em-color-bg), 0.14)`
    export const Bg6 = `rgba(var(--em-color-bg), 0.07)`

    export const Fg = `rgba(var(--em-color-fg), 1)`
    export const FgLight = `rgba(var(--em-color-fg), 0.74)`
    export const FgLighter = `rgba(var(--em-color-fg), 0.54)`
    export const FgVeryLight = `rgba(var(--em-color-fg), 0.24)`
    export const FgFaint = `rgba(var(--em-color-fg), 0.14)`
    export const FgFaintest = `rgba(var(--em-color-fg), 0.07)`

    export const fg2 = style('fg2', {color: FgFaint})

    export const Invisible = `rgba(0, 0, 0, 0)`

    export const ReversePrimary = {
      backgroundColor: Primary,
      color: Bg,

      // Doing a little trick to swap out primary and contrast
      '--em-color-primary-save': 'var(--em-color-primary)',
      '--em-color-fg-save': 'var(--em-color-fg)',
      '--em-color-bg-save': 'var(--em-color-bg)',
      $nest: {
        '& > *': {
          '--em-color-fg': `var(--em-color-bg-save)`,
          '--em-color-primary': 'var(--em-color-bg-save)',
          '--em-color-bg': 'var(--em-color-primary-save)'
        }
      }
    } as Props
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

  export const fullWidth = style('full-width', {width: '100%'})
  export const fullHeight = style('full-height', {height: '100%'})
  export const fullScreen = style('fullscreen', {
    width: '100%', height: '100%', position: 'fixed',
    left: 0,
    top: 0,
    transformOrigin: '50% 50%'
  })
  export const displayNone = style('display-none', {display: 'none'})

  export const FontSmall = {fontSize: '14px'} as Props
  export const FontNormal = {fontSize: '16px'} as Props
  export const FontBigger = {fontSize: '18px'} as Props
  export const FontBig = {fontSize: '24px'} as Props
  export const FontVeryBig = {fontSize: '32px'} as Props
  export const FontHuge = {fontSize: '48px'} as Props
  export const Padded = {padding: '16px'} as Props

  export const padded = style('padded', Padded)
  export const bold = style('bold', {fontWeight: 'bold'})
  export const raised = style('raised', {boxShadow: `0 2px 2px ${colors.FgLighter}`})

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

  export function descendant(spec: string, ...props: Props[]): Props {
    return nest('& ' + spec, ...props)
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
}

export default CSS