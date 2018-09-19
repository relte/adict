function getStorageElement(name, callback) {
    if (typeof browser !== 'undefined') {
        browser.storage.local.get(name).then(callback);
    } else if (typeof chrome !== 'undefined') {
        chrome.storage.local.get(name, callback);
    }
}

function setStorageElement(values, callback) {
    if (typeof browser !== 'undefined') {
        browser.storage.local.set(values).then(callback);
    } else if (typeof chrome !== 'undefined') {
        chrome.storage.local.set(values, callback);
    }
}
