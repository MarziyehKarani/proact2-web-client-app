const axios = require('axios');
import axiosInstance from "../axiosInstance";

async function getAttachmentSasUriApi(messageId, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`Attachments/${messageId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function addAttachmentToMessage(attachment, messageId, attachmentType, onApiOkResultCallback, onApiKoResultCallback) {
    const formData = new FormData();
    formData.append("mediaFile", attachment);

    await axiosInstance.post(`Attachments/${messageId}/${attachmentType}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    .then(response => {
        onApiOkResultCallback(response.data);
    })
    .catch(error => {
        onApiKoResultCallback(error);
    });
}

async function addVideoAttachmentToMessage(attachment, messageId, attachmentType,width,height, onApiOkResultCallback, onApiKoResultCallback) {
    const formData = new FormData();
    formData.append("mediaFile", attachment);

    console.log("width", width);
    console.log("height", height);
        // Append the width and height
        formData.append("width", width);
        formData.append("height", height);

    await axiosInstance.post(`Attachments/${messageId}/${attachmentType}`, formData, {
       /*  headers: {
            "Content-Type": "multipart/form-data"
        } */
    })
    .then(response => {
        onApiOkResultCallback(response.data);
    })
    .catch(error => {
        onApiKoResultCallback(error);
    });
}

export {
    getAttachmentSasUriApi,
    addAttachmentToMessage,
    addVideoAttachmentToMessage
};