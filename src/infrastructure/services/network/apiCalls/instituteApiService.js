const axios = require('axios');
import axiosInstance from "../axiosInstance";

async function getInstitute(onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`Institutes/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getInstitute;