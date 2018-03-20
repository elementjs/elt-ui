import {Attrs, RO, o, DisplayIf} from 'elt'

export interface ProgressAttrs extends Attrs {
  mode?: RO<'determinate' | 'indeterminate' | 'query' | 'buffer' | 'off'>
  progress?: RO<number>
  error?: RO<boolean>
}


export function Progress({error, mode, progress}: ProgressAttrs) {
  const o_mode = o(mode || 'determinate')
  const o_progress = o(progress || 0)
  const o_error = o(error)
  return <div
    class={[base.background.primary5, CSS.holder, {[CSS.error]: o_error}]}
    style={{opacity: o_progress.tf(v => v > 0 && v < 100 ? '1' : '0')}}
  >
      {DisplayIf(o_mode.equals('determinate'), () => <div class={[
        base.background.primary2,
        CSS.determinate
        ]}
        style={{width: o_progress.tf(v => `${v}%`)}}
        />
      )}
      {/* <div class={CSS.primary}/>
      <div class={CSS.secondary}/> */}
    </div>
}

import {cls} from 'osun'
import {css as base} from './styling'
export namespace CSS {

  export const hidden = cls('hidden', {display: 'none'})

  export const error = cls('error', {
    '--em-color-primary': 'var(--em-color-accent)'
  })

  export const holder = cls('progress-holder', {
    position: 'absolute',
    transition: 'background-color linear 300ms, opacity linear 500ms',
    pointerEvents: 'none',
    height: '8px',
    width: '100%',
    margin: '0 !important',
    padding: '0 !important'
  })

  export const determinate = cls('progress-determinate', {
    height: '8px',
    transition: `width linear 100ms, background-color linear 300ms`,
  })

}