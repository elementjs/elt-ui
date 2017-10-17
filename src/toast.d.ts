import { Insertable } from 'elt';
/**
 * FIXME: there should be a queue instead of brutally dismissing everything.
 */
export declare class Toaster {
    _mounted: boolean;
    _holder: Node;
    _current: HTMLElement;
    _cancel: number;
    constructor();
    kill(node: HTMLElement): void;
    toast(msg: Insertable): void;
}
declare const _default: Toaster;
export default _default;
