browser.storage.local.get('dictionaryUrl')
    .then(function (data) {
        var element = document.querySelector('li[data-url="' + data.dictionaryUrl + '"');
        setActiveDictionary(element);
    });

document.addEventListener('click', function (event) {
    if (!event.target.matches('li')) {
        return;
    }

    setActiveDictionary(event.target);

    browser.storage.local.set({
        dictionaryUrl: event.target.getAttribute('data-url')
    });
});

function setActiveDictionary(element) {
    var parent = element.parentNode;
    var elements = parent.querySelectorAll('li');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('active');
    }

    element.classList.add('active');
}
