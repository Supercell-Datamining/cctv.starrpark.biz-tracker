var Oa = Object.defineProperty
  , Pa = Object.defineProperties;
var Ea = Object.getOwnPropertyDescriptors;
var Bn = Object.getOwnPropertySymbols;
var Ui = Object.prototype.hasOwnProperty
  , Fi = Object.prototype.propertyIsEnumerable;
var wr = (e,n,t)=>n in e ? Oa(e, n, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
}) : e[n] = t
  , me = (e,n)=>{
    for (var t in n || (n = {}))
        Ui.call(n, t) && wr(e, t, n[t]);
    if (Bn)
        for (var t of Bn(n))
            Fi.call(n, t) && wr(e, t, n[t]);
    return e
}
  , vt = (e,n)=>Pa(e, Ea(n));
var ji = (e,n)=>{
    var t = {};
    for (var r in e)
        Ui.call(e, r) && n.indexOf(r) < 0 && (t[r] = e[r]);
    if (e != null && Bn)
        for (var r of Bn(e))
            n.indexOf(r) < 0 && Fi.call(e, r) && (t[r] = e[r]);
    return t
}
;
var Gi = (e,n,t)=>(wr(e, typeof n != "symbol" ? n + "" : n, t),
t);
(function() {
    const n = document.createElement("link").relList;
    if (n && n.supports && n.supports("modulepreload"))
        return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
        r(o);
    new MutationObserver(o=>{
        for (const s of o)
            if (s.type === "childList")
                for (const l of s.addedNodes)
                    l.tagName === "LINK" && l.rel === "modulepreload" && r(l)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function t(o) {
        const s = {};
        return o.integrity && (s.integrity = o.integrity),
        o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
        o.crossOrigin === "use-credentials" ? s.credentials = "include" : o.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin",
        s
    }
    function r(o) {
        if (o.ep)
            return;
        o.ep = !0;
        const s = t(o);
        fetch(o.href, s)
    }
}
)();
const Ca = {
    context: void 0,
    registry: void 0
}
  , Da = (e,n)=>e === n
  , Me = Symbol("solid-proxy")
  , zr = Symbol("solid-track")
  , Ma = Symbol("solid-dev-component")
  , qn = {
    equals: Da
};
let Fo = qo;
const ct = 1
  , Kn = 2
  , jo = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null
};
var X = null;
let br = null
  , oe = null
  , he = null
  , Fe = null
  , rr = 0;
function Zn(e, n) {
    const t = oe
      , r = X
      , o = e.length === 0
      , s = n === void 0 ? r : n
      , l = o ? jo : {
        owned: null,
        cleanups: null,
        context: s ? s.context : null,
        owner: s
    }
      , u = o ? e : ()=>e(()=>ae(()=>or(l)));
    X = l,
    oe = null;
    try {
        return jt(u, !0)
    } finally {
        oe = t,
        X = r
    }
}
function W(e, n) {
    n = n ? Object.assign({}, qn, n) : qn;
    const t = {
        value: e,
        observers: null,
        observerSlots: null,
        comparator: n.equals || void 0
    }
      , r = o=>(typeof o == "function" && (o = o(t.value)),
    Wo(t, o));
    return [Yo.bind(t), r]
}
function ee(e, n, t) {
    const r = ni(e, n, !1, ct);
    hn(r)
}
function _e(e, n, t) {
    Fo = Va;
    const r = ni(e, n, !1, ct)
      , o = Zi && Go(Zi);
    o && (r.suspense = o),
    (!t || !t.render) && (r.user = !0),
    Fe ? Fe.push(r) : hn(r)
}
function Te(e, n, t) {
    t = t ? Object.assign({}, qn, t) : qn;
    const r = ni(e, n, !0, 0);
    return r.observers = null,
    r.observerSlots = null,
    r.comparator = t.equals || void 0,
    hn(r),
    Yo.bind(r)
}
function ir(e) {
    return jt(e, !1)
}
function ae(e) {
    if (oe === null)
        return e();
    const n = oe;
    oe = null;
    try {
        return e()
    } finally {
        oe = n
    }
}
function Ba(e, n, t) {
    const r = Array.isArray(e);
    let o, s = t && t.defer;
    return l=>{
        let u;
        if (r) {
            u = Array(e.length);
            for (let f = 0; f < e.length; f++)
                u[f] = e[f]()
        } else
            u = e();
        if (s) {
            s = !1;
            return
        }
        const c = ae(()=>n(u, o, l));
        return o = u,
        c
    }
}
function vn(e) {
    _e(()=>ae(e))
}
function be(e) {
    return X === null || (X.cleanups === null ? X.cleanups = [e] : X.cleanups.push(e)),
    e
}
function Qn() {
    return oe
}
function La(e, n) {
    const t = Symbol("context");
    return {
        id: t,
        Provider: Ha(t),
        defaultValue: e
    }
}
function Go(e) {
    return X && X.context && X.context[e.id] !== void 0 ? X.context[e.id] : e.defaultValue
}
function Zo(e) {
    const n = Te(e)
      , t = Te(()=>Hr(n()));
    return t.toArray = ()=>{
        const r = t();
        return Array.isArray(r) ? r : r != null ? [r] : []
    }
    ,
    t
}
let Zi;
function Yo() {
    if (this.sources && this.state)
        if (this.state === ct)
            hn(this);
        else {
            const e = he;
            he = null,
            jt(()=>Xn(this), !1),
            he = e
        }
    if (oe) {
        const e = this.observers ? this.observers.length : 0;
        oe.sources ? (oe.sources.push(this),
        oe.sourceSlots.push(e)) : (oe.sources = [this],
        oe.sourceSlots = [e]),
        this.observers ? (this.observers.push(oe),
        this.observerSlots.push(oe.sources.length - 1)) : (this.observers = [oe],
        this.observerSlots = [oe.sources.length - 1])
    }
    return this.value
}
function Wo(e, n, t) {
    let r = e.value;
    return (!e.comparator || !e.comparator(r, n)) && (e.value = n,
    e.observers && e.observers.length && jt(()=>{
        for (let o = 0; o < e.observers.length; o += 1) {
            const s = e.observers[o]
              , l = br && br.running;
            l && br.disposed.has(s),
            (l ? !s.tState : !s.state) && (s.pure ? he.push(s) : Fe.push(s),
            s.observers && Ko(s)),
            l || (s.state = ct)
        }
        if (he.length > 1e6)
            throw he = [],
            new Error
    }
    , !1)),
    n
}
function hn(e) {
    if (!e.fn)
        return;
    or(e);
    const n = X
      , t = oe
      , r = rr;
    oe = X = e,
    Ra(e, e.value, r),
    oe = t,
    X = n
}
function Ra(e, n, t) {
    let r;
    try {
        r = e.fn(n)
    } catch (o) {
        return e.pure && (e.state = ct,
        e.owned && e.owned.forEach(or),
        e.owned = null),
        e.updatedAt = t + 1,
        Qo(o)
    }
    (!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers"in e ? Wo(e, r) : e.value = r,
    e.updatedAt = t)
}
function ni(e, n, t, r=ct, o) {
    const s = {
        fn: e,
        state: r,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: n,
        owner: X,
        context: X ? X.context : null,
        pure: t
    };
    return X === null || X !== jo && (X.owned ? X.owned.push(s) : X.owned = [s]),
    s
}
function Jn(e) {
    if (e.state === 0)
        return;
    if (e.state === Kn)
        return Xn(e);
    if (e.suspense && ae(e.suspense.inFallback))
        return e.suspense.effects.push(e);
    const n = [e];
    for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < rr); )
        e.state && n.push(e);
    for (let t = n.length - 1; t >= 0; t--)
        if (e = n[t],
        e.state === ct)
            hn(e);
        else if (e.state === Kn) {
            const r = he;
            he = null,
            jt(()=>Xn(e, n[0]), !1),
            he = r
        }
}
function jt(e, n) {
    if (he)
        return e();
    let t = !1;
    n || (he = []),
    Fe ? t = !0 : Fe = [],
    rr++;
    try {
        const r = e();
        return Na(t),
        r
    } catch (r) {
        t || (Fe = null),
        he = null,
        Qo(r)
    }
}
function Na(e) {
    if (he && (qo(he),
    he = null),
    e)
        return;
    const n = Fe;
    Fe = null,
    n.length && jt(()=>Fo(n), !1)
}
function qo(e) {
    for (let n = 0; n < e.length; n++)
        Jn(e[n])
}
function Va(e) {
    let n, t = 0;
    for (n = 0; n < e.length; n++) {
        const r = e[n];
        r.user ? e[t++] = r : Jn(r)
    }
    for (n = 0; n < t; n++)
        Jn(e[n])
}
function Xn(e, n) {
    e.state = 0;
    for (let t = 0; t < e.sources.length; t += 1) {
        const r = e.sources[t];
        if (r.sources) {
            const o = r.state;
            o === ct ? r !== n && (!r.updatedAt || r.updatedAt < rr) && Jn(r) : o === Kn && Xn(r, n)
        }
    }
}
function Ko(e) {
    for (let n = 0; n < e.observers.length; n += 1) {
        const t = e.observers[n];
        t.state || (t.state = Kn,
        t.pure ? he.push(t) : Fe.push(t),
        t.observers && Ko(t))
    }
}
function or(e) {
    let n;
    if (e.sources)
        for (; e.sources.length; ) {
            const t = e.sources.pop()
              , r = e.sourceSlots.pop()
              , o = t.observers;
            if (o && o.length) {
                const s = o.pop()
                  , l = t.observerSlots.pop();
                r < o.length && (s.sourceSlots[l] = r,
                o[r] = s,
                t.observerSlots[r] = l)
            }
        }
    if (e.owned) {
        for (n = e.owned.length - 1; n >= 0; n--)
            or(e.owned[n]);
        e.owned = null
    }
    if (e.cleanups) {
        for (n = e.cleanups.length - 1; n >= 0; n--)
            e.cleanups[n]();
        e.cleanups = null
    }
    e.state = 0
}
function za(e) {
    return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error",{
        cause: e
    })
}
function Qo(e, n=X) {
    throw za(e)
}
function Hr(e) {
    if (typeof e == "function" && !e.length)
        return Hr(e());
    if (Array.isArray(e)) {
        const n = [];
        for (let t = 0; t < e.length; t++) {
            const r = Hr(e[t]);
            Array.isArray(r) ? n.push.apply(n, r) : n.push(r)
        }
        return n
    }
    return e
}
function Ha(e, n) {
    return function(r) {
        let o;
        return ee(()=>o = ae(()=>(X.context = vt(me({}, X.context), {
            [e]: r.value
        }),
        Zo(()=>r.children))), void 0),
        o
    }
}
const Ua = Symbol("fallback");
function Yi(e) {
    for (let n = 0; n < e.length; n++)
        e[n]()
}
function Fa(e, n, t={}) {
    let r = []
      , o = []
      , s = []
      , l = 0
      , u = n.length > 1 ? [] : null;
    return be(()=>Yi(s)),
    ()=>{
        let c = e() || [], f, p;
        return c[zr],
        ae(()=>{
            let a = c.length, d, h, v, g, m, y, A, w, $;
            if (a === 0)
                l !== 0 && (Yi(s),
                s = [],
                r = [],
                o = [],
                l = 0,
                u && (u = [])),
                t.fallback && (r = [Ua],
                o[0] = Zn(z=>(s[0] = z,
                t.fallback())),
                l = 1);
            else if (l === 0) {
                for (o = new Array(a),
                p = 0; p < a; p++)
                    r[p] = c[p],
                    o[p] = Zn(i);
                l = a
            } else {
                for (v = new Array(a),
                g = new Array(a),
                u && (m = new Array(a)),
                y = 0,
                A = Math.min(l, a); y < A && r[y] === c[y]; y++)
                    ;
                for (A = l - 1,
                w = a - 1; A >= y && w >= y && r[A] === c[w]; A--,
                w--)
                    v[w] = o[A],
                    g[w] = s[A],
                    u && (m[w] = u[A]);
                for (d = new Map,
                h = new Array(w + 1),
                p = w; p >= y; p--)
                    $ = c[p],
                    f = d.get($),
                    h[p] = f === void 0 ? -1 : f,
                    d.set($, p);
                for (f = y; f <= A; f++)
                    $ = r[f],
                    p = d.get($),
                    p !== void 0 && p !== -1 ? (v[p] = o[f],
                    g[p] = s[f],
                    u && (m[p] = u[f]),
                    p = h[p],
                    d.set($, p)) : s[f]();
                for (p = y; p < a; p++)
                    p in v ? (o[p] = v[p],
                    s[p] = g[p],
                    u && (u[p] = m[p],
                    u[p](p))) : o[p] = Zn(i);
                o = o.slice(0, l = a),
                r = c.slice(0)
            }
            return o
        }
        );
        function i(a) {
            if (s[p] = a,
            u) {
                const [d,h] = W(p);
                return u[p] = h,
                n(c[p], d)
            }
            return n(c[p])
        }
    }
}
function k(e, n) {
    return ae(()=>e(n || {}))
}
function Ln() {
    return !0
}
const Ur = {
    get(e, n, t) {
        return n === Me ? t : e.get(n)
    },
    has(e, n) {
        return n === Me ? !0 : e.has(n)
    },
    set: Ln,
    deleteProperty: Ln,
    getOwnPropertyDescriptor(e, n) {
        return {
            configurable: !0,
            enumerable: !0,
            get() {
                return e.get(n)
            },
            set: Ln,
            deleteProperty: Ln
        }
    },
    ownKeys(e) {
        return e.keys()
    }
};
function Ar(e) {
    return (e = typeof e == "function" ? e() : e) ? e : {}
}
function ja() {
    for (let e = 0, n = this.length; e < n; ++e) {
        const t = this[e]();
        if (t !== void 0)
            return t
    }
}
function Ga(...e) {
    let n = !1;
    for (let s = 0; s < e.length; s++) {
        const l = e[s];
        n = n || !!l && Me in l,
        e[s] = typeof l == "function" ? (n = !0,
        Te(l)) : l
    }
    if (n)
        return new Proxy({
            get(s) {
                for (let l = e.length - 1; l >= 0; l--) {
                    const u = Ar(e[l])[s];
                    if (u !== void 0)
                        return u
                }
            },
            has(s) {
                for (let l = e.length - 1; l >= 0; l--)
                    if (s in Ar(e[l]))
                        return !0;
                return !1
            },
            keys() {
                const s = [];
                for (let l = 0; l < e.length; l++)
                    s.push(...Object.keys(Ar(e[l])));
                return [...new Set(s)]
            }
        },Ur);
    const t = {}
      , r = {}
      , o = new Set;
    for (let s = e.length - 1; s >= 0; s--) {
        const l = e[s];
        if (!l)
            continue;
        const u = Object.getOwnPropertyNames(l);
        for (let c = 0, f = u.length; c < f; c++) {
            const p = u[c];
            if (p === "__proto__" || p === "constructor")
                continue;
            const i = Object.getOwnPropertyDescriptor(l, p);
            if (!o.has(p))
                i.get ? (o.add(p),
                Object.defineProperty(t, p, {
                    enumerable: !0,
                    configurable: !0,
                    get: ja.bind(r[p] = [i.get.bind(l)])
                })) : (i.value !== void 0 && o.add(p),
                t[p] = i.value);
            else {
                const a = r[p];
                a ? i.get ? a.push(i.get.bind(l)) : i.value !== void 0 && a.push(()=>i.value) : t[p] === void 0 && (t[p] = i.value)
            }
        }
    }
    return t
}
function ri(e, ...n) {
    if (Me in e) {
        const o = new Set(n.length > 1 ? n.flat() : n[0])
          , s = n.map(l=>new Proxy({
            get(u) {
                return l.includes(u) ? e[u] : void 0
            },
            has(u) {
                return l.includes(u) && u in e
            },
            keys() {
                return l.filter(u=>u in e)
            }
        },Ur));
        return s.push(new Proxy({
            get(l) {
                return o.has(l) ? void 0 : e[l]
            },
            has(l) {
                return o.has(l) ? !1 : l in e
            },
            keys() {
                return Object.keys(e).filter(l=>!o.has(l))
            }
        },Ur)),
        s
    }
    const t = {}
      , r = n.map(()=>({}));
    for (const o of Object.getOwnPropertyNames(e)) {
        const s = Object.getOwnPropertyDescriptor(e, o)
          , l = !s.get && !s.set && s.enumerable && s.writable && s.configurable;
        let u = !1
          , c = 0;
        for (const f of n)
            f.includes(o) && (u = !0,
            l ? r[c][o] = s.value : Object.defineProperty(r[c], o, s)),
            ++c;
        u || (l ? t[o] = s.value : Object.defineProperty(t, o, s))
    }
    return [...r, t]
}
let Za = 0;
function Jo() {
    const e = Ca.context;
    return e ? "".concat(e.id).concat(e.count++) : "cl-".concat(Za++)
}
const Xo = e=>"Stale read from <".concat(e, ">.");
function ii(e) {
    const n = "fallback"in e && {
        fallback: ()=>e.fallback
    };
    return Te(Fa(()=>e.each, e.children, n || void 0))
}
function je(e) {
    const n = e.keyed
      , t = Te(()=>e.when, void 0, {
        equals: (r,o)=>n ? r === o : !r == !o
    });
    return Te(()=>{
        const r = t();
        if (r) {
            const o = e.children;
            return typeof o == "function" && o.length > 0 ? ae(()=>o(n ? r : ()=>{
                if (!ae(t))
                    throw Xo("Show");
                return e.when
            }
            )) : o
        }
        return e.fallback
    }
    , void 0, void 0)
}
function es(e) {
    let n = !1;
    const t = (s,l)=>s[0] === l[0] && (n ? s[1] === l[1] : !s[1] == !l[1]) && s[2] === l[2]
      , r = Zo(()=>e.children)
      , o = Te(()=>{
        let s = r();
        Array.isArray(s) || (s = [s]);
        for (let l = 0; l < s.length; l++) {
            const u = s[l].when;
            if (u)
                return n = !!s[l].keyed,
                [l, u, s[l]]
        }
        return [-1]
    }
    , void 0, {
        equals: t
    });
    return Te(()=>{
        const [s,l,u] = o();
        if (s < 0)
            return e.fallback;
        const c = u.children;
        return typeof c == "function" && c.length > 0 ? ae(()=>c(n ? l : ()=>{
            if (ae(o)[0] !== s)
                throw Xo("Match");
            return u.when
        }
        )) : c
    }
    , void 0, void 0)
}
function Mt(e) {
    return e
}
const Ya = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"]
  , Wa = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Ya])
  , qa = new Set(["innerHTML", "textContent", "innerText", "children"])
  , Ka = Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for"
})
  , Qa = Object.assign(Object.create(null), {
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
function Ja(e, n) {
    const t = Qa[e];
    return typeof t == "object" ? t[n] ? t.$ : void 0 : t
}
const Xa = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"])
  , el = new Set(["altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use", "view", "vkern"])
  , tl = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace"
};
function nl(e, n, t) {
    let r = t.length
      , o = n.length
      , s = r
      , l = 0
      , u = 0
      , c = n[o - 1].nextSibling
      , f = null;
    for (; l < o || u < s; ) {
        if (n[l] === t[u]) {
            l++,
            u++;
            continue
        }
        for (; n[o - 1] === t[s - 1]; )
            o--,
            s--;
        if (o === l) {
            const p = s < r ? u ? t[u - 1].nextSibling : t[s - u] : c;
            for (; u < s; )
                e.insertBefore(t[u++], p)
        } else if (s === u)
            for (; l < o; )
                (!f || !f.has(n[l])) && n[l].remove(),
                l++;
        else if (n[l] === t[s - 1] && t[u] === n[o - 1]) {
            const p = n[--o].nextSibling;
            e.insertBefore(t[u++], n[l++].nextSibling),
            e.insertBefore(t[--s], p),
            n[o] = t[s]
        } else {
            if (!f) {
                f = new Map;
                let i = u;
                for (; i < s; )
                    f.set(t[i], i++)
            }
            const p = f.get(n[l]);
            if (p != null)
                if (u < p && p < s) {
                    let i = l, a = 1, d;
                    for (; ++i < o && i < s && !((d = f.get(n[i])) == null || d !== p + a); )
                        a++;
                    if (a > p - u) {
                        const h = n[l];
                        for (; u < p; )
                            e.insertBefore(t[u++], h)
                    } else
                        e.replaceChild(t[u++], n[l++])
                } else
                    l++;
            else
                n[l++].remove()
        }
    }
}
const Wi = "_$DX_DELEGATE";
function rl(e, n, t, r={}) {
    let o;
    return Zn(s=>{
        o = s,
        n === document ? e() : B(n, e(), n.firstChild ? null : void 0, t)
    }
    , r.owner),
    ()=>{
        o(),
        n.textContent = ""
    }
}
function H(e, n, t) {
    let r;
    const o = ()=>{
        const l = document.createElement("template");
        return l.innerHTML = e,
        t ? l.content.firstChild.firstChild : l.content.firstChild
    }
      , s = n ? ()=>ae(()=>document.importNode(r || (r = o()), !0)) : ()=>(r || (r = o())).cloneNode(!0);
    return s.cloneNode = s,
    s
}
function Oe(e, n=window.document) {
    const t = n[Wi] || (n[Wi] = new Set);
    for (let r = 0, o = e.length; r < o; r++) {
        const s = e[r];
        t.has(s) || (t.add(s),
        n.addEventListener(s, ul))
    }
}
function fe(e, n, t) {
    t == null ? e.removeAttribute(n) : e.setAttribute(n, t)
}
function il(e, n, t, r) {
    r == null ? e.removeAttributeNS(n, t) : e.setAttributeNS(n, t, r)
}
function se(e, n) {
    n == null ? e.removeAttribute("class") : e.className = n
}
function ol(e, n, t, r) {
    if (r)
        Array.isArray(t) ? (e["$$".concat(n)] = t[0],
        e["$$".concat(n, "Data")] = t[1]) : e["$$".concat(n)] = t;
    else if (Array.isArray(t)) {
        const o = t[0];
        e.addEventListener(n, t[0] = s=>o.call(e, t[1], s))
    } else
        e.addEventListener(n, t)
}
function sl(e, n, t={}) {
    const r = Object.keys(n || {})
      , o = Object.keys(t);
    let s, l;
    for (s = 0,
    l = o.length; s < l; s++) {
        const u = o[s];
        !u || u === "undefined" || n[u] || (qi(e, u, !1),
        delete t[u])
    }
    for (s = 0,
    l = r.length; s < l; s++) {
        const u = r[s]
          , c = !!n[u];
        !u || u === "undefined" || t[u] === c || !c || (qi(e, u, !0),
        t[u] = c)
    }
    return t
}
function al(e, n, t) {
    if (!n)
        return t ? fe(e, "style") : n;
    const r = e.style;
    if (typeof n == "string")
        return r.cssText = n;
    typeof t == "string" && (r.cssText = t = void 0),
    t || (t = {}),
    n || (n = {});
    let o, s;
    for (s in t)
        n[s] == null && r.removeProperty(s),
        delete t[s];
    for (s in n)
        o = n[s],
        o !== t[s] && (r.setProperty(s, o),
        t[s] = o);
    return t
}
function Ze(e, n={}, t, r) {
    const o = {};
    return r || ee(()=>o.children = Vt(e, n.children, o.children)),
    ee(()=>n.ref && n.ref(e)),
    ee(()=>ll(e, n, t, !0, o, !0)),
    o
}
function De(e, n, t) {
    return ae(()=>e(n, t))
}
function B(e, n, t, r) {
    if (t !== void 0 && !r && (r = []),
    typeof n != "function")
        return Vt(e, n, r, t);
    ee(o=>Vt(e, n(), o, t), r)
}
function ll(e, n, t, r, o={}, s=!1) {
    n || (n = {});
    for (const l in o)
        if (!(l in n)) {
            if (l === "children")
                continue;
            o[l] = Ki(e, l, null, o[l], t, s)
        }
    for (const l in n) {
        if (l === "children") {
            r || Vt(e, n.children);
            continue
        }
        const u = n[l];
        o[l] = Ki(e, l, u, o[l], t, s)
    }
}
function cl(e) {
    return e.toLowerCase().replace(/-([a-z])/g, (n,t)=>t.toUpperCase())
}
function qi(e, n, t) {
    const r = n.trim().split(/\s+/);
    for (let o = 0, s = r.length; o < s; o++)
        e.classList.toggle(r[o], t)
}
function Ki(e, n, t, r, o, s) {
    let l, u, c, f, p;
    if (n === "style")
        return al(e, t, r);
    if (n === "classList")
        return sl(e, t, r);
    if (t === r)
        return r;
    if (n === "ref")
        s || t(e);
    else if (n.slice(0, 3) === "on:") {
        const i = n.slice(3);
        r && e.removeEventListener(i, r),
        t && e.addEventListener(i, t)
    } else if (n.slice(0, 10) === "oncapture:") {
        const i = n.slice(10);
        r && e.removeEventListener(i, r, !0),
        t && e.addEventListener(i, t, !0)
    } else if (n.slice(0, 2) === "on") {
        const i = n.slice(2).toLowerCase()
          , a = Xa.has(i);
        if (!a && r) {
            const d = Array.isArray(r) ? r[0] : r;
            e.removeEventListener(i, d)
        }
        (a || t) && (ol(e, i, t, a),
        a && Oe([i]))
    } else if (n.slice(0, 5) === "attr:")
        fe(e, n.slice(5), t);
    else if ((p = n.slice(0, 5) === "prop:") || (c = qa.has(n)) || !o && ((f = Ja(n, e.tagName)) || (u = Wa.has(n))) || (l = e.nodeName.includes("-")))
        p && (n = n.slice(5),
        u = !0),
        n === "class" || n === "className" ? se(e, t) : l && !u && !c ? e[cl(n)] = t : e[f || n] = t;
    else {
        const i = o && n.indexOf(":") > -1 && tl[n.split(":")[0]];
        i ? il(e, i, n, t) : fe(e, Ka[n] || n, t)
    }
    return t
}
function ul(e) {
    const n = "$$".concat(e.type);
    let t = e.composedPath && e.composedPath()[0] || e.target;
    for (e.target !== t && Object.defineProperty(e, "target", {
        configurable: !0,
        value: t
    }),
    Object.defineProperty(e, "currentTarget", {
        configurable: !0,
        get() {
            return t || document
        }
    }); t; ) {
        const r = t[n];
        if (r && !t.disabled) {
            const o = t["".concat(n, "Data")];
            if (o !== void 0 ? r.call(t, o, e) : r.call(t, e),
            e.cancelBubble)
                return
        }
        t = t._$host || t.parentNode || t.host
    }
}
function Vt(e, n, t, r, o) {
    for (; typeof t == "function"; )
        t = t();
    if (n === t)
        return t;
    const s = typeof n
      , l = r !== void 0;
    if (e = l && t[0] && t[0].parentNode || e,
    s === "string" || s === "number")
        if (s === "number" && (n = n.toString()),
        l) {
            let u = t[0];
            u && u.nodeType === 3 ? u.data = n : u = document.createTextNode(n),
            t = Et(e, t, r, u)
        } else
            t !== "" && typeof t == "string" ? t = e.firstChild.data = n : t = e.textContent = n;
    else if (n == null || s === "boolean")
        t = Et(e, t, r);
    else {
        if (s === "function")
            return ee(()=>{
                let u = n();
                for (; typeof u == "function"; )
                    u = u();
                t = Vt(e, u, t, r)
            }
            ),
            ()=>t;
        if (Array.isArray(n)) {
            const u = []
              , c = t && Array.isArray(t);
            if (Fr(u, n, t, o))
                return ee(()=>t = Vt(e, u, t, r, !0)),
                ()=>t;
            if (u.length === 0) {
                if (t = Et(e, t, r),
                l)
                    return t
            } else
                c ? t.length === 0 ? Qi(e, u, r) : nl(e, t, u) : (t && Et(e),
                Qi(e, u));
            t = u
        } else if (n.nodeType) {
            if (Array.isArray(t)) {
                if (l)
                    return t = Et(e, t, r, n);
                Et(e, t, null, n)
            } else
                t == null || t === "" || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
            t = n
        } else
            console.warn("Unrecognized value. Skipped inserting", n)
    }
    return t
}
function Fr(e, n, t, r) {
    let o = !1;
    for (let s = 0, l = n.length; s < l; s++) {
        let u = n[s], c = t && t[s], f;
        if (!(u == null || u === !0 || u === !1))
            if ((f = typeof u) == "object" && u.nodeType)
                e.push(u);
            else if (Array.isArray(u))
                o = Fr(e, u, c) || o;
            else if (f === "function")
                if (r) {
                    for (; typeof u == "function"; )
                        u = u();
                    o = Fr(e, Array.isArray(u) ? u : [u], Array.isArray(c) ? c : [c]) || o
                } else
                    e.push(u),
                    o = !0;
            else {
                const p = String(u);
                c && c.nodeType === 3 && c.data === p ? e.push(c) : e.push(document.createTextNode(p))
            }
    }
    return o
}
function Qi(e, n, t=null) {
    for (let r = 0, o = n.length; r < o; r++)
        e.insertBefore(n[r], t)
}
function Et(e, n, t, r) {
    if (t === void 0)
        return e.textContent = "";
    const o = r || document.createTextNode("");
    if (n.length) {
        let s = !1;
        for (let l = n.length - 1; l >= 0; l--) {
            const u = n[l];
            if (o !== u) {
                const c = u.parentNode === e;
                !s && !l ? c ? e.replaceChild(o, u) : e.insertBefore(o, t) : c && u.remove()
            } else
                s = !0
        }
    } else
        e.insertBefore(o, t);
    return [o]
}
const fl = "http://www.w3.org/2000/svg";
function dl(e, n=!1) {
    return n ? document.createElementNS(fl, e) : document.createElement(e)
}
function ts(e) {
    const [n,t] = ri(e, ["component"])
      , r = Te(()=>n.component);
    return Te(()=>{
        const o = r();
        switch (typeof o) {
        case "function":
            return Object.assign(o, {
                [Ma]: !0
            }),
            ae(()=>o(t));
        case "string":
            const s = el.has(o)
              , l = dl(o, s);
            return Ze(l, t, s),
            l
        }
    }
    )
}
(function(e) {
    typeof globalThis != "object" && (this ? n() : (e.defineProperty(e.prototype, "_T_", {
        configurable: !0,
        get: n
    }),
    _T_));
    function n() {
        var t = this || self;
        t.globalThis = t,
        delete e.prototype._T_
    }
}
)(Object);
const jr = Symbol("store-raw")
  , Lt = Symbol("store-node")
  , ze = Symbol("store-has")
  , ns = Symbol("store-self");
function rs(e) {
    let n = e[Me];
    if (!n && (Object.defineProperty(e, Me, {
        value: n = new Proxy(e,hl)
    }),
    !Array.isArray(e))) {
        const t = Object.keys(e)
          , r = Object.getOwnPropertyDescriptors(e);
        for (let o = 0, s = t.length; o < s; o++) {
            const l = t[o];
            r[l].get && Object.defineProperty(e, l, {
                enumerable: r[l].enumerable,
                get: r[l].get.bind(n)
            })
        }
    }
    return n
}
function st(e) {
    let n;
    return e != null && typeof e == "object" && (e[Me] || !(n = Object.getPrototypeOf(e)) || n === Object.prototype || Array.isArray(e))
}
function zt(e, n=new Set) {
    let t, r, o, s;
    if (t = e != null && e[jr])
        return t;
    if (!st(e) || n.has(e))
        return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : n.add(e);
        for (let l = 0, u = e.length; l < u; l++)
            o = e[l],
            (r = zt(o, n)) !== o && (e[l] = r)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : n.add(e);
        const l = Object.keys(e)
          , u = Object.getOwnPropertyDescriptors(e);
        for (let c = 0, f = l.length; c < f; c++)
            s = l[c],
            !u[s].get && (o = e[s],
            (r = zt(o, n)) !== o && (e[s] = r))
    }
    return e
}
function er(e, n) {
    let t = e[n];
    return t || Object.defineProperty(e, n, {
        value: t = Object.create(null)
    }),
    t
}
function an(e, n, t) {
    if (e[n])
        return e[n];
    const [r,o] = W(t, {
        equals: !1,
        internal: !0
    });
    return r.$ = o,
    e[n] = r
}
function pl(e, n) {
    const t = Reflect.getOwnPropertyDescriptor(e, n);
    return !t || t.get || !t.configurable || n === Me || n === Lt || (delete t.value,
    delete t.writable,
    t.get = ()=>e[Me][n]),
    t
}
function is(e) {
    Qn() && an(er(e, Lt), ns)()
}
function vl(e) {
    return is(e),
    Reflect.ownKeys(e)
}
const hl = {
    get(e, n, t) {
        if (n === jr)
            return e;
        if (n === Me)
            return t;
        if (n === zr)
            return is(e),
            t;
        const r = er(e, Lt)
          , o = r[n];
        let s = o ? o() : e[n];
        if (n === Lt || n === ze || n === "__proto__")
            return s;
        if (!o) {
            const l = Object.getOwnPropertyDescriptor(e, n);
            Qn() && (typeof s != "function" || e.hasOwnProperty(n)) && !(l && l.get) && (s = an(r, n, s)())
        }
        return st(s) ? rs(s) : s
    },
    has(e, n) {
        return n === jr || n === Me || n === zr || n === Lt || n === ze || n === "__proto__" ? !0 : (Qn() && an(er(e, ze), n)(),
        n in e)
    },
    set() {
        return !0
    },
    deleteProperty() {
        return !0
    },
    ownKeys: vl,
    getOwnPropertyDescriptor: pl
};
function $e(e, n, t, r=!1) {
    if (!r && e[n] === t)
        return;
    const o = e[n]
      , s = e.length;
    t === void 0 ? (delete e[n],
    e[ze] && e[ze][n] && o !== void 0 && e[ze][n].$()) : (e[n] = t,
    e[ze] && e[ze][n] && o === void 0 && e[ze][n].$());
    let l = er(e, Lt), u;
    if ((u = an(l, n, o)) && u.$(()=>t),
    Array.isArray(e) && e.length !== s) {
        for (let c = e.length; c < s; c++)
            (u = l[c]) && u.$();
        (u = an(l, "length", s)) && u.$(e.length)
    }
    (u = l[ns]) && u.$()
}
function os(e, n) {
    const t = Object.keys(n);
    for (let r = 0; r < t.length; r += 1) {
        const o = t[r];
        $e(e, o, n[o])
    }
}
function ml(e, n) {
    if (typeof n == "function" && (n = n(e)),
    n = zt(n),
    Array.isArray(n)) {
        if (e === n)
            return;
        let t = 0
          , r = n.length;
        for (; t < r; t++) {
            const o = n[t];
            e[t] !== o && $e(e, t, o)
        }
        $e(e, "length", r)
    } else
        os(e, n)
}
function nn(e, n, t=[]) {
    let r, o = e;
    if (n.length > 1) {
        r = n.shift();
        const l = typeof r
          , u = Array.isArray(e);
        if (Array.isArray(r)) {
            for (let c = 0; c < r.length; c++)
                nn(e, [r[c]].concat(n), t);
            return
        } else if (u && l === "function") {
            for (let c = 0; c < e.length; c++)
                r(e[c], c) && nn(e, [c].concat(n), t);
            return
        } else if (u && l === "object") {
            const {from: c=0, to: f=e.length - 1, by: p=1} = r;
            for (let i = c; i <= f; i += p)
                nn(e, [i].concat(n), t);
            return
        } else if (n.length > 1) {
            nn(e[r], n, [r].concat(t));
            return
        }
        o = e[r],
        t = [r].concat(t)
    }
    let s = n[0];
    typeof s == "function" && (s = s(o, t),
    s === o) || r === void 0 && s == null || (s = zt(s),
    r === void 0 || st(o) && st(s) && !Array.isArray(s) ? os(o, s) : $e(e, r, s))
}
function Gt(...[e,n]) {
    const t = zt(e || {})
      , r = Array.isArray(t)
      , o = rs(t);
    function s(...l) {
        ir(()=>{
            r && l.length === 1 ? ml(t, l[0]) : nn(t, l)
        }
        )
    }
    return [o, s]
}
const Gr = Symbol("store-root");
function Dt(e, n, t, r, o) {
    const s = n[t];
    if (e === s)
        return;
    if (t !== Gr && (!st(e) || !st(s) || o && e[o] !== s[o])) {
        $e(n, t, e);
        return
    }
    if (Array.isArray(e)) {
        if (e.length && s.length && (!r || o && e[0] && e[0][o] != null)) {
            let c, f, p, i, a, d, h, v;
            for (p = 0,
            i = Math.min(s.length, e.length); p < i && (s[p] === e[p] || o && s[p] && e[p] && s[p][o] === e[p][o]); p++)
                Dt(e[p], s, p, r, o);
            const g = new Array(e.length)
              , m = new Map;
            for (i = s.length - 1,
            a = e.length - 1; i >= p && a >= p && (s[i] === e[a] || o && s[p] && e[p] && s[i][o] === e[a][o]); i--,
            a--)
                g[a] = s[i];
            if (p > a || p > i) {
                for (f = p; f <= a; f++)
                    $e(s, f, e[f]);
                for (; f < e.length; f++)
                    $e(s, f, g[f]),
                    Dt(e[f], s, f, r, o);
                s.length > e.length && $e(s, "length", e.length);
                return
            }
            for (h = new Array(a + 1),
            f = a; f >= p; f--)
                d = e[f],
                v = o && d ? d[o] : d,
                c = m.get(v),
                h[f] = c === void 0 ? -1 : c,
                m.set(v, f);
            for (c = p; c <= i; c++)
                d = s[c],
                v = o && d ? d[o] : d,
                f = m.get(v),
                f !== void 0 && f !== -1 && (g[f] = s[c],
                f = h[f],
                m.set(v, f));
            for (f = p; f < e.length; f++)
                f in g ? ($e(s, f, g[f]),
                Dt(e[f], s, f, r, o)) : $e(s, f, e[f])
        } else
            for (let c = 0, f = e.length; c < f; c++)
                Dt(e[c], s, c, r, o);
        s.length > e.length && $e(s, "length", e.length);
        return
    }
    const l = Object.keys(e);
    for (let c = 0, f = l.length; c < f; c++)
        Dt(e[l[c]], s, l[c], r, o);
    const u = Object.keys(s);
    for (let c = 0, f = u.length; c < f; c++)
        e[u[c]] === void 0 && $e(s, u[c], void 0)
}
function gl(e, n={}) {
    const {merge: t, key: r="id"} = n
      , o = zt(e);
    return s=>{
        if (!st(s) || !st(o))
            return o;
        const l = Dt(o, {
            [Gr]: s
        }, Gr, t, r);
        return l === void 0 ? s : l
    }
}
const [_l,Zr] = Gt({
    mainApp: null
})
  , yl = e=>{
    Zr(e === "home" || e === "security-tape-archives" || e === "timecoder" ? {
        mainApp: "terminal",
        terminalApp: e
    } : {
        mainApp: e,
        terminalApp: void 0
    })
}
  , wl = ()=>{
    Zr({
        mainApp: null,
        terminalApp: void 0
    })
}
  , we = {
    currentOpenApp: _l,
    openApp: yl,
    closeApp: wl
};
var He = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function mn(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
function hv(e) {
    if (e.__esModule)
        return e;
    var n = e.default;
    if (typeof n == "function") {
        var t = function r() {
            return this instanceof r ? Reflect.construct(n, arguments, this.constructor) : n.apply(this, arguments)
        };
        t.prototype = n.prototype
    } else
        t = {};
    return Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    Object.keys(e).forEach(function(r) {
        var o = Object.getOwnPropertyDescriptor(e, r);
        Object.defineProperty(t, r, o.get ? o : {
            enumerable: !0,
            get: function() {
                return e[r]
            }
        })
    }),
    t
}
var ln = {};
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
                var i = this || t;
                return i._counter = 1e3,
                i._html5AudioPool = [],
                i.html5PoolSize = 10,
                i._codecs = {},
                i._howls = [],
                i._muted = !1,
                i._volume = 1,
                i._canPlayEvent = "canplaythrough",
                i._navigator = typeof window < "u" && window.navigator ? window.navigator : null,
                i.masterGain = null,
                i.noAudio = !1,
                i.usingWebAudio = !0,
                i.autoSuspend = !0,
                i.ctx = null,
                i.autoUnlock = !0,
                i._setup(),
                i
            },
            volume: function(i) {
                var a = this || t;
                if (i = parseFloat(i),
                a.ctx || p(),
                typeof i < "u" && i >= 0 && i <= 1) {
                    if (a._volume = i,
                    a._muted)
                        return a;
                    a.usingWebAudio && a.masterGain.gain.setValueAtTime(i, t.ctx.currentTime);
                    for (var d = 0; d < a._howls.length; d++)
                        if (!a._howls[d]._webAudio)
                            for (var h = a._howls[d]._getSoundIds(), v = 0; v < h.length; v++) {
                                var g = a._howls[d]._soundById(h[v]);
                                g && g._node && (g._node.volume = g._volume * i)
                            }
                    return a
                }
                return a._volume
            },
            mute: function(i) {
                var a = this || t;
                a.ctx || p(),
                a._muted = i,
                a.usingWebAudio && a.masterGain.gain.setValueAtTime(i ? 0 : a._volume, t.ctx.currentTime);
                for (var d = 0; d < a._howls.length; d++)
                    if (!a._howls[d]._webAudio)
                        for (var h = a._howls[d]._getSoundIds(), v = 0; v < h.length; v++) {
                            var g = a._howls[d]._soundById(h[v]);
                            g && g._node && (g._node.muted = i ? !0 : g._muted)
                        }
                return a
            },
            stop: function() {
                for (var i = this || t, a = 0; a < i._howls.length; a++)
                    i._howls[a].stop();
                return i
            },
            unload: function() {
                for (var i = this || t, a = i._howls.length - 1; a >= 0; a--)
                    i._howls[a].unload();
                return i.usingWebAudio && i.ctx && typeof i.ctx.close < "u" && (i.ctx.close(),
                i.ctx = null,
                p()),
                i
            },
            codecs: function(i) {
                return (this || t)._codecs[i.replace(/^x-/, "")]
            },
            _setup: function() {
                var i = this || t;
                if (i.state = i.ctx && i.ctx.state || "suspended",
                i._autoSuspend(),
                !i.usingWebAudio)
                    if (typeof Audio < "u")
                        try {
                            var a = new Audio;
                            typeof a.oncanplaythrough > "u" && (i._canPlayEvent = "canplay")
                        } catch (d) {
                            i.noAudio = !0
                        }
                    else
                        i.noAudio = !0;
                try {
                    var a = new Audio;
                    a.muted && (i.noAudio = !0)
                } catch (d) {}
                return i.noAudio || i._setupCodecs(),
                i
            },
            _setupCodecs: function() {
                var i = this || t
                  , a = null;
                try {
                    a = typeof Audio < "u" ? new Audio : null
                } catch (w) {
                    return i
                }
                if (!a || typeof a.canPlayType != "function")
                    return i;
                var d = a.canPlayType("audio/mpeg;").replace(/^no$/, "")
                  , h = i._navigator ? i._navigator.userAgent : ""
                  , v = h.match(/OPR\/(\d+)/g)
                  , g = v && parseInt(v[0].split("/")[1], 10) < 33
                  , m = h.indexOf("Safari") !== -1 && h.indexOf("Chrome") === -1
                  , y = h.match(/Version\/(.*?) /)
                  , A = m && y && parseInt(y[1], 10) < 15;
                return i._codecs = {
                    mp3: !!(!g && (d || a.canPlayType("audio/mp3;").replace(/^no$/, ""))),
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
                    weba: !!(!A && a.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                    webm: !!(!A && a.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                    dolby: !!a.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                    flac: !!(a.canPlayType("audio/x-flac;") || a.canPlayType("audio/flac;")).replace(/^no$/, "")
                },
                i
            },
            _unlockAudio: function() {
                var i = this || t;
                if (!(i._audioUnlocked || !i.ctx)) {
                    i._audioUnlocked = !1,
                    i.autoUnlock = !1,
                    !i._mobileUnloaded && i.ctx.sampleRate !== 44100 && (i._mobileUnloaded = !0,
                    i.unload()),
                    i._scratchBuffer = i.ctx.createBuffer(1, 1, 22050);
                    var a = function(d) {
                        for (; i._html5AudioPool.length < i.html5PoolSize; )
                            try {
                                var h = new Audio;
                                h._unlocked = !0,
                                i._releaseHtml5Audio(h)
                            } catch (w) {
                                i.noAudio = !0;
                                break
                            }
                        for (var v = 0; v < i._howls.length; v++)
                            if (!i._howls[v]._webAudio)
                                for (var g = i._howls[v]._getSoundIds(), m = 0; m < g.length; m++) {
                                    var y = i._howls[v]._soundById(g[m]);
                                    y && y._node && !y._node._unlocked && (y._node._unlocked = !0,
                                    y._node.load())
                                }
                        i._autoResume();
                        var A = i.ctx.createBufferSource();
                        A.buffer = i._scratchBuffer,
                        A.connect(i.ctx.destination),
                        typeof A.start > "u" ? A.noteOn(0) : A.start(0),
                        typeof i.ctx.resume == "function" && i.ctx.resume(),
                        A.onended = function() {
                            A.disconnect(0),
                            i._audioUnlocked = !0,
                            document.removeEventListener("touchstart", a, !0),
                            document.removeEventListener("touchend", a, !0),
                            document.removeEventListener("click", a, !0),
                            document.removeEventListener("keydown", a, !0);
                            for (var w = 0; w < i._howls.length; w++)
                                i._howls[w]._emit("unlock")
                        }
                    };
                    return document.addEventListener("touchstart", a, !0),
                    document.addEventListener("touchend", a, !0),
                    document.addEventListener("click", a, !0),
                    document.addEventListener("keydown", a, !0),
                    i
                }
            },
            _obtainHtml5Audio: function() {
                var i = this || t;
                if (i._html5AudioPool.length)
                    return i._html5AudioPool.pop();
                var a = new Audio().play();
                return a && typeof Promise < "u" && (a instanceof Promise || typeof a.then == "function") && a.catch(function() {
                    console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")
                }),
                new Audio
            },
            _releaseHtml5Audio: function(i) {
                var a = this || t;
                return i._unlocked && a._html5AudioPool.push(i),
                a
            },
            _autoSuspend: function() {
                var i = this;
                if (!(!i.autoSuspend || !i.ctx || typeof i.ctx.suspend > "u" || !t.usingWebAudio)) {
                    for (var a = 0; a < i._howls.length; a++)
                        if (i._howls[a]._webAudio) {
                            for (var d = 0; d < i._howls[a]._sounds.length; d++)
                                if (!i._howls[a]._sounds[d]._paused)
                                    return i
                        }
                    return i._suspendTimer && clearTimeout(i._suspendTimer),
                    i._suspendTimer = setTimeout(function() {
                        if (i.autoSuspend) {
                            i._suspendTimer = null,
                            i.state = "suspending";
                            var h = function() {
                                i.state = "suspended",
                                i._resumeAfterSuspend && (delete i._resumeAfterSuspend,
                                i._autoResume())
                            };
                            i.ctx.suspend().then(h, h)
                        }
                    }, 3e4),
                    i
                }
            },
            _autoResume: function() {
                var i = this;
                if (!(!i.ctx || typeof i.ctx.resume > "u" || !t.usingWebAudio))
                    return i.state === "running" && i.ctx.state !== "interrupted" && i._suspendTimer ? (clearTimeout(i._suspendTimer),
                    i._suspendTimer = null) : i.state === "suspended" || i.state === "running" && i.ctx.state === "interrupted" ? (i.ctx.resume().then(function() {
                        i.state = "running";
                        for (var a = 0; a < i._howls.length; a++)
                            i._howls[a]._emit("resume")
                    }),
                    i._suspendTimer && (clearTimeout(i._suspendTimer),
                    i._suspendTimer = null)) : i.state === "suspending" && (i._resumeAfterSuspend = !0),
                    i
            }
        };
        var t = new n
          , r = function(i) {
            var a = this;
            if (!i.src || i.src.length === 0) {
                console.error("An array of source files must be passed with any new Howl.");
                return
            }
            a.init(i)
        };
        r.prototype = {
            init: function(i) {
                var a = this;
                return t.ctx || p(),
                a._autoplay = i.autoplay || !1,
                a._format = typeof i.format != "string" ? i.format : [i.format],
                a._html5 = i.html5 || !1,
                a._muted = i.mute || !1,
                a._loop = i.loop || !1,
                a._pool = i.pool || 5,
                a._preload = typeof i.preload == "boolean" || i.preload === "metadata" ? i.preload : !0,
                a._rate = i.rate || 1,
                a._sprite = i.sprite || {},
                a._src = typeof i.src != "string" ? i.src : [i.src],
                a._volume = i.volume !== void 0 ? i.volume : 1,
                a._xhr = {
                    method: i.xhr && i.xhr.method ? i.xhr.method : "GET",
                    headers: i.xhr && i.xhr.headers ? i.xhr.headers : null,
                    withCredentials: i.xhr && i.xhr.withCredentials ? i.xhr.withCredentials : !1
                },
                a._duration = 0,
                a._state = "unloaded",
                a._sounds = [],
                a._endTimers = {},
                a._queue = [],
                a._playLock = !1,
                a._onend = i.onend ? [{
                    fn: i.onend
                }] : [],
                a._onfade = i.onfade ? [{
                    fn: i.onfade
                }] : [],
                a._onload = i.onload ? [{
                    fn: i.onload
                }] : [],
                a._onloaderror = i.onloaderror ? [{
                    fn: i.onloaderror
                }] : [],
                a._onplayerror = i.onplayerror ? [{
                    fn: i.onplayerror
                }] : [],
                a._onpause = i.onpause ? [{
                    fn: i.onpause
                }] : [],
                a._onplay = i.onplay ? [{
                    fn: i.onplay
                }] : [],
                a._onstop = i.onstop ? [{
                    fn: i.onstop
                }] : [],
                a._onmute = i.onmute ? [{
                    fn: i.onmute
                }] : [],
                a._onvolume = i.onvolume ? [{
                    fn: i.onvolume
                }] : [],
                a._onrate = i.onrate ? [{
                    fn: i.onrate
                }] : [],
                a._onseek = i.onseek ? [{
                    fn: i.onseek
                }] : [],
                a._onunlock = i.onunlock ? [{
                    fn: i.onunlock
                }] : [],
                a._onresume = [],
                a._webAudio = t.usingWebAudio && !a._html5,
                typeof t.ctx < "u" && t.ctx && t.autoUnlock && t._unlockAudio(),
                t._howls.push(a),
                a._autoplay && a._queue.push({
                    event: "play",
                    action: function() {
                        a.play()
                    }
                }),
                a._preload && a._preload !== "none" && a.load(),
                a
            },
            load: function() {
                var i = this
                  , a = null;
                if (t.noAudio) {
                    i._emit("loaderror", null, "No audio support.");
                    return
                }
                typeof i._src == "string" && (i._src = [i._src]);
                for (var d = 0; d < i._src.length; d++) {
                    var h, v;
                    if (i._format && i._format[d])
                        h = i._format[d];
                    else {
                        if (v = i._src[d],
                        typeof v != "string") {
                            i._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                            continue
                        }
                        h = /^data:audio\/([^;,]+);/i.exec(v),
                        h || (h = /\.([^.]+)$/.exec(v.split("?", 1)[0])),
                        h && (h = h[1].toLowerCase())
                    }
                    if (h || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),
                    h && t.codecs(h)) {
                        a = i._src[d];
                        break
                    }
                }
                if (!a) {
                    i._emit("loaderror", null, "No codec support for selected audio sources.");
                    return
                }
                return i._src = a,
                i._state = "loading",
                window.location.protocol === "https:" && a.slice(0, 5) === "http:" && (i._html5 = !0,
                i._webAudio = !1),
                new o(i),
                i._webAudio && l(i),
                i
            },
            play: function(i, a) {
                var d = this
                  , h = null;
                if (typeof i == "number")
                    h = i,
                    i = null;
                else {
                    if (typeof i == "string" && d._state === "loaded" && !d._sprite[i])
                        return null;
                    if (typeof i > "u" && (i = "__default",
                    !d._playLock)) {
                        for (var v = 0, g = 0; g < d._sounds.length; g++)
                            d._sounds[g]._paused && !d._sounds[g]._ended && (v++,
                            h = d._sounds[g]._id);
                        v === 1 ? i = null : h = null
                    }
                }
                var m = h ? d._soundById(h) : d._inactiveSound();
                if (!m)
                    return null;
                if (h && !i && (i = m._sprite || "__default"),
                d._state !== "loaded") {
                    m._sprite = i,
                    m._ended = !1;
                    var y = m._id;
                    return d._queue.push({
                        event: "play",
                        action: function() {
                            d.play(y)
                        }
                    }),
                    y
                }
                if (h && !m._paused)
                    return a || d._loadQueue("play"),
                    m._id;
                d._webAudio && t._autoResume();
                var A = Math.max(0, m._seek > 0 ? m._seek : d._sprite[i][0] / 1e3)
                  , w = Math.max(0, (d._sprite[i][0] + d._sprite[i][1]) / 1e3 - A)
                  , $ = w * 1e3 / Math.abs(m._rate)
                  , z = d._sprite[i][0] / 1e3
                  , F = (d._sprite[i][0] + d._sprite[i][1]) / 1e3;
                m._sprite = i,
                m._ended = !1;
                var L = function() {
                    m._paused = !1,
                    m._seek = A,
                    m._start = z,
                    m._stop = F,
                    m._loop = !!(m._loop || d._sprite[i][2])
                };
                if (A >= F) {
                    d._ended(m);
                    return
                }
                var M = m._node;
                if (d._webAudio) {
                    var V = function() {
                        d._playLock = !1,
                        L(),
                        d._refreshBuffer(m);
                        var C = m._muted || d._muted ? 0 : m._volume;
                        M.gain.setValueAtTime(C, t.ctx.currentTime),
                        m._playStart = t.ctx.currentTime,
                        typeof M.bufferSource.start > "u" ? m._loop ? M.bufferSource.noteGrainOn(0, A, 86400) : M.bufferSource.noteGrainOn(0, A, w) : m._loop ? M.bufferSource.start(0, A, 86400) : M.bufferSource.start(0, A, w),
                        $ !== 1 / 0 && (d._endTimers[m._id] = setTimeout(d._ended.bind(d, m), $)),
                        a || setTimeout(function() {
                            d._emit("play", m._id),
                            d._loadQueue()
                        }, 0)
                    };
                    t.state === "running" && t.ctx.state !== "interrupted" ? V() : (d._playLock = !0,
                    d.once("resume", V),
                    d._clearTimer(m._id))
                } else {
                    var R = function() {
                        M.currentTime = A,
                        M.muted = m._muted || d._muted || t._muted || M.muted,
                        M.volume = m._volume * t.volume(),
                        M.playbackRate = m._rate;
                        try {
                            var C = M.play();
                            if (C && typeof Promise < "u" && (C instanceof Promise || typeof C.then == "function") ? (d._playLock = !0,
                            L(),
                            C.then(function() {
                                d._playLock = !1,
                                M._unlocked = !0,
                                a ? d._loadQueue() : d._emit("play", m._id)
                            }).catch(function() {
                                d._playLock = !1,
                                d._emit("playerror", m._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),
                                m._ended = !0,
                                m._paused = !0
                            })) : a || (d._playLock = !1,
                            L(),
                            d._emit("play", m._id)),
                            M.playbackRate = m._rate,
                            M.paused) {
                                d._emit("playerror", m._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                return
                            }
                            i !== "__default" || m._loop ? d._endTimers[m._id] = setTimeout(d._ended.bind(d, m), $) : (d._endTimers[m._id] = function() {
                                d._ended(m),
                                M.removeEventListener("ended", d._endTimers[m._id], !1)
                            }
                            ,
                            M.addEventListener("ended", d._endTimers[m._id], !1))
                        } catch (I) {
                            d._emit("playerror", m._id, I)
                        }
                    };
                    M.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (M.src = d._src,
                    M.load());
                    var Q = window && window.ejecta || !M.readyState && t._navigator.isCocoonJS;
                    if (M.readyState >= 3 || Q)
                        R();
                    else {
                        d._playLock = !0,
                        d._state = "loading";
                        var ce = function() {
                            d._state = "loaded",
                            R(),
                            M.removeEventListener(t._canPlayEvent, ce, !1)
                        };
                        M.addEventListener(t._canPlayEvent, ce, !1),
                        d._clearTimer(m._id)
                    }
                }
                return m._id
            },
            pause: function(i) {
                var a = this;
                if (a._state !== "loaded" || a._playLock)
                    return a._queue.push({
                        event: "pause",
                        action: function() {
                            a.pause(i)
                        }
                    }),
                    a;
                for (var d = a._getSoundIds(i), h = 0; h < d.length; h++) {
                    a._clearTimer(d[h]);
                    var v = a._soundById(d[h]);
                    if (v && !v._paused && (v._seek = a.seek(d[h]),
                    v._rateSeek = 0,
                    v._paused = !0,
                    a._stopFade(d[h]),
                    v._node))
                        if (a._webAudio) {
                            if (!v._node.bufferSource)
                                continue;
                            typeof v._node.bufferSource.stop > "u" ? v._node.bufferSource.noteOff(0) : v._node.bufferSource.stop(0),
                            a._cleanBuffer(v._node)
                        } else
                            (!isNaN(v._node.duration) || v._node.duration === 1 / 0) && v._node.pause();
                    arguments[1] || a._emit("pause", v ? v._id : null)
                }
                return a
            },
            stop: function(i, a) {
                var d = this;
                if (d._state !== "loaded" || d._playLock)
                    return d._queue.push({
                        event: "stop",
                        action: function() {
                            d.stop(i)
                        }
                    }),
                    d;
                for (var h = d._getSoundIds(i), v = 0; v < h.length; v++) {
                    d._clearTimer(h[v]);
                    var g = d._soundById(h[v]);
                    g && (g._seek = g._start || 0,
                    g._rateSeek = 0,
                    g._paused = !0,
                    g._ended = !0,
                    d._stopFade(h[v]),
                    g._node && (d._webAudio ? g._node.bufferSource && (typeof g._node.bufferSource.stop > "u" ? g._node.bufferSource.noteOff(0) : g._node.bufferSource.stop(0),
                    d._cleanBuffer(g._node)) : (!isNaN(g._node.duration) || g._node.duration === 1 / 0) && (g._node.currentTime = g._start || 0,
                    g._node.pause(),
                    g._node.duration === 1 / 0 && d._clearSound(g._node))),
                    a || d._emit("stop", g._id))
                }
                return d
            },
            mute: function(i, a) {
                var d = this;
                if (d._state !== "loaded" || d._playLock)
                    return d._queue.push({
                        event: "mute",
                        action: function() {
                            d.mute(i, a)
                        }
                    }),
                    d;
                if (typeof a > "u")
                    if (typeof i == "boolean")
                        d._muted = i;
                    else
                        return d._muted;
                for (var h = d._getSoundIds(a), v = 0; v < h.length; v++) {
                    var g = d._soundById(h[v]);
                    g && (g._muted = i,
                    g._interval && d._stopFade(g._id),
                    d._webAudio && g._node ? g._node.gain.setValueAtTime(i ? 0 : g._volume, t.ctx.currentTime) : g._node && (g._node.muted = t._muted ? !0 : i),
                    d._emit("mute", g._id))
                }
                return d
            },
            volume: function() {
                var i = this, a = arguments, d, h;
                if (a.length === 0)
                    return i._volume;
                if (a.length === 1 || a.length === 2 && typeof a[1] > "u") {
                    var v = i._getSoundIds()
                      , g = v.indexOf(a[0]);
                    g >= 0 ? h = parseInt(a[0], 10) : d = parseFloat(a[0])
                } else
                    a.length >= 2 && (d = parseFloat(a[0]),
                    h = parseInt(a[1], 10));
                var m;
                if (typeof d < "u" && d >= 0 && d <= 1) {
                    if (i._state !== "loaded" || i._playLock)
                        return i._queue.push({
                            event: "volume",
                            action: function() {
                                i.volume.apply(i, a)
                            }
                        }),
                        i;
                    typeof h > "u" && (i._volume = d),
                    h = i._getSoundIds(h);
                    for (var y = 0; y < h.length; y++)
                        m = i._soundById(h[y]),
                        m && (m._volume = d,
                        a[2] || i._stopFade(h[y]),
                        i._webAudio && m._node && !m._muted ? m._node.gain.setValueAtTime(d, t.ctx.currentTime) : m._node && !m._muted && (m._node.volume = d * t.volume()),
                        i._emit("volume", m._id))
                } else
                    return m = h ? i._soundById(h) : i._sounds[0],
                    m ? m._volume : 0;
                return i
            },
            fade: function(i, a, d, h) {
                var v = this;
                if (v._state !== "loaded" || v._playLock)
                    return v._queue.push({
                        event: "fade",
                        action: function() {
                            v.fade(i, a, d, h)
                        }
                    }),
                    v;
                i = Math.min(Math.max(0, parseFloat(i)), 1),
                a = Math.min(Math.max(0, parseFloat(a)), 1),
                d = parseFloat(d),
                v.volume(i, h);
                for (var g = v._getSoundIds(h), m = 0; m < g.length; m++) {
                    var y = v._soundById(g[m]);
                    if (y) {
                        if (h || v._stopFade(g[m]),
                        v._webAudio && !y._muted) {
                            var A = t.ctx.currentTime
                              , w = A + d / 1e3;
                            y._volume = i,
                            y._node.gain.setValueAtTime(i, A),
                            y._node.gain.linearRampToValueAtTime(a, w)
                        }
                        v._startFadeInterval(y, i, a, d, g[m], typeof h > "u")
                    }
                }
                return v
            },
            _startFadeInterval: function(i, a, d, h, v, g) {
                var m = this
                  , y = a
                  , A = d - a
                  , w = Math.abs(A / .01)
                  , $ = Math.max(4, w > 0 ? h / w : h)
                  , z = Date.now();
                i._fadeTo = d,
                i._interval = setInterval(function() {
                    var F = (Date.now() - z) / h;
                    z = Date.now(),
                    y += A * F,
                    y = Math.round(y * 100) / 100,
                    A < 0 ? y = Math.max(d, y) : y = Math.min(d, y),
                    m._webAudio ? i._volume = y : m.volume(y, i._id, !0),
                    g && (m._volume = y),
                    (d < a && y <= d || d > a && y >= d) && (clearInterval(i._interval),
                    i._interval = null,
                    i._fadeTo = null,
                    m.volume(d, i._id),
                    m._emit("fade", i._id))
                }, $)
            },
            _stopFade: function(i) {
                var a = this
                  , d = a._soundById(i);
                return d && d._interval && (a._webAudio && d._node.gain.cancelScheduledValues(t.ctx.currentTime),
                clearInterval(d._interval),
                d._interval = null,
                a.volume(d._fadeTo, i),
                d._fadeTo = null,
                a._emit("fade", i)),
                a
            },
            loop: function() {
                var i = this, a = arguments, d, h, v;
                if (a.length === 0)
                    return i._loop;
                if (a.length === 1)
                    if (typeof a[0] == "boolean")
                        d = a[0],
                        i._loop = d;
                    else
                        return v = i._soundById(parseInt(a[0], 10)),
                        v ? v._loop : !1;
                else
                    a.length === 2 && (d = a[0],
                    h = parseInt(a[1], 10));
                for (var g = i._getSoundIds(h), m = 0; m < g.length; m++)
                    v = i._soundById(g[m]),
                    v && (v._loop = d,
                    i._webAudio && v._node && v._node.bufferSource && (v._node.bufferSource.loop = d,
                    d && (v._node.bufferSource.loopStart = v._start || 0,
                    v._node.bufferSource.loopEnd = v._stop,
                    i.playing(g[m]) && (i.pause(g[m], !0),
                    i.play(g[m], !0)))));
                return i
            },
            rate: function() {
                var i = this, a = arguments, d, h;
                if (a.length === 0)
                    h = i._sounds[0]._id;
                else if (a.length === 1) {
                    var v = i._getSoundIds()
                      , g = v.indexOf(a[0]);
                    g >= 0 ? h = parseInt(a[0], 10) : d = parseFloat(a[0])
                } else
                    a.length === 2 && (d = parseFloat(a[0]),
                    h = parseInt(a[1], 10));
                var m;
                if (typeof d == "number") {
                    if (i._state !== "loaded" || i._playLock)
                        return i._queue.push({
                            event: "rate",
                            action: function() {
                                i.rate.apply(i, a)
                            }
                        }),
                        i;
                    typeof h > "u" && (i._rate = d),
                    h = i._getSoundIds(h);
                    for (var y = 0; y < h.length; y++)
                        if (m = i._soundById(h[y]),
                        m) {
                            i.playing(h[y]) && (m._rateSeek = i.seek(h[y]),
                            m._playStart = i._webAudio ? t.ctx.currentTime : m._playStart),
                            m._rate = d,
                            i._webAudio && m._node && m._node.bufferSource ? m._node.bufferSource.playbackRate.setValueAtTime(d, t.ctx.currentTime) : m._node && (m._node.playbackRate = d);
                            var A = i.seek(h[y])
                              , w = (i._sprite[m._sprite][0] + i._sprite[m._sprite][1]) / 1e3 - A
                              , $ = w * 1e3 / Math.abs(m._rate);
                            (i._endTimers[h[y]] || !m._paused) && (i._clearTimer(h[y]),
                            i._endTimers[h[y]] = setTimeout(i._ended.bind(i, m), $)),
                            i._emit("rate", m._id)
                        }
                } else
                    return m = i._soundById(h),
                    m ? m._rate : i._rate;
                return i
            },
            seek: function() {
                var i = this, a = arguments, d, h;
                if (a.length === 0)
                    i._sounds.length && (h = i._sounds[0]._id);
                else if (a.length === 1) {
                    var v = i._getSoundIds()
                      , g = v.indexOf(a[0]);
                    g >= 0 ? h = parseInt(a[0], 10) : i._sounds.length && (h = i._sounds[0]._id,
                    d = parseFloat(a[0]))
                } else
                    a.length === 2 && (d = parseFloat(a[0]),
                    h = parseInt(a[1], 10));
                if (typeof h > "u")
                    return 0;
                if (typeof d == "number" && (i._state !== "loaded" || i._playLock))
                    return i._queue.push({
                        event: "seek",
                        action: function() {
                            i.seek.apply(i, a)
                        }
                    }),
                    i;
                var m = i._soundById(h);
                if (m)
                    if (typeof d == "number" && d >= 0) {
                        var y = i.playing(h);
                        y && i.pause(h, !0),
                        m._seek = d,
                        m._ended = !1,
                        i._clearTimer(h),
                        !i._webAudio && m._node && !isNaN(m._node.duration) && (m._node.currentTime = d);
                        var A = function() {
                            y && i.play(h, !0),
                            i._emit("seek", h)
                        };
                        if (y && !i._webAudio) {
                            var w = function() {
                                i._playLock ? setTimeout(w, 0) : A()
                            };
                            setTimeout(w, 0)
                        } else
                            A()
                    } else if (i._webAudio) {
                        var $ = i.playing(h) ? t.ctx.currentTime - m._playStart : 0
                          , z = m._rateSeek ? m._rateSeek - m._seek : 0;
                        return m._seek + (z + $ * Math.abs(m._rate))
                    } else
                        return m._node.currentTime;
                return i
            },
            playing: function(i) {
                var a = this;
                if (typeof i == "number") {
                    var d = a._soundById(i);
                    return d ? !d._paused : !1
                }
                for (var h = 0; h < a._sounds.length; h++)
                    if (!a._sounds[h]._paused)
                        return !0;
                return !1
            },
            duration: function(i) {
                var a = this
                  , d = a._duration
                  , h = a._soundById(i);
                return h && (d = a._sprite[h._sprite][1] / 1e3),
                d
            },
            state: function() {
                return this._state
            },
            unload: function() {
                for (var i = this, a = i._sounds, d = 0; d < a.length; d++)
                    a[d]._paused || i.stop(a[d]._id),
                    i._webAudio || (i._clearSound(a[d]._node),
                    a[d]._node.removeEventListener("error", a[d]._errorFn, !1),
                    a[d]._node.removeEventListener(t._canPlayEvent, a[d]._loadFn, !1),
                    a[d]._node.removeEventListener("ended", a[d]._endFn, !1),
                    t._releaseHtml5Audio(a[d]._node)),
                    delete a[d]._node,
                    i._clearTimer(a[d]._id);
                var h = t._howls.indexOf(i);
                h >= 0 && t._howls.splice(h, 1);
                var v = !0;
                for (d = 0; d < t._howls.length; d++)
                    if (t._howls[d]._src === i._src || i._src.indexOf(t._howls[d]._src) >= 0) {
                        v = !1;
                        break
                    }
                return s && v && delete s[i._src],
                t.noAudio = !1,
                i._state = "unloaded",
                i._sounds = [],
                i = null,
                null
            },
            on: function(i, a, d, h) {
                var v = this
                  , g = v["_on" + i];
                return typeof a == "function" && g.push(h ? {
                    id: d,
                    fn: a,
                    once: h
                } : {
                    id: d,
                    fn: a
                }),
                v
            },
            off: function(i, a, d) {
                var h = this
                  , v = h["_on" + i]
                  , g = 0;
                if (typeof a == "number" && (d = a,
                a = null),
                a || d)
                    for (g = 0; g < v.length; g++) {
                        var m = d === v[g].id;
                        if (a === v[g].fn && m || !a && m) {
                            v.splice(g, 1);
                            break
                        }
                    }
                else if (i)
                    h["_on" + i] = [];
                else {
                    var y = Object.keys(h);
                    for (g = 0; g < y.length; g++)
                        y[g].indexOf("_on") === 0 && Array.isArray(h[y[g]]) && (h[y[g]] = [])
                }
                return h
            },
            once: function(i, a, d) {
                var h = this;
                return h.on(i, a, d, 1),
                h
            },
            _emit: function(i, a, d) {
                for (var h = this, v = h["_on" + i], g = v.length - 1; g >= 0; g--)
                    (!v[g].id || v[g].id === a || i === "load") && (setTimeout(function(m) {
                        m.call(this, a, d)
                    }
                    .bind(h, v[g].fn), 0),
                    v[g].once && h.off(i, v[g].fn, v[g].id));
                return h._loadQueue(i),
                h
            },
            _loadQueue: function(i) {
                var a = this;
                if (a._queue.length > 0) {
                    var d = a._queue[0];
                    d.event === i && (a._queue.shift(),
                    a._loadQueue()),
                    i || d.action()
                }
                return a
            },
            _ended: function(i) {
                var a = this
                  , d = i._sprite;
                if (!a._webAudio && i._node && !i._node.paused && !i._node.ended && i._node.currentTime < i._stop)
                    return setTimeout(a._ended.bind(a, i), 100),
                    a;
                var h = !!(i._loop || a._sprite[d][2]);
                if (a._emit("end", i._id),
                !a._webAudio && h && a.stop(i._id, !0).play(i._id),
                a._webAudio && h) {
                    a._emit("play", i._id),
                    i._seek = i._start || 0,
                    i._rateSeek = 0,
                    i._playStart = t.ctx.currentTime;
                    var v = (i._stop - i._start) * 1e3 / Math.abs(i._rate);
                    a._endTimers[i._id] = setTimeout(a._ended.bind(a, i), v)
                }
                return a._webAudio && !h && (i._paused = !0,
                i._ended = !0,
                i._seek = i._start || 0,
                i._rateSeek = 0,
                a._clearTimer(i._id),
                a._cleanBuffer(i._node),
                t._autoSuspend()),
                !a._webAudio && !h && a.stop(i._id, !0),
                a
            },
            _clearTimer: function(i) {
                var a = this;
                if (a._endTimers[i]) {
                    if (typeof a._endTimers[i] != "function")
                        clearTimeout(a._endTimers[i]);
                    else {
                        var d = a._soundById(i);
                        d && d._node && d._node.removeEventListener("ended", a._endTimers[i], !1)
                    }
                    delete a._endTimers[i]
                }
                return a
            },
            _soundById: function(i) {
                for (var a = this, d = 0; d < a._sounds.length; d++)
                    if (i === a._sounds[d]._id)
                        return a._sounds[d];
                return null
            },
            _inactiveSound: function() {
                var i = this;
                i._drain();
                for (var a = 0; a < i._sounds.length; a++)
                    if (i._sounds[a]._ended)
                        return i._sounds[a].reset();
                return new o(i)
            },
            _drain: function() {
                var i = this
                  , a = i._pool
                  , d = 0
                  , h = 0;
                if (!(i._sounds.length < a)) {
                    for (h = 0; h < i._sounds.length; h++)
                        i._sounds[h]._ended && d++;
                    for (h = i._sounds.length - 1; h >= 0; h--) {
                        if (d <= a)
                            return;
                        i._sounds[h]._ended && (i._webAudio && i._sounds[h]._node && i._sounds[h]._node.disconnect(0),
                        i._sounds.splice(h, 1),
                        d--)
                    }
                }
            },
            _getSoundIds: function(i) {
                var a = this;
                if (typeof i > "u") {
                    for (var d = [], h = 0; h < a._sounds.length; h++)
                        d.push(a._sounds[h]._id);
                    return d
                } else
                    return [i]
            },
            _refreshBuffer: function(i) {
                var a = this;
                return i._node.bufferSource = t.ctx.createBufferSource(),
                i._node.bufferSource.buffer = s[a._src],
                i._panner ? i._node.bufferSource.connect(i._panner) : i._node.bufferSource.connect(i._node),
                i._node.bufferSource.loop = i._loop,
                i._loop && (i._node.bufferSource.loopStart = i._start || 0,
                i._node.bufferSource.loopEnd = i._stop || 0),
                i._node.bufferSource.playbackRate.setValueAtTime(i._rate, t.ctx.currentTime),
                a
            },
            _cleanBuffer: function(i) {
                var a = this
                  , d = t._navigator && t._navigator.vendor.indexOf("Apple") >= 0;
                if (!i.bufferSource)
                    return a;
                if (t._scratchBuffer && i.bufferSource && (i.bufferSource.onended = null,
                i.bufferSource.disconnect(0),
                d))
                    try {
                        i.bufferSource.buffer = t._scratchBuffer
                    } catch (h) {}
                return i.bufferSource = null,
                a
            },
            _clearSound: function(i) {
                var a = /MSIE |Trident\//.test(t._navigator && t._navigator.userAgent);
                a || (i.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
            }
        };
        var o = function(i) {
            this._parent = i,
            this.init()
        };
        o.prototype = {
            init: function() {
                var i = this
                  , a = i._parent;
                return i._muted = a._muted,
                i._loop = a._loop,
                i._volume = a._volume,
                i._rate = a._rate,
                i._seek = 0,
                i._paused = !0,
                i._ended = !0,
                i._sprite = "__default",
                i._id = ++t._counter,
                a._sounds.push(i),
                i.create(),
                i
            },
            create: function() {
                var i = this
                  , a = i._parent
                  , d = t._muted || i._muted || i._parent._muted ? 0 : i._volume;
                return a._webAudio ? (i._node = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(),
                i._node.gain.setValueAtTime(d, t.ctx.currentTime),
                i._node.paused = !0,
                i._node.connect(t.masterGain)) : t.noAudio || (i._node = t._obtainHtml5Audio(),
                i._errorFn = i._errorListener.bind(i),
                i._node.addEventListener("error", i._errorFn, !1),
                i._loadFn = i._loadListener.bind(i),
                i._node.addEventListener(t._canPlayEvent, i._loadFn, !1),
                i._endFn = i._endListener.bind(i),
                i._node.addEventListener("ended", i._endFn, !1),
                i._node.src = a._src,
                i._node.preload = a._preload === !0 ? "auto" : a._preload,
                i._node.volume = d * t.volume(),
                i._node.load()),
                i
            },
            reset: function() {
                var i = this
                  , a = i._parent;
                return i._muted = a._muted,
                i._loop = a._loop,
                i._volume = a._volume,
                i._rate = a._rate,
                i._seek = 0,
                i._rateSeek = 0,
                i._paused = !0,
                i._ended = !0,
                i._sprite = "__default",
                i._id = ++t._counter,
                i
            },
            _errorListener: function() {
                var i = this;
                i._parent._emit("loaderror", i._id, i._node.error ? i._node.error.code : 0),
                i._node.removeEventListener("error", i._errorFn, !1)
            },
            _loadListener: function() {
                var i = this
                  , a = i._parent;
                a._duration = Math.ceil(i._node.duration * 10) / 10,
                Object.keys(a._sprite).length === 0 && (a._sprite = {
                    __default: [0, a._duration * 1e3]
                }),
                a._state !== "loaded" && (a._state = "loaded",
                a._emit("load"),
                a._loadQueue()),
                i._node.removeEventListener(t._canPlayEvent, i._loadFn, !1)
            },
            _endListener: function() {
                var i = this
                  , a = i._parent;
                a._duration === 1 / 0 && (a._duration = Math.ceil(i._node.duration * 10) / 10,
                a._sprite.__default[1] === 1 / 0 && (a._sprite.__default[1] = a._duration * 1e3),
                a._ended(i)),
                i._node.removeEventListener("ended", i._endFn, !1)
            }
        };
        var s = {}
          , l = function(i) {
            var a = i._src;
            if (s[a]) {
                i._duration = s[a].duration,
                f(i);
                return
            }
            if (/^data:[^;]+;base64,/.test(a)) {
                for (var d = atob(a.split(",")[1]), h = new Uint8Array(d.length), v = 0; v < d.length; ++v)
                    h[v] = d.charCodeAt(v);
                c(h.buffer, i)
            } else {
                var g = new XMLHttpRequest;
                g.open(i._xhr.method, a, !0),
                g.withCredentials = i._xhr.withCredentials,
                g.responseType = "arraybuffer",
                i._xhr.headers && Object.keys(i._xhr.headers).forEach(function(m) {
                    g.setRequestHeader(m, i._xhr.headers[m])
                }),
                g.onload = function() {
                    var m = (g.status + "")[0];
                    if (m !== "0" && m !== "2" && m !== "3") {
                        i._emit("loaderror", null, "Failed loading audio file with status: " + g.status + ".");
                        return
                    }
                    c(g.response, i)
                }
                ,
                g.onerror = function() {
                    i._webAudio && (i._html5 = !0,
                    i._webAudio = !1,
                    i._sounds = [],
                    delete s[a],
                    i.load())
                }
                ,
                u(g)
            }
        }
          , u = function(i) {
            try {
                i.send()
            } catch (a) {
                i.onerror()
            }
        }
          , c = function(i, a) {
            var d = function() {
                a._emit("loaderror", null, "Decoding audio data failed.")
            }
              , h = function(v) {
                v && a._sounds.length > 0 ? (s[a._src] = v,
                f(a, v)) : d()
            };
            typeof Promise < "u" && t.ctx.decodeAudioData.length === 1 ? t.ctx.decodeAudioData(i).then(h).catch(d) : t.ctx.decodeAudioData(i, h, d)
        }
          , f = function(i, a) {
            a && !i._duration && (i._duration = a.duration),
            Object.keys(i._sprite).length === 0 && (i._sprite = {
                __default: [0, i._duration * 1e3]
            }),
            i._state !== "loaded" && (i._state = "loaded",
            i._emit("load"),
            i._loadQueue())
        }
          , p = function() {
            if (t.usingWebAudio) {
                try {
                    typeof AudioContext < "u" ? t.ctx = new AudioContext : typeof webkitAudioContext < "u" ? t.ctx = new webkitAudioContext : t.usingWebAudio = !1
                } catch (v) {
                    t.usingWebAudio = !1
                }
                t.ctx || (t.usingWebAudio = !1);
                var i = /iP(hone|od|ad)/.test(t._navigator && t._navigator.platform)
                  , a = t._navigator && t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
                  , d = a ? parseInt(a[1], 10) : null;
                if (i && d && d < 9) {
                    var h = /safari/.test(t._navigator && t._navigator.userAgent.toLowerCase());
                    t._navigator && !h && (t.usingWebAudio = !1)
                }
                t.usingWebAudio && (t.masterGain = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(),
                t.masterGain.gain.setValueAtTime(t._muted ? 0 : t._volume, t.ctx.currentTime),
                t.masterGain.connect(t.ctx.destination)),
                t._setup()
            }
        };
        e.Howler = t,
        e.Howl = r,
        typeof He < "u" ? (He.HowlerGlobal = n,
        He.Howler = t,
        He.Howl = r,
        He.Sound = o) : typeof window < "u" && (window.HowlerGlobal = n,
        window.Howler = t,
        window.Howl = r,
        window.Sound = o)
    }
    )();
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
        HowlerGlobal.prototype._pos = [0, 0, 0],
        HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0],
        HowlerGlobal.prototype.stereo = function(t) {
            var r = this;
            if (!r.ctx || !r.ctx.listener)
                return r;
            for (var o = r._howls.length - 1; o >= 0; o--)
                r._howls[o].stereo(t);
            return r
        }
        ,
        HowlerGlobal.prototype.pos = function(t, r, o) {
            var s = this;
            if (!s.ctx || !s.ctx.listener)
                return s;
            if (r = typeof r != "number" ? s._pos[1] : r,
            o = typeof o != "number" ? s._pos[2] : o,
            typeof t == "number")
                s._pos = [t, r, o],
                typeof s.ctx.listener.positionX < "u" ? (s.ctx.listener.positionX.setTargetAtTime(s._pos[0], Howler.ctx.currentTime, .1),
                s.ctx.listener.positionY.setTargetAtTime(s._pos[1], Howler.ctx.currentTime, .1),
                s.ctx.listener.positionZ.setTargetAtTime(s._pos[2], Howler.ctx.currentTime, .1)) : s.ctx.listener.setPosition(s._pos[0], s._pos[1], s._pos[2]);
            else
                return s._pos;
            return s
        }
        ,
        HowlerGlobal.prototype.orientation = function(t, r, o, s, l, u) {
            var c = this;
            if (!c.ctx || !c.ctx.listener)
                return c;
            var f = c._orientation;
            if (r = typeof r != "number" ? f[1] : r,
            o = typeof o != "number" ? f[2] : o,
            s = typeof s != "number" ? f[3] : s,
            l = typeof l != "number" ? f[4] : l,
            u = typeof u != "number" ? f[5] : u,
            typeof t == "number")
                c._orientation = [t, r, o, s, l, u],
                typeof c.ctx.listener.forwardX < "u" ? (c.ctx.listener.forwardX.setTargetAtTime(t, Howler.ctx.currentTime, .1),
                c.ctx.listener.forwardY.setTargetAtTime(r, Howler.ctx.currentTime, .1),
                c.ctx.listener.forwardZ.setTargetAtTime(o, Howler.ctx.currentTime, .1),
                c.ctx.listener.upX.setTargetAtTime(s, Howler.ctx.currentTime, .1),
                c.ctx.listener.upY.setTargetAtTime(l, Howler.ctx.currentTime, .1),
                c.ctx.listener.upZ.setTargetAtTime(u, Howler.ctx.currentTime, .1)) : c.ctx.listener.setOrientation(t, r, o, s, l, u);
            else
                return f;
            return c
        }
        ,
        Howl.prototype.init = function(t) {
            return function(r) {
                var o = this;
                return o._orientation = r.orientation || [1, 0, 0],
                o._stereo = r.stereo || null,
                o._pos = r.pos || null,
                o._pannerAttr = {
                    coneInnerAngle: typeof r.coneInnerAngle < "u" ? r.coneInnerAngle : 360,
                    coneOuterAngle: typeof r.coneOuterAngle < "u" ? r.coneOuterAngle : 360,
                    coneOuterGain: typeof r.coneOuterGain < "u" ? r.coneOuterGain : 0,
                    distanceModel: typeof r.distanceModel < "u" ? r.distanceModel : "inverse",
                    maxDistance: typeof r.maxDistance < "u" ? r.maxDistance : 1e4,
                    panningModel: typeof r.panningModel < "u" ? r.panningModel : "HRTF",
                    refDistance: typeof r.refDistance < "u" ? r.refDistance : 1,
                    rolloffFactor: typeof r.rolloffFactor < "u" ? r.rolloffFactor : 1
                },
                o._onstereo = r.onstereo ? [{
                    fn: r.onstereo
                }] : [],
                o._onpos = r.onpos ? [{
                    fn: r.onpos
                }] : [],
                o._onorientation = r.onorientation ? [{
                    fn: r.onorientation
                }] : [],
                t.call(this, r)
            }
        }(Howl.prototype.init),
        Howl.prototype.stereo = function(t, r) {
            var o = this;
            if (!o._webAudio)
                return o;
            if (o._state !== "loaded")
                return o._queue.push({
                    event: "stereo",
                    action: function() {
                        o.stereo(t, r)
                    }
                }),
                o;
            var s = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
            if (typeof r > "u")
                if (typeof t == "number")
                    o._stereo = t,
                    o._pos = [t, 0, 0];
                else
                    return o._stereo;
            for (var l = o._getSoundIds(r), u = 0; u < l.length; u++) {
                var c = o._soundById(l[u]);
                if (c)
                    if (typeof t == "number")
                        c._stereo = t,
                        c._pos = [t, 0, 0],
                        c._node && (c._pannerAttr.panningModel = "equalpower",
                        (!c._panner || !c._panner.pan) && n(c, s),
                        s === "spatial" ? typeof c._panner.positionX < "u" ? (c._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime),
                        c._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime),
                        c._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : c._panner.setPosition(t, 0, 0) : c._panner.pan.setValueAtTime(t, Howler.ctx.currentTime)),
                        o._emit("stereo", c._id);
                    else
                        return c._stereo
            }
            return o
        }
        ,
        Howl.prototype.pos = function(t, r, o, s) {
            var l = this;
            if (!l._webAudio)
                return l;
            if (l._state !== "loaded")
                return l._queue.push({
                    event: "pos",
                    action: function() {
                        l.pos(t, r, o, s)
                    }
                }),
                l;
            if (r = typeof r != "number" ? 0 : r,
            o = typeof o != "number" ? -.5 : o,
            typeof s > "u")
                if (typeof t == "number")
                    l._pos = [t, r, o];
                else
                    return l._pos;
            for (var u = l._getSoundIds(s), c = 0; c < u.length; c++) {
                var f = l._soundById(u[c]);
                if (f)
                    if (typeof t == "number")
                        f._pos = [t, r, o],
                        f._node && ((!f._panner || f._panner.pan) && n(f, "spatial"),
                        typeof f._panner.positionX < "u" ? (f._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime),
                        f._panner.positionY.setValueAtTime(r, Howler.ctx.currentTime),
                        f._panner.positionZ.setValueAtTime(o, Howler.ctx.currentTime)) : f._panner.setPosition(t, r, o)),
                        l._emit("pos", f._id);
                    else
                        return f._pos
            }
            return l
        }
        ,
        Howl.prototype.orientation = function(t, r, o, s) {
            var l = this;
            if (!l._webAudio)
                return l;
            if (l._state !== "loaded")
                return l._queue.push({
                    event: "orientation",
                    action: function() {
                        l.orientation(t, r, o, s)
                    }
                }),
                l;
            if (r = typeof r != "number" ? l._orientation[1] : r,
            o = typeof o != "number" ? l._orientation[2] : o,
            typeof s > "u")
                if (typeof t == "number")
                    l._orientation = [t, r, o];
                else
                    return l._orientation;
            for (var u = l._getSoundIds(s), c = 0; c < u.length; c++) {
                var f = l._soundById(u[c]);
                if (f)
                    if (typeof t == "number")
                        f._orientation = [t, r, o],
                        f._node && (f._panner || (f._pos || (f._pos = l._pos || [0, 0, -.5]),
                        n(f, "spatial")),
                        typeof f._panner.orientationX < "u" ? (f._panner.orientationX.setValueAtTime(t, Howler.ctx.currentTime),
                        f._panner.orientationY.setValueAtTime(r, Howler.ctx.currentTime),
                        f._panner.orientationZ.setValueAtTime(o, Howler.ctx.currentTime)) : f._panner.setOrientation(t, r, o)),
                        l._emit("orientation", f._id);
                    else
                        return f._orientation
            }
            return l
        }
        ,
        Howl.prototype.pannerAttr = function() {
            var t = this, r = arguments, o, s, l;
            if (!t._webAudio)
                return t;
            if (r.length === 0)
                return t._pannerAttr;
            if (r.length === 1)
                if (typeof r[0] == "object")
                    o = r[0],
                    typeof s > "u" && (o.pannerAttr || (o.pannerAttr = {
                        coneInnerAngle: o.coneInnerAngle,
                        coneOuterAngle: o.coneOuterAngle,
                        coneOuterGain: o.coneOuterGain,
                        distanceModel: o.distanceModel,
                        maxDistance: o.maxDistance,
                        refDistance: o.refDistance,
                        rolloffFactor: o.rolloffFactor,
                        panningModel: o.panningModel
                    }),
                    t._pannerAttr = {
                        coneInnerAngle: typeof o.pannerAttr.coneInnerAngle < "u" ? o.pannerAttr.coneInnerAngle : t._coneInnerAngle,
                        coneOuterAngle: typeof o.pannerAttr.coneOuterAngle < "u" ? o.pannerAttr.coneOuterAngle : t._coneOuterAngle,
                        coneOuterGain: typeof o.pannerAttr.coneOuterGain < "u" ? o.pannerAttr.coneOuterGain : t._coneOuterGain,
                        distanceModel: typeof o.pannerAttr.distanceModel < "u" ? o.pannerAttr.distanceModel : t._distanceModel,
                        maxDistance: typeof o.pannerAttr.maxDistance < "u" ? o.pannerAttr.maxDistance : t._maxDistance,
                        refDistance: typeof o.pannerAttr.refDistance < "u" ? o.pannerAttr.refDistance : t._refDistance,
                        rolloffFactor: typeof o.pannerAttr.rolloffFactor < "u" ? o.pannerAttr.rolloffFactor : t._rolloffFactor,
                        panningModel: typeof o.pannerAttr.panningModel < "u" ? o.pannerAttr.panningModel : t._panningModel
                    });
                else
                    return l = t._soundById(parseInt(r[0], 10)),
                    l ? l._pannerAttr : t._pannerAttr;
            else
                r.length === 2 && (o = r[0],
                s = parseInt(r[1], 10));
            for (var u = t._getSoundIds(s), c = 0; c < u.length; c++)
                if (l = t._soundById(u[c]),
                l) {
                    var f = l._pannerAttr;
                    f = {
                        coneInnerAngle: typeof o.coneInnerAngle < "u" ? o.coneInnerAngle : f.coneInnerAngle,
                        coneOuterAngle: typeof o.coneOuterAngle < "u" ? o.coneOuterAngle : f.coneOuterAngle,
                        coneOuterGain: typeof o.coneOuterGain < "u" ? o.coneOuterGain : f.coneOuterGain,
                        distanceModel: typeof o.distanceModel < "u" ? o.distanceModel : f.distanceModel,
                        maxDistance: typeof o.maxDistance < "u" ? o.maxDistance : f.maxDistance,
                        refDistance: typeof o.refDistance < "u" ? o.refDistance : f.refDistance,
                        rolloffFactor: typeof o.rolloffFactor < "u" ? o.rolloffFactor : f.rolloffFactor,
                        panningModel: typeof o.panningModel < "u" ? o.panningModel : f.panningModel
                    };
                    var p = l._panner;
                    p || (l._pos || (l._pos = t._pos || [0, 0, -.5]),
                    n(l, "spatial"),
                    p = l._panner),
                    p.coneInnerAngle = f.coneInnerAngle,
                    p.coneOuterAngle = f.coneOuterAngle,
                    p.coneOuterGain = f.coneOuterGain,
                    p.distanceModel = f.distanceModel,
                    p.maxDistance = f.maxDistance,
                    p.refDistance = f.refDistance,
                    p.rolloffFactor = f.rolloffFactor,
                    p.panningModel = f.panningModel
                }
            return t
        }
        ,
        Sound.prototype.init = function(t) {
            return function() {
                var r = this
                  , o = r._parent;
                r._orientation = o._orientation,
                r._stereo = o._stereo,
                r._pos = o._pos,
                r._pannerAttr = o._pannerAttr,
                t.call(this),
                r._stereo ? o.stereo(r._stereo) : r._pos && o.pos(r._pos[0], r._pos[1], r._pos[2], r._id)
            }
        }(Sound.prototype.init),
        Sound.prototype.reset = function(t) {
            return function() {
                var r = this
                  , o = r._parent;
                return r._orientation = o._orientation,
                r._stereo = o._stereo,
                r._pos = o._pos,
                r._pannerAttr = o._pannerAttr,
                r._stereo ? o.stereo(r._stereo) : r._pos ? o.pos(r._pos[0], r._pos[1], r._pos[2], r._id) : r._panner && (r._panner.disconnect(0),
                r._panner = void 0,
                o._refreshBuffer(r)),
                t.call(this)
            }
        }(Sound.prototype.reset);
        var n = function(t, r) {
            r = r || "spatial",
            r === "spatial" ? (t._panner = Howler.ctx.createPanner(),
            t._panner.coneInnerAngle = t._pannerAttr.coneInnerAngle,
            t._panner.coneOuterAngle = t._pannerAttr.coneOuterAngle,
            t._panner.coneOuterGain = t._pannerAttr.coneOuterGain,
            t._panner.distanceModel = t._pannerAttr.distanceModel,
            t._panner.maxDistance = t._pannerAttr.maxDistance,
            t._panner.refDistance = t._pannerAttr.refDistance,
            t._panner.rolloffFactor = t._pannerAttr.rolloffFactor,
            t._panner.panningModel = t._pannerAttr.panningModel,
            typeof t._panner.positionX < "u" ? (t._panner.positionX.setValueAtTime(t._pos[0], Howler.ctx.currentTime),
            t._panner.positionY.setValueAtTime(t._pos[1], Howler.ctx.currentTime),
            t._panner.positionZ.setValueAtTime(t._pos[2], Howler.ctx.currentTime)) : t._panner.setPosition(t._pos[0], t._pos[1], t._pos[2]),
            typeof t._panner.orientationX < "u" ? (t._panner.orientationX.setValueAtTime(t._orientation[0], Howler.ctx.currentTime),
            t._panner.orientationY.setValueAtTime(t._orientation[1], Howler.ctx.currentTime),
            t._panner.orientationZ.setValueAtTime(t._orientation[2], Howler.ctx.currentTime)) : t._panner.setOrientation(t._orientation[0], t._orientation[1], t._orientation[2])) : (t._panner = Howler.ctx.createStereoPanner(),
            t._panner.pan.setValueAtTime(t._stereo, Howler.ctx.currentTime)),
            t._panner.connect(t._node),
            t._paused || t._parent.pause(t._id, !0).play(t._id, !0)
        }
    }
    )()
}
)(ln);
const ss = ()=>{}
  , as = e=>e instanceof Function ? e() : e
  , Yr = async e=>new Promise(n=>setTimeout(n, e))
  , bl = e=>new URLSearchParams(window.location.search).get(e)
  , Ji = bl("muted")
  , Al = !Ji || Ji === "1"
  , xl = {
    muted: Al
}
  , [oi,ls] = Gt(xl);
