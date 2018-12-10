class Storage {
    get(name, callback) {
        browser.storage.local.get(name).then(callback);
    }

    set(values, callback) {
        browser.storage.local.set(values).then(callback);
    }

    setIfUndefined(values) {
        for (let key in values) {
            this.get(key, data => {
                if (!data[key]) {
                    browser.storage.local.set({[key]: values[key]});
                }
            });
        }
    }
}

const storage = new Storage();
