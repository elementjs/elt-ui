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
//////////////////////////////////////////////////////////////
var elt_1 = require("elt");
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selected = elt_1.o('-1');
        return _this;
    }
    /**
     * Setup the observation logic.
     */
    Select.prototype.render = function (children) {
        var _this = this;
        var mod = false;
        var attrs = this.attrs;
        var options = elt_1.o(attrs.options);
        var model = attrs.model, labelfn = attrs.labelfn, onchange = attrs.onchange;
        // Used for typing, to avoid the undefined part.
        var real_labelfn = function (obj) {
            return obj.label || obj.text || obj;
        };
        if (labelfn)
            real_labelfn = labelfn;
        //  We use a touched() function to avoid infinite loops since there
        //  is a circular logic here.
        var touched = function () {
            if (mod)
                return true;
            mod = true;
            requestAnimationFrame(function () { mod = false; });
            return false;
        };
        this.observe(options, function (opts) {
            if (touched())
                return;
            _this.selected.set('' + opts.indexOf(model.get()));
        });
        this.observe(model, function (v) {
            if (touched())
                return;
            _this.selected.set('' + options.get().indexOf(v));
        });
        this.observe(this.selected, function (v) {
            if (touched())
                return;
            model.set(options.get()[parseInt(v)]);
        });
        ////////////////////////////////
        var decorators = [elt_1.bind(this.selected)];
        if (onchange) {
            var fn = onchange; // used this for typing matters.
            decorators.push(elt_1.on('change', function (ev) { return fn(model.get(), ev); }));
        }
        return E("label", { class: 'em-select-label' },
            E("select", { class: 'em-select', "$$": decorators }, elt_1.Repeat(options, function (opt, i) { return E("option", { value: i, selected: model.equals(opt) }, opt.tf(function (val) { return elt_1.Display(real_labelfn(val)); })); })));
    };
    return Select;
}(elt_1.Component));
exports.Select = Select;
//# sourceMappingURL=select.js.map