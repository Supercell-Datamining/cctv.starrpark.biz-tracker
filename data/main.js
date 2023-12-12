var La = Object.defineProperty,
    Ra = Object.defineProperties;
var Va = Object.getOwnPropertyDescriptors;
var Rn = Object.getOwnPropertySymbols;
var qo = Object.prototype.hasOwnProperty,
    Ko = Object.prototype.propertyIsEnumerable;
var kr = (e, n, t) => n in e ? La(e, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[n] = t,
    ye = (e, n) => {
        for (var t in n || (n = {})) qo.call(n, t) && kr(e, t, n[t]);
        if (Rn)
            for (var t of Rn(n)) Ko.call(n, t) && kr(e, t, n[t]);
        return e
    },
    mt = (e, n) => Ra(e, Va(n));
var Qo = (e, n) => {
    var t = {};
    for (var r in e) qo.call(e, r) && n.indexOf(r) < 0 && (t[r] = e[r]);
    if (e != null && Rn)
        for (var r of Rn(e)) n.indexOf(r) < 0 && Ko.call(e, r) && (t[r] = e[r]);
    return t
};
var Jo = (e, n, t) => (kr(e, typeof n != "symbol" ? n + "" : n, t), t);
(function() {
    const n = document.createElement("link").relList;
    if (n && n.supports && n.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
    new MutationObserver(i => {
        for (const s of i)
            if (s.type === "childList")
                for (const l of s.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && r(l)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function t(i) {
        const s = {};
        return i.integrity && (s.integrity = i.integrity), i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? s.credentials = "include" : i.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s
    }

    function r(i) {
        if (i.ep) return;
        i.ep = !0;
        const s = t(i);
        fetch(i.href, s)
    }
})();
const za = {
        context: void 0,
        registry: void 0
    },
    Na = (e, n) => e === n,
    Be = Symbol("solid-proxy"),
    Gr = Symbol("solid-track"),
    Ha = Symbol("solid-dev-component"),
    Xn = {
        equals: Na
    };
let Qi = rs;
const dt = 1,
    er = 2,
    Ji = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var ee = null;
let Tr = null,
    le = null,
    me = null,
    We = null,
    ar = 0;

function Kn(e, n) {
    const t = le,
        r = ee,
        i = e.length === 0,
        s = n === void 0 ? r : n,
        l = i ? Ji : {
            owned: null,
            cleanups: null,
            context: s ? s.context : null,
            owner: s
        },
        u = i ? e : () => e(() => fe(() => cr(l)));
    ee = l, le = null;
    try {
        return Zt(u, !0)
    } finally {
        le = t, ee = r
    }
}

function Y(e, n) {
    n = n ? Object.assign({}, Xn, n) : Xn;
    const t = {
            value: e,
            observers: null,
            observerSlots: null,
            comparator: n.equals || void 0
        },
        r = i => (typeof i == "function" && (i = i(t.value)), ns(t, i));
    return [ts.bind(t), r]
}

function Q(e, n, t) {
    const r = lo(e, n, !1, dt);
    _n(r)
}

function ge(e, n, t) {
    Qi = Wa;
    const r = lo(e, n, !1, dt),
        i = Xo && Xi(Xo);
    i && (r.suspense = i), (!t || !t.render) && (r.user = !0), We ? We.push(r) : _n(r)
}

function xe(e, n, t) {
    t = t ? Object.assign({}, Xn, t) : Xn;
    const r = lo(e, n, !0, 0);
    return r.observers = null, r.observerSlots = null, r.comparator = t.equals || void 0, _n(r), ts.bind(r)
}

function lr(e) {
    return Zt(e, !1)
}

function fe(e) {
    if (le === null) return e();
    const n = le;
    le = null;
    try {
        return e()
    } finally {
        le = n
    }
}

function Ua(e, n, t) {
    const r = Array.isArray(e);
    let i, s = t && t.defer;
    return l => {
        let u;
        if (r) {
            u = Array(e.length);
            for (let d = 0; d < e.length; d++) u[d] = e[d]()
        } else u = e();
        if (s) {
            s = !1;
            return
        }
        const c = fe(() => n(u, i, l));
        return i = u, c
    }
}

function Gt(e) {
    ge(() => fe(e))
}

function Ae(e) {
    return ee === null || (ee.cleanups === null ? ee.cleanups = [e] : ee.cleanups.push(e)), e
}

function tr() {
    return le
}

function Fa(e, n) {
    const t = Symbol("context");
    return {
        id: t,
        Provider: qa(t),
        defaultValue: e
    }
}

function Xi(e) {
    return ee && ee.context && ee.context[e.id] !== void 0 ? ee.context[e.id] : e.defaultValue
}

function es(e) {
    const n = xe(e),
        t = xe(() => Zr(n()));
    return t.toArray = () => {
        const r = t();
        return Array.isArray(r) ? r : r != null ? [r] : []
    }, t
}
let Xo;

function ts() {
    if (this.sources && this.state)
        if (this.state === dt) _n(this);
        else {
            const e = me;
            me = null, Zt(() => rr(this), !1), me = e
        } if (le) {
        const e = this.observers ? this.observers.length : 0;
        le.sources ? (le.sources.push(this), le.sourceSlots.push(e)) : (le.sources = [this], le.sourceSlots = [e]), this.observers ? (this.observers.push(le), this.observerSlots.push(le.sources.length - 1)) : (this.observers = [le], this.observerSlots = [le.sources.length - 1])
    }
    return this.value
}

function ns(e, n, t) {
    let r = e.value;
    return (!e.comparator || !e.comparator(r, n)) && (e.value = n, e.observers && e.observers.length && Zt(() => {
        for (let i = 0; i < e.observers.length; i += 1) {
            const s = e.observers[i],
                l = Tr && Tr.running;
            l && Tr.disposed.has(s), (l ? !s.tState : !s.state) && (s.pure ? me.push(s) : We.push(s), s.observers && os(s)), l || (s.state = dt)
        }
        if (me.length > 1e6) throw me = [], new Error
    }, !1)), n
}

function _n(e) {
    if (!e.fn) return;
    cr(e);
    const n = ee,
        t = le,
        r = ar;
    le = ee = e, Ga(e, e.value, r), le = t, ee = n
}

function Ga(e, n, t) {
    let r;
    try {
        r = e.fn(n)
    } catch (i) {
        return e.pure && (e.state = dt, e.owned && e.owned.forEach(cr), e.owned = null), e.updatedAt = t + 1, is(i)
    }(!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? ns(e, r) : e.value = r, e.updatedAt = t)
}

function lo(e, n, t, r = dt, i) {
    const s = {
        fn: e,
        state: r,
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
    return ee === null || ee !== Ji && (ee.owned ? ee.owned.push(s) : ee.owned = [s]), s
}

function nr(e) {
    if (e.state === 0) return;
    if (e.state === er) return rr(e);
    if (e.suspense && fe(e.suspense.inFallback)) return e.suspense.effects.push(e);
    const n = [e];
    for (;
        (e = e.owner) && (!e.updatedAt || e.updatedAt < ar);) e.state && n.push(e);
    for (let t = n.length - 1; t >= 0; t--)
        if (e = n[t], e.state === dt) _n(e);
        else if (e.state === er) {
        const r = me;
        me = null, Zt(() => rr(e, n[0]), !1), me = r
    }
}

function Zt(e, n) {
    if (me) return e();
    let t = !1;
    n || (me = []), We ? t = !0 : We = [], ar++;
    try {
        const r = e();
        return Za(t), r
    } catch (r) {
        t || (We = null), me = null, is(r)
    }
}

function Za(e) {
    if (me && (rs(me), me = null), e) return;
    const n = We;
    We = null, n.length && Zt(() => Qi(n), !1)
}

function rs(e) {
    for (let n = 0; n < e.length; n++) nr(e[n])
}

function Wa(e) {
    let n, t = 0;
    for (n = 0; n < e.length; n++) {
        const r = e[n];
        r.user ? e[t++] = r : nr(r)
    }
    for (n = 0; n < t; n++) nr(e[n])
}

function rr(e, n) {
    e.state = 0;
    for (let t = 0; t < e.sources.length; t += 1) {
        const r = e.sources[t];
        if (r.sources) {
            const i = r.state;
            i === dt ? r !== n && (!r.updatedAt || r.updatedAt < ar) && nr(r) : i === er && rr(r, n)
        }
    }
}

function os(e) {
    for (let n = 0; n < e.observers.length; n += 1) {
        const t = e.observers[n];
        t.state || (t.state = er, t.pure ? me.push(t) : We.push(t), t.observers && os(t))
    }
}

function cr(e) {
    let n;
    if (e.sources)
        for (; e.sources.length;) {
            const t = e.sources.pop(),
                r = e.sourceSlots.pop(),
                i = t.observers;
            if (i && i.length) {
                const s = i.pop(),
                    l = t.observerSlots.pop();
                r < i.length && (s.sourceSlots[l] = r, i[r] = s, t.observerSlots[r] = l)
            }
        }
    if (e.owned) {
        for (n = e.owned.length - 1; n >= 0; n--) cr(e.owned[n]);
        e.owned = null
    }
    if (e.cleanups) {
        for (n = e.cleanups.length - 1; n >= 0; n--) e.cleanups[n]();
        e.cleanups = null
    }
    e.state = 0
}

function Ya(e) {
    return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
        cause: e
    })
}

function is(e, n = ee) {
    throw Ya(e)
}

function Zr(e) {
    if (typeof e == "function" && !e.length) return Zr(e());
    if (Array.isArray(e)) {
        const n = [];
        for (let t = 0; t < e.length; t++) {
            const r = Zr(e[t]);
            Array.isArray(r) ? n.push.apply(n, r) : n.push(r)
        }
        return n
    }
    return e
}

function qa(e, n) {
    return function(r) {
        let i;
        return Q(() => i = fe(() => (ee.context = mt(ye({}, ee.context), {
            [e]: r.value
        }), es(() => r.children))), void 0), i
    }
}
const Ka = Symbol("fallback");

function ei(e) {
    for (let n = 0; n < e.length; n++) e[n]()
}

function Qa(e, n, t = {}) {
    let r = [],
        i = [],
        s = [],
        l = 0,
        u = n.length > 1 ? [] : null;
    return Ae(() => ei(s)), () => {
        let c = e() || [],
            d, p;
        return c[Gr], fe(() => {
            let a = c.length,
                f, v, g, m, h, y, w, b, P;
            if (a === 0) l !== 0 && (ei(s), s = [], r = [], i = [], l = 0, u && (u = [])), t.fallback && (r = [Ka], i[0] = Kn(H => (s[0] = H, t.fallback())), l = 1);
            else if (l === 0) {
                for (i = new Array(a), p = 0; p < a; p++) r[p] = c[p], i[p] = Kn(o);
                l = a
            } else {
                for (g = new Array(a), m = new Array(a), u && (h = new Array(a)), y = 0, w = Math.min(l, a); y < w && r[y] === c[y]; y++);
                for (w = l - 1, b = a - 1; w >= y && b >= y && r[w] === c[b]; w--, b--) g[b] = i[w], m[b] = s[w], u && (h[b] = u[w]);
                for (f = new Map, v = new Array(b + 1), p = b; p >= y; p--) P = c[p], d = f.get(P), v[p] = d === void 0 ? -1 : d, f.set(P, p);
                for (d = y; d <= w; d++) P = r[d], p = f.get(P), p !== void 0 && p !== -1 ? (g[p] = i[d], m[p] = s[d], u && (h[p] = u[d]), p = v[p], f.set(P, p)) : s[d]();
                for (p = y; p < a; p++) p in g ? (i[p] = g[p], s[p] = m[p], u && (u[p] = h[p], u[p](p))) : i[p] = Kn(o);
                i = i.slice(0, l = a), r = c.slice(0)
            }
            return i
        });

        function o(a) {
            if (s[p] = a, u) {
                const [f, v] = Y(p);
                return u[p] = v, n(c[p], f)
            }
            return n(c[p])
        }
    }
}

function S(e, n) {
    return fe(() => e(n || {}))
}

function Vn() {
    return !0
}
const Wr = {
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

function $r(e) {
    return (e = typeof e == "function" ? e() : e) ? e : {}
}

function Ja() {
    for (let e = 0, n = this.length; e < n; ++e) {
        const t = this[e]();
        if (t !== void 0) return t
    }
}

function Xa(...e) {
    let n = !1;
    for (let s = 0; s < e.length; s++) {
        const l = e[s];
        n = n || !!l && Be in l, e[s] = typeof l == "function" ? (n = !0, xe(l)) : l
    }
    if (n) return new Proxy({
        get(s) {
            for (let l = e.length - 1; l >= 0; l--) {
                const u = $r(e[l])[s];
                if (u !== void 0) return u
            }
        },
        has(s) {
            for (let l = e.length - 1; l >= 0; l--)
                if (s in $r(e[l])) return !0;
            return !1
        },
        keys() {
            const s = [];
            for (let l = 0; l < e.length; l++) s.push(...Object.keys($r(e[l])));
            return [...new Set(s)]
        }
    }, Wr);
    const t = {},
        r = {},
        i = new Set;
    for (let s = e.length - 1; s >= 0; s--) {
        const l = e[s];
        if (!l) continue;
        const u = Object.getOwnPropertyNames(l);
        for (let c = 0, d = u.length; c < d; c++) {
            const p = u[c];
            if (p === "__proto__" || p === "constructor") continue;
            const o = Object.getOwnPropertyDescriptor(l, p);
            if (!i.has(p)) o.get ? (i.add(p), Object.defineProperty(t, p, {
                enumerable: !0,
                configurable: !0,
                get: Ja.bind(r[p] = [o.get.bind(l)])
            })) : (o.value !== void 0 && i.add(p), t[p] = o.value);
            else {
                const a = r[p];
                a ? o.get ? a.push(o.get.bind(l)) : o.value !== void 0 && a.push(() => o.value) : t[p] === void 0 && (t[p] = o.value)
            }
        }
    }
    return t
}

function co(e, ...n) {
    if (Be in e) {
        const i = new Set(n.length > 1 ? n.flat() : n[0]),
            s = n.map(l => new Proxy({
                get(u) {
                    return l.includes(u) ? e[u] : void 0
                },
                has(u) {
                    return l.includes(u) && u in e
                },
                keys() {
                    return l.filter(u => u in e)
                }
            }, Wr));
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
        }, Wr)), s
    }
    const t = {},
        r = n.map(() => ({}));
    for (const i of Object.getOwnPropertyNames(e)) {
        const s = Object.getOwnPropertyDescriptor(e, i),
            l = !s.get && !s.set && s.enumerable && s.writable && s.configurable;
        let u = !1,
            c = 0;
        for (const d of n) d.includes(i) && (u = !0, l ? r[c][i] = s.value : Object.defineProperty(r[c], i, s)), ++c;
        u || (l ? t[i] = s.value : Object.defineProperty(t, i, s))
    }
    return [...r, t]
}
let el = 0;

function ss() {
    const e = za.context;
    return e ? "".concat(e.id).concat(e.count++) : "cl-".concat(el++)
}
const as = e => "Stale read from <".concat(e, ">.");

function uo(e) {
    const n = "fallback" in e && {
        fallback: () => e.fallback
    };
    return xe(Qa(() => e.each, e.children, n || void 0))
}

function Le(e) {
    const n = e.keyed,
        t = xe(() => e.when, void 0, {
            equals: (r, i) => n ? r === i : !r == !i
        });
    return xe(() => {
        const r = t();
        if (r) {
            const i = e.children;
            return typeof i == "function" && i.length > 0 ? fe(() => i(n ? r : () => {
                if (!fe(t)) throw as("Show");
                return e.when
            })) : i
        }
        return e.fallback
    }, void 0, void 0)
}

function ls(e) {
    let n = !1;
    const t = (s, l) => s[0] === l[0] && (n ? s[1] === l[1] : !s[1] == !l[1]) && s[2] === l[2],
        r = es(() => e.children),
        i = xe(() => {
            let s = r();
            Array.isArray(s) || (s = [s]);
            for (let l = 0; l < s.length; l++) {
                const u = s[l].when;
                if (u) return n = !!s[l].keyed, [l, u, s[l]]
            }
            return [-1]
        }, void 0, {
            equals: t
        });
    return xe(() => {
        const [s, l, u] = i();
        if (s < 0) return e.fallback;
        const c = u.children;
        return typeof c == "function" && c.length > 0 ? fe(() => c(n ? l : () => {
            if (fe(i)[0] !== s) throw as("Match");
            return u.when
        })) : c
    }, void 0, void 0)
}

function jt(e) {
    return e
}
const tl = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"],
    nl = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...tl]),
    rl = new Set(["innerHTML", "textContent", "innerText", "children"]),
    ol = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    }),
    il = Object.assign(Object.create(null), {
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

function sl(e, n) {
    const t = il[e];
    return typeof t == "object" ? t[n] ? t.$ : void 0 : t
}
const al = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
    ll = new Set(["altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use", "view", "vkern"]),
    cl = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };

function ul(e, n, t) {
    let r = t.length,
        i = n.length,
        s = r,
        l = 0,
        u = 0,
        c = n[i - 1].nextSibling,
        d = null;
    for (; l < i || u < s;) {
        if (n[l] === t[u]) {
            l++, u++;
            continue
        }
        for (; n[i - 1] === t[s - 1];) i--, s--;
        if (i === l) {
            const p = s < r ? u ? t[u - 1].nextSibling : t[s - u] : c;
            for (; u < s;) e.insertBefore(t[u++], p)
        } else if (s === u)
            for (; l < i;)(!d || !d.has(n[l])) && n[l].remove(), l++;
        else if (n[l] === t[s - 1] && t[u] === n[i - 1]) {
            const p = n[--i].nextSibling;
            e.insertBefore(t[u++], n[l++].nextSibling), e.insertBefore(t[--s], p), n[i] = t[s]
        } else {
            if (!d) {
                d = new Map;
                let o = u;
                for (; o < s;) d.set(t[o], o++)
            }
            const p = d.get(n[l]);
            if (p != null)
                if (u < p && p < s) {
                    let o = l,
                        a = 1,
                        f;
                    for (; ++o < i && o < s && !((f = d.get(n[o])) == null || f !== p + a);) a++;
                    if (a > p - u) {
                        const v = n[l];
                        for (; u < p;) e.insertBefore(t[u++], v)
                    } else e.replaceChild(t[u++], n[l++])
                } else l++;
            else n[l++].remove()
        }
    }
}
const ti = "_$DX_DELEGATE";

function fl(e, n, t, r = {}) {
    let i;
    return Kn(s => {
        i = s, n === document ? e() : C(n, e(), n.firstChild ? null : void 0, t)
    }, r.owner), () => {
        i(), n.textContent = ""
    }
}

function V(e, n, t) {
    let r;
    const i = () => {
            const l = document.createElement("template");
            return l.innerHTML = e, t ? l.content.firstChild.firstChild : l.content.firstChild
        },
        s = n ? () => fe(() => document.importNode(r || (r = i()), !0)) : () => (r || (r = i())).cloneNode(!0);
    return s.cloneNode = s, s
}

function Ie(e, n = window.document) {
    const t = n[ti] || (n[ti] = new Set);
    for (let r = 0, i = e.length; r < i; r++) {
        const s = e[r];
        t.has(s) || (t.add(s), n.addEventListener(s, _l))
    }
}

function oe(e, n, t) {
    t == null ? e.removeAttribute(n) : e.setAttribute(n, t)
}

function dl(e, n, t, r) {
    r == null ? e.removeAttributeNS(n, t) : e.setAttributeNS(n, t, r)
}

function te(e, n) {
    n == null ? e.removeAttribute("class") : e.className = n
}

function pl(e, n, t, r) {
    if (r) Array.isArray(t) ? (e["$$".concat(n)] = t[0], e["$$".concat(n, "Data")] = t[1]) : e["$$".concat(n)] = t;
    else if (Array.isArray(t)) {
        const i = t[0];
        e.addEventListener(n, t[0] = s => i.call(e, t[1], s))
    } else e.addEventListener(n, t)
}

function gl(e, n, t = {}) {
    const r = Object.keys(n || {}),
        i = Object.keys(t);
    let s, l;
    for (s = 0, l = i.length; s < l; s++) {
        const u = i[s];
        !u || u === "undefined" || n[u] || (ni(e, u, !1), delete t[u])
    }
    for (s = 0, l = r.length; s < l; s++) {
        const u = r[s],
            c = !!n[u];
        !u || u === "undefined" || t[u] === c || !c || (ni(e, u, !0), t[u] = c)
    }
    return t
}

function vl(e, n, t) {
    if (!n) return t ? oe(e, "style") : n;
    const r = e.style;
    if (typeof n == "string") return r.cssText = n;
    typeof t == "string" && (r.cssText = t = void 0), t || (t = {}), n || (n = {});
    let i, s;
    for (s in t) n[s] == null && r.removeProperty(s), delete t[s];
    for (s in n) i = n[s], i !== t[s] && (r.setProperty(s, i), t[s] = i);
    return t
}

function Ke(e, n = {}, t, r) {
    const i = {};
    return r || Q(() => i.children = zt(e, n.children, i.children)), Q(() => n.ref && n.ref(e)), Q(() => hl(e, n, t, !0, i, !0)), i
}

function $e(e, n, t) {
    return fe(() => e(n, t))
}

function C(e, n, t, r) {
    if (t !== void 0 && !r && (r = []), typeof n != "function") return zt(e, n, r, t);
    Q(i => zt(e, n(), i, t), r)
}

function hl(e, n, t, r, i = {}, s = !1) {
    n || (n = {});
    for (const l in i)
        if (!(l in n)) {
            if (l === "children") continue;
            i[l] = ri(e, l, null, i[l], t, s)
        } for (const l in n) {
        if (l === "children") {
            r || zt(e, n.children);
            continue
        }
        const u = n[l];
        i[l] = ri(e, l, u, i[l], t, s)
    }
}

function ml(e) {
    return e.toLowerCase().replace(/-([a-z])/g, (n, t) => t.toUpperCase())
}

function ni(e, n, t) {
    const r = n.trim().split(/\s+/);
    for (let i = 0, s = r.length; i < s; i++) e.classList.toggle(r[i], t)
}

function ri(e, n, t, r, i, s) {
    let l, u, c, d, p;
    if (n === "style") return vl(e, t, r);
    if (n === "classList") return gl(e, t, r);
    if (t === r) return r;
    if (n === "ref") s || t(e);
    else if (n.slice(0, 3) === "on:") {
        const o = n.slice(3);
        r && e.removeEventListener(o, r), t && e.addEventListener(o, t)
    } else if (n.slice(0, 10) === "oncapture:") {
        const o = n.slice(10);
        r && e.removeEventListener(o, r, !0), t && e.addEventListener(o, t, !0)
    } else if (n.slice(0, 2) === "on") {
        const o = n.slice(2).toLowerCase(),
            a = al.has(o);
        if (!a && r) {
            const f = Array.isArray(r) ? r[0] : r;
            e.removeEventListener(o, f)
        }(a || t) && (pl(e, o, t, a), a && Ie([o]))
    } else if (n.slice(0, 5) === "attr:") oe(e, n.slice(5), t);
    else if ((p = n.slice(0, 5) === "prop:") || (c = rl.has(n)) || !i && ((d = sl(n, e.tagName)) || (u = nl.has(n))) || (l = e.nodeName.includes("-"))) p && (n = n.slice(5), u = !0), n === "class" || n === "className" ? te(e, t) : l && !u && !c ? e[ml(n)] = t : e[d || n] = t;
    else {
        const o = i && n.indexOf(":") > -1 && cl[n.split(":")[0]];
        o ? dl(e, o, n, t) : oe(e, ol[n] || n, t)
    }
    return t
}

function _l(e) {
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
        const r = t[n];
        if (r && !t.disabled) {
            const i = t["".concat(n, "Data")];
            if (i !== void 0 ? r.call(t, i, e) : r.call(t, e), e.cancelBubble) return
        }
        t = t._$host || t.parentNode || t.host
    }
}

function zt(e, n, t, r, i) {
    for (; typeof t == "function";) t = t();
    if (n === t) return t;
    const s = typeof n,
        l = r !== void 0;
    if (e = l && t[0] && t[0].parentNode || e, s === "string" || s === "number")
        if (s === "number" && (n = n.toString()), l) {
            let u = t[0];
            u && u.nodeType === 3 ? u.data = n : u = document.createTextNode(n), t = Et(e, t, r, u)
        } else t !== "" && typeof t == "string" ? t = e.firstChild.data = n : t = e.textContent = n;
    else if (n == null || s === "boolean") t = Et(e, t, r);
    else {
        if (s === "function") return Q(() => {
            let u = n();
            for (; typeof u == "function";) u = u();
            t = zt(e, u, t, r)
        }), () => t;
        if (Array.isArray(n)) {
            const u = [],
                c = t && Array.isArray(t);
            if (Yr(u, n, t, i)) return Q(() => t = zt(e, u, t, r, !0)), () => t;
            if (u.length === 0) {
                if (t = Et(e, t, r), l) return t
            } else c ? t.length === 0 ? oi(e, u, r) : ul(e, t, u) : (t && Et(e), oi(e, u));
            t = u
        } else if (n.nodeType) {
            if (Array.isArray(t)) {
                if (l) return t = Et(e, t, r, n);
                Et(e, t, null, n)
            } else t == null || t === "" || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
            t = n
        } else console.warn("Unrecognized value. Skipped inserting", n)
    }
    return t
}

function Yr(e, n, t, r) {
    let i = !1;
    for (let s = 0, l = n.length; s < l; s++) {
        let u = n[s],
            c = t && t[s],
            d;
        if (!(u == null || u === !0 || u === !1))
            if ((d = typeof u) == "object" && u.nodeType) e.push(u);
            else if (Array.isArray(u)) i = Yr(e, u, c) || i;
        else if (d === "function")
            if (r) {
                for (; typeof u == "function";) u = u();
                i = Yr(e, Array.isArray(u) ? u : [u], Array.isArray(c) ? c : [c]) || i
            } else e.push(u), i = !0;
        else {
            const p = String(u);
            c && c.nodeType === 3 && c.data === p ? e.push(c) : e.push(document.createTextNode(p))
        }
    }
    return i
}

function oi(e, n, t = null) {
    for (let r = 0, i = n.length; r < i; r++) e.insertBefore(n[r], t)
}

function Et(e, n, t, r) {
    if (t === void 0) return e.textContent = "";
    const i = r || document.createTextNode("");
    if (n.length) {
        let s = !1;
        for (let l = n.length - 1; l >= 0; l--) {
            const u = n[l];
            if (i !== u) {
                const c = u.parentNode === e;
                !s && !l ? c ? e.replaceChild(i, u) : e.insertBefore(i, t) : c && u.remove()
            } else s = !0
        }
    } else e.insertBefore(i, t);
    return [i]
}
const yl = "http://www.w3.org/2000/svg";

function bl(e, n = !1) {
    return n ? document.createElementNS(yl, e) : document.createElement(e)
}

