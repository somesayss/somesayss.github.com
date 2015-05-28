/*! hello-grunt 2015-05-26 */
/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
*/
!function(a, b) {
    function c(a) {
        var b = a.length, c = ia.type(a);
        return ia.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || "function" !== c && (0 === b || "number" == typeof b && b > 0 && b - 1 in a);
    }
    function d(a) {
        var b = xa[a] = {};
        return ia.each(a.match(ka) || [], function(a, c) {
            b[c] = !0;
        }), b;
    }
    function e(a, c, d, e) {
        if (ia.acceptData(a)) {
            var f, g, h = ia.expando, i = "string" == typeof c, j = a.nodeType, k = j ? ia.cache : a, l = j ? a[h] : a[h] && h;
            if (l && k[l] && (e || k[l].data) || !i || d !== b) return l || (j ? a[h] = l = _.pop() || ia.guid++ : l = h), 
            k[l] || (k[l] = {}, j || (k[l].toJSON = ia.noop)), ("object" == typeof c || "function" == typeof c) && (e ? k[l] = ia.extend(k[l], c) : k[l].data = ia.extend(k[l].data, c)), 
            f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[ia.camelCase(c)] = d), 
            i ? (g = f[c], null == g && (g = f[ia.camelCase(c)])) : g = f, g;
        }
    }
    function f(a, b, c) {
        if (ia.acceptData(a)) {
            var d, e, f, g = a.nodeType, i = g ? ia.cache : a, j = g ? a[ia.expando] : ia.expando;
            if (i[j]) {
                if (b && (f = c ? i[j] : i[j].data)) {
                    ia.isArray(b) ? b = b.concat(ia.map(b, ia.camelCase)) : b in f ? b = [ b ] : (b = ia.camelCase(b), 
                    b = b in f ? [ b ] : b.split(" "));
                    for (d = 0, e = b.length; e > d; d++) delete f[b[d]];
                    if (!(c ? h : ia.isEmptyObject)(f)) return;
                }
                (c || (delete i[j].data, h(i[j]))) && (g ? ia.cleanData([ a ], !0) : ia.support.deleteExpando || i != i.window ? delete i[j] : i[j] = null);
            }
        }
    }
    function g(a, c, d) {
        if (d === b && 1 === a.nodeType) {
            var e = "data-" + c.replace(za, "-$1").toLowerCase();
            if (d = a.getAttribute(e), "string" == typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : ya.test(d) ? ia.parseJSON(d) : d;
                } catch (f) {}
                ia.data(a, c, d);
            } else d = b;
        }
        return d;
    }
    function h(a) {
        var b;
        for (b in a) if (("data" !== b || !ia.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0;
    }
    function i() {
        return !0;
    }
    function j() {
        return !1;
    }
    function k(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a;
    }
    function l(a, b, c) {
        if (b = b || 0, ia.isFunction(b)) return ia.grep(a, function(a, d) {
            var e = !!b.call(a, d, a);
            return e === c;
        });
        if (b.nodeType) return ia.grep(a, function(a) {
            return a === b === c;
        });
        if ("string" == typeof b) {
            var d = ia.grep(a, function(a) {
                return 1 === a.nodeType;
            });
            if (Ra.test(b)) return ia.filter(b, d, !c);
            b = ia.filter(b, d);
        }
        return ia.grep(a, function(a) {
            return ia.inArray(a, b) >= 0 === c;
        });
    }
    function m(a) {
        var b = Ua.split("|"), c = a.createDocumentFragment();
        if (c.createElement) for (;b.length; ) c.createElement(b.pop());
        return c;
    }
    function n(a, b) {
        return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b));
    }
    function o(a) {
        var b = a.getAttributeNode("type");
        return a.type = (b && b.specified) + "/" + a.type, a;
    }
    function p(a) {
        var b = eb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a;
    }
    function q(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) ia._data(c, "globalEval", !b || ia._data(b[d], "globalEval"));
    }
    function r(a, b) {
        if (1 === b.nodeType && ia.hasData(a)) {
            var c, d, e, f = ia._data(a), g = ia._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h) for (d = 0, e = h[c].length; e > d; d++) ia.event.add(b, c, h[c][d]);
            }
            g.data && (g.data = ia.extend({}, g.data));
        }
    }
    function s(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !ia.support.noCloneEvent && b[ia.expando]) {
                e = ia._data(b);
                for (d in e.events) ia.removeEvent(b, d, e.handle);
                b.removeAttribute(ia.expando);
            }
            "script" === c && b.text !== a.text ? (o(b).text = a.text, p(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), 
            ia.support.html5Clone && a.innerHTML && !ia.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && bb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, 
            b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
        }
    }
    function t(a, c) {
        var d, e, f = 0, g = typeof a.getElementsByTagName !== V ? a.getElementsByTagName(c || "*") : typeof a.querySelectorAll !== V ? a.querySelectorAll(c || "*") : b;
        if (!g) for (g = [], d = a.childNodes || a; null != (e = d[f]); f++) !c || ia.nodeName(e, c) ? g.push(e) : ia.merge(g, t(e, c));
        return c === b || c && ia.nodeName(a, c) ? ia.merge([ a ], g) : g;
    }
    function u(a) {
        bb.test(a.type) && (a.defaultChecked = a.checked);
    }
    function v(a, b) {
        if (b in a) return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = yb.length; e--; ) if (b = yb[e] + c, 
        b in a) return b;
        return d;
    }
    function w(a, b) {
        return a = b || a, "none" === ia.css(a, "display") || !ia.contains(a.ownerDocument, a);
    }
    function x(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = ia._data(d, "olddisplay"), 
        c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && w(d) && (f[g] = ia._data(d, "olddisplay", B(d.nodeName)))) : f[g] || (e = w(d), 
        (c && "none" !== c || !e) && ia._data(d, "olddisplay", e ? c : ia.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a;
    }
    function y(a, b, c) {
        var d = rb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function z(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += ia.css(a, c + xb[f], !0, e)), 
        d ? ("content" === c && (g -= ia.css(a, "padding" + xb[f], !0, e)), "margin" !== c && (g -= ia.css(a, "border" + xb[f] + "Width", !0, e))) : (g += ia.css(a, "padding" + xb[f], !0, e), 
        "padding" !== c && (g += ia.css(a, "border" + xb[f] + "Width", !0, e)));
        return g;
    }
    function A(a, b, c) {
        var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = kb(a), g = ia.support.boxSizing && "border-box" === ia.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = lb(a, b, f), (0 > e || null == e) && (e = a.style[b]), sb.test(e)) return e;
            d = g && (ia.support.boxSizingReliable || e === a.style[b]), e = parseFloat(e) || 0;
        }
        return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }
    function B(a) {
        var b = W, c = ub[a];
        return c || (c = C(a, b), "none" !== c && c || (jb = (jb || ia("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement), 
        b = (jb[0].contentWindow || jb[0].contentDocument).document, b.write("<!doctype html><html><body>"), 
        b.close(), c = C(a, b), jb.detach()), ub[a] = c), c;
    }
    function C(a, b) {
        var c = ia(b.createElement(a)).appendTo(b.body), d = ia.css(c[0], "display");
        return c.remove(), d;
    }
    function D(a, b, c, d) {
        var e;
        if (ia.isArray(b)) ia.each(b, function(b, e) {
            c || Ab.test(a) ? d(a, e) : D(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
        }); else if (c || "object" !== ia.type(b)) d(a, b); else for (e in b) D(a + "[" + e + "]", b[e], c, d);
    }
    function E(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(ka) || [];
            if (ia.isFunction(c)) for (;d = f[e++]; ) "+" === d[0] ? (d = d.slice(1) || "*", 
            (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
        };
    }
    function F(a, c, d, e) {
        function f(i) {
            var j;
            return g[i] = !0, ia.each(a[i] || [], function(a, i) {
                var k = i(c, d, e);
                return "string" != typeof k || h || g[k] ? h ? !(j = k) : b : (c.dataTypes.unshift(k), 
                f(k), !1);
            }), j;
        }
        var g = {}, h = a === Rb;
        return f(c.dataTypes[0]) || !g["*"] && f("*");
    }
    function G(a, c) {
        var d, e, f = ia.ajaxSettings.flatOptions || {};
        for (e in c) c[e] !== b && ((f[e] ? a : d || (d = {}))[e] = c[e]);
        return d && ia.extend(!0, a, d), a;
    }
    function H(a, c, d) {
        var e, f, g, h, i = a.contents, j = a.dataTypes, k = a.responseFields;
        for (h in k) h in d && (c[k[h]] = d[h]);
        for (;"*" === j[0]; ) j.shift(), f === b && (f = a.mimeType || c.getResponseHeader("Content-Type"));
        if (f) for (h in i) if (i[h] && i[h].test(f)) {
            j.unshift(h);
            break;
        }
        if (j[0] in d) g = j[0]; else {
            for (h in d) {
                if (!j[0] || a.converters[h + " " + j[0]]) {
                    g = h;
                    break;
                }
                e || (e = h);
            }
            g = g || e;
        }
        return g ? (g !== j[0] && j.unshift(g), d[g]) : b;
    }
    function I(a, b) {
        var c, d, e, f, g = {}, h = 0, i = a.dataTypes.slice(), j = i[0];
        if (a.dataFilter && (b = a.dataFilter(b, a.dataType)), i[1]) for (e in a.converters) g[e.toLowerCase()] = a.converters[e];
        for (;d = i[++h]; ) if ("*" !== d) {
            if ("*" !== j && j !== d) {
                if (e = g[j + " " + d] || g["* " + d], !e) for (c in g) if (f = c.split(" "), f[1] === d && (e = g[j + " " + f[0]] || g["* " + f[0]])) {
                    e === !0 ? e = g[c] : g[c] !== !0 && (d = f[0], i.splice(h--, 0, d));
                    break;
                }
                if (e !== !0) if (e && a["throws"]) b = e(b); else try {
                    b = e(b);
                } catch (k) {
                    return {
                        state: "parsererror",
                        error: e ? k : "No conversion from " + j + " to " + d
                    };
                }
            }
            j = d;
        }
        return {
            state: "success",
            data: b
        };
    }
    function J() {
        try {
            return new a.XMLHttpRequest();
        } catch (b) {}
    }
    function K() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (b) {}
    }
    function L() {
        return setTimeout(function() {
            $b = b;
        }), $b = ia.now();
    }
    function M(a, b) {
        ia.each(b, function(b, c) {
            for (var d = (ec[b] || []).concat(ec["*"]), e = 0, f = d.length; f > e; e++) if (d[e].call(a, b, c)) return;
        });
    }
    function N(a, b, c) {
        var d, e, f = 0, g = dc.length, h = ia.Deferred().always(function() {
            delete i.elem;
        }), i = function() {
            if (e) return !1;
            for (var b = $b || L(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [ j, f, c ]), 1 > f && i ? c : (h.resolveWith(a, [ j ]), 
            !1);
        }, j = h.promise({
            elem: a,
            props: ia.extend({}, b),
            opts: ia.extend(!0, {
                specialEasing: {}
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: $b || L(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = ia.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d;
            },
            stop: function(b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; d > c; c++) j.tweens[c].run(1);
                return b ? h.resolveWith(a, [ j, b ]) : h.rejectWith(a, [ j, b ]), this;
            }
        }), k = j.props;
        for (O(k, j.opts.specialEasing); g > f; f++) if (d = dc[f].call(j, a, k, j.opts)) return d;
        return M(j, k), ia.isFunction(j.opts.start) && j.opts.start.call(a, j), ia.fx.timer(ia.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
    }
    function O(a, b) {
        var c, d, e, f, g;
        for (e in a) if (d = ia.camelCase(e), f = b[d], c = a[e], ia.isArray(c) && (f = c[1], 
        c = a[e] = c[0]), e !== d && (a[d] = c, delete a[e]), g = ia.cssHooks[d], g && "expand" in g) {
            c = g.expand(c), delete a[d];
            for (e in c) e in a || (a[e] = c[e], b[e] = f);
        } else b[d] = f;
    }
    function P(a, b, c) {
        var d, e, f, g, h, i, j, k, l, m = this, n = a.style, o = {}, p = [], q = a.nodeType && w(a);
        c.queue || (k = ia._queueHooks(a, "fx"), null == k.unqueued && (k.unqueued = 0, 
        l = k.empty.fire, k.empty.fire = function() {
            k.unqueued || l();
        }), k.unqueued++, m.always(function() {
            m.always(function() {
                k.unqueued--, ia.queue(a, "fx").length || k.empty.fire();
            });
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [ n.overflow, n.overflowX, n.overflowY ], 
        "inline" === ia.css(a, "display") && "none" === ia.css(a, "float") && (ia.support.inlineBlockNeedsLayout && "inline" !== B(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), 
        c.overflow && (n.overflow = "hidden", ia.support.shrinkWrapBlocks || m.always(function() {
            n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2];
        }));
        for (e in b) if (g = b[e], ac.exec(g)) {
            if (delete b[e], i = i || "toggle" === g, g === (q ? "hide" : "show")) continue;
            p.push(e);
        }
        if (f = p.length) {
            h = ia._data(a, "fxshow") || ia._data(a, "fxshow", {}), "hidden" in h && (q = h.hidden), 
            i && (h.hidden = !q), q ? ia(a).show() : m.done(function() {
                ia(a).hide();
            }), m.done(function() {
                var b;
                ia._removeData(a, "fxshow");
                for (b in o) ia.style(a, b, o[b]);
            });
            for (e = 0; f > e; e++) d = p[e], j = m.createTween(d, q ? h[d] : 0), o[d] = h[d] || ia.style(a, d), 
            d in h || (h[d] = j.start, q && (j.end = j.start, j.start = "width" === d || "height" === d ? 1 : 0));
        }
    }
    function Q(a, b, c, d, e) {
        return new Q.prototype.init(a, b, c, d, e);
    }
    function R(a, b) {
        var c, d = {
            height: a
        }, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = xb[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d;
    }
    function S(a) {
        return ia.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
    }
    var T, U, V = typeof b, W = a.document, X = a.location, Y = a.jQuery, Z = a.$, $ = {}, _ = [], aa = "1.9.1", ba = _.concat, ca = _.push, da = _.slice, ea = _.indexOf, fa = $.toString, ga = $.hasOwnProperty, ha = aa.trim, ia = function(a, b) {
        return new ia.fn.init(a, b, U);
    }, ja = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ka = /\S+/g, la = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ma = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, na = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, oa = /^[\],:{}\s]*$/, pa = /(?:^|:|,)(?:\s*\[)+/g, qa = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, ra = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, sa = /^-ms-/, ta = /-([\da-z])/gi, ua = function(a, b) {
        return b.toUpperCase();
    }, va = function(a) {
        (W.addEventListener || "load" === a.type || "complete" === W.readyState) && (wa(), 
        ia.ready());
    }, wa = function() {
        W.addEventListener ? (W.removeEventListener("DOMContentLoaded", va, !1), a.removeEventListener("load", va, !1)) : (W.detachEvent("onreadystatechange", va), 
        a.detachEvent("onload", va));
    };
    ia.fn = ia.prototype = {
        jquery: aa,
        constructor: ia,
        init: function(a, c, d) {
            var e, f;
            if (!a) return this;
            if ("string" == typeof a) {
                if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [ null, a, null ] : ma.exec(a), 
                !e || !e[1] && c) return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
                if (e[1]) {
                    if (c = c instanceof ia ? c[0] : c, ia.merge(this, ia.parseHTML(e[1], c && c.nodeType ? c.ownerDocument || c : W, !0)), 
                    na.test(e[1]) && ia.isPlainObject(c)) for (e in c) ia.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
                    return this;
                }
                if (f = W.getElementById(e[2]), f && f.parentNode) {
                    if (f.id !== e[2]) return d.find(a);
                    this.length = 1, this[0] = f;
                }
                return this.context = W, this.selector = a, this;
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : ia.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, 
            this.context = a.context), ia.makeArray(a, this));
        },
        selector: "",
        length: 0,
        size: function() {
            return this.length;
        },
        toArray: function() {
            return da.call(this);
        },
        get: function(a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a];
        },
        pushStack: function(a) {
            var b = ia.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b;
        },
        each: function(a, b) {
            return ia.each(this, a, b);
        },
        ready: function(a) {
            return ia.ready.promise().done(a), this;
        },
        slice: function() {
            return this.pushStack(da.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(a) {
            var b = this.length, c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [ this[c] ] : []);
        },
        map: function(a) {
            return this.pushStack(ia.map(this, function(b, c) {
                return a.call(b, c, b);
            }));
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: ca,
        sort: [].sort,
        splice: [].splice
    }, ia.fn.init.prototype = ia.fn, ia.extend = ia.fn.extend = function() {
        var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k = !1;
        for ("boolean" == typeof h && (k = h, h = arguments[1] || {}, i = 2), "object" == typeof h || ia.isFunction(h) || (h = {}), 
        j === i && (h = this, --i); j > i; i++) if (null != (f = arguments[i])) for (e in f) a = h[e], 
        d = f[e], h !== d && (k && d && (ia.isPlainObject(d) || (c = ia.isArray(d))) ? (c ? (c = !1, 
        g = a && ia.isArray(a) ? a : []) : g = a && ia.isPlainObject(a) ? a : {}, h[e] = ia.extend(k, g, d)) : d !== b && (h[e] = d));
        return h;
    }, ia.extend({
        noConflict: function(b) {
            return a.$ === ia && (a.$ = Z), b && a.jQuery === ia && (a.jQuery = Y), ia;
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? ia.readyWait++ : ia.ready(!0);
        },
        ready: function(a) {
            if (a === !0 ? !--ia.readyWait : !ia.isReady) {
                if (!W.body) return setTimeout(ia.ready);
                ia.isReady = !0, a !== !0 && --ia.readyWait > 0 || (T.resolveWith(W, [ ia ]), ia.fn.trigger && ia(W).trigger("ready").off("ready"));
            }
        },
        isFunction: function(a) {
            return "function" === ia.type(a);
        },
        isArray: Array.isArray || function(a) {
            return "array" === ia.type(a);
        },
        isWindow: function(a) {
            return null != a && a == a.window;
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a);
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? $[fa.call(a)] || "object" : typeof a;
        },
        isPlainObject: function(a) {
            if (!a || "object" !== ia.type(a) || a.nodeType || ia.isWindow(a)) return !1;
            try {
                if (a.constructor && !ga.call(a, "constructor") && !ga.call(a.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (c) {
                return !1;
            }
            var d;
            for (d in a) ;
            return d === b || ga.call(a, d);
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0;
        },
        error: function(a) {
            throw Error(a);
        },
        parseHTML: function(a, b, c) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof b && (c = b, b = !1), b = b || W;
            var d = na.exec(a), e = !c && [];
            return d ? [ b.createElement(d[1]) ] : (d = ia.buildFragment([ a ], b, e), e && ia(e).remove(), 
            ia.merge([], d.childNodes));
        },
        parseJSON: function(c) {
            return a.JSON && a.JSON.parse ? a.JSON.parse(c) : null === c ? c : "string" == typeof c && (c = ia.trim(c), 
            c && oa.test(c.replace(qa, "@").replace(ra, "]").replace(pa, ""))) ? Function("return " + c)() : (ia.error("Invalid JSON: " + c), 
            b);
        },
        parseXML: function(c) {
            var d, e;
            if (!c || "string" != typeof c) return null;
            try {
                a.DOMParser ? (e = new DOMParser(), d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), 
                d.async = "false", d.loadXML(c));
            } catch (f) {
                d = b;
            }
            return d && d.documentElement && !d.getElementsByTagName("parsererror").length || ia.error("Invalid XML: " + c), 
            d;
        },
        noop: function() {},
        globalEval: function(b) {
            b && ia.trim(b) && (a.execScript || function(b) {
                a.eval.call(a, b);
            })(b);
        },
        camelCase: function(a) {
            return a.replace(sa, "ms-").replace(ta, ua);
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
        },
        each: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a);
            if (d) {
                if (h) for (;g > f && (e = b.apply(a[f], d), e !== !1); f++) ; else for (f in a) if (e = b.apply(a[f], d), 
                e === !1) break;
            } else if (h) for (;g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++) ; else for (f in a) if (e = b.call(a[f], f, a[f]), 
            e === !1) break;
            return a;
        },
        trim: ha && !ha.call("\ufeff ") ? function(a) {
            return null == a ? "" : ha.call(a);
        } : function(a) {
            return null == a ? "" : (a + "").replace(la, "");
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? ia.merge(d, "string" == typeof a ? [ a ] : a) : ca.call(d, a)), 
            d;
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (ea) return ea.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++) if (c in b && b[c] === a) return c;
            }
            return -1;
        },
        merge: function(a, c) {
            var d = c.length, e = a.length, f = 0;
            if ("number" == typeof d) for (;d > f; f++) a[e++] = c[f]; else for (;c[f] !== b; ) a[e++] = c[f++];
            return a.length = e, a;
        },
        grep: function(a, b, c) {
            var d, e = [], f = 0, g = a.length;
            for (c = !!c; g > f; f++) d = !!b(a[f], f), c !== d && e.push(a[f]);
            return e;
        },
        map: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a), i = [];
            if (h) for (;g > f; f++) e = b(a[f], f, d), null != e && (i[i.length] = e); else for (f in a) e = b(a[f], f, d), 
            null != e && (i[i.length] = e);
            return ba.apply([], i);
        },
        guid: 1,
        proxy: function(a, c) {
            var d, e, f;
            return "string" == typeof c && (f = a[c], c = a, a = f), ia.isFunction(a) ? (d = da.call(arguments, 2), 
            e = function() {
                return a.apply(c || this, d.concat(da.call(arguments)));
            }, e.guid = a.guid = a.guid || ia.guid++, e) : b;
        },
        access: function(a, c, d, e, f, g, h) {
            var i = 0, j = a.length, k = null == d;
            if ("object" === ia.type(d)) {
                f = !0;
                for (i in d) ia.access(a, c, i, d[i], !0, g, h);
            } else if (e !== b && (f = !0, ia.isFunction(e) || (h = !0), k && (h ? (c.call(a, e), 
            c = null) : (k = c, c = function(a, b, c) {
                return k.call(ia(a), c);
            })), c)) for (;j > i; i++) c(a[i], d, h ? e : e.call(a[i], i, c(a[i], d)));
            return f ? a : k ? c.call(a) : j ? c(a[0], d) : g;
        },
        now: function() {
            return new Date().getTime();
        }
    }), ia.ready.promise = function(b) {
        if (!T) if (T = ia.Deferred(), "complete" === W.readyState) setTimeout(ia.ready); else if (W.addEventListener) W.addEventListener("DOMContentLoaded", va, !1), 
        a.addEventListener("load", va, !1); else {
            W.attachEvent("onreadystatechange", va), a.attachEvent("onload", va);
            var c = !1;
            try {
                c = null == a.frameElement && W.documentElement;
            } catch (d) {}
            c && c.doScroll && function e() {
                if (!ia.isReady) {
                    try {
                        c.doScroll("left");
                    } catch (a) {
                        return setTimeout(e, 50);
                    }
                    wa(), ia.ready();
                }
            }();
        }
        return T.promise(b);
    }, ia.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        $["[object " + b + "]"] = b.toLowerCase();
    }), U = ia(W);
    var xa = {};
    ia.Callbacks = function(a) {
        a = "string" == typeof a ? xa[a] || d(a) : ia.extend({}, a);
        var c, e, f, g, h, i, j = [], k = !a.once && [], l = function(b) {
            for (e = a.memory && b, f = !0, h = i || 0, i = 0, g = j.length, c = !0; j && g > h; h++) if (j[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                e = !1;
                break;
            }
            c = !1, j && (k ? k.length && l(k.shift()) : e ? j = [] : m.disable());
        }, m = {
            add: function() {
                if (j) {
                    var b = j.length;
                    !function d(b) {
                        ia.each(b, function(b, c) {
                            var e = ia.type(c);
                            "function" === e ? a.unique && m.has(c) || j.push(c) : c && c.length && "string" !== e && d(c);
                        });
                    }(arguments), c ? g = j.length : e && (i = b, l(e));
                }
                return this;
            },
            remove: function() {
                return j && ia.each(arguments, function(a, b) {
                    for (var d; (d = ia.inArray(b, j, d)) > -1; ) j.splice(d, 1), c && (g >= d && g--, 
                    h >= d && h--);
                }), this;
            },
            has: function(a) {
                return a ? ia.inArray(a, j) > -1 : !(!j || !j.length);
            },
            empty: function() {
                return j = [], this;
            },
            disable: function() {
                return j = k = e = b, this;
            },
            disabled: function() {
                return !j;
            },
            lock: function() {
                return k = b, e || m.disable(), this;
            },
            locked: function() {
                return !k;
            },
            fireWith: function(a, b) {
                return b = b || [], b = [ a, b.slice ? b.slice() : b ], !j || f && !k || (c ? k.push(b) : l(b)), 
                this;
            },
            fire: function() {
                return m.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!f;
            }
        };
        return m;
    }, ia.extend({
        Deferred: function(a) {
            var b = [ [ "resolve", "done", ia.Callbacks("once memory"), "resolved" ], [ "reject", "fail", ia.Callbacks("once memory"), "rejected" ], [ "notify", "progress", ia.Callbacks("memory") ] ], c = "pending", d = {
                state: function() {
                    return c;
                },
                always: function() {
                    return e.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var a = arguments;
                    return ia.Deferred(function(c) {
                        ia.each(b, function(b, f) {
                            var g = f[0], h = ia.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = h && h.apply(this, arguments);
                                a && ia.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[g + "With"](this === d ? c.promise() : this, h ? [ a ] : arguments);
                            });
                        }), a = null;
                    }).promise();
                },
                promise: function(a) {
                    return null != a ? ia.extend(a, d) : d;
                }
            }, e = {};
            return d.pipe = d.then, ia.each(b, function(a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h;
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this;
                }, e[f[0] + "With"] = g.fireWith;
            }), d.promise(e), a && a.call(e, e), e;
        },
        when: function(a) {
            var b, c, d, e = 0, f = da.call(arguments), g = f.length, h = 1 !== g || a && ia.isFunction(a.promise) ? g : 0, i = 1 === h ? a : ia.Deferred(), j = function(a, c, d) {
                return function(e) {
                    c[a] = this, d[a] = arguments.length > 1 ? da.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d);
                };
            };
            if (g > 1) for (b = Array(g), c = Array(g), d = Array(g); g > e; e++) f[e] && ia.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise();
        }
    }), ia.support = function() {
        var b, c, d, e, f, g, h, i, j, k, l = W.createElement("div");
        if (l.setAttribute("className", "t"), l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        c = l.getElementsByTagName("*"), d = l.getElementsByTagName("a")[0], !c || !d || !c.length) return {};
        f = W.createElement("select"), h = f.appendChild(W.createElement("option")), e = l.getElementsByTagName("input")[0], 
        d.style.cssText = "top:1px;float:left;opacity:.5", b = {
            getSetAttribute: "t" !== l.className,
            leadingWhitespace: 3 === l.firstChild.nodeType,
            tbody: !l.getElementsByTagName("tbody").length,
            htmlSerialize: !!l.getElementsByTagName("link").length,
            style: /top/.test(d.getAttribute("style")),
            hrefNormalized: "/a" === d.getAttribute("href"),
            opacity: /^0.5/.test(d.style.opacity),
            cssFloat: !!d.style.cssFloat,
            checkOn: !!e.value,
            optSelected: h.selected,
            enctype: !!W.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== W.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === W.compatMode,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, e.checked = !0, b.noCloneChecked = e.cloneNode(!0).checked, f.disabled = !0, 
        b.optDisabled = !h.disabled;
        try {
            delete l.test;
        } catch (m) {
            b.deleteExpando = !1;
        }
        e = W.createElement("input"), e.setAttribute("value", ""), b.input = "" === e.getAttribute("value"), 
        e.value = "t", e.setAttribute("type", "radio"), b.radioValue = "t" === e.value, 
        e.setAttribute("checked", "t"), e.setAttribute("name", "t"), g = W.createDocumentFragment(), 
        g.appendChild(e), b.appendChecked = e.checked, b.checkClone = g.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        l.attachEvent && (l.attachEvent("onclick", function() {
            b.noCloneEvent = !1;
        }), l.cloneNode(!0).click());
        for (k in {
            submit: !0,
            change: !0,
            focusin: !0
        }) l.setAttribute(i = "on" + k, "t"), b[k + "Bubbles"] = i in a || l.attributes[i].expando === !1;
        return l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", 
        b.clearCloneStyle = "content-box" === l.style.backgroundClip, ia(function() {
            var c, d, e, f = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", g = W.getElementsByTagName("body")[0];
            g && (c = W.createElement("div"), c.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
            g.appendChild(c).appendChild(l), l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
            e = l.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", 
            j = 0 === e[0].offsetHeight, e[0].style.display = "", e[1].style.display = "none", 
            b.reliableHiddenOffsets = j && 0 === e[0].offsetHeight, l.innerHTML = "", l.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", 
            b.boxSizing = 4 === l.offsetWidth, b.doesNotIncludeMarginInBodyOffset = 1 !== g.offsetTop, 
            a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(l, null) || {}).top, 
            b.boxSizingReliable = "4px" === (a.getComputedStyle(l, null) || {
                width: "4px"
            }).width, d = l.appendChild(W.createElement("div")), d.style.cssText = l.style.cssText = f, 
            d.style.marginRight = d.style.width = "0", l.style.width = "1px", b.reliableMarginRight = !parseFloat((a.getComputedStyle(d, null) || {}).marginRight)), 
            typeof l.style.zoom !== V && (l.innerHTML = "", l.style.cssText = f + "width:1px;padding:1px;display:inline;zoom:1", 
            b.inlineBlockNeedsLayout = 3 === l.offsetWidth, l.style.display = "block", l.innerHTML = "<div></div>", 
            l.firstChild.style.width = "5px", b.shrinkWrapBlocks = 3 !== l.offsetWidth, b.inlineBlockNeedsLayout && (g.style.zoom = 1)), 
            g.removeChild(c), c = l = e = d = null);
        }), c = f = g = h = d = e = null, b;
    }();
    var ya = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, za = /([A-Z])/g;
    ia.extend({
        cache: {},
        expando: "jQuery" + (aa + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? ia.cache[a[ia.expando]] : a[ia.expando], !!a && !h(a);
        },
        data: function(a, b, c) {
            return e(a, b, c);
        },
        removeData: function(a, b) {
            return f(a, b);
        },
        _data: function(a, b, c) {
            return e(a, b, c, !0);
        },
        _removeData: function(a, b) {
            return f(a, b, !0);
        },
        acceptData: function(a) {
            if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType) return !1;
            var b = a.nodeName && ia.noData[a.nodeName.toLowerCase()];
            return !b || b !== !0 && a.getAttribute("classid") === b;
        }
    }), ia.fn.extend({
        data: function(a, c) {
            var d, e, f = this[0], h = 0, i = null;
            if (a === b) {
                if (this.length && (i = ia.data(f), 1 === f.nodeType && !ia._data(f, "parsedAttrs"))) {
                    for (d = f.attributes; d.length > h; h++) e = d[h].name, e.indexOf("data-") || (e = ia.camelCase(e.slice(5)), 
                    g(f, e, i[e]));
                    ia._data(f, "parsedAttrs", !0);
                }
                return i;
            }
            return "object" == typeof a ? this.each(function() {
                ia.data(this, a);
            }) : ia.access(this, function(c) {
                return c === b ? f ? g(f, a, ia.data(f, a)) : null : (this.each(function() {
                    ia.data(this, a, c);
                }), b);
            }, null, c, arguments.length > 1, null, !0);
        },
        removeData: function(a) {
            return this.each(function() {
                ia.removeData(this, a);
            });
        }
    }), ia.extend({
        queue: function(a, c, d) {
            var e;
            return a ? (c = (c || "fx") + "queue", e = ia._data(a, c), d && (!e || ia.isArray(d) ? e = ia._data(a, c, ia.makeArray(d)) : e.push(d)), 
            e || []) : b;
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = ia.queue(a, b), d = c.length, e = c.shift(), f = ia._queueHooks(a, b), g = function() {
                ia.dequeue(a, b);
            };
            "inprogress" === e && (e = c.shift(), d--), f.cur = e, e && ("fx" === b && c.unshift("inprogress"), 
            delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return ia._data(a, c) || ia._data(a, c, {
                empty: ia.Callbacks("once memory").add(function() {
                    ia._removeData(a, b + "queue"), ia._removeData(a, c);
                })
            });
        }
    }), ia.fn.extend({
        queue: function(a, c) {
            var d = 2;
            return "string" != typeof a && (c = a, a = "fx", d--), d > arguments.length ? ia.queue(this[0], a) : c === b ? this : this.each(function() {
                var b = ia.queue(this, a, c);
                ia._queueHooks(this, a), "fx" === a && "inprogress" !== b[0] && ia.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                ia.dequeue(this, a);
            });
        },
        delay: function(a, b) {
            return a = ia.fx ? ia.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d);
                };
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, c) {
            var d, e = 1, f = ia.Deferred(), g = this, h = this.length, i = function() {
                --e || f.resolveWith(g, [ g ]);
            };
            for ("string" != typeof a && (c = a, a = b), a = a || "fx"; h--; ) d = ia._data(g[h], a + "queueHooks"), 
            d && d.empty && (e++, d.empty.add(i));
            return i(), f.promise(c);
        }
    });
    var Aa, Ba, Ca = /[\t\r\n]/g, Da = /\r/g, Ea = /^(?:input|select|textarea|button|object)$/i, Fa = /^(?:a|area)$/i, Ga = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, Ha = /^(?:checked|selected)$/i, Ia = ia.support.getSetAttribute, Ja = ia.support.input;
    ia.fn.extend({
        attr: function(a, b) {
            return ia.access(this, ia.attr, a, b, arguments.length > 1);
        },
        removeAttr: function(a) {
            return this.each(function() {
                ia.removeAttr(this, a);
            });
        },
        prop: function(a, b) {
            return ia.access(this, ia.prop, a, b, arguments.length > 1);
        },
        removeProp: function(a) {
            return a = ia.propFix[a] || a, this.each(function() {
                try {
                    this[a] = b, delete this[a];
                } catch (c) {}
            });
        },
        addClass: function(a) {
            var b, c, d, e, f, g = 0, h = this.length, i = "string" == typeof a && a;
            if (ia.isFunction(a)) return this.each(function(b) {
                ia(this).addClass(a.call(this, b, this.className));
            });
            if (i) for (b = (a || "").match(ka) || []; h > g; g++) if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ca, " ") : " ")) {
                for (f = 0; e = b[f++]; ) 0 > d.indexOf(" " + e + " ") && (d += e + " ");
                c.className = ia.trim(d);
            }
            return this;
        },
        removeClass: function(a) {
            var b, c, d, e, f, g = 0, h = this.length, i = 0 === arguments.length || "string" == typeof a && a;
            if (ia.isFunction(a)) return this.each(function(b) {
                ia(this).removeClass(a.call(this, b, this.className));
            });
            if (i) for (b = (a || "").match(ka) || []; h > g; g++) if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ca, " ") : "")) {
                for (f = 0; e = b[f++]; ) for (;d.indexOf(" " + e + " ") >= 0; ) d = d.replace(" " + e + " ", " ");
                c.className = a ? ia.trim(d) : "";
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a, d = "boolean" == typeof b;
            return this.each(ia.isFunction(a) ? function(c) {
                ia(this).toggleClass(a.call(this, c, this.className, b), b);
            } : function() {
                if ("string" === c) for (var e, f = 0, g = ia(this), h = b, i = a.match(ka) || []; e = i[f++]; ) h = d ? h : !g.hasClass(e), 
                g[h ? "addClass" : "removeClass"](e); else (c === V || "boolean" === c) && (this.className && ia._data(this, "__className__", this.className), 
                this.className = this.className || a === !1 ? "" : ia._data(this, "__className__") || "");
            });
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Ca, " ").indexOf(b) >= 0) return !0;
            return !1;
        },
        val: function(a) {
            var c, d, e, f = this[0];
            return arguments.length ? (e = ia.isFunction(a), this.each(function(c) {
                var f, g = ia(this);
                1 === this.nodeType && (f = e ? a.call(this, c, g.val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : ia.isArray(f) && (f = ia.map(f, function(a) {
                    return null == a ? "" : a + "";
                })), d = ia.valHooks[this.type] || ia.valHooks[this.nodeName.toLowerCase()], d && "set" in d && d.set(this, f, "value") !== b || (this.value = f));
            })) : f ? (d = ia.valHooks[f.type] || ia.valHooks[f.nodeName.toLowerCase()], d && "get" in d && (c = d.get(f, "value")) !== b ? c : (c = f.value, 
            "string" == typeof c ? c.replace(Da, "") : null == c ? "" : c)) : void 0;
        }
    }), ia.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text;
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], 
                    !(!c.selected && i !== e || (ia.support.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && ia.nodeName(c.parentNode, "optgroup"))) {
                        if (b = ia(c).val(), f) return b;
                        g.push(b);
                    }
                    return g;
                },
                set: function(a, b) {
                    var c = ia.makeArray(b);
                    return ia(a).find("option").each(function() {
                        this.selected = ia.inArray(ia(this).val(), c) >= 0;
                    }), c.length || (a.selectedIndex = -1), c;
                }
            }
        },
        attr: function(a, c, d) {
            var e, f, g, h = a.nodeType;
            return a && 3 !== h && 8 !== h && 2 !== h ? typeof a.getAttribute === V ? ia.prop(a, c, d) : (f = 1 !== h || !ia.isXMLDoc(a), 
            f && (c = c.toLowerCase(), e = ia.attrHooks[c] || (Ga.test(c) ? Ba : Aa)), d === b ? e && f && "get" in e && null !== (g = e.get(a, c)) ? g : (typeof a.getAttribute !== V && (g = a.getAttribute(c)), 
            null == g ? b : g) : null !== d ? e && f && "set" in e && (g = e.set(a, d, c)) !== b ? g : (a.setAttribute(c, d + ""), 
            d) : (ia.removeAttr(a, c), b)) : void 0;
        },
        removeAttr: function(a, b) {
            var c, d, e = 0, f = b && b.match(ka);
            if (f && 1 === a.nodeType) for (;c = f[e++]; ) d = ia.propFix[c] || c, Ga.test(c) ? !Ia && Ha.test(c) ? a[ia.camelCase("default-" + c)] = a[d] = !1 : a[d] = !1 : ia.attr(a, c, ""), 
            a.removeAttribute(Ia ? c : d);
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!ia.support.radioValue && "radio" === b && ia.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, c, d) {
            var e, f, g, h = a.nodeType;
            return a && 3 !== h && 8 !== h && 2 !== h ? (g = 1 !== h || !ia.isXMLDoc(a), g && (c = ia.propFix[c] || c, 
            f = ia.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && null !== (e = f.get(a, c)) ? e : a[c]) : void 0;
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : Ea.test(a.nodeName) || Fa.test(a.nodeName) && a.href ? 0 : b;
                }
            }
        }
    }), Ba = {
        get: function(a, c) {
            var d = ia.prop(a, c), e = "boolean" == typeof d && a.getAttribute(c), f = "boolean" == typeof d ? Ja && Ia ? null != e : Ha.test(c) ? a[ia.camelCase("default-" + c)] : !!e : a.getAttributeNode(c);
            return f && f.value !== !1 ? c.toLowerCase() : b;
        },
        set: function(a, b, c) {
            return b === !1 ? ia.removeAttr(a, c) : Ja && Ia || !Ha.test(c) ? a.setAttribute(!Ia && ia.propFix[c] || c, c) : a[ia.camelCase("default-" + c)] = a[c] = !0, 
            c;
        }
    }, Ja && Ia || (ia.attrHooks.value = {
        get: function(a, c) {
            var d = a.getAttributeNode(c);
            return ia.nodeName(a, "input") ? a.defaultValue : d && d.specified ? d.value : b;
        },
        set: function(a, c, d) {
            return ia.nodeName(a, "input") ? (a.defaultValue = c, b) : Aa && Aa.set(a, c, d);
        }
    }), Ia || (Aa = ia.valHooks.button = {
        get: function(a, c) {
            var d = a.getAttributeNode(c);
            return d && ("id" === c || "name" === c || "coords" === c ? "" !== d.value : d.specified) ? d.value : b;
        },
        set: function(a, c, d) {
            var e = a.getAttributeNode(d);
            return e || a.setAttributeNode(e = a.ownerDocument.createAttribute(d)), e.value = c += "", 
            "value" === d || c === a.getAttribute(d) ? c : b;
        }
    }, ia.attrHooks.contenteditable = {
        get: Aa.get,
        set: function(a, b, c) {
            Aa.set(a, "" === b ? !1 : b, c);
        }
    }, ia.each([ "width", "height" ], function(a, c) {
        ia.attrHooks[c] = ia.extend(ia.attrHooks[c], {
            set: function(a, d) {
                return "" === d ? (a.setAttribute(c, "auto"), d) : b;
            }
        });
    })), ia.support.hrefNormalized || (ia.each([ "href", "src", "width", "height" ], function(a, c) {
        ia.attrHooks[c] = ia.extend(ia.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return null == d ? b : d;
            }
        });
    }), ia.each([ "href", "src" ], function(a, b) {
        ia.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4);
            }
        };
    })), ia.support.style || (ia.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || b;
        },
        set: function(a, b) {
            return a.style.cssText = b + "";
        }
    }), ia.support.optSelected || (ia.propHooks.selected = ia.extend(ia.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
        }
    })), ia.support.enctype || (ia.propFix.enctype = "encoding"), ia.support.checkOn || ia.each([ "radio", "checkbox" ], function() {
        ia.valHooks[this] = {
            get: function(a) {
                return null === a.getAttribute("value") ? "on" : a.value;
            }
        };
    }), ia.each([ "radio", "checkbox" ], function() {
        ia.valHooks[this] = ia.extend(ia.valHooks[this], {
            set: function(a, c) {
                return ia.isArray(c) ? a.checked = ia.inArray(ia(a).val(), c) >= 0 : b;
            }
        });
    });
    var Ka = /^(?:input|select|textarea)$/i, La = /^key/, Ma = /^(?:mouse|contextmenu)|click/, Na = /^(?:focusinfocus|focusoutblur)$/, Oa = /^([^.]*)(?:\.(.+)|)$/;
    ia.event = {
        global: {},
        add: function(a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, p, q, r = ia._data(a);
            if (r) {
                for (d.handler && (j = d, d = j.handler, f = j.selector), d.guid || (d.guid = ia.guid++), 
                (h = r.events) || (h = r.events = {}), (l = r.handle) || (l = r.handle = function(a) {
                    return typeof ia === V || a && ia.event.triggered === a.type ? b : ia.event.dispatch.apply(l.elem, arguments);
                }, l.elem = a), c = (c || "").match(ka) || [ "" ], i = c.length; i--; ) g = Oa.exec(c[i]) || [], 
                o = q = g[1], p = (g[2] || "").split(".").sort(), k = ia.event.special[o] || {}, 
                o = (f ? k.delegateType : k.bindType) || o, k = ia.event.special[o] || {}, m = ia.extend({
                    type: o,
                    origType: q,
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: f,
                    needsContext: f && ia.expr.match.needsContext.test(f),
                    namespace: p.join(".")
                }, j), (n = h[o]) || (n = h[o] = [], n.delegateCount = 0, k.setup && k.setup.call(a, e, p, l) !== !1 || (a.addEventListener ? a.addEventListener(o, l, !1) : a.attachEvent && a.attachEvent("on" + o, l))), 
                k.add && (k.add.call(a, m), m.handler.guid || (m.handler.guid = d.guid)), f ? n.splice(n.delegateCount++, 0, m) : n.push(m), 
                ia.event.global[o] = !0;
                a = null;
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ia.hasData(a) && ia._data(a);
            if (q && (k = q.events)) {
                for (b = (b || "").match(ka) || [ "" ], j = b.length; j--; ) if (h = Oa.exec(b[j]) || [], 
                n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                    for (l = ia.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, 
                    m = k[n] || [], h = h[2] && RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    i = f = m.length; f--; ) g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), 
                    g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                    i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || ia.removeEvent(a, n, q.handle), 
                    delete k[n]);
                } else for (n in k) ia.event.remove(a, n + b[j], c, d, !0);
                ia.isEmptyObject(k) && (delete q.handle, ia._removeData(a, "events"));
            }
        },
        trigger: function(c, d, e, f) {
            var g, h, i, j, k, l, m, n = [ e || W ], o = ga.call(c, "type") ? c.type : c, p = ga.call(c, "namespace") ? c.namespace.split(".") : [];
            if (i = l = e = e || W, 3 !== e.nodeType && 8 !== e.nodeType && !Na.test(o + ia.event.triggered) && (o.indexOf(".") >= 0 && (p = o.split("."), 
            o = p.shift(), p.sort()), h = 0 > o.indexOf(":") && "on" + o, c = c[ia.expando] ? c : new ia.Event(o, "object" == typeof c && c), 
            c.isTrigger = !0, c.namespace = p.join("."), c.namespace_re = c.namespace ? RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            c.result = b, c.target || (c.target = e), d = null == d ? [ c ] : ia.makeArray(d, [ c ]), 
            k = ia.event.special[o] || {}, f || !k.trigger || k.trigger.apply(e, d) !== !1)) {
                if (!f && !k.noBubble && !ia.isWindow(e)) {
                    for (j = k.delegateType || o, Na.test(j + o) || (i = i.parentNode); i; i = i.parentNode) n.push(i), 
                    l = i;
                    l === (e.ownerDocument || W) && n.push(l.defaultView || l.parentWindow || a);
                }
                for (m = 0; (i = n[m++]) && !c.isPropagationStopped(); ) c.type = m > 1 ? j : k.bindType || o, 
                g = (ia._data(i, "events") || {})[c.type] && ia._data(i, "handle"), g && g.apply(i, d), 
                g = h && i[h], g && ia.acceptData(i) && g.apply && g.apply(i, d) === !1 && c.preventDefault();
                if (c.type = o, !(f || c.isDefaultPrevented() || k._default && k._default.apply(e.ownerDocument, d) !== !1 || "click" === o && ia.nodeName(e, "a") || !ia.acceptData(e) || !h || !e[o] || ia.isWindow(e))) {
                    l = e[h], l && (e[h] = null), ia.event.triggered = o;
                    try {
                        e[o]();
                    } catch (q) {}
                    ia.event.triggered = b, l && (e[h] = l);
                }
                return c.result;
            }
        },
        dispatch: function(a) {
            a = ia.event.fix(a);
            var c, d, e, f, g, h = [], i = da.call(arguments), j = (ia._data(this, "events") || {})[a.type] || [], k = ia.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                for (h = ia.event.handlers.call(this, a, j), c = 0; (f = h[c++]) && !a.isPropagationStopped(); ) for (a.currentTarget = f.elem, 
                g = 0; (e = f.handlers[g++]) && !a.isImmediatePropagationStopped(); ) (!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, 
                a.data = e.data, d = ((ia.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), 
                d !== b && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                return k.postDispatch && k.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function(a, c) {
            var d, e, f, g, h = [], i = c.delegateCount, j = a.target;
            if (i && j.nodeType && (!a.button || "click" !== a.type)) for (;j != this; j = j.parentNode || this) if (1 === j.nodeType && (j.disabled !== !0 || "click" !== a.type)) {
                for (f = [], g = 0; i > g; g++) e = c[g], d = e.selector + " ", f[d] === b && (f[d] = e.needsContext ? ia(d, this).index(j) >= 0 : ia.find(d, this, null, [ j ]).length), 
                f[d] && f.push(e);
                f.length && h.push({
                    elem: j,
                    handlers: f
                });
            }
            return c.length > i && h.push({
                elem: this,
                handlers: c.slice(i)
            }), h;
        },
        fix: function(a) {
            if (a[ia.expando]) return a;
            var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Ma.test(e) ? this.mouseHooks : La.test(e) ? this.keyHooks : {}), 
            d = g.props ? this.props.concat(g.props) : this.props, a = new ia.Event(f), b = d.length; b--; ) c = d[b], 
            a[c] = f[c];
            return a.target || (a.target = f.srcElement || W), 3 === a.target.nodeType && (a.target = a.target.parentNode), 
            a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), 
                a;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, c) {
                var d, e, f, g = c.button, h = c.fromElement;
                return null == a.pageX && null != c.clientX && (e = a.target.ownerDocument || W, 
                f = e.documentElement, d = e.body, a.pageX = c.clientX + (f && f.scrollLeft || d && d.scrollLeft || 0) - (f && f.clientLeft || d && d.clientLeft || 0), 
                a.pageY = c.clientY + (f && f.scrollTop || d && d.scrollTop || 0) - (f && f.clientTop || d && d.clientTop || 0)), 
                !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), a.which || g === b || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), 
                a;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                trigger: function() {
                    return ia.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : b;
                }
            },
            focus: {
                trigger: function() {
                    if (this !== W.activeElement && this.focus) try {
                        return this.focus(), !1;
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === W.activeElement && this.blur ? (this.blur(), !1) : b;
                },
                delegateType: "focusout"
            },
            beforeunload: {
                postDispatch: function(a) {
                    a.result !== b && (a.originalEvent.returnValue = a.result);
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = ia.extend(new ia.Event(), c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? ia.event.trigger(e, null, b) : ia.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        }
    }, ia.removeEvent = W.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === V && (a[d] = null), a.detachEvent(d, c));
    }, ia.Event = function(a, c) {
        return this instanceof ia.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, 
        this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? i : j) : this.type = a, 
        c && ia.extend(this, c), this.timeStamp = a && a.timeStamp || ia.now(), this[ia.expando] = !0, 
        b) : new ia.Event(a, c);
    }, ia.Event.prototype = {
        isDefaultPrevented: j,
        isPropagationStopped: j,
        isImmediatePropagationStopped: j,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = i, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = i, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = i, this.stopPropagation();
        }
    }, ia.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        ia.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !ia.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), 
                a.type = b), c;
            }
        };
    }), ia.support.submitBubbles || (ia.event.special.submit = {
        setup: function() {
            return ia.nodeName(this, "form") ? !1 : (ia.event.add(this, "click._submit keypress._submit", function(a) {
                var c = a.target, d = ia.nodeName(c, "input") || ia.nodeName(c, "button") ? c.form : b;
                d && !ia._data(d, "submitBubbles") && (ia.event.add(d, "submit._submit", function(a) {
                    a._submit_bubble = !0;
                }), ia._data(d, "submitBubbles", !0));
            }), b);
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && ia.event.simulate("submit", this.parentNode, a, !0));
        },
        teardown: function() {
            return ia.nodeName(this, "form") ? !1 : (ia.event.remove(this, "._submit"), b);
        }
    }), ia.support.changeBubbles || (ia.event.special.change = {
        setup: function() {
            return Ka.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ia.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0);
            }), ia.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1), ia.event.simulate("change", this, a, !0);
            })), !1) : (ia.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                Ka.test(b.nodeName) && !ia._data(b, "changeBubbles") && (ia.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || ia.event.simulate("change", this.parentNode, a, !0);
                }), ia._data(b, "changeBubbles", !0));
            }), b);
        },
        handle: function(a) {
            var c = a.target;
            return this !== c || a.isSimulated || a.isTrigger || "radio" !== c.type && "checkbox" !== c.type ? a.handleObj.handler.apply(this, arguments) : b;
        },
        teardown: function() {
            return ia.event.remove(this, "._change"), !Ka.test(this.nodeName);
        }
    }), ia.support.focusinBubbles || ia.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = 0, d = function(a) {
            ia.event.simulate(b, a.target, ia.event.fix(a), !0);
        };
        ia.event.special[b] = {
            setup: function() {
                0 === c++ && W.addEventListener(a, d, !0);
            },
            teardown: function() {
                0 === --c && W.removeEventListener(a, d, !0);
            }
        };
    }), ia.fn.extend({
        on: function(a, c, d, e, f) {
            var g, h;
            if ("object" == typeof a) {
                "string" != typeof c && (d = d || c, c = b);
                for (g in a) this.on(g, c, d, a[g], f);
                return this;
            }
            if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, 
            d = b) : (e = d, d = c, c = b)), e === !1) e = j; else if (!e) return this;
            return 1 === f && (h = e, e = function(a) {
                return ia().off(a), h.apply(this, arguments);
            }, e.guid = h.guid || (h.guid = ia.guid++)), this.each(function() {
                ia.event.add(this, a, e, d, c);
            });
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1);
        },
        off: function(a, c, d) {
            var e, f;
            if (a && a.preventDefault && a.handleObj) return e = a.handleObj, ia(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), 
            this;
            if ("object" == typeof a) {
                for (f in a) this.off(f, c, a[f]);
                return this;
            }
            return (c === !1 || "function" == typeof c) && (d = c, c = b), d === !1 && (d = j), 
            this.each(function() {
                ia.event.remove(this, a, d, c);
            });
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function(a, b) {
            return this.off(a, null, b);
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
        },
        trigger: function(a, b) {
            return this.each(function() {
                ia.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, c) {
            var d = this[0];
            return d ? ia.event.trigger(a, c, d, !0) : b;
        }
    }), function(a, b) {
        function c(a) {
            return oa.test(a + "");
        }
        function d() {
            var a, b = [];
            return a = function(c, d) {
                return b.push(c += " ") > y.cacheLength && delete a[b.shift()], a[c] = d;
            };
        }
        function e(a) {
            return a[N] = !0, a;
        }
        function f(a) {
            var b = F.createElement("div");
            try {
                return a(b);
            } catch (c) {
                return !1;
            } finally {
                b = null;
            }
        }
        function g(a, b, c, d) {
            var e, f, g, h, i, j, k, n, o, p;
            if ((b ? b.ownerDocument || b : O) !== F && E(b), b = b || F, c = c || [], !a || "string" != typeof a) return c;
            if (1 !== (h = b.nodeType) && 9 !== h) return [];
            if (!H && !d) {
                if (e = pa.exec(a)) if (g = e[1]) {
                    if (9 === h) {
                        if (f = b.getElementById(g), !f || !f.parentNode) return c;
                        if (f.id === g) return c.push(f), c;
                    } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && L(b, f) && f.id === g) return c.push(f), 
                    c;
                } else {
                    if (e[2]) return Z.apply(c, $.call(b.getElementsByTagName(a), 0)), c;
                    if ((g = e[3]) && P.getByClassName && b.getElementsByClassName) return Z.apply(c, $.call(b.getElementsByClassName(g), 0)), 
                    c;
                }
                if (P.qsa && !I.test(a)) {
                    if (k = !0, n = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = l(a), (k = b.getAttribute("id")) ? n = k.replace(sa, "\\$&") : b.setAttribute("id", n), 
                        n = "[id='" + n + "'] ", i = j.length; i--; ) j[i] = n + m(j[i]);
                        o = na.test(a) && b.parentNode || b, p = j.join(",");
                    }
                    if (p) try {
                        return Z.apply(c, $.call(o.querySelectorAll(p), 0)), c;
                    } catch (q) {} finally {
                        k || b.removeAttribute("id");
                    }
                }
            }
            return u(a.replace(ga, "$1"), b, c, d);
        }
        function h(a, b) {
            var c = b && a, d = c && (~b.sourceIndex || W) - (~a.sourceIndex || W);
            if (d) return d;
            if (c) for (;c = c.nextSibling; ) if (c === b) return -1;
            return a ? 1 : -1;
        }
        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a;
            };
        }
        function j(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a;
            };
        }
        function k(a) {
            return e(function(b) {
                return b = +b, e(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--; ) c[e = f[g]] && (c[e] = !(d[e] = c[e]));
                });
            });
        }
        function l(a, b) {
            var c, d, e, f, h, i, j, k = T[a + " "];
            if (k) return b ? 0 : k.slice(0);
            for (h = a, i = [], j = y.preFilter; h; ) {
                (!c || (d = ha.exec(h))) && (d && (h = h.slice(d[0].length) || h), i.push(e = [])), 
                c = !1, (d = ja.exec(h)) && (c = d.shift(), e.push({
                    value: c,
                    type: d[0].replace(ga, " ")
                }), h = h.slice(c.length));
                for (f in y.filter) !(d = ma[f].exec(h)) || j[f] && !(d = j[f](d)) || (c = d.shift(), 
                e.push({
                    value: c,
                    type: f,
                    matches: d
                }), h = h.slice(c.length));
                if (!c) break;
            }
            return b ? h.length : h ? g.error(a) : T(a, i).slice(0);
        }
        function m(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d;
        }
        function n(a, b, c) {
            var d = b.dir, e = c && "parentNode" === d, f = R++;
            return b.first ? function(b, c, f) {
                for (;b = b[d]; ) if (1 === b.nodeType || e) return a(b, c, f);
            } : function(b, c, g) {
                var h, i, j, k = Q + " " + f;
                if (g) {
                    for (;b = b[d]; ) if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
                } else for (;b = b[d]; ) if (1 === b.nodeType || e) if (j = b[N] || (b[N] = {}), 
                (i = j[d]) && i[0] === k) {
                    if ((h = i[1]) === !0 || h === x) return h === !0;
                } else if (i = j[d] = [ k ], i[1] = a(b, c, g) || x, i[1] === !0) return !0;
            };
        }
        function o(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--; ) if (!a[e](b, c, d)) return !1;
                return !0;
            } : a[0];
        }
        function p(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), 
            j && b.push(h));
            return g;
        }
        function q(a, b, c, d, f, g) {
            return d && !d[N] && (d = q(d)), f && !f[N] && (f = q(f, g)), e(function(e, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, q = e || t(b || "*", h.nodeType ? [ h ] : h, []), r = !a || !e && b ? q : p(q, m, a, h, i), s = c ? f || (e ? a : o || d) ? [] : g : r;
                if (c && c(r, s, h, i), d) for (j = p(s, n), d(j, [], h, i), k = j.length; k--; ) (l = j[k]) && (s[n[k]] = !(r[n[k]] = l));
                if (e) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = s.length; k--; ) (l = s[k]) && j.push(r[k] = l);
                            f(null, s = [], j, i);
                        }
                        for (k = s.length; k--; ) (l = s[k]) && (j = f ? _.call(e, l) : m[k]) > -1 && (e[j] = !(g[j] = l));
                    }
                } else s = p(s === g ? s.splice(o, s.length) : s), f ? f(null, g, s, i) : Z.apply(g, s);
            });
        }
        function r(a) {
            for (var b, c, d, e = a.length, f = y.relative[a[0].type], g = f || y.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                return a === b;
            }, g, !0), j = n(function(a) {
                return _.call(b, a) > -1;
            }, g, !0), k = [ function(a, c, d) {
                return !f && (d || c !== D) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
            } ]; e > h; h++) if (c = y.relative[a[h].type]) k = [ n(o(k), c) ]; else {
                if (c = y.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                    for (d = ++h; e > d && !y.relative[a[d].type]; d++) ;
                    return q(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1)).replace(ga, "$1"), c, d > h && r(a.slice(h, d)), e > d && r(a = a.slice(d)), e > d && m(a));
                }
                k.push(c);
            }
            return o(k);
        }
        function s(a, b) {
            var c = 0, d = b.length > 0, f = a.length > 0, h = function(e, h, i, j, k) {
                var l, m, n, o = [], q = 0, r = "0", s = e && [], t = null != k, u = D, v = e || f && y.find.TAG("*", k && h.parentNode || h), w = Q += null == u ? 1 : Math.random() || .1;
                for (t && (D = h !== F && h, x = c); null != (l = v[r]); r++) {
                    if (f && l) {
                        for (m = 0; n = a[m++]; ) if (n(l, h, i)) {
                            j.push(l);
                            break;
                        }
                        t && (Q = w, x = ++c);
                    }
                    d && ((l = !n && l) && q--, e && s.push(l));
                }
                if (q += r, d && r !== q) {
                    for (m = 0; n = b[m++]; ) n(s, o, h, i);
                    if (e) {
                        if (q > 0) for (;r--; ) s[r] || o[r] || (o[r] = Y.call(j));
                        o = p(o);
                    }
                    Z.apply(j, o), t && !e && o.length > 0 && q + b.length > 1 && g.uniqueSort(j);
                }
                return t && (Q = w, D = u), s;
            };
            return d ? e(h) : h;
        }
        function t(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) g(a, b[d], c);
            return c;
        }
        function u(a, b, c, d) {
            var e, f, g, h, i, j = l(a);
            if (!d && 1 === j.length) {
                if (f = j[0] = j[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && 9 === b.nodeType && !H && y.relative[f[1].type]) {
                    if (b = y.find.ID(g.matches[0].replace(ua, va), b)[0], !b) return c;
                    a = a.slice(f.shift().value.length);
                }
                for (e = ma.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !y.relative[h = g.type]); ) if ((i = y.find[h]) && (d = i(g.matches[0].replace(ua, va), na.test(f[0].type) && b.parentNode || b))) {
                    if (f.splice(e, 1), a = d.length && m(f), !a) return Z.apply(c, $.call(d, 0)), c;
                    break;
                }
            }
            return B(a, j)(d, b, H, c, na.test(a)), c;
        }
        function v() {}
        var w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date(), O = a.document, P = {}, Q = 0, R = 0, S = d(), T = d(), U = d(), V = typeof b, W = 1 << 31, X = [], Y = X.pop, Z = X.push, $ = X.slice, _ = X.indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++) if (this[b] === a) return b;
            return -1;
        }, aa = "[\\x20\\t\\r\\n\\f]", ba = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ca = ba.replace("w", "w#"), da = "([*^$|!~]?=)", ea = "\\[" + aa + "*(" + ba + ")" + aa + "*(?:" + da + aa + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ca + ")|)|)" + aa + "*\\]", fa = ":(" + ba + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ea.replace(3, 8) + ")*)|.*)\\)|)", ga = RegExp("^" + aa + "+|((?:^|[^\\\\])(?:\\\\.)*)" + aa + "+$", "g"), ha = RegExp("^" + aa + "*," + aa + "*"), ja = RegExp("^" + aa + "*([\\x20\\t\\r\\n\\f>+~])" + aa + "*"), ka = RegExp(fa), la = RegExp("^" + ca + "$"), ma = {
            ID: RegExp("^#(" + ba + ")"),
            CLASS: RegExp("^\\.(" + ba + ")"),
            NAME: RegExp("^\\[name=['\"]?(" + ba + ")['\"]?\\]"),
            TAG: RegExp("^(" + ba.replace("w", "w*") + ")"),
            ATTR: RegExp("^" + ea),
            PSEUDO: RegExp("^" + fa),
            CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + aa + "*(even|odd|(([+-]|)(\\d*)n|)" + aa + "*(?:([+-]|)" + aa + "*(\\d+)|))" + aa + "*\\)|)", "i"),
            needsContext: RegExp("^" + aa + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + aa + "*((?:-\\d)?\\d*)" + aa + "*\\)|)(?=[^-]|$)", "i")
        }, na = /[\x20\t\r\n\f]*[+~]/, oa = /^[^{]+\{\s*\[native code/, pa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, qa = /^(?:input|select|textarea|button)$/i, ra = /^h\d$/i, sa = /'|\\/g, ta = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, ua = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, va = function(a, b) {
            var c = "0x" + b - 65536;
            return c !== c ? b : 0 > c ? String.fromCharCode(c + 65536) : String.fromCharCode(55296 | c >> 10, 56320 | 1023 & c);
        };
        try {
            $.call(O.documentElement.childNodes, 0)[0].nodeType;
        } catch (wa) {
            $ = function(a) {
                for (var b, c = []; b = this[a++]; ) c.push(b);
                return c;
            };
        }
        A = g.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1;
        }, E = g.setDocument = function(a) {
            var d = a ? a.ownerDocument || a : O;
            return d !== F && 9 === d.nodeType && d.documentElement ? (F = d, G = d.documentElement, 
            H = A(d), P.tagNameNoComments = f(function(a) {
                return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length;
            }), P.attributes = f(function(a) {
                a.innerHTML = "<select></select>";
                var b = typeof a.lastChild.getAttribute("multiple");
                return "boolean" !== b && "string" !== b;
            }), P.getByClassName = f(function(a) {
                return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", a.getElementsByClassName && a.getElementsByClassName("e").length ? (a.lastChild.className = "e", 
                2 === a.getElementsByClassName("e").length) : !1;
            }), P.getByName = f(function(a) {
                a.id = N + 0, a.innerHTML = "<a name='" + N + "'></a><div name='" + N + "'></div>", 
                G.insertBefore(a, G.firstChild);
                var b = d.getElementsByName && d.getElementsByName(N).length === 2 + d.getElementsByName(N + 0).length;
                return P.getIdNotName = !d.getElementById(N), G.removeChild(a), b;
            }), y.attrHandle = f(function(a) {
                return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== V && "#" === a.firstChild.getAttribute("href");
            }) ? {} : {
                href: function(a) {
                    return a.getAttribute("href", 2);
                },
                type: function(a) {
                    return a.getAttribute("type");
                }
            }, P.getIdNotName ? (y.find.ID = function(a, b) {
                if (typeof b.getElementById !== V && !H) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [ c ] : [];
                }
            }, y.filter.ID = function(a) {
                var b = a.replace(ua, va);
                return function(a) {
                    return a.getAttribute("id") === b;
                };
            }) : (y.find.ID = function(a, c) {
                if (typeof c.getElementById !== V && !H) {
                    var d = c.getElementById(a);
                    return d ? d.id === a || typeof d.getAttributeNode !== V && d.getAttributeNode("id").value === a ? [ d ] : b : [];
                }
            }, y.filter.ID = function(a) {
                var b = a.replace(ua, va);
                return function(a) {
                    var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
                    return c && c.value === b;
                };
            }), y.find.TAG = P.tagNameNoComments ? function(a, c) {
                return typeof c.getElementsByTagName !== V ? c.getElementsByTagName(a) : b;
            } : function(a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (;c = f[e++]; ) 1 === c.nodeType && d.push(c);
                    return d;
                }
                return f;
            }, y.find.NAME = P.getByName && function(a, c) {
                return typeof c.getElementsByName !== V ? c.getElementsByName(name) : b;
            }, y.find.CLASS = P.getByClassName && function(a, c) {
                return typeof c.getElementsByClassName === V || H ? b : c.getElementsByClassName(a);
            }, J = [], I = [ ":focus" ], (P.qsa = c(d.querySelectorAll)) && (f(function(a) {
                a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll("[selected]").length || I.push("\\[" + aa + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), 
                a.querySelectorAll(":checked").length || I.push(":checked");
            }), f(function(a) {
                a.innerHTML = "<input type='hidden' i=''/>", a.querySelectorAll("[i^='']").length && I.push("[*^$]=" + aa + "*(?:\"\"|'')"), 
                a.querySelectorAll(":enabled").length || I.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), 
                I.push(",.*:");
            })), (P.matchesSelector = c(K = G.matchesSelector || G.mozMatchesSelector || G.webkitMatchesSelector || G.oMatchesSelector || G.msMatchesSelector)) && f(function(a) {
                P.disconnectedMatch = K.call(a, "div"), K.call(a, "[s!='']:x"), J.push("!=", fa);
            }), I = RegExp(I.join("|")), J = RegExp(J.join("|")), L = c(G.contains) || G.compareDocumentPosition ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, M = G.compareDocumentPosition ? function(a, b) {
                var c;
                return a === b ? (C = !0, 0) : (c = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b)) ? 1 & c || a.parentNode && 11 === a.parentNode.nodeType ? a === d || L(O, a) ? -1 : b === d || L(O, b) ? 1 : 0 : 4 & c ? -1 : 1 : a.compareDocumentPosition ? -1 : 1;
            } : function(a, b) {
                var c, e = 0, f = a.parentNode, g = b.parentNode, i = [ a ], j = [ b ];
                if (a === b) return C = !0, 0;
                if (!f || !g) return a === d ? -1 : b === d ? 1 : f ? -1 : g ? 1 : 0;
                if (f === g) return h(a, b);
                for (c = a; c = c.parentNode; ) i.unshift(c);
                for (c = b; c = c.parentNode; ) j.unshift(c);
                for (;i[e] === j[e]; ) e++;
                return e ? h(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0;
            }, C = !1, [ 0, 0 ].sort(M), P.detectDuplicates = C, F) : F;
        }, g.matches = function(a, b) {
            return g(a, null, null, b);
        }, g.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== F && E(a), b = b.replace(ta, "='$1']"), !(!P.matchesSelector || H || J && J.test(b) || I.test(b))) try {
                var c = K.call(a, b);
                if (c || P.disconnectedMatch || a.document && 11 !== a.document.nodeType) return c;
            } catch (d) {}
            return g(b, F, null, [ a ]).length > 0;
        }, g.contains = function(a, b) {
            return (a.ownerDocument || a) !== F && E(a), L(a, b);
        }, g.attr = function(a, b) {
            var c;
            return (a.ownerDocument || a) !== F && E(a), H || (b = b.toLowerCase()), (c = y.attrHandle[b]) ? c(a) : H || P.attributes ? a.getAttribute(b) : ((c = a.getAttributeNode(b)) || a.getAttribute(b)) && a[b] === !0 ? b : c && c.specified ? c.value : null;
        }, g.error = function(a) {
            throw Error("Syntax error, unrecognized expression: " + a);
        }, g.uniqueSort = function(a) {
            var b, c = [], d = 1, e = 0;
            if (C = !P.detectDuplicates, a.sort(M), C) {
                for (;b = a[d]; d++) b === a[d - 1] && (e = c.push(d));
                for (;e--; ) a.splice(c[e], 1);
            }
            return a;
        }, z = g.getText = function(a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += z(a);
                } else if (3 === e || 4 === e) return a.nodeValue;
            } else for (;b = a[d]; d++) c += z(b);
            return c;
        }, y = g.selectors = {
            cacheLength: 50,
            createPseudo: e,
            match: ma,
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ua, va), a[3] = (a[4] || a[5] || "").replace(ua, va), 
                    "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || g.error(a[0]), 
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && g.error(a[0]), 
                    a;
                },
                PSEUDO: function(a) {
                    var b, c = !a[5] && a[2];
                    return ma.CHILD.test(a[0]) ? null : (a[4] ? a[2] = a[4] : c && ka.test(c) && (b = l(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), 
                    a[2] = c.slice(0, b)), a.slice(0, 3));
                }
            },
            filter: {
                TAG: function(a) {
                    return "*" === a ? function() {
                        return !0;
                    } : (a = a.replace(ua, va).toLowerCase(), function(b) {
                        return b.nodeName && b.nodeName.toLowerCase() === a;
                    });
                },
                CLASS: function(a) {
                    var b = S[a + " "];
                    return b || (b = RegExp("(^|" + aa + ")" + a + "(" + aa + "|$)")) && S(a, function(a) {
                        return b.test(a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "");
                    });
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = g.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0;
                    };
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode;
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                        if (q) {
                            if (f) {
                                for (;p; ) {
                                    for (l = b; l = l[p]; ) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling";
                                }
                                return !0;
                            }
                            if (o = [ g ? q.firstChild : q.lastChild ], g && s) {
                                for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === Q && j[1], m = j[0] === Q && j[2], 
                                l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop(); ) if (1 === l.nodeType && ++m && l === b) {
                                    k[a] = [ Q, n, m ];
                                    break;
                                }
                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === Q) m = j[1]; else for (;(l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [ Q, m ]), 
                            l !== b)); ) ;
                            return m -= e, m === d || 0 === m % d && m / d >= 0;
                        }
                    };
                },
                PSEUDO: function(a, b) {
                    var c, d = y.pseudos[a] || y.setFilters[a.toLowerCase()] || g.error("unsupported pseudo: " + a);
                    return d[N] ? d(b) : d.length > 1 ? (c = [ a, a, "", b ], y.setFilters.hasOwnProperty(a.toLowerCase()) ? e(function(a, c) {
                        for (var e, f = d(a, b), g = f.length; g--; ) e = _.call(a, f[g]), a[e] = !(c[e] = f[g]);
                    }) : function(a) {
                        return d(a, 0, c);
                    }) : d;
                }
            },
            pseudos: {
                not: e(function(a) {
                    var b = [], c = [], d = B(a.replace(ga, "$1"));
                    return d[N] ? e(function(a, b, c, e) {
                        for (var f, g = d(a, null, e, []), h = a.length; h--; ) (f = g[h]) && (a[h] = !(b[h] = f));
                    }) : function(a, e, f) {
                        return b[0] = a, d(b, null, f, c), !c.pop();
                    };
                }),
                has: e(function(a) {
                    return function(b) {
                        return g(a, b).length > 0;
                    };
                }),
                contains: e(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || z(b)).indexOf(a) > -1;
                    };
                }),
                lang: e(function(a) {
                    return la.test(a || "") || g.error("unsupported lang: " + a), a = a.replace(ua, va).toLowerCase(), 
                    function(b) {
                        var c;
                        do if (c = H ? b.getAttribute("xml:lang") || b.getAttribute("lang") : b.lang) return c = c.toLowerCase(), 
                        c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1;
                    };
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id;
                },
                root: function(a) {
                    return a === G;
                },
                focus: function(a) {
                    return a === F.activeElement && (!F.hasFocus || F.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
                },
                enabled: function(a) {
                    return a.disabled === !1;
                },
                disabled: function(a) {
                    return a.disabled === !0;
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected;
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeName > "@" || 3 === a.nodeType || 4 === a.nodeType) return !1;
                    return !0;
                },
                parent: function(a) {
                    return !y.pseudos.empty(a);
                },
                header: function(a) {
                    return ra.test(a.nodeName);
                },
                input: function(a) {
                    return qa.test(a.nodeName);
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b;
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || b.toLowerCase() === a.type);
                },
                first: k(function() {
                    return [ 0 ];
                }),
                last: k(function(a, b) {
                    return [ b - 1 ];
                }),
                eq: k(function(a, b, c) {
                    return [ 0 > c ? c + b : c ];
                }),
                even: k(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a;
                }),
                odd: k(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a;
                }),
                lt: k(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
                    return a;
                }),
                gt: k(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; b > ++d; ) a.push(d);
                    return a;
                })
            }
        };
        for (w in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) y.pseudos[w] = i(w);
        for (w in {
            submit: !0,
            reset: !0
        }) y.pseudos[w] = j(w);
        B = g.compile = function(a, b) {
            var c, d = [], e = [], f = U[a + " "];
            if (!f) {
                for (b || (b = l(a)), c = b.length; c--; ) f = r(b[c]), f[N] ? d.push(f) : e.push(f);
                f = U(a, s(e, d));
            }
            return f;
        }, y.pseudos.nth = y.pseudos.eq, y.filters = v.prototype = y.pseudos, y.setFilters = new v(), 
        E(), g.attr = ia.attr, ia.find = g, ia.expr = g.selectors, ia.expr[":"] = ia.expr.pseudos, 
        ia.unique = g.uniqueSort, ia.text = g.getText, ia.isXMLDoc = g.isXML, ia.contains = g.contains;
    }(a);
    var Pa = /Until$/, Qa = /^(?:parents|prev(?:Until|All))/, Ra = /^.[^:#\[\.,]*$/, Sa = ia.expr.match.needsContext, Ta = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    ia.fn.extend({
        find: function(a) {
            var b, c, d, e = this.length;
            if ("string" != typeof a) return d = this, this.pushStack(ia(a).filter(function() {
                for (b = 0; e > b; b++) if (ia.contains(d[b], this)) return !0;
            }));
            for (c = [], b = 0; e > b; b++) ia.find(a, this[b], c);
            return c = this.pushStack(e > 1 ? ia.unique(c) : c), c.selector = (this.selector ? this.selector + " " : "") + a, 
            c;
        },
        has: function(a) {
            var b, c = ia(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++) if (ia.contains(this, c[b])) return !0;
            });
        },
        not: function(a) {
            return this.pushStack(l(this, a, !1));
        },
        filter: function(a) {
            return this.pushStack(l(this, a, !0));
        },
        is: function(a) {
            return !!a && ("string" == typeof a ? Sa.test(a) ? ia(a, this.context).index(this[0]) >= 0 : ia.filter(a, this).length > 0 : this.filter(a).length > 0);
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = Sa.test(a) || "string" != typeof a ? ia(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c.ownerDocument && c !== b && 11 !== c.nodeType; ) {
                if (g ? g.index(c) > -1 : ia.find.matchesSelector(c, a)) {
                    f.push(c);
                    break;
                }
                c = c.parentNode;
            }
            return this.pushStack(f.length > 1 ? ia.unique(f) : f);
        },
        index: function(a) {
            return a ? "string" == typeof a ? ia.inArray(this[0], ia(a)) : ia.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(a, b) {
            var c = "string" == typeof a ? ia(a, b) : ia.makeArray(a && a.nodeType ? [ a ] : a), d = ia.merge(this.get(), c);
            return this.pushStack(ia.unique(d));
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
        }
    }), ia.fn.andSelf = ia.fn.addBack, ia.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null;
        },
        parents: function(a) {
            return ia.dir(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return ia.dir(a, "parentNode", c);
        },
        next: function(a) {
            return k(a, "nextSibling");
        },
        prev: function(a) {
            return k(a, "previousSibling");
        },
        nextAll: function(a) {
            return ia.dir(a, "nextSibling");
        },
        prevAll: function(a) {
            return ia.dir(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return ia.dir(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return ia.dir(a, "previousSibling", c);
        },
        siblings: function(a) {
            return ia.sibling((a.parentNode || {}).firstChild, a);
        },
        children: function(a) {
            return ia.sibling(a.firstChild);
        },
        contents: function(a) {
            return ia.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : ia.merge([], a.childNodes);
        }
    }, function(a, b) {
        ia.fn[a] = function(c, d) {
            var e = ia.map(this, b, c);
            return Pa.test(a) || (d = c), d && "string" == typeof d && (e = ia.filter(d, e)), 
            e = this.length > 1 && !Ta[a] ? ia.unique(e) : e, this.length > 1 && Qa.test(a) && (e = e.reverse()), 
            this.pushStack(e);
        };
    }), ia.extend({
        filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"), 1 === b.length ? ia.find.matchesSelector(b[0], a) ? [ b[0] ] : [] : ia.find.matches(a, b);
        },
        dir: function(a, c, d) {
            for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !ia(f).is(d)); ) 1 === f.nodeType && e.push(f), 
            f = f[c];
            return e;
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c;
        }
    });
    var Ua = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Va = / jQuery\d+="(?:null|\d+)"/g, Wa = RegExp("<(?:" + Ua + ")[\\s/>]", "i"), Xa = /^\s+/, Ya = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Za = /<([\w:]+)/, $a = /<tbody/i, _a = /<|&#?\w+;/, ab = /<(?:script|style|link)/i, bb = /^(?:checkbox|radio)$/i, cb = /checked\s*(?:[^=]|=\s*.checked.)/i, db = /^$|\/(?:java|ecma)script/i, eb = /^true\/(.*)/, fb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, gb = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: ia.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, hb = m(W), ib = hb.appendChild(W.createElement("div"));
    gb.optgroup = gb.option, gb.tbody = gb.tfoot = gb.colgroup = gb.caption = gb.thead, 
    gb.th = gb.td, ia.fn.extend({
        text: function(a) {
            return ia.access(this, function(a) {
                return a === b ? ia.text(this) : this.empty().append((this[0] && this[0].ownerDocument || W).createTextNode(a));
            }, null, a, arguments.length);
        },
        wrapAll: function(a) {
            if (ia.isFunction(a)) return this.each(function(b) {
                ia(this).wrapAll(a.call(this, b));
            });
            if (this[0]) {
                var b = ia(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; ) a = a.firstChild;
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(a) {
            return this.each(ia.isFunction(a) ? function(b) {
                ia(this).wrapInner(a.call(this, b));
            } : function() {
                var b = ia(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = ia.isFunction(a);
            return this.each(function(c) {
                ia(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                ia.nodeName(this, "body") || ia(this).replaceWith(this.childNodes);
            }).end();
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(a);
            });
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(a, this.firstChild);
            });
        },
        before: function() {
            return this.domManip(arguments, !1, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this);
            });
        },
        after: function() {
            return this.domManip(arguments, !1, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
            });
        },
        remove: function(a, b) {
            for (var c, d = 0; null != (c = this[d]); d++) (!a || ia.filter(a, [ c ]).length > 0) && (b || 1 !== c.nodeType || ia.cleanData(t(c)), 
            c.parentNode && (b && ia.contains(c.ownerDocument, c) && q(t(c, "script")), c.parentNode.removeChild(c)));
            return this;
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                for (1 === a.nodeType && ia.cleanData(t(a, !1)); a.firstChild; ) a.removeChild(a.firstChild);
                a.options && ia.nodeName(a, "select") && (a.options.length = 0);
            }
            return this;
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return ia.clone(this, a, b);
            });
        },
        html: function(a) {
            return ia.access(this, function(a) {
                var c = this[0] || {}, d = 0, e = this.length;
                if (a === b) return 1 === c.nodeType ? c.innerHTML.replace(Va, "") : b;
                if (!("string" != typeof a || ab.test(a) || !ia.support.htmlSerialize && Wa.test(a) || !ia.support.leadingWhitespace && Xa.test(a) || gb[(Za.exec(a) || [ "", "" ])[1].toLowerCase()])) {
                    a = a.replace(Ya, "<$1></$2>");
                    try {
                        for (;e > d; d++) c = this[d] || {}, 1 === c.nodeType && (ia.cleanData(t(c, !1)), 
                        c.innerHTML = a);
                        c = 0;
                    } catch (f) {}
                }
                c && this.empty().append(a);
            }, null, a, arguments.length);
        },
        replaceWith: function(a) {
            var b = ia.isFunction(a);
            return b || "string" == typeof a || (a = ia(a).not(this).detach()), this.domManip([ a ], !0, function(a) {
                var b = this.nextSibling, c = this.parentNode;
                c && (ia(this).remove(), c.insertBefore(a, b));
            });
        },
        detach: function(a) {
            return this.remove(a, !0);
        },
        domManip: function(a, c, d) {
            a = ba.apply([], a);
            var e, f, g, h, i, j, k = 0, l = this.length, m = this, q = l - 1, r = a[0], s = ia.isFunction(r);
            if (s || !(1 >= l || "string" != typeof r || ia.support.checkClone) && cb.test(r)) return this.each(function(e) {
                var f = m.eq(e);
                s && (a[0] = r.call(this, e, c ? f.html() : b)), f.domManip(a, c, d);
            });
            if (l && (j = ia.buildFragment(a, this[0].ownerDocument, !1, this), e = j.firstChild, 
            1 === j.childNodes.length && (j = e), e)) {
                for (c = c && ia.nodeName(e, "tr"), h = ia.map(t(j, "script"), o), g = h.length; l > k; k++) f = j, 
                k !== q && (f = ia.clone(f, !0, !0), g && ia.merge(h, t(f, "script"))), d.call(c && ia.nodeName(this[k], "table") ? n(this[k], "tbody") : this[k], f, k);
                if (g) for (i = h[h.length - 1].ownerDocument, ia.map(h, p), k = 0; g > k; k++) f = h[k], 
                db.test(f.type || "") && !ia._data(f, "globalEval") && ia.contains(i, f) && (f.src ? ia.ajax({
                    url: f.src,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                }) : ia.globalEval((f.text || f.textContent || f.innerHTML || "").replace(fb, "")));
                j = e = null;
            }
            return this;
        }
    }), ia.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        ia.fn[a] = function(a) {
            for (var c, d = 0, e = [], f = ia(a), g = f.length - 1; g >= d; d++) c = d === g ? this : this.clone(!0), 
            ia(f[d])[b](c), ca.apply(e, c.get());
            return this.pushStack(e);
        };
    }), ia.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h, i = ia.contains(a.ownerDocument, a);
            if (ia.support.html5Clone || ia.isXMLDoc(a) || !Wa.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (ib.innerHTML = a.outerHTML, 
            ib.removeChild(f = ib.firstChild)), !(ia.support.noCloneEvent && ia.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ia.isXMLDoc(a))) for (d = t(f), 
            h = t(a), g = 0; null != (e = h[g]); ++g) d[g] && s(e, d[g]);
            if (b) if (c) for (h = h || t(a), d = d || t(f), g = 0; null != (e = h[g]); g++) r(e, d[g]); else r(a, f);
            return d = t(f, "script"), d.length > 0 && q(d, !i && t(a, "script")), d = h = e = null, 
            f;
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k, l = a.length, n = m(b), o = [], p = 0; l > p; p++) if (f = a[p], 
            f || 0 === f) if ("object" === ia.type(f)) ia.merge(o, f.nodeType ? [ f ] : f); else if (_a.test(f)) {
                for (h = h || n.appendChild(b.createElement("div")), i = (Za.exec(f) || [ "", "" ])[1].toLowerCase(), 
                k = gb[i] || gb._default, h.innerHTML = k[1] + f.replace(Ya, "<$1></$2>") + k[2], 
                e = k[0]; e--; ) h = h.lastChild;
                if (!ia.support.leadingWhitespace && Xa.test(f) && o.push(b.createTextNode(Xa.exec(f)[0])), 
                !ia.support.tbody) for (f = "table" !== i || $a.test(f) ? "<table>" !== k[1] || $a.test(f) ? 0 : h : h.firstChild, 
                e = f && f.childNodes.length; e--; ) ia.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                for (ia.merge(o, h.childNodes), h.textContent = ""; h.firstChild; ) h.removeChild(h.firstChild);
                h = n.lastChild;
            } else o.push(b.createTextNode(f));
            for (h && n.removeChild(h), ia.support.appendChecked || ia.grep(t(o, "input"), u), 
            p = 0; f = o[p++]; ) if ((!d || -1 === ia.inArray(f, d)) && (g = ia.contains(f.ownerDocument, f), 
            h = t(n.appendChild(f), "script"), g && q(h), c)) for (e = 0; f = h[e++]; ) db.test(f.type || "") && c.push(f);
            return h = null, n;
        },
        cleanData: function(a, b) {
            for (var c, d, e, f, g = 0, h = ia.expando, i = ia.cache, j = ia.support.deleteExpando, k = ia.event.special; null != (c = a[g]); g++) if ((b || ia.acceptData(c)) && (e = c[h], 
            f = e && i[e])) {
                if (f.events) for (d in f.events) k[d] ? ia.event.remove(c, d) : ia.removeEvent(c, d, f.handle);
                i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== V ? c.removeAttribute(h) : c[h] = null, 
                _.push(e));
            }
        }
    });
    var jb, kb, lb, mb = /alpha\([^)]*\)/i, nb = /opacity\s*=\s*([^)]*)/, ob = /^(top|right|bottom|left)$/, pb = /^(none|table(?!-c[ea]).+)/, qb = /^margin/, rb = RegExp("^(" + ja + ")(.*)$", "i"), sb = RegExp("^(" + ja + ")(?!px)[a-z%]+$", "i"), tb = RegExp("^([+-])=(" + ja + ")", "i"), ub = {
        BODY: "block"
    }, vb = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, wb = {
        letterSpacing: 0,
        fontWeight: 400
    }, xb = [ "Top", "Right", "Bottom", "Left" ], yb = [ "Webkit", "O", "Moz", "ms" ];
    ia.fn.extend({
        css: function(a, c) {
            return ia.access(this, function(a, c, d) {
                var e, f, g = {}, h = 0;
                if (ia.isArray(c)) {
                    for (f = kb(a), e = c.length; e > h; h++) g[c[h]] = ia.css(a, c[h], !1, f);
                    return g;
                }
                return d !== b ? ia.style(a, c, d) : ia.css(a, c);
            }, a, c, arguments.length > 1);
        },
        show: function() {
            return x(this, !0);
        },
        hide: function() {
            return x(this);
        },
        toggle: function(a) {
            var b = "boolean" == typeof a;
            return this.each(function() {
                (b ? a : w(this)) ? ia(this).show() : ia(this).hide();
            });
        }
    }), ia.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = lb(a, "opacity");
                        return "" === c ? "1" : c;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ia.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, d, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var f, g, h, i = ia.camelCase(c), j = a.style;
                if (c = ia.cssProps[i] || (ia.cssProps[i] = v(j, i)), h = ia.cssHooks[c] || ia.cssHooks[i], 
                d === b) return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
                if (g = typeof d, "string" === g && (f = tb.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(ia.css(a, c)), 
                g = "number"), !(null == d || "number" === g && isNaN(d) || ("number" !== g || ia.cssNumber[i] || (d += "px"), 
                ia.support.clearCloneStyle || "" !== d || 0 !== c.indexOf("background") || (j[c] = "inherit"), 
                h && "set" in h && (d = h.set(a, d, e)) === b))) try {
                    j[c] = d;
                } catch (k) {}
            }
        },
        css: function(a, c, d, e) {
            var f, g, h, i = ia.camelCase(c);
            return c = ia.cssProps[i] || (ia.cssProps[i] = v(a.style, i)), h = ia.cssHooks[c] || ia.cssHooks[i], 
            h && "get" in h && (g = h.get(a, !0, d)), g === b && (g = lb(a, c, e)), "normal" === g && c in wb && (g = wb[c]), 
            "" === d || d ? (f = parseFloat(g), d === !0 || ia.isNumeric(f) ? f || 0 : g) : g;
        },
        swap: function(a, b, c, d) {
            var e, f, g = {};
            for (f in b) g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e;
        }
    }), a.getComputedStyle ? (kb = function(b) {
        return a.getComputedStyle(b, null);
    }, lb = function(a, c, d) {
        var e, f, g, h = d || kb(a), i = h ? h.getPropertyValue(c) || h[c] : b, j = a.style;
        return h && ("" !== i || ia.contains(a.ownerDocument, a) || (i = ia.style(a, c)), 
        sb.test(i) && qb.test(c) && (e = j.width, f = j.minWidth, g = j.maxWidth, j.minWidth = j.maxWidth = j.width = i, 
        i = h.width, j.width = e, j.minWidth = f, j.maxWidth = g)), i;
    }) : W.documentElement.currentStyle && (kb = function(a) {
        return a.currentStyle;
    }, lb = function(a, c, d) {
        var e, f, g, h = d || kb(a), i = h ? h[c] : b, j = a.style;
        return null == i && j && j[c] && (i = j[c]), sb.test(i) && !ob.test(c) && (e = j.left, 
        f = a.runtimeStyle, g = f && f.left, g && (f.left = a.currentStyle.left), j.left = "fontSize" === c ? "1em" : i, 
        i = j.pixelLeft + "px", j.left = e, g && (f.left = g)), "" === i ? "auto" : i;
    }), ia.each([ "height", "width" ], function(a, c) {
        ia.cssHooks[c] = {
            get: function(a, d, e) {
                return d ? 0 === a.offsetWidth && pb.test(ia.css(a, "display")) ? ia.swap(a, vb, function() {
                    return A(a, c, e);
                }) : A(a, c, e) : b;
            },
            set: function(a, b, d) {
                var e = d && kb(a);
                return y(a, b, d ? z(a, c, d, ia.support.boxSizing && "border-box" === ia.css(a, "boxSizing", !1, e), e) : 0);
            }
        };
    }), ia.support.opacity || (ia.cssHooks.opacity = {
        get: function(a, b) {
            return nb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
        },
        set: function(a, b) {
            var c = a.style, d = a.currentStyle, e = ia.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === ia.trim(f.replace(mb, "")) && c.removeAttribute && (c.removeAttribute("filter"), 
            "" === b || d && !d.filter) || (c.filter = mb.test(f) ? f.replace(mb, e) : f + " " + e);
        }
    }), ia(function() {
        ia.support.reliableMarginRight || (ia.cssHooks.marginRight = {
            get: function(a, c) {
                return c ? ia.swap(a, {
                    display: "inline-block"
                }, lb, [ a, "marginRight" ]) : b;
            }
        }), !ia.support.pixelPosition && ia.fn.position && ia.each([ "top", "left" ], function(a, c) {
            ia.cssHooks[c] = {
                get: function(a, d) {
                    return d ? (d = lb(a, c), sb.test(d) ? ia(a).position()[c] + "px" : d) : b;
                }
            };
        });
    }), ia.expr && ia.expr.filters && (ia.expr.filters.hidden = function(a) {
        return 0 >= a.offsetWidth && 0 >= a.offsetHeight || !ia.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || ia.css(a, "display"));
    }, ia.expr.filters.visible = function(a) {
        return !ia.expr.filters.hidden(a);
    }), ia.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        ia.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [ c ]; 4 > d; d++) e[a + xb[d] + b] = f[d] || f[d - 2] || f[0];
                return e;
            }
        }, qb.test(a) || (ia.cssHooks[a + b].set = y);
    });
    var zb = /%20/g, Ab = /\[\]$/, Bb = /\r?\n/g, Cb = /^(?:submit|button|image|reset|file)$/i, Db = /^(?:input|select|textarea|keygen)/i;
    ia.fn.extend({
        serialize: function() {
            return ia.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var a = ia.prop(this, "elements");
                return a ? ia.makeArray(a) : this;
            }).filter(function() {
                var a = this.type;
                return this.name && !ia(this).is(":disabled") && Db.test(this.nodeName) && !Cb.test(a) && (this.checked || !bb.test(a));
            }).map(function(a, b) {
                var c = ia(this).val();
                return null == c ? null : ia.isArray(c) ? ia.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Bb, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(Bb, "\r\n")
                };
            }).get();
        }
    }), ia.param = function(a, c) {
        var d, e = [], f = function(a, b) {
            b = ia.isFunction(b) ? b() : null == b ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
        };
        if (c === b && (c = ia.ajaxSettings && ia.ajaxSettings.traditional), ia.isArray(a) || a.jquery && !ia.isPlainObject(a)) ia.each(a, function() {
            f(this.name, this.value);
        }); else for (d in a) D(d, a[d], c, f);
        return e.join("&").replace(zb, "+");
    }, ia.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        ia.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        };
    }), ia.fn.hover = function(a, b) {
        return this.mouseenter(a).mouseleave(b || a);
    };
    var Eb, Fb, Gb = ia.now(), Hb = /\?/, Ib = /#.*$/, Jb = /([?&])_=[^&]*/, Kb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Lb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Mb = /^(?:GET|HEAD)$/, Nb = /^\/\//, Ob = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Pb = ia.fn.load, Qb = {}, Rb = {}, Sb = "*/".concat("*");
    try {
        Fb = X.href;
    } catch (Tb) {
        Fb = W.createElement("a"), Fb.href = "", Fb = Fb.href;
    }
    Eb = Ob.exec(Fb.toLowerCase()) || [], ia.fn.load = function(a, c, d) {
        if ("string" != typeof a && Pb) return Pb.apply(this, arguments);
        var e, f, g, h = this, i = a.indexOf(" ");
        return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), ia.isFunction(c) ? (d = c, 
        c = b) : c && "object" == typeof c && (g = "POST"), h.length > 0 && ia.ajax({
            url: a,
            type: g,
            dataType: "html",
            data: c
        }).done(function(a) {
            f = arguments, h.html(e ? ia("<div>").append(ia.parseHTML(a)).find(e) : a);
        }).complete(d && function(a, b) {
            h.each(d, f || [ a.responseText, b, a ]);
        }), this;
    }, ia.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(a, b) {
        ia.fn[b] = function(a) {
            return this.on(b, a);
        };
    }), ia.each([ "get", "post" ], function(a, c) {
        ia[c] = function(a, d, e, f) {
            return ia.isFunction(d) && (f = f || e, e = d, d = b), ia.ajax({
                url: a,
                type: c,
                dataType: f,
                data: d,
                success: e
            });
        };
    }), ia.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Fb,
            type: "GET",
            isLocal: Lb.test(Eb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Sb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": ia.parseJSON,
                "text xml": ia.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? G(G(a, ia.ajaxSettings), b) : G(ia.ajaxSettings, a);
        },
        ajaxPrefilter: E(Qb),
        ajaxTransport: E(Rb),
        ajax: function(a, c) {
            function d(a, c, d, e) {
                var f, l, s, t, v, x = c;
                2 !== u && (u = 2, i && clearTimeout(i), k = b, h = e || "", w.readyState = a > 0 ? 4 : 0, 
                d && (t = H(m, w, d)), a >= 200 && 300 > a || 304 === a ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), 
                v && (ia.lastModified[g] = v), v = w.getResponseHeader("etag"), v && (ia.etag[g] = v)), 
                204 === a ? (f = !0, x = "nocontent") : 304 === a ? (f = !0, x = "notmodified") : (f = I(m, t), 
                x = f.state, l = f.data, s = f.error, f = !s)) : (s = x, (a || !x) && (x = "error", 
                0 > a && (a = 0))), w.status = a, w.statusText = (c || x) + "", f ? p.resolveWith(n, [ l, x, w ]) : p.rejectWith(n, [ w, x, s ]), 
                w.statusCode(r), r = b, j && o.trigger(f ? "ajaxSuccess" : "ajaxError", [ w, m, f ? l : s ]), 
                q.fireWith(n, [ w, x ]), j && (o.trigger("ajaxComplete", [ w, m ]), --ia.active || ia.event.trigger("ajaxStop")));
            }
            "object" == typeof a && (c = a, a = b), c = c || {};
            var e, f, g, h, i, j, k, l, m = ia.ajaxSetup({}, c), n = m.context || m, o = m.context && (n.nodeType || n.jquery) ? ia(n) : ia.event, p = ia.Deferred(), q = ia.Callbacks("once memory"), r = m.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === u) {
                        if (!l) for (l = {}; b = Kb.exec(h); ) l[b[1].toLowerCase()] = b[2];
                        b = l[a.toLowerCase()];
                    }
                    return null == b ? null : b;
                },
                getAllResponseHeaders: function() {
                    return 2 === u ? h : null;
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    return u || (a = t[c] = t[c] || a, s[a] = b), this;
                },
                overrideMimeType: function(a) {
                    return u || (m.mimeType = a), this;
                },
                statusCode: function(a) {
                    var b;
                    if (a) if (2 > u) for (b in a) r[b] = [ r[b], a[b] ]; else w.always(a[w.status]);
                    return this;
                },
                abort: function(a) {
                    var b = a || v;
                    return k && k.abort(b), d(0, b), this;
                }
            };
            if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, m.url = ((a || m.url || Fb) + "").replace(Ib, "").replace(Nb, Eb[1] + "//"), 
            m.type = c.method || c.type || m.method || m.type, m.dataTypes = ia.trim(m.dataType || "*").toLowerCase().match(ka) || [ "" ], 
            null == m.crossDomain && (e = Ob.exec(m.url.toLowerCase()), m.crossDomain = !(!e || e[1] === Eb[1] && e[2] === Eb[2] && (e[3] || ("http:" === e[1] ? 80 : 443)) == (Eb[3] || ("http:" === Eb[1] ? 80 : 443)))), 
            m.data && m.processData && "string" != typeof m.data && (m.data = ia.param(m.data, m.traditional)), 
            F(Qb, m, c, w), 2 === u) return w;
            j = m.global, j && 0 === ia.active++ && ia.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), 
            m.hasContent = !Mb.test(m.type), g = m.url, m.hasContent || (m.data && (g = m.url += (Hb.test(g) ? "&" : "?") + m.data, 
            delete m.data), m.cache === !1 && (m.url = Jb.test(g) ? g.replace(Jb, "$1_=" + Gb++) : g + (Hb.test(g) ? "&" : "?") + "_=" + Gb++)), 
            m.ifModified && (ia.lastModified[g] && w.setRequestHeader("If-Modified-Since", ia.lastModified[g]), 
            ia.etag[g] && w.setRequestHeader("If-None-Match", ia.etag[g])), (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), 
            w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Sb + "; q=0.01" : "") : m.accepts["*"]);
            for (f in m.headers) w.setRequestHeader(f, m.headers[f]);
            if (m.beforeSend && (m.beforeSend.call(n, w, m) === !1 || 2 === u)) return w.abort();
            v = "abort";
            for (f in {
                success: 1,
                error: 1,
                complete: 1
            }) w[f](m[f]);
            if (k = F(Rb, m, c, w)) {
                w.readyState = 1, j && o.trigger("ajaxSend", [ w, m ]), m.async && m.timeout > 0 && (i = setTimeout(function() {
                    w.abort("timeout");
                }, m.timeout));
                try {
                    u = 1, k.send(s, d);
                } catch (x) {
                    if (!(2 > u)) throw x;
                    d(-1, x);
                }
            } else d(-1, "No Transport");
            return w;
        },
        getScript: function(a, c) {
            return ia.get(a, b, c, "script");
        },
        getJSON: function(a, b, c) {
            return ia.get(a, b, c, "json");
        }
    }), ia.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return ia.globalEval(a), a;
            }
        }
    }), ia.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
    }), ia.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var c, d = W.head || ia("head")[0] || W.documentElement;
            return {
                send: function(b, e) {
                    c = W.createElement("script"), c.async = !0, a.scriptCharset && (c.charset = a.scriptCharset), 
                    c.src = a.url, c.onload = c.onreadystatechange = function(a, b) {
                        (b || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, 
                        c.parentNode && c.parentNode.removeChild(c), c = null, b || e(200, "success"));
                    }, d.insertBefore(c, d.firstChild);
                },
                abort: function() {
                    c && c.onload(b, !0);
                }
            };
        }
    });
    var Ub = [], Vb = /(=)\?(?=&|$)|\?\?/;
    ia.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Ub.pop() || ia.expando + "_" + Gb++;
            return this[a] = !0, a;
        }
    }), ia.ajaxPrefilter("json jsonp", function(c, d, e) {
        var f, g, h, i = c.jsonp !== !1 && (Vb.test(c.url) ? "url" : "string" == typeof c.data && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Vb.test(c.data) && "data");
        return i || "jsonp" === c.dataTypes[0] ? (f = c.jsonpCallback = ia.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, 
        i ? c[i] = c[i].replace(Vb, "$1" + f) : c.jsonp !== !1 && (c.url += (Hb.test(c.url) ? "&" : "?") + c.jsonp + "=" + f), 
        c.converters["script json"] = function() {
            return h || ia.error(f + " was not called"), h[0];
        }, c.dataTypes[0] = "json", g = a[f], a[f] = function() {
            h = arguments;
        }, e.always(function() {
            a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, Ub.push(f)), h && ia.isFunction(g) && g(h[0]), 
            h = g = b;
        }), "script") : b;
    });
    var Wb, Xb, Yb = 0, Zb = a.ActiveXObject && function() {
        var a;
        for (a in Wb) Wb[a](b, !0);
    };
    ia.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && J() || K();
    } : J, Xb = ia.ajaxSettings.xhr(), ia.support.cors = !!Xb && "withCredentials" in Xb, 
    Xb = ia.support.ajax = !!Xb, Xb && ia.ajaxTransport(function(c) {
        if (!c.crossDomain || ia.support.cors) {
            var d;
            return {
                send: function(e, f) {
                    var g, h, i = c.xhr();
                    if (c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async), 
                    c.xhrFields) for (h in c.xhrFields) i[h] = c.xhrFields[h];
                    c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), c.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (h in e) i.setRequestHeader(h, e[h]);
                    } catch (j) {}
                    i.send(c.hasContent && c.data || null), d = function(a, e) {
                        var h, j, k, l;
                        try {
                            if (d && (e || 4 === i.readyState)) if (d = b, g && (i.onreadystatechange = ia.noop, 
                            Zb && delete Wb[g]), e) 4 !== i.readyState && i.abort(); else {
                                l = {}, h = i.status, j = i.getAllResponseHeaders(), "string" == typeof i.responseText && (l.text = i.responseText);
                                try {
                                    k = i.statusText;
                                } catch (m) {
                                    k = "";
                                }
                                h || !c.isLocal || c.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200 : 404;
                            }
                        } catch (n) {
                            e || f(-1, n);
                        }
                        l && f(h, k, l, j);
                    }, c.async ? 4 === i.readyState ? setTimeout(d) : (g = ++Yb, Zb && (Wb || (Wb = {}, 
                    ia(a).unload(Zb)), Wb[g] = d), i.onreadystatechange = d) : d();
                },
                abort: function() {
                    d && d(b, !0);
                }
            };
        }
    });
    var $b, _b, ac = /^(?:toggle|show|hide)$/, bc = RegExp("^(?:([+-])=|)(" + ja + ")([a-z%]*)$", "i"), cc = /queueHooks$/, dc = [ P ], ec = {
        "*": [ function(a, b) {
            var c, d, e = this.createTween(a, b), f = bc.exec(b), g = e.cur(), h = +g || 0, i = 1, j = 20;
            if (f) {
                if (c = +f[2], d = f[3] || (ia.cssNumber[a] ? "" : "px"), "px" !== d && h) {
                    h = ia.css(e.elem, a, !0) || c || 1;
                    do i = i || ".5", h /= i, ia.style(e.elem, a, h + d); while (i !== (i = e.cur() / g) && 1 !== i && --j);
                }
                e.unit = d, e.start = h, e.end = f[1] ? h + (f[1] + 1) * c : c;
            }
            return e;
        } ]
    };
    ia.Animation = ia.extend(N, {
        tweener: function(a, b) {
            ia.isFunction(a) ? (b = a, a = [ "*" ]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], ec[c] = ec[c] || [], ec[c].unshift(b);
        },
        prefilter: function(a, b) {
            b ? dc.unshift(a) : dc.push(a);
        }
    }), ia.Tween = Q, Q.prototype = {
        constructor: Q,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), 
            this.end = d, this.unit = f || (ia.cssNumber[c] ? "" : "px");
        },
        cur: function() {
            var a = Q.propHooks[this.prop];
            return a && a.get ? a.get(this) : Q.propHooks._default.get(this);
        },
        run: function(a) {
            var b, c = Q.propHooks[this.prop];
            return this.pos = b = this.options.duration ? ia.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, 
            this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            c && c.set ? c.set(this) : Q.propHooks._default.set(this), this;
        }
    }, Q.prototype.init.prototype = Q.prototype, Q.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = ia.css(a.elem, a.prop, ""), 
                b && "auto" !== b ? b : 0) : a.elem[a.prop];
            },
            set: function(a) {
                ia.fx.step[a.prop] ? ia.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[ia.cssProps[a.prop]] || ia.cssHooks[a.prop]) ? ia.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
            }
        }
    }, Q.propHooks.scrollTop = Q.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        }
    }, ia.each([ "toggle", "show", "hide" ], function(a, b) {
        var c = ia.fn[b];
        ia.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(R(b, !0), a, d, e);
        };
    }), ia.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(w).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            var e = ia.isEmptyObject(a), f = ia.speed(b, c, d), g = function() {
                var b = N(this, ia.extend({}, a), f);
                g.finish = function() {
                    b.stop(!0);
                }, (e || ia._data(this, "finish")) && b.stop(!0);
            };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
        },
        stop: function(a, c, d) {
            var e = function(a) {
                var b = a.stop;
                delete a.stop, b(d);
            };
            return "string" != typeof a && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), 
            this.each(function() {
                var b = !0, c = null != a && a + "queueHooks", f = ia.timers, g = ia._data(this);
                if (c) g[c] && g[c].stop && e(g[c]); else for (c in g) g[c] && g[c].stop && cc.test(c) && e(g[c]);
                for (c = f.length; c--; ) f[c].elem !== this || null != a && f[c].queue !== a || (f[c].anim.stop(d), 
                b = !1, f.splice(c, 1));
                (b || !d) && ia.dequeue(this, a);
            });
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"), this.each(function() {
                var b, c = ia._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = ia.timers, g = d ? d.length : 0;
                for (c.finish = !0, ia.queue(this, a, []), e && e.cur && e.cur.finish && e.cur.finish.call(this), 
                b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), 
                f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish;
            });
        }
    }), ia.each({
        slideDown: R("show"),
        slideUp: R("hide"),
        slideToggle: R("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        ia.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), ia.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? ia.extend({}, a) : {
            complete: c || !c && b || ia.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !ia.isFunction(b) && b
        };
        return d.duration = ia.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in ia.fx.speeds ? ia.fx.speeds[d.duration] : ia.fx.speeds._default, 
        (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            ia.isFunction(d.old) && d.old.call(this), d.queue && ia.dequeue(this, d.queue);
        }, d;
    }, ia.easing = {
        linear: function(a) {
            return a;
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2;
        }
    }, ia.timers = [], ia.fx = Q.prototype.init, ia.fx.tick = function() {
        var a, c = ia.timers, d = 0;
        for ($b = ia.now(); c.length > d; d++) a = c[d], a() || c[d] !== a || c.splice(d--, 1);
        c.length || ia.fx.stop(), $b = b;
    }, ia.fx.timer = function(a) {
        a() && ia.timers.push(a) && ia.fx.start();
    }, ia.fx.interval = 13, ia.fx.start = function() {
        _b || (_b = setInterval(ia.fx.tick, ia.fx.interval));
    }, ia.fx.stop = function() {
        clearInterval(_b), _b = null;
    }, ia.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, ia.fx.step = {}, ia.expr && ia.expr.filters && (ia.expr.filters.animated = function(a) {
        return ia.grep(ia.timers, function(b) {
            return a === b.elem;
        }).length;
    }), ia.fn.offset = function(a) {
        if (arguments.length) return a === b ? this : this.each(function(b) {
            ia.offset.setOffset(this, a, b);
        });
        var c, d, e = {
            top: 0,
            left: 0
        }, f = this[0], g = f && f.ownerDocument;
        return g ? (c = g.documentElement, ia.contains(c, f) ? (typeof f.getBoundingClientRect !== V && (e = f.getBoundingClientRect()), 
        d = S(g), {
            top: e.top + (d.pageYOffset || c.scrollTop) - (c.clientTop || 0),
            left: e.left + (d.pageXOffset || c.scrollLeft) - (c.clientLeft || 0)
        }) : e) : void 0;
    }, ia.offset = {
        setOffset: function(a, b, c) {
            var d = ia.css(a, "position");
            "static" === d && (a.style.position = "relative");
            var e, f, g = ia(a), h = g.offset(), i = ia.css(a, "top"), j = ia.css(a, "left"), k = ("absolute" === d || "fixed" === d) && ia.inArray("auto", [ i, j ]) > -1, l = {}, m = {};
            k ? (m = g.position(), e = m.top, f = m.left) : (e = parseFloat(i) || 0, f = parseFloat(j) || 0), 
            ia.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (l.top = b.top - h.top + e), 
            null != b.left && (l.left = b.left - h.left + f), "using" in b ? b.using.call(a, l) : g.css(l);
        }
    }, ia.fn.extend({
        position: function() {
            if (this[0]) {
                var a, b, c = {
                    top: 0,
                    left: 0
                }, d = this[0];
                return "fixed" === ia.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), 
                b = this.offset(), ia.nodeName(a[0], "html") || (c = a.offset()), c.top += ia.css(a[0], "borderTopWidth", !0), 
                c.left += ia.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - ia.css(d, "marginTop", !0),
                    left: b.left - c.left - ia.css(d, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || W.documentElement; a && !ia.nodeName(a, "html") && "static" === ia.css(a, "position"); ) a = a.offsetParent;
                return a || W.documentElement;
            });
        }
    }), ia.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, c) {
        var d = /Y/.test(c);
        ia.fn[a] = function(e) {
            return ia.access(this, function(a, e, f) {
                var g = S(a);
                return f === b ? g ? c in g ? g[c] : g.document.documentElement[e] : a[e] : (g ? g.scrollTo(d ? ia(g).scrollLeft() : f, d ? f : ia(g).scrollTop()) : a[e] = f, 
                b);
            }, a, e, arguments.length, null);
        };
    }), ia.each({
        Height: "height",
        Width: "width"
    }, function(a, c) {
        ia.each({
            padding: "inner" + a,
            content: c,
            "": "outer" + a
        }, function(d, e) {
            ia.fn[e] = function(e, f) {
                var g = arguments.length && (d || "boolean" != typeof e), h = d || (e === !0 || f === !0 ? "margin" : "border");
                return ia.access(this, function(c, d, e) {
                    var f;
                    return ia.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (f = c.documentElement, 
                    Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? ia.css(c, d, h) : ia.style(c, d, e, h);
                }, c, g ? e : b, g, null);
            };
        });
    }), a.jQuery = a.$ = ia, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return ia;
    });
}(window);

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.11 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */
var requirejs, require, define;

