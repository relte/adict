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
    let dictionaryPattern = new RegExp(/.*addon=true.*/);
    if (requestDetails.originUrl.match(dictionaryPattern)) {
        console.log(requestDetails.originUrl);
        return {cancel: true};
    }
}
