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
            nextArrow: '.m-slider__arrow--next',
            prevArrow: '.m-slider__arrow--prev',
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
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwib24iLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImRvY3VtZW50IiwicmVhZHkiLCJoYXNDbGFzcyIsImZhZGVPdXQiLCJyZW1vdmVBdHRyIiwiZmFkZUluIiwiY3NzIiwicGFyZW50IiwiZmluZCIsImNsb3Nlc3QiLCJsZW5ndGgiLCJzZWFyY2hJbnB1dCIsImhpbnQiLCJ2YWwiLCJpbnB1dG1hc2siLCJtYXNrIiwiY2xlYXJJbmNvbXBsZXRlIiwiZSIsInByZXZlbnREZWZhdWx0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInNjcm9sbCIsImNvbnNvbGUiLCJsb2ciLCJoZWlnaHQiLCJldmVudCIsInNsaWNrIiwibmV4dEFycm93IiwicHJldkFycm93IiwiYXJyb3dzIiwiaW5maW5pdGUiLCJhdXRvcGxheSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwic3BlZWQiLCJhdXRvcGxheVNwZWVkIiwiZG90cyIsInNsaWRlciIsImkiLCJzbGlkZUNvdW50IiwiYnJlYWtwb2ludCIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7OztBQUdBQSxFQUFFQyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVc7QUFDNUIsUUFDSSw2Q0FBNkNDLElBQTdDLENBQWtEQyxVQUFVQyxTQUE1RCxDQURKLEVBRUU7QUFDRUwsVUFBRSxNQUFGLEVBQVVNLFFBQVYsQ0FBbUIsS0FBbkI7QUFDSCxLQUpELE1BSU87QUFDSE4sVUFBRSxNQUFGLEVBQVVNLFFBQVYsQ0FBbUIsS0FBbkI7QUFDSDs7QUFFRE4sTUFBRSxNQUFGLEVBQVVPLFdBQVYsQ0FBc0IsU0FBdEI7QUFDSCxDQVZEOztBQWFBUCxFQUFFUSxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVztBQUN6Qjs7O0FBR0E7QUFDQVQsTUFBRSxnQkFBRixFQUFvQkUsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBVztBQUN2QyxZQUFJRixFQUFFLElBQUYsRUFBUVUsUUFBUixDQUFpQixTQUFqQixDQUFKLEVBQWlDO0FBQzdCVixjQUFFLElBQUYsRUFBUU8sV0FBUixDQUFvQixTQUFwQjtBQUNBUCxjQUFFLFNBQUYsRUFBYVcsT0FBYjtBQUNBWCxjQUFFLE1BQUYsRUFBVVksVUFBVixDQUFxQixPQUFyQjtBQUNILFNBSkQsTUFJTztBQUNIWixjQUFFLElBQUYsRUFBUU0sUUFBUixDQUFpQixTQUFqQjtBQUNBTixjQUFFLFNBQUYsRUFBYWEsTUFBYjtBQUNBYixjQUFFLE1BQUYsRUFBVWMsR0FBVixDQUFjLFVBQWQsRUFBMEIsUUFBMUI7QUFDSDtBQUNELGVBQU8sS0FBUDtBQUNILEtBWEQ7O0FBYUE7QUFDQWQsTUFBRSwwQkFBRixFQUE4QkUsRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVztBQUNqREYsVUFBRSxJQUFGLEVBQ0tlLE1BREwsR0FFS0MsSUFGTCxDQUVVLGtCQUZWLEVBR0tWLFFBSEwsQ0FHYyxTQUhkO0FBSUgsS0FMRDs7QUFPQU4sTUFBRSwyQkFBRixFQUErQkUsRUFBL0IsQ0FBa0MsT0FBbEMsRUFBMkMsWUFBVztBQUNsREYsVUFBRSxJQUFGLEVBQ0tpQixPQURMLENBQ2Esa0JBRGIsRUFFS1YsV0FGTCxDQUVpQixTQUZqQjtBQUdILEtBSkQ7O0FBTUE7QUFDQSxRQUFJUCxFQUFFLGtCQUFGLEVBQXNCa0IsTUFBdEIsR0FBK0IsQ0FBbkMsRUFBc0M7QUFDbEMsWUFBSUMsY0FBY25CLEVBQUUsa0JBQUYsQ0FBbEI7O0FBRUFtQixvQkFBWWpCLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFlBQVc7QUFDL0IsZ0JBQUlrQixPQUFPcEIsRUFBRSxJQUFGLEVBQ05pQixPQURNLENBQ0UsWUFERixFQUVORCxJQUZNLENBRUQsZUFGQyxDQUFYO0FBR0EsZ0JBQUloQixFQUFFLElBQUYsRUFBUXFCLEdBQVIsT0FBa0IsRUFBdEIsRUFBMEI7QUFDdEJELHFCQUFLUixVQUFMLENBQWdCLE9BQWhCO0FBQ0gsYUFGRCxNQUVPO0FBQ0hRLHFCQUFLTixHQUFMLENBQVMsU0FBVCxFQUFvQixNQUFwQjtBQUNIO0FBQ0osU0FURDs7QUFXQUssb0JBQVlqQixFQUFaLENBQWUsT0FBZixFQUF3QixZQUFXO0FBQy9CLGdCQUFJa0IsT0FBT3BCLEVBQUUsSUFBRixFQUNOaUIsT0FETSxDQUNFLFlBREYsRUFFTkQsSUFGTSxDQUVELGVBRkMsQ0FBWDtBQUdBLGdCQUFJaEIsRUFBRSxJQUFGLEVBQVFxQixHQUFSLE9BQWtCLEVBQXRCLEVBQTBCO0FBQ3RCRCxxQkFBS1IsVUFBTCxDQUFnQixPQUFoQjtBQUNILGFBRkQsTUFFTztBQUNIUSxxQkFBS04sR0FBTCxDQUFTLFNBQVQsRUFBb0IsTUFBcEI7QUFDSDtBQUNKLFNBVEQ7O0FBV0FLLG9CQUFZakIsRUFBWixDQUFlLE1BQWYsRUFBdUIsWUFBVztBQUM5QkYsY0FBRSxJQUFGLEVBQ0tpQixPQURMLENBQ2EsWUFEYixFQUVLRCxJQUZMLENBRVUsZUFGVixFQUdLRixHQUhMLENBR1MsU0FIVCxFQUdvQixNQUhwQjtBQUlILFNBTEQ7QUFNSDs7QUFHRDtBQUNBLFFBQUlkLEVBQUUsZ0JBQUYsRUFBb0JrQixNQUFwQixHQUE2QixDQUFqQyxFQUFvQztBQUNoQ2xCLFVBQUUsZ0JBQUYsRUFBb0JzQixTQUFwQixDQUE4QjtBQUMxQkMsa0JBQU0sb0JBRG9CO0FBRTFCQyw2QkFBaUI7QUFGUyxTQUE5QjtBQUlIOztBQUVEO0FBQ0F4QixNQUFFLFlBQUYsRUFBZ0JFLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFVBQVN1QixDQUFULEVBQVk7QUFDcENBLFVBQUVDLGNBQUY7QUFDQTFCLFVBQUUsWUFBRixFQUFnQjJCLE9BQWhCLENBQXdCLEVBQUVDLFdBQVcsQ0FBYixFQUF4QixFQUEwQyxHQUExQztBQUNILEtBSEQ7O0FBS0E1QixNQUFFQyxNQUFGLEVBQVU0QixNQUFWLENBQWlCLFlBQVc7QUFDeEJDLGdCQUFRQyxHQUFSLENBQVksS0FBWixFQUFtQixRQUFuQjtBQUNBLFlBQUkvQixFQUFFLElBQUYsRUFBUTRCLFNBQVIsS0FBc0I1QixFQUFFLElBQUYsRUFBUWdDLE1BQVIsRUFBMUIsRUFBNEM7QUFDeENoQyxjQUFFLFlBQUYsRUFBZ0JNLFFBQWhCLENBQXlCLFlBQXpCO0FBQ0gsU0FGRCxNQUVPO0FBQ0hOLGNBQUUsWUFBRixFQUFnQk8sV0FBaEIsQ0FBNEIsWUFBNUI7QUFDSDtBQUNKLEtBUEQ7O0FBU0E7QUFDQVAsTUFBRSxLQUFGLEVBQVNFLEVBQVQsQ0FBWSxXQUFaLEVBQXlCLFVBQVMrQixLQUFULEVBQWdCO0FBQ3JDQSxjQUFNUCxjQUFOO0FBQ0gsS0FGRDs7QUFJQTs7O0FBR0E7QUFDQSxRQUFJMUIsRUFBRSxpQkFBRixFQUFxQmtCLE1BQXJCLEdBQThCLENBQWxDLEVBQXFDO0FBQUE7O0FBQ2pDbEIsVUFBRSxpQkFBRixFQUFxQmtDLEtBQXJCO0FBQ0lDLHVCQUFXLHdCQURmO0FBRUlDLHVCQUFXLHdCQUZmO0FBR0lDLG9CQUFRLElBSFo7QUFJSUMsc0JBQVUsSUFKZDtBQUtJQyxzQkFBVSxJQUxkO0FBTUlDLDBCQUFjLENBTmxCO0FBT0lDLDRCQUFnQixDQVBwQjtBQVFJQyxtQkFBTyxHQVJYO0FBU0lDLDJCQUFlLElBVG5CO0FBVUlDLGtCQUFNOztBQVZWLDZDQVlVLElBWlYsNkNBYWtCLHNCQUFTQyxNQUFULEVBQWlCQyxDQUFqQixFQUFvQjtBQUM5QixtQkFBT0EsSUFBSSxDQUFKLEdBQVEsR0FBUixHQUFjRCxPQUFPRSxVQUE1QjtBQUNILFNBZkwsMkNBZ0JnQiwrQkFoQmhCLDJDQWlCZ0IsQ0FDUjtBQUNJQyx3QkFBWSxHQURoQjtBQUVJQyxzQkFBVTtBQUNOTCxzQkFBTTtBQURBO0FBRmQsU0FEUSxDQWpCaEI7QUEwQkg7QUFFSixDQWhJRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAqIGJhc2UuanNcbiovXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoXG4gICAgICAgIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICApIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpb3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3dlYicpO1xuICAgIH1cblxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xufSk7XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLypcbiAgICAqIGhlYWRlci5qc1xuICAgICovXG4gICAgLy9IZWFkZXIgaGFtYnVyZ2VyXG4gICAgJCgnLmpzLW5hdi10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnLmpzLW5hdicpLmZhZGVJbigpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIC8vTW9iaWxlIG1lbnUgc3VibmF2IHRvZ2dsZVxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAgIC5maW5kKCcubW9iaWxlLW5hdi0tc3ViJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgIH0pO1xuICAgIFxuICAgICQoJy5qcy1tb2JpbGUtbmF2LXN1Yi0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNsb3Nlc3QoJy5tb2JpbGUtbmF2LS1zdWInKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9Nb2JpbGUgU2VhcmNoXG4gICAgaWYgKCQoJy5qcy1zZWFyY2gtaW5wdXQnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBzZWFyY2hJbnB1dCA9ICQoJy5qcy1zZWFyY2gtaW5wdXQnKTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2VhcmNoSW5wdXQub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG5cbiAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknLFxuICAgICAgICAgICAgY2xlYXJJbmNvbXBsZXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHRvcFxuICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgNDAwKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCAnc2Nyb2xsJyk7XG4gICAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gJCh0aGlzKS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9TdG9wIGRyYWdcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgKiBzbGlkZXIuanNcbiAgICAqL1xuICAgIC8vU2xpY2sgU2xpZGVyIGh0dHBzOi8va2Vud2hlZWxlci5naXRodWIuaW8vc2xpY2svXG4gICAgaWYgKCQoJy5qcy1oZXJvLXNsaWRlcicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLWhlcm8tc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgbmV4dEFycm93OiAnLm0tc2xpZGVyX19hcnJvdy0tbmV4dCcsXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcubS1zbGlkZXJfX2Fycm93LS1wcmV2JyxcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIHNwZWVkOiA3MDAsXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICBcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICBjdXN0b21QYWdpbmc6IGZ1bmN0aW9uKHNsaWRlciwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICsgMSArICcvJyArIHNsaWRlci5zbGlkZUNvdW50O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFwcGVuZERvdHM6ICcuaGVyb19fc2xpZGVyIC5tLXNsaWRlcl9fZG90cycsXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59KTtcbiJdfQ==
