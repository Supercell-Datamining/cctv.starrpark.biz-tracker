var Ba = Object.defineProperty,
    ja = Object.defineProperties;
var La = Object.getOwnPropertyDescriptors;
var Rn = Object.getOwnPropertySymbols;
var Yo = Object.prototype.hasOwnProperty,
    Wo = Object.prototype.propertyIsEnumerable;
var xr = (e, n, t) => n in e ? Ba(e, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[n] = t,
    ye = (e, n) => {
        for (var t in n || (n = {})) Yo.call(n, t) && xr(e, t, n[t]);
        if (Rn)
            for (var t of Rn(n)) Wo.call(n, t) && xr(e, t, n[t]);
        return e
    },
    ht = (e, n) => ja(e, La(n));
var qo = (e, n) => {
    var t = {};
    for (var o in e) Yo.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]);
    if (e != null && Rn)
        for (var o of Rn(e)) n.indexOf(o) < 0 && Wo.call(e, o) && (t[o] = e[o]);
    return t
};
var Qo = (e, n, t) => (xr(e, typeof n != "symbol" ? n + "" : n, t), t);
(function() {
    const n = document.createElement("link").relList;
    if (n && n.supports && n.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) o(i);
    new MutationObserver(i => {
        for (const s of i)
            if (s.type === "childList")
                for (const l of s.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && o(l)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function t(i) {
        const s = {};
        return i.integrity && (s.integrity = i.integrity), i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? s.credentials = "include" : i.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s
    }

    function o(i) {
        if (i.ep) return;
        i.ep = !0;
        const s = t(i);
        fetch(i.href, s)
    }
})();
const Ra = {
        context: void 0,
        registry: void 0
    },
    Va = (e, n) => e === n,
    Be = Symbol("solid-proxy"),
    Hr = Symbol("solid-track"),
    Na = Symbol("solid-dev-component"),
    Jn = {
        equals: Va
    };
let qi = ts;
const ft = 1,
    Xn = 2,
    Qi = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var ee = null;
let Sr = null,
    ae = null,
    me = null,
    Ge = null,
    sr = 0;

function qn(e, n) {
    const t = ae,
        o = ee,
        i = e.length === 0,
        s = n === void 0 ? o : n,
        l = i ? Qi : {
            owned: null,
            cleanups: null,
            context: s ? s.context : null,
            owner: s
        },
        c = i ? e : () => e(() => fe(() => lr(l)));
    ee = l, ae = null;
    try {
        return Ft(c, !0)
    } finally {
        ae = t, ee = o
    }
}

function W(e, n) {
    n = n ? Object.assign({}, Jn, n) : Jn;
    const t = {
            value: e,
            observers: null,
            observerSlots: null,
            comparator: n.equals || void 0
        },
        o = i => (typeof i == "function" && (i = i(t.value)), es(t, i));
    return [Xi.bind(t), o]
}

function X(e, n, t) {
    const o = so(e, n, !1, ft);
    _n(o)
}

function pe(e, n, t) {
    qi = Ga;
    const o = so(e, n, !1, ft),
        i = Ko && Ki(Ko);
    i && (o.suspense = i), (!t || !t.render) && (o.user = !0), Ge ? Ge.push(o) : _n(o)
}

function ke(e, n, t) {
    t = t ? Object.assign({}, Jn, t) : Jn;
    const o = so(e, n, !0, 0);
    return o.observers = null, o.observerSlots = null, o.comparator = t.equals || void 0, _n(o), Xi.bind(o)
}

function ar(e) {
    return Ft(e, !1)
}

function fe(e) {
    if (ae === null) return e();
    const n = ae;
    ae = null;
    try {
        return e()
    } finally {
        ae = n
    }
}

function za(e, n, t) {
    const o = Array.isArray(e);
    let i, s = t && t.defer;
    return l => {
        let c;
        if (o) {
            c = Array(e.length);
            for (let f = 0; f < e.length; f++) c[f] = e[f]()
        } else c = e();
        if (s) {
            s = !1;
            return
        }
        const u = fe(() => n(c, i, l));
        return i = c, u
    }
}

function mn(e) {
    pe(() => fe(e))
}

function Ae(e) {
    return ee === null || (ee.cleanups === null ? ee.cleanups = [e] : ee.cleanups.push(e)), e
}

function er() {
    return ae
}

function Ua(e, n) {
    const t = Symbol("context");
    return {
        id: t,
        Provider: Ya(t),
        defaultValue: e
    }
}

function Ki(e) {
    return ee && ee.context && ee.context[e.id] !== void 0 ? ee.context[e.id] : e.defaultValue
}

function Ji(e) {
    const n = ke(e),
        t = ke(() => Fr(n()));
    return t.toArray = () => {
        const o = t();
        return Array.isArray(o) ? o : o != null ? [o] : []
    }, t
}
let Ko;

function Xi() {
    if (this.sources && this.state)
        if (this.state === ft) _n(this);
        else {
            const e = me;
            me = null, Ft(() => nr(this), !1), me = e
        } if (ae) {
        const e = this.observers ? this.observers.length : 0;
        ae.sources ? (ae.sources.push(this), ae.sourceSlots.push(e)) : (ae.sources = [this], ae.sourceSlots = [e]), this.observers ? (this.observers.push(ae), this.observerSlots.push(ae.sources.length - 1)) : (this.observers = [ae], this.observerSlots = [ae.sources.length - 1])
    }
    return this.value
}

function es(e, n, t) {
    let o = e.value;
    return (!e.comparator || !e.comparator(o, n)) && (e.value = n, e.observers && e.observers.length && Ft(() => {
        for (let i = 0; i < e.observers.length; i += 1) {
            const s = e.observers[i],
                l = Sr && Sr.running;
            l && Sr.disposed.has(s), (l ? !s.tState : !s.state) && (s.pure ? me.push(s) : Ge.push(s), s.observers && ns(s)), l || (s.state = ft)
        }
        if (me.length > 1e6) throw me = [], new Error
    }, !1)), n
}

function _n(e) {
    if (!e.fn) return;
    lr(e);
    const n = ee,
        t = ae,
        o = sr;
    ae = ee = e, Ha(e, e.value, o), ae = t, ee = n
}

function Ha(e, n, t) {
    let o;
    try {
        o = e.fn(n)
    } catch (i) {
        return e.pure && (e.state = ft, e.owned && e.owned.forEach(lr), e.owned = null), e.updatedAt = t + 1, rs(i)
    }(!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? es(e, o) : e.value = o, e.updatedAt = t)
}

function so(e, n, t, o = ft, i) {
    const s = {
        fn: e,
        state: o,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: n,
        owner: ee,
        context: ee ? ee.context : null,
        pure: t
    };
    return ee === null || ee !== Qi && (ee.owned ? ee.owned.push(s) : ee.owned = [s]), s
}

function tr(e) {
    if (e.state === 0) return;
    if (e.state === Xn) return nr(e);
    if (e.suspense && fe(e.suspense.inFallback)) return e.suspense.effects.push(e);
    const n = [e];
    for (;
        (e = e.owner) && (!e.updatedAt || e.updatedAt < sr);) e.state && n.push(e);
    for (let t = n.length - 1; t >= 0; t--)
        if (e = n[t], e.state === ft) _n(e);
        else if (e.state === Xn) {
        const o = me;
        me = null, Ft(() => nr(e, n[0]), !1), me = o
    }
}

function Ft(e, n) {
    if (me) return e();
    let t = !1;
    n || (me = []), Ge ? t = !0 : Ge = [], sr++;
    try {
        const o = e();
        return Fa(t), o
    } catch (o) {
        t || (Ge = null), me = null, rs(o)
    }
}

function Fa(e) {
    if (me && (ts(me), me = null), e) return;
    const n = Ge;
    Ge = null, n.length && Ft(() => qi(n), !1)
}

function ts(e) {
    for (let n = 0; n < e.length; n++) tr(e[n])
}

function Ga(e) {
    let n, t = 0;
    for (n = 0; n < e.length; n++) {
        const o = e[n];
        o.user ? e[t++] = o : tr(o)
    }
    for (n = 0; n < t; n++) tr(e[n])
}

function nr(e, n) {
    e.state = 0;
    for (let t = 0; t < e.sources.length; t += 1) {
        const o = e.sources[t];
        if (o.sources) {
            const i = o.state;
            i === ft ? o !== n && (!o.updatedAt || o.updatedAt < sr) && tr(o) : i === Xn && nr(o, n)
        }
    }
}

function ns(e) {
    for (let n = 0; n < e.observers.length; n += 1) {
        const t = e.observers[n];
        t.state || (t.state = Xn, t.pure ? me.push(t) : Ge.push(t), t.observers && ns(t))
    }
}

function lr(e) {
    let n;
    if (e.sources)
        for (; e.sources.length;) {
            const t = e.sources.pop(),
                o = e.sourceSlots.pop(),
                i = t.observers;
            if (i && i.length) {
                const s = i.pop(),
                    l = t.observerSlots.pop();
                o < i.length && (s.sourceSlots[l] = o, i[o] = s, t.observerSlots[o] = l)
            }
        }
    if (e.owned) {
        for (n = e.owned.length - 1; n >= 0; n--) lr(e.owned[n]);
        e.owned = null
    }
    if (e.cleanups) {
        for (n = e.cleanups.length - 1; n >= 0; n--) e.cleanups[n]();
        e.cleanups = null
    }
    e.state = 0
}

function Za(e) {
    return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
        cause: e
    })
}

function rs(e, n = ee) {
    throw Za(e)
}

function Fr(e) {
    if (typeof e == "function" && !e.length) return Fr(e());
    if (Array.isArray(e)) {
        const n = [];
        for (let t = 0; t < e.length; t++) {
            const o = Fr(e[t]);
            Array.isArray(o) ? n.push.apply(n, o) : n.push(o)
        }
        return n
    }
    return e
}

function Ya(e, n) {
    return function(o) {
        let i;
        return X(() => i = fe(() => (ee.context = ht(ye({}, ee.context), {
            [e]: o.value
        }), Ji(() => o.children))), void 0), i
    }
}
const Wa = Symbol("fallback");

function Jo(e) {
    for (let n = 0; n < e.length; n++) e[n]()
}

function qa(e, n, t = {}) {
    let o = [],
        i = [],
        s = [],
        l = 0,
        c = n.length > 1 ? [] : null;
    return Ae(() => Jo(s)), () => {
        let u = e() || [],
            f, p;
        return u[Hr], fe(() => {
            let a = u.length,
                d, v, g, m, h, y, w, b, P;
            if (a === 0) l !== 0 && (Jo(s), s = [], o = [], i = [], l = 0, c && (c = [])), t.fallback && (o = [Wa], i[0] = qn(z => (s[0] = z, t.fallback())), l = 1);
            else if (l === 0) {
                for (i = new Array(a), p = 0; p < a; p++) o[p] = u[p], i[p] = qn(r);
                l = a
            } else {
                for (g = new Array(a), m = new Array(a), c && (h = new Array(a)), y = 0, w = Math.min(l, a); y < w && o[y] === u[y]; y++);
                for (w = l - 1, b = a - 1; w >= y && b >= y && o[w] === u[b]; w--, b--) g[b] = i[w], m[b] = s[w], c && (h[b] = c[w]);
                for (d = new Map, v = new Array(b + 1), p = b; p >= y; p--) P = u[p], f = d.get(P), v[p] = f === void 0 ? -1 : f, d.set(P, p);
                for (f = y; f <= w; f++) P = o[f], p = d.get(P), p !== void 0 && p !== -1 ? (g[p] = i[f], m[p] = s[f], c && (h[p] = c[f]), p = v[p], d.set(P, p)) : s[f]();
                for (p = y; p < a; p++) p in g ? (i[p] = g[p], s[p] = m[p], c && (c[p] = h[p], c[p](p))) : i[p] = qn(r);
                i = i.slice(0, l = a), o = u.slice(0)
            }
            return i
        });

        function r(a) {
            if (s[p] = a, c) {
                const [d, v] = W(p);
                return c[p] = v, n(u[p], d)
            }
            return n(u[p])
        }
    }
}

function S(e, n) {
    return fe(() => e(n || {}))
}

function Vn() {
    return !0
}
const Gr = {
    get(e, n, t) {
        return n === Be ? t : e.get(n)
    },
    has(e, n) {
        return n === Be ? !0 : e.has(n)
    },
    set: Vn,
    deleteProperty: Vn,
    getOwnPropertyDescriptor(e, n) {
        return {
            configurable: !0,
            enumerable: !0,
            get() {
                return e.get(n)
            },
            set: Vn,
            deleteProperty: Vn
        }
    },
    ownKeys(e) {
        return e.keys()
    }
};

function Tr(e) {
    return (e = typeof e == "function" ? e() : e) ? e : {}
}

function Qa() {
    for (let e = 0, n = this.length; e < n; ++e) {
        const t = this[e]();
        if (t !== void 0) return t
    }
}

function Ka(...e) {
    let n = !1;
    for (let s = 0; s < e.length; s++) {
        const l = e[s];
        n = n || !!l && Be in l, e[s] = typeof l == "function" ? (n = !0, ke(l)) : l
    }
    if (n) return new Proxy({
        get(s) {
            for (let l = e.length - 1; l >= 0; l--) {
                const c = Tr(e[l])[s];
                if (c !== void 0) return c
            }
        },
        has(s) {
            for (let l = e.length - 1; l >= 0; l--)
                if (s in Tr(e[l])) return !0;
            return !1
        },
        keys() {
            const s = [];
            for (let l = 0; l < e.length; l++) s.push(...Object.keys(Tr(e[l])));
            return [...new Set(s)]
        }
    }, Gr);
    const t = {},
        o = {},
        i = new Set;
    for (let s = e.length - 1; s >= 0; s--) {
        const l = e[s];
        if (!l) continue;
        const c = Object.getOwnPropertyNames(l);
        for (let u = 0, f = c.length; u < f; u++) {
            const p = c[u];
            if (p === "__proto__" || p === "constructor") continue;
            const r = Object.getOwnPropertyDescriptor(l, p);
            if (!i.has(p)) r.get ? (i.add(p), Object.defineProperty(t, p, {
                enumerable: !0,
                configurable: !0,
                get: Qa.bind(o[p] = [r.get.bind(l)])
            })) : (r.value !== void 0 && i.add(p), t[p] = r.value);
            else {
                const a = o[p];
                a ? r.get ? a.push(r.get.bind(l)) : r.value !== void 0 && a.push(() => r.value) : t[p] === void 0 && (t[p] = r.value)
            }
        }
    }
    return t
}

function ao(e, ...n) {
    if (Be in e) {
        const i = new Set(n.length > 1 ? n.flat() : n[0]),
            s = n.map(l => new Proxy({
                get(c) {
                    return l.includes(c) ? e[c] : void 0
                },
                has(c) {
                    return l.includes(c) && c in e
                },
                keys() {
                    return l.filter(c => c in e)
                }
            }, Gr));
        return s.push(new Proxy({
            get(l) {
                return i.has(l) ? void 0 : e[l]
            },
            has(l) {
                return i.has(l) ? !1 : l in e
            },
            keys() {
                return Object.keys(e).filter(l => !i.has(l))
            }
        }, Gr)), s
    }
    const t = {},
        o = n.map(() => ({}));
    for (const i of Object.getOwnPropertyNames(e)) {
        const s = Object.getOwnPropertyDescriptor(e, i),
            l = !s.get && !s.set && s.enumerable && s.writable && s.configurable;
        let c = !1,
            u = 0;
        for (const f of n) f.includes(i) && (c = !0, l ? o[u][i] = s.value : Object.defineProperty(o[u], i, s)), ++u;
        c || (l ? t[i] = s.value : Object.defineProperty(t, i, s))
    }
    return [...o, t]
}
let Ja = 0;

function os() {
    const e = Ra.context;
    return e ? "".concat(e.id).concat(e.count++) : "cl-".concat(Ja++)
}
const is = e => "Stale read from <".concat(e, ">.");

function lo(e) {
    const n = "fallback" in e && {
        fallback: () => e.fallback
    };
    return ke(qa(() => e.each, e.children, n || void 0))
}

function Ve(e) {
    const n = e.keyed,
        t = ke(() => e.when, void 0, {
            equals: (o, i) => n ? o === i : !o == !i
        });
    return ke(() => {
        const o = t();
        if (o) {
            const i = e.children;
            return typeof i == "function" && i.length > 0 ? fe(() => i(n ? o : () => {
                if (!fe(t)) throw is("Show");
                return e.when
            })) : i
        }
        return e.fallback
    }, void 0, void 0)
}

function ss(e) {
    let n = !1;
    const t = (s, l) => s[0] === l[0] && (n ? s[1] === l[1] : !s[1] == !l[1]) && s[2] === l[2],
        o = Ji(() => e.children),
        i = ke(() => {
            let s = o();
            Array.isArray(s) || (s = [s]);
            for (let l = 0; l < s.length; l++) {
                const c = s[l].when;
                if (c) return n = !!s[l].keyed, [l, c, s[l]]
            }
            return [-1]
        }, void 0, {
            equals: t
        });
    return ke(() => {
        const [s, l, c] = i();
        if (s < 0) return e.fallback;
        const u = c.children;
        return typeof u == "function" && u.length > 0 ? fe(() => u(n ? l : () => {
            if (fe(i)[0] !== s) throw is("Match");
            return c.when
        })) : u
    }, void 0, void 0)
}

function Bt(e) {
    return e
}
const Xa = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"],
    el = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Xa]),
    tl = new Set(["innerHTML", "textContent", "innerText", "children"]),
    nl = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    }),
    rl = Object.assign(Object.create(null), {
        class: "className",
        formnovalidate: {
            $: "formNoValidate",
            BUTTON: 1,
            INPUT: 1
        },
        ismap: {
            $: "isMap",
            IMG: 1
        },
        nomodule: {
            $: "noModule",
            SCRIPT: 1
        },
        playsinline: {
            $: "playsInline",
            VIDEO: 1
        },
        readonly: {
            $: "readOnly",
            INPUT: 1,
            TEXTAREA: 1
        }
    });

function ol(e, n) {
    const t = rl[e];
    return typeof t == "object" ? t[n] ? t.$ : void 0 : t
}
const il = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
    sl = new Set(["altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use", "view", "vkern"]),
    al = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };

function ll(e, n, t) {
    let o = t.length,
        i = n.length,
        s = o,
        l = 0,
        c = 0,
        u = n[i - 1].nextSibling,
        f = null;
    for (; l < i || c < s;) {
        if (n[l] === t[c]) {
            l++, c++;
            continue
        }
        for (; n[i - 1] === t[s - 1];) i--, s--;
        if (i === l) {
            const p = s < o ? c ? t[c - 1].nextSibling : t[s - c] : u;
            for (; c < s;) e.insertBefore(t[c++], p)
        } else if (s === c)
            for (; l < i;)(!f || !f.has(n[l])) && n[l].remove(), l++;
        else if (n[l] === t[s - 1] && t[c] === n[i - 1]) {
            const p = n[--i].nextSibling;
            e.insertBefore(t[c++], n[l++].nextSibling), e.insertBefore(t[--s], p), n[i] = t[s]
        } else {
            if (!f) {
                f = new Map;
                let r = c;
                for (; r < s;) f.set(t[r], r++)
            }
            const p = f.get(n[l]);
            if (p != null)
                if (c < p && p < s) {
                    let r = l,
                        a = 1,
                        d;
                    for (; ++r < i && r < s && !((d = f.get(n[r])) == null || d !== p + a);) a++;
                    if (a > p - c) {
                        const v = n[l];
                        for (; c < p;) e.insertBefore(t[c++], v)
                    } else e.replaceChild(t[c++], n[l++])
                } else l++;
            else n[l++].remove()
        }
    }
}
const Xo = "_$DX_DELEGATE";

function cl(e, n, t, o = {}) {
    let i;
    return qn(s => {
        i = s, n === document ? e() : D(n, e(), n.firstChild ? null : void 0, t)
    }, o.owner), () => {
        i(), n.textContent = ""
    }
}

function N(e, n, t) {
    let o;
    const i = () => {
            const l = document.createElement("template");
            return l.innerHTML = e, t ? l.content.firstChild.firstChild : l.content.firstChild
        },
        s = n ? () => fe(() => document.importNode(o || (o = i()), !0)) : () => (o || (o = i())).cloneNode(!0);
    return s.cloneNode = s, s
}

function $e(e, n = window.document) {
    const t = n[Xo] || (n[Xo] = new Set);
    for (let o = 0, i = e.length; o < i; o++) {
        const s = e[o];
        t.has(s) || (t.add(s), n.addEventListener(s, hl))
    }
}

function ce(e, n, t) {
    t == null ? e.removeAttribute(n) : e.setAttribute(n, t)
}

function ul(e, n, t, o) {
    o == null ? e.removeAttributeNS(n, t) : e.setAttributeNS(n, t, o)
}

function te(e, n) {
    n == null ? e.removeAttribute("class") : e.className = n
}

function fl(e, n, t, o) {
    if (o) Array.isArray(t) ? (e["$$".concat(n)] = t[0], e["$$".concat(n, "Data")] = t[1]) : e["$$".concat(n)] = t;
    else if (Array.isArray(t)) {
        const i = t[0];
        e.addEventListener(n, t[0] = s => i.call(e, t[1], s))
    } else e.addEventListener(n, t)
}

function dl(e, n, t = {}) {
    const o = Object.keys(n || {}),
        i = Object.keys(t);
    let s, l;
    for (s = 0, l = i.length; s < l; s++) {
        const c = i[s];
        !c || c === "undefined" || n[c] || (ei(e, c, !1), delete t[c])
    }
    for (s = 0, l = o.length; s < l; s++) {
        const c = o[s],
            u = !!n[c];
        !c || c === "undefined" || t[c] === u || !u || (ei(e, c, !0), t[c] = u)
    }
    return t
}

function pl(e, n, t) {
    if (!n) return t ? ce(e, "style") : n;
    const o = e.style;
    if (typeof n == "string") return o.cssText = n;
    typeof t == "string" && (o.cssText = t = void 0), t || (t = {}), n || (n = {});
    let i, s;
    for (s in t) n[s] == null && o.removeProperty(s), delete t[s];
    for (s in n) i = n[s], i !== t[s] && (o.setProperty(s, i), t[s] = i);
    return t
}

function We(e, n = {}, t, o) {
    const i = {};
    return o || X(() => i.children = Vt(e, n.children, i.children)), X(() => n.ref && n.ref(e)), X(() => gl(e, n, t, !0, i, !0)), i
}

function Ee(e, n, t) {
    return fe(() => e(n, t))
}

function D(e, n, t, o) {
    if (t !== void 0 && !o && (o = []), typeof n != "function") return Vt(e, n, o, t);
    X(i => Vt(e, n(), i, t), o)
}

function gl(e, n, t, o, i = {}, s = !1) {
    n || (n = {});
    for (const l in i)
        if (!(l in n)) {
            if (l === "children") continue;
            i[l] = ti(e, l, null, i[l], t, s)
        } for (const l in n) {
        if (l === "children") {
            o || Vt(e, n.children);
            continue
        }
        const c = n[l];
        i[l] = ti(e, l, c, i[l], t, s)
    }
}

function vl(e) {
    return e.toLowerCase().replace(/-([a-z])/g, (n, t) => t.toUpperCase())
}

function ei(e, n, t) {
    const o = n.trim().split(/\s+/);
    for (let i = 0, s = o.length; i < s; i++) e.classList.toggle(o[i], t)
}

function ti(e, n, t, o, i, s) {
    let l, c, u, f, p;
    if (n === "style") return pl(e, t, o);
    if (n === "classList") return dl(e, t, o);
    if (t === o) return o;
    if (n === "ref") s || t(e);
    else if (n.slice(0, 3) === "on:") {
        const r = n.slice(3);
        o && e.removeEventListener(r, o), t && e.addEventListener(r, t)
    } else if (n.slice(0, 10) === "oncapture:") {
        const r = n.slice(10);
        o && e.removeEventListener(r, o, !0), t && e.addEventListener(r, t, !0)
    } else if (n.slice(0, 2) === "on") {
        const r = n.slice(2).toLowerCase(),
            a = il.has(r);
        if (!a && o) {
            const d = Array.isArray(o) ? o[0] : o;
            e.removeEventListener(r, d)
        }(a || t) && (fl(e, r, t, a), a && $e([r]))
    } else if (n.slice(0, 5) === "attr:") ce(e, n.slice(5), t);
    else if ((p = n.slice(0, 5) === "prop:") || (u = tl.has(n)) || !i && ((f = ol(n, e.tagName)) || (c = el.has(n))) || (l = e.nodeName.includes("-"))) p && (n = n.slice(5), c = !0), n === "class" || n === "className" ? te(e, t) : l && !c && !u ? e[vl(n)] = t : e[f || n] = t;
    else {
        const r = i && n.indexOf(":") > -1 && al[n.split(":")[0]];
        r ? ul(e, r, n, t) : ce(e, nl[n] || n, t)
    }
    return t
}

function hl(e) {
    const n = "$$".concat(e.type);
    let t = e.composedPath && e.composedPath()[0] || e.target;
    for (e.target !== t && Object.defineProperty(e, "target", {
            configurable: !0,
            value: t
        }), Object.defineProperty(e, "currentTarget", {
            configurable: !0,
            get() {
                return t || document
            }
        }); t;) {
        const o = t[n];
        if (o && !t.disabled) {
            const i = t["".concat(n, "Data")];
            if (i !== void 0 ? o.call(t, i, e) : o.call(t, e), e.cancelBubble) return
        }
        t = t._$host || t.parentNode || t.host
    }
}

function Vt(e, n, t, o, i) {
    for (; typeof t == "function";) t = t();
    if (n === t) return t;
    const s = typeof n,
        l = o !== void 0;
    if (e = l && t[0] && t[0].parentNode || e, s === "string" || s === "number")
        if (s === "number" && (n = n.toString()), l) {
            let c = t[0];
            c && c.nodeType === 3 ? c.data = n : c = document.createTextNode(n), t = Dt(e, t, o, c)
        } else t !== "" && typeof t == "string" ? t = e.firstChild.data = n : t = e.textContent = n;
    else if (n == null || s === "boolean") t = Dt(e, t, o);
    else {
        if (s === "function") return X(() => {
            let c = n();
            for (; typeof c == "function";) c = c();
            t = Vt(e, c, t, o)
        }), () => t;
        if (Array.isArray(n)) {
            const c = [],
                u = t && Array.isArray(t);
            if (Zr(c, n, t, i)) return X(() => t = Vt(e, c, t, o, !0)), () => t;
            if (c.length === 0) {
                if (t = Dt(e, t, o), l) return t
            } else u ? t.length === 0 ? ni(e, c, o) : ll(e, t, c) : (t && Dt(e), ni(e, c));
            t = c
        } else if (n.nodeType) {
            if (Array.isArray(t)) {
                if (l) return t = Dt(e, t, o, n);
                Dt(e, t, null, n)
            } else t == null || t === "" || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
            t = n
        } else console.warn("Unrecognized value. Skipped inserting", n)
    }
    return t
}

function Zr(e, n, t, o) {
    let i = !1;
    for (let s = 0, l = n.length; s < l; s++) {
        let c = n[s],
            u = t && t[s],
            f;
        if (!(c == null || c === !0 || c === !1))
            if ((f = typeof c) == "object" && c.nodeType) e.push(c);
            else if (Array.isArray(c)) i = Zr(e, c, u) || i;
        else if (f === "function")
            if (o) {
                for (; typeof c == "function";) c = c();
                i = Zr(e, Array.isArray(c) ? c : [c], Array.isArray(u) ? u : [u]) || i
            } else e.push(c), i = !0;
        else {
            const p = String(c);
            u && u.nodeType === 3 && u.data === p ? e.push(u) : e.push(document.createTextNode(p))
        }
    }
    return i
}

function ni(e, n, t = null) {
    for (let o = 0, i = n.length; o < i; o++) e.insertBefore(n[o], t)
}

function Dt(e, n, t, o) {
    if (t === void 0) return e.textContent = "";
    const i = o || document.createTextNode("");
    if (n.length) {
        let s = !1;
        for (let l = n.length - 1; l >= 0; l--) {
            const c = n[l];
            if (i !== c) {
                const u = c.parentNode === e;
                !s && !l ? u ? e.replaceChild(i, c) : e.insertBefore(i, t) : u && c.remove()
            } else s = !0
        }
    } else e.insertBefore(i, t);
    return [i]
}
const ml = "http://www.w3.org/2000/svg";

function _l(e, n = !1) {
    return n ? document.createElementNS(ml, e) : document.createElement(e)
}

function as(e) {
    const [n, t] = ao(e, ["component"]), o = ke(() => n.component);
    return ke(() => {
        const i = o();
        switch (typeof i) {
            case "function":
                return Object.assign(i, {
                    [Na]: !0
                }), fe(() => i(t));
            case "string":
                const s = sl.has(i),
                    l = _l(i, s);
                return We(l, t, s), l
        }
    })
}(function(e) {
    typeof globalThis != "object" && (this ? n() : (e.defineProperty(e.prototype, "_T_", {
        configurable: !0,
        get: n
    }), _T_));

    function n() {
        var t = this || self;
        t.globalThis = t, delete e.prototype._T_
    }
})(Object);
const Yr = Symbol("store-raw"),
    Lt = Symbol("store-node"),
    Ue = Symbol("store-has"),
    ls = Symbol("store-self");

function cs(e) {
    let n = e[Be];
    if (!n && (Object.defineProperty(e, Be, {
            value: n = new Proxy(e, wl)
        }), !Array.isArray(e))) {
        const t = Object.keys(e),
            o = Object.getOwnPropertyDescriptors(e);
        for (let i = 0, s = t.length; i < s; i++) {
            const l = t[i];
            o[l].get && Object.defineProperty(e, l, {
                enumerable: o[l].enumerable,
                get: o[l].get.bind(n)
            })
        }
    }
    return n
}

function lt(e) {
    let n;
    return e != null && typeof e == "object" && (e[Be] || !(n = Object.getPrototypeOf(e)) || n === Object.prototype || Array.isArray(e))
}

function Nt(e, n = new Set) {
    let t, o, i, s;
    if (t = e != null && e[Yr]) return t;
    if (!lt(e) || n.has(e)) return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : n.add(e);
        for (let l = 0, c = e.length; l < c; l++) i = e[l], (o = Nt(i, n)) !== i && (e[l] = o)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : n.add(e);
        const l = Object.keys(e),
            c = Object.getOwnPropertyDescriptors(e);
        for (let u = 0, f = l.length; u < f; u++) s = l[u], !c[s].get && (i = e[s], (o = Nt(i, n)) !== i && (e[s] = o))
    }
    return e
}

function rr(e, n) {
    let t = e[n];
    return t || Object.defineProperty(e, n, {
        value: t = Object.create(null)
    }), t
}

function cn(e, n, t) {
    if (e[n]) return e[n];
    const [o, i] = W(t, {
        equals: !1,
        internal: !0
    });
    return o.$ = i, e[n] = o
}

function yl(e, n) {
    const t = Reflect.getOwnPropertyDescriptor(e, n);
    return !t || t.get || !t.configurable || n === Be || n === Lt || (delete t.value, delete t.writable, t.get = () => e[Be][n]), t
}

function us(e) {
    er() && cn(rr(e, Lt), ls)()
}

function bl(e) {
    return us(e), Reflect.ownKeys(e)
}
const wl = {
    get(e, n, t) {
        if (n === Yr) return e;
        if (n === Be) return t;
        if (n === Hr) return us(e), t;
        const o = rr(e, Lt),
            i = o[n];
        let s = i ? i() : e[n];
        if (n === Lt || n === Ue || n === "__proto__") return s;
        if (!i) {
            const l = Object.getOwnPropertyDescriptor(e, n);
            er() && (typeof s != "function" || e.hasOwnProperty(n)) && !(l && l.get) && (s = cn(o, n, s)())
        }
        return lt(s) ? cs(s) : s
    },
    has(e, n) {
        return n === Yr || n === Be || n === Hr || n === Lt || n === Ue || n === "__proto__" ? !0 : (er() && cn(rr(e, Ue), n)(), n in e)
    },
    set() {
        return !0
    },
    deleteProperty() {
        return !0
    },
    ownKeys: bl,
    getOwnPropertyDescriptor: yl
};

function Pe(e, n, t, o = !1) {
    if (!o && e[n] === t) return;
    const i = e[n],
        s = e.length;
    t === void 0 ? (delete e[n], e[Ue] && e[Ue][n] && i !== void 0 && e[Ue][n].$()) : (e[n] = t, e[Ue] && e[Ue][n] && i === void 0 && e[Ue][n].$());
    let l = rr(e, Lt),
        c;
    if ((c = cn(l, n, i)) && c.$(() => t), Array.isArray(e) && e.length !== s) {
        for (let u = e.length; u < s; u++)(c = l[u]) && c.$();
        (c = cn(l, "length", s)) && c.$(e.length)
    }(c = l[ls]) && c.$()
}

function fs(e, n) {
    const t = Object.keys(n);
    for (let o = 0; o < t.length; o += 1) {
        const i = t[o];
        Pe(e, i, n[i])
    }
}

function Al(e, n) {
    if (typeof n == "function" && (n = n(e)), n = Nt(n), Array.isArray(n)) {
        if (e === n) return;
        let t = 0,
            o = n.length;
        for (; t < o; t++) {
            const i = n[t];
            e[t] !== i && Pe(e, t, i)
        }
        Pe(e, "length", o)
    } else fs(e, n)
}

function rn(e, n, t = []) {
    let o, i = e;
    if (n.length > 1) {
        o = n.shift();
        const l = typeof o,
            c = Array.isArray(e);
        if (Array.isArray(o)) {
            for (let u = 0; u < o.length; u++) rn(e, [o[u]].concat(n), t);
            return
        } else if (c && l === "function") {
            for (let u = 0; u < e.length; u++) o(e[u], u) && rn(e, [u].concat(n), t);
            return
        } else if (c && l === "object") {
            const {
                from: u = 0,
                to: f = e.length - 1,
                by: p = 1
            } = o;
            for (let r = u; r <= f; r += p) rn(e, [r].concat(n), t);
            return
        } else if (n.length > 1) {
            rn(e[o], n, [o].concat(t));
            return
        }
        i = e[o], t = [o].concat(t)
    }
    let s = n[0];
    typeof s == "function" && (s = s(i, t), s === i) || o === void 0 && s == null || (s = Nt(s), o === void 0 || lt(i) && lt(s) && !Array.isArray(s) ? fs(i, s) : Pe(e, o, s))
}

function Gt(...[e, n]) {
    const t = Nt(e || {}),
        o = Array.isArray(t),
        i = cs(t);

    function s(...l) {
        ar(() => {
            o && l.length === 1 ? Al(t, l[0]) : rn(t, l)
        })
    }
    return [i, s]
}
const Wr = Symbol("store-root");

function Mt(e, n, t, o, i) {
    const s = n[t];
    if (e === s) return;
    if (t !== Wr && (!lt(e) || !lt(s) || i && e[i] !== s[i])) {
        Pe(n, t, e);
        return
    }
    if (Array.isArray(e)) {
        if (e.length && s.length && (!o || i && e[0] && e[0][i] != null)) {
            let u, f, p, r, a, d, v, g;
            for (p = 0, r = Math.min(s.length, e.length); p < r && (s[p] === e[p] || i && s[p] && e[p] && s[p][i] === e[p][i]); p++) Mt(e[p], s, p, o, i);
            const m = new Array(e.length),
                h = new Map;
            for (r = s.length - 1, a = e.length - 1; r >= p && a >= p && (s[r] === e[a] || i && s[p] && e[p] && s[r][i] === e[a][i]); r--, a--) m[a] = s[r];
            if (p > a || p > r) {
                for (f = p; f <= a; f++) Pe(s, f, e[f]);
                for (; f < e.length; f++) Pe(s, f, m[f]), Mt(e[f], s, f, o, i);
                s.length > e.length && Pe(s, "length", e.length);
                return
            }
            for (v = new Array(a + 1), f = a; f >= p; f--) d = e[f], g = i && d ? d[i] : d, u = h.get(g), v[f] = u === void 0 ? -1 : u, h.set(g, f);
            for (u = p; u <= r; u++) d = s[u], g = i && d ? d[i] : d, f = h.get(g), f !== void 0 && f !== -1 && (m[f] = s[u], f = v[f], h.set(g, f));
            for (f = p; f < e.length; f++) f in m ? (Pe(s, f, m[f]), Mt(e[f], s, f, o, i)) : Pe(s, f, e[f])
        } else
            for (let u = 0, f = e.length; u < f; u++) Mt(e[u], s, u, o, i);
        s.length > e.length && Pe(s, "length", e.length);
        return
    }
    const l = Object.keys(e);
    for (let u = 0, f = l.length; u < f; u++) Mt(e[l[u]], s, l[u], o, i);
    const c = Object.keys(s);
    for (let u = 0, f = c.length; u < f; u++) e[c[u]] === void 0 && Pe(s, c[u], void 0)
}

function xl(e, n = {}) {
    const {
        merge: t,
        key: o = "id"
    } = n, i = Nt(e);
    return s => {
        if (!lt(s) || !lt(i)) return i;
        const l = Mt(i, {
            [Wr]: s
        }, Wr, t, o);
        return l === void 0 ? s : l
    }
}
const [Sl, qr] = Gt({
    mainApp: null
}), Tl = e => {
    qr(e === "home" || e === "security-tape-archives" || e === "timecoder" ? {
        mainApp: "terminal",
        terminalApp: e
    } : {
        mainApp: e,
        terminalApp: void 0
    })
}, kl = () => {
    qr({
        mainApp: null,
        terminalApp: void 0
    })
}, we = {
    currentOpenApp: Sl,
    openApp: Tl,
    closeApp: kl
};
var He = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};

function yn(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}

