export function addParamsToURL(params) {
    /**
     * Ajoute des paramètres à l'URL.
     * @param {Object} params - Les paramètres à ajouter.
     */
    clearURLParams();
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(params)) {
        urlParams.set(key, value);
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
}

export function readParamsFromURL() {
    /**
     * Récupère les paramètres de l'URL.
     */
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }
    return params;
}

export function clearURLParams() {
    /**
     * Supprime les paramètres de l'URL.
     */
    window.history.replaceState({}, '', `${window.location.pathname}`);
}