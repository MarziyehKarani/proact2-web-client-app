const axios = require('axios');

async function getAgreement(userId,onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`UserAgreement/${userId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getCurrentUserAgreement(onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`UserAgreement/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}


async function acceptPolicyConditionsAgreement(request, onApiOkResultCallback, onApiKoResultCallback ){
    console.log(request);
    await axios.post(`UserAgreement/acceptAgreement`, request)
    .then(response => {
        onApiOkResultCallback(response.data);
    })
    .catch(error => {
        console.log(error);
        console.log('Error response:', error.response);
        onApiKoResultCallback(error);
    });
}

async function acceptEmergencyAlert(request, onApiOkResultCallback, onApiKoResultCallback ){
    await axios.put(`UserAgreement/acceptEmergencyAlert`, request)
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