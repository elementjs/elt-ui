import { Component, Attrs } from 'elt';
export interface NavAttributes extends Attrs {
}
export declare class Nav extends Component {
    node: HTMLElement;
    detach(): void;
    inserted(node: HTMLElement): void;
    removed(): void;
    render(ch: DocumentFragment): Element;
}
export declare function NavHeader(a: Attrs, ch: DocumentFragment): Element;
export declare function NavSubheader(a: Attrs, ch: DocumentFragment): Element;
export declare function NavDivider(a: Attrs, ch: DocumentFragment): Element;
export interface NavItemAttributes extends Attrs {
    icon: string;
    click?: (ev: MouseEvent) => any;
}
export declare function NavItem(a: NavItemAttributes, ch: DocumentFragment): Element;
export declare function NavBody(a: Attrs, ch: DocumentFragment): Element;
export declare function NavFooter(a: Attrs, ch: DocumentFragment): Element;
