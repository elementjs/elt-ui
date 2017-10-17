"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elt_1 = require("elt");
function Icon(_a, content) {
    var name = _a.name;
    return elt_1.e('i', {
        'class': ['zmdi', elt_1.o(name).tf(function (name) { return "zmdi-" + (name || 'help-outline'); })]
    });
}
exports.Icon = Icon;
//# sourceMappingURL=icon.js.map