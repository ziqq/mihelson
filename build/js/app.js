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
        }).on('mouseleave', function () {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwib24iLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImRvY3VtZW50IiwicmVhZHkiLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwiY3NzIiwicGFyZW50IiwiZmluZCIsImNsb3Nlc3QiLCJsZW5ndGgiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJ2YWwiLCJuYXZMaXN0Iiwib3ZlcmxheSIsImlucHV0bWFzayIsIm1hc2siLCJjbGVhckluY29tcGxldGUiLCJzZWxlY3QyIiwiY29udGFpbmVyIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJjbGljayIsImV2ZW50IiwidGFyZ2V0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZSIsImRhdGVUb2RheSIsIkRhdGUiLCJkYXRlcGlja2VyIiwiZGF0ZUZvcm1hdCIsImF1dG9DbG9zZSIsIm1pbkRhdGUiLCJwcmV2ZW50RGVmYXVsdCIsImZvY3VzIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInNjcm9sbCIsImhlaWdodCIsIldPVyIsImluaXQiLCJ3aWR0aCIsInNsaWRlVXAiLCJzbGlkZVRvZ2dsZSIsIm5hdiIsImhlYWRlckhlaWdodCIsIm91dGVySGVpZ2h0IiwiaGVhZGVyQ2xvbmUiLCJpbnNlcnRCZWZvcmUiLCJoaWRlIiwic2hvdyIsInNsaWNrIiwiYXJyb3dzIiwiaW5maW5pdGUiLCJhdXRvcGxheSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiZG90cyIsImFwcGVuZERvdHMiLCJzbGlkZXIiLCJpIiwic2xpZGVDb3VudCIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsImluZm9TbGlkZXJTZXR0aW5ncyIsInJlc3BvbnNpdmUiLCJjdXN0b21QYWdpbmciLCJwcm9maXQiLCJyZXN1bHQiLCJidG4iLCJwcm9maXREYXRhIiwiZGF0YSIsInNsaWRlclN1bSIsImdldEVsZW1lbnRCeUlkIiwic2xpZGVyU3VtQm94Iiwic2xpZGVyU3RhdHVzIiwic2xpZGVyU3RhdHVzQm94IiwiY2FsY3VsYXRvckl0ZW0iLCJjYWxjdWxhdG9ySXRlbU9wdCIsImNhbGN1bGF0b3JJdGVtRGlsZXIiLCJjYWxjdWxhdG9ySXRlbURpbGVyUGx1cyIsInJhbmdlU3VtIiwicmFuZ2VTdGF0dXMiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJzdGFydCIsInN0ZXAiLCJmb3JtYXQiLCJ3TnVtYiIsImRlY2ltYWxzIiwiYmVoYXZpb3VyIiwiY29ubmVjdCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWVzIiwiaGFuZGxlIiwiYXR0ciIsInRleHQiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7O0FBR0FBLEVBQUVDLE1BQUYsRUFBVUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM1QixRQUNJLDZDQUE2Q0MsSUFBN0MsQ0FBa0RDLFVBQVVDLFNBQTVELENBREosRUFFRTtBQUNFTCxVQUFFLE1BQUYsRUFBVU0sUUFBVixDQUFtQixLQUFuQjtBQUNILEtBSkQsTUFJTztBQUNITixVQUFFLE1BQUYsRUFBVU0sUUFBVixDQUFtQixLQUFuQjtBQUNIOztBQUVETixNQUFFLE1BQUYsRUFBVU8sV0FBVixDQUFzQixTQUF0QjtBQUNILENBVkQ7O0FBYUFQLEVBQUVRLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCOzs7QUFHQTtBQUNBVCxNQUFFLGdCQUFGLEVBQW9CRSxFQUFwQixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBQ3ZDLFlBQUlGLEVBQUUsSUFBRixFQUFRVSxRQUFSLENBQWlCLFNBQWpCLENBQUosRUFBaUM7QUFDN0JWLGNBQUUsSUFBRixFQUFRTyxXQUFSLENBQW9CLFNBQXBCO0FBQ0FQLGNBQUUsU0FBRixFQUFhVyxPQUFiO0FBQ0FYLGNBQUUsTUFBRixFQUFVWSxVQUFWLENBQXFC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Qiw0QkFBZ0J1QixJQUFoQixDQUFxQmpCLFlBQVljLE9BQU9DLE1BQVAsQ0FBWixDQUFyQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxTQWREO0FBZUg7QUFFSixDQXpkRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAqIGJhc2UuanNcbiovXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGlmIChcclxuICAgICAgICAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXHJcbiAgICApIHtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2lvcycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3dlYicpO1xyXG4gICAgfVxyXG5cclxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xyXG59KTtcclxuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8qXG4gICAgKiBoZWFkZXIuanNcbiAgICAqL1xuICAgIC8vSGVhZGVyIGhhbWJ1cmdlclxuICAgICQoJy5qcy1uYXYtdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICQoJy5qcy1uYXYnKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICQoJy5qcy1uYXYnKS5mYWRlSW4oKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBcbiAgICAvL01vYmlsZSBtZW51IHN1Ym5hdiB0b2dnbGVcbiAgICAkKCcuanMtbW9iaWxlLW5hdi1zdWItLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAuZmluZCgnLm1vYmlsZS1uYXYtLXN1YicpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICB9KTtcbiAgICBcbiAgICAkKCcuanMtbW9iaWxlLW5hdi1zdWItLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jbG9zZXN0KCcubW9iaWxlLW5hdi0tc3ViJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vTW9iaWxlIFNlYXJjaFxuICAgIGlmICgkKCcuanMtc2VhcmNoLWlucHV0JykubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgc2VhcmNoSW5wdXQgPSAkKCcuanMtc2VhcmNoLWlucHV0Jyk7XG4gICAgXG4gICAgICAgIHNlYXJjaElucHV0Lm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhpbnQgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBoaW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHNlYXJjaElucHV0Lm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhpbnQgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBoaW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHNlYXJjaElucHV0Lm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50JylcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGxldCBuYXZMaXN0ID0gJCgnLmpzLW5hdi1saXN0Jyk7XG4gICAgbGV0IG92ZXJsYXkgPSAkKCcuanMtbmF2LW92ZXJsYXknKTtcbiAgICBcbiAgICBpZiAobmF2TGlzdC5sZW5ndGgpIHtcbiAgICAgICAgbmF2TGlzdFxuICAgICAgICAgICAgLmZpbmQoJy5uYXZfX2l0ZW0nKVxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBvdmVybGF5LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xuICAgIGlmICgkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XG4gICAgICAgICAgICBjb250YWluZXI6ICcuY3Mtc2VsZWN0X19jb250YWluZXInXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5zZWxlY3QyLWRyb3Bkb3duLCAuc2VsZWN0Mi1jb250YWluZXInKVxuICAgICAgICAgICAgICAgICAgICAubGVuZ3RoXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoJ2Nsb3NlJyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2ZvY3VzJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0RhdGVwaWNrZXIgaHR0cDovL3QxbTBuLm5hbWUvYWlyLWRhdGVwaWNrZXIvZG9jcy9pbmRleC1ydS5odG1sXG4gICAgaWYgKCcuanMtZGF0ZScubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgZGF0ZVRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgJCgnLmpzLWRhdGUnKS5kYXRlcGlja2VyKHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdkZC5tbS55eScsXG4gICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgICBtaW5EYXRlOiBkYXRlVG9kYXlcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1pbnB1dC1pY29uJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcuanMtZGF0ZScpLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgNDAwKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9TdG9wIGRyYWdcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgICQoJy5qcy1kcm9wZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgJCgnLmpzLWRyb3Bkb3duLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIC8vU2VjdGlvbiBBbmltYXJpb25zXG4gICAgbmV3IFdPVygpLmluaXQoKTtcblxuICAgIGlmICgkKCcuanMtbS1hY2NvcmRlb24nKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAkKCcuanMtbS1hY2NvcmRlb24nKVxuICAgICAgICAgICAgLmZpbmQoJy5jYWxjdWxhdG9yX19kZXNjJylcbiAgICAgICAgICAgIC5zbGlkZVVwKCk7XG5cbiAgICAgICAgJCgnLmpzLW0tYWNjb3JkZW9uLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbS1hY2NvcmRlb24nKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuY2FsY3VsYXRvcl9fZGVzYycpXG4gICAgICAgICAgICAgICAgLnNsaWRlVG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vanVybmFsIGhlYWRlciBmaXhlZFxuICAgIGlmICgkKCcuanMtanVybmFsLW5hdicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IG5hdiA9ICQoJy5qcy1qdXJuYWwtbmF2Jyk7XG4gICAgICAgIGxldCBoZWFkZXJIZWlnaHQgPSAkKCcuaGVhZGVyICcpLm91dGVySGVpZ2h0KCk7XG4gICAgICAgIGxldCBoZWFkZXJDbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJoZWFkZXItY2xvbmVcIj4nKVxuICAgICAgICAgICAgLmNzcygnbWluLWhlaWdodCcsIG5hdi5vdXRlckhlaWdodCgpKVxuICAgICAgICAgICAgLmluc2VydEJlZm9yZShuYXYpXG4gICAgICAgICAgICAuaGlkZSgpO1xuXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNDgwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiBoZWFkZXJIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LmFkZENsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbG9uZS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LmFkZENsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbG9uZS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL05pZ2h0IE1vZGVcbiAgICAkKCcuanMtbmlnaHQtbW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCgnLmp1cm5hbCcpLmhhc0NsYXNzKCd0aGVtZS1kYXJrJykpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmZhcycpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYWwnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmFzJyk7XG4gICAgICAgICAgICAkKCcuanVybmFsJykucmVtb3ZlQ2xhc3MoJ3RoZW1lLWRhcmsnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmZhbCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYWwnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmFzJyk7XG4gICAgICAgICAgICAkKCcuanVybmFsJykuYWRkQ2xhc3MoJ3RoZW1lLWRhcmsnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLypcbiAgICAqIHNsaWRlci5qc1xuICAgICovXG4gICAgLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cclxuICAgIGlmICgkKCcuanMtaGVyby1zbGlkZXInKS5maW5kKCcubS1zbGlkZXJfX3NsaWRlJykubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICQoJy5qcy1oZXJvLXNsaWRlcicpLnNsaWNrKHtcclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIHNwZWVkOiA0MDAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgIGFwcGVuZERvdHM6ICcuaGVyb19fc2xpZGVyIC5tLXNsaWRlcl9fZG90cycsXHJcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgIGN1c3RvbVBhZ2luZzogZnVuY3Rpb24oc2xpZGVyLCBpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaSArIDEgKyAnLycgKyBzbGlkZXIuc2xpZGVDb3VudDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgaW5mb1NsaWRlclNldHRpbmdzID0ge1xyXG4gICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgc3BlZWQ6IDcwMCxcclxuICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgaWYgKCQoJy5qcy1zbGlkZXInKS5maW5kKCcubS1zbGlkZXJfX3NsaWRlJykubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICQoJy5qcy1zbGlkZXInKS5zbGljayh7XHJcbiAgICAgICAgICAgIGluZm9TbGlkZXJTZXR0aW5nc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAoJCgnLmpzLWp1cm5hbC1zbGlkZXInKS5maW5kKCcubS1zbGlkZXJfX3NsaWRlJykubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICQoJy5qcy1qdXJuYWwtc2xpZGVyJykuc2xpY2soe1xyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgc3BlZWQ6IDcwMCxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgYXBwZW5kRG90czogJy5qdXJuYWwtYXJ0aWNsZV9fc2xpZGVyIC5tLXNsaWRlcl9fZG90cycsXHJcbiAgICAgICAgICAgIGN1c3RvbVBhZ2luZzogZnVuY3Rpb24oc2xpZGVyLCBpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaSArIDEgKyAnLycgKyBzbGlkZXIuc2xpZGVDb3VudDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXG5cbiAgICAvKlxuICAgICogcmFuZ2Utc2xpZGVyLmpzXG4gICAgKi9cbiAgICAvL1ByaWNlIFNsaWRlclxuICAgIGlmICgkKCcuanMtY2FsY3VsYXRvcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHByb2ZpdCA9ICQoJy5qcy1jYWxjdWxhdG9yLXByb2ZpdCcpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gJCgnLmpzLWNhbGN1bGF0b3ItcmVzdWx0Jyk7XG4gICAgICAgIGxldCBidG4gPSAkKCcuanMtY2FsY3VsYXRvci1idG4nKTtcbiAgICAgICAgbGV0IHByb2ZpdERhdGEgPSBwcm9maXQuZGF0YSgncHJvZml0Jyk7XG4gICAgXG4gICAgICAgIGxldCBzbGlkZXJTdW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsY3VsYXRvci1zdW0nKTtcbiAgICAgICAgbGV0IHNsaWRlclN1bUJveCA9ICQoJyNjYWxjdWxhdG9yLXN1bS1wcmljZScpO1xuICAgIFxuICAgICAgICBsZXQgc2xpZGVyU3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0b3Itc3RhdHVzJyk7XG4gICAgICAgIGxldCBzbGlkZXJTdGF0dXNCb3ggPSAkKCcjY2FsY3VsYXRvci1zdGF0dXMtdmFsbCcpO1xuICAgIFxuICAgICAgICBsZXQgY2FsY3VsYXRvckl0ZW0gPSAkKCcuY2FsY3VsYXRvci1pdGVtJyk7XG4gICAgICAgIGxldCBjYWxjdWxhdG9ySXRlbU9wdCA9ICQoJy5jYWxjdWxhdG9yLWl0ZW0tLW9wdCcpO1xuICAgICAgICBsZXQgY2FsY3VsYXRvckl0ZW1EaWxlciA9ICQoJy5jYWxjdWxhdG9yLWl0ZW0tLWRpbGVyJyk7XG4gICAgICAgIGxldCBjYWxjdWxhdG9ySXRlbURpbGVyUGx1cyA9ICQoJy5jYWxjdWxhdG9yLWl0ZW0tLWRpbGVycGx1cycpO1xuICAgIFxuICAgICAgICBsZXQgcmFuZ2VTdW0gPSBbXG4gICAgICAgICAgICAnNTAwMDAnLFxuICAgICAgICAgICAgJzEwMDAwMCcsXG4gICAgICAgICAgICAnMzAwMDAwJyxcbiAgICAgICAgICAgICc1MDAwMDAnLFxuICAgICAgICAgICAgJzcwMDAwMCcsXG4gICAgICAgICAgICAnOTAwMDAwJyxcbiAgICAgICAgICAgICcxMDAwMDAwJ1xuICAgICAgICBdO1xuICAgIFxuICAgICAgICBsZXQgcmFuZ2VTdGF0dXMgPSBbJ9Ce0L/RgtC+0LLQuNC6JywgJ9CU0LjQu9C10YAnLCAn0JTQuNC70LXRgCArJ107XG4gICAgXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlclN1bSwge1xuICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IDMwMCxcbiAgICAgICAgICAgIHN0YXJ0OiAzLFxuICAgICAgICAgICAgc3RlcDogMSxcbiAgICBcbiAgICAgICAgICAgIGZvcm1hdDogd051bWIoe1xuICAgICAgICAgICAgICAgIGRlY2ltYWxzOiAwXG4gICAgICAgICAgICB9KSxcbiAgICBcbiAgICAgICAgICAgIGJlaGF2aW91cjogJ3RhcCcsXG4gICAgICAgICAgICBjb25uZWN0OiBbZmFsc2UsIHRydWVdLFxuICAgICAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgbWF4OiA2XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXJTdGF0dXMsIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAzMDAsXG4gICAgICAgICAgICBzdGFydDogMSxcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICBmb3JtYXQ6IHdOdW1iKHtcbiAgICAgICAgICAgICAgICBkZWNpbWFsczogMFxuICAgICAgICAgICAgfSksXG4gICAgXG4gICAgICAgICAgICBiZWhhdmlvdXI6ICd0YXAnLFxuICAgICAgICAgICAgY29ubmVjdDogW2ZhbHNlLCB0cnVlXSxcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIG1heDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2xpZGVyU3VtLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKSB7XG4gICAgICAgICAgICB2YXIgcHJvZml0RGF0YSA9IHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcpO1xuICAgIFxuICAgICAgICAgICAgc2xpZGVyU3VtQm94LnRleHQocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dKTtcbiAgICAgICAgICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiBwcm9maXREYXRhKSAvIDEwMCk7XG4gICAgXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgcmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dID09PSAnNTAwMDAnIHx8XG4gICAgICAgICAgICAgICAgcmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dIDwgJzUwMDAwMCdcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHNsaWRlclN0YXR1cy5ub1VpU2xpZGVyLnNldCgwKTtcbiAgICAgICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogMjApIC8gMTAwKTtcbiAgICAgICAgICAgICAgICBwcm9maXQudGV4dCgnMjAlJyk7XG4gICAgICAgICAgICAgICAgcHJvZml0LmF0dHIoJ2RhdGEtcHJvZml0JywgJzIwJyk7XG4gICAgICAgICAgICAgICAgYnRuLnRleHQoJ9Ch0YLQsNGC0Ywg0L7Qv9GC0L7QstC40LrQvtC8Jyk7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGNhbGN1bGF0b3JJdGVtT3B0Lmhhc0NsYXNzKCdpcy1oaWRkZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd3b3cgZmFkZUluVXAnKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1PcHRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnd293IGZhZGVJblVwJyk7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBXT1coKS5pbml0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICByYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gPT09ICc1MDAwMDAnIHx8XG4gICAgICAgICAgICAgICAgcmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dIDw9ICc5MDAwMDAnIHx8XG4gICAgICAgICAgICAgICAgcmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dID09PSAnOTAwMDAwJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVyU3RhdHVzLm5vVWlTbGlkZXIuc2V0KDEpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiAyNSkgLyAxMDApO1xuICAgICAgICAgICAgICAgIHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcsICcyNScpO1xuICAgICAgICAgICAgICAgIHByb2ZpdC50ZXh0KCcyNSUnKTtcbiAgICAgICAgICAgICAgICBidG4udGV4dCgn0KHRgtCw0YLRjCDQtNC40LvQtdGA0L7QvCcpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChjYWxjdWxhdG9ySXRlbURpbGVyLmhhc0NsYXNzKCdpcy1oaWRkZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd3b3cgZmFkZUluVXAnKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1EaWxlclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCd3b3cgZmFkZUluVXAnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdPVygpLmluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA9PT0gJzEwMDAwMCcpIHtcbiAgICAgICAgICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5zZXQoMik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIDMwKSAvIDEwMCk7XG4gICAgICAgICAgICAgICAgcHJvZml0LnRleHQoJzMwJScpO1xuICAgICAgICAgICAgICAgIHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcsICczMCcpO1xuICAgICAgICAgICAgICAgIGJ0bi50ZXh0KCfQodGC0LDRgtGMINC00LjQu9C10YDQvtC8ICsnKTtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAoY2FsY3VsYXRvckl0ZW1EaWxlclBsdXMuaGFzQ2xhc3MoJ2lzLWhpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbURpbGVyUGx1c1xuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCd3b3cgZmFkZUluVXAnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdPVygpLmluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dID09PSAnMTAwMDAwMCcpIHtcbiAgICAgICAgICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5zZXQoMik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIDMwKSAvIDEwMCk7XG4gICAgICAgICAgICAgICAgcHJvZml0LnRleHQoJzMwJScpO1xuICAgICAgICAgICAgICAgIHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcsICczMCcpO1xuICAgICAgICAgICAgICAgIGJ0bi50ZXh0KCfQodGC0LDRgtGMINC00LjQu9C10YDQvtC8ICsnKTtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAoY2FsY3VsYXRvckl0ZW1EaWxlclBsdXMuaGFzQ2xhc3MoJ2lzLWhpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbURpbGVyUGx1c1xuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCd3b3cgZmFkZUluVXAnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdPVygpLmluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIHNsaWRlclN0YXR1c0JveC50ZXh0KHJhbmdlU3RhdHVzW3ZhbHVlc1toYW5kbGVdXSk7XG4gICAgXG4gICAgICAgICAgICAvLyBpZiAocmFuZ2VTdGF0dXNbdmFsdWVzW2hhbmRsZV1dID09PSAn0JTQuNC70LXRgCcpIHtcbiAgICAgICAgICAgIC8vICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xuICAgIFxuICAgICAgICAgICAgLy8gICAgIC8vIHNsaWRlclN1bS5ub1VpU2xpZGVyLnNldCg0KTtcbiAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAocmFuZ2VTdGF0dXNbdmFsdWVzW2hhbmRsZV1dID09PSAn0JTQuNC70LXRgCArJykge1xuICAgICAgICAgICAgLy8gICAgIC8vIHNsaWRlclN1bS5ub1VpU2xpZGVyLnNldCg3KTtcbiAgICAgICAgICAgIC8vICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xuICAgICAgICAgICAgLy8gICAgIC8vIHNsaWRlclN1bS5ub1VpU2xpZGVyLnNldCgwKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufSk7XG4iXX0=
