const axios = require('axios');
import {addAttachmentToMessage} from "./attachmentApiService";
import attachmentType from "../../../../constants/attachmentType";

async function getMessages(projectId, medicalTeamId, pagingCount, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Messages/${projectId}/${medicalTeamId}/${pagingCount}`)
        .then(response => {
            console.log(response.data);
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function createMessage(request, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.post(`Messages/${request.projectId}/${request.medicalTeamId}/create`, request)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function createMessageWithImageAttachment(request, attachment, onApiOkResultCallback, onApiKoResultCallback) {
    createMessage(request, (message => {
        addAttachmentToMessage(
            attachment,
            message.messageId,
            attachmentType.IMAGE,
            onApiOkResultCallback,
            onApiKoResultCallback);

    }), onApiKoResultCallback);
}

async function createMessageWithVoiceAttachment(request, attachment, onApiOkResultCallback, onApiKoResultCallback) {
    createMessage(request, (message => {
        addAttachmentToMessage(
            attachment,
            message.messageId,
            attachmentType.VOICE,
            onApiOkResultCallback,
            onApiKoResultCallback);

    }), onApiKoResultCallback);
}

async function createMessageWithVideoAttachment(request, attachment, onApiOkResultCallback, onApiKoResultCallback) {
    createMessage(request, (message => {
        addAttachmentToMessage(
            attachment,
            message.messageId,
            attachmentType.VIDEO,
            onApiOkResultCallback,
            onApiKoResultCallback);

    }), onApiKoResultCallback);
}

async function createBroadcast(request, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.post(`Messages/${request.projectId}/${request.medicalTeamId}/createbroadcast`, request)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function createReply(request, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.post(`Messages/${request.projectId}/${request.medicalTeamId}/replyTo/${request.originalMessageId}`, request)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function createReplyWithImageAttachment(request, attachment, onApiOkResultCallback, onApiKoResultCallback) {
    createReply(request, (message => {
        addAttachmentToMessage(
            attachment,
            message.messageId,
            attachmentType.IMAGE,
            onApiOkResultCallback,
            onApiKoResultCallback);

    }), onApiKoResultCallback);
}

async function createReplyWithVoiceAttachment(request, attachment, onApiOkResultCallback, onApiKoResultCallback) {
    createReply(request, (message => {
        addAttachmentToMessage(
            attachment,
            message.messageId,
            attachmentType.VOICE,
            onApiOkResultCallback,
            onApiKoResultCallback);

    }), onApiKoResultCallback);
}

async function createReplyWithVideoAttachment(request, attachment, onApiOkResultCallback, onApiKoResultCallback) {
    createReply(request, (message => {
        addAttachmentToMessage(
            attachment,
            message.messageId,
            attachmentType.VIDEO,
            onApiOkResultCallback,
            onApiKoResultCallback);

    }), onApiKoResultCallback);
}

async function createMessagebyMedic(request, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.post(`Messages/${request.projectId}/${request.medicalTeamId}/${request.patientId}/createbyMedic`, request)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function deleteMessage(request, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.delete(`Messages/${request.projectId}/${request.medicalTeamId}/${request.messageId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}


if(
  (("standalone" in window.navigator) && !window.navigator.standalone)
  ||
  (!window.matchMedia('(display-mode: standalone)').matches)
) {
   // console.log(window.matchMedia('(display-mode: standalone)').matches)
  //addToHomescreen({
//detectHomescreen: true
//});
}




export {
    getMessages,
    createBroadcast,
    createMessage,
    createMessageWithImageAttachment,
    createMessageWithVoiceAttachment,
    createMessageWithVideoAttachment,
    createReply,
    createReplyWithImageAttachment,
    createReplyWithVoiceAttachment,
    createReplyWithVideoAttachment,
    deleteMessage,
    createMessagebyMedic
};