/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

(function($) {
    var cachedScrollbarWidth = null;
    var max = Math.max,
        abs = Math.abs;
    var regexHorizontal = /left|center|right/;
    var regexVertical = /top|center|bottom/;
    var regexOffset = /[+-]\d+(\.[\d]+)?%?/;
    var regexPosition = /^\w+/;
    var regexPercent = /%$/;
    var _position = $.fn.position;

    function getOffsets(offsets, width, height) {
        return [parseFloat(offsets[0]) * (regexPercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (regexPercent.test(offsets[1]) ? height / 100 : 1)];
    }

    function parseCss(element, property) {
        return parseInt($.css(element, property), 10) || 0;
    }

    function getDimensions(elem) {
        var raw = elem[0];

        if (raw.nodeType === 9) {
            return {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            };
        }

        if ($.isWindow(raw)) {
            return {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: elem.scrollTop(),
                    left: elem.scrollLeft()
                }
            };
        }

        if (raw.preventDefault) {
            return {
                width: 0,
                height: 0,
                offset: {
                    top: raw.pageY,
                    left: raw.pageX
                }
            };
        }

        return {
            width: elem.outerWidth(),
            height: elem.outerHeight(),
            offset: elem.offset()
        };
    }

    var collisions = {
        fit: {
            left: function left(position, data) {
                var within = data.within;
                var withinOffset = within.isWindow ? within.scrollLeft : within.offset.left;
                var outerWidth = within.width;
                var collisionPosLeft = position.left - data.collisionPosition.marginLeft;
                var overLeft = withinOffset - collisionPosLeft;
                var overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
                var newOverRight;

                if (data.collisionWidth > outerWidth) {
                    if (overLeft > 0 && overRight <= 0) {
                        newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
                        position.left += overLeft - newOverRight;
                    } else if (overRight > 0 && overLeft <= 0) {
                        position.left = withinOffset;
                    } else if (overLeft > overRight) {
                        position.left = withinOffset + outerWidth - data.collisionWidth;
                    } else {
                        position.left = withinOffset;
                    }
                } else if (overLeft > 0) {
                    position.left += overLeft;
                } else if (overRight > 0) {
                    position.left -= overRight;
                } else {
                    position.left = max(position.left - collisionPosLeft, position.left);
                }
            },
            top: function top(position, data) {
                var within = data.within;
                var withinOffset = within.isWindow ? within.scrollTop : within.offset.top;
                var outerHeight = data.within.height;
                var collisionPosTop = position.top - data.collisionPosition.marginTop;
                var overTop = withinOffset - collisionPosTop;
                var overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
                var newOverBottom;

                if (data.collisionHeight > outerHeight) {
                    if (overTop > 0 && overBottom <= 0) {
                        newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
                        position.top += overTop - newOverBottom;
                    } else if (overBottom > 0 && overTop <= 0) {
                        position.top = withinOffset;
                    } else if (overTop > overBottom) {
                        position.top = withinOffset + outerHeight - data.collisionHeight;
                    } else {
                        position.top = withinOffset;
                    }
                } else if (overTop > 0) {
                    position.top += overTop;
                } else if (overBottom > 0) {
                    position.top -= overBottom;
                } else {
                    position.top = max(position.top - collisionPosTop, position.top);
                }
            }
        },
        flip: {
            left: function left(position, data) {
                var within = data.within;
                var withinOffset = within.offset.left + within.scrollLeft;
                var outerWidth = within.width;
                var offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left;
                var collisionPosLeft = position.left - data.collisionPosition.marginLeft;
                var overLeft = collisionPosLeft - offsetLeft;
                var overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft;
                var myOffset = data.my[0] === 'left' ? -data.elemWidth : data.my[0] === 'right' ? data.elemWidth : 0;
                var atOffset = data.at[0] === 'left' ? data.targetWidth : data.at[0] === 'right' ? -data.targetWidth : 0;
                var offset = -2 * data.offset[0];
                var newOverRight;
                var newOverLeft;

                if (overLeft < 0) {
                    newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;

                    if (newOverRight < 0 || newOverRight < abs(overLeft)) {
                        position.left += myOffset + atOffset + offset;
                    }
                } else if (overRight > 0) {
                    newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;

                    if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
                        position.left += myOffset + atOffset + offset;
                    }
                }
            },
            top: function top(position, data) {
                var within = data.within;
                var withinOffset = within.offset.top + within.scrollTop;
                var outerHeight = within.height;
                var offsetTop = within.isWindow ? within.scrollTop : within.offset.top;
                var collisionPosTop = position.top - data.collisionPosition.marginTop;
                var overTop = collisionPosTop - offsetTop;
                var overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop;
                var top = data.my[1] === 'top';
                var myOffset = top ? -data.elemHeight : data.my[1] === 'bottom' ? data.elemHeight : 0;
                var atOffset = data.at[1] === 'top' ? data.targetHeight : data.at[1] === 'bottom' ? -data.targetHeight : 0;
                var offset = -2 * data.offset[1];
                var newOverTop;
                var newOverBottom;

                if (overTop < 0) {
                    newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;

                    if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
                        position.top += myOffset + atOffset + offset;
                    }
                } else if (overBottom > 0) {
                    newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;

                    if (newOverTop > 0 || abs(newOverTop) < overBottom) {
                        position.top += myOffset + atOffset + offset;
                    }
                }
            }
        },
        flipfit: {
            left: function left() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                collisions.flip.left.apply(this, args);
                collisions.fit.left.apply(this, args);
            },
            top: function top() {
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                collisions.flip.top.apply(this, args);
                collisions.fit.top.apply(this, args);
            }
        }
    };
    $.position = {
        scrollbarWidth: function scrollbarWidth() {
            if (cachedScrollbarWidth !== undefined) {
                return cachedScrollbarWidth;
            }

            var div = $('<div ' + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>");
            var innerDiv = div.children()[0];
            $('body').append(div);
            var w1 = innerDiv.offsetWidth;
            div.css('overflow', 'scroll');
            var w2 = innerDiv.offsetWidth;

            if (w1 === w2) {
                w2 = div[0].clientWidth;
            }

            div.remove();
            cachedScrollbarWidth = w1 - w2;
            return cachedScrollbarWidth;
        },
        getScrollInfo: function getScrollInfo(within) {
            var overflowX = within.isWindow || within.isDocument ? '' : within.element.css('overflow-x');
            var overflowY = within.isWindow || within.isDocument ? '' : within.element.css('overflow-y');
            var hasOverflowX = overflowX === 'scroll' || overflowX === 'auto' && within.width < within.element[0].scrollWidth;
            var hasOverflowY = overflowY === 'scroll' || overflowY === 'auto' && within.height < within.element[0].scrollHeight;
            return {
                width: hasOverflowY ? $.position.scrollbarWidth() : 0,
                height: hasOverflowX ? $.position.scrollbarWidth() : 0
            };
        },
        getWithinInfo: function getWithinInfo(element) {
            var withinElement = $(element || window);
            var isWindow = $.isWindow(withinElement[0]);
            var isDocument = !!withinElement[0] && withinElement[0].nodeType === 9;
            var hasOffset = !isWindow && !isDocument;
            return {
                element: withinElement,
                isWindow: isWindow,
                isDocument: isDocument,
                offset: hasOffset ? $(element).offset() : {
                    left: 0,
                    top: 0
                },
                scrollLeft: withinElement.scrollLeft(),
                scrollTop: withinElement.scrollTop(),
                width: withinElement.outerWidth(),
                height: withinElement.outerHeight()
            };
        }
    };

    $.fn.position = function(options) {
        if (!options || !options.of) {
            return _position.apply(this, arguments);
        }

        options = $.extend({}, options);
        var within = $.position.getWithinInfo(options.within);
        var scrollInfo = $.position.getScrollInfo(within);
        var collision = (options.collision || 'flip').split(' ');
        var offsets = {};
        var target = typeof options.of === 'string' ? $(document).find(options.of) : $(options.of);
        var dimensions = getDimensions(target);
        var targetWidth = dimensions.width;
        var targetHeight = dimensions.height;
        var targetOffset = dimensions.offset;

        if (target[0].preventDefault) {
            options.at = 'left top';
        }

        var basePosition = $.extend({}, targetOffset);
        $.each(['my', 'at'], function() {
            var pos = (options[this] || '').split(' ');

            if (pos.length === 1) {
                pos = regexHorizontal.test(pos[0]) ? pos.concat(['center']) : regexVertical.test(pos[0]) ? ['center'].concat(pos) : ['center', 'center'];
            }

            pos[0] = regexHorizontal.test(pos[0]) ? pos[0] : 'center';
            pos[1] = regexVertical.test(pos[1]) ? pos[1] : 'center';
            var horizontalOffset = regexOffset.exec(pos[0]);
            var verticalOffset = regexOffset.exec(pos[1]);
            offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0];
            options[this] = [regexPosition.exec(pos[0])[0], regexPosition.exec(pos[1])[0]];
        });

        if (collision.length === 1) {
            collision[1] = collision[0];
        }

        if (options.at[0] === 'right') {
            basePosition.left += targetWidth;
        } else if (options.at[0] === 'center') {
            basePosition.left += targetWidth / 2;
        }

        if (options.at[1] === 'bottom') {
            basePosition.top += targetHeight;
        } else if (options.at[1] === 'center') {
            basePosition.top += targetHeight / 2;
        }

        var atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
        basePosition.left += atOffset[0];
        basePosition.top += atOffset[1];
        return this.each(function() {
            var using;
            var elem = $(this);
            var elemWidth = elem.outerWidth();
            var elemHeight = elem.outerHeight();
            var marginLeft = parseCss(this, 'marginLeft');
            var marginTop = parseCss(this, 'marginTop');
            var collisionWidth = elemWidth + marginLeft + parseCss(this, 'marginRight') + scrollInfo.width;
            var collisionHeight = elemHeight + marginTop + parseCss(this, 'marginBottom') + scrollInfo.height;
            var position = $.extend({}, basePosition);
            var myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());

            if (options.my[0] === 'right') {
                position.left -= elemWidth;
            } else if (options.my[0] === 'center') {
                position.left -= elemWidth / 2;
            }

            if (options.my[1] === 'bottom') {
                position.top -= elemHeight;
            } else if (options.my[1] === 'center') {
                position.top -= elemHeight / 2;
            }

            position.left += myOffset[0];
            position.top += myOffset[1];
            var collisionPosition = {
                marginLeft: marginLeft,
                marginTop: marginTop
            };
            $.each(['left', 'top'], function(i, dir) {
                if (collisions[collision[i]]) {
                    collisions[collision[i]][dir](position, {
                        targetWidth: targetWidth,
                        targetHeight: targetHeight,
                        elemWidth: elemWidth,
                        elemHeight: elemHeight,
                        collisionPosition: collisionPosition,
                        collisionWidth: collisionWidth,
                        collisionHeight: collisionHeight,
                        offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                        my: options.my,
                        at: options.at,
                        within: within,
                        elem: elem
                    });
                }
            });

            if (options.using) {
                using = function using(props) {
                    var left = targetOffset.left - position.left;
                    var right = left + targetWidth - elemWidth;
                    var top = targetOffset.top - position.top;
                    var bottom = top + targetHeight - elemHeight;
                    var feedback = {
                        target: {
                            element: target,
                            left: targetOffset.left,
                            top: targetOffset.top,
                            width: targetWidth,
                            height: targetHeight
                        },
                        element: {
                            element: elem,
                            left: position.left,
                            top: position.top,
                            width: elemWidth,
                            height: elemHeight
                        },
                        horizontal: right < 0 ? 'left' : left > 0 ? 'right' : 'center',
                        vertical: bottom < 0 ? 'top' : top > 0 ? 'bottom' : 'middle'
                    };

                    if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
                        feedback.horizontal = 'center';
                    }

                    if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
                        feedback.vertical = 'middle';
                    }

                    if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
                        feedback.important = 'horizontal';
                    } else {
                        feedback.important = 'vertical';
                    }

                    options.using.call(this, props, feedback);
                };
            }

            elem.offset($.extend(position, {
                using: using
            }));
        });
    };

    if (!$.hasOwnProperty('ui')) {
        $.ui = {};
    }

    $.ui.position = collisions;
})(jQuery);