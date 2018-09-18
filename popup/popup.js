document.addEventListener('click', function (event) {
    var selectedText = window.getSelection().toString();
    if (selectedText && event.ctrlKey) {
        removePopup();

        browser.storage.local.get('dictionaryUrl')
            .then(function (data) {
                showPopup(data.dictionaryUrl, selectedText, event);
            })
            .catch(function (data) {
                console.log(data);
            })
        ;
    } else if (!event.target.closest('#dictionary-popup')) {
        removePopup();
    }
});

function showPopup(url, phrase, clickEvent) {
    var popup = document.createElement('div');
    popup.setAttribute('id', 'dictionary-popup');

    popup.style.top = intToPx(clickEvent.pageY + 15);
    popup.style.left = intToPx(clickEvent.pageX);
    preventOverflow(popup, clickEvent.pageX);

    var spinner = createSpinner(popup);
    popup.appendChild(spinner);

    popup.appendChild(createIframe(url, phrase, spinner));

    document.body.appendChild(popup);
}

function intToPx(number) {
    return number + 'px';
}

function preventOverflow(popup, pageX) {
    var rightOverflow = 520 - (window.innerWidth - pageX);
    if (rightOverflow > 0) {
        popup.style.left = intToPx(pageX - rightOverflow);
    }
}

function createSpinner() {
    var spinner = document.createElement('div');
    spinner.classList.add('spinner');

    return spinner;
}

function createIframe(url, phrase, spinner) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', url.replace('%phrase%', phrase));
    iframe.addEventListener('load', getRemoveElementFunction(spinner));
    iframe.style.display = 'none';

    return iframe;
}

function getRemoveElementFunction(element) {
    return function () {
        element.remove();
        this.style.display = 'block';
    }
}

function removePopup() {
    var popup = document.getElementById('dictionary-popup');
    if (popup) {
        popup.remove();
    }
}
