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
        }).on('mouseout', function () {
            overlay.removeAttr('style');
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

    $('.js-dropdown').on('click', function () {
        $('.js-dropdown').removeClass('is-active');
        $(this).addClass('is-active');
    });

    $('.js-dropdown--close').on('click', function (e) {
        $(this).closest('.js-dropdown').removeClass('is-active');
        e.stopPropagation();
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

    /*
    * slider.js
    */
    //Slick Slider https://kenwheeler.github.io/slick/
    if ($('.js-hero-slider').find('.m-slider__slide').length > 1) {
        var _$$slick;

        $('.js-hero-slider').slick((_$$slick = {
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

    if ($('.js-slider').find('.m-slider__slide').length > 1) {
        $('.js-slider').slick({
            infoSliderSettings: infoSliderSettings
        });
    }

    if ($('.js-jurnal-slider').find('.m-slider__slide').length > 1) {
        $('.js-jurnal-slider').slick({
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

    /*
    * range-slider.js
    */
    //Price Slider
    if ($('.js-calculator').length > 0) {
        var profit = $('.js-calculator-profit');
        var result = $('.js-calculator-result');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwib24iLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImRvY3VtZW50IiwicmVhZHkiLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwiY3NzIiwicGFyZW50IiwiZmluZCIsImNsb3Nlc3QiLCJsZW5ndGgiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJ2YWwiLCJuYXZMaXN0Iiwib3ZlcmxheSIsImlucHV0bWFzayIsIm1hc2siLCJjbGVhckluY29tcGxldGUiLCJzZWxlY3QyIiwiY29udGFpbmVyIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJjbGljayIsImV2ZW50IiwidGFyZ2V0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZSIsImRhdGVUb2RheSIsIkRhdGUiLCJkYXRlcGlja2VyIiwiZGF0ZUZvcm1hdCIsImF1dG9DbG9zZSIsIm1pbkRhdGUiLCJwcmV2ZW50RGVmYXVsdCIsImZvY3VzIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInNjcm9sbCIsImhlaWdodCIsIldPVyIsImluaXQiLCJ3aWR0aCIsInNsaWRlVXAiLCJzbGlkZVRvZ2dsZSIsIm5hdiIsImhlYWRlckhlaWdodCIsIm91dGVySGVpZ2h0IiwiaGVhZGVyQ2xvbmUiLCJpbnNlcnRCZWZvcmUiLCJoaWRlIiwic2hvdyIsInNsaWNrIiwiYXJyb3dzIiwiaW5maW5pdGUiLCJhdXRvcGxheSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiZG90cyIsImFwcGVuZERvdHMiLCJzbGlkZXIiLCJpIiwic2xpZGVDb3VudCIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsImluZm9TbGlkZXJTZXR0aW5ncyIsInJlc3BvbnNpdmUiLCJjdXN0b21QYWdpbmciLCJwcm9maXQiLCJyZXN1bHQiLCJwcm9maXREYXRhIiwiZGF0YSIsInNsaWRlclN1bSIsImdldEVsZW1lbnRCeUlkIiwic2xpZGVyU3VtQm94Iiwic2xpZGVyU3RhdHVzIiwic2xpZGVyU3RhdHVzQm94IiwiY2FsY3VsYXRvckl0ZW0iLCJjYWxjdWxhdG9ySXRlbU9wdCIsImNhbGN1bGF0b3JJdGVtRGlsZXIiLCJjYWxjdWxhdG9ySXRlbURpbGVyUGx1cyIsInJhbmdlU3VtIiwicmFuZ2VTdGF0dXMiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJzdGFydCIsInN0ZXAiLCJmb3JtYXQiLCJ3TnVtYiIsImRlY2ltYWxzIiwiYmVoYXZpb3VyIiwiY29ubmVjdCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWVzIiwiaGFuZGxlIiwiYXR0ciIsInRleHQiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7O0FBR0FBLEVBQUVDLE1BQUYsRUFBVUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM1QixRQUNJLDZDQUE2Q0MsSUFBN0MsQ0FBa0RDLFVBQVVDLFNBQTVELENBREosRUFFRTtBQUNFTCxVQUFFLE1BQUYsRUFBVU0sUUFBVixDQUFtQixLQUFuQjtBQUNILEtBSkQsTUFJTztBQUNITixVQUFFLE1BQUYsRUFBVU0sUUFBVixDQUFtQixLQUFuQjtBQUNIOztBQUVETixNQUFFLE1BQUYsRUFBVU8sV0FBVixDQUFzQixTQUF0QjtBQUNILENBVkQ7O0FBYUFQLEVBQUVRLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCOzs7QUFHQTtBQUNBVCxNQUFFLGdCQUFGLEVBQW9CRSxFQUFwQixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBQ3ZDLFlBQUlGLEVBQUUsSUFBRixFQUFRVSxRQUFSLENBQWlCLFNBQWpCLENBQUosRUFBaUM7QUFDN0JWLGNBQUUsSUFBRixFQUFRTyxXQUFSLENBQW9CLFNBQXBCO0FBQ0FQLGNBQUUsU0FBRixFQUFhVyxPQUFiO0FBQ0FYLGNBQUUsTUFBRixFQUFVWSxVQUFWLENBQXFCLE9BQXJC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OlsiLypcbiAgKiBiYXNlLmpzXG4qL1xuJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKFxuICAgICAgICAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgKSB7XG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaW9zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCd3ZWInKTtcbiAgICB9XG5cbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbn0pO1xuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8qXG4gICAgKiBoZWFkZXIuanNcbiAgICAqL1xuICAgIC8vSGVhZGVyIGhhbWJ1cmdlclxuICAgICQoJy5qcy1uYXYtdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICQoJy5qcy1uYXYnKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICQoJy5qcy1uYXYnKS5mYWRlSW4oKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBcbiAgICAvL01vYmlsZSBtZW51IHN1Ym5hdiB0b2dnbGVcbiAgICAkKCcuanMtbW9iaWxlLW5hdi1zdWItLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnLm1vYmlsZS1uYXYtLXN1YicpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICB9KTtcbiAgICBcbiAgICAkKCcuanMtbW9iaWxlLW5hdi1zdWItLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcubW9iaWxlLW5hdi0tc3ViJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vTW9iaWxlIFNlYXJjaFxuICAgIGlmICgkKCcuanMtc2VhcmNoLWlucHV0JykubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgc2VhcmNoSW5wdXQgPSAkKCcuanMtc2VhcmNoLWlucHV0Jyk7XG4gICAgXG4gICAgICAgIHNlYXJjaElucHV0Lm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhpbnQgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBoaW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHNlYXJjaElucHV0Lm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhpbnQgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBoaW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHNlYXJjaElucHV0Lm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50JylcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGxldCBuYXZMaXN0ID0gJCgnLmpzLW5hdi1saXN0Jyk7XG4gICAgbGV0IG92ZXJsYXkgPSAkKCcuanMtbmF2LW92ZXJsYXknKTtcbiAgICBcbiAgICBpZiAobmF2TGlzdC5sZW5ndGgpIHtcbiAgICAgICAgbmF2TGlzdFxuICAgICAgICAgICAgLmZpbmQoJy5uYXZfX2l0ZW0nKVxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXG4gICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XG4gICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5JyxcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgY29udGFpbmVyOiAnLmNzLXNlbGVjdF9fY29udGFpbmVyJ1xuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuc2VsZWN0Mi1kcm9wZG93biwgLnNlbGVjdDItY29udGFpbmVyJylcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCdjbG9zZScpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdmb2N1cycsICcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9EYXRlcGlja2VyIGh0dHA6Ly90MW0wbi5uYW1lL2Fpci1kYXRlcGlja2VyL2RvY3MvaW5kZXgtcnUuaHRtbFxuICAgIGlmICgnLmpzLWRhdGUnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGRhdGVUb2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICQoJy5qcy1kYXRlJykuZGF0ZXBpY2tlcih7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnZGQubW0ueXknLFxuICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxuICAgICAgICAgICAgbWluRGF0ZTogZGF0ZVRvZGF5XG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtaW5wdXQtaWNvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnLmpzLWRhdGUnKS5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDQwMCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vU3RvcCBkcmFnXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAkKCcuanMtZHJvcGRvd24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9KTtcblxuICAgICQoJy5qcy1kcm9wZG93bi0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZHJvcGRvd24nKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICAvL1NlY3Rpb24gQW5pbWFyaW9uc1xuICAgIG5ldyBXT1coKS5pbml0KCk7XG5cbiAgICBpZiAoJCgnLmpzLW0tYWNjb3JkZW9uJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcbiAgICAgICAgJCgnLmpzLW0tYWNjb3JkZW9uJylcbiAgICAgICAgICAgIC5maW5kKCcuY2FsY3VsYXRvcl9fZGVzYycpXG4gICAgICAgICAgICAuc2xpZGVVcCgpO1xuXG4gICAgICAgICQoJy5qcy1tLWFjY29yZGVvbi1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW0tYWNjb3JkZW9uJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmNhbGN1bGF0b3JfX2Rlc2MnKVxuICAgICAgICAgICAgICAgIC5zbGlkZVRvZ2dsZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL2p1cm5hbCBoZWFkZXIgZml4ZWRcbiAgICBpZiAoJCgnLmpzLWp1cm5hbC1uYXYnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBuYXYgPSAkKCcuanMtanVybmFsLW5hdicpO1xuICAgICAgICBsZXQgaGVhZGVySGVpZ2h0ID0gJCgnLmhlYWRlciAnKS5vdXRlckhlaWdodCgpO1xuICAgICAgICBsZXQgaGVhZGVyQ2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiaGVhZGVyLWNsb25lXCI+JylcbiAgICAgICAgICAgIC5jc3MoJ21pbi1oZWlnaHQnLCBuYXYub3V0ZXJIZWlnaHQoKSlcbiAgICAgICAgICAgIC5pbnNlcnRCZWZvcmUobmF2KVxuICAgICAgICAgICAgLmhpZGUoKTtcblxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDQ4MCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gaGVhZGVySGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdi5hZGRDbGFzcygnaXMtZml4ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xvbmUuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdi5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xvbmUuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdi5hZGRDbGFzcygnaXMtZml4ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xvbmUuc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdi5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xvbmUuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9OaWdodCBNb2RlXG4gICAgJCgnLmpzLW5pZ2h0LW1vZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQoJy5qdXJuYWwnKS5oYXNDbGFzcygndGhlbWUtZGFyaycpKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5mYXMnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmFsJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhcycpO1xuICAgICAgICAgICAgJCgnLmp1cm5hbCcpLnJlbW92ZUNsYXNzKCd0aGVtZS1kYXJrJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5mYWwnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmFsJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhcycpO1xuICAgICAgICAgICAgJCgnLmp1cm5hbCcpLmFkZENsYXNzKCd0aGVtZS1kYXJrJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qXG4gICAgKiBzbGlkZXIuanNcbiAgICAqL1xuICAgIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXG4gICAgaWYgKCQoJy5qcy1oZXJvLXNsaWRlcicpLmZpbmQoJy5tLXNsaWRlcl9fc2xpZGUnKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICQoJy5qcy1oZXJvLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiA0MDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgIGFwcGVuZERvdHM6ICcuaGVyb19fc2xpZGVyIC5tLXNsaWRlcl9fZG90cycsXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgY3VzdG9tUGFnaW5nOiBmdW5jdGlvbihzbGlkZXIsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSArIDEgKyAnLycgKyBzbGlkZXIuc2xpZGVDb3VudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHZhciBpbmZvU2xpZGVyU2V0dGluZ3MgPSB7XG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIHNwZWVkOiA3MDAsXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBcbiAgICBpZiAoJCgnLmpzLXNsaWRlcicpLmZpbmQoJy5tLXNsaWRlcl9fc2xpZGUnKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICQoJy5qcy1zbGlkZXInKS5zbGljayh7XG4gICAgICAgICAgICBpbmZvU2xpZGVyU2V0dGluZ3NcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGlmICgkKCcuanMtanVybmFsLXNsaWRlcicpLmZpbmQoJy5tLXNsaWRlcl9fc2xpZGUnKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICQoJy5qcy1qdXJuYWwtc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDcwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgYXBwZW5kRG90czogJy5qdXJuYWwtYXJ0aWNsZV9fc2xpZGVyIC5tLXNsaWRlcl9fZG90cycsXG4gICAgICAgICAgICBjdXN0b21QYWdpbmc6IGZ1bmN0aW9uKHNsaWRlciwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICsgMSArICcvJyArIHNsaWRlci5zbGlkZUNvdW50O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICogcmFuZ2Utc2xpZGVyLmpzXG4gICAgKi9cbiAgICAvL1ByaWNlIFNsaWRlclxuICAgIGlmICgkKCcuanMtY2FsY3VsYXRvcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHByb2ZpdCA9ICQoJy5qcy1jYWxjdWxhdG9yLXByb2ZpdCcpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gJCgnLmpzLWNhbGN1bGF0b3ItcmVzdWx0Jyk7XG4gICAgICAgIGxldCBwcm9maXREYXRhID0gcHJvZml0LmRhdGEoJ3Byb2ZpdCcpO1xuICAgIFxuICAgICAgICBsZXQgc2xpZGVyU3VtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0b3Itc3VtJyk7XG4gICAgICAgIGxldCBzbGlkZXJTdW1Cb3ggPSAkKCcjY2FsY3VsYXRvci1zdW0tcHJpY2UnKTtcbiAgICBcbiAgICAgICAgbGV0IHNsaWRlclN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjdWxhdG9yLXN0YXR1cycpO1xuICAgICAgICBsZXQgc2xpZGVyU3RhdHVzQm94ID0gJCgnI2NhbGN1bGF0b3Itc3RhdHVzLXZhbGwnKTtcbiAgICBcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JJdGVtID0gJCgnLmNhbGN1bGF0b3ItaXRlbScpO1xuICAgICAgICBsZXQgY2FsY3VsYXRvckl0ZW1PcHQgPSAkKCcuY2FsY3VsYXRvci1pdGVtLS1vcHQnKTtcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JJdGVtRGlsZXIgPSAkKCcuY2FsY3VsYXRvci1pdGVtLS1kaWxlcicpO1xuICAgICAgICBsZXQgY2FsY3VsYXRvckl0ZW1EaWxlclBsdXMgPSAkKCcuY2FsY3VsYXRvci1pdGVtLS1kaWxlcnBsdXMnKTtcbiAgICBcbiAgICAgICAgbGV0IHJhbmdlU3VtID0gW1xuICAgICAgICAgICAgJzUwMDAwJyxcbiAgICAgICAgICAgICcxMDAwMDAnLFxuICAgICAgICAgICAgJzMwMDAwMCcsXG4gICAgICAgICAgICAnNTAwMDAwJyxcbiAgICAgICAgICAgICc3MDAwMDAnLFxuICAgICAgICAgICAgJzkwMDAwMCcsXG4gICAgICAgICAgICAnMTAwMDAwMCdcbiAgICAgICAgXTtcbiAgICBcbiAgICAgICAgbGV0IHJhbmdlU3RhdHVzID0gWyfQntC/0YLQvtCy0LjQuicsICfQlNC40LvQtdGAJywgJ9CU0LjQu9C10YAgKyddO1xuICAgIFxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXJTdW0sIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAzMDAsXG4gICAgICAgICAgICBzdGFydDogMyxcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgXG4gICAgICAgICAgICBmb3JtYXQ6IHdOdW1iKHtcbiAgICAgICAgICAgICAgICBkZWNpbWFsczogMFxuICAgICAgICAgICAgfSksXG4gICAgXG4gICAgICAgICAgICBiZWhhdmlvdXI6ICd0YXAnLFxuICAgICAgICAgICAgY29ubmVjdDogW2ZhbHNlLCB0cnVlXSxcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIG1heDogNlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyU3RhdHVzLCB7XG4gICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogMzAwLFxuICAgICAgICAgICAgc3RhcnQ6IDEsXG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgZm9ybWF0OiB3TnVtYih7XG4gICAgICAgICAgICAgICAgZGVjaW1hbHM6IDBcbiAgICAgICAgICAgIH0pLFxuICAgIFxuICAgICAgICAgICAgYmVoYXZpb3VyOiAndGFwJyxcbiAgICAgICAgICAgIGNvbm5lY3Q6IFtmYWxzZSwgdHJ1ZV0sXG4gICAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICBtYXg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHNsaWRlclN1bS5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbih2YWx1ZXMsIGhhbmRsZSkge1xuICAgICAgICAgICAgdmFyIHByb2ZpdERhdGEgPSBwcm9maXQuYXR0cignZGF0YS1wcm9maXQnKTtcbiAgICBcbiAgICAgICAgICAgIHNsaWRlclN1bUJveC50ZXh0KHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSk7XG4gICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xuICAgIFxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA9PT0gJzUwMDAwJyB8fFxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA8ICc1MDAwMDAnXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5zZXQoMCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIDIwKSAvIDEwMCk7XG4gICAgICAgICAgICAgICAgcHJvZml0LnRleHQoJzIwJScpO1xuICAgICAgICAgICAgICAgIHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcsICcyMCcpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChjYWxjdWxhdG9ySXRlbU9wdC5oYXNDbGFzcygnaXMtaGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtaGlkZGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnd293IGZhZGVJblVwJyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtT3B0XG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xuICAgICAgICAgICAgICAgICAgICBuZXcgV09XKCkuaW5pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgcmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dID09PSAnNTAwMDAwJyB8fFxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA8PSAnOTAwMDAwJyB8fFxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA9PT0gJzkwMDAwMCdcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHNsaWRlclN0YXR1cy5ub1VpU2xpZGVyLnNldCgxKTtcbiAgICAgICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogMjUpIC8gMTAwKTtcbiAgICAgICAgICAgICAgICBwcm9maXQuYXR0cignZGF0YS1wcm9maXQnLCAnMjUnKTtcbiAgICAgICAgICAgICAgICBwcm9maXQudGV4dCgnMjUlJyk7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGNhbGN1bGF0b3JJdGVtRGlsZXIuaGFzQ2xhc3MoJ2lzLWhpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbURpbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xuICAgICAgICAgICAgICAgICAgICBuZXcgV09XKCkuaW5pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dID09PSAnMTAwMDAwJykge1xuICAgICAgICAgICAgICAgIHNsaWRlclN0YXR1cy5ub1VpU2xpZGVyLnNldCgyKTtcbiAgICAgICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogMzApIC8gMTAwKTtcbiAgICAgICAgICAgICAgICBwcm9maXQudGV4dCgnMzAlJyk7XG4gICAgICAgICAgICAgICAgcHJvZml0LmF0dHIoJ2RhdGEtcHJvZml0JywgJzMwJyk7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGNhbGN1bGF0b3JJdGVtRGlsZXJQbHVzLmhhc0NsYXNzKCdpcy1oaWRkZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd3b3cgZmFkZUluVXAnKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1EaWxlclBsdXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnd293IGZhZGVJblVwJyk7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBXT1coKS5pbml0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA9PT0gJzEwMDAwMDAnKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVyU3RhdHVzLm5vVWlTbGlkZXIuc2V0KDIpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiAzMCkgLyAxMDApO1xuICAgICAgICAgICAgICAgIHByb2ZpdC50ZXh0KCczMCUnKTtcbiAgICAgICAgICAgICAgICBwcm9maXQuYXR0cignZGF0YS1wcm9maXQnLCAnMzAnKTtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAoY2FsY3VsYXRvckl0ZW1EaWxlclBsdXMuaGFzQ2xhc3MoJ2lzLWhpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbURpbGVyUGx1c1xuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCd3b3cgZmFkZUluVXAnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdPVygpLmluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIHNsaWRlclN0YXR1c0JveC50ZXh0KHJhbmdlU3RhdHVzW3ZhbHVlc1toYW5kbGVdXSk7XG4gICAgXG4gICAgICAgICAgICAvLyBpZiAocmFuZ2VTdGF0dXNbdmFsdWVzW2hhbmRsZV1dID09PSAn0JTQuNC70LXRgCcpIHtcbiAgICAgICAgICAgIC8vICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xuICAgIFxuICAgICAgICAgICAgLy8gICAgIC8vIHNsaWRlclN1bS5ub1VpU2xpZGVyLnNldCg0KTtcbiAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAocmFuZ2VTdGF0dXNbdmFsdWVzW2hhbmRsZV1dID09PSAn0JTQuNC70LXRgCArJykge1xuICAgICAgICAgICAgLy8gICAgIC8vIHNsaWRlclN1bS5ub1VpU2xpZGVyLnNldCg3KTtcbiAgICAgICAgICAgIC8vICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xuICAgICAgICAgICAgLy8gICAgIC8vIHNsaWRlclN1bS5ub1VpU2xpZGVyLnNldCgwKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufSk7XG4iXX0=
