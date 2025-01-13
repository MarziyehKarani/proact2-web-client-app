const axios = require('axios');
import axiosInstance from "../axiosInstance";

async function getNotificationSetting(onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`PushNotifications/Settings`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}


async function setNotificationSetting(request, onApiOkResultCallback, onApiKoResultCallback ){
    await axiosInstance.post(`PushNotifications/setNotification`, request)
    .then(response => {
        onApiOkResultCallback(response.data);
    })
    .catch(error => {
        onApiKoResultCallback(error);
    });
}

async function setRangeNotificationSetting(request, onApiOkResultCallback, onApiKoResultCallback ){
    await axiosInstance.put(`PushNotifications/SetRange`, request)
    .then(response => {
        onApiOkResultCallback(response.data);
    })
    .catch(error => {
        onApiKoResultCallback(error);
    });
}

async function resetNotificationSetting(request, onApiOkResultCallback, onApiKoResultCallback ){
    await axiosInstance.put(`PushNotifications/reset`, request)
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