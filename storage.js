function getStorageElement(name, callback) {
    browser.storage.local.get(name).then(callback);
}

function setStorageElement(values, callback) {
    browser.storage.local.set(values).then(callback);
}
