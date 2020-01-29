! function(a, b) {
    "use strict";

    function c(a, b, c, d, e) {
        d = d || 0, e = e || 0, this.identifier = b, this.target = a, this.clientX = c.clientX + d, this.clientY = c.clientY + e, this.screenX = c.screenX + d, this.screenY = c.screenY + e, this.pageX = c.pageX + d, this.pageY = c.pageY + e
    }

    function d() {
        var a = [];
        return a.item = function(a) {
            return this[a] || null
        }, a.identifiedTouch = function(a) {
            return this[a + 1] || null
        }, a
    }

    function e() {
        for (var c = [a, b.documentElement], d = ["ontouchstart", "ontouchmove", "ontouchcancel", "ontouchend"], e = 0; e < c.length; e++)
            for (var f = 0; f < d.length; f++) c[e] && null == c[e][d[f]] && (c[e][d[f]] = null)
    }

    function f() {
        return "ontouchstart" in a || a.Modernizr && a.Modernizr.touch || 2 < (navigator.msMaxTouchPoints || navigator.maxTouchPoints)
    }

    function g(a) {
        a.preventDefault(), a.stopPropagation()
    }

    function h(a) {
        return function(b) {
            "INPUT" !== b.target.nodeName && "TEXTAREA" !== b.target.nodeName && "true" !== b.target.contentEditable && (g(b), 1 !== b.which || (("mousedown" == b.type || !o || o && !o.dispatchEvent) && (o = b.target), p && !b.shiftKey && (i("touchend", b), p = !1), i(a, b), !p && b.shiftKey && (p = !0, n = {
                pageX: b.pageX,
                pageY: b.pageY,
                clientX: b.clientX,
                clientY: b.clientY,
                screenX: b.screenX,
                screenY: b.screenY
            }, i("touchstart", b)), "mouseup" == b.type && (n = null, p = !1, o = null)))
        }
    }

    function i(a, c) {
        var d = b.createEvent("Event");
        d.initEvent(a, !0, !0), d.altKey = c.altKey, d.ctrlKey = c.ctrlKey, d.metaKey = c.metaKey, d.shiftKey = c.shiftKey, d.touches = k(c, a), d.targetTouches = k(c, a), d.changedTouches = l(c, a), o.dispatchEvent(d)
    }

    function j(a) {
        var b = new d;
        if (p) {
            var e = m.multiTouchOffset,
                f = n.pageX - a.pageX,
                g = n.pageY - a.pageY;
            b.push(new c(o, 1, n, -1 * f - e, -1 * g + e)), b.push(new c(o, 2, n, f + e, g - e))
        } else b.push(new c(o, 1, a, 0, 0));
        return b
    }

    function k(a, b) {
        if ("mouseup" == a.type) return new d;
        var c = j(a);
        return p && "mouseup" != a.type && "touchend" == b && c.splice(1, 1), c
    }

    function l(a, b) {
        var c = j(a);
        return p && "mouseup" != a.type && ("touchstart" == b || "touchend" == b) && c.splice(0, 1), c
    }

    function m() {
        f() || (e(), a.addEventListener("mousedown", h("touchstart"), !0), a.addEventListener("mousemove", h("touchmove"), !0), a.addEventListener("mouseup", h("touchend"), !0), a.addEventListener("mouseenter", g, !0), a.addEventListener("mouseleave", g, !0), a.addEventListener("mouseout", g, !0), a.addEventListener("mouseover", g, !0))
    }
    var n, o, p = !1;
    b.createTouch || (b.createTouch = function(b, d, e, f, g, h, i, j, k) {
        return (null == j || null == k) && (j = f - a.pageXOffset, k = g - a.pageYOffset), new c(d, e, {
            pageX: f,
            pageY: g,
            screenX: h,
            screenY: i,
            clientX: j,
            clientY: k
        })
    }), b.createTouchList || (b.createTouchList = function() {
        for (var a = new d, b = 0; b < arguments.length; b++) a[b] = arguments[b];
        return a.length = arguments.length, a
    }), m.multiTouchOffset = 75, m()
}(window, document, "TouchEmulator");
