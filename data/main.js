var Ea = Object.defineProperty,
    Ca = Object.defineProperties;
var Da = Object.getOwnPropertyDescriptors;
var Rn = Object.getOwnPropertySymbols;
var Zo = Object.prototype.hasOwnProperty,
    Yo = Object.prototype.propertyIsEnumerable;
var Ar = (e, n, t) => n in e ? Ea(e, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[n] = t,
    ye = (e, n) => {
        for (var t in n || (n = {})) Zo.call(n, t) && Ar(e, t, n[t]);
        if (Rn)
            for (var t of Rn(n)) Yo.call(n, t) && Ar(e, t, n[t]);
        return e
    },
    ht = (e, n) => Ca(e, Da(n));
var Wo = (e, n) => {
    var t = {};
    for (var o in e) Zo.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]);
    if (e != null && Rn)
        for (var o of Rn(e)) n.indexOf(o) < 0 && Yo.call(e, o) && (t[o] = e[o]);
    return t
};
var qo = (e, n, t) => (Ar(e, typeof n != "symbol" ? n + "" : n, t), t);
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
const Ma = {
        context: void 0,
        registry: void 0
    },
    Ba = (e, n) => e === n,
    Be = Symbol("solid-proxy"),
    Hr = Symbol("solid-track"),
    La = Symbol("solid-dev-component"),
    Kn = {
        equals: Ba
    };
let Zi = Ji;
const ut = 1,
    Jn = 2,
    Yi = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var ee = null;
let xr = null,
    ae = null,
    ge = null,
    Ge = null,
    ir = 0;

function Wn(e, n) {
    const t = ae,
        o = ee,
        i = e.length === 0,
        s = n === void 0 ? o : n,
        l = i ? Yi : {
            owned: null,
            cleanups: null,
            context: s ? s.context : null,
            owner: s
        },
        c = i ? e : () => e(() => fe(() => ar(l)));
    ee = l, ae = null;
    try {
        return Ft(c, !0)
    } finally {
        ae = t, ee = o
    }
}

function Y(e, n) {
    n = n ? Object.assign({}, Kn, n) : Kn;
    const t = {
            value: e,
            observers: null,
            observerSlots: null,
            comparator: n.equals || void 0
        },
        o = i => (typeof i == "function" && (i = i(t.value)), Ki(t, i));
    return [Qi.bind(t), o]
}

function X(e, n, t) {
    const o = io(e, n, !1, ut);
    gn(o)
}

function _e(e, n, t) {
    Zi = Na;
    const o = io(e, n, !1, ut),
        i = Qo && Wi(Qo);
    i && (o.suspense = i), (!t || !t.render) && (o.user = !0), Ge ? Ge.push(o) : gn(o)
}

function ke(e, n, t) {
    t = t ? Object.assign({}, Kn, t) : Kn;
    const o = io(e, n, !0, 0);
    return o.observers = null, o.observerSlots = null, o.comparator = t.equals || void 0, gn(o), Qi.bind(o)
}

function sr(e) {
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

function Ra(e, n, t) {
    const o = Array.isArray(e);
    let i, s = t && t.defer;
    return l => {
        let c;
        if (o) {
            c = Array(e.length);
            for (let d = 0; d < e.length; d++) c[d] = e[d]()
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
    _e(() => fe(e))
}

function Ae(e) {
    return ee === null || (ee.cleanups === null ? ee.cleanups = [e] : ee.cleanups.push(e)), e
}

function Xn() {
    return ae
}

function Va(e, n) {
    const t = Symbol("context");
    return {
        id: t,
        Provider: Ua(t),
        defaultValue: e
    }
}

function Wi(e) {
    return ee && ee.context && ee.context[e.id] !== void 0 ? ee.context[e.id] : e.defaultValue
}

function qi(e) {
    const n = ke(e),
        t = ke(() => Ur(n()));
    return t.toArray = () => {
        const o = t();
        return Array.isArray(o) ? o : o != null ? [o] : []
    }, t
}
let Qo;

function Qi() {
    if (this.sources && this.state)
        if (this.state === ut) gn(this);
        else {
            const e = ge;
            ge = null, Ft(() => tr(this), !1), ge = e
        } if (ae) {
        const e = this.observers ? this.observers.length : 0;
        ae.sources ? (ae.sources.push(this), ae.sourceSlots.push(e)) : (ae.sources = [this], ae.sourceSlots = [e]), this.observers ? (this.observers.push(ae), this.observerSlots.push(ae.sources.length - 1)) : (this.observers = [ae], this.observerSlots = [ae.sources.length - 1])
    }
    return this.value
}

function Ki(e, n, t) {
    let o = e.value;
    return (!e.comparator || !e.comparator(o, n)) && (e.value = n, e.observers && e.observers.length && Ft(() => {
        for (let i = 0; i < e.observers.length; i += 1) {
            const s = e.observers[i],
                l = xr && xr.running;
            l && xr.disposed.has(s), (l ? !s.tState : !s.state) && (s.pure ? ge.push(s) : Ge.push(s), s.observers && Xi(s)), l || (s.state = ut)
        }
        if (ge.length > 1e6) throw ge = [], new Error
    }, !1)), n
}

function gn(e) {
    if (!e.fn) return;
    ar(e);
    const n = ee,
        t = ae,
        o = ir;
    ae = ee = e, za(e, e.value, o), ae = t, ee = n
}

function za(e, n, t) {
    let o;
    try {
        o = e.fn(n)
    } catch (i) {
        return e.pure && (e.state = ut, e.owned && e.owned.forEach(ar), e.owned = null), e.updatedAt = t + 1, es(i)
    }(!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? Ki(e, o) : e.value = o, e.updatedAt = t)
}

function io(e, n, t, o = ut, i) {
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
    return ee === null || ee !== Yi && (ee.owned ? ee.owned.push(s) : ee.owned = [s]), s
}

function er(e) {
    if (e.state === 0) return;
    if (e.state === Jn) return tr(e);
    if (e.suspense && fe(e.suspense.inFallback)) return e.suspense.effects.push(e);
    const n = [e];
    for (;
        (e = e.owner) && (!e.updatedAt || e.updatedAt < ir);) e.state && n.push(e);
    for (let t = n.length - 1; t >= 0; t--)
        if (e = n[t], e.state === ut) gn(e);
        else if (e.state === Jn) {
        const o = ge;
        ge = null, Ft(() => tr(e, n[0]), !1), ge = o
    }
}

function Ft(e, n) {
    if (ge) return e();
    let t = !1;
    n || (ge = []), Ge ? t = !0 : Ge = [], ir++;
    try {
        const o = e();
        return ja(t), o
    } catch (o) {
        t || (Ge = null), ge = null, es(o)
    }
}

function ja(e) {
    if (ge && (Ji(ge), ge = null), e) return;
    const n = Ge;
    Ge = null, n.length && Ft(() => Zi(n), !1)
}

function Ji(e) {
    for (let n = 0; n < e.length; n++) er(e[n])
}

function Na(e) {
    let n, t = 0;
    for (n = 0; n < e.length; n++) {
        const o = e[n];
        o.user ? e[t++] = o : er(o)
    }
    for (n = 0; n < t; n++) er(e[n])
}

function tr(e, n) {
    e.state = 0;
    for (let t = 0; t < e.sources.length; t += 1) {
        const o = e.sources[t];
        if (o.sources) {
            const i = o.state;
            i === ut ? o !== n && (!o.updatedAt || o.updatedAt < ir) && er(o) : i === Jn && tr(o, n)
        }
    }
}

function Xi(e) {
    for (let n = 0; n < e.observers.length; n += 1) {
        const t = e.observers[n];
        t.state || (t.state = Jn, t.pure ? ge.push(t) : Ge.push(t), t.observers && Xi(t))
    }
}

function ar(e) {
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
        for (n = e.owned.length - 1; n >= 0; n--) ar(e.owned[n]);
        e.owned = null
    }
    if (e.cleanups) {
        for (n = e.cleanups.length - 1; n >= 0; n--) e.cleanups[n]();
        e.cleanups = null
    }
    e.state = 0
}

function Ha(e) {
    return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
        cause: e
    })
}

function es(e, n = ee) {
    throw Ha(e)
}

function Ur(e) {
    if (typeof e == "function" && !e.length) return Ur(e());
    if (Array.isArray(e)) {
        const n = [];
        for (let t = 0; t < e.length; t++) {
            const o = Ur(e[t]);
            Array.isArray(o) ? n.push.apply(n, o) : n.push(o)
        }
        return n
    }
    return e
}

function Ua(e, n) {
    return function(o) {
        let i;
        return X(() => i = fe(() => (ee.context = ht(ye({}, ee.context), {
            [e]: o.value
        }), qi(() => o.children))), void 0), i
    }
}
const Fa = Symbol("fallback");

function Ko(e) {
    for (let n = 0; n < e.length; n++) e[n]()
}

function Ga(e, n, t = {}) {
    let o = [],
        i = [],
        s = [],
        l = 0,
        c = n.length > 1 ? [] : null;
    return Ae(() => Ko(s)), () => {
        let u = e() || [],
            d, p;
        return u[Hr], fe(() => {
            let a = u.length,
                f, h, v, g, m, y, A, b, $;
            if (a === 0) l !== 0 && (Ko(s), s = [], o = [], i = [], l = 0, c && (c = [])), t.fallback && (o = [Fa], i[0] = Wn(N => (s[0] = N, t.fallback())), l = 1);
            else if (l === 0) {
                for (i = new Array(a), p = 0; p < a; p++) o[p] = u[p], i[p] = Wn(r);
                l = a
            } else {
                for (v = new Array(a), g = new Array(a), c && (m = new Array(a)), y = 0, A = Math.min(l, a); y < A && o[y] === u[y]; y++);
                for (A = l - 1, b = a - 1; A >= y && b >= y && o[A] === u[b]; A--, b--) v[b] = i[A], g[b] = s[A], c && (m[b] = c[A]);
                for (f = new Map, h = new Array(b + 1), p = b; p >= y; p--) $ = u[p], d = f.get($), h[p] = d === void 0 ? -1 : d, f.set($, p);
                for (d = y; d <= A; d++) $ = o[d], p = f.get($), p !== void 0 && p !== -1 ? (v[p] = i[d], g[p] = s[d], c && (m[p] = c[d]), p = h[p], f.set($, p)) : s[d]();
                for (p = y; p < a; p++) p in v ? (i[p] = v[p], s[p] = g[p], c && (c[p] = m[p], c[p](p))) : i[p] = Wn(r);
                i = i.slice(0, l = a), o = u.slice(0)
            }
            return i
        });

        function r(a) {
            if (s[p] = a, c) {
                const [f, h] = Y(p);
                return c[p] = h, n(u[p], f)
            }
            return n(u[p])
        }
    }
}

function x(e, n) {
    return fe(() => e(n || {}))
}

function Vn() {
    return !0
}
const Fr = {
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

function Sr(e) {
    return (e = typeof e == "function" ? e() : e) ? e : {}
}

function Za() {
    for (let e = 0, n = this.length; e < n; ++e) {
        const t = this[e]();
        if (t !== void 0) return t
    }
}

function Ya(...e) {
    let n = !1;
    for (let s = 0; s < e.length; s++) {
        const l = e[s];
        n = n || !!l && Be in l, e[s] = typeof l == "function" ? (n = !0, ke(l)) : l
    }
    if (n) return new Proxy({
        get(s) {
            for (let l = e.length - 1; l >= 0; l--) {
                const c = Sr(e[l])[s];
                if (c !== void 0) return c
            }
        },
        has(s) {
            for (let l = e.length - 1; l >= 0; l--)
                if (s in Sr(e[l])) return !0;
            return !1
        },
        keys() {
            const s = [];
            for (let l = 0; l < e.length; l++) s.push(...Object.keys(Sr(e[l])));
            return [...new Set(s)]
        }
    }, Fr);
    const t = {},
        o = {},
        i = new Set;
    for (let s = e.length - 1; s >= 0; s--) {
        const l = e[s];
        if (!l) continue;
        const c = Object.getOwnPropertyNames(l);
        for (let u = 0, d = c.length; u < d; u++) {
            const p = c[u];
            if (p === "__proto__" || p === "constructor") continue;
            const r = Object.getOwnPropertyDescriptor(l, p);
            if (!i.has(p)) r.get ? (i.add(p), Object.defineProperty(t, p, {
                enumerable: !0,
                configurable: !0,
                get: Za.bind(o[p] = [r.get.bind(l)])
            })) : (r.value !== void 0 && i.add(p), t[p] = r.value);
            else {
                const a = o[p];
                a ? r.get ? a.push(r.get.bind(l)) : r.value !== void 0 && a.push(() => r.value) : t[p] === void 0 && (t[p] = r.value)
            }
        }
    }
    return t
}

function so(e, ...n) {
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
            }, Fr));
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
        }, Fr)), s
    }
    const t = {},
        o = n.map(() => ({}));
    for (const i of Object.getOwnPropertyNames(e)) {
        const s = Object.getOwnPropertyDescriptor(e, i),
            l = !s.get && !s.set && s.enumerable && s.writable && s.configurable;
        let c = !1,
            u = 0;
        for (const d of n) d.includes(i) && (c = !0, l ? o[u][i] = s.value : Object.defineProperty(o[u], i, s)), ++u;
        c || (l ? t[i] = s.value : Object.defineProperty(t, i, s))
    }
    return [...o, t]
}
let Wa = 0;

function ts() {
    const e = Ma.context;
    return e ? "".concat(e.id).concat(e.count++) : "cl-".concat(Wa++)
}
const ns = e => "Stale read from <".concat(e, ">.");

function ao(e) {
    const n = "fallback" in e && {
        fallback: () => e.fallback
    };
    return ke(Ga(() => e.each, e.children, n || void 0))
}

function ze(e) {
    const n = e.keyed,
        t = ke(() => e.when, void 0, {
            equals: (o, i) => n ? o === i : !o == !i
        });
    return ke(() => {
        const o = t();
        if (o) {
            const i = e.children;
            return typeof i == "function" && i.length > 0 ? fe(() => i(n ? o : () => {
                if (!fe(t)) throw ns("Show");
                return e.when
            })) : i
        }
        return e.fallback
    }, void 0, void 0)
}

function rs(e) {
    let n = !1;
    const t = (s, l) => s[0] === l[0] && (n ? s[1] === l[1] : !s[1] == !l[1]) && s[2] === l[2],
        o = qi(() => e.children),
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
            if (fe(i)[0] !== s) throw ns("Match");
            return c.when
        })) : u
    }, void 0, void 0)
}

function Bt(e) {
    return e
}
const qa = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"],
    Qa = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...qa]),
    Ka = new Set(["innerHTML", "textContent", "innerText", "children"]),
    Ja = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    }),
    Xa = Object.assign(Object.create(null), {
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

function el(e, n) {
    const t = Xa[e];
    return typeof t == "object" ? t[n] ? t.$ : void 0 : t
}
const tl = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
    nl = new Set(["altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use", "view", "vkern"]),
    rl = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };

function ol(e, n, t) {
    let o = t.length,
        i = n.length,
        s = o,
        l = 0,
        c = 0,
        u = n[i - 1].nextSibling,
        d = null;
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
            for (; l < i;)(!d || !d.has(n[l])) && n[l].remove(), l++;
        else if (n[l] === t[s - 1] && t[c] === n[i - 1]) {
            const p = n[--i].nextSibling;
            e.insertBefore(t[c++], n[l++].nextSibling), e.insertBefore(t[--s], p), n[i] = t[s]
        } else {
            if (!d) {
                d = new Map;
                let r = c;
                for (; r < s;) d.set(t[r], r++)
            }
            const p = d.get(n[l]);
            if (p != null)
                if (c < p && p < s) {
                    let r = l,
                        a = 1,
                        f;
                    for (; ++r < i && r < s && !((f = d.get(n[r])) == null || f !== p + a);) a++;
                    if (a > p - c) {
                        const h = n[l];
                        for (; c < p;) e.insertBefore(t[c++], h)
                    } else e.replaceChild(t[c++], n[l++])
                } else l++;
            else n[l++].remove()
        }
    }
}
const Jo = "_$DX_DELEGATE";

function il(e, n, t, o = {}) {
    let i;
    return Wn(s => {
        i = s, n === document ? e() : C(n, e(), n.firstChild ? null : void 0, t)
    }, o.owner), () => {
        i(), n.textContent = ""
    }
}

function j(e, n, t) {
    let o;
    const i = () => {
            const l = document.createElement("template");
            return l.innerHTML = e, t ? l.content.firstChild.firstChild : l.content.firstChild
        },
        s = n ? () => fe(() => document.importNode(o || (o = i()), !0)) : () => (o || (o = i())).cloneNode(!0);
    return s.cloneNode = s, s
}

function $e(e, n = window.document) {
    const t = n[Jo] || (n[Jo] = new Set);
    for (let o = 0, i = e.length; o < i; o++) {
        const s = e[o];
        t.has(s) || (t.add(s), n.addEventListener(s, dl))
    }
}

function le(e, n, t) {
    t == null ? e.removeAttribute(n) : e.setAttribute(n, t)
}

function sl(e, n, t, o) {
    o == null ? e.removeAttributeNS(n, t) : e.setAttributeNS(n, t, o)
}

function te(e, n) {
    n == null ? e.removeAttribute("class") : e.className = n
}

function al(e, n, t, o) {
    if (o) Array.isArray(t) ? (e["$$".concat(n)] = t[0], e["$$".concat(n, "Data")] = t[1]) : e["$$".concat(n)] = t;
    else if (Array.isArray(t)) {
        const i = t[0];
        e.addEventListener(n, t[0] = s => i.call(e, t[1], s))
    } else e.addEventListener(n, t)
}

function ll(e, n, t = {}) {
    const o = Object.keys(n || {}),
        i = Object.keys(t);
    let s, l;
    for (s = 0, l = i.length; s < l; s++) {
        const c = i[s];
        !c || c === "undefined" || n[c] || (Xo(e, c, !1), delete t[c])
    }
    for (s = 0, l = o.length; s < l; s++) {
        const c = o[s],
            u = !!n[c];
        !c || c === "undefined" || t[c] === u || !u || (Xo(e, c, !0), t[c] = u)
    }
    return t
}

function cl(e, n, t) {
    if (!n) return t ? le(e, "style") : n;
    const o = e.style;
    if (typeof n == "string") return o.cssText = n;
    typeof t == "string" && (o.cssText = t = void 0), t || (t = {}), n || (n = {});
    let i, s;
    for (s in t) n[s] == null && o.removeProperty(s), delete t[s];
    for (s in n) i = n[s], i !== t[s] && (o.setProperty(s, i), t[s] = i);
    return t
}

function Ye(e, n = {}, t, o) {
    const i = {};
    return o || X(() => i.children = jt(e, n.children, i.children)), X(() => n.ref && n.ref(e)), X(() => ul(e, n, t, !0, i, !0)), i
}

function Ee(e, n, t) {
    return fe(() => e(n, t))
}

function C(e, n, t, o) {
    if (t !== void 0 && !o && (o = []), typeof n != "function") return jt(e, n, o, t);
    X(i => jt(e, n(), i, t), o)
}

function ul(e, n, t, o, i = {}, s = !1) {
    n || (n = {});
    for (const l in i)
        if (!(l in n)) {
            if (l === "children") continue;
            i[l] = ei(e, l, null, i[l], t, s)
        } for (const l in n) {
        if (l === "children") {
            o || jt(e, n.children);
            continue
        }
        const c = n[l];
        i[l] = ei(e, l, c, i[l], t, s)
    }
}

function fl(e) {
    return e.toLowerCase().replace(/-([a-z])/g, (n, t) => t.toUpperCase())
}

function Xo(e, n, t) {
    const o = n.trim().split(/\s+/);
    for (let i = 0, s = o.length; i < s; i++) e.classList.toggle(o[i], t)
}

function ei(e, n, t, o, i, s) {
    let l, c, u, d, p;
    if (n === "style") return cl(e, t, o);
    if (n === "classList") return ll(e, t, o);
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
            a = tl.has(r);
        if (!a && o) {
            const f = Array.isArray(o) ? o[0] : o;
            e.removeEventListener(r, f)
        }(a || t) && (al(e, r, t, a), a && $e([r]))
    } else if (n.slice(0, 5) === "attr:") le(e, n.slice(5), t);
    else if ((p = n.slice(0, 5) === "prop:") || (u = Ka.has(n)) || !i && ((d = el(n, e.tagName)) || (c = Qa.has(n))) || (l = e.nodeName.includes("-"))) p && (n = n.slice(5), c = !0), n === "class" || n === "className" ? te(e, t) : l && !c && !u ? e[fl(n)] = t : e[d || n] = t;
    else {
        const r = i && n.indexOf(":") > -1 && rl[n.split(":")[0]];
        r ? sl(e, r, n, t) : le(e, Ja[n] || n, t)
    }
    return t
}

