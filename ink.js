"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elt_1 = require("elt");
var css = require("./ink.styl");
function inker(node, event) {
    var clientX = event.pageX;
    var clientY = event.pageY;
    var inker = elt_1.e('div', { class: css.ink });
    var ink_container = elt_1.e('div', { class: css.container }, inker);
    node.appendChild(ink_container);
    // atom.append(inker)
    requestAnimationFrame(function (e) {
        var bb = ink_container.getBoundingClientRect();
        inker.style.top = clientY - bb.top + "px";
        inker.style.left = clientX - bb.left + "px";
        inker.classList.add('animate');
        ink_container.classList.add('animate');
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