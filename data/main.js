var Ua = Object.defineProperty,
    Fa = Object.defineProperties;
var Ga = Object.getOwnPropertyDescriptors;
var Nn = Object.getOwnPropertySymbols;
var Jo = Object.prototype.hasOwnProperty,
    Xo = Object.prototype.propertyIsEnumerable;
var $r = (e, n, t) => n in e ? Ua(e, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[n] = t,
    be = (e, n) => {
        for (var t in n || (n = {})) Jo.call(n, t) && $r(e, t, n[t]);
        if (Nn)
            for (var t of Nn(n)) Xo.call(n, t) && $r(e, t, n[t]);
        return e
    },
    mt = (e, n) => Fa(e, Ga(n));
var ei = (e, n) => {
    var t = {};
    for (var r in e) Jo.call(e, r) && n.indexOf(r) < 0 && (t[r] = e[r]);
    if (e != null && Nn)
        for (var r of Nn(e)) n.indexOf(r) < 0 && Xo.call(e, r) && (t[r] = e[r]);
    return t
};
var ti = (e, n, t) => ($r(e, typeof n != "symbol" ? n + "" : n, t), t);
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
const Za = {
        context: void 0,
        registry: void 0
    },
    Wa = (e, n) => e === n,
    Be = Symbol("solid-proxy"),
    Wr = Symbol("solid-track"),
    Ya = Symbol("solid-dev-component"),
    tr = {
        equals: Wa
    };
let ts = ls;
const dt = 1,
    nr = 2,
    ns = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var ee = null;
let Ir = null,
    le = null,
    me = null,
    We = null,
    cr = 0;

function an(e, n) {
    const t = le,
        r = ee,
        i = e.length === 0,
        s = n === void 0 ? r : n,
        l = i ? ns : {
            owned: null,
            cleanups: null,
            context: s ? s.context : null,
            owner: s
        },
        u = i ? e : () => e(() => fe(() => fr(l)));
    ee = l, le = null;
    try {
        return Zt(u, !0)
    } finally {
        le = t, ee = r
    }
}

function Z(e, n) {
    n = n ? Object.assign({}, tr, n) : tr;
    const t = {
            value: e,
            observers: null,
            observerSlots: null,
            comparator: n.equals || void 0
        },
        r = i => (typeof i == "function" && (i = i(t.value)), as(t, i));
    return [ss.bind(t), r]
}

function Q(e, n, t) {
    const r = uo(e, n, !1, dt);
    bn(r)
}

function pe(e, n, t) {
    ts = Xa;
    const r = uo(e, n, !1, dt),
        i = ni && os(ni);
    i && (r.suspense = i), (!t || !t.render) && (r.user = !0), We ? We.push(r) : bn(r)
}

function we(e, n, t) {
    t = t ? Object.assign({}, tr, t) : tr;
    const r = uo(e, n, !0, 0);
    return r.observers = null, r.observerSlots = null, r.comparator = t.equals || void 0, bn(r), ss.bind(r)
}

function ur(e) {
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

function rs(e, n, t) {
    const r = Array.isArray(e);
    let i, s = t && t.defer;
    return l => {
        let u;
        if (r) {
            u = Array(e.length);
            for (let f = 0; f < e.length; f++) u[f] = e[f]()
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
    pe(() => fe(e))
}

function _e(e) {
    return ee === null || (ee.cleanups === null ? ee.cleanups = [e] : ee.cleanups.push(e)), e
}

function rr() {
    return le
}

function qa() {
    return ee
}

function Ka(e, n) {
    const t = Symbol("context");
    return {
        id: t,
        Provider: tl(t),
        defaultValue: e
    }
}

function os(e) {
    return ee && ee.context && ee.context[e.id] !== void 0 ? ee.context[e.id] : e.defaultValue
}

function is(e) {
    const n = we(e),
        t = we(() => Yr(n()));
    return t.toArray = () => {
        const r = t();
        return Array.isArray(r) ? r : r != null ? [r] : []
    }, t
}
let ni;

function ss() {
    if (this.sources && this.state)
        if (this.state === dt) bn(this);
        else {
            const e = me;
            me = null, Zt(() => ir(this), !1), me = e
        } if (le) {
        const e = this.observers ? this.observers.length : 0;
        le.sources ? (le.sources.push(this), le.sourceSlots.push(e)) : (le.sources = [this], le.sourceSlots = [e]), this.observers ? (this.observers.push(le), this.observerSlots.push(le.sources.length - 1)) : (this.observers = [le], this.observerSlots = [le.sources.length - 1])
    }
    return this.value
}

function as(e, n, t) {
    let r = e.value;
    return (!e.comparator || !e.comparator(r, n)) && (e.value = n, e.observers && e.observers.length && Zt(() => {
        for (let i = 0; i < e.observers.length; i += 1) {
            const s = e.observers[i],
                l = Ir && Ir.running;
            l && Ir.disposed.has(s), (l ? !s.tState : !s.state) && (s.pure ? me.push(s) : We.push(s), s.observers && cs(s)), l || (s.state = dt)
        }
        if (me.length > 1e6) throw me = [], new Error
    }, !1)), n
}

function bn(e) {
    if (!e.fn) return;
    fr(e);
    const n = ee,
        t = le,
        r = cr;
    le = ee = e, Qa(e, e.value, r), le = t, ee = n
}

function Qa(e, n, t) {
    let r;
    try {
        r = e.fn(n)
    } catch (i) {
        return e.pure && (e.state = dt, e.owned && e.owned.forEach(fr), e.owned = null), e.updatedAt = t + 1, us(i)
    }(!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? as(e, r) : e.value = r, e.updatedAt = t)
}

function uo(e, n, t, r = dt, i) {
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
    return ee === null || ee !== ns && (ee.owned ? ee.owned.push(s) : ee.owned = [s]), s
}

function or(e) {
    if (e.state === 0) return;
    if (e.state === nr) return ir(e);
    if (e.suspense && fe(e.suspense.inFallback)) return e.suspense.effects.push(e);
    const n = [e];
    for (;
        (e = e.owner) && (!e.updatedAt || e.updatedAt < cr);) e.state && n.push(e);
    for (let t = n.length - 1; t >= 0; t--)
        if (e = n[t], e.state === dt) bn(e);
        else if (e.state === nr) {
        const r = me;
        me = null, Zt(() => ir(e, n[0]), !1), me = r
    }
}

function Zt(e, n) {
    if (me) return e();
    let t = !1;
    n || (me = []), We ? t = !0 : We = [], cr++;
    try {
        const r = e();
        return Ja(t), r
    } catch (r) {
        t || (We = null), me = null, us(r)
    }
}

function Ja(e) {
    if (me && (ls(me), me = null), e) return;
    const n = We;
    We = null, n.length && Zt(() => ts(n), !1)
}

function ls(e) {
    for (let n = 0; n < e.length; n++) or(e[n])
}

function Xa(e) {
    let n, t = 0;
    for (n = 0; n < e.length; n++) {
        const r = e[n];
        r.user ? e[t++] = r : or(r)
    }
    for (n = 0; n < t; n++) or(e[n])
}

function ir(e, n) {
    e.state = 0;
    for (let t = 0; t < e.sources.length; t += 1) {
        const r = e.sources[t];
        if (r.sources) {
            const i = r.state;
            i === dt ? r !== n && (!r.updatedAt || r.updatedAt < cr) && or(r) : i === nr && ir(r, n)
        }
    }
}

function cs(e) {
    for (let n = 0; n < e.observers.length; n += 1) {
        const t = e.observers[n];
        t.state || (t.state = nr, t.pure ? me.push(t) : We.push(t), t.observers && cs(t))
    }
}

function fr(e) {
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
        for (n = e.owned.length - 1; n >= 0; n--) fr(e.owned[n]);
        e.owned = null
    }
    if (e.cleanups) {
        for (n = e.cleanups.length - 1; n >= 0; n--) e.cleanups[n]();
        e.cleanups = null
    }
    e.state = 0
}

function el(e) {
    return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
        cause: e
    })
}

function us(e, n = ee) {
    throw el(e)
}

function Yr(e) {
    if (typeof e == "function" && !e.length) return Yr(e());
    if (Array.isArray(e)) {
        const n = [];
        for (let t = 0; t < e.length; t++) {
            const r = Yr(e[t]);
            Array.isArray(r) ? n.push.apply(n, r) : n.push(r)
        }
        return n
    }
    return e
}

function tl(e, n) {
    return function(r) {
        let i;
        return Q(() => i = fe(() => (ee.context = mt(be({}, ee.context), {
            [e]: r.value
        }), is(() => r.children))), void 0), i
    }
}
const nl = Symbol("fallback");

function ri(e) {
    for (let n = 0; n < e.length; n++) e[n]()
}

function rl(e, n, t = {}) {
    let r = [],
        i = [],
        s = [],
        l = 0,
        u = n.length > 1 ? [] : null;
    return _e(() => ri(s)), () => {
        let c = e() || [],
            f, p;
        return c[Wr], fe(() => {
            let a = c.length,
                d, v, g, m, h, y, w, b, P;
            if (a === 0) l !== 0 && (ri(s), s = [], r = [], i = [], l = 0, u && (u = [])), t.fallback && (r = [nl], i[0] = an(H => (s[0] = H, t.fallback())), l = 1);
            else if (l === 0) {
                for (i = new Array(a), p = 0; p < a; p++) r[p] = c[p], i[p] = an(o);
                l = a
            } else {
                for (g = new Array(a), m = new Array(a), u && (h = new Array(a)), y = 0, w = Math.min(l, a); y < w && r[y] === c[y]; y++);
                for (w = l - 1, b = a - 1; w >= y && b >= y && r[w] === c[b]; w--, b--) g[b] = i[w], m[b] = s[w], u && (h[b] = u[w]);
                for (d = new Map, v = new Array(b + 1), p = b; p >= y; p--) P = c[p], f = d.get(P), v[p] = f === void 0 ? -1 : f, d.set(P, p);
                for (f = y; f <= w; f++) P = r[f], p = d.get(P), p !== void 0 && p !== -1 ? (g[p] = i[f], m[p] = s[f], u && (h[p] = u[f]), p = v[p], d.set(P, p)) : s[f]();
                for (p = y; p < a; p++) p in g ? (i[p] = g[p], s[p] = m[p], u && (u[p] = h[p], u[p](p))) : i[p] = an(o);
                i = i.slice(0, l = a), r = c.slice(0)
            }
            return i
        });

        function o(a) {
            if (s[p] = a, u) {
                const [d, v] = Z(p);
                return u[p] = v, n(c[p], d)
            }
            return n(c[p])
        }
    }
}

function S(e, n) {
    return fe(() => e(n || {}))
}

function zn() {
    return !0
}
const qr = {
    get(e, n, t) {
        return n === Be ? t : e.get(n)
    },
    has(e, n) {
        return n === Be ? !0 : e.has(n)
    },
    set: zn,
    deleteProperty: zn,
    getOwnPropertyDescriptor(e, n) {
        return {
            configurable: !0,
            enumerable: !0,
            get() {
                return e.get(n)
            },
            set: zn,
            deleteProperty: zn
        }
    },
    ownKeys(e) {
        return e.keys()
    }
};

function Pr(e) {
    return (e = typeof e == "function" ? e() : e) ? e : {}
}

function ol() {
    for (let e = 0, n = this.length; e < n; ++e) {
        const t = this[e]();
        if (t !== void 0) return t
    }
}

function il(...e) {
    let n = !1;
    for (let s = 0; s < e.length; s++) {
        const l = e[s];
        n = n || !!l && Be in l, e[s] = typeof l == "function" ? (n = !0, we(l)) : l
    }
    if (n) return new Proxy({
        get(s) {
            for (let l = e.length - 1; l >= 0; l--) {
                const u = Pr(e[l])[s];
                if (u !== void 0) return u
            }
        },
        has(s) {
            for (let l = e.length - 1; l >= 0; l--)
                if (s in Pr(e[l])) return !0;
            return !1
        },
        keys() {
            const s = [];
            for (let l = 0; l < e.length; l++) s.push(...Object.keys(Pr(e[l])));
            return [...new Set(s)]
        }
    }, qr);
    const t = {},
        r = {},
        i = new Set;
    for (let s = e.length - 1; s >= 0; s--) {
        const l = e[s];
        if (!l) continue;
        const u = Object.getOwnPropertyNames(l);
        for (let c = 0, f = u.length; c < f; c++) {
            const p = u[c];
            if (p === "__proto__" || p === "constructor") continue;
            const o = Object.getOwnPropertyDescriptor(l, p);
            if (!i.has(p)) o.get ? (i.add(p), Object.defineProperty(t, p, {
                enumerable: !0,
                configurable: !0,
                get: ol.bind(r[p] = [o.get.bind(l)])
            })) : (o.value !== void 0 && i.add(p), t[p] = o.value);
            else {
                const a = r[p];
                a ? o.get ? a.push(o.get.bind(l)) : o.value !== void 0 && a.push(() => o.value) : t[p] === void 0 && (t[p] = o.value)
            }
        }
    }
    return t
}

function fo(e, ...n) {
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
            }, qr));
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
        }, qr)), s
    }
    const t = {},
        r = n.map(() => ({}));
    for (const i of Object.getOwnPropertyNames(e)) {
        const s = Object.getOwnPropertyDescriptor(e, i),
            l = !s.get && !s.set && s.enumerable && s.writable && s.configurable;
        let u = !1,
            c = 0;
        for (const f of n) f.includes(i) && (u = !0, l ? r[c][i] = s.value : Object.defineProperty(r[c], i, s)), ++c;
        u || (l ? t[i] = s.value : Object.defineProperty(t, i, s))
    }
    return [...r, t]
}
let sl = 0;

function fs() {
    const e = Za.context;
    return e ? "".concat(e.id).concat(e.count++) : "cl-".concat(sl++)
}
const ds = e => "Stale read from <".concat(e, ">.");

function po(e) {
    const n = "fallback" in e && {
        fallback: () => e.fallback
    };
    return we(rl(() => e.each, e.children, n || void 0))
}

function Le(e) {
    const n = e.keyed,
        t = we(() => e.when, void 0, {
            equals: (r, i) => n ? r === i : !r == !i
        });
    return we(() => {
        const r = t();
        if (r) {
            const i = e.children;
            return typeof i == "function" && i.length > 0 ? fe(() => i(n ? r : () => {
                if (!fe(t)) throw ds("Show");
                return e.when
            })) : i
        }
        return e.fallback
    }, void 0, void 0)
}

function ps(e) {
    let n = !1;
    const t = (s, l) => s[0] === l[0] && (n ? s[1] === l[1] : !s[1] == !l[1]) && s[2] === l[2],
        r = is(() => e.children),
        i = we(() => {
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
    return we(() => {
        const [s, l, u] = i();
        if (s < 0) return e.fallback;
        const c = u.children;
        return typeof c == "function" && c.length > 0 ? fe(() => c(n ? l : () => {
            if (fe(i)[0] !== s) throw ds("Match");
            return u.when
        })) : c
    }, void 0, void 0)
}

function jt(e) {
    return e
}
const al = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"],
    ll = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...al]),
    cl = new Set(["innerHTML", "textContent", "innerText", "children"]),
    ul = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    }),
    fl = Object.assign(Object.create(null), {
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

function dl(e, n) {
    const t = fl[e];
    return typeof t == "object" ? t[n] ? t.$ : void 0 : t
}
const pl = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
    gl = new Set(["altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use", "view", "vkern"]),
    vl = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };

function hl(e, n, t) {
    let r = t.length,
        i = n.length,
        s = r,
        l = 0,
        u = 0,
        c = n[i - 1].nextSibling,
        f = null;
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
            for (; l < i;)(!f || !f.has(n[l])) && n[l].remove(), l++;
        else if (n[l] === t[s - 1] && t[u] === n[i - 1]) {
            const p = n[--i].nextSibling;
            e.insertBefore(t[u++], n[l++].nextSibling), e.insertBefore(t[--s], p), n[i] = t[s]
        } else {
            if (!f) {
                f = new Map;
                let o = u;
                for (; o < s;) f.set(t[o], o++)
            }
            const p = f.get(n[l]);
            if (p != null)
                if (u < p && p < s) {
                    let o = l,
                        a = 1,
                        d;
                    for (; ++o < i && o < s && !((d = f.get(n[o])) == null || d !== p + a);) a++;
                    if (a > p - u) {
                        const v = n[l];
                        for (; u < p;) e.insertBefore(t[u++], v)
                    } else e.replaceChild(t[u++], n[l++])
                } else l++;
            else n[l++].remove()
        }
    }
}
const oi = "_$DX_DELEGATE";

