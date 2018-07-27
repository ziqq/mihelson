//Show Password
$('.js-input-password--show').on('click', function() {
    $(this).css('display', 'none');
    $(this)
        .next()
        .css('display', 'block');
    $(this)
        .parent()
        .find('input[type="password"]')
        .attr('type', 'text');
});
//Hide Password
$('.js-input-password--hide').on('click', function() {
    $(this).css('display', 'none');
    $(this)
        .prev()
        .css('display', 'block');
    $(this)
        .parent()
        .find('input[type="text"]')
        .attr('type', 'password');
});

//checkbox
$(document).on('click', '.js-checkbox', function() {
    if (
        $(this)
            .find('input')
            .is(':checked')
    ) {
        $(this).addClass('is-checked');
    } else {
        $(this).removeClass('is-checked');
    }
});

$(document).on('click', '.js-checkbox--pseudo', function() {
    if ($(this).hasClass('is-checked')) {
        $(this).removeClass('is-checked');
    } else {
        $(this).addClass('is-checked');
    }
});

//radio
$('.js-radio').on('click', function() {
    var radio = $('.js-radio');
    var _this = $(this);
    var input = _this.find('input');
    if (input.is(':checked')) {
        _this.addClass('is-checked');
    } else {
        radio.removeClass('is-checked');
    }
});

//dropdown
if ($('.js-dropdown').length > 0) {
    if ($(window).width() <= 480) {
        $('.js-dropdown').removeClass('dropdown--hover');
    }

    $(document).on('click', '.js-dropdown', function() {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
        } else {
            $('.js-dropdown').removeClass('is-active');
            $(this).addClass('is-active');
        }
    });
    $(document).on('click', function(e) {
        if ($(e.target).closest('.js-dropdown').length) return;
        $('.js-dropdown').removeClass('is-active');
        e.stopPropagation();
    });
}

//Accordeon
$('.js-accordeon')
    .find('.accordeon__item')
    .find('.accordeon__title')
    .on('click', function() {
        if (
            $(this)
                .parent()
                .hasClass('is-open')
        ) {
            $(this)
                .parent()
                .removeClass('is-open')
                .find('.accordeon__content')
                .css('display', 'none');
        } else {
            $(this)
                .parent()
                .addClass('is-open')
                .find('.accordeon__content')
                .removeAttr('style');
        }
    });
