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
    $('.info__left').animated('slideInLeft', 'slideOutLeft');
    $('.info__right').animated('slideInRight', 'slideOutRight');
    $('.reviews__img').animated('fadeInUp', 'fadeOutDown');
    $('.calculator-item').animated('fadeInUp', 'fadeOutDown');

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
            console.log('---', 'hasClass');
        } else {
            $(this).find('.fal').removeClass('fal').addClass('fas');
            $('.jurnal').addClass('theme-dark');
            console.log('---', 'notHasClass');
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
            speed: 700,
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
            appendDots: '.jurnal__slider .m-slider__dots',
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

        calculatorItem.not('.calculator-item--opt').css('display', 'none');

        var rangeSum = ['0', '50000', '100000', '300000', '500000', '700000', '900000', '1000000'];

        var rangeStatus = ['Оптовик', 'Оптовик', 'Дилер', 'Дилер +'];

        noUiSlider.create(sliderSum, {
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
                max: 7
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
                max: 3
            }
        });

        sliderSum.noUiSlider.on('update', function (values, handle) {
            var profitData = profit.attr('data-profit');

            sliderSumBox.text(rangeSum[values[handle]]);
            result.text(rangeSum[values[handle]] * profitData / 100);

            if (rangeSum[values[handle]] < '500000') {
                sliderStatus.noUiSlider.set(1);
                result.text(rangeSum[values[handle]] * profitData / 100);
                calculatorItem.css('display', 'none');
                calculatorItemOpt.removeAttr('style');
            } else if (rangeSum[values[handle]] >= '500000' && rangeSum[values[handle]] <= '900000') {
                sliderStatus.noUiSlider.set(2);
                result.text(rangeSum[values[handle]] * profitData / 100);
                calculatorItem.css('display', 'none');
                calculatorItemDiler.removeAttr('style');
            } else {
                sliderStatus.noUiSlider.set(3);
                result.text(rangeSum[values[handle]] * profitData / 100);
                calculatorItem.css('display', 'none');
                calculatorItemDilerPlus.removeAttr('style');
            }
            if (rangeSum[values[handle]] === '1000000') {
                sliderStatus.noUiSlider.set(3);
                result.text(rangeSum[values[handle]] * 30 / 100);
                calculatorItem.css('display', 'none');
                calculatorItemDilerPlus.removeAttr('style');
            }
        });

        sliderStatus.noUiSlider.on('update', function (values, handle) {
            sliderStatusBox.text(rangeStatus[values[handle]]);

            if (rangeStatus[values[handle]] === 'Дилер') {
                profit.attr('data-profit', '25');
                profit.text('25%');
                result.text(rangeSum[values[handle]] * profitData / 100);
            } else if (rangeStatus[values[handle]] === 'Дилер +') {
                profit.text('30%');
                profit.attr('data-profit', '30');
                result.text(rangeSum[values[handle]] * profitData / 100);
            } else {
                profit.text('20%');
                profit.attr('data-profit', '20');
                result.text(rangeSum[values[handle]] * profitData / 100);
            }
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwib24iLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImRvY3VtZW50IiwicmVhZHkiLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwiY3NzIiwicGFyZW50IiwiZmluZCIsImNsb3Nlc3QiLCJsZW5ndGgiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJ2YWwiLCJpbnB1dG1hc2siLCJtYXNrIiwiY2xlYXJJbmNvbXBsZXRlIiwic2VsZWN0MiIsImNvbnRhaW5lciIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiY2xpY2siLCJldmVudCIsInRhcmdldCIsInN0b3BQcm9wYWdhdGlvbiIsImUiLCJkYXRlVG9kYXkiLCJEYXRlIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJhdXRvQ2xvc2UiLCJtaW5EYXRlIiwicHJldmVudERlZmF1bHQiLCJmb2N1cyIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJhbmltYXRlZCIsIndpZHRoIiwic2xpZGVVcCIsInNsaWRlVG9nZ2xlIiwibmF2IiwiaGVhZGVySGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJoZWFkZXJDbG9uZSIsImluc2VydEJlZm9yZSIsImhpZGUiLCJzaG93IiwiY29uc29sZSIsImxvZyIsInNsaWNrIiwiYXJyb3dzIiwiaW5maW5pdGUiLCJhdXRvcGxheSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiZG90cyIsImFwcGVuZERvdHMiLCJzbGlkZXIiLCJpIiwic2xpZGVDb3VudCIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsImluZm9TbGlkZXJTZXR0aW5ncyIsInJlc3BvbnNpdmUiLCJjdXN0b21QYWdpbmciLCJwcm9maXQiLCJyZXN1bHQiLCJwcm9maXREYXRhIiwiZGF0YSIsInNsaWRlclN1bSIsImdldEVsZW1lbnRCeUlkIiwic2xpZGVyU3VtQm94Iiwic2xpZGVyU3RhdHVzIiwic2xpZGVyU3RhdHVzQm94IiwiY2FsY3VsYXRvckl0ZW0iLCJjYWxjdWxhdG9ySXRlbU9wdCIsImNhbGN1bGF0b3JJdGVtRGlsZXIiLCJjYWxjdWxhdG9ySXRlbURpbGVyUGx1cyIsIm5vdCIsInJhbmdlU3VtIiwicmFuZ2VTdGF0dXMiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJzdGFydCIsInN0ZXAiLCJmb3JtYXQiLCJ3TnVtYiIsImRlY2ltYWxzIiwiYmVoYXZpb3VyIiwiY29ubmVjdCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWVzIiwiaGFuZGxlIiwiYXR0ciIsInRleHQiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7O0FBR0FBLEVBQUVDLE1BQUYsRUFBVUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM1QixRQUNJLDZDQUE2Q0MsSUFBN0MsQ0FBa0RDLFVBQVVDLFNBQTVELENBREosRUFFRTtBQUNFTCxVQUFFLE1BQUYsRUFBVU0sUUFBVixDQUFtQixLQUFuQjtBQUNILEtBSkQsTUFJTztBQUNITixVQUFFLE1BQUYsRUFBVU0sUUFBVixDQUFtQixLQUFuQjtBQUNIOztBQUVETixNQUFFLE1BQUYsRUFBVU8sV0FBVixDQUFzQixTQUF0QjtBQUNILENBVkQ7O0FBYUFQLEVBQUVRLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCOzs7QUFHQTtBQUNBVCxNQUFFLGdCQUFGLEVBQW9CRSxFQUFwQixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBQ3ZDLFlBQUlGLEVBQUUsSUFBRixFQUFRVSxRQUFSLENBQWlCLFNBQWpCLENBQUosRUFBaUM7QUFDN0JWLGNBQUUsSUFBRixFQUFRTyxXQUFSLENBQW9CLFNBQXBCO0FBQ0FQLGNBQUUsU0FBRixFQUFhVyxPQUFiO0FBQ0FYLGNBQUUsTUFBRixFQUFVWSxVQUFWLENBQXFCLE9BQXJC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TytCLElBQVAsQ0FBYWxCLFNBQVNlLE9BQU9DLE1BQVAsQ0FBVCxJQUEyQjVCLFVBQTVCLEdBQTBDLEdBQXREO0FBQ0gsYUFKRCxNQUlPLElBQUlhLFlBQVljLE9BQU9DLE1BQVAsQ0FBWixNQUFnQyxTQUFwQyxFQUErQztBQUNsRDlCLHVCQUFPZ0MsSUFBUCxDQUFZLEtBQVo7QUFDQWhDLHVCQUFPK0IsSUFBUCxDQUFZLGFBQVosRUFBMkIsSUFBM0I7QUFDQTlCLHVCQUFPK0IsSUFBUCxDQUFhbEIsU0FBU2UsT0FBT0MsTUFBUCxDQUFULElBQTJCNUIsVUFBNUIsR0FBMEMsR0FBdEQ7QUFDSCxhQUpNLE1BSUE7QUFDSEYsdUJBQU9nQyxJQUFQLENBQVksS0FBWjtBQUNBaEMsdUJBQU8rQixJQUFQLENBQVksYUFBWixFQUEyQixJQUEzQjtBQUNBOUIsdUJBQU8rQixJQUFQLENBQWFsQixTQUFTZSxPQUFPQyxNQUFQLENBQVQsSUFBMkI1QixVQUE1QixHQUEwQyxHQUF0RDtBQUNIO0FBQ0osU0FoQkQ7QUFpQkg7QUFFSixDQWphRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAqIGJhc2UuanNcbiovXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoXG4gICAgICAgIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpb3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3dlYicpO1xuICAgIH1cblxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xufSk7XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLypcbiAgICAqIGhlYWRlci5qc1xuICAgICovXG4gICAgLy9IZWFkZXIgaGFtYnVyZ2VyXG4gICAgJCgnLmpzLW5hdi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIC8vTW9iaWxlIG1lbnUgc3VibmF2IHRvZ2dsZVxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCcubW9iaWxlLW5hdi0tc3ViJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5tb2JpbGUtbmF2LS1zdWInKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9Nb2JpbGUgU2VhcmNoXG4gICAgaWYgKCQoJy5qcy1zZWFyY2gtaW5wdXQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBzZWFyY2hJbnB1dCA9ICQoJy5qcy1zZWFyY2gtaW5wdXQnKTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xuICAgIGlmICgkKCcuanMtc2VsZWN0JykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0Mih7XG4gICAgICAgICAgICBjb250YWluZXI6ICcuY3Mtc2VsZWN0X19jb250YWluZXInXG4gICAgICAgIH0pO1xuICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xuICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5zZWxlY3QyLWRyb3Bkb3duLCAuc2VsZWN0Mi1jb250YWluZXInKVxuICAgICAgICAgICAgICAgICAgICAubGVuZ3RoXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoJ2Nsb3NlJyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2ZvY3VzJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL0RhdGVwaWNrZXIgaHR0cDovL3QxbTBuLm5hbWUvYWlyLWRhdGVwaWNrZXIvZG9jcy9pbmRleC1ydS5odG1sXG4gICAgaWYgKCcuanMtZGF0ZScubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgZGF0ZVRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgJCgnLmpzLWRhdGUnKS5kYXRlcGlja2VyKHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdkZC5tbS55eScsXG4gICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgICBtaW5EYXRlOiBkYXRlVG9kYXlcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1pbnB1dC1pY29uJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcuanMtZGF0ZScpLmZvY3VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgNDAwKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9TdG9wIGRyYWdcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgICQoJy5qcy1kcm9wZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgJCgnLmpzLWRyb3Bkb3duLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1kcm9wZG93bicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIC8vU2VjdGlvbiBBbmltYXJpb25zXG4gICAgJCgnLmluZm9fX2xlZnQnKS5hbmltYXRlZCgnc2xpZGVJbkxlZnQnLCAnc2xpZGVPdXRMZWZ0Jyk7XG4gICAgJCgnLmluZm9fX3JpZ2h0JykuYW5pbWF0ZWQoJ3NsaWRlSW5SaWdodCcsICdzbGlkZU91dFJpZ2h0Jyk7XG4gICAgJCgnLnJldmlld3NfX2ltZycpLmFuaW1hdGVkKCdmYWRlSW5VcCcsICdmYWRlT3V0RG93bicpO1xuICAgICQoJy5jYWxjdWxhdG9yLWl0ZW0nKS5hbmltYXRlZCgnZmFkZUluVXAnLCAnZmFkZU91dERvd24nKTtcblxuICAgIGlmICgkKCcuanMtbS1hY2NvcmRlb24nKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xuICAgICAgICAkKCcuanMtbS1hY2NvcmRlb24nKVxuICAgICAgICAgICAgLmZpbmQoJy5jYWxjdWxhdG9yX19kZXNjJylcbiAgICAgICAgICAgIC5zbGlkZVVwKCk7XG5cbiAgICAgICAgJCgnLmpzLW0tYWNjb3JkZW9uLWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbS1hY2NvcmRlb24nKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuY2FsY3VsYXRvcl9fZGVzYycpXG4gICAgICAgICAgICAgICAgLnNsaWRlVG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vanVybmFsIGhlYWRlciBmaXhlZFxuICAgIGlmICgkKCcuanMtanVybmFsLW5hdicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IG5hdiA9ICQoJy5qcy1qdXJuYWwtbmF2Jyk7XG4gICAgICAgIGxldCBoZWFkZXJIZWlnaHQgPSAkKCcuaGVhZGVyICcpLm91dGVySGVpZ2h0KCk7XG4gICAgICAgIGxldCBoZWFkZXJDbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJoZWFkZXItY2xvbmVcIj4nKVxuICAgICAgICAgICAgLmNzcygnbWluLWhlaWdodCcsIG5hdi5vdXRlckhlaWdodCgpKVxuICAgICAgICAgICAgLmluc2VydEJlZm9yZShuYXYpXG4gICAgICAgICAgICAuaGlkZSgpO1xuXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNDgwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiBoZWFkZXJIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LmFkZENsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbG9uZS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LmFkZENsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbG9uZS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmF2LnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbG9uZS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL05pZ2h0IE1vZGVcbiAgICAkKCcuanMtbmlnaHQtbW9kZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCgnLmp1cm5hbCcpLmhhc0NsYXNzKCd0aGVtZS1kYXJrJykpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmZhcycpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYWwnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmFzJyk7XG4gICAgICAgICAgICAkKCcuanVybmFsJykucmVtb3ZlQ2xhc3MoJ3RoZW1lLWRhcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCAnaGFzQ2xhc3MnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZmluZCgnLmZhbCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYWwnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmFzJyk7XG4gICAgICAgICAgICAkKCcuanVybmFsJykuYWRkQ2xhc3MoJ3RoZW1lLWRhcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCAnbm90SGFzQ2xhc3MnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLypcbiAgICAqIHNsaWRlci5qc1xuICAgICovXG4gICAgLy9TbGljayBTbGlkZXIgaHR0cHM6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGljay9cbiAgICBpZiAoJCgnLmpzLWhlcm8tc2xpZGVyJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtaGVyby1zbGlkZXInKS5zbGljayh7XG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBzcGVlZDogNzAwLFxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBhcHBlbmREb3RzOiAnLmhlcm9fX3NsaWRlciAubS1zbGlkZXJfX2RvdHMnLFxuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgIGN1c3RvbVBhZ2luZzogZnVuY3Rpb24oc2xpZGVyLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKyAxICsgJy8nICsgc2xpZGVyLnNsaWRlQ291bnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHZhciBpbmZvU2xpZGVyU2V0dGluZ3MgPSB7XG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIHNwZWVkOiA3MDAsXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBcbiAgICBpZiAoJCgnLmpzLXNsaWRlcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgIGluZm9TbGlkZXJTZXR0aW5nc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCQoJy5qcy1qdXJuYWwtc2xpZGVyJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtanVybmFsLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiA3MDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgIGFwcGVuZERvdHM6ICcuanVybmFsX19zbGlkZXIgLm0tc2xpZGVyX19kb3RzJyxcbiAgICAgICAgICAgIGN1c3RvbVBhZ2luZzogZnVuY3Rpb24oc2xpZGVyLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKyAxICsgJy8nICsgc2xpZGVyLnNsaWRlQ291bnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuXG4gICAgLypcbiAgICAqIHJhbmdlLXNsaWRlci5qc1xuICAgICovXG4gICAgLy9QcmljZSBTbGlkZXJcbiAgICBpZiAoJCgnLmpzLWNhbGN1bGF0b3InKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBwcm9maXQgPSAkKCcuanMtY2FsY3VsYXRvci1wcm9maXQnKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICQoJy5qcy1jYWxjdWxhdG9yLXJlc3VsdCcpO1xuICAgICAgICBsZXQgcHJvZml0RGF0YSA9IHByb2ZpdC5kYXRhKCdwcm9maXQnKTtcbiAgICBcbiAgICAgICAgbGV0IHNsaWRlclN1bSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjdWxhdG9yLXN1bScpO1xuICAgICAgICBsZXQgc2xpZGVyU3VtQm94ID0gJCgnI2NhbGN1bGF0b3Itc3VtLXByaWNlJyk7XG4gICAgXG4gICAgICAgIGxldCBzbGlkZXJTdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FsY3VsYXRvci1zdGF0dXMnKTtcbiAgICAgICAgbGV0IHNsaWRlclN0YXR1c0JveCA9ICQoJyNjYWxjdWxhdG9yLXN0YXR1cy12YWxsJyk7XG4gICAgXG4gICAgICAgIGxldCBjYWxjdWxhdG9ySXRlbSA9ICQoJy5jYWxjdWxhdG9yLWl0ZW0nKTtcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JJdGVtT3B0ID0gJCgnLmNhbGN1bGF0b3ItaXRlbS0tb3B0Jyk7XG4gICAgICAgIGxldCBjYWxjdWxhdG9ySXRlbURpbGVyID0gJCgnLmNhbGN1bGF0b3ItaXRlbS0tZGlsZXInKTtcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JJdGVtRGlsZXJQbHVzID0gJCgnLmNhbGN1bGF0b3ItaXRlbS0tZGlsZXJwbHVzJyk7XG4gICAgXG4gICAgICAgIGNhbGN1bGF0b3JJdGVtLm5vdCgnLmNhbGN1bGF0b3ItaXRlbS0tb3B0JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICBcbiAgICAgICAgbGV0IHJhbmdlU3VtID0gW1xuICAgICAgICAgICAgJzAnLFxuICAgICAgICAgICAgJzUwMDAwJyxcbiAgICAgICAgICAgICcxMDAwMDAnLFxuICAgICAgICAgICAgJzMwMDAwMCcsXG4gICAgICAgICAgICAnNTAwMDAwJyxcbiAgICAgICAgICAgICc3MDAwMDAnLFxuICAgICAgICAgICAgJzkwMDAwMCcsXG4gICAgICAgICAgICAnMTAwMDAwMCdcbiAgICAgICAgXTtcbiAgICBcbiAgICAgICAgbGV0IHJhbmdlU3RhdHVzID0gWyfQntC/0YLQvtCy0LjQuicsICfQntC/0YLQvtCy0LjQuicsICfQlNC40LvQtdGAJywgJ9CU0LjQu9C10YAgKyddO1xuICAgIFxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXJTdW0sIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAzMDAsXG4gICAgICAgICAgICBzdGFydDogMSxcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgXG4gICAgICAgICAgICBmb3JtYXQ6IHdOdW1iKHtcbiAgICAgICAgICAgICAgICBkZWNpbWFsczogMFxuICAgICAgICAgICAgfSksXG4gICAgXG4gICAgICAgICAgICBiZWhhdmlvdXI6ICd0YXAnLFxuICAgICAgICAgICAgY29ubmVjdDogW2ZhbHNlLCB0cnVlXSxcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIG1heDogN1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyU3RhdHVzLCB7XG4gICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogMzAwLFxuICAgICAgICAgICAgc3RhcnQ6IDEsXG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgZm9ybWF0OiB3TnVtYih7XG4gICAgICAgICAgICAgICAgZGVjaW1hbHM6IDBcbiAgICAgICAgICAgIH0pLFxuICAgIFxuICAgICAgICAgICAgYmVoYXZpb3VyOiAndGFwJyxcbiAgICAgICAgICAgIGNvbm5lY3Q6IFtmYWxzZSwgdHJ1ZV0sXG4gICAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICBtYXg6IDNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHNsaWRlclN1bS5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbih2YWx1ZXMsIGhhbmRsZSkge1xuICAgICAgICAgICAgbGV0IHByb2ZpdERhdGEgPSBwcm9maXQuYXR0cignZGF0YS1wcm9maXQnKTtcbiAgICBcbiAgICAgICAgICAgIHNsaWRlclN1bUJveC50ZXh0KHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSk7XG4gICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xuICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA8ICc1MDAwMDAnKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVyU3RhdHVzLm5vVWlTbGlkZXIuc2V0KDEpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiBwcm9maXREYXRhKSAvIDEwMCk7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW0uY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbU9wdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICByYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gPj0gJzUwMDAwMCcgJiZcbiAgICAgICAgICAgICAgICByYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gPD0gJzkwMDAwMCdcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHNsaWRlclN0YXR1cy5ub1VpU2xpZGVyLnNldCgyKTtcbiAgICAgICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1EaWxlci5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5zZXQoMyk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIHByb2ZpdERhdGEpIC8gMTAwKTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtRGlsZXJQbHVzLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dID09PSAnMTAwMDAwMCcpIHtcbiAgICAgICAgICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5zZXQoMyk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIDMwKSAvIDEwMCk7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW0uY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbURpbGVyUGx1cy5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2xpZGVyU3RhdHVzLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKSB7XG4gICAgICAgICAgICBzbGlkZXJTdGF0dXNCb3gudGV4dChyYW5nZVN0YXR1c1t2YWx1ZXNbaGFuZGxlXV0pO1xuICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlU3RhdHVzW3ZhbHVlc1toYW5kbGVdXSA9PT0gJ9CU0LjQu9C10YAnKSB7XG4gICAgICAgICAgICAgICAgcHJvZml0LmF0dHIoJ2RhdGEtcHJvZml0JywgJzI1Jyk7XG4gICAgICAgICAgICAgICAgcHJvZml0LnRleHQoJzI1JScpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiBwcm9maXREYXRhKSAvIDEwMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJhbmdlU3RhdHVzW3ZhbHVlc1toYW5kbGVdXSA9PT0gJ9CU0LjQu9C10YAgKycpIHtcbiAgICAgICAgICAgICAgICBwcm9maXQudGV4dCgnMzAlJyk7XG4gICAgICAgICAgICAgICAgcHJvZml0LmF0dHIoJ2RhdGEtcHJvZml0JywgJzMwJyk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIHByb2ZpdERhdGEpIC8gMTAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJvZml0LnRleHQoJzIwJScpO1xuICAgICAgICAgICAgICAgIHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcsICcyMCcpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiBwcm9maXREYXRhKSAvIDEwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbn0pO1xuIl19
