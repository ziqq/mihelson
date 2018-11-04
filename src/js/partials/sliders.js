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
    $('.js-hero-slider').each(function() {
        let $slide = $(this).find('.m-slider__slide');
        if ($slide.length > 1) {
            $(this).slick({
                arrows: true,
                infinite: true,
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 400,
                autoplaySpeed: 5000,
                dots: true,
                appendDots: '.hero__slider .m-slider__dots',
                dots: true,
                customPaging: function(slider, i) {
                    return i + 1 + '/' + slider.slideCount;
                },
                responsive: [
                    {
                        breakpoint: 481,
                        settings: {
                            dots: false,
                            arrows: false
                        }
                    }
                ]
            });
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
    responsive: [
        {
            breakpoint: 481,
            settings: {
                dots: false,
                arrows: false
            }
        }
    ]
};

if ($('.js-slider').length) {
    $('.js-slider').each(function() {
        let $slide = $(this).find('.m-slider__slide');
        if ($slide.length > 1) {
            $(this).slick({
                infoSliderSettings
            });
        }
    });
}

if ($('.js-jurnal-slider').length) {
    $('.js-jurnal-slider').each(function() {
        let $slide = $(this).find('.m-slider__slide');
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
                customPaging: function(slider, i) {
                    return i + 1 + '/' + slider.slideCount;
                },
                responsive: [
                    {
                        breakpoint: 481,
                        settings: {
                            dots: false,
                            arrows: false
                        }
                    }
                ]
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
