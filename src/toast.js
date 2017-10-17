"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animate_1 = require("./animate");
var cssanim = require("./animations.styl");
var css = require("./toast.styl");
/**
 * FIXME: there should be a queue instead of brutally dismissing everything.
 */
var Toaster = /** @class */ (function () {
    function Toaster() {
        this._mounted = false;
        this._holder = E("div", { class: css.holder });
    }
    Toaster.prototype.kill = function (node) {
        animate_1.animate(node, cssanim.fadeOut + " 0.2s ease-out both").then(function (node) {
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
            : E("div", { class: css.toast }, msg));
        animate_1.animate(toast, cssanim.fadeIn + " 0.2s ease-in both");
        this._holder.appendChild(toast);
        this._cancel = setTimeout(function () { return _this.kill(toast); }, 3000);
        this._current = toast;
    };
    return Toaster;
}());
exports.Toaster = Toaster;
exports.default = new Toaster;
//# sourceMappingURL=toast.js.map