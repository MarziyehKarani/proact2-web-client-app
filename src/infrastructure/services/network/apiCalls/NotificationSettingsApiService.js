const axios = require('axios');


async function getNotificationSetting(onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`PushNotifications/Settings`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}


async function setNotificationSetting(request, onApiOkResultCallback, onApiKoResultCallback ){
    console.log(request);
    await axios.post(`PushNotifications/setNotification`, request)
    .then(response => {
        onApiOkResultCallback(response.data);
    })
    .catch(error => {
        onApiKoResultCallback(error);
    });
}

async function setRangeNotificationSetting(request, onApiOkResultCallback, onApiKoResultCallback ){
    await axios.put(`PushNotifications/SetRange`, request)
    .then(response => {
        onApiOkResultCallback(response.data);
    })
    .catch(error => {
        onApiKoResultCallback(error);
    });
}

async function resetNotificationSetting(request, onApiOkResultCallback, onApiKoResultCallback ){
    await axios.put(`PushNotifications/reset`, request)
    .then(response => {
        onApiOkResultCallback(response.data);
    })
    .catch(error => {
        onApiKoResultCallback(error);
    });
}


export {
    getNotificationSetting, 
    setNotificationSetting, 
    setRangeNotificationSetting, 
    resetNotificationSetting
} 