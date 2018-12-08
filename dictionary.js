document.body.addEventListener('click', function (event) {
    let element = event.target;
    if (element.classList.contains('one-click') ||
        (element.tagName === 'A' && !element.classList.contains('cc-dismiss'))) {
        event.preventDefault();
        event.stopPropagation();
    }
}, true);
