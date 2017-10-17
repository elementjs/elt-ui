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
var CHECKED = 'dot-circle';
var UNCHECKED = 'circle-o';
var Radio = /** @class */ (function (_super) {
    __extends(Radio, _super);
    function Radio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Radio.prototype.init = function () {
        this.disabled = elt_1.o(this.attrs.disabled || false);
        this.value = this.attrs.value;
        this.model = elt_1.o(this.attrs.model);
    };
    Radio.prototype.setValue = function () {
        this.model.set(this.value);
    };
    Radio.prototype.render = function (children) {
        var _this = this;
        var classes = (_a = {},
            _a[css.on] = this.model.equals(this.value),
            _a[css.off] = this.model.differs(this.value),
            _a[css.disabled] = this.disabled,
            _a);
        return E("label", { class: css.label, "$$": [ink_1.inkable(), elt_1.click(function (e) { return _this.setValue(); })] },
            E(flex_1.Row, { align: 'center' },
                E(icon_1.Icon, { class: [css.icon, classes], name: this.model.tf(function (m) { return m === _this.value ? CHECKED : UNCHECKED; }) }),
                E("span", { class: [css.content, classes] }, children)));
        var _a;
    };
    return Radio;
}(elt_1.Component));
exports.Radio = Radio;
//# sourceMappingURL=radio.js.map