vn(()=>{
    document.addEventListener("visibilitychange", ()=>{
        const e = oi.muted;
        document.hidden ? ln.Howler.mute(!0) : e || ln.Howler.mute(!1)
    }
    )
}
);
_e(()=>{
    const e = oi.muted;
    ln.Howler.mute(e)
}
);
const Sl = ()=>{
    ls("muted", e=>!e)
}
  , Tl = e=>{
    ls("muted", e)
}
  , Rt = {
    options: oi,
    toggleMute: Sl,
    setMute: Tl
}
  , bt = (e,n={})=>{
    const [t,r] = W(null)
      , [o,s] = W(!1);
    _e(()=>{
        const i = ae(t);
        i == null || i.unload(),
        r(null);
        const a = as(e);
        !a || Array.isArray(a) && a.length === 0 || new ln.Howl({
            src: a,
            html5: n.html5,
            autoplay: n.autoplay,
            loop: n.loop,
            sprite: n.sprite,
            onload: function() {
                r(this)
            },
            onplayerror: function(d, h) {
                typeof h == "string" && h.includes("Playback was unable to start") && s(!0)
            }
        })
    }
    ),
    be(()=>{
        var i;
        (i = t()) == null || i.unload()
    }
    );
    const l = (i,a={})=>{
        const d = t();
        if (d)
            return a.interrupt && d.stop(),
            d.play(i)
    }
      , u = i=>{
        var a;
        return (a = t()) == null ? void 0 : a.stop(i)
    }
      , c = i=>{
        var a;
        return (a = t()) == null ? void 0 : a.pause(i)
    }
      , f = ()=>{
        const i = t();
        i && (i.playing() ? i.pause() : i.play())
    }
      , p = i=>{
        var a;
        return (a = t()) == null ? void 0 : a.volume(i)
    }
    ;
    return _e(()=>{
        var d;
        const i = Rt.options.muted
          , a = ae(o);
        !i && a && ((d = t()) == null || d.play(),
        s(!1))
    }
    ),
    {
        internalInstance: t,
        play: l,
        stop: u,
        pause: c,
        toggle: f,
        setVolume: p
    }
}
  , kl = [{
    src: {
        mp3: "ambient-tracks/ambient-track/ambient-1.mp3",
        webm: "ambient-tracks/ambient-track/ambient-1.webm"
    },
    postDate: "2023-11-02"
}]
  , $l = "modulepreload"
  , Il = function(e) {
    return "/" + e
}
  , Xi = {}
  , Ol = function(n, t, r) {
    if (!t || t.length === 0)
        return n();
    const o = document.getElementsByTagName("link");
    return Promise.all(t.map(s=>{
        if (s = Il(s),
        s in Xi)
            return;
        Xi[s] = !0;
        const l = s.endsWith(".css")
          , u = l ? '[rel="stylesheet"]' : "";
        if (!!r)
            for (let p = o.length - 1; p >= 0; p--) {
                const i = o[p];
                if (i.href === s && (!l || i.rel === "stylesheet"))
                    return
            }
        else if (document.querySelector('link[href="'.concat(s, '"]').concat(u)))
            return;
        const f = document.createElement("link");
        if (f.rel = l ? "stylesheet" : $l,
        l || (f.as = "script",
        f.crossOrigin = ""),
        f.href = s,
        document.head.appendChild(f),
        l)
            return new Promise((p,i)=>{
                f.addEventListener("load", p),
                f.addEventListener("error", ()=>i(new Error("Unable to preload CSS for ".concat(s))))
            }
            )
    }
    )).then(()=>n()).catch(s=>{
        const l = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (l.payload = s,
        window.dispatchEvent(l),
        !l.defaultPrevented)
            throw s
    }
    )
}
  , cs = "Asia/Tokyo";
