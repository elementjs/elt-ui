import {Attrs, RO, o, DisplayIf} from 'elt'
import {Css} from './styling'


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
    class={[Css.background.primary5, Progress.holder, {[Progress.error]: o_error}]}
    style={{opacity: o_progress.tf(v => v > 0 && v < 100 ? '1' : '0')}}
  >
      {DisplayIf(o_mode.equals('determinate'), () => <div class={[
        Css.background.primary2,
        Progress.determinate
        ]}
        style={{width: o_progress.tf(v => `${v}%`)}}
        />
      )}
      {/* <div class={CSS.primary}/>
      <div class={CSS.secondary}/> */}
    </div>
}


export namespace Progress {

  export const hidden = Css('hidden', {display: 'none'})

  export const error = Css('error', {
    '--em-color-primary': 'var(--em-color-accent)'
  })

  export const holder = Css('progress-holder', {
    position: 'absolute',
    transition: 'background-color linear 300ms, opacity linear 500ms',
    pointerEvents: 'none',
    height: '8px',
    width: '100%',
    margin: '0 !important',
    padding: '0 !important'
  })

  export const determinate = Css('progress-determinate', {
    height: '8px',
    transition: `width linear 100ms, background-color linear 300ms`,
  })

}