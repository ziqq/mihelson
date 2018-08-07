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
    if ($(window).width() >= 480) {
        $('.info__left').animated('slideInLeft', 'slideOutLeft');
        $('.info__right').animated('slideInRight', 'slideOutRight');
        $('.reviews__img').animated('fadeInUp', 'fadeOutDown');
        $('.calculator-item').animated('fadeInUp', 'fadeOutDown');
    }

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwib24iLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImRvY3VtZW50IiwicmVhZHkiLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwiY3NzIiwicGFyZW50IiwiZmluZCIsImNsb3Nlc3QiLCJsZW5ndGgiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJ2YWwiLCJpbnB1dG1hc2siLCJtYXNrIiwiY2xlYXJJbmNvbXBsZXRlIiwic2VsZWN0MiIsImNvbnRhaW5lciIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiY2xpY2siLCJldmVudCIsInRhcmdldCIsInN0b3BQcm9wYWdhdGlvbiIsImUiLCJkYXRlVG9kYXkiLCJEYXRlIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJhdXRvQ2xvc2UiLCJtaW5EYXRlIiwicHJldmVudERlZmF1bHQiLCJmb2N1cyIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJzY3JvbGwiLCJoZWlnaHQiLCJ3aWR0aCIsImFuaW1hdGVkIiwic2xpZGVVcCIsInNsaWRlVG9nZ2xlIiwibmF2IiwiaGVhZGVySGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJoZWFkZXJDbG9uZSIsImluc2VydEJlZm9yZSIsImhpZGUiLCJzaG93IiwiY29uc29sZSIsImxvZyIsInNsaWNrIiwiYXJyb3dzIiwiaW5maW5pdGUiLCJhdXRvcGxheSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiZG90cyIsImFwcGVuZERvdHMiLCJzbGlkZXIiLCJpIiwic2xpZGVDb3VudCIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsImluZm9TbGlkZXJTZXR0aW5ncyIsInJlc3BvbnNpdmUiLCJjdXN0b21QYWdpbmciLCJwcm9maXQiLCJyZXN1bHQiLCJwcm9maXREYXRhIiwiZGF0YSIsInNsaWRlclN1bSIsImdldEVsZW1lbnRCeUlkIiwic2xpZGVyU3VtQm94Iiwic2xpZGVyU3RhdHVzIiwic2xpZGVyU3RhdHVzQm94IiwiY2FsY3VsYXRvckl0ZW0iLCJjYWxjdWxhdG9ySXRlbU9wdCIsImNhbGN1bGF0b3JJdGVtRGlsZXIiLCJjYWxjdWxhdG9ySXRlbURpbGVyUGx1cyIsIm5vdCIsInJhbmdlU3VtIiwicmFuZ2VTdGF0dXMiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJzdGFydCIsInN0ZXAiLCJmb3JtYXQiLCJ3TnVtYiIsImRlY2ltYWxzIiwiYmVoYXZpb3VyIiwiY29ubmVjdCIsInJhbmdlIiwibWluIiwibWF4IiwidmFsdWVzIiwiaGFuZGxlIiwiYXR0ciIsInRleHQiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7O0FBR0FBLEVBQUVDLE1BQUYsRUFBVUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBVztBQUM1QixRQUNJLDZDQUE2Q0MsSUFBN0MsQ0FBa0RDLFVBQVVDLFNBQTVELENBREosRUFFRTtBQUNFTCxVQUFFLE1BQUYsRUFBVU0sUUFBVixDQUFtQixLQUFuQjtBQUNILEtBSkQsTUFJTztBQUNITixVQUFFLE1BQUYsRUFBVU0sUUFBVixDQUFtQixLQUFuQjtBQUNIOztBQUVETixNQUFFLE1BQUYsRUFBVU8sV0FBVixDQUFzQixTQUF0QjtBQUNILENBVkQ7O0FBYUFQLEVBQUVRLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCOzs7QUFHQTtBQUNBVCxNQUFFLGdCQUFGLEVBQW9CRSxFQUFwQixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBQ3ZDLFlBQUlGLEVBQUUsSUFBRixFQUFRVSxRQUFSLENBQWlCLFNBQWpCLENBQUosRUFBaUM7QUFDN0JWLGNBQUUsSUFBRixFQUFRTyxXQUFSLENBQW9CLFNBQXBCO0FBQ0FQLGNBQUUsU0FBRixFQUFhVyxPQUFiO0FBQ0FYLGNBQUUsTUFBRixFQUFVWSxVQUFWLENBQXFCLE9BQXJC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LGFBQVosRUFBMkIsSUFBM0I7QUFDQS9CLHVCQUFPZ0MsSUFBUCxDQUFZLEtBQVo7QUFDQS9CLHVCQUFPK0IsSUFBUCxDQUFhbEIsU0FBU2UsT0FBT0MsTUFBUCxDQUFULElBQTJCNUIsVUFBNUIsR0FBMEMsR0FBdEQ7QUFDSCxhQUpELE1BSU8sSUFBSWEsWUFBWWMsT0FBT0MsTUFBUCxDQUFaLE1BQWdDLFNBQXBDLEVBQStDO0FBQ2xEOUIsdUJBQU9nQyxJQUFQLENBQVksS0FBWjtBQUNBaEMsdUJBQU8rQixJQUFQLENBQVksYUFBWixFQUEyQixJQUEzQjtBQUNBOUIsdUJBQU8rQixJQUFQLENBQWFsQixTQUFTZSxPQUFPQyxNQUFQLENBQVQsSUFBMkI1QixVQUE1QixHQUEwQyxHQUF0RDtBQUNILGFBSk0sTUFJQTtBQUNIRix1QkFBT2dDLElBQVAsQ0FBWSxLQUFaO0FBQ0FoQyx1QkFBTytCLElBQVAsQ0FBWSxhQUFaLEVBQTJCLElBQTNCO0FBQ0E5Qix1QkFBTytCLElBQVAsQ0FBYWxCLFNBQVNlLE9BQU9DLE1BQVAsQ0FBVCxJQUEyQjVCLFVBQTVCLEdBQTBDLEdBQXREO0FBQ0g7QUFDSixTQWhCRDtBQWlCSDtBQUVKLENBbmFEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICogYmFzZS5qc1xuKi9cbiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgIGlmIChcbiAgICAgICAgL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxuICAgICkge1xuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2lvcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnd2ViJyk7XG4gICAgfVxuXG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG59KTtcblxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvKlxuICAgICogaGVhZGVyLmpzXG4gICAgKi9cbiAgICAvL0hlYWRlciBoYW1idXJnZXJcbiAgICAkKCcuanMtbmF2LXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAkKCcuanMtbmF2JykuZmFkZU91dCgpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAkKCcuanMtbmF2JykuZmFkZUluKCk7XG4gICAgICAgICAgICAkKCdodG1sJykuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgXG4gICAgLy9Nb2JpbGUgbWVudSBzdWJuYXYgdG9nZ2xlXG4gICAgJCgnLmpzLW1vYmlsZS1uYXYtc3ViLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJy5tb2JpbGUtbmF2LS1zdWInKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLW1vYmlsZS1uYXYtc3ViLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLm1vYmlsZS1uYXYtLXN1YicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL01vYmlsZSBTZWFyY2hcbiAgICBpZiAoJCgnLmpzLXNlYXJjaC1pbnB1dCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHNlYXJjaElucHV0ID0gJCgnLmpzLXNlYXJjaC1pbnB1dCcpO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgaGludC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgaGludC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXG4gICAgaWYgKCQoJy5qcy1zZWxlY3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJy5jcy1zZWxlY3RfX2NvbnRhaW5lcidcbiAgICAgICAgfSk7XG4gICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XG4gICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnNlbGVjdDItZHJvcGRvd24sIC5zZWxlY3QyLWNvbnRhaW5lcicpXG4gICAgICAgICAgICAgICAgICAgIC5sZW5ndGhcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MignY2xvc2UnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vRGF0ZXBpY2tlciBodHRwOi8vdDFtMG4ubmFtZS9haXItZGF0ZXBpY2tlci9kb2NzL2luZGV4LXJ1Lmh0bWxcbiAgICBpZiAoJy5qcy1kYXRlJy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBkYXRlVG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAkKCcuanMtZGF0ZScpLmRhdGVwaWNrZXIoe1xuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ2RkLm1tLnl5JyxcbiAgICAgICAgICAgIGF1dG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgIG1pbkRhdGU6IGRhdGVUb2RheVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLmpzLWlucHV0LWljb24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJy5qcy1kYXRlJykuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gdG9wXG4gICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCA0MDApO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAkKHRoaXMpLmhlaWdodCgpKSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL1N0b3AgZHJhZ1xuICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgJCgnLmpzLWRyb3Bkb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICAkKCcuanMtZHJvcGRvd24tLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWRyb3Bkb3duJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgJCgnLmpzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgLy9TZWN0aW9uIEFuaW1hcmlvbnNcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNDgwKSB7XG4gICAgICAgICQoJy5pbmZvX19sZWZ0JykuYW5pbWF0ZWQoJ3NsaWRlSW5MZWZ0JywgJ3NsaWRlT3V0TGVmdCcpO1xuICAgICAgICAkKCcuaW5mb19fcmlnaHQnKS5hbmltYXRlZCgnc2xpZGVJblJpZ2h0JywgJ3NsaWRlT3V0UmlnaHQnKTtcbiAgICAgICAgJCgnLnJldmlld3NfX2ltZycpLmFuaW1hdGVkKCdmYWRlSW5VcCcsICdmYWRlT3V0RG93bicpO1xuICAgICAgICAkKCcuY2FsY3VsYXRvci1pdGVtJykuYW5pbWF0ZWQoJ2ZhZGVJblVwJywgJ2ZhZGVPdXREb3duJyk7XG4gICAgfVxuXG4gICAgaWYgKCQoJy5qcy1tLWFjY29yZGVvbicpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgICQoJy5qcy1tLWFjY29yZGVvbicpXG4gICAgICAgICAgICAuZmluZCgnLmNhbGN1bGF0b3JfX2Rlc2MnKVxuICAgICAgICAgICAgLnNsaWRlVXAoKTtcblxuICAgICAgICAkKCcuanMtbS1hY2NvcmRlb24tYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tLWFjY29yZGVvbicpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5jYWxjdWxhdG9yX19kZXNjJylcbiAgICAgICAgICAgICAgICAuc2xpZGVUb2dnbGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9qdXJuYWwgaGVhZGVyIGZpeGVkXG4gICAgaWYgKCQoJy5qcy1qdXJuYWwtbmF2JykubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgbmF2ID0gJCgnLmpzLWp1cm5hbC1uYXYnKTtcbiAgICAgICAgbGV0IGhlYWRlckhlaWdodCA9ICQoJy5oZWFkZXIgJykub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgbGV0IGhlYWRlckNsb25lID0gJCgnPGRpdiBjbGFzcz1cImhlYWRlci1jbG9uZVwiPicpXG4gICAgICAgICAgICAuY3NzKCdtaW4taGVpZ2h0JywgbmF2Lm91dGVySGVpZ2h0KCkpXG4gICAgICAgICAgICAuaW5zZXJ0QmVmb3JlKG5hdilcbiAgICAgICAgICAgIC5oaWRlKCk7XG5cbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA0ODApIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IGhlYWRlckhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBuYXYuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckNsb25lLnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuYXYucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckNsb25lLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBuYXYuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckNsb25lLnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuYXYucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckNsb25lLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vTmlnaHQgTW9kZVxuICAgICQoJy5qcy1uaWdodC1tb2RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKCcuanVybmFsJykuaGFzQ2xhc3MoJ3RoZW1lLWRhcmsnKSkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuZmFzJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhbCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYXMnKTtcbiAgICAgICAgICAgICQoJy5qdXJuYWwnKS5yZW1vdmVDbGFzcygndGhlbWUtZGFyaycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsICdoYXNDbGFzcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuZmFsJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhbCcpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYXMnKTtcbiAgICAgICAgICAgICQoJy5qdXJuYWwnKS5hZGRDbGFzcygndGhlbWUtZGFyaycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsICdub3RIYXNDbGFzcycpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICogc2xpZGVyLmpzXG4gICAgKi9cbiAgICAvL1NsaWNrIFNsaWRlciBodHRwczovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrL1xuICAgIGlmICgkKCcuanMtaGVyby1zbGlkZXInKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1oZXJvLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiA3MDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgIGFwcGVuZERvdHM6ICcuaGVyb19fc2xpZGVyIC5tLXNsaWRlcl9fZG90cycsXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgY3VzdG9tUGFnaW5nOiBmdW5jdGlvbihzbGlkZXIsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSArIDEgKyAnLycgKyBzbGlkZXIuc2xpZGVDb3VudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgdmFyIGluZm9TbGlkZXJTZXR0aW5ncyA9IHtcbiAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgc3BlZWQ6IDcwMCxcbiAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIFxuICAgIGlmICgkKCcuanMtc2xpZGVyJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuanMtc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgaW5mb1NsaWRlclNldHRpbmdzXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBpZiAoJCgnLmpzLWp1cm5hbC1zbGlkZXInKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1qdXJuYWwtc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDcwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgYXBwZW5kRG90czogJy5qdXJuYWxfX3NsaWRlciAubS1zbGlkZXJfX2RvdHMnLFxuICAgICAgICAgICAgY3VzdG9tUGFnaW5nOiBmdW5jdGlvbihzbGlkZXIsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSArIDEgKyAnLycgKyBzbGlkZXIuc2xpZGVDb3VudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKlxuICAgICogcmFuZ2Utc2xpZGVyLmpzXG4gICAgKi9cbiAgICAvL1ByaWNlIFNsaWRlclxuICAgIGlmICgkKCcuanMtY2FsY3VsYXRvcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHByb2ZpdCA9ICQoJy5qcy1jYWxjdWxhdG9yLXByb2ZpdCcpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gJCgnLmpzLWNhbGN1bGF0b3ItcmVzdWx0Jyk7XG4gICAgICAgIGxldCBwcm9maXREYXRhID0gcHJvZml0LmRhdGEoJ3Byb2ZpdCcpO1xuICAgIFxuICAgICAgICBsZXQgc2xpZGVyU3VtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0b3Itc3VtJyk7XG4gICAgICAgIGxldCBzbGlkZXJTdW1Cb3ggPSAkKCcjY2FsY3VsYXRvci1zdW0tcHJpY2UnKTtcbiAgICBcbiAgICAgICAgbGV0IHNsaWRlclN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxjdWxhdG9yLXN0YXR1cycpO1xuICAgICAgICBsZXQgc2xpZGVyU3RhdHVzQm94ID0gJCgnI2NhbGN1bGF0b3Itc3RhdHVzLXZhbGwnKTtcbiAgICBcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JJdGVtID0gJCgnLmNhbGN1bGF0b3ItaXRlbScpO1xuICAgICAgICBsZXQgY2FsY3VsYXRvckl0ZW1PcHQgPSAkKCcuY2FsY3VsYXRvci1pdGVtLS1vcHQnKTtcbiAgICAgICAgbGV0IGNhbGN1bGF0b3JJdGVtRGlsZXIgPSAkKCcuY2FsY3VsYXRvci1pdGVtLS1kaWxlcicpO1xuICAgICAgICBsZXQgY2FsY3VsYXRvckl0ZW1EaWxlclBsdXMgPSAkKCcuY2FsY3VsYXRvci1pdGVtLS1kaWxlcnBsdXMnKTtcbiAgICBcbiAgICAgICAgY2FsY3VsYXRvckl0ZW0ubm90KCcuY2FsY3VsYXRvci1pdGVtLS1vcHQnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIFxuICAgICAgICBsZXQgcmFuZ2VTdW0gPSBbXG4gICAgICAgICAgICAnMCcsXG4gICAgICAgICAgICAnNTAwMDAnLFxuICAgICAgICAgICAgJzEwMDAwMCcsXG4gICAgICAgICAgICAnMzAwMDAwJyxcbiAgICAgICAgICAgICc1MDAwMDAnLFxuICAgICAgICAgICAgJzcwMDAwMCcsXG4gICAgICAgICAgICAnOTAwMDAwJyxcbiAgICAgICAgICAgICcxMDAwMDAwJ1xuICAgICAgICBdO1xuICAgIFxuICAgICAgICBsZXQgcmFuZ2VTdGF0dXMgPSBbJ9Ce0L/RgtC+0LLQuNC6JywgJ9Ce0L/RgtC+0LLQuNC6JywgJ9CU0LjQu9C10YAnLCAn0JTQuNC70LXRgCArJ107XG4gICAgXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlclN1bSwge1xuICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IDMwMCxcbiAgICAgICAgICAgIHN0YXJ0OiAxLFxuICAgICAgICAgICAgc3RlcDogMSxcbiAgICBcbiAgICAgICAgICAgIGZvcm1hdDogd051bWIoe1xuICAgICAgICAgICAgICAgIGRlY2ltYWxzOiAwXG4gICAgICAgICAgICB9KSxcbiAgICBcbiAgICAgICAgICAgIGJlaGF2aW91cjogJ3RhcCcsXG4gICAgICAgICAgICBjb25uZWN0OiBbZmFsc2UsIHRydWVdLFxuICAgICAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgbWF4OiA3XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXJTdGF0dXMsIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAzMDAsXG4gICAgICAgICAgICBzdGFydDogMSxcbiAgICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgICBmb3JtYXQ6IHdOdW1iKHtcbiAgICAgICAgICAgICAgICBkZWNpbWFsczogMFxuICAgICAgICAgICAgfSksXG4gICAgXG4gICAgICAgICAgICBiZWhhdmlvdXI6ICd0YXAnLFxuICAgICAgICAgICAgY29ubmVjdDogW2ZhbHNlLCB0cnVlXSxcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIG1heDogM1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2xpZGVyU3VtLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKSB7XG4gICAgICAgICAgICBsZXQgcHJvZml0RGF0YSA9IHByb2ZpdC5hdHRyKCdkYXRhLXByb2ZpdCcpO1xuICAgIFxuICAgICAgICAgICAgc2xpZGVyU3VtQm94LnRleHQocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dKTtcbiAgICAgICAgICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiBwcm9maXREYXRhKSAvIDEwMCk7XG4gICAgXG4gICAgICAgICAgICBpZiAocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dIDwgJzUwMDAwMCcpIHtcbiAgICAgICAgICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5zZXQoMSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIHByb2ZpdERhdGEpIC8gMTAwKTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtT3B0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA+PSAnNTAwMDAwJyAmJlxuICAgICAgICAgICAgICAgIHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSA8PSAnOTAwMDAwJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVyU3RhdHVzLm5vVWlTbGlkZXIuc2V0KDIpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC50ZXh0KChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gKiBwcm9maXREYXRhKSAvIDEwMCk7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW0uY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbURpbGVyLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNsaWRlclN0YXR1cy5ub1VpU2xpZGVyLnNldCgzKTtcbiAgICAgICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRvckl0ZW1EaWxlclBsdXMucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyYW5nZVN1bVt2YWx1ZXNbaGFuZGxlXV0gPT09ICcxMDAwMDAwJykge1xuICAgICAgICAgICAgICAgIHNsaWRlclN0YXR1cy5ub1VpU2xpZGVyLnNldCgzKTtcbiAgICAgICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogMzApIC8gMTAwKTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdG9ySXRlbS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0b3JJdGVtRGlsZXJQbHVzLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzbGlkZXJTdGF0dXMubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcbiAgICAgICAgICAgIHNsaWRlclN0YXR1c0JveC50ZXh0KHJhbmdlU3RhdHVzW3ZhbHVlc1toYW5kbGVdXSk7XG4gICAgXG4gICAgICAgICAgICBpZiAocmFuZ2VTdGF0dXNbdmFsdWVzW2hhbmRsZV1dID09PSAn0JTQuNC70LXRgCcpIHtcbiAgICAgICAgICAgICAgICBwcm9maXQuYXR0cignZGF0YS1wcm9maXQnLCAnMjUnKTtcbiAgICAgICAgICAgICAgICBwcm9maXQudGV4dCgnMjUlJyk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIHByb2ZpdERhdGEpIC8gMTAwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmFuZ2VTdGF0dXNbdmFsdWVzW2hhbmRsZV1dID09PSAn0JTQuNC70LXRgCArJykge1xuICAgICAgICAgICAgICAgIHByb2ZpdC50ZXh0KCczMCUnKTtcbiAgICAgICAgICAgICAgICBwcm9maXQuYXR0cignZGF0YS1wcm9maXQnLCAnMzAnKTtcbiAgICAgICAgICAgICAgICByZXN1bHQudGV4dCgocmFuZ2VTdW1bdmFsdWVzW2hhbmRsZV1dICogcHJvZml0RGF0YSkgLyAxMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9maXQudGV4dCgnMjAlJyk7XG4gICAgICAgICAgICAgICAgcHJvZml0LmF0dHIoJ2RhdGEtcHJvZml0JywgJzIwJyk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQoKHJhbmdlU3VtW3ZhbHVlc1toYW5kbGVdXSAqIHByb2ZpdERhdGEpIC8gMTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufSk7XG4iXX0=
