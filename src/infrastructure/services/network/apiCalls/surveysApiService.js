const axios = require('axios');

async function getMineCompiledSurveys(onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`SurveyAssegnations/completed/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getMineNotCompiledSurveys(onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`SurveyAssegnations/notcompleted/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getMineSurveyResults(assignationId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`SurveyAssegnations/${assignationId}/compiled/me`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getSurveyResults(assignationId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`SurveyAssegnations/${assignationId}/compiled`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getCompiledSurveys(userId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`SurveyAssegnations/${userId}/completed`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}


async function getProjectSurveys(projectId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Survey/${projectId}/all`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getSurvey(surveyId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Survey/${surveyId}`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function compileSurvey(surveyId, assegnationId, request, onApiOkResultCallback, onApiKoResultCallback ){
    await axios.post(`SurveyAssegnations/${surveyId}/${assegnationId}/compile`, request)
    .then(response => {
        onApiOkResultCallback(response.data);
    })
    .catch(error => {
        onApiKoResultCallback(error);
    });
}

async function getPatientsAssignedToASurvey(surveyId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`SurveyAssegnations/${surveyId}/patients`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getSurveyStats(surveyId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Survey/${surveyId}/stats`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getPatientStats(surveyId, userId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Survey/${surveyId}/user/${userId}/stats`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getProjectAssignedSurveys(projectId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`Survey/${projectId}/all/assigned`)
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