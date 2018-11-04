'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
  * base.js
*/
$(window).on('load', function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('body').addClass('ios');
    } else {
        $('body').addClass('web');
    }

    $('body').removeClass('loading');
});

$(document).ready(function () {
    /*
    * header.js
    */
    //Header hamburger
    $('.js-nav-toggle').on('click', function () {
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
    $('.js-mobile-nav-sub--open').on('click', function () {
        $(this).parent().find('.mobile-nav--sub').addClass('is-open');
    });

    $('.js-mobile-nav-sub--close').on('click', function () {
        $(this).closest('.mobile-nav--sub').removeClass('is-open');
    });

    //Mobile Search
    if ($('.js-search-input').length > 0) {
        var searchInput = $('.js-search-input');

        searchInput.on('keyup', function () {
            var hint = $(this).closest('.js-search').find('.search__hint');
            if ($(this).val() !== '') {
                hint.removeAttr('style');
            } else {
                hint.css('display', 'none');
            }
        });

        searchInput.on('focus', function () {
            var hint = $(this).closest('.js-search').find('.search__hint');
            if ($(this).val() !== '') {
                hint.removeAttr('style');
            } else {
                hint.css('display', 'none');
            }
        });

        searchInput.on('blur', function () {
            $(this).closest('.js-search').find('.search__hint').css('display', 'none');
        });
    }

    var navList = $('.js-nav-list');
    var overlay = $('.js-nav-overlay');

    if (navList.length) {
        navList.find('.nav__item').on('mouseenter', function () {
            overlay.css('display', 'block');

            if ($('.header').hasClass('header--transparent')) {
                $('.header').css('background-color', '#fff');
            }
        }).on('mouseleave', function () {
            overlay.removeAttr('style');

            if ($('.header').hasClass('header--transparent')) {
                $('.header').css('background-color', 'transparent');
            }
        });
    }

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

        $(document).click(function (event) {
            if ($(event.target).closest('.select2-dropdown, .select2-container').length) return;
            $('.js-select').select2('close');
            event.stopPropagation();
        });

        $(document).on('focus', '.select2-search__field', function (e) {
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
        $('.js-input-icon').click(function (event) {
            event.preventDefault();
            $('.js-date').focus();
        });
    }

    //Click event to scroll to top
    $('.js-go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 400);
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > $(this).height()) {
            $('.js-go-top').addClass('is-visible');
        } else {
            $('.js-go-top').removeClass('is-visible');
        }
    });

    //Stop drag
    $('img').on('dragstart', function (event) {
        event.preventDefault();
    });

    $(document).on('click', function (e) {
        if ($(e.target).closest('.js-dropdown').length) return;
        $('.js-dropdown').removeClass('is-active');
        e.stopPropagation();
    });

    //Section Animarions
    new WOW().init();

    if ($('.js-m-accordeon').length > 0 && $(window).width() <= 480) {
        $('.js-m-accordeon').find('.calculator__desc').slideUp();

        $('.js-m-accordeon-btn').on('click', function () {
            $(this).closest('.js-m-accordeon').find('.calculator__desc').slideToggle();
        });
    }

    //jurnal header fixed
    if ($('.js-jurnal-nav').length > 0) {
        var nav = $('.js-jurnal-nav');
        var headerHeight = $('.header ').outerHeight();
        var headerClone = $('<div class="header-clone">').css('min-height', nav.outerHeight()).insertBefore(nav).hide();

        $(window).scroll(function () {
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
    $('.js-night-mode').on('click', function () {
        if ($('.jurnal').hasClass('theme-dark')) {
            $(this).find('.fas').addClass('fal').removeClass('fas');
            $('.jurnal').removeClass('theme-dark');
        } else {
            $(this).find('.fal').removeClass('fal').addClass('fas');
            $('.jurnal').addClass('theme-dark');
        }
    });

    //Dropdown
    if ($('.js-dropdown').length) {
        $('.js-dropdown').on('mouseenter', function () {
            var dropdown = $(this).children('.dropdown__inner');
            var dropdownHeight = $(this).children('.dropdown__inner').outerHeight();
            dropdown.css({
                display: 'block',
                top: -dropdownHeight - 7 + 'px'
            });
        }).on('mouseleave', function () {
            var dropdown = $(this).children('.dropdown__inner');
            dropdown.removeAttr('style');
        });
    }

    /*
    * slider.js
    */
    //Slick Slider https://kenwheeler.github.io/slick/
    // if ($('.js-hero-slider').find('.m-slider__slide').length > 1) {
    //     $('.js-hero-slider').slick({
    //         arrows: true,
    //         infinite: true,
    //         autoplay: true,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         speed: 400,
    //         autoplaySpeed: 5000,
    //         dots: true,
    //         appendDots: '.hero__slider .m-slider__dots',
    //         dots: true,
    //         customPaging: function(slider, i) {
    //             return i + 1 + '/' + slider.slideCount;
    //         },
    //         responsive: [
    //             {
    //                 breakpoint: 481,
    //                 settings: {
    //                     dots: false,
    //                     arrows: false
    //                 }
    //             }
    //         ]
    //     });
    // }

    if ($('.js-hero-slider').length) {
        console.log('---', 'init');
        $('.js-hero-slider').each(function () {
            var $slide = $(this).find('.m-slider__slide');
            if ($slide.length > 1) {
                var _$$slick;

                $(this).slick((_$$slick = {
                    arrows: true,
                    infinite: true,
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 400,
                    autoplaySpeed: 5000,
                    dots: true,
                    appendDots: '.hero__slider .m-slider__dots'
                }, _defineProperty(_$$slick, 'dots', true), _defineProperty(_$$slick, 'customPaging', function customPaging(slider, i) {
                    return i + 1 + '/' + slider.slideCount;
                }), _defineProperty(_$$slick, 'responsive', [{
                    breakpoint: 481,
                    settings: {
                        dots: false,
                        arrows: false
                    }
                }]), _$$slick));
            }
        });
    }

    var infoSliderSettings = {
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 700,
        dots: false,
        responsive: [{
            breakpoint: 481,
            settings: {
                dots: false,
                arrows: false
            }
        }]
    };

    if ($('.js-slider').length) {
        $('.js-slider').each(function () {
            var $slide = $(this).find('.m-slider__slide');
            if ($slide.length > 1) {
                $(this).slick({
                    infoSliderSettings: infoSliderSettings
                });
            }
        });
    }

    if ($('.js-jurnal-slider').length) {
        $('.js-jurnal-slider').each(function () {
            var $slide = $(this).find('.m-slider__slide');
            if ($slide.length > 1) {
                $(this).slick({
                    arrows: true,
                    infinite: true,
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 700,
                    autoplaySpeed: 5000,
                    dots: true,
                    appendDots: '.jurnal-article__slider .m-slider__dots',
                    customPaging: function customPaging(slider, i) {
                        return i + 1 + '/' + slider.slideCount;
                    },
                    responsive: [{
                        breakpoint: 481,
                        settings: {
                            dots: false,
                            arrows: false
                        }
                    }]
                });
            }
        });
    }

    // if ($('.js-jurnal-slider').find('.m-slider__slide').length > 1) {
    //     $('.js-jurnal-slider').slick({
    //         arrows: true,
    //         infinite: true,
    //         autoplay: true,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         speed: 700,
    //         autoplaySpeed: 5000,
    //         dots: true,
    //         appendDots: '.jurnal-article__slider .m-slider__dots',
    //         customPaging: function(slider, i) {
    //             return i + 1 + '/' + slider.slideCount;
    //         },
    //         responsive: [
    //             {
    //                 breakpoint: 481,
    //                 settings: {
    //                     dots: false,
    //                     arrows: false
    //                 }
    //             }
    //         ]
    //     });
    // }


    /*
    * range-slider.js
    */
    //Price Slider
    if ($('.js-calculator').length > 0) {
        var profit = $('.js-calculator-profit');
        var result = $('.js-calculator-result');
        var btn = $('.js-calculator-btn');
        var profitData = profit.data('profit');

        var sliderSum = document.getElementById('calculator-sum');
        var sliderSumBox = $('#calculator-sum-price');

        var sliderStatus = document.getElementById('calculator-status');
        var sliderStatusBox = $('#calculator-status-vall');

        var calculatorItem = $('.calculator-item');
        var calculatorItemOpt = $('.calculator-item--opt');
        var calculatorItemDiler = $('.calculator-item--diler');
        var calculatorItemDilerPlus = $('.calculator-item--dilerplus');

        var rangeSum = ['50000', '100000', '300000', '500000', '700000', '900000', '1000000'];

        var rangeStatus = ['Оптовик', 'Дилер', 'Дилер +'];

        noUiSlider.create(sliderSum, {
            animationDuration: 300,
            start: 3,
            step: 1,

            format: wNumb({
                decimals: 0
            }),

            behaviour: 'tap',
            connect: [false, true],
            range: {
                min: 0,
                max: 6
            }
        });

        noUiSlider.create(sliderStatus, {
            animationDuration: 300,
            start: 1,
            step: 1,
            format: wNumb({
                decimals: 0
            }),

            behaviour: 'tap',
            connect: [false, true],
            range: {
                min: 0,
                max: 2
            }
        });

        sliderSum.noUiSlider.on('update', function (values, handle) {
            var profitData = profit.attr('data-profit');

            sliderSumBox.text(rangeSum[values[handle]]);
            result.text(rangeSum[values[handle]] * profitData / 100);

            if (rangeSum[values[handle]] === '50000' || rangeSum[values[handle]] < '500000') {
                sliderStatus.noUiSlider.set(0);
                result.text(rangeSum[values[handle]] * 20 / 100);
                profit.text('20%');
                profit.attr('data-profit', '20');
                btn.text('Стать оптовиком');

                if (calculatorItemOpt.hasClass('is-hidden')) {
                    calculatorItem.addClass('is-hidden').removeClass('wow fadeInUp');
                    calculatorItemOpt.removeClass('is-hidden').addClass('wow fadeInUp');
                    new WOW().init();
                }
            } else if (rangeSum[values[handle]] === '500000' || rangeSum[values[handle]] <= '900000' || rangeSum[values[handle]] === '900000') {
                sliderStatus.noUiSlider.set(1);
                result.text(rangeSum[values[handle]] * 25 / 100);
                profit.attr('data-profit', '25');
                profit.text('25%');
                btn.text('Стать дилером');

                if (calculatorItemDiler.hasClass('is-hidden')) {
                    calculatorItem.addClass('is-hidden').removeClass('wow fadeInUp');
                    calculatorItemDiler.removeClass('is-hidden').addClass('wow fadeInUp');
                    new WOW().init();
                }
            } else if (rangeSum[values[handle]] === '100000') {
                sliderStatus.noUiSlider.set(2);
                result.text(rangeSum[values[handle]] * 30 / 100);
                profit.text('30%');
                profit.attr('data-profit', '30');
                btn.text('Стать дилером +');

                if (calculatorItemDilerPlus.hasClass('is-hidden')) {
                    calculatorItem.addClass('is-hidden').removeClass('wow fadeInUp');
                    calculatorItemDilerPlus.removeClass('is-hidden').addClass('wow fadeInUp');
                    new WOW().init();
                }
            }
            if (rangeSum[values[handle]] === '1000000') {
                sliderStatus.noUiSlider.set(2);
                result.text(rangeSum[values[handle]] * 30 / 100);
                profit.text('30%');
                profit.attr('data-profit', '30');
                btn.text('Стать дилером +');

                if (calculatorItemDilerPlus.hasClass('is-hidden')) {
                    calculatorItem.addClass('is-hidden').removeClass('wow fadeInUp');
                    calculatorItemDilerPlus.removeClass('is-hidden').addClass('wow fadeInUp');
                    new WOW().init();
                }
            }
        });

        sliderStatus.noUiSlider.on('update', function (values, handle) {
            sliderStatusBox.text(rangeStatus[values[handle]]);

            // if (rangeStatus[values[handle]] === 'Дилер') {
            //     result.text((rangeSum[values[handle]] * profitData) / 100);

            //     // sliderSum.noUiSlider.set(4);
            // } else if (rangeStatus[values[handle]] === 'Дилер +') {
            //     // sliderSum.noUiSlider.set(7);
            //     result.text((rangeSum[values[handle]] * profitData) / 100);
            // } else {
            //     result.text((rangeSum[values[handle]] * profitData) / 100);
            //     // sliderSum.noUiSlider.set(0);
            // }
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwib24iLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImRvY3VtZW50IiwicmVhZHkiLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwiY3NzIiwicGFyZW50IiwiZmluZCIsImNsb3Nlc3QiLCJsZW5ndGgiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJ2YWwiLCJuYXZMaXN0Iiwib3ZlcmxheSIsImlucHV0bWFzayIsIm1hc2siLCJjbGVhckluY29tcGxldGUiLCJzZWxlY3QyIiwiY29udGFpbmVyIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJjbGljayIsImV2ZW50IiwidGFyZ2V0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZSIsImRhdGVUb2RheSIsIkRhdGUiLCJkYXRlcGlja2VyIiwiZGF0ZUZvcm1hdCIsImF1dG9DbG9zZSIsIm1pbkRhdGUiLCJwcmV2ZW50RGVmYXVsdCIsImZvY3VzIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInNjcm9sbCIsImhlaWdodCIsIldPVyIsImluaXQiLCJ3aWR0aCIsInNsaWRlVXAiLCJzbGlkZVRvZ2dsZSIsIm5hdiIsImhlYWRlckhlaWdodCIsIm91dGVySGVpZ2h0IiwiaGVhZGVyQ2xvbmUiLCJpbnNlcnRCZWZvcmUiLCJoaWRlIiwic2hvdyIsImRyb3Bkb3duIiwiY2hpbGRyZW4iLCJkcm9wZG93bkhlaWdodCIsImRpc3BsYXkiLCJ0b3AiLCJjb25zb2xlIiwibG9nIiwiZWFjaCIsIiRzbGlkZSIsInNsaWNrIiwiYXJyb3dzIiwiaW5maW5pdGUiLCJhdXRvcGxheSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiZG90cyIsImFwcGVuZERvdHMiLCJzbGlkZXIiLCJpIiwic2xpZGVDb3VudCIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsImluZm9TbGlkZXJTZXR0aW5ncyIsInJlc3BvbnNpdmUiLCJjdXN0b21QYWdpbmciLCJwcm9maXQiLCJyZXN1bHQiLCJidG4iLCJwcm9maXREYXRhIiwiZGF0YSIsInNsaWRlclN1bSIsImdldEVsZW1lbnRCeUlkIiwic2xpZGVyU3VtQm94Iiwic2xpZGVyU3RhdHVzIiwic2xpZGVyU3RhdHVzQm94IiwiY2FsY3VsYXRvckl0ZW0iLCJjYWxjdWxhdG9ySXRlbU9wdCIsImNhbGN1bGF0b3JJdGVtRGlsZXIiLCJjYWxjdWxhdG9ySXRlbURpbGVyUGx1cyIsInJhbmdlU3VtIiwicmFuZ2VTdGF0dXMiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJzdGFydCIsInN0ZXAiLCJmb3JtYXQiLCJ3TnVtYiIsImRlY2ltYWxzIiwiYmVoYXZpb3VyIiwiY29ubmVjdCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWVzIiwiaGFuZGxlIiwiYXR0ciIsInRleHQiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7O0FBR0FBLEVBQUVDLE1BQUYsRUFBVUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM1QixRQUNJLDZDQUE2Q0MsSUFBN0MsQ0FBa0RDLFVBQVVDLFNBQTVELENBREosRUFFRTtBQUNFTCxVQUFFLE1BQUYsRUFBVU0sUUFBVixDQUFtQixLQUFuQjtBQUNILEtBSkQsTUFJTztBQUNITixVQUFFLE1BQUYsRUFBVU0sUUFBVixDQUFtQixLQUFuQjtBQUNIOztBQUVETixNQUFFLE1BQUYsRUFBVU8sV0FBVixDQUFzQixTQUF0QjtBQUNILENBVkQ7O0FBYUFQLEVBQUVRLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCOzs7QUFHQTtBQUNBVCxNQUFFLGdCQUFGLEVBQW9CRSxFQUFwQixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBQ3ZDLFlBQUlGLEVBQUUsSUFBRixFQUFRVSxRQUFSLENBQWlCLFNBQWpCLENBQUosRUFBaUM7QUFDN0JWLGNBQUUs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Qy9Dc0YsbUNBQ0sxRixRQURMLENBQ2MsV0FEZCxFQUVLQyxXQUZMLENBRWlCLGNBRmpCO0FBR0E0Riw0Q0FDSzVGLFdBREwsQ0FDaUIsV0FEakIsRUFFS0QsUUFGTCxDQUVjLGNBRmQ7QUFHQSx3QkFBSXlDLEdBQUosR0FBVUMsSUFBVjtBQUNIO0FBQ0o7QUFDSixTQS9FRDs7QUFpRkE4QyxxQkFBYVEsVUFBYixDQUF3QnBHLEVBQXhCLENBQTJCLFFBQTNCLEVBQXFDLFVBQVNpSCxNQUFULEVBQWlCQyxNQUFqQixFQUF5QjtBQUMxRHJCLDRCQUFnQnVCLElBQWhCLENBQXFCakIsWUFBWWMsT0FBT0MsTUFBUCxDQUFaLENBQXJCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILFNBZEQ7QUFlSDtBQUVKLENBN2lCRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAqIGJhc2UuanNcbiovXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoXG4gICAgICAgIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpb3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3dlYicpO1xuICAgIH1cblxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xufSk7XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLypcbiAgICAqIGhlYWRlci5qc1xuICAgICovXG4gICAgLy9IZWFkZXIgaGFtYnVyZ2VyXG4gICAgJCgnLmpzLW5hdi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIC8vTW9iaWxlIG1lbnUgc3VibmF2IHRvZ2dsZVxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCcubW9iaWxlLW5hdi0tc3ViJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5tb2JpbGUtbmF2LS1zdWInKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9Nb2JpbGUgU2VhcmNoXG4gICAgaWYgKCQoJy5qcy1zZWFyY2gtaW5wdXQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBzZWFyY2hJbnB1dCA9ICQoJy5qcy1zZWFyY2gtaW5wdXQnKTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgbGV0IG5hdkxpc3QgPSAkKCcuanMtbmF2LWxpc3QnKTtcbiAgICBsZXQgb3ZlcmxheSA9ICQoJy5qcy1uYXYtb3ZlcmxheScpO1xuICAgIFxuICAgIGlmIChuYXZMaXN0Lmxlbmd0aCkge1xuICAgICAgICBuYXZMaXN0XG4gICAgICAgICAgICAuZmluZCgnLm5hdl9faXRlbScpXG4gICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBvdmVybGF5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmICgkKCcuaGVhZGVyJykuaGFzQ2xhc3MoJ2hlYWRlci0tdHJhbnNwYXJlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuaGVhZGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyNmZmYnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmICgkKCcuaGVhZGVyJykuaGFzQ2xhc3MoJ2hlYWRlci0tdHJhbnNwYXJlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuaGVhZGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3RyYW5zcGFyZW50Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXG4gICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XG4gICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5JyxcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgY29udGFpbmVyOiAnLmNzLXNlbGVjdF9fY29udGFpbmVyJ1xuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuc2VsZWN0Mi1kcm9wZG93biwgLnNlbGVjdDItY29udGFpbmVyJylcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCdjbG9zZScpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdmb2N1cycsICcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9EYXRlcGlja2VyIGh0dHA6Ly90MW0wbi5uYW1lL2Fpci1kYXRlcGlja2VyL2RvY3MvaW5kZXgtcnUuaHRtbFxuICAgIGlmICgnLmpzLWRhdGUnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGRhdGVUb2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICQoJy5qcy1kYXRlJykuZGF0ZXBpY2tlcih7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnZGQubW0ueXknLFxuICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxuICAgICAgICAgICAgbWluRGF0ZTogZGF0ZVRvZGF5XG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtaW5wdXQtaWNvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnLmpzLWRhdGUnKS5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDQwMCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vU3RvcCBkcmFnXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgLy9TZWN0aW9uIEFuaW1hcmlvbnNcbiAgICBuZXcgV09XKCkuaW5pdCgpO1xuXG4gICAgaWYgKCQoJy5qcy1tLWFjY29yZGVvbicpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgICQoJy5qcy1tLWFjY29yZGVvbicpXG4gICAgICAgICAgICAuZmluZCgnLmNhbGN1bGF0b3JfX2Rlc2MnKVxuICAgICAgICAgICAgLnNsaWRlVXAoKTtcblxuICAgICAgICAkKCcuanMtbS1hY2NvcmRlb24tYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tLWFjY29yZGVvbicpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5jYWxjdWxhdG9yX19kZXNjJylcbiAgICAgICAgICAgICAgICAuc2xpZGVUb2dnbGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9qdXJuYWwgaGVhZGVyIGZpeGVkXG4gICAgaWYgKCQoJy5qcy1qdXJuYWwtbmF2JykubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgbmF2ID0gJCgnLmpzLWp1cm5hbC1uYXYnKTtcbiAgICAgICAgbGV0IGhlYWRlckhlaWdodCA9ICQoJy5oZWFkZXIgJykub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgbGV0IGhlYWRlckNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1jbG9uZVwiPicpXG4gICAgICAgICAgICAuY3NzKCdtaW4taGVpZ2h0JywgbmF2Lm91dGVySGVpZ2h0KCkpXG4gICAgICAgICAgICAuaW5zZXJ0QmVmb3JlKG5hdilcbiAgICAgICAgICAgIC5oaWRlKCk7XG5cbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA0ODApIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IGhlYWRlckhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBuYXYuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckNsb25lLnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuYXYucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckNsb25lLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBuYXYuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckNsb25lLnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuYXYucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckNsb25lLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vTmlnaHQgTW9kZVxuICAgICQoJy5qcy1uaWdodC1tb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKCcuanVybmFsJykuaGFzQ2xhc3MoJ3RoZW1lLWRhcmsnKSkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuZmFzJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhbCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYXMnKTtcbiAgICAgICAgICAgICQoJy5qdXJuYWwnKS5yZW1vdmVDbGFzcygndGhlbWUtZGFyaycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuZmFsJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhbCcpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYXMnKTtcbiAgICAgICAgICAgICQoJy5qdXJuYWwnKS5hZGRDbGFzcygndGhlbWUtZGFyaycpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL0Ryb3Bkb3duXG4gICAgaWYgKCQoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkge1xuICAgICAgICAkKCcuanMtZHJvcGRvd24nKVxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRyb3Bkb3duID0gJCh0aGlzKS5jaGlsZHJlbignLmRyb3Bkb3duX19pbm5lcicpO1xuICAgICAgICAgICAgICAgIGxldCBkcm9wZG93bkhlaWdodCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuZHJvcGRvd25fX2lubmVyJylcbiAgICAgICAgICAgICAgICAgICAgLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgZHJvcGRvd24uY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAtZHJvcGRvd25IZWlnaHQgLSA3ICsgJ3B4J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBkcm9wZG93biA9ICQodGhpcykuY2hpbGRyZW4oJy5kcm9wZG93bl9faW5uZXInKTtcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIHNsaWRlci5qc1xuICAgICovXG4gICAgLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cbiAgICAvLyBpZiAoJCgnLmpzLWhlcm8tc2xpZGVyJykuZmluZCgnLm0tc2xpZGVyX19zbGlkZScpLmxlbmd0aCA+IDEpIHtcbiAgICAvLyAgICAgJCgnLmpzLWhlcm8tc2xpZGVyJykuc2xpY2soe1xuICAgIC8vICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgIC8vICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgLy8gICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAvLyAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAvLyAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgIC8vICAgICAgICAgc3BlZWQ6IDQwMCxcbiAgICAvLyAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgLy8gICAgICAgICBkb3RzOiB0cnVlLFxuICAgIC8vICAgICAgICAgYXBwZW5kRG90czogJy5oZXJvX19zbGlkZXIgLm0tc2xpZGVyX19kb3RzJyxcbiAgICAvLyAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgLy8gICAgICAgICBjdXN0b21QYWdpbmc6IGZ1bmN0aW9uKHNsaWRlciwgaSkge1xuICAgIC8vICAgICAgICAgICAgIHJldHVybiBpICsgMSArICcvJyArIHNsaWRlci5zbGlkZUNvdW50O1xuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAvLyAgICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAvLyAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgXVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG4gICAgXG4gICAgaWYgKCQoJy5qcy1oZXJvLXNsaWRlcicpLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgJ2luaXQnKTtcbiAgICAgICAgJCgnLmpzLWhlcm8tc2xpZGVyJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5tLXNsaWRlcl9fc2xpZGUnKTtcbiAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICQodGhpcykuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kRG90czogJy5oZXJvX19zbGlkZXIgLm0tc2xpZGVyX19kb3RzJyxcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tUGFnaW5nOiBmdW5jdGlvbihzbGlkZXIsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpICsgMSArICcvJyArIHNsaWRlci5zbGlkZUNvdW50O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICB2YXIgaW5mb1NsaWRlclNldHRpbmdzID0ge1xuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBzcGVlZDogNzAwLFxuICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgXG4gICAgaWYgKCQoJy5qcy1zbGlkZXInKS5sZW5ndGgpIHtcbiAgICAgICAgJCgnLmpzLXNsaWRlcicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcubS1zbGlkZXJfX3NsaWRlJyk7XG4gICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgaW5mb1NsaWRlclNldHRpbmdzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBpZiAoJCgnLmpzLWp1cm5hbC1zbGlkZXInKS5sZW5ndGgpIHtcbiAgICAgICAgJCgnLmpzLWp1cm5hbC1zbGlkZXInKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLm0tc2xpZGVyX19zbGlkZScpO1xuICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogNzAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhcHBlbmREb3RzOiAnLmp1cm5hbC1hcnRpY2xlX19zbGlkZXIgLm0tc2xpZGVyX19kb3RzJyxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tUGFnaW5nOiBmdW5jdGlvbihzbGlkZXIsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpICsgMSArICcvJyArIHNsaWRlci5zbGlkZUNvdW50O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvLyBpZiAoJCgnLmpzLWp1cm5hbC1zbGlkZXInKS5maW5kKCcubS1zbGlkZXJfX3NsaWRlJykubGVuZ3RoID4gMSkge1xuICAgIC8vICAgICAkKCcuanMtanVybmFsLXNsaWRlcicpLnNsaWNrKHtcbiAgICAvLyAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAvLyAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgIC8vICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgLy8gICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgLy8gICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAvLyAgICAgICAgIHNwZWVkOiA3MDAsXG4gICAgLy8gICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgIC8vICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAvLyAgICAgICAgIGFwcGVuZERvdHM6ICcuanVybmFsLWFydGljbGVfX3NsaWRlciAubS1zbGlkZXJfX2RvdHMnLFxuICAgIC8vICAgICAgICAgY3VzdG9tUGFnaW5nOiBmdW5jdGlvbihzbGlkZXIsIGkpIHtcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gaSArIDEgKyAnLycgKyBzbGlkZXIuc2xpZGVDb3VudDtcbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgLy8gICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgLy8gICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIF1cbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfVxuICAgIFxuXG4gICAgLypcbiAgICAqIHJhbmdlLXNsaWRlci5qc1xuICAgICovXG4gICAgLy9QcmljZSBTbGlkZXJcclxuICAgIGlmICgkKCcuanMtY2FsY3VsYXRvcicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBsZXQgcHJvZml0ID0gJCgnLmpzLWNhbGN1bGF0b3ItcHJvZml0Jyk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9ICQoJy5qcy1jYWxjdWxhdG9yLXJlc3VsdCcpO1xyXG4gICAgICAgIGxldCBidG4gPSAkKCcuanMtY2FsY3VsYXRvci1idG4nKTtcclxuICAgICAgICBsZXQgcHJvZml0RGF0YSA9IHByb2ZpdC5kYXRhKCdwcm9maXQnKTtcclxuICAgIFxyXG4gICAgICAgIGxldCBzbGlkZXJTdW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsY3VsYXRvci1zdW0nKTtcclxuICAgICAgICBsZXQgc2xpZGVyU3VtQm94ID0gJCgnI2NhbGN1bGF0b3Itc3VtLXByaWNlJyk7XHJcbiAgICBcclxuICAgICAgICBsZXQgc2xpZGVyU3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0b3Itc3RhdHVzJyk7XHJcbiAgICAgICAgbGV0IHNsaWRlclN0YXR1c0JveCA9ICQoJyNjYWxjdWxhdG9yLXN0YXR1cy12YWxsJyk7XHJcbiAgICBcclxuICAgICAgICBsZXQgY2FsY3VsYXRvckl0ZW0gPSAkKCcuY2FsY3VsYXRvci1pdGVtJyk7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JJdGVtT3B0ID0gJCgnLmNhbGN1bGF0b3ItaXRlbS0tb3B0Jyk7XHJcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JJdGVtRGlsZXIgPSAkKCcuY2FsY3VsYXRvci1pdGVtLS1kaWxlcicpO1xyXG4gICAgICAgIGxldCBjYWxjdWxhdG9ySXRlbURpbGVyUGx1cyA9ICQoJy5jYWxjdWxhdG9yLWl0ZW0tLWRpbGVycGx1cycpO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IHJhbmdlU3VtID0gW1xyXG4gICAgICAgICAgICAnNTAwMDAnLFxyXG4gICAgICAgICAgICAnMTAwMDAwJyxcclxuICAgICAgICAgICAgJzMwMDAwMCcsXHJcbiAgICAgICAgICAgICc1MDAwMDAnLFxyXG4gICAgICAgICAgICAnNzAwMDAwJyxcclxuICAgICAgICAgICAgJzkwMDAwMCcsXHJcbiAgICAgICAgICAgICcxMDAwMDAwJ1xyXG4gICAgICAgIF07XHJcbiAgICBcclxuICAgICAgICBsZXQgcmFuZ2VTdGF0dXMgPSBbJ9Ce0L/RgtC+0LLQuNC6JywgJ9CU0LjQu9C10YAnLCAn0JTQuNC70LXRgCArJ107XHJcbiAgICBcclxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXJTdW0sIHtcclxuICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IDMwMCxcclxuICAgICAgICAgICAgc3RhcnQ6IDMsXHJcbiAgICAgICAgICAgIHN0ZXA6IDEsXHJcbiAgICBcclxuICAgICAgICAgICAgZm9ybWF0OiB3TnVtYih7XHJcbiAgICAgICAgICAgICAgICBkZWNpbWFsczogMFxyXG4gICAgICAgICAgICB9KSxcclxuICAgIFxyXG4gICAgICAgICAgICBiZWhhdmlvdXI6ICd0YXAnLFxyXG4gICAgICAgICAgICBjb25uZWN0OiBbZmFsc2UsIHRydWVdLFxyXG4gICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgbWF4OiA2XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlclN0YXR1cywge1xyXG4gICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogMzAwLFxyXG4gICAgICAgICAgICBzdGFydDogMSxcclxuICAgICAgICAgICAgc3RlcDogMSxcclxuICAgICAgICAgICAgZm9ybWF0OiB3TnVtYih7XHJcbiAgICAgICAgICAgICAgICBkZWNpbWFsczogMFxyXG4gICAgICAgICAgICB9KSxcclxuICAgIFxyXG4gICAgICAgICAgICBiZWhhdmlvdXI6ICd0YXAnLFxyXG4gICAgICAgICAgICBjb25uZWN0OiBbZmFsc2UsIHRydWVdLFxyXG4gICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgbWF4OiAyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIHNsaWRlclN1bS5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbih2YWx1ZXMsIGhhbmRsZSkge1xyXG4gICAgICAgICAgICB2YXIgcHJvZml0RGF0YSA9IHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHNsaWRlclN1bUJveC50ZXh0KHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiBwcm9maXREYXRhKSAvIDEwMCk7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgcmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dID09PSAnNTAwMDAnIHx8XHJcbiAgICAgICAgICAgICAgICByYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gPCAnNTAwMDAwJ1xyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclN0YXR1cy5ub1VpU2xpZGVyLnNldCgwKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiAyMCkgLyAxMDApO1xyXG4gICAgICAgICAgICAgICAgcHJvZml0LnRleHQoJzIwJScpO1xyXG4gICAgICAgICAgICAgICAgcHJvZml0LmF0dHIoJ2RhdGEtcHJvZml0JywgJzIwJyk7XHJcbiAgICAgICAgICAgICAgICBidG4udGV4dCgn0KHRgtCw0YLRjCDQvtC/0YLQvtCy0LjQutC+0LwnKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGN1bGF0b3JJdGVtT3B0Lmhhc0NsYXNzKCdpcy1oaWRkZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd3b3cgZmFkZUluVXAnKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbU9wdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnd293IGZhZGVJblVwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdPVygpLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA9PT0gJzUwMDAwMCcgfHxcclxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA8PSAnOTAwMDAwJyB8fFxyXG4gICAgICAgICAgICAgICAgcmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dID09PSAnOTAwMDAwJ1xyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclN0YXR1cy5ub1VpU2xpZGVyLnNldCgxKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiAyNSkgLyAxMDApO1xyXG4gICAgICAgICAgICAgICAgcHJvZml0LmF0dHIoJ2RhdGEtcHJvZml0JywgJzI1Jyk7XHJcbiAgICAgICAgICAgICAgICBwcm9maXQudGV4dCgnMjUlJyk7XHJcbiAgICAgICAgICAgICAgICBidG4udGV4dCgn0KHRgtCw0YLRjCDQtNC40LvQtdGA0L7QvCcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsY3VsYXRvckl0ZW1EaWxlci5oYXNDbGFzcygnaXMtaGlkZGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnd293IGZhZGVJblVwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1EaWxlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnd293IGZhZGVJblVwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdPVygpLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gPT09ICcxMDAwMDAnKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5zZXQoMik7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogMzApIC8gMTAwKTtcclxuICAgICAgICAgICAgICAgIHByb2ZpdC50ZXh0KCczMCUnKTtcclxuICAgICAgICAgICAgICAgIHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcsICczMCcpO1xyXG4gICAgICAgICAgICAgICAgYnRuLnRleHQoJ9Ch0YLQsNGC0Ywg0LTQuNC70LXRgNC+0LwgKycpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsY3VsYXRvckl0ZW1EaWxlclBsdXMuaGFzQ2xhc3MoJ2lzLWhpZGRlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtRGlsZXJQbHVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCd3b3cgZmFkZUluVXAnKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgV09XKCkuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gPT09ICcxMDAwMDAwJykge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyU3RhdHVzLm5vVWlTbGlkZXIuc2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIDMwKSAvIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBwcm9maXQudGV4dCgnMzAlJyk7XHJcbiAgICAgICAgICAgICAgICBwcm9maXQuYXR0cignZGF0YS1wcm9maXQnLCAnMzAnKTtcclxuICAgICAgICAgICAgICAgIGJ0bi50ZXh0KCfQodGC0LDRgtGMINC00LjQu9C10YDQvtC8ICsnKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGN1bGF0b3JJdGVtRGlsZXJQbHVzLmhhc0NsYXNzKCdpcy1oaWRkZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd3b3cgZmFkZUluVXAnKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbURpbGVyUGx1c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnd293IGZhZGVJblVwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdPVygpLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgc2xpZGVyU3RhdHVzLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKSB7XHJcbiAgICAgICAgICAgIHNsaWRlclN0YXR1c0JveC50ZXh0KHJhbmdlU3RhdHVzW3ZhbHVlc1toYW5kbGVdXSk7XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gaWYgKHJhbmdlU3RhdHVzW3ZhbHVlc1toYW5kbGVdXSA9PT0gJ9CU0LjQu9C10YAnKSB7XHJcbiAgICAgICAgICAgIC8vICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vICAgICAvLyBzbGlkZXJTdW0ubm9VaVNsaWRlci5zZXQoNCk7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAocmFuZ2VTdGF0dXNbdmFsdWVzW2hhbmRsZV1dID09PSAn0JTQuNC70LXRgCArJykge1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gc2xpZGVyU3VtLm5vVWlTbGlkZXIuc2V0KDcpO1xyXG4gICAgICAgICAgICAvLyAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIHByb2ZpdERhdGEpIC8gMTAwKTtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiBwcm9maXREYXRhKSAvIDEwMCk7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyBzbGlkZXJTdW0ubm9VaVNsaWRlci5zZXQoMCk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxufSk7XG4iXX0=
