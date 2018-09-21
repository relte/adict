browser.runtime.onInstalled.addListener(details => {
    if (details.reason === 'update') {
        browser.tabs.create({
            url: 'update_page/update_page.html'
        });
    } else if (details.reason === 'install') {
        storage.set({
            dictionaryUrl: 'https://www.dictionary.com/browse/%phrase%?s=t&addon=true'
        });
    }
});

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
    let merriamWebsterExp = new RegExp(/.*merriam-webster\.com.*addon=true.*/);
    let dictionaryComExp = new RegExp(/.*dictionary\.com.*addon=true.*/);
    let dikiExp = new RegExp(/.*diki\.pl.*addon=true.*/);
    if (requestDetails.originUrl.match(merriamWebsterExp) ||
        requestDetails.originUrl.match(dictionaryComExp) ||
        requestDetails.originUrl.match(dikiExp)
    ) {
        console.log(requestDetails.url);
        return {cancel: true};
    }
}
