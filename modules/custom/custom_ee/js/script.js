    Drupal.behaviors.myBehavior = {
        attach: function(context, settings) {
            jQuery(".field--name-field-no-of-participants div input").focusout(function() {
                var no_of_participants = jQuery(this).val();
                if (jQuery.isNumeric(no_of_participants) && jQuery(this).val().length != 0) {
                    jQuery("input#edit-quantity-0-value").val(no_of_participants);
                }
            });
            jQuery(".myForm").trigger("submit");
        }
    };