function ml(e, n, t, r = {}) {
    let i;
    return an(s => {
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
    const t = n[oi] || (n[oi] = new Set);
    for (let r = 0, i = e.length; r < i; r++) {
        const s = e[r];
        t.has(s) || (t.add(s), n.addEventListener(s, Sl))
    }
}

function oe(e, n, t) {
    t == null ? e.removeAttribute(n) : e.setAttribute(n, t)
}

function _l(e, n, t, r) {
    r == null ? e.removeAttributeNS(n, t) : e.setAttributeNS(n, t, r)
}

function te(e, n) {
    n == null ? e.removeAttribute("class") : e.className = n
}

function yl(e, n, t, r) {
    if (r) Array.isArray(t) ? (e["$$".concat(n)] = t[0], e["$$".concat(n, "Data")] = t[1]) : e["$$".concat(n)] = t;
    else if (Array.isArray(t)) {
        const i = t[0];
        e.addEventListener(n, t[0] = s => i.call(e, t[1], s))
    } else e.addEventListener(n, t)
}

function bl(e, n, t = {}) {
    const r = Object.keys(n || {}),
        i = Object.keys(t);
    let s, l;
    for (s = 0, l = i.length; s < l; s++) {
        const u = i[s];
        !u || u === "undefined" || n[u] || (ii(e, u, !1), delete t[u])
    }
    for (s = 0, l = r.length; s < l; s++) {
        const u = r[s],
            c = !!n[u];
        !u || u === "undefined" || t[u] === c || !c || (ii(e, u, !0), t[u] = c)
    }
    return t
}

function wl(e, n, t) {
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
    return r || Q(() => i.children = Nt(e, n.children, i.children)), Q(() => n.ref && n.ref(e)), Q(() => Al(e, n, t, !0, i, !0)), i
}

function $e(e, n, t) {
    return fe(() => e(n, t))
}

function C(e, n, t, r) {
    if (t !== void 0 && !r && (r = []), typeof n != "function") return Nt(e, n, r, t);
    Q(i => Nt(e, n(), i, t), r)
}

function Al(e, n, t, r, i = {}, s = !1) {
    n || (n = {});
    for (const l in i)
        if (!(l in n)) {
            if (l === "children") continue;
            i[l] = si(e, l, null, i[l], t, s)
        } for (const l in n) {
        if (l === "children") {
            r || Nt(e, n.children);
            continue
        }
        const u = n[l];
        i[l] = si(e, l, u, i[l], t, s)
    }
}

function xl(e) {
    return e.toLowerCase().replace(/-([a-z])/g, (n, t) => t.toUpperCase())
}

function ii(e, n, t) {
    const r = n.trim().split(/\s+/);
    for (let i = 0, s = r.length; i < s; i++) e.classList.toggle(r[i], t)
}

function si(e, n, t, r, i, s) {
    let l, u, c, f, p;
    if (n === "style") return wl(e, t, r);
    if (n === "classList") return bl(e, t, r);
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
            a = pl.has(o);
        if (!a && r) {
            const d = Array.isArray(r) ? r[0] : r;
            e.removeEventListener(o, d)
        }(a || t) && (yl(e, o, t, a), a && Ie([o]))
    } else if (n.slice(0, 5) === "attr:") oe(e, n.slice(5), t);
    else if ((p = n.slice(0, 5) === "prop:") || (c = cl.has(n)) || !i && ((f = dl(n, e.tagName)) || (u = ll.has(n))) || (l = e.nodeName.includes("-"))) p && (n = n.slice(5), u = !0), n === "class" || n === "className" ? te(e, t) : l && !u && !c ? e[xl(n)] = t : e[f || n] = t;
    else {
        const o = i && n.indexOf(":") > -1 && vl[n.split(":")[0]];
        o ? _l(e, o, n, t) : oe(e, ul[n] || n, t)
    }
    return t
}

function Sl(e) {
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

function Nt(e, n, t, r, i) {
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
            t = Nt(e, u, t, r)
        }), () => t;
        if (Array.isArray(n)) {
            const u = [],
                c = t && Array.isArray(t);
            if (Kr(u, n, t, i)) return Q(() => t = Nt(e, u, t, r, !0)), () => t;
            if (u.length === 0) {
                if (t = Et(e, t, r), l) return t
            } else c ? t.length === 0 ? ai(e, u, r) : hl(e, t, u) : (t && Et(e), ai(e, u));
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

function Kr(e, n, t, r) {
    let i = !1;
    for (let s = 0, l = n.length; s < l; s++) {
        let u = n[s],
            c = t && t[s],
            f;
        if (!(u == null || u === !0 || u === !1))
            if ((f = typeof u) == "object" && u.nodeType) e.push(u);
            else if (Array.isArray(u)) i = Kr(e, u, c) || i;
        else if (f === "function")
            if (r) {
                for (; typeof u == "function";) u = u();
                i = Kr(e, Array.isArray(u) ? u : [u], Array.isArray(c) ? c : [c]) || i
            } else e.push(u), i = !0;
        else {
            const p = String(u);
            c && c.nodeType === 3 && c.data === p ? e.push(c) : e.push(document.createTextNode(p))
        }
    }
    return i
}

function ai(e, n, t = null) {
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
const Tl = "http://www.w3.org/2000/svg";

function kl(e, n = !1) {
    return n ? document.createElementNS(Tl, e) : document.createElement(e)
}

function gs(e) {
    const [n, t] = fo(e, ["component"]), r = we(() => n.component);
    return we(() => {
        const i = r();
        switch (typeof i) {
            case "function":
                return Object.assign(i, {
                    [Ya]: !0
                }), fe(() => i(t));
            case "string":
                const s = gl.has(i),
                    l = kl(i, s);
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

function vs(e) {
    var n, t, r = "";
    if (typeof e == "string" || typeof e == "number") r += e;
    else if (typeof e == "object")
        if (Array.isArray(e))
            for (n = 0; n < e.length; n++) e[n] && (t = vs(e[n])) && (r && (r += " "), r += t);
        else
            for (n in e) e[n] && (r && (r += " "), r += n);
    return r
}

function $l() {
    for (var e, n, t = 0, r = ""; t < arguments.length;)(e = arguments[t++]) && (n = vs(e)) && (r && (r += " "), r += n);
    return r
}
const li = e => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e,
    ce = $l,
    wn = (e, n) => t => {
        var r;
        if ((n == null ? void 0 : n.variants) == null) return ce(e, t == null ? void 0 : t.class, t == null ? void 0 : t.className);
        const {
            variants: i,
            defaultVariants: s
        } = n, l = Object.keys(i).map(f => {
            const p = t == null ? void 0 : t[f],
                o = s == null ? void 0 : s[f];
            if (p === null) return null;
            const a = li(p) || li(o);
            return i[f][a]
        }), u = t && Object.entries(t).reduce((f, p) => {
            let [o, a] = p;
            return a === void 0 || (f[o] = a), f
        }, {}), c = n == null || (r = n.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((f, p) => {
            let v = p,
                {
                    class: o,
                    className: a
                } = v,
                d = ei(v, ["class", "className"]);
            return Object.entries(d).every(g => {
                let [m, h] = g;
                return Array.isArray(h) ? h.includes(be(be({}, s), u)[m]) : be(be({}, s), u)[m] === h
            }) ? [...f, o, a] : f
        }, []);
        return ce(e, l, c, t == null ? void 0 : t.class, t == null ? void 0 : t.className)
    },
    Qr = Symbol("store-raw"),
    Rt = Symbol("store-node"),
    Ue = Symbol("store-has"),
    hs = Symbol("store-self");

function ms(e) {
    let n = e[Be];
    if (!n && (Object.defineProperty(e, Be, {
            value: n = new Proxy(e, Ol)
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

function zt(e, n = new Set) {
    let t, r, i, s;
    if (t = e != null && e[Qr]) return t;
    if (!ut(e) || n.has(e)) return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : n.add(e);
        for (let l = 0, u = e.length; l < u; l++) i = e[l], (r = zt(i, n)) !== i && (e[l] = r)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : n.add(e);
        const l = Object.keys(e),
            u = Object.getOwnPropertyDescriptors(e);
        for (let c = 0, f = l.length; c < f; c++) s = l[c], !u[s].get && (i = e[s], (r = zt(i, n)) !== i && (e[s] = r))
    }
    return e
}

function sr(e, n) {
    let t = e[n];
    return t || Object.defineProperty(e, n, {
        value: t = Object.create(null)
    }), t
}

function dn(e, n, t) {
    if (e[n]) return e[n];
    const [r, i] = Z(t, {
        equals: !1,
        internal: !0
    });
    return r.$ = i, e[n] = r
}

function Il(e, n) {
    const t = Reflect.getOwnPropertyDescriptor(e, n);
    return !t || t.get || !t.configurable || n === Be || n === Rt || (delete t.value, delete t.writable, t.get = () => e[Be][n]), t
}

function _s(e) {
    rr() && dn(sr(e, Rt), hs)()
}

function Pl(e) {
    return _s(e), Reflect.ownKeys(e)
}
const Ol = {
    get(e, n, t) {
        if (n === Qr) return e;
        if (n === Be) return t;
        if (n === Wr) return _s(e), t;
        const r = sr(e, Rt),
            i = r[n];
        let s = i ? i() : e[n];
        if (n === Rt || n === Ue || n === "__proto__") return s;
        if (!i) {
            const l = Object.getOwnPropertyDescriptor(e, n);
            rr() && (typeof s != "function" || e.hasOwnProperty(n)) && !(l && l.get) && (s = dn(r, n, s)())
        }
        return ut(s) ? ms(s) : s
    },
    has(e, n) {
        return n === Qr || n === Be || n === Wr || n === Rt || n === Ue || n === "__proto__" ? !0 : (rr() && dn(sr(e, Ue), n)(), n in e)
    },
    set() {
        return !0
    },
    deleteProperty() {
        return !0
    },
    ownKeys: Pl,
    getOwnPropertyDescriptor: Il
};

function Oe(e, n, t, r = !1) {
    if (!r && e[n] === t) return;
    const i = e[n],
        s = e.length;
    t === void 0 ? (delete e[n], e[Ue] && e[Ue][n] && i !== void 0 && e[Ue][n].$()) : (e[n] = t, e[Ue] && e[Ue][n] && i === void 0 && e[Ue][n].$());
    let l = sr(e, Rt),
        u;
    if ((u = dn(l, n, i)) && u.$(() => t), Array.isArray(e) && e.length !== s) {
        for (let c = e.length; c < s; c++)(u = l[c]) && u.$();
        (u = dn(l, "length", s)) && u.$(e.length)
    }(u = l[hs]) && u.$()
}

function ys(e, n) {
    const t = Object.keys(n);
    for (let r = 0; r < t.length; r += 1) {
        const i = t[r];
        Oe(e, i, n[i])
    }
}

function Dl(e, n) {
    if (typeof n == "function" && (n = n(e)), n = zt(n), Array.isArray(n)) {
        if (e === n) return;
        let t = 0,
            r = n.length;
        for (; t < r; t++) {
            const i = n[t];
            e[t] !== i && Oe(e, t, i)
        }
        Oe(e, "length", r)
    } else ys(e, n)
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
                to: f = e.length - 1,
                by: p = 1
            } = r;
            for (let o = c; o <= f; o += p) on(e, [o].concat(n), t);
            return
        } else if (n.length > 1) {
            on(e[r], n, [r].concat(t));
            return
        }
        i = e[r], t = [r].concat(t)
    }
    let s = n[0];
    typeof s == "function" && (s = s(i, t), s === i) || r === void 0 && s == null || (s = zt(s), r === void 0 || ut(i) && ut(s) && !Array.isArray(s) ? ys(i, s) : Oe(e, r, s))
}

function Wt(...[e, n]) {
    const t = zt(e || {}),
        r = Array.isArray(t),
        i = ms(t);

    function s(...l) {
        ur(() => {
            r && l.length === 1 ? Dl(t, l[0]) : on(t, l)
        })
    }
    return [i, s]
}
const Jr = Symbol("store-root");

function Mt(e, n, t, r, i) {
    const s = n[t];
    if (e === s) return;
    if (t !== Jr && (!ut(e) || !ut(s) || i && e[i] !== s[i])) {
        Oe(n, t, e);
        return
    }
    if (Array.isArray(e)) {
        if (e.length && s.length && (!r || i && e[0] && e[0][i] != null)) {
            let c, f, p, o, a, d, v, g;
            for (p = 0, o = Math.min(s.length, e.length); p < o && (s[p] === e[p] || i && s[p] && e[p] && s[p][i] === e[p][i]); p++) Mt(e[p], s, p, r, i);
            const m = new Array(e.length),
                h = new Map;
            for (o = s.length - 1, a = e.length - 1; o >= p && a >= p && (s[o] === e[a] || i && s[p] && e[p] && s[o][i] === e[a][i]); o--, a--) m[a] = s[o];
            if (p > a || p > o) {
                for (f = p; f <= a; f++) Oe(s, f, e[f]);
                for (; f < e.length; f++) Oe(s, f, m[f]), Mt(e[f], s, f, r, i);
                s.length > e.length && Oe(s, "length", e.length);
                return
            }
            for (v = new Array(a + 1), f = a; f >= p; f--) d = e[f], g = i && d ? d[i] : d, c = h.get(g), v[f] = c === void 0 ? -1 : c, h.set(g, f);
            for (c = p; c <= o; c++) d = s[c], g = i && d ? d[i] : d, f = h.get(g), f !== void 0 && f !== -1 && (m[f] = s[c], f = v[f], h.set(g, f));
            for (f = p; f < e.length; f++) f in m ? (Oe(s, f, m[f]), Mt(e[f], s, f, r, i)) : Oe(s, f, e[f])
        } else
            for (let c = 0, f = e.length; c < f; c++) Mt(e[c], s, c, r, i);
        s.length > e.length && Oe(s, "length", e.length);
        return
    }
    const l = Object.keys(e);
    for (let c = 0, f = l.length; c < f; c++) Mt(e[l[c]], s, l[c], r, i);
    const u = Object.keys(s);
    for (let c = 0, f = u.length; c < f; c++) e[u[c]] === void 0 && Oe(s, u[c], void 0)
}

function El(e, n = {}) {
    const {
        merge: t,
        key: r = "id"
    } = n, i = zt(e);
    return s => {
        if (!ut(s) || !ut(i)) return i;
        const l = Mt(i, {
            [Jr]: s
        }, Jr, t, r);
        return l === void 0 ? s : l
    }
}
const [Cl, Xr] = Wt({
    mainApp: null
}), Ml = e => {
    Xr(e === "home" || e === "security-tape-archives" || e === "timecoder" ? {
        mainApp: "terminal",
        terminalApp: e
    } : {
        mainApp: e,
        terminalApp: void 0
    })
}, jl = () => {
    Xr({
        mainApp: null,
        terminalApp: void 0
    })
}, xe = {
    currentOpenApp: Cl,
    openApp: Ml,
    closeApp: jl
};
var Ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};

function An(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}

function Dv(e) {
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
var pn = {};
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
                    for (var d = 0; d < a._howls.length; d++)
                        if (!a._howls[d]._webAudio)
                            for (var v = a._howls[d]._getSoundIds(), g = 0; g < v.length; g++) {
                                var m = a._howls[d]._soundById(v[g]);
                                m && m._node && (m._node.volume = m._volume * o)
                            }
                    return a
                }
                return a._volume
            },
            mute: function(o) {
                var a = this || t;
                a.ctx || p(), a._muted = o, a.usingWebAudio && a.masterGain.gain.setValueAtTime(o ? 0 : a._volume, t.ctx.currentTime);
                for (var d = 0; d < a._howls.length; d++)
                    if (!a._howls[d]._webAudio)
                        for (var v = a._howls[d]._getSoundIds(), g = 0; g < v.length; g++) {
                            var m = a._howls[d]._soundById(v[g]);
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
                    } catch (d) {
                        o.noAudio = !0
                    } else o.noAudio = !0;
                try {
                    var a = new Audio;
                    a.muted && (o.noAudio = !0)
                } catch (d) {}
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
                var d = a.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                    v = o._navigator ? o._navigator.userAgent : "",
                    g = v.match(/OPR\/(\d+)/g),
                    m = g && parseInt(g[0].split("/")[1], 10) < 33,
                    h = v.indexOf("Safari") !== -1 && v.indexOf("Chrome") === -1,
                    y = v.match(/Version\/(.*?) /),
                    w = h && y && parseInt(y[1], 10) < 15;
                return o._codecs = {
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
                }, o
            },
            _unlockAudio: function() {
                var o = this || t;
                if (!(o._audioUnlocked || !o.ctx)) {
                    o._audioUnlocked = !1, o.autoUnlock = !1, !o._mobileUnloaded && o.ctx.sampleRate !== 44100 && (o._mobileUnloaded = !0, o.unload()), o._scratchBuffer = o.ctx.createBuffer(1, 1, 22050);
                    var a = function(d) {
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
                            for (var d = 0; d < o._howls[a]._sounds.length; d++)
                                if (!o._howls[a]._sounds[d]._paused) return o
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
                for (var d = 0; d < o._src.length; d++) {
                    var v, g;
                    if (o._format && o._format[d]) v = o._format[d];
                    else {
                        if (g = o._src[d], typeof g != "string") {
                            o._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                            continue
                        }
                        v = /^data:audio\/([^;,]+);/i.exec(g), v || (v = /\.([^.]+)$/.exec(g.split("?", 1)[0])), v && (v = v[1].toLowerCase())
                    }
                    if (v || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), v && t.codecs(v)) {
                        a = o._src[d];
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
                var d = this,
                    v = null;
                if (typeof o == "number") v = o, o = null;
                else {
                    if (typeof o == "string" && d._state === "loaded" && !d._sprite[o]) return null;
                    if (typeof o > "u" && (o = "__default", !d._playLock)) {
                        for (var g = 0, m = 0; m < d._sounds.length; m++) d._sounds[m]._paused && !d._sounds[m]._ended && (g++, v = d._sounds[m]._id);
                        g === 1 ? o = null : v = null
                    }
                }
                var h = v ? d._soundById(v) : d._inactiveSound();
                if (!h) return null;
                if (v && !o && (o = h._sprite || "__default"), d._state !== "loaded") {
                    h._sprite = o, h._ended = !1;
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
                var w = Math.max(0, h._seek > 0 ? h._seek : d._sprite[o][0] / 1e3),
                    b = Math.max(0, (d._sprite[o][0] + d._sprite[o][1]) / 1e3 - w),
                    P = b * 1e3 / Math.abs(h._rate),
                    H = d._sprite[o][0] / 1e3,
                    Y = (d._sprite[o][0] + d._sprite[o][1]) / 1e3;
                h._sprite = o, h._ended = !1;
                var B = function() {
                    h._paused = !1, h._seek = w, h._start = H, h._stop = Y, h._loop = !!(h._loop || d._sprite[o][2])
                };
                if (w >= Y) {
                    d._ended(h);
                    return
                }
                var j = h._node;
                if (d._webAudio) {
                    var N = function() {
                        d._playLock = !1, B(), d._refreshBuffer(h);
                        var M = h._muted || d._muted ? 0 : h._volume;
                        j.gain.setValueAtTime(M, t.ctx.currentTime), h._playStart = t.ctx.currentTime, typeof j.bufferSource.start > "u" ? h._loop ? j.bufferSource.noteGrainOn(0, w, 86400) : j.bufferSource.noteGrainOn(0, w, b) : h._loop ? j.bufferSource.start(0, w, 86400) : j.bufferSource.start(0, w, b), P !== 1 / 0 && (d._endTimers[h._id] = setTimeout(d._ended.bind(d, h), P)), a || setTimeout(function() {
                            d._emit("play", h._id), d._loadQueue()
                        }, 0)
                    };
                    t.state === "running" && t.ctx.state !== "interrupted" ? N() : (d._playLock = !0, d.once("resume", N), d._clearTimer(h._id))
                } else {
                    var L = function() {
                        j.currentTime = w, j.muted = h._muted || d._muted || t._muted || j.muted, j.volume = h._volume * t.volume(), j.playbackRate = h._rate;
                        try {
                            var M = j.play();
                            if (M && typeof Promise < "u" && (M instanceof Promise || typeof M.then == "function") ? (d._playLock = !0, B(), M.then(function() {
                                    d._playLock = !1, j._unlocked = !0, a ? d._loadQueue() : d._emit("play", h._id)
                                }).catch(function() {
                                    d._playLock = !1, d._emit("playerror", h._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), h._ended = !0, h._paused = !0
                                })) : a || (d._playLock = !1, B(), d._emit("play", h._id)), j.playbackRate = h._rate, j.paused) {
                                d._emit("playerror", h._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                return
                            }
                            o !== "__default" || h._loop ? d._endTimers[h._id] = setTimeout(d._ended.bind(d, h), P) : (d._endTimers[h._id] = function() {
                                d._ended(h), j.removeEventListener("ended", d._endTimers[h._id], !1)
                            }, j.addEventListener("ended", d._endTimers[h._id], !1))
                        } catch (I) {
                            d._emit("playerror", h._id, I)
                        }
                    };
                    j.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (j.src = d._src, j.load());
                    var J = window && window.ejecta || !j.readyState && t._navigator.isCocoonJS;
                    if (j.readyState >= 3 || J) L();
                    else {
                        d._playLock = !0, d._state = "loading";
                        var de = function() {
                            d._state = "loaded", L(), j.removeEventListener(t._canPlayEvent, de, !1)
                        };
                        j.addEventListener(t._canPlayEvent, de, !1), d._clearTimer(h._id)
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
                for (var d = a._getSoundIds(o), v = 0; v < d.length; v++) {
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
            stop: function(o, a) {
                var d = this;
                if (d._state !== "loaded" || d._playLock) return d._queue.push({
                    event: "stop",
                    action: function() {
                        d.stop(o)
                    }
                }), d;
                for (var v = d._getSoundIds(o), g = 0; g < v.length; g++) {
                    d._clearTimer(v[g]);
                    var m = d._soundById(v[g]);
                    m && (m._seek = m._start || 0, m._rateSeek = 0, m._paused = !0, m._ended = !0, d._stopFade(v[g]), m._node && (d._webAudio ? m._node.bufferSource && (typeof m._node.bufferSource.stop > "u" ? m._node.bufferSource.noteOff(0) : m._node.bufferSource.stop(0), d._cleanBuffer(m._node)) : (!isNaN(m._node.duration) || m._node.duration === 1 / 0) && (m._node.currentTime = m._start || 0, m._node.pause(), m._node.duration === 1 / 0 && d._clearSound(m._node))), a || d._emit("stop", m._id))
                }
                return d
            },
            mute: function(o, a) {
                var d = this;
                if (d._state !== "loaded" || d._playLock) return d._queue.push({
                    event: "mute",
                    action: function() {
                        d.mute(o, a)
                    }
                }), d;
                if (typeof a > "u")
                    if (typeof o == "boolean") d._muted = o;
                    else return d._muted;
                for (var v = d._getSoundIds(a), g = 0; g < v.length; g++) {
                    var m = d._soundById(v[g]);
                    m && (m._muted = o, m._interval && d._stopFade(m._id), d._webAudio && m._node ? m._node.gain.setValueAtTime(o ? 0 : m._volume, t.ctx.currentTime) : m._node && (m._node.muted = t._muted ? !0 : o), d._emit("mute", m._id))
                }
                return d
            },
            volume: function() {
                var o = this,
                    a = arguments,
                    d, v;
                if (a.length === 0) return o._volume;
                if (a.length === 1 || a.length === 2 && typeof a[1] > "u") {
                    var g = o._getSoundIds(),
                        m = g.indexOf(a[0]);
                    m >= 0 ? v = parseInt(a[0], 10) : d = parseFloat(a[0])
                } else a.length >= 2 && (d = parseFloat(a[0]), v = parseInt(a[1], 10));
                var h;
                if (typeof d < "u" && d >= 0 && d <= 1) {
                    if (o._state !== "loaded" || o._playLock) return o._queue.push({
                        event: "volume",
                        action: function() {
                            o.volume.apply(o, a)
                        }
                    }), o;
                    typeof v > "u" && (o._volume = d), v = o._getSoundIds(v);
                    for (var y = 0; y < v.length; y++) h = o._soundById(v[y]), h && (h._volume = d, a[2] || o._stopFade(v[y]), o._webAudio && h._node && !h._muted ? h._node.gain.setValueAtTime(d, t.ctx.currentTime) : h._node && !h._muted && (h._node.volume = d * t.volume()), o._emit("volume", h._id))
                } else return h = v ? o._soundById(v) : o._sounds[0], h ? h._volume : 0;
                return o
            },
            fade: function(o, a, d, v) {
                var g = this;
                if (g._state !== "loaded" || g._playLock) return g._queue.push({
                    event: "fade",
                    action: function() {
                        g.fade(o, a, d, v)
                    }
                }), g;
                o = Math.min(Math.max(0, parseFloat(o)), 1), a = Math.min(Math.max(0, parseFloat(a)), 1), d = parseFloat(d), g.volume(o, v);
                for (var m = g._getSoundIds(v), h = 0; h < m.length; h++) {
                    var y = g._soundById(m[h]);
                    if (y) {
                        if (v || g._stopFade(m[h]), g._webAudio && !y._muted) {
                            var w = t.ctx.currentTime,
                                b = w + d / 1e3;
                            y._volume = o, y._node.gain.setValueAtTime(o, w), y._node.gain.linearRampToValueAtTime(a, b)
                        }
                        g._startFadeInterval(y, o, a, d, m[h], typeof v > "u")
                    }
                }
                return g
            },
            _startFadeInterval: function(o, a, d, v, g, m) {
                var h = this,
                    y = a,
                    w = d - a,
                    b = Math.abs(w / .01),
                    P = Math.max(4, b > 0 ? v / b : v),
                    H = Date.now();
                o._fadeTo = d, o._interval = setInterval(function() {
                    var Y = (Date.now() - H) / v;
                    H = Date.now(), y += w * Y, y = Math.round(y * 100) / 100, w < 0 ? y = Math.max(d, y) : y = Math.min(d, y), h._webAudio ? o._volume = y : h.volume(y, o._id, !0), m && (h._volume = y), (d < a && y <= d || d > a && y >= d) && (clearInterval(o._interval), o._interval = null, o._fadeTo = null, h.volume(d, o._id), h._emit("fade", o._id))
                }, P)
            },
            _stopFade: function(o) {
                var a = this,
                    d = a._soundById(o);
                return d && d._interval && (a._webAudio && d._node.gain.cancelScheduledValues(t.ctx.currentTime), clearInterval(d._interval), d._interval = null, a.volume(d._fadeTo, o), d._fadeTo = null, a._emit("fade", o)), a
            },
            loop: function() {
                var o = this,
                    a = arguments,
                    d, v, g;
                if (a.length === 0) return o._loop;
                if (a.length === 1)
                    if (typeof a[0] == "boolean") d = a[0], o._loop = d;
                    else return g = o._soundById(parseInt(a[0], 10)), g ? g._loop : !1;
                else a.length === 2 && (d = a[0], v = parseInt(a[1], 10));
                for (var m = o._getSoundIds(v), h = 0; h < m.length; h++) g = o._soundById(m[h]), g && (g._loop = d, o._webAudio && g._node && g._node.bufferSource && (g._node.bufferSource.loop = d, d && (g._node.bufferSource.loopStart = g._start || 0, g._node.bufferSource.loopEnd = g._stop, o.playing(m[h]) && (o.pause(m[h], !0), o.play(m[h], !0)))));
                return o
            },
            rate: function() {
                var o = this,
                    a = arguments,
                    d, v;
                if (a.length === 0) v = o._sounds[0]._id;
                else if (a.length === 1) {
                    var g = o._getSoundIds(),
                        m = g.indexOf(a[0]);
                    m >= 0 ? v = parseInt(a[0], 10) : d = parseFloat(a[0])
                } else a.length === 2 && (d = parseFloat(a[0]), v = parseInt(a[1], 10));
                var h;
                if (typeof d == "number") {
                    if (o._state !== "loaded" || o._playLock) return o._queue.push({
                        event: "rate",
                        action: function() {
                            o.rate.apply(o, a)
                        }
                    }), o;
                    typeof v > "u" && (o._rate = d), v = o._getSoundIds(v);
                    for (var y = 0; y < v.length; y++)
                        if (h = o._soundById(v[y]), h) {
                            o.playing(v[y]) && (h._rateSeek = o.seek(v[y]), h._playStart = o._webAudio ? t.ctx.currentTime : h._playStart), h._rate = d, o._webAudio && h._node && h._node.bufferSource ? h._node.bufferSource.playbackRate.setValueAtTime(d, t.ctx.currentTime) : h._node && (h._node.playbackRate = d);
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
                    d, v;
                if (a.length === 0) o._sounds.length && (v = o._sounds[0]._id);
                else if (a.length === 1) {
                    var g = o._getSoundIds(),
                        m = g.indexOf(a[0]);
                    m >= 0 ? v = parseInt(a[0], 10) : o._sounds.length && (v = o._sounds[0]._id, d = parseFloat(a[0]))
                } else a.length === 2 && (d = parseFloat(a[0]), v = parseInt(a[1], 10));
                if (typeof v > "u") return 0;
                if (typeof d == "number" && (o._state !== "loaded" || o._playLock)) return o._queue.push({
                    event: "seek",
                    action: function() {
                        o.seek.apply(o, a)
                    }
                }), o;
                var h = o._soundById(v);
                if (h)
                    if (typeof d == "number" && d >= 0) {
                        var y = o.playing(v);
                        y && o.pause(v, !0), h._seek = d, h._ended = !1, o._clearTimer(v), !o._webAudio && h._node && !isNaN(h._node.duration) && (h._node.currentTime = d);
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
                    var d = a._soundById(o);
                    return d ? !d._paused : !1
                }
                for (var v = 0; v < a._sounds.length; v++)
                    if (!a._sounds[v]._paused) return !0;
                return !1
            },
            duration: function(o) {
                var a = this,
                    d = a._duration,
                    v = a._soundById(o);
                return v && (d = a._sprite[v._sprite][1] / 1e3), d
            },
            state: function() {
                return this._state
            },
            unload: function() {
                for (var o = this, a = o._sounds, d = 0; d < a.length; d++) a[d]._paused || o.stop(a[d]._id), o._webAudio || (o._clearSound(a[d]._node), a[d]._node.removeEventListener("error", a[d]._errorFn, !1), a[d]._node.removeEventListener(t._canPlayEvent, a[d]._loadFn, !1), a[d]._node.removeEventListener("ended", a[d]._endFn, !1), t._releaseHtml5Audio(a[d]._node)), delete a[d]._node, o._clearTimer(a[d]._id);
                var v = t._howls.indexOf(o);
                v >= 0 && t._howls.splice(v, 1);
                var g = !0;
                for (d = 0; d < t._howls.length; d++)
                    if (t._howls[d]._src === o._src || o._src.indexOf(t._howls[d]._src) >= 0) {
                        g = !1;
                        break
                    } return s && g && delete s[o._src], t.noAudio = !1, o._state = "unloaded", o._sounds = [], o = null, null
            },
            on: function(o, a, d, v) {
                var g = this,
                    m = g["_on" + o];
                return typeof a == "function" && m.push(v ? {
                    id: d,
                    fn: a,
                    once: v
                } : {
                    id: d,
                    fn: a
                }), g
            },
            off: function(o, a, d) {
                var v = this,
                    g = v["_on" + o],
                    m = 0;
                if (typeof a == "number" && (d = a, a = null), a || d)
                    for (m = 0; m < g.length; m++) {
                        var h = d === g[m].id;
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
            once: function(o, a, d) {
                var v = this;
                return v.on(o, a, d, 1), v
            },
            _emit: function(o, a, d) {
                for (var v = this, g = v["_on" + o], m = g.length - 1; m >= 0; m--)(!g[m].id || g[m].id === a || o === "load") && (setTimeout(function(h) {
                    h.call(this, a, d)
                }.bind(v, g[m].fn), 0), g[m].once && v.off(o, g[m].fn, g[m].id));
                return v._loadQueue(o), v
            },
            _loadQueue: function(o) {
                var a = this;
                if (a._queue.length > 0) {
                    var d = a._queue[0];
                    d.event === o && (a._queue.shift(), a._loadQueue()), o || d.action()
                }
                return a
            },
            _ended: function(o) {
                var a = this,
                    d = o._sprite;
                if (!a._webAudio && o._node && !o._node.paused && !o._node.ended && o._node.currentTime < o._stop) return setTimeout(a._ended.bind(a, o), 100), a;
                var v = !!(o._loop || a._sprite[d][2]);
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
                        var d = a._soundById(o);
                        d && d._node && d._node.removeEventListener("ended", a._endTimers[o], !1)
                    }
                    delete a._endTimers[o]
                }
                return a
            },
            _soundById: function(o) {
                for (var a = this, d = 0; d < a._sounds.length; d++)
                    if (o === a._sounds[d]._id) return a._sounds[d];
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
                    d = 0,
                    v = 0;
                if (!(o._sounds.length < a)) {
                    for (v = 0; v < o._sounds.length; v++) o._sounds[v]._ended && d++;
                    for (v = o._sounds.length - 1; v >= 0; v--) {
                        if (d <= a) return;
                        o._sounds[v]._ended && (o._webAudio && o._sounds[v]._node && o._sounds[v]._node.disconnect(0), o._sounds.splice(v, 1), d--)
                    }
                }
            },
            _getSoundIds: function(o) {
                var a = this;
                if (typeof o > "u") {
                    for (var d = [], v = 0; v < a._sounds.length; v++) d.push(a._sounds[v]._id);
                    return d
                } else return [o]
            },
            _refreshBuffer: function(o) {
                var a = this;
                return o._node.bufferSource = t.ctx.createBufferSource(), o._node.bufferSource.buffer = s[a._src], o._panner ? o._node.bufferSource.connect(o._panner) : o._node.bufferSource.connect(o._node), o._node.bufferSource.loop = o._loop, o._loop && (o._node.bufferSource.loopStart = o._start || 0, o._node.bufferSource.loopEnd = o._stop || 0), o._node.bufferSource.playbackRate.setValueAtTime(o._rate, t.ctx.currentTime), a
            },
            _cleanBuffer: function(o) {
                var a = this,
                    d = t._navigator && t._navigator.vendor.indexOf("Apple") >= 0;
                if (!o.bufferSource) return a;
                if (t._scratchBuffer && o.bufferSource && (o.bufferSource.onended = null, o.bufferSource.disconnect(0), d)) try {
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
                    d = t._muted || o._muted || o._parent._muted ? 0 : o._volume;
                return a._webAudio ? (o._node = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), o._node.gain.setValueAtTime(d, t.ctx.currentTime), o._node.paused = !0, o._node.connect(t.masterGain)) : t.noAudio || (o._node = t._obtainHtml5Audio(), o._errorFn = o._errorListener.bind(o), o._node.addEventListener("error", o._errorFn, !1), o._loadFn = o._loadListener.bind(o), o._node.addEventListener(t._canPlayEvent, o._loadFn, !1), o._endFn = o._endListener.bind(o), o._node.addEventListener("ended", o._endFn, !1), o._node.src = a._src, o._node.preload = a._preload === !0 ? "auto" : a._preload, o._node.volume = d * t.volume(), o._node.load()), o
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
                    o._duration = s[a].duration, f(o);
                    return
                }
                if (/^data:[^;]+;base64,/.test(a)) {
                    for (var d = atob(a.split(",")[1]), v = new Uint8Array(d.length), g = 0; g < d.length; ++g) v[g] = d.charCodeAt(g);
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
                var d = function() {
                        a._emit("loaderror", null, "Decoding audio data failed.")
                    },
                    v = function(g) {
                        g && a._sounds.length > 0 ? (s[a._src] = g, f(a, g)) : d()
                    };
                typeof Promise < "u" && t.ctx.decodeAudioData.length === 1 ? t.ctx.decodeAudioData(o).then(v).catch(d) : t.ctx.decodeAudioData(o, v, d)
            },
            f = function(o, a) {
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
                        d = a ? parseInt(a[1], 10) : null;
                    if (o && d && d < 9) {
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
            var f = c._orientation;
            if (r = typeof r != "number" ? f[1] : r, i = typeof i != "number" ? f[2] : i, s = typeof s != "number" ? f[3] : s, l = typeof l != "number" ? f[4] : l, u = typeof u != "number" ? f[5] : u, typeof t == "number") c._orientation = [t, r, i, s, l, u], typeof c.ctx.listener.forwardX < "u" ? (c.ctx.listener.forwardX.setTargetAtTime(t, Howler.ctx.currentTime, .1), c.ctx.listener.forwardY.setTargetAtTime(r, Howler.ctx.currentTime, .1), c.ctx.listener.forwardZ.setTargetAtTime(i, Howler.ctx.currentTime, .1), c.ctx.listener.upX.setTargetAtTime(s, Howler.ctx.currentTime, .1), c.ctx.listener.upY.setTargetAtTime(l, Howler.ctx.currentTime, .1), c.ctx.listener.upZ.setTargetAtTime(u, Howler.ctx.currentTime, .1)) : c.ctx.listener.setOrientation(t, r, i, s, l, u);
            else return f;
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
                var f = l._soundById(u[c]);
                if (f)
                    if (typeof t == "number") f._pos = [t, r, i], f._node && ((!f._panner || f._panner.pan) && n(f, "spatial"), typeof f._panner.positionX < "u" ? (f._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), f._panner.positionY.setValueAtTime(r, Howler.ctx.currentTime), f._panner.positionZ.setValueAtTime(i, Howler.ctx.currentTime)) : f._panner.setPosition(t, r, i)), l._emit("pos", f._id);
                    else return f._pos
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
                var f = l._soundById(u[c]);
                if (f)
                    if (typeof t == "number") f._orientation = [t, r, i], f._node && (f._panner || (f._pos || (f._pos = l._pos || [0, 0, -.5]), n(f, "spatial")), typeof f._panner.orientationX < "u" ? (f._panner.orientationX.setValueAtTime(t, Howler.ctx.currentTime), f._panner.orientationY.setValueAtTime(r, Howler.ctx.currentTime), f._panner.orientationZ.setValueAtTime(i, Howler.ctx.currentTime)) : f._panner.setOrientation(t, r, i)), l._emit("orientation", f._id);
                    else return f._orientation
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
})(pn);
const bs = () => {},
    ws = e => e instanceof Function ? e() : e,
    eo = async e => new Promise(n => setTimeout(n, e)), Bl = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent), dr = e => new URLSearchParams(window.location.search).get(e), ci = dr("muted"), Ll = !ci || ci === "1", Rl = {
        muted: Ll
    }, [go, As] = Wt(Rl);
Gt(() => {
    document.addEventListener("visibilitychange", () => {
        const e = go.muted;
        document.hidden ? pn.Howler.mute(!0) : e || pn.Howler.mute(!1)
    })
});
pe(() => {
    const e = go.muted;
    pn.Howler.mute(e)
});
const Vl = () => {
        As("muted", e => !e)
    },
    Nl = e => {
        As("muted", e)
    },
    St = {
        options: go,
        toggleMute: Vl,
        setMute: Nl
    },
    ct = (e, n = {}) => {
        const [t, r] = Z(null), [i, s] = Z(!1);
        pe(() => {
            const o = fe(t);
            o == null || o.unload(), r(null);
            const a = ws(e);
            !a || Array.isArray(a) && a.length === 0 || new pn.Howl({
                src: a,
                html5: n.html5,
                autoplay: n.autoplay,
                loop: n.loop,
                sprite: n.sprite,
                onload: function() {
                    r(this)
                },
                onplayerror: function(d, v) {
                    typeof v == "string" && v.includes("Playback was unable to start") && s(!0)
                }
            })
        }), _e(() => {
            var o;
            (o = t()) == null || o.unload()
        });
        const l = (o, a = {}) => {
                const d = t();
                if (d) return a.interrupt && d.stop(), d.play(o)
            },
            u = o => {
                var a;
                return (a = t()) == null ? void 0 : a.stop(o)
            },
            c = o => {
                var a;
                return (a = t()) == null ? void 0 : a.pause(o)
            },
            f = () => {
                const o = t();
                o && (o.playing() ? o.pause() : o.play())
            },
            p = o => {
                var a;
                return (a = t()) == null ? void 0 : a.volume(o)
            };
        return pe(() => {
            var d;
            const o = St.options.muted,
                a = fe(i);
            !o && a && ((d = t()) == null || d.play(), s(!1))
        }), {
            internalInstance: t,
            play: l,
            stop: u,
            pause: c,
            toggle: f,
            setVolume: p
        }
    },
    zl = [{
        src: {
            mp3: "ambient-tracks/ambient-track/ambient-5.mp3",
            webm: "ambient-tracks/ambient-track/ambient-5.webm"
        },
        postDate: "2023-12-7"
    }],
    Hl = "modulepreload",
    Ul = function(e) {
        return "/" + e
    },
    ui = {},
    Fl = function(n, t, r) {
        if (!t || t.length === 0) return n();
        const i = document.getElementsByTagName("link");
        return Promise.all(t.map(s => {
            if (s = Ul(s), s in ui) return;
            ui[s] = !0;
            const l = s.endsWith(".css"),
                u = l ? '[rel="stylesheet"]' : "";
            if (!!r)
                for (let p = i.length - 1; p >= 0; p--) {
                    const o = i[p];
                    if (o.href === s && (!l || o.rel === "stylesheet")) return
                } else if (document.querySelector('link[href="'.concat(s, '"]').concat(u))) return;
            const f = document.createElement("link");
            if (f.rel = l ? "stylesheet" : Hl, l || (f.as = "script", f.crossOrigin = ""), f.href = s, document.head.appendChild(f), l) return new Promise((p, o) => {
                f.addEventListener("load", p), f.addEventListener("error", () => o(new Error("Unable to preload CSS for ".concat(s))))
            })
        })).then(() => n()).catch(s => {
            const l = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (l.payload = s, window.dispatchEvent(l), !l.defaultPrevented) throw s
        })
    };

function Gl(e) {
    return e !== null && (typeof e == "object" || typeof e == "function")
}
var Jn = (e, n) => e === n || e.length === n.length && e.every((t, r) => t === n[r]);

function fi(e, ...n) {
    return typeof e == "function" ? e(...n) : e
}
var Zl = _e;

function sn(e, n, t, r) {
    return e.addEventListener(n, t, r), Zl(e.removeEventListener.bind(e, n, t, r))
}

function vo(e, n = qa()) {
    let t = 0,
        r, i;
    return () => (t++, _e(() => {
        t--, queueMicrotask(() => {
            !t && i && (i(), i = r = void 0)
        })
    }), i || an(s => r = e(i = s), n), r)
}

function di(e, n) {
    for (let t = e.length - 1; t >= 0; t--) {
        const r = n.slice(0, t + 1);
        if (!Jn(e[t], r)) return !1
    }
    return !0
}
var xs = vo(() => {
        const [e, n] = Z(null);
        return sn(window, "keydown", t => {
            n(t), setTimeout(() => n(null))
        }), e
    }),
    Wl = vo(() => {
        const [e, n] = Z([]), t = () => n([]), r = xs();
        return sn(window, "keydown", i => {
            if (i.repeat || typeof i.key != "string") return;
            const s = i.key.toUpperCase(),
                l = e();
            if (l.includes(s)) return;
            const u = [...l, s];
            l.length === 0 && s !== "ALT" && s !== "CONTROL" && s !== "META" && s !== "SHIFT" && (i.shiftKey && u.unshift("SHIFT"), i.altKey && u.unshift("ALT"), i.ctrlKey && u.unshift("CONTROL"), i.metaKey && u.unshift("META")), n(u)
        }), sn(window, "keyup", i => {
            if (typeof i.key != "string") return;
            const s = i.key.toUpperCase();
            n(l => l.filter(u => u !== s))
        }), sn(window, "blur", t), sn(window, "contextmenu", i => {
            i.defaultPrevented || t()
        }), e[0] = e, e[1] = {
            event: r
        }, e[Symbol.iterator] = function*() {
            yield e[0], yield e[1]
        }, e
    }),
    Yl = vo(() => {
        const e = Wl();
        return we(n => e().length === 0 ? [] : [...n, e()], [])
    });

function ql(e, n, t = {}) {
    if (!e.length) return;
    e = e.map(f => f.toUpperCase());
    const {
        preventDefault: r = !0
    } = t, i = xs(), s = Yl();
    let l = !1;
    const u = f => {
            if (!f.length) return l = !1;
            if (l) return;
            const p = i();
            f.length < e.length ? di(f, e.slice(0, f.length)) ? r && p && p.preventDefault() : l = !0 : (l = !0, di(f, e) && (r && p && p.preventDefault(), n(p)))
        },
        c = f => {
            const p = f.at(-1);
            if (!p) return;
            const o = i();
            if (r && p.length < e.length) {
                Jn(p, e.slice(0, e.length - 1)) && o && o.preventDefault();
                return
            }
            if (Jn(p, e)) {
                const a = f.at(-2);
                (!a || Jn(a, e.slice(0, e.length - 1))) && (r && o && o.preventDefault(), n(o))
            }
        };
    pe(rs(s, t.requireReset ? u : c))
}
const Ss = "Asia/Tokyo";
var Ts = {
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
            f = "day",
            p = "week",
            o = "month",
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
                        A = I.clone().add(x, o),
                        E = k - A < 0,
                        $ = I.clone().add(x + (E ? -1 : 1), o);
                    return +(-(x + (k - A) / (E ? A - $ : $ - A)) || 0)
                },
                a: function(M) {
                    return M < 0 ? Math.ceil(M) || 0 : Math.floor(M)
                },
                p: function(M) {
                    return {
                        M: o,
                        y: d,
                        w: p,
                        d: f,
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
        var Y = "$isDayjsObject",
            B = function(M) {
                return M instanceof J || !(!M || !M[Y])
            },
            j = function M(I, k, x) {
                var A;
                if (!I) return P;
                if (typeof I == "string") {
                    var E = I.toLowerCase();
                    H[E] && (A = E), k && (H[E] = k, A = E);
                    var $ = I.split("-");
                    if (!A && $.length > 1) return M($[0])
                } else {
                    var U = I.name;
                    H[U] = I, A = U
                }
                return !x && A && (P = A), A || !x && P
            },
            N = function(M, I) {
                if (B(M)) return M.clone();
                var k = typeof I == "object" ? I : {};
                return k.date = M, k.args = arguments, new J(k)
            },
            L = b;
        L.l = j, L.i = B, L.w = function(M, I) {
            return N(M, {
                locale: I.$L,
                utc: I.$u,
                x: I.$x,
                $offset: I.$offset
            })
        };
        var J = function() {
                function M(k) {
                    this.$L = j(k.locale, null, !0), this.parse(k), this.$x = this.$x || k.x || {}, this[Y] = !0
                }
                var I = M.prototype;
                return I.parse = function(k) {
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
                    }(k), this.init()
                }, I.init = function() {
                    var k = this.$d;
                    this.$y = k.getFullYear(), this.$M = k.getMonth(), this.$D = k.getDate(), this.$W = k.getDay(), this.$H = k.getHours(), this.$m = k.getMinutes(), this.$s = k.getSeconds(), this.$ms = k.getMilliseconds()
                }, I.$utils = function() {
                    return L
                }, I.isValid = function() {
                    return this.$d.toString() !== g
                }, I.isSame = function(k, x) {
                    var A = N(k);
                    return this.startOf(x) <= A && A <= this.endOf(x)
                }, I.isAfter = function(k, x) {
                    return N(k) < this.startOf(x)
                }, I.isBefore = function(k, x) {
                    return this.endOf(x) < N(k)
                }, I.$g = function(k, x, A) {
                    return L.u(k) ? this[x] : this.set(A, k)
                }, I.unix = function() {
                    return Math.floor(this.valueOf() / 1e3)
                }, I.valueOf = function() {
                    return this.$d.getTime()
                }, I.startOf = function(k, x) {
                    var A = this,
                        E = !!L.u(x) || x,
                        $ = L.p(k),
                        U = function(F, R) {
                            var W = L.w(A.$u ? Date.UTC(A.$y, R, F) : new Date(A.$y, R, F), A);
                            return E ? W : W.endOf(f)
                        },
                        G = function(F, R) {
                            return L.w(A.toDate()[F].apply(A.toDate("s"), (E ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(R)), A)
                        },
                        K = this.$W,
                        X = this.$M,
                        ne = this.$D,
                        ye = "set" + (this.$u ? "UTC" : "");
                    switch ($) {
                        case d:
                            return E ? U(1, 0) : U(31, 11);
                        case o:
                            return E ? U(1, X) : U(0, X + 1);
                        case p:
                            var O = this.$locale().weekStart || 0,
                                z = (K < O ? K + 7 : K) - O;
                            return U(E ? ne - z : ne + (6 - z), X);
                        case f:
                        case v:
                            return G(ye + "Hours", 0);
                        case c:
                            return G(ye + "Minutes", 1);
                        case u:
                            return G(ye + "Seconds", 2);
                        case l:
                            return G(ye + "Milliseconds", 3);
                        default:
                            return this.clone()
                    }
                }, I.endOf = function(k) {
                    return this.startOf(k, !1)
                }, I.$set = function(k, x) {
                    var A, E = L.p(k),
                        $ = "set" + (this.$u ? "UTC" : ""),
                        U = (A = {}, A[f] = $ + "Date", A[v] = $ + "Date", A[o] = $ + "Month", A[d] = $ + "FullYear", A[c] = $ + "Hours", A[u] = $ + "Minutes", A[l] = $ + "Seconds", A[s] = $ + "Milliseconds", A)[E],
                        G = E === f ? this.$D + (x - this.$W) : x;
                    if (E === o || E === d) {
                        var K = this.clone().set(v, 1);
                        K.$d[U](G), K.init(), this.$d = K.set(v, Math.min(this.$D, K.daysInMonth())).$d
                    } else U && this.$d[U](G);
                    return this.init(), this
                }, I.set = function(k, x) {
                    return this.clone().$set(k, x)
                }, I.get = function(k) {
                    return this[L.p(k)]()
                }, I.add = function(k, x) {
                    var A, E = this;
                    k = Number(k);
                    var $ = L.p(x),
                        U = function(X) {
                            var ne = N(E);
                            return L.w(ne.date(ne.date() + Math.round(X * k)), E)
                        };
                    if ($ === o) return this.set(o, this.$M + k);
                    if ($ === d) return this.set(d, this.$y + k);
                    if ($ === f) return U(1);
                    if ($ === p) return U(7);
                    var G = (A = {}, A[u] = r, A[c] = i, A[l] = t, A)[$] || 1,
                        K = this.$d.getTime() + k * G;
                    return L.w(K, this)
                }, I.subtract = function(k, x) {
                    return this.add(-1 * k, x)
                }, I.format = function(k) {
                    var x = this,
                        A = this.$locale();
                    if (!this.isValid()) return A.invalidDate || g;
                    var E = k || "YYYY-MM-DDTHH:mm:ssZ",
                        $ = L.z(this),
                        U = this.$H,
                        G = this.$m,
                        K = this.$M,
                        X = A.weekdays,
                        ne = A.months,
                        ye = A.meridiem,
                        O = function(R, W, q, ve) {
                            return R && (R[W] || R(x, E)) || q[W].slice(0, ve)
                        },
                        z = function(R) {
                            return L.s(U % 12 || 12, R, "0")
                        },
                        F = ye || function(R, W, q) {
                            var ve = R < 12 ? "AM" : "PM";
                            return q ? ve.toLowerCase() : ve
                        };
                    return E.replace(h, function(R, W) {
                        return W || function(q) {
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
                                    return z(1);
                                case "hh":
                                    return z(2);
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
                }, I.diff = function(k, x, A) {
                    var E, $ = this,
                        U = L.p(x),
                        G = N(k),
                        K = (G.utcOffset() - this.utcOffset()) * r,
                        X = this - G,
                        ne = function() {
                            return L.m($, G)
                        };
                    switch (U) {
                        case d:
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
                        case f:
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
                }, I.locale = function(k, x) {
                    if (!k) return this.$L;
                    var A = this.clone(),
                        E = j(k, x, !0);
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
        return N.prototype = de, [
            ["$ms", s],
            ["$s", l],
            ["$m", u],
            ["$H", c],
            ["$W", f],
            ["$M", o],
            ["$y", d],
            ["$D", v]
        ].forEach(function(M) {
            de[M[1]] = function(I) {
                return this.$g(I, M[0], M[1])
            }
        }), N.extend = function(M, I) {
            return M.$i || (M(I, J, N), M.$i = !0), N
        }, N.locale = j, N.isDayjs = B, N.unix = function(M) {
            return N(1e3 * M)
        }, N.en = H[P], N.Ls = H, N.p = {}, N
    })
})(Ts);
var Kl = Ts.exports;
const Qe = An(Kl);
var ks = {
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
})(ks);
var Ql = ks.exports;
const Jl = An(Ql);
var $s = {
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
            var f = c.parse;
            c.parse = function(g) {
                g.utc && (this.$u = !0), this.$utils().u(g.$offset) || (this.$offset = g.$offset), f.call(this, g)
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
                        var Y = ("" + H[0]).match(i) || ["-", 0, 0],
                            B = Y[0],
                            j = 60 * +Y[1] + +Y[2];
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
            var d = c.toDate;
            c.toDate = function(g) {
                return g === "s" && this.$offset ? u(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : d.call(this)
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
})($s);
var Xl = $s.exports;
const ec = An(Xl);
var Is = {
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
            var u, c = function(a, d, v) {
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
                        }(d, v);
                    return m.formatToParts(g)
                },
                f = function(a, d) {
                    for (var v = c(a, d), g = [], m = 0; m < v.length; m += 1) {
                        var h = v[m],
                            y = h.type,
                            w = h.value,
                            b = t[y];
                        b >= 0 && (g[b] = parseInt(w, 10))
                    }
                    var P = g[3],
                        H = P === 24 ? 0 : P,
                        Y = g[0] + "-" + g[1] + "-" + g[2] + " " + H + ":" + g[4] + ":" + g[5] + ":000",
                        B = +a;
                    return (l.utc(Y).valueOf() - (B -= B % 1e3)) / 6e4
                },
                p = s.prototype;
            p.tz = function(a, d) {
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
                if (d) {
                    var w = y.utcOffset();
                    y = y.add(v - w, "minute")
                }
                return y.$x.$timezone = a, y
            }, p.offsetName = function(a) {
                var d = this.$x.$timezone || l.tz.guess(),
                    v = c(this.valueOf(), d, {
                        timeZoneName: a
                    }).find(function(g) {
                        return g.type.toLowerCase() === "timezonename"
                    });
                return v && v.value
            };
            var o = p.startOf;
            p.startOf = function(a, d) {
                if (!this.$x || !this.$x.$timezone) return o.call(this, a, d);
                var v = l(this.format("YYYY-MM-DD HH:mm:ss:SSS"), {
                    locale: this.$L
                });
                return o.call(v, a, d).tz(this.$x.$timezone, !0)
            }, l.tz = function(a, d, v) {
                var g = v && d,
                    m = v || d || u,
                    h = f(+l(), m);
                if (typeof a != "string") return l(a).tz(m);
                var y = function(H, Y, B) {
                        var j = H - 60 * Y * 1e3,
                            N = f(j, B);
                        if (Y === N) return [j, Y];
                        var L = f(j -= 60 * (N - Y) * 1e3, B);
                        return N === L ? [j, N] : [H - 60 * Math.min(N, L) * 1e3, Math.max(N, L)]
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
})(Is);
var tc = Is.exports;
const nc = An(tc);
Qe.extend(ec);
Qe.extend(nc);
Qe.extend(Jl);
const rc = e => Qe(e),
    Ps = (e, n, t, r = 0) => Qe(e).set("hour", n).set("minute", t).set("second", r),
    Os = e => Qe().tz(e),
    oc = (e, n) => Qe(e).format(n),
    ic = (e, n) => Qe(e).isSameOrBefore(n),
    Ds = (e, n) => Qe(e).isAfter(n),
    sc = void 0;
Wt(sc);
const [ac, Ev] = Z(null);
ql(["Control", "Shift", "D"], () => {
    const e = ac();
    e && (e.hidden = !e.hidden)
});
const Yt = e => () => e,
    lc = "/assets/ambient-5-053c88d0.mp3",
    cc = "/assets/ambient-5-a1dff721.webm",
    uc = "/assets/answering-machine-colt-7d1b52ae.mp3",
    fc = "/assets/answering-machine-colt-494d7d6b.webm",
    dc = "/assets/logbook-1-0fb8b45d.jpg",
    pc = "/assets/logbook-10-bdea2a5b.jpg",
    gc = "/assets/logbook-11-4c9da7f0.jpg",
    vc = "/assets/logbook-12-60bf2721.jpg",
    hc = "/assets/logbook-13-e5cbd10b.jpg",
    mc = "/assets/logbook-14-27366e53.jpg",
    _c = "/assets/logbook-15-0adb8736.jpg",
    yc = "/assets/logbook-16-860ce45f.jpg",
    bc = "/assets/logbook-17-ba5cf8ce.jpg",
    wc = "/assets/logbook-18-48f79d3a.jpg",
    Ac = "/assets/logbook-19-52a7ff56.jpg",
    xc = "/assets/logbook-2-f34a92a7.jpg",
    Sc = "/assets/logbook-20-15976a74.jpg",
    Tc = "/assets/logbook-21-b4a77799.jpg",
    kc = "/assets/logbook-22-281b5db1.jpg",
    $c = "/assets/logbook-23-c9e4daa7.png",
    Ic = "/assets/logbook-24-b785439c.png",
    Pc = "/assets/logbook-25-22c36767.png",
    Oc = "/assets/logbook-26-916e5aa9.jpg",
    Dc = "/assets/logbook-27-2eef6902.jpg",
    Ec = "/assets/logbook-28-2900b975.jpg",
    Cc = "/assets/logbook-29-e3169f79.jpg",
    Mc = "/assets/logbook-3-702b48ec.jpg",
    jc = "/assets/logbook-30-3efd9af2.jpg",
    Bc = "/assets/logbook-31-a5e2bcf3.jpg",
    Lc = "/assets/logbook-32-286b0b8e.jpg",
    Rc = "/assets/logbook-33-36f2c83d.jpg",
    Vc = "/assets/logbook-34-21d5163f.jpg",
    Nc = "/assets/logbook-35-7418861b.jpg",
    zc = "/assets/logbook-36-945743f5.jpg",
    Hc = "/assets/logbook-37-683c1780.jpg",
    Uc = "/assets/logbook-38-b5cc33c7.jpg",
    Fc = "/assets/logbook-39-ceff66a3.jpg",
    Gc = "/assets/logbook-4-e1e4d6b8.jpg",
    Zc = "/assets/logbook-40-46fb910b.jpg",
    Wc = "/assets/logbook-41-db49b00c.jpg",
    Yc = "/assets/logbook-42-1-4d055fa2.jpg",
    qc = "/assets/logbook-42-fef2fc38.jpg",
    Kc = "/assets/logbook-5-b07340b1.jpg",
    Qc = "/assets/logbook-6-aad79ad3.jpg",
    Jc = "/assets/logbook-7-447b8550.jpg",
    Xc = "/assets/logbook-8-75782f09.jpg",
    eu = "/assets/logbook-9-5c82ced1.jpg",
    tu = "/assets/bg-1db347d5.png",
    nu = "/assets/transition-video-a5d6f592.mp4",
    je = e => new URL(Object.assign({
        "../../../content/assets/ambient-tracks/ambient-track/ambient-5.mp3": lc,
        "../../../content/assets/ambient-tracks/ambient-track/ambient-5.webm": cc,
        "../../../content/assets/answering-machine/message-track/answering-machine-colt.mp3": uc,
        "../../../content/assets/answering-machine/message-track/answering-machine-colt.webm": fc,
        "../../../content/assets/logs/log/logbook-1.jpg": dc,
        "../../../content/assets/logs/log/logbook-10.jpg": pc,
        "../../../content/assets/logs/log/logbook-11.jpg": gc,
        "../../../content/assets/logs/log/logbook-12.jpg": vc,
        "../../../content/assets/logs/log/logbook-13.jpg": hc,
        "../../../content/assets/logs/log/logbook-14.jpg": mc,
        "../../../content/assets/logs/log/logbook-15.jpg": _c,
        "../../../content/assets/logs/log/logbook-16.jpg": yc,
        "../../../content/assets/logs/log/logbook-17.jpg": bc,
        "../../../content/assets/logs/log/logbook-18.jpg": wc,
        "../../../content/assets/logs/log/logbook-19.jpg": Ac,
        "../../../content/assets/logs/log/logbook-2.jpg": xc,
        "../../../content/assets/logs/log/logbook-20.jpg": Sc,
        "../../../content/assets/logs/log/logbook-21.jpg": Tc,
        "../../../content/assets/logs/log/logbook-22.jpg": kc,
        "../../../content/assets/logs/log/logbook-23.png": $c,
        "../../../content/assets/logs/log/logbook-24.png": Ic,
        "../../../content/assets/logs/log/logbook-25.png": Pc,
        "../../../content/assets/logs/log/logbook-26.jpg": Oc,
        "../../../content/assets/logs/log/logbook-27.jpg": Dc,
        "../../../content/assets/logs/log/logbook-28.jpg": Ec,
        "../../../content/assets/logs/log/logbook-29.jpg": Cc,
        "../../../content/assets/logs/log/logbook-3.jpg": Mc,
        "../../../content/assets/logs/log/logbook-30.jpg": jc,
        "../../../content/assets/logs/log/logbook-31.jpg": Bc,
        "../../../content/assets/logs/log/logbook-32.jpg": Lc,
        "../../../content/assets/logs/log/logbook-33.jpg": Rc,
        "../../../content/assets/logs/log/logbook-34.jpg": Vc,
        "../../../content/assets/logs/log/logbook-35.jpg": Nc,
        "../../../content/assets/logs/log/logbook-36.jpg": zc,
        "../../../content/assets/logs/log/logbook-37.jpg": Hc,
        "../../../content/assets/logs/log/logbook-38.jpg": Uc,
        "../../../content/assets/logs/log/logbook-39.jpg": Fc,
        "../../../content/assets/logs/log/logbook-4.jpg": Gc,
        "../../../content/assets/logs/log/logbook-40.jpg": Zc,
        "../../../content/assets/logs/log/logbook-41.jpg": Wc,
        "../../../content/assets/logs/log/logbook-42-1.jpg": Yc,
        "../../../content/assets/logs/log/logbook-42.jpg": qc,
        "../../../content/assets/logs/log/logbook-5.jpg": Kc,
        "../../../content/assets/logs/log/logbook-6.jpg": Qc,
        "../../../content/assets/logs/log/logbook-7.jpg": Jc,
        "../../../content/assets/logs/log/logbook-8.jpg": Xc,
        "../../../content/assets/logs/log/logbook-9.jpg": eu,
        "../../../content/assets/scenes/scene/bg.png": tu,
        "../../../content/assets/scenes/scene/transition-video.mp4": nu
    })["../../../content/assets/".concat(e)], self.location).href,
    ru = zl,
    ou = Yt(ru),
    pi = () => {
        const e = ou()[0];
        return mt(be({}, e), {
            srcWebm: je(e.src.webm),
            srcMp3: je(e.src.mp3)
        })
    },
    iu = [{
        src: {
            mp3: "answering-machine/message-track/answering-machine-colt.mp3",
            webm: "answering-machine/message-track/answering-machine-colt.webm"
        },
        postDate: "2023-12-04"
    }],
    su = iu,
    au = Yt(su),
    ln = () => {
        const e = au()[0];
        if (e) return mt(be({}, e), {
            srcWebm: je(e.src.webm),
            srcMp3: je(e.src.mp3)
        })
    },
    lu = "/assets/background-music-83982c9a.webm",
    cu = "/assets/background-music-f98c94df.mp3";
var uu = (e => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, {
        get: (n, t) => (typeof require < "u" ? require : n)[t]
    }) : e)(function(e) {
        if (typeof require < "u") return require.apply(this, arguments);
        throw Error('Dynamic require of "' + e + '" is not supported')
    }),
    fu = e => (typeof e.clear == "function" || (e.clear = () => {
        let n;
        for (; n = e.key(0);) e.removeItem(n)
    }), e),
    du = e => {
        if (!e) return "";
        let n = "";
        for (const t in e) {
            if (!e.hasOwnProperty(t)) continue;
            const r = e[t];
            n += r instanceof Date ? "; ".concat(t, "=").concat(r.toUTCString()) : typeof r == "boolean" ? "; ".concat(t) : "; ".concat(t, "=").concat(r)
        }
        return n
    },
    gi;
try {
    gi = uu("solid-start/server").useRequest
} catch (e) {
    gi = () => (console.warn("It seems you attempt to use cookieStorage on the server without having solid-start installed"), {
        request: {
            headers: {
                get: () => ""
            }
        }
    })
}
var _t = fu({
    _read: () => document.cookie,
    _write: (e, n, t) => {
        document.cookie = "".concat(e, "=").concat(n).concat(du(t))
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

function pu(e, n = {}) {
    const t = n.storage || globalThis.localStorage;
    if (!t) return e;
    const r = n.name || "storage-".concat(fs()),
        i = n.serialize || JSON.stringify.bind(JSON),
        s = n.deserialize || JSON.parse.bind(JSON),
        l = t.getItem(r, n.storageOptions),
        u = typeof e[0] == "function" ? f => e[1](() => s(f)) : f => e[1](El(s(f)));
    let c = !0;
    return l instanceof Promise ? l.then(f => c && f && u(f)) : l && u(l), [e[0], typeof e[0] == "function" ? f => {
        const p = e[1](f);
        return f != null ? t.setItem(r, i(p), n.storageOptions) : t.removeItem(r), c = !1, p
    } : (...f) => {
        e[1](...f), t.setItem(r, i(fe(() => e[0])), n.storageOptions), c = !1
    }]
}
const gu = [{
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
    vu = gu,
    hu = Yt(vu),
    gn = () => hu().map(n => mt(be({}, n), {
        postDate: rc(n.postDate).subtract(2, "day").format("YYYY-MM-DD")
    })),
    mu = dr("skip-data-usage-warning"),
    _u = {
        isInstructionsModalViewed: !1,
        isDataUsageWarningDialogAccepted: mu === "true"
    },
    [ft, xn] = pu(Wt(_u), {
        name: "notifications-manager-data"
    }),
    yu = () => ft.isInstructionsModalViewed !== !0,
    bu = () => {
        xn("isInstructionsModalViewed", !0)
    },
    wu = () => ft.isDataUsageWarningDialogAccepted === !0,
    Au = () => {
        xn("isDataUsageWarningDialogAccepted", !0)
    },
    xu = () => {
        const e = ln();
        return e ? ft.lastPlayedAnsweringMachineTrackDate ? Ds(e.postDate, ft.lastPlayedAnsweringMachineTrackDate) : !0 : !1
    },
    Su = () => {
        const e = ln();
        e && xn("lastPlayedAnsweringMachineTrackDate", e.postDate)
    },
    Tu = () => {
        const e = gn()[0];
        return e ? ft.lastPlayedArchiveDate ? Ds(e.postDate, ft.lastPlayedArchiveDate) : !0 : !1
    },
    ku = e => {
        ft.lastPlayedArchiveDate && ic(e, ft.lastPlayedArchiveDate) || xn("lastPlayedArchiveDate", e)
    },
    $u = () => {
        const e = gn()[0];
        e && xn("lastPlayedArchiveDate", e.postDate)
    },
    Ye = {
        instructionsModal: {
            isVisible: yu,
            setViewed: bu
        },
        dataUsageWarningDialog: {
            accepted: wu,
            setAccepted: Au
        },
        answeringMachineTrack: {
            hasNew: xu,
            setLastPlayed: Su
        },
        archive: {
            hasNew: Tu,
            setLastPlayed: ku,
            dismissNotification: $u
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
var Es = to.exports,
    Cs = [];
for (var Hn = 0; Hn < 256; ++Hn) Cs[Hn] = (Hn + 256).toString(16).substr(1);

function Iu(e, n) {
    var t = n || 0,
        r = Cs;
    return [r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]]].join("")
}
var Ms = Iu,
    Pu = Es,
    Ou = Ms,
    _i, Or, Dr = 0,
    Er = 0;

function Du(e, n, t) {
    var r = n && t || 0,
        i = n || [];
    e = e || {};
    var s = e.node || _i,
        l = e.clockseq !== void 0 ? e.clockseq : Or;
    if (s == null || l == null) {
        var u = Pu();
        s == null && (s = _i = [u[0] | 1, u[1], u[2], u[3], u[4], u[5]]), l == null && (l = Or = (u[6] << 8 | u[7]) & 16383)
    }
    var c = e.msecs !== void 0 ? e.msecs : new Date().getTime(),
        f = e.nsecs !== void 0 ? e.nsecs : Er + 1,
        p = c - Dr + (f - Er) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383), (p < 0 || c > Dr) && e.nsecs === void 0 && (f = 0), f >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    Dr = c, Er = f, Or = l, c += 122192928e5;
    var o = ((c & 268435455) * 1e4 + f) % 4294967296;
    i[r++] = o >>> 24 & 255, i[r++] = o >>> 16 & 255, i[r++] = o >>> 8 & 255, i[r++] = o & 255;
    var a = c / 4294967296 * 1e4 & 268435455;
    i[r++] = a >>> 8 & 255, i[r++] = a & 255, i[r++] = a >>> 24 & 15 | 16, i[r++] = a >>> 16 & 255, i[r++] = l >>> 8 | 128, i[r++] = l & 255;
    for (var d = 0; d < 6; ++d) i[r + d] = s[d];
    return n || Ou(i)
}
var Eu = Du,
    Cu = Es,
    Mu = Ms;

function ju(e, n, t) {
    var r = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var i = e.random || (e.rng || Cu)();
    if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, n)
        for (var s = 0; s < 16; ++s) n[r + s] = i[s];
    return n || Mu(i)
}
var Bu = ju,
    Lu = Eu,
    js = Bu,
    ho = js;
ho.v1 = Lu;
ho.v4 = js;
var Ru = ho;
/*!
 * Core functionality for Snowplow JavaScript trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var Vu = "3.16.0";

function Nu(e) {
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
    return Uu(t)
}

function zu(e) {
    if (!e) return e;
    var n = Hu(e);
    return n.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}
var at = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function Hu(e) {
    var n, t, r, i, s, l, u, c, f = 0,
        p = 0,
        o = [];
    if (!e) return e;
    e = unescape(encodeURIComponent(e));
    do n = e.charCodeAt(f++), t = e.charCodeAt(f++), r = e.charCodeAt(f++), c = n << 16 | t << 8 | r, i = c >> 18 & 63, s = c >> 12 & 63, l = c >> 6 & 63, u = c & 63, o[p++] = at.charAt(i) + at.charAt(s) + at.charAt(l) + at.charAt(u); while (f < e.length);
    var a = o.join(""),
        d = e.length % 3;
    return (d ? a.slice(0, d - 3) : a) + "===".slice(d || 3)
}

function Uu(e) {
    var n = function(v) {
            return decodeURIComponent(v.split("").map(function(g) {
                return "%" + ("00" + g.charCodeAt(0).toString(16)).slice(-2)
            }).join(""))
        },
        t, r, i, s, l, u, c, f, p = 0,
        o = 0,
        a = "",
        d = [];
    if (!e) return e;
    e += "";
    do s = at.indexOf(e.charAt(p++)), l = at.indexOf(e.charAt(p++)), u = at.indexOf(e.charAt(p++)), c = at.indexOf(e.charAt(p++)), f = s << 18 | l << 12 | u << 6 | c, t = f >> 16 & 255, r = f >> 8 & 255, i = f & 255, u === 64 ? d[o++] = String.fromCharCode(t) : c === 64 ? d[o++] = String.fromCharCode(t, r) : d[o++] = String.fromCharCode(t, r, i); while (p < e.length);
    return a = d.join(""), n(a.replace(/\0+$/, ""))
}

function mo() {
    var e = {},
        n = [],
        t = [],
        r = [],
        i, s = function(f, p) {
            p != null && p !== "" && (e[f] = p)
        },
        l = function(f) {
            for (var p in f) Object.prototype.hasOwnProperty.call(f, p) && s(p, f[p])
        },
        u = function(f, p, o) {
            if (o && Bs(o)) {
                var a = {
                    keyIfEncoded: f,
                    keyIfNotEncoded: p,
                    json: o
                };
                t.push(a), n.push(a)
            }
        },
        c = function(f) {
            r.push(f)
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
        withJsonProcessor: function(f) {
            i = f
        },
        build: function() {
            return i == null || i(this, t, r), e
        }
    }
}

function Fu(e) {
    return function(n, t, r) {
        for (var i = function(a, d, v) {
                var g = JSON.stringify(a);
                e ? n.add(d, zu(g)) : n.add(v, g)
            }, s = function() {
                var a = n.getPayload();
                if (e ? a.cx : a.co) return JSON.parse(e ? Nu(a.cx) : a.co)
            }, l = function(a, d) {
                var v = a || s();
                return v ? v.data = v.data.concat(d.data) : v = d, v
            }, u = void 0, c = 0, f = t; c < f.length; c++) {
            var p = f[c];
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

function Bs(e) {
    if (!Ls(e)) return !1;
    for (var n in e)
        if (Object.prototype.hasOwnProperty.call(e, n)) return !0;
    return !1
}

function Ls(e) {
    return typeof e < "u" && e !== null && (e.constructor === {}.constructor || e.constructor === [].constructor)
}
var Un = "Snowplow: ",
    He;
(function(e) {
    e[e.none = 0] = "none", e[e.error = 1] = "error", e[e.warn = 2] = "warn", e[e.debug = 3] = "debug", e[e.info = 4] = "info"
})(He || (He = {}));
var Ne = Gu();

function Gu(e) {
    e === void 0 && (e = He.warn);

    function n(l) {
        He[l] ? e = l : e = He.warn
    }

    function t(l, u) {
        for (var c = [], f = 2; f < arguments.length; f++) c[f - 2] = arguments[f];
        if (e >= He.error && typeof console < "u") {
            var p = Un + l + "\n";
            u ? console.error.apply(console, rt([p + "\n", u], c, !1)) : console.error.apply(console, rt([p], c, !1))
        }
    }

    function r(l, u) {
        for (var c = [], f = 2; f < arguments.length; f++) c[f - 2] = arguments[f];
        if (e >= He.warn && typeof console < "u") {
            var p = Un + l;
            u ? console.warn.apply(console, rt([p + "\n", u], c, !1)) : console.warn.apply(console, rt([p], c, !1))
        }
    }

    function i(l) {
        for (var u = [], c = 1; c < arguments.length; c++) u[c - 1] = arguments[c];
        e >= He.debug && typeof console < "u" && console.debug.apply(console, rt([Un + l], u, !1))
    }

    function s(l) {
        for (var u = [], c = 1; c < arguments.length; c++) u[c - 1] = arguments[c];
        e >= He.info && typeof console < "u" && console.info.apply(console, rt([Un + l], u, !1))
    }
    return {
        setLogLevel: n,
        warn: r,
        error: t,
        debug: i,
        info: s
    }
}

function Zu() {
    var e = [],
        n = [],
        t = function(r) {
            var i = ef(r),
                s = tf(r),
                l = [],
                u = ro(e, r, s, i);
            l.push.apply(l, u);
            var c = sf(n, r, s, i);
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
                bi(c) ? i.push(c) : Ht(c) && s.push(c)
            }
            e = e.concat(s), n = n.concat(i)
        },
        clearGlobalContexts: function() {
            n = [], e = []
        },
        removeGlobalContexts: function(r) {
            for (var i = function(c) {
                    bi(c) ? n = n.filter(function(f) {
                        return JSON.stringify(f) !== JSON.stringify(c)
                    }) : Ht(c) && (e = e.filter(function(f) {
                        return JSON.stringify(f) !== JSON.stringify(c)
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

function Wu(e) {
    return {
        addPluginContexts: function(n) {
            var t = n ? rt([], n, !0) : [];
            return e.forEach(function(r) {
                try {
                    r.contexts && t.push.apply(t, r.contexts())
                } catch (i) {
                    Ne.error("Error adding plugin contexts", i)
                }
            }), t
        }
    }
}

function Yu(e) {
    var n = new RegExp("^iglu:([a-zA-Z0-9-_.]+)/([a-zA-Z0-9-_]+)/jsonschema/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$"),
        t = n.exec(e);
    if (t !== null) return t.slice(1, 6)
}

function qu(e) {
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

function Rs(e) {
    var n = e.split(".");
    return n && n.length > 1 ? qu(n) : !1
}

function Vs(e) {
    var n = new RegExp("^iglu:((?:(?:[a-zA-Z0-9-_]+|\\*).)+(?:[a-zA-Z0-9-_]+|\\*))/([a-zA-Z0-9-_.]+|\\*)/jsonschema/([1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)$"),
        t = n.exec(e);
    if (t !== null && Rs(t[1])) return t.slice(1, 6)
}

function no(e) {
    var n = Vs(e);
    if (n) {
        var t = n[0];
        return n.length === 5 && Rs(t)
    }
    return !1
}

function Ku(e) {
    return Array.isArray(e) && e.every(function(n) {
        return typeof n == "string"
    })
}

function yi(e) {
    return Ku(e) ? e.every(function(n) {
        return no(n)
    }) : typeof e == "string" ? no(e) : !1
}

function vn(e) {
    var n = e;
    return Bs(n) && "schema" in n && "data" in n ? typeof n.schema == "string" && typeof n.data == "object" : !1
}

function Qu(e) {
    var n = e,
        t = 0;
    if (e != null && typeof e == "object" && !Array.isArray(e)) {
        if (Object.prototype.hasOwnProperty.call(n, "accept"))
            if (yi(n.accept)) t += 1;
            else return !1;
        if (Object.prototype.hasOwnProperty.call(n, "reject"))
            if (yi(n.reject)) t += 1;
            else return !1;
        return t > 0 && t <= 2
    }
    return !1
}

function ar(e) {
    return typeof e == "function" && e.length <= 1
}

function Ht(e) {
    return ar(e) || vn(e)
}

function Ns(e) {
    return Array.isArray(e) && e.length === 2 ? Array.isArray(e[1]) ? ar(e[0]) && e[1].every(Ht) : ar(e[0]) && Ht(e[1]) : !1
}

function zs(e) {
    return Array.isArray(e) && e.length === 2 && Qu(e[0]) ? Array.isArray(e[1]) ? e[1].every(Ht) : Ht(e[1]) : !1
}

function bi(e) {
    return Ns(e) || zs(e)
}

function Ju(e, n) {
    var t = 0,
        r = 0,
        i = e.accept;
    Array.isArray(i) ? e.accept.some(function(l) {
        return Fn(l, n)
    }) && r++ : typeof i == "string" && Fn(i, n) && r++;
    var s = e.reject;
    return Array.isArray(s) ? e.reject.some(function(l) {
        return Fn(l, n)
    }) && t++ : typeof s == "string" && Fn(s, n) && t++, r > 0 && t === 0 ? !0 : (r === 0 && t > 0, !1)
}

function Fn(e, n) {
    if (!no(e)) return !1;
    var t = Vs(e),
        r = Yu(n);
    if (t && r) {
        if (!Xu(t[0], r[0])) return !1;
        for (var i = 1; i < 5; i++)
            if (!Hs(t[i], r[i])) return !1;
        return !0
    }
    return !1
}

function Xu(e, n) {
    var t = n.split("."),
        r = e.split(".");
    if (t && r) {
        if (t.length !== r.length) return !1;
        for (var i = 0; i < r.length; i++)
            if (!Hs(t[i], r[i])) return !1;
        return !0
    }
    return !1
}

function Hs(e, n) {
    return e && n && e === "*" || e === n
}

function ef(e) {
    for (var n = e.getJson(), t = 0, r = n; t < r.length; t++) {
        var i = r[t];
        if (i.keyIfEncoded === "ue_px" && typeof i.json.data == "object") {
            var s = i.json.data.schema;
            if (typeof s == "string") return s
        }
    }
    return ""
}

function tf(e) {
    var n = e.getPayload().e;
    return typeof n == "string" ? n : ""
}

function nf(e, n, t, r) {
    var i = void 0;
    try {
        var s = {
            event: n.getPayload(),
            eventType: t,
            eventSchema: r
        };
        return i = e(s), Array.isArray(i) && i.every(vn) || vn(i) ? i : void 0
    } catch (l) {
        i = void 0
    }
    return i
}

function Us(e) {
    return Array.isArray(e) ? e : Array.of(e)
}

function ro(e, n, t, r) {
    var i, s = Us(e),
        l = function(c) {
            var f = rf(c, n, t, r);
            if (f && f.length !== 0) return f
        },
        u = s.map(l);
    return (i = []).concat.apply(i, u.filter(function(c) {
        return c != null && c.filter(Boolean)
    }))
}

function rf(e, n, t, r) {
    if (vn(e)) return [e];
    if (ar(e)) {
        var i = nf(e, n, t, r);
        if (vn(i)) return [i];
        if (Array.isArray(i)) return i
    }
}

function of(e, n, t, r) {
    if (Ns(e)) {
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
        if (s === !0) return ro(e[1], n, t, r)
    } else if (zs(e) && Ju(e[0], r)) return ro(e[1], n, t, r);
    return []
}

function sf(e, n, t, r) {
    var i, s = Us(e),
        l = function(c) {
            var f = of(c, n, t, r);
            if (f && f.length !== 0) return f
        },
        u = s.map(l);
    return (i = []).concat.apply(i, u.filter(function(c) {
        return c != null && c.filter(Boolean)
    }))
}

function af(e) {
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

function lf(e) {
    e === void 0 && (e = {});

    function n(c, f, p) {
        var o = Wu(f),
            a = Zu(),
            d = c,
            v = {};

        function g(b) {
            if (b && b.length) return {
                schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                data: b
            }
        }

        function m(b, P) {
            var H = a.getApplicableContexts(b),
                Y = [];
            return P && P.length && Y.push.apply(Y, P), H && H.length && Y.push.apply(Y, H), Y
        }

        function h(b, P, H) {
            b.withJsonProcessor(Fu(d)), b.add("eid", Ru.v4()), b.addDict(v);
            var Y = af(H);
            b.add(Y.type, Y.value.toString());
            var B = m(b, o.addPluginContexts(P)),
                j = g(B);
            j !== void 0 && b.addJson("cx", "co", j), f.forEach(function(L) {
                try {
                    L.beforeTrack && L.beforeTrack(b)
                } catch (J) {
                    Ne.error("Plugin beforeTrack", J)
                }
            }), typeof p == "function" && p(b);
            var N = b.build();
            return f.forEach(function(L) {
                try {
                    L.afterTrack && L.afterTrack(N)
                } catch (J) {
                    Ne.error("Plugin afterTrack", J)
                }
            }), N
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
                v = Ls(b) ? b : {}
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
                var f, p, o = c.plugin;
                s.push(o), (f = o.logger) === null || f === void 0 || f.call(o, Ne), (p = o.activateCorePlugin) === null || p === void 0 || p.call(o, u)
            }
        });
    return s == null || s.forEach(function(c) {
        var f, p;
        (f = c.logger) === null || f === void 0 || f.call(c, Ne), (p = c.activateCorePlugin) === null || p === void 0 || p.call(c, u)
    }), u
}

function cf(e) {
    var n = e.event,
        t = n.schema,
        r = n.data,
        i = mo(),
        s = {
            schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
            data: {
                schema: t,
                data: r
            }
        };
    return i.add("e", "ue"), i.addJson("ue_px", "ue_pr", s), i
}

function uf(e) {
    var n = e.pageUrl,
        t = e.pageTitle,
        r = e.referrer,
        i = mo();
    return i.add("e", "pv"), i.add("url", n), i.add("page", t), i.add("refr", r), i
}

function ff(e) {
    var n = e.pageUrl,
        t = e.pageTitle,
        r = e.referrer,
        i = e.minXOffset,
        s = e.maxXOffset,
        l = e.minYOffset,
        u = e.maxYOffset,
        c = mo();
    return c.add("e", "pp"), c.add("url", n), c.add("page", t), c.add("refr", r), i && !isNaN(Number(i)) && c.add("pp_mix", i.toString()), s && !isNaN(Number(s)) && c.add("pp_max", s.toString()), l && !isNaN(Number(l)) && c.add("pp_miy", l.toString()), u && !isNaN(Number(u)) && c.add("pp_may", u.toString()), c
}
var df = Vu,
    Fs = {
        exports: {}
    },
    Gs = {
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
    Gs.exports = n
})();
var pf = Gs.exports,
    oo = {
        utf8: {
            stringToBytes: function(e) {
                return oo.bin.stringToBytes(unescape(encodeURIComponent(e)))
            },
            bytesToString: function(e) {
                return decodeURIComponent(escape(oo.bin.bytesToString(e)))
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
    wi = oo;
(function() {
    var e = pf,
        n = wi.utf8,
        t = wi.bin,
        r = function(s) {
            s.constructor == String ? s = n.stringToBytes(s) : typeof Buffer < "u" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(s) ? s = Array.prototype.slice.call(s, 0) : Array.isArray(s) || (s = s.toString());
            var l = e.bytesToWords(s),
                u = s.length * 8,
                c = [],
                f = 1732584193,
                p = -271733879,
                o = -1732584194,
                a = 271733878,
                d = -1009589776;
            l[u >> 5] |= 128 << 24 - u % 32, l[(u + 64 >>> 9 << 4) + 15] = u;
            for (var v = 0; v < l.length; v += 16) {
                for (var g = f, m = p, h = o, y = a, w = d, b = 0; b < 80; b++) {
                    if (b < 16) c[b] = l[v + b];
                    else {
                        var P = c[b - 3] ^ c[b - 8] ^ c[b - 14] ^ c[b - 16];
                        c[b] = P << 1 | P >>> 31
                    }
                    var H = (f << 5 | f >>> 27) + d + (c[b] >>> 0) + (b < 20 ? (p & o | ~p & a) + 1518500249 : b < 40 ? (p ^ o ^ a) + 1859775393 : b < 60 ? (p & o | p & a | o & a) - 1894007588 : (p ^ o ^ a) - 899497514);
                    d = a, a = o, o = p << 30 | p >>> 2, p = f, f = H
                }
                f += g, p += m, o += h, a += y, d += w
            }
            return [f, p, o, a, d]
        },
        i = function(s, l) {
            var u = e.wordsToBytes(r(s));
            return l && l.asBytes ? u : l && l.asString ? t.bytesToString(u) : e.bytesToHex(u)
        };
    i._blocksize = 16, i._digestsize = 20, Fs.exports = i
})();
var gf = Fs.exports;
const vf = An(gf);
var io = {
        exports: {}
    },
    Ai = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (Ai) {
    var xi = new Uint8Array(16);
    io.exports = function() {
        return Ai(xi), xi
    }
} else {
    var Si = new Array(16);
    io.exports = function() {
        for (var n = 0, t; n < 16; n++) n & 3 || (t = Math.random() * 4294967296), Si[n] = t >>> ((n & 3) << 3) & 255;
        return Si
    }
}
var Zs = io.exports,
    Ws = [];
for (var Gn = 0; Gn < 256; ++Gn) Ws[Gn] = (Gn + 256).toString(16).substr(1);

function hf(e, n) {
    var t = n || 0,
        r = Ws;
    return [r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]]].join("")
}
var Ys = hf,
    mf = Zs,
    _f = Ys,
    Ti, Cr, Mr = 0,
    jr = 0;

function yf(e, n, t) {
    var r = n && t || 0,
        i = n || [];
    e = e || {};
    var s = e.node || Ti,
        l = e.clockseq !== void 0 ? e.clockseq : Cr;
    if (s == null || l == null) {
        var u = mf();
        s == null && (s = Ti = [u[0] | 1, u[1], u[2], u[3], u[4], u[5]]), l == null && (l = Cr = (u[6] << 8 | u[7]) & 16383)
    }
    var c = e.msecs !== void 0 ? e.msecs : new Date().getTime(),
        f = e.nsecs !== void 0 ? e.nsecs : jr + 1,
        p = c - Mr + (f - jr) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383), (p < 0 || c > Mr) && e.nsecs === void 0 && (f = 0), f >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    Mr = c, jr = f, Cr = l, c += 122192928e5;
    var o = ((c & 268435455) * 1e4 + f) % 4294967296;
    i[r++] = o >>> 24 & 255, i[r++] = o >>> 16 & 255, i[r++] = o >>> 8 & 255, i[r++] = o & 255;
    var a = c / 4294967296 * 1e4 & 268435455;
    i[r++] = a >>> 8 & 255, i[r++] = a & 255, i[r++] = a >>> 24 & 15 | 16, i[r++] = a >>> 16 & 255, i[r++] = l >>> 8 | 128, i[r++] = l & 255;
    for (var d = 0; d < 6; ++d) i[r + d] = s[d];
    return n || _f(i)
}
var bf = yf,
    wf = Zs,
    Af = Ys;

function xf(e, n, t) {
    var r = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var i = e.random || (e.rng || wf)();
    if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, n)
        for (var s = 0; s < 16; ++s) n[r + s] = i[s];
    return n || Af(i)
}
var Sf = xf,
    Tf = bf,
    qs = Sf,
    _o = qs;
_o.v1 = Tf;
_o.v4 = qs;
var ot = _o;
/*!
 * Core functionality for Snowplow Browser trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function kf(e) {
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

function Xn(e, n, t) {
    t === void 0 && (t = 63072e3);
    try {
        var r = window.localStorage,
            i = Date.now() + t * 1e3;
        return r.setItem("".concat(e, ".expires"), i.toString()), r.setItem(e, n), !0
    } catch (s) {
        return !1
    }
}

function ki(e) {
    try {
        var n = window.localStorage;
        return n.removeItem(e), n.removeItem(e + ".expires"), !0
    } catch (t) {
        return !1
    }
}

function $i(e) {
    try {
        return window.sessionStorage.getItem(e)
    } catch (n) {
        return
    }
}

function $f(e, n) {
    try {
        return window.sessionStorage.setItem(e, n), !0
    } catch (t) {
        return !1
    }
}

function Ks(e) {
    return !!(e && typeof e.valueOf() == "string")
}

function Ii(e) {
    return Number.isInteger && Number.isInteger(e) || typeof e == "number" && isFinite(e) && Math.floor(e) === e
}

function Pi(e) {
    if (!Ks(e)) {
        e = e.text || "";
        var n = document.getElementsByTagName("title");
        n && n[0] != null && (e = n[0].text)
    }
    return e
}

function so(e) {
    var n = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"),
        t = n.exec(e);
    return t ? t[1] : e
}

function Oi(e) {
    var n = e.length;
    return e.charAt(--n) === "." && (e = e.slice(0, n)), e.slice(0, 2) === "*." && (e = e.slice(1)), e
}

function Br(e) {
    var n = window,
        t = hn("referrer", n.location.href) || hn("referer", n.location.href);
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

function hn(e, n) {
    var t = new RegExp("^[^#]*[?&]" + e + "=([^&#]*)").exec(n);
    return t ? decodeURIComponent(t[1].replace(/\+/g, " ")) : null
}

function If(e, n, t) {
    var r = n + "=" + t,
        i = e.split("#"),
        s = i[0].split("?"),
        l = s.shift(),
        u = s.join("?");
    if (!u) u = r;
    else {
        for (var c = !0, f = u.split("&"), p = 0; p < f.length; p++)
            if (f[p].substr(0, n.length + 1) === n + "=") {
                c = !1, f[p] = r, u = f.join("&");
                break
            } c && (u = r + "&" + u)
    }
    return i[0] = l + "?" + u, i.join("#")
}

function Pf(e, n) {
    for (var t = window.location.hostname, r = "_sp_root_domain_test_", i = r + new Date().getTime(), s = "_test_value_" + new Date().getTime(), l = t.split("."), u = l.length - 2; u >= 0; u--) {
        var c = l.slice(u).join(".");
        if (yt(i, s, 0, "/", c, e, n), yt(i) === s) {
            lr(i, c, e, n);
            for (var f = Of(r), p = 0; p < f.length; p++) lr(f[p], c, e, n);
            return c
        }
    }
    return t
}

function lr(e, n, t, r) {
    yt(e, "", -1, "/", n, t, r)
}

function Of(e) {
    for (var n = document.cookie.split("; "), t = [], r = 0; r < n.length; r++) n[r].substring(0, e.length) === e && t.push(n[r]);
    return t
}

function yt(e, n, t, r, i, s, l) {
    return arguments.length > 1 ? document.cookie = e + "=" + encodeURIComponent(n != null ? n : "") + (t ? "; Expires=" + new Date(+new Date + t * 1e3).toUTCString() : "") + (r ? "; Path=" + r : "") + (i ? "; Domain=" + i : "") + (s ? "; SameSite=" + s : "") + (l ? "; Secure" : "") : decodeURIComponent((("; " + document.cookie).split("; " + e + "=")[1] || "").split(";")[0])
}

function Df() {
    try {
        return !!window.localStorage
    } catch (e) {
        return !0
    }
}

function Ef() {
    var e = "modernizr";
    if (!Df()) return !1;
    try {
        var n = window.localStorage;
        return n.setItem(e, e), n.removeItem(e), !0
    } catch (t) {
        return !1
    }
}
var Cf = "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0",
    Mf = "iglu:com.snowplowanalytics.snowplow/browser_context/jsonschema/1-0-0",
    jf = "iglu:com.snowplowanalytics.snowplow/client_session/jsonschema/1-0-2",
    Bf = "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4";

function Lf(e, n, t, r, i, s, l, u, c, f, p, o, a, d, v, g, m) {
    var h = !1,
        y, w = [],
        b = !1;
    r = typeof r == "string" ? r.toLowerCase() : r;
    var P = r === !0 || r === "beacon" || r === "true",
        H = !!(P && window.navigator && window.navigator.sendBeacon && !ye(window.navigator.userAgent)),
        Y = H && P,
        B = r === "get",
        j = !!(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
        N = !B && j && (r === "post" || P),
        L = N ? i : "/i",
        J = "snowplowOutQueue_".concat(e, "_").concat(N ? "post2" : "get");
    if (P && (a = {}), s = t && Ef() && N && s || 1, t) try {
        var de = window.localStorage.getItem(J);
        w = de ? JSON.parse(de) : []
    } catch (O) {}
    Array.isArray(w) || (w = []), n.outQueues.push(w), j && s > 1 && n.bufferFlushers.push(function(O) {
        h || $(O)
    });

    function M(O) {
        var z = "?",
            F = {
                co: !0,
                cx: !0
            },
            R = !0;
        for (var W in O) O.hasOwnProperty(W) && !F.hasOwnProperty(W) && (R ? R = !1 : z += "&", z += encodeURIComponent(W) + "=" + encodeURIComponent(O[W]));
        for (var q in F) O.hasOwnProperty(q) && F.hasOwnProperty(q) && (z += "&" + q + "=" + encodeURIComponent(O[q]));
        return z
    }

    function I(O) {
        var z = Object.keys(O).map(function(F) {
            return [F, O[F]]
        }).reduce(function(F, R) {
            var W = R[0],
                q = R[1];
            return F[W] = q.toString(), F
        }, {});
        return {
            evt: z,
            bytes: k(JSON.stringify(z))
        }
    }

    function k(O) {
        for (var z = 0, F = 0; F < O.length; F++) {
            var R = O.charCodeAt(F);
            R <= 127 ? z += 1 : R <= 2047 ? z += 2 : R >= 55296 && R <= 57343 ? (z += 4, F++) : R < 65535 ? z += 3 : z += 4
        }
        return z
    }
    var x = function(O) {
        return typeof O[0] == "object" && "evt" in O[0]
    };

    function A(O, z) {
        var F = G(z, !0, !1);
        F.send(K(X([O.evt])))
    }

    function E(O, z) {
        y = z + L;
        var F = function(Pe, Je) {
            return Ne.warn("Event (" + Pe + "B) too big, max is " + Je)
        };
        if (N) {
            var R = I(O);
            if (R.bytes >= l) {
                F(R.bytes, l), A(R, y);
                return
            } else w.push(R)
        } else {
            var W = M(O);
            if (u > 0) {
                var q = ne(W),
                    ve = k(q);
                if (ve >= u) {
                    if (F(ve, u), j) {
                        var R = I(O),
                            re = z + i;
                        A(R, re)
                    }
                    return
                }
            }
            w.push(W)
        }
        var Se = !1;
        t && (Se = Xn(J, JSON.stringify(w.slice(0, f)))), !h && (!Se || w.length >= s) && $()
    }

    function $(O) {
        for (O === void 0 && (O = !1); w.length && typeof w[0] != "string" && typeof w[0] != "object";) w.shift();
        if (!w.length) {
            h = !1;
            return
        }
        if (!Ks(y)) throw "No collector configured";
        if (h = !0, m && !b) {
            var z = G(m, !1, O);
            b = !0, z.timeout = p, z.onreadystatechange = function() {
                z.readyState === 4 && $()
            }, z.send();
            return
        }
        if (j) {
            var F = function(Te) {
                    for (var ze = 0, Tn = 0; ze < Te.length && (Tn += Te[ze].bytes, !(Tn >= l));) ze += 1;
                    return ze
                },
                R = void 0,
                W, q;
            x(w) ? (R = y, W = G(R, !0, O), q = F(w)) : (R = ne(w[0]), W = G(R, !1, O), q = 1);
            var ve = setTimeout(function() {
                    W.abort(), h = !1
                }, p),
                re = function(Te) {
                    for (var ze = 0; ze < Te; ze++) w.shift();
                    t && Xn(J, JSON.stringify(w.slice(0, f)))
                },
                Se = function(Te) {
                    re(Te), $()
                };
            if (W.onreadystatechange = function() {
                    W.readyState === 4 && W.status >= 200 && (clearTimeout(ve), W.status < 300 ? Se(q) : (U(W.status) || (Ne.error("Status ".concat(W.status, ", will not retry.")), re(q)), h = !1))
                }, !x(w)) W.send();
            else {
                var Pe = w.slice(0, q);
                if (Pe.length > 0) {
                    var Je = !1,
                        Ee = Pe.map(function(Te) {
                            return Te.evt
                        });
                    if (Y) {
                        var pt = new Blob([K(X(Ee))], {
                            type: "application/json"
                        });
                        try {
                            Je = navigator.sendBeacon(R, pt)
                        } catch (Te) {
                            Je = !1
                        }
                    }
                    Je === !0 ? Se(q) : W.send(K(X(Ee)))
                }
            }
        } else if (!o && !x(w)) {
            var Xe = new Image(1, 1),
                et = !0;
            Xe.onload = function() {
                et && (et = !1, w.shift(), t && Xn(J, JSON.stringify(w.slice(0, f))), $())
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

    function G(O, z, F) {
        var R = new XMLHttpRequest;
        z ? (R.open("POST", O, !F), R.setRequestHeader("Content-Type", "application/json; charset=UTF-8")) : R.open("GET", O, !F), R.withCredentials = d, o && R.setRequestHeader("SP-Anonymous", "*");
        for (var W in a) Object.prototype.hasOwnProperty.call(a, W) && R.setRequestHeader(W, a[W]);
        return R
    }

    function K(O) {
        return JSON.stringify({
            schema: Bf,
            data: O
        })
    }

    function X(O) {
        for (var z = new Date().getTime().toString(), F = 0; F < O.length; F++) O[F].stm = z;
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

    function ye(O) {
        return z(13, O) || F(10, 15, O) && R(O);

        function z(q, ve) {
            var re = ve.match("(iP.+; CPU .*OS (d+)[_d]*.*) AppleWebKit/");
            return re && re.length ? parseInt(re[0]) <= q : !1
        }

        function F(q, ve, re) {
            var Se = re.match("(Macintosh;.*Mac OS X (d+)_(d+)[_d]*.*) AppleWebKit/");
            return Se && Se.length ? parseInt(Se[0]) <= q || parseInt(Se[0]) === q && parseInt(Se[1]) <= ve : !1
        }

        function R(q) {
            return q.match("Version/.* Safari/") && !W(q)
        }

        function W(q) {
            return q.match("Chrom(e|ium)")
        }
    }
}

function Rf(e, n) {
    var t = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)"),
        r = t.exec(e);
    return r && (r == null ? void 0 : r.length) > 1 ? hn(n, r[1]) : null
}

function Di(e, n, t) {
    var r;
    return e === "translate.googleusercontent.com" ? (t === "" && (t = n), n = (r = Rf(n, "u")) !== null && r !== void 0 ? r : "", e = so(n)) : (e === "cc.bingj.com" || e === "webcache.googleusercontent.com") && (n = document.links[0].href, e = so(n)), [e, n, t]
}
var Qs = 0,
    bt = 1,
    Vf = 2,
    mn = 3,
    yo = 4,
    Js = 5,
    lt = 6,
    Bt = 7,
    wt = 8,
    At = 9,
    Ze = 10;

function Nf() {
    var e = ["1", "", 0, 0, 0, void 0, "", "", "", void 0, 0];
    return e
}

function zf(e, n, t, r) {
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
        f = [l[Qs], l[bt], u(l[Vf], s), u(l[mn], r), u(l[yo], s), c(l[Js]), l[lt], l[Bt], l[wt], c(l[At]), u(l[Ze], 0)];
    return f
}

function Hf(e, n) {
    var t;
    return e[bt] ? t = e[bt] : n ? (t = "", e[bt] = t) : (t = ot.v4(), e[bt] = t), t
}

function nn(e, n) {
    n === void 0 && (n = {
        memorizedVisitCount: 1
    });
    var t = n.memorizedVisitCount;
    ao(e) ? (e[Bt] = e[lt], e[Js] = e[yo], e[mn]++) : e[mn] = t;
    var r = ot.v4();
    return e[lt] = r, e[Ze] = 0, e[wt] = "", e[At] = void 0, r
}

function Lr(e) {
    e[yo] = Math.round(new Date().getTime() / 1e3)
}

function Uf(e, n) {
    if (e[Ze] === 0) {
        var t = n.build();
        e[wt] = t.eid;
        var r = t.dtm || t.ttm;
        e[At] = r ? parseInt(r) : void 0
    }
}

function Ff(e) {
    e[Ze] += 1
}

function Gf(e) {
    return e.shift(), e.join(".")
}

function Ei(e, n, t) {
    var r = e[At],
        i = {
            userId: t ? "00000000-0000-0000-0000-000000000000" : e[bt],
            sessionId: e[lt],
            eventIndex: e[Ze],
            sessionIndex: e[mn],
            previousSessionId: t ? null : e[Bt] || null,
            storageMechanism: n == "localStorage" ? "LOCAL_STORAGE" : "COOKIE_1",
            firstEventId: e[wt] || null,
            firstEventTimestamp: r ? new Date(r).toISOString() : null
        };
    return i
}

function Rr(e) {
    return e[lt]
}

function Zf(e) {
    return e[bt]
}

function Vr(e) {
    return e[mn]
}

function ao(e) {
    return e[Qs] === "0"
}

function Wf(e) {
    return e[Ze]
}
var _n = "x";

function Nr() {
    return {
        viewport: zr(Yf()),
        documentSize: zr(qf()),
        resolution: zr(Kf()),
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

function Yf() {
    var e, n;
    if ("innerWidth" in window) e = window.innerWidth, n = window.innerHeight;
    else {
        var t = document.documentElement || document.body;
        e = t.clientWidth, n = t.clientHeight
    }
    return e >= 0 && n >= 0 ? e + _n + n : null
}

function qf() {
    var e = document.documentElement,
        n = document.body,
        t = n ? Math.max(n.offsetHeight, n.scrollHeight) : 0,
        r = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth),
        i = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, t);
    return isNaN(r) || isNaN(i) ? "" : r + _n + i
}

function Kf() {
    return screen.width + _n + screen.height
}

function zr(e) {
    return e && e.split(_n).map(function(n) {
        return Math.floor(Number(n))
    }).join(_n)
}

function Qf(e, n, t, r, i, s) {
    s === void 0 && (s = {});
    var l = [],
        u = function(p, o, a, d, v, g) {
            var m, h, y, w, b, P, H, Y, B, j, N, L, J, de, M, I, k, x, A, E, $, U, G, K, X, ne, ye, O;
            g.eventMethod = (m = g.eventMethod) !== null && m !== void 0 ? m : "post";
            var z = function(_) {
                    var T;
                    return (T = _.stateStorageStrategy) !== null && T !== void 0 ? T : "cookieAndLocalStorage"
                },
                F = function(_) {
                    var T, D;
                    return typeof _.anonymousTracking == "boolean" ? !1 : (D = ((T = _.anonymousTracking) === null || T === void 0 ? void 0 : T.withSessionTracking) === !0) !== null && D !== void 0 ? D : !1
                },
                R = function(_) {
                    var T, D;
                    return typeof _.anonymousTracking == "boolean" ? !1 : (D = ((T = _.anonymousTracking) === null || T === void 0 ? void 0 : T.withServerAnonymisation) === !0) !== null && D !== void 0 ? D : !1
                },
                W = function(_) {
                    return !!_.anonymousTracking
                },
                q = (y = (h = g == null ? void 0 : g.contexts) === null || h === void 0 ? void 0 : h.browser) !== null && y !== void 0 ? y : !1,
                ve = (b = (w = g == null ? void 0 : g.contexts) === null || w === void 0 ? void 0 : w.webPage) !== null && b !== void 0 ? b : !0;
            l.push(Ma()), ve && l.push(Ea()), q && l.push(Ca()), l.push.apply(l, (P = g.plugins) !== null && P !== void 0 ? P : []);
            var re = lf({
                    base64: g.encodeBase64,
                    corePlugins: l,
                    callback: Pa
                }),
                Se = document.characterSet || document.charset,
                Pe = Di(window.location.hostname, window.location.href, Br()),
                Je = Oi(Pe[0]),
                Ee = Pe[1],
                pt = Pe[2],
                Xe, et = (H = g.platform) !== null && H !== void 0 ? H : "web",
                Te = Fo(d),
                ze = (Y = g.postPath) !== null && Y !== void 0 ? Y : "/com.snowplowanalytics.snowplow/tp2",
                Tn = (B = g.appId) !== null && B !== void 0 ? B : "",
                kn, $t = document.title,
                Kt, wa = (j = g.resetActivityTrackingOnPageView) !== null && j !== void 0 ? j : !0,
                To, ko, Aa = (N = g.cookieName) !== null && N !== void 0 ? N : "_sp_",
                Qt = (L = g.cookieDomain) !== null && L !== void 0 ? L : void 0,
                gr = "/",
                $n = (J = g.cookieSameSite) !== null && J !== void 0 ? J : "None",
                In = (de = g.cookieSecure) !== null && de !== void 0 ? de : !0,
                $o = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack,
                Io = typeof g.respectDoNotTrack < "u" ? g.respectDoNotTrack && ($o === "yes" || $o === "1") : !1,
                vr, Po = (M = g.cookieLifetime) !== null && M !== void 0 ? M : 63072e3,
                Oo = (I = g.sessionCookieTimeout) !== null && I !== void 0 ? I : 1800,
                It = F(g),
                hr = R(g),
                Re = W(g),
                ae = z(g),
                Pn, mr = new Date().getTime(),
                On, Dn, En, Cn, Do, Mn, Ce, Me = 1,
                gt, tt = Lf(p, v, ae == "localStorage" || ae == "cookieAndLocalStorage", g.eventMethod, ze, (k = g.bufferSize) !== null && k !== void 0 ? k : 1, (x = g.maxPostBytes) !== null && x !== void 0 ? x : 4e4, (A = g.maxGetBytes) !== null && A !== void 0 ? A : 0, (E = g.useStm) !== null && E !== void 0 ? E : !0, ($ = g.maxLocalStorageQueueSize) !== null && $ !== void 0 ? $ : 1e3, (U = g.connectionTimeout) !== null && U !== void 0 ? U : 5e3, hr, (G = g.customHeaders) !== null && G !== void 0 ? G : {}, (K = g.withCredentials) !== null && K !== void 0 ? K : !0, (X = g.retryStatusCodes) !== null && X !== void 0 ? X : [], ((ne = g.dontRetryStatusCodes) !== null && ne !== void 0 ? ne : []).concat([400, 401, 403, 410, 422]), g.idService),
                Eo = !1,
                Co = !1,
                Ae = {
                    enabled: !1,
                    installed: !1,
                    configurations: {}
                },
                xa = (O = (ye = g.contexts) === null || ye === void 0 ? void 0 : ye.session) !== null && O !== void 0 ? O : !1,
                jn, Bn = g.onSessionUpdateCallback,
                _r = !1;
            g.hasOwnProperty("discoverRootDomain") && g.discoverRootDomain && (Qt = Pf($n, In));
            var Ln = Nr(),
                Sa = Ln.browserLanguage,
                Ta = Ln.resolution,
                ka = Ln.colorDepth,
                $a = Ln.cookiesEnabled;
            re.setTrackerVersion(a), re.setTrackerNamespace(o), re.setAppId(Tn), re.setPlatform(et), re.addPayloadPair("cookie", $a ? "1" : "0"), re.addPayloadPair("cs", Se), re.addPayloadPair("lang", Sa), re.addPayloadPair("res", Ta), re.addPayloadPair("cd", ka), Lo(), Uo(), g.crossDomainLinker && jo(g.crossDomainLinker);

            function vt() {
                Pe = Di(window.location.hostname, window.location.href, Br()), Pe[1] !== Ee && (pt = Br(Ee)), Je = Oi(Pe[0]), Ee = Pe[1]
            }

            function Mo(_) {
                var T = new Date().getTime(),
                    D = _.currentTarget;
                D != null && D.href && (D.href = If(D.href, "_sp", Mn + "." + T))
            }

            function jo(_) {
                for (var T = 0; T < document.links.length; T++) {
                    var D = document.links[T];
                    !D.spDecorationEnabled && _(D) && (it(D, "click", Mo, !0), it(D, "mousedown", Mo, !0), D.spDecorationEnabled = !0)
                }
            }

            function ht(_) {
                var T;
                return To && (T = new RegExp("#.*"), _ = _.replace(T, "")), ko && (T = new RegExp("[{}]", "g"), _ = _.replace(T, "")), _
            }

            function Bo(_) {
                var T = new RegExp("^([a-z]+):"),
                    D = T.exec(_);
                return D ? D[1] : null
            }

            function Ia(_, T) {
                var D = Bo(T),
                    he;
                return D ? T : T.slice(0, 1) === "/" ? Bo(_) + "://" + so(_) + T : (_ = ht(_), (he = _.indexOf("?")) >= 0 && (_ = _.slice(0, he)), (he = _.lastIndexOf("/")) !== _.length - 1 && (_ = _.slice(0, he + 1)), _ + T)
            }

            function Pa(_) {
                Io || jn || tt.enqueueRequest(_.build(), Te)
            }

            function Pt(_) {
                return Aa + _ + "." + Do
            }

            function yr(_) {
                var T = Pt(_);
                if (ae == "localStorage") return kf(T);
                if (ae == "cookie" || ae == "cookieAndLocalStorage") return yt(T)
            }

            function Lo() {
                vt(), Do = vf((Qt || Je) + (gr || "/")).slice(0, 4)
            }

            function Jt() {
                var _ = new Date;
                Pn = _.getTime()
            }

            function Oa() {
                Da(), Jt()
            }

            function Ro() {
                var _ = document.documentElement;
                return _ ? [_.scrollLeft || window.pageXOffset, _.scrollTop || window.pageYOffset] : [0, 0]
            }

            function Vo() {
                var _ = Ro(),
                    T = _[0];
                On = T, Dn = T;
                var D = _[1];
                En = D, Cn = D
            }

            function Da() {
                var _ = Ro(),
                    T = _[0];
                T < On ? On = T : T > Dn && (Dn = T);
                var D = _[1];
                D < En ? En = D : D > Cn && (Cn = D)
            }

            function Rn(_) {
                return Math.round(_)
            }

            function br() {
                var _ = Pt("ses"),
                    T = "*";
                return No(_, T, Oo)
            }

            function wr(_) {
                var T = Pt("id"),
                    D = Gf(_);
                return No(T, D, Po)
            }

            function No(_, T, D) {
                return Re && !It ? !1 : ae == "localStorage" ? Xn(_, T, D) : ae == "cookie" || ae == "cookieAndLocalStorage" ? (yt(_, T, D, gr, Qt, $n, In), document.cookie.indexOf("".concat(_, "=")) !== -1) : !1
            }

            function zo(_) {
                var T = Pt("id"),
                    D = Pt("ses");
                ki(T), ki(D), lr(T, Qt, $n, In), lr(D, Qt, $n, In), _ != null && _.preserveSession || (Ce = ot.v4(), Me = 1), _ != null && _.preserveUser || (Mn = Re ? "" : ot.v4(), gt = null)
            }

            function Ho(_) {
                _ && _.stateStorageStrategy && (g.stateStorageStrategy = _.stateStorageStrategy, ae = z(g)), Re = W(g), It = F(g), hr = R(g), tt.setUseLocalStorage(ae == "localStorage" || ae == "cookieAndLocalStorage"), tt.setAnonymousTracking(hr)
            }

            function Uo() {
                if (!(Re && !It)) {
                    var _ = ae != "none" && !!yr("ses"),
                        T = Xt();
                    Mn = Hf(T, Re), _ ? Ce = Rr(T) : Ce = nn(T), Me = Vr(T), ae != "none" && (br(), Lr(T), wr(T))
                }
            }

            function Xt() {
                if (ae == "none") return Nf();
                var _ = yr("id") || void 0;
                return zf(_, Mn, Ce, Me)
            }

            function Fo(_) {
                return _.indexOf("http") === 0 ? _ : (document.location.protocol === "https:" ? "https" : "http") + "://" + _
            }

            function Go() {
                (!Eo || v.pageViewId == null) && (v.pageViewId = ot.v4())
            }

            function Ar() {
                return v.pageViewId == null && (v.pageViewId = ot.v4()), v.pageViewId
            }

            function Zo() {
                if (ae === "none" || Re || !ve) return null;
                var _ = "_sp_tab_id",
                    T = $i(_);
                return T || ($f(_, ot.v4()), T = $i(_)), T || null
            }

            function Ea() {
                return {
                    contexts: function() {
                        return [{
                            schema: Cf,
                            data: {
                                id: Ar()
                            }
                        }]
                    }
                }
            }

            function Ca() {
                return {
                    contexts: function() {
                        return [{
                            schema: Mf,
                            data: De(De({}, Nr()), {
                                tabId: Zo()
                            })
                        }]
                    }
                }
            }

            function Ma() {
                var _ = function(D) {
                        return Re ? null : D
                    },
                    T = function(D) {
                        return It ? D : _(D)
                    };
                return {
                    beforeTrack: function(D) {
                        var he = yr("ses"),
                            ue = Xt(),
                            nt = Wf(ue) === 0;
                        if (vr ? jn = !!yt(vr) : jn = !1, Io || jn) {
                            zo();
                            return
                        }
                        ao(ue) ? (!he && ae != "none" ? Ce = nn(ue) : Ce = Rr(ue), Me = Vr(ue)) : new Date().getTime() - mr > Oo * 1e3 && (Me++, Ce = nn(ue, {
                            memorizedVisitCount: Me
                        })), Lr(ue), Uf(ue, D), Ff(ue);
                        var ke = Nr(),
                            Ot = ke.viewport,
                            en = ke.documentSize;
                        D.add("vp", Ot), D.add("ds", en), D.add("vid", T(Me)), D.add("sid", T(Ce)), D.add("duid", _(Zf(ue))), D.add("uid", _(gt)), vt(), D.add("refr", ht(Xe || pt)), D.add("url", ht(kn || Ee));
                        var tn = Ei(ue, ae, Re);
                        if (xa && (!Re || It) && ja(D, tn), ae != "none") {
                            wr(ue);
                            var Sr = br();
                            (!he || nt) && Sr && Bn && !_r && (Bn(tn), _r = !1)
                        }
                        mr = new Date().getTime()
                    }
                }
            }

            function ja(_, T) {
                var D = {
                    schema: jf,
                    data: T
                };
                _.addContextEntity(D)
            }

            function Ba() {
                var _ = Xt();
                if (ao(_) ? (ae != "none" ? Ce = nn(_) : Ce = Rr(_), Me = Vr(_)) : (Me++, Ce = nn(_, {
                        memorizedVisitCount: Me
                    })), Lr(_), ae != "none") {
                    var T = Ei(_, ae, Re);
                    wr(_);
                    var D = br();
                    D && Bn && (_r = !0, Bn(T))
                }
                mr = new Date().getTime()
            }

            function xr(_, T) {
                return (_ || []).concat(T ? T() : [])
            }

            function La(_) {
                var T = _.title,
                    D = _.context,
                    he = _.timestamp,
                    ue = _.contextCallback;
                vt(), Co && Go(), Co = !0, $t = document.title, Kt = T;
                var nt = Pi(Kt || $t);
                re.track(uf({
                    pageUrl: ht(kn || Ee),
                    pageTitle: nt,
                    referrer: ht(Xe || pt)
                }), xr(D, ue), he);
                var ke = new Date,
                    Ot = !1;
                if (Ae.enabled && !Ae.installed) {
                    Ae.installed = !0, Ot = !0;
                    var en = {
                        update: function() {
                            if (typeof window < "u" && typeof window.addEventListener == "function") {
                                var Dt = !1,
                                    Vn = Object.defineProperty({}, "passive", {
                                        get: function() {
                                            Dt = !0
                                        },
                                        set: function() {}
                                    }),
                                    Ko = function() {};
                                window.addEventListener("testPassiveEventSupport", Ko, Vn), window.removeEventListener("testPassiveEventSupport", Ko, Vn), en.hasSupport = Dt
                            }
                        }
                    };
                    en.update();
                    var tn = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
                    Object.prototype.hasOwnProperty.call(en, "hasSupport") ? it(document, tn, Jt, {
                        passive: !0
                    }) : it(document, tn, Jt), Vo();
                    var Sr = ["click", "mouseup", "mousedown", "mousemove", "keypress", "keydown", "keyup", "touchend", "touchstart"],
                        za = ["resize", "focus", "blur"],
                        Tr = function(Ha, Dt) {
                            return Dt === void 0 && (Dt = Jt),
                                function(Vn) {
                                    return it(document, Vn, Dt)
                                }
                        };
                    Sr.forEach(Tr(document)), za.forEach(Tr(window)), Tr(window, Oa)("scroll")
                }
                if (Ae.enabled && (wa || Ot)) {
                    Pn = ke.getTime();
                    var qo = void 0;
                    for (qo in Ae.configurations) {
                        var kr = Ae.configurations[qo];
                        kr && (window.clearInterval(kr.activityInterval), Ra(kr, D, ue))
                    }
                }
            }

            function Ra(_, T, D) {
                var he = function(ke, Ot) {
                        vt(), ke({
                            context: Ot,
                            pageViewId: Ar(),
                            minXOffset: On,
                            minYOffset: En,
                            maxXOffset: Dn,
                            maxYOffset: Cn
                        }), Vo()
                    },
                    ue = function() {
                        var ke = new Date;
                        Pn + _.configMinimumVisitLength > ke.getTime() && he(_.callback, xr(T, D)), _.activityInterval = window.setInterval(nt, _.configHeartBeatTimer)
                    },
                    nt = function() {
                        var ke = new Date;
                        Pn + _.configHeartBeatTimer > ke.getTime() && he(_.callback, xr(T, D))
                    };
                _.configMinimumVisitLength === 0 ? _.activityInterval = window.setInterval(nt, _.configHeartBeatTimer) : _.activityInterval = window.setTimeout(ue, _.configMinimumVisitLength)
            }

            function Wo(_) {
                var T = _.minimumVisitLength,
                    D = _.heartbeatDelay,
                    he = _.callback;
                if (Ii(T) && Ii(D)) return {
                    configMinimumVisitLength: T * 1e3,
                    configHeartBeatTimer: D * 1e3,
                    callback: he
                };
                Ne.error("Activity tracking minimumVisitLength & heartbeatDelay must be integers")
            }

            function Va(_) {
                var T = _.context,
                    D = _.minXOffset,
                    he = _.minYOffset,
                    ue = _.maxXOffset,
                    nt = _.maxYOffset,
                    ke = document.title;
                ke !== $t && ($t = ke, Kt = void 0), re.track(ff({
                    pageUrl: ht(kn || Ee),
                    pageTitle: Pi(Kt || $t),
                    referrer: ht(Xe || pt),
                    minXOffset: Rn(D),
                    maxXOffset: Rn(ue),
                    minYOffset: Rn(he),
                    maxYOffset: Rn(nt)
                }), T)
            }

            function Yo(_) {
                var T = Ae.configurations[_];
                (T == null ? void 0 : T.configMinimumVisitLength) === 0 ? window.clearTimeout(T == null ? void 0 : T.activityInterval) : window.clearInterval(T == null ? void 0 : T.activityInterval), Ae.configurations[_] = void 0
            }
            var Na = {
                getDomainSessionIndex: function() {
                    return Me
                },
                getPageViewId: Ar,
                getTabId: Zo,
                newSession: Ba,
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
                    vt(), kn = Ia(Ee, _)
                },
                setDocumentTitle: function(_) {
                    $t = document.title, Kt = _
                },
                discardHashTag: function(_) {
                    To = _
                },
                discardBrace: function(_) {
                    ko = _
                },
                setCookiePath: function(_) {
                    gr = _, Lo()
                },
                setVisitorCookieTimeout: function(_) {
                    Po = _
                },
                crossDomainLinker: function(_) {
                    jo(_)
                },
                enableActivityTracking: function(_) {
                    Ae.configurations.pagePing || (Ae.enabled = !0, Ae.configurations.pagePing = Wo(De(De({}, _), {
                        callback: Va
                    })))
                },
                enableActivityTrackingCallback: function(_) {
                    Ae.configurations.callback || (Ae.enabled = !0, Ae.configurations.callback = Wo(_))
                },
                disableActivityTracking: function() {
                    Yo("pagePing")
                },
                disableActivityTrackingCallback: function() {
                    Yo("callback")
                },
                updatePageActivity: function() {
                    Jt()
                },
                setOptOutCookie: function(_) {
                    vr = _
                },
                setUserId: function(_) {
                    gt = _
                },
                setUserIdFromLocation: function(_) {
                    vt(), gt = hn(_, Ee)
                },
                setUserIdFromReferrer: function(_) {
                    vt(), gt = hn(_, pt)
                },
                setUserIdFromCookie: function(_) {
                    gt = yt(_)
                },
                setCollectorUrl: function(_) {
                    Te = Fo(_), tt.setCollectorUrl(Te)
                },
                setBufferSize: function(_) {
                    tt.setBufferSize(_)
                },
                flushBuffer: function(_) {
                    _ === void 0 && (_ = {}), tt.executeQueue(), _.newBufferSize && tt.setBufferSize(_.newBufferSize)
                },
                trackPageView: function(_) {
                    _ === void 0 && (_ = {}), La(_)
                },
                preservePageViewId: function() {
                    Eo = !0
                },
                disableAnonymousTracking: function(_) {
                    g.anonymousTracking = !1, Ho(_), Uo(), tt.executeQueue()
                },
                enableAnonymousTracking: function(_) {
                    var T;
                    g.anonymousTracking = (T = _ && (_ == null ? void 0 : _.options)) !== null && T !== void 0 ? T : !0, Ho(_), It || Go()
                },
                clearUserData: zo
            };
            return De(De({}, Na), {
                id: p,
                namespace: o,
                core: re,
                sharedState: v
            })
        },
        c = u(e, n, t, r, i, s),
        f = De(De({}, c), {
            addPlugin: function(p) {
                var o, a;
                f.core.addPlugin(p), (a = (o = p.plugin).activateBrowserPlugin) === null || a === void 0 || a.call(o, f)
            }
        });
    return l.forEach(function(p) {
        var o;
        (o = p.activateBrowserPlugin) === null || o === void 0 || o.call(p, f)
    }), f
}
var cn = {};

function bo(e, n) {
    try {
        Xf(e != null ? e : ed()).forEach(n)
    } catch (t) {
        Ne.error("Function failed", t)
    }
}

function Jf(e, n, t, r, i, s) {
    return cn.hasOwnProperty(e) ? null : (cn[e] = Qf(e, n, t, r, i, s), cn[e])
}

function Xf(e) {
    return td(e, cn)
}

function ed() {
    return Object.keys(cn)
}

function td(e, n) {
    for (var t = [], r = 0, i = e; r < i.length; r++) {
        var s = i[r];
        n.hasOwnProperty(s) ? t.push(n[s]) : Ne.warn(s + " not configured")
    }
    return t
}
var nd = function() {
    function e() {
        this.outQueues = [], this.bufferFlushers = [], this.hasLoaded = !1, this.registeredOnLoadHandlers = []
    }
    return e
}();

function rd() {
    var e = new nd,
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
function od(e, n) {
    bo(n, function(t) {
        t.enableActivityTracking(e)
    })
}

function id(e, n) {
    bo(n, function(t) {
        t.trackPageView(e)
    })
}

function sd(e, n) {
    bo(n, function(t) {
        t.core.track(cf({
            event: e.event
        }), e.context, e.timestamp)
    })
}
var Ci = typeof window < "u" ? rd() : void 0;

function ad(e, n, t) {
    if (t === void 0 && (t = {}), Ci) return Jf(e, e, "js-".concat(df), n, Ci, t)
}
const ld = "brawlstars-cctv-prod",
    cd = "https://collector.snowplow.supercell.com",
    ud = () => {
        ad("sp1", cd, {
            appId: ld,
            plugins: []
        })
    },
    fd = () => od({
        minimumVisitLength: 5,
        heartbeatDelay: 20
    }),
    dd = (e, n, t, r = {}) => {
        sd({
            event: {
                schema: "iglu:com.supercell/button_click/jsonschema/1-0-0",
                data: {
                    button_id: e,
                    button_name: n
                }
            },
            context: [{
                schema: "iglu:com.snowplowanalytics.snowplow/additional_information/jsonschema/1-0-0",
                data: be({
                    page: t
                }, r)
            }]
        })
    },
    ie = {
        init: ud,
        setupActivityTracking: fd,
        trackPageView: id,
        trackClickEvent: dd
    },
    pd = [{
        postDate: "2023-12-13",
        isFinal: !0,
        bgSrc: {
            png: "scenes/scene/bg.png"
        },
        transitionVideoSrc: {
            mp4: "scenes/scene/transition-video.mp4"
        }
    }],
    gd = pd,
    vd = Yt(gd),
    Fe = () => {
        var n, t, r;
        const e = vd()[0];
        return mt(be({}, e), {
            bgSrc: je(e.bgSrc.png),
            transitionVideoSrc: je(e.transitionVideoSrc.mp4),
            overlayVideoMp4: ((n = e.overlayVideoSrc) == null ? void 0 : n.mp4) && je(e.overlayVideoSrc.mp4),
            overlayVideoWebm: ((t = e.overlayVideoSrc) == null ? void 0 : t.webm) && je(e.overlayVideoSrc.webm),
            overlayVideoPoster: ((r = e.overlayVideoSrc) == null ? void 0 : r.png) && je(e.overlayVideoSrc.png)
        })
    },
    hd = [{
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
    md = hd,
    _d = Yt(md),
    Xs = () => _d().map(n => mt(be({}, n), {
        srcJpg: n.src.jpg ? je(n.src.jpg) : void 0,
        srcPng: n.src.png ? je(n.src.png) : void 0
    })),
    yd = "/assets/instructions-modal-overlay-b0399863.png",
    wo = "/assets/terminal-logo-7a935f92.png",
    ea = "/assets/logbook-page-bg-left-d97e3458.jpg",
    ta = "/assets/logbook-page-bg-right-98ad4729.jpg",
    na = "/assets/logbook-first-page-4594a73f.jpg",
    lo = "/assets/player-controls-bg-272e65c2.jpg",
    ra = e => e.reduce((n, t, r, i) => (r % 2 === 0 && n.push(e.slice(r, r + 2)), n), []),
    oa = async e => new Promise(n => {
        const t = new Image;
        t.onload = () => n(t), t.src = e
    });
var Ut = (e => (e[e.initializing = 0] = "initializing", e[e["loading-assets"] = 1] = "loading-assets", e[e["video-transition"] = 2] = "video-transition", e[e.done = 3] = "done", e))(Ut || {});
const bd = Fe(),
    wd = Xs(),
    Ad = () => {
        const e = [ea, ta],
            n = [...wd.map(i => i.srcPng || i.srcJpg), null].reverse();
        n.length === 1 && e.push(na);
        const t = ra(n),
            r = t[t.length - 1];
        return r && e.push(...r.filter(i => !!i)), e
    },
    xd = [bd.bgSrc, yd, wo, lo, ...Ad()],
    [ia, Ao] = Z(0),
    [Sd, Td] = Z(!1),
    [kd, $d] = Z(!1),
    Id = dr("standalone"),
    Pd = async () => {
        Ao(1);
        const e = xd.map(n => oa(n));
        await Promise.allSettled(e), Td(!0)
    }, sa = () => {
        Id || (window.location.href = "brawlstars-inbox://cctvloaded")
    };
pe(() => {
    Sd() && kd() && (sa(), Ao(2))
});
pe(() => {
    ia() === 3 && sa()
});
const Od = () => {
        $d(!0)
    },
    Dd = () => {
        Ao(3)
    },
    st = {
        init: Pd,
        currentStatus: ia,
        onVideoTransitionLoaded: Od,
        onVideoTransitionEnd: Dd
    },
    aa = e => e[Math.floor(Math.random() * e.length)],
    Ed = "/assets/player-8b9a1305.mp3",
    Cd = "/assets/player-4aabf494.ogg",
    Md = V('<svg viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="path-1" d="M8 36L25 24L8 12V36Z" fill="currentColor"></path><path id="path-2" d="M25 36L42 24L25 12V36Z" fill="currentColor"></path><path id="path-3" d="M42 36L59 24L42 12V36Z" fill="currentColor">'),
    jd = (e = {}) => (() => {
        const n = Md();
        return Ke(n, e, !0, !0), n
    })(),
    Bd = V('<svg viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="path-1" d="M26 36L9 24L26 12V36Z" fill="currentColor"></path><path id="path-2" d="M43 36L26 24L43 12V36Z" fill="currentColor"></path><path id="path-3" d="M60 36L43 24L60 12V36Z" fill="currentColor">'),
    Ld = (e = {}) => (() => {
        const n = Bd();
        return Ke(n, e, !0, !0), n
    })(),
    Rd = V('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 68"><path d="M60.66 16.06c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4Zm9.54-26.81c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36-4.06-.01-6.57-.12-7.52-.36Zm0 17.9c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36s-6.57-.12-7.52-.36Zm3.89-8.99c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .95-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.14-3.63-.4Zm13.43-17.91c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4ZM19.57 17.17c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM27.24 9.83c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.61c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33ZM26.11 50.21c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.22 3.22-.33 7.01-.33ZM33.78 57.55c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.21 3.22-.33 7.01-.33ZM1.43 31.5c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.43-.14-4.07-.45ZM.95 39.78c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.07 0-3.43-.15-4.07-.45ZM38.54 17.82c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 25.3c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 32.79c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 40.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 47.75c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.44-.14-4.07-.45ZM8.47 23.97c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79.01-6.12-.1-7.01-.33ZM38.54 55.24c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Z" fill="currentColor">'),
    Vd = (e = {}) => (() => {
        const n = Rd();
        return Ke(n, e, !0, !0), n
    })(),
    Nd = V('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M12 38h8V10h-8v28Zm16-28v28h8V10h-8Z" fill="currentColor">'),
    zd = (e = {}) => (() => {
        const n = Nd();
        return Ke(n, e, !0, !0), n
    })(),
    Hd = V('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M16 10v28l22-14-22-14Z" fill="currentColor">'),
    Ud = (e = {}) => (() => {
        const n = Hd();
        return Ke(n, e, !0, !0), n
    })(),
    Fd = V('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M23.495 27.969c2.28 0 4.13-1.913 4.13-4.273 0-2.36-1.85-4.273-4.13-4.273-2.281 0-4.13 1.913-4.13 4.273 0 2.36 1.849 4.273 4.13 4.273Z" fill="currentColor"></path><path d="M31.073 15.863a2.047 2.047 0 0 0-.137-.13 11.945 11.945 0 0 0-.504-.476 1.942 1.942 0 0 0-2.8.233c-.71.863-.609 2.162.225 2.897a7.06 7.06 0 0 1 2.374 5.306c0 2.261-1.068 4.39-2.856 5.695-.013.009-.023.02-.037.03a1.412 1.412 0 0 0-.066.05c-.909.636-1.15 1.913-.535 2.853.384.59 1.01.904 1.648.904.381 0 .768-.115 1.11-.353 2.953-2.064 4.717-5.498 4.717-9.184-.003-2.952-1.118-5.734-3.139-7.825Z" fill="currentColor"></path><path d="M35.168 11.425a1.917 1.917 0 0 0-.156-.145 17.637 17.637 0 0 0-.829-.79 1.942 1.942 0 0 0-2.8.233c-.71.864-.61 2.163.225 2.897 2.805 2.47 4.413 6.069 4.413 9.873 0 4.199-1.981 8.154-5.297 10.585-.072.052-.143.11-.218.162-.908.636-1.147 1.913-.535 2.853.384.59 1.01.904 1.648.904.381 0 .768-.115 1.11-.353C37.282 34.462 40 29.169 40 23.49c0-4.555-1.717-8.842-4.832-12.065ZM19.733 29.47c-.024-.016-.045-.032-.066-.049-.013-.01-.024-.022-.037-.03-1.788-1.304-2.856-3.434-2.856-5.695 0-2.045.864-3.98 2.374-5.306a2.104 2.104 0 0 0 .225-2.898 1.94 1.94 0 0 0-2.8-.233 9.434 9.434 0 0 0-.503.477 2.158 2.158 0 0 0-.14.132c-2.024 2.086-3.14 4.868-3.14 7.828 0 3.686 1.765 7.118 4.718 9.184.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.905.617-.945.376-2.223-.533-2.858Z" fill="currentColor"></path><path d="M16.496 34.24c-.074-.053-.143-.11-.217-.162-3.316-2.429-5.298-6.383-5.298-10.585 0-3.804 1.608-7.403 4.413-9.872.837-.735.938-2.034.226-2.898a1.94 1.94 0 0 0-2.8-.232c-.29.252-.562.518-.83.789-.052.046-.105.093-.156.145C8.716 14.648 7 18.935 7 23.493c0 5.679 2.718 10.969 7.271 14.153.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.904.614-.943.376-2.22-.533-2.856Z" fill="currentColor">'),
    Gd = (e = {}) => (() => {
        const n = Fd();
        return Ke(n, e, !0, !0), n
    })(),
    Zd = V('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.96 67.25"><path d="M86.24 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.65-7.86c-.42-.23-.63-.84-.63-1.83s.21-1.6.63-1.83C83.01.12 84.11 0 85.9 0s2.89.12 3.31.35c.42.23.63.84.63 1.83s-.21 1.6-.63 1.83c-.42.23-1.52.35-3.31.35s-2.89-.12-3.31-.35Zm6.77 15.72c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.18 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.18 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.7 7.86c-.39-.23-.58-.84-.58-1.83s.19-1.6.58-1.83c.39-.23 1.4-.35 3.04-.35s2.65.12 3.04.35c.39.23.58.84.58 1.83s-.19 1.6-.58 1.83c-.39.23-1.4.35-3.04.35s-2.65-.12-3.04-.35ZM61.57 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm3.12 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.17 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.17 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-42-41.98c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm7.67-7.35c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.5c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm12.74 6.6c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm7.67 7.34c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33ZM1.43 31.39c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm-.48 8.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM38.54 17.7c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM8.47 23.86c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm30.07 31.26c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Z" fill="currentColor">'),
    Wd = (e = {}) => (() => {
        const n = Zd();
        return Ke(n, e, !0, !0), n
    })(),
    Yd = {
        "fast-forward": jd,
        "fast-rewind": Ld,
        mute: Vd,
        pause: zd,
        play: Ud,
        live: Gd,
        unmute: Wd
    },
    qd = V("<span>"),
    Lt = e => {
        const [n, t] = fo(e, ["name"]);
        return (() => {
            const r = qd();
            return Ke(r, t, !1, !0), C(r, S(gs, {
                get component() {
                    return Yd[n.name]
                }
            })), r
        })()
    },
    la = {
        tl: "tl",
        bl: "bl",
        c: "c",
        tr: "tr",
        br: "br"
    },
    ca = e => {
        var n;
        return (n = Object.values(la)[e]) != null ? n : "c"
    },
    Kd = [{
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
    Qd = Kd,
    Jd = Yt(Qd),
    xo = () => Jd()[0],
    Xd = (e = !0) => {
        let n = bs;
        return {
            get abort() {
                return n
            },
            exec: t => (e && n(), Promise.race([new Promise((r, i) => n = () => i(new Error("aborted"))), new Promise(r => t(r))]))
        }
    },
    un = [4, 16, 32],
    Mi = Math.min(...un),
    ji = Math.max(...un),
    ep = () => {
        const [e, n] = Z(Mi);
        let t = bs,
            r;
        const c = {
            timer: r,
            onTick: f => (t = f, c),
            start: () => {
                let f = 0;
                return r = setInterval(() => {
                    const p = ji / e();
                    f % p === 0 && t(), f++
                }, 1e3 / ji), c
            },
            stop: () => (clearInterval(r), r = void 0, n(Mi), c),
            currentSpeed: e,
            increaseSpeed: () => n(f => {
                const p = un.indexOf(f);
                return un[(p + 1) % un.length]
            })
        };
        return c
    },
    tp = e => {
        const n = fs(),
            t = ep(),
            r = Xd(),
            [i, s] = Z(null),
            [l, u] = Z(0),
            [c, f] = Z(e.initialFeed),
            [p, o] = Z(null),
            [a, d] = Z("initializing"),
            [v, g] = Z(e.initialPosition),
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
            Y = async x => {
                try {
                    const A = c(),
                        $ = await (await Fl(() => import("./player-8622201f.js"), [])).initPlayer({
                            refNode: x,
                            videoId: A.videoId,
                            adConfigId: A.videoId && A.adId,
                            playlistId: A.playlistId,
                            options: {
                                loop: !0
                            }
                        });
                    if (!$) throw new Error;
                    $.on("error", () => d("error")), $.on("timeupdate", () => u($.currentTime())), $.one("canplay", () => d("ready")), $.one("playing", () => d("playing")), $.on("ended", () => d("ended")), o($)
                } catch (A) {
                    console.error(A), d("error")
                }
            }, B = async x => {
                (x.videoId ? c().videoId === x.videoId : c().playlistId === x.playlistId) || (d("initializing"), s(null), f(x), await r.exec(A => {
                    var E, $, U;
                    (E = p()) == null || E.pause(), (U = ($ = p()) == null ? void 0 : $.catalog) == null || U.get({
                        id: x.videoId || x.playlistId,
                        adConfigId: x.adId,
                        type: x.videoId ? "video" : "playlist"
                    }, (G, K) => {
                        var X, ne, ye, O;
                        if (G) d("error");
                        else {
                            const z = Array.isArray(K) ? K : [K];
                            if (!z.length) return A();
                            const F = z.length > 1;
                            (X = p()) == null || X.loop(!F);
                            const R = Object.values(la).indexOf(v()),
                                W = F ? z[R % z.length] : z[0];
                            (ye = (ne = p()) == null ? void 0 : ne.catalog) == null || ye.load(W), (O = p()) == null || O.one("canplay", () => {
                                var q;
                                (q = p()) == null || q.play(), d("playing"), A()
                            })
                        }
                    })
                }))
            }, j = async () => B(e.initialFeed), N = () => {
                var x;
                (x = p()) == null || x.dispose(), o(null)
            }, L = async () => {
                await r.exec(x => {
                    var A;
                    (A = p()) == null || A.play(), x()
                }), d("playing")
            }, J = async () => {
                await r.exec(x => {
                    var A;
                    (A = p()) == null || A.pause(), x()
                }), d("ready")
            }, de = async () => {
                !y() || b() || (d("syncing"), await r.exec(x => {
                    var A, E, $;
                    (A = p()) == null || A.liveTracker.seekToLiveEdge(), (E = p()) == null || E.play(), ($ = p()) == null || $.one("timeupdate", x)
                }), d("playing"))
            }, M = async x => {
                var A, E;
                d(x === 1 ? "seeking-fwd" : "seeking-bwd"), await r.exec($ => {
                    var U;
                    (U = p()) == null || U.pause(), t.start().onTick(() => {
                        const G = l() + 1 * x;
                        x === -1 && G <= 0 || x === 1 && G >= P() ? $() : u(G)
                    })
                }), t.stop(), x === 1 ? y() ? d("ready") : ((A = p()) == null || A.currentTime(0), d("ended")) : ((E = p()) == null || E.currentTime(0), d("ready"))
            }, I = async () => {
                var x, A;
                Math.abs(l() - ((A = (x = p()) == null ? void 0 : x.currentTime()) != null ? A : 0)) < 3 || (d("syncing"), await r.exec(E => {
                    var $, U, G;
                    ($ = p()) == null || $.pause(), (U = p()) == null || U.currentTime(l()), (G = p()) == null || G.trigger("timeupdate"), E()
                }), d("ready"))
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
                mount: Y,
                unmount: N,
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
    qe = xo().liveVideos.map((e, n) => tp({
        initialFeed: e,
        initialPosition: ca(n)
    })),
    [np, rp] = Z(!1),
    [op, ua] = Z({
        liveVideos: xo().liveVideos
    }),
    Ft = () => qe.filter(e => e.isEnabled()),
    ip = () => Ft().find(e => e.isCenter()),
    sp = () => {
        const e = Ft().filter(n => n.isLive() && n.status() === "playing");
        return e.length > 0 ? e.every(n => n.isAtEdge()) : !1
    },
    ap = we(() => qe.length > 0 && qe.every(e => e.status() !== "initializing")),
    lp = we(() => Ft().length > 0 && Ft().every(e => e.status() === "ended")),
    cp = e => {
        const n = qe.find(r => r.uid === e.uid),
            t = qe.find(r => r.position() === "c");
        ur(() => {
            t.setPosition(n.position()), n.setPosition("c")
        })
    },
    up = () => {
        ur(() => {
            qe.forEach((e, n) => e.setPosition(ca(n)))
        })
    },
    fp = async e => {
        var t;
        const n = (t = ip()) == null ? void 0 : t.time();
        if (n) return e.setTime(n), e.Player.dispatch("sync")
    }, dp = async e => {
        try {
            e === "play" && await Promise.all(Ft().map(fp)), e === "go-live" && ua({
                liveVideos: xo().liveVideos
            }), await Promise.all(Ft().map(n => n.Player.dispatch(e)))
        } catch (n) {
            console.warn(n)
        }
    }, pp = async e => {
        try {
            ua(e), !!e.archivePlaylist ? await Promise.all(qe.map(t => t.switchFeed(e.archivePlaylist))) : await Promise.all(qe.map((t, r) => {
                const i = e.liveVideos[r % e.liveVideos.length];
                if (i) return t.switchFeed(i)
            }))
        } catch (n) {
            console.warn(n)
        }
    }, ge = {
        screens: qe,
        Supervisor: {
            dispatch: dp,
            positionScreenAtCenter: cp,
            resetScreensPosition: up,
            controlsVisible: np,
            setControlsVisible: rp,
            switchFeed: pp,
            allAtEdge: sp,
            allLoaded: ap,
            allEnded: lp,
            currentFeed: op
        }
    }, gp = V('<div role="button" class="absolute top-0 left-0 wh-full">'), vp = V('<div class="absolute bottom-0 left-0 right-0 h-[228px] px-[158px] flex space-x-68 items-center justify-center"><button></button><button></button><button></button><button>'), Zn = ["w-[330px] h-[100px] flex-center bg-player-control-btn text-green rounded-sm", "shadow-player-controls-btn active:shadow-player-controls-btn-pressed", "[&>span]:w-72 [&>span]:drop-shadow-terminal"], hp = () => {
        const e = ct([Cd, Ed], {
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
            const n = gp();
            return n.$$click = () => ge.Supervisor.setControlsVisible(!1), n
        })(), (() => {
            const n = vp(),
                t = n.firstChild,
                r = t.nextSibling,
                i = r.nextSibling,
                s = i.nextSibling;
            return "url(".concat(lo, ")") != null ? n.style.setProperty("background-image", "url(".concat(lo, ")")) : n.style.removeProperty("background-image"), t.$$click = () => {
                ie.trackClickEvent("player-controls", "rewind", "cctv-room"), ge.Supervisor.dispatch("rev"), e.play("rewind-click", {
                    interrupt: !0
                }), e.play("rewind-loop")
            }, C(t, S(Lt, {
                name: "fast-rewind",
                class: "!w-112 ml-22 [&_#path-3]:hidden"
            })), r.$$click = () => {
                ie.trackClickEvent("player-controls", "play", "cctv-room"), ge.Supervisor.dispatch("play"), e.play("play", {
                    interrupt: !0
                })
            }, C(r, S(Lt, {
                name: "play"
            })), i.$$click = () => {
                ie.trackClickEvent("player-controls", "forward", "cctv-room"), ge.Supervisor.dispatch("fwd"), e.play("forward-click", {
                    interrupt: !0
                }), e.play("forward-loop")
            }, C(i, S(Lt, {
                name: "fast-forward",
                class: "!w-112 ml-22 [&_#path-3]:hidden"
            })), s.$$click = () => {
                ie.trackClickEvent("player-controls", "pause", "cctv-room"), ge.Supervisor.dispatch("pause"), e.play("pause", {
                    interrupt: !0
                })
            }, C(s, S(Lt, {
                name: "pause"
            })), Q(l => {
                const u = ce(Zn),
                    c = ce(Zn),
                    f = ce(Zn),
                    p = ce(Zn);
                return u !== l._v$ && te(t, l._v$ = u), c !== l._v$2 && te(r, l._v$2 = c), f !== l._v$3 && te(i, l._v$3 = f), p !== l._v$4 && te(s, l._v$4 = p), l
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), n
        })()]
    };
Ie(["click"]);
const mp = (e, n) => {
        const t = e * n / 100;
        return e - t
    },
    Bi = e => e.touches.length === 2,
    Li = e => Math.hypot(e[0].pageX - e[1].pageX, e[0].pageY - e[1].pageY),
    _p = e => {
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
        }, l = f => {
            !Bi(f) || !n.isEnabled || (f.preventDefault(), t({
                isZooming: !0,
                start: {
                    distance: Li(f.touches),
                    x: (f.touches[0].pageX + f.touches[1].pageX) / 2,
                    y: (f.touches[0].pageY + f.touches[1].pageY) / 2
                }
            }))
        }, u = f => {
            !Bi(f) || !n.isEnabled || (f.preventDefault(), t(p => {
                const o = "scale" in f ? f.scale : Li(f.touches) / n.start.distance,
                    a = (f.touches[0].pageX + f.touches[1].pageX) / 2 - p.start.x,
                    d = (f.touches[0].pageY + f.touches[1].pageY) / 2 - p.start.y;
                return {
                    scale: Math.min(Math.max(1, mp(o, 10)), 4),
                    delta: {
                        x: a,
                        y: d
                    }
                }
            }))
        }, c = () => {
            s()
        };
        return Gt(() => {
            var f, p, o;
            (f = e.targetRef()) == null || f.addEventListener("touchstart", l), (p = e.targetRef()) == null || p.addEventListener("touchmove", u), (o = e.targetRef()) == null || o.addEventListener("touchend", c)
        }), _e(() => {
            var f, p, o;
            (f = e.targetRef()) == null || f.removeEventListener("touchstart", l), (p = e.targetRef()) == null || p.removeEventListener("touchmove", u), (o = e.targetRef()) == null || o.removeEventListener("touchend", c)
        }), {
            data: n,
            controls: {
                enable: r,
                disable: i
            }
        }
    },
    Sn = wn("", {
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
        const [n, t] = fo(e, ["size", "as", "class", "children"]);
        return S(gs, il({
            get component() {
                return n.as || "span"
            },
            get class() {
                return Sn({
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
    yp = "/assets/seek-video-dab3075d.mp4",
    bp = V('<video playsinline muted loop class="absolute top-0 left-0 wh-full object-cover">'),
    wp = V('<div class="absolute top-0 left-0 bg-black z-10 wh-full">'),
    Ri = V("<span>"),
    Ap = V('<div class="absolute top-72 left-72 flex items-center space-x-8 text-white">'),
    xp = {
        "seeking-fwd": "seeking-fwd",
        "seeking-bwd": "seeking-bwd",
        ready: "ready",
        playing: "playing",
        error: "error"
    },
    Sp = {
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
    Tp = e => {
        let n;
        const [t, r] = Z(void 0);
        pe(() => {
            const c = e.screen.status();
            if (c === "syncing") return;
            const p = e.screen.isAtEdge() && c === "playing" ? "live" : xp[c];
            r(p);
            let o;
            (p === "playing" || p === "live") && (o = setTimeout(() => r(void 0), 1500)), _e(() => clearTimeout(o))
        });
        const [i, s] = Z();
        pe(() => {
            var d;
            if (!e.screen.isEnabled()) return;
            const c = e.screen.feed().playlistId ? (d = e.screen.feed().metadata) == null ? void 0 : d.date : void 0;
            if (!e.screen.isLive() && !c) {
                s(void 0);
                return
            }
            const f = c ? c.add(e.screen.duration(), "seconds") : Os(Ss),
                p = e.screen.time(),
                o = e.screen.duration() - p,
                a = f.subtract(o, "seconds");
            s({
                date: a.format("DD.MM.[95]"),
                time: a.format("HH:mm:ss")
            })
        });
        const l = () => t() ? Sp[t()] : void 0,
            u = () => t() === "seeking-bwd" || t() === "seeking-fwd";
        return pe(() => {
            n && (u() ? n.play() : n.pause())
        }), pe(() => {
            const c = e.screen.seekerSpeed();
            !n || !c || (n.playbackRate = c === 4 ? 1 : c === 16 ? 1.5 : 2)
        }), [(() => {
            const c = bp(),
                f = n;
            return typeof f == "function" ? $e(f, c) : n = c, oe(c, "src", yp), Q(() => (u() ? "visible" : "hidden") != null ? c.style.setProperty("visibility", u() ? "visible" : "hidden") : c.style.removeProperty("visibility")), c
        })(), S(ps, {
            get children() {
                return [S(jt, {
                    get when() {
                        return t() === "error"
                    },
                    get children() {
                        return wp()
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
                                const f = Ap();
                                return C(f, S(se, {
                                    size: "screen-overlay-md",
                                    get children() {
                                        return c().text
                                    }
                                }), null), C(f, S(Lt, {
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
                                }), null), f
                            })()
                        }), S(Le, {
                            get when() {
                                return we(() => !!i())() && e.screen.isEnabled()
                            },
                            get children() {
                                return S(se, {
                                    as: "div",
                                    size: "screen-overlay-sm",
                                    class: "absolute bottom-72 left-72 flex flex-col items-start text-white",
                                    get children() {
                                        return [(() => {
                                            const c = Ri();
                                            return C(c, () => i().time), c
                                        })(), (() => {
                                            const c = Ri();
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
    kp = V('<button class="absolute top-0 left-0 isolate"><div>'),
    $p = {
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
    Ip = e => {
        const [n, t] = Z(void 0);
        let r;
        const i = () => $p[e.screen.position()],
            {
                data: s,
                controls: l
            } = _p({
                targetRef: n
            });
        return pe(() => {
            st.currentStatus() === Ut.done && Ye.dataUsageWarningDialog.accepted() && r && !e.screen.Player.isMounted() && e.screen.Player.mount(r)
        }), _e(() => {
            e.screen.Player.unmount()
        }), pe(() => {
            e.screen.position() === "c" && !["initializing", "error"].includes(e.screen.status()) ? l.enable() : l.disable()
        }), (() => {
            const u = kp(),
                c = u.firstChild;
            u.$$click = () => {
                var p;
                (p = e.onClick) == null || p.call(e)
            }, $e(t, u);
            const f = r;
            return typeof f == "function" ? $e(f, c) : r = c, C(u, S(Tp, {
                get screen() {
                    return e.screen
                }
            }), null), Q(p => {
                const o = "".concat(i().coordinates.y, "px"),
                    a = "".concat(i().coordinates.x, "px"),
                    d = "".concat(i().size.width, "px"),
                    v = "".concat(i().size.height, "px"),
                    g = i().transformOrigin,
                    m = s.isZooming ? "10" : void 0,
                    h = "translate3d(".concat(s.delta.x, "px, ").concat(s.delta.y, "px, 0) rotateZ(").concat(i().rotation || 0, "deg) scale(").concat((i().scaleFactor || 1) * s.scale, ")"),
                    y = i().hidden ? "hidden" : void 0,
                    w = ce("Video", e.screen.status() === "initializing" && "invisible");
                return o !== p._v$ && ((p._v$ = o) != null ? u.style.setProperty("top", o) : u.style.removeProperty("top")), a !== p._v$2 && ((p._v$2 = a) != null ? u.style.setProperty("left", a) : u.style.removeProperty("left")), d !== p._v$3 && ((p._v$3 = d) != null ? u.style.setProperty("width", d) : u.style.removeProperty("width")), v !== p._v$4 && ((p._v$4 = v) != null ? u.style.setProperty("height", v) : u.style.removeProperty("height")), g !== p._v$5 && ((p._v$5 = g) != null ? u.style.setProperty("transform-origin", g) : u.style.removeProperty("transform-origin")), m !== p._v$6 && ((p._v$6 = m) != null ? u.style.setProperty("z-index", m) : u.style.removeProperty("z-index")), h !== p._v$7 && ((p._v$7 = h) != null ? u.style.setProperty("transform", h) : u.style.removeProperty("transform")), y !== p._v$8 && ((p._v$8 = y) != null ? u.style.setProperty("visibility", y) : u.style.removeProperty("visibility")), w !== p._v$9 && te(c, p._v$9 = w), p
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
const Pp = () => {
        if (!Bl()) return !0;
        const e = window.navigator;
        return !!(e.mediaCapabilities && e.mediaCapabilities.decodingInfo)
    },
    Op = V('<img class="absolute top-0 left-0 wh-full pointer-events-none">'),
    Dp = V('<video muted playsinline loop class="absolute top-0 left-0 h-full pointer-events-none"><source type="video/mp4; codecs=hvc1"><source type="video/webm">'),
    Ep = () => {
        let e;
        return Gt(() => {
            if (Pp()) try {
                e == null || e.play()
            } catch (n) {
                console.error(n)
            }
        }), [(() => {
            const n = Op();
            return Q(() => oe(n, "src", Fe().bgSrc)), n
        })(), S(Le, {
            get when() {
                return we(() => !!Fe().overlayVideoMp4)() && Fe().overlayVideoWebm
            },
            get children() {
                const n = Dp(),
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
    Cp = V('<button class="absolute origin-top-left">'),
    Mp = [{
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
    jp = e => S(po, {
        each: Mp,
        children: n => (() => {
            const t = Cp();
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
const Bp = "/assets/answering-machine-button-glow-58ea4526.svg",
    Lp = V('<img class="absolute origin-bottom-left">'),
    Rp = {
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
    Vp = () => {
        const e = Rp["phone-button-light"];
        return S(Le, {
            get when() {
                return Ye.answeringMachineTrack.hasNew()
            },
            get children() {
                const n = Lp();
                return oe(n, "src", Bp), Q(t => {
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
    Np = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAAAwECBAUGBwgBAQACAwEBAAAAAAAAAAAAAAABBQIDBgQH/9oADAMBAAIQAxAAAAD5/rSpJbW3JaMQCWKaYomz89Wtt6GDLTo2diYemAYZgAAAAAAC4tyr+gz8cfabLprHhdfou0k9NH4zyftvm9f23G02OD4+osEbAAAAABUv2UPabqyHu9vv7T5zisp6efx7JZU4fPddXHd4ryXv/mlf3Hm8W11lf2tojaAAAAkjvRvPWfJvYbDidhu9Rt7HhcPIjmnXh5kF6bLg1GJsMDTZ+Rc90XO0/wBSiGv3gAAAK0Gw6fjNvtrfZdtzO8tvme1gsw9nh32HZjzhs9Tna+M8nzX0Lznz33HarLwqr6OGO8AAAACuTi1nHqu+8y9X9vIrci/1c3AmTENmTZE8Ty255Gu7qsVaaLkEgAAAAAL7CJEYkRiSlgrQSAAAAAAAAAAAAAAAAB//xAA0EAACAQMDAgMFBwQDAAAAAAABAgMABBEFEiETMQYiURQwUmFxFRYgMkBBkSNQgZJTgsH/2gAIAQEAAT8AoAsQACSaSCZ/yoTTxvG211IPofxCGVlDKjEH0oQylgvTbJ7ZGKMMqjLIwHzGKNtOO8b/AMUbeb/jb+KEMpAIRiD6DNNDKgJaNgM4yR7tWKkEHBFLLIvZiOc0zMxyxJP4kllXAVyMdsUiux7mlhlk/MzGhbXJHdqaGaPsTTdZF2hiBTySkbWdiPTP6OKMtVjp7ysoC8kgCrPwzd7lDwMvzYcCodNsolCR2gnAbzuyhv8AXFXvh8yndaozof8ALL8mxWp6Lc2uOrEyZzjcMZxU8RUmiMH9AFJqK2ZiOKs9OZscV4ftvZ5OUG112nira2aMv1GY4baBuPepopRJGQ4P0AFS25dSpbzFTgjy4/wK1G2f2AozZMj5wecBavdOYE8VPasp7UyEe+Vc1b2xYjirDTixHlrTtFYhSV49ags4YVACgmiM71YYyc0qnHmjLH1oAqWZu+MAV7IkseJFP1rUNEOGKrkYrUNNKk+Wrm2Kk8U6Y94Bk1BFuIrR9JluGUKhPIrTtHt4FUuVZscgGvKOOK3D1FZHqKaMM3lagoUVkeoo4xV9ptrdAksqt+5rWNHlgLErkeo5H81cw7SaYY93H3qyUFlqxYxaXA1t5cnErDht319KsJo9qq4IbPcUyKwLZPaozucLUi7VCr3Y0jtFLg1O2Is1BtcNknimc7JsNkBeDUSLPcbHJxz2q7SP+rDE4lh6EjFTyFIH5q1BAGapBz7tO9WLgOua0W6tfZYBblBIFHWDttDH5Zr2Qlg6iNV+T5FLs2BQwPHrUdu6uGOKaIs+7OPSpbZmbIOaZGaEJxn61FbBVbfSqxjePKnIOOa9jaNyzhWGCdu7k1LFH0LhJJUWFvPncN64Hw1qLDe1Sd/direTBqxumUrzUFwx0qNs4/qH/tWmgSRs5Y8GjOwjOOfNtBpbp0l2uTwcEVOxERZTVqesWyx4rccyoGJAU8+lQXIjlJPwmrhmFq9yPM5GAfhrUrlyXyau5CWNMcn3kbYNWs2CK0do59IdOvErtKDh3C8LVoLe2hbqywuxIC7XzU9xApDm4QIgG3YwY5+lO8VyRJHdLnOD1CEoSKbVo2nh3dh5xUIgiSRpZozxxtcE1DLEiSIZ4sHODvFW6RwzdWSeAgAkYkHeo7mNiJYpYVRx50dwvNeIxDBdypFIrJ3Uqc8Gp3yT70VG+DWnyXDglAxVdu5gDhdxwMn9s1baFqLorEYyAaPh6/Nfd++BA/8AaGg6hX2Ff19hX2SAafQL8g4rVBc2MjRyZDCri5L5yads++BxWk6rJZNOE2jrII3YjLbM5IHpn96g8WaY6Rl0cOEVT5h+1febSfR/9h6Yp/FOluqqQ/Ax+YUPFGlAg7X+m4UfFOmZUjfwQe45xT+KNLd92HHrhhUnifSSDlJD9HrxNrMV/dPJGCAaMhNE/oBI47Ma6snxGurJ8RrqyfEa6snxmurJ8RrqSfEaJJ7n+9//xAAoEQABAwIDBwUAAAAAAAAAAAABAAIRAyEEEjEgIiMwQVKhEEBRYWL/2gAIAQIBAT8ARyRaZ9Rlm8oNaflZG/pEMA6zymsJVGg2ASjSa4RCr0YNkQRyKbC4qlhwBJUBQnU2uCr4ci40REbeF1N+iZMQUAYV7q8Igxoqmp26boKYZynpCLvtE3CJO6sQdwEFON9sFYYsM53KMP3eVwO/yuB3eVVcM5DTI9//AP/EAC4RAAICAQMBBgMJAAAAAAAAAAECAxEABAUSMRMgITBBUVSBkgYUJEBhcpHR4f/aAAgBAwEBPwDuHHmVOpwauMmgcVw3TytRqo4lNnN03qbtHSNgAB4epOQ7jNE4cS2W62Sc2jdTKlSEWDVjEkVwCD5Gu1iQRlmYADNy3t5mKxdPfO0ckliSThcfzkOtnhfkp+WbPvaS0jGm9jkTh1B7zdDn2jLBIzwLAPdenzzUlS4dCbPUe2Oy8xTeAGMUYxtYv1wlCxINixkTqZAVckUBWaG+zXv6zTh1PhmsiC9vGLDdqaAGRwgi2SlPrR8DiRVHIvjy5UKGRKoWYEHoK/XNjQfeWjZPHqP6yBOKDvsvIZv0esiMR0sPK75GrrOe9fDmv2Ze8/DH6MU7zY/DH6P9zbNO500TzRhZCo5DAKHkUDnFfYZxX2GcV9h+T//Z",
    zp = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQgBAQACAwEBAAAAAAAAAAAAAAADBAECBQYH/9oADAMBAAIQAxAAAAD5/wDfKi9Qp2UHurxctsL9i/nKny7nHlNYo8uUlg91z498AAAFy3Oz2I1IW7FqO27WNyi87lQM7ib8PAsbZbNfm8GWaapHb5D6W7GVYl94NeksyNxmrTOh6Bp0zMS+ow8eatEOKPOTcJOW70UkNt5MeiVdSc2XlrqQ5b71EctdSGkYHRm0HLPepNZ+W+dTHLaeqDldHVoCXXTM61d9JLDinzU5Bzlu9l9l432bwt/YardPjOvWpqKvKKirykVqK8Ka7GQWynK55RSZOm7hqNuHjNq9Z+v8WHFflpyDnLd6neuZ18bXs7jjkz9jccHY3HB2Nyrss3Ij3uh5xvbjiDsdjccHY3HB2HWtDszaZleDneq2hxT5qbhJy3eibN6zWqBroABXJxLMcrh4xgMSgAAZOfgZ97ow4o85NQ/s08/RCrNuaQrGJpCiaQomkKJpCiaQomkKJpCiaQonsGPoxrSqUqHTwAAAAAAAAAAAAf/EACMQAAAFBAMBAQEBAAAAAAAAAAIDBAUVARIUFgAGExAwIED/2gAIAQEAAQIA4EJSU0n+aJqJhEDS1TYwyPyCIB4zOW+PwCmpxhmYBWFSYfylKU/ssrCwjSCE4RCZ9dM68WwrAqmBe2mJRtsIFEhbBF4WFhDL+M9TXaYVLSySkmEYnUJ3UqiU9OSlKCvbiULMqQIvaYmCHV5+tPDg0IxvDw8PDxqR4Jl64zH8PCifwxsYRKajx9aeAJbmDU9T1PU9T1PU9T1PU9T1PU9T1PUxdTdGIJbx9aeIg9aLqbf6iO9AGX+tTKDCaIVDanVH687eA6jx9aeIa9bGEmiYJHl4FlCJoTQiwwgQaleAyKEUp24R1Xj608KOaOxbft+37ft237ft+37dt+37dt+37eLt712Ghjx9aeHCCqzs7Ozs7Obj9Uc+udsIzs7Ozs7OqtGpTVePrTxR+BZk6J7VLPwS8ePrTxR/kS8ePrSYY3xsbGxsbGxsbGxsbGxsbGxsbGxpSB2M5bSl111111111111111111111aWx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx/wD/xAA5EAABAwIDAwgJAwUBAAAAAAABAAIDBBESUVQhkZMQEzFBYnGS0QUUIiRSYXOhsSMwMiAzgYLBQP/aAAgBAQADPwBOcQ1oJJ6AFUS/wjJUkL8EjcLsv6p3RiRsZLT0EKcvazmnBzr2BFr271M1uN0bg29rkWVSwkGF+66nAuYn7lOWtcInEOFwQLqZgJdE4AG1yNn7bmODmkgjoKmZ/F5G2+xPkOJ7i42tc8hte2xSAYi2w5Z4w0MlcAOixUpNzI69iOnPpVU8HG95Bte5yVVe/PP3qoYbtlPX91VMiwNkcGKoe2z5XFuRPISLono/YfIbNCnyU+SfEAXDpUTvR0bHRkMMEspN9mKNwAf/AKqSKd0MhrIoQ8MYwMBjw/N/zVK18rp2TxtMsgjYwB5DWHr7s1FE4Rz+sF77uZzTQ8YMyntnY0YsALmv2i4cwXcB3BUjZBidO6wBLWgOdZwu02H3VLHggbT1Doud5iRg2m2DEGC2+6LS0Q48WKO4fYbJjZm8r1aSLBidHJiDSbXuw4XCw+axQH0b6s8SRsBDr7DM0YngdRu1RT0RY+J7I4IopC7EPZDhief9lRPsWPnAL8HtgNIfbFY5AhUlLTQxilq3xzlwf7NnktthOHskr1V0sT4HnHO2M2cATG9pdgPzKxzuY0bSVPkp8lP8Kcw2cOXCZHDpDHn7KpbI4B7t6qvjdvU1SGh7iQCo3egsYijx8xIMeP55fFkpof0jTSz7LYnTgxHZ0gFSS1EcrQZogzmXczLhOJmwuN+pyeyazafEwlpa+GYAsAFsDr71JG+ZrPR7JsTnubIyUYRjFrG/wqajpXSNayJ5MQDo3nHsbttb7qdj3TtihcRPjEbZNrmlgaQ05A7U9kgkFCJw9kfsiUYmOZ8RPW6+1Gpmo5RDEebE7zGX7XkPsGH/AIqU1opGlzqmN98Rl/Se8bSAPn0KeeGsEMcMWIRljRJtdhBu0J4jhPqoBEpMnPzBxIDDYk5XU1RF/EzSQg3vLaRwkFrgn4UGS1TJhHMRM1wLpdrQW3s45Zp0FWZGHa1xsQqr43b1VfG7eql8li929e8v7+XZL9N/4RMru9OKfkpVLl9lLkpcvspVKVLkhFSx08tCyUMc4tJJafa7lNV1DpubawWADWjYABYBSXupVLa1vspApclJkU/JOCtKF7y/v5dkv03/AIWOd3ep6ppMUJfa17Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTOVRRtBmhczFe1+uywTL3l/fy/wB36b/wgag96DIZfmGqMC5cOr7pmYTLs7Rso2329BF0y4GLpTHlwbttZMBIv0Dao9ntdKjAviCaSLEbRdMcwOvYEH7INaXHoATSG32E9SjAJvexA3pgNiVHa+LrtyB0FP8AIPVqhe8v7+X+79N/4Vqj/KDoZe5qDSDiJsRb/CaCDidsFvtZBotjP8sS7WzFcC3zum4g66wX9om4A7gEHOeS7+QssNsLrHr2DagCfaNtn2N17Ydi6ARZEsDQSdp67WBQc1zT1iyBI2kAAAjOyGEjGegAHK20LE7FiN7f8srtaH2FidxRBccRN/sgIIO56vUL3l/fy/3fpv8AwsE571JRMcIy32rXuL9Cmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8KntsMfhU1e1gkLLMvbCLdKxzr3l/fy7Jfpv8Awi2Z3enN60/NPzKfmU/Mp+ZT8yufrYI33LXOsV6IHTBMe55XoymgY+OGQEyBvtPv0qH0V6VNNTYgwRMdtNzdyfmU/Mp+ZT8yn5lPzKfmnO61eYL3l/fy7Jfpv/C/Vd+w+N7XscQ4dBXpbX1HFf5r0o62Ksmdtv7T3O/KqKuTnJ5XPfa13G5/Z/VC95f38uyX6b/wv1Xf+T9UL3l/fyxtc8PcGgscLn5hUz3l3rEe8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqZjr+sR7z5Jj6h5Ybi/I74SnjoBU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aTz0gp3wlUGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bV//8QANREAAQIDAwkHAgcAAAAAAAAAAQACAwQRElORBRATFBUWIjRUBiAhMUFRYWJxMDI1UnJzsf/aAAgBAgEBPwBGzT1rnFPVcPyuD5XBT170tCEWM1hNAUWSAJGkiYICHbfoyS2z6pza0q1GEz9qa0CoDU6E3yA8UGggmlfRBrQRw0JT2tGjteDbXirMheRMFEgS+gdFhPcaOAIIzSPMsU5Ow5dzy9wAqtty163Fbclr1uK25LXrcVtyWvW4o5egEUMVmIW3Ja9bituS163Fbclr1uKg5Xl4rw1sRpJ+VCIdk+KfrbmkeZYu0tbMT2tKjPcrgRsUNCVRnuuH3RDfD7rgVGUHisnc7Bp7n/FKfpkT+bc0jzLFPyEOZL2vAIqt35a7C3flrsLd+WuwoXZiDFBLWMUTsvChgksYt35a7C3flrsLd+WuwoGRJeDEDxDAIUFtnJ8UfW3NI8yxP/O779wOcPIlFzj5k91nIxf7G5oEXQxWvpWiMzLkk6s3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lRZpjoJhMhBgJBP4/wD/xAA2EQABAwAGBwUGBwAAAAAAAAABAAIDBAURFCFSEBIVQVFUkRMgNHOxBiIxM2FxIzA1RFOBkv/aAAgBAwEBPwDSCD8DotWPfosLZ52RuNgKMdWgkdrJgcqrp0THQCJztQygAnDcoZuzLyyYNBaLXAjGz+8CfqmVnSbR+OCXN3loHqpZnvEUsk+sLHBotA97BUespbA98gLADbiMpPHiFJO5j4mmQstIfrHiSAXDH4FPnmlY93bFzIyLRrAYm0DEFVVKJaVNrvJFkes4fXeBatSrf5Zf8qWj0a7Omhe42OAII46Ku8XGhA6SRwA3lXCXIVcJMh6LZ8mQ9FcJMhTKnayQyNidrG3jvxKuEmQq4SZCrhJkKfQ5GAktKYLKum8xvodFXeLjVBs7Z33K97gveWKxWKFqxVruCpPyHr9hP5rfQ6Ku8XGm0h0UjiDvK2jLmK2jLmK2jLmKrL2qhq18bJ+0JeCRqqge1sFOlbHEZASHHEZVtGXMVtGTMVtGXMVJTpHtLS42Jhtq6fzG+h0Vd4uNSfMf9z3HwxSEF8bXfcWpkEDDrMiY08QO7H+nTeY30OijzGCZsgFtm5Gl0Ukk0RvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUqamRvgMMcAYC4E/n//Z",
    Hp = V('<div class="absolute origin-top-left bg-black"><img class="absolute top-0 left-0 wh-full object-cover"><img>'),
    Up = "absolute top-0 left-0 wh-full object-cover",
    Fp = () => (() => {
        const e = Hp(),
            n = e.firstChild,
            t = n.nextSibling;
        return e.style.setProperty("width", "150px"), e.style.setProperty("height", "85px"), e.style.setProperty("transform", "translate(403px, 924px) rotateZ(-4deg)"), oe(n, "src", Np), oe(t, "src", zp), Q(() => te(t, ce(Up, {
            hidden: !Ye.archive.hasNew()
        }))), e
    })(),
    Gp = V('<div class="absolute top-0 left-0 wh-full isolate">'),
    Zp = e => {
        const [n, t] = Z(!1), i = ct(() => ln() ? [ln().srcWebm, ln().srcMp3] : []), l = ct(() => [pi().srcWebm, pi().srcMp3], {
            loop: !0,
            autoplay: !0
        }), u = ct([lu, cu]);
        (async () => {
            await eo(6e4);
            const p = u.internalInstance();
            p && (p.on("end", async () => {
                await eo(6e5), u.play()
            }), u.play())
        })();
        const f = p => {
            if (p === "answering-machine") {
                const o = i.internalInstance();
                if (!o) return;
                const a = o.playing(),
                    d = o.seek() === 0;
                if (St.options.muted && !a && d) return;
                ie.trackClickEvent("answering-machine", a ? "pause" : "play", "cctv-room"), a ? (l.setVolume(1), u.setVolume(1), i.pause()) : (l.setVolume(.1), u.setVolume(.1), i.play(), d && (Ye.answeringMachineTrack.setLastPlayed(), o.once("end", () => {
                    i.stop(), l.setVolume(1), u.setVolume(1)
                })))
            } else p === "log-book" && (ie.trackClickEvent("logbook", "open", "cctv-room"), e.roomSound.play("logbook-open")), p === "terminal" && (ie.trackClickEvent("terminal", "open", "cctv-room"), e.roomSound.play("terminal-open")), xe.openApp(p)
        };
        return (() => {
            const p = Gp();
            return C(p, S(po, {
                get each() {
                    return ge.screens
                },
                children: o => S(Ip, {
                    screen: o,
                    onClick: () => {
                        var a;
                        if (o.isEnabled() && o.position() === "c") n() || (ge.Supervisor.dispatch("play"), t(!0)), !!((a = ge.Supervisor.currentFeed()) != null && a.archivePlaylist) && ge.Supervisor.setControlsVisible(!0);
                        else {
                            if (Fe().isFinal && o.position() === "tr") return;
                            ge.Supervisor.positionScreenAtCenter(o)
                        }
                        e.roomSound.play(aa(["screen-tap-1", "screen-tap-2", "screen-tap-3"]))
                    }
                })
            }), null), C(p, S(Fp, {}), null), C(p, S(Ep, {}), null), C(p, S(Vp, {}), null), C(p, S(jp, {
                onItemSelected: f
            }), null), C(p, S(Le, {
                get when() {
                    return ge.Supervisor.controlsVisible()
                },
                get children() {
                    return S(hp, {})
                }
            }), null), Q(() => (st.currentStatus() === Ut.done ? "visible" : "hidden") != null ? p.style.setProperty("visibility", st.currentStatus() === Ut.done ? "visible" : "hidden") : p.style.removeProperty("visibility")), p
        })()
    },
    Wp = V('<div class="absolute top-0 left-0 wh-full z-modal">'),
    pr = e => S(Le, {
        get when() {
            return e.isOpen
        },
        get children() {
            const n = Wp();
            return C(n, () => e.children), n
        }
    }),
    Yp = "/assets/logbook-36af03c8.mp3",
    qp = "/assets/logbook-dccdaf17.ogg",
    Kp = V('<div><img><img><img class="absolute left-1/2 w-1/2 h-full"><img><img><div class="absolute top-0 left-0 wh-full flex"><button class="flex-1"></button><button class="flex-1"></button></div><button class="absolute top-20 left-20 w-100 h-100 flex-center">'),
    Qp = () => [...Xs().map(e => e.srcPng || e.srcJpg), null].reverse(),
    rn = () => ra(Qp()).map((e, n) => ({
        index: n,
        left: (e == null ? void 0 : e[0]) || null,
        right: (e == null ? void 0 : e[1]) || null
    })),
    Jp = e => {
        const n = [],
            [t, r] = Z(!1);
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
        const [i, s] = Z(rn().length - 1), [l, u] = Z([]), c = () => {
            const v = i() - 1;
            return rn()[v] ? !l().includes(v) : !1
        };
        pe(() => {
            const v = i() - 1,
                g = rn()[v];
            if (!g || l().includes(v)) return;
            const m = [g == null ? void 0 : g.left, g == null ? void 0 : g.right].filter(h => !!h).map(h => {
                if (h) return oa(h)
            });
            Promise.allSettled(m).then(() => {
                u([...l(), v])
            })
        });
        const f = () => {
                !c() && i() !== 0 && (ie.trackClickEvent("pages", "prev", "logbook"), s(v => v - 1), d.play("page-turn", {
                    interrupt: !0
                }))
            },
            p = () => {
                i() >= rn().length - 1 || (ie.trackClickEvent("pages", "next", "logbook"), d.play("page-turn", {
                    interrupt: !0
                }), s(v => v + 1))
            },
            o = () => rn()[i()],
            a = () => i() === 0,
            d = ct([qp, Yp], {
                sprite: {
                    "page-turn": [0, 933.3333333333334]
                }
            });
        return (() => {
            const v = Kp(),
                g = v.firstChild,
                m = g.nextSibling,
                h = m.nextSibling,
                y = h.nextSibling,
                w = y.nextSibling,
                b = w.nextSibling,
                P = b.firstChild,
                H = P.nextSibling,
                Y = b.nextSibling;
            return $e(B => n.push(B), g), oe(g, "src", na), $e(B => n.push(B), m), oe(m, "src", ea), $e(B => n.push(B), h), oe(h, "src", ta), $e(B => n.push(B), y), $e(B => n.push(B), w), P.$$click = () => f(), H.$$click = () => p(), Y.$$click = () => {
                e.onClose()
            }, C(Y, S(se, {
                size: "terminal-lg",
                class: "text-purple leading-none tracking-[-10px]",
                children: "<-"
            })), Q(B => {
                var k, x, A, E, $, U, G, K;
                const j = ce("wh-full flex relative", !t() && "invisible"),
                    N = ce("absolute w-[calc(50%+2px)] h-full", !a() && "invisible"),
                    L = ce("absolute w-[calc(50%+2px)] h-full", a() && "invisible"),
                    J = ((k = o()) == null ? void 0 : k.left) || void 0,
                    de = ce("absolute w-1/2 h-full pointer-events-none pl-[99px] pr-52", !((x = o()) != null && x.left) && "invisible", ((E = (A = o()) == null ? void 0 : A.left) == null ? void 0 : E.endsWith(".jpg")) && "mix-blend-multiply"),
                    M = (($ = o()) == null ? void 0 : $.right) || void 0,
                    I = ce("absolute w-1/2 left-1/2 h-full pointer-events-none pl-52 pr-[99px]", !((U = o()) != null && U.right) && "invisible", ((K = (G = o()) == null ? void 0 : G.right) == null ? void 0 : K.endsWith(".jpg")) && "mix-blend-multiply");
                return j !== B._v$ && te(v, B._v$ = j), N !== B._v$2 && te(g, B._v$2 = N), L !== B._v$3 && te(m, B._v$3 = L), J !== B._v$4 && oe(y, "src", B._v$4 = J), de !== B._v$5 && te(y, B._v$5 = de), M !== B._v$6 && oe(w, "src", B._v$6 = M), I !== B._v$7 && te(w, B._v$7 = I), B
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
const Xp = e => S(pr, {
        get isOpen() {
            return xe.currentOpenApp.mainApp === "log-book"
        },
        get children() {
            return S(Jp, {
                onClose: () => {
                    var n;
                    ie.trackClickEvent("modal", "close", "logbook"), xe.closeApp(), (n = e.onClose) == null || n.call(e)
                }
            })
        }
    }),
    eg = "/assets/terminal-2aa26d8b.mp3",
    tg = "/assets/terminal-ca9f8876.ogg",
    fa = Ka(),
    ng = e => {
        const n = ct(e.src, e.options);
        return S(fa.Provider, {
            value: n,
            get children() {
                return e.children
            }
        })
    };

function qt() {
    const e = os(fa);
    if (e === void 0) throw new Error("useAudio must be used within a AudioProvider");
    return e
}
const rg = "\n      @@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@@\n @@                          @@@@@\n@                         @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@ \n@                         @@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
    og = "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n     @@      @@@@@@@@      @@  @@\n      @@  @@@@@@@@@@@@@@@@@@  @@\n       @@  @@@@@@@@@@@@@@@@  @@\n        @@  @@@@@@@@@@@@@@  @@\n         @@  @@@@@@@@@@@@  @@\n           @@  @@@@@@@@  @@\n             @@  @@@@  @@\n              @@  @@  @@\n             @@  @@@@  @@\n           @@     @@     @@\n         @@                @@\n        @@        @@        @@\n       @@       @@@@@@       @@\n      @@      @@@@@@@@@@      @@\n     @@     @@@@@@@@@@@@@@     @@\n    @@    @@@@@@@@@@@@@@@@@     @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@                          @@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
    ig = "\n _   ____                       _ _              _    _           _     _\n| | / ___|  ___  ___ _   _ _ __(_) |_ _   _     / \\  | | ___ _ __| |_  | |\n| | \\___ \\ / _ \\/ __| | | | '__| | __| | | |   / _ \\ | |/ _ \\ '__| __| | |\n|_|  ___) |  __/ (__| |_| | |  | | |_| |_| |  / ___ \\| |  __/ |  | |_  |_|\n(_) |____/ \\___|\\___|\\__,_|_|  |_|\\__|\\__, | /_/   \\_\\_|\\___|_|   \\__| (_)\n                                      |___/\n",
    sg = "\n    __\n   / /\n  / /\n / /\n/_/\n",
    ag = "\n _\n(_)\n _\n(_)\n",
    lg = {
        archive: rg,
        timecoder: og,
        securityAlert: ig,
        forwardSlash: sg,
        colon: ag
    },
    cg = V("<span>"),
    xt = e => (() => {
        const n = cg();
        return C(n, () => lg[e.name]), Q(() => te(n, ce("font-vt-220 font-medium leading-none whitespace-pre", e.class))), n
    })(),
    ug = V("<span>Security Archives"),
    fg = V("<span>Time Coder"),
    dg = V('<div class="wh-full flex justify-center space-x-368 items-end pb-144"><div class="flex flex-col items-center space-y-56" role="button"></div><div class="flex flex-col items-center space-y-56 text-shadow-terminal" role="button">'),
    Vi = wn("relative inline-block w-[600px] text-center py-8", {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black [&>span]:text-shadow-none", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light text-shadow-terminal border"
            }
        }
    }),
    pg = e => {
        const n = qt(),
            [t, r] = Z();
        let i;
        const s = l => {
            n.play("click", {
                interrupt: !0
            }), r(l), clearTimeout(i), i = setTimeout(() => {
                ie.trackClickEvent("items", "open-".concat(l), "terminal-home"), e.setCurrentOpenApp(l)
            }, 1e3)
        };
        return _e(() => {
            clearTimeout(i)
        }), (() => {
            const l = dg(),
                u = l.firstChild,
                c = u.nextSibling;
            return u.$$click = () => s("security-tape-archives"), C(u, S(xt, {
                name: "archive",
                class: "text-purple text-[21px] text-shadow-terminal"
            }), null), C(u, S(se, {
                size: "terminal-md",
                get class() {
                    return Vi({
                        selected: t() === "security-tape-archives"
                    })
                },
                get children() {
                    return ug()
                }
            }), null), c.$$click = () => s("timecoder"), C(c, S(xt, {
                name: "timecoder",
                class: "text-purple text-[18px] text-shadow-terminal"
            }), null), C(c, S(se, {
                size: "terminal-md",
                get class() {
                    return Vi({
                        selected: t() === "timecoder"
                    })
                },
                get children() {
                    return fg()
                }
            }), null), l
        })()
    };
Ie(["click"]);
const gg = V('<div class="absolute top-0 left-0 wh-full flex flex-col items-center pt-72 bg-terminal"><img class="block w-[732px] mb-32 text-blue-light drop-shadow-terminal transform-gpu" width="873" height="621"><div class="flex space-x-32 text-blue-light"><div class="bg-blue-light shadow-terminal"></div><div class="w-24 h-full bg-blue-light shadow-terminal">'),
    vg = () => {
        const [e, n] = Z(!0), t = setTimeout(() => n(!1), 1e3);
        return _e(() => clearInterval(t)), S(Le, {
            get when() {
                return e()
            },
            get children() {
                const r = gg(),
                    i = r.firstChild,
                    s = i.nextSibling,
                    l = s.firstChild;
                return oe(i, "src", wo), C(r, S(se, {
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
    hg = 10,
    Ni = e => {
        const n = Os(e);
        return {
            date: n.format("DD.MM.[1995]"),
            time: n.format("HH:mm")
        }
    },
    mg = (e = {}) => {
        const [n, t] = Z(Ni(e.timezone)), r = () => {
            const s = Ni(e.timezone);
            t(s)
        }, i = setInterval(() => r(), hg * 1e3);
        return _e(() => clearInterval(i)), n
    },
    zi = V("<span>"),
    _g = V("<span>Starr Park Security System"),
    yg = () => {
        const e = mg({
            timezone: Ss
        });
        return S(se, {
            as: "p",
            class: "flex justify-between items-center px-144 pt-64 text-blue-dark text-shadow-terminal",
            size: "terminal-sm",
            get children() {
                return [(() => {
                    const n = zi();
                    return C(n, () => e().date), n
                })(), _g(), (() => {
                    const n = zi();
                    return C(n, () => e().time), n
                })()]
            }
        })
    },
    bg = V('<div><div class="flex w-full"><button><span>&lt;-</span></button><div class="flex items-center flex-1 h-full px-32 bg-blue-light text-blue-light shadow-terminal"></div></div><div class="flex-1 min-h-0 px-100">'),
    wg = "w-100 h-100 flex-center font-vt-220 font-medium leading-none text-shadow-terminal",
    Hr = e => {
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
            const r = bg(),
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
                const f = ce("flex flex-col flex-1 pt-64 px-44"),
                    p = ce(wg, "text-purple text-[80px] tracking-[-10px]");
                return f !== c._v$ && te(r, c._v$ = f), p !== c._v$2 && te(s, c._v$2 = p), c
            }, {
                _v$: void 0,
                _v$2: void 0
            }), r
        })()
    };
Ie(["click"]);
const Ag = "/assets/terminal-typing-8b10cd31.mp3",
    xg = "/assets/terminal-typing-20a23c49.ogg";
class da extends Error {
    constructor(t, r) {
        super(r);
        ti(this, "statusCode");
        this.statusCode = t, Object.setPrototypeOf(this, new.target.prototype)
    }
}
const Sg = "https://bmwryv10bd.execute-api.us-east-1.amazonaws.com",
    pa = {
        base: "".concat(Sg),
        getArchiveByCode: e => "".concat(pa.base, "/timecoder/").concat(e)
    },
    Tg = async ({
        params: e
    }) => {
        const n = pa.getArchiveByCode(e.code),
            t = await fetch(n, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        if (!t.ok) throw new da(t.status, "Unable to fetch ".concat(n, ": ").concat(t.status, " ").concat(t.statusText));
        return await t.json()
    }, kg = V('<div class="flex flex-col space-y-120 w-full pt-72 pb-32"><div class="flex justify-between"><div class="flex space-x-24 items-center"></div><div class="flex space-x-24 items-center"></div></div><div class="flex flex-col space-y-48 items-center"><button class="inline-flex px-120 py-8 text-blue-light border text-shadow-terminal">'), $g = V('<input pattern="[0-9]*" inputmode="numeric">'), Ig = {
        day: "00",
        month: "00",
        year: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
    }, Wn = "text-blue-light text-[20px]", Pg = e => {
        const [n, t] = Wt(Ig), r = qt(), i = {
            "typing-1": [0, 200],
            "typing-2": [2e3, 166.66666666666652],
            "typing-3": [4e3, 183.33333333333357],
            "typing-4": [6e3, 183.33333333333357],
            "typing-5": [8e3, 199.9999999999993],
            "typing-6": [1e4, 233.33333333333252],
            "typing-7": [12e3, 250]
        }, s = ct([xg, Ag], {
            sprite: i
        }), [l, u] = Z(void 0), [c, f] = Z(!1), p = (g, m) => {
            t(g, m), s.play(aa(Object.keys(i)))
        };
        let o;
        const a = async () => {
            r.play("click", {
                interrupt: !0
            }), f(!0), u(void 0);
            const g = Object.values(n).join("");
            let m;
            try {
                m = await Tg({
                    params: {
                        code: g
                    }
                })
            } catch (h) {
                return ie.trackClickEvent("timecoder", "submit", "terminal-timecoder", {
                    archiveCode: g,
                    result: "error"
                }), h instanceof da && h.statusCode === 404 ? (r.play("timecoder-error", {
                    interrupt: !0
                }), u("Archive not found!")) : (r.play("timecoder-error", {
                    interrupt: !0
                }), console.error(h), u("Something went wrong. Try again later."))
            } finally {
                f(!1)
            }
            ie.trackClickEvent("timecoder", "submit", "terminal-timecoder", {
                archiveCode: g,
                result: "success"
            }), e.onLoadPlaylist(m)
        };
        _e(() => {
            clearTimeout(o)
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
            const g = kg(),
                m = g.firstChild,
                h = m.firstChild,
                y = h.nextSibling,
                w = m.nextSibling,
                b = w.firstChild,
                P = d;
            return typeof P == "function" ? $e(P, m) : d = m, C(h, S(Ct, {
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
                class: Wn
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
                class: Wn
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
                class: Wn
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
                class: Wn
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
            [t, r] = Z(0),
            i = c => {
                const f = c.target,
                    d = f.value.replace(/[^0-9]/g, "").slice(-2).padStart(2, "0");
                e.onChange(e.name, d), f.value = d, t() === 2 && e.onNextInputFocus(f)
            },
            s = c => {
                n.play("click", {
                    interrupt: !0
                });
                const f = c.target;
                f.setSelectionRange(f.value.length, f.value.length)
            },
            l = c => {
                const f = c.key;
                (f === "Delete" || f === "Backspace") && r(p => p !== 0 ? p - 1 : p), /^[0-9]$/.test(f) && r(p => p + 1)
            },
            u = c => {
                r(0)
            };
        return (() => {
            const c = $g();
            return c.addEventListener("focus", u), c.$$click = s, c.$$keydown = l, c.$$input = i, Q(f => {
                const p = ce(Sn({
                        size: "terminal-xxl"
                    }), ["w-192 text-center bg-transparent caret-transparent focus:outline-none", "border-b-2 border-purple text-green drop-shadow-terminal focus:border-b-4"]),
                    o = e.name,
                    a = "".concat(e.name, "-input");
                return p !== f._v$ && te(c, f._v$ = p), o !== f._v$2 && oe(c, "name", f._v$2 = o), a !== f._v$3 && oe(c, "id", f._v$3 = a), f
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }), Q(() => c.value = e.value), c
        })()
    };
Ie(["click", "input", "keydown"]);
const Og = V('<div class="wh-full flex flex-col w-full pb-48"><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible"></button><div class="flex-1 flex flex-col"></div><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible">'),
    Hi = V("<span>"),
    Dg = V('<button class="py-16 px-32 text-green text-shadow-terminal">'),
    Yn = 7,
    Eg = e => {
        const n = qt(),
            [t, r] = Z(0),
            i = () => Math.ceil(gn().length / Yn),
            s = () => gn().slice(t() * Yn, t() * Yn + Yn);
        return (() => {
            const l = Og(),
                u = l.firstChild,
                c = u.nextSibling,
                f = c.nextSibling;
            return u.$$click = () => {
                ie.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"), n.play("click", {
                    interrupt: !0
                }), r(p => p - 1)
            }, C(u, S(se, {
                size: "terminal-md",
                class: "-rotate-90",
                children: ">"
            })), C(c, S(po, {
                get each() {
                    return s()
                },
                children: p => {
                    const o = Ps(p.postDate, p.dropTime.hours, p.dropTime.minutes),
                        a = oc(o, "DD.MM.[1995] HH:mm"),
                        d = a.split(" ")[0],
                        v = a.split(" ")[1];
                    return (() => {
                        const g = Dg();
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
                                    const m = Hi();
                                    return C(m, d), m
                                })(), " ", (() => {
                                    const m = Hi();
                                    return C(m, v), m
                                })()]
                            }
                        })), g
                    })()
                }
            })), f.$$click = () => {
                ie.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"), n.play("click", {
                    interrupt: !0
                }), r(p => p + 1)
            }, C(f, S(se, {
                size: "terminal-md",
                class: "rotate-90",
                children: ">"
            })), Q(p => {
                const o = t() === 0,
                    a = t() >= i() - 1;
                return o !== p._v$ && (u.disabled = p._v$ = o), a !== p._v$2 && (f.disabled = p._v$2 = a), p
            }, {
                _v$: void 0,
                _v$2: void 0
            }), l
        })()
    };
Ie(["click"]);
const Cg = V('<span class="text-black">Access Security System'),
    Mg = V('<div class="wh-full flex flex-col items-center space-y-76 pt-76 "><img class="w-[872px] drop-shadow-terminal text-blue-light transform-gpu" width="873" height="621">'),
    jg = e => {
        const n = setTimeout(() => e.setCurrentOpenApp("home"), 2e3);
        return _e(() => clearInterval(n)), (() => {
            const t = Mg(),
                r = t.firstChild;
            return oe(r, "src", wo), C(t, S(se, {
                size: "terminal-md",
                class: "px-16 py-8 bg-blue-light text-blue-light shadow-terminal",
                get children() {
                    return Cg()
                }
            }), null), t
        })()
    },
    Bg = V('<span class="text-black">unwatched security footage'),
    Lg = V('<div class="flex-1 pt-144 pb-124 px-144"><div class="relative wh-full flex flex-col space-y-92 items-center justify-center border-x-2 border-b-2 border-purple"><div class="absolute top-0 left-0 wh-full flex items-start"><div class="flex-1 border-t-2 border-purple"></div><div class="flex-1 border-t-2 border-purple"></div></div><div class="flex space-x-184"><button><span>Dismiss</span></button><button><span>Open'),
    Ui = wn(["relative px-24 py-8", Sn({
        size: "terminal-md"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light text-shadow-terminal border"
            }
        }
    }),
    Rg = e => {
        const n = qt(),
            [t, r] = Z();
        let i;
        const s = l => {
            n.play("click", {
                interrupt: !0
            }), r(l), clearTimeout(i), i = setTimeout(() => {
                l === "open" ? e.onLoadPlaylist() : ie.trackClickEvent("notification", "dismiss", "terminal-notification-screen"), Ye.archive.dismissNotification()
            }, 1e3)
        };
        return _e(() => {
            clearTimeout(i)
        }), (() => {
            const l = Lg(),
                u = l.firstChild,
                c = u.firstChild,
                f = c.firstChild,
                p = f.nextSibling,
                o = c.nextSibling,
                a = o.firstChild,
                d = a.nextSibling;
            return C(c, S(xt, {
                name: "securityAlert",
                class: "px-64 -translate-y-1/2 text-blue-light text-[32px] text-shadow-terminal"
            }), p), C(u, S(se, {
                as: "div",
                size: "terminal-xl",
                class: "px-56 py-32 bg-orange text-orange shadow-terminal",
                get children() {
                    return Bg()
                }
            }), o), a.$$click = () => s("dismiss"), d.$$click = () => s("open"), Q(v => {
                const g = Ui({
                        selected: t() === "dismiss"
                    }),
                    m = Ui({
                        selected: t() === "open"
                    });
                return g !== v._v$ && te(a, v._v$ = g), m !== v._v$2 && te(d, v._v$2 = m), v
            }, {
                _v$: void 0,
                _v$2: void 0
            }), l
        })()
    };
Ie(["click"]);
const Vg = V('<div class="realtive wh-full flex flex-col bg-terminal">'),
    Ng = e => {
        const n = () => xe.currentOpenApp.mainApp,
            t = () => xe.currentOpenApp.mainApp === "terminal" ? xe.currentOpenApp.terminalApp : void 0,
            r = (i, s) => {
                var l;
                ge.Supervisor.switchFeed({
                    archivePlaylist: {
                        playlistId: i.playlistId,
                        metadata: {
                            date: Ps(i.postDate, i.dropTime.hours, i.dropTime.minutes, i.dropTime.seconds)
                        }
                    },
                    source: s
                }), Ye.archive.setLastPlayed(i.postDate), (l = e.onPlaylistLoad) == null || l.call(e), xe.closeApp()
            };
        return S(pr, {
            get isOpen() {
                return n() === "terminal"
            },
            get children() {
                return S(ng, {
                    src: [tg, eg],
                    options: {
                        sprite: {
                            click: [0, 220.6122448979592],
                            "timecoder-error": [2e3, 283.3333333333332]
                        }
                    },
                    get children() {
                        const i = Vg();
                        return C(i, S(yg, {}), null), C(i, S(ps, {
                            get fallback() {
                                return S(jg, {
                                    setCurrentOpenApp: s => xe.openApp(s)
                                })
                            },
                            get children() {
                                return [S(jt, {
                                    get when() {
                                        return Ye.archive.hasNew()
                                    },
                                    get children() {
                                        return S(Rg, {
                                            onLoadPlaylist: () => {
                                                const s = gn()[0];
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
                                        return S(Hr, {
                                            title: "Security System",
                                            onBack: () => xe.closeApp(),
                                            get children() {
                                                return S(pg, {
                                                    setCurrentOpenApp: s => xe.openApp(s)
                                                })
                                            }
                                        })
                                    }
                                }), S(jt, {
                                    get when() {
                                        return t() === "security-tape-archives"
                                    },
                                    get children() {
                                        return S(Hr, {
                                            title: "Security Tape Archives",
                                            onBack: () => xe.openApp("home"),
                                            get children() {
                                                return S(Eg, {
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
                                        return S(Hr, {
                                            title: "Timecoder v2.1.0",
                                            onBack: () => xe.openApp("home"),
                                            get children() {
                                                return S(Pg, {
                                                    onLoadPlaylist: s => r(s, "timecoder")
                                                })
                                            }
                                        })
                                    }
                                })]
                            }
                        }), null), C(i, S(vg, {}), null), i
                    }
                })
            }
        })
    },
    zg = "/assets/cctv-room-2f2fa9dd.mp3",
    Hg = "/assets/cctv-room-e0e04e21.ogg";

function Ug(e) {
    const n = be({}, e),
        t = be({}, e),
        r = {},
        i = l => {
            let u = r[l];
            if (!u) {
                if (!rr()) return n[l];
                r[l] = u = Z(n[l], {
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
        l in n && (n[l] = fi(u, [n[l]]))
    };
    return [t, (l, u) => {
        if (Gl(l)) {
            const c = fe(() => Object.entries(fi(l, t)));
            ur(() => {
                for (const [f, p] of c) s(f, () => p)
            })
        } else s(l, u);
        return t
    }]
}
var ga = {
    width: null,
    height: null
};

function Ur(e) {
    if (!e) return be({}, ga);
    const {
        width: n,
        height: t
    } = e.getBoundingClientRect();
    return {
        width: n,
        height: t
    }
}

function Fg(e) {
    const n = typeof e == "function",
        [t, r] = Ug(n ? ga : Ur(e)),
        i = new ResizeObserver(([s]) => r(Ur(s.target)));
    return _e(() => i.disconnect()), n ? pe(() => {
        const s = e();
        s && (r(Ur(s)), i.observe(s), _e(() => i.unobserve(s)))
    }) : (i.observe(e), _e(() => i.unobserve(e))), t
}
const Gg = e => {
        const [n, t] = Z({
            x: 0,
            y: 0
        }), [r, i] = Z(1), s = Fg(e.containerRef);
        return pe(() => {
            if (!e.containerRef() || s.width == null || s.height == null) return;
            const u = ws(e.position) || {
                    x: 0,
                    y: 0
                },
                c = e.bgImageSize.width / e.bgImageSize.height,
                f = s.width / s.height;
            let p, o;
            e.fit === "cover" ? c <= f ? (p = s.width, o = s.width / c) : (p = s.height * c, o = s.height) : c <= f ? (p = s.height * c, o = s.height) : (p = s.width, o = s.width / c);
            const a = Math.round(p / e.bgImageSize.width * 1e3) / 1e3,
                d = (p - s.width) / 2,
                v = (o - s.height) / 2,
                g = p * u.x / e.bgImageSize.width - d,
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
    Zg = V("<div><video muted playsinline>"),
    Wg = 7.1,
    Yg = 7.7,
    qg = e => {
        let n;
        const [t, r] = Z(void 0);
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
            }), await eo(600), await n.play(), r("done"), e.onLoaded();
            const l = () => {
                !n || n.currentTime < Wg || (e.onEnded(), n.removeEventListener("timeupdate", l))
            };
            n.addEventListener("timeupdate", l);
            const u = () => {
                n && (n.currentTime = Yg, n.play())
            };
            n.addEventListener("ended", u)
        }), pe(rs(ge.Supervisor.allLoaded, i => {
            n && (i ? n.pause() : n.play())
        }, {
            defer: !0
        })), (() => {
            const i = Zg(),
                s = i.firstChild;
            s.addEventListener("error", u => {
                console.error("Error during transition video playback, skipping transition...", u), r("error"), e.onEnded()
            });
            const l = n;
            return typeof l == "function" ? $e(l, s) : n = s, Q(u => {
                const c = ce("wh-full", t() === "error" && "bg-black"),
                    f = fe(Fe).transitionVideoSrc,
                    p = ce("wh-full object-contain"),
                    o = t() === "done" ? "visible" : "hidden";
                return c !== u._v$ && te(i, u._v$ = c), f !== u._v$2 && oe(s, "src", u._v$2 = f), p !== u._v$3 && te(s, u._v$3 = p), o !== u._v$4 && ((u._v$4 = o) != null ? s.style.setProperty("visibility", o) : s.style.removeProperty("visibility")), u
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
    Kg = function() {
        return Tt.some(function(e) {
            return e.activeTargets.length > 0
        })
    },
    Qg = function() {
        return Tt.some(function(e) {
            return e.skippedTargets.length > 0
        })
    },
    Fi = "ResizeObserver loop completed with undelivered notifications.",
    Jg = function() {
        var e;
        typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
            message: Fi
        }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = Fi), window.dispatchEvent(e)
    },
    yn;
(function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box"
})(yn || (yn = {}));
var kt = function(e) {
        return Object.freeze(e)
    },
    Xg = function() {
        function e(n, t) {
            this.inlineSize = n, this.blockSize = t, kt(this)
        }
        return e
    }(),
    va = function() {
        function e(n, t, r, i) {
            return this.x = n, this.y = t, this.width = r, this.height = i, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, kt(this)
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
                f = n.height;
            return {
                x: t,
                y: r,
                top: i,
                right: s,
                bottom: l,
                left: u,
                width: c,
                height: f
            }
        }, e.fromRect = function(n) {
            return new e(n.x, n.y, n.width, n.height)
        }, e
    }(),
    So = function(e) {
        return e instanceof SVGElement && "getBBox" in e
    },
    ha = function(e) {
        if (So(e)) {
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
    Gi = function(e) {
        var n;
        if (e instanceof Element) return !0;
        var t = (n = e == null ? void 0 : e.ownerDocument) === null || n === void 0 ? void 0 : n.defaultView;
        return !!(t && e instanceof t.Element)
    },
    ev = function(e) {
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
    fn = typeof window < "u" ? window : {},
    qn = new WeakMap,
    Zi = /auto|scroll/,
    tv = /^tb|vertical/,
    nv = /msie|trident/i.test(fn.navigator && fn.navigator.userAgent),
    Ve = function(e) {
        return parseFloat(e || "0")
    },
    Vt = function(e, n, t) {
        return e === void 0 && (e = 0), n === void 0 && (n = 0), t === void 0 && (t = !1), new Xg((t ? n : e) || 0, (t ? e : n) || 0)
    },
    Wi = kt({
        devicePixelContentBoxSize: Vt(),
        borderBoxSize: Vt(),
        contentBoxSize: Vt(),
        contentRect: new va(0, 0, 0, 0)
    }),
    ma = function(e, n) {
        if (n === void 0 && (n = !1), qn.has(e) && !n) return qn.get(e);
        if (ha(e)) return qn.set(e, Wi), Wi;
        var t = getComputedStyle(e),
            r = So(e) && e.ownerSVGElement && e.getBBox(),
            i = !nv && t.boxSizing === "border-box",
            s = tv.test(t.writingMode || ""),
            l = !r && Zi.test(t.overflowY || ""),
            u = !r && Zi.test(t.overflowX || ""),
            c = r ? 0 : Ve(t.paddingTop),
            f = r ? 0 : Ve(t.paddingRight),
            p = r ? 0 : Ve(t.paddingBottom),
            o = r ? 0 : Ve(t.paddingLeft),
            a = r ? 0 : Ve(t.borderTopWidth),
            d = r ? 0 : Ve(t.borderRightWidth),
            v = r ? 0 : Ve(t.borderBottomWidth),
            g = r ? 0 : Ve(t.borderLeftWidth),
            m = o + f,
            h = c + p,
            y = g + d,
            w = a + v,
            b = u ? e.offsetHeight - w - e.clientHeight : 0,
            P = l ? e.offsetWidth - y - e.clientWidth : 0,
            H = i ? m + y : 0,
            Y = i ? h + w : 0,
            B = r ? r.width : Ve(t.width) - H - P,
            j = r ? r.height : Ve(t.height) - Y - b,
            N = B + m + P + y,
            L = j + h + b + w,
            J = kt({
                devicePixelContentBoxSize: Vt(Math.round(B * devicePixelRatio), Math.round(j * devicePixelRatio), s),
                borderBoxSize: Vt(N, L, s),
                contentBoxSize: Vt(B, j, s),
                contentRect: new va(o, c, B, j)
            });
        return qn.set(e, J), J
    },
    _a = function(e, n, t) {
        var r = ma(e, t),
            i = r.borderBoxSize,
            s = r.contentBoxSize,
            l = r.devicePixelContentBoxSize;
        switch (n) {
            case yn.DEVICE_PIXEL_CONTENT_BOX:
                return l;
            case yn.BORDER_BOX:
                return i;
            default:
                return s
        }
    },
    rv = function() {
        function e(n) {
            var t = ma(n);
            this.target = n, this.contentRect = t.contentRect, this.borderBoxSize = kt([t.borderBoxSize]), this.contentBoxSize = kt([t.contentBoxSize]), this.devicePixelContentBoxSize = kt([t.devicePixelContentBoxSize])
        }
        return e
    }(),
    ya = function(e) {
        if (ha(e)) return 1 / 0;
        for (var n = 0, t = e.parentNode; t;) n += 1, t = t.parentNode;
        return n
    },
    ov = function() {
        var e = 1 / 0,
            n = [];
        Tt.forEach(function(l) {
            if (l.activeTargets.length !== 0) {
                var u = [];
                l.activeTargets.forEach(function(f) {
                    var p = new rv(f.target),
                        o = ya(f.target);
                    u.push(p), f.lastReportedSize = _a(f.target, f.observedBox), o < e && (e = o)
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
    Yi = function(e) {
        Tt.forEach(function(t) {
            t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function(i) {
                i.isActive() && (ya(i.target) > e ? t.activeTargets.push(i) : t.skippedTargets.push(i))
            })
        })
    },
    iv = function() {
        var e = 0;
        for (Yi(e); Kg();) e = ov(), Yi(e);
        return Qg() && Jg(), e > 0
    },
    Fr, ba = [],
    sv = function() {
        return ba.splice(0).forEach(function(e) {
            return e()
        })
    },
    av = function(e) {
        if (!Fr) {
            var n = 0,
                t = document.createTextNode(""),
                r = {
                    characterData: !0
                };
            new MutationObserver(function() {
                return sv()
            }).observe(t, r), Fr = function() {
                t.textContent = "".concat(n ? n-- : n++)
            }
        }
        ba.push(e), Fr()
    },
    lv = function(e) {
        av(function() {
            requestAnimationFrame(e)
        })
    },
    er = 0,
    cv = function() {
        return !!er
    },
    uv = 250,
    fv = {
        attributes: !0,
        characterData: !0,
        childList: !0,
        subtree: !0
    },
    qi = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"],
    Ki = function(e) {
        return e === void 0 && (e = 0), Date.now() + e
    },
    Gr = !1,
    dv = function() {
        function e() {
            var n = this;
            this.stopped = !0, this.listener = function() {
                return n.schedule()
            }
        }
        return e.prototype.run = function(n) {
            var t = this;
            if (n === void 0 && (n = uv), !Gr) {
                Gr = !0;
                var r = Ki(n);
                lv(function() {
                    var i = !1;
                    try {
                        i = iv()
                    } finally {
                        if (Gr = !1, n = r - Ki(), !cv()) return;
                        i ? t.run(1e3) : n > 0 ? t.run(n) : t.start()
                    }
                })
            }
        }, e.prototype.schedule = function() {
            this.stop(), this.run()
        }, e.prototype.observe = function() {
            var n = this,
                t = function() {
                    return n.observer && n.observer.observe(document.body, fv)
                };
            document.body ? t() : fn.addEventListener("DOMContentLoaded", t)
        }, e.prototype.start = function() {
            var n = this;
            this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), qi.forEach(function(t) {
                return fn.addEventListener(t, n.listener, !0)
            }))
        }, e.prototype.stop = function() {
            var n = this;
            this.stopped || (this.observer && this.observer.disconnect(), qi.forEach(function(t) {
                return fn.removeEventListener(t, n.listener, !0)
            }), this.stopped = !0)
        }, e
    }(),
    co = new dv,
    Qi = function(e) {
        !er && e > 0 && co.start(), er += e, !er && co.stop()
    },
    pv = function(e) {
        return !So(e) && !ev(e) && getComputedStyle(e).display === "inline"
    },
    gv = function() {
        function e(n, t) {
            this.target = n, this.observedBox = t || yn.CONTENT_BOX, this.lastReportedSize = {
                inlineSize: 0,
                blockSize: 0
            }
        }
        return e.prototype.isActive = function() {
            var n = _a(this.target, this.observedBox, !0);
            return pv(this.target) && (this.lastReportedSize = n), this.lastReportedSize.inlineSize !== n.inlineSize || this.lastReportedSize.blockSize !== n.blockSize
        }, e
    }(),
    vv = function() {
        function e(n, t) {
            this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = n, this.callback = t
        }
        return e
    }(),
    Kn = new WeakMap,
    Ji = function(e, n) {
        for (var t = 0; t < e.length; t += 1)
            if (e[t].target === n) return t;
        return -1
    },
    Qn = function() {
        function e() {}
        return e.connect = function(n, t) {
            var r = new vv(n, t);
            Kn.set(n, r)
        }, e.observe = function(n, t, r) {
            var i = Kn.get(n),
                s = i.observationTargets.length === 0;
            Ji(i.observationTargets, t) < 0 && (s && Tt.push(i), i.observationTargets.push(new gv(t, r && r.box)), Qi(1), co.schedule())
        }, e.unobserve = function(n, t) {
            var r = Kn.get(n),
                i = Ji(r.observationTargets, t),
                s = r.observationTargets.length === 1;
            i >= 0 && (s && Tt.splice(Tt.indexOf(r), 1), r.observationTargets.splice(i, 1), Qi(-1))
        }, e.disconnect = function(n) {
            var t = this,
                r = Kn.get(n);
            r.observationTargets.slice().forEach(function(i) {
                return t.unobserve(n, i.target)
            }), r.activeTargets.splice(0, r.activeTargets.length)
        }, e
    }(),
    hv = function() {
        function e(n) {
            if (arguments.length === 0) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
            if (typeof n != "function") throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
            Qn.connect(this, n)
        }
        return e.prototype.observe = function(n, t) {
            if (arguments.length === 0) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!Gi(n)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
            Qn.observe(this, n, t)
        }, e.prototype.unobserve = function(n) {
            if (arguments.length === 0) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!Gi(n)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
            Qn.unobserve(this, n)
        }, e.prototype.disconnect = function() {
            Qn.disconnect(this)
        }, e.toString = function() {
            return "function ResizeObserver () { [polyfill code] }"
        }, e
    }();
const mv = () => {
        "ResizeObserver" in window || (window.ResizeObserver = hv)
    },
    _v = {
        setup: mv
    },
    yv = V('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>No</span></button><button><span>Yes'),
    Xi = wn(["relative px-144 py-2", Sn({
        size: "terminal-sm"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light border"
            }
        }
    }),
    bv = e => S(pr, {
        get isOpen() {
            return e.isOpen
        },
        get children() {
            return S(wv, {
                onExit: () => {
                    window.location.href = "brawlstars-inbox://closeView"
                },
                get onClose() {
                    return e.onClose
                }
            })
        }
    }),
    wv = e => {
        const [n, t] = Z();
        let r;
        const i = s => {
            t(s), clearTimeout(r), r = setTimeout(() => {
                s === "confirm" ? e.onExit() : e.onClose()
            }, 1e3)
        };
        return (() => {
            const s = yv(),
                l = s.firstChild,
                u = l.firstChild,
                c = u.nextSibling,
                f = c.firstChild,
                p = f.firstChild,
                o = p.firstChild,
                a = o.nextSibling;
            return C(u, S(se, {
                size: "terminal-md",
                children: "STARR PARK SECURITY"
            })), C(f, S(se, {
                size: "terminal-md",
                class: "text-purple",
                children: "Are you sure you want to exit?"
            }), p), o.$$click = () => i("cancel"), a.$$click = () => i("confirm"), Q(d => {
                const v = Xi({
                        selected: n() === "cancel"
                    }),
                    g = Xi({
                        selected: n() === "confirm"
                    });
                return v !== d._v$ && te(o, d._v$ = v), g !== d._v$2 && te(a, d._v$2 = g), d
            }, {
                _v$: void 0,
                _v$2: void 0
            }), s
        })()
    };
Ie(["click"]);
const Av = V('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>Exit</span></button><button><span>Continue'),
    es = wn(["relative px-96 py-2", Sn({
        size: "terminal-sm"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light border"
            }
        }
    }),
    xv = () => S(pr, {
        get isOpen() {
            return !Ye.dataUsageWarningDialog.accepted()
        },
        get children() {
            return S(Sv, {
                onExit: () => {
                    window.location.href = "brawlstars-inbox://closeView"
                },
                onClose: () => {
                    Ye.dataUsageWarningDialog.setAccepted()
                }
            })
        }
    }),
    Sv = e => {
        const [n, t] = Z();
        let r;
        const i = s => {
            t(s), clearTimeout(r), r = setTimeout(() => {
                s === "exit" ? e.onExit() : e.onClose()
            }, 1e3)
        };
        return (() => {
            const s = Av(),
                l = s.firstChild,
                u = l.firstChild,
                c = u.nextSibling,
                f = c.firstChild,
                p = f.firstChild,
                o = p.firstChild,
                a = o.nextSibling;
            return C(u, S(se, {
                size: "terminal-md",
                children: "STARR PARK SECURITY"
            })), C(f, S(se, {
                size: "terminal-sm",
                class: "text-purple whitespace-pre-wrap",
                get children() {
                    return ["This website features live video content, which can consume a significant amount of data.", "\n", "If you're using a limited data plan or have concerns about data usage, we recommend switching to a Wi-Fi network."]
                }
            }), p), o.$$click = () => i("exit"), a.$$click = () => i("continue"), Q(d => {
                const v = es({
                        selected: n() === "exit"
                    }),
                    g = es({
                        selected: n() === "continue"
                    });
                return v !== d._v$ && te(o, d._v$ = v), g !== d._v$2 && te(a, d._v$2 = g), d
            }, {
                _v$: void 0,
                _v$2: void 0
            }), s
        })()
    };
Ie(["click"]);
const Tv = V('<button class="absolute top-20 left-20 w-100 h-100 flex-center">'),
    kv = V('<button class="absolute top-20 right-20 w-100 h-100 flex-center text-purple">'),
    $v = V('<div><div class="portrait:hidden absolute origin-top-left overflow-hidden"></div><div class="landscape:hidden portrait:flex wh-full flex-center"><div class="font-medium whitespace-nowrap">Portrait mode is not supported.'),
    Iv = V('<div class="absolute bottom-0 left-0 w-256">');
_v.setup();
const Zr = {
        width: 2250,
        height: 1170
    },
    Pv = () => {
        const e = dr("standalone"),
            [n, t] = Z(!1);
        let r;
        Gt(() => {
            st.init(), ie.init(), ie.setupActivityTracking(), ie.trackPageView()
        }), pe(() => {
            if (ge.Supervisor.allEnded()) {
                const c = ge.Supervisor.currentFeed(),
                    p = !!(c != null && c.archivePlaylist) && c.source;
                p && xe.currentOpenApp.mainApp === null && xe.openApp(p), ge.Supervisor.setControlsVisible(!1), ge.Supervisor.dispatch("go-live")
            }
        });
        const [i, s] = Z(void 0), l = Gg({
            containerRef: i,
            bgImageSize: Zr,
            fit: "contain"
        }), u = ct([Hg, zg], {
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
            const c = $v(),
                f = c.firstChild;
            return $e(s, c), C(f, S(qg, {
                onLoaded: () => st.onVideoTransitionLoaded(),
                onEnded: () => st.onVideoTransitionEnd()
            }), null), C(f, S(Le, {
                get when() {
                    return st.currentStatus() >= Ut["video-transition"]
                },
                get children() {
                    return S(Zp, {
                        roomSound: u
                    })
                }
            }), null), C(f, S(Le, {
                get when() {
                    return st.currentStatus() === Ut.done
                },
                get children() {
                    return [(() => {
                        const p = Tv();
                        return p.$$click = () => t(!0), C(p, S(se, {
                            size: "terminal-lg",
                            class: "text-green leading-none inline-block pb-16",
                            children: "х"
                        })), p
                    })(), (() => {
                        const p = kv();
                        return p.$$click = () => {
                            ie.trackClickEvent("instructions-modal", St.options.muted ? "sound-on" : "sound-off", "cctv-room"), St.toggleMute()
                        }, C(p, S(Lt, {
                            get name() {
                                return St.options.muted ? "mute" : "unmute"
                            },
                            class: "w-72"
                        })), p
                    })(), S(Ng, {
                        onPlaylistLoad: () => u.play("archive-tape-load")
                    }), S(Xp, {
                        onClose: () => u.play("logbook-close")
                    }), S(xv, {})]
                }
            }), null), C(f, S(bv, {
                get isOpen() {
                    return n()
                },
                onClose: () => t(!1)
            }), null), Q(p => {
                const o = ce("wh-full", e && "bg-black"),
                    a = "".concat(Zr.height, "px"),
                    d = "".concat(Zr.width, "px"),
                    v = "translate(".concat(l.position().x, "px, ").concat(l.position().y, "px) scale(").concat(l.scaleFactor(), ")");
                return o !== p._v$ && te(c, p._v$ = o), a !== p._v$2 && ((p._v$2 = a) != null ? f.style.setProperty("height", a) : f.style.removeProperty("height")), d !== p._v$3 && ((p._v$3 = d) != null ? f.style.setProperty("width", d) : f.style.removeProperty("width")), v !== p._v$4 && ((p._v$4 = v) != null ? f.style.setProperty("transform", v) : f.style.removeProperty("transform")), p
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), c
        })(), (() => {
            const c = Iv(),
                f = r;
            return typeof f == "function" ? $e(f, c) : r = c, c
        })()]
    };
Ie(["click"]);
ml(() => S(Pv, {}), document.getElementById("root"));
export {
    An as a, Ge as c, Dv as g
};