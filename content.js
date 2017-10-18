"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var flex_1 = require("./flex");
var typestyle_1 = require("typestyle");
var CSS;
(function (CSS) {
    CSS.content = typestyle_1.style({
        padding: '16px'
    });
})(CSS = exports.CSS || (exports.CSS = {}));
function Content(attrs, children) {
    var $$children = attrs.$$children, a = __rest(attrs, ["$$children"]);
    return E(flex_1.Child, __assign({}, a, { class: CSS.content }), children);
}
exports.Content = Content;
//# sourceMappingURL=content.js.map