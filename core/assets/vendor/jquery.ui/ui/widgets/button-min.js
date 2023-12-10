/*!
 * jQuery UI Button 1.13.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./controlgroup", "./checkboxradio", "../keycode", "../widget"], t) : t(jQuery)
}((function(t) {
    "use strict";
    var i;
    return t.widget("ui.button", {
        version: "1.13.1",
        defaultElement: "<button>",
        options: {
            classes: {
                "ui-button": "ui-corner-all"
            },
            disabled: null,
            icon: null,
            iconPosition: "beginning",
            label: null,
            showLabel: !0
        },
        _getCreateOptions: function() {
            var t, i = this._super() || {};
            return this.isInput = this.element.is("input"), null != (t = this.element[0].disabled) && (i.disabled = t), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (i.label = this.originalLabel), i
        },
        _create: function() {
            !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0), null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1), this.hasTitle = !!this.element.attr("title"), this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)), this._addClass("ui-button", "ui-widget"), this._setOption("disabled", this.options.disabled), this._enhance(), this.element.is("a") && this._on({
                keyup: function(i) {
                    i.keyCode === t.ui.keyCode.SPACE && (i.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"))
                }
            })
        },
        _enhance: function() {
            this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip())
        },
        _updateTooltip: function() {
            this.title = this.element.attr("title"), this.options.showLabel || this.title || this.element.attr("title", this.options.label)
        },
        _updateIcon: function(i, o) {
            var s = "iconPosition" !== i,
                n = s ? this.options.iconPosition : o,
                e = "top" === n || "bottom" === n;
            this.icon ? s && this._removeClass(this.icon, null, this.options.icon) : (this.icon = t("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")), s && this._addClass(this.icon, null, o), this._attachIcon(n), e ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(n))
        },
        _destroy: function() {
            this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(), this.hasTitle || this.element.removeAttr("title")
        },
        _attachIconSpace: function(t) {
            this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace)
        },
        _attachIcon: function(t) {
            this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon)
        },
        _setOptions: function(t) {
            var i = void 0 === t.showLabel ? this.options.showLabel : t.showLabel,
                o = void 0 === t.icon ? this.options.icon : t.icon;
            i || o || (t.showLabel = !0), this._super(t)
        },
        _setOption: function(t, i) {
            "icon" === t && (i ? this._updateIcon(t, i) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove())), "iconPosition" === t && this._updateIcon(t, i), "showLabel" === t && (this._toggleClass("ui-button-icon-only", null, !i), this._updateTooltip()), "label" === t && (this.isInput ? this.element.val(i) : (this.element.html(i), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))), this._super(t, i), "disabled" === t && (this._toggleClass(null, "ui-state-disabled", i), this.element[0].disabled = i, i && this.element.trigger("blur"))
        },
        refresh: function() {
            var t = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
            t !== this.options.disabled && this._setOptions({
                disabled: t
            }), this._updateTooltip()
        }
    }), !1 !== t.uiBackCompat && (t.widget("ui.button", t.ui.button, {
        options: {
            text: !0,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text), !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel), this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end"), this._super()
        },
        _setOption: function(t, i) {
            "text" !== t ? ("showLabel" === t && (this.options.text = i), "icon" === t && (this.options.icons.primary = i), "icons" === t && (i.primary ? (this._super("icon", i.primary), this._super("iconPosition", "beginning")) : i.secondary && (this._super("icon", i.secondary), this._super("iconPosition", "end"))), this._superApply(arguments)) : this._super("showLabel", i)
        }
    }), t.fn.button = (i = t.fn.button, function(o) {
        var s = "string" == typeof o,
            n = Array.prototype.slice.call(arguments, 1),
            e = this;
        return s ? this.length || "instance" !== o ? this.each((function() {
            var i, s = t(this).attr("type"),
                h = "checkbox" !== s && "radio" !== s ? "button" : "checkboxradio",
                a = t.data(this, "ui-" + h);
            return "instance" === o ? (e = a, !1) : a ? "function" != typeof a[o] || "_" === o.charAt(0) ? t.error("no such method '" + o + "' for button widget instance") : (i = a[o].apply(a, n)) !== a && void 0 !== i ? (e = i && i.jquery ? e.pushStack(i.get()) : i, !1) : void 0 : t.error("cannot call methods on button prior to initialization; attempted to call method '" + o + "'")
        })) : e = void 0 : (n.length && (o = t.widget.extend.apply(null, [o].concat(n))), this.each((function() {
            var s = t(this).attr("type"),
                n = "checkbox" !== s && "radio" !== s ? "button" : "checkboxradio",
                e = t.data(this, "ui-" + n);
            if (e) e.option(o || {}), e._init && e._init();
            else {
                if ("button" === n) return void i.call(t(this), o);
                t(this).checkboxradio(t.extend({
                    icon: !1
                }, o))
            }
        }))), e
    }), t.fn.buttonset = function() {
        return t.ui.controlgroup || t.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = {
            button: arguments[0].items
        }), this.controlgroup.apply(this, arguments))
    }), t.ui.button
}));
//# sourceMappingURL=button-min.js.map