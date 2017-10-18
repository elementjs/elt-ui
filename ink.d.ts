import { Mixin } from 'elt';
export declare namespace CSS {
    const rippleAnim: string;
    const containerRippleAnim: string;
    const animate = "em-ink-animate";
    const ink: string;
    const container: string;
}
export declare function inker(node: Node, event: MouseEvent): void;
export declare function inkable(): Mixin;
export declare function inkClickDelay(fn: (ev: MouseEvent) => void): Mixin<Node>;
