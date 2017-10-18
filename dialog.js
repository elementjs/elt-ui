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
var animate_1 = require("./animate");
var button_1 = require("./button");
// import * as css from './dialog.styl'
var typestyle_1 = require("typestyle");
var csstips_1 = require("csstips");
var CSS;
(function (CSS) {
    CSS.stacked = 'em-stacked';
    CSS.enter = 'em-enter';
    CSS.leave = 'em-leave';
    CSS.root = typestyle_1.style({
        '-webkit-transform-style': 'preserve-3d',
        '-webkit-backface-visibility': 'hidden',
        transform: "translateZ(0)",
        transformOrigin: "50% 0",
        margin: "24px 24px",
        backgroundColor: "white"
    });
    CSS.overlay = typestyle_1.style({
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        transform: 'translateZ(0)',
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        $nest: (_a = {},
            _a["&." + CSS.enter] = {
                animation: animate_1.animations.fadeIn + " 0.2s both ease-in",
                $nest: (_b = {},
                    _b["& ." + CSS.root] = {
                        animation: animate_1.animations.topEnter + " 0.2s both ease-in"
                    },
                    _b)
            },
            _a["&." + CSS.leave] = {
                animation: animate_1.animations.fadeOut + " 0.2s both ease-out",
                $nest: (_c = {},
                    _c["& ." + CSS.root] = {
                        animation: animate_1.animations.topLeave + " 0.2s both ease-out"
                    },
                    _c)
            },
            _a)
    });
    CSS.buttonbar = typestyle_1.style(csstips_1.horizontal, csstips_1.endJustified);
    typestyle_1.cssRule("." + CSS.buttonbar + "." + CSS.stacked, csstips_1.vertical, csstips_1.centerJustified);
    CSS.content = typestyle_1.style({
        padding: '0 24px',
        paddingBottom: '24px',
        color: 'var(--em-text-color)',
        $nest: {
            '&:first-child': {
                paddingTop: '24px'
            },
            '> *:last-child': {
                marginBottom: 0
            }
        }
    });
    CSS.title = typestyle_1.style({
        margin: 0,
        padding: 0
    });
    var _a, _b, _c;
})(CSS || (CSS = {}));
var DialogCtrl = /** @class */ (function (_super) {
    __extends(DialogCtrl, _super);
    function DialogCtrl() {
        var _this = _super.call(this) || this;
        _this.promise = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });
        return _this;
    }
    DialogCtrl.prototype.resolve = function (value) {
        this._resolve(value);
    };
    DialogCtrl.prototype.reject = function (value) {
        this._reject(value);
    };
    return DialogCtrl;
}(elt_1.Mixin));
exports.DialogCtrl = DialogCtrl;
function Overlay(attrs, children) {
    return E(flex_1.Column, { align: 'center', justify: 'center', class: CSS.overlay }, children);
}
exports.Overlay = Overlay;
function Title(attrs, children) { return E("h3", { class: CSS.title }, children); }
exports.Title = Title;
function Content(attrs, children) { return E("div", { class: CSS.content }, children); }
exports.Content = Content;
// FIXME this node should watch the width of its children to be able
// to switch to the vertical presentation for dialog buttons.
function Buttonbar(attrs, children) {
    return E("div", { class: [CSS.buttonbar, (_a = {}, _a[CSS.stacked] = attrs.stacked, _a)] }, children);
    var _a;
}
exports.Buttonbar = Buttonbar;
function Root(attrs, children) {
    return E(flex_1.Column, { class: CSS.root }, children);
}
exports.Root = Root;
/**
 * A function that returns a promise and that allows us to show a nice dialog.
 */
function dialog(opts, cbk) {
    var dlg = new DialogCtrl();
    var contents = cbk(dlg);
    function bye(res) {
        return animate_1.animateClass(dialog_holder, CSS.leave).then(function () {
            dialog_holder.remove();
            return res;
        });
    }
    function handleEscape(ev) {
        if (opts.noEscapeKey)
            return;
        if (ev.keyCode === 27)
            dlg.reject('pressed escape');
    }
    var dialog_holder = E(Overlay, { "$$": [
            elt_1.click(function (e, node) {
                if (e.target === node && opts.clickOutsideToClose)
                    dlg.reject('clicked outside to close');
            }),
            dlg,
            // Handle the escape key.
            elt_1.inserted(function (node) { return node.ownerDocument.addEventListener('keyup', handleEscape); }),
            elt_1.removed(function (node) { return node.ownerDocument.removeEventListener('keyup', handleEscape); })
        ] },
        E(Root, { class: opts.class ? opts.class : '' }, contents));
    if (!opts.noanimate) {
        animate_1.animateClass(dialog_holder, CSS.enter);
    }
    // Remove the dialog from the DOM once we have answered it.
    var parent = opts.parent || document.body;
    parent.appendChild(dialog_holder);
    return dlg.promise.then(bye, function (err) { return bye(Promise.reject(err)); });
}
exports.dialog = dialog;
/**
 * A modal dialog.
 * @param  {Object} opts Options
 * @return {Promise}
 */
function modal(opts) {
    return dialog(opts, function (dlg) {
        return E(elt_1.Fragment, null,
            opts.title ? E(Title, null, opts.title) : null,
            E(Content, null, opts.text.split(/\s*\n\s*/).map(function (e) { return E("p", null, e); })),
            E(Buttonbar, null,
                elt_1.DisplayIf(opts.disagree, function (disagree) {
                    return E(button_1.Button, { click: function () { return dlg.resolve(false); } }, disagree);
                }),
                elt_1.DisplayIf(opts.agree, function (agree) {
                    return E(button_1.Button, { click: function () { return dlg.resolve(true); } }, agree);
                })));
    });
}
exports.modal = modal;
//# sourceMappingURL=dialog.js.map