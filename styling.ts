
export {style, cssRule} from 'typestyle'

import {types} from 'typestyle'

type Props = types.NestedCSSProperties

export const BoxShadow = {} as Props
export const BigFont = {fontSize: '24px'} as Props
export const VeryBigFont = {fontSize: '32px'} as Props

function _merge<T extends Object>(...objs: T[]): T {
  var res: T = {} as T
  for (var ob of objs) {
    for (var key in ob) {
      res[key] = ob[key]
    }
  }
  return res
}

export function nest(spec: string, ...props: Props[]) {
  return {$nest: {[spec]: _merge(props)}}
}

export function and(cls: string, ...props: Props[]) {
  return {$nest: {[`&.${cls}`]: _merge(props)}}
}