const axios = require('axios');

async function getAttachmentSasUriApi(messageId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Attachments/${messageId}`)
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

    await axios.post(`Attachments/${messageId}/${attachmentType}`, formData, {
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

export {
    getAttachmentSasUriApi,
    addAttachmentToMessage
};