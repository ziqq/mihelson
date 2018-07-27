'use strict';

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

    //GetNiceScroll https://github.com/inuyaksa/jquery.nicescroll
    var scrollBar = $('.js-scroll');
    if (scrollBar.length > 0) {
        scrollBar.niceScroll({
            cursorcolor: '#e0e0e0',
            horizrailenabled: false,
            // autohidemode: false,
            boxzoom: false,
            verge: 500,
            cursorwidth: '4px',
            cursorborder: 'none',
            cursorborderradius: '0'
        });
        scrollBar.mouseover(function () {
            $(this).getNiceScroll().resize();
        });
    }
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
            if ($(this).val() !== '') {
                var hint = $(this).closest('.js-search').find('.search__hint');
                hint.removeAttr('style');
            } else {
                hint.css('display', 'none');
            }
        });

        searchInput.on('blur', function () {
            var hint = $(this).closest('.js-search').find('.search__hint');
            hint.css('display', 'none');
        });
    }

    //Masked inputmask https://github.com/RobinHerbots/Inputmask
    if ($('.js-phone-mask').length > 0) {
        $('.js-phone-mask').inputmask({
            mask: '+7 (999) 999-99-99',
            clearIncomplete: true
        });
    }

    //Stop drag
    $('img').on('dragstart', function (event) {
        event.preventDefault();
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwib24iLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInNjcm9sbEJhciIsImxlbmd0aCIsIm5pY2VTY3JvbGwiLCJjdXJzb3Jjb2xvciIsImhvcml6cmFpbGVuYWJsZWQiLCJib3h6b29tIiwidmVyZ2UiLCJjdXJzb3J3aWR0aCIsImN1cnNvcmJvcmRlciIsImN1cnNvcmJvcmRlcnJhZGl1cyIsIm1vdXNlb3ZlciIsImdldE5pY2VTY3JvbGwiLCJyZXNpemUiLCJkb2N1bWVudCIsInJlYWR5IiwiaGFzQ2xhc3MiLCJmYWRlT3V0IiwicmVtb3ZlQXR0ciIsImZhZGVJbiIsImNzcyIsInBhcmVudCIsImZpbmQiLCJjbG9zZXN0Iiwic2VhcmNoSW5wdXQiLCJoaW50IiwidmFsIiwiaW5wdXRtYXNrIiwibWFzayIsImNsZWFySW5jb21wbGV0ZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiXSwibWFwcGluZ3MiOiI7O0FBQUE7OztBQUdBQSxFQUFFQyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQVc7QUFDNUIsUUFDSSw2Q0FBNkNDLElBQTdDLENBQWtEQyxVQUFVQyxTQUE1RCxDQURKLEVBRUU7QUFDRUwsVUFBRSxNQUFGLEVBQVVNLFFBQVYsQ0FBbUIsS0FBbkI7QUFDSCxLQUpELE1BSU87QUFDSE4sVUFBRSxNQUFGLEVBQVVNLFFBQVYsQ0FBbUIsS0FBbkI7QUFDSDs7QUFFRE4sTUFBRSxNQUFGLEVBQVVPLFdBQVYsQ0FBc0IsU0FBdEI7O0FBRUE7QUFDQSxRQUFJQyxZQUFZUixFQUFFLFlBQUYsQ0FBaEI7QUFDQSxRQUFJUSxVQUFVQyxNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3RCRCxrQkFBVUUsVUFBVixDQUFxQjtBQUNqQkMseUJBQWEsU0FESTtBQUVqQkMsOEJBQWtCLEtBRkQ7QUFHakI7QUFDQUMscUJBQVMsS0FKUTtB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QjtBQUMxQkMsa0JBQU0sb0JBRG9CO0FBRTFCQyw2QkFBaUI7QUFGUyxTQUE5QjtBQUlIOztBQUVEO0FBQ0FwQyxNQUFFLEtBQUYsRUFBU0UsRUFBVCxDQUFZLFdBQVosRUFBeUIsVUFBU21DLEtBQVQsRUFBZ0I7QUFDckNBLGNBQU1DLGNBQU47QUFDSCxLQUZEO0FBR0gsQ0EvRUQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgKiBiYXNlLmpzXG4qL1xuJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKFxuICAgICAgICAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgKSB7XG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaW9zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCd3ZWInKTtcbiAgICB9XG5cbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcblxuICAgIC8vR2V0TmljZVNjcm9sbCBodHRwczovL2dpdGh1Yi5jb20vaW51eWFrc2EvanF1ZXJ5Lm5pY2VzY3JvbGxcbiAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xuICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoID4gMCkge1xuICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XG4gICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyNlMGUwZTAnLFxuICAgICAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXG4gICAgICAgICAgICB2ZXJnZTogNTAwLFxuICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICc0cHgnLFxuICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcwJ1xuICAgICAgICB9KTtcbiAgICAgICAgc2Nyb2xsQmFyLm1vdXNlb3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXG4gICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvKlxuICAgICogaGVhZGVyLmpzXG4gICAgKi9cbiAgICAvL0hlYWRlciBoYW1idXJnZXJcbiAgICAkKCcuanMtbmF2LXRvZ2dsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAkKCcuanMtbmF2JykuZmFkZU91dCgpO1xuICAgICAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAkKCcuanMtbmF2JykuZmFkZUluKCk7XG4gICAgICAgICAgICAkKCdodG1sJykuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgXG4gICAgLy9Nb2JpbGUgbWVudSBzdWJuYXYgdG9nZ2xlXG4gICAgJCgnLmpzLW1vYmlsZS1uYXYtc3ViLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgLmZpbmQoJy5tb2JpbGUtbmF2LS1zdWInKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgfSk7XG4gICAgXG4gICAgJCgnLmpzLW1vYmlsZS1uYXYtc3ViLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY2xvc2VzdCgnLm1vYmlsZS1uYXYtLXN1YicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICB9KTtcbiAgICBcbiAgICAvL01vYmlsZSBTZWFyY2hcbiAgICBpZiAoJCgnLmpzLXNlYXJjaC1pbnB1dCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHNlYXJjaElucHV0ID0gJCgnLmpzLXNlYXJjaC1pbnB1dCcpO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgaGludC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XG4gICAgICAgICAgICAgICAgaGludC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzZWFyY2hJbnB1dC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhpbnQgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XG4gICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OScsXG4gICAgICAgICAgICBjbGVhckluY29tcGxldGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9TdG9wIGRyYWdcbiAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbn0pO1xuIl19
