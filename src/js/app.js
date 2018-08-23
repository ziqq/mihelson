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

    //Custom Select https://select2.org/
    if ($('.js-select').length > 0) {
        $('.js-select').select2({
            container: '.cs-select__container'
        });
        $('.js-select.no-search').select2({
            minimumResultsForSearch: -1
        });

        $(document).click(function(event) {
            if (
                $(event.target).closest('.select2-dropdown, .select2-container')
                    .length
            )
                return;
            $('.js-select').select2('close');
            event.stopPropagation();
        });

        $(document).on('focus', '.select2-search__field', function(e) {
            e.stopPropagation();
        });
    }

    //Datepicker http://t1m0n.name/air-datepicker/docs/index-ru.html
    if ('.js-date'.length > 0) {
        var dateToday = new Date();
        $('.js-date').datepicker({
            dateFormat: 'dd.mm.yy',
            autoClose: true,
            minDate: dateToday
        });
        $('.js-input-icon').click(function(event) {
            event.preventDefault();
            $('.js-date').focus();
        });
    }

    //Click event to scroll to top
    $('.js-go-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 400);
    });

    $(window).scroll(function() {
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

    $(document).on('click', function(e) {
        if ($(e.target).closest('.js-dropdown').length) return;
        $('.js-dropdown').removeClass('is-active');
        e.stopPropagation();
    });

    //Section Animarions
    new WOW().init();

    if ($('.js-m-accordeon').length > 0 && $(window).width() <= 480) {
        $('.js-m-accordeon')
            .find('.calculator__desc')
            .slideUp();

        $('.js-m-accordeon-btn').on('click', function() {
            $(this)
                .closest('.js-m-accordeon')
                .find('.calculator__desc')
                .slideToggle();
        });
    }

    //jurnal header fixed
    if ($('.js-jurnal-nav').length > 0) {
        let nav = $('.js-jurnal-nav');
        let headerHeight = $('.header ').outerHeight();
        let headerClone = $('<div class="header-clone">')
            .css('min-height', nav.outerHeight())
            .insertBefore(nav)
            .hide();

        $(window).scroll(function() {
            if ($(window).width() >= 480) {
                if ($(this).scrollTop() > headerHeight) {
                    nav.addClass('is-fixed');
                    headerClone.show();
                } else {
                    nav.removeClass('is-fixed');
                    headerClone.hide();
                }
            } else {
                if ($(this).scrollTop() > 0) {
                    nav.addClass('is-fixed');
                    headerClone.show();
                } else {
                    nav.removeClass('is-fixed');
                    headerClone.hide();
                }
            }
        });
    }

    //Night Mode
    $('.js-night-mode').on('click', function() {
        if ($('.jurnal').hasClass('theme-dark')) {
            $(this)
                .find('.fas')
                .addClass('fal')
                .removeClass('fas');
            $('.jurnal').removeClass('theme-dark');
        } else {
            $(this)
                .find('.fal')
                .removeClass('fal')
                .addClass('fas');
            $('.jurnal').addClass('theme-dark');
        }
    });

    //Dropdown
    if ($('.js-dropdown').length) {
        $('.js-dropdown')
            .on('mouseenter', function() {
                let dropdown = $(this).children('.dropdown__inner');
                let dropdownHeight = $(this)
                    .children('.dropdown__inner')
                    .outerHeight();
                dropdown.css({
                    display: 'block',
                    top: -dropdownHeight - 7 + 'px'
                });
            })
            .on('mouseleave', function() {
                let dropdown = $(this).children('.dropdown__inner');
                dropdown.removeAttr('style');
            });
    }

    /*
    * slider.js
    */
    //=include partials/sliders.js

    /*
    * range-slider.js
    */
    //=include partials/range-slider.js
});
