//Price Slider
if ($('.js-calculator').length > 0) {
    let profit = $('.js-calculator-profit');
    let result = $('.js-calculator-result');
    let profitData = profit.data('profit');

    let sliderSum = document.getElementById('calculator-sum');
    let sliderSumBox = $('#calculator-sum-price');

    let sliderStatus = document.getElementById('calculator-status');
    let sliderStatusBox = $('#calculator-status-vall');

    let calculatorItem = $('.calculator-item');
    let calculatorItemOpt = $('.calculator-item--opt');
    let calculatorItemDiler = $('.calculator-item--diler');
    let calculatorItemDilerPlus = $('.calculator-item--dilerplus');

    calculatorItem.not('.calculator-item--opt').css('display', 'none');

    let rangeSum = [
        '0',
        '50000',
        '100000',
        '300000',
        '500000',
        '700000',
        '900000',
        '1000000'
    ];

    let rangeStatus = ['Оптовик', 'Оптовик', 'Дилер', 'Дилер +'];

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

    sliderSum.noUiSlider.on('update', function(values, handle) {
        let profitData = profit.attr('data-profit');

        sliderSumBox.text(rangeSum[values[handle]]);
        result.text((rangeSum[values[handle]] * profitData) / 100);

        if (rangeSum[values[handle]] < '500000') {
            sliderStatus.noUiSlider.set(1);
            result.text((rangeSum[values[handle]] * profitData) / 100);
            calculatorItem.css('display', 'none');
            calculatorItemOpt.removeAttr('style');
        } else if (
            rangeSum[values[handle]] >= '500000' &&
            rangeSum[values[handle]] <= '900000'
        ) {
            sliderStatus.noUiSlider.set(2);
            result.text((rangeSum[values[handle]] * profitData) / 100);
            calculatorItem.css('display', 'none');
            calculatorItemDiler.removeAttr('style');
        } else {
            sliderStatus.noUiSlider.set(3);
            result.text((rangeSum[values[handle]] * profitData) / 100);
            calculatorItem.css('display', 'none');
            calculatorItemDilerPlus.removeAttr('style');
        }
        if (rangeSum[values[handle]] === '1000000') {
            sliderStatus.noUiSlider.set(3);
            result.text((rangeSum[values[handle]] * 30) / 100);
            calculatorItem.css('display', 'none');
            calculatorItemDilerPlus.removeAttr('style');
        }
    });

    sliderStatus.noUiSlider.on('update', function(values, handle) {
        sliderStatusBox.text(rangeStatus[values[handle]]);

        if (rangeStatus[values[handle]] === 'Дилер') {
            profit.attr('data-profit', '25');
            profit.text('25%');
            result.text((rangeSum[values[handle]] * profitData) / 100);
        } else if (rangeStatus[values[handle]] === 'Дилер +') {
            profit.text('30%');
            profit.attr('data-profit', '30');
            result.text((rangeSum[values[handle]] * profitData) / 100);
        } else {
            profit.text('20%');
            profit.attr('data-profit', '20');
            result.text((rangeSum[values[handle]] * profitData) / 100);
        }
    });
}
