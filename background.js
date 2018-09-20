browser.runtime.onInstalled.addListener(details => {
    if (details.reason === 'update') {
        main.tabs.create({
            url: 'update_page/update_page.html'
        });
    } else if (details.reason === 'install') {
        setStorageElement({
            dictionaryUrl: 'https://www.dictionary.com/browse/%phrase%?s=t&addon=true'
        });
    }
});
