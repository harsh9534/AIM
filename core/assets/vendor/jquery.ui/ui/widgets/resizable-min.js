/*!
 * jQuery UI Resizable 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./mouse", "../disable-selection", "../plugin", "../version", "../widget"], t) : t(jQuery)
}((function(t) {
    "use strict";
    return t.widget("ui.resizable", t.ui.mouse, {
        version: "1.13.1",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            classes: {
                "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
            },
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(t) {
            return parseFloat(t) || 0
        },
        _isNumber: function(t) {
            return !isNaN(parseFloat(t))
        },
        _hasScroll: function(i, e) {
            if ("hidden" === t(i).css("overflow")) return !1;
            var s = e && "left" === e ? "scrollLeft" : "scrollTop",
                h = !1;
            if (i[s] > 0) return !0;
            try {
                i[s] = 1, h = i[s] > 0, i[s] = 0
            } catch (t) {}
            return h
        },
        _create: function() {
            var i, e = this.options,
                s = this;
            this._addClass("ui-resizable"), t.extend(this, {
                _aspectRatio: !!e.aspectRatio,
                aspectRatio: e.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: e.helper || e.ghost || e.animate ? e.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper'></div>").css({
                overflow: "hidden",
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, i = {
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom"),
                marginLeft: this.originalElement.css("marginLeft")
            }, this.element.css(i), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css(i), this._proportionallyResize()), this._setupHandles(), e.autoHide && t(this.element).on("mouseenter", (function() {
                e.disabled || (s._removeClass("ui-resizable-autohide"), s._handles.show())
            })).on("mouseleave", (function() {
                e.disabled || s.resizing || (s._addClass("ui-resizable-autohide"), s._handles.hide())
            })), this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy(), this._addedHandles.remove();
            var i, e = function(i) {
                t(i).removeData("resizable").removeData("ui-resizable").off(".resizable")
            };
            return this.elementIsWrapper && (e(this.element), i = this.element, this.originalElement.css({
                position: i.css("position"),
                width: i.outerWidth(),
                height: i.outerHeight(),
                top: i.css("top"),
                left: i.css("left")
            }).insertAfter(i), i.remove()), this.originalElement.css("resize", this.originalResizeStyle), e(this.originalElement), this
        },
        _setOption: function(t, i) {
            switch (this._super(t, i), t) {
                case "handles":
                    this._removeHandles(), this._setupHandles();
                    break;
                case "aspectRatio":
                    this._aspectRatio = !!i
            }
        },
        _setupHandles: function() {
            var i, e, s, h, n, o = this.options,
                a = this;
            if (this.handles = o.handles || (t(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this._handles = t(), this._addedHandles = t(), this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), s = this.handles.split(","), this.handles = {}, e = 0; e < s.length; e++) h = "ui-resizable-" + (i = String.prototype.trim.call(s[e])), n = t("<div>"), this._addClass(n, "ui-resizable-handle " + h), n.css({
                    zIndex: o.zIndex
                }), this.handles[i] = ".ui-resizable-" + i, this.element.children(this.handles[i]).length || (this.element.append(n), this._addedHandles = this._addedHandles.add(n));
            this._renderAxis = function(i) {
                var e, s, h, n;
                for (e in i = i || this.element, this.handles) this.handles[e].constructor === String ? this.handles[e] = this.element.children(this.handles[e]).first().show() : (this.handles[e].jquery || this.handles[e].nodeType) && (this.handles[e] = t(this.handles[e]), this._on(this.handles[e], {
                    mousedown: a._mouseDown
                })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = t(this.handles[e], this.element), n = /sw|ne|nw|se|n|s/.test(e) ? s.outerHeight() : s.outerWidth(), h = ["padding", /ne|nw|n/.test(e) ? "Top" : /se|sw|s/.test(e) ? "Bottom" : /^e$/.test(e) ? "Right" : "Left"].join(""), i.css(h, n), this._proportionallyResize()), this._handles = this._handles.add(this.handles[e])
            }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.on("mouseover", (function() {
                a.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = n && n[1] ? n[1] : "se")
            })), o.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"))
        },
        _removeHandles: function() {
            this._addedHandles.remove()
        },
        _mouseCapture: function(i) {
            var e, s, h = !1;
            for (e in this.handles)((s = t(this.handles[e])[0]) === i.target || t.contains(s, i.target)) && (h = !0);
            return !this.options.disabled && h
        },
        _mouseStart: function(i) {
            var e, s, h, n = this.options,
                o = this.element;
            return this.resizing = !0, this._renderProxy(), e = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), n.containment && (e += t(n.containment).scrollLeft() || 0, s += t(n.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: e,
                top: s
            }, this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: o.width(),
                height: o.height()
            }, this.originalSize = this._helper ? {
                width: o.outerWidth(),
                height: o.outerHeight()
            } : {
                width: o.width(),
                height: o.height()
            }, this.sizeDiff = {
                width: o.outerWidth() - o.width(),
                height: o.outerHeight() - o.height()
            }, this.originalPosition = {
                left: e,
                top: s
            }, this.originalMousePosition = {
                left: i.pageX,
                top: i.pageY
            }, this.aspectRatio = "number" == typeof n.aspectRatio ? n.aspectRatio : this.originalSize.width / this.originalSize.height || 1, h = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === h ? this.axis + "-resize" : h), this._addClass("ui-resizable-resizing"), this._propagate("start", i), !0
        },
        _mouseDrag: function(i) {
            var e, s, h = this.originalMousePosition,
                n = this.axis,
                o = i.pageX - h.left || 0,
                a = i.pageY - h.top || 0,
                l = this._change[n];
            return this._updatePrevProperties(), !!l && (e = l.apply(this, [i, o, a]), this._updateVirtualBoundaries(i.shiftKey), (this._aspectRatio || i.shiftKey) && (e = this._updateRatio(e, i)), e = this._respectSize(e, i), this._updateCache(e), this._propagate("resize", i), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", i, this.ui()), this._applyChanges()), !1)
        },
        _mouseStop: function(i) {
            this.resizing = !1;
            var e, s, h, n, o, a, l, r = this.options,
                p = this;
            return this._helper && (h = (s = (e = this._proportionallyResizeElements).length && /textarea/i.test(e[0].nodeName)) && this._hasScroll(e[0], "left") ? 0 : p.sizeDiff.height, n = s ? 0 : p.sizeDiff.width, o = {
                width: p.helper.width() - n,
                height: p.helper.height() - h
            }, a = parseFloat(p.element.css("left")) + (p.position.left - p.originalPosition.left) || null, l = parseFloat(p.element.css("top")) + (p.position.top - p.originalPosition.top) || null, r.animate || this.element.css(t.extend(o, {
                top: l,
                left: a
            })), p.helper.height(p.size.height), p.helper.width(p.size.width), this._helper && !r.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", i), this._helper && this.helper.remove(), !1
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            }, this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function() {
            var t = {};
            return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t
        },
        _updateVirtualBoundaries: function(t) {
            var i, e, s, h, n, o = this.options;
            n = {
                minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
                maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : 1 / 0,
                minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
                maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : 1 / 0
            }, (this._aspectRatio || t) && (i = n.minHeight * this.aspectRatio, s = n.minWidth / this.aspectRatio, e = n.maxHeight * this.aspectRatio, h = n.maxWidth / this.aspectRatio, i > n.minWidth && (n.minWidth = i), s > n.minHeight && (n.minHeight = s), e < n.maxWidth && (n.maxWidth = e), h < n.maxHeight && (n.maxHeight = h)), this._vBoundaries = n
        },
        _updateCache: function(t) {
            this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width)
        },
        _updateRatio: function(t) {
            var i = this.position,
                e = this.size,
                s = this.axis;
            return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === s && (t.left = i.left + (e.width - t.width), t.top = null), "nw" === s && (t.top = i.top + (e.height - t.height), t.left = i.left + (e.width - t.width)), t
        },
        _respectSize: function(t) {
            var i = this._vBoundaries,
                e = this.axis,
                s = this._isNumber(t.width) && i.maxWidth && i.maxWidth < t.width,
                h = this._isNumber(t.height) && i.maxHeight && i.maxHeight < t.height,
                n = this._isNumber(t.width) && i.minWidth && i.minWidth > t.width,
                o = this._isNumber(t.height) && i.minHeight && i.minHeight > t.height,
                a = this.originalPosition.left + this.originalSize.width,
                l = this.originalPosition.top + this.originalSize.height,
                r = /sw|nw|w/.test(e),
                p = /nw|ne|n/.test(e);
            return n && (t.width = i.minWidth), o && (t.height = i.minHeight), s && (t.width = i.maxWidth), h && (t.height = i.maxHeight), n && r && (t.left = a - i.minWidth), s && r && (t.left = a - i.maxWidth), o && p && (t.top = l - i.minHeight), h && p && (t.top = l - i.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
        },
        _getPaddingPlusBorderDimensions: function(t) {
            for (var i = 0, e = [], s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], h = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; i < 4; i++) e[i] = parseFloat(s[i]) || 0, e[i] += parseFloat(h[i]) || 0;
            return {
                height: e[0] + e[2],
                width: e[1] + e[3]
            }
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length)
                for (var t, i = 0, e = this.helper || this.element; i < this._proportionallyResizeElements.length; i++) t = this._proportionallyResizeElements[i], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({
                    height: e.height() - this.outerDimensions.height || 0,
                    width: e.width() - this.outerDimensions.width || 0
                })
        },
        _renderProxy: function() {
            var i = this.element,
                e = this.options;
            this.elementOffset = i.offset(), this._helper ? (this.helper = this.helper || t("<div></div>").css({
                overflow: "hidden"
            }), this._addClass(this.helper, this._helper), this.helper.css({
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++e.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(t, i) {
                return {
                    width: this.originalSize.width + i
                }
            },
            w: function(t, i) {
                var e = this.originalSize;
                return {
                    left: this.originalPosition.left + i,
                    width: e.width - i
                }
            },
            n: function(t, i, e) {
                var s = this.originalSize;
                return {
                    top: this.originalPosition.top + e,
                    height: s.height - e
                }
            },
            s: function(t, i, e) {
                return {
                    height: this.originalSize.height + e
                }
            },
            se: function(i, e, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [i, e, s]))
            },
            sw: function(i, e, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [i, e, s]))
            },
            ne: function(i, e, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [i, e, s]))
            },
            nw: function(i, e, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [i, e, s]))
            }
        },
        _propagate: function(i, e) {
            t.ui.plugin.call(this, i, [e, this.ui()]), "resize" !== i && this._trigger(i, e, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), t.ui.plugin.add("resizable", "animate", {
        stop: function(i) {
            var e = t(this).resizable("instance"),
                s = e.options,
                h = e._proportionallyResizeElements,
                n = h.length && /textarea/i.test(h[0].nodeName),
                o = n && e._hasScroll(h[0], "left") ? 0 : e.sizeDiff.height,
                a = n ? 0 : e.sizeDiff.width,
                l = {
                    width: e.size.width - a,
                    height: e.size.height - o
                },
                r = parseFloat(e.element.css("left")) + (e.position.left - e.originalPosition.left) || null,
                p = parseFloat(e.element.css("top")) + (e.position.top - e.originalPosition.top) || null;
            e.element.animate(t.extend(l, p && r ? {
                top: p,
                left: r
            } : {}), {
                duration: s.animateDuration,
                easing: s.animateEasing,
                step: function() {
                    var s = {
                        width: parseFloat(e.element.css("width")),
                        height: parseFloat(e.element.css("height")),
                        top: parseFloat(e.element.css("top")),
                        left: parseFloat(e.element.css("left"))
                    };
                    h && h.length && t(h[0]).css({
                        width: s.width,
                        height: s.height
                    }), e._updateCache(s), e._propagate("resize", i)
                }
            })
        }
    }), t.ui.plugin.add("resizable", "containment", {
        start: function() {
            var i, e, s, h, n, o, a, l = t(this).resizable("instance"),
                r = l.options,
                p = l.element,
                d = r.containment,
                g = d instanceof t ? d.get(0) : /parent/.test(d) ? p.parent().get(0) : d;
            g && (l.containerElement = t(g), /document/.test(d) || d === document ? (l.containerOffset = {
                left: 0,
                top: 0
            }, l.containerPosition = {
                left: 0,
                top: 0
            }, l.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height: t(document).height() || document.body.parentNode.scrollHeight
            }) : (i = t(g), e = [], t(["Top", "Right", "Left", "Bottom"]).each((function(t, s) {
                e[t] = l._num(i.css("padding" + s))
            })), l.containerOffset = i.offset(), l.containerPosition = i.position(), l.containerSize = {
                height: i.innerHeight() - e[3],
                width: i.innerWidth() - e[1]
            }, s = l.containerOffset, h = l.containerSize.height, n = l.containerSize.width, o = l._hasScroll(g, "left") ? g.scrollWidth : n, a = l._hasScroll(g) ? g.scrollHeight : h, l.parentData = {
                element: g,
                left: s.left,
                top: s.top,
                width: o,
                height: a
            }))
        },
        resize: function(i) {
            var e, s, h, n, o = t(this).resizable("instance"),
                a = o.options,
                l = o.containerOffset,
                r = o.position,
                p = o._aspectRatio || i.shiftKey,
                d = {
                    top: 0,
                    left: 0
                },
                g = o.containerElement,
                u = !0;
            g[0] !== document && /static/.test(g.css("position")) && (d = l), r.left < (o._helper ? l.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - l.left : o.position.left - d.left), p && (o.size.height = o.size.width / o.aspectRatio, u = !1), o.position.left = a.helper ? l.left : 0), r.top < (o._helper ? l.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - l.top : o.position.top), p && (o.size.width = o.size.height * o.aspectRatio, u = !1), o.position.top = o._helper ? l.top : 0), h = o.containerElement.get(0) === o.element.parent().get(0), n = /relative|absolute/.test(o.containerElement.css("position")), h && n ? (o.offset.left = o.parentData.left + o.position.left, o.offset.top = o.parentData.top + o.position.top) : (o.offset.left = o.element.offset().left, o.offset.top = o.element.offset().top), e = Math.abs(o.sizeDiff.width + (o._helper ? o.offset.left - d.left : o.offset.left - l.left)), s = Math.abs(o.sizeDiff.height + (o._helper ? o.offset.top - d.top : o.offset.top - l.top)), e + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - e, p && (o.size.height = o.size.width / o.aspectRatio, u = !1)), s + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - s, p && (o.size.width = o.size.height * o.aspectRatio, u = !1)), u || (o.position.left = o.prevPosition.left, o.position.top = o.prevPosition.top, o.size.width = o.prevSize.width, o.size.height = o.prevSize.height)
        },
        stop: function() {
            var i = t(this).resizable("instance"),
                e = i.options,
                s = i.containerOffset,
                h = i.containerPosition,
                n = i.containerElement,
                o = t(i.helper),
                a = o.offset(),
                l = o.outerWidth() - i.sizeDiff.width,
                r = o.outerHeight() - i.sizeDiff.height;
            i._helper && !e.animate && /relative/.test(n.css("position")) && t(this).css({
                left: a.left - h.left - s.left,
                width: l,
                height: r
            }), i._helper && !e.animate && /static/.test(n.css("position")) && t(this).css({
                left: a.left - h.left - s.left,
                width: l,
                height: r
            })
        }
    }), t.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var i = t(this).resizable("instance").options;
            t(i.alsoResize).each((function() {
                var i = t(this);
                i.data("ui-resizable-alsoresize", {
                    width: parseFloat(i.width()),
                    height: parseFloat(i.height()),
                    left: parseFloat(i.css("left")),
                    top: parseFloat(i.css("top"))
                })
            }))
        },
        resize: function(i, e) {
            var s = t(this).resizable("instance"),
                h = s.options,
                n = s.originalSize,
                o = s.originalPosition,
                a = {
                    height: s.size.height - n.height || 0,
                    width: s.size.width - n.width || 0,
                    top: s.position.top - o.top || 0,
                    left: s.position.left - o.left || 0
                };
            t(h.alsoResize).each((function() {
                var i = t(this),
                    s = t(this).data("ui-resizable-alsoresize"),
                    h = {},
                    n = i.parents(e.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                t.each(n, (function(t, i) {
                    var e = (s[i] || 0) + (a[i] || 0);
                    e && e >= 0 && (h[i] = e || null)
                })), i.css(h)
            }))
        },
        stop: function() {
            t(this).removeData("ui-resizable-alsoresize")
        }
    }), t.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var i = t(this).resizable("instance"),
                e = i.size;
            i.ghost = i.originalElement.clone(), i.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: e.height,
                width: e.width,
                margin: 0,
                left: 0,
                top: 0
            }), i._addClass(i.ghost, "ui-resizable-ghost"), !1 !== t.uiBackCompat && "string" == typeof i.options.ghost && i.ghost.addClass(this.options.ghost), i.ghost.appendTo(i.helper)
        },
        resize: function() {
            var i = t(this).resizable("instance");
            i.ghost && i.ghost.css({
                position: "relative",
                height: i.size.height,
                width: i.size.width
            })
        },
        stop: function() {
            var i = t(this).resizable("instance");
            i.ghost && i.helper && i.helper.get(0).removeChild(i.ghost.get(0))
        }
    }), t.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var i, e = t(this).resizable("instance"),
                s = e.options,
                h = e.size,
                n = e.originalSize,
                o = e.originalPosition,
                a = e.axis,
                l = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
                r = l[0] || 1,
                p = l[1] || 1,
                d = Math.round((h.width - n.width) / r) * r,
                g = Math.round((h.height - n.height) / p) * p,
                u = n.width + d,
                c = n.height + g,
                f = s.maxWidth && s.maxWidth < u,
                m = s.maxHeight && s.maxHeight < c,
                z = s.minWidth && s.minWidth > u,
                w = s.minHeight && s.minHeight > c;
            s.grid = l, z && (u += r), w && (c += p), f && (u -= r), m && (c -= p), /^(se|s|e)$/.test(a) ? (e.size.width = u, e.size.height = c) : /^(ne)$/.test(a) ? (e.size.width = u, e.size.height = c, e.position.top = o.top - g) : /^(sw)$/.test(a) ? (e.size.width = u, e.size.height = c, e.position.left = o.left - d) : ((c - p <= 0 || u - r <= 0) && (i = e._getPaddingPlusBorderDimensions(this)), c - p > 0 ? (e.size.height = c, e.position.top = o.top - g) : (c = p - i.height, e.size.height = c, e.position.top = o.top + n.height - c), u - r > 0 ? (e.size.width = u, e.position.left = o.left - d) : (u = r - i.width, e.size.width = u, e.position.left = o.left + n.width - u))
        }
    }), t.ui.resizable
}));
//# sourceMappingURL=resizable-min.js.map