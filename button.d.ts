import { Component, MaybeObservable, Attrs, Listener } from 'elt';
export interface ButtonAttrs extends Attrs {
    disabled?: MaybeObservable<boolean>;
    raised?: MaybeObservable<boolean>;
    click?: Listener<MouseEvent>;
    icon?: MaybeObservable<string>;
}
export interface ButtonBarAttrs extends Attrs {
    stacked?: boolean;
}
export declare class ButtonBar extends Component {
    attrs: ButtonBarAttrs;
    inserted(node: Element, parent: Element): void;
    removed(node: Element, parent: Element): void;
    render(children: DocumentFragment): Element;
}
export declare function Button(attrs: ButtonAttrs, children: DocumentFragment): Element;
