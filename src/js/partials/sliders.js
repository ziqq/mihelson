//Slick Slider https://kenwheeler.github.io/slick/
if ($('.js-hero-slider').length > 0) {
    $('.js-hero-slider').slick({
        arrows: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 700,
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
                    dots: false
                }
            }
        ]
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
                dots: false
            }
        }
    ]
};

if ($('.js-slider').length > 0) {
    $('.js-slider').slick({
        infoSliderSettings
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
        customPaging: function(slider, i) {
            return i + 1 + '/' + slider.slideCount;
        },
        responsive: [
            {
                breakpoint: 481,
                settings: {
                    dots: false
                }
            }
        ]
    });
}