!function(global) {
    function isFunction(a) {
        return "[object Function]" === ostring.call(a);
    }
    function isArray(a) {
        return "[object Array]" === ostring.call(a);
    }
    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(a, b) {
        if (a) {
            var c;
            for (c = 0; c < a.length && (!a[c] || !b(a[c], c, a)); c += 1) ;
        }
    }
    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(a, b) {
        if (a) {
            var c;
            for (c = a.length - 1; c > -1 && (!a[c] || !b(a[c], c, a)); c -= 1) ;
        }
    }
    function hasProp(a, b) {
        return hasOwn.call(a, b);
    }
    function getOwn(a, b) {
        return hasProp(a, b) && a[b];
    }
    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(a, b) {
        var c;
        for (c in a) if (hasProp(a, c) && b(a[c], c)) break;
    }
    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(a, b, c, d) {
        return b && eachProp(b, function(b, e) {
            (c || !hasProp(a, e)) && (!d || "object" != typeof b || !b || isArray(b) || isFunction(b) || b instanceof RegExp ? a[e] = b : (a[e] || (a[e] = {}), 
            mixin(a[e], b, c, d)));
        }), a;
    }
    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(a, b) {
        return function() {
            return b.apply(a, arguments);
        };
    }
    function scripts() {
        return document.getElementsByTagName("script");
    }
    function defaultOnError(a) {
        throw a;
    }
    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(a) {
        if (!a) return a;
        var b = global;
        return each(a.split("."), function(a) {
            b = b[a];
        }), b;
    }
    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(a, b, c, d) {
        var e = new Error(b + "\nhttp://requirejs.org/docs/errors.html#" + a);
        return e.requireType = a, e.requireModules = d, c && (e.originalError = c), e;
    }
    function newContext(a) {
        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function b(a) {
            var b, c, d = a.length;
            for (b = 0; d > b; b++) if (c = a[b], "." === c) a.splice(b, 1), b -= 1; else if (".." === c) {
                if (1 === b && (".." === a[2] || ".." === a[0])) //End of the line. Keep at least one non-dot
                //path segment at the front so it can be mapped
                //correctly to disk. Otherwise, there is likely
                //no path mapping for a path starting with '..'.
                //This can still fail, but catches the most reasonable
                //uses of ..
                break;
                b > 0 && (a.splice(b - 1, 2), b -= 2);
            }
        }
        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function c(a, c, d) {
            var e, f, g, h, i, j, k, l, m, n, o, p = c && c.split("/"), q = p, r = x.map, s = r && r["*"];
            //Apply map config if available.
            if (//Adjust any relative paths.
            a && "." === a.charAt(0) && (//If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            c ? (//Convert baseName to array, and lop off the last part,
            //so that . matches that 'directory' and not name of the baseName's
            //module. For instance, baseName of 'one/two/three', maps to
            //'one/two/three.js', but we want the directory, 'one/two' for
            //this normalization.
            q = p.slice(0, p.length - 1), a = a.split("/"), k = a.length - 1, // If wanting node ID compatibility, strip .js from end
            // of IDs. Have to do this here, and not in nameToUrl
            // because node allows either .js or non .js to map
            // to same file.
            x.nodeIdCompat && jsSuffixRegExp.test(a[k]) && (a[k] = a[k].replace(jsSuffixRegExp, "")), 
            a = q.concat(a), b(a), a = a.join("/")) : 0 === a.indexOf("./") && (// No baseName, so this is ID is resolved relative
            // to baseUrl, pull off the leading dot.
            a = a.substring(2))), d && r && (p || s)) {
                g = a.split("/");
                a: for (h = g.length; h > 0; h -= 1) {
                    if (j = g.slice(0, h).join("/"), p) //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (i = p.length; i > 0; i -= 1) //baseName segment has config, find if it has one for
                    //this name.
                    if (f = getOwn(r, p.slice(0, i).join("/")), f && (f = getOwn(f, j))) {
                        //Match, update name to the new value.
                        l = f, m = h;
                        break a;
                    }
                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    !n && s && getOwn(s, j) && (n = getOwn(s, j), o = h);
                }
                !l && n && (l = n, m = o), l && (g.splice(0, m, l), a = g.join("/"));
            }
            // If the name points to a package's name, use
            // the package main instead.
            return e = getOwn(x.pkgs, a), e ? e : a;
        }
        function d(a) {
            isBrowser && each(scripts(), function(b) {
                return b.getAttribute("data-requiremodule") === a && b.getAttribute("data-requirecontext") === u.contextName ? (b.parentNode.removeChild(b), 
                !0) : void 0;
            });
        }
        function e(a) {
            var b = getOwn(x.paths, a);
            //Pop off the first array value, since it failed, and
            //retry
            return b && isArray(b) && b.length > 1 ? (b.shift(), u.require.undef(a), u.require([ a ]), 
            !0) : void 0;
        }
        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function f(a) {
            var b, c = a ? a.indexOf("!") : -1;
            return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [ b, a ];
        }
        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function g(a, b, d, e) {
            var g, h, i, j, k = null, l = b ? b.name : null, m = a, n = !0, o = "";
            //If no name, then it means it is a require call, generate an
            //internal name.
            //Account for relative paths if there is a base name.
            //Plugin is loaded, use its normalize method.
            //A regular module.
            //Normalized name may be a plugin ID due to map config
            //application in normalize. The map config values must
            //already be normalized, so do not need to redo that part.
            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            return a || (n = !1, a = "_@r" + (F += 1)), j = f(a), k = j[0], a = j[1], k && (k = c(k, l, e), 
            h = getOwn(C, k)), a && (k ? o = h && h.normalize ? h.normalize(a, function(a) {
                return c(a, l, e);
            }) : c(a, l, e) : (o = c(a, l, e), j = f(o), k = j[0], o = j[1], d = !0, g = u.nameToUrl(o))), 
            i = !k || h || d ? "" : "_unnormalized" + (G += 1), {
                prefix: k,
                name: o,
                parentMap: b,
                unnormalized: !!i,
                url: g,
                originalName: m,
                isDefine: n,
                id: (k ? k + "!" + o : o) + i
            };
        }
        function h(a) {
            var b = a.id, c = getOwn(y, b);
            return c || (c = y[b] = new u.Module(a)), c;
        }
        function i(a, b, c) {
            var d = a.id, e = getOwn(y, d);
            !hasProp(C, d) || e && !e.defineEmitComplete ? (e = h(a), e.error && "error" === b ? c(e.error) : e.on(b, c)) : "defined" === b && c(C[d]);
        }
        function j(a, b) {
            var c = a.requireModules, d = !1;
            b ? b(a) : (each(c, function(b) {
                var c = getOwn(y, b);
                c && (//Set error on module, so it skips timeout checks.
                c.error = a, c.events.error && (d = !0, c.emit("error", a)));
            }), d || req.onError(a));
        }
        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function k() {
            //Push all the globalDefQueue items into the context's defQueue
            globalDefQueue.length && (//Array splice in the values since the context code has a
            //local var ref to defQueue, so cannot just reassign the one
            //on context.
            apsp.apply(B, [ B.length, 0 ].concat(globalDefQueue)), globalDefQueue = []);
        }
        function l(a) {
            //Clean up machinery used for waiting modules.
            delete y[a], delete z[a];
        }
        function m(a, b, c) {
            var d = a.map.id;
            a.error ? a.emit("error", a.error) : (b[d] = !0, each(a.depMaps, function(d, e) {
                var f = d.id, g = getOwn(y, f);
                //Only force things that have not completed
                //being defined, so still in the registry,
                //and only if it has not been matched up
                //in the module already.
                !g || a.depMatched[e] || c[f] || (getOwn(b, f) ? (a.defineDep(e, C[f]), a.check()) : m(g, b, c));
            }), c[d] = !0);
        }
        function n() {
            var a, b, c = 1e3 * x.waitSeconds, //It is possible to disable the wait interval by using waitSeconds of 0.
            f = c && u.startTime + c < new Date().getTime(), g = [], h = [], i = !1, k = !0;
            //Do not bother if this call was a result of a cycle break.
            if (!s) {
                if (s = !0, //Figure out the state of all the modules.
                eachProp(z, function(a) {
                    var c = a.map, j = c.id;
                    //Skip things that are not enabled or in error state.
                    if (a.enabled && (c.isDefine || h.push(a), !a.error)) //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!a.inited && f) e(j) ? (b = !0, i = !0) : (g.push(j), d(j)); else if (!a.inited && a.fetched && c.isDefine && (i = !0, 
                    !c.prefix)) //No reason to keep looking for unfinished
                    //loading. If the only stillLoading is a
                    //plugin resource though, keep going,
                    //because it may be that a plugin resource
                    //is waiting on a non-plugin cycle.
                    return k = !1;
                }), f && g.length) //If wait time expired, throw error of unloaded modules.
                return a = makeError("timeout", "Load timeout for modules: " + g, null, g), a.contextName = u.contextName, 
                j(a);
                //Not expired, check for a cycle.
                k && each(h, function(a) {
                    m(a, {}, {});
                }), //If still waiting on loads, and the waiting load is something
                //other than a plugin resource, or there are still outstanding
                //scripts, then just try back later.
                f && !b || !i || !isBrowser && !isWebWorker || w || (w = setTimeout(function() {
                    w = 0, n();
                }, 50)), s = !1;
            }
        }
        function o(a) {
            //Skip modules already defined.
            hasProp(C, a[0]) || h(g(a[0], null, !0)).init(a[1], a[2]);
        }
        function p(a, b, c, d) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            a.detachEvent && !isOpera ? //Probably IE. If not it will throw an error, which will be
            //useful to know.
            d && a.detachEvent(d, b) : a.removeEventListener(c, b, !1);
        }
        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function q(a) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var b = a.currentTarget || a.srcElement;
            //Remove the listeners once here.
            return p(b, u.onScriptLoad, "load", "onreadystatechange"), p(b, u.onScriptError, "error"), 
            {
                node: b,
                id: b && b.getAttribute("data-requiremodule")
            };
        }
        function r() {
            var a;
            //Make sure any remaining defQueue items get properly processed.
            for (//Any defined modules in the global queue, intake them now.
            k(); B.length; ) {
                if (a = B.shift(), null === a[0]) return j(makeError("mismatch", "Mismatched anonymous define() module: " + a[a.length - 1]));
                //args are id, deps, factory. Should be normalized by the
                //define() function.
                o(a);
            }
        }
        var s, t, u, v, w, x = {
            //Defaults. Do not set a default for map
            //config to speed up normalize(), which
            //will run faster if there is no default.
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
        }, y = {}, //registry of just enabled modules, to speed
        //cycle breaking code when lots of modules
        //are registered, but not activated.
        z = {}, A = {}, B = [], C = {}, D = {}, E = {}, F = 1, G = 1;
        return v = {
            require: function(a) {
                return a.require ? a.require : a.require = u.makeRequire(a.map);
            },
            exports: function(a) {
                return a.usingExports = !0, a.map.isDefine ? a.exports ? C[a.map.id] = a.exports : a.exports = C[a.map.id] = {} : void 0;
            },
            module: function(a) {
                return a.module ? a.module : a.module = {
                    id: a.map.id,
                    uri: a.map.url,
                    config: function() {
                        return getOwn(x.config, a.map.id) || {};
                    },
                    exports: a.exports || (a.exports = {})
                };
            }
        }, t = function(a) {
            this.events = getOwn(A, a.id) || {}, this.map = a, this.shim = getOwn(x.shim, a.id), 
            this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, 
            this.depCount = 0;
        }, t.prototype = {
            init: function(a, b, c, d) {
                d = d || {}, //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                this.inited || (this.factory = b, c ? //Register for errors on this module.
                this.on("error", c) : this.events.error && (//If no errback already, but there are error listeners
                //on this module, set up an errback to pass to the deps.
                c = bind(this, function(a) {
                    this.emit("error", a);
                })), //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = a && a.slice(0), this.errback = c, //Indicate this module has be initialized
                this.inited = !0, this.ignore = d.ignore, //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                d.enabled || this.enabled ? //Enable this module and dependencies.
                //Will call this.check()
                this.enable() : this.check());
            },
            defineDep: function(a, b) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b);
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0, u.startTime = new Date().getTime();
                    var a = this.map;
                    //If the manager is for a plugin managed resource,
                    //ask the plugin to load it now.
                    //If the manager is for a plugin managed resource,
                    //ask the plugin to load it now.
                    return this.shim ? void u.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function() {
                        return a.prefix ? this.callPlugin() : this.load();
                    })) : a.prefix ? this.callPlugin() : this.load();
                }
            },
            load: function() {
                var a = this.map.url;
                //Regular dependency.
                D[a] || (D[a] = !0, u.load(this.map.id, a));
            },
            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function() {
                if (this.enabled && !this.enabling) {
                    var a, b, c = this.map.id, d = this.depExports, e = this.exports, f = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error); else if (!this.defining) {
                            if (//The factory could trigger another require call
                            //that would result in checking this module to
                            //define itself again. If already in the process
                            //of doing that, skip this work.
                            this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(f)) {
                                    //If there is an error listener, favor passing
                                    //to that instead of throwing an error. However,
                                    //only do it for define()'d  modules. require
                                    //errbacks should not be called for failures in
                                    //their callbacks (#699). However if a global
                                    //onError is set, use that.
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                        e = u.execCb(c, f, d, e);
                                    } catch (g) {
                                        a = g;
                                    } else e = u.execCb(c, f, d, e);
                                    if (// Favor return value over exports. If node/cjs in play,
                                    // then will not have a return value anyway. Favor
                                    // module.exports assignment over exports object.
                                    this.map.isDefine && void 0 === e && (b = this.module, b ? e = b.exports : this.usingExports && (//exports already set the defined value.
                                    e = this.exports)), a) return a.requireMap = this.map, a.requireModules = this.map.isDefine ? [ this.map.id ] : null, 
                                    a.requireType = this.map.isDefine ? "define" : "require", j(this.error = a);
                                } else //Just a literal value
                                e = f;
                                this.exports = e, this.map.isDefine && !this.ignore && (C[c] = e, req.onResourceLoad && req.onResourceLoad(u, this.map, this.depMaps)), 
                                //Clean up
                                l(c), this.defined = !0;
                            }
                            //Finished the define stage. Allow calling check again
                            //to allow define notifications below in the case of a
                            //cycle.
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, 
                            this.emit("defined", this.exports), this.defineEmitComplete = !0);
                        }
                    } else this.fetch();
                }
            },
            callPlugin: function() {
                var a = this.map, b = a.id, //Map already normalized the prefix.
                d = g(a.prefix);
                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(d), i(d, "defined", bind(this, function(d) {
                    var e, f, k, m = getOwn(E, this.map.id), n = this.map.name, o = this.map.parentMap ? this.map.parentMap.name : null, p = u.makeRequire(a.parentMap, {
                        enableBuildCallback: !0
                    });
                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    //Normalize the ID if the plugin allows it.
                    //prefix and name should already be normalized, no need
                    //for applying map config again either.
                    //Mark this as a dependency for this plugin, so it
                    //can be traced for cycles.
                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    return this.map.unnormalized ? (d.normalize && (n = d.normalize(n, function(a) {
                        return c(a, o, !0);
                    }) || ""), f = g(a.prefix + "!" + n, this.map.parentMap), i(f, "defined", bind(this, function(a) {
                        this.init([], function() {
                            return a;
                        }, null, {
                            enabled: !0,
                            ignore: !0
                        });
                    })), k = getOwn(y, f.id), void (k && (this.depMaps.push(f), this.events.error && k.on("error", bind(this, function(a) {
                        this.emit("error", a);
                    })), k.enable()))) : m ? (this.map.url = u.nameToUrl(m), void this.load()) : (e = bind(this, function(a) {
                        this.init([], function() {
                            return a;
                        }, null, {
                            enabled: !0
                        });
                    }), e.error = bind(this, function(a) {
                        this.inited = !0, this.error = a, a.requireModules = [ b ], //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(y, function(a) {
                            0 === a.map.id.indexOf(b + "_unnormalized") && l(a.map.id);
                        }), j(a);
                    }), e.fromText = bind(this, function(c, d) {
                        /*jslint evil: true */
                        var f = a.name, i = g(f), k = useInteractive;
                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        d && (c = d), //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        k && (useInteractive = !1), //Prime the system by creating a module instance for
                        //it.
                        h(i), //Transfer any config to this other module.
                        hasProp(x.config, b) && (x.config[f] = x.config[b]);
                        try {
                            req.exec(c);
                        } catch (l) {
                            return j(makeError("fromtexteval", "fromText eval for " + b + " failed: " + l, l, [ b ]));
                        }
                        k && (useInteractive = !0), //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(i), //Support anonymous modules.
                        u.completeLoad(f), //Bind the value of that module to the value for this
                        //resource ID.
                        p([ f ], e);
                    }), void d.load(a.name, p, e, x));
                })), u.enable(d, this), this.pluginMaps[d.id] = d;
            },
            enable: function() {
                z[this.map.id] = this, this.enabled = !0, //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = !0, //Enable each dependency
                each(this.depMaps, bind(this, function(a, b) {
                    var c, d, e;
                    if ("string" == typeof a) {
                        if (//Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        a = g(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), 
                        this.depMaps[b] = a, e = getOwn(v, a.id)) return void (this.depExports[b] = e(this));
                        this.depCount += 1, i(a, "defined", bind(this, function(a) {
                            this.defineDep(b, a), this.check();
                        })), this.errback && i(a, "error", bind(this, this.errback));
                    }
                    c = a.id, d = y[c], //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    hasProp(v, c) || !d || d.enabled || u.enable(a, this);
                })), //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function(a) {
                    var b = getOwn(y, a.id);
                    b && !b.enabled && u.enable(a, this);
                })), this.enabling = !1, this.check();
            },
            on: function(a, b) {
                var c = this.events[a];
                c || (c = this.events[a] = []), c.push(b);
            },
            emit: function(a, b) {
                each(this.events[a], function(a) {
                    a(b);
                }), "error" === a && //Now that the error handler was triggered, remove
                //the listeners, since this broken Module instance
                //can stay around for a while in the registry.
                delete this.events[a];
            }
        }, u = {
            config: x,
            contextName: a,
            registry: y,
            defined: C,
            urlFetched: D,
            defQueue: B,
            Module: t,
            makeModuleMap: g,
            nextTick: req.nextTick,
            onError: j,
            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function(a) {
                //Make sure the baseUrl ends in a slash.
                a.baseUrl && "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += "/");
                //Save off the paths since they require special processing,
                //they are additive.
                var b = x.shim, c = {
                    paths: !0,
                    bundles: !0,
                    config: !0,
                    map: !0
                };
                eachProp(a, function(a, b) {
                    c[b] ? (x[b] || (x[b] = {}), mixin(x[b], a, !0, !0)) : x[b] = a;
                }), //Reverse map the bundles
                a.bundles && eachProp(a.bundles, function(a, b) {
                    each(a, function(a) {
                        a !== b && (E[a] = b);
                    });
                }), //Merge shim
                a.shim && (eachProp(a.shim, function(a, c) {
                    //Normalize the structure
                    isArray(a) && (a = {
                        deps: a
                    }), !a.exports && !a.init || a.exportsFn || (a.exportsFn = u.makeShimExports(a)), 
                    b[c] = a;
                }), x.shim = b), //Adjust packages if necessary.
                a.packages && each(a.packages, function(a) {
                    var b, c;
                    a = "string" == typeof a ? {
                        name: a
                    } : a, c = a.name, b = a.location, b && (x.paths[c] = a.location), //Save pointer to main module ID for pkg name.
                    //Remove leading dot in main, so main paths are normalized,
                    //and remove any trailing .js, since different package
                    //envs have different conventions: some use a module name,
                    //some use a file name.
                    x.pkgs[c] = a.name + "/" + (a.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "");
                }), //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(y, function(a, b) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    a.inited || a.map.unnormalized || (a.map = g(b));
                }), //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                (a.deps || a.callback) && u.require(a.deps || [], a.callback);
            },
            makeShimExports: function(a) {
                function b() {
                    var b;
                    return a.init && (b = a.init.apply(global, arguments)), b || a.exports && getGlobal(a.exports);
                }
                return b;
            },
            makeRequire: function(b, e) {
                function f(c, d, i) {
                    var k, l, m;
                    //If require|exports|module are requested, get the
                    //value for them from the special handlers. Caveat:
                    //this only works while module is being defined.
                    //Synchronous access to one module. If require.get is
                    //available (as in the Node adapter), prefer that.
                    //Normalize module name, if it contains . or ..
                    //Grab defines waiting in the global queue.
                    //Mark all the dependencies as needing to be loaded.
                    return e.enableBuildCallback && d && isFunction(d) && (d.__requireJsBuild = !0), 
                    "string" == typeof c ? isFunction(d) ? j(makeError("requireargs", "Invalid require call"), i) : b && hasProp(v, c) ? v[c](y[b.id]) : req.get ? req.get(u, c, b, f) : (l = g(c, b, !1, !0), 
                    k = l.id, hasProp(C, k) ? C[k] : j(makeError("notloaded", 'Module name "' + k + '" has not been loaded yet for context: ' + a + (b ? "" : ". Use require([])")))) : (r(), 
                    u.nextTick(function() {
                        //Some defines could have been added since the
                        //require call, collect them.
                        r(), m = h(g(null, b)), //Store if map config should be applied to this require
                        //call for dependencies.
                        m.skipMap = e.skipMap, m.init(c, d, i, {
                            enabled: !0
                        }), n();
                    }), f);
                }
                //Only allow undef on top level require calls
                return e = e || {}, mixin(f, {
                    isBrowser: isBrowser,
                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function(a) {
                        var d, e = a.lastIndexOf("."), f = a.split("/")[0], g = "." === f || ".." === f;
                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        return -1 !== e && (!g || e > 1) && (d = a.substring(e, a.length), a = a.substring(0, e)), 
                        u.nameToUrl(c(a, b && b.id, !0), d, !0);
                    },
                    defined: function(a) {
                        return hasProp(C, g(a, b, !1, !0).id);
                    },
                    specified: function(a) {
                        return a = g(a, b, !1, !0).id, hasProp(C, a) || hasProp(y, a);
                    }
                }), b || (f.undef = function(a) {
                    //Bind any waiting define() calls to this context,
                    //fix for #408
                    k();
                    var c = g(a, b, !0), e = getOwn(y, a);
                    d(a), delete C[a], delete D[c.url], delete A[a], //Clean queued defines too. Go backwards
                    //in array so that the splices do not
                    //mess up the iteration.
                    eachReverse(B, function(b, c) {
                        b[0] === a && B.splice(c, 1);
                    }), e && (//Hold on to listeners in case the
                    //module will be attempted to be reloaded
                    //using a different config.
                    e.events.defined && (A[a] = e.events), l(a));
                }), f;
            },
            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function(a) {
                var b = getOwn(y, a.id);
                b && h(a).enable();
            },
            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function(a) {
                var b, c, d, f = getOwn(x.shim, a) || {}, g = f.exports;
                for (k(); B.length; ) {
                    if (c = B.shift(), null === c[0]) {
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (c[0] = a, b) break;
                        b = !0;
                    } else c[0] === a && (//Found matching define call for this script!
                    b = !0);
                    o(c);
                }
                if (//Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                d = getOwn(y, a), !b && !hasProp(C, a) && d && !d.inited) {
                    if (!(!x.enforceDefine || g && getGlobal(g))) return e(a) ? void 0 : j(makeError("nodefine", "No define call for " + a, null, [ a ]));
                    //A script that does not call define(), so just simulate
                    //the call for it.
                    o([ a, f.deps || [], f.exportsFn ]);
                }
                n();
            },
            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function(a, b, c) {
                var d, e, f, g, h, i, j, k = getOwn(x.pkgs, a);
                if (k && (a = k), j = getOwn(E, a)) return u.nameToUrl(j, b, c);
                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(a)) //Just a plain path, not module name lookup, so just return it.
                //Add extension if it is included. This is a bit wonky, only non-.js things pass
                //an extension, this method probably needs to be reworked.
                h = a + (b || ""); else {
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (//A module that needs to be converted to a path.
                    d = x.paths, e = a.split("/"), f = e.length; f > 0; f -= 1) if (g = e.slice(0, f).join("/"), 
                    i = getOwn(d, g)) {
                        //If an array, it means there are a few choices,
                        //Choose the one that is desired
                        isArray(i) && (i = i[0]), e.splice(0, f, i);
                        break;
                    }
                    //Join the path parts together, then figure out if baseUrl is needed.
                    h = e.join("/"), h += b || (/^data\:|\?/.test(h) || c ? "" : ".js"), h = ("/" === h.charAt(0) || h.match(/^[\w\+\.\-]+:/) ? "" : x.baseUrl) + h;
                }
                return x.urlArgs ? h + ((-1 === h.indexOf("?") ? "?" : "&") + x.urlArgs) : h;
            },
            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function(a, b) {
                req.load(u, a, b);
            },
            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function(a, b, c, d) {
                return b.apply(d, c);
            },
            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function(a) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if ("load" === a.type || readyRegExp.test((a.currentTarget || a.srcElement).readyState)) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;
                    //Pull out the name of the module and the context.
                    var b = q(a);
                    u.completeLoad(b.id);
                }
            },
            /**
             * Callback for script errors.
             */
            onScriptError: function(a) {
                var b = q(a);
                return e(b.id) ? void 0 : j(makeError("scripterror", "Script error for: " + b.id, a, [ b.id ]));
            }
        }, u.require = u.makeRequire(), u;
    }
    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(a) {
            return "interactive" === a.readyState ? interactiveScript = a : void 0;
        }), interactiveScript);
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.11", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, apsp = ap.splice, isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, //PS3 indicates loaded and complete, but need to wait for complete
    //specifically. Sequence is 'loading', 'loaded', execution,
    // then 'complete'. The UA check is unfortunate, but not sure how
    //to feature test w/o causing perf issues.
    readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
    isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) //Do not overwrite and existing requirejs instance.
            return;
            cfg = requirejs, requirejs = void 0;
        }
        //Allow for a require config object
        "undefined" == typeof require || isFunction(require) || (//assume it is a config object.
        cfg = require, require = void 0), /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
        req = requirejs = function(a, b, c, d) {
            //Find the right context, use default
            var e, f, g = defContextName;
            // Determine if have config object in the call.
            // deps is a config object
            // Adjust args if there are dependencies
            return isArray(a) || "string" == typeof a || (f = a, isArray(b) ? (a = b, b = c, 
            c = d) : a = []), f && f.context && (g = f.context), e = getOwn(contexts, g), e || (e = contexts[g] = req.s.newContext(g)), 
            f && e.configure(f), e.require(a, b, c);
        }, /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
        req.config = function(a) {
            return req(a);
        }, /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
        req.nextTick = "undefined" != typeof setTimeout ? function(a) {
            setTimeout(a, 4);
        } : function(a) {
            a();
        }, /**
     * Export require as a global, but only if it does not already exist.
     */
        require || (require = req), req.version = version, //Used to filter out dependencies that are already paths.
        req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, //Create default context.
        req({}), //Exports some context-sensitive methods on global require.
        each([ "toUrl", "undef", "defined", "specified" ], function(a) {
            //Reference from contexts instead of early binding to default context,
            //so that during builds, the latest instance of the default context
            //with its config gets used.
            req[a] = function() {
                var b = contexts[defContextName];
                return b.require[a].apply(b, arguments);
            };
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), 
        /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
        req.onError = defaultOnError, /**
     * Creates the node for the load command. Only used in browser envs.
     */
        req.createNode = function(a, b, c) {
            var d = a.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return d.type = a.scriptType || "text/javascript", d.charset = "utf-8", d.async = !0, 
            d;
        }, /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
        req.load = function(a, b, c) {
            var d, e = a && a.config || {};
            if (isBrowser) //In the browser so use a script tag
            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            //Probably IE. IE (at least 6-8) do not fire
            //script onload right after executing the script, so
            //we cannot tie the anonymous define call to a name.
            //However, IE reports the script as being in 'interactive'
            //readyState at the time of the define call.
            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            return d = req.createNode(e, b, c), d.setAttribute("data-requirecontext", a.contextName), 
            d.setAttribute("data-requiremodule", b), !d.attachEvent || d.attachEvent.toString && d.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (d.addEventListener("load", a.onScriptLoad, !1), 
            d.addEventListener("error", a.onScriptError, !1)) : (useInteractive = !0, d.attachEvent("onreadystatechange", a.onScriptLoad)), 
            d.src = c, currentlyAddingScript = d, baseElement ? head.insertBefore(d, baseElement) : head.appendChild(d), 
            currentlyAddingScript = null, d;
            if (isWebWorker) try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation that a build has been done so that
                //only one script needs to be loaded anyway. This may need to be
                //reevaluated if other use cases become common.
                importScripts(c), //Account for anonymous modules
                a.completeLoad(b);
            } catch (f) {
                a.onError(makeError("importscripts", "importScripts failed for " + b + " at " + c, f, [ b ]));
            }
        }, //Look for a data-main script attribute, which could also adjust the baseUrl.
        isBrowser && !cfg.skipDataMain && //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function(a) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            //Preserve dataMain in case it is a path (i.e. contains '?')
            //Set final baseUrl if there is not already an explicit one.
            //Pull off the directory of data-main for use as the
            //baseUrl.
            //Strip off any trailing .js since mainScript is now
            //like a module name.
            //If mainScript is still a path, fall back to dataMain
            //Put the data-main script in the files to load.
            return head || (head = a.parentNode), dataMain = a.getAttribute("data-main"), dataMain ? (mainScript = dataMain, 
            cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", 
            cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), 
            cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [ mainScript ], !0) : void 0;
        }), /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
        define = function(a, b, c) {
            var d, e;
            //Allow for anonymous modules
            "string" != typeof a && (//Adjust args appropriately
            c = b, b = a, a = null), //This module may not have dependencies
            isArray(b) || (c = b, b = null), //If no name, and callback is a function, then figure out if it a
            //CommonJS thing with dependencies.
            !b && isFunction(c) && (b = [], //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            c.length && (c.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(a, c) {
                b.push(c);
            }), //May be a CommonJS thing even without require calls, but still
            //could use exports, and module. Avoid doing exports and module
            //work though if it just needs require.
            //REQUIRES the function to expect the CommonJS variables in the
            //order listed below.
            b = (1 === c.length ? [ "require" ] : [ "require", "exports", "module" ]).concat(b))), 
            //If in IE 6-8 and hit an anonymous define() call, do the interactive
            //work.
            useInteractive && (d = currentlyAddingScript || getInteractiveScript(), d && (a || (a = d.getAttribute("data-requiremodule")), 
            e = contexts[d.getAttribute("data-requirecontext")])), //Always save off evaluating the def call until the script onload handler.
            //This allows multiple modules to be in a file without prematurely
            //tracing dependencies, and allows for anonymous module support,
            //where the module name is not known until the script onload event
            //occurs. If no context, use the global queue, and get it processed
            //in the onscript load callback.
            (e ? e.defQueue : globalDefQueue).push([ a, b, c ]);
        }, define.amd = {
            jQuery: !0
        }, /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
        req.exec = function(text) {
            /*jslint evil: true */
            return eval(text);
        }, //Set up with config info.
        req(cfg);
    }
}(this), //配置
require.config({
    //基础路径
    baseUrl: "/src/js/",
    //配置路径
    paths: {
        "class": "common/class",
        events: "common/events",
        aspect: "common/aspect",
        attrs: "common/attrs",
        base: "common/base",
        $: "libs/jquery",
        github: "http://somesayss.github.io/src/js"
    },
    //插件
    shim: {
        $: {
            exports: "jQuery"
        }
    }
});