import { Attrs, ArrayOrSingle, ClassDefinition, Mixin, MaybeObservable } from 'elt';
export declare class DialogCtrl<T> extends Mixin {
    promise: Promise<T>;
    _resolve: (v: T) => any;
    _reject: (...a: Array<any>) => any;
    constructor();
    resolve(value: T): void;
    reject(value: any): void;
}
export declare function Overlay(attrs: Attrs, children: DocumentFragment): Element;
export declare function Title(attrs: Attrs, children: DocumentFragment): Element;
export declare function Content(attrs: Attrs, children: DocumentFragment): Element;
export interface ButtonbarAttributes extends Attrs {
    stacked?: MaybeObservable<boolean>;
}
export declare function Buttonbar(attrs: ButtonbarAttributes, children: DocumentFragment): Element;
export declare function Root(attrs: Attrs, children: DocumentFragment): Element;
export interface DialogOptions {
    parent?: Node;
    class?: ArrayOrSingle<ClassDefinition>;
    noanimate?: boolean;
    clickOutsideToClose?: boolean;
    noEscapeKey?: boolean;
    animationEnter?: string;
    animationLeave?: string;
}
export declare type DialogBuilder<T> = (dlc: DialogCtrl<T>) => Node;
/**
 * A function that returns a promise and that allows us to show a nice dialog.
 */
export declare function dialog<T>(opts: DialogOptions, cbk: DialogBuilder<T>): Promise<T>;
export interface ModalOptions extends DialogOptions {
    text: string;
    title: string;
    agree?: string;
    disagree?: string;
}
/**
 * A modal dialog.
 * @param  {Object} opts Options
 * @return {Promise}
 */
export declare function modal(opts: ModalOptions): Promise<{}>;
