browser.runtime.onInstalled.addListener(details => {
    if (details.reason === 'update') {
        onUpdate();
    } else if (details.reason === 'install') {
        onInstall();
    }
});

function onUpdate() {
    browser.tabs.create({
        url: 'update_page/update_page.html'
    });
}

function onInstall() {
    storage.set({
        dictionaryUrl: 'https://www.dictionary.com/browse/%phrase%?s=t&addon=true'
    });
}

browser.webRequest.onBeforeRequest.addListener(
    blockRequest,
    {
        urls: [
            "*://js-sec.indexww.com/*",
            "*://*.amazon-adsystem.com/*",
            "*://cdn.heapanalytics.com/*",
            "*://*.google.com/*",
            "*://*.google.pl/*",
            "*://*.googletagservices.com/*",
            "*://*.google-analytics.com/*",
            "*://*.googletagmanager.com/*",
            "*://*.googlesyndication.com/*",
            "*://*.facebook.com/*",
            "*://*.facebook.net/*",
            "*://*.quantserve.com/*",
            "*://*.pubmatic.com/*",
            "*://*.bounceexchange.com/*"
        ]
    },
    ['blocking']
);

function blockRequest(requestDetails) {
    let merriamWebsterPattern = new RegExp(/.*merriam-webster\.com.*addon=true.*/);
    let dictionaryComPattern = new RegExp(/.*dictionary\.com.*addon=true.*/);
    let dikiPattern = new RegExp(/.*diki\.pl.*addon=true.*/);
    if (requestDetails.originUrl.match(merriamWebsterPattern) ||
        requestDetails.originUrl.match(dictionaryComPattern) ||
        requestDetails.originUrl.match(dikiPattern)
    ) {
        return {cancel: true};
    }
}
