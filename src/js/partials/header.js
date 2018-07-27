//Header hamburger
$('.js-nav-toggle').on('click', function() {
    if ($(this).hasClass('is-open')) {
        $(this).removeClass('is-open');
        $('.js-nav').fadeOut();
        $('html').removeAttr('style');
    } else {
        $(this).addClass('is-open');
        $('.js-nav').fadeIn();
        $('html').css('overflow', 'hidden');
    }
    return false;
});

//Mobile menu subnav toggle
$('.js-mobile-nav-sub--open').on('click', function() {
    $(this)
        .parent()
        .find('.mobile-nav--sub')
        .addClass('is-open');
});

$('.js-mobile-nav-sub--close').on('click', function() {
    $(this)
        .closest('.mobile-nav--sub')
        .removeClass('is-open');
});

//Mobile Search
if ($('.js-search-input').length > 0) {
    var searchInput = $('.js-search-input');

    searchInput.on('keyup', function() {
        var hint = $(this)
            .closest('.js-search')
            .find('.search__hint');
        if ($(this).val() !== '') {
            hint.removeAttr('style');
        } else {
            hint.css('display', 'none');
        }
    });

    searchInput.on('focus', function() {
        if ($(this).val() !== '') {
            var hint = $(this)
                .closest('.js-search')
                .find('.search__hint');
            hint.removeAttr('style');
        } else {
            hint.css('display', 'none');
        }
    });

    searchInput.on('blur', function() {
        var hint = $(this)
            .closest('.js-search')
            .find('.search__hint');
        hint.css('display', 'none');
    });
}
