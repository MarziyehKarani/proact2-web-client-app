const axios = require('axios');

async function getPatients(medicalTeamId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Patient/${medicalTeamId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getPatients;