function cs(e) {
    const [n, t] = co(e, ["component"]), r = xe(() => n.component);
    return xe(() => {
        const i = r();
        switch (typeof i) {
            case "function":
                return Object.assign(i, {
                    [Ha]: !0
                }), fe(() => i(t));
            case "string":
                const s = ll.has(i),
                    l = bl(i, s);
                return Ke(l, t, s), l
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

function us(e) {
    var n, t, r = "";
    if (typeof e == "string" || typeof e == "number") r += e;
    else if (typeof e == "object")
        if (Array.isArray(e))
            for (n = 0; n < e.length; n++) e[n] && (t = us(e[n])) && (r && (r += " "), r += t);
        else
            for (n in e) e[n] && (r && (r += " "), r += n);
    return r
}

function wl() {
    for (var e, n, t = 0, r = ""; t < arguments.length;)(e = arguments[t++]) && (n = us(e)) && (r && (r += " "), r += n);
    return r
}
const ii = e => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e,
    ce = wl,
    yn = (e, n) => t => {
        var r;
        if ((n == null ? void 0 : n.variants) == null) return ce(e, t == null ? void 0 : t.class, t == null ? void 0 : t.className);
        const {
            variants: i,
            defaultVariants: s
        } = n, l = Object.keys(i).map(d => {
            const p = t == null ? void 0 : t[d],
                o = s == null ? void 0 : s[d];
            if (p === null) return null;
            const a = ii(p) || ii(o);
            return i[d][a]
        }), u = t && Object.entries(t).reduce((d, p) => {
            let [o, a] = p;
            return a === void 0 || (d[o] = a), d
        }, {}), c = n == null || (r = n.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((d, p) => {
            let v = p,
                {
                    class: o,
                    className: a
                } = v,
                f = Qo(v, ["class", "className"]);
            return Object.entries(f).every(g => {
                let [m, h] = g;
                return Array.isArray(h) ? h.includes(ye(ye({}, s), u)[m]) : ye(ye({}, s), u)[m] === h
            }) ? [...d, o, a] : d
        }, []);
        return ce(e, l, c, t == null ? void 0 : t.class, t == null ? void 0 : t.className)
    },
    qr = Symbol("store-raw"),
    Rt = Symbol("store-node"),
    Ue = Symbol("store-has"),
    fs = Symbol("store-self");

function ds(e) {
    let n = e[Be];
    if (!n && (Object.defineProperty(e, Be, {
            value: n = new Proxy(e, Sl)
        }), !Array.isArray(e))) {
        const t = Object.keys(e),
            r = Object.getOwnPropertyDescriptors(e);
        for (let i = 0, s = t.length; i < s; i++) {
            const l = t[i];
            r[l].get && Object.defineProperty(e, l, {
                enumerable: r[l].enumerable,
                get: r[l].get.bind(n)
            })
        }
    }
    return n
}

function ut(e) {
    let n;
    return e != null && typeof e == "object" && (e[Be] || !(n = Object.getPrototypeOf(e)) || n === Object.prototype || Array.isArray(e))
}

function Nt(e, n = new Set) {
    let t, r, i, s;
    if (t = e != null && e[qr]) return t;
    if (!ut(e) || n.has(e)) return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : n.add(e);
        for (let l = 0, u = e.length; l < u; l++) i = e[l], (r = Nt(i, n)) !== i && (e[l] = r)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : n.add(e);
        const l = Object.keys(e),
            u = Object.getOwnPropertyDescriptors(e);
        for (let c = 0, d = l.length; c < d; c++) s = l[c], !u[s].get && (i = e[s], (r = Nt(i, n)) !== i && (e[s] = r))
    }
    return e
}

function or(e, n) {
    let t = e[n];
    return t || Object.defineProperty(e, n, {
        value: t = Object.create(null)
    }), t
}

function un(e, n, t) {
    if (e[n]) return e[n];
    const [r, i] = Y(t, {
        equals: !1,
        internal: !0
    });
    return r.$ = i, e[n] = r
}

function Al(e, n) {
    const t = Reflect.getOwnPropertyDescriptor(e, n);
    return !t || t.get || !t.configurable || n === Be || n === Rt || (delete t.value, delete t.writable, t.get = () => e[Be][n]), t
}

function ps(e) {
    tr() && un(or(e, Rt), fs)()
}

function xl(e) {
    return ps(e), Reflect.ownKeys(e)
}
const Sl = {
    get(e, n, t) {
        if (n === qr) return e;
        if (n === Be) return t;
        if (n === Gr) return ps(e), t;
        const r = or(e, Rt),
            i = r[n];
        let s = i ? i() : e[n];
        if (n === Rt || n === Ue || n === "__proto__") return s;
        if (!i) {
            const l = Object.getOwnPropertyDescriptor(e, n);
            tr() && (typeof s != "function" || e.hasOwnProperty(n)) && !(l && l.get) && (s = un(r, n, s)())
        }
        return ut(s) ? ds(s) : s
    },
    has(e, n) {
        return n === qr || n === Be || n === Gr || n === Rt || n === Ue || n === "__proto__" ? !0 : (tr() && un(or(e, Ue), n)(), n in e)
    },
    set() {
        return !0
    },
    deleteProperty() {
        return !0
    },
    ownKeys: xl,
    getOwnPropertyDescriptor: Al
};

function Oe(e, n, t, r = !1) {
    if (!r && e[n] === t) return;
    const i = e[n],
        s = e.length;
    t === void 0 ? (delete e[n], e[Ue] && e[Ue][n] && i !== void 0 && e[Ue][n].$()) : (e[n] = t, e[Ue] && e[Ue][n] && i === void 0 && e[Ue][n].$());
    let l = or(e, Rt),
        u;
    if ((u = un(l, n, i)) && u.$(() => t), Array.isArray(e) && e.length !== s) {
        for (let c = e.length; c < s; c++)(u = l[c]) && u.$();
        (u = un(l, "length", s)) && u.$(e.length)
    }(u = l[fs]) && u.$()
}

function gs(e, n) {
    const t = Object.keys(n);
    for (let r = 0; r < t.length; r += 1) {
        const i = t[r];
        Oe(e, i, n[i])
    }
}

function kl(e, n) {
    if (typeof n == "function" && (n = n(e)), n = Nt(n), Array.isArray(n)) {
        if (e === n) return;
        let t = 0,
            r = n.length;
        for (; t < r; t++) {
            const i = n[t];
            e[t] !== i && Oe(e, t, i)
        }
        Oe(e, "length", r)
    } else gs(e, n)
}

function on(e, n, t = []) {
    let r, i = e;
    if (n.length > 1) {
        r = n.shift();
        const l = typeof r,
            u = Array.isArray(e);
        if (Array.isArray(r)) {
            for (let c = 0; c < r.length; c++) on(e, [r[c]].concat(n), t);
            return
        } else if (u && l === "function") {
            for (let c = 0; c < e.length; c++) r(e[c], c) && on(e, [c].concat(n), t);
            return
        } else if (u && l === "object") {
            const {
                from: c = 0,
                to: d = e.length - 1,
                by: p = 1
            } = r;
            for (let o = c; o <= d; o += p) on(e, [o].concat(n), t);
            return
        } else if (n.length > 1) {
            on(e[r], n, [r].concat(t));
            return
        }
        i = e[r], t = [r].concat(t)
    }
    let s = n[0];
    typeof s == "function" && (s = s(i, t), s === i) || r === void 0 && s == null || (s = Nt(s), r === void 0 || ut(i) && ut(s) && !Array.isArray(s) ? gs(i, s) : Oe(e, r, s))
}

function Wt(...[e, n]) {
    const t = Nt(e || {}),
        r = Array.isArray(t),
        i = ds(t);

    function s(...l) {
        lr(() => {
            r && l.length === 1 ? kl(t, l[0]) : on(t, l)
        })
    }
    return [i, s]
}
const Kr = Symbol("store-root");

function Mt(e, n, t, r, i) {
    const s = n[t];
    if (e === s) return;
    if (t !== Kr && (!ut(e) || !ut(s) || i && e[i] !== s[i])) {
        Oe(n, t, e);
        return
    }
    if (Array.isArray(e)) {
        if (e.length && s.length && (!r || i && e[0] && e[0][i] != null)) {
            let c, d, p, o, a, f, v, g;
            for (p = 0, o = Math.min(s.length, e.length); p < o && (s[p] === e[p] || i && s[p] && e[p] && s[p][i] === e[p][i]); p++) Mt(e[p], s, p, r, i);
            const m = new Array(e.length),
                h = new Map;
            for (o = s.length - 1, a = e.length - 1; o >= p && a >= p && (s[o] === e[a] || i && s[p] && e[p] && s[o][i] === e[a][i]); o--, a--) m[a] = s[o];
            if (p > a || p > o) {
                for (d = p; d <= a; d++) Oe(s, d, e[d]);
                for (; d < e.length; d++) Oe(s, d, m[d]), Mt(e[d], s, d, r, i);
                s.length > e.length && Oe(s, "length", e.length);
                return
            }
            for (v = new Array(a + 1), d = a; d >= p; d--) f = e[d], g = i && f ? f[i] : f, c = h.get(g), v[d] = c === void 0 ? -1 : c, h.set(g, d);
            for (c = p; c <= o; c++) f = s[c], g = i && f ? f[i] : f, d = h.get(g), d !== void 0 && d !== -1 && (m[d] = s[c], d = v[d], h.set(g, d));
            for (d = p; d < e.length; d++) d in m ? (Oe(s, d, m[d]), Mt(e[d], s, d, r, i)) : Oe(s, d, e[d])
        } else
            for (let c = 0, d = e.length; c < d; c++) Mt(e[c], s, c, r, i);
        s.length > e.length && Oe(s, "length", e.length);
        return
    }
    const l = Object.keys(e);
    for (let c = 0, d = l.length; c < d; c++) Mt(e[l[c]], s, l[c], r, i);
    const u = Object.keys(s);
    for (let c = 0, d = u.length; c < d; c++) e[u[c]] === void 0 && Oe(s, u[c], void 0)
}

function Tl(e, n = {}) {
    const {
        merge: t,
        key: r = "id"
    } = n, i = Nt(e);
    return s => {
        if (!ut(s) || !ut(i)) return i;
        const l = Mt(i, {
            [Kr]: s
        }, Kr, t, r);
        return l === void 0 ? s : l
    }
}
const [$l, Qr] = Wt({
    mainApp: null
}), Il = e => {
    Qr(e === "home" || e === "security-tape-archives" || e === "timecoder" ? {
        mainApp: "terminal",
        terminalApp: e
    } : {
        mainApp: e,
        terminalApp: void 0
    })
}, Pl = () => {
    Qr({
        mainApp: null,
        terminalApp: void 0
    })
}, we = {
    currentOpenApp: $l,
    openApp: Il,
    closeApp: Pl
};
var Ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};

function bn(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}

function bv(e) {
    if (e.__esModule) return e;
    var n = e.default;
    if (typeof n == "function") {
        var t = function r() {
            return this instanceof r ? Reflect.construct(n, arguments, this.constructor) : n.apply(this, arguments)
        };
        t.prototype = n.prototype
    } else t = {};
    return Object.defineProperty(t, "__esModule", {
        value: !0
    }), Object.keys(e).forEach(function(r) {
        var i = Object.getOwnPropertyDescriptor(e, r);
        Object.defineProperty(t, r, i.get ? i : {
            enumerable: !0,
            get: function() {
                return e[r]
            }
        })
    }), t
}
var fn = {};
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
                var o = this || t;
                return o._counter = 1e3, o._html5AudioPool = [], o.html5PoolSize = 10, o._codecs = {}, o._howls = [], o._muted = !1, o._volume = 1, o._canPlayEvent = "canplaythrough", o._navigator = typeof window < "u" && window.navigator ? window.navigator : null, o.masterGain = null, o.noAudio = !1, o.usingWebAudio = !0, o.autoSuspend = !0, o.ctx = null, o.autoUnlock = !0, o._setup(), o
            },
            volume: function(o) {
                var a = this || t;
                if (o = parseFloat(o), a.ctx || p(), typeof o < "u" && o >= 0 && o <= 1) {
                    if (a._volume = o, a._muted) return a;
                    a.usingWebAudio && a.masterGain.gain.setValueAtTime(o, t.ctx.currentTime);
                    for (var f = 0; f < a._howls.length; f++)
                        if (!a._howls[f]._webAudio)
                            for (var v = a._howls[f]._getSoundIds(), g = 0; g < v.length; g++) {
                                var m = a._howls[f]._soundById(v[g]);
                                m && m._node && (m._node.volume = m._volume * o)
                            }
                    return a
                }
                return a._volume
            },
            mute: function(o) {
                var a = this || t;
                a.ctx || p(), a._muted = o, a.usingWebAudio && a.masterGain.gain.setValueAtTime(o ? 0 : a._volume, t.ctx.currentTime);
                for (var f = 0; f < a._howls.length; f++)
                    if (!a._howls[f]._webAudio)
                        for (var v = a._howls[f]._getSoundIds(), g = 0; g < v.length; g++) {
                            var m = a._howls[f]._soundById(v[g]);
                            m && m._node && (m._node.muted = o ? !0 : m._muted)
                        }
                return a
            },
            stop: function() {
                for (var o = this || t, a = 0; a < o._howls.length; a++) o._howls[a].stop();
                return o
            },
            unload: function() {
                for (var o = this || t, a = o._howls.length - 1; a >= 0; a--) o._howls[a].unload();
                return o.usingWebAudio && o.ctx && typeof o.ctx.close < "u" && (o.ctx.close(), o.ctx = null, p()), o
            },
            codecs: function(o) {
                return (this || t)._codecs[o.replace(/^x-/, "")]
            },
            _setup: function() {
                var o = this || t;
                if (o.state = o.ctx && o.ctx.state || "suspended", o._autoSuspend(), !o.usingWebAudio)
                    if (typeof Audio < "u") try {
                        var a = new Audio;
                        typeof a.oncanplaythrough > "u" && (o._canPlayEvent = "canplay")
                    } catch (f) {
                        o.noAudio = !0
                    } else o.noAudio = !0;
                try {
                    var a = new Audio;
                    a.muted && (o.noAudio = !0)
                } catch (f) {}
                return o.noAudio || o._setupCodecs(), o
            },
            _setupCodecs: function() {
                var o = this || t,
                    a = null;
                try {
                    a = typeof Audio < "u" ? new Audio : null
                } catch (b) {
                    return o
                }
                if (!a || typeof a.canPlayType != "function") return o;
                var f = a.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                    v = o._navigator ? o._navigator.userAgent : "",
                    g = v.match(/OPR\/(\d+)/g),
                    m = g && parseInt(g[0].split("/")[1], 10) < 33,
                    h = v.indexOf("Safari") !== -1 && v.indexOf("Chrome") === -1,
                    y = v.match(/Version\/(.*?) /),
                    w = h && y && parseInt(y[1], 10) < 15;
                return o._codecs = {
                    mp3: !!(!m && (f || a.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                    mpeg: !!f,
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
                }, o
            },
            _unlockAudio: function() {
                var o = this || t;
                if (!(o._audioUnlocked || !o.ctx)) {
                    o._audioUnlocked = !1, o.autoUnlock = !1, !o._mobileUnloaded && o.ctx.sampleRate !== 44100 && (o._mobileUnloaded = !0, o.unload()), o._scratchBuffer = o.ctx.createBuffer(1, 1, 22050);
                    var a = function(f) {
                        for (; o._html5AudioPool.length < o.html5PoolSize;) try {
                            var v = new Audio;
                            v._unlocked = !0, o._releaseHtml5Audio(v)
                        } catch (b) {
                            o.noAudio = !0;
                            break
                        }
                        for (var g = 0; g < o._howls.length; g++)
                            if (!o._howls[g]._webAudio)
                                for (var m = o._howls[g]._getSoundIds(), h = 0; h < m.length; h++) {
                                    var y = o._howls[g]._soundById(m[h]);
                                    y && y._node && !y._node._unlocked && (y._node._unlocked = !0, y._node.load())
                                }
                        o._autoResume();
                        var w = o.ctx.createBufferSource();
                        w.buffer = o._scratchBuffer, w.connect(o.ctx.destination), typeof w.start > "u" ? w.noteOn(0) : w.start(0), typeof o.ctx.resume == "function" && o.ctx.resume(), w.onended = function() {
                            w.disconnect(0), o._audioUnlocked = !0, document.removeEventListener("touchstart", a, !0), document.removeEventListener("touchend", a, !0), document.removeEventListener("click", a, !0), document.removeEventListener("keydown", a, !0);
                            for (var b = 0; b < o._howls.length; b++) o._howls[b]._emit("unlock")
                        }
                    };
                    return document.addEventListener("touchstart", a, !0), document.addEventListener("touchend", a, !0), document.addEventListener("click", a, !0), document.addEventListener("keydown", a, !0), o
                }
            },
            _obtainHtml5Audio: function() {
                var o = this || t;
                if (o._html5AudioPool.length) return o._html5AudioPool.pop();
                var a = new Audio().play();
                return a && typeof Promise < "u" && (a instanceof Promise || typeof a.then == "function") && a.catch(function() {
                    console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")
                }), new Audio
            },
            _releaseHtml5Audio: function(o) {
                var a = this || t;
                return o._unlocked && a._html5AudioPool.push(o), a
            },
            _autoSuspend: function() {
                var o = this;
                if (!(!o.autoSuspend || !o.ctx || typeof o.ctx.suspend > "u" || !t.usingWebAudio)) {
                    for (var a = 0; a < o._howls.length; a++)
                        if (o._howls[a]._webAudio) {
                            for (var f = 0; f < o._howls[a]._sounds.length; f++)
                                if (!o._howls[a]._sounds[f]._paused) return o
                        } return o._suspendTimer && clearTimeout(o._suspendTimer), o._suspendTimer = setTimeout(function() {
                        if (o.autoSuspend) {
                            o._suspendTimer = null, o.state = "suspending";
                            var v = function() {
                                o.state = "suspended", o._resumeAfterSuspend && (delete o._resumeAfterSuspend, o._autoResume())
                            };
                            o.ctx.suspend().then(v, v)
                        }
                    }, 3e4), o
                }
            },
            _autoResume: function() {
                var o = this;
                if (!(!o.ctx || typeof o.ctx.resume > "u" || !t.usingWebAudio)) return o.state === "running" && o.ctx.state !== "interrupted" && o._suspendTimer ? (clearTimeout(o._suspendTimer), o._suspendTimer = null) : o.state === "suspended" || o.state === "running" && o.ctx.state === "interrupted" ? (o.ctx.resume().then(function() {
                    o.state = "running";
                    for (var a = 0; a < o._howls.length; a++) o._howls[a]._emit("resume")
                }), o._suspendTimer && (clearTimeout(o._suspendTimer), o._suspendTimer = null)) : o.state === "suspending" && (o._resumeAfterSuspend = !0), o
            }
        };
        var t = new n,
            r = function(o) {
                var a = this;
                if (!o.src || o.src.length === 0) {
                    console.error("An array of source files must be passed with any new Howl.");
                    return
                }
                a.init(o)
            };
        r.prototype = {
            init: function(o) {
                var a = this;
                return t.ctx || p(), a._autoplay = o.autoplay || !1, a._format = typeof o.format != "string" ? o.format : [o.format], a._html5 = o.html5 || !1, a._muted = o.mute || !1, a._loop = o.loop || !1, a._pool = o.pool || 5, a._preload = typeof o.preload == "boolean" || o.preload === "metadata" ? o.preload : !0, a._rate = o.rate || 1, a._sprite = o.sprite || {}, a._src = typeof o.src != "string" ? o.src : [o.src], a._volume = o.volume !== void 0 ? o.volume : 1, a._xhr = {
                    method: o.xhr && o.xhr.method ? o.xhr.method : "GET",
                    headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
                    withCredentials: o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : !1
                }, a._duration = 0, a._state = "unloaded", a._sounds = [], a._endTimers = {}, a._queue = [], a._playLock = !1, a._onend = o.onend ? [{
                    fn: o.onend
                }] : [], a._onfade = o.onfade ? [{
                    fn: o.onfade
                }] : [], a._onload = o.onload ? [{
                    fn: o.onload
                }] : [], a._onloaderror = o.onloaderror ? [{
                    fn: o.onloaderror
                }] : [], a._onplayerror = o.onplayerror ? [{
                    fn: o.onplayerror
                }] : [], a._onpause = o.onpause ? [{
                    fn: o.onpause
                }] : [], a._onplay = o.onplay ? [{
                    fn: o.onplay
                }] : [], a._onstop = o.onstop ? [{
                    fn: o.onstop
                }] : [], a._onmute = o.onmute ? [{
                    fn: o.onmute
                }] : [], a._onvolume = o.onvolume ? [{
                    fn: o.onvolume
                }] : [], a._onrate = o.onrate ? [{
                    fn: o.onrate
                }] : [], a._onseek = o.onseek ? [{
                    fn: o.onseek
                }] : [], a._onunlock = o.onunlock ? [{
                    fn: o.onunlock
                }] : [], a._onresume = [], a._webAudio = t.usingWebAudio && !a._html5, typeof t.ctx < "u" && t.ctx && t.autoUnlock && t._unlockAudio(), t._howls.push(a), a._autoplay && a._queue.push({
                    event: "play",
                    action: function() {
                        a.play()
                    }
                }), a._preload && a._preload !== "none" && a.load(), a
            },
            load: function() {
                var o = this,
                    a = null;
                if (t.noAudio) {
                    o._emit("loaderror", null, "No audio support.");
                    return
                }
                typeof o._src == "string" && (o._src = [o._src]);
                for (var f = 0; f < o._src.length; f++) {
                    var v, g;
                    if (o._format && o._format[f]) v = o._format[f];
                    else {
                        if (g = o._src[f], typeof g != "string") {
                            o._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                            continue
                        }
                        v = /^data:audio\/([^;,]+);/i.exec(g), v || (v = /\.([^.]+)$/.exec(g.split("?", 1)[0])), v && (v = v[1].toLowerCase())
                    }
                    if (v || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), v && t.codecs(v)) {
                        a = o._src[f];
                        break
                    }
                }
                if (!a) {
                    o._emit("loaderror", null, "No codec support for selected audio sources.");
                    return
                }
                return o._src = a, o._state = "loading", window.location.protocol === "https:" && a.slice(0, 5) === "http:" && (o._html5 = !0, o._webAudio = !1), new i(o), o._webAudio && l(o), o
            },
            play: function(o, a) {
                var f = this,
                    v = null;
                if (typeof o == "number") v = o, o = null;
                else {
                    if (typeof o == "string" && f._state === "loaded" && !f._sprite[o]) return null;
                    if (typeof o > "u" && (o = "__default", !f._playLock)) {
                        for (var g = 0, m = 0; m < f._sounds.length; m++) f._sounds[m]._paused && !f._sounds[m]._ended && (g++, v = f._sounds[m]._id);
                        g === 1 ? o = null : v = null
                    }
                }
                var h = v ? f._soundById(v) : f._inactiveSound();
                if (!h) return null;
                if (v && !o && (o = h._sprite || "__default"), f._state !== "loaded") {
                    h._sprite = o, h._ended = !1;
                    var y = h._id;
                    return f._queue.push({
                        event: "play",
                        action: function() {
                            f.play(y)
                        }
                    }), y
                }
                if (v && !h._paused) return a || f._loadQueue("play"), h._id;
                f._webAudio && t._autoResume();
                var w = Math.max(0, h._seek > 0 ? h._seek : f._sprite[o][0] / 1e3),
                    b = Math.max(0, (f._sprite[o][0] + f._sprite[o][1]) / 1e3 - w),
                    P = b * 1e3 / Math.abs(h._rate),
                    H = f._sprite[o][0] / 1e3,
                    W = (f._sprite[o][0] + f._sprite[o][1]) / 1e3;
                h._sprite = o, h._ended = !1;
                var B = function() {
                    h._paused = !1, h._seek = w, h._start = H, h._stop = W, h._loop = !!(h._loop || f._sprite[o][2])
                };
                if (w >= W) {
                    f._ended(h);
                    return
                }
                var j = h._node;
                if (f._webAudio) {
                    var z = function() {
                        f._playLock = !1, B(), f._refreshBuffer(h);
                        var M = h._muted || f._muted ? 0 : h._volume;
                        j.gain.setValueAtTime(M, t.ctx.currentTime), h._playStart = t.ctx.currentTime, typeof j.bufferSource.start > "u" ? h._loop ? j.bufferSource.noteGrainOn(0, w, 86400) : j.bufferSource.noteGrainOn(0, w, b) : h._loop ? j.bufferSource.start(0, w, 86400) : j.bufferSource.start(0, w, b), P !== 1 / 0 && (f._endTimers[h._id] = setTimeout(f._ended.bind(f, h), P)), a || setTimeout(function() {
                            f._emit("play", h._id), f._loadQueue()
                        }, 0)
                    };
                    t.state === "running" && t.ctx.state !== "interrupted" ? z() : (f._playLock = !0, f.once("resume", z), f._clearTimer(h._id))
                } else {
                    var L = function() {
                        j.currentTime = w, j.muted = h._muted || f._muted || t._muted || j.muted, j.volume = h._volume * t.volume(), j.playbackRate = h._rate;
                        try {
                            var M = j.play();
                            if (M && typeof Promise < "u" && (M instanceof Promise || typeof M.then == "function") ? (f._playLock = !0, B(), M.then(function() {
                                    f._playLock = !1, j._unlocked = !0, a ? f._loadQueue() : f._emit("play", h._id)
                                }).catch(function() {
                                    f._playLock = !1, f._emit("playerror", h._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), h._ended = !0, h._paused = !0
                                })) : a || (f._playLock = !1, B(), f._emit("play", h._id)), j.playbackRate = h._rate, j.paused) {
                                f._emit("playerror", h._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                return
                            }
                            o !== "__default" || h._loop ? f._endTimers[h._id] = setTimeout(f._ended.bind(f, h), P) : (f._endTimers[h._id] = function() {
                                f._ended(h), j.removeEventListener("ended", f._endTimers[h._id], !1)
                            }, j.addEventListener("ended", f._endTimers[h._id], !1))
                        } catch (I) {
                            f._emit("playerror", h._id, I)
                        }
                    };
                    j.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (j.src = f._src, j.load());
                    var J = window && window.ejecta || !j.readyState && t._navigator.isCocoonJS;
                    if (j.readyState >= 3 || J) L();
                    else {
                        f._playLock = !0, f._state = "loading";
                        var de = function() {
                            f._state = "loaded", L(), j.removeEventListener(t._canPlayEvent, de, !1)
                        };
                        j.addEventListener(t._canPlayEvent, de, !1), f._clearTimer(h._id)
                    }
                }
                return h._id
            },
            pause: function(o) {
                var a = this;
                if (a._state !== "loaded" || a._playLock) return a._queue.push({
                    event: "pause",
                    action: function() {
                        a.pause(o)
                    }
                }), a;
                for (var f = a._getSoundIds(o), v = 0; v < f.length; v++) {
                    a._clearTimer(f[v]);
                    var g = a._soundById(f[v]);
                    if (g && !g._paused && (g._seek = a.seek(f[v]), g._rateSeek = 0, g._paused = !0, a._stopFade(f[v]), g._node))
                        if (a._webAudio) {
                            if (!g._node.bufferSource) continue;
                            typeof g._node.bufferSource.stop > "u" ? g._node.bufferSource.noteOff(0) : g._node.bufferSource.stop(0), a._cleanBuffer(g._node)
                        } else(!isNaN(g._node.duration) || g._node.duration === 1 / 0) && g._node.pause();
                    arguments[1] || a._emit("pause", g ? g._id : null)
                }
                return a
            },
            stop: function(o, a) {
                var f = this;
                if (f._state !== "loaded" || f._playLock) return f._queue.push({
                    event: "stop",
                    action: function() {
                        f.stop(o)
                    }
                }), f;
                for (var v = f._getSoundIds(o), g = 0; g < v.length; g++) {
                    f._clearTimer(v[g]);
                    var m = f._soundById(v[g]);
                    m && (m._seek = m._start || 0, m._rateSeek = 0, m._paused = !0, m._ended = !0, f._stopFade(v[g]), m._node && (f._webAudio ? m._node.bufferSource && (typeof m._node.bufferSource.stop > "u" ? m._node.bufferSource.noteOff(0) : m._node.bufferSource.stop(0), f._cleanBuffer(m._node)) : (!isNaN(m._node.duration) || m._node.duration === 1 / 0) && (m._node.currentTime = m._start || 0, m._node.pause(), m._node.duration === 1 / 0 && f._clearSound(m._node))), a || f._emit("stop", m._id))
                }
                return f
            },
            mute: function(o, a) {
                var f = this;
                if (f._state !== "loaded" || f._playLock) return f._queue.push({
                    event: "mute",
                    action: function() {
                        f.mute(o, a)
                    }
                }), f;
                if (typeof a > "u")
                    if (typeof o == "boolean") f._muted = o;
                    else return f._muted;
                for (var v = f._getSoundIds(a), g = 0; g < v.length; g++) {
                    var m = f._soundById(v[g]);
                    m && (m._muted = o, m._interval && f._stopFade(m._id), f._webAudio && m._node ? m._node.gain.setValueAtTime(o ? 0 : m._volume, t.ctx.currentTime) : m._node && (m._node.muted = t._muted ? !0 : o), f._emit("mute", m._id))
                }
                return f
            },
            volume: function() {
                var o = this,
                    a = arguments,
                    f, v;
                if (a.length === 0) return o._volume;
                if (a.length === 1 || a.length === 2 && typeof a[1] > "u") {
                    var g = o._getSoundIds(),
                        m = g.indexOf(a[0]);
                    m >= 0 ? v = parseInt(a[0], 10) : f = parseFloat(a[0])
                } else a.length >= 2 && (f = parseFloat(a[0]), v = parseInt(a[1], 10));
                var h;
                if (typeof f < "u" && f >= 0 && f <= 1) {
                    if (o._state !== "loaded" || o._playLock) return o._queue.push({
                        event: "volume",
                        action: function() {
                            o.volume.apply(o, a)
                        }
                    }), o;
                    typeof v > "u" && (o._volume = f), v = o._getSoundIds(v);
                    for (var y = 0; y < v.length; y++) h = o._soundById(v[y]), h && (h._volume = f, a[2] || o._stopFade(v[y]), o._webAudio && h._node && !h._muted ? h._node.gain.setValueAtTime(f, t.ctx.currentTime) : h._node && !h._muted && (h._node.volume = f * t.volume()), o._emit("volume", h._id))
                } else return h = v ? o._soundById(v) : o._sounds[0], h ? h._volume : 0;
                return o
            },
            fade: function(o, a, f, v) {
                var g = this;
                if (g._state !== "loaded" || g._playLock) return g._queue.push({
                    event: "fade",
                    action: function() {
                        g.fade(o, a, f, v)
                    }
                }), g;
                o = Math.min(Math.max(0, parseFloat(o)), 1), a = Math.min(Math.max(0, parseFloat(a)), 1), f = parseFloat(f), g.volume(o, v);
                for (var m = g._getSoundIds(v), h = 0; h < m.length; h++) {
                    var y = g._soundById(m[h]);
                    if (y) {
                        if (v || g._stopFade(m[h]), g._webAudio && !y._muted) {
                            var w = t.ctx.currentTime,
                                b = w + f / 1e3;
                            y._volume = o, y._node.gain.setValueAtTime(o, w), y._node.gain.linearRampToValueAtTime(a, b)
                        }
                        g._startFadeInterval(y, o, a, f, m[h], typeof v > "u")
                    }
                }
                return g
            },
            _startFadeInterval: function(o, a, f, v, g, m) {
                var h = this,
                    y = a,
                    w = f - a,
                    b = Math.abs(w / .01),
                    P = Math.max(4, b > 0 ? v / b : v),
                    H = Date.now();
                o._fadeTo = f, o._interval = setInterval(function() {
                    var W = (Date.now() - H) / v;
                    H = Date.now(), y += w * W, y = Math.round(y * 100) / 100, w < 0 ? y = Math.max(f, y) : y = Math.min(f, y), h._webAudio ? o._volume = y : h.volume(y, o._id, !0), m && (h._volume = y), (f < a && y <= f || f > a && y >= f) && (clearInterval(o._interval), o._interval = null, o._fadeTo = null, h.volume(f, o._id), h._emit("fade", o._id))
                }, P)
            },
            _stopFade: function(o) {
                var a = this,
                    f = a._soundById(o);
                return f && f._interval && (a._webAudio && f._node.gain.cancelScheduledValues(t.ctx.currentTime), clearInterval(f._interval), f._interval = null, a.volume(f._fadeTo, o), f._fadeTo = null, a._emit("fade", o)), a
            },
            loop: function() {
                var o = this,
                    a = arguments,
                    f, v, g;
                if (a.length === 0) return o._loop;
                if (a.length === 1)
                    if (typeof a[0] == "boolean") f = a[0], o._loop = f;
                    else return g = o._soundById(parseInt(a[0], 10)), g ? g._loop : !1;
                else a.length === 2 && (f = a[0], v = parseInt(a[1], 10));
                for (var m = o._getSoundIds(v), h = 0; h < m.length; h++) g = o._soundById(m[h]), g && (g._loop = f, o._webAudio && g._node && g._node.bufferSource && (g._node.bufferSource.loop = f, f && (g._node.bufferSource.loopStart = g._start || 0, g._node.bufferSource.loopEnd = g._stop, o.playing(m[h]) && (o.pause(m[h], !0), o.play(m[h], !0)))));
                return o
            },
            rate: function() {
                var o = this,
                    a = arguments,
                    f, v;
                if (a.length === 0) v = o._sounds[0]._id;
                else if (a.length === 1) {
                    var g = o._getSoundIds(),
                        m = g.indexOf(a[0]);
                    m >= 0 ? v = parseInt(a[0], 10) : f = parseFloat(a[0])
                } else a.length === 2 && (f = parseFloat(a[0]), v = parseInt(a[1], 10));
                var h;
                if (typeof f == "number") {
                    if (o._state !== "loaded" || o._playLock) return o._queue.push({
                        event: "rate",
                        action: function() {
                            o.rate.apply(o, a)
                        }
                    }), o;
                    typeof v > "u" && (o._rate = f), v = o._getSoundIds(v);
                    for (var y = 0; y < v.length; y++)
                        if (h = o._soundById(v[y]), h) {
                            o.playing(v[y]) && (h._rateSeek = o.seek(v[y]), h._playStart = o._webAudio ? t.ctx.currentTime : h._playStart), h._rate = f, o._webAudio && h._node && h._node.bufferSource ? h._node.bufferSource.playbackRate.setValueAtTime(f, t.ctx.currentTime) : h._node && (h._node.playbackRate = f);
                            var w = o.seek(v[y]),
                                b = (o._sprite[h._sprite][0] + o._sprite[h._sprite][1]) / 1e3 - w,
                                P = b * 1e3 / Math.abs(h._rate);
                            (o._endTimers[v[y]] || !h._paused) && (o._clearTimer(v[y]), o._endTimers[v[y]] = setTimeout(o._ended.bind(o, h), P)), o._emit("rate", h._id)
                        }
                } else return h = o._soundById(v), h ? h._rate : o._rate;
                return o
            },
            seek: function() {
                var o = this,
                    a = arguments,
                    f, v;
                if (a.length === 0) o._sounds.length && (v = o._sounds[0]._id);
                else if (a.length === 1) {
                    var g = o._getSoundIds(),
                        m = g.indexOf(a[0]);
                    m >= 0 ? v = parseInt(a[0], 10) : o._sounds.length && (v = o._sounds[0]._id, f = parseFloat(a[0]))
                } else a.length === 2 && (f = parseFloat(a[0]), v = parseInt(a[1], 10));
                if (typeof v > "u") return 0;
                if (typeof f == "number" && (o._state !== "loaded" || o._playLock)) return o._queue.push({
                    event: "seek",
                    action: function() {
                        o.seek.apply(o, a)
                    }
                }), o;
                var h = o._soundById(v);
                if (h)
                    if (typeof f == "number" && f >= 0) {
                        var y = o.playing(v);
                        y && o.pause(v, !0), h._seek = f, h._ended = !1, o._clearTimer(v), !o._webAudio && h._node && !isNaN(h._node.duration) && (h._node.currentTime = f);
                        var w = function() {
                            y && o.play(v, !0), o._emit("seek", v)
                        };
                        if (y && !o._webAudio) {
                            var b = function() {
                                o._playLock ? setTimeout(b, 0) : w()
                            };
                            setTimeout(b, 0)
                        } else w()
                    } else if (o._webAudio) {
                    var P = o.playing(v) ? t.ctx.currentTime - h._playStart : 0,
                        H = h._rateSeek ? h._rateSeek - h._seek : 0;
                    return h._seek + (H + P * Math.abs(h._rate))
                } else return h._node.currentTime;
                return o
            },
            playing: function(o) {
                var a = this;
                if (typeof o == "number") {
                    var f = a._soundById(o);
                    return f ? !f._paused : !1
                }
                for (var v = 0; v < a._sounds.length; v++)
                    if (!a._sounds[v]._paused) return !0;
                return !1
            },
            duration: function(o) {
                var a = this,
                    f = a._duration,
                    v = a._soundById(o);
                return v && (f = a._sprite[v._sprite][1] / 1e3), f
            },
            state: function() {
                return this._state
            },
            unload: function() {
                for (var o = this, a = o._sounds, f = 0; f < a.length; f++) a[f]._paused || o.stop(a[f]._id), o._webAudio || (o._clearSound(a[f]._node), a[f]._node.removeEventListener("error", a[f]._errorFn, !1), a[f]._node.removeEventListener(t._canPlayEvent, a[f]._loadFn, !1), a[f]._node.removeEventListener("ended", a[f]._endFn, !1), t._releaseHtml5Audio(a[f]._node)), delete a[f]._node, o._clearTimer(a[f]._id);
                var v = t._howls.indexOf(o);
                v >= 0 && t._howls.splice(v, 1);
                var g = !0;
                for (f = 0; f < t._howls.length; f++)
                    if (t._howls[f]._src === o._src || o._src.indexOf(t._howls[f]._src) >= 0) {
                        g = !1;
                        break
                    } return s && g && delete s[o._src], t.noAudio = !1, o._state = "unloaded", o._sounds = [], o = null, null
            },
            on: function(o, a, f, v) {
                var g = this,
                    m = g["_on" + o];
                return typeof a == "function" && m.push(v ? {
                    id: f,
                    fn: a,
                    once: v
                } : {
                    id: f,
                    fn: a
                }), g
            },
            off: function(o, a, f) {
                var v = this,
                    g = v["_on" + o],
                    m = 0;
                if (typeof a == "number" && (f = a, a = null), a || f)
                    for (m = 0; m < g.length; m++) {
                        var h = f === g[m].id;
                        if (a === g[m].fn && h || !a && h) {
                            g.splice(m, 1);
                            break
                        }
                    } else if (o) v["_on" + o] = [];
                    else {
                        var y = Object.keys(v);
                        for (m = 0; m < y.length; m++) y[m].indexOf("_on") === 0 && Array.isArray(v[y[m]]) && (v[y[m]] = [])
                    } return v
            },
            once: function(o, a, f) {
                var v = this;
                return v.on(o, a, f, 1), v
            },
            _emit: function(o, a, f) {
                for (var v = this, g = v["_on" + o], m = g.length - 1; m >= 0; m--)(!g[m].id || g[m].id === a || o === "load") && (setTimeout(function(h) {
                    h.call(this, a, f)
                }.bind(v, g[m].fn), 0), g[m].once && v.off(o, g[m].fn, g[m].id));
                return v._loadQueue(o), v
            },
            _loadQueue: function(o) {
                var a = this;
                if (a._queue.length > 0) {
                    var f = a._queue[0];
                    f.event === o && (a._queue.shift(), a._loadQueue()), o || f.action()
                }
                return a
            },
            _ended: function(o) {
                var a = this,
                    f = o._sprite;
                if (!a._webAudio && o._node && !o._node.paused && !o._node.ended && o._node.currentTime < o._stop) return setTimeout(a._ended.bind(a, o), 100), a;
                var v = !!(o._loop || a._sprite[f][2]);
                if (a._emit("end", o._id), !a._webAudio && v && a.stop(o._id, !0).play(o._id), a._webAudio && v) {
                    a._emit("play", o._id), o._seek = o._start || 0, o._rateSeek = 0, o._playStart = t.ctx.currentTime;
                    var g = (o._stop - o._start) * 1e3 / Math.abs(o._rate);
                    a._endTimers[o._id] = setTimeout(a._ended.bind(a, o), g)
                }
                return a._webAudio && !v && (o._paused = !0, o._ended = !0, o._seek = o._start || 0, o._rateSeek = 0, a._clearTimer(o._id), a._cleanBuffer(o._node), t._autoSuspend()), !a._webAudio && !v && a.stop(o._id, !0), a
            },
            _clearTimer: function(o) {
                var a = this;
                if (a._endTimers[o]) {
                    if (typeof a._endTimers[o] != "function") clearTimeout(a._endTimers[o]);
                    else {
                        var f = a._soundById(o);
                        f && f._node && f._node.removeEventListener("ended", a._endTimers[o], !1)
                    }
                    delete a._endTimers[o]
                }
                return a
            },
            _soundById: function(o) {
                for (var a = this, f = 0; f < a._sounds.length; f++)
                    if (o === a._sounds[f]._id) return a._sounds[f];
                return null
            },
            _inactiveSound: function() {
                var o = this;
                o._drain();
                for (var a = 0; a < o._sounds.length; a++)
                    if (o._sounds[a]._ended) return o._sounds[a].reset();
                return new i(o)
            },
            _drain: function() {
                var o = this,
                    a = o._pool,
                    f = 0,
                    v = 0;
                if (!(o._sounds.length < a)) {
                    for (v = 0; v < o._sounds.length; v++) o._sounds[v]._ended && f++;
                    for (v = o._sounds.length - 1; v >= 0; v--) {
                        if (f <= a) return;
                        o._sounds[v]._ended && (o._webAudio && o._sounds[v]._node && o._sounds[v]._node.disconnect(0), o._sounds.splice(v, 1), f--)
                    }
                }
            },
            _getSoundIds: function(o) {
                var a = this;
                if (typeof o > "u") {
                    for (var f = [], v = 0; v < a._sounds.length; v++) f.push(a._sounds[v]._id);
                    return f
                } else return [o]
            },
            _refreshBuffer: function(o) {
                var a = this;
                return o._node.bufferSource = t.ctx.createBufferSource(), o._node.bufferSource.buffer = s[a._src], o._panner ? o._node.bufferSource.connect(o._panner) : o._node.bufferSource.connect(o._node), o._node.bufferSource.loop = o._loop, o._loop && (o._node.bufferSource.loopStart = o._start || 0, o._node.bufferSource.loopEnd = o._stop || 0), o._node.bufferSource.playbackRate.setValueAtTime(o._rate, t.ctx.currentTime), a
            },
            _cleanBuffer: function(o) {
                var a = this,
                    f = t._navigator && t._navigator.vendor.indexOf("Apple") >= 0;
                if (!o.bufferSource) return a;
                if (t._scratchBuffer && o.bufferSource && (o.bufferSource.onended = null, o.bufferSource.disconnect(0), f)) try {
                    o.bufferSource.buffer = t._scratchBuffer
                } catch (v) {}
                return o.bufferSource = null, a
            },
            _clearSound: function(o) {
                var a = /MSIE |Trident\//.test(t._navigator && t._navigator.userAgent);
                a || (o.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
            }
        };
        var i = function(o) {
            this._parent = o, this.init()
        };
        i.prototype = {
            init: function() {
                var o = this,
                    a = o._parent;
                return o._muted = a._muted, o._loop = a._loop, o._volume = a._volume, o._rate = a._rate, o._seek = 0, o._paused = !0, o._ended = !0, o._sprite = "__default", o._id = ++t._counter, a._sounds.push(o), o.create(), o
            },
            create: function() {
                var o = this,
                    a = o._parent,
                    f = t._muted || o._muted || o._parent._muted ? 0 : o._volume;
                return a._webAudio ? (o._node = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), o._node.gain.setValueAtTime(f, t.ctx.currentTime), o._node.paused = !0, o._node.connect(t.masterGain)) : t.noAudio || (o._node = t._obtainHtml5Audio(), o._errorFn = o._errorListener.bind(o), o._node.addEventListener("error", o._errorFn, !1), o._loadFn = o._loadListener.bind(o), o._node.addEventListener(t._canPlayEvent, o._loadFn, !1), o._endFn = o._endListener.bind(o), o._node.addEventListener("ended", o._endFn, !1), o._node.src = a._src, o._node.preload = a._preload === !0 ? "auto" : a._preload, o._node.volume = f * t.volume(), o._node.load()), o
            },
            reset: function() {
                var o = this,
                    a = o._parent;
                return o._muted = a._muted, o._loop = a._loop, o._volume = a._volume, o._rate = a._rate, o._seek = 0, o._rateSeek = 0, o._paused = !0, o._ended = !0, o._sprite = "__default", o._id = ++t._counter, o
            },
            _errorListener: function() {
                var o = this;
                o._parent._emit("loaderror", o._id, o._node.error ? o._node.error.code : 0), o._node.removeEventListener("error", o._errorFn, !1)
            },
            _loadListener: function() {
                var o = this,
                    a = o._parent;
                a._duration = Math.ceil(o._node.duration * 10) / 10, Object.keys(a._sprite).length === 0 && (a._sprite = {
                    __default: [0, a._duration * 1e3]
                }), a._state !== "loaded" && (a._state = "loaded", a._emit("load"), a._loadQueue()), o._node.removeEventListener(t._canPlayEvent, o._loadFn, !1)
            },
            _endListener: function() {
                var o = this,
                    a = o._parent;
                a._duration === 1 / 0 && (a._duration = Math.ceil(o._node.duration * 10) / 10, a._sprite.__default[1] === 1 / 0 && (a._sprite.__default[1] = a._duration * 1e3), a._ended(o)), o._node.removeEventListener("ended", o._endFn, !1)
            }
        };
        var s = {},
            l = function(o) {
                var a = o._src;
                if (s[a]) {
                    o._duration = s[a].duration, d(o);
                    return
                }
                if (/^data:[^;]+;base64,/.test(a)) {
                    for (var f = atob(a.split(",")[1]), v = new Uint8Array(f.length), g = 0; g < f.length; ++g) v[g] = f.charCodeAt(g);
                    c(v.buffer, o)
                } else {
                    var m = new XMLHttpRequest;
                    m.open(o._xhr.method, a, !0), m.withCredentials = o._xhr.withCredentials, m.responseType = "arraybuffer", o._xhr.headers && Object.keys(o._xhr.headers).forEach(function(h) {
                        m.setRequestHeader(h, o._xhr.headers[h])
                    }), m.onload = function() {
                        var h = (m.status + "")[0];
                        if (h !== "0" && h !== "2" && h !== "3") {
                            o._emit("loaderror", null, "Failed loading audio file with status: " + m.status + ".");
                            return
                        }
                        c(m.response, o)
                    }, m.onerror = function() {
                        o._webAudio && (o._html5 = !0, o._webAudio = !1, o._sounds = [], delete s[a], o.load())
                    }, u(m)
                }
            },
            u = function(o) {
                try {
                    o.send()
                } catch (a) {
                    o.onerror()
                }
            },
            c = function(o, a) {
                var f = function() {
                        a._emit("loaderror", null, "Decoding audio data failed.")
                    },
                    v = function(g) {
                        g && a._sounds.length > 0 ? (s[a._src] = g, d(a, g)) : f()
                    };
                typeof Promise < "u" && t.ctx.decodeAudioData.length === 1 ? t.ctx.decodeAudioData(o).then(v).catch(f) : t.ctx.decodeAudioData(o, v, f)
            },
            d = function(o, a) {
                a && !o._duration && (o._duration = a.duration), Object.keys(o._sprite).length === 0 && (o._sprite = {
                    __default: [0, o._duration * 1e3]
                }), o._state !== "loaded" && (o._state = "loaded", o._emit("load"), o._loadQueue())
            },
            p = function() {
                if (t.usingWebAudio) {
                    try {
                        typeof AudioContext < "u" ? t.ctx = new AudioContext : typeof webkitAudioContext < "u" ? t.ctx = new webkitAudioContext : t.usingWebAudio = !1
                    } catch (g) {
                        t.usingWebAudio = !1
                    }
                    t.ctx || (t.usingWebAudio = !1);
                    var o = /iP(hone|od|ad)/.test(t._navigator && t._navigator.platform),
                        a = t._navigator && t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                        f = a ? parseInt(a[1], 10) : null;
                    if (o && f && f < 9) {
                        var v = /safari/.test(t._navigator && t._navigator.userAgent.toLowerCase());
                        t._navigator && !v && (t.usingWebAudio = !1)
                    }
                    t.usingWebAudio && (t.masterGain = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), t.masterGain.gain.setValueAtTime(t._muted ? 0 : t._volume, t.ctx.currentTime), t.masterGain.connect(t.ctx.destination)), t._setup()
                }
            };
        e.Howler = t, e.Howl = r, typeof Ge < "u" ? (Ge.HowlerGlobal = n, Ge.Howler = t, Ge.Howl = r, Ge.Sound = i) : typeof window < "u" && (window.HowlerGlobal = n, window.Howler = t, window.Howl = r, window.Sound = i)
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
            var r = this;
            if (!r.ctx || !r.ctx.listener) return r;
            for (var i = r._howls.length - 1; i >= 0; i--) r._howls[i].stereo(t);
            return r
        }, HowlerGlobal.prototype.pos = function(t, r, i) {
            var s = this;
            if (!s.ctx || !s.ctx.listener) return s;
            if (r = typeof r != "number" ? s._pos[1] : r, i = typeof i != "number" ? s._pos[2] : i, typeof t == "number") s._pos = [t, r, i], typeof s.ctx.listener.positionX < "u" ? (s.ctx.listener.positionX.setTargetAtTime(s._pos[0], Howler.ctx.currentTime, .1), s.ctx.listener.positionY.setTargetAtTime(s._pos[1], Howler.ctx.currentTime, .1), s.ctx.listener.positionZ.setTargetAtTime(s._pos[2], Howler.ctx.currentTime, .1)) : s.ctx.listener.setPosition(s._pos[0], s._pos[1], s._pos[2]);
            else return s._pos;
            return s
        }, HowlerGlobal.prototype.orientation = function(t, r, i, s, l, u) {
            var c = this;
            if (!c.ctx || !c.ctx.listener) return c;
            var d = c._orientation;
            if (r = typeof r != "number" ? d[1] : r, i = typeof i != "number" ? d[2] : i, s = typeof s != "number" ? d[3] : s, l = typeof l != "number" ? d[4] : l, u = typeof u != "number" ? d[5] : u, typeof t == "number") c._orientation = [t, r, i, s, l, u], typeof c.ctx.listener.forwardX < "u" ? (c.ctx.listener.forwardX.setTargetAtTime(t, Howler.ctx.currentTime, .1), c.ctx.listener.forwardY.setTargetAtTime(r, Howler.ctx.currentTime, .1), c.ctx.listener.forwardZ.setTargetAtTime(i, Howler.ctx.currentTime, .1), c.ctx.listener.upX.setTargetAtTime(s, Howler.ctx.currentTime, .1), c.ctx.listener.upY.setTargetAtTime(l, Howler.ctx.currentTime, .1), c.ctx.listener.upZ.setTargetAtTime(u, Howler.ctx.currentTime, .1)) : c.ctx.listener.setOrientation(t, r, i, s, l, u);
            else return d;
            return c
        }, Howl.prototype.init = function(t) {
            return function(r) {
                var i = this;
                return i._orientation = r.orientation || [1, 0, 0], i._stereo = r.stereo || null, i._pos = r.pos || null, i._pannerAttr = {
                    coneInnerAngle: typeof r.coneInnerAngle < "u" ? r.coneInnerAngle : 360,
                    coneOuterAngle: typeof r.coneOuterAngle < "u" ? r.coneOuterAngle : 360,
                    coneOuterGain: typeof r.coneOuterGain < "u" ? r.coneOuterGain : 0,
                    distanceModel: typeof r.distanceModel < "u" ? r.distanceModel : "inverse",
                    maxDistance: typeof r.maxDistance < "u" ? r.maxDistance : 1e4,
                    panningModel: typeof r.panningModel < "u" ? r.panningModel : "HRTF",
                    refDistance: typeof r.refDistance < "u" ? r.refDistance : 1,
                    rolloffFactor: typeof r.rolloffFactor < "u" ? r.rolloffFactor : 1
                }, i._onstereo = r.onstereo ? [{
                    fn: r.onstereo
                }] : [], i._onpos = r.onpos ? [{
                    fn: r.onpos
                }] : [], i._onorientation = r.onorientation ? [{
                    fn: r.onorientation
                }] : [], t.call(this, r)
            }
        }(Howl.prototype.init), Howl.prototype.stereo = function(t, r) {
            var i = this;
            if (!i._webAudio) return i;
            if (i._state !== "loaded") return i._queue.push({
                event: "stereo",
                action: function() {
                    i.stereo(t, r)
                }
            }), i;
            var s = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
            if (typeof r > "u")
                if (typeof t == "number") i._stereo = t, i._pos = [t, 0, 0];
                else return i._stereo;
            for (var l = i._getSoundIds(r), u = 0; u < l.length; u++) {
                var c = i._soundById(l[u]);
                if (c)
                    if (typeof t == "number") c._stereo = t, c._pos = [t, 0, 0], c._node && (c._pannerAttr.panningModel = "equalpower", (!c._panner || !c._panner.pan) && n(c, s), s === "spatial" ? typeof c._panner.positionX < "u" ? (c._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), c._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), c._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : c._panner.setPosition(t, 0, 0) : c._panner.pan.setValueAtTime(t, Howler.ctx.currentTime)), i._emit("stereo", c._id);
                    else return c._stereo
            }
            return i
        }, Howl.prototype.pos = function(t, r, i, s) {
            var l = this;
            if (!l._webAudio) return l;
            if (l._state !== "loaded") return l._queue.push({
                event: "pos",
                action: function() {
                    l.pos(t, r, i, s)
                }
            }), l;
            if (r = typeof r != "number" ? 0 : r, i = typeof i != "number" ? -.5 : i, typeof s > "u")
                if (typeof t == "number") l._pos = [t, r, i];
                else return l._pos;
            for (var u = l._getSoundIds(s), c = 0; c < u.length; c++) {
                var d = l._soundById(u[c]);
                if (d)
                    if (typeof t == "number") d._pos = [t, r, i], d._node && ((!d._panner || d._panner.pan) && n(d, "spatial"), typeof d._panner.positionX < "u" ? (d._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), d._panner.positionY.setValueAtTime(r, Howler.ctx.currentTime), d._panner.positionZ.setValueAtTime(i, Howler.ctx.currentTime)) : d._panner.setPosition(t, r, i)), l._emit("pos", d._id);
                    else return d._pos
            }
            return l
        }, Howl.prototype.orientation = function(t, r, i, s) {
            var l = this;
            if (!l._webAudio) return l;
            if (l._state !== "loaded") return l._queue.push({
                event: "orientation",
                action: function() {
                    l.orientation(t, r, i, s)
                }
            }), l;
            if (r = typeof r != "number" ? l._orientation[1] : r, i = typeof i != "number" ? l._orientation[2] : i, typeof s > "u")
                if (typeof t == "number") l._orientation = [t, r, i];
                else return l._orientation;
            for (var u = l._getSoundIds(s), c = 0; c < u.length; c++) {
                var d = l._soundById(u[c]);
                if (d)
                    if (typeof t == "number") d._orientation = [t, r, i], d._node && (d._panner || (d._pos || (d._pos = l._pos || [0, 0, -.5]), n(d, "spatial")), typeof d._panner.orientationX < "u" ? (d._panner.orientationX.setValueAtTime(t, Howler.ctx.currentTime), d._panner.orientationY.setValueAtTime(r, Howler.ctx.currentTime), d._panner.orientationZ.setValueAtTime(i, Howler.ctx.currentTime)) : d._panner.setOrientation(t, r, i)), l._emit("orientation", d._id);
                    else return d._orientation
            }
            return l
        }, Howl.prototype.pannerAttr = function() {
            var t = this,
                r = arguments,
                i, s, l;
            if (!t._webAudio) return t;
            if (r.length === 0) return t._pannerAttr;
            if (r.length === 1)
                if (typeof r[0] == "object") i = r[0], typeof s > "u" && (i.pannerAttr || (i.pannerAttr = {
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
                else return l = t._soundById(parseInt(r[0], 10)), l ? l._pannerAttr : t._pannerAttr;
            else r.length === 2 && (i = r[0], s = parseInt(r[1], 10));
            for (var u = t._getSoundIds(s), c = 0; c < u.length; c++)
                if (l = t._soundById(u[c]), l) {
                    var d = l._pannerAttr;
                    d = {
                        coneInnerAngle: typeof i.coneInnerAngle < "u" ? i.coneInnerAngle : d.coneInnerAngle,
                        coneOuterAngle: typeof i.coneOuterAngle < "u" ? i.coneOuterAngle : d.coneOuterAngle,
                        coneOuterGain: typeof i.coneOuterGain < "u" ? i.coneOuterGain : d.coneOuterGain,
                        distanceModel: typeof i.distanceModel < "u" ? i.distanceModel : d.distanceModel,
                        maxDistance: typeof i.maxDistance < "u" ? i.maxDistance : d.maxDistance,
                        refDistance: typeof i.refDistance < "u" ? i.refDistance : d.refDistance,
                        rolloffFactor: typeof i.rolloffFactor < "u" ? i.rolloffFactor : d.rolloffFactor,
                        panningModel: typeof i.panningModel < "u" ? i.panningModel : d.panningModel
                    };
                    var p = l._panner;
                    p || (l._pos || (l._pos = t._pos || [0, 0, -.5]), n(l, "spatial"), p = l._panner), p.coneInnerAngle = d.coneInnerAngle, p.coneOuterAngle = d.coneOuterAngle, p.coneOuterGain = d.coneOuterGain, p.distanceModel = d.distanceModel, p.maxDistance = d.maxDistance, p.refDistance = d.refDistance, p.rolloffFactor = d.rolloffFactor, p.panningModel = d.panningModel
                } return t
        }, Sound.prototype.init = function(t) {
            return function() {
                var r = this,
                    i = r._parent;
                r._orientation = i._orientation, r._stereo = i._stereo, r._pos = i._pos, r._pannerAttr = i._pannerAttr, t.call(this), r._stereo ? i.stereo(r._stereo) : r._pos && i.pos(r._pos[0], r._pos[1], r._pos[2], r._id)
            }
        }(Sound.prototype.init), Sound.prototype.reset = function(t) {
            return function() {
                var r = this,
                    i = r._parent;
                return r._orientation = i._orientation, r._stereo = i._stereo, r._pos = i._pos, r._pannerAttr = i._pannerAttr, r._stereo ? i.stereo(r._stereo) : r._pos ? i.pos(r._pos[0], r._pos[1], r._pos[2], r._id) : r._panner && (r._panner.disconnect(0), r._panner = void 0, i._refreshBuffer(r)), t.call(this)
            }
        }(Sound.prototype.reset);
        var n = function(t, r) {
            r = r || "spatial", r === "spatial" ? (t._panner = Howler.ctx.createPanner(), t._panner.coneInnerAngle = t._pannerAttr.coneInnerAngle, t._panner.coneOuterAngle = t._pannerAttr.coneOuterAngle, t._panner.coneOuterGain = t._pannerAttr.coneOuterGain, t._panner.distanceModel = t._pannerAttr.distanceModel, t._panner.maxDistance = t._pannerAttr.maxDistance, t._panner.refDistance = t._pannerAttr.refDistance, t._panner.rolloffFactor = t._pannerAttr.rolloffFactor, t._panner.panningModel = t._pannerAttr.panningModel, typeof t._panner.positionX < "u" ? (t._panner.positionX.setValueAtTime(t._pos[0], Howler.ctx.currentTime), t._panner.positionY.setValueAtTime(t._pos[1], Howler.ctx.currentTime), t._panner.positionZ.setValueAtTime(t._pos[2], Howler.ctx.currentTime)) : t._panner.setPosition(t._pos[0], t._pos[1], t._pos[2]), typeof t._panner.orientationX < "u" ? (t._panner.orientationX.setValueAtTime(t._orientation[0], Howler.ctx.currentTime), t._panner.orientationY.setValueAtTime(t._orientation[1], Howler.ctx.currentTime), t._panner.orientationZ.setValueAtTime(t._orientation[2], Howler.ctx.currentTime)) : t._panner.setOrientation(t._orientation[0], t._orientation[1], t._orientation[2])) : (t._panner = Howler.ctx.createStereoPanner(), t._panner.pan.setValueAtTime(t._stereo, Howler.ctx.currentTime)), t._panner.connect(t._node), t._paused || t._parent.pause(t._id, !0).play(t._id, !0)
        }
    })()
})(fn);
const vs = () => {},
    hs = e => e instanceof Function ? e() : e,
    Jr = async e => new Promise(n => setTimeout(n, e)), Ol = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent), ur = e => new URLSearchParams(window.location.search).get(e), si = ur("muted"), Dl = !si || si === "1", El = {
        muted: Dl
    }, [fo, ms] = Wt(El);
