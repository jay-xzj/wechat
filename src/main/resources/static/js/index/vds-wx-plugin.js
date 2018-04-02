!function e(t, o, n) {
    function r(l, c) {
        if (!o[l]) {
            if (!t[l]) {
                var a = "function" == typeof require && require;
                if (!c && a) return a(l, !0);
                if (i) return i(l, !0);
                throw new Error("Cannot find module '" + l + "'")
            }
            var s = o[l] = {exports: {}};
            t[l][0].call(s.exports, function (e) {
                var o = t[l][1][e];
                return r(o ? o : e)
            }, s, s.exports, e, t, o, n)
        }
        return o[l].exports
    }

    for (var i = "function" == typeof require && require, l = 0; l < n.length; l++) r(n[l]);
    return r
}({
    1: [function (e, t, o) {
        var n, r;
        r = e("cookie"), n = function () {
            function e() {
            }

            return e.get = function (e) {
                var t;
                try {
                    return window.localStorage ? this._readFromLocalStorage(e) : this._readFromCookie(e)
                } catch (o) {
                    return t = o, null
                }
            }, e.set = function (e, t, o) {
                var n;
                null == o && (o = 864e5);
                try {
                    return window.localStorage ? this._setInLocalStorage(e, t, o) : this._setInCookie(e, t, o / 1e3)
                } catch (r) {
                    return n = r, null
                }
            }, e._readFromCookie = function (e) {
                return r.getItem(e)
            }, e._setInCookie = function (e, t, o) {
                return r.setItem(e, t, o, "/", window.location.hostname)
            }, e._readFromLocalStorage = function (e) {
                var t, o;
                return o = window.localStorage.getItem(e), o ? (t = JSON.parse(o), t.expiredAt && +t.expiredAt >= +Date.now() ? t.value : null) : null
            }, e._setInLocalStorage = function (e, t, o) {
                return window.localStorage.setItem(e, JSON.stringify({expiredAt: +Date.now() + o, value: t}))
            }, e
        }(), window.GrLocalStore = n, t.exports = n
    }, {cookie: 6}], 2: [function (e, t, o) {
        var n, r;
        e("./gr_local_store"), n = e("./plugin_loader"), r = new n, r.beginLoad()
    }, {"./gr_local_store": 1, "./plugin_loader": 4}], 3: [function (e, t, o) {
        var n, r;
        r = e("./util"), n = function () {
            function e() {
                this.bind()
            }

            return e.prototype.bind = function () {
                return r.bind(window, "message", function (e) {
                    return function (t) {
                        var o;
                        if (o = t.data, o.ai === window.vds.accountId && (t.origin === window.vds.origin || -1 !== r.indexOf(["www.growingio.com", "growingio.com"], t.origin.split("://")[1]) || window.GrLocalStore.get("gr_circle"))) switch (t.origin !== window.vds.origin && (window.vds.origin = t.origin), o.mode) {
                            case"mobile-circle-mode":
                                return e.startCircle();
                            case"mobile-browse-mode":
                                return e.stopCircle()
                        }
                    }
                }(this))
            }, e.prototype.startCircle = function () {
                var e, t, o, n, r;
                if (!this.pluginLoaded) for (n = document.getElementsByTagName("script"), t = 0, o = n.length; o > t; t++) if (e = n[t], r = e.getAttribute("src"), null != r && -1 !== r.indexOf("/wx-circle-plugin.js")) {
                    this.pluginLoaded = !0;
                    break
                }
                return this.pluginLoaded ? this.publishCircle() : void 0
            }, e.prototype.stopCircle = function () {
                return "undefined" != typeof CircleEvents && null !== CircleEvents ? CircleEvents.publish("circle:stop") : void 0
            }, e.prototype.publishCircle = function () {
                return "undefined" != typeof CircleEvents && null !== CircleEvents ? CircleEvents.publish("circle:start") : setTimeout(function (e) {
                    return function () {
                        return e.publishCircle()
                    }
                }(this), 2e3)
            }, e
        }(), t.exports = n
    }, {"./util": 5}], 4: [function (e, t, o) {
        var n, r, i, l = function (e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        };
        i = e("./util"), n = e("./message_handler"), r = function () {
            function e() {
                this.loadPlugin = l(this.loadPlugin, this), this.checkVdsForLoadPlugin = l(this.checkVdsForLoadPlugin, this), this.beginMobileCircle = l(this.beginMobileCircle, this), this.failToLoadPlugin = l(this.failToLoadPlugin, this), this.cancelSDKLoad = l(this.cancelSDKLoad, this), this.goBackAppList = l(this.goBackAppList, this)
            }

            var t;
            return t = "https://growing.ufilesec.ucloud.cn/sdk/wx", e.prototype.beginLoad = function () {
                return console.log("beginLoad"), this.beginLoad.done ? void 0 : (this.beginLoad.done = !0, this.registerCircleHandler())
            }, e.prototype.registerCircleHandler = function () {
                var e, t, o, n, r, l, c, a;
                return o = !1, r = window.GrLocalStore.get("gr_circle"), a = window.GrLocalStore.get("gr_project_id"), l = window.GrLocalStore.get("gr_token"), c = window.GrLocalStore.get("gr_login_token"), window.project = {id: a}, t = i.fetchGetParameterByNameFromUrl("gr_login_token"), console.log("store_gr_circle: " + r), console.log("store_project_id: " + a), console.log("store_login_token: " + c), console.log("gr_login_token: " + t), console.log("login_token store != gr: " + (c !== t)), r && a && l && (t ? c === t && (o = !0) : o = !0, console.log("gr_login_token", t), console.log("hasStoredMobileCircleData", o), o && this.checkVdsForLoadPlugin()), e = i.fetchGetParameterByNameFromUrl("gr_circle"), n = i.fetchGetParameterByNameFromUrl("gr_project_id"), e && n && t ? this.beginMobileCircle(o) : void 0
            }, e.prototype.goBackAppList = function () {
                return window.location.href = "http://www.growingio.com/apps/"
            }, e.prototype.cancelSDKLoad = function () {
                var e;
                return e = document.getElementById("dialogNode"), document.body.removeChild(e)
            }, e.prototype.failToLoadPlugin = function () {
                return i.showDialog("您的圈�?�授权已失效，请您重新申请圈选授�?", this.goBackAppList, this.cancelSDKLoad)
            }, e.prototype.beginMobileCircle = function (e) {
                var t, o, n, r;
                return console.log("hasStoredMobileCircleData: " + e), e ? void 0 : (t = i.fetchGetParameterByNameFromUrl("gr_circle"), n = i.fetchGetParameterByNameFromUrl("gr_project_id"), o = i.fetchGetParameterByNameFromUrl("gr_login_token"), t && n && o ? (r = new XMLHttpRequest, r.open("POST", "https://accounts.growingio.com/oauth/access_token"), r.addEventListener("load", function (e) {
                    return function (r) {
                        var i, l;
                        return l = r.target, console.log("xhr.readyState: " + r.target.readyState), console.log("xhr.responseText: " + r.target.responseText), 4 === l.readyState ? (i = JSON.parse(l.responseText), i.accessToken ? (window.GrLocalStore.set("gr_project_id", n), window.GrLocalStore.set("gr_circle", t), window.GrLocalStore.set("gr_token", i.accessToken), window.GrLocalStore.set("gr_login_token", o), console.log("set gr_circle", t), window.project = {id: i.projectId}, e.checkVdsForLoadPlugin()) : void e.failToLoadPlugin()) : void e.failToLoadPlugin()
                    }
                }(this)), r.addEventListener("error", function (e) {
                    return function (t) {
                        console.log("error xhr.responseText: " + t.target.responseText), e.failToLoadPlugin()
                    }
                }(this)), r.addEventListener("abort", function (e) {
                    return function (t) {
                        console.log("abort xhr.responseText: " + t.target.responseText), e.failToLoadPlugin()
                    }
                }(this)), r.send(JSON.stringify({
                    grantType: "login_token",
                    loginToken: o
                })), console.log("send gr_login_token: " + o)) : void 0)
            }, e.prototype.checkVdsForLoadPlugin = function () {
                return console.log("checkVdsForLoadPlugin:" + window.vds), window.vds && window.vds.accountId ? this.loadPlugin() : setTimeout(this.checkVdsForLoadPlugin, 1e3)
            }, e.prototype.loadPlugin = function () {
                var e, o, r, i, l, c, a;
                for (this.pluginLoaded = !1, this.messageHandler = new n, c = document.getElementsByTagName("script"), i = 0, l = c.length; l > i; i++) if (r = c[i], a = r.getAttribute("src"), null != a && -1 !== a.indexOf("/wx-circle-plugin.js")) {
                    this.pluginLoaded = !0;
                    break
                }
                return this.pluginLoaded ? void 0 : (e = document.createElement("script"), e.type = "text/javascript", e.charset = "UTF-8", e.src = t + "/wx-circle-plugin.js", document.head.appendChild(e), o = document.createElement("link"), o.rel = "stylesheet", o.href = t + "/wx-circle-plugin.css", document.head.appendChild(o))
            }, e
        }(), t.exports = r
    }, {"./message_handler": 3, "./util": 5}], 5: [function (e, t, o) {
        var n;
        n = {
            fetchGetParameterByNameFromUrl: function (e, t) {
                var o, n;
                return t || (t = window.location.href), e = e.replace(/[\[\]]/g, "\\$&"), o = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)"), n = o.exec(t), n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
            }, indexOf: function (e, t) {
                var o, n, r;
                if (null != Array.prototype.indexOf) return e.indexOf(t);
                for (n = e.length, o = -1; ++o < n;) if (r = e[o], r === t) return o;
                return -1
            }, bind: function (e, t, o, n) {
                return null == n && (n = !1), null != document.addEventListener ? e.addEventListener(t, o, n) : null != document.attachEvent ? e.attachEvent("on" + t, function () {
                    var t;
                    return t = window.event, t.currentTarget = e, t.target = t.srcElement, o.call(e, t)
                }) : e["on" + t] = o
            }, unbind: function (e, t, o, n) {
                var r;
                if (null != e) return null != document.removeEventListener ? e.removeEventListener(t, o, n) : null != document.detachEvent ? (r = t + o, e.detachEvent("on" + t, e[r]), e[r] = null, e["e" + r] = null) : e["on" + t] = null, !0
            }, bindOnce: function (e, t, o, r) {
                return null == r && (r = !1), n.unbind(e, t, o, r), n.bind(e, t, o, r)
            }, showDialog: function (e, t, o) {
                var r, i, l, c, a, s, d;
                return s = "", r = "", t && (s = '<span id="growingIOSDKOkButton" style="display:table-cell;width:50%;text-align:center;line-height:50px;height:50px;color:#39a3e2">确定</span>'), o && (r = '<span id="growingIOSDKCancelButton" style="display:table-cell;width:50%;text-align:center;line-height:50px;height:50px">取消</span>'), t && o && (d = '<div style="display:table;width:100%;height:50px;position:absolute;top:60%">' + s + r + "</div>"), i = d ? '<div style = "position:absolute;width:80%;height:150px;top:calc(50% - 100px);left:10%;background:#ffffff"><div style="width:80%;left:10%;height:100px;position:absolute; padding-top:10px;">' + e + "</div>" + d + "</div>" : '<div style = "position:absolute;width:80%;height:100px;top:calc(50% -50px);left:10%;background:#ffffff">' + e + "</div>", l = document.createElement("div"), l.innerHTML = i, l.id = "dialogNode", l.style.position = "fixed", l.style.width = "100%", l.style.height = "100%", l.style.zIndex = "9999999999", l.style.color = "#4a4a4a", l.style.fontSize = "14px", l.style.top = "0px", l.style.left = "0px", l.style.margin = "0px", l.style.backgroundColor = "rgba(0,0,0,0.7)", document.body.appendChild(l), a = document.getElementById("growingIOSDKOkButton"), c = document.getElementById("growingIOSDKCancelButton"), n.bindOnce(a, "click", t), n.bindOnce(c, "click", o)
            }
        }, t.exports = n
    }, {}], 6: [function (e, t, o) {
        var n = {
            getItem: function (e) {
                return e ? decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null
            }, setItem: function (e, t, o, n, r, i) {
                if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
                var l = "";
                if (o) switch (o.constructor) {
                    case Number:
                        l = o === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + new Date((new Date).getTime() + 1e3 * o).toUTCString();
                        break;
                    case String:
                        l = "; expires=" + o;
                        break;
                    case Date:
                        l = "; expires=" + o.toUTCString()
                }
                return document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + l + (r ? "; domain=" + r : "") + (n ? "; path=" + n : "") + (i ? "; secure" : ""), !0
            }, removeItem: function (e, t, o) {
                return this.hasItem(e) ? (document.cookie = encodeURIComponent(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (o ? "; domain=" + o : "") + (t ? "; path=" + t : ""), !0) : !1
            }, hasItem: function (e) {
                return e ? new RegExp("(?:^|;\\s*)" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie) : !1
            }, keys: function () {
                for (var e = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), t = e.length, o = 0; t > o; o++) e[o] = decodeURIComponent(e[o]);
                return e
            }
        }, r = {
            getItem: n.getItem,
            removeItem: n.removeItem,
            hasItem: n.hasItem,
            keys: n.keys,
            setItem: function (e, t, o, r, i, l) {
                for (var c = 0; c < i.length && (n.setItem(e, t, o, r, i[c], l), !n.getItem(e)); c++) ;
            }
        };
        t.exports = r
    }, {}]
}, {}, [2]);