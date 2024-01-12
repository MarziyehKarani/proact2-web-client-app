const axios = require('axios');

async function getPatients(medicalTeamId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Patient/${medicalTeamId}`)
        .then(response => {
            console.log(response.data);
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            console.log(error);
            onApiKoResultCallback(error);
        });
}

export default getPatients;