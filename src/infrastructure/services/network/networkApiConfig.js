import axios from "axios";

function getDevEvironment() {
     //return "https://devproactservices.azurewebsites.net/api";
     return "https://devetproactservices.azurewebsites.net/api";
}

//   function getDevEvironment() {
//  	return "https://localhost:44378/api";
//  } 

function getProdEnvironment() {
    return "https://prodproactservices.azurewebsites.net/api";
}

export function setupApiConfiguration(languageTag) {
    var environmentBaseUrl = getDevEvironment();
    axios.defaults.baseURL = `${environmentBaseUrl}/${languageTag}/`;
}

export function setApiAuthToken(authToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}