var us = {
    exports: {}
};
(function(e, n) {
    (function(t, r) {
        e.exports = r()
    }
    )(He, function() {
        var t = 1e3
          , r = 6e4
          , o = 36e5
          , s = "millisecond"
          , l = "second"
          , u = "minute"
          , c = "hour"
          , f = "day"
          , p = "week"
          , i = "month"
          , a = "quarter"
          , d = "year"
          , h = "date"
          , v = "Invalid Date"
          , g = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
          , m = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
          , y = {
            name: "en",
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            ordinal: function(C) {
                var I = ["th", "st", "nd", "rd"]
                  , b = C % 100;
                return "[" + C + (I[(b - 20) % 10] || I[b] || I[0]) + "]"
            }
        }
          , A = function(C, I, b) {
            var S = String(C);
            return !S || S.length >= I ? C : "" + Array(I + 1 - S.length).join(b) + C
        }
          , w = {
            s: A,
            z: function(C) {
                var I = -C.utcOffset()
                  , b = Math.abs(I)
                  , S = Math.floor(b / 60)
                  , T = b % 60;
                return (I <= 0 ? "+" : "-") + A(S, 2, "0") + ":" + A(T, 2, "0")
            },
            m: function C(I, b) {
                if (I.date() < b.date())
                    return -C(b, I);
                var S = 12 * (b.year() - I.year()) + (b.month() - I.month())
                  , T = I.clone().add(S, i)
                  , O = b - T < 0
                  , D = I.clone().add(S + (O ? -1 : 1), i);
                return +(-(S + (b - T) / (O ? T - D : D - T)) || 0)
            },
            a: function(C) {
                return C < 0 ? Math.ceil(C) || 0 : Math.floor(C)
            },
            p: function(C) {
                return {
                    M: i,
                    y: d,
                    w: p,
                    d: f,
                    D: h,
                    h: c,
                    m: u,
                    s: l,
                    ms: s,
                    Q: a
                }[C] || String(C || "").toLowerCase().replace(/s$/, "")
            },
            u: function(C) {
                return C === void 0
            }
        }
          , $ = "en"
          , z = {};
        z[$] = y;
        var F = "$isDayjsObject"
          , L = function(C) {
            return C instanceof Q || !(!C || !C[F])
        }
          , M = function C(I, b, S) {
            var T;
            if (!I)
                return $;
            if (typeof I == "string") {
                var O = I.toLowerCase();
                z[O] && (T = O),
                b && (z[O] = b,
                T = O);
                var D = I.split("-");
                if (!T && D.length > 1)
                    return C(D[0])
            } else {
                var j = I.name;
                z[j] = I,
                T = j
            }
            return !S && T && ($ = T),
            T || !S && $
        }
          , V = function(C, I) {
            if (L(C))
                return C.clone();
            var b = typeof I == "object" ? I : {};
            return b.date = C,
            b.args = arguments,
            new Q(b)
        }
          , R = w;
        R.l = M,
        R.i = L,
        R.w = function(C, I) {
            return V(C, {
                locale: I.$L,
                utc: I.$u,
                x: I.$x,
                $offset: I.$offset
            })
        }
        ;
        var Q = function() {
            function C(b) {
                this.$L = M(b.locale, null, !0),
                this.parse(b),
                this.$x = this.$x || b.x || {},
                this[F] = !0
            }
            var I = C.prototype;
            return I.parse = function(b) {
                this.$d = function(S) {
                    var T = S.date
                      , O = S.utc;
                    if (T === null)
                        return new Date(NaN);
                    if (R.u(T))
                        return new Date;
                    if (T instanceof Date)
                        return new Date(T);
                    if (typeof T == "string" && !/Z$/i.test(T)) {
                        var D = T.match(g);
                        if (D) {
                            var j = D[2] - 1 || 0
                              , Y = (D[7] || "0").substring(0, 3);
                            return O ? new Date(Date.UTC(D[1], j, D[3] || 1, D[4] || 0, D[5] || 0, D[6] || 0, Y)) : new Date(D[1],j,D[3] || 1,D[4] || 0,D[5] || 0,D[6] || 0,Y)
                        }
                    }
                    return new Date(T)
                }(b),
                this.init()
            }
            ,
            I.init = function() {
                var b = this.$d;
                this.$y = b.getFullYear(),
                this.$M = b.getMonth(),
                this.$D = b.getDate(),
                this.$W = b.getDay(),
                this.$H = b.getHours(),
                this.$m = b.getMinutes(),
                this.$s = b.getSeconds(),
                this.$ms = b.getMilliseconds()
            }
            ,
            I.$utils = function() {
                return R
            }
            ,
            I.isValid = function() {
                return this.$d.toString() !== v
            }
            ,
            I.isSame = function(b, S) {
                var T = V(b);
                return this.startOf(S) <= T && T <= this.endOf(S)
            }
            ,
            I.isAfter = function(b, S) {
                return V(b) < this.startOf(S)
            }
            ,
            I.isBefore = function(b, S) {
                return this.endOf(S) < V(b)
            }
            ,
            I.$g = function(b, S, T) {
                return R.u(b) ? this[S] : this.set(T, b)
            }
            ,
            I.unix = function() {
                return Math.floor(this.valueOf() / 1e3)
            }
            ,
            I.valueOf = function() {
                return this.$d.getTime()
            }
            ,
            I.startOf = function(b, S) {
                var T = this
                  , O = !!R.u(S) || S
                  , D = R.p(b)
                  , j = function(U, N) {
                    var Z = R.w(T.$u ? Date.UTC(T.$y, N, U) : new Date(T.$y,N,U), T);
                    return O ? Z : Z.endOf(f)
                }
                  , Y = function(U, N) {
                    return R.w(T.toDate()[U].apply(T.toDate("s"), (O ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(N)), T)
                }
                  , K = this.$W
                  , J = this.$M
                  , te = this.$D
                  , ue = "set" + (this.$u ? "UTC" : "");
                switch (D) {
                case d:
                    return O ? j(1, 0) : j(31, 11);
                case i:
                    return O ? j(1, J) : j(0, J + 1);
                case p:
                    var P = this.$locale().weekStart || 0
                      , G = (K < P ? K + 7 : K) - P;
                    return j(O ? te - G : te + (6 - G), J);
                case f:
                case h:
                    return Y(ue + "Hours", 0);
                case c:
                    return Y(ue + "Minutes", 1);
                case u:
                    return Y(ue + "Seconds", 2);
                case l:
                    return Y(ue + "Milliseconds", 3);
                default:
                    return this.clone()
                }
            }
            ,
            I.endOf = function(b) {
                return this.startOf(b, !1)
            }
            ,
            I.$set = function(b, S) {
                var T, O = R.p(b), D = "set" + (this.$u ? "UTC" : ""), j = (T = {},
                T[f] = D + "Date",
                T[h] = D + "Date",
                T[i] = D + "Month",
                T[d] = D + "FullYear",
                T[c] = D + "Hours",
                T[u] = D + "Minutes",
                T[l] = D + "Seconds",
                T[s] = D + "Milliseconds",
                T)[O], Y = O === f ? this.$D + (S - this.$W) : S;
                if (O === i || O === d) {
                    var K = this.clone().set(h, 1);
                    K.$d[j](Y),
                    K.init(),
                    this.$d = K.set(h, Math.min(this.$D, K.daysInMonth())).$d
                } else
                    j && this.$d[j](Y);
                return this.init(),
                this
            }
            ,
            I.set = function(b, S) {
                return this.clone().$set(b, S)
            }
            ,
            I.get = function(b) {
                return this[R.p(b)]()
            }
            ,
            I.add = function(b, S) {
                var T, O = this;
                b = Number(b);
                var D = R.p(S)
                  , j = function(J) {
                    var te = V(O);
                    return R.w(te.date(te.date() + Math.round(J * b)), O)
                };
                if (D === i)
                    return this.set(i, this.$M + b);
                if (D === d)
                    return this.set(d, this.$y + b);
                if (D === f)
                    return j(1);
                if (D === p)
                    return j(7);
                var Y = (T = {},
                T[u] = r,
                T[c] = o,
                T[l] = t,
                T)[D] || 1
                  , K = this.$d.getTime() + b * Y;
                return R.w(K, this)
            }
            ,
            I.subtract = function(b, S) {
                return this.add(-1 * b, S)
            }
            ,
            I.format = function(b) {
                var S = this
                  , T = this.$locale();
                if (!this.isValid())
                    return T.invalidDate || v;
                var O = b || "YYYY-MM-DDTHH:mm:ssZ"
                  , D = R.z(this)
                  , j = this.$H
                  , Y = this.$m
                  , K = this.$M
                  , J = T.weekdays
                  , te = T.months
                  , ue = T.meridiem
                  , P = function(N, Z, q, pe) {
                    return N && (N[Z] || N(S, O)) || q[Z].slice(0, pe)
                }
                  , G = function(N) {
                    return R.s(j % 12 || 12, N, "0")
                }
                  , U = ue || function(N, Z, q) {
                    var pe = N < 12 ? "AM" : "PM";
                    return q ? pe.toLowerCase() : pe
                }
                ;
                return O.replace(m, function(N, Z) {
                    return Z || function(q) {
                        switch (q) {
                        case "YY":
                            return String(S.$y).slice(-2);
                        case "YYYY":
                            return R.s(S.$y, 4, "0");
                        case "M":
                            return K + 1;
                        case "MM":
                            return R.s(K + 1, 2, "0");
                        case "MMM":
                            return P(T.monthsShort, K, te, 3);
                        case "MMMM":
                            return P(te, K);
                        case "D":
                            return S.$D;
                        case "DD":
                            return R.s(S.$D, 2, "0");
                        case "d":
                            return String(S.$W);
                        case "dd":
                            return P(T.weekdaysMin, S.$W, J, 2);
                        case "ddd":
                            return P(T.weekdaysShort, S.$W, J, 3);
                        case "dddd":
                            return J[S.$W];
                        case "H":
                            return String(j);
                        case "HH":
                            return R.s(j, 2, "0");
                        case "h":
                            return G(1);
                        case "hh":
                            return G(2);
                        case "a":
                            return U(j, Y, !0);
                        case "A":
                            return U(j, Y, !1);
                        case "m":
                            return String(Y);
                        case "mm":
                            return R.s(Y, 2, "0");
                        case "s":
                            return String(S.$s);
                        case "ss":
                            return R.s(S.$s, 2, "0");
                        case "SSS":
                            return R.s(S.$ms, 3, "0");
                        case "Z":
                            return D
                        }
                        return null
                    }(N) || D.replace(":", "")
                })
            }
            ,
            I.utcOffset = function() {
                return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
            }
            ,
            I.diff = function(b, S, T) {
                var O, D = this, j = R.p(S), Y = V(b), K = (Y.utcOffset() - this.utcOffset()) * r, J = this - Y, te = function() {
                    return R.m(D, Y)
                };
                switch (j) {
                case d:
                    O = te() / 12;
                    break;
                case i:
                    O = te();
                    break;
                case a:
                    O = te() / 3;
                    break;
                case p:
                    O = (J - K) / 6048e5;
                    break;
                case f:
                    O = (J - K) / 864e5;
                    break;
                case c:
                    O = J / o;
                    break;
                case u:
                    O = J / r;
                    break;
                case l:
                    O = J / t;
                    break;
                default:
                    O = J
                }
                return T ? O : R.a(O)
            }
            ,
            I.daysInMonth = function() {
                return this.endOf(i).$D
            }
            ,
            I.$locale = function() {
                return z[this.$L]
            }
            ,
            I.locale = function(b, S) {
                if (!b)
                    return this.$L;
                var T = this.clone()
                  , O = M(b, S, !0);
                return O && (T.$L = O),
                T
            }
            ,
            I.clone = function() {
                return R.w(this.$d, this)
            }
            ,
            I.toDate = function() {
                return new Date(this.valueOf())
            }
            ,
            I.toJSON = function() {
                return this.isValid() ? this.toISOString() : null
            }
            ,
            I.toISOString = function() {
                return this.$d.toISOString()
            }
            ,
            I.toString = function() {
                return this.$d.toUTCString()
            }
            ,
            C
        }()
          , ce = Q.prototype;
        return V.prototype = ce,
        [["$ms", s], ["$s", l], ["$m", u], ["$H", c], ["$W", f], ["$M", i], ["$y", d], ["$D", h]].forEach(function(C) {
            ce[C[1]] = function(I) {
                return this.$g(I, C[0], C[1])
            }
        }),
        V.extend = function(C, I) {
            return C.$i || (C(I, Q, V),
            C.$i = !0),
            V
        }
        ,
        V.locale = M,
        V.isDayjs = L,
        V.unix = function(C) {
            return V(1e3 * C)
        }
        ,
        V.en = z[$],
        V.Ls = z,
        V.p = {},
        V
    })
}
)(us);
var Pl = us.exports;
const Ye = mn(Pl);
var fs = {
    exports: {}
};
(function(e, n) {
    (function(t, r) {
        e.exports = r()
    }
    )(He, function() {
        return function(t, r) {
            r.prototype.isSameOrBefore = function(o, s) {
                return this.isSame(o, s) || this.isBefore(o, s)
            }
        }
    })
}
)(fs);
var El = fs.exports;
const Cl = mn(El);
var ds = {
    exports: {}
};
(function(e, n) {
    (function(t, r) {
        e.exports = r()
    }
    )(He, function() {
        var t = "minute"
          , r = /[+-]\d\d(?::?\d\d)?/g
          , o = /([+-]|\d\d)/g;
        return function(s, l, u) {
            var c = l.prototype;
            u.utc = function(v) {
                var g = {
                    date: v,
                    utc: !0,
                    args: arguments
                };
                return new l(g)
            }
            ,
            c.utc = function(v) {
                var g = u(this.toDate(), {
                    locale: this.$L,
                    utc: !0
                });
                return v ? g.add(this.utcOffset(), t) : g
            }
            ,
            c.local = function() {
                return u(this.toDate(), {
                    locale: this.$L,
                    utc: !1
                })
            }
            ;
            var f = c.parse;
            c.parse = function(v) {
                v.utc && (this.$u = !0),
                this.$utils().u(v.$offset) || (this.$offset = v.$offset),
                f.call(this, v)
            }
            ;
            var p = c.init;
            c.init = function() {
                if (this.$u) {
                    var v = this.$d;
                    this.$y = v.getUTCFullYear(),
                    this.$M = v.getUTCMonth(),
                    this.$D = v.getUTCDate(),
                    this.$W = v.getUTCDay(),
                    this.$H = v.getUTCHours(),
                    this.$m = v.getUTCMinutes(),
                    this.$s = v.getUTCSeconds(),
                    this.$ms = v.getUTCMilliseconds()
                } else
                    p.call(this)
            }
            ;
            var i = c.utcOffset;
            c.utcOffset = function(v, g) {
                var m = this.$utils().u;
                if (m(v))
                    return this.$u ? 0 : m(this.$offset) ? i.call(this) : this.$offset;
                if (typeof v == "string" && (v = function($) {
                    $ === void 0 && ($ = "");
                    var z = $.match(r);
                    if (!z)
                        return null;
                    var F = ("" + z[0]).match(o) || ["-", 0, 0]
                      , L = F[0]
                      , M = 60 * +F[1] + +F[2];
                    return M === 0 ? 0 : L === "+" ? M : -M
                }(v),
                v === null))
                    return this;
                var y = Math.abs(v) <= 16 ? 60 * v : v
                  , A = this;
                if (g)
                    return A.$offset = y,
                    A.$u = v === 0,
                    A;
                if (v !== 0) {
                    var w = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
                    (A = this.local().add(y + w, t)).$offset = y,
                    A.$x.$localOffset = w
                } else
                    A = this.utc();
                return A
            }
            ;
            var a = c.format;
            c.format = function(v) {
                var g = v || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
                return a.call(this, g)
            }
            ,
            c.valueOf = function() {
                var v = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
                return this.$d.valueOf() - 6e4 * v
            }
            ,
            c.isUTC = function() {
                return !!this.$u
            }
            ,
            c.toISOString = function() {
                return this.toDate().toISOString()
            }
            ,
            c.toString = function() {
                return this.toDate().toUTCString()
            }
            ;
            var d = c.toDate;
            c.toDate = function(v) {
                return v === "s" && this.$offset ? u(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : d.call(this)
            }
            ;
            var h = c.diff;
            c.diff = function(v, g, m) {
                if (v && this.$u === v.$u)
                    return h.call(this, v, g, m);
                var y = this.local()
                  , A = u(v).local();
                return h.call(y, A, g, m)
            }
        }
    })
}
)(ds);
var Dl = ds.exports;
const Ml = mn(Dl);
var ps = {
    exports: {}
};
(function(e, n) {
    (function(t, r) {
        e.exports = r()
    }
    )(He, function() {
        var t = {
            year: 0,
            month: 1,
            day: 2,
            hour: 3,
            minute: 4,
            second: 5
        }
          , r = {};
        return function(o, s, l) {
            var u, c = function(a, d, h) {
                h === void 0 && (h = {});
                var v = new Date(a)
                  , g = function(m, y) {
                    y === void 0 && (y = {});
                    var A = y.timeZoneName || "short"
                      , w = m + "|" + A
                      , $ = r[w];
                    return $ || ($ = new Intl.DateTimeFormat("en-US",{
                        hour12: !1,
                        timeZone: m,
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        timeZoneName: A
                    }),
                    r[w] = $),
                    $
                }(d, h);
                return g.formatToParts(v)
            }, f = function(a, d) {
                for (var h = c(a, d), v = [], g = 0; g < h.length; g += 1) {
                    var m = h[g]
                      , y = m.type
                      , A = m.value
                      , w = t[y];
                    w >= 0 && (v[w] = parseInt(A, 10))
                }
                var $ = v[3]
                  , z = $ === 24 ? 0 : $
                  , F = v[0] + "-" + v[1] + "-" + v[2] + " " + z + ":" + v[4] + ":" + v[5] + ":000"
                  , L = +a;
                return (l.utc(F).valueOf() - (L -= L % 1e3)) / 6e4
            }, p = s.prototype;
            p.tz = function(a, d) {
                a === void 0 && (a = u);
                var h = this.utcOffset()
                  , v = this.toDate()
                  , g = v.toLocaleString("en-US", {
                    timeZone: a
                })
                  , m = Math.round((v - new Date(g)) / 1e3 / 60)
                  , y = l(g, {
                    locale: this.$L
                }).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(v.getTimezoneOffset() / 15) - m, !0);
                if (d) {
                    var A = y.utcOffset();
                    y = y.add(h - A, "minute")
                }
                return y.$x.$timezone = a,
                y
            }
            ,
            p.offsetName = function(a) {
                var d = this.$x.$timezone || l.tz.guess()
                  , h = c(this.valueOf(), d, {
                    timeZoneName: a
                }).find(function(v) {
                    return v.type.toLowerCase() === "timezonename"
                });
                return h && h.value
            }
            ;
            var i = p.startOf;
            p.startOf = function(a, d) {
                if (!this.$x || !this.$x.$timezone)
                    return i.call(this, a, d);
                var h = l(this.format("YYYY-MM-DD HH:mm:ss:SSS"), {
                    locale: this.$L
                });
                return i.call(h, a, d).tz(this.$x.$timezone, !0)
            }
            ,
            l.tz = function(a, d, h) {
                var v = h && d
                  , g = h || d || u
                  , m = f(+l(), g);
                if (typeof a != "string")
                    return l(a).tz(g);
                var y = function(z, F, L) {
                    var M = z - 60 * F * 1e3
                      , V = f(M, L);
                    if (F === V)
                        return [M, F];
                    var R = f(M -= 60 * (V - F) * 1e3, L);
                    return V === R ? [M, V] : [z - 60 * Math.min(V, R) * 1e3, Math.max(V, R)]
                }(l.utc(a, v).valueOf(), m, g)
                  , A = y[0]
                  , w = y[1]
                  , $ = l(A).utcOffset(w);
                return $.$x.$timezone = g,
                $
            }
            ,
            l.tz.guess = function() {
                return Intl.DateTimeFormat().resolvedOptions().timeZone
            }
            ,
            l.tz.setDefault = function(a) {
                u = a
            }
        }
    })
}
)(ps);
var Bl = ps.exports;
const Ll = mn(Bl);
Ye.extend(Ml);
Ye.extend(Ll);
Ye.extend(Cl);
const Rl = e=>Ye(e)
  , vs = (e,n,t,r=0)=>Ye(e).set("hour", n).set("minute", t).set("second", r)
  , hs = e=>Ye().tz(e)
  , Nl = (e,n)=>Ye(e).format(n)
  , Vl = (e,n)=>Ye(e).isSameOrBefore(n)
  , ms = (e,n)=>Ye(e).isAfter(n)
  , zl = void 0;
Gt(zl);
const Zt = e=>()=>e
  , Hl = "/assets/ambient-1-0f115a64.mp3"
  , Ul = "/assets/ambient-1-bb1f2cb4.webm"
  , Fl = "/assets/logbook-1-0fb8b45d.jpg"
  , jl = "/assets/logbook-2-f34a92a7.jpg"
  , Gl = "/assets/bg-097884f4.png"
  , Zl = "/assets/transition-video-55388008.mp4"
  , St = e=>new URL(Object.assign({
    "../../../content/assets/ambient-tracks/ambient-track/ambient-1.mp3": Hl,
    "../../../content/assets/ambient-tracks/ambient-track/ambient-1.webm": Ul,
    "../../../content/assets/logs/log/logbook-1.jpg": Fl,
    "../../../content/assets/logs/log/logbook-2.jpg": jl,
    "../../../content/assets/scenes/scene/bg.png": Gl,
    "../../../content/assets/scenes/scene/transition-video.mp4": Zl
})["../../../content/assets/".concat(e)],self.location).href
  , Yl = kl
  , Wl = Zt(Yl)
  , eo = ()=>{
    const e = Wl()[0];
    return vt(me({}, e), {
        srcWebm: St(e.src.webm),
        srcMp3: St(e.src.mp3)
    })
}
  , ql = []
  , Kl = ql
  , Ql = Zt(Kl)
  , rn = ()=>{
    const e = Ql()[0];
    if (e)
        return vt(me({}, e), {
            srcWebm: St(e.src.webm),
            srcMp3: St(e.src.mp3)
        })
}
  , Jl = "/assets/background-music-83982c9a.webm"
  , Xl = "/assets/background-music-f98c94df.mp3";
function ec(e) {
    return e !== null && (typeof e == "object" || typeof e == "function")
}
function to(e, ...n) {
    return typeof e == "function" ? e(...n) : e
}
var tc = (e=>typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e,{
    get: (n,t)=>(typeof require < "u" ? require : n)[t]
}) : e)(function(e) {
    if (typeof require < "u")
        return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported')
}), nc = e=>(typeof e.clear == "function" || (e.clear = ()=>{
    let n;
    for (; n = e.key(0); )
        e.removeItem(n)
}
),
e), rc = e=>{
    if (!e)
        return "";
    let n = "";
    for (const t in e) {
        if (!e.hasOwnProperty(t))
            continue;
        const r = e[t];
        n += r instanceof Date ? "; ".concat(t, "=").concat(r.toUTCString()) : typeof r == "boolean" ? "; ".concat(t) : "; ".concat(t, "=").concat(r)
    }
    return n
}
, no;
try {
    no = tc("solid-start/server").useRequest
} catch (e) {
    no = ()=>(console.warn("It seems you attempt to use cookieStorage on the server without having solid-start installed"),
    {
        request: {
            headers: {
                get: ()=>""
            }
        }
    })
}
var ht = nc({
    _read: ()=>document.cookie,
    _write: (e,n,t)=>{
        document.cookie = "".concat(e, "=").concat(n).concat(rc(t))
    }
    ,
    getItem: (e,n)=>{
        var t, r;
        return (r = (t = ht._read(n).match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)")) == null ? void 0 : t.pop()) != null ? r : null
    }
    ,
    setItem: (e,n,t)=>{
        const r = ht.getItem(e);
        ht._write(e, n, t);
        const o = Object.assign(new Event("storage"), {
            key: e,
            oldValue: r,
            newValue: n,
            url: globalThis.document.URL,
            storageArea: ht
        });
        window.dispatchEvent(o)
    }
    ,
    removeItem: e=>{
        ht._write(e, "deleted", {
            expires: new Date(0)
        })
    }
    ,
    key: e=>{
        let n = null
          , t = 0;
        return ht._read().replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g, (r,o)=>(!n && o && t++ === e && (n = o),
        "")),
        n
    }
    ,
    get length() {
        let e = 0;
        return ht._read().replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g, n=>(e += n ? 1 : 0,
        "")),
        e
    }
});
function ic(e, n={}) {
    const t = n.storage || globalThis.localStorage;
    if (!t)
        return e;
    const r = n.name || "storage-".concat(Jo())
      , o = n.serialize || JSON.stringify.bind(JSON)
      , s = n.deserialize || JSON.parse.bind(JSON)
      , l = t.getItem(r, n.storageOptions)
      , u = typeof e[0] == "function" ? f=>e[1](()=>s(f)) : f=>e[1](gl(s(f)));
    let c = !0;
    return l instanceof Promise ? l.then(f=>c && f && u(f)) : l && u(l),
    [e[0], typeof e[0] == "function" ? f=>{
        const p = e[1](f);
        return f != null ? t.setItem(r, o(p), n.storageOptions) : t.removeItem(r),
        c = !1,
        p
    }
    : (...f)=>{
        e[1](...f),
        t.setItem(r, o(ae(()=>e[0])), n.storageOptions),
        c = !1
    }
    ]
}
const oc = []
  , sc = oc
  , ac = Zt(sc)
  , Ht = ()=>ac().map(n=>vt(me({}, n), {
    postDate: Rl(n.postDate).subtract(1, "day").format("YYYY-MM-DD")
}))
  , lc = {
    isInstructionsModalViewed: !1,
    isDataUsageWarningDialogAccepted: !1
}
  , [at,gn] = ic(Gt(lc), {
    name: "notifications-manager-data"
})
  , cc = ()=>at.isInstructionsModalViewed !== !0
  , uc = ()=>{
    gn("isInstructionsModalViewed", !0)
}
  , fc = ()=>at.isDataUsageWarningDialogAccepted === !0
  , dc = ()=>{
    gn("isDataUsageWarningDialogAccepted", !0)
}
  , pc = ()=>{
    const e = rn();
    return e ? at.lastPlayedAnsweringMachineTrackDate ? ms(e.postDate, at.lastPlayedAnsweringMachineTrackDate) : !0 : !1
}
  , vc = ()=>{
    const e = rn();
    e && gn("lastPlayedAnsweringMachineTrackDate", e.postDate)
}
  , hc = ()=>{
    const e = Ht()[0];
    return e ? at.lastPlayedArchiveDate ? ms(e.postDate, at.lastPlayedArchiveDate) : !0 : !1
}
  , mc = e=>{
    at.lastPlayedArchiveDate && Vl(e, at.lastPlayedArchiveDate) || gn("lastPlayedArchiveDate", e)
}
  , gc = ()=>{
    const e = Ht()[0];
    e && gn("lastPlayedArchiveDate", e.postDate)
}
  , Ge = {
    instructionsModal: {
        isVisible: cc,
        setViewed: uc
    },
    dataUsageWarningDialog: {
        accepted: fc,
        setAccepted: dc
    },
    answeringMachineTrack: {
        hasNew: pc,
        setLastPlayed: vc
    },
    archive: {
        hasNew: hc,
        setLastPlayed: mc,
        dismissNotification: gc
    }
};
var Ie = function() {
    return Ie = Object.assign || function(n) {
        for (var t, r = 1, o = arguments.length; r < o; r++) {
            t = arguments[r];
            for (var s in t)
                Object.prototype.hasOwnProperty.call(t, s) && (n[s] = t[s])
        }
        return n
    }
    ,
    Ie.apply(this, arguments)
};
function Xe(e, n, t) {
    if (t || arguments.length === 2)
        for (var r = 0, o = n.length, s; r < o; r++)
            (s || !(r in n)) && (s || (s = Array.prototype.slice.call(n, 0, r)),
            s[r] = n[r]);
    return e.concat(s || Array.prototype.slice.call(n))
}
var Wr = {
    exports: {}
}
  , ro = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (ro) {
    var io = new Uint8Array(16);
    Wr.exports = function() {
        return ro(io),
        io
    }
} else {
    var oo = new Array(16);
    Wr.exports = function() {
        for (var n = 0, t; n < 16; n++)
            n & 3 || (t = Math.random() * 4294967296),
            oo[n] = t >>> ((n & 3) << 3) & 255;
        return oo
    }
}
var gs = Wr.exports
  , _s = [];
