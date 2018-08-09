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
    if ($('.js-hero-slider').length > 0) {
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
                dots: false
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
                dots: false
            }
        }]
    };

    if ($('.js-slider').length > 0) {
        $('.js-slider').slick({
            infoSliderSettings: infoSliderSettings
        });
    }

    if ($('.js-jurnal-slider').length > 0) {
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
                    dots: false
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
                console.log('---', profitData);

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

        // sliderStatus.noUiSlider.on('update', function(values, handle) {
        //     sliderStatusBox.text(rangeStatus[values[handle]]);

        //     if (rangeStatus[values[handle]] === 'Дилер') {
        //         result.text((rangeSum[values[handle]] * profitData) / 100);

        //         // sliderSum.noUiSlider.set(4);
        //     } else if (rangeStatus[values[handle]] === 'Дилер +') {
        //         // sliderSum.noUiSlider.set(7);
        //         result.text((rangeSum[values[handle]] * profitData) / 100);
        //     } else {
        //         result.text((rangeSum[values[handle]] * profitData) / 100);
        //         // sliderSum.noUiSlider.set(0);
        //     }
        // });
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwib24iLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImRvY3VtZW50IiwicmVhZHkiLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwiY3NzIiwicGFyZW50IiwiZmluZCIsImNsb3Nlc3QiLCJsZW5ndGgiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJ2YWwiLCJpbnB1dG1hc2siLCJtYXNrIiwiY2xlYXJJbmNvbXBsZXRlIiwic2VsZWN0MiIsImNvbnRhaW5lciIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiY2xpY2siLCJldmVudCIsInRhcmdldCIsInN0b3BQcm9wYWdhdGlvbiIsImUiLCJkYXRlVG9kYXkiLCJEYXRlIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJhdXRvQ2xvc2UiLCJtaW5EYXRlIiwicHJldmVudERlZmF1bHQiLCJmb2N1cyIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJXT1ciLCJpbml0Iiwid2lkdGgiLCJzbGlkZVVwIiwic2xpZGVUb2dnbGUiLCJuYXYiLCJoZWFkZXJIZWlnaHQiLCJvdXRlckhlaWdodCIsImhlYWRlckNsb25lIiwiaW5zZXJ0QmVmb3JlIiwiaGlkZSIsInNob3ciLCJzbGljayIsImFycm93cyIsImluZmluaXRlIiwiYXV0b3BsYXkiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwiYXV0b3BsYXlTcGVlZCIsImRvdHMiLCJhcHBlbmREb3RzIiwic2xpZGVyIiwiaSIsInNsaWRlQ291bnQiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJpbmZvU2xpZGVyU2V0dGluZ3MiLCJyZXNwb25zaXZlIiwiY3VzdG9tUGFnaW5nIiwicHJvZml0IiwicmVzdWx0IiwicHJvZml0RGF0YSIsImRhdGEiLCJzbGlkZXJTdW0iLCJnZXRFbGVtZW50QnlJZCIsInNsaWRlclN1bUJveCIsInNsaWRlclN0YXR1cyIsInNsaWRlclN0YXR1c0JveCIsImNhbGN1bGF0b3JJdGVtIiwiY2FsY3VsYXRvckl0ZW1PcHQiLCJjYWxjdWxhdG9ySXRlbURpbGVyIiwiY2FsY3VsYXRvckl0ZW1EaWxlclBsdXMiLCJyYW5nZVN1bSIsInJhbmdlU3RhdHVzIiwibm9VaVNsaWRlciIsImNyZWF0ZSIsImFuaW1hdGlvbkR1cmF0aW9uIiwic3RhcnQiLCJzdGVwIiwiZm9ybWF0Iiwid051bWIiLCJkZWNpbWFscyIsImJlaGF2aW91ciIsImNvbm5lY3QiLCJyYW5nZSIsIm1pbiIsIm1heCIsInZhbHVlcyIsImhhbmRsZSIsImF0dHIiLCJ0ZXh0Iiwic2V0IiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7QUFHQUEsRUFBRUMsTUFBRixFQUFVQyxFQUFWLENBQWEsTUFBYixFQUFxQixZQUFXO0FBQzVCLFFBQ0ksNkNBQTZDQyxJQUE3QyxDQUFrREMsVUFBVUMsU0FBNUQsQ0FESixFQUVFO0FBQ0VMLFVBQUUsTUFBRixFQUFVTSxRQUFWLENBQW1CLEtBQW5CO0FBQ0gsS0FKRCxNQUlPO0FBQ0hOLFVBQUUsTUFBRixFQUFVTSxRQUFWLENBQW1CLEtBQW5CO0FBQ0g7O0FBRUROLE1BQUUsTUFBRixFQUFVTyxXQUFWLENBQXNCLFNBQXRCO0FBQ0gsQ0FWRDs7QUFhQVAsRUFBRVEsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7QUFDekI7OztBQUdBO0FBQ0FULE1BQUUsZ0JBQUYsRUFBb0JFLEVBQXBCLENBQXVCLE9BQXZCLEVBQWdDLFlBQVc7QUFDdkMsWUFBSUYsRUFBRSxJQUFGLEVBQVFVLFFBQVIsQ0FBaUIsU0FBakIsQ0FBSixFQUFpQztBQUM3QlYsY0FBRSxJQUFGLEVBQVFPLFdBQVIsQ0FBb0IsU0FBcEI7QUFDQVAsY0FBRSxTQUFGLEVBQWFXLE9BQWI7QUFDQVgsY0FBRSxNQUFGLEVBQVVZLFVBQVYsQ0FBcUIsT0FBckI7QUFD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LENBQVksS0FBWjtBQUNBL0IsdUJBQU84QixJQUFQLENBQVksYUFBWixFQUEyQixJQUEzQjs7QUFFQSxvQkFBSWxCLHdCQUF3QjdFLFFBQXhCLENBQWlDLFdBQWpDLENBQUosRUFBbUQ7QUFDL0MwRSxtQ0FDSzlFLFFBREwsQ0FDYyxXQURkLEVBRUtDLFdBRkwsQ0FFaUIsY0FGakI7QUFHQWdGLDRDQUNLaEYsV0FETCxDQUNpQixXQURqQixFQUVLRCxRQUZMLENBRWMsY0FGZDtBQUdBLHdCQUFJdUMsR0FBSixHQUFVQyxJQUFWO0FBQ0g7QUFDSjtBQUNKLFNBNUVEOztBQThFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFFSixDQXBjRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAqIGJhc2UuanNcbiovXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoXG4gICAgICAgIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpb3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3dlYicpO1xuICAgIH1cblxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xufSk7XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLypcbiAgICAqIGhlYWRlci5qc1xuICAgICovXG4gICAgLy9IZWFkZXIgaGFtYnVyZ2VyXG4gICAgJCgnLmpzLW5hdi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIC8vTW9iaWxlIG1lbnUgc3VibmF2IHRvZ2dsZVxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCcubW9iaWxlLW5hdi0tc3ViJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5tb2JpbGUtbmF2LS1zdWInKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9Nb2JpbGUgU2VhcmNoXG4gICAgaWYgKCQoJy5qcy1zZWFyY2gtaW5wdXQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBzZWFyY2hJbnB1dCA9ICQoJy5qcy1zZWFyY2gtaW5wdXQnKTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xuICAgIGlmICgkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XG4gICAgICAgICAgICBjb250YWluZXI6ICcuY3Mtc2VsZWN0X19jb250YWluZXInXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5zZWxlY3QyLWRyb3Bkb3duLCAuc2VsZWN0Mi1jb250YWluZXInKVxuICAgICAgICAgICAgICAgICAgICAubGVuZ3RoXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoJ2Nsb3NlJyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2ZvY3VzJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0RhdGVwaWNrZXIgaHR0cDovL3QxbTBuLm5hbWUvYWlyLWRhdGVwaWNrZXIvZG9jcy9pbmRleC1ydS5odG1sXG4gICAgaWYgKCcuanMtZGF0ZScubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgZGF0ZVRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgJCgnLmpzLWRhdGUnKS5kYXRlcGlja2VyKHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdkZC5tbS55eScsXG4gICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgICBtaW5EYXRlOiBkYXRlVG9kYXlcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1pbnB1dC1pY29uJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcuanMtZGF0ZScpLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgNDAwKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9TdG9wIGRyYWdcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgICQoJy5qcy1kcm9wZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgJCgnLmpzLWRyb3Bkb3duLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIC8vU2VjdGlvbiBBbmltYXJpb25zXG4gICAgbmV3IFdPVygpLmluaXQoKTtcblxuICAgIGlmICgkKCcuanMtbS1hY2NvcmRlb24nKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAkKCcuanMtbS1hY2NvcmRlb24nKVxuICAgICAgICAgICAgLmZpbmQoJy5jYWxjdWxhdG9yX19kZXNjJylcbiAgICAgICAgICAgIC5zbGlkZVVwKCk7XG5cbiAgICAgICAgJCgnLmpzLW0tYWNjb3JkZW9uLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbS1hY2NvcmRlb24nKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuY2FsY3VsYXRvcl9fZGVzYycpXG4gICAgICAgICAgICAgICAgLnNsaWRlVG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vanVybmFsIGhlYWRlciBmaXhlZFxuICAgIGlmICgkKCcuanMtanVybmFsLW5hdicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IG5hdiA9ICQoJy5qcy1qdXJuYWwtbmF2Jyk7XG4gICAgICAgIGxldCBoZWFkZXJIZWlnaHQgPSAkKCcuaGVhZGVyICcpLm91dGVySGVpZ2h0KCk7XG4gICAgICAgIGxldCBoZWFkZXJDbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJoZWFkZXItY2xvbmVcIj4nKVxuICAgICAgICAgICAgLmNzcygnbWluLWhlaWdodCcsIG5hdi5vdXRlckhlaWdodCgpKVxuICAgICAgICAgICAgLmluc2VydEJlZm9yZShuYXYpXG4gICAgICAgICAgICAuaGlkZSgpO1xuXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNDgwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiBoZWFkZXJIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LmFkZENsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbG9uZS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LmFkZENsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbG9uZS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL05pZ2h0IE1vZGVcbiAgICAkKCcuanMtbmlnaHQtbW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCgnLmp1cm5hbCcpLmhhc0NsYXNzKCd0aGVtZS1kYXJrJykpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmZhcycpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYWwnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmFzJyk7XG4gICAgICAgICAgICAkKCcuanVybmFsJykucmVtb3ZlQ2xhc3MoJ3RoZW1lLWRhcmsnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmZhbCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYWwnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmFzJyk7XG4gICAgICAgICAgICAkKCcuanVybmFsJykuYWRkQ2xhc3MoJ3RoZW1lLWRhcmsnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLypcbiAgICAqIHNsaWRlci5qc1xuICAgICovXG4gICAgLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cbiAgICBpZiAoJCgnLmpzLWhlcm8tc2xpZGVyJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtaGVyby1zbGlkZXInKS5zbGljayh7XG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBzcGVlZDogNDAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBhcHBlbmREb3RzOiAnLmhlcm9fX3NsaWRlciAubS1zbGlkZXJfX2RvdHMnLFxuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgIGN1c3RvbVBhZ2luZzogZnVuY3Rpb24oc2xpZGVyLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKyAxICsgJy8nICsgc2xpZGVyLnNsaWRlQ291bnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHZhciBpbmZvU2xpZGVyU2V0dGluZ3MgPSB7XG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIHNwZWVkOiA3MDAsXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBcbiAgICBpZiAoJCgnLmpzLXNsaWRlcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgIGluZm9TbGlkZXJTZXR0aW5nc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCQoJy5qcy1qdXJuYWwtc2xpZGVyJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtanVybmFsLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiA3MDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgIGFwcGVuZERvdHM6ICcuanVybmFsLWFydGljbGVfX3NsaWRlciAubS1zbGlkZXJfX2RvdHMnLFxuICAgICAgICAgICAgY3VzdG9tUGFnaW5nOiBmdW5jdGlvbihzbGlkZXIsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSArIDEgKyAnLycgKyBzbGlkZXIuc2xpZGVDb3VudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICogcmFuZ2Utc2xpZGVyLmpzXG4gICAgKi9cbiAgICAvL1ByaWNlIFNsaWRlclxuICAgIGlmICgkKCcuanMtY2FsY3VsYXRvcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHByb2ZpdCA9ICQoJy5qcy1jYWxjdWxhdG9yLXByb2ZpdCcpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gJCgnLmpzLWNhbGN1bGF0b3ItcmVzdWx0Jyk7XG4gICAgICAgIGxldCBwcm9maXREYXRhID0gcHJvZml0LmRhdGEoJ3Byb2ZpdCcpO1xuICAgIFxuICAgICAgICBsZXQgc2xpZGVyU3VtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0b3Itc3VtJyk7XG4gICAgICAgIGxldCBzbGlkZXJTdW1Cb3ggPSAkKCcjY2FsY3VsYXRvci1zdW0tcHJpY2UnKTtcbiAgICBcbiAgICAgICAgbGV0IHNsaWRlclN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjdWxhdG9yLXN0YXR1cycpO1xuICAgICAgICBsZXQgc2xpZGVyU3RhdHVzQm94ID0gJCgnI2NhbGN1bGF0b3Itc3RhdHVzLXZhbGwnKTtcbiAgICBcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JJdGVtID0gJCgnLmNhbGN1bGF0b3ItaXRlbScpO1xuICAgICAgICBsZXQgY2FsY3VsYXRvckl0ZW1PcHQgPSAkKCcuY2FsY3VsYXRvci1pdGVtLS1vcHQnKTtcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JJdGVtRGlsZXIgPSAkKCcuY2FsY3VsYXRvci1pdGVtLS1kaWxlcicpO1xuICAgICAgICBsZXQgY2FsY3VsYXRvckl0ZW1EaWxlclBsdXMgPSAkKCcuY2FsY3VsYXRvci1pdGVtLS1kaWxlcnBsdXMnKTtcbiAgICBcbiAgICAgICAgbGV0IHJhbmdlU3VtID0gW1xuICAgICAgICAgICAgJzUwMDAwJyxcbiAgICAgICAgICAgICcxMDAwMDAnLFxuICAgICAgICAgICAgJzMwMDAwMCcsXG4gICAgICAgICAgICAnNTAwMDAwJyxcbiAgICAgICAgICAgICc3MDAwMDAnLFxuICAgICAgICAgICAgJzkwMDAwMCcsXG4gICAgICAgICAgICAnMTAwMDAwMCdcbiAgICAgICAgXTtcbiAgICBcbiAgICAgICAgbGV0IHJhbmdlU3RhdHVzID0gWyfQntC/0YLQvtCy0LjQuicsICfQlNC40LvQtdGAJywgJ9CU0LjQu9C10YAgKyddO1xuICAgIFxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXJTdW0sIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAzMDAsXG4gICAgICAgICAgICBzdGFydDogMyxcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgXG4gICAgICAgICAgICBmb3JtYXQ6IHdOdW1iKHtcbiAgICAgICAgICAgICAgICBkZWNpbWFsczogMFxuICAgICAgICAgICAgfSksXG4gICAgXG4gICAgICAgICAgICBiZWhhdmlvdXI6ICd0YXAnLFxuICAgICAgICAgICAgY29ubmVjdDogW2ZhbHNlLCB0cnVlXSxcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIG1heDogNlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyU3RhdHVzLCB7XG4gICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogMzAwLFxuICAgICAgICAgICAgc3RhcnQ6IDEsXG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgZm9ybWF0OiB3TnVtYih7XG4gICAgICAgICAgICAgICAgZGVjaW1hbHM6IDBcbiAgICAgICAgICAgIH0pLFxuICAgIFxuICAgICAgICAgICAgYmVoYXZpb3VyOiAndGFwJyxcbiAgICAgICAgICAgIGNvbm5lY3Q6IFtmYWxzZSwgdHJ1ZV0sXG4gICAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICBtYXg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHNsaWRlclN1bS5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbih2YWx1ZXMsIGhhbmRsZSkge1xuICAgICAgICAgICAgdmFyIHByb2ZpdERhdGEgPSBwcm9maXQuYXR0cignZGF0YS1wcm9maXQnKTtcbiAgICBcbiAgICAgICAgICAgIHNsaWRlclN1bUJveC50ZXh0KHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSk7XG4gICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xuICAgIFxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA9PT0gJzUwMDAwJyB8fFxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA8ICc1MDAwMDAnXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5zZXQoMCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIDIwKSAvIDEwMCk7XG4gICAgICAgICAgICAgICAgcHJvZml0LnRleHQoJzIwJScpO1xuICAgICAgICAgICAgICAgIHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcsICcyMCcpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChjYWxjdWxhdG9ySXRlbU9wdC5oYXNDbGFzcygnaXMtaGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtaGlkZGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnd293IGZhZGVJblVwJyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtT3B0XG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xuICAgICAgICAgICAgICAgICAgICBuZXcgV09XKCkuaW5pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgcmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dID09PSAnNTAwMDAwJyB8fFxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA8PSAnOTAwMDAwJyB8fFxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA9PT0gJzkwMDAwMCdcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHNsaWRlclN0YXR1cy5ub1VpU2xpZGVyLnNldCgxKTtcbiAgICAgICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogMjUpIC8gMTAwKTtcbiAgICAgICAgICAgICAgICBwcm9maXQuYXR0cignZGF0YS1wcm9maXQnLCAnMjUnKTtcbiAgICAgICAgICAgICAgICBwcm9maXQudGV4dCgnMjUlJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIHByb2ZpdERhdGEpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChjYWxjdWxhdG9ySXRlbURpbGVyLmhhc0NsYXNzKCdpcy1oaWRkZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd3b3cgZmFkZUluVXAnKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1EaWxlclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCd3b3cgZmFkZUluVXAnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdPVygpLmluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA9PT0gJzEwMDAwMCcpIHtcbiAgICAgICAgICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5zZXQoMik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIDMwKSAvIDEwMCk7XG4gICAgICAgICAgICAgICAgcHJvZml0LnRleHQoJzMwJScpO1xuICAgICAgICAgICAgICAgIHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcsICczMCcpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChjYWxjdWxhdG9ySXRlbURpbGVyUGx1cy5oYXNDbGFzcygnaXMtaGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtaGlkZGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnd293IGZhZGVJblVwJyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtRGlsZXJQbHVzXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3dvdyBmYWRlSW5VcCcpO1xuICAgICAgICAgICAgICAgICAgICBuZXcgV09XKCkuaW5pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gPT09ICcxMDAwMDAwJykge1xuICAgICAgICAgICAgICAgIHNsaWRlclN0YXR1cy5ub1VpU2xpZGVyLnNldCgyKTtcbiAgICAgICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogMzApIC8gMTAwKTtcbiAgICAgICAgICAgICAgICBwcm9maXQudGV4dCgnMzAlJyk7XG4gICAgICAgICAgICAgICAgcHJvZml0LmF0dHIoJ2RhdGEtcHJvZml0JywgJzMwJyk7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGNhbGN1bGF0b3JJdGVtRGlsZXJQbHVzLmhhc0NsYXNzKCdpcy1oaWRkZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd3b3cgZmFkZUluVXAnKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1EaWxlclBsdXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnd293IGZhZGVJblVwJyk7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBXT1coKS5pbml0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgLy8gc2xpZGVyU3RhdHVzLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKSB7XG4gICAgICAgIC8vICAgICBzbGlkZXJTdGF0dXNCb3gudGV4dChyYW5nZVN0YXR1c1t2YWx1ZXNbaGFuZGxlXV0pO1xuICAgIFxuICAgICAgICAvLyAgICAgaWYgKHJhbmdlU3RhdHVzW3ZhbHVlc1toYW5kbGVdXSA9PT0gJ9CU0LjQu9C10YAnKSB7XG4gICAgICAgIC8vICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIHByb2ZpdERhdGEpIC8gMTAwKTtcbiAgICBcbiAgICAgICAgLy8gICAgICAgICAvLyBzbGlkZXJTdW0ubm9VaVNsaWRlci5zZXQoNCk7XG4gICAgICAgIC8vICAgICB9IGVsc2UgaWYgKHJhbmdlU3RhdHVzW3ZhbHVlc1toYW5kbGVdXSA9PT0gJ9CU0LjQu9C10YAgKycpIHtcbiAgICAgICAgLy8gICAgICAgICAvLyBzbGlkZXJTdW0ubm9VaVNsaWRlci5zZXQoNyk7XG4gICAgICAgIC8vICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIHByb2ZpdERhdGEpIC8gMTAwKTtcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIHByb2ZpdERhdGEpIC8gMTAwKTtcbiAgICAgICAgLy8gICAgICAgICAvLyBzbGlkZXJTdW0ubm9VaVNsaWRlci5zZXQoMCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgIH1cbiAgICBcbn0pO1xuIl19
