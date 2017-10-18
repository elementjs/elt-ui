export declare const animations: {
    fadeIn: string;
    fadeOut: string;
    slideFromRight: string;
    slideToRight: string;
    topEnter: string;
    topLeave: string;
};
export declare function transition(): void;
export declare function animate(node: HTMLElement, anim: string): Promise<HTMLElement>;
export declare function animateClass(node: HTMLElement, cls: string): Promise<{}>;
