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

    //Click event to scroll to top
    $('.js-go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 400);
    });

    $(window).scroll(function () {
        console.log('---', 'scroll');
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
            dots: true

        }, _defineProperty(_$$slick, 'dots', true), _defineProperty(_$$slick, 'customPaging', function customPaging(slider, i) {
            return i + 1 + '/' + slider.slideCount;
        }), _defineProperty(_$$slick, 'appendDots', '.hero__slider .m-slider__dots'), _defineProperty(_$$slick, 'responsive', [{
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
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwib24iLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImRvY3VtZW50IiwicmVhZHkiLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwiY3NzIiwicGFyZW50IiwiZmluZCIsImNsb3Nlc3QiLCJsZW5ndGgiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJ2YWwiLCJpbnB1dG1hc2siLCJtYXNrIiwiY2xlYXJJbmNvbXBsZXRlIiwiZSIsInByZXZlbnREZWZhdWx0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInNjcm9sbCIsImNvbnNvbGUiLCJsb2ciLCJoZWlnaHQiLCJldmVudCIsInNsaWNrIiwiYXJyb3dzIiwiaW5maW5pdGUiLCJhdXRvcGxheSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiZG90cyIsInNsaWRlciIsImkiLCJzbGlkZUNvdW50IiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwiaW5mb1NsaWRlclNldHRpbmdzIiwicmVzcG9uc2l2ZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7QUFHQUEsRUFBRUMsTUFBRixFQUFVQyxFQUFWLENBQWEsTUFBYixFQUFxQixZQUFXO0FBQzVCLFFBQ0ksNkNBQTZDQyxJQUE3QyxDQUFrREMsVUFBVUMsU0FBNUQsQ0FESixFQUVFO0FBQ0VMLFVBQUUsTUFBRixFQUFVTSxRQUFWLENBQW1CLEtBQW5CO0FBQ0gsS0FKRCxNQUlPO0FBQ0hOLFVBQUUsTUFBRixFQUFVTSxRQUFWLENBQW1CLEtBQW5CO0FBQ0g7O0FBRUROLE1BQUUsTUFBRixFQUFVTyxXQUFWLENBQXNCLFNBQXRCO0FBQ0gsQ0FWRDs7QUFhQVAsRUFBRVEsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7QUFDekI7OztBQUdBO0FBQ0FULE1BQUUsZ0JBQUYs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Q1I7QUFDSUgsd0JBQVksR0FEaEI7QUFFSUMsc0JBQVU7QUFDTkwsc0JBQU07QUFEQTtBQUZkLFNBRFE7QUFQUyxLQUF6Qjs7QUFpQkEsUUFBSTFDLEVBQUUsWUFBRixFQUFnQmtCLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQzVCbEIsVUFBRSxZQUFGLEVBQWdCa0MsS0FBaEIsQ0FBc0I7QUFDbEJjO0FBRGtCLFNBQXRCO0FBR0g7QUFFSixDQXJKRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAqIGJhc2UuanNcbiovXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoXG4gICAgICAgIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpb3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3dlYicpO1xuICAgIH1cblxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xufSk7XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLypcbiAgICAqIGhlYWRlci5qc1xuICAgICovXG4gICAgLy9IZWFkZXIgaGFtYnVyZ2VyXG4gICAgJCgnLmpzLW5hdi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIC8vTW9iaWxlIG1lbnUgc3VibmF2IHRvZ2dsZVxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCcubW9iaWxlLW5hdi0tc3ViJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5tb2JpbGUtbmF2LS1zdWInKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9Nb2JpbGUgU2VhcmNoXG4gICAgaWYgKCQoJy5qcy1zZWFyY2gtaW5wdXQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBzZWFyY2hJbnB1dCA9ICQoJy5qcy1zZWFyY2gtaW5wdXQnKTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgNDAwKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCAnc2Nyb2xsJyk7XG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9TdG9wIGRyYWdcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgKiBzbGlkZXIuanNcbiAgICAqL1xuICAgIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXG4gICAgaWYgKCQoJy5qcy1oZXJvLXNsaWRlcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWhlcm8tc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDcwMCxcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgIFxuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgIGN1c3RvbVBhZ2luZzogZnVuY3Rpb24oc2xpZGVyLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKyAxICsgJy8nICsgc2xpZGVyLnNsaWRlQ291bnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXBwZW5kRG90czogJy5oZXJvX19zbGlkZXIgLm0tc2xpZGVyX19kb3RzJyxcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICB2YXIgaW5mb1NsaWRlclNldHRpbmdzID0ge1xuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBzcGVlZDogNzAwLFxuICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgXG4gICAgaWYgKCQoJy5qcy1zbGlkZXInKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1zbGlkZXInKS5zbGljayh7XG4gICAgICAgICAgICBpbmZvU2xpZGVyU2V0dGluZ3NcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufSk7XG4iXX0=