Gt(() => {
    document.addEventListener("visibilitychange", () => {
        const e = fo.muted;
        document.hidden ? fn.Howler.mute(!0) : e || fn.Howler.mute(!1)
    })
});
ge(() => {
    const e = fo.muted;
    fn.Howler.mute(e)
});
const Cl = () => {
        ms("muted", e => !e)
    },
    Ml = e => {
        ms("muted", e)
    },
    St = {
        options: fo,
        toggleMute: Cl,
        setMute: Ml
    },
    ct = (e, n = {}) => {
        const [t, r] = Y(null), [i, s] = Y(!1);
        ge(() => {
            const o = fe(t);
            o == null || o.unload(), r(null);
            const a = hs(e);
            !a || Array.isArray(a) && a.length === 0 || new fn.Howl({
                src: a,
                html5: n.html5,
                autoplay: n.autoplay,
                loop: n.loop,
                sprite: n.sprite,
                onload: function() {
                    r(this)
                },
                onplayerror: function(f, v) {
                    typeof v == "string" && v.includes("Playback was unable to start") && s(!0)
                }
            })
        }), Ae(() => {
            var o;
            (o = t()) == null || o.unload()
        });
        const l = (o, a = {}) => {
                const f = t();
                if (f) return a.interrupt && f.stop(), f.play(o)
            },
            u = o => {
                var a;
                return (a = t()) == null ? void 0 : a.stop(o)
            },
            c = o => {
                var a;
                return (a = t()) == null ? void 0 : a.pause(o)
            },
            d = () => {
                const o = t();
                o && (o.playing() ? o.pause() : o.play())
            },
            p = o => {
                var a;
                return (a = t()) == null ? void 0 : a.volume(o)
            };
        return ge(() => {
            var f;
            const o = St.options.muted,
                a = fe(i);
            !o && a && ((f = t()) == null || f.play(), s(!1))
        }), {
            internalInstance: t,
            play: l,
            stop: u,
            pause: c,
            toggle: d,
            setVolume: p
        }
    },
    jl = [{
        src: {
            mp3: "ambient-tracks/ambient-track/ambient-5.mp3",
            webm: "ambient-tracks/ambient-track/ambient-5.webm"
        },
        postDate: "2023-12-7"
    }],
    Bl = "modulepreload",
    Ll = function(e) {
        return "/" + e
    },
    ai = {},
    Rl = function(n, t, r) {
        if (!t || t.length === 0) return n();
        const i = document.getElementsByTagName("link");
        return Promise.all(t.map(s => {
            if (s = Ll(s), s in ai) return;
            ai[s] = !0;
            const l = s.endsWith(".css"),
                u = l ? '[rel="stylesheet"]' : "";
            if (!!r)
                for (let p = i.length - 1; p >= 0; p--) {
                    const o = i[p];
                    if (o.href === s && (!l || o.rel === "stylesheet")) return
                } else if (document.querySelector('link[href="'.concat(s, '"]').concat(u))) return;
            const d = document.createElement("link");
            if (d.rel = l ? "stylesheet" : Bl, l || (d.as = "script", d.crossOrigin = ""), d.href = s, document.head.appendChild(d), l) return new Promise((p, o) => {
                d.addEventListener("load", p), d.addEventListener("error", () => o(new Error("Unable to preload CSS for ".concat(s))))
            })
        })).then(() => n()).catch(s => {
            const l = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (l.payload = s, window.dispatchEvent(l), !l.defaultPrevented) throw s
        })
    },
    _s = "Asia/Tokyo";
