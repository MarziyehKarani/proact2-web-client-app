import medicalTeamStatus from '../../../../constants/medicalTeamStatus';

const axios = require('axios');

async function getMedicalTeams(projectId, onApiOkResultCallback, onApiKoResultCallback) {
    await axios.get(`MedicalTeam/${projectId}/my`)
        .then(response => {
            var openMedicalTeams = response.data
         //   .filter(mt => mt.state == medicalTeamStatus.OPEN);

            onApiOkResultCallback(openMedicalTeams);
        })
        .catch(error => {
            onApiKoResultCallback(error);
        });
}


export {
    getMedicalTeams
};