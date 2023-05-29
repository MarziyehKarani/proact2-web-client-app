import axios from "axios";

function getDevEvironment() {
    return "https://devproactservices.azurewebsites.net/api";
}

function getProdEnvironment() {
    return "https://prodproactservices.azurewebsites.net/api";
}

export function setupApiConfiguration(languageTag) {
    var environmentBaseUrl = getProdEnvironment();
    axios.defaults.baseURL = `${environmentBaseUrl}/${languageTag}/`;
}

export function setApiAuthToken(authToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}