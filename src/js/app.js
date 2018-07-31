/*
  * base.js
*/
//=include partials/base.js

$(document).ready(function() {
    /*
    * header.js
    */
    //=include partials/header.js

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
    if ($('.js-phone-mask').length > 0) {
        $('.js-phone-mask').inputmask({
            mask: '+7 (999) 999-99-99',
            clearIncomplete: true
        });
    }

    //Click event to scroll to top
    $('.js-go-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 400);
    });

    $(window).scroll(function() {
        console.log('---', 'scroll');
        if ($(this).scrollTop() > $(this).height()) {
            $('.js-go-top').addClass('is-visible');
        } else {
            $('.js-go-top').removeClass('is-visible');
        }
    });

    //Stop drag
    $('img').on('dragstart', function(event) {
        event.preventDefault();
    });

    /*
    * slider.js
    */
    //=include partials/sliders.js
});
