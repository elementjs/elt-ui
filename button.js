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
var typestyle_1 = require("typestyle");
var CSS;
(function (CSS) {
    CSS.button = typestyle_1.style({
        // This style applies to a button, that we want to completely reset.
        border: 0,
        margin: 0,
        background: 'none',
        position: 'relative',
        display: 'inline-block',
        padding: '8px',
        outline: 0,
        '-webkit-tap-highlight-color': "rgba(0,0,0,0)"
    });
    CSS.baseButton = typestyle_1.style({
        '-webkit-tap-highlight-color': "rgba(0,0,0,0)",
        verticalAlign: 'middle',
        color: "var(--em-color-primary)",
        display: 'inline-block',
        textAlign: 'center',
        cursor: 'pointer',
        position: 'relative' // needed for inker.
    });
    CSS.buttonContent = typestyle_1.style({
        minWidth: '64px',
        textTransform: 'uppercase',
        fontWeight: 500,
        // Should probably have a mixin for that
        // as it should be some global configuration option.
        borderRadius: '2px',
        borderStyle: 'none',
        padding: "0 6px",
        lineHeight: '36px',
        height: '36px',
        userSelect: 'none'
    });
    CSS.buttonIcon = typestyle_1.style({
        $nest: {
            '&:before': {
                fontSize: '24px'
            }
        }
    });
    CSS.raised = typestyle_1.style({
        color: 'var(--em-color-inverse, white)',
        backgroundColor: 'var(--em-color-primary)',
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.54)"
    });
    CSS.disabled = typestyle_1.style({
        color: "var(--em-color-disabled)",
        boxShadow: 'none'
    });
    CSS.iconButton = typestyle_1.style({
        $nest: (_a = {},
            _a['&:before'] = {
                fontSize: '24px'
            },
            _a)
    });
    typestyle_1.cssRule("." + CSS.button + " + ." + CSS.button, {
        marginLeft: 0,
        marginTop: 0
    });
    CSS.buttonBar = typestyle_1.style({
        $nest: (_b = {},
            _b["& > ." + CSS.button] = {
                paddingBottom: 0
            },
            _b)
    });
    CSS.hasButtonBar = typestyle_1.style({
        paddingBottom: 0
    });
    var _a, _b;
})(CSS = exports.CSS || (exports.CSS = {}));
var ButtonBar = /** @class */ (function (_super) {
    __extends(ButtonBar, _super);
    function ButtonBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonBar.prototype.inserted = function (node, parent) {
        parent.classList.add(CSS.hasButtonBar);
    };
    ButtonBar.prototype.removed = function (node, parent) {
        parent.classList.remove(CSS.hasButtonBar);
    };
    ButtonBar.prototype.render = function (children) {
        return E(flex_1.Row, { class: CSS.buttonBar }, children);
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
    return E("button", { class: CSS.button, disabled: elt_1.o(attrs.disabled).tf(function (val) { return !!val; }), "$$": elt_1.click(doClick) }, elt_1.DisplayIf(attrs.icon || '', function (o_name) {
        return E(icon_1.Icon, { class: [
                CSS.baseButton,
                CSS.buttonIcon,
                (_a = {}, _a[CSS.disabled] = attrs.disabled, _a[CSS.raised] = attrs.raised, _a)
            ], name: o_name });
        var _a;
    }, function () {
        return E("span", { class: [
                CSS.baseButton,
                CSS.buttonContent,
                (_a = {}, _a[CSS.disabled] = attrs.disabled, _a[CSS.raised] = attrs.raised, _a)
            ] }, children);
        var _a;
    }));
}
exports.Button = Button;
//# sourceMappingURL=button.js.map