function rv(e) {
    if (e.__esModule) return e;
    var n = e.default;
    if (typeof n == "function") {
        var t = function o() {
            return this instanceof o ? Reflect.construct(n, arguments, this.constructor) : n.apply(this, arguments)
        };
        t.prototype = n.prototype
    } else t = {};
    return Object.defineProperty(t, "__esModule", {
        value: !0
    }), Object.keys(e).forEach(function(o) {
        var i = Object.getOwnPropertyDescriptor(e, o);
        Object.defineProperty(t, o, i.get ? i : {
            enumerable: !0,
            get: function() {
                return e[o]
            }
        })
    }), t
}
var un = {};
/*!
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
(function(e) {
    (function() {
        var n = function() {
            this.init()
        };
        n.prototype = {
            init: function() {
                var r = this || t;
                return r._counter = 1e3, r._html5AudioPool = [], r.html5PoolSize = 10, r._codecs = {}, r._howls = [], r._muted = !1, r._volume = 1, r._canPlayEvent = "canplaythrough", r._navigator = typeof window < "u" && window.navigator ? window.navigator : null, r.masterGain = null, r.noAudio = !1, r.usingWebAudio = !0, r.autoSuspend = !0, r.ctx = null, r.autoUnlock = !0, r._setup(), r
            },
            volume: function(r) {
                var a = this || t;
                if (r = parseFloat(r), a.ctx || p(), typeof r < "u" && r >= 0 && r <= 1) {
                    if (a._volume = r, a._muted) return a;
                    a.usingWebAudio && a.masterGain.gain.setValueAtTime(r, t.ctx.currentTime);
                    for (var d = 0; d < a._howls.length; d++)
                        if (!a._howls[d]._webAudio)
                            for (var v = a._howls[d]._getSoundIds(), g = 0; g < v.length; g++) {
                                var m = a._howls[d]._soundById(v[g]);
                                m && m._node && (m._node.volume = m._volume * r)
                            }
                    return a
                }
                return a._volume
            },
            mute: function(r) {
                var a = this || t;
                a.ctx || p(), a._muted = r, a.usingWebAudio && a.masterGain.gain.setValueAtTime(r ? 0 : a._volume, t.ctx.currentTime);
                for (var d = 0; d < a._howls.length; d++)
                    if (!a._howls[d]._webAudio)
                        for (var v = a._howls[d]._getSoundIds(), g = 0; g < v.length; g++) {
                            var m = a._howls[d]._soundById(v[g]);
                            m && m._node && (m._node.muted = r ? !0 : m._muted)
                        }
                return a
            },
            stop: function() {
                for (var r = this || t, a = 0; a < r._howls.length; a++) r._howls[a].stop();
                return r
            },
            unload: function() {
                for (var r = this || t, a = r._howls.length - 1; a >= 0; a--) r._howls[a].unload();
                return r.usingWebAudio && r.ctx && typeof r.ctx.close < "u" && (r.ctx.close(), r.ctx = null, p()), r
            },
            codecs: function(r) {
                return (this || t)._codecs[r.replace(/^x-/, "")]
            },
            _setup: function() {
                var r = this || t;
                if (r.state = r.ctx && r.ctx.state || "suspended", r._autoSuspend(), !r.usingWebAudio)
                    if (typeof Audio < "u") try {
                        var a = new Audio;
                        typeof a.oncanplaythrough > "u" && (r._canPlayEvent = "canplay")
                    } catch (d) {
                        r.noAudio = !0
                    } else r.noAudio = !0;
                try {
                    var a = new Audio;
                    a.muted && (r.noAudio = !0)
                } catch (d) {}
                return r.noAudio || r._setupCodecs(), r
            },
            _setupCodecs: function() {
                var r = this || t,
                    a = null;
                try {
                    a = typeof Audio < "u" ? new Audio : null
                } catch (b) {
                    return r
                }
                if (!a || typeof a.canPlayType != "function") return r;
                var d = a.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                    v = r._navigator ? r._navigator.userAgent : "",
                    g = v.match(/OPR\/(\d+)/g),
                    m = g && parseInt(g[0].split("/")[1], 10) < 33,
                    h = v.indexOf("Safari") !== -1 && v.indexOf("Chrome") === -1,
                    y = v.match(/Version\/(.*?) /),
                    w = h && y && parseInt(y[1], 10) < 15;
                return r._codecs = {
                    mp3: !!(!m && (d || a.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                    mpeg: !!d,
                    opus: !!a.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                    ogg: !!a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    oga: !!a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    wav: !!(a.canPlayType('audio/wav; codecs="1"') || a.canPlayType("audio/wav")).replace(/^no$/, ""),
                    aac: !!a.canPlayType("audio/aac;").replace(/^no$/, ""),
                    caf: !!a.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                    m4a: !!(a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    m4b: !!(a.canPlayType("audio/x-m4b;") || a.canPlayType("audio/m4b;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    mp4: !!(a.canPlayType("audio/x-mp4;") || a.canPlayType("audio/mp4;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    weba: !!(!w && a.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                    webm: !!(!w && a.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                    dolby: !!a.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                    flac: !!(a.canPlayType("audio/x-flac;") || a.canPlayType("audio/flac;")).replace(/^no$/, "")
                }, r
            },
            _unlockAudio: function() {
                var r = this || t;
                if (!(r._audioUnlocked || !r.ctx)) {
                    r._audioUnlocked = !1, r.autoUnlock = !1, !r._mobileUnloaded && r.ctx.sampleRate !== 44100 && (r._mobileUnloaded = !0, r.unload()), r._scratchBuffer = r.ctx.createBuffer(1, 1, 22050);
                    var a = function(d) {
                        for (; r._html5AudioPool.length < r.html5PoolSize;) try {
                            var v = new Audio;
                            v._unlocked = !0, r._releaseHtml5Audio(v)
                        } catch (b) {
                            r.noAudio = !0;
                            break
                        }
                        for (var g = 0; g < r._howls.length; g++)
                            if (!r._howls[g]._webAudio)
                                for (var m = r._howls[g]._getSoundIds(), h = 0; h < m.length; h++) {
                                    var y = r._howls[g]._soundById(m[h]);
                                    y && y._node && !y._node._unlocked && (y._node._unlocked = !0, y._node.load())
                                }
                        r._autoResume();
                        var w = r.ctx.createBufferSource();
                        w.buffer = r._scratchBuffer, w.connect(r.ctx.destination), typeof w.start > "u" ? w.noteOn(0) : w.start(0), typeof r.ctx.resume == "function" && r.ctx.resume(), w.onended = function() {
                            w.disconnect(0), r._audioUnlocked = !0, document.removeEventListener("touchstart", a, !0), document.removeEventListener("touchend", a, !0), document.removeEventListener("click", a, !0), document.removeEventListener("keydown", a, !0);
                            for (var b = 0; b < r._howls.length; b++) r._howls[b]._emit("unlock")
                        }
                    };
                    return document.addEventListener("touchstart", a, !0), document.addEventListener("touchend", a, !0), document.addEventListener("click", a, !0), document.addEventListener("keydown", a, !0), r
                }
            },
            _obtainHtml5Audio: function() {
                var r = this || t;
                if (r._html5AudioPool.length) return r._html5AudioPool.pop();
                var a = new Audio().play();
                return a && typeof Promise < "u" && (a instanceof Promise || typeof a.then == "function") && a.catch(function() {
                    console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")
                }), new Audio
            },
            _releaseHtml5Audio: function(r) {
                var a = this || t;
                return r._unlocked && a._html5AudioPool.push(r), a
            },
            _autoSuspend: function() {
                var r = this;
                if (!(!r.autoSuspend || !r.ctx || typeof r.ctx.suspend > "u" || !t.usingWebAudio)) {
                    for (var a = 0; a < r._howls.length; a++)
                        if (r._howls[a]._webAudio) {
                            for (var d = 0; d < r._howls[a]._sounds.length; d++)
                                if (!r._howls[a]._sounds[d]._paused) return r
                        } return r._suspendTimer && clearTimeout(r._suspendTimer), r._suspendTimer = setTimeout(function() {
                        if (r.autoSuspend) {
                            r._suspendTimer = null, r.state = "suspending";
                            var v = function() {
                                r.state = "suspended", r._resumeAfterSuspend && (delete r._resumeAfterSuspend, r._autoResume())
                            };
                            r.ctx.suspend().then(v, v)
                        }
                    }, 3e4), r
                }
            },
            _autoResume: function() {
                var r = this;
                if (!(!r.ctx || typeof r.ctx.resume > "u" || !t.usingWebAudio)) return r.state === "running" && r.ctx.state !== "interrupted" && r._suspendTimer ? (clearTimeout(r._suspendTimer), r._suspendTimer = null) : r.state === "suspended" || r.state === "running" && r.ctx.state === "interrupted" ? (r.ctx.resume().then(function() {
                    r.state = "running";
                    for (var a = 0; a < r._howls.length; a++) r._howls[a]._emit("resume")
                }), r._suspendTimer && (clearTimeout(r._suspendTimer), r._suspendTimer = null)) : r.state === "suspending" && (r._resumeAfterSuspend = !0), r
            }
        };
        var t = new n,
            o = function(r) {
                var a = this;
                if (!r.src || r.src.length === 0) {
                    console.error("An array of source files must be passed with any new Howl.");
                    return
                }
                a.init(r)
            };
        o.prototype = {
            init: function(r) {
                var a = this;
                return t.ctx || p(), a._autoplay = r.autoplay || !1, a._format = typeof r.format != "string" ? r.format : [r.format], a._html5 = r.html5 || !1, a._muted = r.mute || !1, a._loop = r.loop || !1, a._pool = r.pool || 5, a._preload = typeof r.preload == "boolean" || r.preload === "metadata" ? r.preload : !0, a._rate = r.rate || 1, a._sprite = r.sprite || {}, a._src = typeof r.src != "string" ? r.src : [r.src], a._volume = r.volume !== void 0 ? r.volume : 1, a._xhr = {
                    method: r.xhr && r.xhr.method ? r.xhr.method : "GET",
                    headers: r.xhr && r.xhr.headers ? r.xhr.headers : null,
                    withCredentials: r.xhr && r.xhr.withCredentials ? r.xhr.withCredentials : !1
                }, a._duration = 0, a._state = "unloaded", a._sounds = [], a._endTimers = {}, a._queue = [], a._playLock = !1, a._onend = r.onend ? [{
                    fn: r.onend
                }] : [], a._onfade = r.onfade ? [{
                    fn: r.onfade
                }] : [], a._onload = r.onload ? [{
                    fn: r.onload
                }] : [], a._onloaderror = r.onloaderror ? [{
                    fn: r.onloaderror
                }] : [], a._onplayerror = r.onplayerror ? [{
                    fn: r.onplayerror
                }] : [], a._onpause = r.onpause ? [{
                    fn: r.onpause
                }] : [], a._onplay = r.onplay ? [{
                    fn: r.onplay
                }] : [], a._onstop = r.onstop ? [{
                    fn: r.onstop
                }] : [], a._onmute = r.onmute ? [{
                    fn: r.onmute
                }] : [], a._onvolume = r.onvolume ? [{
                    fn: r.onvolume
                }] : [], a._onrate = r.onrate ? [{
                    fn: r.onrate
                }] : [], a._onseek = r.onseek ? [{
                    fn: r.onseek
                }] : [], a._onunlock = r.onunlock ? [{
                    fn: r.onunlock
                }] : [], a._onresume = [], a._webAudio = t.usingWebAudio && !a._html5, typeof t.ctx < "u" && t.ctx && t.autoUnlock && t._unlockAudio(), t._howls.push(a), a._autoplay && a._queue.push({
                    event: "play",
                    action: function() {
                        a.play()
                    }
                }), a._preload && a._preload !== "none" && a.load(), a
            },
            load: function() {
                var r = this,
                    a = null;
                if (t.noAudio) {
                    r._emit("loaderror", null, "No audio support.");
                    return
                }
                typeof r._src == "string" && (r._src = [r._src]);
                for (var d = 0; d < r._src.length; d++) {
                    var v, g;
                    if (r._format && r._format[d]) v = r._format[d];
                    else {
                        if (g = r._src[d], typeof g != "string") {
                            r._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                            continue
                        }
                        v = /^data:audio\/([^;,]+);/i.exec(g), v || (v = /\.([^.]+)$/.exec(g.split("?", 1)[0])), v && (v = v[1].toLowerCase())
                    }
                    if (v || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), v && t.codecs(v)) {
                        a = r._src[d];
                        break
                    }
                }
                if (!a) {
                    r._emit("loaderror", null, "No codec support for selected audio sources.");
                    return
                }
                return r._src = a, r._state = "loading", window.location.protocol === "https:" && a.slice(0, 5) === "http:" && (r._html5 = !0, r._webAudio = !1), new i(r), r._webAudio && l(r), r
            },
            play: function(r, a) {
                var d = this,
                    v = null;
                if (typeof r == "number") v = r, r = null;
                else {
                    if (typeof r == "string" && d._state === "loaded" && !d._sprite[r]) return null;
                    if (typeof r > "u" && (r = "__default", !d._playLock)) {
                        for (var g = 0, m = 0; m < d._sounds.length; m++) d._sounds[m]._paused && !d._sounds[m]._ended && (g++, v = d._sounds[m]._id);
                        g === 1 ? r = null : v = null
                    }
                }
                var h = v ? d._soundById(v) : d._inactiveSound();
                if (!h) return null;
                if (v && !r && (r = h._sprite || "__default"), d._state !== "loaded") {
                    h._sprite = r, h._ended = !1;
                    var y = h._id;
                    return d._queue.push({
                        event: "play",
                        action: function() {
                            d.play(y)
                        }
                    }), y
                }
                if (v && !h._paused) return a || d._loadQueue("play"), h._id;
                d._webAudio && t._autoResume();
                var w = Math.max(0, h._seek > 0 ? h._seek : d._sprite[r][0] / 1e3),
                    b = Math.max(0, (d._sprite[r][0] + d._sprite[r][1]) / 1e3 - w),
                    P = b * 1e3 / Math.abs(h._rate),
                    z = d._sprite[r][0] / 1e3,
                    Y = (d._sprite[r][0] + d._sprite[r][1]) / 1e3;
                h._sprite = r, h._ended = !1;
                var j = function() {
                    h._paused = !1, h._seek = w, h._start = z, h._stop = Y, h._loop = !!(h._loop || d._sprite[r][2])
                };
                if (w >= Y) {
                    d._ended(h);
                    return
                }
                var B = h._node;
                if (d._webAudio) {
                    var V = function() {
                        d._playLock = !1, j(), d._refreshBuffer(h);
                        var M = h._muted || d._muted ? 0 : h._volume;
                        B.gain.setValueAtTime(M, t.ctx.currentTime), h._playStart = t.ctx.currentTime, typeof B.bufferSource.start > "u" ? h._loop ? B.bufferSource.noteGrainOn(0, w, 86400) : B.bufferSource.noteGrainOn(0, w, b) : h._loop ? B.bufferSource.start(0, w, 86400) : B.bufferSource.start(0, w, b), P !== 1 / 0 && (d._endTimers[h._id] = setTimeout(d._ended.bind(d, h), P)), a || setTimeout(function() {
                            d._emit("play", h._id), d._loadQueue()
                        }, 0)
                    };
                    t.state === "running" && t.ctx.state !== "interrupted" ? V() : (d._playLock = !0, d.once("resume", V), d._clearTimer(h._id))
                } else {
                    var L = function() {
                        B.currentTime = w, B.muted = h._muted || d._muted || t._muted || B.muted, B.volume = h._volume * t.volume(), B.playbackRate = h._rate;
                        try {
                            var M = B.play();
                            if (M && typeof Promise < "u" && (M instanceof Promise || typeof M.then == "function") ? (d._playLock = !0, j(), M.then(function() {
                                    d._playLock = !1, B._unlocked = !0, a ? d._loadQueue() : d._emit("play", h._id)
                                }).catch(function() {
                                    d._playLock = !1, d._emit("playerror", h._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), h._ended = !0, h._paused = !0
                                })) : a || (d._playLock = !1, j(), d._emit("play", h._id)), B.playbackRate = h._rate, B.paused) {
                                d._emit("playerror", h._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                return
                            }
                            r !== "__default" || h._loop ? d._endTimers[h._id] = setTimeout(d._ended.bind(d, h), P) : (d._endTimers[h._id] = function() {
                                d._ended(h), B.removeEventListener("ended", d._endTimers[h._id], !1)
                            }, B.addEventListener("ended", d._endTimers[h._id], !1))
                        } catch (I) {
                            d._emit("playerror", h._id, I)
                        }
                    };
                    B.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (B.src = d._src, B.load());
                    var K = window && window.ejecta || !B.readyState && t._navigator.isCocoonJS;
                    if (B.readyState >= 3 || K) L();
                    else {
                        d._playLock = !0, d._state = "loading";
                        var de = function() {
                            d._state = "loaded", L(), B.removeEventListener(t._canPlayEvent, de, !1)
                        };
                        B.addEventListener(t._canPlayEvent, de, !1), d._clearTimer(h._id)
                    }
                }
                return h._id
            },
            pause: function(r) {
                var a = this;
                if (a._state !== "loaded" || a._playLock) return a._queue.push({
                    event: "pause",
                    action: function() {
                        a.pause(r)
                    }
                }), a;
                for (var d = a._getSoundIds(r), v = 0; v < d.length; v++) {
                    a._clearTimer(d[v]);
                    var g = a._soundById(d[v]);
                    if (g && !g._paused && (g._seek = a.seek(d[v]), g._rateSeek = 0, g._paused = !0, a._stopFade(d[v]), g._node))
                        if (a._webAudio) {
                            if (!g._node.bufferSource) continue;
                            typeof g._node.bufferSource.stop > "u" ? g._node.bufferSource.noteOff(0) : g._node.bufferSource.stop(0), a._cleanBuffer(g._node)
                        } else(!isNaN(g._node.duration) || g._node.duration === 1 / 0) && g._node.pause();
                    arguments[1] || a._emit("pause", g ? g._id : null)
                }
                return a
            },
            stop: function(r, a) {
                var d = this;
                if (d._state !== "loaded" || d._playLock) return d._queue.push({
                    event: "stop",
                    action: function() {
                        d.stop(r)
                    }
                }), d;
                for (var v = d._getSoundIds(r), g = 0; g < v.length; g++) {
                    d._clearTimer(v[g]);
                    var m = d._soundById(v[g]);
                    m && (m._seek = m._start || 0, m._rateSeek = 0, m._paused = !0, m._ended = !0, d._stopFade(v[g]), m._node && (d._webAudio ? m._node.bufferSource && (typeof m._node.bufferSource.stop > "u" ? m._node.bufferSource.noteOff(0) : m._node.bufferSource.stop(0), d._cleanBuffer(m._node)) : (!isNaN(m._node.duration) || m._node.duration === 1 / 0) && (m._node.currentTime = m._start || 0, m._node.pause(), m._node.duration === 1 / 0 && d._clearSound(m._node))), a || d._emit("stop", m._id))
                }
                return d
            },
            mute: function(r, a) {
                var d = this;
                if (d._state !== "loaded" || d._playLock) return d._queue.push({
                    event: "mute",
                    action: function() {
                        d.mute(r, a)
                    }
                }), d;
                if (typeof a > "u")
                    if (typeof r == "boolean") d._muted = r;
                    else return d._muted;
                for (var v = d._getSoundIds(a), g = 0; g < v.length; g++) {
                    var m = d._soundById(v[g]);
                    m && (m._muted = r, m._interval && d._stopFade(m._id), d._webAudio && m._node ? m._node.gain.setValueAtTime(r ? 0 : m._volume, t.ctx.currentTime) : m._node && (m._node.muted = t._muted ? !0 : r), d._emit("mute", m._id))
                }
                return d
            },
            volume: function() {
                var r = this,
                    a = arguments,
                    d, v;
                if (a.length === 0) return r._volume;
                if (a.length === 1 || a.length === 2 && typeof a[1] > "u") {
                    var g = r._getSoundIds(),
                        m = g.indexOf(a[0]);
                    m >= 0 ? v = parseInt(a[0], 10) : d = parseFloat(a[0])
                } else a.length >= 2 && (d = parseFloat(a[0]), v = parseInt(a[1], 10));
                var h;
                if (typeof d < "u" && d >= 0 && d <= 1) {
                    if (r._state !== "loaded" || r._playLock) return r._queue.push({
                        event: "volume",
                        action: function() {
                            r.volume.apply(r, a)
                        }
                    }), r;
                    typeof v > "u" && (r._volume = d), v = r._getSoundIds(v);
                    for (var y = 0; y < v.length; y++) h = r._soundById(v[y]), h && (h._volume = d, a[2] || r._stopFade(v[y]), r._webAudio && h._node && !h._muted ? h._node.gain.setValueAtTime(d, t.ctx.currentTime) : h._node && !h._muted && (h._node.volume = d * t.volume()), r._emit("volume", h._id))
                } else return h = v ? r._soundById(v) : r._sounds[0], h ? h._volume : 0;
                return r
            },
            fade: function(r, a, d, v) {
                var g = this;
                if (g._state !== "loaded" || g._playLock) return g._queue.push({
                    event: "fade",
                    action: function() {
                        g.fade(r, a, d, v)
                    }
                }), g;
                r = Math.min(Math.max(0, parseFloat(r)), 1), a = Math.min(Math.max(0, parseFloat(a)), 1), d = parseFloat(d), g.volume(r, v);
                for (var m = g._getSoundIds(v), h = 0; h < m.length; h++) {
                    var y = g._soundById(m[h]);
                    if (y) {
                        if (v || g._stopFade(m[h]), g._webAudio && !y._muted) {
                            var w = t.ctx.currentTime,
                                b = w + d / 1e3;
                            y._volume = r, y._node.gain.setValueAtTime(r, w), y._node.gain.linearRampToValueAtTime(a, b)
                        }
                        g._startFadeInterval(y, r, a, d, m[h], typeof v > "u")
                    }
                }
                return g
            },
            _startFadeInterval: function(r, a, d, v, g, m) {
                var h = this,
                    y = a,
                    w = d - a,
                    b = Math.abs(w / .01),
                    P = Math.max(4, b > 0 ? v / b : v),
                    z = Date.now();
                r._fadeTo = d, r._interval = setInterval(function() {
                    var Y = (Date.now() - z) / v;
                    z = Date.now(), y += w * Y, y = Math.round(y * 100) / 100, w < 0 ? y = Math.max(d, y) : y = Math.min(d, y), h._webAudio ? r._volume = y : h.volume(y, r._id, !0), m && (h._volume = y), (d < a && y <= d || d > a && y >= d) && (clearInterval(r._interval), r._interval = null, r._fadeTo = null, h.volume(d, r._id), h._emit("fade", r._id))
                }, P)
            },
            _stopFade: function(r) {
                var a = this,
                    d = a._soundById(r);
                return d && d._interval && (a._webAudio && d._node.gain.cancelScheduledValues(t.ctx.currentTime), clearInterval(d._interval), d._interval = null, a.volume(d._fadeTo, r), d._fadeTo = null, a._emit("fade", r)), a
            },
            loop: function() {
                var r = this,
                    a = arguments,
                    d, v, g;
                if (a.length === 0) return r._loop;
                if (a.length === 1)
                    if (typeof a[0] == "boolean") d = a[0], r._loop = d;
                    else return g = r._soundById(parseInt(a[0], 10)), g ? g._loop : !1;
                else a.length === 2 && (d = a[0], v = parseInt(a[1], 10));
                for (var m = r._getSoundIds(v), h = 0; h < m.length; h++) g = r._soundById(m[h]), g && (g._loop = d, r._webAudio && g._node && g._node.bufferSource && (g._node.bufferSource.loop = d, d && (g._node.bufferSource.loopStart = g._start || 0, g._node.bufferSource.loopEnd = g._stop, r.playing(m[h]) && (r.pause(m[h], !0), r.play(m[h], !0)))));
                return r
            },
            rate: function() {
                var r = this,
                    a = arguments,
                    d, v;
                if (a.length === 0) v = r._sounds[0]._id;
                else if (a.length === 1) {
                    var g = r._getSoundIds(),
                        m = g.indexOf(a[0]);
                    m >= 0 ? v = parseInt(a[0], 10) : d = parseFloat(a[0])
                } else a.length === 2 && (d = parseFloat(a[0]), v = parseInt(a[1], 10));
                var h;
                if (typeof d == "number") {
                    if (r._state !== "loaded" || r._playLock) return r._queue.push({
                        event: "rate",
                        action: function() {
                            r.rate.apply(r, a)
                        }
                    }), r;
                    typeof v > "u" && (r._rate = d), v = r._getSoundIds(v);
                    for (var y = 0; y < v.length; y++)
                        if (h = r._soundById(v[y]), h) {
                            r.playing(v[y]) && (h._rateSeek = r.seek(v[y]), h._playStart = r._webAudio ? t.ctx.currentTime : h._playStart), h._rate = d, r._webAudio && h._node && h._node.bufferSource ? h._node.bufferSource.playbackRate.setValueAtTime(d, t.ctx.currentTime) : h._node && (h._node.playbackRate = d);
                            var w = r.seek(v[y]),
                                b = (r._sprite[h._sprite][0] + r._sprite[h._sprite][1]) / 1e3 - w,
                                P = b * 1e3 / Math.abs(h._rate);
                            (r._endTimers[v[y]] || !h._paused) && (r._clearTimer(v[y]), r._endTimers[v[y]] = setTimeout(r._ended.bind(r, h), P)), r._emit("rate", h._id)
                        }
                } else return h = r._soundById(v), h ? h._rate : r._rate;
                return r
            },
            seek: function() {
                var r = this,
                    a = arguments,
                    d, v;
                if (a.length === 0) r._sounds.length && (v = r._sounds[0]._id);
                else if (a.length === 1) {
                    var g = r._getSoundIds(),
                        m = g.indexOf(a[0]);
                    m >= 0 ? v = parseInt(a[0], 10) : r._sounds.length && (v = r._sounds[0]._id, d = parseFloat(a[0]))
                } else a.length === 2 && (d = parseFloat(a[0]), v = parseInt(a[1], 10));
                if (typeof v > "u") return 0;
                if (typeof d == "number" && (r._state !== "loaded" || r._playLock)) return r._queue.push({
                    event: "seek",
                    action: function() {
                        r.seek.apply(r, a)
                    }
                }), r;
                var h = r._soundById(v);
                if (h)
                    if (typeof d == "number" && d >= 0) {
                        var y = r.playing(v);
                        y && r.pause(v, !0), h._seek = d, h._ended = !1, r._clearTimer(v), !r._webAudio && h._node && !isNaN(h._node.duration) && (h._node.currentTime = d);
                        var w = function() {
                            y && r.play(v, !0), r._emit("seek", v)
                        };
                        if (y && !r._webAudio) {
                            var b = function() {
                                r._playLock ? setTimeout(b, 0) : w()
                            };
                            setTimeout(b, 0)
                        } else w()
                    } else if (r._webAudio) {
                    var P = r.playing(v) ? t.ctx.currentTime - h._playStart : 0,
                        z = h._rateSeek ? h._rateSeek - h._seek : 0;
                    return h._seek + (z + P * Math.abs(h._rate))
                } else return h._node.currentTime;
                return r
            },
            playing: function(r) {
                var a = this;
                if (typeof r == "number") {
                    var d = a._soundById(r);
                    return d ? !d._paused : !1
                }
                for (var v = 0; v < a._sounds.length; v++)
                    if (!a._sounds[v]._paused) return !0;
                return !1
            },
            duration: function(r) {
                var a = this,
                    d = a._duration,
                    v = a._soundById(r);
                return v && (d = a._sprite[v._sprite][1] / 1e3), d
            },
            state: function() {
                return this._state
            },
            unload: function() {
                for (var r = this, a = r._sounds, d = 0; d < a.length; d++) a[d]._paused || r.stop(a[d]._id), r._webAudio || (r._clearSound(a[d]._node), a[d]._node.removeEventListener("error", a[d]._errorFn, !1), a[d]._node.removeEventListener(t._canPlayEvent, a[d]._loadFn, !1), a[d]._node.removeEventListener("ended", a[d]._endFn, !1), t._releaseHtml5Audio(a[d]._node)), delete a[d]._node, r._clearTimer(a[d]._id);
                var v = t._howls.indexOf(r);
                v >= 0 && t._howls.splice(v, 1);
                var g = !0;
                for (d = 0; d < t._howls.length; d++)
                    if (t._howls[d]._src === r._src || r._src.indexOf(t._howls[d]._src) >= 0) {
                        g = !1;
                        break
                    } return s && g && delete s[r._src], t.noAudio = !1, r._state = "unloaded", r._sounds = [], r = null, null
            },
            on: function(r, a, d, v) {
                var g = this,
                    m = g["_on" + r];
                return typeof a == "function" && m.push(v ? {
                    id: d,
                    fn: a,
                    once: v
                } : {
                    id: d,
                    fn: a
                }), g
            },
            off: function(r, a, d) {
                var v = this,
                    g = v["_on" + r],
                    m = 0;
                if (typeof a == "number" && (d = a, a = null), a || d)
                    for (m = 0; m < g.length; m++) {
                        var h = d === g[m].id;
                        if (a === g[m].fn && h || !a && h) {
                            g.splice(m, 1);
                            break
                        }
                    } else if (r) v["_on" + r] = [];
                    else {
                        var y = Object.keys(v);
                        for (m = 0; m < y.length; m++) y[m].indexOf("_on") === 0 && Array.isArray(v[y[m]]) && (v[y[m]] = [])
                    } return v
            },
            once: function(r, a, d) {
                var v = this;
                return v.on(r, a, d, 1), v
            },
            _emit: function(r, a, d) {
                for (var v = this, g = v["_on" + r], m = g.length - 1; m >= 0; m--)(!g[m].id || g[m].id === a || r === "load") && (setTimeout(function(h) {
                    h.call(this, a, d)
                }.bind(v, g[m].fn), 0), g[m].once && v.off(r, g[m].fn, g[m].id));
                return v._loadQueue(r), v
            },
            _loadQueue: function(r) {
                var a = this;
                if (a._queue.length > 0) {
                    var d = a._queue[0];
                    d.event === r && (a._queue.shift(), a._loadQueue()), r || d.action()
                }
                return a
            },
            _ended: function(r) {
                var a = this,
                    d = r._sprite;
                if (!a._webAudio && r._node && !r._node.paused && !r._node.ended && r._node.currentTime < r._stop) return setTimeout(a._ended.bind(a, r), 100), a;
                var v = !!(r._loop || a._sprite[d][2]);
                if (a._emit("end", r._id), !a._webAudio && v && a.stop(r._id, !0).play(r._id), a._webAudio && v) {
                    a._emit("play", r._id), r._seek = r._start || 0, r._rateSeek = 0, r._playStart = t.ctx.currentTime;
                    var g = (r._stop - r._start) * 1e3 / Math.abs(r._rate);
                    a._endTimers[r._id] = setTimeout(a._ended.bind(a, r), g)
                }
                return a._webAudio && !v && (r._paused = !0, r._ended = !0, r._seek = r._start || 0, r._rateSeek = 0, a._clearTimer(r._id), a._cleanBuffer(r._node), t._autoSuspend()), !a._webAudio && !v && a.stop(r._id, !0), a
            },
            _clearTimer: function(r) {
                var a = this;
                if (a._endTimers[r]) {
                    if (typeof a._endTimers[r] != "function") clearTimeout(a._endTimers[r]);
                    else {
                        var d = a._soundById(r);
                        d && d._node && d._node.removeEventListener("ended", a._endTimers[r], !1)
                    }
                    delete a._endTimers[r]
                }
                return a
            },
            _soundById: function(r) {
                for (var a = this, d = 0; d < a._sounds.length; d++)
                    if (r === a._sounds[d]._id) return a._sounds[d];
                return null
            },
            _inactiveSound: function() {
                var r = this;
                r._drain();
                for (var a = 0; a < r._sounds.length; a++)
                    if (r._sounds[a]._ended) return r._sounds[a].reset();
                return new i(r)
            },
            _drain: function() {
                var r = this,
                    a = r._pool,
                    d = 0,
                    v = 0;
                if (!(r._sounds.length < a)) {
                    for (v = 0; v < r._sounds.length; v++) r._sounds[v]._ended && d++;
                    for (v = r._sounds.length - 1; v >= 0; v--) {
                        if (d <= a) return;
                        r._sounds[v]._ended && (r._webAudio && r._sounds[v]._node && r._sounds[v]._node.disconnect(0), r._sounds.splice(v, 1), d--)
                    }
                }
            },
            _getSoundIds: function(r) {
                var a = this;
                if (typeof r > "u") {
                    for (var d = [], v = 0; v < a._sounds.length; v++) d.push(a._sounds[v]._id);
                    return d
                } else return [r]
            },
            _refreshBuffer: function(r) {
                var a = this;
                return r._node.bufferSource = t.ctx.createBufferSource(), r._node.bufferSource.buffer = s[a._src], r._panner ? r._node.bufferSource.connect(r._panner) : r._node.bufferSource.connect(r._node), r._node.bufferSource.loop = r._loop, r._loop && (r._node.bufferSource.loopStart = r._start || 0, r._node.bufferSource.loopEnd = r._stop || 0), r._node.bufferSource.playbackRate.setValueAtTime(r._rate, t.ctx.currentTime), a
            },
            _cleanBuffer: function(r) {
                var a = this,
                    d = t._navigator && t._navigator.vendor.indexOf("Apple") >= 0;
                if (!r.bufferSource) return a;
                if (t._scratchBuffer && r.bufferSource && (r.bufferSource.onended = null, r.bufferSource.disconnect(0), d)) try {
                    r.bufferSource.buffer = t._scratchBuffer
                } catch (v) {}
                return r.bufferSource = null, a
            },
            _clearSound: function(r) {
                var a = /MSIE |Trident\//.test(t._navigator && t._navigator.userAgent);
                a || (r.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
            }
        };
        var i = function(r) {
            this._parent = r, this.init()
        };
        i.prototype = {
            init: function() {
                var r = this,
                    a = r._parent;
                return r._muted = a._muted, r._loop = a._loop, r._volume = a._volume, r._rate = a._rate, r._seek = 0, r._paused = !0, r._ended = !0, r._sprite = "__default", r._id = ++t._counter, a._sounds.push(r), r.create(), r
            },
            create: function() {
                var r = this,
                    a = r._parent,
                    d = t._muted || r._muted || r._parent._muted ? 0 : r._volume;
                return a._webAudio ? (r._node = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), r._node.gain.setValueAtTime(d, t.ctx.currentTime), r._node.paused = !0, r._node.connect(t.masterGain)) : t.noAudio || (r._node = t._obtainHtml5Audio(), r._errorFn = r._errorListener.bind(r), r._node.addEventListener("error", r._errorFn, !1), r._loadFn = r._loadListener.bind(r), r._node.addEventListener(t._canPlayEvent, r._loadFn, !1), r._endFn = r._endListener.bind(r), r._node.addEventListener("ended", r._endFn, !1), r._node.src = a._src, r._node.preload = a._preload === !0 ? "auto" : a._preload, r._node.volume = d * t.volume(), r._node.load()), r
            },
            reset: function() {
                var r = this,
                    a = r._parent;
                return r._muted = a._muted, r._loop = a._loop, r._volume = a._volume, r._rate = a._rate, r._seek = 0, r._rateSeek = 0, r._paused = !0, r._ended = !0, r._sprite = "__default", r._id = ++t._counter, r
            },
            _errorListener: function() {
                var r = this;
                r._parent._emit("loaderror", r._id, r._node.error ? r._node.error.code : 0), r._node.removeEventListener("error", r._errorFn, !1)
            },
            _loadListener: function() {
                var r = this,
                    a = r._parent;
                a._duration = Math.ceil(r._node.duration * 10) / 10, Object.keys(a._sprite).length === 0 && (a._sprite = {
                    __default: [0, a._duration * 1e3]
                }), a._state !== "loaded" && (a._state = "loaded", a._emit("load"), a._loadQueue()), r._node.removeEventListener(t._canPlayEvent, r._loadFn, !1)
            },
            _endListener: function() {
                var r = this,
                    a = r._parent;
                a._duration === 1 / 0 && (a._duration = Math.ceil(r._node.duration * 10) / 10, a._sprite.__default[1] === 1 / 0 && (a._sprite.__default[1] = a._duration * 1e3), a._ended(r)), r._node.removeEventListener("ended", r._endFn, !1)
            }
        };
        var s = {},
            l = function(r) {
                var a = r._src;
                if (s[a]) {
                    r._duration = s[a].duration, f(r);
                    return
                }
                if (/^data:[^;]+;base64,/.test(a)) {
                    for (var d = atob(a.split(",")[1]), v = new Uint8Array(d.length), g = 0; g < d.length; ++g) v[g] = d.charCodeAt(g);
                    u(v.buffer, r)
                } else {
                    var m = new XMLHttpRequest;
                    m.open(r._xhr.method, a, !0), m.withCredentials = r._xhr.withCredentials, m.responseType = "arraybuffer", r._xhr.headers && Object.keys(r._xhr.headers).forEach(function(h) {
                        m.setRequestHeader(h, r._xhr.headers[h])
                    }), m.onload = function() {
                        var h = (m.status + "")[0];
                        if (h !== "0" && h !== "2" && h !== "3") {
                            r._emit("loaderror", null, "Failed loading audio file with status: " + m.status + ".");
                            return
                        }
                        u(m.response, r)
                    }, m.onerror = function() {
                        r._webAudio && (r._html5 = !0, r._webAudio = !1, r._sounds = [], delete s[a], r.load())
                    }, c(m)
                }
            },
            c = function(r) {
                try {
                    r.send()
                } catch (a) {
                    r.onerror()
                }
            },
            u = function(r, a) {
                var d = function() {
                        a._emit("loaderror", null, "Decoding audio data failed.")
                    },
                    v = function(g) {
                        g && a._sounds.length > 0 ? (s[a._src] = g, f(a, g)) : d()
                    };
                typeof Promise < "u" && t.ctx.decodeAudioData.length === 1 ? t.ctx.decodeAudioData(r).then(v).catch(d) : t.ctx.decodeAudioData(r, v, d)
            },
            f = function(r, a) {
                a && !r._duration && (r._duration = a.duration), Object.keys(r._sprite).length === 0 && (r._sprite = {
                    __default: [0, r._duration * 1e3]
                }), r._state !== "loaded" && (r._state = "loaded", r._emit("load"), r._loadQueue())
            },
            p = function() {
                if (t.usingWebAudio) {
                    try {
                        typeof AudioContext < "u" ? t.ctx = new AudioContext : typeof webkitAudioContext < "u" ? t.ctx = new webkitAudioContext : t.usingWebAudio = !1
                    } catch (g) {
                        t.usingWebAudio = !1
                    }
                    t.ctx || (t.usingWebAudio = !1);
                    var r = /iP(hone|od|ad)/.test(t._navigator && t._navigator.platform),
                        a = t._navigator && t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                        d = a ? parseInt(a[1], 10) : null;
                    if (r && d && d < 9) {
                        var v = /safari/.test(t._navigator && t._navigator.userAgent.toLowerCase());
                        t._navigator && !v && (t.usingWebAudio = !1)
                    }
                    t.usingWebAudio && (t.masterGain = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), t.masterGain.gain.setValueAtTime(t._muted ? 0 : t._volume, t.ctx.currentTime), t.masterGain.connect(t.ctx.destination)), t._setup()
                }
            };
        e.Howler = t, e.Howl = o, typeof He < "u" ? (He.HowlerGlobal = n, He.Howler = t, He.Howl = o, He.Sound = i) : typeof window < "u" && (window.HowlerGlobal = n, window.Howler = t, window.Howl = o, window.Sound = i)
    })();
    /*!
     *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
     *  
     *  howler.js v2.2.4
     *  howlerjs.com
     *
     *  (c) 2013-2020, James Simpson of GoldFire Studios
     *  goldfirestudios.com
     *
     *  MIT License
     */
    (function() {
        HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function(t) {
            var o = this;
            if (!o.ctx || !o.ctx.listener) return o;
            for (var i = o._howls.length - 1; i >= 0; i--) o._howls[i].stereo(t);
            return o
        }, HowlerGlobal.prototype.pos = function(t, o, i) {
            var s = this;
            if (!s.ctx || !s.ctx.listener) return s;
            if (o = typeof o != "number" ? s._pos[1] : o, i = typeof i != "number" ? s._pos[2] : i, typeof t == "number") s._pos = [t, o, i], typeof s.ctx.listener.positionX < "u" ? (s.ctx.listener.positionX.setTargetAtTime(s._pos[0], Howler.ctx.currentTime, .1), s.ctx.listener.positionY.setTargetAtTime(s._pos[1], Howler.ctx.currentTime, .1), s.ctx.listener.positionZ.setTargetAtTime(s._pos[2], Howler.ctx.currentTime, .1)) : s.ctx.listener.setPosition(s._pos[0], s._pos[1], s._pos[2]);
            else return s._pos;
            return s
        }, HowlerGlobal.prototype.orientation = function(t, o, i, s, l, c) {
            var u = this;
            if (!u.ctx || !u.ctx.listener) return u;
            var f = u._orientation;
            if (o = typeof o != "number" ? f[1] : o, i = typeof i != "number" ? f[2] : i, s = typeof s != "number" ? f[3] : s, l = typeof l != "number" ? f[4] : l, c = typeof c != "number" ? f[5] : c, typeof t == "number") u._orientation = [t, o, i, s, l, c], typeof u.ctx.listener.forwardX < "u" ? (u.ctx.listener.forwardX.setTargetAtTime(t, Howler.ctx.currentTime, .1), u.ctx.listener.forwardY.setTargetAtTime(o, Howler.ctx.currentTime, .1), u.ctx.listener.forwardZ.setTargetAtTime(i, Howler.ctx.currentTime, .1), u.ctx.listener.upX.setTargetAtTime(s, Howler.ctx.currentTime, .1), u.ctx.listener.upY.setTargetAtTime(l, Howler.ctx.currentTime, .1), u.ctx.listener.upZ.setTargetAtTime(c, Howler.ctx.currentTime, .1)) : u.ctx.listener.setOrientation(t, o, i, s, l, c);
            else return f;
            return u
        }, Howl.prototype.init = function(t) {
            return function(o) {
                var i = this;
                return i._orientation = o.orientation || [1, 0, 0], i._stereo = o.stereo || null, i._pos = o.pos || null, i._pannerAttr = {
                    coneInnerAngle: typeof o.coneInnerAngle < "u" ? o.coneInnerAngle : 360,
                    coneOuterAngle: typeof o.coneOuterAngle < "u" ? o.coneOuterAngle : 360,
                    coneOuterGain: typeof o.coneOuterGain < "u" ? o.coneOuterGain : 0,
                    distanceModel: typeof o.distanceModel < "u" ? o.distanceModel : "inverse",
                    maxDistance: typeof o.maxDistance < "u" ? o.maxDistance : 1e4,
                    panningModel: typeof o.panningModel < "u" ? o.panningModel : "HRTF",
                    refDistance: typeof o.refDistance < "u" ? o.refDistance : 1,
                    rolloffFactor: typeof o.rolloffFactor < "u" ? o.rolloffFactor : 1
                }, i._onstereo = o.onstereo ? [{
                    fn: o.onstereo
                }] : [], i._onpos = o.onpos ? [{
                    fn: o.onpos
                }] : [], i._onorientation = o.onorientation ? [{
                    fn: o.onorientation
                }] : [], t.call(this, o)
            }
        }(Howl.prototype.init), Howl.prototype.stereo = function(t, o) {
            var i = this;
            if (!i._webAudio) return i;
            if (i._state !== "loaded") return i._queue.push({
                event: "stereo",
                action: function() {
                    i.stereo(t, o)
                }
            }), i;
            var s = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
            if (typeof o > "u")
                if (typeof t == "number") i._stereo = t, i._pos = [t, 0, 0];
                else return i._stereo;
            for (var l = i._getSoundIds(o), c = 0; c < l.length; c++) {
                var u = i._soundById(l[c]);
                if (u)
                    if (typeof t == "number") u._stereo = t, u._pos = [t, 0, 0], u._node && (u._pannerAttr.panningModel = "equalpower", (!u._panner || !u._panner.pan) && n(u, s), s === "spatial" ? typeof u._panner.positionX < "u" ? (u._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), u._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), u._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : u._panner.setPosition(t, 0, 0) : u._panner.pan.setValueAtTime(t, Howler.ctx.currentTime)), i._emit("stereo", u._id);
                    else return u._stereo
            }
            return i
        }, Howl.prototype.pos = function(t, o, i, s) {
            var l = this;
            if (!l._webAudio) return l;
            if (l._state !== "loaded") return l._queue.push({
                event: "pos",
                action: function() {
                    l.pos(t, o, i, s)
                }
            }), l;
            if (o = typeof o != "number" ? 0 : o, i = typeof i != "number" ? -.5 : i, typeof s > "u")
                if (typeof t == "number") l._pos = [t, o, i];
                else return l._pos;
            for (var c = l._getSoundIds(s), u = 0; u < c.length; u++) {
                var f = l._soundById(c[u]);
                if (f)
                    if (typeof t == "number") f._pos = [t, o, i], f._node && ((!f._panner || f._panner.pan) && n(f, "spatial"), typeof f._panner.positionX < "u" ? (f._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), f._panner.positionY.setValueAtTime(o, Howler.ctx.currentTime), f._panner.positionZ.setValueAtTime(i, Howler.ctx.currentTime)) : f._panner.setPosition(t, o, i)), l._emit("pos", f._id);
                    else return f._pos
            }
            return l
        }, Howl.prototype.orientation = function(t, o, i, s) {
            var l = this;
            if (!l._webAudio) return l;
            if (l._state !== "loaded") return l._queue.push({
                event: "orientation",
                action: function() {
                    l.orientation(t, o, i, s)
                }
            }), l;
            if (o = typeof o != "number" ? l._orientation[1] : o, i = typeof i != "number" ? l._orientation[2] : i, typeof s > "u")
                if (typeof t == "number") l._orientation = [t, o, i];
                else return l._orientation;
            for (var c = l._getSoundIds(s), u = 0; u < c.length; u++) {
                var f = l._soundById(c[u]);
                if (f)
                    if (typeof t == "number") f._orientation = [t, o, i], f._node && (f._panner || (f._pos || (f._pos = l._pos || [0, 0, -.5]), n(f, "spatial")), typeof f._panner.orientationX < "u" ? (f._panner.orientationX.setValueAtTime(t, Howler.ctx.currentTime), f._panner.orientationY.setValueAtTime(o, Howler.ctx.currentTime), f._panner.orientationZ.setValueAtTime(i, Howler.ctx.currentTime)) : f._panner.setOrientation(t, o, i)), l._emit("orientation", f._id);
                    else return f._orientation
            }
            return l
        }, Howl.prototype.pannerAttr = function() {
            var t = this,
                o = arguments,
                i, s, l;
            if (!t._webAudio) return t;
            if (o.length === 0) return t._pannerAttr;
            if (o.length === 1)
                if (typeof o[0] == "object") i = o[0], typeof s > "u" && (i.pannerAttr || (i.pannerAttr = {
                    coneInnerAngle: i.coneInnerAngle,
                    coneOuterAngle: i.coneOuterAngle,
                    coneOuterGain: i.coneOuterGain,
                    distanceModel: i.distanceModel,
                    maxDistance: i.maxDistance,
                    refDistance: i.refDistance,
                    rolloffFactor: i.rolloffFactor,
                    panningModel: i.panningModel
                }), t._pannerAttr = {
                    coneInnerAngle: typeof i.pannerAttr.coneInnerAngle < "u" ? i.pannerAttr.coneInnerAngle : t._coneInnerAngle,
                    coneOuterAngle: typeof i.pannerAttr.coneOuterAngle < "u" ? i.pannerAttr.coneOuterAngle : t._coneOuterAngle,
                    coneOuterGain: typeof i.pannerAttr.coneOuterGain < "u" ? i.pannerAttr.coneOuterGain : t._coneOuterGain,
                    distanceModel: typeof i.pannerAttr.distanceModel < "u" ? i.pannerAttr.distanceModel : t._distanceModel,
                    maxDistance: typeof i.pannerAttr.maxDistance < "u" ? i.pannerAttr.maxDistance : t._maxDistance,
                    refDistance: typeof i.pannerAttr.refDistance < "u" ? i.pannerAttr.refDistance : t._refDistance,
                    rolloffFactor: typeof i.pannerAttr.rolloffFactor < "u" ? i.pannerAttr.rolloffFactor : t._rolloffFactor,
                    panningModel: typeof i.pannerAttr.panningModel < "u" ? i.pannerAttr.panningModel : t._panningModel
                });
                else return l = t._soundById(parseInt(o[0], 10)), l ? l._pannerAttr : t._pannerAttr;
            else o.length === 2 && (i = o[0], s = parseInt(o[1], 10));
            for (var c = t._getSoundIds(s), u = 0; u < c.length; u++)
                if (l = t._soundById(c[u]), l) {
                    var f = l._pannerAttr;
                    f = {
                        coneInnerAngle: typeof i.coneInnerAngle < "u" ? i.coneInnerAngle : f.coneInnerAngle,
                        coneOuterAngle: typeof i.coneOuterAngle < "u" ? i.coneOuterAngle : f.coneOuterAngle,
                        coneOuterGain: typeof i.coneOuterGain < "u" ? i.coneOuterGain : f.coneOuterGain,
                        distanceModel: typeof i.distanceModel < "u" ? i.distanceModel : f.distanceModel,
                        maxDistance: typeof i.maxDistance < "u" ? i.maxDistance : f.maxDistance,
                        refDistance: typeof i.refDistance < "u" ? i.refDistance : f.refDistance,
                        rolloffFactor: typeof i.rolloffFactor < "u" ? i.rolloffFactor : f.rolloffFactor,
                        panningModel: typeof i.panningModel < "u" ? i.panningModel : f.panningModel
                    };
                    var p = l._panner;
                    p || (l._pos || (l._pos = t._pos || [0, 0, -.5]), n(l, "spatial"), p = l._panner), p.coneInnerAngle = f.coneInnerAngle, p.coneOuterAngle = f.coneOuterAngle, p.coneOuterGain = f.coneOuterGain, p.distanceModel = f.distanceModel, p.maxDistance = f.maxDistance, p.refDistance = f.refDistance, p.rolloffFactor = f.rolloffFactor, p.panningModel = f.panningModel
                } return t
        }, Sound.prototype.init = function(t) {
            return function() {
                var o = this,
                    i = o._parent;
                o._orientation = i._orientation, o._stereo = i._stereo, o._pos = i._pos, o._pannerAttr = i._pannerAttr, t.call(this), o._stereo ? i.stereo(o._stereo) : o._pos && i.pos(o._pos[0], o._pos[1], o._pos[2], o._id)
            }
        }(Sound.prototype.init), Sound.prototype.reset = function(t) {
            return function() {
                var o = this,
                    i = o._parent;
                return o._orientation = i._orientation, o._stereo = i._stereo, o._pos = i._pos, o._pannerAttr = i._pannerAttr, o._stereo ? i.stereo(o._stereo) : o._pos ? i.pos(o._pos[0], o._pos[1], o._pos[2], o._id) : o._panner && (o._panner.disconnect(0), o._panner = void 0, i._refreshBuffer(o)), t.call(this)
            }
        }(Sound.prototype.reset);
        var n = function(t, o) {
            o = o || "spatial", o === "spatial" ? (t._panner = Howler.ctx.createPanner(), t._panner.coneInnerAngle = t._pannerAttr.coneInnerAngle, t._panner.coneOuterAngle = t._pannerAttr.coneOuterAngle, t._panner.coneOuterGain = t._pannerAttr.coneOuterGain, t._panner.distanceModel = t._pannerAttr.distanceModel, t._panner.maxDistance = t._pannerAttr.maxDistance, t._panner.refDistance = t._pannerAttr.refDistance, t._panner.rolloffFactor = t._pannerAttr.rolloffFactor, t._panner.panningModel = t._pannerAttr.panningModel, typeof t._panner.positionX < "u" ? (t._panner.positionX.setValueAtTime(t._pos[0], Howler.ctx.currentTime), t._panner.positionY.setValueAtTime(t._pos[1], Howler.ctx.currentTime), t._panner.positionZ.setValueAtTime(t._pos[2], Howler.ctx.currentTime)) : t._panner.setPosition(t._pos[0], t._pos[1], t._pos[2]), typeof t._panner.orientationX < "u" ? (t._panner.orientationX.setValueAtTime(t._orientation[0], Howler.ctx.currentTime), t._panner.orientationY.setValueAtTime(t._orientation[1], Howler.ctx.currentTime), t._panner.orientationZ.setValueAtTime(t._orientation[2], Howler.ctx.currentTime)) : t._panner.setOrientation(t._orientation[0], t._orientation[1], t._orientation[2])) : (t._panner = Howler.ctx.createStereoPanner(), t._panner.pan.setValueAtTime(t._stereo, Howler.ctx.currentTime)), t._panner.connect(t._node), t._paused || t._parent.pause(t._id, !0).play(t._id, !0)
        }
    })()
})(un);
const ds = () => {},
    ps = e => e instanceof Function ? e() : e,
    Qr = async e => new Promise(n => setTimeout(n, e)), gs = e => new URLSearchParams(window.location.search).get(e), ri = gs("muted"), $l = !ri || ri === "1", Il = {
        muted: $l
    }, [co, vs] = Gt(Il);
