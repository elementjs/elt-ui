import { Component, MaybeObservable, Attrs, Listener } from 'elt';
export declare namespace CSS {
    const button: string;
    const baseButton: string;
    const buttonContent: string;
    const buttonIcon: string;
    const raised: string;
    const disabled: string;
    const iconButton: string;
    const buttonBar: string;
    const hasButtonBar: string;
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
export interface ButtonAttrs extends Attrs {
    disabled?: MaybeObservable<boolean>;
    raised?: MaybeObservable<boolean>;
    click?: Listener<MouseEvent>;
    icon?: MaybeObservable<string>;
}
export declare function Button(attrs: ButtonAttrs, children: DocumentFragment): Element;
