/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

(function($, Drupal, debounce) {
    var offsets = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    function getRawOffset(el, edge) {
        var $el = $(el);
        var documentElement = document.documentElement;
        var displacement = 0;
        var horizontal = edge === 'left' || edge === 'right';
        var placement = $el.offset()[horizontal ? 'left' : 'top'];
        placement -= window["scroll".concat(horizontal ? 'X' : 'Y')] || document.documentElement["scroll".concat(horizontal ? 'Left' : 'Top')] || 0;

        switch (edge) {
            case 'top':
                displacement = placement + $el.outerHeight();
                break;

            case 'left':
                displacement = placement + $el.outerWidth();
                break;

            case 'bottom':
                displacement = documentElement.clientHeight - placement;
                break;

            case 'right':
                displacement = documentElement.clientWidth - placement;
                break;

            default:
                displacement = 0;
        }

        return displacement;
    }

    function calculateOffset(edge) {
        var edgeOffset = 0;
        var displacingElements = document.querySelectorAll("[data-offset-".concat(edge, "]"));
        var n = displacingElements.length;

        for (var i = 0; i < n; i++) {
            var el = displacingElements[i];

            if (el.style.display === 'none') {
                continue;
            }

            var displacement = parseInt(el.getAttribute("data-offset-".concat(edge)), 10);

            if (isNaN(displacement)) {
                displacement = getRawOffset(el, edge);
            }

            edgeOffset = Math.max(edgeOffset, displacement);
        }

        return edgeOffset;
    }

    function calculateOffsets() {
        return {
            top: calculateOffset('top'),
            right: calculateOffset('right'),
            bottom: calculateOffset('bottom'),
            left: calculateOffset('left')
        };
    }

    function displace(broadcast) {
        offsets = calculateOffsets();
        Drupal.displace.offsets = offsets;

        if (typeof broadcast === 'undefined' || broadcast) {
            $(document).trigger('drupalViewportOffsetChange', offsets);
        }

        return offsets;
    }

    Drupal.behaviors.drupalDisplace = {
        attach: function attach() {
            if (this.displaceProcessed) {
                return;
            }

            this.displaceProcessed = true;
            $(window).on('resize.drupalDisplace', debounce(displace, 200));
        }
    };
    Drupal.displace = displace;
    $.extend(Drupal.displace, {
        offsets: offsets,
        calculateOffset: calculateOffset
    });
})(jQuery, Drupal, Drupal.debounce);