mn(() => {
    document.addEventListener("visibilitychange", () => {
        const e = co.muted;
        document.hidden ? un.Howler.mute(!0) : e || un.Howler.mute(!1)
    })
});
pe(() => {
    const e = co.muted;
    un.Howler.mute(e)
});
const Pl = () => {
        vs("muted", e => !e)
    },
    Ol = e => {
        vs("muted", e)
    },
    St = {
        options: co,
        toggleMute: Pl,
        setMute: Ol
    },
    at = (e, n = {}) => {
        const [t, o] = W(null), [i, s] = W(!1);
        pe(() => {
            const r = fe(t);
            r == null || r.unload(), o(null);
            const a = ps(e);
            !a || Array.isArray(a) && a.length === 0 || new un.Howl({
                src: a,
                html5: n.html5,
                autoplay: n.autoplay,
                loop: n.loop,
                sprite: n.sprite,
                onload: function() {
                    o(this)
                },
                onplayerror: function(d, v) {
                    typeof v == "string" && v.includes("Playback was unable to start") && s(!0)
                }
            })
        }), Ae(() => {
            var r;
            (r = t()) == null || r.unload()
        });
        const l = (r, a = {}) => {
                const d = t();
                if (d) return a.interrupt && d.stop(), d.play(r)
            },
            c = r => {
                var a;
                return (a = t()) == null ? void 0 : a.stop(r)
            },
            u = r => {
                var a;
                return (a = t()) == null ? void 0 : a.pause(r)
            },
            f = () => {
                const r = t();
                r && (r.playing() ? r.pause() : r.play())
            },
            p = r => {
                var a;
                return (a = t()) == null ? void 0 : a.volume(r)
            };
        return pe(() => {
            var d;
            const r = St.options.muted,
                a = fe(i);
            !r && a && ((d = t()) == null || d.play(), s(!1))
        }), {
            internalInstance: t,
            play: l,
            stop: c,
            pause: u,
            toggle: f,
            setVolume: p
        }
    },
    El = [{
        src: {
            mp3: "ambient-tracks/ambient-track/ambient-4.mp3",
            webm: "ambient-tracks/ambient-track/ambient-4.webm"
        },
        postDate: "2023-12-1"
    }],
    Dl = "modulepreload",
    Cl = function(e) {
        return "/" + e
    },
    oi = {},
    Ml = function(n, t, o) {
        if (!t || t.length === 0) return n();
        const i = document.getElementsByTagName("link");
        return Promise.all(t.map(s => {
            if (s = Cl(s), s in oi) return;
            oi[s] = !0;
            const l = s.endsWith(".css"),
                c = l ? '[rel="stylesheet"]' : "";
            if (!!o)
                for (let p = i.length - 1; p >= 0; p--) {
                    const r = i[p];
                    if (r.href === s && (!l || r.rel === "stylesheet")) return
                } else if (document.querySelector('link[href="'.concat(s, '"]').concat(c))) return;
            const f = document.createElement("link");
            if (f.rel = l ? "stylesheet" : Dl, l || (f.as = "script", f.crossOrigin = ""), f.href = s, document.head.appendChild(f), l) return new Promise((p, r) => {
                f.addEventListener("load", p), f.addEventListener("error", () => r(new Error("Unable to preload CSS for ".concat(s))))
            })
        })).then(() => n()).catch(s => {
            const l = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (l.payload = s, window.dispatchEvent(l), !l.defaultPrevented) throw s
        })
    },
    hs = "Asia/Tokyo";
var ms = {
    exports: {}
};
(function(e, n) {
    (function(t, o) {
        e.exports = o()
    })(He, function() {
        var t = 1e3,
            o = 6e4,
            i = 36e5,
            s = "millisecond",
            l = "second",
            c = "minute",
            u = "hour",
            f = "day",
            p = "week",
            r = "month",
            a = "quarter",
            d = "year",
            v = "date",
            g = "Invalid Date",
            m = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
            h = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
            y = {
                name: "en",
                weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                ordinal: function(M) {
                    var I = ["th", "st", "nd", "rd"],
                        k = M % 100;
                    return "[" + M + (I[(k - 20) % 10] || I[k] || I[0]) + "]"
                }
            },
            w = function(M, I, k) {
                var x = String(M);
                return !x || x.length >= I ? M : "" + Array(I + 1 - x.length).join(k) + M
            },
            b = {
                s: w,
                z: function(M) {
                    var I = -M.utcOffset(),
                        k = Math.abs(I),
                        x = Math.floor(k / 60),
                        A = k % 60;
                    return (I <= 0 ? "+" : "-") + w(x, 2, "0") + ":" + w(A, 2, "0")
                },
                m: function M(I, k) {
                    if (I.date() < k.date()) return -M(k, I);
                    var x = 12 * (k.year() - I.year()) + (k.month() - I.month()),
                        A = I.clone().add(x, r),
                        C = k - A < 0,
                        $ = I.clone().add(x + (C ? -1 : 1), r);
                    return +(-(x + (k - A) / (C ? A - $ : $ - A)) || 0)
                },
                a: function(M) {
                    return M < 0 ? Math.ceil(M) || 0 : Math.floor(M)
                },
                p: function(M) {
                    return {
                        M: r,
                        y: d,
                        w: p,
                        d: f,
                        D: v,
                        h: u,
                        m: c,
                        s: l,
                        ms: s,
                        Q: a
                    } [M] || String(M || "").toLowerCase().replace(/s$/, "")
                },
                u: function(M) {
                    return M === void 0
                }
            },
            P = "en",
            z = {};
        z[P] = y;
        var Y = "$isDayjsObject",
            j = function(M) {
                return M instanceof K || !(!M || !M[Y])
            },
            B = function M(I, k, x) {
                var A;
                if (!I) return P;
                if (typeof I == "string") {
                    var C = I.toLowerCase();
                    z[C] && (A = C), k && (z[C] = k, A = C);
                    var $ = I.split("-");
                    if (!A && $.length > 1) return M($[0])
                } else {
                    var U = I.name;
                    z[U] = I, A = U
                }
                return !x && A && (P = A), A || !x && P
            },
            V = function(M, I) {
                if (j(M)) return M.clone();
                var k = typeof I == "object" ? I : {};
                return k.date = M, k.args = arguments, new K(k)
            },
            L = b;
        L.l = B, L.i = j, L.w = function(M, I) {
            return V(M, {
                locale: I.$L,
                utc: I.$u,
                x: I.$x,
                $offset: I.$offset
            })
        };
        var K = function() {
                function M(k) {
                    this.$L = B(k.locale, null, !0), this.parse(k), this.$x = this.$x || k.x || {}, this[Y] = !0
                }
                var I = M.prototype;
                return I.parse = function(k) {
                    this.$d = function(x) {
                        var A = x.date,
                            C = x.utc;
                        if (A === null) return new Date(NaN);
                        if (L.u(A)) return new Date;
                        if (A instanceof Date) return new Date(A);
                        if (typeof A == "string" && !/Z$/i.test(A)) {
                            var $ = A.match(m);
                            if ($) {
                                var U = $[2] - 1 || 0,
                                    F = ($[7] || "0").substring(0, 3);
                                return C ? new Date(Date.UTC($[1], U, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, F)) : new Date($[1], U, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, F)
                            }
                        }
                        return new Date(A)
                    }(k), this.init()
                }, I.init = function() {
                    var k = this.$d;
                    this.$y = k.getFullYear(), this.$M = k.getMonth(), this.$D = k.getDate(), this.$W = k.getDay(), this.$H = k.getHours(), this.$m = k.getMinutes(), this.$s = k.getSeconds(), this.$ms = k.getMilliseconds()
                }, I.$utils = function() {
                    return L
                }, I.isValid = function() {
                    return this.$d.toString() !== g
                }, I.isSame = function(k, x) {
                    var A = V(k);
                    return this.startOf(x) <= A && A <= this.endOf(x)
                }, I.isAfter = function(k, x) {
                    return V(k) < this.startOf(x)
                }, I.isBefore = function(k, x) {
                    return this.endOf(x) < V(k)
                }, I.$g = function(k, x, A) {
                    return L.u(k) ? this[x] : this.set(A, k)
                }, I.unix = function() {
                    return Math.floor(this.valueOf() / 1e3)
                }, I.valueOf = function() {
                    return this.$d.getTime()
                }, I.startOf = function(k, x) {
                    var A = this,
                        C = !!L.u(x) || x,
                        $ = L.p(k),
                        U = function(H, R) {
                            var G = L.w(A.$u ? Date.UTC(A.$y, R, H) : new Date(A.$y, R, H), A);
                            return C ? G : G.endOf(f)
                        },
                        F = function(H, R) {
                            return L.w(A.toDate()[H].apply(A.toDate("s"), (C ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(R)), A)
                        },
                        q = this.$W,
                        J = this.$M,
                        re = this.$D,
                        _e = "set" + (this.$u ? "UTC" : "");
                    switch ($) {
                        case d:
                            return C ? U(1, 0) : U(31, 11);
                        case r:
                            return C ? U(1, J) : U(0, J + 1);
                        case p:
                            var O = this.$locale().weekStart || 0,
                                Z = (q < O ? q + 7 : q) - O;
                            return U(C ? re - Z : re + (6 - Z), J);
                        case f:
                        case v:
                            return F(_e + "Hours", 0);
                        case u:
                            return F(_e + "Minutes", 1);
                        case c:
                            return F(_e + "Seconds", 2);
                        case l:
                            return F(_e + "Milliseconds", 3);
                        default:
                            return this.clone()
                    }
                }, I.endOf = function(k) {
                    return this.startOf(k, !1)
                }, I.$set = function(k, x) {
                    var A, C = L.p(k),
                        $ = "set" + (this.$u ? "UTC" : ""),
                        U = (A = {}, A[f] = $ + "Date", A[v] = $ + "Date", A[r] = $ + "Month", A[d] = $ + "FullYear", A[u] = $ + "Hours", A[c] = $ + "Minutes", A[l] = $ + "Seconds", A[s] = $ + "Milliseconds", A)[C],
                        F = C === f ? this.$D + (x - this.$W) : x;
                    if (C === r || C === d) {
                        var q = this.clone().set(v, 1);
                        q.$d[U](F), q.init(), this.$d = q.set(v, Math.min(this.$D, q.daysInMonth())).$d
                    } else U && this.$d[U](F);
                    return this.init(), this
                }, I.set = function(k, x) {
                    return this.clone().$set(k, x)
                }, I.get = function(k) {
                    return this[L.p(k)]()
                }, I.add = function(k, x) {
                    var A, C = this;
                    k = Number(k);
                    var $ = L.p(x),
                        U = function(J) {
                            var re = V(C);
                            return L.w(re.date(re.date() + Math.round(J * k)), C)
                        };
                    if ($ === r) return this.set(r, this.$M + k);
                    if ($ === d) return this.set(d, this.$y + k);
                    if ($ === f) return U(1);
                    if ($ === p) return U(7);
                    var F = (A = {}, A[c] = o, A[u] = i, A[l] = t, A)[$] || 1,
                        q = this.$d.getTime() + k * F;
                    return L.w(q, this)
                }, I.subtract = function(k, x) {
                    return this.add(-1 * k, x)
                }, I.format = function(k) {
                    var x = this,
                        A = this.$locale();
                    if (!this.isValid()) return A.invalidDate || g;
                    var C = k || "YYYY-MM-DDTHH:mm:ssZ",
                        $ = L.z(this),
                        U = this.$H,
                        F = this.$m,
                        q = this.$M,
                        J = A.weekdays,
                        re = A.months,
                        _e = A.meridiem,
                        O = function(R, G, Q, ge) {
                            return R && (R[G] || R(x, C)) || Q[G].slice(0, ge)
                        },
                        Z = function(R) {
                            return L.s(U % 12 || 12, R, "0")
                        },
                        H = _e || function(R, G, Q) {
                            var ge = R < 12 ? "AM" : "PM";
                            return Q ? ge.toLowerCase() : ge
                        };
                    return C.replace(h, function(R, G) {
                        return G || function(Q) {
                            switch (Q) {
                                case "YY":
                                    return String(x.$y).slice(-2);
                                case "YYYY":
                                    return L.s(x.$y, 4, "0");
                                case "M":
                                    return q + 1;
                                case "MM":
                                    return L.s(q + 1, 2, "0");
                                case "MMM":
                                    return O(A.monthsShort, q, re, 3);
                                case "MMMM":
                                    return O(re, q);
                                case "D":
                                    return x.$D;
                                case "DD":
                                    return L.s(x.$D, 2, "0");
                                case "d":
                                    return String(x.$W);
                                case "dd":
                                    return O(A.weekdaysMin, x.$W, J, 2);
                                case "ddd":
                                    return O(A.weekdaysShort, x.$W, J, 3);
                                case "dddd":
                                    return J[x.$W];
                                case "H":
                                    return String(U);
                                case "HH":
                                    return L.s(U, 2, "0");
                                case "h":
                                    return Z(1);
                                case "hh":
                                    return Z(2);
                                case "a":
                                    return H(U, F, !0);
                                case "A":
                                    return H(U, F, !1);
                                case "m":
                                    return String(F);
                                case "mm":
                                    return L.s(F, 2, "0");
                                case "s":
                                    return String(x.$s);
                                case "ss":
                                    return L.s(x.$s, 2, "0");
                                case "SSS":
                                    return L.s(x.$ms, 3, "0");
                                case "Z":
                                    return $
                            }
                            return null
                        }(R) || $.replace(":", "")
                    })
                }, I.utcOffset = function() {
                    return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                }, I.diff = function(k, x, A) {
                    var C, $ = this,
                        U = L.p(x),
                        F = V(k),
                        q = (F.utcOffset() - this.utcOffset()) * o,
                        J = this - F,
                        re = function() {
                            return L.m($, F)
                        };
                    switch (U) {
                        case d:
                            C = re() / 12;
                            break;
                        case r:
                            C = re();
                            break;
                        case a:
                            C = re() / 3;
                            break;
                        case p:
                            C = (J - q) / 6048e5;
                            break;
                        case f:
                            C = (J - q) / 864e5;
                            break;
                        case u:
                            C = J / i;
                            break;
                        case c:
                            C = J / o;
                            break;
                        case l:
                            C = J / t;
                            break;
                        default:
                            C = J
                    }
                    return A ? C : L.a(C)
                }, I.daysInMonth = function() {
                    return this.endOf(r).$D
                }, I.$locale = function() {
                    return z[this.$L]
                }, I.locale = function(k, x) {
                    if (!k) return this.$L;
                    var A = this.clone(),
                        C = B(k, x, !0);
                    return C && (A.$L = C), A
                }, I.clone = function() {
                    return L.w(this.$d, this)
                }, I.toDate = function() {
                    return new Date(this.valueOf())
                }, I.toJSON = function() {
                    return this.isValid() ? this.toISOString() : null
                }, I.toISOString = function() {
                    return this.$d.toISOString()
                }, I.toString = function() {
                    return this.$d.toUTCString()
                }, M
            }(),
            de = K.prototype;
        return V.prototype = de, [
            ["$ms", s],
            ["$s", l],
            ["$m", c],
            ["$H", u],
            ["$W", f],
            ["$M", r],
            ["$y", d],
            ["$D", v]
        ].forEach(function(M) {
            de[M[1]] = function(I) {
                return this.$g(I, M[0], M[1])
            }
        }), V.extend = function(M, I) {
            return M.$i || (M(I, K, V), M.$i = !0), V
        }, V.locale = B, V.isDayjs = j, V.unix = function(M) {
            return V(1e3 * M)
        }, V.en = z[P], V.Ls = z, V.p = {}, V
    })
})(ms);
var Bl = ms.exports;
const qe = yn(Bl);
var _s = {
    exports: {}
};
(function(e, n) {
    (function(t, o) {
        e.exports = o()
    })(He, function() {
        return function(t, o) {
            o.prototype.isSameOrBefore = function(i, s) {
                return this.isSame(i, s) || this.isBefore(i, s)
            }
        }
    })
})(_s);
var jl = _s.exports;
const Ll = yn(jl);
var ys = {
    exports: {}
};
(function(e, n) {
    (function(t, o) {
        e.exports = o()
    })(He, function() {
        var t = "minute",
            o = /[+-]\d\d(?::?\d\d)?/g,
            i = /([+-]|\d\d)/g;
        return function(s, l, c) {
            var u = l.prototype;
            c.utc = function(g) {
                var m = {
                    date: g,
                    utc: !0,
                    args: arguments
                };
                return new l(m)
            }, u.utc = function(g) {
                var m = c(this.toDate(), {
                    locale: this.$L,
                    utc: !0
                });
                return g ? m.add(this.utcOffset(), t) : m
            }, u.local = function() {
                return c(this.toDate(), {
                    locale: this.$L,
                    utc: !1
                })
            };
            var f = u.parse;
            u.parse = function(g) {
                g.utc && (this.$u = !0), this.$utils().u(g.$offset) || (this.$offset = g.$offset), f.call(this, g)
            };
            var p = u.init;
            u.init = function() {
                if (this.$u) {
                    var g = this.$d;
                    this.$y = g.getUTCFullYear(), this.$M = g.getUTCMonth(), this.$D = g.getUTCDate(), this.$W = g.getUTCDay(), this.$H = g.getUTCHours(), this.$m = g.getUTCMinutes(), this.$s = g.getUTCSeconds(), this.$ms = g.getUTCMilliseconds()
                } else p.call(this)
            };
            var r = u.utcOffset;
            u.utcOffset = function(g, m) {
                var h = this.$utils().u;
                if (h(g)) return this.$u ? 0 : h(this.$offset) ? r.call(this) : this.$offset;
                if (typeof g == "string" && (g = function(P) {
                        P === void 0 && (P = "");
                        var z = P.match(o);
                        if (!z) return null;
                        var Y = ("" + z[0]).match(i) || ["-", 0, 0],
                            j = Y[0],
                            B = 60 * +Y[1] + +Y[2];
                        return B === 0 ? 0 : j === "+" ? B : -B
                    }(g), g === null)) return this;
                var y = Math.abs(g) <= 16 ? 60 * g : g,
                    w = this;
                if (m) return w.$offset = y, w.$u = g === 0, w;
                if (g !== 0) {
                    var b = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
                    (w = this.local().add(y + b, t)).$offset = y, w.$x.$localOffset = b
                } else w = this.utc();
                return w
            };
            var a = u.format;
            u.format = function(g) {
                var m = g || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
                return a.call(this, m)
            }, u.valueOf = function() {
                var g = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
                return this.$d.valueOf() - 6e4 * g
            }, u.isUTC = function() {
                return !!this.$u
            }, u.toISOString = function() {
                return this.toDate().toISOString()
            }, u.toString = function() {
                return this.toDate().toUTCString()
            };
            var d = u.toDate;
            u.toDate = function(g) {
                return g === "s" && this.$offset ? c(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : d.call(this)
            };
            var v = u.diff;
            u.diff = function(g, m, h) {
                if (g && this.$u === g.$u) return v.call(this, g, m, h);
                var y = this.local(),
                    w = c(g).local();
                return v.call(y, w, m, h)
            }
        }
    })
})(ys);
var Rl = ys.exports;
const Vl = yn(Rl);
var bs = {
    exports: {}
};
(function(e, n) {
    (function(t, o) {
        e.exports = o()
    })(He, function() {
        var t = {
                year: 0,
                month: 1,
                day: 2,
                hour: 3,
                minute: 4,
                second: 5
            },
            o = {};
        return function(i, s, l) {
            var c, u = function(a, d, v) {
                    v === void 0 && (v = {});
                    var g = new Date(a),
                        m = function(h, y) {
                            y === void 0 && (y = {});
                            var w = y.timeZoneName || "short",
                                b = h + "|" + w,
                                P = o[b];
                            return P || (P = new Intl.DateTimeFormat("en-US", {
                                hour12: !1,
                                timeZone: h,
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                timeZoneName: w
                            }), o[b] = P), P
                        }(d, v);
                    return m.formatToParts(g)
                },
                f = function(a, d) {
                    for (var v = u(a, d), g = [], m = 0; m < v.length; m += 1) {
                        var h = v[m],
                            y = h.type,
                            w = h.value,
                            b = t[y];
                        b >= 0 && (g[b] = parseInt(w, 10))
                    }
                    var P = g[3],
                        z = P === 24 ? 0 : P,
                        Y = g[0] + "-" + g[1] + "-" + g[2] + " " + z + ":" + g[4] + ":" + g[5] + ":000",
                        j = +a;
                    return (l.utc(Y).valueOf() - (j -= j % 1e3)) / 6e4
                },
                p = s.prototype;
            p.tz = function(a, d) {
                a === void 0 && (a = c);
                var v = this.utcOffset(),
                    g = this.toDate(),
                    m = g.toLocaleString("en-US", {
                        timeZone: a
                    }),
                    h = Math.round((g - new Date(m)) / 1e3 / 60),
                    y = l(m, {
                        locale: this.$L
                    }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(g.getTimezoneOffset() / 15) - h, !0);
                if (d) {
                    var w = y.utcOffset();
                    y = y.add(v - w, "minute")
                }
                return y.$x.$timezone = a, y
            }, p.offsetName = function(a) {
                var d = this.$x.$timezone || l.tz.guess(),
                    v = u(this.valueOf(), d, {
                        timeZoneName: a
                    }).find(function(g) {
                        return g.type.toLowerCase() === "timezonename"
                    });
                return v && v.value
            };
            var r = p.startOf;
            p.startOf = function(a, d) {
                if (!this.$x || !this.$x.$timezone) return r.call(this, a, d);
                var v = l(this.format("YYYY-MM-DD HH:mm:ss:SSS"), {
                    locale: this.$L
                });
                return r.call(v, a, d).tz(this.$x.$timezone, !0)
            }, l.tz = function(a, d, v) {
                var g = v && d,
                    m = v || d || c,
                    h = f(+l(), m);
                if (typeof a != "string") return l(a).tz(m);
                var y = function(z, Y, j) {
                        var B = z - 60 * Y * 1e3,
                            V = f(B, j);
                        if (Y === V) return [B, Y];
                        var L = f(B -= 60 * (V - Y) * 1e3, j);
                        return V === L ? [B, V] : [z - 60 * Math.min(V, L) * 1e3, Math.max(V, L)]
                    }(l.utc(a, g).valueOf(), h, m),
                    w = y[0],
                    b = y[1],
                    P = l(w).utcOffset(b);
                return P.$x.$timezone = m, P
            }, l.tz.guess = function() {
                return Intl.DateTimeFormat().resolvedOptions().timeZone
            }, l.tz.setDefault = function(a) {
                c = a
            }
        }
    })
})(bs);
var Nl = bs.exports;
const zl = yn(Nl);
qe.extend(Vl);
qe.extend(zl);
qe.extend(Ll);
const Ul = e => qe(e),
    ws = (e, n, t, o = 0) => qe(e).set("hour", n).set("minute", t).set("second", o),
    As = e => qe().tz(e),
    Hl = (e, n) => qe(e).format(n),
    Fl = (e, n) => qe(e).isSameOrBefore(n),
    xs = (e, n) => qe(e).isAfter(n),
    Gl = void 0;
Gt(Gl);
const Zt = e => () => e,
    Zl = "/assets/ambient-4-31184f78.mp3",
    Yl = "/assets/ambient-4-e38c4a0a.webm",
    Wl = "/assets/answering-machine-brock-39369c95.mp3",
    ql = "/assets/answering-machine-brock-d953664c.webm",
    Ql = "/assets/logbook-1-0fb8b45d.jpg",
    Kl = "/assets/logbook-10-bdea2a5b.jpg",
    Jl = "/assets/logbook-11-4c9da7f0.jpg",
    Xl = "/assets/logbook-12-60bf2721.jpg",
    ec = "/assets/logbook-13-e5cbd10b.jpg",
    tc = "/assets/logbook-14-27366e53.jpg",
    nc = "/assets/logbook-15-0adb8736.jpg",
    rc = "/assets/logbook-16-860ce45f.jpg",
    oc = "/assets/logbook-17-ba5cf8ce.jpg",
    ic = "/assets/logbook-18-48f79d3a.jpg",
    sc = "/assets/logbook-19-52a7ff56.jpg",
    ac = "/assets/logbook-2-f34a92a7.jpg",
    lc = "/assets/logbook-20-15976a74.jpg",
    cc = "/assets/logbook-21-b4a77799.jpg",
    uc = "/assets/logbook-22-281b5db1.jpg",
    fc = "/assets/logbook-23-c9e4daa7.png",
    dc = "/assets/logbook-24-b785439c.png",
    pc = "/assets/logbook-25-22c36767.png",
    gc = "/assets/logbook-26-916e5aa9.jpg",
    vc = "/assets/logbook-27-2eef6902.jpg",
    hc = "/assets/logbook-28-2900b975.jpg",
    mc = "/assets/logbook-29-e3169f79.jpg",
    _c = "/assets/logbook-3-702b48ec.jpg",
    yc = "/assets/logbook-30-3efd9af2.jpg",
    bc = "/assets/logbook-31-a5e2bcf3.jpg",
    wc = "/assets/logbook-4-e1e4d6b8.jpg",
    Ac = "/assets/logbook-5-b07340b1.jpg",
    xc = "/assets/logbook-6-aad79ad3.jpg",
    Sc = "/assets/logbook-7-447b8550.jpg",
    Tc = "/assets/logbook-8-75782f09.jpg",
    kc = "/assets/logbook-9-5c82ced1.jpg",
    $c = "/assets/bg-2662001f.png",
    Ic = "/assets/transition-video-c386f433.mp4",
    ct = e => new URL(Object.assign({
        "../../../content/assets/ambient-tracks/ambient-track/ambient-4.mp3": Zl,
        "../../../content/assets/ambient-tracks/ambient-track/ambient-4.webm": Yl,
        "../../../content/assets/answering-machine/message-track/answering-machine-brock.mp3": Wl,
        "../../../content/assets/answering-machine/message-track/answering-machine-brock.webm": ql,
        "../../../content/assets/logs/log/logbook-1.jpg": Ql,
        "../../../content/assets/logs/log/logbook-10.jpg": Kl,
        "../../../content/assets/logs/log/logbook-11.jpg": Jl,
        "../../../content/assets/logs/log/logbook-12.jpg": Xl,
        "../../../content/assets/logs/log/logbook-13.jpg": ec,
        "../../../content/assets/logs/log/logbook-14.jpg": tc,
        "../../../content/assets/logs/log/logbook-15.jpg": nc,
        "../../../content/assets/logs/log/logbook-16.jpg": rc,
        "../../../content/assets/logs/log/logbook-17.jpg": oc,
        "../../../content/assets/logs/log/logbook-18.jpg": ic,
        "../../../content/assets/logs/log/logbook-19.jpg": sc,
        "../../../content/assets/logs/log/logbook-2.jpg": ac,
        "../../../content/assets/logs/log/logbook-20.jpg": lc,
        "../../../content/assets/logs/log/logbook-21.jpg": cc,
        "../../../content/assets/logs/log/logbook-22.jpg": uc,
        "../../../content/assets/logs/log/logbook-23.png": fc,
        "../../../content/assets/logs/log/logbook-24.png": dc,
        "../../../content/assets/logs/log/logbook-25.png": pc,
        "../../../content/assets/logs/log/logbook-26.jpg": gc,
        "../../../content/assets/logs/log/logbook-27.jpg": vc,
        "../../../content/assets/logs/log/logbook-28.jpg": hc,
        "../../../content/assets/logs/log/logbook-29.jpg": mc,
        "../../../content/assets/logs/log/logbook-3.jpg": _c,
        "../../../content/assets/logs/log/logbook-30.jpg": yc,
        "../../../content/assets/logs/log/logbook-31.jpg": bc,
        "../../../content/assets/logs/log/logbook-4.jpg": wc,
        "../../../content/assets/logs/log/logbook-5.jpg": Ac,
        "../../../content/assets/logs/log/logbook-6.jpg": xc,
        "../../../content/assets/logs/log/logbook-7.jpg": Sc,
        "../../../content/assets/logs/log/logbook-8.jpg": Tc,
        "../../../content/assets/logs/log/logbook-9.jpg": kc,
        "../../../content/assets/scenes/scene/bg.png": $c,
        "../../../content/assets/scenes/scene/transition-video.mp4": Ic
    })["../../../content/assets/".concat(e)], self.location).href,
    Pc = El,
    Oc = Zt(Pc),
    ii = () => {
        const e = Oc()[0];
        return ht(ye({}, e), {
            srcWebm: ct(e.src.webm),
            srcMp3: ct(e.src.mp3)
        })
    },
    Ec = [{
        src: {
            mp3: "answering-machine/message-track/answering-machine-brock.mp3",
            webm: "answering-machine/message-track/answering-machine-brock.webm"
        },
        postDate: "2023-11-28"
    }],
    Dc = Ec,
    Cc = Zt(Dc),
    on = () => {
        const e = Cc()[0];
        if (e) return ht(ye({}, e), {
            srcWebm: ct(e.src.webm),
            srcMp3: ct(e.src.mp3)
        })
    },
    Mc = "/assets/background-music-83982c9a.webm",
    Bc = "/assets/background-music-f98c94df.mp3";

function jc(e) {
    return e !== null && (typeof e == "object" || typeof e == "function")
}

function si(e, ...n) {
    return typeof e == "function" ? e(...n) : e
}
var Lc = (e => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, {
        get: (n, t) => (typeof require < "u" ? require : n)[t]
    }) : e)(function(e) {
        if (typeof require < "u") return require.apply(this, arguments);
        throw Error('Dynamic require of "' + e + '" is not supported')
    }),
    Rc = e => (typeof e.clear == "function" || (e.clear = () => {
        let n;
        for (; n = e.key(0);) e.removeItem(n)
    }), e),
    Vc = e => {
        if (!e) return "";
        let n = "";
        for (const t in e) {
            if (!e.hasOwnProperty(t)) continue;
            const o = e[t];
            n += o instanceof Date ? "; ".concat(t, "=").concat(o.toUTCString()) : typeof o == "boolean" ? "; ".concat(t) : "; ".concat(t, "=").concat(o)
        }
        return n
    },
    ai;
try {
    ai = Lc("solid-start/server").useRequest
} catch (e) {
    ai = () => (console.warn("It seems you attempt to use cookieStorage on the server without having solid-start installed"), {
        request: {
            headers: {
                get: () => ""
            }
        }
    })
}
var mt = Rc({
    _read: () => document.cookie,
    _write: (e, n, t) => {
        document.cookie = "".concat(e, "=").concat(n).concat(Vc(t))
    },
    getItem: (e, n) => {
        var t, o;
        return (o = (t = mt._read(n).match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)")) == null ? void 0 : t.pop()) != null ? o : null
    },
    setItem: (e, n, t) => {
        const o = mt.getItem(e);
        mt._write(e, n, t);
        const i = Object.assign(new Event("storage"), {
            key: e,
            oldValue: o,
            newValue: n,
            url: globalThis.document.URL,
            storageArea: mt
        });
        window.dispatchEvent(i)
    },
    removeItem: e => {
        mt._write(e, "deleted", {
            expires: new Date(0)
        })
    },
    key: e => {
        let n = null,
            t = 0;
        return mt._read().replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g, (o, i) => (!n && i && t++ === e && (n = i), "")), n
    },
    get length() {
        let e = 0;
        return mt._read().replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g, n => (e += n ? 1 : 0, "")), e
    }
});

