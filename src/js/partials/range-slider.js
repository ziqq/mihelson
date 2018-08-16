//Price Slider
if ($('.js-calculator').length > 0) {
    let profit = $('.js-calculator-profit');
    let result = $('.js-calculator-result');
    let btn = $('.js-calculator-btn');
    let profitData = profit.data('profit');

    let sliderSum = document.getElementById('calculator-sum');
    let sliderSumBox = $('#calculator-sum-price');

    let sliderStatus = document.getElementById('calculator-status');
    let sliderStatusBox = $('#calculator-status-vall');

    let calculatorItem = $('.calculator-item');
    let calculatorItemOpt = $('.calculator-item--opt');
    let calculatorItemDiler = $('.calculator-item--diler');
    let calculatorItemDilerPlus = $('.calculator-item--dilerplus');

    let rangeSum = [
        '50000',
        '100000',
        '300000',
        '500000',
        '700000',
        '900000',
        '1000000'
    ];

    let rangeStatus = ['Оптовик', 'Дилер', 'Дилер +'];

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

    sliderSum.noUiSlider.on('update', function(values, handle) {
        var profitData = profit.attr('data-profit');

        sliderSumBox.text(rangeSum[values[handle]]);
        result.text((rangeSum[values[handle]] * profitData) / 100);

        if (
            rangeSum[values[handle]] === '50000' ||
            rangeSum[values[handle]] < '500000'
        ) {
            sliderStatus.noUiSlider.set(0);
            result.text((rangeSum[values[handle]] * 20) / 100);
            profit.text('20%');
            profit.attr('data-profit', '20');
            btn.text('Стать оптовиком');

            if (calculatorItemOpt.hasClass('is-hidden')) {
                calculatorItem
                    .addClass('is-hidden')
                    .removeClass('wow fadeInUp');
                calculatorItemOpt
                    .removeClass('is-hidden')
                    .addClass('wow fadeInUp');
                new WOW().init();
            }
        } else if (
            rangeSum[values[handle]] === '500000' ||
            rangeSum[values[handle]] <= '900000' ||
            rangeSum[values[handle]] === '900000'
        ) {
            sliderStatus.noUiSlider.set(1);
            result.text((rangeSum[values[handle]] * 25) / 100);
            profit.attr('data-profit', '25');
            profit.text('25%');
            btn.text('Стать дилером');

            if (calculatorItemDiler.hasClass('is-hidden')) {
                calculatorItem
                    .addClass('is-hidden')
                    .removeClass('wow fadeInUp');
                calculatorItemDiler
                    .removeClass('is-hidden')
                    .addClass('wow fadeInUp');
                new WOW().init();
            }
        } else if (rangeSum[values[handle]] === '100000') {
            sliderStatus.noUiSlider.set(2);
            result.text((rangeSum[values[handle]] * 30) / 100);
            profit.text('30%');
            profit.attr('data-profit', '30');
            btn.text('Стать дилером +');

            if (calculatorItemDilerPlus.hasClass('is-hidden')) {
                calculatorItem
                    .addClass('is-hidden')
                    .removeClass('wow fadeInUp');
                calculatorItemDilerPlus
                    .removeClass('is-hidden')
                    .addClass('wow fadeInUp');
                new WOW().init();
            }
        }
        if (rangeSum[values[handle]] === '1000000') {
            sliderStatus.noUiSlider.set(2);
            result.text((rangeSum[values[handle]] * 30) / 100);
            profit.text('30%');
            profit.attr('data-profit', '30');
            btn.text('Стать дилером +');

            if (calculatorItemDilerPlus.hasClass('is-hidden')) {
                calculatorItem
                    .addClass('is-hidden')
                    .removeClass('wow fadeInUp');
                calculatorItemDilerPlus
                    .removeClass('is-hidden')
                    .addClass('wow fadeInUp');
                new WOW().init();
            }
        }
    });

    sliderStatus.noUiSlider.on('update', function(values, handle) {
        sliderStatusBox.text(rangeStatus[values[handle]]);

        // if (rangeStatus[values[handle]] === 'Дилер') {
        //     result.text((rangeSum[values[handle]] * profitData) / 100);

        //     // sliderSum.noUiSlider.set(4);
        // } else if (rangeStatus[values[handle]] === 'Дилер +') {
        //     // sliderSum.noUiSlider.set(7);
        //     result.text((rangeSum[values[handle]] * profitData) / 100);
        // } else {
        //     result.text((rangeSum[values[handle]] * profitData) / 100);
        //     // sliderSum.noUiSlider.set(0);
        // }
    });
}
