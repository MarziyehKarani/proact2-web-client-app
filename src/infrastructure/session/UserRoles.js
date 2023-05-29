var UserRoles = (function () {

    var Researcher = "Researcher";
    var MedicalProfessional = "MedicalProfessional";
    var MedicalTeamAdmin = "MedicalTeamAdmin";
    var Patient = "Patient";
    var Nurse = "Nurse";
    var MedicalTeamDataManager = "MedicalTeamDataManager";

    return {
        Researcher: Researcher,
        MedicalProfessional: MedicalProfessional,
        MedicalTeamAdmin: MedicalTeamAdmin,
        Patient: Patient,
        Nurse: Nurse,
        MedicalTeamDataManager: MedicalTeamDataManager
    }

})();

export default UserRoles;