const axios = require('axios');

async function getProtocols(onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Protocols/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getProtocols;