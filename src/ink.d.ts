import { Mixin } from 'elt';
export declare function inker(node: Node, event: MouseEvent): void;
export declare function inkable(): Mixin;
export declare function inkClickDelay(fn: (ev: MouseEvent) => void): Mixin<Node>;