function Nc(e, n = {}) {
    const t = n.storage || globalThis.localStorage;
    if (!t) return e;
    const o = n.name || "storage-".concat(os()),
        i = n.serialize || JSON.stringify.bind(JSON),
        s = n.deserialize || JSON.parse.bind(JSON),
        l = t.getItem(o, n.storageOptions),
        c = typeof e[0] == "function" ? f => e[1](() => s(f)) : f => e[1](xl(s(f)));
    let u = !0;
    return l instanceof Promise ? l.then(f => u && f && c(f)) : l && c(l), [e[0], typeof e[0] == "function" ? f => {
        const p = e[1](f);
        return f != null ? t.setItem(o, i(p), n.storageOptions) : t.removeItem(o), u = !1, p
    } : (...f) => {
        e[1](...f), t.setItem(o, i(fe(() => e[0])), n.storageOptions), u = !1
    }]
}
const zc = [{
        playlistId: "1783122253175478642",
        postDate: "2023-12-02",
        dropTime: {
            hours: 18,
            minutes: 16,
            seconds: 50
        }
    }, {
        playlistId: "1783122218483395972",
        postDate: "2023-11-29",
        dropTime: {
            hours: 17,
            minutes: 0,
            seconds: 49
        }
    }, {
        playlistId: "1783122161711370164",
        postDate: "2023-11-26",
        dropTime: {
            hours: 12,
            minutes: 2,
            seconds: 25
        }
    }, {
        playlistId: "1783109930660655736",
        postDate: "2023-11-24",
        dropTime: {
            hours: 8,
            minutes: 33,
            seconds: 23
        }
    }, {
        playlistId: "1783094887249199027",
        postDate: "2023-11-23",
        dropTime: {
            hours: 18,
            minutes: 44,
            seconds: 18
        }
    }, {
        playlistId: "1782780706455104492",
        postDate: "2023-11-20",
        dropTime: {
            hours: 8,
            minutes: 16,
            seconds: 10
        }
    }, {
        playlistId: "1782417091728449646",
        postDate: "2023-11-16",
        dropTime: {
            hours: 20,
            minutes: 1,
            seconds: 27
        }
    }, {
        playlistId: "1782182165669138360",
        postDate: "2023-11-13",
        dropTime: {
            hours: 18,
            minutes: 17,
            seconds: 12
        }
    }, {
        playlistId: "1781965341241327451",
        postDate: "2023-11-11",
        dropTime: {
            hours: 19,
            minutes: 14,
            seconds: 23
        }
    }, {
        playlistId: "1781605789148746543",
        postDate: "2023-11-09",
        dropTime: {
            hours: 11,
            minutes: 28,
            seconds: 2
        }
    }, {
        playlistId: "1781605584504543634",
        postDate: "2023-11-07",
        dropTime: {
            hours: 16,
            minutes: 1,
            seconds: 52
        }
    }, {
        playlistId: "1781482016478327416",
        postDate: "2023-11-06",
        dropTime: {
            hours: 15,
            minutes: 36,
            seconds: 22
        }
    }],
    Uc = zc,
    Hc = Zt(Uc),
    fn = () => Hc().map(n => ht(ye({}, n), {
        postDate: Ul(n.postDate).subtract(2, "day").format("YYYY-MM-DD")
    })),
    Fc = {
        isInstructionsModalViewed: !1,
        isDataUsageWarningDialogAccepted: !1
    },
    [ut, bn] = Nc(Gt(Fc), {
        name: "notifications-manager-data"
    }),
    Gc = () => ut.isInstructionsModalViewed !== !0,
    Zc = () => {
        bn("isInstructionsModalViewed", !0)
    },
    Yc = () => ut.isDataUsageWarningDialogAccepted === !0,
    Wc = () => {
        bn("isDataUsageWarningDialogAccepted", !0)
    },
    qc = () => {
        const e = on();
        return e ? ut.lastPlayedAnsweringMachineTrackDate ? xs(e.postDate, ut.lastPlayedAnsweringMachineTrackDate) : !0 : !1
    },
    Qc = () => {
        const e = on();
        e && bn("lastPlayedAnsweringMachineTrackDate", e.postDate)
    },
    Kc = () => {
        const e = fn()[0];
        return e ? ut.lastPlayedArchiveDate ? xs(e.postDate, ut.lastPlayedArchiveDate) : !0 : !1
    },
    Jc = e => {
        ut.lastPlayedArchiveDate && Fl(e, ut.lastPlayedArchiveDate) || bn("lastPlayedArchiveDate", e)
    },
    Xc = () => {
        const e = fn()[0];
        e && bn("lastPlayedArchiveDate", e.postDate)
    },
    Ze = {
        instructionsModal: {
            isVisible: Gc,
            setViewed: Zc
        },
        dataUsageWarningDialog: {
            accepted: Yc,
            setAccepted: Wc
        },
        answeringMachineTrack: {
            hasNew: qc,
            setLastPlayed: Qc
        },
        archive: {
            hasNew: Kc,
            setLastPlayed: Jc,
            dismissNotification: Xc
        }
    };
var Oe = function() {
    return Oe = Object.assign || function(n) {
        for (var t, o = 1, i = arguments.length; o < i; o++) {
            t = arguments[o];
            for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (n[s] = t[s])
        }
        return n
    }, Oe.apply(this, arguments)
};

function tt(e, n, t) {
    if (t || arguments.length === 2)
        for (var o = 0, i = n.length, s; o < i; o++)(s || !(o in n)) && (s || (s = Array.prototype.slice.call(n, 0, o)), s[o] = n[o]);
    return e.concat(s || Array.prototype.slice.call(n))
}
var Kr = {
        exports: {}
    },
    li = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (li) {
    var ci = new Uint8Array(16);
    Kr.exports = function() {
        return li(ci), ci
    }
} else {
    var ui = new Array(16);
    Kr.exports = function() {
        for (var n = 0, t; n < 16; n++) n & 3 || (t = Math.random() * 4294967296), ui[n] = t >>> ((n & 3) << 3) & 255;
        return ui
    }
}
var Ss = Kr.exports,
    Ts = [];
for (var Nn = 0; Nn < 256; ++Nn) Ts[Nn] = (Nn + 256).toString(16).substr(1);

function eu(e, n) {
    var t = n || 0,
        o = Ts;
    return [o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]]].join("")
}
var ks = eu,
    tu = Ss,
    nu = ks,
    fi, kr, $r = 0,
    Ir = 0;

function ru(e, n, t) {
    var o = n && t || 0,
        i = n || [];
    e = e || {};
    var s = e.node || fi,
        l = e.clockseq !== void 0 ? e.clockseq : kr;
    if (s == null || l == null) {
        var c = tu();
        s == null && (s = fi = [c[0] | 1, c[1], c[2], c[3], c[4], c[5]]), l == null && (l = kr = (c[6] << 8 | c[7]) & 16383)
    }
    var u = e.msecs !== void 0 ? e.msecs : new Date().getTime(),
        f = e.nsecs !== void 0 ? e.nsecs : Ir + 1,
        p = u - $r + (f - Ir) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383), (p < 0 || u > $r) && e.nsecs === void 0 && (f = 0), f >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    $r = u, Ir = f, kr = l, u += 122192928e5;
    var r = ((u & 268435455) * 1e4 + f) % 4294967296;
    i[o++] = r >>> 24 & 255, i[o++] = r >>> 16 & 255, i[o++] = r >>> 8 & 255, i[o++] = r & 255;
    var a = u / 4294967296 * 1e4 & 268435455;
    i[o++] = a >>> 8 & 255, i[o++] = a & 255, i[o++] = a >>> 24 & 15 | 16, i[o++] = a >>> 16 & 255, i[o++] = l >>> 8 | 128, i[o++] = l & 255;
    for (var d = 0; d < 6; ++d) i[o + d] = s[d];
    return n || nu(i)
}
var ou = ru,
    iu = Ss,
    su = ks;

function au(e, n, t) {
    var o = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var i = e.random || (e.rng || iu)();
    if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, n)
        for (var s = 0; s < 16; ++s) n[o + s] = i[s];
    return n || su(i)
}
var lu = au,
    cu = ou,
    $s = lu,
    uo = $s;
