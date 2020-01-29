! function() {
    function a() {
        var a = document.createElement("link");
        a.setAttribute("rel", "stylesheet"), a.setAttribute("href", chrome.extension.getURL("css/content.css")), document.head.appendChild(a);
        var b = document.createElement("link");
        b.setAttribute("rel", "stylesheet"), b.setAttribute("href", chrome.extension.getURL("css/font-awesome.min.css")), document.head.appendChild(b);
        var c = document.createElement("link");
        c.setAttribute("rel", "stylesheet"), c.setAttribute("href", chrome.extension.getURL("css/emoji.css")), document.head.appendChild(c)
    }

    function b(a) {
        var b = $(a);
        b.length && chrome.storage.sync.get("user_popup_rate", function(a) {
            function c(a) {
                k = !0;
                var b = this.dataset.pos;
                i.each(function(a, c) {
                    c.dataset.pos <= b ? (c.querySelector(".empty").style.display = "none", c.querySelector(".filled").style.display = "inline") : (c.querySelector(".empty").style.display = "inline", c.querySelector(".filled").style.display = "none")
                })
            }

            function d(a) {
                g || (k = !1, setTimeout(function() {
                    k || i.each(function(a, b) {
                        b.querySelector(".empty").style.display = "inline", b.querySelector(".filled").style.display = "none"
                    })
                }, 100))
            }

            function e(a) {
                g = !0;
                var b = this.dataset.pos;
                i.each(function(a, c) {
                    c.dataset.pos <= b && (c.querySelector(".empty").style.display = "none", c.querySelector(".filled").style.display = "inline")
                }), i.each(function(a, b) {
                    b.removeEventListener("mouseover", c), b.removeEventListener("mouseout", d), b.removeEventListener("click", e)
                }), chrome.runtime.sendMessage({
                    action: "user_popup_rate",
                    value: b
                }), 3 >= b && !h && j.text(chrome.i18n.getMessage("your_rate"))
            }
            if (!a.user_popup_rate) {
                var f = $('<div class="ext_direct_rate"><span class="ext_text">Rate us</span><span class="stars"><a class="star" data-pos="1"><span class="empty"></span><span class="filled"></span></a><a class="star" data-pos="2"><span class="empty"></span><span class="filled"></span></a><a class="star" data-pos="3"><span class="empty"></span><span class="filled"></span></a><a class="star" data-pos="4"><span class="empty"></span><span class="filled"></span></a><a class="star" data-pos="5"><span class="empty"></span><span class="filled"></span></a></span></div>');
                b.append(f), $("#react-root > section > div:last-child").css({
                    paddingTop: "66px"
                });
                var g = !1,
                    h = !1,
                    i = f.find(".stars a"),
                    j = f.find(".ext_text"),
                    k = !1;
                j.text(chrome.i18n.getMessage("rate_us_popup")), i.each(function(a, b) {
                    b.querySelector(".empty").style.display = "inline", b.querySelector(".filled").style.display = "none"
                }), i.each(function(a, b) {
                    b.addEventListener("mouseover", c), b.addEventListener("mouseout", d), b.addEventListener("click", e)
                })
            }
        })
    }

    function c(a) {
        chrome.runtime.sendMessage("getCookies", function(b) {
            a(!!b.sessionid)
        })
    }

    function d() {
        var a, b, c, d = !1,
            f = !1;
        window.addEventListener("keydown", function(b) {
            if (16 == b.keyCode && (d = !0), 13 == b.keyCode && s) {
                if (d) return;
                if (!f) return;
                if (!a || !a.parentElement || !a.innerText.length) return;
                b.stopPropagation(), b.preventDefault(), c && c.click()
            }
        }), window.addEventListener("keyup", function(a) {
            16 == a.keyCode && (d = !1)
        }), setInterval(function() {
            t && e(), /direct\/t\/\w+/.test(window.location.pathname) && document.querySelectorAll("textarea:not([data-ext_direct_ready])").forEach(function(d) {
                if (d.placeholder.length) {
                    a = d, d.dataset.ext_direct_ready = "true", d.dataset.emojiable = "true", d.dataset.emojiInput = "unicode", window.emojiPicker = new EmojiPicker({
                        emojiable_selector: "[data-emojiable=true]",
                        assetsPath: chrome.extension.getURL("img/emoji/"),
                        popupButtonClasses: "fa fa-smile-o",
                        norealTime: !1
                    }), window.emojiPicker.discover();
                    var e = d.parentElement.parentElement,
                        g = {
                            attributes: !1,
                            childList: !0,
                            characterData: !1,
                            subtree: !0
                        },
                        h = new MutationObserver(function(a) {
                            a.forEach(function(a) {
                                a.addedNodes.length && a.addedNodes[0].tagName && "div" === a.addedNodes[0].tagName.toLowerCase() && a.addedNodes[0].querySelector("button") && (c = a.addedNodes[0].querySelector("button"), c.addEventListener("click", function() {
                                    b.innerHTML = ""
                                }))
                            })
                        });
                    h.observe(e, g), b = document.querySelector(".emoji-wysiwyg-editor"), b.addEventListener("focus", function(a) {
                        f = !0
                    }), b.addEventListener("blur", function(a) {
                        f = !1
                    })
                }
            })
        }, 1e3)
    }

    function e() {
        -1 !== window.location.href.indexOf("direct/t/") && (document.querySelectorAll("section > .IEL5I video:not([data-ig_skip])").forEach(function(a) {
            f(a)
        }), document.querySelectorAll("section > .IEL5I img:not([data-ig_skip])").forEach(function(a) {
            f(a)
        }))
    }

    function f(a) {
        var b;
        if ("img" == a.tagName.toLowerCase() ? b = g(a) : "video" == a.tagName.toLowerCase() && (b = a.getAttribute("src") || a.querySelector("source").getAttribute("src")), b && !(b.indexOf("blob:") > -1) && 0 != $(a).closest('[role="button"]').length) {
            a.dataset.ig_skip = "1", $parent = $(a).parent();
            var c = {
                url: b,
                filename: v.getFromLink(b)
            };
            if (c.url && c.filename) {
                var d = $('<div class="ext_ig_btns_wrap"></div>'),
                    e = $('<button class="ext_ig_dl_btn">' + chrome.i18n.getMessage("download") + "</button>").data(c),
                    f = $('<button class="ext_ig_exp_btn">' + chrome.i18n.getMessage("expand") + "</button>").data(c);
                d.append(e).append(f), $parent.append(d)
            }
        }
    }

    function g(a) {
        var b = a.getAttribute("srcset");
        if (b) {
            var c = {},
                d = b.split(",");
            d.forEach(function(a) {
                var b = a.split(" "),
                    d = b[1].replace(/[^\d]/, "");
                c[d] || (c[d] = b[0])
            });
            var e = 0;
            for (var f in c) + f > +e && (e = f);
            var g = c[e]
        }
        return "string" == typeof g && g.match(/\.(jpg|png)/) || (g = a.getAttribute("src")), "string" != typeof g ? null : g
    }

    function h() {
        $("#react-root").hide();
        var a = $('<div class="ext_settings_wrap">' + u.outerHTML + '<div class="ext_settings_content"><div class="ext_settings_item send_img_from_anywhere" data-type="send_img_from_anywhere"><span class="ext_title">' + chrome.i18n.getMessage("send_img_from_anywhere") + ' <span class="ext_important">(BETA version)</span></span><span class="ext_help_img_icon"></span><div class="ext_push-toggle selector"><div class="ext_point"></div></div></div><div class="ext_settings_item send_by_enter" data-type="send_by_enter"><span class="ext_title">' + chrome.i18n.getMessage("send_by_enter") + '</span><div class="ext_push-toggle selector"><div class="ext_point"></div></div></div><div class="ext_settings_item ext_notifications" data-type="ext_notifications"><span class="ext_title">' + chrome.i18n.getMessage("notifications") + '</span><div class="ext_push-toggle selector"><div class="ext_point"></div></div></div><div class="ext_settings_item show_action_buttons" data-type="show_action_buttons"><span class="ext_title">' + chrome.i18n.getMessage("actions_btns") + '</span><span class="ext_help_img_icon"></span><div class="ext_push-toggle selector"><div class="ext_point"></div></div></div></div></div>');
        $("body").append(a);
        var b = a.find('header a[href="/"]');
        0 == b.length && (b = $('<a class=" Iazdo" href="/direct/inbox/"><span style="display: inline-block; transform: rotate(270deg);"><svg aria-label="Назад" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path></svg></span></a>'), a.find("header > div > div:first-child").append(b)), tippy(".send_img_from_anywhere .ext_help_img_icon", {
            content: chrome.i18n.getMessage("send_img_from_anywhere_help_message")
        }), tippy(".show_action_buttons .ext_help_img_icon", {
            content: chrome.i18n.getMessage("show_action_buttons_help_message")
        }), chrome.storage.sync.get("settings", function(b) {
            var c = b.settings || {};
            c.send_img_from_anywhere && a.find(".send_img_from_anywhere").addClass("active"), c.send_by_enter && a.find(".send_by_enter").addClass("active"), c.ext_notifications && a.find(".ext_notifications").addClass("active"), c.show_action_buttons && a.find(".show_action_buttons").addClass("active")
        });
        var c = a.find(".ext_push-toggle");
        c.on("click", function() {
            var a = $(this).closest(".ext_settings_item"),
                b = a.data().type;
            chrome.storage.sync.get("settings", function(c) {
                var d = c.settings || {};
                a.hasClass("active") ? (a.removeClass("active"), d[b] = !1) : (a.addClass("active"), d[b] = !0), chrome.storage.sync.set({
                    settings: d
                }), "send_by_enter" == b && (s = d[b]), "show_action_buttons" == b && (t = d[b])
            })
        }), b.on("click", function(b) {
            b.preventDefault(), b.stopPropagation(), a.remove(), $("#react-root").show()
        })
    }

    function i(a) {
        null === u && (u = a.cloneNode(!0), $(u).find("h1").text(chrome.i18n.getMessage("settings_header")), $(u).find("h1+div").html(""))
    }

    function j() {
        var a = document.querySelector("#react-root > section > div > header");
        a && (a.dataset.ext_direct_header || (a.dataset.ext_direct_header = "1", setTimeout(function() {
            if (i(a), !a.querySelector('a[href="/"]')) {
                var c = $('<a class=" Iazdo" href="/"><span style="display: inline-block; transform: rotate(270deg);"><svg aria-label="Назад" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path></svg></span></a>');
                $(a).find(" > div > div:first-child").append(c)
            }
            var d = document.createElement("div");
            d.className = "ext_direct_header", a.appendChild(d), b(d), $("h1+div", a).prepend('<button class="ext_direct_settings_btn"><span></span></button>')
        }, 200)))
    }

    function k(a, b, c) {
        var d = new XMLHttpRequest;
        d.open("GET", a.url, !0), d.responseType = "arraybuffer", d.onreadystatechange = function(d) {
            if (4 === this.readyState)
                if (200 === this.status) try {
                    var e = this.response || this.responseText,
                        f = new Blob([e], {
                            type: "application/octet-stream"
                        });
                    saveAs(f, a.filename), "function" == typeof c && c(!0)
                } catch (d) {
                    b.dataset.in_progress = "", c(!1)
                } else b.dataset.in_progress = "", c(!1)
        }, b.dataset.in_progress = "1";
        var e = document.createElement("span");
        e.className = "ext_ig_prgr", d.onprogress = function(a) {
            b.querySelector(".ext_ig_prgr") || b.appendChild(e), a.loaded < a.total ? e.innerText = Math.round(a.loaded / a.total * 100).toString() + "%" : (b.dataset.in_progress = "", e.remove())
        }, d.send()
    }

    function l() {
        var a = document.querySelector("#react-root");
        if (a) {
            var b = {
                    attributes: !1,
                    childList: !0,
                    characterData: !1,
                    subtree: !0
                },
                c = new MutationObserver(function(a) {
                    a.forEach(function(a) {
                        if (a.addedNodes.length) {
                            var b = a.addedNodes[0];
                            b.tagName && "header" == b.tagName.toLowerCase() && window.location.href.indexOf("/direct/inbox") > -1 && j()
                        }
                    })
                });
            c.observe(a, b)
        }
    }

    function m() {
        return document.querySelector(".error-container") ? (chrome.runtime.sendMessage("error_page"), !0) : void 0
    }

    function n() {
        -1 === window.navigator.userAgent.toLowerCase().indexOf("mobile") && -1 === window.navigator.appVersion.toLowerCase.indexOf("mobile")
    }

    function o() {
        !document.querySelector('[href*="/direct/t/"]') && document.querySelectorAll(".IEL5I div").length > 20
    }

    function p() {
        var a = location.href.match(/#send_external=([^&]+)/);
        if (a = a && a[1]) {
            try {
                a = JSON.parse(decodeURIComponent(a))
            } catch (b) {
                return
            }
            var c = a.link,
                d = a.thread_id,
                e = a.thread_title;
            $("body").append('<div class="ext_wrap_confirm_send_external"><div class="ext_msg_confirm_send_external"><div class="ext_text">Do you confirm sending the image <span class="ext_external_link" ">' + c + "</span> to thread with " + e + '</div><div class="ext_button_wrap"><button class="ext_btn_ok">Yes</button><button class="ext_btn_cancel">Cancel</button></div></div><div class="ext_wrap_external_img"><img src="' + c + '"></div></div>'), document.querySelector(".ext_wrap_confirm_send_external .ext_btn_cancel").addEventListener("click", function() {
                $(this).closest(".ext_wrap_confirm_send_external").remove()
            }), document.querySelector(".ext_wrap_confirm_send_external .ext_btn_ok").addEventListener("click", function() {
                var a = $(this),
                    b = a.closest(".ext_wrap_confirm_send_external");
                $(".ext_button_wrap", b).html('<div class="ext_loader"></div>'), $(".ext_text", b).html(""), x.sendExternalImage(c, d, function() {
                    setTimeout(function() {
                        var a = document.querySelector('a[href*="direct/t/' + d + '"]');
                        a && a.click(), b.remove()
                    }, 1e3)
                })
            })
        }
    }

    function q() {
        var a = $("body");
        a.on("click", ".ext_ig_dl_btn", function(a) {
            if (a.preventDefault(), a.stopPropagation(), "1" != this.dataset.in_progress) {
                var b = $(this).data();
                k(b, this, function() {})
            }
        }), a.on("click", ".ext_ig_exp_btn", function(a) {
            a.preventDefault(), a.stopPropagation(), chrome.runtime.sendMessage({
                action: "openMediaInTab",
                url: $(this).data().url
            })
        }), a.on("click", ".ext_direct_settings_btn", function(a) {
            a.preventDefault(), a.stopPropagation(), h()
        })
    }

    function r() {
        chrome.storage.sync.get("settings", function(a) {
            var b = a.settings || {};
            s = b.send_by_enter || !1, t = b.show_action_buttons || !1
        })
    }
    if (!window.insta_ext_direct_7483) {
        window.insta_ext_direct_7483 = 1;
        var s = !1,
            t = !1,
            u = null,
            v = {
                getFromLink: function(a, b) {
                    if ("string" != typeof a) return null;
                    var c = "jpg";
                    if (-1 !== a.indexOf(".png")) c = "png";
                    else if (-1 !== a.indexOf(".jpg")) c = "png";
                    else if (-1 !== a.indexOf(".mp4")) c = "mp4";
                    else if (-1 !== a.indexOf(".flv")) c = "flv";
                    else {
                        if (-1 === a.indexOf(".gif")) return null;
                        c = "gif"
                    }
                    var d = a.match(/\/([^\/?]+)(?:$|\?)/);
                    return d = d && d[1], d || (d = Math.floor(1e4 * Math.random()) + "_noname." + c), b && (d = b + "_" + d), this.modify(d)
                },
                rtrim: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                illegalRe: /[\/\?<>\\:\*\|"~]/g,
                controlRe: /[\x00-\x1f\x80-\x9f]/g,
                reservedRe: /^\.+/,
                partsRe: /^(.+)\.([a-z0-9]{1,4})$/i,
                specialChars: "nbsp,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,times,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,divide,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml".split(","),
                specialCharsList: [
                    ["amp", "quot", "lt", "gt"],
                    [38, 34, 60, 62]
                ],
                specialCharsRe: /&([^;]{2,6});/g,
                rnRe: /\r?\n/g,
                re1: /[\*\?"]/g,
                re2: /</g,
                re3: />/g,
                spaceRe: /[\s\t\uFEFF\xA0]+/g,
                dblRe: /(\.|!|\?|_|,|\-|:|\+){2,}/g,
                re4: /[\.,:;\/\-_\+=']$/g,
                decodeUnicodeEscapeSequence: function(a) {
                    var b = /\\(\\u[0-9a-f]{4})/g;
                    try {
                        return JSON.parse(JSON.stringify(a).replace(b, "$1"))
                    } catch (c) {
                        return a
                    }
                },
                decodeSpecialChars: function(a) {
                    var b = this;
                    return a.replace(this.specialCharsRe, function(a, c) {
                        var d = null;
                        if ("#" === c[0]) return d = parseInt(c.substr(1)), isNaN(d) ? "" : String.fromCharCode(d);
                        var e = b.specialCharsList[0].indexOf(c);
                        return -1 !== e ? (d = b.specialCharsList[1][e], String.fromCharCode(d)) : (e = b.specialChars.indexOf(c), -1 !== e ? (d = e + 160, String.fromCharCode(d)) : "")
                    })
                },
                trim: function(a) {
                    return a.replace(this.rtrim, "")
                },
                getParts: function(a) {
                    return a.match(this.partsRe)
                },
                modify: function(a) {
                    if (!a) return "";
                    a = this.decodeUnicodeEscapeSequence(a);
                    try {
                        a = decodeURIComponent(a)
                    } catch (b) {
                        a = unescape(a)
                    }
                    if (a = this.decodeSpecialChars(a), a = a.replace(this.rnRe, " "), a = this.trim(a), a = a.replace(this.re1, "").replace(this.re2, "(").replace(this.re3, ")").replace(this.spaceRe, " ").replace(this.dblRe, "$1").replace(this.illegalRe, "_").replace(this.controlRe, "").replace(this.reservedRe, "").replace(this.re4, ""), a.length <= this.maxLength) return a;
                    var c = this.getParts(a);
                    return c && 3 == c.length ? (c[1] = c[1].substr(0, this.maxLength), c[1] + "." + c[2]) : a
                }
            };
        m();
        var w = setInterval(m, 200);
        c(function(b) {
            b ? (location.href.indexOf("send_external=") > -1 && p(), $(document).ready(function() {
                clearInterval(w), m() || (a(), r(), d(), j(), q(), l(), setInterval(n, 5e3), setTimeout(o, 1e3))
            })) : window.location.href.indexOf("/direct/") > -1 && (window.location.href = "https://www.instagram.com/accounts/login/")
        });
        var x = function() {
            return {
                requestExternalFile: function(a, b, c) {
                    var d = new XMLHttpRequest;
                    d.open("GET", a, !0), d.responseType = "arraybuffer", d.onreadystatechange = function() {
                        if (4 === this.readyState && 200 === this.status) try {
                            var a = this.response || this.responseText,
                                d = new Blob([a], {
                                    type: "application/octet-stream"
                                });
                            x.uploadRequest.factory(b, d, c)
                        } catch (e) {}
                    }, d.send()
                },
                sendExternalImage: function(a, b, c) {
                    var d = this;
                    d.requestExternalFile(a, b, c)
                },
                isValidLink: function(a) {
                    return !!a.match(/^https?:\/\/(www\.)?[^\.]+\.[^\.]+/)
                },
                uploadRequest: {
                    factory: function(a, b, c) {
                        var d = this;
                        d.sendPhoto(b, function(b) {
                            b.error ? d.handleBadResponse(b) : d.configurePhoto({
                                uploadId: b.upload_id,
                                threadId: a
                            }, function(a) {
                                a.error && d.handleBadResponse(a), c()
                            })
                        })
                    },
                    sendPhoto: function(a, b) {
                        chrome.runtime.sendMessage("getCookies", function(c) {
                            if (c) {
                                var d = x.size && x.size.width || 1080,
                                    e = x.size && x.size.height || 1080,
                                    f = (new Date).getTime(),
                                    g = "https://www.instagram.com/rupload_igphoto/direct_" + f,
                                    h = new XMLHttpRequest;
                                h.open("POST", g, !0), h.setRequestHeader("x-csrftoken", c.csrftoken), h.setRequestHeader("x-entity-length", a.size), h.setRequestHeader("x-entity-name", "direct_" + f), h.setRequestHeader("x-ig-app-id", "1217981644879628"), h.setRequestHeader("x-instagram-rupload-params", JSON.stringify({
                                    media_type: 1,
                                    upload_id: f,
                                    upload_media_height: e,
                                    upload_media_width: d
                                })), h.setRequestHeader("offset", 0), h.onload = function() {
                                    try {
                                        var a = JSON.parse(this.responseText)
                                    } catch (c) {
                                        return b({
                                            error: 1,
                                            status: 200
                                        })
                                    }
                                    b(a)
                                }, h.send(a)
                            }
                        })
                    },
                    configurePhoto: function(a, b) {
                        var c = a.uploadId,
                            d = a.usertags,
                            e = a.threadId;
                        chrome.runtime.sendMessage("getCookies", function(a) {
                            if (!a || !a.sessionid) return b({
                                error: 1
                            });
                            var f = {
                                upload_id: c,
                                action: "send_item",
                                allow_full_aspect_ratio: 1,
                                content_type: "photo",
                                sampled: 1,
                                thread_id: e
                            };
                            d && (f.usertags = JSON.stringify({
                                "in": d
                            }));
                            var g = "https://www.instagram.com/direct_v2/web/threads/broadcast/configure_photo/";
                            $.ajax({
                                url: g,
                                method: "POST",
                                data: f,
                                headers: {
                                    "x-csrftoken": a.csrftoken,
                                    "x-ig-app-id": "1217981644879628"
                                }
                            }).done(function(a) {
                                return a && "object" == typeof a && "ok" == a.status ? void b({
                                    success: 1
                                }) : b({
                                    error: 1,
                                    res: a,
                                    status: 200
                                })
                            }).fail(function(a) {
                                b({
                                    error: 1,
                                    res: a.responseJSON,
                                    status: a.status
                                })
                            })
                        })
                    },
                    handleBadResponse: function(a) {}
                }
            }
        }()
    }
}();
