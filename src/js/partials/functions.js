//Function btnPulse
function btnPulse() {
    if ($('.js-btn-pulse')) {
        var button = document.getElementsByClassName('js-btn-pulse');
        var buttonR = document.getElementsByClassName('js-btn-pulse--reset');
        var forEach = Array.prototype.forEach;

        forEach.call(button, function(b) {
            b.addEventListener('click', addElement);
        });

        forEach.call(buttonR, function(b) {
            b.addEventListener('click', addElement);
        });

        function addElement(e) {
            var addDiv = document.createElement('div'),
                mValue = Math.max(this.clientWidth, this.clientHeight),
                rect = this.getBoundingClientRect(),
                styleDiv = addDiv.style,
                px = 'px';

            styleDiv.width = styleDiv.height = mValue + px;
            styleDiv.left = e.clientX - rect.left - mValue / 2 + px;
            styleDiv.top = e.clientY - rect.top - mValue / 2 + px;

            addDiv.classList.add('button__pulse');

            this.appendChild(addDiv);

            setTimeout(function() {
                addDiv.remove();
            }, 2000);
        }
    }
}

//PushUp
function pushUp(text) {
    var text = text || 'Вам новая заявка';
    var pushContainer = $('<div>').addClass('bb-pushUp');
    var pushUpClose = $('<i class="fa fa-times"></i>').addClass(
        'bb-pushUp__close js-pushUp--close'
    );
    pushContainer.appendTo($('body'));
    pushContainer.text(text);
    pushUpClose.appendTo(pushContainer);

    raf(function() {
        pushContainer.addClass('is-active');
    });

    setTimeout(function() {
        pushContainer.removeClass('is-active');
    }, 3500);

    setTimeout(function() {
        pushContainer.remove();
    }, 4000);

    $(document).on('click', '.js-pushUp--close', function() {
        pushContainer.removeClass('is-active');
        setTimeout(function() {
            pushContainer.remove();
        }, 300);
    });
}

//RequestAnimationFrame
function raf(fn) {
    window.requestAnimationFrame(function() {
        window.requestAnimationFrame(function() {
            fn();
        });
    });
}
