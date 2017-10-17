import { Attrs } from 'elt';
export interface FlexAttributes extends Attrs {
    wrap?: string | boolean;
    direction?: string;
    align?: string;
    reverse?: boolean;
    grow?: string;
    basis?: string;
    justify?: string;
    absoluteGrow?: string;
}
export declare function Row(at: FlexAttributes, ch: DocumentFragment): Element;
export declare function Column(at: FlexAttributes, ch: DocumentFragment): Element;
export interface ChildAttributes extends FlexAttributes {
}
/**
 * A child that's not a flex itself (otherwise we'd use Row or Column), on which
 * there is hence no point in using the special align-items, ...
 */
export declare function Child(at: ChildAttributes, ch: DocumentFragment): Element;
