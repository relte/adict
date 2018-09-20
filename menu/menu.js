getStorageElement('dictionaryUrl', data => {
    let element = document.querySelector('li[data-url="' + data.dictionaryUrl + '"');
    setActiveDictionary(element);
});

document.addEventListener('click', event => {
    if (!event.target.matches('li')) {
        return;
    }

    setActiveDictionary(event.target);
    setStorageElement({
        dictionaryUrl: event.target.getAttribute('data-url')
    });
});

function setActiveDictionary(element) {
    let parent = element.parentNode;
    let elements = parent.querySelectorAll('li');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('active');
    }

    element.classList.add('active');
}
