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
var icon_1 = require("./icon");
var flex_1 = require("./flex");
var ink_1 = require("./ink");
var css = require("./button.styl");
var ButtonBar = /** @class */ (function (_super) {
    __extends(ButtonBar, _super);
    function ButtonBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonBar.prototype.inserted = function (node, parent) {
        parent.classList.add(css.hasButtonBar);
    };
    ButtonBar.prototype.removed = function (node, parent) {
        parent.classList.remove(css.hasButtonBar);
    };
    ButtonBar.prototype.render = function (children) {
        return E(flex_1.Row, { class: css.buttonBar }, children);
    };
    return ButtonBar;
}(elt_1.Component));
exports.ButtonBar = ButtonBar;
function Button(attrs, children) {
    function doClick(event) {
        var click = elt_1.o.get(attrs.click);
        if (!elt_1.o.get(attrs.disabled)) {
            // in this context, this is the Node.
            ink_1.inker(event.target, event);
            click && click.call(this, event);
            // this.element.blur() // to prevent focus lingering.
        }
    }
    return E("button", { class: css.button, disabled: elt_1.o(attrs.disabled).tf(function (val) { return !!val; }), "$$": elt_1.click(doClick) }, elt_1.DisplayIf(attrs.icon || '', function (o_name) {
        return E(icon_1.Icon, { class: [css.buttonIcon, (_a = {}, _a[css.disabled] = attrs.disabled, _a[css.raised] = attrs.raised, _a)], name: o_name });
        var _a;
    }, function () {
        return E("span", { class: [css.buttonContent, (_a = {}, _a[css.disabled] = attrs.disabled, _a[css.raised] = attrs.raised, _a)] }, children);
        var _a;
    }));
}
exports.Button = Button;
//# sourceMappingURL=button.js.map