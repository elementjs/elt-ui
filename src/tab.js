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
var elt_1 = require("elt");
var ink_1 = require("./ink");
var flex_1 = require("./flex");
var css = require("./tab.styl");
var TabContainer = /** @class */ (function (_super) {
    __extends(TabContainer, _super);
    function TabContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.o_content = elt_1.o(null);
        _this.o_active_tab = elt_1.o(null);
        _this.o_titles = elt_1.o([]);
        return _this;
    }
    TabContainer.prototype.render = function (children) {
        var _a = this.attrs, $$children = _a.$$children, attrs = __rest(_a, ["$$children"]);
        return E(flex_1.Column, __assign({}, attrs),
            E(flex_1.Row, { justify: 'center', class: css.bar }, elt_1.Repeat(this.o_titles, function (o_t) { return o_t.get(); })),
            children);
    };
    return TabContainer;
}(elt_1.Component));
exports.TabContainer = TabContainer;
/**
 * FIXME missing is_active logic, since I don't know how to dynamically
 * watch the parent container observable.
 */
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = [];
        _this.o_is_active = elt_1.o(false);
        return _this;
    }
    Tab.prototype.inserted = function (node) {
        var _this = this;
        if (this.container)
            return;
        this.container = TabContainer.get(node);
        if (!this.container)
            throw new Error('Tab must be inside a TabContainer');
        this.container.o_titles.push(E("div", { class: [css.title, { active: this.o_is_active }], "$$": [
                elt_1.click(function (ev) { return _this.activate(); }),
                ink_1.inkable()
            ] }, this.attrs.title));
        this.observe(this.container.o_active_tab, function (tab) {
            _this.o_is_active.set(tab === _this);
        });
        // This this tab as the active one if no tab is being displayed
        if (this.container.o_active_tab.get() == null)
            this.activate();
    };
    Tab.prototype.activate = function () {
        if (!this.container)
            throw new Error('No container');
        if (this.container.o_active_tab.get() === this)
            return;
        this.container.o_active_tab.set(this);
    };
    Tab.prototype.render = function (children) {
        return E(flex_1.Column, { absoluteGrow: '1', class: css.content, style: { display: this.o_is_active.tf(function (act) { return act ? 'flex' : 'none'; }) } }, children);
    };
    return Tab;
}(elt_1.Component));
exports.Tab = Tab;
//# sourceMappingURL=tab.js.map