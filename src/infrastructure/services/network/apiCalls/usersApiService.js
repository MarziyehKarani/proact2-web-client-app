const axios = require('axios');
import axiosInstance from "../axiosInstance";

async function getCurrentUserDetails( onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`Users/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getCurrentUserDetails;