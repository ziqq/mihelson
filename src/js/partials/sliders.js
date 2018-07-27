//Slick Slider https://kenwheeler.github.io/slick/
if ($('.js-bb-slider').length > 0) {
    $('.js-bb-slider').slick({
        nextArrow: '.bb-slider__arrow--next',
        prevArrow: '.bb-slider__arrow--prev',
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 1000,
        autoplaySpeed: 5000,
        autoplay: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}