for (var Rn = 0; Rn < 256; ++Rn)
    _s[Rn] = (Rn + 256).toString(16).substr(1);
function _c(e, n) {
    var t = n || 0
      , r = _s;
    return [r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]]].join("")
}
var ys = _c, yc = gs, wc = ys, so, xr, Sr = 0, Tr = 0;
function bc(e, n, t) {
    var r = n && t || 0
      , o = n || [];
    e = e || {};
    var s = e.node || so
      , l = e.clockseq !== void 0 ? e.clockseq : xr;
    if (s == null || l == null) {
        var u = yc();
        s == null && (s = so = [u[0] | 1, u[1], u[2], u[3], u[4], u[5]]),
        l == null && (l = xr = (u[6] << 8 | u[7]) & 16383)
    }
    var c = e.msecs !== void 0 ? e.msecs : new Date().getTime()
      , f = e.nsecs !== void 0 ? e.nsecs : Tr + 1
      , p = c - Sr + (f - Tr) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383),
    (p < 0 || c > Sr) && e.nsecs === void 0 && (f = 0),
    f >= 1e4)
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    Sr = c,
    Tr = f,
    xr = l,
    c += 122192928e5;
    var i = ((c & 268435455) * 1e4 + f) % 4294967296;
    o[r++] = i >>> 24 & 255,
    o[r++] = i >>> 16 & 255,
    o[r++] = i >>> 8 & 255,
    o[r++] = i & 255;
    var a = c / 4294967296 * 1e4 & 268435455;
    o[r++] = a >>> 8 & 255,
    o[r++] = a & 255,
    o[r++] = a >>> 24 & 15 | 16,
    o[r++] = a >>> 16 & 255,
    o[r++] = l >>> 8 | 128,
    o[r++] = l & 255;
    for (var d = 0; d < 6; ++d)
        o[r + d] = s[d];
    return n || wc(o)
}
var Ac = bc
  , xc = gs
  , Sc = ys;
function Tc(e, n, t) {
    var r = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null,
    e = null),
    e = e || {};
    var o = e.random || (e.rng || xc)();
    if (o[6] = o[6] & 15 | 64,
    o[8] = o[8] & 63 | 128,
    n)
        for (var s = 0; s < 16; ++s)
            n[r + s] = o[s];
    return n || Sc(o)
}
var kc = Tc
  , $c = Ac
  , ws = kc
  , si = ws;
