import { Attrs, Component, MaybeObservable, Observable } from 'elt';
import { FlexAttributes } from './flex';
export declare class TabContainer extends Component {
    attrs: FlexAttributes;
    o_content: Observable<Node | null>;
    o_active_tab: Observable<Tab | null>;
    o_titles: Observable<Node[]>;
    render(children: DocumentFragment): Element;
}
export interface TabAttributes extends Attrs {
    title: MaybeObservable<string | number | Node>;
}
/**
 * FIXME missing is_active logic, since I don't know how to dynamically
 * watch the parent container observable.
 */
export declare class Tab extends Component {
    attrs: TabAttributes;
    container: TabContainer | null;
    children: Node[];
    o_is_active: Observable<boolean>;
    inserted(node: Element): void;
    activate(): void;
    render(children: DocumentFragment): Element;
}
