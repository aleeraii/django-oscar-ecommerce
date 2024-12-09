var myBasket = (function(o, $) {
    o.basket = {
        is_form_being_submitted: false,

        init: function(options) {
            if (typeof options == 'undefined') {
                options = {'basketURL': document.URL};
            }
            o.basket.url = options.basketURL || document.URL;

            // Event listener for the remove action
            $('#content_inner').on('click', '#basket_formset a[data-behaviours~="remove"]', function(event) {
                event.preventDefault();

                // Get the item ID to be removed
                var itemId = $(this).data('id');

                // Call the removeItem function and pass the item ID
                o.basket.removeItem(itemId);
            });
        },

        removeItem: function(itemId) {
            // Check if a form is being submitted already
            if (o.basket.is_form_being_submitted) {
                return;
            }

            // Mark the form as being submitted
            o.basket.is_form_being_submitted = true;

            // Find the form that contains this item and remove it
            var form = $('#basket_formset');
            var inputID = '#id_form-' + itemId + '-DELETE'; // Use the correct input ID
            var $checkbox = $(inputID);

            if (!$checkbox.length) {
                console.error('No input found for item ID: ' + itemId);
                return;
            }

            // Mark the item as deleted
            $checkbox.prop('checked', true);

            // Submit the form (this can trigger the AJAX call or server-side action)
            form.submit();
        },
    };

    o.init = function() {
        o.basket.init();
    };

    return o;

})(myBasket || {}, jQuery);

$(document).ready(function() {
    myBasket.init();
});