si.v1 = $c;
si.v4 = ws;
var Ic = si;
/*!
 * Core functionality for Snowplow JavaScript trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
var Oc = "3.16.0";
function Pc(e) {
    if (!e)
        return e;
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
    return Dc(t)
}
function Ec(e) {
    if (!e)
        return e;
    var n = Cc(e);
    return n.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}
var rt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Cc(e) {
    var n, t, r, o, s, l, u, c, f = 0, p = 0, i = [];
    if (!e)
        return e;
    e = unescape(encodeURIComponent(e));
    do
        n = e.charCodeAt(f++),
        t = e.charCodeAt(f++),
        r = e.charCodeAt(f++),
        c = n << 16 | t << 8 | r,
        o = c >> 18 & 63,
        s = c >> 12 & 63,
        l = c >> 6 & 63,
        u = c & 63,
        i[p++] = rt.charAt(o) + rt.charAt(s) + rt.charAt(l) + rt.charAt(u);
    while (f < e.length);
    var a = i.join("")
      , d = e.length % 3;
    return (d ? a.slice(0, d - 3) : a) + "===".slice(d || 3)
}
function Dc(e) {
    var n = function(h) {
        return decodeURIComponent(h.split("").map(function(v) {
            return "%" + ("00" + v.charCodeAt(0).toString(16)).slice(-2)
        }).join(""))
    }, t, r, o, s, l, u, c, f, p = 0, i = 0, a = "", d = [];
    if (!e)
        return e;
    e += "";
    do
        s = rt.indexOf(e.charAt(p++)),
        l = rt.indexOf(e.charAt(p++)),
        u = rt.indexOf(e.charAt(p++)),
        c = rt.indexOf(e.charAt(p++)),
        f = s << 18 | l << 12 | u << 6 | c,
        t = f >> 16 & 255,
        r = f >> 8 & 255,
        o = f & 255,
        u === 64 ? d[i++] = String.fromCharCode(t) : c === 64 ? d[i++] = String.fromCharCode(t, r) : d[i++] = String.fromCharCode(t, r, o);
    while (p < e.length);
    return a = d.join(""),
    n(a.replace(/\0+$/, ""))
}
function ai() {
    var e = {}, n = [], t = [], r = [], o, s = function(f, p) {
        p != null && p !== "" && (e[f] = p)
    }, l = function(f) {
        for (var p in f)
            Object.prototype.hasOwnProperty.call(f, p) && s(p, f[p])
    }, u = function(f, p, i) {
        if (i && bs(i)) {
            var a = {
                keyIfEncoded: f,
                keyIfNotEncoded: p,
                json: i
            };
            t.push(a),
            n.push(a)
        }
    }, c = function(f) {
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
            o = f
        },
        build: function() {
            return o == null || o(this, t, r),
            e
        }
    }
}
function Mc(e) {
    return function(n, t, r) {
        for (var o = function(a, d, h) {
            var v = JSON.stringify(a);
            e ? n.add(d, Ec(v)) : n.add(h, v)
        }, s = function() {
            var a = n.getPayload();
            if (e ? a.cx : a.co)
                return JSON.parse(e ? Pc(a.cx) : a.co)
        }, l = function(a, d) {
            var h = a || s();
            return h ? h.data = h.data.concat(d.data) : h = d,
            h
        }, u = void 0, c = 0, f = t; c < f.length; c++) {
            var p = f[c];
            p.keyIfEncoded === "cx" ? u = l(u, p.json) : o(p.json, p.keyIfEncoded, p.keyIfNotEncoded)
        }
        if (t.length = 0,
        r.length) {
            var i = {
                schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                data: Xe([], r, !0)
            };
            u = l(u, i),
            r.length = 0
        }
        u && o(u, "cx", "co")
    }
}
function bs(e) {
    if (!As(e))
        return !1;
    for (var n in e)
        if (Object.prototype.hasOwnProperty.call(e, n))
            return !0;
    return !1
}
function As(e) {
    return typeof e < "u" && e !== null && (e.constructor === {}.constructor || e.constructor === [].constructor)
}
var Nn = "Snowplow: ", Ve;
(function(e) {
    e[e.none = 0] = "none",
    e[e.error = 1] = "error",
    e[e.warn = 2] = "warn",
    e[e.debug = 3] = "debug",
    e[e.info = 4] = "info"
}
)(Ve || (Ve = {}));
var Re = Bc();
function Bc(e) {
    e === void 0 && (e = Ve.warn);
    function n(l) {
        Ve[l] ? e = l : e = Ve.warn
    }
    function t(l, u) {
        for (var c = [], f = 2; f < arguments.length; f++)
            c[f - 2] = arguments[f];
        if (e >= Ve.error && typeof console < "u") {
            var p = Nn + l + "\n";
            u ? console.error.apply(console, Xe([p + "\n", u], c, !1)) : console.error.apply(console, Xe([p], c, !1))
        }
    }
    function r(l, u) {
        for (var c = [], f = 2; f < arguments.length; f++)
            c[f - 2] = arguments[f];
        if (e >= Ve.warn && typeof console < "u") {
            var p = Nn + l;
            u ? console.warn.apply(console, Xe([p + "\n", u], c, !1)) : console.warn.apply(console, Xe([p], c, !1))
        }
    }
    function o(l) {
        for (var u = [], c = 1; c < arguments.length; c++)
            u[c - 1] = arguments[c];
        e >= Ve.debug && typeof console < "u" && console.debug.apply(console, Xe([Nn + l], u, !1))
    }
    function s(l) {
        for (var u = [], c = 1; c < arguments.length; c++)
            u[c - 1] = arguments[c];
        e >= Ve.info && typeof console < "u" && console.info.apply(console, Xe([Nn + l], u, !1))
    }
    return {
        setLogLevel: n,
        warn: r,
        error: t,
        debug: o,
        info: s
    }
}
function Lc() {
    var e = []
      , n = []
      , t = function(r) {
        var o = jc(r)
          , s = Gc(r)
          , l = []
          , u = Kr(e, r, s, o);
        l.push.apply(l, u);
        var c = qc(n, r, s, o);
        return l.push.apply(l, c),
        l
    };
    return {
        getGlobalPrimitives: function() {
            return e
        },
        getConditionalProviders: function() {
            return n
        },
        addGlobalContexts: function(r) {
            for (var o = [], s = [], l = 0, u = r; l < u.length; l++) {
                var c = u[l];
                lo(c) ? o.push(c) : Ut(c) && s.push(c)
            }
            e = e.concat(s),
            n = n.concat(o)
        },
        clearGlobalContexts: function() {
            n = [],
            e = []
        },
        removeGlobalContexts: function(r) {
            for (var o = function(c) {
                lo(c) ? n = n.filter(function(f) {
                    return JSON.stringify(f) !== JSON.stringify(c)
                }) : Ut(c) && (e = e.filter(function(f) {
                    return JSON.stringify(f) !== JSON.stringify(c)
                }))
            }, s = 0, l = r; s < l.length; s++) {
                var u = l[s];
                o(u)
            }
        },
        getApplicableContexts: function(r) {
            return t(r)
        }
    }
}
function Rc(e) {
    return {
        addPluginContexts: function(n) {
            var t = n ? Xe([], n, !0) : [];
            return e.forEach(function(r) {
                try {
                    r.contexts && t.push.apply(t, r.contexts())
                } catch (o) {
                    Re.error("Error adding plugin contexts", o)
                }
            }),
            t
        }
    }
}
function Nc(e) {
    var n = new RegExp("^iglu:([a-zA-Z0-9-_.]+)/([a-zA-Z0-9-_]+)/jsonschema/([1-9][0-9]*)-(0|[1-9][0-9]*)-(0|[1-9][0-9]*)$")
      , t = n.exec(e);
    if (t !== null)
        return t.slice(1, 6)
}
function Vc(e) {
    if (e[0] === "*" || e[1] === "*")
        return !1;
    if (e.slice(2).length > 0) {
        for (var n = !1, t = 0, r = e.slice(2); t < r.length; t++) {
            var o = r[t];
            if (o === "*")
                n = !0;
            else if (n)
                return !1
        }
        return !0
    } else if (e.length == 2)
        return !0;
    return !1
}
function xs(e) {
    var n = e.split(".");
    return n && n.length > 1 ? Vc(n) : !1
}
function Ss(e) {
    var n = new RegExp("^iglu:((?:(?:[a-zA-Z0-9-_]+|\\*).)+(?:[a-zA-Z0-9-_]+|\\*))/([a-zA-Z0-9-_.]+|\\*)/jsonschema/([1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)-(0|[1-9][0-9]*|\\*)$")
      , t = n.exec(e);
    if (t !== null && xs(t[1]))
        return t.slice(1, 6)
}
function qr(e) {
    var n = Ss(e);
    if (n) {
        var t = n[0];
        return n.length === 5 && xs(t)
    }
    return !1
}
function zc(e) {
    return Array.isArray(e) && e.every(function(n) {
        return typeof n == "string"
    })
}
function ao(e) {
    return zc(e) ? e.every(function(n) {
        return qr(n)
    }) : typeof e == "string" ? qr(e) : !1
}
function cn(e) {
    var n = e;
    return bs(n) && "schema"in n && "data"in n ? typeof n.schema == "string" && typeof n.data == "object" : !1
}
function Hc(e) {
    var n = e
      , t = 0;
    if (e != null && typeof e == "object" && !Array.isArray(e)) {
        if (Object.prototype.hasOwnProperty.call(n, "accept"))
            if (ao(n.accept))
                t += 1;
            else
                return !1;
        if (Object.prototype.hasOwnProperty.call(n, "reject"))
            if (ao(n.reject))
                t += 1;
            else
                return !1;
        return t > 0 && t <= 2
    }
    return !1
}
function tr(e) {
    return typeof e == "function" && e.length <= 1
}
function Ut(e) {
    return tr(e) || cn(e)
}
function Ts(e) {
    return Array.isArray(e) && e.length === 2 ? Array.isArray(e[1]) ? tr(e[0]) && e[1].every(Ut) : tr(e[0]) && Ut(e[1]) : !1
}
function ks(e) {
    return Array.isArray(e) && e.length === 2 && Hc(e[0]) ? Array.isArray(e[1]) ? e[1].every(Ut) : Ut(e[1]) : !1
}
function lo(e) {
    return Ts(e) || ks(e)
}
function Uc(e, n) {
    var t = 0
      , r = 0
      , o = e.accept;
    Array.isArray(o) ? e.accept.some(function(l) {
        return Vn(l, n)
    }) && r++ : typeof o == "string" && Vn(o, n) && r++;
    var s = e.reject;
    return Array.isArray(s) ? e.reject.some(function(l) {
        return Vn(l, n)
    }) && t++ : typeof s == "string" && Vn(s, n) && t++,
    r > 0 && t === 0 ? !0 : (r === 0 && t > 0,
    !1)
}
function Vn(e, n) {
    if (!qr(e))
        return !1;
    var t = Ss(e)
      , r = Nc(n);
    if (t && r) {
        if (!Fc(t[0], r[0]))
            return !1;
        for (var o = 1; o < 5; o++)
            if (!$s(t[o], r[o]))
                return !1;
        return !0
    }
    return !1
}
function Fc(e, n) {
    var t = n.split(".")
      , r = e.split(".");
    if (t && r) {
        if (t.length !== r.length)
            return !1;
        for (var o = 0; o < r.length; o++)
            if (!$s(t[o], r[o]))
                return !1;
        return !0
    }
    return !1
}
function $s(e, n) {
    return e && n && e === "*" || e === n
}
function jc(e) {
    for (var n = e.getJson(), t = 0, r = n; t < r.length; t++) {
        var o = r[t];
        if (o.keyIfEncoded === "ue_px" && typeof o.json.data == "object") {
            var s = o.json.data.schema;
            if (typeof s == "string")
                return s
        }
    }
    return ""
}
function Gc(e) {
    var n = e.getPayload().e;
    return typeof n == "string" ? n : ""
}
function Zc(e, n, t, r) {
    var o = void 0;
    try {
        var s = {
            event: n.getPayload(),
            eventType: t,
            eventSchema: r
        };
        return o = e(s),
        Array.isArray(o) && o.every(cn) || cn(o) ? o : void 0
    } catch (l) {
        o = void 0
    }
    return o
}
function Is(e) {
    return Array.isArray(e) ? e : Array.of(e)
}
function Kr(e, n, t, r) {
    var o, s = Is(e), l = function(c) {
        var f = Yc(c, n, t, r);
        if (f && f.length !== 0)
            return f
    }, u = s.map(l);
    return (o = []).concat.apply(o, u.filter(function(c) {
        return c != null && c.filter(Boolean)
    }))
}
function Yc(e, n, t, r) {
    if (cn(e))
        return [e];
    if (tr(e)) {
        var o = Zc(e, n, t, r);
        if (cn(o))
            return [o];
        if (Array.isArray(o))
            return o
    }
}
function Wc(e, n, t, r) {
    if (Ts(e)) {
        var o = e[0]
          , s = !1;
        try {
            var l = {
                event: n.getPayload(),
                eventType: t,
                eventSchema: r
            };
            s = o(l)
        } catch (u) {
            s = !1
        }
        if (s === !0)
            return Kr(e[1], n, t, r)
    } else if (ks(e) && Uc(e[0], r))
        return Kr(e[1], n, t, r);
    return []
}
function qc(e, n, t, r) {
    var o, s = Is(e), l = function(c) {
        var f = Wc(c, n, t, r);
        if (f && f.length !== 0)
            return f
    }, u = s.map(l);
    return (o = []).concat.apply(o, u.filter(function(c) {
        return c != null && c.filter(Boolean)
    }))
}
function Kc(e) {
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
function Qc(e) {
    e === void 0 && (e = {});
    function n(c, f, p) {
        var i = Rc(f)
          , a = Lc()
          , d = c
          , h = {};
        function v(w) {
            if (w && w.length)
                return {
                    schema: "iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0",
                    data: w
                }
        }
        function g(w, $) {
            var z = a.getApplicableContexts(w)
              , F = [];
            return $ && $.length && F.push.apply(F, $),
            z && z.length && F.push.apply(F, z),
            F
        }
        function m(w, $, z) {
            w.withJsonProcessor(Mc(d)),
            w.add("eid", Ic.v4()),
            w.addDict(h);
            var F = Kc(z);
            w.add(F.type, F.value.toString());
            var L = g(w, i.addPluginContexts($))
              , M = v(L);
            M !== void 0 && w.addJson("cx", "co", M),
            f.forEach(function(R) {
                try {
                    R.beforeTrack && R.beforeTrack(w)
                } catch (Q) {
                    Re.error("Plugin beforeTrack", Q)
                }
            }),
            typeof p == "function" && p(w);
            var V = w.build();
            return f.forEach(function(R) {
                try {
                    R.afterTrack && R.afterTrack(V)
                } catch (Q) {
                    Re.error("Plugin afterTrack", Q)
                }
            }),
            V
        }
        function y(w, $) {
            h[w] = $
        }
        var A = {
            track: m,
            addPayloadPair: y,
            getBase64Encoding: function() {
                return d
            },
            setBase64Encoding: function(w) {
                d = w
            },
            addPayloadDict: function(w) {
                for (var $ in w)
                    Object.prototype.hasOwnProperty.call(w, $) && (h[$] = w[$])
            },
            resetPayloadPairs: function(w) {
                h = As(w) ? w : {}
            },
            setTrackerVersion: function(w) {
                y("tv", w)
            },
            setTrackerNamespace: function(w) {
                y("tna", w)
            },
            setAppId: function(w) {
                y("aid", w)
            },
            setPlatform: function(w) {
                y("p", w)
            },
            setUserId: function(w) {
                y("uid", w)
            },
            setScreenResolution: function(w, $) {
                y("res", w + "x" + $)
            },
            setViewport: function(w, $) {
                y("vp", w + "x" + $)
            },
            setColorDepth: function(w) {
                y("cd", w)
            },
            setTimezone: function(w) {
                y("tz", w)
            },
            setLang: function(w) {
                y("lang", w)
            },
            setIpAddress: function(w) {
                y("ip", w)
            },
            setUseragent: function(w) {
                y("ua", w)
            },
            addGlobalContexts: function(w) {
                a.addGlobalContexts(w)
            },
            clearGlobalContexts: function() {
                a.clearGlobalContexts()
            },
            removeGlobalContexts: function(w) {
                a.removeGlobalContexts(w)
            }
        };
        return A
    }
    var t = e.base64
      , r = e.corePlugins
      , o = e.callback
      , s = r != null ? r : []
      , l = n(t != null ? t : !0, s, o)
      , u = Ie(Ie({}, l), {
        addPlugin: function(c) {
            var f, p, i = c.plugin;
            s.push(i),
            (f = i.logger) === null || f === void 0 || f.call(i, Re),
            (p = i.activateCorePlugin) === null || p === void 0 || p.call(i, u)
        }
    });
    return s == null || s.forEach(function(c) {
        var f, p;
        (f = c.logger) === null || f === void 0 || f.call(c, Re),
        (p = c.activateCorePlugin) === null || p === void 0 || p.call(c, u)
    }),
    u
}
function Jc(e) {
    var n = e.event
      , t = n.schema
      , r = n.data
      , o = ai()
      , s = {
        schema: "iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0",
        data: {
            schema: t,
            data: r
        }
    };
    return o.add("e", "ue"),
    o.addJson("ue_px", "ue_pr", s),
    o
}
function Xc(e) {
    var n = e.pageUrl
      , t = e.pageTitle
      , r = e.referrer
      , o = ai();
    return o.add("e", "pv"),
    o.add("url", n),
    o.add("page", t),
    o.add("refr", r),
    o
}
function eu(e) {
    var n = e.pageUrl
      , t = e.pageTitle
      , r = e.referrer
      , o = e.minXOffset
      , s = e.maxXOffset
      , l = e.minYOffset
      , u = e.maxYOffset
      , c = ai();
    return c.add("e", "pp"),
    c.add("url", n),
    c.add("page", t),
    c.add("refr", r),
    o && !isNaN(Number(o)) && c.add("pp_mix", o.toString()),
    s && !isNaN(Number(s)) && c.add("pp_max", s.toString()),
    l && !isNaN(Number(l)) && c.add("pp_miy", l.toString()),
    u && !isNaN(Number(u)) && c.add("pp_may", u.toString()),
    c
}
var tu = Oc
  , Os = {
    exports: {}
}
  , Ps = {
    exports: {}
};
(function() {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
      , n = {
        rotl: function(t, r) {
            return t << r | t >>> 32 - r
        },
        rotr: function(t, r) {
            return t << 32 - r | t >>> r
        },
        endian: function(t) {
            if (t.constructor == Number)
                return n.rotl(t, 8) & 16711935 | n.rotl(t, 24) & 4278255360;
            for (var r = 0; r < t.length; r++)
                t[r] = n.endian(t[r]);
            return t
        },
        randomBytes: function(t) {
            for (var r = []; t > 0; t--)
                r.push(Math.floor(Math.random() * 256));
            return r
        },
        bytesToWords: function(t) {
            for (var r = [], o = 0, s = 0; o < t.length; o++,
            s += 8)
                r[s >>> 5] |= t[o] << 24 - s % 32;
            return r
        },
        wordsToBytes: function(t) {
            for (var r = [], o = 0; o < t.length * 32; o += 8)
                r.push(t[o >>> 5] >>> 24 - o % 32 & 255);
            return r
        },
        bytesToHex: function(t) {
            for (var r = [], o = 0; o < t.length; o++)
                r.push((t[o] >>> 4).toString(16)),
                r.push((t[o] & 15).toString(16));
            return r.join("")
        },
        hexToBytes: function(t) {
            for (var r = [], o = 0; o < t.length; o += 2)
                r.push(parseInt(t.substr(o, 2), 16));
            return r
        },
        bytesToBase64: function(t) {
            for (var r = [], o = 0; o < t.length; o += 3)
                for (var s = t[o] << 16 | t[o + 1] << 8 | t[o + 2], l = 0; l < 4; l++)
                    o * 8 + l * 6 <= t.length * 8 ? r.push(e.charAt(s >>> 6 * (3 - l) & 63)) : r.push("=");
            return r.join("")
        },
        base64ToBytes: function(t) {
            t = t.replace(/[^A-Z0-9+\/]/ig, "");
            for (var r = [], o = 0, s = 0; o < t.length; s = ++o % 4)
                s != 0 && r.push((e.indexOf(t.charAt(o - 1)) & Math.pow(2, -2 * s + 8) - 1) << s * 2 | e.indexOf(t.charAt(o)) >>> 6 - s * 2);
            return r
        }
    };
    Ps.exports = n
}
)();
var nu = Ps.exports
  , Qr = {
    utf8: {
        stringToBytes: function(e) {
            return Qr.bin.stringToBytes(unescape(encodeURIComponent(e)))
        },
        bytesToString: function(e) {
            return decodeURIComponent(escape(Qr.bin.bytesToString(e)))
        }
    },
    bin: {
        stringToBytes: function(e) {
            for (var n = [], t = 0; t < e.length; t++)
                n.push(e.charCodeAt(t) & 255);
            return n
        },
        bytesToString: function(e) {
            for (var n = [], t = 0; t < e.length; t++)
                n.push(String.fromCharCode(e[t]));
            return n.join("")
        }
    }
}
  , co = Qr;
(function() {
    var e = nu
      , n = co.utf8
      , t = co.bin
      , r = function(s) {
        s.constructor == String ? s = n.stringToBytes(s) : typeof Buffer < "u" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(s) ? s = Array.prototype.slice.call(s, 0) : Array.isArray(s) || (s = s.toString());
        var l = e.bytesToWords(s)
          , u = s.length * 8
          , c = []
          , f = 1732584193
          , p = -271733879
          , i = -1732584194
          , a = 271733878
          , d = -1009589776;
        l[u >> 5] |= 128 << 24 - u % 32,
        l[(u + 64 >>> 9 << 4) + 15] = u;
        for (var h = 0; h < l.length; h += 16) {
            for (var v = f, g = p, m = i, y = a, A = d, w = 0; w < 80; w++) {
                if (w < 16)
                    c[w] = l[h + w];
                else {
                    var $ = c[w - 3] ^ c[w - 8] ^ c[w - 14] ^ c[w - 16];
                    c[w] = $ << 1 | $ >>> 31
                }
                var z = (f << 5 | f >>> 27) + d + (c[w] >>> 0) + (w < 20 ? (p & i | ~p & a) + 1518500249 : w < 40 ? (p ^ i ^ a) + 1859775393 : w < 60 ? (p & i | p & a | i & a) - 1894007588 : (p ^ i ^ a) - 899497514);
                d = a,
                a = i,
                i = p << 30 | p >>> 2,
                p = f,
                f = z
            }
            f += v,
            p += g,
            i += m,
            a += y,
            d += A
        }
        return [f, p, i, a, d]
    }
      , o = function(s, l) {
        var u = e.wordsToBytes(r(s));
        return l && l.asBytes ? u : l && l.asString ? t.bytesToString(u) : e.bytesToHex(u)
    };
    o._blocksize = 16,
    o._digestsize = 20,
    Os.exports = o
}
)();
var ru = Os.exports;
const iu = mn(ru);
var Jr = {
    exports: {}
}
  , uo = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
if (uo) {
    var fo = new Uint8Array(16);
    Jr.exports = function() {
        return uo(fo),
        fo
    }
} else {
    var po = new Array(16);
    Jr.exports = function() {
        for (var n = 0, t; n < 16; n++)
            n & 3 || (t = Math.random() * 4294967296),
            po[n] = t >>> ((n & 3) << 3) & 255;
        return po
    }
}
var Es = Jr.exports
  , Cs = [];
for (var zn = 0; zn < 256; ++zn)
    Cs[zn] = (zn + 256).toString(16).substr(1);
function ou(e, n) {
    var t = n || 0
      , r = Cs;
    return [r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], "-", r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]], r[e[t++]]].join("")
}
var Ds = ou, su = Es, au = Ds, vo, kr, $r = 0, Ir = 0;
function lu(e, n, t) {
    var r = n && t || 0
      , o = n || [];
    e = e || {};
    var s = e.node || vo
      , l = e.clockseq !== void 0 ? e.clockseq : kr;
    if (s == null || l == null) {
        var u = su();
        s == null && (s = vo = [u[0] | 1, u[1], u[2], u[3], u[4], u[5]]),
        l == null && (l = kr = (u[6] << 8 | u[7]) & 16383)
    }
    var c = e.msecs !== void 0 ? e.msecs : new Date().getTime()
      , f = e.nsecs !== void 0 ? e.nsecs : Ir + 1
      , p = c - $r + (f - Ir) / 1e4;
    if (p < 0 && e.clockseq === void 0 && (l = l + 1 & 16383),
    (p < 0 || c > $r) && e.nsecs === void 0 && (f = 0),
    f >= 1e4)
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    $r = c,
    Ir = f,
    kr = l,
    c += 122192928e5;
    var i = ((c & 268435455) * 1e4 + f) % 4294967296;
    o[r++] = i >>> 24 & 255,
    o[r++] = i >>> 16 & 255,
    o[r++] = i >>> 8 & 255,
    o[r++] = i & 255;
    var a = c / 4294967296 * 1e4 & 268435455;
    o[r++] = a >>> 8 & 255,
    o[r++] = a & 255,
    o[r++] = a >>> 24 & 15 | 16,
    o[r++] = a >>> 16 & 255,
    o[r++] = l >>> 8 | 128,
    o[r++] = l & 255;
    for (var d = 0; d < 6; ++d)
        o[r + d] = s[d];
    return n || au(o)
}
var cu = lu
  , uu = Es
  , fu = Ds;
function du(e, n, t) {
    var r = n && t || 0;
    typeof e == "string" && (n = e === "binary" ? new Array(16) : null,
    e = null),
    e = e || {};
    var o = e.random || (e.rng || uu)();
    if (o[6] = o[6] & 15 | 64,
    o[8] = o[8] & 63 | 128,
    n)
        for (var s = 0; s < 16; ++s)
            n[r + s] = o[s];
    return n || fu(o)
}
var pu = du
  , vu = cu
  , Ms = pu
  , li = Ms;
li.v1 = vu;
li.v4 = Ms;
var et = li;
/*!
 * Core functionality for Snowplow Browser trackers v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function hu(e) {
    try {
        var n = window.localStorage
          , t = n.getItem(e + ".expires");
        if (t === null || +t > Date.now())
            return n.getItem(e);
        n.removeItem(e),
        n.removeItem(e + ".expires");
        return
    } catch (r) {
        return
    }
}
function Yn(e, n, t) {
    t === void 0 && (t = 63072e3);
    try {
        var r = window.localStorage
          , o = Date.now() + t * 1e3;
        return r.setItem("".concat(e, ".expires"), o.toString()),
        r.setItem(e, n),
        !0
    } catch (s) {
        return !1
    }
}
function ho(e) {
    try {
        var n = window.localStorage;
        return n.removeItem(e),
        n.removeItem(e + ".expires"),
        !0
    } catch (t) {
        return !1
    }
}
function mo(e) {
    try {
        return window.sessionStorage.getItem(e)
    } catch (n) {
        return
    }
}
function mu(e, n) {
    try {
        return window.sessionStorage.setItem(e, n),
        !0
    } catch (t) {
        return !1
    }
}
function Bs(e) {
    return !!(e && typeof e.valueOf() == "string")
}
function go(e) {
    return Number.isInteger && Number.isInteger(e) || typeof e == "number" && isFinite(e) && Math.floor(e) === e
}
function _o(e) {
    if (!Bs(e)) {
        e = e.text || "";
        var n = document.getElementsByTagName("title");
        n && n[0] != null && (e = n[0].text)
    }
    return e
}
function Xr(e) {
    var n = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)")
      , t = n.exec(e);
    return t ? t[1] : e
}
function yo(e) {
    var n = e.length;
    return e.charAt(--n) === "." && (e = e.slice(0, n)),
    e.slice(0, 2) === "*." && (e = e.slice(1)),
    e
}
function Or(e) {
    var n = window
      , t = un("referrer", n.location.href) || un("referer", n.location.href);
    if (t)
        return t;
    if (e)
        return e;
    try {
        if (n.top)
            return n.top.document.referrer;
        if (n.parent)
            return n.parent.document.referrer
    } catch (r) {}
    return document.referrer
}
function tt(e, n, t, r) {
    if (e.addEventListener)
        return e.addEventListener(n, t, r),
        !0;
    if (e.attachEvent)
        return e.attachEvent("on" + n, t);
    e["on" + n] = t
}
function un(e, n) {
    var t = new RegExp("^[^#]*[?&]" + e + "=([^&#]*)").exec(n);
    return t ? decodeURIComponent(t[1].replace(/\+/g, " ")) : null
}
function gu(e, n, t) {
    var r = n + "=" + t
      , o = e.split("#")
      , s = o[0].split("?")
      , l = s.shift()
      , u = s.join("?");
    if (!u)
        u = r;
    else {
        for (var c = !0, f = u.split("&"), p = 0; p < f.length; p++)
            if (f[p].substr(0, n.length + 1) === n + "=") {
                c = !1,
                f[p] = r,
                u = f.join("&");
                break
            }
        c && (u = r + "&" + u)
    }
    return o[0] = l + "?" + u,
    o.join("#")
}
function _u(e, n) {
    for (var t = window.location.hostname, r = "_sp_root_domain_test_", o = r + new Date().getTime(), s = "_test_value_" + new Date().getTime(), l = t.split("."), u = l.length - 2; u >= 0; u--) {
        var c = l.slice(u).join(".");
        if (mt(o, s, 0, "/", c, e, n),
        mt(o) === s) {
            nr(o, c, e, n);
            for (var f = yu(r), p = 0; p < f.length; p++)
                nr(f[p], c, e, n);
            return c
        }
    }
    return t
}
function nr(e, n, t, r) {
    mt(e, "", -1, "/", n, t, r)
}
function yu(e) {
    for (var n = document.cookie.split("; "), t = [], r = 0; r < n.length; r++)
        n[r].substring(0, e.length) === e && t.push(n[r]);
    return t
}
function mt(e, n, t, r, o, s, l) {
    return arguments.length > 1 ? document.cookie = e + "=" + encodeURIComponent(n != null ? n : "") + (t ? "; Expires=" + new Date(+new Date + t * 1e3).toUTCString() : "") + (r ? "; Path=" + r : "") + (o ? "; Domain=" + o : "") + (s ? "; SameSite=" + s : "") + (l ? "; Secure" : "") : decodeURIComponent((("; " + document.cookie).split("; " + e + "=")[1] || "").split(";")[0])
}
function wu() {
    try {
        return !!window.localStorage
    } catch (e) {
        return !0
    }
}
function bu() {
    var e = "modernizr";
    if (!wu())
        return !1;
    try {
        var n = window.localStorage;
        return n.setItem(e, e),
        n.removeItem(e),
        !0
    } catch (t) {
        return !1
    }
}
var Au = "iglu:com.snowplowanalytics.snowplow/web_page/jsonschema/1-0-0"
  , xu = "iglu:com.snowplowanalytics.snowplow/browser_context/jsonschema/1-0-0"
  , Su = "iglu:com.snowplowanalytics.snowplow/client_session/jsonschema/1-0-2"
  , Tu = "iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-4";
function ku(e, n, t, r, o, s, l, u, c, f, p, i, a, d, h, v, g) {
    var m = !1, y, A = [], w = !1;
    r = typeof r == "string" ? r.toLowerCase() : r;
    var $ = r === !0 || r === "beacon" || r === "true"
      , z = !!($ && window.navigator && window.navigator.sendBeacon && !ue(window.navigator.userAgent))
      , F = z && $
      , L = r === "get"
      , M = !!(window.XMLHttpRequest && "withCredentials"in new XMLHttpRequest)
      , V = !L && M && (r === "post" || $)
      , R = V ? o : "/i"
      , Q = "snowplowOutQueue_".concat(e, "_").concat(V ? "post2" : "get");
    if ($ && (a = {}),
    s = t && bu() && V && s || 1,
    t)
        try {
            var ce = window.localStorage.getItem(Q);
            A = ce ? JSON.parse(ce) : []
        } catch (P) {}
    Array.isArray(A) || (A = []),
    n.outQueues.push(A),
    M && s > 1 && n.bufferFlushers.push(function(P) {
        m || D(P)
    });
    function C(P) {
        var G = "?"
          , U = {
            co: !0,
            cx: !0
        }
          , N = !0;
        for (var Z in P)
            P.hasOwnProperty(Z) && !U.hasOwnProperty(Z) && (N ? N = !1 : G += "&",
            G += encodeURIComponent(Z) + "=" + encodeURIComponent(P[Z]));
        for (var q in U)
            P.hasOwnProperty(q) && U.hasOwnProperty(q) && (G += "&" + q + "=" + encodeURIComponent(P[q]));
        return G
    }
    function I(P) {
        var G = Object.keys(P).map(function(U) {
            return [U, P[U]]
        }).reduce(function(U, N) {
            var Z = N[0]
              , q = N[1];
            return U[Z] = q.toString(),
            U
        }, {});
        return {
            evt: G,
            bytes: b(JSON.stringify(G))
        }
    }
    function b(P) {
        for (var G = 0, U = 0; U < P.length; U++) {
            var N = P.charCodeAt(U);
            N <= 127 ? G += 1 : N <= 2047 ? G += 2 : N >= 55296 && N <= 57343 ? (G += 4,
            U++) : N < 65535 ? G += 3 : G += 4
        }
        return G
    }
    var S = function(P) {
        return typeof P[0] == "object" && "evt"in P[0]
    };
    function T(P, G) {
        var U = Y(G, !0, !1);
        U.send(K(J([P.evt])))
    }
    function O(P, G) {
        y = G + R;
        var U = function(ke, We) {
            return Re.warn("Event (" + ke + "B) too big, max is " + We)
        };
        if (V) {
            var N = I(P);
            if (N.bytes >= l) {
                U(N.bytes, l),
                T(N, y);
                return
            } else
                A.push(N)
        } else {
            var Z = C(P);
            if (u > 0) {
                var q = te(Z)
                  , pe = b(q);
                if (pe >= u) {
                    if (U(pe, u),
                    M) {
                        var N = I(P)
                          , ne = G + o;
                        T(N, ne)
                    }
                    return
                }
            }
            A.push(Z)
        }
        var Ae = !1;
        t && (Ae = Yn(Q, JSON.stringify(A.slice(0, f)))),
        !m && (!Ae || A.length >= s) && D()
    }
    function D(P) {
        for (P === void 0 && (P = !1); A.length && typeof A[0] != "string" && typeof A[0] != "object"; )
            A.shift();
        if (!A.length) {
            m = !1;
            return
        }
        if (!Bs(y))
            throw "No collector configured";
        if (m = !0,
        g && !w) {
            var G = Y(g, !1, P);
            w = !0,
            G.timeout = p,
            G.onreadystatechange = function() {
                G.readyState === 4 && D()
            }
            ,
            G.send();
            return
        }
        if (M) {
            var U = function(xe) {
                for (var Ne = 0, wn = 0; Ne < xe.length && (wn += xe[Ne].bytes,
                !(wn >= l)); )
                    Ne += 1;
                return Ne
            }, N = void 0, Z, q;
            S(A) ? (N = y,
            Z = Y(N, !0, P),
            q = U(A)) : (N = te(A[0]),
            Z = Y(N, !1, P),
            q = 1);
            var pe = setTimeout(function() {
                Z.abort(),
                m = !1
            }, p)
              , ne = function(xe) {
                for (var Ne = 0; Ne < xe; Ne++)
                    A.shift();
                t && Yn(Q, JSON.stringify(A.slice(0, f)))
            }
              , Ae = function(xe) {
                ne(xe),
                D()
            };
            if (Z.onreadystatechange = function() {
                Z.readyState === 4 && Z.status >= 200 && (clearTimeout(pe),
                Z.status < 300 ? Ae(q) : (j(Z.status) || (Re.error("Status ".concat(Z.status, ", will not retry.")),
                ne(q)),
                m = !1))
            }
            ,
            !S(A))
                Z.send();
            else {
                var ke = A.slice(0, q);
                if (ke.length > 0) {
                    var We = !1
                      , Pe = ke.map(function(xe) {
                        return xe.evt
                    });
                    if (F) {
                        var ut = new Blob([K(J(Pe))],{
                            type: "application/json"
                        });
                        try {
                            We = navigator.sendBeacon(N, ut)
                        } catch (xe) {
                            We = !1
                        }
                    }
                    We === !0 ? Ae(q) : Z.send(K(J(Pe)))
                }
            }
        } else if (!i && !S(A)) {
            var qe = new Image(1,1)
              , Ke = !0;
            qe.onload = function() {
                Ke && (Ke = !1,
                A.shift(),
                t && Yn(Q, JSON.stringify(A.slice(0, f))),
                D())
            }
            ,
            qe.onerror = function() {
                Ke && (Ke = !1,
                m = !1)
            }
            ,
            qe.src = te(A[0]),
            setTimeout(function() {
                Ke && m && (Ke = !1,
                D())
            }, p)
        } else
            m = !1
    }
    function j(P) {
        return P >= 200 && P < 300 ? !1 : h.includes(P) ? !0 : !v.includes(P)
    }
    function Y(P, G, U) {
        var N = new XMLHttpRequest;
        G ? (N.open("POST", P, !U),
        N.setRequestHeader("Content-Type", "application/json; charset=UTF-8")) : N.open("GET", P, !U),
        N.withCredentials = d,
        i && N.setRequestHeader("SP-Anonymous", "*");
        for (var Z in a)
            Object.prototype.hasOwnProperty.call(a, Z) && N.setRequestHeader(Z, a[Z]);
        return N
    }
    function K(P) {
        return JSON.stringify({
            schema: Tu,
            data: P
        })
    }
    function J(P) {
        for (var G = new Date().getTime().toString(), U = 0; U < P.length; U++)
            P[U].stm = G;
        return P
    }
    function te(P) {
        return c ? y + P.replace("?", "?stm=" + new Date().getTime() + "&") : y + P
    }
    return {
        enqueueRequest: O,
        executeQueue: function() {
            m || D()
        },
        setUseLocalStorage: function(P) {
            t = P
        },
        setAnonymousTracking: function(P) {
            i = P
        },
        setCollectorUrl: function(P) {
            y = P + R
        },
        setBufferSize: function(P) {
            s = P
        }
    };
    function ue(P) {
        return G(13, P) || U(10, 15, P) && N(P);
        function G(q, pe) {
            var ne = pe.match("(iP.+; CPU .*OS (d+)[_d]*.*) AppleWebKit/");
            return ne && ne.length ? parseInt(ne[0]) <= q : !1
        }
        function U(q, pe, ne) {
            var Ae = ne.match("(Macintosh;.*Mac OS X (d+)_(d+)[_d]*.*) AppleWebKit/");
            return Ae && Ae.length ? parseInt(Ae[0]) <= q || parseInt(Ae[0]) === q && parseInt(Ae[1]) <= pe : !1
        }
        function N(q) {
            return q.match("Version/.* Safari/") && !Z(q)
        }
        function Z(q) {
            return q.match("Chrom(e|ium)")
        }
    }
}
function $u(e, n) {
    var t = new RegExp("^(?:https?|ftp)(?::/*(?:[^?]+))([?][^#]+)")
      , r = t.exec(e);
    return r && (r == null ? void 0 : r.length) > 1 ? un(n, r[1]) : null
}
function wo(e, n, t) {
    var r;
    return e === "translate.googleusercontent.com" ? (t === "" && (t = n),
    n = (r = $u(n, "u")) !== null && r !== void 0 ? r : "",
    e = Xr(n)) : (e === "cc.bingj.com" || e === "webcache.googleusercontent.com") && (n = document.links[0].href,
    e = Xr(n)),
    [e, n, t]
}
var Ls = 0
  , gt = 1
  , Iu = 2
  , fn = 3
  , ci = 4
  , Rs = 5
  , it = 6
  , Bt = 7
  , _t = 8
  , yt = 9
  , Ue = 10;
function Ou() {
    var e = ["1", "", 0, 0, 0, void 0, "", "", "", void 0, 0];
    return e
}
function Pu(e, n, t, r) {
    var o = new Date, s = Math.round(o.getTime() / 1e3), l;
    e ? (l = e.split("."),
    l.unshift("0")) : l = ["1", n, s, r, s, "", t],
    (!l[it] || l[it] === "undefined") && (l[it] = et.v4()),
    (!l[Bt] || l[Bt] === "undefined") && (l[Bt] = ""),
    (!l[_t] || l[_t] === "undefined") && (l[_t] = ""),
    (!l[yt] || l[yt] === "undefined") && (l[yt] = ""),
    (!l[Ue] || l[Ue] === "undefined") && (l[Ue] = 0);
    var u = function(p, i) {
        var a = parseInt(p);
        return isNaN(a) ? i : a
    }
      , c = function(p) {
        return p ? u(p, void 0) : void 0
    }
      , f = [l[Ls], l[gt], u(l[Iu], s), u(l[fn], r), u(l[ci], s), c(l[Rs]), l[it], l[Bt], l[_t], c(l[yt]), u(l[Ue], 0)];
    return f
}
function Eu(e, n) {
    var t;
    return e[gt] ? t = e[gt] : n ? (t = "",
    e[gt] = t) : (t = et.v4(),
    e[gt] = t),
    t
}
function en(e, n) {
    n === void 0 && (n = {
        memorizedVisitCount: 1
    });
    var t = n.memorizedVisitCount;
    ei(e) ? (e[Bt] = e[it],
    e[Rs] = e[ci],
    e[fn]++) : e[fn] = t;
    var r = et.v4();
    return e[it] = r,
    e[Ue] = 0,
    e[_t] = "",
    e[yt] = void 0,
    r
}
function Pr(e) {
    e[ci] = Math.round(new Date().getTime() / 1e3)
}
function Cu(e, n) {
    if (e[Ue] === 0) {
        var t = n.build();
        e[_t] = t.eid;
        var r = t.dtm || t.ttm;
        e[yt] = r ? parseInt(r) : void 0
    }
}
function Du(e) {
    e[Ue] += 1
}
function Mu(e) {
    return e.shift(),
    e.join(".")
}
function bo(e, n, t) {
    var r = e[yt]
      , o = {
        userId: t ? "00000000-0000-0000-0000-000000000000" : e[gt],
        sessionId: e[it],
        eventIndex: e[Ue],
        sessionIndex: e[fn],
        previousSessionId: t ? null : e[Bt] || null,
        storageMechanism: n == "localStorage" ? "LOCAL_STORAGE" : "COOKIE_1",
        firstEventId: e[_t] || null,
        firstEventTimestamp: r ? new Date(r).toISOString() : null
    };
    return o
}
function Er(e) {
    return e[it]
}
function Bu(e) {
    return e[gt]
}
function Cr(e) {
    return e[fn]
}
function ei(e) {
    return e[Ls] === "0"
}
function Lu(e) {
    return e[Ue]
}
var dn = "x";
function Dr() {
    return {
        viewport: Mr(Ru()),
        documentSize: Mr(Nu()),
        resolution: Mr(Vu()),
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
function Ru() {
    var e, n;
    if ("innerWidth"in window)
        e = window.innerWidth,
        n = window.innerHeight;
    else {
        var t = document.documentElement || document.body;
        e = t.clientWidth,
        n = t.clientHeight
    }
    return e >= 0 && n >= 0 ? e + dn + n : null
}
function Nu() {
    var e = document.documentElement
      , n = document.body
      , t = n ? Math.max(n.offsetHeight, n.scrollHeight) : 0
      , r = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth)
      , o = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, t);
    return isNaN(r) || isNaN(o) ? "" : r + dn + o
}
function Vu() {
    return screen.width + dn + screen.height
}
function Mr(e) {
    return e && e.split(dn).map(function(n) {
        return Math.floor(Number(n))
    }).join(dn)
}
function zu(e, n, t, r, o, s) {
    s === void 0 && (s = {});
    var l = []
      , u = function(p, i, a, d, h, v) {
        var g, m, y, A, w, $, z, F, L, M, V, R, Q, ce, C, I, b, S, T, O, D, j, Y, K, J, te, ue, P;
        v.eventMethod = (g = v.eventMethod) !== null && g !== void 0 ? g : "post";
        var G = function(_) {
            var x;
            return (x = _.stateStorageStrategy) !== null && x !== void 0 ? x : "cookieAndLocalStorage"
        }
          , U = function(_) {
            var x, E;
            return typeof _.anonymousTracking == "boolean" ? !1 : (E = ((x = _.anonymousTracking) === null || x === void 0 ? void 0 : x.withSessionTracking) === !0) !== null && E !== void 0 ? E : !1
        }
          , N = function(_) {
            var x, E;
            return typeof _.anonymousTracking == "boolean" ? !1 : (E = ((x = _.anonymousTracking) === null || x === void 0 ? void 0 : x.withServerAnonymisation) === !0) !== null && E !== void 0 ? E : !1
        }
          , Z = function(_) {
            return !!_.anonymousTracking
        }
          , q = (y = (m = v == null ? void 0 : v.contexts) === null || m === void 0 ? void 0 : m.browser) !== null && y !== void 0 ? y : !1
          , pe = (w = (A = v == null ? void 0 : v.contexts) === null || A === void 0 ? void 0 : A.webPage) !== null && w !== void 0 ? w : !0;
        l.push(wa()),
        pe && l.push(_a()),
        q && l.push(ya()),
        l.push.apply(l, ($ = v.plugins) !== null && $ !== void 0 ? $ : []);
        var ne = Qc({
            base64: v.encodeBase64,
            corePlugins: l,
            callback: ha
        }), Ae = document.characterSet || document.charset, ke = wo(window.location.hostname, window.location.href, Or()), We = yo(ke[0]), Pe = ke[1], ut = ke[2], qe, Ke = (z = v.platform) !== null && z !== void 0 ? z : "web", xe = Mi(d), Ne = (F = v.postPath) !== null && F !== void 0 ? F : "/com.snowplowanalytics.snowplow/tp2", wn = (L = v.appId) !== null && L !== void 0 ? L : "", bn, kt = document.title, Wt, aa = (M = v.resetActivityTrackingOnPageView) !== null && M !== void 0 ? M : !0, hi, mi, la = (V = v.cookieName) !== null && V !== void 0 ? V : "_sp_", qt = (R = v.cookieDomain) !== null && R !== void 0 ? R : void 0, ar = "/", An = (Q = v.cookieSameSite) !== null && Q !== void 0 ? Q : "None", xn = (ce = v.cookieSecure) !== null && ce !== void 0 ? ce : !0, gi = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack, _i = typeof v.respectDoNotTrack < "u" ? v.respectDoNotTrack && (gi === "yes" || gi === "1") : !1, lr, yi = (C = v.cookieLifetime) !== null && C !== void 0 ? C : 63072e3, wi = (I = v.sessionCookieTimeout) !== null && I !== void 0 ? I : 1800, $t = U(v), cr = N(v), Be = Z(v), ie = G(v), Sn, ur = new Date().getTime(), Tn, kn, $n, In, bi, On, Ee, Ce = 1, ft, Qe = ku(p, h, ie == "localStorage" || ie == "cookieAndLocalStorage", v.eventMethod, Ne, (b = v.bufferSize) !== null && b !== void 0 ? b : 1, (S = v.maxPostBytes) !== null && S !== void 0 ? S : 4e4, (T = v.maxGetBytes) !== null && T !== void 0 ? T : 0, (O = v.useStm) !== null && O !== void 0 ? O : !0, (D = v.maxLocalStorageQueueSize) !== null && D !== void 0 ? D : 1e3, (j = v.connectionTimeout) !== null && j !== void 0 ? j : 5e3, cr, (Y = v.customHeaders) !== null && Y !== void 0 ? Y : {}, (K = v.withCredentials) !== null && K !== void 0 ? K : !0, (J = v.retryStatusCodes) !== null && J !== void 0 ? J : [], ((te = v.dontRetryStatusCodes) !== null && te !== void 0 ? te : []).concat([400, 401, 403, 410, 422]), v.idService), Ai = !1, xi = !1, ye = {
            enabled: !1,
            installed: !1,
            configurations: {}
        }, ca = (P = (ue = v.contexts) === null || ue === void 0 ? void 0 : ue.session) !== null && P !== void 0 ? P : !1, Pn, En = v.onSessionUpdateCallback, fr = !1;
        v.hasOwnProperty("discoverRootDomain") && v.discoverRootDomain && (qt = _u(An, xn));
        var Cn = Dr()
          , ua = Cn.browserLanguage
          , fa = Cn.resolution
          , da = Cn.colorDepth
          , pa = Cn.cookiesEnabled;
        ne.setTrackerVersion(a),
        ne.setTrackerNamespace(i),
        ne.setAppId(wn),
        ne.setPlatform(Ke),
        ne.addPayloadPair("cookie", pa ? "1" : "0"),
        ne.addPayloadPair("cs", Ae),
        ne.addPayloadPair("lang", ua),
        ne.addPayloadPair("res", fa),
        ne.addPayloadPair("cd", da),
        $i(),
        Di(),
        v.crossDomainLinker && Ti(v.crossDomainLinker);
        function dt() {
            ke = wo(window.location.hostname, window.location.href, Or()),
            ke[1] !== Pe && (ut = Or(Pe)),
            We = yo(ke[0]),
            Pe = ke[1]
        }
        function Si(_) {
            var x = new Date().getTime()
              , E = _.currentTarget;
            E != null && E.href && (E.href = gu(E.href, "_sp", On + "." + x))
        }
        function Ti(_) {
            for (var x = 0; x < document.links.length; x++) {
                var E = document.links[x];
                !E.spDecorationEnabled && _(E) && (tt(E, "click", Si, !0),
                tt(E, "mousedown", Si, !0),
                E.spDecorationEnabled = !0)
            }
        }
        function pt(_) {
            var x;
            return hi && (x = new RegExp("#.*"),
            _ = _.replace(x, "")),
            mi && (x = new RegExp("[{}]","g"),
            _ = _.replace(x, "")),
            _
        }
        function ki(_) {
            var x = new RegExp("^([a-z]+):")
              , E = x.exec(_);
            return E ? E[1] : null
        }
        function va(_, x) {
            var E = ki(x), ve;
            return E ? x : x.slice(0, 1) === "/" ? ki(_) + "://" + Xr(_) + x : (_ = pt(_),
            (ve = _.indexOf("?")) >= 0 && (_ = _.slice(0, ve)),
            (ve = _.lastIndexOf("/")) !== _.length - 1 && (_ = _.slice(0, ve + 1)),
            _ + x)
        }
        function ha(_) {
            _i || Pn || Qe.enqueueRequest(_.build(), xe)
        }
        function It(_) {
            return la + _ + "." + bi
        }
        function dr(_) {
            var x = It(_);
            if (ie == "localStorage")
                return hu(x);
            if (ie == "cookie" || ie == "cookieAndLocalStorage")
                return mt(x)
        }
        function $i() {
            dt(),
            bi = iu((qt || We) + (ar || "/")).slice(0, 4)
        }
        function Kt() {
            var _ = new Date;
            Sn = _.getTime()
        }
        function ma() {
            ga(),
            Kt()
        }
        function Ii() {
            var _ = document.documentElement;
            return _ ? [_.scrollLeft || window.pageXOffset, _.scrollTop || window.pageYOffset] : [0, 0]
        }
        function Oi() {
            var _ = Ii()
              , x = _[0];
            Tn = x,
            kn = x;
            var E = _[1];
            $n = E,
            In = E
        }
        function ga() {
            var _ = Ii()
              , x = _[0];
            x < Tn ? Tn = x : x > kn && (kn = x);
            var E = _[1];
            E < $n ? $n = E : E > In && (In = E)
        }
        function Dn(_) {
            return Math.round(_)
        }
        function pr() {
            var _ = It("ses")
              , x = "*";
            return Pi(_, x, wi)
        }
        function vr(_) {
            var x = It("id")
              , E = Mu(_);
            return Pi(x, E, yi)
        }
        function Pi(_, x, E) {
            return Be && !$t ? !1 : ie == "localStorage" ? Yn(_, x, E) : ie == "cookie" || ie == "cookieAndLocalStorage" ? (mt(_, x, E, ar, qt, An, xn),
            document.cookie.indexOf("".concat(_, "=")) !== -1) : !1
        }
        function Ei(_) {
            var x = It("id")
              , E = It("ses");
            ho(x),
            ho(E),
            nr(x, qt, An, xn),
            nr(E, qt, An, xn),
            _ != null && _.preserveSession || (Ee = et.v4(),
            Ce = 1),
            _ != null && _.preserveUser || (On = Be ? "" : et.v4(),
            ft = null)
        }
        function Ci(_) {
            _ && _.stateStorageStrategy && (v.stateStorageStrategy = _.stateStorageStrategy,
            ie = G(v)),
            Be = Z(v),
            $t = U(v),
            cr = N(v),
            Qe.setUseLocalStorage(ie == "localStorage" || ie == "cookieAndLocalStorage"),
            Qe.setAnonymousTracking(cr)
        }
        function Di() {
            if (!(Be && !$t)) {
                var _ = ie != "none" && !!dr("ses")
                  , x = Qt();
                On = Eu(x, Be),
                _ ? Ee = Er(x) : Ee = en(x),
                Ce = Cr(x),
                ie != "none" && (pr(),
                Pr(x),
                vr(x))
            }
        }
        function Qt() {
            if (ie == "none")
                return Ou();
            var _ = dr("id") || void 0;
            return Pu(_, On, Ee, Ce)
        }
        function Mi(_) {
            return _.indexOf("http") === 0 ? _ : (document.location.protocol === "https:" ? "https" : "http") + "://" + _
        }
        function Bi() {
            (!Ai || h.pageViewId == null) && (h.pageViewId = et.v4())
        }
        function hr() {
            return h.pageViewId == null && (h.pageViewId = et.v4()),
            h.pageViewId
        }
        function Li() {
            if (ie === "none" || Be || !pe)
                return null;
            var _ = "_sp_tab_id"
              , x = mo(_);
            return x || (mu(_, et.v4()),
            x = mo(_)),
            x || null
        }
        function _a() {
            return {
                contexts: function() {
                    return [{
                        schema: Au,
                        data: {
                            id: hr()
                        }
                    }]
                }
            }
        }
        function ya() {
            return {
                contexts: function() {
                    return [{
                        schema: xu,
                        data: Ie(Ie({}, Dr()), {
                            tabId: Li()
                        })
                    }]
                }
            }
        }
        function wa() {
            var _ = function(E) {
                return Be ? null : E
            }
              , x = function(E) {
                return $t ? E : _(E)
            };
            return {
                beforeTrack: function(E) {
                    var ve = dr("ses")
                      , le = Qt()
                      , Je = Lu(le) === 0;
                    if (lr ? Pn = !!mt(lr) : Pn = !1,
                    _i || Pn) {
                        Ei();
                        return
                    }
                    ei(le) ? (!ve && ie != "none" ? Ee = en(le) : Ee = Er(le),
                    Ce = Cr(le)) : new Date().getTime() - ur > wi * 1e3 && (Ce++,
                    Ee = en(le, {
                        memorizedVisitCount: Ce
                    })),
                    Pr(le),
                    Cu(le, E),
                    Du(le);
                    var Se = Dr()
                      , Ot = Se.viewport
                      , Jt = Se.documentSize;
                    E.add("vp", Ot),
                    E.add("ds", Jt),
                    E.add("vid", x(Ce)),
                    E.add("sid", x(Ee)),
                    E.add("duid", _(Bu(le))),
                    E.add("uid", _(ft)),
                    dt(),
                    E.add("refr", pt(qe || ut)),
                    E.add("url", pt(bn || Pe));
                    var Xt = bo(le, ie, Be);
                    if (ca && (!Be || $t) && ba(E, Xt),
                    ie != "none") {
                        vr(le);
                        var gr = pr();
                        (!ve || Je) && gr && En && !fr && (En(Xt),
                        fr = !1)
                    }
                    ur = new Date().getTime()
                }
            }
        }
        function ba(_, x) {
            var E = {
                schema: Su,
                data: x
            };
            _.addContextEntity(E)
        }
        function Aa() {
            var _ = Qt();
            if (ei(_) ? (ie != "none" ? Ee = en(_) : Ee = Er(_),
            Ce = Cr(_)) : (Ce++,
            Ee = en(_, {
                memorizedVisitCount: Ce
            })),
            Pr(_),
            ie != "none") {
                var x = bo(_, ie, Be);
                vr(_);
                var E = pr();
                E && En && (fr = !0,
                En(x))
            }
            ur = new Date().getTime()
        }
        function mr(_, x) {
            return (_ || []).concat(x ? x() : [])
        }
        function xa(_) {
            var x = _.title
              , E = _.context
              , ve = _.timestamp
              , le = _.contextCallback;
            dt(),
            xi && Bi(),
            xi = !0,
            kt = document.title,
            Wt = x;
            var Je = _o(Wt || kt);
            ne.track(Xc({
                pageUrl: pt(bn || Pe),
                pageTitle: Je,
                referrer: pt(qe || ut)
            }), mr(E, le), ve);
            var Se = new Date
              , Ot = !1;
            if (ye.enabled && !ye.installed) {
                ye.installed = !0,
                Ot = !0;
                var Jt = {
                    update: function() {
                        if (typeof window < "u" && typeof window.addEventListener == "function") {
                            var Pt = !1
                              , Mn = Object.defineProperty({}, "passive", {
                                get: function() {
                                    Pt = !0
                                },
                                set: function() {}
                            })
                              , zi = function() {};
                            window.addEventListener("testPassiveEventSupport", zi, Mn),
                            window.removeEventListener("testPassiveEventSupport", zi, Mn),
                            Jt.hasSupport = Pt
                        }
                    }
                };
                Jt.update();
                var Xt = "onwheel"in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
                Object.prototype.hasOwnProperty.call(Jt, "hasSupport") ? tt(document, Xt, Kt, {
                    passive: !0
                }) : tt(document, Xt, Kt),
                Oi();
                var gr = ["click", "mouseup", "mousedown", "mousemove", "keypress", "keydown", "keyup", "touchend", "touchstart"]
                  , $a = ["resize", "focus", "blur"]
                  , _r = function(Ia, Pt) {
                    return Pt === void 0 && (Pt = Kt),
                    function(Mn) {
                        return tt(document, Mn, Pt)
                    }
                };
                gr.forEach(_r(document)),
                $a.forEach(_r(window)),
                _r(window, ma)("scroll")
            }
            if (ye.enabled && (aa || Ot)) {
                Sn = Se.getTime();
                var Vi = void 0;
                for (Vi in ye.configurations) {
                    var yr = ye.configurations[Vi];
                    yr && (window.clearInterval(yr.activityInterval),
                    Sa(yr, E, le))
                }
            }
        }
        function Sa(_, x, E) {
            var ve = function(Se, Ot) {
                dt(),
                Se({
                    context: Ot,
                    pageViewId: hr(),
                    minXOffset: Tn,
                    minYOffset: $n,
                    maxXOffset: kn,
                    maxYOffset: In
                }),
                Oi()
            }
              , le = function() {
                var Se = new Date;
                Sn + _.configMinimumVisitLength > Se.getTime() && ve(_.callback, mr(x, E)),
                _.activityInterval = window.setInterval(Je, _.configHeartBeatTimer)
            }
              , Je = function() {
                var Se = new Date;
                Sn + _.configHeartBeatTimer > Se.getTime() && ve(_.callback, mr(x, E))
            };
            _.configMinimumVisitLength === 0 ? _.activityInterval = window.setInterval(Je, _.configHeartBeatTimer) : _.activityInterval = window.setTimeout(le, _.configMinimumVisitLength)
        }
        function Ri(_) {
            var x = _.minimumVisitLength
              , E = _.heartbeatDelay
              , ve = _.callback;
            if (go(x) && go(E))
                return {
                    configMinimumVisitLength: x * 1e3,
                    configHeartBeatTimer: E * 1e3,
                    callback: ve
                };
            Re.error("Activity tracking minimumVisitLength & heartbeatDelay must be integers")
        }
        function Ta(_) {
            var x = _.context
              , E = _.minXOffset
              , ve = _.minYOffset
              , le = _.maxXOffset
              , Je = _.maxYOffset
              , Se = document.title;
            Se !== kt && (kt = Se,
            Wt = void 0),
            ne.track(eu({
                pageUrl: pt(bn || Pe),
                pageTitle: _o(Wt || kt),
                referrer: pt(qe || ut),
                minXOffset: Dn(E),
                maxXOffset: Dn(le),
                minYOffset: Dn(ve),
                maxYOffset: Dn(Je)
            }), x)
        }
        function Ni(_) {
            var x = ye.configurations[_];
            (x == null ? void 0 : x.configMinimumVisitLength) === 0 ? window.clearTimeout(x == null ? void 0 : x.activityInterval) : window.clearInterval(x == null ? void 0 : x.activityInterval),
            ye.configurations[_] = void 0
        }
        var ka = {
            getDomainSessionIndex: function() {
                return Ce
            },
            getPageViewId: hr,
            getTabId: Li,
            newSession: Aa,
            getCookieName: function(_) {
                return It(_)
            },
            getUserId: function() {
                return ft
            },
            getDomainUserId: function() {
                return Qt()[1]
            },
            getDomainUserInfo: function() {
                return Qt()
            },
            setReferrerUrl: function(_) {
                qe = _
            },
            setCustomUrl: function(_) {
                dt(),
                bn = va(Pe, _)
            },
            setDocumentTitle: function(_) {
                kt = document.title,
                Wt = _
            },
            discardHashTag: function(_) {
                hi = _
            },
            discardBrace: function(_) {
                mi = _
            },
            setCookiePath: function(_) {
                ar = _,
                $i()
            },
            setVisitorCookieTimeout: function(_) {
                yi = _
            },
            crossDomainLinker: function(_) {
                Ti(_)
            },
            enableActivityTracking: function(_) {
                ye.configurations.pagePing || (ye.enabled = !0,
                ye.configurations.pagePing = Ri(Ie(Ie({}, _), {
                    callback: Ta
                })))
            },
            enableActivityTrackingCallback: function(_) {
                ye.configurations.callback || (ye.enabled = !0,
                ye.configurations.callback = Ri(_))
            },
            disableActivityTracking: function() {
                Ni("pagePing")
            },
            disableActivityTrackingCallback: function() {
                Ni("callback")
            },
            updatePageActivity: function() {
                Kt()
            },
            setOptOutCookie: function(_) {
                lr = _
            },
            setUserId: function(_) {
                ft = _
            },
            setUserIdFromLocation: function(_) {
                dt(),
                ft = un(_, Pe)
            },
            setUserIdFromReferrer: function(_) {
                dt(),
                ft = un(_, ut)
            },
            setUserIdFromCookie: function(_) {
                ft = mt(_)
            },
            setCollectorUrl: function(_) {
                xe = Mi(_),
                Qe.setCollectorUrl(xe)
            },
            setBufferSize: function(_) {
                Qe.setBufferSize(_)
            },
            flushBuffer: function(_) {
                _ === void 0 && (_ = {}),
                Qe.executeQueue(),
                _.newBufferSize && Qe.setBufferSize(_.newBufferSize)
            },
            trackPageView: function(_) {
                _ === void 0 && (_ = {}),
                xa(_)
            },
            preservePageViewId: function() {
                Ai = !0
            },
            disableAnonymousTracking: function(_) {
                v.anonymousTracking = !1,
                Ci(_),
                Di(),
                Qe.executeQueue()
            },
            enableAnonymousTracking: function(_) {
                var x;
                v.anonymousTracking = (x = _ && (_ == null ? void 0 : _.options)) !== null && x !== void 0 ? x : !0,
                Ci(_),
                $t || Bi()
            },
            clearUserData: Ei
        };
        return Ie(Ie({}, ka), {
            id: p,
            namespace: i,
            core: ne,
            sharedState: h
        })
    }
      , c = u(e, n, t, r, o, s)
      , f = Ie(Ie({}, c), {
        addPlugin: function(p) {
            var i, a;
            f.core.addPlugin(p),
            (a = (i = p.plugin).activateBrowserPlugin) === null || a === void 0 || a.call(i, f)
        }
    });
    return l.forEach(function(p) {
        var i;
        (i = p.activateBrowserPlugin) === null || i === void 0 || i.call(p, f)
    }),
    f
}
var on = {};
function ui(e, n) {
    try {
        Uu(e != null ? e : Fu()).forEach(n)
    } catch (t) {
        Re.error("Function failed", t)
    }
}
function Hu(e, n, t, r, o, s) {
    return on.hasOwnProperty(e) ? null : (on[e] = zu(e, n, t, r, o, s),
    on[e])
}
function Uu(e) {
    return ju(e, on)
}
function Fu() {
    return Object.keys(on)
}
function ju(e, n) {
    for (var t = [], r = 0, o = e; r < o.length; r++) {
        var s = o[r];
        n.hasOwnProperty(s) ? t.push(n[s]) : Re.warn(s + " not configured")
    }
    return t
}
var Gu = function() {
    function e() {
        this.outQueues = [],
        this.bufferFlushers = [],
        this.hasLoaded = !1,
        this.registeredOnLoadHandlers = []
    }
    return e
}();
function Zu() {
    var e = new Gu
      , n = document
      , t = window;
    function r() {
        n.visibilityState == "hidden" && e.bufferFlushers.forEach(function(u) {
            u(!1)
        })
    }
    function o() {
        e.bufferFlushers.forEach(function(u) {
            u(!1)
        })
    }
    function s() {
        var u;
        if (!e.hasLoaded)
            for (e.hasLoaded = !0,
            u = 0; u < e.registeredOnLoadHandlers.length; u++)
                e.registeredOnLoadHandlers[u]();
        return !0
    }
    function l() {
        n.addEventListener ? n.addEventListener("DOMContentLoaded", function u() {
            n.removeEventListener("DOMContentLoaded", u, !1),
            s()
        }) : n.attachEvent && n.attachEvent("onreadystatechange", function u() {
            n.readyState === "complete" && (n.detachEvent("onreadystatechange", u),
            s())
        }),
        tt(t, "load", s, !1)
    }
    return n.visibilityState && tt(n, "visibilitychange", r, !1),
    tt(t, "beforeunload", o, !1),
    document.readyState === "loading" ? l() : s(),
    e
}
/*!
 * Browser tracker for Snowplow v3.16.0 (http://bit.ly/sp-js)
 * Copyright 2022 Snowplow Analytics Ltd, 2010 Anthon Pang
 * Licensed under BSD-3-Clause
 */
