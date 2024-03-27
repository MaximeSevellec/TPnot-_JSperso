export function addParamsToURL(params) {
    const urlParams = new URLSearchParams(window.location.search);
    for (const key of Object.keys(params)) {
        urlParams.delete(key);
    }
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