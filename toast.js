"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animate_1 = require("./animate");
var typestyle_1 = require("typestyle");
var csstips_1 = require("csstips");
exports.css = {
    holder: typestyle_1.style(csstips_1.flex, csstips_1.centerJustified, {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
    }),
    toast: typestyle_1.style({
        padding: '14px 24px',
        fontSize: '14px',
        background: 'alpha(#323232, 0.87)',
        borderRadius: '2px 2px 0 0',
        color: 'white',
        cursor: 'pointer'
    })
};
// import * as css from './toast.styl'
/**
 * FIXME: there should be a queue instead of brutally dismissing everything.
 */
var Toaster = /** @class */ (function () {
    function Toaster() {
        this._mounted = false;
        this._holder = E("div", { class: exports.css.holder });
    }
    Toaster.prototype.kill = function (node) {
        animate_1.animate(node, animate_1.animations.fadeOut + " 0.2s ease-out both").then(function (node) {
            return node.remove();
        });
    };
    Toaster.prototype.toast = function (msg) {
        // if (!this._mounted)
        // 	this.mount(document.body);
        var _this = this;
        if (this._current) {
            clearTimeout(this._cancel);
            this.kill(this._current);
        }
        // let promise: Promise<any> = this._current ? this._current.destroy() : Promise.resolve(true)
        if (!this._holder.parentNode)
            document.body.appendChild(this._holder);
        var toast = (msg instanceof Node ? msg
            : E("div", { class: exports.css.toast }, msg));
        animate_1.animate(toast, animate_1.animations.fadeIn + " 0.2s ease-in both");
        this._holder.appendChild(toast);
        this._cancel = setTimeout(function () { return _this.kill(toast); }, 3000);
        this._current = toast;
    };
    return Toaster;
}());
exports.Toaster = Toaster;
exports.default = new Toaster;
//# sourceMappingURL=toast.js.map