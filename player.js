var ne = Object.defineProperty;
var h = Object.getOwnPropertySymbols;
var V = Object.prototype.hasOwnProperty
  , $ = Object.prototype.propertyIsEnumerable;
var x = (n,e,t)=>e in n ? ne(n, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
}) : n[e] = t
  , S = (n,e)=>{
    for (var t in e || (e = {}))
        V.call(e, t) && x(n, t, e[t]);
    if (h)
        for (var t of h(e))
            $.call(e, t) && x(n, t, e[t]);
    return n
}
;
var j = (n,e)=>{
    var t = {};
    for (var r in n)
        V.call(n, r) && e.indexOf(r) < 0 && (t[r] = n[r]);
    if (n != null && h)
        for (var r of h(n))
            e.indexOf(r) < 0 && $.call(n, r) && (t[r] = n[r]);
    return t
}
;
import {g as ie, c as N, a as J} from "./index-286de3ff.js";
const oe = {}
  , ae = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: oe
}, Symbol.toStringTag, {
    value: "Module"
}))
  , de = ie(ae);
var G = typeof N < "u" ? N : typeof window < "u" ? window : {}, le = de, y;
typeof document < "u" ? y = document : (y = G["__GLOBAL_DOCUMENT_CACHE@4"],
y || (y = G["__GLOBAL_DOCUMENT_CACHE@4"] = le));
var ce = y;
const u = J(ce);
var b;
typeof window < "u" ? b = window : typeof N < "u" ? b = N : typeof self < "u" ? b = self : b = {};
var ue = b;
const c = J(ue);
/*! @name @brightcove/player-loader @version 1.8.0 @license Apache-2.0 */
function R() {
    return R = Object.assign || function(n) {
        for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r])
        }
        return n
    }
    ,
    R.apply(this, arguments)
}
var se = "1.8.0";
/*! @name @brightcove/player-url @version 1.2.0 @license Apache-2.0 */
var fe = "1.2.0"
  , ve = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
    return typeof n
}
: function(n) {
    return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
}
  , pe = ["catalogSearch", "catalogSequence"]
  , Ee = ["adConfigId", "applicationId", "catalogSearch", "catalogSequence", "playlistId", "playlistVideoId", "videoId"]
  , ye = function(e, t) {
    if (!(!e || e[t] === void 0)) {
        if (typeof e[t] != "string" && pe.indexOf(t) !== -1)
            try {
                return encodeURIComponent(JSON.stringify(e[t]))
            } catch (r) {
                return
            }
        return encodeURIComponent(String(e[t]).trim()) || void 0
    }
}
  , be = function(e) {
    return Object.keys(e).filter(function(t) {
        return Ee.indexOf(t) !== -1
    }).reduce(function(t, r) {
        var i = ye(e, r);
        return i !== void 0 && (t += t ? "&" : "?",
        t += encodeURIComponent(r) + "=" + i),
        t
    }, "")
}
  , z = function(e) {
    var t = e.accountId
      , r = e.base
      , i = r === void 0 ? "https://players.brightcove.net" : r
      , a = e.playerId
      , o = a === void 0 ? "default" : a
      , l = e.embedId
      , d = l === void 0 ? "default" : l
      , p = e.iframe
      , w = p === void 0 ? !1 : p
      , L = e.minified
      , re = L === void 0 ? !0 : L
      , F = e.queryParams
      , _ = F === void 0 ? null : F
      , I = "";
    w ? I += "html" : (re && (I += "min."),
    I += "js"),
    i.charAt(i.length - 1) === "/" && (i = i.substring(0, i.length - 1));
    var M = "";
    return w && _ && (typeof _ > "u" ? "undefined" : ve(_)) === "object" && (M = be(_)),
    t = encodeURIComponent(t),
    o = encodeURIComponent(o),
    d = encodeURIComponent(d),
    i + "/" + t + "/" + o + "_" + d + "/index." + I + M
};
z.VERSION = fe;
var me = {
    embedId: "default",
    embedType: "in-page",
    playerId: "default",
    Promise: c.Promise,
    refNodeInsert: "append"
}
  , ge = "16:9"
  , _e = !1
  , Ie = "100%"
  , H = "video"
  , P = "video-js"
  , T = "in-page"
  , s = "iframe"
  , Q = "append"
  , D = "prepend"
  , U = "before"
  , B = "after"
  , O = "replace"
  , he = ["catalogSearch", "catalogSequence"]
  , C = "https://players.brightcove.net/"
  , Ne = function(e) {
    if (e.playerUrl)
        return e.playerUrl;
    var t = e.accountId
      , r = e.playerId
      , i = e.embedId
      , a = e.embedOptions
      , o = e.embedType === s;
    return z({
        accountId: t,
        playerId: r,
        embedId: i,
        iframe: o,
        base: C,
        minified: a ? !a.unminified : !0,
        queryParams: e
    })
}
  , Re = function() {
    return C
}
  , Pe = function(e) {
    C = e
}
  , v = {
    getUrl: Ne,
    getBaseUrl: Re,
    setBaseUrl: Pe
}
  , K = function(e) {
    return !!(e && e.nodeType === 1)
}
  , Z = function(e) {
    return !!(K(e) && e.parentNode)
}
  , Oe = function(e) {
    var t = u.createElement("iframe");
    return t.setAttribute("allow", "autoplay;encrypted-media;fullscreen"),
    t.setAttribute("allowfullscreen", "allowfullscreen"),
    t.src = v.getUrl(e),
    t
}
  , Ae = function(e) {
    var t = e.embedOptions
      , r = {
        adConfigId: "data-ad-config-id",
        applicationId: "data-application-id",
        catalogSearch: "data-catalog-search",
        catalogSequence: "data-catalog-sequence",
        deliveryConfigId: "data-delivery-config-id",
        playlistId: "data-playlist-id",
        playlistVideoId: "data-playlist-video-id",
        poster: "poster",
        videoId: "data-video-id"
    }
      , i = t && t.tagName || P
      , a = u.createElement(i);
    return Object.keys(r).filter(function(o) {
        return e[o]
    }).forEach(function(o) {
        var l;
        if (typeof e[o] != "string" && he.indexOf(o) !== -1)
            try {
                l = JSON.stringify(e[o])
            } catch (d) {
                return
            }
        else
            l = String(e[o]).trim();
        a.setAttribute(r[o], l)
    }),
    a.setAttribute("controls", "controls"),
    a.classList.add("video-js"),
    a
}
  , we = function(e, t, r) {
    if (!t.responsive)
        return r;
    r.style.position = "absolute",
    r.style.top = "0px",
    r.style.right = "0px",
    r.style.bottom = "0px",
    r.style.left = "0px",
    r.style.width = "100%",
    r.style.height = "100%";
    var i = R({
        aspectRatio: ge,
        iframeHorizontalPlaylist: _e,
        maxWidth: Ie
    }, t.responsive)
      , a = i.aspectRatio.split(":").map(Number)
      , o = u.createElement("div")
      , l = a[1] / a[0] * 100;
    e === s && i.iframeHorizontalPlaylist && (l *= 1.25),
    o.style.paddingTop = l + "%",
    o.appendChild(r);
    var d = u.createElement("div");
    return d.style.position = "relative",
    d.style.display = "block",
    d.style.maxWidth = i.maxWidth,
    d.appendChild(o),
    d
}
  , Se = function(e, t) {
    if (!e.pip)
        return t;
    var r = u.createElement("div");
    return r.classList.add("vjs-pip-container"),
    r.appendChild(t),
    r
}
  , Te = function(e, t, r) {
    return t ? Se(t, we(e, t, r)) : r
}
  , De = function(e, t) {
    var r = e.refNode
      , i = e.refNodeInsert
      , a = r.parentNode
      , o = Te(e.embedType, e.embedOptions, t);
    if (i === U ? a.insertBefore(o, r) : i === B ? a.insertBefore(o, r.nextElementSibling || null) : i === O ? a.replaceChild(o, r) : i === D ? r.insertBefore(o, r.firstChild || null) : r.appendChild(o),
    e.embedOptions && e.embedOptions.playlist) {
        var l = e.embedOptions.playlist.legacy ? "ul" : "div"
          , d = u.createElement(l);
        d.classList.add("vjs-playlist"),
        t.parentNode.insertBefore(d, t.nextElementSibling || null)
    }
    return e.refNode = null,
    t
}
  , Ue = function(e, t) {
    if (typeof e.onEmbedCreated != "function")
        return t;
    var r = e.onEmbedCreated(t);
    return K(r) ? r : t
}
  , Be = function(e) {
    var t = e.embedType === s ? Oe(e) : Ae(e);
    return De(e, Ue(e, t))
}
  , m = new c.Map
  , A = function(e) {
    var t = e.accountId
      , r = e.playerId
      , i = e.embedId;
    return (t || "*") + "_" + r + "_" + i
}
  , Ce = function(e) {
    m.set(A(e), e.accountId ? v.getUrl(e) : "")
}
  , Le = function(e) {
    return m.has(A(e))
}
  , Fe = function(e) {
    return m.get(A(e))
}
  , Me = function() {
    m.clear()
}
  , xe = function(e) {
    m.forEach(e)
}
  , f = {
    clear: Me,
    forEach: xe,
    get: Fe,
    has: Le,
    key: A,
    store: Ce
}
  , X = /^([A-Za-z0-9]+)_([A-Za-z0-9]+)$/
  , k = function() {
    return c.bc ? Object.keys(c.bc).filter(function(e) {
        return X.test(e)
    }) : []
}
  , Ve = function() {
    return Object.keys(c).filter(function(e) {
        return /^videojs/i.test(e) || /^(bc)$/.test(e)
    })
}
  , q = function(e) {
    e && Object.keys(e.players).forEach(function(t) {
        var r = e.players[t];
        r && r.dispose()
    })
}
  , $e = function() {
    f.forEach(function(e, t) {
        e && Array.prototype.slice.call(u.querySelectorAll('script[src="' + e + '"]')).forEach(function(r) {
            return r.parentNode.removeChild(r)
        })
    }),
    f.clear(),
    q(c.videojs),
    k().forEach(function(e) {
        return q(c.bc[e].videojs)
    }),
    Ve().forEach(function(e) {
        delete c[e]
    })
}
  , je = function() {
    k().forEach(function(e) {
        var t = e.match(X)
          , r = {
            playerId: t[1],
            embedId: t[2]
        };
        f.has(r) || f.store(r)
    })
}
  , ee = {
    detectPlayers: je,
    reset: $e
};
ee.detectPlayers();
var E = function(e) {
    return typeof e == "function"
}
  , Ge = function(e) {
    return e === T || e === s
}
  , qe = function(e) {
    return e === P || e === H
}
  , Ye = function(e) {
    return e === Q || e === D || e === U || e === B || e === O
}
  , We = function(e) {
    var t = e.accountId
      , r = e.embedOptions
      , i = e.embedType
      , a = e.options
      , o = e.refNode
      , l = e.refNodeInsert;
    if (t)
        if (Z(o))
            if (Ge(i)) {
                if (i === s && a)
                    throw new Error("cannot use options with an iframe embed");
                if (r && r.tagName !== void 0 && !qe(r.tagName))
                    throw new Error('embedOptions.tagName is invalid (value: "' + r.tagName + '")');
                if (r && r.responsive && r.responsive.aspectRatio && !/^\d+\:\d+$/.test(r.responsive.aspectRatio))
                    throw new Error('embedOptions.responsive.aspectRatio must be in the "n:n" format (value: "' + r.responsive.aspectRatio + '")');
                if (!Ye(l))
                    throw new Error("refNodeInsert is missing or invalid")
            } else
                throw new Error("embedType is missing or invalid");
        else
            throw new Error("refNode must resolve to a node attached to the DOM");
    else
        throw new Error("accountId is required")
}
  , Je = function(e) {
    return Z(e) ? e : typeof e == "string" ? u.querySelector(e) : null
}
  , Y = function(e, t, r, i) {
    var a = e.embedId
      , o = e.playerId
      , l = c.bc[o + "_" + a] || c.bc;
    if (!l)
        return i(new Error("missing bc function for " + o));
    f.store(e);
    var d;
    try {
        d = l(t, e.options),
        d.bcinfo && (d.bcinfo.PLAYER_LOADER = !0)
    } catch (w) {
        var p = "Could not initialize the Brightcove Player.";
        return e.embedOptions.tagName === P && (p += ' You are attempting to embed using a "video-js" element. Please ensure that your Player is v6.11.0 or newer in order to support this embed type. Alternatively, pass `"video"` for `embedOptions.tagName`.'),
        i(new Error(p))
    }
    r({
        type: T,
        ref: d
    })
}
  , W = function(e, t, r) {
    e.refNode = Je(e.refNode),
    We(e);
    var i = e.refNode
      , a = e.refNodeInsert
      , o = i.parentNode
      , l = Be(e);
    if (e.embedType === s) {
        t({
            type: s,
            ref: l
        });
        return
    }
    if (f.has(e))
        return Y(e, l, t, r);
    var d = u.createElement("script");
    d.onload = function() {
        return Y(e, l, t, r)
    }
    ,
    d.onerror = function() {
        r(new Error("player script could not be downloaded"))
    }
    ,
    d.async = !0,
    d.charset = "utf-8",
    d.src = v.getUrl(e),
    a === O ? o.appendChild(d) : i.appendChild(d)
}
  , te = function(e) {
    var t = R({}, me, e)
      , r = t.Promise
      , i = t.onSuccess
      , a = t.onFailure;
    return !E(r) || E(i) || E(a) ? W(t, E(i) ? i : function() {}
    , E(a) ? a : function(o) {
        throw o
    }
    ) : new r(function(o, l) {
        return W(t, o, l)
    }
    )
}
  , g = function(e, t) {
    Object.defineProperty(te, e, {
        configurable: !1,
        enumerable: !0,
        value: t,
        writable: !1
    })
};
g("getBaseUrl", function() {
    return v.getBaseUrl()
});
g("setBaseUrl", function(n) {
    v.setBaseUrl(n)
});
g("getUrl", function(n) {
    return v.getUrl(n)
});
g("reset", function() {
    return ee.reset()
});
[["EMBED_TAG_NAME_VIDEO", H], ["EMBED_TAG_NAME_VIDEOJS", P], ["EMBED_TYPE_IN_PAGE", T], ["EMBED_TYPE_IFRAME", s], ["REF_NODE_INSERT_APPEND", Q], ["REF_NODE_INSERT_PREPEND", D], ["REF_NODE_INSERT_BEFORE", U], ["REF_NODE_INSERT_AFTER", B], ["REF_NODE_INSERT_REPLACE", O], ["VERSION", se]].forEach(function(n) {
    g(n[0], n[1])
});
const Qe = async n=>{
    const r = n
      , {options: e} = r
      , t = j(r, ["options"]);
    try {
        return (await te(S({
            options: S({
                fill: !0,
                loop: !0,
                muted: !0,
                autoplay: !0,
                preload: "auto"
            }, e),
            playerId: "Onv6WvVDJ",
            accountId: "6415716420001"
        }, t))).ref
    } catch (i) {
        return null
    }
}
;
export {Qe as initPlayer};
