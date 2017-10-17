import { Attrs, Observable, MaybeObservable, Component } from 'elt';
export interface RadioAttributes<T> extends Attrs {
    model: Observable<T>;
    value: T;
    disabled?: MaybeObservable<boolean>;
}
export declare class Radio<T> extends Component {
    attrs: RadioAttributes<T>;
    disabled: Observable<boolean>;
    value: T;
    model: Observable<T>;
    init(): void;
    setValue(): void;
    render(children: DocumentFragment): Element;
}
