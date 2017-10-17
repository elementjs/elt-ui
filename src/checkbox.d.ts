import { MaybeObservable, Observable, Attrs, Component } from 'elt';
export interface CheckboxAttributes extends Attrs {
    model: Observable<boolean>;
    disabled?: MaybeObservable<boolean>;
}
export declare class Checkbox extends Component {
    attrs: CheckboxAttributes;
    o_model: Observable<boolean>;
    o_disabled: Observable<boolean | undefined>;
    toggle(): void;
    render(children: DocumentFragment): Element;
}
