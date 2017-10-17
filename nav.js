"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var elt_1 = require("elt");
var ink_1 = require("./ink");
var icon_1 = require("./icon");
var flex_1 = require("./flex");
var animate_1 = require("./animate");
var css = require("./nav.styl");
var Nav = /** @class */ (function (_super) {
    __extends(Nav, _super);
    function Nav() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Nav.prototype.detach = function () {
        var _this = this;
        animate_1.animateClass(this.node, 'animation-leave').then(function () {
            _this.node.remove();
        }).catch(function (e) {
            console.error(e);
        });
    };
    Nav.prototype.inserted = function (node) {
        this.node = node;
        animate_1.animateClass(node, 'animation-enter');
    };
    Nav.prototype.removed = function () {
        this.node = null;
    };
    Nav.prototype.render = function (ch) {
        var _this = this;
        return E("div", { class: css.holder },
            E("div", { class: css.overlay, "$$": [elt_1.click(function (e, overlay) {
                        if (e.target === overlay)
                            _this.detach();
                    })] }),
            E(flex_1.Column, { class: css.drawer }, ch));
    };
    return Nav;
}(elt_1.Component));
exports.Nav = Nav;
function NavHeader(a, ch) {
    return E("div", { class: css.header }, ch);
}
exports.NavHeader = NavHeader;
function NavSubheader(a, ch) {
    return E("div", { class: css.subheader }, ch);
}
exports.NavSubheader = NavSubheader;
function NavDivider(a, ch) {
    return E("div", { class: css.divider });
}
exports.NavDivider = NavDivider;
function NavItem(a, ch) {
    var res = E("div", { class: css.item, "$$": [ink_1.inkClickDelay(function (e) {
                if (a.click && a.click(e) !== false) {
                    var c = Nav.get(res);
                    // XXX should we log an error here if c was null ?
                    if (c)
                        c.detach();
                }
            })] },
        E(icon_1.Icon, { class: css.itemIcon, name: a.icon }),
        ch);
    return res;
}
exports.NavItem = NavItem;
function NavBody(a, ch) {
    return E("div", { class: css.body }, ch);
}
exports.NavBody = NavBody;
function NavFooter(a, ch) {
    return E("div", { class: css.footer }, ch);
}
exports.NavFooter = NavFooter;
//# sourceMappingURL=nav.js.map