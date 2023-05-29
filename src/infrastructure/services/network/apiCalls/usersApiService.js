const axios = require('axios');

async function getCurrentUserDetails( onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Users/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export default getCurrentUserDetails;