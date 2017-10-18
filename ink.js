"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elt_1 = require("elt");
var typestyle_1 = require("typestyle");
var CSS;
(function (CSS) {
    CSS.rippleAnim = typestyle_1.keyframes({
        '100%': { transform: "scale(4)" }
    });
    CSS.containerRippleAnim = typestyle_1.keyframes({
        '50%': { opacity: 0.2 },
        '100%': { opacity: 0 }
    });
    CSS.animate = 'em-ink-animate';
    CSS.ink = typestyle_1.style({
        display: 'block',
        position: 'absolute',
        backgroundColor: 'var(--em-color-primary)',
        opacity: 0.4,
        borderRadius: '100%',
        transform: 'scale(0)',
        pointerEvents: 'none',
        marginTop: '-25px',
        marginLeft: '-25px',
        width: '50px',
        height: '50px',
        $nest: (_a = {}, _a["&." + CSS.animate] = { animation: CSS.rippleAnim + " 0.45s both ease-out" }, _a)
    });
    CSS.container = typestyle_1.style({
        display: 'block',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        pointerEvents: 'none',
        backgroundColor: 'var(--em-color-primary)',
        $nest: (_b = {}, _b["&." + CSS.animate] = { animation: CSS.containerRippleAnim + " 0.45s both ease-out" }, _b)
    });
    var _a, _b;
})(CSS = exports.CSS || (exports.CSS = {}));
function inker(node, event) {
    var clientX = event.pageX;
    var clientY = event.pageY;
    var inker = elt_1.e('div', { class: CSS.ink });
    var ink_container = elt_1.e('div', { class: CSS.container }, inker);
    node.appendChild(ink_container);
    // atom.append(inker)
    requestAnimationFrame(function (e) {
        var bb = ink_container.getBoundingClientRect();
        inker.style.top = clientY - bb.top + "px";
        inker.style.left = clientX - bb.left + "px";
        inker.classList.add(CSS.animate);
        ink_container.classList.add(CSS.animate);
        setTimeout(function () { return ink_container.remove(); }, 1000);
    });
    // var bb = atom.element.getBounding
}
exports.inker = inker;
function inkable() {
    return elt_1.click(function (ev, node) {
        inker(node, ev);
    });
}
exports.inkable = inkable;
function inkClickDelay(fn) {
    return elt_1.click(function (ev, node) {
        inker(node, ev);
        setTimeout(function () { return fn(ev); }, 150);
    });
}
exports.inkClickDelay = inkClickDelay;
//# sourceMappingURL=ink.js.map