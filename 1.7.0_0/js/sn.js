!function() {
    var a="Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36";
    Object.defineProperty(navigator, "userAgent", {
        value: a, configurable: !0
    }
    ),
    Object.defineProperty(navigator, "appVersion", {
        value: "appVersion", configurable: !0
    }
    );
    var b=document.createElement("script");
    b.textContent="("+function() {
        "use strict";
        var a,
        b;
        "userAgent"in Navigator.prototype?a=Navigator.prototype:(a=Object.create(window.navigator), Object.defineProperty(window, "navigator", {
            value: a, configurable: !1, enumerable: !1, writable: !1
        }
        )),
        "type"in ScreenOrientation.prototype?b=ScreenOrientation.prototype:(b=Object.create(window.screen.orientation), Object.defineProperty(window.screen, "orientation", {
            value: b, configurable: !1, enumerable: !1, writable: !1
        }
        )),
        Object.defineProperties(a, {
            userAgent: {
                value: "Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36", configurable: !1, enumerable: !0, writable: !1
            }
            , appVersion: {
                value: "5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36", configurable: !1, enumerable: !0, writable: !1
            }
            , maxTouchPoints: {
                value: 1, configurable: !1, enumerable: !0, writable: !1
            }
        }
        ),
        Object.defineProperties(b, {
            type: {
                value: "portrait-primary", configurable: !1, enumerable: !0, writable: !1
            }
        }
        )
    }
    +")();",
    document.documentElement.appendChild(b),
    b.remove()
}

();
