! function(a, b) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.tippy = b()
}(this, function() {
    "use strict";

    function a(a) {
        var b = !1;
        return function() {
            b || (b = !0, window.Promise.resolve().then(function() {
                b = !1, a()
            }))
        }
    }

    function b(a) {
        var b = !1;
        return function() {
            b || (b = !0, setTimeout(function() {
                b = !1, a()
            }, za))
        }
    }

    function c(a) {
        var b = {};
        return a && "[object Function]" === b.toString.call(a)
    }

    function d(a, b) {
        if (1 !== a.nodeType) return [];
        var c = a.ownerDocument.defaultView,
            d = c.getComputedStyle(a, null);
        return b ? d[b] : d
    }

    function e(a) {
        return "HTML" === a.nodeName ? a : a.parentNode || a.host
    }

    function f(a) {
        if (!a) return document.body;
        switch (a.nodeName) {
            case "HTML":
            case "BODY":
                return a.ownerDocument.body;
            case "#document":
                return a.body
        }
        var b = d(a),
            c = b.overflow,
            g = b.overflowX,
            h = b.overflowY;
        return /(auto|scroll|overlay)/.test(c + h + g) ? a : f(e(a))
    }

    function g(a) {
        return 11 === a ? Da : 10 === a ? Ea : Da || Ea
    }

    function h(a) {
        if (!a) return document.documentElement;
        for (var b = g(10) ? document.body : null, c = a.offsetParent || null; c === b && a.nextElementSibling;) c = (a = a.nextElementSibling).offsetParent;
        var e = c && c.nodeName;
        return e && "BODY" !== e && "HTML" !== e ? -1 !== ["TH", "TD", "TABLE"].indexOf(c.nodeName) && "static" === d(c, "position") ? h(c) : c : a ? a.ownerDocument.documentElement : document.documentElement
    }

    function i(a) {
        var b = a.nodeName;
        return "BODY" === b ? !1 : "HTML" === b || h(a.firstElementChild) === a
    }

    function j(a) {
        return null !== a.parentNode ? j(a.parentNode) : a
    }

    function k(a, b) {
        if (!(a && a.nodeType && b && b.nodeType)) return document.documentElement;
        var c = a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING,
            d = c ? a : b,
            e = c ? b : a,
            f = document.createRange();
        f.setStart(d, 0), f.setEnd(e, 0);
        var g = f.commonAncestorContainer;
        if (a !== g && b !== g || d.contains(e)) return i(g) ? g : h(g);
        var l = j(a);
        return l.host ? k(l.host, b) : k(a, j(b).host)
    }

    function l(a) {
        var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
            c = "top" === b ? "scrollTop" : "scrollLeft",
            d = a.nodeName;
        if ("BODY" === d || "HTML" === d) {
            var e = a.ownerDocument.documentElement,
                f = a.ownerDocument.scrollingElement || e;
            return f[c]
        }
        return a[c]
    }

    function m(a, b) {
        var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            d = l(b, "top"),
            e = l(b, "left"),
            f = c ? -1 : 1;
        return a.top += d * f, a.bottom += d * f, a.left += e * f, a.right += e * f, a
    }

    function n(a, b) {
        var c = "x" === b ? "Left" : "Top",
            d = "Left" === c ? "Right" : "Bottom";
        return parseFloat(a["border" + c + "Width"], 10) + parseFloat(a["border" + d + "Width"], 10)
    }

    function o(a, b, c, d) {
        return Math.max(b["offset" + a], b["scroll" + a], c["client" + a], c["offset" + a], c["scroll" + a], g(10) ? parseInt(c["offset" + a]) + parseInt(d["margin" + ("Height" === a ? "Top" : "Left")]) + parseInt(d["margin" + ("Height" === a ? "Bottom" : "Right")]) : 0)
    }

    function p(a) {
        var b = a.body,
            c = a.documentElement,
            d = g(10) && getComputedStyle(c);
        return {
            height: o("Height", b, c, d),
            width: o("Width", b, c, d)
        }
    }

    function q(a) {
        return Ia({}, a, {
            right: a.left + a.width,
            bottom: a.top + a.height
        })
    }

    function r(a) {
        var b = {};
        try {
            if (g(10)) {
                b = a.getBoundingClientRect();
                var c = l(a, "top"),
                    e = l(a, "left");
                b.top += c, b.left += e, b.bottom += c, b.right += e
            } else b = a.getBoundingClientRect()
        } catch (f) {}
        var h = {
                left: b.left,
                top: b.top,
                width: b.right - b.left,
                height: b.bottom - b.top
            },
            i = "HTML" === a.nodeName ? p(a.ownerDocument) : {},
            j = i.width || a.clientWidth || h.right - h.left,
            k = i.height || a.clientHeight || h.bottom - h.top,
            m = a.offsetWidth - j,
            o = a.offsetHeight - k;
        if (m || o) {
            var r = d(a);
            m -= n(r, "x"), o -= n(r, "y"), h.width -= m, h.height -= o
        }
        return q(h)
    }

    function s(a, b) {
        var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            e = g(10),
            h = "HTML" === b.nodeName,
            i = r(a),
            j = r(b),
            k = f(a),
            l = d(b),
            n = parseFloat(l.borderTopWidth, 10),
            o = parseFloat(l.borderLeftWidth, 10);
        c && h && (j.top = Math.max(j.top, 0), j.left = Math.max(j.left, 0));
        var p = q({
            top: i.top - j.top - n,
            left: i.left - j.left - o,
            width: i.width,
            height: i.height
        });
        if (p.marginTop = 0, p.marginLeft = 0, !e && h) {
            var s = parseFloat(l.marginTop, 10),
                t = parseFloat(l.marginLeft, 10);
            p.top -= n - s, p.bottom -= n - s, p.left -= o - t, p.right -= o - t, p.marginTop = s, p.marginLeft = t
        }
        return (e && !c ? b.contains(k) : b === k && "BODY" !== k.nodeName) && (p = m(p, b)), p
    }

    function t(a) {
        var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
            c = a.ownerDocument.documentElement,
            d = s(a, c),
            e = Math.max(c.clientWidth, window.innerWidth || 0),
            f = Math.max(c.clientHeight, window.innerHeight || 0),
            g = b ? 0 : l(c),
            h = b ? 0 : l(c, "left"),
            i = {
                top: g - d.top + d.marginTop,
                left: h - d.left + d.marginLeft,
                width: e,
                height: f
            };
        return q(i)
    }

    function u(a) {
        var b = a.nodeName;
        return "BODY" === b || "HTML" === b ? !1 : "fixed" === d(a, "position") ? !0 : u(e(a))
    }

    function v(a) {
        if (!a || !a.parentElement || g()) return document.documentElement;
        for (var b = a.parentElement; b && "none" === d(b, "transform");) b = b.parentElement;
        return b || document.documentElement
    }

    function w(a, b, c, d) {
        var g = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1,
            h = {
                top: 0,
                left: 0
            },
            i = g ? v(a) : k(a, b);
        if ("viewport" === d) h = t(i, g);
        else {
            var j = void 0;
            "scrollParent" === d ? (j = f(e(b)), "BODY" === j.nodeName && (j = a.ownerDocument.documentElement)) : j = "window" === d ? a.ownerDocument.documentElement : d;
            var l = s(j, i, g);
            if ("HTML" !== j.nodeName || u(i)) h = l;
            else {
                var m = p(a.ownerDocument),
                    n = m.height,
                    o = m.width;
                h.top += l.top - l.marginTop, h.bottom = n + l.top, h.left += l.left - l.marginLeft, h.right = o + l.left
            }
        }
        c = c || 0;
        var q = "number" == typeof c;
        return h.left += q ? c : c.left || 0, h.top += q ? c : c.top || 0, h.right -= q ? c : c.right || 0, h.bottom -= q ? c : c.bottom || 0, h
    }

    function x(a) {
        var b = a.width,
            c = a.height;
        return b * c
    }

    function y(a, b, c, d, e) {
        var f = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === a.indexOf("auto")) return a;
        var g = w(c, d, f, e),
            h = {
                top: {
                    width: g.width,
                    height: b.top - g.top
                },
                right: {
                    width: g.right - b.right,
                    height: g.height
                },
                bottom: {
                    width: g.width,
                    height: g.bottom - b.bottom
                },
                left: {
                    width: b.left - g.left,
                    height: g.height
                }
            },
            i = Object.keys(h).map(function(a) {
                return Ia({
                    key: a
                }, h[a], {
                    area: x(h[a])
                })
            }).sort(function(a, b) {
                return b.area - a.area
            }),
            j = i.filter(function(a) {
                var b = a.width,
                    d = a.height;
                return b >= c.clientWidth && d >= c.clientHeight
            }),
            k = j.length > 0 ? j[0].key : i[0].key,
            l = a.split("-")[1];
        return k + (l ? "-" + l : "")
    }

    function z(a, b, c) {
        var d = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
            e = d ? v(b) : k(b, c);
        return s(c, e, d)
    }

    function A(a) {
        var b = a.ownerDocument.defaultView,
            c = b.getComputedStyle(a),
            d = parseFloat(c.marginTop) + parseFloat(c.marginBottom),
            e = parseFloat(c.marginLeft) + parseFloat(c.marginRight),
            f = {
                width: a.offsetWidth + e,
                height: a.offsetHeight + d
            };
        return f
    }

    function B(a) {
        var b = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return a.replace(/left|right|bottom|top/g, function(a) {
            return b[a]
        })
    }

    function C(a, b, c) {
        c = c.split("-")[0];
        var d = A(a),
            e = {
                width: d.width,
                height: d.height
            },
            f = -1 !== ["right", "left"].indexOf(c),
            g = f ? "top" : "left",
            h = f ? "left" : "top",
            i = f ? "height" : "width",
            j = f ? "width" : "height";
        return e[g] = b[g] + b[i] / 2 - d[i] / 2, c === h ? e[h] = b[h] - d[j] : e[h] = b[B(h)], e
    }

    function D(a, b) {
        return Array.prototype.find ? a.find(b) : a.filter(b)[0]
    }

    function E(a, b, c) {
        if (Array.prototype.findIndex) return a.findIndex(function(a) {
            return a[b] === c
        });
        var d = D(a, function(a) {
            return a[b] === c
        });
        return a.indexOf(d)
    }

    function F(a, b, d) {
        var e = void 0 === d ? a : a.slice(0, E(a, "name", d));
        return e.forEach(function(a) {
            a["function"];
            var d = a["function"] || a.fn;
            a.enabled && c(d) && (b.offsets.popper = q(b.offsets.popper), b.offsets.reference = q(b.offsets.reference), b = d(b, a))
        }), b
    }

    function G() {
        if (!this.state.isDestroyed) {
            var a = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            a.offsets.reference = z(this.state, this.popper, this.reference, this.options.positionFixed), a.placement = y(this.options.placement, a.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), a.originalPlacement = a.placement, a.positionFixed = this.options.positionFixed, a.offsets.popper = C(this.popper, a.offsets.reference, a.placement), a.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", a = F(this.modifiers, a), this.state.isCreated ? this.options.onUpdate(a) : (this.state.isCreated = !0, this.options.onCreate(a))
        }
    }

    function H(a, b) {
        return a.some(function(a) {
            var c = a.name,
                d = a.enabled;
            return d && c === b
        })
    }

    function I(a) {
        for (var b = [!1, "ms", "Webkit", "Moz", "O"], c = a.charAt(0).toUpperCase() + a.slice(1), d = 0; d < b.length; d++) {
            var e = b[d],
                f = e ? "" + e + c : a;
            if ("undefined" != typeof document.body.style[f]) return f
        }
        return null
    }

    function J() {
        return this.state.isDestroyed = !0, H(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[I("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function K(a) {
        var b = a.ownerDocument;
        return b ? b.defaultView : window
    }

    function L(a, b, c, d) {
        var e = "BODY" === a.nodeName,
            g = e ? a.ownerDocument.defaultView : a;
        g.addEventListener(b, c, {
            passive: !0
        }), e || L(f(g.parentNode), b, c, d), d.push(g)
    }

    function M(a, b, c, d) {
        c.updateBound = d, K(a).addEventListener("resize", c.updateBound, {
            passive: !0
        });
        var e = f(a);
        return L(e, "scroll", c.updateBound, c.scrollParents), c.scrollElement = e, c.eventsEnabled = !0, c
    }

    function N() {
        this.state.eventsEnabled || (this.state = M(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function O(a, b) {
        return K(a).removeEventListener("resize", b.updateBound), b.scrollParents.forEach(function(a) {
            a.removeEventListener("scroll", b.updateBound)
        }), b.updateBound = null, b.scrollParents = [], b.scrollElement = null, b.eventsEnabled = !1, b
    }

    function P() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = O(this.reference, this.state))
    }

    function Q(a) {
        return "" !== a && !isNaN(parseFloat(a)) && isFinite(a)
    }

    function R(a, b) {
        Object.keys(b).forEach(function(c) {
            var d = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(c) && Q(b[c]) && (d = "px"), a.style[c] = b[c] + d
        })
    }

    function S(a, b) {
        Object.keys(b).forEach(function(c) {
            var d = b[c];
            d !== !1 ? a.setAttribute(c, b[c]) : a.removeAttribute(c)
        })
    }

    function T(a) {
        return R(a.instance.popper, a.styles), S(a.instance.popper, a.attributes), a.arrowElement && Object.keys(a.arrowStyles).length && R(a.arrowElement, a.arrowStyles), a
    }

    function U(a, b, c, d, e) {
        var f = z(e, b, a, c.positionFixed),
            g = y(c.placement, f, b, a, c.modifiers.flip.boundariesElement, c.modifiers.flip.padding);
        return b.setAttribute("x-placement", g), R(b, {
            position: c.positionFixed ? "fixed" : "absolute"
        }), c
    }

    function V(a, b) {
        var c = b.x,
            d = b.y,
            e = a.offsets.popper,
            f = D(a.instance.modifiers, function(a) {
                return "applyStyle" === a.name
            }).gpuAcceleration,
            g = void 0 !== f ? f : b.gpuAcceleration,
            i = h(a.instance.popper),
            j = r(i),
            k = {
                position: e.position
            },
            l = {
                left: Math.floor(e.left),
                top: Math.round(e.top),
                bottom: Math.round(e.bottom),
                right: Math.floor(e.right)
            },
            m = "bottom" === c ? "top" : "bottom",
            n = "right" === d ? "left" : "right",
            o = I("transform"),
            p = void 0,
            q = void 0;
        if (q = "bottom" === m ? "HTML" === i.nodeName ? -i.clientHeight + l.bottom : -j.height + l.bottom : l.top, p = "right" === n ? "HTML" === i.nodeName ? -i.clientWidth + l.right : -j.width + l.right : l.left, g && o) k[o] = "translate3d(" + p + "px, " + q + "px, 0)", k[m] = 0, k[n] = 0, k.willChange = "transform";
        else {
            var s = "bottom" === m ? -1 : 1,
                t = "right" === n ? -1 : 1;
            k[m] = q * s, k[n] = p * t, k.willChange = m + ", " + n
        }
        var u = {
            "x-placement": a.placement
        };
        return a.attributes = Ia({}, u, a.attributes), a.styles = Ia({}, k, a.styles), a.arrowStyles = Ia({}, a.offsets.arrow, a.arrowStyles), a
    }

    function W(a, b, c) {
        var d = D(a, function(a) {
                var c = a.name;
                return c === b
            }),
            e = !!d && a.some(function(a) {
                return a.name === c && a.enabled && a.order < d.order
            });
        if (!e);
        return e
    }

    function X(a, b) {
        var c;
        if (!W(a.instance.modifiers, "arrow", "keepTogether")) return a;
        var e = b.element;
        if ("string" == typeof e) {
            if (e = a.instance.popper.querySelector(e), !e) return a
        } else if (!a.instance.popper.contains(e)) return a;
        var f = a.placement.split("-")[0],
            g = a.offsets,
            h = g.popper,
            i = g.reference,
            j = -1 !== ["left", "right"].indexOf(f),
            k = j ? "height" : "width",
            l = j ? "Top" : "Left",
            m = l.toLowerCase(),
            n = j ? "left" : "top",
            o = j ? "bottom" : "right",
            p = A(e)[k];
        i[o] - p < h[m] && (a.offsets.popper[m] -= h[m] - (i[o] - p)), i[m] + p > h[o] && (a.offsets.popper[m] += i[m] + p - h[o]), a.offsets.popper = q(a.offsets.popper);
        var r = i[m] + i[k] / 2 - p / 2,
            s = d(a.instance.popper),
            t = parseFloat(s["margin" + l], 10),
            u = parseFloat(s["border" + l + "Width"], 10),
            v = r - a.offsets.popper[m] - t - u;
        return v = Math.max(Math.min(h[k] - p, v), 0), a.arrowElement = e, a.offsets.arrow = (c = {}, Ha(c, m, Math.round(v)), Ha(c, n, ""), c), a
    }

    function Y(a) {
        return "end" === a ? "start" : "start" === a ? "end" : a
    }

    function Z(a) {
        var b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
            c = Ka.indexOf(a),
            d = Ka.slice(c + 1).concat(Ka.slice(0, c));
        return b ? d.reverse() : d
    }

    function $(a, b) {
        if (H(a.instance.modifiers, "inner")) return a;
        if (a.flipped && a.placement === a.originalPlacement) return a;
        var c = w(a.instance.popper, a.instance.reference, b.padding, b.boundariesElement, a.positionFixed),
            d = a.placement.split("-")[0],
            e = B(d),
            f = a.placement.split("-")[1] || "",
            g = [];
        switch (b.behavior) {
            case La.FLIP:
                g = [d, e];
                break;
            case La.CLOCKWISE:
                g = Z(d);
                break;
            case La.COUNTERCLOCKWISE:
                g = Z(d, !0);
                break;
            default:
                g = b.behavior
        }
        return g.forEach(function(h, i) {
            if (d !== h || g.length === i + 1) return a;
            d = a.placement.split("-")[0], e = B(d);
            var j = a.offsets.popper,
                k = a.offsets.reference,
                l = Math.floor,
                m = "left" === d && l(j.right) > l(k.left) || "right" === d && l(j.left) < l(k.right) || "top" === d && l(j.bottom) > l(k.top) || "bottom" === d && l(j.top) < l(k.bottom),
                n = l(j.left) < l(c.left),
                o = l(j.right) > l(c.right),
                p = l(j.top) < l(c.top),
                q = l(j.bottom) > l(c.bottom),
                r = "left" === d && n || "right" === d && o || "top" === d && p || "bottom" === d && q,
                s = -1 !== ["top", "bottom"].indexOf(d),
                t = !!b.flipVariations && (s && "start" === f && n || s && "end" === f && o || !s && "start" === f && p || !s && "end" === f && q);
            (m || r || t) && (a.flipped = !0, (m || r) && (d = g[i + 1]), t && (f = Y(f)), a.placement = d + (f ? "-" + f : ""), a.offsets.popper = Ia({}, a.offsets.popper, C(a.instance.popper, a.offsets.reference, a.placement)), a = F(a.instance.modifiers, a, "flip"))
        }), a
    }

    function _(a) {
        var b = a.offsets,
            c = b.popper,
            d = b.reference,
            e = a.placement.split("-")[0],
            f = Math.floor,
            g = -1 !== ["top", "bottom"].indexOf(e),
            h = g ? "right" : "bottom",
            i = g ? "left" : "top",
            j = g ? "width" : "height";
        return c[h] < f(d[i]) && (a.offsets.popper[i] = f(d[i]) - c[j]), c[i] > f(d[h]) && (a.offsets.popper[i] = f(d[h])), a
    }

    function aa(a, b, c, d) {
        var e = a.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            f = +e[1],
            g = e[2];
        if (!f) return a;
        if (0 === g.indexOf("%")) {
            var h = void 0;
            switch (g) {
                case "%p":
                    h = c;
                    break;
                case "%":
                case "%r":
                default:
                    h = d
            }
            var i = q(h);
            return i[b] / 100 * f
        }
        if ("vh" === g || "vw" === g) {
            var j = void 0;
            return j = "vh" === g ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0), j / 100 * f
        }
        return f
    }

    function ba(a, b, c, d) {
        var e = [0, 0],
            f = -1 !== ["right", "left"].indexOf(d),
            g = a.split(/(\+|\-)/).map(function(a) {
                return a.trim()
            }),
            h = g.indexOf(D(g, function(a) {
                return -1 !== a.search(/,|\s/)
            }));
        g[h] && -1 === g[h].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var i = /\s*,\s*|\s+/,
            j = -1 !== h ? [g.slice(0, h).concat([g[h].split(i)[0]]), [g[h].split(i)[1]].concat(g.slice(h + 1))] : [g];
        return j = j.map(function(a, d) {
            var e = (1 === d ? !f : f) ? "height" : "width",
                g = !1;
            return a.reduce(function(a, b) {
                return "" === a[a.length - 1] && -1 !== ["+", "-"].indexOf(b) ? (a[a.length - 1] = b, g = !0, a) : g ? (a[a.length - 1] += b, g = !1, a) : a.concat(b)
            }, []).map(function(a) {
                return aa(a, e, b, c)
            })
        }), j.forEach(function(a, b) {
            a.forEach(function(c, d) {
                Q(c) && (e[b] += c * ("-" === a[d - 1] ? -1 : 1))
            })
        }), e
    }

    function ca(a, b) {
        var c = b.offset,
            d = a.placement,
            e = a.offsets,
            f = e.popper,
            g = e.reference,
            h = d.split("-")[0],
            i = void 0;
        return i = Q(+c) ? [+c, 0] : ba(c, f, g, h), "left" === h ? (f.top += i[0], f.left -= i[1]) : "right" === h ? (f.top += i[0], f.left += i[1]) : "top" === h ? (f.left += i[0], f.top -= i[1]) : "bottom" === h && (f.left += i[0], f.top += i[1]), a.popper = f, a
    }

    function da(a, b) {
        var c = b.boundariesElement || h(a.instance.popper);
        a.instance.reference === c && (c = h(c));
        var d = I("transform"),
            e = a.instance.popper.style,
            f = e.top,
            g = e.left,
            i = e[d];
        e.top = "", e.left = "", e[d] = "";
        var j = w(a.instance.popper, a.instance.reference, b.padding, c, a.positionFixed);
        e.top = f, e.left = g, e[d] = i, b.boundaries = j;
        var k = b.priority,
            l = a.offsets.popper,
            m = {
                primary: function(a) {
                    var c = l[a];
                    return l[a] < j[a] && !b.escapeWithReference && (c = Math.max(l[a], j[a])), Ha({}, a, c)
                },
                secondary: function(a) {
                    var c = "right" === a ? "left" : "top",
                        d = l[c];
                    return l[a] > j[a] && !b.escapeWithReference && (d = Math.min(l[c], j[a] - ("right" === a ? l.width : l.height))), Ha({}, c, d)
                }
            };
        return k.forEach(function(a) {
            var b = -1 !== ["left", "top"].indexOf(a) ? "primary" : "secondary";
            l = Ia({}, l, m[b](a))
        }), a.offsets.popper = l, a
    }

    function ea(a) {
        var b = a.placement,
            c = b.split("-")[0],
            d = b.split("-")[1];
        if (d) {
            var e = a.offsets,
                f = e.reference,
                g = e.popper,
                h = -1 !== ["bottom", "top"].indexOf(c),
                i = h ? "left" : "top",
                j = h ? "width" : "height",
                k = {
                    start: Ha({}, i, f[i]),
                    end: Ha({}, i, f[i] + f[j] - g[j])
                };
            a.offsets.popper = Ia({}, g, k[d])
        }
        return a
    }

    function fa(a) {
        if (!W(a.instance.modifiers, "hide", "preventOverflow")) return a;
        var b = a.offsets.reference,
            c = D(a.instance.modifiers, function(a) {
                return "preventOverflow" === a.name
            }).boundaries;
        if (b.bottom < c.top || b.left > c.right || b.top > c.bottom || b.right < c.left) {
            if (a.hide === !0) return a;
            a.hide = !0, a.attributes["x-out-of-boundaries"] = ""
        } else {
            if (a.hide === !1) return a;
            a.hide = !1, a.attributes["x-out-of-boundaries"] = !1
        }
        return a
    }

    function ga(a) {
        var b = a.placement,
            c = b.split("-")[0],
            d = a.offsets,
            e = d.popper,
            f = d.reference,
            g = -1 !== ["left", "right"].indexOf(c),
            h = -1 === ["top", "left"].indexOf(c);
        return e[g ? "left" : "top"] = f[c] - (h ? e[g ? "width" : "height"] : 0), a.placement = B(b), a.offsets.popper = q(e), a
    }

    function ha() {
        document.addEventListener("click", Lb, !0), document.addEventListener("touchstart", Ib, {
            passive: !0
        }), window.addEventListener("blur", Mb), window.addEventListener("resize", Nb), wa || !navigator.maxTouchPoints && !navigator.msMaxTouchPoints || document.addEventListener("pointerdown", Ib)
    }

    function ia(a, b) {
        function c() {
            zb(function() {
                S = !1
            })
        }

        function d() {
            K = new MutationObserver(function() {
                Z.popperInstance.update()
            }), K.observe(V, {
                childList: !0,
                subtree: !0,
                characterData: !0
            })
        }

        function e(a) {
            var b = M = a,
                c = b.clientX,
                d = b.clientY;
            if (Z.popperInstance) {
                var e = Cb(Z.popper),
                    f = Z.popperChildren.arrow ? 20 : 5,
                    g = "top" === e || "bottom" === e,
                    h = "left" === e || "right" === e,
                    i = g ? Math.max(f, c) : c,
                    j = h ? Math.max(f, d) : d;
                g && i > f && (i = Math.min(c, window.innerWidth - f)), h && j > f && (j = Math.min(d, window.innerHeight - f));
                var k = Z.reference.getBoundingClientRect(),
                    l = Z.props.followCursor,
                    m = "horizontal" === l,
                    n = "vertical" === l;
                Z.popperInstance.reference = {
                    getBoundingClientRect: function() {
                        return {
                            width: 0,
                            height: 0,
                            top: m ? k.top : j,
                            bottom: m ? k.bottom : j,
                            left: n ? k.left : i,
                            right: n ? k.right : i
                        }
                    },
                    clientWidth: 0,
                    clientHeight: 0
                }, Z.popperInstance.scheduleUpdate()
            }
        }

        function f(a) {
            var b = nb(a.target, Z.props.target);
            b && !b._tippy && (ia(b, ma({}, Z.props, {
                target: "",
                showOnInit: !0
            })), g(a))
        }

        function g(a) {
            if (D(), !Z.state.isVisible) {
                if (Z.props.target) return f(a);
                if (P = !0, Z.props.wait) return Z.props.wait(Z, a);
                t() && document.addEventListener("mousemove", e);
                var b = ab(Z.props.delay, 0, na.delay);
                b ? N = setTimeout(function() {
                    G()
                }, b) : G()
            }
        }

        function h() {
            if (D(), !Z.state.isVisible) return i();
            P = !1;
            var a = ab(Z.props.delay, 1, na.delay);
            a ? O = setTimeout(function() {
                Z.state.isVisible && H()
            }, a) : H()
        }

        function i() {
            document.removeEventListener("mousemove", e), M = null
        }

        function j() {
            document.body.removeEventListener("mouseleave", h), document.removeEventListener("mousemove", T)
        }

        function k(a) {
            Z.state.isEnabled && !q(a) && (Z.state.isVisible || (L = a), "click" === a.type && Z.props.hideOnClick !== !1 && Z.state.isVisible ? h() : g(a))
        }

        function l(a) {
            var b = ob(a.target, function(a) {
                    return a._tippy
                }),
                c = nb(a.target, Pa.POPPER) === Z.popper,
                d = b === Z.reference;
            c || d || Ab(Cb(Z.popper), Z.popper.getBoundingClientRect(), a, Z.props) && (j(), h())
        }

        function m(a) {
            return q(a) ? void 0 : Z.props.interactive ? (document.body.addEventListener("mouseleave", h), void document.addEventListener("mousemove", T)) : void h()
        }

        function n(a) {
            if (a.target === Z.reference) {
                if (Z.props.interactive) {
                    if (!a.relatedTarget) return;
                    if (nb(a.relatedTarget, Pa.POPPER)) return
                }
                h()
            }
        }

        function o(a) {
            nb(a.target, Z.props.target) && g(a)
        }

        function p(a) {
            nb(a.target, Z.props.target) && h()
        }

        function q(a) {
            var b = a.type.indexOf("touch") > -1,
                c = wa && Hb && Z.props.touchHold && !b,
                d = Hb && !Z.props.touchHold && b;
            return c || d
        }

        function r() {
            var a = Z.popperChildren.tooltip,
                b = Z.props.popperOptions,
                c = Pa["round" === Z.props.arrowType ? "ROUND_ARROW" : "ARROW"],
                e = a.querySelector(c),
                f = ma({
                    placement: Z.props.placement
                }, b || {}, {
                    modifiers: ma({}, b ? b.modifiers : {}, {
                        arrow: ma({
                            element: c
                        }, b && b.modifiers ? b.modifiers.arrow : {}),
                        flip: ma({
                            enabled: Z.props.flip,
                            padding: Z.props.distance + 5,
                            behavior: Z.props.flipBehavior
                        }, b && b.modifiers ? b.modifiers.flip : {}),
                        offset: ma({
                            offset: Z.props.offset
                        }, b && b.modifiers ? b.modifiers.offset : {})
                    }),
                    onCreate: function() {
                        a.style[Cb(Z.popper)] = Bb(Z.props.distance, na.distance), e && Z.props.arrowTransform && wb(e, Z.props.arrowTransform)
                    },
                    onUpdate: function() {
                        var b = a.style;
                        b.top = "", b.bottom = "", b.left = "", b.right = "", b[Cb(Z.popper)] = Bb(Z.props.distance, na.distance), e && Z.props.arrowTransform && wb(e, Z.props.arrowTransform)
                    }
                });
            return K || d(), new Oa(Z.reference, Z.popper, f)
        }

        function s(a) {
            Z.popperInstance ? t() || (Z.popperInstance.scheduleUpdate(), Z.props.livePlacement && Z.popperInstance.enableEventListeners()) : (Z.popperInstance = r(), (!Z.props.livePlacement || t()) && Z.popperInstance.disableEventListeners()), Z.popperInstance.reference = Z.reference;
            var b = Z.popperChildren.arrow;
            if (t()) {
                b && (b.style.margin = "0");
                var c = ab(Z.props.delay, 0, na.delay);
                L.type && e(c && M ? M : L)
            } else b && (b.style.margin = "");
            yb(Z.popperInstance, a), Z.props.appendTo.contains(Z.popper) || (Z.props.appendTo.appendChild(Z.popper), Z.props.onMount(Z), Z.state.isMounted = !0)
        }

        function t() {
            return Z.props.followCursor && !Hb && "focus" !== L.type
        }

        function u() {
            Va([Z.popper], ua ? 0 : Z.props.updateDuration);
            var a = function b() {
                Z.popperInstance && Z.popperInstance.scheduleUpdate(), Z.state.isMounted ? requestAnimationFrame(b) : Va([Z.popper], 0)
            };
            a()
        }

        function v(a, b) {
            x(a, function() {
                !Z.state.isVisible && Z.props.appendTo.contains(Z.popper) && b()
            })
        }

        function w(a, b) {
            x(a, b)
        }

        function x(a, b) {
            if (0 === a) return b();
            var c = Z.popperChildren.tooltip,
                d = function e(a) {
                    a.target === c && (Eb(c, "remove", e), b())
                };
            Eb(c, "remove", Q), Eb(c, "add", d), Q = d
        }

        function y(a, b, c) {
            Z.reference.addEventListener(a, b), c.push({
                eventType: a,
                handler: b
            })
        }

        function z() {
            R = Z.props.trigger.trim().split(" ").reduce(function(a, b) {
                if ("manual" === b) return a;
                if (Z.props.target) switch (b) {
                    case "mouseenter":
                        y("mouseover", o, a), y("mouseout", p, a);
                        break;
                    case "focus":
                        y("focusin", o, a), y("focusout", p, a);
                        break;
                    case "click":
                        y(b, o, a)
                } else switch (y(b, k, a), Z.props.touchHold && (y("touchstart", k, a), y("touchend", m, a)), b) {
                    case "mouseenter":
                        y("mouseleave", m, a);
                        break;
                    case "focus":
                        y(ua ? "focusout" : "blur", n, a)
                }
                return a
            }, [])
        }

        function A() {
            R.forEach(function(a) {
                var b = a.eventType,
                    c = a.handler;
                Z.reference.removeEventListener(b, c)
            })
        }

        function B() {
            Z.state.isEnabled = !0
        }

        function C() {
            Z.state.isEnabled = !1
        }

        function D() {
            clearTimeout(N), clearTimeout(O)
        }

        function E() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Gb(a, na);
            var b = Z.props,
                c = Db(Z.reference, ma({}, Z.props, a, {
                    performance: !0
                }));
            c.performance = a.hasOwnProperty("performance") ? a.performance : b.performance, Z.props = c, (a.hasOwnProperty("trigger") || a.hasOwnProperty("touchHold")) && (A(), z()), a.hasOwnProperty("interactiveDebounce") && (j(), T = Fb(l, a.interactiveDebounce)), ib(Z.popper, b, c), Z.popperChildren = Wa(Z.popper), Z.popperInstance && pa.some(function(b) {
                return a.hasOwnProperty(b)
            }) && (Z.popperInstance.destroy(), Z.popperInstance = r(), Z.state.isVisible || Z.popperInstance.disableEventListeners(), Z.props.followCursor && M && e(M))
        }

        function F(a) {
            E({
                content: a
            })
        }

        function G() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ab(Z.props.duration, 0, na.duration[0]);
            if (!Z.state.isDestroyed && Z.state.isEnabled && (!Hb || Z.props.touch)) {
                if (!Z.reference.isVirtual && !document.documentElement.contains(Z.reference)) return I();
                if (!Z.reference.hasAttribute("disabled")) return S ? void(S = !1) : void(Z.props.onShow(Z) !== !1 && (Z.popper.style.visibility = "visible", Z.state.isVisible = !0, Va([Z.popper, Z.popperChildren.tooltip, Z.popperChildren.backdrop], 0), s(function() {
                    Z.state.isVisible && (t() || Z.popperInstance.update(), Va([Z.popperChildren.tooltip, Z.popperChildren.backdrop, Z.popperChildren.content], a), Z.popperChildren.backdrop && (Z.popperChildren.content.style.transitionDelay = Math.round(a / 6) + "ms"), Z.props.interactive && Z.reference.classList.add("tippy-active"), Z.props.sticky && u(), xb([Z.popperChildren.tooltip, Z.popperChildren.backdrop, Z.popperChildren.content], "visible"), w(a, function() {
                        0 === Z.props.updateDuration && Z.popperChildren.tooltip.classList.add("tippy-notransition"), Z.props.interactive && ["focus", "click"].indexOf(L.type) > -1 && pb(Z.popper), Z.reference.setAttribute("aria-describedby", Z.popper.id), Z.props.onShown(Z), Z.state.isShown = !0
                    }))
                })))
            }
        }

        function H() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ab(Z.props.duration, 1, na.duration[1]);
            !Z.state.isDestroyed && Z.state.isEnabled && Z.props.onHide(Z) !== !1 && (0 === Z.props.updateDuration && Z.popperChildren.tooltip.classList.remove("tippy-notransition"), Z.props.interactive && Z.reference.classList.remove("tippy-active"), Z.popper.style.visibility = "hidden", Z.state.isVisible = !1, Z.state.isShown = !1, Va([Z.popperChildren.tooltip, Z.popperChildren.backdrop, Z.popperChildren.content], a), xb([Z.popperChildren.tooltip, Z.popperChildren.backdrop, Z.popperChildren.content], "hidden"), Z.props.interactive && !S && ["focus", "click"].indexOf(L.type) > -1 && ("focus" === L.type && (S = !0), pb(Z.reference)), v(a, function() {
                P || i(), Z.reference.removeAttribute("aria-describedby"), Z.popperInstance.disableEventListeners(), Z.props.appendTo.removeChild(Z.popper), Z.state.isMounted = !1, Z.props.onHidden(Z)
            }))
        }

        function I(a) {
            Z.state.isDestroyed || (Z.state.isMounted && H(0), A(), Z.reference.removeEventListener("click", c), delete Z.reference._tippy, Z.props.target && a && Sa(Z.reference.querySelectorAll(Z.props.target)).forEach(function(a) {
                return a._tippy && a._tippy.destroy()
            }), Z.popperInstance && Z.popperInstance.destroy(), K && K.disconnect(), Z.state.isDestroyed = !0)
        }
        var J = Db(a, b);
        if (!J.multiple && a._tippy) return null;
        var K = null,
            L = {},
            M = null,
            N = 0,
            O = 0,
            P = !1,
            Q = function() {},
            R = [],
            S = !1,
            T = J.interactiveDebounce > 0 ? Fb(l, J.interactiveDebounce) : l,
            U = Ob++,
            V = hb(U, J);
        V.addEventListener("mouseenter", function(a) {
            Z.props.interactive && Z.state.isVisible && "mouseenter" === L.type && g(a)
        }), V.addEventListener("mouseleave", function(a) {
            Z.props.interactive && "mouseenter" === L.type && 0 === Z.props.interactiveDebounce && Ab(Cb(V), V.getBoundingClientRect(), a, Z.props) && h()
        });
        var W = Wa(V),
            X = {
                isEnabled: !0,
                isVisible: !1,
                isDestroyed: !1,
                isMounted: !1,
                isShown: !1
            },
            Y = null,
            Z = {
                id: U,
                reference: a,
                popper: V,
                popperChildren: W,
                popperInstance: Y,
                props: J,
                state: X,
                clearDelayTimeouts: D,
                set: E,
                setContent: F,
                show: G,
                hide: H,
                enable: B,
                disable: C,
                destroy: I
            };
        return z(), a.addEventListener("click", c), J.lazy || (Z.popperInstance = r(), Z.popperInstance.disableEventListeners()), J.showOnInit && g(), !J.a11y || J.target || Ua(a) || a.setAttribute("tabindex", "0"), a._tippy = Z, V._tippy = Z, Z
    }

    function ja(a, b, c) {
        Gb(b, na), Pb || (ha(), Pb = !0);
        var d = ma({}, na, b);
        Xa(a) && lb(a);
        var e = $a(a),
            f = e[0],
            g = (c && f ? [f] : e).reduce(function(a, b) {
                var c = b && ia(b, d);
                return c && a.push(c), a
            }, []);
        return {
            targets: a,
            props: d,
            instances: g,
            destroyAll: function() {
                this.instances.forEach(function(a) {
                    a.destroy()
                }), this.instances = []
            }
        }
    }
    for (var ka = '.tippy-iOS{cursor:pointer!important}.tippy-notransition{transition:none!important}.tippy-popper{-webkit-perspective:700px;perspective:700px;z-index:9999;outline:0;transition-timing-function:cubic-bezier(.165,.84,.44,1);pointer-events:none;line-height:1.4}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-8px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;bottom:-7px;margin:0 6px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 25%;transform-origin:0 25%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%)}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%,-45%);transform:scale(.2) translate(-50%,-45%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{-webkit-transform:translateY(-10px) rotateX(0);transform:translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(60deg);transform:translateY(0) rotateX(60deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(.5);transform:translateY(0) scale(.5)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-8px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(0);transform:rotate(0)}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;top:-7px;margin:0 6px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%)}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%);transform:scale(.2) translate(-50%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{-webkit-transform:translateY(10px) rotateX(0);transform:translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(-60deg);transform:translateY(0) rotateX(-60deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(.5);transform:translateY(0) scale(.5)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-16px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-75%,-50%);transform:scale(.2) translate(-75%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{-webkit-transform:translateX(-10px) rotateY(0);transform:translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(-60deg);transform:translateX(0) rotateY(-60deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(.5);transform:translateX(0) scale(.5)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-16px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-25%,-50%);transform:scale(.2) translate(-25%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{-webkit-transform:translateX(10px) rotateY(0);transform:translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(60deg);transform:translateX(0) rotateY(60deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(.5);transform:translateX(0) scale(.5)}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:.9rem;padding:.3rem .6rem;max-width:350px;text-align:center;will-change:transform;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#333}.tippy-tooltip[data-size=small]{padding:.2rem .4rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.4rem .8rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.53,2,.36,.85)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:24px;height:8px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;will-change:transform;background-color:#333;border-radius:50%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:"";float:left;padding-top:100%}.tippy-backdrop+.tippy-content{transition-property:opacity}.tippy-backdrop+.tippy-content[data-state=visible]{opacity:1}.tippy-backdrop+.tippy-content[data-state=hidden]{opacity:0}@media (max-width:360px){.tippy-popper{max-width:96%;max-width:calc(100% - 20px)}}', la = "3.2.0", ma = Object.assign || function(a) {
            for (var b = 1; b < arguments.length; b++) {
                var c = arguments[b];
                for (var d in c) Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d])
            }
            return a
        }, na = {
            a11y: !0,
            allowHTML: !0,
            animateFill: !0,
            animation: "shift-away",
            appendTo: function() {
                return document.body
            },
            arrow: !1,
            arrowTransform: "",
            arrowType: "sharp",
            content: "",
            delay: [0, 20],
            distance: 10,
            duration: [325, 275],
            flip: !0,
            flipBehavior: "flip",
            followCursor: !1,
            hideOnClick: !0,
            inertia: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            lazy: !0,
            livePlacement: !0,
            multiple: !1,
            offset: 0,
            onHidden: function() {},
            onHide: function() {},
            onMount: function() {},
            onShow: function() {},
            onShown: function() {},
            performance: !1,
            placement: "top",
            popperOptions: {},
            shouldPopperHideOnBlur: function() {
                return !0
            },
            showOnInit: !1,
            size: "regular",
            sticky: !1,
            target: "",
            theme: "dark",
            touch: !0,
            touchHold: !1,
            trigger: "mouseenter focus",
            updateDuration: 200,
            wait: null,
            zIndex: 9999
        }, oa = function(a) {
            na = ma({}, na, a)
        }, pa = ["arrowType", "distance", "flip", "flipBehavior", "offset", "placement", "popperOptions"], qa = "undefined" != typeof window, ra = qa ? navigator : {}, sa = qa ? window : {}, ta = ("MutationObserver" in sa), ua = /MSIE |Trident\//.test(ra.userAgent), va = /iPhone|iPad|iPod/.test(ra.platform) && !sa.MSStream, wa = ("ontouchstart" in sa), xa = "undefined" != typeof window && "undefined" != typeof document, ya = ["Edge", "Trident", "Firefox"], za = 0, Aa = 0; Aa < ya.length; Aa += 1)
        if (xa && navigator.userAgent.indexOf(ya[Aa]) >= 0) {
            za = 1;
            break
        }
    var Ba = xa && window.Promise,
        Ca = Ba ? a : b,
        Da = xa && !(!window.MSInputMethodContext || !document.documentMode),
        Ea = xa && /MSIE 10/.test(navigator.userAgent),
        Fa = function(a, b) {
            if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
        },
        Ga = function() {
            function a(a, b) {
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                }
            }
            return function(b, c, d) {
                return c && a(b.prototype, c), d && a(b, d), b
            }
        }(),
        Ha = function(a, b, c) {
            return b in a ? Object.defineProperty(a, b, {
                value: c,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : a[b] = c, a
        },
        Ia = Object.assign || function(a) {
            for (var b = 1; b < arguments.length; b++) {
                var c = arguments[b];
                for (var d in c) Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d])
            }
            return a
        },
        Ja = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        Ka = Ja.slice(3),
        La = {
            FLIP: "flip",
            CLOCKWISE: "clockwise",
            COUNTERCLOCKWISE: "counterclockwise"
        },
        Ma = {
            shift: {
                order: 100,
                enabled: !0,
                fn: ea
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: ca,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: da,
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: _
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: X,
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: $,
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: ga
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: fa
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: V,
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: T,
                onLoad: U,
                gpuAcceleration: void 0
            }
        },
        Na = {
            placement: "bottom",
            positionFixed: !1,
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function() {},
            onUpdate: function() {},
            modifiers: Ma
        },
        Oa = function() {
            function a(b, d) {
                var e = this,
                    f = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                Fa(this, a), this.scheduleUpdate = function() {
                    return requestAnimationFrame(e.update)
                }, this.update = Ca(this.update.bind(this)), this.options = Ia({}, a.Defaults, f), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = b && b.jquery ? b[0] : b, this.popper = d && d.jquery ? d[0] : d, this.options.modifiers = {}, Object.keys(Ia({}, a.Defaults.modifiers, f.modifiers)).forEach(function(b) {
                    e.options.modifiers[b] = Ia({}, a.Defaults.modifiers[b] || {}, f.modifiers ? f.modifiers[b] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(a) {
                    return Ia({
                        name: a
                    }, e.options.modifiers[a])
                }).sort(function(a, b) {
                    return a.order - b.order
                }), this.modifiers.forEach(function(a) {
                    a.enabled && c(a.onLoad) && a.onLoad(e.reference, e.popper, e.options, a, e.state)
                }), this.update();
                var g = this.options.eventsEnabled;
                g && this.enableEventListeners(), this.state.eventsEnabled = g
            }
            return Ga(a, [{
                key: "update",
                value: function() {
                    return G.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return J.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return N.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return P.call(this)
                }
            }]), a
        }();
    Oa.Utils = ("undefined" != typeof window ? window : global).PopperUtils, Oa.placements = Ja, Oa.Defaults = Na;
    var Pa = {
            POPPER: ".tippy-popper",
            TOOLTIP: ".tippy-tooltip",
            CONTENT: ".tippy-content",
            BACKDROP: ".tippy-backdrop",
            ARROW: ".tippy-arrow",
            ROUND_ARROW: ".tippy-roundarrow"
        },
        Qa = {
            x: !0
        },
        Ra = function(a) {
            if (ta) {
                var b = document.createElement("style");
                b.type = "text/css", b.textContent = a, document.head.insertBefore(b, document.head.firstChild)
            }
        },
        Sa = function(a) {
            return [].slice.call(a)
        },
        Ta = function(a, b) {
            b.content instanceof Element ? (Za(a, ""), a.appendChild(b.content)) : a[b.allowHTML ? "innerHTML" : "textContent"] = b.content
        },
        Ua = function(a) {
            return a instanceof Element ? mb.call(a, "a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]") && !a.hasAttribute("disabled") : !0
        },
        Va = function(a, b) {
            a.filter(Boolean).forEach(function(a) {
                a.style.transitionDuration = b + "ms"
            })
        },
        Wa = function(a) {
            var b = function(b) {
                return a.querySelector(b)
            };
            return {
                tooltip: b(Pa.TOOLTIP),
                backdrop: b(Pa.BACKDROP),
                content: b(Pa.CONTENT),
                arrow: b(Pa.ARROW) || b(Pa.ROUND_ARROW)
            }
        },
        Xa = function(a) {
            return "[object Object]" === {}.toString.call(a)
        },
        Ya = function() {
            return document.createElement("div")
        },
        Za = function(a, b) {
            a[Qa.x && "innerHTML"] = b instanceof Element ? b[Qa.x && "innerHTML"] : b
        },
        $a = function(a) {
            if (a instanceof Element || Xa(a)) return [a];
            if (a instanceof NodeList) return Sa(a);
            if (Array.isArray(a)) return a;
            try {
                return Sa(document.querySelectorAll(a))
            } catch (b) {
                return []
            }
        },
        _a = function(a) {
            return !isNaN(a) && !isNaN(parseFloat(a))
        },
        ab = function(a, b, c) {
            if (Array.isArray(a)) {
                var d = a[b];
                return null == d ? c : d
            }
            return a
        },
        bb = function(a) {
            var b = Ya();
            return "round" === a ? (b.className = "tippy-roundarrow", Za(b, '<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>')) : b.className = "tippy-arrow", b
        },
        cb = function() {
            var a = Ya();
            return a.className = "tippy-backdrop", a.setAttribute("data-state", "hidden"), a
        },
        db = function(a, b) {
            a.setAttribute("tabindex", "-1"), b.setAttribute("data-interactive", "")
        },
        eb = function(a, b) {
            a.removeAttribute("tabindex"), b.removeAttribute("data-interactive")
        },
        fb = function(a) {
            a.setAttribute("data-inertia", "")
        },
        gb = function(a) {
            a.removeAttribute("data-inertia")
        },
        hb = function(a, b) {
            var c = Ya();
            c.className = "tippy-popper", c.setAttribute("role", "tooltip"), c.id = "tippy-" + a, c.style.zIndex = b.zIndex;
            var d = Ya();
            d.className = "tippy-tooltip", d.setAttribute("data-size", b.size), d.setAttribute("data-animation", b.animation), d.setAttribute("data-state", "hidden"), b.theme.split(" ").forEach(function(a) {
                d.classList.add(a + "-theme")
            });
            var e = Ya();
            return e.className = "tippy-content", e.setAttribute("data-state", "hidden"), b.interactive && db(c, d), b.arrow && d.appendChild(bb(b.arrowType)), b.animateFill && (d.appendChild(cb()), d.setAttribute("data-animatefill", "")), b.inertia && d.setAttribute("data-inertia", ""), Ta(e, b), d.appendChild(e), c.appendChild(d), c.addEventListener("focusout", function(a) {
                a.relatedTarget && c._tippy && !ob(a.relatedTarget, function(a) {
                    return a === c
                }) && a.relatedTarget !== c._tippy.reference && c._tippy.props.shouldPopperHideOnBlur(a) && c._tippy.hide()
            }), c
        },
        ib = function(a, b, c) {
            var d = Wa(a),
                e = d.tooltip,
                f = d.content,
                g = d.backdrop,
                h = d.arrow;
            a.style.zIndex = c.zIndex, e.setAttribute("data-size", c.size), e.setAttribute("data-animation", c.animation), b.content !== c.content && Ta(f, c), !b.animateFill && c.animateFill ? (e.appendChild(cb()), e.setAttribute("data-animatefill", "")) : b.animateFill && !c.animateFill && (e.removeChild(g), e.removeAttribute("data-animatefill")), !b.arrow && c.arrow ? e.appendChild(bb(c.arrowType)) : b.arrow && !c.arrow && e.removeChild(h), b.arrow && c.arrow && b.arrowType !== c.arrowType && e.replaceChild(bb(c.arrowType), h), !b.interactive && c.interactive ? db(a, e) : b.interactive && !c.interactive && eb(a, e), !b.inertia && c.inertia ? fb(e) : b.inertia && !c.inertia && gb(e), b.theme !== c.theme && (b.theme.split(" ").forEach(function(a) {
                e.classList.remove(a + "-theme")
            }), c.theme.split(" ").forEach(function(a) {
                e.classList.add(a + "-theme")
            }))
        },
        jb = function(a) {
            Sa(document.querySelectorAll(Pa.POPPER)).forEach(function(b) {
                var c = b._tippy;
                !c || c.props.hideOnClick !== !0 || a && b === a.popper || c.hide()
            })
        },
        kb = function(a) {
            return Object.keys(na).reduce(function(b, c) {
                var d = (a.getAttribute("data-tippy-" + c) || "").trim();
                return d ? ("content" === c ? b[c] = d : "true" === d ? b[c] = !0 : "false" === d ? b[c] = !1 : _a(d) ? b[c] = Number(d) : "[" === d[0] || "{" === d[0] ? b[c] = JSON.parse(d) : b[c] = d, b) : b
            }, {})
        },
        lb = function(a) {
            var b = {
                isVirtual: !0,
                attributes: a.attributes || {},
                setAttribute: function(b, c) {
                    a.attributes[b] = c
                },
                getAttribute: function(b) {
                    return a.attributes[b]
                },
                removeAttribute: function(b) {
                    delete a.attributes[b]
                },
                hasAttribute: function(b) {
                    return b in a.attributes
                },
                addEventListener: function() {},
                removeEventListener: function() {},
                classList: {
                    classNames: {},
                    add: function(b) {
                        a.classList.classNames[b] = !0
                    },
                    remove: function(b) {
                        delete a.classList.classNames[b]
                    },
                    contains: function(b) {
                        return b in a.classList.classNames
                    }
                }
            };
            for (var c in b) a[c] = b[c];
            return a
        },
        mb = function() {
            if (qa) {
                var a = Element.prototype;
                return a.matches || a.matchesSelector || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector
            }
        }(),
        nb = function(a, b) {
            return (Element.prototype.closest || function(a) {
                for (var b = this; b;) {
                    if (mb.call(b, a)) return b;
                    b = b.parentElement
                }
            }).call(a, b)
        },
        ob = function(a, b) {
            for (; a;) {
                if (b(a)) return a;
                a = a.parentElement
            }
        },
        pb = function(a) {
            var b = window.scrollX || window.pageXOffset,
                c = window.scrollY || window.pageYOffset;
            a.focus(), scroll(b, c)
        },
        qb = function(a) {
            void a.offsetHeight
        },
        rb = function(a, b) {
            return (b ? a : {
                X: "Y",
                Y: "X"
            }[a]) || ""
        },
        sb = function(a, b, c, d) {
            var e = b[0],
                f = b[1];
            if (!e && !f) return "";
            var g = {
                scale: function() {
                    return f ? c ? e + ", " + f : f + ", " + e : "" + e
                }(),
                translate: function() {
                    return f ? c ? d ? e + "px, " + -f + "px" : e + "px, " + f + "px" : d ? -f + "px, " + e + "px" : f + "px, " + e + "px" : d ? -e + "px" : e + "px"
                }()
            };
            return g[a]
        },
        tb = function(a, b) {
            var c = a.match(new RegExp(b + "([XY])"));
            return c ? c[1] : ""
        },
        ub = function(a, b) {
            var c = a.match(b);
            return c ? c[1].split(",").map(parseFloat) : []
        },
        vb = {
            translate: /translateX?Y?\(([^)]+)\)/,
            scale: /scaleX?Y?\(([^)]+)\)/
        },
        wb = function(a, b) {
            var c = Cb(nb(a, Pa.POPPER)),
                d = "top" === c || "bottom" === c,
                e = "right" === c || "bottom" === c,
                f = {
                    translate: {
                        axis: tb(b, "translate"),
                        numbers: ub(b, vb.translate)
                    },
                    scale: {
                        axis: tb(b, "scale"),
                        numbers: ub(b, vb.scale)
                    }
                },
                g = b.replace(vb.translate, "translate" + rb(f.translate.axis, d) + "(" + sb("translate", f.translate.numbers, d, e) + ")").replace(vb.scale, "scale" + rb(f.scale.axis, d) + "(" + sb("scale", f.scale.numbers, d, e) + ")");
            a.style["undefined" != typeof document.body.style.transform ? "transform" : "webkitTransform"] = g
        },
        xb = function(a, b) {
            a.filter(Boolean).forEach(function(a) {
                a.setAttribute("data-state", b)
            })
        },
        yb = function(a, b) {
            var c = a.popper,
                d = a.options,
                e = d.onCreate,
                f = d.onUpdate;
            d.onCreate = d.onUpdate = function() {
                qb(c), b(), f(), d.onCreate = e, d.onUpdate = f
            }
        },
        zb = function(a) {
            setTimeout(a, 1)
        },
        Ab = function(a, b, c, d) {
            if (!a) return !0;
            var e = c.clientX,
                f = c.clientY,
                g = d.interactiveBorder,
                h = d.distance,
                i = b.top - f > ("top" === a ? g + h : g),
                j = f - b.bottom > ("bottom" === a ? g + h : g),
                k = b.left - e > ("left" === a ? g + h : g),
                l = e - b.right > ("right" === a ? g + h : g);
            return i || j || k || l
        },
        Bb = function(a, b) {
            return -(a - b) + "px"
        },
        Cb = function(a) {
            var b = a.getAttribute("x-placement");
            return b ? b.split("-")[0] : ""
        },
        Db = function(a, b) {
            var c = ma({}, b, b.performance ? {} : kb(a));
            return c.arrow && (c.animateFill = !1), "function" == typeof c.appendTo && (c.appendTo = b.appendTo(a)), "function" == typeof c.content && (c.content = b.content(a)), c
        },
        Eb = function(a, b, c) {
            a[b + "EventListener"]("transitionend", c)
        },
        Fb = function(a, b) {
            var c = void 0;
            return function() {
                var d = this,
                    e = arguments;
                clearTimeout(c), c = setTimeout(function() {
                    return a.apply(d, e)
                }, b)
            }
        },
        Gb = function(a, b) {
            for (var c in a || {})
                if (!(c in b)) throw Error("[tippy]: `" + c + "` is not a valid option")
        },
        Hb = !1,
        Ib = function() {
            Hb || (Hb = !0, va && document.body.classList.add("tippy-iOS"), window.performance && document.addEventListener("mousemove", Kb))
        },
        Jb = 0,
        Kb = function Rb() {
            var a = performance.now();
            20 > a - Jb && (Hb = !1, document.removeEventListener("mousemove", Rb), va || document.body.classList.remove("tippy-iOS")), Jb = a
        },
        Lb = function(a) {
            var b = a.target;
            if (!(b instanceof Element)) return jb();
            var c = nb(b, Pa.POPPER);
            if (!(c && c._tippy && c._tippy.props.interactive)) {
                var d = ob(b, function(a) {
                    return a._tippy && a._tippy.reference === a
                });
                if (d) {
                    var e = d._tippy,
                        f = e.props.trigger.indexOf("click") > -1;
                    if (Hb || f) return jb(e);
                    if (e.props.hideOnClick !== !0 || f) return;
                    e.clearDelayTimeouts()
                }
                jb()
            }
        },
        Mb = function() {
            var a = document,
                b = a.activeElement;
            b && b.blur && b._tippy && b.blur()
        },
        Nb = function() {
            Sa(document.querySelectorAll(Pa.POPPER)).forEach(function(a) {
                var b = a._tippy;
                b.props.livePlacement || b.popperInstance.scheduleUpdate()
            })
        },
        Ob = 1,
        Pb = !1;
    ja.version = la, ja.defaults = na, ja.one = function(a, b) {
        return ja(a, b, !0).instances[0]
    }, ja.setDefaults = function(a) {
        oa(a), ja.defaults = na
    }, ja.disableAnimations = function() {
        ja.setDefaults({
            duration: 0,
            updateDuration: 0,
            animateFill: !1
        })
    }, ja.hideAllPoppers = jb, ja.useCapture = function() {};
    var Qb = function() {
        Sa(document.querySelectorAll("[data-tippy]")).forEach(function(a) {
            var b = a.getAttribute("data-tippy");
            b && ja(a, {
                content: b
            })
        })
    };
    return qa && setTimeout(Qb), Ra(ka), ja
});
