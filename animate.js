"use strict";
/* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
     To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
     devices to avoid wasting battery power on inactive tabs. */
/* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */
// if (!Velocity.State.isMobile && document.hidden !== undefined) {
// 	document.addEventListener("visibilitychange", function() {
// 		/* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
// 		if (document.hidden) {
// 			ticker = function(callback) {
// 				 // The tick function needs a truthy first argument in order to pass its internal timestamp check.
// 				return setTimeout(function() { callback(true) }, 16);
// 			};
Object.defineProperty(exports, "__esModule", { value: true });
// 			/* The rAF loop has been paused by the browser, so we manually restart the tick. */
// 			tick();
// 		} else {
// 			ticker = window.requestAnimationFrame || rAFShim;
// 		}
// 	});
// }
var typestyle_1 = require("typestyle");
exports.animations = {
    fadeIn: typestyle_1.keyframes({
        '0%': { opacity: 0 },
        '100%': { opacity: 1 }
    }),
    fadeOut: typestyle_1.keyframes({
        '100%': { opacity: 0 }
    }),
    slideFromRight: typestyle_1.keyframes({
        '0%': { transform: "translateX(-100%) translateZ(0)" },
        '100%': { transform: "translateX(0) translateZ(0)" }
    }),
    slideToRight: typestyle_1.keyframes({
        '0%': { transform: "translateX(-100%) translateZ(0)" }
    }),
    topEnter: typestyle_1.keyframes({
        '0%': { transform: "translate3d(0, 50px, 0) scale3d(1.1, 1.1, 1)" },
        '100%': { transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)" }
    }),
    topLeave: typestyle_1.keyframes({
        '0%': { transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)" },
        '100%': { transform: "translate3d(0, -50px, 0) scale3d(0.9, 0.9, 1)" }
    })
};
function transition() {
}
exports.transition = transition;
var END_EVENTS = ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend'];
var START_EVENTS = ['webkitAnimationStart', 'mozAnimationStart', 'MSAnimationStart', 'oanimationstart', 'animationstart'];
function animate(node, anim) {
    return new Promise(function (resolve, reject) {
        node.style.animation = anim;
        var events = ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend'];
        function bye() {
            events.forEach(function (name) { return node.removeEventListener(name, bye); });
            resolve(node);
        }
        events.forEach(function (name) { return node.addEventListener(name, bye); });
    });
}
exports.animate = animate;
function animateClass(node, cls) {
    node.classList.add(cls);
    return new Promise(function (resolve, reject) {
        var fnend = function () {
            anim_end_count += 1;
            // Remove all the event listeners.
            if (anim_start_count == anim_end_count) {
                START_EVENTS.forEach(function (name) { return node.removeEventListener(name, fnstart); });
                END_EVENTS.forEach(function (name) { return node.removeEventListener(name, fnend); });
                // setTimeout(() => node.classList.remove(cls), 100)
                resolve();
            }
        };
        var fnstart = function () {
            anim_start_count += 1;
        };
        var anim_start_count = 0;
        var anim_end_count = 0;
        START_EVENTS.forEach(function (name) { return node.addEventListener(name, fnstart); });
        END_EVENTS.forEach(function (name) { return node.addEventListener(name, fnend); });
        // We leave 100 ms to the animations to potentially start. If during
        // this delay nothing started, we call the end function.
        setTimeout(function () {
            if (anim_start_count === 0) {
                anim_end_count -= 1;
                fnend();
            }
        }, 100);
    });
}
exports.animateClass = animateClass;
//# sourceMappingURL=animate.js.map