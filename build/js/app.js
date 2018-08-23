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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwib24iLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImRvY3VtZW50IiwicmVhZHkiLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwiY3NzIiwicGFyZW50IiwiZmluZCIsImNsb3Nlc3QiLCJsZW5ndGgiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJ2YWwiLCJuYXZMaXN0Iiwib3ZlcmxheSIsImlucHV0bWFzayIsIm1hc2siLCJjbGVhckluY29tcGxldGUiLCJzZWxlY3QyIiwiY29udGFpbmVyIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJjbGljayIsImV2ZW50IiwidGFyZ2V0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZSIsImRhdGVUb2RheSIsIkRhdGUiLCJkYXRlcGlja2VyIiwiZGF0ZUZvcm1hdCIsImF1dG9DbG9zZSIsIm1pbkRhdGUiLCJwcmV2ZW50RGVmYXVsdCIsImZvY3VzIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInNjcm9sbCIsImhlaWdodCIsIldPVyIsImluaXQiLCJ3aWR0aCIsInNsaWRlVXAiLCJzbGlkZVRvZ2dsZSIsIm5hdiIsImhlYWRlckhlaWdodCIsIm91dGVySGVpZ2h0IiwiaGVhZGVyQ2xvbmUiLCJpbnNlcnRCZWZvcmUiLCJoaWRlIiwic2hvdyIsImRyb3Bkb3duIiwiY2hpbGRyZW4iLCJkcm9wZG93bkhlaWdodCIsImRpc3BsYXkiLCJ0b3AiLCJzbGljayIsImFycm93cyIsImluZmluaXRlIiwiYXV0b3BsYXkiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImRvdHMiLCJhcHBlbmREb3RzIiwic2xpZGVyIiwiaSIsInNsaWRlQ291bnQiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJpbmZvU2xpZGVyU2V0dGluZ3MiLCJyZXNwb25zaXZlIiwiY3VzdG9tUGFnaW5nIiwicHJvZml0IiwicmVzdWx0IiwiYnRuIiwicHJvZml0RGF0YSIsImRhdGEiLCJzbGlkZXJTdW0iLCJnZXRFbGVtZW50QnlJZCIsInNsaWRlclN1bUJveCIsInNsaWRlclN0YXR1cyIsInNsaWRlclN0YXR1c0JveCIsImNhbGN1bGF0b3JJdGVtIiwiY2FsY3VsYXRvckl0ZW1PcHQiLCJjYWxjdWxhdG9ySXRlbURpbGVyIiwiY2FsY3VsYXRvckl0ZW1EaWxlclBsdXMiLCJyYW5nZVN1bSIsInJhbmdlU3RhdHVzIiwibm9VaVNsaWRlciIsImNyZWF0ZSIsImFuaW1hdGlvbkR1cmF0aW9uIiwic3RhcnQiLCJzdGVwIiwiZm9ybWF0Iiwid051bWIiLCJkZWNpbWFscyIsImJlaGF2aW91ciIsImNvbm5lY3QiLCJyYW5nZSIsIm1pbiIsIm1heCIsInZhbHVlcyIsImhhbmRsZSIsImF0dHIiLCJ0ZXh0Iiwic2V0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7OztBQUdBQSxFQUFFQyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVc7QUFDNUIsUUFDSSw2Q0FBNkNDLElBQTdDLENBQWtEQyxVQUFVQyxTQUE1RCxDQURKLEVBRUU7QUFDRUwsVUFBRSxNQUFGLEVBQVVNLFFBQVYsQ0FBbUIsS0FBbkI7QUFDSCxLQUpELE1BSU87QUFDSE4sVUFBRSxNQUFGLEVBQVVNLFFBQVYsQ0FBbUIsS0FBbkI7QUFDSDs7QUFFRE4sTUFBRSxNQUFGLEVBQVVPLFdBQVYsQ0FBc0IsU0FBdEI7QUFDSCxDQVZEOztBQWFBUCxFQUFFUSxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVztBQUN6Qjs7O0FBR0E7QUFDQVQsTUFBRSxnQkFBRixFQUFvQkUsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBVztBQUN2QyxZQUFJRixFQUFFLElBQUYsRUFBUVUsUUFBUixDQUFpQixTQUFqQixDQUFKLEVBQWlDO0FBQzdCVixjQUFFLElBQUYsRUFBUU8sV0FBUixDQUFvQixTQUFwQjtBQUNB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QU8rQixJQUFQLENBQWFsQixTQUFTZSxPQUFPQyxNQUFQLENBQVQsSUFBMkIsRUFBNUIsR0FBa0MsR0FBOUM7QUFDQTlCLHVCQUFPZ0MsSUFBUCxDQUFZLEtBQVo7QUFDQWhDLHVCQUFPK0IsSUFBUCxDQUFZLGFBQVosRUFBMkIsSUFBM0I7QUFDQTdCLG9CQUFJOEIsSUFBSixDQUFTLGlCQUFUOztBQUVBLG9CQUFJbkIsd0JBQXdCckYsUUFBeEIsQ0FBaUMsV0FBakMsQ0FBSixFQUFtRDtBQUMvQ2tGLG1DQUNLdEYsUUFETCxDQUNjLFdBRGQsRUFFS0MsV0FGTCxDQUVpQixjQUZqQjtBQUdBd0YsNENBQ0t4RixXQURMLENBQ2lCLFdBRGpCLEVBRUtELFFBRkwsQ0FFYyxjQUZkO0FBR0Esd0JBQUl5QyxHQUFKLEdBQVVDLElBQVY7QUFDSDtBQUNKO0FBQ0osU0EvRUQ7O0FBaUZBMEMscUJBQWFRLFVBQWIsQ0FBd0JoRyxFQUF4QixDQUEyQixRQUEzQixFQUFxQyxVQUFTNkcsTUFBVCxFQUFpQkMsTUFBakIsRUFBeUI7QUFDMURyQiw0QkFBZ0J1QixJQUFoQixDQUFxQmpCLFlBQVljLE9BQU9DLE1BQVAsQ0FBWixDQUFyQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxTQWREO0FBZUg7QUFFSixDQXhlRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAqIGJhc2UuanNcbiovXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoXG4gICAgICAgIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpb3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3dlYicpO1xuICAgIH1cblxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xufSk7XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLypcbiAgICAqIGhlYWRlci5qc1xuICAgICovXG4gICAgLy9IZWFkZXIgaGFtYnVyZ2VyXG4gICAgJCgnLmpzLW5hdi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIC8vTW9iaWxlIG1lbnUgc3VibmF2IHRvZ2dsZVxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCcubW9iaWxlLW5hdi0tc3ViJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5tb2JpbGUtbmF2LS1zdWInKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9Nb2JpbGUgU2VhcmNoXG4gICAgaWYgKCQoJy5qcy1zZWFyY2gtaW5wdXQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBzZWFyY2hJbnB1dCA9ICQoJy5qcy1zZWFyY2gtaW5wdXQnKTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgbGV0IG5hdkxpc3QgPSAkKCcuanMtbmF2LWxpc3QnKTtcbiAgICBsZXQgb3ZlcmxheSA9ICQoJy5qcy1uYXYtb3ZlcmxheScpO1xuICAgIFxuICAgIGlmIChuYXZMaXN0Lmxlbmd0aCkge1xuICAgICAgICBuYXZMaXN0XG4gICAgICAgICAgICAuZmluZCgnLm5hdl9faXRlbScpXG4gICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBvdmVybGF5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmICgkKCcuaGVhZGVyJykuaGFzQ2xhc3MoJ2hlYWRlci0tdHJhbnNwYXJlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuaGVhZGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyNmZmYnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmICgkKCcuaGVhZGVyJykuaGFzQ2xhc3MoJ2hlYWRlci0tdHJhbnNwYXJlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuaGVhZGVyJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3RyYW5zcGFyZW50Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXG4gICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XG4gICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5JyxcbiAgICAgICAgICAgIGNsZWFySW5jb21wbGV0ZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cbiAgICBpZiAoJCgnLmpzLXNlbGVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgY29udGFpbmVyOiAnLmNzLXNlbGVjdF9fY29udGFpbmVyJ1xuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuc2VsZWN0Mi1kcm9wZG93biwgLnNlbGVjdDItY29udGFpbmVyJylcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCdjbG9zZScpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdmb2N1cycsICcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9EYXRlcGlja2VyIGh0dHA6Ly90MW0wbi5uYW1lL2Fpci1kYXRlcGlja2VyL2RvY3MvaW5kZXgtcnUuaHRtbFxuICAgIGlmICgnLmpzLWRhdGUnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGRhdGVUb2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICQoJy5qcy1kYXRlJykuZGF0ZXBpY2tlcih7XG4gICAgICAgICAgICBkYXRlRm9ybWF0OiAnZGQubW0ueXknLFxuICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxuICAgICAgICAgICAgbWluRGF0ZTogZGF0ZVRvZGF5XG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtaW5wdXQtaWNvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnLmpzLWRhdGUnKS5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byB0b3BcbiAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sIDQwMCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+ICQodGhpcykuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vU3RvcCBkcmFnXG4gICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgLy9TZWN0aW9uIEFuaW1hcmlvbnNcbiAgICBuZXcgV09XKCkuaW5pdCgpO1xuXG4gICAgaWYgKCQoJy5qcy1tLWFjY29yZGVvbicpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgICQoJy5qcy1tLWFjY29yZGVvbicpXG4gICAgICAgICAgICAuZmluZCgnLmNhbGN1bGF0b3JfX2Rlc2MnKVxuICAgICAgICAgICAgLnNsaWRlVXAoKTtcblxuICAgICAgICAkKCcuanMtbS1hY2NvcmRlb24tYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tLWFjY29yZGVvbicpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5jYWxjdWxhdG9yX19kZXNjJylcbiAgICAgICAgICAgICAgICAuc2xpZGVUb2dnbGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9qdXJuYWwgaGVhZGVyIGZpeGVkXG4gICAgaWYgKCQoJy5qcy1qdXJuYWwtbmF2JykubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgbmF2ID0gJCgnLmpzLWp1cm5hbC1uYXYnKTtcbiAgICAgICAgbGV0IGhlYWRlckhlaWdodCA9ICQoJy5oZWFkZXIgJykub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgbGV0IGhlYWRlckNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1jbG9uZVwiPicpXG4gICAgICAgICAgICAuY3NzKCdtaW4taGVpZ2h0JywgbmF2Lm91dGVySGVpZ2h0KCkpXG4gICAgICAgICAgICAuaW5zZXJ0QmVmb3JlKG5hdilcbiAgICAgICAgICAgIC5oaWRlKCk7XG5cbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA0ODApIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IGhlYWRlckhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBuYXYuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckNsb25lLnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuYXYucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckNsb25lLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBuYXYuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckNsb25lLnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuYXYucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckNsb25lLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vTmlnaHQgTW9kZVxuICAgICQoJy5qcy1uaWdodC1tb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKCcuanVybmFsJykuaGFzQ2xhc3MoJ3RoZW1lLWRhcmsnKSkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuZmFzJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhbCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYXMnKTtcbiAgICAgICAgICAgICQoJy5qdXJuYWwnKS5yZW1vdmVDbGFzcygndGhlbWUtZGFyaycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuZmFsJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhbCcpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYXMnKTtcbiAgICAgICAgICAgICQoJy5qdXJuYWwnKS5hZGRDbGFzcygndGhlbWUtZGFyaycpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL0Ryb3Bkb3duXG4gICAgaWYgKCQoJy5qcy1kcm9wZG93bicpLmxlbmd0aCkge1xuICAgICAgICAkKCcuanMtZHJvcGRvd24nKVxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRyb3Bkb3duID0gJCh0aGlzKS5jaGlsZHJlbignLmRyb3Bkb3duX19pbm5lcicpO1xuICAgICAgICAgICAgICAgIGxldCBkcm9wZG93bkhlaWdodCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuZHJvcGRvd25fX2lubmVyJylcbiAgICAgICAgICAgICAgICAgICAgLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgZHJvcGRvd24uY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAtZHJvcGRvd25IZWlnaHQgLSA3ICsgJ3B4J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBkcm9wZG93biA9ICQodGhpcykuY2hpbGRyZW4oJy5kcm9wZG93bl9faW5uZXInKTtcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIHNsaWRlci5qc1xuICAgICovXG4gICAgLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cbiAgICBpZiAoJCgnLmpzLWhlcm8tc2xpZGVyJykuZmluZCgnLm0tc2xpZGVyX19zbGlkZScpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgJCgnLmpzLWhlcm8tc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDQwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgYXBwZW5kRG90czogJy5oZXJvX19zbGlkZXIgLm0tc2xpZGVyX19kb3RzJyxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBjdXN0b21QYWdpbmc6IGZ1bmN0aW9uKHNsaWRlciwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICsgMSArICcvJyArIHNsaWRlci5zbGlkZUNvdW50O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgdmFyIGluZm9TbGlkZXJTZXR0aW5ncyA9IHtcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgc3BlZWQ6IDcwMCxcbiAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIFxuICAgIGlmICgkKCcuanMtc2xpZGVyJykuZmluZCgnLm0tc2xpZGVyX19zbGlkZScpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgJCgnLmpzLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgIGluZm9TbGlkZXJTZXR0aW5nc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCQoJy5qcy1qdXJuYWwtc2xpZGVyJykuZmluZCgnLm0tc2xpZGVyX19zbGlkZScpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgJCgnLmpzLWp1cm5hbC1zbGlkZXInKS5zbGljayh7XG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBzcGVlZDogNzAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBhcHBlbmREb3RzOiAnLmp1cm5hbC1hcnRpY2xlX19zbGlkZXIgLm0tc2xpZGVyX19kb3RzJyxcbiAgICAgICAgICAgIGN1c3RvbVBhZ2luZzogZnVuY3Rpb24oc2xpZGVyLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKyAxICsgJy8nICsgc2xpZGVyLnNsaWRlQ291bnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qXG4gICAgKiByYW5nZS1zbGlkZXIuanNcbiAgICAqL1xuICAgIC8vUHJpY2UgU2xpZGVyXHJcbiAgICBpZiAoJCgnLmpzLWNhbGN1bGF0b3InKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbGV0IHByb2ZpdCA9ICQoJy5qcy1jYWxjdWxhdG9yLXByb2ZpdCcpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAkKCcuanMtY2FsY3VsYXRvci1yZXN1bHQnKTtcclxuICAgICAgICBsZXQgYnRuID0gJCgnLmpzLWNhbGN1bGF0b3ItYnRuJyk7XHJcbiAgICAgICAgbGV0IHByb2ZpdERhdGEgPSBwcm9maXQuZGF0YSgncHJvZml0Jyk7XHJcbiAgICBcclxuICAgICAgICBsZXQgc2xpZGVyU3VtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0b3Itc3VtJyk7XHJcbiAgICAgICAgbGV0IHNsaWRlclN1bUJveCA9ICQoJyNjYWxjdWxhdG9yLXN1bS1wcmljZScpO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IHNsaWRlclN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjdWxhdG9yLXN0YXR1cycpO1xyXG4gICAgICAgIGxldCBzbGlkZXJTdGF0dXNCb3ggPSAkKCcjY2FsY3VsYXRvci1zdGF0dXMtdmFsbCcpO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JJdGVtID0gJCgnLmNhbGN1bGF0b3ItaXRlbScpO1xyXG4gICAgICAgIGxldCBjYWxjdWxhdG9ySXRlbU9wdCA9ICQoJy5jYWxjdWxhdG9yLWl0ZW0tLW9wdCcpO1xyXG4gICAgICAgIGxldCBjYWxjdWxhdG9ySXRlbURpbGVyID0gJCgnLmNhbGN1bGF0b3ItaXRlbS0tZGlsZXInKTtcclxuICAgICAgICBsZXQgY2FsY3VsYXRvckl0ZW1EaWxlclBsdXMgPSAkKCcuY2FsY3VsYXRvci1pdGVtLS1kaWxlcnBsdXMnKTtcclxuICAgIFxyXG4gICAgICAgIGxldCByYW5nZVN1bSA9IFtcclxuICAgICAgICAgICAgJzUwMDAwJyxcclxuICAgICAgICAgICAgJzEwMDAwMCcsXHJcbiAgICAgICAgICAgICczMDAwMDAnLFxyXG4gICAgICAgICAgICAnNTAwMDAwJyxcclxuICAgICAgICAgICAgJzcwMDAwMCcsXHJcbiAgICAgICAgICAgICc5MDAwMDAnLFxyXG4gICAgICAgICAgICAnMTAwMDAwMCdcclxuICAgICAgICBdO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IHJhbmdlU3RhdHVzID0gWyfQntC/0YLQvtCy0LjQuicsICfQlNC40LvQtdGAJywgJ9CU0LjQu9C10YAgKyddO1xyXG4gICAgXHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyU3VtLCB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAzMDAsXHJcbiAgICAgICAgICAgIHN0YXJ0OiAzLFxyXG4gICAgICAgICAgICBzdGVwOiAxLFxyXG4gICAgXHJcbiAgICAgICAgICAgIGZvcm1hdDogd051bWIoe1xyXG4gICAgICAgICAgICAgICAgZGVjaW1hbHM6IDBcclxuICAgICAgICAgICAgfSksXHJcbiAgICBcclxuICAgICAgICAgICAgYmVoYXZpb3VyOiAndGFwJyxcclxuICAgICAgICAgICAgY29ubmVjdDogW2ZhbHNlLCB0cnVlXSxcclxuICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgICAgIG1heDogNlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXJTdGF0dXMsIHtcclxuICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IDMwMCxcclxuICAgICAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDEsXHJcbiAgICAgICAgICAgIGZvcm1hdDogd051bWIoe1xyXG4gICAgICAgICAgICAgICAgZGVjaW1hbHM6IDBcclxuICAgICAgICAgICAgfSksXHJcbiAgICBcclxuICAgICAgICAgICAgYmVoYXZpb3VyOiAndGFwJyxcclxuICAgICAgICAgICAgY29ubmVjdDogW2ZhbHNlLCB0cnVlXSxcclxuICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgICAgIG1heDogMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICBzbGlkZXJTdW0ubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcclxuICAgICAgICAgICAgdmFyIHByb2ZpdERhdGEgPSBwcm9maXQuYXR0cignZGF0YS1wcm9maXQnKTtcclxuICAgIFxyXG4gICAgICAgICAgICBzbGlkZXJTdW1Cb3gudGV4dChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0pO1xyXG4gICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA9PT0gJzUwMDAwJyB8fFxyXG4gICAgICAgICAgICAgICAgcmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dIDwgJzUwMDAwMCdcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5zZXQoMCk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogMjApIC8gMTAwKTtcclxuICAgICAgICAgICAgICAgIHByb2ZpdC50ZXh0KCcyMCUnKTtcclxuICAgICAgICAgICAgICAgIHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcsICcyMCcpO1xyXG4gICAgICAgICAgICAgICAgYnRuLnRleHQoJ9Ch0YLQsNGC0Ywg0L7Qv9GC0L7QstC40LrQvtC8Jyk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChjYWxjdWxhdG9ySXRlbU9wdC5oYXNDbGFzcygnaXMtaGlkZGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnd293IGZhZGVJblVwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1PcHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBXT1coKS5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICByYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gPT09ICc1MDAwMDAnIHx8XHJcbiAgICAgICAgICAgICAgICByYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gPD0gJzkwMDAwMCcgfHxcclxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA9PT0gJzkwMDAwMCdcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5zZXQoMSk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogMjUpIC8gMTAwKTtcclxuICAgICAgICAgICAgICAgIHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcsICcyNScpO1xyXG4gICAgICAgICAgICAgICAgcHJvZml0LnRleHQoJzI1JScpO1xyXG4gICAgICAgICAgICAgICAgYnRuLnRleHQoJ9Ch0YLQsNGC0Ywg0LTQuNC70LXRgNC+0LwnKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGN1bGF0b3JJdGVtRGlsZXIuaGFzQ2xhc3MoJ2lzLWhpZGRlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtRGlsZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBXT1coKS5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dID09PSAnMTAwMDAwJykge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyU3RhdHVzLm5vVWlTbGlkZXIuc2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIDMwKSAvIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBwcm9maXQudGV4dCgnMzAlJyk7XHJcbiAgICAgICAgICAgICAgICBwcm9maXQuYXR0cignZGF0YS1wcm9maXQnLCAnMzAnKTtcclxuICAgICAgICAgICAgICAgIGJ0bi50ZXh0KCfQodGC0LDRgtGMINC00LjQu9C10YDQvtC8ICsnKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGN1bGF0b3JJdGVtRGlsZXJQbHVzLmhhc0NsYXNzKCdpcy1oaWRkZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd3b3cgZmFkZUluVXAnKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbURpbGVyUGx1c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnd293IGZhZGVJblVwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdPVygpLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dID09PSAnMTAwMDAwMCcpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlclN0YXR1cy5ub1VpU2xpZGVyLnNldCgyKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiAzMCkgLyAxMDApO1xyXG4gICAgICAgICAgICAgICAgcHJvZml0LnRleHQoJzMwJScpO1xyXG4gICAgICAgICAgICAgICAgcHJvZml0LmF0dHIoJ2RhdGEtcHJvZml0JywgJzMwJyk7XHJcbiAgICAgICAgICAgICAgICBidG4udGV4dCgn0KHRgtCw0YLRjCDQtNC40LvQtdGA0L7QvCArJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChjYWxjdWxhdG9ySXRlbURpbGVyUGx1cy5oYXNDbGFzcygnaXMtaGlkZGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnd293IGZhZGVJblVwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1EaWxlclBsdXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBXT1coKS5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIHNsaWRlclN0YXR1cy5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbih2YWx1ZXMsIGhhbmRsZSkge1xyXG4gICAgICAgICAgICBzbGlkZXJTdGF0dXNCb3gudGV4dChyYW5nZVN0YXR1c1t2YWx1ZXNbaGFuZGxlXV0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIGlmIChyYW5nZVN0YXR1c1t2YWx1ZXNbaGFuZGxlXV0gPT09ICfQlNC40LvQtdGAJykge1xyXG4gICAgICAgICAgICAvLyAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIHByb2ZpdERhdGEpIC8gMTAwKTtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgLy8gc2xpZGVyU3VtLm5vVWlTbGlkZXIuc2V0KDQpO1xyXG4gICAgICAgICAgICAvLyB9IGVsc2UgaWYgKHJhbmdlU3RhdHVzW3ZhbHVlc1toYW5kbGVdXSA9PT0gJ9CU0LjQu9C10YAgKycpIHtcclxuICAgICAgICAgICAgLy8gICAgIC8vIHNsaWRlclN1bS5ub1VpU2xpZGVyLnNldCg3KTtcclxuICAgICAgICAgICAgLy8gICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiBwcm9maXREYXRhKSAvIDEwMCk7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gc2xpZGVyU3VtLm5vVWlTbGlkZXIuc2V0KDApO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcbn0pO1xuIl19
