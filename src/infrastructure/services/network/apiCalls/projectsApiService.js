import projectStatus from "../../../../constants/projectStatus"

const axios = require('axios');
import axiosInstance from "../axiosInstance";

async function getProjects(onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`Projects`)
        .then(response => {
            var openProjects = response.data
               // .filter(p => p.status == projectStatus.OPEN)

            onApiOkResultCallback(openProjects);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getProjectDetails(projectId, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`Projects/${projectId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getContactPageContent(projectId, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`ProjectContacts/${projectId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}


export {
    getProjects,
    getProjectDetails,
    getContactPageContent
};