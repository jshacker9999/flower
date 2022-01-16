! function e(t, r, i) {
    function n(a, s) {
        if (!r[a]) {
            if (!t[a]) {
                var h = "function" == typeof require && require;
                if (!s && h) return h(a, !0);
                if (o) return o(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = r[a] = {
                exports: {}
            };
            t[a][0].call(c.exports, function (e) {
                var r = t[a][1][e];
                return n(r ? r : e)
            }, c, c.exports, e, t, r, i)
        }
        return r[a].exports
    }
    for (var o = "function" == typeof require && require, a = 0; a < i.length; a++) n(i[a]);
    return n
}({
    1: [function (e, t) {
        t.exports = e("./vendor/dat.gui"), t.exports.color = e("./vendor/dat.color")
    }, {
        "./vendor/dat.color": 2,
        "./vendor/dat.gui": 3
    }],
    2: [function (e, t) {
        var r = t.exports = r || {};
        r.color = r.color || {}, r.utils = r.utils || {}, r.utils.common = function () {
            var e = Array.prototype.forEach,
                t = Array.prototype.slice;
            return {
                BREAK: {},
                extend: function (e) {
                    return this.each(t.call(arguments, 1), function (t) {
                        for (var r in t) this.isUndefined(t[r]) || (e[r] = t[r])
                    }, this), e
                },
                defaults: function (e) {
                    return this.each(t.call(arguments, 1), function (t) {
                        for (var r in t) this.isUndefined(e[r]) && (e[r] = t[r])
                    }, this), e
                },
                compose: function () {
                    var e = t.call(arguments);
                    return function () {
                        for (var r = t.call(arguments), i = e.length - 1; i >= 0; i--) r = [e[i].apply(this, r)];
                        return r[0]
                    }
                },
                each: function (t, r, i) {
                    if (e && t.forEach === e) t.forEach(r, i);
                    else if (t.length === t.length + 0) {
                        for (var n = 0, o = t.length; o > n; n++)
                            if (n in t && r.call(i, t[n], n) === this.BREAK) return
                    } else
                        for (var n in t)
                            if (r.call(i, t[n], n) === this.BREAK) return
                },
                defer: function (e) {
                    setTimeout(e, 0)
                },
                toArray: function (e) {
                    return e.toArray ? e.toArray() : t.call(e)
                },
                isUndefined: function (e) {
                    return void 0 === e
                },
                isNull: function (e) {
                    return null === e
                },
                isNaN: function (e) {
                    return e !== e
                },
                isArray: Array.isArray || function (e) {
                    return e.constructor === Array
                },
                isObject: function (e) {
                    return e === Object(e)
                },
                isNumber: function (e) {
                    return e === e + 0
                },
                isString: function (e) {
                    return e === e + ""
                },
                isBoolean: function (e) {
                    return e === !1 || e === !0
                },
                isFunction: function (e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                }
            }
        }(), r.color.toString = function (e) {
            return function (t) {
                if (1 == t.a || e.isUndefined(t.a)) {
                    for (var r = t.hex.toString(16); r.length < 6;) r = "0" + r;
                    return "#" + r
                }
                return "rgba(" + Math.round(t.r) + "," + Math.round(t.g) + "," + Math.round(t.b) + "," + t.a + ")"
            }
        }(r.utils.common), r.Color = r.color.Color = function (e, t, r, i) {
            function n(e, t, r) {
                Object.defineProperty(e, t, {
                    get: function () {
                        return "RGB" === this.__state.space ? this.__state[t] : (a(this, t, r), this.__state[t])
                    },
                    set: function (e) {
                        "RGB" !== this.__state.space && (a(this, t, r), this.__state.space = "RGB"), this.__state[t] = e
                    }
                })
            }

            function o(e, t) {
                Object.defineProperty(e, t, {
                    get: function () {
                        return "HSV" === this.__state.space ? this.__state[t] : (s(this), this.__state[t])
                    },
                    set: function (e) {
                        "HSV" !== this.__state.space && (s(this), this.__state.space = "HSV"), this.__state[t] = e
                    }
                })
            }

            function a(e, r, n) {
                if ("HEX" === e.__state.space) e.__state[r] = t.component_from_hex(e.__state.hex, n);
                else {
                    if ("HSV" !== e.__state.space) throw "Corrupted color state";
                    i.extend(e.__state, t.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v))
                }
            }

            function s(e) {
                var r = t.rgb_to_hsv(e.r, e.g, e.b);
                i.extend(e.__state, {
                    s: r.s,
                    v: r.v
                }), i.isNaN(r.h) ? i.isUndefined(e.__state.h) && (e.__state.h = 0) : e.__state.h = r.h
            }
            var h = function () {
                if (this.__state = e.apply(this, arguments), this.__state === !1) throw "Failed to interpret color arguments";
                this.__state.a = this.__state.a || 1
            };
            return h.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"], i.extend(h.prototype, {
                toString: function () {
                    return r(this)
                },
                toOriginal: function () {
                    return this.__state.conversion.write(this)
                }
            }), n(h.prototype, "r", 2), n(h.prototype, "g", 1), n(h.prototype, "b", 0), o(h.prototype, "h"), o(h.prototype, "s"), o(h.prototype, "v"), Object.defineProperty(h.prototype, "a", {
                get: function () {
                    return this.__state.a
                },
                set: function (e) {
                    this.__state.a = e
                }
            }), Object.defineProperty(h.prototype, "hex", {
                get: function () {
                    return "HEX" !== !this.__state.space && (this.__state.hex = t.rgb_to_hex(this.r, this.g, this.b)), this.__state.hex
                },
                set: function (e) {
                    this.__state.space = "HEX", this.__state.hex = e
                }
            }), h
        }(r.color.interpret = function (e, t) {
            var r, i, n = function () {
                    i = !1;
                    var e = arguments.length > 1 ? t.toArray(arguments) : arguments[0];
                    return t.each(o, function (n) {
                        return n.litmus(e) ? (t.each(n.conversions, function (n, o) {
                            return r = n.read(e), i === !1 && r !== !1 ? (i = r, r.conversionName = o, r.conversion = n, t.BREAK) : void 0
                        }), t.BREAK) : void 0
                    }), i
                },
                o = [{
                    litmus: t.isString,
                    conversions: {
                        THREE_CHAR_HEX: {
                            read: function (e) {
                                var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                                return null === t ? !1 : {
                                    space: "HEX",
                                    hex: parseInt("0x" + t[1].toString() + t[1].toString() + t[2].toString() + t[2].toString() + t[3].toString() + t[3].toString())
                                }
                            },
                            write: e
                        },
                        SIX_CHAR_HEX: {
                            read: function (e) {
                                var t = e.match(/^#([A-F0-9]{6})$/i);
                                return null === t ? !1 : {
                                    space: "HEX",
                                    hex: parseInt("0x" + t[1].toString())
                                }
                            },
                            write: e
                        },
                        CSS_RGB: {
                            read: function (e) {
                                var t = e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                                return null === t ? !1 : {
                                    space: "RGB",
                                    r: parseFloat(t[1]),
                                    g: parseFloat(t[2]),
                                    b: parseFloat(t[3])
                                }
                            },
                            write: e
                        },
                        CSS_RGBA: {
                            read: function (e) {
                                var t = e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
                                return null === t ? !1 : {
                                    space: "RGB",
                                    r: parseFloat(t[1]),
                                    g: parseFloat(t[2]),
                                    b: parseFloat(t[3]),
                                    a: parseFloat(t[4])
                                }
                            },
                            write: e
                        }
                    }
                }, {
                    litmus: t.isNumber,
                    conversions: {
                        HEX: {
                            read: function (e) {
                                return {
                                    space: "HEX",
                                    hex: e,
                                    conversionName: "HEX"
                                }
                            },
                            write: function (e) {
                                return e.hex
                            }
                        }
                    }
                }, {
                    litmus: t.isArray,
                    conversions: {
                        RGB_ARRAY: {
                            read: function (e) {
                                return 3 != e.length ? !1 : {
                                    space: "RGB",
                                    r: e[0],
                                    g: e[1],
                                    b: e[2]
                                }
                            },
                            write: function (e) {
                                return [e.r, e.g, e.b]
                            }
                        },
                        RGBA_ARRAY: {
                            read: function (e) {
                                return 4 != e.length ? !1 : {
                                    space: "RGB",
                                    r: e[0],
                                    g: e[1],
                                    b: e[2],
                                    a: e[3]
                                }
                            },
                            write: function (e) {
                                return [e.r, e.g, e.b, e.a]
                            }
                        }
                    }
                }, {
                    litmus: t.isObject,
                    conversions: {
                        RGBA_OBJ: {
                            read: function (e) {
                                return t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b) && t.isNumber(e.a) ? {
                                    space: "RGB",
                                    r: e.r,
                                    g: e.g,
                                    b: e.b,
                                    a: e.a
                                } : !1
                            },
                            write: function (e) {
                                return {
                                    r: e.r,
                                    g: e.g,
                                    b: e.b,
                                    a: e.a
                                }
                            }
                        },
                        RGB_OBJ: {
                            read: function (e) {
                                return t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b) ? {
                                    space: "RGB",
                                    r: e.r,
                                    g: e.g,
                                    b: e.b
                                } : !1
                            },
                            write: function (e) {
                                return {
                                    r: e.r,
                                    g: e.g,
                                    b: e.b
                                }
                            }
                        },
                        HSVA_OBJ: {
                            read: function (e) {
                                return t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v) && t.isNumber(e.a) ? {
                                    space: "HSV",
                                    h: e.h,
                                    s: e.s,
                                    v: e.v,
                                    a: e.a
                                } : !1
                            },
                            write: function (e) {
                                return {
                                    h: e.h,
                                    s: e.s,
                                    v: e.v,
                                    a: e.a
                                }
                            }
                        },
                        HSV_OBJ: {
                            read: function (e) {
                                return t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v) ? {
                                    space: "HSV",
                                    h: e.h,
                                    s: e.s,
                                    v: e.v
                                } : !1
                            },
                            write: function (e) {
                                return {
                                    h: e.h,
                                    s: e.s,
                                    v: e.v
                                }
                            }
                        }
                    }
                }];
            return n
        }(r.color.toString, r.utils.common), r.color.math = function () {
            var e;
            return {
                hsv_to_rgb: function (e, t, r) {
                    var i = Math.floor(e / 60) % 6,
                        n = e / 60 - Math.floor(e / 60),
                        o = r * (1 - t),
                        a = r * (1 - n * t),
                        s = r * (1 - (1 - n) * t),
                        h = [
                            [r, s, o],
                            [a, r, o],
                            [o, r, s],
                            [o, a, r],
                            [s, o, r],
                            [r, o, a]
                        ][i];
                    return {
                        r: 255 * h[0],
                        g: 255 * h[1],
                        b: 255 * h[2]
                    }
                },
                rgb_to_hsv: function (e, t, r) {
                    var i, n, o = Math.min(e, t, r),
                        a = Math.max(e, t, r),
                        s = a - o;
                    return 0 == a ? {
                        h: 0 / 0,
                        s: 0,
                        v: 0
                    } : (n = s / a, i = e == a ? (t - r) / s : t == a ? 2 + (r - e) / s : 4 + (e - t) / s, i /= 6, 0 > i && (i += 1), {
                        h: 360 * i,
                        s: n,
                        v: a / 255
                    })
                },
                rgb_to_hex: function (e, t, r) {
                    var i = this.hex_with_component(0, 2, e);
                    return i = this.hex_with_component(i, 1, t), i = this.hex_with_component(i, 0, r)
                },
                component_from_hex: function (e, t) {
                    return e >> 8 * t & 255
                },
                hex_with_component: function (t, r, i) {
                    return i << (e = 8 * r) | t & ~(255 << e)
                }
            }
        }(), r.color.toString, r.utils.common)
    }, {}],
    3: [function (e, t) {
        var r = t.exports = r || {};
        r.gui = r.gui || {}, r.utils = r.utils || {}, r.controllers = r.controllers || {}, r.dom = r.dom || {}, r.color = r.color || {}, r.utils.css = function () {
            return {
                load: function (e, t) {
                    t = t || document;
                    var r = t.createElement("link");
                    r.type = "text/css", r.rel = "stylesheet", r.href = e, t.getElementsByTagName("head")[0].appendChild(r)
                },
                inject: function (e, t) {
                    t = t || document;
                    var r = document.createElement("style");
                    r.type = "text/css", r.innerHTML = e, t.getElementsByTagName("head")[0].appendChild(r)
                }
            }
        }(), r.utils.common = function () {
            var e = Array.prototype.forEach,
                t = Array.prototype.slice;
            return {
                BREAK: {},
                extend: function (e) {
                    return this.each(t.call(arguments, 1), function (t) {
                        for (var r in t) this.isUndefined(t[r]) || (e[r] = t[r])
                    }, this), e
                },
                defaults: function (e) {
                    return this.each(t.call(arguments, 1), function (t) {
                        for (var r in t) this.isUndefined(e[r]) && (e[r] = t[r])
                    }, this), e
                },
                compose: function () {
                    var e = t.call(arguments);
                    return function () {
                        for (var r = t.call(arguments), i = e.length - 1; i >= 0; i--) r = [e[i].apply(this, r)];
                        return r[0]
                    }
                },
                each: function (t, r, i) {
                    if (e && t.forEach === e) t.forEach(r, i);
                    else if (t.length === t.length + 0) {
                        for (var n = 0, o = t.length; o > n; n++)
                            if (n in t && r.call(i, t[n], n) === this.BREAK) return
                    } else
                        for (var n in t)
                            if (r.call(i, t[n], n) === this.BREAK) return
                },
                defer: function (e) {
                    setTimeout(e, 0)
                },
                toArray: function (e) {
                    return e.toArray ? e.toArray() : t.call(e)
                },
                isUndefined: function (e) {
                    return void 0 === e
                },
                isNull: function (e) {
                    return null === e
                },
                isNaN: function (e) {
                    return e !== e
                },
                isArray: Array.isArray || function (e) {
                    return e.constructor === Array
                },
                isObject: function (e) {
                    return e === Object(e)
                },
                isNumber: function (e) {
                    return e === e + 0
                },
                isString: function (e) {
                    return e === e + ""
                },
                isBoolean: function (e) {
                    return e === !1 || e === !0
                },
                isFunction: function (e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                }
            }
        }(), r.controllers.Controller = function (e) {
            var t = function (e, t) {
                this.initialValue = e[t], this.domElement = document.createElement("div"), this.object = e, this.property = t, this.__onChange = void 0, this.__onFinishChange = void 0
            };
            return e.extend(t.prototype, {
                onChange: function (e) {
                    return this.__onChange = e, this
                },
                onFinishChange: function (e) {
                    return this.__onFinishChange = e, this
                },
                setValue: function (e) {
                    return this.object[this.property] = e, this.__onChange && this.__onChange.call(this, e), this.updateDisplay(), this
                },
                getValue: function () {
                    return this.object[this.property]
                },
                updateDisplay: function () {
                    return this
                },
                isModified: function () {
                    return this.initialValue !== this.getValue()
                }
            }), t
        }(r.utils.common), r.dom.dom = function (e) {
            function t(t) {
                if ("0" === t || e.isUndefined(t)) return 0;
                var r = t.match(n);
                return e.isNull(r) ? 0 : parseFloat(r[1])
            }
            var r = {
                    HTMLEvents: ["change"],
                    MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
                    KeyboardEvents: ["keydown"]
                },
                i = {};
            e.each(r, function (t, r) {
                e.each(t, function (e) {
                    i[e] = r
                })
            });
            var n = /(\d+(\.\d+)?)px/,
                o = {
                    makeSelectable: function (e, t) {
                        void 0 !== e && void 0 !== e.style && (e.onselectstart = t ? function () {
                            return !1
                        } : function () {}, e.style.MozUserSelect = t ? "auto" : "none", e.style.KhtmlUserSelect = t ? "auto" : "none", e.unselectable = t ? "on" : "off")
                    },
                    makeFullscreen: function (t, r, i) {
                        e.isUndefined(r) && (r = !0), e.isUndefined(i) && (i = !0), t.style.position = "absolute", r && (t.style.left = 0, t.style.right = 0), i && (t.style.top = 0, t.style.bottom = 0)
                    },
                    fakeEvent: function (t, r, n, o) {
                        n = n || {};
                        var a = i[r];
                        if (!a) throw new Error("Event type " + r + " not supported.");
                        var s = document.createEvent(a);
                        switch (a) {
                            case "MouseEvents":
                                var h = n.x || n.clientX || 0,
                                    l = n.y || n.clientY || 0;
                                s.initMouseEvent(r, n.bubbles || !1, n.cancelable || !0, window, n.clickCount || 1, 0, 0, h, l, !1, !1, !1, !1, 0, null);
                                break;
                            case "KeyboardEvents":
                                var c = s.initKeyboardEvent || s.initKeyEvent;
                                e.defaults(n, {
                                    cancelable: !0,
                                    ctrlKey: !1,
                                    altKey: !1,
                                    shiftKey: !1,
                                    metaKey: !1,
                                    keyCode: void 0,
                                    charCode: void 0
                                }), c(r, n.bubbles || !1, n.cancelable, window, n.ctrlKey, n.altKey, n.shiftKey, n.metaKey, n.keyCode, n.charCode);
                                break;
                            default:
                                s.initEvent(r, n.bubbles || !1, n.cancelable || !0)
                        }
                        e.defaults(s, o), t.dispatchEvent(s)
                    },
                    bind: function (e, t, r, i) {
                        return i = i || !1, e.addEventListener ? e.addEventListener(t, r, i) : e.attachEvent && e.attachEvent("on" + t, r), o
                    },
                    unbind: function (e, t, r, i) {
                        return i = i || !1, e.removeEventListener ? e.removeEventListener(t, r, i) : e.detachEvent && e.detachEvent("on" + t, r), o
                    },
                    addClass: function (e, t) {
                        if (void 0 === e.className) e.className = t;
                        else if (e.className !== t) {
                            var r = e.className.split(/ +/); - 1 == r.indexOf(t) && (r.push(t), e.className = r.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""))
                        }
                        return o
                    },
                    removeClass: function (e, t) {
                        if (t)
                            if (void 0 === e.className);
                            else if (e.className === t) e.removeAttribute("class");
                        else {
                            var r = e.className.split(/ +/),
                                i = r.indexOf(t); - 1 != i && (r.splice(i, 1), e.className = r.join(" "))
                        } else e.className = void 0;
                        return o
                    },
                    hasClass: function (e, t) {
                        return new RegExp("(?:^|\\s+)" + t + "(?:\\s+|$)").test(e.className) || !1
                    },
                    getWidth: function (e) {
                        var r = getComputedStyle(e);
                        return t(r["border-left-width"]) + t(r["border-right-width"]) + t(r["padding-left"]) + t(r["padding-right"]) + t(r.width)
                    },
                    getHeight: function (e) {
                        var r = getComputedStyle(e);
                        return t(r["border-top-width"]) + t(r["border-bottom-width"]) + t(r["padding-top"]) + t(r["padding-bottom"]) + t(r.height)
                    },
                    getOffset: function (e) {
                        var t = {
                            left: 0,
                            top: 0
                        };
                        if (e.offsetParent)
                            do t.left += e.offsetLeft, t.top += e.offsetTop; while (e = e.offsetParent);
                        return t
                    },
                    isActive: function (e) {
                        return e === document.activeElement && (e.type || e.href)
                    }
                };
            return o
        }(r.utils.common), r.controllers.OptionController = function (e, t, r) {
            var i = function (e, n, o) {
                i.superclass.call(this, e, n);
                var a = this;
                if (this.__select = document.createElement("select"), r.isArray(o)) {
                    var s = {};
                    r.each(o, function (e) {
                        s[e] = e
                    }), o = s
                }
                r.each(o, function (e, t) {
                    var r = document.createElement("option");
                    r.innerHTML = t, r.setAttribute("value", e), a.__select.appendChild(r)
                }), this.updateDisplay(), t.bind(this.__select, "change", function () {
                    var e = this.options[this.selectedIndex].value;
                    a.setValue(e)
                }), this.domElement.appendChild(this.__select)
            };
            return i.superclass = e, r.extend(i.prototype, e.prototype, {
                setValue: function (e) {
                    var t = i.superclass.prototype.setValue.call(this, e);
                    return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), t
                },
                updateDisplay: function () {
                    return this.__select.value = this.getValue(), i.superclass.prototype.updateDisplay.call(this)
                }
            }), i
        }(r.controllers.Controller, r.dom.dom, r.utils.common), r.controllers.NumberController = function (e, t) {
            function r(e) {
                return e = e.toString(), e.indexOf(".") > -1 ? e.length - e.indexOf(".") - 1 : 0
            }
            var i = function (e, n, o) {
                i.superclass.call(this, e, n), o = o || {}, this.__min = o.min, this.__max = o.max, this.__step = o.step, this.__impliedStep = t.isUndefined(this.__step) ? 0 == this.initialValue ? 1 : Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10 : this.__step, this.__precision = r(this.__impliedStep)
            };
            return i.superclass = e, t.extend(i.prototype, e.prototype, {
                setValue: function (e) {
                    return void 0 !== this.__min && e < this.__min ? e = this.__min : void 0 !== this.__max && e > this.__max && (e = this.__max), void 0 !== this.__step && e % this.__step != 0 && (e = Math.round(e / this.__step) * this.__step), i.superclass.prototype.setValue.call(this, e)
                },
                min: function (e) {
                    return this.__min = e, this
                },
                max: function (e) {
                    return this.__max = e, this
                },
                step: function (e) {
                    return this.__step = e, this
                }
            }), i
        }(r.controllers.Controller, r.utils.common), r.controllers.NumberControllerBox = function (e, t, r) {
            function i(e, t) {
                var r = Math.pow(10, t);
                return Math.round(e * r) / r
            }
            var n = function (e, i, o) {
                function a() {
                    var e = parseFloat(d.__input.value);
                    r.isNaN(e) || d.setValue(e)
                }

                function s() {
                    a(), d.__onFinishChange && d.__onFinishChange.call(d, d.getValue())
                }

                function h(e) {
                    t.bind(window, "mousemove", l), t.bind(window, "mouseup", c), u = e.clientY
                }

                function l(e) {
                    var t = u - e.clientY;
                    d.setValue(d.getValue() + t * d.__impliedStep), u = e.clientY
                }

                function c() {
                    t.unbind(window, "mousemove", l), t.unbind(window, "mouseup", c)
                }
                this.__truncationSuspended = !1, n.superclass.call(this, e, i, o);
                var u, d = this;
                this.__input = document.createElement("input"), this.__input.setAttribute("type", "text"), t.bind(this.__input, "change", a), t.bind(this.__input, "blur", s), t.bind(this.__input, "mousedown", h), t.bind(this.__input, "keydown", function (e) {
                    13 === e.keyCode && (d.__truncationSuspended = !0, this.blur(), d.__truncationSuspended = !1)
                }), this.updateDisplay(), this.domElement.appendChild(this.__input)
            };
            return n.superclass = e, r.extend(n.prototype, e.prototype, {
                updateDisplay: function () {
                    return this.__input.value = this.__truncationSuspended ? this.getValue() : i(this.getValue(), this.__precision), n.superclass.prototype.updateDisplay.call(this)
                }
            }), n
        }(r.controllers.NumberController, r.dom.dom, r.utils.common), r.controllers.NumberControllerSlider = function (e, t, r, i, n) {
            function o(e, t, r, i, n) {
                return i + (n - i) * ((e - t) / (r - t))
            }
            var a = function (e, r, i, n, s) {
                function h(e) {
                    t.bind(window, "mousemove", l), t.bind(window, "mouseup", c), l(e)
                }

                function l(e) {
                    e.preventDefault();
                    var r = t.getOffset(u.__background),
                        i = t.getWidth(u.__background);
                    return u.setValue(o(e.clientX, r.left, r.left + i, u.__min, u.__max)), !1
                }

                function c() {
                    t.unbind(window, "mousemove", l), t.unbind(window, "mouseup", c), u.__onFinishChange && u.__onFinishChange.call(u, u.getValue())
                }
                a.superclass.call(this, e, r, {
                    min: i,
                    max: n,
                    step: s
                });
                var u = this;
                this.__background = document.createElement("div"), this.__foreground = document.createElement("div"), t.bind(this.__background, "mousedown", h), t.addClass(this.__background, "slider"), t.addClass(this.__foreground, "slider-fg"), this.updateDisplay(), this.__background.appendChild(this.__foreground), this.domElement.appendChild(this.__background)
            };
            return a.superclass = e, a.useDefaultStyles = function () {
                r.inject(n)
            }, i.extend(a.prototype, e.prototype, {
                updateDisplay: function () {
                    var e = (this.getValue() - this.__min) / (this.__max - this.__min);
                    return this.__foreground.style.width = 100 * e + "%", a.superclass.prototype.updateDisplay.call(this)
                }
            }), a
        }(r.controllers.NumberController, r.dom.dom, r.utils.css, r.utils.common, ".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}"), r.controllers.FunctionController = function (e, t, r) {
            var i = function (e, r, n) {
                i.superclass.call(this, e, r);
                var o = this;
                this.__button = document.createElement("div"), this.__button.innerHTML = void 0 === n ? "Fire" : n, t.bind(this.__button, "click", function (e) {
                    return e.preventDefault(), o.fire(), !1
                }), t.addClass(this.__button, "button"), this.domElement.appendChild(this.__button)
            };
            return i.superclass = e, r.extend(i.prototype, e.prototype, {
                fire: function () {
                    this.__onChange && this.__onChange.call(this), this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.getValue().call(this.object)
                }
            }), i
        }(r.controllers.Controller, r.dom.dom, r.utils.common), r.controllers.BooleanController = function (e, t, r) {
            var i = function (e, r) {
                function n() {
                    o.setValue(!o.__prev)
                }
                i.superclass.call(this, e, r);
                var o = this;
                this.__prev = this.getValue(), this.__checkbox = document.createElement("input"), this.__checkbox.setAttribute("type", "checkbox"), t.bind(this.__checkbox, "change", n, !1), this.domElement.appendChild(this.__checkbox), this.updateDisplay()
            };
            return i.superclass = e, r.extend(i.prototype, e.prototype, {
                setValue: function (e) {
                    var t = i.superclass.prototype.setValue.call(this, e);
                    return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.__prev = this.getValue(), t
                },
                updateDisplay: function () {
                    return this.getValue() === !0 ? (this.__checkbox.setAttribute("checked", "checked"), this.__checkbox.checked = !0) : this.__checkbox.checked = !1, i.superclass.prototype.updateDisplay.call(this)
                }
            }), i
        }(r.controllers.Controller, r.dom.dom, r.utils.common), r.color.toString = function (e) {
            return function (t) {
                if (1 == t.a || e.isUndefined(t.a)) {
                    for (var r = t.hex.toString(16); r.length < 6;) r = "0" + r;
                    return "#" + r
                }
                return "rgba(" + Math.round(t.r) + "," + Math.round(t.g) + "," + Math.round(t.b) + "," + t.a + ")"
            }
        }(r.utils.common), r.color.interpret = function (e, t) {
            var r, i, n = function () {
                    i = !1;
                    var e = arguments.length > 1 ? t.toArray(arguments) : arguments[0];
                    return t.each(o, function (n) {
                        return n.litmus(e) ? (t.each(n.conversions, function (n, o) {
                            return r = n.read(e), i === !1 && r !== !1 ? (i = r, r.conversionName = o, r.conversion = n, t.BREAK) : void 0
                        }), t.BREAK) : void 0
                    }), i
                },
                o = [{
                    litmus: t.isString,
                    conversions: {
                        THREE_CHAR_HEX: {
                            read: function (e) {
                                var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                                return null === t ? !1 : {
                                    space: "HEX",
                                    hex: parseInt("0x" + t[1].toString() + t[1].toString() + t[2].toString() + t[2].toString() + t[3].toString() + t[3].toString())
                                }
                            },
                            write: e
                        },
                        SIX_CHAR_HEX: {
                            read: function (e) {
                                var t = e.match(/^#([A-F0-9]{6})$/i);
                                return null === t ? !1 : {
                                    space: "HEX",
                                    hex: parseInt("0x" + t[1].toString())
                                }
                            },
                            write: e
                        },
                        CSS_RGB: {
                            read: function (e) {
                                var t = e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                                return null === t ? !1 : {
                                    space: "RGB",
                                    r: parseFloat(t[1]),
                                    g: parseFloat(t[2]),
                                    b: parseFloat(t[3])
                                }
                            },
                            write: e
                        },
                        CSS_RGBA: {
                            read: function (e) {
                                var t = e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
                                return null === t ? !1 : {
                                    space: "RGB",
                                    r: parseFloat(t[1]),
                                    g: parseFloat(t[2]),
                                    b: parseFloat(t[3]),
                                    a: parseFloat(t[4])
                                }
                            },
                            write: e
                        }
                    }
                }, {
                    litmus: t.isNumber,
                    conversions: {
                        HEX: {
                            read: function (e) {
                                return {
                                    space: "HEX",
                                    hex: e,
                                    conversionName: "HEX"
                                }
                            },
                            write: function (e) {
                                return e.hex
                            }
                        }
                    }
                }, {
                    litmus: t.isArray,
                    conversions: {
                        RGB_ARRAY: {
                            read: function (e) {
                                return 3 != e.length ? !1 : {
                                    space: "RGB",
                                    r: e[0],
                                    g: e[1],
                                    b: e[2]
                                }
                            },
                            write: function (e) {
                                return [e.r, e.g, e.b]
                            }
                        },
                        RGBA_ARRAY: {
                            read: function (e) {
                                return 4 != e.length ? !1 : {
                                    space: "RGB",
                                    r: e[0],
                                    g: e[1],
                                    b: e[2],
                                    a: e[3]
                                }
                            },
                            write: function (e) {
                                return [e.r, e.g, e.b, e.a]
                            }
                        }
                    }
                }, {
                    litmus: t.isObject,
                    conversions: {
                        RGBA_OBJ: {
                            read: function (e) {
                                return t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b) && t.isNumber(e.a) ? {
                                    space: "RGB",
                                    r: e.r,
                                    g: e.g,
                                    b: e.b,
                                    a: e.a
                                } : !1
                            },
                            write: function (e) {
                                return {
                                    r: e.r,
                                    g: e.g,
                                    b: e.b,
                                    a: e.a
                                }
                            }
                        },
                        RGB_OBJ: {
                            read: function (e) {
                                return t.isNumber(e.r) && t.isNumber(e.g) && t.isNumber(e.b) ? {
                                    space: "RGB",
                                    r: e.r,
                                    g: e.g,
                                    b: e.b
                                } : !1
                            },
                            write: function (e) {
                                return {
                                    r: e.r,
                                    g: e.g,
                                    b: e.b
                                }
                            }
                        },
                        HSVA_OBJ: {
                            read: function (e) {
                                return t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v) && t.isNumber(e.a) ? {
                                    space: "HSV",
                                    h: e.h,
                                    s: e.s,
                                    v: e.v,
                                    a: e.a
                                } : !1
                            },
                            write: function (e) {
                                return {
                                    h: e.h,
                                    s: e.s,
                                    v: e.v,
                                    a: e.a
                                }
                            }
                        },
                        HSV_OBJ: {
                            read: function (e) {
                                return t.isNumber(e.h) && t.isNumber(e.s) && t.isNumber(e.v) ? {
                                    space: "HSV",
                                    h: e.h,
                                    s: e.s,
                                    v: e.v
                                } : !1
                            },
                            write: function (e) {
                                return {
                                    h: e.h,
                                    s: e.s,
                                    v: e.v
                                }
                            }
                        }
                    }
                }];
            return n
        }(r.color.toString, r.utils.common), r.GUI = r.gui.GUI = function (e, t, r, i, n, o, a, s, h, l, c, u, d, p, f) {
            function m(e, t, r, o) {
                if (void 0 === t[r]) throw new Error("Object " + t + ' has no property "' + r + '"');
                var a;
                if (o.color) a = new c(t, r);
                else {
                    var s = [t, r].concat(o.factoryArgs);
                    a = i.apply(e, s)
                }
                o.before instanceof n && (o.before = o.before.__li), y(e, a), p.addClass(a.domElement, "c");
                var h = document.createElement("span");
                p.addClass(h, "property-name"), h.innerHTML = a.property;
                var l = document.createElement("div");
                l.appendChild(h), l.appendChild(a.domElement);
                var u = g(e, l, o.before);
                return p.addClass(u, O.CLASS_CONTROLLER_ROW), p.addClass(u, typeof a.getValue()), v(e, u, a), e.__controllers.push(a), a
            }

            function g(e, t, r) {
                var i = document.createElement("li");
                return t && i.appendChild(t), r ? e.__ul.insertBefore(i, params.before) : e.__ul.appendChild(i), e.onResize(), i
            }

            function v(e, t, r) {
                if (r.__li = t, r.__gui = e, f.extend(r, {
                        options: function (t) {
                            return arguments.length > 1 ? (r.remove(), m(e, r.object, r.property, {
                                before: r.__li.nextElementSibling,
                                factoryArgs: [f.toArray(arguments)]
                            })) : f.isArray(t) || f.isObject(t) ? (r.remove(), m(e, r.object, r.property, {
                                before: r.__li.nextElementSibling,
                                factoryArgs: [t]
                            })) : void 0
                        },
                        name: function (e) {
                            return r.__li.firstElementChild.firstElementChild.innerHTML = e, r
                        },
                        listen: function () {
                            return r.__gui.listen(r), r
                        },
                        remove: function () {
                            return r.__gui.remove(r), r
                        }
                    }), r instanceof h) {
                    var i = new s(r.object, r.property, {
                        min: r.__min,
                        max: r.__max,
                        step: r.__step
                    });
                    f.each(["updateDisplay", "onChange", "onFinishChange"], function (e) {
                        var t = r[e],
                            n = i[e];
                        r[e] = i[e] = function () {
                            var e = Array.prototype.slice.call(arguments);
                            return t.apply(r, e), n.apply(i, e)
                        }
                    }), p.addClass(t, "has-slider"), r.domElement.insertBefore(i.domElement, r.domElement.firstElementChild)
                } else if (r instanceof s) {
                    var n = function (t) {
                        return f.isNumber(r.__min) && f.isNumber(r.__max) ? (r.remove(), m(e, r.object, r.property, {
                            before: r.__li.nextElementSibling,
                            factoryArgs: [r.__min, r.__max, r.__step]
                        })) : t
                    };
                    r.min = f.compose(n, r.min), r.max = f.compose(n, r.max)
                } else r instanceof o ? (p.bind(t, "click", function () {
                    p.fakeEvent(r.__checkbox, "click")
                }), p.bind(r.__checkbox, "click", function (e) {
                    e.stopPropagation()
                })) : r instanceof a ? (p.bind(t, "click", function () {
                    p.fakeEvent(r.__button, "click")
                }), p.bind(t, "mouseover", function () {
                    p.addClass(r.__button, "hover")
                }), p.bind(t, "mouseout", function () {
                    p.removeClass(r.__button, "hover")
                })) : r instanceof c && (p.addClass(t, "color"), r.updateDisplay = f.compose(function (e) {
                    return t.style.borderLeftColor = r.__color.toString(), e
                }, r.updateDisplay), r.updateDisplay());
                r.setValue = f.compose(function (t) {
                    return e.getRoot().__preset_select && r.isModified() && T(e.getRoot(), !0), t
                }, r.setValue)
            }

            function y(e, t) {
                var r = e.getRoot(),
                    i = r.__rememberedObjects.indexOf(t.object);
                if (-1 != i) {
                    var n = r.__rememberedObjectIndecesToControllers[i];
                    if (void 0 === n && (n = {}, r.__rememberedObjectIndecesToControllers[i] = n), n[t.property] = t, r.load && r.load.remembered) {
                        var o, a = r.load.remembered;
                        if (a[e.preset]) o = a[e.preset];
                        else {
                            if (!a[B]) return;
                            o = a[B]
                        }
                        if (o[i] && void 0 !== o[i][t.property]) {
                            var s = o[i][t.property];
                            t.initialValue = s, t.setValue(s)
                        }
                    }
                }
            }

            function x(e, t) {
                return document.location.href + "." + t
            }

            function _(e) {
                function t() {
                    l.style.display = e.useLocalStorage ? "block" : "none"
                }
                var r = e.__save_row = document.createElement("li");
                p.addClass(e.domElement, "has-save"), e.__ul.insertBefore(r, e.__ul.firstChild), p.addClass(r, "save-row");
                var i = document.createElement("span");
                i.innerHTML = "&nbsp;", p.addClass(i, "button gears");
                var n = document.createElement("span");
                n.innerHTML = "Save", p.addClass(n, "button"), p.addClass(n, "save");
                var o = document.createElement("span");
                o.innerHTML = "New", p.addClass(o, "button"), p.addClass(o, "save-as");
                var a = document.createElement("span");
                a.innerHTML = "Revert", p.addClass(a, "button"), p.addClass(a, "revert");
                var s = e.__preset_select = document.createElement("select");
                if (e.load && e.load.remembered ? f.each(e.load.remembered, function (t, r) {
                        S(e, r, r == e.preset)
                    }) : S(e, B, !1), p.bind(s, "change", function () {
                        for (var t = 0; t < e.__preset_select.length; t++) e.__preset_select[t].innerHTML = e.__preset_select[t].value;
                        e.preset = this.value
                    }), r.appendChild(s), r.appendChild(i), r.appendChild(n), r.appendChild(o), r.appendChild(a), D) {
                    var h = document.getElementById("dg-save-locally"),
                        l = document.getElementById("dg-local-explain");
                    h.style.display = "block";
                    var c = document.getElementById("dg-local-storage");
                    "true" === localStorage.getItem(x(e, "isLocal")) && c.setAttribute("checked", "checked"), t(), p.bind(c, "change", function () {
                        e.useLocalStorage = !e.useLocalStorage, t()
                    })
                }
                var u = document.getElementById("dg-new-constructor");
                p.bind(u, "keydown", function (e) {
                    !e.metaKey || 67 !== e.which && 67 != e.keyCode || C.hide()
                }), p.bind(i, "click", function () {
                    u.innerHTML = JSON.stringify(e.getSaveObject(), void 0, 2), C.show(), u.focus(), u.select()
                }), p.bind(n, "click", function () {
                    e.save()
                }), p.bind(o, "click", function () {
                    var t = prompt("Enter a new preset name.");
                    t && e.saveAs(t)
                }), p.bind(a, "click", function () {
                    e.revert()
                })
            }

            function b(e) {
                function t(t) {
                    return t.preventDefault(), n = t.clientX, p.addClass(e.__closeButton, O.CLASS_DRAG), p.bind(window, "mousemove", r), p.bind(window, "mouseup", i), !1
                }

                function r(t) {
                    return t.preventDefault(), e.width += n - t.clientX, e.onResize(), n = t.clientX, !1
                }

                function i() {
                    p.removeClass(e.__closeButton, O.CLASS_DRAG), p.unbind(window, "mousemove", r), p.unbind(window, "mouseup", i)
                }
                e.__resize_handle = document.createElement("div"), f.extend(e.__resize_handle.style, {
                    width: "6px",
                    marginLeft: "-3px",
                    height: "200px",
                    cursor: "ew-resize",
                    position: "absolute"
                });
                var n;
                p.bind(e.__resize_handle, "mousedown", t), p.bind(e.__closeButton, "mousedown", t), e.domElement.insertBefore(e.__resize_handle, e.domElement.firstElementChild)
            }

            function w(e, t) {
                e.domElement.style.width = t + "px", e.__save_row && e.autoPlace && (e.__save_row.style.width = t + "px"), e.__closeButton && (e.__closeButton.style.width = t + "px")
            }

            function M(e, t) {
                var r = {};
                return f.each(e.__rememberedObjects, function (i, n) {
                    var o = {},
                        a = e.__rememberedObjectIndecesToControllers[n];
                    f.each(a, function (e, r) {
                        o[r] = t ? e.initialValue : e.getValue()
                    }), r[n] = o
                }), r
            }

            function S(e, t, r) {
                var i = document.createElement("option");
                i.innerHTML = t, i.value = t, e.__preset_select.appendChild(i), r && (e.__preset_select.selectedIndex = e.__preset_select.length - 1)
            }

            function E(e) {
                for (var t = 0; t < e.__preset_select.length; t++) e.__preset_select[t].value == e.preset && (e.__preset_select.selectedIndex = t)
            }

            function T(e, t) {
                var r = e.__preset_select[e.__preset_select.selectedIndex];
                r.innerHTML = t ? r.value + "*" : r.value
            }

            function A(e) {
                0 != e.length && u(function () {
                    A(e)
                }), f.each(e, function (e) {
                    e.updateDisplay()
                })
            }
            e.inject(r);
            var C, L, R = "dg",
                P = 72,
                F = 20,
                B = "Default",
                D = function () {
                    try {
                        return "localStorage" in window && null !== window.localStorage
                    } catch (e) {
                        return !1
                    }
                }(),
                U = !0,
                k = !1,
                V = [],
                O = function (e) {
                    function t() {
                        localStorage.setItem(x(i, "gui"), JSON.stringify(i.getSaveObject()))
                    }

                    function r() {
                        var e = i.getRoot();
                        e.width += 1, f.defer(function () {
                            e.width -= 1
                        })
                    }
                    var i = this;
                    this.domElement = document.createElement("div"), this.__ul = document.createElement("ul"), this.domElement.appendChild(this.__ul), p.addClass(this.domElement, R), this.__folders = {}, this.__controllers = [], this.__rememberedObjects = [], this.__rememberedObjectIndecesToControllers = [], this.__listening = [], e = e || {}, e = f.defaults(e, {
                        autoPlace: !0,
                        width: O.DEFAULT_WIDTH
                    }), e = f.defaults(e, {
                        resizable: e.autoPlace,
                        hideable: e.autoPlace
                    }), f.isUndefined(e.load) ? e.load = {
                        preset: B
                    } : e.preset && (e.load.preset = e.preset), f.isUndefined(e.parent) && e.hideable && V.push(this), e.resizable = f.isUndefined(e.parent) && e.resizable, e.autoPlace && f.isUndefined(e.scrollable) && (e.scrollable = !0);
                    var n = D && "true" === localStorage.getItem(x(this, "isLocal"));
                    if (Object.defineProperties(this, {
                            parent: {
                                get: function () {
                                    return e.parent
                                }
                            },
                            scrollable: {
                                get: function () {
                                    return e.scrollable
                                }
                            },
                            autoPlace: {
                                get: function () {
                                    return e.autoPlace
                                }
                            },
                            preset: {
                                get: function () {
                                    return i.parent ? i.getRoot().preset : e.load.preset
                                },
                                set: function (t) {
                                    i.parent ? i.getRoot().preset = t : e.load.preset = t, E(this), i.revert()
                                }
                            },
                            width: {
                                get: function () {
                                    return e.width
                                },
                                set: function (t) {
                                    e.width = t, w(i, t)
                                }
                            },
                            name: {
                                get: function () {
                                    return e.name
                                },
                                set: function (t) {
                                    e.name = t, a && (a.innerHTML = e.name)
                                }
                            },
                            closed: {
                                get: function () {
                                    return e.closed
                                },
                                set: function (t) {
                                    e.closed = t, e.closed ? p.addClass(i.__ul, O.CLASS_CLOSED) : p.removeClass(i.__ul, O.CLASS_CLOSED), this.onResize(), i.__closeButton && (i.__closeButton.innerHTML = t ? O.TEXT_OPEN : O.TEXT_CLOSED)
                                }
                            },
                            load: {
                                get: function () {
                                    return e.load
                                }
                            },
                            useLocalStorage: {
                                get: function () {
                                    return n
                                },
                                set: function (e) {
                                    D && (n = e, e ? p.bind(window, "unload", t) : p.unbind(window, "unload", t), localStorage.setItem(x(i, "isLocal"), e))
                                }
                            }
                        }), f.isUndefined(e.parent)) {
                        if (e.closed = !1, p.addClass(this.domElement, O.CLASS_MAIN), p.makeSelectable(this.domElement, !1), D && n) {
                            i.useLocalStorage = !0;
                            var o = localStorage.getItem(x(this, "gui"));
                            o && (e.load = JSON.parse(o))
                        }
                        this.__closeButton = document.createElement("div"), this.__closeButton.innerHTML = O.TEXT_CLOSED, p.addClass(this.__closeButton, O.CLASS_CLOSE_BUTTON), this.domElement.appendChild(this.__closeButton), p.bind(this.__closeButton, "click", function () {
                            i.closed = !i.closed
                        })
                    } else {
                        void 0 === e.closed && (e.closed = !0);
                        var a = document.createTextNode(e.name);
                        p.addClass(a, "controller-name");
                        var s = g(i, a),
                            h = function (e) {
                                return e.preventDefault(), i.closed = !i.closed, !1
                            };
                        p.addClass(this.__ul, O.CLASS_CLOSED), p.addClass(s, "title"), p.bind(s, "click", h), e.closed || (this.closed = !1)
                    }
                    e.autoPlace && (f.isUndefined(e.parent) && (U && (L = document.createElement("div"), p.addClass(L, R), p.addClass(L, O.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(L), U = !1), L.appendChild(this.domElement), p.addClass(this.domElement, O.CLASS_AUTO_PLACE)), this.parent || w(i, e.width)), p.bind(window, "resize", function () {
                        i.onResize()
                    }), p.bind(this.__ul, "webkitTransitionEnd", function () {
                        i.onResize()
                    }), p.bind(this.__ul, "transitionend", function () {
                        i.onResize()
                    }), p.bind(this.__ul, "oTransitionEnd", function () {
                        i.onResize()
                    }), this.onResize(), e.resizable && b(this);
                    i.getRoot();
                    e.parent || r()
                };
            return O.toggleHide = function () {
                k = !k, f.each(V, function (e) {
                    e.domElement.style.zIndex = k ? -999 : 999, e.domElement.style.opacity = k ? 0 : 1
                })
            }, O.CLASS_AUTO_PLACE = "a", O.CLASS_AUTO_PLACE_CONTAINER = "ac", O.CLASS_MAIN = "main", O.CLASS_CONTROLLER_ROW = "cr", O.CLASS_TOO_TALL = "taller-than-window", O.CLASS_CLOSED = "closed", O.CLASS_CLOSE_BUTTON = "close-button", O.CLASS_DRAG = "drag", O.DEFAULT_WIDTH = 245, O.TEXT_CLOSED = "Close Controls", O.TEXT_OPEN = "Open Controls", p.bind(window, "keydown", function (e) {
                "text" === document.activeElement.type || e.which !== P && e.keyCode != P || O.toggleHide()
            }, !1), f.extend(O.prototype, {
                add: function (e, t) {
                    return m(this, e, t, {
                        factoryArgs: Array.prototype.slice.call(arguments, 2)
                    })
                },
                addColor: function (e, t) {
                    return m(this, e, t, {
                        color: !0
                    })
                },
                remove: function (e) {
                    this.__ul.removeChild(e.__li), this.__controllers.slice(this.__controllers.indexOf(e), 1);
                    var t = this;
                    f.defer(function () {
                        t.onResize()
                    })
                },
                destroy: function () {
                    this.autoPlace && L.removeChild(this.domElement)
                },
                addFolder: function (e) {
                    if (void 0 !== this.__folders[e]) throw new Error('You already have a folder in this GUI by the name "' + e + '"');
                    var t = {
                        name: e,
                        parent: this
                    };
                    t.autoPlace = this.autoPlace, this.load && this.load.folders && this.load.folders[e] && (t.closed = this.load.folders[e].closed,
                        t.load = this.load.folders[e]);
                    var r = new O(t);
                    this.__folders[e] = r;
                    var i = g(this, r.domElement);
                    return p.addClass(i, "folder"), r
                },
                open: function () {
                    this.closed = !1
                },
                close: function () {
                    this.closed = !0
                },
                onResize: function () {
                    var e = this.getRoot();
                    if (e.scrollable) {
                        var t = p.getOffset(e.__ul).top,
                            r = 0;
                        f.each(e.__ul.childNodes, function (t) {
                            e.autoPlace && t === e.__save_row || (r += p.getHeight(t))
                        }), window.innerHeight - t - F < r ? (p.addClass(e.domElement, O.CLASS_TOO_TALL), e.__ul.style.height = window.innerHeight - t - F + "px") : (p.removeClass(e.domElement, O.CLASS_TOO_TALL), e.__ul.style.height = "auto")
                    }
                    e.__resize_handle && f.defer(function () {
                        e.__resize_handle.style.height = e.__ul.offsetHeight + "px"
                    }), e.__closeButton && (e.__closeButton.style.width = e.width + "px")
                },
                remember: function () {
                    if (f.isUndefined(C) && (C = new d, C.domElement.innerHTML = t), this.parent) throw new Error("You can only call remember on a top level GUI.");
                    var e = this;
                    f.each(Array.prototype.slice.call(arguments), function (t) {
                        0 == e.__rememberedObjects.length && _(e), -1 == e.__rememberedObjects.indexOf(t) && e.__rememberedObjects.push(t)
                    }), this.autoPlace && w(this, this.width)
                },
                getRoot: function () {
                    for (var e = this; e.parent;) e = e.parent;
                    return e
                },
                getSaveObject: function () {
                    var e = this.load;
                    return e.closed = this.closed, this.__rememberedObjects.length > 0 && (e.preset = this.preset, e.remembered || (e.remembered = {}), e.remembered[this.preset] = M(this)), e.folders = {}, f.each(this.__folders, function (t, r) {
                        e.folders[r] = t.getSaveObject()
                    }), e
                },
                save: function () {
                    this.load.remembered || (this.load.remembered = {}), this.load.remembered[this.preset] = M(this), T(this, !1)
                },
                saveAs: function (e) {
                    this.load.remembered || (this.load.remembered = {}, this.load.remembered[B] = M(this, !0)), this.load.remembered[e] = M(this), this.preset = e, S(this, e, !0)
                },
                revert: function (e) {
                    f.each(this.__controllers, function (t) {
                        this.getRoot().load.remembered ? y(e || this.getRoot(), t) : t.setValue(t.initialValue)
                    }, this), f.each(this.__folders, function (e) {
                        e.revert(e)
                    }), e || T(this.getRoot(), !1)
                },
                listen: function (e) {
                    var t = 0 == this.__listening.length;
                    this.__listening.push(e), t && A(this.__listening)
                }
            }), O
        }(r.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>', ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n", r.controllers.factory = function (e, t, r, i, n, o, a) {
            return function (s, h) {
                var l = s[h];
                return a.isArray(arguments[2]) || a.isObject(arguments[2]) ? new e(s, h, arguments[2]) : a.isNumber(l) ? a.isNumber(arguments[2]) && a.isNumber(arguments[3]) ? new r(s, h, arguments[2], arguments[3]) : new t(s, h, {
                    min: arguments[2],
                    max: arguments[3]
                }) : a.isString(l) ? new i(s, h) : a.isFunction(l) ? new n(s, h, "") : a.isBoolean(l) ? new o(s, h) : void 0
            }
        }(r.controllers.OptionController, r.controllers.NumberControllerBox, r.controllers.NumberControllerSlider, r.controllers.StringController = function (e, t, r) {
            var i = function (e, r) {
                function n() {
                    a.setValue(a.__input.value)
                }

                function o() {
                    a.__onFinishChange && a.__onFinishChange.call(a, a.getValue())
                }
                i.superclass.call(this, e, r);
                var a = this;
                this.__input = document.createElement("input"), this.__input.setAttribute("type", "text"), t.bind(this.__input, "keyup", n), t.bind(this.__input, "change", n), t.bind(this.__input, "blur", o), t.bind(this.__input, "keydown", function (e) {
                    13 === e.keyCode && this.blur()
                }), this.updateDisplay(), this.domElement.appendChild(this.__input)
            };
            return i.superclass = e, r.extend(i.prototype, e.prototype, {
                updateDisplay: function () {
                    return t.isActive(this.__input) || (this.__input.value = this.getValue()), i.superclass.prototype.updateDisplay.call(this)
                }
            }), i
        }(r.controllers.Controller, r.dom.dom, r.utils.common), r.controllers.FunctionController, r.controllers.BooleanController, r.utils.common), r.controllers.Controller, r.controllers.BooleanController, r.controllers.FunctionController, r.controllers.NumberControllerBox, r.controllers.NumberControllerSlider, r.controllers.OptionController, r.controllers.ColorController = function (e, t, r, i, n) {
            function o(e, t, r, i) {
                e.style.background = "", n.each(h, function (n) {
                    e.style.cssText += "background: " + n + "linear-gradient(" + t + ", " + r + " 0%, " + i + " 100%); "
                })
            }

            function a(e) {
                e.style.background = "", e.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);", e.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", e.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"
            }
            var s = function (e, h) {
                function l(e) {
                    p(e), t.bind(window, "mousemove", p), t.bind(window, "mouseup", c)
                }

                function c() {
                    t.unbind(window, "mousemove", p), t.unbind(window, "mouseup", c)
                }

                function u() {
                    var e = i(this.value);
                    e !== !1 ? (m.__color.__state = e, m.setValue(m.__color.toOriginal())) : this.value = m.__color.toString()
                }

                function d() {
                    t.unbind(window, "mousemove", f), t.unbind(window, "mouseup", d)
                }

                function p(e) {
                    e.preventDefault();
                    var r = t.getWidth(m.__saturation_field),
                        i = t.getOffset(m.__saturation_field),
                        n = (e.clientX - i.left + document.body.scrollLeft) / r,
                        o = 1 - (e.clientY - i.top + document.body.scrollTop) / r;
                    return o > 1 ? o = 1 : 0 > o && (o = 0), n > 1 ? n = 1 : 0 > n && (n = 0), m.__color.v = o, m.__color.s = n, m.setValue(m.__color.toOriginal()), !1
                }

                function f(e) {
                    e.preventDefault();
                    var r = t.getHeight(m.__hue_field),
                        i = t.getOffset(m.__hue_field),
                        n = 1 - (e.clientY - i.top + document.body.scrollTop) / r;
                    return n > 1 ? n = 1 : 0 > n && (n = 0), m.__color.h = 360 * n, m.setValue(m.__color.toOriginal()), !1
                }
                s.superclass.call(this, e, h), this.__color = new r(this.getValue()), this.__temp = new r(0);
                var m = this;
                this.domElement = document.createElement("div"), t.makeSelectable(this.domElement, !1), this.__selector = document.createElement("div"), this.__selector.className = "selector", this.__saturation_field = document.createElement("div"), this.__saturation_field.className = "saturation-field", this.__field_knob = document.createElement("div"), this.__field_knob.className = "field-knob", this.__field_knob_border = "2px solid ", this.__hue_knob = document.createElement("div"), this.__hue_knob.className = "hue-knob", this.__hue_field = document.createElement("div"), this.__hue_field.className = "hue-field", this.__input = document.createElement("input"), this.__input.type = "text", this.__input_textShadow = "0 1px 1px ", t.bind(this.__input, "keydown", function (e) {
                    13 === e.keyCode && u.call(this)
                }), t.bind(this.__input, "blur", u), t.bind(this.__selector, "mousedown", function () {
                    t.addClass(this, "drag").bind(window, "mouseup", function () {
                        t.removeClass(m.__selector, "drag")
                    })
                });
                var g = document.createElement("div");
                n.extend(this.__selector.style, {
                    width: "122px",
                    height: "102px",
                    padding: "3px",
                    backgroundColor: "#222",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
                }), n.extend(this.__field_knob.style, {
                    position: "absolute",
                    width: "12px",
                    height: "12px",
                    border: this.__field_knob_border + (this.__color.v < .5 ? "#fff" : "#000"),
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
                    borderRadius: "12px",
                    zIndex: 1
                }), n.extend(this.__hue_knob.style, {
                    position: "absolute",
                    width: "15px",
                    height: "2px",
                    borderRight: "4px solid #fff",
                    zIndex: 1
                }), n.extend(this.__saturation_field.style, {
                    width: "100px",
                    height: "100px",
                    border: "1px solid #555",
                    marginRight: "3px",
                    display: "inline-block",
                    cursor: "pointer"
                }), n.extend(g.style, {
                    width: "100%",
                    height: "100%",
                    background: "none"
                }), o(g, "top", "rgba(0,0,0,0)", "#000"), n.extend(this.__hue_field.style, {
                    width: "15px",
                    height: "100px",
                    display: "inline-block",
                    border: "1px solid #555",
                    cursor: "ns-resize"
                }), a(this.__hue_field), n.extend(this.__input.style, {
                    outline: "none",
                    textAlign: "center",
                    color: "#fff",
                    border: 0,
                    fontWeight: "bold",
                    textShadow: this.__input_textShadow + "rgba(0,0,0,0.7)"
                }), t.bind(this.__saturation_field, "mousedown", l), t.bind(this.__field_knob, "mousedown", l), t.bind(this.__hue_field, "mousedown", function (e) {
                    f(e), t.bind(window, "mousemove", f), t.bind(window, "mouseup", d)
                }), this.__saturation_field.appendChild(g), this.__selector.appendChild(this.__field_knob), this.__selector.appendChild(this.__saturation_field), this.__selector.appendChild(this.__hue_field), this.__hue_field.appendChild(this.__hue_knob), this.domElement.appendChild(this.__input), this.domElement.appendChild(this.__selector), this.updateDisplay()
            };
            s.superclass = e, n.extend(s.prototype, e.prototype, {
                updateDisplay: function () {
                    var e = i(this.getValue());
                    if (e !== !1) {
                        var t = !1;
                        n.each(r.COMPONENTS, function (r) {
                            return n.isUndefined(e[r]) || n.isUndefined(this.__color.__state[r]) || e[r] === this.__color.__state[r] ? void 0 : (t = !0, {})
                        }, this), t && n.extend(this.__color.__state, e)
                    }
                    n.extend(this.__temp.__state, this.__color.__state), this.__temp.a = 1;
                    var a = this.__color.v < .5 || this.__color.s > .5 ? 255 : 0,
                        s = 255 - a;
                    n.extend(this.__field_knob.style, {
                        marginLeft: 100 * this.__color.s - 7 + "px",
                        marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                        backgroundColor: this.__temp.toString(),
                        border: this.__field_knob_border + "rgb(" + a + "," + a + "," + a + ")"
                    }), this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px", this.__temp.s = 1, this.__temp.v = 1, o(this.__saturation_field, "left", "#fff", this.__temp.toString()), n.extend(this.__input.style, {
                        backgroundColor: this.__input.value = this.__color.toString(),
                        color: "rgb(" + a + "," + a + "," + a + ")",
                        textShadow: this.__input_textShadow + "rgba(" + s + "," + s + "," + s + ",.7)"
                    })
                }
            });
            var h = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
            return s
        }(r.controllers.Controller, r.dom.dom, r.color.Color = function (e, t, r, i) {
            function n(e, t, r) {
                Object.defineProperty(e, t, {
                    get: function () {
                        return "RGB" === this.__state.space ? this.__state[t] : (a(this, t, r), this.__state[t])
                    },
                    set: function (e) {
                        "RGB" !== this.__state.space && (a(this, t, r), this.__state.space = "RGB"), this.__state[t] = e
                    }
                })
            }

            function o(e, t) {
                Object.defineProperty(e, t, {
                    get: function () {
                        return "HSV" === this.__state.space ? this.__state[t] : (s(this), this.__state[t])
                    },
                    set: function (e) {
                        "HSV" !== this.__state.space && (s(this), this.__state.space = "HSV"), this.__state[t] = e
                    }
                })
            }

            function a(e, r, n) {
                if ("HEX" === e.__state.space) e.__state[r] = t.component_from_hex(e.__state.hex, n);
                else {
                    if ("HSV" !== e.__state.space) throw "Corrupted color state";
                    i.extend(e.__state, t.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v))
                }
            }

            function s(e) {
                var r = t.rgb_to_hsv(e.r, e.g, e.b);
                i.extend(e.__state, {
                    s: r.s,
                    v: r.v
                }), i.isNaN(r.h) ? i.isUndefined(e.__state.h) && (e.__state.h = 0) : e.__state.h = r.h
            }
            var h = function () {
                if (this.__state = e.apply(this, arguments), this.__state === !1) throw "Failed to interpret color arguments";
                this.__state.a = this.__state.a || 1
            };
            return h.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"], i.extend(h.prototype, {
                toString: function () {
                    return r(this)
                },
                toOriginal: function () {
                    return this.__state.conversion.write(this)
                }
            }), n(h.prototype, "r", 2), n(h.prototype, "g", 1), n(h.prototype, "b", 0), o(h.prototype, "h"), o(h.prototype, "s"), o(h.prototype, "v"), Object.defineProperty(h.prototype, "a", {
                get: function () {
                    return this.__state.a
                },
                set: function (e) {
                    this.__state.a = e
                }
            }), Object.defineProperty(h.prototype, "hex", {
                get: function () {
                    return "HEX" !== !this.__state.space && (this.__state.hex = t.rgb_to_hex(this.r, this.g, this.b)), this.__state.hex
                },
                set: function (e) {
                    this.__state.space = "HEX", this.__state.hex = e
                }
            }), h
        }(r.color.interpret, r.color.math = function () {
            var e;
            return {
                hsv_to_rgb: function (e, t, r) {
                    var i = Math.floor(e / 60) % 6,
                        n = e / 60 - Math.floor(e / 60),
                        o = r * (1 - t),
                        a = r * (1 - n * t),
                        s = r * (1 - (1 - n) * t),
                        h = [
                            [r, s, o],
                            [a, r, o],
                            [o, r, s],
                            [o, a, r],
                            [s, o, r],
                            [r, o, a]
                        ][i];
                    return {
                        r: 255 * h[0],
                        g: 255 * h[1],
                        b: 255 * h[2]
                    }
                },
                rgb_to_hsv: function (e, t, r) {
                    var i, n, o = Math.min(e, t, r),
                        a = Math.max(e, t, r),
                        s = a - o;
                    return 0 == a ? {
                        h: 0 / 0,
                        s: 0,
                        v: 0
                    } : (n = s / a, i = e == a ? (t - r) / s : t == a ? 2 + (r - e) / s : 4 + (e - t) / s, i /= 6, 0 > i && (i += 1), {
                        h: 360 * i,
                        s: n,
                        v: a / 255
                    })
                },
                rgb_to_hex: function (e, t, r) {
                    var i = this.hex_with_component(0, 2, e);
                    return i = this.hex_with_component(i, 1, t), i = this.hex_with_component(i, 0, r)
                },
                component_from_hex: function (e, t) {
                    return e >> 8 * t & 255
                },
                hex_with_component: function (t, r, i) {
                    return i << (e = 8 * r) | t & ~(255 << e)
                }
            }
        }(), r.color.toString, r.utils.common), r.color.interpret, r.utils.common), r.utils.requestAnimationFrame = function () {
            return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
                window.setTimeout(e, 1e3 / 60)
            }
        }(), r.dom.CenteredDiv = function (e, t) {
            var r = function () {
                this.backgroundElement = document.createElement("div"), t.extend(this.backgroundElement.style, {
                    backgroundColor: "rgba(0,0,0,0.8)",
                    top: 0,
                    left: 0,
                    display: "none",
                    zIndex: "1000",
                    opacity: 0,
                    WebkitTransition: "opacity 0.2s linear"
                }), e.makeFullscreen(this.backgroundElement), this.backgroundElement.style.position = "fixed", this.domElement = document.createElement("div"), t.extend(this.domElement.style, {
                    position: "fixed",
                    display: "none",
                    zIndex: "1001",
                    opacity: 0,
                    WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear"
                }), document.body.appendChild(this.backgroundElement), document.body.appendChild(this.domElement);
                var r = this;
                e.bind(this.backgroundElement, "click", function () {
                    r.hide()
                })
            };
            return r.prototype.show = function () {
                var e = this;
                this.backgroundElement.style.display = "block", this.domElement.style.display = "block", this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)", this.layout(), t.defer(function () {
                    e.backgroundElement.style.opacity = 1, e.domElement.style.opacity = 1, e.domElement.style.webkitTransform = "scale(1)"
                })
            }, r.prototype.hide = function () {
                var t = this,
                    r = function () {
                        t.domElement.style.display = "none", t.backgroundElement.style.display = "none", e.unbind(t.domElement, "webkitTransitionEnd", r), e.unbind(t.domElement, "transitionend", r), e.unbind(t.domElement, "oTransitionEnd", r)
                    };
                e.bind(this.domElement, "webkitTransitionEnd", r), e.bind(this.domElement, "transitionend", r), e.bind(this.domElement, "oTransitionEnd", r), this.backgroundElement.style.opacity = 0, this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)"
            }, r.prototype.layout = function () {
                this.domElement.style.left = window.innerWidth / 2 - e.getWidth(this.domElement) / 2 + "px", this.domElement.style.top = window.innerHeight / 2 - e.getHeight(this.domElement) / 2 + "px"
            }, r
        }(r.dom.dom, r.utils.common), r.dom.dom, r.utils.common)
    }, {}],
    4: [function (e, t) {
        var r = function () {
            var e = Date.now(),
                t = e,
                r = 0,
                i = 1 / 0,
                n = 0,
                o = 0,
                a = 1 / 0,
                s = 0,
                h = 0,
                l = 0,
                c = document.createElement("div");
            c.id = "stats", c.addEventListener("mousedown", function (e) {
                e.preventDefault(), y(++l % 2)
            }, !1), c.style.cssText = "width:80px;opacity:0.9;cursor:pointer";
            var u = document.createElement("div");
            u.id = "fps", u.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002", c.appendChild(u);
            var d = document.createElement("div");
            d.id = "fpsText", d.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px", d.innerHTML = "FPS", u.appendChild(d);
            var p = document.createElement("div");
            for (p.id = "fpsGraph", p.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff", u.appendChild(p); 74 > p.children.length;) {
                var f = document.createElement("span");
                f.style.cssText = "width:1px;height:30px;float:left;background-color:#113", p.appendChild(f)
            }
            var m = document.createElement("div");
            m.id = "ms", m.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none", c.appendChild(m);
            var g = document.createElement("div");
            g.id = "msText", g.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px", g.innerHTML = "MS", m.appendChild(g);
            var v = document.createElement("div");
            for (v.id = "msGraph", v.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0", m.appendChild(v); 74 > v.children.length;) f = document.createElement("span"), f.style.cssText = "width:1px;height:30px;float:left;background-color:#131", v.appendChild(f);
            var y = function (e) {
                switch (l = e) {
                    case 0:
                        u.style.display = "block", m.style.display = "none";
                        break;
                    case 1:
                        u.style.display = "none", m.style.display = "block"
                }
            };
            return {
                REVISION: 12,
                domElement: c,
                setMode: y,
                begin: function () {
                    e = Date.now()
                },
                end: function () {
                    var l = Date.now();
                    r = l - e, i = Math.min(i, r), n = Math.max(n, r), g.textContent = r + " MS (" + i + "-" + n + ")";
                    var c = Math.min(30, 30 - 30 * (r / 200));
                    return v.appendChild(v.firstChild).style.height = c + "px", h++, l > t + 1e3 && (o = Math.round(1e3 * h / (l - t)), a = Math.min(a, o), s = Math.max(s, o), d.textContent = o + " FPS (" + a + "-" + s + ")", c = Math.min(30, 30 - 30 * (o / 100)), p.appendChild(p.firstChild).style.height = c + "px", t = l, h = 0), l
                },
                update: function () {
                    e = this.end()
                }
            }
        };
        "object" == typeof t && (t.exports = r)
    }, {}],
    5: [function (e, t) {
        t.exports = function (e) {
            function t(t, i) {
                function n() {
                    return 2 * Math.PI / 60 / 60 * g.autoRotateSpeed
                }

                function o() {
                    return Math.pow(.95, g.zoomSpeed)
                }

                function a(e) {
                    if (g.enabled !== !1) {
                        if (e.preventDefault(), e.button === g.mouseButtons.ORBIT) {
                            if (g.noRotate === !0) return;
                            k = U.ROTATE, y.set(e.clientX, e.clientY)
                        } else if (e.button === g.mouseButtons.ZOOM) {
                            if (g.noZoom === !0) return;
                            k = U.DOLLY, T.set(e.clientX, e.clientY)
                        } else if (e.button === g.mouseButtons.PAN) {
                            if (g.noPan === !0) return;
                            k = U.PAN, b.set(e.clientX, e.clientY)
                        }
                        k !== U.NONE && (document.addEventListener("mousemove", s, !1), document.addEventListener("mouseup", h, !1), g.dispatchEvent(z))
                    }
                }

                function s(e) {
                    if (g.enabled !== !1) {
                        e.preventDefault();
                        var t = g.domElement === document ? g.domElement.body : g.domElement;
                        if (k === U.ROTATE) {
                            if (g.noRotate === !0) return;
                            x.set(e.clientX, e.clientY), _.subVectors(x, y), g.rotateLeft(2 * Math.PI * _.x / t.clientWidth * g.rotateSpeed), g.rotateUp(2 * Math.PI * _.y / t.clientHeight * g.rotateSpeed), y.copy(x)
                        } else if (k === U.DOLLY) {
                            if (g.noZoom === !0) return;
                            A.set(e.clientX, e.clientY), C.subVectors(A, T), C.y > 0 ? g.dollyIn() : g.dollyOut(), T.copy(A)
                        } else if (k === U.PAN) {
                            if (g.noPan === !0) return;
                            w.set(e.clientX, e.clientY), M.subVectors(w, b), g.pan(M.x, M.y), b.copy(w)
                        }
                        k !== U.NONE && g.update()
                    }
                }

                function h() {
                    g.enabled !== !1 && (document.removeEventListener("mousemove", s, !1), document.removeEventListener("mouseup", h, !1), g.dispatchEvent(I), k = U.NONE)
                }

                function l(e) {
                    if (g.enabled !== !1 && g.noZoom !== !0 && k === U.NONE) {
                        e.preventDefault(), e.stopPropagation();
                        var t = 0;
                        void 0 !== e.wheelDelta ? t = e.wheelDelta : void 0 !== e.detail && (t = -e.detail), t > 0 ? g.dollyOut() : g.dollyIn(), g.update(), g.dispatchEvent(z), g.dispatchEvent(I)
                    }
                }

                function c(e) {
                    if (g.enabled !== !1 && g.noKeys !== !0 && g.noPan !== !0) switch (e.keyCode) {
                        case g.keys.UP:
                            g.pan(0, g.keyPanSpeed), g.update();
                            break;
                        case g.keys.BOTTOM:
                            g.pan(0, -g.keyPanSpeed), g.update();
                            break;
                        case g.keys.LEFT:
                            g.pan(g.keyPanSpeed, 0), g.update();
                            break;
                        case g.keys.RIGHT:
                            g.pan(-g.keyPanSpeed, 0), g.update()
                    }
                }

                function u(e) {
                    if (g.enabled !== !1) {
                        switch (e.touches.length) {
                            case 1:
                                if (g.noRotate === !0) return;
                                k = U.TOUCH_ROTATE, y.set(e.touches[0].pageX, e.touches[0].pageY);
                                break;
                            case 2:
                                if (g.noZoom === !0) return;
                                k = U.TOUCH_DOLLY;
                                var t = e.touches[0].pageX - e.touches[1].pageX,
                                    r = e.touches[0].pageY - e.touches[1].pageY,
                                    i = Math.sqrt(t * t + r * r);
                                T.set(0, i);
                                break;
                            case 3:
                                if (g.noPan === !0) return;
                                k = U.TOUCH_PAN, b.set(e.touches[0].pageX, e.touches[0].pageY);
                                break;
                            default:
                                k = U.NONE
                        }
                        k !== U.NONE && g.dispatchEvent(z)
                    }
                }

                function d(e) {
                    if (g.enabled !== !1) {
                        e.preventDefault(), e.stopPropagation();
                        var t = g.domElement === document ? g.domElement.body : g.domElement;
                        switch (e.touches.length) {
                            case 1:
                                if (g.noRotate === !0) return;
                                if (k !== U.TOUCH_ROTATE) return;
                                x.set(e.touches[0].pageX, e.touches[0].pageY), _.subVectors(x, y), g.rotateLeft(2 * Math.PI * _.x / t.clientWidth * g.rotateSpeed), g.rotateUp(2 * Math.PI * _.y / t.clientHeight * g.rotateSpeed), y.copy(x), g.update();
                                break;
                            case 2:
                                if (g.noZoom === !0) return;
                                if (k !== U.TOUCH_DOLLY) return;
                                var r = e.touches[0].pageX - e.touches[1].pageX,
                                    i = e.touches[0].pageY - e.touches[1].pageY,
                                    n = Math.sqrt(r * r + i * i);
                                A.set(0, n), C.subVectors(A, T), C.y > 0 ? g.dollyOut() : g.dollyIn(), T.copy(A), g.update();
                                break;
                            case 3:
                                if (g.noPan === !0) return;
                                if (k !== U.TOUCH_PAN) return;
                                w.set(e.touches[0].pageX, e.touches[0].pageY), M.subVectors(w, b), g.pan(M.x, M.y), b.copy(w), g.update();
                                break;
                            default:
                                k = U.NONE
                        }
                    }
                }

                function p() {
                    g.enabled !== !1 && (g.dispatchEvent(I), k = U.NONE)
                }
                this.object = t, this.domElement = void 0 !== i ? i : document, this.enabled = !0, this.target = new e.Vector3, this.center = this.target, this.noZoom = !1, this.zoomSpeed = 1, this.minDistance = 0, this.maxDistance = 1 / 0, this.noRotate = !1, this.rotateSpeed = 1, this.noPan = !1, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -(1 / 0), this.maxAzimuthAngle = 1 / 0, this.noKeys = !1, this.keys = {
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    BOTTOM: 40
                }, this.mouseButtons = {
                    ORBIT: r.LEFT,
                    ZOOM: r.MIDDLE,
                    PAN: r.RIGHT
                };
                var f, m, g = this,
                    v = 1e-6,
                    y = new e.Vector2,
                    x = new e.Vector2,
                    _ = new e.Vector2,
                    b = new e.Vector2,
                    w = new e.Vector2,
                    M = new e.Vector2,
                    S = new e.Vector3,
                    E = new e.Vector3,
                    T = new e.Vector2,
                    A = new e.Vector2,
                    C = new e.Vector2,
                    L = 0,
                    R = 0,
                    P = 1,
                    F = new e.Vector3,
                    B = new e.Vector3,
                    D = new e.Quaternion,
                    U = {
                        NONE: -1,
                        ROTATE: 0,
                        DOLLY: 1,
                        PAN: 2,
                        TOUCH_ROTATE: 3,
                        TOUCH_DOLLY: 4,
                        TOUCH_PAN: 5
                    },
                    k = U.NONE;
                this.target0 = this.target.clone(), this.position0 = this.object.position.clone();
                var V = (new e.Quaternion).setFromUnitVectors(t.up, new e.Vector3(0, 1, 0)),
                    O = V.clone().inverse(),
                    N = {
                        type: "change"
                    },
                    z = {
                        type: "start"
                    },
                    I = {
                        type: "end"
                    };
                this.rotateLeft = function (e) {
                    void 0 === e && (e = n()), R -= e
                }, this.rotateUp = function (e) {
                    void 0 === e && (e = n()), L -= e
                }, this.panLeft = function (e) {
                    var t = this.object.matrix.elements;
                    S.set(t[0], t[1], t[2]), S.multiplyScalar(-e), F.add(S)
                }, this.panUp = function (e) {
                    var t = this.object.matrix.elements;
                    S.set(t[4], t[5], t[6]), S.multiplyScalar(e), F.add(S)
                }, this.pan = function (e, t) {
                    var r = g.domElement === document ? g.domElement.body : g.domElement;
                    if (void 0 !== g.object.fov) {
                        var i = g.object.position,
                            n = i.clone().sub(g.target),
                            o = n.length();
                        o *= Math.tan(g.object.fov / 2 * Math.PI / 180), g.panLeft(2 * e * o / r.clientHeight), g.panUp(2 * t * o / r.clientHeight)
                    } else void 0 !== g.object.top ? (g.panLeft(e * (g.object.right - g.object.left) / r.clientWidth), g.panUp(t * (g.object.top - g.object.bottom) / r.clientHeight)) : console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.")
                }, this.dollyIn = function (e) {
                    void 0 === e && (e = o()), P /= e
                }, this.dollyOut = function (e) {
                    void 0 === e && (e = o()), P *= e
                }, this.update = function () {
                    var e = this.object.position;
                    E.copy(e).sub(this.target), E.applyQuaternion(V), f = Math.atan2(E.x, E.z), m = Math.atan2(Math.sqrt(E.x * E.x + E.z * E.z), E.y), this.autoRotate && k === U.NONE && this.rotateLeft(n()), f += R, m += L, f = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, f)), m = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, m)), m = Math.max(v, Math.min(Math.PI - v, m));
                    var t = E.length() * P;
                    t = Math.max(this.minDistance, Math.min(this.maxDistance, t)), this.target.add(F), E.x = t * Math.sin(m) * Math.sin(f), E.y = t * Math.cos(m), E.z = t * Math.sin(m) * Math.cos(f), E.applyQuaternion(O), e.copy(this.target).add(E), this.object.lookAt(this.target), R = 0, L = 0, P = 1, F.set(0, 0, 0), (B.distanceToSquared(this.object.position) > v || 8 * (1 - D.dot(this.object.quaternion)) > v) && (this.dispatchEvent(N), B.copy(this.object.position), D.copy(this.object.quaternion))
                }, this.reset = function () {
                    k = U.NONE, this.target.copy(this.target0), this.object.position.copy(this.position0), this.update()
                }, this.getPolarAngle = function () {
                    return m
                }, this.getAzimuthalAngle = function () {
                    return f
                }, this.domElement.addEventListener("contextmenu", function (e) {
                    e.preventDefault()
                }, !1), this.domElement.addEventListener("mousedown", a, !1), this.domElement.addEventListener("mousewheel", l, !1), this.domElement.addEventListener("DOMMouseScroll", l, !1), this.domElement.addEventListener("touchstart", u, !1), this.domElement.addEventListener("touchend", p, !1), this.domElement.addEventListener("touchmove", d, !1), window.addEventListener("keydown", c, !1), this.update()
            }
            var r = e.MOUSE;
            return r || (r = {
                LEFT: 0,
                MIDDLE: 1,
                RIGHT: 2
            }), t.prototype = Object.create(e.EventDispatcher.prototype), t.prototype.constructor = t, t
        }
    }, {}],
    6: [function (e, t, r) {
        var i = i || {},
            n = {
                REVISION: "71"
            };
        "object" == typeof t && (t.exports = n), void 0 === Math.sign && (Math.sign = function (e) {
                return 0 > e ? -1 : e > 0 ? 1 : +e
            }), n.log = function () {
                console.log.apply(console, arguments)
            }, n.warn = function () {
                console.warn.apply(console, arguments)
            }, n.error = function () {
                console.error.apply(console, arguments)
            }, n.MOUSE = {
                LEFT: 0,
                MIDDLE: 1,
                RIGHT: 2
            }, n.CullFaceNone = 0, n.CullFaceBack = 1, n.CullFaceFront = 2, n.CullFaceFrontBack = 3, n.FrontFaceDirectionCW = 0, n.FrontFaceDirectionCCW = 1, n.BasicShadowMap = 0, n.PCFShadowMap = 1, n.PCFSoftShadowMap = 2, n.FrontSide = 0, n.BackSide = 1, n.DoubleSide = 2, n.NoShading = 0, n.FlatShading = 1, n.SmoothShading = 2, n.NoColors = 0, n.FaceColors = 1, n.VertexColors = 2, n.NoBlending = 0, n.NormalBlending = 1, n.AdditiveBlending = 2, n.SubtractiveBlending = 3, n.MultiplyBlending = 4, n.CustomBlending = 5, n.AddEquation = 100, n.SubtractEquation = 101, n.ReverseSubtractEquation = 102, n.MinEquation = 103, n.MaxEquation = 104, n.ZeroFactor = 200, n.OneFactor = 201, n.SrcColorFactor = 202, n.OneMinusSrcColorFactor = 203, n.SrcAlphaFactor = 204, n.OneMinusSrcAlphaFactor = 205, n.DstAlphaFactor = 206, n.OneMinusDstAlphaFactor = 207, n.DstColorFactor = 208, n.OneMinusDstColorFactor = 209, n.SrcAlphaSaturateFactor = 210, n.MultiplyOperation = 0, n.MixOperation = 1, n.AddOperation = 2, n.UVMapping = 300, n.CubeReflectionMapping = 301, n.CubeRefractionMapping = 302, n.EquirectangularReflectionMapping = 303, n.EquirectangularRefractionMapping = 304, n.SphericalReflectionMapping = 305, n.RepeatWrapping = 1e3, n.ClampToEdgeWrapping = 1001, n.MirroredRepeatWrapping = 1002, n.NearestFilter = 1003, n.NearestMipMapNearestFilter = 1004, n.NearestMipMapLinearFilter = 1005, n.LinearFilter = 1006, n.LinearMipMapNearestFilter = 1007, n.LinearMipMapLinearFilter = 1008, n.UnsignedByteType = 1009, n.ByteType = 1010, n.ShortType = 1011, n.UnsignedShortType = 1012, n.IntType = 1013, n.UnsignedIntType = 1014, n.FloatType = 1015, n.HalfFloatType = 1025, n.UnsignedShort4444Type = 1016, n.UnsignedShort5551Type = 1017, n.UnsignedShort565Type = 1018, n.AlphaFormat = 1019, n.RGBFormat = 1020, n.RGBAFormat = 1021, n.LuminanceFormat = 1022, n.LuminanceAlphaFormat = 1023, n.RGBEFormat = n.RGBAFormat, n.RGB_S3TC_DXT1_Format = 2001, n.RGBA_S3TC_DXT1_Format = 2002, n.RGBA_S3TC_DXT3_Format = 2003, n.RGBA_S3TC_DXT5_Format = 2004, n.RGB_PVRTC_4BPPV1_Format = 2100, n.RGB_PVRTC_2BPPV1_Format = 2101, n.RGBA_PVRTC_4BPPV1_Format = 2102, n.RGBA_PVRTC_2BPPV1_Format = 2103, n.Projector = function () {
                n.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js."), this.projectVector = function (e, t) {
                    n.warn("THREE.Projector: .projectVector() is now vector.project()."), e.project(t)
                }, this.unprojectVector = function (e, t) {
                    n.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), e.unproject(t)
                }, this.pickingRay = function () {
                    n.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
                }
            }, n.CanvasRenderer = function () {
                n.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js"), this.domElement = document.createElement("canvas"), this.clear = function () {}, this.render = function () {}, this.setClearColor = function () {}, this.setSize = function () {}
            }, n.Color = function (e) {
                return 3 === arguments.length ? this.setRGB(arguments[0], arguments[1], arguments[2]) : this.set(e)
            }, n.Color.prototype = {
                constructor: n.Color,
                r: 1,
                g: 1,
                b: 1,
                set: function (e) {
                    return e instanceof n.Color ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e), this
                },
                setHex: function (e) {
                    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (255 & e) / 255, this
                },
                setRGB: function (e, t, r) {
                    return this.r = e, this.g = t, this.b = r, this
                },
                setHSL: function (e, t, r) {
                    if (0 === t) this.r = this.g = this.b = r;
                    else {
                        var i = function (e, t, r) {
                                return 0 > r && (r += 1), r > 1 && (r -= 1), 1 / 6 > r ? e + 6 * (t - e) * r : .5 > r ? t : 2 / 3 > r ? e + 6 * (t - e) * (2 / 3 - r) : e
                            },
                            n = .5 >= r ? r * (1 + t) : r + t - r * t,
                            o = 2 * r - n;
                        this.r = i(o, n, e + 1 / 3), this.g = i(o, n, e), this.b = i(o, n, e - 1 / 3)
                    }
                    return this
                },
                setStyle: function (e) {
                    if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(e)) {
                        var t = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(e);
                        return this.r = Math.min(255, parseInt(t[1], 10)) / 255, this.g = Math.min(255, parseInt(t[2], 10)) / 255, this.b = Math.min(255, parseInt(t[3], 10)) / 255, this
                    }
                    if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(e)) {
                        var t = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(e);
                        return this.r = Math.min(100, parseInt(t[1], 10)) / 100, this.g = Math.min(100, parseInt(t[2], 10)) / 100, this.b = Math.min(100, parseInt(t[3], 10)) / 100, this
                    }
                    if (/^\#([0-9a-f]{6})$/i.test(e)) {
                        var t = /^\#([0-9a-f]{6})$/i.exec(e);
                        return this.setHex(parseInt(t[1], 16)), this
                    }
                    if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(e)) {
                        var t = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(e);
                        return this.setHex(parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3], 16)), this
                    }
                    return /^(\w+)$/i.test(e) ? (this.setHex(n.ColorKeywords[e]), this) : void 0
                },
                copy: function (e) {
                    return this.r = e.r, this.g = e.g, this.b = e.b, this
                },
                copyGammaToLinear: function (e, t) {
                    return void 0 === t && (t = 2), this.r = Math.pow(e.r, t), this.g = Math.pow(e.g, t), this.b = Math.pow(e.b, t), this
                },
                copyLinearToGamma: function (e, t) {
                    void 0 === t && (t = 2);
                    var r = t > 0 ? 1 / t : 1;
                    return this.r = Math.pow(e.r, r), this.g = Math.pow(e.g, r), this.b = Math.pow(e.b, r), this
                },
                convertGammaToLinear: function () {
                    var e = this.r,
                        t = this.g,
                        r = this.b;
                    return this.r = e * e, this.g = t * t, this.b = r * r, this
                },
                convertLinearToGamma: function () {
                    return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
                },
                getHex: function () {
                    return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
                },
                getHexString: function () {
                    return ("000000" + this.getHex().toString(16)).slice(-6)
                },
                getHSL: function (e) {
                    var t, r, i = e || {
                            h: 0,
                            s: 0,
                            l: 0
                        },
                        n = this.r,
                        o = this.g,
                        a = this.b,
                        s = Math.max(n, o, a),
                        h = Math.min(n, o, a),
                        l = (h + s) / 2;
                    if (h === s) t = 0, r = 0;
                    else {
                        var c = s - h;
                        switch (r = .5 >= l ? c / (s + h) : c / (2 - s - h), s) {
                            case n:
                                t = (o - a) / c + (a > o ? 6 : 0);
                                break;
                            case o:
                                t = (a - n) / c + 2;
                                break;
                            case a:
                                t = (n - o) / c + 4
                        }
                        t /= 6
                    }
                    return i.h = t, i.s = r, i.l = l, i
                },
                getStyle: function () {
                    return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
                },
                offsetHSL: function (e, t, r) {
                    var i = this.getHSL();
                    return i.h += e, i.s += t, i.l += r, this.setHSL(i.h, i.s, i.l), this
                },
                add: function (e) {
                    return this.r += e.r, this.g += e.g, this.b += e.b, this
                },
                addColors: function (e, t) {
                    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this
                },
                addScalar: function (e) {
                    return this.r += e, this.g += e, this.b += e, this
                },
                multiply: function (e) {
                    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this
                },
                multiplyScalar: function (e) {
                    return this.r *= e, this.g *= e, this.b *= e, this
                },
                lerp: function (e, t) {
                    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this
                },
                equals: function (e) {
                    return e.r === this.r && e.g === this.g && e.b === this.b
                },
                fromArray: function (e) {
                    return this.r = e[0], this.g = e[1], this.b = e[2], this
                },
                toArray: function (e, t) {
                    return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e
                },
                clone: function () {
                    return (new n.Color).setRGB(this.r, this.g, this.b)
                }
            }, n.ColorKeywords = {
                aliceblue: 15792383,
                antiquewhite: 16444375,
                aqua: 65535,
                aquamarine: 8388564,
                azure: 15794175,
                beige: 16119260,
                bisque: 16770244,
                black: 0,
                blanchedalmond: 16772045,
                blue: 255,
                blueviolet: 9055202,
                brown: 10824234,
                burlywood: 14596231,
                cadetblue: 6266528,
                chartreuse: 8388352,
                chocolate: 13789470,
                coral: 16744272,
                cornflowerblue: 6591981,
                cornsilk: 16775388,
                crimson: 14423100,
                cyan: 65535,
                darkblue: 139,
                darkcyan: 35723,
                darkgoldenrod: 12092939,
                darkgray: 11119017,
                darkgreen: 25600,
                darkgrey: 11119017,
                darkkhaki: 12433259,
                darkmagenta: 9109643,
                darkolivegreen: 5597999,
                darkorange: 16747520,
                darkorchid: 10040012,
                darkred: 9109504,
                darksalmon: 15308410,
                darkseagreen: 9419919,
                darkslateblue: 4734347,
                darkslategray: 3100495,
                darkslategrey: 3100495,
                darkturquoise: 52945,
                darkviolet: 9699539,
                deeppink: 16716947,
                deepskyblue: 49151,
                dimgray: 6908265,
                dimgrey: 6908265,
                dodgerblue: 2003199,
                firebrick: 11674146,
                floralwhite: 16775920,
                forestgreen: 2263842,
                fuchsia: 16711935,
                gainsboro: 14474460,
                ghostwhite: 16316671,
                gold: 16766720,
                goldenrod: 14329120,
                gray: 8421504,
                green: 32768,
                greenyellow: 11403055,
                grey: 8421504,
                honeydew: 15794160,
                hotpink: 16738740,
                indianred: 13458524,
                indigo: 4915330,
                ivory: 16777200,
                khaki: 15787660,
                lavender: 15132410,
                lavenderblush: 16773365,
                lawngreen: 8190976,
                lemonchiffon: 16775885,
                lightblue: 11393254,
                lightcoral: 15761536,
                lightcyan: 14745599,
                lightgoldenrodyellow: 16448210,
                lightgray: 13882323,
                lightgreen: 9498256,
                lightgrey: 13882323,
                lightpink: 16758465,
                lightsalmon: 16752762,
                lightseagreen: 2142890,
                lightskyblue: 8900346,
                lightslategray: 7833753,
                lightslategrey: 7833753,
                lightsteelblue: 11584734,
                lightyellow: 16777184,
                lime: 65280,
                limegreen: 3329330,
                linen: 16445670,
                magenta: 16711935,
                maroon: 8388608,
                mediumaquamarine: 6737322,
                mediumblue: 205,
                mediumorchid: 12211667,
                mediumpurple: 9662683,
                mediumseagreen: 3978097,
                mediumslateblue: 8087790,
                mediumspringgreen: 64154,
                mediumturquoise: 4772300,
                mediumvioletred: 13047173,
                midnightblue: 1644912,
                mintcream: 16121850,
                mistyrose: 16770273,
                moccasin: 16770229,
                navajowhite: 16768685,
                navy: 128,
                oldlace: 16643558,
                olive: 8421376,
                olivedrab: 7048739,
                orange: 16753920,
                orangered: 16729344,
                orchid: 14315734,
                palegoldenrod: 15657130,
                palegreen: 10025880,
                paleturquoise: 11529966,
                palevioletred: 14381203,
                papayawhip: 16773077,
                peachpuff: 16767673,
                peru: 13468991,
                pink: 16761035,
                plum: 14524637,
                powderblue: 11591910,
                purple: 8388736,
                red: 16711680,
                rosybrown: 12357519,
                royalblue: 4286945,
                saddlebrown: 9127187,
                salmon: 16416882,
                sandybrown: 16032864,
                seagreen: 3050327,
                seashell: 16774638,
                sienna: 10506797,
                silver: 12632256,
                skyblue: 8900331,
                slateblue: 6970061,
                slategray: 7372944,
                slategrey: 7372944,
                snow: 16775930,
                springgreen: 65407,
                steelblue: 4620980,
                tan: 13808780,
                teal: 32896,
                thistle: 14204888,
                tomato: 16737095,
                turquoise: 4251856,
                violet: 15631086,
                wheat: 16113331,
                white: 16777215,
                whitesmoke: 16119285,
                yellow: 16776960,
                yellowgreen: 10145074
            }, n.Quaternion = function (e, t, r, i) {
                this._x = e || 0, this._y = t || 0, this._z = r || 0, this._w = void 0 !== i ? i : 1
            }, n.Quaternion.prototype = {
                constructor: n.Quaternion,
                _x: 0,
                _y: 0,
                _z: 0,
                _w: 0,
                get x() {
                    return this._x
                },
                set x(e) {
                    this._x = e, this.onChangeCallback()
                },
                get y() {
                    return this._y
                },
                set y(e) {
                    this._y = e, this.onChangeCallback()
                },
                get z() {
                    return this._z
                },
                set z(e) {
                    this._z = e, this.onChangeCallback()
                },
                get w() {
                    return this._w
                },
                set w(e) {
                    this._w = e, this.onChangeCallback()
                },
                set: function (e, t, r, i) {
                    return this._x = e, this._y = t, this._z = r, this._w = i, this.onChangeCallback(), this
                },
                copy: function (e) {
                    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this.onChangeCallback(), this
                },
                setFromEuler: function (e, t) {
                    if (e instanceof n.Euler == !1) throw new Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                    var r = Math.cos(e._x / 2),
                        i = Math.cos(e._y / 2),
                        o = Math.cos(e._z / 2),
                        a = Math.sin(e._x / 2),
                        s = Math.sin(e._y / 2),
                        h = Math.sin(e._z / 2);
                    return "XYZ" === e.order ? (this._x = a * i * o + r * s * h, this._y = r * s * o - a * i * h, this._z = r * i * h + a * s * o, this._w = r * i * o - a * s * h) : "YXZ" === e.order ? (this._x = a * i * o + r * s * h, this._y = r * s * o - a * i * h, this._z = r * i * h - a * s * o, this._w = r * i * o + a * s * h) : "ZXY" === e.order ? (this._x = a * i * o - r * s * h, this._y = r * s * o + a * i * h, this._z = r * i * h + a * s * o, this._w = r * i * o - a * s * h) : "ZYX" === e.order ? (this._x = a * i * o - r * s * h, this._y = r * s * o + a * i * h, this._z = r * i * h - a * s * o, this._w = r * i * o + a * s * h) : "YZX" === e.order ? (this._x = a * i * o + r * s * h, this._y = r * s * o + a * i * h, this._z = r * i * h - a * s * o, this._w = r * i * o - a * s * h) : "XZY" === e.order && (this._x = a * i * o - r * s * h, this._y = r * s * o - a * i * h, this._z = r * i * h + a * s * o, this._w = r * i * o + a * s * h), t !== !1 && this.onChangeCallback(), this
                },
                setFromAxisAngle: function (e, t) {
                    var r = t / 2,
                        i = Math.sin(r);
                    return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(r), this.onChangeCallback(), this
                },
                setFromRotationMatrix: function (e) {
                    var t, r = e.elements,
                        i = r[0],
                        n = r[4],
                        o = r[8],
                        a = r[1],
                        s = r[5],
                        h = r[9],
                        l = r[2],
                        c = r[6],
                        u = r[10],
                        d = i + s + u;
                    return d > 0 ? (t = .5 / Math.sqrt(d + 1), this._w = .25 / t, this._x = (c - h) * t, this._y = (o - l) * t, this._z = (a - n) * t) : i > s && i > u ? (t = 2 * Math.sqrt(1 + i - s - u), this._w = (c - h) / t, this._x = .25 * t, this._y = (n + a) / t, this._z = (o + l) / t) : s > u ? (t = 2 * Math.sqrt(1 + s - i - u), this._w = (o - l) / t, this._x = (n + a) / t, this._y = .25 * t, this._z = (h + c) / t) : (t = 2 * Math.sqrt(1 + u - i - s), this._w = (a - n) / t, this._x = (o + l) / t, this._y = (h + c) / t, this._z = .25 * t), this.onChangeCallback(), this
                },
                setFromUnitVectors: function () {
                    var e, t, r = 1e-6;
                    return function (i, o) {
                        return void 0 === e && (e = new n.Vector3), t = i.dot(o) + 1, r > t ? (t = 0, Math.abs(i.x) > Math.abs(i.z) ? e.set(-i.y, i.x, 0) : e.set(0, -i.z, i.y)) : e.crossVectors(i, o), this._x = e.x, this._y = e.y, this._z = e.z, this._w = t, this.normalize(), this
                    }
                }(),
                inverse: function () {
                    return this.conjugate().normalize(), this
                },
                conjugate: function () {
                    return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this
                },
                dot: function (e) {
                    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
                },
                lengthSq: function () {
                    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
                },
                length: function () {
                    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
                },
                normalize: function () {
                    var e = this.length();
                    return 0 === e ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this.onChangeCallback(), this
                },
                multiply: function (e, t) {
                    return void 0 !== t ? (n.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(e, t)) : this.multiplyQuaternions(this, e)
                },
                multiplyQuaternions: function (e, t) {
                    var r = e._x,
                        i = e._y,
                        n = e._z,
                        o = e._w,
                        a = t._x,
                        s = t._y,
                        h = t._z,
                        l = t._w;
                    return this._x = r * l + o * a + i * h - n * s, this._y = i * l + o * s + n * a - r * h, this._z = n * l + o * h + r * s - i * a, this._w = o * l - r * a - i * s - n * h, this.onChangeCallback(), this
                },
                multiplyVector3: function (e) {
                    return n.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), e.applyQuaternion(this)
                },
                slerp: function (e, t) {
                    if (0 === t) return this;
                    if (1 === t) return this.copy(e);
                    var r = this._x,
                        i = this._y,
                        n = this._z,
                        o = this._w,
                        a = o * e._w + r * e._x + i * e._y + n * e._z;
                    if (0 > a ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, a = -a) : this.copy(e), a >= 1) return this._w = o, this._x = r, this._y = i, this._z = n, this;
                    var s = Math.acos(a),
                        h = Math.sqrt(1 - a * a);
                    if (Math.abs(h) < .001) return this._w = .5 * (o + this._w), this._x = .5 * (r + this._x), this._y = .5 * (i + this._y), this._z = .5 * (n + this._z), this;
                    var l = Math.sin((1 - t) * s) / h,
                        c = Math.sin(t * s) / h;
                    return this._w = o * l + this._w * c, this._x = r * l + this._x * c, this._y = i * l + this._y * c, this._z = n * l + this._z * c, this.onChangeCallback(), this
                },
                equals: function (e) {
                    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
                },
                fromArray: function (e, t) {
                    return void 0 === t && (t = 0), this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this.onChangeCallback(), this
                },
                toArray: function (e, t) {
                    return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e
                },
                onChange: function (e) {
                    return this.onChangeCallback = e, this
                },
                onChangeCallback: function () {},
                clone: function () {
                    return new n.Quaternion(this._x, this._y, this._z, this._w)
                }
            }, n.Quaternion.slerp = function (e, t, r, i) {
                return r.copy(e).slerp(t, i)
            }, n.Vector2 = function (e, t) {
                this.x = e || 0, this.y = t || 0
            }, n.Vector2.prototype = {
                constructor: n.Vector2,
                set: function (e, t) {
                    return this.x = e, this.y = t, this
                },
                setX: function (e) {
                    return this.x = e, this
                },
                setY: function (e) {
                    return this.y = e, this
                },
                setComponent: function (e, t) {
                    switch (e) {
                        case 0:
                            this.x = t;
                            break;
                        case 1:
                            this.y = t;
                            break;
                        default:
                            throw new Error("index is out of range: " + e)
                    }
                },
                getComponent: function (e) {
                    switch (e) {
                        case 0:
                            return this.x;
                        case 1:
                            return this.y;
                        default:
                            throw new Error("index is out of range: " + e)
                    }
                },
                copy: function (e) {
                    return this.x = e.x, this.y = e.y, this
                },
                add: function (e, t) {
                    return void 0 !== t ? (n.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this)
                },
                addScalar: function (e) {
                    return this.x += e, this.y += e, this
                },
                addVectors: function (e, t) {
                    return this.x = e.x + t.x, this.y = e.y + t.y, this
                },
                sub: function (e, t) {
                    return void 0 !== t ? (n.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this)
                },
                subScalar: function (e) {
                    return this.x -= e, this.y -= e, this
                },
                subVectors: function (e, t) {
                    return this.x = e.x - t.x, this.y = e.y - t.y, this
                },
                multiply: function (e) {
                    return this.x *= e.x, this.y *= e.y, this
                },
                multiplyScalar: function (e) {
                    return this.x *= e, this.y *= e, this
                },
                divide: function (e) {
                    return this.x /= e.x, this.y /= e.y, this
                },
                divideScalar: function (e) {
                    if (0 !== e) {
                        var t = 1 / e;
                        this.x *= t, this.y *= t
                    } else this.x = 0, this.y = 0;
                    return this
                },
                min: function (e) {
                    return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this
                },
                max: function (e) {
                    return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this
                },
                clamp: function (e, t) {
                    return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this
                },
                clampScalar: function () {
                    var e, t;
                    return function (r, i) {
                        return void 0 === e && (e = new n.Vector2, t = new n.Vector2), e.set(r, r), t.set(i, i), this.clamp(e, t)
                    }
                }(),
                floor: function () {
                    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
                },
                ceil: function () {
                    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
                },
                round: function () {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this
                },
                roundToZero: function () {
                    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
                },
                negate: function () {
                    return this.x = -this.x, this.y = -this.y, this
                },
                dot: function (e) {
                    return this.x * e.x + this.y * e.y
                },
                lengthSq: function () {
                    return this.x * this.x + this.y * this.y
                },
                length: function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y)
                },
                normalize: function () {
                    return this.divideScalar(this.length())
                },
                distanceTo: function (e) {
                    return Math.sqrt(this.distanceToSquared(e))
                },
                distanceToSquared: function (e) {
                    var t = this.x - e.x,
                        r = this.y - e.y;
                    return t * t + r * r
                },
                setLength: function (e) {
                    var t = this.length();
                    return 0 !== t && e !== t && this.multiplyScalar(e / t), this
                },
                lerp: function (e, t) {
                    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this
                },
                lerpVectors: function (e, t, r) {
                    return this.subVectors(t, e).multiplyScalar(r).add(e), this
                },
                equals: function (e) {
                    return e.x === this.x && e.y === this.y
                },
                fromArray: function (e, t) {
                    return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this
                },
                toArray: function (e, t) {
                    return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e
                },
                fromAttribute: function (e, t, r) {
                    return void 0 === r && (r = 0), t = t * e.itemSize + r, this.x = e.array[t], this.y = e.array[t + 1], this
                },
                clone: function () {
                    return new n.Vector2(this.x, this.y)
                }
            }, n.Vector3 = function (e, t, r) {
                this.x = e || 0, this.y = t || 0, this.z = r || 0
            }, n.Vector3.prototype = {
                constructor: n.Vector3,
                set: function (e, t, r) {
                    return this.x = e, this.y = t, this.z = r, this
                },
                setX: function (e) {
                    return this.x = e, this
                },
                setY: function (e) {
                    return this.y = e, this
                },
                setZ: function (e) {
                    return this.z = e, this
                },
                setComponent: function (e, t) {
                    switch (e) {
                        case 0:
                            this.x = t;
                            break;
                        case 1:
                            this.y = t;
                            break;
                        case 2:
                            this.z = t;
                            break;
                        default:
                            throw new Error("index is out of range: " + e)
                    }
                },
                getComponent: function (e) {
                    switch (e) {
                        case 0:
                            return this.x;
                        case 1:
                            return this.y;
                        case 2:
                            return this.z;
                        default:
                            throw new Error("index is out of range: " + e)
                    }
                },
                copy: function (e) {
                    return this.x = e.x, this.y = e.y, this.z = e.z, this
                },
                add: function (e, t) {
                    return void 0 !== t ? (n.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this)
                },
                addScalar: function (e) {
                    return this.x += e, this.y += e, this.z += e, this
                },
                addVectors: function (e, t) {
                    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this
                },
                sub: function (e, t) {
                    return void 0 !== t ? (n.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this)
                },
                subScalar: function (e) {
                    return this.x -= e, this.y -= e, this.z -= e, this
                },
                subVectors: function (e, t) {
                    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this
                },
                multiply: function (e, t) {
                    return void 0 !== t ? (n.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(e, t)) : (this.x *= e.x, this.y *= e.y, this.z *= e.z, this)
                },
                multiplyScalar: function (e) {
                    return this.x *= e, this.y *= e, this.z *= e, this
                },
                multiplyVectors: function (e, t) {
                    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this
                },
                applyEuler: function () {
                    var e;
                    return function (t) {
                        return t instanceof n.Euler == !1 && n.error("THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order."), void 0 === e && (e = new n.Quaternion), this.applyQuaternion(e.setFromEuler(t)), this
                    }
                }(),
                applyAxisAngle: function () {
                    var e;
                    return function (t, r) {
                        return void 0 === e && (e = new n.Quaternion), this.applyQuaternion(e.setFromAxisAngle(t, r)), this
                    }
                }(),
                applyMatrix3: function (e) {
                    var t = this.x,
                        r = this.y,
                        i = this.z,
                        n = e.elements;
                    return this.x = n[0] * t + n[3] * r + n[6] * i, this.y = n[1] * t + n[4] * r + n[7] * i, this.z = n[2] * t + n[5] * r + n[8] * i, this
                },
                applyMatrix4: function (e) {
                    var t = this.x,
                        r = this.y,
                        i = this.z,
                        n = e.elements;
                    return this.x = n[0] * t + n[4] * r + n[8] * i + n[12], this.y = n[1] * t + n[5] * r + n[9] * i + n[13], this.z = n[2] * t + n[6] * r + n[10] * i + n[14], this
                },
                applyProjection: function (e) {
                    var t = this.x,
                        r = this.y,
                        i = this.z,
                        n = e.elements,
                        o = 1 / (n[3] * t + n[7] * r + n[11] * i + n[15]);
                    return this.x = (n[0] * t + n[4] * r + n[8] * i + n[12]) * o, this.y = (n[1] * t + n[5] * r + n[9] * i + n[13]) * o, this.z = (n[2] * t + n[6] * r + n[10] * i + n[14]) * o, this
                },
                applyQuaternion: function (e) {
                    var t = this.x,
                        r = this.y,
                        i = this.z,
                        n = e.x,
                        o = e.y,
                        a = e.z,
                        s = e.w,
                        h = s * t + o * i - a * r,
                        l = s * r + a * t - n * i,
                        c = s * i + n * r - o * t,
                        u = -n * t - o * r - a * i;
                    return this.x = h * s + u * -n + l * -a - c * -o, this.y = l * s + u * -o + c * -n - h * -a, this.z = c * s + u * -a + h * -o - l * -n, this
                },
                project: function () {
                    var e;
                    return function (t) {
                        return void 0 === e && (e = new n.Matrix4), e.multiplyMatrices(t.projectionMatrix, e.getInverse(t.matrixWorld)), this.applyProjection(e)
                    }
                }(),
                unproject: function () {
                    var e;
                    return function (t) {
                        return void 0 === e && (e = new n.Matrix4), e.multiplyMatrices(t.matrixWorld, e.getInverse(t.projectionMatrix)), this.applyProjection(e)
                    }
                }(),
                transformDirection: function (e) {
                    var t = this.x,
                        r = this.y,
                        i = this.z,
                        n = e.elements;
                    return this.x = n[0] * t + n[4] * r + n[8] * i, this.y = n[1] * t + n[5] * r + n[9] * i, this.z = n[2] * t + n[6] * r + n[10] * i, this.normalize(), this
                },
                divide: function (e) {
                    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this
                },
                divideScalar: function (e) {
                    if (0 !== e) {
                        var t = 1 / e;
                        this.x *= t, this.y *= t, this.z *= t
                    } else this.x = 0, this.y = 0, this.z = 0;
                    return this
                },
                min: function (e) {
                    return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this.z > e.z && (this.z = e.z), this
                },
                max: function (e) {
                    return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this.z < e.z && (this.z = e.z), this
                },
                clamp: function (e, t) {
                    return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this.z < e.z ? this.z = e.z : this.z > t.z && (this.z = t.z), this
                },
                clampScalar: function () {
                    var e, t;
                    return function (r, i) {
                        return void 0 === e && (e = new n.Vector3, t = new n.Vector3), e.set(r, r, r), t.set(i, i, i), this.clamp(e, t)
                    }
                }(),
                floor: function () {
                    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
                },
                ceil: function () {
                    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
                },
                round: function () {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
                },
                roundToZero: function () {
                    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
                },
                negate: function () {
                    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
                },
                dot: function (e) {
                    return this.x * e.x + this.y * e.y + this.z * e.z
                },
                lengthSq: function () {
                    return this.x * this.x + this.y * this.y + this.z * this.z
                },
                length: function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
                },
                lengthManhattan: function () {
                    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
                },
                normalize: function () {
                    return this.divideScalar(this.length())
                },
                setLength: function (e) {
                    var t = this.length();
                    return 0 !== t && e !== t && this.multiplyScalar(e / t), this
                },
                lerp: function (e, t) {
                    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this
                },
                lerpVectors: function (e, t, r) {
                    return this.subVectors(t, e).multiplyScalar(r).add(e), this
                },
                cross: function (e, t) {
                    if (void 0 !== t) return n.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(e, t);
                    var r = this.x,
                        i = this.y,
                        o = this.z;
                    return this.x = i * e.z - o * e.y, this.y = o * e.x - r * e.z, this.z = r * e.y - i * e.x, this
                },
                crossVectors: function (e, t) {
                    var r = e.x,
                        i = e.y,
                        n = e.z,
                        o = t.x,
                        a = t.y,
                        s = t.z;
                    return this.x = i * s - n * a, this.y = n * o - r * s, this.z = r * a - i * o, this
                },
                projectOnVector: function () {
                    var e, t;
                    return function (r) {
                        return void 0 === e && (e = new n.Vector3), e.copy(r).normalize(), t = this.dot(e), this.copy(e).multiplyScalar(t)
                    }
                }(),
                projectOnPlane: function () {
                    var e;
                    return function (t) {
                        return void 0 === e && (e = new n.Vector3), e.copy(this).projectOnVector(t), this.sub(e)
                    }
                }(),
                reflect: function () {
                    var e;
                    return function (t) {
                        return void 0 === e && (e = new n.Vector3), this.sub(e.copy(t).multiplyScalar(2 * this.dot(t)))
                    }
                }(),
                angleTo: function (e) {
                    var t = this.dot(e) / (this.length() * e.length());
                    return Math.acos(n.Math.clamp(t, -1, 1))
                },
                distanceTo: function (e) {
                    return Math.sqrt(this.distanceToSquared(e))
                },
                distanceToSquared: function (e) {
                    var t = this.x - e.x,
                        r = this.y - e.y,
                        i = this.z - e.z;
                    return t * t + r * r + i * i
                },
                setEulerFromRotationMatrix: function () {
                    n.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
                },
                setEulerFromQuaternion: function () {
                    n.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
                },
                getPositionFromMatrix: function (e) {
                    return n.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(e)
                },
                getScaleFromMatrix: function (e) {
                    return n.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(e)
                },
                getColumnFromMatrix: function (e, t) {
                    return n.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(e, t)
                },
                setFromMatrixPosition: function (e) {
                    return this.x = e.elements[12], this.y = e.elements[13], this.z = e.elements[14], this
                },
                setFromMatrixScale: function (e) {
                    var t = this.set(e.elements[0], e.elements[1], e.elements[2]).length(),
                        r = this.set(e.elements[4], e.elements[5], e.elements[6]).length(),
                        i = this.set(e.elements[8], e.elements[9], e.elements[10]).length();
                    return this.x = t, this.y = r, this.z = i, this
                },
                setFromMatrixColumn: function (e, t) {
                    var r = 4 * e,
                        i = t.elements;
                    return this.x = i[r], this.y = i[r + 1], this.z = i[r + 2], this
                },
                equals: function (e) {
                    return e.x === this.x && e.y === this.y && e.z === this.z
                },
                fromArray: function (e, t) {
                    return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this
                },
                toArray: function (e, t) {
                    return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e
                },
                fromAttribute: function (e, t, r) {
                    return void 0 === r && (r = 0), t = t * e.itemSize + r, this.x = e.array[t], this.y = e.array[t + 1], this.z = e.array[t + 2], this
                },
                clone: function () {
                    return new n.Vector3(this.x, this.y, this.z)
                }
            }, n.Vector4 = function (e, t, r, i) {
                this.x = e || 0, this.y = t || 0, this.z = r || 0, this.w = void 0 !== i ? i : 1
            }, n.Vector4.prototype = {
                constructor: n.Vector4,
                set: function (e, t, r, i) {
                    return this.x = e, this.y = t, this.z = r, this.w = i, this
                },
                setX: function (e) {
                    return this.x = e, this
                },
                setY: function (e) {
                    return this.y = e, this
                },
                setZ: function (e) {
                    return this.z = e, this
                },
                setW: function (e) {
                    return this.w = e, this
                },
                setComponent: function (e, t) {
                    switch (e) {
                        case 0:
                            this.x = t;
                            break;
                        case 1:
                            this.y = t;
                            break;
                        case 2:
                            this.z = t;
                            break;
                        case 3:
                            this.w = t;
                            break;
                        default:
                            throw new Error("index is out of range: " + e)
                    }
                },
                getComponent: function (e) {
                    switch (e) {
                        case 0:
                            return this.x;
                        case 1:
                            return this.y;
                        case 2:
                            return this.z;
                        case 3:
                            return this.w;
                        default:
                            throw new Error("index is out of range: " + e)
                    }
                },
                copy: function (e) {
                    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = void 0 !== e.w ? e.w : 1, this
                },
                add: function (e, t) {
                    return void 0 !== t ? (n.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this)
                },
                addScalar: function (e) {
                    return this.x += e, this.y += e, this.z += e, this.w += e, this
                },
                addVectors: function (e, t) {
                    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this
                },
                sub: function (e, t) {
                    return void 0 !== t ? (n.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this)
                },
                subScalar: function (e) {
                    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this
                },
                subVectors: function (e, t) {
                    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this
                },
                multiplyScalar: function (e) {
                    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this
                },
                applyMatrix4: function (e) {
                    var t = this.x,
                        r = this.y,
                        i = this.z,
                        n = this.w,
                        o = e.elements;
                    return this.x = o[0] * t + o[4] * r + o[8] * i + o[12] * n, this.y = o[1] * t + o[5] * r + o[9] * i + o[13] * n, this.z = o[2] * t + o[6] * r + o[10] * i + o[14] * n, this.w = o[3] * t + o[7] * r + o[11] * i + o[15] * n, this
                },
                divideScalar: function (e) {
                    if (0 !== e) {
                        var t = 1 / e;
                        this.x *= t, this.y *= t, this.z *= t, this.w *= t
                    } else this.x = 0, this.y = 0, this.z = 0, this.w = 1;
                    return this
                },
                setAxisAngleFromQuaternion: function (e) {
                    this.w = 2 * Math.acos(e.w);
                    var t = Math.sqrt(1 - e.w * e.w);
                    return 1e-4 > t ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this
                },
                setAxisAngleFromRotationMatrix: function (e) {
                    var t, r, i, n, o = .01,
                        a = .1,
                        s = e.elements,
                        h = s[0],
                        l = s[4],
                        c = s[8],
                        u = s[1],
                        d = s[5],
                        p = s[9],
                        f = s[2],
                        m = s[6],
                        g = s[10];
                    if (Math.abs(l - u) < o && Math.abs(c - f) < o && Math.abs(p - m) < o) {
                        if (Math.abs(l + u) < a && Math.abs(c + f) < a && Math.abs(p + m) < a && Math.abs(h + d + g - 3) < a) return this.set(1, 0, 0, 0), this;
                        t = Math.PI;
                        var v = (h + 1) / 2,
                            y = (d + 1) / 2,
                            x = (g + 1) / 2,
                            _ = (l + u) / 4,
                            b = (c + f) / 4,
                            w = (p + m) / 4;
                        return v > y && v > x ? o > v ? (r = 0, i = .707106781, n = .707106781) : (r = Math.sqrt(v), i = _ / r, n = b / r) : y > x ? o > y ? (r = .707106781, i = 0, n = .707106781) : (i = Math.sqrt(y), r = _ / i, n = w / i) : o > x ? (r = .707106781, i = .707106781, n = 0) : (n = Math.sqrt(x), r = b / n, i = w / n), this.set(r, i, n, t), this
                    }
                    var M = Math.sqrt((m - p) * (m - p) + (c - f) * (c - f) + (u - l) * (u - l));
                    return Math.abs(M) < .001 && (M = 1), this.x = (m - p) / M, this.y = (c - f) / M, this.z = (u - l) / M, this.w = Math.acos((h + d + g - 1) / 2), this
                },
                min: function (e) {
                    return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this.z > e.z && (this.z = e.z), this.w > e.w && (this.w = e.w), this
                },
                max: function (e) {
                    return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this.z < e.z && (this.z = e.z), this.w < e.w && (this.w = e.w), this
                },
                clamp: function (e, t) {
                    return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this.z < e.z ? this.z = e.z : this.z > t.z && (this.z = t.z), this.w < e.w ? this.w = e.w : this.w > t.w && (this.w = t.w), this
                },
                clampScalar: function () {
                    var e, t;
                    return function (r, i) {
                        return void 0 === e && (e = new n.Vector4, t = new n.Vector4), e.set(r, r, r, r), t.set(i, i, i, i), this.clamp(e, t)
                    }
                }(),
                floor: function () {
                    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
                },
                ceil: function () {
                    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
                },
                round: function () {
                    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
                },
                roundToZero: function () {
                    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this
                },
                negate: function () {
                    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
                },
                dot: function (e) {
                    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
                },
                lengthSq: function () {
                    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
                },
                length: function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
                },
                lengthManhattan: function () {
                    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
                },
                normalize: function () {
                    return this.divideScalar(this.length())
                },
                setLength: function (e) {
                    var t = this.length();
                    return 0 !== t && e !== t && this.multiplyScalar(e / t), this
                },
                lerp: function (e, t) {
                    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this
                },
                lerpVectors: function (e, t, r) {
                    return this.subVectors(t, e).multiplyScalar(r).add(e), this
                },
                equals: function (e) {
                    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
                },
                fromArray: function (e, t) {
                    return void 0 === t && (t = 0), this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this
                },
                toArray: function (e, t) {
                    return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e
                },
                fromAttribute: function (e, t, r) {
                    return void 0 === r && (r = 0), t = t * e.itemSize + r, this.x = e.array[t], this.y = e.array[t + 1], this.z = e.array[t + 2], this.w = e.array[t + 3], this
                },
                clone: function () {
                    return new n.Vector4(this.x, this.y, this.z, this.w)
                }
            }, n.Euler = function (e, t, r, i) {
                this._x = e || 0, this._y = t || 0, this._z = r || 0, this._order = i || n.Euler.DefaultOrder
            }, n.Euler.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"], n.Euler.DefaultOrder = "XYZ", n.Euler.prototype = {
                constructor: n.Euler,
                _x: 0,
                _y: 0,
                _z: 0,
                _order: n.Euler.DefaultOrder,
                get x() {
                    return this._x
                },
                set x(e) {
                    this._x = e, this.onChangeCallback()
                },
                get y() {
                    return this._y
                },
                set y(e) {
                    this._y = e, this.onChangeCallback()
                },
                get z() {
                    return this._z
                },
                set z(e) {
                    this._z = e, this.onChangeCallback()
                },
                get order() {
                    return this._order
                },
                set order(e) {
                    this._order = e, this.onChangeCallback()
                },
                set: function (e, t, r, i) {
                    return this._x = e, this._y = t, this._z = r, this._order = i || this._order, this.onChangeCallback(), this
                },
                copy: function (e) {
                    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this.onChangeCallback(), this
                },
                setFromRotationMatrix: function (e, t, r) {
                    var i = n.Math.clamp,
                        o = e.elements,
                        a = o[0],
                        s = o[4],
                        h = o[8],
                        l = o[1],
                        c = o[5],
                        u = o[9],
                        d = o[2],
                        p = o[6],
                        f = o[10];
                    return t = t || this._order, "XYZ" === t ? (this._y = Math.asin(i(h, -1, 1)), Math.abs(h) < .99999 ? (this._x = Math.atan2(-u, f), this._z = Math.atan2(-s, a)) : (this._x = Math.atan2(p, c), this._z = 0)) : "YXZ" === t ? (this._x = Math.asin(-i(u, -1, 1)), Math.abs(u) < .99999 ? (this._y = Math.atan2(h, f), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-d, a), this._z = 0)) : "ZXY" === t ? (this._x = Math.asin(i(p, -1, 1)), Math.abs(p) < .99999 ? (this._y = Math.atan2(-d, f), this._z = Math.atan2(-s, c)) : (this._y = 0, this._z = Math.atan2(l, a))) : "ZYX" === t ? (this._y = Math.asin(-i(d, -1, 1)), Math.abs(d) < .99999 ? (this._x = Math.atan2(p, f), this._z = Math.atan2(l, a)) : (this._x = 0, this._z = Math.atan2(-s, c))) : "YZX" === t ? (this._z = Math.asin(i(l, -1, 1)), Math.abs(l) < .99999 ? (this._x = Math.atan2(-u, c), this._y = Math.atan2(-d, a)) : (this._x = 0, this._y = Math.atan2(h, f))) : "XZY" === t ? (this._z = Math.asin(-i(s, -1, 1)), Math.abs(s) < .99999 ? (this._x = Math.atan2(p, c), this._y = Math.atan2(h, a)) : (this._x = Math.atan2(-u, f), this._y = 0)) : n.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + t), this._order = t, r !== !1 && this.onChangeCallback(), this
                },
                setFromQuaternion: function () {
                    var e;
                    return function (t, r, i) {
                        return void 0 === e && (e = new n.Matrix4), e.makeRotationFromQuaternion(t), this.setFromRotationMatrix(e, r, i), this
                    }
                }(),
                setFromVector3: function (e, t) {
                    return this.set(e.x, e.y, e.z, t || this._order)
                },
                reorder: function () {
                    var e = new n.Quaternion;
                    return function (t) {
                        e.setFromEuler(this), this.setFromQuaternion(e, t)
                    }
                }(),
                equals: function (e) {
                    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
                },
                fromArray: function (e) {
                    return this._x = e[0], this._y = e[1], this._z = e[2], void 0 !== e[3] && (this._order = e[3]), this.onChangeCallback(), this
                },
                toArray: function (e, t) {
                    return void 0 === e && (e = []), void 0 === t && (t = 0), e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e
                },
                toVector3: function (e) {
                    return e ? e.set(this._x, this._y, this._z) : new n.Vector3(this._x, this._y, this._z)
                },
                onChange: function (e) {
                    return this.onChangeCallback = e, this
                },
                onChangeCallback: function () {},
                clone: function () {
                    return new n.Euler(this._x, this._y, this._z, this._order)
                }
            }, n.Line3 = function (e, t) {
                this.start = void 0 !== e ? e : new n.Vector3, this.end = void 0 !== t ? t : new n.Vector3
            }, n.Line3.prototype = {
                constructor: n.Line3,
                set: function (e, t) {
                    return this.start.copy(e), this.end.copy(t), this
                },
                copy: function (e) {
                    return this.start.copy(e.start), this.end.copy(e.end), this
                },
                center: function (e) {
                    var t = e || new n.Vector3;
                    return t.addVectors(this.start, this.end).multiplyScalar(.5)
                },
                delta: function (e) {
                    var t = e || new n.Vector3;
                    return t.subVectors(this.end, this.start)
                },
                distanceSq: function () {
                    return this.start.distanceToSquared(this.end)
                },
                distance: function () {
                    return this.start.distanceTo(this.end)
                },
                at: function (e, t) {
                    var r = t || new n.Vector3;
                    return this.delta(r).multiplyScalar(e).add(this.start)
                },
                closestPointToPointParameter: function () {
                    var e = new n.Vector3,
                        t = new n.Vector3;
                    return function (r, i) {
                        e.subVectors(r, this.start), t.subVectors(this.end, this.start);
                        var o = t.dot(t),
                            a = t.dot(e),
                            s = a / o;
                        return i && (s = n.Math.clamp(s, 0, 1)), s
                    }
                }(),
                closestPointToPoint: function (e, t, r) {
                    var i = this.closestPointToPointParameter(e, t),
                        o = r || new n.Vector3;
                    return this.delta(o).multiplyScalar(i).add(this.start)
                },
                applyMatrix4: function (e) {
                    return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this
                },
                equals: function (e) {
                    return e.start.equals(this.start) && e.end.equals(this.end)
                },
                clone: function () {
                    return (new n.Line3).copy(this)
                }
            }, n.Box2 = function (e, t) {
                this.min = void 0 !== e ? e : new n.Vector2(1 / 0, 1 / 0), this.max = void 0 !== t ? t : new n.Vector2(-(1 / 0), -(1 / 0))
            }, n.Box2.prototype = {
                constructor: n.Box2,
                set: function (e, t) {
                    return this.min.copy(e), this.max.copy(t), this
                },
                setFromPoints: function (e) {
                    this.makeEmpty();
                    for (var t = 0, r = e.length; r > t; t++) this.expandByPoint(e[t]);
                    return this
                },
                setFromCenterAndSize: function () {
                    var e = new n.Vector2;
                    return function (t, r) {
                        var i = e.copy(r).multiplyScalar(.5);
                        return this.min.copy(t).sub(i), this.max.copy(t).add(i), this
                    }
                }(),
                copy: function (e) {
                    return this.min.copy(e.min), this.max.copy(e.max), this
                },
                makeEmpty: function () {
                    return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -(1 / 0), this
                },
                empty: function () {
                    return this.max.x < this.min.x || this.max.y < this.min.y
                },
                center: function (e) {
                    var t = e || new n.Vector2;
                    return t.addVectors(this.min, this.max).multiplyScalar(.5)
                },
                size: function (e) {
                    var t = e || new n.Vector2;
                    return t.subVectors(this.max, this.min)
                },
                expandByPoint: function (e) {
                    return this.min.min(e), this.max.max(e), this
                },
                expandByVector: function (e) {
                    return this.min.sub(e), this.max.add(e), this
                },
                expandByScalar: function (e) {
                    return this.min.addScalar(-e), this.max.addScalar(e), this
                },
                containsPoint: function (e) {
                    return e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y ? !1 : !0
                },
                containsBox: function (e) {
                    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y ? !0 : !1
                },
                getParameter: function (e, t) {
                    var r = t || new n.Vector2;
                    return r.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y))
                },
                isIntersectionBox: function (e) {
                    return e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y ? !1 : !0
                },
                clampPoint: function (e, t) {
                    var r = t || new n.Vector2;
                    return r.copy(e).clamp(this.min, this.max)
                },
                distanceToPoint: function () {
                    var e = new n.Vector2;
                    return function (t) {
                        var r = e.copy(t).clamp(this.min, this.max);
                        return r.sub(t).length()
                    }
                }(),
                intersect: function (e) {
                    return this.min.max(e.min), this.max.min(e.max), this
                },
                union: function (e) {
                    return this.min.min(e.min), this.max.max(e.max), this
                },
                translate: function (e) {
                    return this.min.add(e), this.max.add(e), this
                },
                equals: function (e) {
                    return e.min.equals(this.min) && e.max.equals(this.max)
                },
                clone: function () {
                    return (new n.Box2).copy(this)
                }
            }, n.Box3 = function (e, t) {
                this.min = void 0 !== e ? e : new n.Vector3(1 / 0, 1 / 0, 1 / 0), this.max = void 0 !== t ? t : new n.Vector3(-(1 / 0), -(1 / 0), -(1 / 0))
            }, n.Box3.prototype = {
                constructor: n.Box3,
                set: function (e, t) {
                    return this.min.copy(e), this.max.copy(t), this
                },
                setFromPoints: function (e) {
                    this.makeEmpty();
                    for (var t = 0, r = e.length; r > t; t++) this.expandByPoint(e[t]);
                    return this
                },
                setFromCenterAndSize: function () {
                    var e = new n.Vector3;
                    return function (t, r) {
                        var i = e.copy(r).multiplyScalar(.5);
                        return this.min.copy(t).sub(i), this.max.copy(t).add(i), this
                    }
                }(),
                setFromObject: function () {
                    var e = new n.Vector3;
                    return function (t) {
                        var r = this;
                        return t.updateMatrixWorld(!0), this.makeEmpty(), t.traverse(function (t) {
                            var i = t.geometry;
                            if (void 0 !== i)
                                if (i instanceof n.Geometry)
                                    for (var o = i.vertices, a = 0, s = o.length; s > a; a++) e.copy(o[a]), e.applyMatrix4(t.matrixWorld), r.expandByPoint(e);
                                else if (i instanceof n.BufferGeometry && void 0 !== i.attributes.position)
                                for (var h = i.attributes.position.array, a = 0, s = h.length; s > a; a += 3) e.set(h[a], h[a + 1], h[a + 2]), e.applyMatrix4(t.matrixWorld), r.expandByPoint(e)
                        }), this
                    }
                }(),
                copy: function (e) {
                    return this.min.copy(e.min), this.max.copy(e.max), this
                },
                makeEmpty: function () {
                    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -(1 / 0), this
                },
                empty: function () {
                    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
                },
                center: function (e) {
                    var t = e || new n.Vector3;
                    return t.addVectors(this.min, this.max).multiplyScalar(.5)
                },
                size: function (e) {
                    var t = e || new n.Vector3;
                    return t.subVectors(this.max, this.min)
                },
                expandByPoint: function (e) {
                    return this.min.min(e), this.max.max(e), this
                },
                expandByVector: function (e) {
                    return this.min.sub(e), this.max.add(e), this
                },
                expandByScalar: function (e) {
                    return this.min.addScalar(-e), this.max.addScalar(e), this
                },
                containsPoint: function (e) {
                    return e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z ? !1 : !0
                },
                containsBox: function (e) {
                    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z ? !0 : !1
                },
                getParameter: function (e, t) {
                    var r = t || new n.Vector3;
                    return r.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
                },
                isIntersectionBox: function (e) {
                    return e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z ? !1 : !0
                },
                clampPoint: function (e, t) {
                    var r = t || new n.Vector3;
                    return r.copy(e).clamp(this.min, this.max)
                },
                distanceToPoint: function () {
                    var e = new n.Vector3;
                    return function (t) {
                        var r = e.copy(t).clamp(this.min, this.max);
                        return r.sub(t).length()
                    }
                }(),
                getBoundingSphere: function () {
                    var e = new n.Vector3;
                    return function (t) {
                        var r = t || new n.Sphere;
                        return r.center = this.center(), r.radius = .5 * this.size(e).length(), r
                    }
                }(),
                intersect: function (e) {
                    return this.min.max(e.min), this.max.min(e.max), this
                },
                union: function (e) {
                    return this.min.min(e.min), this.max.max(e.max), this
                },
                applyMatrix4: function () {
                    var e = [new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3, new n.Vector3];
                    return function (t) {
                        return e[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), e[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), e[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), e[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), e[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), e[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), e[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), e[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.makeEmpty(), this.setFromPoints(e), this
                    }
                }(),
                translate: function (e) {
                    return this.min.add(e), this.max.add(e), this
                },
                equals: function (e) {
                    return e.min.equals(this.min) && e.max.equals(this.max)
                },
                clone: function () {
                    return (new n.Box3).copy(this)
                }
            }, n.Matrix3 = function () {
                this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]), arguments.length > 0 && n.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
            }, n.Matrix3.prototype = {
                constructor: n.Matrix3,
                set: function (e, t, r, i, n, o, a, s, h) {
                    var l = this.elements;
                    return l[0] = e, l[3] = t, l[6] = r, l[1] = i, l[4] = n, l[7] = o, l[2] = a, l[5] = s, l[8] = h, this
                },
                identity: function () {
                    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
                },
                copy: function (e) {
                    var t = e.elements;
                    return this.set(t[0], t[3], t[6], t[1], t[4], t[7], t[2], t[5], t[8]), this
                },
                multiplyVector3: function (e) {
                    return n.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), e.applyMatrix3(this)
                },
                multiplyVector3Array: function (e) {
                    return n.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(e)
                },
                applyToVector3Array: function () {
                    var e = new n.Vector3;
                    return function (t, r, i) {
                        void 0 === r && (r = 0), void 0 === i && (i = t.length);
                        for (var n = 0, o = r; i > n; n += 3, o += 3) e.x = t[o], e.y = t[o + 1], e.z = t[o + 2], e.applyMatrix3(this), t[o] = e.x, t[o + 1] = e.y, t[o + 2] = e.z;
                        return t
                    }
                }(),
                multiplyScalar: function (e) {
                    var t = this.elements;
                    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this
                },
                determinant: function () {
                    var e = this.elements,
                        t = e[0],
                        r = e[1],
                        i = e[2],
                        n = e[3],
                        o = e[4],
                        a = e[5],
                        s = e[6],
                        h = e[7],
                        l = e[8];
                    return t * o * l - t * a * h - r * n * l + r * a * s + i * n * h - i * o * s
                },
                getInverse: function (e, t) {
                    var r = e.elements,
                        i = this.elements;
                    i[0] = r[10] * r[5] - r[6] * r[9], i[1] = -r[10] * r[1] + r[2] * r[9], i[2] = r[6] * r[1] - r[2] * r[5], i[3] = -r[10] * r[4] + r[6] * r[8], i[4] = r[10] * r[0] - r[2] * r[8], i[5] = -r[6] * r[0] + r[2] * r[4], i[6] = r[9] * r[4] - r[5] * r[8], i[7] = -r[9] * r[0] + r[1] * r[8], i[8] = r[5] * r[0] - r[1] * r[4];
                    var o = r[0] * i[0] + r[1] * i[3] + r[2] * i[6];
                    if (0 === o) {
                        var a = "Matrix3.getInverse(): can't invert matrix, determinant is 0";
                        if (t) throw new Error(a);
                        return n.warn(a), this.identity(), this
                    }
                    return this.multiplyScalar(1 / o), this
                },
                transpose: function () {
                    var e, t = this.elements;
                    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this
                },
                flattenToArrayOffset: function (e, t) {
                    var r = this.elements;
                    return e[t] = r[0], e[t + 1] = r[1], e[t + 2] = r[2], e[t + 3] = r[3], e[t + 4] = r[4], e[t + 5] = r[5], e[t + 6] = r[6], e[t + 7] = r[7], e[t + 8] = r[8], e
                },
                getNormalMatrix: function (e) {
                    return this.getInverse(e).transpose(), this
                },
                transposeIntoArray: function (e) {
                    var t = this.elements;
                    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this
                },
                fromArray: function (e) {
                    return this.elements.set(e), this
                },
                toArray: function () {
                    var e = this.elements;
                    return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]]
                },
                clone: function () {
                    return (new n.Matrix3).fromArray(this.elements)
                }
            }, n.Matrix4 = function () {
                this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]), arguments.length > 0 && n.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
            }, n.Matrix4.prototype = {
                constructor: n.Matrix4,
                set: function (e, t, r, i, n, o, a, s, h, l, c, u, d, p, f, m) {
                    var g = this.elements;
                    return g[0] = e, g[4] = t, g[8] = r, g[12] = i, g[1] = n, g[5] = o, g[9] = a, g[13] = s, g[2] = h, g[6] = l, g[10] = c, g[14] = u, g[3] = d, g[7] = p, g[11] = f, g[15] = m, this
                },
                identity: function () {
                    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
                },
                copy: function (e) {
                    return this.elements.set(e.elements), this
                },
                extractPosition: function (e) {
                    return n.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(e)
                },
                copyPosition: function (e) {
                    var t = this.elements,
                        r = e.elements;
                    return t[12] = r[12], t[13] = r[13], t[14] = r[14], this
                },
                extractBasis: function (e, t, r) {
                    var i = this.elements;
                    return e.set(i[0], i[1], i[2]), t.set(i[4], i[5], i[6]), r.set(i[8], i[9], i[10]), this
                },
                makeBasis: function (e, t, r) {
                    return this.set(e.x, t.x, r.x, 0, e.y, t.y, r.y, 0, e.z, t.z, r.z, 0, 0, 0, 0, 1), this
                },
                extractRotation: function () {
                    var e = new n.Vector3;
                    return function (t) {
                        var r = this.elements,
                            i = t.elements,
                            n = 1 / e.set(i[0], i[1], i[2]).length(),
                            o = 1 / e.set(i[4], i[5], i[6]).length(),
                            a = 1 / e.set(i[8], i[9], i[10]).length();
                        return r[0] = i[0] * n, r[1] = i[1] * n, r[2] = i[2] * n, r[4] = i[4] * o, r[5] = i[5] * o, r[6] = i[6] * o, r[8] = i[8] * a, r[9] = i[9] * a, r[10] = i[10] * a, this
                    }
                }(),
                makeRotationFromEuler: function (e) {
                    e instanceof n.Euler == !1 && n.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                    var t = this.elements,
                        r = e.x,
                        i = e.y,
                        o = e.z,
                        a = Math.cos(r),
                        s = Math.sin(r),
                        h = Math.cos(i),
                        l = Math.sin(i),
                        c = Math.cos(o),
                        u = Math.sin(o);
                    if ("XYZ" === e.order) {
                        var d = a * c,
                            p = a * u,
                            f = s * c,
                            m = s * u;
                        t[0] = h * c, t[4] = -h * u, t[8] = l, t[1] = p + f * l, t[5] = d - m * l, t[9] = -s * h, t[2] = m - d * l, t[6] = f + p * l, t[10] = a * h
                    } else if ("YXZ" === e.order) {
                        var g = h * c,
                            v = h * u,
                            y = l * c,
                            x = l * u;
                        t[0] = g + x * s, t[4] = y * s - v, t[8] = a * l, t[1] = a * u, t[5] = a * c, t[9] = -s, t[2] = v * s - y, t[6] = x + g * s, t[10] = a * h
                    } else if ("ZXY" === e.order) {
                        var g = h * c,
                            v = h * u,
                            y = l * c,
                            x = l * u;
                        t[0] = g - x * s, t[4] = -a * u, t[8] = y + v * s, t[1] = v + y * s, t[5] = a * c, t[9] = x - g * s, t[2] = -a * l, t[6] = s, t[10] = a * h
                    } else if ("ZYX" === e.order) {
                        var d = a * c,
                            p = a * u,
                            f = s * c,
                            m = s * u;
                        t[0] = h * c, t[4] = f * l - p, t[8] = d * l + m, t[1] = h * u, t[5] = m * l + d, t[9] = p * l - f, t[2] = -l, t[6] = s * h, t[10] = a * h
                    } else if ("YZX" === e.order) {
                        var _ = a * h,
                            b = a * l,
                            w = s * h,
                            M = s * l;
                        t[0] = h * c, t[4] = M - _ * u, t[8] = w * u + b, t[1] = u, t[5] = a * c, t[9] = -s * c, t[2] = -l * c, t[6] = b * u + w, t[10] = _ - M * u
                    } else if ("XZY" === e.order) {
                        var _ = a * h,
                            b = a * l,
                            w = s * h,
                            M = s * l;
                        t[0] = h * c, t[4] = -u, t[8] = l * c, t[1] = _ * u + M, t[5] = a * c, t[9] = b * u - w, t[2] = w * u - b, t[6] = s * c, t[10] = M * u + _
                    }
                    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
                },
                setRotationFromQuaternion: function (e) {
                    return n.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(e)
                },
                makeRotationFromQuaternion: function (e) {
                    var t = this.elements,
                        r = e.x,
                        i = e.y,
                        n = e.z,
                        o = e.w,
                        a = r + r,
                        s = i + i,
                        h = n + n,
                        l = r * a,
                        c = r * s,
                        u = r * h,
                        d = i * s,
                        p = i * h,
                        f = n * h,
                        m = o * a,
                        g = o * s,
                        v = o * h;
                    return t[0] = 1 - (d + f), t[4] = c - v, t[8] = u + g, t[1] = c + v, t[5] = 1 - (l + f), t[9] = p - m, t[2] = u - g, t[6] = p + m, t[10] = 1 - (l + d), t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
                },
                lookAt: function () {
                    var e = new n.Vector3,
                        t = new n.Vector3,
                        r = new n.Vector3;
                    return function (i, n, o) {
                        var a = this.elements;
                        return r.subVectors(i, n).normalize(), 0 === r.length() && (r.z = 1), e.crossVectors(o, r).normalize(), 0 === e.length() && (r.x += 1e-4, e.crossVectors(o, r).normalize()), t.crossVectors(r, e), a[0] = e.x, a[4] = t.x, a[8] = r.x, a[1] = e.y, a[5] = t.y, a[9] = r.y, a[2] = e.z, a[6] = t.z, a[10] = r.z, this
                    }
                }(),
                multiply: function (e, t) {
                    return void 0 !== t ? (n.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(e, t)) : this.multiplyMatrices(this, e)
                },
                multiplyMatrices: function (e, t) {
                    var r = e.elements,
                        i = t.elements,
                        n = this.elements,
                        o = r[0],
                        a = r[4],
                        s = r[8],
                        h = r[12],
                        l = r[1],
                        c = r[5],
                        u = r[9],
                        d = r[13],
                        p = r[2],
                        f = r[6],
                        m = r[10],
                        g = r[14],
                        v = r[3],
                        y = r[7],
                        x = r[11],
                        _ = r[15],
                        b = i[0],
                        w = i[4],
                        M = i[8],
                        S = i[12],
                        E = i[1],
                        T = i[5],
                        A = i[9],
                        C = i[13],
                        L = i[2],
                        R = i[6],
                        P = i[10],
                        F = i[14],
                        B = i[3],
                        D = i[7],
                        U = i[11],
                        k = i[15];
                    return n[0] = o * b + a * E + s * L + h * B, n[4] = o * w + a * T + s * R + h * D, n[8] = o * M + a * A + s * P + h * U, n[12] = o * S + a * C + s * F + h * k, n[1] = l * b + c * E + u * L + d * B, n[5] = l * w + c * T + u * R + d * D, n[9] = l * M + c * A + u * P + d * U, n[13] = l * S + c * C + u * F + d * k, n[2] = p * b + f * E + m * L + g * B, n[6] = p * w + f * T + m * R + g * D, n[10] = p * M + f * A + m * P + g * U, n[14] = p * S + f * C + m * F + g * k, n[3] = v * b + y * E + x * L + _ * B, n[7] = v * w + y * T + x * R + _ * D, n[11] = v * M + y * A + x * P + _ * U, n[15] = v * S + y * C + x * F + _ * k, this
                },
                multiplyToArray: function (e, t, r) {
                    var i = this.elements;
                    return this.multiplyMatrices(e, t), r[0] = i[0], r[1] = i[1], r[2] = i[2], r[3] = i[3], r[4] = i[4], r[5] = i[5], r[6] = i[6], r[7] = i[7], r[8] = i[8], r[9] = i[9], r[10] = i[10], r[11] = i[11], r[12] = i[12], r[13] = i[13], r[14] = i[14], r[15] = i[15], this
                },
                multiplyScalar: function (e) {
                    var t = this.elements;
                    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this
                },
                multiplyVector3: function (e) {
                    return n.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."), e.applyProjection(this)
                },
                multiplyVector4: function (e) {
                    return n.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
                },
                multiplyVector3Array: function (e) {
                    return n.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(e)
                },
                applyToVector3Array: function () {
                    var e = new n.Vector3;
                    return function (t, r, i) {
                        void 0 === r && (r = 0), void 0 === i && (i = t.length);
                        for (var n = 0, o = r; i > n; n += 3, o += 3) e.x = t[o], e.y = t[o + 1], e.z = t[o + 2], e.applyMatrix4(this), t[o] = e.x, t[o + 1] = e.y, t[o + 2] = e.z;
                        return t
                    }
                }(),
                rotateAxis: function (e) {
                    n.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), e.transformDirection(this)
                },
                crossVector: function (e) {
                    return n.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
                },
                determinant: function () {
                    var e = this.elements,
                        t = e[0],
                        r = e[4],
                        i = e[8],
                        n = e[12],
                        o = e[1],
                        a = e[5],
                        s = e[9],
                        h = e[13],
                        l = e[2],
                        c = e[6],
                        u = e[10],
                        d = e[14],
                        p = e[3],
                        f = e[7],
                        m = e[11],
                        g = e[15];
                    return p * (+n * s * c - i * h * c - n * a * u + r * h * u + i * a * d - r * s * d) + f * (+t * s * d - t * h * u + n * o * u - i * o * d + i * h * l - n * s * l) + m * (+t * h * c - t * a * d - n * o * c + r * o * d + n * a * l - r * h * l) + g * (-i * a * l - t * s * c + t * a * u + i * o * c - r * o * u + r * s * l)
                },
                transpose: function () {
                    var e, t = this.elements;
                    return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this
                },
                flattenToArrayOffset: function (e, t) {
                    var r = this.elements;
                    return e[t] = r[0], e[t + 1] = r[1], e[t + 2] = r[2], e[t + 3] = r[3], e[t + 4] = r[4], e[t + 5] = r[5], e[t + 6] = r[6], e[t + 7] = r[7], e[t + 8] = r[8], e[t + 9] = r[9], e[t + 10] = r[10], e[t + 11] = r[11], e[t + 12] = r[12], e[t + 13] = r[13], e[t + 14] = r[14], e[t + 15] = r[15], e
                },
                getPosition: function () {
                    var e = new n.Vector3;
                    return function () {
                        n.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
                        var t = this.elements;
                        return e.set(t[12], t[13], t[14])
                    }
                }(),
                setPosition: function (e) {
                    var t = this.elements;
                    return t[12] = e.x, t[13] = e.y, t[14] = e.z, this
                },
                getInverse: function (e, t) {
                    var r = this.elements,
                        i = e.elements,
                        o = i[0],
                        a = i[4],
                        s = i[8],
                        h = i[12],
                        l = i[1],
                        c = i[5],
                        u = i[9],
                        d = i[13],
                        p = i[2],
                        f = i[6],
                        m = i[10],
                        g = i[14],
                        v = i[3],
                        y = i[7],
                        x = i[11],
                        _ = i[15];
                    r[0] = u * g * y - d * m * y + d * f * x - c * g * x - u * f * _ + c * m * _, r[4] = h * m * y - s * g * y - h * f * x + a * g * x + s * f * _ - a * m * _, r[8] = s * d * y - h * u * y + h * c * x - a * d * x - s * c * _ + a * u * _, r[12] = h * u * f - s * d * f - h * c * m + a * d * m + s * c * g - a * u * g, r[1] = d * m * v - u * g * v - d * p * x + l * g * x + u * p * _ - l * m * _, r[5] = s * g * v - h * m * v + h * p * x - o * g * x - s * p * _ + o * m * _, r[9] = h * u * v - s * d * v - h * l * x + o * d * x + s * l * _ - o * u * _, r[13] = s * d * p - h * u * p + h * l * m - o * d * m - s * l * g + o * u * g, r[2] = c * g * v - d * f * v + d * p * y - l * g * y - c * p * _ + l * f * _, r[6] = h * f * v - a * g * v - h * p * y + o * g * y + a * p * _ - o * f * _, r[10] = a * d * v - h * c * v + h * l * y - o * d * y - a * l * _ + o * c * _, r[14] = h * c * p - a * d * p - h * l * f + o * d * f + a * l * g - o * c * g, r[3] = u * f * v - c * m * v - u * p * y + l * m * y + c * p * x - l * f * x, r[7] = a * m * v - s * f * v + s * p * y - o * m * y - a * p * x + o * f * x, r[11] = s * c * v - a * u * v - s * l * y + o * u * y + a * l * x - o * c * x, r[15] = a * u * p - s * c * p + s * l * f - o * u * f - a * l * m + o * c * m;
                    var b = o * r[0] + l * r[4] + p * r[8] + v * r[12];
                    if (0 == b) {
                        var w = "THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";
                        if (t) throw new Error(w);
                        return n.warn(w), this.identity(), this
                    }
                    return this.multiplyScalar(1 / b), this
                },
                translate: function () {
                    n.error("THREE.Matrix4: .translate() has been removed.")
                },
                rotateX: function () {
                    n.error("THREE.Matrix4: .rotateX() has been removed.")
                },
                rotateY: function () {
                    n.error("THREE.Matrix4: .rotateY() has been removed.")
                },
                rotateZ: function () {
                    n.error("THREE.Matrix4: .rotateZ() has been removed.")
                },
                rotateByAxis: function () {
                    n.error("THREE.Matrix4: .rotateByAxis() has been removed.")
                },
                scale: function (e) {
                    var t = this.elements,
                        r = e.x,
                        i = e.y,
                        n = e.z;
                    return t[0] *= r, t[4] *= i, t[8] *= n, t[1] *= r, t[5] *= i, t[9] *= n, t[2] *= r, t[6] *= i, t[10] *= n, t[3] *= r, t[7] *= i, t[11] *= n, this
                },
                getMaxScaleOnAxis: function () {
                    var e = this.elements,
                        t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
                        r = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
                        i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
                    return Math.sqrt(Math.max(t, Math.max(r, i)))
                },
                makeTranslation: function (e, t, r) {
                    return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, r, 0, 0, 0, 1), this
                },
                makeRotationX: function (e) {
                    var t = Math.cos(e),
                        r = Math.sin(e);
                    return this.set(1, 0, 0, 0, 0, t, -r, 0, 0, r, t, 0, 0, 0, 0, 1), this
                },
                makeRotationY: function (e) {
                    var t = Math.cos(e),
                        r = Math.sin(e);
                    return this.set(t, 0, r, 0, 0, 1, 0, 0, -r, 0, t, 0, 0, 0, 0, 1), this
                },
                makeRotationZ: function (e) {
                    var t = Math.cos(e),
                        r = Math.sin(e);
                    return this.set(t, -r, 0, 0, r, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
                },
                makeRotationAxis: function (e, t) {
                    var r = Math.cos(t),
                        i = Math.sin(t),
                        n = 1 - r,
                        o = e.x,
                        a = e.y,
                        s = e.z,
                        h = n * o,
                        l = n * a;
                    return this.set(h * o + r, h * a - i * s, h * s + i * a, 0, h * a + i * s, l * a + r, l * s - i * o, 0, h * s - i * a, l * s + i * o, n * s * s + r, 0, 0, 0, 0, 1), this
                },
                makeScale: function (e, t, r) {
                    return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, r, 0, 0, 0, 0, 1), this
                },
                compose: function (e, t, r) {
                    return this.makeRotationFromQuaternion(t), this.scale(r), this.setPosition(e), this
                },
                decompose: function () {
                    var e = new n.Vector3,
                        t = new n.Matrix4;
                    return function (r, i, n) {
                        var o = this.elements,
                            a = e.set(o[0], o[1], o[2]).length(),
                            s = e.set(o[4], o[5], o[6]).length(),
                            h = e.set(o[8], o[9], o[10]).length(),
                            l = this.determinant();
                        0 > l && (a = -a), r.x = o[12], r.y = o[13], r.z = o[14], t.elements.set(this.elements);
                        var c = 1 / a,
                            u = 1 / s,
                            d = 1 / h;
                        return t.elements[0] *= c, t.elements[1] *= c, t.elements[2] *= c, t.elements[4] *= u, t.elements[5] *= u, t.elements[6] *= u, t.elements[8] *= d, t.elements[9] *= d, t.elements[10] *= d, i.setFromRotationMatrix(t), n.x = a, n.y = s, n.z = h, this
                    }
                }(),
                makeFrustum: function (e, t, r, i, n, o) {
                    var a = this.elements,
                        s = 2 * n / (t - e),
                        h = 2 * n / (i - r),
                        l = (t + e) / (t - e),
                        c = (i + r) / (i - r),
                        u = -(o + n) / (o - n),
                        d = -2 * o * n / (o - n);
                    return a[0] = s, a[4] = 0, a[8] = l, a[12] = 0, a[1] = 0, a[5] = h, a[9] = c, a[13] = 0, a[2] = 0, a[6] = 0, a[10] = u, a[14] = d, a[3] = 0, a[7] = 0, a[11] = -1, a[15] = 0, this
                },
                makePerspective: function (e, t, r, i) {
                    var o = r * Math.tan(n.Math.degToRad(.5 * e)),
                        a = -o,
                        s = a * t,
                        h = o * t;
                    return this.makeFrustum(s, h, a, o, r, i)
                },
                makeOrthographic: function (e, t, r, i, n, o) {
                    var a = this.elements,
                        s = t - e,
                        h = r - i,
                        l = o - n,
                        c = (t + e) / s,
                        u = (r + i) / h,
                        d = (o + n) / l;
                    return a[0] = 2 / s, a[4] = 0, a[8] = 0, a[12] = -c, a[1] = 0, a[5] = 2 / h, a[9] = 0, a[13] = -u, a[2] = 0, a[6] = 0, a[10] = -2 / l, a[14] = -d, a[3] = 0, a[7] = 0, a[11] = 0, a[15] = 1, this
                },
                fromArray: function (e) {
                    return this.elements.set(e), this
                },
                toArray: function () {
                    var e = this.elements;
                    return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]]
                },
                clone: function () {
                    return (new n.Matrix4).fromArray(this.elements)
                }
            }, n.Ray = function (e, t) {
                this.origin = void 0 !== e ? e : new n.Vector3, this.direction = void 0 !== t ? t : new n.Vector3
            }, n.Ray.prototype = {
                constructor: n.Ray,
                set: function (e, t) {
                    return this.origin.copy(e), this.direction.copy(t), this
                },
                copy: function (e) {
                    return this.origin.copy(e.origin), this.direction.copy(e.direction), this
                },
                at: function (e, t) {
                    var r = t || new n.Vector3;
                    return r.copy(this.direction).multiplyScalar(e).add(this.origin)
                },
                recast: function () {
                    var e = new n.Vector3;
                    return function (t) {
                        return this.origin.copy(this.at(t, e)), this
                    }
                }(),
                closestPointToPoint: function (e, t) {
                    var r = t || new n.Vector3;
                    r.subVectors(e, this.origin);
                    var i = r.dot(this.direction);
                    return 0 > i ? r.copy(this.origin) : r.copy(this.direction).multiplyScalar(i).add(this.origin)
                },
                distanceToPoint: function () {
                    var e = new n.Vector3;
                    return function (t) {
                        var r = e.subVectors(t, this.origin).dot(this.direction);
                        return 0 > r ? this.origin.distanceTo(t) : (e.copy(this.direction).multiplyScalar(r).add(this.origin), e.distanceTo(t))
                    }
                }(),
                distanceSqToSegment: function () {
                    var e = new n.Vector3,
                        t = new n.Vector3,
                        r = new n.Vector3;
                    return function (i, n, o, a) {
                        e.copy(i).add(n).multiplyScalar(.5), t.copy(n).sub(i).normalize(), r.copy(this.origin).sub(e);
                        var s, h, l, c, u = .5 * i.distanceTo(n),
                            d = -this.direction.dot(t),
                            p = r.dot(this.direction),
                            f = -r.dot(t),
                            m = r.lengthSq(),
                            g = Math.abs(1 - d * d);
                        if (g > 0)
                            if (s = d * f - p, h = d * p - f, c = u * g, s >= 0)
                                if (h >= -c)
                                    if (c >= h) {
                                        var v = 1 / g;
                                        s *= v, h *= v, l = s * (s + d * h + 2 * p) + h * (d * s + h + 2 * f) + m
                                    } else h = u, s = Math.max(0, -(d * h + p)), l = -s * s + h * (h + 2 * f) + m;
                        else h = -u, s = Math.max(0, -(d * h + p)), l = -s * s + h * (h + 2 * f) + m;
                        else -c >= h ? (s = Math.max(0, -(-d * u + p)), h = s > 0 ? -u : Math.min(Math.max(-u, -f), u), l = -s * s + h * (h + 2 * f) + m) : c >= h ? (s = 0, h = Math.min(Math.max(-u, -f), u), l = h * (h + 2 * f) + m) : (s = Math.max(0, -(d * u + p)), h = s > 0 ? u : Math.min(Math.max(-u, -f), u), l = -s * s + h * (h + 2 * f) + m);
                        else h = d > 0 ? -u : u, s = Math.max(0, -(d * h + p)), l = -s * s + h * (h + 2 * f) + m;
                        return o && o.copy(this.direction).multiplyScalar(s).add(this.origin), a && a.copy(t).multiplyScalar(h).add(e), l
                    }
                }(),
                isIntersectionSphere: function (e) {
                    return this.distanceToPoint(e.center) <= e.radius
                },
                intersectSphere: function () {
                    var e = new n.Vector3;
                    return function (t, r) {
                        e.subVectors(t.center, this.origin);
                        var i = e.dot(this.direction),
                            n = e.dot(e) - i * i,
                            o = t.radius * t.radius;
                        if (n > o) return null;
                        var a = Math.sqrt(o - n),
                            s = i - a,
                            h = i + a;
                        return 0 > s && 0 > h ? null : 0 > s ? this.at(h, r) : this.at(s, r)
                    }
                }(),
                isIntersectionPlane: function (e) {
                    var t = e.distanceToPoint(this.origin);
                    if (0 === t) return !0;
                    var r = e.normal.dot(this.direction);
                    return 0 > r * t ? !0 : !1
                },
                distanceToPlane: function (e) {
                    var t = e.normal.dot(this.direction);
                    if (0 == t) return 0 == e.distanceToPoint(this.origin) ? 0 : null;
                    var r = -(this.origin.dot(e.normal) + e.constant) / t;
                    return r >= 0 ? r : null
                },
                intersectPlane: function (e, t) {
                    var r = this.distanceToPlane(e);
                    return null === r ? null : this.at(r, t)
                },
                isIntersectionBox: function () {
                    var e = new n.Vector3;
                    return function (t) {
                        return null !== this.intersectBox(t, e)
                    }
                }(),
                intersectBox: function (e, t) {
                    var r, i, n, o, a, s, h = 1 / this.direction.x,
                        l = 1 / this.direction.y,
                        c = 1 / this.direction.z,
                        u = this.origin;
                    return h >= 0 ? (r = (e.min.x - u.x) * h, i = (e.max.x - u.x) * h) : (r = (e.max.x - u.x) * h, i = (e.min.x - u.x) * h), l >= 0 ? (n = (e.min.y - u.y) * l, o = (e.max.y - u.y) * l) : (n = (e.max.y - u.y) * l, o = (e.min.y - u.y) * l), r > o || n > i ? null : ((n > r || r !== r) && (r = n), (i > o || i !== i) && (i = o), c >= 0 ? (a = (e.min.z - u.z) * c, s = (e.max.z - u.z) * c) : (a = (e.max.z - u.z) * c, s = (e.min.z - u.z) * c), r > s || a > i ? null : ((a > r || r !== r) && (r = a), (i > s || i !== i) && (i = s), 0 > i ? null : this.at(r >= 0 ? r : i, t)))
                },
                intersectTriangle: function () {
                    var e = new n.Vector3,
                        t = new n.Vector3,
                        r = new n.Vector3,
                        i = new n.Vector3;
                    return function (n, o, a, s, h) {
                        t.subVectors(o, n), r.subVectors(a, n), i.crossVectors(t, r);
                        var l, c = this.direction.dot(i);
                        if (c > 0) {
                            if (s) return null;
                            l = 1
                        } else {
                            if (!(0 > c)) return null;
                            l = -1, c = -c
                        }
                        e.subVectors(this.origin, n);
                        var u = l * this.direction.dot(r.crossVectors(e, r));
                        if (0 > u) return null;
                        var d = l * this.direction.dot(t.cross(e));
                        if (0 > d) return null;
                        if (u + d > c) return null;
                        var p = -l * e.dot(i);
                        return 0 > p ? null : this.at(p / c, h)
                    }
                }(),
                applyMatrix4: function (e) {
                    return this.direction.add(this.origin).applyMatrix4(e), this.origin.applyMatrix4(e), this.direction.sub(this.origin), this.direction.normalize(), this
                },
                equals: function (e) {
                    return e.origin.equals(this.origin) && e.direction.equals(this.direction)
                },
                clone: function () {
                    return (new n.Ray).copy(this)
                }
            }, n.Sphere = function (e, t) {
                this.center = void 0 !== e ? e : new n.Vector3, this.radius = void 0 !== t ? t : 0
            }, n.Sphere.prototype = {
                constructor: n.Sphere,
                set: function (e, t) {
                    return this.center.copy(e), this.radius = t, this
                },
                setFromPoints: function () {
                    var e = new n.Box3;
                    return function (t, r) {
                        var i = this.center;
                        void 0 !== r ? i.copy(r) : e.setFromPoints(t).center(i);
                        for (var n = 0, o = 0, a = t.length; a > o; o++) n = Math.max(n, i.distanceToSquared(t[o]));
                        return this.radius = Math.sqrt(n), this
                    }
                }(),
                copy: function (e) {
                    return this.center.copy(e.center), this.radius = e.radius, this
                },
                empty: function () {
                    return this.radius <= 0
                },
                containsPoint: function (e) {
                    return e.distanceToSquared(this.center) <= this.radius * this.radius
                },
                distanceToPoint: function (e) {
                    return e.distanceTo(this.center) - this.radius
                },
                intersectsSphere: function (e) {
                    var t = this.radius + e.radius;
                    return e.center.distanceToSquared(this.center) <= t * t
                },
                clampPoint: function (e, t) {
                    var r = this.center.distanceToSquared(e),
                        i = t || new n.Vector3;
                    return i.copy(e), r > this.radius * this.radius && (i.sub(this.center).normalize(), i.multiplyScalar(this.radius).add(this.center)), i
                },
                getBoundingBox: function (e) {
                    var t = e || new n.Box3;
                    return t.set(this.center, this.center), t.expandByScalar(this.radius), t
                },
                applyMatrix4: function (e) {
                    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this
                },
                translate: function (e) {
                    return this.center.add(e), this
                },
                equals: function (e) {
                    return e.center.equals(this.center) && e.radius === this.radius
                },
                clone: function () {
                    return (new n.Sphere).copy(this)
                }
            }, n.Frustum = function (e, t, r, i, o, a) {
                this.planes = [void 0 !== e ? e : new n.Plane, void 0 !== t ? t : new n.Plane, void 0 !== r ? r : new n.Plane, void 0 !== i ? i : new n.Plane, void 0 !== o ? o : new n.Plane, void 0 !== a ? a : new n.Plane]
            }, n.Frustum.prototype = {
                constructor: n.Frustum,
                set: function (e, t, r, i, n, o) {
                    var a = this.planes;
                    return a[0].copy(e), a[1].copy(t), a[2].copy(r), a[3].copy(i), a[4].copy(n), a[5].copy(o), this
                },
                copy: function (e) {
                    for (var t = this.planes, r = 0; 6 > r; r++) t[r].copy(e.planes[r]);
                    return this
                },
                setFromMatrix: function (e) {
                    var t = this.planes,
                        r = e.elements,
                        i = r[0],
                        n = r[1],
                        o = r[2],
                        a = r[3],
                        s = r[4],
                        h = r[5],
                        l = r[6],
                        c = r[7],
                        u = r[8],
                        d = r[9],
                        p = r[10],
                        f = r[11],
                        m = r[12],
                        g = r[13],
                        v = r[14],
                        y = r[15];
                    return t[0].setComponents(a - i, c - s, f - u, y - m).normalize(), t[1].setComponents(a + i, c + s, f + u, y + m).normalize(), t[2].setComponents(a + n, c + h, f + d, y + g).normalize(), t[3].setComponents(a - n, c - h, f - d, y - g).normalize(), t[4].setComponents(a - o, c - l, f - p, y - v).normalize(), t[5].setComponents(a + o, c + l, f + p, y + v).normalize(), this
                },
                intersectsObject: function () {
                    var e = new n.Sphere;
                    return function (t) {
                        var r = t.geometry;
                        return null === r.boundingSphere && r.computeBoundingSphere(), e.copy(r.boundingSphere), e.applyMatrix4(t.matrixWorld), this.intersectsSphere(e)
                    }
                }(),
                intersectsSphere: function (e) {
                    for (var t = this.planes, r = e.center, i = -e.radius, n = 0; 6 > n; n++) {
                        var o = t[n].distanceToPoint(r);
                        if (i > o) return !1
                    }
                    return !0
                },
                intersectsBox: function () {
                    var e = new n.Vector3,
                        t = new n.Vector3;
                    return function (r) {
                        for (var i = this.planes, n = 0; 6 > n; n++) {
                            var o = i[n];
                            e.x = o.normal.x > 0 ? r.min.x : r.max.x, t.x = o.normal.x > 0 ? r.max.x : r.min.x, e.y = o.normal.y > 0 ? r.min.y : r.max.y, t.y = o.normal.y > 0 ? r.max.y : r.min.y, e.z = o.normal.z > 0 ? r.min.z : r.max.z, t.z = o.normal.z > 0 ? r.max.z : r.min.z;
                            var a = o.distanceToPoint(e),
                                s = o.distanceToPoint(t);
                            if (0 > a && 0 > s) return !1
                        }
                        return !0
                    }
                }(),
                containsPoint: function (e) {
                    for (var t = this.planes, r = 0; 6 > r; r++)
                        if (t[r].distanceToPoint(e) < 0) return !1;
                    return !0
                },
                clone: function () {
                    return (new n.Frustum).copy(this)
                }
            }, n.Plane = function (e, t) {
                this.normal = void 0 !== e ? e : new n.Vector3(1, 0, 0), this.constant = void 0 !== t ? t : 0
            }, n.Plane.prototype = {
                constructor: n.Plane,
                set: function (e, t) {
                    return this.normal.copy(e), this.constant = t, this
                },
                setComponents: function (e, t, r, i) {
                    return this.normal.set(e, t, r), this.constant = i, this
                },
                setFromNormalAndCoplanarPoint: function (e, t) {
                    return this.normal.copy(e), this.constant = -t.dot(this.normal), this
                },
                setFromCoplanarPoints: function () {
                    var e = new n.Vector3,
                        t = new n.Vector3;
                    return function (r, i, n) {
                        var o = e.subVectors(n, i).cross(t.subVectors(r, i)).normalize();
                        return this.setFromNormalAndCoplanarPoint(o, r), this
                    }
                }(),
                copy: function (e) {
                    return this.normal.copy(e.normal), this.constant = e.constant, this
                },
                normalize: function () {
                    var e = 1 / this.normal.length();
                    return this.normal.multiplyScalar(e), this.constant *= e, this
                },
                negate: function () {
                    return this.constant *= -1, this.normal.negate(), this
                },
                distanceToPoint: function (e) {
                    return this.normal.dot(e) + this.constant
                },
                distanceToSphere: function (e) {
                    return this.distanceToPoint(e.center) - e.radius
                },
                projectPoint: function (e, t) {
                    return this.orthoPoint(e, t).sub(e).negate()
                },
                orthoPoint: function (e, t) {
                    var r = this.distanceToPoint(e),
                        i = t || new n.Vector3;
                    return i.copy(this.normal).multiplyScalar(r)
                },
                isIntersectionLine: function (e) {
                    var t = this.distanceToPoint(e.start),
                        r = this.distanceToPoint(e.end);
                    return 0 > t && r > 0 || 0 > r && t > 0
                },
                intersectLine: function () {
                    var e = new n.Vector3;
                    return function (t, r) {
                        var i = r || new n.Vector3,
                            o = t.delta(e),
                            a = this.normal.dot(o);
                        if (0 == a) return 0 == this.distanceToPoint(t.start) ? i.copy(t.start) : void 0;
                        var s = -(t.start.dot(this.normal) + this.constant) / a;
                        return 0 > s || s > 1 ? void 0 : i.copy(o).multiplyScalar(s).add(t.start)
                    }
                }(),
                coplanarPoint: function (e) {
                    var t = e || new n.Vector3;
                    return t.copy(this.normal).multiplyScalar(-this.constant)
                },
                applyMatrix4: function () {
                    var e = new n.Vector3,
                        t = new n.Vector3,
                        r = new n.Matrix3;
                    return function (i, n) {
                        var o = n || r.getNormalMatrix(i),
                            a = e.copy(this.normal).applyMatrix3(o),
                            s = this.coplanarPoint(t);
                        return s.applyMatrix4(i), this.setFromNormalAndCoplanarPoint(a, s), this
                    }
                }(),
                translate: function (e) {
                    return this.constant = this.constant - e.dot(this.normal), this
                },
                equals: function (e) {
                    return e.normal.equals(this.normal) && e.constant == this.constant
                },
                clone: function () {
                    return (new n.Plane).copy(this)
                }
            }, n.Math = {
                generateUUID: function () {
                    var e, t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
                        r = new Array(36),
                        i = 0;
                    return function () {
                        for (var n = 0; 36 > n; n++) 8 == n || 13 == n || 18 == n || 23 == n ? r[n] = "-" : 14 == n ? r[n] = "4" : (2 >= i && (i = 33554432 + 16777216 * Math.random() | 0), e = 15 & i, i >>= 4, r[n] = t[19 == n ? 3 & e | 8 : e]);
                        return r.join("")
                    }
                }(),
                clamp: function (e, t, r) {
                    return t > e ? t : e > r ? r : e
                },
                clampBottom: function (e, t) {
                    return t > e ? t : e
                },
                mapLinear: function (e, t, r, i, n) {
                    return i + (e - t) * (n - i) / (r - t)
                },
                smoothstep: function (e, t, r) {
                    return t >= e ? 0 : e >= r ? 1 : (e = (e - t) / (r - t), e * e * (3 - 2 * e))
                },
                smootherstep: function (e, t, r) {
                    return t >= e ? 0 : e >= r ? 1 : (e = (e - t) / (r - t), e * e * e * (e * (6 * e - 15) + 10))
                },
                random16: function () {
                    return (65280 * Math.random() + 255 * Math.random()) / 65535
                },
                randInt: function (e, t) {
                    return Math.floor(this.randFloat(e, t))
                },
                randFloat: function (e, t) {
                    return e + Math.random() * (t - e)
                },
                randFloatSpread: function (e) {
                    return e * (.5 - Math.random())
                },
                degToRad: function () {
                    var e = Math.PI / 180;
                    return function (t) {
                        return t * e
                    }
                }(),
                radToDeg: function () {
                    var e = 180 / Math.PI;
                    return function (t) {
                        return t * e
                    }
                }(),
                isPowerOfTwo: function (e) {
                    return 0 === (e & e - 1) && 0 !== e
                },
                nextPowerOfTwo: function (e) {
                    return e--, e |= e >> 1, e |= e >> 2, e |= e >> 4, e |= e >> 8, e |= e >> 16, e++, e
                }
            }, n.Spline = function (e) {
                function t(e, t, r, i, n, o, a) {
                    var s = .5 * (r - e),
                        h = .5 * (i - t);
                    return (2 * (t - r) + s + h) * a + (-3 * (t - r) - 2 * s - h) * o + s * n + t
                }
                this.points = e;
                var r, i, o, a, s, h, l, c, u, d = [],
                    p = {
                        x: 0,
                        y: 0,
                        z: 0
                    };
                this.initFromArray = function (e) {
                    this.points = [];
                    for (var t = 0; t < e.length; t++) this.points[t] = {
                        x: e[t][0],
                        y: e[t][1],
                        z: e[t][2]
                    }
                }, this.getPoint = function (e) {
                    return r = (this.points.length - 1) * e, i = Math.floor(r), o = r - i, d[0] = 0 === i ? i : i - 1, d[1] = i, d[2] = i > this.points.length - 2 ? this.points.length - 1 : i + 1, d[3] = i > this.points.length - 3 ? this.points.length - 1 : i + 2, h = this.points[d[0]], l = this.points[d[1]], c = this.points[d[2]], u = this.points[d[3]], a = o * o, s = o * a, p.x = t(h.x, l.x, c.x, u.x, o, a, s), p.y = t(h.y, l.y, c.y, u.y, o, a, s), p.z = t(h.z, l.z, c.z, u.z, o, a, s), p
                }, this.getControlPointsArray = function () {
                    var e, t, r = this.points.length,
                        i = [];
                    for (e = 0; r > e; e++) t = this.points[e],
                        i[e] = [t.x, t.y, t.z];
                    return i
                }, this.getLength = function (e) {
                    var t, r, i, o, a = 0,
                        s = 0,
                        h = 0,
                        l = new n.Vector3,
                        c = new n.Vector3,
                        u = [],
                        d = 0;
                    for (u[0] = 0, e || (e = 100), i = this.points.length * e, l.copy(this.points[0]), t = 1; i > t; t++) r = t / i, o = this.getPoint(r), c.copy(o), d += c.distanceTo(l), l.copy(o), a = (this.points.length - 1) * r, s = Math.floor(a), s != h && (u[s] = d, h = s);
                    return u[u.length] = d, {
                        chunks: u,
                        total: d
                    }
                }, this.reparametrizeByArcLength = function (e) {
                    var t, r, i, o, a, s, h, l, c = [],
                        u = new n.Vector3,
                        d = this.getLength();
                    for (c.push(u.copy(this.points[0]).clone()), t = 1; t < this.points.length; t++) {
                        for (s = d.chunks[t] - d.chunks[t - 1], h = Math.ceil(e * s / d.total), o = (t - 1) / (this.points.length - 1), a = t / (this.points.length - 1), r = 1; h - 1 > r; r++) i = o + r * (1 / h) * (a - o), l = this.getPoint(i), c.push(u.copy(l).clone());
                        c.push(u.copy(this.points[t]).clone())
                    }
                    this.points = c
                }
            }, n.Triangle = function (e, t, r) {
                this.a = void 0 !== e ? e : new n.Vector3, this.b = void 0 !== t ? t : new n.Vector3, this.c = void 0 !== r ? r : new n.Vector3
            }, n.Triangle.normal = function () {
                var e = new n.Vector3;
                return function (t, r, i, o) {
                    var a = o || new n.Vector3;
                    a.subVectors(i, r), e.subVectors(t, r), a.cross(e);
                    var s = a.lengthSq();
                    return s > 0 ? a.multiplyScalar(1 / Math.sqrt(s)) : a.set(0, 0, 0)
                }
            }(), n.Triangle.barycoordFromPoint = function () {
                var e = new n.Vector3,
                    t = new n.Vector3,
                    r = new n.Vector3;
                return function (i, o, a, s, h) {
                    e.subVectors(s, o), t.subVectors(a, o), r.subVectors(i, o);
                    var l = e.dot(e),
                        c = e.dot(t),
                        u = e.dot(r),
                        d = t.dot(t),
                        p = t.dot(r),
                        f = l * d - c * c,
                        m = h || new n.Vector3;
                    if (0 == f) return m.set(-2, -1, -1);
                    var g = 1 / f,
                        v = (d * u - c * p) * g,
                        y = (l * p - c * u) * g;
                    return m.set(1 - v - y, y, v)
                }
            }(), n.Triangle.containsPoint = function () {
                var e = new n.Vector3;
                return function (t, r, i, o) {
                    var a = n.Triangle.barycoordFromPoint(t, r, i, o, e);
                    return a.x >= 0 && a.y >= 0 && a.x + a.y <= 1
                }
            }(), n.Triangle.prototype = {
                constructor: n.Triangle,
                set: function (e, t, r) {
                    return this.a.copy(e), this.b.copy(t), this.c.copy(r), this
                },
                setFromPointsAndIndices: function (e, t, r, i) {
                    return this.a.copy(e[t]), this.b.copy(e[r]), this.c.copy(e[i]), this
                },
                copy: function (e) {
                    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this
                },
                area: function () {
                    var e = new n.Vector3,
                        t = new n.Vector3;
                    return function () {
                        return e.subVectors(this.c, this.b), t.subVectors(this.a, this.b), .5 * e.cross(t).length()
                    }
                }(),
                midpoint: function (e) {
                    var t = e || new n.Vector3;
                    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
                },
                normal: function (e) {
                    return n.Triangle.normal(this.a, this.b, this.c, e)
                },
                plane: function (e) {
                    var t = e || new n.Plane;
                    return t.setFromCoplanarPoints(this.a, this.b, this.c)
                },
                barycoordFromPoint: function (e, t) {
                    return n.Triangle.barycoordFromPoint(e, this.a, this.b, this.c, t)
                },
                containsPoint: function (e) {
                    return n.Triangle.containsPoint(e, this.a, this.b, this.c)
                },
                equals: function (e) {
                    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
                },
                clone: function () {
                    return (new n.Triangle).copy(this)
                }
            }, n.Clock = function (e) {
                this.autoStart = void 0 !== e ? e : !0, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
            }, n.Clock.prototype = {
                constructor: n.Clock,
                start: function () {
                    this.startTime = void 0 !== i.performance && void 0 !== i.performance.now ? i.performance.now() : Date.now(), this.oldTime = this.startTime, this.running = !0
                },
                stop: function () {
                    this.getElapsedTime(), this.running = !1
                },
                getElapsedTime: function () {
                    return this.getDelta(), this.elapsedTime
                },
                getDelta: function () {
                    var e = 0;
                    if (this.autoStart && !this.running && this.start(), this.running) {
                        var t = void 0 !== i.performance && void 0 !== i.performance.now ? i.performance.now() : Date.now();
                        e = .001 * (t - this.oldTime), this.oldTime = t, this.elapsedTime += e
                    }
                    return e
                }
            }, n.EventDispatcher = function () {}, n.EventDispatcher.prototype = {
                constructor: n.EventDispatcher,
                apply: function (e) {
                    e.addEventListener = n.EventDispatcher.prototype.addEventListener, e.hasEventListener = n.EventDispatcher.prototype.hasEventListener, e.removeEventListener = n.EventDispatcher.prototype.removeEventListener, e.dispatchEvent = n.EventDispatcher.prototype.dispatchEvent
                },
                addEventListener: function (e, t) {
                    void 0 === this._listeners && (this._listeners = {});
                    var r = this._listeners;
                    void 0 === r[e] && (r[e] = []), -1 === r[e].indexOf(t) && r[e].push(t)
                },
                hasEventListener: function (e, t) {
                    if (void 0 === this._listeners) return !1;
                    var r = this._listeners;
                    return void 0 !== r[e] && -1 !== r[e].indexOf(t) ? !0 : !1
                },
                removeEventListener: function (e, t) {
                    if (void 0 !== this._listeners) {
                        var r = this._listeners,
                            i = r[e];
                        if (void 0 !== i) {
                            var n = i.indexOf(t); - 1 !== n && i.splice(n, 1)
                        }
                    }
                },
                dispatchEvent: function (e) {
                    if (void 0 !== this._listeners) {
                        var t = this._listeners,
                            r = t[e.type];
                        if (void 0 !== r) {
                            e.target = this;
                            for (var i = [], n = r.length, o = 0; n > o; o++) i[o] = r[o];
                            for (var o = 0; n > o; o++) i[o].call(this, e)
                        }
                    }
                }
            },
            function (e) {
                e.Raycaster = function (t, r, i, n) {
                    this.ray = new e.Ray(t, r), this.near = i || 0, this.far = n || 1 / 0, this.params = {
                        Sprite: {},
                        Mesh: {},
                        PointCloud: {
                            threshold: 1
                        },
                        LOD: {},
                        Line: {}
                    }
                };
                var t = function (e, t) {
                        return e.distance - t.distance
                    },
                    r = function (e, t, i, n) {
                        if (e.raycast(t, i), n === !0)
                            for (var o = e.children, a = 0, s = o.length; s > a; a++) r(o[a], t, i, !0)
                    };
                e.Raycaster.prototype = {
                    constructor: e.Raycaster,
                    precision: 1e-4,
                    linePrecision: 1,
                    set: function (e, t) {
                        this.ray.set(e, t)
                    },
                    setFromCamera: function (t, r) {
                        r instanceof e.PerspectiveCamera ? (this.ray.origin.copy(r.position), this.ray.direction.set(t.x, t.y, .5).unproject(r).sub(r.position).normalize()) : r instanceof e.OrthographicCamera ? (this.ray.origin.set(t.x, t.y, -1).unproject(r), this.ray.direction.set(0, 0, -1).transformDirection(r.matrixWorld)) : e.error("THREE.Raycaster: Unsupported camera type.")
                    },
                    intersectObject: function (e, i) {
                        var n = [];
                        return r(e, this, n, i), n.sort(t), n
                    },
                    intersectObjects: function (i, n) {
                        var o = [];
                        if (i instanceof Array == !1) return e.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), o;
                        for (var a = 0, s = i.length; s > a; a++) r(i[a], this, o, n);
                        return o.sort(t), o
                    }
                }
            }(n), n.Object3D = function () {
                Object.defineProperty(this, "id", {
                    value: n.Object3DIdCount++
                }), this.uuid = n.Math.generateUUID(), this.name = "", this.type = "Object3D", this.parent = void 0, this.children = [], this.up = n.Object3D.DefaultUp.clone();
                var e = new n.Vector3,
                    t = new n.Euler,
                    r = new n.Quaternion,
                    i = new n.Vector3(1, 1, 1),
                    o = function () {
                        r.setFromEuler(t, !1)
                    },
                    a = function () {
                        t.setFromQuaternion(r, void 0, !1)
                    };
                t.onChange(o), r.onChange(a), Object.defineProperties(this, {
                    position: {
                        enumerable: !0,
                        value: e
                    },
                    rotation: {
                        enumerable: !0,
                        value: t
                    },
                    quaternion: {
                        enumerable: !0,
                        value: r
                    },
                    scale: {
                        enumerable: !0,
                        value: i
                    }
                }), this.rotationAutoUpdate = !0, this.matrix = new n.Matrix4, this.matrixWorld = new n.Matrix4, this.matrixAutoUpdate = !0, this.matrixWorldNeedsUpdate = !1, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.userData = {}
            }, n.Object3D.DefaultUp = new n.Vector3(0, 1, 0), n.Object3D.prototype = {
                constructor: n.Object3D,
                get eulerOrder() {
                    return n.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."), this.rotation.order
                },
                set eulerOrder(e) {
                    n.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."), this.rotation.order = e
                },
                get useQuaternion() {
                    n.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
                },
                set useQuaternion(e) {
                    n.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
                },
                applyMatrix: function (e) {
                    this.matrix.multiplyMatrices(e, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale)
                },
                setRotationFromAxisAngle: function (e, t) {
                    this.quaternion.setFromAxisAngle(e, t)
                },
                setRotationFromEuler: function (e) {
                    this.quaternion.setFromEuler(e, !0)
                },
                setRotationFromMatrix: function (e) {
                    this.quaternion.setFromRotationMatrix(e)
                },
                setRotationFromQuaternion: function (e) {
                    this.quaternion.copy(e)
                },
                rotateOnAxis: function () {
                    var e = new n.Quaternion;
                    return function (t, r) {
                        return e.setFromAxisAngle(t, r), this.quaternion.multiply(e), this
                    }
                }(),
                rotateX: function () {
                    var e = new n.Vector3(1, 0, 0);
                    return function (t) {
                        return this.rotateOnAxis(e, t)
                    }
                }(),
                rotateY: function () {
                    var e = new n.Vector3(0, 1, 0);
                    return function (t) {
                        return this.rotateOnAxis(e, t)
                    }
                }(),
                rotateZ: function () {
                    var e = new n.Vector3(0, 0, 1);
                    return function (t) {
                        return this.rotateOnAxis(e, t)
                    }
                }(),
                translateOnAxis: function () {
                    var e = new n.Vector3;
                    return function (t, r) {
                        return e.copy(t).applyQuaternion(this.quaternion), this.position.add(e.multiplyScalar(r)), this
                    }
                }(),
                translate: function (e, t) {
                    return n.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(t, e)
                },
                translateX: function () {
                    var e = new n.Vector3(1, 0, 0);
                    return function (t) {
                        return this.translateOnAxis(e, t)
                    }
                }(),
                translateY: function () {
                    var e = new n.Vector3(0, 1, 0);
                    return function (t) {
                        return this.translateOnAxis(e, t)
                    }
                }(),
                translateZ: function () {
                    var e = new n.Vector3(0, 0, 1);
                    return function (t) {
                        return this.translateOnAxis(e, t)
                    }
                }(),
                localToWorld: function (e) {
                    return e.applyMatrix4(this.matrixWorld)
                },
                worldToLocal: function () {
                    var e = new n.Matrix4;
                    return function (t) {
                        return t.applyMatrix4(e.getInverse(this.matrixWorld))
                    }
                }(),
                lookAt: function () {
                    var e = new n.Matrix4;
                    return function (t) {
                        e.lookAt(t, this.position, this.up), this.quaternion.setFromRotationMatrix(e)
                    }
                }(),
                add: function (e) {
                    if (arguments.length > 1) {
                        for (var t = 0; t < arguments.length; t++) this.add(arguments[t]);
                        return this
                    }
                    return e === this ? (n.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e instanceof n.Object3D ? (void 0 !== e.parent && e.parent.remove(e), e.parent = this, e.dispatchEvent({
                        type: "added"
                    }), this.children.push(e)) : n.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this)
                },
                remove: function (e) {
                    if (arguments.length > 1)
                        for (var t = 0; t < arguments.length; t++) this.remove(arguments[t]);
                    var r = this.children.indexOf(e); - 1 !== r && (e.parent = void 0, e.dispatchEvent({
                        type: "removed"
                    }), this.children.splice(r, 1))
                },
                getChildByName: function (e) {
                    return n.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(e)
                },
                getObjectById: function (e) {
                    return this.getObjectByProperty("id", e)
                },
                getObjectByName: function (e) {
                    return this.getObjectByProperty("name", e)
                },
                getObjectByProperty: function (e, t) {
                    if (this[e] === t) return this;
                    for (var r = 0, i = this.children.length; i > r; r++) {
                        var n = this.children[r],
                            o = n.getObjectByProperty(e, t);
                        if (void 0 !== o) return o
                    }
                    return void 0
                },
                getWorldPosition: function (e) {
                    var t = e || new n.Vector3;
                    return this.updateMatrixWorld(!0), t.setFromMatrixPosition(this.matrixWorld)
                },
                getWorldQuaternion: function () {
                    var e = new n.Vector3,
                        t = new n.Vector3;
                    return function (r) {
                        var i = r || new n.Quaternion;
                        return this.updateMatrixWorld(!0), this.matrixWorld.decompose(e, i, t), i
                    }
                }(),
                getWorldRotation: function () {
                    var e = new n.Quaternion;
                    return function (t) {
                        var r = t || new n.Euler;
                        return this.getWorldQuaternion(e), r.setFromQuaternion(e, this.rotation.order, !1)
                    }
                }(),
                getWorldScale: function () {
                    var e = new n.Vector3,
                        t = new n.Quaternion;
                    return function (r) {
                        var i = r || new n.Vector3;
                        return this.updateMatrixWorld(!0), this.matrixWorld.decompose(e, t, i), i
                    }
                }(),
                getWorldDirection: function () {
                    var e = new n.Quaternion;
                    return function (t) {
                        var r = t || new n.Vector3;
                        return this.getWorldQuaternion(e), r.set(0, 0, 1).applyQuaternion(e)
                    }
                }(),
                raycast: function () {},
                traverse: function (e) {
                    e(this);
                    for (var t = 0, r = this.children.length; r > t; t++) this.children[t].traverse(e)
                },
                traverseVisible: function (e) {
                    if (this.visible !== !1) {
                        e(this);
                        for (var t = 0, r = this.children.length; r > t; t++) this.children[t].traverseVisible(e)
                    }
                },
                traverseAncestors: function (e) {
                    this.parent && (e(this.parent), this.parent.traverseAncestors(e))
                },
                updateMatrix: function () {
                    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
                },
                updateMatrixWorld: function (e) {
                    this.matrixAutoUpdate === !0 && this.updateMatrix(), (this.matrixWorldNeedsUpdate === !0 || e === !0) && (void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
                    for (var t = 0, r = this.children.length; r > t; t++) this.children[t].updateMatrixWorld(e)
                },
                toJSON: function () {
                    var e = {
                            metadata: {
                                version: 4.3,
                                type: "Object",
                                generator: "ObjectExporter"
                            }
                        },
                        t = {},
                        r = function (r) {
                            if (void 0 === e.geometries && (e.geometries = []), void 0 === t[r.uuid]) {
                                var i = r.toJSON();
                                delete i.metadata, t[r.uuid] = i, e.geometries.push(i)
                            }
                            return r.uuid
                        },
                        i = {},
                        o = function (t) {
                            if (void 0 === e.materials && (e.materials = []), void 0 === i[t.uuid]) {
                                var r = t.toJSON();
                                delete r.metadata, i[t.uuid] = r, e.materials.push(r)
                            }
                            return t.uuid
                        },
                        a = function (e) {
                            var t = {};
                            if (t.uuid = e.uuid, t.type = e.type, "" !== e.name && (t.name = e.name), "{}" !== JSON.stringify(e.userData) && (t.userData = e.userData), e.visible !== !0 && (t.visible = e.visible), e instanceof n.PerspectiveCamera ? (t.fov = e.fov, t.aspect = e.aspect, t.near = e.near, t.far = e.far) : e instanceof n.OrthographicCamera ? (t.left = e.left, t.right = e.right, t.top = e.top, t.bottom = e.bottom, t.near = e.near, t.far = e.far) : e instanceof n.AmbientLight ? t.color = e.color.getHex() : e instanceof n.DirectionalLight ? (t.color = e.color.getHex(), t.intensity = e.intensity) : e instanceof n.PointLight ? (t.color = e.color.getHex(), t.intensity = e.intensity, t.distance = e.distance, t.decay = e.decay) : e instanceof n.SpotLight ? (t.color = e.color.getHex(), t.intensity = e.intensity, t.distance = e.distance, t.angle = e.angle, t.exponent = e.exponent, t.decay = e.decay) : e instanceof n.HemisphereLight ? (t.color = e.color.getHex(), t.groundColor = e.groundColor.getHex()) : e instanceof n.Mesh || e instanceof n.Line || e instanceof n.PointCloud ? (t.geometry = r(e.geometry), t.material = o(e.material), e instanceof n.Line && (t.mode = e.mode)) : e instanceof n.Sprite && (t.material = o(e.material)), t.matrix = e.matrix.toArray(), e.children.length > 0) {
                                t.children = [];
                                for (var i = 0; i < e.children.length; i++) t.children.push(a(e.children[i]))
                            }
                            return t
                        };
                    return e.object = a(this), e
                },
                clone: function (e, t) {
                    if (void 0 === e && (e = new n.Object3D), void 0 === t && (t = !0), e.name = this.name, e.up.copy(this.up), e.position.copy(this.position), e.quaternion.copy(this.quaternion), e.scale.copy(this.scale), e.rotationAutoUpdate = this.rotationAutoUpdate, e.matrix.copy(this.matrix), e.matrixWorld.copy(this.matrixWorld), e.matrixAutoUpdate = this.matrixAutoUpdate, e.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate, e.visible = this.visible, e.castShadow = this.castShadow, e.receiveShadow = this.receiveShadow, e.frustumCulled = this.frustumCulled, e.userData = JSON.parse(JSON.stringify(this.userData)), t === !0)
                        for (var r = 0; r < this.children.length; r++) {
                            var i = this.children[r];
                            e.add(i.clone())
                        }
                    return e
                }
            }, n.EventDispatcher.prototype.apply(n.Object3D.prototype), n.Object3DIdCount = 0, n.Face3 = function (e, t, r, i, o, a) {
                this.a = e, this.b = t, this.c = r, this.normal = i instanceof n.Vector3 ? i : new n.Vector3, this.vertexNormals = i instanceof Array ? i : [], this.color = o instanceof n.Color ? o : new n.Color, this.vertexColors = o instanceof Array ? o : [], this.vertexTangents = [], this.materialIndex = void 0 !== a ? a : 0
            }, n.Face3.prototype = {
                constructor: n.Face3,
                clone: function () {
                    var e = new n.Face3(this.a, this.b, this.c);
                    e.normal.copy(this.normal), e.color.copy(this.color), e.materialIndex = this.materialIndex;
                    for (var t = 0, r = this.vertexNormals.length; r > t; t++) e.vertexNormals[t] = this.vertexNormals[t].clone();
                    for (var t = 0, r = this.vertexColors.length; r > t; t++) e.vertexColors[t] = this.vertexColors[t].clone();
                    for (var t = 0, r = this.vertexTangents.length; r > t; t++) e.vertexTangents[t] = this.vertexTangents[t].clone();
                    return e
                }
            }, n.Face4 = function (e, t, r, i, o, a, s) {
                return n.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), new n.Face3(e, t, r, o, a, s)
            }, n.BufferAttribute = function (e, t) {
                this.array = e, this.itemSize = t, this.needsUpdate = !1
            }, n.BufferAttribute.prototype = {
                constructor: n.BufferAttribute,
                get length() {
                    return this.array.length
                },
                copyAt: function (e, t, r) {
                    e *= this.itemSize, r *= t.itemSize;
                    for (var i = 0, n = this.itemSize; n > i; i++) this.array[e + i] = t.array[r + i];
                    return this
                },
                set: function (e, t) {
                    return void 0 === t && (t = 0), this.array.set(e, t), this
                },
                setX: function (e, t) {
                    return this.array[e * this.itemSize] = t, this
                },
                setY: function (e, t) {
                    return this.array[e * this.itemSize + 1] = t, this
                },
                setZ: function (e, t) {
                    return this.array[e * this.itemSize + 2] = t, this
                },
                setXY: function (e, t, r) {
                    return e *= this.itemSize, this.array[e] = t, this.array[e + 1] = r, this
                },
                setXYZ: function (e, t, r, i) {
                    return e *= this.itemSize, this.array[e] = t, this.array[e + 1] = r, this.array[e + 2] = i, this
                },
                setXYZW: function (e, t, r, i, n) {
                    return e *= this.itemSize, this.array[e] = t, this.array[e + 1] = r, this.array[e + 2] = i, this.array[e + 3] = n, this
                },
                clone: function () {
                    return new n.BufferAttribute(new this.array.constructor(this.array), this.itemSize)
                }
            }, n.Int8Attribute = function (e, t) {
                return n.warn("THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
            }, n.Uint8Attribute = function (e, t) {
                return n.warn("THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
            }, n.Uint8ClampedAttribute = function (e, t) {
                return n.warn("THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
            }, n.Int16Attribute = function (e, t) {
                return n.warn("THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
            }, n.Uint16Attribute = function (e, t) {
                return n.warn("THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
            }, n.Int32Attribute = function (e, t) {
                return n.warn("THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
            }, n.Uint32Attribute = function (e, t) {
                return n.warn("THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
            }, n.Float32Attribute = function (e, t) {
                return n.warn("THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
            }, n.Float64Attribute = function (e, t) {
                return n.warn("THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."), new n.BufferAttribute(e, t)
            }, n.DynamicBufferAttribute = function (e, t) {
                n.BufferAttribute.call(this, e, t), this.updateRange = {
                    offset: 0,
                    count: -1
                }
            }, n.DynamicBufferAttribute.prototype = Object.create(n.BufferAttribute.prototype), n.DynamicBufferAttribute.prototype.constructor = n.DynamicBufferAttribute, n.DynamicBufferAttribute.prototype.clone = function () {
                return new n.DynamicBufferAttribute(new this.array.constructor(this.array), this.itemSize)
            }, n.BufferGeometry = function () {
                Object.defineProperty(this, "id", {
                    value: n.GeometryIdCount++
                }), this.uuid = n.Math.generateUUID(), this.name = "", this.type = "BufferGeometry", this.attributes = {}, this.attributesKeys = [], this.drawcalls = [], this.offsets = this.drawcalls, this.boundingBox = null, this.boundingSphere = null
            }, n.BufferGeometry.prototype = {
                constructor: n.BufferGeometry,
                addAttribute: function (e, t) {
                    return t instanceof n.BufferAttribute == !1 ? (n.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), void(this.attributes[e] = {
                        array: arguments[1],
                        itemSize: arguments[2]
                    })) : (this.attributes[e] = t, void(this.attributesKeys = Object.keys(this.attributes)))
                },
                getAttribute: function (e) {
                    return this.attributes[e]
                },
                addDrawCall: function (e, t, r) {
                    this.drawcalls.push({
                        start: e,
                        count: t,
                        index: void 0 !== r ? r : 0
                    })
                },
                applyMatrix: function (e) {
                    var t = this.attributes.position;
                    void 0 !== t && (e.applyToVector3Array(t.array), t.needsUpdate = !0);
                    var r = this.attributes.normal;
                    if (void 0 !== r) {
                        var i = (new n.Matrix3).getNormalMatrix(e);
                        i.applyToVector3Array(r.array), r.needsUpdate = !0
                    }
                    null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere()
                },
                center: function () {
                    this.computeBoundingBox();
                    var e = this.boundingBox.center().negate();
                    return this.applyMatrix((new n.Matrix4).setPosition(e)), e
                },
                fromGeometry: function (e, t) {
                    t = t || {
                        vertexColors: n.NoColors
                    };
                    var r = e.vertices,
                        i = e.faces,
                        o = e.faceVertexUvs,
                        a = t.vertexColors,
                        s = o[0].length > 0,
                        h = 3 == i[0].vertexNormals.length,
                        l = new Float32Array(3 * i.length * 3);
                    this.addAttribute("position", new n.BufferAttribute(l, 3));
                    var c = new Float32Array(3 * i.length * 3);
                    if (this.addAttribute("normal", new n.BufferAttribute(c, 3)), a !== n.NoColors) {
                        var u = new Float32Array(3 * i.length * 3);
                        this.addAttribute("color", new n.BufferAttribute(u, 3))
                    }
                    if (s === !0) {
                        var d = new Float32Array(3 * i.length * 2);
                        this.addAttribute("uv", new n.BufferAttribute(d, 2))
                    }
                    for (var p = 0, f = 0, m = 0; p < i.length; p++, f += 6, m += 9) {
                        var g = i[p],
                            v = r[g.a],
                            y = r[g.b],
                            x = r[g.c];
                        if (l[m] = v.x, l[m + 1] = v.y, l[m + 2] = v.z, l[m + 3] = y.x, l[m + 4] = y.y, l[m + 5] = y.z, l[m + 6] = x.x, l[m + 7] = x.y, l[m + 8] = x.z, h === !0) {
                            var _ = g.vertexNormals[0],
                                b = g.vertexNormals[1],
                                w = g.vertexNormals[2];
                            c[m] = _.x, c[m + 1] = _.y, c[m + 2] = _.z, c[m + 3] = b.x, c[m + 4] = b.y, c[m + 5] = b.z, c[m + 6] = w.x, c[m + 7] = w.y, c[m + 8] = w.z
                        } else {
                            var M = g.normal;
                            c[m] = M.x, c[m + 1] = M.y, c[m + 2] = M.z, c[m + 3] = M.x, c[m + 4] = M.y, c[m + 5] = M.z, c[m + 6] = M.x, c[m + 7] = M.y, c[m + 8] = M.z
                        }
                        if (a === n.FaceColors) {
                            var S = g.color;
                            u[m] = S.r, u[m + 1] = S.g, u[m + 2] = S.b, u[m + 3] = S.r, u[m + 4] = S.g, u[m + 5] = S.b, u[m + 6] = S.r, u[m + 7] = S.g, u[m + 8] = S.b
                        } else if (a === n.VertexColors) {
                            var E = g.vertexColors[0],
                                T = g.vertexColors[1],
                                A = g.vertexColors[2];
                            u[m] = E.r, u[m + 1] = E.g, u[m + 2] = E.b, u[m + 3] = T.r, u[m + 4] = T.g, u[m + 5] = T.b, u[m + 6] = A.r, u[m + 7] = A.g, u[m + 8] = A.b
                        }
                        if (s === !0) {
                            var C = o[0][p][0],
                                L = o[0][p][1],
                                R = o[0][p][2];
                            d[f] = C.x, d[f + 1] = C.y, d[f + 2] = L.x, d[f + 3] = L.y, d[f + 4] = R.x, d[f + 5] = R.y
                        }
                    }
                    return this.computeBoundingSphere(), this
                },
                computeBoundingBox: function () {
                    var e = new n.Vector3;
                    return function () {
                        null === this.boundingBox && (this.boundingBox = new n.Box3);
                        var t = this.attributes.position.array;
                        if (t) {
                            var r = this.boundingBox;
                            r.makeEmpty();
                            for (var i = 0, o = t.length; o > i; i += 3) e.set(t[i], t[i + 1], t[i + 2]), r.expandByPoint(e)
                        }(void 0 === t || 0 === t.length) && (this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0)), (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && n.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.')
                    }
                }(),
                computeBoundingSphere: function () {
                    var e = new n.Box3,
                        t = new n.Vector3;
                    return function () {
                        null === this.boundingSphere && (this.boundingSphere = new n.Sphere);
                        var r = this.attributes.position.array;
                        if (r) {
                            e.makeEmpty();
                            for (var i = this.boundingSphere.center, o = 0, a = r.length; a > o; o += 3) t.set(r[o], r[o + 1], r[o + 2]), e.expandByPoint(t);
                            e.center(i);
                            for (var s = 0, o = 0, a = r.length; a > o; o += 3) t.set(r[o], r[o + 1], r[o + 2]), s = Math.max(s, i.distanceToSquared(t));
                            this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && n.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.')
                        }
                    }
                }(),
                computeFaceNormals: function () {},
                computeVertexNormals: function () {
                    var e = this.attributes;
                    if (e.position) {
                        var t = e.position.array;
                        if (void 0 === e.normal) this.addAttribute("normal", new n.BufferAttribute(new Float32Array(t.length), 3));
                        else
                            for (var r = e.normal.array, i = 0, o = r.length; o > i; i++) r[i] = 0;
                        var a, s, h, r = e.normal.array,
                            l = new n.Vector3,
                            c = new n.Vector3,
                            u = new n.Vector3,
                            d = new n.Vector3,
                            p = new n.Vector3;
                        if (e.index)
                            for (var f = e.index.array, m = this.offsets.length > 0 ? this.offsets : [{
                                    start: 0,
                                    count: f.length,
                                    index: 0
                                }], g = 0, v = m.length; v > g; ++g)
                                for (var y = m[g].start, x = m[g].count, _ = m[g].index, i = y, o = y + x; o > i; i += 3) a = 3 * (_ + f[i]), s = 3 * (_ + f[i + 1]), h = 3 * (_ + f[i + 2]), l.fromArray(t, a), c.fromArray(t, s), u.fromArray(t, h), d.subVectors(u, c), p.subVectors(l, c), d.cross(p), r[a] += d.x, r[a + 1] += d.y, r[a + 2] += d.z, r[s] += d.x, r[s + 1] += d.y, r[s + 2] += d.z, r[h] += d.x, r[h + 1] += d.y, r[h + 2] += d.z;
                        else
                            for (var i = 0, o = t.length; o > i; i += 9) l.fromArray(t, i), c.fromArray(t, i + 3), u.fromArray(t, i + 6), d.subVectors(u, c), p.subVectors(l, c), d.cross(p), r[i] = d.x, r[i + 1] = d.y, r[i + 2] = d.z, r[i + 3] = d.x, r[i + 4] = d.y, r[i + 5] = d.z, r[i + 6] = d.x, r[i + 7] = d.y, r[i + 8] = d.z;
                        this.normalizeNormals(), e.normal.needsUpdate = !0
                    }
                },
                computeTangents: function () {
                    function e(e, t, r) {
                        R.fromArray(i, 3 * e), P.fromArray(i, 3 * t), F.fromArray(i, 3 * r), B.fromArray(a, 2 * e), D.fromArray(a, 2 * t), U.fromArray(a, 2 * r), d = P.x - R.x, p = F.x - R.x, f = P.y - R.y, m = F.y - R.y, g = P.z - R.z, v = F.z - R.z, y = D.x - B.x, x = U.x - B.x, _ = D.y - B.y, b = U.y - B.y, w = 1 / (y * b - x * _), k.set((b * d - _ * p) * w, (b * f - _ * m) * w, (b * g - _ * v) * w), V.set((y * p - x * d) * w, (y * m - x * f) * w, (y * v - x * g) * w), l[e].add(k), l[t].add(k), l[r].add(k), c[e].add(V), c[t].add(V), c[r].add(V)
                    }

                    function t(e) {
                        Y.fromArray(o, 3 * e), q.copy(Y), H = l[e], j.copy(H), j.sub(Y.multiplyScalar(Y.dot(H))).normalize(), X.crossVectors(q, H), W = X.dot(c[e]), G = 0 > W ? -1 : 1, h[4 * e] = j.x, h[4 * e + 1] = j.y, h[4 * e + 2] = j.z, h[4 * e + 3] = G
                    }
                    if (void 0 === this.attributes.index || void 0 === this.attributes.position || void 0 === this.attributes.normal || void 0 === this.attributes.uv) return void n.warn("THREE.BufferGeometry: Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
                    var r = this.attributes.index.array,
                        i = this.attributes.position.array,
                        o = this.attributes.normal.array,
                        a = this.attributes.uv.array,
                        s = i.length / 3;
                    void 0 === this.attributes.tangent && this.addAttribute("tangent", new n.BufferAttribute(new Float32Array(4 * s), 4));
                    for (var h = this.attributes.tangent.array, l = [], c = [], u = 0; s > u; u++) l[u] = new n.Vector3, c[u] = new n.Vector3;
                    var d, p, f, m, g, v, y, x, _, b, w, M, S, E, T, A, C, L, R = new n.Vector3,
                        P = new n.Vector3,
                        F = new n.Vector3,
                        B = new n.Vector2,
                        D = new n.Vector2,
                        U = new n.Vector2,
                        k = new n.Vector3,
                        V = new n.Vector3;
                    0 === this.drawcalls.length && this.addDrawCall(0, r.length, 0);
                    var O = this.drawcalls;
                    for (E = 0, T = O.length; T > E; ++E) {
                        var N = O[E].start,
                            z = O[E].count,
                            I = O[E].index;
                        for (M = N, S = N + z; S > M; M += 3) A = I + r[M], C = I + r[M + 1], L = I + r[M + 2], e(A, C, L)
                    }
                    var G, H, W, j = new n.Vector3,
                        X = new n.Vector3,
                        Y = new n.Vector3,
                        q = new n.Vector3;
                    for (E = 0, T = O.length; T > E; ++E) {
                        var N = O[E].start,
                            z = O[E].count,
                            I = O[E].index;
                        for (M = N, S = N + z; S > M; M += 3) A = I + r[M], C = I + r[M + 1], L = I + r[M + 2], t(A), t(C), t(L)
                    }
                },
                computeOffsets: function (e) {
                    void 0 === e && (e = 65535);
                    for (var t = this.attributes.index.array, r = this.attributes.position.array, i = t.length / 3, n = new Uint16Array(t.length), o = 0, a = 0, s = [{
                            start: 0,
                            count: 0,
                            index: 0
                        }], h = s[0], l = 0, c = 0, u = new Int32Array(6), d = new Int32Array(r.length), p = new Int32Array(r.length), f = 0; f < r.length; f++) d[f] = -1, p[f] = -1;
                    for (var m = 0; i > m; m++) {
                        c = 0;
                        for (var g = 0; 3 > g; g++) {
                            var v = t[3 * m + g]; - 1 == d[v] ? (u[2 * g] = v, u[2 * g + 1] = -1, c++) : d[v] < h.index ? (u[2 * g] = v, u[2 * g + 1] = -1, l++) : (u[2 * g] = v, u[2 * g + 1] = d[v])
                        }
                        var y = a + c;
                        if (y > h.index + e) {
                            var x = {
                                start: o,
                                count: 0,
                                index: a
                            };
                            s.push(x), h = x;
                            for (var _ = 0; 6 > _; _ += 2) {
                                var b = u[_ + 1];
                                b > -1 && b < h.index && (u[_ + 1] = -1)
                            }
                        }
                        for (var _ = 0; 6 > _; _ += 2) {
                            var v = u[_],
                                b = u[_ + 1]; - 1 === b && (b = a++), d[v] = b, p[b] = v, n[o++] = b - h.index, h.count++
                        }
                    }
                    return this.reorderBuffers(n, p, a), this.offsets = s, this.drawcalls = s, s
                },
                merge: function (e, t) {
                    if (e instanceof n.BufferGeometry == !1) return void n.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", e);
                    void 0 === t && (t = 0);
                    var r = this.attributes;
                    for (var i in r)
                        if (void 0 !== e.attributes[i])
                            for (var o = r[i], a = o.array, s = e.attributes[i], h = s.array, l = s.itemSize, c = 0, u = l * t; c < h.length; c++, u++) a[u] = h[c];
                    return this
                },
                normalizeNormals: function () {
                    for (var e, t, r, i, n = this.attributes.normal.array, o = 0, a = n.length; a > o; o += 3) e = n[o], t = n[o + 1], r = n[o + 2], i = 1 / Math.sqrt(e * e + t * t + r * r), n[o] *= i, n[o + 1] *= i, n[o + 2] *= i
                },
                reorderBuffers: function (e, t, r) {
                    var i = {};
                    for (var n in this.attributes)
                        if ("index" != n) {
                            var o = this.attributes[n].array;
                            i[n] = new o.constructor(this.attributes[n].itemSize * r)
                        } for (var a = 0; r > a; a++) {
                        var s = t[a];
                        for (var n in this.attributes)
                            if ("index" != n)
                                for (var h = this.attributes[n].array, l = this.attributes[n].itemSize, c = i[n], u = 0; l > u; u++) c[a * l + u] = h[s * l + u]
                    }
                    this.attributes.index.array = e;
                    for (var n in this.attributes) "index" != n && (this.attributes[n].array = i[n], this.attributes[n].numItems = this.attributes[n].itemSize * r)
                },
                toJSON: function () {
                    var e = {
                            metadata: {
                                version: 4,
                                type: "BufferGeometry",
                                generator: "BufferGeometryExporter"
                            },
                            uuid: this.uuid,
                            type: this.type,
                            data: {
                                attributes: {}
                            }
                        },
                        t = this.attributes,
                        r = this.offsets,
                        i = this.boundingSphere;
                    for (var n in t) {
                        var o = t[n],
                            a = Array.prototype.slice.call(o.array);
                        e.data.attributes[n] = {
                            itemSize: o.itemSize,
                            type: o.array.constructor.name,
                            array: a
                        }
                    }
                    return r.length > 0 && (e.data.offsets = JSON.parse(JSON.stringify(r))), null !== i && (e.data.boundingSphere = {
                        center: i.center.toArray(),
                        radius: i.radius
                    }), e
                },
                clone: function () {
                    var e = new n.BufferGeometry;
                    for (var t in this.attributes) {
                        var r = this.attributes[t];
                        e.addAttribute(t, r.clone())
                    }
                    for (var i = 0, o = this.offsets.length; o > i; i++) {
                        var a = this.offsets[i];
                        e.offsets.push({
                            start: a.start,
                            index: a.index,
                            count: a.count
                        })
                    }
                    return e
                },
                dispose: function () {
                    this.dispatchEvent({
                        type: "dispose"
                    })
                }
            }, n.EventDispatcher.prototype.apply(n.BufferGeometry.prototype), n.Geometry = function () {
                Object.defineProperty(this, "id", {
                    value: n.GeometryIdCount++
                }), this.uuid = n.Math.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [
                    []
                ], this.morphTargets = [], this.morphColors = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.hasTangents = !1, this.dynamic = !0, this.verticesNeedUpdate = !1, this.elementsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.tangentsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1
            }, n.Geometry.prototype = {
                constructor: n.Geometry,
                applyMatrix: function (e) {
                    for (var t = (new n.Matrix3).getNormalMatrix(e), r = 0, i = this.vertices.length; i > r; r++) {
                        var o = this.vertices[r];
                        o.applyMatrix4(e)
                    }
                    for (var r = 0, i = this.faces.length; i > r; r++) {
                        var a = this.faces[r];
                        a.normal.applyMatrix3(t).normalize();
                        for (var s = 0, h = a.vertexNormals.length; h > s; s++) a.vertexNormals[s].applyMatrix3(t).normalize()
                    }
                    null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this.verticesNeedUpdate = !0, this.normalsNeedUpdate = !0
                },
                fromBufferGeometry: function (e) {
                    for (var t = this, r = e.attributes, i = r.position.array, o = void 0 !== r.index ? r.index.array : void 0, a = void 0 !== r.normal ? r.normal.array : void 0, s = void 0 !== r.color ? r.color.array : void 0, h = void 0 !== r.uv ? r.uv.array : void 0, l = [], c = [], u = 0, d = 0; u < i.length; u += 3, d += 2) t.vertices.push(new n.Vector3(i[u], i[u + 1], i[u + 2])), void 0 !== a && l.push(new n.Vector3(a[u], a[u + 1], a[u + 2])), void 0 !== s && t.colors.push(new n.Color(s[u], s[u + 1], s[u + 2])), void 0 !== h && c.push(new n.Vector2(h[d], h[d + 1]));
                    var p = function (e, r, i) {
                        var o = void 0 !== a ? [l[e].clone(), l[r].clone(), l[i].clone()] : [],
                            u = void 0 !== s ? [t.colors[e].clone(), t.colors[r].clone(), t.colors[i].clone()] : [];
                        t.faces.push(new n.Face3(e, r, i, o, u)), void 0 !== h && t.faceVertexUvs[0].push([c[e].clone(), c[r].clone(), c[i].clone()])
                    };
                    if (void 0 !== o) {
                        var f = e.drawcalls;
                        if (f.length > 0)
                            for (var u = 0; u < f.length; u++)
                                for (var m = f[u], g = m.start, v = m.count, y = m.index, d = g, x = g + v; x > d; d += 3) p(y + o[d], y + o[d + 1], y + o[d + 2]);
                        else
                            for (var u = 0; u < o.length; u += 3) p(o[u], o[u + 1], o[u + 2])
                    } else
                        for (var u = 0; u < i.length / 3; u += 3) p(u, u + 1, u + 2);
                    return this.computeFaceNormals(), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), this
                },
                center: function () {
                    this.computeBoundingBox();
                    var e = this.boundingBox.center().negate();
                    return this.applyMatrix((new n.Matrix4).setPosition(e)), e
                },
                computeFaceNormals: function () {
                    for (var e = new n.Vector3, t = new n.Vector3, r = 0, i = this.faces.length; i > r; r++) {
                        var o = this.faces[r],
                            a = this.vertices[o.a],
                            s = this.vertices[o.b],
                            h = this.vertices[o.c];
                        e.subVectors(h, s), t.subVectors(a, s), e.cross(t), e.normalize(), o.normal.copy(e)
                    }
                },
                computeVertexNormals: function (e) {
                    var t, r, i, o, a, s;
                    for (s = new Array(this.vertices.length), t = 0, r = this.vertices.length; r > t; t++) s[t] = new n.Vector3;
                    if (e) {
                        var h, l, c, u = new n.Vector3,
                            d = new n.Vector3;
                        for (i = 0, o = this.faces.length; o > i; i++) a = this.faces[i], h = this.vertices[a.a], l = this.vertices[a.b], c = this.vertices[a.c], u.subVectors(c, l), d.subVectors(h, l), u.cross(d), s[a.a].add(u), s[a.b].add(u), s[a.c].add(u)
                    } else
                        for (i = 0, o = this.faces.length; o > i; i++) a = this.faces[i], s[a.a].add(a.normal), s[a.b].add(a.normal), s[a.c].add(a.normal);
                    for (t = 0, r = this.vertices.length; r > t; t++) s[t].normalize();
                    for (i = 0, o = this.faces.length; o > i; i++) a = this.faces[i], a.vertexNormals[0] = s[a.a].clone(), a.vertexNormals[1] = s[a.b].clone(), a.vertexNormals[2] = s[a.c].clone()
                },
                computeMorphNormals: function () {
                    var e, t, r, i, o;
                    for (r = 0, i = this.faces.length; i > r; r++)
                        for (o = this.faces[r], o.__originalFaceNormal ? o.__originalFaceNormal.copy(o.normal) : o.__originalFaceNormal = o.normal.clone(), o.__originalVertexNormals || (o.__originalVertexNormals = []), e = 0, t = o.vertexNormals.length; t > e; e++) o.__originalVertexNormals[e] ? o.__originalVertexNormals[e].copy(o.vertexNormals[e]) : o.__originalVertexNormals[e] = o.vertexNormals[e].clone();
                    var a = new n.Geometry;
                    for (a.faces = this.faces, e = 0, t = this.morphTargets.length; t > e; e++) {
                        if (!this.morphNormals[e]) {
                            this.morphNormals[e] = {}, this.morphNormals[e].faceNormals = [], this.morphNormals[e].vertexNormals = [];
                            var s, h, l = this.morphNormals[e].faceNormals,
                                c = this.morphNormals[e].vertexNormals;
                            for (r = 0, i = this.faces.length; i > r; r++) s = new n.Vector3, h = {
                                a: new n.Vector3,
                                b: new n.Vector3,
                                c: new n.Vector3
                            }, l.push(s), c.push(h)
                        }
                        var u = this.morphNormals[e];

                        a.vertices = this.morphTargets[e].vertices, a.computeFaceNormals(), a.computeVertexNormals();
                        var s, h;
                        for (r = 0, i = this.faces.length; i > r; r++) o = this.faces[r], s = u.faceNormals[r], h = u.vertexNormals[r], s.copy(o.normal), h.a.copy(o.vertexNormals[0]), h.b.copy(o.vertexNormals[1]), h.c.copy(o.vertexNormals[2])
                    }
                    for (r = 0, i = this.faces.length; i > r; r++) o = this.faces[r], o.normal = o.__originalFaceNormal, o.vertexNormals = o.__originalVertexNormals
                },
                computeTangents: function () {
                    function e(e, t, r, i, n, o, a) {
                        c = e.vertices[t], u = e.vertices[r], d = e.vertices[i], p = l[n], f = l[o], m = l[a], g = u.x - c.x, v = d.x - c.x, y = u.y - c.y, x = d.y - c.y, _ = u.z - c.z, b = d.z - c.z, w = f.x - p.x, M = m.x - p.x, S = f.y - p.y, E = m.y - p.y, T = 1 / (w * E - M * S), F.set((E * g - S * v) * T, (E * y - S * x) * T, (E * _ - S * b) * T), B.set((w * v - M * g) * T, (w * x - M * y) * T, (w * b - M * _) * T), R[t].add(F), R[r].add(F), R[i].add(F), P[t].add(B), P[r].add(B), P[i].add(B)
                    }
                    var t, r, i, o, a, s, h, l, c, u, d, p, f, m, g, v, y, x, _, b, w, M, S, E, T, A, C, L, R = [],
                        P = [],
                        F = new n.Vector3,
                        B = new n.Vector3,
                        D = new n.Vector3,
                        U = new n.Vector3,
                        k = new n.Vector3;
                    for (i = 0, o = this.vertices.length; o > i; i++) R[i] = new n.Vector3, P[i] = new n.Vector3;
                    for (t = 0, r = this.faces.length; r > t; t++) h = this.faces[t], l = this.faceVertexUvs[0][t], e(this, h.a, h.b, h.c, 0, 1, 2);
                    var V = ["a", "b", "c", "d"];
                    for (t = 0, r = this.faces.length; r > t; t++)
                        for (h = this.faces[t], a = 0; a < Math.min(h.vertexNormals.length, 3); a++) k.copy(h.vertexNormals[a]), s = h[V[a]], A = R[s], D.copy(A), D.sub(k.multiplyScalar(k.dot(A))).normalize(), U.crossVectors(h.vertexNormals[a], A), C = U.dot(P[s]), L = 0 > C ? -1 : 1, h.vertexTangents[a] = new n.Vector4(D.x, D.y, D.z, L);
                    this.hasTangents = !0
                },
                computeLineDistances: function () {
                    for (var e = 0, t = this.vertices, r = 0, i = t.length; i > r; r++) r > 0 && (e += t[r].distanceTo(t[r - 1])), this.lineDistances[r] = e
                },
                computeBoundingBox: function () {
                    null === this.boundingBox && (this.boundingBox = new n.Box3), this.boundingBox.setFromPoints(this.vertices)
                },
                computeBoundingSphere: function () {
                    null === this.boundingSphere && (this.boundingSphere = new n.Sphere), this.boundingSphere.setFromPoints(this.vertices)
                },
                merge: function (e, t, r) {
                    if (e instanceof n.Geometry == !1) return void n.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", e);
                    var i, o = this.vertices.length,
                        a = this.vertices,
                        s = e.vertices,
                        h = this.faces,
                        l = e.faces,
                        c = this.faceVertexUvs[0],
                        u = e.faceVertexUvs[0];
                    void 0 === r && (r = 0), void 0 !== t && (i = (new n.Matrix3).getNormalMatrix(t));
                    for (var d = 0, p = s.length; p > d; d++) {
                        var f = s[d],
                            m = f.clone();
                        void 0 !== t && m.applyMatrix4(t), a.push(m)
                    }
                    for (d = 0, p = l.length; p > d; d++) {
                        var g, v, y, x = l[d],
                            _ = x.vertexNormals,
                            b = x.vertexColors;
                        g = new n.Face3(x.a + o, x.b + o, x.c + o), g.normal.copy(x.normal), void 0 !== i && g.normal.applyMatrix3(i).normalize();
                        for (var w = 0, M = _.length; M > w; w++) v = _[w].clone(), void 0 !== i && v.applyMatrix3(i).normalize(), g.vertexNormals.push(v);
                        g.color.copy(x.color);
                        for (var w = 0, M = b.length; M > w; w++) y = b[w], g.vertexColors.push(y.clone());
                        g.materialIndex = x.materialIndex + r, h.push(g)
                    }
                    for (d = 0, p = u.length; p > d; d++) {
                        var S = u[d],
                            E = [];
                        if (void 0 !== S) {
                            for (var w = 0, M = S.length; M > w; w++) E.push(S[w].clone());
                            c.push(E)
                        }
                    }
                },
                mergeMesh: function (e) {
                    return e instanceof n.Mesh == !1 ? void n.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", e) : (e.matrixAutoUpdate && e.updateMatrix(), void this.merge(e.geometry, e.matrix))
                },
                mergeVertices: function () {
                    var e, t, r, i, n, o, a, s, h = {},
                        l = [],
                        c = [],
                        u = 4,
                        d = Math.pow(10, u);
                    for (r = 0, i = this.vertices.length; i > r; r++) e = this.vertices[r], t = Math.round(e.x * d) + "_" + Math.round(e.y * d) + "_" + Math.round(e.z * d), void 0 === h[t] ? (h[t] = r, l.push(this.vertices[r]), c[r] = l.length - 1) : c[r] = c[h[t]];
                    var p = [];
                    for (r = 0, i = this.faces.length; i > r; r++) {
                        n = this.faces[r], n.a = c[n.a], n.b = c[n.b], n.c = c[n.c], o = [n.a, n.b, n.c];
                        for (var f = -1, m = 0; 3 > m; m++)
                            if (o[m] == o[(m + 1) % 3]) {
                                f = m, p.push(r);
                                break
                            }
                    }
                    for (r = p.length - 1; r >= 0; r--) {
                        var g = p[r];
                        for (this.faces.splice(g, 1), a = 0, s = this.faceVertexUvs.length; s > a; a++) this.faceVertexUvs[a].splice(g, 1)
                    }
                    var v = this.vertices.length - l.length;
                    return this.vertices = l, v
                },
                toJSON: function () {
                    function e(e, t, r) {
                        return r ? e | 1 << t : e & ~(1 << t)
                    }

                    function t(e) {
                        var t = e.x.toString() + e.y.toString() + e.z.toString();
                        return void 0 !== d[t] ? d[t] : (d[t] = u.length / 3, u.push(e.x, e.y, e.z), d[t])
                    }

                    function r(e) {
                        var t = e.r.toString() + e.g.toString() + e.b.toString();
                        return void 0 !== f[t] ? f[t] : (f[t] = p.length, p.push(e.getHex()), f[t])
                    }

                    function i(e) {
                        var t = e.x.toString() + e.y.toString();
                        return void 0 !== g[t] ? g[t] : (g[t] = m.length / 2, m.push(e.x, e.y), g[t])
                    }
                    var n = {
                        metadata: {
                            version: 4,
                            type: "BufferGeometry",
                            generator: "BufferGeometryExporter"
                        },
                        uuid: this.uuid,
                        type: this.type
                    };
                    if ("" !== this.name && (n.name = this.name), void 0 !== this.parameters) {
                        var o = this.parameters;
                        for (var a in o) void 0 !== o[a] && (n[a] = o[a]);
                        return n
                    }
                    for (var s = [], h = 0; h < this.vertices.length; h++) {
                        var l = this.vertices[h];
                        s.push(l.x, l.y, l.z)
                    }
                    for (var c = [], u = [], d = {}, p = [], f = {}, m = [], g = {}, h = 0; h < this.faces.length; h++) {
                        var v = this.faces[h],
                            y = !1,
                            x = !1,
                            _ = void 0 !== this.faceVertexUvs[0][h],
                            b = v.normal.length() > 0,
                            w = v.vertexNormals.length > 0,
                            M = 1 !== v.color.r || 1 !== v.color.g || 1 !== v.color.b,
                            S = v.vertexColors.length > 0,
                            E = 0;
                        if (E = e(E, 0, 0), E = e(E, 1, y), E = e(E, 2, x), E = e(E, 3, _), E = e(E, 4, b), E = e(E, 5, w), E = e(E, 6, M), E = e(E, 7, S), c.push(E), c.push(v.a, v.b, v.c), _) {
                            var T = this.faceVertexUvs[0][h];
                            c.push(i(T[0]), i(T[1]), i(T[2]))
                        }
                        if (b && c.push(t(v.normal)), w) {
                            var A = v.vertexNormals;
                            c.push(t(A[0]), t(A[1]), t(A[2]))
                        }
                        if (M && c.push(r(v.color)), S) {
                            var C = v.vertexColors;
                            c.push(r(C[0]), r(C[1]), r(C[2]))
                        }
                    }
                    return n.data = {}, n.data.vertices = s, n.data.normals = u, p.length > 0 && (n.data.colors = p), m.length > 0 && (n.data.uvs = [m]), n.data.faces = c, n
                },
                clone: function () {
                    for (var e = new n.Geometry, t = this.vertices, r = 0, i = t.length; i > r; r++) e.vertices.push(t[r].clone());
                    for (var o = this.faces, r = 0, i = o.length; i > r; r++) e.faces.push(o[r].clone());
                    for (var r = 0, i = this.faceVertexUvs.length; i > r; r++) {
                        var a = this.faceVertexUvs[r];
                        void 0 === e.faceVertexUvs[r] && (e.faceVertexUvs[r] = []);
                        for (var s = 0, h = a.length; h > s; s++) {
                            for (var l = a[s], c = [], u = 0, d = l.length; d > u; u++) {
                                var p = l[u];
                                c.push(p.clone())
                            }
                            e.faceVertexUvs[r].push(c)
                        }
                    }
                    return e
                },
                dispose: function () {
                    this.dispatchEvent({
                        type: "dispose"
                    })
                }
            }, n.EventDispatcher.prototype.apply(n.Geometry.prototype), n.GeometryIdCount = 0, n.Camera = function () {
                n.Object3D.call(this), this.type = "Camera", this.matrixWorldInverse = new n.Matrix4, this.projectionMatrix = new n.Matrix4
            }, n.Camera.prototype = Object.create(n.Object3D.prototype), n.Camera.prototype.constructor = n.Camera, n.Camera.prototype.getWorldDirection = function () {
                var e = new n.Quaternion;
                return function (t) {
                    var r = t || new n.Vector3;
                    return this.getWorldQuaternion(e), r.set(0, 0, -1).applyQuaternion(e)
                }
            }(), n.Camera.prototype.lookAt = function () {
                var e = new n.Matrix4;
                return function (t) {
                    e.lookAt(this.position, t, this.up), this.quaternion.setFromRotationMatrix(e)
                }
            }(), n.Camera.prototype.clone = function (e) {
                return void 0 === e && (e = new n.Camera), n.Object3D.prototype.clone.call(this, e), e.matrixWorldInverse.copy(this.matrixWorldInverse), e.projectionMatrix.copy(this.projectionMatrix), e
            }, n.CubeCamera = function (e, t, r) {
                n.Object3D.call(this), this.type = "CubeCamera";
                var i = 90,
                    o = 1,
                    a = new n.PerspectiveCamera(i, o, e, t);
                a.up.set(0, -1, 0), a.lookAt(new n.Vector3(1, 0, 0)), this.add(a);
                var s = new n.PerspectiveCamera(i, o, e, t);
                s.up.set(0, -1, 0), s.lookAt(new n.Vector3(-1, 0, 0)), this.add(s);
                var h = new n.PerspectiveCamera(i, o, e, t);
                h.up.set(0, 0, 1), h.lookAt(new n.Vector3(0, 1, 0)), this.add(h);
                var l = new n.PerspectiveCamera(i, o, e, t);
                l.up.set(0, 0, -1), l.lookAt(new n.Vector3(0, -1, 0)), this.add(l);
                var c = new n.PerspectiveCamera(i, o, e, t);
                c.up.set(0, -1, 0), c.lookAt(new n.Vector3(0, 0, 1)), this.add(c);
                var u = new n.PerspectiveCamera(i, o, e, t);
                u.up.set(0, -1, 0), u.lookAt(new n.Vector3(0, 0, -1)), this.add(u), this.renderTarget = new n.WebGLRenderTargetCube(r, r, {
                    format: n.RGBFormat,
                    magFilter: n.LinearFilter,
                    minFilter: n.LinearFilter
                }), this.updateCubeMap = function (e, t) {
                    var r = this.renderTarget,
                        i = r.generateMipmaps;
                    r.generateMipmaps = !1, r.activeCubeFace = 0, e.render(t, a, r), r.activeCubeFace = 1, e.render(t, s, r), r.activeCubeFace = 2, e.render(t, h, r), r.activeCubeFace = 3, e.render(t, l, r), r.activeCubeFace = 4, e.render(t, c, r), r.generateMipmaps = i, r.activeCubeFace = 5, e.render(t, u, r)
                }
            }, n.CubeCamera.prototype = Object.create(n.Object3D.prototype), n.CubeCamera.prototype.constructor = n.CubeCamera, n.OrthographicCamera = function (e, t, r, i, o, a) {
                n.Camera.call(this), this.type = "OrthographicCamera", this.zoom = 1, this.left = e, this.right = t, this.top = r, this.bottom = i, this.near = void 0 !== o ? o : .1, this.far = void 0 !== a ? a : 2e3, this.updateProjectionMatrix()
            }, n.OrthographicCamera.prototype = Object.create(n.Camera.prototype), n.OrthographicCamera.prototype.constructor = n.OrthographicCamera, n.OrthographicCamera.prototype.updateProjectionMatrix = function () {
                var e = (this.right - this.left) / (2 * this.zoom),
                    t = (this.top - this.bottom) / (2 * this.zoom),
                    r = (this.right + this.left) / 2,
                    i = (this.top + this.bottom) / 2;
                this.projectionMatrix.makeOrthographic(r - e, r + e, i + t, i - t, this.near, this.far)
            }, n.OrthographicCamera.prototype.clone = function () {
                var e = new n.OrthographicCamera;
                return n.Camera.prototype.clone.call(this, e), e.zoom = this.zoom, e.left = this.left, e.right = this.right, e.top = this.top, e.bottom = this.bottom, e.near = this.near, e.far = this.far, e.projectionMatrix.copy(this.projectionMatrix), e
            }, n.PerspectiveCamera = function (e, t, r, i) {
                n.Camera.call(this), this.type = "PerspectiveCamera", this.zoom = 1, this.fov = void 0 !== e ? e : 50, this.aspect = void 0 !== t ? t : 1, this.near = void 0 !== r ? r : .1, this.far = void 0 !== i ? i : 2e3, this.updateProjectionMatrix()
            }, n.PerspectiveCamera.prototype = Object.create(n.Camera.prototype), n.PerspectiveCamera.prototype.constructor = n.PerspectiveCamera, n.PerspectiveCamera.prototype.setLens = function (e, t) {
                void 0 === t && (t = 24), this.fov = 2 * n.Math.radToDeg(Math.atan(t / (2 * e))), this.updateProjectionMatrix()
            }, n.PerspectiveCamera.prototype.setViewOffset = function (e, t, r, i, n, o) {
                this.fullWidth = e, this.fullHeight = t, this.x = r, this.y = i, this.width = n, this.height = o, this.updateProjectionMatrix()
            }, n.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
                var e = n.Math.radToDeg(2 * Math.atan(Math.tan(.5 * n.Math.degToRad(this.fov)) / this.zoom));
                if (this.fullWidth) {
                    var t = this.fullWidth / this.fullHeight,
                        r = Math.tan(n.Math.degToRad(.5 * e)) * this.near,
                        i = -r,
                        o = t * i,
                        a = t * r,
                        s = Math.abs(a - o),
                        h = Math.abs(r - i);
                    this.projectionMatrix.makeFrustum(o + this.x * s / this.fullWidth, o + (this.x + this.width) * s / this.fullWidth, r - (this.y + this.height) * h / this.fullHeight, r - this.y * h / this.fullHeight, this.near, this.far)
                } else this.projectionMatrix.makePerspective(e, this.aspect, this.near, this.far)
            }, n.PerspectiveCamera.prototype.clone = function () {
                var e = new n.PerspectiveCamera;
                return n.Camera.prototype.clone.call(this, e), e.zoom = this.zoom, e.fov = this.fov, e.aspect = this.aspect, e.near = this.near, e.far = this.far, e.projectionMatrix.copy(this.projectionMatrix), e
            }, n.Light = function (e) {
                n.Object3D.call(this), this.type = "Light", this.color = new n.Color(e)
            }, n.Light.prototype = Object.create(n.Object3D.prototype), n.Light.prototype.constructor = n.Light, n.Light.prototype.clone = function (e) {
                return void 0 === e && (e = new n.Light), n.Object3D.prototype.clone.call(this, e), e.color.copy(this.color), e
            }, n.AmbientLight = function (e) {
                n.Light.call(this, e), this.type = "AmbientLight"
            }, n.AmbientLight.prototype = Object.create(n.Light.prototype), n.AmbientLight.prototype.constructor = n.AmbientLight, n.AmbientLight.prototype.clone = function () {
                var e = new n.AmbientLight;
                return n.Light.prototype.clone.call(this, e), e
            }, n.AreaLight = function (e, t) {
                n.Light.call(this, e), this.type = "AreaLight", this.normal = new n.Vector3(0, -1, 0), this.right = new n.Vector3(1, 0, 0), this.intensity = void 0 !== t ? t : 1, this.width = 1, this.height = 1, this.constantAttenuation = 1.5, this.linearAttenuation = .5, this.quadraticAttenuation = .1
            }, n.AreaLight.prototype = Object.create(n.Light.prototype), n.AreaLight.prototype.constructor = n.AreaLight, n.DirectionalLight = function (e, t) {
                n.Light.call(this, e), this.type = "DirectionalLight", this.position.set(0, 1, 0), this.target = new n.Object3D, this.intensity = void 0 !== t ? t : 1, this.castShadow = !1, this.onlyShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraLeft = -500, this.shadowCameraRight = 500, this.shadowCameraTop = 500, this.shadowCameraBottom = -500, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, this.shadowMapHeight = 512, this.shadowCascade = !1, this.shadowCascadeOffset = new n.Vector3(0, 0, -1e3), this.shadowCascadeCount = 2, this.shadowCascadeBias = [0, 0, 0], this.shadowCascadeWidth = [512, 512, 512], this.shadowCascadeHeight = [512, 512, 512], this.shadowCascadeNearZ = [-1, .99, .998], this.shadowCascadeFarZ = [.99, .998, 1], this.shadowCascadeArray = [], this.shadowMap = null, this.shadowMapSize = null, this.shadowCamera = null, this.shadowMatrix = null
            }, n.DirectionalLight.prototype = Object.create(n.Light.prototype), n.DirectionalLight.prototype.constructor = n.DirectionalLight, n.DirectionalLight.prototype.clone = function () {
                var e = new n.DirectionalLight;
                return n.Light.prototype.clone.call(this, e), e.target = this.target.clone(), e.intensity = this.intensity, e.castShadow = this.castShadow, e.onlyShadow = this.onlyShadow, e.shadowCameraNear = this.shadowCameraNear, e.shadowCameraFar = this.shadowCameraFar, e.shadowCameraLeft = this.shadowCameraLeft, e.shadowCameraRight = this.shadowCameraRight, e.shadowCameraTop = this.shadowCameraTop, e.shadowCameraBottom = this.shadowCameraBottom, e.shadowCameraVisible = this.shadowCameraVisible, e.shadowBias = this.shadowBias, e.shadowDarkness = this.shadowDarkness, e.shadowMapWidth = this.shadowMapWidth, e.shadowMapHeight = this.shadowMapHeight, e.shadowCascade = this.shadowCascade, e.shadowCascadeOffset.copy(this.shadowCascadeOffset), e.shadowCascadeCount = this.shadowCascadeCount, e.shadowCascadeBias = this.shadowCascadeBias.slice(0), e.shadowCascadeWidth = this.shadowCascadeWidth.slice(0), e.shadowCascadeHeight = this.shadowCascadeHeight.slice(0), e.shadowCascadeNearZ = this.shadowCascadeNearZ.slice(0), e.shadowCascadeFarZ = this.shadowCascadeFarZ.slice(0), e
            }, n.HemisphereLight = function (e, t, r) {
                n.Light.call(this, e), this.type = "HemisphereLight", this.position.set(0, 100, 0), this.groundColor = new n.Color(t), this.intensity = void 0 !== r ? r : 1
            }, n.HemisphereLight.prototype = Object.create(n.Light.prototype), n.HemisphereLight.prototype.constructor = n.HemisphereLight, n.HemisphereLight.prototype.clone = function () {
                var e = new n.HemisphereLight;
                return n.Light.prototype.clone.call(this, e), e.groundColor.copy(this.groundColor), e.intensity = this.intensity, e
            }, n.PointLight = function (e, t, r, i) {
                n.Light.call(this, e), this.type = "PointLight", this.intensity = void 0 !== t ? t : 1, this.distance = void 0 !== r ? r : 0, this.decay = void 0 !== i ? i : 1
            }, n.PointLight.prototype = Object.create(n.Light.prototype), n.PointLight.prototype.constructor = n.PointLight, n.PointLight.prototype.clone = function () {
                var e = new n.PointLight;
                return n.Light.prototype.clone.call(this, e), e.intensity = this.intensity, e.distance = this.distance, e.decay = this.decay, e
            }, n.SpotLight = function (e, t, r, i, o, a) {
                n.Light.call(this, e), this.type = "SpotLight", this.position.set(0, 1, 0), this.target = new n.Object3D, this.intensity = void 0 !== t ? t : 1, this.distance = void 0 !== r ? r : 0, this.angle = void 0 !== i ? i : Math.PI / 3, this.exponent = void 0 !== o ? o : 10, this.decay = void 0 !== a ? a : 1, this.castShadow = !1, this.onlyShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraFov = 50, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, this.shadowMapHeight = 512, this.shadowMap = null, this.shadowMapSize = null, this.shadowCamera = null, this.shadowMatrix = null
            }, n.SpotLight.prototype = Object.create(n.Light.prototype), n.SpotLight.prototype.constructor = n.SpotLight, n.SpotLight.prototype.clone = function () {
                var e = new n.SpotLight;
                return n.Light.prototype.clone.call(this, e), e.target = this.target.clone(), e.intensity = this.intensity, e.distance = this.distance, e.angle = this.angle, e.exponent = this.exponent, e.decay = this.decay, e.castShadow = this.castShadow, e.onlyShadow = this.onlyShadow, e.shadowCameraNear = this.shadowCameraNear, e.shadowCameraFar = this.shadowCameraFar, e.shadowCameraFov = this.shadowCameraFov, e.shadowCameraVisible = this.shadowCameraVisible, e.shadowBias = this.shadowBias, e.shadowDarkness = this.shadowDarkness, e.shadowMapWidth = this.shadowMapWidth, e.shadowMapHeight = this.shadowMapHeight, e
            }, n.Cache = {
                files: {},
                add: function (e, t) {
                    this.files[e] = t
                },
                get: function (e) {
                    return this.files[e]
                },
                remove: function (e) {
                    delete this.files[e]
                },
                clear: function () {
                    this.files = {}
                }
            }, n.Loader = function (e) {
                this.showStatus = e, this.statusDomElement = e ? n.Loader.prototype.addStatusElement() : null, this.imageLoader = new n.ImageLoader, this.onLoadStart = function () {}, this.onLoadProgress = function () {}, this.onLoadComplete = function () {}
            }, n.Loader.prototype = {
                constructor: n.Loader,
                crossOrigin: void 0,
                addStatusElement: function () {
                    var e = document.createElement("div");
                    return e.style.position = "absolute", e.style.right = "0px", e.style.top = "0px", e.style.fontSize = "0.8em", e.style.textAlign = "left", e.style.background = "rgba(0,0,0,0.25)", e.style.color = "#fff", e.style.width = "120px", e.style.padding = "0.5em 0.5em 0.5em 0.5em", e.style.zIndex = 1e3, e.innerHTML = "Loading ...", e
                },
                updateProgress: function (e) {
                    var t = "Loaded ";
                    t += e.total ? (100 * e.loaded / e.total).toFixed(0) + "%" : (e.loaded / 1024).toFixed(2) + " KB", this.statusDomElement.innerHTML = t
                },
                extractUrlBase: function (e) {
                    var t = e.split("/");
                    return 1 === t.length ? "./" : (t.pop(), t.join("/") + "/")
                },
                initMaterials: function (e, t) {
                    for (var r = [], i = 0; i < e.length; ++i) r[i] = this.createMaterial(e[i], t);
                    return r
                },
                needsTangents: function (e) {
                    for (var t = 0, r = e.length; r > t; t++) {
                        var i = e[t];
                        if (i instanceof n.ShaderMaterial) return !0
                    }
                    return !1
                },
                createMaterial: function (e, t) {
                    function r(e) {
                        var t = Math.log(e) / Math.LN2;
                        return Math.pow(2, Math.round(t))
                    }

                    function i(e, i, o, s, h, l, c) {
                        var u, d = t + o,
                            p = n.Loader.Handlers.get(d);
                        if (null !== p ? u = p.load(d) : (u = new n.Texture, p = a.imageLoader, p.crossOrigin = a.crossOrigin, p.load(d, function (e) {
                                if (n.Math.isPowerOfTwo(e.width) === !1 || n.Math.isPowerOfTwo(e.height) === !1) {
                                    var t = r(e.width),
                                        i = r(e.height),
                                        o = document.createElement("canvas");
                                    o.width = t, o.height = i;
                                    var a = o.getContext("2d");
                                    a.drawImage(e, 0, 0, t, i), u.image = o
                                } else u.image = e;
                                u.needsUpdate = !0
                            })), u.sourceFile = o, s && (u.repeat.set(s[0], s[1]), 1 !== s[0] && (u.wrapS = n.RepeatWrapping), 1 !== s[1] && (u.wrapT = n.RepeatWrapping)), h && u.offset.set(h[0], h[1]), l) {
                            var f = {
                                repeat: n.RepeatWrapping,
                                mirror: n.MirroredRepeatWrapping
                            };
                            void 0 !== f[l[0]] && (u.wrapS = f[l[0]]), void 0 !== f[l[1]] && (u.wrapT = f[l[1]])
                        }
                        c && (u.anisotropy = c), e[i] = u
                    }

                    function o(e) {
                        return (255 * e[0] << 16) + (255 * e[1] << 8) + 255 * e[2]
                    }
                    var a = this,
                        s = "MeshLambertMaterial",
                        h = {
                            color: 15658734,
                            opacity: 1,
                            map: null,
                            lightMap: null,
                            normalMap: null,
                            bumpMap: null,
                            wireframe: !1
                        };
                    if (e.shading) {
                        var l = e.shading.toLowerCase();
                        "phong" === l ? s = "MeshPhongMaterial" : "basic" === l && (s = "MeshBasicMaterial")
                    }
                    void 0 !== e.blending && void 0 !== n[e.blending] && (h.blending = n[e.blending]), void 0 !== e.transparent && (h.transparent = e.transparent), void 0 !== e.opacity && e.opacity < 1 && (h.transparent = !0), void 0 !== e.depthTest && (h.depthTest = e.depthTest), void 0 !== e.depthWrite && (h.depthWrite = e.depthWrite), void 0 !== e.visible && (h.visible = e.visible), void 0 !== e.flipSided && (h.side = n.BackSide), void 0 !== e.doubleSided && (h.side = n.DoubleSide), void 0 !== e.wireframe && (h.wireframe = e.wireframe), void 0 !== e.vertexColors && ("face" === e.vertexColors ? h.vertexColors = n.FaceColors : e.vertexColors && (h.vertexColors = n.VertexColors)), e.colorDiffuse ? h.color = o(e.colorDiffuse) : e.DbgColor && (h.color = e.DbgColor), e.colorSpecular && (h.specular = o(e.colorSpecular)), e.colorEmissive && (h.emissive = o(e.colorEmissive)), void 0 !== e.transparency && (console.warn("THREE.Loader: transparency has been renamed to opacity"), e.opacity = e.transparency), void 0 !== e.opacity && (h.opacity = e.opacity), e.specularCoef && (h.shininess = e.specularCoef), e.mapDiffuse && t && i(h, "map", e.mapDiffuse, e.mapDiffuseRepeat, e.mapDiffuseOffset, e.mapDiffuseWrap, e.mapDiffuseAnisotropy), e.mapLight && t && i(h, "lightMap", e.mapLight, e.mapLightRepeat, e.mapLightOffset, e.mapLightWrap, e.mapLightAnisotropy), e.mapBump && t && i(h, "bumpMap", e.mapBump, e.mapBumpRepeat, e.mapBumpOffset, e.mapBumpWrap, e.mapBumpAnisotropy), e.mapNormal && t && i(h, "normalMap", e.mapNormal, e.mapNormalRepeat, e.mapNormalOffset, e.mapNormalWrap, e.mapNormalAnisotropy), e.mapSpecular && t && i(h, "specularMap", e.mapSpecular, e.mapSpecularRepeat, e.mapSpecularOffset, e.mapSpecularWrap, e.mapSpecularAnisotropy), e.mapAlpha && t && i(h, "alphaMap", e.mapAlpha, e.mapAlphaRepeat, e.mapAlphaOffset, e.mapAlphaWrap, e.mapAlphaAnisotropy), e.mapBumpScale && (h.bumpScale = e.mapBumpScale), e.mapNormalFactor && (h.normalScale = new n.Vector2(e.mapNormalFactor, e.mapNormalFactor));
                    var c = new n[s](h);
                    return void 0 !== e.DbgName && (c.name = e.DbgName), c
                }
            }, n.Loader.Handlers = {
                handlers: [],
                add: function (e, t) {
                    this.handlers.push(e, t)
                },
                get: function (e) {
                    for (var t = 0, r = this.handlers.length; r > t; t += 2) {
                        var i = this.handlers[t],
                            n = this.handlers[t + 1];
                        if (i.test(e)) return n
                    }
                    return null
                }
            }, n.XHRLoader = function (e) {
                this.manager = void 0 !== e ? e : n.DefaultLoadingManager
            }, n.XHRLoader.prototype = {
                constructor: n.XHRLoader,
                load: function (e, t, r, i) {
                    var o = this,
                        a = n.Cache.get(e);
                    if (void 0 !== a) return void(t && t(a));
                    var s = new XMLHttpRequest;
                    s.open("GET", e, !0), s.addEventListener("load", function () {
                        n.Cache.add(e, this.response), t && t(this.response), o.manager.itemEnd(e)
                    }, !1), void 0 !== r && s.addEventListener("progress", function (e) {
                        r(e)
                    }, !1), void 0 !== i && s.addEventListener("error", function (e) {
                        i(e)
                    }, !1), void 0 !== this.crossOrigin && (s.crossOrigin = this.crossOrigin), void 0 !== this.responseType && (s.responseType = this.responseType), s.send(null), o.manager.itemStart(e)
                },
                setResponseType: function (e) {
                    this.responseType = e
                },
                setCrossOrigin: function (e) {
                    this.crossOrigin = e
                }
            }, n.ImageLoader = function (e) {
                this.manager = void 0 !== e ? e : n.DefaultLoadingManager
            }, n.ImageLoader.prototype = {
                constructor: n.ImageLoader,
                load: function (e, t, r, i) {
                    var o = this,
                        a = n.Cache.get(e);
                    if (void 0 !== a) return void t(a);
                    var s = document.createElement("img");
                    return s.addEventListener("load", function () {
                        n.Cache.add(e, this), t && t(this), o.manager.itemEnd(e)
                    }, !1), void 0 !== r && s.addEventListener("progress", function (e) {
                        r(e)
                    }, !1), void 0 !== i && s.addEventListener("error", function (e) {
                        i(e)
                    }, !1), void 0 !== this.crossOrigin && (s.crossOrigin = this.crossOrigin), s.src = e, o.manager.itemStart(e), s
                },
                setCrossOrigin: function (e) {
                    this.crossOrigin = e
                }
            }, n.JSONLoader = function (e) {
                n.Loader.call(this, e), this.withCredentials = !1
            }, n.JSONLoader.prototype = Object.create(n.Loader.prototype), n.JSONLoader.prototype.constructor = n.JSONLoader, n.JSONLoader.prototype.load = function (e, t, r) {
                r = r && "string" == typeof r ? r : this.extractUrlBase(e), this.onLoadStart(), this.loadAjaxJSON(this, e, t, r)
            }, n.JSONLoader.prototype.loadAjaxJSON = function (e, t, r, i, o) {
                var a = new XMLHttpRequest,
                    s = 0;
                a.onreadystatechange = function () {
                    if (a.readyState === a.DONE)
                        if (200 === a.status || 0 === a.status) {
                            if (a.responseText) {
                                var h = JSON.parse(a.responseText),
                                    l = h.metadata;
                                if (void 0 !== l) {
                                    if ("object" === l.type) return void n.error("THREE.JSONLoader: " + t + " should be loaded with THREE.ObjectLoader instead.");
                                    if ("scene" === l.type) return void n.error("THREE.JSONLoader: " + t + " seems to be a Scene. Use THREE.SceneLoader instead.")
                                }
                                var c = e.parse(h, i);
                                r(c.geometry, c.materials)
                            } else n.error("THREE.JSONLoader: " + t + " seems to be unreachable or the file is empty.");
                            e.onLoadComplete()
                        } else n.error("THREE.JSONLoader: Couldn't load " + t + " (" + a.status + ")");
                    else a.readyState === a.LOADING ? o && (0 === s && (s = a.getResponseHeader("Content-Length")), o({
                        total: s,
                        loaded: a.responseText.length
                    })) : a.readyState === a.HEADERS_RECEIVED && void 0 !== o && (s = a.getResponseHeader("Content-Length"))
                }, a.open("GET", t, !0), a.withCredentials = this.withCredentials, a.send(null)
            }, n.JSONLoader.prototype.parse = function (e, t) {
                function r(t) {
                    function r(e, t) {
                        return e & 1 << t
                    }
                    var i, o, s, h, l, c, u, d, p, f, m, g, v, y, x, _, b, w, M, S, E, T, A, C, L, R, P, F = e.faces,
                        B = e.vertices,
                        D = e.normals,
                        U = e.colors,
                        k = 0;
                    if (void 0 !== e.uvs) {
                        for (i = 0; i < e.uvs.length; i++) e.uvs[i].length && k++;
                        for (i = 0; k > i; i++) a.faceVertexUvs[i] = []
                    }
                    for (h = 0, l = B.length; l > h;) w = new n.Vector3, w.x = B[h++] * t, w.y = B[h++] * t, w.z = B[h++] * t, a.vertices.push(w);
                    for (h = 0, l = F.length; l > h;)
                        if (f = F[h++], m = r(f, 0), g = r(f, 1), v = r(f, 3), y = r(f, 4), x = r(f, 5), _ = r(f, 6), b = r(f, 7), m) {
                            if (S = new n.Face3, S.a = F[h], S.b = F[h + 1], S.c = F[h + 3], E = new n.Face3, E.a = F[h + 1], E.b = F[h + 2], E.c = F[h + 3], h += 4, g && (p = F[h++], S.materialIndex = p, E.materialIndex = p), s = a.faces.length, v)
                                for (i = 0; k > i; i++)
                                    for (C = e.uvs[i], a.faceVertexUvs[i][s] = [], a.faceVertexUvs[i][s + 1] = [], o = 0; 4 > o; o++) d = F[h++], R = C[2 * d], P = C[2 * d + 1], L = new n.Vector2(R, P), 2 !== o && a.faceVertexUvs[i][s].push(L), 0 !== o && a.faceVertexUvs[i][s + 1].push(L);
                            if (y && (u = 3 * F[h++], S.normal.set(D[u++], D[u++], D[u]), E.normal.copy(S.normal)), x)
                                for (i = 0; 4 > i; i++) u = 3 * F[h++], A = new n.Vector3(D[u++], D[u++], D[u]), 2 !== i && S.vertexNormals.push(A), 0 !== i && E.vertexNormals.push(A);
                            if (_ && (c = F[h++], T = U[c], S.color.setHex(T), E.color.setHex(T)), b)
                                for (i = 0; 4 > i; i++) c = F[h++], T = U[c], 2 !== i && S.vertexColors.push(new n.Color(T)), 0 !== i && E.vertexColors.push(new n.Color(T));
                            a.faces.push(S), a.faces.push(E)
                        } else {
                            if (M = new n.Face3, M.a = F[h++], M.b = F[h++], M.c = F[h++], g && (p = F[h++], M.materialIndex = p), s = a.faces.length, v)
                                for (i = 0; k > i; i++)
                                    for (C = e.uvs[i], a.faceVertexUvs[i][s] = [], o = 0; 3 > o; o++) d = F[h++], R = C[2 * d], P = C[2 * d + 1], L = new n.Vector2(R, P), a.faceVertexUvs[i][s].push(L);
                            if (y && (u = 3 * F[h++], M.normal.set(D[u++], D[u++], D[u])), x)
                                for (i = 0; 3 > i; i++) u = 3 * F[h++], A = new n.Vector3(D[u++], D[u++], D[u]), M.vertexNormals.push(A);
                            if (_ && (c = F[h++], M.color.setHex(U[c])), b)
                                for (i = 0; 3 > i; i++) c = F[h++], M.vertexColors.push(new n.Color(U[c]));
                            a.faces.push(M)
                        }
                }

                function i() {
                    var t = void 0 !== e.influencesPerVertex ? e.influencesPerVertex : 2;
                    if (e.skinWeights)
                        for (var r = 0, i = e.skinWeights.length; i > r; r += t) {
                            var o = e.skinWeights[r],
                                s = t > 1 ? e.skinWeights[r + 1] : 0,
                                h = t > 2 ? e.skinWeights[r + 2] : 0,
                                l = t > 3 ? e.skinWeights[r + 3] : 0;
                            a.skinWeights.push(new n.Vector4(o, s, h, l))
                        }
                    if (e.skinIndices)
                        for (var r = 0, i = e.skinIndices.length; i > r; r += t) {
                            var c = e.skinIndices[r],
                                u = t > 1 ? e.skinIndices[r + 1] : 0,
                                d = t > 2 ? e.skinIndices[r + 2] : 0,
                                p = t > 3 ? e.skinIndices[r + 3] : 0;
                            a.skinIndices.push(new n.Vector4(c, u, d, p))
                        }
                    a.bones = e.bones, a.bones && a.bones.length > 0 && (a.skinWeights.length !== a.skinIndices.length || a.skinIndices.length !== a.vertices.length) && n.warn("THREE.JSONLoader: When skinning, number of vertices (" + a.vertices.length + "), skinIndices (" + a.skinIndices.length + "), and skinWeights (" + a.skinWeights.length + ") should match."), a.animation = e.animation, a.animations = e.animations
                }

                function o(t) {
                    if (void 0 !== e.morphTargets) {
                        var r, i, o, s, h, l;
                        for (r = 0, i = e.morphTargets.length; i > r; r++)
                            for (a.morphTargets[r] = {}, a.morphTargets[r].name = e.morphTargets[r].name, a.morphTargets[r].vertices = [], h = a.morphTargets[r].vertices, l = e.morphTargets[r].vertices, o = 0, s = l.length; s > o; o += 3) {
                                var c = new n.Vector3;
                                c.x = l[o] * t, c.y = l[o + 1] * t, c.z = l[o + 2] * t, h.push(c)
                            }
                    }
                    if (void 0 !== e.morphColors) {
                        var r, i, u, d, p, f, m;
                        for (r = 0, i = e.morphColors.length; i > r; r++)
                            for (a.morphColors[r] = {}, a.morphColors[r].name = e.morphColors[r].name, a.morphColors[r].colors = [], p = a.morphColors[r].colors, f = e.morphColors[r].colors, u = 0, d = f.length; d > u; u += 3) m = new n.Color(16755200), m.setRGB(f[u], f[u + 1], f[u + 2]), p.push(m)
                    }
                }
                var a = new n.Geometry,
                    s = void 0 !== e.scale ? 1 / e.scale : 1;
                if (r(s), i(), o(s), a.computeFaceNormals(), a.computeBoundingSphere(), void 0 === e.materials || 0 === e.materials.length) return {
                    geometry: a
                };
                var h = this.initMaterials(e.materials, t);
                return this.needsTangents(h) && a.computeTangents(), {
                    geometry: a,
                    materials: h
                }
            }, n.LoadingManager = function (e, t, r) {
                var i = this,
                    n = 0,
                    o = 0;
                this.onLoad = e, this.onProgress = t, this.onError = r, this.itemStart = function () {
                    o++
                }, this.itemEnd = function (e) {
                    n++, void 0 !== i.onProgress && i.onProgress(e, n, o), n === o && void 0 !== i.onLoad && i.onLoad()
                }
            }, n.DefaultLoadingManager = new n.LoadingManager, n.BufferGeometryLoader = function (e) {
                this.manager = void 0 !== e ? e : n.DefaultLoadingManager
            }, n.BufferGeometryLoader.prototype = {
                constructor: n.BufferGeometryLoader,
                load: function (e, t, r, i) {
                    var o = this,
                        a = new n.XHRLoader(o.manager);
                    a.setCrossOrigin(this.crossOrigin), a.load(e, function (e) {
                        t(o.parse(JSON.parse(e)))
                    }, r, i)
                },
                setCrossOrigin: function (e) {
                    this.crossOrigin = e
                },
                parse: function (e) {
                    var t = new n.BufferGeometry,
                        r = e.data.attributes;
                    for (var o in r) {
                        var a = r[o],
                            s = new i[a.type](a.array);
                        t.addAttribute(o, new n.BufferAttribute(s, a.itemSize))
                    }
                    var h = e.data.offsets;
                    void 0 !== h && (t.offsets = JSON.parse(JSON.stringify(h)));
                    var l = e.data.boundingSphere;
                    if (void 0 !== l) {
                        var c = new n.Vector3;
                        void 0 !== l.center && c.fromArray(l.center), t.boundingSphere = new n.Sphere(c, l.radius)
                    }
                    return t
                }
            }, n.MaterialLoader = function (e) {
                this.manager = void 0 !== e ? e : n.DefaultLoadingManager
            }, n.MaterialLoader.prototype = {
                constructor: n.MaterialLoader,
                load: function (e, t, r, i) {
                    var o = this,
                        a = new n.XHRLoader(o.manager);
                    a.setCrossOrigin(this.crossOrigin), a.load(e, function (e) {
                        t(o.parse(JSON.parse(e)))
                    }, r, i)
                },
                setCrossOrigin: function (e) {
                    this.crossOrigin = e
                },
                parse: function (e) {
                    var t = new n[e.type];
                    if (void 0 !== e.color && t.color.setHex(e.color), void 0 !== e.emissive && t.emissive.setHex(e.emissive), void 0 !== e.specular && t.specular.setHex(e.specular), void 0 !== e.shininess && (t.shininess = e.shininess), void 0 !== e.uniforms && (t.uniforms = e.uniforms), void 0 !== e.vertexShader && (t.vertexShader = e.vertexShader), void 0 !== e.fragmentShader && (t.fragmentShader = e.fragmentShader), void 0 !== e.vertexColors && (t.vertexColors = e.vertexColors), void 0 !== e.shading && (t.shading = e.shading), void 0 !== e.blending && (t.blending = e.blending), void 0 !== e.side && (t.side = e.side), void 0 !== e.opacity && (t.opacity = e.opacity), void 0 !== e.transparent && (t.transparent = e.transparent), void 0 !== e.wireframe && (t.wireframe = e.wireframe), void 0 !== e.size && (t.size = e.size), void 0 !== e.sizeAttenuation && (t.sizeAttenuation = e.sizeAttenuation), void 0 !== e.materials)
                        for (var r = 0, i = e.materials.length; i > r; r++) t.materials.push(this.parse(e.materials[r]));
                    return t
                }
            }, n.ObjectLoader = function (e) {
                this.manager = void 0 !== e ? e : n.DefaultLoadingManager, this.texturePath = ""
            }, n.ObjectLoader.prototype = {
                constructor: n.ObjectLoader,
                load: function (e, t, r, i) {
                    "" === this.texturePath && (this.texturePath = e.substring(0, e.lastIndexOf("/") + 1));
                    var o = this,
                        a = new n.XHRLoader(o.manager);
                    a.setCrossOrigin(this.crossOrigin), a.load(e, function (e) {
                        o.parse(JSON.parse(e), t)
                    }, r, i)
                },
                setTexturePath: function (e) {
                    this.texturePath = e
                },
                setCrossOrigin: function (e) {
                    this.crossOrigin = e
                },
                parse: function (e, t) {
                    var r = this.parseGeometries(e.geometries),
                        i = this.parseImages(e.images, function () {
                            void 0 !== t && t(a)
                        }),
                        n = this.parseTextures(e.textures, i),
                        o = this.parseMaterials(e.materials, n),
                        a = this.parseObject(e.object, r, o);
                    return (void 0 === e.images || 0 === e.images.length) && void 0 !== t && t(a), a
                },
                parseGeometries: function (e) {
                    var t = {};
                    if (void 0 !== e)
                        for (var r = new n.JSONLoader, i = new n.BufferGeometryLoader, o = 0, a = e.length; a > o; o++) {
                            var s, h = e[o];
                            switch (h.type) {
                                case "PlaneGeometry":
                                case "PlaneBufferGeometry":
                                    s = new n[h.type](h.width, h.height, h.widthSegments, h.heightSegments);
                                    break;
                                case "BoxGeometry":
                                case "CubeGeometry":
                                    s = new n.BoxGeometry(h.width, h.height, h.depth, h.widthSegments, h.heightSegments, h.depthSegments);
                                    break;
                                case "CircleGeometry":
                                    s = new n.CircleGeometry(h.radius, h.segments);
                                    break;
                                case "CylinderGeometry":
                                    s = new n.CylinderGeometry(h.radiusTop, h.radiusBottom, h.height, h.radialSegments, h.heightSegments, h.openEnded);
                                    break;
                                case "SphereGeometry":
                                    s = new n.SphereGeometry(h.radius, h.widthSegments, h.heightSegments, h.phiStart, h.phiLength, h.thetaStart, h.thetaLength);
                                    break;
                                case "IcosahedronGeometry":
                                    s = new n.IcosahedronGeometry(h.radius, h.detail);
                                    break;
                                case "TorusGeometry":
                                    s = new n.TorusGeometry(h.radius, h.tube, h.radialSegments, h.tubularSegments, h.arc);
                                    break;
                                case "TorusKnotGeometry":
                                    s = new n.TorusKnotGeometry(h.radius, h.tube, h.radialSegments, h.tubularSegments, h.p, h.q, h.heightScale);
                                    break;
                                case "BufferGeometry":
                                    s = i.parse(h);
                                    break;
                                case "Geometry":
                                    s = r.parse(h.data).geometry
                            }
                            s.uuid = h.uuid, void 0 !== h.name && (s.name = h.name), t[h.uuid] = s
                        }
                    return t
                },
                parseMaterials: function (e, t) {
                    var r = {};
                    if (void 0 !== e)
                        for (var i = function (e) {
                                return void 0 === t[e] && n.warn("THREE.ObjectLoader: Undefined texture", e), t[e]
                            }, o = new n.MaterialLoader, a = 0, s = e.length; s > a; a++) {
                            var h = e[a],
                                l = o.parse(h);
                            l.uuid = h.uuid, void 0 !== h.name && (l.name = h.name), void 0 !== h.map && (l.map = i(h.map)), void 0 !== h.bumpMap && (l.bumpMap = i(h.bumpMap), h.bumpScale && (l.bumpScale = new n.Vector2(h.bumpScale, h.bumpScale))), void 0 !== h.alphaMap && (l.alphaMap = i(h.alphaMap)), void 0 !== h.envMap && (l.envMap = i(h.envMap)), void 0 !== h.normalMap && (l.normalMap = i(h.normalMap), h.normalScale && (l.normalScale = new n.Vector2(h.normalScale, h.normalScale))), void 0 !== h.lightMap && (l.lightMap = i(h.lightMap)), void 0 !== h.specularMap && (l.specularMap = i(h.specularMap)), r[h.uuid] = l
                        }
                    return r
                },
                parseImages: function (e, t) {
                    var r = this,
                        i = {};
                    if (void 0 !== e && e.length > 0) {
                        var o = new n.LoadingManager(t),
                            a = new n.ImageLoader(o);
                        a.setCrossOrigin(this.crossOrigin);
                        for (var s = function (e) {
                                return r.manager.itemStart(e), a.load(e, function () {
                                    r.manager.itemEnd(e)
                                })
                            }, h = 0, l = e.length; l > h; h++) {
                            var c = e[h],
                                u = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(c.url) ? c.url : r.texturePath + c.url;
                            i[c.uuid] = s(u)
                        }
                    }
                    return i
                },
                parseTextures: function (e, t) {
                    var r = {};
                    if (void 0 !== e)
                        for (var i = 0, o = e.length; o > i; i++) {
                            var a = e[i];
                            void 0 === a.image && n.warn('THREE.ObjectLoader: No "image" speficied for', a.uuid), void 0 === t[a.image] && n.warn("THREE.ObjectLoader: Undefined image", a.image);
                            var s = new n.Texture(t[a.image]);
                            s.needsUpdate = !0, s.uuid = a.uuid, void 0 !== a.name && (s.name = a.name), void 0 !== a.repeat && (s.repeat = new n.Vector2(a.repeat[0], a.repeat[1])), void 0 !== a.minFilter && (s.minFilter = n[a.minFilter]), void 0 !== a.magFilter && (s.magFilter = n[a.magFilter]), void 0 !== a.anisotropy && (s.anisotropy = a.anisotropy), a.wrap instanceof Array && (s.wrapS = n[a.wrap[0]], s.wrapT = n[a.wrap[1]]), r[a.uuid] = s
                        }
                    return r
                },
                parseObject: function () {
                    var e = new n.Matrix4;
                    return function (t, r, i) {
                        var o, a = function (e) {
                                return void 0 === r[e] && n.warn("THREE.ObjectLoader: Undefined geometry", e), r[e]
                            },
                            s = function (e) {
                                return void 0 === i[e] && n.warn("THREE.ObjectLoader: Undefined material", e), i[e]
                            };
                        switch (t.type) {
                            case "Scene":
                                o = new n.Scene;
                                break;
                            case "PerspectiveCamera":
                                o = new n.PerspectiveCamera(t.fov, t.aspect, t.near, t.far);
                                break;
                            case "OrthographicCamera":
                                o = new n.OrthographicCamera(t.left, t.right, t.top, t.bottom, t.near, t.far);
                                break;
                            case "AmbientLight":
                                o = new n.AmbientLight(t.color);
                                break;
                            case "DirectionalLight":
                                o = new n.DirectionalLight(t.color, t.intensity);
                                break;
                            case "PointLight":
                                o = new n.PointLight(t.color, t.intensity, t.distance, t.decay);
                                break;
                            case "SpotLight":
                                o = new n.SpotLight(t.color, t.intensity, t.distance, t.angle, t.exponent, t.decay);
                                break;
                            case "HemisphereLight":
                                o = new n.HemisphereLight(t.color, t.groundColor, t.intensity);
                                break;
                            case "Mesh":
                                o = new n.Mesh(a(t.geometry), s(t.material));
                                break;
                            case "Line":
                                o = new n.Line(a(t.geometry), s(t.material), t.mode);
                                break;
                            case "PointCloud":
                                o = new n.PointCloud(a(t.geometry), s(t.material));
                                break;
                            case "Sprite":
                                o = new n.Sprite(s(t.material));
                                break;
                            case "Group":
                                o = new n.Group;
                                break;
                            default:
                                o = new n.Object3D
                        }
                        if (o.uuid = t.uuid, void 0 !== t.name && (o.name = t.name), void 0 !== t.matrix ? (e.fromArray(t.matrix), e.decompose(o.position, o.quaternion, o.scale)) : (void 0 !== t.position && o.position.fromArray(t.position), void 0 !== t.rotation && o.rotation.fromArray(t.rotation), void 0 !== t.scale && o.scale.fromArray(t.scale)), void 0 !== t.visible && (o.visible = t.visible), void 0 !== t.userData && (o.userData = t.userData), void 0 !== t.children)
                            for (var h in t.children) o.add(this.parseObject(t.children[h], r, i));
                        return o
                    }
                }()
            }, n.TextureLoader = function (e) {
                this.manager = void 0 !== e ? e : n.DefaultLoadingManager
            }, n.TextureLoader.prototype = {
                constructor: n.TextureLoader,
                load: function (e, t, r, i) {
                    var o = this,
                        a = new n.ImageLoader(o.manager);
                    a.setCrossOrigin(this.crossOrigin), a.load(e, function (e) {
                        var r = new n.Texture(e);
                        r.needsUpdate = !0, void 0 !== t && t(r)
                    }, r, i)
                },
                setCrossOrigin: function (e) {
                    this.crossOrigin = e
                }
            }, n.DataTextureLoader = n.BinaryTextureLoader = function () {
                this._parser = null
            }, n.BinaryTextureLoader.prototype = {
                constructor: n.BinaryTextureLoader,
                load: function (e, t, r, i) {
                    var o = this,
                        a = new n.DataTexture,
                        s = new n.XHRLoader;
                    return s.setResponseType("arraybuffer"), s.load(e, function (e) {
                        var r = o._parser(e);
                        r && (void 0 !== r.image ? a.image = r.image : void 0 !== r.data && (a.image.width = r.width, a.image.height = r.height, a.image.data = r.data), a.wrapS = void 0 !== r.wrapS ? r.wrapS : n.ClampToEdgeWrapping, a.wrapT = void 0 !== r.wrapT ? r.wrapT : n.ClampToEdgeWrapping, a.magFilter = void 0 !== r.magFilter ? r.magFilter : n.LinearFilter, a.minFilter = void 0 !== r.minFilter ? r.minFilter : n.LinearMipMapLinearFilter, a.anisotropy = void 0 !== r.anisotropy ? r.anisotropy : 1, void 0 !== r.format && (a.format = r.format), void 0 !== r.type && (a.type = r.type), void 0 !== r.mipmaps && (a.mipmaps = r.mipmaps), 1 === r.mipmapCount && (a.minFilter = n.LinearFilter), a.needsUpdate = !0, t && t(a, r))
                    }, r, i), a
                }
            }, n.CompressedTextureLoader = function () {
                this._parser = null
            }, n.CompressedTextureLoader.prototype = {
                constructor: n.CompressedTextureLoader,
                load: function (e, t) {
                    var r = this,
                        i = [],
                        o = new n.CompressedTexture;
                    o.image = i;
                    var a = new n.XHRLoader;
                    if (a.setResponseType("arraybuffer"), e instanceof Array)
                        for (var s = 0, h = function (h) {
                                a.load(e[h], function (e) {
                                    var a = r._parser(e, !0);
                                    i[h] = {
                                        width: a.width,
                                        height: a.height,
                                        format: a.format,
                                        mipmaps: a.mipmaps
                                    }, s += 1, 6 === s && (1 == a.mipmapCount && (o.minFilter = n.LinearFilter), o.format = a.format, o.needsUpdate = !0, t && t(o))
                                })
                            }, l = 0, c = e.length; c > l; ++l) h(l);
                    else a.load(e, function (e) {
                        var a = r._parser(e, !0);
                        if (a.isCubemap)
                            for (var s = a.mipmaps.length / a.mipmapCount, h = 0; s > h; h++) {
                                i[h] = {
                                    mipmaps: []
                                };
                                for (var l = 0; l < a.mipmapCount; l++) i[h].mipmaps.push(a.mipmaps[h * a.mipmapCount + l]), i[h].format = a.format, i[h].width = a.width, i[h].height = a.height
                            } else o.image.width = a.width, o.image.height = a.height, o.mipmaps = a.mipmaps;
                        1 === a.mipmapCount && (o.minFilter = n.LinearFilter), o.format = a.format, o.needsUpdate = !0, t && t(o)
                    });
                    return o
                }
            }, n.Material = function () {
                Object.defineProperty(this, "id", {
                    value: n.MaterialIdCount++
                }), this.uuid = n.Math.generateUUID(), this.name = "", this.type = "Material", this.side = n.FrontSide, this.opacity = 1, this.transparent = !1, this.blending = n.NormalBlending, this.blendSrc = n.SrcAlphaFactor, this.blendDst = n.OneMinusSrcAlphaFactor, this.blendEquation = n.AddEquation, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthTest = !0, this.depthWrite = !0, this.colorWrite = !0, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.alphaTest = 0, this.overdraw = 0, this.visible = !0, this._needsUpdate = !0
            }, n.Material.prototype = {
                constructor: n.Material,
                get needsUpdate() {
                    return this._needsUpdate
                },
                set needsUpdate(e) {
                    e === !0 && this.update(), this._needsUpdate = e
                },
                setValues: function (e) {
                    if (void 0 !== e)
                        for (var t in e) {
                            var r = e[t];
                            if (void 0 !== r) {
                                if (t in this) {
                                    var i = this[t];
                                    i instanceof n.Color ? i.set(r) : i instanceof n.Vector3 && r instanceof n.Vector3 ? i.copy(r) : this[t] = "overdraw" == t ? Number(r) : r
                                }
                            } else n.warn("THREE.Material: '" + t + "' parameter is undefined.")
                        }
                },
                toJSON: function () {
                    var e = {
                        metadata: {
                            version: 4.2,
                            type: "material",
                            generator: "MaterialExporter"
                        },
                        uuid: this.uuid,
                        type: this.type
                    };
                    return "" !== this.name && (e.name = this.name), this instanceof n.MeshBasicMaterial ? (e.color = this.color.getHex(), this.vertexColors !== n.NoColors && (e.vertexColors = this.vertexColors), this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.MeshLambertMaterial ? (e.color = this.color.getHex(), e.emissive = this.emissive.getHex(), this.vertexColors !== n.NoColors && (e.vertexColors = this.vertexColors), this.shading !== n.SmoothShading && (e.shading = this.shading), this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.MeshPhongMaterial ? (e.color = this.color.getHex(), e.emissive = this.emissive.getHex(), e.specular = this.specular.getHex(), e.shininess = this.shininess, this.vertexColors !== n.NoColors && (e.vertexColors = this.vertexColors), this.shading !== n.SmoothShading && (e.shading = this.shading), this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.MeshNormalMaterial ? (this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.MeshDepthMaterial ? (this.blending !== n.NormalBlending && (e.blending = this.blending), this.side !== n.FrontSide && (e.side = this.side)) : this instanceof n.PointCloudMaterial ? (e.size = this.size, e.sizeAttenuation = this.sizeAttenuation, e.color = this.color.getHex(), this.vertexColors !== n.NoColors && (e.vertexColors = this.vertexColors), this.blending !== n.NormalBlending && (e.blending = this.blending)) : this instanceof n.ShaderMaterial ? (e.uniforms = this.uniforms, e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader) : this instanceof n.SpriteMaterial && (e.color = this.color.getHex()), this.opacity < 1 && (e.opacity = this.opacity), this.transparent !== !1 && (e.transparent = this.transparent), this.wireframe !== !1 && (e.wireframe = this.wireframe), e
                },
                clone: function (e) {
                    return void 0 === e && (e = new n.Material), e.name = this.name, e.side = this.side, e.opacity = this.opacity, e.transparent = this.transparent, e.blending = this.blending, e.blendSrc = this.blendSrc, e.blendDst = this.blendDst, e.blendEquation = this.blendEquation, e.blendSrcAlpha = this.blendSrcAlpha, e.blendDstAlpha = this.blendDstAlpha, e.blendEquationAlpha = this.blendEquationAlpha, e.depthTest = this.depthTest, e.depthWrite = this.depthWrite, e.polygonOffset = this.polygonOffset, e.polygonOffsetFactor = this.polygonOffsetFactor, e.polygonOffsetUnits = this.polygonOffsetUnits, e.alphaTest = this.alphaTest, e.overdraw = this.overdraw, e.visible = this.visible, e
                },
                update: function () {
                    this.dispatchEvent({
                        type: "update"
                    })
                },
                dispose: function () {
                    this.dispatchEvent({
                        type: "dispose"
                    })
                }
            }, n.EventDispatcher.prototype.apply(n.Material.prototype), n.MaterialIdCount = 0, n.LineBasicMaterial = function (e) {
                n.Material.call(this), this.type = "LineBasicMaterial", this.color = new n.Color(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.vertexColors = n.NoColors, this.fog = !0, this.setValues(e)
            }, n.LineBasicMaterial.prototype = Object.create(n.Material.prototype), n.LineBasicMaterial.prototype.constructor = n.LineBasicMaterial, n.LineBasicMaterial.prototype.clone = function () {
                var e = new n.LineBasicMaterial;
                return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.linewidth = this.linewidth, e.linecap = this.linecap, e.linejoin = this.linejoin, e.vertexColors = this.vertexColors, e.fog = this.fog, e
            }, n.LineDashedMaterial = function (e) {
                n.Material.call(this), this.type = "LineDashedMaterial", this.color = new n.Color(16777215), this.linewidth = 1, this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.vertexColors = !1, this.fog = !0, this.setValues(e)
            }, n.LineDashedMaterial.prototype = Object.create(n.Material.prototype), n.LineDashedMaterial.prototype.constructor = n.LineDashedMaterial, n.LineDashedMaterial.prototype.clone = function () {
                var e = new n.LineDashedMaterial;
                return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.linewidth = this.linewidth, e.scale = this.scale, e.dashSize = this.dashSize, e.gapSize = this.gapSize, e.vertexColors = this.vertexColors, e.fog = this.fog, e
            }, n.MeshBasicMaterial = function (e) {
                n.Material.call(this), this.type = "MeshBasicMaterial", this.color = new n.Color(16777215), this.map = null, this.lightMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = n.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = n.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = n.NoColors, this.skinning = !1, this.morphTargets = !1, this.setValues(e)
            }, n.MeshBasicMaterial.prototype = Object.create(n.Material.prototype), n.MeshBasicMaterial.prototype.constructor = n.MeshBasicMaterial, n.MeshBasicMaterial.prototype.clone = function () {
                var e = new n.MeshBasicMaterial;
                return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.lightMap = this.lightMap, e.specularMap = this.specularMap, e.alphaMap = this.alphaMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e
            }, n.MeshLambertMaterial = function (e) {
                n.Material.call(this), this.type = "MeshLambertMaterial", this.color = new n.Color(16777215), this.emissive = new n.Color(0), this.wrapAround = !1, this.wrapRGB = new n.Vector3(1, 1, 1), this.map = null, this.lightMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = n.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = n.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = n.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e)
            }, n.MeshLambertMaterial.prototype = Object.create(n.Material.prototype), n.MeshLambertMaterial.prototype.constructor = n.MeshLambertMaterial, n.MeshLambertMaterial.prototype.clone = function () {
                var e = new n.MeshLambertMaterial;
                return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.emissive.copy(this.emissive), e.wrapAround = this.wrapAround, e.wrapRGB.copy(this.wrapRGB), e.map = this.map, e.lightMap = this.lightMap, e.specularMap = this.specularMap, e.alphaMap = this.alphaMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
            }, n.MeshPhongMaterial = function (e) {
                n.Material.call(this), this.type = "MeshPhongMaterial", this.color = new n.Color(16777215), this.emissive = new n.Color(0), this.specular = new n.Color(1118481), this.shininess = 30, this.metal = !1, this.wrapAround = !1, this.wrapRGB = new n.Vector3(1, 1, 1), this.map = null, this.lightMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new n.Vector2(1, 1), this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = n.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = n.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = n.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(e)
            }, n.MeshPhongMaterial.prototype = Object.create(n.Material.prototype), n.MeshPhongMaterial.prototype.constructor = n.MeshPhongMaterial, n.MeshPhongMaterial.prototype.clone = function () {
                var e = new n.MeshPhongMaterial;
                return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.emissive.copy(this.emissive), e.specular.copy(this.specular), e.shininess = this.shininess, e.metal = this.metal, e.wrapAround = this.wrapAround, e.wrapRGB.copy(this.wrapRGB), e.map = this.map, e.lightMap = this.lightMap, e.bumpMap = this.bumpMap, e.bumpScale = this.bumpScale, e.normalMap = this.normalMap, e.normalScale.copy(this.normalScale), e.specularMap = this.specularMap, e.alphaMap = this.alphaMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
            }, n.MeshDepthMaterial = function (e) {
                n.Material.call(this), this.type = "MeshDepthMaterial", this.morphTargets = !1, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e)
            }, n.MeshDepthMaterial.prototype = Object.create(n.Material.prototype), n.MeshDepthMaterial.prototype.constructor = n.MeshDepthMaterial, n.MeshDepthMaterial.prototype.clone = function () {
                var e = new n.MeshDepthMaterial;
                return n.Material.prototype.clone.call(this, e), e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e
            }, n.MeshNormalMaterial = function (e) {
                n.Material.call(this, e), this.type = "MeshNormalMaterial", this.wireframe = !1, this.wireframeLinewidth = 1, this.morphTargets = !1, this.setValues(e)
            }, n.MeshNormalMaterial.prototype = Object.create(n.Material.prototype), n.MeshNormalMaterial.prototype.constructor = n.MeshNormalMaterial, n.MeshNormalMaterial.prototype.clone = function () {
                var e = new n.MeshNormalMaterial;
                return n.Material.prototype.clone.call(this, e), e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e
            }, n.MeshFaceMaterial = function (e) {
                this.uuid = n.Math.generateUUID(), this.type = "MeshFaceMaterial", this.materials = e instanceof Array ? e : []
            }, n.MeshFaceMaterial.prototype = {
                constructor: n.MeshFaceMaterial,
                toJSON: function () {
                    for (var e = {
                            metadata: {
                                version: 4.2,
                                type: "material",
                                generator: "MaterialExporter"
                            },
                            uuid: this.uuid,
                            type: this.type,
                            materials: []
                        }, t = 0, r = this.materials.length; r > t; t++) e.materials.push(this.materials[t].toJSON());
                    return e
                },
                clone: function () {
                    for (var e = new n.MeshFaceMaterial, t = 0; t < this.materials.length; t++) e.materials.push(this.materials[t].clone());
                    return e
                }
            }, n.PointCloudMaterial = function (e) {
                n.Material.call(this), this.type = "PointCloudMaterial", this.color = new n.Color(16777215), this.map = null, this.size = 1, this.sizeAttenuation = !0, this.vertexColors = n.NoColors, this.fog = !0, this.setValues(e)
            }, n.PointCloudMaterial.prototype = Object.create(n.Material.prototype), n.PointCloudMaterial.prototype.constructor = n.PointCloudMaterial, n.PointCloudMaterial.prototype.clone = function () {
                var e = new n.PointCloudMaterial;
                return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.size = this.size, e.sizeAttenuation = this.sizeAttenuation, e.vertexColors = this.vertexColors, e.fog = this.fog, e
            }, n.ParticleBasicMaterial = function (e) {
                return n.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointCloudMaterial."), new n.PointCloudMaterial(e)
            }, n.ParticleSystemMaterial = function (e) {
                return n.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointCloudMaterial."), new n.PointCloudMaterial(e)
            }, n.ShaderMaterial = function (e) {
                n.Material.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.attributes = null, this.vertexShader = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.shading = n.SmoothShading, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.vertexColors = n.NoColors, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.defaultAttributeValues = {
                    color: [1, 1, 1],
                    uv: [0, 0],
                    uv2: [0, 0]
                }, this.index0AttributeName = void 0, this.setValues(e)
            }, n.ShaderMaterial.prototype = Object.create(n.Material.prototype), n.ShaderMaterial.prototype.constructor = n.ShaderMaterial, n.ShaderMaterial.prototype.clone = function () {
                var e = new n.ShaderMaterial;
                return n.Material.prototype.clone.call(this, e), e.fragmentShader = this.fragmentShader, e.vertexShader = this.vertexShader, e.uniforms = n.UniformsUtils.clone(this.uniforms), e.attributes = this.attributes, e.defines = this.defines, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.fog = this.fog, e.lights = this.lights, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
            }, n.RawShaderMaterial = function (e) {
                n.ShaderMaterial.call(this, e), this.type = "RawShaderMaterial"
            }, n.RawShaderMaterial.prototype = Object.create(n.ShaderMaterial.prototype), n.RawShaderMaterial.prototype.constructor = n.RawShaderMaterial, n.RawShaderMaterial.prototype.clone = function () {
                var e = new n.RawShaderMaterial;
                return n.ShaderMaterial.prototype.clone.call(this, e), e
            }, n.SpriteMaterial = function (e) {
                n.Material.call(this), this.type = "SpriteMaterial", this.color = new n.Color(16777215), this.map = null, this.rotation = 0, this.fog = !1, this.setValues(e)
            }, n.SpriteMaterial.prototype = Object.create(n.Material.prototype), n.SpriteMaterial.prototype.constructor = n.SpriteMaterial, n.SpriteMaterial.prototype.clone = function () {
                var e = new n.SpriteMaterial;
                return n.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.rotation = this.rotation, e.fog = this.fog, e
            }, n.Texture = function (e, t, r, i, o, a, s, h, l) {
                Object.defineProperty(this, "id", {
                    value: n.TextureIdCount++
                }), this.uuid = n.Math.generateUUID(), this.name = "", this.sourceFile = "", this.image = void 0 !== e ? e : n.Texture.DEFAULT_IMAGE, this.mipmaps = [], this.mapping = void 0 !== t ? t : n.Texture.DEFAULT_MAPPING, this.wrapS = void 0 !== r ? r : n.ClampToEdgeWrapping, this.wrapT = void 0 !== i ? i : n.ClampToEdgeWrapping, this.magFilter = void 0 !== o ? o : n.LinearFilter, this.minFilter = void 0 !== a ? a : n.LinearMipMapLinearFilter, this.anisotropy = void 0 !== l ? l : 1, this.format = void 0 !== s ? s : n.RGBAFormat, this.type = void 0 !== h ? h : n.UnsignedByteType, this.offset = new n.Vector2(0, 0), this.repeat = new n.Vector2(1, 1), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this._needsUpdate = !1, this.onUpdate = null
            }, n.Texture.DEFAULT_IMAGE = void 0, n.Texture.DEFAULT_MAPPING = n.UVMapping, n.Texture.prototype = {
                constructor: n.Texture,
                get needsUpdate() {
                    return this._needsUpdate
                },
                set needsUpdate(e) {
                    e === !0 && this.update(), this._needsUpdate = e
                },
                clone: function (e) {
                    return void 0 === e && (e = new n.Texture), e.image = this.image, e.mipmaps = this.mipmaps.slice(0), e.mapping = this.mapping, e.wrapS = this.wrapS, e.wrapT = this.wrapT, e.magFilter = this.magFilter, e.minFilter = this.minFilter, e.anisotropy = this.anisotropy, e.format = this.format, e.type = this.type, e.offset.copy(this.offset), e.repeat.copy(this.repeat), e.generateMipmaps = this.generateMipmaps, e.premultiplyAlpha = this.premultiplyAlpha, e.flipY = this.flipY, e.unpackAlignment = this.unpackAlignment, e
                },
                update: function () {
                    this.dispatchEvent({
                        type: "update"
                    })
                },
                dispose: function () {
                    this.dispatchEvent({
                        type: "dispose"
                    })
                }
            }, n.EventDispatcher.prototype.apply(n.Texture.prototype), n.TextureIdCount = 0, n.CubeTexture = function (e, t, r, i, o, a, s, h, l) {
                t = void 0 !== t ? t : n.CubeReflectionMapping, n.Texture.call(this, e, t, r, i, o, a, s, h, l), this.images = e
            }, n.CubeTexture.prototype = Object.create(n.Texture.prototype), n.CubeTexture.prototype.constructor = n.CubeTexture, n.CubeTexture.clone = function (e) {
                return void 0 === e && (e = new n.CubeTexture), n.Texture.prototype.clone.call(this, e), e.images = this.images, e
            }, n.CompressedTexture = function (e, t, r, i, o, a, s, h, l, c, u) {
                n.Texture.call(this, null, a, s, h, l, c, i, o, u), this.image = {
                    width: t,
                    height: r
                }, this.mipmaps = e, this.flipY = !1, this.generateMipmaps = !1
            }, n.CompressedTexture.prototype = Object.create(n.Texture.prototype), n.CompressedTexture.prototype.constructor = n.CompressedTexture, n.CompressedTexture.prototype.clone = function () {
                var e = new n.CompressedTexture;
                return n.Texture.prototype.clone.call(this, e), e
            }, n.DataTexture = function (e, t, r, i, o, a, s, h, l, c, u) {
                n.Texture.call(this, null, a, s, h, l, c, i, o, u), this.image = {
                    data: e,
                    width: t,
                    height: r
                }
            }, n.DataTexture.prototype = Object.create(n.Texture.prototype), n.DataTexture.prototype.constructor = n.DataTexture, n.DataTexture.prototype.clone = function () {
                var e = new n.DataTexture;
                return n.Texture.prototype.clone.call(this, e), e
            }, n.VideoTexture = function (e, t, r, i, o, a, s, h, l) {
                n.Texture.call(this, e, t, r, i, o, a, s, h, l), this.generateMipmaps = !1;
                var c = this,
                    u = function () {
                        requestAnimationFrame(u), e.readyState === e.HAVE_ENOUGH_DATA && (c.needsUpdate = !0)
                    };
                u()
            }, n.VideoTexture.prototype = Object.create(n.Texture.prototype), n.VideoTexture.prototype.constructor = n.VideoTexture, n.Group = function () {
                n.Object3D.call(this), this.type = "Group"
            }, n.Group.prototype = Object.create(n.Object3D.prototype), n.Group.prototype.constructor = n.Group, n.PointCloud = function (e, t) {
                n.Object3D.call(this), this.type = "PointCloud", this.geometry = void 0 !== e ? e : new n.Geometry, this.material = void 0 !== t ? t : new n.PointCloudMaterial({
                    color: 16777215 * Math.random()
                })
            }, n.PointCloud.prototype = Object.create(n.Object3D.prototype), n.PointCloud.prototype.constructor = n.PointCloud, n.PointCloud.prototype.raycast = function () {
                var e = new n.Matrix4,
                    t = new n.Ray;
                return function (r, i) {
                    var o = this,
                        a = o.geometry,
                        s = r.params.PointCloud.threshold;
                    if (e.getInverse(this.matrixWorld), t.copy(r.ray).applyMatrix4(e), null === a.boundingBox || t.isIntersectionBox(a.boundingBox) !== !1) {
                        var h = s / ((this.scale.x + this.scale.y + this.scale.z) / 3),
                            l = new n.Vector3,
                            c = function (e, n) {
                                var a = t.distanceToPoint(e);
                                if (h > a) {
                                    var s = t.closestPointToPoint(e);
                                    s.applyMatrix4(o.matrixWorld);
                                    var l = r.ray.origin.distanceTo(s);
                                    i.push({
                                        distance: l,
                                        distanceToRay: a,
                                        point: s.clone(),
                                        index: n,
                                        face: null,
                                        object: o
                                    })
                                }
                            };
                        if (a instanceof n.BufferGeometry) {
                            var u = a.attributes,
                                d = u.position.array;
                            if (void 0 !== u.index) {
                                var p = u.index.array,
                                    f = a.offsets;
                                if (0 === f.length) {
                                    var m = {
                                        start: 0,
                                        count: p.length,
                                        index: 0
                                    };
                                    f = [m]
                                }
                                for (var g = 0, v = f.length; v > g; ++g)
                                    for (var y = f[g].start, x = f[g].count, _ = f[g].index, b = y, w = y + x; w > b; b++) {
                                        var M = _ + p[b];
                                        l.fromArray(d, 3 * M), c(l, M)
                                    }
                            } else
                                for (var S = d.length / 3, b = 0; S > b; b++) l.set(d[3 * b], d[3 * b + 1], d[3 * b + 2]), c(l, b)
                        } else
                            for (var E = this.geometry.vertices, b = 0; b < E.length; b++) c(E[b], b)
                    }
                }
            }(), n.PointCloud.prototype.clone = function (e) {
                return void 0 === e && (e = new n.PointCloud(this.geometry, this.material)), n.Object3D.prototype.clone.call(this, e), e
            }, n.ParticleSystem = function (e, t) {
                return n.warn("THREE.ParticleSystem has been renamed to THREE.PointCloud."), new n.PointCloud(e, t)
            }, n.Line = function (e, t, r) {
                n.Object3D.call(this), this.type = "Line", this.geometry = void 0 !== e ? e : new n.Geometry, this.material = void 0 !== t ? t : new n.LineBasicMaterial({
                    color: 16777215 * Math.random()
                }), this.mode = void 0 !== r ? r : n.LineStrip
            }, n.LineStrip = 0, n.LinePieces = 1, n.Line.prototype = Object.create(n.Object3D.prototype), n.Line.prototype.constructor = n.Line, n.Line.prototype.raycast = function () {
                var e = new n.Matrix4,
                    t = new n.Ray,
                    r = new n.Sphere;
                return function (i, o) {
                    var a = i.linePrecision,
                        s = a * a,
                        h = this.geometry;
                    if (null === h.boundingSphere && h.computeBoundingSphere(), r.copy(h.boundingSphere), r.applyMatrix4(this.matrixWorld), i.ray.isIntersectionSphere(r) !== !1) {
                        e.getInverse(this.matrixWorld), t.copy(i.ray).applyMatrix4(e);
                        var l = new n.Vector3,
                            c = new n.Vector3,
                            u = new n.Vector3,
                            d = new n.Vector3,
                            p = this.mode === n.LineStrip ? 1 : 2;
                        if (h instanceof n.BufferGeometry) {
                            var f = h.attributes;
                            if (void 0 !== f.index) {
                                var m = f.index.array,
                                    g = f.position.array,
                                    v = h.offsets;
                                0 === v.length && (v = [{
                                    start: 0,
                                    count: m.length,
                                    index: 0
                                }]);
                                for (var y = 0; y < v.length; y++)
                                    for (var x = v[y].start, _ = v[y].count, b = v[y].index, w = x; x + _ - 1 > w; w += p) {
                                        var M = b + m[w],
                                            S = b + m[w + 1];
                                        l.fromArray(g, 3 * M), c.fromArray(g, 3 * S);
                                        var E = t.distanceSqToSegment(l, c, d, u);
                                        if (!(E > s)) {
                                            var T = t.origin.distanceTo(d);
                                            T < i.near || T > i.far || o.push({
                                                distance: T,
                                                point: u.clone().applyMatrix4(this.matrixWorld),
                                                index: w,
                                                offsetIndex: y,
                                                face: null,
                                                faceIndex: null,
                                                object: this
                                            })
                                        }
                                    }
                            } else
                                for (var g = f.position.array, w = 0; w < g.length / 3 - 1; w += p) {
                                    l.fromArray(g, 3 * w), c.fromArray(g, 3 * w + 3);
                                    var E = t.distanceSqToSegment(l, c, d, u);
                                    if (!(E > s)) {
                                        var T = t.origin.distanceTo(d);
                                        T < i.near || T > i.far || o.push({
                                            distance: T,
                                            point: u.clone().applyMatrix4(this.matrixWorld),
                                            index: w,
                                            face: null,
                                            faceIndex: null,
                                            object: this
                                        })
                                    }
                                }
                        } else if (h instanceof n.Geometry)
                            for (var A = h.vertices, C = A.length, w = 0; C - 1 > w; w += p) {
                                var E = t.distanceSqToSegment(A[w], A[w + 1], d, u);
                                if (!(E > s)) {
                                    var T = t.origin.distanceTo(d);
                                    T < i.near || T > i.far || o.push({
                                        distance: T,
                                        point: u.clone().applyMatrix4(this.matrixWorld),
                                        index: w,
                                        face: null,
                                        faceIndex: null,
                                        object: this
                                    })
                                }
                            }
                    }
                }
            }(), n.Line.prototype.clone = function (e) {
                return void 0 === e && (e = new n.Line(this.geometry, this.material, this.mode)), n.Object3D.prototype.clone.call(this, e), e
            }, n.Mesh = function (e, t) {
                n.Object3D.call(this), this.type = "Mesh", this.geometry = void 0 !== e ? e : new n.Geometry, this.material = void 0 !== t ? t : new n.MeshBasicMaterial({
                    color: 16777215 * Math.random()
                }), this.updateMorphTargets()
            }, n.Mesh.prototype = Object.create(n.Object3D.prototype), n.Mesh.prototype.constructor = n.Mesh, n.Mesh.prototype.updateMorphTargets = function () {
                if (void 0 !== this.geometry.morphTargets && this.geometry.morphTargets.length > 0) {
                    this.morphTargetBase = -1, this.morphTargetForcedOrder = [], this.morphTargetInfluences = [], this.morphTargetDictionary = {};
                    for (var e = 0, t = this.geometry.morphTargets.length; t > e; e++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[e].name] = e
                }
            }, n.Mesh.prototype.getMorphTargetIndexByName = function (e) {
                return void 0 !== this.morphTargetDictionary[e] ? this.morphTargetDictionary[e] : (n.warn("THREE.Mesh.getMorphTargetIndexByName: morph target " + e + " does not exist. Returning 0."), 0)
            }, n.Mesh.prototype.raycast = function () {
                var e = new n.Matrix4,
                    t = new n.Ray,
                    r = new n.Sphere,
                    i = new n.Vector3,
                    o = new n.Vector3,
                    a = new n.Vector3;
                return function (s, h) {
                    var l = this.geometry;
                    if (null === l.boundingSphere && l.computeBoundingSphere(), r.copy(l.boundingSphere), r.applyMatrix4(this.matrixWorld), s.ray.isIntersectionSphere(r) !== !1 && (e.getInverse(this.matrixWorld), t.copy(s.ray).applyMatrix4(e), null === l.boundingBox || t.isIntersectionBox(l.boundingBox) !== !1))
                        if (l instanceof n.BufferGeometry) {
                            var c = this.material;
                            if (void 0 === c) return;
                            var u, d, p, f = l.attributes,
                                m = s.precision;
                            if (void 0 !== f.index) {
                                var g = f.index.array,
                                    v = f.position.array,
                                    y = l.offsets;
                                0 === y.length && (y = [{
                                    start: 0,
                                    count: g.length,
                                    index: 0
                                }]);
                                for (var x = 0, _ = y.length; _ > x; ++x)
                                    for (var b = y[x].start, w = y[x].count, M = y[x].index, S = b, E = b + w; E > S; S += 3) {
                                        if (u = M + g[S], d = M + g[S + 1], p = M + g[S + 2], i.fromArray(v, 3 * u), o.fromArray(v, 3 * d), a.fromArray(v, 3 * p), c.side === n.BackSide) var T = t.intersectTriangle(a, o, i, !0);
                                        else var T = t.intersectTriangle(i, o, a, c.side !== n.DoubleSide);
                                        if (null !== T) {
                                            T.applyMatrix4(this.matrixWorld);
                                            var A = s.ray.origin.distanceTo(T);
                                            m > A || A < s.near || A > s.far || h.push({
                                                distance: A,
                                                point: T,
                                                face: new n.Face3(u, d, p, n.Triangle.normal(i, o, a)),
                                                faceIndex: null,
                                                object: this
                                            })
                                        }
                                    }
                            } else
                                for (var v = f.position.array, S = 0, C = 0, E = v.length; E > S; S += 3, C += 9) {
                                    if (u = S, d = S + 1, p = S + 2, i.fromArray(v, C), o.fromArray(v, C + 3), a.fromArray(v, C + 6), c.side === n.BackSide) var T = t.intersectTriangle(a, o, i, !0);
                                    else var T = t.intersectTriangle(i, o, a, c.side !== n.DoubleSide);
                                    if (null !== T) {
                                        T.applyMatrix4(this.matrixWorld);
                                        var A = s.ray.origin.distanceTo(T);
                                        m > A || A < s.near || A > s.far || h.push({
                                            distance: A,
                                            point: T,
                                            face: new n.Face3(u, d, p, n.Triangle.normal(i, o, a)),
                                            faceIndex: null,
                                            object: this
                                        })
                                    }
                                }
                        } else if (l instanceof n.Geometry)
                        for (var u, d, p, L = this.material instanceof n.MeshFaceMaterial, R = L === !0 ? this.material.materials : null, m = s.precision, P = l.vertices, F = 0, B = l.faces.length; B > F; F++) {
                            var D = l.faces[F],
                                c = L === !0 ? R[D.materialIndex] : this.material;
                            if (void 0 !== c) {
                                if (u = P[D.a], d = P[D.b], p = P[D.c], c.morphTargets === !0) {
                                    var U = l.morphTargets,
                                        k = this.morphTargetInfluences;
                                    i.set(0, 0, 0), o.set(0, 0, 0), a.set(0, 0, 0);
                                    for (var V = 0, O = U.length; O > V; V++) {
                                        var N = k[V];
                                        if (0 !== N) {
                                            var z = U[V].vertices;
                                            i.x += (z[D.a].x - u.x) * N, i.y += (z[D.a].y - u.y) * N, i.z += (z[D.a].z - u.z) * N, o.x += (z[D.b].x - d.x) * N, o.y += (z[D.b].y - d.y) * N, o.z += (z[D.b].z - d.z) * N, a.x += (z[D.c].x - p.x) * N, a.y += (z[D.c].y - p.y) * N, a.z += (z[D.c].z - p.z) * N
                                        }
                                    }
                                    i.add(u), o.add(d), a.add(p), u = i, d = o, p = a
                                }
                                if (c.side === n.BackSide) var T = t.intersectTriangle(p, d, u, !0);
                                else var T = t.intersectTriangle(u, d, p, c.side !== n.DoubleSide);
                                if (null !== T) {
                                    T.applyMatrix4(this.matrixWorld);
                                    var A = s.ray.origin.distanceTo(T);
                                    m > A || A < s.near || A > s.far || h.push({
                                        distance: A,
                                        point: T,
                                        face: D,
                                        faceIndex: F,
                                        object: this
                                    })
                                }
                            }
                        }
                }
            }(), n.Mesh.prototype.clone = function (e, t) {
                return void 0 === e && (e = new n.Mesh(this.geometry, this.material)), n.Object3D.prototype.clone.call(this, e, t), e
            }, n.Bone = function (e) {
                n.Object3D.call(this), this.type = "Bone", this.skin = e
            }, n.Bone.prototype = Object.create(n.Object3D.prototype), n.Bone.prototype.constructor = n.Bone, n.Skeleton = function (e, t, r) {
                if (this.useVertexTexture = void 0 !== r ? r : !0, this.identityMatrix = new n.Matrix4, e = e || [], this.bones = e.slice(0), this.useVertexTexture) {
                    var i;
                    i = this.bones.length > 256 ? 64 : this.bones.length > 64 ? 32 : this.bones.length > 16 ? 16 : 8, this.boneTextureWidth = i, this.boneTextureHeight = i, this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4), this.boneTexture = new n.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, n.RGBAFormat, n.FloatType), this.boneTexture.minFilter = n.NearestFilter, this.boneTexture.magFilter = n.NearestFilter, this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1
                } else this.boneMatrices = new Float32Array(16 * this.bones.length);
                if (void 0 === t) this.calculateInverses();
                else if (this.bones.length === t.length) this.boneInverses = t.slice(0);
                else {
                    n.warn("THREE.Skeleton bonInverses is the wrong length."), this.boneInverses = [];
                    for (var o = 0, a = this.bones.length; a > o; o++) this.boneInverses.push(new n.Matrix4)
                }
            }, n.Skeleton.prototype.calculateInverses = function () {
                this.boneInverses = [];
                for (var e = 0, t = this.bones.length; t > e; e++) {
                    var r = new n.Matrix4;
                    this.bones[e] && r.getInverse(this.bones[e].matrixWorld), this.boneInverses.push(r)
                }
            }, n.Skeleton.prototype.pose = function () {
                for (var e, t = 0, r = this.bones.length; r > t; t++) e = this.bones[t], e && e.matrixWorld.getInverse(this.boneInverses[t]);
                for (var t = 0, r = this.bones.length; r > t; t++) e = this.bones[t], e && (e.parent ? (e.matrix.getInverse(e.parent.matrixWorld), e.matrix.multiply(e.matrixWorld)) : e.matrix.copy(e.matrixWorld), e.matrix.decompose(e.position, e.quaternion, e.scale))
            }, n.Skeleton.prototype.update = function () {
                var e = new n.Matrix4;
                return function () {
                    for (var t = 0, r = this.bones.length; r > t; t++) {
                        var i = this.bones[t] ? this.bones[t].matrixWorld : this.identityMatrix;
                        e.multiplyMatrices(i, this.boneInverses[t]), e.flattenToArrayOffset(this.boneMatrices, 16 * t)
                    }
                    this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
                }
            }(), n.SkinnedMesh = function (e, t, r) {
                n.Mesh.call(this, e, t), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new n.Matrix4, this.bindMatrixInverse = new n.Matrix4;
                var i = [];
                if (this.geometry && void 0 !== this.geometry.bones) {
                    for (var o, a, s, h, l, c = 0, u = this.geometry.bones.length; u > c; ++c) a = this.geometry.bones[c], s = a.pos, h = a.rotq, l = a.scl, o = new n.Bone(this), i.push(o), o.name = a.name, o.position.set(s[0], s[1], s[2]), o.quaternion.set(h[0], h[1], h[2], h[3]), void 0 !== l ? o.scale.set(l[0], l[1], l[2]) : o.scale.set(1, 1, 1);
                    for (var c = 0, u = this.geometry.bones.length; u > c; ++c) a = this.geometry.bones[c], -1 !== a.parent ? i[a.parent].add(i[c]) : this.add(i[c])
                }
                this.normalizeSkinWeights(), this.updateMatrixWorld(!0), this.bind(new n.Skeleton(i, void 0, r))
            }, n.SkinnedMesh.prototype = Object.create(n.Mesh.prototype), n.SkinnedMesh.prototype.constructor = n.SkinnedMesh, n.SkinnedMesh.prototype.bind = function (e, t) {
                this.skeleton = e, void 0 === t && (this.updateMatrixWorld(!0), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.getInverse(t)
            }, n.SkinnedMesh.prototype.pose = function () {
                this.skeleton.pose()
            }, n.SkinnedMesh.prototype.normalizeSkinWeights = function () {
                if (this.geometry instanceof n.Geometry)
                    for (var e = 0; e < this.geometry.skinIndices.length; e++) {
                        var t = this.geometry.skinWeights[e],
                            r = 1 / t.lengthManhattan();
                        r !== 1 / 0 ? t.multiplyScalar(r) : t.set(1)
                    }
            }, n.SkinnedMesh.prototype.updateMatrixWorld = function () {
                n.Mesh.prototype.updateMatrixWorld.call(this, !0), "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : n.warn("THREE.SkinnedMesh unreckognized bindMode: " + this.bindMode)
            }, n.SkinnedMesh.prototype.clone = function (e) {
                return void 0 === e && (e = new n.SkinnedMesh(this.geometry, this.material, this.useVertexTexture)), n.Mesh.prototype.clone.call(this, e), e
            }, n.MorphAnimMesh = function (e, t) {
                n.Mesh.call(this, e, t), this.type = "MorphAnimMesh", this.duration = 1e3, this.mirroredLoop = !1, this.time = 0, this.lastKeyframe = 0, this.currentKeyframe = 0, this.direction = 1, this.directionBackwards = !1, this.setFrameRange(0, this.geometry.morphTargets.length - 1)
            }, n.MorphAnimMesh.prototype = Object.create(n.Mesh.prototype), n.MorphAnimMesh.prototype.constructor = n.MorphAnimMesh, n.MorphAnimMesh.prototype.setFrameRange = function (e, t) {
                this.startKeyframe = e, this.endKeyframe = t, this.length = this.endKeyframe - this.startKeyframe + 1
            }, n.MorphAnimMesh.prototype.setDirectionForward = function () {
                this.direction = 1, this.directionBackwards = !1
            }, n.MorphAnimMesh.prototype.setDirectionBackward = function () {
                this.direction = -1, this.directionBackwards = !0
            }, n.MorphAnimMesh.prototype.parseAnimations = function () {
                var e = this.geometry;
                e.animations || (e.animations = {});
                for (var t, r = e.animations, i = /([a-z]+)_?(\d+)/, n = 0, o = e.morphTargets.length; o > n; n++) {
                    var a = e.morphTargets[n],
                        s = a.name.match(i);
                    if (s && s.length > 1) {
                        var h = s[1];
                        r[h] || (r[h] = {
                            start: 1 / 0,
                            end: -(1 / 0)
                        });
                        var l = r[h];
                        n < l.start && (l.start = n), n > l.end && (l.end = n), t || (t = h)
                    }
                }
                e.firstAnimation = t
            }, n.MorphAnimMesh.prototype.setAnimationLabel = function (e, t, r) {
                this.geometry.animations || (this.geometry.animations = {}), this.geometry.animations[e] = {
                    start: t,
                    end: r
                }
            }, n.MorphAnimMesh.prototype.playAnimation = function (e, t) {
                var r = this.geometry.animations[e];
                r ? (this.setFrameRange(r.start, r.end), this.duration = 1e3 * ((r.end - r.start) / t), this.time = 0) : n.warn("THREE.MorphAnimMesh: animation[" + e + "] undefined in .playAnimation()")
            }, n.MorphAnimMesh.prototype.updateAnimation = function (e) {
                var t = this.duration / this.length;
                this.time += this.direction * e, this.mirroredLoop ? (this.time > this.duration || this.time < 0) && (this.direction *= -1, this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), this.time < 0 && (this.time = 0, this.directionBackwards = !1)) : (this.time = this.time % this.duration, this.time < 0 && (this.time += this.duration));
                var r = this.startKeyframe + n.Math.clamp(Math.floor(this.time / t), 0, this.length - 1);
                r !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[r] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = r);
                var i = this.time % t / t;
                this.directionBackwards && (i = 1 - i), this.morphTargetInfluences[this.currentKeyframe] = i, this.morphTargetInfluences[this.lastKeyframe] = 1 - i
            }, n.MorphAnimMesh.prototype.interpolateTargets = function (e, t, r) {
                for (var i = this.morphTargetInfluences, n = 0, o = i.length; o > n; n++) i[n] = 0;
                e > -1 && (i[e] = 1 - r), t > -1 && (i[t] = r)
            }, n.MorphAnimMesh.prototype.clone = function (e) {
                return void 0 === e && (e = new n.MorphAnimMesh(this.geometry, this.material)), e.duration = this.duration, e.mirroredLoop = this.mirroredLoop, e.time = this.time, e.lastKeyframe = this.lastKeyframe, e.currentKeyframe = this.currentKeyframe, e.direction = this.direction, e.directionBackwards = this.directionBackwards, n.Mesh.prototype.clone.call(this, e), e
            }, n.LOD = function () {
                n.Object3D.call(this), this.objects = []
            }, n.LOD.prototype = Object.create(n.Object3D.prototype), n.LOD.prototype.constructor = n.LOD, n.LOD.prototype.addLevel = function (e, t) {
                void 0 === t && (t = 0), t = Math.abs(t);
                for (var r = 0; r < this.objects.length && !(t < this.objects[r].distance); r++);
                this.objects.splice(r, 0, {
                    distance: t,
                    object: e
                }), this.add(e)
            }, n.LOD.prototype.getObjectForDistance = function (e) {
                for (var t = 1, r = this.objects.length; r > t && !(e < this.objects[t].distance); t++);
                return this.objects[t - 1].object
            }, n.LOD.prototype.raycast = function () {
                var e = new n.Vector3;
                return function (t, r) {
                    e.setFromMatrixPosition(this.matrixWorld);
                    var i = t.ray.origin.distanceTo(e);
                    this.getObjectForDistance(i).raycast(t, r)
                }
            }(), n.LOD.prototype.update = function () {
                var e = new n.Vector3,
                    t = new n.Vector3;
                return function (r) {
                    if (this.objects.length > 1) {
                        e.setFromMatrixPosition(r.matrixWorld), t.setFromMatrixPosition(this.matrixWorld);
                        var i = e.distanceTo(t);
                        this.objects[0].object.visible = !0;
                        for (var n = 1, o = this.objects.length; o > n && i >= this.objects[n].distance; n++) this.objects[n - 1].object.visible = !1, this.objects[n].object.visible = !0;
                        for (; o > n; n++) this.objects[n].object.visible = !1
                    }
                }
            }(), n.LOD.prototype.clone = function (e) {
                void 0 === e && (e = new n.LOD), n.Object3D.prototype.clone.call(this, e);
                for (var t = 0, r = this.objects.length; r > t; t++) {
                    var i = this.objects[t].object.clone();
                    i.visible = 0 === t, e.addLevel(i, this.objects[t].distance)
                }
                return e
            }, n.Sprite = function () {
                var e = new Uint16Array([0, 1, 2, 0, 2, 3]),
                    t = new Float32Array([-.5, -.5, 0, .5, -.5, 0, .5, .5, 0, -.5, .5, 0]),
                    r = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
                    i = new n.BufferGeometry;
                return i.addAttribute("index", new n.BufferAttribute(e, 1)), i.addAttribute("position", new n.BufferAttribute(t, 3)), i.addAttribute("uv", new n.BufferAttribute(r, 2)),
                    function (e) {
                        n.Object3D.call(this), this.type = "Sprite", this.geometry = i, this.material = void 0 !== e ? e : new n.SpriteMaterial
                    }
            }(), n.Sprite.prototype = Object.create(n.Object3D.prototype), n.Sprite.prototype.constructor = n.Sprite, n.Sprite.prototype.raycast = function () {
                var e = new n.Vector3;
                return function (t, r) {
                    e.setFromMatrixPosition(this.matrixWorld);
                    var i = t.ray.distanceToPoint(e);
                    i > this.scale.x || r.push({
                        distance: i,
                        point: this.position,
                        face: null,
                        object: this
                    })
                }
            }(), n.Sprite.prototype.clone = function (e) {
                return void 0 === e && (e = new n.Sprite(this.material)), n.Object3D.prototype.clone.call(this, e), e
            }, n.Particle = n.Sprite, n.LensFlare = function (e, t, r, i, o) {
                n.Object3D.call(this), this.lensFlares = [], this.positionScreen = new n.Vector3, this.customUpdateCallback = void 0, void 0 !== e && this.add(e, t, r, i, o)
            }, n.LensFlare.prototype = Object.create(n.Object3D.prototype), n.LensFlare.prototype.constructor = n.LensFlare, n.LensFlare.prototype.add = function (e, t, r, i, o, a) {
                void 0 === t && (t = -1), void 0 === r && (r = 0), void 0 === a && (a = 1), void 0 === o && (o = new n.Color(16777215)), void 0 === i && (i = n.NormalBlending), r = Math.min(r, Math.max(0, r)), this.lensFlares.push({
                    texture: e,
                    size: t,
                    distance: r,
                    x: 0,
                    y: 0,
                    z: 0,
                    scale: 1,
                    rotation: 1,
                    opacity: a,
                    color: o,
                    blending: i
                })
            }, n.LensFlare.prototype.updateLensFlares = function () {
                var e, t, r = this.lensFlares.length,
                    i = 2 * -this.positionScreen.x,
                    n = 2 * -this.positionScreen.y;
                for (e = 0; r > e; e++) t = this.lensFlares[e], t.x = this.positionScreen.x + i * t.distance, t.y = this.positionScreen.y + n * t.distance, t.wantedRotation = t.x * Math.PI * .25, t.rotation += .25 * (t.wantedRotation - t.rotation)
            }, n.Scene = function () {
                n.Object3D.call(this), this.type = "Scene", this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0
            }, n.Scene.prototype = Object.create(n.Object3D.prototype), n.Scene.prototype.constructor = n.Scene, n.Scene.prototype.clone = function (e) {
                return void 0 === e && (e = new n.Scene), n.Object3D.prototype.clone.call(this, e), null !== this.fog && (e.fog = this.fog.clone()), null !== this.overrideMaterial && (e.overrideMaterial = this.overrideMaterial.clone()), e.autoUpdate = this.autoUpdate, e.matrixAutoUpdate = this.matrixAutoUpdate, e
            }, n.Fog = function (e, t, r) {
                this.name = "", this.color = new n.Color(e), this.near = void 0 !== t ? t : 1, this.far = void 0 !== r ? r : 1e3
            }, n.Fog.prototype.clone = function () {
                return new n.Fog(this.color.getHex(), this.near, this.far)
            }, n.FogExp2 = function (e, t) {
                this.name = "", this.color = new n.Color(e), this.density = void 0 !== t ? t : 25e-5
            }, n.FogExp2.prototype.clone = function () {
                return new n.FogExp2(this.color.getHex(), this.density)
            }, n.ShaderChunk = {}, n.ShaderChunk.common = "#define PI 3.14159\n#define PI2 6.28318\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n\nfloat square( in float a ) { return a*a; }\nvec2  square( in vec2 a )  { return vec2( a.x*a.x, a.y*a.y ); }\nvec3  square( in vec3 a )  { return vec3( a.x*a.x, a.y*a.y, a.z*a.z ); }\nvec4  square( in vec4 a )  { return vec4( a.x*a.x, a.y*a.y, a.z*a.z, a.w*a.w ); }\nfloat saturate( in float a ) { return clamp( a, 0.0, 1.0 ); }\nvec2  saturate( in vec2 a )  { return clamp( a, 0.0, 1.0 ); }\nvec3  saturate( in vec3 a )  { return clamp( a, 0.0, 1.0 ); }\nvec4  saturate( in vec4 a )  { return clamp( a, 0.0, 1.0 ); }\nfloat average( in float a ) { return a; }\nfloat average( in vec2 a )  { return ( a.x + a.y) * 0.5; }\nfloat average( in vec3 a )  { return ( a.x + a.y + a.z) / 3.0; }\nfloat average( in vec4 a )  { return ( a.x + a.y + a.z + a.w) * 0.25; }\nfloat whiteCompliment( in float a ) { return saturate( 1.0 - a ); }\nvec2  whiteCompliment( in vec2 a )  { return saturate( vec2(1.0) - a ); }\nvec3  whiteCompliment( in vec3 a )  { return saturate( vec3(1.0) - a ); }\nvec4  whiteCompliment( in vec4 a )  { return saturate( vec4(1.0) - a ); }\nvec3 transformDirection( in vec3 normal, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );\n}\n// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\nvec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {\n	return normalize( ( vec4( normal, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal) {\n	float distance = dot( planeNormal, point-pointOnPlane );\n	return point - distance * planeNormal;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n	return sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n	return pointOnLine + lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) );\n}\nfloat calcLightAttenuation( float lightDistance, float cutoffDistance, float decayExponent ) {\n	if ( decayExponent > 0.0 ) {\n	  return pow( saturate( 1.0 - lightDistance / cutoffDistance ), decayExponent );\n	}\n	return 1.0;\n}\n\nvec3 inputToLinear( in vec3 a ) {\n#ifdef GAMMA_INPUT\n	return pow( a, vec3( float( GAMMA_FACTOR ) ) );\n#else\n	return a;\n#endif\n}\nvec3 linearToOutput( in vec3 a ) {\n#ifdef GAMMA_OUTPUT\n	return pow( a, vec3( 1.0 / float( GAMMA_FACTOR ) ) );\n#else\n	return a;\n#endif\n}\n", n.ShaderChunk.alphatest_fragment = "#ifdef ALPHATEST\n\n	if ( diffuseColor.a < ALPHATEST ) discard;\n\n#endif\n", n.ShaderChunk.lights_lambert_vertex = "vLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack = vec3( 0.0 );\n\n#endif\n\ntransformedNormal = normalize( transformedNormal );\n\n#if MAX_DIR_LIGHTS > 0\n\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n	vec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n	float dotProduct = dot( transformedNormal, dirVector );\n	vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n	#ifdef DOUBLE_SIDED\n\n		vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n		#ifdef WRAP_AROUND\n\n			vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n		#endif\n\n	#endif\n\n	#ifdef WRAP_AROUND\n\n		vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n		directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n\n		#ifdef DOUBLE_SIDED\n\n			directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n\n		#endif\n\n	#endif\n\n	vLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n\n	#ifdef DOUBLE_SIDED\n\n		vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n\n	#endif\n\n}\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n		float attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n		lVector = normalize( lVector );\n		float dotProduct = dot( transformedNormal, lVector );\n\n		vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n		#ifdef DOUBLE_SIDED\n\n			vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n			#ifdef WRAP_AROUND\n\n				vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n			#endif\n\n		#endif\n\n		#ifdef WRAP_AROUND\n\n			vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n			pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n\n			#ifdef DOUBLE_SIDED\n\n				pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n\n			#endif\n\n		#endif\n\n		vLightFront += pointLightColor[ i ] * pointLightWeighting * attenuation;\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += pointLightColor[ i ] * pointLightWeightingBack * attenuation;\n\n		#endif\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n			float attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n			lVector = normalize( lVector );\n\n			float dotProduct = dot( transformedNormal, lVector );\n			vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n			#ifdef DOUBLE_SIDED\n\n				vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n				#ifdef WRAP_AROUND\n\n					vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n				#endif\n\n			#endif\n\n			#ifdef WRAP_AROUND\n\n				vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n				spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n\n				#ifdef DOUBLE_SIDED\n\n					spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n\n				#endif\n\n			#endif\n\n			vLightFront += spotLightColor[ i ] * spotLightWeighting * attenuation * spotEffect;\n\n			#ifdef DOUBLE_SIDED\n\n				vLightBack += spotLightColor[ i ] * spotLightWeightingBack * attenuation * spotEffect;\n\n			#endif\n\n		}\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n		float dotProduct = dot( transformedNormal, lVector );\n\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n		float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n\n		vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\n		#endif\n\n	}\n\n#endif\n\nvLightFront += ambientLightColor;\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack += ambientLightColor;\n\n#endif\n", n.ShaderChunk.map_particle_pars_fragment = "#ifdef USE_MAP\n\n	uniform vec4 offsetRepeat;\n	uniform sampler2D map;\n\n#endif\n", n.ShaderChunk.default_vertex = "#ifdef USE_SKINNING\n\n	vec4 mvPosition = modelViewMatrix * skinned;\n\n#elif defined( USE_MORPHTARGETS )\n\n	vec4 mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n\n#else\n\n	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n#endif\n\ngl_Position = projectionMatrix * mvPosition;\n", n.ShaderChunk.map_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	varying vec2 vUv;\n\n#endif\n\n#ifdef USE_MAP\n\n	uniform sampler2D map;\n\n#endif", n.ShaderChunk.skinnormal_vertex = "#ifdef USE_SKINNING\n\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n	#ifdef USE_MORPHNORMALS\n\n	vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n\n	#else\n\n	vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n\n	#endif\n\n#endif\n", n.ShaderChunk.logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		varying float vFragDepth;\n\n	#endif\n\n	uniform float logDepthBufFC;\n\n#endif", n.ShaderChunk.lightmap_pars_vertex = "#ifdef USE_LIGHTMAP\n\n	varying vec2 vUv2;\n\n#endif", n.ShaderChunk.lights_phong_fragment = "#ifndef FLAT_SHADED\n\n	vec3 normal = normalize( vNormal );\n\n	#ifdef DOUBLE_SIDED\n\n		normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\n	#endif\n\n#else\n\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n\n#endif\n\nvec3 viewPosition = normalize( vViewPosition );\n\n#ifdef USE_NORMALMAP\n\n	normal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n\nvec3 totalDiffuseLight = vec3( 0.0 );\nvec3 totalSpecularLight = vec3( 0.0 );\n\n#if MAX_POINT_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n		float attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n		lVector = normalize( lVector );\n\n		// diffuse\n\n		float dotProduct = dot( normal, lVector );\n\n		#ifdef WRAP_AROUND\n\n			float pointDiffuseWeightFull = max( dotProduct, 0.0 );\n			float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n			vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n		#else\n\n			float pointDiffuseWeight = max( dotProduct, 0.0 );\n\n		#endif\n\n		totalDiffuseLight += pointLightColor[ i ] * pointDiffuseWeight * attenuation;\n\n				// specular\n\n		vec3 pointHalfVector = normalize( lVector + viewPosition );\n		float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n		float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n		totalSpecularLight += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * attenuation * specularNormalization;\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n		float attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n		lVector = normalize( lVector );\n\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n			// diffuse\n\n			float dotProduct = dot( normal, lVector );\n\n			#ifdef WRAP_AROUND\n\n				float spotDiffuseWeightFull = max( dotProduct, 0.0 );\n				float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n				vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\n			#else\n\n				float spotDiffuseWeight = max( dotProduct, 0.0 );\n\n			#endif\n\n			totalDiffuseLight += spotLightColor[ i ] * spotDiffuseWeight * attenuation * spotEffect;\n\n			// specular\n\n			vec3 spotHalfVector = normalize( lVector + viewPosition );\n			float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n			float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\n			float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n			totalSpecularLight += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * attenuation * specularNormalization * spotEffect;\n\n		}\n\n	}\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n	for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n		vec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n		// diffuse\n\n		float dotProduct = dot( normal, dirVector );\n\n		#ifdef WRAP_AROUND\n\n			float dirDiffuseWeightFull = max( dotProduct, 0.0 );\n			float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n			vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n		#else\n\n			float dirDiffuseWeight = max( dotProduct, 0.0 );\n\n		#endif\n\n		totalDiffuseLight += directionalLightColor[ i ] * dirDiffuseWeight;\n\n		// specular\n\n		vec3 dirHalfVector = normalize( dirVector + viewPosition );\n		float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n		float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n		/*\n		// fresnel term from skin shader\n		const float F0 = 0.128;\n\n		float base = 1.0 - dot( viewPosition, dirHalfVector );\n		float exponential = pow( base, 5.0 );\n\n		float fresnel = exponential + F0 * ( 1.0 - exponential );\n		*/\n\n		/*\n		// fresnel term from fresnel shader\n		const float mFresnelBias = 0.08;\n		const float mFresnelScale = 0.3;\n		const float mFresnelPower = 5.0;\n\n		float fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );\n		*/\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		// 		dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;\n\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n		totalSpecularLight += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n		// diffuse\n\n		float dotProduct = dot( normal, lVector );\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n		vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		totalDiffuseLight += hemiColor;\n\n		// specular (sky light)\n\n		vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n		float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n		float hemiSpecularWeightSky = specularStrength * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );\n\n		// specular (ground light)\n\n		vec3 lVectorGround = -lVector;\n\n		vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n		float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n		float hemiSpecularWeightGround = specularStrength * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );\n\n		float dotProductGround = dot( normal, lVectorGround );\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n		vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n		totalSpecularLight += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\n	}\n\n#endif\n\n#ifdef METAL\n\n	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) * specular + totalSpecularLight + emissive;\n\n#else\n\n	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) + totalSpecularLight + emissive;\n\n#endif\n", n.ShaderChunk.fog_pars_fragment = "#ifdef USE_FOG\n\n	uniform vec3 fogColor;\n\n	#ifdef FOG_EXP2\n\n		uniform float fogDensity;\n\n	#else\n\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n\n#endif", n.ShaderChunk.morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\n	vec3 morphedNormal = vec3( 0.0 );\n\n	morphedNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n	morphedNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n	morphedNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n	morphedNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n	morphedNormal += normal;\n\n#endif", n.ShaderChunk.envmap_pars_fragment = "#ifdef USE_ENVMAP\n\n	uniform float reflectivity;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n	uniform float flipEnvMap;\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n		uniform float refractionRatio;\n\n	#else\n\n		varying vec3 vReflect;\n\n	#endif\n\n#endif\n", n.ShaderChunk.logdepthbuf_fragment = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\n	gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n\n#endif", n.ShaderChunk.normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n\n	// Per-Pixel Tangent Space Normal Mapping\n	// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( vUv.st );\n		vec2 st1 = dFdy( vUv.st );\n\n		vec3 S = normalize( q0 * st1.t - q1 * st0.t );\n		vec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n		vec3 N = normalize( surf_norm );\n\n		vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n		mapN.xy = normalScale * mapN.xy;\n		mat3 tsn = mat3( S, T, N );\n		return normalize( tsn * mapN );\n\n	}\n\n#endif\n", n.ShaderChunk.lights_phong_pars_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n", n.ShaderChunk.lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\n	varying vec2 vUv2;\n	uniform sampler2D lightMap;\n\n#endif", n.ShaderChunk.shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\n	}\n\n#endif", n.ShaderChunk.lights_phong_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	vWorldPosition = worldPosition.xyz;\n\n#endif", n.ShaderChunk.map_fragment = "#ifdef USE_MAP\n\n	vec4 texelColor = texture2D( map, vUv );\n\n	texelColor.xyz = inputToLinear( texelColor.xyz );\n\n	diffuseColor *= texelColor;\n\n#endif", n.ShaderChunk.lightmap_vertex = "#ifdef USE_LIGHTMAP\n\n	vUv2 = uv2;\n\n#endif", n.ShaderChunk.map_particle_fragment = "#ifdef USE_MAP\n\n	diffuseColor *= texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\n#endif\n", n.ShaderChunk.color_pars_fragment = "#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif\n", n.ShaderChunk.color_vertex = "#ifdef USE_COLOR\n\n	vColor.xyz = inputToLinear( color.xyz );\n\n#endif", n.ShaderChunk.skinning_vertex = "#ifdef USE_SKINNING\n\n	#ifdef USE_MORPHTARGETS\n\n	vec4 skinVertex = bindMatrix * vec4( morphed, 1.0 );\n\n	#else\n\n	vec4 skinVertex = bindMatrix * vec4( position, 1.0 );\n\n	#endif\n\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	skinned  = bindMatrixInverse * skinned;\n\n#endif\n", n.ShaderChunk.envmap_pars_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n	varying vec3 vReflect;\n\n	uniform float refractionRatio;\n\n#endif\n", n.ShaderChunk.linear_to_gamma_fragment = "\n	outgoingLight = linearToOutput( outgoingLight );\n", n.ShaderChunk.color_pars_vertex = "#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif", n.ShaderChunk.lights_lambert_pars_vertex = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#ifdef WRAP_AROUND\n\n	uniform vec3 wrapRGB;\n\n#endif\n", n.ShaderChunk.map_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	varying vec2 vUv;\n	uniform vec4 offsetRepeat;\n\n#endif\n", n.ShaderChunk.envmap_fragment = "#ifdef USE_ENVMAP\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n		// Transforming Normal Vectors with the Inverse Transformation\n		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n		#ifdef ENVMAP_MODE_REFLECTION\n\n			vec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\n		#else\n\n			vec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n		#endif\n\n	#else\n\n		vec3 reflectVec = vReflect;\n\n	#endif\n\n	#ifdef DOUBLE_SIDED\n		float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n	#else\n		float flipNormal = 1.0;\n	#endif\n\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n	#elif defined( ENVMAP_TYPE_EQUIREC )\n		vec2 sampleUV;\n		sampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n		sampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n		vec4 envColor = texture2D( envMap, sampleUV );\n\n	#elif defined( ENVMAP_TYPE_SPHERE )\n		vec3 reflectView = flipNormal * normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));\n		vec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n	#endif\n\n	envColor.xyz = inputToLinear( envColor.xyz );\n\n	#ifdef ENVMAP_BLENDING_MULTIPLY\n\n		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n	#elif defined( ENVMAP_BLENDING_MIX )\n\n		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n	#elif defined( ENVMAP_BLENDING_ADD )\n\n		outgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n	#endif\n\n#endif\n",
            n.ShaderChunk.specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\n	uniform sampler2D specularMap;\n\n#endif", n.ShaderChunk.logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\n	gl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		vFragDepth = 1.0 + gl_Position.w;\n\n#else\n\n		gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\n	#endif\n\n#endif", n.ShaderChunk.morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\n	#ifndef USE_MORPHNORMALS\n\n	uniform float morphTargetInfluences[ 8 ];\n\n	#else\n\n	uniform float morphTargetInfluences[ 4 ];\n\n	#endif\n\n#endif", n.ShaderChunk.specularmap_fragment = "float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n	vec4 texelSpecular = texture2D( specularMap, vUv );\n	specularStrength = texelSpecular.r;\n\n#else\n\n	specularStrength = 1.0;\n\n#endif", n.ShaderChunk.fog_fragment = "#ifdef USE_FOG\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		float depth = gl_FragDepthEXT / gl_FragCoord.w;\n\n	#else\n\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n\n	#endif\n\n	#ifdef FOG_EXP2\n\n		float fogFactor = exp2( - square( fogDensity ) * square( depth ) * LOG2 );\n		fogFactor = whiteCompliment( fogFactor );\n\n	#else\n\n		float fogFactor = smoothstep( fogNear, fogFar, depth );\n\n	#endif\n	\n	outgoingLight = mix( outgoingLight, fogColor, fogFactor );\n\n#endif", n.ShaderChunk.bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n\n	// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n	// http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n	vec2 dHdxy_fwd() {\n\n		vec2 dSTdx = dFdx( vUv );\n		vec2 dSTdy = dFdy( vUv );\n\n		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n		return vec2( dBx, dBy );\n\n	}\n\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n		vec3 vSigmaX = dFdx( surf_pos );\n		vec3 vSigmaY = dFdy( surf_pos );\n		vec3 vN = surf_norm;		// normalized\n\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n\n		float fDet = dot( vSigmaX, R1 );\n\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n\n	}\n\n#endif\n", n.ShaderChunk.defaultnormal_vertex = "#ifdef USE_SKINNING\n\n	vec3 objectNormal = skinnedNormal.xyz;\n\n#elif defined( USE_MORPHNORMALS )\n\n	vec3 objectNormal = morphedNormal;\n\n#else\n\n	vec3 objectNormal = normal;\n\n#endif\n\n#ifdef FLIP_SIDED\n\n	objectNormal = -objectNormal;\n\n#endif\n\nvec3 transformedNormal = normalMatrix * objectNormal;\n", n.ShaderChunk.lights_phong_pars_fragment = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n\n#ifdef WRAP_AROUND\n\n	uniform vec3 wrapRGB;\n\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n	varying vec3 vNormal;\n\n#endif\n", n.ShaderChunk.skinbase_vertex = "#ifdef USE_SKINNING\n\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif", n.ShaderChunk.map_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n\n#endif", n.ShaderChunk.lightmap_fragment = "#ifdef USE_LIGHTMAP\n\n	outgoingLight *= diffuseColor.xyz * texture2D( lightMap, vUv2 ).xyz;\n\n#endif", n.ShaderChunk.shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n	uniform mat4 shadowMatrix[ MAX_SHADOWS ];\n\n#endif", n.ShaderChunk.color_fragment = "#ifdef USE_COLOR\n\n	diffuseColor.rgb *= vColor;\n\n#endif", n.ShaderChunk.morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\n	vec3 morphed = vec3( 0.0 );\n	morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n	morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n	morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n	morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n	#ifndef USE_MORPHNORMALS\n\n	morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n	morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n	morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n	morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n	#endif\n\n	morphed += position;\n\n#endif", n.ShaderChunk.envmap_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n	vec3 worldNormal = transformDirection( objectNormal, modelMatrix );\n\n	vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n	#ifdef ENVMAP_MODE_REFLECTION\n\n		vReflect = reflect( cameraToVertex, worldNormal );\n\n	#else\n\n		vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n	#endif\n\n#endif\n", n.ShaderChunk.shadowmap_fragment = "#ifdef USE_SHADOWMAP\n\n	#ifdef SHADOWMAP_DEBUG\n\n		vec3 frustumColors[3];\n		frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n		frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n		frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\n	#endif\n\n	#ifdef SHADOWMAP_CASCADE\n\n		int inFrustumCount = 0;\n\n	#endif\n\n	float fDepth;\n	vec3 shadowColor = vec3( 1.0 );\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\n				// if ( something && something ) breaks ATI OpenGL shader compiler\n				// if ( all( something, something ) ) using this instead\n\n		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n		bool inFrustum = all( inFrustumVec );\n\n				// don't shadow pixels outside of light frustum\n				// use just first frustum (for cascades)\n				// don't shadow pixels behind far plane of light frustum\n\n		#ifdef SHADOWMAP_CASCADE\n\n			inFrustumCount += int( inFrustum );\n			bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n\n		#else\n\n			bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n		#endif\n\n		bool frustumTest = all( frustumTestVec );\n\n		if ( frustumTest ) {\n\n			shadowCoord.z += shadowBias[ i ];\n\n			#if defined( SHADOWMAP_TYPE_PCF )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n		/*\n						// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n						// must enroll loop manually\n\n				for ( float y = -1.25; y <= 1.25; y += 1.25 )\n					for ( float x = -1.25; x <= 1.25; x += 1.25 ) {\n\n						vec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\n\n								// doesn't seem to produce any noticeable visual difference compared to simple texture2D lookup\n								//vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\n\n						float fDepth = unpackDepth( rgbaDepth );\n\n						if ( fDepth < shadowCoord.z )\n							shadow += 1.0;\n\n				}\n\n				shadow /= 9.0;\n\n		*/\n\n				const float shadowDelta = 1.0 / 9.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.25 * xPixelOffset;\n				float dy0 = -1.25 * yPixelOffset;\n				float dx1 = 1.25 * xPixelOffset;\n				float dy1 = 1.25 * yPixelOffset;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.0 * xPixelOffset;\n				float dy0 = -1.0 * yPixelOffset;\n				float dx1 = 1.0 * xPixelOffset;\n				float dy1 = 1.0 * yPixelOffset;\n\n				mat3 shadowKernel;\n				mat3 depthKernel;\n\n				depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\n				vec3 shadowZ = vec3( shadowCoord.z );\n				shadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n				shadowKernel[0] *= vec3(0.25);\n\n				shadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n				shadowKernel[1] *= vec3(0.25);\n\n				shadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n				shadowKernel[2] *= vec3(0.25);\n\n				vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\n				shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n				shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\n				vec4 shadowValues;\n				shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n				shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n				shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n				shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\n				shadow = dot( shadowValues, vec4( 1.0 ) );\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#else\n\n				vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n				float fDepth = unpackDepth( rgbaDepth );\n\n				if ( fDepth < shadowCoord.z )\n\n		// spot with multiple shadows is darker\n\n					shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\n		// spot with multiple shadows has the same color as single shadow spot\n\n		// 					shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\n\n			#endif\n\n		}\n\n\n		#ifdef SHADOWMAP_DEBUG\n\n			#ifdef SHADOWMAP_CASCADE\n\n				if ( inFrustum && inFrustumCount == 1 ) outgoingLight *= frustumColors[ i ];\n\n			#else\n\n				if ( inFrustum ) outgoingLight *= frustumColors[ i ];\n\n			#endif\n\n		#endif\n\n	}\n\n	// NOTE: I am unsure if this is correct in linear space.  -bhouston, Dec 29, 2014\n	shadowColor = inputToLinear( shadowColor );\n\n	outgoingLight = outgoingLight * shadowColor;\n\n#endif\n", n.ShaderChunk.worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\n	#ifdef USE_SKINNING\n\n		vec4 worldPosition = modelMatrix * skinned;\n\n	#elif defined( USE_MORPHTARGETS )\n\n		vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n\n	#else\n\n		vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\n	#endif\n\n#endif\n", n.ShaderChunk.shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\n	uniform sampler2D shadowMap[ MAX_SHADOWS ];\n	uniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\n	uniform float shadowDarkness[ MAX_SHADOWS ];\n	uniform float shadowBias[ MAX_SHADOWS ];\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n\n	float unpackDepth( const in vec4 rgba_depth ) {\n\n		const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n		float depth = dot( rgba_depth, bit_shift );\n		return depth;\n\n	}\n\n#endif", n.ShaderChunk.skinning_pars_vertex = "#ifdef USE_SKINNING\n\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n\n	#ifdef BONE_TEXTURE\n\n		uniform sampler2D boneTexture;\n		uniform int boneTextureWidth;\n		uniform int boneTextureHeight;\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			float j = i * 4.0;\n			float x = mod( j, float( boneTextureWidth ) );\n			float y = floor( j / float( boneTextureWidth ) );\n\n			float dx = 1.0 / float( boneTextureWidth );\n			float dy = 1.0 / float( boneTextureHeight );\n\n			y = dy * ( y + 0.5 );\n\n			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n			mat4 bone = mat4( v1, v2, v3, v4 );\n\n			return bone;\n\n		}\n\n	#else\n\n		uniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			mat4 bone = boneGlobalMatrices[ int(i) ];\n			return bone;\n\n		}\n\n	#endif\n\n#endif\n", n.ShaderChunk.logdepthbuf_pars_fragment = "#ifdef USE_LOGDEPTHBUF\n\n	uniform float logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		#extension GL_EXT_frag_depth : enable\n		varying float vFragDepth;\n\n	#endif\n\n#endif", n.ShaderChunk.alphamap_fragment = "#ifdef USE_ALPHAMAP\n\n	diffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n", n.ShaderChunk.alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\n	uniform sampler2D alphaMap;\n\n#endif\n", n.UniformsUtils = {
                merge: function (e) {
                    for (var t = {}, r = 0; r < e.length; r++) {
                        var i = this.clone(e[r]);
                        for (var n in i) t[n] = i[n]
                    }
                    return t
                },
                clone: function (e) {
                    var t = {};
                    for (var r in e) {
                        t[r] = {};
                        for (var i in e[r]) {
                            var o = e[r][i];
                            t[r][i] = o instanceof n.Color || o instanceof n.Vector2 || o instanceof n.Vector3 || o instanceof n.Vector4 || o instanceof n.Matrix4 || o instanceof n.Texture ? o.clone() : o instanceof Array ? o.slice() : o
                        }
                    }
                    return t
                }
            }, n.UniformsLib = {
                common: {
                    diffuse: {
                        type: "c",
                        value: new n.Color(15658734)
                    },
                    opacity: {
                        type: "f",
                        value: 1
                    },
                    map: {
                        type: "t",
                        value: null
                    },
                    offsetRepeat: {
                        type: "v4",
                        value: new n.Vector4(0, 0, 1, 1)
                    },
                    lightMap: {
                        type: "t",
                        value: null
                    },
                    specularMap: {
                        type: "t",
                        value: null
                    },
                    alphaMap: {
                        type: "t",
                        value: null
                    },
                    envMap: {
                        type: "t",
                        value: null
                    },
                    flipEnvMap: {
                        type: "f",
                        value: -1
                    },
                    reflectivity: {
                        type: "f",
                        value: 1
                    },
                    refractionRatio: {
                        type: "f",
                        value: .98
                    },
                    morphTargetInfluences: {
                        type: "f",
                        value: 0
                    }
                },
                bump: {
                    bumpMap: {
                        type: "t",
                        value: null
                    },
                    bumpScale: {
                        type: "f",
                        value: 1
                    }
                },
                normalmap: {
                    normalMap: {
                        type: "t",
                        value: null
                    },
                    normalScale: {
                        type: "v2",
                        value: new n.Vector2(1, 1)
                    }
                },
                fog: {
                    fogDensity: {
                        type: "f",
                        value: 25e-5
                    },
                    fogNear: {
                        type: "f",
                        value: 1
                    },
                    fogFar: {
                        type: "f",
                        value: 2e3
                    },
                    fogColor: {
                        type: "c",
                        value: new n.Color(16777215)
                    }
                },
                lights: {
                    ambientLightColor: {
                        type: "fv",
                        value: []
                    },
                    directionalLightDirection: {
                        type: "fv",
                        value: []
                    },
                    directionalLightColor: {
                        type: "fv",
                        value: []
                    },
                    hemisphereLightDirection: {
                        type: "fv",
                        value: []
                    },
                    hemisphereLightSkyColor: {
                        type: "fv",
                        value: []
                    },
                    hemisphereLightGroundColor: {
                        type: "fv",
                        value: []
                    },
                    pointLightColor: {
                        type: "fv",
                        value: []
                    },
                    pointLightPosition: {
                        type: "fv",
                        value: []
                    },
                    pointLightDistance: {
                        type: "fv1",
                        value: []
                    },
                    pointLightDecay: {
                        type: "fv1",
                        value: []
                    },
                    spotLightColor: {
                        type: "fv",
                        value: []
                    },
                    spotLightPosition: {
                        type: "fv",
                        value: []
                    },
                    spotLightDirection: {
                        type: "fv",
                        value: []
                    },
                    spotLightDistance: {
                        type: "fv1",
                        value: []
                    },
                    spotLightAngleCos: {
                        type: "fv1",
                        value: []
                    },
                    spotLightExponent: {
                        type: "fv1",
                        value: []
                    },
                    spotLightDecay: {
                        type: "fv1",
                        value: []
                    }
                },
                particle: {
                    psColor: {
                        type: "c",
                        value: new n.Color(15658734)
                    },
                    opacity: {
                        type: "f",
                        value: 1
                    },
                    size: {
                        type: "f",
                        value: 1
                    },
                    scale: {
                        type: "f",
                        value: 1
                    },
                    map: {
                        type: "t",
                        value: null
                    },
                    offsetRepeat: {
                        type: "v4",
                        value: new n.Vector4(0, 0, 1, 1)
                    },
                    fogDensity: {
                        type: "f",
                        value: 25e-5
                    },
                    fogNear: {
                        type: "f",
                        value: 1
                    },
                    fogFar: {
                        type: "f",
                        value: 2e3
                    },
                    fogColor: {
                        type: "c",
                        value: new n.Color(16777215)
                    }
                },
                shadowmap: {
                    shadowMap: {
                        type: "tv",
                        value: []
                    },
                    shadowMapSize: {
                        type: "v2v",
                        value: []
                    },
                    shadowBias: {
                        type: "fv1",
                        value: []
                    },
                    shadowDarkness: {
                        type: "fv1",
                        value: []
                    },
                    shadowMatrix: {
                        type: "m4v",
                        value: []
                    }
                }
            }, n.ShaderLib = {
                basic: {
                    uniforms: n.UniformsUtils.merge([n.UniformsLib.common, n.UniformsLib.fog, n.UniformsLib.shadowmap]),
                    vertexShader: [n.ShaderChunk.common, n.ShaderChunk.map_pars_vertex, n.ShaderChunk.lightmap_pars_vertex, n.ShaderChunk.envmap_pars_vertex, n.ShaderChunk.color_pars_vertex, n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.map_vertex, n.ShaderChunk.lightmap_vertex, n.ShaderChunk.color_vertex, n.ShaderChunk.skinbase_vertex, "	#ifdef USE_ENVMAP", n.ShaderChunk.morphnormal_vertex, n.ShaderChunk.skinnormal_vertex, n.ShaderChunk.defaultnormal_vertex, "	#endif", n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.skinning_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, n.ShaderChunk.worldpos_vertex, n.ShaderChunk.envmap_vertex, n.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", n.ShaderChunk.common, n.ShaderChunk.color_pars_fragment, n.ShaderChunk.map_pars_fragment, n.ShaderChunk.alphamap_pars_fragment, n.ShaderChunk.lightmap_pars_fragment, n.ShaderChunk.envmap_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.specularmap_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( diffuse, opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.map_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.alphamap_fragment, n.ShaderChunk.alphatest_fragment, n.ShaderChunk.specularmap_fragment, "	outgoingLight = diffuseColor.rgb;", n.ShaderChunk.lightmap_fragment, n.ShaderChunk.envmap_fragment, n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.linear_to_gamma_fragment, n.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
                },
                lambert: {
                    uniforms: n.UniformsUtils.merge([n.UniformsLib.common, n.UniformsLib.fog, n.UniformsLib.lights, n.UniformsLib.shadowmap, {
                        emissive: {
                            type: "c",
                            value: new n.Color(0)
                        },
                        wrapRGB: {
                            type: "v3",
                            value: new n.Vector3(1, 1, 1)
                        }
                    }]),
                    vertexShader: ["#define LAMBERT", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "	varying vec3 vLightBack;", "#endif", n.ShaderChunk.common, n.ShaderChunk.map_pars_vertex, n.ShaderChunk.lightmap_pars_vertex, n.ShaderChunk.envmap_pars_vertex, n.ShaderChunk.lights_lambert_pars_vertex, n.ShaderChunk.color_pars_vertex, n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.map_vertex, n.ShaderChunk.lightmap_vertex, n.ShaderChunk.color_vertex, n.ShaderChunk.morphnormal_vertex, n.ShaderChunk.skinbase_vertex, n.ShaderChunk.skinnormal_vertex, n.ShaderChunk.defaultnormal_vertex, n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.skinning_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, n.ShaderChunk.worldpos_vertex, n.ShaderChunk.envmap_vertex, n.ShaderChunk.lights_lambert_vertex, n.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform float opacity;", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "	varying vec3 vLightBack;", "#endif", n.ShaderChunk.common, n.ShaderChunk.color_pars_fragment, n.ShaderChunk.map_pars_fragment, n.ShaderChunk.alphamap_pars_fragment, n.ShaderChunk.lightmap_pars_fragment, n.ShaderChunk.envmap_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.specularmap_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( diffuse, opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.map_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.alphamap_fragment, n.ShaderChunk.alphatest_fragment, n.ShaderChunk.specularmap_fragment, "	#ifdef DOUBLE_SIDED", "		if ( gl_FrontFacing )", "			outgoingLight += diffuseColor.rgb * vLightFront + emissive;", "		else", "			outgoingLight += diffuseColor.rgb * vLightBack + emissive;", "	#else", "		outgoingLight += diffuseColor.rgb * vLightFront + emissive;", "	#endif", n.ShaderChunk.lightmap_fragment, n.ShaderChunk.envmap_fragment, n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.linear_to_gamma_fragment, n.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
                },
                phong: {
                    uniforms: n.UniformsUtils.merge([n.UniformsLib.common, n.UniformsLib.bump, n.UniformsLib.normalmap, n.UniformsLib.fog, n.UniformsLib.lights, n.UniformsLib.shadowmap, {
                        emissive: {
                            type: "c",
                            value: new n.Color(0)
                        },
                        specular: {
                            type: "c",
                            value: new n.Color(1118481)
                        },
                        shininess: {
                            type: "f",
                            value: 30
                        },
                        wrapRGB: {
                            type: "v3",
                            value: new n.Vector3(1, 1, 1)
                        }
                    }]),
                    vertexShader: ["#define PHONG", "varying vec3 vViewPosition;", "#ifndef FLAT_SHADED", "	varying vec3 vNormal;", "#endif", n.ShaderChunk.common, n.ShaderChunk.map_pars_vertex, n.ShaderChunk.lightmap_pars_vertex, n.ShaderChunk.envmap_pars_vertex, n.ShaderChunk.lights_phong_pars_vertex, n.ShaderChunk.color_pars_vertex, n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.map_vertex, n.ShaderChunk.lightmap_vertex, n.ShaderChunk.color_vertex, n.ShaderChunk.morphnormal_vertex, n.ShaderChunk.skinbase_vertex, n.ShaderChunk.skinnormal_vertex, n.ShaderChunk.defaultnormal_vertex, "#ifndef FLAT_SHADED", "	vNormal = normalize( transformedNormal );", "#endif", n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.skinning_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, "	vViewPosition = -mvPosition.xyz;", n.ShaderChunk.worldpos_vertex, n.ShaderChunk.envmap_vertex, n.ShaderChunk.lights_phong_vertex, n.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                    fragmentShader: ["#define PHONG", "uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", "uniform float opacity;", n.ShaderChunk.common, n.ShaderChunk.color_pars_fragment, n.ShaderChunk.map_pars_fragment, n.ShaderChunk.alphamap_pars_fragment, n.ShaderChunk.lightmap_pars_fragment, n.ShaderChunk.envmap_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.lights_phong_pars_fragment, n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.bumpmap_pars_fragment, n.ShaderChunk.normalmap_pars_fragment, n.ShaderChunk.specularmap_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( diffuse, opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.map_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.alphamap_fragment, n.ShaderChunk.alphatest_fragment, n.ShaderChunk.specularmap_fragment, n.ShaderChunk.lights_phong_fragment, n.ShaderChunk.lightmap_fragment, n.ShaderChunk.envmap_fragment, n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.linear_to_gamma_fragment, n.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
                },
                particle_basic: {
                    uniforms: n.UniformsUtils.merge([n.UniformsLib.particle, n.UniformsLib.shadowmap]),
                    vertexShader: ["uniform float size;", "uniform float scale;", n.ShaderChunk.common, n.ShaderChunk.color_pars_vertex, n.ShaderChunk.shadowmap_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.color_vertex, "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "	#ifdef USE_SIZEATTENUATION", "		gl_PointSize = size * ( scale / length( mvPosition.xyz ) );", "	#else", "		gl_PointSize = size;", "	#endif", "	gl_Position = projectionMatrix * mvPosition;", n.ShaderChunk.logdepthbuf_vertex, n.ShaderChunk.worldpos_vertex, n.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform vec3 psColor;", "uniform float opacity;", n.ShaderChunk.common, n.ShaderChunk.color_pars_fragment, n.ShaderChunk.map_particle_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.shadowmap_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( psColor, opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.map_particle_fragment, n.ShaderChunk.color_fragment, n.ShaderChunk.alphatest_fragment, "	outgoingLight = diffuseColor.rgb;", n.ShaderChunk.shadowmap_fragment, n.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
                },
                dashed: {
                    uniforms: n.UniformsUtils.merge([n.UniformsLib.common, n.UniformsLib.fog, {
                        scale: {
                            type: "f",
                            value: 1
                        },
                        dashSize: {
                            type: "f",
                            value: 1
                        },
                        totalSize: {
                            type: "f",
                            value: 2
                        }
                    }]),
                    vertexShader: ["uniform float scale;", "attribute float lineDistance;", "varying float vLineDistance;", n.ShaderChunk.common, n.ShaderChunk.color_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.color_vertex, "	vLineDistance = scale * lineDistance;", "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "	gl_Position = projectionMatrix * mvPosition;", n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", "uniform float dashSize;", "uniform float totalSize;", "varying float vLineDistance;", n.ShaderChunk.common, n.ShaderChunk.color_pars_fragment, n.ShaderChunk.fog_pars_fragment, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	if ( mod( vLineDistance, totalSize ) > dashSize ) {", "		discard;", "	}", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor = vec4( diffuse, opacity );", n.ShaderChunk.logdepthbuf_fragment, n.ShaderChunk.color_fragment, "	outgoingLight = diffuseColor.rgb;", n.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
                },
                depth: {
                    uniforms: {
                        mNear: {
                            type: "f",
                            value: 1
                        },
                        mFar: {
                            type: "f",
                            value: 2e3
                        },
                        opacity: {
                            type: "f",
                            value: 1
                        }
                    },
                    vertexShader: [n.ShaderChunk.common, n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform float mNear;", "uniform float mFar;", "uniform float opacity;", n.ShaderChunk.common, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", n.ShaderChunk.logdepthbuf_fragment, "	#ifdef USE_LOGDEPTHBUF_EXT", "		float depth = gl_FragDepthEXT / gl_FragCoord.w;", "	#else", "		float depth = gl_FragCoord.z / gl_FragCoord.w;", "	#endif", "	float color = 1.0 - smoothstep( mNear, mFar, depth );", "	gl_FragColor = vec4( vec3( color ), opacity );", "}"].join("\n")
                },
                normal: {
                    uniforms: {
                        opacity: {
                            type: "f",
                            value: 1
                        }
                    },
                    vertexShader: ["varying vec3 vNormal;", n.ShaderChunk.common, n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "	vNormal = normalize( normalMatrix * normal );", n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform float opacity;", "varying vec3 vNormal;", n.ShaderChunk.common, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );", n.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
                },
                cube: {
                    uniforms: {
                        tCube: {
                            type: "t",
                            value: null
                        },
                        tFlip: {
                            type: "f",
                            value: -1
                        }
                    },
                    vertexShader: ["varying vec3 vWorldPosition;", n.ShaderChunk.common, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "	vWorldPosition = transformDirection( position, modelMatrix );", "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform samplerCube tCube;", "uniform float tFlip;", "varying vec3 vWorldPosition;", n.ShaderChunk.common, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );", n.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
                },
                equirect: {
                    uniforms: {
                        tEquirect: {
                            type: "t",
                            value: null
                        },
                        tFlip: {
                            type: "f",
                            value: -1
                        }
                    },
                    vertexShader: ["varying vec3 vWorldPosition;", n.ShaderChunk.common, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "	vWorldPosition = transformDirection( position, modelMatrix );", "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                    fragmentShader: ["uniform sampler2D tEquirect;", "uniform float tFlip;", "varying vec3 vWorldPosition;", n.ShaderChunk.common, n.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "vec3 direction = normalize( vWorldPosition );", "vec2 sampleUV;", "sampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );", "sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;", "gl_FragColor = texture2D( tEquirect, sampleUV );", n.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
                },
                depthRGBA: {
                    uniforms: {},
                    vertexShader: [n.ShaderChunk.common, n.ShaderChunk.morphtarget_pars_vertex, n.ShaderChunk.skinning_pars_vertex, n.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", n.ShaderChunk.skinbase_vertex, n.ShaderChunk.morphtarget_vertex, n.ShaderChunk.skinning_vertex, n.ShaderChunk.default_vertex, n.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
                    fragmentShader: [n.ShaderChunk.common, n.ShaderChunk.logdepthbuf_pars_fragment, "vec4 pack_depth( const in float depth ) {", "	const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );", "	const vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );", "	vec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );", "	res -= res.xxyz * bit_mask;", "	return res;", "}", "void main() {", n.ShaderChunk.logdepthbuf_fragment, "	#ifdef USE_LOGDEPTHBUF_EXT", "		gl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );", "	#else", "		gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );", "	#endif", "}"].join("\n")
                }
            }, n.WebGLRenderer = function (e) {
                function t(e) {
                    e.__webglVertexBuffer = Pe.createBuffer(), e.__webglColorBuffer = Pe.createBuffer(), Fe.info.memory.geometries++
                }

                function r(e) {
                    e.__webglVertexBuffer = Pe.createBuffer(), e.__webglColorBuffer = Pe.createBuffer(), e.__webglLineDistanceBuffer = Pe.createBuffer(), Fe.info.memory.geometries++
                }

                function i(e) {
                    e.__webglVertexBuffer = Pe.createBuffer(), e.__webglNormalBuffer = Pe.createBuffer(), e.__webglTangentBuffer = Pe.createBuffer(), e.__webglColorBuffer = Pe.createBuffer(), e.__webglUVBuffer = Pe.createBuffer(), e.__webglUV2Buffer = Pe.createBuffer(), e.__webglSkinIndicesBuffer = Pe.createBuffer(), e.__webglSkinWeightsBuffer = Pe.createBuffer(), e.__webglFaceBuffer = Pe.createBuffer(), e.__webglLineBuffer = Pe.createBuffer();
                    var t = e.numMorphTargets;
                    if (t) {
                        e.__webglMorphTargetsBuffers = [];
                        for (var r = 0, i = t; i > r; r++) e.__webglMorphTargetsBuffers.push(Pe.createBuffer())
                    }
                    var n = e.numMorphNormals;
                    if (n) {
                        e.__webglMorphNormalsBuffers = [];
                        for (var r = 0, i = n; i > r; r++) e.__webglMorphNormalsBuffers.push(Pe.createBuffer())
                    }
                    Fe.info.memory.geometries++
                }

                function o(e) {
                    var t = e.geometry,
                        r = e.material,
                        i = t.vertices.length;
                    if (r.attributes) {
                        void 0 === t.__webglCustomAttributesList && (t.__webglCustomAttributesList = []);
                        for (var n in r.attributes) {
                            var o = r.attributes[n];
                            if (!o.__webglInitialized || o.createUniqueBuffers) {
                                o.__webglInitialized = !0;
                                var a = 1;
                                "v2" === o.type ? a = 2 : "v3" === o.type ? a = 3 : "v4" === o.type ? a = 4 : "c" === o.type && (a = 3), o.size = a, o.array = new Float32Array(i * a), o.buffer = Pe.createBuffer(), o.buffer.belongsToAttribute = n, o.needsUpdate = !0
                            }
                            t.__webglCustomAttributesList.push(o)
                        }
                    }
                }

                function a(e, t) {
                    var r = e.vertices.length;
                    e.__vertexArray = new Float32Array(3 * r), e.__colorArray = new Float32Array(3 * r), e.__webglParticleCount = r, o(t)
                }

                function s(e, t) {
                    var r = e.vertices.length;
                    e.__vertexArray = new Float32Array(3 * r), e.__colorArray = new Float32Array(3 * r), e.__lineDistanceArray = new Float32Array(1 * r), e.__webglLineCount = r, o(t)
                }

                function h(e, t) {
                    var r = t.geometry,
                        i = e.faces3,
                        n = 3 * i.length,
                        o = 1 * i.length,
                        a = 3 * i.length,
                        s = l(t, e);
                    e.__vertexArray = new Float32Array(3 * n), e.__normalArray = new Float32Array(3 * n), e.__colorArray = new Float32Array(3 * n), e.__uvArray = new Float32Array(2 * n), r.faceVertexUvs.length > 1 && (e.__uv2Array = new Float32Array(2 * n)), r.hasTangents && (e.__tangentArray = new Float32Array(4 * n)), t.geometry.skinWeights.length && t.geometry.skinIndices.length && (e.__skinIndexArray = new Float32Array(4 * n), e.__skinWeightArray = new Float32Array(4 * n));
                    var h = null !== tt.get("OES_element_index_uint") && o > 21845 ? Uint32Array : Uint16Array;
                    e.__typeArray = h, e.__faceArray = new h(3 * o), e.__lineArray = new h(2 * a);
                    var c = e.numMorphTargets;
                    if (c) {
                        e.__morphTargetsArrays = [];
                        for (var u = 0, d = c; d > u; u++) e.__morphTargetsArrays.push(new Float32Array(3 * n))
                    }
                    var p = e.numMorphNormals;
                    if (p) {
                        e.__morphNormalsArrays = [];
                        for (var u = 0, d = p; d > u; u++) e.__morphNormalsArrays.push(new Float32Array(3 * n))
                    }
                    if (e.__webglFaceCount = 3 * o, e.__webglLineCount = 2 * a, s.attributes) {
                        void 0 === e.__webglCustomAttributesList && (e.__webglCustomAttributesList = []);
                        for (var f in s.attributes) {
                            var m = s.attributes[f],
                                g = {};
                            for (var v in m) g[v] = m[v];
                            if (!g.__webglInitialized || g.createUniqueBuffers) {
                                g.__webglInitialized = !0;
                                var y = 1;
                                "v2" === g.type ? y = 2 : "v3" === g.type ? y = 3 : "v4" === g.type ? y = 4 : "c" === g.type && (y = 3), g.size = y, g.array = new Float32Array(n * y), g.buffer = Pe.createBuffer(), g.buffer.belongsToAttribute = f, m.needsUpdate = !0, g.__original = m
                            }
                            e.__webglCustomAttributesList.push(g)
                        }
                    }
                    e.__inittedArrays = !0
                }

                function l(e, t) {
                    return e.material instanceof n.MeshFaceMaterial ? e.material.materials[t.materialIndex] : e.material
                }

                function c(e) {
                    return e instanceof n.MeshPhongMaterial == !1 && e.shading === n.FlatShading
                }

                function u(e, t) {
                    var r, i, n, o, a, s, h, l, c, u, d, p = e.vertices,
                        f = p.length,
                        m = e.colors,
                        g = m.length,
                        v = e.__vertexArray,
                        y = e.__colorArray,
                        x = e.verticesNeedUpdate,
                        _ = e.colorsNeedUpdate,
                        b = e.__webglCustomAttributesList;
                    if (x) {
                        for (r = 0; f > r; r++) n = p[r], o = 3 * r, v[o] = n.x, v[o + 1] = n.y, v[o + 2] = n.z;
                        Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglVertexBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, v, t)
                    }
                    if (_) {
                        for (i = 0; g > i; i++) a = m[i], o = 3 * i, y[o] = a.r, y[o + 1] = a.g, y[o + 2] = a.b;
                        Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglColorBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, y, t)
                    }
                    if (b)
                        for (s = 0, h = b.length; h > s; s++) {
                            if (d = b[s], d.needsUpdate && (void 0 === d.boundTo || "vertices" === d.boundTo))
                                if (c = d.value.length, o = 0, 1 === d.size)
                                    for (l = 0; c > l; l++) d.array[l] = d.value[l];
                                else if (2 === d.size)
                                for (l = 0; c > l; l++) u = d.value[l], d.array[o] = u.x, d.array[o + 1] = u.y, o += 2;
                            else if (3 === d.size)
                                if ("c" === d.type)
                                    for (l = 0; c > l; l++) u = d.value[l], d.array[o] = u.r, d.array[o + 1] = u.g, d.array[o + 2] = u.b, o += 3;
                                else
                                    for (l = 0; c > l; l++) u = d.value[l], d.array[o] = u.x, d.array[o + 1] = u.y, d.array[o + 2] = u.z, o += 3;
                            else if (4 === d.size)
                                for (l = 0; c > l; l++) u = d.value[l], d.array[o] = u.x, d.array[o + 1] = u.y, d.array[o + 2] = u.z, d.array[o + 3] = u.w, o += 4;
                            Pe.bindBuffer(Pe.ARRAY_BUFFER, d.buffer), Pe.bufferData(Pe.ARRAY_BUFFER, d.array, t), d.needsUpdate = !1
                        }
                }

                function d(e, t) {
                    var r, i, n, o, a, s, h, l, c, u, d, p, f = e.vertices,
                        m = e.colors,
                        g = e.lineDistances,
                        v = f.length,
                        y = m.length,
                        x = g.length,
                        _ = e.__vertexArray,
                        b = e.__colorArray,
                        w = e.__lineDistanceArray,
                        M = e.verticesNeedUpdate,
                        S = e.colorsNeedUpdate,
                        E = e.lineDistancesNeedUpdate,
                        T = e.__webglCustomAttributesList;
                    if (M) {
                        for (r = 0; v > r; r++) o = f[r], a = 3 * r, _[a] = o.x, _[a + 1] = o.y, _[a + 2] = o.z;
                        Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglVertexBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, _, t)
                    }
                    if (S) {
                        for (i = 0; y > i; i++) s = m[i], a = 3 * i, b[a] = s.r, b[a + 1] = s.g, b[a + 2] = s.b;
                        Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglColorBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, b, t)
                    }
                    if (E) {
                        for (n = 0; x > n; n++) w[n] = g[n];
                        Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglLineDistanceBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, w, t)
                    }
                    if (T)
                        for (h = 0, l = T.length; l > h; h++)
                            if (p = T[h], p.needsUpdate && (void 0 === p.boundTo || "vertices" === p.boundTo)) {
                                if (a = 0, u = p.value.length, 1 === p.size)
                                    for (c = 0; u > c; c++) p.array[c] = p.value[c];
                                else if (2 === p.size)
                                    for (c = 0; u > c; c++) d = p.value[c], p.array[a] = d.x, p.array[a + 1] = d.y, a += 2;
                                else if (3 === p.size)
                                    if ("c" === p.type)
                                        for (c = 0; u > c; c++) d = p.value[c], p.array[a] = d.r, p.array[a + 1] = d.g, p.array[a + 2] = d.b, a += 3;
                                    else
                                        for (c = 0; u > c; c++) d = p.value[c], p.array[a] = d.x, p.array[a + 1] = d.y, p.array[a + 2] = d.z, a += 3;
                                else if (4 === p.size)
                                    for (c = 0; u > c; c++) d = p.value[c], p.array[a] = d.x, p.array[a + 1] = d.y, p.array[a + 2] = d.z, p.array[a + 3] = d.w, a += 4;
                                Pe.bindBuffer(Pe.ARRAY_BUFFER, p.buffer), Pe.bufferData(Pe.ARRAY_BUFFER, p.array, t), p.needsUpdate = !1
                            }
                }

                function p(e, t, r, i, o) {
                    if (e.__inittedArrays) {
                        var a, s, h, l, u, d, p, f, m, g, v, y, x, _, b, w, M, S, E, T, A, C, L, R, P, F, B, D, U, k, V, O, N, z, I, G, H, W, j, X, Y, q, K = c(o),
                            Q = 0,
                            Z = 0,
                            J = 0,
                            $ = 0,
                            ee = 0,
                            te = 0,
                            re = 0,
                            ie = 0,
                            ne = 0,
                            oe = 0,
                            ae = 0,
                            se = 0,
                            he = e.__vertexArray,
                            le = e.__uvArray,
                            ce = e.__uv2Array,
                            ue = e.__normalArray,
                            de = e.__tangentArray,
                            pe = e.__colorArray,
                            fe = e.__skinIndexArray,
                            me = e.__skinWeightArray,
                            ge = e.__morphTargetsArrays,
                            ve = e.__morphNormalsArrays,
                            ye = e.__webglCustomAttributesList,
                            xe = e.__faceArray,
                            _e = e.__lineArray,
                            be = t.geometry,
                            we = be.verticesNeedUpdate,
                            Me = be.elementsNeedUpdate,
                            Se = be.uvsNeedUpdate,
                            Ee = be.normalsNeedUpdate,
                            Te = be.tangentsNeedUpdate,
                            Ae = be.colorsNeedUpdate,
                            Ce = be.morphTargetsNeedUpdate,
                            Le = be.vertices,
                            Re = e.faces3,
                            Fe = be.faces,
                            Be = be.faceVertexUvs[0],
                            De = be.faceVertexUvs[1],
                            Ue = be.skinIndices,
                            ke = be.skinWeights,
                            Ve = be.morphTargets,
                            Oe = be.morphNormals;
                        if (we) {
                            for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], y = Le[l.a], x = Le[l.b], _ = Le[l.c], he[Z] = y.x, he[Z + 1] = y.y, he[Z + 2] = y.z, he[Z + 3] = x.x, he[Z + 4] = x.y, he[Z + 5] = x.z, he[Z + 6] = _.x, he[Z + 7] = _.y, he[Z + 8] = _.z, Z += 9;
                            Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglVertexBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, he, r)
                        }
                        if (Ce)
                            for (I = 0, G = Ve.length; G > I; I++) {
                                for (ae = 0, a = 0, s = Re.length; s > a; a++) j = Re[a], l = Fe[j], y = Ve[I].vertices[l.a], x = Ve[I].vertices[l.b], _ = Ve[I].vertices[l.c], H = ge[I], H[ae] = y.x, H[ae + 1] = y.y, H[ae + 2] = y.z, H[ae + 3] = x.x, H[ae + 4] = x.y, H[ae + 5] = x.z, H[ae + 6] = _.x, H[ae + 7] = _.y, H[ae + 8] = _.z, o.morphNormals && (K ? (S = Oe[I].faceNormals[j], E = S, T = S) : (X = Oe[I].vertexNormals[j], S = X.a, E = X.b, T = X.c), W = ve[I], W[ae] = S.x, W[ae + 1] = S.y, W[ae + 2] = S.z, W[ae + 3] = E.x, W[ae + 4] = E.y, W[ae + 5] = E.z, W[ae + 6] = T.x, W[ae + 7] = T.y, W[ae + 8] = T.z), ae += 9;
                                Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[I]), Pe.bufferData(Pe.ARRAY_BUFFER, ge[I], r), o.morphNormals && (Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[I]), Pe.bufferData(Pe.ARRAY_BUFFER, ve[I], r))
                            }
                        if (ke.length) {
                            for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], R = ke[l.a], P = ke[l.b], F = ke[l.c], me[oe] = R.x, me[oe + 1] = R.y, me[oe + 2] = R.z, me[oe + 3] = R.w, me[oe + 4] = P.x, me[oe + 5] = P.y, me[oe + 6] = P.z, me[oe + 7] = P.w, me[oe + 8] = F.x, me[oe + 9] = F.y, me[oe + 10] = F.z, me[oe + 11] = F.w, B = Ue[l.a], D = Ue[l.b], U = Ue[l.c], fe[oe] = B.x, fe[oe + 1] = B.y, fe[oe + 2] = B.z, fe[oe + 3] = B.w, fe[oe + 4] = D.x, fe[oe + 5] = D.y, fe[oe + 6] = D.z, fe[oe + 7] = D.w, fe[oe + 8] = U.x, fe[oe + 9] = U.y, fe[oe + 10] = U.z, fe[oe + 11] = U.w, oe += 12;
                            oe > 0 && (Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglSkinIndicesBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, fe, r), Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglSkinWeightsBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, me, r))
                        }
                        if (Ae) {
                            for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], p = l.vertexColors, f = l.color, 3 === p.length && o.vertexColors === n.VertexColors ? (A = p[0], C = p[1], L = p[2]) : (A = f, C = f, L = f), pe[ne] = A.r, pe[ne + 1] = A.g, pe[ne + 2] = A.b, pe[ne + 3] = C.r, pe[ne + 4] = C.g, pe[ne + 5] = C.b, pe[ne + 6] = L.r, pe[ne + 7] = L.g, pe[ne + 8] = L.b, ne += 9;
                            ne > 0 && (Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglColorBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, pe, r))
                        }
                        if (Te && be.hasTangents) {
                            for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], m = l.vertexTangents, b = m[0], w = m[1], M = m[2], de[re] = b.x, de[re + 1] = b.y, de[re + 2] = b.z, de[re + 3] = b.w, de[re + 4] = w.x, de[re + 5] = w.y, de[re + 6] = w.z, de[re + 7] = w.w, de[re + 8] = M.x, de[re + 9] = M.y, de[re + 10] = M.z, de[re + 11] = M.w, re += 12;
                            Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglTangentBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, de, r)
                        }
                        if (Ee) {
                            for (a = 0, s = Re.length; s > a; a++)
                                if (l = Fe[Re[a]], u = l.vertexNormals, d = l.normal, 3 === u.length && K === !1)
                                    for (k = 0; 3 > k; k++) O = u[k], ue[te] = O.x, ue[te + 1] = O.y, ue[te + 2] = O.z, te += 3;
                                else
                                    for (k = 0; 3 > k; k++) ue[te] = d.x, ue[te + 1] = d.y, ue[te + 2] = d.z, te += 3;
                            Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglNormalBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, ue, r)
                        }
                        if (Se && Be) {
                            for (a = 0, s = Re.length; s > a; a++)
                                if (h = Re[a], g = Be[h], void 0 !== g)
                                    for (k = 0; 3 > k; k++) N = g[k], le[J] = N.x, le[J + 1] = N.y, J += 2;
                            J > 0 && (Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglUVBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, le, r))
                        }
                        if (Se && De) {
                            for (a = 0, s = Re.length; s > a; a++)
                                if (h = Re[a], v = De[h], void 0 !== v)
                                    for (k = 0; 3 > k; k++) z = v[k], ce[$] = z.x, ce[$ + 1] = z.y, $ += 2;
                            $ > 0 && (Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglUV2Buffer), Pe.bufferData(Pe.ARRAY_BUFFER, ce, r))
                        }
                        if (Me) {
                            for (a = 0, s = Re.length; s > a; a++) xe[ee] = Q, xe[ee + 1] = Q + 1, xe[ee + 2] = Q + 2, ee += 3, _e[ie] = Q, _e[ie + 1] = Q + 1, _e[ie + 2] = Q, _e[ie + 3] = Q + 2, _e[ie + 4] = Q + 1, _e[ie + 5] = Q + 2, ie += 6, Q += 3;
                            Pe.bindBuffer(Pe.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer), Pe.bufferData(Pe.ELEMENT_ARRAY_BUFFER, xe, r), Pe.bindBuffer(Pe.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer), Pe.bufferData(Pe.ELEMENT_ARRAY_BUFFER, _e, r)
                        }
                        if (ye)
                            for (k = 0, V = ye.length; V > k; k++)
                                if (q = ye[k], q.__original.needsUpdate) {
                                    if (se = 0, 1 === q.size) {
                                        if (void 0 === q.boundTo || "vertices" === q.boundTo)
                                            for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], q.array[se] = q.value[l.a], q.array[se + 1] = q.value[l.b], q.array[se + 2] = q.value[l.c], se += 3;
                                        else if ("faces" === q.boundTo)
                                            for (a = 0, s = Re.length; s > a; a++) Y = q.value[Re[a]], q.array[se] = Y, q.array[se + 1] = Y, q.array[se + 2] = Y, se += 3
                                    } else if (2 === q.size) {
                                        if (void 0 === q.boundTo || "vertices" === q.boundTo)
                                            for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], y = q.value[l.a], x = q.value[l.b], _ = q.value[l.c], q.array[se] = y.x, q.array[se + 1] = y.y, q.array[se + 2] = x.x, q.array[se + 3] = x.y, q.array[se + 4] = _.x, q.array[se + 5] = _.y, se += 6;
                                        else if ("faces" === q.boundTo)
                                            for (a = 0, s = Re.length; s > a; a++) Y = q.value[Re[a]], y = Y, x = Y, _ = Y, q.array[se] = y.x, q.array[se + 1] = y.y, q.array[se + 2] = x.x, q.array[se + 3] = x.y, q.array[se + 4] = _.x, q.array[se + 5] = _.y, se += 6
                                    } else if (3 === q.size) {
                                        var Ne;
                                        if (Ne = "c" === q.type ? ["r", "g", "b"] : ["x", "y", "z"], void 0 === q.boundTo || "vertices" === q.boundTo)
                                            for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], y = q.value[l.a], x = q.value[l.b], _ = q.value[l.c], q.array[se] = y[Ne[0]], q.array[se + 1] = y[Ne[1]], q.array[se + 2] = y[Ne[2]], q.array[se + 3] = x[Ne[0]], q.array[se + 4] = x[Ne[1]], q.array[se + 5] = x[Ne[2]], q.array[se + 6] = _[Ne[0]], q.array[se + 7] = _[Ne[1]], q.array[se + 8] = _[Ne[2]], se += 9;
                                        else if ("faces" === q.boundTo)
                                            for (a = 0, s = Re.length; s > a; a++) Y = q.value[Re[a]], y = Y, x = Y, _ = Y, q.array[se] = y[Ne[0]], q.array[se + 1] = y[Ne[1]], q.array[se + 2] = y[Ne[2]], q.array[se + 3] = x[Ne[0]], q.array[se + 4] = x[Ne[1]], q.array[se + 5] = x[Ne[2]], q.array[se + 6] = _[Ne[0]], q.array[se + 7] = _[Ne[1]], q.array[se + 8] = _[Ne[2]], se += 9;
                                        else if ("faceVertices" === q.boundTo)
                                            for (a = 0, s = Re.length; s > a; a++) Y = q.value[Re[a]], y = Y[0], x = Y[1], _ = Y[2], q.array[se] = y[Ne[0]], q.array[se + 1] = y[Ne[1]], q.array[se + 2] = y[Ne[2]], q.array[se + 3] = x[Ne[0]], q.array[se + 4] = x[Ne[1]], q.array[se + 5] = x[Ne[2]], q.array[se + 6] = _[Ne[0]], q.array[se + 7] = _[Ne[1]], q.array[se + 8] = _[Ne[2]], se += 9
                                    } else if (4 === q.size)
                                        if (void 0 === q.boundTo || "vertices" === q.boundTo)
                                            for (a = 0, s = Re.length; s > a; a++) l = Fe[Re[a]], y = q.value[l.a], x = q.value[l.b], _ = q.value[l.c], q.array[se] = y.x, q.array[se + 1] = y.y, q.array[se + 2] = y.z, q.array[se + 3] = y.w, q.array[se + 4] = x.x, q.array[se + 5] = x.y, q.array[se + 6] = x.z, q.array[se + 7] = x.w, q.array[se + 8] = _.x, q.array[se + 9] = _.y, q.array[se + 10] = _.z, q.array[se + 11] = _.w, se += 12;
                                        else if ("faces" === q.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) Y = q.value[Re[a]], y = Y, x = Y, _ = Y, q.array[se] = y.x, q.array[se + 1] = y.y, q.array[se + 2] = y.z, q.array[se + 3] = y.w, q.array[se + 4] = x.x, q.array[se + 5] = x.y, q.array[se + 6] = x.z, q.array[se + 7] = x.w, q.array[se + 8] = _.x, q.array[se + 9] = _.y, q.array[se + 10] = _.z, q.array[se + 11] = _.w, se += 12;
                                    else if ("faceVertices" === q.boundTo)
                                        for (a = 0, s = Re.length; s > a; a++) Y = q.value[Re[a]], y = Y[0], x = Y[1], _ = Y[2], q.array[se] = y.x, q.array[se + 1] = y.y, q.array[se + 2] = y.z, q.array[se + 3] = y.w, q.array[se + 4] = x.x, q.array[se + 5] = x.y, q.array[se + 6] = x.z, q.array[se + 7] = x.w, q.array[se + 8] = _.x, q.array[se + 9] = _.y, q.array[se + 10] = _.z, q.array[se + 11] = _.w, se += 12;
                                    Pe.bindBuffer(Pe.ARRAY_BUFFER, q.buffer), Pe.bufferData(Pe.ARRAY_BUFFER, q.array, r)
                                } i && (delete e.__inittedArrays, delete e.__colorArray, delete e.__normalArray, delete e.__tangentArray, delete e.__uvArray, delete e.__uv2Array, delete e.__faceArray, delete e.__vertexArray, delete e.__lineArray, delete e.__skinIndexArray, delete e.__skinWeightArray)
                    }
                }

                function f(e, t, r, i) {
                    for (var n = r.attributes, o = t.attributes, a = t.attributesKeys, s = 0, h = a.length; h > s; s++) {
                        var l = a[s],
                            c = o[l];
                        if (c >= 0) {
                            var u = n[l];
                            if (void 0 !== u) {
                                var d = u.itemSize;
                                Pe.bindBuffer(Pe.ARRAY_BUFFER, u.buffer), et.enableAttribute(c), Pe.vertexAttribPointer(c, d, Pe.FLOAT, !1, 0, i * d * 4)
                            } else void 0 !== e.defaultAttributeValues && (2 === e.defaultAttributeValues[l].length ? Pe.vertexAttrib2fv(c, e.defaultAttributeValues[l]) : 3 === e.defaultAttributeValues[l].length && Pe.vertexAttrib3fv(c, e.defaultAttributeValues[l]))
                        }
                    }
                    et.disableUnusedAttributes()
                }

                function m(e, t, r) {
                    var i = e.program.attributes;
                    if (-1 !== r.morphTargetBase && i.position >= 0 ? (Pe.bindBuffer(Pe.ARRAY_BUFFER, t.__webglMorphTargetsBuffers[r.morphTargetBase]), et.enableAttribute(i.position), Pe.vertexAttribPointer(i.position, 3, Pe.FLOAT, !1, 0, 0)) : i.position >= 0 && (Pe.bindBuffer(Pe.ARRAY_BUFFER, t.__webglVertexBuffer), et.enableAttribute(i.position), Pe.vertexAttribPointer(i.position, 3, Pe.FLOAT, !1, 0, 0)), r.morphTargetForcedOrder.length)
                        for (var n, o = 0, a = r.morphTargetForcedOrder, s = r.morphTargetInfluences; o < e.numSupportedMorphTargets && o < a.length;) n = i["morphTarget" + o], n >= 0 && (Pe.bindBuffer(Pe.ARRAY_BUFFER, t.__webglMorphTargetsBuffers[a[o]]), et.enableAttribute(n), Pe.vertexAttribPointer(n, 3, Pe.FLOAT, !1, 0, 0)), n = i["morphNormal" + o], n >= 0 && e.morphNormals && (Pe.bindBuffer(Pe.ARRAY_BUFFER, t.__webglMorphNormalsBuffers[a[o]]), et.enableAttribute(n), Pe.vertexAttribPointer(n, 3, Pe.FLOAT, !1, 0, 0)), r.__webglMorphTargetInfluences[o] = s[a[o]], o++;
                    else {
                        var h = [],
                            s = r.morphTargetInfluences,
                            l = r.geometry.morphTargets;
                        s.length > l.length && (console.warn("THREE.WebGLRenderer: Influences array is bigger than morphTargets array."), s.length = l.length);
                        for (var c = 0, u = s.length; u > c; c++) {
                            var d = s[c];
                            h.push([d, c])
                        }
                        h.length > e.numSupportedMorphTargets ? (h.sort(y), h.length = e.numSupportedMorphTargets) : h.length > e.numSupportedMorphNormals ? h.sort(y) : 0 === h.length && h.push([0, 0]);
                        for (var n, o = 0, p = e.numSupportedMorphTargets; p > o; o++)
                            if (h[o]) {
                                var f = h[o][1];
                                n = i["morphTarget" + o], n >= 0 && (Pe.bindBuffer(Pe.ARRAY_BUFFER, t.__webglMorphTargetsBuffers[f]), et.enableAttribute(n), Pe.vertexAttribPointer(n, 3, Pe.FLOAT, !1, 0, 0)), n = i["morphNormal" + o], n >= 0 && e.morphNormals && (Pe.bindBuffer(Pe.ARRAY_BUFFER, t.__webglMorphNormalsBuffers[f]), et.enableAttribute(n), Pe.vertexAttribPointer(n, 3, Pe.FLOAT, !1, 0, 0)), r.__webglMorphTargetInfluences[o] = s[f]
                            } else r.__webglMorphTargetInfluences[o] = 0
                    }
                    null !== e.program.uniforms.morphTargetInfluences && Pe.uniform1fv(e.program.uniforms.morphTargetInfluences, r.__webglMorphTargetInfluences)
                }

                function g(e, t) {
                    return e.object.renderOrder !== t.object.renderOrder ? e.object.renderOrder - t.object.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.z !== t.z ? e.z - t.z : e.id - t.id
                }

                function v(e, t) {
                    return e.object.renderOrder !== t.object.renderOrder ? e.object.renderOrder - t.object.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id
                }

                function y(e, t) {
                    return t[0] - e[0]
                }

                function x(e) {
                    if (e.visible !== !1) {
                        if (e instanceof n.Scene || e instanceof n.Group);
                        else if (S(e), e instanceof n.Light) Se.push(e);
                        else if (e instanceof n.Sprite) Le.push(e);
                        else if (e instanceof n.LensFlare) Re.push(e);
                        else {
                            var t = Ee[e.id];
                            if (t && (e.frustumCulled === !1 || Xe.intersectsObject(e) === !0))
                                for (var r = 0, i = t.length; i > r; r++) {
                                    var o = t[r];
                                    M(o), o.render = !0, Fe.sortObjects === !0 && (qe.setFromMatrixPosition(e.matrixWorld), qe.applyProjection(Ye), o.z = qe.z)
                                }
                        }
                        for (var r = 0, i = e.children.length; i > r; r++) x(e.children[r])
                    }
                }

                function _(e, t, r, i, o) {
                    for (var a, s = 0, h = e.length; h > s; s++) {
                        var l = e[s],
                            c = l.object,
                            u = l.buffer;
                        if (Q(c, t), o) a = o;
                        else {
                            if (a = l.material, !a) continue;
                            U(a)
                        }
                        Fe.setMaterialFaces(a), u instanceof n.BufferGeometry ? Fe.renderBufferDirect(t, r, i, a, u, c) : Fe.renderBuffer(t, r, i, a, u, c)
                    }
                }

                function b(e, t, r, i, n, o) {
                    for (var a, s = 0, h = e.length; h > s; s++) {
                        var l = e[s],
                            c = l.object;
                        if (c.visible) {
                            if (o) a = o;
                            else {
                                if (a = l[t], !a) continue;
                                U(a)
                            }
                            Fe.renderImmediateObject(r, i, n, a, c)
                        }
                    }
                }

                function w(e) {
                    var t = e.object,
                        r = t.material;
                    r.transparent ? (e.transparent = r, e.opaque = null) : (e.opaque = r, e.transparent = null)
                }

                function M(e) {
                    var t = e.object,
                        r = e.buffer,
                        i = t.geometry,
                        o = t.material;
                    if (o instanceof n.MeshFaceMaterial) {
                        var a = i instanceof n.BufferGeometry ? 0 : r.materialIndex;
                        o = o.materials[a], e.material = o, o.transparent ? Ce.push(e) : Ae.push(e)
                    } else o && (e.material = o, o.transparent ? Ce.push(e) : Ae.push(e))
                }

                function S(e) {
                    void 0 === e.__webglInit && (e.__webglInit = !0, e._modelViewMatrix = new n.Matrix4, e._normalMatrix = new n.Matrix3, e.addEventListener("removed", bt));
                    var i = e.geometry;
                    if (void 0 === i || void 0 === i.__webglInit && (i.__webglInit = !0, i.addEventListener("dispose", wt), i instanceof n.BufferGeometry ? Fe.info.memory.geometries++ : e instanceof n.Mesh ? T(e, i) : e instanceof n.Line ? void 0 === i.__webglVertexBuffer && (r(i), s(i, e), i.verticesNeedUpdate = !0, i.colorsNeedUpdate = !0, i.lineDistancesNeedUpdate = !0) : e instanceof n.PointCloud && void 0 === i.__webglVertexBuffer && (t(i), a(i, e), i.verticesNeedUpdate = !0, i.colorsNeedUpdate = !0)), void 0 === e.__webglActive)
                        if (e.__webglActive = !0, e instanceof n.Mesh) {
                            if (i instanceof n.BufferGeometry) A(Ee, i, e);
                            else if (i instanceof n.Geometry)
                                for (var o = Pt[i.id], h = 0, l = o.length; l > h; h++) A(Ee, o[h], e)
                        } else e instanceof n.Line || e instanceof n.PointCloud ? A(Ee, i, e) : (e instanceof n.ImmediateRenderObject || e.immediateRenderCallback) && C(Te, e)
                }

                function E(e, t) {
                    for (var r, i, n = tt.get("OES_element_index_uint") ? 4294967296 : 65535, o = {}, a = e.morphTargets.length, s = e.morphNormals.length, h = {}, l = [], c = 0, u = e.faces.length; u > c; c++) {
                        var d = e.faces[c],
                            p = t ? d.materialIndex : 0;
                        p in o || (o[p] = {
                            hash: p,
                            counter: 0
                        }), r = o[p].hash + "_" + o[p].counter, r in h || (i = {
                            id: Ft++,
                            faces3: [],
                            materialIndex: p,
                            vertices: 0,
                            numMorphTargets: a,
                            numMorphNormals: s
                        }, h[r] = i, l.push(i)), h[r].vertices + 3 > n && (o[p].counter += 1, r = o[p].hash + "_" + o[p].counter, r in h || (i = {
                            id: Ft++,
                            faces3: [],
                            materialIndex: p,
                            vertices: 0,
                            numMorphTargets: a,
                            numMorphNormals: s
                        }, h[r] = i, l.push(i))), h[r].faces3.push(c), h[r].vertices += 3
                    }
                    return l
                }

                function T(e, t) {
                    var r = e.material,
                        o = !1;
                    (void 0 === Pt[t.id] || t.groupsNeedUpdate === !0) && (delete Ee[e.id], Pt[t.id] = E(t, r instanceof n.MeshFaceMaterial), t.groupsNeedUpdate = !1);
                    for (var a = Pt[t.id], s = 0, l = a.length; l > s; s++) {
                        var c = a[s];
                        void 0 === c.__webglVertexBuffer ? (i(c), h(c, e), t.verticesNeedUpdate = !0, t.morphTargetsNeedUpdate = !0, t.elementsNeedUpdate = !0, t.uvsNeedUpdate = !0, t.normalsNeedUpdate = !0, t.tangentsNeedUpdate = !0, t.colorsNeedUpdate = !0, o = !0) : o = !1, (o || void 0 === e.__webglActive) && A(Ee, c, e)
                    }
                    e.__webglActive = !0
                }

                function A(e, t, r) {
                    var i = r.id;
                    e[i] = e[i] || [], e[i].push({
                        id: i,
                        buffer: t,
                        object: r,
                        material: null,
                        z: 0
                    })
                }

                function C(e, t) {
                    e.push({
                        id: null,
                        object: t,
                        opaque: null,
                        transparent: null,
                        z: 0
                    })
                }

                function L(e) {
                    var t = e.geometry;
                    if (t instanceof n.BufferGeometry)
                        for (var r = t.attributes, i = t.attributesKeys, o = 0, a = i.length; a > o; o++) {
                            var s = i[o],
                                h = r[s],
                                c = "index" === s ? Pe.ELEMENT_ARRAY_BUFFER : Pe.ARRAY_BUFFER;
                            void 0 === h.buffer ? (h.buffer = Pe.createBuffer(), Pe.bindBuffer(c, h.buffer), Pe.bufferData(c, h.array, h instanceof n.DynamicBufferAttribute ? Pe.DYNAMIC_DRAW : Pe.STATIC_DRAW), h.needsUpdate = !1) : h.needsUpdate === !0 && (Pe.bindBuffer(c, h.buffer), void 0 === h.updateRange || -1 === h.updateRange.count ? Pe.bufferSubData(c, 0, h.array) : 0 === h.updateRange.count ? console.error("THREE.WebGLRenderer.updateObject: using updateRange for THREE.DynamicBufferAttribute and marked as needsUpdate but count is 0, ensure you are using set methods or updating manually.") : (Pe.bufferSubData(c, h.updateRange.offset * h.array.BYTES_PER_ELEMENT, h.array.subarray(h.updateRange.offset, h.updateRange.offset + h.updateRange.count)), h.updateRange.count = 0), h.needsUpdate = !1)
                        } else if (e instanceof n.Mesh) {
                            t.groupsNeedUpdate === !0 && T(e, t);
                            for (var f = Pt[t.id], o = 0, m = f.length; m > o; o++) {
                                var g = f[o],
                                    v = l(e, g),
                                    y = v.attributes && R(v);
                                (t.verticesNeedUpdate || t.morphTargetsNeedUpdate || t.elementsNeedUpdate || t.uvsNeedUpdate || t.normalsNeedUpdate || t.colorsNeedUpdate || t.tangentsNeedUpdate || y) && p(g, e, Pe.DYNAMIC_DRAW, !t.dynamic, v)
                            }
                            t.verticesNeedUpdate = !1, t.morphTargetsNeedUpdate = !1, t.elementsNeedUpdate = !1, t.uvsNeedUpdate = !1, t.normalsNeedUpdate = !1, t.colorsNeedUpdate = !1, t.tangentsNeedUpdate = !1, v.attributes && P(v)
                        } else if (e instanceof n.Line) {
                        var v = l(e, t),
                            y = v.attributes && R(v);
                        (t.verticesNeedUpdate || t.colorsNeedUpdate || t.lineDistancesNeedUpdate || y) && d(t, Pe.DYNAMIC_DRAW), t.verticesNeedUpdate = !1, t.colorsNeedUpdate = !1, t.lineDistancesNeedUpdate = !1, v.attributes && P(v)
                    } else if (e instanceof n.PointCloud) {
                        var v = l(e, t),
                            y = v.attributes && R(v);
                        (t.verticesNeedUpdate || t.colorsNeedUpdate || y) && u(t, Pe.DYNAMIC_DRAW, e), t.verticesNeedUpdate = !1, t.colorsNeedUpdate = !1, v.attributes && P(v)
                    }
                }

                function R(e) {
                    for (var t in e.attributes)
                        if (e.attributes[t].needsUpdate) return !0;
                    return !1
                }

                function P(e) {
                    for (var t in e.attributes) e.attributes[t].needsUpdate = !1
                }

                function F(e) {
                    e instanceof n.Mesh || e instanceof n.PointCloud || e instanceof n.Line ? delete Ee[e.id] : (e instanceof n.ImmediateRenderObject || e.immediateRenderCallback) && B(Te, e), delete e.__webglInit, delete e._modelViewMatrix, delete e._normalMatrix, delete e.__webglActive
                }

                function B(e, t) {
                    for (var r = e.length - 1; r >= 0; r--) e[r].object === t && e.splice(r, 1)
                }

                function D(e, t, r, i) {
                    e.addEventListener("dispose", Et);
                    var o = Bt[e.type];
                    if (o) {
                        var a = n.ShaderLib[o];
                        e.__webglShader = {
                            uniforms: n.UniformsUtils.clone(a.uniforms),
                            vertexShader: a.vertexShader,
                            fragmentShader: a.fragmentShader
                        }
                    } else e.__webglShader = {
                        uniforms: e.uniforms,
                        vertexShader: e.vertexShader,
                        fragmentShader: e.fragmentShader
                    };
                    var s = le(t),
                        h = ce(t),
                        l = he(i),
                        c = {
                            precision: fe,
                            supportsVertexTextures: lt,
                            map: !!e.map,
                            envMap: !!e.envMap,
                            envMapMode: e.envMap && e.envMap.mapping,
                            lightMap: !!e.lightMap,
                            bumpMap: !!e.bumpMap,
                            normalMap: !!e.normalMap,
                            specularMap: !!e.specularMap,
                            alphaMap: !!e.alphaMap,
                            combine: e.combine,
                            vertexColors: e.vertexColors,
                            fog: r,
                            useFog: e.fog,
                            fogExp: r instanceof n.FogExp2,
                            flatShading: e.shading === n.FlatShading,
                            sizeAttenuation: e.sizeAttenuation,
                            logarithmicDepthBuffer: be,
                            skinning: e.skinning,
                            maxBones: l,
                            useVertexTexture: ct && i && i.skeleton && i.skeleton.useVertexTexture,
                            morphTargets: e.morphTargets,
                            morphNormals: e.morphNormals,
                            maxMorphTargets: Fe.maxMorphTargets,
                            maxMorphNormals: Fe.maxMorphNormals,
                            maxDirLights: s.directional,
                            maxPointLights: s.point,
                            maxSpotLights: s.spot,
                            maxHemiLights: s.hemi,
                            maxShadows: h,
                            shadowMapEnabled: Fe.shadowMapEnabled && i.receiveShadow && h > 0,
                            shadowMapType: Fe.shadowMapType,
                            shadowMapDebug: Fe.shadowMapDebug,
                            shadowMapCascade: Fe.shadowMapCascade,
                            alphaTest: e.alphaTest,
                            metal: e.metal,
                            wrapAround: e.wrapAround,
                            doubleSided: e.side === n.DoubleSide,
                            flipSided: e.side === n.BackSide
                        },
                        u = [];
                    if (o ? u.push(o) : (u.push(e.fragmentShader), u.push(e.vertexShader)), void 0 !== e.defines)
                        for (var d in e.defines) u.push(d), u.push(e.defines[d]);
                    for (var d in c) u.push(d), u.push(c[d]);
                    for (var p, f = u.join(), m = 0, g = Be.length; g > m; m++) {
                        var v = Be[m];
                        if (v.code === f) {
                            p = v, p.usedTimes++;
                            break
                        }
                    }
                    void 0 === p && (p = new n.WebGLProgram(Fe, f, e, c), Be.push(p), Fe.info.memory.programs = Be.length), e.program = p;
                    var y = p.attributes;
                    if (e.morphTargets) {
                        e.numSupportedMorphTargets = 0;
                        for (var x, _ = "morphTarget", b = 0; b < Fe.maxMorphTargets; b++) x = _ + b, y[x] >= 0 && e.numSupportedMorphTargets++
                    }
                    if (e.morphNormals) {
                        e.numSupportedMorphNormals = 0;
                        var x, _ = "morphNormal";
                        for (b = 0; b < Fe.maxMorphNormals; b++) x = _ + b, y[x] >= 0 && e.numSupportedMorphNormals++
                    }
                    e.uniformsList = [];
                    for (var w in e.__webglShader.uniforms) {
                        var M = e.program.uniforms[w];
                        M && e.uniformsList.push([e.__webglShader.uniforms[w], M])
                    }
                }

                function U(e) {
                    e.transparent === !0 ? et.setBlending(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha) : et.setBlending(n.NoBlending), et.setDepthTest(e.depthTest), et.setDepthWrite(e.depthWrite), et.setColorWrite(e.colorWrite), et.setPolygonOffset(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits)
                }

                function k(e, t, r, i, o) {
                    Ne = 0, i.needsUpdate && (i.program && Rt(i), D(i, t, r, o), i.needsUpdate = !1), i.morphTargets && (o.__webglMorphTargetInfluences || (o.__webglMorphTargetInfluences = new Float32Array(Fe.maxMorphTargets)));
                    var a = !1,
                        s = !1,
                        h = !1,
                        l = i.program,
                        c = l.uniforms,
                        u = i.__webglShader.uniforms;
                    if (l.id !== De && (Pe.useProgram(l.program), De = l.id, a = !0, s = !0, h = !0), i.id !== ke && (-1 === ke && (h = !0), ke = i.id, s = !0), (a || e !== Oe) && (Pe.uniformMatrix4fv(c.projectionMatrix, !1, e.projectionMatrix.elements), be && Pe.uniform1f(c.logDepthBufFC, 2 / (Math.log(e.far + 1) / Math.LN2)), e !== Oe && (Oe = e), (i instanceof n.ShaderMaterial || i instanceof n.MeshPhongMaterial || i.envMap) && null !== c.cameraPosition && (qe.setFromMatrixPosition(e.matrixWorld), Pe.uniform3f(c.cameraPosition, qe.x, qe.y, qe.z)), (i instanceof n.MeshPhongMaterial || i instanceof n.MeshLambertMaterial || i instanceof n.MeshBasicMaterial || i instanceof n.ShaderMaterial || i.skinning) && null !== c.viewMatrix && Pe.uniformMatrix4fv(c.viewMatrix, !1, e.matrixWorldInverse.elements)), i.skinning)
                        if (o.bindMatrix && null !== c.bindMatrix && Pe.uniformMatrix4fv(c.bindMatrix, !1, o.bindMatrix.elements), o.bindMatrixInverse && null !== c.bindMatrixInverse && Pe.uniformMatrix4fv(c.bindMatrixInverse, !1, o.bindMatrixInverse.elements), ct && o.skeleton && o.skeleton.useVertexTexture) {
                            if (null !== c.boneTexture) {
                                var d = q();
                                Pe.uniform1i(c.boneTexture, d), Fe.setTexture(o.skeleton.boneTexture, d)
                            }
                            null !== c.boneTextureWidth && Pe.uniform1i(c.boneTextureWidth, o.skeleton.boneTextureWidth), null !== c.boneTextureHeight && Pe.uniform1i(c.boneTextureHeight, o.skeleton.boneTextureHeight)
                        } else o.skeleton && o.skeleton.boneMatrices && null !== c.boneGlobalMatrices && Pe.uniformMatrix4fv(c.boneGlobalMatrices, !1, o.skeleton.boneMatrices);
                    return s && (r && i.fog && I(u, r), (i instanceof n.MeshPhongMaterial || i instanceof n.MeshLambertMaterial || i.lights) && (Qe && (h = !0, J(t), Qe = !1), h ? (W(u, Ze), j(u, !0)) : j(u, !1)), (i instanceof n.MeshBasicMaterial || i instanceof n.MeshLambertMaterial || i instanceof n.MeshPhongMaterial) && V(u, i), i instanceof n.LineBasicMaterial ? O(u, i) : i instanceof n.LineDashedMaterial ? (O(u, i), N(u, i)) : i instanceof n.PointCloudMaterial ? z(u, i) : i instanceof n.MeshPhongMaterial ? G(u, i) : i instanceof n.MeshLambertMaterial ? H(u, i) : i instanceof n.MeshDepthMaterial ? (u.mNear.value = e.near, u.mFar.value = e.far, u.opacity.value = i.opacity) : i instanceof n.MeshNormalMaterial && (u.opacity.value = i.opacity), o.receiveShadow && !i._shadowPass && X(u, t), K(i.uniformsList)), Y(c, o), null !== c.modelMatrix && Pe.uniformMatrix4fv(c.modelMatrix, !1, o.matrixWorld.elements), l
                }

                function V(e, t) {
                    e.opacity.value = t.opacity, e.diffuse.value = t.color, e.map.value = t.map, e.lightMap.value = t.lightMap, e.specularMap.value = t.specularMap, e.alphaMap.value = t.alphaMap, t.bumpMap && (e.bumpMap.value = t.bumpMap, e.bumpScale.value = t.bumpScale), t.normalMap && (e.normalMap.value = t.normalMap, e.normalScale.value.copy(t.normalScale));
                    var r;
                    if (t.map ? r = t.map : t.specularMap ? r = t.specularMap : t.normalMap ? r = t.normalMap : t.bumpMap ? r = t.bumpMap : t.alphaMap && (r = t.alphaMap), void 0 !== r) {
                        var i = r.offset,
                            o = r.repeat;
                        e.offsetRepeat.value.set(i.x, i.y, o.x, o.y)
                    }
                    e.envMap.value = t.envMap, e.flipEnvMap.value = t.envMap instanceof n.WebGLRenderTargetCube ? 1 : -1, e.reflectivity.value = t.reflectivity, e.refractionRatio.value = t.refractionRatio
                }

                function O(e, t) {
                    e.diffuse.value = t.color, e.opacity.value = t.opacity
                }

                function N(e, t) {
                    e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale
                }

                function z(e, t) {
                    if (e.psColor.value = t.color, e.opacity.value = t.opacity, e.size.value = t.size, e.scale.value = ue.height / 2, e.map.value = t.map, null !== t.map) {
                        var r = t.map.offset,
                            i = t.map.repeat;
                        e.offsetRepeat.value.set(r.x, r.y, i.x, i.y)
                    }
                }

                function I(e, t) {
                    e.fogColor.value = t.color, t instanceof n.Fog ? (e.fogNear.value = t.near, e.fogFar.value = t.far) : t instanceof n.FogExp2 && (e.fogDensity.value = t.density)
                }

                function G(e, t) {
                    e.shininess.value = t.shininess, e.emissive.value = t.emissive, e.specular.value = t.specular, t.wrapAround && e.wrapRGB.value.copy(t.wrapRGB)
                }

                function H(e, t) {
                    e.emissive.value = t.emissive, t.wrapAround && e.wrapRGB.value.copy(t.wrapRGB)
                }

                function W(e, t) {
                    e.ambientLightColor.value = t.ambient, e.directionalLightColor.value = t.directional.colors, e.directionalLightDirection.value = t.directional.positions, e.pointLightColor.value = t.point.colors, e.pointLightPosition.value = t.point.positions, e.pointLightDistance.value = t.point.distances, e.pointLightDecay.value = t.point.decays, e.spotLightColor.value = t.spot.colors, e.spotLightPosition.value = t.spot.positions, e.spotLightDistance.value = t.spot.distances, e.spotLightDirection.value = t.spot.directions, e.spotLightAngleCos.value = t.spot.anglesCos, e.spotLightExponent.value = t.spot.exponents, e.spotLightDecay.value = t.spot.decays, e.hemisphereLightSkyColor.value = t.hemi.skyColors, e.hemisphereLightGroundColor.value = t.hemi.groundColors, e.hemisphereLightDirection.value = t.hemi.positions
                }

                function j(e, t) {
                    e.ambientLightColor.needsUpdate = t, e.directionalLightColor.needsUpdate = t, e.directionalLightDirection.needsUpdate = t, e.pointLightColor.needsUpdate = t, e.pointLightPosition.needsUpdate = t, e.pointLightDistance.needsUpdate = t, e.pointLightDecay.needsUpdate = t, e.spotLightColor.needsUpdate = t, e.spotLightPosition.needsUpdate = t, e.spotLightDistance.needsUpdate = t, e.spotLightDirection.needsUpdate = t, e.spotLightAngleCos.needsUpdate = t, e.spotLightExponent.needsUpdate = t, e.spotLightDecay.needsUpdate = t, e.hemisphereLightSkyColor.needsUpdate = t, e.hemisphereLightGroundColor.needsUpdate = t, e.hemisphereLightDirection.needsUpdate = t
                }

                function X(e, t) {
                    if (e.shadowMatrix)
                        for (var r = 0, i = 0, o = t.length; o > i; i++) {
                            var a = t[i];
                            a.castShadow && (a instanceof n.SpotLight || a instanceof n.DirectionalLight && !a.shadowCascade) && (e.shadowMap.value[r] = a.shadowMap, e.shadowMapSize.value[r] = a.shadowMapSize, e.shadowMatrix.value[r] = a.shadowMatrix, e.shadowDarkness.value[r] = a.shadowDarkness, e.shadowBias.value[r] = a.shadowBias, r++)
                        }
                }

                function Y(e, t) {
                    Pe.uniformMatrix4fv(e.modelViewMatrix, !1, t._modelViewMatrix.elements), e.normalMatrix && Pe.uniformMatrix3fv(e.normalMatrix, !1, t._normalMatrix.elements)
                }

                function q() {
                    var e = Ne;
                    return e >= ot && n.warn("WebGLRenderer: trying to use " + e + " texture units while this GPU supports only " + ot), Ne += 1, e
                }

                function K(e) {
                    for (var t, r, i, o = 0, a = e.length; a > o; o++) {
                        var s = e[o][0];
                        if (s.needsUpdate !== !1) {
                            var h = s.type,
                                l = s.value,
                                c = e[o][1];
                            switch (h) {
                                case "1i":
                                    Pe.uniform1i(c, l);
                                    break;
                                case "1f":
                                    Pe.uniform1f(c, l);
                                    break;
                                case "2f":
                                    Pe.uniform2f(c, l[0], l[1]);
                                    break;
                                case "3f":
                                    Pe.uniform3f(c, l[0], l[1], l[2]);
                                    break;
                                case "4f":
                                    Pe.uniform4f(c, l[0], l[1], l[2], l[3]);
                                    break;
                                case "1iv":
                                    Pe.uniform1iv(c, l);
                                    break;
                                case "3iv":
                                    Pe.uniform3iv(c, l);
                                    break;
                                case "1fv":
                                    Pe.uniform1fv(c, l);
                                    break;
                                case "2fv":
                                    Pe.uniform2fv(c, l);
                                    break;
                                case "3fv":
                                    Pe.uniform3fv(c, l);
                                    break;
                                case "4fv":
                                    Pe.uniform4fv(c, l);
                                    break;
                                case "Matrix3fv":
                                    Pe.uniformMatrix3fv(c, !1, l);
                                    break;
                                case "Matrix4fv":
                                    Pe.uniformMatrix4fv(c, !1, l);
                                    break;
                                case "i":
                                    Pe.uniform1i(c, l);
                                    break;
                                case "f":
                                    Pe.uniform1f(c, l);
                                    break;
                                case "v2":
                                    Pe.uniform2f(c, l.x, l.y);
                                    break;
                                case "v3":
                                    Pe.uniform3f(c, l.x, l.y, l.z);
                                    break;
                                case "v4":
                                    Pe.uniform4f(c, l.x, l.y, l.z, l.w);
                                    break;
                                case "c":
                                    Pe.uniform3f(c, l.r, l.g, l.b);
                                    break;
                                case "iv1":
                                    Pe.uniform1iv(c, l);
                                    break;
                                case "iv":
                                    Pe.uniform3iv(c, l);
                                    break;

                                case "fv1":
                                    Pe.uniform1fv(c, l);
                                    break;
                                case "fv":
                                    Pe.uniform3fv(c, l);
                                    break;
                                case "v2v":
                                    void 0 === s._array && (s._array = new Float32Array(2 * l.length));
                                    for (var u = 0, d = l.length; d > u; u++) i = 2 * u, s._array[i] = l[u].x, s._array[i + 1] = l[u].y;
                                    Pe.uniform2fv(c, s._array);
                                    break;
                                case "v3v":
                                    void 0 === s._array && (s._array = new Float32Array(3 * l.length));
                                    for (var u = 0, d = l.length; d > u; u++) i = 3 * u, s._array[i] = l[u].x, s._array[i + 1] = l[u].y, s._array[i + 2] = l[u].z;
                                    Pe.uniform3fv(c, s._array);
                                    break;
                                case "v4v":
                                    void 0 === s._array && (s._array = new Float32Array(4 * l.length));
                                    for (var u = 0, d = l.length; d > u; u++) i = 4 * u, s._array[i] = l[u].x, s._array[i + 1] = l[u].y, s._array[i + 2] = l[u].z, s._array[i + 3] = l[u].w;
                                    Pe.uniform4fv(c, s._array);
                                    break;
                                case "m3":
                                    Pe.uniformMatrix3fv(c, !1, l.elements);
                                    break;
                                case "m3v":
                                    void 0 === s._array && (s._array = new Float32Array(9 * l.length));
                                    for (var u = 0, d = l.length; d > u; u++) l[u].flattenToArrayOffset(s._array, 9 * u);
                                    Pe.uniformMatrix3fv(c, !1, s._array);
                                    break;
                                case "m4":
                                    Pe.uniformMatrix4fv(c, !1, l.elements);
                                    break;
                                case "m4v":
                                    void 0 === s._array && (s._array = new Float32Array(16 * l.length));
                                    for (var u = 0, d = l.length; d > u; u++) l[u].flattenToArrayOffset(s._array, 16 * u);
                                    Pe.uniformMatrix4fv(c, !1, s._array);
                                    break;
                                case "t":
                                    if (t = l, r = q(), Pe.uniform1i(c, r), !t) continue;
                                    t instanceof n.CubeTexture || t.image instanceof Array && 6 === t.image.length ? te(t, r) : t instanceof n.WebGLRenderTargetCube ? re(t, r) : Fe.setTexture(t, r);
                                    break;
                                case "tv":
                                    void 0 === s._array && (s._array = []);
                                    for (var u = 0, d = s.value.length; d > u; u++) s._array[u] = q();
                                    Pe.uniform1iv(c, s._array);
                                    for (var u = 0, d = s.value.length; d > u; u++) t = s.value[u], r = s._array[u], t && Fe.setTexture(t, r);
                                    break;
                                default:
                                    n.warn("THREE.WebGLRenderer: Unknown uniform type: " + h)
                            }
                        }
                    }
                }

                function Q(e, t) {
                    e._modelViewMatrix.multiplyMatrices(t.matrixWorldInverse, e.matrixWorld), e._normalMatrix.getNormalMatrix(e._modelViewMatrix)
                }

                function Z(e, t, r, i) {
                    e[t] = r.r * i, e[t + 1] = r.g * i, e[t + 2] = r.b * i
                }

                function J(e) {
                    var t, r, i, o, a, s, h, l, c = 0,
                        u = 0,
                        d = 0,
                        p = Ze,
                        f = p.directional.colors,
                        m = p.directional.positions,
                        g = p.point.colors,
                        v = p.point.positions,
                        y = p.point.distances,
                        x = p.point.decays,
                        _ = p.spot.colors,
                        b = p.spot.positions,
                        w = p.spot.distances,
                        M = p.spot.directions,
                        S = p.spot.anglesCos,
                        E = p.spot.exponents,
                        T = p.spot.decays,
                        A = p.hemi.skyColors,
                        C = p.hemi.groundColors,
                        L = p.hemi.positions,
                        R = 0,
                        P = 0,
                        F = 0,
                        B = 0,
                        D = 0,
                        U = 0,
                        k = 0,
                        V = 0,
                        O = 0,
                        N = 0,
                        z = 0,
                        I = 0;
                    for (t = 0, r = e.length; r > t; t++)
                        if (i = e[t], !i.onlyShadow)
                            if (o = i.color, h = i.intensity, l = i.distance, i instanceof n.AmbientLight) {
                                if (!i.visible) continue;
                                c += o.r, u += o.g, d += o.b
                            } else if (i instanceof n.DirectionalLight) {
                        if (D += 1, !i.visible) continue;
                        Ke.setFromMatrixPosition(i.matrixWorld), qe.setFromMatrixPosition(i.target.matrixWorld), Ke.sub(qe), Ke.normalize(), O = 3 * R, m[O] = Ke.x, m[O + 1] = Ke.y, m[O + 2] = Ke.z, Z(f, O, o, h), R += 1
                    } else if (i instanceof n.PointLight) {
                        if (U += 1, !i.visible) continue;
                        N = 3 * P, Z(g, N, o, h), qe.setFromMatrixPosition(i.matrixWorld), v[N] = qe.x, v[N + 1] = qe.y, v[N + 2] = qe.z, y[P] = l, x[P] = 0 === i.distance ? 0 : i.decay, P += 1
                    } else if (i instanceof n.SpotLight) {
                        if (k += 1, !i.visible) continue;
                        z = 3 * F, Z(_, z, o, h), Ke.setFromMatrixPosition(i.matrixWorld), b[z] = Ke.x, b[z + 1] = Ke.y, b[z + 2] = Ke.z, w[F] = l, qe.setFromMatrixPosition(i.target.matrixWorld), Ke.sub(qe), Ke.normalize(), M[z] = Ke.x, M[z + 1] = Ke.y, M[z + 2] = Ke.z, S[F] = Math.cos(i.angle), E[F] = i.exponent, T[F] = 0 === i.distance ? 0 : i.decay, F += 1
                    } else if (i instanceof n.HemisphereLight) {
                        if (V += 1, !i.visible) continue;
                        Ke.setFromMatrixPosition(i.matrixWorld), Ke.normalize(), I = 3 * B, L[I] = Ke.x, L[I + 1] = Ke.y, L[I + 2] = Ke.z, a = i.color, s = i.groundColor, Z(A, I, a, h), Z(C, I, s, h), B += 1
                    }
                    for (t = 3 * R, r = Math.max(f.length, 3 * D); r > t; t++) f[t] = 0;
                    for (t = 3 * P, r = Math.max(g.length, 3 * U); r > t; t++) g[t] = 0;
                    for (t = 3 * F, r = Math.max(_.length, 3 * k); r > t; t++) _[t] = 0;
                    for (t = 3 * B, r = Math.max(A.length, 3 * V); r > t; t++) A[t] = 0;
                    for (t = 3 * B, r = Math.max(C.length, 3 * V); r > t; t++) C[t] = 0;
                    p.directional.length = R, p.point.length = P, p.spot.length = F, p.hemi.length = B, p.ambient[0] = c, p.ambient[1] = u, p.ambient[2] = d
                }

                function $(e, t, r) {
                    var i;
                    r ? (Pe.texParameteri(e, Pe.TEXTURE_WRAP_S, se(t.wrapS)), Pe.texParameteri(e, Pe.TEXTURE_WRAP_T, se(t.wrapT)), Pe.texParameteri(e, Pe.TEXTURE_MAG_FILTER, se(t.magFilter)), Pe.texParameteri(e, Pe.TEXTURE_MIN_FILTER, se(t.minFilter))) : (Pe.texParameteri(e, Pe.TEXTURE_WRAP_S, Pe.CLAMP_TO_EDGE), Pe.texParameteri(e, Pe.TEXTURE_WRAP_T, Pe.CLAMP_TO_EDGE), (t.wrapS !== n.ClampToEdgeWrapping || t.wrapT !== n.ClampToEdgeWrapping) && n.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping. ( " + t.sourceFile + " )"), Pe.texParameteri(e, Pe.TEXTURE_MAG_FILTER, ae(t.magFilter)), Pe.texParameteri(e, Pe.TEXTURE_MIN_FILTER, ae(t.minFilter)), t.minFilter !== n.NearestFilter && t.minFilter !== n.LinearFilter && n.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter. ( " + t.sourceFile + " )")), i = tt.get("EXT_texture_filter_anisotropic"), i && t.type !== n.FloatType && t.type !== n.HalfFloatType && (t.anisotropy > 1 || t.__currentAnisotropy) && (Pe.texParameterf(e, i.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(t.anisotropy, Fe.getMaxAnisotropy())), t.__currentAnisotropy = t.anisotropy)
                }

                function ee(e, t) {
                    if (e.width > t || e.height > t) {
                        var r = t / Math.max(e.width, e.height),
                            i = document.createElement("canvas");
                        i.width = Math.floor(e.width * r), i.height = Math.floor(e.height * r);
                        var o = i.getContext("2d");
                        return o.drawImage(e, 0, 0, e.width, e.height, 0, 0, i.width, i.height), n.warn("THREE.WebGLRenderer: image is too big (" + e.width + "x" + e.height + "). Resized to " + i.width + "x" + i.height, e), i
                    }
                    return e
                }

                function te(e, t) {
                    if (6 === e.image.length)
                        if (e.needsUpdate) {
                            e.image.__webglTextureCube || (e.addEventListener("dispose", Mt), e.image.__webglTextureCube = Pe.createTexture(), Fe.info.memory.textures++), Pe.activeTexture(Pe.TEXTURE0 + t), Pe.bindTexture(Pe.TEXTURE_CUBE_MAP, e.image.__webglTextureCube), Pe.pixelStorei(Pe.UNPACK_FLIP_Y_WEBGL, e.flipY);
                            for (var r = e instanceof n.CompressedTexture, i = e.image[0] instanceof n.DataTexture, o = [], a = 0; 6 > a; a++) o[a] = !Fe.autoScaleCubemaps || r || i ? i ? e.image[a].image : e.image[a] : ee(e.image[a], ht);
                            var s = o[0],
                                h = n.Math.isPowerOfTwo(s.width) && n.Math.isPowerOfTwo(s.height),
                                l = se(e.format),
                                c = se(e.type);
                            $(Pe.TEXTURE_CUBE_MAP, e, h);
                            for (var a = 0; 6 > a; a++)
                                if (r)
                                    for (var u, d = o[a].mipmaps, p = 0, f = d.length; f > p; p++) u = d[p], e.format !== n.RGBAFormat && e.format !== n.RGBFormat ? mt().indexOf(l) > -1 ? Pe.compressedTexImage2D(Pe.TEXTURE_CUBE_MAP_POSITIVE_X + a, p, l, u.width, u.height, 0, u.data) : n.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setCubeTexture()") : Pe.texImage2D(Pe.TEXTURE_CUBE_MAP_POSITIVE_X + a, p, l, u.width, u.height, 0, l, c, u.data);
                                else i ? Pe.texImage2D(Pe.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, l, o[a].width, o[a].height, 0, l, c, o[a].data) : Pe.texImage2D(Pe.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, l, l, c, o[a]);
                            e.generateMipmaps && h && Pe.generateMipmap(Pe.TEXTURE_CUBE_MAP), e.needsUpdate = !1, e.onUpdate && e.onUpdate()
                        } else Pe.activeTexture(Pe.TEXTURE0 + t), Pe.bindTexture(Pe.TEXTURE_CUBE_MAP, e.image.__webglTextureCube)
                }

                function re(e, t) {
                    Pe.activeTexture(Pe.TEXTURE0 + t), Pe.bindTexture(Pe.TEXTURE_CUBE_MAP, e.__webglTexture)
                }

                function ie(e, t, r) {
                    Pe.bindFramebuffer(Pe.FRAMEBUFFER, e), Pe.framebufferTexture2D(Pe.FRAMEBUFFER, Pe.COLOR_ATTACHMENT0, r, t.__webglTexture, 0)
                }

                function ne(e, t) {
                    Pe.bindRenderbuffer(Pe.RENDERBUFFER, e), t.depthBuffer && !t.stencilBuffer ? (Pe.renderbufferStorage(Pe.RENDERBUFFER, Pe.DEPTH_COMPONENT16, t.width, t.height), Pe.framebufferRenderbuffer(Pe.FRAMEBUFFER, Pe.DEPTH_ATTACHMENT, Pe.RENDERBUFFER, e)) : t.depthBuffer && t.stencilBuffer ? (Pe.renderbufferStorage(Pe.RENDERBUFFER, Pe.DEPTH_STENCIL, t.width, t.height), Pe.framebufferRenderbuffer(Pe.FRAMEBUFFER, Pe.DEPTH_STENCIL_ATTACHMENT, Pe.RENDERBUFFER, e)) : Pe.renderbufferStorage(Pe.RENDERBUFFER, Pe.RGBA4, t.width, t.height)
                }

                function oe(e) {
                    e instanceof n.WebGLRenderTargetCube ? (Pe.bindTexture(Pe.TEXTURE_CUBE_MAP, e.__webglTexture), Pe.generateMipmap(Pe.TEXTURE_CUBE_MAP), Pe.bindTexture(Pe.TEXTURE_CUBE_MAP, null)) : (Pe.bindTexture(Pe.TEXTURE_2D, e.__webglTexture), Pe.generateMipmap(Pe.TEXTURE_2D), Pe.bindTexture(Pe.TEXTURE_2D, null))
                }

                function ae(e) {
                    return e === n.NearestFilter || e === n.NearestMipMapNearestFilter || e === n.NearestMipMapLinearFilter ? Pe.NEAREST : Pe.LINEAR
                }

                function se(e) {
                    var t;
                    if (e === n.RepeatWrapping) return Pe.REPEAT;
                    if (e === n.ClampToEdgeWrapping) return Pe.CLAMP_TO_EDGE;
                    if (e === n.MirroredRepeatWrapping) return Pe.MIRRORED_REPEAT;
                    if (e === n.NearestFilter) return Pe.NEAREST;
                    if (e === n.NearestMipMapNearestFilter) return Pe.NEAREST_MIPMAP_NEAREST;
                    if (e === n.NearestMipMapLinearFilter) return Pe.NEAREST_MIPMAP_LINEAR;
                    if (e === n.LinearFilter) return Pe.LINEAR;
                    if (e === n.LinearMipMapNearestFilter) return Pe.LINEAR_MIPMAP_NEAREST;
                    if (e === n.LinearMipMapLinearFilter) return Pe.LINEAR_MIPMAP_LINEAR;
                    if (e === n.UnsignedByteType) return Pe.UNSIGNED_BYTE;
                    if (e === n.UnsignedShort4444Type) return Pe.UNSIGNED_SHORT_4_4_4_4;
                    if (e === n.UnsignedShort5551Type) return Pe.UNSIGNED_SHORT_5_5_5_1;
                    if (e === n.UnsignedShort565Type) return Pe.UNSIGNED_SHORT_5_6_5;
                    if (e === n.ByteType) return Pe.BYTE;
                    if (e === n.ShortType) return Pe.SHORT;
                    if (e === n.UnsignedShortType) return Pe.UNSIGNED_SHORT;
                    if (e === n.IntType) return Pe.INT;
                    if (e === n.UnsignedIntType) return Pe.UNSIGNED_INT;
                    if (e === n.FloatType) return Pe.FLOAT;
                    if (t = tt.get("OES_texture_half_float"), null !== t && e === n.HalfFloatType) return t.HALF_FLOAT_OES;
                    if (e === n.AlphaFormat) return Pe.ALPHA;
                    if (e === n.RGBFormat) return Pe.RGB;
                    if (e === n.RGBAFormat) return Pe.RGBA;
                    if (e === n.LuminanceFormat) return Pe.LUMINANCE;
                    if (e === n.LuminanceAlphaFormat) return Pe.LUMINANCE_ALPHA;
                    if (e === n.AddEquation) return Pe.FUNC_ADD;
                    if (e === n.SubtractEquation) return Pe.FUNC_SUBTRACT;
                    if (e === n.ReverseSubtractEquation) return Pe.FUNC_REVERSE_SUBTRACT;
                    if (e === n.ZeroFactor) return Pe.ZERO;
                    if (e === n.OneFactor) return Pe.ONE;
                    if (e === n.SrcColorFactor) return Pe.SRC_COLOR;
                    if (e === n.OneMinusSrcColorFactor) return Pe.ONE_MINUS_SRC_COLOR;
                    if (e === n.SrcAlphaFactor) return Pe.SRC_ALPHA;
                    if (e === n.OneMinusSrcAlphaFactor) return Pe.ONE_MINUS_SRC_ALPHA;
                    if (e === n.DstAlphaFactor) return Pe.DST_ALPHA;
                    if (e === n.OneMinusDstAlphaFactor) return Pe.ONE_MINUS_DST_ALPHA;
                    if (e === n.DstColorFactor) return Pe.DST_COLOR;
                    if (e === n.OneMinusDstColorFactor) return Pe.ONE_MINUS_DST_COLOR;
                    if (e === n.SrcAlphaSaturateFactor) return Pe.SRC_ALPHA_SATURATE;
                    if (t = tt.get("WEBGL_compressed_texture_s3tc"), null !== t) {
                        if (e === n.RGB_S3TC_DXT1_Format) return t.COMPRESSED_RGB_S3TC_DXT1_EXT;
                        if (e === n.RGBA_S3TC_DXT1_Format) return t.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                        if (e === n.RGBA_S3TC_DXT3_Format) return t.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                        if (e === n.RGBA_S3TC_DXT5_Format) return t.COMPRESSED_RGBA_S3TC_DXT5_EXT
                    }
                    if (t = tt.get("WEBGL_compressed_texture_pvrtc"), null !== t) {
                        if (e === n.RGB_PVRTC_4BPPV1_Format) return t.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                        if (e === n.RGB_PVRTC_2BPPV1_Format) return t.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                        if (e === n.RGBA_PVRTC_4BPPV1_Format) return t.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                        if (e === n.RGBA_PVRTC_2BPPV1_Format) return t.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                    }
                    if (t = tt.get("EXT_blend_minmax"), null !== t) {
                        if (e === n.MinEquation) return t.MIN_EXT;
                        if (e === n.MaxEquation) return t.MAX_EXT
                    }
                    return 0
                }

                function he(e) {
                    if (ct && e && e.skeleton && e.skeleton.useVertexTexture) return 1024;
                    var t = Pe.getParameter(Pe.MAX_VERTEX_UNIFORM_VECTORS),
                        r = Math.floor((t - 20) / 4),
                        i = r;
                    return void 0 !== e && e instanceof n.SkinnedMesh && (i = Math.min(e.skeleton.bones.length, i), i < e.skeleton.bones.length && n.warn("WebGLRenderer: too many bones - " + e.skeleton.bones.length + ", this GPU supports just " + i + " (try OpenGL instead of ANGLE)")), i
                }

                function le(e) {
                    for (var t = 0, r = 0, i = 0, o = 0, a = 0, s = e.length; s > a; a++) {
                        var h = e[a];
                        h.onlyShadow || h.visible === !1 || (h instanceof n.DirectionalLight && t++, h instanceof n.PointLight && r++, h instanceof n.SpotLight && i++, h instanceof n.HemisphereLight && o++)
                    }
                    return {
                        directional: t,
                        point: r,
                        spot: i,
                        hemi: o
                    }
                }

                function ce(e) {
                    for (var t = 0, r = 0, i = e.length; i > r; r++) {
                        var o = e[r];
                        o.castShadow && (o instanceof n.SpotLight && t++, o instanceof n.DirectionalLight && !o.shadowCascade && t++)
                    }
                    return t
                }
                console.log("THREE.WebGLRenderer", n.REVISION), e = e || {};
                var ue = void 0 !== e.canvas ? e.canvas : document.createElement("canvas"),
                    de = void 0 !== e.context ? e.context : null,
                    pe = 1,
                    fe = void 0 !== e.precision ? e.precision : "highp",
                    me = void 0 !== e.alpha ? e.alpha : !1,
                    ge = void 0 !== e.depth ? e.depth : !0,
                    ve = void 0 !== e.stencil ? e.stencil : !0,
                    ye = void 0 !== e.antialias ? e.antialias : !1,
                    xe = void 0 !== e.premultipliedAlpha ? e.premultipliedAlpha : !0,
                    _e = void 0 !== e.preserveDrawingBuffer ? e.preserveDrawingBuffer : !1,
                    be = void 0 !== e.logarithmicDepthBuffer ? e.logarithmicDepthBuffer : !1,
                    we = new n.Color(0),
                    Me = 0,
                    Se = [],
                    Ee = {},
                    Te = [],
                    Ae = [],
                    Ce = [],
                    Le = [],
                    Re = [];
                this.domElement = ue, this.context = null, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.gammaFactor = 2, this.gammaInput = !1, this.gammaOutput = !1, this.shadowMapEnabled = !1, this.shadowMapType = n.PCFShadowMap, this.shadowMapCullFace = n.CullFaceFront, this.shadowMapDebug = !1, this.shadowMapCascade = !1, this.maxMorphTargets = 8, this.maxMorphNormals = 4, this.autoScaleCubemaps = !0, this.info = {
                    memory: {
                        programs: 0,
                        geometries: 0,
                        textures: 0
                    },
                    render: {
                        calls: 0,
                        vertices: 0,
                        faces: 0,
                        points: 0
                    }
                };
                var Pe, Fe = this,
                    Be = [],
                    De = null,
                    Ue = null,
                    ke = -1,
                    Ve = "",
                    Oe = null,
                    Ne = 0,
                    ze = 0,
                    Ie = 0,
                    Ge = ue.width,
                    He = ue.height,
                    We = 0,
                    je = 0,
                    Xe = new n.Frustum,
                    Ye = new n.Matrix4,
                    qe = new n.Vector3,
                    Ke = new n.Vector3,
                    Qe = !0,
                    Ze = {
                        ambient: [0, 0, 0],
                        directional: {
                            length: 0,
                            colors: [],
                            positions: []
                        },
                        point: {
                            length: 0,
                            colors: [],
                            positions: [],
                            distances: [],
                            decays: []
                        },
                        spot: {
                            length: 0,
                            colors: [],
                            positions: [],
                            distances: [],
                            directions: [],
                            anglesCos: [],
                            exponents: [],
                            decays: []
                        },
                        hemi: {
                            length: 0,
                            skyColors: [],
                            groundColors: [],
                            positions: []
                        }
                    };
                try {
                    var Je = {
                        alpha: me,
                        depth: ge,
                        stencil: ve,
                        antialias: ye,
                        premultipliedAlpha: xe,
                        preserveDrawingBuffer: _e
                    };
                    if (Pe = de || ue.getContext("webgl", Je) || ue.getContext("experimental-webgl", Je), null === Pe) throw null !== ue.getContext("webgl") ? "Error creating WebGL context with your selected attributes." : "Error creating WebGL context.";
                    ue.addEventListener("webglcontextlost", function (e) {
                        e.preventDefault(), nt(), it(), Ee = {}
                    }, !1)
                } catch ($e) {
                    n.error("THREE.WebGLRenderer: " + $e)
                }
                var et = new n.WebGLState(Pe, se);
                void 0 === Pe.getShaderPrecisionFormat && (Pe.getShaderPrecisionFormat = function () {
                    return {
                        rangeMin: 1,
                        rangeMax: 1,
                        precision: 1
                    }
                });
                var tt = new n.WebGLExtensions(Pe);
                tt.get("OES_texture_float"), tt.get("OES_texture_float_linear"), tt.get("OES_texture_half_float"), tt.get("OES_texture_half_float_linear"), tt.get("OES_standard_derivatives"), be && tt.get("EXT_frag_depth");
                var rt = function (e, t, r, i) {
                        xe === !0 && (e *= i, t *= i, r *= i), Pe.clearColor(e, t, r, i)
                    },
                    it = function () {
                        Pe.clearColor(0, 0, 0, 1), Pe.clearDepth(1), Pe.clearStencil(0), Pe.enable(Pe.DEPTH_TEST), Pe.depthFunc(Pe.LEQUAL), Pe.frontFace(Pe.CCW), Pe.cullFace(Pe.BACK), Pe.enable(Pe.CULL_FACE), Pe.enable(Pe.BLEND), Pe.blendEquation(Pe.FUNC_ADD), Pe.blendFunc(Pe.SRC_ALPHA, Pe.ONE_MINUS_SRC_ALPHA), Pe.viewport(ze, Ie, Ge, He), rt(we.r, we.g, we.b, Me)
                    },
                    nt = function () {
                        De = null, Oe = null, Ve = "", ke = -1, Qe = !0, et.reset()
                    };
                it(), this.context = Pe, this.state = et;
                var ot = Pe.getParameter(Pe.MAX_TEXTURE_IMAGE_UNITS),
                    at = Pe.getParameter(Pe.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
                    st = Pe.getParameter(Pe.MAX_TEXTURE_SIZE),
                    ht = Pe.getParameter(Pe.MAX_CUBE_MAP_TEXTURE_SIZE),
                    lt = at > 0,
                    ct = lt && tt.get("OES_texture_float"),
                    ut = Pe.getShaderPrecisionFormat(Pe.VERTEX_SHADER, Pe.HIGH_FLOAT),
                    dt = Pe.getShaderPrecisionFormat(Pe.VERTEX_SHADER, Pe.MEDIUM_FLOAT),
                    pt = Pe.getShaderPrecisionFormat(Pe.FRAGMENT_SHADER, Pe.HIGH_FLOAT),
                    ft = Pe.getShaderPrecisionFormat(Pe.FRAGMENT_SHADER, Pe.MEDIUM_FLOAT),
                    mt = function () {
                        var e;
                        return function () {
                            if (void 0 !== e) return e;
                            if (e = [], tt.get("WEBGL_compressed_texture_pvrtc") || tt.get("WEBGL_compressed_texture_s3tc"))
                                for (var t = Pe.getParameter(Pe.COMPRESSED_TEXTURE_FORMATS), r = 0; r < t.length; r++) e.push(t[r]);
                            return e
                        }
                    }(),
                    gt = ut.precision > 0 && pt.precision > 0,
                    vt = dt.precision > 0 && ft.precision > 0;
                "highp" !== fe || gt || (vt ? (fe = "mediump", n.warn("THREE.WebGLRenderer: highp not supported, using mediump.")) : (fe = "lowp", n.warn("THREE.WebGLRenderer: highp and mediump not supported, using lowp."))), "mediump" !== fe || vt || (fe = "lowp", n.warn("THREE.WebGLRenderer: mediump not supported, using lowp."));
                var yt = new n.ShadowMapPlugin(this, Se, Ee, Te),
                    xt = new n.SpritePlugin(this, Le),
                    _t = new n.LensFlarePlugin(this, Re);
                this.getContext = function () {
                    return Pe
                }, this.forceContextLoss = function () {
                    tt.get("WEBGL_lose_context").loseContext()
                }, this.supportsVertexTextures = function () {
                    return lt
                }, this.supportsFloatTextures = function () {
                    return tt.get("OES_texture_float")
                }, this.supportsHalfFloatTextures = function () {
                    return tt.get("OES_texture_half_float")
                }, this.supportsStandardDerivatives = function () {
                    return tt.get("OES_standard_derivatives")
                }, this.supportsCompressedTextureS3TC = function () {
                    return tt.get("WEBGL_compressed_texture_s3tc")
                }, this.supportsCompressedTexturePVRTC = function () {
                    return tt.get("WEBGL_compressed_texture_pvrtc")
                }, this.supportsBlendMinMax = function () {
                    return tt.get("EXT_blend_minmax")
                }, this.getMaxAnisotropy = function () {
                    var e;
                    return function () {
                        if (void 0 !== e) return e;
                        var t = tt.get("EXT_texture_filter_anisotropic");
                        return e = null !== t ? Pe.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
                    }
                }(), this.getPrecision = function () {
                    return fe
                }, this.getPixelRatio = function () {
                    return pe
                }, this.setPixelRatio = function (e) {
                    pe = e
                }, this.setSize = function (e, t, r) {
                    ue.width = e * pe, ue.height = t * pe, r !== !1 && (ue.style.width = e + "px", ue.style.height = t + "px"), this.setViewport(0, 0, e, t)
                }, this.setViewport = function (e, t, r, i) {
                    ze = e * pe, Ie = t * pe, Ge = r * pe, He = i * pe, Pe.viewport(ze, Ie, Ge, He)
                }, this.setScissor = function (e, t, r, i) {
                    Pe.scissor(e * pe, t * pe, r * pe, i * pe)
                }, this.enableScissorTest = function (e) {
                    e ? Pe.enable(Pe.SCISSOR_TEST) : Pe.disable(Pe.SCISSOR_TEST)
                }, this.getClearColor = function () {
                    return we
                }, this.setClearColor = function (e, t) {
                    we.set(e), Me = void 0 !== t ? t : 1, rt(we.r, we.g, we.b, Me)
                }, this.getClearAlpha = function () {
                    return Me
                }, this.setClearAlpha = function (e) {
                    Me = e, rt(we.r, we.g, we.b, Me)
                }, this.clear = function (e, t, r) {
                    var i = 0;
                    (void 0 === e || e) && (i |= Pe.COLOR_BUFFER_BIT), (void 0 === t || t) && (i |= Pe.DEPTH_BUFFER_BIT), (void 0 === r || r) && (i |= Pe.STENCIL_BUFFER_BIT), Pe.clear(i)
                }, this.clearColor = function () {
                    Pe.clear(Pe.COLOR_BUFFER_BIT)
                }, this.clearDepth = function () {
                    Pe.clear(Pe.DEPTH_BUFFER_BIT)
                }, this.clearStencil = function () {
                    Pe.clear(Pe.STENCIL_BUFFER_BIT)
                }, this.clearTarget = function (e, t, r, i) {
                    this.setRenderTarget(e), this.clear(t, r, i)
                }, this.resetGLState = nt;
                var bt = function (e) {
                        var t = e.target;
                        t.traverse(function (e) {
                            e.removeEventListener("remove", bt), F(e)
                        })
                    },
                    wt = function (e) {
                        var t = e.target;
                        t.removeEventListener("dispose", wt), At(t)
                    },
                    Mt = function (e) {
                        var t = e.target;
                        t.removeEventListener("dispose", Mt), Ct(t), Fe.info.memory.textures--
                    },
                    St = function (e) {
                        var t = e.target;
                        t.removeEventListener("dispose", St), Lt(t), Fe.info.memory.textures--
                    },
                    Et = function (e) {
                        var t = e.target;
                        t.removeEventListener("dispose", Et), Rt(t)
                    },
                    Tt = function (e) {
                        for (var t = ["__webglVertexBuffer", "__webglNormalBuffer", "__webglTangentBuffer", "__webglColorBuffer", "__webglUVBuffer", "__webglUV2Buffer", "__webglSkinIndicesBuffer", "__webglSkinWeightsBuffer", "__webglFaceBuffer", "__webglLineBuffer", "__webglLineDistanceBuffer"], r = 0, i = t.length; i > r; r++) {
                            var n = t[r];
                            void 0 !== e[n] && (Pe.deleteBuffer(e[n]), delete e[n])
                        }
                        if (void 0 !== e.__webglCustomAttributesList) {
                            for (var n in e.__webglCustomAttributesList) Pe.deleteBuffer(e.__webglCustomAttributesList[n].buffer);
                            delete e.__webglCustomAttributesList
                        }
                        Fe.info.memory.geometries--
                    },
                    At = function (e) {
                        if (delete e.__webglInit, e instanceof n.BufferGeometry) {
                            for (var t in e.attributes) {
                                var r = e.attributes[t];
                                void 0 !== r.buffer && (Pe.deleteBuffer(r.buffer), delete r.buffer)
                            }
                            Fe.info.memory.geometries--
                        } else {
                            var i = Pt[e.id];
                            if (void 0 !== i) {
                                for (var o = 0, a = i.length; a > o; o++) {
                                    var s = i[o];
                                    if (void 0 !== s.numMorphTargets) {
                                        for (var h = 0, l = s.numMorphTargets; l > h; h++) Pe.deleteBuffer(s.__webglMorphTargetsBuffers[h]);
                                        delete s.__webglMorphTargetsBuffers
                                    }
                                    if (void 0 !== s.numMorphNormals) {
                                        for (var h = 0, l = s.numMorphNormals; l > h; h++) Pe.deleteBuffer(s.__webglMorphNormalsBuffers[h]);
                                        delete s.__webglMorphNormalsBuffers
                                    }
                                    Tt(s)
                                }
                                delete Pt[e.id]
                            } else Tt(e)
                        }
                        Ve = ""
                    },
                    Ct = function (e) {
                        if (e.image && e.image.__webglTextureCube) Pe.deleteTexture(e.image.__webglTextureCube), delete e.image.__webglTextureCube;
                        else {
                            if (void 0 === e.__webglInit) return;
                            Pe.deleteTexture(e.__webglTexture), delete e.__webglTexture, delete e.__webglInit
                        }
                    },
                    Lt = function (e) {
                        if (e && void 0 !== e.__webglTexture) {
                            if (Pe.deleteTexture(e.__webglTexture), delete e.__webglTexture, e instanceof n.WebGLRenderTargetCube)
                                for (var t = 0; 6 > t; t++) Pe.deleteFramebuffer(e.__webglFramebuffer[t]), Pe.deleteRenderbuffer(e.__webglRenderbuffer[t]);
                            else Pe.deleteFramebuffer(e.__webglFramebuffer), Pe.deleteRenderbuffer(e.__webglRenderbuffer);
                            delete e.__webglFramebuffer, delete e.__webglRenderbuffer
                        }
                    },
                    Rt = function (e) {
                        var t = e.program.program;
                        if (void 0 !== t) {
                            e.program = void 0;
                            var r, i, n, o = !1;
                            for (r = 0, i = Be.length; i > r; r++)
                                if (n = Be[r], n.program === t) {
                                    n.usedTimes--, 0 === n.usedTimes && (o = !0);
                                    break
                                } if (o === !0) {
                                var a = [];
                                for (r = 0, i = Be.length; i > r; r++) n = Be[r], n.program !== t && a.push(n);
                                Be = a, Pe.deleteProgram(t), Fe.info.memory.programs--
                            }
                        }
                    };
                this.renderBufferImmediate = function (e, t, r) {
                    if (et.initAttributes(), e.hasPositions && !e.__webglVertexBuffer && (e.__webglVertexBuffer = Pe.createBuffer()), e.hasNormals && !e.__webglNormalBuffer && (e.__webglNormalBuffer = Pe.createBuffer()), e.hasUvs && !e.__webglUvBuffer && (e.__webglUvBuffer = Pe.createBuffer()), e.hasColors && !e.__webglColorBuffer && (e.__webglColorBuffer = Pe.createBuffer()), e.hasPositions && (Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglVertexBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, e.positionArray, Pe.DYNAMIC_DRAW), et.enableAttribute(t.attributes.position), Pe.vertexAttribPointer(t.attributes.position, 3, Pe.FLOAT, !1, 0, 0)), e.hasNormals) {
                        if (Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglNormalBuffer), r instanceof n.MeshPhongMaterial == !1 && r.shading === n.FlatShading) {
                            var i, o, a, s, h, l, c, u, d, p, f, m, g, v, y = 3 * e.count;
                            for (v = 0; y > v; v += 9) g = e.normalArray, s = g[v], c = g[v + 1], p = g[v + 2], h = g[v + 3], u = g[v + 4], f = g[v + 5], l = g[v + 6], d = g[v + 7], m = g[v + 8], i = (s + h + l) / 3, o = (c + u + d) / 3, a = (p + f + m) / 3, g[v] = i, g[v + 1] = o, g[v + 2] = a, g[v + 3] = i, g[v + 4] = o, g[v + 5] = a, g[v + 6] = i, g[v + 7] = o, g[v + 8] = a
                        }
                        Pe.bufferData(Pe.ARRAY_BUFFER, e.normalArray, Pe.DYNAMIC_DRAW), et.enableAttribute(t.attributes.normal), Pe.vertexAttribPointer(t.attributes.normal, 3, Pe.FLOAT, !1, 0, 0)
                    }
                    e.hasUvs && r.map && (Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglUvBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, e.uvArray, Pe.DYNAMIC_DRAW), et.enableAttribute(t.attributes.uv), Pe.vertexAttribPointer(t.attributes.uv, 2, Pe.FLOAT, !1, 0, 0)), e.hasColors && r.vertexColors !== n.NoColors && (Pe.bindBuffer(Pe.ARRAY_BUFFER, e.__webglColorBuffer), Pe.bufferData(Pe.ARRAY_BUFFER, e.colorArray, Pe.DYNAMIC_DRAW), et.enableAttribute(t.attributes.color), Pe.vertexAttribPointer(t.attributes.color, 3, Pe.FLOAT, !1, 0, 0)), et.disableUnusedAttributes(), Pe.drawArrays(Pe.TRIANGLES, 0, e.count), e.count = 0
                }, this.renderBufferDirect = function (e, t, r, i, o, a) {
                    if (i.visible !== !1) {
                        L(a);
                        var s = k(e, t, r, i, a),
                            h = !1,
                            l = i.wireframe ? 1 : 0,
                            c = "direct_" + o.id + "_" + s.id + "_" + l;
                        if (c !== Ve && (Ve = c, h = !0), h && et.initAttributes(), a instanceof n.Mesh) {
                            var u = i.wireframe === !0 ? Pe.LINES : Pe.TRIANGLES,
                                d = o.attributes.index;
                            if (d) {
                                var p, m;
                                d.array instanceof Uint32Array && tt.get("OES_element_index_uint") ? (p = Pe.UNSIGNED_INT, m = 4) : (p = Pe.UNSIGNED_SHORT, m = 2);
                                var g = o.offsets;
                                if (0 === g.length) h && (f(i, s, o, 0), Pe.bindBuffer(Pe.ELEMENT_ARRAY_BUFFER, d.buffer)), Pe.drawElements(u, d.array.length, p, 0), Fe.info.render.calls++, Fe.info.render.vertices += d.array.length, Fe.info.render.faces += d.array.length / 3;
                                else {
                                    h = !0;
                                    for (var v = 0, y = g.length; y > v; v++) {
                                        var x = g[v].index;
                                        h && (f(i, s, o, x), Pe.bindBuffer(Pe.ELEMENT_ARRAY_BUFFER, d.buffer)), Pe.drawElements(u, g[v].count, p, g[v].start * m), Fe.info.render.calls++, Fe.info.render.vertices += g[v].count, Fe.info.render.faces += g[v].count / 3
                                    }
                                }
                            } else {
                                h && f(i, s, o, 0);
                                var _ = o.attributes.position;
                                Pe.drawArrays(u, 0, _.array.length / _.itemSize), Fe.info.render.calls++, Fe.info.render.vertices += _.array.length / _.itemSize, Fe.info.render.faces += _.array.length / (3 * _.itemSize)
                            }
                        } else if (a instanceof n.PointCloud) {
                            var u = Pe.POINTS,
                                d = o.attributes.index;
                            if (d) {
                                var p, m;
                                d.array instanceof Uint32Array && tt.get("OES_element_index_uint") ? (p = Pe.UNSIGNED_INT, m = 4) : (p = Pe.UNSIGNED_SHORT, m = 2);
                                var g = o.offsets;
                                if (0 === g.length) h && (f(i, s, o, 0), Pe.bindBuffer(Pe.ELEMENT_ARRAY_BUFFER, d.buffer)), Pe.drawElements(u, d.array.length, p, 0), Fe.info.render.calls++, Fe.info.render.points += d.array.length;
                                else {
                                    g.length > 1 && (h = !0);
                                    for (var v = 0, y = g.length; y > v; v++) {
                                        var x = g[v].index;
                                        h && (f(i, s, o, x), Pe.bindBuffer(Pe.ELEMENT_ARRAY_BUFFER, d.buffer)), Pe.drawElements(u, g[v].count, p, g[v].start * m), Fe.info.render.calls++, Fe.info.render.points += g[v].count
                                    }
                                }
                            } else {
                                h && f(i, s, o, 0);
                                var _ = o.attributes.position,
                                    g = o.offsets;
                                if (0 === g.length) Pe.drawArrays(u, 0, _.array.length / 3), Fe.info.render.calls++, Fe.info.render.points += _.array.length / 3;
                                else
                                    for (var v = 0, y = g.length; y > v; v++) Pe.drawArrays(u, g[v].index, g[v].count), Fe.info.render.calls++, Fe.info.render.points += g[v].count
                            }
                        } else if (a instanceof n.Line) {
                            var u = a.mode === n.LineStrip ? Pe.LINE_STRIP : Pe.LINES;
                            et.setLineWidth(i.linewidth * pe);
                            var d = o.attributes.index;
                            if (d) {
                                var p, m;
                                d.array instanceof Uint32Array ? (p = Pe.UNSIGNED_INT, m = 4) : (p = Pe.UNSIGNED_SHORT, m = 2);
                                var g = o.offsets;
                                if (0 === g.length) h && (f(i, s, o, 0), Pe.bindBuffer(Pe.ELEMENT_ARRAY_BUFFER, d.buffer)), Pe.drawElements(u, d.array.length, p, 0), Fe.info.render.calls++, Fe.info.render.vertices += d.array.length;
                                else {
                                    g.length > 1 && (h = !0);
                                    for (var v = 0, y = g.length; y > v; v++) {
                                        var x = g[v].index;
                                        h && (f(i, s, o, x), Pe.bindBuffer(Pe.ELEMENT_ARRAY_BUFFER, d.buffer)), Pe.drawElements(u, g[v].count, p, g[v].start * m), Fe.info.render.calls++, Fe.info.render.vertices += g[v].count
                                    }
                                }
                            } else {
                                h && f(i, s, o, 0);
                                var _ = o.attributes.position,
                                    g = o.offsets;
                                if (0 === g.length) Pe.drawArrays(u, 0, _.array.length / 3), Fe.info.render.calls++, Fe.info.render.vertices += _.array.length / 3;
                                else
                                    for (var v = 0, y = g.length; y > v; v++) Pe.drawArrays(u, g[v].index, g[v].count), Fe.info.render.calls++, Fe.info.render.vertices += g[v].count
                            }
                        }
                    }
                }, this.renderBuffer = function (e, t, r, i, o, a) {
                    if (i.visible !== !1) {
                        L(a);
                        var s = k(e, t, r, i, a),
                            h = s.attributes,
                            l = !1,
                            c = i.wireframe ? 1 : 0,
                            u = o.id + "_" + s.id + "_" + c;
                        if (u !== Ve && (Ve = u, l = !0), l && et.initAttributes(), !i.morphTargets && h.position >= 0 ? l && (Pe.bindBuffer(Pe.ARRAY_BUFFER, o.__webglVertexBuffer), et.enableAttribute(h.position), Pe.vertexAttribPointer(h.position, 3, Pe.FLOAT, !1, 0, 0)) : a.morphTargetBase && m(i, o, a), l) {
                            if (o.__webglCustomAttributesList)
                                for (var d = 0, p = o.__webglCustomAttributesList.length; p > d; d++) {
                                    var f = o.__webglCustomAttributesList[d];
                                    h[f.buffer.belongsToAttribute] >= 0 && (Pe.bindBuffer(Pe.ARRAY_BUFFER, f.buffer), et.enableAttribute(h[f.buffer.belongsToAttribute]), Pe.vertexAttribPointer(h[f.buffer.belongsToAttribute], f.size, Pe.FLOAT, !1, 0, 0))
                                }
                            h.color >= 0 && (a.geometry.colors.length > 0 || a.geometry.faces.length > 0 ? (Pe.bindBuffer(Pe.ARRAY_BUFFER, o.__webglColorBuffer), et.enableAttribute(h.color), Pe.vertexAttribPointer(h.color, 3, Pe.FLOAT, !1, 0, 0)) : void 0 !== i.defaultAttributeValues && Pe.vertexAttrib3fv(h.color, i.defaultAttributeValues.color)), h.normal >= 0 && (Pe.bindBuffer(Pe.ARRAY_BUFFER, o.__webglNormalBuffer), et.enableAttribute(h.normal), Pe.vertexAttribPointer(h.normal, 3, Pe.FLOAT, !1, 0, 0)), h.tangent >= 0 && (Pe.bindBuffer(Pe.ARRAY_BUFFER, o.__webglTangentBuffer), et.enableAttribute(h.tangent), Pe.vertexAttribPointer(h.tangent, 4, Pe.FLOAT, !1, 0, 0)), h.uv >= 0 && (a.geometry.faceVertexUvs[0] ? (Pe.bindBuffer(Pe.ARRAY_BUFFER, o.__webglUVBuffer), et.enableAttribute(h.uv), Pe.vertexAttribPointer(h.uv, 2, Pe.FLOAT, !1, 0, 0)) : void 0 !== i.defaultAttributeValues && Pe.vertexAttrib2fv(h.uv, i.defaultAttributeValues.uv)), h.uv2 >= 0 && (a.geometry.faceVertexUvs[1] ? (Pe.bindBuffer(Pe.ARRAY_BUFFER, o.__webglUV2Buffer), et.enableAttribute(h.uv2), Pe.vertexAttribPointer(h.uv2, 2, Pe.FLOAT, !1, 0, 0)) : void 0 !== i.defaultAttributeValues && Pe.vertexAttrib2fv(h.uv2, i.defaultAttributeValues.uv2)), i.skinning && h.skinIndex >= 0 && h.skinWeight >= 0 && (Pe.bindBuffer(Pe.ARRAY_BUFFER, o.__webglSkinIndicesBuffer), et.enableAttribute(h.skinIndex), Pe.vertexAttribPointer(h.skinIndex, 4, Pe.FLOAT, !1, 0, 0), Pe.bindBuffer(Pe.ARRAY_BUFFER, o.__webglSkinWeightsBuffer), et.enableAttribute(h.skinWeight), Pe.vertexAttribPointer(h.skinWeight, 4, Pe.FLOAT, !1, 0, 0)), h.lineDistance >= 0 && (Pe.bindBuffer(Pe.ARRAY_BUFFER, o.__webglLineDistanceBuffer), et.enableAttribute(h.lineDistance), Pe.vertexAttribPointer(h.lineDistance, 1, Pe.FLOAT, !1, 0, 0))
                        }
                        if (et.disableUnusedAttributes(), a instanceof n.Mesh) {
                            var g = o.__typeArray === Uint32Array ? Pe.UNSIGNED_INT : Pe.UNSIGNED_SHORT;
                            i.wireframe ? (et.setLineWidth(i.wireframeLinewidth * pe), l && Pe.bindBuffer(Pe.ELEMENT_ARRAY_BUFFER, o.__webglLineBuffer), Pe.drawElements(Pe.LINES, o.__webglLineCount, g, 0)) : (l && Pe.bindBuffer(Pe.ELEMENT_ARRAY_BUFFER, o.__webglFaceBuffer), Pe.drawElements(Pe.TRIANGLES, o.__webglFaceCount, g, 0)), Fe.info.render.calls++, Fe.info.render.vertices += o.__webglFaceCount, Fe.info.render.faces += o.__webglFaceCount / 3
                        } else if (a instanceof n.Line) {
                            var v = a.mode === n.LineStrip ? Pe.LINE_STRIP : Pe.LINES;
                            et.setLineWidth(i.linewidth * pe), Pe.drawArrays(v, 0, o.__webglLineCount), Fe.info.render.calls++
                        } else a instanceof n.PointCloud && (Pe.drawArrays(Pe.POINTS, 0, o.__webglParticleCount), Fe.info.render.calls++, Fe.info.render.points += o.__webglParticleCount)
                    }
                }, this.render = function (e, t, r, i) {
                    if (t instanceof n.Camera == !1) return void n.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
                    var o = e.fog;
                    Ve = "", ke = -1, Oe = null, Qe = !0, e.autoUpdate === !0 && e.updateMatrixWorld(), void 0 === t.parent && t.updateMatrixWorld(), e.traverse(function (e) {
                        e instanceof n.SkinnedMesh && e.skeleton.update()
                    }), t.matrixWorldInverse.getInverse(t.matrixWorld), Ye.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), Xe.setFromMatrix(Ye), Se.length = 0, Ae.length = 0, Ce.length = 0, Le.length = 0, Re.length = 0, x(e), Fe.sortObjects === !0 && (Ae.sort(g), Ce.sort(v)), yt.render(e, t), Fe.info.render.calls = 0, Fe.info.render.vertices = 0, Fe.info.render.faces = 0, Fe.info.render.points = 0, this.setRenderTarget(r), (this.autoClear || i) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
                    for (var a = 0, s = Te.length; s > a; a++) {
                        var h = Te[a],
                            l = h.object;
                        l.visible && (Q(l, t), w(h))
                    }
                    if (e.overrideMaterial) {
                        var c = e.overrideMaterial;
                        U(c), _(Ae, t, Se, o, c), _(Ce, t, Se, o, c), b(Te, "", t, Se, o, c)
                    } else et.setBlending(n.NoBlending), _(Ae, t, Se, o, null), b(Te, "opaque", t, Se, o, null), _(Ce, t, Se, o, null), b(Te, "transparent", t, Se, o, null);
                    xt.render(e, t), _t.render(e, t, We, je), r && r.generateMipmaps && r.minFilter !== n.NearestFilter && r.minFilter !== n.LinearFilter && oe(r), et.setDepthTest(!0), et.setDepthWrite(!0), et.setColorWrite(!0)
                }, this.renderImmediateObject = function (e, t, r, i, n) {
                    var o = k(e, t, r, i, n);
                    Ve = "", Fe.setMaterialFaces(i), n.immediateRenderCallback ? n.immediateRenderCallback(o, Pe, Xe) : n.render(function (e) {
                        Fe.renderBufferImmediate(e, o, i)
                    })
                };
                var Pt = {},
                    Ft = 0,
                    Bt = {
                        MeshDepthMaterial: "depth",
                        MeshNormalMaterial: "normal",
                        MeshBasicMaterial: "basic",
                        MeshLambertMaterial: "lambert",
                        MeshPhongMaterial: "phong",
                        LineBasicMaterial: "basic",
                        LineDashedMaterial: "dashed",
                        PointCloudMaterial: "particle_basic"
                    };
                this.setFaceCulling = function (e, t) {
                    e === n.CullFaceNone ? Pe.disable(Pe.CULL_FACE) : (Pe.frontFace(t === n.FrontFaceDirectionCW ? Pe.CW : Pe.CCW), Pe.cullFace(e === n.CullFaceBack ? Pe.BACK : e === n.CullFaceFront ? Pe.FRONT : Pe.FRONT_AND_BACK), Pe.enable(Pe.CULL_FACE))
                }, this.setMaterialFaces = function (e) {
                    et.setDoubleSided(e.side === n.DoubleSide), et.setFlipSided(e.side === n.BackSide)
                }, this.uploadTexture = function (e) {
                    void 0 === e.__webglInit && (e.__webglInit = !0, e.addEventListener("dispose", Mt), e.__webglTexture = Pe.createTexture(), Fe.info.memory.textures++), Pe.bindTexture(Pe.TEXTURE_2D, e.__webglTexture), Pe.pixelStorei(Pe.UNPACK_FLIP_Y_WEBGL, e.flipY), Pe.pixelStorei(Pe.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultiplyAlpha), Pe.pixelStorei(Pe.UNPACK_ALIGNMENT, e.unpackAlignment), e.image = ee(e.image, st);
                    var t = e.image,
                        r = n.Math.isPowerOfTwo(t.width) && n.Math.isPowerOfTwo(t.height),
                        i = se(e.format),
                        o = se(e.type);
                    $(Pe.TEXTURE_2D, e, r);
                    var a, s = e.mipmaps;
                    if (e instanceof n.DataTexture)
                        if (s.length > 0 && r) {
                            for (var h = 0, l = s.length; l > h; h++) a = s[h], Pe.texImage2D(Pe.TEXTURE_2D, h, i, a.width, a.height, 0, i, o, a.data);
                            e.generateMipmaps = !1
                        } else Pe.texImage2D(Pe.TEXTURE_2D, 0, i, t.width, t.height, 0, i, o, t.data);
                    else if (e instanceof n.CompressedTexture)
                        for (var h = 0, l = s.length; l > h; h++) a = s[h], e.format !== n.RGBAFormat && e.format !== n.RGBFormat ? mt().indexOf(i) > -1 ? Pe.compressedTexImage2D(Pe.TEXTURE_2D, h, i, a.width, a.height, 0, a.data) : n.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Pe.texImage2D(Pe.TEXTURE_2D, h, i, a.width, a.height, 0, i, o, a.data);
                    else if (s.length > 0 && r) {
                        for (var h = 0, l = s.length; l > h; h++) a = s[h], Pe.texImage2D(Pe.TEXTURE_2D, h, i, i, o, a);
                        e.generateMipmaps = !1
                    } else Pe.texImage2D(Pe.TEXTURE_2D, 0, i, i, o, e.image);
                    e.generateMipmaps && r && Pe.generateMipmap(Pe.TEXTURE_2D), e.needsUpdate = !1, e.onUpdate && e.onUpdate()
                }, this.setTexture = function (e, t) {
                    Pe.activeTexture(Pe.TEXTURE0 + t), e.needsUpdate ? Fe.uploadTexture(e) : Pe.bindTexture(Pe.TEXTURE_2D, e.__webglTexture)
                }, this.setRenderTarget = function (e) {
                    var t = e instanceof n.WebGLRenderTargetCube;
                    if (e && void 0 === e.__webglFramebuffer) {
                        void 0 === e.depthBuffer && (e.depthBuffer = !0), void 0 === e.stencilBuffer && (e.stencilBuffer = !0), e.addEventListener("dispose", St), e.__webglTexture = Pe.createTexture(), Fe.info.memory.textures++;
                        var r = n.Math.isPowerOfTwo(e.width) && n.Math.isPowerOfTwo(e.height),
                            i = se(e.format),
                            o = se(e.type);
                        if (t) {
                            e.__webglFramebuffer = [], e.__webglRenderbuffer = [], Pe.bindTexture(Pe.TEXTURE_CUBE_MAP, e.__webglTexture), $(Pe.TEXTURE_CUBE_MAP, e, r);
                            for (var a = 0; 6 > a; a++) e.__webglFramebuffer[a] = Pe.createFramebuffer(), e.__webglRenderbuffer[a] = Pe.createRenderbuffer(), Pe.texImage2D(Pe.TEXTURE_CUBE_MAP_POSITIVE_X + a, 0, i, e.width, e.height, 0, i, o, null), ie(e.__webglFramebuffer[a], e, Pe.TEXTURE_CUBE_MAP_POSITIVE_X + a), ne(e.__webglRenderbuffer[a], e);
                            r && Pe.generateMipmap(Pe.TEXTURE_CUBE_MAP)
                        } else e.__webglFramebuffer = Pe.createFramebuffer(), e.__webglRenderbuffer = e.shareDepthFrom ? e.shareDepthFrom.__webglRenderbuffer : Pe.createRenderbuffer(), Pe.bindTexture(Pe.TEXTURE_2D, e.__webglTexture), $(Pe.TEXTURE_2D, e, r), Pe.texImage2D(Pe.TEXTURE_2D, 0, i, e.width, e.height, 0, i, o, null), ie(e.__webglFramebuffer, e, Pe.TEXTURE_2D), e.shareDepthFrom ? e.depthBuffer && !e.stencilBuffer ? Pe.framebufferRenderbuffer(Pe.FRAMEBUFFER, Pe.DEPTH_ATTACHMENT, Pe.RENDERBUFFER, e.__webglRenderbuffer) : e.depthBuffer && e.stencilBuffer && Pe.framebufferRenderbuffer(Pe.FRAMEBUFFER, Pe.DEPTH_STENCIL_ATTACHMENT, Pe.RENDERBUFFER, e.__webglRenderbuffer) : ne(e.__webglRenderbuffer, e), r && Pe.generateMipmap(Pe.TEXTURE_2D);
                        t ? Pe.bindTexture(Pe.TEXTURE_CUBE_MAP, null) : Pe.bindTexture(Pe.TEXTURE_2D, null), Pe.bindRenderbuffer(Pe.RENDERBUFFER, null), Pe.bindFramebuffer(Pe.FRAMEBUFFER, null)
                    }
                    var s, h, l, c, u;
                    e ? (s = t ? e.__webglFramebuffer[e.activeCubeFace] : e.__webglFramebuffer, h = e.width, l = e.height, c = 0, u = 0) : (s = null, h = Ge, l = He, c = ze, u = Ie), s !== Ue && (Pe.bindFramebuffer(Pe.FRAMEBUFFER, s), Pe.viewport(c, u, h, l), Ue = s), We = h, je = l
                }, this.readRenderTargetPixels = function (e, t, r, i, o, a) {
                    if (!(e instanceof n.WebGLRenderTarget)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
                    if (e.__webglFramebuffer) {
                        if (e.format !== n.RGBAFormat) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA format. readPixels can read only RGBA format.");
                        var s = !1;
                        e.__webglFramebuffer !== Ue && (Pe.bindFramebuffer(Pe.FRAMEBUFFER, e.__webglFramebuffer), s = !0), Pe.checkFramebufferStatus(Pe.FRAMEBUFFER) === Pe.FRAMEBUFFER_COMPLETE ? Pe.readPixels(t, r, i, o, Pe.RGBA, Pe.UNSIGNED_BYTE, a) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete."), s && Pe.bindFramebuffer(Pe.FRAMEBUFFER, Ue)
                    }
                }, this.initMaterial = function () {
                    n.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
                }, this.addPrePlugin = function () {
                    n.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
                }, this.addPostPlugin = function () {
                    n.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
                }, this.updateShadowMap = function () {
                    n.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
                }
            }, n.WebGLRenderTarget = function (e, t, r) {
                this.width = e, this.height = t, r = r || {}, this.wrapS = void 0 !== r.wrapS ? r.wrapS : n.ClampToEdgeWrapping, this.wrapT = void 0 !== r.wrapT ? r.wrapT : n.ClampToEdgeWrapping, this.magFilter = void 0 !== r.magFilter ? r.magFilter : n.LinearFilter, this.minFilter = void 0 !== r.minFilter ? r.minFilter : n.LinearMipMapLinearFilter, this.anisotropy = void 0 !== r.anisotropy ? r.anisotropy : 1, this.offset = new n.Vector2(0, 0), this.repeat = new n.Vector2(1, 1), this.format = void 0 !== r.format ? r.format : n.RGBAFormat, this.type = void 0 !== r.type ? r.type : n.UnsignedByteType, this.depthBuffer = void 0 !== r.depthBuffer ? r.depthBuffer : !0, this.stencilBuffer = void 0 !== r.stencilBuffer ? r.stencilBuffer : !0, this.generateMipmaps = !0, this.shareDepthFrom = void 0 !== r.shareDepthFrom ? r.shareDepthFrom : null
            }, n.WebGLRenderTarget.prototype = {
                constructor: n.WebGLRenderTarget,
                setSize: function (e, t) {
                    this.width = e, this.height = t
                },
                clone: function () {
                    var e = new n.WebGLRenderTarget(this.width, this.height);
                    return e.wrapS = this.wrapS, e.wrapT = this.wrapT, e.magFilter = this.magFilter, e.minFilter = this.minFilter, e.anisotropy = this.anisotropy, e.offset.copy(this.offset), e.repeat.copy(this.repeat), e.format = this.format, e.type = this.type, e.depthBuffer = this.depthBuffer, e.stencilBuffer = this.stencilBuffer, e.generateMipmaps = this.generateMipmaps, e.shareDepthFrom = this.shareDepthFrom, e
                },
                dispose: function () {
                    this.dispatchEvent({
                        type: "dispose"
                    })
                }
            }, n.EventDispatcher.prototype.apply(n.WebGLRenderTarget.prototype), n.WebGLRenderTargetCube = function (e, t, r) {
                n.WebGLRenderTarget.call(this, e, t, r), this.activeCubeFace = 0
            }, n.WebGLRenderTargetCube.prototype = Object.create(n.WebGLRenderTarget.prototype), n.WebGLRenderTargetCube.prototype.constructor = n.WebGLRenderTargetCube, n.WebGLExtensions = function (e) {
                var t = {};
                this.get = function (r) {
                    if (void 0 !== t[r]) return t[r];
                    var i;
                    switch (r) {
                        case "EXT_texture_filter_anisotropic":
                            i = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                            break;
                        case "WEBGL_compressed_texture_s3tc":
                            i = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                            break;
                        case "WEBGL_compressed_texture_pvrtc":
                            i = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                            break;
                        default:
                            i = e.getExtension(r)
                    }
                    return null === i && n.warn("THREE.WebGLRenderer: " + r + " extension not supported."), t[r] = i, i
                }
            }, n.WebGLProgram = function () {
                var e = 0,
                    t = function (e) {
                        var t, r, i = [];
                        for (var n in e) t = e[n], t !== !1 && (r = "#define " + n + " " + t, i.push(r));
                        return i.join("\n")
                    },
                    r = function (e, t, r) {
                        for (var i = {}, n = 0, o = r.length; o > n; n++) {
                            var a = r[n];
                            i[a] = e.getUniformLocation(t, a)
                        }
                        return i
                    },
                    i = function (e, t, r) {
                        for (var i = {}, n = 0, o = r.length; o > n; n++) {
                            var a = r[n];
                            i[a] = e.getAttribLocation(t, a)
                        }
                        return i
                    };
                return function (o, a, s, h) {
                    var l = o,
                        c = l.context,
                        u = s.defines,
                        d = s.__webglShader.uniforms,
                        p = s.attributes,
                        f = s.__webglShader.vertexShader,
                        m = s.__webglShader.fragmentShader,
                        g = s.index0AttributeName;
                    void 0 === g && h.morphTargets === !0 && (g = "position");
                    var v = "SHADOWMAP_TYPE_BASIC";
                    h.shadowMapType === n.PCFShadowMap ? v = "SHADOWMAP_TYPE_PCF" : h.shadowMapType === n.PCFSoftShadowMap && (v = "SHADOWMAP_TYPE_PCF_SOFT");
                    var y = "ENVMAP_TYPE_CUBE",
                        x = "ENVMAP_MODE_REFLECTION",
                        _ = "ENVMAP_BLENDING_MULTIPLY";
                    if (h.envMap) {
                        switch (s.envMap.mapping) {
                            case n.CubeReflectionMapping:
                            case n.CubeRefractionMapping:
                                y = "ENVMAP_TYPE_CUBE";
                                break;
                            case n.EquirectangularReflectionMapping:
                            case n.EquirectangularRefractionMapping:
                                y = "ENVMAP_TYPE_EQUIREC";
                                break;
                            case n.SphericalReflectionMapping:
                                y = "ENVMAP_TYPE_SPHERE"
                        }
                        switch (s.envMap.mapping) {
                            case n.CubeRefractionMapping:
                            case n.EquirectangularRefractionMapping:
                                x = "ENVMAP_MODE_REFRACTION"
                        }
                        switch (s.combine) {
                            case n.MultiplyOperation:
                                _ = "ENVMAP_BLENDING_MULTIPLY";
                                break;
                            case n.MixOperation:
                                _ = "ENVMAP_BLENDING_MIX";
                                break;
                            case n.AddOperation:
                                _ = "ENVMAP_BLENDING_ADD"
                        }
                    }
                    var b, w, M = o.gammaFactor > 0 ? o.gammaFactor : 1,
                        S = t(u),
                        E = c.createProgram();
                    s instanceof n.RawShaderMaterial ? (b = "", w = "") : (b = ["precision " + h.precision + " float;", "precision " + h.precision + " int;", S, h.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", l.gammaInput ? "#define GAMMA_INPUT" : "", l.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + M, "#define MAX_DIR_LIGHTS " + h.maxDirLights, "#define MAX_POINT_LIGHTS " + h.maxPointLights, "#define MAX_SPOT_LIGHTS " + h.maxSpotLights, "#define MAX_HEMI_LIGHTS " + h.maxHemiLights, "#define MAX_SHADOWS " + h.maxShadows, "#define MAX_BONES " + h.maxBones, h.map ? "#define USE_MAP" : "", h.envMap ? "#define USE_ENVMAP" : "", h.envMap ? "#define " + x : "", h.lightMap ? "#define USE_LIGHTMAP" : "", h.bumpMap ? "#define USE_BUMPMAP" : "", h.normalMap ? "#define USE_NORMALMAP" : "", h.specularMap ? "#define USE_SPECULARMAP" : "", h.alphaMap ? "#define USE_ALPHAMAP" : "", h.vertexColors ? "#define USE_COLOR" : "", h.flatShading ? "#define FLAT_SHADED" : "", h.skinning ? "#define USE_SKINNING" : "", h.useVertexTexture ? "#define BONE_TEXTURE" : "", h.morphTargets ? "#define USE_MORPHTARGETS" : "", h.morphNormals ? "#define USE_MORPHNORMALS" : "", h.wrapAround ? "#define WRAP_AROUND" : "", h.doubleSided ? "#define DOUBLE_SIDED" : "", h.flipSided ? "#define FLIP_SIDED" : "", h.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", h.shadowMapEnabled ? "#define " + v : "", h.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", h.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", h.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", h.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "attribute vec2 uv2;", "#ifdef USE_COLOR", "	attribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "	attribute vec3 morphTarget0;", "	attribute vec3 morphTarget1;", "	attribute vec3 morphTarget2;", "	attribute vec3 morphTarget3;", "	#ifdef USE_MORPHNORMALS", "		attribute vec3 morphNormal0;", "		attribute vec3 morphNormal1;", "		attribute vec3 morphNormal2;", "		attribute vec3 morphNormal3;", "	#else", "		attribute vec3 morphTarget4;", "		attribute vec3 morphTarget5;", "		attribute vec3 morphTarget6;", "		attribute vec3 morphTarget7;", "	#endif", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", ""].join("\n"), w = ["precision " + h.precision + " float;", "precision " + h.precision + " int;", h.bumpMap || h.normalMap || h.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", S, "#define MAX_DIR_LIGHTS " + h.maxDirLights, "#define MAX_POINT_LIGHTS " + h.maxPointLights, "#define MAX_SPOT_LIGHTS " + h.maxSpotLights, "#define MAX_HEMI_LIGHTS " + h.maxHemiLights, "#define MAX_SHADOWS " + h.maxShadows, h.alphaTest ? "#define ALPHATEST " + h.alphaTest : "", l.gammaInput ? "#define GAMMA_INPUT" : "", l.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + M, h.useFog && h.fog ? "#define USE_FOG" : "", h.useFog && h.fogExp ? "#define FOG_EXP2" : "", h.map ? "#define USE_MAP" : "", h.envMap ? "#define USE_ENVMAP" : "", h.envMap ? "#define " + y : "", h.envMap ? "#define " + x : "", h.envMap ? "#define " + _ : "", h.lightMap ? "#define USE_LIGHTMAP" : "", h.bumpMap ? "#define USE_BUMPMAP" : "", h.normalMap ? "#define USE_NORMALMAP" : "", h.specularMap ? "#define USE_SPECULARMAP" : "", h.alphaMap ? "#define USE_ALPHAMAP" : "", h.vertexColors ? "#define USE_COLOR" : "", h.flatShading ? "#define FLAT_SHADED" : "", h.metal ? "#define METAL" : "", h.wrapAround ? "#define WRAP_AROUND" : "", h.doubleSided ? "#define DOUBLE_SIDED" : "", h.flipSided ? "#define FLIP_SIDED" : "", h.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", h.shadowMapEnabled ? "#define " + v : "", h.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", h.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", h.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", ""].join("\n"));
                    var T = new n.WebGLShader(c, c.VERTEX_SHADER, b + f),
                        A = new n.WebGLShader(c, c.FRAGMENT_SHADER, w + m);
                    c.attachShader(E, T), c.attachShader(E, A), void 0 !== g && c.bindAttribLocation(E, 0, g), c.linkProgram(E);
                    var C = c.getProgramInfoLog(E);
                    c.getProgramParameter(E, c.LINK_STATUS) === !1 && n.error("THREE.WebGLProgram: shader error: " + c.getError(), "gl.VALIDATE_STATUS", c.getProgramParameter(E, c.VALIDATE_STATUS), "gl.getPRogramInfoLog", C), "" !== C && n.warn("THREE.WebGLProgram: gl.getProgramInfoLog()" + C), c.deleteShader(T), c.deleteShader(A);
                    var L = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "modelMatrix", "cameraPosition", "morphTargetInfluences", "bindMatrix", "bindMatrixInverse"];
                    h.useVertexTexture ? (L.push("boneTexture"), L.push("boneTextureWidth"), L.push("boneTextureHeight")) : L.push("boneGlobalMatrices"), h.logarithmicDepthBuffer && L.push("logDepthBufFC");
                    for (var R in d) L.push(R);
                    this.uniforms = r(c, E, L), L = ["position", "normal", "uv", "uv2", "tangent", "color", "skinIndex", "skinWeight", "lineDistance"];
                    for (var P = 0; P < h.maxMorphTargets; P++) L.push("morphTarget" + P);
                    for (var P = 0; P < h.maxMorphNormals; P++) L.push("morphNormal" + P);
                    for (var F in p) L.push(F);
                    return this.attributes = i(c, E, L), this.attributesKeys = Object.keys(this.attributes), this.id = e++, this.code = a, this.usedTimes = 1, this.program = E, this.vertexShader = T, this.fragmentShader = A, this
                }
            }(), n.WebGLShader = function () {
                var e = function (e) {
                    for (var t = e.split("\n"), r = 0; r < t.length; r++) t[r] = r + 1 + ": " + t[r];
                    return t.join("\n")
                };
                return function (t, r, i) {
                    var o = t.createShader(r);
                    return t.shaderSource(o, i), t.compileShader(o), t.getShaderParameter(o, t.COMPILE_STATUS) === !1 && n.error("THREE.WebGLShader: Shader couldn't compile."), "" !== t.getShaderInfoLog(o) && n.warn("THREE.WebGLShader: gl.getShaderInfoLog()", t.getShaderInfoLog(o), e(i)), o
                }
            }(), n.WebGLState = function (e, t) {
                var r = new Uint8Array(16),
                    i = new Uint8Array(16),
                    o = null,
                    a = null,
                    s = null,
                    h = null,
                    l = null,
                    c = null,
                    u = null,
                    d = null,
                    p = null,
                    f = null,
                    m = null,
                    g = null,
                    v = null,
                    y = null,
                    x = null,
                    _ = null;
                this.initAttributes = function () {
                    for (var e = 0, t = r.length; t > e; e++) r[e] = 0
                }, this.enableAttribute = function (t) {
                    r[t] = 1, 0 === i[t] && (e.enableVertexAttribArray(t), i[t] = 1)
                }, this.disableUnusedAttributes = function () {
                    for (var t = 0, n = i.length; n > t; t++) i[t] !== r[t] && (e.disableVertexAttribArray(t), i[t] = 0)
                }, this.setBlending = function (r, i, d, p, f, m, g) {
                    r !== o && (r === n.NoBlending ? e.disable(e.BLEND) : r === n.AdditiveBlending ? (e.enable(e.BLEND), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.SRC_ALPHA, e.ONE)) : r === n.SubtractiveBlending ? (e.enable(e.BLEND), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ZERO, e.ONE_MINUS_SRC_COLOR)) : r === n.MultiplyBlending ? (e.enable(e.BLEND), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ZERO, e.SRC_COLOR)) : r === n.CustomBlending ? e.enable(e.BLEND) : (e.enable(e.BLEND), e.blendEquationSeparate(e.FUNC_ADD, e.FUNC_ADD), e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA)), o = r), r === n.CustomBlending ? (f = f || i, m = m || d, g = g || p, (i !== a || f !== l) && (e.blendEquationSeparate(t(i), t(f)), a = i, l = f), (d !== s || p !== h || m !== c || g !== u) && (e.blendFuncSeparate(t(d), t(p), t(m), t(g)), s = d, h = p, c = m, u = g)) : (a = null, s = null, h = null, l = null, c = null, u = null)
                }, this.setDepthTest = function (t) {
                    d !== t && (t ? e.enable(e.DEPTH_TEST) : e.disable(e.DEPTH_TEST), d = t)
                }, this.setDepthWrite = function (t) {
                    p !== t && (e.depthMask(t), p = t)
                }, this.setColorWrite = function (t) {
                    f !== t && (e.colorMask(t, t, t, t), f = t)
                }, this.setDoubleSided = function (t) {
                    m !== t && (t ? e.disable(e.CULL_FACE) : e.enable(e.CULL_FACE), m = t)
                }, this.setFlipSided = function (t) {
                    g !== t && (e.frontFace(t ? e.CW : e.CCW), g = t)
                }, this.setLineWidth = function (t) {
                    t !== v && (e.lineWidth(t), v = t)
                }, this.setPolygonOffset = function (t, r, i) {
                    y !== t && (t ? e.enable(e.POLYGON_OFFSET_FILL) : e.disable(e.POLYGON_OFFSET_FILL), y = t), !t || x === r && _ === i || (e.polygonOffset(r, i), x = r, _ = i)
                }, this.reset = function () {
                    for (var e = 0; e < i.length; e++) i[e] = 0;
                    o = null, d = null, p = null, f = null, m = null, g = null
                }
            }, n.LensFlarePlugin = function (e, t) {
                function r(t) {
                    var r = d.createProgram(),
                        i = d.createShader(d.FRAGMENT_SHADER),
                        n = d.createShader(d.VERTEX_SHADER),
                        o = "precision " + e.getPrecision() + " float;\n";
                    return d.shaderSource(i, o + t.fragmentShader), d.shaderSource(n, o + t.vertexShader), d.compileShader(i), d.compileShader(n), d.attachShader(r, i), d.attachShader(r, n), d.linkProgram(r), r
                }
                var i, o, a, s, h, l, c, u, d = e.context,
                    p = function () {
                        var e = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1]),
                            t = new Uint16Array([0, 1, 2, 0, 2, 3]);
                        i = d.createBuffer(), o = d.createBuffer(), d.bindBuffer(d.ARRAY_BUFFER, i), d.bufferData(d.ARRAY_BUFFER, e, d.STATIC_DRAW), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, o), d.bufferData(d.ELEMENT_ARRAY_BUFFER, t, d.STATIC_DRAW), c = d.createTexture(), u = d.createTexture(), d.bindTexture(d.TEXTURE_2D, c), d.texImage2D(d.TEXTURE_2D, 0, d.RGB, 16, 16, 0, d.RGB, d.UNSIGNED_BYTE, null), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.NEAREST), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.NEAREST), d.bindTexture(d.TEXTURE_2D, u), d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, 16, 16, 0, d.RGBA, d.UNSIGNED_BYTE, null), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.NEAREST), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.NEAREST), l = d.getParameter(d.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0;
                        var n;
                        n = l ? {
                            vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "uniform sampler2D occlusionMap;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );", "vVisibility =        visibility.r / 9.0;", "vVisibility *= 1.0 - visibility.g / 9.0;", "vVisibility *=       visibility.b / 9.0;", "vVisibility *= 1.0 - visibility.a / 9.0;", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
                            fragmentShader: ["uniform lowp int renderType;", "uniform sampler2D map;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * vVisibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
                        } : {
                            vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
                            fragmentShader: ["precision mediump float;", "uniform lowp int renderType;", "uniform sampler2D map;", "uniform sampler2D occlusionMap;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;", "visibility = ( 1.0 - visibility / 4.0 );", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * visibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
                        }, a = r(n), s = {
                            vertex: d.getAttribLocation(a, "position"),
                            uv: d.getAttribLocation(a, "uv")
                        }, h = {
                            renderType: d.getUniformLocation(a, "renderType"),
                            map: d.getUniformLocation(a, "map"),
                            occlusionMap: d.getUniformLocation(a, "occlusionMap"),
                            opacity: d.getUniformLocation(a, "opacity"),
                            color: d.getUniformLocation(a, "color"),
                            scale: d.getUniformLocation(a, "scale"),
                            rotation: d.getUniformLocation(a, "rotation"),
                            screenPosition: d.getUniformLocation(a, "screenPosition")
                        }
                    };
                this.render = function (r, f, m, g) {
                    if (0 !== t.length) {
                        var v = new n.Vector3,
                            y = g / m,
                            x = .5 * m,
                            _ = .5 * g,
                            b = 16 / g,
                            w = new n.Vector2(b * y, b),
                            M = new n.Vector3(1, 1, 0),
                            S = new n.Vector2(1, 1);
                        void 0 === a && p(), d.useProgram(a), d.enableVertexAttribArray(s.vertex), d.enableVertexAttribArray(s.uv), d.uniform1i(h.occlusionMap, 0), d.uniform1i(h.map, 1), d.bindBuffer(d.ARRAY_BUFFER, i), d.vertexAttribPointer(s.vertex, 2, d.FLOAT, !1, 16, 0), d.vertexAttribPointer(s.uv, 2, d.FLOAT, !1, 16, 8), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, o), d.disable(d.CULL_FACE), d.depthMask(!1);
                        for (var E = 0, T = t.length; T > E; E++) {
                            b = 16 / g, w.set(b * y, b);
                            var A = t[E];
                            if (v.set(A.matrixWorld.elements[12], A.matrixWorld.elements[13], A.matrixWorld.elements[14]), v.applyMatrix4(f.matrixWorldInverse), v.applyProjection(f.projectionMatrix), M.copy(v), S.x = M.x * x + x, S.y = M.y * _ + _, l || S.x > 0 && S.x < m && S.y > 0 && S.y < g) {
                                d.activeTexture(d.TEXTURE1), d.bindTexture(d.TEXTURE_2D, c), d.copyTexImage2D(d.TEXTURE_2D, 0, d.RGB, S.x - 8, S.y - 8, 16, 16, 0), d.uniform1i(h.renderType, 0), d.uniform2f(h.scale, w.x, w.y), d.uniform3f(h.screenPosition, M.x, M.y, M.z), d.disable(d.BLEND), d.enable(d.DEPTH_TEST), d.drawElements(d.TRIANGLES, 6, d.UNSIGNED_SHORT, 0), d.activeTexture(d.TEXTURE0), d.bindTexture(d.TEXTURE_2D, u), d.copyTexImage2D(d.TEXTURE_2D, 0, d.RGBA, S.x - 8, S.y - 8, 16, 16, 0), d.uniform1i(h.renderType, 1), d.disable(d.DEPTH_TEST), d.activeTexture(d.TEXTURE1), d.bindTexture(d.TEXTURE_2D, c), d.drawElements(d.TRIANGLES, 6, d.UNSIGNED_SHORT, 0), A.positionScreen.copy(M), A.customUpdateCallback ? A.customUpdateCallback(A) : A.updateLensFlares(), d.uniform1i(h.renderType, 2), d.enable(d.BLEND);
                                for (var C = 0, L = A.lensFlares.length; L > C; C++) {
                                    var R = A.lensFlares[C];
                                    R.opacity > .001 && R.scale > .001 && (M.x = R.x, M.y = R.y, M.z = R.z, b = R.size * R.scale / g, w.x = b * y, w.y = b, d.uniform3f(h.screenPosition, M.x, M.y, M.z), d.uniform2f(h.scale, w.x, w.y), d.uniform1f(h.rotation, R.rotation), d.uniform1f(h.opacity, R.opacity), d.uniform3f(h.color, R.color.r, R.color.g, R.color.b), e.state.setBlending(R.blending, R.blendEquation, R.blendSrc, R.blendDst), e.setTexture(R.texture, 1), d.drawElements(d.TRIANGLES, 6, d.UNSIGNED_SHORT, 0))
                                }
                            }
                        }
                        d.enable(d.CULL_FACE), d.enable(d.DEPTH_TEST), d.depthMask(!0), e.resetGLState()
                    }
                }
            }, n.ShadowMapPlugin = function (e, t, r, i) {
                function o(e, t, i) {
                    if (t.visible) {
                        var n = r[t.id];
                        if (n && t.castShadow && (t.frustumCulled === !1 || m.intersectsObject(t) === !0))
                            for (var a = 0, s = n.length; s > a; a++) {
                                var h = n[a];
                                t._modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, t.matrixWorld), _.push(h)
                            }
                        for (var a = 0, s = t.children.length; s > a; a++) o(e, t.children[a], i)
                    }
                }

                function a(e, t) {
                    var r = new n.DirectionalLight;
                    r.isVirtual = !0, r.onlyShadow = !0, r.castShadow = !0, r.shadowCameraNear = e.shadowCameraNear, r.shadowCameraFar = e.shadowCameraFar, r.shadowCameraLeft = e.shadowCameraLeft, r.shadowCameraRight = e.shadowCameraRight, r.shadowCameraBottom = e.shadowCameraBottom, r.shadowCameraTop = e.shadowCameraTop, r.shadowCameraVisible = e.shadowCameraVisible, r.shadowDarkness = e.shadowDarkness, r.shadowBias = e.shadowCascadeBias[t], r.shadowMapWidth = e.shadowCascadeWidth[t], r.shadowMapHeight = e.shadowCascadeHeight[t], r.pointsWorld = [], r.pointsFrustum = [];
                    for (var i = r.pointsWorld, o = r.pointsFrustum, a = 0; 8 > a; a++) i[a] = new n.Vector3, o[a] = new n.Vector3;
                    var s = e.shadowCascadeNearZ[t],
                        h = e.shadowCascadeFarZ[t];
                    return o[0].set(-1, -1, s), o[1].set(1, -1, s), o[2].set(-1, 1, s), o[3].set(1, 1, s), o[4].set(-1, -1, h), o[5].set(1, -1, h), o[6].set(-1, 1, h), o[7].set(1, 1, h), r
                }

                function s(e, t) {
                    var r = e.shadowCascadeArray[t];
                    r.position.copy(e.position), r.target.position.copy(e.target.position), r.lookAt(r.target), r.shadowCameraVisible = e.shadowCameraVisible, r.shadowDarkness = e.shadowDarkness, r.shadowBias = e.shadowCascadeBias[t];
                    var i = e.shadowCascadeNearZ[t],
                        n = e.shadowCascadeFarZ[t],
                        o = r.pointsFrustum;
                    o[0].z = i, o[1].z = i, o[2].z = i, o[3].z = i, o[4].z = n, o[5].z = n, o[6].z = n, o[7].z = n
                }

                function h(e, t) {
                    var r = t.shadowCamera,
                        i = t.pointsFrustum,
                        n = t.pointsWorld;
                    v.set(1 / 0, 1 / 0, 1 / 0), y.set(-(1 / 0), -(1 / 0), -(1 / 0));
                    for (var o = 0; 8 > o; o++) {
                        var a = n[o];
                        a.copy(i[o]), a.unproject(e), a.applyMatrix4(r.matrixWorldInverse), a.x < v.x && (v.x = a.x), a.x > y.x && (y.x = a.x), a.y < v.y && (v.y = a.y), a.y > y.y && (y.y = a.y), a.z < v.z && (v.z = a.z), a.z > y.z && (y.z = a.z)
                    }
                    r.left = v.x, r.right = y.x, r.top = y.y, r.bottom = v.y, r.updateProjectionMatrix()
                }

                function l(e) {
                    return e.material instanceof n.MeshFaceMaterial ? e.material.materials[0] : e.material
                }
                var c, u, d, p, f = e.context,
                    m = new n.Frustum,
                    g = new n.Matrix4,
                    v = new n.Vector3,
                    y = new n.Vector3,
                    x = new n.Vector3,
                    _ = [],
                    b = n.ShaderLib.depthRGBA,
                    w = n.UniformsUtils.clone(b.uniforms);
                c = new n.ShaderMaterial({
                    uniforms: w,
                    vertexShader: b.vertexShader,
                    fragmentShader: b.fragmentShader
                }), u = new n.ShaderMaterial({
                    uniforms: w,
                    vertexShader: b.vertexShader,
                    fragmentShader: b.fragmentShader,
                    morphTargets: !0
                }), d = new n.ShaderMaterial({
                    uniforms: w,
                    vertexShader: b.vertexShader,
                    fragmentShader: b.fragmentShader,
                    skinning: !0
                }), p = new n.ShaderMaterial({
                    uniforms: w,
                    vertexShader: b.vertexShader,
                    fragmentShader: b.fragmentShader,
                    morphTargets: !0,
                    skinning: !0
                }), c._shadowPass = !0, u._shadowPass = !0, d._shadowPass = !0, p._shadowPass = !0, this.render = function (r, v) {
                    if (e.shadowMapEnabled !== !1) {
                        var y, b, w, M, S, E, T, A, C, L, R, P, F, B = [],
                            D = 0,
                            U = null;
                        for (f.clearColor(1, 1, 1, 1), f.disable(f.BLEND), f.enable(f.CULL_FACE), f.frontFace(f.CCW), f.cullFace(e.shadowMapCullFace === n.CullFaceFront ? f.FRONT : f.BACK), e.state.setDepthTest(!0), y = 0, b = t.length; b > y; y++)
                            if (F = t[y], F.castShadow)
                                if (F instanceof n.DirectionalLight && F.shadowCascade)
                                    for (S = 0; S < F.shadowCascadeCount; S++) {
                                        var k;
                                        if (F.shadowCascadeArray[S]) k = F.shadowCascadeArray[S];
                                        else {
                                            k = a(F, S), k.originalCamera = v;
                                            var V = new n.Gyroscope;
                                            V.position.copy(F.shadowCascadeOffset), V.add(k), V.add(k.target), v.add(V), F.shadowCascadeArray[S] = k
                                        }
                                        s(F, S), B[D] = k, D++
                                    } else B[D] = F, D++;
                        for (y = 0, b = B.length; b > y; y++) {
                            if (F = B[y], !F.shadowMap) {
                                var O = n.LinearFilter;
                                e.shadowMapType === n.PCFSoftShadowMap && (O = n.NearestFilter);
                                var N = {
                                    minFilter: O,
                                    magFilter: O,
                                    format: n.RGBAFormat
                                };
                                F.shadowMap = new n.WebGLRenderTarget(F.shadowMapWidth, F.shadowMapHeight, N), F.shadowMapSize = new n.Vector2(F.shadowMapWidth, F.shadowMapHeight), F.shadowMatrix = new n.Matrix4
                            }
                            if (!F.shadowCamera) {
                                if (F instanceof n.SpotLight) F.shadowCamera = new n.PerspectiveCamera(F.shadowCameraFov, F.shadowMapWidth / F.shadowMapHeight, F.shadowCameraNear, F.shadowCameraFar);
                                else {
                                    if (!(F instanceof n.DirectionalLight)) {
                                        n.error("THREE.ShadowMapPlugin: Unsupported light type for shadow", F);
                                        continue
                                    }
                                    F.shadowCamera = new n.OrthographicCamera(F.shadowCameraLeft, F.shadowCameraRight, F.shadowCameraTop, F.shadowCameraBottom, F.shadowCameraNear, F.shadowCameraFar)
                                }
                                r.add(F.shadowCamera), r.autoUpdate === !0 && r.updateMatrixWorld()
                            }
                            F.shadowCameraVisible && !F.cameraHelper && (F.cameraHelper = new n.CameraHelper(F.shadowCamera), r.add(F.cameraHelper)), F.isVirtual && k.originalCamera == v && h(v, F), E = F.shadowMap, T = F.shadowMatrix, A = F.shadowCamera, A.position.setFromMatrixPosition(F.matrixWorld), x.setFromMatrixPosition(F.target.matrixWorld), A.lookAt(x), A.updateMatrixWorld(), A.matrixWorldInverse.getInverse(A.matrixWorld), F.cameraHelper && (F.cameraHelper.visible = F.shadowCameraVisible), F.shadowCameraVisible && F.cameraHelper.update(), T.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), T.multiply(A.projectionMatrix), T.multiply(A.matrixWorldInverse), g.multiplyMatrices(A.projectionMatrix, A.matrixWorldInverse), m.setFromMatrix(g), e.setRenderTarget(E), e.clear(), _.length = 0, o(r, r, A);
                            var z, I, G;
                            for (w = 0, M = _.length; M > w; w++) R = _[w], P = R.object, C = R.buffer, z = l(P), I = void 0 !== P.geometry.morphTargets && P.geometry.morphTargets.length > 0 && z.morphTargets, G = P instanceof n.SkinnedMesh && z.skinning, L = P.customDepthMaterial ? P.customDepthMaterial : G ? I ? p : d : I ? u : c, e.setMaterialFaces(z), C instanceof n.BufferGeometry ? e.renderBufferDirect(A, t, U, L, C, P) : e.renderBuffer(A, t, U, L, C, P);
                            for (w = 0, M = i.length; M > w; w++) R = i[w], P = R.object, P.visible && P.castShadow && (P._modelViewMatrix.multiplyMatrices(A.matrixWorldInverse, P.matrixWorld), e.renderImmediateObject(A, t, U, c, P))
                        }
                        var H = e.getClearColor(),
                            W = e.getClearAlpha();
                        f.clearColor(H.r, H.g, H.b, W), f.enable(f.BLEND), e.shadowMapCullFace === n.CullFaceFront && f.cullFace(f.BACK), e.resetGLState()
                    }
                }
            }, n.SpritePlugin = function (e, t) {
                function r() {
                    var t = u.createProgram(),
                        r = u.createShader(u.VERTEX_SHADER),
                        i = u.createShader(u.FRAGMENT_SHADER);
                    return u.shaderSource(r, ["precision " + e.getPrecision() + " float;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uvOffset + uv * uvScale;", "vec2 alignedPosition = position * scale;", "vec2 rotatedPosition;", "rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;", "rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;", "vec4 finalPosition;", "finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "finalPosition.xy += rotatedPosition;", "finalPosition = projectionMatrix * finalPosition;", "gl_Position = finalPosition;", "}"].join("\n")), u.shaderSource(i, ["precision " + e.getPrecision() + " float;", "uniform vec3 color;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "void main() {", "vec4 texture = texture2D( map, vUV );", "if ( texture.a < alphaTest ) discard;", "gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "const float LOG2 = 1.442695;", "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}"].join("\n")), u.compileShader(r), u.compileShader(i), u.attachShader(t, r), u.attachShader(t, i), u.linkProgram(t), t
                }

                function i(e, t) {
                    return e.z !== t.z ? t.z - e.z : t.id - e.id
                }
                var o, a, s, h, l, c, u = e.context,
                    d = new n.Vector3,
                    p = new n.Quaternion,
                    f = new n.Vector3,
                    m = function () {
                        var e = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]),
                            t = new Uint16Array([0, 1, 2, 0, 2, 3]);
                        o = u.createBuffer(), a = u.createBuffer(), u.bindBuffer(u.ARRAY_BUFFER, o), u.bufferData(u.ARRAY_BUFFER, e, u.STATIC_DRAW), u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, a), u.bufferData(u.ELEMENT_ARRAY_BUFFER, t, u.STATIC_DRAW), s = r(), h = {
                            position: u.getAttribLocation(s, "position"),
                            uv: u.getAttribLocation(s, "uv")
                        }, l = {
                            uvOffset: u.getUniformLocation(s, "uvOffset"),
                            uvScale: u.getUniformLocation(s, "uvScale"),
                            rotation: u.getUniformLocation(s, "rotation"),
                            scale: u.getUniformLocation(s, "scale"),
                            color: u.getUniformLocation(s, "color"),
                            map: u.getUniformLocation(s, "map"),
                            opacity: u.getUniformLocation(s, "opacity"),
                            modelViewMatrix: u.getUniformLocation(s, "modelViewMatrix"),
                            projectionMatrix: u.getUniformLocation(s, "projectionMatrix"),
                            fogType: u.getUniformLocation(s, "fogType"),
                            fogDensity: u.getUniformLocation(s, "fogDensity"),
                            fogNear: u.getUniformLocation(s, "fogNear"),
                            fogFar: u.getUniformLocation(s, "fogFar"),
                            fogColor: u.getUniformLocation(s, "fogColor"),
                            alphaTest: u.getUniformLocation(s, "alphaTest")
                        };
                        var i = document.createElement("canvas");
                        i.width = 8, i.height = 8;
                        var d = i.getContext("2d");
                        d.fillStyle = "white", d.fillRect(0, 0, 8, 8), c = new n.Texture(i), c.needsUpdate = !0
                    };
                this.render = function (r, g) {
                    if (0 !== t.length) {
                        void 0 === s && m(), u.useProgram(s), u.enableVertexAttribArray(h.position), u.enableVertexAttribArray(h.uv), u.disable(u.CULL_FACE), u.enable(u.BLEND), u.bindBuffer(u.ARRAY_BUFFER, o), u.vertexAttribPointer(h.position, 2, u.FLOAT, !1, 16, 0), u.vertexAttribPointer(h.uv, 2, u.FLOAT, !1, 16, 8), u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, a), u.uniformMatrix4fv(l.projectionMatrix, !1, g.projectionMatrix.elements), u.activeTexture(u.TEXTURE0), u.uniform1i(l.map, 0);
                        var v = 0,
                            y = 0,
                            x = r.fog;
                        x ? (u.uniform3f(l.fogColor, x.color.r, x.color.g, x.color.b), x instanceof n.Fog ? (u.uniform1f(l.fogNear, x.near), u.uniform1f(l.fogFar, x.far), u.uniform1i(l.fogType, 1), v = 1, y = 1) : x instanceof n.FogExp2 && (u.uniform1f(l.fogDensity, x.density), u.uniform1i(l.fogType, 2), v = 2, y = 2)) : (u.uniform1i(l.fogType, 0), v = 0, y = 0);
                        for (var _ = 0, b = t.length; b > _; _++) {
                            var w = t[_];
                            w._modelViewMatrix.multiplyMatrices(g.matrixWorldInverse, w.matrixWorld), w.z = -w._modelViewMatrix.elements[14]
                        }
                        t.sort(i);
                        for (var M = [], _ = 0, b = t.length; b > _; _++) {
                            var w = t[_],
                                S = w.material;

                            u.uniform1f(l.alphaTest, S.alphaTest), u.uniformMatrix4fv(l.modelViewMatrix, !1, w._modelViewMatrix.elements), w.matrixWorld.decompose(d, p, f), M[0] = f.x, M[1] = f.y;
                            var E = 0;
                            r.fog && S.fog && (E = y), v !== E && (u.uniform1i(l.fogType, E), v = E), null !== S.map ? (u.uniform2f(l.uvOffset, S.map.offset.x, S.map.offset.y), u.uniform2f(l.uvScale, S.map.repeat.x, S.map.repeat.y)) : (u.uniform2f(l.uvOffset, 0, 0), u.uniform2f(l.uvScale, 1, 1)), u.uniform1f(l.opacity, S.opacity), u.uniform3f(l.color, S.color.r, S.color.g, S.color.b), u.uniform1f(l.rotation, S.rotation), u.uniform2fv(l.scale, M), e.state.setBlending(S.blending, S.blendEquation, S.blendSrc, S.blendDst), e.state.setDepthTest(S.depthTest), e.state.setDepthWrite(S.depthWrite), S.map && S.map.image && S.map.image.width ? e.setTexture(S.map, 0) : e.setTexture(c, 0), u.drawElements(u.TRIANGLES, 6, u.UNSIGNED_SHORT, 0)
                        }
                        u.enable(u.CULL_FACE), e.resetGLState()
                    }
                }
            }, n.GeometryUtils = {
                merge: function (e, t, r) {
                    n.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
                    var i;
                    t instanceof n.Mesh && (t.matrixAutoUpdate && t.updateMatrix(), i = t.matrix, t = t.geometry), e.merge(t, i, r)
                },
                center: function (e) {
                    return n.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."), e.center()
                }
            }, n.ImageUtils = {
                crossOrigin: void 0,
                loadTexture: function (e, t, r, i) {
                    var o = new n.ImageLoader;
                    o.crossOrigin = this.crossOrigin;
                    var a = new n.Texture(void 0, t);
                    return o.load(e, function (e) {
                        a.image = e, a.needsUpdate = !0, r && r(a)
                    }, void 0, function (e) {
                        i && i(e)
                    }), a.sourceFile = e, a
                },
                loadTextureCube: function (e, t, r, i) {
                    var o = [],
                        a = new n.ImageLoader;
                    a.crossOrigin = this.crossOrigin;
                    var s = new n.CubeTexture(o, t);
                    s.flipY = !1;
                    for (var h = 0, l = function (t) {
                            a.load(e[t], function (e) {
                                s.images[t] = e, h += 1, 6 === h && (s.needsUpdate = !0, r && r(s))
                            }, void 0, i)
                        }, c = 0, u = e.length; u > c; ++c) l(c);
                    return s
                },
                loadCompressedTexture: function () {
                    n.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
                },
                loadCompressedTextureCube: function () {
                    n.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
                },
                getNormalMap: function (e, t) {
                    var r = function (e, t) {
                            return [e[1] * t[2] - e[2] * t[1], e[2] * t[0] - e[0] * t[2], e[0] * t[1] - e[1] * t[0]]
                        },
                        i = function (e, t) {
                            return [e[0] - t[0], e[1] - t[1], e[2] - t[2]]
                        },
                        n = function (e) {
                            var t = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
                            return [e[0] / t, e[1] / t, e[2] / t]
                        };
                    t = 1 | t;
                    var o = e.width,
                        a = e.height,
                        s = document.createElement("canvas");
                    s.width = o, s.height = a;
                    var h = s.getContext("2d");
                    h.drawImage(e, 0, 0);
                    for (var l = h.getImageData(0, 0, o, a).data, c = h.createImageData(o, a), u = c.data, d = 0; o > d; d++)
                        for (var p = 0; a > p; p++) {
                            var f = 0 > p - 1 ? 0 : p - 1,
                                m = p + 1 > a - 1 ? a - 1 : p + 1,
                                g = 0 > d - 1 ? 0 : d - 1,
                                v = d + 1 > o - 1 ? o - 1 : d + 1,
                                y = [],
                                x = [0, 0, l[4 * (p * o + d)] / 255 * t];
                            y.push([-1, 0, l[4 * (p * o + g)] / 255 * t]), y.push([-1, -1, l[4 * (f * o + g)] / 255 * t]), y.push([0, -1, l[4 * (f * o + d)] / 255 * t]), y.push([1, -1, l[4 * (f * o + v)] / 255 * t]), y.push([1, 0, l[4 * (p * o + v)] / 255 * t]), y.push([1, 1, l[4 * (m * o + v)] / 255 * t]), y.push([0, 1, l[4 * (m * o + d)] / 255 * t]), y.push([-1, 1, l[4 * (m * o + g)] / 255 * t]);
                            for (var _ = [], b = y.length, w = 0; b > w; w++) {
                                var M = y[w],
                                    S = y[(w + 1) % b];
                                M = i(M, x), S = i(S, x), _.push(n(r(M, S)))
                            }
                            for (var E = [0, 0, 0], w = 0; w < _.length; w++) E[0] += _[w][0], E[1] += _[w][1], E[2] += _[w][2];
                            E[0] /= _.length, E[1] /= _.length, E[2] /= _.length;
                            var T = 4 * (p * o + d);
                            u[T] = (E[0] + 1) / 2 * 255 | 0, u[T + 1] = (E[1] + 1) / 2 * 255 | 0, u[T + 2] = 255 * E[2] | 0, u[T + 3] = 255
                        }
                    return h.putImageData(c, 0, 0), s
                },
                generateDataTexture: function (e, t, r) {
                    for (var i = e * t, o = new Uint8Array(3 * i), a = Math.floor(255 * r.r), s = Math.floor(255 * r.g), h = Math.floor(255 * r.b), l = 0; i > l; l++) o[3 * l] = a, o[3 * l + 1] = s, o[3 * l + 2] = h;
                    var c = new n.DataTexture(o, e, t, n.RGBFormat);
                    return c.needsUpdate = !0, c
                }
            }, n.SceneUtils = {
                createMultiMaterialObject: function (e, t) {
                    for (var r = new n.Object3D, i = 0, o = t.length; o > i; i++) r.add(new n.Mesh(e, t[i]));
                    return r
                },
                detach: function (e, t, r) {
                    e.applyMatrix(t.matrixWorld), t.remove(e), r.add(e)
                },
                attach: function (e, t, r) {
                    var i = new n.Matrix4;
                    i.getInverse(r.matrixWorld), e.applyMatrix(i), t.remove(e), r.add(e)
                }
            }, n.FontUtils = {
                faces: {},
                face: "helvetiker",
                weight: "normal",
                style: "normal",
                size: 150,
                divisions: 10,
                getFace: function () {
                    try {
                        return this.faces[this.face][this.weight][this.style]
                    } catch (e) {
                        throw "The font " + this.face + " with " + this.weight + " weight and " + this.style + " style is missing."
                    }
                },
                loadFace: function (e) {
                    var t = e.familyName.toLowerCase(),
                        r = this;
                    return r.faces[t] = r.faces[t] || {}, r.faces[t][e.cssFontWeight] = r.faces[t][e.cssFontWeight] || {}, r.faces[t][e.cssFontWeight][e.cssFontStyle] = e, r.faces[t][e.cssFontWeight][e.cssFontStyle] = e, e
                },
                drawText: function (e) {
                    var t, r = this.getFace(),
                        i = this.size / r.resolution,
                        o = 0,
                        a = String(e).split(""),
                        s = a.length,
                        h = [];
                    for (t = 0; s > t; t++) {
                        var l = new n.Path,
                            c = this.extractGlyphPoints(a[t], r, i, o, l);
                        o += c.offset, h.push(c.path)
                    }
                    var u = o / 2;
                    return {
                        paths: h,
                        offset: u
                    }
                },
                extractGlyphPoints: function (e, t, r, i, o) {
                    var a, s, h, l, c, u, d, p, f, m, g, v, y, x, _, b, w, M, S, E = [],
                        T = t.glyphs[e] || t.glyphs["?"];
                    if (T) {
                        if (T.o)
                            for (l = T._cachedOutline || (T._cachedOutline = T.o.split(" ")), u = l.length, d = r, p = r, a = 0; u > a;) switch (c = l[a++]) {
                                case "m":
                                    f = l[a++] * d + i, m = l[a++] * p, o.moveTo(f, m);
                                    break;
                                case "l":
                                    f = l[a++] * d + i, m = l[a++] * p, o.lineTo(f, m);
                                    break;
                                case "q":
                                    if (g = l[a++] * d + i, v = l[a++] * p, _ = l[a++] * d + i, b = l[a++] * p, o.quadraticCurveTo(_, b, g, v), S = E[E.length - 1])
                                        for (y = S.x, x = S.y, s = 1, h = this.divisions; h >= s; s++) {
                                            var A = s / h;
                                            n.Shape.Utils.b2(A, y, _, g), n.Shape.Utils.b2(A, x, b, v)
                                        }
                                    break;
                                case "b":
                                    if (g = l[a++] * d + i, v = l[a++] * p, _ = l[a++] * d + i, b = l[a++] * p, w = l[a++] * d + i, M = l[a++] * p, o.bezierCurveTo(_, b, w, M, g, v), S = E[E.length - 1])
                                        for (y = S.x, x = S.y, s = 1, h = this.divisions; h >= s; s++) {
                                            var A = s / h;
                                            n.Shape.Utils.b3(A, y, _, w, g), n.Shape.Utils.b3(A, x, b, M, v)
                                        }
                            }
                        return {
                            offset: T.ha * r,
                            path: o
                        }
                    }
                }
            }, n.FontUtils.generateShapes = function (e, t) {
                t = t || {};
                var r = void 0 !== t.size ? t.size : 100,
                    i = void 0 !== t.curveSegments ? t.curveSegments : 4,
                    o = void 0 !== t.font ? t.font : "helvetiker",
                    a = void 0 !== t.weight ? t.weight : "normal",
                    s = void 0 !== t.style ? t.style : "normal";
                n.FontUtils.size = r, n.FontUtils.divisions = i, n.FontUtils.face = o, n.FontUtils.weight = a, n.FontUtils.style = s;
                for (var h = n.FontUtils.drawText(e), l = h.paths, c = [], u = 0, d = l.length; d > u; u++) Array.prototype.push.apply(c, l[u].toShapes());
                return c
            },
            function (e) {
                var t = 1e-10,
                    r = function (e, t) {
                        var r = e.length;
                        if (3 > r) return null;
                        var a, s, h, l = [],
                            c = [],
                            u = [];
                        if (i(e) > 0)
                            for (s = 0; r > s; s++) c[s] = s;
                        else
                            for (s = 0; r > s; s++) c[s] = r - 1 - s;
                        var d = r,
                            p = 2 * d;
                        for (s = d - 1; d > 2;) {
                            if (p-- <= 0) return n.warn("THREE.FontUtils: Warning, unable to triangulate polygon! in Triangulate.process()"), t ? u : l;
                            if (a = s, a >= d && (a = 0), s = a + 1, s >= d && (s = 0), h = s + 1, h >= d && (h = 0), o(e, a, s, h, d, c)) {
                                var f, m, g, v, y;
                                for (f = c[a], m = c[s], g = c[h], l.push([e[f], e[m], e[g]]), u.push([c[a], c[s], c[h]]), v = s, y = s + 1; d > y; v++, y++) c[v] = c[y];
                                d--, p = 2 * d
                            }
                        }
                        return t ? u : l
                    },
                    i = function (e) {
                        for (var t = e.length, r = 0, i = t - 1, n = 0; t > n; i = n++) r += e[i].x * e[n].y - e[n].x * e[i].y;
                        return .5 * r
                    },
                    o = function (e, r, i, n, o, a) {
                        var s, h, l, c, u, d, p, f, m;
                        if (h = e[a[r]].x, l = e[a[r]].y, c = e[a[i]].x, u = e[a[i]].y, d = e[a[n]].x, p = e[a[n]].y, t > (c - h) * (p - l) - (u - l) * (d - h)) return !1;
                        var g, v, y, x, _, b, w, M, S, E, T, A, C, L, R;
                        for (g = d - c, v = p - u, y = h - d, x = l - p, _ = c - h, b = u - l, s = 0; o > s; s++)
                            if (f = e[a[s]].x, m = e[a[s]].y, !(f === h && m === l || f === c && m === u || f === d && m === p) && (w = f - h, M = m - l, S = f - c, E = m - u, T = f - d, A = m - p, R = g * E - v * S, C = _ * M - b * w, L = y * A - x * T, R >= -t && L >= -t && C >= -t)) return !1;
                        return !0
                    };
                return e.Triangulate = r, e.Triangulate.area = i, e
            }(n.FontUtils), i._typeface_js = {
                faces: n.FontUtils.faces,
                loadFace: n.FontUtils.loadFace
            }, n.typeface_js = i._typeface_js, n.Audio = function (e) {
                n.Object3D.call(this), this.type = "Audio", this.context = e.context, this.source = this.context.createBufferSource(), this.source.onended = this.onEnded.bind(this), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.panner = this.context.createPanner(), this.panner.connect(this.gain), this.autoplay = !1, this.startTime = 0, this.isPlaying = !1
            }, n.Audio.prototype = Object.create(n.Object3D.prototype), n.Audio.prototype.constructor = n.Audio, n.Audio.prototype.load = function (e) {
                var t = this,
                    r = new XMLHttpRequest;
                return r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function () {
                    t.context.decodeAudioData(this.response, function (e) {
                        t.source.buffer = e, t.autoplay && t.play()
                    })
                }, r.send(), this
            }, n.Audio.prototype.play = function () {
                if (this.isPlaying === !0) return void n.warn("THREE.Audio: Audio is already playing.");
                var e = this.context.createBufferSource();
                e.buffer = this.source.buffer, e.loop = this.source.loop, e.onended = this.source.onended, e.connect(this.panner), e.start(0, this.startTime), this.isPlaying = !0, this.source = e
            }, n.Audio.prototype.pause = function () {
                this.source.stop(), this.startTime = this.context.currentTime
            }, n.Audio.prototype.stop = function () {
                this.source.stop(), this.startTime = 0
            }, n.Audio.prototype.onEnded = function () {
                this.isPlaying = !1
            }, n.Audio.prototype.setLoop = function (e) {
                this.source.loop = e
            }, n.Audio.prototype.setRefDistance = function (e) {
                this.panner.refDistance = e
            }, n.Audio.prototype.setRolloffFactor = function (e) {
                this.panner.rolloffFactor = e
            }, n.Audio.prototype.setVolume = function (e) {
                this.gain.gain.value = e
            }, n.Audio.prototype.updateMatrixWorld = function () {
                var e = new n.Vector3;
                return function (t) {
                    n.Object3D.prototype.updateMatrixWorld.call(this, t), e.setFromMatrixPosition(this.matrixWorld), this.panner.setPosition(e.x, e.y, e.z)
                }
            }(), n.AudioListener = function () {
                n.Object3D.call(this), this.type = "AudioListener", this.context = new(window.AudioContext || window.webkitAudioContext)
            }, n.AudioListener.prototype = Object.create(n.Object3D.prototype), n.AudioListener.prototype.constructor = n.AudioListener, n.AudioListener.prototype.updateMatrixWorld = function () {
                var e = new n.Vector3,
                    t = new n.Quaternion,
                    r = new n.Vector3,
                    i = new n.Vector3,
                    o = new n.Vector3,
                    a = new n.Vector3;
                return function (s) {
                    n.Object3D.prototype.updateMatrixWorld.call(this, s);
                    var h = this.context.listener,
                        l = this.up;
                    this.matrixWorld.decompose(e, t, r), i.set(0, 0, -1).applyQuaternion(t), o.subVectors(e, a), h.setPosition(e.x, e.y, e.z), h.setOrientation(i.x, i.y, i.z, l.x, l.y, l.z), h.setVelocity(o.x, o.y, o.z), a.copy(e)
                }
            }(), n.Curve = function () {}, n.Curve.prototype.getPoint = function () {
                return n.warn("THREE.Curve: Warning, getPoint() not implemented!"), null
            }, n.Curve.prototype.getPointAt = function (e) {
                var t = this.getUtoTmapping(e);
                return this.getPoint(t)
            }, n.Curve.prototype.getPoints = function (e) {
                e || (e = 5);
                var t, r = [];
                for (t = 0; e >= t; t++) r.push(this.getPoint(t / e));
                return r
            }, n.Curve.prototype.getSpacedPoints = function (e) {
                e || (e = 5);
                var t, r = [];
                for (t = 0; e >= t; t++) r.push(this.getPointAt(t / e));
                return r
            }, n.Curve.prototype.getLength = function () {
                var e = this.getLengths();
                return e[e.length - 1]
            }, n.Curve.prototype.getLengths = function (e) {
                if (e || (e = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length == e + 1 && !this.needsUpdate) return this.cacheArcLengths;
                this.needsUpdate = !1;
                var t, r, i = [],
                    n = this.getPoint(0),
                    o = 0;
                for (i.push(0), r = 1; e >= r; r++) t = this.getPoint(r / e), o += t.distanceTo(n), i.push(o), n = t;
                return this.cacheArcLengths = i, i
            }, n.Curve.prototype.updateArcLengths = function () {
                this.needsUpdate = !0, this.getLengths()
            }, n.Curve.prototype.getUtoTmapping = function (e, t) {
                var r, i = this.getLengths(),
                    n = 0,
                    o = i.length;
                r = t ? t : e * i[o - 1];
                for (var a, s = 0, h = o - 1; h >= s;)
                    if (n = Math.floor(s + (h - s) / 2), a = i[n] - r, 0 > a) s = n + 1;
                    else {
                        if (!(a > 0)) {
                            h = n;
                            break
                        }
                        h = n - 1
                    } if (n = h, i[n] == r) {
                    var l = n / (o - 1);
                    return l
                }
                var c = i[n],
                    u = i[n + 1],
                    d = u - c,
                    p = (r - c) / d,
                    l = (n + p) / (o - 1);
                return l
            }, n.Curve.prototype.getTangent = function (e) {
                var t = 1e-4,
                    r = e - t,
                    i = e + t;
                0 > r && (r = 0), i > 1 && (i = 1);
                var n = this.getPoint(r),
                    o = this.getPoint(i),
                    a = o.clone().sub(n);
                return a.normalize()
            }, n.Curve.prototype.getTangentAt = function (e) {
                var t = this.getUtoTmapping(e);
                return this.getTangent(t)
            }, n.Curve.Utils = {
                tangentQuadraticBezier: function (e, t, r, i) {
                    return 2 * (1 - e) * (r - t) + 2 * e * (i - r)
                },
                tangentCubicBezier: function (e, t, r, i, n) {
                    return -3 * t * (1 - e) * (1 - e) + 3 * r * (1 - e) * (1 - e) - 6 * e * r * (1 - e) + 6 * e * i * (1 - e) - 3 * e * e * i + 3 * e * e * n
                },
                tangentSpline: function (e) {
                    var t = 6 * e * e - 6 * e,
                        r = 3 * e * e - 4 * e + 1,
                        i = -6 * e * e + 6 * e,
                        n = 3 * e * e - 2 * e;
                    return t + r + i + n
                },
                interpolate: function (e, t, r, i, n) {
                    var o = .5 * (r - e),
                        a = .5 * (i - t),
                        s = n * n,
                        h = n * s;
                    return (2 * t - 2 * r + o + a) * h + (-3 * t + 3 * r - 2 * o - a) * s + o * n + t
                }
            }, n.Curve.create = function (e, t) {
                return e.prototype = Object.create(n.Curve.prototype), e.prototype.constructor = e, e.prototype.getPoint = t, e
            }, n.CurvePath = function () {
                this.curves = [], this.bends = [], this.autoClose = !1
            }, n.CurvePath.prototype = Object.create(n.Curve.prototype), n.CurvePath.prototype.constructor = n.CurvePath, n.CurvePath.prototype.add = function (e) {
                this.curves.push(e)
            }, n.CurvePath.prototype.checkConnection = function () {}, n.CurvePath.prototype.closePath = function () {
                var e = this.curves[0].getPoint(0),
                    t = this.curves[this.curves.length - 1].getPoint(1);
                e.equals(t) || this.curves.push(new n.LineCurve(t, e))
            }, n.CurvePath.prototype.getPoint = function (e) {
                for (var t, r, i = e * this.getLength(), n = this.getCurveLengths(), o = 0; o < n.length;) {
                    if (n[o] >= i) {
                        t = n[o] - i, r = this.curves[o];
                        var a = 1 - t / r.getLength();
                        return r.getPointAt(a)
                    }
                    o++
                }
                return null
            }, n.CurvePath.prototype.getLength = function () {
                var e = this.getCurveLengths();
                return e[e.length - 1]
            }, n.CurvePath.prototype.getCurveLengths = function () {
                if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
                var e, t = [],
                    r = 0,
                    i = this.curves.length;
                for (e = 0; i > e; e++) r += this.curves[e].getLength(), t.push(r);
                return this.cacheLengths = t, t
            }, n.CurvePath.prototype.getBoundingBox = function () {
                var e, t, r, i, o, a, s = this.getPoints();
                e = t = Number.NEGATIVE_INFINITY, i = o = Number.POSITIVE_INFINITY;
                var h, l, c, u, d = s[0] instanceof n.Vector3;
                for (u = d ? new n.Vector3 : new n.Vector2, l = 0, c = s.length; c > l; l++) h = s[l], h.x > e ? e = h.x : h.x < i && (i = h.x), h.y > t ? t = h.y : h.y < o && (o = h.y), d && (h.z > r ? r = h.z : h.z < a && (a = h.z)), u.add(h);
                var p = {
                    minX: i,
                    minY: o,
                    maxX: e,
                    maxY: t
                };
                return d && (p.maxZ = r, p.minZ = a), p
            }, n.CurvePath.prototype.createPointsGeometry = function (e) {
                var t = this.getPoints(e, !0);
                return this.createGeometry(t)
            }, n.CurvePath.prototype.createSpacedPointsGeometry = function (e) {
                var t = this.getSpacedPoints(e, !0);
                return this.createGeometry(t)
            }, n.CurvePath.prototype.createGeometry = function (e) {
                for (var t = new n.Geometry, r = 0; r < e.length; r++) t.vertices.push(new n.Vector3(e[r].x, e[r].y, e[r].z || 0));
                return t
            }, n.CurvePath.prototype.addWrapPath = function (e) {
                this.bends.push(e)
            }, n.CurvePath.prototype.getTransformedPoints = function (e, t) {
                var r, i, n = this.getPoints(e);
                for (t || (t = this.bends), r = 0, i = t.length; i > r; r++) n = this.getWrapPoints(n, t[r]);
                return n
            }, n.CurvePath.prototype.getTransformedSpacedPoints = function (e, t) {
                var r, i, n = this.getSpacedPoints(e);
                for (t || (t = this.bends), r = 0, i = t.length; i > r; r++) n = this.getWrapPoints(n, t[r]);
                return n
            }, n.CurvePath.prototype.getWrapPoints = function (e, t) {
                var r, i, n, o, a, s, h = this.getBoundingBox();
                for (r = 0, i = e.length; i > r; r++) {
                    n = e[r], o = n.x, a = n.y, s = o / h.maxX, s = t.getUtoTmapping(s, o);
                    var l = t.getPoint(s),
                        c = t.getTangent(s);
                    c.set(-c.y, c.x).multiplyScalar(a), n.x = l.x + c.x, n.y = l.y + c.y
                }
                return e
            }, n.Gyroscope = function () {
                n.Object3D.call(this)
            }, n.Gyroscope.prototype = Object.create(n.Object3D.prototype), n.Gyroscope.prototype.constructor = n.Gyroscope, n.Gyroscope.prototype.updateMatrixWorld = function () {
                var e = new n.Vector3,
                    t = new n.Quaternion,
                    r = new n.Vector3,
                    i = new n.Vector3,
                    o = new n.Quaternion,
                    a = new n.Vector3;
                return function (n) {
                    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(i, o, a), this.matrix.decompose(e, t, r), this.matrixWorld.compose(i, t, a)) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, n = !0);
                    for (var s = 0, h = this.children.length; h > s; s++) this.children[s].updateMatrixWorld(n)
                }
            }(), n.Path = function (e) {
                n.CurvePath.call(this), this.actions = [], e && this.fromPoints(e)
            }, n.Path.prototype = Object.create(n.CurvePath.prototype), n.Path.prototype.constructor = n.Path, n.PathActions = {
                MOVE_TO: "moveTo",
                LINE_TO: "lineTo",
                QUADRATIC_CURVE_TO: "quadraticCurveTo",
                BEZIER_CURVE_TO: "bezierCurveTo",
                CSPLINE_THRU: "splineThru",
                ARC: "arc",
                ELLIPSE: "ellipse"
            }, n.Path.prototype.fromPoints = function (e) {
                this.moveTo(e[0].x, e[0].y);
                for (var t = 1, r = e.length; r > t; t++) this.lineTo(e[t].x, e[t].y)
            }, n.Path.prototype.moveTo = function () {
                var e = Array.prototype.slice.call(arguments);
                this.actions.push({
                    action: n.PathActions.MOVE_TO,
                    args: e
                })
            }, n.Path.prototype.lineTo = function (e, t) {
                var r = Array.prototype.slice.call(arguments),
                    i = this.actions[this.actions.length - 1].args,
                    o = i[i.length - 2],
                    a = i[i.length - 1],
                    s = new n.LineCurve(new n.Vector2(o, a), new n.Vector2(e, t));
                this.curves.push(s), this.actions.push({
                    action: n.PathActions.LINE_TO,
                    args: r
                })
            }, n.Path.prototype.quadraticCurveTo = function (e, t, r, i) {
                var o = Array.prototype.slice.call(arguments),
                    a = this.actions[this.actions.length - 1].args,
                    s = a[a.length - 2],
                    h = a[a.length - 1],
                    l = new n.QuadraticBezierCurve(new n.Vector2(s, h), new n.Vector2(e, t), new n.Vector2(r, i));
                this.curves.push(l), this.actions.push({
                    action: n.PathActions.QUADRATIC_CURVE_TO,
                    args: o
                })
            }, n.Path.prototype.bezierCurveTo = function (e, t, r, i, o, a) {
                var s = Array.prototype.slice.call(arguments),
                    h = this.actions[this.actions.length - 1].args,
                    l = h[h.length - 2],
                    c = h[h.length - 1],
                    u = new n.CubicBezierCurve(new n.Vector2(l, c), new n.Vector2(e, t), new n.Vector2(r, i), new n.Vector2(o, a));
                this.curves.push(u), this.actions.push({
                    action: n.PathActions.BEZIER_CURVE_TO,
                    args: s
                })
            }, n.Path.prototype.splineThru = function (e) {
                var t = Array.prototype.slice.call(arguments),
                    r = this.actions[this.actions.length - 1].args,
                    i = r[r.length - 2],
                    o = r[r.length - 1],
                    a = [new n.Vector2(i, o)];
                Array.prototype.push.apply(a, e);
                var s = new n.SplineCurve(a);
                this.curves.push(s), this.actions.push({
                    action: n.PathActions.CSPLINE_THRU,
                    args: t
                })
            }, n.Path.prototype.arc = function (e, t, r, i, n, o) {
                var a = this.actions[this.actions.length - 1].args,
                    s = a[a.length - 2],
                    h = a[a.length - 1];
                this.absarc(e + s, t + h, r, i, n, o)
            }, n.Path.prototype.absarc = function (e, t, r, i, n, o) {
                this.absellipse(e, t, r, r, i, n, o)
            }, n.Path.prototype.ellipse = function (e, t, r, i, n, o, a) {
                var s = this.actions[this.actions.length - 1].args,
                    h = s[s.length - 2],
                    l = s[s.length - 1];
                this.absellipse(e + h, t + l, r, i, n, o, a)
            }, n.Path.prototype.absellipse = function (e, t, r, i, o, a, s) {
                var h = Array.prototype.slice.call(arguments),
                    l = new n.EllipseCurve(e, t, r, i, o, a, s);
                this.curves.push(l);
                var c = l.getPoint(1);
                h.push(c.x), h.push(c.y), this.actions.push({
                    action: n.PathActions.ELLIPSE,
                    args: h
                })
            }, n.Path.prototype.getSpacedPoints = function (e) {
                e || (e = 40);
                for (var t = [], r = 0; e > r; r++) t.push(this.getPoint(r / e));
                return t
            }, n.Path.prototype.getPoints = function (e, t) {
                if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(e, t);
                e = e || 12;
                var r, i, o, a, s, h, l, c, u, d, p, f, m, g, v, y, x, _, b = [];
                for (r = 0, i = this.actions.length; i > r; r++) switch (o = this.actions[r], a = o.action, s = o.args, a) {
                    case n.PathActions.MOVE_TO:
                        b.push(new n.Vector2(s[0], s[1]));
                        break;
                    case n.PathActions.LINE_TO:
                        b.push(new n.Vector2(s[0], s[1]));
                        break;
                    case n.PathActions.QUADRATIC_CURVE_TO:
                        for (h = s[2], l = s[3], d = s[0], p = s[1], b.length > 0 ? (g = b[b.length - 1], f = g.x, m = g.y) : (g = this.actions[r - 1].args, f = g[g.length - 2], m = g[g.length - 1]), v = 1; e >= v; v++) y = v / e, x = n.Shape.Utils.b2(y, f, d, h), _ = n.Shape.Utils.b2(y, m, p, l), b.push(new n.Vector2(x, _));
                        break;
                    case n.PathActions.BEZIER_CURVE_TO:
                        for (h = s[4], l = s[5], d = s[0], p = s[1], c = s[2], u = s[3], b.length > 0 ? (g = b[b.length - 1], f = g.x, m = g.y) : (g = this.actions[r - 1].args, f = g[g.length - 2], m = g[g.length - 1]), v = 1; e >= v; v++) y = v / e, x = n.Shape.Utils.b3(y, f, d, c, h), _ = n.Shape.Utils.b3(y, m, p, u, l), b.push(new n.Vector2(x, _));
                        break;
                    case n.PathActions.CSPLINE_THRU:
                        g = this.actions[r - 1].args;
                        var w = new n.Vector2(g[g.length - 2], g[g.length - 1]),
                            M = [w],
                            S = e * s[0].length;
                        M = M.concat(s[0]);
                        var E = new n.SplineCurve(M);
                        for (v = 1; S >= v; v++) b.push(E.getPointAt(v / S));
                        break;
                    case n.PathActions.ARC:
                        var T, A = s[0],
                            C = s[1],
                            L = s[2],
                            R = s[3],
                            P = s[4],
                            F = !!s[5],
                            B = P - R,
                            D = 2 * e;
                        for (v = 1; D >= v; v++) y = v / D, F || (y = 1 - y), T = R + y * B, x = A + L * Math.cos(T), _ = C + L * Math.sin(T), b.push(new n.Vector2(x, _));
                        break;
                    case n.PathActions.ELLIPSE:
                        var T, A = s[0],
                            C = s[1],
                            U = s[2],
                            k = s[3],
                            R = s[4],
                            P = s[5],
                            F = !!s[6],
                            B = P - R,
                            D = 2 * e;
                        for (v = 1; D >= v; v++) y = v / D, F || (y = 1 - y), T = R + y * B, x = A + U * Math.cos(T), _ = C + k * Math.sin(T), b.push(new n.Vector2(x, _))
                }
                var V = b[b.length - 1],
                    O = 1e-10;
                return Math.abs(V.x - b[0].x) < O && Math.abs(V.y - b[0].y) < O && b.splice(b.length - 1, 1), t && b.push(b[0]), b
            }, n.Path.prototype.toShapes = function (e, t) {
                function r(e) {
                    var t, r, i, o, a, s = [],
                        h = new n.Path;
                    for (t = 0, r = e.length; r > t; t++) i = e[t], a = i.args, o = i.action, o == n.PathActions.MOVE_TO && 0 != h.actions.length && (s.push(h), h = new n.Path), h[o].apply(h, a);
                    return 0 != h.actions.length && s.push(h), s
                }

                function i(e) {
                    for (var t = [], r = 0, i = e.length; i > r; r++) {
                        var o = e[r],
                            a = new n.Shape;
                        a.actions = o.actions, a.curves = o.curves, t.push(a)
                    }
                    return t
                }

                function o(e, t) {
                    for (var r = 1e-10, i = t.length, n = !1, o = i - 1, a = 0; i > a; o = a++) {
                        var s = t[o],
                            h = t[a],
                            l = h.x - s.x,
                            c = h.y - s.y;
                        if (Math.abs(c) > r) {
                            if (0 > c && (s = t[a], l = -l, h = t[o], c = -c), e.y < s.y || e.y > h.y) continue;
                            if (e.y == s.y) {
                                if (e.x == s.x) return !0
                            } else {
                                var u = c * (e.x - s.x) - l * (e.y - s.y);
                                if (0 == u) return !0;
                                if (0 > u) continue;
                                n = !n
                            }
                        } else {
                            if (e.y != s.y) continue;
                            if (h.x <= e.x && e.x <= s.x || s.x <= e.x && e.x <= h.x) return !0
                        }
                    }
                    return n
                }
                var a = r(this.actions);
                if (0 == a.length) return [];
                if (t === !0) return i(a);
                var s, h, l, c = [];
                if (1 == a.length) return h = a[0], l = new n.Shape, l.actions = h.actions, l.curves = h.curves, c.push(l), c;
                var u = !n.Shape.Utils.isClockWise(a[0].getPoints());
                u = e ? !u : u;
                var d, p = [],
                    f = [],
                    m = [],
                    g = 0;
                f[g] = void 0, m[g] = [];
                var v, y;
                for (v = 0, y = a.length; y > v; v++) h = a[v], d = h.getPoints(), s = n.Shape.Utils.isClockWise(d), s = e ? !s : s, s ? (!u && f[g] && g++, f[g] = {
                    s: new n.Shape,
                    p: d
                }, f[g].s.actions = h.actions, f[g].s.curves = h.curves, u && g++, m[g] = []) : m[g].push({
                    h: h,
                    p: d[0]
                });
                if (!f[0]) return i(a);
                if (f.length > 1) {
                    for (var x = !1, _ = [], b = 0, w = f.length; w > b; b++) p[b] = [];
                    for (var b = 0, w = f.length; w > b; b++)
                        for (var M = m[b], S = 0; S < M.length; S++) {
                            for (var E = M[S], T = !0, A = 0; A < f.length; A++) o(E.p, f[A].p) && (b != A && _.push({
                                froms: b,
                                tos: A,
                                hole: S
                            }), T ? (T = !1, p[A].push(E)) : x = !0);
                            T && p[b].push(E)
                        }
                    _.length > 0 && (x || (m = p))
                }
                var C, L, R;
                for (v = 0, y = f.length; y > v; v++)
                    for (l = f[v].s, c.push(l), C = m[v], L = 0, R = C.length; R > L; L++) l.holes.push(C[L].h);
                return c
            }, n.Shape = function () {
                n.Path.apply(this, arguments), this.holes = []
            }, n.Shape.prototype = Object.create(n.Path.prototype), n.Shape.prototype.constructor = n.Shape, n.Shape.prototype.extrude = function (e) {
                var t = new n.ExtrudeGeometry(this, e);
                return t
            }, n.Shape.prototype.makeGeometry = function (e) {
                var t = new n.ShapeGeometry(this, e);
                return t
            }, n.Shape.prototype.getPointsHoles = function (e) {
                var t, r = this.holes.length,
                    i = [];
                for (t = 0; r > t; t++) i[t] = this.holes[t].getTransformedPoints(e, this.bends);
                return i
            }, n.Shape.prototype.getSpacedPointsHoles = function (e) {
                var t, r = this.holes.length,
                    i = [];
                for (t = 0; r > t; t++) i[t] = this.holes[t].getTransformedSpacedPoints(e, this.bends);
                return i
            }, n.Shape.prototype.extractAllPoints = function (e) {
                return {
                    shape: this.getTransformedPoints(e),
                    holes: this.getPointsHoles(e)
                }
            }, n.Shape.prototype.extractPoints = function (e) {
                return this.useSpacedPoints ? this.extractAllSpacedPoints(e) : this.extractAllPoints(e)
            }, n.Shape.prototype.extractAllSpacedPoints = function (e) {
                return {
                    shape: this.getTransformedSpacedPoints(e),
                    holes: this.getSpacedPointsHoles(e)
                }
            }, n.Shape.Utils = {
                triangulateShape: function (e, t) {
                    function r(e, t, r) {
                        return e.x != t.x ? e.x < t.x ? e.x <= r.x && r.x <= t.x : t.x <= r.x && r.x <= e.x : e.y < t.y ? e.y <= r.y && r.y <= t.y : t.y <= r.y && r.y <= e.y
                    }

                    function i(e, t, i, n, o) {
                        var a = 1e-10,
                            s = t.x - e.x,
                            h = t.y - e.y,
                            l = n.x - i.x,
                            c = n.y - i.y,
                            u = e.x - i.x,
                            d = e.y - i.y,
                            p = h * l - s * c,
                            f = h * u - s * d;
                        if (Math.abs(p) > a) {
                            var m;
                            if (p > 0) {
                                if (0 > f || f > p) return [];
                                if (m = c * u - l * d, 0 > m || m > p) return []
                            } else {
                                if (f > 0 || p > f) return [];
                                if (m = c * u - l * d, m > 0 || p > m) return []
                            }
                            if (0 == m) return !o || 0 != f && f != p ? [e] : [];
                            if (m == p) return !o || 0 != f && f != p ? [t] : [];
                            if (0 == f) return [i];
                            if (f == p) return [n];
                            var g = m / p;
                            return [{
                                x: e.x + g * s,
                                y: e.y + g * h
                            }]
                        }
                        if (0 != f || c * u != l * d) return [];
                        var v = 0 == s && 0 == h,
                            y = 0 == l && 0 == c;
                        if (v && y) return e.x != i.x || e.y != i.y ? [] : [e];
                        if (v) return r(i, n, e) ? [e] : [];
                        if (y) return r(e, t, i) ? [i] : [];
                        var x, _, b, w, M, S, E, T;
                        return 0 != s ? (e.x < t.x ? (x = e, b = e.x, _ = t, w = t.x) : (x = t, b = t.x, _ = e, w = e.x), i.x < n.x ? (M = i, E = i.x, S = n, T = n.x) : (M = n, E = n.x, S = i, T = i.x)) : (e.y < t.y ? (x = e, b = e.y, _ = t, w = t.y) : (x = t, b = t.y, _ = e, w = e.y), i.y < n.y ? (M = i, E = i.y, S = n, T = n.y) : (M = n, E = n.y, S = i, T = i.y)), E >= b ? E > w ? [] : w == E ? o ? [] : [M] : T >= w ? [M, _] : [M, S] : b > T ? [] : b == T ? o ? [] : [x] : T >= w ? [x, _] : [x, S]
                    }

                    function o(e, t, r, i) {
                        var n = 1e-10,
                            o = t.x - e.x,
                            a = t.y - e.y,
                            s = r.x - e.x,
                            h = r.y - e.y,
                            l = i.x - e.x,
                            c = i.y - e.y,
                            u = o * h - a * s,
                            d = o * c - a * l;
                        if (Math.abs(u) > n) {
                            var p = l * h - c * s;
                            return u > 0 ? d >= 0 && p >= 0 : d >= 0 || p >= 0
                        }
                        return d > 0
                    }

                    function a(e, t) {
                        function r(e, t) {
                            var r = y.length - 1,
                                i = e - 1;
                            0 > i && (i = r);
                            var n = e + 1;
                            n > r && (n = 0);
                            var a = o(y[e], y[i], y[n], s[t]);
                            if (!a) return !1;
                            var h = s.length - 1,
                                l = t - 1;
                            0 > l && (l = h);
                            var c = t + 1;
                            return c > h && (c = 0), a = o(s[t], s[l], s[c], y[e]), a ? !0 : !1
                        }

                        function n(e, t) {
                            var r, n, o;
                            for (r = 0; r < y.length; r++)
                                if (n = r + 1, n %= y.length, o = i(e, t, y[r], y[n], !0), o.length > 0) return !0;
                            return !1
                        }

                        function a(e, r) {
                            var n, o, a, s, h;
                            for (n = 0; n < x.length; n++)
                                for (o = t[x[n]], a = 0; a < o.length; a++)
                                    if (s = a + 1, s %= o.length, h = i(e, r, o[a], o[s], !0), h.length > 0) return !0;
                            return !1
                        }
                        for (var s, h, l, c, u, d, p, f, m, g, v, y = e.concat(), x = [], _ = [], b = 0, w = t.length; w > b; b++) x.push(b);
                        for (var M = 0, S = 2 * x.length; x.length > 0;) {
                            if (S--, 0 > S) {
                                console.log("Infinite Loop! Holes left:" + x.length + ", Probably Hole outside Shape!");
                                break
                            }
                            for (l = M; l < y.length; l++) {
                                c = y[l], h = -1;
                                for (var b = 0; b < x.length; b++)
                                    if (d = x[b], p = c.x + ":" + c.y + ":" + d, void 0 === _[p]) {
                                        s = t[d];
                                        for (var E = 0; E < s.length; E++)
                                            if (u = s[E], r(l, E) && !n(c, u) && !a(c, u)) {
                                                h = E, x.splice(b, 1), f = y.slice(0, l + 1), m = y.slice(l), g = s.slice(h), v = s.slice(0, h + 1), y = f.concat(g).concat(v).concat(m), M = l;
                                                break
                                            } if (h >= 0) break;
                                        _[p] = !0
                                    } if (h >= 0) break
                            }
                        }
                        return y
                    }
                    for (var s, h, l, c, u, d, p = {}, f = e.concat(), m = 0, g = t.length; g > m; m++) Array.prototype.push.apply(f, t[m]);
                    for (s = 0, h = f.length; h > s; s++) u = f[s].x + ":" + f[s].y, void 0 !== p[u] && n.warn("THREE.Shape: Duplicate point", u), p[u] = s;
                    var v = a(e, t),
                        y = n.FontUtils.Triangulate(v, !1);
                    for (s = 0, h = y.length; h > s; s++)
                        for (c = y[s], l = 0; 3 > l; l++) u = c[l].x + ":" + c[l].y, d = p[u], void 0 !== d && (c[l] = d);
                    return y.concat()
                },
                isClockWise: function (e) {
                    return n.FontUtils.Triangulate.area(e) < 0
                },
                b2p0: function (e, t) {
                    var r = 1 - e;
                    return r * r * t
                },
                b2p1: function (e, t) {
                    return 2 * (1 - e) * e * t
                },
                b2p2: function (e, t) {
                    return e * e * t
                },
                b2: function (e, t, r, i) {
                    return this.b2p0(e, t) + this.b2p1(e, r) + this.b2p2(e, i)
                },
                b3p0: function (e, t) {
                    var r = 1 - e;
                    return r * r * r * t
                },
                b3p1: function (e, t) {
                    var r = 1 - e;
                    return 3 * r * r * e * t
                },
                b3p2: function (e, t) {
                    var r = 1 - e;
                    return 3 * r * e * e * t
                },
                b3p3: function (e, t) {
                    return e * e * e * t
                },
                b3: function (e, t, r, i, n) {
                    return this.b3p0(e, t) + this.b3p1(e, r) + this.b3p2(e, i) + this.b3p3(e, n)
                }
            }, n.LineCurve = function (e, t) {
                this.v1 = e, this.v2 = t
            }, n.LineCurve.prototype = Object.create(n.Curve.prototype), n.LineCurve.prototype.constructor = n.LineCurve, n.LineCurve.prototype.getPoint = function (e) {
                var t = this.v2.clone().sub(this.v1);
                return t.multiplyScalar(e).add(this.v1), t
            }, n.LineCurve.prototype.getPointAt = function (e) {
                return this.getPoint(e)
            }, n.LineCurve.prototype.getTangent = function () {
                var e = this.v2.clone().sub(this.v1);
                return e.normalize()
            }, n.QuadraticBezierCurve = function (e, t, r) {
                this.v0 = e, this.v1 = t, this.v2 = r
            }, n.QuadraticBezierCurve.prototype = Object.create(n.Curve.prototype), n.QuadraticBezierCurve.prototype.constructor = n.QuadraticBezierCurve, n.QuadraticBezierCurve.prototype.getPoint = function (e) {
                var t = new n.Vector2;
                return t.x = n.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x), t.y = n.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y), t
            }, n.QuadraticBezierCurve.prototype.getTangent = function (e) {
                var t = new n.Vector2;
                return t.x = n.Curve.Utils.tangentQuadraticBezier(e, this.v0.x, this.v1.x, this.v2.x), t.y = n.Curve.Utils.tangentQuadraticBezier(e, this.v0.y, this.v1.y, this.v2.y), t.normalize()
            }, n.CubicBezierCurve = function (e, t, r, i) {
                this.v0 = e, this.v1 = t, this.v2 = r, this.v3 = i
            }, n.CubicBezierCurve.prototype = Object.create(n.Curve.prototype), n.CubicBezierCurve.prototype.constructor = n.CubicBezierCurve, n.CubicBezierCurve.prototype.getPoint = function (e) {
                var t, r;
                return t = n.Shape.Utils.b3(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), r = n.Shape.Utils.b3(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y), new n.Vector2(t, r)
            }, n.CubicBezierCurve.prototype.getTangent = function (e) {
                var t, r;
                t = n.Curve.Utils.tangentCubicBezier(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), r = n.Curve.Utils.tangentCubicBezier(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
                var i = new n.Vector2(t, r);
                return i.normalize(), i
            }, n.SplineCurve = function (e) {
                this.points = void 0 == e ? [] : e
            }, n.SplineCurve.prototype = Object.create(n.Curve.prototype), n.SplineCurve.prototype.constructor = n.SplineCurve, n.SplineCurve.prototype.getPoint = function (e) {
                var t = this.points,
                    r = (t.length - 1) * e,
                    i = Math.floor(r),
                    o = r - i,
                    a = t[0 == i ? i : i - 1],
                    s = t[i],
                    h = t[i > t.length - 2 ? t.length - 1 : i + 1],
                    l = t[i > t.length - 3 ? t.length - 1 : i + 2],
                    c = new n.Vector2;
                return c.x = n.Curve.Utils.interpolate(a.x, s.x, h.x, l.x, o), c.y = n.Curve.Utils.interpolate(a.y, s.y, h.y, l.y, o), c
            }, n.EllipseCurve = function (e, t, r, i, n, o, a) {
                this.aX = e, this.aY = t, this.xRadius = r, this.yRadius = i, this.aStartAngle = n, this.aEndAngle = o, this.aClockwise = a
            }, n.EllipseCurve.prototype = Object.create(n.Curve.prototype), n.EllipseCurve.prototype.constructor = n.EllipseCurve, n.EllipseCurve.prototype.getPoint = function (e) {
                var t = this.aEndAngle - this.aStartAngle;
                0 > t && (t += 2 * Math.PI), t > 2 * Math.PI && (t -= 2 * Math.PI);
                var r;
                r = this.aClockwise === !0 ? this.aEndAngle + (1 - e) * (2 * Math.PI - t) : this.aStartAngle + e * t;
                var i = new n.Vector2;
                return i.x = this.aX + this.xRadius * Math.cos(r), i.y = this.aY + this.yRadius * Math.sin(r), i
            }, n.ArcCurve = function (e, t, r, i, o, a) {
                n.EllipseCurve.call(this, e, t, r, r, i, o, a)
            }, n.ArcCurve.prototype = Object.create(n.EllipseCurve.prototype), n.ArcCurve.prototype.constructor = n.ArcCurve, n.LineCurve3 = n.Curve.create(function (e, t) {
                this.v1 = e, this.v2 = t
            }, function (e) {
                var t = new n.Vector3;
                return t.subVectors(this.v2, this.v1), t.multiplyScalar(e), t.add(this.v1), t
            }), n.QuadraticBezierCurve3 = n.Curve.create(function (e, t, r) {
                this.v0 = e, this.v1 = t, this.v2 = r
            }, function (e) {
                var t = new n.Vector3;
                return t.x = n.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x), t.y = n.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y), t.z = n.Shape.Utils.b2(e, this.v0.z, this.v1.z, this.v2.z), t
            }), n.CubicBezierCurve3 = n.Curve.create(function (e, t, r, i) {
                this.v0 = e, this.v1 = t, this.v2 = r, this.v3 = i
            }, function (e) {
                var t = new n.Vector3;
                return t.x = n.Shape.Utils.b3(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), t.y = n.Shape.Utils.b3(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y), t.z = n.Shape.Utils.b3(e, this.v0.z, this.v1.z, this.v2.z, this.v3.z), t
            }), n.SplineCurve3 = n.Curve.create(function (e) {
                this.points = void 0 == e ? [] : e
            }, function (e) {
                var t = this.points,
                    r = (t.length - 1) * e,
                    i = Math.floor(r),
                    o = r - i,
                    a = t[0 == i ? i : i - 1],
                    s = t[i],
                    h = t[i > t.length - 2 ? t.length - 1 : i + 1],
                    l = t[i > t.length - 3 ? t.length - 1 : i + 2],
                    c = new n.Vector3;
                return c.x = n.Curve.Utils.interpolate(a.x, s.x, h.x, l.x, o), c.y = n.Curve.Utils.interpolate(a.y, s.y, h.y, l.y, o), c.z = n.Curve.Utils.interpolate(a.z, s.z, h.z, l.z, o), c
            }), n.ClosedSplineCurve3 = n.Curve.create(function (e) {
                this.points = void 0 == e ? [] : e
            }, function (e) {
                var t = this.points,
                    r = (t.length - 0) * e,
                    i = Math.floor(r),
                    o = r - i;
                i += i > 0 ? 0 : (Math.floor(Math.abs(i) / t.length) + 1) * t.length;
                var a = t[(i - 1) % t.length],
                    s = t[i % t.length],
                    h = t[(i + 1) % t.length],
                    l = t[(i + 2) % t.length],
                    c = new n.Vector3;
                return c.x = n.Curve.Utils.interpolate(a.x, s.x, h.x, l.x, o), c.y = n.Curve.Utils.interpolate(a.y, s.y, h.y, l.y, o), c.z = n.Curve.Utils.interpolate(a.z, s.z, h.z, l.z, o), c
            }), n.AnimationHandler = {
                LINEAR: 0,
                CATMULLROM: 1,
                CATMULLROM_FORWARD: 2,
                add: function () {
                    n.warn("THREE.AnimationHandler.add() has been deprecated.")
                },
                get: function () {
                    n.warn("THREE.AnimationHandler.get() has been deprecated.")
                },
                remove: function () {
                    n.warn("THREE.AnimationHandler.remove() has been deprecated.")
                },
                animations: [],
                init: function (e) {
                    if (e.initialized === !0) return e;
                    for (var t = 0; t < e.hierarchy.length; t++) {
                        for (var r = 0; r < e.hierarchy[t].keys.length; r++)
                            if (e.hierarchy[t].keys[r].time < 0 && (e.hierarchy[t].keys[r].time = 0), void 0 !== e.hierarchy[t].keys[r].rot && !(e.hierarchy[t].keys[r].rot instanceof n.Quaternion)) {
                                var i = e.hierarchy[t].keys[r].rot;
                                e.hierarchy[t].keys[r].rot = (new n.Quaternion).fromArray(i)
                            } if (e.hierarchy[t].keys.length && void 0 !== e.hierarchy[t].keys[0].morphTargets) {
                            for (var o = {}, r = 0; r < e.hierarchy[t].keys.length; r++)
                                for (var a = 0; a < e.hierarchy[t].keys[r].morphTargets.length; a++) {
                                    var s = e.hierarchy[t].keys[r].morphTargets[a];
                                    o[s] = -1
                                }
                            e.hierarchy[t].usedMorphTargets = o;
                            for (var r = 0; r < e.hierarchy[t].keys.length; r++) {
                                var h = {};
                                for (var s in o) {
                                    for (var a = 0; a < e.hierarchy[t].keys[r].morphTargets.length; a++)
                                        if (e.hierarchy[t].keys[r].morphTargets[a] === s) {
                                            h[s] = e.hierarchy[t].keys[r].morphTargetsInfluences[a];
                                            break
                                        } a === e.hierarchy[t].keys[r].morphTargets.length && (h[s] = 0)
                                }
                                e.hierarchy[t].keys[r].morphTargetsInfluences = h
                            }
                        }
                        for (var r = 1; r < e.hierarchy[t].keys.length; r++) e.hierarchy[t].keys[r].time === e.hierarchy[t].keys[r - 1].time && (e.hierarchy[t].keys.splice(r, 1), r--);
                        for (var r = 0; r < e.hierarchy[t].keys.length; r++) e.hierarchy[t].keys[r].index = r
                    }
                    return e.initialized = !0, e
                },
                parse: function (e) {
                    var t = function (e, r) {
                            r.push(e);
                            for (var i = 0; i < e.children.length; i++) t(e.children[i], r)
                        },
                        r = [];
                    if (e instanceof n.SkinnedMesh)
                        for (var i = 0; i < e.skeleton.bones.length; i++) r.push(e.skeleton.bones[i]);
                    else t(e, r);
                    return r
                },
                play: function (e) {
                    -1 === this.animations.indexOf(e) && this.animations.push(e)
                },
                stop: function (e) {
                    var t = this.animations.indexOf(e); - 1 !== t && this.animations.splice(t, 1)
                },
                update: function (e) {
                    for (var t = 0; t < this.animations.length; t++) this.animations[t].resetBlendWeights();
                    for (var t = 0; t < this.animations.length; t++) this.animations[t].update(e)
                }
            }, n.Animation = function (e, t) {
                this.root = e, this.data = n.AnimationHandler.init(t), this.hierarchy = n.AnimationHandler.parse(e), this.currentTime = 0, this.timeScale = 1, this.isPlaying = !1, this.loop = !0, this.weight = 0, this.interpolationType = n.AnimationHandler.LINEAR
            }, n.Animation.prototype = {
                constructor: n.Animation,
                keyTypes: ["pos", "rot", "scl"],
                play: function (e, t) {
                    this.currentTime = void 0 !== e ? e : 0, this.weight = void 0 !== t ? t : 1, this.isPlaying = !0, this.reset(), n.AnimationHandler.play(this)
                },
                stop: function () {
                    this.isPlaying = !1, n.AnimationHandler.stop(this)
                },
                reset: function () {
                    for (var e = 0, t = this.hierarchy.length; t > e; e++) {
                        var r = this.hierarchy[e];
                        void 0 === r.animationCache && (r.animationCache = {
                            animations: {},
                            blending: {
                                positionWeight: 0,
                                quaternionWeight: 0,
                                scaleWeight: 0
                            }
                        });
                        var i = this.data.name,
                            n = r.animationCache.animations,
                            o = n[i];
                        void 0 === o && (o = {
                            prevKey: {
                                pos: 0,
                                rot: 0,
                                scl: 0
                            },
                            nextKey: {
                                pos: 0,
                                rot: 0,
                                scl: 0
                            },
                            originalMatrix: r.matrix
                        }, n[i] = o);
                        for (var a = 0; 3 > a; a++) {
                            for (var s = this.keyTypes[a], h = this.data.hierarchy[e].keys[0], l = this.getNextKeyWith(s, e, 1); l.time < this.currentTime && l.index > h.index;) h = l, l = this.getNextKeyWith(s, e, l.index + 1);
                            o.prevKey[s] = h, o.nextKey[s] = l
                        }
                    }
                },
                resetBlendWeights: function () {
                    for (var e = 0, t = this.hierarchy.length; t > e; e++) {
                        var r = this.hierarchy[e],
                            i = r.animationCache;
                        if (void 0 !== i) {
                            var n = i.blending;
                            n.positionWeight = 0, n.quaternionWeight = 0, n.scaleWeight = 0
                        }
                    }
                },
                update: function () {
                    var e = [],
                        t = new n.Vector3,
                        r = new n.Vector3,
                        i = new n.Quaternion,
                        o = function (e, t) {
                            var r, i, n, o, s, h, l, c, u, d = [],
                                p = [];
                            return r = (e.length - 1) * t, i = Math.floor(r), n = r - i, d[0] = 0 === i ? i : i - 1, d[1] = i, d[2] = i > e.length - 2 ? i : i + 1, d[3] = i > e.length - 3 ? i : i + 2, h = e[d[0]], l = e[d[1]], c = e[d[2]], u = e[d[3]], o = n * n, s = n * o, p[0] = a(h[0], l[0], c[0], u[0], n, o, s), p[1] = a(h[1], l[1], c[1], u[1], n, o, s), p[2] = a(h[2], l[2], c[2], u[2], n, o, s), p
                        },
                        a = function (e, t, r, i, n, o, a) {
                            var s = .5 * (r - e),
                                h = .5 * (i - t);
                            return (2 * (t - r) + s + h) * a + (-3 * (t - r) - 2 * s - h) * o + s * n + t
                        };
                    return function (a) {
                        if (this.isPlaying !== !1 && (this.currentTime += a * this.timeScale, 0 !== this.weight)) {
                            var s = this.data.length;
                            (this.currentTime > s || this.currentTime < 0) && (this.loop ? (this.currentTime %= s, this.currentTime < 0 && (this.currentTime += s), this.reset()) : this.stop());
                            for (var h = 0, l = this.hierarchy.length; l > h; h++)
                                for (var c = this.hierarchy[h], u = c.animationCache.animations[this.data.name], d = c.animationCache.blending, p = 0; 3 > p; p++) {
                                    var f = this.keyTypes[p],
                                        m = u.prevKey[f],
                                        g = u.nextKey[f];
                                    if (this.timeScale > 0 && g.time <= this.currentTime || this.timeScale < 0 && m.time >= this.currentTime) {
                                        for (m = this.data.hierarchy[h].keys[0], g = this.getNextKeyWith(f, h, 1); g.time < this.currentTime && g.index > m.index;) m = g, g = this.getNextKeyWith(f, h, g.index + 1);
                                        u.prevKey[f] = m, u.nextKey[f] = g
                                    }
                                    var v = (this.currentTime - m.time) / (g.time - m.time),
                                        y = m[f],
                                        x = g[f];
                                    if (0 > v && (v = 0), v > 1 && (v = 1), "pos" === f) {
                                        if (this.interpolationType === n.AnimationHandler.LINEAR) {
                                            r.x = y[0] + (x[0] - y[0]) * v, r.y = y[1] + (x[1] - y[1]) * v, r.z = y[2] + (x[2] - y[2]) * v;
                                            var _ = this.weight / (this.weight + d.positionWeight);
                                            c.position.lerp(r, _), d.positionWeight += this.weight
                                        } else if (this.interpolationType === n.AnimationHandler.CATMULLROM || this.interpolationType === n.AnimationHandler.CATMULLROM_FORWARD) {
                                            e[0] = this.getPrevKeyWith("pos", h, m.index - 1).pos, e[1] = y, e[2] = x, e[3] = this.getNextKeyWith("pos", h, g.index + 1).pos, v = .33 * v + .33;
                                            var b = o(e, v),
                                                _ = this.weight / (this.weight + d.positionWeight);
                                            d.positionWeight += this.weight;
                                            var w = c.position;
                                            if (w.x = w.x + (b[0] - w.x) * _, w.y = w.y + (b[1] - w.y) * _, w.z = w.z + (b[2] - w.z) * _, this.interpolationType === n.AnimationHandler.CATMULLROM_FORWARD) {
                                                var M = o(e, 1.01 * v);
                                                t.set(M[0], M[1], M[2]), t.sub(w), t.y = 0, t.normalize();
                                                var S = Math.atan2(t.x, t.z);
                                                c.rotation.set(0, S, 0)
                                            }
                                        }
                                    } else if ("rot" === f)
                                        if (n.Quaternion.slerp(y, x, i, v), 0 === d.quaternionWeight) c.quaternion.copy(i), d.quaternionWeight = this.weight;
                                        else {
                                            var _ = this.weight / (this.weight + d.quaternionWeight);
                                            n.Quaternion.slerp(c.quaternion, i, c.quaternion, _), d.quaternionWeight += this.weight
                                        }
                                    else if ("scl" === f) {
                                        r.x = y[0] + (x[0] - y[0]) * v, r.y = y[1] + (x[1] - y[1]) * v, r.z = y[2] + (x[2] - y[2]) * v;
                                        var _ = this.weight / (this.weight + d.scaleWeight);
                                        c.scale.lerp(r, _), d.scaleWeight += this.weight
                                    }
                                }
                            return !0
                        }
                    }
                }(),
                getNextKeyWith: function (e, t, r) {
                    var i = this.data.hierarchy[t].keys;
                    for (this.interpolationType === n.AnimationHandler.CATMULLROM || this.interpolationType === n.AnimationHandler.CATMULLROM_FORWARD ? r = r < i.length - 1 ? r : i.length - 1 : r %= i.length; r < i.length; r++)
                        if (void 0 !== i[r][e]) return i[r];
                    return this.data.hierarchy[t].keys[0]
                },
                getPrevKeyWith: function (e, t, r) {
                    var i = this.data.hierarchy[t].keys;
                    for (r = this.interpolationType === n.AnimationHandler.CATMULLROM || this.interpolationType === n.AnimationHandler.CATMULLROM_FORWARD ? r > 0 ? r : 0 : r >= 0 ? r : r + i.length; r >= 0; r--)
                        if (void 0 !== i[r][e]) return i[r];
                    return this.data.hierarchy[t].keys[i.length - 1]
                }
            }, n.KeyFrameAnimation = function (e) {
                this.root = e.node, this.data = n.AnimationHandler.init(e), this.hierarchy = n.AnimationHandler.parse(this.root), this.currentTime = 0, this.timeScale = .001, this.isPlaying = !1, this.isPaused = !0, this.loop = !0;
                for (var t = 0, r = this.hierarchy.length; r > t; t++) {
                    var i = this.data.hierarchy[t].keys,
                        o = this.data.hierarchy[t].sids,
                        a = this.hierarchy[t];
                    if (i.length && o) {
                        for (var s = 0; s < o.length; s++) {
                            var h = o[s],
                                l = this.getNextKeyWith(h, t, 0);
                            l && l.apply(h)
                        }
                        a.matrixAutoUpdate = !1, this.data.hierarchy[t].node.updateMatrix(), a.matrixWorldNeedsUpdate = !0
                    }
                }
            }, n.KeyFrameAnimation.prototype = {
                constructor: n.KeyFrameAnimation,
                play: function (e) {
                    if (this.currentTime = void 0 !== e ? e : 0, this.isPlaying === !1) {
                        this.isPlaying = !0;
                        var t, r, i, o = this.hierarchy.length;
                        for (t = 0; o > t; t++) {
                            r = this.hierarchy[t], i = this.data.hierarchy[t], void 0 === i.animationCache && (i.animationCache = {}, i.animationCache.prevKey = null, i.animationCache.nextKey = null, i.animationCache.originalMatrix = r.matrix);
                            var a = this.data.hierarchy[t].keys;
                            a.length && (i.animationCache.prevKey = a[0], i.animationCache.nextKey = a[1], this.startTime = Math.min(a[0].time, this.startTime), this.endTime = Math.max(a[a.length - 1].time, this.endTime))
                        }
                        this.update(0)
                    }
                    this.isPaused = !1, n.AnimationHandler.play(this)
                },
                stop: function () {
                    this.isPlaying = !1, this.isPaused = !1, n.AnimationHandler.stop(this);
                    for (var e = 0; e < this.data.hierarchy.length; e++) {
                        var t = this.hierarchy[e],
                            r = this.data.hierarchy[e];
                        if (void 0 !== r.animationCache) {
                            var i = r.animationCache.originalMatrix;
                            i.copy(t.matrix), t.matrix = i, delete r.animationCache
                        }
                    }
                },
                update: function (e) {
                    if (this.isPlaying !== !1) {
                        this.currentTime += e * this.timeScale;
                        var t = this.data.length;
                        this.loop === !0 && this.currentTime > t && (this.currentTime %= t), this.currentTime = Math.min(this.currentTime, t);
                        for (var r = 0, i = this.hierarchy.length; i > r; r++) {
                            var n = this.hierarchy[r],
                                o = this.data.hierarchy[r],
                                a = o.keys,
                                s = o.animationCache;
                            if (a.length) {
                                var h = s.prevKey,
                                    l = s.nextKey;
                                if (l.time <= this.currentTime) {
                                    for (; l.time < this.currentTime && l.index > h.index;) h = l, l = a[h.index + 1];
                                    s.prevKey = h, s.nextKey = l
                                }
                                l.time >= this.currentTime ? h.interpolate(l, this.currentTime) : h.interpolate(l, l.time), this.data.hierarchy[r].node.updateMatrix(), n.matrixWorldNeedsUpdate = !0
                            }
                        }
                    }
                },
                getNextKeyWith: function (e, t, r) {
                    var i = this.data.hierarchy[t].keys;
                    for (r %= i.length; r < i.length; r++)
                        if (i[r].hasTarget(e)) return i[r];
                    return i[0]
                },
                getPrevKeyWith: function (e, t, r) {
                    var i = this.data.hierarchy[t].keys;
                    for (r = r >= 0 ? r : r + i.length; r >= 0; r--)
                        if (i[r].hasTarget(e)) return i[r];
                    return i[i.length - 1]
                }
            }, n.MorphAnimation = function (e) {
                this.mesh = e, this.frames = e.morphTargetInfluences.length, this.currentTime = 0, this.duration = 1e3, this.loop = !0, this.lastFrame = 0, this.currentFrame = 0, this.isPlaying = !1
            }, n.MorphAnimation.prototype = {
                constructor: n.MorphAnimation,
                play: function () {
                    this.isPlaying = !0
                },
                pause: function () {
                    this.isPlaying = !1
                },
                update: function (e) {
                    if (this.isPlaying !== !1) {
                        this.currentTime += e, this.loop === !0 && this.currentTime > this.duration && (this.currentTime %= this.duration), this.currentTime = Math.min(this.currentTime, this.duration);
                        var t = this.duration / this.frames,
                            r = Math.floor(this.currentTime / t),
                            i = this.mesh.morphTargetInfluences;
                        r != this.currentFrame && (i[this.lastFrame] = 0, i[this.currentFrame] = 1, i[r] = 0, this.lastFrame = this.currentFrame, this.currentFrame = r), i[r] = this.currentTime % t / t, i[this.lastFrame] = 1 - i[r]
                    }
                }
            }, n.BoxGeometry = function (e, t, r, i, o, a) {
                function s(e, t, r, i, o, a, s, l) {
                    var c, u, d, p = h.widthSegments,
                        f = h.heightSegments,
                        m = o / 2,
                        g = a / 2,
                        v = h.vertices.length;
                    "x" === e && "y" === t || "y" === e && "x" === t ? c = "z" : "x" === e && "z" === t || "z" === e && "x" === t ? (c = "y", f = h.depthSegments) : ("z" === e && "y" === t || "y" === e && "z" === t) && (c = "x", p = h.depthSegments);
                    var y = p + 1,
                        x = f + 1,
                        _ = o / p,
                        b = a / f,
                        w = new n.Vector3;
                    for (w[c] = s > 0 ? 1 : -1, d = 0; x > d; d++)
                        for (u = 0; y > u; u++) {
                            var M = new n.Vector3;
                            M[e] = (u * _ - m) * r, M[t] = (d * b - g) * i, M[c] = s, h.vertices.push(M)
                        }
                    for (d = 0; f > d; d++)
                        for (u = 0; p > u; u++) {
                            var S = u + y * d,
                                E = u + y * (d + 1),
                                T = u + 1 + y * (d + 1),
                                A = u + 1 + y * d,
                                C = new n.Vector2(u / p, 1 - d / f),
                                L = new n.Vector2(u / p, 1 - (d + 1) / f),
                                R = new n.Vector2((u + 1) / p, 1 - (d + 1) / f),
                                P = new n.Vector2((u + 1) / p, 1 - d / f),
                                F = new n.Face3(S + v, E + v, A + v);
                            F.normal.copy(w), F.vertexNormals.push(w.clone(), w.clone(), w.clone()), F.materialIndex = l, h.faces.push(F), h.faceVertexUvs[0].push([C, L, P]), F = new n.Face3(E + v, T + v, A + v), F.normal.copy(w), F.vertexNormals.push(w.clone(), w.clone(), w.clone()), F.materialIndex = l, h.faces.push(F), h.faceVertexUvs[0].push([L.clone(), R, P.clone()])
                        }
                }
                n.Geometry.call(this), this.type = "BoxGeometry", this.parameters = {
                    width: e,
                    height: t,
                    depth: r,
                    widthSegments: i,
                    heightSegments: o,
                    depthSegments: a
                }, this.widthSegments = i || 1, this.heightSegments = o || 1, this.depthSegments = a || 1;
                var h = this,
                    l = e / 2,
                    c = t / 2,
                    u = r / 2;
                s("z", "y", -1, -1, r, t, l, 0), s("z", "y", 1, -1, r, t, -l, 1), s("x", "z", 1, 1, e, r, c, 2), s("x", "z", 1, -1, e, r, -c, 3), s("x", "y", 1, -1, e, t, u, 4), s("x", "y", -1, -1, e, t, -u, 5), this.mergeVertices()
            }, n.BoxGeometry.prototype = Object.create(n.Geometry.prototype), n.BoxGeometry.prototype.constructor = n.BoxGeometry, n.CircleGeometry = function (e, t, r, i) {
                n.Geometry.call(this), this.type = "CircleGeometry", this.parameters = {
                    radius: e,
                    segments: t,
                    thetaStart: r,
                    thetaLength: i
                }, e = e || 50, t = void 0 !== t ? Math.max(3, t) : 8, r = void 0 !== r ? r : 0, i = void 0 !== i ? i : 2 * Math.PI;
                var o, a = [],
                    s = new n.Vector3,
                    h = new n.Vector2(.5, .5);
                for (this.vertices.push(s), a.push(h), o = 0; t >= o; o++) {
                    var l = new n.Vector3,
                        c = r + o / t * i;
                    l.x = e * Math.cos(c), l.y = e * Math.sin(c), this.vertices.push(l), a.push(new n.Vector2((l.x / e + 1) / 2, (l.y / e + 1) / 2))
                }
                var u = new n.Vector3(0, 0, 1);
                for (o = 1; t >= o; o++) this.faces.push(new n.Face3(o, o + 1, 0, [u.clone(), u.clone(), u.clone()])), this.faceVertexUvs[0].push([a[o].clone(), a[o + 1].clone(), h.clone()]);
                this.computeFaceNormals(), this.boundingSphere = new n.Sphere(new n.Vector3, e)
            }, n.CircleGeometry.prototype = Object.create(n.Geometry.prototype), n.CircleGeometry.prototype.constructor = n.CircleGeometry, n.CubeGeometry = function (e, t, r, i, o, a) {
                return n.warn("THREE.CubeGeometry has been renamed to THREE.BoxGeometry."), new n.BoxGeometry(e, t, r, i, o, a)
            }, n.CylinderGeometry = function (e, t, r, i, o, a, s, h) {
                n.Geometry.call(this), this.type = "CylinderGeometry", this.parameters = {
                    radiusTop: e,
                    radiusBottom: t,
                    height: r,
                    radialSegments: i,
                    heightSegments: o,
                    openEnded: a,
                    thetaStart: s,
                    thetaLength: h
                }, e = void 0 !== e ? e : 20, t = void 0 !== t ? t : 20, r = void 0 !== r ? r : 100, i = i || 8, o = o || 1, a = void 0 !== a ? a : !1, s = void 0 !== s ? s : 0, h = void 0 !== h ? h : 2 * Math.PI;
                var l, c, u = r / 2,
                    d = [],
                    p = [];
                for (c = 0; o >= c; c++) {
                    var f = [],
                        m = [],
                        g = c / o,
                        v = g * (t - e) + e;
                    for (l = 0; i >= l; l++) {
                        var y = l / i,
                            x = new n.Vector3;
                        x.x = v * Math.sin(y * h + s), x.y = -g * r + u, x.z = v * Math.cos(y * h + s), this.vertices.push(x), f.push(this.vertices.length - 1), m.push(new n.Vector2(y, 1 - g))
                    }
                    d.push(f), p.push(m)
                }
                var _, b, w = (t - e) / r;
                for (l = 0; i > l; l++)
                    for (0 !== e ? (_ = this.vertices[d[0][l]].clone(), b = this.vertices[d[0][l + 1]].clone()) : (_ = this.vertices[d[1][l]].clone(), b = this.vertices[d[1][l + 1]].clone()), _.setY(Math.sqrt(_.x * _.x + _.z * _.z) * w).normalize(), b.setY(Math.sqrt(b.x * b.x + b.z * b.z) * w).normalize(), c = 0; o > c; c++) {
                        var M = d[c][l],
                            S = d[c + 1][l],
                            E = d[c + 1][l + 1],
                            T = d[c][l + 1],
                            A = _.clone(),
                            C = _.clone(),
                            L = b.clone(),
                            R = b.clone(),
                            P = p[c][l].clone(),
                            F = p[c + 1][l].clone(),
                            B = p[c + 1][l + 1].clone(),
                            D = p[c][l + 1].clone();
                        this.faces.push(new n.Face3(M, S, T, [A, C, R])), this.faceVertexUvs[0].push([P, F, D]), this.faces.push(new n.Face3(S, E, T, [C.clone(), L, R.clone()])), this.faceVertexUvs[0].push([F.clone(), B, D.clone()])
                    }
                if (a === !1 && e > 0)
                    for (this.vertices.push(new n.Vector3(0, u, 0)), l = 0; i > l; l++) {
                        var M = d[0][l],
                            S = d[0][l + 1],
                            E = this.vertices.length - 1,
                            A = new n.Vector3(0, 1, 0),
                            C = new n.Vector3(0, 1, 0),
                            L = new n.Vector3(0, 1, 0),
                            P = p[0][l].clone(),
                            F = p[0][l + 1].clone(),
                            B = new n.Vector2(F.x, 0);
                        this.faces.push(new n.Face3(M, S, E, [A, C, L])), this.faceVertexUvs[0].push([P, F, B])
                    }
                if (a === !1 && t > 0)
                    for (this.vertices.push(new n.Vector3(0, -u, 0)), l = 0; i > l; l++) {
                        var M = d[o][l + 1],
                            S = d[o][l],
                            E = this.vertices.length - 1,
                            A = new n.Vector3(0, -1, 0),
                            C = new n.Vector3(0, -1, 0),
                            L = new n.Vector3(0, -1, 0),
                            P = p[o][l + 1].clone(),
                            F = p[o][l].clone(),
                            B = new n.Vector2(F.x, 1);
                        this.faces.push(new n.Face3(M, S, E, [A, C, L])), this.faceVertexUvs[0].push([P, F, B])
                    }
                this.computeFaceNormals()
            }, n.CylinderGeometry.prototype = Object.create(n.Geometry.prototype), n.CylinderGeometry.prototype.constructor = n.CylinderGeometry, n.ExtrudeGeometry = function (e, t) {
                return "undefined" == typeof e ? void(e = []) : (n.Geometry.call(this), this.type = "ExtrudeGeometry", e = e instanceof Array ? e : [e], this.addShapeList(e, t), void this.computeFaceNormals())
            }, n.ExtrudeGeometry.prototype = Object.create(n.Geometry.prototype), n.ExtrudeGeometry.prototype.constructor = n.ExtrudeGeometry, n.ExtrudeGeometry.prototype.addShapeList = function (e, t) {
                for (var r = e.length, i = 0; r > i; i++) {
                    var n = e[i];
                    this.addShape(n, t)
                }
            }, n.ExtrudeGeometry.prototype.addShape = function (e, t) {
                function r(e, t, r) {
                    return t || n.error("THREE.ExtrudeGeometry: vec does not exist"), t.clone().multiplyScalar(r).add(e)
                }

                function i(e, t, r) {
                    var i, o, a = 1e-10,
                        s = 1,
                        h = e.x - t.x,
                        l = e.y - t.y,
                        c = r.x - e.x,
                        u = r.y - e.y,
                        d = h * h + l * l,
                        p = h * u - l * c;
                    if (Math.abs(p) > a) {
                        var f = Math.sqrt(d),
                            m = Math.sqrt(c * c + u * u),
                            g = t.x - l / f,
                            v = t.y + h / f,
                            y = r.x - u / m,
                            x = r.y + c / m,
                            _ = ((y - g) * u - (x - v) * c) / (h * u - l * c);
                        i = g + h * _ - e.x, o = v + l * _ - e.y;
                        var b = i * i + o * o;
                        if (2 >= b) return new n.Vector2(i, o);
                        s = Math.sqrt(b / 2)
                    } else {
                        var w = !1;
                        h > a ? c > a && (w = !0) : -a > h ? -a > c && (w = !0) : Math.sign(l) == Math.sign(u) && (w = !0), w ? (i = -l, o = h, s = Math.sqrt(d)) : (i = h, o = l, s = Math.sqrt(d / 2))
                    }
                    return new n.Vector2(i / s, o / s)
                }

                function o() {
                    if (_) {
                        var e = 0,
                            t = j * e;
                        for (q = 0; X > q; q++) W = V[q], l(W[2] + t, W[1] + t, W[0] + t);
                        for (e = w + 2 * x, t = j * e, q = 0; X > q; q++) W = V[q], l(W[0] + t, W[1] + t, W[2] + t)
                    } else {
                        for (q = 0; X > q; q++) W = V[q], l(W[2], W[1], W[0]);
                        for (q = 0; X > q; q++) W = V[q], l(W[0] + j * w, W[1] + j * w, W[2] + j * w)
                    }
                }

                function a() {
                    var e = 0;
                    for (s(O, e), e += O.length, L = 0, R = U.length; R > L; L++) C = U[L], s(C, e), e += C.length
                }

                function s(e, t) {
                    var r, i;
                    for (q = e.length; --q >= 0;) {
                        r = q, i = q - 1, 0 > i && (i = e.length - 1);
                        var n = 0,
                            o = w + 2 * x;
                        for (n = 0; o > n; n++) {
                            var a = j * n,
                                s = j * (n + 1),
                                h = t + r + a,
                                l = t + i + a,
                                u = t + i + s,
                                d = t + r + s;
                            c(h, l, u, d, e, n, o, r, i)
                        }
                    }
                }

                function h(e, t, r) {
                    P.vertices.push(new n.Vector3(e, t, r))
                }

                function l(e, t, r) {
                    e += F, t += F, r += F, P.faces.push(new n.Face3(e, t, r, null, null, E));
                    var i = A.generateTopUV(P, e, t, r);
                    P.faceVertexUvs[0].push(i)
                }

                function c(e, t, r, i) {
                    e += F, t += F, r += F, i += F, P.faces.push(new n.Face3(e, t, i, null, null, T)), P.faces.push(new n.Face3(t, r, i, null, null, T));
                    var o = A.generateSideWallUV(P, e, t, r, i);
                    P.faceVertexUvs[0].push([o[0], o[1], o[3]]), P.faceVertexUvs[0].push([o[1], o[2], o[3]])
                }
                var u, d, p, f, m, g = void 0 !== t.amount ? t.amount : 100,
                    v = void 0 !== t.bevelThickness ? t.bevelThickness : 6,
                    y = void 0 !== t.bevelSize ? t.bevelSize : v - 2,
                    x = void 0 !== t.bevelSegments ? t.bevelSegments : 3,
                    _ = void 0 !== t.bevelEnabled ? t.bevelEnabled : !0,
                    b = void 0 !== t.curveSegments ? t.curveSegments : 12,
                    w = void 0 !== t.steps ? t.steps : 1,
                    M = t.extrudePath,
                    S = !1,
                    E = t.material,
                    T = t.extrudeMaterial,
                    A = void 0 !== t.UVGenerator ? t.UVGenerator : n.ExtrudeGeometry.WorldUVGenerator;
                M && (u = M.getSpacedPoints(w), S = !0, _ = !1, d = void 0 !== t.frames ? t.frames : new n.TubeGeometry.FrenetFrames(M, w, !1), p = new n.Vector3, f = new n.Vector3, m = new n.Vector3), _ || (x = 0, v = 0, y = 0);
                var C, L, R, P = this,
                    F = this.vertices.length,
                    B = e.extractPoints(b),
                    D = B.shape,
                    U = B.holes,
                    k = !n.Shape.Utils.isClockWise(D);
                if (k) {
                    for (D = D.reverse(), L = 0, R = U.length; R > L; L++) C = U[L], n.Shape.Utils.isClockWise(C) && (U[L] = C.reverse());
                    k = !1
                }
                var V = n.Shape.Utils.triangulateShape(D, U),
                    O = D;
                for (L = 0, R = U.length; R > L; L++) C = U[L], D = D.concat(C);
                for (var N, z, I, G, H, W, j = D.length, X = V.length, Y = [], q = 0, K = O.length, Q = K - 1, Z = q + 1; K > q; q++, Q++, Z++) Q === K && (Q = 0), Z === K && (Z = 0), Y[q] = i(O[q], O[Q], O[Z]);
                var J, $ = [],
                    ee = Y.concat();
                for (L = 0, R = U.length; R > L; L++) {
                    for (C = U[L], J = [], q = 0, K = C.length, Q = K - 1, Z = q + 1; K > q; q++, Q++, Z++) Q === K && (Q = 0), Z === K && (Z = 0), J[q] = i(C[q], C[Q], C[Z]);
                    $.push(J), ee = ee.concat(J)
                }
                for (N = 0; x > N; N++) {
                    for (I = N / x, G = v * (1 - I), z = y * Math.sin(I * Math.PI / 2), q = 0, K = O.length; K > q; q++) H = r(O[q], Y[q], z), h(H.x, H.y, -G);
                    for (L = 0, R = U.length; R > L; L++)
                        for (C = U[L], J = $[L], q = 0, K = C.length; K > q; q++) H = r(C[q], J[q], z), h(H.x, H.y, -G)
                }
                for (z = y, q = 0; j > q; q++) H = _ ? r(D[q], ee[q], z) : D[q], S ? (f.copy(d.normals[0]).multiplyScalar(H.x), p.copy(d.binormals[0]).multiplyScalar(H.y), m.copy(u[0]).add(f).add(p), h(m.x, m.y, m.z)) : h(H.x, H.y, 0);
                var te;
                for (te = 1; w >= te; te++)
                    for (q = 0; j > q; q++) H = _ ? r(D[q], ee[q], z) : D[q], S ? (f.copy(d.normals[te]).multiplyScalar(H.x), p.copy(d.binormals[te]).multiplyScalar(H.y), m.copy(u[te]).add(f).add(p), h(m.x, m.y, m.z)) : h(H.x, H.y, g / w * te);
                for (N = x - 1; N >= 0; N--) {
                    for (I = N / x, G = v * (1 - I), z = y * Math.sin(I * Math.PI / 2), q = 0, K = O.length; K > q; q++) H = r(O[q], Y[q], z), h(H.x, H.y, g + G);
                    for (L = 0, R = U.length; R > L; L++)
                        for (C = U[L], J = $[L], q = 0, K = C.length; K > q; q++) H = r(C[q], J[q], z), S ? h(H.x, H.y + u[w - 1].y, u[w - 1].x + G) : h(H.x, H.y, g + G)
                }
                o(), a()
            }, n.ExtrudeGeometry.WorldUVGenerator = {
                generateTopUV: function (e, t, r, i) {
                    var o = e.vertices,
                        a = o[t],
                        s = o[r],
                        h = o[i];
                    return [new n.Vector2(a.x, a.y), new n.Vector2(s.x, s.y), new n.Vector2(h.x, h.y)]
                },
                generateSideWallUV: function (e, t, r, i, o) {
                    var a = e.vertices,
                        s = a[t],
                        h = a[r],
                        l = a[i],
                        c = a[o];
                    return Math.abs(s.y - h.y) < .01 ? [new n.Vector2(s.x, 1 - s.z), new n.Vector2(h.x, 1 - h.z), new n.Vector2(l.x, 1 - l.z), new n.Vector2(c.x, 1 - c.z)] : [new n.Vector2(s.y, 1 - s.z), new n.Vector2(h.y, 1 - h.z), new n.Vector2(l.y, 1 - l.z), new n.Vector2(c.y, 1 - c.z)]
                }
            }, n.ShapeGeometry = function (e, t) {
                n.Geometry.call(this), this.type = "ShapeGeometry", e instanceof Array == !1 && (e = [e]), this.addShapeList(e, t), this.computeFaceNormals()
            }, n.ShapeGeometry.prototype = Object.create(n.Geometry.prototype), n.ShapeGeometry.prototype.constructor = n.ShapeGeometry, n.ShapeGeometry.prototype.addShapeList = function (e, t) {
                for (var r = 0, i = e.length; i > r; r++) this.addShape(e[r], t);
                return this
            }, n.ShapeGeometry.prototype.addShape = function (e, t) {
                void 0 === t && (t = {});
                var r, i, o, a = void 0 !== t.curveSegments ? t.curveSegments : 12,
                    s = t.material,
                    h = void 0 === t.UVGenerator ? n.ExtrudeGeometry.WorldUVGenerator : t.UVGenerator,
                    l = this.vertices.length,
                    c = e.extractPoints(a),
                    u = c.shape,
                    d = c.holes,
                    p = !n.Shape.Utils.isClockWise(u);
                if (p) {
                    for (u = u.reverse(), r = 0, i = d.length; i > r; r++) o = d[r], n.Shape.Utils.isClockWise(o) && (d[r] = o.reverse());
                    p = !1
                }
                var f = n.Shape.Utils.triangulateShape(u, d);
                for (r = 0, i = d.length; i > r; r++) o = d[r], u = u.concat(o);
                var m, g, v = u.length,
                    y = f.length;
                for (r = 0; v > r; r++) m = u[r], this.vertices.push(new n.Vector3(m.x, m.y, 0));
                for (r = 0; y > r; r++) {
                    g = f[r];
                    var x = g[0] + l,
                        _ = g[1] + l,
                        b = g[2] + l;
                    this.faces.push(new n.Face3(x, _, b, null, null, s)), this.faceVertexUvs[0].push(h.generateTopUV(this, x, _, b))
                }
            }, n.LatheGeometry = function (e, t, r, i) {
                n.Geometry.call(this), this.type = "LatheGeometry", this.parameters = {
                    points: e,
                    segments: t,
                    phiStart: r,
                    phiLength: i
                }, t = t || 12, r = r || 0, i = i || 2 * Math.PI;
                for (var o = 1 / (e.length - 1), a = 1 / t, s = 0, h = t; h >= s; s++)
                    for (var l = r + s * a * i, c = Math.cos(l), u = Math.sin(l), d = 0, p = e.length; p > d; d++) {
                        var f = e[d],
                            m = new n.Vector3;
                        m.x = c * f.x - u * f.y, m.y = u * f.x + c * f.y, m.z = f.z, this.vertices.push(m)
                    }
                for (var g = e.length, s = 0, h = t; h > s; s++)
                    for (var d = 0, p = e.length - 1; p > d; d++) {
                        var v = d + g * s,
                            y = v,
                            x = v + g,
                            c = v + 1 + g,
                            _ = v + 1,
                            b = s * a,
                            w = d * o,
                            M = b + a,
                            S = w + o;
                        this.faces.push(new n.Face3(y, x, _)), this.faceVertexUvs[0].push([new n.Vector2(b, w), new n.Vector2(M, w), new n.Vector2(b, S)]), this.faces.push(new n.Face3(x, c, _)), this.faceVertexUvs[0].push([new n.Vector2(M, w), new n.Vector2(M, S), new n.Vector2(b, S)])
                    }
                this.mergeVertices(), this.computeFaceNormals(), this.computeVertexNormals()
            }, n.LatheGeometry.prototype = Object.create(n.Geometry.prototype), n.LatheGeometry.prototype.constructor = n.LatheGeometry, n.PlaneGeometry = function (e, t, r, i) {
                console.info("THREE.PlaneGeometry: Consider using THREE.PlaneBufferGeometry for lower memory footprint."), n.Geometry.call(this), this.type = "PlaneGeometry", this.parameters = {
                    width: e,
                    height: t,
                    widthSegments: r,
                    heightSegments: i
                }, this.fromBufferGeometry(new n.PlaneBufferGeometry(e, t, r, i))
            }, n.PlaneGeometry.prototype = Object.create(n.Geometry.prototype), n.PlaneGeometry.prototype.constructor = n.PlaneGeometry, n.PlaneBufferGeometry = function (e, t, r, i) {
                n.BufferGeometry.call(this), this.type = "PlaneBufferGeometry", this.parameters = {
                    width: e,
                    height: t,
                    widthSegments: r,
                    heightSegments: i
                };
                for (var o = e / 2, a = t / 2, s = r || 1, h = i || 1, l = s + 1, c = h + 1, u = e / s, d = t / h, p = new Float32Array(l * c * 3), f = new Float32Array(l * c * 3), m = new Float32Array(l * c * 2), g = 0, v = 0, y = 0; c > y; y++)
                    for (var x = y * d - a, _ = 0; l > _; _++) {
                        var b = _ * u - o;
                        p[g] = b, p[g + 1] = -x, f[g + 2] = 1, m[v] = _ / s, m[v + 1] = 1 - y / h, g += 3, v += 2
                    }
                g = 0;
                for (var w = new(p.length / 3 > 65535 ? Uint32Array : Uint16Array)(s * h * 6), y = 0; h > y; y++)
                    for (var _ = 0; s > _; _++) {
                        var M = _ + l * y,
                            S = _ + l * (y + 1),
                            E = _ + 1 + l * (y + 1),
                            T = _ + 1 + l * y;
                        w[g] = M, w[g + 1] = S, w[g + 2] = T, w[g + 3] = S, w[g + 4] = E, w[g + 5] = T, g += 6
                    }
                this.addAttribute("index", new n.BufferAttribute(w, 1)), this.addAttribute("position", new n.BufferAttribute(p, 3)), this.addAttribute("normal", new n.BufferAttribute(f, 3)), this.addAttribute("uv", new n.BufferAttribute(m, 2))
            }, n.PlaneBufferGeometry.prototype = Object.create(n.BufferGeometry.prototype), n.PlaneBufferGeometry.prototype.constructor = n.PlaneBufferGeometry, n.RingGeometry = function (e, t, r, i, o, a) {
                n.Geometry.call(this), this.type = "RingGeometry", this.parameters = {
                    innerRadius: e,
                    outerRadius: t,
                    thetaSegments: r,
                    phiSegments: i,
                    thetaStart: o,
                    thetaLength: a
                }, e = e || 0, t = t || 50, o = void 0 !== o ? o : 0, a = void 0 !== a ? a : 2 * Math.PI, r = void 0 !== r ? Math.max(3, r) : 8, i = void 0 !== i ? Math.max(1, i) : 8;
                var s, h, l = [],
                    c = e,
                    u = (t - e) / i;
                for (s = 0; i + 1 > s; s++) {
                    for (h = 0; r + 1 > h; h++) {
                        var d = new n.Vector3,
                            p = o + h / r * a;
                        d.x = c * Math.cos(p), d.y = c * Math.sin(p), this.vertices.push(d), l.push(new n.Vector2((d.x / t + 1) / 2, (d.y / t + 1) / 2))
                    }
                    c += u
                }
                var f = new n.Vector3(0, 0, 1);
                for (s = 0; i > s; s++) {
                    var m = s * (r + 1);
                    for (h = 0; r > h; h++) {
                        var p = h + m,
                            g = p,
                            v = p + r + 1,
                            y = p + r + 2;
                        this.faces.push(new n.Face3(g, v, y, [f.clone(), f.clone(), f.clone()])), this.faceVertexUvs[0].push([l[g].clone(), l[v].clone(), l[y].clone()]), g = p, v = p + r + 2, y = p + 1, this.faces.push(new n.Face3(g, v, y, [f.clone(), f.clone(), f.clone()])), this.faceVertexUvs[0].push([l[g].clone(), l[v].clone(), l[y].clone()])
                    }
                }
                this.computeFaceNormals(), this.boundingSphere = new n.Sphere(new n.Vector3, c)
            }, n.RingGeometry.prototype = Object.create(n.Geometry.prototype), n.RingGeometry.prototype.constructor = n.RingGeometry, n.SphereGeometry = function (e, t, r, i, o, a, s) {
                n.Geometry.call(this), this.type = "SphereGeometry", this.parameters = {
                    radius: e,
                    widthSegments: t,
                    heightSegments: r,
                    phiStart: i,
                    phiLength: o,
                    thetaStart: a,
                    thetaLength: s
                }, e = e || 50, t = Math.max(3, Math.floor(t) || 8), r = Math.max(2, Math.floor(r) || 6), i = void 0 !== i ? i : 0, o = void 0 !== o ? o : 2 * Math.PI, a = void 0 !== a ? a : 0, s = void 0 !== s ? s : Math.PI;
                var h, l, c = [],
                    u = [];
                for (l = 0; r >= l; l++) {
                    var d = [],
                        p = [];
                    for (h = 0; t >= h; h++) {
                        var f = h / t,
                            m = l / r,
                            g = new n.Vector3;
                        g.x = -e * Math.cos(i + f * o) * Math.sin(a + m * s), g.y = e * Math.cos(a + m * s), g.z = e * Math.sin(i + f * o) * Math.sin(a + m * s), this.vertices.push(g), d.push(this.vertices.length - 1), p.push(new n.Vector2(f, 1 - m))
                    }
                    c.push(d), u.push(p)
                }
                for (l = 0; r > l; l++)
                    for (h = 0; t > h; h++) {
                        var v = c[l][h + 1],
                            y = c[l][h],
                            x = c[l + 1][h],
                            _ = c[l + 1][h + 1],
                            b = this.vertices[v].clone().normalize(),
                            w = this.vertices[y].clone().normalize(),
                            M = this.vertices[x].clone().normalize(),
                            S = this.vertices[_].clone().normalize(),
                            E = u[l][h + 1].clone(),
                            T = u[l][h].clone(),
                            A = u[l + 1][h].clone(),
                            C = u[l + 1][h + 1].clone();
                        Math.abs(this.vertices[v].y) === e ? (E.x = (E.x + T.x) / 2, this.faces.push(new n.Face3(v, x, _, [b, M, S])), this.faceVertexUvs[0].push([E, A, C])) : Math.abs(this.vertices[x].y) === e ? (A.x = (A.x + C.x) / 2, this.faces.push(new n.Face3(v, y, x, [b, w, M])), this.faceVertexUvs[0].push([E, T, A])) : (this.faces.push(new n.Face3(v, y, _, [b, w, S])), this.faceVertexUvs[0].push([E, T, C]), this.faces.push(new n.Face3(y, x, _, [w.clone(), M, S.clone()])), this.faceVertexUvs[0].push([T.clone(), A, C.clone()]))
                    }
                this.computeFaceNormals(), this.boundingSphere = new n.Sphere(new n.Vector3, e)
            }, n.SphereGeometry.prototype = Object.create(n.Geometry.prototype), n.SphereGeometry.prototype.constructor = n.SphereGeometry, n.TextGeometry = function (e, t) {
                t = t || {};
                var r = n.FontUtils.generateShapes(e, t);
                t.amount = void 0 !== t.height ? t.height : 50, void 0 === t.bevelThickness && (t.bevelThickness = 10), void 0 === t.bevelSize && (t.bevelSize = 8), void 0 === t.bevelEnabled && (t.bevelEnabled = !1), n.ExtrudeGeometry.call(this, r, t), this.type = "TextGeometry"
            }, n.TextGeometry.prototype = Object.create(n.ExtrudeGeometry.prototype), n.TextGeometry.prototype.constructor = n.TextGeometry, n.TorusGeometry = function (e, t, r, i, o) {
                n.Geometry.call(this), this.type = "TorusGeometry", this.parameters = {
                    radius: e,
                    tube: t,
                    radialSegments: r,
                    tubularSegments: i,
                    arc: o
                }, e = e || 100, t = t || 40, r = r || 8, i = i || 6, o = o || 2 * Math.PI;
                for (var a = new n.Vector3, s = [], h = [], l = 0; r >= l; l++)
                    for (var c = 0; i >= c; c++) {
                        var u = c / i * o,
                            d = l / r * Math.PI * 2;
                        a.x = e * Math.cos(u), a.y = e * Math.sin(u);
                        var p = new n.Vector3;
                        p.x = (e + t * Math.cos(d)) * Math.cos(u), p.y = (e + t * Math.cos(d)) * Math.sin(u), p.z = t * Math.sin(d), this.vertices.push(p), s.push(new n.Vector2(c / i, l / r)), h.push(p.clone().sub(a).normalize())
                    }
                for (var l = 1; r >= l; l++)
                    for (var c = 1; i >= c; c++) {
                        var f = (i + 1) * l + c - 1,
                            m = (i + 1) * (l - 1) + c - 1,
                            g = (i + 1) * (l - 1) + c,
                            v = (i + 1) * l + c,
                            y = new n.Face3(f, m, v, [h[f].clone(), h[m].clone(), h[v].clone()]);
                        this.faces.push(y), this.faceVertexUvs[0].push([s[f].clone(), s[m].clone(), s[v].clone()]), y = new n.Face3(m, g, v, [h[m].clone(), h[g].clone(), h[v].clone()]), this.faces.push(y), this.faceVertexUvs[0].push([s[m].clone(), s[g].clone(), s[v].clone()])
                    }
                this.computeFaceNormals()
            }, n.TorusGeometry.prototype = Object.create(n.Geometry.prototype), n.TorusGeometry.prototype.constructor = n.TorusGeometry, n.TorusKnotGeometry = function (e, t, r, i, o, a, s) {
                function h(e, t, r, i, o) {
                    var a = Math.cos(e),
                        s = Math.sin(e),
                        h = t / r * e,
                        l = Math.cos(h),
                        c = i * (2 + l) * .5 * a,
                        u = i * (2 + l) * s * .5,
                        d = o * i * Math.sin(h) * .5;
                    return new n.Vector3(c, u, d)
                }
                n.Geometry.call(this), this.type = "TorusKnotGeometry", this.parameters = {
                    radius: e,
                    tube: t,
                    radialSegments: r,
                    tubularSegments: i,
                    p: o,
                    q: a,
                    heightScale: s
                }, e = e || 100, t = t || 40, r = r || 64, i = i || 8, o = o || 2, a = a || 3, s = s || 1;
                for (var l = new Array(r), c = new n.Vector3, u = new n.Vector3, d = new n.Vector3, p = 0; r > p; ++p) {
                    l[p] = new Array(i);
                    var f = p / r * 2 * o * Math.PI,
                        m = h(f, a, o, e, s),
                        g = h(f + .01, a, o, e, s);
                    c.subVectors(g, m), u.addVectors(g, m), d.crossVectors(c, u), u.crossVectors(d, c), d.normalize(), u.normalize();
                    for (var v = 0; i > v; ++v) {
                        var y = v / i * 2 * Math.PI,
                            x = -t * Math.cos(y),
                            _ = t * Math.sin(y),
                            b = new n.Vector3;
                        b.x = m.x + x * u.x + _ * d.x, b.y = m.y + x * u.y + _ * d.y, b.z = m.z + x * u.z + _ * d.z, l[p][v] = this.vertices.push(b) - 1
                    }
                }
                for (var p = 0; r > p; ++p)
                    for (var v = 0; i > v; ++v) {
                        var w = (p + 1) % r,
                            M = (v + 1) % i,
                            S = l[p][v],
                            E = l[w][v],
                            T = l[w][M],
                            A = l[p][M],
                            C = new n.Vector2(p / r, v / i),
                            L = new n.Vector2((p + 1) / r, v / i),
                            R = new n.Vector2((p + 1) / r, (v + 1) / i),
                            P = new n.Vector2(p / r, (v + 1) / i);
                        this.faces.push(new n.Face3(S, E, A)), this.faceVertexUvs[0].push([C, L, P]), this.faces.push(new n.Face3(E, T, A)), this.faceVertexUvs[0].push([L.clone(), R, P.clone()])
                    }
                this.computeFaceNormals(), this.computeVertexNormals()
            }, n.TorusKnotGeometry.prototype = Object.create(n.Geometry.prototype), n.TorusKnotGeometry.prototype.constructor = n.TorusKnotGeometry, n.TubeGeometry = function (e, t, r, i, o, a) {
                function s(e, t, r) {
                    return R.vertices.push(new n.Vector3(e, t, r)) - 1
                }
                n.Geometry.call(this), this.type = "TubeGeometry", this.parameters = {
                    path: e,
                    segments: t,
                    radius: r,
                    radialSegments: i,
                    closed: o
                }, t = t || 64, r = r || 1, i = i || 8, o = o || !1, a = a || n.TubeGeometry.NoTaper;
                var h, l, c, u, d, p, f, m, g, v, y, x, _, b, w, M, S, E, T, A, C, L = [],
                    R = this,
                    P = t + 1,
                    F = new n.Vector3,
                    B = new n.TubeGeometry.FrenetFrames(e, t, o),
                    D = B.tangents,
                    U = B.normals,
                    k = B.binormals;
                for (this.tangents = D, this.normals = U, this.binormals = k, v = 0; P > v; v++)
                    for (L[v] = [], u = v / (P - 1), g = e.getPointAt(u), h = D[v], l = U[v], c = k[v], p = r * a(u), y = 0; i > y; y++) d = y / i * 2 * Math.PI, f = -p * Math.cos(d), m = p * Math.sin(d), F.copy(g), F.x += f * l.x + m * c.x, F.y += f * l.y + m * c.y, F.z += f * l.z + m * c.z, L[v][y] = s(F.x, F.y, F.z);
                for (v = 0; t > v; v++)
                    for (y = 0; i > y; y++) x = o ? (v + 1) % t : v + 1, _ = (y + 1) % i, b = L[v][y], w = L[x][y], M = L[x][_], S = L[v][_], E = new n.Vector2(v / t, y / i), T = new n.Vector2((v + 1) / t, y / i), A = new n.Vector2((v + 1) / t, (y + 1) / i), C = new n.Vector2(v / t, (y + 1) / i), this.faces.push(new n.Face3(b, w, S)), this.faceVertexUvs[0].push([E, T, C]), this.faces.push(new n.Face3(w, M, S)), this.faceVertexUvs[0].push([T.clone(), A, C.clone()]);
                this.computeFaceNormals(), this.computeVertexNormals()
            }, n.TubeGeometry.prototype = Object.create(n.Geometry.prototype), n.TubeGeometry.prototype.constructor = n.TubeGeometry, n.TubeGeometry.NoTaper = function () {
                return 1
            }, n.TubeGeometry.SinusoidalTaper = function (e) {
                return Math.sin(Math.PI * e)
            }, n.TubeGeometry.FrenetFrames = function (e, t, r) {
                function i() {
                    f[0] = new n.Vector3, m[0] = new n.Vector3, a = Number.MAX_VALUE, s = Math.abs(p[0].x), h = Math.abs(p[0].y), l = Math.abs(p[0].z), a >= s && (a = s, d.set(1, 0, 0)), a >= h && (a = h, d.set(0, 1, 0)), a >= l && d.set(0, 0, 1), g.crossVectors(p[0], d).normalize(), f[0].crossVectors(p[0], g), m[0].crossVectors(p[0], f[0])
                }
                var o, a, s, h, l, c, u, d = new n.Vector3,
                    p = [],
                    f = [],
                    m = [],
                    g = new n.Vector3,
                    v = new n.Matrix4,
                    y = t + 1,
                    x = 1e-4;
                for (this.tangents = p, this.normals = f, this.binormals = m, c = 0; y > c; c++) u = c / (y - 1), p[c] = e.getTangentAt(u), p[c].normalize();
                for (i(), c = 1; y > c; c++) f[c] = f[c - 1].clone(), m[c] = m[c - 1].clone(), g.crossVectors(p[c - 1], p[c]), g.length() > x && (g.normalize(), o = Math.acos(n.Math.clamp(p[c - 1].dot(p[c]), -1, 1)), f[c].applyMatrix4(v.makeRotationAxis(g, o))), m[c].crossVectors(p[c], f[c]);
                if (r)
                    for (o = Math.acos(n.Math.clamp(f[0].dot(f[y - 1]), -1, 1)), o /= y - 1, p[0].dot(g.crossVectors(f[0], f[y - 1])) > 0 && (o = -o), c = 1; y > c; c++) f[c].applyMatrix4(v.makeRotationAxis(p[c], o * c)), m[c].crossVectors(p[c], f[c])
            }, n.PolyhedronGeometry = function (e, t, r, i) {
                function o(e) {
                    var t = e.normalize().clone();
                    t.index = u.vertices.push(t) - 1;
                    var r = h(e) / 2 / Math.PI + .5,
                        i = l(e) / Math.PI + .5;
                    return t.uv = new n.Vector2(r, 1 - i), t
                }

                function a(e, t, r) {
                    var i = new n.Face3(e.index, t.index, r.index, [e.clone(), t.clone(), r.clone()]);
                    u.faces.push(i), _.copy(e).add(t).add(r).divideScalar(3);
                    var o = h(_);
                    u.faceVertexUvs[0].push([c(e.uv, e, o), c(t.uv, t, o), c(r.uv, r, o)])
                }

                function s(e, t) {
                    for (var r = Math.pow(2, t), i = o(u.vertices[e.a]), n = o(u.vertices[e.b]), s = o(u.vertices[e.c]), h = [], l = 0; r >= l; l++) {
                        h[l] = [];
                        for (var c = o(i.clone().lerp(s, l / r)), d = o(n.clone().lerp(s, l / r)), p = r - l, f = 0; p >= f; f++) h[l][f] = 0 == f && l == r ? c : o(c.clone().lerp(d, f / p))
                    }
                    for (var l = 0; r > l; l++)
                        for (var f = 0; 2 * (r - l) - 1 > f; f++) {
                            var m = Math.floor(f / 2);
                            f % 2 == 0 ? a(h[l][m + 1], h[l + 1][m], h[l][m]) : a(h[l][m + 1], h[l + 1][m + 1], h[l + 1][m])
                        }
                }

                function h(e) {
                    return Math.atan2(e.z, -e.x)
                }

                function l(e) {
                    return Math.atan2(-e.y, Math.sqrt(e.x * e.x + e.z * e.z))
                }

                function c(e, t, r) {
                    return 0 > r && 1 === e.x && (e = new n.Vector2(e.x - 1, e.y)), 0 === t.x && 0 === t.z && (e = new n.Vector2(r / 2 / Math.PI + .5, e.y)), e.clone()
                }
                n.Geometry.call(this), this.type = "PolyhedronGeometry", this.parameters = {
                    vertices: e,
                    indices: t,
                    radius: r,
                    detail: i
                }, r = r || 1, i = i || 0;
                for (var u = this, d = 0, p = e.length; p > d; d += 3) o(new n.Vector3(e[d], e[d + 1], e[d + 2]));
                for (var f = this.vertices, m = [], d = 0, g = 0, p = t.length; p > d; d += 3, g++) {
                    var v = f[t[d]],
                        y = f[t[d + 1]],
                        x = f[t[d + 2]];
                    m[g] = new n.Face3(v.index, y.index, x.index, [v.clone(), y.clone(), x.clone()])
                }
                for (var _ = new n.Vector3, d = 0, p = m.length; p > d; d++) s(m[d], i);
                for (var d = 0, p = this.faceVertexUvs[0].length; p > d; d++) {
                    var b = this.faceVertexUvs[0][d],
                        w = b[0].x,
                        M = b[1].x,
                        S = b[2].x,
                        E = Math.max(w, Math.max(M, S)),
                        T = Math.min(w, Math.min(M, S));
                    E > .9 && .1 > T && (.2 > w && (b[0].x += 1), .2 > M && (b[1].x += 1), .2 > S && (b[2].x += 1))
                }
                for (var d = 0, p = this.vertices.length; p > d; d++) this.vertices[d].multiplyScalar(r);
                this.mergeVertices(), this.computeFaceNormals(), this.boundingSphere = new n.Sphere(new n.Vector3, r)
            }, n.PolyhedronGeometry.prototype = Object.create(n.Geometry.prototype), n.PolyhedronGeometry.prototype.constructor = n.PolyhedronGeometry, n.DodecahedronGeometry = function (e, t) {
                this.parameters = {
                    radius: e,
                    detail: t
                };
                var r = (1 + Math.sqrt(5)) / 2,
                    i = 1 / r,
                    o = [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -i, -r, 0, -i, r, 0, i, -r, 0, i, r, -i, -r, 0, -i, r, 0, i, -r, 0, i, r, 0, -r, 0, -i, r, 0, -i, -r, 0, i, r, 0, i],
                    a = [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9];
                n.PolyhedronGeometry.call(this, o, a, e, t)
            }, n.DodecahedronGeometry.prototype = Object.create(n.Geometry.prototype), n.DodecahedronGeometry.prototype.constructor = n.DodecahedronGeometry, n.IcosahedronGeometry = function (e, t) {
                var r = (1 + Math.sqrt(5)) / 2,
                    i = [-1, r, 0, 1, r, 0, -1, -r, 0, 1, -r, 0, 0, -1, r, 0, 1, r, 0, -1, -r, 0, 1, -r, r, 0, -1, r, 0, 1, -r, 0, -1, -r, 0, 1],
                    o = [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1];
                n.PolyhedronGeometry.call(this, i, o, e, t), this.type = "IcosahedronGeometry", this.parameters = {
                    radius: e,
                    detail: t
                }
            }, n.IcosahedronGeometry.prototype = Object.create(n.Geometry.prototype),
            n.IcosahedronGeometry.prototype.constructor = n.IcosahedronGeometry, n.OctahedronGeometry = function (e, t) {
                this.parameters = {
                    radius: e,
                    detail: t
                };
                var r = [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
                    i = [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2];
                n.PolyhedronGeometry.call(this, r, i, e, t), this.type = "OctahedronGeometry", this.parameters = {
                    radius: e,
                    detail: t
                }
            }, n.OctahedronGeometry.prototype = Object.create(n.Geometry.prototype), n.OctahedronGeometry.prototype.constructor = n.OctahedronGeometry, n.TetrahedronGeometry = function (e, t) {
                var r = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1],
                    i = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1];
                n.PolyhedronGeometry.call(this, r, i, e, t), this.type = "TetrahedronGeometry", this.parameters = {
                    radius: e,
                    detail: t
                }
            }, n.TetrahedronGeometry.prototype = Object.create(n.Geometry.prototype), n.TetrahedronGeometry.prototype.constructor = n.TetrahedronGeometry, n.ParametricGeometry = function (e, t, r) {
                n.Geometry.call(this), this.type = "ParametricGeometry", this.parameters = {
                    func: e,
                    slices: t,
                    stacks: r
                };
                var i, o, a, s, h, l = this.vertices,
                    c = this.faces,
                    u = this.faceVertexUvs[0],
                    d = t + 1;
                for (i = 0; r >= i; i++)
                    for (h = i / r, o = 0; t >= o; o++) s = o / t, a = e(s, h), l.push(a);
                var p, f, m, g, v, y, x, _;
                for (i = 0; r > i; i++)
                    for (o = 0; t > o; o++) p = i * d + o, f = i * d + o + 1, m = (i + 1) * d + o + 1, g = (i + 1) * d + o, v = new n.Vector2(o / t, i / r), y = new n.Vector2((o + 1) / t, i / r), x = new n.Vector2((o + 1) / t, (i + 1) / r), _ = new n.Vector2(o / t, (i + 1) / r), c.push(new n.Face3(p, f, g)), u.push([v, y, _]), c.push(new n.Face3(f, m, g)), u.push([y.clone(), x, _.clone()]);
                this.computeFaceNormals(), this.computeVertexNormals()
            }, n.ParametricGeometry.prototype = Object.create(n.Geometry.prototype), n.ParametricGeometry.prototype.constructor = n.ParametricGeometry, n.AxisHelper = function (e) {
                e = e || 1;
                var t = new Float32Array([0, 0, 0, e, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e]),
                    r = new Float32Array([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1]),
                    i = new n.BufferGeometry;
                i.addAttribute("position", new n.BufferAttribute(t, 3)), i.addAttribute("color", new n.BufferAttribute(r, 3));
                var o = new n.LineBasicMaterial({
                    vertexColors: n.VertexColors
                });
                n.Line.call(this, i, o, n.LinePieces)
            }, n.AxisHelper.prototype = Object.create(n.Line.prototype), n.AxisHelper.prototype.constructor = n.AxisHelper, n.ArrowHelper = function () {
                var e = new n.Geometry;
                e.vertices.push(new n.Vector3(0, 0, 0), new n.Vector3(0, 1, 0));
                var t = new n.CylinderGeometry(0, .5, 1, 5, 1);
                return t.applyMatrix((new n.Matrix4).makeTranslation(0, -.5, 0)),
                    function (r, i, o, a, s, h) {
                        n.Object3D.call(this), void 0 === a && (a = 16776960), void 0 === o && (o = 1), void 0 === s && (s = .2 * o), void 0 === h && (h = .2 * s), this.position.copy(i), this.line = new n.Line(e, new n.LineBasicMaterial({
                            color: a
                        })), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new n.Mesh(t, new n.MeshBasicMaterial({
                            color: a
                        })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(r), this.setLength(o, s, h)
                    }
            }(), n.ArrowHelper.prototype = Object.create(n.Object3D.prototype), n.ArrowHelper.prototype.constructor = n.ArrowHelper, n.ArrowHelper.prototype.setDirection = function () {
                var e, t = new n.Vector3;
                return function (r) {
                    r.y > .99999 ? this.quaternion.set(0, 0, 0, 1) : r.y < -.99999 ? this.quaternion.set(1, 0, 0, 0) : (t.set(r.z, 0, -r.x).normalize(), e = Math.acos(r.y), this.quaternion.setFromAxisAngle(t, e))
                }
            }(), n.ArrowHelper.prototype.setLength = function (e, t, r) {
                void 0 === t && (t = .2 * e), void 0 === r && (r = .2 * t), this.line.scale.set(1, e - t, 1), this.line.updateMatrix(), this.cone.scale.set(r, t, r), this.cone.position.y = e, this.cone.updateMatrix()
            }, n.ArrowHelper.prototype.setColor = function (e) {
                this.line.material.color.set(e), this.cone.material.color.set(e)
            }, n.BoxHelper = function (e) {
                var t = new n.BufferGeometry;
                t.addAttribute("position", new n.BufferAttribute(new Float32Array(72), 3)), n.Line.call(this, t, new n.LineBasicMaterial({
                    color: 16776960
                }), n.LinePieces), void 0 !== e && this.update(e)
            }, n.BoxHelper.prototype = Object.create(n.Line.prototype), n.BoxHelper.prototype.constructor = n.BoxHelper, n.BoxHelper.prototype.update = function (e) {
                var t = e.geometry;
                null === t.boundingBox && t.computeBoundingBox();
                var r = t.boundingBox.min,
                    i = t.boundingBox.max,
                    n = this.geometry.attributes.position.array;
                n[0] = i.x, n[1] = i.y, n[2] = i.z, n[3] = r.x, n[4] = i.y, n[5] = i.z, n[6] = r.x, n[7] = i.y, n[8] = i.z, n[9] = r.x, n[10] = r.y, n[11] = i.z, n[12] = r.x, n[13] = r.y, n[14] = i.z, n[15] = i.x, n[16] = r.y, n[17] = i.z, n[18] = i.x, n[19] = r.y, n[20] = i.z, n[21] = i.x, n[22] = i.y, n[23] = i.z, n[24] = i.x, n[25] = i.y, n[26] = r.z, n[27] = r.x, n[28] = i.y, n[29] = r.z, n[30] = r.x, n[31] = i.y, n[32] = r.z, n[33] = r.x, n[34] = r.y, n[35] = r.z, n[36] = r.x, n[37] = r.y, n[38] = r.z, n[39] = i.x, n[40] = r.y, n[41] = r.z, n[42] = i.x, n[43] = r.y, n[44] = r.z, n[45] = i.x, n[46] = i.y, n[47] = r.z, n[48] = i.x, n[49] = i.y, n[50] = i.z, n[51] = i.x, n[52] = i.y, n[53] = r.z, n[54] = r.x, n[55] = i.y, n[56] = i.z, n[57] = r.x, n[58] = i.y, n[59] = r.z, n[60] = r.x, n[61] = r.y, n[62] = i.z, n[63] = r.x, n[64] = r.y, n[65] = r.z, n[66] = i.x, n[67] = r.y, n[68] = i.z, n[69] = i.x, n[70] = r.y, n[71] = r.z, this.geometry.attributes.position.needsUpdate = !0, this.geometry.computeBoundingSphere(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
            }, n.BoundingBoxHelper = function (e, t) {
                var r = void 0 !== t ? t : 8947848;
                this.object = e, this.box = new n.Box3, n.Mesh.call(this, new n.BoxGeometry(1, 1, 1), new n.MeshBasicMaterial({
                    color: r,
                    wireframe: !0
                }))
            }, n.BoundingBoxHelper.prototype = Object.create(n.Mesh.prototype), n.BoundingBoxHelper.prototype.constructor = n.BoundingBoxHelper, n.BoundingBoxHelper.prototype.update = function () {
                this.box.setFromObject(this.object), this.box.size(this.scale), this.box.center(this.position)
            }, n.CameraHelper = function (e) {
                function t(e, t, i) {
                    r(e, i), r(t, i)
                }

                function r(e, t) {
                    i.vertices.push(new n.Vector3), i.colors.push(new n.Color(t)), void 0 === a[e] && (a[e] = []), a[e].push(i.vertices.length - 1)
                }
                var i = new n.Geometry,
                    o = new n.LineBasicMaterial({
                        color: 16777215,
                        vertexColors: n.FaceColors
                    }),
                    a = {},
                    s = 16755200,
                    h = 16711680,
                    l = 43775,
                    c = 16777215,
                    u = 3355443;
                t("n1", "n2", s), t("n2", "n4", s), t("n4", "n3", s), t("n3", "n1", s), t("f1", "f2", s), t("f2", "f4", s), t("f4", "f3", s), t("f3", "f1", s), t("n1", "f1", s), t("n2", "f2", s), t("n3", "f3", s), t("n4", "f4", s), t("p", "n1", h), t("p", "n2", h), t("p", "n3", h), t("p", "n4", h), t("u1", "u2", l), t("u2", "u3", l), t("u3", "u1", l), t("c", "t", c), t("p", "c", u), t("cn1", "cn2", u), t("cn3", "cn4", u), t("cf1", "cf2", u), t("cf3", "cf4", u), n.Line.call(this, i, o, n.LinePieces), this.camera = e, this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = a, this.update()
            }, n.CameraHelper.prototype = Object.create(n.Line.prototype), n.CameraHelper.prototype.constructor = n.CameraHelper, n.CameraHelper.prototype.update = function () {
                var e, t, r = new n.Vector3,
                    i = new n.Camera,
                    o = function (n, o, a, s) {
                        r.set(o, a, s).unproject(i);
                        var h = t[n];
                        if (void 0 !== h)
                            for (var l = 0, c = h.length; c > l; l++) e.vertices[h[l]].copy(r)
                    };
                return function () {
                    e = this.geometry, t = this.pointMap;
                    var r = 1,
                        n = 1;
                    i.projectionMatrix.copy(this.camera.projectionMatrix), o("c", 0, 0, -1), o("t", 0, 0, 1), o("n1", -r, -n, -1), o("n2", r, -n, -1), o("n3", -r, n, -1), o("n4", r, n, -1), o("f1", -r, -n, 1), o("f2", r, -n, 1), o("f3", -r, n, 1), o("f4", r, n, 1), o("u1", .7 * r, 1.1 * n, -1), o("u2", .7 * -r, 1.1 * n, -1), o("u3", 0, 2 * n, -1), o("cf1", -r, 0, 1), o("cf2", r, 0, 1), o("cf3", 0, -n, 1), o("cf4", 0, n, 1), o("cn1", -r, 0, -1), o("cn2", r, 0, -1), o("cn3", 0, -n, -1), o("cn4", 0, n, -1), e.verticesNeedUpdate = !0
                }
            }(), n.DirectionalLightHelper = function (e, t) {
                n.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, t = t || 1;
                var r = new n.Geometry;
                r.vertices.push(new n.Vector3(-t, t, 0), new n.Vector3(t, t, 0), new n.Vector3(t, -t, 0), new n.Vector3(-t, -t, 0), new n.Vector3(-t, t, 0));
                var i = new n.LineBasicMaterial({
                    fog: !1
                });
                i.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightPlane = new n.Line(r, i), this.add(this.lightPlane), r = new n.Geometry, r.vertices.push(new n.Vector3, new n.Vector3), i = new n.LineBasicMaterial({
                    fog: !1
                }), i.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine = new n.Line(r, i), this.add(this.targetLine), this.update()
            }, n.DirectionalLightHelper.prototype = Object.create(n.Object3D.prototype), n.DirectionalLightHelper.prototype.constructor = n.DirectionalLightHelper, n.DirectionalLightHelper.prototype.dispose = function () {
                this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), this.targetLine.material.dispose()
            }, n.DirectionalLightHelper.prototype.update = function () {
                var e = new n.Vector3,
                    t = new n.Vector3,
                    r = new n.Vector3;
                return function () {
                    e.setFromMatrixPosition(this.light.matrixWorld), t.setFromMatrixPosition(this.light.target.matrixWorld), r.subVectors(t, e), this.lightPlane.lookAt(r), this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine.geometry.vertices[1].copy(r), this.targetLine.geometry.verticesNeedUpdate = !0, this.targetLine.material.color.copy(this.lightPlane.material.color)
                }
            }(), n.EdgesHelper = function (e, t, r) {
                var i = void 0 !== t ? t : 16777215;
                r = void 0 !== r ? r : 1;
                var o, a = Math.cos(n.Math.degToRad(r)),
                    s = [0, 0],
                    h = {},
                    l = function (e, t) {
                        return e - t
                    },
                    c = ["a", "b", "c"],
                    u = new n.BufferGeometry;
                e.geometry instanceof n.BufferGeometry ? (o = new n.Geometry, o.fromBufferGeometry(e.geometry)) : o = e.geometry.clone(), o.mergeVertices(), o.computeFaceNormals();
                for (var d = o.vertices, p = o.faces, f = 0, m = 0, g = p.length; g > m; m++)
                    for (var v = p[m], y = 0; 3 > y; y++) {
                        s[0] = v[c[y]], s[1] = v[c[(y + 1) % 3]], s.sort(l);
                        var x = s.toString();
                        void 0 === h[x] ? (h[x] = {
                            vert1: s[0],
                            vert2: s[1],
                            face1: m,
                            face2: void 0
                        }, f++) : h[x].face2 = m
                    }
                var _ = new Float32Array(2 * f * 3),
                    b = 0;
                for (var x in h) {
                    var w = h[x];
                    if (void 0 === w.face2 || p[w.face1].normal.dot(p[w.face2].normal) <= a) {
                        var M = d[w.vert1];
                        _[b++] = M.x, _[b++] = M.y, _[b++] = M.z, M = d[w.vert2], _[b++] = M.x, _[b++] = M.y, _[b++] = M.z
                    }
                }
                u.addAttribute("position", new n.BufferAttribute(_, 3)), n.Line.call(this, u, new n.LineBasicMaterial({
                    color: i
                }), n.LinePieces), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
            }, n.EdgesHelper.prototype = Object.create(n.Line.prototype), n.EdgesHelper.prototype.constructor = n.EdgesHelper, n.FaceNormalsHelper = function (e, t, r, i) {
                this.object = e, this.size = void 0 !== t ? t : 1;
                for (var o = void 0 !== r ? r : 16776960, a = void 0 !== i ? i : 1, s = new n.Geometry, h = this.object.geometry.faces, l = 0, c = h.length; c > l; l++) s.vertices.push(new n.Vector3, new n.Vector3);
                n.Line.call(this, s, new n.LineBasicMaterial({
                    color: o,
                    linewidth: a
                }), n.LinePieces), this.matrixAutoUpdate = !1, this.normalMatrix = new n.Matrix3, this.update()
            }, n.FaceNormalsHelper.prototype = Object.create(n.Line.prototype), n.FaceNormalsHelper.prototype.constructor = n.FaceNormalsHelper, n.FaceNormalsHelper.prototype.update = function () {
                var e = this.geometry.vertices,
                    t = this.object,
                    r = t.geometry.vertices,
                    i = t.geometry.faces,
                    n = t.matrixWorld;
                t.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(n);
                for (var o = 0, a = 0, s = i.length; s > o; o++, a += 2) {
                    var h = i[o];
                    e[a].copy(r[h.a]).add(r[h.b]).add(r[h.c]).divideScalar(3).applyMatrix4(n), e[a + 1].copy(h.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size).add(e[a])
                }
                return this.geometry.verticesNeedUpdate = !0, this
            }, n.GridHelper = function (e, t) {
                var r = new n.Geometry,
                    i = new n.LineBasicMaterial({
                        vertexColors: n.VertexColors
                    });
                this.color1 = new n.Color(4473924), this.color2 = new n.Color(8947848);
                for (var o = -e; e >= o; o += t) {
                    r.vertices.push(new n.Vector3(-e, 0, o), new n.Vector3(e, 0, o), new n.Vector3(o, 0, -e), new n.Vector3(o, 0, e));
                    var a = 0 === o ? this.color1 : this.color2;
                    r.colors.push(a, a, a, a)
                }
                n.Line.call(this, r, i, n.LinePieces)
            }, n.GridHelper.prototype = Object.create(n.Line.prototype), n.GridHelper.prototype.constructor = n.GridHelper, n.GridHelper.prototype.setColors = function (e, t) {
                this.color1.set(e), this.color2.set(t), this.geometry.colorsNeedUpdate = !0
            }, n.HemisphereLightHelper = function (e, t) {
                n.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.colors = [new n.Color, new n.Color];
                var r = new n.SphereGeometry(t, 4, 2);
                r.applyMatrix((new n.Matrix4).makeRotationX(-Math.PI / 2));
                for (var i = 0, o = 8; o > i; i++) r.faces[i].color = this.colors[4 > i ? 0 : 1];
                var a = new n.MeshBasicMaterial({
                    vertexColors: n.FaceColors,
                    wireframe: !0
                });
                this.lightSphere = new n.Mesh(r, a), this.add(this.lightSphere), this.update()
            }, n.HemisphereLightHelper.prototype = Object.create(n.Object3D.prototype), n.HemisphereLightHelper.prototype.constructor = n.HemisphereLightHelper, n.HemisphereLightHelper.prototype.dispose = function () {
                this.lightSphere.geometry.dispose(), this.lightSphere.material.dispose()
            }, n.HemisphereLightHelper.prototype.update = function () {
                var e = new n.Vector3;
                return function () {
                    this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity), this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity), this.lightSphere.lookAt(e.setFromMatrixPosition(this.light.matrixWorld).negate()), this.lightSphere.geometry.colorsNeedUpdate = !0
                }
            }(), n.PointLightHelper = function (e, t) {
                this.light = e, this.light.updateMatrixWorld();
                var r = new n.SphereGeometry(t, 4, 2),
                    i = new n.MeshBasicMaterial({
                        wireframe: !0,
                        fog: !1
                    });
                i.color.copy(this.light.color).multiplyScalar(this.light.intensity), n.Mesh.call(this, r, i), this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1
            }, n.PointLightHelper.prototype = Object.create(n.Mesh.prototype), n.PointLightHelper.prototype.constructor = n.PointLightHelper, n.PointLightHelper.prototype.dispose = function () {
                this.geometry.dispose(), this.material.dispose()
            }, n.PointLightHelper.prototype.update = function () {
                this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
            }, n.SkeletonHelper = function (e) {
                this.bones = this.getBoneList(e);
                for (var t = new n.Geometry, r = 0; r < this.bones.length; r++) {
                    var i = this.bones[r];
                    i.parent instanceof n.Bone && (t.vertices.push(new n.Vector3), t.vertices.push(new n.Vector3), t.colors.push(new n.Color(0, 0, 1)), t.colors.push(new n.Color(0, 1, 0)))
                }
                var o = new n.LineBasicMaterial({
                    vertexColors: n.VertexColors,
                    depthTest: !1,
                    depthWrite: !1,
                    transparent: !0
                });
                n.Line.call(this, t, o, n.LinePieces), this.root = e, this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1, this.update()
            }, n.SkeletonHelper.prototype = Object.create(n.Line.prototype), n.SkeletonHelper.prototype.constructor = n.SkeletonHelper, n.SkeletonHelper.prototype.getBoneList = function (e) {
                var t = [];
                e instanceof n.Bone && t.push(e);
                for (var r = 0; r < e.children.length; r++) t.push.apply(t, this.getBoneList(e.children[r]));
                return t
            }, n.SkeletonHelper.prototype.update = function () {
                for (var e = this.geometry, t = (new n.Matrix4).getInverse(this.root.matrixWorld), r = new n.Matrix4, i = 0, o = 0; o < this.bones.length; o++) {
                    var a = this.bones[o];
                    a.parent instanceof n.Bone && (r.multiplyMatrices(t, a.matrixWorld), e.vertices[i].setFromMatrixPosition(r), r.multiplyMatrices(t, a.parent.matrixWorld), e.vertices[i + 1].setFromMatrixPosition(r), i += 2)
                }
                e.verticesNeedUpdate = !0, e.computeBoundingSphere()
            }, n.SpotLightHelper = function (e) {
                n.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1;
                var t = new n.CylinderGeometry(0, 1, 1, 8, 1, !0);
                t.applyMatrix((new n.Matrix4).makeTranslation(0, -.5, 0)), t.applyMatrix((new n.Matrix4).makeRotationX(-Math.PI / 2));
                var r = new n.MeshBasicMaterial({
                    wireframe: !0,
                    fog: !1
                });
                this.cone = new n.Mesh(t, r), this.add(this.cone), this.update()
            }, n.SpotLightHelper.prototype = Object.create(n.Object3D.prototype), n.SpotLightHelper.prototype.constructor = n.SpotLightHelper, n.SpotLightHelper.prototype.dispose = function () {
                this.cone.geometry.dispose(), this.cone.material.dispose()
            }, n.SpotLightHelper.prototype.update = function () {
                var e = new n.Vector3,
                    t = new n.Vector3;
                return function () {
                    var r = this.light.distance ? this.light.distance : 1e4,
                        i = r * Math.tan(this.light.angle);
                    this.cone.scale.set(i, i, r), e.setFromMatrixPosition(this.light.matrixWorld), t.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(t.sub(e)), this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
                }
            }(), n.VertexNormalsHelper = function (e, t, r, i) {
                this.object = e, this.size = void 0 !== t ? t : 1;
                for (var o = void 0 !== r ? r : 16711680, a = void 0 !== i ? i : 1, s = new n.Geometry, h = e.geometry.faces, l = 0, c = h.length; c > l; l++)
                    for (var u = h[l], d = 0, p = u.vertexNormals.length; p > d; d++) s.vertices.push(new n.Vector3, new n.Vector3);
                n.Line.call(this, s, new n.LineBasicMaterial({
                    color: o,
                    linewidth: a
                }), n.LinePieces), this.matrixAutoUpdate = !1, this.normalMatrix = new n.Matrix3, this.update()
            }, n.VertexNormalsHelper.prototype = Object.create(n.Line.prototype), n.VertexNormalsHelper.prototype.constructor = n.VertexNormalsHelper, n.VertexNormalsHelper.prototype.update = function () {
                var e = new n.Vector3;
                return function () {
                    var t = ["a", "b", "c", "d"];
                    this.object.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
                    for (var r = this.geometry.vertices, i = this.object.geometry.vertices, n = this.object.geometry.faces, o = this.object.matrixWorld, a = 0, s = 0, h = n.length; h > s; s++)
                        for (var l = n[s], c = 0, u = l.vertexNormals.length; u > c; c++) {
                            var d = l[t[c]],
                                p = i[d],
                                f = l.vertexNormals[c];
                            r[a].copy(p).applyMatrix4(o), e.copy(f).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size), e.add(r[a]), a += 1, r[a].copy(e), a += 1
                        }
                    return this.geometry.verticesNeedUpdate = !0, this
                }
            }(), n.VertexTangentsHelper = function (e, t, r, i) {
                this.object = e, this.size = void 0 !== t ? t : 1;
                for (var o = void 0 !== r ? r : 255, a = void 0 !== i ? i : 1, s = new n.Geometry, h = e.geometry.faces, l = 0, c = h.length; c > l; l++)
                    for (var u = h[l], d = 0, p = u.vertexTangents.length; p > d; d++) s.vertices.push(new n.Vector3), s.vertices.push(new n.Vector3);
                n.Line.call(this, s, new n.LineBasicMaterial({
                    color: o,
                    linewidth: a
                }), n.LinePieces), this.matrixAutoUpdate = !1, this.update()
            }, n.VertexTangentsHelper.prototype = Object.create(n.Line.prototype), n.VertexTangentsHelper.prototype.constructor = n.VertexTangentsHelper, n.VertexTangentsHelper.prototype.update = function () {
                var e = new n.Vector3;
                return function () {
                    var t = ["a", "b", "c", "d"];
                    this.object.updateMatrixWorld(!0);
                    for (var r = this.geometry.vertices, i = this.object.geometry.vertices, n = this.object.geometry.faces, o = this.object.matrixWorld, a = 0, s = 0, h = n.length; h > s; s++)
                        for (var l = n[s], c = 0, u = l.vertexTangents.length; u > c; c++) {
                            var d = l[t[c]],
                                p = i[d],
                                f = l.vertexTangents[c];
                            r[a].copy(p).applyMatrix4(o), e.copy(f).transformDirection(o).multiplyScalar(this.size), e.add(r[a]), a += 1, r[a].copy(e), a += 1
                        }
                    return this.geometry.verticesNeedUpdate = !0, this
                }
            }(), n.WireframeHelper = function (e, t) {
                var r = void 0 !== t ? t : 16777215,
                    i = [0, 0],
                    o = {},
                    a = function (e, t) {
                        return e - t
                    },
                    s = ["a", "b", "c"],
                    h = new n.BufferGeometry;
                if (e.geometry instanceof n.Geometry) {
                    for (var l = e.geometry.vertices, c = e.geometry.faces, u = 0, d = new Uint32Array(6 * c.length), p = 0, f = c.length; f > p; p++)
                        for (var m = c[p], g = 0; 3 > g; g++) {
                            i[0] = m[s[g]], i[1] = m[s[(g + 1) % 3]], i.sort(a);
                            var v = i.toString();
                            void 0 === o[v] && (d[2 * u] = i[0], d[2 * u + 1] = i[1], o[v] = !0, u++)
                        }
                    for (var y = new Float32Array(2 * u * 3), p = 0, f = u; f > p; p++)
                        for (var g = 0; 2 > g; g++) {
                            var x = l[d[2 * p + g]],
                                _ = 6 * p + 3 * g;
                            y[_ + 0] = x.x, y[_ + 1] = x.y, y[_ + 2] = x.z
                        }
                    h.addAttribute("position", new n.BufferAttribute(y, 3))
                } else if (e.geometry instanceof n.BufferGeometry)
                    if (void 0 !== e.geometry.attributes.index) {
                        var l = e.geometry.attributes.position.array,
                            b = e.geometry.attributes.index.array,
                            w = e.geometry.drawcalls,
                            u = 0;
                        0 === w.length && (w = [{
                            count: b.length,
                            index: 0,
                            start: 0
                        }]);
                        for (var d = new Uint32Array(2 * b.length), M = 0, S = w.length; S > M; ++M)
                            for (var E = w[M].start, T = w[M].count, _ = w[M].index, p = E, A = E + T; A > p; p += 3)
                                for (var g = 0; 3 > g; g++) {
                                    i[0] = _ + b[p + g], i[1] = _ + b[p + (g + 1) % 3], i.sort(a);
                                    var v = i.toString();
                                    void 0 === o[v] && (d[2 * u] = i[0], d[2 * u + 1] = i[1], o[v] = !0, u++)
                                }
                        for (var y = new Float32Array(2 * u * 3), p = 0, f = u; f > p; p++)
                            for (var g = 0; 2 > g; g++) {
                                var _ = 6 * p + 3 * g,
                                    C = 3 * d[2 * p + g];
                                y[_ + 0] = l[C], y[_ + 1] = l[C + 1], y[_ + 2] = l[C + 2]
                            }
                        h.addAttribute("position", new n.BufferAttribute(y, 3))
                    } else {
                        for (var l = e.geometry.attributes.position.array, u = l.length / 3, L = u / 3, y = new Float32Array(2 * u * 3), p = 0, f = L; f > p; p++)
                            for (var g = 0; 3 > g; g++) {
                                var _ = 18 * p + 6 * g,
                                    R = 9 * p + 3 * g;
                                y[_ + 0] = l[R], y[_ + 1] = l[R + 1], y[_ + 2] = l[R + 2];
                                var C = 9 * p + 3 * ((g + 1) % 3);
                                y[_ + 3] = l[C], y[_ + 4] = l[C + 1], y[_ + 5] = l[C + 2]
                            }
                        h.addAttribute("position", new n.BufferAttribute(y, 3))
                    } n.Line.call(this, h, new n.LineBasicMaterial({
                    color: r
                }), n.LinePieces), this.matrix = e.matrixWorld, this.matrixAutoUpdate = !1
            }, n.WireframeHelper.prototype = Object.create(n.Line.prototype), n.WireframeHelper.prototype.constructor = n.WireframeHelper, n.ImmediateRenderObject = function () {
                n.Object3D.call(this), this.render = function () {}
            }, n.ImmediateRenderObject.prototype = Object.create(n.Object3D.prototype), n.ImmediateRenderObject.prototype.constructor = n.ImmediateRenderObject, n.MorphBlendMesh = function (e, t) {
                n.Mesh.call(this, e, t), this.animationsMap = {}, this.animationsList = [];
                var r = this.geometry.morphTargets.length,
                    i = "__default",
                    o = 0,
                    a = r - 1,
                    s = r / 1;
                this.createAnimation(i, o, a, s), this.setAnimationWeight(i, 1)
            }, n.MorphBlendMesh.prototype = Object.create(n.Mesh.prototype), n.MorphBlendMesh.prototype.constructor = n.MorphBlendMesh, n.MorphBlendMesh.prototype.createAnimation = function (e, t, r, i) {
                var n = {
                    startFrame: t,
                    endFrame: r,
                    length: r - t + 1,
                    fps: i,
                    duration: (r - t) / i,
                    lastFrame: 0,
                    currentFrame: 0,
                    active: !1,
                    time: 0,
                    direction: 1,
                    weight: 1,
                    directionBackwards: !1,
                    mirroredLoop: !1
                };
                this.animationsMap[e] = n, this.animationsList.push(n)
            }, n.MorphBlendMesh.prototype.autoCreateAnimations = function (e) {
                for (var t, r = /([a-z]+)_?(\d+)/, i = {}, n = this.geometry, o = 0, a = n.morphTargets.length; a > o; o++) {
                    var s = n.morphTargets[o],
                        h = s.name.match(r);
                    if (h && h.length > 1) {
                        var l = h[1];
                        i[l] || (i[l] = {
                            start: 1 / 0,
                            end: -(1 / 0)
                        });
                        var c = i[l];
                        o < c.start && (c.start = o), o > c.end && (c.end = o), t || (t = l)
                    }
                }
                for (var l in i) {
                    var c = i[l];
                    this.createAnimation(l, c.start, c.end, e)
                }
                this.firstAnimation = t
            }, n.MorphBlendMesh.prototype.setAnimationDirectionForward = function (e) {
                var t = this.animationsMap[e];
                t && (t.direction = 1, t.directionBackwards = !1)
            }, n.MorphBlendMesh.prototype.setAnimationDirectionBackward = function (e) {
                var t = this.animationsMap[e];
                t && (t.direction = -1, t.directionBackwards = !0)
            }, n.MorphBlendMesh.prototype.setAnimationFPS = function (e, t) {
                var r = this.animationsMap[e];
                r && (r.fps = t, r.duration = (r.end - r.start) / r.fps)
            }, n.MorphBlendMesh.prototype.setAnimationDuration = function (e, t) {
                var r = this.animationsMap[e];
                r && (r.duration = t, r.fps = (r.end - r.start) / r.duration)
            }, n.MorphBlendMesh.prototype.setAnimationWeight = function (e, t) {
                var r = this.animationsMap[e];
                r && (r.weight = t)
            }, n.MorphBlendMesh.prototype.setAnimationTime = function (e, t) {
                var r = this.animationsMap[e];
                r && (r.time = t)
            }, n.MorphBlendMesh.prototype.getAnimationTime = function (e) {
                var t = 0,
                    r = this.animationsMap[e];
                return r && (t = r.time), t
            }, n.MorphBlendMesh.prototype.getAnimationDuration = function (e) {
                var t = -1,
                    r = this.animationsMap[e];
                return r && (t = r.duration), t
            }, n.MorphBlendMesh.prototype.playAnimation = function (e) {
                var t = this.animationsMap[e];
                t ? (t.time = 0, t.active = !0) : n.warn("THREE.MorphBlendMesh: animation[" + e + "] undefined in .playAnimation()")
            }, n.MorphBlendMesh.prototype.stopAnimation = function (e) {
                var t = this.animationsMap[e];
                t && (t.active = !1)
            }, n.MorphBlendMesh.prototype.update = function (e) {
                for (var t = 0, r = this.animationsList.length; r > t; t++) {
                    var i = this.animationsList[t];
                    if (i.active) {
                        var o = i.duration / i.length;
                        i.time += i.direction * e, i.mirroredLoop ? (i.time > i.duration || i.time < 0) && (i.direction *= -1, i.time > i.duration && (i.time = i.duration, i.directionBackwards = !0), i.time < 0 && (i.time = 0, i.directionBackwards = !1)) : (i.time = i.time % i.duration, i.time < 0 && (i.time += i.duration));
                        var a = i.startFrame + n.Math.clamp(Math.floor(i.time / o), 0, i.length - 1),
                            s = i.weight;
                        a !== i.currentFrame && (this.morphTargetInfluences[i.lastFrame] = 0, this.morphTargetInfluences[i.currentFrame] = 1 * s, this.morphTargetInfluences[a] = 0, i.lastFrame = i.currentFrame, i.currentFrame = a);
                        var h = i.time % o / o;
                        i.directionBackwards && (h = 1 - h), this.morphTargetInfluences[i.currentFrame] = h * s, this.morphTargetInfluences[i.lastFrame] = (1 - h) * s
                    }
                }
            }, "undefined" != typeof r ? ("undefined" != typeof t && t.exports && (r = t.exports = n), r.THREE = n) : this.THREE = n
    }, {}],
    7: [function (e, t) {
        var r = {
            floor: function (e) {
                return e >> 0
            },
            round: function (e) {
                return ~~(e + .5)
            },
            coin: function (e) {
                return Math.random() < (e ? e : .5)
            },
            coinN: function (e) {
                return Math.random() < (e ? e : .5) ? 1 : -1
            },
            rad: function (e) {
                return e * Math.PI / 180
            },
            random: function (e, t) {
                return t = t || 0, Math.random() * (e - t) + t
            },
            rrandom: function (e, t) {
                return t = t || 0, ~~(Math.random() * (e - t) + t + .5)
            },
            genNum: function () {
                for (var e = "", t = 0; t < howMany;) e += "9", t++;
                var r = Math.round(Math.random() * Number(e)).toString(),
                    i = "";
                for (t = r.length; t < howMany;) i += "0", t++;
                return i += r.toString()
            },
            randomArray: function (e) {
                if ("number" == typeof e)
                    for (var t = [], r = e - 1; r >= 0; r--) t.push(r);
                else var t = e;
                for (r = t.length; r--;) t.push(t.splice(Math.floor(Math.random() * (r + 1)), 1)[0]);
                return t
            },
            clamp: function (e, t, r) {
                return Math.max(t, Math.min(r, e))
            },
            near: function (e, t, r) {
                return Math.abs(e - t) <= r
            },
            map: function (e, t, r, i, n) {
                return (Math.max(t, Math.min(r, e)) - t) / (r - t) * (n - i) + i
            },
            lerp: function (e, t, r) {
                return t + (r - t) * e
            },
            norm: function (e, t, r) {
                return (e - t) / (r - t)
            },
            steps: function (e, t, r) {
                return (e / t >> 0) % r
            },
            between: function (e, t, r) {
                return isNaN(e) || isNaN(t) || isNaN(r) ? 0 / 0 : e >= Math.min(t, r) && e <= Math.max(t, r)
            },
            interpolate: {
                spherical: function (e, t, r) {
                    return e * (1 - r) + t * r
                },
                linear: function (e, t, r) {
                    return e + (t - e) * r
                }
            },
            ease: {
                linear: function (e) {
                    return e
                },
                inQuad: function (e) {
                    return Math.pow(e, 2)
                },
                outQuad: function (e) {
                    return -(Math.pow(e - 1, 2) - 1)
                },
                inOutQuad: function (e) {
                    return (e /= .5) < 1 ? .5 * Math.pow(e, 2) : -.5 * ((e -= 2) * e - 2)
                },
                inCubic: function (e) {
                    return Math.pow(e, 3)
                },
                outCubic: function (e) {
                    return Math.pow(e - 1, 3) + 1
                }
            }
        };
        "object" == typeof t && (t.exports = r)
    }, {}],
    8: [function (e, t, r) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r), i && e(t, i), t
                }
            }(),
            a = e("three"),
            s = i(a),
            h = e("three-orbit-controls"),
            l = i(h),
            c = e("dat-gui"),
            u = i(c),
            d = e("stats-js"),
            p = i(d),
            f = e("utils-perf"),
            m = i(f),
            g = function () {
                function e() {
                    n(this, e), this.type = "square", this.materialType = "MeshBasicMaterial", this.numObjects = 15, this.move = !0, this.amount = 180, this.size = 45, this.speed = .04, this.spacing = 3.5, this.startStats(), this.startGUI(), this.renderer = null, this.camera = null, this.scene = null, this.counter = 0, this.clock = new s["default"].Clock, this.createRender(), this.createScene(), this.addObjects(), this.onResize(), this.update()
                }
                return o(e, [{
                    key: "startStats",
                    value: function () {
                        this.stats = new p["default"], this.stats.domElement.style.position = "absolute", document.body.appendChild(this.stats.domElement)
                    }
                }, {
                    key: "createRender",
                    value: function () {
                        this.renderer = new s["default"].WebGLRenderer({
                            antialias: !0,
                            clearColor: 0
                        }), document.body.appendChild(this.renderer.domElement)
                    }
                }, {
                    key: "createScene",
                    value: function () {
                        var e = l["default"](s["default"]);
                        this.camera = new s["default"].PerspectiveCamera(45, window.innerWidth / window.innerHeight, .01, 4e3), this.camera.position.set(0, 0, 800), this.controls = new e(this.camera, this.renderer.domElement), this.controls.maxDistance = 800, this.scene = new s["default"].Scene
                    }
                }, {
                    key: "createGeometry",
                    value: function () {
                        switch (this.shape = new s["default"].Shape, this.type) {
                            case "triangle":
                                this.shape.moveTo(-this.size / 2, 0), this.shape.lineTo(0, this.size / 2 * Math.PI / 2), this.shape.lineTo(this.size / 2, 0), this.shape.lineTo(-this.size / 2, 0);
                                break;
                            case "inverted":
                                this.shape.moveTo(0, 0), this.shape.lineTo(-this.size / 2, this.size / 2), this.shape.lineTo(this.size / 2, this.size / 2), this.shape.lineTo(0, 0);
                                break;
                            case "square":
                                this.shape.moveTo(-this.size, -this.size), this.shape.lineTo(-this.size, this.size), this.shape.lineTo(this.size, this.size), this.shape.lineTo(this.size, -this.size), this.shape.lineTo(-this.size, -this.size)
                        }
                        this.rectGeom = new s["default"].ShapeGeometry(this.shape)
                    }
                }, {
                    key: "addObjects",
                    value: function () {
                        for (; this.scene.children.length > 0;) this.scene.remove(this.scene.children[0]);
                        this.material = new s["default"][this.materialType]({
                            wireframe: !0
                        }), this.createGeometry(), this.container = new s["default"].Object3D, this.triangles = [];
                        for (var e = 0; e < this.numObjects; e++) {
                            var t = this.generateObject();
                            t.rotation.y = 360 / this.numObjects * e * Math.PI / 180, this.container.add(t)
                        }
                        this.container.rotation.x = 90 * Math.PI / 180, this.scene.add(this.container)
                    }
                }, {
                    key: "generateObject",
                    value: function () {
                        for (var e = new s["default"].Object3D, t = m["default"].rad(360 / this.amount), r = 0; r < this.amount; r++) {
                            var i = new s["default"].Mesh(this.rectGeom, this.material),
                                n = (r + 100) / this.amount;
                            this.move && (i.position.y = -(this.size * Math.PI / 2) / 2, i.position.z = r * this.spacing, i.scale.set(n, n, n)), i.rotation.z = t * r, this.triangles.push(i), e.add(i)
                        }
                        return e
                    }
                }, {
                    key: "startGUI",
                    value: function () {
                        var e = new u["default"].GUI;
                        e.add(this, "type", ["triangle", "inverted", "square"]).onChange(this.addObjects.bind(this)), e.add(this, "materialType", ["MeshBasicMaterial", "MeshNormalMaterial"]).onChange(this.addObjects.bind(this)), e.add(this, "numObjects", 1, 15).step(1).onChange(this.addObjects.bind(this)), e.add(this, "spacing", 1, 10).onChange(this.addObjects.bind(this)), e.add(this, "speed", 0, .15), e.add(this, "size", 1, 100).onChange(this.addObjects.bind(this)), e.add(this, "amount", 1, 700).step(1).onChange(this.addObjects.bind(this))
                    }
                }, {
                    key: "update",
                    value: function () {
                        this.stats.begin();
                        for (var e = 0; e < this.triangles.length; e++) this.triangles[e].rotation.z += this.speed;
                        this.renderer.render(this.scene, this.camera), this.stats.end(), requestAnimationFrame(this.update.bind(this))
                    }
                }, {
                    key: "onResize",
                    value: function () {
                        this.renderer.setSize(window.innerWidth, window.innerHeight), this.camera.aspect = window.innerWidth / window.innerHeight, this.camera.updateProjectionMatrix()
                    }
                }]), e
            }();
        r["default"] = g, t.exports = r["default"]
    }, {
        "dat-gui": 1,
        "stats-js": 4,
        three: 6,
        "three-orbit-controls": 5,
        "utils-perf": 7
    }],
    9: [function (e) {
        "use strict";

        function t(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var r = e("./demo"),
            i = t(r),
            n = new i["default"];
        window.onresize = n.onResize.bind(n)
    }, {
        "./demo": 8
    }]
}, {}, [9]);