class Storage {
    get(name, callback) {
        browser.storage.local.get(name).then(callback);
    }

    set(values, callback) {
        browser.storage.local.set(values).then(callback);
    }
}

const storage = new Storage();
