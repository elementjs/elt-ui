
import {style as _style, types, cssRule, keyframes as _keyframes} from 'typestyle'

declare module 'typestyle/lib/types' {
  interface CSSProperties {

    '--em-color-primary'?: string
    '--em-color-fg'?: string
    '--em-color-bg'?: string
    '--em-color-accent'?: string

    '--em-color-primary-save'?: string
    '--em-color-fg-save'?: string
    '--em-color-bg-save'?: string
  }
}


export type Props = types.NestedCSSProperties

export namespace CSS {

  function _merge<T extends Object>(objs: T[]): T {
    var res: T = {} as T
    for (var ob of objs) {
      for (var key in ob) {
        res[key] = ob[key]
      }
    }
    return res
  }

  export function groupClasses(spec: string) {
    return spec.replace(/\s*[-\w_$]+\s*/g, match => '.' + match.trim())
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
  export const lastChild = mknest(':last-child')
  export const focus = mknest(':focus')
  export const hover = mknest(':hover')
  export const before = mknest(':before')
  export const after = mknest(':after')

  /**
   *
   * @param name The $debugName for typestyle
   * @param _props A list of property objects or class names
   *    that should be applied along with this new style.
   */
  export function style(name: string, ..._props: (Props|string)[]) {
    const names: string[] = []
    const props: Props[] = []
    for (var p of _props) {
      if (typeof p === 'string')
        names.push(p)
      else
        props.push(p)
    }
    var res = _style({$debugName: name}, ...props)
    names.push(res)
    return names.join(' ')
  }

  export function rule(sel: string, ...props: Props[]) {
    return cssRule(sel, ...props)
  }

  export function keyframes(name: string, frames: types.KeyFrames) {
    frames.$debugName = name
    return _keyframes(frames)
  }

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

    export const Accent = `rgba(var(--em-color-accent), 1)`

    export const Primary = `rgba(var(--em-color-primary), 1)`
    export const Primary2 = `rgba(var(--em-color-primary), 0.74)`
    export const Primary3 = `rgba(var(--em-color-primary), 0.54)`
    export const Primary4 = `rgba(var(--em-color-primary), 0.24)`
    export const Primary5 = `rgba(var(--em-color-primary), 0.14)`
    export const Primary6 = `rgba(var(--em-color-primary), 0.07)`

    export const Bg = `rgba(var(--em-color-bg), 1)`
    export const Bg2 = `rgba(var(--em-color-bg), 0.74)`
    export const Bg3 = `rgba(var(--em-color-bg), 0.54)`
    export const Bg4 = `rgba(var(--em-color-bg), 0.24)`
    export const Bg5 = `rgba(var(--em-color-bg), 0.14)`
    export const Bg6 = `rgba(var(--em-color-bg), 0.07)`

    export const Fg = `rgba(var(--em-color-fg), 1)`
    export const Fg2 = `rgba(var(--em-color-fg), 0.74)`
    export const Fg3 = `rgba(var(--em-color-fg), 0.54)`
    export const Fg4 = `rgba(var(--em-color-fg), 0.24)`
    export const Fg5 = `rgba(var(--em-color-fg), 0.14)`
    export const Fg6 = `rgba(var(--em-color-fg), 0.07)`

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


  export namespace text {
    export const bold = style('bold', {fontWeight: 'bold'})

    export const small = style('small', {fontSize: '14px'})
    export const smaller = style('smaller', {fontSize: '12px'})
    export const verysmall = style('very-small', {fontSize: '10px'})

    export const centered = style('text-center', {textAlign: 'center'})
    export const right = style('text-right', {textAlign: 'right'})
    export const justified = style('text-right', {textAlign: 'justify'})

    export const fg = style('text-fg', {color: colors.Fg})
    export const fg2 = style('text-fg2', {color: colors.Fg2})
    export const fg3 = style('text-fg3', {color: colors.Fg3})
    export const fg4 = style('text-fg4', {color: colors.Fg4})
    export const fg5 = style('text-fg5', {color: colors.Fg5})
    export const fg6 = style('text-fg6', {color: colors.Fg6})

    export const primary = style('text-primary', {color: colors.Primary})
    export const primary2 = style('text-primary2', {color: colors.Primary2})
    export const primary3 = style('text-primary3', {color: colors.Primary3})
    export const primary4 = style('text-primary4', {color: colors.Primary4})
    export const primary5 = style('text-primary5', {color: colors.Primary5})
    export const primary6 = style('text-primary6', {color: colors.Primary6})

  }


  export namespace background {
    export const primary = style('bg-primary', {backgroundColor: colors.Primary})
    export const primary2 = style('bg-primary2', {backgroundColor: colors.Primary2})
    export const primary3 = style('bg-primary3', {backgroundColor: colors.Primary3})
    export const primary4 = style('bg-primary4', {backgroundColor: colors.Primary4})
    export const primary5 = style('bg-primary5', {backgroundColor: colors.Primary5})
    export const primary6 = style('bg-primary6', {backgroundColor: colors.Primary6})
  }


  export namespace values {

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

  export const padded = style('padded', {padding: '16px'})
  export const bold = style('bold', {fontWeight: 'bold'})
  export const raised = style('raised', {boxShadow: `0 2px 2px ${colors.Fg3}`})
  export const cursorPointer = style('cursor-pointer', {cursor: 'pointer'})
  export const relative = style('relative', {position: 'relative'})
  export const absolute = style('absolute', {position: 'absolute'})
  export const noPointerEvent = style('no-pointer-events', {pointerEvents: 'none'})

}

export default CSS