function Yu(e, n) {
    ui(n, function(t) {
        t.enableActivityTracking(e)
    })
}
function Wu(e, n) {
    ui(n, function(t) {
        t.trackPageView(e)
    })
}
function qu(e, n) {
    ui(n, function(t) {
        t.core.track(Jc({
            event: e.event
        }), e.context, e.timestamp)
    })
}
var Ao = typeof window < "u" ? Zu() : void 0;
function Ku(e, n, t) {
    if (t === void 0 && (t = {}),
    Ao)
        return Hu(e, e, "js-".concat(tu), n, Ao, t)
}
const Qu = "brawlstars-cctv-prod"
  , Ju = "https://collector.snowplow.supercell.com"
  , Xu = ()=>{
    Ku("sp1", Ju, {
        appId: Qu,
        plugins: []
    })
}
  , ef = ()=>Yu({
    minimumVisitLength: 5,
    heartbeatDelay: 20
})
  , tf = (e,n,t,r={})=>{
    qu({
        event: {
            schema: "iglu:com.supercell/button_click/jsonschema/1-0-0",
            data: {
                button_id: e,
                button_name: n
            }
        },
        context: [{
            schema: "iglu:com.snowplowanalytics.snowplow/additional_information/jsonschema/1-0-0",
            data: me({
                page: t
            }, r)
        }]
    })
}
  , de = {
    init: Xu,
    setupActivityTracking: ef,
    trackPageView: Wu,
    trackClickEvent: tf
}
  , nf = [{
    postDate: "2023-11-03",
    bgSrc: {
        png: "scenes/scene/bg.png"
    },
    transitionVideoSrc: {
        mp4: "scenes/scene/transition-video.mp4"
    }
}]
  , rf = nf
  , of = Zt(rf)
  , fi = ()=>{
    const e = of()[0];
    return vt(me({}, e), {
        bgSrc: St(e.bgSrc.png),
        transitionVideoSrc: St(e.transitionVideoSrc.mp4)
    })
}
  , sf = [{
    src: {
        jpg: "logs/log/logbook-2.jpg"
    },
    postDate: "2023-11-03"
}, {
    src: {
        jpg: "logs/log/logbook-1.jpg"
    },
    postDate: "2023-11-02"
}]
  , af = sf
  , lf = Zt(af)
  , Ns = ()=>lf().map(n=>vt(me({}, n), {
    src: St(n.src.jpg)
}))
  , cf = "/assets/instructions-modal-overlay-b0399863.png"
  , di = "/assets/terminal-logo-7a935f92.png"
  , Vs = "/assets/logbook-page-bg-left-d97e3458.jpg"
  , zs = "/assets/logbook-page-bg-right-98ad4729.jpg"
  , Hs = "/assets/logbook-first-page-4594a73f.jpg"
  , uf = "/assets/player-controls-bg-272e65c2.jpg"
  , Us = e=>e.reduce((n,t,r,o)=>(r % 2 === 0 && n.push(e.slice(r, r + 2)),
n), [])
  , Fs = async e=>new Promise(n=>{
    const t = new Image;
    t.onload = ()=>n(t),
    t.src = e
}
);
var Ft = (e=>(e[e.initializing = 0] = "initializing",
e[e["loading-assets"] = 1] = "loading-assets",
e[e["video-transition"] = 2] = "video-transition",
e[e.done = 3] = "done",
e))(Ft || {});
const ff = fi()
  , df = Ns()
  , pf = ()=>{
    const e = [Vs, zs]
      , n = [...df.map(o=>o.src), null].reverse();
    n.length === 1 && e.push(Hs);
    const t = Us(n)
      , r = t[t.length - 1];
    return r && e.push(...r.filter(o=>!!o)),
    e
}
  , vf = [ff.bgSrc, cf, di, uf, ...pf()]
  , [js,pi] = W(0)
  , [hf,mf] = W(!1)
  , [gf,_f] = W(!1)
  , yf = async()=>{
    pi(1);
    const e = vf.map(n=>Fs(n));
    await Promise.allSettled(e),
    mf(!0)
}
  , Gs = ()=>{
    window.location.href = "brawlstars-inbox://cctvloaded"
}
;
_e(()=>{
    hf() && gf() && (Gs(),
    pi(2))
}
);
_e(()=>{
    js() === 3 && Gs()
}
);
const wf = ()=>{
    _f(!0)
}
  , bf = ()=>{
    pi(3)
}
  , nt = {
    init: yf,
    currentStatus: js,
    onVideoTransitionLoaded: wf,
    onVideoTransitionEnd: bf
}
  , Zs = e=>e[Math.floor(Math.random() * e.length)];
