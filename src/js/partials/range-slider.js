//Price Slider

if ($('#calculator-sum').length > 0) {
    let profit = $('.js-calculator-profit');
    let result = $('.js-calculator-result');

    var sliderSum = document.getElementById('calculator-sum');
    var sliderSumBox = $('#calculator-sum-price');

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

    let range = [
        '0',
        '50000',
        '100000',
        '300000',
        '500000',
        '700000',
        '900000',
        '1000000'
    ];

    sliderSum.noUiSlider.on('update', function(values, handle) {
        let profitData = profit.attr('data-profit');

        sliderSumBox.text(range[values[handle]]);
        result.text((range[values[handle]] * profitData) / 100);
    });
}

if ($('#calculator-status').length > 0) {
    var sliderStatus = document.getElementById('calculator-status');
    var sliderStatusBox = $('#calculator-status-vall');
    let profit = $('.js-calculator-profit');
    let profitData = profit.data('profit');
    let result = $('.js-calculator-result');

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
            max: 4
        }
    });

    let range = ['Оптовик', 'Оптовик', 'Дилер', 'Дилер +', 'Дилер +'];

    sliderStatus.noUiSlider.on('update', function(values, handle) {
        sliderStatusBox.text(range[values[handle]]);

        if (range[values[handle]] === 'Дилер') {
            profit.attr('data-profit', '25');
            profit.text('25%');
        } else if (range[values[handle]] === 'Дилер +') {
            profit.text('30%');
            profit.attr('data-profit', '30');
        } else {
            profit.text('20%');
            profit.attr('data-profit', '20');
        }
    });
}
