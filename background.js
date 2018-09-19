browser.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'update') {
        browser.tabs.create({
            url: 'update_page/update_page.html'
        });
    } else if (details.reason === 'install') {
        browser.storage.local.set({
            dictionaryUrl: 'https://www.dictionary.com/browse/%phrase%?s=t&addon=true'
        });
    }
});
