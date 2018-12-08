function translatePage() {
    let elements = document.querySelectorAll('[data-i18n]');

    for(let i = 0; i < elements.length; i++) {
        let message = browser.i18n.getMessage(elements[i].dataset.i18n);
        if (message) {
            elements[i].innerHTML = message;
        }
    }
}

translatePage();
