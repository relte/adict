function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

if (inIframe()) {
    let url = new URL(window.location);
    let params = new URLSearchParams(url.search);
    if (!params.has('addon')) {
        params.set('addon', 'true');
        url.search = params.toString();
        window.location = url.toString();
    }
}