uo.v1 = cu;
uo.v4 = $s;
var uu = uo;
/*!
 * Core functionality for Snowplow JavaScript trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var fu = "3.16.0";

function du(e) {
    if (!e) return e;
    var n = 4 - e.length % 4;
    switch (n) {
        case 2:
            e += "==";
            break;
        case 3:
            e += "=";
            break
    }
    var t = e.replace(/-/g, "+").replace(/_/g, "/");
    return vu(t)
}

function pu(e) {
    if (!e) return e;
    var n = gu(e);
    return n.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}
var it = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function gu(e) {
    var n, t, o, i, s, l, c, u, f = 0,
        p = 0,
        r = [];
    if (!e) return e;
    e = unescape(encodeURIComponent(e));
    do n = e.charCodeAt(f++), t = e.charCodeAt(f++), o = e.charCodeAt(f++), u = n << 16 | t << 8 | o, i = u >> 18 & 63, s = u >> 12 & 63, l = u >> 6 & 63, c = u & 63, r[p++] = it.charAt(i) + it.charAt(s) + it.charAt(l) + it.charAt(c); while (f < e.length);
    var a = r.join(""),
        d = e.length % 3;
    return (d ? a.slice(0, d - 3) : a) + "===".slice(d || 3)
}

function vu(e) {
    var n = function(v) {
            return decodeURIComponent(v.split("").map(function(g) {
                return "%" + ("00" + g.charCodeAt(0).toString(16)).slice(-2)
            }).join(""))
        },
        t, o, i, s, l, c, u, f, p = 0,
        r = 0,
        a = "",
        d = [];
    if (!e) return e;
    e += "";
    do s = it.indexOf(e.charAt(p++)), l = it.indexOf(e.charAt(p++)), c = it.indexOf(e.charAt(p++)), u = it.indexOf(e.charAt(p++)), f = s << 18 | l << 12 | c << 6 | u, t = f >> 16 & 255, o = f >> 8 & 255, i = f & 255, c === 64 ? d[r++] = String.fromCharCode(t) : u === 64 ? d[r++] = String.fromCharCode(t, o) : d[r++] = String.fromCharCode(t, o, i); while (p < e.length);
    return a = d.join(""), n(a.replace(/\0+$/, ""))
}

function fo() {
    var e = {},
        n = [],
        t = [],
        o = [],
        i, s = function(f, p) {
            p != null && p !== "" && (e[f] = p)
        },
        l = function(f) {
            for (var p in f) Object.prototype.hasOwnProperty.call(f, p) && s(p, f[p])
        },
        c = function(f, p, r) {
            if (r && Is(r)) {
                var a = {
                    keyIfEncoded: f,
                    keyIfNotEncoded: p,
                    json: r
                };
                t.push(a), n.push(a)
            }
        },
        u = function(f) {
            o.push(f)
        };
    return {
        add: s,
        addDict: l,
        addJson: c,
        addContextEntity: u,
        getPayload: function() {
            return e
        },
        getJson: function() {
            return n
        },
        withJsonProcessor: function(f) {
            i = f
        },
        build: function() {
            return i == null || i(this, t, o), e
        }
    }
}

function hu(e) {
    return function(n, t, o) {
        for (var i = function(a, d, v) {
                var g = JSON.stringify(a);
                e ? n.add(d, pu(g)) : n.add(v, g)
            }, s = function() {
                var a = n.getPayload();
                if (e ? a.cx : a.co) return JSON.parse(e ? du(a.cx) : a.co)
            }, l = function(a, d) {
                var v = a || s();
                return v ? v.data = v.data.concat(d.data) : v = d, v
            }, c = void 0, u = 0, f = t; u < f.length; u++) {
            var p = f[u];
            p.keyIfEncoded === "cx" ? c = l(c, p.json) : i(p.json, p.keyIfEncoded, p.keyIfNotEncoded)
        }
        if (t.length = 0, o.length) {
            var r = {
                schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                data: tt([], o, !0)
            };
            c = l(c, r), o.length = 0
        }
        c && i(c, "cx", "co")
    }
}

function Is(e) {
    if (!Ps(e)) return !1;
    for (var n in e)
        if (Object.prototype.hasOwnProperty.call(e, n)) return !0;
    return !1
}

function Ps(e) {
    return typeof e < "u" && e !== null && (e.constructor === {}.constructor || e.constructor === [].constructor)
}
var zn = "Snowplow: ",
    ze;
(function(e) {
    e[e.none = 0] = "none", e[e.error = 1] = "error", e[e.warn = 2] = "warn", e[e.debug = 3] = "debug", e[e.info = 4] = "info"
})(ze || (ze = {}));
var Re = mu();

function mu(e) {
    e === void 0 && (e = ze.warn);

    function n(l) {
        ze[l] ? e = l : e = ze.warn
    }

    function t(l, c) {
        for (var u = [], f = 2; f < arguments.length; f++) u[f - 2] = arguments[f];
        if (e >= ze.error && typeof console < "u") {
            var p = zn + l + "\n";
            c ? console.error.apply(console, tt([p + "\n", c], u, !1)) : console.error.apply(console, tt([p], u, !1))
        }
    }

    function o(l, c) {
        for (var u = [], f = 2; f < arguments.length; f++) u[f - 2] = arguments[f];
        if (e >= ze.warn && typeof console < "u") {
            var p = zn + l;
            c ? console.warn.apply(console, tt([p + "\n", c], u, !1)) : console.warn.apply(console, tt([p], u, !1))
        }
    }

    function i(l) {
        for (var c = [], u = 1; u < arguments.length; u++) c[u - 1] = arguments[u];
        e >= ze.debug && typeof console < "u" && console.debug.apply(console, tt([zn + l], c, !1))
    }

    function s(l) {
        for (var c = [], u = 1; u < arguments.length; u++) c[u - 1] = arguments[u];
        e >= ze.info && typeof console < "u" && console.info.apply(console, tt([zn + l], c, !1))
    }
    return {
        setLogLevel: n,
        warn: o,
        error: t,
        debug: i,
        info: s
    }
}

function _u() {
    var e = [],
        n = [],
        t = function(o) {
            var i = ku(o),
                s = $u(o),
                l = [],
                c = Xr(e, o, s, i);
            l.push.apply(l, c);
            var u = Eu(n, o, s, i);
            return l.push.apply(l, u), l
        };
    return {
        getGlobalPrimitives: function() {
            return e
        },
        getConditionalProviders: function() {
            return n
        },
        addGlobalContexts: function(o) {
            for (var i = [], s = [], l = 0, c = o; l < c.length; l++) {
                var u = c[l];
                pi(u) ? i.push(u) : zt(u) && s.push(u)
            }
            e = e.concat(s), n = n.concat(i)
        },
        clearGlobalContexts: function() {
            n = [], e = []
        },
        removeGlobalContexts: function(o) {
            for (var i = function(u) {
                    pi(u) ? n = n.filter(function(f) {
                        return JSON.stringify(f) !== JSON.stringify(u)
                    }) : zt(u) && (e = e.filter(function(f) {
                        return JSON.stringify(f) !== JSON.stringify(u)
                    }))
                }, s = 0, l = o; s < l.length; s++) {
                var c = l[s];
                i(c)
            }
        },
        getApplicableContexts: function(o) {
            return t(o)
        }
    }
}

function yu(e) {
    return {
        addPluginContexts: function(n) {
            var t = n ? tt([], n, !0) : [];
            return e.forEach(function(o) {
                try {
                    o.contexts && t.push.apply(t, o.contexts())
                } catch (i) {
                    Re.error("Error adding plugin contexts", i)
                }
            }), t
        }
    }
}

function bu(e) {
    var n = new RegExp("^iglu:([a-zA-Z0-9-_.]+)/([a-zA-Z0-9-_]+)/jsonschema/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$"),
        t = n.exec(e);
    if (t !== null) return t.slice(1, 6)
}

function wu(e) {
    if (e[0] === "*" || e[1] === "*") return !1;
    if (e.slice(2).length > 0) {
        for (var n = !1, t = 0, o = e.slice(2); t < o.length; t++) {
            var i = o[t];
            if (i === "*") n = !0;
            else if (n) return !1
        }
        return !0
    } else if (e.length == 2) return !0;
    return !1
}

function Os(e) {
    var n = e.split(".");
    return n && n.length > 1 ? wu(n) : !1
}

function Es(e) {
    var n = new RegExp("^iglu:((?:(?:[a-zA-Z0-9-_]+|\\*).)+(?:[a-zA-Z0-9-_]+|\\*))/([a-zA-Z0-9-_.]+|\\*)/jsonschema/([1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)$"),
        t = n.exec(e);
    if (t !== null && Os(t[1])) return t.slice(1, 6)
}

function Jr(e) {
    var n = Es(e);
    if (n) {
        var t = n[0];
        return n.length === 5 && Os(t)
    }
    return !1
}

function Au(e) {
    return Array.isArray(e) && e.every(function(n) {
        return typeof n == "string"
    })
}

function di(e) {
    return Au(e) ? e.every(function(n) {
        return Jr(n)
    }) : typeof e == "string" ? Jr(e) : !1
}

function dn(e) {
    var n = e;
    return Is(n) && "schema" in n && "data" in n ? typeof n.schema == "string" && typeof n.data == "object" : !1
}

function xu(e) {
    var n = e,
        t = 0;
    if (e != null && typeof e == "object" && !Array.isArray(e)) {
        if (Object.prototype.hasOwnProperty.call(n, "accept"))
            if (di(n.accept)) t += 1;
            else return !1;
        if (Object.prototype.hasOwnProperty.call(n, "reject"))
            if (di(n.reject)) t += 1;
            else return !1;
        return t > 0 && t <= 2
    }
    return !1
}

function or(e) {
    return typeof e == "function" && e.length <= 1
}

function zt(e) {
    return or(e) || dn(e)
}

function Ds(e) {
    return Array.isArray(e) && e.length === 2 ? Array.isArray(e[1]) ? or(e[0]) && e[1].every(zt) : or(e[0]) && zt(e[1]) : !1
}

function Cs(e) {
    return Array.isArray(e) && e.length === 2 && xu(e[0]) ? Array.isArray(e[1]) ? e[1].every(zt) : zt(e[1]) : !1
}

function pi(e) {
    return Ds(e) || Cs(e)
}

function Su(e, n) {
    var t = 0,
        o = 0,
        i = e.accept;
    Array.isArray(i) ? e.accept.some(function(l) {
        return Un(l, n)
    }) && o++ : typeof i == "string" && Un(i, n) && o++;
    var s = e.reject;
    return Array.isArray(s) ? e.reject.some(function(l) {
        return Un(l, n)
    }) && t++ : typeof s == "string" && Un(s, n) && t++, o > 0 && t === 0 ? !0 : (o === 0 && t > 0, !1)
}

function Un(e, n) {
    if (!Jr(e)) return !1;
    var t = Es(e),
        o = bu(n);
    if (t && o) {
        if (!Tu(t[0], o[0])) return !1;
        for (var i = 1; i < 5; i++)
            if (!Ms(t[i], o[i])) return !1;
        return !0
    }
    return !1
}

function Tu(e, n) {
    var t = n.split("."),
        o = e.split(".");
    if (t && o) {
        if (t.length !== o.length) return !1;
        for (var i = 0; i < o.length; i++)
            if (!Ms(t[i], o[i])) return !1;
        return !0
    }
    return !1
}

function Ms(e, n) {
    return e && n && e === "*" || e === n
}

function ku(e) {
    for (var n = e.getJson(), t = 0, o = n; t < o.length; t++) {
        var i = o[t];
        if (i.keyIfEncoded === "ue_px" && typeof i.json.data == "object") {
            var s = i.json.data.schema;
            if (typeof s == "string") return s
        }
    }
    return ""
}

function $u(e) {
    var n = e.getPayload().e;
    return typeof n == "string" ? n : ""
}

function Iu(e, n, t, o) {
    var i = void 0;
    try {
        var s = {
            event: n.getPayload(),
            eventType: t,
            eventSchema: o
        };
        return i = e(s), Array.isArray(i) && i.every(dn) || dn(i) ? i : void 0
    } catch (l) {
        i = void 0
    }
    return i
}

function Bs(e) {
    return Array.isArray(e) ? e : Array.of(e)
}

function Xr(e, n, t, o) {
    var i, s = Bs(e),
        l = function(u) {
            var f = Pu(u, n, t, o);
            if (f && f.length !== 0) return f
        },
        c = s.map(l);
    return (i = []).concat.apply(i, c.filter(function(u) {
        return u != null && u.filter(Boolean)
    }))
}

function Pu(e, n, t, o) {
    if (dn(e)) return [e];
    if (or(e)) {
        var i = Iu(e, n, t, o);
        if (dn(i)) return [i];
        if (Array.isArray(i)) return i
    }
}

function Ou(e, n, t, o) {
    if (Ds(e)) {
        var i = e[0],
            s = !1;
        try {
            var l = {
                event: n.getPayload(),
                eventType: t,
                eventSchema: o
            };
            s = i(l)
        } catch (c) {
            s = !1
        }
        if (s === !0) return Xr(e[1], n, t, o)
    } else if (Cs(e) && Su(e[0], o)) return Xr(e[1], n, t, o);
    return []
}

function Eu(e, n, t, o) {
    var i, s = Bs(e),
        l = function(u) {
            var f = Ou(u, n, t, o);
            if (f && f.length !== 0) return f
        },
        c = s.map(l);
    return (i = []).concat.apply(i, c.filter(function(u) {
        return u != null && u.filter(Boolean)
    }))
}

function Du(e) {
    return e == null ? {
        type: "dtm",
        value: new Date().getTime()
    } : typeof e == "number" ? {
        type: "dtm",
        value: e
    } : e.type === "ttm" ? {
        type: "ttm",
        value: e.value
    } : {
        type: "dtm",
        value: e.value || new Date().getTime()
    }
}

function Cu(e) {
    e === void 0 && (e = {});

    function n(u, f, p) {
        var r = yu(f),
            a = _u(),
            d = u,
            v = {};

        function g(b) {
            if (b && b.length) return {
                schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                data: b
            }
        }

        function m(b, P) {
            var z = a.getApplicableContexts(b),
                Y = [];
            return P && P.length && Y.push.apply(Y, P), z && z.length && Y.push.apply(Y, z), Y
        }

        function h(b, P, z) {
            b.withJsonProcessor(hu(d)), b.add("eid", uu.v4()), b.addDict(v);
            var Y = Du(z);
            b.add(Y.type, Y.value.toString());
            var j = m(b, r.addPluginContexts(P)),
                B = g(j);
            B !== void 0 && b.addJson("cx", "co", B), f.forEach(function(L) {
                try {
                    L.beforeTrack && L.beforeTrack(b)
                } catch (K) {
                    Re.error("Plugin beforeTrack", K)
                }
            }), typeof p == "function" && p(b);
            var V = b.build();
            return f.forEach(function(L) {
                try {
                    L.afterTrack && L.afterTrack(V)
                } catch (K) {
                    Re.error("Plugin afterTrack", K)
                }
            }), V
        }

        function y(b, P) {
            v[b] = P
        }
        var w = {
            track: h,
            addPayloadPair: y,
            getBase64Encoding: function() {
                return d
            },
            setBase64Encoding: function(b) {
                d = b
            },
            addPayloadDict: function(b) {
                for (var P in b) Object.prototype.hasOwnProperty.call(b, P) && (v[P] = b[P])
            },
            resetPayloadPairs: function(b) {
                v = Ps(b) ? b : {}
            },
            setTrackerVersion: function(b) {
                y("tv", b)
            },
            setTrackerNamespace: function(b) {
                y("tna", b)
            },
            setAppId: function(b) {
                y("aid", b)
            },
            setPlatform: function(b) {
                y("p", b)
            },
            setUserId: function(b) {
                y("uid", b)
            },
            setScreenResolution: function(b, P) {
                y("res", b + "x" + P)
            },
            setViewport: function(b, P) {
                y("vp", b + "x" + P)
            },
            setColorDepth: function(b) {
                y("cd", b)
            },
            setTimezone: function(b) {
                y("tz", b)
            },
            setLang: function(b) {
                y("lang", b)
            },
            setIpAddress: function(b) {
                y("ip", b)
            },
            setUseragent: function(b) {
                y("ua", b)
            },
            addGlobalContexts: function(b) {
                a.addGlobalContexts(b)
            },
            clearGlobalContexts: function() {
                a.clearGlobalContexts()
            },
            removeGlobalContexts: function(b) {
                a.removeGlobalContexts(b)
            }
        };
        return w
    }
    var t = e.base64,
        o = e.corePlugins,
        i = e.callback,
        s = o != null ? o : [],
        l = n(t != null ? t : !0, s, i),
        c = Oe(Oe({}, l), {
            addPlugin: function(u) {
                var f, p, r = u.plugin;
                s.push(r), (f = r.logger) === null || f === void 0 || f.call(r, Re), (p = r.activateCorePlugin) === null || p === void 0 || p.call(r, c)
            }
        });
    return s == null || s.forEach(function(u) {
        var f, p;
        (f = u.logger) === null || f === void 0 || f.call(u, Re), (p = u.activateCorePlugin) === null || p === void 0 || p.call(u, c)
    }), c
}

function Mu(e) {
    var n = e.event,
        t = n.schema,
        o = n.data,
        i = fo(),
        s = {
            schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
            data: {
                schema: t,
                data: o
            }
        };
    return i.add("e", "ue"), i.addJson("ue_px", "ue_pr", s), i
}

function Bu(e) {
    var n = e.pageUrl,
        t = e.pageTitle,
        o = e.referrer,
        i = fo();
    return i.add("e", "pv"), i.add("url", n), i.add("page", t), i.add("refr", o), i
}

function ju(e) {
    var n = e.pageUrl,
        t = e.pageTitle,
        o = e.referrer,
        i = e.minXOffset,
        s = e.maxXOffset,
        l = e.minYOffset,
        c = e.maxYOffset,
        u = fo();
    return u.add("e", "pp"), u.add("url", n), u.add("page", t), u.add("refr", o), i && !isNaN(Number(i)) && u.add("pp_mix", i.toString()), s && !isNaN(Number(s)) && u.add("pp_max", s.toString()), l && !isNaN(Number(l)) && u.add("pp_miy", l.toString()), c && !isNaN(Number(c)) && u.add("pp_may", c.toString()), u
}
var Lu = fu,
    js = {
        exports: {}
    },
    Ls = {
        exports: {}
    };
(function() {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        n = {
            rotl: function(t, o) {
                return t << o | t >>> 32 - o
            },
            rotr: function(t, o) {
                return t << 32 - o | t >>> o
            },
            endian: function(t) {
                if (t.constructor == Number) return n.rotl(t, 8) & 16711935 | n.rotl(t, 24) & 4278255360;
                for (var o = 0; o < t.length; o++) t[o] = n.endian(t[o]);
                return t
            },
            randomBytes: function(t) {
                for (var o = []; t > 0; t--) o.push(Math.floor(Math.random() * 256));
                return o
            },
            bytesToWords: function(t) {
                for (var o = [], i = 0, s = 0; i < t.length; i++, s += 8) o[s >>> 5] |= t[i] << 24 - s % 32;
                return o
            },
            wordsToBytes: function(t) {
                for (var o = [], i = 0; i < t.length * 32; i += 8) o.push(t[i >>> 5] >>> 24 - i % 32 & 255);
                return o
            },
            bytesToHex: function(t) {
                for (var o = [], i = 0; i < t.length; i++) o.push((t[i] >>> 4).toString(16)), o.push((t[i] & 15).toString(16));
                return o.join("")
            },
            hexToBytes: function(t) {
                for (var o = [], i = 0; i < t.length; i += 2) o.push(parseInt(t.substr(i, 2), 16));
                return o
            },
            bytesToBase64: function(t) {
                for (var o = [], i = 0; i < t.length; i += 3)
                    for (var s = t[i] << 16 | t[i + 1] << 8 | t[i + 2], l = 0; l < 4; l++) i * 8 + l * 6 <= t.length * 8 ? o.push(e.charAt(s >>> 6 * (3 - l) & 63)) : o.push("=");
                return o.join("")
            },
            base64ToBytes: function(t) {
                t = t.replace(/[^A-Z0-9+\/]/ig, "");
                for (var o = [], i = 0, s = 0; i < t.length; s = ++i % 4) s != 0 && o.push((e.indexOf(t.charAt(i - 1)) & Math.pow(2, -2 * s + 8) - 1) << s * 2 | e.indexOf(t.charAt(i)) >>> 6 - s * 2);
                return o
            }
        };
    Ls.exports = n
})();
var Ru = Ls.exports,
    eo = {
        utf8: {
            stringToBytes: function(e) {
                return eo.bin.stringToBytes(unescape(encodeURIComponent(e)))
            },
            bytesToString: function(e) {
                return decodeURIComponent(escape(eo.bin.bytesToString(e)))
            }
        },
        bin: {
            stringToBytes: function(e) {
                for (var n = [], t = 0; t < e.length; t++) n.push(e.charCodeAt(t) & 255);
                return n
            },
            bytesToString: function(e) {
                for (var n = [], t = 0; t < e.length; t++) n.push(String.fromCharCode(e[t]));
                return n.join("")
            }
        }
    },
    gi = eo;
(function() {
    var e = Ru,
        n = gi.utf8,
        t = gi.bin,
        o = function(s) {
            s.constructor == String ? s = n.stringToBytes(s) : typeof Buffer < "u" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(s) ? s = Array.prototype.slice.call(s, 0) : Array.isArray(s) || (s = s.toString());
            var l = e.bytesToWords(s),
                c = s.length * 8,
                u = [],
                f = 1732584193,
                p = -271733879,
                r = -1732584194,
                a = 271733878,
                d = -1009589776;
            l[c >> 5] |= 128 << 24 - c % 32, l[(c + 64 >>> 9 << 4) + 15] = c;
            for (var v = 0; v < l.length; v += 16) {
                for (var g = f, m = p, h = r, y = a, w = d, b = 0; b < 80; b++) {
                    if (b < 16) u[b] = l[v + b];
                    else {
                        var P = u[b - 3] ^ u[b - 8] ^ u[b - 14] ^ u[b - 16];
                        u[b] = P << 1 | P >>> 31
                    }
                    var z = (f << 5 | f >>> 27) + d + (u[b] >>> 0) + (b < 20 ? (p & r | ~p & a) + 1518500249 : b < 40 ? (p ^ r ^ a) + 1859775393 : b < 60 ? (p & r | p & a | r & a) - 1894007588 : (p ^ r ^ a) - 899497514);
                    d = a, a = r, r = p << 30 | p >>> 2, p = f, f = z
                }
                f += g, p += m, r += h, a += y, d += w
            }
            return [f, p, r, a, d]
        },
        i = function(s, l) {
            var c = e.wordsToBytes(o(s));
            return l && l.asBytes ? c : l && l.asString ? t.bytesToString(c) : e.bytesToHex(c)
        };
    i._blocksize = 16, i._digestsize = 20, js.exports = i
})();
var Vu = js.exports;
const Nu = yn(Vu);
var to = {
        exports: {}
    },
    vi = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (vi) {
    var hi = new Uint8Array(16);
    to.exports = function() {
        return vi(hi), hi
    }
} else {
    var mi = new Array(16);
    to.exports = function() {
        for (var n = 0, t; n < 16; n++) n & 3 || (t = Math.random() * 4294967296), mi[n] = t >>> ((n & 3) << 3) & 255;
        return mi
    }
}
var Rs = to.exports,
    Vs = [];
for (var Hn = 0; Hn < 256; ++Hn) Vs[Hn] = (Hn + 256).toString(16).substr(1);

function zu(e, n) {
    var t = n || 0,
        o = Vs;
    return [o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]]].join("")
}
var Ns = zu,
    Uu = Rs,
    Hu = Ns,
    _i, Pr, Or = 0,
    Er = 0;

function Fu(e, n, t) {
    var o = n && t || 0,
        i = n || [];
    e = e || {};
    var s = e.node || _i,
        l = e.clockseq !== void 0 ? e.clockseq : Pr;
    if (s == null || l == null) {
        var c = Uu();
        s == null && (s = _i = [c[0] | 1, c[1], c[2], c[3], c[4], c[5]]), l == null && (l = Pr = (c[6] << 8 | c[7]) & 16383)
    }
    var u = e.msecs !== void 0 ? e.msecs : new Date().getTime(),
        f = e.nsecs !== void 0 ? e.nsecs : Er + 1,
        p = u - Or + (f - Er) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383), (p < 0 || u > Or) && e.nsecs === void 0 && (f = 0), f >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    Or = u, Er = f, Pr = l, u += 122192928e5;
    var r = ((u & 268435455) * 1e4 + f) % 4294967296;
    i[o++] = r >>> 24 & 255, i[o++] = r >>> 16 & 255, i[o++] = r >>> 8 & 255, i[o++] = r & 255;
    var a = u / 4294967296 * 1e4 & 268435455;
    i[o++] = a >>> 8 & 255, i[o++] = a & 255, i[o++] = a >>> 24 & 15 | 16, i[o++] = a >>> 16 & 255, i[o++] = l >>> 8 | 128, i[o++] = l & 255;
    for (var d = 0; d < 6; ++d) i[o + d] = s[d];
    return n || Hu(i)
}
var Gu = Fu,
    Zu = Rs,
    Yu = Ns;

function Wu(e, n, t) {
    var o = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var i = e.random || (e.rng || Zu)();
    if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, n)
        for (var s = 0; s < 16; ++s) n[o + s] = i[s];
    return n || Yu(i)
}
var qu = Wu,
    Qu = Gu,
    zs = qu,
    po = zs;
po.v1 = Qu;
po.v4 = zs;
var nt = po;
/*!
 * Core functionality for Snowplow Browser trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function Ku(e) {
    try {
        var n = window.localStorage,
            t = n.getItem(e + ".expires");
        if (t === null || +t > Date.now()) return n.getItem(e);
        n.removeItem(e), n.removeItem(e + ".expires");
        return
    } catch (o) {
        return
    }
}

function Qn(e, n, t) {
    t === void 0 && (t = 63072e3);
    try {
        var o = window.localStorage,
            i = Date.now() + t * 1e3;
        return o.setItem("".concat(e, ".expires"), i.toString()), o.setItem(e, n), !0
    } catch (s) {
        return !1
    }
}

function yi(e) {
    try {
        var n = window.localStorage;
        return n.removeItem(e), n.removeItem(e + ".expires"), !0
    } catch (t) {
        return !1
    }
}

function bi(e) {
    try {
        return window.sessionStorage.getItem(e)
    } catch (n) {
        return
    }
}

function Ju(e, n) {
    try {
        return window.sessionStorage.setItem(e, n), !0
    } catch (t) {
        return !1
    }
}

function Us(e) {
    return !!(e && typeof e.valueOf() == "string")
}

function wi(e) {
    return Number.isInteger && Number.isInteger(e) || typeof e == "number" && isFinite(e) && Math.floor(e) === e
}

function Ai(e) {
    if (!Us(e)) {
        e = e.text || "";
        var n = document.getElementsByTagName("title");
        n && n[0] != null && (e = n[0].text)
    }
    return e
}

function no(e) {
    var n = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"),
        t = n.exec(e);
    return t ? t[1] : e
}

function xi(e) {
    var n = e.length;
    return e.charAt(--n) === "." && (e = e.slice(0, n)), e.slice(0, 2) === "*." && (e = e.slice(1)), e
}

function Dr(e) {
    var n = window,
        t = pn("referrer", n.location.href) || pn("referer", n.location.href);
    if (t) return t;
    if (e) return e;
    try {
        if (n.top) return n.top.document.referrer;
        if (n.parent) return n.parent.document.referrer
    } catch (o) {}
    return document.referrer
}

function rt(e, n, t, o) {
    if (e.addEventListener) return e.addEventListener(n, t, o), !0;
    if (e.attachEvent) return e.attachEvent("on" + n, t);
    e["on" + n] = t
}

function pn(e, n) {
    var t = new RegExp("^[^#]*[?&]" + e + "=([^&#]*)").exec(n);
    return t ? decodeURIComponent(t[1].replace(/\+/g, " ")) : null
}

function Xu(e, n, t) {
    var o = n + "=" + t,
        i = e.split("#"),
        s = i[0].split("?"),
        l = s.shift(),
        c = s.join("?");
    if (!c) c = o;
    else {
        for (var u = !0, f = c.split("&"), p = 0; p < f.length; p++)
            if (f[p].substr(0, n.length + 1) === n + "=") {
                u = !1, f[p] = o, c = f.join("&");
                break
            } u && (c = o + "&" + c)
    }
    return i[0] = l + "?" + c, i.join("#")
}

function ef(e, n) {
    for (var t = window.location.hostname, o = "_sp_root_domain_test_", i = o + new Date().getTime(), s = "_test_value_" + new Date().getTime(), l = t.split("."), c = l.length - 2; c >= 0; c--) {
        var u = l.slice(c).join(".");
        if (yt(i, s, 0, "/", u, e, n), yt(i) === s) {
            ir(i, u, e, n);
            for (var f = tf(o), p = 0; p < f.length; p++) ir(f[p], u, e, n);
            return u
        }
    }
    return t
}

function ir(e, n, t, o) {
    yt(e, "", -1, "/", n, t, o)
}

function tf(e) {
    for (var n = document.cookie.split("; "), t = [], o = 0; o < n.length; o++) n[o].substring(0, e.length) === e && t.push(n[o]);
    return t
}

function yt(e, n, t, o, i, s, l) {
    return arguments.length > 1 ? document.cookie = e + "=" + encodeURIComponent(n != null ? n : "") + (t ? "; Expires=" + new Date(+new Date + t * 1e3).toUTCString() : "") + (o ? "; Path=" + o : "") + (i ? "; Domain=" + i : "") + (s ? "; SameSite=" + s : "") + (l ? "; Secure" : "") : decodeURIComponent((("; " + document.cookie).split("; " + e + "=")[1] || "").split(";")[0])
}

function nf() {
    try {
        return !!window.localStorage
    } catch (e) {
        return !0
    }
}

function rf() {
    var e = "modernizr";
    if (!nf()) return !1;
    try {
        var n = window.localStorage;
        return n.setItem(e, e), n.removeItem(e), !0
    } catch (t) {
        return !1
    }
}
var of = "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0", sf = "iglu:com.snowplowanalytics.snowplow/browser_context/jsonschema/1-0-0", af = "iglu:com.snowplowanalytics.snowplow/client_session/jsonschema/1-0-2", lf = "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4";

function cf(e, n, t, o, i, s, l, c, u, f, p, r, a, d, v, g, m) {
    var h = !1,
        y, w = [],
        b = !1;
    o = typeof o == "string" ? o.toLowerCase() : o;
    var P = o === !0 || o === "beacon" || o === "true",
        z = !!(P && window.navigator && window.navigator.sendBeacon && !_e(window.navigator.userAgent)),
        Y = z && P,
        j = o === "get",
        B = !!(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
        V = !j && B && (o === "post" || P),
        L = V ? i : "/i",
        K = "snowplowOutQueue_".concat(e, "_").concat(V ? "post2" : "get");
    if (P && (a = {}), s = t && rf() && V && s || 1, t) try {
        var de = window.localStorage.getItem(K);
        w = de ? JSON.parse(de) : []
    } catch (O) {}
    Array.isArray(w) || (w = []), n.outQueues.push(w), B && s > 1 && n.bufferFlushers.push(function(O) {
        h || $(O)
    });

    function M(O) {
        var Z = "?",
            H = {
                co: !0,
                cx: !0
            },
            R = !0;
        for (var G in O) O.hasOwnProperty(G) && !H.hasOwnProperty(G) && (R ? R = !1 : Z += "&", Z += encodeURIComponent(G) + "=" + encodeURIComponent(O[G]));
        for (var Q in H) O.hasOwnProperty(Q) && H.hasOwnProperty(Q) && (Z += "&" + Q + "=" + encodeURIComponent(O[Q]));
        return Z
    }

    function I(O) {
        var Z = Object.keys(O).map(function(H) {
            return [H, O[H]]
        }).reduce(function(H, R) {
            var G = R[0],
                Q = R[1];
            return H[G] = Q.toString(), H
        }, {});
        return {
            evt: Z,
            bytes: k(JSON.stringify(Z))
        }
    }

    function k(O) {
        for (var Z = 0, H = 0; H < O.length; H++) {
            var R = O.charCodeAt(H);
            R <= 127 ? Z += 1 : R <= 2047 ? Z += 2 : R >= 55296 && R <= 57343 ? (Z += 4, H++) : R < 65535 ? Z += 3 : Z += 4
        }
        return Z
    }
    var x = function(O) {
        return typeof O[0] == "object" && "evt" in O[0]
    };

    function A(O, Z) {
        var H = F(Z, !0, !1);
        H.send(q(J([O.evt])))
    }

    function C(O, Z) {
        y = Z + L;
        var H = function(Ie, Qe) {
            return Re.warn("Event (" + Ie + "B) too big, max is " + Qe)
        };
        if (V) {
            var R = I(O);
            if (R.bytes >= l) {
                H(R.bytes, l), A(R, y);
                return
            } else w.push(R)
        } else {
            var G = M(O);
            if (c > 0) {
                var Q = re(G),
                    ge = k(Q);
                if (ge >= c) {
                    if (H(ge, c), B) {
                        var R = I(O),
                            oe = Z + i;
                        A(R, oe)
                    }
                    return
                }
            }
            w.push(G)
        }
        var xe = !1;
        t && (xe = Qn(K, JSON.stringify(w.slice(0, f)))), !h && (!xe || w.length >= s) && $()
    }

    function $(O) {
        for (O === void 0 && (O = !1); w.length && typeof w[0] != "string" && typeof w[0] != "object";) w.shift();
        if (!w.length) {
            h = !1;
            return
        }
        if (!Us(y)) throw "No collector configured";
        if (h = !0, m && !b) {
            var Z = F(m, !1, O);
            b = !0, Z.timeout = p, Z.onreadystatechange = function() {
                Z.readyState === 4 && $()
            }, Z.send();
            return
        }
        if (B) {
            var H = function(Se) {
                    for (var Ne = 0, xn = 0; Ne < Se.length && (xn += Se[Ne].bytes, !(xn >= l));) Ne += 1;
                    return Ne
                },
                R = void 0,
                G, Q;
            x(w) ? (R = y, G = F(R, !0, O), Q = H(w)) : (R = re(w[0]), G = F(R, !1, O), Q = 1);
            var ge = setTimeout(function() {
                    G.abort(), h = !1
                }, p),
                oe = function(Se) {
                    for (var Ne = 0; Ne < Se; Ne++) w.shift();
                    t && Qn(K, JSON.stringify(w.slice(0, f)))
                },
                xe = function(Se) {
                    oe(Se), $()
                };
            if (G.onreadystatechange = function() {
                    G.readyState === 4 && G.status >= 200 && (clearTimeout(ge), G.status < 300 ? xe(Q) : (U(G.status) || (Re.error("Status ".concat(G.status, ", will not retry.")), oe(Q)), h = !1))
                }, !x(w)) G.send();
            else {
                var Ie = w.slice(0, Q);
                if (Ie.length > 0) {
                    var Qe = !1,
                        De = Ie.map(function(Se) {
                            return Se.evt
                        });
                    if (Y) {
                        var dt = new Blob([q(J(De))], {
                            type: "application/json"
                        });
                        try {
                            Qe = navigator.sendBeacon(R, dt)
                        } catch (Se) {
                            Qe = !1
                        }
                    }
                    Qe === !0 ? xe(Q) : G.send(q(J(De)))
                }
            }
        } else if (!r && !x(w)) {
            var Ke = new Image(1, 1),
                Je = !0;
            Ke.onload = function() {
                Je && (Je = !1, w.shift(), t && Qn(K, JSON.stringify(w.slice(0, f))), $())
            }, Ke.onerror = function() {
                Je && (Je = !1, h = !1)
            }, Ke.src = re(w[0]), setTimeout(function() {
                Je && h && (Je = !1, $())
            }, p)
        } else h = !1
    }

    function U(O) {
        return O >= 200 && O < 300 ? !1 : v.includes(O) ? !0 : !g.includes(O)
    }

    function F(O, Z, H) {
        var R = new XMLHttpRequest;
        Z ? (R.open("POST", O, !H), R.setRequestHeader("Content-Type", "application/json; charset=UTF-8")) : R.open("GET", O, !H), R.withCredentials = d, r && R.setRequestHeader("SP-Anonymous", "*");
        for (var G in a) Object.prototype.hasOwnProperty.call(a, G) && R.setRequestHeader(G, a[G]);
        return R
    }

    function q(O) {
        return JSON.stringify({
            schema: lf,
            data: O
        })
    }

    function J(O) {
        for (var Z = new Date().getTime().toString(), H = 0; H < O.length; H++) O[H].stm = Z;
        return O
    }

    function re(O) {
        return u ? y + O.replace("?", "?stm=" + new Date().getTime() + "&") : y + O
    }
    return {
        enqueueRequest: C,
        executeQueue: function() {
            h || $()
        },
        setUseLocalStorage: function(O) {
            t = O
        },
        setAnonymousTracking: function(O) {
            r = O
        },
        setCollectorUrl: function(O) {
            y = O + L
        },
        setBufferSize: function(O) {
            s = O
        }
    };

    function _e(O) {
        return Z(13, O) || H(10, 15, O) && R(O);

        function Z(Q, ge) {
            var oe = ge.match("(iP.+; CPU .*OS (d+)[_d]*.*) AppleWebKit/");
            return oe && oe.length ? parseInt(oe[0]) <= Q : !1
        }

        function H(Q, ge, oe) {
            var xe = oe.match("(Macintosh;.*Mac OS X (d+)_(d+)[_d]*.*) AppleWebKit/");
            return xe && xe.length ? parseInt(xe[0]) <= Q || parseInt(xe[0]) === Q && parseInt(xe[1]) <= ge : !1
        }

        function R(Q) {
            return Q.match("Version/.* Safari/") && !G(Q)
        }

        function G(Q) {
            return Q.match("Chrom(e|ium)")
        }
    }
}

function uf(e, n) {
    var t = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)"),
        o = t.exec(e);
    return o && (o == null ? void 0 : o.length) > 1 ? pn(n, o[1]) : null
}

function Si(e, n, t) {
    var o;
    return e === "translate.googleusercontent.com" ? (t === "" && (t = n), n = (o = uf(n, "u")) !== null && o !== void 0 ? o : "", e = no(n)) : (e === "cc.bingj.com" || e === "webcache.googleusercontent.com") && (n = document.links[0].href, e = no(n)), [e, n, t]
}
var Hs = 0,
    bt = 1,
    ff = 2,
    gn = 3,
    go = 4,
    Fs = 5,
    st = 6,
    jt = 7,
    wt = 8,
    At = 9,
    Fe = 10;

function df() {
    var e = ["1", "", 0, 0, 0, void 0, "", "", "", void 0, 0];
    return e
}

function pf(e, n, t, o) {
    var i = new Date,
        s = Math.round(i.getTime() / 1e3),
        l;
    e ? (l = e.split("."), l.unshift("0")) : l = ["1", n, s, o, s, "", t], (!l[st] || l[st] === "undefined") && (l[st] = nt.v4()), (!l[jt] || l[jt] === "undefined") && (l[jt] = ""), (!l[wt] || l[wt] === "undefined") && (l[wt] = ""), (!l[At] || l[At] === "undefined") && (l[At] = ""), (!l[Fe] || l[Fe] === "undefined") && (l[Fe] = 0);
    var c = function(p, r) {
            var a = parseInt(p);
            return isNaN(a) ? r : a
        },
        u = function(p) {
            return p ? c(p, void 0) : void 0
        },
        f = [l[Hs], l[bt], c(l[ff], s), c(l[gn], o), c(l[go], s), u(l[Fs]), l[st], l[jt], l[wt], u(l[At]), c(l[Fe], 0)];
    return f
}

function gf(e, n) {
    var t;
    return e[bt] ? t = e[bt] : n ? (t = "", e[bt] = t) : (t = nt.v4(), e[bt] = t), t
}

function en(e, n) {
    n === void 0 && (n = {
        memorizedVisitCount: 1
    });
    var t = n.memorizedVisitCount;
    ro(e) ? (e[jt] = e[st], e[Fs] = e[go], e[gn]++) : e[gn] = t;
    var o = nt.v4();
    return e[st] = o, e[Fe] = 0, e[wt] = "", e[At] = void 0, o
}

function Cr(e) {
    e[go] = Math.round(new Date().getTime() / 1e3)
}

function vf(e, n) {
    if (e[Fe] === 0) {
        var t = n.build();
        e[wt] = t.eid;
        var o = t.dtm || t.ttm;
        e[At] = o ? parseInt(o) : void 0
    }
}

function hf(e) {
    e[Fe] += 1
}

function mf(e) {
    return e.shift(), e.join(".")
}

function Ti(e, n, t) {
    var o = e[At],
        i = {
            userId: t ? "00000000-0000-0000-0000-000000000000" : e[bt],
            sessionId: e[st],
            eventIndex: e[Fe],
            sessionIndex: e[gn],
            previousSessionId: t ? null : e[jt] || null,
            storageMechanism: n == "localStorage" ? "LOCAL_STORAGE" : "COOKIE_1",
            firstEventId: e[wt] || null,
            firstEventTimestamp: o ? new Date(o).toISOString() : null
        };
    return i
}

function Mr(e) {
    return e[st]
}

function _f(e) {
    return e[bt]
}

function Br(e) {
    return e[gn]
}

function ro(e) {
    return e[Hs] === "0"
}

function yf(e) {
    return e[Fe]
}
var vn = "x";

function jr() {
    return {
        viewport: Lr(bf()),
        documentSize: Lr(wf()),
        resolution: Lr(Af()),
        colorDepth: screen.colorDepth,
        devicePixelRatio: window.devicePixelRatio,
        cookiesEnabled: window.navigator.cookieEnabled,
        online: window.navigator.onLine,
        browserLanguage: navigator.language || navigator.userLanguage,
        documentLanguage: document.documentElement.lang,
        webdriver: window.navigator.webdriver,
        deviceMemory: window.navigator.deviceMemory,
        hardwareConcurrency: window.navigator.hardwareConcurrency
    }
}

function bf() {
    var e, n;
    if ("innerWidth" in window) e = window.innerWidth, n = window.innerHeight;
    else {
        var t = document.documentElement || document.body;
        e = t.clientWidth, n = t.clientHeight
    }
    return e >= 0 && n >= 0 ? e + vn + n : null
}

function wf() {
    var e = document.documentElement,
        n = document.body,
        t = n ? Math.max(n.offsetHeight, n.scrollHeight) : 0,
        o = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth),
        i = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, t);
    return isNaN(o) || isNaN(i) ? "" : o + vn + i
}

function Af() {
    return screen.width + vn + screen.height
}

function Lr(e) {
    return e && e.split(vn).map(function(n) {
        return Math.floor(Number(n))
    }).join(vn)
}

function xf(e, n, t, o, i, s) {
    s === void 0 && (s = {});
    var l = [],
        c = function(p, r, a, d, v, g) {
            var m, h, y, w, b, P, z, Y, j, B, V, L, K, de, M, I, k, x, A, C, $, U, F, q, J, re, _e, O;
            g.eventMethod = (m = g.eventMethod) !== null && m !== void 0 ? m : "post";
            var Z = function(_) {
                    var T;
                    return (T = _.stateStorageStrategy) !== null && T !== void 0 ? T : "cookieAndLocalStorage"
                },
                H = function(_) {
                    var T, E;
                    return typeof _.anonymousTracking == "boolean" ? !1 : (E = ((T = _.anonymousTracking) === null || T === void 0 ? void 0 : T.withSessionTracking) === !0) !== null && E !== void 0 ? E : !1
                },
                R = function(_) {
                    var T, E;
                    return typeof _.anonymousTracking == "boolean" ? !1 : (E = ((T = _.anonymousTracking) === null || T === void 0 ? void 0 : T.withServerAnonymisation) === !0) !== null && E !== void 0 ? E : !1
                },
                G = function(_) {
                    return !!_.anonymousTracking
                },
                Q = (y = (h = g == null ? void 0 : g.contexts) === null || h === void 0 ? void 0 : h.browser) !== null && y !== void 0 ? y : !1,
                ge = (b = (w = g == null ? void 0 : g.contexts) === null || w === void 0 ? void 0 : w.webPage) !== null && b !== void 0 ? b : !0;
            l.push(ka()), ge && l.push(Sa()), Q && l.push(Ta()), l.push.apply(l, (P = g.plugins) !== null && P !== void 0 ? P : []);
            var oe = Cu({
                    base64: g.encodeBase64,
                    corePlugins: l,
                    callback: wa
                }),
                xe = document.characterSet || document.charset,
                Ie = Si(window.location.hostname, window.location.href, Dr()),
                Qe = xi(Ie[0]),
                De = Ie[1],
                dt = Ie[2],
                Ke, Je = (z = g.platform) !== null && z !== void 0 ? z : "web",
                Se = Vo(d),
                Ne = (Y = g.postPath) !== null && Y !== void 0 ? Y : "/com.snowplowanalytics.snowplow/tp2",
                xn = (j = g.appId) !== null && j !== void 0 ? j : "",
                Sn, $t = document.title,
                Wt, pa = (B = g.resetActivityTrackingOnPageView) !== null && B !== void 0 ? B : !0,
                bo, wo, ga = (V = g.cookieName) !== null && V !== void 0 ? V : "_sp_",
                qt = (L = g.cookieDomain) !== null && L !== void 0 ? L : void 0,
                ur = "/",
                Tn = (K = g.cookieSameSite) !== null && K !== void 0 ? K : "None",
                kn = (de = g.cookieSecure) !== null && de !== void 0 ? de : !0,
                Ao = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack,
                xo = typeof g.respectDoNotTrack < "u" ? g.respectDoNotTrack && (Ao === "yes" || Ao === "1") : !1,
                fr, So = (M = g.cookieLifetime) !== null && M !== void 0 ? M : 63072e3,
                To = (I = g.sessionCookieTimeout) !== null && I !== void 0 ? I : 1800,
                It = H(g),
                dr = R(g),
                je = G(g),
                se = Z(g),
                $n, pr = new Date().getTime(),
                In, Pn, On, En, ko, Dn, Ce, Me = 1,
                pt, Xe = cf(p, v, se == "localStorage" || se == "cookieAndLocalStorage", g.eventMethod, Ne, (k = g.bufferSize) !== null && k !== void 0 ? k : 1, (x = g.maxPostBytes) !== null && x !== void 0 ? x : 4e4, (A = g.maxGetBytes) !== null && A !== void 0 ? A : 0, (C = g.useStm) !== null && C !== void 0 ? C : !0, ($ = g.maxLocalStorageQueueSize) !== null && $ !== void 0 ? $ : 1e3, (U = g.connectionTimeout) !== null && U !== void 0 ? U : 5e3, dr, (F = g.customHeaders) !== null && F !== void 0 ? F : {}, (q = g.withCredentials) !== null && q !== void 0 ? q : !0, (J = g.retryStatusCodes) !== null && J !== void 0 ? J : [], ((re = g.dontRetryStatusCodes) !== null && re !== void 0 ? re : []).concat([400, 401, 403, 410, 422]), g.idService),
                $o = !1,
                Io = !1,
                be = {
                    enabled: !1,
                    installed: !1,
                    configurations: {}
                },
                va = (O = (_e = g.contexts) === null || _e === void 0 ? void 0 : _e.session) !== null && O !== void 0 ? O : !1,
                Cn, Mn = g.onSessionUpdateCallback,
                gr = !1;
            g.hasOwnProperty("discoverRootDomain") && g.discoverRootDomain && (qt = ef(Tn, kn));
            var Bn = jr(),
                ha = Bn.browserLanguage,
                ma = Bn.resolution,
                _a = Bn.colorDepth,
                ya = Bn.cookiesEnabled;
            oe.setTrackerVersion(a), oe.setTrackerNamespace(r), oe.setAppId(xn), oe.setPlatform(Je), oe.addPayloadPair("cookie", ya ? "1" : "0"), oe.addPayloadPair("cs", xe), oe.addPayloadPair("lang", ha), oe.addPayloadPair("res", ma), oe.addPayloadPair("cd", _a), Do(), Ro(), g.crossDomainLinker && Oo(g.crossDomainLinker);

            function gt() {
                Ie = Si(window.location.hostname, window.location.href, Dr()), Ie[1] !== De && (dt = Dr(De)), Qe = xi(Ie[0]), De = Ie[1]
            }

            function Po(_) {
                var T = new Date().getTime(),
                    E = _.currentTarget;
                E != null && E.href && (E.href = Xu(E.href, "_sp", Dn + "." + T))
            }

            function Oo(_) {
                for (var T = 0; T < document.links.length; T++) {
                    var E = document.links[T];
                    !E.spDecorationEnabled && _(E) && (rt(E, "click", Po, !0), rt(E, "mousedown", Po, !0), E.spDecorationEnabled = !0)
                }
            }

            function vt(_) {
                var T;
                return bo && (T = new RegExp("#.*"), _ = _.replace(T, "")), wo && (T = new RegExp("[{}]", "g"), _ = _.replace(T, "")), _
            }

            function Eo(_) {
                var T = new RegExp("^([a-z]+):"),
                    E = T.exec(_);
                return E ? E[1] : null
            }

            function ba(_, T) {
                var E = Eo(T),
                    ve;
                return E ? T : T.slice(0, 1) === "/" ? Eo(_) + "://" + no(_) + T : (_ = vt(_), (ve = _.indexOf("?")) >= 0 && (_ = _.slice(0, ve)), (ve = _.lastIndexOf("/")) !== _.length - 1 && (_ = _.slice(0, ve + 1)), _ + T)
            }

            function wa(_) {
                xo || Cn || Xe.enqueueRequest(_.build(), Se)
            }

            function Pt(_) {
                return ga + _ + "." + ko
            }

            function vr(_) {
                var T = Pt(_);
                if (se == "localStorage") return Ku(T);
                if (se == "cookie" || se == "cookieAndLocalStorage") return yt(T)
            }

            function Do() {
                gt(), ko = Nu((qt || Qe) + (ur || "/")).slice(0, 4)
            }

            function Qt() {
                var _ = new Date;
                $n = _.getTime()
            }

            function Aa() {
                xa(), Qt()
            }

            function Co() {
                var _ = document.documentElement;
                return _ ? [_.scrollLeft || window.pageXOffset, _.scrollTop || window.pageYOffset] : [0, 0]
            }

            function Mo() {
                var _ = Co(),
                    T = _[0];
                In = T, Pn = T;
                var E = _[1];
                On = E, En = E
            }

            function xa() {
                var _ = Co(),
                    T = _[0];
                T < In ? In = T : T > Pn && (Pn = T);
                var E = _[1];
                E < On ? On = E : E > En && (En = E)
            }

            function jn(_) {
                return Math.round(_)
            }

            function hr() {
                var _ = Pt("ses"),
                    T = "*";
                return Bo(_, T, To)
            }

            function mr(_) {
                var T = Pt("id"),
                    E = mf(_);
                return Bo(T, E, So)
            }

            function Bo(_, T, E) {
                return je && !It ? !1 : se == "localStorage" ? Qn(_, T, E) : se == "cookie" || se == "cookieAndLocalStorage" ? (yt(_, T, E, ur, qt, Tn, kn), document.cookie.indexOf("".concat(_, "=")) !== -1) : !1
            }

            function jo(_) {
                var T = Pt("id"),
                    E = Pt("ses");
                yi(T), yi(E), ir(T, qt, Tn, kn), ir(E, qt, Tn, kn), _ != null && _.preserveSession || (Ce = nt.v4(), Me = 1), _ != null && _.preserveUser || (Dn = je ? "" : nt.v4(), pt = null)
            }

            function Lo(_) {
                _ && _.stateStorageStrategy && (g.stateStorageStrategy = _.stateStorageStrategy, se = Z(g)), je = G(g), It = H(g), dr = R(g), Xe.setUseLocalStorage(se == "localStorage" || se == "cookieAndLocalStorage"), Xe.setAnonymousTracking(dr)
            }

            function Ro() {
                if (!(je && !It)) {
                    var _ = se != "none" && !!vr("ses"),
                        T = Kt();
                    Dn = gf(T, je), _ ? Ce = Mr(T) : Ce = en(T), Me = Br(T), se != "none" && (hr(), Cr(T), mr(T))
                }
            }

            function Kt() {
                if (se == "none") return df();
                var _ = vr("id") || void 0;
                return pf(_, Dn, Ce, Me)
            }

            function Vo(_) {
                return _.indexOf("http") === 0 ? _ : (document.location.protocol === "https:" ? "https" : "http") + "://" + _
            }

            function No() {
                (!$o || v.pageViewId == null) && (v.pageViewId = nt.v4())
            }

            function _r() {
                return v.pageViewId == null && (v.pageViewId = nt.v4()), v.pageViewId
            }

            function zo() {
                if (se === "none" || je || !ge) return null;
                var _ = "_sp_tab_id",
                    T = bi(_);
                return T || (Ju(_, nt.v4()), T = bi(_)), T || null
            }

            function Sa() {
                return {
                    contexts: function() {
                        return [{
                            schema: of,
                            data: {
                                id: _r()
                            }
                        }]
                    }
                }
            }

            function Ta() {
                return {
                    contexts: function() {
                        return [{
                            schema: sf,
                            data: Oe(Oe({}, jr()), {
                                tabId: zo()
                            })
                        }]
                    }
                }
            }

            function ka() {
                var _ = function(E) {
                        return je ? null : E
                    },
                    T = function(E) {
                        return It ? E : _(E)
                    };
                return {
                    beforeTrack: function(E) {
                        var ve = vr("ses"),
                            ue = Kt(),
                            et = yf(ue) === 0;
                        if (fr ? Cn = !!yt(fr) : Cn = !1, xo || Cn) {
                            jo();
                            return
                        }
                        ro(ue) ? (!ve && se != "none" ? Ce = en(ue) : Ce = Mr(ue), Me = Br(ue)) : new Date().getTime() - pr > To * 1e3 && (Me++, Ce = en(ue, {
                            memorizedVisitCount: Me
                        })), Cr(ue), vf(ue, E), hf(ue);
                        var Te = jr(),
                            Ot = Te.viewport,
                            Jt = Te.documentSize;
                        E.add("vp", Ot), E.add("ds", Jt), E.add("vid", T(Me)), E.add("sid", T(Ce)), E.add("duid", _(_f(ue))), E.add("uid", _(pt)), gt(), E.add("refr", vt(Ke || dt)), E.add("url", vt(Sn || De));
                        var Xt = Ti(ue, se, je);
                        if (va && (!je || It) && $a(E, Xt), se != "none") {
                            mr(ue);
                            var br = hr();
                            (!ve || et) && br && Mn && !gr && (Mn(Xt), gr = !1)
                        }
                        pr = new Date().getTime()
                    }
                }
            }

            function $a(_, T) {
                var E = {
                    schema: af,
                    data: T
                };
                _.addContextEntity(E)
            }

            function Ia() {
                var _ = Kt();
                if (ro(_) ? (se != "none" ? Ce = en(_) : Ce = Mr(_), Me = Br(_)) : (Me++, Ce = en(_, {
                        memorizedVisitCount: Me
                    })), Cr(_), se != "none") {
                    var T = Ti(_, se, je);
                    mr(_);
                    var E = hr();
                    E && Mn && (gr = !0, Mn(T))
                }
                pr = new Date().getTime()
            }

            function yr(_, T) {
                return (_ || []).concat(T ? T() : [])
            }

            function Pa(_) {
                var T = _.title,
                    E = _.context,
                    ve = _.timestamp,
                    ue = _.contextCallback;
                gt(), Io && No(), Io = !0, $t = document.title, Wt = T;
                var et = Ai(Wt || $t);
                oe.track(Bu({
                    pageUrl: vt(Sn || De),
                    pageTitle: et,
                    referrer: vt(Ke || dt)
                }), yr(E, ue), ve);
                var Te = new Date,
                    Ot = !1;
                if (be.enabled && !be.installed) {
                    be.installed = !0, Ot = !0;
                    var Jt = {
                        update: function() {
                            if (typeof window < "u" && typeof window.addEventListener == "function") {
                                var Et = !1,
                                    Ln = Object.defineProperty({}, "passive", {
                                        get: function() {
                                            Et = !0
                                        },
                                        set: function() {}
                                    }),
                                    Go = function() {};
                                window.addEventListener("testPassiveEventSupport", Go, Ln), window.removeEventListener("testPassiveEventSupport", Go, Ln), Jt.hasSupport = Et
                            }
                        }
                    };
                    Jt.update();
                    var Xt = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
                    Object.prototype.hasOwnProperty.call(Jt, "hasSupport") ? rt(document, Xt, Qt, {
                        passive: !0
                    }) : rt(document, Xt, Qt), Mo();
                    var br = ["click", "mouseup", "mousedown", "mousemove", "keypress", "keydown", "keyup", "touchend", "touchstart"],
                        Ca = ["resize", "focus", "blur"],
                        wr = function(Ma, Et) {
                            return Et === void 0 && (Et = Qt),
                                function(Ln) {
                                    return rt(document, Ln, Et)
                                }
                        };
                    br.forEach(wr(document)), Ca.forEach(wr(window)), wr(window, Aa)("scroll")
                }
                if (be.enabled && (pa || Ot)) {
                    $n = Te.getTime();
                    var Fo = void 0;
                    for (Fo in be.configurations) {
                        var Ar = be.configurations[Fo];
                        Ar && (window.clearInterval(Ar.activityInterval), Oa(Ar, E, ue))
                    }
                }
            }

            function Oa(_, T, E) {
                var ve = function(Te, Ot) {
                        gt(), Te({
                            context: Ot,
                            pageViewId: _r(),
                            minXOffset: In,
                            minYOffset: On,
                            maxXOffset: Pn,
                            maxYOffset: En
                        }), Mo()
                    },
                    ue = function() {
                        var Te = new Date;
                        $n + _.configMinimumVisitLength > Te.getTime() && ve(_.callback, yr(T, E)), _.activityInterval = window.setInterval(et, _.configHeartBeatTimer)
                    },
                    et = function() {
                        var Te = new Date;
                        $n + _.configHeartBeatTimer > Te.getTime() && ve(_.callback, yr(T, E))
                    };
                _.configMinimumVisitLength === 0 ? _.activityInterval = window.setInterval(et, _.configHeartBeatTimer) : _.activityInterval = window.setTimeout(ue, _.configMinimumVisitLength)
            }

            function Uo(_) {
                var T = _.minimumVisitLength,
                    E = _.heartbeatDelay,
                    ve = _.callback;
                if (wi(T) && wi(E)) return {
                    configMinimumVisitLength: T * 1e3,
                    configHeartBeatTimer: E * 1e3,
                    callback: ve
                };
                Re.error("Activity tracking minimumVisitLength & heartbeatDelay must be integers")
            }

            function Ea(_) {
                var T = _.context,
                    E = _.minXOffset,
                    ve = _.minYOffset,
                    ue = _.maxXOffset,
                    et = _.maxYOffset,
                    Te = document.title;
                Te !== $t && ($t = Te, Wt = void 0), oe.track(ju({
                    pageUrl: vt(Sn || De),
                    pageTitle: Ai(Wt || $t),
                    referrer: vt(Ke || dt),
                    minXOffset: jn(E),
                    maxXOffset: jn(ue),
                    minYOffset: jn(ve),
                    maxYOffset: jn(et)
                }), T)
            }

            function Ho(_) {
                var T = be.configurations[_];
                (T == null ? void 0 : T.configMinimumVisitLength) === 0 ? window.clearTimeout(T == null ? void 0 : T.activityInterval) : window.clearInterval(T == null ? void 0 : T.activityInterval), be.configurations[_] = void 0
            }
            var Da = {
                getDomainSessionIndex: function() {
                    return Me
                },
                getPageViewId: _r,
                getTabId: zo,
                newSession: Ia,
                getCookieName: function(_) {
                    return Pt(_)
                },
                getUserId: function() {
                    return pt
                },
                getDomainUserId: function() {
                    return Kt()[1]
                },
                getDomainUserInfo: function() {
                    return Kt()
                },
                setReferrerUrl: function(_) {
                    Ke = _
                },
                setCustomUrl: function(_) {
                    gt(), Sn = ba(De, _)
                },
                setDocumentTitle: function(_) {
                    $t = document.title, Wt = _
                },
                discardHashTag: function(_) {
                    bo = _
                },
                discardBrace: function(_) {
                    wo = _
                },
                setCookiePath: function(_) {
                    ur = _, Do()
                },
                setVisitorCookieTimeout: function(_) {
                    So = _
                },
                crossDomainLinker: function(_) {
                    Oo(_)
                },
                enableActivityTracking: function(_) {
                    be.configurations.pagePing || (be.enabled = !0, be.configurations.pagePing = Uo(Oe(Oe({}, _), {
                        callback: Ea
                    })))
                },
                enableActivityTrackingCallback: function(_) {
                    be.configurations.callback || (be.enabled = !0, be.configurations.callback = Uo(_))
                },
                disableActivityTracking: function() {
                    Ho("pagePing")
                },
                disableActivityTrackingCallback: function() {
                    Ho("callback")
                },
                updatePageActivity: function() {
                    Qt()
                },
                setOptOutCookie: function(_) {
                    fr = _
                },
                setUserId: function(_) {
                    pt = _
                },
                setUserIdFromLocation: function(_) {
                    gt(), pt = pn(_, De)
                },
                setUserIdFromReferrer: function(_) {
                    gt(), pt = pn(_, dt)
                },
                setUserIdFromCookie: function(_) {
                    pt = yt(_)
                },
                setCollectorUrl: function(_) {
                    Se = Vo(_), Xe.setCollectorUrl(Se)
                },
                setBufferSize: function(_) {
                    Xe.setBufferSize(_)
                },
                flushBuffer: function(_) {
                    _ === void 0 && (_ = {}), Xe.executeQueue(), _.newBufferSize && Xe.setBufferSize(_.newBufferSize)
                },
                trackPageView: function(_) {
                    _ === void 0 && (_ = {}), Pa(_)
                },
                preservePageViewId: function() {
                    $o = !0
                },
                disableAnonymousTracking: function(_) {
                    g.anonymousTracking = !1, Lo(_), Ro(), Xe.executeQueue()
                },
                enableAnonymousTracking: function(_) {
                    var T;
                    g.anonymousTracking = (T = _ && (_ == null ? void 0 : _.options)) !== null && T !== void 0 ? T : !0, Lo(_), It || No()
                },
                clearUserData: jo
            };
            return Oe(Oe({}, Da), {
                id: p,
                namespace: r,
                core: oe,
                sharedState: v
            })
        },
        u = c(e, n, t, o, i, s),
        f = Oe(Oe({}, u), {
            addPlugin: function(p) {
                var r, a;
                f.core.addPlugin(p), (a = (r = p.plugin).activateBrowserPlugin) === null || a === void 0 || a.call(r, f)
            }
        });
    return l.forEach(function(p) {
        var r;
        (r = p.activateBrowserPlugin) === null || r === void 0 || r.call(p, f)
    }), f
}
var sn = {};

function vo(e, n) {
    try {
        Tf(e != null ? e : kf()).forEach(n)
    } catch (t) {
        Re.error("Function failed", t)
    }
}

function Sf(e, n, t, o, i, s) {
    return sn.hasOwnProperty(e) ? null : (sn[e] = xf(e, n, t, o, i, s), sn[e])
}

function Tf(e) {
    return $f(e, sn)
}

function kf() {
    return Object.keys(sn)
}

function $f(e, n) {
    for (var t = [], o = 0, i = e; o < i.length; o++) {
        var s = i[o];
        n.hasOwnProperty(s) ? t.push(n[s]) : Re.warn(s + " not configured")
    }
    return t
}
var If = function() {
    function e() {
        this.outQueues = [], this.bufferFlushers = [], this.hasLoaded = !1, this.registeredOnLoadHandlers = []
    }
    return e
}();

function Pf() {
    var e = new If,
        n = document,
        t = window;

    function o() {
        n.visibilityState == "hidden" && e.bufferFlushers.forEach(function(c) {
            c(!1)
        })
    }

    function i() {
        e.bufferFlushers.forEach(function(c) {
            c(!1)
        })
    }

    function s() {
        var c;
        if (!e.hasLoaded)
            for (e.hasLoaded = !0, c = 0; c < e.registeredOnLoadHandlers.length; c++) e.registeredOnLoadHandlers[c]();
        return !0
    }

    function l() {
        n.addEventListener ? n.addEventListener("DOMContentLoaded", function c() {
            n.removeEventListener("DOMContentLoaded", c, !1), s()
        }) : n.attachEvent && n.attachEvent("onreadystatechange", function c() {
            n.readyState === "complete" && (n.detachEvent("onreadystatechange", c), s())
        }), rt(t, "load", s, !1)
    }
    return n.visibilityState && rt(n, "visibilitychange", o, !1), rt(t, "beforeunload", i, !1), document.readyState === "loading" ? l() : s(), e
}
/*!
 * Browser tracker for Snowplow v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function Of(e, n) {
    vo(n, function(t) {
        t.enableActivityTracking(e)
    })
}

function Ef(e, n) {
    vo(n, function(t) {
        t.trackPageView(e)
    })
}

function Df(e, n) {
    vo(n, function(t) {
        t.core.track(Mu({
            event: e.event
        }), e.context, e.timestamp)
    })
}
var ki = typeof window < "u" ? Pf() : void 0;

function Cf(e, n, t) {
    if (t === void 0 && (t = {}), ki) return Sf(e, e, "js-".concat(Lu), n, ki, t)
}
const Mf = "brawlstars-cctv-prod",
    Bf = "https://collector.snowplow.supercell.com",
    jf = () => {
        Cf("sp1", Bf, {
            appId: Mf,
            plugins: []
        })
    },
    Lf = () => Of({
        minimumVisitLength: 5,
        heartbeatDelay: 20
    }),
    Rf = (e, n, t, o = {}) => {
        Df({
            event: {
                schema: "iglu:com.supercell/button_click/jsonschema/1-0-0",
                data: {
                    button_id: e,
                    button_name: n
                }
            },
            context: [{
                schema: "iglu:com.snowplowanalytics.snowplow/additional_information/jsonschema/1-0-0",
                data: ye({
                    page: t
                }, o)
            }]
        })
    },
    ne = {
        init: jf,
        setupActivityTracking: Lf,
        trackPageView: Ef,
        trackClickEvent: Rf
    },
    Vf = [{
        postDate: "2023-12-02",
        bgSrc: {
            png: "scenes/scene/bg.png"
        },
        transitionVideoSrc: {
            mp4: "scenes/scene/transition-video.mp4"
        }
    }],
    Nf = Vf,
    zf = Zt(Nf),
    ho = () => {
        const e = zf()[0];
        return ht(ye({}, e), {
            bgSrc: ct(e.bgSrc.png),
            transitionVideoSrc: ct(e.transitionVideoSrc.mp4)
        })
    },
    Uf = [{
        src: {
            jpg: "logs/log/logbook-31.jpg"
        },
        postDate: "2023-12-02"
    }, {
        src: {
            jpg: "logs/log/logbook-30.jpg"
        },
        postDate: "2023-12-01"
    }, {
        src: {
            jpg: "logs/log/logbook-29.jpg"
        },
        postDate: "2023-11-30"
    }, {
        src: {
            jpg: "logs/log/logbook-28.jpg"
        },
        postDate: "2023-11-29"
    }, {
        src: {
            jpg: "logs/log/logbook-27.jpg"
        },
        postDate: "2023-11-28"
    }, {
        src: {
            jpg: "logs/log/logbook-26.jpg"
        },
        postDate: "2023-11-27"
    }, {
        src: {
            png: "logs/log/logbook-25.png"
        },
        postDate: "2023-11-26"
    }, {
        src: {
            png: "logs/log/logbook-24.png"
        },
        postDate: "2023-11-25"
    }, {
        src: {
            png: "logs/log/logbook-23.png"
        },
        postDate: "2023-11-24"
    }, {
        src: {
            jpg: "logs/log/logbook-22.jpg"
        },
        postDate: "2023-11-23"
    }, {
        src: {
            jpg: "logs/log/logbook-21.jpg"
        },
        postDate: "2023-11-22"
    }, {
        src: {
            jpg: "logs/log/logbook-20.jpg"
        },
        postDate: "2023-11-21"
    }, {
        src: {
            jpg: "logs/log/logbook-19.jpg"
        },
        postDate: "2023-11-20"
    }, {
        src: {
            jpg: "logs/log/logbook-18.jpg"
        },
        postDate: "2023-11-19"
    }, {
        src: {
            jpg: "logs/log/logbook-17.jpg"
        },
        postDate: "2023-11-18"
    }, {
        src: {
            jpg: "logs/log/logbook-16.jpg"
        },
        postDate: "2023-11-17"
    }, {
        src: {
            jpg: "logs/log/logbook-15.jpg"
        },
        postDate: "2023-11-16"
    }, {
        src: {
            jpg: "logs/log/logbook-14.jpg"
        },
        postDate: "2023-11-15"
    }, {
        src: {
            jpg: "logs/log/logbook-13.jpg"
        },
        postDate: "2023-11-14"
    }, {
        src: {
            jpg: "logs/log/logbook-12.jpg"
        },
        postDate: "2023-11-13"
    }, {
        src: {
            jpg: "logs/log/logbook-11.jpg"
        },
        postDate: "2023-11-12"
    }, {
        src: {
            jpg: "logs/log/logbook-10.jpg"
        },
        postDate: "2023-11-11"
    }, {
        src: {
            jpg: "logs/log/logbook-9.jpg"
        },
        postDate: "2023-11-10"
    }, {
        src: {
            jpg: "logs/log/logbook-8.jpg"
        },
        postDate: "2023-11-09"
    }, {
        src: {
            jpg: "logs/log/logbook-7.jpg"
        },
        postDate: "2023-11-08"
    }, {
        src: {
            jpg: "logs/log/logbook-6.jpg"
        },
        postDate: "2023-11-07"
    }, {
        src: {
            jpg: "logs/log/logbook-5.jpg"
        },
        postDate: "2023-11-06"
    }, {
        src: {
            jpg: "logs/log/logbook-4.jpg"
        },
        postDate: "2023-11-05"
    }, {
        src: {
            jpg: "logs/log/logbook-3.jpg"
        },
        postDate: "2023-11-04"
    }, {
        src: {
            jpg: "logs/log/logbook-2.jpg"
        },
        postDate: "2023-11-03"
    }, {
        src: {
            jpg: "logs/log/logbook-1.jpg"
        },
        postDate: "2023-11-02"
    }],
    Hf = Uf,
    Ff = Zt(Hf),
    Gs = () => Ff().map(n => ht(ye({}, n), {
        srcJpg: n.src.jpg ? ct(n.src.jpg) : void 0,
        srcPng: n.src.png ? ct(n.src.png) : void 0
    })),
    Gf = "/assets/instructions-modal-overlay-b0399863.png",
    mo = "/assets/terminal-logo-7a935f92.png",
    Zs = "/assets/logbook-page-bg-left-d97e3458.jpg",
    Ys = "/assets/logbook-page-bg-right-98ad4729.jpg",
    Ws = "/assets/logbook-first-page-4594a73f.jpg",
    oo = "/assets/player-controls-bg-272e65c2.jpg",
    qs = e => e.reduce((n, t, o, i) => (o % 2 === 0 && n.push(e.slice(o, o + 2)), n), []),
    Qs = async e => new Promise(n => {
        const t = new Image;
        t.onload = () => n(t), t.src = e
    });
var Ut = (e => (e[e.initializing = 0] = "initializing", e[e["loading-assets"] = 1] = "loading-assets", e[e["video-transition"] = 2] = "video-transition", e[e.done = 3] = "done", e))(Ut || {});
const Zf = ho(),
    Yf = Gs(),
    Wf = () => {
        const e = [Zs, Ys],
            n = [...Yf.map(i => i.srcPng || i.srcJpg), null].reverse();
        n.length === 1 && e.push(Ws);
        const t = qs(n),
            o = t[t.length - 1];
        return o && e.push(...o.filter(i => !!i)), e
    },
    qf = [Zf.bgSrc, Gf, mo, oo, ...Wf()],
    [Ks, _o] = W(0),
    [Qf, Kf] = W(!1),
    [Jf, Xf] = W(!1),
    ed = async () => {
        _o(1);
        const e = qf.map(n => Qs(n));
        await Promise.allSettled(e), Kf(!0)
    }, Js = () => {
        window.location.href = "brawlstars-inbox://cctvloaded"
    };
pe(() => {
    Qf() && Jf() && (Js(), _o(2))
});
pe(() => {
    Ks() === 3 && Js()
});
const td = () => {
        Xf(!0)
    },
    nd = () => {
        _o(3)
    },
    ot = {
        init: ed,
        currentStatus: Ks,
        onVideoTransitionLoaded: td,
        onVideoTransitionEnd: nd
    },
    Xs = e => e[Math.floor(Math.random() * e.length)];

function ea(e) {
    var n, t, o = "";
    if (typeof e == "string" || typeof e == "number") o += e;
    else if (typeof e == "object")
        if (Array.isArray(e))
            for (n = 0; n < e.length; n++) e[n] && (t = ea(e[n])) && (o && (o += " "), o += t);
        else
            for (n in e) e[n] && (o && (o += " "), o += n);
    return o
}

function rd() {
    for (var e, n, t = 0, o = ""; t < arguments.length;)(e = arguments[t++]) && (n = ea(e)) && (o && (o += " "), o += n);
    return o
}
const $i = e => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e,
    le = rd,
    wn = (e, n) => t => {
        var o;
        if ((n == null ? void 0 : n.variants) == null) return le(e, t == null ? void 0 : t.class, t == null ? void 0 : t.className);
        const {
            variants: i,
            defaultVariants: s
        } = n, l = Object.keys(i).map(f => {
            const p = t == null ? void 0 : t[f],
                r = s == null ? void 0 : s[f];
            if (p === null) return null;
            const a = $i(p) || $i(r);
            return i[f][a]
        }), c = t && Object.entries(t).reduce((f, p) => {
            let [r, a] = p;
            return a === void 0 || (f[r] = a), f
        }, {}), u = n == null || (o = n.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((f, p) => {
            let v = p,
                {
                    class: r,
                    className: a
                } = v,
                d = qo(v, ["class", "className"]);
            return Object.entries(d).every(g => {
                let [m, h] = g;
                return Array.isArray(h) ? h.includes(ye(ye({}, s), c)[m]) : ye(ye({}, s), c)[m] === h
            }) ? [...f, r, a] : f
        }, []);
        return le(e, l, u, t == null ? void 0 : t.class, t == null ? void 0 : t.className)
    },
    od = "/assets/player-8b9a1305.mp3",
    id = "/assets/player-4aabf494.ogg",
    sd = N('<svg viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="path-1" d="M8 36L25 24L8 12V36Z" fill="currentColor"></path><path id="path-2" d="M25 36L42 24L25 12V36Z" fill="currentColor"></path><path id="path-3" d="M42 36L59 24L42 12V36Z" fill="currentColor">'),
    ad = (e = {}) => (() => {
        const n = sd();
        return We(n, e, !0, !0), n
    })(),
    ld = N('<svg viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="path-1" d="M26 36L9 24L26 12V36Z" fill="currentColor"></path><path id="path-2" d="M43 36L26 24L43 12V36Z" fill="currentColor"></path><path id="path-3" d="M60 36L43 24L60 12V36Z" fill="currentColor">'),
    cd = (e = {}) => (() => {
        const n = ld();
        return We(n, e, !0, !0), n
    })(),
    ud = N('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 68"><path d="M60.66 16.06c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4Zm9.54-26.81c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36-4.06-.01-6.57-.12-7.52-.36Zm0 17.9c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36s-6.57-.12-7.52-.36Zm3.89-8.99c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .95-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.14-3.63-.4Zm13.43-17.91c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4ZM19.57 17.17c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM27.24 9.83c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.61c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33ZM26.11 50.21c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.22 3.22-.33 7.01-.33ZM33.78 57.55c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.21 3.22-.33 7.01-.33ZM1.43 31.5c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.43-.14-4.07-.45ZM.95 39.78c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.07 0-3.43-.15-4.07-.45ZM38.54 17.82c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 25.3c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 32.79c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 40.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 47.75c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.44-.14-4.07-.45ZM8.47 23.97c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79.01-6.12-.1-7.01-.33ZM38.54 55.24c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Z" fill="currentColor">'),
    fd = (e = {}) => (() => {
        const n = ud();
        return We(n, e, !0, !0), n
    })(),
    dd = N('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M12 38h8V10h-8v28Zm16-28v28h8V10h-8Z" fill="currentColor">'),
    pd = (e = {}) => (() => {
        const n = dd();
        return We(n, e, !0, !0), n
    })(),
    gd = N('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M16 10v28l22-14-22-14Z" fill="currentColor">'),
    vd = (e = {}) => (() => {
        const n = gd();
        return We(n, e, !0, !0), n
    })(),
    hd = N('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M23.495 27.969c2.28 0 4.13-1.913 4.13-4.273 0-2.36-1.85-4.273-4.13-4.273-2.281 0-4.13 1.913-4.13 4.273 0 2.36 1.849 4.273 4.13 4.273Z" fill="currentColor"></path><path d="M31.073 15.863a2.047 2.047 0 0 0-.137-.13 11.945 11.945 0 0 0-.504-.476 1.942 1.942 0 0 0-2.8.233c-.71.863-.609 2.162.225 2.897a7.06 7.06 0 0 1 2.374 5.306c0 2.261-1.068 4.39-2.856 5.695-.013.009-.023.02-.037.03a1.412 1.412 0 0 0-.066.05c-.909.636-1.15 1.913-.535 2.853.384.59 1.01.904 1.648.904.381 0 .768-.115 1.11-.353 2.953-2.064 4.717-5.498 4.717-9.184-.003-2.952-1.118-5.734-3.139-7.825Z" fill="currentColor"></path><path d="M35.168 11.425a1.917 1.917 0 0 0-.156-.145 17.637 17.637 0 0 0-.829-.79 1.942 1.942 0 0 0-2.8.233c-.71.864-.61 2.163.225 2.897 2.805 2.47 4.413 6.069 4.413 9.873 0 4.199-1.981 8.154-5.297 10.585-.072.052-.143.11-.218.162-.908.636-1.147 1.913-.535 2.853.384.59 1.01.904 1.648.904.381 0 .768-.115 1.11-.353C37.282 34.462 40 29.169 40 23.49c0-4.555-1.717-8.842-4.832-12.065ZM19.733 29.47c-.024-.016-.045-.032-.066-.049-.013-.01-.024-.022-.037-.03-1.788-1.304-2.856-3.434-2.856-5.695 0-2.045.864-3.98 2.374-5.306a2.104 2.104 0 0 0 .225-2.898 1.94 1.94 0 0 0-2.8-.233 9.434 9.434 0 0 0-.503.477 2.158 2.158 0 0 0-.14.132c-2.024 2.086-3.14 4.868-3.14 7.828 0 3.686 1.765 7.118 4.718 9.184.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.905.617-.945.376-2.223-.533-2.858Z" fill="currentColor"></path><path d="M16.496 34.24c-.074-.053-.143-.11-.217-.162-3.316-2.429-5.298-6.383-5.298-10.585 0-3.804 1.608-7.403 4.413-9.872.837-.735.938-2.034.226-2.898a1.94 1.94 0 0 0-2.8-.232c-.29.252-.562.518-.83.789-.052.046-.105.093-.156.145C8.716 14.648 7 18.935 7 23.493c0 5.679 2.718 10.969 7.271 14.153.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.904.614-.943.376-2.22-.533-2.856Z" fill="currentColor">'),
    md = (e = {}) => (() => {
        const n = hd();
        return We(n, e, !0, !0), n
    })(),
    _d = N('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.96 67.25"><path d="M86.24 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.65-7.86c-.42-.23-.63-.84-.63-1.83s.21-1.6.63-1.83C83.01.12 84.11 0 85.9 0s2.89.12 3.31.35c.42.23.63.84.63 1.83s-.21 1.6-.63 1.83c-.42.23-1.52.35-3.31.35s-2.89-.12-3.31-.35Zm6.77 15.72c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.18 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.18 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.7 7.86c-.39-.23-.58-.84-.58-1.83s.19-1.6.58-1.83c.39-.23 1.4-.35 3.04-.35s2.65.12 3.04.35c.39.23.58.84.58 1.83s-.19 1.6-.58 1.83c-.39.23-1.4.35-3.04.35s-2.65-.12-3.04-.35ZM61.57 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm3.12 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.17 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.17 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-42-41.98c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm7.67-7.35c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.5c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm12.74 6.6c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm7.67 7.34c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33ZM1.43 31.39c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm-.48 8.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM38.54 17.7c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM8.47 23.86c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm30.07 31.26c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Z" fill="currentColor">'),
    yd = (e = {}) => (() => {
        const n = _d();
        return We(n, e, !0, !0), n
    })(),
    bd = {
        "fast-forward": ad,
        "fast-rewind": cd,
        mute: fd,
        pause: pd,
        play: vd,
        live: md,
        unmute: yd
    },
    wd = N("<span>"),
    _t = e => {
        const [n, t] = ao(e, ["name"]);
        return (() => {
            const o = wd();
            return We(o, t, !1, !0), D(o, S(as, {
                get component() {
                    return bd[n.name]
                }
            })), o
        })()
    },
    ta = {
        tl: "tl",
        bl: "bl",
        c: "c",
        tr: "tr",
        br: "br"
    },
    na = e => {
        var n;
        return (n = Object.values(ta)[e]) != null ? n : "c"
    },
    Ad = [{
        liveVideos: [{
            videoId: "6341919779112",
            adId: "live.i6atvHTPufS-u8OORhbUcpVBaNMbZwK0wSU-LTMN_eMqAX2F6Enp21rG7UTVmwhwd8ThY0A25RoENC-BhGcTLbo7xNjwgF4P-07qWFMkFw68n8K78w-RBdiIUaXjeSCjT0xJBIQ"
        }, {
            videoId: "6341920415112",
            adId: "live.Oi8S36b9QH7zaoF8Yp8x4sh8rSGTRu_a3vrho4cnroJRy4aU9rXfUDfCUAipYwhyjxvj80Ouu3VFAIFDvo-d9iVp27LwivP8srIEcQ3mdYmqri54niuWLQbgIHIAPwJTeB1nwZs"
        }, {
            videoId: "6341920897112",
            adId: "live.WkTMEZvrHn6PtOliN79tqm3A9RRwGBV8gitqn5m1vR1jlTL6Fb-IZmQYXUoge2E5Uo9G3VJzH39RM00cH0HWfOXINlEgN0yg-HXJcly1uqAXmVjMAcsDVJSx8hDNP5svLdIkDnw"
        }, {
            videoId: "6341918558112",
            adId: "live.ZTtAaCNd3IEakDW9tJ1F3twTGzkUWfPxLaKMc229Nl6dOXTJbWxPd2_OkGUMsGcjKwpXQ4RjhobUZPlAELr_SY1AVKL5DfqzAuiKFO30vVTSVhoFQjn3_WHpsnvX6Io6yWufDw8"
        }, {
            videoId: "6341920907112",
            adId: "live.c0GarKrSQkMGfPbM6ddAGAjIeShcfqID8m61_aiiQYQPcwsdVB-4bf9Dpd7DItAFYTeNuZV3bDPf1DuRXZoaUFCRP4gbmvoeI_5CCbXF6Gd-0r5M1M8MX2hMzjw1btgUY3TMfhY"
        }],
        postDate: "2023-11-02"
    }],
    xd = Ad,
    Sd = Zt(xd),
    Td = () => Sd()[0],
    kd = (e = !0) => {
        let n = ds;
        return {
            get abort() {
                return n
            },
            exec: t => (e && n(), Promise.race([new Promise((o, i) => n = () => i(new Error("aborted"))), new Promise(o => t(o))]))
        }
    },
    an = [4, 16, 32],
    Ii = Math.min(...an),
    Pi = Math.max(...an),
    $d = () => {
        const [e, n] = W(Ii);
        let t = ds,
            o;
        const u = {
            timer: o,
            onTick: f => (t = f, u),
            start: () => {
                let f = 0;
                return o = setInterval(() => {
                    const p = Pi / e();
                    f % p === 0 && t(), f++
                }, 1e3 / Pi), u
            },
            stop: () => (clearInterval(o), o = void 0, n(Ii), u),
            currentSpeed: e,
            increaseSpeed: () => n(f => {
                const p = an.indexOf(f);
                return an[(p + 1) % an.length]
            })
        };
        return u
    },
    Id = e => {
        const n = os(),
            t = $d(),
            o = kd(),
            [i, s] = W(null),
            [l, c] = W(0),
            [u, f] = W(e.initialFeed),
            [p, r] = W(null),
            [a, d] = W("initializing"),
            [v, g] = W(e.initialPosition),
            m = () => !!p(),
            h = () => v() === "c",
            y = () => {
                var x;
                return !!((x = p()) != null && x.liveTracker.isLive())
            },
            w = () => a() !== "error" && a() !== "initializing",
            b = () => {
                var x;
                return y() && !!((x = p()) != null && x.liveTracker.atLiveEdge())
            },
            P = () => {
                var x, A, C, $;
                return ($ = (C = (x = p()) == null ? void 0 : x.liveTracker.liveCurrentTime()) != null ? C : (A = p()) == null ? void 0 : A.duration()) != null ? $ : 0
            },
            z = () => a() === "seeking-bwd" || a() === "seeking-fwd" ? t.currentSpeed() : void 0,
            Y = async x => {
                try {
                    const A = u(),
                        $ = await (await Ml(() => import("./player-0b3460d7.js"), [])).initPlayer({
                            refNode: x,
                            videoId: A.videoId,
                            adConfigId: A.videoId && A.adId,
                            playlistId: A.playlistId,
                            options: {
                                loop: !1
                            }
                        });
                    if (!$) throw new Error;
                    $.on("error", () => d("error")), $.on("timeupdate", () => c($.currentTime())), $.one("canplay", () => d("ready")), $.one("playing", () => d("playing")), $.on("ended", () => d("ended")), r($)
                } catch (A) {
                    console.error(A), d("error")
                }
            }, j = async x => {
                (x.videoId ? u().videoId === x.videoId : u().playlistId === x.playlistId) || (d("initializing"), s(null), f(x), await o.exec(A => {
                    var C, $, U;
                    (C = p()) == null || C.pause(), (U = ($ = p()) == null ? void 0 : $.catalog) == null || U.get({
                        id: x.videoId || x.playlistId,
                        adConfigId: x.adId,
                        type: x.videoId ? "video" : "playlist"
                    }, (F, q) => {
                        var J, re, _e;
                        if (F) d("error");
                        else {
                            const O = Array.isArray(q) ? q : [q];
                            if (!O.length) return A();
                            const Z = O.length > 1,
                                H = Object.values(ta).indexOf(v()),
                                R = Z ? O[H % O.length] : O[0];
                            (re = (J = p()) == null ? void 0 : J.catalog) == null || re.load(R), (_e = p()) == null || _e.one("canplay", () => {
                                var G;
                                (G = p()) == null || G.play(), d("playing"), A()
                            })
                        }
                    })
                }))
            }, B = async () => j(e.initialFeed), V = () => {
                var x;
                (x = p()) == null || x.dispose(), r(null)
            }, L = async () => {
                await o.exec(x => {
                    var A;
                    (A = p()) == null || A.play(), x()
                }), d("playing")
            }, K = async () => {
                await o.exec(x => {
                    var A;
                    (A = p()) == null || A.pause(), x()
                }), d("ready")
            }, de = async () => {
                !y() || b() || (d("syncing"), await o.exec(x => {
                    var A, C, $;
                    (A = p()) == null || A.liveTracker.seekToLiveEdge(), (C = p()) == null || C.play(), ($ = p()) == null || $.one("timeupdate", x)
                }), d("playing"))
            }, M = async x => {
                var A, C;
                d(x === 1 ? "seeking-fwd" : "seeking-bwd"), await o.exec($ => {
                    var U;
                    (U = p()) == null || U.pause(), t.start().onTick(() => {
                        const F = l() + 1 * x;
                        x === -1 && F <= 0 || x === 1 && F >= P() ? $() : c(F)
                    })
                }), t.stop(), x === 1 ? y() ? d("ready") : ((A = p()) == null || A.currentTime(0), d("ended")) : ((C = p()) == null || C.currentTime(0), d("ready"))
            }, I = async () => {
                var x, A;
                Math.abs(l() - ((A = (x = p()) == null ? void 0 : x.currentTime()) != null ? A : 0)) < 3 || (d("syncing"), await o.exec(C => {
                    var $, U, F;
                    ($ = p()) == null || $.pause(), (U = p()) == null || U.currentTime(l()), (F = p()) == null || F.trigger("timeupdate"), C()
                }), d("ready"))
            };
        return {
            uid: n,
            feed: u,
            isCenter: h,
            isEnabled: w,
            isLive: y,
            isAtEdge: b,
            position: v,
            setPosition: g,
            status: a,
            time: l,
            setTime: c,
            duration: P,
            seekerSpeed: z,
            switchFeed: j,
            resetFeed: B,
            Player: {
                mount: Y,
                unmount: V,
                isMounted: m,
                dispatch: async x => {
                    try {
                        const A = i() === x;
                        if (A && ["rev", "fwd"].includes(x)) {
                            t.increaseSpeed();
                            return
                        }
                        if (t.stop(), A) throw new Error("same as previous action");
                        switch (s(x), x) {
                            case "sync":
                                await I();
                                break;
                            case "play":
                                await L();
                                break;
                            case "pause":
                                await K();
                                break;
                            case "fwd":
                                await M(1), await de();
                                break;
                            case "rev":
                                await M(-1);
                                break;
                            case "go-live":
                                await B(), await de();
                                break
                        }
                    } catch (A) {
                        throw new Error('action "'.concat(x, '": ').concat(A.message))
                    }
                }
            }
        }
    },
    Ye = Td().liveVideos.map((e, n) => Id({
        initialFeed: e,
        initialPosition: na(n)
    })),
    [Pd, Od] = W(!1),
    [Ed, Dd] = W(null),
    Ht = () => Ye.filter(e => e.isEnabled()),
    Cd = () => Ht().find(e => e.isCenter()),
    Md = () => {
        const e = Ht().filter(n => n.isLive() && n.status() === "playing");
        return e.length > 0 ? e.every(n => n.isAtEdge()) : !1
    },
    Bd = ke(() => Ye.length > 0 && Ye.every(e => e.status() !== "initializing")),
    jd = ke(() => Ht().length > 0 && Ht().every(e => e.status() === "ended")),
    Ld = e => {
        const n = Ye.find(o => o.uid === e.uid),
            t = Ye.find(o => o.position() === "c");
        ar(() => {
            t.setPosition(n.position()), n.setPosition("c")
        })
    },
    Rd = () => {
        ar(() => {
            Ye.forEach((e, n) => e.setPosition(na(n)))
        })
    },
    Vd = async e => {
        var t;
        const n = (t = Cd()) == null ? void 0 : t.time();
        if (n) return e.setTime(n), e.Player.dispatch("sync")
    }, Nd = async e => {
        try {
            e === "play" && await Promise.all(Ht().map(Vd)), await Promise.all(Ht().map(n => n.Player.dispatch(e)))
        } catch (n) {
            console.warn(n)
        }
    }, zd = async e => {
        try {
            Dd(e), !!e.archivePlaylist ? await Promise.all(Ye.map(t => t.switchFeed(e.archivePlaylist))) : await Promise.all(Ye.map((t, o) => {
                const i = e.liveVideos[o % e.liveVideos.length];
                if (i) return t.switchFeed(i)
            }))
        } catch (n) {
            console.warn(n)
        }
    }, he = {
        screens: Ye,
        Supervisor: {
            dispatch: Nd,
            positionScreenAtCenter: Ld,
            resetScreensPosition: Rd,
            controlsVisible: Pd,
            setControlsVisible: Od,
            switchFeed: zd,
            allAtEdge: Md,
            allLoaded: Bd,
            allEnded: jd,
            currentFeed: Ed
        }
    }, Ud = N('<div role="button" class="absolute top-0 left-0 wh-full">'), Hd = N('<div class="absolute bottom-0 left-0 right-0 h-[228px] px-[158px] flex space-x-68 items-center"><button></button><button></button><button></button><button></button><button>'), tn = ["w-[330px] h-[100px] flex-center bg-player-control-btn text-green rounded-sm", "shadow-player-controls-btn active:shadow-player-controls-btn-pressed", "[&>span]:w-72 [&>span]:drop-shadow-terminal"], Fd = () => {
        const e = at([id, od], {
            sprite: {
                "forward-click": [0, 234.67120181405895],
                "forward-loop": [2e3, 1866.6666666666667],
                live: [5e3, 217.9591836734698],
                pause: [7e3, 650.0000000000003],
                play: [9e3, 500],
                "rewind-click": [11e3, 288.0045351473921],
                "rewind-loop": [13e3, 1300.0000000000007]
            }
        });
        return [(() => {
            const n = Ud();
            return n.$$click = () => he.Supervisor.setControlsVisible(!1), n
        })(), (() => {
            const n = Hd(),
                t = n.firstChild,
                o = t.nextSibling,
                i = o.nextSibling,
                s = i.nextSibling,
                l = s.nextSibling;
            return "url(".concat(oo, ")") != null ? n.style.setProperty("background-image", "url(".concat(oo, ")")) : n.style.removeProperty("background-image"), t.$$click = () => {
                ne.trackClickEvent("player-controls", "rewind", "cctv-room"), he.Supervisor.dispatch("rev"), e.play("rewind-click", {
                    interrupt: !0
                }), e.play("rewind-loop")
            }, D(t, S(_t, {
                name: "fast-rewind",
                class: "!w-112 ml-22 [&_#path-3]:hidden"
            })), o.$$click = () => {
                ne.trackClickEvent("player-controls", "play", "cctv-room"), he.Supervisor.dispatch("play"), e.play("play", {
                    interrupt: !0
                })
            }, D(o, S(_t, {
                name: "play"
            })), i.$$click = () => {
                ne.trackClickEvent("player-controls", "forward", "cctv-room"), he.Supervisor.dispatch("fwd"), e.play("forward-click", {
                    interrupt: !0
                }), e.play("forward-loop")
            }, D(i, S(_t, {
                name: "fast-forward",
                class: "!w-112 ml-22 [&_#path-3]:hidden"
            })), s.$$click = () => {
                ne.trackClickEvent("player-controls", "pause", "cctv-room"), he.Supervisor.dispatch("pause"), e.play("pause", {
                    interrupt: !0
                })
            }, D(s, S(_t, {
                name: "pause"
            })), l.$$click = () => {
                ne.trackClickEvent("player-controls", "live", "cctv-room"), he.Supervisor.dispatch("go-live"), e.play("live", {
                    interrupt: !0
                })
            }, D(l, S(_t, {
                name: "live"
            })), X(c => {
                const u = le(tn),
                    f = le(tn),
                    p = le(tn),
                    r = le(tn),
                    a = le(tn);
                return u !== c._v$ && te(t, c._v$ = u), f !== c._v$2 && te(o, c._v$2 = f), p !== c._v$3 && te(i, c._v$3 = p), r !== c._v$4 && te(s, c._v$4 = r), a !== c._v$5 && te(l, c._v$5 = a), c
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0,
                _v$5: void 0
            }), n
        })()]
    };
$e(["click"]);
const Gd = (e, n) => {
        const t = e * n / 100;
        return e - t
    },
    Oi = e => e.touches.length === 2,
    Ei = e => Math.hypot(e[0].pageX - e[1].pageX, e[0].pageY - e[1].pageY),
    Zd = e => {
        const [n, t] = Gt({
            isEnabled: !0,
            isZooming: !1,
            scale: 1,
            delta: {
                x: 0,
                y: 0
            },
            start: {
                x: 0,
                y: 0,
                distance: 0
            }
        }), o = () => {
            t("isEnabled", !0)
        }, i = () => {
            t("isEnabled", !1)
        }, s = () => {
            t({
                isZooming: !1,
                scale: 1,
                delta: {
                    x: 0,
                    y: 0
                },
                start: {
                    x: 0,
                    y: 0,
                    distance: 0
                }
            })
        }, l = f => {
            !Oi(f) || !n.isEnabled || (f.preventDefault(), t({
                isZooming: !0,
                start: {
                    distance: Ei(f.touches),
                    x: (f.touches[0].pageX + f.touches[1].pageX) / 2,
                    y: (f.touches[0].pageY + f.touches[1].pageY) / 2
                }
            }))
        }, c = f => {
            !Oi(f) || !n.isEnabled || (f.preventDefault(), t(p => {
                const r = "scale" in f ? f.scale : Ei(f.touches) / n.start.distance,
                    a = (f.touches[0].pageX + f.touches[1].pageX) / 2 - p.start.x,
                    d = (f.touches[0].pageY + f.touches[1].pageY) / 2 - p.start.y;
                return {
                    scale: Math.min(Math.max(1, Gd(r, 10)), 4),
                    delta: {
                        x: a,
                        y: d
                    }
                }
            }))
        }, u = () => {
            s()
        };
        return mn(() => {
            var f, p, r;
            (f = e.targetRef()) == null || f.addEventListener("touchstart", l), (p = e.targetRef()) == null || p.addEventListener("touchmove", c), (r = e.targetRef()) == null || r.addEventListener("touchend", u)
        }), Ae(() => {
            var f, p, r;
            (f = e.targetRef()) == null || f.removeEventListener("touchstart", l), (p = e.targetRef()) == null || p.removeEventListener("touchmove", c), (r = e.targetRef()) == null || r.removeEventListener("touchend", u)
        }), {
            data: n,
            controls: {
                enable: o,
                disable: i
            }
        }
    },
    An = wn("", {
        variants: {
            size: {
                sm: "text-sm font-vt-100 font-regular",
                md: "text-md font-vt-100 font-regular",
                "screen-overlay-sm": "text-screen-overlay-sm font-video font-bold",
                "screen-overlay-md": "text-screen-overlay-md font-video font-bold",
                "terminal-sm": "text-terminal-sm font-vt-220 font-medium",
                "terminal-md": "text-terminal-md font-vt-220 font-medium",
                "terminal-lg": "text-terminal-lg font-vt-220 font-medium",
                "terminal-xl": "text-terminal-xl font-vt-220 font-medium",
                "terminal-xxl": "text-terminal-xxl font-vt-100 font-regular"
            }
        },
        defaultVariants: {
            size: "terminal-md"
        }
    }),
    ie = e => {
        const [n, t] = ao(e, ["size", "as", "class", "children"]);
        return S(as, Ka({
            get component() {
                return n.as || "span"
            },
            get class() {
                return An({
                    size: n.size,
                    class: n.class
                })
            }
        }, t, {
            get children() {
                return n.children
            }
        }))
    },
    Yd = "/assets/seek-video-dab3075d.mp4",
    Wd = N('<video playsinline muted loop class="absolute top-0 left-0 wh-full object-cover">'),
    qd = N('<div class="absolute top-0 left-0 bg-black z-10 wh-full">'),
    Di = N("<span>"),
    Qd = N('<div class="absolute top-72 left-72 flex items-center space-x-8 text-white">'),
    Kd = {
        "seeking-fwd": "seeking-fwd",
        "seeking-bwd": "seeking-bwd",
        ready: "ready",
        playing: "playing",
        error: "error"
    },
    Jd = {
        "seeking-fwd": {
            text: "FFWD",
            icon: "fast-forward"
        },
        "seeking-bwd": {
            text: "REW",
            icon: "fast-rewind"
        },
        ready: {
            text: "PAUSE",
            icon: "pause"
        },
        playing: {
            text: "PLAY",
            icon: "play"
        },
        live: {
            text: "LIVE",
            icon: "live"
        }
    },
    Xd = e => {
        let n;
        const [t, o] = W(void 0);
        pe(() => {
            const u = e.screen.status();
            if (u === "syncing") return;
            const p = e.screen.isAtEdge() && u === "playing" ? "live" : Kd[u];
            o(p);
            let r;
            (p === "playing" || p === "live") && (r = setTimeout(() => o(void 0), 1500)), Ae(() => clearTimeout(r))
        });
        const [i, s] = W();
        pe(() => {
            var d;
            if (!e.screen.isEnabled()) return;
            const u = e.screen.feed().playlistId ? (d = e.screen.feed().metadata) == null ? void 0 : d.date : void 0,
                f = u ? u.add(e.screen.duration(), "seconds") : As(hs),
                p = e.screen.time(),
                r = e.screen.duration() - p,
                a = f.subtract(r, "seconds");
            s({
                date: a.format("DD.MM.[95]"),
                time: a.format("HH:mm:ss")
            })
        });
        const l = () => t() ? Jd[t()] : void 0,
            c = () => t() === "seeking-bwd" || t() === "seeking-fwd";
        return pe(() => {
            n && (c() ? n.play() : n.pause())
        }), pe(() => {
            const u = e.screen.seekerSpeed();
            !n || !u || (n.playbackRate = u === 4 ? 1 : u === 16 ? 1.5 : 2)
        }), [(() => {
            const u = Wd(),
                f = n;
            return typeof f == "function" ? Ee(f, u) : n = u, ce(u, "src", Yd), X(() => (c() ? "visible" : "hidden") != null ? u.style.setProperty("visibility", c() ? "visible" : "hidden") : u.style.removeProperty("visibility")), u
        })(), S(ss, {
            get children() {
                return [S(Bt, {
                    get when() {
                        return t() === "error"
                    },
                    get children() {
                        return qd()
                    }
                }), S(Bt, {
                    get when() {
                        return t() !== "error"
                    },
                    get children() {
                        return [S(Ve, {
                            get when() {
                                return l()
                            },
                            children: u => (() => {
                                const f = Qd();
                                return D(f, S(ie, {
                                    size: "screen-overlay-md",
                                    get children() {
                                        return u().text
                                    }
                                }), null), D(f, S(_t, {
                                    get name() {
                                        return u().icon
                                    },
                                    get class() {
                                        return le("pt-4", {
                                            "w-[85px]": !c(),
                                            "w-120": c(),
                                            "[&_#path-2]:hidden [&_#path-3]:hidden": e.screen.seekerSpeed() === 4,
                                            "[&_#path-3]:hidden": e.screen.seekerSpeed() === 16
                                        })
                                    }
                                }), null), f
                            })()
                        }), S(Ve, {
                            get when() {
                                return ke(() => !!i())() && e.screen.isEnabled()
                            },
                            get children() {
                                return S(ie, {
                                    as: "div",
                                    size: "screen-overlay-sm",
                                    class: "absolute bottom-72 left-72 flex flex-col items-start text-white",
                                    get children() {
                                        return [(() => {
                                            const u = Di();
                                            return D(u, () => i().time), u
                                        })(), (() => {
                                            const u = Di();
                                            return D(u, () => i().date), u
                                        })()]
                                    }
                                })
                            }
                        })]
                    }
                })]
            }
        })]
    },
    ep = N('<button class="absolute top-0 left-0 isolate"><div>'),
    tp = {
        c: {
            coordinates: {
                x: 621,
                y: 74
            },
            size: {
                width: 1012,
                height: 808
            }
        },
        tl: {
            coordinates: {
                x: 101,
                y: 99
            },
            size: {
                width: 1012,
                height: 870
            },
            scaleFactor: .48,
            rotation: -1,
            transformOrigin: "top left"
        },
        tr: {
            coordinates: {
                x: 1688,
                y: 86
            },
            size: {
                width: 1012,
                height: 870
            },
            scaleFactor: .48,
            rotation: 1,
            transformOrigin: "top left"
        },
        bl: {
            coordinates: {
                x: 103,
                y: 572
            },
            size: {
                width: 1012,
                height: 870
            },
            scaleFactor: .48,
            rotation: -3,
            transformOrigin: "top left"
        },
        br: {
            coordinates: {
                x: 1666,
                y: 551
            },
            size: {
                width: 1012,
                height: 870
            },
            scaleFactor: .48,
            rotation: 2,
            transformOrigin: "top left"
        }
    },
    np = e => {
        const [n, t] = W(void 0);
        let o;
        const i = () => tp[e.screen.position()],
            {
                data: s,
                controls: l
            } = Zd({
                targetRef: n
            });
        return pe(() => {
            ot.currentStatus() === Ut.done && Ze.dataUsageWarningDialog.accepted() && o && !e.screen.Player.isMounted() && e.screen.Player.mount(o)
        }), Ae(() => {
            e.screen.Player.unmount()
        }), pe(() => {
            e.screen.position() === "c" && !["initializing", "error"].includes(e.screen.status()) ? l.enable() : l.disable()
        }), (() => {
            const c = ep(),
                u = c.firstChild;
            c.$$click = () => {
                var p;
                (p = e.onClick) == null || p.call(e)
            }, Ee(t, c);
            const f = o;
            return typeof f == "function" ? Ee(f, u) : o = u, D(c, S(Xd, {
                get screen() {
                    return e.screen
                }
            }), null), X(p => {
                const r = "".concat(i().coordinates.y, "px"),
                    a = "".concat(i().coordinates.x, "px"),
                    d = "".concat(i().size.width, "px"),
                    v = "".concat(i().size.height, "px"),
                    g = i().transformOrigin,
                    m = s.isZooming ? "10" : void 0,
                    h = "translate3d(".concat(s.delta.x, "px, ").concat(s.delta.y, "px, 0) rotateZ(").concat(i().rotation || 0, "deg) scale(").concat((i().scaleFactor || 1) * s.scale, ")"),
                    y = i().hidden ? "hidden" : void 0,
                    w = le("Video", e.screen.status() === "initializing" && "invisible");
                return r !== p._v$ && ((p._v$ = r) != null ? c.style.setProperty("top", r) : c.style.removeProperty("top")), a !== p._v$2 && ((p._v$2 = a) != null ? c.style.setProperty("left", a) : c.style.removeProperty("left")), d !== p._v$3 && ((p._v$3 = d) != null ? c.style.setProperty("width", d) : c.style.removeProperty("width")), v !== p._v$4 && ((p._v$4 = v) != null ? c.style.setProperty("height", v) : c.style.removeProperty("height")), g !== p._v$5 && ((p._v$5 = g) != null ? c.style.setProperty("transform-origin", g) : c.style.removeProperty("transform-origin")), m !== p._v$6 && ((p._v$6 = m) != null ? c.style.setProperty("z-index", m) : c.style.removeProperty("z-index")), h !== p._v$7 && ((p._v$7 = h) != null ? c.style.setProperty("transform", h) : c.style.removeProperty("transform")), y !== p._v$8 && ((p._v$8 = y) != null ? c.style.setProperty("visibility", y) : c.style.removeProperty("visibility")), w !== p._v$9 && te(u, p._v$9 = w), p
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0,
                _v$5: void 0,
                _v$6: void 0,
                _v$7: void 0,
                _v$8: void 0,
                _v$9: void 0
            }), c
        })()
    };
$e(["click"]);
const rp = N('<img class="absolute top-0 left-0 wh-full pointer-events-none">'),
    op = () => (() => {
        const e = rp();
        return X(() => ce(e, "src", ho().bgSrc)), e
    })(),
    ip = N('<button class="absolute origin-top-left">'),
    sp = [{
        appName: "terminal",
        position: {
            x: 319,
            y: 865
        },
        size: {
            width: 351,
            height: 252
        }
    }, {
        appName: "log-book",
        position: {
            x: 862,
            y: 962
        },
        size: {
            width: 581,
            height: 178
        }
    }, {
        appName: "answering-machine",
        position: {
            x: 1702,
            y: 828
        },
        size: {
            width: 507,
            height: 333
        }
    }],
    ap = e => S(lo, {
        each: sp,
        children: n => (() => {
            const t = ip();
            return t.$$click = () => e.onItemSelected(n.appName), X(o => {
                const i = "".concat(n.size.width, "px"),
                    s = "".concat(n.size.height, "px"),
                    l = "translate(".concat(n.position.x, "px, ").concat(n.position.y, "px)");
                return i !== o._v$ && ((o._v$ = i) != null ? t.style.setProperty("width", i) : t.style.removeProperty("width")), s !== o._v$2 && ((o._v$2 = s) != null ? t.style.setProperty("height", s) : t.style.removeProperty("height")), l !== o._v$3 && ((o._v$3 = l) != null ? t.style.setProperty("transform", l) : t.style.removeProperty("transform")), o
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }), t
        })()
    });
$e(["click"]);
const lp = "/assets/answering-machine-button-glow-58ea4526.svg",
    cp = N('<img class="absolute origin-bottom-left">'),
    up = {
        "phone-button-light": {
            position: {
                x: 1914,
                y: 962
            },
            size: {
                width: 150,
                height: 150
            }
        }
    },
    fp = () => {
        const e = up["phone-button-light"];
        return S(Ve, {
            get when() {
                return Ze.answeringMachineTrack.hasNew()
            },
            get children() {
                const n = cp();
                return ce(n, "src", lp), X(t => {
                    const o = e.size.width,
                        i = e.size.width,
                        s = "translate(".concat(e.position.x, "px, ").concat(e.position.y, "px)");
                    return o !== t._v$ && ce(n, "width", t._v$ = o), i !== t._v$2 && ce(n, "height", t._v$2 = i), s !== t._v$3 && ((t._v$3 = s) != null ? n.style.setProperty("transform", s) : n.style.removeProperty("transform")), t
                }, {
                    _v$: void 0,
                    _v$2: void 0,
                    _v$3: void 0
                }), n
            }
        })
    },
    dp = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAAAwECBAUGBwgBAQACAwEBAAAAAAAAAAAAAAABBQIDBgQH/9oADAMBAAIQAxAAAAD5/rSpJbW3JaMQCWKaYomz89Wtt6GDLTo2diYemAYZgAAAAAAC4tyr+gz8cfabLprHhdfou0k9NH4zyftvm9f23G02OD4+osEbAAAAABUv2UPabqyHu9vv7T5zisp6efx7JZU4fPddXHd4ryXv/mlf3Hm8W11lf2tojaAAAAkjvRvPWfJvYbDidhu9Rt7HhcPIjmnXh5kF6bLg1GJsMDTZ+Rc90XO0/wBSiGv3gAAAK0Gw6fjNvtrfZdtzO8tvme1gsw9nh32HZjzhs9Tna+M8nzX0Lznz33HarLwqr6OGO8AAAACuTi1nHqu+8y9X9vIrci/1c3AmTENmTZE8Ty255Gu7qsVaaLkEgAAAAAL7CJEYkRiSlgrQSAAAAAAAAAAAAAAAAB//xAA0EAACAQMDAgMFBwQDAAAAAAABAgMABBEFEiETMQYiURQwUmFxFRYgMkBBkSNQgZJTgsH/2gAIAQEAAT8AoAsQACSaSCZ/yoTTxvG211IPofxCGVlDKjEH0oQylgvTbJ7ZGKMMqjLIwHzGKNtOO8b/AMUbeb/jb+KEMpAIRiD6DNNDKgJaNgM4yR7tWKkEHBFLLIvZiOc0zMxyxJP4kllXAVyMdsUiux7mlhlk/MzGhbXJHdqaGaPsTTdZF2hiBTySkbWdiPTP6OKMtVjp7ysoC8kgCrPwzd7lDwMvzYcCodNsolCR2gnAbzuyhv8AXFXvh8yndaozof8ALL8mxWp6Lc2uOrEyZzjcMZxU8RUmiMH9AFJqK2ZiOKs9OZscV4ftvZ5OUG112nira2aMv1GY4baBuPepopRJGQ4P0AFS25dSpbzFTgjy4/wK1G2f2AozZMj5wecBavdOYE8VPasp7UyEe+Vc1b2xYjirDTixHlrTtFYhSV49ags4YVACgmiM71YYyc0qnHmjLH1oAqWZu+MAV7IkseJFP1rUNEOGKrkYrUNNKk+Wrm2Kk8U6Y94Bk1BFuIrR9JluGUKhPIrTtHt4FUuVZscgGvKOOK3D1FZHqKaMM3lagoUVkeoo4xV9ptrdAksqt+5rWNHlgLErkeo5H81cw7SaYY93H3qyUFlqxYxaXA1t5cnErDht319KsJo9qq4IbPcUyKwLZPaozucLUi7VCr3Y0jtFLg1O2Is1BtcNknimc7JsNkBeDUSLPcbHJxz2q7SP+rDE4lh6EjFTyFIH5q1BAGapBz7tO9WLgOua0W6tfZYBblBIFHWDttDH5Zr2Qlg6iNV+T5FLs2BQwPHrUdu6uGOKaIs+7OPSpbZmbIOaZGaEJxn61FbBVbfSqxjePKnIOOa9jaNyzhWGCdu7k1LFH0LhJJUWFvPncN64Hw1qLDe1Sd/direTBqxumUrzUFwx0qNs4/qH/tWmgSRs5Y8GjOwjOOfNtBpbp0l2uTwcEVOxERZTVqesWyx4rccyoGJAU8+lQXIjlJPwmrhmFq9yPM5GAfhrUrlyXyau5CWNMcn3kbYNWs2CK0do59IdOvErtKDh3C8LVoLe2hbqywuxIC7XzU9xApDm4QIgG3YwY5+lO8VyRJHdLnOD1CEoSKbVo2nh3dh5xUIgiSRpZozxxtcE1DLEiSIZ4sHODvFW6RwzdWSeAgAkYkHeo7mNiJYpYVRx50dwvNeIxDBdypFIrJ3Uqc8Gp3yT70VG+DWnyXDglAxVdu5gDhdxwMn9s1baFqLorEYyAaPh6/Nfd++BA/8AaGg6hX2Ff19hX2SAafQL8g4rVBc2MjRyZDCri5L5yads++BxWk6rJZNOE2jrII3YjLbM5IHpn96g8WaY6Rl0cOEVT5h+1febSfR/9h6Yp/FOluqqQ/Ax+YUPFGlAg7X+m4UfFOmZUjfwQe45xT+KNLd92HHrhhUnifSSDlJD9HrxNrMV/dPJGCAaMhNE/oBI47Ma6snxGurJ8RrqyfEa6snxmurJ8RrqSfEaJJ7n+9//xAAoEQABAwIDBwUAAAAAAAAAAAABAAIRAyEEEjEgIiMwQVKhEEBRYWL/2gAIAQIBAT8ARyRaZ9Rlm8oNaflZG/pEMA6zymsJVGg2ASjSa4RCr0YNkQRyKbC4qlhwBJUBQnU2uCr4ci40REbeF1N+iZMQUAYV7q8Igxoqmp26boKYZynpCLvtE3CJO6sQdwEFON9sFYYsM53KMP3eVwO/yuB3eVVcM5DTI9//AP/EAC4RAAICAQMBBgMJAAAAAAAAAAECAxEABAUSMRMgITBBUVSBkgYUJEBhcpHR4f/aAAgBAwEBPwDuHHmVOpwauMmgcVw3TytRqo4lNnN03qbtHSNgAB4epOQ7jNE4cS2W62Sc2jdTKlSEWDVjEkVwCD5Gu1iQRlmYADNy3t5mKxdPfO0ckliSThcfzkOtnhfkp+WbPvaS0jGm9jkTh1B7zdDn2jLBIzwLAPdenzzUlS4dCbPUe2Oy8xTeAGMUYxtYv1wlCxINixkTqZAVckUBWaG+zXv6zTh1PhmsiC9vGLDdqaAGRwgi2SlPrR8DiRVHIvjy5UKGRKoWYEHoK/XNjQfeWjZPHqP6yBOKDvsvIZv0esiMR0sPK75GrrOe9fDmv2Ze8/DH6MU7zY/DH6P9zbNO500TzRhZCo5DAKHkUDnFfYZxX2GcV9h+T//Z",
    pp = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQgBAQACAwEBAAAAAAAAAAAAAAADBAECBQYH/9oADAMBAAIQAxAAAAD5/wDfKi9Qp2UHurxctsL9i/nKny7nHlNYo8uUlg91z498AAAFy3Oz2I1IW7FqO27WNyi87lQM7ib8PAsbZbNfm8GWaapHb5D6W7GVYl94NeksyNxmrTOh6Bp0zMS+ow8eatEOKPOTcJOW70UkNt5MeiVdSc2XlrqQ5b71EctdSGkYHRm0HLPepNZ+W+dTHLaeqDldHVoCXXTM61d9JLDinzU5Bzlu9l9l432bwt/YardPjOvWpqKvKKirykVqK8Ka7GQWynK55RSZOm7hqNuHjNq9Z+v8WHFflpyDnLd6neuZ18bXs7jjkz9jccHY3HB2Nyrss3Ij3uh5xvbjiDsdjccHY3HB2HWtDszaZleDneq2hxT5qbhJy3eibN6zWqBroABXJxLMcrh4xgMSgAAZOfgZ97ow4o85NQ/s08/RCrNuaQrGJpCiaQomkKJpCiaQomkKJpCiaQonsGPoxrSqUqHTwAAAAAAAAAAAAf/EACMQAAAFBAMBAQEBAAAAAAAAAAIDBAUVARIUFgAGExAwIED/2gAIAQEAAQIA4EJSU0n+aJqJhEDS1TYwyPyCIB4zOW+PwCmpxhmYBWFSYfylKU/ssrCwjSCE4RCZ9dM68WwrAqmBe2mJRtsIFEhbBF4WFhDL+M9TXaYVLSySkmEYnUJ3UqiU9OSlKCvbiULMqQIvaYmCHV5+tPDg0IxvDw8PDxqR4Jl64zH8PCifwxsYRKajx9aeAJbmDU9T1PU9T1PU9T1PU9T1PU9T1PUxdTdGIJbx9aeIg9aLqbf6iO9AGX+tTKDCaIVDanVH687eA6jx9aeIa9bGEmiYJHl4FlCJoTQiwwgQaleAyKEUp24R1Xj608KOaOxbft+37ft237ft+37dt+37dt+37eLt712Ghjx9aeHCCqzs7Ozs7Obj9Uc+udsIzs7Ozs7OqtGpTVePrTxR+BZk6J7VLPwS8ePrTxR/kS8ePrSYY3xsbGxsbGxsbGxsbGxsbGxsbGxpSB2M5bSl111111111111111111111aWx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx/wD/xAA5EAABAwIDAwgJAwUBAAAAAAABAAIDBBESUVQhkZMQEzFBYnGS0QUUIiRSYXOhsSMwMiAzgYLBQP/aAAgBAQADPwBOcQ1oJJ6AFUS/wjJUkL8EjcLsv6p3RiRsZLT0EKcvazmnBzr2BFr271M1uN0bg29rkWVSwkGF+66nAuYn7lOWtcInEOFwQLqZgJdE4AG1yNn7bmODmkgjoKmZ/F5G2+xPkOJ7i42tc8hte2xSAYi2w5Z4w0MlcAOixUpNzI69iOnPpVU8HG95Bte5yVVe/PP3qoYbtlPX91VMiwNkcGKoe2z5XFuRPISLono/YfIbNCnyU+SfEAXDpUTvR0bHRkMMEspN9mKNwAf/AKqSKd0MhrIoQ8MYwMBjw/N/zVK18rp2TxtMsgjYwB5DWHr7s1FE4Rz+sF77uZzTQ8YMyntnY0YsALmv2i4cwXcB3BUjZBidO6wBLWgOdZwu02H3VLHggbT1Doud5iRg2m2DEGC2+6LS0Q48WKO4fYbJjZm8r1aSLBidHJiDSbXuw4XCw+axQH0b6s8SRsBDr7DM0YngdRu1RT0RY+J7I4IopC7EPZDhief9lRPsWPnAL8HtgNIfbFY5AhUlLTQxilq3xzlwf7NnktthOHskr1V0sT4HnHO2M2cATG9pdgPzKxzuY0bSVPkp8lP8Kcw2cOXCZHDpDHn7KpbI4B7t6qvjdvU1SGh7iQCo3egsYijx8xIMeP55fFkpof0jTSz7LYnTgxHZ0gFSS1EcrQZogzmXczLhOJmwuN+pyeyazafEwlpa+GYAsAFsDr71JG+ZrPR7JsTnubIyUYRjFrG/wqajpXSNayJ5MQDo3nHsbttb7qdj3TtihcRPjEbZNrmlgaQ05A7U9kgkFCJw9kfsiUYmOZ8RPW6+1Gpmo5RDEebE7zGX7XkPsGH/AIqU1opGlzqmN98Rl/Se8bSAPn0KeeGsEMcMWIRljRJtdhBu0J4jhPqoBEpMnPzBxIDDYk5XU1RF/EzSQg3vLaRwkFrgn4UGS1TJhHMRM1wLpdrQW3s45Zp0FWZGHa1xsQqr43b1VfG7eql8li929e8v7+XZL9N/4RMru9OKfkpVLl9lLkpcvspVKVLkhFSx08tCyUMc4tJJafa7lNV1DpubawWADWjYABYBSXupVLa1vspApclJkU/JOCtKF7y/v5dkv03/AIWOd3ep6ppMUJfa17Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTOVRRtBmhczFe1+uywTL3l/fy/wB36b/wgag96DIZfmGqMC5cOr7pmYTLs7Rso2329BF0y4GLpTHlwbttZMBIv0Dao9ntdKjAviCaSLEbRdMcwOvYEH7INaXHoATSG32E9SjAJvexA3pgNiVHa+LrtyB0FP8AIPVqhe8v7+X+79N/4Vqj/KDoZe5qDSDiJsRb/CaCDidsFvtZBotjP8sS7WzFcC3zum4g66wX9om4A7gEHOeS7+QssNsLrHr2DagCfaNtn2N17Ydi6ARZEsDQSdp67WBQc1zT1iyBI2kAAAjOyGEjGegAHK20LE7FiN7f8srtaH2FidxRBccRN/sgIIO56vUL3l/fy/3fpv8AwsE571JRMcIy32rXuL9Cmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8KntsMfhU1e1gkLLMvbCLdKxzr3l/fy7Jfpv8Awi2Z3enN60/NPzKfmU/Mp+ZT8yufrYI33LXOsV6IHTBMe55XoymgY+OGQEyBvtPv0qH0V6VNNTYgwRMdtNzdyfmU/Mp+ZT8yn5lPzKfmnO61eYL3l/fy7Jfpv/C/Vd+w+N7XscQ4dBXpbX1HFf5r0o62Ksmdtv7T3O/KqKuTnJ5XPfa13G5/Z/VC95f38uyX6b/wv1Xf+T9UL3l/fyxtc8PcGgscLn5hUz3l3rEe8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqZjr+sR7z5Jj6h5Ybi/I74SnjoBU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aTz0gp3wlUGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bV//8QANREAAQIDAwkHAgcAAAAAAAAAAQACAwQRElORBRATFBUWIjRUBiAhMUFRYWJxMDI1UnJzsf/aAAgBAgEBPwBGzT1rnFPVcPyuD5XBT170tCEWM1hNAUWSAJGkiYICHbfoyS2z6pza0q1GEz9qa0CoDU6E3yA8UGggmlfRBrQRw0JT2tGjteDbXirMheRMFEgS+gdFhPcaOAIIzSPMsU5Ow5dzy9wAqtty163Fbclr1uK25LXrcVtyWvW4o5egEUMVmIW3Ja9bituS163Fbclr1uKg5Xl4rw1sRpJ+VCIdk+KfrbmkeZYu0tbMT2tKjPcrgRsUNCVRnuuH3RDfD7rgVGUHisnc7Bp7n/FKfpkT+bc0jzLFPyEOZL2vAIqt35a7C3flrsLd+WuwoXZiDFBLWMUTsvChgksYt35a7C3flrsLd+WuwoGRJeDEDxDAIUFtnJ8UfW3NI8yxP/O779wOcPIlFzj5k91nIxf7G5oEXQxWvpWiMzLkk6s3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lRZpjoJhMhBgJBP4/wD/xAA2EQABAwAGBwUGBwAAAAAAAAABAAIDBAURFCFSEBIVQVFUkRMgNHOxBiIxM2FxIzA1RFOBkv/aAAgBAwEBPwDSCD8DotWPfosLZ52RuNgKMdWgkdrJgcqrp0THQCJztQygAnDcoZuzLyyYNBaLXAjGz+8CfqmVnSbR+OCXN3loHqpZnvEUsk+sLHBotA97BUespbA98gLADbiMpPHiFJO5j4mmQstIfrHiSAXDH4FPnmlY93bFzIyLRrAYm0DEFVVKJaVNrvJFkes4fXeBatSrf5Zf8qWj0a7Omhe42OAII46Ku8XGhA6SRwA3lXCXIVcJMh6LZ8mQ9FcJMhTKnayQyNidrG3jvxKuEmQq4SZCrhJkKfQ5GAktKYLKum8xvodFXeLjVBs7Z33K97gveWKxWKFqxVruCpPyHr9hP5rfQ6Ku8XGm0h0UjiDvK2jLmK2jLmK2jLmKrL2qhq18bJ+0JeCRqqge1sFOlbHEZASHHEZVtGXMVtGTMVtGXMVJTpHtLS42Jhtq6fzG+h0Vd4uNSfMf9z3HwxSEF8bXfcWpkEDDrMiY08QO7H+nTeY30OijzGCZsgFtm5Gl0Ukk0RvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUqamRvgMMcAYC4E/n//Z",
    gp = N('<div class="absolute origin-top-left bg-black"><img class="absolute top-0 left-0 wh-full object-cover"><img>'),
    vp = "absolute top-0 left-0 wh-full object-cover",
    hp = () => (() => {
        const e = gp(),
            n = e.firstChild,
            t = n.nextSibling;
        return e.style.setProperty("width", "150px"), e.style.setProperty("height", "85px"), e.style.setProperty("transform", "translate(403px, 924px) rotateZ(-4deg)"), ce(n, "src", dp), ce(t, "src", pp), X(() => te(t, le(vp, {
            hidden: !Ze.archive.hasNew()
        }))), e
    })(),
    mp = N('<div class="absolute top-0 left-0 wh-full isolate">'),
    _p = e => {
        const [n, t] = W(!1), i = at(() => on() ? [on().srcWebm, on().srcMp3] : []), l = at(() => [ii().srcWebm, ii().srcMp3], {
            loop: !0,
            autoplay: !0
        }), c = at([Mc, Bc]);
        (async () => {
            await Qr(6e4);
            const p = c.internalInstance();
            p && (p.on("end", async () => {
                await Qr(6e5), c.play()
            }), c.play())
        })();
        const f = p => {
            if (p === "answering-machine") {
                const r = i.internalInstance();
                if (!r) return;
                const a = r.playing(),
                    d = r.seek() === 0;
                if (St.options.muted && !a && d) return;
                ne.trackClickEvent("answering-machine", a ? "pause" : "play", "cctv-room"), a ? (l.setVolume(1), c.setVolume(1), i.pause()) : (l.setVolume(.1), c.setVolume(.1), i.play(), d && (Ze.answeringMachineTrack.setLastPlayed(), r.once("end", () => {
                    i.stop(), l.setVolume(1), c.setVolume(1)
                })))
            } else p === "log-book" && (ne.trackClickEvent("logbook", "open", "cctv-room"), e.roomSound.play("logbook-open")), p === "terminal" && (ne.trackClickEvent("terminal", "open", "cctv-room"), e.roomSound.play("terminal-open")), we.openApp(p)
        };
        return (() => {
            const p = mp();
            return D(p, S(lo, {
                get each() {
                    return he.screens
                },
                children: r => S(np, {
                    screen: r,
                    onClick: () => {
                        r.isEnabled() && r.position() === "c" ? (n() || (he.Supervisor.dispatch("play"), t(!0)), he.Supervisor.setControlsVisible(!0)) : he.Supervisor.positionScreenAtCenter(r), e.roomSound.play(Xs(["screen-tap-1", "screen-tap-2", "screen-tap-3"]))
                    }
                })
            }), null), D(p, S(hp, {}), null), D(p, S(op, {}), null), D(p, S(fp, {}), null), D(p, S(ap, {
                onItemSelected: f
            }), null), D(p, S(Ve, {
                get when() {
                    return he.Supervisor.controlsVisible()
                },
                get children() {
                    return S(Fd, {})
                }
            }), null), X(() => (ot.currentStatus() === Ut.done ? "visible" : "hidden") != null ? p.style.setProperty("visibility", ot.currentStatus() === Ut.done ? "visible" : "hidden") : p.style.removeProperty("visibility")), p
        })()
    },
    yp = N('<div class="absolute top-0 left-0 wh-full z-modal">'),
    cr = e => S(Ve, {
        get when() {
            return e.isOpen
        },
        get children() {
            const n = yp();
            return D(n, () => e.children), n
        }
    }),
    bp = "/assets/logbook-36af03c8.mp3",
    wp = "/assets/logbook-dccdaf17.ogg",
    Ap = N('<div><img><img><img class="absolute left-1/2 w-1/2 h-full"><img><img><div class="absolute top-0 left-0 wh-full flex"><button class="flex-1"></button><button class="flex-1"></button></div><button class="absolute top-20 left-20 w-100 h-100 flex-center">'),
    xp = () => [...Gs().map(e => e.srcPng || e.srcJpg), null].reverse(),
    nn = () => qs(xp()).map((e, n) => ({
        index: n,
        left: (e == null ? void 0 : e[0]) || null,
        right: (e == null ? void 0 : e[1]) || null
    })),
    Sp = e => {
        const n = [],
            [t, o] = W(!1);
        mn(async () => {
            const v = n.map(g => new Promise((m, h) => {
                if (!g.src) return m();
                g.onload = () => m(), g.onerror = () => h()
            }));
            try {
                await Promise.all(v), o(!0)
            } catch (g) {
                e.onClose()
            }
        });
        const [i, s] = W(nn().length - 1), [l, c] = W([]), u = () => {
            const v = i() - 1;
            return nn()[v] ? !l().includes(v) : !1
        };
        pe(() => {
            const v = i() - 1,
                g = nn()[v];
            if (!g || l().includes(v)) return;
            const m = [g == null ? void 0 : g.left, g == null ? void 0 : g.right].filter(h => !!h).map(h => {
                if (h) return Qs(h)
            });
            Promise.allSettled(m).then(() => {
                c([...l(), v])
            })
        });
        const f = () => {
                !u() && i() !== 0 && (ne.trackClickEvent("pages", "prev", "logbook"), s(v => v - 1), d.play("page-turn", {
                    interrupt: !0
                }))
            },
            p = () => {
                i() >= nn().length - 1 || (ne.trackClickEvent("pages", "next", "logbook"), d.play("page-turn", {
                    interrupt: !0
                }), s(v => v + 1))
            },
            r = () => nn()[i()],
            a = () => i() === 0,
            d = at([wp, bp], {
                sprite: {
                    "page-turn": [0, 933.3333333333334]
                }
            });
        return (() => {
            const v = Ap(),
                g = v.firstChild,
                m = g.nextSibling,
                h = m.nextSibling,
                y = h.nextSibling,
                w = y.nextSibling,
                b = w.nextSibling,
                P = b.firstChild,
                z = P.nextSibling,
                Y = b.nextSibling;
            return Ee(j => n.push(j), g), ce(g, "src", Ws), Ee(j => n.push(j), m), ce(m, "src", Zs), Ee(j => n.push(j), h), ce(h, "src", Ys), Ee(j => n.push(j), y), Ee(j => n.push(j), w), P.$$click = () => f(), z.$$click = () => p(), Y.$$click = () => {
                e.onClose()
            }, D(Y, S(ie, {
                size: "terminal-lg",
                class: "text-purple leading-none tracking-[-10px]",
                children: "<-"
            })), X(j => {
                var k, x, A, C, $, U, F, q;
                const B = le("wh-full flex relative", !t() && "invisible"),
                    V = le("absolute w-[calc(50%+2px)] h-full", !a() && "invisible"),
                    L = le("absolute w-[calc(50%+2px)] h-full", a() && "invisible"),
                    K = ((k = r()) == null ? void 0 : k.left) || void 0,
                    de = le("absolute w-1/2 h-full pointer-events-none pl-[99px] pr-52", !((x = r()) != null && x.left) && "invisible", ((C = (A = r()) == null ? void 0 : A.left) == null ? void 0 : C.endsWith(".jpg")) && "mix-blend-multiply"),
                    M = (($ = r()) == null ? void 0 : $.right) || void 0,
                    I = le("absolute w-1/2 left-1/2 h-full pointer-events-none pl-52 pr-[99px]", !((U = r()) != null && U.right) && "invisible", ((q = (F = r()) == null ? void 0 : F.right) == null ? void 0 : q.endsWith(".jpg")) && "mix-blend-multiply");
                return B !== j._v$ && te(v, j._v$ = B), V !== j._v$2 && te(g, j._v$2 = V), L !== j._v$3 && te(m, j._v$3 = L), K !== j._v$4 && ce(y, "src", j._v$4 = K), de !== j._v$5 && te(y, j._v$5 = de), M !== j._v$6 && ce(w, "src", j._v$6 = M), I !== j._v$7 && te(w, j._v$7 = I), j
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0,
                _v$5: void 0,
                _v$6: void 0,
                _v$7: void 0
            }), v
        })()
    };
$e(["click"]);
const Tp = e => S(cr, {
        get isOpen() {
            return we.currentOpenApp.mainApp === "log-book"
        },
        get children() {
            return S(Sp, {
                onClose: () => {
                    var n;
                    ne.trackClickEvent("modal", "close", "logbook"), we.closeApp(), (n = e.onClose) == null || n.call(e)
                }
            })
        }
    }),
    kp = "/assets/terminal-2aa26d8b.mp3",
    $p = "/assets/terminal-ca9f8876.ogg",
    ra = Ua(),
    Ip = e => {
        const n = at(e.src, e.options);
        return S(ra.Provider, {
            value: n,
            get children() {
                return e.children
            }
        })
    };

function Yt() {
    const e = Ki(ra);
    if (e === void 0) throw new Error("useAudio must be used within a AudioProvider");
    return e
}
const Pp = "\n      @@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@@\n @@                          @@@@@\n@                         @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@ \n@                         @@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
    Op = "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n     @@      @@@@@@@@      @@  @@\n      @@  @@@@@@@@@@@@@@@@@@  @@\n       @@  @@@@@@@@@@@@@@@@  @@\n        @@  @@@@@@@@@@@@@@  @@\n         @@  @@@@@@@@@@@@  @@\n           @@  @@@@@@@@  @@\n             @@  @@@@  @@\n              @@  @@  @@\n             @@  @@@@  @@\n           @@     @@     @@\n         @@                @@\n        @@        @@        @@\n       @@       @@@@@@       @@\n      @@      @@@@@@@@@@      @@\n     @@     @@@@@@@@@@@@@@     @@\n    @@    @@@@@@@@@@@@@@@@@     @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@                          @@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
    Ep = "\n _   ____                       _ _              _    _           _     _\n| | / ___|  ___  ___ _   _ _ __(_) |_ _   _     / \\  | | ___ _ __| |_  | |\n| | \\___ \\ / _ \\/ __| | | | '__| | __| | | |   / _ \\ | |/ _ \\ '__| __| | |\n|_|  ___) |  __/ (__| |_| | |  | | |_| |_| |  / ___ \\| |  __/ |  | |_  |_|\n(_) |____/ \\___|\\___|\\__,_|_|  |_|\\__|\\__, | /_/   \\_\\_|\\___|_|   \\__| (_)\n                                      |___/\n",
    Dp = "\n    __\n   / /\n  / /\n / /\n/_/\n",
    Cp = "\n _\n(_)\n _\n(_)\n",
    Mp = {
        archive: Pp,
        timecoder: Op,
        securityAlert: Ep,
        forwardSlash: Dp,
        colon: Cp
    },
    Bp = N("<span>"),
    xt = e => (() => {
        const n = Bp();
        return D(n, () => Mp[e.name]), X(() => te(n, le("font-vt-220 font-medium leading-none whitespace-pre", e.class))), n
    })(),
    jp = N("<span>Security Archives"),
    Lp = N("<span>Time Coder"),
    Rp = N('<div class="wh-full flex justify-center space-x-368 items-end pb-144"><div class="flex flex-col items-center space-y-56" role="button"></div><div class="flex flex-col items-center space-y-56 text-shadow-terminal" role="button">'),
    Ci = wn("relative inline-block w-[600px] text-center py-8", {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black [&>span]:text-shadow-none", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light text-shadow-terminal border"
            }
        }
    }),
    Vp = e => {
        const n = Yt(),
            [t, o] = W();
        let i;
        const s = l => {
            n.play("click", {
                interrupt: !0
            }), o(l), clearTimeout(i), i = setTimeout(() => {
                ne.trackClickEvent("items", "open-".concat(l), "terminal-home"), e.setCurrentOpenApp(l)
            }, 1e3)
        };
        return Ae(() => {
            clearTimeout(i)
        }), (() => {
            const l = Rp(),
                c = l.firstChild,
                u = c.nextSibling;
            return c.$$click = () => s("security-tape-archives"), D(c, S(xt, {
                name: "archive",
                class: "text-purple text-[21px] text-shadow-terminal"
            }), null), D(c, S(ie, {
                size: "terminal-md",
                get class() {
                    return Ci({
                        selected: t() === "security-tape-archives"
                    })
                },
                get children() {
                    return jp()
                }
            }), null), u.$$click = () => s("timecoder"), D(u, S(xt, {
                name: "timecoder",
                class: "text-purple text-[18px] text-shadow-terminal"
            }), null), D(u, S(ie, {
                size: "terminal-md",
                get class() {
                    return Ci({
                        selected: t() === "timecoder"
                    })
                },
                get children() {
                    return Lp()
                }
            }), null), l
        })()
    };
$e(["click"]);
const Np = N('<div class="absolute top-0 left-0 wh-full flex flex-col items-center pt-72 bg-terminal"><img class="block w-[732px] mb-32 text-blue-light drop-shadow-terminal transform-gpu" width="873" height="621"><div class="flex space-x-32 text-blue-light"><div class="bg-blue-light shadow-terminal"></div><div class="w-24 h-full bg-blue-light shadow-terminal">'),
    zp = () => {
        const [e, n] = W(!0), t = setTimeout(() => n(!1), 1e3);
        return Ae(() => clearInterval(t)), S(Ve, {
            get when() {
                return e()
            },
            get children() {
                const o = Np(),
                    i = o.firstChild,
                    s = i.nextSibling,
                    l = s.firstChild;
                return ce(i, "src", mo), D(o, S(ie, {
                    as: "p",
                    size: "terminal-sm",
                    class: "text-center whitespace-pre text-purple mb-56 text-shadow-terminal",
                    children: "**********************************************************\n\n(c) copyright Starr Park corporation, 1995. All rights reserved.\nStarr Park Security Services is a registered\ntrademark of Starr Park corporation. \n          \n**********************************************************"
                }), s), D(l, S(ie, {
                    as: "span",
                    size: "terminal-md",
                    class: "text-black px-16 py-8",
                    children: "Loading"
                })), o
            }
        })
    },
    Up = 10,
    Mi = e => {
        const n = As(e);
        return {
            date: n.format("DD.MM.[1995]"),
            time: n.format("HH:mm")
        }
    },
    Hp = (e = {}) => {
        const [n, t] = W(Mi(e.timezone)), o = () => {
            const s = Mi(e.timezone);
            t(s)
        }, i = setInterval(() => o(), Up * 1e3);
        return Ae(() => clearInterval(i)), n
    },
    Bi = N("<span>"),
    Fp = N("<span>Starr Park Security System"),
    Gp = () => {
        const e = Hp({
            timezone: hs
        });
        return S(ie, {
            as: "p",
            class: "flex justify-between items-center px-144 pt-64 text-blue-dark text-shadow-terminal",
            size: "terminal-sm",
            get children() {
                return [(() => {
                    const n = Bi();
                    return D(n, () => e().date), n
                })(), Fp(), (() => {
                    const n = Bi();
                    return D(n, () => e().time), n
                })()]
            }
        })
    },
    Zp = N('<div><div class="flex w-full"><button><span>&lt;-</span></button><div class="flex items-center flex-1 h-full px-32 bg-blue-light text-blue-light shadow-terminal"></div></div><div class="flex-1 min-h-0 px-100">'),
    Yp = "w-100 h-100 flex-center font-vt-220 font-medium leading-none text-shadow-terminal",
    Rr = e => {
        const n = Yt(),
            t = () => {
                var i;
                const o = n.play("click", {
                    interrupt: !0
                });
                (i = n == null ? void 0 : n.internalInstance()) == null || i.once("end", () => {
                    var s;
                    ne.trackClickEvent("app-bar", "back", "terminal"), (s = e.onBack) == null || s.call(e)
                }, o)
            };
        return (() => {
            const o = Zp(),
                i = o.firstChild,
                s = i.firstChild,
                l = s.nextSibling,
                c = i.nextSibling;
            return s.$$click = () => t(), D(l, S(ie, {
                as: "span",
                size: "terminal-lg",
                class: "text-black",
                get children() {
                    return e.title
                }
            })), D(c, () => e.children), X(u => {
                const f = le("flex flex-col flex-1 pt-64 px-44"),
                    p = le(Yp, "text-purple text-[80px] tracking-[-10px]");
                return f !== u._v$ && te(o, u._v$ = f), p !== u._v$2 && te(s, u._v$2 = p), u
            }, {
                _v$: void 0,
                _v$2: void 0
            }), o
        })()
    };
$e(["click"]);
const Wp = "/assets/terminal-typing-8b10cd31.mp3",
    qp = "/assets/terminal-typing-20a23c49.ogg";
class oa extends Error {
    constructor(t, o) {
        super(o);
        Qo(this, "statusCode");
        this.statusCode = t, Object.setPrototypeOf(this, new.target.prototype)
    }
}
const Qp = "https://bmwryv10bd.execute-api.us-east-1.amazonaws.com",
    ia = {
        base: "".concat(Qp),
        getArchiveByCode: e => "".concat(ia.base, "/timecoder/").concat(e)
    },
    Kp = async ({
        params: e
    }) => {
        const n = ia.getArchiveByCode(e.code),
            t = await fetch(n, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        if (!t.ok) throw new oa(t.status, "Unable to fetch ".concat(n, ": ").concat(t.status, " ").concat(t.statusText));
        return await t.json()
    }, Jp = N('<div class="flex flex-col space-y-120 w-full pt-72 pb-32"><div class="flex justify-between"><div class="flex space-x-24 items-center"></div><div class="flex space-x-24 items-center"></div></div><div class="flex flex-col space-y-48 items-center"><button class="inline-flex px-120 py-8 text-blue-light border text-shadow-terminal">'), Xp = N('<input pattern="[0-9]*" inputmode="numeric">'), eg = {
        day: "00",
        month: "00",
        year: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
    }, Fn = "text-blue-light text-[20px]", tg = e => {
        const [n, t] = Gt(eg), o = Yt(), i = {
            "typing-1": [0, 200],
            "typing-2": [2e3, 166.66666666666652],
            "typing-3": [4e3, 183.33333333333357],
            "typing-4": [6e3, 183.33333333333357],
            "typing-5": [8e3, 199.9999999999993],
            "typing-6": [1e4, 233.33333333333252],
            "typing-7": [12e3, 250]
        }, s = at([qp, Wp], {
            sprite: i
        }), [l, c] = W(void 0), [u, f] = W(!1), p = (g, m) => {
            t(g, m), s.play(Xs(Object.keys(i)))
        };
        let r;
        const a = async () => {
            o.play("click", {
                interrupt: !0
            }), f(!0), c(void 0);
            const g = Object.values(n).join("");
            let m;
            try {
                m = await Kp({
                    params: {
                        code: g
                    }
                })
            } catch (h) {
                return ne.trackClickEvent("timecoder", "submit", "terminal-timecoder", {
                    archiveCode: g,
                    result: "error"
                }), h instanceof oa && h.statusCode === 404 ? (o.play("timecoder-error", {
                    interrupt: !0
                }), c("Archive not found!")) : (o.play("timecoder-error", {
                    interrupt: !0
                }), console.error(h), c("Something went wrong. Try again later."))
            } finally {
                f(!1)
            }
            ne.trackClickEvent("timecoder", "submit", "terminal-timecoder", {
                archiveCode: g,
                result: "success"
            }), e.onLoadPlaylist(m)
        };
        Ae(() => {
            clearTimeout(r)
        });
        let d;
        const v = g => {
            if (!d) return;
            const m = [...d.querySelectorAll("input")],
                h = m.findIndex(w => w === g),
                y = m[h + 1];
            y ? y.focus() : g.blur()
        };
        return (() => {
            const g = Jp(),
                m = g.firstChild,
                h = m.firstChild,
                y = h.nextSibling,
                w = m.nextSibling,
                b = w.firstChild,
                P = d;
            return typeof P == "function" ? Ee(P, m) : d = m, D(h, S(Ct, {
                name: "day",
                get value() {
                    return n.day
                },
                onChange: p,
                onNextInputFocus: v,
                get disabled() {
                    return u()
                }
            }), null), D(h, S(xt, {
                name: "forwardSlash",
                class: Fn
            }), null), D(h, S(Ct, {
                name: "month",
                get value() {
                    return n.month
                },
                onChange: p,
                onNextInputFocus: v,
                get disabled() {
                    return u()
                }
            }), null), D(h, S(xt, {
                name: "forwardSlash",
                class: Fn
            }), null), D(h, S(Ct, {
                name: "year",
                get value() {
                    return n.year
                },
                onChange: p,
                onNextInputFocus: v,
                get disabled() {
                    return u()
                }
            }), null), D(y, S(Ct, {
                name: "hours",
                get value() {
                    return n.hours
                },
                onChange: p,
                onNextInputFocus: v,
                get disabled() {
                    return u()
                }
            }), null), D(y, S(xt, {
                name: "colon",
                class: Fn
            }), null), D(y, S(Ct, {
                name: "minutes",
                get value() {
                    return n.minutes
                },
                onChange: p,
                get disabled() {
                    return u()
                },
                onNextInputFocus: v
            }), null), D(y, S(xt, {
                name: "colon",
                class: Fn
            }), null), D(y, S(Ct, {
                name: "seconds",
                get value() {
                    return n.seconds
                },
                onChange: p,
                get disabled() {
                    return u()
                },
                onNextInputFocus: v
            }), null), b.$$click = () => a(), D(b, S(ie, {
                size: "terminal-md",
                children: "ENTER"
            })), D(w, S(Ve, {
                get when() {
                    return !!l()
                },
                get children() {
                    return S(ie, {
                        size: "terminal-sm",
                        class: "text-purple text-shadow-terminal",
                        get children() {
                            return l()
                        }
                    })
                }
            }), null), D(w, S(Ve, {
                get when() {
                    return u()
                },
                get children() {
                    return S(ie, {
                        size: "terminal-sm",
                        class: "text-green text-shadow-terminal",
                        children: "Loading..."
                    })
                }
            }), null), X(() => b.disabled = u()), g
        })()
    }, Ct = e => {
        const n = Yt(),
            [t, o] = W(0),
            i = u => {
                const f = u.target,
                    d = f.value.replace(/[^0-9]/g, "").slice(-2).padStart(2, "0");
                e.onChange(e.name, d), f.value = d, t() === 2 && e.onNextInputFocus(f)
            },
            s = u => {
                n.play("click", {
                    interrupt: !0
                });
                const f = u.target;
                f.setSelectionRange(f.value.length, f.value.length)
            },
            l = u => {
                const f = u.key;
                (f === "Delete" || f === "Backspace") && o(p => p !== 0 ? p - 1 : p), /^[0-9]$/.test(f) && o(p => p + 1)
            },
            c = u => {
                o(0)
            };
        return (() => {
            const u = Xp();
            return u.addEventListener("focus", c), u.$$click = s, u.$$keydown = l, u.$$input = i, X(f => {
                const p = le(An({
                        size: "terminal-xxl"
                    }), ["w-192 text-center bg-transparent caret-transparent focus:outline-none", "border-b-2 border-purple text-green drop-shadow-terminal focus:border-b-4"]),
                    r = e.name,
                    a = "".concat(e.name, "-input");
                return p !== f._v$ && te(u, f._v$ = p), r !== f._v$2 && ce(u, "name", f._v$2 = r), a !== f._v$3 && ce(u, "id", f._v$3 = a), f
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }), X(() => u.value = e.value), u
        })()
    };
$e(["click", "input", "keydown"]);
const ng = N('<div class="wh-full flex flex-col w-full pb-48"><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible"></button><div class="flex-1 flex flex-col"></div><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible">'),
    ji = N("<span>"),
    rg = N('<button class="py-16 px-32 text-green text-shadow-terminal">'),
    Gn = 7,
    og = e => {
        const n = Yt(),
            [t, o] = W(0),
            i = () => Math.ceil(fn().length / Gn),
            s = () => fn().slice(t() * Gn, t() * Gn + Gn);
        return (() => {
            const l = ng(),
                c = l.firstChild,
                u = c.nextSibling,
                f = u.nextSibling;
            return c.$$click = () => {
                ne.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"), n.play("click", {
                    interrupt: !0
                }), o(p => p - 1)
            }, D(c, S(ie, {
                size: "terminal-md",
                class: "-rotate-90",
                children: ">"
            })), D(u, S(lo, {
                get each() {
                    return s()
                },
                children: p => {
                    const r = ws(p.postDate, p.dropTime.hours, p.dropTime.minutes),
                        a = Hl(r, "DD.MM.[1995] HH:mm"),
                        d = a.split(" ")[0],
                        v = a.split(" ")[1];
                    return (() => {
                        const g = rg();
                        return g.$$click = () => {
                            ne.trackClickEvent("tape-archives", "open-playlist", "terminal-tape-archives", {
                                playlistId: p.playlistId
                            }), n.play("click", {
                                interrupt: !0
                            }), e.onLoadPlaylist(p)
                        }, D(g, S(ie, {
                            size: "terminal-md",
                            class: "flex space-x-272",
                            get children() {
                                return [(() => {
                                    const m = ji();
                                    return D(m, d), m
                                })(), " ", (() => {
                                    const m = ji();
                                    return D(m, v), m
                                })()]
                            }
                        })), g
                    })()
                }
            })), f.$$click = () => {
                ne.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"), n.play("click", {
                    interrupt: !0
                }), o(p => p + 1)
            }, D(f, S(ie, {
                size: "terminal-md",
                class: "rotate-90",
                children: ">"
            })), X(p => {
                const r = t() === 0,
                    a = t() >= i() - 1;
                return r !== p._v$ && (c.disabled = p._v$ = r), a !== p._v$2 && (f.disabled = p._v$2 = a), p
            }, {
                _v$: void 0,
                _v$2: void 0
            }), l
        })()
    };
$e(["click"]);
const ig = N('<span class="text-black">Access Security System'),
    sg = N('<div class="wh-full flex flex-col items-center space-y-76 pt-76 "><img class="w-[872px] drop-shadow-terminal text-blue-light transform-gpu" width="873" height="621">'),
    ag = e => {
        const n = setTimeout(() => e.setCurrentOpenApp("home"), 2e3);
        return Ae(() => clearInterval(n)), (() => {
            const t = sg(),
                o = t.firstChild;
            return ce(o, "src", mo), D(t, S(ie, {
                size: "terminal-md",
                class: "px-16 py-8 bg-blue-light text-blue-light shadow-terminal",
                get children() {
                    return ig()
                }
            }), null), t
        })()
    },
    lg = N('<span class="text-black">unwatched security footage'),
    cg = N('<div class="flex-1 pt-144 pb-124 px-144"><div class="relative wh-full flex flex-col space-y-92 items-center justify-center border-x-2 border-b-2 border-purple"><div class="absolute top-0 left-0 wh-full flex items-start"><div class="flex-1 border-t-2 border-purple"></div><div class="flex-1 border-t-2 border-purple"></div></div><div class="flex space-x-184"><button><span>Dismiss</span></button><button><span>Open'),
    Li = wn(["relative px-24 py-8", An({
        size: "terminal-md"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light text-shadow-terminal border"
            }
        }
    }),
    ug = e => {
        const n = Yt(),
            [t, o] = W();
        let i;
        const s = l => {
            n.play("click", {
                interrupt: !0
            }), o(l), clearTimeout(i), i = setTimeout(() => {
                l === "open" ? e.onLoadPlaylist() : ne.trackClickEvent("notification", "dismiss", "terminal-notification-screen"), Ze.archive.dismissNotification()
            }, 1e3)
        };
        return Ae(() => {
            clearTimeout(i)
        }), (() => {
            const l = cg(),
                c = l.firstChild,
                u = c.firstChild,
                f = u.firstChild,
                p = f.nextSibling,
                r = u.nextSibling,
                a = r.firstChild,
                d = a.nextSibling;
            return D(u, S(xt, {
                name: "securityAlert",
                class: "px-64 -translate-y-1/2 text-blue-light text-[32px] text-shadow-terminal"
            }), p), D(c, S(ie, {
                as: "div",
                size: "terminal-xl",
                class: "px-56 py-32 bg-orange text-orange shadow-terminal",
                get children() {
                    return lg()
                }
            }), r), a.$$click = () => s("dismiss"), d.$$click = () => s("open"), X(v => {
                const g = Li({
                        selected: t() === "dismiss"
                    }),
                    m = Li({
                        selected: t() === "open"
                    });
                return g !== v._v$ && te(a, v._v$ = g), m !== v._v$2 && te(d, v._v$2 = m), v
            }, {
                _v$: void 0,
                _v$2: void 0
            }), l
        })()
    };
$e(["click"]);
const fg = N('<div class="realtive wh-full flex flex-col bg-terminal">'),
    dg = e => {
        const n = () => we.currentOpenApp.mainApp,
            t = () => we.currentOpenApp.mainApp === "terminal" ? we.currentOpenApp.terminalApp : void 0,
            o = (i, s) => {
                var l;
                he.Supervisor.switchFeed({
                    archivePlaylist: {
                        playlistId: i.playlistId,
                        metadata: {
                            date: ws(i.postDate, i.dropTime.hours, i.dropTime.minutes, i.dropTime.seconds)
                        }
                    },
                    source: s
                }), Ze.archive.setLastPlayed(i.postDate), (l = e.onPlaylistLoad) == null || l.call(e), we.closeApp()
            };
        return S(cr, {
            get isOpen() {
                return n() === "terminal"
            },
            get children() {
                return S(Ip, {
                    src: [$p, kp],
                    options: {
                        sprite: {
                            click: [0, 220.6122448979592],
                            "timecoder-error": [2e3, 283.3333333333332]
                        }
                    },
                    get children() {
                        const i = fg();
                        return D(i, S(Gp, {}), null), D(i, S(ss, {
                            get fallback() {
                                return S(ag, {
                                    setCurrentOpenApp: s => we.openApp(s)
                                })
                            },
                            get children() {
                                return [S(Bt, {
                                    get when() {
                                        return Ze.archive.hasNew()
                                    },
                                    get children() {
                                        return S(ug, {
                                            onLoadPlaylist: () => {
                                                const s = fn()[0];
                                                s && (ne.trackClickEvent("notification", "open-playlist", "terminal-notification-screen", {
                                                    playlistId: s.playlistId
                                                }), o(s, "security-tape-archives"))
                                            }
                                        })
                                    }
                                }), S(Bt, {
                                    get when() {
                                        return t() === "home"
                                    },
                                    get children() {
                                        return S(Rr, {
                                            title: "Security System",
                                            onBack: () => we.closeApp(),
                                            get children() {
                                                return S(Vp, {
                                                    setCurrentOpenApp: s => we.openApp(s)
                                                })
                                            }
                                        })
                                    }
                                }), S(Bt, {
                                    get when() {
                                        return t() === "security-tape-archives"
                                    },
                                    get children() {
                                        return S(Rr, {
                                            title: "Security Tape Archives",
                                            onBack: () => we.openApp("home"),
                                            get children() {
                                                return S(og, {
                                                    onLoadPlaylist: s => o(s, "security-tape-archives")
                                                })
                                            }
                                        })
                                    }
                                }), S(Bt, {
                                    get when() {
                                        return t() === "timecoder"
                                    },
                                    get children() {
                                        return S(Rr, {
                                            title: "Timecoder v2.1.0",
                                            onBack: () => we.openApp("home"),
                                            get children() {
                                                return S(tg, {
                                                    onLoadPlaylist: s => o(s, "timecoder")
                                                })
                                            }
                                        })
                                    }
                                })]
                            }
                        }), null), D(i, S(zp, {}), null), i
                    }
                })
            }
        })
    },
    pg = "/assets/cctv-room-2f2fa9dd.mp3",
    gg = "/assets/cctv-room-e0e04e21.ogg";

function vg(e) {
    const n = ye({}, e),
        t = ye({}, e),
        o = {},
        i = l => {
            let c = o[l];
            if (!c) {
                if (!er()) return n[l];
                o[l] = c = W(n[l], {
                    internal: !0
                }), delete n[l]
            }
            return c[0]()
        };
    for (const l in e) Object.defineProperty(t, l, {
        get: () => i(l),
        enumerable: !0
    });
    const s = (l, c) => {
        const u = o[l];
        if (u) return u[1](c);
        l in n && (n[l] = si(c, [n[l]]))
    };
    return [t, (l, c) => {
        if (jc(l)) {
            const u = fe(() => Object.entries(si(l, t)));
            ar(() => {
                for (const [f, p] of u) s(f, () => p)
            })
        } else s(l, c);
        return t
    }]
}
var sa = {
    width: null,
    height: null
};

function Vr(e) {
    if (!e) return ye({}, sa);
    const {
        width: n,
        height: t
    } = e.getBoundingClientRect();
    return {
        width: n,
        height: t
    }
}

function hg(e) {
    const n = typeof e == "function",
        [t, o] = vg(n ? sa : Vr(e)),
        i = new ResizeObserver(([s]) => o(Vr(s.target)));
    return Ae(() => i.disconnect()), n ? pe(() => {
        const s = e();
        s && (o(Vr(s)), i.observe(s), Ae(() => i.unobserve(s)))
    }) : (i.observe(e), Ae(() => i.unobserve(e))), t
}
const mg = e => {
        const [n, t] = W({
            x: 0,
            y: 0
        }), [o, i] = W(1), s = hg(e.containerRef);
        return pe(() => {
            if (!e.containerRef() || s.width == null || s.height == null) return;
            const c = ps(e.position) || {
                    x: 0,
                    y: 0
                },
                u = e.bgImageSize.width / e.bgImageSize.height,
                f = s.width / s.height;
            let p, r;
            e.fit === "cover" ? u <= f ? (p = s.width, r = s.width / u) : (p = s.height * u, r = s.height) : u <= f ? (p = s.height * u, r = s.height) : (p = s.width, r = s.width / u);
            const a = Math.round(p / e.bgImageSize.width * 1e3) / 1e3,
                d = (p - s.width) / 2,
                v = (r - s.height) / 2,
                g = p * c.x / e.bgImageSize.width - d,
                m = r * c.y / e.bgImageSize.height - v;
            t({
                x: g,
                y: m
            }), i(a)
        }), {
            position: n,
            scaleFactor: o
        }
    },
    _g = N("<div><video muted playsinline>"),
    yg = 7.1,
    bg = 7.7,
    wg = e => {
        let n;
        const [t, o] = W(void 0);
        return mn(async () => {
            if (!n) return;
            if (!St.options.muted) try {
                n.muted = !1, await n.play()
            } catch (u) {
                n.muted = !0, St.setMute(!0)
            } finally {
                n.pause()
            }
            try {
                await n.play()
            } catch (u) {
                return console.error("Error during transition video playback, skipping transition...", u), o("error"), e.onEnded()
            } finally {
                n.pause()
            }
            await new Promise(u => {
                if (!n) return u();
                n.load(), n.addEventListener("canplaythrough", () => u())
            }), await Qr(600), await n.play(), o("done"), e.onLoaded();
            const l = () => {
                !n || n.currentTime < yg || (e.onEnded(), n.removeEventListener("timeupdate", l))
            };
            n.addEventListener("timeupdate", l);
            const c = () => {
                n && (n.currentTime = bg, n.play())
            };
            n.addEventListener("ended", c)
        }), pe(za(he.Supervisor.allLoaded, i => {
            n && (i ? n.pause() : n.play())
        }, {
            defer: !0
        })), (() => {
            const i = _g(),
                s = i.firstChild;
            s.addEventListener("error", c => {
                console.error("Error during transition video playback, skipping transition...", c), o("error"), e.onEnded()
            });
            const l = n;
            return typeof l == "function" ? Ee(l, s) : n = s, X(c => {
                const u = le("wh-full", t() === "error" && "bg-black"),
                    f = fe(ho).transitionVideoSrc,
                    p = le("wh-full object-contain"),
                    r = t() === "done" ? "visible" : "hidden";
                return u !== c._v$ && te(i, c._v$ = u), f !== c._v$2 && ce(s, "src", c._v$2 = f), p !== c._v$3 && te(s, c._v$3 = p), r !== c._v$4 && ((c._v$4 = r) != null ? s.style.setProperty("visibility", r) : s.style.removeProperty("visibility")), c
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), i
        })()
    };
Promise.allSettled = Promise.allSettled || (e => Promise.all(e.map(n => n.then(t => ({
    status: "fulfilled",
    value: t
})).catch(t => ({
    status: "rejected",
    reason: t
})))));
var Tt = [],
    Ag = function() {
        return Tt.some(function(e) {
            return e.activeTargets.length > 0
        })
    },
    xg = function() {
        return Tt.some(function(e) {
            return e.skippedTargets.length > 0
        })
    },
    Ri = "ResizeObserver loop completed with undelivered notifications.",
    Sg = function() {
        var e;
        typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
            message: Ri
        }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = Ri), window.dispatchEvent(e)
    },
    hn;
(function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box"
})(hn || (hn = {}));
var kt = function(e) {
        return Object.freeze(e)
    },
    Tg = function() {
        function e(n, t) {
            this.inlineSize = n, this.blockSize = t, kt(this)
        }
        return e
    }(),
    aa = function() {
        function e(n, t, o, i) {
            return this.x = n, this.y = t, this.width = o, this.height = i, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, kt(this)
        }
        return e.prototype.toJSON = function() {
            var n = this,
                t = n.x,
                o = n.y,
                i = n.top,
                s = n.right,
                l = n.bottom,
                c = n.left,
                u = n.width,
                f = n.height;
            return {
                x: t,
                y: o,
                top: i,
                right: s,
                bottom: l,
                left: c,
                width: u,
                height: f
            }
        }, e.fromRect = function(n) {
            return new e(n.x, n.y, n.width, n.height)
        }, e
    }(),
    yo = function(e) {
        return e instanceof SVGElement && "getBBox" in e
    },
    la = function(e) {
        if (yo(e)) {
            var n = e.getBBox(),
                t = n.width,
                o = n.height;
            return !t && !o
        }
        var i = e,
            s = i.offsetWidth,
            l = i.offsetHeight;
        return !(s || l || e.getClientRects().length)
    },
    Vi = function(e) {
        var n;
        if (e instanceof Element) return !0;
        var t = (n = e == null ? void 0 : e.ownerDocument) === null || n === void 0 ? void 0 : n.defaultView;
        return !!(t && e instanceof t.Element)
    },
    kg = function(e) {
        switch (e.tagName) {
            case "INPUT":
                if (e.type !== "image") break;
            case "VIDEO":
            case "AUDIO":
            case "EMBED":
            case "OBJECT":
            case "CANVAS":
            case "IFRAME":
            case "IMG":
                return !0
        }
        return !1
    },
    ln = typeof window < "u" ? window : {},
    Zn = new WeakMap,
    Ni = /auto|scroll/,
    $g = /^tb|vertical/,
    Ig = /msie|trident/i.test(ln.navigator && ln.navigator.userAgent),
    Le = function(e) {
        return parseFloat(e || "0")
    },
    Rt = function(e, n, t) {
        return e === void 0 && (e = 0), n === void 0 && (n = 0), t === void 0 && (t = !1), new Tg((t ? n : e) || 0, (t ? e : n) || 0)
    },
    zi = kt({
        devicePixelContentBoxSize: Rt(),
        borderBoxSize: Rt(),
        contentBoxSize: Rt(),
        contentRect: new aa(0, 0, 0, 0)
    }),
    ca = function(e, n) {
        if (n === void 0 && (n = !1), Zn.has(e) && !n) return Zn.get(e);
        if (la(e)) return Zn.set(e, zi), zi;
        var t = getComputedStyle(e),
            o = yo(e) && e.ownerSVGElement && e.getBBox(),
            i = !Ig && t.boxSizing === "border-box",
            s = $g.test(t.writingMode || ""),
            l = !o && Ni.test(t.overflowY || ""),
            c = !o && Ni.test(t.overflowX || ""),
            u = o ? 0 : Le(t.paddingTop),
            f = o ? 0 : Le(t.paddingRight),
            p = o ? 0 : Le(t.paddingBottom),
            r = o ? 0 : Le(t.paddingLeft),
            a = o ? 0 : Le(t.borderTopWidth),
            d = o ? 0 : Le(t.borderRightWidth),
            v = o ? 0 : Le(t.borderBottomWidth),
            g = o ? 0 : Le(t.borderLeftWidth),
            m = r + f,
            h = u + p,
            y = g + d,
            w = a + v,
            b = c ? e.offsetHeight - w - e.clientHeight : 0,
            P = l ? e.offsetWidth - y - e.clientWidth : 0,
            z = i ? m + y : 0,
            Y = i ? h + w : 0,
            j = o ? o.width : Le(t.width) - z - P,
            B = o ? o.height : Le(t.height) - Y - b,
            V = j + m + P + y,
            L = B + h + b + w,
            K = kt({
                devicePixelContentBoxSize: Rt(Math.round(j * devicePixelRatio), Math.round(B * devicePixelRatio), s),
                borderBoxSize: Rt(V, L, s),
                contentBoxSize: Rt(j, B, s),
                contentRect: new aa(r, u, j, B)
            });
        return Zn.set(e, K), K
    },
    ua = function(e, n, t) {
        var o = ca(e, t),
            i = o.borderBoxSize,
            s = o.contentBoxSize,
            l = o.devicePixelContentBoxSize;
        switch (n) {
            case hn.DEVICE_PIXEL_CONTENT_BOX:
                return l;
            case hn.BORDER_BOX:
                return i;
            default:
                return s
        }
    },
    Pg = function() {
        function e(n) {
            var t = ca(n);
            this.target = n, this.contentRect = t.contentRect, this.borderBoxSize = kt([t.borderBoxSize]), this.contentBoxSize = kt([t.contentBoxSize]), this.devicePixelContentBoxSize = kt([t.devicePixelContentBoxSize])
        }
        return e
    }(),
    fa = function(e) {
        if (la(e)) return 1 / 0;
        for (var n = 0, t = e.parentNode; t;) n += 1, t = t.parentNode;
        return n
    },
    Og = function() {
        var e = 1 / 0,
            n = [];
        Tt.forEach(function(l) {
            if (l.activeTargets.length !== 0) {
                var c = [];
                l.activeTargets.forEach(function(f) {
                    var p = new Pg(f.target),
                        r = fa(f.target);
                    c.push(p), f.lastReportedSize = ua(f.target, f.observedBox), r < e && (e = r)
                }), n.push(function() {
                    l.callback.call(l.observer, c, l.observer)
                }), l.activeTargets.splice(0, l.activeTargets.length)
            }
        });
        for (var t = 0, o = n; t < o.length; t++) {
            var i = o[t];
            i()
        }
        return e
    },
    Ui = function(e) {
        Tt.forEach(function(t) {
            t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function(i) {
                i.isActive() && (fa(i.target) > e ? t.activeTargets.push(i) : t.skippedTargets.push(i))
            })
        })
    },
    Eg = function() {
        var e = 0;
        for (Ui(e); Ag();) e = Og(), Ui(e);
        return xg() && Sg(), e > 0
    },
    Nr, da = [],
    Dg = function() {
        return da.splice(0).forEach(function(e) {
            return e()
        })
    },
    Cg = function(e) {
        if (!Nr) {
            var n = 0,
                t = document.createTextNode(""),
                o = {
                    characterData: !0
                };
            new MutationObserver(function() {
                return Dg()
            }).observe(t, o), Nr = function() {
                t.textContent = "".concat(n ? n-- : n++)
            }
        }
        da.push(e), Nr()
    },
    Mg = function(e) {
        Cg(function() {
            requestAnimationFrame(e)
        })
    },
    Kn = 0,
    Bg = function() {
        return !!Kn
    },
    jg = 250,
    Lg = {
        attributes: !0,
        characterData: !0,
        childList: !0,
        subtree: !0
    },
    Hi = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"],
    Fi = function(e) {
        return e === void 0 && (e = 0), Date.now() + e
    },
    zr = !1,
    Rg = function() {
        function e() {
            var n = this;
            this.stopped = !0, this.listener = function() {
                return n.schedule()
            }
        }
        return e.prototype.run = function(n) {
            var t = this;
            if (n === void 0 && (n = jg), !zr) {
                zr = !0;
                var o = Fi(n);
                Mg(function() {
                    var i = !1;
                    try {
                        i = Eg()
                    } finally {
                        if (zr = !1, n = o - Fi(), !Bg()) return;
                        i ? t.run(1e3) : n > 0 ? t.run(n) : t.start()
                    }
                })
            }
        }, e.prototype.schedule = function() {
            this.stop(), this.run()
        }, e.prototype.observe = function() {
            var n = this,
                t = function() {
                    return n.observer && n.observer.observe(document.body, Lg)
                };
            document.body ? t() : ln.addEventListener("DOMContentLoaded", t)
        }, e.prototype.start = function() {
            var n = this;
            this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Hi.forEach(function(t) {
                return ln.addEventListener(t, n.listener, !0)
            }))
        }, e.prototype.stop = function() {
            var n = this;
            this.stopped || (this.observer && this.observer.disconnect(), Hi.forEach(function(t) {
                return ln.removeEventListener(t, n.listener, !0)
            }), this.stopped = !0)
        }, e
    }(),
    io = new Rg,
    Gi = function(e) {
        !Kn && e > 0 && io.start(), Kn += e, !Kn && io.stop()
    },
    Vg = function(e) {
        return !yo(e) && !kg(e) && getComputedStyle(e).display === "inline"
    },
    Ng = function() {
        function e(n, t) {
            this.target = n, this.observedBox = t || hn.CONTENT_BOX, this.lastReportedSize = {
                inlineSize: 0,
                blockSize: 0
            }
        }
        return e.prototype.isActive = function() {
            var n = ua(this.target, this.observedBox, !0);
            return Vg(this.target) && (this.lastReportedSize = n), this.lastReportedSize.inlineSize !== n.inlineSize || this.lastReportedSize.blockSize !== n.blockSize
        }, e
    }(),
    zg = function() {
        function e(n, t) {
            this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = n, this.callback = t
        }
        return e
    }(),
    Yn = new WeakMap,
    Zi = function(e, n) {
        for (var t = 0; t < e.length; t += 1)
            if (e[t].target === n) return t;
        return -1
    },
    Wn = function() {
        function e() {}
        return e.connect = function(n, t) {
            var o = new zg(n, t);
            Yn.set(n, o)
        }, e.observe = function(n, t, o) {
            var i = Yn.get(n),
                s = i.observationTargets.length === 0;
            Zi(i.observationTargets, t) < 0 && (s && Tt.push(i), i.observationTargets.push(new Ng(t, o && o.box)), Gi(1), io.schedule())
        }, e.unobserve = function(n, t) {
            var o = Yn.get(n),
                i = Zi(o.observationTargets, t),
                s = o.observationTargets.length === 1;
            i >= 0 && (s && Tt.splice(Tt.indexOf(o), 1), o.observationTargets.splice(i, 1), Gi(-1))
        }, e.disconnect = function(n) {
            var t = this,
                o = Yn.get(n);
            o.observationTargets.slice().forEach(function(i) {
                return t.unobserve(n, i.target)
            }), o.activeTargets.splice(0, o.activeTargets.length)
        }, e
    }(),
    Ug = function() {
        function e(n) {
            if (arguments.length === 0) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
            if (typeof n != "function") throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
            Wn.connect(this, n)
        }
        return e.prototype.observe = function(n, t) {
            if (arguments.length === 0) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!Vi(n)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
            Wn.observe(this, n, t)
        }, e.prototype.unobserve = function(n) {
            if (arguments.length === 0) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!Vi(n)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
            Wn.unobserve(this, n)
        }, e.prototype.disconnect = function() {
            Wn.disconnect(this)
        }, e.toString = function() {
            return "function ResizeObserver () { [polyfill code] }"
        }, e
    }();
const Hg = () => {
        "ResizeObserver" in window || (window.ResizeObserver = Ug)
    },
    Fg = {
        setup: Hg
    },
    Gg = N('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>No</span></button><button><span>Yes'),
    Yi = wn(["relative px-144 py-2", An({
        size: "terminal-sm"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light border"
            }
        }
    }),
    Zg = e => S(cr, {
        get isOpen() {
            return e.isOpen
        },
        get children() {
            return S(Yg, {
                onExit: () => {
                    window.location.href = "brawlstars-inbox://closeView"
                },
                get onClose() {
                    return e.onClose
                }
            })
        }
    }),
    Yg = e => {
        const [n, t] = W();
        let o;
        const i = s => {
            t(s), clearTimeout(o), o = setTimeout(() => {
                s === "confirm" ? e.onExit() : e.onClose()
            }, 1e3)
        };
        return (() => {
            const s = Gg(),
                l = s.firstChild,
                c = l.firstChild,
                u = c.nextSibling,
                f = u.firstChild,
                p = f.firstChild,
                r = p.firstChild,
                a = r.nextSibling;
            return D(c, S(ie, {
                size: "terminal-md",
                children: "STARR PARK SECURITY"
            })), D(f, S(ie, {
                size: "terminal-md",
                class: "text-purple",
                children: "Are you sure you want to exit?"
            }), p), r.$$click = () => i("cancel"), a.$$click = () => i("confirm"), X(d => {
                const v = Yi({
                        selected: n() === "cancel"
                    }),
                    g = Yi({
                        selected: n() === "confirm"
                    });
                return v !== d._v$ && te(r, d._v$ = v), g !== d._v$2 && te(a, d._v$2 = g), d
            }, {
                _v$: void 0,
                _v$2: void 0
            }), s
        })()
    };
$e(["click"]);
const Wg = N('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>Exit</span></button><button><span>Continue'),
    Wi = wn(["relative px-96 py-2", An({
        size: "terminal-sm"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light border"
            }
        }
    }),
    qg = () => {
        const e = gs("skip-data-usage-warning");
        return S(cr, {
            get isOpen() {
                return !Ze.dataUsageWarningDialog.accepted() && e !== "true"
            },
            get children() {
                return S(Qg, {
                    onExit: () => {
                        window.location.href = "brawlstars-inbox://closeView"
                    },
                    onClose: () => {
                        Ze.dataUsageWarningDialog.setAccepted()
                    }
                })
            }
        })
    },
    Qg = e => {
        const [n, t] = W();
        let o;
        const i = s => {
            t(s), clearTimeout(o), o = setTimeout(() => {
                s === "exit" ? e.onExit() : e.onClose()
            }, 1e3)
        };
        return (() => {
            const s = Wg(),
                l = s.firstChild,
                c = l.firstChild,
                u = c.nextSibling,
                f = u.firstChild,
                p = f.firstChild,
                r = p.firstChild,
                a = r.nextSibling;
            return D(c, S(ie, {
                size: "terminal-md",
                children: "STARR PARK SECURITY"
            })), D(f, S(ie, {
                size: "terminal-sm",
                class: "text-purple whitespace-pre-wrap",
                get children() {
                    return ["This website features live video content, which can consume a significant amount of data.", "\n", "If you're using a limited data plan or have concerns about data usage, we recommend switching to a Wi-Fi network."]
                }
            }), p), r.$$click = () => i("exit"), a.$$click = () => i("continue"), X(d => {
                const v = Wi({
                        selected: n() === "exit"
                    }),
                    g = Wi({
                        selected: n() === "continue"
                    });
                return v !== d._v$ && te(r, d._v$ = v), g !== d._v$2 && te(a, d._v$2 = g), d
            }, {
                _v$: void 0,
                _v$2: void 0
            }), s
        })()
    };
$e(["click"]);
const Kg = N('<button class="absolute top-20 left-20 w-100 h-100 flex-center">'),
    Jg = N('<button class="absolute top-20 right-20 w-100 h-100 flex-center text-purple">'),
    Xg = N('<div class="wh-full"><div class="portrait:hidden absolute origin-top-left overflow-hidden"></div><div class="landscape:hidden portrait:flex wh-full flex-center"><div class="font-medium whitespace-nowrap">Portrait mode is not supported.'),
    ev = N('<div class="absolute bottom-0 left-0 w-256">');
Fg.setup();
const Ur = {
        width: 2250,
        height: 1170
    },
    tv = () => {
        const [e, n] = W(!1);
        let t;
        mn(() => {
            ot.init(), ne.init(), ne.setupActivityTracking(), ne.trackPageView()
        }), pe(() => {
            if (he.Supervisor.allEnded()) {
                const c = he.Supervisor.currentFeed(),
                    f = !!(c != null && c.archivePlaylist) && c.source;
                f && we.currentOpenApp.mainApp === null && we.openApp(f), he.Supervisor.dispatch("go-live")
            }
        });
        const [o, i] = W(void 0), s = mg({
            containerRef: o,
            bgImageSize: Ur,
            fit: "contain"
        }), l = at([gg, pg], {
            sprite: {
                "archive-tape-load": [0, 3016.6666666666665],
                "logbook-close": [5e3, 382.6530612244898],
                "logbook-open": [7e3, 1133.3333333333328],
                "screen-tap-1": [1e4, 133.33333333333286],
                "screen-tap-2": [12e3, 133.33333333333286],
                "screen-tap-3": [14e3, 133.33333333333286],
                "terminal-open": [16e3, 3028.412698412698]
            }
        });
        return [(() => {
            const c = Xg(),
                u = c.firstChild;
            return Ee(i, c), D(u, S(wg, {
                onLoaded: () => ot.onVideoTransitionLoaded(),
                onEnded: () => ot.onVideoTransitionEnd()
            }), null), D(u, S(Ve, {
                get when() {
                    return ot.currentStatus() >= Ut["video-transition"]
                },
                get children() {
                    return S(_p, {
                        roomSound: l
                    })
                }
            }), null), D(u, S(Ve, {
                get when() {
                    return ot.currentStatus() === Ut.done
                },
                get children() {
                    return [(() => {
                        const f = Kg();
                        return f.$$click = () => n(!0), D(f, S(ie, {
                            size: "terminal-lg",
                            class: "text-green leading-none inline-block pb-16",
                            children: "х"
                        })), f
                    })(), (() => {
                        const f = Jg();
                        return f.$$click = () => {
                            ne.trackClickEvent("instructions-modal", St.options.muted ? "sound-on" : "sound-off", "cctv-room"), St.toggleMute()
                        }, D(f, S(_t, {
                            get name() {
                                return St.options.muted ? "mute" : "unmute"
                            },
                            class: "w-72"
                        })), f
                    })(), S(dg, {
                        onPlaylistLoad: () => l.play("archive-tape-load")
                    }), S(Tp, {
                        onClose: () => l.play("logbook-close")
                    }), S(qg, {})]
                }
            }), null), D(u, S(Zg, {
                get isOpen() {
                    return e()
                },
                onClose: () => n(!1)
            }), null), X(f => {
                const p = "".concat(Ur.height, "px"),
                    r = "".concat(Ur.width, "px"),
                    a = "translate(".concat(s.position().x, "px, ").concat(s.position().y, "px) scale(").concat(s.scaleFactor(), ")");
                return p !== f._v$ && ((f._v$ = p) != null ? u.style.setProperty("height", p) : u.style.removeProperty("height")), r !== f._v$2 && ((f._v$2 = r) != null ? u.style.setProperty("width", r) : u.style.removeProperty("width")), a !== f._v$3 && ((f._v$3 = a) != null ? u.style.setProperty("transform", a) : u.style.removeProperty("transform")), f
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }), c
        })(), (() => {
            const c = ev(),
                u = t;
            return typeof u == "function" ? Ee(u, c) : t = c, c
        })()]
    };
$e(["click"]);
cl(() => S(tv, {}), document.getElementById("root"));
export {
    yn as a, He as c, rv as g
};