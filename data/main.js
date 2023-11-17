var Ma = Object.defineProperty,
    Ba = Object.defineProperties;
var La = Object.getOwnPropertyDescriptors;
var Vn = Object.getOwnPropertySymbols;
var Yo = Object.prototype.hasOwnProperty,
    qo = Object.prototype.propertyIsEnumerable;
var xr = (e, n, t) => n in e ? Ma(e, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[n] = t,
    ye = (e, n) => {
        for (var t in n || (n = {})) Yo.call(n, t) && xr(e, t, n[t]);
        if (Vn)
            for (var t of Vn(n)) qo.call(n, t) && xr(e, t, n[t]);
        return e
    },
    ht = (e, n) => Ba(e, La(n));
var Wo = (e, n) => {
    var t = {};
    for (var o in e) Yo.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]);
    if (e != null && Vn)
        for (var o of Vn(e)) n.indexOf(o) < 0 && qo.call(e, o) && (t[o] = e[o]);
    return t
};
var Ko = (e, n, t) => (xr(e, typeof n != "symbol" ? n + "" : n, t), t);
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
    ja = Symbol("solid-dev-component"),
    Qn = {
        equals: Va
    };
let Wi = ts;
const ut = 1,
    Xn = 2,
    Ki = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var ee = null;
let Sr = null,
    ae = null,
    me = null,
    Ze = null,
    sr = 0;

function Wn(e, n) {
    const t = ae,
        o = ee,
        i = e.length === 0,
        s = n === void 0 ? o : n,
        l = i ? Ki : {
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

function q(e, n) {
    n = n ? Object.assign({}, Qn, n) : Qn;
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
    const o = so(e, n, !1, ut);
    _n(o)
}

function pe(e, n, t) {
    Wi = Fa;
    const o = so(e, n, !1, ut),
        i = Jo && Ji(Jo);
    i && (o.suspense = i), (!t || !t.render) && (o.user = !0), Ze ? Ze.push(o) : _n(o)
}

function ke(e, n, t) {
    t = t ? Object.assign({}, Qn, t) : Qn;
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

function Na(e, n) {
    const t = Symbol("context");
    return {
        id: t,
        Provider: Ga(t),
        defaultValue: e
    }
}

function Ji(e) {
    return ee && ee.context && ee.context[e.id] !== void 0 ? ee.context[e.id] : e.defaultValue
}

function Qi(e) {
    const n = ke(e),
        t = ke(() => Fr(n()));
    return t.toArray = () => {
        const o = t();
        return Array.isArray(o) ? o : o != null ? [o] : []
    }, t
}
let Jo;

function Xi() {
    if (this.sources && this.state)
        if (this.state === ut) _n(this);
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
            l && Sr.disposed.has(s), (l ? !s.tState : !s.state) && (s.pure ? me.push(s) : Ze.push(s), s.observers && ns(s)), l || (s.state = ut)
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
    ae = ee = e, Ua(e, e.value, o), ae = t, ee = n
}

function Ua(e, n, t) {
    let o;
    try {
        o = e.fn(n)
    } catch (i) {
        return e.pure && (e.state = ut, e.owned && e.owned.forEach(lr), e.owned = null), e.updatedAt = t + 1, rs(i)
    }(!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? es(e, o) : e.value = o, e.updatedAt = t)
}

function so(e, n, t, o = ut, i) {
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
    return ee === null || ee !== Ki && (ee.owned ? ee.owned.push(s) : ee.owned = [s]), s
}

function tr(e) {
    if (e.state === 0) return;
    if (e.state === Xn) return nr(e);
    if (e.suspense && fe(e.suspense.inFallback)) return e.suspense.effects.push(e);
    const n = [e];
    for (;
        (e = e.owner) && (!e.updatedAt || e.updatedAt < sr);) e.state && n.push(e);
    for (let t = n.length - 1; t >= 0; t--)
        if (e = n[t], e.state === ut) _n(e);
        else if (e.state === Xn) {
        const o = me;
        me = null, Ft(() => nr(e, n[0]), !1), me = o
    }
}

function Ft(e, n) {
    if (me) return e();
    let t = !1;
    n || (me = []), Ze ? t = !0 : Ze = [], sr++;
    try {
        const o = e();
        return Ha(t), o
    } catch (o) {
        t || (Ze = null), me = null, rs(o)
    }
}

function Ha(e) {
    if (me && (ts(me), me = null), e) return;
    const n = Ze;
    Ze = null, n.length && Ft(() => Wi(n), !1)
}

function ts(e) {
    for (let n = 0; n < e.length; n++) tr(e[n])
}

function Fa(e) {
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
            i === ut ? o !== n && (!o.updatedAt || o.updatedAt < sr) && tr(o) : i === Xn && nr(o, n)
        }
    }
}

function ns(e) {
    for (let n = 0; n < e.observers.length; n += 1) {
        const t = e.observers[n];
        t.state || (t.state = Xn, t.pure ? me.push(t) : Ze.push(t), t.observers && ns(t))
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

function Ga(e, n) {
    return function(o) {
        let i;
        return X(() => i = fe(() => (ee.context = ht(ye({}, ee.context), {
            [e]: o.value
        }), Qi(() => o.children))), void 0), i
    }
}
const Ya = Symbol("fallback");

function Qo(e) {
    for (let n = 0; n < e.length; n++) e[n]()
}

function qa(e, n, t = {}) {
    let o = [],
        i = [],
        s = [],
        l = 0,
        c = n.length > 1 ? [] : null;
    return Ae(() => Qo(s)), () => {
        let u = e() || [],
            f, p;
        return u[Hr], fe(() => {
            let a = u.length,
                d, h, v, m, g, y, w, b, I;
            if (a === 0) l !== 0 && (Qo(s), s = [], o = [], i = [], l = 0, c && (c = [])), t.fallback && (o = [Ya], i[0] = Wn(N => (s[0] = N, t.fallback())), l = 1);
            else if (l === 0) {
                for (i = new Array(a), p = 0; p < a; p++) o[p] = u[p], i[p] = Wn(r);
                l = a
            } else {
                for (v = new Array(a), m = new Array(a), c && (g = new Array(a)), y = 0, w = Math.min(l, a); y < w && o[y] === u[y]; y++);
                for (w = l - 1, b = a - 1; w >= y && b >= y && o[w] === u[b]; w--, b--) v[b] = i[w], m[b] = s[w], c && (g[b] = c[w]);
                for (d = new Map, h = new Array(b + 1), p = b; p >= y; p--) I = u[p], f = d.get(I), h[p] = f === void 0 ? -1 : f, d.set(I, p);
                for (f = y; f <= w; f++) I = o[f], p = d.get(I), p !== void 0 && p !== -1 ? (v[p] = i[f], m[p] = s[f], c && (g[p] = c[f]), p = h[p], d.set(I, p)) : s[f]();
                for (p = y; p < a; p++) p in v ? (i[p] = v[p], s[p] = m[p], c && (c[p] = g[p], c[p](p))) : i[p] = Wn(r);
                i = i.slice(0, l = a), o = u.slice(0)
            }
            return i
        });

        function r(a) {
            if (s[p] = a, c) {
                const [d, h] = q(p);
                return c[p] = h, n(u[p], d)
            }
            return n(u[p])
        }
    }
}

function S(e, n) {
    return fe(() => e(n || {}))
}

function jn() {
    return !0
}
const Zr = {
    get(e, n, t) {
        return n === Be ? t : e.get(n)
    },
    has(e, n) {
        return n === Be ? !0 : e.has(n)
    },
    set: jn,
    deleteProperty: jn,
    getOwnPropertyDescriptor(e, n) {
        return {
            configurable: !0,
            enumerable: !0,
            get() {
                return e.get(n)
            },
            set: jn,
            deleteProperty: jn
        }
    },
    ownKeys(e) {
        return e.keys()
    }
};

function Tr(e) {
    return (e = typeof e == "function" ? e() : e) ? e : {}
}

function Wa() {
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
    }, Zr);
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
                get: Wa.bind(o[p] = [r.get.bind(l)])
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
            }, Zr));
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
        }, Zr)), s
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

function je(e) {
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
        o = Qi(() => e.children),
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

function Mt(e) {
    return e
}
const Qa = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"],
    Xa = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Qa]),
    el = new Set(["innerHTML", "textContent", "innerText", "children"]),
    tl = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    }),
    nl = Object.assign(Object.create(null), {
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

function rl(e, n) {
    const t = nl[e];
    return typeof t == "object" ? t[n] ? t.$ : void 0 : t
}
const ol = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
    il = new Set(["altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use", "view", "vkern"]),
    sl = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };

function al(e, n, t) {
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
                        const h = n[l];
                        for (; c < p;) e.insertBefore(t[c++], h)
                    } else e.replaceChild(t[c++], n[l++])
                } else l++;
            else n[l++].remove()
        }
    }
}
const Xo = "_$DX_DELEGATE";

function ll(e, n, t, o = {}) {
    let i;
    return Wn(s => {
        i = s, n === document ? e() : E(n, e(), n.firstChild ? null : void 0, t)
    }, o.owner), () => {
        i(), n.textContent = ""
    }
}

