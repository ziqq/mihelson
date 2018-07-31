//Slick Slider https://kenwheeler.github.io/slick/
if ($('.js-hero-slider').length > 0) {
    $('.js-hero-slider').slick({
        nextArrow: '.m-slider__arrow--next',
        prevArrow: '.m-slider__arrow--prev',
        arrows: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 700,
        autoplaySpeed: 5000,
        dots: true,

        dots: true,
        customPaging: function(slider, i) {
            return i + 1 + '/' + slider.slideCount;
        },
        appendDots: '.hero__slider .m-slider__dots',
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
