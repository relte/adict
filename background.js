browser.runtime.onInstalled.addListener(details => {
    if (details.reason === 'update') {
        onUpdate();
    } else if (details.reason === 'install') {
        onInstall();
    }
});

function onUpdate() {
    //todo: remove setting defaults in the next release
    setDefaults();
    browser.tabs.create({
        url: 'update_page/update_page.html'
    });
}

function onInstall() {
    setDefaults();
}

function setDefaults() {
    storage.set({
        dictionaryName: 'dictionary_com',
        dictionaryUrl: 'https://www.dictionary.com/browse/%phrase%?s=t&addon=true',
        enableButtonTrigger: false
    });
}

browser.webRequest.onHeadersReceived.addListener(
    changeHeaders,
    {
        urls: [
            "https://www.dictionary.com/*",
            "https://www.merriam-webster.com/*",
            "https://www.diki.pl/*",
            "https://*.bab.la/*"
        ],
        types: ['sub_frame']
    },
    ['blocking', 'responseHeaders']
);

function changeHeaders(details) {
    for (let header of details.responseHeaders) {
        if (header.name.toLowerCase() === "x-frame-options") {
            header.value = "ALLOW";
        }
    }

    return {responseHeaders: details.responseHeaders};
}

browser.webRequest.onBeforeRequest.addListener(
    blockScripts,
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
            "*://*.bounceexchange.com/*",
            "*://*.onetrust.com/*"
        ]
    },
    ['blocking']
);

function blockScripts(details) {
    let dictionaryPattern = new RegExp(/.*addon=true.*/);
    if (details.originUrl && details.originUrl.match(dictionaryPattern)) {
        return {cancel: true};
    }
}
