const axios = require('axios');
import axiosInstance from "../axiosInstance";
import { Buffer } from 'buffer';

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

async function addVideoAttachmentToMessage(attachment, messageId, attachmentType,width,height, duration, onApiOkResultCallback, onApiKoResultCallback) {
    const formData = new FormData();
    formData.append("mediaFile", attachment);

    console.log("width", width);
    console.log("height", height);
        // Append the width and height
        formData.append("width", width);
        formData.append("height", height);
        formData.append("duration",duration);

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

async function getVideoUploadRequest(messageId, attachment, width, height, duration, thumbnails, onApiOkResultCallback, onApiKoResultCallback) {

    await axiosInstance.get(`Attachments/GetVideoUploadRequest/${messageId}`)
    .then(response => {
        //console.log(response);
        //console.log(thumbnails);
        submitVideo(messageId, width, height, duration, response, attachment, thumbnails, onApiOkResultCallback, onApiKoResultCallback);          
    })
    .catch(error => {
        onApiKoResultCallback(error);
    });
}

async function submitVideo(messageId, width, height, duration, resp, attachment, thumbnails, onApiOkResultCallback, onApiKoResultCallback) {
    
     await axios.put(resp.data.url,attachment, {
            headers: 
            {
                "Content-Disposition":"attachment; filename=\"" + attachment.name + "\"",
                "Content-Type":attachment.type,
                "x-ms-blob-type":"BlockBlob"           
            }            
          }).then(async (uploadResp) => {
            //console.log(uploadResp)            
            //uploadVideo(messageId,resp.data.url, resp.data.repositoryFileName, width, height, duration, onApiOkResultCallback, onApiKoResultCallback )
            submitThumbnail(messageId, width, height, duration, resp, thumbnails, onApiOkResultCallback, onApiKoResultCallback)
        }) 
    .catch(error => {
        onApiKoResultCallback(error);
    });
}

async function submitThumbnail(messageId, width, height, duration, resp, thumbnails, onApiOkResultCallback, onApiKoResultCallback) {
    
    var rawdata = thumbnails;
    var matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var type = matches[1];
    var buffer = Buffer.from(matches[2], 'base64');

    await axios.put(resp.data.urlThumbnail, buffer, {
           headers: 
           {
               "Content-Disposition":"attachment; filename=\"" + thumbnails.name + "\"",
               "Content-Type":type,
               "x-ms-blob-type":"BlockBlob"           
           }            
         }).then(async (uploadResp) => {
           //console.log(uploadResp)            
           uploadVideo(messageId,resp.data.url, resp.data.repositoryFileName, width, height, duration, resp.data.urlThumbnail, resp.data.repositoryThumbnailFileName, onApiOkResultCallback, onApiKoResultCallback )
       }) 
   .catch(error => {
       onApiKoResultCallback(error);
   });
}

async function uploadVideo(messageId, url, fileName, width, height, duration, urlThumbnail, ThumbnailFileName, onApiOkResultCallback, onApiKoResultCallback) {

    const request = {
        messageId: messageId,
        mediaFileUrl: url,            
        FileName: fileName,
        Duration: duration,
        width: width,
        height: height, 
        urlThumbnail: urlThumbnail, 
        ThumbnailFileName: ThumbnailFileName,           
    }
    //console.log("request2 :" + JSON.stringify(request));

    await axiosInstance.post(`Attachments/UploadVideo`, request,
    {
        headers: {
            "Content-Type": "application/json"
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
    addAttachmentToMessage,
    addVideoAttachmentToMessage,
    getVideoUploadRequest
};