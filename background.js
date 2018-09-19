browser.storage.local.get('dictionaryUrl')
    .then(function (data) {
        if (typeof data.dictionaryUrl === 'undefined') {
            browser.storage.local.set({
                dictionaryUrl: 'https://www.dictionary.com/browse/%phrase%?s=t&addon=true'
            });
        }
    })
;

browser.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'update') {
        browser.tabs.create({
            url: 'update_page/update_page.html'
        });
    }
});
