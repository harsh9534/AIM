/*!
 * jQuery UI Dialog 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./button", "./draggable", "./mouse", "./resizable", "../focusable", "../keycode", "../position", "../safe-active-element", "../safe-blur", "../tabbable", "../unique-id", "../version", "../widget"], i) : i(jQuery)
}((function(i) {
    "use strict";
    return i.widget("ui.dialog", {
        version: "1.13.1",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            classes: {
                "ui-dialog": "ui-corner-all",
                "ui-dialog-titlebar": "ui-corner-all"
            },
            closeOnEscape: !0,
            closeText: "Close",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(t) {
                    var e = i(this).css(t).offset().top;
                    e < 0 && i(this).css("top", t.top - e)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        resizableRelatedOptions: {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            }, this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.originalTitle = this.element.attr("title"), null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle), this.options.disabled && (this.options.disabled = !1), this._createWrapper(), this.element.show().removeAttr("title").appendTo(this.uiDialog), this._addClass("ui-dialog-content", "ui-widget-content"), this._createTitlebar(), this._createButtonPane(), this.options.draggable && i.fn.draggable && this._makeDraggable(), this.options.resizable && i.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus()
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t.jquery || t.nodeType) ? i(t) : this.document.find(t || "body").eq(0)
        },
        _destroy: function() {
            var i, t = this.originalPosition;
            this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().css(this.originalCss).detach(), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), (i = t.parent.children().eq(t.index)).length && i[0] !== this.element[0] ? i.before(this.element) : t.parent.append(this.element)
        },
        widget: function() {
            return this.uiDialog
        },
        disable: i.noop,
        enable: i.noop,
        close: function(t) {
            var e = this;
            this._isOpen && !1 !== this._trigger("beforeClose", t) && (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || i.ui.safeBlur(i.ui.safeActiveElement(this.document[0])), this._hide(this.uiDialog, this.options.hide, (function() {
                e._trigger("close", t)
            })))
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(t, e) {
            var o = !1,
                s = this.uiDialog.siblings(".ui-front:visible").map((function() {
                    return +i(this).css("z-index")
                })).get(),
                n = Math.max.apply(null, s);
            return n >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", n + 1), o = !0), o && !e && this._trigger("focus", t), o
        },
        open: function() {
            var t = this;
            this._isOpen ? this._moveToTop() && this._focusTabbable() : (this._isOpen = !0, this.opener = i(i.ui.safeActiveElement(this.document[0])), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, (function() {
                t._focusTabbable(), t._trigger("focus")
            })), this._makeFocusTarget(), this._trigger("open"))
        },
        _focusTabbable: function() {
            var i = this._focusedElement;
            i || (i = this.element.find("[autofocus]")), i.length || (i = this.element.find(":tabbable")), i.length || (i = this.uiDialogButtonPane.find(":tabbable")), i.length || (i = this.uiDialogTitlebarClose.filter(":tabbable")), i.length || (i = this.uiDialog), i.eq(0).trigger("focus")
        },
        _restoreTabbableFocus: function() {
            var t = i.ui.safeActiveElement(this.document[0]);
            this.uiDialog[0] === t || i.contains(this.uiDialog[0], t) || this._focusTabbable()
        },
        _keepFocus: function(i) {
            i.preventDefault(), this._restoreTabbableFocus(), this._delay(this._restoreTabbableFocus)
        },
        _createWrapper: function() {
            this.uiDialog = i("<div>").hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()), this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"), this._on(this.uiDialog, {
                keydown: function(t) {
                    if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === i.ui.keyCode.ESCAPE) return t.preventDefault(), void this.close(t);
                    if (t.keyCode === i.ui.keyCode.TAB && !t.isDefaultPrevented()) {
                        var e = this.uiDialog.find(":tabbable"),
                            o = e.first(),
                            s = e.last();
                        t.target !== s[0] && t.target !== this.uiDialog[0] || t.shiftKey ? t.target !== o[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (this._delay((function() {
                            s.trigger("focus")
                        })), t.preventDefault()) : (this._delay((function() {
                            o.trigger("focus")
                        })), t.preventDefault())
                    }
                },
                mousedown: function(i) {
                    this._moveToTop(i) && this._focusTabbable()
                }
            }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function() {
            var t;
            this.uiDialogTitlebar = i("<div>"), this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"), this._on(this.uiDialogTitlebar, {
                mousedown: function(t) {
                    i(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus")
                }
            }), this.uiDialogTitlebarClose = i("<button type='button'></button>").button({
                label: i("<a>").text(this.options.closeText).html(),
                icon: "ui-icon-closethick",
                showLabel: !1
            }).appendTo(this.uiDialogTitlebar), this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"), this._on(this.uiDialogTitlebarClose, {
                click: function(i) {
                    i.preventDefault(), this.close(i)
                }
            }), t = i("<span>").uniqueId().prependTo(this.uiDialogTitlebar), this._addClass(t, "ui-dialog-title"), this._title(t), this.uiDialogTitlebar.prependTo(this.uiDialog), this.uiDialog.attr({
                "aria-labelledby": t.attr("id")
            })
        },
        _title: function(i) {
            this.options.title ? i.text(this.options.title) : i.html("&#160;")
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = i("<div>"), this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"), this.uiButtonSet = i("<div>").appendTo(this.uiDialogButtonPane), this._addClass(this.uiButtonSet, "ui-dialog-buttonset"), this._createButtons()
        },
        _createButtons: function() {
            var t = this,
                e = this.options.buttons;
            this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), i.isEmptyObject(e) || Array.isArray(e) && !e.length ? this._removeClass(this.uiDialog, "ui-dialog-buttons") : (i.each(e, (function(e, o) {
                var s, n;
                o = "function" == typeof o ? {
                    click: o,
                    text: e
                } : o, o = i.extend({
                    type: "button"
                }, o), s = o.click, n = {
                    icon: o.icon,
                    iconPosition: o.iconPosition,
                    showLabel: o.showLabel,
                    icons: o.icons,
                    text: o.text
                }, delete o.click, delete o.icon, delete o.iconPosition, delete o.showLabel, delete o.icons, "boolean" == typeof o.text && delete o.text, i("<button></button>", o).button(n).appendTo(t.uiButtonSet).on("click", (function() {
                    s.apply(t.element[0], arguments)
                }))
            })), this._addClass(this.uiDialog, "ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog))
        },
        _makeDraggable: function() {
            var t = this,
                e = this.options;

            function o(i) {
                return {
                    position: i.position,
                    offset: i.offset
                }
            }
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(e, s) {
                    t._addClass(i(this), "ui-dialog-dragging"), t._blockFrames(), t._trigger("dragStart", e, o(s))
                },
                drag: function(i, e) {
                    t._trigger("drag", i, o(e))
                },
                stop: function(s, n) {
                    var a = n.offset.left - t.document.scrollLeft(),
                        l = n.offset.top - t.document.scrollTop();
                    e.position = {
                        my: "left top",
                        at: "left" + (a >= 0 ? "+" : "") + a + " top" + (l >= 0 ? "+" : "") + l,
                        of: t.window
                    }, t._removeClass(i(this), "ui-dialog-dragging"), t._unblockFrames(), t._trigger("dragStop", s, o(n))
                }
            })
        },
        _makeResizable: function() {
            var t = this,
                e = this.options,
                o = e.resizable,
                s = this.uiDialog.css("position"),
                n = "string" == typeof o ? o : "n,e,s,w,se,sw,ne,nw";

            function a(i) {
                return {
                    originalPosition: i.originalPosition,
                    originalSize: i.originalSize,
                    position: i.position,
                    size: i.size
                }
            }
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: e.maxWidth,
                maxHeight: e.maxHeight,
                minWidth: e.minWidth,
                minHeight: this._minHeight(),
                handles: n,
                start: function(e, o) {
                    t._addClass(i(this), "ui-dialog-resizing"), t._blockFrames(), t._trigger("resizeStart", e, a(o))
                },
                resize: function(i, e) {
                    t._trigger("resize", i, a(e))
                },
                stop: function(o, s) {
                    var n = t.uiDialog.offset(),
                        l = n.left - t.document.scrollLeft(),
                        h = n.top - t.document.scrollTop();
                    e.height = t.uiDialog.height(), e.width = t.uiDialog.width(), e.position = {
                        my: "left top",
                        at: "left" + (l >= 0 ? "+" : "") + l + " top" + (h >= 0 ? "+" : "") + h,
                        of: t.window
                    }, t._removeClass(i(this), "ui-dialog-resizing"), t._unblockFrames(), t._trigger("resizeStop", o, a(s))
                }
            }).css("position", s)
        },
        _trackFocus: function() {
            this._on(this.widget(), {
                focusin: function(t) {
                    this._makeFocusTarget(), this._focusedElement = i(t.target)
                }
            })
        },
        _makeFocusTarget: function() {
            this._untrackInstance(), this._trackingInstances().unshift(this)
        },
        _untrackInstance: function() {
            var t = this._trackingInstances(),
                e = i.inArray(this, t); - 1 !== e && t.splice(e, 1)
        },
        _trackingInstances: function() {
            var i = this.document.data("ui-dialog-instances");
            return i || (i = [], this.document.data("ui-dialog-instances", i)), i
        },
        _minHeight: function() {
            var i = this.options;
            return "auto" === i.height ? i.minHeight : Math.min(i.minHeight, i.height)
        },
        _position: function() {
            var i = this.uiDialog.is(":visible");
            i || this.uiDialog.show(), this.uiDialog.position(this.options.position), i || this.uiDialog.hide()
        },
        _setOptions: function(t) {
            var e = this,
                o = !1,
                s = {};
            i.each(t, (function(i, t) {
                e._setOption(i, t), i in e.sizeRelatedOptions && (o = !0), i in e.resizableRelatedOptions && (s[i] = t)
            })), o && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", s)
        },
        _setOption: function(t, e) {
            var o, s, n = this.uiDialog;
            "disabled" !== t && (this._super(t, e), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({
                label: i("<a>").text("" + this.options.closeText).html()
            }), "draggable" === t && ((o = n.is(":data(ui-draggable)")) && !e && n.draggable("destroy"), !o && e && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && ((s = n.is(":data(ui-resizable)")) && !e && n.resizable("destroy"), s && "string" == typeof e && n.resizable("option", "handles", e), s || !1 === e || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function() {
            var i, t, e, o = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }), o.minWidth > o.width && (o.width = o.minWidth), i = this.uiDialog.css({
                height: "auto",
                width: o.width
            }).outerHeight(), t = Math.max(0, o.minHeight - i), e = "number" == typeof o.maxHeight ? Math.max(0, o.maxHeight - i) : "none", "auto" === o.height ? this.element.css({
                minHeight: t,
                maxHeight: e,
                height: "auto"
            }) : this.element.height(Math.max(0, o.height - i)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map((function() {
                var t = i(this);
                return i("<div>").css({
                    position: "absolute",
                    width: t.outerWidth(),
                    height: t.outerHeight()
                }).appendTo(t.parent()).offset(t.offset())[0]
            }))
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _allowInteraction: function(t) {
            return !!i(t.target).closest(".ui-dialog").length || !!i(t.target).closest(".ui-datepicker").length
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var t = i.fn.jquery.substring(0, 4),
                    e = !0;
                this._delay((function() {
                    e = !1
                })), this.document.data("ui-dialog-overlays") || this.document.on("focusin.ui-dialog", function(i) {
                    if (!e) {
                        var o = this._trackingInstances()[0];
                        o._allowInteraction(i) || (i.preventDefault(), o._focusTabbable(), "3.4." !== t && "3.5." !== t || o._delay(o._restoreTabbableFocus))
                    }
                }.bind(this)), this.overlay = i("<div>").appendTo(this._appendTo()), this._addClass(this.overlay, null, "ui-widget-overlay ui-front"), this._on(this.overlay, {
                    mousedown: "_keepFocus"
                }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
            }
        },
        _destroyOverlay: function() {
            if (this.options.modal && this.overlay) {
                var i = this.document.data("ui-dialog-overlays") - 1;
                i ? this.document.data("ui-dialog-overlays", i) : (this.document.off("focusin.ui-dialog"), this.document.removeData("ui-dialog-overlays")), this.overlay.remove(), this.overlay = null
            }
        }
    }), !1 !== i.uiBackCompat && i.widget("ui.dialog", i.ui.dialog, {
        options: {
            dialogClass: ""
        },
        _createWrapper: function() {
            this._super(), this.uiDialog.addClass(this.options.dialogClass)
        },
        _setOption: function(i, t) {
            "dialogClass" === i && this.uiDialog.removeClass(this.options.dialogClass).addClass(t), this._superApply(arguments)
        }
    }), i.ui.dialog
}));
//# sourceMappingURL=dialog-min.js.map