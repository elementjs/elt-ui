import { MaybeObservable, Attrs } from 'elt';
export interface IconAttributes extends Attrs {
    name: MaybeObservable<string>;
}
export declare function Icon({name}: IconAttributes, content: DocumentFragment): Element;
