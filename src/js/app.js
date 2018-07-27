/*
  * base.js
*/

//=include partials/base.js

$(document).ready(function() {
    //Custom Select https://select2.org/
    if ($('.js-select').length > 0) {
        $('.js-select').select2({
            placeholder: $(this).data('placeholder')
        });

        $('.js-select.bb-select--metro').select2({
            templateResult: addUserPic
        });

        $('.js-select.no-search').select2({
            minimumResultsForSearch: -1
        });

        function addUserPic(opt) {
            if (!opt.id) {
                return opt.text;
            }
            var optimage = $(opt.element).data('image');
            if (!optimage) {
                return opt.text;
            } else {
                var $opt = $(
                    '<span class="metro-icon metro-icon--' +
                        optimage +
                        '">' +
                        $(opt.element).text() +
                        '</span>'
                );
                return $opt;
            }
        }
        $(document).click(function(event) {
            if (
                $(event.target).closest('.select2-dropdown, .select2-container')
                    .length
            )
                return;
            $('.js-select').select2('close');
            $('.js-select--multiple').select2('close');
            event.stopPropagation();
        });
        $(document).on('focus', '.select2-search__field', function(e) {
            e.stopPropagation();
        });
    }
    // else{
    //     $('.js-select, .js-select.bb-select--metro').wrap('<label class="bb-select">');
    // }

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
    if ($('.js-phone-mask').length > 0) {
        $('.js-phone-mask').inputmask({
            mask: '+7 (999) 999-99-99',
            clearIncomplete: true
        });
    }
    if ($('.js-time-mask').length > 0) {
        $('.js-time-mask').inputmask({
            mask: '99:99',
            clearIncomplete: true
        });
    }
    if ($('.js-born-mask').length > 0) {
        $('.js-born-mask').inputmask({
            mask: '99.99.9999',
            clearIncomplete: true
        });
    }

    //Stop drag
    $('img').on('dragstart', function(event) {
        event.preventDefault();
    });
});
