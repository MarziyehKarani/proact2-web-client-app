const axios = require('axios');
import axiosInstance from "../axiosInstance";

async function getProtocols(onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`Protocols/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getProtocols;