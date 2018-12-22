import { Attrs, o, DisplayIf } from 'elt'
import { Styling as S} from './styling'
import { cls } from 'osun'

export interface ProgressAttrs extends Attrs {
  mode?: o.RO<'determinate' | 'indeterminate' | 'query' | 'buffer' | 'off'>
  progress?: o.RO<number>
  error?: o.RO<boolean>
}


export function Progress({error, mode, progress}: ProgressAttrs) {
  const o_mode = o(mode || 'determinate')
  const o_progress = o(progress || 0)
  const o_error = o(error)
  return <div
    class={[S.bg_primary5, Progress.cls_holder, {[Progress.cls_error]: o_error}]}
    style={{opacity: o_progress.tf(v => v > 0 && v < 100 ? '1' : '0')}}
  >
      {DisplayIf(o_mode.equals('determinate'), () => <div class={[
        S.bg_primary2,
        Progress.cls_determinate
        ]}
        style={{width: o_progress.tf(v => `${v}%`)}}
        />
      )}
      {/* <div class={CSS.primary}/>
      <div class={CSS.secondary}/> */}
    </div>
}


export namespace Progress {

  export const cls_error = cls('error', {
    '--eltui-color-primary': 'var(--eltui-color-accent)'
  })

  export const cls_holder = cls('progress-holder', {
    position: 'absolute',
    transition: 'background-color linear 300ms, opacity linear 500ms',
    pointerEvents: 'none',
    height: '8px',
    width: '100%',
    margin: '0 !important',
    padding: '0 !important'
  })

  export const cls_determinate = cls('progress-determinate', {
    height: '8px',
    transition: `width linear 100ms, background-color linear 300ms`,
  })

}