function Ys(e) {
    var n, t, r = "";
    if (typeof e == "string" || typeof e == "number")
        r += e;
    else if (typeof e == "object")
        if (Array.isArray(e))
            for (n = 0; n < e.length; n++)
                e[n] && (t = Ys(e[n])) && (r && (r += " "),
                r += t);
        else
            for (n in e)
                e[n] && (r && (r += " "),
                r += n);
    return r
}
function Af() {
    for (var e, n, t = 0, r = ""; t < arguments.length; )
        (e = arguments[t++]) && (n = Ys(e)) && (r && (r += " "),
        r += n);
    return r
}
const xo = e=>typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e
  , ge = Af
  , _n = (e,n)=>t=>{
    var r;
    if ((n == null ? void 0 : n.variants) == null)
        return ge(e, t == null ? void 0 : t.class, t == null ? void 0 : t.className);
    const {variants: o, defaultVariants: s} = n
      , l = Object.keys(o).map(f=>{
        const p = t == null ? void 0 : t[f]
          , i = s == null ? void 0 : s[f];
        if (p === null)
            return null;
        const a = xo(p) || xo(i);
        return o[f][a]
    }
    )
      , u = t && Object.entries(t).reduce((f,p)=>{
        let[i,a] = p;
        return a === void 0 || (f[i] = a),
        f
    }
    , {})
      , c = n == null || (r = n.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((f,p)=>{
        let h = p
          , {class: i, className: a} = h
          , d = ji(h, ["class", "className"]);
        return Object.entries(d).every(v=>{
            let[g,m] = v;
            return Array.isArray(m) ? m.includes(me(me({}, s), u)[g]) : me(me({}, s), u)[g] === m
        }
        ) ? [...f, i, a] : f
    }
    , []);
    return ge(e, l, c, t == null ? void 0 : t.class, t == null ? void 0 : t.className)
}
  , xf = (e,n)=>{
    const t = e * n / 100;
    return e - t
}
  , So = e=>e.touches.length === 2
  , To = e=>Math.hypot(e[0].pageX - e[1].pageX, e[0].pageY - e[1].pageY)
  , Sf = e=>{
    const [n,t] = Gt({
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
    })
      , r = ()=>{
        t("isEnabled", !0)
    }
      , o = ()=>{
        t("isEnabled", !1)
    }
      , s = ()=>{
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
    }
      , l = f=>{
        !So(f) || !n.isEnabled || (f.preventDefault(),
        t({
            isZooming: !0,
            start: {
                distance: To(f.touches),
                x: (f.touches[0].pageX + f.touches[1].pageX) / 2,
                y: (f.touches[0].pageY + f.touches[1].pageY) / 2
            }
        }))
    }
      , u = f=>{
        !So(f) || !n.isEnabled || (f.preventDefault(),
        t(p=>{
            const i = "scale"in f ? f.scale : To(f.touches) / n.start.distance
              , a = (f.touches[0].pageX + f.touches[1].pageX) / 2 - p.start.x
              , d = (f.touches[0].pageY + f.touches[1].pageY) / 2 - p.start.y;
            return {
                scale: Math.min(Math.max(1, xf(i, 10)), 4),
                delta: {
                    x: a,
                    y: d
                }
            }
        }
        ))
    }
      , c = ()=>{
        s()
    }
    ;
    return vn(()=>{
        var f, p, i;
        (f = e.targetRef()) == null || f.addEventListener("touchstart", l),
        (p = e.targetRef()) == null || p.addEventListener("touchmove", u),
        (i = e.targetRef()) == null || i.addEventListener("touchend", c)
    }
    ),
    be(()=>{
        var f, p, i;
        (f = e.targetRef()) == null || f.removeEventListener("touchstart", l),
        (p = e.targetRef()) == null || p.removeEventListener("touchmove", u),
        (i = e.targetRef()) == null || i.removeEventListener("touchend", c)
    }
    ),
    {
        data: n,
        controls: {
            enable: r,
            disable: o
        }
    }
}
  , Tf = H('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="m8 36 17-12L8 12v24Zm18-24v24l17-12-17-12Z">')
  , kf = (e={})=>(()=>{
    const n = Tf();
    return Ze(n, e, !0, !0),
    n
}
)()
  , $f = H('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="M22 36V12L5 24l17 12Zm1-12 17 12V12L23 24Z">')
  , If = (e={})=>(()=>{
    const n = $f();
    return Ze(n, e, !0, !0),
    n
}
)()
  , Of = H('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 104 68"><path fill="currentColor" d="M60.66 16.06c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4Zm9.54-26.81c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36-4.06-.01-6.57-.12-7.52-.36Zm0 17.9c-.96-.24-1.43-.86-1.43-1.88 0-1.01.48-1.64 1.43-1.88s3.46-.36 7.52-.36 6.57.12 7.52.36c.95.24 1.43.87 1.43 1.88 0 1.02-.48 1.64-1.43 1.88-.96.24-3.46.36-7.52.36s-6.57-.12-7.52-.36Zm3.89-8.99c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .95-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.14-3.63-.4Zm13.43-17.91c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85 0-3.06-.13-3.63-.4Zm0 35.81c-.57-.27-.85-.88-.85-1.83 0-.95.28-1.57.85-1.84s1.78-.4 3.63-.4c1.85 0 3.06.13 3.63.4.57.27.85.88.85 1.84 0 .96-.28 1.57-.85 1.83-.57.27-1.78.4-3.63.4-1.85.01-3.06-.13-3.63-.4Zm-67.95-34.7c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm7.67-7.34c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.61c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33Zm12.74 6.6c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.22 3.22-.33 7.01-.33Zm7.67 7.34c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79 0-6.12-.11-7.01-.33-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.88-.21 3.22-.33 7.01-.33ZM1.43 31.5c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.43-.14-4.07-.45Zm-.48 8.28c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.07 0-3.43-.15-4.07-.45Zm37.59-21.96c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45-2.08.01-3.44-.14-4.07-.45ZM8.47 23.97c-.89-.22-1.34-.81-1.34-1.75 0-.95.45-1.53 1.34-1.75.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75 0 .95-.45 1.53-1.34 1.75-.89.22-3.23.33-7.01.33-3.79.01-6.12-.1-7.01-.33Zm30.07 31.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45 2.07 0 3.43.15 4.07.45.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.44-.15-4.07-.45Z">')
  , Pf = (e={})=>(()=>{
    const n = Of();
    return Ze(n, e, !0, !0),
    n
}
)()
  , Ef = H('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="M12 38h8V10h-8v28Zm16-28v28h8V10h-8Z">')
  , Cf = (e={})=>(()=>{
    const n = Ef();
    return Ze(n, e, !0, !0),
    n
}
)()
  , Df = H('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="M16 10v28l22-14-22-14Z">')
  , Mf = (e={})=>(()=>{
    const n = Df();
    return Ze(n, e, !0, !0),
    n
}
)()
  , Bf = H('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><path fill="currentColor" d="M23.495 27.969c2.28 0 4.13-1.913 4.13-4.273 0-2.36-1.85-4.273-4.13-4.273-2.281 0-4.13 1.913-4.13 4.273 0 2.36 1.849 4.273 4.13 4.273Z"></path><path fill="currentColor" d="M31.073 15.863a2.047 2.047 0 0 0-.137-.13 11.945 11.945 0 0 0-.504-.476 1.942 1.942 0 0 0-2.8.233c-.71.863-.609 2.162.225 2.897a7.06 7.06 0 0 1 2.374 5.306c0 2.261-1.068 4.39-2.856 5.695-.013.009-.023.02-.037.03a1.412 1.412 0 0 0-.066.05c-.909.636-1.15 1.913-.535 2.853a1.939 1.939 0 0 0 2.758.551c2.953-2.064 4.717-5.498 4.717-9.184-.003-2.952-1.118-5.734-3.139-7.825Z"></path><path fill="currentColor" d="M35.168 11.425a1.917 1.917 0 0 0-.156-.145 17.637 17.637 0 0 0-.829-.79 1.942 1.942 0 0 0-2.8.233c-.71.864-.61 2.163.225 2.897 2.805 2.47 4.413 6.069 4.413 9.873 0 4.199-1.981 8.154-5.297 10.585-.072.052-.143.11-.218.162-.908.636-1.147 1.913-.535 2.853a1.939 1.939 0 0 0 2.758.551C37.282 34.462 40 29.169 40 23.49c0-4.555-1.717-8.842-4.832-12.065ZM19.733 29.47a.87.87 0 0 1-.066-.049c-.013-.01-.024-.022-.037-.03-1.788-1.304-2.856-3.434-2.856-5.695 0-2.045.864-3.98 2.374-5.306a2.104 2.104 0 0 0 .225-2.898 1.94 1.94 0 0 0-2.8-.233 9.434 9.434 0 0 0-.503.477 2.158 2.158 0 0 0-.14.132c-2.024 2.086-3.14 4.868-3.14 7.828 0 3.686 1.765 7.118 4.718 9.184.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.905.617-.945.376-2.223-.533-2.858Z"></path><path fill="currentColor" d="M16.496 34.24c-.074-.053-.143-.11-.217-.162-3.316-2.429-5.298-6.383-5.298-10.585 0-3.804 1.608-7.403 4.413-9.872a2.103 2.103 0 0 0 .226-2.898 1.94 1.94 0 0 0-2.8-.232c-.29.252-.562.518-.83.789a2.98 2.98 0 0 0-.156.145C8.716 14.648 7 18.935 7 23.493c0 5.679 2.718 10.969 7.271 14.153.342.239.729.354 1.11.354.639 0 1.264-.318 1.648-.904.614-.943.376-2.22-.533-2.856Z">')
  , Lf = (e={})=>(()=>{
    const n = Bf();
    return Ze(n, e, !0, !0),
    n
}
)()
  , Rf = H('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.96 67.25"><path fill="currentColor" d="M86.24 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.65-7.86c-.42-.23-.63-.84-.63-1.83s.21-1.6.63-1.83C83.01.12 84.11 0 85.9 0s2.89.12 3.31.35c.42.23.63.84.63 1.83s-.21 1.6-.63 1.83c-.42.23-1.52.35-3.31.35s-2.89-.12-3.31-.35Zm6.77 15.72c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.18 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.18 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-3.7 7.86c-.39-.23-.58-.84-.58-1.83s.19-1.6.58-1.83c.39-.23 1.4-.35 3.04-.35s2.65.12 3.04.35c.39.23.58.84.58 1.83s-.19 1.6-.58 1.83c-.39.23-1.4.35-3.04.35s-2.65-.12-3.04-.35ZM61.57 11.87c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm3.12 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm2.99 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm.17 7.86c-.66-.23-.99-.84-.99-1.83s.33-1.6.99-1.83c.66-.23 2.4-.35 5.22-.35s4.56.12 5.22.35c.66.23.99.84.99 1.83s-.33 1.6-.99 1.83c-.66.23-2.4.35-5.22.35s-4.56-.12-5.22-.35Zm-.17 7.86c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-2.99 7.87c-.55-.23-.82-.84-.82-1.83s.27-1.6.82-1.83c.55-.23 1.98-.35 4.3-.35s3.76.12 4.3.35c.55.23.82.84.82 1.83s-.27 1.6-.82 1.83c-.55.23-1.98.35-4.3.35s-3.76-.12-4.3-.35Zm-3.12 7.86c-.46-.23-.69-.84-.69-1.83s.23-1.6.69-1.83c.46-.23 1.66-.35 3.6-.35s3.14.12 3.6.35c.46.23.69.84.69 1.83s-.23 1.6-.69 1.83c-.46.23-1.66.35-3.6.35s-3.14-.12-3.6-.35Zm-42-41.98c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm7.67-7.35c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33ZM13.37 43.5c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm12.74 6.6c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33Zm7.67 7.34c3.78 0 6.12.11 7.01.33.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33ZM1.43 31.39c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm-.48 8.27c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM38.54 17.7c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.49c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Zm0 7.48c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45ZM8.47 23.86c-.89-.22-1.34-.81-1.34-1.75s.45-1.53 1.34-1.75c.89-.22 3.23-.33 7.01-.33s6.12.11 7.01.33c.89.22 1.34.81 1.34 1.75s-.45 1.53-1.34 1.75c-.89.22-3.23.33-7.01.33s-6.12-.11-7.01-.33Zm30.07 31.26c-.64-.3-.95-.99-.95-2.06s.32-1.76.95-2.06c.64-.3 1.99-.45 4.07-.45s3.43.15 4.07.45c.64.3.95.99.95 2.06s-.32 1.76-.95 2.06c-.64.3-1.99.45-4.07.45s-3.43-.15-4.07-.45Z">')
  , Nf = (e={})=>(()=>{
    const n = Rf();
    return Ze(n, e, !0, !0),
    n
}
)()
  , Vf = {
    "fast-forward": kf,
    "fast-rewind": If,
    mute: Pf,
    pause: Cf,
    play: Mf,
    live: Lf,
    unmute: Nf
}
  , zf = H("<span>")
  , Ws = e=>{
    const [n,t] = ri(e, ["name"]);
    return (()=>{
        const r = zf();
        return Ze(r, t, !1, !0),
        B(r, k(ts, {
            get component() {
                return Vf[n.name]
            }
        })),
        r
    }
    )()
}
  , yn = _n("", {
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
})
  , re = e=>{
    const [n,t] = ri(e, ["size", "as", "class", "children"]);
    return k(ts, Ga({
        get component() {
            return n.as || "span"
        },
        get class() {
            return yn({
                size: n.size,
                class: n.class
            })
        }
    }, t, {
        get children() {
            return n.children
        }
    }))
}
  , Hf = H('<div class="absolute top-0 left-0 bg-black z-10 wh-full">')
  , Uf = H('<div class="absolute top-72 left-72 flex items-center space-x-8 text-white">')
  , ko = H("<span>")
  , Ff = {
    "seeking-fwd": "seeking-fwd",
    "seeking-bwd": "seeking-bwd",
    ready: "ready",
    playing: "playing",
    error: "error"
}
  , jf = {
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
    },
    error: {
        text: ""
    }
}
  , Gf = e=>{
    const [n,t] = W(void 0)
      , [r,o] = W(void 0);
    let s;
    _e(()=>{
        const c = e.screen.status();
        if (c === "syncing")
            return;
        const p = e.screen.isAtEdge() && c === "playing" ? "live" : Ff[c];
        t(p),
        (p === "playing" || p === "live") && (s = setTimeout(()=>t(void 0), 1500)),
        be(()=>clearTimeout(s))
    }
    );
    const l = ()=>n() ? jf[n()] : void 0
      , u = ()=>!!l();
    return _e(()=>{
        if (!u())
            return o(void 0);
        const c = e.screen.feed().playlistId && Ht().find(h=>h.playlistId === e.screen.feed().playlistId)
          , f = c ? vs(c.postDate, c.dropTime.hours, c.dropTime.minutes) : hs(cs)
          , p = e.screen.isLive() ? f : f.add(e.screen.duration(), "seconds")
          , i = n() === "seeking-bwd" || n() === "seeking-fwd" ? e.screen.time() : ae(e.screen.time)
          , a = e.screen.duration() - i
          , d = p.subtract(a, "seconds");
        o({
            date: d.format("DD.MM.[95]"),
            time: d.format("HH:mm:ss")
        })
    }
    ),
    k(es, {
        get children() {
            return [k(Mt, {
                get when() {
                    return n() === "error"
                },
                get children() {
                    return Hf()
                }
            }), k(Mt, {
                get when() {
                    return u()
                },
                get children() {
                    return [(()=>{
                        const c = Uf();
                        return B(c, k(re, {
                            size: "screen-overlay-md",
                            get children() {
                                var f;
                                return (f = l()) == null ? void 0 : f.text
                            }
                        }), null),
                        B(c, k(je, {
                            get when() {
                                var f;
                                return (f = l()) == null ? void 0 : f.icon
                            },
                            get children() {
                                return k(Ws, {
                                    get name() {
                                        var f;
                                        return (f = l()) == null ? void 0 : f.icon
                                    },
                                    class: "w-[85px] pt-5"
                                })
                            }
                        }), null),
                        c
                    }
                    )(), k(je, {
                        get when() {
                            return Te(()=>n() !== "error")() && !!r()
                        },
                        get children() {
                            return k(re, {
                                as: "div",
                                size: "screen-overlay-sm",
                                class: "absolute bottom-72 left-72 flex flex-col items-start text-white",
                                get children() {
                                    return [(()=>{
                                        const c = ko();
                                        return B(c, ()=>{
                                            var f;
                                            return (f = r()) == null ? void 0 : f.time
                                        }
                                        ),
                                        c
                                    }
                                    )(), (()=>{
                                        const c = ko();
                                        return B(c, ()=>{
                                            var f;
                                            return (f = r()) == null ? void 0 : f.date
                                        }
                                        ),
                                        c
                                    }
                                    )()]
                                }
                            })
                        }
                    })]
                }
            })]
        }
    })
}
  , Zf = H('<button class="absolute top-0 left-0 isolate"><div>')
  , Yf = {
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
}
  , Wf = e=>{
    const [n,t] = W(void 0);
    let r;
    const o = ()=>Yf[e.screen.position()]
      , {data: s, controls: l} = Sf({
        targetRef: n
    });
    return _e(()=>{
        nt.currentStatus() === Ft.done && Ge.dataUsageWarningDialog.accepted() && r && !e.screen.Player.isMounted() && e.screen.Player.mount(r)
    }
    ),
    be(()=>{
        e.screen.Player.unmount()
    }
    ),
    _e(()=>{
        e.screen.position() === "c" && !["initializing", "error"].includes(e.screen.status()) ? l.enable() : l.disable()
    }
    ),
    (()=>{
        const u = Zf()
          , c = u.firstChild;
        u.$$click = ()=>{
            var p;
            (p = e.onClick) == null || p.call(e)
        }
        ,
        De(t, u);
        const f = r;
        return typeof f == "function" ? De(f, c) : r = c,
        B(u, k(Gf, {
            get screen() {
                return e.screen
            }
        }), null),
        ee(p=>{
            const i = "".concat(o().coordinates.y, "px")
              , a = "".concat(o().coordinates.x, "px")
              , d = "".concat(o().size.width, "px")
              , h = "".concat(o().size.height, "px")
              , v = o().transformOrigin
              , g = s.isZooming ? "10" : void 0
              , m = "translate3d(".concat(s.delta.x, "px, ").concat(s.delta.y, "px, 0) rotateZ(").concat(o().rotation || 0, "deg) scale(").concat((o().scaleFactor || 1) * s.scale, ")")
              , y = o().hidden ? "hidden" : void 0
              , A = ge("Video", e.screen.status() === "initializing" && "invisible");
            return i !== p._v$ && ((p._v$ = i) != null ? u.style.setProperty("top", i) : u.style.removeProperty("top")),
            a !== p._v$2 && ((p._v$2 = a) != null ? u.style.setProperty("left", a) : u.style.removeProperty("left")),
            d !== p._v$3 && ((p._v$3 = d) != null ? u.style.setProperty("width", d) : u.style.removeProperty("width")),
            h !== p._v$4 && ((p._v$4 = h) != null ? u.style.setProperty("height", h) : u.style.removeProperty("height")),
            v !== p._v$5 && ((p._v$5 = v) != null ? u.style.setProperty("transform-origin", v) : u.style.removeProperty("transform-origin")),
            g !== p._v$6 && ((p._v$6 = g) != null ? u.style.setProperty("z-index", g) : u.style.removeProperty("z-index")),
            m !== p._v$7 && ((p._v$7 = m) != null ? u.style.setProperty("transform", m) : u.style.removeProperty("transform")),
            y !== p._v$8 && ((p._v$8 = y) != null ? u.style.setProperty("visibility", y) : u.style.removeProperty("visibility")),
            A !== p._v$9 && se(c, p._v$9 = A),
            p
        }
        , {
            _v$: void 0,
            _v$2: void 0,
            _v$3: void 0,
            _v$4: void 0,
            _v$5: void 0,
            _v$6: void 0,
            _v$7: void 0,
            _v$8: void 0,
            _v$9: void 0
        }),
        u
    }
    )()
}
;
Oe(["click"]);
const qs = {
    tl: "tl",
    bl: "bl",
    c: "c",
    tr: "tr",
    br: "br"
}
  , Ks = e=>{
    var n;
    return (n = Object.values(qs)[e]) != null ? n : "c"
}
  , qf = [{
    liveVideos: [{
        videoId: "6340306513112",
        adId: "live.LEzdBJRYWy-BPrGSuDy5gulMmBLZY0BLw1OcG9yGkhZC1Dhu8YpqTt0-EIbLoWr-u6bFfA4HuCbLuDtjdYQ743ac254kJkLTZY4Aaj_FRgip8OBa4wGvSlGQTy7aceFGDsCCTNk"
    }, {
        videoId: "6340305835112",
        adId: "live.HAsXc2pNokf5sjkXBcBQ0nXSmgGhxsyzsWXk7qWEYbn7jCdbeQ-1ynlhEHbReyb3IGgKJRg2sfLNDFuOKen49pbnklPPGlfN8OkAFVzxmBlXdSjiAHpf1LrAztYz8mVYU1azOuQ"
    }, {
        videoId: "6340306420112",
        adId: "live.KFMeMI1KoHoZ4RddwoKeZinrBgdTNHPATYuM5ooXr4bHLSN4culap1hxRF6bWxVlM06s6pdSyF-laPAwTk43O7IkylzyGUIiIuxilGQcIlOzYtV4k_niYai79aurUb8BNPtv7LI"
    }, {
        videoId: "6340305145112",
        adId: "live.SSmTvMZoR1y_gHELpSCsi9dSWNnElx2PuJuKH8EIGs52inPLYracLO40HZtxmu-LRUWF-dScs1OM0l4nNfWGLib1RIRmNiPrrib58wIIJ0-dw8TT4sURkAgXTp_RiBqNaIFs_N4"
    }, {
        videoId: "6340261061112",
        adId: "live.EtbpNijlIZO9Aop2wtfvjBbAgUYeI2L0CvFwn_HMAl8l2y0pKyNI-H_Ozrxe-KfMZElPCxh8oEJnhiScbY1q1zv4NvCJqqGsfiVtq9hJlxOL9taNQt0scEnZBuT2YyBizRpO0c4"
    }],
    postDate: "2023-11-02"
}]
  , Kf = qf
  , Qf = Zt(Kf)
  , Jf = ()=>Qf()[0]
  , Xf = (e=!0)=>{
    let n = ss;
    return {
        get abort() {
            return n
        },
        exec: t=>(e && n(),
        Promise.race([new Promise((r,o)=>n = ()=>o(new Error("aborted"))), new Promise(r=>t(r))]))
    }
}
  , ed = e=>{
    const {multiplier: n=4} = e != null ? e : {};
    let t = ss
      , r = null;
    const u = {
        onTick: c=>(t = c,
        u),
        start: ()=>(r === null && (r = setInterval(()=>{
            t()
        }
        , 1e3 / n)),
        u),
        stop: ()=>(r !== null && (clearInterval(r),
        r = null),
        u)
    };
    return u
}
  , td = e=>{
    const n = Jo()
      , t = ed()
      , r = Xf()
      , [o,s] = W(null)
      , [l,u] = W(0)
      , [c,f] = W(e.initialFeed)
      , [p,i] = W(null)
      , [a,d] = W("initializing")
      , [h,v] = W(e.initialPosition)
      , g = ()=>!!p()
      , m = ()=>h() === "c"
      , y = ()=>{
        var b;
        return !!((b = p()) != null && b.liveTracker.isLive())
    }
      , A = ()=>a() !== "error" && a() !== "initializing"
      , w = ()=>{
        var b;
        return y() && !!((b = p()) != null && b.liveTracker.atLiveEdge())
    }
      , $ = ()=>{
        var b, S, T, O;
        return (O = (T = (b = p()) == null ? void 0 : b.liveTracker.liveCurrentTime()) != null ? T : (S = p()) == null ? void 0 : S.duration()) != null ? O : 0
    }
      , z = async b=>{
        try {
            const S = c()
              , O = await (await Ol(()=>import("./player-a81a58a0.js"), [])).initPlayer({
                refNode: b,
                videoId: S.videoId,
                adConfigId: S.videoId && S.adId,
                playlistId: S.playlistId,
                options: {
                    loop: !1
                }
            });
            if (!O)
                throw new Error;
            O.on("error", ()=>d("error")),
            O.on("timeupdate", ()=>u(O.currentTime())),
            O.one("canplay", ()=>d("ready")),
            O.one("playing", ()=>d("playing")),
            O.on("ended", ()=>d("ended")),
            i(O)
        } catch (S) {
            console.error(S),
            d("error")
        }
    }
      , F = async b=>{
        (b.videoId ? c().videoId === b.videoId : c().playlistId === b.playlistId) || (d("initializing"),
        s(null),
        f(b),
        await r.exec(S=>{
            var T, O, D;
            (T = p()) == null || T.pause(),
            (D = (O = p()) == null ? void 0 : O.catalog) == null || D.get({
                id: b.videoId || b.playlistId,
                adConfigId: b.adId,
                type: b.videoId ? "video" : "playlist"
            }, (j,Y)=>{
                var K, J, te;
                if (j)
                    d("error");
                else {
                    const ue = Array.isArray(Y) ? Y : [Y];
                    if (!ue.length)
                        return S();
                    const P = ue.length > 1
                      , G = Object.values(qs).indexOf(h())
                      , U = P ? ue[G % ue.length] : ue[0];
                    (J = (K = p()) == null ? void 0 : K.catalog) == null || J.load(U),
                    (te = p()) == null || te.one("canplay", ()=>{
                        var N;
                        (N = p()) == null || N.play(),
                        d("playing"),
                        S()
                    }
                    )
                }
            }
            )
        }
        ))
    }
      , L = async()=>F(e.initialFeed)
      , M = ()=>{
        var b;
        (b = p()) == null || b.dispose(),
        i(null)
    }
      , V = async()=>{
        await r.exec(b=>{
            var S;
            (S = p()) == null || S.play(),
            b()
        }
        ),
        d("playing")
    }
      , R = async()=>{
        await r.exec(b=>{
            var S;
            (S = p()) == null || S.pause(),
            b()
        }
        ),
        d("ready")
    }
      , Q = async()=>{
        !y() || w() || (d("syncing"),
        await r.exec(b=>{
            var S, T, O;
            (S = p()) == null || S.liveTracker.seekToLiveEdge(),
            (T = p()) == null || T.play(),
            (O = p()) == null || O.one("timeupdate", b)
        }
        ),
        d("playing"))
    }
      , ce = async b=>{
        var S, T;
        d(b === 1 ? "seeking-fwd" : "seeking-bwd"),
        await r.exec(O=>{
            var D;
            (D = p()) == null || D.pause(),
            t.start().onTick(()=>{
                const j = l() + 1 * b;
                b === -1 && j <= 0 || b === 1 && j >= $() ? O() : u(j)
            }
            )
        }
        ),
        t.stop(),
        b === 1 ? y() ? d("ready") : ((S = p()) == null || S.currentTime(0),
        d("ended")) : ((T = p()) == null || T.currentTime(0),
        d("ready"))
    }
      , C = async()=>{
        var b, S;
        Math.abs(l() - ((S = (b = p()) == null ? void 0 : b.currentTime()) != null ? S : 0)) < 3 || (d("syncing"),
        await r.exec(T=>{
            var O, D, j, Y;
            (O = p()) == null || O.pause(),
            (D = p()) == null || D.currentTime(l()),
            (j = p()) == null || j.trigger("timeupdate"),
            (Y = p()) == null || Y.one("canplay", T)
        }
        ),
        d("ready"))
    }
    ;
    return {
        uid: n,
        feed: c,
        isCenter: m,
        isEnabled: A,
        isLive: y,
        isAtEdge: w,
        position: h,
        setPosition: v,
        status: a,
        time: l,
        setTime: u,
        duration: $,
        switchFeed: F,
        resetFeed: L,
        Player: {
            mount: z,
            unmount: M,
            isMounted: g,
            dispatch: async b=>{
                t.stop();
                try {
                    if (o() === b)
                        throw new Error("same as previous action");
                    switch (s(b),
                    b) {
                    case "sync":
                        await C();
                        break;
                    case "play":
                        await V();
                        break;
                    case "pause":
                        await R();
                        break;
                    case "fwd":
                        await ce(1),
                        await Q();
                        break;
                    case "rev":
                        await ce(-1);
                        break;
                    case "go-live":
                        await L(),
                        await Q();
                        break
                    }
                } catch (S) {
                    throw new Error('action "'.concat(b, '": ').concat(S.message))
                }
            }
        }
    }
}
  , Tt = Jf().liveVideos.map((e,n)=>td({
    initialFeed: e,
    initialPosition: Ks(n)
}))
  , [nd,rd] = W(!1)
  , [id,od] = W(null)
  , lt = ()=>Tt.filter(e=>e.isEnabled())
  , sd = ()=>lt().find(e=>e.isCenter())
  , ad = ()=>{
    const e = lt().filter(n=>n.isLive() && n.status() === "playing");
    return e.length > 0 ? e.every(n=>n.isAtEdge()) : !1
}
  , ld = Te(()=>Tt.length > 0 && Tt.every(e=>e.status() !== "initializing"))
  , cd = Te(()=>lt().length > 0 && lt().every(e=>e.status() === "ended"))
  , ud = e=>{
    const n = Tt.find(r=>r.uid === e.uid)
      , t = Tt.find(r=>r.position() === "c");
    ir(()=>{
        t.setPosition(n.position()),
        n.setPosition("c")
    }
    )
}
  , fd = ()=>{
    ir(()=>{
        Tt.forEach((e,n)=>e.setPosition(Ks(n)))
    }
    )
}
  , dd = async e=>{
    var t;
    const n = (t = sd()) == null ? void 0 : t.time();
    if (n)
        return e.setTime(n),
        e.Player.dispatch("sync")
}
  , pd = async e=>{
    try {
        e === "play" && await Promise.all(lt().map(dd)),
        await Promise.all(lt().map(n=>n.Player.dispatch(e)))
    } catch (n) {
        console.warn(n)
    }
}
  , vd = async e=>{
    try {
        od(e),
        !!e.archivePlaylist ? await Promise.all(lt().map(t=>t.switchFeed(e.archivePlaylist))) : await Promise.all(lt().map((t,r)=>{
            const o = e.liveVideos[r % e.liveVideos.length];
            if (o)
                return t.switchFeed(o)
        }
        ))
    } catch (n) {
        console.warn(n)
    }
}
  , ot = {
    screens: Tt,
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
}
  , hd = H('<img class="absolute top-0 left-0 wh-full pointer-events-none">')
  , md = ()=>(()=>{
    const e = hd();
    return ee(()=>fe(e, "src", fi().bgSrc)),
    e
}
)()
  , gd = H('<button class="absolute origin-top-left">')
  , _d = [{
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
}]
  , yd = e=>k(ii, {
    each: _d,
    children: n=>(()=>{
        const t = gd();
        return t.$$click = ()=>e.onItemSelected(n.appName),
        ee(r=>{
            const o = "".concat(n.size.width, "px")
              , s = "".concat(n.size.height, "px")
              , l = "translate(".concat(n.position.x, "px, ").concat(n.position.y, "px)");
            return o !== r._v$ && ((r._v$ = o) != null ? t.style.setProperty("width", o) : t.style.removeProperty("width")),
            s !== r._v$2 && ((r._v$2 = s) != null ? t.style.setProperty("height", s) : t.style.removeProperty("height")),
            l !== r._v$3 && ((r._v$3 = l) != null ? t.style.setProperty("transform", l) : t.style.removeProperty("transform")),
            r
        }
        , {
            _v$: void 0,
            _v$2: void 0,
            _v$3: void 0
        }),
        t
    }
    )()
});
Oe(["click"]);
const wd = "/assets/answering-machine-button-glow-58ea4526.svg"
  , bd = H('<img class="absolute origin-bottom-left">')
  , Ad = {
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
}
  , xd = ()=>{
    const e = Ad["phone-button-light"];
    return k(je, {
        get when() {
            return Ge.answeringMachineTrack.hasNew()
        },
        get children() {
            const n = bd();
            return fe(n, "src", wd),
            ee(t=>{
                const r = e.size.width
                  , o = e.size.width
                  , s = "translate(".concat(e.position.x, "px, ").concat(e.position.y, "px)");
                return r !== t._v$ && fe(n, "width", t._v$ = r),
                o !== t._v$2 && fe(n, "height", t._v$2 = o),
                s !== t._v$3 && ((t._v$3 = s) != null ? n.style.setProperty("transform", s) : n.style.removeProperty("transform")),
                t
            }
            , {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }),
            n
        }
    })
}
  , Sd = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAAAwECBAUGBwgBAQACAwEBAAAAAAAAAAAAAAABBQIDBgQH/9oADAMBAAIQAxAAAAD5/rSpJbW3JaMQCWKaYomz89Wtt6GDLTo2diYemAYZgAAAAAAC4tyr+gz8cfabLprHhdfou0k9NH4zyftvm9f23G02OD4+osEbAAAAABUv2UPabqyHu9vv7T5zisp6efx7JZU4fPddXHd4ryXv/mlf3Hm8W11lf2tojaAAAAkjvRvPWfJvYbDidhu9Rt7HhcPIjmnXh5kF6bLg1GJsMDTZ+Rc90XO0/wBSiGv3gAAAK0Gw6fjNvtrfZdtzO8tvme1gsw9nh32HZjzhs9Tna+M8nzX0Lznz33HarLwqr6OGO8AAAACuTi1nHqu+8y9X9vIrci/1c3AmTENmTZE8Ty255Gu7qsVaaLkEgAAAAAL7CJEYkRiSlgrQSAAAAAAAAAAAAAAAAB//xAA0EAACAQMDAgMFBwQDAAAAAAABAgMABBEFEiETMQYiURQwUmFxFRYgMkBBkSNQgZJTgsH/2gAIAQEAAT8AoAsQACSaSCZ/yoTTxvG211IPofxCGVlDKjEH0oQylgvTbJ7ZGKMMqjLIwHzGKNtOO8b/AMUbeb/jb+KEMpAIRiD6DNNDKgJaNgM4yR7tWKkEHBFLLIvZiOc0zMxyxJP4kllXAVyMdsUiux7mlhlk/MzGhbXJHdqaGaPsTTdZF2hiBTySkbWdiPTP6OKMtVjp7ysoC8kgCrPwzd7lDwMvzYcCodNsolCR2gnAbzuyhv8AXFXvh8yndaozof8ALL8mxWp6Lc2uOrEyZzjcMZxU8RUmiMH9AFJqK2ZiOKs9OZscV4ftvZ5OUG112nira2aMv1GY4baBuPepopRJGQ4P0AFS25dSpbzFTgjy4/wK1G2f2AozZMj5wecBavdOYE8VPasp7UyEe+Vc1b2xYjirDTixHlrTtFYhSV49ags4YVACgmiM71YYyc0qnHmjLH1oAqWZu+MAV7IkseJFP1rUNEOGKrkYrUNNKk+Wrm2Kk8U6Y94Bk1BFuIrR9JluGUKhPIrTtHt4FUuVZscgGvKOOK3D1FZHqKaMM3lagoUVkeoo4xV9ptrdAksqt+5rWNHlgLErkeo5H81cw7SaYY93H3qyUFlqxYxaXA1t5cnErDht319KsJo9qq4IbPcUyKwLZPaozucLUi7VCr3Y0jtFLg1O2Is1BtcNknimc7JsNkBeDUSLPcbHJxz2q7SP+rDE4lh6EjFTyFIH5q1BAGapBz7tO9WLgOua0W6tfZYBblBIFHWDttDH5Zr2Qlg6iNV+T5FLs2BQwPHrUdu6uGOKaIs+7OPSpbZmbIOaZGaEJxn61FbBVbfSqxjePKnIOOa9jaNyzhWGCdu7k1LFH0LhJJUWFvPncN64Hw1qLDe1Sd/direTBqxumUrzUFwx0qNs4/qH/tWmgSRs5Y8GjOwjOOfNtBpbp0l2uTwcEVOxERZTVqesWyx4rccyoGJAU8+lQXIjlJPwmrhmFq9yPM5GAfhrUrlyXyau5CWNMcn3kbYNWs2CK0do59IdOvErtKDh3C8LVoLe2hbqywuxIC7XzU9xApDm4QIgG3YwY5+lO8VyRJHdLnOD1CEoSKbVo2nh3dh5xUIgiSRpZozxxtcE1DLEiSIZ4sHODvFW6RwzdWSeAgAkYkHeo7mNiJYpYVRx50dwvNeIxDBdypFIrJ3Uqc8Gp3yT70VG+DWnyXDglAxVdu5gDhdxwMn9s1baFqLorEYyAaPh6/Nfd++BA/8AaGg6hX2Ff19hX2SAafQL8g4rVBc2MjRyZDCri5L5yads++BxWk6rJZNOE2jrII3YjLbM5IHpn96g8WaY6Rl0cOEVT5h+1febSfR/9h6Yp/FOluqqQ/Ax+YUPFGlAg7X+m4UfFOmZUjfwQe45xT+KNLd92HHrhhUnifSSDlJD9HrxNrMV/dPJGCAaMhNE/oBI47Ma6snxGurJ8RrqyfEa6snxmurJ8RrqSfEaJJ7n+9//xAAoEQABAwIDBwUAAAAAAAAAAAABAAIRAyEEEjEgIiMwQVKhEEBRYWL/2gAIAQIBAT8ARyRaZ9Rlm8oNaflZG/pEMA6zymsJVGg2ASjSa4RCr0YNkQRyKbC4qlhwBJUBQnU2uCr4ci40REbeF1N+iZMQUAYV7q8Igxoqmp26boKYZynpCLvtE3CJO6sQdwEFON9sFYYsM53KMP3eVwO/yuB3eVVcM5DTI9//AP/EAC4RAAICAQMBBgMJAAAAAAAAAAECAxEABAUSMRMgITBBUVSBkgYUJEBhcpHR4f/aAAgBAwEBPwDuHHmVOpwauMmgcVw3TytRqo4lNnN03qbtHSNgAB4epOQ7jNE4cS2W62Sc2jdTKlSEWDVjEkVwCD5Gu1iQRlmYADNy3t5mKxdPfO0ckliSThcfzkOtnhfkp+WbPvaS0jGm9jkTh1B7zdDn2jLBIzwLAPdenzzUlS4dCbPUe2Oy8xTeAGMUYxtYv1wlCxINixkTqZAVckUBWaG+zXv6zTh1PhmsiC9vGLDdqaAGRwgi2SlPrR8DiRVHIvjy5UKGRKoWYEHoK/XNjQfeWjZPHqP6yBOKDvsvIZv0esiMR0sPK75GrrOe9fDmv2Ze8/DH6MU7zY/DH6P9zbNO500TzRhZCo5DAKHkUDnFfYZxX2GcV9h+T//Z"
  , Td = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAHIAyAMBIgACEQEDEQH/xAA1AAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQgBAQACAwEBAAAAAAAAAAAAAAADBAECBQYH/9oADAMBAAIQAxAAAAD5/wDfKi9Qp2UHurxctsL9i/nKny7nHlNYo8uUlg91z498AAAFy3Oz2I1IW7FqO27WNyi87lQM7ib8PAsbZbNfm8GWaapHb5D6W7GVYl94NeksyNxmrTOh6Bp0zMS+ow8eatEOKPOTcJOW70UkNt5MeiVdSc2XlrqQ5b71EctdSGkYHRm0HLPepNZ+W+dTHLaeqDldHVoCXXTM61d9JLDinzU5Bzlu9l9l432bwt/YardPjOvWpqKvKKirykVqK8Ka7GQWynK55RSZOm7hqNuHjNq9Z+v8WHFflpyDnLd6neuZ18bXs7jjkz9jccHY3HB2Nyrss3Ij3uh5xvbjiDsdjccHY3HB2HWtDszaZleDneq2hxT5qbhJy3eibN6zWqBroABXJxLMcrh4xgMSgAAZOfgZ97ow4o85NQ/s08/RCrNuaQrGJpCiaQomkKJpCiaQomkKJpCiaQonsGPoxrSqUqHTwAAAAAAAAAAAAf/EACMQAAAFBAMBAQEBAAAAAAAAAAIDBAUVARIUFgAGExAwIED/2gAIAQEAAQIA4EJSU0n+aJqJhEDS1TYwyPyCIB4zOW+PwCmpxhmYBWFSYfylKU/ssrCwjSCE4RCZ9dM68WwrAqmBe2mJRtsIFEhbBF4WFhDL+M9TXaYVLSySkmEYnUJ3UqiU9OSlKCvbiULMqQIvaYmCHV5+tPDg0IxvDw8PDxqR4Jl64zH8PCifwxsYRKajx9aeAJbmDU9T1PU9T1PU9T1PU9T1PU9T1PUxdTdGIJbx9aeIg9aLqbf6iO9AGX+tTKDCaIVDanVH687eA6jx9aeIa9bGEmiYJHl4FlCJoTQiwwgQaleAyKEUp24R1Xj608KOaOxbft+37ft237ft+37dt+37dt+37eLt712Ghjx9aeHCCqzs7Ozs7Obj9Uc+udsIzs7Ozs7OqtGpTVePrTxR+BZk6J7VLPwS8ePrTxR/kS8ePrSYY3xsbGxsbGxsbGxsbGxsbGxsbGxpSB2M5bSl111111111111111111111aWx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx/wD/xAA5EAABAwIDAwgJAwUBAAAAAAABAAIDBBESUVQhkZMQEzFBYnGS0QUUIiRSYXOhsSMwMiAzgYLBQP/aAAgBAQADPwBOcQ1oJJ6AFUS/wjJUkL8EjcLsv6p3RiRsZLT0EKcvazmnBzr2BFr271M1uN0bg29rkWVSwkGF+66nAuYn7lOWtcInEOFwQLqZgJdE4AG1yNn7bmODmkgjoKmZ/F5G2+xPkOJ7i42tc8hte2xSAYi2w5Z4w0MlcAOixUpNzI69iOnPpVU8HG95Bte5yVVe/PP3qoYbtlPX91VMiwNkcGKoe2z5XFuRPISLono/YfIbNCnyU+SfEAXDpUTvR0bHRkMMEspN9mKNwAf/AKqSKd0MhrIoQ8MYwMBjw/N/zVK18rp2TxtMsgjYwB5DWHr7s1FE4Rz+sF77uZzTQ8YMyntnY0YsALmv2i4cwXcB3BUjZBidO6wBLWgOdZwu02H3VLHggbT1Doud5iRg2m2DEGC2+6LS0Q48WKO4fYbJjZm8r1aSLBidHJiDSbXuw4XCw+axQH0b6s8SRsBDr7DM0YngdRu1RT0RY+J7I4IopC7EPZDhief9lRPsWPnAL8HtgNIfbFY5AhUlLTQxilq3xzlwf7NnktthOHskr1V0sT4HnHO2M2cATG9pdgPzKxzuY0bSVPkp8lP8Kcw2cOXCZHDpDHn7KpbI4B7t6qvjdvU1SGh7iQCo3egsYijx8xIMeP55fFkpof0jTSz7LYnTgxHZ0gFSS1EcrQZogzmXczLhOJmwuN+pyeyazafEwlpa+GYAsAFsDr71JG+ZrPR7JsTnubIyUYRjFrG/wqajpXSNayJ5MQDo3nHsbttb7qdj3TtihcRPjEbZNrmlgaQ05A7U9kgkFCJw9kfsiUYmOZ8RPW6+1Gpmo5RDEebE7zGX7XkPsGH/AIqU1opGlzqmN98Rl/Se8bSAPn0KeeGsEMcMWIRljRJtdhBu0J4jhPqoBEpMnPzBxIDDYk5XU1RF/EzSQg3vLaRwkFrgn4UGS1TJhHMRM1wLpdrQW3s45Zp0FWZGHa1xsQqr43b1VfG7eql8li929e8v7+XZL9N/4RMru9OKfkpVLl9lLkpcvspVKVLkhFSx08tCyUMc4tJJafa7lNV1DpubawWADWjYABYBSXupVLa1vspApclJkU/JOCtKF7y/v5dkv03/AIWOd3ep6ppMUJfa17Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTuVXp3Kr07lV6dyq9O5VencqvTOVRRtBmhczFe1+uywTL3l/fy/wB36b/wgag96DIZfmGqMC5cOr7pmYTLs7Rso2329BF0y4GLpTHlwbttZMBIv0Dao9ntdKjAviCaSLEbRdMcwOvYEH7INaXHoATSG32E9SjAJvexA3pgNiVHa+LrtyB0FP8AIPVqhe8v7+X+79N/4Vqj/KDoZe5qDSDiJsRb/CaCDidsFvtZBotjP8sS7WzFcC3zum4g66wX9om4A7gEHOeS7+QssNsLrHr2DagCfaNtn2N17Ydi6ARZEsDQSdp67WBQc1zT1iyBI2kAAAjOyGEjGegAHK20LE7FiN7f8srtaH2FidxRBccRN/sgIIO56vUL3l/fy/3fpv8AwsE571JRMcIy32rXuL9Cmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8Kmzj8KntsMfhU1e1gkLLMvbCLdKxzr3l/fy7Jfpv8Awi2Z3enN60/NPzKfmU/Mp+ZT8yufrYI33LXOsV6IHTBMe55XoymgY+OGQEyBvtPv0qH0V6VNNTYgwRMdtNzdyfmU/Mp+ZT8yn5lPzKfmnO61eYL3l/fy7Jfpv/C/Vd+w+N7XscQ4dBXpbX1HFf5r0o62Ksmdtv7T3O/KqKuTnJ5XPfa13G5/Z/VC95f38uyX6b/wv1Xf+T9UL3l/fyxtc8PcGgscLn5hUz3l3rEe8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqbUx7z5Km1Me8+SptTHvPkqZjr+sR7z5Jj6h5Ybi/I74SnjoBU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aU3aTz0gp3wlUGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bVQaODhtVBo4OG1UGjg4bV//8QANREAAQIDAwkHAgcAAAAAAAAAAQACAwQRElORBRATFBUWIjRUBiAhMUFRYWJxMDI1UnJzsf/aAAgBAgEBPwBGzT1rnFPVcPyuD5XBT170tCEWM1hNAUWSAJGkiYICHbfoyS2z6pza0q1GEz9qa0CoDU6E3yA8UGggmlfRBrQRw0JT2tGjteDbXirMheRMFEgS+gdFhPcaOAIIzSPMsU5Ow5dzy9wAqtty163Fbclr1uK25LXrcVtyWvW4o5egEUMVmIW3Ja9bituS163Fbclr1uKg5Xl4rw1sRpJ+VCIdk+KfrbmkeZYu0tbMT2tKjPcrgRsUNCVRnuuH3RDfD7rgVGUHisnc7Bp7n/FKfpkT+bc0jzLFPyEOZL2vAIqt35a7C3flrsLd+WuwoXZiDFBLWMUTsvChgksYt35a7C3flrsLd+WuwoGRJeDEDxDAIUFtnJ8UfW3NI8yxP/O779wOcPIlFzj5k91nIxf7G5oEXQxWvpWiMzLkk6s3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lazLdK3ErWZbpW4lRZpjoJhMhBgJBP4/wD/xAA2EQABAwAGBwUGBwAAAAAAAAABAAIDBAURFCFSEBIVQVFUkRMgNHOxBiIxM2FxIzA1RFOBkv/aAAgBAwEBPwDSCD8DotWPfosLZ52RuNgKMdWgkdrJgcqrp0THQCJztQygAnDcoZuzLyyYNBaLXAjGz+8CfqmVnSbR+OCXN3loHqpZnvEUsk+sLHBotA97BUespbA98gLADbiMpPHiFJO5j4mmQstIfrHiSAXDH4FPnmlY93bFzIyLRrAYm0DEFVVKJaVNrvJFkes4fXeBatSrf5Zf8qWj0a7Omhe42OAII46Ku8XGhA6SRwA3lXCXIVcJMh6LZ8mQ9FcJMhTKnayQyNidrG3jvxKuEmQq4SZCrhJkKfQ5GAktKYLKum8xvodFXeLjVBs7Z33K97gveWKxWKFqxVruCpPyHr9hP5rfQ6Ku8XGm0h0UjiDvK2jLmK2jLmK2jLmKrL2qhq18bJ+0JeCRqqge1sFOlbHEZASHHEZVtGXMVtGTMVtGXMVJTpHtLS42Jhtq6fzG+h0Vd4uNSfMf9z3HwxSEF8bXfcWpkEDDrMiY08QO7H+nTeY30OijzGCZsgFtm5Gl0Ukk0RvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUq9UTk29Sr1ROTb1KvVE5NvUqamRvgMMcAYC4E/n//Z"
  , kd = H('<div class="absolute origin-top-left bg-black"><img class="absolute top-0 left-0 wh-full object-cover"><img>')
  , $d = "absolute top-0 left-0 wh-full object-cover"
  , Id = ()=>(()=>{
    const e = kd()
      , n = e.firstChild
      , t = n.nextSibling;
    return e.style.setProperty("width", "150px"),
    e.style.setProperty("height", "85px"),
    e.style.setProperty("transform", "translate(403px, 924px) rotateZ(-4deg)"),
    fe(n, "src", Sd),
    fe(t, "src", Td),
    ee(()=>se(t, ge($d, {
        hidden: !Ge.archive.hasNew()
    }))),
    e
}
)()
  , Od = H('<div class="absolute top-0 left-0 wh-full isolate">')
  , Pd = e=>{
    const t = bt(()=>rn() ? [rn().srcWebm, rn().srcMp3] : [])
      , o = bt(()=>[eo().srcWebm, eo().srcMp3], {
        loop: !0,
        autoplay: !0
    })
      , s = bt([Jl, Xl]);
    (async()=>{
        await Yr(6e4);
        const c = s.internalInstance();
        c && (c.on("end", async()=>{
            await Yr(6e5),
            s.play()
        }
        ),
        s.play())
    }
    )();
    const u = c=>{
        if (c === "answering-machine") {
            const f = t.internalInstance();
            if (!f)
                return;
            const p = f.playing()
              , i = f.seek() === 0;
            de.trackClickEvent("answering-machine", p ? "pause" : "play", "cctv-room"),
            p ? (o.setVolume(1),
            s.setVolume(1),
            t.pause()) : (o.setVolume(.3),
            s.setVolume(.3),
            t.play(),
            i && (Ge.answeringMachineTrack.setLastPlayed(),
            f.once("end", ()=>{
                t.stop(),
                o.setVolume(1),
                s.setVolume(1)
            }
            )))
        } else
            c === "log-book" && (de.trackClickEvent("logbook", "open", "cctv-room"),
            e.roomSound.play("logbook-open")),
            c === "terminal" && (de.trackClickEvent("terminal", "open", "cctv-room"),
            e.roomSound.play("terminal-open")),
            we.openApp(c)
    }
    ;
    return (()=>{
        const c = Od();
        return B(c, k(ii, {
            get each() {
                return ot.screens
            },
            children: f=>k(Wf, {
                screen: f,
                onClick: ()=>{
                    f.isEnabled() && f.position() === "c" ? ot.Supervisor.dispatch("play") : ot.Supervisor.positionScreenAtCenter(f),
                    e.roomSound.play(Zs(["screen-tap-1", "screen-tap-2", "screen-tap-3"]))
                }
            })
        }), null),
        B(c, k(Id, {}), null),
        B(c, k(md, {}), null),
        B(c, k(xd, {}), null),
        B(c, k(yd, {
            onItemSelected: u
        }), null),
        ee(()=>(nt.currentStatus() === Ft.done ? "visible" : "hidden") != null ? c.style.setProperty("visibility", nt.currentStatus() === Ft.done ? "visible" : "hidden") : c.style.removeProperty("visibility")),
        c
    }
    )()
}
  , Ed = H('<div class="absolute top-0 left-0 wh-full z-modal">')
  , sr = e=>k(je, {
    get when() {
        return e.isOpen
    },
    get children() {
        const n = Ed();
        return B(n, ()=>e.children),
        n
    }
})
  , Cd = "/assets/logbook-36af03c8.mp3"
  , Dd = "/assets/logbook-dccdaf17.ogg"
  , Md = H('<div><img><img><img class="absolute left-1/2 w-1/2 h-full"><img><img><div class="absolute top-0 left-0 wh-full flex"><button class="flex-1"></button><button class="flex-1"></button></div><button class="absolute top-20 left-20 w-100 h-100 flex-center">')
  , Bd = ()=>[...Ns().map(e=>e.src), null].reverse()
  , tn = ()=>Us(Bd()).map((e,n)=>({
    index: n,
    left: (e == null ? void 0 : e[0]) || null,
    right: (e == null ? void 0 : e[1]) || null
}))
  , Ld = e=>{
    const n = []
      , [t,r] = W(!1);
    vn(async()=>{
        const h = n.map(v=>new Promise((g,m)=>{
            if (!v.src)
                return g();
            v.onload = ()=>g(),
            v.onerror = ()=>m()
        }
        ));
        try {
            await Promise.all(h),
            r(!0)
        } catch (v) {
            e.onClose()
        }
    }
    );
    const [o,s] = W(tn().length - 1)
      , [l,u] = W([])
      , c = ()=>{
        const h = o() - 1;
        return tn()[h] ? !l().includes(h) : !1
    }
    ;
    _e(()=>{
        const h = o() - 1
          , v = tn()[h];
        if (!v || l().includes(h))
            return;
        const g = [v == null ? void 0 : v.left, v == null ? void 0 : v.right].filter(m=>!!m).map(m=>{
            if (m)
                return Fs(m)
        }
        );
        Promise.allSettled(g).then(()=>{
            u([...l(), h])
        }
        )
    }
    );
    const f = ()=>{
        !c() && o() !== 0 && (de.trackClickEvent("pages", "prev", "logbook"),
        s(h=>h - 1),
        d.play("page-turn", {
            interrupt: !0
        }))
    }
      , p = ()=>{
        o() >= tn().length - 1 || (de.trackClickEvent("pages", "next", "logbook"),
        d.play("page-turn", {
            interrupt: !0
        }),
        s(h=>h + 1))
    }
      , i = ()=>tn()[o()]
      , a = ()=>o() === 0
      , d = bt([Dd, Cd], {
        sprite: {
            "page-turn": [0, 933.3333333333334]
        }
    });
    return (()=>{
        const h = Md()
          , v = h.firstChild
          , g = v.nextSibling
          , m = g.nextSibling
          , y = m.nextSibling
          , A = y.nextSibling
          , w = A.nextSibling
          , $ = w.firstChild
          , z = $.nextSibling
          , F = w.nextSibling;
        return De(L=>n.push(L), v),
        fe(v, "src", Hs),
        De(L=>n.push(L), g),
        fe(g, "src", Vs),
        De(L=>n.push(L), m),
        fe(m, "src", zs),
        De(L=>n.push(L), y),
        De(L=>n.push(L), A),
        $.$$click = ()=>f(),
        z.$$click = ()=>p(),
        F.$$click = ()=>{
            e.onClose()
        }
        ,
        B(F, k(re, {
            size: "terminal-lg",
            class: "text-purple leading-none tracking-[-10px]",
            children: "<-"
        })),
        ee(L=>{
            var b, S, T, O;
            const M = ge("wh-full flex relative", !t() && "invisible")
              , V = ge("absolute w-[calc(50%+2px)] h-full", !a() && "invisible")
              , R = ge("absolute w-[calc(50%+2px)] h-full", a() && "invisible")
              , Q = ((b = i()) == null ? void 0 : b.left) || void 0
              , ce = ge("absolute w-1/2 h-full mix-blend-multiply pointer-events-none pl-[99px] pr-52", !((S = i()) != null && S.left) && "invisible")
              , C = ((T = i()) == null ? void 0 : T.right) || void 0
              , I = ge("absolute w-1/2 left-1/2 h-full mix-blend-multiply pointer-events-none pl-52 pr-[99px]", !((O = i()) != null && O.right) && "invisible");
            return M !== L._v$ && se(h, L._v$ = M),
            V !== L._v$2 && se(v, L._v$2 = V),
            R !== L._v$3 && se(g, L._v$3 = R),
            Q !== L._v$4 && fe(y, "src", L._v$4 = Q),
            ce !== L._v$5 && se(y, L._v$5 = ce),
            C !== L._v$6 && fe(A, "src", L._v$6 = C),
            I !== L._v$7 && se(A, L._v$7 = I),
            L
        }
        , {
            _v$: void 0,
            _v$2: void 0,
            _v$3: void 0,
            _v$4: void 0,
            _v$5: void 0,
            _v$6: void 0,
            _v$7: void 0
        }),
        h
    }
    )()
}
;
Oe(["click"]);
const Rd = e=>k(sr, {
    get isOpen() {
        return we.currentOpenApp.mainApp === "log-book"
    },
    get children() {
        return k(Ld, {
            onClose: ()=>{
                var n;
                de.trackClickEvent("modal", "close", "logbook"),
                we.closeApp(),
                (n = e.onClose) == null || n.call(e)
            }
        })
    }
})
  , Nd = "/assets/terminal-2aa26d8b.mp3"
  , Vd = "/assets/terminal-ca9f8876.ogg"
  , Qs = La()
  , zd = e=>{
    const n = bt(e.src, e.options);
    return k(Qs.Provider, {
        value: n,
        get children() {
            return e.children
        }
    })
}
;
function Yt() {
    const e = Go(Qs);
    if (e === void 0)
        throw new Error("useAudio must be used within a AudioProvider");
    return e
}
const Hd = "\n      @@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@@\n @@                          @@@@@\n@                         @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@                         @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @     @@@@@@@@@@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @     @@      @@    @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @                   @@ @@@@@@@@\n@  @@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@ \n@                         @@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n"
  , Ud = "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n    @@                         @@\n     @@      @@@@@@@@      @@  @@\n      @@  @@@@@@@@@@@@@@@@@@  @@\n       @@  @@@@@@@@@@@@@@@@  @@\n        @@  @@@@@@@@@@@@@@  @@\n         @@  @@@@@@@@@@@@  @@\n           @@  @@@@@@@@  @@\n             @@  @@@@  @@\n              @@  @@  @@\n             @@  @@@@  @@\n           @@     @@     @@\n         @@                @@\n        @@        @@        @@\n       @@       @@@@@@       @@\n      @@      @@@@@@@@@@      @@\n     @@     @@@@@@@@@@@@@@     @@\n    @@    @@@@@@@@@@@@@@@@@     @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@  @@@@@@@@@@@@@@@@@@@@@   @@\n    @@                          @@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n"
  , Fd = "\n _   ____                       _ _              _    _           _     _\n| | / ___|  ___  ___ _   _ _ __(_) |_ _   _     / \\  | | ___ _ __| |_  | |\n| | \\___ \\ / _ \\/ __| | | | '__| | __| | | |   / _ \\ | |/ _ \\ '__| __| | |\n|_|  ___) |  __/ (__| |_| | |  | | |_| |_| |  / ___ \\| |  __/ |  | |_  |_|\n(_) |____/ \\___|\\___|\\__,_|_|  |_|\\__|\\__, | /_/   \\_\\_|\\___|_|   \\__| (_)\n                                      |___/\n"
  , jd = "\n    __\n   / /\n  / /\n / /\n/_/\n"
  , Gd = "\n _\n(_)\n _\n(_)\n"
  , Zd = {
    archive: Hd,
    timecoder: Ud,
    securityAlert: Fd,
    forwardSlash: jd,
    colon: Gd
}
  , Yd = H("<span>")
  , wt = e=>(()=>{
    const n = Yd();
    return B(n, ()=>Zd[e.name]),
    ee(()=>se(n, ge("font-vt-220 font-medium leading-none whitespace-pre", e.class))),
    n
}
)()
  , Wd = H("<span>Security Archives")
  , qd = H("<span>Time Coder")
  , Kd = H('<div class="wh-full flex justify-center space-x-368 items-end pb-144"><div class="flex flex-col items-center space-y-56" role="button"></div><div class="flex flex-col items-center space-y-56 text-shadow-terminal" role="button">')
  , $o = _n("relative inline-block w-[600px] text-center py-8", {
    variants: {
        selected: {
            true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
            false: "text-blue-light text-shadow-terminal border"
        }
    }
})
  , Qd = e=>{
    const n = Yt()
      , [t,r] = W();
    let o;
    const s = l=>{
        n.play("click", {
            interrupt: !0
        }),
        r(l),
        clearTimeout(o),
        o = setTimeout(()=>{
            de.trackClickEvent("items", "open-".concat(l), "terminal-home"),
            e.setCurrentOpenApp(l)
        }
        , 1e3)
    }
    ;
    return be(()=>{
        clearTimeout(o)
    }
    ),
    (()=>{
        const l = Kd()
          , u = l.firstChild
          , c = u.nextSibling;
        return u.$$click = ()=>s("security-tape-archives"),
        B(u, k(wt, {
            name: "archive",
            class: "text-purple text-[21px] text-shadow-terminal"
        }), null),
        B(u, k(re, {
            size: "terminal-md",
            get class() {
                return $o({
                    selected: t() === "security-tape-archives"
                })
            },
            get children() {
                return Wd()
            }
        }), null),
        c.$$click = ()=>s("timecoder"),
        B(c, k(wt, {
            name: "timecoder",
            class: "text-purple text-[18px] text-shadow-terminal"
        }), null),
        B(c, k(re, {
            size: "terminal-md",
            get class() {
                return $o({
                    selected: t() === "timecoder"
                })
            },
            get children() {
                return qd()
            }
        }), null),
        l
    }
    )()
}
;
Oe(["click"]);
const Jd = H('<div class="absolute top-0 left-0 wh-full flex flex-col items-center pt-72 bg-terminal"><img class="block w-[732px] mb-32 text-blue-light drop-shadow-terminal transform-gpu" width="873" height="621"><div class="flex space-x-32 text-blue-light"><div class="bg-blue-light shadow-terminal"></div><div class="w-24 h-full bg-blue-light shadow-terminal">')
  , Xd = ()=>{
    const [e,n] = W(!0)
      , t = setTimeout(()=>n(!1), 1e3);
    return be(()=>clearInterval(t)),
    k(je, {
        get when() {
            return e()
        },
        get children() {
            const r = Jd()
              , o = r.firstChild
              , s = o.nextSibling
              , l = s.firstChild;
            return fe(o, "src", di),
            B(r, k(re, {
                as: "p",
                size: "terminal-sm",
                class: "text-center whitespace-pre text-purple mb-56 text-shadow-terminal",
                children: "**********************************************************\n\n(c) copyright Starr Park corporation, 1995. All rights reserved.\nStarr Park Security Services is a registered\ntrademark of Starr Park corporation. \n          \n**********************************************************"
            }), s),
            B(l, k(re, {
                as: "span",
                size: "terminal-md",
                class: "text-black px-16 py-8",
                children: "Loading"
            })),
            r
        }
    })
}
  , ep = 10
  , Io = e=>{
    const n = hs(e);
    return {
        date: n.format("DD.MM.[1995]"),
        time: n.format("HH:mm")
    }
}
  , tp = (e={})=>{
    const [n,t] = W(Io(e.timezone))
      , r = ()=>{
        const s = Io(e.timezone);
        t(s)
    }
      , o = setInterval(()=>r(), ep * 1e3);
    return be(()=>clearInterval(o)),
    n
}
  , Oo = H("<span>")
  , np = H("<span>Starr Park Security System")
  , rp = ()=>{
    const e = tp({
        timezone: cs
    });
    return k(re, {
        as: "p",
        class: "flex justify-between items-center px-144 pt-64 text-blue-dark text-shadow-terminal",
        size: "terminal-sm",
        get children() {
            return [(()=>{
                const n = Oo();
                return B(n, ()=>e().date),
                n
            }
            )(), np(), (()=>{
                const n = Oo();
                return B(n, ()=>e().time),
                n
            }
            )()]
        }
    })
}
  , ip = H('<div><div class="flex w-full"><button><span>&lt;-</span></button><div class="flex items-center flex-1 h-full px-32 bg-blue-light text-blue-light shadow-terminal"></div></div><div class="flex-1 min-h-0 px-100">')
  , op = "w-100 h-100 flex-center font-vt-220 font-medium leading-none text-shadow-terminal"
  , Br = e=>{
    const n = Yt()
      , t = ()=>{
        var o;
        const r = n.play("click", {
            interrupt: !0
        });
        (o = n == null ? void 0 : n.internalInstance()) == null || o.once("end", ()=>{
            var s;
            de.trackClickEvent("app-bar", "back", "terminal"),
            (s = e.onBack) == null || s.call(e)
        }
        , r)
    }
    ;
    return (()=>{
        const r = ip()
          , o = r.firstChild
          , s = o.firstChild
          , l = s.nextSibling
          , u = o.nextSibling;
        return s.$$click = ()=>t(),
        B(l, k(re, {
            as: "span",
            size: "terminal-lg",
            class: "text-black",
            get children() {
                return e.title
            }
        })),
        B(u, ()=>e.children),
        ee(c=>{
            const f = ge("flex flex-col flex-1 pt-64 px-44")
              , p = ge(op, "text-purple text-[80px] tracking-[-10px]");
            return f !== c._v$ && se(r, c._v$ = f),
            p !== c._v$2 && se(s, c._v$2 = p),
            c
        }
        , {
            _v$: void 0,
            _v$2: void 0
        }),
        r
    }
    )()
}
;
Oe(["click"]);
const sp = "/assets/terminal-typing-8b10cd31.mp3"
  , ap = "/assets/terminal-typing-20a23c49.ogg";
