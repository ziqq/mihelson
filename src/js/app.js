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

    //Stop drag
    $('img').on('dragstart', function(event) {
        event.preventDefault();
    });
});