function dl(e) {
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

function jt(e, n, t, o, i) {
    for (; typeof t == "function";) t = t();
    if (n === t) return t;
    const s = typeof n,
        l = o !== void 0;
    if (e = l && t[0] && t[0].parentNode || e, s === "string" || s === "number")
        if (s === "number" && (n = n.toString()), l) {
            let c = t[0];
            c && c.nodeType === 3 ? c.data = n : c = document.createTextNode(n), t = Ct(e, t, o, c)
        } else t !== "" && typeof t == "string" ? t = e.firstChild.data = n : t = e.textContent = n;
    else if (n == null || s === "boolean") t = Ct(e, t, o);
    else {
        if (s === "function") return X(() => {
            let c = n();
            for (; typeof c == "function";) c = c();
            t = jt(e, c, t, o)
        }), () => t;
        if (Array.isArray(n)) {
            const c = [],
                u = t && Array.isArray(t);
            if (Gr(c, n, t, i)) return X(() => t = jt(e, c, t, o, !0)), () => t;
            if (c.length === 0) {
                if (t = Ct(e, t, o), l) return t
            } else u ? t.length === 0 ? ti(e, c, o) : ol(e, t, c) : (t && Ct(e), ti(e, c));
            t = c
        } else if (n.nodeType) {
            if (Array.isArray(t)) {
                if (l) return t = Ct(e, t, o, n);
                Ct(e, t, null, n)
            } else t == null || t === "" || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
            t = n
        } else console.warn("Unrecognized value. Skipped inserting", n)
    }
    return t
}

function Gr(e, n, t, o) {
    let i = !1;
    for (let s = 0, l = n.length; s < l; s++) {
        let c = n[s],
            u = t && t[s],
            d;
        if (!(c == null || c === !0 || c === !1))
            if ((d = typeof c) == "object" && c.nodeType) e.push(c);
            else if (Array.isArray(c)) i = Gr(e, c, u) || i;
        else if (d === "function")
            if (o) {
                for (; typeof c == "function";) c = c();
                i = Gr(e, Array.isArray(c) ? c : [c], Array.isArray(u) ? u : [u]) || i
            } else e.push(c), i = !0;
        else {
            const p = String(c);
            u && u.nodeType === 3 && u.data === p ? e.push(u) : e.push(document.createTextNode(p))
        }
    }
    return i
}

function ti(e, n, t = null) {
    for (let o = 0, i = n.length; o < i; o++) e.insertBefore(n[o], t)
}

function Ct(e, n, t, o) {
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
const pl = "http://www.w3.org/2000/svg";

function vl(e, n = !1) {
    return n ? document.createElementNS(pl, e) : document.createElement(e)
}

function os(e) {
    const [n, t] = so(e, ["component"]), o = ke(() => n.component);
    return ke(() => {
        const i = o();
        switch (typeof i) {
            case "function":
                return Object.assign(i, {
                    [La]: !0
                }), fe(() => i(t));
            case "string":
                const s = nl.has(i),
                    l = vl(i, s);
                return Ye(l, t, s), l
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
const Zr = Symbol("store-raw"),
    Rt = Symbol("store-node"),
    He = Symbol("store-has"),
    is = Symbol("store-self");

function ss(e) {
    let n = e[Be];
    if (!n && (Object.defineProperty(e, Be, {
            value: n = new Proxy(e, gl)
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

function at(e) {
    let n;
    return e != null && typeof e == "object" && (e[Be] || !(n = Object.getPrototypeOf(e)) || n === Object.prototype || Array.isArray(e))
}

function Nt(e, n = new Set) {
    let t, o, i, s;
    if (t = e != null && e[Zr]) return t;
    if (!at(e) || n.has(e)) return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : n.add(e);
        for (let l = 0, c = e.length; l < c; l++) i = e[l], (o = Nt(i, n)) !== i && (e[l] = o)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : n.add(e);
        const l = Object.keys(e),
            c = Object.getOwnPropertyDescriptors(e);
        for (let u = 0, d = l.length; u < d; u++) s = l[u], !c[s].get && (i = e[s], (o = Nt(i, n)) !== i && (e[s] = o))
    }
    return e
}

function nr(e, n) {
    let t = e[n];
    return t || Object.defineProperty(e, n, {
        value: t = Object.create(null)
    }), t
}

function ln(e, n, t) {
    if (e[n]) return e[n];
    const [o, i] = Y(t, {
        equals: !1,
        internal: !0
    });
    return o.$ = i, e[n] = o
}

function hl(e, n) {
    const t = Reflect.getOwnPropertyDescriptor(e, n);
    return !t || t.get || !t.configurable || n === Be || n === Rt || (delete t.value, delete t.writable, t.get = () => e[Be][n]), t
}

function as(e) {
    Xn() && ln(nr(e, Rt), is)()
}

function ml(e) {
    return as(e), Reflect.ownKeys(e)
}
const gl = {
    get(e, n, t) {
        if (n === Zr) return e;
        if (n === Be) return t;
        if (n === Hr) return as(e), t;
        const o = nr(e, Rt),
            i = o[n];
        let s = i ? i() : e[n];
        if (n === Rt || n === He || n === "__proto__") return s;
        if (!i) {
            const l = Object.getOwnPropertyDescriptor(e, n);
            Xn() && (typeof s != "function" || e.hasOwnProperty(n)) && !(l && l.get) && (s = ln(o, n, s)())
        }
        return at(s) ? ss(s) : s
    },
    has(e, n) {
        return n === Zr || n === Be || n === Hr || n === Rt || n === He || n === "__proto__" ? !0 : (Xn() && ln(nr(e, He), n)(), n in e)
    },
    set() {
        return !0
    },
    deleteProperty() {
        return !0
    },
    ownKeys: ml,
    getOwnPropertyDescriptor: hl
};

function Oe(e, n, t, o = !1) {
    if (!o && e[n] === t) return;
    const i = e[n],
        s = e.length;
    t === void 0 ? (delete e[n], e[He] && e[He][n] && i !== void 0 && e[He][n].$()) : (e[n] = t, e[He] && e[He][n] && i === void 0 && e[He][n].$());
    let l = nr(e, Rt),
        c;
    if ((c = ln(l, n, i)) && c.$(() => t), Array.isArray(e) && e.length !== s) {
        for (let u = e.length; u < s; u++)(c = l[u]) && c.$();
        (c = ln(l, "length", s)) && c.$(e.length)
    }(c = l[is]) && c.$()
}

function ls(e, n) {
    const t = Object.keys(n);
    for (let o = 0; o < t.length; o += 1) {
        const i = t[o];
        Oe(e, i, n[i])
    }
}

function _l(e, n) {
    if (typeof n == "function" && (n = n(e)), n = Nt(n), Array.isArray(n)) {
        if (e === n) return;
        let t = 0,
            o = n.length;
        for (; t < o; t++) {
            const i = n[t];
            e[t] !== i && Oe(e, t, i)
        }
        Oe(e, "length", o)
    } else ls(e, n)
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
                to: d = e.length - 1,
                by: p = 1
            } = o;
            for (let r = u; r <= d; r += p) rn(e, [r].concat(n), t);
            return
        } else if (n.length > 1) {
            rn(e[o], n, [o].concat(t));
            return
        }
        i = e[o], t = [o].concat(t)
    }
    let s = n[0];
    typeof s == "function" && (s = s(i, t), s === i) || o === void 0 && s == null || (s = Nt(s), o === void 0 || at(i) && at(s) && !Array.isArray(s) ? ls(i, s) : Oe(e, o, s))
}

function Gt(...[e, n]) {
    const t = Nt(e || {}),
        o = Array.isArray(t),
        i = ss(t);

    function s(...l) {
        sr(() => {
            o && l.length === 1 ? _l(t, l[0]) : rn(t, l)
        })
    }
    return [i, s]
}
const Yr = Symbol("store-root");

function Mt(e, n, t, o, i) {
    const s = n[t];
    if (e === s) return;
    if (t !== Yr && (!at(e) || !at(s) || i && e[i] !== s[i])) {
        Oe(n, t, e);
        return
    }
    if (Array.isArray(e)) {
        if (e.length && s.length && (!o || i && e[0] && e[0][i] != null)) {
            let u, d, p, r, a, f, h, v;
            for (p = 0, r = Math.min(s.length, e.length); p < r && (s[p] === e[p] || i && s[p] && e[p] && s[p][i] === e[p][i]); p++) Mt(e[p], s, p, o, i);
            const g = new Array(e.length),
                m = new Map;
            for (r = s.length - 1, a = e.length - 1; r >= p && a >= p && (s[r] === e[a] || i && s[p] && e[p] && s[r][i] === e[a][i]); r--, a--) g[a] = s[r];
            if (p > a || p > r) {
                for (d = p; d <= a; d++) Oe(s, d, e[d]);
                for (; d < e.length; d++) Oe(s, d, g[d]), Mt(e[d], s, d, o, i);
                s.length > e.length && Oe(s, "length", e.length);
                return
            }
            for (h = new Array(a + 1), d = a; d >= p; d--) f = e[d], v = i && f ? f[i] : f, u = m.get(v), h[d] = u === void 0 ? -1 : u, m.set(v, d);
            for (u = p; u <= r; u++) f = s[u], v = i && f ? f[i] : f, d = m.get(v), d !== void 0 && d !== -1 && (g[d] = s[u], d = h[d], m.set(v, d));
            for (d = p; d < e.length; d++) d in g ? (Oe(s, d, g[d]), Mt(e[d], s, d, o, i)) : Oe(s, d, e[d])
        } else
            for (let u = 0, d = e.length; u < d; u++) Mt(e[u], s, u, o, i);
        s.length > e.length && Oe(s, "length", e.length);
        return
    }
    const l = Object.keys(e);
    for (let u = 0, d = l.length; u < d; u++) Mt(e[l[u]], s, l[u], o, i);
    const c = Object.keys(s);
    for (let u = 0, d = c.length; u < d; u++) e[c[u]] === void 0 && Oe(s, c[u], void 0)
}

function yl(e, n = {}) {
    const {
        merge: t,
        key: o = "id"
    } = n, i = Nt(e);
    return s => {
        if (!at(s) || !at(i)) return i;
        const l = Mt(i, {
            [Yr]: s
        }, Yr, t, o);
        return l === void 0 ? s : l
    }
}
const [bl, Wr] = Gt({
    mainApp: null
}), wl = e => {
    Wr(e === "home" || e === "security-tape-archives" || e === "timecoder" ? {
        mainApp: "terminal",
        terminalApp: e
    } : {
        mainApp: e,
        terminalApp: void 0
    })
}, Al = () => {
    Wr({
        mainApp: null,
        terminalApp: void 0
    })
}, we = {
    currentOpenApp: bl,
    openApp: wl,
    closeApp: Al
};
var Ue = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};

function _n(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}

function Cv(e) {
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
var cn = {};
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
                    for (var f = 0; f < a._howls.length; f++)
                        if (!a._howls[f]._webAudio)
                            for (var h = a._howls[f]._getSoundIds(), v = 0; v < h.length; v++) {
                                var g = a._howls[f]._soundById(h[v]);
                                g && g._node && (g._node.volume = g._volume * r)
                            }
                    return a
                }
                return a._volume
            },
            mute: function(r) {
                var a = this || t;
                a.ctx || p(), a._muted = r, a.usingWebAudio && a.masterGain.gain.setValueAtTime(r ? 0 : a._volume, t.ctx.currentTime);
                for (var f = 0; f < a._howls.length; f++)
                    if (!a._howls[f]._webAudio)
                        for (var h = a._howls[f]._getSoundIds(), v = 0; v < h.length; v++) {
                            var g = a._howls[f]._soundById(h[v]);
                            g && g._node && (g._node.muted = r ? !0 : g._muted)
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
                    } catch (f) {
                        r.noAudio = !0
                    } else r.noAudio = !0;
                try {
                    var a = new Audio;
                    a.muted && (r.noAudio = !0)
                } catch (f) {}
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
                var f = a.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                    h = r._navigator ? r._navigator.userAgent : "",
                    v = h.match(/OPR\/(\d+)/g),
                    g = v && parseInt(v[0].split("/")[1], 10) < 33,
                    m = h.indexOf("Safari") !== -1 && h.indexOf("Chrome") === -1,
                    y = h.match(/Version\/(.*?) /),
                    A = m && y && parseInt(y[1], 10) < 15;
                return r._codecs = {
                    mp3: !!(!g && (f || a.canPlayType("audio/mp3;").replace(/^no$/, ""))),
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
                    weba: !!(!A && a.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                    webm: !!(!A && a.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                    dolby: !!a.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                    flac: !!(a.canPlayType("audio/x-flac;") || a.canPlayType("audio/flac;")).replace(/^no$/, "")
                }, r
            },
            _unlockAudio: function() {
                var r = this || t;
                if (!(r._audioUnlocked || !r.ctx)) {
                    r._audioUnlocked = !1, r.autoUnlock = !1, !r._mobileUnloaded && r.ctx.sampleRate !== 44100 && (r._mobileUnloaded = !0, r.unload()), r._scratchBuffer = r.ctx.createBuffer(1, 1, 22050);
                    var a = function(f) {
                        for (; r._html5AudioPool.length < r.html5PoolSize;) try {
                            var h = new Audio;
                            h._unlocked = !0, r._releaseHtml5Audio(h)
                        } catch (b) {
                            r.noAudio = !0;
                            break
                        }
                        for (var v = 0; v < r._howls.length; v++)
                            if (!r._howls[v]._webAudio)
                                for (var g = r._howls[v]._getSoundIds(), m = 0; m < g.length; m++) {
                                    var y = r._howls[v]._soundById(g[m]);
                                    y && y._node && !y._node._unlocked && (y._node._unlocked = !0, y._node.load())
                                }
                        r._autoResume();
                        var A = r.ctx.createBufferSource();
                        A.buffer = r._scratchBuffer, A.connect(r.ctx.destination), typeof A.start > "u" ? A.noteOn(0) : A.start(0), typeof r.ctx.resume == "function" && r.ctx.resume(), A.onended = function() {
                            A.disconnect(0), r._audioUnlocked = !0, document.removeEventListener("touchstart", a, !0), document.removeEventListener("touchend", a, !0), document.removeEventListener("click", a, !0), document.removeEventListener("keydown", a, !0);
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
                            for (var f = 0; f < r._howls[a]._sounds.length; f++)
                                if (!r._howls[a]._sounds[f]._paused) return r
                        } return r._suspendTimer && clearTimeout(r._suspendTimer), r._suspendTimer = setTimeout(function() {
                        if (r.autoSuspend) {
                            r._suspendTimer = null, r.state = "suspending";
                            var h = function() {
                                r.state = "suspended", r._resumeAfterSuspend && (delete r._resumeAfterSuspend, r._autoResume())
                            };
                            r.ctx.suspend().then(h, h)
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
                for (var f = 0; f < r._src.length; f++) {
                    var h, v;
                    if (r._format && r._format[f]) h = r._format[f];
                    else {
                        if (v = r._src[f], typeof v != "string") {
                            r._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                            continue
                        }
                        h = /^data:audio\/([^;,]+);/i.exec(v), h || (h = /\.([^.]+)$/.exec(v.split("?", 1)[0])), h && (h = h[1].toLowerCase())
                    }
                    if (h || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), h && t.codecs(h)) {
                        a = r._src[f];
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
                var f = this,
                    h = null;
                if (typeof r == "number") h = r, r = null;
                else {
                    if (typeof r == "string" && f._state === "loaded" && !f._sprite[r]) return null;
                    if (typeof r > "u" && (r = "__default", !f._playLock)) {
                        for (var v = 0, g = 0; g < f._sounds.length; g++) f._sounds[g]._paused && !f._sounds[g]._ended && (v++, h = f._sounds[g]._id);
                        v === 1 ? r = null : h = null
                    }
                }
                var m = h ? f._soundById(h) : f._inactiveSound();
                if (!m) return null;
                if (h && !r && (r = m._sprite || "__default"), f._state !== "loaded") {
                    m._sprite = r, m._ended = !1;
                    var y = m._id;
                    return f._queue.push({
                        event: "play",
                        action: function() {
                            f.play(y)
                        }
                    }), y
                }
                if (h && !m._paused) return a || f._loadQueue("play"), m._id;
                f._webAudio && t._autoResume();
                var A = Math.max(0, m._seek > 0 ? m._seek : f._sprite[r][0] / 1e3),
                    b = Math.max(0, (f._sprite[r][0] + f._sprite[r][1]) / 1e3 - A),
                    $ = b * 1e3 / Math.abs(m._rate),
                    N = f._sprite[r][0] / 1e3,
                    U = (f._sprite[r][0] + f._sprite[r][1]) / 1e3;
                m._sprite = r, m._ended = !1;
                var L = function() {
                    m._paused = !1, m._seek = A, m._start = N, m._stop = U, m._loop = !!(m._loop || f._sprite[r][2])
                };
                if (A >= U) {
                    f._ended(m);
                    return
                }
                var B = m._node;
                if (f._webAudio) {
                    var z = function() {
                        f._playLock = !1, L(), f._refreshBuffer(m);
                        var D = m._muted || f._muted ? 0 : m._volume;
                        B.gain.setValueAtTime(D, t.ctx.currentTime), m._playStart = t.ctx.currentTime, typeof B.bufferSource.start > "u" ? m._loop ? B.bufferSource.noteGrainOn(0, A, 86400) : B.bufferSource.noteGrainOn(0, A, b) : m._loop ? B.bufferSource.start(0, A, 86400) : B.bufferSource.start(0, A, b), $ !== 1 / 0 && (f._endTimers[m._id] = setTimeout(f._ended.bind(f, m), $)), a || setTimeout(function() {
                            f._emit("play", m._id), f._loadQueue()
                        }, 0)
                    };
                    t.state === "running" && t.ctx.state !== "interrupted" ? z() : (f._playLock = !0, f.once("resume", z), f._clearTimer(m._id))
                } else {
                    var R = function() {
                        B.currentTime = A, B.muted = m._muted || f._muted || t._muted || B.muted, B.volume = m._volume * t.volume(), B.playbackRate = m._rate;
                        try {
                            var D = B.play();
                            if (D && typeof Promise < "u" && (D instanceof Promise || typeof D.then == "function") ? (f._playLock = !0, L(), D.then(function() {
                                    f._playLock = !1, B._unlocked = !0, a ? f._loadQueue() : f._emit("play", m._id)
                                }).catch(function() {
                                    f._playLock = !1, f._emit("playerror", m._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), m._ended = !0, m._paused = !0
                                })) : a || (f._playLock = !1, L(), f._emit("play", m._id)), B.playbackRate = m._rate, B.paused) {
                                f._emit("playerror", m._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                return
                            }
                            r !== "__default" || m._loop ? f._endTimers[m._id] = setTimeout(f._ended.bind(f, m), $) : (f._endTimers[m._id] = function() {
                                f._ended(m), B.removeEventListener("ended", f._endTimers[m._id], !1)
                            }, B.addEventListener("ended", f._endTimers[m._id], !1))
                        } catch (I) {
                            f._emit("playerror", m._id, I)
                        }
                    };
                    B.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (B.src = f._src, B.load());
                    var K = window && window.ejecta || !B.readyState && t._navigator.isCocoonJS;
                    if (B.readyState >= 3 || K) R();
                    else {
                        f._playLock = !0, f._state = "loading";
                        var de = function() {
                            f._state = "loaded", R(), B.removeEventListener(t._canPlayEvent, de, !1)
                        };
                        B.addEventListener(t._canPlayEvent, de, !1), f._clearTimer(m._id)
                    }
                }
                return m._id
            },
            pause: function(r) {
                var a = this;
                if (a._state !== "loaded" || a._playLock) return a._queue.push({
                    event: "pause",
                    action: function() {
                        a.pause(r)
                    }
                }), a;
                for (var f = a._getSoundIds(r), h = 0; h < f.length; h++) {
                    a._clearTimer(f[h]);
                    var v = a._soundById(f[h]);
                    if (v && !v._paused && (v._seek = a.seek(f[h]), v._rateSeek = 0, v._paused = !0, a._stopFade(f[h]), v._node))
                        if (a._webAudio) {
                            if (!v._node.bufferSource) continue;
                            typeof v._node.bufferSource.stop > "u" ? v._node.bufferSource.noteOff(0) : v._node.bufferSource.stop(0), a._cleanBuffer(v._node)
                        } else(!isNaN(v._node.duration) || v._node.duration === 1 / 0) && v._node.pause();
                    arguments[1] || a._emit("pause", v ? v._id : null)
                }
                return a
            },
            stop: function(r, a) {
                var f = this;
                if (f._state !== "loaded" || f._playLock) return f._queue.push({
                    event: "stop",
                    action: function() {
                        f.stop(r)
                    }
                }), f;
                for (var h = f._getSoundIds(r), v = 0; v < h.length; v++) {
                    f._clearTimer(h[v]);
                    var g = f._soundById(h[v]);
                    g && (g._seek = g._start || 0, g._rateSeek = 0, g._paused = !0, g._ended = !0, f._stopFade(h[v]), g._node && (f._webAudio ? g._node.bufferSource && (typeof g._node.bufferSource.stop > "u" ? g._node.bufferSource.noteOff(0) : g._node.bufferSource.stop(0), f._cleanBuffer(g._node)) : (!isNaN(g._node.duration) || g._node.duration === 1 / 0) && (g._node.currentTime = g._start || 0, g._node.pause(), g._node.duration === 1 / 0 && f._clearSound(g._node))), a || f._emit("stop", g._id))
                }
                return f
            },
            mute: function(r, a) {
                var f = this;
                if (f._state !== "loaded" || f._playLock) return f._queue.push({
                    event: "mute",
                    action: function() {
                        f.mute(r, a)
                    }
                }), f;
                if (typeof a > "u")
                    if (typeof r == "boolean") f._muted = r;
                    else return f._muted;
                for (var h = f._getSoundIds(a), v = 0; v < h.length; v++) {
                    var g = f._soundById(h[v]);
                    g && (g._muted = r, g._interval && f._stopFade(g._id), f._webAudio && g._node ? g._node.gain.setValueAtTime(r ? 0 : g._volume, t.ctx.currentTime) : g._node && (g._node.muted = t._muted ? !0 : r), f._emit("mute", g._id))
                }
                return f
            },
            volume: function() {
                var r = this,
                    a = arguments,
                    f, h;
                if (a.length === 0) return r._volume;
                if (a.length === 1 || a.length === 2 && typeof a[1] > "u") {
                    var v = r._getSoundIds(),
                        g = v.indexOf(a[0]);
                    g >= 0 ? h = parseInt(a[0], 10) : f = parseFloat(a[0])
                } else a.length >= 2 && (f = parseFloat(a[0]), h = parseInt(a[1], 10));
                var m;
                if (typeof f < "u" && f >= 0 && f <= 1) {
                    if (r._state !== "loaded" || r._playLock) return r._queue.push({
                        event: "volume",
                        action: function() {
                            r.volume.apply(r, a)
                        }
                    }), r;
                    typeof h > "u" && (r._volume = f), h = r._getSoundIds(h);
                    for (var y = 0; y < h.length; y++) m = r._soundById(h[y]), m && (m._volume = f, a[2] || r._stopFade(h[y]), r._webAudio && m._node && !m._muted ? m._node.gain.setValueAtTime(f, t.ctx.currentTime) : m._node && !m._muted && (m._node.volume = f * t.volume()), r._emit("volume", m._id))
                } else return m = h ? r._soundById(h) : r._sounds[0], m ? m._volume : 0;
                return r
            },
            fade: function(r, a, f, h) {
                var v = this;
                if (v._state !== "loaded" || v._playLock) return v._queue.push({
                    event: "fade",
                    action: function() {
                        v.fade(r, a, f, h)
                    }
                }), v;
                r = Math.min(Math.max(0, parseFloat(r)), 1), a = Math.min(Math.max(0, parseFloat(a)), 1), f = parseFloat(f), v.volume(r, h);
                for (var g = v._getSoundIds(h), m = 0; m < g.length; m++) {
                    var y = v._soundById(g[m]);
                    if (y) {
                        if (h || v._stopFade(g[m]), v._webAudio && !y._muted) {
                            var A = t.ctx.currentTime,
                                b = A + f / 1e3;
                            y._volume = r, y._node.gain.setValueAtTime(r, A), y._node.gain.linearRampToValueAtTime(a, b)
                        }
                        v._startFadeInterval(y, r, a, f, g[m], typeof h > "u")
                    }
                }
                return v
            },
            _startFadeInterval: function(r, a, f, h, v, g) {
                var m = this,
                    y = a,
                    A = f - a,
                    b = Math.abs(A / .01),
                    $ = Math.max(4, b > 0 ? h / b : h),
                    N = Date.now();
                r._fadeTo = f, r._interval = setInterval(function() {
                    var U = (Date.now() - N) / h;
                    N = Date.now(), y += A * U, y = Math.round(y * 100) / 100, A < 0 ? y = Math.max(f, y) : y = Math.min(f, y), m._webAudio ? r._volume = y : m.volume(y, r._id, !0), g && (m._volume = y), (f < a && y <= f || f > a && y >= f) && (clearInterval(r._interval), r._interval = null, r._fadeTo = null, m.volume(f, r._id), m._emit("fade", r._id))
                }, $)
            },
            _stopFade: function(r) {
                var a = this,
                    f = a._soundById(r);
                return f && f._interval && (a._webAudio && f._node.gain.cancelScheduledValues(t.ctx.currentTime), clearInterval(f._interval), f._interval = null, a.volume(f._fadeTo, r), f._fadeTo = null, a._emit("fade", r)), a
            },
            loop: function() {
                var r = this,
                    a = arguments,
                    f, h, v;
                if (a.length === 0) return r._loop;
                if (a.length === 1)
                    if (typeof a[0] == "boolean") f = a[0], r._loop = f;
                    else return v = r._soundById(parseInt(a[0], 10)), v ? v._loop : !1;
                else a.length === 2 && (f = a[0], h = parseInt(a[1], 10));
                for (var g = r._getSoundIds(h), m = 0; m < g.length; m++) v = r._soundById(g[m]), v && (v._loop = f, r._webAudio && v._node && v._node.bufferSource && (v._node.bufferSource.loop = f, f && (v._node.bufferSource.loopStart = v._start || 0, v._node.bufferSource.loopEnd = v._stop, r.playing(g[m]) && (r.pause(g[m], !0), r.play(g[m], !0)))));
                return r
            },
            rate: function() {
                var r = this,
                    a = arguments,
                    f, h;
                if (a.length === 0) h = r._sounds[0]._id;
                else if (a.length === 1) {
                    var v = r._getSoundIds(),
                        g = v.indexOf(a[0]);
                    g >= 0 ? h = parseInt(a[0], 10) : f = parseFloat(a[0])
                } else a.length === 2 && (f = parseFloat(a[0]), h = parseInt(a[1], 10));
                var m;
                if (typeof f == "number") {
                    if (r._state !== "loaded" || r._playLock) return r._queue.push({
                        event: "rate",
                        action: function() {
                            r.rate.apply(r, a)
                        }
                    }), r;
                    typeof h > "u" && (r._rate = f), h = r._getSoundIds(h);
                    for (var y = 0; y < h.length; y++)
                        if (m = r._soundById(h[y]), m) {
                            r.playing(h[y]) && (m._rateSeek = r.seek(h[y]), m._playStart = r._webAudio ? t.ctx.currentTime : m._playStart), m._rate = f, r._webAudio && m._node && m._node.bufferSource ? m._node.bufferSource.playbackRate.setValueAtTime(f, t.ctx.currentTime) : m._node && (m._node.playbackRate = f);
                            var A = r.seek(h[y]),
                                b = (r._sprite[m._sprite][0] + r._sprite[m._sprite][1]) / 1e3 - A,
                                $ = b * 1e3 / Math.abs(m._rate);
                            (r._endTimers[h[y]] || !m._paused) && (r._clearTimer(h[y]), r._endTimers[h[y]] = setTimeout(r._ended.bind(r, m), $)), r._emit("rate", m._id)
                        }
                } else return m = r._soundById(h), m ? m._rate : r._rate;
                return r
            },
            seek: function() {
                var r = this,
                    a = arguments,
                    f, h;
                if (a.length === 0) r._sounds.length && (h = r._sounds[0]._id);
                else if (a.length === 1) {
                    var v = r._getSoundIds(),
                        g = v.indexOf(a[0]);
                    g >= 0 ? h = parseInt(a[0], 10) : r._sounds.length && (h = r._sounds[0]._id, f = parseFloat(a[0]))
                } else a.length === 2 && (f = parseFloat(a[0]), h = parseInt(a[1], 10));
                if (typeof h > "u") return 0;
                if (typeof f == "number" && (r._state !== "loaded" || r._playLock)) return r._queue.push({
                    event: "seek",
                    action: function() {
                        r.seek.apply(r, a)
                    }
                }), r;
                var m = r._soundById(h);
                if (m)
                    if (typeof f == "number" && f >= 0) {
                        var y = r.playing(h);
                        y && r.pause(h, !0), m._seek = f, m._ended = !1, r._clearTimer(h), !r._webAudio && m._node && !isNaN(m._node.duration) && (m._node.currentTime = f);
                        var A = function() {
                            y && r.play(h, !0), r._emit("seek", h)
                        };
                        if (y && !r._webAudio) {
                            var b = function() {
                                r._playLock ? setTimeout(b, 0) : A()
                            };
                            setTimeout(b, 0)
                        } else A()
                    } else if (r._webAudio) {
                    var $ = r.playing(h) ? t.ctx.currentTime - m._playStart : 0,
                        N = m._rateSeek ? m._rateSeek - m._seek : 0;
                    return m._seek + (N + $ * Math.abs(m._rate))
                } else return m._node.currentTime;
                return r
            },
            playing: function(r) {
                var a = this;
                if (typeof r == "number") {
                    var f = a._soundById(r);
                    return f ? !f._paused : !1
                }
                for (var h = 0; h < a._sounds.length; h++)
                    if (!a._sounds[h]._paused) return !0;
                return !1
            },
            duration: function(r) {
                var a = this,
                    f = a._duration,
                    h = a._soundById(r);
                return h && (f = a._sprite[h._sprite][1] / 1e3), f
            },
            state: function() {
                return this._state
            },
            unload: function() {
                for (var r = this, a = r._sounds, f = 0; f < a.length; f++) a[f]._paused || r.stop(a[f]._id), r._webAudio || (r._clearSound(a[f]._node), a[f]._node.removeEventListener("error", a[f]._errorFn, !1), a[f]._node.removeEventListener(t._canPlayEvent, a[f]._loadFn, !1), a[f]._node.removeEventListener("ended", a[f]._endFn, !1), t._releaseHtml5Audio(a[f]._node)), delete a[f]._node, r._clearTimer(a[f]._id);
                var h = t._howls.indexOf(r);
                h >= 0 && t._howls.splice(h, 1);
                var v = !0;
                for (f = 0; f < t._howls.length; f++)
                    if (t._howls[f]._src === r._src || r._src.indexOf(t._howls[f]._src) >= 0) {
                        v = !1;
                        break
                    } return s && v && delete s[r._src], t.noAudio = !1, r._state = "unloaded", r._sounds = [], r = null, null
            },
            on: function(r, a, f, h) {
                var v = this,
                    g = v["_on" + r];
                return typeof a == "function" && g.push(h ? {
                    id: f,
                    fn: a,
                    once: h
                } : {
                    id: f,
                    fn: a
                }), v
            },
            off: function(r, a, f) {
                var h = this,
                    v = h["_on" + r],
                    g = 0;
                if (typeof a == "number" && (f = a, a = null), a || f)
                    for (g = 0; g < v.length; g++) {
                        var m = f === v[g].id;
                        if (a === v[g].fn && m || !a && m) {
                            v.splice(g, 1);
                            break
                        }
                    } else if (r) h["_on" + r] = [];
                    else {
                        var y = Object.keys(h);
                        for (g = 0; g < y.length; g++) y[g].indexOf("_on") === 0 && Array.isArray(h[y[g]]) && (h[y[g]] = [])
                    } return h
            },
            once: function(r, a, f) {
                var h = this;
                return h.on(r, a, f, 1), h
            },
            _emit: function(r, a, f) {
                for (var h = this, v = h["_on" + r], g = v.length - 1; g >= 0; g--)(!v[g].id || v[g].id === a || r === "load") && (setTimeout(function(m) {
                    m.call(this, a, f)
                }.bind(h, v[g].fn), 0), v[g].once && h.off(r, v[g].fn, v[g].id));
                return h._loadQueue(r), h
            },
            _loadQueue: function(r) {
                var a = this;
                if (a._queue.length > 0) {
                    var f = a._queue[0];
                    f.event === r && (a._queue.shift(), a._loadQueue()), r || f.action()
                }
                return a
            },
            _ended: function(r) {
                var a = this,
                    f = r._sprite;
                if (!a._webAudio && r._node && !r._node.paused && !r._node.ended && r._node.currentTime < r._stop) return setTimeout(a._ended.bind(a, r), 100), a;
                var h = !!(r._loop || a._sprite[f][2]);
                if (a._emit("end", r._id), !a._webAudio && h && a.stop(r._id, !0).play(r._id), a._webAudio && h) {
                    a._emit("play", r._id), r._seek = r._start || 0, r._rateSeek = 0, r._playStart = t.ctx.currentTime;
                    var v = (r._stop - r._start) * 1e3 / Math.abs(r._rate);
                    a._endTimers[r._id] = setTimeout(a._ended.bind(a, r), v)
                }
                return a._webAudio && !h && (r._paused = !0, r._ended = !0, r._seek = r._start || 0, r._rateSeek = 0, a._clearTimer(r._id), a._cleanBuffer(r._node), t._autoSuspend()), !a._webAudio && !h && a.stop(r._id, !0), a
            },
            _clearTimer: function(r) {
                var a = this;
                if (a._endTimers[r]) {
                    if (typeof a._endTimers[r] != "function") clearTimeout(a._endTimers[r]);
                    else {
                        var f = a._soundById(r);
                        f && f._node && f._node.removeEventListener("ended", a._endTimers[r], !1)
                    }
                    delete a._endTimers[r]
                }
                return a
            },
            _soundById: function(r) {
                for (var a = this, f = 0; f < a._sounds.length; f++)
                    if (r === a._sounds[f]._id) return a._sounds[f];
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
                    f = 0,
                    h = 0;
                if (!(r._sounds.length < a)) {
                    for (h = 0; h < r._sounds.length; h++) r._sounds[h]._ended && f++;
                    for (h = r._sounds.length - 1; h >= 0; h--) {
                        if (f <= a) return;
                        r._sounds[h]._ended && (r._webAudio && r._sounds[h]._node && r._sounds[h]._node.disconnect(0), r._sounds.splice(h, 1), f--)
                    }
                }
            },
            _getSoundIds: function(r) {
                var a = this;
                if (typeof r > "u") {
                    for (var f = [], h = 0; h < a._sounds.length; h++) f.push(a._sounds[h]._id);
                    return f
                } else return [r]
            },
            _refreshBuffer: function(r) {
                var a = this;
                return r._node.bufferSource = t.ctx.createBufferSource(), r._node.bufferSource.buffer = s[a._src], r._panner ? r._node.bufferSource.connect(r._panner) : r._node.bufferSource.connect(r._node), r._node.bufferSource.loop = r._loop, r._loop && (r._node.bufferSource.loopStart = r._start || 0, r._node.bufferSource.loopEnd = r._stop || 0), r._node.bufferSource.playbackRate.setValueAtTime(r._rate, t.ctx.currentTime), a
            },
            _cleanBuffer: function(r) {
                var a = this,
                    f = t._navigator && t._navigator.vendor.indexOf("Apple") >= 0;
                if (!r.bufferSource) return a;
                if (t._scratchBuffer && r.bufferSource && (r.bufferSource.onended = null, r.bufferSource.disconnect(0), f)) try {
                    r.bufferSource.buffer = t._scratchBuffer
                } catch (h) {}
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
                    f = t._muted || r._muted || r._parent._muted ? 0 : r._volume;
                return a._webAudio ? (r._node = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), r._node.gain.setValueAtTime(f, t.ctx.currentTime), r._node.paused = !0, r._node.connect(t.masterGain)) : t.noAudio || (r._node = t._obtainHtml5Audio(), r._errorFn = r._errorListener.bind(r), r._node.addEventListener("error", r._errorFn, !1), r._loadFn = r._loadListener.bind(r), r._node.addEventListener(t._canPlayEvent, r._loadFn, !1), r._endFn = r._endListener.bind(r), r._node.addEventListener("ended", r._endFn, !1), r._node.src = a._src, r._node.preload = a._preload === !0 ? "auto" : a._preload, r._node.volume = f * t.volume(), r._node.load()), r
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
                    r._duration = s[a].duration, d(r);
                    return
                }
                if (/^data:[^;]+;base64,/.test(a)) {
                    for (var f = atob(a.split(",")[1]), h = new Uint8Array(f.length), v = 0; v < f.length; ++v) h[v] = f.charCodeAt(v);
                    u(h.buffer, r)
                } else {
                    var g = new XMLHttpRequest;
                    g.open(r._xhr.method, a, !0), g.withCredentials = r._xhr.withCredentials, g.responseType = "arraybuffer", r._xhr.headers && Object.keys(r._xhr.headers).forEach(function(m) {
                        g.setRequestHeader(m, r._xhr.headers[m])
                    }), g.onload = function() {
                        var m = (g.status + "")[0];
                        if (m !== "0" && m !== "2" && m !== "3") {
                            r._emit("loaderror", null, "Failed loading audio file with status: " + g.status + ".");
                            return
                        }
                        u(g.response, r)
                    }, g.onerror = function() {
                        r._webAudio && (r._html5 = !0, r._webAudio = !1, r._sounds = [], delete s[a], r.load())
                    }, c(g)
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
                var f = function() {
                        a._emit("loaderror", null, "Decoding audio data failed.")
                    },
                    h = function(v) {
                        v && a._sounds.length > 0 ? (s[a._src] = v, d(a, v)) : f()
                    };
                typeof Promise < "u" && t.ctx.decodeAudioData.length === 1 ? t.ctx.decodeAudioData(r).then(h).catch(f) : t.ctx.decodeAudioData(r, h, f)
            },
            d = function(r, a) {
                a && !r._duration && (r._duration = a.duration), Object.keys(r._sprite).length === 0 && (r._sprite = {
                    __default: [0, r._duration * 1e3]
                }), r._state !== "loaded" && (r._state = "loaded", r._emit("load"), r._loadQueue())
            },
            p = function() {
                if (t.usingWebAudio) {
                    try {
                        typeof AudioContext < "u" ? t.ctx = new AudioContext : typeof webkitAudioContext < "u" ? t.ctx = new webkitAudioContext : t.usingWebAudio = !1
                    } catch (v) {
                        t.usingWebAudio = !1
                    }
                    t.ctx || (t.usingWebAudio = !1);
                    var r = /iP(hone|od|ad)/.test(t._navigator && t._navigator.platform),
                        a = t._navigator && t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                        f = a ? parseInt(a[1], 10) : null;
                    if (r && f && f < 9) {
                        var h = /safari/.test(t._navigator && t._navigator.userAgent.toLowerCase());
                        t._navigator && !h && (t.usingWebAudio = !1)
                    }
                    t.usingWebAudio && (t.masterGain = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), t.masterGain.gain.setValueAtTime(t._muted ? 0 : t._volume, t.ctx.currentTime), t.masterGain.connect(t.ctx.destination)), t._setup()
                }
            };
        e.Howler = t, e.Howl = o, typeof Ue < "u" ? (Ue.HowlerGlobal = n, Ue.Howler = t, Ue.Howl = o, Ue.Sound = i) : typeof window < "u" && (window.HowlerGlobal = n, window.Howler = t, window.Howl = o, window.Sound = i)
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
            var d = u._orientation;
            if (o = typeof o != "number" ? d[1] : o, i = typeof i != "number" ? d[2] : i, s = typeof s != "number" ? d[3] : s, l = typeof l != "number" ? d[4] : l, c = typeof c != "number" ? d[5] : c, typeof t == "number") u._orientation = [t, o, i, s, l, c], typeof u.ctx.listener.forwardX < "u" ? (u.ctx.listener.forwardX.setTargetAtTime(t, Howler.ctx.currentTime, .1), u.ctx.listener.forwardY.setTargetAtTime(o, Howler.ctx.currentTime, .1), u.ctx.listener.forwardZ.setTargetAtTime(i, Howler.ctx.currentTime, .1), u.ctx.listener.upX.setTargetAtTime(s, Howler.ctx.currentTime, .1), u.ctx.listener.upY.setTargetAtTime(l, Howler.ctx.currentTime, .1), u.ctx.listener.upZ.setTargetAtTime(c, Howler.ctx.currentTime, .1)) : u.ctx.listener.setOrientation(t, o, i, s, l, c);
            else return d;
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
                var d = l._soundById(c[u]);
                if (d)
                    if (typeof t == "number") d._pos = [t, o, i], d._node && ((!d._panner || d._panner.pan) && n(d, "spatial"), typeof d._panner.positionX < "u" ? (d._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), d._panner.positionY.setValueAtTime(o, Howler.ctx.currentTime), d._panner.positionZ.setValueAtTime(i, Howler.ctx.currentTime)) : d._panner.setPosition(t, o, i)), l._emit("pos", d._id);
                    else return d._pos
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
                var d = l._soundById(c[u]);
                if (d)
                    if (typeof t == "number") d._orientation = [t, o, i], d._node && (d._panner || (d._pos || (d._pos = l._pos || [0, 0, -.5]), n(d, "spatial")), typeof d._panner.orientationX < "u" ? (d._panner.orientationX.setValueAtTime(t, Howler.ctx.currentTime), d._panner.orientationY.setValueAtTime(o, Howler.ctx.currentTime), d._panner.orientationZ.setValueAtTime(i, Howler.ctx.currentTime)) : d._panner.setOrientation(t, o, i)), l._emit("orientation", d._id);
                    else return d._orientation
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
})(cn);
const cs = () => {},
    us = e => e instanceof Function ? e() : e,
    qr = async e => new Promise(n => setTimeout(n, e)), xl = e => new URLSearchParams(window.location.search).get(e), ni = xl("muted"), Sl = !ni || ni === "1", Tl = {
        muted: Sl
    }, [lo, fs] = Gt(Tl);
mn(() => {
    document.addEventListener("visibilitychange", () => {
        const e = lo.muted;
        document.hidden ? cn.Howler.mute(!0) : e || cn.Howler.mute(!1)
    })
});
_e(() => {
    const e = lo.muted;
    cn.Howler.mute(e)
});
const kl = () => {
        fs("muted", e => !e)
    },
    $l = e => {
        fs("muted", e)
    },
    Vt = {
        options: lo,
        toggleMute: kl,
        setMute: $l
    },
    st = (e, n = {}) => {
        const [t, o] = Y(null), [i, s] = Y(!1);
        _e(() => {
            const r = fe(t);
            r == null || r.unload(), o(null);
            const a = us(e);
            !a || Array.isArray(a) && a.length === 0 || new cn.Howl({
                src: a,
                html5: n.html5,
                autoplay: n.autoplay,
                loop: n.loop,
                sprite: n.sprite,
                onload: function() {
                    o(this)
                },
                onplayerror: function(f, h) {
                    typeof h == "string" && h.includes("Playback was unable to start") && s(!0)
                }
            })
        }), Ae(() => {
            var r;
            (r = t()) == null || r.unload()
        });
        const l = (r, a = {}) => {
                const f = t();
                if (f) return a.interrupt && f.stop(), f.play(r)
            },
            c = r => {
                var a;
                return (a = t()) == null ? void 0 : a.stop(r)
            },
            u = r => {
                var a;
                return (a = t()) == null ? void 0 : a.pause(r)
            },
            d = () => {
                const r = t();
                r && (r.playing() ? r.pause() : r.play())
            },
            p = r => {
                var a;
                return (a = t()) == null ? void 0 : a.volume(r)
            };
        return _e(() => {
            var f;
            const r = Vt.options.muted,
                a = fe(i);
            !r && a && ((f = t()) == null || f.play(), s(!1))
        }), {
            internalInstance: t,
            play: l,
            stop: c,
            pause: u,
            toggle: d,
            setVolume: p
        }
    },
    Il = [{
        src: {
            mp3: "ambient-tracks/ambient-track/ambient-1.mp3",
            webm: "ambient-tracks/ambient-track/ambient-1.webm"
        },
        postDate: "2023-11-02"
    }],
    Ol = "modulepreload",
    Pl = function(e) {
        return "/" + e
    },
    ri = {},
    El = function(n, t, o) {
        if (!t || t.length === 0) return n();
        const i = document.getElementsByTagName("link");
        return Promise.all(t.map(s => {
            if (s = Pl(s), s in ri) return;
            ri[s] = !0;
            const l = s.endsWith(".css"),
                c = l ? '[rel="stylesheet"]' : "";
            if (!!o)
                for (let p = i.length - 1; p >= 0; p--) {
                    const r = i[p];
                    if (r.href === s && (!l || r.rel === "stylesheet")) return
                } else if (document.querySelector('link[href="'.concat(s, '"]').concat(c))) return;
            const d = document.createElement("link");
            if (d.rel = l ? "stylesheet" : Ol, l || (d.as = "script", d.crossOrigin = ""), d.href = s, document.head.appendChild(d), l) return new Promise((p, r) => {
                d.addEventListener("load", p), d.addEventListener("error", () => r(new Error("Unable to preload CSS for ".concat(s))))
            })
        })).then(() => n()).catch(s => {
            const l = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (l.payload = s, window.dispatchEvent(l), !l.defaultPrevented) throw s
        })
    },
    ds = "Asia/Tokyo";
var ps = {
    exports: {}
};
(function(e, n) {
    (function(t, o) {
        e.exports = o()
    })(Ue, function() {
        var t = 1e3,
            o = 6e4,
            i = 36e5,
            s = "millisecond",
            l = "second",
            c = "minute",
            u = "hour",
            d = "day",
            p = "week",
            r = "month",
            a = "quarter",
            f = "year",
            h = "date",
            v = "Invalid Date",
            g = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
            m = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
            y = {
                name: "en",
                weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                ordinal: function(D) {
                    var I = ["th", "st", "nd", "rd"],
                        w = D % 100;
                    return "[" + D + (I[(w - 20) % 10] || I[w] || I[0]) + "]"
                }
            },
            A = function(D, I, w) {
                var T = String(D);
                return !T || T.length >= I ? D : "" + Array(I + 1 - T.length).join(w) + D
            },
            b = {
                s: A,
                z: function(D) {
                    var I = -D.utcOffset(),
                        w = Math.abs(I),
                        T = Math.floor(w / 60),
                        k = w % 60;
                    return (I <= 0 ? "+" : "-") + A(T, 2, "0") + ":" + A(k, 2, "0")
                },
                m: function D(I, w) {
                    if (I.date() < w.date()) return -D(w, I);
                    var T = 12 * (w.year() - I.year()) + (w.month() - I.month()),
                        k = I.clone().add(T, r),
                        O = w - k < 0,
                        M = I.clone().add(T + (O ? -1 : 1), r);
                    return +(-(T + (w - k) / (O ? k - M : M - k)) || 0)
                },
                a: function(D) {
                    return D < 0 ? Math.ceil(D) || 0 : Math.floor(D)
                },
                p: function(D) {
                    return {
                        M: r,
                        y: f,
                        w: p,
                        d,
                        D: h,
                        h: u,
                        m: c,
                        s: l,
                        ms: s,
                        Q: a
                    } [D] || String(D || "").toLowerCase().replace(/s$/, "")
                },
                u: function(D) {
                    return D === void 0
                }
            },
            $ = "en",
            N = {};
        N[$] = y;
        var U = "$isDayjsObject",
            L = function(D) {
                return D instanceof K || !(!D || !D[U])
            },
            B = function D(I, w, T) {
                var k;
                if (!I) return $;
                if (typeof I == "string") {
                    var O = I.toLowerCase();
                    N[O] && (k = O), w && (N[O] = w, k = O);
                    var M = I.split("-");
                    if (!k && M.length > 1) return D(M[0])
                } else {
                    var F = I.name;
                    N[F] = I, k = F
                }
                return !T && k && ($ = k), k || !T && $
            },
            z = function(D, I) {
                if (L(D)) return D.clone();
                var w = typeof I == "object" ? I : {};
                return w.date = D, w.args = arguments, new K(w)
            },
            R = b;
        R.l = B, R.i = L, R.w = function(D, I) {
            return z(D, {
                locale: I.$L,
                utc: I.$u,
                x: I.$x,
                $offset: I.$offset
            })
        };
        var K = function() {
                function D(w) {
                    this.$L = B(w.locale, null, !0), this.parse(w), this.$x = this.$x || w.x || {}, this[U] = !0
                }
                var I = D.prototype;
                return I.parse = function(w) {
                    this.$d = function(T) {
                        var k = T.date,
                            O = T.utc;
                        if (k === null) return new Date(NaN);
                        if (R.u(k)) return new Date;
                        if (k instanceof Date) return new Date(k);
                        if (typeof k == "string" && !/Z$/i.test(k)) {
                            var M = k.match(g);
                            if (M) {
                                var F = M[2] - 1 || 0,
                                    W = (M[7] || "0").substring(0, 3);
                                return O ? new Date(Date.UTC(M[1], F, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, W)) : new Date(M[1], F, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, W)
                            }
                        }
                        return new Date(k)
                    }(w), this.init()
                }, I.init = function() {
                    var w = this.$d;
                    this.$y = w.getFullYear(), this.$M = w.getMonth(), this.$D = w.getDate(), this.$W = w.getDay(), this.$H = w.getHours(), this.$m = w.getMinutes(), this.$s = w.getSeconds(), this.$ms = w.getMilliseconds()
                }, I.$utils = function() {
                    return R
                }, I.isValid = function() {
                    return this.$d.toString() !== v
                }, I.isSame = function(w, T) {
                    var k = z(w);
                    return this.startOf(T) <= k && k <= this.endOf(T)
                }, I.isAfter = function(w, T) {
                    return z(w) < this.startOf(T)
                }, I.isBefore = function(w, T) {
                    return this.endOf(T) < z(w)
                }, I.$g = function(w, T, k) {
                    return R.u(w) ? this[T] : this.set(k, w)
                }, I.unix = function() {
                    return Math.floor(this.valueOf() / 1e3)
                }, I.valueOf = function() {
                    return this.$d.getTime()
                }, I.startOf = function(w, T) {
                    var k = this,
                        O = !!R.u(T) || T,
                        M = R.p(w),
                        F = function(H, V) {
                            var Z = R.w(k.$u ? Date.UTC(k.$y, V, H) : new Date(k.$y, V, H), k);
                            return O ? Z : Z.endOf(d)
                        },
                        W = function(H, V) {
                            return R.w(k.toDate()[H].apply(k.toDate("s"), (O ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(V)), k)
                        },
                        Q = this.$W,
                        J = this.$M,
                        re = this.$D,
                        pe = "set" + (this.$u ? "UTC" : "");
                    switch (M) {
                        case f:
                            return O ? F(1, 0) : F(31, 11);
                        case r:
                            return O ? F(1, J) : F(0, J + 1);
                        case p:
                            var P = this.$locale().weekStart || 0,
                                G = (Q < P ? Q + 7 : Q) - P;
                            return F(O ? re - G : re + (6 - G), J);
                        case d:
                        case h:
                            return W(pe + "Hours", 0);
                        case u:
                            return W(pe + "Minutes", 1);
                        case c:
                            return W(pe + "Seconds", 2);
                        case l:
                            return W(pe + "Milliseconds", 3);
                        default:
                            return this.clone()
                    }
                }, I.endOf = function(w) {
                    return this.startOf(w, !1)
                }, I.$set = function(w, T) {
                    var k, O = R.p(w),
                        M = "set" + (this.$u ? "UTC" : ""),
                        F = (k = {}, k[d] = M + "Date", k[h] = M + "Date", k[r] = M + "Month", k[f] = M + "FullYear", k[u] = M + "Hours", k[c] = M + "Minutes", k[l] = M + "Seconds", k[s] = M + "Milliseconds", k)[O],
                        W = O === d ? this.$D + (T - this.$W) : T;
                    if (O === r || O === f) {
                        var Q = this.clone().set(h, 1);
                        Q.$d[F](W), Q.init(), this.$d = Q.set(h, Math.min(this.$D, Q.daysInMonth())).$d
                    } else F && this.$d[F](W);
                    return this.init(), this
                }, I.set = function(w, T) {
                    return this.clone().$set(w, T)
                }, I.get = function(w) {
                    return this[R.p(w)]()
                }, I.add = function(w, T) {
                    var k, O = this;
                    w = Number(w);
                    var M = R.p(T),
                        F = function(J) {
                            var re = z(O);
                            return R.w(re.date(re.date() + Math.round(J * w)), O)
                        };
                    if (M === r) return this.set(r, this.$M + w);
                    if (M === f) return this.set(f, this.$y + w);
                    if (M === d) return F(1);
                    if (M === p) return F(7);
                    var W = (k = {}, k[c] = o, k[u] = i, k[l] = t, k)[M] || 1,
                        Q = this.$d.getTime() + w * W;
                    return R.w(Q, this)
                }, I.subtract = function(w, T) {
                    return this.add(-1 * w, T)
                }, I.format = function(w) {
                    var T = this,
                        k = this.$locale();
                    if (!this.isValid()) return k.invalidDate || v;
                    var O = w || "YYYY-MM-DDTHH:mm:ssZ",
                        M = R.z(this),
                        F = this.$H,
                        W = this.$m,
                        Q = this.$M,
                        J = k.weekdays,
                        re = k.months,
                        pe = k.meridiem,
                        P = function(V, Z, q, ve) {
                            return V && (V[Z] || V(T, O)) || q[Z].slice(0, ve)
                        },
                        G = function(V) {
                            return R.s(F % 12 || 12, V, "0")
                        },
                        H = pe || function(V, Z, q) {
                            var ve = V < 12 ? "AM" : "PM";
                            return q ? ve.toLowerCase() : ve
                        };
                    return O.replace(m, function(V, Z) {
                        return Z || function(q) {
                            switch (q) {
                                case "YY":
                                    return String(T.$y).slice(-2);
                                case "YYYY":
                                    return R.s(T.$y, 4, "0");
                                case "M":
                                    return Q + 1;
                                case "MM":
                                    return R.s(Q + 1, 2, "0");
                                case "MMM":
                                    return P(k.monthsShort, Q, re, 3);
                                case "MMMM":
                                    return P(re, Q);
                                case "D":
                                    return T.$D;
                                case "DD":
                                    return R.s(T.$D, 2, "0");
                                case "d":
                                    return String(T.$W);
                                case "dd":
                                    return P(k.weekdaysMin, T.$W, J, 2);
                                case "ddd":
                                    return P(k.weekdaysShort, T.$W, J, 3);
                                case "dddd":
                                    return J[T.$W];
                                case "H":
                                    return String(F);
                                case "HH":
                                    return R.s(F, 2, "0");
                                case "h":
                                    return G(1);
                                case "hh":
                                    return G(2);
                                case "a":
                                    return H(F, W, !0);
                                case "A":
                                    return H(F, W, !1);
                                case "m":
                                    return String(W);
                                case "mm":
                                    return R.s(W, 2, "0");
                                case "s":
                                    return String(T.$s);
                                case "ss":
                                    return R.s(T.$s, 2, "0");
                                case "SSS":
                                    return R.s(T.$ms, 3, "0");
                                case "Z":
                                    return M
                            }
                            return null
                        }(V) || M.replace(":", "")
                    })
                }, I.utcOffset = function() {
                    return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                }, I.diff = function(w, T, k) {
                    var O, M = this,
                        F = R.p(T),
                        W = z(w),
                        Q = (W.utcOffset() - this.utcOffset()) * o,
                        J = this - W,
                        re = function() {
                            return R.m(M, W)
                        };
                    switch (F) {
                        case f:
                            O = re() / 12;
                            break;
                        case r:
                            O = re();
                            break;
                        case a:
                            O = re() / 3;
                            break;
                        case p:
                            O = (J - Q) / 6048e5;
                            break;
                        case d:
                            O = (J - Q) / 864e5;
                            break;
                        case u:
                            O = J / i;
                            break;
                        case c:
                            O = J / o;
                            break;
                        case l:
                            O = J / t;
                            break;
                        default:
                            O = J
                    }
                    return k ? O : R.a(O)
                }, I.daysInMonth = function() {
                    return this.endOf(r).$D
                }, I.$locale = function() {
                    return N[this.$L]
                }, I.locale = function(w, T) {
                    if (!w) return this.$L;
                    var k = this.clone(),
                        O = B(w, T, !0);
                    return O && (k.$L = O), k
                }, I.clone = function() {
                    return R.w(this.$d, this)
                }, I.toDate = function() {
                    return new Date(this.valueOf())
                }, I.toJSON = function() {
                    return this.isValid() ? this.toISOString() : null
                }, I.toISOString = function() {
                    return this.$d.toISOString()
                }, I.toString = function() {
                    return this.$d.toUTCString()
                }, D
            }(),
            de = K.prototype;
        return z.prototype = de, [
            ["$ms", s],
            ["$s", l],
            ["$m", c],
            ["$H", u],
            ["$W", d],
            ["$M", r],
            ["$y", f],
            ["$D", h]
        ].forEach(function(D) {
            de[D[1]] = function(I) {
                return this.$g(I, D[0], D[1])
            }
        }), z.extend = function(D, I) {
            return D.$i || (D(I, K, z), D.$i = !0), z
        }, z.locale = B, z.isDayjs = L, z.unix = function(D) {
            return z(1e3 * D)
        }, z.en = N[$], z.Ls = N, z.p = {}, z
    })
})(ps);
var Cl = ps.exports;
const We = _n(Cl);
var vs = {
    exports: {}
};
(function(e, n) {
    (function(t, o) {
        e.exports = o()
    })(Ue, function() {
        return function(t, o) {
            o.prototype.isSameOrBefore = function(i, s) {
                return this.isSame(i, s) || this.isBefore(i, s)
            }
        }
    })
})(vs);
var Dl = vs.exports;
const Ml = _n(Dl);
var hs = {
    exports: {}
};
(function(e, n) {
    (function(t, o) {
        e.exports = o()
    })(Ue, function() {
        var t = "minute",
            o = /[+-]\d\d(?::?\d\d)?/g,
            i = /([+-]|\d\d)/g;
        return function(s, l, c) {
            var u = l.prototype;
            c.utc = function(v) {
                var g = {
                    date: v,
                    utc: !0,
                    args: arguments
                };
                return new l(g)
            }, u.utc = function(v) {
                var g = c(this.toDate(), {
                    locale: this.$L,
                    utc: !0
                });
                return v ? g.add(this.utcOffset(), t) : g
            }, u.local = function() {
                return c(this.toDate(), {
                    locale: this.$L,
                    utc: !1
                })
            };
            var d = u.parse;
            u.parse = function(v) {
                v.utc && (this.$u = !0), this.$utils().u(v.$offset) || (this.$offset = v.$offset), d.call(this, v)
            };
            var p = u.init;
            u.init = function() {
                if (this.$u) {
                    var v = this.$d;
                    this.$y = v.getUTCFullYear(), this.$M = v.getUTCMonth(), this.$D = v.getUTCDate(), this.$W = v.getUTCDay(), this.$H = v.getUTCHours(), this.$m = v.getUTCMinutes(), this.$s = v.getUTCSeconds(), this.$ms = v.getUTCMilliseconds()
                } else p.call(this)
            };
            var r = u.utcOffset;
            u.utcOffset = function(v, g) {
                var m = this.$utils().u;
                if (m(v)) return this.$u ? 0 : m(this.$offset) ? r.call(this) : this.$offset;
                if (typeof v == "string" && (v = function($) {
                        $ === void 0 && ($ = "");
                        var N = $.match(o);
                        if (!N) return null;
                        var U = ("" + N[0]).match(i) || ["-", 0, 0],
                            L = U[0],
                            B = 60 * +U[1] + +U[2];
                        return B === 0 ? 0 : L === "+" ? B : -B
                    }(v), v === null)) return this;
                var y = Math.abs(v) <= 16 ? 60 * v : v,
                    A = this;
                if (g) return A.$offset = y, A.$u = v === 0, A;
                if (v !== 0) {
                    var b = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
                    (A = this.local().add(y + b, t)).$offset = y, A.$x.$localOffset = b
                } else A = this.utc();
                return A
            };
            var a = u.format;
            u.format = function(v) {
                var g = v || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
                return a.call(this, g)
            }, u.valueOf = function() {
                var v = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
                return this.$d.valueOf() - 6e4 * v
            }, u.isUTC = function() {
                return !!this.$u
            }, u.toISOString = function() {
                return this.toDate().toISOString()
            }, u.toString = function() {
                return this.toDate().toUTCString()
            };
            var f = u.toDate;
            u.toDate = function(v) {
                return v === "s" && this.$offset ? c(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : f.call(this)
            };
            var h = u.diff;
            u.diff = function(v, g, m) {
                if (v && this.$u === v.$u) return h.call(this, v, g, m);
                var y = this.local(),
                    A = c(v).local();
                return h.call(y, A, g, m)
            }
        }
    })
})(hs);
var Bl = hs.exports;
const Ll = _n(Bl);
var ms = {
    exports: {}
};
(function(e, n) {
    (function(t, o) {
        e.exports = o()
    })(Ue, function() {
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
            var c, u = function(a, f, h) {
                    h === void 0 && (h = {});
                    var v = new Date(a),
                        g = function(m, y) {
                            y === void 0 && (y = {});
                            var A = y.timeZoneName || "short",
                                b = m + "|" + A,
                                $ = o[b];
                            return $ || ($ = new Intl.DateTimeFormat("en-US", {
                                hour12: !1,
                                timeZone: m,
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                timeZoneName: A
                            }), o[b] = $), $
                        }(f, h);
                    return g.formatToParts(v)
                },
                d = function(a, f) {
                    for (var h = u(a, f), v = [], g = 0; g < h.length; g += 1) {
                        var m = h[g],
                            y = m.type,
                            A = m.value,
                            b = t[y];
                        b >= 0 && (v[b] = parseInt(A, 10))
                    }
                    var $ = v[3],
                        N = $ === 24 ? 0 : $,
                        U = v[0] + "-" + v[1] + "-" + v[2] + " " + N + ":" + v[4] + ":" + v[5] + ":000",
                        L = +a;
                    return (l.utc(U).valueOf() - (L -= L % 1e3)) / 6e4
                },
                p = s.prototype;
            p.tz = function(a, f) {
                a === void 0 && (a = c);
                var h = this.utcOffset(),
                    v = this.toDate(),
                    g = v.toLocaleString("en-US", {
                        timeZone: a
                    }),
                    m = Math.round((v - new Date(g)) / 1e3 / 60),
                    y = l(g, {
                        locale: this.$L
                    }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(v.getTimezoneOffset() / 15) - m, !0);
                if (f) {
                    var A = y.utcOffset();
                    y = y.add(h - A, "minute")
                }
                return y.$x.$timezone = a, y
            }, p.offsetName = function(a) {
                var f = this.$x.$timezone || l.tz.guess(),
                    h = u(this.valueOf(), f, {
                        timeZoneName: a
                    }).find(function(v) {
                        return v.type.toLowerCase() === "timezonename"
                    });
                return h && h.value
            };
            var r = p.startOf;
            p.startOf = function(a, f) {
                if (!this.$x || !this.$x.$timezone) return r.call(this, a, f);
                var h = l(this.format("YYYY-MM-DD HH:mm:ss:SSS"), {
                    locale: this.$L
                });
                return r.call(h, a, f).tz(this.$x.$timezone, !0)
            }, l.tz = function(a, f, h) {
                var v = h && f,
                    g = h || f || c,
                    m = d(+l(), g);
                if (typeof a != "string") return l(a).tz(g);
                var y = function(N, U, L) {
                        var B = N - 60 * U * 1e3,
                            z = d(B, L);
                        if (U === z) return [B, U];
                        var R = d(B -= 60 * (z - U) * 1e3, L);
                        return z === R ? [B, z] : [N - 60 * Math.min(z, R) * 1e3, Math.max(z, R)]
                    }(l.utc(a, v).valueOf(), m, g),
                    A = y[0],
                    b = y[1],
                    $ = l(A).utcOffset(b);
                return $.$x.$timezone = g, $
            }, l.tz.guess = function() {
                return Intl.DateTimeFormat().resolvedOptions().timeZone
            }, l.tz.setDefault = function(a) {
                c = a
            }
        }
    })
})(ms);
var Rl = ms.exports;
const Vl = _n(Rl);
We.extend(Ll);
We.extend(Vl);
We.extend(Ml);
const zl = e => We(e),
    gs = (e, n, t, o = 0) => We(e).set("hour", n).set("minute", t).set("second", o),
    _s = e => We().tz(e),
    jl = (e, n) => We(e).format(n),
    Nl = (e, n) => We(e).isSameOrBefore(n),
    ys = (e, n) => We(e).isAfter(n),
    Hl = void 0;
Gt(Hl);
const Zt = e => () => e,
    Ul = "/assets/ambient-1-0f115a64.mp3",
    Fl = "/assets/ambient-1-bb1f2cb4.webm",
    Gl = "/assets/logbook-1-0fb8b45d.jpg",
    Zl = "/assets/logbook-10-bdea2a5b.jpg",
    Yl = "/assets/logbook-11-4c9da7f0.jpg",
    Wl = "/assets/logbook-2-f34a92a7.jpg",
    ql = "/assets/logbook-3-702b48ec.jpg",
    Ql = "/assets/logbook-4-e1e4d6b8.jpg",
    Kl = "/assets/logbook-5-b07340b1.jpg",
    Jl = "/assets/logbook-6-aad79ad3.jpg",
    Xl = "/assets/logbook-7-447b8550.jpg",
    ec = "/assets/logbook-8-75782f09.jpg",
    tc = "/assets/logbook-9-5c82ced1.jpg",
    nc = "/assets/bg-2b47d5eb.png",
    rc = "/assets/transition-video-ac7e7ebb.mp4",
    Tt = e => new URL(Object.assign({
        "../../../content/assets/ambient-tracks/ambient-track/ambient-1.mp3": Ul,
        "../../../content/assets/ambient-tracks/ambient-track/ambient-1.webm": Fl,
        "../../../content/assets/logs/log/logbook-1.jpg": Gl,
        "../../../content/assets/logs/log/logbook-10.jpg": Zl,
        "../../../content/assets/logs/log/logbook-11.jpg": Yl,
        "../../../content/assets/logs/log/logbook-2.jpg": Wl,
        "../../../content/assets/logs/log/logbook-3.jpg": ql,
        "../../../content/assets/logs/log/logbook-4.jpg": Ql,
        "../../../content/assets/logs/log/logbook-5.jpg": Kl,
        "../../../content/assets/logs/log/logbook-6.jpg": Jl,
        "../../../content/assets/logs/log/logbook-7.jpg": Xl,
        "../../../content/assets/logs/log/logbook-8.jpg": ec,
        "../../../content/assets/logs/log/logbook-9.jpg": tc,
        "../../../content/assets/scenes/scene/bg.png": nc,
        "../../../content/assets/scenes/scene/transition-video.mp4": rc
    })["../../../content/assets/".concat(e)], self.location).href,
    oc = Il,
    ic = Zt(oc),
    oi = () => {
        const e = ic()[0];
        return ht(ye({}, e), {
            srcWebm: Tt(e.src.webm),
            srcMp3: Tt(e.src.mp3)
        })
    },
    sc = [],
    ac = sc,
    lc = Zt(ac),
    on = () => {
        const e = lc()[0];
        if (e) return ht(ye({}, e), {
            srcWebm: Tt(e.src.webm),
            srcMp3: Tt(e.src.mp3)
        })
    },
    cc = "/assets/background-music-83982c9a.webm",
    uc = "/assets/background-music-f98c94df.mp3";

function fc(e) {
    return e !== null && (typeof e == "object" || typeof e == "function")
}

function ii(e, ...n) {
    return typeof e == "function" ? e(...n) : e
}
var dc = (e => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, {
        get: (n, t) => (typeof require < "u" ? require : n)[t]
    }) : e)(function(e) {
        if (typeof require < "u") return require.apply(this, arguments);
        throw Error('Dynamic require of "' + e + '" is not supported')
    }),
    pc = e => (typeof e.clear == "function" || (e.clear = () => {
        let n;
        for (; n = e.key(0);) e.removeItem(n)
    }), e),
    vc = e => {
        if (!e) return "";
        let n = "";
        for (const t in e) {
            if (!e.hasOwnProperty(t)) continue;
            const o = e[t];
            n += o instanceof Date ? "; ".concat(t, "=").concat(o.toUTCString()) : typeof o == "boolean" ? "; ".concat(t) : "; ".concat(t, "=").concat(o)
        }
        return n
    },
    si;
try {
    si = dc("solid-start/server").useRequest
} catch (e) {
    si = () => (console.warn("It seems you attempt to use cookieStorage on the server without having solid-start installed"), {
        request: {
            headers: {
                get: () => ""
            }
        }
    })
}
var mt = pc({
    _read: () => document.cookie,
    _write: (e, n, t) => {
        document.cookie = "".concat(e, "=").concat(n).concat(vc(t))
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

function hc(e, n = {}) {
    const t = n.storage || globalThis.localStorage;
    if (!t) return e;
    const o = n.name || "storage-".concat(ts()),
        i = n.serialize || JSON.stringify.bind(JSON),
        s = n.deserialize || JSON.parse.bind(JSON),
        l = t.getItem(o, n.storageOptions),
        c = typeof e[0] == "function" ? d => e[1](() => s(d)) : d => e[1](yl(s(d)));
    let u = !0;
    return l instanceof Promise ? l.then(d => u && d && c(d)) : l && c(l), [e[0], typeof e[0] == "function" ? d => {
        const p = e[1](d);
        return d != null ? t.setItem(o, i(p), n.storageOptions) : t.removeItem(o), u = !1, p
    } : (...d) => {
        e[1](...d), t.setItem(o, i(fe(() => e[0])), n.storageOptions), u = !1
    }]
}
const mc = [{
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
    gc = mc,
    _c = Zt(gc),
    un = () => _c().map(n => ht(ye({}, n), {
        postDate: zl(n.postDate).subtract(2, "day").format("YYYY-MM-DD")
    })),
    yc = {
        isInstructionsModalViewed: !1,
        isDataUsageWarningDialogAccepted: !1
    },
    [lt, yn] = hc(Gt(yc), {
        name: "notifications-manager-data"
    }),
    bc = () => lt.isInstructionsModalViewed !== !0,
    wc = () => {
        yn("isInstructionsModalViewed", !0)
    },
    Ac = () => lt.isDataUsageWarningDialogAccepted === !0,
    xc = () => {
        yn("isDataUsageWarningDialogAccepted", !0)
    },
    Sc = () => {
        const e = on();
        return e ? lt.lastPlayedAnsweringMachineTrackDate ? ys(e.postDate, lt.lastPlayedAnsweringMachineTrackDate) : !0 : !1
    },
    Tc = () => {
        const e = on();
        e && yn("lastPlayedAnsweringMachineTrackDate", e.postDate)
    },
    kc = () => {
        const e = un()[0];
        return e ? lt.lastPlayedArchiveDate ? ys(e.postDate, lt.lastPlayedArchiveDate) : !0 : !1
    },
    $c = e => {
        lt.lastPlayedArchiveDate && Nl(e, lt.lastPlayedArchiveDate) || yn("lastPlayedArchiveDate", e)
    },
    Ic = () => {
        const e = un()[0];
        e && yn("lastPlayedArchiveDate", e.postDate)
    },
    Ze = {
        instructionsModal: {
            isVisible: bc,
            setViewed: wc
        },
        dataUsageWarningDialog: {
            accepted: Ac,
            setAccepted: xc
        },
        answeringMachineTrack: {
            hasNew: Sc,
            setLastPlayed: Tc
        },
        archive: {
            hasNew: kc,
            setLastPlayed: $c,
            dismissNotification: Ic
        }
    };
var Pe = function() {
    return Pe = Object.assign || function(n) {
        for (var t, o = 1, i = arguments.length; o < i; o++) {
            t = arguments[o];
            for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (n[s] = t[s])
        }
        return n
    }, Pe.apply(this, arguments)
};

function et(e, n, t) {
    if (t || arguments.length === 2)
        for (var o = 0, i = n.length, s; o < i; o++)(s || !(o in n)) && (s || (s = Array.prototype.slice.call(n, 0, o)), s[o] = n[o]);
    return e.concat(s || Array.prototype.slice.call(n))
}
var Qr = {
        exports: {}
    },
    ai = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (ai) {
    var li = new Uint8Array(16);
    Qr.exports = function() {
        return ai(li), li
    }
} else {
    var ci = new Array(16);
    Qr.exports = function() {
        for (var n = 0, t; n < 16; n++) n & 3 || (t = Math.random() * 4294967296), ci[n] = t >>> ((n & 3) << 3) & 255;
        return ci
    }
}
var bs = Qr.exports,
    ws = [];
for (var zn = 0; zn < 256; ++zn) ws[zn] = (zn + 256).toString(16).substr(1);

function Oc(e, n) {
    var t = n || 0,
        o = ws;
    return [o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]]].join("")
}
var As = Oc,
    Pc = bs,
    Ec = As,
    ui, Tr, kr = 0,
    $r = 0;

function Cc(e, n, t) {
    var o = n && t || 0,
        i = n || [];
    e = e || {};
    var s = e.node || ui,
        l = e.clockseq !== void 0 ? e.clockseq : Tr;
    if (s == null || l == null) {
        var c = Pc();
        s == null && (s = ui = [c[0] | 1, c[1], c[2], c[3], c[4], c[5]]), l == null && (l = Tr = (c[6] << 8 | c[7]) & 16383)
    }
    var u = e.msecs !== void 0 ? e.msecs : new Date().getTime(),
        d = e.nsecs !== void 0 ? e.nsecs : $r + 1,
        p = u - kr + (d - $r) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383), (p < 0 || u > kr) && e.nsecs === void 0 && (d = 0), d >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    kr = u, $r = d, Tr = l, u += 122192928e5;
    var r = ((u & 268435455) * 1e4 + d) % 4294967296;
    i[o++] = r >>> 24 & 255, i[o++] = r >>> 16 & 255, i[o++] = r >>> 8 & 255, i[o++] = r & 255;
    var a = u / 4294967296 * 1e4 & 268435455;
    i[o++] = a >>> 8 & 255, i[o++] = a & 255, i[o++] = a >>> 24 & 15 | 16, i[o++] = a >>> 16 & 255, i[o++] = l >>> 8 | 128, i[o++] = l & 255;
    for (var f = 0; f < 6; ++f) i[o + f] = s[f];
    return n || Ec(i)
}
var Dc = Cc,
    Mc = bs,
    Bc = As;

function Lc(e, n, t) {
    var o = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var i = e.random || (e.rng || Mc)();
    if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, n)
        for (var s = 0; s < 16; ++s) n[o + s] = i[s];
    return n || Bc(i)
}
var Rc = Lc,
    Vc = Dc,
    xs = Rc,
    co = xs;
co.v1 = Vc;
co.v4 = xs;
var zc = co;
/*!
 * Core functionality for Snowplow JavaScript trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var jc = "3.16.0";

function Nc(e) {
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
    return Fc(t)
}

function Hc(e) {
    if (!e) return e;
    var n = Uc(e);
    return n.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}
var ot = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function Uc(e) {
    var n, t, o, i, s, l, c, u, d = 0,
        p = 0,
        r = [];
    if (!e) return e;
    e = unescape(encodeURIComponent(e));
    do n = e.charCodeAt(d++), t = e.charCodeAt(d++), o = e.charCodeAt(d++), u = n << 16 | t << 8 | o, i = u >> 18 & 63, s = u >> 12 & 63, l = u >> 6 & 63, c = u & 63, r[p++] = ot.charAt(i) + ot.charAt(s) + ot.charAt(l) + ot.charAt(c); while (d < e.length);
    var a = r.join(""),
        f = e.length % 3;
    return (f ? a.slice(0, f - 3) : a) + "===".slice(f || 3)
}

function Fc(e) {
    var n = function(h) {
            return decodeURIComponent(h.split("").map(function(v) {
                return "%" + ("00" + v.charCodeAt(0).toString(16)).slice(-2)
            }).join(""))
        },
        t, o, i, s, l, c, u, d, p = 0,
        r = 0,
        a = "",
        f = [];
    if (!e) return e;
    e += "";
    do s = ot.indexOf(e.charAt(p++)), l = ot.indexOf(e.charAt(p++)), c = ot.indexOf(e.charAt(p++)), u = ot.indexOf(e.charAt(p++)), d = s << 18 | l << 12 | c << 6 | u, t = d >> 16 & 255, o = d >> 8 & 255, i = d & 255, c === 64 ? f[r++] = String.fromCharCode(t) : u === 64 ? f[r++] = String.fromCharCode(t, o) : f[r++] = String.fromCharCode(t, o, i); while (p < e.length);
    return a = f.join(""), n(a.replace(/\0+$/, ""))
}

function uo() {
    var e = {},
        n = [],
        t = [],
        o = [],
        i, s = function(d, p) {
            p != null && p !== "" && (e[d] = p)
        },
        l = function(d) {
            for (var p in d) Object.prototype.hasOwnProperty.call(d, p) && s(p, d[p])
        },
        c = function(d, p, r) {
            if (r && Ss(r)) {
                var a = {
                    keyIfEncoded: d,
                    keyIfNotEncoded: p,
                    json: r
                };
                t.push(a), n.push(a)
            }
        },
        u = function(d) {
            o.push(d)
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
        withJsonProcessor: function(d) {
            i = d
        },
        build: function() {
            return i == null || i(this, t, o), e
        }
    }
}

function Gc(e) {
    return function(n, t, o) {
        for (var i = function(a, f, h) {
                var v = JSON.stringify(a);
                e ? n.add(f, Hc(v)) : n.add(h, v)
            }, s = function() {
                var a = n.getPayload();
                if (e ? a.cx : a.co) return JSON.parse(e ? Nc(a.cx) : a.co)
            }, l = function(a, f) {
                var h = a || s();
                return h ? h.data = h.data.concat(f.data) : h = f, h
            }, c = void 0, u = 0, d = t; u < d.length; u++) {
            var p = d[u];
            p.keyIfEncoded === "cx" ? c = l(c, p.json) : i(p.json, p.keyIfEncoded, p.keyIfNotEncoded)
        }
        if (t.length = 0, o.length) {
            var r = {
                schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                data: et([], o, !0)
            };
            c = l(c, r), o.length = 0
        }
        c && i(c, "cx", "co")
    }
}

function Ss(e) {
    if (!Ts(e)) return !1;
    for (var n in e)
        if (Object.prototype.hasOwnProperty.call(e, n)) return !0;
    return !1
}

function Ts(e) {
    return typeof e < "u" && e !== null && (e.constructor === {}.constructor || e.constructor === [].constructor)
}
var jn = "Snowplow: ",
    Ne;
(function(e) {
    e[e.none = 0] = "none", e[e.error = 1] = "error", e[e.warn = 2] = "warn", e[e.debug = 3] = "debug", e[e.info = 4] = "info"
})(Ne || (Ne = {}));
var Ve = Zc();

function Zc(e) {
    e === void 0 && (e = Ne.warn);

    function n(l) {
        Ne[l] ? e = l : e = Ne.warn
    }

    function t(l, c) {
        for (var u = [], d = 2; d < arguments.length; d++) u[d - 2] = arguments[d];
        if (e >= Ne.error && typeof console < "u") {
            var p = jn + l + "\n";
            c ? console.error.apply(console, et([p + "\n", c], u, !1)) : console.error.apply(console, et([p], u, !1))
        }
    }

    function o(l, c) {
        for (var u = [], d = 2; d < arguments.length; d++) u[d - 2] = arguments[d];
        if (e >= Ne.warn && typeof console < "u") {
            var p = jn + l;
            c ? console.warn.apply(console, et([p + "\n", c], u, !1)) : console.warn.apply(console, et([p], u, !1))
        }
    }

    function i(l) {
        for (var c = [], u = 1; u < arguments.length; u++) c[u - 1] = arguments[u];
        e >= Ne.debug && typeof console < "u" && console.debug.apply(console, et([jn + l], c, !1))
    }

    function s(l) {
        for (var c = [], u = 1; u < arguments.length; u++) c[u - 1] = arguments[u];
        e >= Ne.info && typeof console < "u" && console.info.apply(console, et([jn + l], c, !1))
    }
    return {
        setLogLevel: n,
        warn: o,
        error: t,
        debug: i,
        info: s
    }
}

function Yc() {
    var e = [],
        n = [],
        t = function(o) {
            var i = tu(o),
                s = nu(o),
                l = [],
                c = Jr(e, o, s, i);
            l.push.apply(l, c);
            var u = su(n, o, s, i);
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
                di(u) ? i.push(u) : Ht(u) && s.push(u)
            }
            e = e.concat(s), n = n.concat(i)
        },
        clearGlobalContexts: function() {
            n = [], e = []
        },
        removeGlobalContexts: function(o) {
            for (var i = function(u) {
                    di(u) ? n = n.filter(function(d) {
                        return JSON.stringify(d) !== JSON.stringify(u)
                    }) : Ht(u) && (e = e.filter(function(d) {
                        return JSON.stringify(d) !== JSON.stringify(u)
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

function Wc(e) {
    return {
        addPluginContexts: function(n) {
            var t = n ? et([], n, !0) : [];
            return e.forEach(function(o) {
                try {
                    o.contexts && t.push.apply(t, o.contexts())
                } catch (i) {
                    Ve.error("Error adding plugin contexts", i)
                }
            }), t
        }
    }
}

function qc(e) {
    var n = new RegExp("^iglu:([a-zA-Z0-9-_.]+)/([a-zA-Z0-9-_]+)/jsonschema/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$"),
        t = n.exec(e);
    if (t !== null) return t.slice(1, 6)
}

function Qc(e) {
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

function ks(e) {
    var n = e.split(".");
    return n && n.length > 1 ? Qc(n) : !1
}

function $s(e) {
    var n = new RegExp("^iglu:((?:(?:[a-zA-Z0-9-_]+|\\*).)+(?:[a-zA-Z0-9-_]+|\\*))/([a-zA-Z0-9-_.]+|\\*)/jsonschema/([1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)$"),
        t = n.exec(e);
    if (t !== null && ks(t[1])) return t.slice(1, 6)
}

function Kr(e) {
    var n = $s(e);
    if (n) {
        var t = n[0];
        return n.length === 5 && ks(t)
    }
    return !1
}

function Kc(e) {
    return Array.isArray(e) && e.every(function(n) {
        return typeof n == "string"
    })
}

function fi(e) {
    return Kc(e) ? e.every(function(n) {
        return Kr(n)
    }) : typeof e == "string" ? Kr(e) : !1
}

function fn(e) {
    var n = e;
    return Ss(n) && "schema" in n && "data" in n ? typeof n.schema == "string" && typeof n.data == "object" : !1
}

function Jc(e) {
    var n = e,
        t = 0;
    if (e != null && typeof e == "object" && !Array.isArray(e)) {
        if (Object.prototype.hasOwnProperty.call(n, "accept"))
            if (fi(n.accept)) t += 1;
            else return !1;
        if (Object.prototype.hasOwnProperty.call(n, "reject"))
            if (fi(n.reject)) t += 1;
            else return !1;
        return t > 0 && t <= 2
    }
    return !1
}

function rr(e) {
    return typeof e == "function" && e.length <= 1
}

function Ht(e) {
    return rr(e) || fn(e)
}

function Is(e) {
    return Array.isArray(e) && e.length === 2 ? Array.isArray(e[1]) ? rr(e[0]) && e[1].every(Ht) : rr(e[0]) && Ht(e[1]) : !1
}

function Os(e) {
    return Array.isArray(e) && e.length === 2 && Jc(e[0]) ? Array.isArray(e[1]) ? e[1].every(Ht) : Ht(e[1]) : !1
}

function di(e) {
    return Is(e) || Os(e)
}

function Xc(e, n) {
    var t = 0,
        o = 0,
        i = e.accept;
    Array.isArray(i) ? e.accept.some(function(l) {
        return Nn(l, n)
    }) && o++ : typeof i == "string" && Nn(i, n) && o++;
    var s = e.reject;
    return Array.isArray(s) ? e.reject.some(function(l) {
        return Nn(l, n)
    }) && t++ : typeof s == "string" && Nn(s, n) && t++, o > 0 && t === 0 ? !0 : (o === 0 && t > 0, !1)
}

function Nn(e, n) {
    if (!Kr(e)) return !1;
    var t = $s(e),
        o = qc(n);
    if (t && o) {
        if (!eu(t[0], o[0])) return !1;
        for (var i = 1; i < 5; i++)
            if (!Ps(t[i], o[i])) return !1;
        return !0
    }
    return !1
}

function eu(e, n) {
    var t = n.split("."),
        o = e.split(".");
    if (t && o) {
        if (t.length !== o.length) return !1;
        for (var i = 0; i < o.length; i++)
            if (!Ps(t[i], o[i])) return !1;
        return !0
    }
    return !1
}

function Ps(e, n) {
    return e && n && e === "*" || e === n
}

function tu(e) {
    for (var n = e.getJson(), t = 0, o = n; t < o.length; t++) {
        var i = o[t];
        if (i.keyIfEncoded === "ue_px" && typeof i.json.data == "object") {
            var s = i.json.data.schema;
            if (typeof s == "string") return s
        }
    }
    return ""
}

function nu(e) {
    var n = e.getPayload().e;
    return typeof n == "string" ? n : ""
}

function ru(e, n, t, o) {
    var i = void 0;
    try {
        var s = {
            event: n.getPayload(),
            eventType: t,
            eventSchema: o
        };
        return i = e(s), Array.isArray(i) && i.every(fn) || fn(i) ? i : void 0
    } catch (l) {
        i = void 0
    }
    return i
}

function Es(e) {
    return Array.isArray(e) ? e : Array.of(e)
}

function Jr(e, n, t, o) {
    var i, s = Es(e),
        l = function(u) {
            var d = ou(u, n, t, o);
            if (d && d.length !== 0) return d
        },
        c = s.map(l);
    return (i = []).concat.apply(i, c.filter(function(u) {
        return u != null && u.filter(Boolean)
    }))
}

function ou(e, n, t, o) {
    if (fn(e)) return [e];
    if (rr(e)) {
        var i = ru(e, n, t, o);
        if (fn(i)) return [i];
        if (Array.isArray(i)) return i
    }
}

function iu(e, n, t, o) {
    if (Is(e)) {
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
        if (s === !0) return Jr(e[1], n, t, o)
    } else if (Os(e) && Xc(e[0], o)) return Jr(e[1], n, t, o);
    return []
}

function su(e, n, t, o) {
    var i, s = Es(e),
        l = function(u) {
            var d = iu(u, n, t, o);
            if (d && d.length !== 0) return d
        },
        c = s.map(l);
    return (i = []).concat.apply(i, c.filter(function(u) {
        return u != null && u.filter(Boolean)
    }))
}

function au(e) {
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

function lu(e) {
    e === void 0 && (e = {});

    function n(u, d, p) {
        var r = Wc(d),
            a = Yc(),
            f = u,
            h = {};

        function v(b) {
            if (b && b.length) return {
                schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                data: b
            }
        }

        function g(b, $) {
            var N = a.getApplicableContexts(b),
                U = [];
            return $ && $.length && U.push.apply(U, $), N && N.length && U.push.apply(U, N), U
        }

        function m(b, $, N) {
            b.withJsonProcessor(Gc(f)), b.add("eid", zc.v4()), b.addDict(h);
            var U = au(N);
            b.add(U.type, U.value.toString());
            var L = g(b, r.addPluginContexts($)),
                B = v(L);
            B !== void 0 && b.addJson("cx", "co", B), d.forEach(function(R) {
                try {
                    R.beforeTrack && R.beforeTrack(b)
                } catch (K) {
                    Ve.error("Plugin beforeTrack", K)
                }
            }), typeof p == "function" && p(b);
            var z = b.build();
            return d.forEach(function(R) {
                try {
                    R.afterTrack && R.afterTrack(z)
                } catch (K) {
                    Ve.error("Plugin afterTrack", K)
                }
            }), z
        }

        function y(b, $) {
            h[b] = $
        }
        var A = {
            track: m,
            addPayloadPair: y,
            getBase64Encoding: function() {
                return f
            },
            setBase64Encoding: function(b) {
                f = b
            },
            addPayloadDict: function(b) {
                for (var $ in b) Object.prototype.hasOwnProperty.call(b, $) && (h[$] = b[$])
            },
            resetPayloadPairs: function(b) {
                h = Ts(b) ? b : {}
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
            setScreenResolution: function(b, $) {
                y("res", b + "x" + $)
            },
            setViewport: function(b, $) {
                y("vp", b + "x" + $)
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
        return A
    }
    var t = e.base64,
        o = e.corePlugins,
        i = e.callback,
        s = o != null ? o : [],
        l = n(t != null ? t : !0, s, i),
        c = Pe(Pe({}, l), {
            addPlugin: function(u) {
                var d, p, r = u.plugin;
                s.push(r), (d = r.logger) === null || d === void 0 || d.call(r, Ve), (p = r.activateCorePlugin) === null || p === void 0 || p.call(r, c)
            }
        });
    return s == null || s.forEach(function(u) {
        var d, p;
        (d = u.logger) === null || d === void 0 || d.call(u, Ve), (p = u.activateCorePlugin) === null || p === void 0 || p.call(u, c)
    }), c
}

function cu(e) {
    var n = e.event,
        t = n.schema,
        o = n.data,
        i = uo(),
        s = {
            schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
            data: {
                schema: t,
                data: o
            }
        };
    return i.add("e", "ue"), i.addJson("ue_px", "ue_pr", s), i
}

function uu(e) {
    var n = e.pageUrl,
        t = e.pageTitle,
        o = e.referrer,
        i = uo();
    return i.add("e", "pv"), i.add("url", n), i.add("page", t), i.add("refr", o), i
}

function fu(e) {
    var n = e.pageUrl,
        t = e.pageTitle,
        o = e.referrer,
        i = e.minXOffset,
        s = e.maxXOffset,
        l = e.minYOffset,
        c = e.maxYOffset,
        u = uo();
    return u.add("e", "pp"), u.add("url", n), u.add("page", t), u.add("refr", o), i && !isNaN(Number(i)) && u.add("pp_mix", i.toString()), s && !isNaN(Number(s)) && u.add("pp_max", s.toString()), l && !isNaN(Number(l)) && u.add("pp_miy", l.toString()), c && !isNaN(Number(c)) && u.add("pp_may", c.toString()), u
}
var du = jc,
    Cs = {
        exports: {}
    },
    Ds = {
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
    Ds.exports = n
})();
var pu = Ds.exports,
    Xr = {
        utf8: {
            stringToBytes: function(e) {
                return Xr.bin.stringToBytes(unescape(encodeURIComponent(e)))
            },
            bytesToString: function(e) {
                return decodeURIComponent(escape(Xr.bin.bytesToString(e)))
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
    pi = Xr;
(function() {
    var e = pu,
        n = pi.utf8,
        t = pi.bin,
        o = function(s) {
            s.constructor == String ? s = n.stringToBytes(s) : typeof Buffer < "u" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(s) ? s = Array.prototype.slice.call(s, 0) : Array.isArray(s) || (s = s.toString());
            var l = e.bytesToWords(s),
                c = s.length * 8,
                u = [],
                d = 1732584193,
                p = -271733879,
                r = -1732584194,
                a = 271733878,
                f = -1009589776;
            l[c >> 5] |= 128 << 24 - c % 32, l[(c + 64 >>> 9 << 4) + 15] = c;
            for (var h = 0; h < l.length; h += 16) {
                for (var v = d, g = p, m = r, y = a, A = f, b = 0; b < 80; b++) {
                    if (b < 16) u[b] = l[h + b];
                    else {
                        var $ = u[b - 3] ^ u[b - 8] ^ u[b - 14] ^ u[b - 16];
                        u[b] = $ << 1 | $ >>> 31
                    }
                    var N = (d << 5 | d >>> 27) + f + (u[b] >>> 0) + (b < 20 ? (p & r | ~p & a) + 1518500249 : b < 40 ? (p ^ r ^ a) + 1859775393 : b < 60 ? (p & r | p & a | r & a) - 1894007588 : (p ^ r ^ a) - 899497514);
                    f = a, a = r, r = p << 30 | p >>> 2, p = d, d = N
                }
                d += v, p += g, r += m, a += y, f += A
            }
            return [d, p, r, a, f]
        },
        i = function(s, l) {
            var c = e.wordsToBytes(o(s));
            return l && l.asBytes ? c : l && l.asString ? t.bytesToString(c) : e.bytesToHex(c)
        };
    i._blocksize = 16, i._digestsize = 20, Cs.exports = i
})();
var vu = Cs.exports;
const hu = _n(vu);
var eo = {
        exports: {}
    },
    vi = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (vi) {
    var hi = new Uint8Array(16);
    eo.exports = function() {
        return vi(hi), hi
    }
} else {
    var mi = new Array(16);
    eo.exports = function() {
        for (var n = 0, t; n < 16; n++) n & 3 || (t = Math.random() * 4294967296), mi[n] = t >>> ((n & 3) << 3) & 255;
        return mi
    }
}
var Ms = eo.exports,
    Bs = [];
for (var Hn = 0; Hn < 256; ++Hn) Bs[Hn] = (Hn + 256).toString(16).substr(1);

function mu(e, n) {
    var t = n || 0,
        o = Bs;
    return [o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]]].join("")
}
var Ls = mu,
    gu = Ms,
    _u = Ls,
    gi, Ir, Or = 0,
    Pr = 0;

function yu(e, n, t) {
    var o = n && t || 0,
        i = n || [];
    e = e || {};
    var s = e.node || gi,
        l = e.clockseq !== void 0 ? e.clockseq : Ir;
    if (s == null || l == null) {
        var c = gu();
        s == null && (s = gi = [c[0] | 1, c[1], c[2], c[3], c[4], c[5]]), l == null && (l = Ir = (c[6] << 8 | c[7]) & 16383)
    }
    var u = e.msecs !== void 0 ? e.msecs : new Date().getTime(),
        d = e.nsecs !== void 0 ? e.nsecs : Pr + 1,
        p = u - Or + (d - Pr) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383), (p < 0 || u > Or) && e.nsecs === void 0 && (d = 0), d >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    Or = u, Pr = d, Ir = l, u += 122192928e5;
    var r = ((u & 268435455) * 1e4 + d) % 4294967296;
    i[o++] = r >>> 24 & 255, i[o++] = r >>> 16 & 255, i[o++] = r >>> 8 & 255, i[o++] = r & 255;
    var a = u / 4294967296 * 1e4 & 268435455;
    i[o++] = a >>> 8 & 255, i[o++] = a & 255, i[o++] = a >>> 24 & 15 | 16, i[o++] = a >>> 16 & 255, i[o++] = l >>> 8 | 128, i[o++] = l & 255;
    for (var f = 0; f < 6; ++f) i[o + f] = s[f];
    return n || _u(i)
}
var bu = yu,
    wu = Ms,
    Au = Ls;

function xu(e, n, t) {
    var o = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var i = e.random || (e.rng || wu)();
    if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, n)
        for (var s = 0; s < 16; ++s) n[o + s] = i[s];
    return n || Au(i)
}
var Su = xu,
    Tu = bu,
    Rs = Su,
    fo = Rs;
fo.v1 = Tu;
fo.v4 = Rs;
var tt = fo;
/*!
 * Core functionality for Snowplow Browser trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function ku(e) {
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

function qn(e, n, t) {
    t === void 0 && (t = 63072e3);
    try {
        var o = window.localStorage,
            i = Date.now() + t * 1e3;
        return o.setItem("".concat(e, ".expires"), i.toString()), o.setItem(e, n), !0
    } catch (s) {
        return !1
    }
}

function _i(e) {
    try {
        var n = window.localStorage;
        return n.removeItem(e), n.removeItem(e + ".expires"), !0
    } catch (t) {
        return !1
    }
}

function yi(e) {
    try {
        return window.sessionStorage.getItem(e)
    } catch (n) {
        return
    }
}

function $u(e, n) {
    try {
        return window.sessionStorage.setItem(e, n), !0
    } catch (t) {
        return !1
    }
}

function Vs(e) {
    return !!(e && typeof e.valueOf() == "string")
}

function bi(e) {
    return Number.isInteger && Number.isInteger(e) || typeof e == "number" && isFinite(e) && Math.floor(e) === e
}

function wi(e) {
    if (!Vs(e)) {
        e = e.text || "";
        var n = document.getElementsByTagName("title");
        n && n[0] != null && (e = n[0].text)
    }
    return e
}

function to(e) {
    var n = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"),
        t = n.exec(e);
    return t ? t[1] : e
}

function Ai(e) {
    var n = e.length;
    return e.charAt(--n) === "." && (e = e.slice(0, n)), e.slice(0, 2) === "*." && (e = e.slice(1)), e
}

function Er(e) {
    var n = window,
        t = dn("referrer", n.location.href) || dn("referer", n.location.href);
    if (t) return t;
    if (e) return e;
    try {
        if (n.top) return n.top.document.referrer;
        if (n.parent) return n.parent.document.referrer
    } catch (o) {}
    return document.referrer
}

function nt(e, n, t, o) {
    if (e.addEventListener) return e.addEventListener(n, t, o), !0;
    if (e.attachEvent) return e.attachEvent("on" + n, t);
    e["on" + n] = t
}

function dn(e, n) {
    var t = new RegExp("^[^#]*[?&]" + e + "=([^&#]*)").exec(n);
    return t ? decodeURIComponent(t[1].replace(/\+/g, " ")) : null
}

function Iu(e, n, t) {
    var o = n + "=" + t,
        i = e.split("#"),
        s = i[0].split("?"),
        l = s.shift(),
        c = s.join("?");
    if (!c) c = o;
    else {
        for (var u = !0, d = c.split("&"), p = 0; p < d.length; p++)
            if (d[p].substr(0, n.length + 1) === n + "=") {
                u = !1, d[p] = o, c = d.join("&");
                break
            } u && (c = o + "&" + c)
    }
    return i[0] = l + "?" + c, i.join("#")
}

function Ou(e, n) {
    for (var t = window.location.hostname, o = "_sp_root_domain_test_", i = o + new Date().getTime(), s = "_test_value_" + new Date().getTime(), l = t.split("."), c = l.length - 2; c >= 0; c--) {
        var u = l.slice(c).join(".");
        if (_t(i, s, 0, "/", u, e, n), _t(i) === s) {
            or(i, u, e, n);
            for (var d = Pu(o), p = 0; p < d.length; p++) or(d[p], u, e, n);
            return u
        }
    }
    return t
}

function or(e, n, t, o) {
    _t(e, "", -1, "/", n, t, o)
}

function Pu(e) {
    for (var n = document.cookie.split("; "), t = [], o = 0; o < n.length; o++) n[o].substring(0, e.length) === e && t.push(n[o]);
    return t
}

function _t(e, n, t, o, i, s, l) {
    return arguments.length > 1 ? document.cookie = e + "=" + encodeURIComponent(n != null ? n : "") + (t ? "; Expires=" + new Date(+new Date + t * 1e3).toUTCString() : "") + (o ? "; Path=" + o : "") + (i ? "; Domain=" + i : "") + (s ? "; SameSite=" + s : "") + (l ? "; Secure" : "") : decodeURIComponent((("; " + document.cookie).split("; " + e + "=")[1] || "").split(";")[0])
}

function Eu() {
    try {
        return !!window.localStorage
    } catch (e) {
        return !0
    }
}

function Cu() {
    var e = "modernizr";
    if (!Eu()) return !1;
    try {
        var n = window.localStorage;
        return n.setItem(e, e), n.removeItem(e), !0
    } catch (t) {
        return !1
    }
}
var Du = "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0",
    Mu = "iglu:com.snowplowanalytics.snowplow/browser_context/jsonschema/1-0-0",
    Bu = "iglu:com.snowplowanalytics.snowplow/client_session/jsonschema/1-0-2",
    Lu = "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4";

function Ru(e, n, t, o, i, s, l, c, u, d, p, r, a, f, h, v, g) {
    var m = !1,
        y, A = [],
        b = !1;
    o = typeof o == "string" ? o.toLowerCase() : o;
    var $ = o === !0 || o === "beacon" || o === "true",
        N = !!($ && window.navigator && window.navigator.sendBeacon && !pe(window.navigator.userAgent)),
        U = N && $,
        L = o === "get",
        B = !!(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
        z = !L && B && (o === "post" || $),
        R = z ? i : "/i",
        K = "snowplowOutQueue_".concat(e, "_").concat(z ? "post2" : "get");
    if ($ && (a = {}), s = t && Cu() && z && s || 1, t) try {
        var de = window.localStorage.getItem(K);
        A = de ? JSON.parse(de) : []
    } catch (P) {}
    Array.isArray(A) || (A = []), n.outQueues.push(A), B && s > 1 && n.bufferFlushers.push(function(P) {
        m || M(P)
    });

    function D(P) {
        var G = "?",
            H = {
                co: !0,
                cx: !0
            },
            V = !0;
        for (var Z in P) P.hasOwnProperty(Z) && !H.hasOwnProperty(Z) && (V ? V = !1 : G += "&", G += encodeURIComponent(Z) + "=" + encodeURIComponent(P[Z]));
        for (var q in H) P.hasOwnProperty(q) && H.hasOwnProperty(q) && (G += "&" + q + "=" + encodeURIComponent(P[q]));
        return G
    }

    function I(P) {
        var G = Object.keys(P).map(function(H) {
            return [H, P[H]]
        }).reduce(function(H, V) {
            var Z = V[0],
                q = V[1];
            return H[Z] = q.toString(), H
        }, {});
        return {
            evt: G,
            bytes: w(JSON.stringify(G))
        }
    }

    function w(P) {
        for (var G = 0, H = 0; H < P.length; H++) {
            var V = P.charCodeAt(H);
            V <= 127 ? G += 1 : V <= 2047 ? G += 2 : V >= 55296 && V <= 57343 ? (G += 4, H++) : V < 65535 ? G += 3 : G += 4
        }
        return G
    }
    var T = function(P) {
        return typeof P[0] == "object" && "evt" in P[0]
    };

    function k(P, G) {
        var H = W(G, !0, !1);
        H.send(Q(J([P.evt])))
    }

    function O(P, G) {
        y = G + R;
        var H = function(Ie, qe) {
            return Ve.warn("Event (" + Ie + "B) too big, max is " + qe)
        };
        if (z) {
            var V = I(P);
            if (V.bytes >= l) {
                H(V.bytes, l), k(V, y);
                return
            } else A.push(V)
        } else {
            var Z = D(P);
            if (c > 0) {
                var q = re(Z),
                    ve = w(q);
                if (ve >= c) {
                    if (H(ve, c), B) {
                        var V = I(P),
                            oe = G + i;
                        k(V, oe)
                    }
                    return
                }
            }
            A.push(Z)
        }
        var xe = !1;
        t && (xe = qn(K, JSON.stringify(A.slice(0, d)))), !m && (!xe || A.length >= s) && M()
    }

    function M(P) {
        for (P === void 0 && (P = !1); A.length && typeof A[0] != "string" && typeof A[0] != "object";) A.shift();
        if (!A.length) {
            m = !1;
            return
        }
        if (!Vs(y)) throw "No collector configured";
        if (m = !0, g && !b) {
            var G = W(g, !1, P);
            b = !0, G.timeout = p, G.onreadystatechange = function() {
                G.readyState === 4 && M()
            }, G.send();
            return
        }
        if (B) {
            var H = function(Se) {
                    for (var je = 0, An = 0; je < Se.length && (An += Se[je].bytes, !(An >= l));) je += 1;
                    return je
                },
                V = void 0,
                Z, q;
            T(A) ? (V = y, Z = W(V, !0, P), q = H(A)) : (V = re(A[0]), Z = W(V, !1, P), q = 1);
            var ve = setTimeout(function() {
                    Z.abort(), m = !1
                }, p),
                oe = function(Se) {
                    for (var je = 0; je < Se; je++) A.shift();
                    t && qn(K, JSON.stringify(A.slice(0, d)))
                },
                xe = function(Se) {
                    oe(Se), M()
                };
            if (Z.onreadystatechange = function() {
                    Z.readyState === 4 && Z.status >= 200 && (clearTimeout(ve), Z.status < 300 ? xe(q) : (F(Z.status) || (Ve.error("Status ".concat(Z.status, ", will not retry.")), oe(q)), m = !1))
                }, !T(A)) Z.send();
            else {
                var Ie = A.slice(0, q);
                if (Ie.length > 0) {
                    var qe = !1,
                        Ce = Ie.map(function(Se) {
                            return Se.evt
                        });
                    if (U) {
                        var ft = new Blob([Q(J(Ce))], {
                            type: "application/json"
                        });
                        try {
                            qe = navigator.sendBeacon(V, ft)
                        } catch (Se) {
                            qe = !1
                        }
                    }
                    qe === !0 ? xe(q) : Z.send(Q(J(Ce)))
                }
            }
        } else if (!r && !T(A)) {
            var Qe = new Image(1, 1),
                Ke = !0;
            Qe.onload = function() {
                Ke && (Ke = !1, A.shift(), t && qn(K, JSON.stringify(A.slice(0, d))), M())
            }, Qe.onerror = function() {
                Ke && (Ke = !1, m = !1)
            }, Qe.src = re(A[0]), setTimeout(function() {
                Ke && m && (Ke = !1, M())
            }, p)
        } else m = !1
    }

    function F(P) {
        return P >= 200 && P < 300 ? !1 : h.includes(P) ? !0 : !v.includes(P)
    }

    function W(P, G, H) {
        var V = new XMLHttpRequest;
        G ? (V.open("POST", P, !H), V.setRequestHeader("Content-Type", "application/json; charset=UTF-8")) : V.open("GET", P, !H), V.withCredentials = f, r && V.setRequestHeader("SP-Anonymous", "*");
        for (var Z in a) Object.prototype.hasOwnProperty.call(a, Z) && V.setRequestHeader(Z, a[Z]);
        return V
    }

    function Q(P) {
        return JSON.stringify({
            schema: Lu,
            data: P
        })
    }

    function J(P) {
        for (var G = new Date().getTime().toString(), H = 0; H < P.length; H++) P[H].stm = G;
        return P
    }

    function re(P) {
        return u ? y + P.replace("?", "?stm=" + new Date().getTime() + "&") : y + P
    }
    return {
        enqueueRequest: O,
        executeQueue: function() {
            m || M()
        },
        setUseLocalStorage: function(P) {
            t = P
        },
        setAnonymousTracking: function(P) {
            r = P
        },
        setCollectorUrl: function(P) {
            y = P + R
        },
        setBufferSize: function(P) {
            s = P
        }
    };

    function pe(P) {
        return G(13, P) || H(10, 15, P) && V(P);

        function G(q, ve) {
            var oe = ve.match("(iP.+; CPU .*OS (d+)[_d]*.*) AppleWebKit/");
            return oe && oe.length ? parseInt(oe[0]) <= q : !1
        }

        function H(q, ve, oe) {
            var xe = oe.match("(Macintosh;.*Mac OS X (d+)_(d+)[_d]*.*) AppleWebKit/");
            return xe && xe.length ? parseInt(xe[0]) <= q || parseInt(xe[0]) === q && parseInt(xe[1]) <= ve : !1
        }

        function V(q) {
            return q.match("Version/.* Safari/") && !Z(q)
        }

        function Z(q) {
            return q.match("Chrom(e|ium)")
        }
    }
}

function Vu(e, n) {
    var t = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)"),
        o = t.exec(e);
    return o && (o == null ? void 0 : o.length) > 1 ? dn(n, o[1]) : null
}

function xi(e, n, t) {
    var o;
    return e === "translate.googleusercontent.com" ? (t === "" && (t = n), n = (o = Vu(n, "u")) !== null && o !== void 0 ? o : "", e = to(n)) : (e === "cc.bingj.com" || e === "webcache.googleusercontent.com") && (n = document.links[0].href, e = to(n)), [e, n, t]
}
var zs = 0,
    yt = 1,
    zu = 2,
    pn = 3,
    po = 4,
    js = 5,
    it = 6,
    Lt = 7,
    bt = 8,
    wt = 9,
    Fe = 10;

function ju() {
    var e = ["1", "", 0, 0, 0, void 0, "", "", "", void 0, 0];
    return e
}

function Nu(e, n, t, o) {
    var i = new Date,
        s = Math.round(i.getTime() / 1e3),
        l;
    e ? (l = e.split("."), l.unshift("0")) : l = ["1", n, s, o, s, "", t], (!l[it] || l[it] === "undefined") && (l[it] = tt.v4()), (!l[Lt] || l[Lt] === "undefined") && (l[Lt] = ""), (!l[bt] || l[bt] === "undefined") && (l[bt] = ""), (!l[wt] || l[wt] === "undefined") && (l[wt] = ""), (!l[Fe] || l[Fe] === "undefined") && (l[Fe] = 0);
    var c = function(p, r) {
            var a = parseInt(p);
            return isNaN(a) ? r : a
        },
        u = function(p) {
            return p ? c(p, void 0) : void 0
        },
        d = [l[zs], l[yt], c(l[zu], s), c(l[pn], o), c(l[po], s), u(l[js]), l[it], l[Lt], l[bt], u(l[wt]), c(l[Fe], 0)];
    return d
}

function Hu(e, n) {
    var t;
    return e[yt] ? t = e[yt] : n ? (t = "", e[yt] = t) : (t = tt.v4(), e[yt] = t), t
}

function en(e, n) {
    n === void 0 && (n = {
        memorizedVisitCount: 1
    });
    var t = n.memorizedVisitCount;
    no(e) ? (e[Lt] = e[it], e[js] = e[po], e[pn]++) : e[pn] = t;
    var o = tt.v4();
    return e[it] = o, e[Fe] = 0, e[bt] = "", e[wt] = void 0, o
}

function Cr(e) {
    e[po] = Math.round(new Date().getTime() / 1e3)
}

function Uu(e, n) {
    if (e[Fe] === 0) {
        var t = n.build();
        e[bt] = t.eid;
        var o = t.dtm || t.ttm;
        e[wt] = o ? parseInt(o) : void 0
    }
}

function Fu(e) {
    e[Fe] += 1
}

function Gu(e) {
    return e.shift(), e.join(".")
}

function Si(e, n, t) {
    var o = e[wt],
        i = {
            userId: t ? "00000000-0000-0000-0000-000000000000" : e[yt],
            sessionId: e[it],
            eventIndex: e[Fe],
            sessionIndex: e[pn],
            previousSessionId: t ? null : e[Lt] || null,
            storageMechanism: n == "localStorage" ? "LOCAL_STORAGE" : "COOKIE_1",
            firstEventId: e[bt] || null,
            firstEventTimestamp: o ? new Date(o).toISOString() : null
        };
    return i
}

function Dr(e) {
    return e[it]
}

function Zu(e) {
    return e[yt]
}

function Mr(e) {
    return e[pn]
}

function no(e) {
    return e[zs] === "0"
}

function Yu(e) {
    return e[Fe]
}
var vn = "x";

function Br() {
    return {
        viewport: Lr(Wu()),
        documentSize: Lr(qu()),
        resolution: Lr(Qu()),
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

function Wu() {
    var e, n;
    if ("innerWidth" in window) e = window.innerWidth, n = window.innerHeight;
    else {
        var t = document.documentElement || document.body;
        e = t.clientWidth, n = t.clientHeight
    }
    return e >= 0 && n >= 0 ? e + vn + n : null
}

function qu() {
    var e = document.documentElement,
        n = document.body,
        t = n ? Math.max(n.offsetHeight, n.scrollHeight) : 0,
        o = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth),
        i = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, t);
    return isNaN(o) || isNaN(i) ? "" : o + vn + i
}

function Qu() {
    return screen.width + vn + screen.height
}

function Lr(e) {
    return e && e.split(vn).map(function(n) {
        return Math.floor(Number(n))
    }).join(vn)
}

function Ku(e, n, t, o, i, s) {
    s === void 0 && (s = {});
    var l = [],
        c = function(p, r, a, f, h, v) {
            var g, m, y, A, b, $, N, U, L, B, z, R, K, de, D, I, w, T, k, O, M, F, W, Q, J, re, pe, P;
            v.eventMethod = (g = v.eventMethod) !== null && g !== void 0 ? g : "post";
            var G = function(_) {
                    var S;
                    return (S = _.stateStorageStrategy) !== null && S !== void 0 ? S : "cookieAndLocalStorage"
                },
                H = function(_) {
                    var S, E;
                    return typeof _.anonymousTracking == "boolean" ? !1 : (E = ((S = _.anonymousTracking) === null || S === void 0 ? void 0 : S.withSessionTracking) === !0) !== null && E !== void 0 ? E : !1
                },
                V = function(_) {
                    var S, E;
                    return typeof _.anonymousTracking == "boolean" ? !1 : (E = ((S = _.anonymousTracking) === null || S === void 0 ? void 0 : S.withServerAnonymisation) === !0) !== null && E !== void 0 ? E : !1
                },
                Z = function(_) {
                    return !!_.anonymousTracking
                },
                q = (y = (m = v == null ? void 0 : v.contexts) === null || m === void 0 ? void 0 : m.browser) !== null && y !== void 0 ? y : !1,
                ve = (b = (A = v == null ? void 0 : v.contexts) === null || A === void 0 ? void 0 : A.webPage) !== null && b !== void 0 ? b : !0;
            l.push(Aa()), ve && l.push(ba()), q && l.push(wa()), l.push.apply(l, ($ = v.plugins) !== null && $ !== void 0 ? $ : []);
            var oe = lu({
                    base64: v.encodeBase64,
                    corePlugins: l,
                    callback: ga
                }),
                xe = document.characterSet || document.charset,
                Ie = xi(window.location.hostname, window.location.href, Er()),
                qe = Ai(Ie[0]),
                Ce = Ie[1],
                ft = Ie[2],
                Qe, Ke = (N = v.platform) !== null && N !== void 0 ? N : "web",
                Se = Vo(f),
                je = (U = v.postPath) !== null && U !== void 0 ? U : "/com.snowplowanalytics.snowplow/tp2",
                An = (L = v.appId) !== null && L !== void 0 ? L : "",
                xn, $t = document.title,
                Wt, ca = (B = v.resetActivityTrackingOnPageView) !== null && B !== void 0 ? B : !0,
                yo, bo, ua = (z = v.cookieName) !== null && z !== void 0 ? z : "_sp_",
                qt = (R = v.cookieDomain) !== null && R !== void 0 ? R : void 0,
                cr = "/",
                Sn = (K = v.cookieSameSite) !== null && K !== void 0 ? K : "None",
                Tn = (de = v.cookieSecure) !== null && de !== void 0 ? de : !0,
                wo = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack,
                Ao = typeof v.respectDoNotTrack < "u" ? v.respectDoNotTrack && (wo === "yes" || wo === "1") : !1,
                ur, xo = (D = v.cookieLifetime) !== null && D !== void 0 ? D : 63072e3,
                So = (I = v.sessionCookieTimeout) !== null && I !== void 0 ? I : 1800,
                It = H(v),
                fr = V(v),
                Le = Z(v),
                se = G(v),
                kn, dr = new Date().getTime(),
                $n, In, On, Pn, To, En, De, Me = 1,
                dt, Je = Ru(p, h, se == "localStorage" || se == "cookieAndLocalStorage", v.eventMethod, je, (w = v.bufferSize) !== null && w !== void 0 ? w : 1, (T = v.maxPostBytes) !== null && T !== void 0 ? T : 4e4, (k = v.maxGetBytes) !== null && k !== void 0 ? k : 0, (O = v.useStm) !== null && O !== void 0 ? O : !0, (M = v.maxLocalStorageQueueSize) !== null && M !== void 0 ? M : 1e3, (F = v.connectionTimeout) !== null && F !== void 0 ? F : 5e3, fr, (W = v.customHeaders) !== null && W !== void 0 ? W : {}, (Q = v.withCredentials) !== null && Q !== void 0 ? Q : !0, (J = v.retryStatusCodes) !== null && J !== void 0 ? J : [], ((re = v.dontRetryStatusCodes) !== null && re !== void 0 ? re : []).concat([400, 401, 403, 410, 422]), v.idService),
                ko = !1,
                $o = !1,
                be = {
                    enabled: !1,
                    installed: !1,
                    configurations: {}
                },
                fa = (P = (pe = v.contexts) === null || pe === void 0 ? void 0 : pe.session) !== null && P !== void 0 ? P : !1,
                Cn, Dn = v.onSessionUpdateCallback,
                pr = !1;
            v.hasOwnProperty("discoverRootDomain") && v.discoverRootDomain && (qt = Ou(Sn, Tn));
            var Mn = Br(),
                da = Mn.browserLanguage,
                pa = Mn.resolution,
                va = Mn.colorDepth,
                ha = Mn.cookiesEnabled;
            oe.setTrackerVersion(a), oe.setTrackerNamespace(r), oe.setAppId(An), oe.setPlatform(Ke), oe.addPayloadPair("cookie", ha ? "1" : "0"), oe.addPayloadPair("cs", xe), oe.addPayloadPair("lang", da), oe.addPayloadPair("res", pa), oe.addPayloadPair("cd", va), Eo(), Ro(), v.crossDomainLinker && Oo(v.crossDomainLinker);

            function pt() {
                Ie = xi(window.location.hostname, window.location.href, Er()), Ie[1] !== Ce && (ft = Er(Ce)), qe = Ai(Ie[0]), Ce = Ie[1]
            }

            function Io(_) {
                var S = new Date().getTime(),
                    E = _.currentTarget;
                E != null && E.href && (E.href = Iu(E.href, "_sp", En + "." + S))
            }

            function Oo(_) {
                for (var S = 0; S < document.links.length; S++) {
                    var E = document.links[S];
                    !E.spDecorationEnabled && _(E) && (nt(E, "click", Io, !0), nt(E, "mousedown", Io, !0), E.spDecorationEnabled = !0)
                }
            }

            function vt(_) {
                var S;
                return yo && (S = new RegExp("#.*"), _ = _.replace(S, "")), bo && (S = new RegExp("[{}]", "g"), _ = _.replace(S, "")), _
            }

            function Po(_) {
                var S = new RegExp("^([a-z]+):"),
                    E = S.exec(_);
                return E ? E[1] : null
            }

            function ma(_, S) {
                var E = Po(S),
                    he;
                return E ? S : S.slice(0, 1) === "/" ? Po(_) + "://" + to(_) + S : (_ = vt(_), (he = _.indexOf("?")) >= 0 && (_ = _.slice(0, he)), (he = _.lastIndexOf("/")) !== _.length - 1 && (_ = _.slice(0, he + 1)), _ + S)
            }

            function ga(_) {
                Ao || Cn || Je.enqueueRequest(_.build(), Se)
            }

            function Ot(_) {
                return ua + _ + "." + To
            }

            function vr(_) {
                var S = Ot(_);
                if (se == "localStorage") return ku(S);
                if (se == "cookie" || se == "cookieAndLocalStorage") return _t(S)
            }

            function Eo() {
                pt(), To = hu((qt || qe) + (cr || "/")).slice(0, 4)
            }

            function Qt() {
                var _ = new Date;
                kn = _.getTime()
            }

            function _a() {
                ya(), Qt()
            }

            function Co() {
                var _ = document.documentElement;
                return _ ? [_.scrollLeft || window.pageXOffset, _.scrollTop || window.pageYOffset] : [0, 0]
            }

            function Do() {
                var _ = Co(),
                    S = _[0];
                $n = S, In = S;
                var E = _[1];
                On = E, Pn = E
            }

            function ya() {
                var _ = Co(),
                    S = _[0];
                S < $n ? $n = S : S > In && (In = S);
                var E = _[1];
                E < On ? On = E : E > Pn && (Pn = E)
            }

            function Bn(_) {
                return Math.round(_)
            }

            function hr() {
                var _ = Ot("ses"),
                    S = "*";
                return Mo(_, S, So)
            }

            function mr(_) {
                var S = Ot("id"),
                    E = Gu(_);
                return Mo(S, E, xo)
            }

            function Mo(_, S, E) {
                return Le && !It ? !1 : se == "localStorage" ? qn(_, S, E) : se == "cookie" || se == "cookieAndLocalStorage" ? (_t(_, S, E, cr, qt, Sn, Tn), document.cookie.indexOf("".concat(_, "=")) !== -1) : !1
            }

            function Bo(_) {
                var S = Ot("id"),
                    E = Ot("ses");
                _i(S), _i(E), or(S, qt, Sn, Tn), or(E, qt, Sn, Tn), _ != null && _.preserveSession || (De = tt.v4(), Me = 1), _ != null && _.preserveUser || (En = Le ? "" : tt.v4(), dt = null)
            }

            function Lo(_) {
                _ && _.stateStorageStrategy && (v.stateStorageStrategy = _.stateStorageStrategy, se = G(v)), Le = Z(v), It = H(v), fr = V(v), Je.setUseLocalStorage(se == "localStorage" || se == "cookieAndLocalStorage"), Je.setAnonymousTracking(fr)
            }

            function Ro() {
                if (!(Le && !It)) {
                    var _ = se != "none" && !!vr("ses"),
                        S = Kt();
                    En = Hu(S, Le), _ ? De = Dr(S) : De = en(S), Me = Mr(S), se != "none" && (hr(), Cr(S), mr(S))
                }
            }

            function Kt() {
                if (se == "none") return ju();
                var _ = vr("id") || void 0;
                return Nu(_, En, De, Me)
            }

            function Vo(_) {
                return _.indexOf("http") === 0 ? _ : (document.location.protocol === "https:" ? "https" : "http") + "://" + _
            }

            function zo() {
                (!ko || h.pageViewId == null) && (h.pageViewId = tt.v4())
            }

            function gr() {
                return h.pageViewId == null && (h.pageViewId = tt.v4()), h.pageViewId
            }

            function jo() {
                if (se === "none" || Le || !ve) return null;
                var _ = "_sp_tab_id",
                    S = yi(_);
                return S || ($u(_, tt.v4()), S = yi(_)), S || null
            }

            function ba() {
                return {
                    contexts: function() {
                        return [{
                            schema: Du,
                            data: {
                                id: gr()
                            }
                        }]
                    }
                }
            }

            function wa() {
                return {
                    contexts: function() {
                        return [{
                            schema: Mu,
                            data: Pe(Pe({}, Br()), {
                                tabId: jo()
                            })
                        }]
                    }
                }
            }

            function Aa() {
                var _ = function(E) {
                        return Le ? null : E
                    },
                    S = function(E) {
                        return It ? E : _(E)
                    };
                return {
                    beforeTrack: function(E) {
                        var he = vr("ses"),
                            ue = Kt(),
                            Xe = Yu(ue) === 0;
                        if (ur ? Cn = !!_t(ur) : Cn = !1, Ao || Cn) {
                            Bo();
                            return
                        }
                        no(ue) ? (!he && se != "none" ? De = en(ue) : De = Dr(ue), Me = Mr(ue)) : new Date().getTime() - dr > So * 1e3 && (Me++, De = en(ue, {
                            memorizedVisitCount: Me
                        })), Cr(ue), Uu(ue, E), Fu(ue);
                        var Te = Br(),
                            Pt = Te.viewport,
                            Jt = Te.documentSize;
                        E.add("vp", Pt), E.add("ds", Jt), E.add("vid", S(Me)), E.add("sid", S(De)), E.add("duid", _(Zu(ue))), E.add("uid", _(dt)), pt(), E.add("refr", vt(Qe || ft)), E.add("url", vt(xn || Ce));
                        var Xt = Si(ue, se, Le);
                        if (fa && (!Le || It) && xa(E, Xt), se != "none") {
                            mr(ue);
                            var yr = hr();
                            (!he || Xe) && yr && Dn && !pr && (Dn(Xt), pr = !1)
                        }
                        dr = new Date().getTime()
                    }
                }
            }

            function xa(_, S) {
                var E = {
                    schema: Bu,
                    data: S
                };
                _.addContextEntity(E)
            }

            function Sa() {
                var _ = Kt();
                if (no(_) ? (se != "none" ? De = en(_) : De = Dr(_), Me = Mr(_)) : (Me++, De = en(_, {
                        memorizedVisitCount: Me
                    })), Cr(_), se != "none") {
                    var S = Si(_, se, Le);
                    mr(_);
                    var E = hr();
                    E && Dn && (pr = !0, Dn(S))
                }
                dr = new Date().getTime()
            }

            function _r(_, S) {
                return (_ || []).concat(S ? S() : [])
            }

            function Ta(_) {
                var S = _.title,
                    E = _.context,
                    he = _.timestamp,
                    ue = _.contextCallback;
                pt(), $o && zo(), $o = !0, $t = document.title, Wt = S;
                var Xe = wi(Wt || $t);
                oe.track(uu({
                    pageUrl: vt(xn || Ce),
                    pageTitle: Xe,
                    referrer: vt(Qe || ft)
                }), _r(E, ue), he);
                var Te = new Date,
                    Pt = !1;
                if (be.enabled && !be.installed) {
                    be.installed = !0, Pt = !0;
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
                                    Fo = function() {};
                                window.addEventListener("testPassiveEventSupport", Fo, Ln), window.removeEventListener("testPassiveEventSupport", Fo, Ln), Jt.hasSupport = Et
                            }
                        }
                    };
                    Jt.update();
                    var Xt = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
                    Object.prototype.hasOwnProperty.call(Jt, "hasSupport") ? nt(document, Xt, Qt, {
                        passive: !0
                    }) : nt(document, Xt, Qt), Do();
                    var yr = ["click", "mouseup", "mousedown", "mousemove", "keypress", "keydown", "keyup", "touchend", "touchstart"],
                        Oa = ["resize", "focus", "blur"],
                        br = function(Pa, Et) {
                            return Et === void 0 && (Et = Qt),
                                function(Ln) {
                                    return nt(document, Ln, Et)
                                }
                        };
                    yr.forEach(br(document)), Oa.forEach(br(window)), br(window, _a)("scroll")
                }
                if (be.enabled && (ca || Pt)) {
                    kn = Te.getTime();
                    var Uo = void 0;
                    for (Uo in be.configurations) {
                        var wr = be.configurations[Uo];
                        wr && (window.clearInterval(wr.activityInterval), ka(wr, E, ue))
                    }
                }
            }

            function ka(_, S, E) {
                var he = function(Te, Pt) {
                        pt(), Te({
                            context: Pt,
                            pageViewId: gr(),
                            minXOffset: $n,
                            minYOffset: On,
                            maxXOffset: In,
                            maxYOffset: Pn
                        }), Do()
                    },
                    ue = function() {
                        var Te = new Date;
                        kn + _.configMinimumVisitLength > Te.getTime() && he(_.callback, _r(S, E)), _.activityInterval = window.setInterval(Xe, _.configHeartBeatTimer)
                    },
                    Xe = function() {
                        var Te = new Date;
                        kn + _.configHeartBeatTimer > Te.getTime() && he(_.callback, _r(S, E))
                    };
                _.configMinimumVisitLength === 0 ? _.activityInterval = window.setInterval(Xe, _.configHeartBeatTimer) : _.activityInterval = window.setTimeout(ue, _.configMinimumVisitLength)
            }

            function No(_) {
                var S = _.minimumVisitLength,
                    E = _.heartbeatDelay,
                    he = _.callback;
                if (bi(S) && bi(E)) return {
                    configMinimumVisitLength: S * 1e3,
                    configHeartBeatTimer: E * 1e3,
                    callback: he
                };
                Ve.error("Activity tracking minimumVisitLength & heartbeatDelay must be integers")
            }

            function $a(_) {
                var S = _.context,
                    E = _.minXOffset,
                    he = _.minYOffset,
                    ue = _.maxXOffset,
                    Xe = _.maxYOffset,
                    Te = document.title;
                Te !== $t && ($t = Te, Wt = void 0), oe.track(fu({
                    pageUrl: vt(xn || Ce),
                    pageTitle: wi(Wt || $t),
                    referrer: vt(Qe || ft),
                    minXOffset: Bn(E),
                    maxXOffset: Bn(ue),
                    minYOffset: Bn(he),
                    maxYOffset: Bn(Xe)
                }), S)
            }

            function Ho(_) {
                var S = be.configurations[_];
                (S == null ? void 0 : S.configMinimumVisitLength) === 0 ? window.clearTimeout(S == null ? void 0 : S.activityInterval) : window.clearInterval(S == null ? void 0 : S.activityInterval), be.configurations[_] = void 0
            }
            var Ia = {
                getDomainSessionIndex: function() {
                    return Me
                },
                getPageViewId: gr,
                getTabId: jo,
                newSession: Sa,
                getCookieName: function(_) {
                    return Ot(_)
                },
                getUserId: function() {
                    return dt
                },
                getDomainUserId: function() {
                    return Kt()[1]
                },
                getDomainUserInfo: function() {
                    return Kt()
                },
                setReferrerUrl: function(_) {
                    Qe = _
                },
                setCustomUrl: function(_) {
                    pt(), xn = ma(Ce, _)
                },
                setDocumentTitle: function(_) {
                    $t = document.title, Wt = _
                },
                discardHashTag: function(_) {
                    yo = _
                },
                discardBrace: function(_) {
                    bo = _
                },
                setCookiePath: function(_) {
                    cr = _, Eo()
                },
                setVisitorCookieTimeout: function(_) {
                    xo = _
                },
                crossDomainLinker: function(_) {
                    Oo(_)
                },
                enableActivityTracking: function(_) {
                    be.configurations.pagePing || (be.enabled = !0, be.configurations.pagePing = No(Pe(Pe({}, _), {
                        callback: $a
                    })))
                },
                enableActivityTrackingCallback: function(_) {
                    be.configurations.callback || (be.enabled = !0, be.configurations.callback = No(_))
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
                    ur = _
                },
                setUserId: function(_) {
                    dt = _
                },
                setUserIdFromLocation: function(_) {
                    pt(), dt = dn(_, Ce)
                },
                setUserIdFromReferrer: function(_) {
                    pt(), dt = dn(_, ft)
                },
                setUserIdFromCookie: function(_) {
                    dt = _t(_)
                },
                setCollectorUrl: function(_) {
                    Se = Vo(_), Je.setCollectorUrl(Se)
                },
                setBufferSize: function(_) {
                    Je.setBufferSize(_)
                },
                flushBuffer: function(_) {
                    _ === void 0 && (_ = {}), Je.executeQueue(), _.newBufferSize && Je.setBufferSize(_.newBufferSize)
                },
                trackPageView: function(_) {
                    _ === void 0 && (_ = {}), Ta(_)
                },
                preservePageViewId: function() {
                    ko = !0
                },
                disableAnonymousTracking: function(_) {
                    v.anonymousTracking = !1, Lo(_), Ro(), Je.executeQueue()
                },
                enableAnonymousTracking: function(_) {
                    var S;
                    v.anonymousTracking = (S = _ && (_ == null ? void 0 : _.options)) !== null && S !== void 0 ? S : !0, Lo(_), It || zo()
                },
                clearUserData: Bo
            };
            return Pe(Pe({}, Ia), {
                id: p,
                namespace: r,
                core: oe,
                sharedState: h
            })
        },
        u = c(e, n, t, o, i, s),
        d = Pe(Pe({}, u), {
            addPlugin: function(p) {
                var r, a;
                d.core.addPlugin(p), (a = (r = p.plugin).activateBrowserPlugin) === null || a === void 0 || a.call(r, d)
            }
        });
    return l.forEach(function(p) {
        var r;
        (r = p.activateBrowserPlugin) === null || r === void 0 || r.call(p, d)
    }), d
}
var sn = {};

function vo(e, n) {
    try {
        Xu(e != null ? e : ef()).forEach(n)
    } catch (t) {
        Ve.error("Function failed", t)
    }
}

function Ju(e, n, t, o, i, s) {
    return sn.hasOwnProperty(e) ? null : (sn[e] = Ku(e, n, t, o, i, s), sn[e])
}

function Xu(e) {
    return tf(e, sn)
}

function ef() {
    return Object.keys(sn)
}

function tf(e, n) {
    for (var t = [], o = 0, i = e; o < i.length; o++) {
        var s = i[o];
        n.hasOwnProperty(s) ? t.push(n[s]) : Ve.warn(s + " not configured")
    }
    return t
}
var nf = function() {
    function e() {
        this.outQueues = [], this.bufferFlushers = [], this.hasLoaded = !1, this.registeredOnLoadHandlers = []
    }
    return e
}();

function rf() {
    var e = new nf,
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
        }), nt(t, "load", s, !1)
    }
    return n.visibilityState && nt(n, "visibilitychange", o, !1), nt(t, "beforeunload", i, !1), document.readyState === "loading" ? l() : s(), e
}
/*!
 * Browser tracker for Snowplow v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function of(e, n) {
    vo(n, function(t) {
        t.enableActivityTracking(e)
    })
}

function sf(e, n) {
    vo(n, function(t) {
        t.trackPageView(e)
    })
}

function af(e, n) {
    vo(n, function(t) {
        t.core.track(cu({
            event: e.event
        }), e.context, e.timestamp)
    })
}
var Ti = typeof window < "u" ? rf() : void 0;

function lf(e, n, t) {
    if (t === void 0 && (t = {}), Ti) return Ju(e, e, "js-".concat(du), n, Ti, t)
}
const cf = "brawlstars-cctv-prod",
    uf = "https://collector.snowplow.supercell.com",
    ff = () => {
        lf("sp1", uf, {
            appId: cf,
            plugins: []
        })
    },
    df = () => of({
        minimumVisitLength: 5,
        heartbeatDelay: 20
    }),
    pf = (e, n, t, o = {}) => {
        af({
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
        init: ff,
        setupActivityTracking: df,
        trackPageView: sf,
        trackClickEvent: pf
    },
    vf = [{
        postDate: "2023-11-12",
        bgSrc: {
            png: "scenes/scene/bg.png"
        },
        transitionVideoSrc: {
            mp4: "scenes/scene/transition-video.mp4"
        }
    }],
    hf = vf,
    mf = Zt(hf),
    ho = () => {
        const e = mf()[0];
        return ht(ye({}, e), {
            bgSrc: Tt(e.bgSrc.png),
            transitionVideoSrc: Tt(e.transitionVideoSrc.mp4)
        })
    },
    gf = [{
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
    _f = gf,
    yf = Zt(_f),
    Ns = () => yf().map(n => ht(ye({}, n), {
        src: Tt(n.src.jpg)
    })),
    bf = "/assets/instructions-modal-overlay-b0399863.png",
    mo = "/assets/terminal-logo-7a935f92.png",
    Hs = "/assets/logbook-page-bg-left-d97e3458.jpg",
    Us = "/assets/logbook-page-bg-right-98ad4729.jpg",
    Fs = "/assets/logbook-first-page-4594a73f.jpg",
    ro = "/assets/player-controls-bg-272e65c2.jpg",
    Gs = e => e.reduce((n, t, o, i) => (o % 2 === 0 && n.push(e.slice(o, o + 2)), n), []),
    Zs = async e => new Promise(n => {
        const t = new Image;
        t.onload = () => n(t), t.src = e
    });
var Ut = (e => (e[e.initializing = 0] = "initializing", e[e["loading-assets"] = 1] = "loading-assets", e[e["video-transition"] = 2] = "video-transition", e[e.done = 3] = "done", e))(Ut || {});
const wf = ho(),
    Af = Ns(),
    xf = () => {
        const e = [Hs, Us],
            n = [...Af.map(i => i.src), null].reverse();
        n.length === 1 && e.push(Fs);
        const t = Gs(n),
            o = t[t.length - 1];
        return o && e.push(...o.filter(i => !!i)), e
    },
    Sf = [wf.bgSrc, bf, mo, ro, ...xf()],
    [Ys, go] = Y(0),
    [Tf, kf] = Y(!1),
    [$f, If] = Y(!1),
    Of = async () => {
        go(1);
        const e = Sf.map(n => Zs(n));
        await Promise.allSettled(e), kf(!0)
    }, Ws = () => {
        window.location.href = "brawlstars-inbox://cctvloaded"
    };
_e(() => {
    Tf() && $f() && (Ws(), go(2))
});
_e(() => {
    Ys() === 3 && Ws()
});
const Pf = () => {
        If(!0)
    },
    Ef = () => {
        go(3)
    },
    rt = {
        init: Of,
        currentStatus: Ys,
        onVideoTransitionLoaded: Pf,
        onVideoTransitionEnd: Ef
    },
    qs = e => e[Math.floor(Math.random() * e.length)];

function Qs(e) {
    var n, t, o = "";
    if (typeof e == "string" || typeof e == "number") o += e;
    else if (typeof e == "object")
        if (Array.isArray(e))
            for (n = 0; n < e.length; n++) e[n] && (t = Qs(e[n])) && (o && (o += " "), o += t);
        else
            for (n in e) e[n] && (o && (o += " "), o += n);
    return o
}

function Cf() {
    for (var e, n, t = 0, o = ""; t < arguments.length;)(e = arguments[t++]) && (n = Qs(e)) && (o && (o += " "), o += n);
    return o
}
const ki = e => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e,
    ce = Cf,
    bn = (e, n) => t => {
        var o;
        if ((n == null ? void 0 : n.variants) == null) return ce(e, t == null ? void 0 : t.class, t == null ? void 0 : t.className);
        const {
            variants: i,
            defaultVariants: s
        } = n, l = Object.keys(i).map(d => {
            const p = t == null ? void 0 : t[d],
                r = s == null ? void 0 : s[d];
            if (p === null) return null;
            const a = ki(p) || ki(r);
            return i[d][a]
        }), c = t && Object.entries(t).reduce((d, p) => {
            let [r, a] = p;
            return a === void 0 || (d[r] = a), d
        }, {}), u = n == null || (o = n.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((d, p) => {
            let h = p,
                {
                    class: r,
                    className: a
                } = h,
                f = Wo(h, ["class", "className"]);
            return Object.entries(f).every(v => {
                let [g, m] = v;
                return Array.isArray(m) ? m.includes(ye(ye({}, s), c)[g]) : ye(ye({}, s), c)[g] === m
            }) ? [...d, r, a] : d
        }, []);
        return ce(e, l, u, t == null ? void 0 : t.class, t == null ? void 0 : t.className)
    },
    Df = "/assets/player-8b9a1305.mp3",
    Mf = "/assets/player-4aabf494.ogg",
    Bf = j('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="m8 36 17-12L8 12v24Zm18-24v24l17-12-17-12Z">'),
    Lf = (e = {}) => (() => {
        const n = Bf();
        return Ye(n, e, !0, !0), n
    })(),
    Rf = j('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="M22 36V12L5 24l17 12Zm1-12 17 12V12L23 24Z">'),
    Vf = (e = {}) => (() => {
        const n = Rf();
        return Ye(n, e, !0, !0), n
    })(),
    zf = j('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 104 68"><path fill="currentColor" d="M60.66 16.06c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4Zm9.54-26.81c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36-4.06-.01-6.57-.12-7.52-.36Zm0 17.9c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36s-6.57-.12-7.52-.36Zm3.89-8.99c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .95-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.14-3.63-.4Zm13.43-17.91c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4Zm-67.95-34.7c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm7.67-7.34c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.61c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33Zm12.74 6.6c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.22 3.22-.33 7.01-.33Zm7.67 7.34c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.21 3.22-.33 7.01-.33ZM1.43 31.5c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.43-.14-4.07-.45Zm-.48 8.28c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.07 0-3.43-.15-4.07-.45Zm37.59-21.96c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.44-.14-4.07-.45ZM8.47 23.97c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79.01-6.12-.1-7.01-.33Zm30.07 31.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Z">'),
    jf = (e = {}) => (() => {
        const n = zf();
        return Ye(n, e, !0, !0), n
    })(),
    Nf = j('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="M12 38h8V10h-8v28Zm16-28v28h8V10h-8Z">'),
    Hf = (e = {}) => (() => {
        const n = Nf();
        return Ye(n, e, !0, !0), n
    })(),
    Uf = j('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="M16 10v28l22-14-22-14Z">'),
    Ff = (e = {}) => (() => {
        const n = Uf();
        return Ye(n, e, !0, !0), n
    })(),
    Gf = j('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="M23.495 27.969c2.28 0 4.13-1.913 4.13-4.273 0-2.36-1.85-4.273-4.13-4.273-2.281 0-4.13 1.913-4.13 4.273 0 2.36 1.849 4.273 4.13 4.273Z"></path><path fill="currentColor" d="M31.073 15.863a2.047 2.047 0 0 0-.137-.13 11.945 11.945 0 0 0-.504-.476 1.942 1.942 0 0 0-2.8.233c-.71.863-.609 2.162.225 2.897a7.06 7.06 0 0 1 2.374 5.306c0 2.261-1.068 4.39-2.856 5.695-.013.009-.023.02-.037.03a1.412 1.412 0 0 0-.066.05c-.909.636-1.15 1.913-.535 2.853a1.939 1.939 0 0 0 2.758.551c2.953-2.064 4.717-5.498 4.717-9.184-.003-2.952-1.118-5.734-3.139-7.825Z"></path><path fill="currentColor" d="M35.168 11.425a1.917 1.917 0 0 0-.156-.145 17.637 17.637 0 0 0-.829-.79 1.942 1.942 0 0 0-2.8.233c-.71.864-.61 2.163.225 2.897 2.805 2.47 4.413 6.069 4.413 9.873 0 4.199-1.981 8.154-5.297 10.585-.072.052-.143.11-.218.162-.908.636-1.147 1.913-.535 2.853a1.939 1.939 0 0 0 2.758.551C37.282 34.462 40 29.169 40 23.49c0-4.555-1.717-8.842-4.832-12.065ZM19.733 29.47a.87.87 0 0 1-.066-.049c-.013-.01-.024-.022-.037-.03-1.788-1.304-2.856-3.434-2.856-5.695 0-2.045.864-3.98 2.374-5.306a2.104 2.104 0 0 0 .225-2.898 1.94 1.94 0 0 0-2.8-.233 9.434 9.434 0 0 0-.503.477 2.158 2.158 0 0 0-.14.132c-2.024 2.086-3.14 4.868-3.14 7.828 0 3.686 1.765 7.118 4.718 9.184.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.905.617-.945.376-2.223-.533-2.858Z"></path><path fill="currentColor" d="M16.496 34.24c-.074-.053-.143-.11-.217-.162-3.316-2.429-5.298-6.383-5.298-10.585 0-3.804 1.608-7.403 4.413-9.872a2.103 2.103 0 0 0 .226-2.898 1.94 1.94 0 0 0-2.8-.232c-.29.252-.562.518-.83.789a2.98 2.98 0 0 0-.156.145C8.716 14.648 7 18.935 7 23.493c0 5.679 2.718 10.969 7.271 14.153.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.904.614-.943.376-2.22-.533-2.856Z">'),
    Zf = (e = {}) => (() => {
        const n = Gf();
        return Ye(n, e, !0, !0), n
    })(),
    Yf = j('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.96 67.25"><path fill="currentColor" d="M86.24 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.65-7.86c-.42-.23-.63-.84-.63-1.83s.21-1.6.63-1.83C83.01.12 84.11 0 85.9 0s2.89.12 3.31.35c.42.23.63.84.63 1.83s-.21 1.6-.63 1.83c-.42.23-1.52.35-3.31.35s-2.89-.12-3.31-.35Zm6.77 15.72c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.18 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.18 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.7 7.86c-.39-.23-.58-.84-.58-1.83s.19-1.6.58-1.83c.39-.23 1.4-.35 3.04-.35s2.65.12 3.04.35c.39.23.58.84.58 1.83s-.19 1.6-.58 1.83c-.39.23-1.4.35-3.04.35s-2.65-.12-3.04-.35ZM61.57 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm3.12 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.17 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.17 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-42-41.98c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm7.67-7.35c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.5c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm12.74 6.6c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm7.67 7.34c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33ZM1.43 31.39c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm-.48 8.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM38.54 17.7c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM8.47 23.86c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm30.07 31.26c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Z">'),
    Wf = (e = {}) => (() => {
        const n = Yf();
        return Ye(n, e, !0, !0), n
    })(),
    qf = {
        "fast-forward": Lf,
        "fast-rewind": Vf,
        mute: jf,
        pause: Hf,
        play: Ff,
        live: Zf,
        unmute: Wf
    },
    Qf = j("<span>"),
    gt = e => {
        const [n, t] = so(e, ["name"]);
        return (() => {
            const o = Qf();
            return Ye(o, t, !1, !0), C(o, x(os, {
                get component() {
                    return qf[n.name]
                }
            })), o
        })()
    },
    Ks = {
        tl: "tl",
        bl: "bl",
        c: "c",
        tr: "tr",
        br: "br"
    },
    Js = e => {
        var n;
        return (n = Object.values(Ks)[e]) != null ? n : "c"
    },
    Kf = [{
        liveVideos: [{
            videoId: "6340870064112",
            adId: "live.cd-xr-0FTPuXmwn-mdnJEu47Vb3qCwVqXrhVWFlEd6hCO36exV6FiWH8oWXo0FplxsEefWa8PLaDycyFt4J7GX4eDJjnkUCCvJCKyYwj9KrX-y-CbA3xENQHk_wM-1UzZhFy26U"
        }, {
            videoId: "6340869562112",
            adId: "live.YnvqzL0jQ2Tb9ajOnL4fClro5TSK4dMKXg7K3W6z9cLaPrnic8Q76uVzO0Cel3VinTXjtaVgiT5A6zmUuxQ8jHAbxdIuSyDurs5ZPDnzIwlVkXCejHqcWEZg7k8ggbRpCZ2B86A"
        }, {
            videoId: "6340869567112",
            adId: "live.axJK-qYI2XBy1t4aExd4lSROypp_m_MT6-RNzYgQGtjBsCMtoczc7dR1IGI4l-POqMNvhVQAw1avBguHtAVd2iTb_rdS579-LdEoGsnh-zkurIIFjTzzn-RAzu-ljb8D1QWqIZw"
        }, {
            videoId: "6340871625112",
            adId: "live.zhmISldHunEXQih342pJmlGNiJE7mhCaaW3Ijq96KygSo2nOG6Xq5SZjXkOyO_mdITgYoX8hjjoUnkSfP3hq-7W-hBbYfQV5Bi-65g5SY8XK8k-ZD1VentUKAhVAR92nro7PLWI"
        }, {
            videoId: "6340870359112",
            adId: "live.G08_6VeyfoqhUz1Q6CbILwG5fDv_vUOei-73Z6Tx9186dFeTSw6-W2mT6ERuyEI9UWMQVQO6RemYCIJE8oxbx7sn0RhV_63G4qsVgMaqsBjOwec_v0sPHdJJxyZ7gBaxNlbZ2jc"
        }],
        postDate: "2023-11-02"
    }],
    Jf = Kf,
    Xf = Zt(Jf),
    ed = () => Xf()[0],
    td = (e = !0) => {
        let n = cs;
        return {
            get abort() {
                return n
            },
            exec: t => (e && n(), Promise.race([new Promise((o, i) => n = () => i(new Error("aborted"))), new Promise(o => t(o))]))
        }
    },
    nd = e => {
        const {
            multiplier: n = 4
        } = e != null ? e : {};
        let t = cs,
            o = null;
        const c = {
            onTick: u => (t = u, c),
            start: () => (o === null && (o = setInterval(() => {
                t()
            }, 1e3 / n)), c),
            stop: () => (o !== null && (clearInterval(o), o = null), c)
        };
        return c
    },
    rd = e => {
        const n = ts(),
            t = nd(),
            o = td(),
            [i, s] = Y(null),
            [l, c] = Y(0),
            [u, d] = Y(e.initialFeed),
            [p, r] = Y(null),
            [a, f] = Y("initializing"),
            [h, v] = Y(e.initialPosition),
            g = () => !!p(),
            m = () => h() === "c",
            y = () => {
                var w;
                return !!((w = p()) != null && w.liveTracker.isLive())
            },
            A = () => a() !== "error" && a() !== "initializing",
            b = () => {
                var w;
                return y() && !!((w = p()) != null && w.liveTracker.atLiveEdge())
            },
            $ = () => {
                var w, T, k, O;
                return (O = (k = (w = p()) == null ? void 0 : w.liveTracker.liveCurrentTime()) != null ? k : (T = p()) == null ? void 0 : T.duration()) != null ? O : 0
            },
            N = async w => {
                try {
                    const T = u(),
                        O = await (await El(() => import("./player-38120002.js"), [])).initPlayer({
                            refNode: w,
                            videoId: T.videoId,
                            adConfigId: T.videoId && T.adId,
                            playlistId: T.playlistId,
                            options: {
                                loop: !1
                            }
                        });
                    if (!O) throw new Error;
                    O.on("error", () => f("error")), O.on("timeupdate", () => c(O.currentTime())), O.one("canplay", () => f("ready")), O.one("playing", () => f("playing")), O.on("ended", () => f("ended")), r(O)
                } catch (T) {
                    console.error(T), f("error")
                }
            }, U = async w => {
                (w.videoId ? u().videoId === w.videoId : u().playlistId === w.playlistId) || (f("initializing"), s(null), d(w), await o.exec(T => {
                    var k, O, M;
                    (k = p()) == null || k.pause(), (M = (O = p()) == null ? void 0 : O.catalog) == null || M.get({
                        id: w.videoId || w.playlistId,
                        adConfigId: w.adId,
                        type: w.videoId ? "video" : "playlist"
                    }, (F, W) => {
                        var Q, J, re;
                        if (F) f("error");
                        else {
                            const pe = Array.isArray(W) ? W : [W];
                            if (!pe.length) return T();
                            const P = pe.length > 1,
                                G = Object.values(Ks).indexOf(h()),
                                H = P ? pe[G % pe.length] : pe[0];
                            (J = (Q = p()) == null ? void 0 : Q.catalog) == null || J.load(H), (re = p()) == null || re.one("canplay", () => {
                                var V;
                                (V = p()) == null || V.play(), f("playing"), T()
                            })
                        }
                    })
                }))
            }, L = async () => U(e.initialFeed), B = () => {
                var w;
                (w = p()) == null || w.dispose(), r(null)
            }, z = async () => {
                await o.exec(w => {
                    var T;
                    (T = p()) == null || T.play(), w()
                }), f("playing")
            }, R = async () => {
                await o.exec(w => {
                    var T;
                    (T = p()) == null || T.pause(), w()
                }), f("ready")
            }, K = async () => {
                !y() || b() || (f("syncing"), await o.exec(w => {
                    var T, k, O;
                    (T = p()) == null || T.liveTracker.seekToLiveEdge(), (k = p()) == null || k.play(), (O = p()) == null || O.one("timeupdate", w)
                }), f("playing"))
            }, de = async w => {
                var T, k;
                f(w === 1 ? "seeking-fwd" : "seeking-bwd"), await o.exec(O => {
                    var M;
                    (M = p()) == null || M.pause(), t.start().onTick(() => {
                        const F = l() + 1 * w;
                        w === -1 && F <= 0 || w === 1 && F >= $() ? O() : c(F)
                    })
                }), t.stop(), w === 1 ? y() ? f("ready") : ((T = p()) == null || T.currentTime(0), f("ended")) : ((k = p()) == null || k.currentTime(0), f("ready"))
            }, D = async () => {
                var w, T;
                Math.abs(l() - ((T = (w = p()) == null ? void 0 : w.currentTime()) != null ? T : 0)) < 3 || (f("syncing"), await o.exec(k => {
                    var O, M, F;
                    (O = p()) == null || O.pause(), (M = p()) == null || M.currentTime(l()), (F = p()) == null || F.trigger("timeupdate"), k()
                }), f("ready"))
            };
        return {
            uid: n,
            feed: u,
            isCenter: m,
            isEnabled: A,
            isLive: y,
            isAtEdge: b,
            position: h,
            setPosition: v,
            status: a,
            time: l,
            setTime: c,
            duration: $,
            switchFeed: U,
            resetFeed: L,
            Player: {
                mount: N,
                unmount: B,
                isMounted: g,
                dispatch: async w => {
                    t.stop();
                    try {
                        if (i() === w && !["rev", "fwd"].includes(w)) throw new Error("same as previous action");
                        switch (s(w), w) {
                            case "sync":
                                await D();
                                break;
                            case "play":
                                await z();
                                break;
                            case "pause":
                                await R();
                                break;
                            case "fwd":
                                await de(1), await K();
                                break;
                            case "rev":
                                await de(-1);
                                break;
                            case "go-live":
                                await L(), await K();
                                break
                        }
                    } catch (T) {
                        throw new Error('action "'.concat(w, '": ').concat(T.message))
                    }
                }
            }
        }
    },
    kt = ed().liveVideos.map((e, n) => rd({
        initialFeed: e,
        initialPosition: Js(n)
    })),
    [od, id] = Y(!1),
    [sd, ad] = Y(null),
    ct = () => kt.filter(e => e.isEnabled()),
    ld = () => ct().find(e => e.isCenter()),
    cd = () => {
        const e = ct().filter(n => n.isLive() && n.status() === "playing");
        return e.length > 0 ? e.every(n => n.isAtEdge()) : !1
    },
    ud = ke(() => kt.length > 0 && kt.every(e => e.status() !== "initializing")),
    fd = ke(() => ct().length > 0 && ct().every(e => e.status() === "ended")),
    dd = e => {
        const n = kt.find(o => o.uid === e.uid),
            t = kt.find(o => o.position() === "c");
        sr(() => {
            t.setPosition(n.position()), n.setPosition("c")
        })
    },
    pd = () => {
        sr(() => {
            kt.forEach((e, n) => e.setPosition(Js(n)))
        })
    },
    vd = async e => {
        var t;
        const n = (t = ld()) == null ? void 0 : t.time();
        if (n) return e.setTime(n), e.Player.dispatch("sync")
    }, hd = async e => {
        try {
            e === "play" && await Promise.all(ct().map(vd)), await Promise.all(ct().map(n => n.Player.dispatch(e)))
        } catch (n) {
            console.warn(n)
        }
    }, md = async e => {
        try {
            ad(e), !!e.archivePlaylist ? await Promise.all(ct().map(t => t.switchFeed(e.archivePlaylist))) : await Promise.all(ct().map((t, o) => {
                const i = e.liveVideos[o % e.liveVideos.length];
                if (i) return t.switchFeed(i)
            }))
        } catch (n) {
            console.warn(n)
        }
    }, me = {
        screens: kt,
        Supervisor: {
            dispatch: hd,
            positionScreenAtCenter: dd,
            resetScreensPosition: pd,
            controlsVisible: od,
            setControlsVisible: id,
            switchFeed: md,
            allAtEdge: cd,
            allLoaded: ud,
            allEnded: fd,
            currentFeed: sd
        }
    }, gd = j('<div role="button" class="absolute top-0 left-0 wh-full">'), _d = j('<div class="absolute bottom-0 left-0 right-0 h-[228px] px-[158px] flex space-x-68 items-center"><button></button><button></button><button></button><button></button><button>'), tn = ["w-[330px] h-[100px] flex-center bg-player-control-btn text-green rounded-sm", "shadow-player-controls-btn active:shadow-player-controls-btn-pressed", "[&>span]:w-72 [&>span]:drop-shadow-terminal"], yd = () => {
        const e = st([Mf, Df], {
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
            const n = gd();
            return n.$$click = () => me.Supervisor.setControlsVisible(!1), n
        })(), (() => {
            const n = _d(),
                t = n.firstChild,
                o = t.nextSibling,
                i = o.nextSibling,
                s = i.nextSibling,
                l = s.nextSibling;
            return "url(".concat(ro, ")") != null ? n.style.setProperty("background-image", "url(".concat(ro, ")")) : n.style.removeProperty("background-image"), t.$$click = () => {
                ne.trackClickEvent("player-controls", "rewind", "cctv-room"), me.Supervisor.dispatch("rev"), e.play("rewind-click", {
                    interrupt: !0
                }), e.play("rewind-loop")
            }, C(t, x(gt, {
                name: "fast-rewind"
            })), o.$$click = () => {
                ne.trackClickEvent("player-controls", "play", "cctv-room"), me.Supervisor.dispatch("play"), e.play("play", {
                    interrupt: !0
                })
            }, C(o, x(gt, {
                name: "play"
            })), i.$$click = () => {
                ne.trackClickEvent("player-controls", "forward", "cctv-room"), me.Supervisor.dispatch("fwd"), e.play("forward-click", {
                    interrupt: !0
                }), e.play("forward-loop")
            }, C(i, x(gt, {
                name: "fast-forward"
            })), s.$$click = () => {
                ne.trackClickEvent("player-controls", "pause", "cctv-room"), me.Supervisor.dispatch("pause"), e.play("pause", {
                    interrupt: !0
                })
            }, C(s, x(gt, {
                name: "pause"
            })), l.$$click = () => {
                ne.trackClickEvent("player-controls", "live", "cctv-room"), me.Supervisor.dispatch("go-live"), e.play("live", {
                    interrupt: !0
                })
            }, C(l, x(gt, {
                name: "live"
            })), X(c => {
                const u = ce(tn),
                    d = ce(tn),
                    p = ce(tn),
                    r = ce(tn),
                    a = ce(tn);
                return u !== c._v$ && te(t, c._v$ = u), d !== c._v$2 && te(o, c._v$2 = d), p !== c._v$3 && te(i, c._v$3 = p), r !== c._v$4 && te(s, c._v$4 = r), a !== c._v$5 && te(l, c._v$5 = a), c
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
const bd = (e, n) => {
        const t = e * n / 100;
        return e - t
    },
    $i = e => e.touches.length === 2,
    Ii = e => Math.hypot(e[0].pageX - e[1].pageX, e[0].pageY - e[1].pageY),
    wd = e => {
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
        }, l = d => {
            !$i(d) || !n.isEnabled || (d.preventDefault(), t({
                isZooming: !0,
                start: {
                    distance: Ii(d.touches),
                    x: (d.touches[0].pageX + d.touches[1].pageX) / 2,
                    y: (d.touches[0].pageY + d.touches[1].pageY) / 2
                }
            }))
        }, c = d => {
            !$i(d) || !n.isEnabled || (d.preventDefault(), t(p => {
                const r = "scale" in d ? d.scale : Ii(d.touches) / n.start.distance,
                    a = (d.touches[0].pageX + d.touches[1].pageX) / 2 - p.start.x,
                    f = (d.touches[0].pageY + d.touches[1].pageY) / 2 - p.start.y;
                return {
                    scale: Math.min(Math.max(1, bd(r, 10)), 4),
                    delta: {
                        x: a,
                        y: f
                    }
                }
            }))
        }, u = () => {
            s()
        };
        return mn(() => {
            var d, p, r;
            (d = e.targetRef()) == null || d.addEventListener("touchstart", l), (p = e.targetRef()) == null || p.addEventListener("touchmove", c), (r = e.targetRef()) == null || r.addEventListener("touchend", u)
        }), Ae(() => {
            var d, p, r;
            (d = e.targetRef()) == null || d.removeEventListener("touchstart", l), (p = e.targetRef()) == null || p.removeEventListener("touchmove", c), (r = e.targetRef()) == null || r.removeEventListener("touchend", u)
        }), {
            data: n,
            controls: {
                enable: o,
                disable: i
            }
        }
    },
    wn = bn("", {
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
        const [n, t] = so(e, ["size", "as", "class", "children"]);
        return x(os, Ya({
            get component() {
                return n.as || "span"
            },
            get class() {
                return wn({
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
    Ad = "/assets/seek-video-dab3075d.mp4",
    xd = j('<video playsinline muted loop class="absolute top-0 left-0 wh-full object-cover">'),
    Sd = j('<div class="absolute top-0 left-0 bg-black z-10 wh-full">'),
    Oi = j("<span>"),
    Td = j('<div class="absolute top-72 left-72 flex items-center space-x-8 text-white">'),
    kd = {
        "seeking-fwd": "seeking-fwd",
        "seeking-bwd": "seeking-bwd",
        ready: "ready",
        playing: "playing",
        error: "error"
    },
    $d = {
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
    Id = e => {
        let n;
        const [t, o] = Y(void 0);
        _e(() => {
            const u = e.screen.status();
            if (u === "syncing") return;
            const p = e.screen.isAtEdge() && u === "playing" ? "live" : kd[u];
            o(p);
            let r;
            (p === "playing" || p === "live") && (r = setTimeout(() => o(void 0), 1500)), Ae(() => clearTimeout(r))
        });
        const [i, s] = Y();
        _e(() => {
            var f;
            if (!e.screen.isEnabled()) return;
            const u = e.screen.feed().playlistId ? (f = e.screen.feed().metadata) == null ? void 0 : f.date : void 0,
                d = u ? u.add(e.screen.duration(), "seconds") : _s(ds),
                p = e.screen.time(),
                r = e.screen.duration() - p,
                a = d.subtract(r, "seconds");
            s({
                date: a.format("DD.MM.[95]"),
                time: a.format("HH:mm:ss")
            })
        });
        const l = () => t() ? $d[t()] : void 0,
            c = () => t() === "seeking-bwd" || t() === "seeking-fwd";
        return _e(() => {
            n && (c() ? n.play() : n.pause())
        }), [(() => {
            const u = xd(),
                d = n;
            return typeof d == "function" ? Ee(d, u) : n = u, le(u, "src", Ad), X(() => (c() ? "visible" : "hidden") != null ? u.style.setProperty("visibility", c() ? "visible" : "hidden") : u.style.removeProperty("visibility")), u
        })(), x(rs, {
            get children() {
                return [x(Bt, {
                    get when() {
                        return t() === "error"
                    },
                    get children() {
                        return Sd()
                    }
                }), x(Bt, {
                    get when() {
                        return t() !== "error"
                    },
                    get children() {
                        return [x(ze, {
                            get when() {
                                return l()
                            },
                            children: u => (() => {
                                const d = Td();
                                return C(d, x(ie, {
                                    size: "screen-overlay-md",
                                    get children() {
                                        return u().text
                                    }
                                }), null), C(d, x(gt, {
                                    get name() {
                                        return u().icon
                                    },
                                    class: "w-[85px] pt-4"
                                }), null), d
                            })()
                        }), x(ze, {
                            get when() {
                                return ke(() => !!i())() && e.screen.isEnabled()
                            },
                            get children() {
                                return x(ie, {
                                    as: "div",
                                    size: "screen-overlay-sm",
                                    class: "absolute bottom-72 left-72 flex flex-col items-start text-white",
                                    get children() {
                                        return [(() => {
                                            const u = Oi();
                                            return C(u, () => i().time), u
                                        })(), (() => {
                                            const u = Oi();
                                            return C(u, () => i().date), u
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
    Od = j('<button class="absolute top-0 left-0 isolate"><div>'),
    Pd = {
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
    Ed = e => {
        const [n, t] = Y(void 0);
        let o;
        const i = () => Pd[e.screen.position()],
            {
                data: s,
                controls: l
            } = wd({
                targetRef: n
            });
        return _e(() => {
            rt.currentStatus() === Ut.done && Ze.dataUsageWarningDialog.accepted() && o && !e.screen.Player.isMounted() && e.screen.Player.mount(o)
        }), Ae(() => {
            e.screen.Player.unmount()
        }), _e(() => {
            e.screen.position() === "c" && !["initializing", "error"].includes(e.screen.status()) ? l.enable() : l.disable()
        }), (() => {
            const c = Od(),
                u = c.firstChild;
            c.$$click = () => {
                var p;
                (p = e.onClick) == null || p.call(e)
            }, Ee(t, c);
            const d = o;
            return typeof d == "function" ? Ee(d, u) : o = u, C(c, x(Id, {
                get screen() {
                    return e.screen
                }
            }), null), X(p => {
                const r = "".concat(i().coordinates.y, "px"),
                    a = "".concat(i().coordinates.x, "px"),
                    f = "".concat(i().size.width, "px"),
                    h = "".concat(i().size.height, "px"),
                    v = i().transformOrigin,
                    g = s.isZooming ? "10" : void 0,
                    m = "translate3d(".concat(s.delta.x, "px, ").concat(s.delta.y, "px, 0) rotateZ(").concat(i().rotation || 0, "deg) scale(").concat((i().scaleFactor || 1) * s.scale, ")"),
                    y = i().hidden ? "hidden" : void 0,
                    A = ce("Video", e.screen.status() === "initializing" && "invisible");
                return r !== p._v$ && ((p._v$ = r) != null ? c.style.setProperty("top", r) : c.style.removeProperty("top")), a !== p._v$2 && ((p._v$2 = a) != null ? c.style.setProperty("left", a) : c.style.removeProperty("left")), f !== p._v$3 && ((p._v$3 = f) != null ? c.style.setProperty("width", f) : c.style.removeProperty("width")), h !== p._v$4 && ((p._v$4 = h) != null ? c.style.setProperty("height", h) : c.style.removeProperty("height")), v !== p._v$5 && ((p._v$5 = v) != null ? c.style.setProperty("transform-origin", v) : c.style.removeProperty("transform-origin")), g !== p._v$6 && ((p._v$6 = g) != null ? c.style.setProperty("z-index", g) : c.style.removeProperty("z-index")), m !== p._v$7 && ((p._v$7 = m) != null ? c.style.setProperty("transform", m) : c.style.removeProperty("transform")), y !== p._v$8 && ((p._v$8 = y) != null ? c.style.setProperty("visibility", y) : c.style.removeProperty("visibility")), A !== p._v$9 && te(u, p._v$9 = A), p
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
const Cd = j('<img class="absolute top-0 left-0 wh-full pointer-events-none">'),
    Dd = () => (() => {
        const e = Cd();
        return X(() => le(e, "src", ho().bgSrc)), e
    })(),
    Md = j('<button class="absolute origin-top-left">'),
    Bd = [{
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
    Ld = e => x(ao, {
        each: Bd,
        children: n => (() => {
            const t = Md();
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
const Rd = "/assets/answering-machine-button-glow-58ea4526.svg",
    Vd = j('<img class="absolute origin-bottom-left">'),
    zd = {
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
    jd = () => {
        const e = zd["phone-button-light"];
        return x(ze, {
            get when() {
                return Ze.answeringMachineTrack.hasNew()
            },
            get children() {
                const n = Vd();
                return le(n, "src", Rd), X(t => {
                    const o = e.size.width,
                        i = e.size.width,
                        s = "translate(".concat(e.position.x, "px, ").concat(e.position.y, "px)");
                    return o !== t._v$ && le(n, "width", t._v$ = o), i !== t._v$2 && le(n, "height", t._v$2 = i), s !== t._v$3 && ((t._v$3 = s) != null ? n.style.setProperty("transform", s) : n.style.removeProperty("transform")), t
                }, {
                    _v$: void 0,
                    _v$2: void 0,
                    _v$3: void 0
                }), n
            }
        })
    },
    Nd = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAAAwECBAUGBwgBAQACAwEBAAAAAAAAAAAAAAABBQIDBgQH/9oADAMBAAIQAxAAAAD5/rSpJbW3JaMQCWKaYomz89Wtt6GDLTo2diYemAYZgAAAAAAC4tyr+gz8cfabLprHhdfou0k9NH4zyftvm9f23G02OD4+osEbAAAAABUv2UPabqyHu9vv7T5zisp6efx7JZU4fPddXHd4ryXv/mlf3Hm8W11lf2tojaAAAAkjvRvPWfJvYbDidhu9Rt7HhcPIjmnXh5kF6bLg1GJsMDTZ+Rc90XO0/wBSiGv3gAAAK0Gw6fjNvtrfZdtzO8tvme1gsw9nh32HZjzhs9Tna+M8nzX0Lznz33HarLwqr6OGO8AAAACuTi1nHqu+8y9X9vIrci/1c3AmTENmTZE8Ty255Gu7qsVaaLkEgAAAAAL7CJEYkRiSlgrQSAAAAAAAAAAAAAAAAB//xAA0EAACAQMDAgMFBwQDAAAAAAABAgMABBEFEiETMQYiURQwUmFxFRYgMkBBkSNQgZJTgsH/2gAIAQEAAT8AoAsQACSaSCZ/yoTTxvG211IPofxCGVlDKjEH0oQylgvTbJ7ZGKMMqjLIwHzGKNtOO8b/AMUbeb/jb+KEMpAIRiD6DNNDKgJaNgM4yR7tWKkEHBFLLIvZiOc0zMxyxJP4kllXAVyMdsUiux7mlhlk/MzGhbXJHdqaGaPsTTdZF2hiBTySkbWdiPTP6OKMtVjp7ysoC8kgCrPwzd7lDwMvzYcCodNsolCR2gnAbzuyhv8AXFXvh8yndaozof8ALL8mxWp6Lc2uOrEyZzjcMZxU8RUmiMH9AFJqK2ZiOKs9OZscV4ftvZ5OUG112nira2aMv1GY4baBuPepopRJGQ4P0AFS25dSpbzFTgjy4/wK1G2f2AozZMj5wecBavdOYE8VPasp7UyEe+Vc1b2xYjirDTixHlrTtFYhSV49ags4YVACgmiM71YYyc0qnHmjLH1oAqWZu+MAV7IkseJFP1rUNEOGKrkYrUNNKk+Wrm2Kk8U6Y94Bk1BFuIrR9JluGUKhPIrTtHt4FUuVZscgGvKOOK3D1FZHqKaMM3lagoUVkeoo4xV9ptrdAksqt+5rWNHlgLErkeo5H81cw7SaYY93H3qyUFlqxYxaXA1t5cnErDht319KsJo9qq4IbPcUyKwLZPaozucLUi7VCr3Y0jtFLg1O2Is1BtcNknimc7JsNkBeDUSLPcbHJxz2q7SP+rDE4lh6EjFTyFIH5q1BAGapBz7tO9WLgOua0W6tfZYBblBIFHWDttDH5Zr2Qlg6iNV+T5FLs2BQwPHrUdu6uGOKaIs+7OPSpbZmbIOaZGaEJxn61FbBVbfSqxjePKnIOOa9jaNyzhWGCdu7k1LFH0LhJJUWFvPncN64Hw1qLDe1Sd/direTBqxumUrzUFwx0qNs4/qH/tWmgSRs5Y8GjOwjOOfNtBpbp0l2uTwcEVOxERZTVqesWyx4rccyoGJAU8+lQXIjlJPwmrhmFq9yPM5GAfhrUrlyXyau5CWNMcn3kbYNWs2CK0do59IdOvErtKDh3C8LVoLe2hbqywuxIC7XzU9xApDm4QIgG3YwY5+lO8VyRJHdLnOD1CEoSKbVo2nh3dh5xUIgiSRpZozxxtcE1DLEiSIZ4sHODvFW6RwzdWSeAgAkYkHeo7mNiJYpYVRx50dwvNeIxDBdypFIrJ3Uqc8Gp3yT70VG+DWnyXDglAxVdu5gDhdxwMn9s1baFqLorEYyAaPh6/Nfd++BA/8AaGg6hX2Ff19hX2SAafQL8g4rVBc2MjRyZDCri5L5yads++BxWk6rJZNOE2jrII3YjLbM5IHpn96g8WaY6Rl0cOEVT5h+1febSfR/9h6Yp/FOluqqQ/Ax+YUPFGlAg7X+m4UfFOmZUjfwQe45xT+KNLd92HHrhhUnifSSDlJD9HrxNrMV/dPJGCAaMhNE/oBI47Ma6snxGurJ8RrqyfEa6snxmurJ8RrqSfEaJJ7n+9//xAAoEQABAwIDBwUAAAAAAAAAAAABAAIRAyEEEjEgIiMwQVKhEEBRYWL/2gAIAQIBAT8ARyRaZ9Rlm8oNaflZG/pEMA6zymsJVGg2ASjSa4RCr0YNkQRyKbC4qlhwBJUBQnU2uCr4ci40REbeF1N+iZMQUAYV7q8Igxoqmp26boKYZynpCLvtE3CJO6sQdwEFON9sFYYsM53KMP3eVwO/yuB3eVVcM5DTI9//AP/EAC4RAAICAQMBBgMJAAAAAAAAAAECAxEABAUSMRMgITBBUVSBkgYUJEBhcpHR4f/aAAgBAwEBPwDuHHmVOpwauMmgcVw3TytRqo4lNnN03qbtHSNgAB4epOQ7jNE4cS2W62Sc2jdTKlSEWDVjEkVwCD5Gu1iQRlmYADNy3t5mKxdPfO0ckliSThcfzkOtnhfkp+WbPvaS0jGm9jkTh1B7zdDn2jLBIzwLAPdenzzUlS4dCbPUe2Oy8xTeAGMUYxtYv1wlCxINixkTqZAVckUBWaG+zXv6zTh1PhmsiC9vGLDdqaAGRwgi2SlPrR8DiRVHIvjy5UKGRKoWYEHoK/XNjQfeWjZPHqP6yBOKDvsvIZv0esiMR0sPK75GrrOe9fDmv2Ze8/DH6MU7zY/DH6P9zbNO500TzRhZCo5DAKHkUDnFfYZxX2GcV9h+T//Z",
    Hd = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQgBAQACAwEBAAAAAAAAAAAAAAADBAECBQYH/9oADAMBAAIQAxAAAAD5/wDfKi9Qp2UHurxctsL9i/nKny7nHlNYo8uUlg91z498AAAFy3Oz2I1IW7FqO27WNyi87lQM7ib8PAsbZbNfm8GWaapHb5D6W7GVYl94NeksyNxmrTOh6Bp0zMS+ow8eatEOKPOTcJOW70UkNt5MeiVdSc2XlrqQ5b71EctdSGkYHRm0HLPepNZ+W+dTHLaeqDldHVoCXXTM61d9JLDinzU5Bzlu9l9l432bwt/YardPjOvWpqKvKKirykVqK8Ka7GQWynK55RSZOm7hqNuHjNq9Z+v8WHFflpyDnLd6neuZ18bXs7jjkz9jccHY3HB2Nyrss3Ij3uh5xvbjiDsdjccHY3HB2HWtDszaZleDneq2hxT5qbhJy3eibN6zWqBroABXJxLMcrh4xgMSgAAZOfgZ97ow4o85NQ/s08/RCrNuaQrGJpCiaQomkKJpCiaQomkKJpCiaQonsGPoxrSqUqHTwAAAAAAAAAAAAf/EACMQAAAFBAMBAQEBAAAAAAAAAAIDBAUVARIUFgAGExAwIED/2gAIAQEAAQIA4EJSU0n+aJqJhEDS1TYwyPyCIB4zOW+PwCmpxhmYBWFSYfylKU/ssrCwjSCE4RCZ9dM68WwrAqmBe2mJRtsIFEhbBF4WFhDL+M9TXaYVLSySkmEYnUJ3UqiU9OSlKCvbiULMqQIvaYmCHV5+tPDg0IxvDw8PDxqR4Jl64zH8PCifwxsYRKajx9aeAJbmDU9T1PU9T1PU9T1PU9T1PU9T1PUxdTdGIJbx9aeIg9aLqbf6iO9AGX+tTKDCaIVDanVH687eA6jx9aeIa9bGEmiYJHl4FlCJoTQiwwgQaleAyKEUp24R1Xj608KOaOxbft+37ft237ft+37dt+37dt+37eLt712Ghjx9aeHCCqzs7Ozs7Obj9Uc+udsIzs7Ozs7OqtGpTVePrTxR+BZk6J7VLPwS8ePrTxR/kS8ePrSYY3xsbGxsbGxsbGxsbGxsbGxsbGxpSB2M5bSl111111111111111111111aWx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx/wD/xAA5EAABAwIDAwgJAwUBAAAAAAABAAIDBBESUVQhkZMQEzFBYnGS0QUUIiRSYXOhsSMwMiAzgYLBQP/aAAgBAQADPwBOcQ1oJJ6AFUS/wjJUkL8EjcLsv6p3RiRsZLT0EKcvazmnBzr2BFr271M1uN0bg29rkWVSwkGF+66nAuYn7lOWtcInEOFwQLqZgJdE4AG1yNn7bmODmkgjoKmZ/F5G2+xPkOJ7i42tc8hte2xSAYi2w5Z4w0MlcAOixUpNzI69iOnPpVU8HG95Bte5yVVe/PP3qoYbtlPX91VMiwNkcGKoe2z5XFuRPISLono/YfIbNCnyU+SfEAXDpUTvR0bHRkMMEspN9mKNwAf/AKqSKd0MhrIoQ8MYwMBjw/N/zVK18rp2TxtMsgjYwB5DWHr7s1FE4Rz+sF77uZzTQ8YMyntnY0YsALmv2i4cwXcB3BUjZBidO6wBLWgOdZwu02H3VLHggbT1Doud5iRg2m2DEGC2+6LS0Q48WKO4fYbJjZm8r1aSLBidHJiDSbXuw4XCw+axQH0b6s8SRsBDr7DM0YngdRu1RT0RY+J7I4IopC7EPZDhief9lRPsWPnAL8HtgNIfbFY5AhUlLTQxilq3xzlwf7NnktthOHskr1V0sT4HnHO2M2cATG9pdgPzKxzuY0bSVPkp8lP8Kcw2cOXCZHDpDHn7KpbI4B7t6qvjdvU1SGh7iQCo3egsYijx8xIMeP55fFkpof0jTSz7LYnTgxHZ0gFSS1EcrQZogzmXczLhOJmwuN+pyeyazafEwlpa+GYAsAFsDr71JG+ZrPR7JsTnubIyUYRjFrG/wqajpXSNayJ5MQDo3nHsbttb7qdj3TtihcRPjEbZNrmlgaQ05A7U9kgkFCJw9kfsiUYmOZ8RPW6+1Gpmo5RDEebE7zGX7XkPsGH/AIqU1opGlzqmN98Rl/Se8bSAPn0KeeGsEMcMWIRljRJtdhBu0J4jhPqoBEpMnPzBxIDDYk5XU1RF/EzSQg3vLaRwkFrgn4UGS1TJhHMRM1wLpdrQW3s45Zp0FWZGHa1xsQqr43b1VfG7eql8li929e8v7+XZL9N/4RMru9OKfkpVLl9lLkpcvspVKVLkhFSx08tCyUMc4tJJafa7lNV1DpubawWADWjYABYBSXupVLa1vspApclJkU/JOCtKF7y/v5dkv03/AIWOd3ep6ppMUJfa17Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTOVRRtBmhczFe1+uywTL3l/fy/wB36b/wgag96DIZfmGqMC5cOr7pmYTLs7Rso2329BF0y4GLpTHlwbttZMBIv0Dao9ntdKjAviCaSLEbRdMcwOvYEH7INaXHoATSG32E9SjAJvexA3pgNiVHa+LrtyB0FP8AIPVqhe8v7+X+79N/4Vqj/KDoZe5qDSDiJsRb/CaCDidsFvtZBotjP8sS7WzFcC3zum4g66wX9om4A7gEHOeS7+QssNsLrHr2DagCfaNtn2N17Ydi6ARZEsDQSdp67WBQc1zT1iyBI2kAAAjOyGEjGegAHK20LE7FiN7f8srtaH2FidxRBccRN/sgIIO56vUL3l/fy/3fpv8AwsE571JRMcIy32rXuL9Cmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8KntsMfhU1e1gkLLMvbCLdKxzr3l/fy7Jfpv8Awi2Z3enN60/NPzKfmU/Mp+ZT8yufrYI33LXOsV6IHTBMe55XoymgY+OGQEyBvtPv0qH0V6VNNTYgwRMdtNzdyfmU/Mp+ZT8yn5lPzKfmnO61eYL3l/fy7Jfpv/C/Vd+w+N7XscQ4dBXpbX1HFf5r0o62Ksmdtv7T3O/KqKuTnJ5XPfa13G5/Z/VC95f38uyX6b/wv1Xf+T9UL3l/fyxtc8PcGgscLn5hUz3l3rEe8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqZjr+sR7z5Jj6h5Ybi/I74SnjoBU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aTz0gp3wlUGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bV//8QANREAAQIDAwkHAgcAAAAAAAAAAQACAwQRElORBRATFBUWIjRUBiAhMUFRYWJxMDI1UnJzsf/aAAgBAgEBPwBGzT1rnFPVcPyuD5XBT170tCEWM1hNAUWSAJGkiYICHbfoyS2z6pza0q1GEz9qa0CoDU6E3yA8UGggmlfRBrQRw0JT2tGjteDbXirMheRMFEgS+gdFhPcaOAIIzSPMsU5Ow5dzy9wAqtty163Fbclr1uK25LXrcVtyWvW4o5egEUMVmIW3Ja9bituS163Fbclr1uKg5Xl4rw1sRpJ+VCIdk+KfrbmkeZYu0tbMT2tKjPcrgRsUNCVRnuuH3RDfD7rgVGUHisnc7Bp7n/FKfpkT+bc0jzLFPyEOZL2vAIqt35a7C3flrsLd+WuwoXZiDFBLWMUTsvChgksYt35a7C3flrsLd+WuwoGRJeDEDxDAIUFtnJ8UfW3NI8yxP/O779wOcPIlFzj5k91nIxf7G5oEXQxWvpWiMzLkk6s3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lRZpjoJhMhBgJBP4/wD/xAA2EQABAwAGBwUGBwAAAAAAAAABAAIDBAURFCFSEBIVQVFUkRMgNHOxBiIxM2FxIzA1RFOBkv/aAAgBAwEBPwDSCD8DotWPfosLZ52RuNgKMdWgkdrJgcqrp0THQCJztQygAnDcoZuzLyyYNBaLXAjGz+8CfqmVnSbR+OCXN3loHqpZnvEUsk+sLHBotA97BUespbA98gLADbiMpPHiFJO5j4mmQstIfrHiSAXDH4FPnmlY93bFzIyLRrAYm0DEFVVKJaVNrvJFkes4fXeBatSrf5Zf8qWj0a7Omhe42OAII46Ku8XGhA6SRwA3lXCXIVcJMh6LZ8mQ9FcJMhTKnayQyNidrG3jvxKuEmQq4SZCrhJkKfQ5GAktKYLKum8xvodFXeLjVBs7Z33K97gveWKxWKFqxVruCpPyHr9hP5rfQ6Ku8XGm0h0UjiDvK2jLmK2jLmK2jLmKrL2qhq18bJ+0JeCRqqge1sFOlbHEZASHHEZVtGXMVtGTMVtGXMVJTpHtLS42Jhtq6fzG+h0Vd4uNSfMf9z3HwxSEF8bXfcWpkEDDrMiY08QO7H+nTeY30OijzGCZsgFtm5Gl0Ukk0RvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUqamRvgMMcAYC4E/n//Z",
    Ud = j('<div class="absolute origin-top-left bg-black"><img class="absolute top-0 left-0 wh-full object-cover"><img>'),
    Fd = "absolute top-0 left-0 wh-full object-cover",
    Gd = () => (() => {
        const e = Ud(),
            n = e.firstChild,
            t = n.nextSibling;
        return e.style.setProperty("width", "150px"), e.style.setProperty("height", "85px"), e.style.setProperty("transform", "translate(403px, 924px) rotateZ(-4deg)"), le(n, "src", Nd), le(t, "src", Hd), X(() => te(t, ce(Fd, {
            hidden: !Ze.archive.hasNew()
        }))), e
    })(),
    Zd = j('<div class="absolute top-0 left-0 wh-full isolate">'),
    Yd = e => {
        const [n, t] = Y(!1), i = st(() => on() ? [on().srcWebm, on().srcMp3] : []), l = st(() => [oi().srcWebm, oi().srcMp3], {
            loop: !0,
            autoplay: !0
        }), c = st([cc, uc]);
        (async () => {
            await qr(6e4);
            const p = c.internalInstance();
            p && (p.on("end", async () => {
                await qr(6e5), c.play()
            }), c.play())
        })();
        const d = p => {
            if (p === "answering-machine") {
                const r = i.internalInstance();
                if (!r) return;
                const a = r.playing(),
                    f = r.seek() === 0;
                ne.trackClickEvent("answering-machine", a ? "pause" : "play", "cctv-room"), a ? (l.setVolume(1), c.setVolume(1), i.pause()) : (l.setVolume(.3), c.setVolume(.3), i.play(), f && (Ze.answeringMachineTrack.setLastPlayed(), r.once("end", () => {
                    i.stop(), l.setVolume(1), c.setVolume(1)
                })))
            } else p === "log-book" && (ne.trackClickEvent("logbook", "open", "cctv-room"), e.roomSound.play("logbook-open")), p === "terminal" && (ne.trackClickEvent("terminal", "open", "cctv-room"), e.roomSound.play("terminal-open")), we.openApp(p)
        };
        return (() => {
            const p = Zd();
            return C(p, x(ao, {
                get each() {
                    return me.screens
                },
                children: r => x(Ed, {
                    screen: r,
                    onClick: () => {
                        r.isEnabled() && r.position() === "c" ? (n() || (me.Supervisor.dispatch("play"), t(!0)), me.Supervisor.setControlsVisible(!0)) : me.Supervisor.positionScreenAtCenter(r), e.roomSound.play(qs(["screen-tap-1", "screen-tap-2", "screen-tap-3"]))
                    }
                })
            }), null), C(p, x(Gd, {}), null), C(p, x(Dd, {}), null), C(p, x(jd, {}), null), C(p, x(Ld, {
                onItemSelected: d
            }), null), C(p, x(ze, {
                get when() {
                    return me.Supervisor.controlsVisible()
                },
                get children() {
                    return x(yd, {})
                }
            }), null), X(() => (rt.currentStatus() === Ut.done ? "visible" : "hidden") != null ? p.style.setProperty("visibility", rt.currentStatus() === Ut.done ? "visible" : "hidden") : p.style.removeProperty("visibility")), p
        })()
    },
    Wd = j('<div class="absolute top-0 left-0 wh-full z-modal">'),
    lr = e => x(ze, {
        get when() {
            return e.isOpen
        },
        get children() {
            const n = Wd();
            return C(n, () => e.children), n
        }
    }),
    qd = "/assets/logbook-36af03c8.mp3",
    Qd = "/assets/logbook-dccdaf17.ogg",
    Kd = j('<div><img><img><img class="absolute left-1/2 w-1/2 h-full"><img><img><div class="absolute top-0 left-0 wh-full flex"><button class="flex-1"></button><button class="flex-1"></button></div><button class="absolute top-20 left-20 w-100 h-100 flex-center">'),
    Jd = () => [...Ns().map(e => e.src), null].reverse(),
    nn = () => Gs(Jd()).map((e, n) => ({
        index: n,
        left: (e == null ? void 0 : e[0]) || null,
        right: (e == null ? void 0 : e[1]) || null
    })),
    Xd = e => {
        const n = [],
            [t, o] = Y(!1);
        mn(async () => {
            const h = n.map(v => new Promise((g, m) => {
                if (!v.src) return g();
                v.onload = () => g(), v.onerror = () => m()
            }));
            try {
                await Promise.all(h), o(!0)
            } catch (v) {
                e.onClose()
            }
        });
        const [i, s] = Y(nn().length - 1), [l, c] = Y([]), u = () => {
            const h = i() - 1;
            return nn()[h] ? !l().includes(h) : !1
        };
        _e(() => {
            const h = i() - 1,
                v = nn()[h];
            if (!v || l().includes(h)) return;
            const g = [v == null ? void 0 : v.left, v == null ? void 0 : v.right].filter(m => !!m).map(m => {
                if (m) return Zs(m)
            });
            Promise.allSettled(g).then(() => {
                c([...l(), h])
            })
        });
        const d = () => {
                !u() && i() !== 0 && (ne.trackClickEvent("pages", "prev", "logbook"), s(h => h - 1), f.play("page-turn", {
                    interrupt: !0
                }))
            },
            p = () => {
                i() >= nn().length - 1 || (ne.trackClickEvent("pages", "next", "logbook"), f.play("page-turn", {
                    interrupt: !0
                }), s(h => h + 1))
            },
            r = () => nn()[i()],
            a = () => i() === 0,
            f = st([Qd, qd], {
                sprite: {
                    "page-turn": [0, 933.3333333333334]
                }
            });
        return (() => {
            const h = Kd(),
                v = h.firstChild,
                g = v.nextSibling,
                m = g.nextSibling,
                y = m.nextSibling,
                A = y.nextSibling,
                b = A.nextSibling,
                $ = b.firstChild,
                N = $.nextSibling,
                U = b.nextSibling;
            return Ee(L => n.push(L), v), le(v, "src", Fs), Ee(L => n.push(L), g), le(g, "src", Hs), Ee(L => n.push(L), m), le(m, "src", Us), Ee(L => n.push(L), y), Ee(L => n.push(L), A), $.$$click = () => d(), N.$$click = () => p(), U.$$click = () => {
                e.onClose()
            }, C(U, x(ie, {
                size: "terminal-lg",
                class: "text-purple leading-none tracking-[-10px]",
                children: "<-"
            })), X(L => {
                var w, T, k, O;
                const B = ce("wh-full flex relative", !t() && "invisible"),
                    z = ce("absolute w-[calc(50%+2px)] h-full", !a() && "invisible"),
                    R = ce("absolute w-[calc(50%+2px)] h-full", a() && "invisible"),
                    K = ((w = r()) == null ? void 0 : w.left) || void 0,
                    de = ce("absolute w-1/2 h-full mix-blend-multiply pointer-events-none pl-[99px] pr-52", !((T = r()) != null && T.left) && "invisible"),
                    D = ((k = r()) == null ? void 0 : k.right) || void 0,
                    I = ce("absolute w-1/2 left-1/2 h-full mix-blend-multiply pointer-events-none pl-52 pr-[99px]", !((O = r()) != null && O.right) && "invisible");
                return B !== L._v$ && te(h, L._v$ = B), z !== L._v$2 && te(v, L._v$2 = z), R !== L._v$3 && te(g, L._v$3 = R), K !== L._v$4 && le(y, "src", L._v$4 = K), de !== L._v$5 && te(y, L._v$5 = de), D !== L._v$6 && le(A, "src", L._v$6 = D), I !== L._v$7 && te(A, L._v$7 = I), L
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0,
                _v$5: void 0,
                _v$6: void 0,
                _v$7: void 0
            }), h
        })()
    };
$e(["click"]);
const ep = e => x(lr, {
        get isOpen() {
            return we.currentOpenApp.mainApp === "log-book"
        },
        get children() {
            return x(Xd, {
                onClose: () => {
                    var n;
                    ne.trackClickEvent("modal", "close", "logbook"), we.closeApp(), (n = e.onClose) == null || n.call(e)
                }
            })
        }
    }),
    tp = "/assets/terminal-2aa26d8b.mp3",
    np = "/assets/terminal-ca9f8876.ogg",
    Xs = Va(),
    rp = e => {
        const n = st(e.src, e.options);
        return x(Xs.Provider, {
            value: n,
            get children() {
                return e.children
            }
        })
    };

function Yt() {
    const e = Wi(Xs);
    if (e === void 0) throw new Error("useAudio must be used within a AudioProvider");
    return e
}
const op = "\n      @@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@@\n @@                          @@@@@\n@                         @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@ \n@                         @@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
    ip = "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n     @@      @@@@@@@@      @@  @@\n      @@  @@@@@@@@@@@@@@@@@@  @@\n       @@  @@@@@@@@@@@@@@@@  @@\n        @@  @@@@@@@@@@@@@@  @@\n         @@  @@@@@@@@@@@@  @@\n           @@  @@@@@@@@  @@\n             @@  @@@@  @@\n              @@  @@  @@\n             @@  @@@@  @@\n           @@     @@     @@\n         @@                @@\n        @@        @@        @@\n       @@       @@@@@@       @@\n      @@      @@@@@@@@@@      @@\n     @@     @@@@@@@@@@@@@@     @@\n    @@    @@@@@@@@@@@@@@@@@     @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@                          @@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
    sp = "\n _   ____                       _ _              _    _           _     _\n| | / ___|  ___  ___ _   _ _ __(_) |_ _   _     / \\  | | ___ _ __| |_  | |\n| | \\___ \\ / _ \\/ __| | | | '__| | __| | | |   / _ \\ | |/ _ \\ '__| __| | |\n|_|  ___) |  __/ (__| |_| | |  | | |_| |_| |  / ___ \\| |  __/ |  | |_  |_|\n(_) |____/ \\___|\\___|\\__,_|_|  |_|\\__|\\__, | /_/   \\_\\_|\\___|_|   \\__| (_)\n                                      |___/\n",
    ap = "\n    __\n   / /\n  / /\n / /\n/_/\n",
    lp = "\n _\n(_)\n _\n(_)\n",
    cp = {
        archive: op,
        timecoder: ip,
        securityAlert: sp,
        forwardSlash: ap,
        colon: lp
    },
    up = j("<span>"),
    At = e => (() => {
        const n = up();
        return C(n, () => cp[e.name]), X(() => te(n, ce("font-vt-220 font-medium leading-none whitespace-pre", e.class))), n
    })(),
    fp = j("<span>Security Archives"),
    dp = j("<span>Time Coder"),
    pp = j('<div class="wh-full flex justify-center space-x-368 items-end pb-144"><div class="flex flex-col items-center space-y-56" role="button"></div><div class="flex flex-col items-center space-y-56 text-shadow-terminal" role="button">'),
    Pi = bn("relative inline-block w-[600px] text-center py-8", {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black [&>span]:text-shadow-none", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light text-shadow-terminal border"
            }
        }
    }),
    vp = e => {
        const n = Yt(),
            [t, o] = Y();
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
            const l = pp(),
                c = l.firstChild,
                u = c.nextSibling;
            return c.$$click = () => s("security-tape-archives"), C(c, x(At, {
                name: "archive",
                class: "text-purple text-[21px] text-shadow-terminal"
            }), null), C(c, x(ie, {
                size: "terminal-md",
                get class() {
                    return Pi({
                        selected: t() === "security-tape-archives"
                    })
                },
                get children() {
                    return fp()
                }
            }), null), u.$$click = () => s("timecoder"), C(u, x(At, {
                name: "timecoder",
                class: "text-purple text-[18px] text-shadow-terminal"
            }), null), C(u, x(ie, {
                size: "terminal-md",
                get class() {
                    return Pi({
                        selected: t() === "timecoder"
                    })
                },
                get children() {
                    return dp()
                }
            }), null), l
        })()
    };
$e(["click"]);
const hp = j('<div class="absolute top-0 left-0 wh-full flex flex-col items-center pt-72 bg-terminal"><img class="block w-[732px] mb-32 text-blue-light drop-shadow-terminal transform-gpu" width="873" height="621"><div class="flex space-x-32 text-blue-light"><div class="bg-blue-light shadow-terminal"></div><div class="w-24 h-full bg-blue-light shadow-terminal">'),
    mp = () => {
        const [e, n] = Y(!0), t = setTimeout(() => n(!1), 1e3);
        return Ae(() => clearInterval(t)), x(ze, {
            get when() {
                return e()
            },
            get children() {
                const o = hp(),
                    i = o.firstChild,
                    s = i.nextSibling,
                    l = s.firstChild;
                return le(i, "src", mo), C(o, x(ie, {
                    as: "p",
                    size: "terminal-sm",
                    class: "text-center whitespace-pre text-purple mb-56 text-shadow-terminal",
                    children: "**********************************************************\n\n(c) copyright Starr Park corporation, 1995. All rights reserved.\nStarr Park Security Services is a registered\ntrademark of Starr Park corporation. \n          \n**********************************************************"
                }), s), C(l, x(ie, {
                    as: "span",
                    size: "terminal-md",
                    class: "text-black px-16 py-8",
                    children: "Loading"
                })), o
            }
        })
    },
    gp = 10,
    Ei = e => {
        const n = _s(e);
        return {
            date: n.format("DD.MM.[1995]"),
            time: n.format("HH:mm")
        }
    },
    _p = (e = {}) => {
        const [n, t] = Y(Ei(e.timezone)), o = () => {
            const s = Ei(e.timezone);
            t(s)
        }, i = setInterval(() => o(), gp * 1e3);
        return Ae(() => clearInterval(i)), n
    },
    Ci = j("<span>"),
    yp = j("<span>Starr Park Security System"),
    bp = () => {
        const e = _p({
            timezone: ds
        });
        return x(ie, {
            as: "p",
            class: "flex justify-between items-center px-144 pt-64 text-blue-dark text-shadow-terminal",
            size: "terminal-sm",
            get children() {
                return [(() => {
                    const n = Ci();
                    return C(n, () => e().date), n
                })(), yp(), (() => {
                    const n = Ci();
                    return C(n, () => e().time), n
                })()]
            }
        })
    },
    wp = j('<div><div class="flex w-full"><button><span>&lt;-</span></button><div class="flex items-center flex-1 h-full px-32 bg-blue-light text-blue-light shadow-terminal"></div></div><div class="flex-1 min-h-0 px-100">'),
    Ap = "w-100 h-100 flex-center font-vt-220 font-medium leading-none text-shadow-terminal",
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
            const o = wp(),
                i = o.firstChild,
                s = i.firstChild,
                l = s.nextSibling,
                c = i.nextSibling;
            return s.$$click = () => t(), C(l, x(ie, {
                as: "span",
                size: "terminal-lg",
                class: "text-black",
                get children() {
                    return e.title
                }
            })), C(c, () => e.children), X(u => {
                const d = ce("flex flex-col flex-1 pt-64 px-44"),
                    p = ce(Ap, "text-purple text-[80px] tracking-[-10px]");
                return d !== u._v$ && te(o, u._v$ = d), p !== u._v$2 && te(s, u._v$2 = p), u
            }, {
                _v$: void 0,
                _v$2: void 0
            }), o
        })()
    };
$e(["click"]);
const xp = "/assets/terminal-typing-8b10cd31.mp3",
    Sp = "/assets/terminal-typing-20a23c49.ogg";
class ea extends Error {
    constructor(t, o) {
        super(o);
        qo(this, "statusCode");
        this.statusCode = t, Object.setPrototypeOf(this, new.target.prototype)
    }
}
const Tp = "https://bmwryv10bd.execute-api.us-east-1.amazonaws.com",
    ta = {
        base: "".concat(Tp),
        getArchiveByCode: e => "".concat(ta.base, "/timecoder/").concat(e)
    },
    kp = async ({
        params: e
    }) => {
        const n = ta.getArchiveByCode(e.code),
            t = await fetch(n, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        if (!t.ok) throw new ea(t.status, "Unable to fetch ".concat(n, ": ").concat(t.status, " ").concat(t.statusText));
        return await t.json()
    }, $p = j('<div class="flex flex-col space-y-120 w-full pt-72 pb-32"><div class="flex justify-between"><div class="flex space-x-24 items-center"></div><div class="flex space-x-24 items-center"></div></div><div class="flex flex-col space-y-48 items-center"><button class="inline-flex px-120 py-8 text-blue-light border text-shadow-terminal">'), Ip = j('<input pattern="[0-9]*" inputmode="numeric">'), Op = {
        day: "00",
        month: "00",
        year: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
    }, Un = "text-blue-light text-[20px]", Pp = e => {
        const [n, t] = Gt(Op), o = Yt(), i = {
            "typing-1": [0, 200],
            "typing-2": [2e3, 166.66666666666652],
            "typing-3": [4e3, 183.33333333333357],
            "typing-4": [6e3, 183.33333333333357],
            "typing-5": [8e3, 199.9999999999993],
            "typing-6": [1e4, 233.33333333333252],
            "typing-7": [12e3, 250]
        }, s = st([Sp, xp], {
            sprite: i
        }), [l, c] = Y(void 0), [u, d] = Y(!1), p = (v, g) => {
            t(v, g), s.play(qs(Object.keys(i)))
        };
        let r;
        const a = async () => {
            o.play("click", {
                interrupt: !0
            }), d(!0), c(void 0);
            const v = Object.values(n).join("");
            let g;
            try {
                g = await kp({
                    params: {
                        code: v
                    }
                })
            } catch (m) {
                return ne.trackClickEvent("timecoder", "submit", "terminal-timecoder", {
                    archiveCode: v,
                    result: "error"
                }), m instanceof ea && m.statusCode === 404 ? (o.play("timecoder-error", {
                    interrupt: !0
                }), c("Archive not found!")) : (o.play("timecoder-error", {
                    interrupt: !0
                }), console.error(m), c("Something went wrong. Try again later."))
            } finally {
                d(!1)
            }
            ne.trackClickEvent("timecoder", "submit", "terminal-timecoder", {
                archiveCode: v,
                result: "success"
            }), e.onLoadPlaylist(g)
        };
        Ae(() => {
            clearTimeout(r)
        });
        let f;
        const h = v => {
            if (!f) return;
            const g = [...f.querySelectorAll("input")],
                m = g.findIndex(A => A === v),
                y = g[m + 1];
            y ? y.focus() : v.blur()
        };
        return (() => {
            const v = $p(),
                g = v.firstChild,
                m = g.firstChild,
                y = m.nextSibling,
                A = g.nextSibling,
                b = A.firstChild,
                $ = f;
            return typeof $ == "function" ? Ee($, g) : f = g, C(m, x(Dt, {
                name: "day",
                get value() {
                    return n.day
                },
                onChange: p,
                onNextInputFocus: h,
                get disabled() {
                    return u()
                }
            }), null), C(m, x(At, {
                name: "forwardSlash",
                class: Un
            }), null), C(m, x(Dt, {
                name: "month",
                get value() {
                    return n.month
                },
                onChange: p,
                onNextInputFocus: h,
                get disabled() {
                    return u()
                }
            }), null), C(m, x(At, {
                name: "forwardSlash",
                class: Un
            }), null), C(m, x(Dt, {
                name: "year",
                get value() {
                    return n.year
                },
                onChange: p,
                onNextInputFocus: h,
                get disabled() {
                    return u()
                }
            }), null), C(y, x(Dt, {
                name: "hours",
                get value() {
                    return n.hours
                },
                onChange: p,
                onNextInputFocus: h,
                get disabled() {
                    return u()
                }
            }), null), C(y, x(At, {
                name: "colon",
                class: Un
            }), null), C(y, x(Dt, {
                name: "minutes",
                get value() {
                    return n.minutes
                },
                onChange: p,
                get disabled() {
                    return u()
                },
                onNextInputFocus: h
            }), null), C(y, x(At, {
                name: "colon",
                class: Un
            }), null), C(y, x(Dt, {
                name: "seconds",
                get value() {
                    return n.seconds
                },
                onChange: p,
                get disabled() {
                    return u()
                },
                onNextInputFocus: h
            }), null), b.$$click = () => a(), C(b, x(ie, {
                size: "terminal-md",
                children: "ENTER"
            })), C(A, x(ze, {
                get when() {
                    return !!l()
                },
                get children() {
                    return x(ie, {
                        size: "terminal-sm",
                        class: "text-purple text-shadow-terminal",
                        get children() {
                            return l()
                        }
                    })
                }
            }), null), C(A, x(ze, {
                get when() {
                    return u()
                },
                get children() {
                    return x(ie, {
                        size: "terminal-sm",
                        class: "text-green text-shadow-terminal",
                        children: "Loading..."
                    })
                }
            }), null), X(() => b.disabled = u()), v
        })()
    }, Dt = e => {
        const n = Yt(),
            [t, o] = Y(0),
            i = u => {
                const d = u.target,
                    f = d.value.replace(/[^0-9]/g, "").slice(-2).padStart(2, "0");
                e.onChange(e.name, f), d.value = f, t() === 2 && e.onNextInputFocus(d)
            },
            s = u => {
                n.play("click", {
                    interrupt: !0
                });
                const d = u.target;
                d.setSelectionRange(d.value.length, d.value.length)
            },
            l = u => {
                const d = u.key;
                (d === "Delete" || d === "Backspace") && o(p => p !== 0 ? p - 1 : p), /^[0-9]$/.test(d) && o(p => p + 1)
            },
            c = u => {
                o(0)
            };
        return (() => {
            const u = Ip();
            return u.addEventListener("focus", c), u.$$click = s, u.$$keydown = l, u.$$input = i, X(d => {
                const p = ce(wn({
                        size: "terminal-xxl"
                    }), ["w-192 text-center bg-transparent caret-transparent focus:outline-none", "border-b-2 border-purple text-green drop-shadow-terminal focus:border-b-4"]),
                    r = e.name,
                    a = "".concat(e.name, "-input");
                return p !== d._v$ && te(u, d._v$ = p), r !== d._v$2 && le(u, "name", d._v$2 = r), a !== d._v$3 && le(u, "id", d._v$3 = a), d
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }), X(() => u.value = e.value), u
        })()
    };
$e(["click", "input", "keydown"]);
const Ep = j('<div class="wh-full flex flex-col w-full pb-48"><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible"></button><div class="flex-1 flex flex-col"></div><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible">'),
    Di = j("<span>"),
    Cp = j('<button class="py-16 px-32 text-green text-shadow-terminal">'),
    Fn = 7,
    Dp = e => {
        const n = Yt(),
            [t, o] = Y(0),
            i = () => Math.ceil(un().length / Fn),
            s = () => un().slice(t() * Fn, t() * Fn + Fn);
        return (() => {
            const l = Ep(),
                c = l.firstChild,
                u = c.nextSibling,
                d = u.nextSibling;
            return c.$$click = () => {
                ne.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"), n.play("click", {
                    interrupt: !0
                }), o(p => p - 1)
            }, C(c, x(ie, {
                size: "terminal-md",
                class: "-rotate-90",
                children: ">"
            })), C(u, x(ao, {
                get each() {
                    return s()
                },
                children: p => {
                    const r = gs(p.postDate, p.dropTime.hours, p.dropTime.minutes),
                        a = jl(r, "DD.MM.[1995] HH:mm"),
                        f = a.split(" ")[0],
                        h = a.split(" ")[1];
                    return (() => {
                        const v = Cp();
                        return v.$$click = () => {
                            ne.trackClickEvent("tape-archives", "open-playlist", "terminal-tape-archives", {
                                playlistId: p.playlistId
                            }), n.play("click", {
                                interrupt: !0
                            }), e.onLoadPlaylist(p)
                        }, C(v, x(ie, {
                            size: "terminal-md",
                            class: "flex space-x-272",
                            get children() {
                                return [(() => {
                                    const g = Di();
                                    return C(g, f), g
                                })(), " ", (() => {
                                    const g = Di();
                                    return C(g, h), g
                                })()]
                            }
                        })), v
                    })()
                }
            })), d.$$click = () => {
                ne.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"), n.play("click", {
                    interrupt: !0
                }), o(p => p + 1)
            }, C(d, x(ie, {
                size: "terminal-md",
                class: "rotate-90",
                children: ">"
            })), X(p => {
                const r = t() === 0,
                    a = t() >= i() - 1;
                return r !== p._v$ && (c.disabled = p._v$ = r), a !== p._v$2 && (d.disabled = p._v$2 = a), p
            }, {
                _v$: void 0,
                _v$2: void 0
            }), l
        })()
    };
$e(["click"]);
const Mp = j('<span class="text-black">Access Security System'),
    Bp = j('<div class="wh-full flex flex-col items-center space-y-76 pt-76 "><img class="w-[872px] drop-shadow-terminal text-blue-light transform-gpu" width="873" height="621">'),
    Lp = e => {
        const n = setTimeout(() => e.setCurrentOpenApp("home"), 2e3);
        return Ae(() => clearInterval(n)), (() => {
            const t = Bp(),
                o = t.firstChild;
            return le(o, "src", mo), C(t, x(ie, {
                size: "terminal-md",
                class: "px-16 py-8 bg-blue-light text-blue-light shadow-terminal",
                get children() {
                    return Mp()
                }
            }), null), t
        })()
    },
    Rp = j('<span class="text-black">unwatched security footage'),
    Vp = j('<div class="flex-1 pt-144 pb-124 px-144"><div class="relative wh-full flex flex-col space-y-92 items-center justify-center border-x-2 border-b-2 border-purple"><div class="absolute top-0 left-0 wh-full flex items-start"><div class="flex-1 border-t-2 border-purple"></div><div class="flex-1 border-t-2 border-purple"></div></div><div class="flex space-x-184"><button><span>Dismiss</span></button><button><span>Open'),
    Mi = bn(["relative px-24 py-8", wn({
        size: "terminal-md"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light text-shadow-terminal border"
            }
        }
    }),
    zp = e => {
        const n = Yt(),
            [t, o] = Y();
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
            const l = Vp(),
                c = l.firstChild,
                u = c.firstChild,
                d = u.firstChild,
                p = d.nextSibling,
                r = u.nextSibling,
                a = r.firstChild,
                f = a.nextSibling;
            return C(u, x(At, {
                name: "securityAlert",
                class: "px-64 -translate-y-1/2 text-blue-light text-[32px] text-shadow-terminal"
            }), p), C(c, x(ie, {
                as: "div",
                size: "terminal-xl",
                class: "px-56 py-32 bg-orange text-orange shadow-terminal",
                get children() {
                    return Rp()
                }
            }), r), a.$$click = () => s("dismiss"), f.$$click = () => s("open"), X(h => {
                const v = Mi({
                        selected: t() === "dismiss"
                    }),
                    g = Mi({
                        selected: t() === "open"
                    });
                return v !== h._v$ && te(a, h._v$ = v), g !== h._v$2 && te(f, h._v$2 = g), h
            }, {
                _v$: void 0,
                _v$2: void 0
            }), l
        })()
    };
$e(["click"]);
const jp = j('<div class="realtive wh-full flex flex-col bg-terminal">'),
    Np = e => {
        const n = () => we.currentOpenApp.mainApp,
            t = () => we.currentOpenApp.mainApp === "terminal" ? we.currentOpenApp.terminalApp : void 0,
            o = (i, s) => {
                var l;
                me.Supervisor.switchFeed({
                    archivePlaylist: {
                        playlistId: i.playlistId,
                        metadata: {
                            date: gs(i.postDate, i.dropTime.hours, i.dropTime.minutes, i.dropTime.seconds)
                        }
                    },
                    source: s
                }), Ze.archive.setLastPlayed(i.postDate), (l = e.onPlaylistLoad) == null || l.call(e), we.closeApp()
            };
        return x(lr, {
            get isOpen() {
                return n() === "terminal"
            },
            get children() {
                return x(rp, {
                    src: [np, tp],
                    options: {
                        sprite: {
                            click: [0, 220.6122448979592],
                            "timecoder-error": [2e3, 283.3333333333332]
                        }
                    },
                    get children() {
                        const i = jp();
                        return C(i, x(bp, {}), null), C(i, x(rs, {
                            get fallback() {
                                return x(Lp, {
                                    setCurrentOpenApp: s => we.openApp(s)
                                })
                            },
                            get children() {
                                return [x(Bt, {
                                    get when() {
                                        return Ze.archive.hasNew()
                                    },
                                    get children() {
                                        return x(zp, {
                                            onLoadPlaylist: () => {
                                                const s = un()[0];
                                                s && (ne.trackClickEvent("notification", "open-playlist", "terminal-notification-screen", {
                                                    playlistId: s.playlistId
                                                }), o(s, "security-tape-archives"))
                                            }
                                        })
                                    }
                                }), x(Bt, {
                                    get when() {
                                        return t() === "home"
                                    },
                                    get children() {
                                        return x(Rr, {
                                            title: "Security System",
                                            onBack: () => we.closeApp(),
                                            get children() {
                                                return x(vp, {
                                                    setCurrentOpenApp: s => we.openApp(s)
                                                })
                                            }
                                        })
                                    }
                                }), x(Bt, {
                                    get when() {
                                        return t() === "security-tape-archives"
                                    },
                                    get children() {
                                        return x(Rr, {
                                            title: "Security Tape Archives",
                                            onBack: () => we.openApp("home"),
                                            get children() {
                                                return x(Dp, {
                                                    onLoadPlaylist: s => o(s, "security-tape-archives")
                                                })
                                            }
                                        })
                                    }
                                }), x(Bt, {
                                    get when() {
                                        return t() === "timecoder"
                                    },
                                    get children() {
                                        return x(Rr, {
                                            title: "Timecoder v2.1.0",
                                            onBack: () => we.openApp("home"),
                                            get children() {
                                                return x(Pp, {
                                                    onLoadPlaylist: s => o(s, "timecoder")
                                                })
                                            }
                                        })
                                    }
                                })]
                            }
                        }), null), C(i, x(mp, {}), null), i
                    }
                })
            }
        })
    },
    Hp = "/assets/cctv-room-ee8509df.mp3",
    Up = "/assets/cctv-room-1978b2ca.ogg";

function Fp(e) {
    const n = ye({}, e),
        t = ye({}, e),
        o = {},
        i = l => {
            let c = o[l];
            if (!c) {
                if (!Xn()) return n[l];
                o[l] = c = Y(n[l], {
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
        l in n && (n[l] = ii(c, [n[l]]))
    };
    return [t, (l, c) => {
        if (fc(l)) {
            const u = fe(() => Object.entries(ii(l, t)));
            sr(() => {
                for (const [d, p] of u) s(d, () => p)
            })
        } else s(l, c);
        return t
    }]
}
var na = {
    width: null,
    height: null
};

function Vr(e) {
    if (!e) return ye({}, na);
    const {
        width: n,
        height: t
    } = e.getBoundingClientRect();
    return {
        width: n,
        height: t
    }
}

function Gp(e) {
    const n = typeof e == "function",
        [t, o] = Fp(n ? na : Vr(e)),
        i = new ResizeObserver(([s]) => o(Vr(s.target)));
    return Ae(() => i.disconnect()), n ? _e(() => {
        const s = e();
        s && (o(Vr(s)), i.observe(s), Ae(() => i.unobserve(s)))
    }) : (i.observe(e), Ae(() => i.unobserve(e))), t
}
const Zp = e => {
        const [n, t] = Y({
            x: 0,
            y: 0
        }), [o, i] = Y(1), s = Gp(e.containerRef);
        return _e(() => {
            if (!e.containerRef() || s.width == null || s.height == null) return;
            const c = us(e.position) || {
                    x: 0,
                    y: 0
                },
                u = e.bgImageSize.width / e.bgImageSize.height,
                d = s.width / s.height;
            let p, r;
            e.fit === "cover" ? u <= d ? (p = s.width, r = s.width / u) : (p = s.height * u, r = s.height) : u <= d ? (p = s.height * u, r = s.height) : (p = s.width, r = s.width / u);
            const a = Math.round(p / e.bgImageSize.width * 1e3) / 1e3,
                f = (p - s.width) / 2,
                h = (r - s.height) / 2,
                v = p * c.x / e.bgImageSize.width - f,
                g = r * c.y / e.bgImageSize.height - h;
            t({
                x: v,
                y: g
            }), i(a)
        }), {
            position: n,
            scaleFactor: o
        }
    },
    Yp = j("<div><video muted playsinline>"),
    Wp = 7.1,
    qp = 7.7,
    Qp = e => {
        let n;
        const [t, o] = Y(void 0);
        return mn(async () => {
            if (!n) return;
            if (!Vt.options.muted) try {
                n.muted = !1, await n.play()
            } catch (u) {
                n.muted = !0, Vt.setMute(!0)
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
            }), await qr(600), await n.play(), o("done"), e.onLoaded();
            const l = () => {
                !n || n.currentTime < Wp || (e.onEnded(), n.removeEventListener("timeupdate", l))
            };
            n.addEventListener("timeupdate", l);
            const c = () => {
                n && (n.currentTime = qp, n.play())
            };
            n.addEventListener("ended", c)
        }), _e(Ra(me.Supervisor.allLoaded, i => {
            n && (i ? n.pause() : n.play())
        }, {
            defer: !0
        })), (() => {
            const i = Yp(),
                s = i.firstChild;
            s.addEventListener("error", c => {
                console.error("Error during transition video playback, skipping transition...", c), o("error"), e.onEnded()
            });
            const l = n;
            return typeof l == "function" ? Ee(l, s) : n = s, X(c => {
                const u = ce("wh-full", t() === "error" && "bg-black"),
                    d = fe(ho).transitionVideoSrc,
                    p = ce("wh-full object-contain"),
                    r = t() === "done" ? "visible" : "hidden";
                return u !== c._v$ && te(i, c._v$ = u), d !== c._v$2 && le(s, "src", c._v$2 = d), p !== c._v$3 && te(s, c._v$3 = p), r !== c._v$4 && ((c._v$4 = r) != null ? s.style.setProperty("visibility", r) : s.style.removeProperty("visibility")), c
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
var xt = [],
    Kp = function() {
        return xt.some(function(e) {
            return e.activeTargets.length > 0
        })
    },
    Jp = function() {
        return xt.some(function(e) {
            return e.skippedTargets.length > 0
        })
    },
    Bi = "ResizeObserver loop completed with undelivered notifications.",
    Xp = function() {
        var e;
        typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
            message: Bi
        }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = Bi), window.dispatchEvent(e)
    },
    hn;
(function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box"
})(hn || (hn = {}));
var St = function(e) {
        return Object.freeze(e)
    },
    ev = function() {
        function e(n, t) {
            this.inlineSize = n, this.blockSize = t, St(this)
        }
        return e
    }(),
    ra = function() {
        function e(n, t, o, i) {
            return this.x = n, this.y = t, this.width = o, this.height = i, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, St(this)
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
                d = n.height;
            return {
                x: t,
                y: o,
                top: i,
                right: s,
                bottom: l,
                left: c,
                width: u,
                height: d
            }
        }, e.fromRect = function(n) {
            return new e(n.x, n.y, n.width, n.height)
        }, e
    }(),
    _o = function(e) {
        return e instanceof SVGElement && "getBBox" in e
    },
    oa = function(e) {
        if (_o(e)) {
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
    Li = function(e) {
        var n;
        if (e instanceof Element) return !0;
        var t = (n = e == null ? void 0 : e.ownerDocument) === null || n === void 0 ? void 0 : n.defaultView;
        return !!(t && e instanceof t.Element)
    },
    tv = function(e) {
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
    an = typeof window < "u" ? window : {},
    Gn = new WeakMap,
    Ri = /auto|scroll/,
    nv = /^tb|vertical/,
    rv = /msie|trident/i.test(an.navigator && an.navigator.userAgent),
    Re = function(e) {
        return parseFloat(e || "0")
    },
    zt = function(e, n, t) {
        return e === void 0 && (e = 0), n === void 0 && (n = 0), t === void 0 && (t = !1), new ev((t ? n : e) || 0, (t ? e : n) || 0)
    },
    Vi = St({
        devicePixelContentBoxSize: zt(),
        borderBoxSize: zt(),
        contentBoxSize: zt(),
        contentRect: new ra(0, 0, 0, 0)
    }),
    ia = function(e, n) {
        if (n === void 0 && (n = !1), Gn.has(e) && !n) return Gn.get(e);
        if (oa(e)) return Gn.set(e, Vi), Vi;
        var t = getComputedStyle(e),
            o = _o(e) && e.ownerSVGElement && e.getBBox(),
            i = !rv && t.boxSizing === "border-box",
            s = nv.test(t.writingMode || ""),
            l = !o && Ri.test(t.overflowY || ""),
            c = !o && Ri.test(t.overflowX || ""),
            u = o ? 0 : Re(t.paddingTop),
            d = o ? 0 : Re(t.paddingRight),
            p = o ? 0 : Re(t.paddingBottom),
            r = o ? 0 : Re(t.paddingLeft),
            a = o ? 0 : Re(t.borderTopWidth),
            f = o ? 0 : Re(t.borderRightWidth),
            h = o ? 0 : Re(t.borderBottomWidth),
            v = o ? 0 : Re(t.borderLeftWidth),
            g = r + d,
            m = u + p,
            y = v + f,
            A = a + h,
            b = c ? e.offsetHeight - A - e.clientHeight : 0,
            $ = l ? e.offsetWidth - y - e.clientWidth : 0,
            N = i ? g + y : 0,
            U = i ? m + A : 0,
            L = o ? o.width : Re(t.width) - N - $,
            B = o ? o.height : Re(t.height) - U - b,
            z = L + g + $ + y,
            R = B + m + b + A,
            K = St({
                devicePixelContentBoxSize: zt(Math.round(L * devicePixelRatio), Math.round(B * devicePixelRatio), s),
                borderBoxSize: zt(z, R, s),
                contentBoxSize: zt(L, B, s),
                contentRect: new ra(r, u, L, B)
            });
        return Gn.set(e, K), K
    },
    sa = function(e, n, t) {
        var o = ia(e, t),
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
    ov = function() {
        function e(n) {
            var t = ia(n);
            this.target = n, this.contentRect = t.contentRect, this.borderBoxSize = St([t.borderBoxSize]), this.contentBoxSize = St([t.contentBoxSize]), this.devicePixelContentBoxSize = St([t.devicePixelContentBoxSize])
        }
        return e
    }(),
    aa = function(e) {
        if (oa(e)) return 1 / 0;
        for (var n = 0, t = e.parentNode; t;) n += 1, t = t.parentNode;
        return n
    },
    iv = function() {
        var e = 1 / 0,
            n = [];
        xt.forEach(function(l) {
            if (l.activeTargets.length !== 0) {
                var c = [];
                l.activeTargets.forEach(function(d) {
                    var p = new ov(d.target),
                        r = aa(d.target);
                    c.push(p), d.lastReportedSize = sa(d.target, d.observedBox), r < e && (e = r)
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
    zi = function(e) {
        xt.forEach(function(t) {
            t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function(i) {
                i.isActive() && (aa(i.target) > e ? t.activeTargets.push(i) : t.skippedTargets.push(i))
            })
        })
    },
    sv = function() {
        var e = 0;
        for (zi(e); Kp();) e = iv(), zi(e);
        return Jp() && Xp(), e > 0
    },
    zr, la = [],
    av = function() {
        return la.splice(0).forEach(function(e) {
            return e()
        })
    },
    lv = function(e) {
        if (!zr) {
            var n = 0,
                t = document.createTextNode(""),
                o = {
                    characterData: !0
                };
            new MutationObserver(function() {
                return av()
            }).observe(t, o), zr = function() {
                t.textContent = "".concat(n ? n-- : n++)
            }
        }
        la.push(e), zr()
    },
    cv = function(e) {
        lv(function() {
            requestAnimationFrame(e)
        })
    },
    Qn = 0,
    uv = function() {
        return !!Qn
    },
    fv = 250,
    dv = {
        attributes: !0,
        characterData: !0,
        childList: !0,
        subtree: !0
    },
    ji = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"],
    Ni = function(e) {
        return e === void 0 && (e = 0), Date.now() + e
    },
    jr = !1,
    pv = function() {
        function e() {
            var n = this;
            this.stopped = !0, this.listener = function() {
                return n.schedule()
            }
        }
        return e.prototype.run = function(n) {
            var t = this;
            if (n === void 0 && (n = fv), !jr) {
                jr = !0;
                var o = Ni(n);
                cv(function() {
                    var i = !1;
                    try {
                        i = sv()
                    } finally {
                        if (jr = !1, n = o - Ni(), !uv()) return;
                        i ? t.run(1e3) : n > 0 ? t.run(n) : t.start()
                    }
                })
            }
        }, e.prototype.schedule = function() {
            this.stop(), this.run()
        }, e.prototype.observe = function() {
            var n = this,
                t = function() {
                    return n.observer && n.observer.observe(document.body, dv)
                };
            document.body ? t() : an.addEventListener("DOMContentLoaded", t)
        }, e.prototype.start = function() {
            var n = this;
            this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), ji.forEach(function(t) {
                return an.addEventListener(t, n.listener, !0)
            }))
        }, e.prototype.stop = function() {
            var n = this;
            this.stopped || (this.observer && this.observer.disconnect(), ji.forEach(function(t) {
                return an.removeEventListener(t, n.listener, !0)
            }), this.stopped = !0)
        }, e
    }(),
    oo = new pv,
    Hi = function(e) {
        !Qn && e > 0 && oo.start(), Qn += e, !Qn && oo.stop()
    },
    vv = function(e) {
        return !_o(e) && !tv(e) && getComputedStyle(e).display === "inline"
    },
    hv = function() {
        function e(n, t) {
            this.target = n, this.observedBox = t || hn.CONTENT_BOX, this.lastReportedSize = {
                inlineSize: 0,
                blockSize: 0
            }
        }
        return e.prototype.isActive = function() {
            var n = sa(this.target, this.observedBox, !0);
            return vv(this.target) && (this.lastReportedSize = n), this.lastReportedSize.inlineSize !== n.inlineSize || this.lastReportedSize.blockSize !== n.blockSize
        }, e
    }(),
    mv = function() {
        function e(n, t) {
            this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = n, this.callback = t
        }
        return e
    }(),
    Zn = new WeakMap,
    Ui = function(e, n) {
        for (var t = 0; t < e.length; t += 1)
            if (e[t].target === n) return t;
        return -1
    },
    Yn = function() {
        function e() {}
        return e.connect = function(n, t) {
            var o = new mv(n, t);
            Zn.set(n, o)
        }, e.observe = function(n, t, o) {
            var i = Zn.get(n),
                s = i.observationTargets.length === 0;
            Ui(i.observationTargets, t) < 0 && (s && xt.push(i), i.observationTargets.push(new hv(t, o && o.box)), Hi(1), oo.schedule())
        }, e.unobserve = function(n, t) {
            var o = Zn.get(n),
                i = Ui(o.observationTargets, t),
                s = o.observationTargets.length === 1;
            i >= 0 && (s && xt.splice(xt.indexOf(o), 1), o.observationTargets.splice(i, 1), Hi(-1))
        }, e.disconnect = function(n) {
            var t = this,
                o = Zn.get(n);
            o.observationTargets.slice().forEach(function(i) {
                return t.unobserve(n, i.target)
            }), o.activeTargets.splice(0, o.activeTargets.length)
        }, e
    }(),
    gv = function() {
        function e(n) {
            if (arguments.length === 0) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
            if (typeof n != "function") throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
            Yn.connect(this, n)
        }
        return e.prototype.observe = function(n, t) {
            if (arguments.length === 0) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!Li(n)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
            Yn.observe(this, n, t)
        }, e.prototype.unobserve = function(n) {
            if (arguments.length === 0) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!Li(n)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
            Yn.unobserve(this, n)
        }, e.prototype.disconnect = function() {
            Yn.disconnect(this)
        }, e.toString = function() {
            return "function ResizeObserver () { [polyfill code] }"
        }, e
    }();
const _v = () => {
        "ResizeObserver" in window || (window.ResizeObserver = gv)
    },
    yv = {
        setup: _v
    },
    bv = j('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>No</span></button><button><span>Yes'),
    Fi = bn(["relative px-144 py-2", wn({
        size: "terminal-sm"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light border"
            }
        }
    }),
    wv = e => x(lr, {
        get isOpen() {
            return e.isOpen
        },
        get children() {
            return x(Av, {
                onExit: () => {
                    window.location.href = "brawlstars-inbox://closeView"
                },
                get onClose() {
                    return e.onClose
                }
            })
        }
    }),
    Av = e => {
        const [n, t] = Y();
        let o;
        const i = s => {
            t(s), clearTimeout(o), o = setTimeout(() => {
                s === "confirm" ? e.onExit() : e.onClose()
            }, 1e3)
        };
        return (() => {
            const s = bv(),
                l = s.firstChild,
                c = l.firstChild,
                u = c.nextSibling,
                d = u.firstChild,
                p = d.firstChild,
                r = p.firstChild,
                a = r.nextSibling;
            return C(c, x(ie, {
                size: "terminal-md",
                children: "STARR PARK SECURITY"
            })), C(d, x(ie, {
                size: "terminal-md",
                class: "text-purple",
                children: "Are you sure you want to exit?"
            }), p), r.$$click = () => i("cancel"), a.$$click = () => i("confirm"), X(f => {
                const h = Fi({
                        selected: n() === "cancel"
                    }),
                    v = Fi({
                        selected: n() === "confirm"
                    });
                return h !== f._v$ && te(r, f._v$ = h), v !== f._v$2 && te(a, f._v$2 = v), f
            }, {
                _v$: void 0,
                _v$2: void 0
            }), s
        })()
    };
$e(["click"]);
const xv = j('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>Exit</span></button><button><span>Continue'),
    Gi = bn(["relative px-96 py-2", wn({
        size: "terminal-sm"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light border"
            }
        }
    }),
    Sv = () => x(lr, {
        get isOpen() {
            return !Ze.dataUsageWarningDialog.accepted()
        },
        get children() {
            return x(Tv, {
                onExit: () => {
                    window.location.href = "brawlstars-inbox://closeView"
                },
                onClose: () => {
                    Ze.dataUsageWarningDialog.setAccepted()
                }
            })
        }
    }),
    Tv = e => {
        const [n, t] = Y();
        let o;
        const i = s => {
            t(s), clearTimeout(o), o = setTimeout(() => {
                s === "exit" ? e.onExit() : e.onClose()
            }, 1e3)
        };
        return (() => {
            const s = xv(),
                l = s.firstChild,
                c = l.firstChild,
                u = c.nextSibling,
                d = u.firstChild,
                p = d.firstChild,
                r = p.firstChild,
                a = r.nextSibling;
            return C(c, x(ie, {
                size: "terminal-md",
                children: "STARR PARK SECURITY"
            })), C(d, x(ie, {
                size: "terminal-sm",
                class: "text-purple whitespace-pre-wrap",
                get children() {
                    return ["This website features live video content, which can consume a significant amount of data.", "\n", "If you're using a limited data plan or have concerns about data usage, we recommend switching to a Wi-Fi network."]
                }
            }), p), r.$$click = () => i("exit"), a.$$click = () => i("continue"), X(f => {
                const h = Gi({
                        selected: n() === "exit"
                    }),
                    v = Gi({
                        selected: n() === "continue"
                    });
                return h !== f._v$ && te(r, f._v$ = h), v !== f._v$2 && te(a, f._v$2 = v), f
            }, {
                _v$: void 0,
                _v$2: void 0
            }), s
        })()
    };
$e(["click"]);
const kv = j('<button class="absolute top-20 left-20 w-100 h-100 flex-center">'),
    $v = j('<button class="absolute top-20 right-20 w-100 h-100 flex-center text-purple">'),
    Iv = j('<div class="wh-full"><div class="portrait:hidden absolute origin-top-left overflow-hidden"></div><div class="landscape:hidden portrait:flex wh-full flex-center"><div class="font-medium whitespace-nowrap">Portrait mode is not supported.'),
    Ov = j('<div class="absolute bottom-0 left-0 w-256">');
yv.setup();
const Nr = {
        width: 2250,
        height: 1170
    },
    Pv = () => {
        const [e, n] = Y(!1);
        let t;
        mn(() => {
            rt.init(), ne.init(), ne.setupActivityTracking(), ne.trackPageView()
        }), _e(() => {
            if (me.Supervisor.allEnded()) {
                const c = me.Supervisor.currentFeed(),
                    d = !!(c != null && c.archivePlaylist) && c.source;
                d && we.currentOpenApp.mainApp === null && we.openApp(d), me.Supervisor.dispatch("go-live")
            }
        });
        const [o, i] = Y(void 0), s = Zp({
            containerRef: o,
            bgImageSize: Nr,
            fit: "contain"
        }), l = st([Up, Hp], {
            sprite: {
                "archive-tape-load": [0, 3016.6666666666665],
                "logbook-close": [5e3, 382.6530612244898],
                "logbook-open": [7e3, 1133.3333333333328],
                "screen-tap-1": [1e4, 133.33333333333286],
                "screen-tap-2": [12e3, 133.33333333333286],
                "screen-tap-3": [14e3, 133.33333333333286],
                "terminal-open": [16e3, 3751.6326530612255]
            }
        });
        return [(() => {
            const c = Iv(),
                u = c.firstChild;
            return Ee(i, c), C(u, x(Qp, {
                onLoaded: () => rt.onVideoTransitionLoaded(),
                onEnded: () => rt.onVideoTransitionEnd()
            }), null), C(u, x(ze, {
                get when() {
                    return rt.currentStatus() >= Ut["video-transition"]
                },
                get children() {
                    return x(Yd, {
                        roomSound: l
                    })
                }
            }), null), C(u, x(ze, {
                get when() {
                    return rt.currentStatus() === Ut.done
                },
                get children() {
                    return [(() => {
                        const d = kv();
                        return d.$$click = () => n(!0), C(d, x(ie, {
                            size: "terminal-lg",
                            class: "text-green leading-none inline-block pb-16",
                            children: "х"
                        })), d
                    })(), (() => {
                        const d = $v();
                        return d.$$click = () => {
                            ne.trackClickEvent("instructions-modal", Vt.options.muted ? "sound-on" : "sound-off", "cctv-room"), Vt.toggleMute()
                        }, C(d, x(gt, {
                            get name() {
                                return Vt.options.muted ? "mute" : "unmute"
                            },
                            class: "w-72"
                        })), d
                    })(), x(Np, {
                        onPlaylistLoad: () => l.play("archive-tape-load")
                    }), x(ep, {
                        onClose: () => l.play("logbook-close")
                    }), x(Sv, {})]
                }
            }), null), C(u, x(wv, {
                get isOpen() {
                    return e()
                },
                onClose: () => n(!1)
            }), null), X(d => {
                const p = "".concat(Nr.height, "px"),
                    r = "".concat(Nr.width, "px"),
                    a = "translate(".concat(s.position().x, "px, ").concat(s.position().y, "px) scale(").concat(s.scaleFactor(), ")");
                return p !== d._v$ && ((d._v$ = p) != null ? u.style.setProperty("height", p) : u.style.removeProperty("height")), r !== d._v$2 && ((d._v$2 = r) != null ? u.style.setProperty("width", r) : u.style.removeProperty("width")), a !== d._v$3 && ((d._v$3 = a) != null ? u.style.setProperty("transform", a) : u.style.removeProperty("transform")), d
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }), c
        })(), (() => {
            const c = Ov(),
                u = t;
            return typeof u == "function" ? Ee(u, c) : t = c, c
        })()]
    };
$e(["click"]);
il(() => x(Pv, {}), document.getElementById("root"));
export {
    _n as a, Ue as c, Cv as g
};