document.addEventListener('click', function (event) {
    var selectedText = window.getSelection().toString();
    if (selectedText && event.ctrlKey) {
        removePopup();

        browser.storage.local.get('dictionaryUrl')
            .then(function (data) {
                showPopup(data.dictionaryUrl, selectedText, event);
            })
            .catch(function () {
                console.log('Dictionary not set!');
            })
        ;
    } else if (!event.target.closest('#dictionary-popup')) {
        removePopup();
    }
});

function removePopup() {
    var popup = document.getElementById('dictionary-popup');
    if (popup) {
        popup.remove();
    }
}

function showPopup(url, phrase, clickEvent) {
    var popup = document.createElement('div');
    popup.setAttribute('id', 'dictionary-popup');
    popup.style.top = clickEvent.pageY + 15 + 'px';
    popup.style.left = clickEvent.pageX + 'px';

    var spinner = document.createElement('div');
    spinner.classList.add('lds-dual-ring');
    popup.appendChild(spinner);

    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', url.replace('%phrase%', phrase));
    iframe.addEventListener('load', onIframeLoad);
    iframe.style.display = 'none';

    popup.appendChild(iframe);

    document.body.appendChild(popup);
}

function onIframeLoad() {
    this.style.display = 'block';
}
