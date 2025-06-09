const axios = require('axios');
import axiosInstance from "../axiosInstance";

async function getMineCompiledSurveys(pagingCount,onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`SurveyAssegnations/completed/me/${pagingCount}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getMineNotCompiledSurveys(pagingCount,onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`SurveyAssegnations/notcompleted/me/${pagingCount}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getMineSurveyResults(assignationId, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`SurveyAssegnations/${assignationId}/compiled/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getSurveyResults(assignationId, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`SurveyAssegnations/${assignationId}/compiled`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getCompiledSurveys(userId, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`SurveyAssegnations/${userId}/completed`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}


async function getProjectSurveys(projectId, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`Survey/${projectId}/all`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getSurvey(surveyId, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`Survey/${surveyId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function compileSurvey(surveyId, assegnationId, request, onApiOkResultCallback, onApiKoResultCallback ){
    await axiosInstance.post(`SurveyAssegnations/${surveyId}/${assegnationId}/compile`, request)
    .then(response => {
        onApiOkResultCallback(response.data);
    })
    .catch(error => {
        onApiKoResultCallback(error);
    });
}

async function getPatientsAssignedToASurvey(surveyId, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`SurveyAssegnations/${surveyId}/patients`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getSurveyStats(surveyId, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`Survey/${surveyId}/stats`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getPatientStats(surveyId, userId, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`Survey/${surveyId}/user/${userId}/stats`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getProjectAssignedSurveys(projectId,pagingCount, onApiOkResultCallback, onApiKoResultCallback) {
    await axiosInstance.get(`Survey/${projectId}/all/assigned/${pagingCount}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

export {
    getMineCompiledSurveys,
    getMineNotCompiledSurveys,
    getMineSurveyResults,
    getSurveyResults,
    getCompiledSurveys,
    getProjectSurveys,
    getSurvey,
    compileSurvey,
    getPatientsAssignedToASurvey,
    getSurveyStats,
    getPatientStats,
    getProjectAssignedSurveys
};