"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var elt_1 = require("elt");
var css = require("./input.styl");
var id_gen = 0;
function Input(attrs, content) {
    // Used in validation ???
    // this.valid = true;
    var id = attrs.id || "input_" + id_gen++;
    var data = {
        model: elt_1.o(attrs.model || ''),
        type: attrs.type || 'text',
        label: attrs.label || attrs.placeholder || '',
        error: elt_1.o(attrs.error),
        disabled: elt_1.o(attrs.disabled).tf(function (v) { return !!v; })
    };
    var other_attrs = {
        autofocus: attrs.autofocus,
        autocapitalize: attrs.autocapitalize,
        spellcheck: attrs.spellcheck,
        autocorrect: attrs.autocorrect,
        autocomplete: attrs.autocomplete
    };
    var o_focused = elt_1.o(false);
    var input = E("input", __assign({ id: id, class: css.inputElement, disabled: data.disabled, type: data.type, "$$": [elt_1.bind(data.model)] }, other_attrs));
    input.addEventListener('blur', function (ev) {
        o_focused.set(false);
    });
    input.addEventListener('focus', function (ev) {
        o_focused.set(true);
    });
    // const o_unfocus_and_empty = o(data.model, o_focused, (value: string, focused: boolean) => !focused && !value)
    var o_unfocus_and_empty = elt_1.o.merge({ model: data.model, focus: o_focused })
        .tf(function (value) {
        var res = !value.model && !value.focus;
        return res;
    });
    return E("div", { class: [css.container, (_a = {},
                _a[css.focused] = o_focused,
                _a[css.emptyUnfocused] = o_unfocus_and_empty,
                _a[css.error] = attrs.error,
                _a)] },
        input,
        data.label ?
            E("label", { for: id }, data.label)
            : null,
        elt_1.DisplayIf(data.error, function (error) { return E("div", { class: css.inputError }, error); }));
    var _a;
}
exports.Input = Input;
//# sourceMappingURL=input.js.map