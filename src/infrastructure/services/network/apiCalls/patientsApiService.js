const axios = require('axios');
import axiosInstance from "../axiosInstance";

async function getPatients(medicalTeamId, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`Patient/${medicalTeamId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getPatients;