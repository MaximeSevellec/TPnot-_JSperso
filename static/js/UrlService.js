export function addParamsToURL(params) {
    clearURLParams();
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(params)) {
        urlParams.set(key, value);
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
}

export function readParamsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }
    return params;
}

export function clearURLParams() {
    window.history.replaceState({}, '', `${window.location.pathname}`);
}