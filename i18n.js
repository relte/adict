let main;

if (typeof browser !== 'undefined') {
    main = browser;
} else if (typeof chrome !== 'undefined') {
    main = chrome;
}

let elements = document.querySelectorAll('[data-i18n]');
for(let i = 0; i < elements.length; i++) {
    elements[i].innerHTML = main.i18n.getMessage(elements[i].dataset.i18n);
}