class Js extends Error {
    constructor(t, r) {
        super(r);
        Gi(this, "statusCode");
        this.statusCode = t,
        Object.setPrototypeOf(this, new.target.prototype)
    }
}
const lp = "https://bmwryv10bd.execute-api.us-east-1.amazonaws.com"
  , Xs = {
    base: "".concat(lp),
    getArchiveByCode: e=>"".concat(Xs.base, "/timecoder/").concat(e)
}
  , cp = async({params: e})=>{
    const n = Xs.getArchiveByCode(e.code)
      , t = await fetch(n, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!t.ok)
        throw new Js(t.status,"Unable to fetch ".concat(n, ": ").concat(t.status, " ").concat(t.statusText));
    return await t.json()
}
  , up = H('<div class="flex flex-col space-y-120 w-full pt-72 pb-32"><div class="flex justify-between"><div class="flex space-x-24 items-center"></div><div class="flex space-x-24 items-center"></div></div><div class="flex flex-col space-y-48 items-center"><button class="inline-flex px-120 py-8 text-blue-light border text-shadow-terminal">')
  , fp = H('<input pattern="[0-9]*" inputmode="numeric">')
  , dp = {
    day: "00",
    month: "00",
    year: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
}
  , Hn = "text-blue-light text-[20px]"
  , pp = e=>{
    const [n,t] = Gt(dp)
      , r = Yt()
      , o = {
        "typing-1": [0, 200],
        "typing-2": [2e3, 166.66666666666652],
        "typing-3": [4e3, 183.33333333333357],
        "typing-4": [6e3, 183.33333333333357],
        "typing-5": [8e3, 199.9999999999993],
        "typing-6": [1e4, 233.33333333333252],
        "typing-7": [12e3, 250]
    }
      , s = bt([ap, sp], {
        sprite: o
    })
      , [l,u] = W(void 0)
      , [c,f] = W(!1)
      , p = (v,g)=>{
        t(v, g),
        s.play(Zs(Object.keys(o)))
    }
    ;
    let i;
    const a = async()=>{
        r.play("click", {
            interrupt: !0
        }),
        f(!0),
        u(void 0);
        const v = Object.values(n).join("");
        let g;
        try {
            g = await cp({
                params: {
                    code: v
                }
            })
        } catch (m) {
            return m instanceof Js && m.statusCode === 404 ? (r.play("timecoder-error", {
                interrupt: !0
            }),
            u("Archive not found!")) : (r.play("timecoder-error", {
                interrupt: !0
            }),
            console.error(m),
            u("Something went wrong. Try again later."))
        } finally {
            f(!1)
        }
        de.trackClickEvent("timecoder", "submit", "terminal-timecoder", {
            archiveCode: v,
            result: g ? "success" : "error"
        }),
        e.onLoadPlaylist(g)
    }
    ;
    be(()=>{
        clearTimeout(i)
    }
    );
    let d;
    const h = v=>{
        if (!d)
            return;
        const g = [...d.querySelectorAll("input")]
          , m = g.findIndex(A=>A === v)
          , y = g[m + 1];
        y ? y.focus() : v.blur()
    }
    ;
    return (()=>{
        const v = up()
          , g = v.firstChild
          , m = g.firstChild
          , y = m.nextSibling
          , A = g.nextSibling
          , w = A.firstChild
          , $ = d;
        return typeof $ == "function" ? De($, g) : d = g,
        B(m, k(Ct, {
            name: "day",
            get value() {
                return n.day
            },
            onChange: p,
            onNextInputFocus: h,
            get disabled() {
                return c()
            }
        }), null),
        B(m, k(wt, {
            name: "forwardSlash",
            class: Hn
        }), null),
        B(m, k(Ct, {
            name: "month",
            get value() {
                return n.month
            },
            onChange: p,
            onNextInputFocus: h,
            get disabled() {
                return c()
            }
        }), null),
        B(m, k(wt, {
            name: "forwardSlash",
            class: Hn
        }), null),
        B(m, k(Ct, {
            name: "year",
            get value() {
                return n.year
            },
            onChange: p,
            onNextInputFocus: h,
            get disabled() {
                return c()
            }
        }), null),
        B(y, k(Ct, {
            name: "hours",
            get value() {
                return n.hours
            },
            onChange: p,
            onNextInputFocus: h,
            get disabled() {
                return c()
            }
        }), null),
        B(y, k(wt, {
            name: "colon",
            class: Hn
        }), null),
        B(y, k(Ct, {
            name: "minutes",
            get value() {
                return n.minutes
            },
            onChange: p,
            get disabled() {
                return c()
            },
            onNextInputFocus: h
        }), null),
        B(y, k(wt, {
            name: "colon",
            class: Hn
        }), null),
        B(y, k(Ct, {
            name: "seconds",
            get value() {
                return n.seconds
            },
            onChange: p,
            get disabled() {
                return c()
            },
            onNextInputFocus: h
        }), null),
        w.$$click = ()=>a(),
        B(w, k(re, {
            size: "terminal-md",
            children: "ENTER"
        })),
        B(A, k(je, {
            get when() {
                return !!l()
            },
            get children() {
                return k(re, {
                    size: "terminal-sm",
                    class: "text-purple text-shadow-terminal",
                    get children() {
                        return l()
                    }
                })
            }
        }), null),
        B(A, k(je, {
            get when() {
                return c()
            },
            get children() {
                return k(re, {
                    size: "terminal-sm",
                    class: "text-green text-shadow-terminal",
                    children: "Loading..."
                })
            }
        }), null),
        ee(()=>w.disabled = c()),
        v
    }
    )()
}
  , Ct = e=>{
    const n = Yt()
      , [t,r] = W(0)
      , o = c=>{
        const f = c.target
          , d = f.value.replace(/[^0-9]/g, "").slice(-2).padStart(2, "0");
        e.onChange(e.name, d),
        f.value = d,
        t() === 2 && e.onNextInputFocus(f)
    }
      , s = c=>{
        n.play("click", {
            interrupt: !0
        });
        const f = c.target;
        f.setSelectionRange(f.value.length, f.value.length)
    }
      , l = c=>{
        const f = c.key;
        (f === "Delete" || f === "Backspace") && r(p=>p !== 0 ? p - 1 : p),
        /^[0-9]$/.test(f) && r(p=>p + 1)
    }
      , u = c=>{
        r(0)
    }
    ;
    return (()=>{
        const c = fp();
        return c.addEventListener("focus", u),
        c.$$click = s,
        c.$$keydown = l,
        c.$$input = o,
        ee(f=>{
            const p = ge(yn({
                size: "terminal-xxl"
            }), ["w-192 text-center bg-transparent caret-transparent focus:outline-none", "border-b-2 border-purple text-green drop-shadow-terminal transform-gpu focus:border-b-4"])
              , i = e.name;
            return p !== f._v$ && se(c, f._v$ = p),
            i !== f._v$2 && fe(c, "name", f._v$2 = i),
            f
        }
        , {
            _v$: void 0,
            _v$2: void 0
        }),
        ee(()=>c.value = e.value),
        c
    }
    )()
}
;
Oe(["click", "input", "keydown"]);
const vp = H('<div class="wh-full flex flex-col w-full pb-48"><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible"></button><div class="flex-1 flex flex-col"></div><button class="inline-flex w-full flex-center py-12 bg-transparent text-blue-light text-shadow-terminal disabled:invisible">')
  , Po = H("<span>")
  , hp = H('<button class="py-16 px-32 text-green text-shadow-terminal">')
  , Un = 7
  , mp = e=>{
    const n = Yt()
      , [t,r] = W(0)
      , o = ()=>Math.ceil(Ht().length / Un)
      , s = ()=>Ht().slice(t() * Un, t() * Un + Un);
    return (()=>{
        const l = vp()
          , u = l.firstChild
          , c = u.nextSibling
          , f = c.nextSibling;
        return u.$$click = ()=>{
            de.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"),
            n.play("click", {
                interrupt: !0
            }),
            r(p=>p - 1)
        }
        ,
        B(u, k(re, {
            size: "terminal-md",
            class: "-rotate-90",
            children: ">"
        })),
        B(c, k(ii, {
            get each() {
                return s()
            },
            children: p=>{
                const i = vs(p.postDate, p.dropTime.hours, p.dropTime.minutes)
                  , a = Nl(i, "DD.MM.[1995] HH:mm")
                  , d = a.split(" ")[0]
                  , h = a.split(" ")[1];
                return (()=>{
                    const v = hp();
                    return v.$$click = ()=>{
                        de.trackClickEvent("tape-archives", "open-playlist", "terminal-tape-archives", {
                            playlistId: p.playlistId
                        }),
                        n.play("click", {
                            interrupt: !0
                        }),
                        e.onLoadPlaylist(p)
                    }
                    ,
                    B(v, k(re, {
                        size: "terminal-md",
                        class: "flex space-x-272",
                        get children() {
                            return [(()=>{
                                const g = Po();
                                return B(g, d),
                                g
                            }
                            )(), " ", (()=>{
                                const g = Po();
                                return B(g, h),
                                g
                            }
                            )()]
                        }
                    })),
                    v
                }
                )()
            }
        })),
        f.$$click = ()=>{
            de.trackClickEvent("tape-archives", "prev-page", "terminal-tape-archives"),
            n.play("click", {
                interrupt: !0
            }),
            r(p=>p + 1)
        }
        ,
        B(f, k(re, {
            size: "terminal-md",
            class: "rotate-90",
            children: ">"
        })),
        ee(p=>{
            const i = t() === 0
              , a = t() >= o() - 1;
            return i !== p._v$ && (u.disabled = p._v$ = i),
            a !== p._v$2 && (f.disabled = p._v$2 = a),
            p
        }
        , {
            _v$: void 0,
            _v$2: void 0
        }),
        l
    }
    )()
}
;
Oe(["click"]);
const gp = H('<span class="text-black">Access Security System')
  , _p = H('<div class="wh-full flex flex-col items-center space-y-76 pt-76 "><img class="w-[872px] drop-shadow-terminal text-blue-light transform-gpu" width="873" height="621">')
  , yp = e=>{
    const n = setTimeout(()=>e.setCurrentOpenApp("home"), 2e3);
    return be(()=>clearInterval(n)),
    (()=>{
        const t = _p()
          , r = t.firstChild;
        return fe(r, "src", di),
        B(t, k(re, {
            size: "terminal-md",
            class: "px-16 py-8 bg-blue-light text-blue-light shadow-terminal",
            get children() {
                return gp()
            }
        }), null),
        t
    }
    )()
}
  , wp = H('<span class="text-black">unwatched security footage')
  , bp = H('<div class="flex-1 pt-144 pb-124 px-144"><div class="relative wh-full flex flex-col space-y-92 items-center justify-center border-x-2 border-b-2 border-purple"><div class="absolute top-0 left-0 wh-full flex items-start"><div class="flex-1 border-t-2 border-purple"></div><div class="flex-1 border-t-2 border-purple"></div></div><div class="flex space-x-184"><button><span>Dismiss</span></button><button><span>Open')
  , Eo = _n(["relative px-24 py-8", yn({
    size: "terminal-md"
})], {
    variants: {
        selected: {
            true: ["bg-blue-light text-blue-light shadow-terminal [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
            false: "text-blue-light text-shadow-terminal border"
        }
    }
})
  , Ap = e=>{
    const n = Yt()
      , [t,r] = W();
    let o;
    const s = l=>{
        n.play("click", {
            interrupt: !0
        }),
        r(l),
        clearTimeout(o),
        o = setTimeout(()=>{
            l === "open" ? e.onLoadPlaylist() : de.trackClickEvent("notification", "dismiss", "terminal-notification-screen"),
            Ge.archive.dismissNotification()
        }
        , 1e3)
    }
    ;
    return be(()=>{
        clearTimeout(o)
    }
    ),
    (()=>{
        const l = bp()
          , u = l.firstChild
          , c = u.firstChild
          , f = c.firstChild
          , p = f.nextSibling
          , i = c.nextSibling
          , a = i.firstChild
          , d = a.nextSibling;
        return B(c, k(wt, {
            name: "securityAlert",
            class: "px-64 -translate-y-1/2 text-blue-light text-[32px] text-shadow-terminal"
        }), p),
        B(u, k(re, {
            as: "div",
            size: "terminal-xl",
            class: "px-56 py-32 bg-orange text-orange shadow-terminal",
            get children() {
                return wp()
            }
        }), i),
        a.$$click = ()=>s("dismiss"),
        d.$$click = ()=>s("open"),
        ee(h=>{
            const v = Eo({
                selected: t() === "dismiss"
            })
              , g = Eo({
                selected: t() === "open"
            });
            return v !== h._v$ && se(a, h._v$ = v),
            g !== h._v$2 && se(d, h._v$2 = g),
            h
        }
        , {
            _v$: void 0,
            _v$2: void 0
        }),
        l
    }
    )()
}
;
Oe(["click"]);
const xp = H('<div class="realtive wh-full flex flex-col bg-terminal">')
  , Sp = e=>{
    const n = ()=>we.currentOpenApp.mainApp
      , t = ()=>we.currentOpenApp.mainApp === "terminal" ? we.currentOpenApp.terminalApp : void 0
      , r = (o,s)=>{
        var l;
        ot.Supervisor.switchFeed({
            archivePlaylist: {
                playlistId: o.playlistId
            },
            source: s
        }),
        Ge.archive.setLastPlayed(o.postDate),
        (l = e.onPlaylistLoad) == null || l.call(e),
        we.closeApp()
    }
    ;
    return k(sr, {
        get isOpen() {
            return n() === "terminal"
        },
        get children() {
            return k(zd, {
                src: [Vd, Nd],
                options: {
                    sprite: {
                        click: [0, 220.6122448979592],
                        "timecoder-error": [2e3, 283.3333333333332]
                    }
                },
                get children() {
                    const o = xp();
                    return B(o, k(rp, {}), null),
                    B(o, k(es, {
                        get fallback() {
                            return k(yp, {
                                setCurrentOpenApp: s=>we.openApp(s)
                            })
                        },
                        get children() {
                            return [k(Mt, {
                                get when() {
                                    return Ge.archive.hasNew()
                                },
                                get children() {
                                    return k(Ap, {
                                        onLoadPlaylist: ()=>{
                                            const s = Ht()[0];
                                            s && (de.trackClickEvent("notification", "open-playlist", "terminal-notification-screen", {
                                                playlistId: s.playlistId
                                            }),
                                            r(s, "security-tape-archives"))
                                        }
                                    })
                                }
                            }), k(Mt, {
                                get when() {
                                    return t() === "home"
                                },
                                get children() {
                                    return k(Br, {
                                        title: "Security System",
                                        onBack: ()=>we.closeApp(),
                                        get children() {
                                            return k(Qd, {
                                                setCurrentOpenApp: s=>we.openApp(s)
                                            })
                                        }
                                    })
                                }
                            }), k(Mt, {
                                get when() {
                                    return t() === "security-tape-archives"
                                },
                                get children() {
                                    return k(Br, {
                                        title: "Security Tape Archives",
                                        onBack: ()=>we.openApp("home"),
                                        get children() {
                                            return k(mp, {
                                                onLoadPlaylist: s=>r(s, "security-tape-archives")
                                            })
                                        }
                                    })
                                }
                            }), k(Mt, {
                                get when() {
                                    return t() === "timecoder"
                                },
                                get children() {
                                    return k(Br, {
                                        title: "Timecoder v2.1.0",
                                        onBack: ()=>we.openApp("home"),
                                        get children() {
                                            return k(pp, {
                                                onLoadPlaylist: s=>r(s, "timecoder")
                                            })
                                        }
                                    })
                                }
                            })]
                        }
                    }), null),
                    B(o, k(Xd, {}), null),
                    o
                }
            })
        }
    })
}
  , Tp = "/assets/cctv-room-ee8509df.mp3"
  , kp = "/assets/cctv-room-1978b2ca.ogg";
function $p(e) {
    const n = me({}, e)
      , t = me({}, e)
      , r = {}
      , o = l=>{
        let u = r[l];
        if (!u) {
            if (!Qn())
                return n[l];
            r[l] = u = W(n[l], {
                internal: !0
            }),
            delete n[l]
        }
        return u[0]()
    }
    ;
    for (const l in e)
        Object.defineProperty(t, l, {
            get: ()=>o(l),
            enumerable: !0
        });
    const s = (l,u)=>{
        const c = r[l];
        if (c)
            return c[1](u);
        l in n && (n[l] = to(u, [n[l]]))
    }
    ;
    return [t, (l,u)=>{
        if (ec(l)) {
            const c = ae(()=>Object.entries(to(l, t)));
            ir(()=>{
                for (const [f,p] of c)
                    s(f, ()=>p)
            }
            )
        } else
            s(l, u);
        return t
    }
    ]
}
var ea = {
    width: null,
    height: null
};
function Lr(e) {
    if (!e)
        return me({}, ea);
    const {width: n, height: t} = e.getBoundingClientRect();
    return {
        width: n,
        height: t
    }
}
function Ip(e) {
    const n = typeof e == "function"
      , [t,r] = $p(n ? ea : Lr(e))
      , o = new ResizeObserver(([s])=>r(Lr(s.target)));
    return be(()=>o.disconnect()),
    n ? _e(()=>{
        const s = e();
        s && (r(Lr(s)),
        o.observe(s),
        be(()=>o.unobserve(s)))
    }
    ) : (o.observe(e),
    be(()=>o.unobserve(e))),
    t
}
const Op = e=>{
    const [n,t] = W({
        x: 0,
        y: 0
    })
      , [r,o] = W(1)
      , s = Ip(e.containerRef);
    return _e(()=>{
        if (!e.containerRef() || s.width == null || s.height == null)
            return;
        const u = as(e.position) || {
            x: 0,
            y: 0
        }
          , c = e.bgImageSize.width / e.bgImageSize.height
          , f = s.width / s.height;
        let p, i;
        e.fit === "cover" ? c <= f ? (p = s.width,
        i = s.width / c) : (p = s.height * c,
        i = s.height) : c <= f ? (p = s.height * c,
        i = s.height) : (p = s.width,
        i = s.width / c);
        const a = Math.round(p / e.bgImageSize.width * 1e3) / 1e3
          , d = (p - s.width) / 2
          , h = (i - s.height) / 2
          , v = p * u.x / e.bgImageSize.width - d
          , g = i * u.y / e.bgImageSize.height - h;
        t({
            x: v,
            y: g
        }),
        o(a)
    }
    ),
    {
        position: n,
        scaleFactor: r
    }
}
  , Pp = H("<div><video muted playsinline>")
  , Ep = 7.1
  , Cp = 7.7
  , Dp = e=>{
    let n;
    const [t,r] = W(void 0);
    return vn(async()=>{
        if (!n)
            return;
        if (!Rt.options.muted)
            try {
                n.muted = !1,
                await n.play()
            } catch (c) {
                n.muted = !0,
                Rt.setMute(!0)
            } finally {
                n.pause()
            }
        try {
            await n.play()
        } catch (c) {
            return console.error("Error during transition video playback, skipping transition...", c),
            r("error"),
            e.onEnded()
        } finally {
            n.pause()
        }
        await new Promise(c=>{
            if (!n)
                return c();
            n.load(),
            n.addEventListener("canplaythrough", ()=>c())
        }
        ),
        await Yr(600),
        await n.play(),
        r("done"),
        e.onLoaded();
        const l = ()=>{
            !n || n.currentTime < Ep || (e.onEnded(),
            n.removeEventListener("timeupdate", l))
        }
        ;
        n.addEventListener("timeupdate", l);
        const u = ()=>{
            n && (n.currentTime = Cp,
            n.play())
        }
        ;
        n.addEventListener("ended", u)
    }
    ),
    _e(Ba(ot.Supervisor.allLoaded, o=>{
        n && (o ? n.pause() : n.play())
    }
    , {
        defer: !0
    })),
    (()=>{
        const o = Pp()
          , s = o.firstChild;
        s.addEventListener("error", u=>{
            console.error("Error during transition video playback, skipping transition...", u),
            r("error"),
            e.onEnded()
        }
        );
        const l = n;
        return typeof l == "function" ? De(l, s) : n = s,
        ee(u=>{
            const c = ge("wh-full", t() === "error" && "bg-black")
              , f = ae(fi).transitionVideoSrc
              , p = ge("wh-full object-contain")
              , i = t() === "done" ? "visible" : "hidden";
            return c !== u._v$ && se(o, u._v$ = c),
            f !== u._v$2 && fe(s, "src", u._v$2 = f),
            p !== u._v$3 && se(s, u._v$3 = p),
            i !== u._v$4 && ((u._v$4 = i) != null ? s.style.setProperty("visibility", i) : s.style.removeProperty("visibility")),
            u
        }
        , {
            _v$: void 0,
            _v$2: void 0,
            _v$3: void 0,
            _v$4: void 0
        }),
        o
    }
    )()
}
;
Promise.allSettled = Promise.allSettled || (e=>Promise.all(e.map(n=>n.then(t=>({
    status: "fulfilled",
    value: t
})).catch(t=>({
    status: "rejected",
    reason: t
})))));
var At = [], Mp = function() {
    return At.some(function(e) {
        return e.activeTargets.length > 0
    })
}, Bp = function() {
    return At.some(function(e) {
        return e.skippedTargets.length > 0
    })
}, Co = "ResizeObserver loop completed with undelivered notifications.", Lp = function() {
    var e;
    typeof ErrorEvent == "function" ? e = new ErrorEvent("error",{
        message: Co
    }) : (e = document.createEvent("Event"),
    e.initEvent("error", !1, !1),
    e.message = Co),
    window.dispatchEvent(e)
}, pn;
(function(e) {
    e.BORDER_BOX = "border-box",
    e.CONTENT_BOX = "content-box",
    e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box"
}
)(pn || (pn = {}));
var xt = function(e) {
    return Object.freeze(e)
}, Rp = function() {
    function e(n, t) {
        this.inlineSize = n,
        this.blockSize = t,
        xt(this)
    }
    return e
}(), ta = function() {
    function e(n, t, r, o) {
        return this.x = n,
        this.y = t,
        this.width = r,
        this.height = o,
        this.top = this.y,
        this.left = this.x,
        this.bottom = this.top + this.height,
        this.right = this.left + this.width,
        xt(this)
    }
    return e.prototype.toJSON = function() {
        var n = this
          , t = n.x
          , r = n.y
          , o = n.top
          , s = n.right
          , l = n.bottom
          , u = n.left
          , c = n.width
          , f = n.height;
        return {
            x: t,
            y: r,
            top: o,
            right: s,
            bottom: l,
            left: u,
            width: c,
            height: f
        }
    }
    ,
    e.fromRect = function(n) {
        return new e(n.x,n.y,n.width,n.height)
    }
    ,
    e
}(), vi = function(e) {
    return e instanceof SVGElement && "getBBox"in e
}, na = function(e) {
    if (vi(e)) {
        var n = e.getBBox()
          , t = n.width
          , r = n.height;
        return !t && !r
    }
    var o = e
      , s = o.offsetWidth
      , l = o.offsetHeight;
    return !(s || l || e.getClientRects().length)
}, Do = function(e) {
    var n;
    if (e instanceof Element)
        return !0;
    var t = (n = e == null ? void 0 : e.ownerDocument) === null || n === void 0 ? void 0 : n.defaultView;
    return !!(t && e instanceof t.Element)
}, Np = function(e) {
    switch (e.tagName) {
    case "INPUT":
        if (e.type !== "image")
            break;
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
}, sn = typeof window < "u" ? window : {}, Fn = new WeakMap, Mo = /auto|scroll/, Vp = /^tb|vertical/, zp = /msie|trident/i.test(sn.navigator && sn.navigator.userAgent), Le = function(e) {
    return parseFloat(e || "0")
}, Nt = function(e, n, t) {
    return e === void 0 && (e = 0),
    n === void 0 && (n = 0),
    t === void 0 && (t = !1),
    new Rp((t ? n : e) || 0,(t ? e : n) || 0)
}, Bo = xt({
    devicePixelContentBoxSize: Nt(),
    borderBoxSize: Nt(),
    contentBoxSize: Nt(),
    contentRect: new ta(0,0,0,0)
}), ra = function(e, n) {
    if (n === void 0 && (n = !1),
    Fn.has(e) && !n)
        return Fn.get(e);
    if (na(e))
        return Fn.set(e, Bo),
        Bo;
    var t = getComputedStyle(e)
      , r = vi(e) && e.ownerSVGElement && e.getBBox()
      , o = !zp && t.boxSizing === "border-box"
      , s = Vp.test(t.writingMode || "")
      , l = !r && Mo.test(t.overflowY || "")
      , u = !r && Mo.test(t.overflowX || "")
      , c = r ? 0 : Le(t.paddingTop)
      , f = r ? 0 : Le(t.paddingRight)
      , p = r ? 0 : Le(t.paddingBottom)
      , i = r ? 0 : Le(t.paddingLeft)
      , a = r ? 0 : Le(t.borderTopWidth)
      , d = r ? 0 : Le(t.borderRightWidth)
      , h = r ? 0 : Le(t.borderBottomWidth)
      , v = r ? 0 : Le(t.borderLeftWidth)
      , g = i + f
      , m = c + p
      , y = v + d
      , A = a + h
      , w = u ? e.offsetHeight - A - e.clientHeight : 0
      , $ = l ? e.offsetWidth - y - e.clientWidth : 0
      , z = o ? g + y : 0
      , F = o ? m + A : 0
      , L = r ? r.width : Le(t.width) - z - $
      , M = r ? r.height : Le(t.height) - F - w
      , V = L + g + $ + y
      , R = M + m + w + A
      , Q = xt({
        devicePixelContentBoxSize: Nt(Math.round(L * devicePixelRatio), Math.round(M * devicePixelRatio), s),
        borderBoxSize: Nt(V, R, s),
        contentBoxSize: Nt(L, M, s),
        contentRect: new ta(i,c,L,M)
    });
    return Fn.set(e, Q),
    Q
}, ia = function(e, n, t) {
    var r = ra(e, t)
      , o = r.borderBoxSize
      , s = r.contentBoxSize
      , l = r.devicePixelContentBoxSize;
    switch (n) {
    case pn.DEVICE_PIXEL_CONTENT_BOX:
        return l;
    case pn.BORDER_BOX:
        return o;
    default:
        return s
    }
}, Hp = function() {
    function e(n) {
        var t = ra(n);
        this.target = n,
        this.contentRect = t.contentRect,
        this.borderBoxSize = xt([t.borderBoxSize]),
        this.contentBoxSize = xt([t.contentBoxSize]),
        this.devicePixelContentBoxSize = xt([t.devicePixelContentBoxSize])
    }
    return e
}(), oa = function(e) {
    if (na(e))
        return 1 / 0;
    for (var n = 0, t = e.parentNode; t; )
        n += 1,
        t = t.parentNode;
    return n
}, Up = function() {
    var e = 1 / 0
      , n = [];
    At.forEach(function(l) {
        if (l.activeTargets.length !== 0) {
            var u = [];
            l.activeTargets.forEach(function(f) {
                var p = new Hp(f.target)
                  , i = oa(f.target);
                u.push(p),
                f.lastReportedSize = ia(f.target, f.observedBox),
                i < e && (e = i)
            }),
            n.push(function() {
                l.callback.call(l.observer, u, l.observer)
            }),
            l.activeTargets.splice(0, l.activeTargets.length)
        }
    });
    for (var t = 0, r = n; t < r.length; t++) {
        var o = r[t];
        o()
    }
    return e
}, Lo = function(e) {
    At.forEach(function(t) {
        t.activeTargets.splice(0, t.activeTargets.length),
        t.skippedTargets.splice(0, t.skippedTargets.length),
        t.observationTargets.forEach(function(o) {
            o.isActive() && (oa(o.target) > e ? t.activeTargets.push(o) : t.skippedTargets.push(o))
        })
    })
}, Fp = function() {
    var e = 0;
    for (Lo(e); Mp(); )
        e = Up(),
        Lo(e);
    return Bp() && Lp(),
    e > 0
}, Rr, sa = [], jp = function() {
    return sa.splice(0).forEach(function(e) {
        return e()
    })
}, Gp = function(e) {
    if (!Rr) {
        var n = 0
          , t = document.createTextNode("")
          , r = {
            characterData: !0
        };
        new MutationObserver(function() {
            return jp()
        }
        ).observe(t, r),
        Rr = function() {
            t.textContent = "".concat(n ? n-- : n++)
        }
    }
    sa.push(e),
    Rr()
}, Zp = function(e) {
    Gp(function() {
        requestAnimationFrame(e)
    })
}, Wn = 0, Yp = function() {
    return !!Wn
}, Wp = 250, qp = {
    attributes: !0,
    characterData: !0,
    childList: !0,
    subtree: !0
}, Ro = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"], No = function(e) {
    return e === void 0 && (e = 0),
    Date.now() + e
}, Nr = !1, Kp = function() {
    function e() {
        var n = this;
        this.stopped = !0,
        this.listener = function() {
            return n.schedule()
        }
    }
    return e.prototype.run = function(n) {
        var t = this;
        if (n === void 0 && (n = Wp),
        !Nr) {
            Nr = !0;
            var r = No(n);
            Zp(function() {
                var o = !1;
                try {
                    o = Fp()
                } finally {
                    if (Nr = !1,
                    n = r - No(),
                    !Yp())
                        return;
                    o ? t.run(1e3) : n > 0 ? t.run(n) : t.start()
                }
            })
        }
    }
    ,
    e.prototype.schedule = function() {
        this.stop(),
        this.run()
    }
    ,
    e.prototype.observe = function() {
        var n = this
          , t = function() {
            return n.observer && n.observer.observe(document.body, qp)
        };
        document.body ? t() : sn.addEventListener("DOMContentLoaded", t)
    }
    ,
    e.prototype.start = function() {
        var n = this;
        this.stopped && (this.stopped = !1,
        this.observer = new MutationObserver(this.listener),
        this.observe(),
        Ro.forEach(function(t) {
            return sn.addEventListener(t, n.listener, !0)
        }))
    }
    ,
    e.prototype.stop = function() {
        var n = this;
        this.stopped || (this.observer && this.observer.disconnect(),
        Ro.forEach(function(t) {
            return sn.removeEventListener(t, n.listener, !0)
        }),
        this.stopped = !0)
    }
    ,
    e
}(), ti = new Kp, Vo = function(e) {
    !Wn && e > 0 && ti.start(),
    Wn += e,
    !Wn && ti.stop()
}, Qp = function(e) {
    return !vi(e) && !Np(e) && getComputedStyle(e).display === "inline"
}, Jp = function() {
    function e(n, t) {
        this.target = n,
        this.observedBox = t || pn.CONTENT_BOX,
        this.lastReportedSize = {
            inlineSize: 0,
            blockSize: 0
        }
    }
    return e.prototype.isActive = function() {
        var n = ia(this.target, this.observedBox, !0);
        return Qp(this.target) && (this.lastReportedSize = n),
        this.lastReportedSize.inlineSize !== n.inlineSize || this.lastReportedSize.blockSize !== n.blockSize
    }
    ,
    e
}(), Xp = function() {
    function e(n, t) {
        this.activeTargets = [],
        this.skippedTargets = [],
        this.observationTargets = [],
        this.observer = n,
        this.callback = t
    }
    return e
}(), jn = new WeakMap, zo = function(e, n) {
    for (var t = 0; t < e.length; t += 1)
        if (e[t].target === n)
            return t;
    return -1
}, Gn = function() {
    function e() {}
    return e.connect = function(n, t) {
        var r = new Xp(n,t);
        jn.set(n, r)
    }
    ,
    e.observe = function(n, t, r) {
        var o = jn.get(n)
          , s = o.observationTargets.length === 0;
        zo(o.observationTargets, t) < 0 && (s && At.push(o),
        o.observationTargets.push(new Jp(t,r && r.box)),
        Vo(1),
        ti.schedule())
    }
    ,
    e.unobserve = function(n, t) {
        var r = jn.get(n)
          , o = zo(r.observationTargets, t)
          , s = r.observationTargets.length === 1;
        o >= 0 && (s && At.splice(At.indexOf(r), 1),
        r.observationTargets.splice(o, 1),
        Vo(-1))
    }
    ,
    e.disconnect = function(n) {
        var t = this
          , r = jn.get(n);
        r.observationTargets.slice().forEach(function(o) {
            return t.unobserve(n, o.target)
        }),
        r.activeTargets.splice(0, r.activeTargets.length)
    }
    ,
    e
}(), ev = function() {
    function e(n) {
        if (arguments.length === 0)
            throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
        if (typeof n != "function")
            throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
        Gn.connect(this, n)
    }
    return e.prototype.observe = function(n, t) {
        if (arguments.length === 0)
            throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
        if (!Do(n))
            throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
        Gn.observe(this, n, t)
    }
    ,
    e.prototype.unobserve = function(n) {
        if (arguments.length === 0)
            throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
        if (!Do(n))
            throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
        Gn.unobserve(this, n)
    }
    ,
    e.prototype.disconnect = function() {
        Gn.disconnect(this)
    }
    ,
    e.toString = function() {
        return "function ResizeObserver () { [polyfill code] }"
    }
    ,
    e
}();
const tv = ()=>{
    "ResizeObserver"in window || (window.ResizeObserver = ev)
}
  , nv = {
    setup: tv
}
  , rv = H('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>No</span></button><button><span>Yes')
  , Ho = _n(["relative px-144 py-2", yn({
    size: "terminal-sm"
})], {
    variants: {
        selected: {
            true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
            false: "text-blue-light border"
        }
    }
})
  , iv = e=>k(sr, {
    get isOpen() {
        return e.isOpen
    },
    get children() {
        return k(ov, {
            onExit: ()=>{
                window.location.href = "brawlstars-inbox://closeView"
            }
            ,
            get onClose() {
                return e.onClose
            }
        })
    }
})
  , ov = e=>{
    const [n,t] = W();
    let r;
    const o = s=>{
        t(s),
        clearTimeout(r),
        r = setTimeout(()=>{
            s === "confirm" ? e.onExit() : e.onClose()
        }
        , 1e3)
    }
    ;
    return (()=>{
        const s = rv()
          , l = s.firstChild
          , u = l.firstChild
          , c = u.nextSibling
          , f = c.firstChild
          , p = f.firstChild
          , i = p.firstChild
          , a = i.nextSibling;
        return B(u, k(re, {
            size: "terminal-md",
            children: "STARR PARK SECURITY"
        })),
        B(f, k(re, {
            size: "terminal-md",
            class: "text-purple",
            children: "Are you sure you want to exit?"
        }), p),
        i.$$click = ()=>o("cancel"),
        a.$$click = ()=>o("confirm"),
        ee(d=>{
            const h = Ho({
                selected: n() === "cancel"
            })
              , v = Ho({
                selected: n() === "confirm"
            });
            return h !== d._v$ && se(i, d._v$ = h),
            v !== d._v$2 && se(a, d._v$2 = v),
            d
        }
        , {
            _v$: void 0,
            _v$2: void 0
        }),
        s
    }
    )()
}
;
Oe(["click"]);
const sv = H('<div class="wh-full flex-center bg-black/80"><div class="w-[1100px] flex flex-col space-y-32"><div class="px-20 py-12 bg-blue-light text-black"></div><div class="bg-black p-20"><div class="flex-center flex-col space-y-32 p-24 border border-purple"><div class="flex space-x-128"><button><span>Exit</span></button><button><span>Continue')
  , Uo = _n(["relative px-96 py-2", yn({
    size: "terminal-sm"
})], {
    variants: {
        selected: {
            true: ["bg-blue-light text-blue-light [&>span]:text-black", "before:content-['>'] before:text-white", "before:absolute before:left-[-32px] before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2"],
            false: "text-blue-light border"
        }
    }
})
  , av = ()=>k(sr, {
    get isOpen() {
        return !Ge.dataUsageWarningDialog.accepted()
    },
    get children() {
        return k(lv, {
            onExit: ()=>{
                window.location.href = "brawlstars-inbox://closeView"
            }
            ,
            onClose: ()=>{
                Ge.dataUsageWarningDialog.setAccepted()
            }
        })
    }
})
  , lv = e=>{
    const [n,t] = W();
    let r;
    const o = s=>{
        t(s),
        clearTimeout(r),
        r = setTimeout(()=>{
            s === "exit" ? e.onExit() : e.onClose()
        }
        , 1e3)
    }
    ;
    return (()=>{
        const s = sv()
          , l = s.firstChild
          , u = l.firstChild
          , c = u.nextSibling
          , f = c.firstChild
          , p = f.firstChild
          , i = p.firstChild
          , a = i.nextSibling;
        return B(u, k(re, {
            size: "terminal-md",
            children: "STARR PARK SECURITY"
        })),
        B(f, k(re, {
            size: "terminal-sm",
            class: "text-purple whitespace-pre-wrap",
            get children() {
                return ["This website features live video content, which can consume a significant amount of data.", "\n", "If you're using a limited data plan or have concerns about data usage, we recommend switching to a Wi-Fi network."]
            }
        }), p),
        i.$$click = ()=>o("exit"),
        a.$$click = ()=>o("continue"),
        ee(d=>{
            const h = Uo({
                selected: n() === "exit"
            })
              , v = Uo({
                selected: n() === "continue"
            });
            return h !== d._v$ && se(i, d._v$ = h),
            v !== d._v$2 && se(a, d._v$2 = v),
            d
        }
        , {
            _v$: void 0,
            _v$2: void 0
        }),
        s
    }
    )()
}
;
Oe(["click"]);
const cv = H('<button class="absolute top-20 left-20 w-100 h-100 flex-center">')
  , uv = H('<button class="absolute top-20 right-20 w-100 h-100 flex-center text-purple">')
  , fv = H('<div class="wh-full"><div class="portrait:hidden absolute origin-top-left overflow-hidden"></div><div class="landscape:hidden portrait:flex wh-full flex-center"><div class="font-medium whitespace-nowrap">Portrait mode is not supported.')
  , dv = H('<div class="absolute bottom-0 left-0 w-256">');
nv.setup();
const Vr = {
    width: 2250,
    height: 1170
}
  , pv = ()=>{
    const [e,n] = W(!1);
    let t;
    vn(()=>{
        nt.init(),
        de.init(),
        de.setupActivityTracking(),
        de.trackPageView()
    }
    ),
    _e(()=>{
        if (ot.Supervisor.allEnded()) {
            const u = ot.Supervisor.currentFeed()
              , f = !!(u != null && u.archivePlaylist) && u.source;
            f && we.currentOpenApp.mainApp === null && we.openApp(f),
            ot.Supervisor.dispatch("go-live")
        }
    }
    );
    const [r,o] = W(void 0)
      , s = Op({
        containerRef: r,
        bgImageSize: Vr,
        fit: "contain"
    })
      , l = bt([kp, Tp], {
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
    return [(()=>{
        const u = fv()
          , c = u.firstChild;
        return De(o, u),
        B(c, k(Dp, {
            onLoaded: ()=>nt.onVideoTransitionLoaded(),
            onEnded: ()=>nt.onVideoTransitionEnd()
        }), null),
        B(c, k(je, {
            get when() {
                return nt.currentStatus() >= Ft["video-transition"]
            },
            get children() {
                return k(Pd, {
                    roomSound: l
                })
            }
        }), null),
        B(c, k(je, {
            get when() {
                return nt.currentStatus() === Ft.done
            },
            get children() {
                return [(()=>{
                    const f = cv();
                    return f.$$click = ()=>n(!0),
                    B(f, k(re, {
                        size: "terminal-lg",
                        class: "text-green leading-none inline-block pb-16",
                        children: "х"
                    })),
                    f
                }
                )(), (()=>{
                    const f = uv();
                    return f.$$click = ()=>{
                        de.trackClickEvent("instructions-modal", Rt.options.muted ? "sound-on" : "sound-off", "cctv-room"),
                        Rt.toggleMute()
                    }
                    ,
                    B(f, k(Ws, {
                        get name() {
                            return Rt.options.muted ? "mute" : "unmute"
                        },
                        class: "w-72"
                    })),
                    f
                }
                )(), k(Sp, {
                    onPlaylistLoad: ()=>l.play("archive-tape-load")
                }), k(Rd, {
                    onClose: ()=>l.play("logbook-close")
                }), k(av, {})]
            }
        }), null),
        B(c, k(iv, {
            get isOpen() {
                return e()
            },
            onClose: ()=>n(!1)
        }), null),
        ee(f=>{
            const p = "".concat(Vr.height, "px")
              , i = "".concat(Vr.width, "px")
              , a = "translate(".concat(s.position().x, "px, ").concat(s.position().y, "px) scale(").concat(s.scaleFactor(), ")");
            return p !== f._v$ && ((f._v$ = p) != null ? c.style.setProperty("height", p) : c.style.removeProperty("height")),
            i !== f._v$2 && ((f._v$2 = i) != null ? c.style.setProperty("width", i) : c.style.removeProperty("width")),
            a !== f._v$3 && ((f._v$3 = a) != null ? c.style.setProperty("transform", a) : c.style.removeProperty("transform")),
            f
        }
        , {
            _v$: void 0,
            _v$2: void 0,
            _v$3: void 0
        }),
        u
    }
    )(), (()=>{
        const u = dv()
          , c = t;
        return typeof c == "function" ? De(c, u) : t = u,
        u
    }
    )()]
}
;
Oe(["click"]);
rl(()=>k(pv, {}), document.getElementById("root"));
export {mn as a, He as c, hv as g};
