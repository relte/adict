document.addEventListener('click', function (event) {
    var selectedText = window.getSelection().toString();
    if (selectedText && event.altKey) {
        removePopup();

        getStorageElement('dictionaryUrl', function (data) {
            showPopup(data.dictionaryUrl, selectedText, event);
        });
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

    url = url.replace('%phrase%', phrase);

    var anchor = createAnchor(url);

    popup.appendChild(createIframe(url, spinner, anchor));
    popup.appendChild(anchor);

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

function createAnchor(url) {
    var anchor = document.createElement('a');
    var href = url.replace('addon=true', 'addon=false');
    anchor.href = href;
    anchor.text = href;
    anchor.target = '_blank';
    anchor.style.display = 'none';
    return anchor;
}

function createIframe(url, spinner, anchor) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', url);
    iframe.addEventListener('load', onIframeLoad(spinner, anchor));
    iframe.style.display = 'none';

    return iframe;
}

function onIframeLoad(spinner, anchor) {
    return function () {
        var iframe = this;
        spinner.remove();
        iframe.style.display = 'block';
        anchor.style.display = 'inline-block';
    }
}

function removePopup() {
    var popup = document.getElementById('dictionary-popup');
    if (popup) {
        popup.remove();
    }
}
