! function() {
    function a() {
        document.querySelectorAll("img").forEach(function(a) {
            if (!(a.dataset.insta_upload_ext_elem || (a.dataset.insta_upload_ext_elem = "1", (a.width || 0) * (a.height || 0) < 11e4))) {
                var b = a.src;
                if ((!b || !b.length) && a.parentElement && a.parentElement.tagName && "picture" == a.parentElement.tagName.toLowerCase()) {
                    var d = a.parentElement.querySelector("source[srcset]"),
                        e = d.getAttribute("srcset");
                    e && e.length && (b = e)
                }
                if (b) {
                    f = !0;
                    var g = a.parentNode,
                        h = document.createElement("div");
                    h.className = "insta_img_icon_ext_el";
                    var i = a.offsetTop + 15,
                        j = a.offsetLeft + 15,
                        k = document.createElement("div");
                    k.className = "insta_img_icon_wrap_ext_el", k.title = "Send to Direct", k.style.top = a.offsetTop + 15 + "px", k.style.left = a.offsetLeft + 15 + "px", k.appendChild(h), g.appendChild(k), g.classList.add("insta_img_parent_ext_el");
                    var l = "ext_popup_id" + Math.round(1e4 * Math.random());
                    h.addEventListener("click", function(a) {
                        a.stopPropagation(), a.preventDefault();
                        var d = document.querySelector("#" + l);
                        return d ? void d.remove() : void c({
                            src: b,
                            top: i,
                            left: j,
                            popup_id: l
                        })
                    })
                }
            }
        }), f && !g && b()
    }

    function b() {
        var a = document.createElement("link");
        a.setAttribute("rel", "stylesheet"), a.setAttribute("href", chrome.extension.getURL("css/styles_all.css")), document.head.appendChild(a), g = !0
    }

    function c(a) {
        var b = document.querySelector(".ext_direct_wrap_qas");
        b && b.remove();
        var c = a.src;
        b = document.createElement("div"), b.className = "ext_direct_wrap_qas", b.id = a.popup_id, b.innerHTML = '<div class="ext_direct_wrap_header_qas"><div class="ext_direct_title_qas">IG Direct</div><span class="ext_direct_close_qas">&times;</span></div><div class="ext_direct_wrap_loader_qas"><span></span></div>';
        var f = b.querySelector(".ext_direct_close_qas");
        f.addEventListener("click", function(a) {
            a.preventDefault(), a.stopPropagation(), b.remove()
        }), a.popupHeight = 425, document.body.classList.add("ext_relative_important"), document.body.appendChild(b), d(function(a) {
            if (b && b.querySelector(".ext_direct_wrap_loader_qas"))
                if (b.querySelector(".ext_direct_wrap_loader_qas").remove(), a.error && "not_authorized" == a.error) {
                    var d = document.createElement("div");
                    d.className = "ext_direct_error_not_authorized_qas", d.innerText = "You are not authorized in Instagram.", b.appendChild(d)
                } else if (a.length) {
                var f = document.createElement("div");
                f.className = "ext_direct_wrap_filter", f.innerHTML = '<input type="text" placeholder="search"><span></span>', b.appendChild(f);
                var g, h = f.querySelector("input");
                h.addEventListener("keydown", function(a) {
                    var c = this;
                    g && clearTimeout(g), g = setTimeout(function() {
                        b.querySelectorAll(".ext_direct_users_item_qas").forEach(function(a) {
                            a.dataset.title.indexOf(c.value) > -1 ? a.style.display = "flex" : a.style.display = "none"
                        })
                    }, 300)
                });
                var i = document.createElement("div");
                i.className = "ext_direct_users_list_qas", a.forEach(function(a) {
                    var d = document.createElement("div"),
                        f = a.thread_id;
                    d.className = "ext_direct_users_item_qas", d.dataset.title = a.thread_title, d.innerHTML = e(a.users) + '<span class="ext_direct_thread_title">' + a.thread_title + "</span>", i.appendChild(d), d.addEventListener("click", function() {
                        chrome.runtime.sendMessage({
                            action: "send_external_image",
                            thread_id: f,
                            thread_title: this.dataset.title,
                            link: c
                        }), b.remove()
                    })
                }), b.appendChild(i)
            } else;
        })
    }

    function d(a) {
        chrome.runtime.sendMessage("getAllThreadUsersList", function(b) {
            a(b)
        })
    }

    function e(a) {
        return 1 == a.length ? '<span class="ext_direct_thread_icon_qas"><img src="' + a[0].profile_pic_url + '"></span>' : a.length > 1 ? '<span class="ext_direct_thread_icon_qas ext_direct_twin_qas"><img class="img_1" src="' + a[0].profile_pic_url + '"><img class="img_2" src="' + a[1].profile_pic_url + '"></span>' : ""
    }
    if (!window.insta_upload_ext_el_ex) {
        window.insta_upload_ext_el_ex = 1;
        var f = !1,
            g = !1;
        a(), setInterval(a, 2e3)
    }
}();
