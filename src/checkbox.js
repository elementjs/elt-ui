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
var flex_1 = require("./flex");
var icon_1 = require("./icon");
var ink_1 = require("./ink");
var css = require("./checkbox.styl");
var OFF = 'square-o';
var ON = 'check-square';
var INDETERMINATE = 'minus-square';
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Checkbox.prototype.toggle = function () {
        if (this.o_disabled.get())
            return;
        this.o_model.toggle();
    };
    Checkbox.prototype.render = function (children) {
        var _this = this;
        this.o_model = elt_1.o(this.attrs.model);
        this.o_disabled = elt_1.o(this.attrs.disabled);
        function getIcon(value) {
            if (value === undefined)
                return INDETERMINATE;
            if (value)
                return ON;
            return OFF;
        }
        var classes = (_a = {},
            _a[css.on] = this.o_model,
            _a[css.off] = this.o_model.isFalse(),
            _a[css.disabled] = this.o_disabled,
            _a);
        return E("label", { class: css.label, "$$": [ink_1.inkable(), elt_1.click(function (e) { return _this.toggle(); })] },
            E(flex_1.Row, { align: 'center' },
                E(icon_1.Icon, { class: [css.icon, classes], name: this.o_model.tf(getIcon) }),
                E("span", { class: [css.content, classes] }, children)));
        var _a;
    };
    return Checkbox;
}(elt_1.Component));
exports.Checkbox = Checkbox;
//# sourceMappingURL=checkbox.js.map