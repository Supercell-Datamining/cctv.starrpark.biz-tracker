var Ea = Object.defineProperty,
    Ca = Object.defineProperties;
var Da = Object.getOwnPropertyDescriptors;
var Rn = Object.getOwnPropertySymbols;
var Gi = Object.prototype.hasOwnProperty,
    Zi = Object.prototype.propertyIsEnumerable;
var Ar = (e, n, t) => n in e ? Ea(e, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[n] = t,
    ye = (e, n) => {
        for (var t in n || (n = {})) Gi.call(n, t) && Ar(e, t, n[t]);
        if (Rn)
            for (var t of Rn(n)) Zi.call(n, t) && Ar(e, t, n[t]);
        return e
    },
    ht = (e, n) => Ca(e, Da(n));
var Yi = (e, n) => {
    var t = {};
    for (var i in e) Gi.call(e, i) && n.indexOf(i) < 0 && (t[i] = e[i]);
    if (e != null && Rn)
        for (var i of Rn(e)) n.indexOf(i) < 0 && Zi.call(e, i) && (t[i] = e[i]);
    return t
};
var Wi = (e, n, t) => (Ar(e, typeof n != "symbol" ? n + "" : n, t), t);
(function() {
    const n = document.createElement("link").relList;
    if (n && n.supports && n.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) i(o);
    new MutationObserver(o => {
        for (const s of o)
            if (s.type === "childList")
                for (const l of s.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && i(l)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function t(o) {
        const s = {};
        return o.integrity && (s.integrity = o.integrity), o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? s.credentials = "include" : o.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s
    }

    function i(o) {
        if (o.ep) return;
        o.ep = !0;
        const s = t(o);
        fetch(o.href, s)
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
let Zo = Jo;
const ut = 1,
    Jn = 2,
    Yo = {
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
    or = 0;

function Wn(e, n) {
    const t = ae,
        i = ee,
        o = e.length === 0,
        s = n === void 0 ? i : n,
        l = o ? Yo : {
            owned: null,
            cleanups: null,
            context: s ? s.context : null,
            owner: s
        },
        c = o ? e : () => e(() => fe(() => ar(l)));
    ee = l, ae = null;
    try {
        return Ft(c, !0)
    } finally {
        ae = t, ee = i
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
        i = o => (typeof o == "function" && (o = o(t.value)), Ko(t, o));
    return [Qo.bind(t), i]
}

function X(e, n, t) {
    const i = oi(e, n, !1, ut);
    gn(i)
}

function _e(e, n, t) {
    Zo = ja;
    const i = oi(e, n, !1, ut),
        o = qi && Wo(qi);
    o && (i.suspense = o), (!t || !t.render) && (i.user = !0), Ge ? Ge.push(i) : gn(i)
}

function ke(e, n, t) {
    t = t ? Object.assign({}, Kn, t) : Kn;
    const i = oi(e, n, !0, 0);
    return i.observers = null, i.observerSlots = null, i.comparator = t.equals || void 0, gn(i), Qo.bind(i)
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
    const i = Array.isArray(e);
    let o, s = t && t.defer;
    return l => {
        let c;
        if (i) {
            c = Array(e.length);
            for (let d = 0; d < e.length; d++) c[d] = e[d]()
        } else c = e();
        if (s) {
            s = !1;
            return
        }
        const u = fe(() => n(c, o, l));
        return o = c, u
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

function Wo(e) {
    return ee && ee.context && ee.context[e.id] !== void 0 ? ee.context[e.id] : e.defaultValue
}

function qo(e) {
    const n = ke(e),
        t = ke(() => Ur(n()));
    return t.toArray = () => {
        const i = t();
        return Array.isArray(i) ? i : i != null ? [i] : []
    }, t
}
let qi;

function Qo() {
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

function Ko(e, n, t) {
    let i = e.value;
    return (!e.comparator || !e.comparator(i, n)) && (e.value = n, e.observers && e.observers.length && Ft(() => {
        for (let o = 0; o < e.observers.length; o += 1) {
            const s = e.observers[o],
                l = xr && xr.running;
            l && xr.disposed.has(s), (l ? !s.tState : !s.state) && (s.pure ? ge.push(s) : Ge.push(s), s.observers && Xo(s)), l || (s.state = ut)
        }
        if (ge.length > 1e6) throw ge = [], new Error
    }, !1)), n
}

function gn(e) {
    if (!e.fn) return;
    ar(e);
    const n = ee,
        t = ae,
        i = or;
    ae = ee = e, za(e, e.value, i), ae = t, ee = n
}

function za(e, n, t) {
    let i;
    try {
        i = e.fn(n)
    } catch (o) {
        return e.pure && (e.state = ut, e.owned && e.owned.forEach(ar), e.owned = null), e.updatedAt = t + 1, es(o)
    }(!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? Ko(e, i) : e.value = i, e.updatedAt = t)
}

function oi(e, n, t, i = ut, o) {
    const s = {
        fn: e,
        state: i,
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
    return ee === null || ee !== Yo && (ee.owned ? ee.owned.push(s) : ee.owned = [s]), s
}

function er(e) {
    if (e.state === 0) return;
    if (e.state === Jn) return tr(e);
    if (e.suspense && fe(e.suspense.inFallback)) return e.suspense.effects.push(e);
    const n = [e];
    for (;
        (e = e.owner) && (!e.updatedAt || e.updatedAt < or);) e.state && n.push(e);
    for (let t = n.length - 1; t >= 0; t--)
        if (e = n[t], e.state === ut) gn(e);
        else if (e.state === Jn) {
        const i = ge;
        ge = null, Ft(() => tr(e, n[0]), !1), ge = i
    }
}

function Ft(e, n) {
    if (ge) return e();
    let t = !1;
    n || (ge = []), Ge ? t = !0 : Ge = [], or++;
    try {
        const i = e();
        return Na(t), i
    } catch (i) {
        t || (Ge = null), ge = null, es(i)
    }
}

function Na(e) {
    if (ge && (Jo(ge), ge = null), e) return;
    const n = Ge;
    Ge = null, n.length && Ft(() => Zo(n), !1)
}

function Jo(e) {
    for (let n = 0; n < e.length; n++) er(e[n])
}

function ja(e) {
    let n, t = 0;
    for (n = 0; n < e.length; n++) {
        const i = e[n];
        i.user ? e[t++] = i : er(i)
    }
    for (n = 0; n < t; n++) er(e[n])
}

function tr(e, n) {
    e.state = 0;
    for (let t = 0; t < e.sources.length; t += 1) {
        const i = e.sources[t];
        if (i.sources) {
            const o = i.state;
            o === ut ? i !== n && (!i.updatedAt || i.updatedAt < or) && er(i) : o === Jn && tr(i, n)
        }
    }
}

function Xo(e) {
    for (let n = 0; n < e.observers.length; n += 1) {
        const t = e.observers[n];
        t.state || (t.state = Jn, t.pure ? ge.push(t) : Ge.push(t), t.observers && Xo(t))
    }
}

function ar(e) {
    let n;
    if (e.sources)
        for (; e.sources.length;) {
            const t = e.sources.pop(),
                i = e.sourceSlots.pop(),
                o = t.observers;
            if (o && o.length) {
                const s = o.pop(),
                    l = t.observerSlots.pop();
                i < o.length && (s.sourceSlots[l] = i, o[i] = s, t.observerSlots[i] = l)
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
            const i = Ur(e[t]);
            Array.isArray(i) ? n.push.apply(n, i) : n.push(i)
        }
        return n
    }
    return e
}

function Ua(e, n) {
    return function(i) {
        let o;
        return X(() => o = fe(() => (ee.context = ht(ye({}, ee.context), {
            [e]: i.value
        }), qo(() => i.children))), void 0), o
    }
}
const Fa = Symbol("fallback");

function Qi(e) {
    for (let n = 0; n < e.length; n++) e[n]()
}

function Ga(e, n, t = {}) {
    let i = [],
        o = [],
        s = [],
        l = 0,
        c = n.length > 1 ? [] : null;
    return Ae(() => Qi(s)), () => {
        let u = e() || [],
            d, p;
        return u[Hr], fe(() => {
            let a = u.length,
                f, h, v, g, m, y, A, b, $;
            if (a === 0) l !== 0 && (Qi(s), s = [], i = [], o = [], l = 0, c && (c = [])), t.fallback && (i = [Fa], o[0] = Wn(j => (s[0] = j, t.fallback())), l = 1);
            else if (l === 0) {
                for (o = new Array(a), p = 0; p < a; p++) i[p] = u[p], o[p] = Wn(r);
                l = a
            } else {
                for (v = new Array(a), g = new Array(a), c && (m = new Array(a)), y = 0, A = Math.min(l, a); y < A && i[y] === u[y]; y++);
                for (A = l - 1, b = a - 1; A >= y && b >= y && i[A] === u[b]; A--, b--) v[b] = o[A], g[b] = s[A], c && (m[b] = c[A]);
                for (f = new Map, h = new Array(b + 1), p = b; p >= y; p--) $ = u[p], d = f.get($), h[p] = d === void 0 ? -1 : d, f.set($, p);
                for (d = y; d <= A; d++) $ = i[d], p = f.get($), p !== void 0 && p !== -1 ? (v[p] = o[d], g[p] = s[d], c && (m[p] = c[d]), p = h[p], f.set($, p)) : s[d]();
                for (p = y; p < a; p++) p in v ? (o[p] = v[p], s[p] = g[p], c && (c[p] = m[p], c[p](p))) : o[p] = Wn(r);
                o = o.slice(0, l = a), i = u.slice(0)
            }
            return o
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
        i = {},
        o = new Set;
    for (let s = e.length - 1; s >= 0; s--) {
        const l = e[s];
        if (!l) continue;
        const c = Object.getOwnPropertyNames(l);
        for (let u = 0, d = c.length; u < d; u++) {
            const p = c[u];
            if (p === "__proto__" || p === "constructor") continue;
            const r = Object.getOwnPropertyDescriptor(l, p);
            if (!o.has(p)) r.get ? (o.add(p), Object.defineProperty(t, p, {
                enumerable: !0,
                configurable: !0,
                get: Za.bind(i[p] = [r.get.bind(l)])
            })) : (r.value !== void 0 && o.add(p), t[p] = r.value);
            else {
                const a = i[p];
                a ? r.get ? a.push(r.get.bind(l)) : r.value !== void 0 && a.push(() => r.value) : t[p] === void 0 && (t[p] = r.value)
            }
        }
    }
    return t
}

function si(e, ...n) {
    if (Be in e) {
        const o = new Set(n.length > 1 ? n.flat() : n[0]),
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
                return o.has(l) ? void 0 : e[l]
            },
            has(l) {
                return o.has(l) ? !1 : l in e
            },
            keys() {
                return Object.keys(e).filter(l => !o.has(l))
            }
        }, Fr)), s
    }
    const t = {},
        i = n.map(() => ({}));
    for (const o of Object.getOwnPropertyNames(e)) {
        const s = Object.getOwnPropertyDescriptor(e, o),
            l = !s.get && !s.set && s.enumerable && s.writable && s.configurable;
        let c = !1,
            u = 0;
        for (const d of n) d.includes(o) && (c = !0, l ? i[u][o] = s.value : Object.defineProperty(i[u], o, s)), ++u;
        c || (l ? t[o] = s.value : Object.defineProperty(t, o, s))
    }
    return [...i, t]
}
let Wa = 0;

function ts() {
    const e = Ma.context;
    return e ? "".concat(e.id).concat(e.count++) : "cl-".concat(Wa++)
}
const ns = e => "Stale read from <".concat(e, ">.");

function ai(e) {
    const n = "fallback" in e && {
        fallback: () => e.fallback
    };
    return ke(Ga(() => e.each, e.children, n || void 0))
}

function ze(e) {
    const n = e.keyed,
        t = ke(() => e.when, void 0, {
            equals: (i, o) => n ? i === o : !i == !o
        });
    return ke(() => {
        const i = t();
        if (i) {
            const o = e.children;
            return typeof o == "function" && o.length > 0 ? fe(() => o(n ? i : () => {
                if (!fe(t)) throw ns("Show");
                return e.when
            })) : o
        }
        return e.fallback
    }, void 0, void 0)
}

function rs(e) {
    let n = !1;
    const t = (s, l) => s[0] === l[0] && (n ? s[1] === l[1] : !s[1] == !l[1]) && s[2] === l[2],
        i = qo(() => e.children),
        o = ke(() => {
            let s = i();
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
        const [s, l, c] = o();
        if (s < 0) return e.fallback;
        const u = c.children;
        return typeof u == "function" && u.length > 0 ? fe(() => u(n ? l : () => {
            if (fe(o)[0] !== s) throw ns("Match");
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

function il(e, n, t) {
    let i = t.length,
        o = n.length,
        s = i,
        l = 0,
        c = 0,
        u = n[o - 1].nextSibling,
        d = null;
    for (; l < o || c < s;) {
        if (n[l] === t[c]) {
            l++, c++;
            continue
        }
        for (; n[o - 1] === t[s - 1];) o--, s--;
        if (o === l) {
            const p = s < i ? c ? t[c - 1].nextSibling : t[s - c] : u;
            for (; c < s;) e.insertBefore(t[c++], p)
        } else if (s === c)
            for (; l < o;)(!d || !d.has(n[l])) && n[l].remove(), l++;
        else if (n[l] === t[s - 1] && t[c] === n[o - 1]) {
            const p = n[--o].nextSibling;
            e.insertBefore(t[c++], n[l++].nextSibling), e.insertBefore(t[--s], p), n[o] = t[s]
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
                    for (; ++r < o && r < s && !((f = d.get(n[r])) == null || f !== p + a);) a++;
                    if (a > p - c) {
                        const h = n[l];
                        for (; c < p;) e.insertBefore(t[c++], h)
                    } else e.replaceChild(t[c++], n[l++])
                } else l++;
            else n[l++].remove()
        }
    }
}
const Ki = "_$DX_DELEGATE";

function ol(e, n, t, i = {}) {
    let o;
    return Wn(s => {
        o = s, n === document ? e() : C(n, e(), n.firstChild ? null : void 0, t)
    }, i.owner), () => {
        o(), n.textContent = ""
    }
}

function N(e, n, t) {
    let i;
    const o = () => {
            const l = document.createElement("template");
            return l.innerHTML = e, t ? l.content.firstChild.firstChild : l.content.firstChild
        },
        s = n ? () => fe(() => document.importNode(i || (i = o()), !0)) : () => (i || (i = o())).cloneNode(!0);
    return s.cloneNode = s, s
}

function $e(e, n = window.document) {
    const t = n[Ki] || (n[Ki] = new Set);
    for (let i = 0, o = e.length; i < o; i++) {
        const s = e[i];
        t.has(s) || (t.add(s), n.addEventListener(s, dl))
    }
}

function le(e, n, t) {
    t == null ? e.removeAttribute(n) : e.setAttribute(n, t)
}

function sl(e, n, t, i) {
    i == null ? e.removeAttributeNS(n, t) : e.setAttributeNS(n, t, i)
}

function te(e, n) {
    n == null ? e.removeAttribute("class") : e.className = n
}

function al(e, n, t, i) {
    if (i) Array.isArray(t) ? (e["$$".concat(n)] = t[0], e["$$".concat(n, "Data")] = t[1]) : e["$$".concat(n)] = t;
    else if (Array.isArray(t)) {
        const o = t[0];
        e.addEventListener(n, t[0] = s => o.call(e, t[1], s))
    } else e.addEventListener(n, t)
}

function ll(e, n, t = {}) {
    const i = Object.keys(n || {}),
        o = Object.keys(t);
    let s, l;
    for (s = 0, l = o.length; s < l; s++) {
        const c = o[s];
        !c || c === "undefined" || n[c] || (Ji(e, c, !1), delete t[c])
    }
    for (s = 0, l = i.length; s < l; s++) {
        const c = i[s],
            u = !!n[c];
        !c || c === "undefined" || t[c] === u || !u || (Ji(e, c, !0), t[c] = u)
    }
    return t
}

function cl(e, n, t) {
    if (!n) return t ? le(e, "style") : n;
    const i = e.style;
    if (typeof n == "string") return i.cssText = n;
    typeof t == "string" && (i.cssText = t = void 0), t || (t = {}), n || (n = {});
    let o, s;
    for (s in t) n[s] == null && i.removeProperty(s), delete t[s];
    for (s in n) o = n[s], o !== t[s] && (i.setProperty(s, o), t[s] = o);
    return t
}

function Ye(e, n = {}, t, i) {
    const o = {};
    return i || X(() => o.children = Nt(e, n.children, o.children)), X(() => n.ref && n.ref(e)), X(() => ul(e, n, t, !0, o, !0)), o
}

function Ee(e, n, t) {
    return fe(() => e(n, t))
}

function C(e, n, t, i) {
    if (t !== void 0 && !i && (i = []), typeof n != "function") return Nt(e, n, i, t);
    X(o => Nt(e, n(), o, t), i)
}

function ul(e, n, t, i, o = {}, s = !1) {
    n || (n = {});
    for (const l in o)
        if (!(l in n)) {
            if (l === "children") continue;
            o[l] = Xi(e, l, null, o[l], t, s)
        } for (const l in n) {
        if (l === "children") {
            i || Nt(e, n.children);
            continue
        }
        const c = n[l];
        o[l] = Xi(e, l, c, o[l], t, s)
    }
}

function fl(e) {
    return e.toLowerCase().replace(/-([a-z])/g, (n, t) => t.toUpperCase())
}

function Ji(e, n, t) {
    const i = n.trim().split(/\s+/);
    for (let o = 0, s = i.length; o < s; o++) e.classList.toggle(i[o], t)
}

function Xi(e, n, t, i, o, s) {
    let l, c, u, d, p;
    if (n === "style") return cl(e, t, i);
    if (n === "classList") return ll(e, t, i);
    if (t === i) return i;
    if (n === "ref") s || t(e);
    else if (n.slice(0, 3) === "on:") {
        const r = n.slice(3);
        i && e.removeEventListener(r, i), t && e.addEventListener(r, t)
    } else if (n.slice(0, 10) === "oncapture:") {
        const r = n.slice(10);
        i && e.removeEventListener(r, i, !0), t && e.addEventListener(r, t, !0)
    } else if (n.slice(0, 2) === "on") {
        const r = n.slice(2).toLowerCase(),
            a = tl.has(r);
        if (!a && i) {
            const f = Array.isArray(i) ? i[0] : i;
            e.removeEventListener(r, f)
        }(a || t) && (al(e, r, t, a), a && $e([r]))
    } else if (n.slice(0, 5) === "attr:") le(e, n.slice(5), t);
    else if ((p = n.slice(0, 5) === "prop:") || (u = Ka.has(n)) || !o && ((d = el(n, e.tagName)) || (c = Qa.has(n))) || (l = e.nodeName.includes("-"))) p && (n = n.slice(5), c = !0), n === "class" || n === "className" ? te(e, t) : l && !c && !u ? e[fl(n)] = t : e[d || n] = t;
    else {
        const r = o && n.indexOf(":") > -1 && rl[n.split(":")[0]];
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
        const i = t[n];
        if (i && !t.disabled) {
            const o = t["".concat(n, "Data")];
            if (o !== void 0 ? i.call(t, o, e) : i.call(t, e), e.cancelBubble) return
        }
        t = t._$host || t.parentNode || t.host
    }
}

function Nt(e, n, t, i, o) {
    for (; typeof t == "function";) t = t();
    if (n === t) return t;
    const s = typeof n,
        l = i !== void 0;
    if (e = l && t[0] && t[0].parentNode || e, s === "string" || s === "number")
        if (s === "number" && (n = n.toString()), l) {
            let c = t[0];
            c && c.nodeType === 3 ? c.data = n : c = document.createTextNode(n), t = Ct(e, t, i, c)
        } else t !== "" && typeof t == "string" ? t = e.firstChild.data = n : t = e.textContent = n;
    else if (n == null || s === "boolean") t = Ct(e, t, i);
    else {
        if (s === "function") return X(() => {
            let c = n();
            for (; typeof c == "function";) c = c();
            t = Nt(e, c, t, i)
        }), () => t;
        if (Array.isArray(n)) {
            const c = [],
                u = t && Array.isArray(t);
            if (Gr(c, n, t, o)) return X(() => t = Nt(e, c, t, i, !0)), () => t;
            if (c.length === 0) {
                if (t = Ct(e, t, i), l) return t
            } else u ? t.length === 0 ? eo(e, c, i) : il(e, t, c) : (t && Ct(e), eo(e, c));
            t = c
        } else if (n.nodeType) {
            if (Array.isArray(t)) {
                if (l) return t = Ct(e, t, i, n);
                Ct(e, t, null, n)
            } else t == null || t === "" || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
            t = n
        } else console.warn("Unrecognized value. Skipped inserting", n)
    }
    return t
}

function Gr(e, n, t, i) {
    let o = !1;
    for (let s = 0, l = n.length; s < l; s++) {
        let c = n[s],
            u = t && t[s],
            d;
        if (!(c == null || c === !0 || c === !1))
            if ((d = typeof c) == "object" && c.nodeType) e.push(c);
            else if (Array.isArray(c)) o = Gr(e, c, u) || o;
        else if (d === "function")
            if (i) {
                for (; typeof c == "function";) c = c();
                o = Gr(e, Array.isArray(c) ? c : [c], Array.isArray(u) ? u : [u]) || o
            } else e.push(c), o = !0;
        else {
            const p = String(c);
            u && u.nodeType === 3 && u.data === p ? e.push(u) : e.push(document.createTextNode(p))
        }
    }
    return o
}

function eo(e, n, t = null) {
    for (let i = 0, o = n.length; i < o; i++) e.insertBefore(n[i], t)
}

function Ct(e, n, t, i) {
    if (t === void 0) return e.textContent = "";
    const o = i || document.createTextNode("");
    if (n.length) {
        let s = !1;
        for (let l = n.length - 1; l >= 0; l--) {
            const c = n[l];
            if (o !== c) {
                const u = c.parentNode === e;
                !s && !l ? u ? e.replaceChild(o, c) : e.insertBefore(o, t) : u && c.remove()
            } else s = !0
        }
    } else e.insertBefore(o, t);
    return [o]
}
const pl = "http://www.w3.org/2000/svg";

function vl(e, n = !1) {
    return n ? document.createElementNS(pl, e) : document.createElement(e)
}

function is(e) {
    const [n, t] = si(e, ["component"]), i = ke(() => n.component);
    return ke(() => {
        const o = i();
        switch (typeof o) {
            case "function":
                return Object.assign(o, {
                    [La]: !0
                }), fe(() => o(t));
            case "string":
                const s = nl.has(o),
                    l = vl(o, s);
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
    os = Symbol("store-self");

function ss(e) {
    let n = e[Be];
    if (!n && (Object.defineProperty(e, Be, {
            value: n = new Proxy(e, gl)
        }), !Array.isArray(e))) {
        const t = Object.keys(e),
            i = Object.getOwnPropertyDescriptors(e);
        for (let o = 0, s = t.length; o < s; o++) {
            const l = t[o];
            i[l].get && Object.defineProperty(e, l, {
                enumerable: i[l].enumerable,
                get: i[l].get.bind(n)
            })
        }
    }
    return n
}

function at(e) {
    let n;
    return e != null && typeof e == "object" && (e[Be] || !(n = Object.getPrototypeOf(e)) || n === Object.prototype || Array.isArray(e))
}

function jt(e, n = new Set) {
    let t, i, o, s;
    if (t = e != null && e[Zr]) return t;
    if (!at(e) || n.has(e)) return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : n.add(e);
        for (let l = 0, c = e.length; l < c; l++) o = e[l], (i = jt(o, n)) !== o && (e[l] = i)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : n.add(e);
        const l = Object.keys(e),
            c = Object.getOwnPropertyDescriptors(e);
        for (let u = 0, d = l.length; u < d; u++) s = l[u], !c[s].get && (o = e[s], (i = jt(o, n)) !== o && (e[s] = i))
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
    const [i, o] = Y(t, {
        equals: !1,
        internal: !0
    });
    return i.$ = o, e[n] = i
}

function hl(e, n) {
    const t = Reflect.getOwnPropertyDescriptor(e, n);
    return !t || t.get || !t.configurable || n === Be || n === Rt || (delete t.value, delete t.writable, t.get = () => e[Be][n]), t
}

function as(e) {
    Xn() && ln(nr(e, Rt), os)()
}

function ml(e) {
    return as(e), Reflect.ownKeys(e)
}
const gl = {
    get(e, n, t) {
        if (n === Zr) return e;
        if (n === Be) return t;
        if (n === Hr) return as(e), t;
        const i = nr(e, Rt),
            o = i[n];
        let s = o ? o() : e[n];
        if (n === Rt || n === He || n === "__proto__") return s;
        if (!o) {
            const l = Object.getOwnPropertyDescriptor(e, n);
            Xn() && (typeof s != "function" || e.hasOwnProperty(n)) && !(l && l.get) && (s = ln(i, n, s)())
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

function Oe(e, n, t, i = !1) {
    if (!i && e[n] === t) return;
    const o = e[n],
        s = e.length;
    t === void 0 ? (delete e[n], e[He] && e[He][n] && o !== void 0 && e[He][n].$()) : (e[n] = t, e[He] && e[He][n] && o === void 0 && e[He][n].$());
    let l = nr(e, Rt),
        c;
    if ((c = ln(l, n, o)) && c.$(() => t), Array.isArray(e) && e.length !== s) {
        for (let u = e.length; u < s; u++)(c = l[u]) && c.$();
        (c = ln(l, "length", s)) && c.$(e.length)
    }(c = l[os]) && c.$()
}

function ls(e, n) {
    const t = Object.keys(n);
    for (let i = 0; i < t.length; i += 1) {
        const o = t[i];
        Oe(e, o, n[o])
    }
}

function _l(e, n) {
    if (typeof n == "function" && (n = n(e)), n = jt(n), Array.isArray(n)) {
        if (e === n) return;
        let t = 0,
            i = n.length;
        for (; t < i; t++) {
            const o = n[t];
            e[t] !== o && Oe(e, t, o)
        }
        Oe(e, "length", i)
    } else ls(e, n)
}

function rn(e, n, t = []) {
    let i, o = e;
    if (n.length > 1) {
        i = n.shift();
        const l = typeof i,
            c = Array.isArray(e);
        if (Array.isArray(i)) {
            for (let u = 0; u < i.length; u++) rn(e, [i[u]].concat(n), t);
            return
        } else if (c && l === "function") {
            for (let u = 0; u < e.length; u++) i(e[u], u) && rn(e, [u].concat(n), t);
            return
        } else if (c && l === "object") {
            const {
                from: u = 0,
                to: d = e.length - 1,
                by: p = 1
            } = i;
            for (let r = u; r <= d; r += p) rn(e, [r].concat(n), t);
            return
        } else if (n.length > 1) {
            rn(e[i], n, [i].concat(t));
            return
        }
        o = e[i], t = [i].concat(t)
    }
    let s = n[0];
    typeof s == "function" && (s = s(o, t), s === o) || i === void 0 && s == null || (s = jt(s), i === void 0 || at(o) && at(s) && !Array.isArray(s) ? ls(o, s) : Oe(e, i, s))
}

function Gt(...[e, n]) {
    const t = jt(e || {}),
        i = Array.isArray(t),
        o = ss(t);

    function s(...l) {
        sr(() => {
            i && l.length === 1 ? _l(t, l[0]) : rn(t, l)
        })
    }
    return [o, s]
}
const Yr = Symbol("store-root");

function Mt(e, n, t, i, o) {
    const s = n[t];
    if (e === s) return;
    if (t !== Yr && (!at(e) || !at(s) || o && e[o] !== s[o])) {
        Oe(n, t, e);
        return
    }
    if (Array.isArray(e)) {
        if (e.length && s.length && (!i || o && e[0] && e[0][o] != null)) {
            let u, d, p, r, a, f, h, v;
            for (p = 0, r = Math.min(s.length, e.length); p < r && (s[p] === e[p] || o && s[p] && e[p] && s[p][o] === e[p][o]); p++) Mt(e[p], s, p, i, o);
            const g = new Array(e.length),
                m = new Map;
            for (r = s.length - 1, a = e.length - 1; r >= p && a >= p && (s[r] === e[a] || o && s[p] && e[p] && s[r][o] === e[a][o]); r--, a--) g[a] = s[r];
            if (p > a || p > r) {
                for (d = p; d <= a; d++) Oe(s, d, e[d]);
                for (; d < e.length; d++) Oe(s, d, g[d]), Mt(e[d], s, d, i, o);
                s.length > e.length && Oe(s, "length", e.length);
                return
            }
            for (h = new Array(a + 1), d = a; d >= p; d--) f = e[d], v = o && f ? f[o] : f, u = m.get(v), h[d] = u === void 0 ? -1 : u, m.set(v, d);
            for (u = p; u <= r; u++) f = s[u], v = o && f ? f[o] : f, d = m.get(v), d !== void 0 && d !== -1 && (g[d] = s[u], d = h[d], m.set(v, d));
            for (d = p; d < e.length; d++) d in g ? (Oe(s, d, g[d]), Mt(e[d], s, d, i, o)) : Oe(s, d, e[d])
        } else
            for (let u = 0, d = e.length; u < d; u++) Mt(e[u], s, u, i, o);
        s.length > e.length && Oe(s, "length", e.length);
        return
    }
    const l = Object.keys(e);
    for (let u = 0, d = l.length; u < d; u++) Mt(e[l[u]], s, l[u], i, o);
    const c = Object.keys(s);
    for (let u = 0, d = c.length; u < d; u++) e[c[u]] === void 0 && Oe(s, c[u], void 0)
}

function yl(e, n = {}) {
    const {
        merge: t,
        key: i = "id"
    } = n, o = jt(e);
    return s => {
        if (!at(s) || !at(o)) return o;
        const l = Mt(o, {
            [Yr]: s
        }, Yr, t, i);
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

function Pv(e) {
    if (e.__esModule) return e;
    var n = e.default;
    if (typeof n == "function") {
        var t = function i() {
            return this instanceof i ? Reflect.construct(n, arguments, this.constructor) : n.apply(this, arguments)
        };
        t.prototype = n.prototype
    } else t = {};
    return Object.defineProperty(t, "__esModule", {
        value: !0
    }), Object.keys(e).forEach(function(i) {
        var o = Object.getOwnPropertyDescriptor(e, i);
        Object.defineProperty(t, i, o.get ? o : {
            enumerable: !0,
            get: function() {
                return e[i]
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
            i = function(r) {
                var a = this;
                if (!r.src || r.src.length === 0) {
                    console.error("An array of source files must be passed with any new Howl.");
                    return
                }
                a.init(r)
            };
        i.prototype = {
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
                return r._src = a, r._state = "loading", window.location.protocol === "https:" && a.slice(0, 5) === "http:" && (r._html5 = !0, r._webAudio = !1), new o(r), r._webAudio && l(r), r
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
                    j = f._sprite[r][0] / 1e3,
                    U = (f._sprite[r][0] + f._sprite[r][1]) / 1e3;
                m._sprite = r, m._ended = !1;
                var L = function() {
                    m._paused = !1, m._seek = A, m._start = j, m._stop = U, m._loop = !!(m._loop || f._sprite[r][2])
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
                    j = Date.now();
                r._fadeTo = f, r._interval = setInterval(function() {
                    var U = (Date.now() - j) / h;
                    j = Date.now(), y += A * U, y = Math.round(y * 100) / 100, A < 0 ? y = Math.max(f, y) : y = Math.min(f, y), m._webAudio ? r._volume = y : m.volume(y, r._id, !0), g && (m._volume = y), (f < a && y <= f || f > a && y >= f) && (clearInterval(r._interval), r._interval = null, r._fadeTo = null, m.volume(f, r._id), m._emit("fade", r._id))
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
                        j = m._rateSeek ? m._rateSeek - m._seek : 0;
                    return m._seek + (j + $ * Math.abs(m._rate))
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
                return new o(r)
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
        var o = function(r) {
            this._parent = r, this.init()
        };
        o.prototype = {
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
        e.Howler = t, e.Howl = i, typeof Ue < "u" ? (Ue.HowlerGlobal = n, Ue.Howler = t, Ue.Howl = i, Ue.Sound = o) : typeof window < "u" && (window.HowlerGlobal = n, window.Howler = t, window.Howl = i, window.Sound = o)
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
            var i = this;
            if (!i.ctx || !i.ctx.listener) return i;
            for (var o = i._howls.length - 1; o >= 0; o--) i._howls[o].stereo(t);
            return i
        }, HowlerGlobal.prototype.pos = function(t, i, o) {
            var s = this;
            if (!s.ctx || !s.ctx.listener) return s;
            if (i = typeof i != "number" ? s._pos[1] : i, o = typeof o != "number" ? s._pos[2] : o, typeof t == "number") s._pos = [t, i, o], typeof s.ctx.listener.positionX < "u" ? (s.ctx.listener.positionX.setTargetAtTime(s._pos[0], Howler.ctx.currentTime, .1), s.ctx.listener.positionY.setTargetAtTime(s._pos[1], Howler.ctx.currentTime, .1), s.ctx.listener.positionZ.setTargetAtTime(s._pos[2], Howler.ctx.currentTime, .1)) : s.ctx.listener.setPosition(s._pos[0], s._pos[1], s._pos[2]);
            else return s._pos;
            return s
        }, HowlerGlobal.prototype.orientation = function(t, i, o, s, l, c) {
            var u = this;
            if (!u.ctx || !u.ctx.listener) return u;
            var d = u._orientation;
            if (i = typeof i != "number" ? d[1] : i, o = typeof o != "number" ? d[2] : o, s = typeof s != "number" ? d[3] : s, l = typeof l != "number" ? d[4] : l, c = typeof c != "number" ? d[5] : c, typeof t == "number") u._orientation = [t, i, o, s, l, c], typeof u.ctx.listener.forwardX < "u" ? (u.ctx.listener.forwardX.setTargetAtTime(t, Howler.ctx.currentTime, .1), u.ctx.listener.forwardY.setTargetAtTime(i, Howler.ctx.currentTime, .1), u.ctx.listener.forwardZ.setTargetAtTime(o, Howler.ctx.currentTime, .1), u.ctx.listener.upX.setTargetAtTime(s, Howler.ctx.currentTime, .1), u.ctx.listener.upY.setTargetAtTime(l, Howler.ctx.currentTime, .1), u.ctx.listener.upZ.setTargetAtTime(c, Howler.ctx.currentTime, .1)) : u.ctx.listener.setOrientation(t, i, o, s, l, c);
            else return d;
            return u
        }, Howl.prototype.init = function(t) {
            return function(i) {
                var o = this;
                return o._orientation = i.orientation || [1, 0, 0], o._stereo = i.stereo || null, o._pos = i.pos || null, o._pannerAttr = {
                    coneInnerAngle: typeof i.coneInnerAngle < "u" ? i.coneInnerAngle : 360,
                    coneOuterAngle: typeof i.coneOuterAngle < "u" ? i.coneOuterAngle : 360,
                    coneOuterGain: typeof i.coneOuterGain < "u" ? i.coneOuterGain : 0,
                    distanceModel: typeof i.distanceModel < "u" ? i.distanceModel : "inverse",
                    maxDistance: typeof i.maxDistance < "u" ? i.maxDistance : 1e4,
                    panningModel: typeof i.panningModel < "u" ? i.panningModel : "HRTF",
                    refDistance: typeof i.refDistance < "u" ? i.refDistance : 1,
                    rolloffFactor: typeof i.rolloffFactor < "u" ? i.rolloffFactor : 1
                }, o._onstereo = i.onstereo ? [{
                    fn: i.onstereo
                }] : [], o._onpos = i.onpos ? [{
                    fn: i.onpos
                }] : [], o._onorientation = i.onorientation ? [{
                    fn: i.onorientation
                }] : [], t.call(this, i)
            }
        }(Howl.prototype.init), Howl.prototype.stereo = function(t, i) {
            var o = this;
            if (!o._webAudio) return o;
            if (o._state !== "loaded") return o._queue.push({
                event: "stereo",
                action: function() {
                    o.stereo(t, i)
                }
            }), o;
            var s = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
            if (typeof i > "u")
                if (typeof t == "number") o._stereo = t, o._pos = [t, 0, 0];
                else return o._stereo;
            for (var l = o._getSoundIds(i), c = 0; c < l.length; c++) {
                var u = o._soundById(l[c]);
                if (u)
                    if (typeof t == "number") u._stereo = t, u._pos = [t, 0, 0], u._node && (u._pannerAttr.panningModel = "equalpower", (!u._panner || !u._panner.pan) && n(u, s), s === "spatial" ? typeof u._panner.positionX < "u" ? (u._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), u._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), u._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : u._panner.setPosition(t, 0, 0) : u._panner.pan.setValueAtTime(t, Howler.ctx.currentTime)), o._emit("stereo", u._id);
                    else return u._stereo
            }
            return o
        }, Howl.prototype.pos = function(t, i, o, s) {
            var l = this;
            if (!l._webAudio) return l;
            if (l._state !== "loaded") return l._queue.push({
                event: "pos",
                action: function() {
                    l.pos(t, i, o, s)
                }
            }), l;
            if (i = typeof i != "number" ? 0 : i, o = typeof o != "number" ? -.5 : o, typeof s > "u")
                if (typeof t == "number") l._pos = [t, i, o];
                else return l._pos;
            for (var c = l._getSoundIds(s), u = 0; u < c.length; u++) {
                var d = l._soundById(c[u]);
                if (d)
                    if (typeof t == "number") d._pos = [t, i, o], d._node && ((!d._panner || d._panner.pan) && n(d, "spatial"), typeof d._panner.positionX < "u" ? (d._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), d._panner.positionY.setValueAtTime(i, Howler.ctx.currentTime), d._panner.positionZ.setValueAtTime(o, Howler.ctx.currentTime)) : d._panner.setPosition(t, i, o)), l._emit("pos", d._id);
                    else return d._pos
            }
            return l
        }, Howl.prototype.orientation = function(t, i, o, s) {
            var l = this;
            if (!l._webAudio) return l;
            if (l._state !== "loaded") return l._queue.push({
                event: "orientation",
                action: function() {
                    l.orientation(t, i, o, s)
                }
            }), l;
            if (i = typeof i != "number" ? l._orientation[1] : i, o = typeof o != "number" ? l._orientation[2] : o, typeof s > "u")
                if (typeof t == "number") l._orientation = [t, i, o];
                else return l._orientation;
            for (var c = l._getSoundIds(s), u = 0; u < c.length; u++) {
                var d = l._soundById(c[u]);
                if (d)
                    if (typeof t == "number") d._orientation = [t, i, o], d._node && (d._panner || (d._pos || (d._pos = l._pos || [0, 0, -.5]), n(d, "spatial")), typeof d._panner.orientationX < "u" ? (d._panner.orientationX.setValueAtTime(t, Howler.ctx.currentTime), d._panner.orientationY.setValueAtTime(i, Howler.ctx.currentTime), d._panner.orientationZ.setValueAtTime(o, Howler.ctx.currentTime)) : d._panner.setOrientation(t, i, o)), l._emit("orientation", d._id);
                    else return d._orientation
            }
            return l
        }, Howl.prototype.pannerAttr = function() {
            var t = this,
                i = arguments,
                o, s, l;
            if (!t._webAudio) return t;
            if (i.length === 0) return t._pannerAttr;
            if (i.length === 1)
                if (typeof i[0] == "object") o = i[0], typeof s > "u" && (o.pannerAttr || (o.pannerAttr = {
                    coneInnerAngle: o.coneInnerAngle,
                    coneOuterAngle: o.coneOuterAngle,
                    coneOuterGain: o.coneOuterGain,
                    distanceModel: o.distanceModel,
                    maxDistance: o.maxDistance,
                    refDistance: o.refDistance,
                    rolloffFactor: o.rolloffFactor,
                    panningModel: o.panningModel
                }), t._pannerAttr = {
                    coneInnerAngle: typeof o.pannerAttr.coneInnerAngle < "u" ? o.pannerAttr.coneInnerAngle : t._coneInnerAngle,
                    coneOuterAngle: typeof o.pannerAttr.coneOuterAngle < "u" ? o.pannerAttr.coneOuterAngle : t._coneOuterAngle,
                    coneOuterGain: typeof o.pannerAttr.coneOuterGain < "u" ? o.pannerAttr.coneOuterGain : t._coneOuterGain,
                    distanceModel: typeof o.pannerAttr.distanceModel < "u" ? o.pannerAttr.distanceModel : t._distanceModel,
                    maxDistance: typeof o.pannerAttr.maxDistance < "u" ? o.pannerAttr.maxDistance : t._maxDistance,
                    refDistance: typeof o.pannerAttr.refDistance < "u" ? o.pannerAttr.refDistance : t._refDistance,
                    rolloffFactor: typeof o.pannerAttr.rolloffFactor < "u" ? o.pannerAttr.rolloffFactor : t._rolloffFactor,
                    panningModel: typeof o.pannerAttr.panningModel < "u" ? o.pannerAttr.panningModel : t._panningModel
                });
                else return l = t._soundById(parseInt(i[0], 10)), l ? l._pannerAttr : t._pannerAttr;
            else i.length === 2 && (o = i[0], s = parseInt(i[1], 10));
            for (var c = t._getSoundIds(s), u = 0; u < c.length; u++)
                if (l = t._soundById(c[u]), l) {
                    var d = l._pannerAttr;
                    d = {
                        coneInnerAngle: typeof o.coneInnerAngle < "u" ? o.coneInnerAngle : d.coneInnerAngle,
                        coneOuterAngle: typeof o.coneOuterAngle < "u" ? o.coneOuterAngle : d.coneOuterAngle,
                        coneOuterGain: typeof o.coneOuterGain < "u" ? o.coneOuterGain : d.coneOuterGain,
                        distanceModel: typeof o.distanceModel < "u" ? o.distanceModel : d.distanceModel,
                        maxDistance: typeof o.maxDistance < "u" ? o.maxDistance : d.maxDistance,
                        refDistance: typeof o.refDistance < "u" ? o.refDistance : d.refDistance,
                        rolloffFactor: typeof o.rolloffFactor < "u" ? o.rolloffFactor : d.rolloffFactor,
                        panningModel: typeof o.panningModel < "u" ? o.panningModel : d.panningModel
                    };
                    var p = l._panner;
                    p || (l._pos || (l._pos = t._pos || [0, 0, -.5]), n(l, "spatial"), p = l._panner), p.coneInnerAngle = d.coneInnerAngle, p.coneOuterAngle = d.coneOuterAngle, p.coneOuterGain = d.coneOuterGain, p.distanceModel = d.distanceModel, p.maxDistance = d.maxDistance, p.refDistance = d.refDistance, p.rolloffFactor = d.rolloffFactor, p.panningModel = d.panningModel
                } return t
        }, Sound.prototype.init = function(t) {
            return function() {
                var i = this,
                    o = i._parent;
                i._orientation = o._orientation, i._stereo = o._stereo, i._pos = o._pos, i._pannerAttr = o._pannerAttr, t.call(this), i._stereo ? o.stereo(i._stereo) : i._pos && o.pos(i._pos[0], i._pos[1], i._pos[2], i._id)
            }
        }(Sound.prototype.init), Sound.prototype.reset = function(t) {
            return function() {
                var i = this,
                    o = i._parent;
                return i._orientation = o._orientation, i._stereo = o._stereo, i._pos = o._pos, i._pannerAttr = o._pannerAttr, i._stereo ? o.stereo(i._stereo) : i._pos ? o.pos(i._pos[0], i._pos[1], i._pos[2], i._id) : i._panner && (i._panner.disconnect(0), i._panner = void 0, o._refreshBuffer(i)), t.call(this)
            }
        }(Sound.prototype.reset);
        var n = function(t, i) {
            i = i || "spatial", i === "spatial" ? (t._panner = Howler.ctx.createPanner(), t._panner.coneInnerAngle = t._pannerAttr.coneInnerAngle, t._panner.coneOuterAngle = t._pannerAttr.coneOuterAngle, t._panner.coneOuterGain = t._pannerAttr.coneOuterGain, t._panner.distanceModel = t._pannerAttr.distanceModel, t._panner.maxDistance = t._pannerAttr.maxDistance, t._panner.refDistance = t._pannerAttr.refDistance, t._panner.rolloffFactor = t._pannerAttr.rolloffFactor, t._panner.panningModel = t._pannerAttr.panningModel, typeof t._panner.positionX < "u" ? (t._panner.positionX.setValueAtTime(t._pos[0], Howler.ctx.currentTime), t._panner.positionY.setValueAtTime(t._pos[1], Howler.ctx.currentTime), t._panner.positionZ.setValueAtTime(t._pos[2], Howler.ctx.currentTime)) : t._panner.setPosition(t._pos[0], t._pos[1], t._pos[2]), typeof t._panner.orientationX < "u" ? (t._panner.orientationX.setValueAtTime(t._orientation[0], Howler.ctx.currentTime), t._panner.orientationY.setValueAtTime(t._orientation[1], Howler.ctx.currentTime), t._panner.orientationZ.setValueAtTime(t._orientation[2], Howler.ctx.currentTime)) : t._panner.setOrientation(t._orientation[0], t._orientation[1], t._orientation[2])) : (t._panner = Howler.ctx.createStereoPanner(), t._panner.pan.setValueAtTime(t._stereo, Howler.ctx.currentTime)), t._panner.connect(t._node), t._paused || t._parent.pause(t._id, !0).play(t._id, !0)
        }
    })()
})(cn);
const cs = () => {},
    us = e => e instanceof Function ? e() : e,
    qr = async e => new Promise(n => setTimeout(n, e)), xl = e => new URLSearchParams(window.location.search).get(e), to = xl("muted"), Sl = !to || to === "1", Tl = {
        muted: Sl
    }, [li, fs] = Gt(Tl);
mn(() => {
    document.addEventListener("visibilitychange", () => {
        const e = li.muted;
        document.hidden ? cn.Howler.mute(!0) : e || cn.Howler.mute(!1)
    })
});
_e(() => {
    const e = li.muted;
    cn.Howler.mute(e)
});
const kl = () => {
        fs("muted", e => !e)
    },
    $l = e => {
        fs("muted", e)
    },
    Vt = {
        options: li,
        toggleMute: kl,
        setMute: $l
    },
    st = (e, n = {}) => {
        const [t, i] = Y(null), [o, s] = Y(!1);
        _e(() => {
            const r = fe(t);
            r == null || r.unload(), i(null);
            const a = us(e);
            !a || Array.isArray(a) && a.length === 0 || new cn.Howl({
                src: a,
                html5: n.html5,
                autoplay: n.autoplay,
                loop: n.loop,
                sprite: n.sprite,
                onload: function() {
                    i(this)
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
                a = fe(o);
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
    no = {},
    El = function(n, t, i) {
        if (!t || t.length === 0) return n();
        const o = document.getElementsByTagName("link");
        return Promise.all(t.map(s => {
            if (s = Pl(s), s in no) return;
            no[s] = !0;
            const l = s.endsWith(".css"),
                c = l ? '[rel="stylesheet"]' : "";
            if (!!i)
                for (let p = o.length - 1; p >= 0; p--) {
                    const r = o[p];
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
    (function(t, i) {
        e.exports = i()
    })(Ue, function() {
        var t = 1e3,
            i = 6e4,
            o = 36e5,
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
            j = {};
        j[$] = y;
        var U = "$isDayjsObject",
            L = function(D) {
                return D instanceof K || !(!D || !D[U])
            },
            B = function D(I, w, T) {
                var k;
                if (!I) return $;
                if (typeof I == "string") {
                    var O = I.toLowerCase();
                    j[O] && (k = O), w && (j[O] = w, k = O);
                    var M = I.split("-");
                    if (!k && M.length > 1) return D(M[0])
                } else {
                    var F = I.name;
                    j[F] = I, k = F
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
                    var W = (k = {}, k[c] = i, k[u] = o, k[l] = t, k)[M] || 1,
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
                        Q = (W.utcOffset() - this.utcOffset()) * i,
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
                            O = J / o;
                            break;
                        case c:
                            O = J / i;
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
                    return j[this.$L]
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
        }, z.en = j[$], z.Ls = j, z.p = {}, z
    })
})(ps);
var Cl = ps.exports;
const We = _n(Cl);
var vs = {
    exports: {}
};
(function(e, n) {
    (function(t, i) {
        e.exports = i()
    })(Ue, function() {
        return function(t, i) {
            i.prototype.isSameOrBefore = function(o, s) {
                return this.isSame(o, s) || this.isBefore(o, s)
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
    (function(t, i) {
        e.exports = i()
    })(Ue, function() {
        var t = "minute",
            i = /[+-]\d\d(?::?\d\d)?/g,
            o = /([+-]|\d\d)/g;
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
                        var j = $.match(i);
                        if (!j) return null;
                        var U = ("" + j[0]).match(o) || ["-", 0, 0],
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
    (function(t, i) {
        e.exports = i()
    })(Ue, function() {
        var t = {
                year: 0,
                month: 1,
                day: 2,
                hour: 3,
                minute: 4,
                second: 5
            },
            i = {};
        return function(o, s, l) {
            var c, u = function(a, f, h) {
                    h === void 0 && (h = {});
                    var v = new Date(a),
                        g = function(m, y) {
                            y === void 0 && (y = {});
                            var A = y.timeZoneName || "short",
                                b = m + "|" + A,
                                $ = i[b];
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
                            }), i[b] = $), $
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
                        j = $ === 24 ? 0 : $,
                        U = v[0] + "-" + v[1] + "-" + v[2] + " " + j + ":" + v[4] + ":" + v[5] + ":000",
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
                var y = function(j, U, L) {
                        var B = j - 60 * U * 1e3,
                            z = d(B, L);
                        if (U === z) return [B, U];
                        var R = d(B -= 60 * (z - U) * 1e3, L);
                        return z === R ? [B, z] : [j - 60 * Math.min(z, R) * 1e3, Math.max(z, R)]
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
    gs = (e, n, t, i = 0) => We(e).set("hour", n).set("minute", t).set("second", i),
    _s = e => We().tz(e),
    Nl = (e, n) => We(e).format(n),
    jl = (e, n) => We(e).isSameOrBefore(n),
    ys = (e, n) => We(e).isAfter(n),
    Hl = void 0;
Gt(Hl);
const Zt = e => () => e,
    Ul = "/assets/ambient-1-0f115a64.mp3",
    Fl = "/assets/ambient-1-bb1f2cb4.webm",
    Gl = "/assets/logbook-1-0fb8b45d.jpg",
    Zl = "/assets/logbook-2-f34a92a7.jpg",
    Yl = "/assets/logbook-3-702b48ec.jpg",
    Wl = "/assets/logbook-4-e1e4d6b8.jpg",
    ql = "/assets/logbook-5-b07340b1.jpg",
    Ql = "/assets/logbook-6-aad79ad3.jpg",
    Kl = "/assets/logbook-7-447b8550.jpg",
    Jl = "/assets/logbook-8-75782f09.jpg",
    Xl = "/assets/logbook-9-5c82ced1.jpg",
    ec = "/assets/bg-7dc885a5.png",
    tc = "/assets/transition-video-009e0abc.mp4",
    Tt = e => new URL(Object.assign({
        "../../../content/assets/ambient-tracks/ambient-track/ambient-1.mp3": Ul,
        "../../../content/assets/ambient-tracks/ambient-track/ambient-1.webm": Fl,
        "../../../content/assets/logs/log/logbook-1.jpg": Gl,
        "../../../content/assets/logs/log/logbook-2.jpg": Zl,
        "../../../content/assets/logs/log/logbook-3.jpg": Yl,
        "../../../content/assets/logs/log/logbook-4.jpg": Wl,
        "../../../content/assets/logs/log/logbook-5.jpg": ql,
        "../../../content/assets/logs/log/logbook-6.jpg": Ql,
        "../../../content/assets/logs/log/logbook-7.jpg": Kl,
        "../../../content/assets/logs/log/logbook-8.jpg": Jl,
        "../../../content/assets/logs/log/logbook-9.jpg": Xl,
        "../../../content/assets/scenes/scene/bg.png": ec,
        "../../../content/assets/scenes/scene/transition-video.mp4": tc
    })["../../../content/assets/".concat(e)], self.location).href,
    nc = Il,
    rc = Zt(nc),
    ro = () => {
        const e = rc()[0];
        return ht(ye({}, e), {
            srcWebm: Tt(e.src.webm),
            srcMp3: Tt(e.src.mp3)
        })
    },
    ic = [],
    oc = ic,
    sc = Zt(oc),
    on = () => {
        const e = sc()[0];
        if (e) return ht(ye({}, e), {
            srcWebm: Tt(e.src.webm),
            srcMp3: Tt(e.src.mp3)
        })
    },
    ac = "/assets/background-music-83982c9a.webm",
    lc = "/assets/background-music-f98c94df.mp3";

function cc(e) {
    return e !== null && (typeof e == "object" || typeof e == "function")
}

function io(e, ...n) {
    return typeof e == "function" ? e(...n) : e
}
var uc = (e => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, {
        get: (n, t) => (typeof require < "u" ? require : n)[t]
    }) : e)(function(e) {
        if (typeof require < "u") return require.apply(this, arguments);
        throw Error('Dynamic require of "' + e + '" is not supported')
    }),
    fc = e => (typeof e.clear == "function" || (e.clear = () => {
        let n;
        for (; n = e.key(0);) e.removeItem(n)
    }), e),
    dc = e => {
        if (!e) return "";
        let n = "";
        for (const t in e) {
            if (!e.hasOwnProperty(t)) continue;
            const i = e[t];
            n += i instanceof Date ? "; ".concat(t, "=").concat(i.toUTCString()) : typeof i == "boolean" ? "; ".concat(t) : "; ".concat(t, "=").concat(i)
        }
        return n
    },
    oo;
try {
    oo = uc("solid-start/server").useRequest
} catch (e) {
    oo = () => (console.warn("It seems you attempt to use cookieStorage on the server without having solid-start installed"), {
        request: {
            headers: {
                get: () => ""
            }
        }
    })
}
var mt = fc({
    _read: () => document.cookie,
    _write: (e, n, t) => {
        document.cookie = "".concat(e, "=").concat(n).concat(dc(t))
    },
    getItem: (e, n) => {
        var t, i;
        return (i = (t = mt._read(n).match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)")) == null ? void 0 : t.pop()) != null ? i : null
    },
    setItem: (e, n, t) => {
        const i = mt.getItem(e);
        mt._write(e, n, t);
        const o = Object.assign(new Event("storage"), {
            key: e,
            oldValue: i,
            newValue: n,
            url: globalThis.document.URL,
            storageArea: mt
        });
        window.dispatchEvent(o)
    },
    removeItem: e => {
        mt._write(e, "deleted", {
            expires: new Date(0)
        })
    },
    key: e => {
        let n = null,
            t = 0;
        return mt._read().replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g, (i, o) => (!n && o && t++ === e && (n = o), "")), n
    },
    get length() {
        let e = 0;
        return mt._read().replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g, n => (e += n ? 1 : 0, "")), e
    }
});

function pc(e, n = {}) {
    const t = n.storage || globalThis.localStorage;
    if (!t) return e;
    const i = n.name || "storage-".concat(ts()),
        o = n.serialize || JSON.stringify.bind(JSON),
        s = n.deserialize || JSON.parse.bind(JSON),
        l = t.getItem(i, n.storageOptions),
        c = typeof e[0] == "function" ? d => e[1](() => s(d)) : d => e[1](yl(s(d)));
    let u = !0;
    return l instanceof Promise ? l.then(d => u && d && c(d)) : l && c(l), [e[0], typeof e[0] == "function" ? d => {
        const p = e[1](d);
        return d != null ? t.setItem(i, o(p), n.storageOptions) : t.removeItem(i), u = !1, p
    } : (...d) => {
        e[1](...d), t.setItem(i, o(fe(() => e[0])), n.storageOptions), u = !1
    }]
}
const vc = [{
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
    hc = vc,
    mc = Zt(hc),
    un = () => mc().map(n => ht(ye({}, n), {
        postDate: zl(n.postDate).subtract(2, "day").format("YYYY-MM-DD")
    })),
    gc = {
        isInstructionsModalViewed: !1,
        isDataUsageWarningDialogAccepted: !1
    },
    [lt, yn] = pc(Gt(gc), {
        name: "notifications-manager-data"
    }),
    _c = () => lt.isInstructionsModalViewed !== !0,
    yc = () => {
        yn("isInstructionsModalViewed", !0)
    },
    bc = () => lt.isDataUsageWarningDialogAccepted === !0,
    wc = () => {
        yn("isDataUsageWarningDialogAccepted", !0)
    },
    Ac = () => {
        const e = on();
        return e ? lt.lastPlayedAnsweringMachineTrackDate ? ys(e.postDate, lt.lastPlayedAnsweringMachineTrackDate) : !0 : !1
    },
    xc = () => {
        const e = on();
        e && yn("lastPlayedAnsweringMachineTrackDate", e.postDate)
    },
    Sc = () => {
        const e = un()[0];
        return e ? lt.lastPlayedArchiveDate ? ys(e.postDate, lt.lastPlayedArchiveDate) : !0 : !1
    },
    Tc = e => {
        lt.lastPlayedArchiveDate && jl(e, lt.lastPlayedArchiveDate) || yn("lastPlayedArchiveDate", e)
    },
    kc = () => {
        const e = un()[0];
        e && yn("lastPlayedArchiveDate", e.postDate)
    },
    Ze = {
        instructionsModal: {
            isVisible: _c,
            setViewed: yc
        },
        dataUsageWarningDialog: {
            accepted: bc,
            setAccepted: wc
        },
        answeringMachineTrack: {
            hasNew: Ac,
            setLastPlayed: xc
        },
        archive: {
            hasNew: Sc,
            setLastPlayed: Tc,
            dismissNotification: kc
        }
    };
var Pe = function() {
    return Pe = Object.assign || function(n) {
        for (var t, i = 1, o = arguments.length; i < o; i++) {
            t = arguments[i];
            for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (n[s] = t[s])
        }
        return n
    }, Pe.apply(this, arguments)
};

function et(e, n, t) {
    if (t || arguments.length === 2)
        for (var i = 0, o = n.length, s; i < o; i++)(s || !(i in n)) && (s || (s = Array.prototype.slice.call(n, 0, i)), s[i] = n[i]);
    return e.concat(s || Array.prototype.slice.call(n))
}
var Qr = {
        exports: {}
    },
    so = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (so) {
    var ao = new Uint8Array(16);
    Qr.exports = function() {
        return so(ao), ao
    }
} else {
    var lo = new Array(16);
    Qr.exports = function() {
        for (var n = 0, t; n < 16; n++) n & 3 || (t = Math.random() * 4294967296), lo[n] = t >>> ((n & 3) << 3) & 255;
        return lo
    }
}
var bs = Qr.exports,
    ws = [];
for (var zn = 0; zn < 256; ++zn) ws[zn] = (zn + 256).toString(16).substr(1);

function $c(e, n) {
    var t = n || 0,
        i = ws;
    return [i[e[t++]], i[e[t++]], i[e[t++]], i[e[t++]], "-", i[e[t++]], i[e[t++]], "-", i[e[t++]], i[e[t++]], "-", i[e[t++]], i[e[t++]], "-", i[e[t++]], i[e[t++]], i[e[t++]], i[e[t++]], i[e[t++]], i[e[t++]]].join("")
}
var As = $c,
    Ic = bs,
    Oc = As,
    co, Tr, kr = 0,
    $r = 0;

function Pc(e, n, t) {
    var i = n && t || 0,
        o = n || [];
    e = e || {};
    var s = e.node || co,
        l = e.clockseq !== void 0 ? e.clockseq : Tr;
    if (s == null || l == null) {
        var c = Ic();
        s == null && (s = co = [c[0] | 1, c[1], c[2], c[3], c[4], c[5]]), l == null && (l = Tr = (c[6] << 8 | c[7]) & 16383)
    }
    var u = e.msecs !== void 0 ? e.msecs : new Date().getTime(),
        d = e.nsecs !== void 0 ? e.nsecs : $r + 1,
        p = u - kr + (d - $r) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383), (p < 0 || u > kr) && e.nsecs === void 0 && (d = 0), d >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    kr = u, $r = d, Tr = l, u += 122192928e5;
    var r = ((u & 268435455) * 1e4 + d) % 4294967296;
    o[i++] = r >>> 24 & 255, o[i++] = r >>> 16 & 255, o[i++] = r >>> 8 & 255, o[i++] = r & 255;
    var a = u / 4294967296 * 1e4 & 268435455;
    o[i++] = a >>> 8 & 255, o[i++] = a & 255, o[i++] = a >>> 24 & 15 | 16, o[i++] = a >>> 16 & 255, o[i++] = l >>> 8 | 128, o[i++] = l & 255;
    for (var f = 0; f < 6; ++f) o[i + f] = s[f];
    return n || Oc(o)
}
var Ec = Pc,
    Cc = bs,
    Dc = As;

function Mc(e, n, t) {
    var i = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var o = e.random || (e.rng || Cc)();
    if (o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, n)
        for (var s = 0; s < 16; ++s) n[i + s] = o[s];
    return n || Dc(o)
}
var Bc = Mc,
    Lc = Ec,
    xs = Bc,
    ci = xs;
ci.v1 = Lc;
ci.v4 = xs;
var Rc = ci;
/*!
 * Core functionality for Snowplow JavaScript trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var Vc = "3.16.0";

function zc(e) {
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
    return Hc(t)
}

function Nc(e) {
    if (!e) return e;
    var n = jc(e);
    return n.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}
var it = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function jc(e) {
    var n, t, i, o, s, l, c, u, d = 0,
        p = 0,
        r = [];
    if (!e) return e;
    e = unescape(encodeURIComponent(e));
    do n = e.charCodeAt(d++), t = e.charCodeAt(d++), i = e.charCodeAt(d++), u = n << 16 | t << 8 | i, o = u >> 18 & 63, s = u >> 12 & 63, l = u >> 6 & 63, c = u & 63, r[p++] = it.charAt(o) + it.charAt(s) + it.charAt(l) + it.charAt(c); while (d < e.length);
    var a = r.join(""),
        f = e.length % 3;
    return (f ? a.slice(0, f - 3) : a) + "===".slice(f || 3)
}

function Hc(e) {
    var n = function(h) {
            return decodeURIComponent(h.split("").map(function(v) {
                return "%" + ("00" + v.charCodeAt(0).toString(16)).slice(-2)
            }).join(""))
        },
        t, i, o, s, l, c, u, d, p = 0,
        r = 0,
        a = "",
        f = [];
    if (!e) return e;
    e += "";
    do s = it.indexOf(e.charAt(p++)), l = it.indexOf(e.charAt(p++)), c = it.indexOf(e.charAt(p++)), u = it.indexOf(e.charAt(p++)), d = s << 18 | l << 12 | c << 6 | u, t = d >> 16 & 255, i = d >> 8 & 255, o = d & 255, c === 64 ? f[r++] = String.fromCharCode(t) : u === 64 ? f[r++] = String.fromCharCode(t, i) : f[r++] = String.fromCharCode(t, i, o); while (p < e.length);
    return a = f.join(""), n(a.replace(/\0+$/, ""))
}

function ui() {
    var e = {},
        n = [],
        t = [],
        i = [],
        o, s = function(d, p) {
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
            i.push(d)
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
            o = d
        },
        build: function() {
            return o == null || o(this, t, i), e
        }
    }
}

function Uc(e) {
    return function(n, t, i) {
        for (var o = function(a, f, h) {
                var v = JSON.stringify(a);
                e ? n.add(f, Nc(v)) : n.add(h, v)
            }, s = function() {
                var a = n.getPayload();
                if (e ? a.cx : a.co) return JSON.parse(e ? zc(a.cx) : a.co)
            }, l = function(a, f) {
                var h = a || s();
                return h ? h.data = h.data.concat(f.data) : h = f, h
            }, c = void 0, u = 0, d = t; u < d.length; u++) {
            var p = d[u];
            p.keyIfEncoded === "cx" ? c = l(c, p.json) : o(p.json, p.keyIfEncoded, p.keyIfNotEncoded)
        }
        if (t.length = 0, i.length) {
            var r = {
                schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                data: et([], i, !0)
            };
            c = l(c, r), i.length = 0
        }
        c && o(c, "cx", "co")
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
var Nn = "Snowplow: ",
    je;
(function(e) {
    e[e.none = 0] = "none", e[e.error = 1] = "error", e[e.warn = 2] = "warn", e[e.debug = 3] = "debug", e[e.info = 4] = "info"
})(je || (je = {}));
var Ve = Fc();

function Fc(e) {
    e === void 0 && (e = je.warn);

    function n(l) {
        je[l] ? e = l : e = je.warn
    }

    function t(l, c) {
        for (var u = [], d = 2; d < arguments.length; d++) u[d - 2] = arguments[d];
        if (e >= je.error && typeof console < "u") {
            var p = Nn + l + "\n";
            c ? console.error.apply(console, et([p + "\n", c], u, !1)) : console.error.apply(console, et([p], u, !1))
        }
    }

    function i(l, c) {
        for (var u = [], d = 2; d < arguments.length; d++) u[d - 2] = arguments[d];
        if (e >= je.warn && typeof console < "u") {
            var p = Nn + l;
            c ? console.warn.apply(console, et([p + "\n", c], u, !1)) : console.warn.apply(console, et([p], u, !1))
        }
    }

    function o(l) {
        for (var c = [], u = 1; u < arguments.length; u++) c[u - 1] = arguments[u];
        e >= je.debug && typeof console < "u" && console.debug.apply(console, et([Nn + l], c, !1))
    }

    function s(l) {
        for (var c = [], u = 1; u < arguments.length; u++) c[u - 1] = arguments[u];
        e >= je.info && typeof console < "u" && console.info.apply(console, et([Nn + l], c, !1))
    }
    return {
        setLogLevel: n,
        warn: i,
        error: t,
        debug: o,
        info: s
    }
}

function Gc() {
    var e = [],
        n = [],
        t = function(i) {
            var o = Xc(i),
                s = eu(i),
                l = [],
                c = Jr(e, i, s, o);
            l.push.apply(l, c);
            var u = iu(n, i, s, o);
            return l.push.apply(l, u), l
        };
    return {
        getGlobalPrimitives: function() {
            return e
        },
        getConditionalProviders: function() {
            return n
        },
        addGlobalContexts: function(i) {
            for (var o = [], s = [], l = 0, c = i; l < c.length; l++) {
                var u = c[l];
                fo(u) ? o.push(u) : Ht(u) && s.push(u)
            }
            e = e.concat(s), n = n.concat(o)
        },
        clearGlobalContexts: function() {
            n = [], e = []
        },
        removeGlobalContexts: function(i) {
            for (var o = function(u) {
                    fo(u) ? n = n.filter(function(d) {
                        return JSON.stringify(d) !== JSON.stringify(u)
                    }) : Ht(u) && (e = e.filter(function(d) {
                        return JSON.stringify(d) !== JSON.stringify(u)
                    }))
                }, s = 0, l = i; s < l.length; s++) {
                var c = l[s];
                o(c)
            }
        },
        getApplicableContexts: function(i) {
            return t(i)
        }
    }
}

function Zc(e) {
    return {
        addPluginContexts: function(n) {
            var t = n ? et([], n, !0) : [];
            return e.forEach(function(i) {
                try {
                    i.contexts && t.push.apply(t, i.contexts())
                } catch (o) {
                    Ve.error("Error adding plugin contexts", o)
                }
            }), t
        }
    }
}

function Yc(e) {
    var n = new RegExp("^iglu:([a-zA-Z0-9-_.]+)/([a-zA-Z0-9-_]+)/jsonschema/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$"),
        t = n.exec(e);
    if (t !== null) return t.slice(1, 6)
}

function Wc(e) {
    if (e[0] === "*" || e[1] === "*") return !1;
    if (e.slice(2).length > 0) {
        for (var n = !1, t = 0, i = e.slice(2); t < i.length; t++) {
            var o = i[t];
            if (o === "*") n = !0;
            else if (n) return !1
        }
        return !0
    } else if (e.length == 2) return !0;
    return !1
}

function ks(e) {
    var n = e.split(".");
    return n && n.length > 1 ? Wc(n) : !1
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

function qc(e) {
    return Array.isArray(e) && e.every(function(n) {
        return typeof n == "string"
    })
}

function uo(e) {
    return qc(e) ? e.every(function(n) {
        return Kr(n)
    }) : typeof e == "string" ? Kr(e) : !1
}

function fn(e) {
    var n = e;
    return Ss(n) && "schema" in n && "data" in n ? typeof n.schema == "string" && typeof n.data == "object" : !1
}

function Qc(e) {
    var n = e,
        t = 0;
    if (e != null && typeof e == "object" && !Array.isArray(e)) {
        if (Object.prototype.hasOwnProperty.call(n, "accept"))
            if (uo(n.accept)) t += 1;
            else return !1;
        if (Object.prototype.hasOwnProperty.call(n, "reject"))
            if (uo(n.reject)) t += 1;
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
    return Array.isArray(e) && e.length === 2 && Qc(e[0]) ? Array.isArray(e[1]) ? e[1].every(Ht) : Ht(e[1]) : !1
}

function fo(e) {
    return Is(e) || Os(e)
}

function Kc(e, n) {
    var t = 0,
        i = 0,
        o = e.accept;
    Array.isArray(o) ? e.accept.some(function(l) {
        return jn(l, n)
    }) && i++ : typeof o == "string" && jn(o, n) && i++;
    var s = e.reject;
    return Array.isArray(s) ? e.reject.some(function(l) {
        return jn(l, n)
    }) && t++ : typeof s == "string" && jn(s, n) && t++, i > 0 && t === 0 ? !0 : (i === 0 && t > 0, !1)
}

function jn(e, n) {
    if (!Kr(e)) return !1;
    var t = $s(e),
        i = Yc(n);
    if (t && i) {
        if (!Jc(t[0], i[0])) return !1;
        for (var o = 1; o < 5; o++)
            if (!Ps(t[o], i[o])) return !1;
        return !0
    }
    return !1
}

function Jc(e, n) {
    var t = n.split("."),
        i = e.split(".");
    if (t && i) {
        if (t.length !== i.length) return !1;
        for (var o = 0; o < i.length; o++)
            if (!Ps(t[o], i[o])) return !1;
        return !0
    }
    return !1
}

function Ps(e, n) {
    return e && n && e === "*" || e === n
}

function Xc(e) {
    for (var n = e.getJson(), t = 0, i = n; t < i.length; t++) {
        var o = i[t];
        if (o.keyIfEncoded === "ue_px" && typeof o.json.data == "object") {
            var s = o.json.data.schema;
            if (typeof s == "string") return s
        }
    }
    return ""
}

function eu(e) {
    var n = e.getPayload().e;
    return typeof n == "string" ? n : ""
}

function tu(e, n, t, i) {
    var o = void 0;
    try {
        var s = {
            event: n.getPayload(),
            eventType: t,
            eventSchema: i
        };
        return o = e(s), Array.isArray(o) && o.every(fn) || fn(o) ? o : void 0
    } catch (l) {
        o = void 0
    }
    return o
}

function Es(e) {
    return Array.isArray(e) ? e : Array.of(e)
}

function Jr(e, n, t, i) {
    var o, s = Es(e),
        l = function(u) {
            var d = nu(u, n, t, i);
            if (d && d.length !== 0) return d
        },
        c = s.map(l);
    return (o = []).concat.apply(o, c.filter(function(u) {
        return u != null && u.filter(Boolean)
    }))
}

function nu(e, n, t, i) {
    if (fn(e)) return [e];
    if (rr(e)) {
        var o = tu(e, n, t, i);
        if (fn(o)) return [o];
        if (Array.isArray(o)) return o
    }
}

function ru(e, n, t, i) {
    if (Is(e)) {
        var o = e[0],
            s = !1;
        try {
            var l = {
                event: n.getPayload(),
                eventType: t,
                eventSchema: i
            };
            s = o(l)
        } catch (c) {
            s = !1
        }
        if (s === !0) return Jr(e[1], n, t, i)
    } else if (Os(e) && Kc(e[0], i)) return Jr(e[1], n, t, i);
    return []
}

function iu(e, n, t, i) {
    var o, s = Es(e),
        l = function(u) {
            var d = ru(u, n, t, i);
            if (d && d.length !== 0) return d
        },
        c = s.map(l);
    return (o = []).concat.apply(o, c.filter(function(u) {
        return u != null && u.filter(Boolean)
    }))
}

function ou(e) {
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

function su(e) {
    e === void 0 && (e = {});

    function n(u, d, p) {
        var r = Zc(d),
            a = Gc(),
            f = u,
            h = {};

        function v(b) {
            if (b && b.length) return {
                schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                data: b
            }
        }

        function g(b, $) {
            var j = a.getApplicableContexts(b),
                U = [];
            return $ && $.length && U.push.apply(U, $), j && j.length && U.push.apply(U, j), U
        }

        function m(b, $, j) {
            b.withJsonProcessor(Uc(f)), b.add("eid", Rc.v4()), b.addDict(h);
            var U = ou(j);
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
        i = e.corePlugins,
        o = e.callback,
        s = i != null ? i : [],
        l = n(t != null ? t : !0, s, o),
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

function au(e) {
    var n = e.event,
        t = n.schema,
        i = n.data,
        o = ui(),
        s = {
            schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
            data: {
                schema: t,
                data: i
            }
        };
    return o.add("e", "ue"), o.addJson("ue_px", "ue_pr", s), o
}

function lu(e) {
    var n = e.pageUrl,
        t = e.pageTitle,
        i = e.referrer,
        o = ui();
    return o.add("e", "pv"), o.add("url", n), o.add("page", t), o.add("refr", i), o
}

function cu(e) {
    var n = e.pageUrl,
        t = e.pageTitle,
        i = e.referrer,
        o = e.minXOffset,
        s = e.maxXOffset,
        l = e.minYOffset,
        c = e.maxYOffset,
        u = ui();
    return u.add("e", "pp"), u.add("url", n), u.add("page", t), u.add("refr", i), o && !isNaN(Number(o)) && u.add("pp_mix", o.toString()), s && !isNaN(Number(s)) && u.add("pp_max", s.toString()), l && !isNaN(Number(l)) && u.add("pp_miy", l.toString()), c && !isNaN(Number(c)) && u.add("pp_may", c.toString()), u
}
var uu = Vc,
    Cs = {
        exports: {}
    },
    Ds = {
        exports: {}
    };
(function() {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        n = {
            rotl: function(t, i) {
                return t << i | t >>> 32 - i
            },
            rotr: function(t, i) {
                return t << 32 - i | t >>> i
            },
            endian: function(t) {
                if (t.constructor == Number) return n.rotl(t, 8) & 16711935 | n.rotl(t, 24) & 4278255360;
                for (var i = 0; i < t.length; i++) t[i] = n.endian(t[i]);
                return t
            },
            randomBytes: function(t) {
                for (var i = []; t > 0; t--) i.push(Math.floor(Math.random() * 256));
                return i
            },
            bytesToWords: function(t) {
                for (var i = [], o = 0, s = 0; o < t.length; o++, s += 8) i[s >>> 5] |= t[o] << 24 - s % 32;
                return i
            },
            wordsToBytes: function(t) {
                for (var i = [], o = 0; o < t.length * 32; o += 8) i.push(t[o >>> 5] >>> 24 - o % 32 & 255);
                return i
            },
            bytesToHex: function(t) {
                for (var i = [], o = 0; o < t.length; o++) i.push((t[o] >>> 4).toString(16)), i.push((t[o] & 15).toString(16));
                return i.join("")
            },
            hexToBytes: function(t) {
                for (var i = [], o = 0; o < t.length; o += 2) i.push(parseInt(t.substr(o, 2), 16));
                return i
            },
            bytesToBase64: function(t) {
                for (var i = [], o = 0; o < t.length; o += 3)
                    for (var s = t[o] << 16 | t[o + 1] << 8 | t[o + 2], l = 0; l < 4; l++) o * 8 + l * 6 <= t.length * 8 ? i.push(e.charAt(s >>> 6 * (3 - l) & 63)) : i.push("=");
                return i.join("")
            },
            base64ToBytes: function(t) {
                t = t.replace(/[^A-Z0-9+\/]/ig, "");
                for (var i = [], o = 0, s = 0; o < t.length; s = ++o % 4) s != 0 && i.push((e.indexOf(t.charAt(o - 1)) & Math.pow(2, -2 * s + 8) - 1) << s * 2 | e.indexOf(t.charAt(o)) >>> 6 - s * 2);
                return i
            }
        };
    Ds.exports = n
})();
var fu = Ds.exports,
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
    po = Xr;
(function() {
    var e = fu,
        n = po.utf8,
        t = po.bin,
        i = function(s) {
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
                    var j = (d << 5 | d >>> 27) + f + (u[b] >>> 0) + (b < 20 ? (p & r | ~p & a) + 1518500249 : b < 40 ? (p ^ r ^ a) + 1859775393 : b < 60 ? (p & r | p & a | r & a) - 1894007588 : (p ^ r ^ a) - 899497514);
                    f = a, a = r, r = p << 30 | p >>> 2, p = d, d = j
                }
                d += v, p += g, r += m, a += y, f += A
            }
            return [d, p, r, a, f]
        },
        o = function(s, l) {
            var c = e.wordsToBytes(i(s));
            return l && l.asBytes ? c : l && l.asString ? t.bytesToString(c) : e.bytesToHex(c)
        };
    o._blocksize = 16, o._digestsize = 20, Cs.exports = o
})();
var du = Cs.exports;
const pu = _n(du);
var ei = {
        exports: {}
    },
    vo = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (vo) {
    var ho = new Uint8Array(16);
    ei.exports = function() {
        return vo(ho), ho
    }
} else {
    var mo = new Array(16);
    ei.exports = function() {
        for (var n = 0, t; n < 16; n++) n & 3 || (t = Math.random() * 4294967296), mo[n] = t >>> ((n & 3) << 3) & 255;
        return mo
    }
}
var Ms = ei.exports,
    Bs = [];
for (var Hn = 0; Hn < 256; ++Hn) Bs[Hn] = (Hn + 256).toString(16).substr(1);

function vu(e, n) {
    var t = n || 0,
        i = Bs;
    return [i[e[t++]], i[e[t++]], i[e[t++]], i[e[t++]], "-", i[e[t++]], i[e[t++]], "-", i[e[t++]], i[e[t++]], "-", i[e[t++]], i[e[t++]], "-", i[e[t++]], i[e[t++]], i[e[t++]], i[e[t++]], i[e[t++]], i[e[t++]]].join("")
}
var Ls = vu,
    hu = Ms,
    mu = Ls,
    go, Ir, Or = 0,
    Pr = 0;

function gu(e, n, t) {
    var i = n && t || 0,
        o = n || [];
    e = e || {};
    var s = e.node || go,
        l = e.clockseq !== void 0 ? e.clockseq : Ir;
    if (s == null || l == null) {
        var c = hu();
        s == null && (s = go = [c[0] | 1, c[1], c[2], c[3], c[4], c[5]]), l == null && (l = Ir = (c[6] << 8 | c[7]) & 16383)
    }
    var u = e.msecs !== void 0 ? e.msecs : new Date().getTime(),
        d = e.nsecs !== void 0 ? e.nsecs : Pr + 1,
        p = u - Or + (d - Pr) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383), (p < 0 || u > Or) && e.nsecs === void 0 && (d = 0), d >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    Or = u, Pr = d, Ir = l, u += 122192928e5;
    var r = ((u & 268435455) * 1e4 + d) % 4294967296;
    o[i++] = r >>> 24 & 255, o[i++] = r >>> 16 & 255, o[i++] = r >>> 8 & 255, o[i++] = r & 255;
    var a = u / 4294967296 * 1e4 & 268435455;
    o[i++] = a >>> 8 & 255, o[i++] = a & 255, o[i++] = a >>> 24 & 15 | 16, o[i++] = a >>> 16 & 255, o[i++] = l >>> 8 | 128, o[i++] = l & 255;
    for (var f = 0; f < 6; ++f) o[i + f] = s[f];
    return n || mu(o)
}
var _u = gu,
    yu = Ms,
    bu = Ls;

function wu(e, n, t) {
    var i = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var o = e.random || (e.rng || yu)();
    if (o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, n)
        for (var s = 0; s < 16; ++s) n[i + s] = o[s];
    return n || bu(o)
}
var Au = wu,
    xu = _u,
    Rs = Au,
    fi = Rs;
fi.v1 = xu;
fi.v4 = Rs;
var tt = fi;
/*!
 * Core functionality for Snowplow Browser trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function Su(e) {
    try {
        var n = window.localStorage,
            t = n.getItem(e + ".expires");
        if (t === null || +t > Date.now()) return n.getItem(e);
        n.removeItem(e), n.removeItem(e + ".expires");
        return
    } catch (i) {
        return
    }
}

function qn(e, n, t) {
    t === void 0 && (t = 63072e3);
    try {
        var i = window.localStorage,
            o = Date.now() + t * 1e3;
        return i.setItem("".concat(e, ".expires"), o.toString()), i.setItem(e, n), !0
    } catch (s) {
        return !1
    }
}

function _o(e) {
    try {
        var n = window.localStorage;
        return n.removeItem(e), n.removeItem(e + ".expires"), !0
    } catch (t) {
        return !1
    }
}

function yo(e) {
    try {
        return window.sessionStorage.getItem(e)
    } catch (n) {
        return
    }
}

function Tu(e, n) {
    try {
        return window.sessionStorage.setItem(e, n), !0
    } catch (t) {
        return !1
    }
}

function Vs(e) {
    return !!(e && typeof e.valueOf() == "string")
}

function bo(e) {
    return Number.isInteger && Number.isInteger(e) || typeof e == "number" && isFinite(e) && Math.floor(e) === e
}

function wo(e) {
    if (!Vs(e)) {
        e = e.text || "";
        var n = document.getElementsByTagName("title");
        n && n[0] != null && (e = n[0].text)
    }
    return e
}

function ti(e) {
    var n = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"),
        t = n.exec(e);
    return t ? t[1] : e
}

function Ao(e) {
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
    } catch (i) {}
    return document.referrer
}

function nt(e, n, t, i) {
    if (e.addEventListener) return e.addEventListener(n, t, i), !0;
    if (e.attachEvent) return e.attachEvent("on" + n, t);
    e["on" + n] = t
}

function dn(e, n) {
    var t = new RegExp("^[^#]*[?&]" + e + "=([^&#]*)").exec(n);
    return t ? decodeURIComponent(t[1].replace(/\+/g, " ")) : null
}

function ku(e, n, t) {
    var i = n + "=" + t,
        o = e.split("#"),
        s = o[0].split("?"),
        l = s.shift(),
        c = s.join("?");
    if (!c) c = i;
    else {
        for (var u = !0, d = c.split("&"), p = 0; p < d.length; p++)
            if (d[p].substr(0, n.length + 1) === n + "=") {
                u = !1, d[p] = i, c = d.join("&");
                break
            } u && (c = i + "&" + c)
    }
    return o[0] = l + "?" + c, o.join("#")
}

function $u(e, n) {
    for (var t = window.location.hostname, i = "_sp_root_domain_test_", o = i + new Date().getTime(), s = "_test_value_" + new Date().getTime(), l = t.split("."), c = l.length - 2; c >= 0; c--) {
        var u = l.slice(c).join(".");
        if (_t(o, s, 0, "/", u, e, n), _t(o) === s) {
            ir(o, u, e, n);
            for (var d = Iu(i), p = 0; p < d.length; p++) ir(d[p], u, e, n);
            return u
        }
    }
    return t
}

function ir(e, n, t, i) {
    _t(e, "", -1, "/", n, t, i)
}

function Iu(e) {
    for (var n = document.cookie.split("; "), t = [], i = 0; i < n.length; i++) n[i].substring(0, e.length) === e && t.push(n[i]);
    return t
}

function _t(e, n, t, i, o, s, l) {
    return arguments.length > 1 ? document.cookie = e + "=" + encodeURIComponent(n != null ? n : "") + (t ? "; Expires=" + new Date(+new Date + t * 1e3).toUTCString() : "") + (i ? "; Path=" + i : "") + (o ? "; Domain=" + o : "") + (s ? "; SameSite=" + s : "") + (l ? "; Secure" : "") : decodeURIComponent((("; " + document.cookie).split("; " + e + "=")[1] || "").split(";")[0])
}

function Ou() {
    try {
        return !!window.localStorage
    } catch (e) {
        return !0
    }
}

function Pu() {
    var e = "modernizr";
    if (!Ou()) return !1;
    try {
        var n = window.localStorage;
        return n.setItem(e, e), n.removeItem(e), !0
    } catch (t) {
        return !1
    }
}
var Eu = "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0",
    Cu = "iglu:com.snowplowanalytics.snowplow/browser_context/jsonschema/1-0-0",
    Du = "iglu:com.snowplowanalytics.snowplow/client_session/jsonschema/1-0-2",
    Mu = "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4";

function Bu(e, n, t, i, o, s, l, c, u, d, p, r, a, f, h, v, g) {
    var m = !1,
        y, A = [],
        b = !1;
    i = typeof i == "string" ? i.toLowerCase() : i;
    var $ = i === !0 || i === "beacon" || i === "true",
        j = !!($ && window.navigator && window.navigator.sendBeacon && !pe(window.navigator.userAgent)),
        U = j && $,
        L = i === "get",
        B = !!(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
        z = !L && B && (i === "post" || $),
        R = z ? o : "/i",
        K = "snowplowOutQueue_".concat(e, "_").concat(z ? "post2" : "get");
    if ($ && (a = {}), s = t && Pu() && z && s || 1, t) try {
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
                            ie = G + o;
                        k(V, ie)
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
                    for (var Ne = 0, An = 0; Ne < Se.length && (An += Se[Ne].bytes, !(An >= l));) Ne += 1;
                    return Ne
                },
                V = void 0,
                Z, q;
            T(A) ? (V = y, Z = W(V, !0, P), q = H(A)) : (V = re(A[0]), Z = W(V, !1, P), q = 1);
            var ve = setTimeout(function() {
                    Z.abort(), m = !1
                }, p),
                ie = function(Se) {
                    for (var Ne = 0; Ne < Se; Ne++) A.shift();
                    t && qn(K, JSON.stringify(A.slice(0, d)))
                },
                xe = function(Se) {
                    ie(Se), M()
                };
            if (Z.onreadystatechange = function() {
                    Z.readyState === 4 && Z.status >= 200 && (clearTimeout(ve), Z.status < 300 ? xe(q) : (F(Z.status) || (Ve.error("Status ".concat(Z.status, ", will not retry.")), ie(q)), m = !1))
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
            schema: Mu,
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
            var ie = ve.match("(iP.+; CPU .*OS (d+)[_d]*.*) AppleWebKit/");
            return ie && ie.length ? parseInt(ie[0]) <= q : !1
        }

        function H(q, ve, ie) {
            var xe = ie.match("(Macintosh;.*Mac OS X (d+)_(d+)[_d]*.*) AppleWebKit/");
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

function Lu(e, n) {
    var t = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)"),
        i = t.exec(e);
    return i && (i == null ? void 0 : i.length) > 1 ? dn(n, i[1]) : null
}

function xo(e, n, t) {
    var i;
    return e === "translate.googleusercontent.com" ? (t === "" && (t = n), n = (i = Lu(n, "u")) !== null && i !== void 0 ? i : "", e = ti(n)) : (e === "cc.bingj.com" || e === "webcache.googleusercontent.com") && (n = document.links[0].href, e = ti(n)), [e, n, t]
}
var zs = 0,
    yt = 1,
    Ru = 2,
    pn = 3,
    di = 4,
    Ns = 5,
    ot = 6,
    Lt = 7,
    bt = 8,
    wt = 9,
    Fe = 10;

function Vu() {
    var e = ["1", "", 0, 0, 0, void 0, "", "", "", void 0, 0];
    return e
}

function zu(e, n, t, i) {
    var o = new Date,
        s = Math.round(o.getTime() / 1e3),
        l;
    e ? (l = e.split("."), l.unshift("0")) : l = ["1", n, s, i, s, "", t], (!l[ot] || l[ot] === "undefined") && (l[ot] = tt.v4()), (!l[Lt] || l[Lt] === "undefined") && (l[Lt] = ""), (!l[bt] || l[bt] === "undefined") && (l[bt] = ""), (!l[wt] || l[wt] === "undefined") && (l[wt] = ""), (!l[Fe] || l[Fe] === "undefined") && (l[Fe] = 0);
    var c = function(p, r) {
            var a = parseInt(p);
            return isNaN(a) ? r : a
        },
        u = function(p) {
            return p ? c(p, void 0) : void 0
        },
        d = [l[zs], l[yt], c(l[Ru], s), c(l[pn], i), c(l[di], s), u(l[Ns]), l[ot], l[Lt], l[bt], u(l[wt]), c(l[Fe], 0)];
    return d
}

function Nu(e, n) {
    var t;
    return e[yt] ? t = e[yt] : n ? (t = "", e[yt] = t) : (t = tt.v4(), e[yt] = t), t
}

function en(e, n) {
    n === void 0 && (n = {
        memorizedVisitCount: 1
    });
    var t = n.memorizedVisitCount;
    ni(e) ? (e[Lt] = e[ot], e[Ns] = e[di], e[pn]++) : e[pn] = t;
    var i = tt.v4();
    return e[ot] = i, e[Fe] = 0, e[bt] = "", e[wt] = void 0, i
}

function Cr(e) {
    e[di] = Math.round(new Date().getTime() / 1e3)
}

function ju(e, n) {
    if (e[Fe] === 0) {
        var t = n.build();
        e[bt] = t.eid;
        var i = t.dtm || t.ttm;
        e[wt] = i ? parseInt(i) : void 0
    }
}

function Hu(e) {
    e[Fe] += 1
}

function Uu(e) {
    return e.shift(), e.join(".")
}

function So(e, n, t) {
    var i = e[wt],
        o = {
            userId: t ? "00000000-0000-0000-0000-000000000000" : e[yt],
            sessionId: e[ot],
            eventIndex: e[Fe],
            sessionIndex: e[pn],
            previousSessionId: t ? null : e[Lt] || null,
            storageMechanism: n == "localStorage" ? "LOCAL_STORAGE" : "COOKIE_1",
            firstEventId: e[bt] || null,
            firstEventTimestamp: i ? new Date(i).toISOString() : null
        };
    return o
}

function Dr(e) {
    return e[ot]
}

function Fu(e) {
    return e[yt]
}

function Mr(e) {
    return e[pn]
}

function ni(e) {
    return e[zs] === "0"
}

function Gu(e) {
    return e[Fe]
}
var vn = "x";

function Br() {
    return {
        viewport: Lr(Zu()),
        documentSize: Lr(Yu()),
        resolution: Lr(Wu()),
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

function Zu() {
    var e, n;
    if ("innerWidth" in window) e = window.innerWidth, n = window.innerHeight;
    else {
        var t = document.documentElement || document.body;
        e = t.clientWidth, n = t.clientHeight
    }
    return e >= 0 && n >= 0 ? e + vn + n : null
}

function Yu() {
    var e = document.documentElement,
        n = document.body,
        t = n ? Math.max(n.offsetHeight, n.scrollHeight) : 0,
        i = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth),
        o = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, t);
    return isNaN(i) || isNaN(o) ? "" : i + vn + o
}

function Wu() {
    return screen.width + vn + screen.height
}

function Lr(e) {
    return e && e.split(vn).map(function(n) {
        return Math.floor(Number(n))
    }).join(vn)
}

function qu(e, n, t, i, o, s) {
    s === void 0 && (s = {});
    var l = [],
        c = function(p, r, a, f, h, v) {
            var g, m, y, A, b, $, j, U, L, B, z, R, K, de, D, I, w, T, k, O, M, F, W, Q, J, re, pe, P;
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
            var ie = su({
                    base64: v.encodeBase64,
                    corePlugins: l,
                    callback: ga
                }),
                xe = document.characterSet || document.charset,
                Ie = xo(window.location.hostname, window.location.href, Er()),
                qe = Ao(Ie[0]),
                Ce = Ie[1],
                ft = Ie[2],
                Qe, Ke = (j = v.platform) !== null && j !== void 0 ? j : "web",
                Se = Ri(f),
                Ne = (U = v.postPath) !== null && U !== void 0 ? U : "/com.snowplowanalytics.snowplow/tp2",
                An = (L = v.appId) !== null && L !== void 0 ? L : "",
                xn, $t = document.title,
                Wt, ca = (B = v.resetActivityTrackingOnPageView) !== null && B !== void 0 ? B : !0,
                _i, yi, ua = (z = v.cookieName) !== null && z !== void 0 ? z : "_sp_",
                qt = (R = v.cookieDomain) !== null && R !== void 0 ? R : void 0,
                cr = "/",
                Sn = (K = v.cookieSameSite) !== null && K !== void 0 ? K : "None",
                Tn = (de = v.cookieSecure) !== null && de !== void 0 ? de : !0,
                bi = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack,
                wi = typeof v.respectDoNotTrack < "u" ? v.respectDoNotTrack && (bi === "yes" || bi === "1") : !1,
                ur, Ai = (D = v.cookieLifetime) !== null && D !== void 0 ? D : 63072e3,
                xi = (I = v.sessionCookieTimeout) !== null && I !== void 0 ? I : 1800,
                It = H(v),
                fr = V(v),
                Le = Z(v),
                se = G(v),
                kn, dr = new Date().getTime(),
                $n, In, On, Pn, Si, En, De, Me = 1,
                dt, Je = Bu(p, h, se == "localStorage" || se == "cookieAndLocalStorage", v.eventMethod, Ne, (w = v.bufferSize) !== null && w !== void 0 ? w : 1, (T = v.maxPostBytes) !== null && T !== void 0 ? T : 4e4, (k = v.maxGetBytes) !== null && k !== void 0 ? k : 0, (O = v.useStm) !== null && O !== void 0 ? O : !0, (M = v.maxLocalStorageQueueSize) !== null && M !== void 0 ? M : 1e3, (F = v.connectionTimeout) !== null && F !== void 0 ? F : 5e3, fr, (W = v.customHeaders) !== null && W !== void 0 ? W : {}, (Q = v.withCredentials) !== null && Q !== void 0 ? Q : !0, (J = v.retryStatusCodes) !== null && J !== void 0 ? J : [], ((re = v.dontRetryStatusCodes) !== null && re !== void 0 ? re : []).concat([400, 401, 403, 410, 422]), v.idService),
                Ti = !1,
                ki = !1,
                be = {
                    enabled: !1,
                    installed: !1,
                    configurations: {}
                },
                fa = (P = (pe = v.contexts) === null || pe === void 0 ? void 0 : pe.session) !== null && P !== void 0 ? P : !1,
                Cn, Dn = v.onSessionUpdateCallback,
                pr = !1;
            v.hasOwnProperty("discoverRootDomain") && v.discoverRootDomain && (qt = $u(Sn, Tn));
            var Mn = Br(),
                da = Mn.browserLanguage,
                pa = Mn.resolution,
                va = Mn.colorDepth,
                ha = Mn.cookiesEnabled;
            ie.setTrackerVersion(a), ie.setTrackerNamespace(r), ie.setAppId(An), ie.setPlatform(Ke), ie.addPayloadPair("cookie", ha ? "1" : "0"), ie.addPayloadPair("cs", xe), ie.addPayloadPair("lang", da), ie.addPayloadPair("res", pa), ie.addPayloadPair("cd", va), Pi(), Li(), v.crossDomainLinker && Ii(v.crossDomainLinker);

            function pt() {
                Ie = xo(window.location.hostname, window.location.href, Er()), Ie[1] !== Ce && (ft = Er(Ce)), qe = Ao(Ie[0]), Ce = Ie[1]
            }

            function $i(_) {
                var S = new Date().getTime(),
                    E = _.currentTarget;
                E != null && E.href && (E.href = ku(E.href, "_sp", En + "." + S))
            }

            function Ii(_) {
                for (var S = 0; S < document.links.length; S++) {
                    var E = document.links[S];
                    !E.spDecorationEnabled && _(E) && (nt(E, "click", $i, !0), nt(E, "mousedown", $i, !0), E.spDecorationEnabled = !0)
                }
            }

            function vt(_) {
                var S;
                return _i && (S = new RegExp("#.*"), _ = _.replace(S, "")), yi && (S = new RegExp("[{}]", "g"), _ = _.replace(S, "")), _
            }

            function Oi(_) {
                var S = new RegExp("^([a-z]+):"),
                    E = S.exec(_);
                return E ? E[1] : null
            }

            function ma(_, S) {
                var E = Oi(S),
                    he;
                return E ? S : S.slice(0, 1) === "/" ? Oi(_) + "://" + ti(_) + S : (_ = vt(_), (he = _.indexOf("?")) >= 0 && (_ = _.slice(0, he)), (he = _.lastIndexOf("/")) !== _.length - 1 && (_ = _.slice(0, he + 1)), _ + S)
            }

            function ga(_) {
                wi || Cn || Je.enqueueRequest(_.build(), Se)
            }

            function Ot(_) {
                return ua + _ + "." + Si
            }

            function vr(_) {
                var S = Ot(_);
                if (se == "localStorage") return Su(S);
                if (se == "cookie" || se == "cookieAndLocalStorage") return _t(S)
            }

            function Pi() {
                pt(), Si = pu((qt || qe) + (cr || "/")).slice(0, 4)
            }

            function Qt() {
                var _ = new Date;
                kn = _.getTime()
            }

            function _a() {
                ya(), Qt()
            }

            function Ei() {
                var _ = document.documentElement;
                return _ ? [_.scrollLeft || window.pageXOffset, _.scrollTop || window.pageYOffset] : [0, 0]
            }

            function Ci() {
                var _ = Ei(),
                    S = _[0];
                $n = S, In = S;
                var E = _[1];
                On = E, Pn = E
            }

            function ya() {
                var _ = Ei(),
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
                return Di(_, S, xi)
            }

            function mr(_) {
                var S = Ot("id"),
                    E = Uu(_);
                return Di(S, E, Ai)
            }

            function Di(_, S, E) {
                return Le && !It ? !1 : se == "localStorage" ? qn(_, S, E) : se == "cookie" || se == "cookieAndLocalStorage" ? (_t(_, S, E, cr, qt, Sn, Tn), document.cookie.indexOf("".concat(_, "=")) !== -1) : !1
            }

            function Mi(_) {
                var S = Ot("id"),
                    E = Ot("ses");
                _o(S), _o(E), ir(S, qt, Sn, Tn), ir(E, qt, Sn, Tn), _ != null && _.preserveSession || (De = tt.v4(), Me = 1), _ != null && _.preserveUser || (En = Le ? "" : tt.v4(), dt = null)
            }

            function Bi(_) {
                _ && _.stateStorageStrategy && (v.stateStorageStrategy = _.stateStorageStrategy, se = G(v)), Le = Z(v), It = H(v), fr = V(v), Je.setUseLocalStorage(se == "localStorage" || se == "cookieAndLocalStorage"), Je.setAnonymousTracking(fr)
            }

            function Li() {
                if (!(Le && !It)) {
                    var _ = se != "none" && !!vr("ses"),
                        S = Kt();
                    En = Nu(S, Le), _ ? De = Dr(S) : De = en(S), Me = Mr(S), se != "none" && (hr(), Cr(S), mr(S))
                }
            }

            function Kt() {
                if (se == "none") return Vu();
                var _ = vr("id") || void 0;
                return zu(_, En, De, Me)
            }

            function Ri(_) {
                return _.indexOf("http") === 0 ? _ : (document.location.protocol === "https:" ? "https" : "http") + "://" + _
            }

            function Vi() {
                (!Ti || h.pageViewId == null) && (h.pageViewId = tt.v4())
            }

            function gr() {
                return h.pageViewId == null && (h.pageViewId = tt.v4()), h.pageViewId
            }

            function zi() {
                if (se === "none" || Le || !ve) return null;
                var _ = "_sp_tab_id",
                    S = yo(_);
                return S || (Tu(_, tt.v4()), S = yo(_)), S || null
            }

            function ba() {
                return {
                    contexts: function() {
                        return [{
                            schema: Eu,
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
                            schema: Cu,
                            data: Pe(Pe({}, Br()), {
                                tabId: zi()
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
                            Xe = Gu(ue) === 0;
                        if (ur ? Cn = !!_t(ur) : Cn = !1, wi || Cn) {
                            Mi();
                            return
                        }
                        ni(ue) ? (!he && se != "none" ? De = en(ue) : De = Dr(ue), Me = Mr(ue)) : new Date().getTime() - dr > xi * 1e3 && (Me++, De = en(ue, {
                            memorizedVisitCount: Me
                        })), Cr(ue), ju(ue, E), Hu(ue);
                        var Te = Br(),
                            Pt = Te.viewport,
                            Jt = Te.documentSize;
                        E.add("vp", Pt), E.add("ds", Jt), E.add("vid", S(Me)), E.add("sid", S(De)), E.add("duid", _(Fu(ue))), E.add("uid", _(dt)), pt(), E.add("refr", vt(Qe || ft)), E.add("url", vt(xn || Ce));
                        var Xt = So(ue, se, Le);
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
                    schema: Du,
                    data: S
                };
                _.addContextEntity(E)
            }

            function Sa() {
                var _ = Kt();
                if (ni(_) ? (se != "none" ? De = en(_) : De = Dr(_), Me = Mr(_)) : (Me++, De = en(_, {
                        memorizedVisitCount: Me
                    })), Cr(_), se != "none") {
                    var S = So(_, se, Le);
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
                pt(), ki && Vi(), ki = !0, $t = document.title, Wt = S;
                var Xe = wo(Wt || $t);
                ie.track(lu({
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
                                    Ui = function() {};
                                window.addEventListener("testPassiveEventSupport", Ui, Ln), window.removeEventListener("testPassiveEventSupport", Ui, Ln), Jt.hasSupport = Et
                            }
                        }
                    };
                    Jt.update();
                    var Xt = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
                    Object.prototype.hasOwnProperty.call(Jt, "hasSupport") ? nt(document, Xt, Qt, {
                        passive: !0
                    }) : nt(document, Xt, Qt), Ci();
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
                    var Hi = void 0;
                    for (Hi in be.configurations) {
                        var wr = be.configurations[Hi];
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
                        }), Ci()
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

            function Ni(_) {
                var S = _.minimumVisitLength,
                    E = _.heartbeatDelay,
                    he = _.callback;
                if (bo(S) && bo(E)) return {
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
                Te !== $t && ($t = Te, Wt = void 0), ie.track(cu({
                    pageUrl: vt(xn || Ce),
                    pageTitle: wo(Wt || $t),
                    referrer: vt(Qe || ft),
                    minXOffset: Bn(E),
                    maxXOffset: Bn(ue),
                    minYOffset: Bn(he),
                    maxYOffset: Bn(Xe)
                }), S)
            }

            function ji(_) {
                var S = be.configurations[_];
                (S == null ? void 0 : S.configMinimumVisitLength) === 0 ? window.clearTimeout(S == null ? void 0 : S.activityInterval) : window.clearInterval(S == null ? void 0 : S.activityInterval), be.configurations[_] = void 0
            }
            var Ia = {
                getDomainSessionIndex: function() {
                    return Me
                },
                getPageViewId: gr,
                getTabId: zi,
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
                    _i = _
                },
                discardBrace: function(_) {
                    yi = _
                },
                setCookiePath: function(_) {
                    cr = _, Pi()
                },
                setVisitorCookieTimeout: function(_) {
                    Ai = _
                },
                crossDomainLinker: function(_) {
                    Ii(_)
                },
                enableActivityTracking: function(_) {
                    be.configurations.pagePing || (be.enabled = !0, be.configurations.pagePing = Ni(Pe(Pe({}, _), {
                        callback: $a
                    })))
                },
                enableActivityTrackingCallback: function(_) {
                    be.configurations.callback || (be.enabled = !0, be.configurations.callback = Ni(_))
                },
                disableActivityTracking: function() {
                    ji("pagePing")
                },
                disableActivityTrackingCallback: function() {
                    ji("callback")
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
                    Se = Ri(_), Je.setCollectorUrl(Se)
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
                    Ti = !0
                },
                disableAnonymousTracking: function(_) {
                    v.anonymousTracking = !1, Bi(_), Li(), Je.executeQueue()
                },
                enableAnonymousTracking: function(_) {
                    var S;
                    v.anonymousTracking = (S = _ && (_ == null ? void 0 : _.options)) !== null && S !== void 0 ? S : !0, Bi(_), It || Vi()
                },
                clearUserData: Mi
            };
            return Pe(Pe({}, Ia), {
                id: p,
                namespace: r,
                core: ie,
                sharedState: h
            })
        },
        u = c(e, n, t, i, o, s),
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

function pi(e, n) {
    try {
        Ku(e != null ? e : Ju()).forEach(n)
    } catch (t) {
        Ve.error("Function failed", t)
    }
}

function Qu(e, n, t, i, o, s) {
    return sn.hasOwnProperty(e) ? null : (sn[e] = qu(e, n, t, i, o, s), sn[e])
}

function Ku(e) {
    return Xu(e, sn)
}

function Ju() {
    return Object.keys(sn)
}

function Xu(e, n) {
    for (var t = [], i = 0, o = e; i < o.length; i++) {
        var s = o[i];
        n.hasOwnProperty(s) ? t.push(n[s]) : Ve.warn(s + " not configured")
    }
    return t
}
var ef = function() {
    function e() {
        this.outQueues = [], this.bufferFlushers = [], this.hasLoaded = !1, this.registeredOnLoadHandlers = []
    }
    return e
}();

function tf() {
    var e = new ef,
        n = document,
        t = window;

    function i() {
        n.visibilityState == "hidden" && e.bufferFlushers.forEach(function(c) {
            c(!1)
        })
    }

    function o() {
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
    return n.visibilityState && nt(n, "visibilitychange", i, !1), nt(t, "beforeunload", o, !1), document.readyState === "loading" ? l() : s(), e
}
/*!
 * Browser tracker for Snowplow v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function nf(e, n) {
    pi(n, function(t) {
        t.enableActivityTracking(e)
    })
}

function rf(e, n) {
    pi(n, function(t) {
        t.trackPageView(e)
    })
}

function of(e, n) {
    pi(n, function(t) {
        t.core.track(au({
            event: e.event
        }), e.context, e.timestamp)
    })
}
var To = typeof window < "u" ? tf() : void 0;

function sf(e, n, t) {
    if (t === void 0 && (t = {}), To) return Qu(e, e, "js-".concat(uu), n, To, t)
}
const af = "brawlstars-cctv-prod",
    lf = "https://collector.snowplow.supercell.com",
    cf = () => {
        sf("sp1", lf, {
            appId: af,
            plugins: []
        })
    },
    uf = () => nf({
        minimumVisitLength: 5,
        heartbeatDelay: 20
    }),
    ff = (e, n, t, i = {}) => {
        of({
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
                }, i)
            }]
        })
    },
    ne = {
        init: cf,
        setupActivityTracking: uf,
        trackPageView: rf,
        trackClickEvent: ff
    },
    df = [{
        postDate: "2023-11-10",
        bgSrc: {
            png: "scenes/scene/bg.png"
        },
        transitionVideoSrc: {
            mp4: "scenes/scene/transition-video.mp4"
        }
    }],
    pf = df,
    vf = Zt(pf),
    vi = () => {
        const e = vf()[0];
        return ht(ye({}, e), {
            bgSrc: Tt(e.bgSrc.png),
            transitionVideoSrc: Tt(e.transitionVideoSrc.mp4)
        })
    },
    hf = [{
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
    mf = hf,
    gf = Zt(mf),
    js = () => gf().map(n => ht(ye({}, n), {
        src: Tt(n.src.jpg)
    })),
    _f = "/assets/instructions-modal-overlay-b0399863.png",
    hi = "/assets/terminal-logo-7a935f92.png",
    Hs = "/assets/logbook-page-bg-left-d97e3458.jpg",
    Us = "/assets/logbook-page-bg-right-98ad4729.jpg",
    Fs = "/assets/logbook-first-page-4594a73f.jpg",
    ri = "/assets/player-controls-bg-272e65c2.jpg",
    Gs = e => e.reduce((n, t, i, o) => (i % 2 === 0 && n.push(e.slice(i, i + 2)), n), []),
    Zs = async e => new Promise(n => {
        const t = new Image;
        t.onload = () => n(t), t.src = e
    });
var Ut = (e => (e[e.initializing = 0] = "initializing", e[e["loading-assets"] = 1] = "loading-assets", e[e["video-transition"] = 2] = "video-transition", e[e.done = 3] = "done", e))(Ut || {});
const yf = vi(),
    bf = js(),
    wf = () => {
        const e = [Hs, Us],
            n = [...bf.map(o => o.src), null].reverse();
        n.length === 1 && e.push(Fs);
        const t = Gs(n),
            i = t[t.length - 1];
        return i && e.push(...i.filter(o => !!o)), e
    },
    Af = [yf.bgSrc, _f, hi, ri, ...wf()],
    [Ys, mi] = Y(0),
    [xf, Sf] = Y(!1),
    [Tf, kf] = Y(!1),
    $f = async () => {
        mi(1);
        const e = Af.map(n => Zs(n));
        await Promise.allSettled(e), Sf(!0)
    }, Ws = () => {
        window.location.href = "brawlstars-inbox://cctvloaded"
    };
_e(() => {
    xf() && Tf() && (Ws(), mi(2))
});
_e(() => {
    Ys() === 3 && Ws()
});
const If = () => {
        kf(!0)
    },
    Of = () => {
        mi(3)
    },
    rt = {
        init: $f,
        currentStatus: Ys,
        onVideoTransitionLoaded: If,
        onVideoTransitionEnd: Of
    },
    qs = e => e[Math.floor(Math.random() * e.length)];

function Qs(e) {
    var n, t, i = "";
    if (typeof e == "string" || typeof e == "number") i += e;
    else if (typeof e == "object")
        if (Array.isArray(e))
            for (n = 0; n < e.length; n++) e[n] && (t = Qs(e[n])) && (i && (i += " "), i += t);
        else
            for (n in e) e[n] && (i && (i += " "), i += n);
    return i
}

function Pf() {
    for (var e, n, t = 0, i = ""; t < arguments.length;)(e = arguments[t++]) && (n = Qs(e)) && (i && (i += " "), i += n);
    return i
}
const ko = e => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e,
    ce = Pf,
    bn = (e, n) => t => {
        var i;
        if ((n == null ? void 0 : n.variants) == null) return ce(e, t == null ? void 0 : t.class, t == null ? void 0 : t.className);
        const {
            variants: o,
            defaultVariants: s
        } = n, l = Object.keys(o).map(d => {
            const p = t == null ? void 0 : t[d],
                r = s == null ? void 0 : s[d];
            if (p === null) return null;
            const a = ko(p) || ko(r);
            return o[d][a]
        }), c = t && Object.entries(t).reduce((d, p) => {
            let [r, a] = p;
            return a === void 0 || (d[r] = a), d
        }, {}), u = n == null || (i = n.compoundVariants) === null || i === void 0 ? void 0 : i.reduce((d, p) => {
            let h = p,
                {
                    class: r,
                    className: a
                } = h,
                f = Yi(h, ["class", "className"]);
            return Object.entries(f).every(v => {
                let [g, m] = v;
                return Array.isArray(m) ? m.includes(ye(ye({}, s), c)[g]) : ye(ye({}, s), c)[g] === m
            }) ? [...d, r, a] : d
        }, []);
        return ce(e, l, u, t == null ? void 0 : t.class, t == null ? void 0 : t.className)
    },
    Ef = "/assets/player-8b9a1305.mp3",
    Cf = "/assets/player-4aabf494.ogg",
    Df = N('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="m8 36 17-12L8 12v24Zm18-24v24l17-12-17-12Z">'),
    Mf = (e = {}) => (() => {
        const n = Df();
        return Ye(n, e, !0, !0), n
    })(),
    Bf = N('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="M22 36V12L5 24l17 12Zm1-12 17 12V12L23 24Z">'),
    Lf = (e = {}) => (() => {
        const n = Bf();
        return Ye(n, e, !0, !0), n
    })(),
    Rf = N('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 104 68"><path fill="currentColor" d="M60.66 16.06c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4Zm9.54-26.81c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36-4.06-.01-6.57-.12-7.52-.36Zm0 17.9c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36s-6.57-.12-7.52-.36Zm3.89-8.99c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .95-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.14-3.63-.4Zm13.43-17.91c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4Zm-67.95-34.7c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm7.67-7.34c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.61c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33Zm12.74 6.6c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.22 3.22-.33 7.01-.33Zm7.67 7.34c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.21 3.22-.33 7.01-.33ZM1.43 31.5c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.43-.14-4.07-.45Zm-.48 8.28c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.07 0-3.43-.15-4.07-.45Zm37.59-21.96c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.44-.14-4.07-.45ZM8.47 23.97c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79.01-6.12-.1-7.01-.33Zm30.07 31.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Z">'),
    Vf = (e = {}) => (() => {
        const n = Rf();
        return Ye(n, e, !0, !0), n
    })(),
    zf = N('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="M12 38h8V10h-8v28Zm16-28v28h8V10h-8Z">'),
    Nf = (e = {}) => (() => {
        const n = zf();
        return Ye(n, e, !0, !0), n
    })(),
    jf = N('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="M16 10v28l22-14-22-14Z">'),
    Hf = (e = {}) => (() => {
        const n = jf();
        return Ye(n, e, !0, !0), n
    })(),
    Uf = N('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="M23.495 27.969c2.28 0 4.13-1.913 4.13-4.273 0-2.36-1.85-4.273-4.13-4.273-2.281 0-4.13 1.913-4.13 4.273 0 2.36 1.849 4.273 4.13 4.273Z"></path><path fill="currentColor" d="M31.073 15.863a2.047 2.047 0 0 0-.137-.13 11.945 11.945 0 0 0-.504-.476 1.942 1.942 0 0 0-2.8.233c-.71.863-.609 2.162.225 2.897a7.06 7.06 0 0 1 2.374 5.306c0 2.261-1.068 4.39-2.856 5.695-.013.009-.023.02-.037.03a1.412 1.412 0 0 0-.066.05c-.909.636-1.15 1.913-.535 2.853a1.939 1.939 0 0 0 2.758.551c2.953-2.064 4.717-5.498 4.717-9.184-.003-2.952-1.118-5.734-3.139-7.825Z"></path><path fill="currentColor" d="M35.168 11.425a1.917 1.917 0 0 0-.156-.145 17.637 17.637 0 0 0-.829-.79 1.942 1.942 0 0 0-2.8.233c-.71.864-.61 2.163.225 2.897 2.805 2.47 4.413 6.069 4.413 9.873 0 4.199-1.981 8.154-5.297 10.585-.072.052-.143.11-.218.162-.908.636-1.147 1.913-.535 2.853a1.939 1.939 0 0 0 2.758.551C37.282 34.462 40 29.169 40 23.49c0-4.555-1.717-8.842-4.832-12.065ZM19.733 29.47a.87.87 0 0 1-.066-.049c-.013-.01-.024-.022-.037-.03-1.788-1.304-2.856-3.434-2.856-5.695 0-2.045.864-3.98 2.374-5.306a2.104 2.104 0 0 0 .225-2.898 1.94 1.94 0 0 0-2.8-.233 9.434 9.434 0 0 0-.503.477 2.158 2.158 0 0 0-.14.132c-2.024 2.086-3.14 4.868-3.14 7.828 0 3.686 1.765 7.118 4.718 9.184.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.905.617-.945.376-2.223-.533-2.858Z"></path><path fill="currentColor" d="M16.496 34.24c-.074-.053-.143-.11-.217-.162-3.316-2.429-5.298-6.383-5.298-10.585 0-3.804 1.608-7.403 4.413-9.872a2.103 2.103 0 0 0 .226-2.898 1.94 1.94 0 0 0-2.8-.232c-.29.252-.562.518-.83.789a2.98 2.98 0 0 0-.156.145C8.716 14.648 7 18.935 7 23.493c0 5.679 2.718 10.969 7.271 14.153.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.904.614-.943.376-2.22-.533-2.856Z">'),
    Ff = (e = {}) => (() => {
        const n = Uf();
        return Ye(n, e, !0, !0), n
    })(),
    Gf = N('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.96 67.25"><path fill="currentColor" d="M86.24 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.65-7.86c-.42-.23-.63-.84-.63-1.83s.21-1.6.63-1.83C83.01.12 84.11 0 85.9 0s2.89.12 3.31.35c.42.23.63.84.63 1.83s-.21 1.6-.63 1.83c-.42.23-1.52.35-3.31.35s-2.89-.12-3.31-.35Zm6.77 15.72c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.18 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.18 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.7 7.86c-.39-.23-.58-.84-.58-1.83s.19-1.6.58-1.83c.39-.23 1.4-.35 3.04-.35s2.65.12 3.04.35c.39.23.58.84.58 1.83s-.19 1.6-.58 1.83c-.39.23-1.4.35-3.04.35s-2.65-.12-3.04-.35ZM61.57 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm3.12 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.17 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.17 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-42-41.98c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm7.67-7.35c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.5c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm12.74 6.6c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm7.67 7.34c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33ZM1.43 31.39c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm-.48 8.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM38.54 17.7c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM8.47 23.86c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm30.07 31.26c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Z">'),
    Zf = (e = {}) => (() => {
        const n = Gf();
        return Ye(n, e, !0, !0), n
    })(),
    Yf = {
        "fast-forward": Mf,
        "fast-rewind": Lf,
        mute: Vf,
        pause: Nf,
        play: Hf,
        live: Ff,
        unmute: Zf
    },
    Wf = N("<span>"),
    gt = e => {
        const [n, t] = si(e, ["name"]);
        return (() => {
            const i = Wf();
            return Ye(i, t, !1, !0), C(i, x(is, {
                get component() {
                    return Yf[n.name]
                }
            })), i
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
    qf = [{
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
    Qf = qf,
    Kf = Zt(Qf),
    Jf = () => Kf()[0],
    Xf = (e = !0) => {
        let n = cs;
        return {
            get abort() {
                return n
            },
            exec: t => (e && n(), Promise.race([new Promise((i, o) => n = () => o(new Error("aborted"))), new Promise(i => t(i))]))
        }
    },
    ed = e => {
        const {
            multiplier: n = 4
        } = e != null ? e : {};
        let t = cs,
            i = null;
        const c = {
            onTick: u => (t = u, c),
            start: () => (i === null && (i = setInterval(() => {
                t()
            }, 1e3 / n)), c),
            stop: () => (i !== null && (clearInterval(i), i = null), c)
        };
        return c
    },
    td = e => {
        const n = ts(),
            t = ed(),
            i = Xf(),
            [o, s] = Y(null),
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
            j = async w => {
                try {
                    const T = u(),
                        O = await (await El(() => import("./player-7c0caaff.js"), [])).initPlayer({
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
                (w.videoId ? u().videoId === w.videoId : u().playlistId === w.playlistId) || (f("initializing"), s(null), d(w), await i.exec(T => {
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
                await i.exec(w => {
                    var T;
                    (T = p()) == null || T.play(), w()
                }), f("playing")
            }, R = async () => {
                await i.exec(w => {
                    var T;
                    (T = p()) == null || T.pause(), w()
                }), f("ready")
            }, K = async () => {
                !y() || b() || (f("syncing"), await i.exec(w => {
                    var T, k, O;
                    (T = p()) == null || T.liveTracker.seekToLiveEdge(), (k = p()) == null || k.play(), (O = p()) == null || O.one("timeupdate", w)
                }), f("playing"))
            }, de = async w => {
                var T, k;
                f(w === 1 ? "seeking-fwd" : "seeking-bwd"), await i.exec(O => {
                    var M;
                    (M = p()) == null || M.pause(), t.start().onTick(() => {
                        const F = l() + 1 * w;
                        w === -1 && F <= 0 || w === 1 && F >= $() ? O() : c(F)
                    })
                }), t.stop(), w === 1 ? y() ? f("ready") : ((T = p()) == null || T.currentTime(0), f("ended")) : ((k = p()) == null || k.currentTime(0), f("ready"))
            }, D = async () => {
                var w, T;
                Math.abs(l() - ((T = (w = p()) == null ? void 0 : w.currentTime()) != null ? T : 0)) < 3 || (f("syncing"), await i.exec(k => {
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
                mount: j,
                unmount: B,
                isMounted: g,
                dispatch: async w => {
                    t.stop();
                    try {
                        if (o() === w && !["rev", "fwd"].includes(w)) throw new Error("same as previous action");
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
    kt = Jf().liveVideos.map((e, n) => td({
        initialFeed: e,
        initialPosition: Js(n)
    })),
    [nd, rd] = Y(!1),
    [id, od] = Y(null),
    ct = () => kt.filter(e => e.isEnabled()),
    sd = () => ct().find(e => e.isCenter()),
    ad = () => {
        const e = ct().filter(n => n.isLive() && n.status() === "playing");
        return e.length > 0 ? e.every(n => n.isAtEdge()) : !1
    },
    ld = ke(() => kt.length > 0 && kt.every(e => e.status() !== "initializing")),
    cd = ke(() => ct().length > 0 && ct().every(e => e.status() === "ended")),
    ud = e => {
        const n = kt.find(i => i.uid === e.uid),
            t = kt.find(i => i.position() === "c");
        sr(() => {
            t.setPosition(n.position()), n.setPosition("c")
        })
    },
    fd = () => {
        sr(() => {
            kt.forEach((e, n) => e.setPosition(Js(n)))
        })
    },
    dd = async e => {
        var t;
        const n = (t = sd()) == null ? void 0 : t.time();
        if (n) return e.setTime(n), e.Player.dispatch("sync")
    }, pd = async e => {
        try {
            e === "play" && await Promise.all(ct().map(dd)), await Promise.all(ct().map(n => n.Player.dispatch(e)))
        } catch (n) {
            console.warn(n)
        }
    }, vd = async e => {
        try {
            od(e), !!e.archivePlaylist ? await Promise.all(ct().map(t => t.switchFeed(e.archivePlaylist))) : await Promise.all(ct().map((t, i) => {
                const o = e.liveVideos[i % e.liveVideos.length];
                if (o) return t.switchFeed(o)
            }))
        } catch (n) {
            console.warn(n)
        }
    }, me = {
        screens: kt,
        Supervisor: {
            dispatch: pd,
            positionScreenAtCenter: ud,
            resetScreensPosition: fd,
            controlsVisible: nd,
            setControlsVisible: rd,
            switchFeed: vd,
            allAtEdge: ad,
            allLoaded: ld,
            allEnded: cd,
            currentFeed: id
        }
    }, hd = N('<div role="button" class="absolute top-0 left-0 wh-full">'), md = N('<div class="absolute bottom-0 left-0 right-0 h-[228px] px-[158px] flex space-x-68 items-center"><button></button><button></button><button></button><button></button><button>'), tn = ["w-[330px] h-[100px] flex-center bg-player-control-btn text-green rounded-sm", "shadow-player-controls-btn active:shadow-player-controls-btn-pressed", "[&>span]:w-72 [&>span]:drop-shadow-terminal"], gd = () => {
        const e = st([Cf, Ef], {
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
            const n = hd();
            return n.$$click = () => me.Supervisor.setControlsVisible(!1), n
        })(), (() => {
            const n = md(),
                t = n.firstChild,
                i = t.nextSibling,
                o = i.nextSibling,
                s = o.nextSibling,
                l = s.nextSibling;
            return "url(".concat(ri, ")") != null ? n.style.setProperty("background-image", "url(".concat(ri, ")")) : n.style.removeProperty("background-image"), t.$$click = () => {
                ne.trackClickEvent("player-controls", "rewind", "cctv-room"), me.Supervisor.dispatch("rev"), e.play("rewind-click", {
                    interrupt: !0
                }), e.play("rewind-loop")
            }, C(t, x(gt, {
                name: "fast-rewind"
            })), i.$$click = () => {
                ne.trackClickEvent("player-controls", "play", "cctv-room"), me.Supervisor.dispatch("play"), e.play("play", {
                    interrupt: !0
                })
            }, C(i, x(gt, {
                name: "play"
            })), o.$$click = () => {
                ne.trackClickEvent("player-controls", "forward", "cctv-room"), me.Supervisor.dispatch("fwd"), e.play("forward-click", {
                    interrupt: !0
                }), e.play("forward-loop")
            }, C(o, x(gt, {
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
                return u !== c._v$ && te(t, c._v$ = u), d !== c._v$2 && te(i, c._v$2 = d), p !== c._v$3 && te(o, c._v$3 = p), r !== c._v$4 && te(s, c._v$4 = r), a !== c._v$5 && te(l, c._v$5 = a), c
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
const _d = (e, n) => {
        const t = e * n / 100;
        return e - t
    },
    $o = e => e.touches.length === 2,
    Io = e => Math.hypot(e[0].pageX - e[1].pageX, e[0].pageY - e[1].pageY),
    yd = e => {
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
        }), i = () => {
            t("isEnabled", !0)
        }, o = () => {
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
            !$o(d) || !n.isEnabled || (d.preventDefault(), t({
                isZooming: !0,
                start: {
                    distance: Io(d.touches),
                    x: (d.touches[0].pageX + d.touches[1].pageX) / 2,
                    y: (d.touches[0].pageY + d.touches[1].pageY) / 2
                }
            }))
        }, c = d => {
            !$o(d) || !n.isEnabled || (d.preventDefault(), t(p => {
                const r = "scale" in d ? d.scale : Io(d.touches) / n.start.distance,
                    a = (d.touches[0].pageX + d.touches[1].pageX) / 2 - p.start.x,
                    f = (d.touches[0].pageY + d.touches[1].pageY) / 2 - p.start.y;
                return {
                    scale: Math.min(Math.max(1, _d(r, 10)), 4),
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
                enable: i,
                disable: o
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
    oe = e => {
        const [n, t] = si(e, ["size", "as", "class", "children"]);
        return x(is, Ya({
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
    bd = "/assets/seek-video-dab3075d.mp4",
    wd = N('<video playsinline muted loop class="absolute top-0 left-0 wh-full object-cover">'),
    Ad = N('<div class="absolute top-0 left-0 bg-black z-10 wh-full">'),
    Oo = N("<span>"),
    xd = N('<div class="absolute top-72 left-72 flex items-center space-x-8 text-white">'),
    Sd = {
        "seeking-fwd": "seeking-fwd",
        "seeking-bwd": "seeking-bwd",
        ready: "ready",
        playing: "playing",
        error: "error"
    },
    Td = {
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
    kd = e => {
        let n;
        const [t, i] = Y(void 0);
        _e(() => {
            const u = e.screen.status();
            if (u === "syncing") return;
            const p = e.screen.isAtEdge() && u === "playing" ? "live" : Sd[u];
            i(p);
            let r;
            (p === "playing" || p === "live") && (r = setTimeout(() => i(void 0), 1500)), Ae(() => clearTimeout(r))
        });
        const [o, s] = Y();
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
        const l = () => t() ? Td[t()] : void 0,
            c = () => t() === "seeking-bwd" || t() === "seeking-fwd";
        return _e(() => {
            n && (c() ? n.play() : n.pause())
        }), [(() => {
            const u = wd(),
                d = n;
            return typeof d == "function" ? Ee(d, u) : n = u, le(u, "src", bd), X(() => (c() ? "visible" : "hidden") != null ? u.style.setProperty("visibility", c() ? "visible" : "hidden") : u.style.removeProperty("visibility")), u
        })(), x(rs, {
            get children() {
                return [x(Bt, {
                    get when() {
                        return t() === "error"
                    },
                    get children() {
                        return Ad()
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
                                const d = xd();
                                return C(d, x(oe, {
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
                                return ke(() => !!o())() && e.screen.isEnabled()
                            },
                            get children() {
                                return x(oe, {
                                    as: "div",
                                    size: "screen-overlay-sm",
                                    class: "absolute bottom-72 left-72 flex flex-col items-start text-white",
                                    get children() {
                                        return [(() => {
                                            const u = Oo();
                                            return C(u, () => o().time), u
                                        })(), (() => {
                                            const u = Oo();
                                            return C(u, () => o().date), u
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
    $d = N('<button class="absolute top-0 left-0 isolate"><div>'),
    Id = {
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
    Od = e => {
        const [n, t] = Y(void 0);
        let i;
        const o = () => Id[e.screen.position()],
            {
                data: s,
                controls: l
            } = yd({
                targetRef: n
            });
        return _e(() => {
            rt.currentStatus() === Ut.done && Ze.dataUsageWarningDialog.accepted() && i && !e.screen.Player.isMounted() && e.screen.Player.mount(i)
        }), Ae(() => {
            e.screen.Player.unmount()
        }), _e(() => {
            e.screen.position() === "c" && !["initializing", "error"].includes(e.screen.status()) ? l.enable() : l.disable()
        }), (() => {
            const c = $d(),
                u = c.firstChild;
            c.$$click = () => {
                var p;
                (p = e.onClick) == null || p.call(e)
            }, Ee(t, c);
            const d = i;
            return typeof d == "function" ? Ee(d, u) : i = u, C(c, x(kd, {
                get screen() {
                    return e.screen
                }
            }), null), X(p => {
                const r = "".concat(o().coordinates.y, "px"),
                    a = "".concat(o().coordinates.x, "px"),
                    f = "".concat(o().size.width, "px"),
                    h = "".concat(o().size.height, "px"),
                    v = o().transformOrigin,
                    g = s.isZooming ? "10" : void 0,
                    m = "translate3d(".concat(s.delta.x, "px, ").concat(s.delta.y, "px, 0) rotateZ(").concat(o().rotation || 0, "deg) scale(").concat((o().scaleFactor || 1) * s.scale, ")"),
                    y = o().hidden ? "hidden" : void 0,
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
const Pd = N('<img class="absolute top-0 left-0 wh-full pointer-events-none">'),
    Ed = () => (() => {
        const e = Pd();
        return X(() => le(e, "src", vi().bgSrc)), e
    })(),
    Cd = N('<button class="absolute origin-top-left">'),
    Dd = [{
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
    Md = e => x(ai, {
        each: Dd,
        children: n => (() => {
            const t = Cd();
            return t.$$click = () => e.onItemSelected(n.appName), X(i => {
                const o = "".concat(n.size.width, "px"),
                    s = "".concat(n.size.height, "px"),
                    l = "translate(".concat(n.position.x, "px, ").concat(n.position.y, "px)");
                return o !== i._v$ && ((i._v$ = o) != null ? t.style.setProperty("width", o) : t.style.removeProperty("width")), s !== i._v$2 && ((i._v$2 = s) != null ? t.style.setProperty("height", s) : t.style.removeProperty("height")), l !== i._v$3 && ((i._v$3 = l) != null ? t.style.setProperty("transform", l) : t.style.removeProperty("transform")), i
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }), t
        })()
    });
$e(["click"]);
const Bd = "/assets/answering-machine-button-glow-58ea4526.svg",
    Ld = N('<img class="absolute origin-bottom-left">'),
    Rd = {
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
    Vd = () => {
        const e = Rd["phone-button-light"];
        return x(ze, {
            get when() {
                return Ze.answeringMachineTrack.hasNew()
            },
            get children() {
                const n = Ld();
                return le(n, "src", Bd), X(t => {
                    const i = e.size.width,
                        o = e.size.width,
                        s = "translate(".concat(e.position.x, "px, ").concat(e.position.y, "px)");
                    return i !== t._v$ && le(n, "width", t._v$ = i), o !== t._v$2 && le(n, "height", t._v$2 = o), s !== t._v$3 && ((t._v$3 = s) != null ? n.style.setProperty("transform", s) : n.style.removeProperty("transform")), t
                }, {
                    _v$: void 0,
                    _v$2: void 0,
                    _v$3: void 0
                }), n
            }
        })
    },
    zd = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAAAwECBAUGBwgBAQACAwEBAAAAAAAAAAAAAAABBQIDBgQH/9oADAMBAAIQAxAAAAD5/rSpJbW3JaMQCWKaYomz89Wtt6GDLTo2diYemAYZgAAAAAAC4tyr+gz8cfabLprHhdfou0k9NH4zyftvm9f23G02OD4+osEbAAAAABUv2UPabqyHu9vv7T5zisp6efx7JZU4fPddXHd4ryXv/mlf3Hm8W11lf2tojaAAAAkjvRvPWfJvYbDidhu9Rt7HhcPIjmnXh5kF6bLg1GJsMDTZ+Rc90XO0/wBSiGv3gAAAK0Gw6fjNvtrfZdtzO8tvme1gsw9nh32HZjzhs9Tna+M8nzX0Lznz33HarLwqr6OGO8AAAACuTi1nHqu+8y9X9vIrci/1c3AmTENmTZE8Ty255Gu7qsVaaLkEgAAAAAL7CJEYkRiSlgrQSAAAAAAAAAAAAAAAAB//xAA0EAACAQMDAgMFBwQDAAAAAAABAgMABBEFEiETMQYiURQwUmFxFRYgMkBBkSNQgZJTgsH/2gAIAQEAAT8AoAsQACSaSCZ/yoTTxvG211IPofxCGVlDKjEH0oQylgvTbJ7ZGKMMqjLIwHzGKNtOO8b/AMUbeb/jb+KEMpAIRiD6DNNDKgJaNgM4yR7tWKkEHBFLLIvZiOc0zMxyxJP4kllXAVyMdsUiux7mlhlk/MzGhbXJHdqaGaPsTTdZF2hiBTySkbWdiPTP6OKMtVjp7ysoC8kgCrPwzd7lDwMvzYcCodNsolCR2gnAbzuyhv8AXFXvh8yndaozof8ALL8mxWp6Lc2uOrEyZzjcMZxU8RUmiMH9AFJqK2ZiOKs9OZscV4ftvZ5OUG112nira2aMv1GY4baBuPepopRJGQ4P0AFS25dSpbzFTgjy4/wK1G2f2AozZMj5wecBavdOYE8VPasp7UyEe+Vc1b2xYjirDTixHlrTtFYhSV49ags4YVACgmiM71YYyc0qnHmjLH1oAqWZu+MAV7IkseJFP1rUNEOGKrkYrUNNKk+Wrm2Kk8U6Y94Bk1BFuIrR9JluGUKhPIrTtHt4FUuVZscgGvKOOK3D1FZHqKaMM3lagoUVkeoo4xV9ptrdAksqt+5rWNHlgLErkeo5H81cw7SaYY93H3qyUFlqxYxaXA1t5cnErDht319KsJo9qq4IbPcUyKwLZPaozucLUi7VCr3Y0jtFLg1O2Is1BtcNknimc7JsNkBeDUSLPcbHJxz2q7SP+rDE4lh6EjFTyFIH5q1BAGapBz7tO9WLgOua0W6tfZYBblBIFHWDttDH5Zr2Qlg6iNV+T5FLs2BQwPHrUdu6uGOKaIs+7OPSpbZmbIOaZGaEJxn61FbBVbfSqxjePKnIOOa9jaNyzhWGCdu7k1LFH0LhJJUWFvPncN64Hw1qLDe1Sd/direTBqxumUrzUFwx0qNs4/qH/tWmgSRs5Y8GjOwjOOfNtBpbp0l2uTwcEVOxERZTVqesWyx4rccyoGJAU8+lQXIjlJPwmrhmFq9yPM5GAfhrUrlyXyau5CWNMcn3kbYNWs2CK0do59IdOvErtKDh3C8LVoLe2hbqywuxIC7XzU9xApDm4QIgG3YwY5+lO8VyRJHdLnOD1CEoSKbVo2nh3dh5xUIgiSRpZozxxtcE1DLEiSIZ4sHODvFW6RwzdWSeAgAkYkHeo7mNiJYpYVRx50dwvNeIxDBdypFIrJ3Uqc8Gp3yT70VG+DWnyXDglAxVdu5gDhdxwMn9s1baFqLorEYyAaPh6/Nfd++BA/8AaGg6hX2Ff19hX2SAafQL8g4rVBc2MjRyZDCri5L5yads++BxWk6rJZNOE2jrII3YjLbM5IHpn96g8WaY6Rl0cOEVT5h+1febSfR/9h6Yp/FOluqqQ/Ax+YUPFGlAg7X+m4UfFOmZUjfwQe45xT+KNLd92HHrhhUnifSSDlJD9HrxNrMV/dPJGCAaMhNE/oBI47Ma6snxGurJ8RrqyfEa6snxmurJ8RrqSfEaJJ7n+9//xAAoEQABAwIDBwUAAAAAAAAAAAABAAIRAyEEEjEgIiMwQVKhEEBRYWL/2gAIAQIBAT8ARyRaZ9Rlm8oNaflZG/pEMA6zymsJVGg2ASjSa4RCr0YNkQRyKbC4qlhwBJUBQnU2uCr4ci40REbeF1N+iZMQUAYV7q8Igxoqmp26boKYZynpCLvtE3CJO6sQdwEFON9sFYYsM53KMP3eVwO/yuB3eVVcM5DTI9//AP/EAC4RAAICAQMBBgMJAAAAAAAAAAECAxEABAUSMRMgITBBUVSBkgYUJEBhcpHR4f/aAAgBAwEBPwDuHHmVOpwauMmgcVw3TytRqo4lNnN03qbtHSNgAB4epOQ7jNE4cS2W62Sc2jdTKlSEWDVjEkVwCD5Gu1iQRlmYADNy3t5mKxdPfO0ckliSThcfzkOtnhfkp+WbPvaS0jGm9jkTh1B7zdDn2jLBIzwLAPdenzzUlS4dCbPUe2Oy8xTeAGMUYxtYv1wlCxINixkTqZAVckUBWaG+zXv6zTh1PhmsiC9vGLDdqaAGRwgi2SlPrR8DiRVHIvjy5UKGRKoWYEHoK/XNjQfeWjZPHqP6yBOKDvsvIZv0esiMR0sPK75GrrOe9fDmv2Ze8/DH6MU7zY/DH6P9zbNO500TzRhZCo5DAKHkUDnFfYZxX2GcV9h+T//Z",
    Nd = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQgBAQACAwEBAAAAAAAAAAAAAAADBAECBQYH/9oADAMBAAIQAxAAAAD5/wDfKi9Qp2UHurxctsL9i/nKny7nHlNYo8uUlg91z498AAAFy3Oz2I1IW7FqO27WNyi87lQM7ib8PAsbZbNfm8GWaapHb5D6W7GVYl94NeksyNxmrTOh6Bp0zMS+ow8eatEOKPOTcJOW70UkNt5MeiVdSc2XlrqQ5b71EctdSGkYHRm0HLPepNZ+W+dTHLaeqDldHVoCXXTM61d9JLDinzU5Bzlu9l9l432bwt/YardPjOvWpqKvKKirykVqK8Ka7GQWynK55RSZOm7hqNuHjNq9Z+v8WHFflpyDnLd6neuZ18bXs7jjkz9jccHY3HB2Nyrss3Ij3uh5xvbjiDsdjccHY3HB2HWtDszaZleDneq2hxT5qbhJy3eibN6zWqBroABXJxLMcrh4xgMSgAAZOfgZ97ow4o85NQ/s08/RCrNuaQrGJpCiaQomkKJpCiaQomkKJpCiaQonsGPoxrSqUqHTwAAAAAAAAAAAAf/EACMQAAAFBAMBAQEBAAAAAAAAAAIDBAUVARIUFgAGExAwIED/2gAIAQEAAQIA4EJSU0n+aJqJhEDS1TYwyPyCIB4zOW+PwCmpxhmYBWFSYfylKU/ssrCwjSCE4RCZ9dM68WwrAqmBe2mJRtsIFEhbBF4WFhDL+M9TXaYVLSySkmEYnUJ3UqiU9OSlKCvbiULMqQIvaYmCHV5+tPDg0IxvDw8PDxqR4Jl64zH8PCifwxsYRKajx9aeAJbmDU9T1PU9T1PU9T1PU9T1PU9T1PUxdTdGIJbx9aeIg9aLqbf6iO9AGX+tTKDCaIVDanVH687eA6jx9aeIa9bGEmiYJHl4FlCJoTQiwwgQaleAyKEUp24R1Xj608KOaOxbft+37ft237ft+37dt+37dt+37eLt712Ghjx9aeHCCqzs7Ozs7Obj9Uc+udsIzs7Ozs7OqtGpTVePrTxR+BZk6J7VLPwS8ePrTxR/kS8ePrSYY3xsbGxsbGxsbGxsbGxsbGxsbGxpSB2M5bSl111111111111111111111aWx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx/wD/xAA5EAABAwIDAwgJAwUBAAAAAAABAAIDBBESUVQhkZMQEzFBYnGS0QUUIiRSYXOhsSMwMiAzgYLBQP/aAAgBAQADPwBOcQ1oJJ6AFUS/wjJUkL8EjcLsv6p3RiRsZLT0EKcvazmnBzr2BFr271M1uN0bg29rkWVSwkGF+66nAuYn7lOWtcInEOFwQLqZgJdE4AG1yNn7bmODmkgjoKmZ/F5G2+xPkOJ7i42tc8hte2xSAYi2w5Z4w0MlcAOixUpNzI69iOnPpVU8HG95Bte5yVVe/PP3qoYbtlPX91VMiwNkcGKoe2z5XFuRPISLono/YfIbNCnyU+SfEAXDpUTvR0bHRkMMEspN9mKNwAf/AKqSKd0MhrIoQ8MYwMBjw/N/zVK18rp2TxtMsgjYwB5DWHr7s1FE4Rz+sF77uZzTQ8YMyntnY0YsALmv2i4cwXcB3BUjZBidO6wBLWgOdZwu02H3VLHggbT1Doud5iRg2m2DEGC2+6LS0Q48WKO4fYbJjZm8r1aSLBidHJiDSbXuw4XCw+axQH0b6s8SRsBDr7DM0YngdRu1RT0RY+J7I4IopC7EPZDhief9lRPsWPnAL8HtgNIfbFY5AhUlLTQxilq3xzlwf7NnktthOHskr1V0sT4HnHO2M2cATG9pdgPzKxzuY0bSVPkp8lP8Kcw2cOXCZHDpDHn7KpbI4B7t6qvjdvU1SGh7iQCo3egsYijx8xIMeP55fFkpof0jTSz7LYnTgxHZ0gFSS1EcrQZogzmXczLhOJmwuN+pyeyazafEwlpa+GYAsAFsDr71JG+ZrPR7JsTnubIyUYRjFrG/wqajpXSNayJ5MQDo3nHsbttb7qdj3TtihcRPjEbZNrmlgaQ05A7U9kgkFCJw9kfsiUYmOZ8RPW6+1Gpmo5RDEebE7zGX7XkPsGH/AIqU1opGlzqmN98Rl/Se8bSAPn0KeeGsEMcMWIRljRJtdhBu0J4jhPqoBEpMnPzBxIDDYk5XU1RF/EzSQg3vLaRwkFrgn4UGS1TJhHMRM1wLpdrQW3s45Zp0FWZGHa1xsQqr43b1VfG7eql8li929e8v7+XZL9N/4RMru9OKfkpVLl9lLkpcvspVKVLkhFSx08tCyUMc4tJJafa7lNV1DpubawWADWjYABYBSXupVLa1vspApclJkU/JOCtKF7y/v5dkv03/AIWOd3ep6ppMUJfa17Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTOVRRtBmhczFe1+uywTL3l/fy/wB36b/wgag96DIZfmGqMC5cOr7pmYTLs7Rso2329BF0y4GLpTHlwbttZMBIv0Dao9ntdKjAviCaSLEbRdMcwOvYEH7INaXHoATSG32E9SjAJvexA3pgNiVHa+LrtyB0FP8AIPVqhe8v7+X+79N/4Vqj/KDoZe5qDSDiJsRb/CaCDidsFvtZBotjP8sS7WzFcC3zum4g66wX9om4A7gEHOeS7+QssNsLrHr2DagCfaNtn2N17Ydi6ARZEsDQSdp67WBQc1zT1iyBI2kAAAjOyGEjGegAHK20LE7FiN7f8srtaH2FidxRBccRN/sgIIO56vUL3l/fy/3fpv8AwsE571JRMcIy32rXuL9Cmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8KntsMfhU1e1gkLLMvbCLdKxzr3l/fy7Jfpv8Awi2Z3enN60/NPzKfmU/Mp+ZT8yufrYI33LXOsV6IHTBMe55XoymgY+OGQEyBvtPv0qH0V6VNNTYgwRMdtNzdyfmU/Mp+ZT8yn5lPzKfmnO61eYL3l/fy7Jfpv/C/Vd+w+N7XscQ4dBXpbX1HFf5r0o62Ksmdtv7T3O/KqKuTnJ5XPfa13G5/Z/VC95f38uyX6b/wv1Xf+T9UL3l/fyxtc8PcGgscLn5hUz3l3rEe8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqZjr+sR7z5Jj6h5Ybi/I74SnjoBU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aTz0gp3wlUGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bV//8QANREAAQIDAwkHAgcAAAAAAAAAAQACAwQRElORBRATFBUWIjRUBiAhMUFRYWJxMDI1UnJzsf/aAAgBAgEBPwBGzT1rnFPVcPyuD5XBT170tCEWM1hNAUWSAJGkiYICHbfoyS2z6pza0q1GEz9qa0CoDU6E3yA8UGggmlfRBrQRw0JT2tGjteDbXirMheRMFEgS+gdFhPcaOAIIzSPMsU5Ow5dzy9wAqtty163Fbclr1uK25LXrcVtyWvW4o5egEUMVmIW3Ja9bituS163Fbclr1uKg5Xl4rw1sRpJ+VCIdk+KfrbmkeZYu0tbMT2tKjPcrgRsUNCVRnuuH3RDfD7rgVGUHisnc7Bp7n/FKfpkT+bc0jzLFPyEOZL2vAIqt35a7C3flrsLd+WuwoXZiDFBLWMUTsvChgksYt35a7C3flrsLd+WuwoGRJeDEDxDAIUFtnJ8UfW3NI8yxP/O779wOcPIlFzj5k91nIxf7G5oEXQxWvpWiMzLkk6s3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lRZpjoJhMhBgJBP4/wD/xAA2EQABAwAGBwUGBwAAAAAAAAABAAIDBAURFCFSEBIVQVFUkRMgNHOxBiIxM2FxIzA1RFOBkv/aAAgBAwEBPwDSCD8DotWPfosLZ52RuNgKMdWgkdrJgcqrp0THQCJztQygAnDcoZuzLyyYNBaLXAjGz+8CfqmVnSbR+OCXN3loHqpZnvEUsk+sLHBotA97BUespbA98gLADbiMpPHiFJO5j4mmQstIfrHiSAXDH4FPnmlY93bFzIyLRrAYm0DEFVVKJaVNrvJFkes4fXeBatSrf5Zf8qWj0a7Omhe42OAII46Ku8XGhA6SRwA3lXCXIVcJMh6LZ8mQ9FcJMhTKnayQyNidrG3jvxKuEmQq4SZCrhJkKfQ5GAktKYLKum8xvodFXeLjVBs7Z33K97gveWKxWKFqxVruCpPyHr9hP5rfQ6Ku8XGm0h0UjiDvK2jLmK2jLmK2jLmKrL2qhq18bJ+0JeCRqqge1sFOlbHEZASHHEZVtGXMVtGTMVtGXMVJTpHtLS42Jhtq6fzG+h0Vd4uNSfMf9z3HwxSEF8bXfcWpkEDDrMiY08QO7H+nTeY30OijzGCZsgFtm5Gl0Ukk0RvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUqamRvgMMcAYC4E/n//Z",
    jd = N('<div class="absolute origin-top-left bg-black"><img class="absolute top-0 left-0 wh-full object-cover"><img>'),
    Hd = "absolute top-0 left-0 wh-full object-cover",
    Ud = () => (() => {
        const e = jd(),
            n = e.firstChild,
            t = n.nextSibling;
        return e.style.setProperty("width", "150px"), e.style.setProperty("height", "85px"), e.style.setProperty("transform", "translate(403px, 924px) rotateZ(-4deg)"), le(n, "src", zd), le(t, "src", Nd), X(() => te(t, ce(Hd, {
            hidden: !Ze.archive.hasNew()
        }))), e
    })(),
    Fd = N('<div class="absolute top-0 left-0 wh-full isolate">'),
    Gd = e => {
        const [n, t] = Y(!1), o = st(() => on() ? [on().srcWebm, on().srcMp3] : []), l = st(() => [ro().srcWebm, ro().srcMp3], {
            loop: !0,
            autoplay: !0
        }), c = st([ac, lc]);
        (async () => {
            await qr(6e4);
            const p = c.internalInstance();
            p && (p.on("end", async () => {
                await qr(6e5), c.play()
            }), c.play())
        })();
        const d = p => {
            if (p === "answering-machine") {
                const r = o.internalInstance();
                if (!r) return;
                const a = r.playing(),
                    f = r.seek() === 0;
                ne.trackClickEvent("answering-machine", a ? "pause" : "play", "cctv-room"), a ? (l.setVolume(1), c.setVolume(1), o.pause()) : (l.setVolume(.3), c.setVolume(.3), o.play(), f && (Ze.answeringMachineTrack.setLastPlayed(), r.once("end", () => {
                    o.stop(), l.setVolume(1), c.setVolume(1)
                })))
            } else p === "log-book" && (ne.trackClickEvent("logbook", "open", "cctv-room"), e.roomSound.play("logbook-open")), p === "terminal" && (ne.trackClickEvent("terminal", "open", "cctv-room"), e.roomSound.play("terminal-open")), we.openApp(p)
        };
        return (() => {
            const p = Fd();
            return C(p, x(ai, {
                get each() {
                    return me.screens
                },
                children: r => x(Od, {
                    screen: r,
                    onClick: () => {
                        r.isEnabled() && r.position() === "c" ? (n() || (me.Supervisor.dispatch("play"), t(!0)), me.Supervisor.setControlsVisible(!0)) : me.Supervisor.positionScreenAtCenter(r), e.roomSound.play(qs(["screen-tap-1", "screen-tap-2", "screen-tap-3"]))
                    }
                })
            }), null), C(p, x(Ud, {}), null), C(p, x(Ed, {}), null), C(p, x(Vd, {}), null), C(p, x(Md, {
                onItemSelected: d
            }), null), C(p, x(ze, {
                get when() {
                    return me.Supervisor.controlsVisible()
                },
                get children() {
                    return x(gd, {})
                }
            }), null), X(() => (rt.currentStatus() === Ut.done ? "visible" : "hidden") != null ? p.style.setProperty("visibility", rt.currentStatus() === Ut.done ? "visible" : "hidden") : p.style.removeProperty("visibility")), p
        })()
    },
    Zd = N('<div class="absolute top-0 left-0 wh-full z-modal">'),
    lr = e => x(ze, {
        get when() {
            return e.isOpen
        },
        get children() {
            const n = Zd();
            return C(n, () => e.children), n
        }
    }),
    Yd = "/assets/logbook-36af03c8.mp3",
    Wd = "/assets/logbook-dccdaf17.ogg",
    qd = N('<div><img><img><img class="absolute left-1/2 w-1/2 h-full"><img><img><div class="absolute top-0 left-0 wh-full flex"><button class="flex-1"></button><button class="flex-1"></button></div><button class="absolute top-20 left-20 w-100 h-100 flex-center">'),
    Qd = () => [...js().map(e => e.src), null].reverse(),
    nn = () => Gs(Qd()).map((e, n) => ({
        index: n,
        left: (e == null ? void 0 : e[0]) || null,
        right: (e == null ? void 0 : e[1]) || null
    })),
    Kd = e => {
        const n = [],
            [t, i] = Y(!1);
        mn(async () => {
            const h = n.map(v => new Promise((g, m) => {
                if (!v.src) return g();
                v.onload = () => g(), v.onerror = () => m()
            }));
            try {
                await Promise.all(h), i(!0)
            } catch (v) {
                e.onClose()
            }
        });
        const [o, s] = Y(nn().length - 1), [l, c] = Y([]), u = () => {
            const h = o() - 1;
            return nn()[h] ? !l().includes(h) : !1
        };
        _e(() => {
            const h = o() - 1,
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
                !u() && o() !== 0 && (ne.trackClickEvent("pages", "prev", "logbook"), s(h => h - 1), f.play("page-turn", {
                    interrupt: !0
                }))
            },
            p = () => {
                o() >= nn().length - 1 || (ne.trackClickEvent("pages", "next", "logbook"), f.play("page-turn", {
                    interrupt: !0
                }), s(h => h + 1))
            },
            r = () => nn()[o()],
            a = () => o() === 0,
            f = st([Wd, Yd], {
                sprite: {
                    "page-turn": [0, 933.3333333333334]
                }
            });
        return (() => {
            const h = qd(),
                v = h.firstChild,
                g = v.nextSibling,
                m = g.nextSibling,
                y = m.nextSibling,
                A = y.nextSibling,
                b = A.nextSibling,
                $ = b.firstChild,
                j = $.nextSibling,
                U = b.nextSibling;
            return Ee(L => n.push(L), v), le(v, "src", Fs), Ee(L => n.push(L), g), le(g, "src", Hs), Ee(L => n.push(L), m), le(m, "src", Us), Ee(L => n.push(L), y), Ee(L => n.push(L), A), $.$$click = () => d(), j.$$click = () => p(), U.$$click = () => {
                e.onClose()
            }, C(U, x(oe, {
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
const Jd = e => x(lr, {
        get isOpen() {
            return we.currentOpenApp.mainApp === "log-book"
        },
        get children() {
            return x(Kd, {
                onClose: () => {
                    var n;
                    ne.trackClickEvent("modal", "close", "logbook"), we.closeApp(), (n = e.onClose) == null || n.call(e)
                }
            })
        }
    }),
    Xd = "/assets/terminal-2aa26d8b.mp3",
    ep = "/assets/terminal-ca9f8876.ogg",
    Xs = Va(),
    tp = e => {
        const n = st(e.src, e.options);
        return x(Xs.Provider, {
            value: n,
            get children() {
                return e.children
            }
        })
    };

function Yt() {
    const e = Wo(Xs);
    if (e === void 0) throw new Error("useAudio must be used within a AudioProvider");
    return e
}
const np = "\n      @@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@@\n @@                          @@@@@\n@                         @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@ \n@                         @@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
    rp = "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n     @@      @@@@@@@@      @@  @@\n      @@  @@@@@@@@@@@@@@@@@@  @@\n       @@  @@@@@@@@@@@@@@@@  @@\n        @@  @@@@@@@@@@@@@@  @@\n         @@  @@@@@@@@@@@@  @@\n           @@  @@@@@@@@  @@\n             @@  @@@@  @@\n              @@  @@  @@\n             @@  @@@@  @@\n           @@     @@     @@\n         @@                @@\n        @@        @@        @@\n       @@       @@@@@@       @@\n      @@      @@@@@@@@@@      @@\n     @@     @@@@@@@@@@@@@@     @@\n    @@    @@@@@@@@@@@@@@@@@     @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@                          @@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
    ip = "\n _   ____                       _ _              _    _           _     _\n| | / ___|  ___  ___ _   _ _ __(_) |_ _   _     / \\  | | ___ _ __| |_  | |\n| | \\___ \\ / _ \\/ __| | | | '__| | __| | | |   / _ \\ | |/ _ \\ '__| __| | |\n|_|  ___) |  __/ (__| |_| | |  | | |_| |_| |  / ___ \\| |  __/ |  | |_  |_|\n(_) |____/ \\___|\\___|\\__,_|_|  |_|\\__|\\__, | /_/   \\_\\_|\\___|_|   \\__| (_)\n                                      |___/\n",
    op = "\n    __\n   / /\n  / /\n / /\n/_/\n",
    sp = "\n _\n(_)\n _\n(_)\n",
    ap = {
        archive: np,
        timecoder: rp,
        securityAlert: ip,
        forwardSlash: op,
        colon: sp
    },
    lp = N("<span>"),
    At = e => (() => {
        const n = lp();
        return C(n, () => ap[e.name]), X(() => te(n, ce("font-vt-220 font-medium leading-none whitespace-pre", e.class))), n
    })(),
    cp = N("<span>Security Archives"),
    up = N("<span>Time Coder"),
    fp = N('<div class="wh-full flex justify-center space-x-368 items-end pb-144"><div class="flex flex-col items-center space-y-56" role="button"></div><div class="flex flex-col items-center space-y-56 text-shadow-terminal" role="button">'),
    Po = bn("relative inline-block w-[600px] text-center py-8", {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black [&>span]:text-shadow-none", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light text-shadow-terminal border"
            }
        }
    }),
    dp = e => {
        const n = Yt(),
            [t, i] = Y();
        let o;
        const s = l => {
            n.play("click", {
                interrupt: !0
            }), i(l), clearTimeout(o), o = setTimeout(() => {
                ne.trackClickEvent("items", "open-".concat(l), "terminal-home"), e.setCurrentOpenApp(l)
            }, 1e3)
        };
        return Ae(() => {
            clearTimeout(o)
        }), (() => {
            const l = fp(),
                c = l.firstChild,
                u = c.nextSibling;
            return c.$$click = () => s("security-tape-archives"), C(c, x(At, {
                name: "archive",
                class: "text-purple text-[21px] text-shadow-terminal"
            }), null), C(c, x(oe, {
                size: "terminal-md",
                get class() {
                    return Po({
                        selected: t() === "security-tape-archives"
                    })
                },
                get children() {
                    return cp()
                }
            }), null), u.$$click = () => s("timecoder"), C(u, x(At, {
                name: "timecoder",
                class: "text-purple text-[18px] text-shadow-terminal"
            }), null), C(u, x(oe, {
                size: "terminal-md",
                get class() {
                    return Po({
                        selected: t() === "timecoder"
                    })
                },
                get children() {
                    return up()
                }
            }), null), l
        })()
    };
$e(["click"]);
const pp = N('<div class="absolute top-0 left-0 wh-full flex flex-col items-center pt-72 bg-terminal"><img class="block w-[732px] mb-32 text-blue-light drop-shadow-terminal transform-gpu" width="873" height="621"><div class="flex space-x-32 text-blue-light"><div class="bg-blue-light shadow-terminal"></div><div class="w-24 h-full bg-blue-light shadow-terminal">'),
    vp = () => {
        const [e, n] = Y(!0), t = setTimeout(() => n(!1), 1e3);
        return Ae(() => clearInterval(t)), x(ze, {
            get when() {
                return e()
            },
            get children() {
                const i = pp(),
                    o = i.firstChild,
                    s = o.nextSibling,
                    l = s.firstChild;
                return le(o, "src", hi), C(i, x(oe, {
                    as: "p",
                    size: "terminal-sm",
                    class: "text-center whitespace-pre text-purple mb-56 text-shadow-terminal",
                    children: "**********************************************************\n\n(c) copyright Starr Park corporation, 1995. All rights reserved.\nStarr Park Security Services is a registered\ntrademark of Starr Park corporation. \n          \n**********************************************************"
                }), s), C(l, x(oe, {
                    as: "span",
                    size: "terminal-md",
                    class: "text-black px-16 py-8",
                    children: "Loading"
                })), i
            }
        })
    },
    hp = 10,
    Eo = e => {
        const n = _s(e);
        return {
            date: n.format("DD.MM.[1995]"),
            time: n.format("HH:mm")
        }
    },
    mp = (e = {}) => {
        const [n, t] = Y(Eo(e.timezone)), i = () => {
            const s = Eo(e.timezone);
            t(s)
        }, o = setInterval(() => i(), hp * 1e3);
        return Ae(() => clearInterval(o)), n
    },
    Co = N("<span>"),
    gp = N("<span>Starr Park Security System"),
    _p = () => {
        const e = mp({
            timezone: ds
        });
        return x(oe, {
            as: "p",
            class: "flex justify-between items-center px-144 pt-64 text-blue-dark text-shadow-terminal",
            size: "terminal-sm",
            get children() {
                return [(() => {
                    const n = Co();
                    return C(n, () => e().date), n
                })(), gp(), (() => {
                    const n = Co();
                    return C(n, () => e().time), n
                })()]
            }
        })
    },
    yp = N('<div><div class="flex w-full"><button><span>&lt;-</span></button><div class="flex items-center flex-1 h-full px-32 bg-blue-light text-blue-light shadow-terminal"></div></div><div class="flex-1 min-h-0 px-100">'),
    bp = "w-100 h-100 flex-center font-vt-220 font-medium leading-none text-shadow-terminal",
    Rr = e => {
        const n = Yt(),
            t = () => {
                var o;
                const i = n.play("click", {
                    interrupt: !0
                });
                (o = n == null ? void 0 : n.internalInstance()) == null || o.once("end", () => {
                    var s;
                    ne.trackClickEvent("app-bar", "back", "terminal"), (s = e.onBack) == null || s.call(e)
                }, i)
            };
        return (() => {
            const i = yp(),
                o = i.firstChild,
                s = o.firstChild,
                l = s.nextSibling,
                c = o.nextSibling;
            return s.$$click = () => t(), C(l, x(oe, {
                as: "span",
                size: "terminal-lg",
                class: "text-black",
                get children() {
                    return e.title
                }
            })), C(c, () => e.children), X(u => {
                const d = ce("flex flex-col flex-1 pt-64 px-44"),
                    p = ce(bp, "text-purple text-[80px] tracking-[-10px]");
                return d !== u._v$ && te(i, u._v$ = d), p !== u._v$2 && te(s, u._v$2 = p), u
            }, {
                _v$: void 0,
                _v$2: void 0
            }), i
        })()
    };
$e(["click"]);
const wp = "/assets/terminal-typing-8b10cd31.mp3",
    Ap = "/assets/terminal-typing-20a23c49.ogg";
class ea extends Error {
    constructor(t, i) {
        super(i);
        Wi(this, "statusCode");
        this.statusCode = t, Object.setPrototypeOf(this, new.target.prototype)
    }
}
const xp = "https://bmwryv10bd.execute-api.us-east-1.amazonaws.com",
    ta = {
        base: "".concat(xp),
        getArchiveByCode: e => "".concat(ta.base, "/timecoder/").concat(e)
    },
    Sp = async ({
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
    }, Tp = N('<div class="flex flex-col space-y-120 w-full pt-72 pb-32"><div class="flex justify-between"><div class="flex space-x-24 items-center"></div><div class="flex space-x-24 items-center"></div></div><div class="flex flex-col space-y-48 items-center"><button class="inline-flex px-120 py-8 text-blue-light border text-shadow-terminal">'), kp = N('<input pattern="[0-9]*" inputmode="numeric">'), $p = {
        day: "00",
        month: "00",
        year: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
    }, Un = "text-blue-light text-[20px]", Ip = e => {
        const [n, t] = Gt($p), i = Yt(), o = {
            "typing-1": [0, 200],
            "typing-2": [2e3, 166.66666666666652],
            "typing-3": [4e3, 183.33333333333357],
            "typing-4": [6e3, 183.33333333333357],
            "typing-5": [8e3, 199.9999999999993],
            "typing-6": [1e4, 233.33333333333252],
            "typing-7": [12e3, 250]
        }, s = st([Ap, wp], {
            sprite: o
        }), [l, c] = Y(void 0), [u, d] = Y(!1), p = (v, g) => {
            t(v, g), s.play(qs(Object.keys(o)))
        };
        let r;
        const a = async () => {
            i.play("click", {
                interrupt: !0
            }), d(!0), c(void 0);
            const v = Object.values(n).join("");
            let g;
            try {
                g = await Sp({
                    params: {
                        code: v
                    }
                })
            } catch (m) {
                return ne.trackClickEvent("timecoder", "submit", "terminal-timecoder", {
                    archiveCode: v,
                    result: "error"
                }), m instanceof ea && m.statusCode === 404 ? (i.play("timecoder-error", {
                    interrupt: !0
                }), c("Archive not found!")) : (i.play("timecoder-error", {
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
            const v = Tp(),
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
            }), null), b.$$click = () => a(), C(b, x(oe, {
                size: "terminal-md",
                children: "ENTER"
            })), C(A, x(ze, {
                get when() {
                    return !!l()
                },
                get children() {
                    return x(oe, {
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
                    return x(oe, {
                        size: "terminal-sm",
                        class: "text-green text-shadow-terminal",
                        children: "Loading..."
                    })
                }
            }), null), X(() => b.disabled = u()), v
        })()
    }, Dt = e => {
        const n = Yt(),
            [t, i] = Y(0),
            o = u => {
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
                (d === "Delete" || d === "Backspace") && i(p => p !== 0 ? p - 1 : p), /^[0-9]$/.test(d) && i(p => p + 1)
            },
            c = u => {
                i(0)
            };
        return (() => {
            const u = kp();
            return u.addEventListener("focus", c), u.$$click = s, u.$$keydown = l, u.$$input = o, X(d => {
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
const Op = N('<div class="wh-full flex flex-col w-full pb-48"><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible"></button><div class="flex-1 flex flex-col"></div><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible">'),
    Do = N("<span>"),
    Pp = N('<button class="py-16 px-32 text-green text-shadow-terminal">'),
    Fn = 7,
    Ep = e => {
        const n = Yt(),
            [t, i] = Y(0),
            o = () => Math.ceil(un().length / Fn),
            s = () => un().slice(t() * Fn, t() * Fn + Fn);
        return (() => {
            const l = Op(),
                c = l.firstChild,
                u = c.nextSibling,
                d = u.nextSibling;
            return c.$$click = () => {
                ne.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"), n.play("click", {
                    interrupt: !0
                }), i(p => p - 1)
            }, C(c, x(oe, {
                size: "terminal-md",
                class: "-rotate-90",
                children: ">"
            })), C(u, x(ai, {
                get each() {
                    return s()
                },
                children: p => {
                    const r = gs(p.postDate, p.dropTime.hours, p.dropTime.minutes),
                        a = Nl(r, "DD.MM.[1995] HH:mm"),
                        f = a.split(" ")[0],
                        h = a.split(" ")[1];
                    return (() => {
                        const v = Pp();
                        return v.$$click = () => {
                            ne.trackClickEvent("tape-archives", "open-playlist", "terminal-tape-archives", {
                                playlistId: p.playlistId
                            }), n.play("click", {
                                interrupt: !0
                            }), e.onLoadPlaylist(p)
                        }, C(v, x(oe, {
                            size: "terminal-md",
                            class: "flex space-x-272",
                            get children() {
                                return [(() => {
                                    const g = Do();
                                    return C(g, f), g
                                })(), " ", (() => {
                                    const g = Do();
                                    return C(g, h), g
                                })()]
                            }
                        })), v
                    })()
                }
            })), d.$$click = () => {
                ne.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"), n.play("click", {
                    interrupt: !0
                }), i(p => p + 1)
            }, C(d, x(oe, {
                size: "terminal-md",
                class: "rotate-90",
                children: ">"
            })), X(p => {
                const r = t() === 0,
                    a = t() >= o() - 1;
                return r !== p._v$ && (c.disabled = p._v$ = r), a !== p._v$2 && (d.disabled = p._v$2 = a), p
            }, {
                _v$: void 0,
                _v$2: void 0
            }), l
        })()
    };
$e(["click"]);
const Cp = N('<span class="text-black">Access Security System'),
    Dp = N('<div class="wh-full flex flex-col items-center space-y-76 pt-76 "><img class="w-[872px] drop-shadow-terminal text-blue-light transform-gpu" width="873" height="621">'),
    Mp = e => {
        const n = setTimeout(() => e.setCurrentOpenApp("home"), 2e3);
        return Ae(() => clearInterval(n)), (() => {
            const t = Dp(),
                i = t.firstChild;
            return le(i, "src", hi), C(t, x(oe, {
                size: "terminal-md",
                class: "px-16 py-8 bg-blue-light text-blue-light shadow-terminal",
                get children() {
                    return Cp()
                }
            }), null), t
        })()
    },
    Bp = N('<span class="text-black">unwatched security footage'),
    Lp = N('<div class="flex-1 pt-144 pb-124 px-144"><div class="relative wh-full flex flex-col space-y-92 items-center justify-center border-x-2 border-b-2 border-purple"><div class="absolute top-0 left-0 wh-full flex items-start"><div class="flex-1 border-t-2 border-purple"></div><div class="flex-1 border-t-2 border-purple"></div></div><div class="flex space-x-184"><button><span>Dismiss</span></button><button><span>Open'),
    Mo = bn(["relative px-24 py-8", wn({
        size: "terminal-md"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light text-shadow-terminal border"
            }
        }
    }),
    Rp = e => {
        const n = Yt(),
            [t, i] = Y();
        let o;
        const s = l => {
            n.play("click", {
                interrupt: !0
            }), i(l), clearTimeout(o), o = setTimeout(() => {
                l === "open" ? e.onLoadPlaylist() : ne.trackClickEvent("notification", "dismiss", "terminal-notification-screen"), Ze.archive.dismissNotification()
            }, 1e3)
        };
        return Ae(() => {
            clearTimeout(o)
        }), (() => {
            const l = Lp(),
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
            }), p), C(c, x(oe, {
                as: "div",
                size: "terminal-xl",
                class: "px-56 py-32 bg-orange text-orange shadow-terminal",
                get children() {
                    return Bp()
                }
            }), r), a.$$click = () => s("dismiss"), f.$$click = () => s("open"), X(h => {
                const v = Mo({
                        selected: t() === "dismiss"
                    }),
                    g = Mo({
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
const Vp = N('<div class="realtive wh-full flex flex-col bg-terminal">'),
    zp = e => {
        const n = () => we.currentOpenApp.mainApp,
            t = () => we.currentOpenApp.mainApp === "terminal" ? we.currentOpenApp.terminalApp : void 0,
            i = (o, s) => {
                var l;
                me.Supervisor.switchFeed({
                    archivePlaylist: {
                        playlistId: o.playlistId,
                        metadata: {
                            date: gs(o.postDate, o.dropTime.hours, o.dropTime.minutes, o.dropTime.seconds)
                        }
                    },
                    source: s
                }), Ze.archive.setLastPlayed(o.postDate), (l = e.onPlaylistLoad) == null || l.call(e), we.closeApp()
            };
        return x(lr, {
            get isOpen() {
                return n() === "terminal"
            },
            get children() {
                return x(tp, {
                    src: [ep, Xd],
                    options: {
                        sprite: {
                            click: [0, 220.6122448979592],
                            "timecoder-error": [2e3, 283.3333333333332]
                        }
                    },
                    get children() {
                        const o = Vp();
                        return C(o, x(_p, {}), null), C(o, x(rs, {
                            get fallback() {
                                return x(Mp, {
                                    setCurrentOpenApp: s => we.openApp(s)
                                })
                            },
                            get children() {
                                return [x(Bt, {
                                    get when() {
                                        return Ze.archive.hasNew()
                                    },
                                    get children() {
                                        return x(Rp, {
                                            onLoadPlaylist: () => {
                                                const s = un()[0];
                                                s && (ne.trackClickEvent("notification", "open-playlist", "terminal-notification-screen", {
                                                    playlistId: s.playlistId
                                                }), i(s, "security-tape-archives"))
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
                                                return x(dp, {
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
                                                return x(Ep, {
                                                    onLoadPlaylist: s => i(s, "security-tape-archives")
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
                                                return x(Ip, {
                                                    onLoadPlaylist: s => i(s, "timecoder")
                                                })
                                            }
                                        })
                                    }
                                })]
                            }
                        }), null), C(o, x(vp, {}), null), o
                    }
                })
            }
        })
    },
    Np = "/assets/cctv-room-ee8509df.mp3",
    jp = "/assets/cctv-room-1978b2ca.ogg";

function Hp(e) {
    const n = ye({}, e),
        t = ye({}, e),
        i = {},
        o = l => {
            let c = i[l];
            if (!c) {
                if (!Xn()) return n[l];
                i[l] = c = Y(n[l], {
                    internal: !0
                }), delete n[l]
            }
            return c[0]()
        };
    for (const l in e) Object.defineProperty(t, l, {
        get: () => o(l),
        enumerable: !0
    });
    const s = (l, c) => {
        const u = i[l];
        if (u) return u[1](c);
        l in n && (n[l] = io(c, [n[l]]))
    };
    return [t, (l, c) => {
        if (cc(l)) {
            const u = fe(() => Object.entries(io(l, t)));
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

function Up(e) {
    const n = typeof e == "function",
        [t, i] = Hp(n ? na : Vr(e)),
        o = new ResizeObserver(([s]) => i(Vr(s.target)));
    return Ae(() => o.disconnect()), n ? _e(() => {
        const s = e();
        s && (i(Vr(s)), o.observe(s), Ae(() => o.unobserve(s)))
    }) : (o.observe(e), Ae(() => o.unobserve(e))), t
}
const Fp = e => {
        const [n, t] = Y({
            x: 0,
            y: 0
        }), [i, o] = Y(1), s = Up(e.containerRef);
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
            }), o(a)
        }), {
            position: n,
            scaleFactor: i
        }
    },
    Gp = N("<div><video muted playsinline>"),
    Zp = 7.1,
    Yp = 7.7,
    Wp = e => {
        let n;
        const [t, i] = Y(void 0);
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
                return console.error("Error during transition video playback, skipping transition...", u), i("error"), e.onEnded()
            } finally {
                n.pause()
            }
            await new Promise(u => {
                if (!n) return u();
                n.load(), n.addEventListener("canplaythrough", () => u())
            }), await qr(600), await n.play(), i("done"), e.onLoaded();
            const l = () => {
                !n || n.currentTime < Zp || (e.onEnded(), n.removeEventListener("timeupdate", l))
            };
            n.addEventListener("timeupdate", l);
            const c = () => {
                n && (n.currentTime = Yp, n.play())
            };
            n.addEventListener("ended", c)
        }), _e(Ra(me.Supervisor.allLoaded, o => {
            n && (o ? n.pause() : n.play())
        }, {
            defer: !0
        })), (() => {
            const o = Gp(),
                s = o.firstChild;
            s.addEventListener("error", c => {
                console.error("Error during transition video playback, skipping transition...", c), i("error"), e.onEnded()
            });
            const l = n;
            return typeof l == "function" ? Ee(l, s) : n = s, X(c => {
                const u = ce("wh-full", t() === "error" && "bg-black"),
                    d = fe(vi).transitionVideoSrc,
                    p = ce("wh-full object-contain"),
                    r = t() === "done" ? "visible" : "hidden";
                return u !== c._v$ && te(o, c._v$ = u), d !== c._v$2 && le(s, "src", c._v$2 = d), p !== c._v$3 && te(s, c._v$3 = p), r !== c._v$4 && ((c._v$4 = r) != null ? s.style.setProperty("visibility", r) : s.style.removeProperty("visibility")), c
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), o
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
    qp = function() {
        return xt.some(function(e) {
            return e.activeTargets.length > 0
        })
    },
    Qp = function() {
        return xt.some(function(e) {
            return e.skippedTargets.length > 0
        })
    },
    Bo = "ResizeObserver loop completed with undelivered notifications.",
    Kp = function() {
        var e;
        typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
            message: Bo
        }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = Bo), window.dispatchEvent(e)
    },
    hn;
(function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box"
})(hn || (hn = {}));
var St = function(e) {
        return Object.freeze(e)
    },
    Jp = function() {
        function e(n, t) {
            this.inlineSize = n, this.blockSize = t, St(this)
        }
        return e
    }(),
    ra = function() {
        function e(n, t, i, o) {
            return this.x = n, this.y = t, this.width = i, this.height = o, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, St(this)
        }
        return e.prototype.toJSON = function() {
            var n = this,
                t = n.x,
                i = n.y,
                o = n.top,
                s = n.right,
                l = n.bottom,
                c = n.left,
                u = n.width,
                d = n.height;
            return {
                x: t,
                y: i,
                top: o,
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
    gi = function(e) {
        return e instanceof SVGElement && "getBBox" in e
    },
    ia = function(e) {
        if (gi(e)) {
            var n = e.getBBox(),
                t = n.width,
                i = n.height;
            return !t && !i
        }
        var o = e,
            s = o.offsetWidth,
            l = o.offsetHeight;
        return !(s || l || e.getClientRects().length)
    },
    Lo = function(e) {
        var n;
        if (e instanceof Element) return !0;
        var t = (n = e == null ? void 0 : e.ownerDocument) === null || n === void 0 ? void 0 : n.defaultView;
        return !!(t && e instanceof t.Element)
    },
    Xp = function(e) {
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
    Ro = /auto|scroll/,
    ev = /^tb|vertical/,
    tv = /msie|trident/i.test(an.navigator && an.navigator.userAgent),
    Re = function(e) {
        return parseFloat(e || "0")
    },
    zt = function(e, n, t) {
        return e === void 0 && (e = 0), n === void 0 && (n = 0), t === void 0 && (t = !1), new Jp((t ? n : e) || 0, (t ? e : n) || 0)
    },
    Vo = St({
        devicePixelContentBoxSize: zt(),
        borderBoxSize: zt(),
        contentBoxSize: zt(),
        contentRect: new ra(0, 0, 0, 0)
    }),
    oa = function(e, n) {
        if (n === void 0 && (n = !1), Gn.has(e) && !n) return Gn.get(e);
        if (ia(e)) return Gn.set(e, Vo), Vo;
        var t = getComputedStyle(e),
            i = gi(e) && e.ownerSVGElement && e.getBBox(),
            o = !tv && t.boxSizing === "border-box",
            s = ev.test(t.writingMode || ""),
            l = !i && Ro.test(t.overflowY || ""),
            c = !i && Ro.test(t.overflowX || ""),
            u = i ? 0 : Re(t.paddingTop),
            d = i ? 0 : Re(t.paddingRight),
            p = i ? 0 : Re(t.paddingBottom),
            r = i ? 0 : Re(t.paddingLeft),
            a = i ? 0 : Re(t.borderTopWidth),
            f = i ? 0 : Re(t.borderRightWidth),
            h = i ? 0 : Re(t.borderBottomWidth),
            v = i ? 0 : Re(t.borderLeftWidth),
            g = r + d,
            m = u + p,
            y = v + f,
            A = a + h,
            b = c ? e.offsetHeight - A - e.clientHeight : 0,
            $ = l ? e.offsetWidth - y - e.clientWidth : 0,
            j = o ? g + y : 0,
            U = o ? m + A : 0,
            L = i ? i.width : Re(t.width) - j - $,
            B = i ? i.height : Re(t.height) - U - b,
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
        var i = oa(e, t),
            o = i.borderBoxSize,
            s = i.contentBoxSize,
            l = i.devicePixelContentBoxSize;
        switch (n) {
            case hn.DEVICE_PIXEL_CONTENT_BOX:
                return l;
            case hn.BORDER_BOX:
                return o;
            default:
                return s
        }
    },
    nv = function() {
        function e(n) {
            var t = oa(n);
            this.target = n, this.contentRect = t.contentRect, this.borderBoxSize = St([t.borderBoxSize]), this.contentBoxSize = St([t.contentBoxSize]), this.devicePixelContentBoxSize = St([t.devicePixelContentBoxSize])
        }
        return e
    }(),
    aa = function(e) {
        if (ia(e)) return 1 / 0;
        for (var n = 0, t = e.parentNode; t;) n += 1, t = t.parentNode;
        return n
    },
    rv = function() {
        var e = 1 / 0,
            n = [];
        xt.forEach(function(l) {
            if (l.activeTargets.length !== 0) {
                var c = [];
                l.activeTargets.forEach(function(d) {
                    var p = new nv(d.target),
                        r = aa(d.target);
                    c.push(p), d.lastReportedSize = sa(d.target, d.observedBox), r < e && (e = r)
                }), n.push(function() {
                    l.callback.call(l.observer, c, l.observer)
                }), l.activeTargets.splice(0, l.activeTargets.length)
            }
        });
        for (var t = 0, i = n; t < i.length; t++) {
            var o = i[t];
            o()
        }
        return e
    },
    zo = function(e) {
        xt.forEach(function(t) {
            t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function(o) {
                o.isActive() && (aa(o.target) > e ? t.activeTargets.push(o) : t.skippedTargets.push(o))
            })
        })
    },
    iv = function() {
        var e = 0;
        for (zo(e); qp();) e = rv(), zo(e);
        return Qp() && Kp(), e > 0
    },
    zr, la = [],
    ov = function() {
        return la.splice(0).forEach(function(e) {
            return e()
        })
    },
    sv = function(e) {
        if (!zr) {
            var n = 0,
                t = document.createTextNode(""),
                i = {
                    characterData: !0
                };
            new MutationObserver(function() {
                return ov()
            }).observe(t, i), zr = function() {
                t.textContent = "".concat(n ? n-- : n++)
            }
        }
        la.push(e), zr()
    },
    av = function(e) {
        sv(function() {
            requestAnimationFrame(e)
        })
    },
    Qn = 0,
    lv = function() {
        return !!Qn
    },
    cv = 250,
    uv = {
        attributes: !0,
        characterData: !0,
        childList: !0,
        subtree: !0
    },
    No = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"],
    jo = function(e) {
        return e === void 0 && (e = 0), Date.now() + e
    },
    Nr = !1,
    fv = function() {
        function e() {
            var n = this;
            this.stopped = !0, this.listener = function() {
                return n.schedule()
            }
        }
        return e.prototype.run = function(n) {
            var t = this;
            if (n === void 0 && (n = cv), !Nr) {
                Nr = !0;
                var i = jo(n);
                av(function() {
                    var o = !1;
                    try {
                        o = iv()
                    } finally {
                        if (Nr = !1, n = i - jo(), !lv()) return;
                        o ? t.run(1e3) : n > 0 ? t.run(n) : t.start()
                    }
                })
            }
        }, e.prototype.schedule = function() {
            this.stop(), this.run()
        }, e.prototype.observe = function() {
            var n = this,
                t = function() {
                    return n.observer && n.observer.observe(document.body, uv)
                };
            document.body ? t() : an.addEventListener("DOMContentLoaded", t)
        }, e.prototype.start = function() {
            var n = this;
            this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), No.forEach(function(t) {
                return an.addEventListener(t, n.listener, !0)
            }))
        }, e.prototype.stop = function() {
            var n = this;
            this.stopped || (this.observer && this.observer.disconnect(), No.forEach(function(t) {
                return an.removeEventListener(t, n.listener, !0)
            }), this.stopped = !0)
        }, e
    }(),
    ii = new fv,
    Ho = function(e) {
        !Qn && e > 0 && ii.start(), Qn += e, !Qn && ii.stop()
    },
    dv = function(e) {
        return !gi(e) && !Xp(e) && getComputedStyle(e).display === "inline"
    },
    pv = function() {
        function e(n, t) {
            this.target = n, this.observedBox = t || hn.CONTENT_BOX, this.lastReportedSize = {
                inlineSize: 0,
                blockSize: 0
            }
        }
        return e.prototype.isActive = function() {
            var n = sa(this.target, this.observedBox, !0);
            return dv(this.target) && (this.lastReportedSize = n), this.lastReportedSize.inlineSize !== n.inlineSize || this.lastReportedSize.blockSize !== n.blockSize
        }, e
    }(),
    vv = function() {
        function e(n, t) {
            this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = n, this.callback = t
        }
        return e
    }(),
    Zn = new WeakMap,
    Uo = function(e, n) {
        for (var t = 0; t < e.length; t += 1)
            if (e[t].target === n) return t;
        return -1
    },
    Yn = function() {
        function e() {}
        return e.connect = function(n, t) {
            var i = new vv(n, t);
            Zn.set(n, i)
        }, e.observe = function(n, t, i) {
            var o = Zn.get(n),
                s = o.observationTargets.length === 0;
            Uo(o.observationTargets, t) < 0 && (s && xt.push(o), o.observationTargets.push(new pv(t, i && i.box)), Ho(1), ii.schedule())
        }, e.unobserve = function(n, t) {
            var i = Zn.get(n),
                o = Uo(i.observationTargets, t),
                s = i.observationTargets.length === 1;
            o >= 0 && (s && xt.splice(xt.indexOf(i), 1), i.observationTargets.splice(o, 1), Ho(-1))
        }, e.disconnect = function(n) {
            var t = this,
                i = Zn.get(n);
            i.observationTargets.slice().forEach(function(o) {
                return t.unobserve(n, o.target)
            }), i.activeTargets.splice(0, i.activeTargets.length)
        }, e
    }(),
    hv = function() {
        function e(n) {
            if (arguments.length === 0) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
            if (typeof n != "function") throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
            Yn.connect(this, n)
        }
        return e.prototype.observe = function(n, t) {
            if (arguments.length === 0) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!Lo(n)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
            Yn.observe(this, n, t)
        }, e.prototype.unobserve = function(n) {
            if (arguments.length === 0) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!Lo(n)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
            Yn.unobserve(this, n)
        }, e.prototype.disconnect = function() {
            Yn.disconnect(this)
        }, e.toString = function() {
            return "function ResizeObserver () { [polyfill code] }"
        }, e
    }();
const mv = () => {
        "ResizeObserver" in window || (window.ResizeObserver = hv)
    },
    gv = {
        setup: mv
    },
    _v = N('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>No</span></button><button><span>Yes'),
    Fo = bn(["relative px-144 py-2", wn({
        size: "terminal-sm"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light border"
            }
        }
    }),
    yv = e => x(lr, {
        get isOpen() {
            return e.isOpen
        },
        get children() {
            return x(bv, {
                onExit: () => {
                    window.location.href = "brawlstars-inbox://closeView"
                },
                get onClose() {
                    return e.onClose
                }
            })
        }
    }),
    bv = e => {
        const [n, t] = Y();
        let i;
        const o = s => {
            t(s), clearTimeout(i), i = setTimeout(() => {
                s === "confirm" ? e.onExit() : e.onClose()
            }, 1e3)
        };
        return (() => {
            const s = _v(),
                l = s.firstChild,
                c = l.firstChild,
                u = c.nextSibling,
                d = u.firstChild,
                p = d.firstChild,
                r = p.firstChild,
                a = r.nextSibling;
            return C(c, x(oe, {
                size: "terminal-md",
                children: "STARR PARK SECURITY"
            })), C(d, x(oe, {
                size: "terminal-md",
                class: "text-purple",
                children: "Are you sure you want to exit?"
            }), p), r.$$click = () => o("cancel"), a.$$click = () => o("confirm"), X(f => {
                const h = Fo({
                        selected: n() === "cancel"
                    }),
                    v = Fo({
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
const wv = N('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>Exit</span></button><button><span>Continue'),
    Go = bn(["relative px-96 py-2", wn({
        size: "terminal-sm"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light border"
            }
        }
    }),
    Av = () => x(lr, {
        get isOpen() {
            return !Ze.dataUsageWarningDialog.accepted()
        },
        get children() {
            return x(xv, {
                onExit: () => {
                    window.location.href = "brawlstars-inbox://closeView"
                },
                onClose: () => {
                    Ze.dataUsageWarningDialog.setAccepted()
                }
            })
        }
    }),
    xv = e => {
        const [n, t] = Y();
        let i;
        const o = s => {
            t(s), clearTimeout(i), i = setTimeout(() => {
                s === "exit" ? e.onExit() : e.onClose()
            }, 1e3)
        };
        return (() => {
            const s = wv(),
                l = s.firstChild,
                c = l.firstChild,
                u = c.nextSibling,
                d = u.firstChild,
                p = d.firstChild,
                r = p.firstChild,
                a = r.nextSibling;
            return C(c, x(oe, {
                size: "terminal-md",
                children: "STARR PARK SECURITY"
            })), C(d, x(oe, {
                size: "terminal-sm",
                class: "text-purple whitespace-pre-wrap",
                get children() {
                    return ["This website features live video content, which can consume a significant amount of data.", "\n", "If you're using a limited data plan or have concerns about data usage, we recommend switching to a Wi-Fi network."]
                }
            }), p), r.$$click = () => o("exit"), a.$$click = () => o("continue"), X(f => {
                const h = Go({
                        selected: n() === "exit"
                    }),
                    v = Go({
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
const Sv = N('<button class="absolute top-20 left-20 w-100 h-100 flex-center">'),
    Tv = N('<button class="absolute top-20 right-20 w-100 h-100 flex-center text-purple">'),
    kv = N('<div class="wh-full"><div class="portrait:hidden absolute origin-top-left overflow-hidden"></div><div class="landscape:hidden portrait:flex wh-full flex-center"><div class="font-medium whitespace-nowrap">Portrait mode is not supported.'),
    $v = N('<div class="absolute bottom-0 left-0 w-256">');
gv.setup();
const jr = {
        width: 2250,
        height: 1170
    },
    Iv = () => {
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
        const [i, o] = Y(void 0), s = Fp({
            containerRef: i,
            bgImageSize: jr,
            fit: "contain"
        }), l = st([jp, Np], {
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
            const c = kv(),
                u = c.firstChild;
            return Ee(o, c), C(u, x(Wp, {
                onLoaded: () => rt.onVideoTransitionLoaded(),
                onEnded: () => rt.onVideoTransitionEnd()
            }), null), C(u, x(ze, {
                get when() {
                    return rt.currentStatus() >= Ut["video-transition"]
                },
                get children() {
                    return x(Gd, {
                        roomSound: l
                    })
                }
            }), null), C(u, x(ze, {
                get when() {
                    return rt.currentStatus() === Ut.done
                },
                get children() {
                    return [(() => {
                        const d = Sv();
                        return d.$$click = () => n(!0), C(d, x(oe, {
                            size: "terminal-lg",
                            class: "text-green leading-none inline-block pb-16",
                            children: "х"
                        })), d
                    })(), (() => {
                        const d = Tv();
                        return d.$$click = () => {
                            ne.trackClickEvent("instructions-modal", Vt.options.muted ? "sound-on" : "sound-off", "cctv-room"), Vt.toggleMute()
                        }, C(d, x(gt, {
                            get name() {
                                return Vt.options.muted ? "mute" : "unmute"
                            },
                            class: "w-72"
                        })), d
                    })(), x(zp, {
                        onPlaylistLoad: () => l.play("archive-tape-load")
                    }), x(Jd, {
                        onClose: () => l.play("logbook-close")
                    }), x(Av, {})]
                }
            }), null), C(u, x(yv, {
                get isOpen() {
                    return e()
                },
                onClose: () => n(!1)
            }), null), X(d => {
                const p = "".concat(jr.height, "px"),
                    r = "".concat(jr.width, "px"),
                    a = "translate(".concat(s.position().x, "px, ").concat(s.position().y, "px) scale(").concat(s.scaleFactor(), ")");
                return p !== d._v$ && ((d._v$ = p) != null ? u.style.setProperty("height", p) : u.style.removeProperty("height")), r !== d._v$2 && ((d._v$2 = r) != null ? u.style.setProperty("width", r) : u.style.removeProperty("width")), a !== d._v$3 && ((d._v$3 = a) != null ? u.style.setProperty("transform", a) : u.style.removeProperty("transform")), d
            }, {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }), c
        })(), (() => {
            const c = $v(),
                u = t;
            return typeof u == "function" ? Ee(u, c) : t = c, c
        })()]
    };
$e(["click"]);
ol(() => x(Iv, {}), document.getElementById("root"));
export {
    _n as a, Ue as c, Pv as g
};