const axios = require('axios');
import axiosInstance from "../axiosInstance";

async function getAgreement(userId,onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`UserAgreement/${userId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getCurrentUserAgreement(onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`UserAgreement/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}


async function acceptPolicyConditionsAgreement(request, onApiOkResultCallback, onApiKoResultCallback ){
    await axiosInstance.post(`UserAgreement/acceptAgreement`, request)
    .then(response => {
        onApiOkResultCallback(response.data);
    })
    .catch(error => {
        onApiKoResultCallback(error);
    });
}

async function acceptEmergencyAlert(request, onApiOkResultCallback, onApiKoResultCallback ){
    await axiosInstance.put(`UserAgreement/acceptEmergencyAlert`, request)
    .then(response => {
        onApiOkResultCallback(response.data);
    })
    .catch(error => {
        onApiKoResultCallback(error);
    });
}

export{
    getAgreement,
    acceptPolicyConditionsAgreement,
    acceptEmergencyAlert,
    getCurrentUserAgreement
}