"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elt_1 = require("elt");
var css = require("./flex.styl");
function _(elt, prop, value) {
    switch (value) {
        case 'around':
            value = 'space-around';
            break;
        case 'between':
            value = 'space-between';
            break;
        case 'start':
            value = 'flex-start';
            break;
        case 'end':
            value = 'flex-end';
            break;
        case 'no':
            value = 'nowrap';
            break;
    }
    var style = elt.style;
    style[prop] = value;
    style["webkit" + (prop[0].toUpperCase() + prop.slice(1))] = value;
}
function _parse_attributes(el, at) {
    var cls = el.classList;
    if (at.wrap != null)
        cls.add(css.flexWrap);
    if (at.direction != null) {
        if (!at.reverse)
            _(el, 'flexDirection', at.direction);
        else
            _(el, 'flexDirection', at.direction === 'column' ? 'column-reverse' : 'row-reverse');
    }
    else if (at.reverse != null)
        _(el, 'flexDirection', 'row-reverse');
    if (at.grow != null)
        _(el, 'flexGrow', at.grow);
    if (at.basis != null)
        _(el, 'flexBasis', at.basis);
    if (at.absoluteGrow != null) {
        _(el, 'flexGrow', at.absoluteGrow);
        _(el, 'flexBasis', '0');
    }
    if (at.align != null) {
        _(el, 'alignItems', at.align);
    }
    if (at.justify != null) {
        _(el, 'justifyContent', at.justify);
    }
}
function Row(at, ch) {
    var node = elt_1.e('div', { class: css.flex }, ch);
    _parse_attributes(node, at);
    return node;
}
exports.Row = Row;
function Column(at, ch) {
    at.direction = 'column';
    var node = elt_1.e('div', { class: css.flex }, ch);
    _parse_attributes(node, at);
    return node;
}
exports.Column = Column;
/**
 * A child that's not a flex itself (otherwise we'd use Row or Column), on which
 * there is hence no point in using the special align-items, ...
 */
function Child(at, ch) {
    var node = elt_1.e('div', null, ch);
    _parse_attributes(node, at);
    return node;
}
exports.Child = Child;
//# sourceMappingURL=flex.js.map