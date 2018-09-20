var main;

if (typeof browser !== 'undefined') {
    main = browser;
} else if (typeof chrome !== 'undefined') {
    main = chrome;
}

var elements = document.querySelectorAll('[data-i18n]');
console.log(elements);
for(i = 0; i < elements.length; i++) {
    elements[i].innerHTML = main.i18n.getMessage(elements[i].dataset.i18n);
}
