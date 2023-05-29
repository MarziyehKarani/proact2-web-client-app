const axios = require('axios');

async function getInstitute(onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Institutes/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getInstitute;