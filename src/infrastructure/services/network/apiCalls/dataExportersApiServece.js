const axios = require('axios');

async function getSurveyStatsOverTheTime(surveyId, patientId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`DataExporters/survey/${surveyId}/user/${patientId}/csv`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getAnalysisOfAPatient(userId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`DataExporters/analysis/user/${userId}/csv`)
        .then(response => {
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}

async function getSurveyResultAsExcel(surveyId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`DataExporters/survey/${surveyId}/Excel`)
        .then(response => {
            console.log(response.data);
            onApiOkResultCallback(response.data);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}


export {
    getSurveyStatsOverTheTime,
    getAnalysisOfAPatient,
    getSurveyResultAsExcel
};