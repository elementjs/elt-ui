import { Attrs, Component, MaybeObservable, Observable } from 'elt';
export declare type LabelFn<T> = (opt: T) => MaybeObservable<string>;
export declare type ChangeFn<T> = (value: T, ev?: Event) => any;
export interface SelectAttributes<T> extends Attrs {
    model: Observable<T>;
    options: MaybeObservable<T[]>;
    labelfn?: LabelFn<T>;
    onchange?: ChangeFn<T>;
}
export declare class Select<T> extends Component {
    attrs: SelectAttributes<T>;
    protected selected: Observable<string>;
    /**
     * Setup the observation logic.
     */
    render(children: DocumentFragment): Element;
}