function z(e, n, t) {
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

function cl(e, n, t, o) {
    o == null ? e.removeAttributeNS(n, t) : e.setAttributeNS(n, t, o)
}

function te(e, n) {
    n == null ? e.removeAttribute("class") : e.className = n
}

function ul(e, n, t, o) {
    if (o) Array.isArray(t) ? (e["$$".concat(n)] = t[0], e["$$".concat(n, "Data")] = t[1]) : e["$$".concat(n)] = t;
    else if (Array.isArray(t)) {
        const i = t[0];
        e.addEventListener(n, t[0] = s => i.call(e, t[1], s))
    } else e.addEventListener(n, t)
}

function fl(e, n, t = {}) {
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

function dl(e, n, t) {
    if (!n) return t ? ce(e, "style") : n;
    const o = e.style;
    if (typeof n == "string") return o.cssText = n;
    typeof t == "string" && (o.cssText = t = void 0), t || (t = {}), n || (n = {});
    let i, s;
    for (s in t) n[s] == null && o.removeProperty(s), delete t[s];
    for (s in n) i = n[s], i !== t[s] && (o.setProperty(s, i), t[s] = i);
    return t
}

function qe(e, n = {}, t, o) {
    const i = {};
    return o || X(() => i.children = jt(e, n.children, i.children)), X(() => n.ref && n.ref(e)), X(() => pl(e, n, t, !0, i, !0)), i
}

function Ce(e, n, t) {
    return fe(() => e(n, t))
}

function E(e, n, t, o) {
    if (t !== void 0 && !o && (o = []), typeof n != "function") return jt(e, n, o, t);
    X(i => jt(e, n(), i, t), o)
}

function pl(e, n, t, o, i = {}, s = !1) {
    n || (n = {});
    for (const l in i)
        if (!(l in n)) {
            if (l === "children") continue;
            i[l] = ti(e, l, null, i[l], t, s)
        } for (const l in n) {
        if (l === "children") {
            o || jt(e, n.children);
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
    if (n === "style") return dl(e, t, o);
    if (n === "classList") return fl(e, t, o);
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
            a = ol.has(r);
        if (!a && o) {
            const d = Array.isArray(o) ? o[0] : o;
            e.removeEventListener(r, d)
        }(a || t) && (ul(e, r, t, a), a && $e([r]))
    } else if (n.slice(0, 5) === "attr:") ce(e, n.slice(5), t);
    else if ((p = n.slice(0, 5) === "prop:") || (u = el.has(n)) || !i && ((f = rl(n, e.tagName)) || (c = Xa.has(n))) || (l = e.nodeName.includes("-"))) p && (n = n.slice(5), c = !0), n === "class" || n === "className" ? te(e, t) : l && !c && !u ? e[vl(n)] = t : e[f || n] = t;
    else {
        const r = i && n.indexOf(":") > -1 && sl[n.split(":")[0]];
        r ? cl(e, r, n, t) : ce(e, tl[n] || n, t)
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
            } else u ? t.length === 0 ? ni(e, c, o) : al(e, t, c) : (t && Ct(e), ni(e, c));
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
            f;
        if (!(c == null || c === !0 || c === !1))
            if ((f = typeof c) == "object" && c.nodeType) e.push(c);
            else if (Array.isArray(c)) i = Gr(e, c, u) || i;
        else if (f === "function")
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

function ni(e, n, t = null) {
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
const gl = "http://www.w3.org/2000/svg";

function ml(e, n = !1) {
    return n ? document.createElementNS(gl, e) : document.createElement(e)
}

function as(e) {
    const [n, t] = ao(e, ["component"]), o = ke(() => n.component);
    return ke(() => {
        const i = o();
        switch (typeof i) {
            case "function":
                return Object.assign(i, {
                    [ja]: !0
                }), fe(() => i(t));
            case "string":
                const s = il.has(i),
                    l = ml(i, s);
                return qe(l, t, s), l
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
            value: n = new Proxy(e, bl)
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

function zt(e, n = new Set) {
    let t, o, i, s;
    if (t = e != null && e[Yr]) return t;
    if (!lt(e) || n.has(e)) return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : n.add(e);
        for (let l = 0, c = e.length; l < c; l++) i = e[l], (o = zt(i, n)) !== i && (e[l] = o)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : n.add(e);
        const l = Object.keys(e),
            c = Object.getOwnPropertyDescriptors(e);
        for (let u = 0, f = l.length; u < f; u++) s = l[u], !c[s].get && (i = e[s], (o = zt(i, n)) !== i && (e[s] = o))
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
    const [o, i] = q(t, {
        equals: !1,
        internal: !0
    });
    return o.$ = i, e[n] = o
}

function _l(e, n) {
    const t = Reflect.getOwnPropertyDescriptor(e, n);
    return !t || t.get || !t.configurable || n === Be || n === Lt || (delete t.value, delete t.writable, t.get = () => e[Be][n]), t
}

function us(e) {
    er() && cn(rr(e, Lt), ls)()
}

function yl(e) {
    return us(e), Reflect.ownKeys(e)
}
const bl = {
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
    ownKeys: yl,
    getOwnPropertyDescriptor: _l
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

function wl(e, n) {
    if (typeof n == "function" && (n = n(e)), n = zt(n), Array.isArray(n)) {
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
    typeof s == "function" && (s = s(i, t), s === i) || o === void 0 && s == null || (s = zt(s), o === void 0 || lt(i) && lt(s) && !Array.isArray(s) ? fs(i, s) : Pe(e, o, s))
}

function Zt(...[e, n]) {
    const t = zt(e || {}),
        o = Array.isArray(t),
        i = cs(t);

    function s(...l) {
        ar(() => {
            o && l.length === 1 ? wl(t, l[0]) : rn(t, l)
        })
    }
    return [i, s]
}
const qr = Symbol("store-root");

function Dt(e, n, t, o, i) {
    const s = n[t];
    if (e === s) return;
    if (t !== qr && (!lt(e) || !lt(s) || i && e[i] !== s[i])) {
        Pe(n, t, e);
        return
    }
    if (Array.isArray(e)) {
        if (e.length && s.length && (!o || i && e[0] && e[0][i] != null)) {
            let u, f, p, r, a, d, h, v;
            for (p = 0, r = Math.min(s.length, e.length); p < r && (s[p] === e[p] || i && s[p] && e[p] && s[p][i] === e[p][i]); p++) Dt(e[p], s, p, o, i);
            const m = new Array(e.length),
                g = new Map;
            for (r = s.length - 1, a = e.length - 1; r >= p && a >= p && (s[r] === e[a] || i && s[p] && e[p] && s[r][i] === e[a][i]); r--, a--) m[a] = s[r];
            if (p > a || p > r) {
                for (f = p; f <= a; f++) Pe(s, f, e[f]);
                for (; f < e.length; f++) Pe(s, f, m[f]), Dt(e[f], s, f, o, i);
                s.length > e.length && Pe(s, "length", e.length);
                return
            }
            for (h = new Array(a + 1), f = a; f >= p; f--) d = e[f], v = i && d ? d[i] : d, u = g.get(v), h[f] = u === void 0 ? -1 : u, g.set(v, f);
            for (u = p; u <= r; u++) d = s[u], v = i && d ? d[i] : d, f = g.get(v), f !== void 0 && f !== -1 && (m[f] = s[u], f = h[f], g.set(v, f));
            for (f = p; f < e.length; f++) f in m ? (Pe(s, f, m[f]), Dt(e[f], s, f, o, i)) : Pe(s, f, e[f])
        } else
            for (let u = 0, f = e.length; u < f; u++) Dt(e[u], s, u, o, i);
        s.length > e.length && Pe(s, "length", e.length);
        return
    }
    const l = Object.keys(e);
    for (let u = 0, f = l.length; u < f; u++) Dt(e[l[u]], s, l[u], o, i);
    const c = Object.keys(s);
    for (let u = 0, f = c.length; u < f; u++) e[c[u]] === void 0 && Pe(s, c[u], void 0)
}

function Al(e, n = {}) {
    const {
        merge: t,
        key: o = "id"
    } = n, i = zt(e);
    return s => {
        if (!lt(s) || !lt(i)) return i;
        const l = Dt(i, {
            [qr]: s
        }, qr, t, o);
        return l === void 0 ? s : l
    }
}
const [xl, Wr] = Zt({
    mainApp: null
}), Sl = e => {
    Wr(e === "home" || e === "security-tape-archives" || e === "timecoder" ? {
        mainApp: "terminal",
        terminalApp: e
    } : {
        mainApp: e,
        terminalApp: void 0
    })
}, Tl = () => {
    Wr({
        mainApp: null,
        terminalApp: void 0
    })
}, we = {
    currentOpenApp: xl,
    openApp: Sl,
    closeApp: Tl
};
var He = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};

function yn(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}

function zv(e) {
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
                            for (var h = a._howls[d]._getSoundIds(), v = 0; v < h.length; v++) {
                                var m = a._howls[d]._soundById(h[v]);
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
                        for (var h = a._howls[d]._getSoundIds(), v = 0; v < h.length; v++) {
                            var m = a._howls[d]._soundById(h[v]);
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
                    h = r._navigator ? r._navigator.userAgent : "",
                    v = h.match(/OPR\/(\d+)/g),
                    m = v && parseInt(v[0].split("/")[1], 10) < 33,
                    g = h.indexOf("Safari") !== -1 && h.indexOf("Chrome") === -1,
                    y = h.match(/Version\/(.*?) /),
                    w = g && y && parseInt(y[1], 10) < 15;
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
                            var h = new Audio;
                            h._unlocked = !0, r._releaseHtml5Audio(h)
                        } catch (b) {
                            r.noAudio = !0;
                            break
                        }
                        for (var v = 0; v < r._howls.length; v++)
                            if (!r._howls[v]._webAudio)
                                for (var m = r._howls[v]._getSoundIds(), g = 0; g < m.length; g++) {
                                    var y = r._howls[v]._soundById(m[g]);
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
                for (var d = 0; d < r._src.length; d++) {
                    var h, v;
                    if (r._format && r._format[d]) h = r._format[d];
                    else {
                        if (v = r._src[d], typeof v != "string") {
                            r._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                            continue
                        }
                        h = /^data:audio\/([^;,]+);/i.exec(v), h || (h = /\.([^.]+)$/.exec(v.split("?", 1)[0])), h && (h = h[1].toLowerCase())
                    }
                    if (h || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), h && t.codecs(h)) {
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
                    h = null;
                if (typeof r == "number") h = r, r = null;
                else {
                    if (typeof r == "string" && d._state === "loaded" && !d._sprite[r]) return null;
                    if (typeof r > "u" && (r = "__default", !d._playLock)) {
                        for (var v = 0, m = 0; m < d._sounds.length; m++) d._sounds[m]._paused && !d._sounds[m]._ended && (v++, h = d._sounds[m]._id);
                        v === 1 ? r = null : h = null
                    }
                }
                var g = h ? d._soundById(h) : d._inactiveSound();
                if (!g) return null;
                if (h && !r && (r = g._sprite || "__default"), d._state !== "loaded") {
                    g._sprite = r, g._ended = !1;
                    var y = g._id;
                    return d._queue.push({
                        event: "play",
                        action: function() {
                            d.play(y)
                        }
                    }), y
                }
                if (h && !g._paused) return a || d._loadQueue("play"), g._id;
                d._webAudio && t._autoResume();
                var w = Math.max(0, g._seek > 0 ? g._seek : d._sprite[r][0] / 1e3),
                    b = Math.max(0, (d._sprite[r][0] + d._sprite[r][1]) / 1e3 - w),
                    I = b * 1e3 / Math.abs(g._rate),
                    N = d._sprite[r][0] / 1e3,
                    G = (d._sprite[r][0] + d._sprite[r][1]) / 1e3;
                g._sprite = r, g._ended = !1;
                var L = function() {
                    g._paused = !1, g._seek = w, g._start = N, g._stop = G, g._loop = !!(g._loop || d._sprite[r][2])
                };
                if (w >= G) {
                    d._ended(g);
                    return
                }
                var B = g._node;
                if (d._webAudio) {
                    var j = function() {
                        d._playLock = !1, L(), d._refreshBuffer(g);
                        var M = g._muted || d._muted ? 0 : g._volume;
                        B.gain.setValueAtTime(M, t.ctx.currentTime), g._playStart = t.ctx.currentTime, typeof B.bufferSource.start > "u" ? g._loop ? B.bufferSource.noteGrainOn(0, w, 86400) : B.bufferSource.noteGrainOn(0, w, b) : g._loop ? B.bufferSource.start(0, w, 86400) : B.bufferSource.start(0, w, b), I !== 1 / 0 && (d._endTimers[g._id] = setTimeout(d._ended.bind(d, g), I)), a || setTimeout(function() {
                            d._emit("play", g._id), d._loadQueue()
                        }, 0)
                    };
                    t.state === "running" && t.ctx.state !== "interrupted" ? j() : (d._playLock = !0, d.once("resume", j), d._clearTimer(g._id))
                } else {
                    var R = function() {
                        B.currentTime = w, B.muted = g._muted || d._muted || t._muted || B.muted, B.volume = g._volume * t.volume(), B.playbackRate = g._rate;
                        try {
                            var M = B.play();
                            if (M && typeof Promise < "u" && (M instanceof Promise || typeof M.then == "function") ? (d._playLock = !0, L(), M.then(function() {
                                    d._playLock = !1, B._unlocked = !0, a ? d._loadQueue() : d._emit("play", g._id)
                                }).catch(function() {
                                    d._playLock = !1, d._emit("playerror", g._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), g._ended = !0, g._paused = !0
                                })) : a || (d._playLock = !1, L(), d._emit("play", g._id)), B.playbackRate = g._rate, B.paused) {
                                d._emit("playerror", g._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                return
                            }
                            r !== "__default" || g._loop ? d._endTimers[g._id] = setTimeout(d._ended.bind(d, g), I) : (d._endTimers[g._id] = function() {
                                d._ended(g), B.removeEventListener("ended", d._endTimers[g._id], !1)
                            }, B.addEventListener("ended", d._endTimers[g._id], !1))
                        } catch ($) {
                            d._emit("playerror", g._id, $)
                        }
                    };
                    B.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (B.src = d._src, B.load());
                    var J = window && window.ejecta || !B.readyState && t._navigator.isCocoonJS;
                    if (B.readyState >= 3 || J) R();
                    else {
                        d._playLock = !0, d._state = "loading";
                        var de = function() {
                            d._state = "loaded", R(), B.removeEventListener(t._canPlayEvent, de, !1)
                        };
                        B.addEventListener(t._canPlayEvent, de, !1), d._clearTimer(g._id)
                    }
                }
                return g._id
            },
            pause: function(r) {
                var a = this;
                if (a._state !== "loaded" || a._playLock) return a._queue.push({
                    event: "pause",
                    action: function() {
                        a.pause(r)
                    }
                }), a;
                for (var d = a._getSoundIds(r), h = 0; h < d.length; h++) {
                    a._clearTimer(d[h]);
                    var v = a._soundById(d[h]);
                    if (v && !v._paused && (v._seek = a.seek(d[h]), v._rateSeek = 0, v._paused = !0, a._stopFade(d[h]), v._node))
                        if (a._webAudio) {
                            if (!v._node.bufferSource) continue;
                            typeof v._node.bufferSource.stop > "u" ? v._node.bufferSource.noteOff(0) : v._node.bufferSource.stop(0), a._cleanBuffer(v._node)
                        } else(!isNaN(v._node.duration) || v._node.duration === 1 / 0) && v._node.pause();
                    arguments[1] || a._emit("pause", v ? v._id : null)
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
                for (var h = d._getSoundIds(r), v = 0; v < h.length; v++) {
                    d._clearTimer(h[v]);
                    var m = d._soundById(h[v]);
                    m && (m._seek = m._start || 0, m._rateSeek = 0, m._paused = !0, m._ended = !0, d._stopFade(h[v]), m._node && (d._webAudio ? m._node.bufferSource && (typeof m._node.bufferSource.stop > "u" ? m._node.bufferSource.noteOff(0) : m._node.bufferSource.stop(0), d._cleanBuffer(m._node)) : (!isNaN(m._node.duration) || m._node.duration === 1 / 0) && (m._node.currentTime = m._start || 0, m._node.pause(), m._node.duration === 1 / 0 && d._clearSound(m._node))), a || d._emit("stop", m._id))
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
                for (var h = d._getSoundIds(a), v = 0; v < h.length; v++) {
                    var m = d._soundById(h[v]);
                    m && (m._muted = r, m._interval && d._stopFade(m._id), d._webAudio && m._node ? m._node.gain.setValueAtTime(r ? 0 : m._volume, t.ctx.currentTime) : m._node && (m._node.muted = t._muted ? !0 : r), d._emit("mute", m._id))
                }
                return d
            },
            volume: function() {
                var r = this,
                    a = arguments,
                    d, h;
                if (a.length === 0) return r._volume;
                if (a.length === 1 || a.length === 2 && typeof a[1] > "u") {
                    var v = r._getSoundIds(),
                        m = v.indexOf(a[0]);
                    m >= 0 ? h = parseInt(a[0], 10) : d = parseFloat(a[0])
                } else a.length >= 2 && (d = parseFloat(a[0]), h = parseInt(a[1], 10));
                var g;
                if (typeof d < "u" && d >= 0 && d <= 1) {
                    if (r._state !== "loaded" || r._playLock) return r._queue.push({
                        event: "volume",
                        action: function() {
                            r.volume.apply(r, a)
                        }
                    }), r;
                    typeof h > "u" && (r._volume = d), h = r._getSoundIds(h);
                    for (var y = 0; y < h.length; y++) g = r._soundById(h[y]), g && (g._volume = d, a[2] || r._stopFade(h[y]), r._webAudio && g._node && !g._muted ? g._node.gain.setValueAtTime(d, t.ctx.currentTime) : g._node && !g._muted && (g._node.volume = d * t.volume()), r._emit("volume", g._id))
                } else return g = h ? r._soundById(h) : r._sounds[0], g ? g._volume : 0;
                return r
            },
            fade: function(r, a, d, h) {
                var v = this;
                if (v._state !== "loaded" || v._playLock) return v._queue.push({
                    event: "fade",
                    action: function() {
                        v.fade(r, a, d, h)
                    }
                }), v;
                r = Math.min(Math.max(0, parseFloat(r)), 1), a = Math.min(Math.max(0, parseFloat(a)), 1), d = parseFloat(d), v.volume(r, h);
                for (var m = v._getSoundIds(h), g = 0; g < m.length; g++) {
                    var y = v._soundById(m[g]);
                    if (y) {
                        if (h || v._stopFade(m[g]), v._webAudio && !y._muted) {
                            var w = t.ctx.currentTime,
                                b = w + d / 1e3;
                            y._volume = r, y._node.gain.setValueAtTime(r, w), y._node.gain.linearRampToValueAtTime(a, b)
                        }
                        v._startFadeInterval(y, r, a, d, m[g], typeof h > "u")
                    }
                }
                return v
            },
            _startFadeInterval: function(r, a, d, h, v, m) {
                var g = this,
                    y = a,
                    w = d - a,
                    b = Math.abs(w / .01),
                    I = Math.max(4, b > 0 ? h / b : h),
                    N = Date.now();
                r._fadeTo = d, r._interval = setInterval(function() {
                    var G = (Date.now() - N) / h;
                    N = Date.now(), y += w * G, y = Math.round(y * 100) / 100, w < 0 ? y = Math.max(d, y) : y = Math.min(d, y), g._webAudio ? r._volume = y : g.volume(y, r._id, !0), m && (g._volume = y), (d < a && y <= d || d > a && y >= d) && (clearInterval(r._interval), r._interval = null, r._fadeTo = null, g.volume(d, r._id), g._emit("fade", r._id))
                }, I)
            },
            _stopFade: function(r) {
                var a = this,
                    d = a._soundById(r);
                return d && d._interval && (a._webAudio && d._node.gain.cancelScheduledValues(t.ctx.currentTime), clearInterval(d._interval), d._interval = null, a.volume(d._fadeTo, r), d._fadeTo = null, a._emit("fade", r)), a
            },
            loop: function() {
                var r = this,
                    a = arguments,
                    d, h, v;
                if (a.length === 0) return r._loop;
                if (a.length === 1)
                    if (typeof a[0] == "boolean") d = a[0], r._loop = d;
                    else return v = r._soundById(parseInt(a[0], 10)), v ? v._loop : !1;
                else a.length === 2 && (d = a[0], h = parseInt(a[1], 10));
                for (var m = r._getSoundIds(h), g = 0; g < m.length; g++) v = r._soundById(m[g]), v && (v._loop = d, r._webAudio && v._node && v._node.bufferSource && (v._node.bufferSource.loop = d, d && (v._node.bufferSource.loopStart = v._start || 0, v._node.bufferSource.loopEnd = v._stop, r.playing(m[g]) && (r.pause(m[g], !0), r.play(m[g], !0)))));
                return r
            },
            rate: function() {
                var r = this,
                    a = arguments,
                    d, h;
                if (a.length === 0) h = r._sounds[0]._id;
                else if (a.length === 1) {
                    var v = r._getSoundIds(),
                        m = v.indexOf(a[0]);
                    m >= 0 ? h = parseInt(a[0], 10) : d = parseFloat(a[0])
                } else a.length === 2 && (d = parseFloat(a[0]), h = parseInt(a[1], 10));
                var g;
                if (typeof d == "number") {
                    if (r._state !== "loaded" || r._playLock) return r._queue.push({
                        event: "rate",
                        action: function() {
                            r.rate.apply(r, a)
                        }
                    }), r;
                    typeof h > "u" && (r._rate = d), h = r._getSoundIds(h);
                    for (var y = 0; y < h.length; y++)
                        if (g = r._soundById(h[y]), g) {
                            r.playing(h[y]) && (g._rateSeek = r.seek(h[y]), g._playStart = r._webAudio ? t.ctx.currentTime : g._playStart), g._rate = d, r._webAudio && g._node && g._node.bufferSource ? g._node.bufferSource.playbackRate.setValueAtTime(d, t.ctx.currentTime) : g._node && (g._node.playbackRate = d);
                            var w = r.seek(h[y]),
                                b = (r._sprite[g._sprite][0] + r._sprite[g._sprite][1]) / 1e3 - w,
                                I = b * 1e3 / Math.abs(g._rate);
                            (r._endTimers[h[y]] || !g._paused) && (r._clearTimer(h[y]), r._endTimers[h[y]] = setTimeout(r._ended.bind(r, g), I)), r._emit("rate", g._id)
                        }
                } else return g = r._soundById(h), g ? g._rate : r._rate;
                return r
            },
            seek: function() {
                var r = this,
                    a = arguments,
                    d, h;
                if (a.length === 0) r._sounds.length && (h = r._sounds[0]._id);
                else if (a.length === 1) {
                    var v = r._getSoundIds(),
                        m = v.indexOf(a[0]);
                    m >= 0 ? h = parseInt(a[0], 10) : r._sounds.length && (h = r._sounds[0]._id, d = parseFloat(a[0]))
                } else a.length === 2 && (d = parseFloat(a[0]), h = parseInt(a[1], 10));
                if (typeof h > "u") return 0;
                if (typeof d == "number" && (r._state !== "loaded" || r._playLock)) return r._queue.push({
                    event: "seek",
                    action: function() {
                        r.seek.apply(r, a)
                    }
                }), r;
                var g = r._soundById(h);
                if (g)
                    if (typeof d == "number" && d >= 0) {
                        var y = r.playing(h);
                        y && r.pause(h, !0), g._seek = d, g._ended = !1, r._clearTimer(h), !r._webAudio && g._node && !isNaN(g._node.duration) && (g._node.currentTime = d);
                        var w = function() {
                            y && r.play(h, !0), r._emit("seek", h)
                        };
                        if (y && !r._webAudio) {
                            var b = function() {
                                r._playLock ? setTimeout(b, 0) : w()
                            };
                            setTimeout(b, 0)
                        } else w()
                    } else if (r._webAudio) {
                    var I = r.playing(h) ? t.ctx.currentTime - g._playStart : 0,
                        N = g._rateSeek ? g._rateSeek - g._seek : 0;
                    return g._seek + (N + I * Math.abs(g._rate))
                } else return g._node.currentTime;
                return r
            },
            playing: function(r) {
                var a = this;
                if (typeof r == "number") {
                    var d = a._soundById(r);
                    return d ? !d._paused : !1
                }
                for (var h = 0; h < a._sounds.length; h++)
                    if (!a._sounds[h]._paused) return !0;
                return !1
            },
            duration: function(r) {
                var a = this,
                    d = a._duration,
                    h = a._soundById(r);
                return h && (d = a._sprite[h._sprite][1] / 1e3), d
            },
            state: function() {
                return this._state
            },
            unload: function() {
                for (var r = this, a = r._sounds, d = 0; d < a.length; d++) a[d]._paused || r.stop(a[d]._id), r._webAudio || (r._clearSound(a[d]._node), a[d]._node.removeEventListener("error", a[d]._errorFn, !1), a[d]._node.removeEventListener(t._canPlayEvent, a[d]._loadFn, !1), a[d]._node.removeEventListener("ended", a[d]._endFn, !1), t._releaseHtml5Audio(a[d]._node)), delete a[d]._node, r._clearTimer(a[d]._id);
                var h = t._howls.indexOf(r);
                h >= 0 && t._howls.splice(h, 1);
                var v = !0;
                for (d = 0; d < t._howls.length; d++)
                    if (t._howls[d]._src === r._src || r._src.indexOf(t._howls[d]._src) >= 0) {
                        v = !1;
                        break
                    } return s && v && delete s[r._src], t.noAudio = !1, r._state = "unloaded", r._sounds = [], r = null, null
            },
            on: function(r, a, d, h) {
                var v = this,
                    m = v["_on" + r];
                return typeof a == "function" && m.push(h ? {
                    id: d,
                    fn: a,
                    once: h
                } : {
                    id: d,
                    fn: a
                }), v
            },
            off: function(r, a, d) {
                var h = this,
                    v = h["_on" + r],
                    m = 0;
                if (typeof a == "number" && (d = a, a = null), a || d)
                    for (m = 0; m < v.length; m++) {
                        var g = d === v[m].id;
                        if (a === v[m].fn && g || !a && g) {
                            v.splice(m, 1);
                            break
                        }
                    } else if (r) h["_on" + r] = [];
                    else {
                        var y = Object.keys(h);
                        for (m = 0; m < y.length; m++) y[m].indexOf("_on") === 0 && Array.isArray(h[y[m]]) && (h[y[m]] = [])
                    } return h
            },
            once: function(r, a, d) {
                var h = this;
                return h.on(r, a, d, 1), h
            },
            _emit: function(r, a, d) {
                for (var h = this, v = h["_on" + r], m = v.length - 1; m >= 0; m--)(!v[m].id || v[m].id === a || r === "load") && (setTimeout(function(g) {
                    g.call(this, a, d)
                }.bind(h, v[m].fn), 0), v[m].once && h.off(r, v[m].fn, v[m].id));
                return h._loadQueue(r), h
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
                var h = !!(r._loop || a._sprite[d][2]);
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
                    h = 0;
                if (!(r._sounds.length < a)) {
                    for (h = 0; h < r._sounds.length; h++) r._sounds[h]._ended && d++;
                    for (h = r._sounds.length - 1; h >= 0; h--) {
                        if (d <= a) return;
                        r._sounds[h]._ended && (r._webAudio && r._sounds[h]._node && r._sounds[h]._node.disconnect(0), r._sounds.splice(h, 1), d--)
                    }
                }
            },
            _getSoundIds: function(r) {
                var a = this;
                if (typeof r > "u") {
                    for (var d = [], h = 0; h < a._sounds.length; h++) d.push(a._sounds[h]._id);
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
                    for (var d = atob(a.split(",")[1]), h = new Uint8Array(d.length), v = 0; v < d.length; ++v) h[v] = d.charCodeAt(v);
                    u(h.buffer, r)
                } else {
                    var m = new XMLHttpRequest;
                    m.open(r._xhr.method, a, !0), m.withCredentials = r._xhr.withCredentials, m.responseType = "arraybuffer", r._xhr.headers && Object.keys(r._xhr.headers).forEach(function(g) {
                        m.setRequestHeader(g, r._xhr.headers[g])
                    }), m.onload = function() {
                        var g = (m.status + "")[0];
                        if (g !== "0" && g !== "2" && g !== "3") {
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
                    h = function(v) {
                        v && a._sounds.length > 0 ? (s[a._src] = v, f(a, v)) : d()
                    };
                typeof Promise < "u" && t.ctx.decodeAudioData.length === 1 ? t.ctx.decodeAudioData(r).then(h).catch(d) : t.ctx.decodeAudioData(r, h, d)
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
                    } catch (v) {
                        t.usingWebAudio = !1
                    }
                    t.ctx || (t.usingWebAudio = !1);
                    var r = /iP(hone|od|ad)/.test(t._navigator && t._navigator.platform),
                        a = t._navigator && t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                        d = a ? parseInt(a[1], 10) : null;
                    if (r && d && d < 9) {
                        var h = /safari/.test(t._navigator && t._navigator.userAgent.toLowerCase());
                        t._navigator && !h && (t.usingWebAudio = !1)
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
    Kr = async e => new Promise(n => setTimeout(n, e)), kl = e => new URLSearchParams(window.location.search).get(e), ri = kl("muted"), $l = !ri || ri === "1", Il = {
        muted: $l
    }, [co, vs] = Zt(Il);
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
    Rt = {
        options: co,
        toggleMute: Pl,
        setMute: Ol
    },
    at = (e, n = {}) => {
        const [t, o] = q(null), [i, s] = q(!1);
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
                onplayerror: function(d, h) {
                    typeof h == "string" && h.includes("Playback was unable to start") && s(!0)
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
            const r = Rt.options.muted,
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
    Cl = [{
        src: {
            mp3: "ambient-tracks/ambient-track/ambient-1.mp3",
            webm: "ambient-tracks/ambient-track/ambient-1.webm"
        },
        postDate: "2023-11-02"
    }],
    El = "modulepreload",
    Dl = function(e) {
        return "/" + e
    },
    oi = {},
    Ml = function(n, t, o) {
        if (!t || t.length === 0) return n();
        const i = document.getElementsByTagName("link");
        return Promise.all(t.map(s => {
            if (s = Dl(s), s in oi) return;
            oi[s] = !0;
            const l = s.endsWith(".css"),
                c = l ? '[rel="stylesheet"]' : "";
            if (!!o)
                for (let p = i.length - 1; p >= 0; p--) {
                    const r = i[p];
                    if (r.href === s && (!l || r.rel === "stylesheet")) return
                } else if (document.querySelector('link[href="'.concat(s, '"]').concat(c))) return;
            const f = document.createElement("link");
            if (f.rel = l ? "stylesheet" : El, l || (f.as = "script", f.crossOrigin = ""), f.href = s, document.head.appendChild(f), l) return new Promise((p, r) => {
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
var gs = {
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
            h = "date",
            v = "Invalid Date",
            m = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
            g = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
            y = {
                name: "en",
                weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                ordinal: function(M) {
                    var $ = ["th", "st", "nd", "rd"],
                        k = M % 100;
                    return "[" + M + ($[(k - 20) % 10] || $[k] || $[0]) + "]"
                }
            },
            w = function(M, $, k) {
                var x = String(M);
                return !x || x.length >= $ ? M : "" + Array($ + 1 - x.length).join(k) + M
            },
            b = {
                s: w,
                z: function(M) {
                    var $ = -M.utcOffset(),
                        k = Math.abs($),
                        x = Math.floor(k / 60),
                        A = k % 60;
                    return ($ <= 0 ? "+" : "-") + w(x, 2, "0") + ":" + w(A, 2, "0")
                },
                m: function M($, k) {
                    if ($.date() < k.date()) return -M(k, $);
                    var x = 12 * (k.year() - $.year()) + (k.month() - $.month()),
                        A = $.clone().add(x, r),
                        D = k - A < 0,
                        P = $.clone().add(x + (D ? -1 : 1), r);
                    return +(-(x + (k - A) / (D ? A - P : P - A)) || 0)
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
                        D: h,
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
            I = "en",
            N = {};
        N[I] = y;
        var G = "$isDayjsObject",
            L = function(M) {
                return M instanceof J || !(!M || !M[G])
            },
            B = function M($, k, x) {
                var A;
                if (!$) return I;
                if (typeof $ == "string") {
                    var D = $.toLowerCase();
                    N[D] && (A = D), k && (N[D] = k, A = D);
                    var P = $.split("-");
                    if (!A && P.length > 1) return M(P[0])
                } else {
                    var F = $.name;
                    N[F] = $, A = F
                }
                return !x && A && (I = A), A || !x && I
            },
            j = function(M, $) {
                if (L(M)) return M.clone();
                var k = typeof $ == "object" ? $ : {};
                return k.date = M, k.args = arguments, new J(k)
            },
            R = b;
        R.l = B, R.i = L, R.w = function(M, $) {
            return j(M, {
                locale: $.$L,
                utc: $.$u,
                x: $.$x,
                $offset: $.$offset
            })
        };
        var J = function() {
                function M(k) {
                    this.$L = B(k.locale, null, !0), this.parse(k), this.$x = this.$x || k.x || {}, this[G] = !0
                }
                var $ = M.prototype;
                return $.parse = function(k) {
                    this.$d = function(x) {
                        var A = x.date,
                            D = x.utc;
                        if (A === null) return new Date(NaN);
                        if (R.u(A)) return new Date;
                        if (A instanceof Date) return new Date(A);
                        if (typeof A == "string" && !/Z$/i.test(A)) {
                            var P = A.match(m);
                            if (P) {
                                var F = P[2] - 1 || 0,
                                    Y = (P[7] || "0").substring(0, 3);
                                return D ? new Date(Date.UTC(P[1], F, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, Y)) : new Date(P[1], F, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, Y)
                            }
                        }
                        return new Date(A)
                    }(k), this.init()
                }, $.init = function() {
                    var k = this.$d;
                    this.$y = k.getFullYear(), this.$M = k.getMonth(), this.$D = k.getDate(), this.$W = k.getDay(), this.$H = k.getHours(), this.$m = k.getMinutes(), this.$s = k.getSeconds(), this.$ms = k.getMilliseconds()
                }, $.$utils = function() {
                    return R
                }, $.isValid = function() {
                    return this.$d.toString() !== v
                }, $.isSame = function(k, x) {
                    var A = j(k);
                    return this.startOf(x) <= A && A <= this.endOf(x)
                }, $.isAfter = function(k, x) {
                    return j(k) < this.startOf(x)
                }, $.isBefore = function(k, x) {
                    return this.endOf(x) < j(k)
                }, $.$g = function(k, x, A) {
                    return R.u(k) ? this[x] : this.set(A, k)
                }, $.unix = function() {
                    return Math.floor(this.valueOf() / 1e3)
                }, $.valueOf = function() {
                    return this.$d.getTime()
                }, $.startOf = function(k, x) {
                    var A = this,
                        D = !!R.u(x) || x,
                        P = R.p(k),
                        F = function(U, V) {
                            var H = R.w(A.$u ? Date.UTC(A.$y, V, U) : new Date(A.$y, V, U), A);
                            return D ? H : H.endOf(f)
                        },
                        Y = function(U, V) {
                            return R.w(A.toDate()[U].apply(A.toDate("s"), (D ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(V)), A)
                        },
                        K = this.$W,
                        Q = this.$M,
                        re = this.$D,
                        _e = "set" + (this.$u ? "UTC" : "");
                    switch (P) {
                        case d:
                            return D ? F(1, 0) : F(31, 11);
                        case r:
                            return D ? F(1, Q) : F(0, Q + 1);
                        case p:
                            var O = this.$locale().weekStart || 0,
                                Z = (K < O ? K + 7 : K) - O;
                            return F(D ? re - Z : re + (6 - Z), Q);
                        case f:
                        case h:
                            return Y(_e + "Hours", 0);
                        case u:
                            return Y(_e + "Minutes", 1);
                        case c:
                            return Y(_e + "Seconds", 2);
                        case l:
                            return Y(_e + "Milliseconds", 3);
                        default:
                            return this.clone()
                    }
                }, $.endOf = function(k) {
                    return this.startOf(k, !1)
                }, $.$set = function(k, x) {
                    var A, D = R.p(k),
                        P = "set" + (this.$u ? "UTC" : ""),
                        F = (A = {}, A[f] = P + "Date", A[h] = P + "Date", A[r] = P + "Month", A[d] = P + "FullYear", A[u] = P + "Hours", A[c] = P + "Minutes", A[l] = P + "Seconds", A[s] = P + "Milliseconds", A)[D],
                        Y = D === f ? this.$D + (x - this.$W) : x;
                    if (D === r || D === d) {
                        var K = this.clone().set(h, 1);
                        K.$d[F](Y), K.init(), this.$d = K.set(h, Math.min(this.$D, K.daysInMonth())).$d
                    } else F && this.$d[F](Y);
                    return this.init(), this
                }, $.set = function(k, x) {
                    return this.clone().$set(k, x)
                }, $.get = function(k) {
                    return this[R.p(k)]()
                }, $.add = function(k, x) {
                    var A, D = this;
                    k = Number(k);
                    var P = R.p(x),
                        F = function(Q) {
                            var re = j(D);
                            return R.w(re.date(re.date() + Math.round(Q * k)), D)
                        };
                    if (P === r) return this.set(r, this.$M + k);
                    if (P === d) return this.set(d, this.$y + k);
                    if (P === f) return F(1);
                    if (P === p) return F(7);
                    var Y = (A = {}, A[c] = o, A[u] = i, A[l] = t, A)[P] || 1,
                        K = this.$d.getTime() + k * Y;
                    return R.w(K, this)
                }, $.subtract = function(k, x) {
                    return this.add(-1 * k, x)
                }, $.format = function(k) {
                    var x = this,
                        A = this.$locale();
                    if (!this.isValid()) return A.invalidDate || v;
                    var D = k || "YYYY-MM-DDTHH:mm:ssZ",
                        P = R.z(this),
                        F = this.$H,
                        Y = this.$m,
                        K = this.$M,
                        Q = A.weekdays,
                        re = A.months,
                        _e = A.meridiem,
                        O = function(V, H, W, ve) {
                            return V && (V[H] || V(x, D)) || W[H].slice(0, ve)
                        },
                        Z = function(V) {
                            return R.s(F % 12 || 12, V, "0")
                        },
                        U = _e || function(V, H, W) {
                            var ve = V < 12 ? "AM" : "PM";
                            return W ? ve.toLowerCase() : ve
                        };
                    return D.replace(g, function(V, H) {
                        return H || function(W) {
                            switch (W) {
                                case "YY":
                                    return String(x.$y).slice(-2);
                                case "YYYY":
                                    return R.s(x.$y, 4, "0");
                                case "M":
                                    return K + 1;
                                case "MM":
                                    return R.s(K + 1, 2, "0");
                                case "MMM":
                                    return O(A.monthsShort, K, re, 3);
                                case "MMMM":
                                    return O(re, K);
                                case "D":
                                    return x.$D;
                                case "DD":
                                    return R.s(x.$D, 2, "0");
                                case "d":
                                    return String(x.$W);
                                case "dd":
                                    return O(A.weekdaysMin, x.$W, Q, 2);
                                case "ddd":
                                    return O(A.weekdaysShort, x.$W, Q, 3);
                                case "dddd":
                                    return Q[x.$W];
                                case "H":
                                    return String(F);
                                case "HH":
                                    return R.s(F, 2, "0");
                                case "h":
                                    return Z(1);
                                case "hh":
                                    return Z(2);
                                case "a":
                                    return U(F, Y, !0);
                                case "A":
                                    return U(F, Y, !1);
                                case "m":
                                    return String(Y);
                                case "mm":
                                    return R.s(Y, 2, "0");
                                case "s":
                                    return String(x.$s);
                                case "ss":
                                    return R.s(x.$s, 2, "0");
                                case "SSS":
                                    return R.s(x.$ms, 3, "0");
                                case "Z":
                                    return P
                            }
                            return null
                        }(V) || P.replace(":", "")
                    })
                }, $.utcOffset = function() {
                    return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                }, $.diff = function(k, x, A) {
                    var D, P = this,
                        F = R.p(x),
                        Y = j(k),
                        K = (Y.utcOffset() - this.utcOffset()) * o,
                        Q = this - Y,
                        re = function() {
                            return R.m(P, Y)
                        };
                    switch (F) {
                        case d:
                            D = re() / 12;
                            break;
                        case r:
                            D = re();
                            break;
                        case a:
                            D = re() / 3;
                            break;
                        case p:
                            D = (Q - K) / 6048e5;
                            break;
                        case f:
                            D = (Q - K) / 864e5;
                            break;
                        case u:
                            D = Q / i;
                            break;
                        case c:
                            D = Q / o;
                            break;
                        case l:
                            D = Q / t;
                            break;
                        default:
                            D = Q
                    }
                    return A ? D : R.a(D)
                }, $.daysInMonth = function() {
                    return this.endOf(r).$D
                }, $.$locale = function() {
                    return N[this.$L]
                }, $.locale = function(k, x) {
                    if (!k) return this.$L;
                    var A = this.clone(),
                        D = B(k, x, !0);
                    return D && (A.$L = D), A
                }, $.clone = function() {
                    return R.w(this.$d, this)
                }, $.toDate = function() {
                    return new Date(this.valueOf())
                }, $.toJSON = function() {
                    return this.isValid() ? this.toISOString() : null
                }, $.toISOString = function() {
                    return this.$d.toISOString()
                }, $.toString = function() {
                    return this.$d.toUTCString()
                }, M
            }(),
            de = J.prototype;
        return j.prototype = de, [
            ["$ms", s],
            ["$s", l],
            ["$m", c],
            ["$H", u],
            ["$W", f],
            ["$M", r],
            ["$y", d],
            ["$D", h]
        ].forEach(function(M) {
            de[M[1]] = function($) {
                return this.$g($, M[0], M[1])
            }
        }), j.extend = function(M, $) {
            return M.$i || (M($, J, j), M.$i = !0), j
        }, j.locale = B, j.isDayjs = L, j.unix = function(M) {
            return j(1e3 * M)
        }, j.en = N[I], j.Ls = N, j.p = {}, j
    })
})(gs);
var Bl = gs.exports;
const We = yn(Bl);
var ms = {
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
})(ms);
var Ll = ms.exports;
const Rl = yn(Ll);
var _s = {
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
            c.utc = function(v) {
                var m = {
                    date: v,
                    utc: !0,
                    args: arguments
                };
                return new l(m)
            }, u.utc = function(v) {
                var m = c(this.toDate(), {
                    locale: this.$L,
                    utc: !0
                });
                return v ? m.add(this.utcOffset(), t) : m
            }, u.local = function() {
                return c(this.toDate(), {
                    locale: this.$L,
                    utc: !1
                })
            };
            var f = u.parse;
            u.parse = function(v) {
                v.utc && (this.$u = !0), this.$utils().u(v.$offset) || (this.$offset = v.$offset), f.call(this, v)
            };
            var p = u.init;
            u.init = function() {
                if (this.$u) {
                    var v = this.$d;
                    this.$y = v.getUTCFullYear(), this.$M = v.getUTCMonth(), this.$D = v.getUTCDate(), this.$W = v.getUTCDay(), this.$H = v.getUTCHours(), this.$m = v.getUTCMinutes(), this.$s = v.getUTCSeconds(), this.$ms = v.getUTCMilliseconds()
                } else p.call(this)
            };
            var r = u.utcOffset;
            u.utcOffset = function(v, m) {
                var g = this.$utils().u;
                if (g(v)) return this.$u ? 0 : g(this.$offset) ? r.call(this) : this.$offset;
                if (typeof v == "string" && (v = function(I) {
                        I === void 0 && (I = "");
                        var N = I.match(o);
                        if (!N) return null;
                        var G = ("" + N[0]).match(i) || ["-", 0, 0],
                            L = G[0],
                            B = 60 * +G[1] + +G[2];
                        return B === 0 ? 0 : L === "+" ? B : -B
                    }(v), v === null)) return this;
                var y = Math.abs(v) <= 16 ? 60 * v : v,
                    w = this;
                if (m) return w.$offset = y, w.$u = v === 0, w;
                if (v !== 0) {
                    var b = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
                    (w = this.local().add(y + b, t)).$offset = y, w.$x.$localOffset = b
                } else w = this.utc();
                return w
            };
            var a = u.format;
            u.format = function(v) {
                var m = v || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
                return a.call(this, m)
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
            var d = u.toDate;
            u.toDate = function(v) {
                return v === "s" && this.$offset ? c(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : d.call(this)
            };
            var h = u.diff;
            u.diff = function(v, m, g) {
                if (v && this.$u === v.$u) return h.call(this, v, m, g);
                var y = this.local(),
                    w = c(v).local();
                return h.call(y, w, m, g)
            }
        }
    })
})(_s);
var Vl = _s.exports;
const jl = yn(Vl);
var ys = {
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
            var c, u = function(a, d, h) {
                    h === void 0 && (h = {});
                    var v = new Date(a),
                        m = function(g, y) {
                            y === void 0 && (y = {});
                            var w = y.timeZoneName || "short",
                                b = g + "|" + w,
                                I = o[b];
                            return I || (I = new Intl.DateTimeFormat("en-US", {
                                hour12: !1,
                                timeZone: g,
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                timeZoneName: w
                            }), o[b] = I), I
                        }(d, h);
                    return m.formatToParts(v)
                },
                f = function(a, d) {
                    for (var h = u(a, d), v = [], m = 0; m < h.length; m += 1) {
                        var g = h[m],
                            y = g.type,
                            w = g.value,
                            b = t[y];
                        b >= 0 && (v[b] = parseInt(w, 10))
                    }
                    var I = v[3],
                        N = I === 24 ? 0 : I,
                        G = v[0] + "-" + v[1] + "-" + v[2] + " " + N + ":" + v[4] + ":" + v[5] + ":000",
                        L = +a;
                    return (l.utc(G).valueOf() - (L -= L % 1e3)) / 6e4
                },
                p = s.prototype;
            p.tz = function(a, d) {
                a === void 0 && (a = c);
                var h = this.utcOffset(),
                    v = this.toDate(),
                    m = v.toLocaleString("en-US", {
                        timeZone: a
                    }),
                    g = Math.round((v - new Date(m)) / 1e3 / 60),
                    y = l(m, {
                        locale: this.$L
                    }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(v.getTimezoneOffset() / 15) - g, !0);
                if (d) {
                    var w = y.utcOffset();
                    y = y.add(h - w, "minute")
                }
                return y.$x.$timezone = a, y
            }, p.offsetName = function(a) {
                var d = this.$x.$timezone || l.tz.guess(),
                    h = u(this.valueOf(), d, {
                        timeZoneName: a
                    }).find(function(v) {
                        return v.type.toLowerCase() === "timezonename"
                    });
                return h && h.value
            };
            var r = p.startOf;
            p.startOf = function(a, d) {
                if (!this.$x || !this.$x.$timezone) return r.call(this, a, d);
                var h = l(this.format("YYYY-MM-DD HH:mm:ss:SSS"), {
                    locale: this.$L
                });
                return r.call(h, a, d).tz(this.$x.$timezone, !0)
            }, l.tz = function(a, d, h) {
                var v = h && d,
                    m = h || d || c,
                    g = f(+l(), m);
                if (typeof a != "string") return l(a).tz(m);
                var y = function(N, G, L) {
                        var B = N - 60 * G * 1e3,
                            j = f(B, L);
                        if (G === j) return [B, G];
                        var R = f(B -= 60 * (j - G) * 1e3, L);
                        return j === R ? [B, j] : [N - 60 * Math.min(j, R) * 1e3, Math.max(j, R)]
                    }(l.utc(a, v).valueOf(), g, m),
                    w = y[0],
                    b = y[1],
                    I = l(w).utcOffset(b);
                return I.$x.$timezone = m, I
            }, l.tz.guess = function() {
                return Intl.DateTimeFormat().resolvedOptions().timeZone
            }, l.tz.setDefault = function(a) {
                c = a
            }
        }
    })
})(ys);
var zl = ys.exports;
const Nl = yn(zl);
We.extend(jl);
We.extend(Nl);
We.extend(Rl);
const Ul = e => We(e),
    bs = (e, n, t, o = 0) => We(e).set("hour", n).set("minute", t).set("second", o),
    ws = e => We().tz(e),
    Hl = (e, n) => We(e).format(n),
    Fl = (e, n) => We(e).isSameOrBefore(n),
    As = (e, n) => We(e).isAfter(n),
    Zl = void 0;
Zt(Zl);
const Gt = e => () => e,
    Gl = "/assets/ambient-1-0f115a64.mp3",
    Yl = "/assets/ambient-1-bb1f2cb4.webm",
    ql = "/assets/logbook-1-0fb8b45d.jpg",
    Wl = "/assets/logbook-10-bdea2a5b.jpg",
    Kl = "/assets/logbook-11-4c9da7f0.jpg",
    Jl = "/assets/logbook-12-60bf2721.jpg",
    Ql = "/assets/logbook-13-e5cbd10b.jpg",
    Xl = "/assets/logbook-14-27366e53.jpg",
    ec = "/assets/logbook-15-0adb8736.jpg",
    tc = "/assets/logbook-16-860ce45f.jpg",
    nc = "/assets/logbook-2-f34a92a7.jpg",
    rc = "/assets/logbook-3-702b48ec.jpg",
    oc = "/assets/logbook-4-e1e4d6b8.jpg",
    ic = "/assets/logbook-5-b07340b1.jpg",
    sc = "/assets/logbook-6-aad79ad3.jpg",
    ac = "/assets/logbook-7-447b8550.jpg",
    lc = "/assets/logbook-8-75782f09.jpg",
    cc = "/assets/logbook-9-5c82ced1.jpg",
    uc = "/assets/bg-0f015610.png",
    fc = "/assets/transition-video-d35af239.mp4",
    Tt = e => new URL(Object.assign({
        "../../../content/assets/ambient-tracks/ambient-track/ambient-1.mp3": Gl,
        "../../../content/assets/ambient-tracks/ambient-track/ambient-1.webm": Yl,
        "../../../content/assets/logs/log/logbook-1.jpg": ql,
        "../../../content/assets/logs/log/logbook-10.jpg": Wl,
        "../../../content/assets/logs/log/logbook-11.jpg": Kl,
        "../../../content/assets/logs/log/logbook-12.jpg": Jl,
        "../../../content/assets/logs/log/logbook-13.jpg": Ql,
        "../../../content/assets/logs/log/logbook-14.jpg": Xl,
        "../../../content/assets/logs/log/logbook-15.jpg": ec,
        "../../../content/assets/logs/log/logbook-16.jpg": tc,
        "../../../content/assets/logs/log/logbook-2.jpg": nc,
        "../../../content/assets/logs/log/logbook-3.jpg": rc,
        "../../../content/assets/logs/log/logbook-4.jpg": oc,
        "../../../content/assets/logs/log/logbook-5.jpg": ic,
        "../../../content/assets/logs/log/logbook-6.jpg": sc,
        "../../../content/assets/logs/log/logbook-7.jpg": ac,
        "../../../content/assets/logs/log/logbook-8.jpg": lc,
        "../../../content/assets/logs/log/logbook-9.jpg": cc,
        "../../../content/assets/scenes/scene/bg.png": uc,
        "../../../content/assets/scenes/scene/transition-video.mp4": fc
    })["../../../content/assets/".concat(e)], self.location).href,
    dc = Cl,
    pc = Gt(dc),
    ii = () => {
        const e = pc()[0];
        return ht(ye({}, e), {
            srcWebm: Tt(e.src.webm),
            srcMp3: Tt(e.src.mp3)
        })
    },
    vc = [],
    hc = vc,
    gc = Gt(hc),
    on = () => {
        const e = gc()[0];
        if (e) return ht(ye({}, e), {
            srcWebm: Tt(e.src.webm),
            srcMp3: Tt(e.src.mp3)
        })
    },
    mc = "/assets/background-music-83982c9a.webm",
    _c = "/assets/background-music-f98c94df.mp3";

function yc(e) {
    return e !== null && (typeof e == "object" || typeof e == "function")
}

function si(e, ...n) {
    return typeof e == "function" ? e(...n) : e
}
var bc = (e => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, {
        get: (n, t) => (typeof require < "u" ? require : n)[t]
    }) : e)(function(e) {
        if (typeof require < "u") return require.apply(this, arguments);
        throw Error('Dynamic require of "' + e + '" is not supported')
    }),
    wc = e => (typeof e.clear == "function" || (e.clear = () => {
        let n;
        for (; n = e.key(0);) e.removeItem(n)
    }), e),
    Ac = e => {
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
    ai = bc("solid-start/server").useRequest
} catch (e) {
    ai = () => (console.warn("It seems you attempt to use cookieStorage on the server without having solid-start installed"), {
        request: {
            headers: {
                get: () => ""
            }
        }
    })
}
var gt = wc({
    _read: () => document.cookie,
    _write: (e, n, t) => {
        document.cookie = "".concat(e, "=").concat(n).concat(Ac(t))
    },
    getItem: (e, n) => {
        var t, o;
        return (o = (t = gt._read(n).match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)")) == null ? void 0 : t.pop()) != null ? o : null
    },
    setItem: (e, n, t) => {
        const o = gt.getItem(e);
        gt._write(e, n, t);
        const i = Object.assign(new Event("storage"), {
            key: e,
            oldValue: o,
            newValue: n,
            url: globalThis.document.URL,
            storageArea: gt
        });
        window.dispatchEvent(i)
    },
    removeItem: e => {
        gt._write(e, "deleted", {
            expires: new Date(0)
        })
    },
    key: e => {
        let n = null,
            t = 0;
        return gt._read().replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g, (o, i) => (!n && i && t++ === e && (n = i), "")), n
    },
    get length() {
        let e = 0;
        return gt._read().replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g, n => (e += n ? 1 : 0, "")), e
    }
});

function xc(e, n = {}) {
    const t = n.storage || globalThis.localStorage;
    if (!t) return e;
    const o = n.name || "storage-".concat(os()),
        i = n.serialize || JSON.stringify.bind(JSON),
        s = n.deserialize || JSON.parse.bind(JSON),
        l = t.getItem(o, n.storageOptions),
        c = typeof e[0] == "function" ? f => e[1](() => s(f)) : f => e[1](Al(s(f)));
    let u = !0;
    return l instanceof Promise ? l.then(f => u && f && c(f)) : l && c(l), [e[0], typeof e[0] == "function" ? f => {
        const p = e[1](f);
        return f != null ? t.setItem(o, i(p), n.storageOptions) : t.removeItem(o), u = !1, p
    } : (...f) => {
        e[1](...f), t.setItem(o, i(fe(() => e[0])), n.storageOptions), u = !1
    }]
}
const Sc = [{
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
    Tc = Sc,
    kc = Gt(Tc),
    fn = () => kc().map(n => ht(ye({}, n), {
        postDate: Ul(n.postDate).subtract(2, "day").format("YYYY-MM-DD")
    })),
    $c = {
        isInstructionsModalViewed: !1,
        isDataUsageWarningDialogAccepted: !1
    },
    [ct, bn] = xc(Zt($c), {
        name: "notifications-manager-data"
    }),
    Ic = () => ct.isInstructionsModalViewed !== !0,
    Pc = () => {
        bn("isInstructionsModalViewed", !0)
    },
    Oc = () => ct.isDataUsageWarningDialogAccepted === !0,
    Cc = () => {
        bn("isDataUsageWarningDialogAccepted", !0)
    },
    Ec = () => {
        const e = on();
        return e ? ct.lastPlayedAnsweringMachineTrackDate ? As(e.postDate, ct.lastPlayedAnsweringMachineTrackDate) : !0 : !1
    },
    Dc = () => {
        const e = on();
        e && bn("lastPlayedAnsweringMachineTrackDate", e.postDate)
    },
    Mc = () => {
        const e = fn()[0];
        return e ? ct.lastPlayedArchiveDate ? As(e.postDate, ct.lastPlayedArchiveDate) : !0 : !1
    },
    Bc = e => {
        ct.lastPlayedArchiveDate && Fl(e, ct.lastPlayedArchiveDate) || bn("lastPlayedArchiveDate", e)
    },
    Lc = () => {
        const e = fn()[0];
        e && bn("lastPlayedArchiveDate", e.postDate)
    },
    Ge = {
        instructionsModal: {
            isVisible: Ic,
            setViewed: Pc
        },
        dataUsageWarningDialog: {
            accepted: Oc,
            setAccepted: Cc
        },
        answeringMachineTrack: {
            hasNew: Ec,
            setLastPlayed: Dc
        },
        archive: {
            hasNew: Mc,
            setLastPlayed: Bc,
            dismissNotification: Lc
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
var Jr = {
        exports: {}
    },
    li = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (li) {
    var ci = new Uint8Array(16);
    Jr.exports = function() {
        return li(ci), ci
    }
} else {
    var ui = new Array(16);
    Jr.exports = function() {
        for (var n = 0, t; n < 16; n++) n & 3 || (t = Math.random() * 4294967296), ui[n] = t >>> ((n & 3) << 3) & 255;
        return ui
    }
}
var xs = Jr.exports,
    Ss = [];
for (var zn = 0; zn < 256; ++zn) Ss[zn] = (zn + 256).toString(16).substr(1);

function Rc(e, n) {
    var t = n || 0,
        o = Ss;
    return [o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]]].join("")
}
var Ts = Rc,
    Vc = xs,
    jc = Ts,
    fi, kr, $r = 0,
    Ir = 0;

function zc(e, n, t) {
    var o = n && t || 0,
        i = n || [];
    e = e || {};
    var s = e.node || fi,
        l = e.clockseq !== void 0 ? e.clockseq : kr;
    if (s == null || l == null) {
        var c = Vc();
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
    return n || jc(i)
}
var Nc = zc,
    Uc = xs,
    Hc = Ts;

function Fc(e, n, t) {
    var o = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var i = e.random || (e.rng || Uc)();
    if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, n)
        for (var s = 0; s < 16; ++s) n[o + s] = i[s];
    return n || Hc(i)
}
var Zc = Fc,
    Gc = Nc,
    ks = Zc,
    uo = ks;
uo.v1 = Gc;
uo.v4 = ks;
var Yc = uo;
/*!
 * Core functionality for Snowplow JavaScript trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var qc = "3.16.0";

function Wc(e) {
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
    return Qc(t)
}

function Kc(e) {
    if (!e) return e;
    var n = Jc(e);
    return n.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}
var it = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function Jc(e) {
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

function Qc(e) {
    var n = function(h) {
            return decodeURIComponent(h.split("").map(function(v) {
                return "%" + ("00" + v.charCodeAt(0).toString(16)).slice(-2)
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
            if (r && $s(r)) {
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

function Xc(e) {
    return function(n, t, o) {
        for (var i = function(a, d, h) {
                var v = JSON.stringify(a);
                e ? n.add(d, Kc(v)) : n.add(h, v)
            }, s = function() {
                var a = n.getPayload();
                if (e ? a.cx : a.co) return JSON.parse(e ? Wc(a.cx) : a.co)
            }, l = function(a, d) {
                var h = a || s();
                return h ? h.data = h.data.concat(d.data) : h = d, h
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

function $s(e) {
    if (!Is(e)) return !1;
    for (var n in e)
        if (Object.prototype.hasOwnProperty.call(e, n)) return !0;
    return !1
}

function Is(e) {
    return typeof e < "u" && e !== null && (e.constructor === {}.constructor || e.constructor === [].constructor)
}
var Nn = "Snowplow: ",
    Ne;
(function(e) {
    e[e.none = 0] = "none", e[e.error = 1] = "error", e[e.warn = 2] = "warn", e[e.debug = 3] = "debug", e[e.info = 4] = "info"
})(Ne || (Ne = {}));
var Ve = eu();

function eu(e) {
    e === void 0 && (e = Ne.warn);

    function n(l) {
        Ne[l] ? e = l : e = Ne.warn
    }

    function t(l, c) {
        for (var u = [], f = 2; f < arguments.length; f++) u[f - 2] = arguments[f];
        if (e >= Ne.error && typeof console < "u") {
            var p = Nn + l + "\n";
            c ? console.error.apply(console, tt([p + "\n", c], u, !1)) : console.error.apply(console, tt([p], u, !1))
        }
    }

    function o(l, c) {
        for (var u = [], f = 2; f < arguments.length; f++) u[f - 2] = arguments[f];
        if (e >= Ne.warn && typeof console < "u") {
            var p = Nn + l;
            c ? console.warn.apply(console, tt([p + "\n", c], u, !1)) : console.warn.apply(console, tt([p], u, !1))
        }
    }

    function i(l) {
        for (var c = [], u = 1; u < arguments.length; u++) c[u - 1] = arguments[u];
        e >= Ne.debug && typeof console < "u" && console.debug.apply(console, tt([Nn + l], c, !1))
    }

    function s(l) {
        for (var c = [], u = 1; u < arguments.length; u++) c[u - 1] = arguments[u];
        e >= Ne.info && typeof console < "u" && console.info.apply(console, tt([Nn + l], c, !1))
    }
    return {
        setLogLevel: n,
        warn: o,
        error: t,
        debug: i,
        info: s
    }
}

function tu() {
    var e = [],
        n = [],
        t = function(o) {
            var i = cu(o),
                s = uu(o),
                l = [],
                c = Xr(e, o, s, i);
            l.push.apply(l, c);
            var u = vu(n, o, s, i);
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
                pi(u) ? i.push(u) : Nt(u) && s.push(u)
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
                    }) : Nt(u) && (e = e.filter(function(f) {
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

function nu(e) {
    return {
        addPluginContexts: function(n) {
            var t = n ? tt([], n, !0) : [];
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

function ru(e) {
    var n = new RegExp("^iglu:([a-zA-Z0-9-_.]+)/([a-zA-Z0-9-_]+)/jsonschema/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$"),
        t = n.exec(e);
    if (t !== null) return t.slice(1, 6)
}

function ou(e) {
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

function Ps(e) {
    var n = e.split(".");
    return n && n.length > 1 ? ou(n) : !1
}

function Os(e) {
    var n = new RegExp("^iglu:((?:(?:[a-zA-Z0-9-_]+|\\*).)+(?:[a-zA-Z0-9-_]+|\\*))/([a-zA-Z0-9-_.]+|\\*)/jsonschema/([1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)$"),
        t = n.exec(e);
    if (t !== null && Ps(t[1])) return t.slice(1, 6)
}

function Qr(e) {
    var n = Os(e);
    if (n) {
        var t = n[0];
        return n.length === 5 && Ps(t)
    }
    return !1
}

function iu(e) {
    return Array.isArray(e) && e.every(function(n) {
        return typeof n == "string"
    })
}

function di(e) {
    return iu(e) ? e.every(function(n) {
        return Qr(n)
    }) : typeof e == "string" ? Qr(e) : !1
}

function dn(e) {
    var n = e;
    return $s(n) && "schema" in n && "data" in n ? typeof n.schema == "string" && typeof n.data == "object" : !1
}

function su(e) {
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

function Nt(e) {
    return or(e) || dn(e)
}

function Cs(e) {
    return Array.isArray(e) && e.length === 2 ? Array.isArray(e[1]) ? or(e[0]) && e[1].every(Nt) : or(e[0]) && Nt(e[1]) : !1
}

function Es(e) {
    return Array.isArray(e) && e.length === 2 && su(e[0]) ? Array.isArray(e[1]) ? e[1].every(Nt) : Nt(e[1]) : !1
}

function pi(e) {
    return Cs(e) || Es(e)
}

function au(e, n) {
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
    if (!Qr(e)) return !1;
    var t = Os(e),
        o = ru(n);
    if (t && o) {
        if (!lu(t[0], o[0])) return !1;
        for (var i = 1; i < 5; i++)
            if (!Ds(t[i], o[i])) return !1;
        return !0
    }
    return !1
}

function lu(e, n) {
    var t = n.split("."),
        o = e.split(".");
    if (t && o) {
        if (t.length !== o.length) return !1;
        for (var i = 0; i < o.length; i++)
            if (!Ds(t[i], o[i])) return !1;
        return !0
    }
    return !1
}

function Ds(e, n) {
    return e && n && e === "*" || e === n
}

function cu(e) {
    for (var n = e.getJson(), t = 0, o = n; t < o.length; t++) {
        var i = o[t];
        if (i.keyIfEncoded === "ue_px" && typeof i.json.data == "object") {
            var s = i.json.data.schema;
            if (typeof s == "string") return s
        }
    }
    return ""
}

function uu(e) {
    var n = e.getPayload().e;
    return typeof n == "string" ? n : ""
}

function fu(e, n, t, o) {
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

function Ms(e) {
    return Array.isArray(e) ? e : Array.of(e)
}

function Xr(e, n, t, o) {
    var i, s = Ms(e),
        l = function(u) {
            var f = du(u, n, t, o);
            if (f && f.length !== 0) return f
        },
        c = s.map(l);
    return (i = []).concat.apply(i, c.filter(function(u) {
        return u != null && u.filter(Boolean)
    }))
}

function du(e, n, t, o) {
    if (dn(e)) return [e];
    if (or(e)) {
        var i = fu(e, n, t, o);
        if (dn(i)) return [i];
        if (Array.isArray(i)) return i
    }
}

function pu(e, n, t, o) {
    if (Cs(e)) {
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
    } else if (Es(e) && au(e[0], o)) return Xr(e[1], n, t, o);
    return []
}

function vu(e, n, t, o) {
    var i, s = Ms(e),
        l = function(u) {
            var f = pu(u, n, t, o);
            if (f && f.length !== 0) return f
        },
        c = s.map(l);
    return (i = []).concat.apply(i, c.filter(function(u) {
        return u != null && u.filter(Boolean)
    }))
}

function hu(e) {
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

function gu(e) {
    e === void 0 && (e = {});

    function n(u, f, p) {
        var r = nu(f),
            a = tu(),
            d = u,
            h = {};

        function v(b) {
            if (b && b.length) return {
                schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                data: b
            }
        }

        function m(b, I) {
            var N = a.getApplicableContexts(b),
                G = [];
            return I && I.length && G.push.apply(G, I), N && N.length && G.push.apply(G, N), G
        }

        function g(b, I, N) {
            b.withJsonProcessor(Xc(d)), b.add("eid", Yc.v4()), b.addDict(h);
            var G = hu(N);
            b.add(G.type, G.value.toString());
            var L = m(b, r.addPluginContexts(I)),
                B = v(L);
            B !== void 0 && b.addJson("cx", "co", B), f.forEach(function(R) {
                try {
                    R.beforeTrack && R.beforeTrack(b)
                } catch (J) {
                    Ve.error("Plugin beforeTrack", J)
                }
            }), typeof p == "function" && p(b);
            var j = b.build();
            return f.forEach(function(R) {
                try {
                    R.afterTrack && R.afterTrack(j)
                } catch (J) {
                    Ve.error("Plugin afterTrack", J)
                }
            }), j
        }

        function y(b, I) {
            h[b] = I
        }
        var w = {
            track: g,
            addPayloadPair: y,
            getBase64Encoding: function() {
                return d
            },
            setBase64Encoding: function(b) {
                d = b
            },
            addPayloadDict: function(b) {
                for (var I in b) Object.prototype.hasOwnProperty.call(b, I) && (h[I] = b[I])
            },
            resetPayloadPairs: function(b) {
                h = Is(b) ? b : {}
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
            setScreenResolution: function(b, I) {
                y("res", b + "x" + I)
            },
            setViewport: function(b, I) {
                y("vp", b + "x" + I)
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
                s.push(r), (f = r.logger) === null || f === void 0 || f.call(r, Ve), (p = r.activateCorePlugin) === null || p === void 0 || p.call(r, c)
            }
        });
    return s == null || s.forEach(function(u) {
        var f, p;
        (f = u.logger) === null || f === void 0 || f.call(u, Ve), (p = u.activateCorePlugin) === null || p === void 0 || p.call(u, c)
    }), c
}

function mu(e) {
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

function _u(e) {
    var n = e.pageUrl,
        t = e.pageTitle,
        o = e.referrer,
        i = fo();
    return i.add("e", "pv"), i.add("url", n), i.add("page", t), i.add("refr", o), i
}

function yu(e) {
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
var bu = qc,
    Bs = {
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
var wu = Ls.exports,
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
    vi = eo;
(function() {
    var e = wu,
        n = vi.utf8,
        t = vi.bin,
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
            for (var h = 0; h < l.length; h += 16) {
                for (var v = f, m = p, g = r, y = a, w = d, b = 0; b < 80; b++) {
                    if (b < 16) u[b] = l[h + b];
                    else {
                        var I = u[b - 3] ^ u[b - 8] ^ u[b - 14] ^ u[b - 16];
                        u[b] = I << 1 | I >>> 31
                    }
                    var N = (f << 5 | f >>> 27) + d + (u[b] >>> 0) + (b < 20 ? (p & r | ~p & a) + 1518500249 : b < 40 ? (p ^ r ^ a) + 1859775393 : b < 60 ? (p & r | p & a | r & a) - 1894007588 : (p ^ r ^ a) - 899497514);
                    d = a, a = r, r = p << 30 | p >>> 2, p = f, f = N
                }
                f += v, p += m, r += g, a += y, d += w
            }
            return [f, p, r, a, d]
        },
        i = function(s, l) {
            var c = e.wordsToBytes(o(s));
            return l && l.asBytes ? c : l && l.asString ? t.bytesToString(c) : e.bytesToHex(c)
        };
    i._blocksize = 16, i._digestsize = 20, Bs.exports = i
})();
var Au = Bs.exports;
const xu = yn(Au);
var to = {
        exports: {}
    },
    hi = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (hi) {
    var gi = new Uint8Array(16);
    to.exports = function() {
        return hi(gi), gi
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

function Su(e, n) {
    var t = n || 0,
        o = Vs;
    return [o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], "-", o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]], o[e[t++]]].join("")
}
var js = Su,
    Tu = Rs,
    ku = js,
    _i, Pr, Or = 0,
    Cr = 0;

function $u(e, n, t) {
    var o = n && t || 0,
        i = n || [];
    e = e || {};
    var s = e.node || _i,
        l = e.clockseq !== void 0 ? e.clockseq : Pr;
    if (s == null || l == null) {
        var c = Tu();
        s == null && (s = _i = [c[0] | 1, c[1], c[2], c[3], c[4], c[5]]), l == null && (l = Pr = (c[6] << 8 | c[7]) & 16383)
    }
    var u = e.msecs !== void 0 ? e.msecs : new Date().getTime(),
        f = e.nsecs !== void 0 ? e.nsecs : Cr + 1,
        p = u - Or + (f - Cr) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383), (p < 0 || u > Or) && e.nsecs === void 0 && (f = 0), f >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    Or = u, Cr = f, Pr = l, u += 122192928e5;
    var r = ((u & 268435455) * 1e4 + f) % 4294967296;
    i[o++] = r >>> 24 & 255, i[o++] = r >>> 16 & 255, i[o++] = r >>> 8 & 255, i[o++] = r & 255;
    var a = u / 4294967296 * 1e4 & 268435455;
    i[o++] = a >>> 8 & 255, i[o++] = a & 255, i[o++] = a >>> 24 & 15 | 16, i[o++] = a >>> 16 & 255, i[o++] = l >>> 8 | 128, i[o++] = l & 255;
    for (var d = 0; d < 6; ++d) i[o + d] = s[d];
    return n || ku(i)
}
var Iu = $u,
    Pu = Rs,
    Ou = js;

function Cu(e, n, t) {
    var o = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var i = e.random || (e.rng || Pu)();
    if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, n)
        for (var s = 0; s < 16; ++s) n[o + s] = i[s];
    return n || Ou(i)
}
var Eu = Cu,
    Du = Iu,
    zs = Eu,
    po = zs;
po.v1 = Du;
po.v4 = zs;
var nt = po;
/*!
 * Core functionality for Snowplow Browser trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function Mu(e) {
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

function Kn(e, n, t) {
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

function Bu(e, n) {
    try {
        return window.sessionStorage.setItem(e, n), !0
    } catch (t) {
        return !1
    }
}

function Ns(e) {
    return !!(e && typeof e.valueOf() == "string")
}

function wi(e) {
    return Number.isInteger && Number.isInteger(e) || typeof e == "number" && isFinite(e) && Math.floor(e) === e
}

function Ai(e) {
    if (!Ns(e)) {
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

function Er(e) {
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

function Lu(e, n, t) {
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

function Ru(e, n) {
    for (var t = window.location.hostname, o = "_sp_root_domain_test_", i = o + new Date().getTime(), s = "_test_value_" + new Date().getTime(), l = t.split("."), c = l.length - 2; c >= 0; c--) {
        var u = l.slice(c).join(".");
        if (_t(i, s, 0, "/", u, e, n), _t(i) === s) {
            ir(i, u, e, n);
            for (var f = Vu(o), p = 0; p < f.length; p++) ir(f[p], u, e, n);
            return u
        }
    }
    return t
}

function ir(e, n, t, o) {
    _t(e, "", -1, "/", n, t, o)
}

function Vu(e) {
    for (var n = document.cookie.split("; "), t = [], o = 0; o < n.length; o++) n[o].substring(0, e.length) === e && t.push(n[o]);
    return t
}

function _t(e, n, t, o, i, s, l) {
    return arguments.length > 1 ? document.cookie = e + "=" + encodeURIComponent(n != null ? n : "") + (t ? "; Expires=" + new Date(+new Date + t * 1e3).toUTCString() : "") + (o ? "; Path=" + o : "") + (i ? "; Domain=" + i : "") + (s ? "; SameSite=" + s : "") + (l ? "; Secure" : "") : decodeURIComponent((("; " + document.cookie).split("; " + e + "=")[1] || "").split(";")[0])
}

function ju() {
    try {
        return !!window.localStorage
    } catch (e) {
        return !0
    }
}

function zu() {
    var e = "modernizr";
    if (!ju()) return !1;
    try {
        var n = window.localStorage;
        return n.setItem(e, e), n.removeItem(e), !0
    } catch (t) {
        return !1
    }
}
var Nu = "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0",
    Uu = "iglu:com.snowplowanalytics.snowplow/browser_context/jsonschema/1-0-0",
    Hu = "iglu:com.snowplowanalytics.snowplow/client_session/jsonschema/1-0-2",
    Fu = "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4";

function Zu(e, n, t, o, i, s, l, c, u, f, p, r, a, d, h, v, m) {
    var g = !1,
        y, w = [],
        b = !1;
    o = typeof o == "string" ? o.toLowerCase() : o;
    var I = o === !0 || o === "beacon" || o === "true",
        N = !!(I && window.navigator && window.navigator.sendBeacon && !_e(window.navigator.userAgent)),
        G = N && I,
        L = o === "get",
        B = !!(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
        j = !L && B && (o === "post" || I),
        R = j ? i : "/i",
        J = "snowplowOutQueue_".concat(e, "_").concat(j ? "post2" : "get");
    if (I && (a = {}), s = t && zu() && j && s || 1, t) try {
        var de = window.localStorage.getItem(J);
        w = de ? JSON.parse(de) : []
    } catch (O) {}
    Array.isArray(w) || (w = []), n.outQueues.push(w), B && s > 1 && n.bufferFlushers.push(function(O) {
        g || P(O)
    });

    function M(O) {
        var Z = "?",
            U = {
                co: !0,
                cx: !0
            },
            V = !0;
        for (var H in O) O.hasOwnProperty(H) && !U.hasOwnProperty(H) && (V ? V = !1 : Z += "&", Z += encodeURIComponent(H) + "=" + encodeURIComponent(O[H]));
        for (var W in U) O.hasOwnProperty(W) && U.hasOwnProperty(W) && (Z += "&" + W + "=" + encodeURIComponent(O[W]));
        return Z
    }

    function $(O) {
        var Z = Object.keys(O).map(function(U) {
            return [U, O[U]]
        }).reduce(function(U, V) {
            var H = V[0],
                W = V[1];
            return U[H] = W.toString(), U
        }, {});
        return {
            evt: Z,
            bytes: k(JSON.stringify(Z))
        }
    }

    function k(O) {
        for (var Z = 0, U = 0; U < O.length; U++) {
            var V = O.charCodeAt(U);
            V <= 127 ? Z += 1 : V <= 2047 ? Z += 2 : V >= 55296 && V <= 57343 ? (Z += 4, U++) : V < 65535 ? Z += 3 : Z += 4
        }
        return Z
    }
    var x = function(O) {
        return typeof O[0] == "object" && "evt" in O[0]
    };

    function A(O, Z) {
        var U = Y(Z, !0, !1);
        U.send(K(Q([O.evt])))
    }

    function D(O, Z) {
        y = Z + R;
        var U = function(Ie, Ke) {
            return Ve.warn("Event (" + Ie + "B) too big, max is " + Ke)
        };
        if (j) {
            var V = $(O);
            if (V.bytes >= l) {
                U(V.bytes, l), A(V, y);
                return
            } else w.push(V)
        } else {
            var H = M(O);
            if (c > 0) {
                var W = re(H),
                    ve = k(W);
                if (ve >= c) {
                    if (U(ve, c), B) {
                        var V = $(O),
                            oe = Z + i;
                        A(V, oe)
                    }
                    return
                }
            }
            w.push(H)
        }
        var xe = !1;
        t && (xe = Kn(J, JSON.stringify(w.slice(0, f)))), !g && (!xe || w.length >= s) && P()
    }

    function P(O) {
        for (O === void 0 && (O = !1); w.length && typeof w[0] != "string" && typeof w[0] != "object";) w.shift();
        if (!w.length) {
            g = !1;
            return
        }
        if (!Ns(y)) throw "No collector configured";
        if (g = !0, m && !b) {
            var Z = Y(m, !1, O);
            b = !0, Z.timeout = p, Z.onreadystatechange = function() {
                Z.readyState === 4 && P()
            }, Z.send();
            return
        }
        if (B) {
            var U = function(Se) {
                    for (var ze = 0, xn = 0; ze < Se.length && (xn += Se[ze].bytes, !(xn >= l));) ze += 1;
                    return ze
                },
                V = void 0,
                H, W;
            x(w) ? (V = y, H = Y(V, !0, O), W = U(w)) : (V = re(w[0]), H = Y(V, !1, O), W = 1);
            var ve = setTimeout(function() {
                    H.abort(), g = !1
                }, p),
                oe = function(Se) {
                    for (var ze = 0; ze < Se; ze++) w.shift();
                    t && Kn(J, JSON.stringify(w.slice(0, f)))
                },
                xe = function(Se) {
                    oe(Se), P()
                };
            if (H.onreadystatechange = function() {
                    H.readyState === 4 && H.status >= 200 && (clearTimeout(ve), H.status < 300 ? xe(W) : (F(H.status) || (Ve.error("Status ".concat(H.status, ", will not retry.")), oe(W)), g = !1))
                }, !x(w)) H.send();
            else {
                var Ie = w.slice(0, W);
                if (Ie.length > 0) {
                    var Ke = !1,
                        Ee = Ie.map(function(Se) {
                            return Se.evt
                        });
                    if (G) {
                        var ft = new Blob([K(Q(Ee))], {
                            type: "application/json"
                        });
                        try {
                            Ke = navigator.sendBeacon(V, ft)
                        } catch (Se) {
                            Ke = !1
                        }
                    }
                    Ke === !0 ? xe(W) : H.send(K(Q(Ee)))
                }
            }
        } else if (!r && !x(w)) {
            var Je = new Image(1, 1),
                Qe = !0;
            Je.onload = function() {
                Qe && (Qe = !1, w.shift(), t && Kn(J, JSON.stringify(w.slice(0, f))), P())
            }, Je.onerror = function() {
                Qe && (Qe = !1, g = !1)
            }, Je.src = re(w[0]), setTimeout(function() {
                Qe && g && (Qe = !1, P())
            }, p)
        } else g = !1
    }

    function F(O) {
        return O >= 200 && O < 300 ? !1 : h.includes(O) ? !0 : !v.includes(O)
    }

    function Y(O, Z, U) {
        var V = new XMLHttpRequest;
        Z ? (V.open("POST", O, !U), V.setRequestHeader("Content-Type", "application/json; charset=UTF-8")) : V.open("GET", O, !U), V.withCredentials = d, r && V.setRequestHeader("SP-Anonymous", "*");
        for (var H in a) Object.prototype.hasOwnProperty.call(a, H) && V.setRequestHeader(H, a[H]);
        return V
    }

    function K(O) {
        return JSON.stringify({
            schema: Fu,
            data: O
        })
    }

    function Q(O) {
        for (var Z = new Date().getTime().toString(), U = 0; U < O.length; U++) O[U].stm = Z;
        return O
    }

    function re(O) {
        return u ? y + O.replace("?", "?stm=" + new Date().getTime() + "&") : y + O
    }
    return {
        enqueueRequest: D,
        executeQueue: function() {
            g || P()
        },
        setUseLocalStorage: function(O) {
            t = O
        },
        setAnonymousTracking: function(O) {
            r = O
        },
        setCollectorUrl: function(O) {
            y = O + R
        },
        setBufferSize: function(O) {
            s = O
        }
    };

    function _e(O) {
        return Z(13, O) || U(10, 15, O) && V(O);

        function Z(W, ve) {
            var oe = ve.match("(iP.+; CPU .*OS (d+)[_d]*.*) AppleWebKit/");
            return oe && oe.length ? parseInt(oe[0]) <= W : !1
        }

        function U(W, ve, oe) {
            var xe = oe.match("(Macintosh;.*Mac OS X (d+)_(d+)[_d]*.*) AppleWebKit/");
            return xe && xe.length ? parseInt(xe[0]) <= W || parseInt(xe[0]) === W && parseInt(xe[1]) <= ve : !1
        }

        function V(W) {
            return W.match("Version/.* Safari/") && !H(W)
        }

        function H(W) {
            return W.match("Chrom(e|ium)")
        }
    }
}

function Gu(e, n) {
    var t = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)"),
        o = t.exec(e);
    return o && (o == null ? void 0 : o.length) > 1 ? pn(n, o[1]) : null
}

function Si(e, n, t) {
    var o;
    return e === "translate.googleusercontent.com" ? (t === "" && (t = n), n = (o = Gu(n, "u")) !== null && o !== void 0 ? o : "", e = no(n)) : (e === "cc.bingj.com" || e === "webcache.googleusercontent.com") && (n = document.links[0].href, e = no(n)), [e, n, t]
}
var Us = 0,
    yt = 1,
    Yu = 2,
    vn = 3,
    vo = 4,
    Hs = 5,
    st = 6,
    Bt = 7,
    bt = 8,
    wt = 9,
    Fe = 10;

function qu() {
    var e = ["1", "", 0, 0, 0, void 0, "", "", "", void 0, 0];
    return e
}

function Wu(e, n, t, o) {
    var i = new Date,
        s = Math.round(i.getTime() / 1e3),
        l;
    e ? (l = e.split("."), l.unshift("0")) : l = ["1", n, s, o, s, "", t], (!l[st] || l[st] === "undefined") && (l[st] = nt.v4()), (!l[Bt] || l[Bt] === "undefined") && (l[Bt] = ""), (!l[bt] || l[bt] === "undefined") && (l[bt] = ""), (!l[wt] || l[wt] === "undefined") && (l[wt] = ""), (!l[Fe] || l[Fe] === "undefined") && (l[Fe] = 0);
    var c = function(p, r) {
            var a = parseInt(p);
            return isNaN(a) ? r : a
        },
        u = function(p) {
            return p ? c(p, void 0) : void 0
        },
        f = [l[Us], l[yt], c(l[Yu], s), c(l[vn], o), c(l[vo], s), u(l[Hs]), l[st], l[Bt], l[bt], u(l[wt]), c(l[Fe], 0)];
    return f
}

function Ku(e, n) {
    var t;
    return e[yt] ? t = e[yt] : n ? (t = "", e[yt] = t) : (t = nt.v4(), e[yt] = t), t
}

function en(e, n) {
    n === void 0 && (n = {
        memorizedVisitCount: 1
    });
    var t = n.memorizedVisitCount;
    ro(e) ? (e[Bt] = e[st], e[Hs] = e[vo], e[vn]++) : e[vn] = t;
    var o = nt.v4();
    return e[st] = o, e[Fe] = 0, e[bt] = "", e[wt] = void 0, o
}

function Dr(e) {
    e[vo] = Math.round(new Date().getTime() / 1e3)
}

function Ju(e, n) {
    if (e[Fe] === 0) {
        var t = n.build();
        e[bt] = t.eid;
        var o = t.dtm || t.ttm;
        e[wt] = o ? parseInt(o) : void 0
    }
}

function Qu(e) {
    e[Fe] += 1
}

function Xu(e) {
    return e.shift(), e.join(".")
}

function Ti(e, n, t) {
    var o = e[wt],
        i = {
            userId: t ? "00000000-0000-0000-0000-000000000000" : e[yt],
            sessionId: e[st],
            eventIndex: e[Fe],
            sessionIndex: e[vn],
            previousSessionId: t ? null : e[Bt] || null,
            storageMechanism: n == "localStorage" ? "LOCAL_STORAGE" : "COOKIE_1",
            firstEventId: e[bt] || null,
            firstEventTimestamp: o ? new Date(o).toISOString() : null
        };
    return i
}

function Mr(e) {
    return e[st]
}

function ef(e) {
    return e[yt]
}

function Br(e) {
    return e[vn]
}

function ro(e) {
    return e[Us] === "0"
}

function tf(e) {
    return e[Fe]
}
var hn = "x";

function Lr() {
    return {
        viewport: Rr(nf()),
        documentSize: Rr(rf()),
        resolution: Rr(of()),
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

function nf() {
    var e, n;
    if ("innerWidth" in window) e = window.innerWidth, n = window.innerHeight;
    else {
        var t = document.documentElement || document.body;
        e = t.clientWidth, n = t.clientHeight
    }
    return e >= 0 && n >= 0 ? e + hn + n : null
}

function rf() {
    var e = document.documentElement,
        n = document.body,
        t = n ? Math.max(n.offsetHeight, n.scrollHeight) : 0,
        o = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth),
        i = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, t);
    return isNaN(o) || isNaN(i) ? "" : o + hn + i
}

function of() {
    return screen.width + hn + screen.height
}

function Rr(e) {
    return e && e.split(hn).map(function(n) {
        return Math.floor(Number(n))
    }).join(hn)
}

function sf(e, n, t, o, i, s) {
    s === void 0 && (s = {});
    var l = [],
        c = function(p, r, a, d, h, v) {
            var m, g, y, w, b, I, N, G, L, B, j, R, J, de, M, $, k, x, A, D, P, F, Y, K, Q, re, _e, O;
            v.eventMethod = (m = v.eventMethod) !== null && m !== void 0 ? m : "post";
            var Z = function(_) {
                    var T;
                    return (T = _.stateStorageStrategy) !== null && T !== void 0 ? T : "cookieAndLocalStorage"
                },
                U = function(_) {
                    var T, C;
                    return typeof _.anonymousTracking == "boolean" ? !1 : (C = ((T = _.anonymousTracking) === null || T === void 0 ? void 0 : T.withSessionTracking) === !0) !== null && C !== void 0 ? C : !1
                },
                V = function(_) {
                    var T, C;
                    return typeof _.anonymousTracking == "boolean" ? !1 : (C = ((T = _.anonymousTracking) === null || T === void 0 ? void 0 : T.withServerAnonymisation) === !0) !== null && C !== void 0 ? C : !1
                },
                H = function(_) {
                    return !!_.anonymousTracking
                },
                W = (y = (g = v == null ? void 0 : v.contexts) === null || g === void 0 ? void 0 : g.browser) !== null && y !== void 0 ? y : !1,
                ve = (b = (w = v == null ? void 0 : v.contexts) === null || w === void 0 ? void 0 : w.webPage) !== null && b !== void 0 ? b : !0;
            l.push(Ta()), ve && l.push(xa()), W && l.push(Sa()), l.push.apply(l, (I = v.plugins) !== null && I !== void 0 ? I : []);
            var oe = gu({
                    base64: v.encodeBase64,
                    corePlugins: l,
                    callback: ba
                }),
                xe = document.characterSet || document.charset,
                Ie = Si(window.location.hostname, window.location.href, Er()),
                Ke = xi(Ie[0]),
                Ee = Ie[1],
                ft = Ie[2],
                Je, Qe = (N = v.platform) !== null && N !== void 0 ? N : "web",
                Se = jo(d),
                ze = (G = v.postPath) !== null && G !== void 0 ? G : "/com.snowplowanalytics.snowplow/tp2",
                xn = (L = v.appId) !== null && L !== void 0 ? L : "",
                Sn, kt = document.title,
                qt, da = (B = v.resetActivityTrackingOnPageView) !== null && B !== void 0 ? B : !0,
                bo, wo, pa = (j = v.cookieName) !== null && j !== void 0 ? j : "_sp_",
                Wt = (R = v.cookieDomain) !== null && R !== void 0 ? R : void 0,
                ur = "/",
                Tn = (J = v.cookieSameSite) !== null && J !== void 0 ? J : "None",
                kn = (de = v.cookieSecure) !== null && de !== void 0 ? de : !0,
                Ao = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack,
                xo = typeof v.respectDoNotTrack < "u" ? v.respectDoNotTrack && (Ao === "yes" || Ao === "1") : !1,
                fr, So = (M = v.cookieLifetime) !== null && M !== void 0 ? M : 63072e3,
                To = ($ = v.sessionCookieTimeout) !== null && $ !== void 0 ? $ : 1800,
                $t = U(v),
                dr = V(v),
                Le = H(v),
                se = Z(v),
                $n, pr = new Date().getTime(),
                In, Pn, On, Cn, ko, En, De, Me = 1,
                dt, Xe = Zu(p, h, se == "localStorage" || se == "cookieAndLocalStorage", v.eventMethod, ze, (k = v.bufferSize) !== null && k !== void 0 ? k : 1, (x = v.maxPostBytes) !== null && x !== void 0 ? x : 4e4, (A = v.maxGetBytes) !== null && A !== void 0 ? A : 0, (D = v.useStm) !== null && D !== void 0 ? D : !0, (P = v.maxLocalStorageQueueSize) !== null && P !== void 0 ? P : 1e3, (F = v.connectionTimeout) !== null && F !== void 0 ? F : 5e3, dr, (Y = v.customHeaders) !== null && Y !== void 0 ? Y : {}, (K = v.withCredentials) !== null && K !== void 0 ? K : !0, (Q = v.retryStatusCodes) !== null && Q !== void 0 ? Q : [], ((re = v.dontRetryStatusCodes) !== null && re !== void 0 ? re : []).concat([400, 401, 403, 410, 422]), v.idService),
                $o = !1,
                Io = !1,
                be = {
                    enabled: !1,
                    installed: !1,
                    configurations: {}
                },
                va = (O = (_e = v.contexts) === null || _e === void 0 ? void 0 : _e.session) !== null && O !== void 0 ? O : !1,
                Dn, Mn = v.onSessionUpdateCallback,
                vr = !1;
            v.hasOwnProperty("discoverRootDomain") && v.discoverRootDomain && (Wt = Ru(Tn, kn));
            var Bn = Lr(),
                ha = Bn.browserLanguage,
                ga = Bn.resolution,
                ma = Bn.colorDepth,
                _a = Bn.cookiesEnabled;
            oe.setTrackerVersion(a), oe.setTrackerNamespace(r), oe.setAppId(xn), oe.setPlatform(Qe), oe.addPayloadPair("cookie", _a ? "1" : "0"), oe.addPayloadPair("cs", xe), oe.addPayloadPair("lang", ha), oe.addPayloadPair("res", ga), oe.addPayloadPair("cd", ma), Eo(), Vo(), v.crossDomainLinker && Oo(v.crossDomainLinker);

            function pt() {
                Ie = Si(window.location.hostname, window.location.href, Er()), Ie[1] !== Ee && (ft = Er(Ee)), Ke = xi(Ie[0]), Ee = Ie[1]
            }

            function Po(_) {
                var T = new Date().getTime(),
                    C = _.currentTarget;
                C != null && C.href && (C.href = Lu(C.href, "_sp", En + "." + T))
            }

            function Oo(_) {
                for (var T = 0; T < document.links.length; T++) {
                    var C = document.links[T];
                    !C.spDecorationEnabled && _(C) && (rt(C, "click", Po, !0), rt(C, "mousedown", Po, !0), C.spDecorationEnabled = !0)
                }
            }

            function vt(_) {
                var T;
                return bo && (T = new RegExp("#.*"), _ = _.replace(T, "")), wo && (T = new RegExp("[{}]", "g"), _ = _.replace(T, "")), _
            }

            function Co(_) {
                var T = new RegExp("^([a-z]+):"),
                    C = T.exec(_);
                return C ? C[1] : null
            }

            function ya(_, T) {
                var C = Co(T),
                    he;
                return C ? T : T.slice(0, 1) === "/" ? Co(_) + "://" + no(_) + T : (_ = vt(_), (he = _.indexOf("?")) >= 0 && (_ = _.slice(0, he)), (he = _.lastIndexOf("/")) !== _.length - 1 && (_ = _.slice(0, he + 1)), _ + T)
            }

            function ba(_) {
                xo || Dn || Xe.enqueueRequest(_.build(), Se)
            }

            function It(_) {
                return pa + _ + "." + ko
            }

            function hr(_) {
                var T = It(_);
                if (se == "localStorage") return Mu(T);
                if (se == "cookie" || se == "cookieAndLocalStorage") return _t(T)
            }

            function Eo() {
                pt(), ko = xu((Wt || Ke) + (ur || "/")).slice(0, 4)
            }

            function Kt() {
                var _ = new Date;
                $n = _.getTime()
            }

            function wa() {
                Aa(), Kt()
            }

            function Do() {
                var _ = document.documentElement;
                return _ ? [_.scrollLeft || window.pageXOffset, _.scrollTop || window.pageYOffset] : [0, 0]
            }

            function Mo() {
                var _ = Do(),
                    T = _[0];
                In = T, Pn = T;
                var C = _[1];
                On = C, Cn = C
            }

            function Aa() {
                var _ = Do(),
                    T = _[0];
                T < In ? In = T : T > Pn && (Pn = T);
                var C = _[1];
                C < On ? On = C : C > Cn && (Cn = C)
            }

            function Ln(_) {
                return Math.round(_)
            }

            function gr() {
                var _ = It("ses"),
                    T = "*";
                return Bo(_, T, To)
            }

            function mr(_) {
                var T = It("id"),
                    C = Xu(_);
                return Bo(T, C, So)
            }

            function Bo(_, T, C) {
                return Le && !$t ? !1 : se == "localStorage" ? Kn(_, T, C) : se == "cookie" || se == "cookieAndLocalStorage" ? (_t(_, T, C, ur, Wt, Tn, kn), document.cookie.indexOf("".concat(_, "=")) !== -1) : !1
            }

            function Lo(_) {
                var T = It("id"),
                    C = It("ses");
                yi(T), yi(C), ir(T, Wt, Tn, kn), ir(C, Wt, Tn, kn), _ != null && _.preserveSession || (De = nt.v4(), Me = 1), _ != null && _.preserveUser || (En = Le ? "" : nt.v4(), dt = null)
            }

            function Ro(_) {
                _ && _.stateStorageStrategy && (v.stateStorageStrategy = _.stateStorageStrategy, se = Z(v)), Le = H(v), $t = U(v), dr = V(v), Xe.setUseLocalStorage(se == "localStorage" || se == "cookieAndLocalStorage"), Xe.setAnonymousTracking(dr)
            }

            function Vo() {
                if (!(Le && !$t)) {
                    var _ = se != "none" && !!hr("ses"),
                        T = Jt();
                    En = Ku(T, Le), _ ? De = Mr(T) : De = en(T), Me = Br(T), se != "none" && (gr(), Dr(T), mr(T))
                }
            }

            function Jt() {
                if (se == "none") return qu();
                var _ = hr("id") || void 0;
                return Wu(_, En, De, Me)
            }

            function jo(_) {
                return _.indexOf("http") === 0 ? _ : (document.location.protocol === "https:" ? "https" : "http") + "://" + _
            }

            function zo() {
                (!$o || h.pageViewId == null) && (h.pageViewId = nt.v4())
            }

            function _r() {
                return h.pageViewId == null && (h.pageViewId = nt.v4()), h.pageViewId
            }

            function No() {
                if (se === "none" || Le || !ve) return null;
                var _ = "_sp_tab_id",
                    T = bi(_);
                return T || (Bu(_, nt.v4()), T = bi(_)), T || null
            }

            function xa() {
                return {
                    contexts: function() {
                        return [{
                            schema: Nu,
                            data: {
                                id: _r()
                            }
                        }]
                    }
                }
            }

            function Sa() {
                return {
                    contexts: function() {
                        return [{
                            schema: Uu,
                            data: Oe(Oe({}, Lr()), {
                                tabId: No()
                            })
                        }]
                    }
                }
            }

            function Ta() {
                var _ = function(C) {
                        return Le ? null : C
                    },
                    T = function(C) {
                        return $t ? C : _(C)
                    };
                return {
                    beforeTrack: function(C) {
                        var he = hr("ses"),
                            ue = Jt(),
                            et = tf(ue) === 0;
                        if (fr ? Dn = !!_t(fr) : Dn = !1, xo || Dn) {
                            Lo();
                            return
                        }
                        ro(ue) ? (!he && se != "none" ? De = en(ue) : De = Mr(ue), Me = Br(ue)) : new Date().getTime() - pr > To * 1e3 && (Me++, De = en(ue, {
                            memorizedVisitCount: Me
                        })), Dr(ue), Ju(ue, C), Qu(ue);
                        var Te = Lr(),
                            Pt = Te.viewport,
                            Qt = Te.documentSize;
                        C.add("vp", Pt), C.add("ds", Qt), C.add("vid", T(Me)), C.add("sid", T(De)), C.add("duid", _(ef(ue))), C.add("uid", _(dt)), pt(), C.add("refr", vt(Je || ft)), C.add("url", vt(Sn || Ee));
                        var Xt = Ti(ue, se, Le);
                        if (va && (!Le || $t) && ka(C, Xt), se != "none") {
                            mr(ue);
                            var br = gr();
                            (!he || et) && br && Mn && !vr && (Mn(Xt), vr = !1)
                        }
                        pr = new Date().getTime()
                    }
                }
            }

            function ka(_, T) {
                var C = {
                    schema: Hu,
                    data: T
                };
                _.addContextEntity(C)
            }

            function $a() {
                var _ = Jt();
                if (ro(_) ? (se != "none" ? De = en(_) : De = Mr(_), Me = Br(_)) : (Me++, De = en(_, {
                        memorizedVisitCount: Me
                    })), Dr(_), se != "none") {
                    var T = Ti(_, se, Le);
                    mr(_);
                    var C = gr();
                    C && Mn && (vr = !0, Mn(T))
                }
                pr = new Date().getTime()
            }

            function yr(_, T) {
                return (_ || []).concat(T ? T() : [])
            }

            function Ia(_) {
                var T = _.title,
                    C = _.context,
                    he = _.timestamp,
                    ue = _.contextCallback;
                pt(), Io && zo(), Io = !0, kt = document.title, qt = T;
                var et = Ai(qt || kt);
                oe.track(_u({
                    pageUrl: vt(Sn || Ee),
                    pageTitle: et,
                    referrer: vt(Je || ft)
                }), yr(C, ue), he);
                var Te = new Date,
                    Pt = !1;
                if (be.enabled && !be.installed) {
                    be.installed = !0, Pt = !0;
                    var Qt = {
                        update: function() {
                            if (typeof window < "u" && typeof window.addEventListener == "function") {
                                var Ot = !1,
                                    Rn = Object.defineProperty({}, "passive", {
                                        get: function() {
                                            Ot = !0
                                        },
                                        set: function() {}
                                    }),
                                    Zo = function() {};
                                window.addEventListener("testPassiveEventSupport", Zo, Rn), window.removeEventListener("testPassiveEventSupport", Zo, Rn), Qt.hasSupport = Ot
                            }
                        }
                    };
                    Qt.update();
                    var Xt = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
                    Object.prototype.hasOwnProperty.call(Qt, "hasSupport") ? rt(document, Xt, Kt, {
                        passive: !0
                    }) : rt(document, Xt, Kt), Mo();
                    var br = ["click", "mouseup", "mousedown", "mousemove", "keypress", "keydown", "keyup", "touchend", "touchstart"],
                        Ea = ["resize", "focus", "blur"],
                        wr = function(Da, Ot) {
                            return Ot === void 0 && (Ot = Kt),
                                function(Rn) {
                                    return rt(document, Rn, Ot)
                                }
                        };
                    br.forEach(wr(document)), Ea.forEach(wr(window)), wr(window, wa)("scroll")
                }
                if (be.enabled && (da || Pt)) {
                    $n = Te.getTime();
                    var Fo = void 0;
                    for (Fo in be.configurations) {
                        var Ar = be.configurations[Fo];
                        Ar && (window.clearInterval(Ar.activityInterval), Pa(Ar, C, ue))
                    }
                }
            }

            function Pa(_, T, C) {
                var he = function(Te, Pt) {
                        pt(), Te({
                            context: Pt,
                            pageViewId: _r(),
                            minXOffset: In,
                            minYOffset: On,
                            maxXOffset: Pn,
                            maxYOffset: Cn
                        }), Mo()
                    },
                    ue = function() {
                        var Te = new Date;
                        $n + _.configMinimumVisitLength > Te.getTime() && he(_.callback, yr(T, C)), _.activityInterval = window.setInterval(et, _.configHeartBeatTimer)
                    },
                    et = function() {
                        var Te = new Date;
                        $n + _.configHeartBeatTimer > Te.getTime() && he(_.callback, yr(T, C))
                    };
                _.configMinimumVisitLength === 0 ? _.activityInterval = window.setInterval(et, _.configHeartBeatTimer) : _.activityInterval = window.setTimeout(ue, _.configMinimumVisitLength)
            }

            function Uo(_) {
                var T = _.minimumVisitLength,
                    C = _.heartbeatDelay,
                    he = _.callback;
                if (wi(T) && wi(C)) return {
                    configMinimumVisitLength: T * 1e3,
                    configHeartBeatTimer: C * 1e3,
                    callback: he
                };
                Ve.error("Activity tracking minimumVisitLength & heartbeatDelay must be integers")
            }

            function Oa(_) {
                var T = _.context,
                    C = _.minXOffset,
                    he = _.minYOffset,
                    ue = _.maxXOffset,
                    et = _.maxYOffset,
                    Te = document.title;
                Te !== kt && (kt = Te, qt = void 0), oe.track(yu({
                    pageUrl: vt(Sn || Ee),
                    pageTitle: Ai(qt || kt),
                    referrer: vt(Je || ft),
                    minXOffset: Ln(C),
                    maxXOffset: Ln(ue),
                    minYOffset: Ln(he),
                    maxYOffset: Ln(et)
                }), T)
            }

            function Ho(_) {
                var T = be.configurations[_];
                (T == null ? void 0 : T.configMinimumVisitLength) === 0 ? window.clearTimeout(T == null ? void 0 : T.activityInterval) : window.clearInterval(T == null ? void 0 : T.activityInterval), be.configurations[_] = void 0
            }
            var Ca = {
                getDomainSessionIndex: function() {
                    return Me
                },
                getPageViewId: _r,
                getTabId: No,
                newSession: $a,
                getCookieName: function(_) {
                    return It(_)
                },
                getUserId: function() {
                    return dt
                },
                getDomainUserId: function() {
                    return Jt()[1]
                },
                getDomainUserInfo: function() {
                    return Jt()
                },
                setReferrerUrl: function(_) {
                    Je = _
                },
                setCustomUrl: function(_) {
                    pt(), Sn = ya(Ee, _)
                },
                setDocumentTitle: function(_) {
                    kt = document.title, qt = _
                },
                discardHashTag: function(_) {
                    bo = _
                },
                discardBrace: function(_) {
                    wo = _
                },
                setCookiePath: function(_) {
                    ur = _, Eo()
                },
                setVisitorCookieTimeout: function(_) {
                    So = _
                },
                crossDomainLinker: function(_) {
                    Oo(_)
                },
                enableActivityTracking: function(_) {
                    be.configurations.pagePing || (be.enabled = !0, be.configurations.pagePing = Uo(Oe(Oe({}, _), {
                        callback: Oa
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
                    Kt()
                },
                setOptOutCookie: function(_) {
                    fr = _
                },
                setUserId: function(_) {
                    dt = _
                },
                setUserIdFromLocation: function(_) {
                    pt(), dt = pn(_, Ee)
                },
                setUserIdFromReferrer: function(_) {
                    pt(), dt = pn(_, ft)
                },
                setUserIdFromCookie: function(_) {
                    dt = _t(_)
                },
                setCollectorUrl: function(_) {
                    Se = jo(_), Xe.setCollectorUrl(Se)
                },
                setBufferSize: function(_) {
                    Xe.setBufferSize(_)
                },
                flushBuffer: function(_) {
                    _ === void 0 && (_ = {}), Xe.executeQueue(), _.newBufferSize && Xe.setBufferSize(_.newBufferSize)
                },
                trackPageView: function(_) {
                    _ === void 0 && (_ = {}), Ia(_)
                },
                preservePageViewId: function() {
                    $o = !0
                },
                disableAnonymousTracking: function(_) {
                    v.anonymousTracking = !1, Ro(_), Vo(), Xe.executeQueue()
                },
                enableAnonymousTracking: function(_) {
                    var T;
                    v.anonymousTracking = (T = _ && (_ == null ? void 0 : _.options)) !== null && T !== void 0 ? T : !0, Ro(_), $t || zo()
                },
                clearUserData: Lo
            };
            return Oe(Oe({}, Ca), {
                id: p,
                namespace: r,
                core: oe,
                sharedState: h
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

function ho(e, n) {
    try {
        lf(e != null ? e : cf()).forEach(n)
    } catch (t) {
        Ve.error("Function failed", t)
    }
}

function af(e, n, t, o, i, s) {
    return sn.hasOwnProperty(e) ? null : (sn[e] = sf(e, n, t, o, i, s), sn[e])
}

function lf(e) {
    return uf(e, sn)
}

function cf() {
    return Object.keys(sn)
}

function uf(e, n) {
    for (var t = [], o = 0, i = e; o < i.length; o++) {
        var s = i[o];
        n.hasOwnProperty(s) ? t.push(n[s]) : Ve.warn(s + " not configured")
    }
    return t
}
var ff = function() {
    function e() {
        this.outQueues = [], this.bufferFlushers = [], this.hasLoaded = !1, this.registeredOnLoadHandlers = []
    }
    return e
}();

function df() {
    var e = new ff,
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
function pf(e, n) {
    ho(n, function(t) {
        t.enableActivityTracking(e)
    })
}

function vf(e, n) {
    ho(n, function(t) {
        t.trackPageView(e)
    })
}

function hf(e, n) {
    ho(n, function(t) {
        t.core.track(mu({
            event: e.event
        }), e.context, e.timestamp)
    })
}
var ki = typeof window < "u" ? df() : void 0;

function gf(e, n, t) {
    if (t === void 0 && (t = {}), ki) return af(e, e, "js-".concat(bu), n, ki, t)
}
const mf = "brawlstars-cctv-prod",
    _f = "https://collector.snowplow.supercell.com",
    yf = () => {
        gf("sp1", _f, {
            appId: mf,
            plugins: []
        })
    },
    bf = () => pf({
        minimumVisitLength: 5,
        heartbeatDelay: 20
    }),
    wf = (e, n, t, o = {}) => {
        hf({
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
        init: yf,
        setupActivityTracking: bf,
        trackPageView: vf,
        trackClickEvent: wf
    },
    Af = [{
        postDate: "2023-11-17",
        bgSrc: {
            png: "scenes/scene/bg.png"
        },
        transitionVideoSrc: {
            mp4: "scenes/scene/transition-video.mp4"
        }
    }],
    xf = Af,
    Sf = Gt(xf),
    go = () => {
        const e = Sf()[0];
        return ht(ye({}, e), {
            bgSrc: Tt(e.bgSrc.png),
            transitionVideoSrc: Tt(e.transitionVideoSrc.mp4)
        })
    },
    Tf = [{
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
    kf = Tf,
    $f = Gt(kf),
    Fs = () => $f().map(n => ht(ye({}, n), {
        src: Tt(n.src.jpg)
    })),
    If = "/assets/instructions-modal-overlay-b0399863.png",
    mo = "/assets/terminal-logo-7a935f92.png",
    Zs = "/assets/logbook-page-bg-left-d97e3458.jpg",
    Gs = "/assets/logbook-page-bg-right-98ad4729.jpg",
    Ys = "/assets/logbook-first-page-4594a73f.jpg",
    oo = "/assets/player-controls-bg-272e65c2.jpg",
    qs = e => e.reduce((n, t, o, i) => (o % 2 === 0 && n.push(e.slice(o, o + 2)), n), []),
    Ws = async e => new Promise(n => {
        const t = new Image;
        t.onload = () => n(t), t.src = e
    });
var Ut = (e => (e[e.initializing = 0] = "initializing", e[e["loading-assets"] = 1] = "loading-assets", e[e["video-transition"] = 2] = "video-transition", e[e.done = 3] = "done", e))(Ut || {});
const Pf = go(),
    Of = Fs(),
    Cf = () => {
        const e = [Zs, Gs],
            n = [...Of.map(i => i.src), null].reverse();
        n.length === 1 && e.push(Ys);
        const t = qs(n),
            o = t[t.length - 1];
        return o && e.push(...o.filter(i => !!i)), e
    },
    Ef = [Pf.bgSrc, If, mo, oo, ...Cf()],
    [Ks, _o] = q(0),
    [Df, Mf] = q(!1),
    [Bf, Lf] = q(!1),
    Rf = async () => {
        _o(1);
        const e = Ef.map(n => Ws(n));
        await Promise.allSettled(e), Mf(!0)
    }, Js = () => {
        window.location.href = "brawlstars-inbox://cctvloaded"
    };
pe(() => {
    Df() && Bf() && (Js(), _o(2))
});
pe(() => {
    Ks() === 3 && Js()
});
const Vf = () => {
        Lf(!0)
    },
    jf = () => {
        _o(3)
    },
    ot = {
        init: Rf,
        currentStatus: Ks,
        onVideoTransitionLoaded: Vf,
        onVideoTransitionEnd: jf
    },
    Qs = e => e[Math.floor(Math.random() * e.length)];

function Xs(e) {
    var n, t, o = "";
    if (typeof e == "string" || typeof e == "number") o += e;
    else if (typeof e == "object")
        if (Array.isArray(e))
            for (n = 0; n < e.length; n++) e[n] && (t = Xs(e[n])) && (o && (o += " "), o += t);
        else
            for (n in e) e[n] && (o && (o += " "), o += n);
    return o
}

function zf() {
    for (var e, n, t = 0, o = ""; t < arguments.length;)(e = arguments[t++]) && (n = Xs(e)) && (o && (o += " "), o += n);
    return o
}
const $i = e => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e,
    le = zf,
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
            let h = p,
                {
                    class: r,
                    className: a
                } = h,
                d = Wo(h, ["class", "className"]);
            return Object.entries(d).every(v => {
                let [m, g] = v;
                return Array.isArray(g) ? g.includes(ye(ye({}, s), c)[m]) : ye(ye({}, s), c)[m] === g
            }) ? [...f, r, a] : f
        }, []);
        return le(e, l, u, t == null ? void 0 : t.class, t == null ? void 0 : t.className)
    },
    Nf = "/assets/player-8b9a1305.mp3",
    Uf = "/assets/player-4aabf494.ogg",
    Hf = z('<svg viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="path-1" d="M8 36L25 24L8 12V36Z" fill="currentColor"></path><path id="path-2" d="M25 36L42 24L25 12V36Z" fill="currentColor"></path><path id="path-3" d="M42 36L59 24L42 12V36Z" fill="currentColor">'),
    Ff = (e = {}) => (() => {
        const n = Hf();
        return qe(n, e, !0, !0), n
    })(),
    Zf = z('<svg viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="path-1" d="M26 36L9 24L26 12V36Z" fill="currentColor"></path><path id="path-2" d="M43 36L26 24L43 12V36Z" fill="currentColor"></path><path id="path-3" d="M60 36L43 24L60 12V36Z" fill="currentColor">'),
    Gf = (e = {}) => (() => {
        const n = Zf();
        return qe(n, e, !0, !0), n
    })(),
    Yf = z('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 68"><path d="M60.66 16.06c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4Zm9.54-26.81c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36-4.06-.01-6.57-.12-7.52-.36Zm0 17.9c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36s-6.57-.12-7.52-.36Zm3.89-8.99c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .95-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.14-3.63-.4Zm13.43-17.91c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4ZM19.57 17.17c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM27.24 9.83c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.61c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33ZM26.11 50.21c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.22 3.22-.33 7.01-.33ZM33.78 57.55c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.21 3.22-.33 7.01-.33ZM1.43 31.5c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.43-.14-4.07-.45ZM.95 39.78c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.07 0-3.43-.15-4.07-.45ZM38.54 17.82c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 25.3c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 32.79c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 40.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45ZM38.54 47.75c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.44-.14-4.07-.45ZM8.47 23.97c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79.01-6.12-.1-7.01-.33ZM38.54 55.24c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Z" fill="currentColor">'),
    qf = (e = {}) => (() => {
        const n = Yf();
        return qe(n, e, !0, !0), n
    })(),
    Wf = z('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M12 38h8V10h-8v28Zm16-28v28h8V10h-8Z" fill="currentColor">'),
    Kf = (e = {}) => (() => {
        const n = Wf();
        return qe(n, e, !0, !0), n
    })(),
    Jf = z('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M16 10v28l22-14-22-14Z" fill="currentColor">'),
    Qf = (e = {}) => (() => {
        const n = Jf();
        return qe(n, e, !0, !0), n
    })(),
    Xf = z('<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M23.495 27.969c2.28 0 4.13-1.913 4.13-4.273 0-2.36-1.85-4.273-4.13-4.273-2.281 0-4.13 1.913-4.13 4.273 0 2.36 1.849 4.273 4.13 4.273Z" fill="currentColor"></path><path d="M31.073 15.863a2.047 2.047 0 0 0-.137-.13 11.945 11.945 0 0 0-.504-.476 1.942 1.942 0 0 0-2.8.233c-.71.863-.609 2.162.225 2.897a7.06 7.06 0 0 1 2.374 5.306c0 2.261-1.068 4.39-2.856 5.695-.013.009-.023.02-.037.03a1.412 1.412 0 0 0-.066.05c-.909.636-1.15 1.913-.535 2.853.384.59 1.01.904 1.648.904.381 0 .768-.115 1.11-.353 2.953-2.064 4.717-5.498 4.717-9.184-.003-2.952-1.118-5.734-3.139-7.825Z" fill="currentColor"></path><path d="M35.168 11.425a1.917 1.917 0 0 0-.156-.145 17.637 17.637 0 0 0-.829-.79 1.942 1.942 0 0 0-2.8.233c-.71.864-.61 2.163.225 2.897 2.805 2.47 4.413 6.069 4.413 9.873 0 4.199-1.981 8.154-5.297 10.585-.072.052-.143.11-.218.162-.908.636-1.147 1.913-.535 2.853.384.59 1.01.904 1.648.904.381 0 .768-.115 1.11-.353C37.282 34.462 40 29.169 40 23.49c0-4.555-1.717-8.842-4.832-12.065ZM19.733 29.47c-.024-.016-.045-.032-.066-.049-.013-.01-.024-.022-.037-.03-1.788-1.304-2.856-3.434-2.856-5.695 0-2.045.864-3.98 2.374-5.306a2.104 2.104 0 0 0 .225-2.898 1.94 1.94 0 0 0-2.8-.233 9.434 9.434 0 0 0-.503.477 2.158 2.158 0 0 0-.14.132c-2.024 2.086-3.14 4.868-3.14 7.828 0 3.686 1.765 7.118 4.718 9.184.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.905.617-.945.376-2.223-.533-2.858Z" fill="currentColor"></path><path d="M16.496 34.24c-.074-.053-.143-.11-.217-.162-3.316-2.429-5.298-6.383-5.298-10.585 0-3.804 1.608-7.403 4.413-9.872.837-.735.938-2.034.226-2.898a1.94 1.94 0 0 0-2.8-.232c-.29.252-.562.518-.83.789-.052.046-.105.093-.156.145C8.716 14.648 7 18.935 7 23.493c0 5.679 2.718 10.969 7.271 14.153.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.904.614-.943.376-2.22-.533-2.856Z" fill="currentColor">'),
    ed = (e = {}) => (() => {
        const n = Xf();
        return qe(n, e, !0, !0), n
    })(),
    td = z('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.96 67.25"><path d="M86.24 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.65-7.86c-.42-.23-.63-.84-.63-1.83s.21-1.6.63-1.83C83.01.12 84.11 0 85.9 0s2.89.12 3.31.35c.42.23.63.84.63 1.83s-.21 1.6-.63 1.83c-.42.23-1.52.35-3.31.35s-2.89-.12-3.31-.35Zm6.77 15.72c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.18 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.18 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.7 7.86c-.39-.23-.58-.84-.58-1.83s.19-1.6.58-1.83c.39-.23 1.4-.35 3.04-.35s2.65.12 3.04.35c.39.23.58.84.58 1.83s-.19 1.6-.58 1.83c-.39.23-1.4.35-3.04.35s-2.65-.12-3.04-.35ZM61.57 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm3.12 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.17 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.17 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-42-41.98c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm7.67-7.35c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.5c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm12.74 6.6c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm7.67 7.34c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33ZM1.43 31.39c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm-.48 8.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM38.54 17.7c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM8.47 23.86c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm30.07 31.26c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Z" fill="currentColor">'),
    nd = (e = {}) => (() => {
        const n = td();
        return qe(n, e, !0, !0), n
    })(),
    rd = {
        "fast-forward": Ff,
        "fast-rewind": Gf,
        mute: qf,
        pause: Kf,
        play: Qf,
        live: ed,
        unmute: nd
    },
    od = z("<span>"),
    mt = e => {
        const [n, t] = ao(e, ["name"]);
        return (() => {
            const o = od();
            return qe(o, t, !1, !0), E(o, S(as, {
                get component() {
                    return rd[n.name]
                }
            })), o
        })()
    },
    ea = {
        tl: "tl",
        bl: "bl",
        c: "c",
        tr: "tr",
        br: "br"
    },
    ta = e => {
        var n;
        return (n = Object.values(ea)[e]) != null ? n : "c"
    },
    id = [{
        liveVideos: [{
            videoId: "6341176809112",
            adId: "live.ygnwfcefWFwgfPwhGZBKL-VAUtoC44aYjhXKe_ek4az7tMbgZwjU1Xc_V10vaz-I34TZqIl5RFHqmOX3mDx4m-YyxePPZLuACtpufCyTPJk_2R-htBIf__ywqYS0QABIdbJ0ddk"
        }, {
            videoId: "6341176809112",
            adId: "live.ygnwfcefWFwgfPwhGZBKL-VAUtoC44aYjhXKe_ek4az7tMbgZwjU1Xc_V10vaz-I34TZqIl5RFHqmOX3mDx4m-YyxePPZLuACtpufCyTPJk_2R-htBIf__ywqYS0QABIdbJ0ddk"
        }, {
            videoId: "6341176809112",
            adId: "live.ygnwfcefWFwgfPwhGZBKL-VAUtoC44aYjhXKe_ek4az7tMbgZwjU1Xc_V10vaz-I34TZqIl5RFHqmOX3mDx4m-YyxePPZLuACtpufCyTPJk_2R-htBIf__ywqYS0QABIdbJ0ddk"
        }, {
            videoId: "6341176809112",
            adId: "live.ygnwfcefWFwgfPwhGZBKL-VAUtoC44aYjhXKe_ek4az7tMbgZwjU1Xc_V10vaz-I34TZqIl5RFHqmOX3mDx4m-YyxePPZLuACtpufCyTPJk_2R-htBIf__ywqYS0QABIdbJ0ddk"
        }, {
            videoId: "6341176809112",
            adId: "live.ygnwfcefWFwgfPwhGZBKL-VAUtoC44aYjhXKe_ek4az7tMbgZwjU1Xc_V10vaz-I34TZqIl5RFHqmOX3mDx4m-YyxePPZLuACtpufCyTPJk_2R-htBIf__ywqYS0QABIdbJ0ddk"
        }],
        postDate: "2023-11-02"
    }],
    sd = id,
    ad = Gt(sd),
    ld = () => ad()[0],
    cd = (e = !0) => {
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
    ud = () => {
        const [e, n] = q(Ii);
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
    fd = e => {
        const n = os(),
            t = ud(),
            o = cd(),
            [i, s] = q(null),
            [l, c] = q(0),
            [u, f] = q(e.initialFeed),
            [p, r] = q(null),
            [a, d] = q("initializing"),
            [h, v] = q(e.initialPosition),
            m = () => !!p(),
            g = () => h() === "c",
            y = () => {
                var x;
                return !!((x = p()) != null && x.liveTracker.isLive())
            },
            w = () => a() !== "error" && a() !== "initializing",
            b = () => {
                var x;
                return y() && !!((x = p()) != null && x.liveTracker.atLiveEdge())
            },
            I = () => {
                var x, A, D, P;
                return (P = (D = (x = p()) == null ? void 0 : x.liveTracker.liveCurrentTime()) != null ? D : (A = p()) == null ? void 0 : A.duration()) != null ? P : 0
            },
            N = () => a() === "seeking-bwd" || a() === "seeking-fwd" ? t.currentSpeed() : void 0,
            G = async x => {
                try {
                    const A = u(),
                        P = await (await Ml(() => import("./player-8d35aece.js"), [])).initPlayer({
                            refNode: x,
                            videoId: A.videoId,
                            adConfigId: A.videoId && A.adId,
                            playlistId: A.playlistId,
                            options: {
                                loop: !1
                            }
                        });
                    if (!P) throw new Error;
                    P.on("error", () => d("error")), P.on("timeupdate", () => c(P.currentTime())), P.one("canplay", () => d("ready")), P.one("playing", () => d("playing")), P.on("ended", () => d("ended")), r(P)
                } catch (A) {
                    console.error(A), d("error")
                }
            }, L = async x => {
                (x.videoId ? u().videoId === x.videoId : u().playlistId === x.playlistId) || (d("initializing"), s(null), f(x), await o.exec(A => {
                    var D, P, F;
                    (D = p()) == null || D.pause(), (F = (P = p()) == null ? void 0 : P.catalog) == null || F.get({
                        id: x.videoId || x.playlistId,
                        adConfigId: x.adId,
                        type: x.videoId ? "video" : "playlist"
                    }, (Y, K) => {
                        var Q, re, _e;
                        if (Y) d("error");
                        else {
                            const O = Array.isArray(K) ? K : [K];
                            if (!O.length) return A();
                            const Z = O.length > 1,
                                U = Object.values(ea).indexOf(h()),
                                V = Z ? O[U % O.length] : O[0];
                            (re = (Q = p()) == null ? void 0 : Q.catalog) == null || re.load(V), (_e = p()) == null || _e.one("canplay", () => {
                                var H;
                                (H = p()) == null || H.play(), d("playing"), A()
                            })
                        }
                    })
                }))
            }, B = async () => L(e.initialFeed), j = () => {
                var x;
                (x = p()) == null || x.dispose(), r(null)
            }, R = async () => {
                await o.exec(x => {
                    var A;
                    (A = p()) == null || A.play(), x()
                }), d("playing")
            }, J = async () => {
                await o.exec(x => {
                    var A;
                    (A = p()) == null || A.pause(), x()
                }), d("ready")
            }, de = async () => {
                !y() || b() || (d("syncing"), await o.exec(x => {
                    var A, D, P;
                    (A = p()) == null || A.liveTracker.seekToLiveEdge(), (D = p()) == null || D.play(), (P = p()) == null || P.one("timeupdate", x)
                }), d("playing"))
            }, M = async x => {
                var A, D;
                d(x === 1 ? "seeking-fwd" : "seeking-bwd"), await o.exec(P => {
                    var F;
                    (F = p()) == null || F.pause(), t.start().onTick(() => {
                        const Y = l() + 1 * x;
                        x === -1 && Y <= 0 || x === 1 && Y >= I() ? P() : c(Y)
                    })
                }), t.stop(), x === 1 ? y() ? d("ready") : ((A = p()) == null || A.currentTime(0), d("ended")) : ((D = p()) == null || D.currentTime(0), d("ready"))
            }, $ = async () => {
                var x, A;
                Math.abs(l() - ((A = (x = p()) == null ? void 0 : x.currentTime()) != null ? A : 0)) < 3 || (d("syncing"), await o.exec(D => {
                    var P, F, Y;
                    (P = p()) == null || P.pause(), (F = p()) == null || F.currentTime(l()), (Y = p()) == null || Y.trigger("timeupdate"), D()
                }), d("ready"))
            };
        return {
            uid: n,
            feed: u,
            isCenter: g,
            isEnabled: w,
            isLive: y,
            isAtEdge: b,
            position: h,
            setPosition: v,
            status: a,
            time: l,
            setTime: c,
            duration: I,
            seekerSpeed: N,
            switchFeed: L,
            resetFeed: B,
            Player: {
                mount: G,
                unmount: j,
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
                                await $();
                                break;
                            case "play":
                                await R();
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
    Ye = ld().liveVideos.map((e, n) => fd({
        initialFeed: e,
        initialPosition: ta(n)
    })),
    [dd, pd] = q(!1),
    [vd, hd] = q(null),
    Ht = () => Ye.filter(e => e.isEnabled()),
    gd = () => Ht().find(e => e.isCenter()),
    md = () => {
        const e = Ht().filter(n => n.isLive() && n.status() === "playing");
        return e.length > 0 ? e.every(n => n.isAtEdge()) : !1
    },
    _d = ke(() => Ye.length > 0 && Ye.every(e => e.status() !== "initializing")),
    yd = ke(() => Ht().length > 0 && Ht().every(e => e.status() === "ended")),
    bd = e => {
        const n = Ye.find(o => o.uid === e.uid),
            t = Ye.find(o => o.position() === "c");
        ar(() => {
            t.setPosition(n.position()), n.setPosition("c")
        })
    },
    wd = () => {
        ar(() => {
            Ye.forEach((e, n) => e.setPosition(ta(n)))
        })
    },
    Ad = async e => {
        var t;
        const n = (t = gd()) == null ? void 0 : t.time();
        if (n) return e.setTime(n), e.Player.dispatch("sync")
    }, xd = async e => {
        try {
            e === "play" && await Promise.all(Ht().map(Ad)), await Promise.all(Ht().map(n => n.Player.dispatch(e)))
        } catch (n) {
            console.warn(n)
        }
    }, Sd = async e => {
        try {
            hd(e), !!e.archivePlaylist ? await Promise.all(Ye.map(t => t.switchFeed(e.archivePlaylist))) : await Promise.all(Ye.map((t, o) => {
                const i = e.liveVideos[o % e.liveVideos.length];
                if (i) return t.switchFeed(i)
            }))
        } catch (n) {
            console.warn(n)
        }
    }, ge = {
        screens: Ye,
        Supervisor: {
            dispatch: xd,
            positionScreenAtCenter: bd,
            resetScreensPosition: wd,
            controlsVisible: dd,
            setControlsVisible: pd,
            switchFeed: Sd,
            allAtEdge: md,
            allLoaded: _d,
            allEnded: yd,
            currentFeed: vd
        }
    }, Td = z('<div role="button" class="absolute top-0 left-0 wh-full">'), kd = z('<div class="absolute bottom-0 left-0 right-0 h-[228px] px-[158px] flex space-x-68 items-center"><button></button><button></button><button></button><button></button><button>'), tn = ["w-[330px] h-[100px] flex-center bg-player-control-btn text-green rounded-sm", "shadow-player-controls-btn active:shadow-player-controls-btn-pressed", "[&>span]:w-72 [&>span]:drop-shadow-terminal"], $d = () => {
        const e = at([Uf, Nf], {
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
            const n = Td();
            return n.$$click = () => ge.Supervisor.setControlsVisible(!1), n
        })(), (() => {
            const n = kd(),
                t = n.firstChild,
                o = t.nextSibling,
                i = o.nextSibling,
                s = i.nextSibling,
                l = s.nextSibling;
            return "url(".concat(oo, ")") != null ? n.style.setProperty("background-image", "url(".concat(oo, ")")) : n.style.removeProperty("background-image"), t.$$click = () => {
                ne.trackClickEvent("player-controls", "rewind", "cctv-room"), ge.Supervisor.dispatch("rev"), e.play("rewind-click", {
                    interrupt: !0
                }), e.play("rewind-loop")
            }, E(t, S(mt, {
                name: "fast-rewind",
                class: "!w-112 ml-22 [&_#path-3]:hidden"
            })), o.$$click = () => {
                ne.trackClickEvent("player-controls", "play", "cctv-room"), ge.Supervisor.dispatch("play"), e.play("play", {
                    interrupt: !0
                })
            }, E(o, S(mt, {
                name: "play"
            })), i.$$click = () => {
                ne.trackClickEvent("player-controls", "forward", "cctv-room"), ge.Supervisor.dispatch("fwd"), e.play("forward-click", {
                    interrupt: !0
                }), e.play("forward-loop")
            }, E(i, S(mt, {
                name: "fast-forward",
                class: "!w-112 ml-22 [&_#path-3]:hidden"
            })), s.$$click = () => {
                ne.trackClickEvent("player-controls", "pause", "cctv-room"), ge.Supervisor.dispatch("pause"), e.play("pause", {
                    interrupt: !0
                })
            }, E(s, S(mt, {
                name: "pause"
            })), l.$$click = () => {
                ne.trackClickEvent("player-controls", "live", "cctv-room"), ge.Supervisor.dispatch("go-live"), e.play("live", {
                    interrupt: !0
                })
            }, E(l, S(mt, {
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
const Id = (e, n) => {
        const t = e * n / 100;
        return e - t
    },
    Oi = e => e.touches.length === 2,
    Ci = e => Math.hypot(e[0].pageX - e[1].pageX, e[0].pageY - e[1].pageY),
    Pd = e => {
        const [n, t] = Zt({
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
                    distance: Ci(f.touches),
                    x: (f.touches[0].pageX + f.touches[1].pageX) / 2,
                    y: (f.touches[0].pageY + f.touches[1].pageY) / 2
                }
            }))
        }, c = f => {
            !Oi(f) || !n.isEnabled || (f.preventDefault(), t(p => {
                const r = "scale" in f ? f.scale : Ci(f.touches) / n.start.distance,
                    a = (f.touches[0].pageX + f.touches[1].pageX) / 2 - p.start.x,
                    d = (f.touches[0].pageY + f.touches[1].pageY) / 2 - p.start.y;
                return {
                    scale: Math.min(Math.max(1, Id(r, 10)), 4),
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
    Od = "/assets/seek-video-dab3075d.mp4",
    Cd = z('<video playsinline muted loop class="absolute top-0 left-0 wh-full object-cover">'),
    Ed = z('<div class="absolute top-0 left-0 bg-black z-10 wh-full">'),
    Ei = z("<span>"),
    Dd = z('<div class="absolute top-72 left-72 flex items-center space-x-8 text-white">'),
    Md = {
        "seeking-fwd": "seeking-fwd",
        "seeking-bwd": "seeking-bwd",
        ready: "ready",
        playing: "playing",
        error: "error"
    },
    Bd = {
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
    Ld = e => {
        let n;
        const [t, o] = q(void 0);
        pe(() => {
            const u = e.screen.status();
            if (u === "syncing") return;
            const p = e.screen.isAtEdge() && u === "playing" ? "live" : Md[u];
            o(p);
            let r;
            (p === "playing" || p === "live") && (r = setTimeout(() => o(void 0), 1500)), Ae(() => clearTimeout(r))
        });
        const [i, s] = q();
        pe(() => {
            var d;
            if (!e.screen.isEnabled()) return;
            const u = e.screen.feed().playlistId ? (d = e.screen.feed().metadata) == null ? void 0 : d.date : void 0,
                f = u ? u.add(e.screen.duration(), "seconds") : ws(hs),
                p = e.screen.time(),
                r = e.screen.duration() - p,
                a = f.subtract(r, "seconds");
            s({
                date: a.format("DD.MM.[95]"),
                time: a.format("HH:mm:ss")
            })
        });
        const l = () => t() ? Bd[t()] : void 0,
            c = () => t() === "seeking-bwd" || t() === "seeking-fwd";
        return pe(() => {
            n && (c() ? n.play() : n.pause())
        }), pe(() => {
            const u = e.screen.seekerSpeed();
            !n || !u || (n.playbackRate = u === 4 ? 1 : u === 16 ? 1.5 : 2)
        }), [(() => {
            const u = Cd(),
                f = n;
            return typeof f == "function" ? Ce(f, u) : n = u, ce(u, "src", Od), X(() => (c() ? "visible" : "hidden") != null ? u.style.setProperty("visibility", c() ? "visible" : "hidden") : u.style.removeProperty("visibility")), u
        })(), S(ss, {
            get children() {
                return [S(Mt, {
                    get when() {
                        return t() === "error"
                    },
                    get children() {
                        return Ed()
                    }
                }), S(Mt, {
                    get when() {
                        return t() !== "error"
                    },
                    get children() {
                        return [S(je, {
                            get when() {
                                return l()
                            },
                            children: u => (() => {
                                const f = Dd();
                                return E(f, S(ie, {
                                    size: "screen-overlay-md",
                                    get children() {
                                        return u().text
                                    }
                                }), null), E(f, S(mt, {
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
                        }), S(je, {
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
                                            const u = Ei();
                                            return E(u, () => i().time), u
                                        })(), (() => {
                                            const u = Ei();
                                            return E(u, () => i().date), u
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
    Rd = z('<button class="absolute top-0 left-0 isolate"><div>'),
    Vd = {
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
    jd = e => {
        const [n, t] = q(void 0);
        let o;
        const i = () => Vd[e.screen.position()],
            {
                data: s,
                controls: l
            } = Pd({
                targetRef: n
            });
        return pe(() => {
            ot.currentStatus() === Ut.done && Ge.dataUsageWarningDialog.accepted() && o && !e.screen.Player.isMounted() && e.screen.Player.mount(o)
        }), Ae(() => {
            e.screen.Player.unmount()
        }), pe(() => {
            e.screen.position() === "c" && !["initializing", "error"].includes(e.screen.status()) ? l.enable() : l.disable()
        }), (() => {
            const c = Rd(),
                u = c.firstChild;
            c.$$click = () => {
                var p;
                (p = e.onClick) == null || p.call(e)
            }, Ce(t, c);
            const f = o;
            return typeof f == "function" ? Ce(f, u) : o = u, E(c, S(Ld, {
                get screen() {
                    return e.screen
                }
            }), null), X(p => {
                const r = "".concat(i().coordinates.y, "px"),
                    a = "".concat(i().coordinates.x, "px"),
                    d = "".concat(i().size.width, "px"),
                    h = "".concat(i().size.height, "px"),
                    v = i().transformOrigin,
                    m = s.isZooming ? "10" : void 0,
                    g = "translate3d(".concat(s.delta.x, "px, ").concat(s.delta.y, "px, 0) rotateZ(").concat(i().rotation || 0, "deg) scale(").concat((i().scaleFactor || 1) * s.scale, ")"),
                    y = i().hidden ? "hidden" : void 0,
                    w = le("Video", e.screen.status() === "initializing" && "invisible");
                return r !== p._v$ && ((p._v$ = r) != null ? c.style.setProperty("top", r) : c.style.removeProperty("top")), a !== p._v$2 && ((p._v$2 = a) != null ? c.style.setProperty("left", a) : c.style.removeProperty("left")), d !== p._v$3 && ((p._v$3 = d) != null ? c.style.setProperty("width", d) : c.style.removeProperty("width")), h !== p._v$4 && ((p._v$4 = h) != null ? c.style.setProperty("height", h) : c.style.removeProperty("height")), v !== p._v$5 && ((p._v$5 = v) != null ? c.style.setProperty("transform-origin", v) : c.style.removeProperty("transform-origin")), m !== p._v$6 && ((p._v$6 = m) != null ? c.style.setProperty("z-index", m) : c.style.removeProperty("z-index")), g !== p._v$7 && ((p._v$7 = g) != null ? c.style.setProperty("transform", g) : c.style.removeProperty("transform")), y !== p._v$8 && ((p._v$8 = y) != null ? c.style.setProperty("visibility", y) : c.style.removeProperty("visibility")), w !== p._v$9 && te(u, p._v$9 = w), p
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
const zd = z('<img class="absolute top-0 left-0 wh-full pointer-events-none">'),
    Nd = () => (() => {
        const e = zd();
        return X(() => ce(e, "src", go().bgSrc)), e
    })(),
    Ud = z('<button class="absolute origin-top-left">'),
    Hd = [{
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
    Fd = e => S(lo, {
        each: Hd,
        children: n => (() => {
            const t = Ud();
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
const Zd = "/assets/answering-machine-button-glow-58ea4526.svg",
    Gd = z('<img class="absolute origin-bottom-left">'),
    Yd = {
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
    qd = () => {
        const e = Yd["phone-button-light"];
        return S(je, {
            get when() {
                return Ge.answeringMachineTrack.hasNew()
            },
            get children() {
                const n = Gd();
                return ce(n, "src", Zd), X(t => {
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
    Wd = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAAAwECBAUGBwgBAQACAwEBAAAAAAAAAAAAAAABBQIDBgQH/9oADAMBAAIQAxAAAAD5/rSpJbW3JaMQCWKaYomz89Wtt6GDLTo2diYemAYZgAAAAAAC4tyr+gz8cfabLprHhdfou0k9NH4zyftvm9f23G02OD4+osEbAAAAABUv2UPabqyHu9vv7T5zisp6efx7JZU4fPddXHd4ryXv/mlf3Hm8W11lf2tojaAAAAkjvRvPWfJvYbDidhu9Rt7HhcPIjmnXh5kF6bLg1GJsMDTZ+Rc90XO0/wBSiGv3gAAAK0Gw6fjNvtrfZdtzO8tvme1gsw9nh32HZjzhs9Tna+M8nzX0Lznz33HarLwqr6OGO8AAAACuTi1nHqu+8y9X9vIrci/1c3AmTENmTZE8Ty255Gu7qsVaaLkEgAAAAAL7CJEYkRiSlgrQSAAAAAAAAAAAAAAAAB//xAA0EAACAQMDAgMFBwQDAAAAAAABAgMABBEFEiETMQYiURQwUmFxFRYgMkBBkSNQgZJTgsH/2gAIAQEAAT8AoAsQACSaSCZ/yoTTxvG211IPofxCGVlDKjEH0oQylgvTbJ7ZGKMMqjLIwHzGKNtOO8b/AMUbeb/jb+KEMpAIRiD6DNNDKgJaNgM4yR7tWKkEHBFLLIvZiOc0zMxyxJP4kllXAVyMdsUiux7mlhlk/MzGhbXJHdqaGaPsTTdZF2hiBTySkbWdiPTP6OKMtVjp7ysoC8kgCrPwzd7lDwMvzYcCodNsolCR2gnAbzuyhv8AXFXvh8yndaozof8ALL8mxWp6Lc2uOrEyZzjcMZxU8RUmiMH9AFJqK2ZiOKs9OZscV4ftvZ5OUG112nira2aMv1GY4baBuPepopRJGQ4P0AFS25dSpbzFTgjy4/wK1G2f2AozZMj5wecBavdOYE8VPasp7UyEe+Vc1b2xYjirDTixHlrTtFYhSV49ags4YVACgmiM71YYyc0qnHmjLH1oAqWZu+MAV7IkseJFP1rUNEOGKrkYrUNNKk+Wrm2Kk8U6Y94Bk1BFuIrR9JluGUKhPIrTtHt4FUuVZscgGvKOOK3D1FZHqKaMM3lagoUVkeoo4xV9ptrdAksqt+5rWNHlgLErkeo5H81cw7SaYY93H3qyUFlqxYxaXA1t5cnErDht319KsJo9qq4IbPcUyKwLZPaozucLUi7VCr3Y0jtFLg1O2Is1BtcNknimc7JsNkBeDUSLPcbHJxz2q7SP+rDE4lh6EjFTyFIH5q1BAGapBz7tO9WLgOua0W6tfZYBblBIFHWDttDH5Zr2Qlg6iNV+T5FLs2BQwPHrUdu6uGOKaIs+7OPSpbZmbIOaZGaEJxn61FbBVbfSqxjePKnIOOa9jaNyzhWGCdu7k1LFH0LhJJUWFvPncN64Hw1qLDe1Sd/direTBqxumUrzUFwx0qNs4/qH/tWmgSRs5Y8GjOwjOOfNtBpbp0l2uTwcEVOxERZTVqesWyx4rccyoGJAU8+lQXIjlJPwmrhmFq9yPM5GAfhrUrlyXyau5CWNMcn3kbYNWs2CK0do59IdOvErtKDh3C8LVoLe2hbqywuxIC7XzU9xApDm4QIgG3YwY5+lO8VyRJHdLnOD1CEoSKbVo2nh3dh5xUIgiSRpZozxxtcE1DLEiSIZ4sHODvFW6RwzdWSeAgAkYkHeo7mNiJYpYVRx50dwvNeIxDBdypFIrJ3Uqc8Gp3yT70VG+DWnyXDglAxVdu5gDhdxwMn9s1baFqLorEYyAaPh6/Nfd++BA/8AaGg6hX2Ff19hX2SAafQL8g4rVBc2MjRyZDCri5L5yads++BxWk6rJZNOE2jrII3YjLbM5IHpn96g8WaY6Rl0cOEVT5h+1febSfR/9h6Yp/FOluqqQ/Ax+YUPFGlAg7X+m4UfFOmZUjfwQe45xT+KNLd92HHrhhUnifSSDlJD9HrxNrMV/dPJGCAaMhNE/oBI47Ma6snxGurJ8RrqyfEa6snxmurJ8RrqSfEaJJ7n+9//xAAoEQABAwIDBwUAAAAAAAAAAAABAAIRAyEEEjEgIiMwQVKhEEBRYWL/2gAIAQIBAT8ARyRaZ9Rlm8oNaflZG/pEMA6zymsJVGg2ASjSa4RCr0YNkQRyKbC4qlhwBJUBQnU2uCr4ci40REbeF1N+iZMQUAYV7q8Igxoqmp26boKYZynpCLvtE3CJO6sQdwEFON9sFYYsM53KMP3eVwO/yuB3eVVcM5DTI9//AP/EAC4RAAICAQMBBgMJAAAAAAAAAAECAxEABAUSMRMgITBBUVSBkgYUJEBhcpHR4f/aAAgBAwEBPwDuHHmVOpwauMmgcVw3TytRqo4lNnN03qbtHSNgAB4epOQ7jNE4cS2W62Sc2jdTKlSEWDVjEkVwCD5Gu1iQRlmYADNy3t5mKxdPfO0ckliSThcfzkOtnhfkp+WbPvaS0jGm9jkTh1B7zdDn2jLBIzwLAPdenzzUlS4dCbPUe2Oy8xTeAGMUYxtYv1wlCxINixkTqZAVckUBWaG+zXv6zTh1PhmsiC9vGLDdqaAGRwgi2SlPrR8DiRVHIvjy5UKGRKoWYEHoK/XNjQfeWjZPHqP6yBOKDvsvIZv0esiMR0sPK75GrrOe9fDmv2Ze8/DH6MU7zY/DH6P9zbNO500TzRhZCo5DAKHkUDnFfYZxX2GcV9h+T//Z",
    Kd = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQgBAQACAwEBAAAAAAAAAAAAAAADBAECBQYH/9oADAMBAAIQAxAAAAD5/wDfKi9Qp2UHurxctsL9i/nKny7nHlNYo8uUlg91z498AAAFy3Oz2I1IW7FqO27WNyi87lQM7ib8PAsbZbNfm8GWaapHb5D6W7GVYl94NeksyNxmrTOh6Bp0zMS+ow8eatEOKPOTcJOW70UkNt5MeiVdSc2XlrqQ5b71EctdSGkYHRm0HLPepNZ+W+dTHLaeqDldHVoCXXTM61d9JLDinzU5Bzlu9l9l432bwt/YardPjOvWpqKvKKirykVqK8Ka7GQWynK55RSZOm7hqNuHjNq9Z+v8WHFflpyDnLd6neuZ18bXs7jjkz9jccHY3HB2Nyrss3Ij3uh5xvbjiDsdjccHY3HB2HWtDszaZleDneq2hxT5qbhJy3eibN6zWqBroABXJxLMcrh4xgMSgAAZOfgZ97ow4o85NQ/s08/RCrNuaQrGJpCiaQomkKJpCiaQomkKJpCiaQonsGPoxrSqUqHTwAAAAAAAAAAAAf/EACMQAAAFBAMBAQEBAAAAAAAAAAIDBAUVARIUFgAGExAwIED/2gAIAQEAAQIA4EJSU0n+aJqJhEDS1TYwyPyCIB4zOW+PwCmpxhmYBWFSYfylKU/ssrCwjSCE4RCZ9dM68WwrAqmBe2mJRtsIFEhbBF4WFhDL+M9TXaYVLSySkmEYnUJ3UqiU9OSlKCvbiULMqQIvaYmCHV5+tPDg0IxvDw8PDxqR4Jl64zH8PCifwxsYRKajx9aeAJbmDU9T1PU9T1PU9T1PU9T1PU9T1PUxdTdGIJbx9aeIg9aLqbf6iO9AGX+tTKDCaIVDanVH687eA6jx9aeIa9bGEmiYJHl4FlCJoTQiwwgQaleAyKEUp24R1Xj608KOaOxbft+37ft237ft+37dt+37dt+37eLt712Ghjx9aeHCCqzs7Ozs7Obj9Uc+udsIzs7Ozs7OqtGpTVePrTxR+BZk6J7VLPwS8ePrTxR/kS8ePrSYY3xsbGxsbGxsbGxsbGxsbGxsbGxpSB2M5bSl111111111111111111111aWx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx/wD/xAA5EAABAwIDAwgJAwUBAAAAAAABAAIDBBESUVQhkZMQEzFBYnGS0QUUIiRSYXOhsSMwMiAzgYLBQP/aAAgBAQADPwBOcQ1oJJ6AFUS/wjJUkL8EjcLsv6p3RiRsZLT0EKcvazmnBzr2BFr271M1uN0bg29rkWVSwkGF+66nAuYn7lOWtcInEOFwQLqZgJdE4AG1yNn7bmODmkgjoKmZ/F5G2+xPkOJ7i42tc8hte2xSAYi2w5Z4w0MlcAOixUpNzI69iOnPpVU8HG95Bte5yVVe/PP3qoYbtlPX91VMiwNkcGKoe2z5XFuRPISLono/YfIbNCnyU+SfEAXDpUTvR0bHRkMMEspN9mKNwAf/AKqSKd0MhrIoQ8MYwMBjw/N/zVK18rp2TxtMsgjYwB5DWHr7s1FE4Rz+sF77uZzTQ8YMyntnY0YsALmv2i4cwXcB3BUjZBidO6wBLWgOdZwu02H3VLHggbT1Doud5iRg2m2DEGC2+6LS0Q48WKO4fYbJjZm8r1aSLBidHJiDSbXuw4XCw+axQH0b6s8SRsBDr7DM0YngdRu1RT0RY+J7I4IopC7EPZDhief9lRPsWPnAL8HtgNIfbFY5AhUlLTQxilq3xzlwf7NnktthOHskr1V0sT4HnHO2M2cATG9pdgPzKxzuY0bSVPkp8lP8Kcw2cOXCZHDpDHn7KpbI4B7t6qvjdvU1SGh7iQCo3egsYijx8xIMeP55fFkpof0jTSz7LYnTgxHZ0gFSS1EcrQZogzmXczLhOJmwuN+pyeyazafEwlpa+GYAsAFsDr71JG+ZrPR7JsTnubIyUYRjFrG/wqajpXSNayJ5MQDo3nHsbttb7qdj3TtihcRPjEbZNrmlgaQ05A7U9kgkFCJw9kfsiUYmOZ8RPW6+1Gpmo5RDEebE7zGX7XkPsGH/AIqU1opGlzqmN98Rl/Se8bSAPn0KeeGsEMcMWIRljRJtdhBu0J4jhPqoBEpMnPzBxIDDYk5XU1RF/EzSQg3vLaRwkFrgn4UGS1TJhHMRM1wLpdrQW3s45Zp0FWZGHa1xsQqr43b1VfG7eql8li929e8v7+XZL9N/4RMru9OKfkpVLl9lLkpcvspVKVLkhFSx08tCyUMc4tJJafa7lNV1DpubawWADWjYABYBSXupVLa1vspApclJkU/JOCtKF7y/v5dkv03/AIWOd3ep6ppMUJfa17Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTOVRRtBmhczFe1+uywTL3l/fy/wB36b/wgag96DIZfmGqMC5cOr7pmYTLs7Rso2329BF0y4GLpTHlwbttZMBIv0Dao9ntdKjAviCaSLEbRdMcwOvYEH7INaXHoATSG32E9SjAJvexA3pgNiVHa+LrtyB0FP8AIPVqhe8v7+X+79N/4Vqj/KDoZe5qDSDiJsRb/CaCDidsFvtZBotjP8sS7WzFcC3zum4g66wX9om4A7gEHOeS7+QssNsLrHr2DagCfaNtn2N17Ydi6ARZEsDQSdp67WBQc1zT1iyBI2kAAAjOyGEjGegAHK20LE7FiN7f8srtaH2FidxRBccRN/sgIIO56vUL3l/fy/3fpv8AwsE571JRMcIy32rXuL9Cmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8KntsMfhU1e1gkLLMvbCLdKxzr3l/fy7Jfpv8Awi2Z3enN60/NPzKfmU/Mp+ZT8yufrYI33LXOsV6IHTBMe55XoymgY+OGQEyBvtPv0qH0V6VNNTYgwRMdtNzdyfmU/Mp+ZT8yn5lPzKfmnO61eYL3l/fy7Jfpv/C/Vd+w+N7XscQ4dBXpbX1HFf5r0o62Ksmdtv7T3O/KqKuTnJ5XPfa13G5/Z/VC95f38uyX6b/wv1Xf+T9UL3l/fyxtc8PcGgscLn5hUz3l3rEe8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqZjr+sR7z5Jj6h5Ybi/I74SnjoBU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aTz0gp3wlUGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bV//8QANREAAQIDAwkHAgcAAAAAAAAAAQACAwQRElORBRATFBUWIjRUBiAhMUFRYWJxMDI1UnJzsf/aAAgBAgEBPwBGzT1rnFPVcPyuD5XBT170tCEWM1hNAUWSAJGkiYICHbfoyS2z6pza0q1GEz9qa0CoDU6E3yA8UGggmlfRBrQRw0JT2tGjteDbXirMheRMFEgS+gdFhPcaOAIIzSPMsU5Ow5dzy9wAqtty163Fbclr1uK25LXrcVtyWvW4o5egEUMVmIW3Ja9bituS163Fbclr1uKg5Xl4rw1sRpJ+VCIdk+KfrbmkeZYu0tbMT2tKjPcrgRsUNCVRnuuH3RDfD7rgVGUHisnc7Bp7n/FKfpkT+bc0jzLFPyEOZL2vAIqt35a7C3flrsLd+WuwoXZiDFBLWMUTsvChgksYt35a7C3flrsLd+WuwoGRJeDEDxDAIUFtnJ8UfW3NI8yxP/O779wOcPIlFzj5k91nIxf7G5oEXQxWvpWiMzLkk6s3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lRZpjoJhMhBgJBP4/wD/xAA2EQABAwAGBwUGBwAAAAAAAAABAAIDBAURFCFSEBIVQVFUkRMgNHOxBiIxM2FxIzA1RFOBkv/aAAgBAwEBPwDSCD8DotWPfosLZ52RuNgKMdWgkdrJgcqrp0THQCJztQygAnDcoZuzLyyYNBaLXAjGz+8CfqmVnSbR+OCXN3loHqpZnvEUsk+sLHBotA97BUespbA98gLADbiMpPHiFJO5j4mmQstIfrHiSAXDH4FPnmlY93bFzIyLRrAYm0DEFVVKJaVNrvJFkes4fXeBatSrf5Zf8qWj0a7Omhe42OAII46Ku8XGhA6SRwA3lXCXIVcJMh6LZ8mQ9FcJMhTKnayQyNidrG3jvxKuEmQq4SZCrhJkKfQ5GAktKYLKum8xvodFXeLjVBs7Z33K97gveWKxWKFqxVruCpPyHr9hP5rfQ6Ku8XGm0h0UjiDvK2jLmK2jLmK2jLmKrL2qhq18bJ+0JeCRqqge1sFOlbHEZASHHEZVtGXMVtGTMVtGXMVJTpHtLS42Jhtq6fzG+h0Vd4uNSfMf9z3HwxSEF8bXfcWpkEDDrMiY08QO7H+nTeY30OijzGCZsgFtm5Gl0Ukk0RvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUqamRvgMMcAYC4E/n//Z",
    Jd = z('<div class="absolute origin-top-left bg-black"><img class="absolute top-0 left-0 wh-full object-cover"><img>'),
    Qd = "absolute top-0 left-0 wh-full object-cover",
    Xd = () => (() => {
        const e = Jd(),
            n = e.firstChild,
            t = n.nextSibling;
        return e.style.setProperty("width", "150px"), e.style.setProperty("height", "85px"), e.style.setProperty("transform", "translate(403px, 924px) rotateZ(-4deg)"), ce(n, "src", Wd), ce(t, "src", Kd), X(() => te(t, le(Qd, {
            hidden: !Ge.archive.hasNew()
        }))), e
    })(),
    ep = z('<div class="absolute top-0 left-0 wh-full isolate">'),
    tp = e => {
        const [n, t] = q(!1), i = at(() => on() ? [on().srcWebm, on().srcMp3] : []), l = at(() => [ii().srcWebm, ii().srcMp3], {
            loop: !0,
            autoplay: !0
        }), c = at([mc, _c]);
        (async () => {
            await Kr(6e4);
            const p = c.internalInstance();
            p && (p.on("end", async () => {
                await Kr(6e5), c.play()
            }), c.play())
        })();
        const f = p => {
            if (p === "answering-machine") {
                const r = i.internalInstance();
                if (!r) return;
                const a = r.playing(),
                    d = r.seek() === 0;
                ne.trackClickEvent("answering-machine", a ? "pause" : "play", "cctv-room"), a ? (l.setVolume(1), c.setVolume(1), i.pause()) : (l.setVolume(.3), c.setVolume(.3), i.play(), d && (Ge.answeringMachineTrack.setLastPlayed(), r.once("end", () => {
                    i.stop(), l.setVolume(1), c.setVolume(1)
                })))
            } else p === "log-book" && (ne.trackClickEvent("logbook", "open", "cctv-room"), e.roomSound.play("logbook-open")), p === "terminal" && (ne.trackClickEvent("terminal", "open", "cctv-room"), e.roomSound.play("terminal-open")), we.openApp(p)
        };
        return (() => {
            const p = ep();
            return E(p, S(lo, {
                get each() {
                    return ge.screens
                },
                children: r => S(jd, {
                    screen: r,
                    onClick: () => {
                        r.isEnabled() && r.position() === "c" ? (n() || (ge.Supervisor.dispatch("play"), t(!0)), ge.Supervisor.setControlsVisible(!0)) : ge.Supervisor.positionScreenAtCenter(r), e.roomSound.play(Qs(["screen-tap-1", "screen-tap-2", "screen-tap-3"]))
                    }
                })
            }), null), E(p, S(Xd, {}), null), E(p, S(Nd, {}), null), E(p, S(qd, {}), null), E(p, S(Fd, {
                onItemSelected: f
            }), null), E(p, S(je, {
                get when() {
                    return ge.Supervisor.controlsVisible()
                },
                get children() {
                    return S($d, {})
                }
            }), null), X(() => (ot.currentStatus() === Ut.done ? "visible" : "hidden") != null ? p.style.setProperty("visibility", ot.currentStatus() === Ut.done ? "visible" : "hidden") : p.style.removeProperty("visibility")), p
        })()
    },
    np = z('<div class="absolute top-0 left-0 wh-full z-modal">'),
    cr = e => S(je, {
        get when() {
            return e.isOpen
        },
        get children() {
            const n = np();
            return E(n, () => e.children), n
        }
    }),
    rp = "/assets/logbook-36af03c8.mp3",
    op = "/assets/logbook-dccdaf17.ogg",
    ip = z('<div><img><img><img class="absolute left-1/2 w-1/2 h-full"><img><img><div class="absolute top-0 left-0 wh-full flex"><button class="flex-1"></button><button class="flex-1"></button></div><button class="absolute top-20 left-20 w-100 h-100 flex-center">'),
    sp = () => [...Fs().map(e => e.src), null].reverse(),
    nn = () => qs(sp()).map((e, n) => ({
        index: n,
        left: (e == null ? void 0 : e[0]) || null,
        right: (e == null ? void 0 : e[1]) || null
    })),
    ap = e => {
        const n = [],
            [t, o] = q(!1);
        mn(async () => {
            const h = n.map(v => new Promise((m, g) => {
                if (!v.src) return m();
                v.onload = () => m(), v.onerror = () => g()
            }));
            try {
                await Promise.all(h), o(!0)
            } catch (v) {
                e.onClose()
            }
        });
        const [i, s] = q(nn().length - 1), [l, c] = q([]), u = () => {
            const h = i() - 1;
            return nn()[h] ? !l().includes(h) : !1
        };
        pe(() => {
            const h = i() - 1,
                v = nn()[h];
            if (!v || l().includes(h)) return;
            const m = [v == null ? void 0 : v.left, v == null ? void 0 : v.right].filter(g => !!g).map(g => {
                if (g) return Ws(g)
            });
            Promise.allSettled(m).then(() => {
                c([...l(), h])
            })
        });
        const f = () => {
                !u() && i() !== 0 && (ne.trackClickEvent("pages", "prev", "logbook"), s(h => h - 1), d.play("page-turn", {
                    interrupt: !0
                }))
            },
            p = () => {
                i() >= nn().length - 1 || (ne.trackClickEvent("pages", "next", "logbook"), d.play("page-turn", {
                    interrupt: !0
                }), s(h => h + 1))
            },
            r = () => nn()[i()],
            a = () => i() === 0,
            d = at([op, rp], {
                sprite: {
                    "page-turn": [0, 933.3333333333334]
                }
            });
        return (() => {
            const h = ip(),
                v = h.firstChild,
                m = v.nextSibling,
                g = m.nextSibling,
                y = g.nextSibling,
                w = y.nextSibling,
                b = w.nextSibling,
                I = b.firstChild,
                N = I.nextSibling,
                G = b.nextSibling;
            return Ce(L => n.push(L), v), ce(v, "src", Ys), Ce(L => n.push(L), m), ce(m, "src", Zs), Ce(L => n.push(L), g), ce(g, "src", Gs), Ce(L => n.push(L), y), Ce(L => n.push(L), w), I.$$click = () => f(), N.$$click = () => p(), G.$$click = () => {
                e.onClose()
            }, E(G, S(ie, {
                size: "terminal-lg",
                class: "text-purple leading-none tracking-[-10px]",
                children: "<-"
            })), X(L => {
                var k, x, A, D;
                const B = le("wh-full flex relative", !t() && "invisible"),
                    j = le("absolute w-[calc(50%+2px)] h-full", !a() && "invisible"),
                    R = le("absolute w-[calc(50%+2px)] h-full", a() && "invisible"),
                    J = ((k = r()) == null ? void 0 : k.left) || void 0,
                    de = le("absolute w-1/2 h-full mix-blend-multiply pointer-events-none pl-[99px] pr-52", !((x = r()) != null && x.left) && "invisible"),
                    M = ((A = r()) == null ? void 0 : A.right) || void 0,
                    $ = le("absolute w-1/2 left-1/2 h-full mix-blend-multiply pointer-events-none pl-52 pr-[99px]", !((D = r()) != null && D.right) && "invisible");
                return B !== L._v$ && te(h, L._v$ = B), j !== L._v$2 && te(v, L._v$2 = j), R !== L._v$3 && te(m, L._v$3 = R), J !== L._v$4 && ce(y, "src", L._v$4 = J), de !== L._v$5 && te(y, L._v$5 = de), M !== L._v$6 && ce(w, "src", L._v$6 = M), $ !== L._v$7 && te(w, L._v$7 = $), L
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
const lp = e => S(cr, {
        get isOpen() {
            return we.currentOpenApp.mainApp === "log-book"
        },
        get children() {
            return S(ap, {
                onClose: () => {
                    var n;
                    ne.trackClickEvent("modal", "close", "logbook"), we.closeApp(), (n = e.onClose) == null || n.call(e)
                }
            })
        }
    }),
    cp = "/assets/terminal-2aa26d8b.mp3",
    up = "/assets/terminal-ca9f8876.ogg",
    na = Na(),
    fp = e => {
        const n = at(e.src, e.options);
        return S(na.Provider, {
            value: n,
            get children() {
                return e.children
            }
        })
    };

function Yt() {
    const e = Ji(na);
    if (e === void 0) throw new Error("useAudio must be used within a AudioProvider");
    return e
}
const dp = "\n      @@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@@\n @@                          @@@@@\n@                         @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@ \n@                         @@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
    pp = "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n     @@      @@@@@@@@      @@  @@\n      @@  @@@@@@@@@@@@@@@@@@  @@\n       @@  @@@@@@@@@@@@@@@@  @@\n        @@  @@@@@@@@@@@@@@  @@\n         @@  @@@@@@@@@@@@  @@\n           @@  @@@@@@@@  @@\n             @@  @@@@  @@\n              @@  @@  @@\n             @@  @@@@  @@\n           @@     @@     @@\n         @@                @@\n        @@        @@        @@\n       @@       @@@@@@       @@\n      @@      @@@@@@@@@@      @@\n     @@     @@@@@@@@@@@@@@     @@\n    @@    @@@@@@@@@@@@@@@@@     @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@                          @@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
    vp = "\n _   ____                       _ _              _    _           _     _\n| | / ___|  ___  ___ _   _ _ __(_) |_ _   _     / \\  | | ___ _ __| |_  | |\n| | \\___ \\ / _ \\/ __| | | | '__| | __| | | |   / _ \\ | |/ _ \\ '__| __| | |\n|_|  ___) |  __/ (__| |_| | |  | | |_| |_| |  / ___ \\| |  __/ |  | |_  |_|\n(_) |____/ \\___|\\___|\\__,_|_|  |_|\\__|\\__, | /_/   \\_\\_|\\___|_|   \\__| (_)\n                                      |___/\n",
    hp = "\n    __\n   / /\n  / /\n / /\n/_/\n",
    gp = "\n _\n(_)\n _\n(_)\n",
    mp = {
        archive: dp,
        timecoder: pp,
        securityAlert: vp,
        forwardSlash: hp,
        colon: gp
    },
    _p = z("<span>"),
    At = e => (() => {
        const n = _p();
        return E(n, () => mp[e.name]), X(() => te(n, le("font-vt-220 font-medium leading-none whitespace-pre", e.class))), n
    })(),
    yp = z("<span>Security Archives"),
    bp = z("<span>Time Coder"),
    wp = z('<div class="wh-full flex justify-center space-x-368 items-end pb-144"><div class="flex flex-col items-center space-y-56" role="button"></div><div class="flex flex-col items-center space-y-56 text-shadow-terminal" role="button">'),
    Di = wn("relative inline-block w-[600px] text-center py-8", {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black [&>span]:text-shadow-none", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light text-shadow-terminal border"
            }
        }
    }),
    Ap = e => {
        const n = Yt(),
            [t, o] = q();
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
            const l = wp(),
                c = l.firstChild,
                u = c.nextSibling;
            return c.$$click = () => s("security-tape-archives"), E(c, S(At, {
                name: "archive",
                class: "text-purple text-[21px] text-shadow-terminal"
            }), null), E(c, S(ie, {
                size: "terminal-md",
                get class() {
                    return Di({
                        selected: t() === "security-tape-archives"
                    })
                },
                get children() {
                    return yp()
                }
            }), null), u.$$click = () => s("timecoder"), E(u, S(At, {
                name: "timecoder",
                class: "text-purple text-[18px] text-shadow-terminal"
            }), null), E(u, S(ie, {
                size: "terminal-md",
                get class() {
                    return Di({
                        selected: t() === "timecoder"
                    })
                },
                get children() {
                    return bp()
                }
            }), null), l
        })()
    };
$e(["click"]);
const xp = z('<div class="absolute top-0 left-0 wh-full flex flex-col items-center pt-72 bg-terminal"><img class="block w-[732px] mb-32 text-blue-light drop-shadow-terminal transform-gpu" width="873" height="621"><div class="flex space-x-32 text-blue-light"><div class="bg-blue-light shadow-terminal"></div><div class="w-24 h-full bg-blue-light shadow-terminal">'),
    Sp = () => {
        const [e, n] = q(!0), t = setTimeout(() => n(!1), 1e3);
        return Ae(() => clearInterval(t)), S(je, {
            get when() {
                return e()
            },
            get children() {
                const o = xp(),
                    i = o.firstChild,
                    s = i.nextSibling,
                    l = s.firstChild;
                return ce(i, "src", mo), E(o, S(ie, {
                    as: "p",
                    size: "terminal-sm",
                    class: "text-center whitespace-pre text-purple mb-56 text-shadow-terminal",
                    children: "**********************************************************\n\n(c) copyright Starr Park corporation, 1995. All rights reserved.\nStarr Park Security Services is a registered\ntrademark of Starr Park corporation. \n          \n**********************************************************"
                }), s), E(l, S(ie, {
                    as: "span",
                    size: "terminal-md",
                    class: "text-black px-16 py-8",
                    children: "Loading"
                })), o
            }
        })
    },
    Tp = 10,
    Mi = e => {
        const n = ws(e);
        return {
            date: n.format("DD.MM.[1995]"),
            time: n.format("HH:mm")
        }
    },
    kp = (e = {}) => {
        const [n, t] = q(Mi(e.timezone)), o = () => {
            const s = Mi(e.timezone);
            t(s)
        }, i = setInterval(() => o(), Tp * 1e3);
        return Ae(() => clearInterval(i)), n
    },
    Bi = z("<span>"),
    $p = z("<span>Starr Park Security System"),
    Ip = () => {
        const e = kp({
            timezone: hs
        });
        return S(ie, {
            as: "p",
            class: "flex justify-between items-center px-144 pt-64 text-blue-dark text-shadow-terminal",
            size: "terminal-sm",
            get children() {
                return [(() => {
                    const n = Bi();
                    return E(n, () => e().date), n
                })(), $p(), (() => {
                    const n = Bi();
                    return E(n, () => e().time), n
                })()]
            }
        })
    },
    Pp = z('<div><div class="flex w-full"><button><span>&lt;-</span></button><div class="flex items-center flex-1 h-full px-32 bg-blue-light text-blue-light shadow-terminal"></div></div><div class="flex-1 min-h-0 px-100">'),
    Op = "w-100 h-100 flex-center font-vt-220 font-medium leading-none text-shadow-terminal",
    Vr = e => {
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
            const o = Pp(),
                i = o.firstChild,
                s = i.firstChild,
                l = s.nextSibling,
                c = i.nextSibling;
            return s.$$click = () => t(), E(l, S(ie, {
                as: "span",
                size: "terminal-lg",
                class: "text-black",
                get children() {
                    return e.title
                }
            })), E(c, () => e.children), X(u => {
                const f = le("flex flex-col flex-1 pt-64 px-44"),
                    p = le(Op, "text-purple text-[80px] tracking-[-10px]");
                return f !== u._v$ && te(o, u._v$ = f), p !== u._v$2 && te(s, u._v$2 = p), u
            }, {
                _v$: void 0,
                _v$2: void 0
            }), o
        })()
    };
$e(["click"]);
const Cp = "/assets/terminal-typing-8b10cd31.mp3",
    Ep = "/assets/terminal-typing-20a23c49.ogg";
class ra extends Error {
    constructor(t, o) {
        super(o);
        Ko(this, "statusCode");
        this.statusCode = t, Object.setPrototypeOf(this, new.target.prototype)
    }
}
const Dp = "https://bmwryv10bd.execute-api.us-east-1.amazonaws.com",
    oa = {
        base: "".concat(Dp),
        getArchiveByCode: e => "".concat(oa.base, "/timecoder/").concat(e)
    },
    Mp = async ({
        params: e
    }) => {
        const n = oa.getArchiveByCode(e.code),
            t = await fetch(n, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        if (!t.ok) throw new ra(t.status, "Unable to fetch ".concat(n, ": ").concat(t.status, " ").concat(t.statusText));
        return await t.json()
    }, Bp = z('<div class="flex flex-col space-y-120 w-full pt-72 pb-32"><div class="flex justify-between"><div class="flex space-x-24 items-center"></div><div class="flex space-x-24 items-center"></div></div><div class="flex flex-col space-y-48 items-center"><button class="inline-flex px-120 py-8 text-blue-light border text-shadow-terminal">'), Lp = z('<input pattern="[0-9]*" inputmode="numeric">'), Rp = {
        day: "00",
        month: "00",
        year: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
    }, Fn = "text-blue-light text-[20px]", Vp = e => {
        const [n, t] = Zt(Rp), o = Yt(), i = {
            "typing-1": [0, 200],
            "typing-2": [2e3, 166.66666666666652],
            "typing-3": [4e3, 183.33333333333357],
            "typing-4": [6e3, 183.33333333333357],
            "typing-5": [8e3, 199.9999999999993],
            "typing-6": [1e4, 233.33333333333252],
            "typing-7": [12e3, 250]
        }, s = at([Ep, Cp], {
            sprite: i
        }), [l, c] = q(void 0), [u, f] = q(!1), p = (v, m) => {
            t(v, m), s.play(Qs(Object.keys(i)))
        };
        let r;
        const a = async () => {
            o.play("click", {
                interrupt: !0
            }), f(!0), c(void 0);
            const v = Object.values(n).join("");
            let m;
            try {
                m = await Mp({
                    params: {
                        code: v
                    }
                })
            } catch (g) {
                return ne.trackClickEvent("timecoder", "submit", "terminal-timecoder", {
                    archiveCode: v,
                    result: "error"
                }), g instanceof ra && g.statusCode === 404 ? (o.play("timecoder-error", {
                    interrupt: !0
                }), c("Archive not found!")) : (o.play("timecoder-error", {
                    interrupt: !0
                }), console.error(g), c("Something went wrong. Try again later."))
            } finally {
                f(!1)
            }
            ne.trackClickEvent("timecoder", "submit", "terminal-timecoder", {
                archiveCode: v,
                result: "success"
            }), e.onLoadPlaylist(m)
        };
        Ae(() => {
            clearTimeout(r)
        });
        let d;
        const h = v => {
            if (!d) return;
            const m = [...d.querySelectorAll("input")],
                g = m.findIndex(w => w === v),
                y = m[g + 1];
            y ? y.focus() : v.blur()
        };
        return (() => {
            const v = Bp(),
                m = v.firstChild,
                g = m.firstChild,
                y = g.nextSibling,
                w = m.nextSibling,
                b = w.firstChild,
                I = d;
            return typeof I == "function" ? Ce(I, m) : d = m, E(g, S(Et, {
                name: "day",
                get value() {
                    return n.day
                },
                onChange: p,
                onNextInputFocus: h,
                get disabled() {
                    return u()
                }
            }), null), E(g, S(At, {
                name: "forwardSlash",
                class: Fn
            }), null), E(g, S(Et, {
                name: "month",
                get value() {
                    return n.month
                },
                onChange: p,
                onNextInputFocus: h,
                get disabled() {
                    return u()
                }
            }), null), E(g, S(At, {
                name: "forwardSlash",
                class: Fn
            }), null), E(g, S(Et, {
                name: "year",
                get value() {
                    return n.year
                },
                onChange: p,
                onNextInputFocus: h,
                get disabled() {
                    return u()
                }
            }), null), E(y, S(Et, {
                name: "hours",
                get value() {
                    return n.hours
                },
                onChange: p,
                onNextInputFocus: h,
                get disabled() {
                    return u()
                }
            }), null), E(y, S(At, {
                name: "colon",
                class: Fn
            }), null), E(y, S(Et, {
                name: "minutes",
                get value() {
                    return n.minutes
                },
                onChange: p,
                get disabled() {
                    return u()
                },
                onNextInputFocus: h
            }), null), E(y, S(At, {
                name: "colon",
                class: Fn
            }), null), E(y, S(Et, {
                name: "seconds",
                get value() {
                    return n.seconds
                },
                onChange: p,
                get disabled() {
                    return u()
                },
                onNextInputFocus: h
            }), null), b.$$click = () => a(), E(b, S(ie, {
                size: "terminal-md",
                children: "ENTER"
            })), E(w, S(je, {
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
            }), null), E(w, S(je, {
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
            }), null), X(() => b.disabled = u()), v
        })()
    }, Et = e => {
        const n = Yt(),
            [t, o] = q(0),
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
            const u = Lp();
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
const jp = z('<div class="wh-full flex flex-col w-full pb-48"><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible"></button><div class="flex-1 flex flex-col"></div><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible">'),
    Li = z("<span>"),
    zp = z('<button class="py-16 px-32 text-green text-shadow-terminal">'),
    Zn = 7,
    Np = e => {
        const n = Yt(),
            [t, o] = q(0),
            i = () => Math.ceil(fn().length / Zn),
            s = () => fn().slice(t() * Zn, t() * Zn + Zn);
        return (() => {
            const l = jp(),
                c = l.firstChild,
                u = c.nextSibling,
                f = u.nextSibling;
            return c.$$click = () => {
                ne.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"), n.play("click", {
                    interrupt: !0
                }), o(p => p - 1)
            }, E(c, S(ie, {
                size: "terminal-md",
                class: "-rotate-90",
                children: ">"
            })), E(u, S(lo, {
                get each() {
                    return s()
                },
                children: p => {
                    const r = bs(p.postDate, p.dropTime.hours, p.dropTime.minutes),
                        a = Hl(r, "DD.MM.[1995] HH:mm"),
                        d = a.split(" ")[0],
                        h = a.split(" ")[1];
                    return (() => {
                        const v = zp();
                        return v.$$click = () => {
                            ne.trackClickEvent("tape-archives", "open-playlist", "terminal-tape-archives", {
                                playlistId: p.playlistId
                            }), n.play("click", {
                                interrupt: !0
                            }), e.onLoadPlaylist(p)
                        }, E(v, S(ie, {
                            size: "terminal-md",
                            class: "flex space-x-272",
                            get children() {
                                return [(() => {
                                    const m = Li();
                                    return E(m, d), m
                                })(), " ", (() => {
                                    const m = Li();
                                    return E(m, h), m
                                })()]
                            }
                        })), v
                    })()
                }
            })), f.$$click = () => {
                ne.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"), n.play("click", {
                    interrupt: !0
                }), o(p => p + 1)
            }, E(f, S(ie, {
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
const Up = z('<span class="text-black">Access Security System'),
    Hp = z('<div class="wh-full flex flex-col items-center space-y-76 pt-76 "><img class="w-[872px] drop-shadow-terminal text-blue-light transform-gpu" width="873" height="621">'),
    Fp = e => {
        const n = setTimeout(() => e.setCurrentOpenApp("home"), 2e3);
        return Ae(() => clearInterval(n)), (() => {
            const t = Hp(),
                o = t.firstChild;
            return ce(o, "src", mo), E(t, S(ie, {
                size: "terminal-md",
                class: "px-16 py-8 bg-blue-light text-blue-light shadow-terminal",
                get children() {
                    return Up()
                }
            }), null), t
        })()
    },
    Zp = z('<span class="text-black">unwatched security footage'),
    Gp = z('<div class="flex-1 pt-144 pb-124 px-144"><div class="relative wh-full flex flex-col space-y-92 items-center justify-center border-x-2 border-b-2 border-purple"><div class="absolute top-0 left-0 wh-full flex items-start"><div class="flex-1 border-t-2 border-purple"></div><div class="flex-1 border-t-2 border-purple"></div></div><div class="flex space-x-184"><button><span>Dismiss</span></button><button><span>Open'),
    Ri = wn(["relative px-24 py-8", An({
        size: "terminal-md"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light text-shadow-terminal border"
            }
        }
    }),
    Yp = e => {
        const n = Yt(),
            [t, o] = q();
        let i;
        const s = l => {
            n.play("click", {
                interrupt: !0
            }), o(l), clearTimeout(i), i = setTimeout(() => {
                l === "open" ? e.onLoadPlaylist() : ne.trackClickEvent("notification", "dismiss", "terminal-notification-screen"), Ge.archive.dismissNotification()
            }, 1e3)
        };
        return Ae(() => {
            clearTimeout(i)
        }), (() => {
            const l = Gp(),
                c = l.firstChild,
                u = c.firstChild,
                f = u.firstChild,
                p = f.nextSibling,
                r = u.nextSibling,
                a = r.firstChild,
                d = a.nextSibling;
            return E(u, S(At, {
                name: "securityAlert",
                class: "px-64 -translate-y-1/2 text-blue-light text-[32px] text-shadow-terminal"
            }), p), E(c, S(ie, {
                as: "div",
                size: "terminal-xl",
                class: "px-56 py-32 bg-orange text-orange shadow-terminal",
                get children() {
                    return Zp()
                }
            }), r), a.$$click = () => s("dismiss"), d.$$click = () => s("open"), X(h => {
                const v = Ri({
                        selected: t() === "dismiss"
                    }),
                    m = Ri({
                        selected: t() === "open"
                    });
                return v !== h._v$ && te(a, h._v$ = v), m !== h._v$2 && te(d, h._v$2 = m), h
            }, {
                _v$: void 0,
                _v$2: void 0
            }), l
        })()
    };
$e(["click"]);
const qp = z('<div class="realtive wh-full flex flex-col bg-terminal">'),
    Wp = e => {
        const n = () => we.currentOpenApp.mainApp,
            t = () => we.currentOpenApp.mainApp === "terminal" ? we.currentOpenApp.terminalApp : void 0,
            o = (i, s) => {
                var l;
                ge.Supervisor.switchFeed({
                    archivePlaylist: {
                        playlistId: i.playlistId,
                        metadata: {
                            date: bs(i.postDate, i.dropTime.hours, i.dropTime.minutes, i.dropTime.seconds)
                        }
                    },
                    source: s
                }), Ge.archive.setLastPlayed(i.postDate), (l = e.onPlaylistLoad) == null || l.call(e), we.closeApp()
            };
        return S(cr, {
            get isOpen() {
                return n() === "terminal"
            },
            get children() {
                return S(fp, {
                    src: [up, cp],
                    options: {
                        sprite: {
                            click: [0, 220.6122448979592],
                            "timecoder-error": [2e3, 283.3333333333332]
                        }
                    },
                    get children() {
                        const i = qp();
                        return E(i, S(Ip, {}), null), E(i, S(ss, {
                            get fallback() {
                                return S(Fp, {
                                    setCurrentOpenApp: s => we.openApp(s)
                                })
                            },
                            get children() {
                                return [S(Mt, {
                                    get when() {
                                        return Ge.archive.hasNew()
                                    },
                                    get children() {
                                        return S(Yp, {
                                            onLoadPlaylist: () => {
                                                const s = fn()[0];
                                                s && (ne.trackClickEvent("notification", "open-playlist", "terminal-notification-screen", {
                                                    playlistId: s.playlistId
                                                }), o(s, "security-tape-archives"))
                                            }
                                        })
                                    }
                                }), S(Mt, {
                                    get when() {
                                        return t() === "home"
                                    },
                                    get children() {
                                        return S(Vr, {
                                            title: "Security System",
                                            onBack: () => we.closeApp(),
                                            get children() {
                                                return S(Ap, {
                                                    setCurrentOpenApp: s => we.openApp(s)
                                                })
                                            }
                                        })
                                    }
                                }), S(Mt, {
                                    get when() {
                                        return t() === "security-tape-archives"
                                    },
                                    get children() {
                                        return S(Vr, {
                                            title: "Security Tape Archives",
                                            onBack: () => we.openApp("home"),
                                            get children() {
                                                return S(Np, {
                                                    onLoadPlaylist: s => o(s, "security-tape-archives")
                                                })
                                            }
                                        })
                                    }
                                }), S(Mt, {
                                    get when() {
                                        return t() === "timecoder"
                                    },
                                    get children() {
                                        return S(Vr, {
                                            title: "Timecoder v2.1.0",
                                            onBack: () => we.openApp("home"),
                                            get children() {
                                                return S(Vp, {
                                                    onLoadPlaylist: s => o(s, "timecoder")
                                                })
                                            }
                                        })
                                    }
                                })]
                            }
                        }), null), E(i, S(Sp, {}), null), i
                    }
                })
            }
        })
    },
    Kp = "/assets/cctv-room-ee8509df.mp3",
    Jp = "/assets/cctv-room-1978b2ca.ogg";

function Qp(e) {
    const n = ye({}, e),
        t = ye({}, e),
        o = {},
        i = l => {
            let c = o[l];
            if (!c) {
                if (!er()) return n[l];
                o[l] = c = q(n[l], {
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
        if (yc(l)) {
            const u = fe(() => Object.entries(si(l, t)));
            ar(() => {
                for (const [f, p] of u) s(f, () => p)
            })
        } else s(l, c);
        return t
    }]
}
var ia = {
    width: null,
    height: null
};

function jr(e) {
    if (!e) return ye({}, ia);
    const {
        width: n,
        height: t
    } = e.getBoundingClientRect();
    return {
        width: n,
        height: t
    }
}

function Xp(e) {
    const n = typeof e == "function",
        [t, o] = Qp(n ? ia : jr(e)),
        i = new ResizeObserver(([s]) => o(jr(s.target)));
    return Ae(() => i.disconnect()), n ? pe(() => {
        const s = e();
        s && (o(jr(s)), i.observe(s), Ae(() => i.unobserve(s)))
    }) : (i.observe(e), Ae(() => i.unobserve(e))), t
}
const ev = e => {
        const [n, t] = q({
            x: 0,
            y: 0
        }), [o, i] = q(1), s = Xp(e.containerRef);
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
                h = (r - s.height) / 2,
                v = p * c.x / e.bgImageSize.width - d,
                m = r * c.y / e.bgImageSize.height - h;
            t({
                x: v,
                y: m
            }), i(a)
        }), {
            position: n,
            scaleFactor: o
        }
    },
    tv = z("<div><video muted playsinline>"),
    nv = 7.1,
    rv = 7.7,
    ov = e => {
        let n;
        const [t, o] = q(void 0);
        return mn(async () => {
            if (!n) return;
            if (!Rt.options.muted) try {
                n.muted = !1, await n.play()
            } catch (u) {
                n.muted = !0, Rt.setMute(!0)
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
            }), await Kr(600), await n.play(), o("done"), e.onLoaded();
            const l = () => {
                !n || n.currentTime < nv || (e.onEnded(), n.removeEventListener("timeupdate", l))
            };
            n.addEventListener("timeupdate", l);
            const c = () => {
                n && (n.currentTime = rv, n.play())
            };
            n.addEventListener("ended", c)
        }), pe(za(ge.Supervisor.allLoaded, i => {
            n && (i ? n.pause() : n.play())
        }, {
            defer: !0
        })), (() => {
            const i = tv(),
                s = i.firstChild;
            s.addEventListener("error", c => {
                console.error("Error during transition video playback, skipping transition...", c), o("error"), e.onEnded()
            });
            const l = n;
            return typeof l == "function" ? Ce(l, s) : n = s, X(c => {
                const u = le("wh-full", t() === "error" && "bg-black"),
                    f = fe(go).transitionVideoSrc,
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
var xt = [],
    iv = function() {
        return xt.some(function(e) {
            return e.activeTargets.length > 0
        })
    },
    sv = function() {
        return xt.some(function(e) {
            return e.skippedTargets.length > 0
        })
    },
    Vi = "ResizeObserver loop completed with undelivered notifications.",
    av = function() {
        var e;
        typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
            message: Vi
        }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = Vi), window.dispatchEvent(e)
    },
    gn;
(function(e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box"
})(gn || (gn = {}));
var St = function(e) {
        return Object.freeze(e)
    },
    lv = function() {
        function e(n, t) {
            this.inlineSize = n, this.blockSize = t, St(this)
        }
        return e
    }(),
    sa = function() {
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
    aa = function(e) {
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
    ji = function(e) {
        var n;
        if (e instanceof Element) return !0;
        var t = (n = e == null ? void 0 : e.ownerDocument) === null || n === void 0 ? void 0 : n.defaultView;
        return !!(t && e instanceof t.Element)
    },
    cv = function(e) {
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
    Gn = new WeakMap,
    zi = /auto|scroll/,
    uv = /^tb|vertical/,
    fv = /msie|trident/i.test(ln.navigator && ln.navigator.userAgent),
    Re = function(e) {
        return parseFloat(e || "0")
    },
    Vt = function(e, n, t) {
        return e === void 0 && (e = 0), n === void 0 && (n = 0), t === void 0 && (t = !1), new lv((t ? n : e) || 0, (t ? e : n) || 0)
    },
    Ni = St({
        devicePixelContentBoxSize: Vt(),
        borderBoxSize: Vt(),
        contentBoxSize: Vt(),
        contentRect: new sa(0, 0, 0, 0)
    }),
    la = function(e, n) {
        if (n === void 0 && (n = !1), Gn.has(e) && !n) return Gn.get(e);
        if (aa(e)) return Gn.set(e, Ni), Ni;
        var t = getComputedStyle(e),
            o = yo(e) && e.ownerSVGElement && e.getBBox(),
            i = !fv && t.boxSizing === "border-box",
            s = uv.test(t.writingMode || ""),
            l = !o && zi.test(t.overflowY || ""),
            c = !o && zi.test(t.overflowX || ""),
            u = o ? 0 : Re(t.paddingTop),
            f = o ? 0 : Re(t.paddingRight),
            p = o ? 0 : Re(t.paddingBottom),
            r = o ? 0 : Re(t.paddingLeft),
            a = o ? 0 : Re(t.borderTopWidth),
            d = o ? 0 : Re(t.borderRightWidth),
            h = o ? 0 : Re(t.borderBottomWidth),
            v = o ? 0 : Re(t.borderLeftWidth),
            m = r + f,
            g = u + p,
            y = v + d,
            w = a + h,
            b = c ? e.offsetHeight - w - e.clientHeight : 0,
            I = l ? e.offsetWidth - y - e.clientWidth : 0,
            N = i ? m + y : 0,
            G = i ? g + w : 0,
            L = o ? o.width : Re(t.width) - N - I,
            B = o ? o.height : Re(t.height) - G - b,
            j = L + m + I + y,
            R = B + g + b + w,
            J = St({
                devicePixelContentBoxSize: Vt(Math.round(L * devicePixelRatio), Math.round(B * devicePixelRatio), s),
                borderBoxSize: Vt(j, R, s),
                contentBoxSize: Vt(L, B, s),
                contentRect: new sa(r, u, L, B)
            });
        return Gn.set(e, J), J
    },
    ca = function(e, n, t) {
        var o = la(e, t),
            i = o.borderBoxSize,
            s = o.contentBoxSize,
            l = o.devicePixelContentBoxSize;
        switch (n) {
            case gn.DEVICE_PIXEL_CONTENT_BOX:
                return l;
            case gn.BORDER_BOX:
                return i;
            default:
                return s
        }
    },
    dv = function() {
        function e(n) {
            var t = la(n);
            this.target = n, this.contentRect = t.contentRect, this.borderBoxSize = St([t.borderBoxSize]), this.contentBoxSize = St([t.contentBoxSize]), this.devicePixelContentBoxSize = St([t.devicePixelContentBoxSize])
        }
        return e
    }(),
    ua = function(e) {
        if (aa(e)) return 1 / 0;
        for (var n = 0, t = e.parentNode; t;) n += 1, t = t.parentNode;
        return n
    },
    pv = function() {
        var e = 1 / 0,
            n = [];
        xt.forEach(function(l) {
            if (l.activeTargets.length !== 0) {
                var c = [];
                l.activeTargets.forEach(function(f) {
                    var p = new dv(f.target),
                        r = ua(f.target);
                    c.push(p), f.lastReportedSize = ca(f.target, f.observedBox), r < e && (e = r)
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
        xt.forEach(function(t) {
            t.activeTargets.splice(0, t.activeTargets.length), t.skippedTargets.splice(0, t.skippedTargets.length), t.observationTargets.forEach(function(i) {
                i.isActive() && (ua(i.target) > e ? t.activeTargets.push(i) : t.skippedTargets.push(i))
            })
        })
    },
    vv = function() {
        var e = 0;
        for (Ui(e); iv();) e = pv(), Ui(e);
        return sv() && av(), e > 0
    },
    zr, fa = [],
    hv = function() {
        return fa.splice(0).forEach(function(e) {
            return e()
        })
    },
    gv = function(e) {
        if (!zr) {
            var n = 0,
                t = document.createTextNode(""),
                o = {
                    characterData: !0
                };
            new MutationObserver(function() {
                return hv()
            }).observe(t, o), zr = function() {
                t.textContent = "".concat(n ? n-- : n++)
            }
        }
        fa.push(e), zr()
    },
    mv = function(e) {
        gv(function() {
            requestAnimationFrame(e)
        })
    },
    Jn = 0,
    _v = function() {
        return !!Jn
    },
    yv = 250,
    bv = {
        attributes: !0,
        characterData: !0,
        childList: !0,
        subtree: !0
    },
    Hi = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"],
    Fi = function(e) {
        return e === void 0 && (e = 0), Date.now() + e
    },
    Nr = !1,
    wv = function() {
        function e() {
            var n = this;
            this.stopped = !0, this.listener = function() {
                return n.schedule()
            }
        }
        return e.prototype.run = function(n) {
            var t = this;
            if (n === void 0 && (n = yv), !Nr) {
                Nr = !0;
                var o = Fi(n);
                mv(function() {
                    var i = !1;
                    try {
                        i = vv()
                    } finally {
                        if (Nr = !1, n = o - Fi(), !_v()) return;
                        i ? t.run(1e3) : n > 0 ? t.run(n) : t.start()
                    }
                })
            }
        }, e.prototype.schedule = function() {
            this.stop(), this.run()
        }, e.prototype.observe = function() {
            var n = this,
                t = function() {
                    return n.observer && n.observer.observe(document.body, bv)
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
    io = new wv,
    Zi = function(e) {
        !Jn && e > 0 && io.start(), Jn += e, !Jn && io.stop()
    },
    Av = function(e) {
        return !yo(e) && !cv(e) && getComputedStyle(e).display === "inline"
    },
    xv = function() {
        function e(n, t) {
            this.target = n, this.observedBox = t || gn.CONTENT_BOX, this.lastReportedSize = {
                inlineSize: 0,
                blockSize: 0
            }
        }
        return e.prototype.isActive = function() {
            var n = ca(this.target, this.observedBox, !0);
            return Av(this.target) && (this.lastReportedSize = n), this.lastReportedSize.inlineSize !== n.inlineSize || this.lastReportedSize.blockSize !== n.blockSize
        }, e
    }(),
    Sv = function() {
        function e(n, t) {
            this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = n, this.callback = t
        }
        return e
    }(),
    Yn = new WeakMap,
    Gi = function(e, n) {
        for (var t = 0; t < e.length; t += 1)
            if (e[t].target === n) return t;
        return -1
    },
    qn = function() {
        function e() {}
        return e.connect = function(n, t) {
            var o = new Sv(n, t);
            Yn.set(n, o)
        }, e.observe = function(n, t, o) {
            var i = Yn.get(n),
                s = i.observationTargets.length === 0;
            Gi(i.observationTargets, t) < 0 && (s && xt.push(i), i.observationTargets.push(new xv(t, o && o.box)), Zi(1), io.schedule())
        }, e.unobserve = function(n, t) {
            var o = Yn.get(n),
                i = Gi(o.observationTargets, t),
                s = o.observationTargets.length === 1;
            i >= 0 && (s && xt.splice(xt.indexOf(o), 1), o.observationTargets.splice(i, 1), Zi(-1))
        }, e.disconnect = function(n) {
            var t = this,
                o = Yn.get(n);
            o.observationTargets.slice().forEach(function(i) {
                return t.unobserve(n, i.target)
            }), o.activeTargets.splice(0, o.activeTargets.length)
        }, e
    }(),
    Tv = function() {
        function e(n) {
            if (arguments.length === 0) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
            if (typeof n != "function") throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
            qn.connect(this, n)
        }
        return e.prototype.observe = function(n, t) {
            if (arguments.length === 0) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!ji(n)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
            qn.observe(this, n, t)
        }, e.prototype.unobserve = function(n) {
            if (arguments.length === 0) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!ji(n)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
            qn.unobserve(this, n)
        }, e.prototype.disconnect = function() {
            qn.disconnect(this)
        }, e.toString = function() {
            return "function ResizeObserver () { [polyfill code] }"
        }, e
    }();
const kv = () => {
        "ResizeObserver" in window || (window.ResizeObserver = Tv)
    },
    $v = {
        setup: kv
    },
    Iv = z('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>No</span></button><button><span>Yes'),
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
    Pv = e => S(cr, {
        get isOpen() {
            return e.isOpen
        },
        get children() {
            return S(Ov, {
                onExit: () => {
                    window.location.href = "brawlstars-inbox://closeView"
                },
                get onClose() {
                    return e.onClose
                }
            })
        }
    }),
    Ov = e => {
        const [n, t] = q();
        let o;
        const i = s => {
            t(s), clearTimeout(o), o = setTimeout(() => {
                s === "confirm" ? e.onExit() : e.onClose()
            }, 1e3)
        };
        return (() => {
            const s = Iv(),
                l = s.firstChild,
                c = l.firstChild,
                u = c.nextSibling,
                f = u.firstChild,
                p = f.firstChild,
                r = p.firstChild,
                a = r.nextSibling;
            return E(c, S(ie, {
                size: "terminal-md",
                children: "STARR PARK SECURITY"
            })), E(f, S(ie, {
                size: "terminal-md",
                class: "text-purple",
                children: "Are you sure you want to exit?"
            }), p), r.$$click = () => i("cancel"), a.$$click = () => i("confirm"), X(d => {
                const h = Yi({
                        selected: n() === "cancel"
                    }),
                    v = Yi({
                        selected: n() === "confirm"
                    });
                return h !== d._v$ && te(r, d._v$ = h), v !== d._v$2 && te(a, d._v$2 = v), d
            }, {
                _v$: void 0,
                _v$2: void 0
            }), s
        })()
    };
$e(["click"]);
const Cv = z('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>Exit</span></button><button><span>Continue'),
    qi = wn(["relative px-96 py-2", An({
        size: "terminal-sm"
    })], {
        variants: {
            selected: {
                true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
                false: "text-blue-light border"
            }
        }
    }),
    Ev = () => S(cr, {
        get isOpen() {
            return !Ge.dataUsageWarningDialog.accepted()
        },
        get children() {
            return S(Dv, {
                onExit: () => {
                    window.location.href = "brawlstars-inbox://closeView"
                },
                onClose: () => {
                    Ge.dataUsageWarningDialog.setAccepted()
                }
            })
        }
    }),
    Dv = e => {
        const [n, t] = q();
        let o;
        const i = s => {
            t(s), clearTimeout(o), o = setTimeout(() => {
                s === "exit" ? e.onExit() : e.onClose()
            }, 1e3)
        };
        return (() => {
            const s = Cv(),
                l = s.firstChild,
                c = l.firstChild,
                u = c.nextSibling,
                f = u.firstChild,
                p = f.firstChild,
                r = p.firstChild,
                a = r.nextSibling;
            return E(c, S(ie, {
                size: "terminal-md",
                children: "STARR PARK SECURITY"
            })), E(f, S(ie, {
                size: "terminal-sm",
                class: "text-purple whitespace-pre-wrap",
                get children() {
                    return ["This website features live video content, which can consume a significant amount of data.", "\n", "If you're using a limited data plan or have concerns about data usage, we recommend switching to a Wi-Fi network."]
                }
            }), p), r.$$click = () => i("exit"), a.$$click = () => i("continue"), X(d => {
                const h = qi({
                        selected: n() === "exit"
                    }),
                    v = qi({
                        selected: n() === "continue"
                    });
                return h !== d._v$ && te(r, d._v$ = h), v !== d._v$2 && te(a, d._v$2 = v), d
            }, {
                _v$: void 0,
                _v$2: void 0
            }), s
        })()
    };
$e(["click"]);
const Mv = z('<button class="absolute top-20 left-20 w-100 h-100 flex-center">'),
    Bv = z('<button class="absolute top-20 right-20 w-100 h-100 flex-center text-purple">'),
    Lv = z('<div class="wh-full"><div class="portrait:hidden absolute origin-top-left overflow-hidden"></div><div class="landscape:hidden portrait:flex wh-full flex-center"><div class="font-medium whitespace-nowrap">Portrait mode is not supported.'),
    Rv = z('<div class="absolute bottom-0 left-0 w-256">');
$v.setup();
const Ur = {
        width: 2250,
        height: 1170
    },
    Vv = () => {
        const [e, n] = q(!1);
        let t;
        mn(() => {
            ot.init(), ne.init(), ne.setupActivityTracking(), ne.trackPageView()
        }), pe(() => {
            if (ge.Supervisor.allEnded()) {
                const c = ge.Supervisor.currentFeed(),
                    f = !!(c != null && c.archivePlaylist) && c.source;
                f && we.currentOpenApp.mainApp === null && we.openApp(f), ge.Supervisor.dispatch("go-live")
            }
        });
        const [o, i] = q(void 0), s = ev({
            containerRef: o,
            bgImageSize: Ur,
            fit: "contain"
        }), l = at([Jp, Kp], {
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
            const c = Lv(),
                u = c.firstChild;
            return Ce(i, c), E(u, S(ov, {
                onLoaded: () => ot.onVideoTransitionLoaded(),
                onEnded: () => ot.onVideoTransitionEnd()
            }), null), E(u, S(je, {
                get when() {
                    return ot.currentStatus() >= Ut["video-transition"]
                },
                get children() {
                    return S(tp, {
                        roomSound: l
                    })
                }
            }), null), E(u, S(je, {
                get when() {
                    return ot.currentStatus() === Ut.done
                },
                get children() {
                    return [(() => {
                        const f = Mv();
                        return f.$$click = () => n(!0), E(f, S(ie, {
                            size: "terminal-lg",
                            class: "text-green leading-none inline-block pb-16",
                            children: "х"
                        })), f
                    })(), (() => {
                        const f = Bv();
                        return f.$$click = () => {
                            ne.trackClickEvent("instructions-modal", Rt.options.muted ? "sound-on" : "sound-off", "cctv-room"), Rt.toggleMute()
                        }, E(f, S(mt, {
                            get name() {
                                return Rt.options.muted ? "mute" : "unmute"
                            },
                            class: "w-72"
                        })), f
                    })(), S(Wp, {
                        onPlaylistLoad: () => l.play("archive-tape-load")
                    }), S(lp, {
                        onClose: () => l.play("logbook-close")
                    }), S(Ev, {})]
                }
            }), null), E(u, S(Pv, {
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
            const c = Rv(),
                u = t;
            return typeof u == "function" ? Ce(u, c) : t = c, c
        })()]
    };
$e(["click"]);
ll(() => S(Vv, {}), document.getElementById("root"));
export {
    yn as a, He as c, zv as g
};