var ys = {
    exports: {}
};
(function(e, n) {
    (function(t, r) {
        e.exports = r()
    })(Ge, function() {
        var t = 1e3,
            r = 6e4,
            i = 36e5,
            s = "millisecond",
            l = "second",
            u = "minute",
            c = "hour",
            d = "day",
            p = "week",
            o = "month",
            a = "quarter",
            f = "year",
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
                        T = M % 100;
                    return "[" + M + (I[(T - 20) % 10] || I[T] || I[0]) + "]"
                }
            },
            w = function(M, I, T) {
                var x = String(M);
                return !x || x.length >= I ? M : "" + Array(I + 1 - x.length).join(T) + M
            },
            b = {
                s: w,
                z: function(M) {
                    var I = -M.utcOffset(),
                        T = Math.abs(I),
                        x = Math.floor(T / 60),
                        A = T % 60;
                    return (I <= 0 ? "+" : "-") + w(x, 2, "0") + ":" + w(A, 2, "0")
                },
                m: function M(I, T) {
                    if (I.date() < T.date()) return -M(T, I);
                    var x = 12 * (T.year() - I.year()) + (T.month() - I.month()),
                        A = I.clone().add(x, o),
                        E = T - A < 0,
                        $ = I.clone().add(x + (E ? -1 : 1), o);
                    return +(-(x + (T - A) / (E ? A - $ : $ - A)) || 0)
                },
                a: function(M) {
                    return M < 0 ? Math.ceil(M) || 0 : Math.floor(M)
                },
                p: function(M) {
                    return {
                        M: o,
                        y: f,
                        w: p,
                        d,
                        D: v,
                        h: c,
                        m: u,
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
            H = {};
        H[P] = y;
        var W = "$isDayjsObject",
            B = function(M) {
                return M instanceof J || !(!M || !M[W])
            },
            j = function M(I, T, x) {
                var A;
                if (!I) return P;
                if (typeof I == "string") {
                    var E = I.toLowerCase();
                    H[E] && (A = E), T && (H[E] = T, A = E);
                    var $ = I.split("-");
                    if (!A && $.length > 1) return M($[0])
                } else {
                    var U = I.name;
                    H[U] = I, A = U
                }
                return !x && A && (P = A), A || !x && P
            },
            z = function(M, I) {
                if (B(M)) return M.clone();
                var T = typeof I == "object" ? I : {};
                return T.date = M, T.args = arguments, new J(T)
            },
            L = b;
        L.l = j, L.i = B, L.w = function(M, I) {
            return z(M, {
                locale: I.$L,
                utc: I.$u,
                x: I.$x,
                $offset: I.$offset
            })
        };
        var J = function() {
                function M(T) {
                    this.$L = j(T.locale, null, !0), this.parse(T), this.$x = this.$x || T.x || {}, this[W] = !0
                }
                var I = M.prototype;
                return I.parse = function(T) {
                    this.$d = function(x) {
                        var A = x.date,
                            E = x.utc;
                        if (A === null) return new Date(NaN);
                        if (L.u(A)) return new Date;
                        if (A instanceof Date) return new Date(A);
                        if (typeof A == "string" && !/Z$/i.test(A)) {
                            var $ = A.match(m);
                            if ($) {
                                var U = $[2] - 1 || 0,
                                    G = ($[7] || "0").substring(0, 3);
                                return E ? new Date(Date.UTC($[1], U, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, G)) : new Date($[1], U, $[3] || 1, $[4] || 0, $[5] || 0, $[6] || 0, G)
                            }
                        }
                        return new Date(A)
                    }(T), this.init()
                }, I.init = function() {
                    var T = this.$d;
                    this.$y = T.getFullYear(), this.$M = T.getMonth(), this.$D = T.getDate(), this.$W = T.getDay(), this.$H = T.getHours(), this.$m = T.getMinutes(), this.$s = T.getSeconds(), this.$ms = T.getMilliseconds()
                }, I.$utils = function() {
                    return L
                }, I.isValid = function() {
                    return this.$d.toString() !== g
                }, I.isSame = function(T, x) {
                    var A = z(T);
                    return this.startOf(x) <= A && A <= this.endOf(x)
                }, I.isAfter = function(T, x) {
                    return z(T) < this.startOf(x)
                }, I.isBefore = function(T, x) {
                    return this.endOf(x) < z(T)
                }, I.$g = function(T, x, A) {
                    return L.u(T) ? this[x] : this.set(A, T)
                }, I.unix = function() {
                    return Math.floor(this.valueOf() / 1e3)
                }, I.valueOf = function() {
                    return this.$d.getTime()
                }, I.startOf = function(T, x) {
                    var A = this,
                        E = !!L.u(x) || x,
                        $ = L.p(T),
                        U = function(F, R) {
                            var Z = L.w(A.$u ? Date.UTC(A.$y, R, F) : new Date(A.$y, R, F), A);
                            return E ? Z : Z.endOf(d)
                        },
                        G = function(F, R) {
                            return L.w(A.toDate()[F].apply(A.toDate("s"), (E ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(R)), A)
                        },
                        K = this.$W,
                        X = this.$M,
                        ne = this.$D,
                        _e = "set" + (this.$u ? "UTC" : "");
                    switch ($) {
                        case f:
                            return E ? U(1, 0) : U(31, 11);
                        case o:
                            return E ? U(1, X) : U(0, X + 1);
                        case p:
                            var O = this.$locale().weekStart || 0,
                                N = (K < O ? K + 7 : K) - O;
                            return U(E ? ne - N : ne + (6 - N), X);
                        case d:
                        case v:
                            return G(_e + "Hours", 0);
                        case c:
                            return G(_e + "Minutes", 1);
                        case u:
                            return G(_e + "Seconds", 2);
                        case l:
                            return G(_e + "Milliseconds", 3);
                        default:
                            return this.clone()
                    }
                }, I.endOf = function(T) {
                    return this.startOf(T, !1)
                }, I.$set = function(T, x) {
                    var A, E = L.p(T),
                        $ = "set" + (this.$u ? "UTC" : ""),
                        U = (A = {}, A[d] = $ + "Date", A[v] = $ + "Date", A[o] = $ + "Month", A[f] = $ + "FullYear", A[c] = $ + "Hours", A[u] = $ + "Minutes", A[l] = $ + "Seconds", A[s] = $ + "Milliseconds", A)[E],
                        G = E === d ? this.$D + (x - this.$W) : x;
                    if (E === o || E === f) {
                        var K = this.clone().set(v, 1);
                        K.$d[U](G), K.init(), this.$d = K.set(v, Math.min(this.$D, K.daysInMonth())).$d
                    } else U && this.$d[U](G);
                    return this.init(), this
                }, I.set = function(T, x) {
                    return this.clone().$set(T, x)
                }, I.get = function(T) {
                    return this[L.p(T)]()
                }, I.add = function(T, x) {
                    var A, E = this;
                    T = Number(T);
                    var $ = L.p(x),
                        U = function(X) {
                            var ne = z(E);
                            return L.w(ne.date(ne.date() + Math.round(X * T)), E)
                        };
                    if ($ === o) return this.set(o, this.$M + T);
                    if ($ === f) return this.set(f, this.$y + T);
                    if ($ === d) return U(1);
                    if ($ === p) return U(7);
                    var G = (A = {}, A[u] = r, A[c] = i, A[l] = t, A)[$] || 1,
                        K = this.$d.getTime() + T * G;
                    return L.w(K, this)
                }, I.subtract = function(T, x) {
                    return this.add(-1 * T, x)
                }, I.format = function(T) {
                    var x = this,
                        A = this.$locale();
                    if (!this.isValid()) return A.invalidDate || g;
                    var E = T || "YYYY-MM-DDTHH:mm:ssZ",
                        $ = L.z(this),
                        U = this.$H,
                        G = this.$m,
                        K = this.$M,
                        X = A.weekdays,
                        ne = A.months,
                        _e = A.meridiem,
                        O = function(R, Z, q, ve) {
                            return R && (R[Z] || R(x, E)) || q[Z].slice(0, ve)
                        },
                        N = function(R) {
                            return L.s(U % 12 || 12, R, "0")
                        },
                        F = _e || function(R, Z, q) {
                            var ve = R < 12 ? "AM" : "PM";
                            return q ? ve.toLowerCase() : ve
                        };
                    return E.replace(h, function(R, Z) {
                        return Z || function(q) {
                            switch (q) {
                                case "YY":
                                    return String(x.$y).slice(-2);
                                case "YYYY":
                                    return L.s(x.$y, 4, "0");
                                case "M":
                                    return K + 1;
                                case "MM":
                                    return L.s(K + 1, 2, "0");
                                case "MMM":
                                    return O(A.monthsShort, K, ne, 3);
                                case "MMMM":
                                    return O(ne, K);
                                case "D":
                                    return x.$D;
                                case "DD":
                                    return L.s(x.$D, 2, "0");
                                case "d":
                                    return String(x.$W);
                                case "dd":
                                    return O(A.weekdaysMin, x.$W, X, 2);
                                case "ddd":
                                    return O(A.weekdaysShort, x.$W, X, 3);
                                case "dddd":
                                    return X[x.$W];
                                case "H":
                                    return String(U);
                                case "HH":
                                    return L.s(U, 2, "0");
                                case "h":
                                    return N(1);
                                case "hh":
                                    return N(2);
                                case "a":
                                    return F(U, G, !0);
                                case "A":
                                    return F(U, G, !1);
                                case "m":
                                    return String(G);
                                case "mm":
                                    return L.s(G, 2, "0");
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
                }, I.diff = function(T, x, A) {
                    var E, $ = this,
                        U = L.p(x),
                        G = z(T),
                        K = (G.utcOffset() - this.utcOffset()) * r,
                        X = this - G,
                        ne = function() {
                            return L.m($, G)
                        };
                    switch (U) {
                        case f:
                            E = ne() / 12;
                            break;
                        case o:
                            E = ne();
                            break;
                        case a:
                            E = ne() / 3;
                            break;
                        case p:
                            E = (X - K) / 6048e5;
                            break;
                        case d:
                            E = (X - K) / 864e5;
                            break;
                        case c:
                            E = X / i;
                            break;
                        case u:
                            E = X / r;
                            break;
                        case l:
                            E = X / t;
                            break;
                        default:
                            E = X
                    }
                    return A ? E : L.a(E)
                }, I.daysInMonth = function() {
                    return this.endOf(o).$D
                }, I.$locale = function() {
                    return H[this.$L]
                }, I.locale = function(T, x) {
                    if (!T) return this.$L;
                    var A = this.clone(),
                        E = j(T, x, !0);
                    return E && (A.$L = E), A
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
            de = J.prototype;
        return z.prototype = de, [
            ["$ms", s],
            ["$s", l],
            ["$m", u],
            ["$H", c],
            ["$W", d],
            ["$M", o],
            ["$y", f],
            ["$D", v]
        ].forEach(function(M) {
            de[M[1]] = function(I) {
                return this.$g(I, M[0], M[1])
            }
        }), z.extend = function(M, I) {
            return M.$i || (M(I, J, z), M.$i = !0), z
        }, z.locale = j, z.isDayjs = B, z.unix = function(M) {
            return z(1e3 * M)
        }, z.en = H[P], z.Ls = H, z.p = {}, z
    })
})(ys);
var Vl = ys.exports;
const Qe = bn(Vl);
var bs = {
    exports: {}
};
(function(e, n) {
    (function(t, r) {
        e.exports = r()
    })(Ge, function() {
        return function(t, r) {
            r.prototype.isSameOrBefore = function(i, s) {
                return this.isSame(i, s) || this.isBefore(i, s)
            }
        }
    })
})(bs);
var zl = bs.exports;
const Nl = bn(zl);
var ws = {
    exports: {}
};
(function(e, n) {
    (function(t, r) {
        e.exports = r()
    })(Ge, function() {
        var t = "minute",
            r = /[+-]\d\d(?::?\d\d)?/g,
            i = /([+-]|\d\d)/g;
        return function(s, l, u) {
            var c = l.prototype;
            u.utc = function(g) {
                var m = {
                    date: g,
                    utc: !0,
                    args: arguments
                };
                return new l(m)
            }, c.utc = function(g) {
                var m = u(this.toDate(), {
                    locale: this.$L,
                    utc: !0
                });
                return g ? m.add(this.utcOffset(), t) : m
            }, c.local = function() {
                return u(this.toDate(), {
                    locale: this.$L,
                    utc: !1
                })
            };
            var d = c.parse;
            c.parse = function(g) {
                g.utc && (this.$u = !0), this.$utils().u(g.$offset) || (this.$offset = g.$offset), d.call(this, g)
            };
            var p = c.init;
            c.init = function() {
                if (this.$u) {
                    var g = this.$d;
                    this.$y = g.getUTCFullYear(), this.$M = g.getUTCMonth(), this.$D = g.getUTCDate(), this.$W = g.getUTCDay(), this.$H = g.getUTCHours(), this.$m = g.getUTCMinutes(), this.$s = g.getUTCSeconds(), this.$ms = g.getUTCMilliseconds()
                } else p.call(this)
            };
            var o = c.utcOffset;
            c.utcOffset = function(g, m) {
                var h = this.$utils().u;
                if (h(g)) return this.$u ? 0 : h(this.$offset) ? o.call(this) : this.$offset;
                if (typeof g == "string" && (g = function(P) {
                        P === void 0 && (P = "");
                        var H = P.match(r);
                        if (!H) return null;
                        var W = ("" + H[0]).match(i) || ["-", 0, 0],
                            B = W[0],
                            j = 60 * +W[1] + +W[2];
                        return j === 0 ? 0 : B === "+" ? j : -j
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
            var a = c.format;
            c.format = function(g) {
                var m = g || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
                return a.call(this, m)
            }, c.valueOf = function() {
                var g = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
                return this.$d.valueOf() - 6e4 * g
            }, c.isUTC = function() {
                return !!this.$u
            }, c.toISOString = function() {
                return this.toDate().toISOString()
            }, c.toString = function() {
                return this.toDate().toUTCString()
            };
            var f = c.toDate;
            c.toDate = function(g) {
                return g === "s" && this.$offset ? u(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : f.call(this)
            };
            var v = c.diff;
            c.diff = function(g, m, h) {
                if (g && this.$u === g.$u) return v.call(this, g, m, h);
                var y = this.local(),
                    w = u(g).local();
                return v.call(y, w, m, h)
            }
        }
    })
})(ws);
var Hl = ws.exports;
const Ul = bn(Hl);
var As = {
    exports: {}
};
(function(e, n) {
    (function(t, r) {
        e.exports = r()
    })(Ge, function() {
        var t = {
                year: 0,
                month: 1,
                day: 2,
                hour: 3,
                minute: 4,
                second: 5
            },
            r = {};
        return function(i, s, l) {
            var u, c = function(a, f, v) {
                    v === void 0 && (v = {});
                    var g = new Date(a),
                        m = function(h, y) {
                            y === void 0 && (y = {});
                            var w = y.timeZoneName || "short",
                                b = h + "|" + w,
                                P = r[b];
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
                            }), r[b] = P), P
                        }(f, v);
                    return m.formatToParts(g)
                },
                d = function(a, f) {
                    for (var v = c(a, f), g = [], m = 0; m < v.length; m += 1) {
                        var h = v[m],
                            y = h.type,
                            w = h.value,
                            b = t[y];
                        b >= 0 && (g[b] = parseInt(w, 10))
                    }
                    var P = g[3],
                        H = P === 24 ? 0 : P,
                        W = g[0] + "-" + g[1] + "-" + g[2] + " " + H + ":" + g[4] + ":" + g[5] + ":000",
                        B = +a;
                    return (l.utc(W).valueOf() - (B -= B % 1e3)) / 6e4
                },
                p = s.prototype;
            p.tz = function(a, f) {
                a === void 0 && (a = u);
                var v = this.utcOffset(),
                    g = this.toDate(),
                    m = g.toLocaleString("en-US", {
                        timeZone: a
                    }),
                    h = Math.round((g - new Date(m)) / 1e3 / 60),
                    y = l(m, {
                        locale: this.$L
                    }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(g.getTimezoneOffset() / 15) - h, !0);
                if (f) {
                    var w = y.utcOffset();
                    y = y.add(v - w, "minute")
                }
                return y.$x.$timezone = a, y
            }, p.offsetName = function(a) {
                var f = this.$x.$timezone || l.tz.guess(),
                    v = c(this.valueOf(), f, {
                        timeZoneName: a
                    }).find(function(g) {
                        return g.type.toLowerCase() === "timezonename"
                    });
                return v && v.value
            };
            var o = p.startOf;
            p.startOf = function(a, f) {
                if (!this.$x || !this.$x.$timezone) return o.call(this, a, f);
                var v = l(this.format("YYYY-MM-DD HH:mm:ss:SSS"), {
                    locale: this.$L
                });
                return o.call(v, a, f).tz(this.$x.$timezone, !0)
            }, l.tz = function(a, f, v) {
                var g = v && f,
                    m = v || f || u,
                    h = d(+l(), m);
                if (typeof a != "string") return l(a).tz(m);
                var y = function(H, W, B) {
                        var j = H - 60 * W * 1e3,
                            z = d(j, B);
                        if (W === z) return [j, W];
                        var L = d(j -= 60 * (z - W) * 1e3, B);
                        return z === L ? [j, z] : [H - 60 * Math.min(z, L) * 1e3, Math.max(z, L)]
                    }(l.utc(a, g).valueOf(), h, m),
                    w = y[0],
                    b = y[1],
                    P = l(w).utcOffset(b);
                return P.$x.$timezone = m, P
            }, l.tz.guess = function() {
                return Intl.DateTimeFormat().resolvedOptions().timeZone
            }, l.tz.setDefault = function(a) {
                u = a
            }
        }
    })
})(As);
var Fl = As.exports;
const Gl = bn(Fl);
Qe.extend(Ul);
Qe.extend(Gl);
Qe.extend(Nl);
const Zl = e => Qe(e),
    xs = (e, n, t, r = 0) => Qe(e).set("hour", n).set("minute", t).set("second", r),
    Ss = e => Qe().tz(e),
    Wl = (e, n) => Qe(e).format(n),
    Yl = (e, n) => Qe(e).isSameOrBefore(n),
    ks = (e, n) => Qe(e).isAfter(n),
    ql = void 0;
Wt(ql);
const Yt = e => () => e,
    Kl = "/assets/ambient-5-053c88d0.mp3",
    Ql = "/assets/ambient-5-a1dff721.webm",
    Jl = "/assets/answering-machine-colt-7d1b52ae.mp3",
    Xl = "/assets/answering-machine-colt-494d7d6b.webm",
    ec = "/assets/logbook-1-0fb8b45d.jpg",
    tc = "/assets/logbook-10-bdea2a5b.jpg",
    nc = "/assets/logbook-11-4c9da7f0.jpg",
    rc = "/assets/logbook-12-60bf2721.jpg",
    oc = "/assets/logbook-13-e5cbd10b.jpg",
    ic = "/assets/logbook-14-27366e53.jpg",
    sc = "/assets/logbook-15-0adb8736.jpg",
    ac = "/assets/logbook-16-860ce45f.jpg",
    lc = "/assets/logbook-17-ba5cf8ce.jpg",
    cc = "/assets/logbook-18-48f79d3a.jpg",
    uc = "/assets/logbook-19-52a7ff56.jpg",
    fc = "/assets/logbook-2-f34a92a7.jpg",
    dc = "/assets/logbook-20-15976a74.jpg",
    pc = "/assets/logbook-21-b4a77799.jpg",
    gc = "/assets/logbook-22-281b5db1.jpg",
    vc = "/assets/logbook-23-c9e4daa7.png",
    hc = "/assets/logbook-24-b785439c.png",
    mc = "/assets/logbook-25-22c36767.png",
    _c = "/assets/logbook-26-916e5aa9.jpg",
    yc = "/assets/logbook-27-2eef6902.jpg",
    bc = "/assets/logbook-28-2900b975.jpg",
    wc = "/assets/logbook-29-e3169f79.jpg",
    Ac = "/assets/logbook-3-702b48ec.jpg",
    xc = "/assets/logbook-30-3efd9af2.jpg",
    Sc = "/assets/logbook-31-a5e2bcf3.jpg",
    kc = "/assets/logbook-32-286b0b8e.jpg",
    Tc = "/assets/logbook-33-36f2c83d.jpg",
    $c = "/assets/logbook-34-21d5163f.jpg",
    Ic = "/assets/logbook-35-7418861b.jpg",
    Pc = "/assets/logbook-36-945743f5.jpg",
    Oc = "/assets/logbook-37-683c1780.jpg",
    Dc = "/assets/logbook-38-b5cc33c7.jpg",
    Ec = "/assets/logbook-39-ceff66a3.jpg",
    Cc = "/assets/logbook-4-e1e4d6b8.jpg",
    Mc = "/assets/logbook-40-46fb910b.jpg",
    jc = "/assets/logbook-41-db49b00c.jpg",
    Bc = "/assets/logbook-42-1-4d055fa2.jpg",
    Lc = "/assets/logbook-42-fef2fc38.jpg",
    Rc = "/assets/logbook-5-b07340b1.jpg",
    Vc = "/assets/logbook-6-aad79ad3.jpg",
    zc = "/assets/logbook-7-447b8550.jpg",
    Nc = "/assets/logbook-8-75782f09.jpg",
    Hc = "/assets/logbook-9-5c82ced1.jpg",
    Uc = "/assets/bg-1db347d5.png",
    Fc = "/assets/transition-video-a5d6f592.mp4",
    je = e => new URL(Object.assign({
        "../../../content/assets/ambient-tracks/ambient-track/ambient-5.mp3": Kl,
        "../../../content/assets/ambient-tracks/ambient-track/ambient-5.webm": Ql,
        "../../../content/assets/answering-machine/message-track/answering-machine-colt.mp3": Jl,
        "../../../content/assets/answering-machine/message-track/answering-machine-colt.webm": Xl,
        "../../../content/assets/logs/log/logbook-1.jpg": ec,
        "../../../content/assets/logs/log/logbook-10.jpg": tc,
        "../../../content/assets/logs/log/logbook-11.jpg": nc,
        "../../../content/assets/logs/log/logbook-12.jpg": rc,
        "../../../content/assets/logs/log/logbook-13.jpg": oc,
        "../../../content/assets/logs/log/logbook-14.jpg": ic,
        "../../../content/assets/logs/log/logbook-15.jpg": sc,
        "../../../content/assets/logs/log/logbook-16.jpg": ac,
        "../../../content/assets/logs/log/logbook-17.jpg": lc,
        "../../../content/assets/logs/log/logbook-18.jpg": cc,
        "../../../content/assets/logs/log/logbook-19.jpg": uc,
        "../../../content/assets/logs/log/logbook-2.jpg": fc,
        "../../../content/assets/logs/log/logbook-20.jpg": dc,
        "../../../content/assets/logs/log/logbook-21.jpg": pc,
        "../../../content/assets/logs/log/logbook-22.jpg": gc,
        "../../../content/assets/logs/log/logbook-23.png": vc,
        "../../../content/assets/logs/log/logbook-24.png": hc,
        "../../../content/assets/logs/log/logbook-25.png": mc,
        "../../../content/assets/logs/log/logbook-26.jpg": _c,
        "../../../content/assets/logs/log/logbook-27.jpg": yc,
        "../../../content/assets/logs/log/logbook-28.jpg": bc,
        "../../../content/assets/logs/log/logbook-29.jpg": wc,
        "../../../content/assets/logs/log/logbook-3.jpg": Ac,
        "../../../content/assets/logs/log/logbook-30.jpg": xc,
        "../../../content/assets/logs/log/logbook-31.jpg": Sc,
        "../../../content/assets/logs/log/logbook-32.jpg": kc,
        "../../../content/assets/logs/log/logbook-33.jpg": Tc,
        "../../../content/assets/logs/log/logbook-34.jpg": $c,
        "../../../content/assets/logs/log/logbook-35.jpg": Ic,
        "../../../content/assets/logs/log/logbook-36.jpg": Pc,
        "../../../content/assets/logs/log/logbook-37.jpg": Oc,
        "../../../content/assets/logs/log/logbook-38.jpg": Dc,
        "../../../content/assets/logs/log/logbook-39.jpg": Ec,
        "../../../content/assets/logs/log/logbook-4.jpg": Cc,
        "../../../content/assets/logs/log/logbook-40.jpg": Mc,
        "../../../content/assets/logs/log/logbook-41.jpg": jc,
        "../../../content/assets/logs/log/logbook-42-1.jpg": Bc,
        "../../../content/assets/logs/log/logbook-42.jpg": Lc,
        "../../../content/assets/logs/log/logbook-5.jpg": Rc,
        "../../../content/assets/logs/log/logbook-6.jpg": Vc,
        "../../../content/assets/logs/log/logbook-7.jpg": zc,
        "../../../content/assets/logs/log/logbook-8.jpg": Nc,
        "../../../content/assets/logs/log/logbook-9.jpg": Hc,
        "../../../content/assets/scenes/scene/bg.png": Uc,
        "../../../content/assets/scenes/scene/transition-video.mp4": Fc
    })["../../../content/assets/".concat(e)], self.location).href,
    Gc = jl,
    Zc = Yt(Gc),
    li = () => {
        const e = Zc()[0];
        return mt(ye({}, e), {
            srcWebm: je(e.src.webm),
            srcMp3: je(e.src.mp3)
        })
    },
    Wc = [{
        src: {
            mp3: "answering-machine/message-track/answering-machine-colt.mp3",
            webm: "answering-machine/message-track/answering-machine-colt.webm"
        },
        postDate: "2023-12-04"
    }],
    Yc = Wc,
    qc = Yt(Yc),
    sn = () => {
        const e = qc()[0];
        if (e) return mt(ye({}, e), {
            srcWebm: je(e.src.webm),
            srcMp3: je(e.src.mp3)
        })
    },
    Kc = "/assets/background-music-83982c9a.webm",
    Qc = "/assets/background-music-f98c94df.mp3";

function Jc(e) {
    return e !== null && (typeof e == "object" || typeof e == "function")
}

function ci(e, ...n) {
    return typeof e == "function" ? e(...n) : e
}
var Xc = (e => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, {
        get: (n, t) => (typeof require < "u" ? require : n)[t]
    }) : e)(function(e) {
        if (typeof require < "u") return require.apply(this, arguments);
        throw Error('Dynamic require of "' + e + '" is not supported')
    }),
    eu = e => (typeof e.clear == "function" || (e.clear = () => {
        let n;
        for (; n = e.key(0);) e.removeItem(n)
    }), e),
    tu = e => {
        if (!e) return "";
        let n = "";
        for (const t in e) {
            if (!e.hasOwnProperty(t)) continue;
            const r = e[t];
            n += r instanceof Date ? "; ".concat(t, "=").concat(r.toUTCString()) : typeof r == "boolean" ? "; ".concat(t) : "; ".concat(t, "=").concat(r)
        }
        return n
    },
    ui;
try {
    ui = Xc("solid-start/server").useRequest
} catch (e) {
    ui = () => (console.warn("It seems you attempt to use cookieStorage on the server without having solid-start installed"), {
        request: {
            headers: {
                get: () => ""
            }
        }
    })
}
var _t = eu({
    _read: () => document.cookie,
    _write: (e, n, t) => {
        document.cookie = "".concat(e, "=").concat(n).concat(tu(t))
    },
    getItem: (e, n) => {
        var t, r;
        return (r = (t = _t._read(n).match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)")) == null ? void 0 : t.pop()) != null ? r : null
    },
    setItem: (e, n, t) => {
        const r = _t.getItem(e);
        _t._write(e, n, t);
        const i = Object.assign(new Event("storage"), {
            key: e,
            oldValue: r,
            newValue: n,
            url: globalThis.document.URL,
            storageArea: _t
        });
        window.dispatchEvent(i)
    },
    removeItem: e => {
        _t._write(e, "deleted", {
            expires: new Date(0)
        })
    },
    key: e => {
        let n = null,
            t = 0;
        return _t._read().replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g, (r, i) => (!n && i && t++ === e && (n = i), "")), n
    },
    get length() {
        let e = 0;
        return _t._read().replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g, n => (e += n ? 1 : 0, "")), e
    }
});

function nu(e, n = {}) {
    const t = n.storage || globalThis.localStorage;
    if (!t) return e;
    const r = n.name || "storage-".concat(ss()),
        i = n.serialize || JSON.stringify.bind(JSON),
        s = n.deserialize || JSON.parse.bind(JSON),
        l = t.getItem(r, n.storageOptions),
        u = typeof e[0] == "function" ? d => e[1](() => s(d)) : d => e[1](Tl(s(d)));
    let c = !0;
    return l instanceof Promise ? l.then(d => c && d && u(d)) : l && u(l), [e[0], typeof e[0] == "function" ? d => {
        const p = e[1](d);
        return d != null ? t.setItem(r, i(p), n.storageOptions) : t.removeItem(r), c = !1, p
    } : (...d) => {
        e[1](...d), t.setItem(r, i(fe(() => e[0])), n.storageOptions), c = !1
    }]
}
const ru = [{
        playlistId: "1783122934027513149",
        postDate: "2023-12-13",
        dropTime: {
            hours: 20,
            minutes: 58,
            seconds: 32
        }
    }, {
        playlistId: "1783122902429600477",
        postDate: "2023-12-11",
        dropTime: {
            hours: 18,
            minutes: 43,
            seconds: 31
        }
    }, {
        playlistId: "1783122695437512611",
        postDate: "2023-12-09",
        dropTime: {
            hours: 18,
            minutes: 21,
            seconds: 0
        }
    }, {
        playlistId: "1783122663501118808",
        postDate: "2023-12-08",
        dropTime: {
            hours: 15,
            minutes: 37,
            seconds: 12
        }
    }, {
        playlistId: "1783122613423251565",
        postDate: "2023-12-06",
        dropTime: {
            hours: 18,
            minutes: 41,
            seconds: 14
        }
    }, {
        playlistId: "1783122284473429381",
        postDate: "2023-12-04",
        dropTime: {
            hours: 13,
            minutes: 4,
            seconds: 40
        }
    }, {
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
    ou = ru,
    iu = Yt(ou),
    dn = () => iu().map(n => mt(ye({}, n), {
        postDate: Zl(n.postDate).subtract(2, "day").format("YYYY-MM-DD")
    })),
    su = ur("skip-data-usage-warning"),
    au = {
        isInstructionsModalViewed: !1,
        isDataUsageWarningDialogAccepted: su === "true"
    },
    [ft, wn] = nu(Wt(au), {
        name: "notifications-manager-data"
    }),
    lu = () => ft.isInstructionsModalViewed !== !0,
    cu = () => {
        wn("isInstructionsModalViewed", !0)
    },
    uu = () => ft.isDataUsageWarningDialogAccepted === !0,
    fu = () => {
        wn("isDataUsageWarningDialogAccepted", !0)
    },
    du = () => {
        const e = sn();
        return e ? ft.lastPlayedAnsweringMachineTrackDate ? ks(e.postDate, ft.lastPlayedAnsweringMachineTrackDate) : !0 : !1
    },
    pu = () => {
        const e = sn();
        e && wn("lastPlayedAnsweringMachineTrackDate", e.postDate)
    },
    gu = () => {
        const e = dn()[0];
        return e ? ft.lastPlayedArchiveDate ? ks(e.postDate, ft.lastPlayedArchiveDate) : !0 : !1
    },
    vu = e => {
        ft.lastPlayedArchiveDate && Yl(e, ft.lastPlayedArchiveDate) || wn("lastPlayedArchiveDate", e)
    },
    hu = () => {
        const e = dn()[0];
        e && wn("lastPlayedArchiveDate", e.postDate)
    },
    Ye = {
        instructionsModal: {
            isVisible: lu,
            setViewed: cu
        },
        dataUsageWarningDialog: {
            accepted: uu,
            setAccepted: fu
        },
        answeringMachineTrack: {
            hasNew: du,
            setLastPlayed: pu
        },
        archive: {
            hasNew: gu,
            setLastPlayed: vu,
            dismissNotification: hu
        }
    };
var De = function() {
    return De = Object.assign || function(n) {
        for (var t, r = 1, i = arguments.length; r < i; r++) {
            t = arguments[r];
            for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (n[s] = t[s])
        }
        return n
    }, De.apply(this, arguments)
};

function rt(e, n, t) {
    if (t || arguments.length === 2)
        for (var r = 0, i = n.length, s; r < i; r++)(s || !(r in n)) && (s || (s = Array.prototype.slice.call(n, 0, r)), s[r] = n[r]);
    return e.concat(s || Array.prototype.slice.call(n))
}
var Xr = {
        exports: {}
    },
    fi = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (fi) {
    var di = new Uint8Array(16);
    Xr.exports = function() {
        return fi(di), di
    }
} else {
    var pi = new Array(16);
    Xr.exports = function() {
        for (var n = 0, t; n < 16; n++) n & 3 || (t = Math.random() * 4294967296), pi[n] = t >>> ((n & 3) << 3) & 255;
        return pi
    }
}
var Ts = Xr.exports,
    $s = [];
for (var zn = 0; zn < 256; ++zn) $s[zn] = (zn + 256).toString(16).substr(1);

function mu(e, n) {
    var t = n || 0,
        r = $s;
    return [r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]]].join("")
}
var Is = mu,
    _u = Ts,
    yu = Is,
    gi, Ir, Pr = 0,
    Or = 0;

function bu(e, n, t) {
    var r = n && t || 0,
        i = n || [];
    e = e || {};
    var s = e.node || gi,
        l = e.clockseq !== void 0 ? e.clockseq : Ir;
    if (s == null || l == null) {
        var u = _u();
        s == null && (s = gi = [u[0] | 1, u[1], u[2], u[3], u[4], u[5]]), l == null && (l = Ir = (u[6] << 8 | u[7]) & 16383)
    }
    var c = e.msecs !== void 0 ? e.msecs : new Date().getTime(),
        d = e.nsecs !== void 0 ? e.nsecs : Or + 1,
        p = c - Pr + (d - Or) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383), (p < 0 || c > Pr) && e.nsecs === void 0 && (d = 0), d >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    Pr = c, Or = d, Ir = l, c += 122192928e5;
    var o = ((c & 268435455) * 1e4 + d) % 4294967296;
    i[r++] = o >>> 24 & 255, i[r++] = o >>> 16 & 255, i[r++] = o >>> 8 & 255, i[r++] = o & 255;
    var a = c / 4294967296 * 1e4 & 268435455;
    i[r++] = a >>> 8 & 255, i[r++] = a & 255, i[r++] = a >>> 24 & 15 | 16, i[r++] = a >>> 16 & 255, i[r++] = l >>> 8 | 128, i[r++] = l & 255;
    for (var f = 0; f < 6; ++f) i[r + f] = s[f];
    return n || yu(i)
}
var wu = bu,
    Au = Ts,
    xu = Is;

function Su(e, n, t) {
    var r = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var i = e.random || (e.rng || Au)();
    if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, n)
        for (var s = 0; s < 16; ++s) n[r + s] = i[s];
    return n || xu(i)
}
var ku = Su,
    Tu = wu,
    Ps = ku,
    po = Ps;
po.v1 = Tu;
po.v4 = Ps;
var $u = po;
/*!
 * Core functionality for Snowplow JavaScript trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var Iu = "3.16.0";

function Pu(e) {
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
    return Eu(t)
}

function Ou(e) {
    if (!e) return e;
    var n = Du(e);
    return n.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}
var at = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function Du(e) {
    var n, t, r, i, s, l, u, c, d = 0,
        p = 0,
        o = [];
    if (!e) return e;
    e = unescape(encodeURIComponent(e));
    do n = e.charCodeAt(d++), t = e.charCodeAt(d++), r = e.charCodeAt(d++), c = n << 16 | t << 8 | r, i = c >> 18 & 63, s = c >> 12 & 63, l = c >> 6 & 63, u = c & 63, o[p++] = at.charAt(i) + at.charAt(s) + at.charAt(l) + at.charAt(u); while (d < e.length);
    var a = o.join(""),
        f = e.length % 3;
    return (f ? a.slice(0, f - 3) : a) + "===".slice(f || 3)
}

function Eu(e) {
    var n = function(v) {
            return decodeURIComponent(v.split("").map(function(g) {
                return "%" + ("00" + g.charCodeAt(0).toString(16)).slice(-2)
            }).join(""))
        },
        t, r, i, s, l, u, c, d, p = 0,
        o = 0,
        a = "",
        f = [];
    if (!e) return e;
    e += "";
    do s = at.indexOf(e.charAt(p++)), l = at.indexOf(e.charAt(p++)), u = at.indexOf(e.charAt(p++)), c = at.indexOf(e.charAt(p++)), d = s << 18 | l << 12 | u << 6 | c, t = d >> 16 & 255, r = d >> 8 & 255, i = d & 255, u === 64 ? f[o++] = String.fromCharCode(t) : c === 64 ? f[o++] = String.fromCharCode(t, r) : f[o++] = String.fromCharCode(t, r, i); while (p < e.length);
    return a = f.join(""), n(a.replace(/\0+$/, ""))
}

function go() {
    var e = {},
        n = [],
        t = [],
        r = [],
        i, s = function(d, p) {
            p != null && p !== "" && (e[d] = p)
        },
        l = function(d) {
            for (var p in d) Object.prototype.hasOwnProperty.call(d, p) && s(p, d[p])
        },
        u = function(d, p, o) {
            if (o && Os(o)) {
                var a = {
                    keyIfEncoded: d,
                    keyIfNotEncoded: p,
                    json: o
                };
                t.push(a), n.push(a)
            }
        },
        c = function(d) {
            r.push(d)
        };
    return {
        add: s,
        addDict: l,
        addJson: u,
        addContextEntity: c,
        getPayload: function() {
            return e
        },
        getJson: function() {
            return n
        },
        withJsonProcessor: function(d) {
            i = d
        },
        build: function() {
            return i == null || i(this, t, r), e
        }
    }
}

function Cu(e) {
    return function(n, t, r) {
        for (var i = function(a, f, v) {
                var g = JSON.stringify(a);
                e ? n.add(f, Ou(g)) : n.add(v, g)
            }, s = function() {
                var a = n.getPayload();
                if (e ? a.cx : a.co) return JSON.parse(e ? Pu(a.cx) : a.co)
            }, l = function(a, f) {
                var v = a || s();
                return v ? v.data = v.data.concat(f.data) : v = f, v
            }, u = void 0, c = 0, d = t; c < d.length; c++) {
            var p = d[c];
            p.keyIfEncoded === "cx" ? u = l(u, p.json) : i(p.json, p.keyIfEncoded, p.keyIfNotEncoded)
        }
        if (t.length = 0, r.length) {
            var o = {
                schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                data: rt([], r, !0)
            };
            u = l(u, o), r.length = 0
        }
        u && i(u, "cx", "co")
    }
}

function Os(e) {
    if (!Ds(e)) return !1;
    for (var n in e)
        if (Object.prototype.hasOwnProperty.call(e, n)) return !0;
    return !1
}

function Ds(e) {
    return typeof e < "u" && e !== null && (e.constructor === {}.constructor || e.constructor === [].constructor)
}
var Nn = "Snowplow: ",
    He;
(function(e) {
    e[e.none = 0] = "none", e[e.error = 1] = "error", e[e.warn = 2] = "warn", e[e.debug = 3] = "debug", e[e.info = 4] = "info"
})(He || (He = {}));
var ze = Mu();

function Mu(e) {
    e === void 0 && (e = He.warn);

    function n(l) {
        He[l] ? e = l : e = He.warn
    }

    function t(l, u) {
        for (var c = [], d = 2; d < arguments.length; d++) c[d - 2] = arguments[d];
        if (e >= He.error && typeof console < "u") {
            var p = Nn + l + "\n";
            u ? console.error.apply(console, rt([p + "\n", u], c, !1)) : console.error.apply(console, rt([p], c, !1))
        }
    }

    function r(l, u) {
        for (var c = [], d = 2; d < arguments.length; d++) c[d - 2] = arguments[d];
        if (e >= He.warn && typeof console < "u") {
            var p = Nn + l;
            u ? console.warn.apply(console, rt([p + "\n", u], c, !1)) : console.warn.apply(console, rt([p], c, !1))
        }
    }

    function i(l) {
        for (var u = [], c = 1; c < arguments.length; c++) u[c - 1] = arguments[c];
        e >= He.debug && typeof console < "u" && console.debug.apply(console, rt([Nn + l], u, !1))
    }

    function s(l) {
        for (var u = [], c = 1; c < arguments.length; c++) u[c - 1] = arguments[c];
        e >= He.info && typeof console < "u" && console.info.apply(console, rt([Nn + l], u, !1))
    }
    return {
        setLogLevel: n,
        warn: r,
        error: t,
        debug: i,
        info: s
    }
}

function ju() {
    var e = [],
        n = [],
        t = function(r) {
            var i = Uu(r),
                s = Fu(r),
                l = [],
                u = to(e, r, s, i);
            l.push.apply(l, u);
            var c = Yu(n, r, s, i);
            return l.push.apply(l, c), l
        };
    return {
        getGlobalPrimitives: function() {
            return e
        },
        getConditionalProviders: function() {
            return n
        },
        addGlobalContexts: function(r) {
            for (var i = [], s = [], l = 0, u = r; l < u.length; l++) {
                var c = u[l];
                hi(c) ? i.push(c) : Ht(c) && s.push(c)
            }
            e = e.concat(s), n = n.concat(i)
        },
        clearGlobalContexts: function() {
            n = [], e = []
        },
        removeGlobalContexts: function(r) {
            for (var i = function(c) {
                    hi(c) ? n = n.filter(function(d) {
                        return JSON.stringify(d) !== JSON.stringify(c)
                    }) : Ht(c) && (e = e.filter(function(d) {
                        return JSON.stringify(d) !== JSON.stringify(c)
                    }))
                }, s = 0, l = r; s < l.length; s++) {
                var u = l[s];
                i(u)
            }
        },
        getApplicableContexts: function(r) {
            return t(r)
        }
    }
}

function Bu(e) {
    return {
        addPluginContexts: function(n) {
            var t = n ? rt([], n, !0) : [];
            return e.forEach(function(r) {
                try {
                    r.contexts && t.push.apply(t, r.contexts())
                } catch (i) {
                    ze.error("Error adding plugin contexts", i)
                }
            }), t
        }
    }
}

function Lu(e) {
    var n = new RegExp("^iglu:([a-zA-Z0-9-_.]+)/([a-zA-Z0-9-_]+)/jsonschema/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$"),
        t = n.exec(e);
    if (t !== null) return t.slice(1, 6)
}

function Ru(e) {
    if (e[0] === "*" || e[1] === "*") return !1;
    if (e.slice(2).length > 0) {
        for (var n = !1, t = 0, r = e.slice(2); t < r.length; t++) {
            var i = r[t];
            if (i === "*") n = !0;
            else if (n) return !1
        }
        return !0
    } else if (e.length == 2) return !0;
    return !1
}

function Es(e) {
    var n = e.split(".");
    return n && n.length > 1 ? Ru(n) : !1
}

function Cs(e) {
    var n = new RegExp("^iglu:((?:(?:[a-zA-Z0-9-_]+|\\*).)+(?:[a-zA-Z0-9-_]+|\\*))/([a-zA-Z0-9-_.]+|\\*)/jsonschema/([1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)$"),
        t = n.exec(e);
    if (t !== null && Es(t[1])) return t.slice(1, 6)
}

function eo(e) {
    var n = Cs(e);
    if (n) {
        var t = n[0];
        return n.length === 5 && Es(t)
    }
    return !1
}

function Vu(e) {
    return Array.isArray(e) && e.every(function(n) {
        return typeof n == "string"
    })
}

function vi(e) {
    return Vu(e) ? e.every(function(n) {
        return eo(n)
    }) : typeof e == "string" ? eo(e) : !1
}

function pn(e) {
    var n = e;
    return Os(n) && "schema" in n && "data" in n ? typeof n.schema == "string" && typeof n.data == "object" : !1
}

function zu(e) {
    var n = e,
        t = 0;
    if (e != null && typeof e == "object" && !Array.isArray(e)) {
        if (Object.prototype.hasOwnProperty.call(n, "accept"))
            if (vi(n.accept)) t += 1;
            else return !1;
        if (Object.prototype.hasOwnProperty.call(n, "reject"))
            if (vi(n.reject)) t += 1;
            else return !1;
        return t > 0 && t <= 2
    }
    return !1
}

function ir(e) {
    return typeof e == "function" && e.length <= 1
}

function Ht(e) {
    return ir(e) || pn(e)
}

function Ms(e) {
    return Array.isArray(e) && e.length === 2 ? Array.isArray(e[1]) ? ir(e[0]) && e[1].every(Ht) : ir(e[0]) && Ht(e[1]) : !1
}

function js(e) {
    return Array.isArray(e) && e.length === 2 && zu(e[0]) ? Array.isArray(e[1]) ? e[1].every(Ht) : Ht(e[1]) : !1
}

function hi(e) {
    return Ms(e) || js(e)
}

function Nu(e, n) {
    var t = 0,
        r = 0,
        i = e.accept;
    Array.isArray(i) ? e.accept.some(function(l) {
        return Hn(l, n)
    }) && r++ : typeof i == "string" && Hn(i, n) && r++;
    var s = e.reject;
    return Array.isArray(s) ? e.reject.some(function(l) {
        return Hn(l, n)
    }) && t++ : typeof s == "string" && Hn(s, n) && t++, r > 0 && t === 0 ? !0 : (r === 0 && t > 0, !1)
}

function Hn(e, n) {
    if (!eo(e)) return !1;
    var t = Cs(e),
        r = Lu(n);
    if (t && r) {
        if (!Hu(t[0], r[0])) return !1;
        for (var i = 1; i < 5; i++)
            if (!Bs(t[i], r[i])) return !1;
        return !0
    }
    return !1
}

function Hu(e, n) {
    var t = n.split("."),
        r = e.split(".");
    if (t && r) {
        if (t.length !== r.length) return !1;
        for (var i = 0; i < r.length; i++)
            if (!Bs(t[i], r[i])) return !1;
        return !0
    }
    return !1
}

function Bs(e, n) {
    return e && n && e === "*" || e === n
}

function Uu(e) {
    for (var n = e.getJson(), t = 0, r = n; t < r.length; t++) {
        var i = r[t];
        if (i.keyIfEncoded === "ue_px" && typeof i.json.data == "object") {
            var s = i.json.data.schema;
            if (typeof s == "string") return s
        }
    }
    return ""
}

function Fu(e) {
    var n = e.getPayload().e;
    return typeof n == "string" ? n : ""
}

function Gu(e, n, t, r) {
    var i = void 0;
    try {
        var s = {
            event: n.getPayload(),
            eventType: t,
            eventSchema: r
        };
        return i = e(s), Array.isArray(i) && i.every(pn) || pn(i) ? i : void 0
    } catch (l) {
        i = void 0
    }
    return i
}

function Ls(e) {
    return Array.isArray(e) ? e : Array.of(e)
}

function to(e, n, t, r) {
    var i, s = Ls(e),
        l = function(c) {
            var d = Zu(c, n, t, r);
            if (d && d.length !== 0) return d
        },
        u = s.map(l);
    return (i = []).concat.apply(i, u.filter(function(c) {
        return c != null && c.filter(Boolean)
    }))
}

function Zu(e, n, t, r) {
    if (pn(e)) return [e];
    if (ir(e)) {
        var i = Gu(e, n, t, r);
        if (pn(i)) return [i];
        if (Array.isArray(i)) return i
    }
}

function Wu(e, n, t, r) {
    if (Ms(e)) {
        var i = e[0],
            s = !1;
        try {
            var l = {
                event: n.getPayload(),
                eventType: t,
                eventSchema: r
            };
            s = i(l)
        } catch (u) {
            s = !1
        }
        if (s === !0) return to(e[1], n, t, r)
    } else if (js(e) && Nu(e[0], r)) return to(e[1], n, t, r);
    return []
}

function Yu(e, n, t, r) {
    var i, s = Ls(e),
        l = function(c) {
            var d = Wu(c, n, t, r);
            if (d && d.length !== 0) return d
        },
        u = s.map(l);
    return (i = []).concat.apply(i, u.filter(function(c) {
        return c != null && c.filter(Boolean)
    }))
}

function qu(e) {
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

function Ku(e) {
    e === void 0 && (e = {});

    function n(c, d, p) {
        var o = Bu(d),
            a = ju(),
            f = c,
            v = {};

        function g(b) {
            if (b && b.length) return {
                schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                data: b
            }
        }

        function m(b, P) {
            var H = a.getApplicableContexts(b),
                W = [];
            return P && P.length && W.push.apply(W, P), H && H.length && W.push.apply(W, H), W
        }

        function h(b, P, H) {
            b.withJsonProcessor(Cu(f)), b.add("eid", $u.v4()), b.addDict(v);
            var W = qu(H);
            b.add(W.type, W.value.toString());
            var B = m(b, o.addPluginContexts(P)),
                j = g(B);
            j !== void 0 && b.addJson("cx", "co", j), d.forEach(function(L) {
                try {
                    L.beforeTrack && L.beforeTrack(b)
                } catch (J) {
                    ze.error("Plugin beforeTrack", J)
                }
            }), typeof p == "function" && p(b);
            var z = b.build();
            return d.forEach(function(L) {
                try {
                    L.afterTrack && L.afterTrack(z)
                } catch (J) {
                    ze.error("Plugin afterTrack", J)
                }
            }), z
        }

        function y(b, P) {
            v[b] = P
        }
        var w = {
            track: h,
            addPayloadPair: y,
            getBase64Encoding: function() {
                return f
            },
            setBase64Encoding: function(b) {
                f = b
            },
            addPayloadDict: function(b) {
                for (var P in b) Object.prototype.hasOwnProperty.call(b, P) && (v[P] = b[P])
            },
            resetPayloadPairs: function(b) {
                v = Ds(b) ? b : {}
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
        r = e.corePlugins,
        i = e.callback,
        s = r != null ? r : [],
        l = n(t != null ? t : !0, s, i),
        u = De(De({}, l), {
            addPlugin: function(c) {
                var d, p, o = c.plugin;
                s.push(o), (d = o.logger) === null || d === void 0 || d.call(o, ze), (p = o.activateCorePlugin) === null || p === void 0 || p.call(o, u)
            }
        });
    return s == null || s.forEach(function(c) {
        var d, p;
        (d = c.logger) === null || d === void 0 || d.call(c, ze), (p = c.activateCorePlugin) === null || p === void 0 || p.call(c, u)
    }), u
}

function Qu(e) {
    var n = e.event,
        t = n.schema,
        r = n.data,
        i = go(),
        s = {
            schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
            data: {
                schema: t,
                data: r
            }
        };
    return i.add("e", "ue"), i.addJson("ue_px", "ue_pr", s), i
}

function Ju(e) {
    var n = e.pageUrl,
        t = e.pageTitle,
        r = e.referrer,
        i = go();
    return i.add("e", "pv"), i.add("url", n), i.add("page", t), i.add("refr", r), i
}

function Xu(e) {
    var n = e.pageUrl,
        t = e.pageTitle,
        r = e.referrer,
        i = e.minXOffset,
        s = e.maxXOffset,
        l = e.minYOffset,
        u = e.maxYOffset,
        c = go();
    return c.add("e", "pp"), c.add("url", n), c.add("page", t), c.add("refr", r), i && !isNaN(Number(i)) && c.add("pp_mix", i.toString()), s && !isNaN(Number(s)) && c.add("pp_max", s.toString()), l && !isNaN(Number(l)) && c.add("pp_miy", l.toString()), u && !isNaN(Number(u)) && c.add("pp_may", u.toString()), c
}
var ef = Iu,
    Rs = {
        exports: {}
    },
    Vs = {
        exports: {}
    };
(function() {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        n = {
            rotl: function(t, r) {
                return t << r | t >>> 32 - r
            },
            rotr: function(t, r) {
                return t << 32 - r | t >>> r
            },
            endian: function(t) {
                if (t.constructor == Number) return n.rotl(t, 8) & 16711935 | n.rotl(t, 24) & 4278255360;
                for (var r = 0; r < t.length; r++) t[r] = n.endian(t[r]);
                return t
            },
            randomBytes: function(t) {
                for (var r = []; t > 0; t--) r.push(Math.floor(Math.random() * 256));
                return r
            },
            bytesToWords: function(t) {
                for (var r = [], i = 0, s = 0; i < t.length; i++, s += 8) r[s >>> 5] |= t[i] << 24 - s % 32;
                return r
            },
            wordsToBytes: function(t) {
                for (var r = [], i = 0; i < t.length * 32; i += 8) r.push(t[i >>> 5] >>> 24 - i % 32 & 255);
                return r
            },
            bytesToHex: function(t) {
                for (var r = [], i = 0; i < t.length; i++) r.push((t[i] >>> 4).toString(16)), r.push((t[i] & 15).toString(16));
                return r.join("")
            },
            hexToBytes: function(t) {
                for (var r = [], i = 0; i < t.length; i += 2) r.push(parseInt(t.substr(i, 2), 16));
                return r
            },
            bytesToBase64: function(t) {
                for (var r = [], i = 0; i < t.length; i += 3)
                    for (var s = t[i] << 16 | t[i + 1] << 8 | t[i + 2], l = 0; l < 4; l++) i * 8 + l * 6 <= t.length * 8 ? r.push(e.charAt(s >>> 6 * (3 - l) & 63)) : r.push("=");
                return r.join("")
            },
            base64ToBytes: function(t) {
                t = t.replace(/[^A-Z0-9+\/]/ig, "");
                for (var r = [], i = 0, s = 0; i < t.length; s = ++i % 4) s != 0 && r.push((e.indexOf(t.charAt(i - 1)) & Math.pow(2, -2 * s + 8) - 1) << s * 2 | e.indexOf(t.charAt(i)) >>> 6 - s * 2);
                return r
            }
        };
    Vs.exports = n
})();
var tf = Vs.exports,
    no = {
        utf8: {
            stringToBytes: function(e) {
                return no.bin.stringToBytes(unescape(encodeURIComponent(e)))
            },
            bytesToString: function(e) {
                return decodeURIComponent(escape(no.bin.bytesToString(e)))
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
    mi = no;
(function() {
    var e = tf,
        n = mi.utf8,
        t = mi.bin,
        r = function(s) {
            s.constructor == String ? s = n.stringToBytes(s) : typeof Buffer < "u" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(s) ? s = Array.prototype.slice.call(s, 0) : Array.isArray(s) || (s = s.toString());
            var l = e.bytesToWords(s),
                u = s.length * 8,
                c = [],
                d = 1732584193,
                p = -271733879,
                o = -1732584194,
                a = 271733878,
                f = -1009589776;
            l[u >> 5] |= 128 << 24 - u % 32, l[(u + 64 >>> 9 << 4) + 15] = u;
            for (var v = 0; v < l.length; v += 16) {
                for (var g = d, m = p, h = o, y = a, w = f, b = 0; b < 80; b++) {
                    if (b < 16) c[b] = l[v + b];
                    else {
                        var P = c[b - 3] ^ c[b - 8] ^ c[b - 14] ^ c[b - 16];
                        c[b] = P << 1 | P >>> 31
                    }
                    var H = (d << 5 | d >>> 27) + f + (c[b] >>> 0) + (b < 20 ? (p & o | ~p & a) + 1518500249 : b < 40 ? (p ^ o ^ a) + 1859775393 : b < 60 ? (p & o | p & a | o & a) - 1894007588 : (p ^ o ^ a) - 899497514);
                    f = a, a = o, o = p << 30 | p >>> 2, p = d, d = H
                }
                d += g, p += m, o += h, a += y, f += w
            }
            return [d, p, o, a, f]
        },
        i = function(s, l) {
            var u = e.wordsToBytes(r(s));
            return l && l.asBytes ? u : l && l.asString ? t.bytesToString(u) : e.bytesToHex(u)
        };
    i._blocksize = 16, i._digestsize = 20, Rs.exports = i
})();
var nf = Rs.exports;
const rf = bn(nf);
var ro = {
        exports: {}
    },
    _i = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (_i) {
    var yi = new Uint8Array(16);
    ro.exports = function() {
        return _i(yi), yi
    }
} else {
    var bi = new Array(16);
    ro.exports = function() {
        for (var n = 0, t; n < 16; n++) n & 3 || (t = Math.random() * 4294967296), bi[n] = t >>> ((n & 3) << 3) & 255;
        return bi
    }
}
var zs = ro.exports,
    Ns = [];
for (var Un = 0; Un < 256; ++Un) Ns[Un] = (Un + 256).toString(16).substr(1);

function of(e, n) {
    var t = n || 0,
        r = Ns;
    return [r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]]].join("")
}
var Hs = of,
    sf = zs,
    af = Hs,
    wi, Dr, Er = 0,
    Cr = 0;

function lf(e, n, t) {
    var r = n && t || 0,
        i = n || [];
    e = e || {};
    var s = e.node || wi,
        l = e.clockseq !== void 0 ? e.clockseq : Dr;
    if (s == null || l == null) {
        var u = sf();
        s == null && (s = wi = [u[0] | 1, u[1], u[2], u[3], u[4], u[5]]), l == null && (l = Dr = (u[6] << 8 | u[7]) & 16383)
    }
    var c = e.msecs !== void 0 ? e.msecs : new Date().getTime(),
        d = e.nsecs !== void 0 ? e.nsecs : Cr + 1,
        p = c - Er + (d - Cr) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383), (p < 0 || c > Er) && e.nsecs === void 0 && (d = 0), d >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    Er = c, Cr = d, Dr = l, c += 122192928e5;
    var o = ((c & 268435455) * 1e4 + d) % 4294967296;
    i[r++] = o >>> 24 & 255, i[r++] = o >>> 16 & 255, i[r++] = o >>> 8 & 255, i[r++] = o & 255;
    var a = c / 4294967296 * 1e4 & 268435455;
    i[r++] = a >>> 8 & 255, i[r++] = a & 255, i[r++] = a >>> 24 & 15 | 16, i[r++] = a >>> 16 & 255, i[r++] = l >>> 8 | 128, i[r++] = l & 255;
    for (var f = 0; f < 6; ++f) i[r + f] = s[f];
    return n || af(i)
}
var cf = lf,
    uf = zs,
    ff = Hs;

function df(e, n, t) {
    var r = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var i = e.random || (e.rng || uf)();
    if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, n)
        for (var s = 0; s < 16; ++s) n[r + s] = i[s];
    return n || ff(i)
}
var pf = df,
    gf = cf,
    Us = pf,
    vo = Us;
vo.v1 = gf;
vo.v4 = Us;
var ot = vo;
/*!
 * Core functionality for Snowplow Browser trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function vf(e) {
    try {
        var n = window.localStorage,
            t = n.getItem(e + ".expires");
        if (t === null || +t > Date.now()) return n.getItem(e);
        n.removeItem(e), n.removeItem(e + ".expires");
        return
    } catch (r) {
        return
    }
}

function Qn(e, n, t) {
    t === void 0 && (t = 63072e3);
    try {
        var r = window.localStorage,
            i = Date.now() + t * 1e3;
        return r.setItem("".concat(e, ".expires"), i.toString()), r.setItem(e, n), !0
    } catch (s) {
        return !1
    }
}

function Ai(e) {
    try {
        var n = window.localStorage;
        return n.removeItem(e), n.removeItem(e + ".expires"), !0
    } catch (t) {
        return !1
    }
}

function xi(e) {
    try {
        return window.sessionStorage.getItem(e)
    } catch (n) {
        return
    }
}

function hf(e, n) {
    try {
        return window.sessionStorage.setItem(e, n), !0
    } catch (t) {
        return !1
    }
}

function Fs(e) {
    return !!(e && typeof e.valueOf() == "string")
}

function Si(e) {
    return Number.isInteger && Number.isInteger(e) || typeof e == "number" && isFinite(e) && Math.floor(e) === e
}

function ki(e) {
    if (!Fs(e)) {
        e = e.text || "";
        var n = document.getElementsByTagName("title");
        n && n[0] != null && (e = n[0].text)
    }
    return e
}

function oo(e) {
    var n = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"),
        t = n.exec(e);
    return t ? t[1] : e
}

function Ti(e) {
    var n = e.length;
    return e.charAt(--n) === "." && (e = e.slice(0, n)), e.slice(0, 2) === "*." && (e = e.slice(1)), e
}

function Mr(e) {
    var n = window,
        t = gn("referrer", n.location.href) || gn("referer", n.location.href);
    if (t) return t;
    if (e) return e;
    try {
        if (n.top) return n.top.document.referrer;
        if (n.parent) return n.parent.document.referrer
    } catch (r) {}
    return document.referrer
}

function it(e, n, t, r) {
    if (e.addEventListener) return e.addEventListener(n, t, r), !0;
    if (e.attachEvent) return e.attachEvent("on" + n, t);
    e["on" + n] = t
}

function gn(e, n) {
    var t = new RegExp("^[^#]*[?&]" + e + "=([^&#]*)").exec(n);
    return t ? decodeURIComponent(t[1].replace(/\+/g, " ")) : null
}

function mf(e, n, t) {
    var r = n + "=" + t,
        i = e.split("#"),
        s = i[0].split("?"),
        l = s.shift(),
        u = s.join("?");
    if (!u) u = r;
    else {
        for (var c = !0, d = u.split("&"), p = 0; p < d.length; p++)
            if (d[p].substr(0, n.length + 1) === n + "=") {
                c = !1, d[p] = r, u = d.join("&");
                break
            } c && (u = r + "&" + u)
    }
    return i[0] = l + "?" + u, i.join("#")
}

function _f(e, n) {
    for (var t = window.location.hostname, r = "_sp_root_domain_test_", i = r + new Date().getTime(), s = "_test_value_" + new Date().getTime(), l = t.split("."), u = l.length - 2; u >= 0; u--) {
        var c = l.slice(u).join(".");
        if (yt(i, s, 0, "/", c, e, n), yt(i) === s) {
            sr(i, c, e, n);
            for (var d = yf(r), p = 0; p < d.length; p++) sr(d[p], c, e, n);
            return c
        }
    }
    return t
}

function sr(e, n, t, r) {
    yt(e, "", -1, "/", n, t, r)
}

function yf(e) {
    for (var n = document.cookie.split("; "), t = [], r = 0; r < n.length; r++) n[r].substring(0, e.length) === e && t.push(n[r]);
    return t
}

function yt(e, n, t, r, i, s, l) {
    return arguments.length > 1 ? document.cookie = e + "=" + encodeURIComponent(n != null ? n : "") + (t ? "; Expires=" + new Date(+new Date + t * 1e3).toUTCString() : "") + (r ? "; Path=" + r : "") + (i ? "; Domain=" + i : "") + (s ? "; SameSite=" + s : "") + (l ? "; Secure" : "") : decodeURIComponent((("; " + document.cookie).split("; " + e + "=")[1] || "").split(";")[0])
}

function bf() {
    try {
        return !!window.localStorage
    } catch (e) {
        return !0
    }
}

function wf() {
    var e = "modernizr";
    if (!bf()) return !1;
    try {
        var n = window.localStorage;
        return n.setItem(e, e), n.removeItem(e), !0
    } catch (t) {
        return !1
    }
}
var Af = "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0",
    xf = "iglu:com.snowplowanalytics.snowplow/browser_context/jsonschema/1-0-0",
    Sf = "iglu:com.snowplowanalytics.snowplow/client_session/jsonschema/1-0-2",
    kf = "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4";

function Tf(e, n, t, r, i, s, l, u, c, d, p, o, a, f, v, g, m) {
    var h = !1,
        y, w = [],
        b = !1;
    r = typeof r == "string" ? r.toLowerCase() : r;
    var P = r === !0 || r === "beacon" || r === "true",
        H = !!(P && window.navigator && window.navigator.sendBeacon && !_e(window.navigator.userAgent)),
        W = H && P,
        B = r === "get",
        j = !!(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
        z = !B && j && (r === "post" || P),
        L = z ? i : "/i",
        J = "snowplowOutQueue_".concat(e, "_").concat(z ? "post2" : "get");
    if (P && (a = {}), s = t && wf() && z && s || 1, t) try {
        var de = window.localStorage.getItem(J);
        w = de ? JSON.parse(de) : []
    } catch (O) {}
    Array.isArray(w) || (w = []), n.outQueues.push(w), j && s > 1 && n.bufferFlushers.push(function(O) {
        h || $(O)
    });

    function M(O) {
        var N = "?",
            F = {
                co: !0,
                cx: !0
            },
            R = !0;
        for (var Z in O) O.hasOwnProperty(Z) && !F.hasOwnProperty(Z) && (R ? R = !1 : N += "&", N += encodeURIComponent(Z) + "=" + encodeURIComponent(O[Z]));
        for (var q in F) O.hasOwnProperty(q) && F.hasOwnProperty(q) && (N += "&" + q + "=" + encodeURIComponent(O[q]));
        return N
    }

    function I(O) {
        var N = Object.keys(O).map(function(F) {
            return [F, O[F]]
        }).reduce(function(F, R) {
            var Z = R[0],
                q = R[1];
            return F[Z] = q.toString(), F
        }, {});
        return {
            evt: N,
            bytes: T(JSON.stringify(N))
        }
    }

    function T(O) {
        for (var N = 0, F = 0; F < O.length; F++) {
            var R = O.charCodeAt(F);
            R <= 127 ? N += 1 : R <= 2047 ? N += 2 : R >= 55296 && R <= 57343 ? (N += 4, F++) : R < 65535 ? N += 3 : N += 4
        }
        return N
    }
    var x = function(O) {
        return typeof O[0] == "object" && "evt" in O[0]
    };

    function A(O, N) {
        var F = G(N, !0, !1);
        F.send(K(X([O.evt])))
    }

    function E(O, N) {
        y = N + L;
        var F = function(Pe, Je) {
            return ze.warn("Event (" + Pe + "B) too big, max is " + Je)
        };
        if (z) {
            var R = I(O);
            if (R.bytes >= l) {
                F(R.bytes, l), A(R, y);
                return
            } else w.push(R)
        } else {
            var Z = M(O);
            if (u > 0) {
                var q = ne(Z),
                    ve = T(q);
                if (ve >= u) {
                    if (F(ve, u), j) {
                        var R = I(O),
                            re = N + i;
                        A(R, re)
                    }
                    return
                }
            }
            w.push(Z)
        }
        var Se = !1;
        t && (Se = Qn(J, JSON.stringify(w.slice(0, d)))), !h && (!Se || w.length >= s) && $()
    }

    function $(O) {
        for (O === void 0 && (O = !1); w.length && typeof w[0] != "string" && typeof w[0] != "object";) w.shift();
        if (!w.length) {
            h = !1;
            return
        }
        if (!Fs(y)) throw "No collector configured";
        if (h = !0, m && !b) {
            var N = G(m, !1, O);
            b = !0, N.timeout = p, N.onreadystatechange = function() {
                N.readyState === 4 && $()
            }, N.send();
            return
        }
        if (j) {
            var F = function(ke) {
                    for (var Ne = 0, xn = 0; Ne < ke.length && (xn += ke[Ne].bytes, !(xn >= l));) Ne += 1;
                    return Ne
                },
                R = void 0,
                Z, q;
            x(w) ? (R = y, Z = G(R, !0, O), q = F(w)) : (R = ne(w[0]), Z = G(R, !1, O), q = 1);
            var ve = setTimeout(function() {
                    Z.abort(), h = !1
                }, p),
                re = function(ke) {
                    for (var Ne = 0; Ne < ke; Ne++) w.shift();
                    t && Qn(J, JSON.stringify(w.slice(0, d)))
                },
                Se = function(ke) {
                    re(ke), $()
                };
            if (Z.onreadystatechange = function() {
                    Z.readyState === 4 && Z.status >= 200 && (clearTimeout(ve), Z.status < 300 ? Se(q) : (U(Z.status) || (ze.error("Status ".concat(Z.status, ", will not retry.")), re(q)), h = !1))
                }, !x(w)) Z.send();
            else {
                var Pe = w.slice(0, q);
                if (Pe.length > 0) {
                    var Je = !1,
                        Ee = Pe.map(function(ke) {
                            return ke.evt
                        });
                    if (W) {
                        var pt = new Blob([K(X(Ee))], {
                            type: "application/json"
                        });
                        try {
                            Je = navigator.sendBeacon(R, pt)
                        } catch (ke) {
                            Je = !1
                        }
                    }
                    Je === !0 ? Se(q) : Z.send(K(X(Ee)))
                }
            }
        } else if (!o && !x(w)) {
            var Xe = new Image(1, 1),
                et = !0;
            Xe.onload = function() {
                et && (et = !1, w.shift(), t && Qn(J, JSON.stringify(w.slice(0, d))), $())
            }, Xe.onerror = function() {
                et && (et = !1, h = !1)
            }, Xe.src = ne(w[0]), setTimeout(function() {
                et && h && (et = !1, $())
            }, p)
        } else h = !1
    }

    function U(O) {
        return O >= 200 && O < 300 ? !1 : v.includes(O) ? !0 : !g.includes(O)
    }

    function G(O, N, F) {
        var R = new XMLHttpRequest;
        N ? (R.open("POST", O, !F), R.setRequestHeader("Content-Type", "application/json; charset=UTF-8")) : R.open("GET", O, !F), R.withCredentials = f, o && R.setRequestHeader("SP-Anonymous", "*");
        for (var Z in a) Object.prototype.hasOwnProperty.call(a, Z) && R.setRequestHeader(Z, a[Z]);
        return R
    }

    function K(O) {
        return JSON.stringify({
            schema: kf,
            data: O
        })
    }

    function X(O) {
        for (var N = new Date().getTime().toString(), F = 0; F < O.length; F++) O[F].stm = N;
        return O
    }

    function ne(O) {
        return c ? y + O.replace("?", "?stm=" + new Date().getTime() + "&") : y + O
    }
    return {
        enqueueRequest: E,
        executeQueue: function() {
            h || $()
        },
        setUseLocalStorage: function(O) {
            t = O
        },
        setAnonymousTracking: function(O) {
            o = O
        },
        setCollectorUrl: function(O) {
            y = O + L
        },
        setBufferSize: function(O) {
            s = O
        }
    };

    function _e(O) {
        return N(13, O) || F(10, 15, O) && R(O);

        function N(q, ve) {
            var re = ve.match("(iP.+; CPU .*OS (d+)[_d]*.*) AppleWebKit/");
            return re && re.length ? parseInt(re[0]) <= q : !1
        }

        function F(q, ve, re) {
            var Se = re.match("(Macintosh;.*Mac OS X (d+)_(d+)[_d]*.*) AppleWebKit/");
            return Se && Se.length ? parseInt(Se[0]) <= q || parseInt(Se[0]) === q && parseInt(Se[1]) <= ve : !1
        }

        function R(q) {
            return q.match("Version/.* Safari/") && !Z(q)
        }

        function Z(q) {
            return q.match("Chrom(e|ium)")
        }
    }
}

function $f(e, n) {
    var t = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)"),
        r = t.exec(e);
    return r && (r == null ? void 0 : r.length) > 1 ? gn(n, r[1]) : null
}

function $i(e, n, t) {
    var r;
    return e === "translate.googleusercontent.com" ? (t === "" && (t = n), n = (r = $f(n, "u")) !== null && r !== void 0 ? r : "", e = oo(n)) : (e === "cc.bingj.com" || e === "webcache.googleusercontent.com") && (n = document.links[0].href, e = oo(n)), [e, n, t]
}
var Gs = 0,
    bt = 1,
    If = 2,
    vn = 3,
    ho = 4,
    Zs = 5,
    lt = 6,
    Bt = 7,
    wt = 8,
    At = 9,
    Ze = 10;

function Pf() {
    var e = ["1", "", 0, 0, 0, void 0, "", "", "", void 0, 0];
    return e
}

function Of(e, n, t, r) {
    var i = new Date,
        s = Math.round(i.getTime() / 1e3),
        l;
    e ? (l = e.split("."), l.unshift("0")) : l = ["1", n, s, r, s, "", t], (!l[lt] || l[lt] === "undefined") && (l[lt] = ot.v4()), (!l[Bt] || l[Bt] === "undefined") && (l[Bt] = ""), (!l[wt] || l[wt] === "undefined") && (l[wt] = ""), (!l[At] || l[At] === "undefined") && (l[At] = ""), (!l[Ze] || l[Ze] === "undefined") && (l[Ze] = 0);
    var u = function(p, o) {
            var a = parseInt(p);
            return isNaN(a) ? o : a
        },
        c = function(p) {
            return p ? u(p, void 0) : void 0
        },
        d = [l[Gs], l[bt], u(l[If], s), u(l[vn], r), u(l[ho], s), c(l[Zs]), l[lt], l[Bt], l[wt], c(l[At]), u(l[Ze], 0)];
    return d
}

function Df(e, n) {
    var t;
    return e[bt] ? t = e[bt] : n ? (t = "", e[bt] = t) : (t = ot.v4(), e[bt] = t), t
}

function nn(e, n) {
    n === void 0 && (n = {
        memorizedVisitCount: 1
    });
    var t = n.memorizedVisitCount;
    io(e) ? (e[Bt] = e[lt], e[Zs] = e[ho], e[vn]++) : e[vn] = t;
    var r = ot.v4();
    return e[lt] = r, e[Ze] = 0, e[wt] = "", e[At] = void 0, r
}

function jr(e) {
    e[ho] = Math.round(new Date().getTime() / 1e3)
}

function Ef(e, n) {
    if (e[Ze] === 0) {
        var t = n.build();
        e[wt] = t.eid;
        var r = t.dtm || t.ttm;
        e[At] = r ? parseInt(r) : void 0
    }
}

function Cf(e) {
    e[Ze] += 1
}

function Mf(e) {
    return e.shift(), e.join(".")
}

function Ii(e, n, t) {
    var r = e[At],
        i = {
            userId: t ? "00000000-0000-0000-0000-000000000000" : e[bt],
            sessionId: e[lt],
            eventIndex: e[Ze],
            sessionIndex: e[vn],
            previousSessionId: t ? null : e[Bt] || null,
            storageMechanism: n == "localStorage" ? "LOCAL_STORAGE" : "COOKIE_1",
            firstEventId: e[wt] || null,
            firstEventTimestamp: r ? new Date(r).toISOString() : null
        };
    return i
}

function Br(e) {
    return e[lt]
}

function jf(e) {
    return e[bt]
}

function Lr(e) {
    return e[vn]
}

function io(e) {
    return e[Gs] === "0"
}

function Bf(e) {
    return e[Ze]
}
var hn = "x";

function Rr() {
    return {
        viewport: Vr(Lf()),
        documentSize: Vr(Rf()),
        resolution: Vr(Vf()),
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

function Lf() {
    var e, n;
    if ("innerWidth" in window) e = window.innerWidth, n = window.innerHeight;
    else {
        var t = document.documentElement || document.body;
        e = t.clientWidth, n = t.clientHeight
    }
    return e >= 0 && n >= 0 ? e + hn + n : null
}

function Rf() {
    var e = document.documentElement,
        n = document.body,
        t = n ? Math.max(n.offsetHeight, n.scrollHeight) : 0,
        r = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth),
        i = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, t);
    return isNaN(r) || isNaN(i) ? "" : r + hn + i
}

function Vf() {
    return screen.width + hn + screen.height
}

function Vr(e) {
    return e && e.split(hn).map(function(n) {
        return Math.floor(Number(n))
    }).join(hn)
}

function zf(e, n, t, r, i, s) {
    s === void 0 && (s = {});
    var l = [],
        u = function(p, o, a, f, v, g) {
            var m, h, y, w, b, P, H, W, B, j, z, L, J, de, M, I, T, x, A, E, $, U, G, K, X, ne, _e, O;
            g.eventMethod = (m = g.eventMethod) !== null && m !== void 0 ? m : "post";
            var N = function(_) {
                    var k;
                    return (k = _.stateStorageStrategy) !== null && k !== void 0 ? k : "cookieAndLocalStorage"
                },
                F = function(_) {
                    var k, D;
                    return typeof _.anonymousTracking == "boolean" ? !1 : (D = ((k = _.anonymousTracking) === null || k === void 0 ? void 0 : k.withSessionTracking) === !0) !== null && D !== void 0 ? D : !1
                },
                R = function(_) {
                    var k, D;
                    return typeof _.anonymousTracking == "boolean" ? !1 : (D = ((k = _.anonymousTracking) === null || k === void 0 ? void 0 : k.withServerAnonymisation) === !0) !== null && D !== void 0 ? D : !1
                },
                Z = function(_) {
                    return !!_.anonymousTracking
                },
                q = (y = (h = g == null ? void 0 : g.contexts) === null || h === void 0 ? void 0 : h.browser) !== null && y !== void 0 ? y : !1,
                ve = (b = (w = g == null ? void 0 : g.contexts) === null || w === void 0 ? void 0 : w.webPage) !== null && b !== void 0 ? b : !0;
            l.push(Ia()), ve && l.push(Ta()), q && l.push($a()), l.push.apply(l, (P = g.plugins) !== null && P !== void 0 ? P : []);
            var re = Ku({
                    base64: g.encodeBase64,
                    corePlugins: l,
                    callback: xa
                }),
                Se = document.characterSet || document.charset,
                Pe = $i(window.location.hostname, window.location.href, Mr()),
                Je = Ti(Pe[0]),
                Ee = Pe[1],
                pt = Pe[2],
                Xe, et = (H = g.platform) !== null && H !== void 0 ? H : "web",
                ke = No(f),
                Ne = (W = g.postPath) !== null && W !== void 0 ? W : "/com.snowplowanalytics.snowplow/tp2",
                xn = (B = g.appId) !== null && B !== void 0 ? B : "",
                Sn, $t = document.title,
                Kt, va = (j = g.resetActivityTrackingOnPageView) !== null && j !== void 0 ? j : !0,
                Ao, xo, ha = (z = g.cookieName) !== null && z !== void 0 ? z : "_sp_",
                Qt = (L = g.cookieDomain) !== null && L !== void 0 ? L : void 0,
                dr = "/",
                kn = (J = g.cookieSameSite) !== null && J !== void 0 ? J : "None",
                Tn = (de = g.cookieSecure) !== null && de !== void 0 ? de : !0,
                So = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack,
                ko = typeof g.respectDoNotTrack < "u" ? g.respectDoNotTrack && (So === "yes" || So === "1") : !1,
                pr, To = (M = g.cookieLifetime) !== null && M !== void 0 ? M : 63072e3,
                $o = (I = g.sessionCookieTimeout) !== null && I !== void 0 ? I : 1800,
                It = F(g),
                gr = R(g),
                Re = Z(g),
                ae = N(g),
                $n, vr = new Date().getTime(),
                In, Pn, On, Dn, Io, En, Ce, Me = 1,
                gt, tt = Tf(p, v, ae == "localStorage" || ae == "cookieAndLocalStorage", g.eventMethod, Ne, (T = g.bufferSize) !== null && T !== void 0 ? T : 1, (x = g.maxPostBytes) !== null && x !== void 0 ? x : 4e4, (A = g.maxGetBytes) !== null && A !== void 0 ? A : 0, (E = g.useStm) !== null && E !== void 0 ? E : !0, ($ = g.maxLocalStorageQueueSize) !== null && $ !== void 0 ? $ : 1e3, (U = g.connectionTimeout) !== null && U !== void 0 ? U : 5e3, gr, (G = g.customHeaders) !== null && G !== void 0 ? G : {}, (K = g.withCredentials) !== null && K !== void 0 ? K : !0, (X = g.retryStatusCodes) !== null && X !== void 0 ? X : [], ((ne = g.dontRetryStatusCodes) !== null && ne !== void 0 ? ne : []).concat([400, 401, 403, 410, 422]), g.idService),
                Po = !1,
                Oo = !1,
                be = {
                    enabled: !1,
                    installed: !1,
                    configurations: {}
                },
                ma = (O = (_e = g.contexts) === null || _e === void 0 ? void 0 : _e.session) !== null && O !== void 0 ? O : !1,
                Cn, Mn = g.onSessionUpdateCallback,
                hr = !1;
            g.hasOwnProperty("discoverRootDomain") && g.discoverRootDomain && (Qt = _f(kn, Tn));
            var jn = Rr(),
                _a = jn.browserLanguage,
                ya = jn.resolution,
                ba = jn.colorDepth,
                wa = jn.cookiesEnabled;
            re.setTrackerVersion(a), re.setTrackerNamespace(o), re.setAppId(xn), re.setPlatform(et), re.addPayloadPair("cookie", wa ? "1" : "0"), re.addPayloadPair("cs", Se), re.addPayloadPair("lang", _a), re.addPayloadPair("res", ya), re.addPayloadPair("cd", ba), Mo(), zo(), g.crossDomainLinker && Eo(g.crossDomainLinker);

            function vt() {
                Pe = $i(window.location.hostname, window.location.href, Mr()), Pe[1] !== Ee && (pt = Mr(Ee)), Je = Ti(Pe[0]), Ee = Pe[1]
            }

            function Do(_) {
                var k = new Date().getTime(),
                    D = _.currentTarget;
                D != null && D.href && (D.href = mf(D.href, "_sp", En + "." + k))
            }

            function Eo(_) {
                for (var k = 0; k < document.links.length; k++) {
                    var D = document.links[k];
                    !D.spDecorationEnabled && _(D) && (it(D, "click", Do, !0), it(D, "mousedown", Do, !0), D.spDecorationEnabled = !0)
                }
            }

            function ht(_) {
                var k;
                return Ao && (k = new RegExp("#.*"), _ = _.replace(k, "")), xo && (k = new RegExp("[{}]", "g"), _ = _.replace(k, "")), _
            }

            function Co(_) {
                var k = new RegExp("^([a-z]+):"),
                    D = k.exec(_);
                return D ? D[1] : null
            }

            function Aa(_, k) {
                var D = Co(k),
                    he;
                return D ? k : k.slice(0, 1) === "/" ? Co(_) + "://" + oo(_) + k : (_ = ht(_), (he = _.indexOf("?")) >= 0 && (_ = _.slice(0, he)), (he = _.lastIndexOf("/")) !== _.length - 1 && (_ = _.slice(0, he + 1)), _ + k)
            }

            function xa(_) {
                ko || Cn || tt.enqueueRequest(_.build(), ke)
            }

            function Pt(_) {
                return ha + _ + "." + Io
            }

            function mr(_) {
                var k = Pt(_);
                if (ae == "localStorage") return vf(k);
                if (ae == "cookie" || ae == "cookieAndLocalStorage") return yt(k)
            }

            function Mo() {
                vt(), Io = rf((Qt || Je) + (dr || "/")).slice(0, 4)
            }

            function Jt() {
                var _ = new Date;
                $n = _.getTime()
            }

            function Sa() {
                ka(), Jt()
            }

            function jo() {
                var _ = document.documentElement;
                return _ ? [_.scrollLeft || window.pageXOffset, _.scrollTop || window.pageYOffset] : [0, 0]
            }

            function Bo() {
                var _ = jo(),
                    k = _[0];
                In = k, Pn = k;
                var D = _[1];
                On = D, Dn = D
            }

            function ka() {
                var _ = jo(),
                    k = _[0];
                k < In ? In = k : k > Pn && (Pn = k);
                var D = _[1];
                D < On ? On = D : D > Dn && (Dn = D)
            }

            function Bn(_) {
                return Math.round(_)
            }

            function _r() {
                var _ = Pt("ses"),
                    k = "*";
                return Lo(_, k, $o)
            }

            function yr(_) {
                var k = Pt("id"),
                    D = Mf(_);
                return Lo(k, D, To)
            }

            function Lo(_, k, D) {
                return Re && !It ? !1 : ae == "localStorage" ? Qn(_, k, D) : ae == "cookie" || ae == "cookieAndLocalStorage" ? (yt(_, k, D, dr, Qt, kn, Tn), document.cookie.indexOf("".concat(_, "=")) !== -1) : !1
            }

            function Ro(_) {
                var k = Pt("id"),
                    D = Pt("ses");
                Ai(k), Ai(D), sr(k, Qt, kn, Tn), sr(D, Qt, kn, Tn), _ != null && _.preserveSession || (Ce = ot.v4(), Me = 1), _ != null && _.preserveUser || (En = Re ? "" : ot.v4(), gt = null)
            }

            function Vo(_) {
                _ && _.stateStorageStrategy && (g.stateStorageStrategy = _.stateStorageStrategy, ae = N(g)), Re = Z(g), It = F(g), gr = R(g), tt.setUseLocalStorage(ae == "localStorage" || ae == "cookieAndLocalStorage"), tt.setAnonymousTracking(gr)
            }

            function zo() {
                if (!(Re && !It)) {
                    var _ = ae != "none" && !!mr("ses"),
                        k = Xt();
                    En = Df(k, Re), _ ? Ce = Br(k) : Ce = nn(k), Me = Lr(k), ae != "none" && (_r(), jr(k), yr(k))
                }
            }

            function Xt() {
                if (ae == "none") return Pf();
                var _ = mr("id") || void 0;
                return Of(_, En, Ce, Me)
            }

            function No(_) {
                return _.indexOf("http") === 0 ? _ : (document.location.protocol === "https:" ? "https" : "http") + "://" + _
            }

            function Ho() {
                (!Po || v.pageViewId == null) && (v.pageViewId = ot.v4())
            }

            function br() {
                return v.pageViewId == null && (v.pageViewId = ot.v4()), v.pageViewId
            }

            function Uo() {
                if (ae === "none" || Re || !ve) return null;
                var _ = "_sp_tab_id",
                    k = xi(_);
                return k || (hf(_, ot.v4()), k = xi(_)), k || null
            }

            function Ta() {
                return {
                    contexts: function() {
                        return [{
                            schema: Af,
                            data: {
                                id: br()
                            }
                        }]
                    }
                }
            }

            function $a() {
                return {
                    contexts: function() {
                        return [{
                            schema: xf,
                            data: De(De({}, Rr()), {
                                tabId: Uo()
                            })
                        }]
                    }
                }
            }

            function Ia() {
                var _ = function(D) {
                        return Re ? null : D
                    },
                    k = function(D) {
                        return It ? D : _(D)
                    };
                return {
                    beforeTrack: function(D) {
                        var he = mr("ses"),
                            ue = Xt(),
                            nt = Bf(ue) === 0;
                        if (pr ? Cn = !!yt(pr) : Cn = !1, ko || Cn) {
                            Ro();
                            return
                        }
                        io(ue) ? (!he && ae != "none" ? Ce = nn(ue) : Ce = Br(ue), Me = Lr(ue)) : new Date().getTime() - vr > $o * 1e3 && (Me++, Ce = nn(ue, {
                            memorizedVisitCount: Me
                        })), jr(ue), Ef(ue, D), Cf(ue);
                        var Te = Rr(),
                            Ot = Te.viewport,
                            en = Te.documentSize;
                        D.add("vp", Ot), D.add("ds", en), D.add("vid", k(Me)), D.add("sid", k(Ce)), D.add("duid", _(jf(ue))), D.add("uid", _(gt)), vt(), D.add("refr", ht(Xe || pt)), D.add("url", ht(Sn || Ee));
                        var tn = Ii(ue, ae, Re);
                        if (ma && (!Re || It) && Pa(D, tn), ae != "none") {
                            yr(ue);
                            var Ar = _r();
                            (!he || nt) && Ar && Mn && !hr && (Mn(tn), hr = !1)
                        }
                        vr = new Date().getTime()
                    }
                }
            }

            function Pa(_, k) {
                var D = {
                    schema: Sf,
                    data: k
                };
                _.addContextEntity(D)
            }

            function Oa() {
                var _ = Xt();
                if (io(_) ? (ae != "none" ? Ce = nn(_) : Ce = Br(_), Me = Lr(_)) : (Me++, Ce = nn(_, {
                        memorizedVisitCount: Me
                    })), jr(_), ae != "none") {
                    var k = Ii(_, ae, Re);
                    yr(_);
                    var D = _r();
                    D && Mn && (hr = !0, Mn(k))
                }
                vr = new Date().getTime()
            }

            function wr(_, k) {
                return (_ || []).concat(k ? k() : [])
            }

            function Da(_) {
                var k = _.title,
                    D = _.context,
                    he = _.timestamp,
                    ue = _.contextCallback;
                vt(), Oo && Ho(), Oo = !0, $t = document.title, Kt = k;
                var nt = ki(Kt || $t);
                re.track(Ju({
                    pageUrl: ht(Sn || Ee),
                    pageTitle: nt,
                    referrer: ht(Xe || pt)
                }), wr(D, ue), he);
                var Te = new Date,
                    Ot = !1;
                if (be.enabled && !be.installed) {
                    be.installed = !0, Ot = !0;
                    var en = {
                        update: function() {
                            if (typeof window < "u" && typeof window.addEventListener == "function") {
                                var Dt = !1,
                                    Ln = Object.defineProperty({}, "passive", {
                                        get: function() {
                                            Dt = !0
                                        },
                                        set: function() {}
                                    }),
                                    Wo = function() {};
                                window.addEventListener("testPassiveEventSupport", Wo, Ln), window.removeEventListener("testPassiveEventSupport", Wo, Ln), en.hasSupport = Dt
                            }
                        }
                    };
                    en.update();
                    var tn = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
                    Object.prototype.hasOwnProperty.call(en, "hasSupport") ? it(document, tn, Jt, {
                        passive: !0
                    }) : it(document, tn, Jt), Bo();
                    var Ar = ["click", "mouseup", "mousedown", "mousemove", "keypress", "keydown", "keyup", "touchend", "touchstart"],
                        ja = ["resize", "focus", "blur"],
                        xr = function(Ba, Dt) {
                            return Dt === void 0 && (Dt = Jt),
                                function(Ln) {
                                    return it(document, Ln, Dt)
                                }
                        };
                    Ar.forEach(xr(document)), ja.forEach(xr(window)), xr(window, Sa)("scroll")
                }
                if (be.enabled && (va || Ot)) {
                    $n = Te.getTime();
                    var Zo = void 0;
                    for (Zo in be.configurations) {
                        var Sr = be.configurations[Zo];
                        Sr && (window.clearInterval(Sr.activityInterval), Ea(Sr, D, ue))
                    }
                }
            }

            function Ea(_, k, D) {
                var he = function(Te, Ot) {
                        vt(), Te({
                            context: Ot,
                            pageViewId: br(),
                            minXOffset: In,
                            minYOffset: On,
                            maxXOffset: Pn,
                            maxYOffset: Dn
                        }), Bo()
                    },
                    ue = function() {
                        var Te = new Date;
                        $n + _.configMinimumVisitLength > Te.getTime() && he(_.callback, wr(k, D)), _.activityInterval = window.setInterval(nt, _.configHeartBeatTimer)
                    },
                    nt = function() {
                        var Te = new Date;
                        $n + _.configHeartBeatTimer > Te.getTime() && he(_.callback, wr(k, D))
                    };
                _.configMinimumVisitLength === 0 ? _.activityInterval = window.setInterval(nt, _.configHeartBeatTimer) : _.activityInterval = window.setTimeout(ue, _.configMinimumVisitLength)
            }

            function Fo(_) {
                var k = _.minimumVisitLength,
                    D = _.heartbeatDelay,
                    he = _.callback;
                if (Si(k) && Si(D)) return {
                    configMinimumVisitLength: k * 1e3,
                    configHeartBeatTimer: D * 1e3,
                    callback: he
                };
                ze.error("Activity tracking minimumVisitLength & heartbeatDelay must be integers")
            }

            function Ca(_) {
                var k = _.context,
                    D = _.minXOffset,
                    he = _.minYOffset,
                    ue = _.maxXOffset,
                    nt = _.maxYOffset,
                    Te = document.title;
                Te !== $t && ($t = Te, Kt = void 0), re.track(Xu({
                    pageUrl: ht(Sn || Ee),
                    pageTitle: ki(Kt || $t),
                    referrer: ht(Xe || pt),
                    minXOffset: Bn(D),
                    maxXOffset: Bn(ue),
                    minYOffset: Bn(he),
                    maxYOffset: Bn(nt)
                }), k)
            }

            function Go(_) {
                var k = be.configurations[_];
                (k == null ? void 0 : k.configMinimumVisitLength) === 0 ? window.clearTimeout(k == null ? void 0 : k.activityInterval) : window.clearInterval(k == null ? void 0 : k.activityInterval), be.configurations[_] = void 0
            }
            var Ma = {
                getDomainSessionIndex: function() {
                    return Me
                },
                getPageViewId: br,
                getTabId: Uo,
                newSession: Oa,
                getCookieName: function(_) {
                    return Pt(_)
                },
                getUserId: function() {
                    return gt
                },
                getDomainUserId: function() {
                    return Xt()[1]
                },
                getDomainUserInfo: function() {
                    return Xt()
                },
                setReferrerUrl: function(_) {
                    Xe = _
                },
                setCustomUrl: function(_) {
                    vt(), Sn = Aa(Ee, _)
                },
                setDocumentTitle: function(_) {
                    $t = document.title, Kt = _
                },
                discardHashTag: function(_) {
                    Ao = _
                },
                discardBrace: function(_) {
                    xo = _
                },
                setCookiePath: function(_) {
                    dr = _, Mo()
                },
                setVisitorCookieTimeout: function(_) {
                    To = _
                },
                crossDomainLinker: function(_) {
                    Eo(_)
                },
                enableActivityTracking: function(_) {
                    be.configurations.pagePing || (be.enabled = !0, be.configurations.pagePing = Fo(De(De({}, _), {
                        callback: Ca
                    })))
                },
                enableActivityTrackingCallback: function(_) {
                    be.configurations.callback || (be.enabled = !0, be.configurations.callback = Fo(_))
                },
                disableActivityTracking: function() {
                    Go("pagePing")
                },
                disableActivityTrackingCallback: function() {
                    Go("callback")
                },
                updatePageActivity: function() {
                    Jt()
                },
                setOptOutCookie: function(_) {
                    pr = _
                },
                setUserId: function(_) {
                    gt = _
                },
                setUserIdFromLocation: function(_) {
                    vt(), gt = gn(_, Ee)
                },
                setUserIdFromReferrer: function(_) {
                    vt(), gt = gn(_, pt)
                },
                setUserIdFromCookie: function(_) {
                    gt = yt(_)
                },
                setCollectorUrl: function(_) {
                    ke = No(_), tt.setCollectorUrl(ke)
                },
                setBufferSize: function(_) {
                    tt.setBufferSize(_)
                },
                flushBuffer: function(_) {
                    _ === void 0 && (_ = {}), tt.executeQueue(), _.newBufferSize && tt.setBufferSize(_.newBufferSize)
                },
                trackPageView: function(_) {
                    _ === void 0 && (_ = {}), Da(_)
                },
                preservePageViewId: function() {
                    Po = !0
                },
                disableAnonymousTracking: function(_) {
                    g.anonymousTracking = !1, Vo(_), zo(), tt.executeQueue()
                },
                enableAnonymousTracking: function(_) {
                    var k;
                    g.anonymousTracking = (k = _ && (_ == null ? void 0 : _.options)) !== null && k !== void 0 ? k : !0, Vo(_), It || Ho()
                },
                clearUserData: Ro
            };
            return De(De({}, Ma), {
                id: p,
                namespace: o,
                core: re,
                sharedState: v
            })
        },
        c = u(e, n, t, r, i, s),
        d = De(De({}, c), {
            addPlugin: function(p) {
                var o, a;
                d.core.addPlugin(p), (a = (o = p.plugin).activateBrowserPlugin) === null || a === void 0 || a.call(o, d)
            }
        });
    return l.forEach(function(p) {
        var o;
        (o = p.activateBrowserPlugin) === null || o === void 0 || o.call(p, d)
    }), d
}
var an = {};

function mo(e, n) {
    try {
        Hf(e != null ? e : Uf()).forEach(n)
    } catch (t) {
        ze.error("Function failed", t)
    }
}

function Nf(e, n, t, r, i, s) {
    return an.hasOwnProperty(e) ? null : (an[e] = zf(e, n, t, r, i, s), an[e])
}

function Hf(e) {
    return Ff(e, an)
}

function Uf() {
    return Object.keys(an)
}

function Ff(e, n) {
    for (var t = [], r = 0, i = e; r < i.length; r++) {
        var s = i[r];
        n.hasOwnProperty(s) ? t.push(n[s]) : ze.warn(s + " not configured")
    }
    return t
}
var Gf = function() {
    function e() {
        this.outQueues = [], this.bufferFlushers = [], this.hasLoaded = !1, this.registeredOnLoadHandlers = []
    }
    return e
}();

function Zf() {
    var e = new Gf,
        n = document,
        t = window;

    function r() {
        n.visibilityState == "hidden" && e.bufferFlushers.forEach(function(u) {
            u(!1)
        })
    }

    function i() {
        e.bufferFlushers.forEach(function(u) {
            u(!1)
        })
    }

    function s() {
        var u;
        if (!e.hasLoaded)
            for (e.hasLoaded = !0, u = 0; u < e.registeredOnLoadHandlers.length; u++) e.registeredOnLoadHandlers[u]();
        return !0
    }

    function l() {
        n.addEventListener ? n.addEventListener("DOMContentLoaded", function u() {
            n.removeEventListener("DOMContentLoaded", u, !1), s()
        }) : n.attachEvent && n.attachEvent("onreadystatechange", function u() {
            n.readyState === "complete" && (n.detachEvent("onreadystatechange", u), s())
        }), it(t, "load", s, !1)
    }
    return n.visibilityState && it(n, "visibilitychange", r, !1), it(t, "beforeunload", i, !1), document.readyState === "loading" ? l() : s(), e
}
/*!
 * Browser tracker for Snowplow v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function Wf(e, n) {
    mo(n, function(t) {
        t.enableActivityTracking(e)
    })
}

function Yf(e, n) {
    mo(n, function(t) {
        t.trackPageView(e)
    })
}

function qf(e, n) {
    mo(n, function(t) {
        t.core.track(Qu({
            event: e.event
        }), e.context, e.timestamp)
    })
}
var Pi = typeof window < "u" ? Zf() : void 0;

function Kf(e, n, t) {
    if (t === void 0 && (t = {}), Pi) return Nf(e, e, "js-".concat(ef), n, Pi, t)
}
const Qf = "brawlstars-cctv-prod",
    Jf = "https://collector.snowplow.supercell.com",
    Xf = () => {
        Kf("sp1", Jf, {
            appId: Qf,
            plugins: []
        })
    },
    ed = () => Wf({
        minimumVisitLength: 5,
        heartbeatDelay: 20
    }),
    td = (e, n, t, r = {}) => {
        qf({
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
                }, r)
            }]
        })
    },
    ie = {
        init: Xf,
        setupActivityTracking: ed,
        trackPageView: Yf,
        trackClickEvent: td
    },
    nd = [{
        postDate: "2023-12-13",
        isFinal: !0,
        bgSrc: {
            png: "scenes/scene/bg.png"
        },
        transitionVideoSrc: {
            mp4: "scenes/scene/transition-video.mp4"
        }
    }],
    rd = nd,
    od = Yt(rd),
    Fe = () => {
        var n, t, r;
        const e = od()[0];
        return mt(ye({}, e), {
            bgSrc: je(e.bgSrc.png),
            transitionVideoSrc: je(e.transitionVideoSrc.mp4),
            overlayVideoMp4: ((n = e.overlayVideoSrc) == null ? void 0 : n.mp4) && je(e.overlayVideoSrc.mp4),
            overlayVideoWebm: ((t = e.overlayVideoSrc) == null ? void 0 : t.webm) && je(e.overlayVideoSrc.webm),
            overlayVideoPoster: ((r = e.overlayVideoSrc) == null ? void 0 : r.png) && je(e.overlayVideoSrc.png)
        })
    },
    id = [{
        src: {
            jpg: "logs/log/logbook-42-1.jpg"
        },
        postDate: "2023-12-13"
    }, {
        src: {
            jpg: "logs/log/logbook-42.jpg"
        },
        postDate: "2023-12-13"
    }, {
        src: {
            jpg: "logs/log/logbook-41.jpg"
        },
        postDate: "2023-12-12"
    }, {
        src: {
            jpg: "logs/log/logbook-40.jpg"
        },
        postDate: "2023-12-11"
    }, {
        src: {
            jpg: "logs/log/logbook-39.jpg"
        },
        postDate: "2023-12-10"
    }, {
        src: {
            jpg: "logs/log/logbook-38.jpg"
        },
        postDate: "2023-12-09"
    }, {
        src: {
            jpg: "logs/log/logbook-37.jpg"
        },
        postDate: "2023-12-08"
    }, {
        src: {
            jpg: "logs/log/logbook-36.jpg"
        },
        postDate: "2023-12-07"
    }, {
        src: {
            jpg: "logs/log/logbook-35.jpg"
        },
        postDate: "2023-12-06"
    }, {
        src: {
            jpg: "logs/log/logbook-34.jpg"
        },
        postDate: "2023-12-05"
    }, {
        src: {
            jpg: "logs/log/logbook-33.jpg"
        },
        postDate: "2023-12-04"
    }, {
        src: {
            jpg: "logs/log/logbook-32.jpg"
        },
        postDate: "2023-12-03"
    }, {
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
    sd = id,
    ad = Yt(sd),
    Ws = () => ad().map(n => mt(ye({}, n), {
        srcJpg: n.src.jpg ? je(n.src.jpg) : void 0,
        srcPng: n.src.png ? je(n.src.png) : void 0
    })),
    ld = "/assets/instructions-modal-overlay-b0399863.png",
    _o = "/assets/terminal-logo-7a935f92.png",
    Ys = "/assets/logbook-page-bg-left-d97e3458.jpg",
    qs = "/assets/logbook-page-bg-right-98ad4729.jpg",
    Ks = "/assets/logbook-first-page-4594a73f.jpg",
    so = "/assets/player-controls-bg-272e65c2.jpg",
    Qs = e => e.reduce((n, t, r, i) => (r % 2 === 0 && n.push(e.slice(r, r + 2)), n), []),
    Js = async e => new Promise(n => {
        const t = new Image;
        t.onload = () => n(t), t.src = e
    });
var Ut = (e => (e[e.initializing = 0] = "initializing", e[e["loading-assets"] = 1] = "loading-assets", e[e["video-transition"] = 2] = "video-transition", e[e.done = 3] = "done", e))(Ut || {});
const cd = Fe(),
    ud = Ws(),
    fd = () => {
        const e = [Ys, qs],
            n = [...ud.map(i => i.srcPng || i.srcJpg), null].reverse();
        n.length === 1 && e.push(Ks);
        const t = Qs(n),
            r = t[t.length - 1];
        return r && e.push(...r.filter(i => !!i)), e
    },
    dd = [cd.bgSrc, ld, _o, so, ...fd()],
    [Xs, yo] = Y(0),
    [pd, gd] = Y(!1),
    [vd, hd] = Y(!1),
    md = ur("standalone"),
    _d = async () => {
        yo(1);
        const e = dd.map(n => Js(n));
        await Promise.allSettled(e), gd(!0)
    }, ea = () => {
        md || (window.location.href = "brawlstars-inbox://cctvloaded")
    };
ge(() => {
    pd() && vd() && (ea(), yo(2))
});
ge(() => {
    Xs() === 3 && ea()
});
const yd = () => {
        hd(!0)
    },
    bd = () => {
        yo(3)
    },
    st = {
        init: _d,
        currentStatus: Xs,
        onVideoTransitionLoaded: yd,
        onVideoTransitionEnd: bd
    },
    ta = e => e[Math.floor(Math.random() * e.length)],
    wd = "/assets/player-8b9a1305.mp3",
    Ad = "/assets/player-4aabf494.ogg",
    xd = V('<svg viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="path-1" d="M8 36L25 24L8 12V36Z" fill="currentColor"></path><path id="path-2" d="M25 36L42 24L25 12V36Z" fill="currentColor"></path><path id="path-3" d="M42 36L59 24L42 12V36Z" fill="currentColor">'),
    Sd = (e = {}) => (() => {
        const n = xd();
        return Ke(n, e, !0, !0), n
    })(),
    kd = V('<svg viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="path-1" d="M26 36L9 24L26 12V36Z" fill="currentColor"></path><path id="path-2" d="M43 36L26 24L43 12V36Z" fill="currentColor"></path><path id="path-3" d="M60 36L43 24L60 12V36Z" fill="currentColor">'),
    Td = (e = {}) => (() => {
        const n = kd();
        return Ke(n, e, !0, !0), n
    })(),
    $d = V('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 68"><path d="M60.66 16.06c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4Zm9.54-26.81c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36-4.06-.01-6.57-.12-7.52-.36Zm0 17.9c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36s-6.57-.12-7.52-.36Zm3.89-8.99c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .95-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.14-3.63-.4Zm13.43-17.91c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4ZM19.57 17.17c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM27.24 9.83c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.61c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33ZM26.11 50.21c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.22 3.22-.33 7.01-.33ZM33.78 57.55c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.21 3.22-.33 7.01-.33ZM1.43 31.5c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.43-.14-4.07-.45ZM.95 39.78c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.07 0-3.43-.15-4.07-.45ZM38.54 17.82c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 25.3c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 32.79c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 40.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 47.75c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.44-.14-4.07-.45ZM8.47 23.97c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79.01-6.12-.1-7.01-.33ZM38.54 55.24c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Z" fill="currentColor">'),
    Id = (e = {}) => (() => {
        const n = $d();
        return Ke(n, e, !0, !0), n
    })(),
    Pd = V('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M12 38h8V10h-8v28Zm16-28v28h8V10h-8Z" fill="currentColor">'),
    Od = (e = {}) => (() => {
        const n = Pd();
        return Ke(n, e, !0, !0), n
    })(),
    Dd = V('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M16 10v28l22-14-22-14Z" fill="currentColor">'),
    Ed = (e = {}) => (() => {
        const n = Dd();
        return Ke(n, e, !0, !0), n
    })(),
    Cd = V('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M23.495 27.969c2.28 0 4.13-1.913 4.13-4.273 0-2.36-1.85-4.273-4.13-4.273-2.281 0-4.13 1.913-4.13 4.273 0 2.36 1.849 4.273 4.13 4.273Z" fill="currentColor"></path><path d="M31.073 15.863a2.047 2.047 0 0 0-.137-.13 11.945 11.945 0 0 0-.504-.476 1.942 1.942 0 0 0-2.8.233c-.71.863-.609 2.162.225 2.897a7.06 7.06 0 0 1 2.374 5.306c0 2.261-1.068 4.39-2.856 5.695-.013.009-.023.02-.037.03a1.412 1.412 0 0 0-.066.05c-.909.636-1.15 1.913-.535 2.853.384.59 1.01.904 1.648.904.381 0 .768-.115 1.11-.353 2.953-2.064 4.717-5.498 4.717-9.184-.003-2.952-1.118-5.734-3.139-7.825Z" fill="currentColor"></path><path d="M35.168 11.425a1.917 1.917 0 0 0-.156-.145 17.637 17.637 0 0 0-.829-.79 1.942 1.942 0 0 0-2.8.233c-.71.864-.61 2.163.225 2.897 2.805 2.47 4.413 6.069 4.413 9.873 0 4.199-1.981 8.154-5.297 10.585-.072.052-.143.11-.218.162-.908.636-1.147 1.913-.535 2.853.384.59 1.01.904 1.648.904.381 0 .768-.115 1.11-.353C37.282 34.462 40 29.169 40 23.49c0-4.555-1.717-8.842-4.832-12.065ZM19.733 29.47c-.024-.016-.045-.032-.066-.049-.013-.01-.024-.022-.037-.03-1.788-1.304-2.856-3.434-2.856-5.695 0-2.045.864-3.98 2.374-5.306a2.104 2.104 0 0 0 .225-2.898 1.94 1.94 0 0 0-2.8-.233 9.434 9.434 0 0 0-.503.477 2.158 2.158 0 0 0-.14.132c-2.024 2.086-3.14 4.868-3.14 7.828 0 3.686 1.765 7.118 4.718 9.184.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.905.617-.945.376-2.223-.533-2.858Z" fill="currentColor"></path><path d="M16.496 34.24c-.074-.053-.143-.11-.217-.162-3.316-2.429-5.298-6.383-5.298-10.585 0-3.804 1.608-7.403 4.413-9.872.837-.735.938-2.034.226-2.898a1.94 1.94 0 0 0-2.8-.232c-.29.252-.562.518-.83.789-.052.046-.105.093-.156.145C8.716 14.648 7 18.935 7 23.493c0 5.679 2.718 10.969 7.271 14.153.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.904.614-.943.376-2.22-.533-2.856Z" fill="currentColor">'),
    Md = (e = {}) => (() => {
        const n = Cd();
        return Ke(n, e, !0, !0), n
    })(),
    jd = V('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.96 67.25"><path d="M86.24 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.65-7.86c-.42-.23-.63-.84-.63-1.83s.21-1.6.63-1.83C83.01.12 84.11 0 85.9 0s2.89.12 3.31.35c.42.23.63.84.63 1.83s-.21 1.6-.63 1.83c-.42.23-1.52.35-3.31.35s-2.89-.12-3.31-.35Zm6.77 15.72c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.18 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.18 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.7 7.86c-.39-.23-.58-.84-.58-1.83s.19-1.6.58-1.83c.39-.23 1.4-.35 3.04-.35s2.65.12 3.04.35c.39.23.58.84.58 1.83s-.19 1.6-.58 1.83c-.39.23-1.4.35-3.04.35s-2.65-.12-3.04-.35ZM61.57 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm3.12 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.17 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.17 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-42-41.98c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm7.67-7.35c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.5c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm12.74 6.6c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm7.67 7.34c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33ZM1.43 31.39c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm-.48 8.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM38.54 17.7c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM8.47 23.86c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm30.07 31.26c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Z" fill="currentColor">'),
    Bd = (e = {}) => (() => {
        const n = jd();
        return Ke(n, e, !0, !0), n
    })(),
    Ld = {
        "fast-forward": Sd,
        "fast-rewind": Td,
        mute: Id,
        pause: Od,
        play: Ed,
        live: Md,
        unmute: Bd
    },
    Rd = V("<span>"),
    Lt = e => {
        const [n, t] = co(e, ["name"]);
        return (() => {
            const r = Rd();
            return Ke(r, t, !1, !0), C(r, S(cs, {
                get component() {
                    return Ld[n.name]
                }
            })), r
        })()
    },
    na = {
        tl: "tl",
        bl: "bl",
        c: "c",
        tr: "tr",
        br: "br"
    },
    ra = e => {
        var n;
        return (n = Object.values(na)[e]) != null ? n : "c"
    },
    Vd = [{
        liveVideos: [{
            videoId: "6342781050112"
        }, {
            videoId: "6342781535112"
        }, {
            videoId: "6342779480112"
        }, {
            videoId: "6342780084112"
        }, {
            videoId: "6342781435112"
        }],
        postDate: "2023-11-02"
    }],
    zd = Vd,
    Nd = Yt(zd),
    bo = () => Nd()[0],
    Hd = (e = !0) => {
        let n = vs;
        return {
            get abort() {
                return n
            },
            exec: t => (e && n(), Promise.race([new Promise((r, i) => n = () => i(new Error("aborted"))), new Promise(r => t(r))]))
        }
    },
    ln = [4, 16, 32],
    Oi = Math.min(...ln),
    Di = Math.max(...ln),
    Ud = () => {
        const [e, n] = Y(Oi);
        let t = vs,
            r;
        const c = {
            timer: r,
            onTick: d => (t = d, c),
            start: () => {
                let d = 0;
                return r = setInterval(() => {
                    const p = Di / e();
                    d % p === 0 && t(), d++
                }, 1e3 / Di), c
            },
            stop: () => (clearInterval(r), r = void 0, n(Oi), c),
            currentSpeed: e,
            increaseSpeed: () => n(d => {
                const p = ln.indexOf(d);
                return ln[(p + 1) % ln.length]
            })
        };
        return c
    },
    Fd = e => {
        const n = ss(),
            t = Ud(),
            r = Hd(),
            [i, s] = Y(null),
            [l, u] = Y(0),
            [c, d] = Y(e.initialFeed),
            [p, o] = Y(null),
            [a, f] = Y("initializing"),
            [v, g] = Y(e.initialPosition),
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
                var x, A, E, $;
                return ($ = (E = (x = p()) == null ? void 0 : x.liveTracker.liveCurrentTime()) != null ? E : (A = p()) == null ? void 0 : A.duration()) != null ? $ : 0
            },
            H = () => a() === "seeking-bwd" || a() === "seeking-fwd" ? t.currentSpeed() : void 0,
            W = async x => {
                try {
                    const A = c(),
                        $ = await (await Rl(() => import("./player-81b647b8.js"), [])).initPlayer({
                            refNode: x,
                            videoId: A.videoId,
                            adConfigId: A.videoId && A.adId,
                            playlistId: A.playlistId,
                            options: {
                                loop: !0
                            }
                        });
                    if (!$) throw new Error;
                    $.on("error", () => f("error")), $.on("timeupdate", () => u($.currentTime())), $.one("canplay", () => f("ready")), $.one("playing", () => f("playing")), $.on("ended", () => f("ended")), o($)
                } catch (A) {
                    console.error(A), f("error")
                }
            }, B = async x => {
                (x.videoId ? c().videoId === x.videoId : c().playlistId === x.playlistId) || (f("initializing"), s(null), d(x), await r.exec(A => {
                    var E, $, U;
                    (E = p()) == null || E.pause(), (U = ($ = p()) == null ? void 0 : $.catalog) == null || U.get({
                        id: x.videoId || x.playlistId,
                        adConfigId: x.adId,
                        type: x.videoId ? "video" : "playlist"
                    }, (G, K) => {
                        var X, ne, _e, O;
                        if (G) f("error");
                        else {
                            const N = Array.isArray(K) ? K : [K];
                            if (!N.length) return A();
                            const F = N.length > 1;
                            (X = p()) == null || X.loop(!F);
                            const R = Object.values(na).indexOf(v()),
                                Z = F ? N[R % N.length] : N[0];
                            (_e = (ne = p()) == null ? void 0 : ne.catalog) == null || _e.load(Z), (O = p()) == null || O.one("canplay", () => {
                                var q;
                                (q = p()) == null || q.play(), f("playing"), A()
                            })
                        }
                    })
                }))
            }, j = async () => B(e.initialFeed), z = () => {
                var x;
                (x = p()) == null || x.dispose(), o(null)
            }, L = async () => {
                await r.exec(x => {
                    var A;
                    (A = p()) == null || A.play(), x()
                }), f("playing")
            }, J = async () => {
                await r.exec(x => {
                    var A;
                    (A = p()) == null || A.pause(), x()
                }), f("ready")
            }, de = async () => {
                !y() || b() || (f("syncing"), await r.exec(x => {
                    var A, E, $;
                    (A = p()) == null || A.liveTracker.seekToLiveEdge(), (E = p()) == null || E.play(), ($ = p()) == null || $.one("timeupdate", x)
                }), f("playing"))
            }, M = async x => {
                var A, E;
                f(x === 1 ? "seeking-fwd" : "seeking-bwd"), await r.exec($ => {
                    var U;
                    (U = p()) == null || U.pause(), t.start().onTick(() => {
                        const G = l() + 1 * x;
                        x === -1 && G <= 0 || x === 1 && G >= P() ? $() : u(G)
                    })
                }), t.stop(), x === 1 ? y() ? f("ready") : ((A = p()) == null || A.currentTime(0), f("ended")) : ((E = p()) == null || E.currentTime(0), f("ready"))
            }, I = async () => {
                var x, A;
                Math.abs(l() - ((A = (x = p()) == null ? void 0 : x.currentTime()) != null ? A : 0)) < 3 || (f("syncing"), await r.exec(E => {
                    var $, U, G;
                    ($ = p()) == null || $.pause(), (U = p()) == null || U.currentTime(l()), (G = p()) == null || G.trigger("timeupdate"), E()
                }), f("ready"))
            };
        return {
            uid: n,
            feed: c,
            isCenter: h,
            isEnabled: w,
            isLive: y,
            isAtEdge: b,
            position: v,
            setPosition: g,
            status: a,
            time: l,
            setTime: u,
            duration: P,
            seekerSpeed: H,
            switchFeed: B,
            resetFeed: j,
            Player: {
                mount: W,
                unmount: z,
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
                                await J();
                                break;
                            case "fwd":
                                await M(1), await de();
                                break;
                            case "rev":
                                await M(-1);
                                break;
                            case "go-live":
                                await j(), await de();
                                break
                        }
                    } catch (A) {
                        throw new Error('action "'.concat(x, '": ').concat(A.message))
                    }
                }
            }
        }
    },
    qe = bo().liveVideos.map((e, n) => Fd({
        initialFeed: e,
        initialPosition: ra(n)
    })),
    [Gd, Zd] = Y(!1),
    [Wd, oa] = Y({
        liveVideos: bo().liveVideos
    }),
    Ft = () => qe.filter(e => e.isEnabled()),
    Yd = () => Ft().find(e => e.isCenter()),
    qd = () => {
        const e = Ft().filter(n => n.isLive() && n.status() === "playing");
        return e.length > 0 ? e.every(n => n.isAtEdge()) : !1
    },
    Kd = xe(() => qe.length > 0 && qe.every(e => e.status() !== "initializing")),
    Qd = xe(() => Ft().length > 0 && Ft().every(e => e.status() === "ended")),
    Jd = e => {
        const n = qe.find(r => r.uid === e.uid),
            t = qe.find(r => r.position() === "c");
        lr(() => {
            t.setPosition(n.position()), n.setPosition("c")
        })
    },
    Xd = () => {
        lr(() => {
            qe.forEach((e, n) => e.setPosition(ra(n)))
        })
    },
    ep = async e => {
        var t;
        const n = (t = Yd()) == null ? void 0 : t.time();
        if (n) return e.setTime(n), e.Player.dispatch("sync")
    }, tp = async e => {
        try {
            e === "play" && await Promise.all(Ft().map(ep)), e === "go-live" && oa({
                liveVideos: bo().liveVideos
            }), await Promise.all(Ft().map(n => n.Player.dispatch(e)))
        } catch (n) {
            console.warn(n)
        }
    }, np = async e => {
        try {
            oa(e), !!e.archivePlaylist ? await Promise.all(qe.map(t => t.switchFeed(e.archivePlaylist))) : await Promise.all(qe.map((t, r) => {
                const i = e.liveVideos[r % e.liveVideos.length];
                if (i) return t.switchFeed(i)
            }))
        } catch (n) {
            console.warn(n)
        }
    }, pe = {
        screens: qe,
        Supervisor: {
            dispatch: tp,
            positionScreenAtCenter: Jd,
            resetScreensPosition: Xd,
            controlsVisible: Gd,
            setControlsVisible: Zd,
            switchFeed: np,
            allAtEdge: qd,
            allLoaded: Kd,
            allEnded: Qd,
            currentFeed: Wd
        }
    }, rp = V('<div role="button" class="absolute top-0 left-0 wh-full">'), op = V('<div class="absolute bottom-0 left-0 right-0 h-[228px] px-[158px] flex space-x-68 items-center justify-center"><button></button><button></button><button></button><button>'), Fn = ["w-[330px] h-[100px] flex-center bg-player-control-btn text-green rounded-sm", "shadow-player-controls-btn active:shadow-player-controls-btn-pressed", "[&>span]:w-72 [&>span]:drop-shadow-terminal"], ip = () => {
        const e = ct([Ad, wd], {
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
            const n = rp();
            return n.$$click = () => pe.Supervisor.setControlsVisible(!1), n
        })(), (() => {
            const n = op(),
                t = n.firstChild,
                r = t.nextSibling,
                i = r.nextSibling,
                s = i.nextSibling;
            return "url(".concat(so, ")") != null ? n.style.setProperty("background-image", "url(".concat(so, ")")) : n.style.removeProperty("background-image"), t.$$click = () => {
                ie.trackClickEvent("player-controls", "rewind", "cctv-room"), pe.Supervisor.dispatch("rev"), e.play("rewind-click", {
                    interrupt: !0
                }), e.play("rewind-loop")
            }, C(t, S(Lt, {
                name: "fast-rewind",
                class: "!w-112 ml-22 [&_#path-3]:hidden"
            })), r.$$click = () => {
                ie.trackClickEvent("player-controls", "play", "cctv-room"), pe.Supervisor.dispatch("play"), e.play("play", {
                    interrupt: !0
                })
            }, C(r, S(Lt, {
                name: "play"
            })), i.$$click = () => {
                ie.trackClickEvent("player-controls", "forward", "cctv-room"), pe.Supervisor.dispatch("fwd"), e.play("forward-click", {
                    interrupt: !0
                }), e.play("forward-loop")
            }, C(i, S(Lt, {
                name: "fast-forward",
                class: "!w-112 ml-22 [&_#path-3]:hidden"
            })), s.$$click = () => {
                ie.trackClickEvent("player-controls", "pause", "cctv-room"), pe.Supervisor.dispatch("pause"), e.play("pause", {
                    interrupt: !0
                })
            }, C(s, S(Lt, {
                name: "pause"
            })), Q(l => {
                const u = ce(Fn),
                    c = ce(Fn),
                    d = ce(Fn),
                    p = ce(Fn);
                return u !== l._v$ && te(t, l._v$ = u), c !== l._v$2 && te(r, l._v$2 = c), d !== l._v$3 && te(i, l._v$3 = d), p !== l._v$4 && te(s, l._v$4 = p), l
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), n
        })()]
    };
Ie(["click"]);
const sp = (e, n) => {
        const t = e * n / 100;
        return e - t
    },
    Ei = e => e.touches.length === 2,
    Ci = e => Math.hypot(e[0].pageX - e[1].pageX, e[0].pageY - e[1].pageY),
    ap = e => {
        const [n, t] = Wt({
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
        }), r = () => {
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
        }, l = d => {
            !Ei(d) || !n.isEnabled || (d.preventDefault(), t({
                isZooming: !0,
                start: {
                    distance: Ci(d.touches),
                    x: (d.touches[0].pageX + d.touches[1].pageX) / 2,
                    y: (d.touches[0].pageY + d.touches[1].pageY) / 2
                }
            }))
        }, u = d => {
            !Ei(d) || !n.isEnabled || (d.preventDefault(), t(p => {
                const o = "scale" in d ? d.scale : Ci(d.touches) / n.start.distance,
                    a = (d.touches[0].pageX + d.touches[1].pageX) / 2 - p.start.x,
                    f = (d.touches[0].pageY + d.touches[1].pageY) / 2 - p.start.y;
                return {
                    scale: Math.min(Math.max(1, sp(o, 10)), 4),
                    delta: {
                        x: a,
                        y: f
                    }
                }
            }))
        }, c = () => {
            s()
        };
        return Gt(() => {
            var d, p, o;
            (d = e.targetRef()) == null || d.addEventListener("touchstart", l), (p = e.targetRef()) == null || p.addEventListener("touchmove", u), (o = e.targetRef()) == null || o.addEventListener("touchend", c)
        }), Ae(() => {
            var d, p, o;
            (d = e.targetRef()) == null || d.removeEventListener("touchstart", l), (p = e.targetRef()) == null || p.removeEventListener("touchmove", u), (o = e.targetRef()) == null || o.removeEventListener("touchend", c)
        }), {
            data: n,
            controls: {
                enable: r,
                disable: i
            }
        }
    },
    An = yn("", {
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
    se = e => {
        const [n, t] = co(e, ["size", "as", "class", "children"]);
        return S(cs, Xa({
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
    lp = "/assets/seek-video-dab3075d.mp4",
    cp = V('<video playsinline muted loop class="absolute top-0 left-0 wh-full object-cover">'),
    up = V('<div class="absolute top-0 left-0 bg-black z-10 wh-full">'),
    Mi = V("<span>"),
    fp = V('<div class="absolute top-72 left-72 flex items-center space-x-8 text-white">'),
    dp = {
        "seeking-fwd": "seeking-fwd",
        "seeking-bwd": "seeking-bwd",
        ready: "ready",
        playing: "playing",
        error: "error"
    },
    pp = {
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
    gp = e => {
        let n;
        const [t, r] = Y(void 0);
        ge(() => {
            const c = e.screen.status();
            if (c === "syncing") return;
            const p = e.screen.isAtEdge() && c === "playing" ? "live" : dp[c];
            r(p);
            let o;
            (p === "playing" || p === "live") && (o = setTimeout(() => r(void 0), 1500)), Ae(() => clearTimeout(o))
        });
        const [i, s] = Y();
        ge(() => {
            var f;
            if (!e.screen.isEnabled()) return;
            const c = e.screen.feed().playlistId ? (f = e.screen.feed().metadata) == null ? void 0 : f.date : void 0;
            if (!e.screen.isLive() && !c) {
                s(void 0);
                return
            }
            const d = c ? c.add(e.screen.duration(), "seconds") : Ss(_s),
                p = e.screen.time(),
                o = e.screen.duration() - p,
                a = d.subtract(o, "seconds");
            s({
                date: a.format("DD.MM.[95]"),
                time: a.format("HH:mm:ss")
            })
        });
        const l = () => t() ? pp[t()] : void 0,
            u = () => t() === "seeking-bwd" || t() === "seeking-fwd";
        return ge(() => {
            n && (u() ? n.play() : n.pause())
        }), ge(() => {
            const c = e.screen.seekerSpeed();
            !n || !c || (n.playbackRate = c === 4 ? 1 : c === 16 ? 1.5 : 2)
        }), [(() => {
            const c = cp(),
                d = n;
            return typeof d == "function" ? $e(d, c) : n = c, oe(c, "src", lp), Q(() => (u() ? "visible" : "hidden") != null ? c.style.setProperty("visibility", u() ? "visible" : "hidden") : c.style.removeProperty("visibility")), c
        })(), S(ls, {
            get children() {
                return [S(jt, {
                    get when() {
                        return t() === "error"
                    },
                    get children() {
                        return up()
                    }
                }), S(jt, {
                    get when() {
                        return t() !== "error"
                    },
                    get children() {
                        return [S(Le, {
                            get when() {
                                return l()
                            },
                            children: c => (() => {
                                const d = fp();
                                return C(d, S(se, {
                                    size: "screen-overlay-md",
                                    get children() {
                                        return c().text
                                    }
                                }), null), C(d, S(Lt, {
                                    get name() {
                                        return c().icon
                                    },
                                    get class() {
                                        return ce("pt-4", {
                                            "w-[85px]": !u(),
                                            "w-120": u(),
                                            "[&_#path-2]:hidden [&_#path-3]:hidden": e.screen.seekerSpeed() === 4,
                                            "[&_#path-3]:hidden": e.screen.seekerSpeed() === 16
                                        })
                                    }
                                }), null), d
                            })()
                        }), S(Le, {
                            get when() {
                                return xe(() => !!i())() && e.screen.isEnabled()
                            },
                            get children() {
                                return S(se, {
                                    as: "div",
                                    size: "screen-overlay-sm",
                                    class: "absolute bottom-72 left-72 flex flex-col items-start text-white",
                                    get children() {
                                        return [(() => {
                                            const c = Mi();
                                            return C(c, () => i().time), c
                                        })(), (() => {
                                            const c = Mi();
                                            return C(c, () => i().date), c
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
    vp = V('<button class="absolute top-0 left-0 isolate"><div>'),
    hp = {
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
    mp = e => {
        const [n, t] = Y(void 0);
        let r;
        const i = () => hp[e.screen.position()],
            {
                data: s,
                controls: l
            } = ap({
                targetRef: n
            });
        return ge(() => {
            st.currentStatus() === Ut.done && Ye.dataUsageWarningDialog.accepted() && r && !e.screen.Player.isMounted() && e.screen.Player.mount(r)
        }), Ae(() => {
            e.screen.Player.unmount()
        }), ge(() => {
            e.screen.position() === "c" && !["initializing", "error"].includes(e.screen.status()) ? l.enable() : l.disable()
        }), (() => {
            const u = vp(),
                c = u.firstChild;
            u.$$click = () => {
                var p;
                (p = e.onClick) == null || p.call(e)
            }, $e(t, u);
            const d = r;
            return typeof d == "function" ? $e(d, c) : r = c, C(u, S(gp, {
                get screen() {
                    return e.screen
                }
            }), null), Q(p => {
                const o = "".concat(i().coordinates.y, "px"),
                    a = "".concat(i().coordinates.x, "px"),
                    f = "".concat(i().size.width, "px"),
                    v = "".concat(i().size.height, "px"),
                    g = i().transformOrigin,
                    m = s.isZooming ? "10" : void 0,
                    h = "translate3d(".concat(s.delta.x, "px, ").concat(s.delta.y, "px, 0) rotateZ(").concat(i().rotation || 0, "deg) scale(").concat((i().scaleFactor || 1) * s.scale, ")"),
                    y = i().hidden ? "hidden" : void 0,
                    w = ce("Video", e.screen.status() === "initializing" && "invisible");
                return o !== p._v$ && ((p._v$ = o) != null ? u.style.setProperty("top", o) : u.style.removeProperty("top")), a !== p._v$2 && ((p._v$2 = a) != null ? u.style.setProperty("left", a) : u.style.removeProperty("left")), f !== p._v$3 && ((p._v$3 = f) != null ? u.style.setProperty("width", f) : u.style.removeProperty("width")), v !== p._v$4 && ((p._v$4 = v) != null ? u.style.setProperty("height", v) : u.style.removeProperty("height")), g !== p._v$5 && ((p._v$5 = g) != null ? u.style.setProperty("transform-origin", g) : u.style.removeProperty("transform-origin")), m !== p._v$6 && ((p._v$6 = m) != null ? u.style.setProperty("z-index", m) : u.style.removeProperty("z-index")), h !== p._v$7 && ((p._v$7 = h) != null ? u.style.setProperty("transform", h) : u.style.removeProperty("transform")), y !== p._v$8 && ((p._v$8 = y) != null ? u.style.setProperty("visibility", y) : u.style.removeProperty("visibility")), w !== p._v$9 && te(c, p._v$9 = w), p
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
            }), u
        })()
    };
Ie(["click"]);
const _p = () => {
        if (!Ol()) return !0;
        const e = window.navigator;
        return !!(e.mediaCapabilities && e.mediaCapabilities.decodingInfo)
    },
    yp = V('<img class="absolute top-0 left-0 wh-full pointer-events-none">'),
    bp = V('<video muted playsinline loop class="absolute top-0 left-0 h-full pointer-events-none"><source type="video/mp4; codecs=hvc1"><source type="video/webm">'),
    wp = () => {
        let e;
        return Gt(() => {
            if (_p()) try {
                e == null || e.play()
            } catch (n) {
                console.error(n)
            }
        }), [(() => {
            const n = yp();
            return Q(() => oe(n, "src", Fe().bgSrc)), n
        })(), S(Le, {
            get when() {
                return xe(() => !!Fe().overlayVideoMp4)() && Fe().overlayVideoWebm
            },
            get children() {
                const n = bp(),
                    t = n.firstChild,
                    r = t.nextSibling,
                    i = e;
                return typeof i == "function" ? $e(i, n) : e = n, Q(s => {
                    const l = Fe().overlayVideoPoster,
                        u = Fe().overlayVideoMp4,
                        c = Fe().overlayVideoWebm;
                    return l !== s._v$ && oe(n, "poster", s._v$ = l), u !== s._v$2 && oe(t, "src", s._v$2 = u), c !== s._v$3 && oe(r, "src", s._v$3 = c), s
                }, {
                    _v$: void 0,
                    _v$2: void 0,
                    _v$3: void 0
                }), n
            }
        })]
    },
    Ap = V('<button class="absolute origin-top-left">'),
    xp = [{
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
    Sp = e => S(uo, {
        each: xp,
        children: n => (() => {
            const t = Ap();
            return t.$$click = () => e.onItemSelected(n.appName), Q(r => {
                const i = "".concat(n.size.width, "px"),
                    s = "".concat(n.size.height, "px"),
                    l = "translate(".concat(n.position.x, "px, ").concat(n.position.y, "px)");
                return i !== r._v$ && ((r._v$ = i) != null ? t.style.setProperty("width", i) : t.style.removeProperty("width")), s !== r._v$2 && ((r._v$2 = s) != null ? t.style.setProperty("height", s) : t.style.removeProperty("height")), l !== r._v$3 && ((r._v$3 = l) != null ? t.style.setProperty("transform", l) : t.style.removeProperty("transform")), r
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }), t
        })()
    });
Ie(["click"]);
const kp = "/assets/answering-machine-button-glow-58ea4526.svg",
    Tp = V('<img class="absolute origin-bottom-left">'),
    $p = {
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
    Ip = () => {
        const e = $p["phone-button-light"];
        return S(Le, {
            get when() {
                return Ye.answeringMachineTrack.hasNew()
            },
            get children() {
                const n = Tp();
                return oe(n, "src", kp), Q(t => {
                    const r = e.size.width,
                        i = e.size.width,
                        s = "translate(".concat(e.position.x, "px, ").concat(e.position.y, "px)");
                    return r !== t._v$ && oe(n, "width", t._v$ = r), i !== t._v$2 && oe(n, "height", t._v$2 = i), s !== t._v$3 && ((t._v$3 = s) != null ? n.style.setProperty("transform", s) : n.style.removeProperty("transform")), t
                }, {
                    _v$: void 0,
                    _v$2: void 0,
                    _v$3: void 0
                }), n
            }
        })
    },
    Pp = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAAAwECBAUGBwgBAQACAwEBAAAAAAAAAAAAAAABBQIDBgQH/9oADAMBAAIQAxAAAAD5/rSpJbW3JaMQCWKaYomz89Wtt6GDLTo2diYemAYZgAAAAAAC4tyr+gz8cfabLprHhdfou0k9NH4zyftvm9f23G02OD4+osEbAAAAABUv2UPabqyHu9vv7T5zisp6efx7JZU4fPddXHd4ryXv/mlf3Hm8W11lf2tojaAAAAkjvRvPWfJvYbDidhu9Rt7HhcPIjmnXh5kF6bLg1GJsMDTZ+Rc90XO0/wBSiGv3gAAAK0Gw6fjNvtrfZdtzO8tvme1gsw9nh32HZjzhs9Tna+M8nzX0Lznz33HarLwqr6OGO8AAAACuTi1nHqu+8y9X9vIrci/1c3AmTENmTZE8Ty255Gu7qsVaaLkEgAAAAAL7CJEYkRiSlgrQSAAAAAAAAAAAAAAAAB//xAA0EAACAQMDAgMFBwQDAAAAAAABAgMABBEFEiETMQYiURQwUmFxFRYgMkBBkSNQgZJTgsH/2gAIAQEAAT8AoAsQACSaSCZ/yoTTxvG211IPofxCGVlDKjEH0oQylgvTbJ7ZGKMMqjLIwHzGKNtOO8b/AMUbeb/jb+KEMpAIRiD6DNNDKgJaNgM4yR7tWKkEHBFLLIvZiOc0zMxyxJP4kllXAVyMdsUiux7mlhlk/MzGhbXJHdqaGaPsTTdZF2hiBTySkbWdiPTP6OKMtVjp7ysoC8kgCrPwzd7lDwMvzYcCodNsolCR2gnAbzuyhv8AXFXvh8yndaozof8ALL8mxWp6Lc2uOrEyZzjcMZxU8RUmiMH9AFJqK2ZiOKs9OZscV4ftvZ5OUG112nira2aMv1GY4baBuPepopRJGQ4P0AFS25dSpbzFTgjy4/wK1G2f2AozZMj5wecBavdOYE8VPasp7UyEe+Vc1b2xYjirDTixHlrTtFYhSV49ags4YVACgmiM71YYyc0qnHmjLH1oAqWZu+MAV7IkseJFP1rUNEOGKrkYrUNNKk+Wrm2Kk8U6Y94Bk1BFuIrR9JluGUKhPIrTtHt4FUuVZscgGvKOOK3D1FZHqKaMM3lagoUVkeoo4xV9ptrdAksqt+5rWNHlgLErkeo5H81cw7SaYY93H3qyUFlqxYxaXA1t5cnErDht319KsJo9qq4IbPcUyKwLZPaozucLUi7VCr3Y0jtFLg1O2Is1BtcNknimc7JsNkBeDUSLPcbHJxz2q7SP+rDE4lh6EjFTyFIH5q1BAGapBz7tO9WLgOua0W6tfZYBblBIFHWDttDH5Zr2Qlg6iNV+T5FLs2BQwPHrUdu6uGOKaIs+7OPSpbZmbIOaZGaEJxn61FbBVbfSqxjePKnIOOa9jaNyzhWGCdu7k1LFH0LhJJUWFvPncN64Hw1qLDe1Sd/direTBqxumUrzUFwx0qNs4/qH/tWmgSRs5Y8GjOwjOOfNtBpbp0l2uTwcEVOxERZTVqesWyx4rccyoGJAU8+lQXIjlJPwmrhmFq9yPM5GAfhrUrlyXyau5CWNMcn3kbYNWs2CK0do59IdOvErtKDh3C8LVoLe2hbqywuxIC7XzU9xApDm4QIgG3YwY5+lO8VyRJHdLnOD1CEoSKbVo2nh3dh5xUIgiSRpZozxxtcE1DLEiSIZ4sHODvFW6RwzdWSeAgAkYkHeo7mNiJYpYVRx50dwvNeIxDBdypFIrJ3Uqc8Gp3yT70VG+DWnyXDglAxVdu5gDhdxwMn9s1baFqLorEYyAaPh6/Nfd++BA/8AaGg6hX2Ff19hX2SAafQL8g4rVBc2MjRyZDCri5L5yads++BxWk6rJZNOE2jrII3YjLbM5IHpn96g8WaY6Rl0cOEVT5h+1febSfR/9h6Yp/FOluqqQ/Ax+YUPFGlAg7X+m4UfFOmZUjfwQe45xT+KNLd92HHrhhUnifSSDlJD9HrxNrMV/dPJGCAaMhNE/oBI47Ma6snxGurJ8RrqyfEa6snxmurJ8RrqSfEaJJ7n+9//xAAoEQABAwIDBwUAAAAAAAAAAAABAAIRAyEEEjEgIiMwQVKhEEBRYWL/2gAIAQIBAT8ARyRaZ9Rlm8oNaflZG/pEMA6zymsJVGg2ASjSa4RCr0YNkQRyKbC4qlhwBJUBQnU2uCr4ci40REbeF1N+iZMQUAYV7q8Igxoqmp26boKYZynpCLvtE3CJO6sQdwEFON9sFYYsM53KMP3eVwO/yuB3eVVcM5DTI9//AP/EAC4RAAICAQMBBgMJAAAAAAAAAAECAxEABAUSMRMgITBBUVSBkgYUJEBhcpHR4f/aAAgBAwEBPwDuHHmVOpwauMmgcVw3TytRqo4lNnN03qbtHSNgAB4epOQ7jNE4cS2W62Sc2jdTKlSEWDVjEkVwCD5Gu1iQRlmYADNy3t5mKxdPfO0ckliSThcfzkOtnhfkp+WbPvaS0jGm9jkTh1B7zdDn2jLBIzwLAPdenzzUlS4dCbPUe2Oy8xTeAGMUYxtYv1wlCxINixkTqZAVckUBWaG+zXv6zTh1PhmsiC9vGLDdqaAGRwgi2SlPrR8DiRVHIvjy5UKGRKoWYEHoK/XNjQfeWjZPHqP6yBOKDvsvIZv0esiMR0sPK75GrrOe9fDmv2Ze8/DH6MU7zY/DH6P9zbNO500TzRhZCo5DAKHkUDnFfYZxX2GcV9h+T//Z",
    Op = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQgBAQACAwEBAAAAAAAAAAAAAAADBAECBQYH/9oADAMBAAIQAxAAAAD5/wDfKi9Qp2UHurxctsL9i/nKny7nHlNYo8uUlg91z498AAAFy3Oz2I1IW7FqO27WNyi87lQM7ib8PAsbZbNfm8GWaapHb5D6W7GVYl94NeksyNxmrTOh6Bp0zMS+ow8eatEOKPOTcJOW70UkNt5MeiVdSc2XlrqQ5b71EctdSGkYHRm0HLPepNZ+W+dTHLaeqDldHVoCXXTM61d9JLDinzU5Bzlu9l9l432bwt/YardPjOvWpqKvKKirykVqK8Ka7GQWynK55RSZOm7hqNuHjNq9Z+v8WHFflpyDnLd6neuZ18bXs7jjkz9jccHY3HB2Nyrss3Ij3uh5xvbjiDsdjccHY3HB2HWtDszaZleDneq2hxT5qbhJy3eibN6zWqBroABXJxLMcrh4xgMSgAAZOfgZ97ow4o85NQ/s08/RCrNuaQrGJpCiaQomkKJpCiaQomkKJpCiaQonsGPoxrSqUqHTwAAAAAAAAAAAAf/EACMQAAAFBAMBAQEBAAAAAAAAAAIDBAUVARIUFgAGExAwIED/2gAIAQEAAQIA4EJSU0n+aJqJhEDS1TYwyPyCIB4zOW+PwCmpxhmYBWFSYfylKU/ssrCwjSCE4RCZ9dM68WwrAqmBe2mJRtsIFEhbBF4WFhDL+M9TXaYVLSySkmEYnUJ3UqiU9OSlKCvbiULMqQIvaYmCHV5+tPDg0IxvDw8PDxqR4Jl64zH8PCifwxsYRKajx9aeAJbmDU9T1PU9T1PU9T1PU9T1PU9T1PUxdTdGIJbx9aeIg9aLqbf6iO9AGX+tTKDCaIVDanVH687eA6jx9aeIa9bGEmiYJHl4FlCJoTQiwwgQaleAyKEUp24R1Xj608KOaOxbft+37ft237ft+37dt+37dt+37eLt712Ghjx9aeHCCqzs7Ozs7Obj9Uc+udsIzs7Ozs7OqtGpTVePrTxR+BZk6J7VLPwS8ePrTxR/kS8ePrSYY3xsbGxsbGxsbGxsbGxsbGxsbGxpSB2M5bSl111111111111111111111aWx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx/wD/xAA5EAABAwIDAwgJAwUBAAAAAAABAAIDBBESUVQhkZMQEzFBYnGS0QUUIiRSYXOhsSMwMiAzgYLBQP/aAAgBAQADPwBOcQ1oJJ6AFUS/wjJUkL8EjcLsv6p3RiRsZLT0EKcvazmnBzr2BFr271M1uN0bg29rkWVSwkGF+66nAuYn7lOWtcInEOFwQLqZgJdE4AG1yNn7bmODmkgjoKmZ/F5G2+xPkOJ7i42tc8hte2xSAYi2w5Z4w0MlcAOixUpNzI69iOnPpVU8HG95Bte5yVVe/PP3qoYbtlPX91VMiwNkcGKoe2z5XFuRPISLono/YfIbNCnyU+SfEAXDpUTvR0bHRkMMEspN9mKNwAf/AKqSKd0MhrIoQ8MYwMBjw/N/zVK18rp2TxtMsgjYwB5DWHr7s1FE4Rz+sF77uZzTQ8YMyntnY0YsALmv2i4cwXcB3BUjZBidO6wBLWgOdZwu02H3VLHggbT1Doud5iRg2m2DEGC2+6LS0Q48WKO4fYbJjZm8r1aSLBidHJiDSbXuw4XCw+axQH0b6s8SRsBDr7DM0YngdRu1RT0RY+J7I4IopC7EPZDhief9lRPsWPnAL8HtgNIfbFY5AhUlLTQxilq3xzlwf7NnktthOHskr1V0sT4HnHO2M2cATG9pdgPzKxzuY0bSVPkp8lP8Kcw2cOXCZHDpDHn7KpbI4B7t6qvjdvU1SGh7iQCo3egsYijx8xIMeP55fFkpof0jTSz7LYnTgxHZ0gFSS1EcrQZogzmXczLhOJmwuN+pyeyazafEwlpa+GYAsAFsDr71JG+ZrPR7JsTnubIyUYRjFrG/wqajpXSNayJ5MQDo3nHsbttb7qdj3TtihcRPjEbZNrmlgaQ05A7U9kgkFCJw9kfsiUYmOZ8RPW6+1Gpmo5RDEebE7zGX7XkPsGH/AIqU1opGlzqmN98Rl/Se8bSAPn0KeeGsEMcMWIRljRJtdhBu0J4jhPqoBEpMnPzBxIDDYk5XU1RF/EzSQg3vLaRwkFrgn4UGS1TJhHMRM1wLpdrQW3s45Zp0FWZGHa1xsQqr43b1VfG7eql8li929e8v7+XZL9N/4RMru9OKfkpVLl9lLkpcvspVKVLkhFSx08tCyUMc4tJJafa7lNV1DpubawWADWjYABYBSXupVLa1vspApclJkU/JOCtKF7y/v5dkv03/AIWOd3ep6ppMUJfa17Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTOVRRtBmhczFe1+uywTL3l/fy/wB36b/wgag96DIZfmGqMC5cOr7pmYTLs7Rso2329BF0y4GLpTHlwbttZMBIv0Dao9ntdKjAviCaSLEbRdMcwOvYEH7INaXHoATSG32E9SjAJvexA3pgNiVHa+LrtyB0FP8AIPVqhe8v7+X+79N/4Vqj/KDoZe5qDSDiJsRb/CaCDidsFvtZBotjP8sS7WzFcC3zum4g66wX9om4A7gEHOeS7+QssNsLrHr2DagCfaNtn2N17Ydi6ARZEsDQSdp67WBQc1zT1iyBI2kAAAjOyGEjGegAHK20LE7FiN7f8srtaH2FidxRBccRN/sgIIO56vUL3l/fy/3fpv8AwsE571JRMcIy32rXuL9Cmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8KntsMfhU1e1gkLLMvbCLdKxzr3l/fy7Jfpv8Awi2Z3enN60/NPzKfmU/Mp+ZT8yufrYI33LXOsV6IHTBMe55XoymgY+OGQEyBvtPv0qH0V6VNNTYgwRMdtNzdyfmU/Mp+ZT8yn5lPzKfmnO61eYL3l/fy7Jfpv/C/Vd+w+N7XscQ4dBXpbX1HFf5r0o62Ksmdtv7T3O/KqKuTnJ5XPfa13G5/Z/VC95f38uyX6b/wv1Xf+T9UL3l/fyxtc8PcGgscLn5hUz3l3rEe8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqZjr+sR7z5Jj6h5Ybi/I74SnjoBU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aTz0gp3wlUGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bV//8QANREAAQIDAwkHAgcAAAAAAAAAAQACAwQRElORBRATFBUWIjRUBiAhMUFRYWJxMDI1UnJzsf/aAAgBAgEBPwBGzT1rnFPVcPyuD5XBT170tCEWM1hNAUWSAJGkiYICHbfoyS2z6pza0q1GEz9qa0CoDU6E3yA8UGggmlfRBrQRw0JT2tGjteDbXirMheRMFEgS+gdFhPcaOAIIzSPMsU5Ow5dzy9wAqtty163Fbclr1uK25LXrcVtyWvW4o5egEUMVmIW3Ja9bituS163Fbclr1uKg5Xl4rw1sRpJ+VCIdk+KfrbmkeZYu0tbMT2tKjPcrgRsUNCVRnuuH3RDfD7rgVGUHisnc7Bp7n/FKfpkT+bc0jzLFPyEOZL2vAIqt35a7C3flrsLd+WuwoXZiDFBLWMUTsvChgksYt35a7C3flrsLd+WuwoGRJeDEDxDAIUFtnJ8UfW3NI8yxP/O779wOcPIlFzj5k91nIxf7G5oEXQxWvpWiMzLkk6s3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lRZpjoJhMhBgJBP4/wD/xAA2EQABAwAGBwUGBwAAAAAAAAABAAIDBAURFCFSEBIVQVFUkRMgNHOxBiIxM2FxIzA1RFOBkv/aAAgBAwEBPwDSCD8DotWPfosLZ52RuNgKMdWgkdrJgcqrp0THQCJztQygAnDcoZuzLyyYNBaLXAjGz+8CfqmVnSbR+OCXN3loHqpZnvEUsk+sLHBotA97BUespbA98gLADbiMpPHiFJO5j4mmQstIfrHiSAXDH4FPnmlY93bFzIyLRrAYm0DEFVVKJaVNrvJFkes4fXeBatSrf5Zf8qWj0a7Omhe42OAII46Ku8XGhA6SRwA3lXCXIVcJMh6LZ8mQ9FcJMhTKnayQyNidrG3jvxKuEmQq4SZCrhJkKfQ5GAktKYLKum8xvodFXeLjVBs7Z33K97gveWKxWKFqxVruCpPyHr9hP5rfQ6Ku8XGm0h0UjiDvK2jLmK2jLmK2jLmKrL2qhq18bJ+0JeCRqqge1sFOlbHEZASHHEZVtGXMVtGTMVtGXMVJTpHtLS42Jhtq6fzG+h0Vd4uNSfMf9z3HwxSEF8bXfcWpkEDDrMiY08QO7H+nTeY30OijzGCZsgFtm5Gl0Ukk0RvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUqamRvgMMcAYC4E/n//Z",
    Dp = V('<div class="absolute origin-top-left bg-black"><img class="absolute top-0 left-0 wh-full object-cover"><img>'),
    Ep = "absolute top-0 left-0 wh-full object-cover",
    Cp = () => (() => {
        const e = Dp(),
            n = e.firstChild,
            t = n.nextSibling;
        return e.style.setProperty("width", "150px"), e.style.setProperty("height", "85px"), e.style.setProperty("transform", "translate(403px, 924px) rotateZ(-4deg)"), oe(n, "src", Pp), oe(t, "src", Op), Q(() => te(t, ce(Ep, {
            hidden: !Ye.archive.hasNew()
        }))), e
    })(),
    Mp = V('<div class="absolute top-0 left-0 wh-full isolate">'),
    jp = e => {
        const [n, t] = Y(!1), i = ct(() => sn() ? [sn().srcWebm, sn().srcMp3] : []), l = ct(() => [li().srcWebm, li().srcMp3], {
            loop: !0,
            autoplay: !0
        }), u = ct([Kc, Qc]);
        (async () => {
            await Jr(6e4);
            const p = u.internalInstance();
            p && (p.on("end", async () => {
                await Jr(6e5), u.play()
            }), u.play())
        })();
        const d = p => {
            if (p === "answering-machine") {
                const o = i.internalInstance();
                if (!o) return;
                const a = o.playing(),
                    f = o.seek() === 0;
                if (St.options.muted && !a && f) return;
                ie.trackClickEvent("answering-machine", a ? "pause" : "play", "cctv-room"), a ? (l.setVolume(1), u.setVolume(1), i.pause()) : (l.setVolume(.1), u.setVolume(.1), i.play(), f && (Ye.answeringMachineTrack.setLastPlayed(), o.once("end", () => {
                    i.stop(), l.setVolume(1), u.setVolume(1)
                })))
            } else p === "log-book" && (ie.trackClickEvent("logbook", "open", "cctv-room"), e.roomSound.play("logbook-open")), p === "terminal" && (ie.trackClickEvent("terminal", "open", "cctv-room"), e.roomSound.play("terminal-open")), we.openApp(p)
        };
        return (() => {
            const p = Mp();
            return C(p, S(uo, {
                get each() {
                    return pe.screens
                },
                children: o => S(mp, {
                    screen: o,
                    onClick: () => {
                        var a;
                        if (o.isEnabled() && o.position() === "c") n() || (pe.Supervisor.dispatch("play"), t(!0)), !!((a = pe.Supervisor.currentFeed()) != null && a.archivePlaylist) && pe.Supervisor.setControlsVisible(!0);
                        else {
                            if (Fe().isFinal && o.position() === "tr") return;
                            pe.Supervisor.positionScreenAtCenter(o)
                        }
                        e.roomSound.play(ta(["screen-tap-1", "screen-tap-2", "screen-tap-3"]))
                    }
                })
            }), null), C(p, S(Cp, {}), null), C(p, S(wp, {}), null), C(p, S(Ip, {}), null), C(p, S(Sp, {
                onItemSelected: d
            }), null), C(p, S(Le, {
                get when() {
                    return pe.Supervisor.controlsVisible()
                },
                get children() {
                    return S(ip, {})
                }
            }), null), Q(() => (st.currentStatus() === Ut.done ? "visible" : "hidden") != null ? p.style.setProperty("visibility", st.currentStatus() === Ut.done ? "visible" : "hidden") : p.style.removeProperty("visibility")), p
        })()
    },
    Bp = V('<div class="absolute top-0 left-0 wh-full z-modal">'),
    fr = e => S(Le, {
        get when() {
            return e.isOpen
        },
        get children() {
            const n = Bp();
            return C(n, () => e.children), n
        }
    }),
    Lp = "/assets/logbook-36af03c8.mp3",
    Rp = "/assets/logbook-dccdaf17.ogg",
    Vp = V('<div><img><img><img class="absolute left-1/2 w-1/2 h-full"><img><img><div class="absolute top-0 left-0 wh-full flex"><button class="flex-1"></button><button class="flex-1"></button></div><button class="absolute top-20 left-20 w-100 h-100 flex-center">'),
    zp = () => [...Ws().map(e => e.srcPng || e.srcJpg), null].reverse(),
    rn = () => Qs(zp()).map((e, n) => ({
        index: n,
        left: (e == null ? void 0 : e[0]) || null,
        right: (e == null ? void 0 : e[1]) || null
    })),
    Np = e => {
        const n = [],
            [t, r] = Y(!1);
        Gt(async () => {
            const v = n.map(g => new Promise((m, h) => {
                if (!g.src) return m();
                g.onload = () => m(), g.onerror = () => h()
            }));
            try {
                await Promise.all(v), r(!0)
            } catch (g) {
                e.onClose()
            }
        });
        const [i, s] = Y(rn().length - 1), [l, u] = Y([]), c = () => {
            const v = i() - 1;
            return rn()[v] ? !l().includes(v) : !1
        };
        ge(() => {
            const v = i() - 1,
                g = rn()[v];
            if (!g || l().includes(v)) return;
            const m = [g == null ? void 0 : g.left, g == null ? void 0 : g.right].filter(h => !!h).map(h => {
                if (h) return Js(h)
            });
            Promise.allSettled(m).then(() => {
                u([...l(), v])
            })
        });
        const d = () => {
                !c() && i() !== 0 && (ie.trackClickEvent("pages", "prev", "logbook"), s(v => v - 1), f.play("page-turn", {
                    interrupt: !0
                }))
            },
            p = () => {
                i() >= rn().length - 1 || (ie.trackClickEvent("pages", "next", "logbook"), f.play("page-turn", {
                    interrupt: !0
                }), s(v => v + 1))
            },
            o = () => rn()[i()],
            a = () => i() === 0,
            f = ct([Rp, Lp], {
                sprite: {
                    "page-turn": [0, 933.3333333333334]
                }
            });
        return (() => {
            const v = Vp(),
                g = v.firstChild,
                m = g.nextSibling,
                h = m.nextSibling,
                y = h.nextSibling,
                w = y.nextSibling,
                b = w.nextSibling,
                P = b.firstChild,
                H = P.nextSibling,
                W = b.nextSibling;
            return $e(B => n.push(B), g), oe(g, "src", Ks), $e(B => n.push(B), m), oe(m, "src", Ys), $e(B => n.push(B), h), oe(h, "src", qs), $e(B => n.push(B), y), $e(B => n.push(B), w), P.$$click = () => d(), H.$$click = () => p(), W.$$click = () => {
                e.onClose()
            }, C(W, S(se, {
                size: "terminal-lg",
                class: "text-purple leading-none tracking-[-10px]",
                children: "<-"
            })), Q(B => {
                var T, x, A, E, $, U, G, K;
                const j = ce("wh-full flex relative", !t() && "invisible"),
                    z = ce("absolute w-[calc(50%+2px)] h-full", !a() && "invisible"),
                    L = ce("absolute w-[calc(50%+2px)] h-full", a() && "invisible"),
                    J = ((T = o()) == null ? void 0 : T.left) || void 0,
                    de = ce("absolute w-1/2 h-full pointer-events-none pl-[99px] pr-52", !((x = o()) != null && x.left) && "invisible", ((E = (A = o()) == null ? void 0 : A.left) == null ? void 0 : E.endsWith(".jpg")) && "mix-blend-multiply"),
                    M = (($ = o()) == null ? void 0 : $.right) || void 0,
                    I = ce("absolute w-1/2 left-1/2 h-full pointer-events-none pl-52 pr-[99px]", !((U = o()) != null && U.right) && "invisible", ((K = (G = o()) == null ? void 0 : G.right) == null ? void 0 : K.endsWith(".jpg")) && "mix-blend-multiply");
                return j !== B._v$ && te(v, B._v$ = j), z !== B._v$2 && te(g, B._v$2 = z), L !== B._v$3 && te(m, B._v$3 = L), J !== B._v$4 && oe(y, "src", B._v$4 = J), de !== B._v$5 && te(y, B._v$5 = de), M !== B._v$6 && oe(w, "src", B._v$6 = M), I !== B._v$7 && te(w, B._v$7 = I), B
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
Ie(["click"]);
const Hp = e => S(fr, {
        get isOpen() {
            return we.currentOpenApp.mainApp === "log-book"
        },
        get children() {
            return S(Np, {
                onClose: () => {
                    var n;
                    ie.trackClickEvent("modal", "close", "logbook"), we.closeApp(), (n = e.onClose) == null || n.call(e)
                }
            })
        }
    }),
    Up = "/assets/terminal-2aa26d8b.mp3",
    Fp = "/assets/terminal-ca9f8876.ogg",
    ia = Fa(),
    Gp = e => {
        const n = ct(e.src, e.options);
        return S(ia.Provider, {
            value: n,
            get children() {
                return e.children
            }
        })
    };

function qt() {
    const e = Xi(ia);
    if (e === void 0) throw new Error("useAudio must be used within a AudioProvider");
    return e
}
const Zp = "\n      @@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@@\n @@                          @@@@@\n@                         @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@ \n@                         @@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
    Wp = "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n     @@      @@@@@@@@      @@  @@\n      @@  @@@@@@@@@@@@@@@@@@  @@\n       @@  @@@@@@@@@@@@@@@@  @@\n        @@  @@@@@@@@@@@@@@  @@\n         @@  @@@@@@@@@@@@  @@\n           @@  @@@@@@@@  @@\n             @@  @@@@  @@\n              @@  @@  @@\n             @@  @@@@  @@\n           @@     @@     @@\n         @@                @@\n        @@        @@        @@\n       @@       @@@@@@       @@\n      @@      @@@@@@@@@@      @@\n     @@     @@@@@@@@@@@@@@     @@\n    @@    @@@@@@@@@@@@@@@@@     @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@                          @@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
    Yp = "\n _   ____                       _ _              _    _           _     _\n| | / ___|  ___  ___ _   _ _ __(_) |_ _   _     / \\  | | ___ _ __| |_  | |\n| | \\___ \\ / _ \\/ __| | | | '__| | __| | | |   / _ \\ | |/ _ \\ '__| __| | |\n|_|  ___) |  __/ (__| |_| | |  | | |_| |_| |  / ___ \\| |  __/ |  | |_  |_|\n(_) |____/ \\___|\\___|\\__,_|_|  |_|\\__|\\__, | /_/   \\_\\_|\\___|_|   \\__| (_)\n                                      |___/\n",
    qp = "\n    __\n   / /\n  / /\n / /\n/_/\n",
    Kp = "\n _\n(_)\n _\n(_)\n",
    Qp = {
        archive: Zp,
        timecoder: Wp,
        securityAlert: Yp,
        forwardSlash: qp,
        colon: Kp
    },
    Jp = V("<span>"),
    xt = e => (() => {
        const n = Jp();
        return C(n, () => Qp[e.name]), Q(() => te(n, ce("font-vt-220 font-medium leading-none whitespace-pre", e.class))), n
    })(),
    Xp = V("<span>Security Archives"),
    eg = V("<span>Time Coder"),
    tg = V('<div class="wh-full flex justify-center space-x-368 items-end pb-144"><div class="flex flex-col items-center space-y-56" role="button"></div><div class="flex flex-col items-center space-y-56 text-shadow-terminal" role="button">'),
    ji = yn("relative inline-block w-[600px] text-center py-8", {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black [&>span]:text-shadow-none", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light text-shadow-terminal border"
            }
        }
    }),
    ng = e => {
        const n = qt(),
            [t, r] = Y();
        let i;
        const s = l => {
            n.play("click", {
                interrupt: !0
            }), r(l), clearTimeout(i), i = setTimeout(() => {
                ie.trackClickEvent("items", "open-".concat(l), "terminal-home"), e.setCurrentOpenApp(l)
            }, 1e3)
        };
        return Ae(() => {
            clearTimeout(i)
        }), (() => {
            const l = tg(),
                u = l.firstChild,
                c = u.nextSibling;
            return u.$$click = () => s("security-tape-archives"), C(u, S(xt, {
                name: "archive",
                class: "text-purple text-[21px] text-shadow-terminal"
            }), null), C(u, S(se, {
                size: "terminal-md",
                get class() {
                    return ji({
                        selected: t() === "security-tape-archives"
                    })
                },
                get children() {
                    return Xp()
                }
            }), null), c.$$click = () => s("timecoder"), C(c, S(xt, {
                name: "timecoder",
                class: "text-purple text-[18px] text-shadow-terminal"
            }), null), C(c, S(se, {
                size: "terminal-md",
                get class() {
                    return ji({
                        selected: t() === "timecoder"
                    })
                },
                get children() {
                    return eg()
                }
            }), null), l
        })()
    };
Ie(["click"]);
const rg = V('<div class="absolute top-0 left-0 wh-full flex flex-col items-center pt-72 bg-terminal"><img class="block w-[732px] mb-32 text-blue-light drop-shadow-terminal transform-gpu" width="873" height="621"><div class="flex space-x-32 text-blue-light"><div class="bg-blue-light shadow-terminal"></div><div class="w-24 h-full bg-blue-light shadow-terminal">'),
    og = () => {
        const [e, n] = Y(!0), t = setTimeout(() => n(!1), 1e3);
        return Ae(() => clearInterval(t)), S(Le, {
            get when() {
                return e()
            },
            get children() {
                const r = rg(),
                    i = r.firstChild,
                    s = i.nextSibling,
                    l = s.firstChild;
                return oe(i, "src", _o), C(r, S(se, {
                    as: "p",
                    size: "terminal-sm",
                    class: "text-center whitespace-pre text-purple mb-56 text-shadow-terminal",
                    children: "**********************************************************\n\n(c) copyright Starr Park corporation, 1995. All rights reserved.\nStarr Park Security Services is a registered\ntrademark of Starr Park corporation. \n          \n**********************************************************"
                }), s), C(l, S(se, {
                    as: "span",
                    size: "terminal-md",
                    class: "text-black px-16 py-8",
                    children: "Loading"
                })), r
            }
        })
    },
    ig = 10,
    Bi = e => {
        const n = Ss(e);
        return {
            date: n.format("DD.MM.[1995]"),
            time: n.format("HH:mm")
        }
    },
    sg = (e = {}) => {
        const [n, t] = Y(Bi(e.timezone)), r = () => {
            const s = Bi(e.timezone);
            t(s)
        }, i = setInterval(() => r(), ig * 1e3);
        return Ae(() => clearInterval(i)), n
    },
    Li = V("<span>"),
    ag = V("<span>Starr Park Security System"),
    lg = () => {
        const e = sg({
            timezone: _s
        });
        return S(se, {
            as: "p",
            class: "flex justify-between items-center px-144 pt-64 text-blue-dark text-shadow-terminal",
            size: "terminal-sm",
            get children() {
                return [(() => {
                    const n = Li();
                    return C(n, () => e().date), n
                })(), ag(), (() => {
                    const n = Li();
                    return C(n, () => e().time), n
                })()]
            }
        })
    },
    cg = V('<div><div class="flex w-full"><button><span>&lt;-</span></button><div class="flex items-center flex-1 h-full px-32 bg-blue-light text-blue-light shadow-terminal"></div></div><div class="flex-1 min-h-0 px-100">'),
    ug = "w-100 h-100 flex-center font-vt-220 font-medium leading-none text-shadow-terminal",
    zr = e => {
        const n = qt(),
            t = () => {
                var i;
                const r = n.play("click", {
                    interrupt: !0
                });
                (i = n == null ? void 0 : n.internalInstance()) == null || i.once("end", () => {
                    var s;
                    ie.trackClickEvent("app-bar", "back", "terminal"), (s = e.onBack) == null || s.call(e)
                }, r)
            };
        return (() => {
            const r = cg(),
                i = r.firstChild,
                s = i.firstChild,
                l = s.nextSibling,
                u = i.nextSibling;
            return s.$$click = () => t(), C(l, S(se, {
                as: "span",
                size: "terminal-lg",
                class: "text-black",
                get children() {
                    return e.title
                }
            })), C(u, () => e.children), Q(c => {
                const d = ce("flex flex-col flex-1 pt-64 px-44"),
                    p = ce(ug, "text-purple text-[80px] tracking-[-10px]");
                return d !== c._v$ && te(r, c._v$ = d), p !== c._v$2 && te(s, c._v$2 = p), c
            }, {
                _v$: void 0,
                _v$2: void 0
            }), r
        })()
    };
Ie(["click"]);
const fg = "/assets/terminal-typing-8b10cd31.mp3",
    dg = "/assets/terminal-typing-20a23c49.ogg";
class sa extends Error {
    constructor(t, r) {
        super(r);
        Jo(this, "statusCode");
        this.statusCode = t, Object.setPrototypeOf(this, new.target.prototype)
    }
}
const pg = "https://bmwryv10bd.execute-api.us-east-1.amazonaws.com",
    aa = {
        base: "".concat(pg),
        getArchiveByCode: e => "".concat(aa.base, "/timecoder/").concat(e)
    },
    gg = async ({
        params: e
    }) => {
        const n = aa.getArchiveByCode(e.code),
            t = await fetch(n, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        if (!t.ok) throw new sa(t.status, "Unable to fetch ".concat(n, ": ").concat(t.status, " ").concat(t.statusText));
        return await t.json()
    }, vg = V('<div class="flex flex-col space-y-120 w-full pt-72 pb-32"><div class="flex justify-between"><div class="flex space-x-24 items-center"></div><div class="flex space-x-24 items-center"></div></div><div class="flex flex-col space-y-48 items-center"><button class="inline-flex px-120 py-8 text-blue-light border text-shadow-terminal">'), hg = V('<input pattern="[0-9]*" inputmode="numeric">'), mg = {
        day: "00",
        month: "00",
        year: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
    }, Gn = "text-blue-light text-[20px]", _g = e => {
        const [n, t] = Wt(mg), r = qt(), i = {
            "typing-1": [0, 200],
            "typing-2": [2e3, 166.66666666666652],
            "typing-3": [4e3, 183.33333333333357],
            "typing-4": [6e3, 183.33333333333357],
            "typing-5": [8e3, 199.9999999999993],
            "typing-6": [1e4, 233.33333333333252],
            "typing-7": [12e3, 250]
        }, s = ct([dg, fg], {
            sprite: i
        }), [l, u] = Y(void 0), [c, d] = Y(!1), p = (g, m) => {
            t(g, m), s.play(ta(Object.keys(i)))
        };
        let o;
        const a = async () => {
            r.play("click", {
                interrupt: !0
            }), d(!0), u(void 0);
            const g = Object.values(n).join("");
            let m;
            try {
                m = await gg({
                    params: {
                        code: g
                    }
                })
            } catch (h) {
                return ie.trackClickEvent("timecoder", "submit", "terminal-timecoder", {
                    archiveCode: g,
                    result: "error"
                }), h instanceof sa && h.statusCode === 404 ? (r.play("timecoder-error", {
                    interrupt: !0
                }), u("Archive not found!")) : (r.play("timecoder-error", {
                    interrupt: !0
                }), console.error(h), u("Something went wrong. Try again later."))
            } finally {
                d(!1)
            }
            ie.trackClickEvent("timecoder", "submit", "terminal-timecoder", {
                archiveCode: g,
                result: "success"
            }), e.onLoadPlaylist(m)
        };
        Ae(() => {
            clearTimeout(o)
        });
        let f;
        const v = g => {
            if (!f) return;
            const m = [...f.querySelectorAll("input")],
                h = m.findIndex(w => w === g),
                y = m[h + 1];
            y ? y.focus() : g.blur()
        };
        return (() => {
            const g = vg(),
                m = g.firstChild,
                h = m.firstChild,
                y = h.nextSibling,
                w = m.nextSibling,
                b = w.firstChild,
                P = f;
            return typeof P == "function" ? $e(P, m) : f = m, C(h, S(Ct, {
                name: "day",
                get value() {
                    return n.day
                },
                onChange: p,
                onNextInputFocus: v,
                get disabled() {
                    return c()
                }
            }), null), C(h, S(xt, {
                name: "forwardSlash",
                class: Gn
            }), null), C(h, S(Ct, {
                name: "month",
                get value() {
                    return n.month
                },
                onChange: p,
                onNextInputFocus: v,
                get disabled() {
                    return c()
                }
            }), null), C(h, S(xt, {
                name: "forwardSlash",
                class: Gn
            }), null), C(h, S(Ct, {
                name: "year",
                get value() {
                    return n.year
                },
                onChange: p,
                onNextInputFocus: v,
                get disabled() {
                    return c()
                }
            }), null), C(y, S(Ct, {
                name: "hours",
                get value() {
                    return n.hours
                },
                onChange: p,
                onNextInputFocus: v,
                get disabled() {
                    return c()
                }
            }), null), C(y, S(xt, {
                name: "colon",
                class: Gn
            }), null), C(y, S(Ct, {
                name: "minutes",
                get value() {
                    return n.minutes
                },
                onChange: p,
                get disabled() {
                    return c()
                },
                onNextInputFocus: v
            }), null), C(y, S(xt, {
                name: "colon",
                class: Gn
            }), null), C(y, S(Ct, {
                name: "seconds",
                get value() {
                    return n.seconds
                },
                onChange: p,
                get disabled() {
                    return c()
                },
                onNextInputFocus: v
            }), null), b.$$click = () => a(), C(b, S(se, {
                size: "terminal-md",
                children: "ENTER"
            })), C(w, S(Le, {
                get when() {
                    return !!l()
                },
                get children() {
                    return S(se, {
                        size: "terminal-sm",
                        class: "text-purple text-shadow-terminal",
                        get children() {
                            return l()
                        }
                    })
                }
            }), null), C(w, S(Le, {
                get when() {
                    return c()
                },
                get children() {
                    return S(se, {
                        size: "terminal-sm",
                        class: "text-green text-shadow-terminal",
                        children: "Loading..."
                    })
                }
            }), null), Q(() => b.disabled = c()), g
        })()
    }, Ct = e => {
        const n = qt(),
            [t, r] = Y(0),
            i = c => {
                const d = c.target,
                    f = d.value.replace(/[^0-9]/g, "").slice(-2).padStart(2, "0");
                e.onChange(e.name, f), d.value = f, t() === 2 && e.onNextInputFocus(d)
            },
            s = c => {
                n.play("click", {
                    interrupt: !0
                });
                const d = c.target;
                d.setSelectionRange(d.value.length, d.value.length)
            },
            l = c => {
                const d = c.key;
                (d === "Delete" || d === "Backspace") && r(p => p !== 0 ? p - 1 : p), /^[0-9]$/.test(d) && r(p => p + 1)
            },
            u = c => {
                r(0)
            };
        return (() => {
            const c = hg();
            return c.addEventListener("focus", u), c.$$click = s, c.$$keydown = l, c.$$input = i, Q(d => {
                const p = ce(An({
                        size: "terminal-xxl"
                    }), ["w-192 text-center bg-transparent caret-transparent focus:outline-none", "border-b-2 border-purple text-green drop-shadow-terminal focus:border-b-4"]),
                    o = e.name,
                    a = "".concat(e.name, "-input");
                return p !== d._v$ && te(c, d._v$ = p), o !== d._v$2 && oe(c, "name", d._v$2 = o), a !== d._v$3 && oe(c, "id", d._v$3 = a), d
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }), Q(() => c.value = e.value), c
        })()
    };
Ie(["click", "input", "keydown"]);
const yg = V('<div class="wh-full flex flex-col w-full pb-48"><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible"></button><div class="flex-1 flex flex-col"></div><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible">'),
    Ri = V("<span>"),
    bg = V('<button class="py-16 px-32 text-green text-shadow-terminal">'),
    Zn = 7,
    wg = e => {
        const n = qt(),
            [t, r] = Y(0),
            i = () => Math.ceil(dn().length / Zn),
            s = () => dn().slice(t() * Zn, t() * Zn + Zn);
        return (() => {
            const l = yg(),
                u = l.firstChild,
                c = u.nextSibling,
                d = c.nextSibling;
            return u.$$click = () => {
                ie.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"), n.play("click", {
                    interrupt: !0
                }), r(p => p - 1)
            }, C(u, S(se, {
                size: "terminal-md",
                class: "-rotate-90",
                children: ">"
            })), C(c, S(uo, {
                get each() {
                    return s()
                },
                children: p => {
                    const o = xs(p.postDate, p.dropTime.hours, p.dropTime.minutes),
                        a = Wl(o, "DD.MM.[1995] HH:mm"),
                        f = a.split(" ")[0],
                        v = a.split(" ")[1];
                    return (() => {
                        const g = bg();
                        return g.$$click = () => {
                            ie.trackClickEvent("tape-archives", "open-playlist", "terminal-tape-archives", {
                                playlistId: p.playlistId
                            }), n.play("click", {
                                interrupt: !0
                            }), e.onLoadPlaylist(p)
                        }, C(g, S(se, {
                            size: "terminal-md",
                            class: "flex space-x-272",
                            get children() {
                                return [(() => {
                                    const m = Ri();
                                    return C(m, f), m
                                })(), " ", (() => {
                                    const m = Ri();
                                    return C(m, v), m
                                })()]
                            }
                        })), g
                    })()
                }
            })), d.$$click = () => {
                ie.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"), n.play("click", {
                    interrupt: !0
                }), r(p => p + 1)
            }, C(d, S(se, {
                size: "terminal-md",
                class: "rotate-90",
                children: ">"
            })), Q(p => {
                const o = t() === 0,
                    a = t() >= i() - 1;
                return o !== p._v$ && (u.disabled = p._v$ = o), a !== p._v$2 && (d.disabled = p._v$2 = a), p
            }, {
                _v$: void 0,
                _v$2: void 0
            }), l
        })()
    };
Ie(["click"]);
const Ag = V('<span class="text-black">Access Security System'),
    xg = V('<div class="wh-full flex flex-col items-center space-y-76 pt-76 "><img class="w-[872px] drop-shadow-terminal text-blue-light transform-gpu" width="873" height="621">'),
    Sg = e => {
        const n = setTimeout(() => e.setCurrentOpenApp("home"), 2e3);
        return Ae(() => clearInterval(n)), (() => {
            const t = xg(),
                r = t.firstChild;
            return oe(r, "src", _o), C(t, S(se, {
                size: "terminal-md",
                class: "px-16 py-8 bg-blue-light text-blue-light shadow-terminal",
                get children() {
                    return Ag()
                }
            }), null), t
        })()
    },
    kg = V('<span class="text-black">unwatched security footage'),
    Tg = V('<div class="flex-1 pt-144 pb-124 px-144"><div class="relative wh-full flex flex-col space-y-92 items-center justify-center border-x-2 border-b-2 border-purple"><div class="absolute top-0 left-0 wh-full flex items-start"><div class="flex-1 border-t-2 border-purple"></div><div class="flex-1 border-t-2 border-purple"></div></div><div class="flex space-x-184"><button><span>Dismiss</span></button><button><span>Open'),
    Vi = yn(["relative px-24 py-8", An({
        size: "terminal-md"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light text-shadow-terminal border"
            }
        }
    }),
    $g = e => {
        const n = qt(),
            [t, r] = Y();
        let i;
        const s = l => {
            n.play("click", {
                interrupt: !0
            }), r(l), clearTimeout(i), i = setTimeout(() => {
                l === "open" ? e.onLoadPlaylist() : ie.trackClickEvent("notification", "dismiss", "terminal-notification-screen"), Ye.archive.dismissNotification()
            }, 1e3)
        };
        return Ae(() => {
            clearTimeout(i)
        }), (() => {
            const l = Tg(),
                u = l.firstChild,
                c = u.firstChild,
                d = c.firstChild,
                p = d.nextSibling,
                o = c.nextSibling,
                a = o.firstChild,
                f = a.nextSibling;
            return C(c, S(xt, {
                name: "securityAlert",
                class: "px-64 -translate-y-1/2 text-blue-light text-[32px] text-shadow-terminal"
            }), p), C(u, S(se, {
                as: "div",
                size: "terminal-xl",
                class: "px-56 py-32 bg-orange text-orange shadow-terminal",
                get children() {
                    return kg()
                }
            }), o), a.$$click = () => s("dismiss"), f.$$click = () => s("open"), Q(v => {
                const g = Vi({
                        selected: t() === "dismiss"
                    }),
                    m = Vi({
                        selected: t() === "open"
                    });
                return g !== v._v$ && te(a, v._v$ = g), m !== v._v$2 && te(f, v._v$2 = m), v
            }, {
                _v$: void 0,
                _v$2: void 0
            }), l
        })()
    };
Ie(["click"]);
const Ig = V('<div class="realtive wh-full flex flex-col bg-terminal">'),
    Pg = e => {
        const n = () => we.currentOpenApp.mainApp,
            t = () => we.currentOpenApp.mainApp === "terminal" ? we.currentOpenApp.terminalApp : void 0,
            r = (i, s) => {
                var l;
                pe.Supervisor.switchFeed({
                    archivePlaylist: {
                        playlistId: i.playlistId,
                        metadata: {
                            date: xs(i.postDate, i.dropTime.hours, i.dropTime.minutes, i.dropTime.seconds)
                        }
                    },
                    source: s
                }), Ye.archive.setLastPlayed(i.postDate), (l = e.onPlaylistLoad) == null || l.call(e), we.closeApp()
            };
        return S(fr, {
            get isOpen() {
                return n() === "terminal"
            },
            get children() {
                return S(Gp, {
                    src: [Fp, Up],
                    options: {
                        sprite: {
                            click: [0, 220.6122448979592],
                            "timecoder-error": [2e3, 283.3333333333332]
                        }
                    },
                    get children() {
                        const i = Ig();
                        return C(i, S(lg, {}), null), C(i, S(ls, {
                            get fallback() {
                                return S(Sg, {
                                    setCurrentOpenApp: s => we.openApp(s)
                                })
                            },
                            get children() {
                                return [S(jt, {
                                    get when() {
                                        return Ye.archive.hasNew()
                                    },
                                    get children() {
                                        return S($g, {
                                            onLoadPlaylist: () => {
                                                const s = dn()[0];
                                                s && (ie.trackClickEvent("notification", "open-playlist", "terminal-notification-screen", {
                                                    playlistId: s.playlistId
                                                }), r(s, "security-tape-archives"))
                                            }
                                        })
                                    }
                                }), S(jt, {
                                    get when() {
                                        return t() === "home"
                                    },
                                    get children() {
                                        return S(zr, {
                                            title: "Security System",
                                            onBack: () => we.closeApp(),
                                            get children() {
                                                return S(ng, {
                                                    setCurrentOpenApp: s => we.openApp(s)
                                                })
                                            }
                                        })
                                    }
                                }), S(jt, {
                                    get when() {
                                        return t() === "security-tape-archives"
                                    },
                                    get children() {
                                        return S(zr, {
                                            title: "Security Tape Archives",
                                            onBack: () => we.openApp("home"),
                                            get children() {
                                                return S(wg, {
                                                    onLoadPlaylist: s => r(s, "security-tape-archives")
                                                })
                                            }
                                        })
                                    }
                                }), S(jt, {
                                    get when() {
                                        return t() === "timecoder"
                                    },
                                    get children() {
                                        return S(zr, {
                                            title: "Timecoder v2.1.0",
                                            onBack: () => we.openApp("home"),
                                            get children() {
                                                return S(_g, {
                                                    onLoadPlaylist: s => r(s, "timecoder")
                                                })
                                            }
                                        })
                                    }
                                })]
                            }
                        }), null), C(i, S(og, {}), null), i
                    }
                })
            }
        })
    },
    Og = "/assets/cctv-room-2f2fa9dd.mp3",
    Dg = "/assets/cctv-room-e0e04e21.ogg";

function Eg(e) {
    const n = ye({}, e),
        t = ye({}, e),
        r = {},
        i = l => {
            let u = r[l];
            if (!u) {
                if (!tr()) return n[l];
                r[l] = u = Y(n[l], {
                    internal: !0
                }), delete n[l]
            }
            return u[0]()
        };
    for (const l in e) Object.defineProperty(t, l, {
        get: () => i(l),
        enumerable: !0
    });
    const s = (l, u) => {
        const c = r[l];
        if (c) return c[1](u);
        l in n && (n[l] = ci(u, [n[l]]))
    };
    return [t, (l, u) => {
        if (Jc(l)) {
            const c = fe(() => Object.entries(ci(l, t)));
            lr(() => {
                for (const [d, p] of c) s(d, () => p)
            })
        } else s(l, u);
        return t
    }]
}
var la = {
    width: null,
    height: null
};

function Nr(e) {
    if (!e) return ye({}, la);
    const {
        width: n,
        height: t
    } = e.getBoundingClientRect();
    return {
        width: n,
        height: t
    }
}

function Cg(e) {
    const n = typeof e == "function",
        [t, r] = Eg(n ? la : Nr(e)),
        i = new ResizeObserver(([s]) => r(Nr(s.target)));
    return Ae(() => i.disconnect()), n ? ge(() => {
        const s = e();
        s && (r(Nr(s)), i.observe(s), Ae(() => i.unobserve(s)))
    }) : (i.observe(e), Ae(() => i.unobserve(e))), t
}
const Mg = e => {
        const [n, t] = Y({
            x: 0,
            y: 0
        }), [r, i] = Y(1), s = Cg(e.containerRef);
        return ge(() => {
            if (!e.containerRef() || s.width == null || s.height == null) return;
            const u = hs(e.position) || {
                    x: 0,
                    y: 0
                },
                c = e.bgImageSize.width / e.bgImageSize.height,
                d = s.width / s.height;
            let p, o;
            e.fit === "cover" ? c <= d ? (p = s.width, o = s.width / c) : (p = s.height * c, o = s.height) : c <= d ? (p = s.height * c, o = s.height) : (p = s.width, o = s.width / c);
            const a = Math.round(p / e.bgImageSize.width * 1e3) / 1e3,
                f = (p - s.width) / 2,
                v = (o - s.height) / 2,
                g = p * u.x / e.bgImageSize.width - f,
                m = o * u.y / e.bgImageSize.height - v;
            t({
                x: g,
                y: m
            }), i(a)
        }), {
            position: n,
            scaleFactor: r
        }
    },
    jg = V("<div><video muted playsinline>"),
    Bg = 7.1,
    Lg = 7.7,
    Rg = e => {
        let n;
        const [t, r] = Y(void 0);
        return Gt(async () => {
            if (!n) return;
            if (!St.options.muted) try {
                n.muted = !1, await n.play()
            } catch (c) {
                n.muted = !0, St.setMute(!0)
            } finally {
                n.pause()
            }
            try {
                await n.play()
            } catch (c) {
                return console.error("Error during transition video playback, skipping transition...", c), r("error"), e.onEnded()
            } finally {
                n.pause()
            }
            await new Promise(c => {
                if (!n) return c();
                n.load(), n.addEventListener("canplaythrough", () => c())
            }), await Jr(600), await n.play(), r("done"), e.onLoaded();
            const l = () => {
                !n || n.currentTime < Bg || (e.onEnded(), n.removeEventListener("timeupdate", l))
            };
            n.addEventListener("timeupdate", l);
            const u = () => {
                n && (n.currentTime = Lg, n.play())
            };
            n.addEventListener("ended", u)
        }), ge(Ua(pe.Supervisor.allLoaded, i => {
            n && (i ? n.pause() : n.play())
        }, {
            defer: !0
        })), (() => {
            const i = jg(),
                s = i.firstChild;
            s.addEventListener("error", u => {
                console.error("Error during transition video playback, skipping transition...", u), r("error"), e.onEnded()
            });
            const l = n;
            return typeof l == "function" ? $e(l, s) : n = s, Q(u => {
                const c = ce("wh-full", t() === "error" && "bg-black"),
                    d = fe(Fe).transitionVideoSrc,
                    p = ce("wh-full object-contain"),
                    o = t() === "done" ? "visible" : "hidden";
                return c !== u._v$ && te(i, u._v$ = c), d !== u._v$2 && oe(s, "src", u._v$2 = d), p !== u._v$3 && te(s, u._v$3 = p), o !== u._v$4 && ((u._v$4 = o) != null ? s.style.setProperty("visibility", o) : s.style.removeProperty("visibility")), u
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
var kt = [],
    Vg = function() {
        return kt.some(function(e) {
            return e.activeTargets.length > 0
        })
    },
    zg = function() {
        return kt.some(function(e) {
            return e.skippedTargets.length > 0
        })
    },
    zi = "ResizeObserver loop completed with undelivered notifications.",
    Ng = function() {
        var e;
        typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
            message: zi
        }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = zi), window.dispatchEvent(e)
    },
    mn;
(function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box"
})(mn || (mn = {}));
var Tt = function(e) {
        return Object.freeze(e)
    },
    Hg = function() {
        function e(n, t) {
            this.inlineSize = n, this.blockSize = t, Tt(this)
        }
        return e
    }(),
    ca = function() {
        function e(n, t, r, i) {
            return this.x = n, this.y = t, this.width = r, this.height = i, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Tt(this)
        }
        return e.prototype.toJSON = function() {
            var n = this,
                t = n.x,
                r = n.y,
                i = n.top,
                s = n.right,
                l = n.bottom,
                u = n.left,
                c = n.width,
                d = n.height;
            return {
                x: t,
                y: r,
                top: i,
                right: s,
                bottom: l,
                left: u,
                width: c,
                height: d
            }
        }, e.fromRect = function(n) {
            return new e(n.x, n.y, n.width, n.height)
        }, e
    }(),
    wo = function(e) {
        return e instanceof SVGElement && "getBBox" in e
    },
    ua = function(e) {
        if (wo(e)) {
            var n = e.getBBox(),
                t = n.width,
                r = n.height;
            return !t && !r
        }
        var i = e,
            s = i.offsetWidth,
            l = i.offsetHeight;
        return !(s || l || e.getClientRects().length)
    },
    Ni = function(e) {
        var n;
        if (e instanceof Element) return !0;
        var t = (n = e == null ? void 0 : e.ownerDocument) === null || n === void 0 ? void 0 : n.defaultView;
        return !!(t && e instanceof t.Element)
    },
    Ug = function(e) {
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
    cn = typeof window < "u" ? window : {},
    Wn = new WeakMap,
    Hi = /auto|scroll/,
    Fg = /^tb|vertical/,
    Gg = /msie|trident/i.test(cn.navigator && cn.navigator.userAgent),
    Ve = function(e) {
        return parseFloat(e || "0")
    },
    Vt = function(e, n, t) {
        return e === void 0 && (e = 0), n === void 0 && (n = 0), t === void 0 && (t = !1), new Hg((t ? n : e) || 0, (t ? e : n) || 0)
    },
    Ui = Tt({
        devicePixelContentBoxSize: Vt(),
        borderBoxSize: Vt(),
        contentBoxSize: Vt(),
        contentRect: new ca(0, 0, 0, 0)
    }),
    fa = function(e, n) {
        if (n === void 0 && (n = !1), Wn.has(e) && !n) return Wn.get(e);
        if (ua(e)) return Wn.set(e, Ui), Ui;
        var t = getComputedStyle(e),
            r = wo(e) && e.ownerSVGElement && e.getBBox(),
            i = !Gg && t.boxSizing === "border-box",
            s = Fg.test(t.writingMode || ""),
            l = !r && Hi.test(t.overflowY || ""),
            u = !r && Hi.test(t.overflowX || ""),
            c = r ? 0 : Ve(t.paddingTop),
            d = r ? 0 : Ve(t.paddingRight),
            p = r ? 0 : Ve(t.paddingBottom),
            o = r ? 0 : Ve(t.paddingLeft),
            a = r ? 0 : Ve(t.borderTopWidth),
            f = r ? 0 : Ve(t.borderRightWidth),
            v = r ? 0 : Ve(t.borderBottomWidth),
            g = r ? 0 : Ve(t.borderLeftWidth),
            m = o + d,
            h = c + p,
            y = g + f,
            w = a + v,
            b = u ? e.offsetHeight - w - e.clientHeight : 0,
            P = l ? e.offsetWidth - y - e.clientWidth : 0,
            H = i ? m + y : 0,
            W = i ? h + w : 0,
            B = r ? r.width : Ve(t.width) - H - P,
            j = r ? r.height : Ve(t.height) - W - b,
            z = B + m + P + y,
            L = j + h + b + w,
            J = Tt({
                devicePixelContentBoxSize: Vt(Math.round(B * devicePixelRatio), Math.round(j * devicePixelRatio), s),
                borderBoxSize: Vt(z, L, s),
                contentBoxSize: Vt(B, j, s),
                contentRect: new ca(o, c, B, j)
            });
        return Wn.set(e, J), J
    },
    da = function(e, n, t) {
        var r = fa(e, t),
            i = r.borderBoxSize,
            s = r.contentBoxSize,
            l = r.devicePixelContentBoxSize;
        switch (n) {
            case mn.DEVICE_PIXEL_CONTENT_BOX:
                return l;
            case mn.BORDER_BOX:
                return i;
            default:
                return s
        }
    },
    Zg = function() {
        function e(n) {
            var t = fa(n);
            this.target = n, this.contentRect = t.contentRect, this.borderBoxSize = Tt([t.borderBoxSize]), this.contentBoxSize = Tt([t.contentBoxSize]), this.devicePixelContentBoxSize = Tt([t.devicePixelContentBoxSize])
        }
        return e
    }(),
    pa = function(e) {
        if (ua(e)) return 1 / 0;
        for (var n = 0, t = e.parentNode; t;) n += 1, t = t.parentNode;
        return n
    },
    Wg = function() {
        var e = 1 / 0,
            n = [];
        kt.forEach(function(l) {
            if (l.activeTargets.length !== 0) {
                var u = [];
                l.activeTargets.forEach(function(d) {
                    var p = new Zg(d.target),
                        o = pa(d.target);
                    u.push(p), d.lastReportedSize = da(d.target, d.observedBox), o < e && (e = o)
                }), n.push(function() {
                    l.callback.call(l.observer, u, l.observer)
                }), l.activeTargets.splice(0, l.activeTargets.length)
            }
        });
        for (var t = 0, r = n; t < r.length; t++) {
            var i = r[t];
            i()
        }
        return e
    },
    Fi = function(e) {
        kt.forEach(function(t) {
            t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function(i) {
                i.isActive() && (pa(i.target) > e ? t.activeTargets.push(i) : t.skippedTargets.push(i))
            })
        })
    },
    Yg = function() {
        var e = 0;
        for (Fi(e); Vg();) e = Wg(), Fi(e);
        return zg() && Ng(), e > 0
    },
    Hr, ga = [],
    qg = function() {
        return ga.splice(0).forEach(function(e) {
            return e()
        })
    },
    Kg = function(e) {
        if (!Hr) {
            var n = 0,
                t = document.createTextNode(""),
                r = {
                    characterData: !0
                };
            new MutationObserver(function() {
                return qg()
            }).observe(t, r), Hr = function() {
                t.textContent = "".concat(n ? n-- : n++)
            }
        }
        ga.push(e), Hr()
    },
    Qg = function(e) {
        Kg(function() {
            requestAnimationFrame(e)
        })
    },
    Jn = 0,
    Jg = function() {
        return !!Jn
    },
    Xg = 250,
    ev = {
        attributes: !0,
        characterData: !0,
        childList: !0,
        subtree: !0
    },
    Gi = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"],
    Zi = function(e) {
        return e === void 0 && (e = 0), Date.now() + e
    },
    Ur = !1,
    tv = function() {
        function e() {
            var n = this;
            this.stopped = !0, this.listener = function() {
                return n.schedule()
            }
        }
        return e.prototype.run = function(n) {
            var t = this;
            if (n === void 0 && (n = Xg), !Ur) {
                Ur = !0;
                var r = Zi(n);
                Qg(function() {
                    var i = !1;
                    try {
                        i = Yg()
                    } finally {
                        if (Ur = !1, n = r - Zi(), !Jg()) return;
                        i ? t.run(1e3) : n > 0 ? t.run(n) : t.start()
                    }
                })
            }
        }, e.prototype.schedule = function() {
            this.stop(), this.run()
        }, e.prototype.observe = function() {
            var n = this,
                t = function() {
                    return n.observer && n.observer.observe(document.body, ev)
                };
            document.body ? t() : cn.addEventListener("DOMContentLoaded", t)
        }, e.prototype.start = function() {
            var n = this;
            this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Gi.forEach(function(t) {
                return cn.addEventListener(t, n.listener, !0)
            }))
        }, e.prototype.stop = function() {
            var n = this;
            this.stopped || (this.observer && this.observer.disconnect(), Gi.forEach(function(t) {
                return cn.removeEventListener(t, n.listener, !0)
            }), this.stopped = !0)
        }, e
    }(),
    ao = new tv,
    Wi = function(e) {
        !Jn && e > 0 && ao.start(), Jn += e, !Jn && ao.stop()
    },
    nv = function(e) {
        return !wo(e) && !Ug(e) && getComputedStyle(e).display === "inline"
    },
    rv = function() {
        function e(n, t) {
            this.target = n, this.observedBox = t || mn.CONTENT_BOX, this.lastReportedSize = {
                inlineSize: 0,
                blockSize: 0
            }
        }
        return e.prototype.isActive = function() {
            var n = da(this.target, this.observedBox, !0);
            return nv(this.target) && (this.lastReportedSize = n), this.lastReportedSize.inlineSize !== n.inlineSize || this.lastReportedSize.blockSize !== n.blockSize
        }, e
    }(),
    ov = function() {
        function e(n, t) {
            this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = n, this.callback = t
        }
        return e
    }(),
    Yn = new WeakMap,
    Yi = function(e, n) {
        for (var t = 0; t < e.length; t += 1)
            if (e[t].target === n) return t;
        return -1
    },
    qn = function() {
        function e() {}
        return e.connect = function(n, t) {
            var r = new ov(n, t);
            Yn.set(n, r)
        }, e.observe = function(n, t, r) {
            var i = Yn.get(n),
                s = i.observationTargets.length === 0;
            Yi(i.observationTargets, t) < 0 && (s && kt.push(i), i.observationTargets.push(new rv(t, r && r.box)), Wi(1), ao.schedule())
        }, e.unobserve = function(n, t) {
            var r = Yn.get(n),
                i = Yi(r.observationTargets, t),
                s = r.observationTargets.length === 1;
            i >= 0 && (s && kt.splice(kt.indexOf(r), 1), r.observationTargets.splice(i, 1), Wi(-1))
        }, e.disconnect = function(n) {
            var t = this,
                r = Yn.get(n);
            r.observationTargets.slice().forEach(function(i) {
                return t.unobserve(n, i.target)
            }), r.activeTargets.splice(0, r.activeTargets.length)
        }, e
    }(),
    iv = function() {
        function e(n) {
            if (arguments.length === 0) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
            if (typeof n != "function") throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
            qn.connect(this, n)
        }
        return e.prototype.observe = function(n, t) {
            if (arguments.length === 0) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!Ni(n)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
            qn.observe(this, n, t)
        }, e.prototype.unobserve = function(n) {
            if (arguments.length === 0) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!Ni(n)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
            qn.unobserve(this, n)
        }, e.prototype.disconnect = function() {
            qn.disconnect(this)
        }, e.toString = function() {
            return "function ResizeObserver () { [polyfill code] }"
        }, e
    }();
const sv = () => {
        "ResizeObserver" in window || (window.ResizeObserver = iv)
    },
    av = {
        setup: sv
    },
    lv = V('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>No</span></button><button><span>Yes'),
    qi = yn(["relative px-144 py-2", An({
        size: "terminal-sm"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light border"
            }
        }
    }),
    cv = e => S(fr, {
        get isOpen() {
            return e.isOpen
        },
        get children() {
            return S(uv, {
                onExit: () => {
                    window.location.href = "brawlstars-inbox://closeView"
                },
                get onClose() {
                    return e.onClose
                }
            })
        }
    }),
    uv = e => {
        const [n, t] = Y();
        let r;
        const i = s => {
            t(s), clearTimeout(r), r = setTimeout(() => {
                s === "confirm" ? e.onExit() : e.onClose()
            }, 1e3)
        };
        return (() => {
            const s = lv(),
                l = s.firstChild,
                u = l.firstChild,
                c = u.nextSibling,
                d = c.firstChild,
                p = d.firstChild,
                o = p.firstChild,
                a = o.nextSibling;
            return C(u, S(se, {
                size: "terminal-md",
                children: "STARR PARK SECURITY"
            })), C(d, S(se, {
                size: "terminal-md",
                class: "text-purple",
                children: "Are you sure you want to exit?"
            }), p), o.$$click = () => i("cancel"), a.$$click = () => i("confirm"), Q(f => {
                const v = qi({
                        selected: n() === "cancel"
                    }),
                    g = qi({
                        selected: n() === "confirm"
                    });
                return v !== f._v$ && te(o, f._v$ = v), g !== f._v$2 && te(a, f._v$2 = g), f
            }, {
                _v$: void 0,
                _v$2: void 0
            }), s
        })()
    };
Ie(["click"]);
const fv = V('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>Exit</span></button><button><span>Continue'),
    Ki = yn(["relative px-96 py-2", An({
        size: "terminal-sm"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light border"
            }
        }
    }),
    dv = () => S(fr, {
        get isOpen() {
            return !Ye.dataUsageWarningDialog.accepted()
        },
        get children() {
            return S(pv, {
                onExit: () => {
                    window.location.href = "brawlstars-inbox://closeView"
                },
                onClose: () => {
                    Ye.dataUsageWarningDialog.setAccepted()
                }
            })
        }
    }),
    pv = e => {
        const [n, t] = Y();
        let r;
        const i = s => {
            t(s), clearTimeout(r), r = setTimeout(() => {
                s === "exit" ? e.onExit() : e.onClose()
            }, 1e3)
        };
        return (() => {
            const s = fv(),
                l = s.firstChild,
                u = l.firstChild,
                c = u.nextSibling,
                d = c.firstChild,
                p = d.firstChild,
                o = p.firstChild,
                a = o.nextSibling;
            return C(u, S(se, {
                size: "terminal-md",
                children: "STARR PARK SECURITY"
            })), C(d, S(se, {
                size: "terminal-sm",
                class: "text-purple whitespace-pre-wrap",
                get children() {
                    return ["This website features live video content, which can consume a significant amount of data.", "\n", "If you're using a limited data plan or have concerns about data usage, we recommend switching to a Wi-Fi network."]
                }
            }), p), o.$$click = () => i("exit"), a.$$click = () => i("continue"), Q(f => {
                const v = Ki({
                        selected: n() === "exit"
                    }),
                    g = Ki({
                        selected: n() === "continue"
                    });
                return v !== f._v$ && te(o, f._v$ = v), g !== f._v$2 && te(a, f._v$2 = g), f
            }, {
                _v$: void 0,
                _v$2: void 0
            }), s
        })()
    };
Ie(["click"]);
const gv = V('<button class="absolute top-20 left-20 w-100 h-100 flex-center">'),
    vv = V('<button class="absolute top-20 right-20 w-100 h-100 flex-center text-purple">'),
    hv = V('<div><div class="portrait:hidden absolute origin-top-left overflow-hidden"></div><div class="landscape:hidden portrait:flex wh-full flex-center"><div class="font-medium whitespace-nowrap">Portrait mode is not supported.'),
    mv = V('<div class="absolute bottom-0 left-0 w-256">');
av.setup();
const Fr = {
        width: 2250,
        height: 1170
    },
    _v = () => {
        const e = ur("standalone"),
            [n, t] = Y(!1);
        let r;
        Gt(() => {
            st.init(), ie.init(), ie.setupActivityTracking(), ie.trackPageView()
        }), ge(() => {
            if (pe.Supervisor.allEnded()) {
                const c = pe.Supervisor.currentFeed(),
                    p = !!(c != null && c.archivePlaylist) && c.source;
                p && we.currentOpenApp.mainApp === null && we.openApp(p), pe.Supervisor.setControlsVisible(!1), pe.Supervisor.dispatch("go-live")
            }
        });
        const [i, s] = Y(void 0), l = Mg({
            containerRef: i,
            bgImageSize: Fr,
            fit: "contain"
        }), u = ct([Dg, Og], {
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
            const c = hv(),
                d = c.firstChild;
            return $e(s, c), C(d, S(Rg, {
                onLoaded: () => st.onVideoTransitionLoaded(),
                onEnded: () => st.onVideoTransitionEnd()
            }), null), C(d, S(Le, {
                get when() {
                    return st.currentStatus() >= Ut["video-transition"]
                },
                get children() {
                    return S(jp, {
                        roomSound: u
                    })
                }
            }), null), C(d, S(Le, {
                get when() {
                    return st.currentStatus() === Ut.done
                },
                get children() {
                    return [(() => {
                        const p = gv();
                        return p.$$click = () => t(!0), C(p, S(se, {
                            size: "terminal-lg",
                            class: "text-green leading-none inline-block pb-16",
                            children: "х"
                        })), p
                    })(), (() => {
                        const p = vv();
                        return p.$$click = () => {
                            ie.trackClickEvent("instructions-modal", St.options.muted ? "sound-on" : "sound-off", "cctv-room"), St.toggleMute()
                        }, C(p, S(Lt, {
                            get name() {
                                return St.options.muted ? "mute" : "unmute"
                            },
                            class: "w-72"
                        })), p
                    })(), S(Pg, {
                        onPlaylistLoad: () => u.play("archive-tape-load")
                    }), S(Hp, {
                        onClose: () => u.play("logbook-close")
                    }), S(dv, {})]
                }
            }), null), C(d, S(cv, {
                get isOpen() {
                    return n()
                },
                onClose: () => t(!1)
            }), null), Q(p => {
                const o = ce("wh-full", e && "bg-black"),
                    a = "".concat(Fr.height, "px"),
                    f = "".concat(Fr.width, "px"),
                    v = "translate(".concat(l.position().x, "px, ").concat(l.position().y, "px) scale(").concat(l.scaleFactor(), ")");
                return o !== p._v$ && te(c, p._v$ = o), a !== p._v$2 && ((p._v$2 = a) != null ? d.style.setProperty("height", a) : d.style.removeProperty("height")), f !== p._v$3 && ((p._v$3 = f) != null ? d.style.setProperty("width", f) : d.style.removeProperty("width")), v !== p._v$4 && ((p._v$4 = v) != null ? d.style.setProperty("transform", v) : d.style.removeProperty("transform")), p
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), c
        })(), (() => {
            const c = mv(),
                d = r;
            return typeof d == "function" ? $e(d, c) : r = c, c
        })()]
    };
Ie(["click"]);
fl(() => S(_v, {}), document.getElementById("root"));
export {
    bn as a, Ge as c, bv as g
};