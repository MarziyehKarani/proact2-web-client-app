import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Spinner, FormText } from "reactstrap";
import { getProjects } from "../../infrastructure/services/network/apiCalls/projectsApiService"
import { getMedicalTeams } from "../../infrastructure/services/network/apiCalls/medicalTeamApiService"
import Select from "react-select"
import { apiErrorToast } from "../../helpers/toastHelper";
import { setSessionEnvironment } from "../../infrastructure/session/useEnvironment";
import useUserSession from "../../infrastructure/session/useUserSession";

export const ChangeStudyModal = ({ props, isOpen, closeCallback }) => {

    const userSession = useUserSession();

    const [projects, setProjects] = useState([]);
    const [medicalTeams, setMedicalTeams] = useState([]);
    const [isProjectsBusy, setIsProjectsBusy] = useState();
    const [isMedicalTeamsBusy, setIsMedicalTeamsBusy] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [selectedMedicalTeam, setSelectedMedicalTeam] = useState();
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadProjects();
        }
    }, [isOpen]);

    useEffect(() => {
        if (selectedProject) {
            setSelectedMedicalTeam(null);
            loadMedicalTeams();
        }
    }, [selectedProject]);

    function loadProjects() {
        setIsProjectsBusy(true);
        getProjects(
            handleLoadProjectsSuccess,
            handleApiRequestError);
    }

    function handleLoadProjectsSuccess(data) {
        var options = getProjectSelectOptionsFromItems(data);
        setProjects(options);
        setIsProjectsBusy(false);
    }

    function loadMedicalTeams() {
        setIsMedicalTeamsBusy(true);
        getMedicalTeams(
            selectedProject.value,
            handleLoadMedicalTeamsSuccess,
            handleApiRequestError);
    }

    function handleLoadMedicalTeamsSuccess(data) {
        var options = getMedicalTeamSelectOptionsFromItems(data);
        setMedicalTeams(options);
        setIsMedicalTeamsBusy(false);
    }

    function handleApiRequestError(message) {
        apiErrorToast(message);
        setIsMedicalTeamsBusy(false);
        setIsProjectsBusy(false);
    }

    function validate() {
        var isValid = selectedProject && selectedMedicalTeam;
        setIsErrorVisible(!isValid);
        return isValid;
    }

    function getProjectSelectOptionsFromItems(items) {
        var options = [];
        items.forEach(item => {
            var optionItem = {};
            optionItem.label = item.name;
            optionItem.value = item.projectId;
            options.push(optionItem);
        });

        return options;
    }

    function getMedicalTeamSelectOptionsFromItems(items) {
        var options = [];
        items.forEach(item => {
            var optionItem = {};
            optionItem.label = item.name;
            optionItem.value = item.medicalTeamId;
            options.push(optionItem);
        });

        return options;
    }

    function handleCloseButtonClick() {
        setSelectedProject(null);
        setSelectedMedicalTeam(null)
        closeCallback();
    }

    function handleChangeButtonClick() {
        if (validate()) {
            setSessionEnvironment(
                userSession.userId, 
                selectedProject.value, 
                selectedProject.label, 
                selectedMedicalTeam.value, 
                selectedMedicalTeam.label);

                reloadMainPage();
        }
    }

    function reloadMainPage(){
        handleCloseButtonClick();
        props.history.push("/");
    }

    return (
        <Modal
            size="lg"
            isOpen={isOpen} >
            <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                    {props.t("ChangeMedicalTeamAndTrialTitle")}
                </h5>
                <button
                    type="button"
                    onClick={handleCloseButtonClick}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form>
                    <Row>
                        <Col>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label"
                                >
                                    {props.t("ProjectsListPageTitle")}
                                </label>
                                <div className="col-md-7">
                                    <Select
                                        value={selectedProject}
                                        onChange={setSelectedProject}
                                        options={projects}
                                        classNamePrefix="select2-selection"
                                    />
                                </div>
                                {
                                    isProjectsBusy ?
                                        <Spinner className="col-md-1" color="primary" />
                                        :
                                        <></>
                                }

                            </Row>

                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label"
                                >
                                    {props.t("MedicalTeamsListPageTitle")}
                                </label>
                                <div className="col-md-7">
                                    <Select
                                        value={selectedMedicalTeam}
                                        onChange={setSelectedMedicalTeam}
                                        options={medicalTeams}
                                        classNamePrefix="select2-selection"
                                    />
                                </div>
                                {
                                    isMedicalTeamsBusy ?
                                        <Spinner className="col-md-1" color="primary" />
                                        :
                                        <></>
                                }

                            </Row>

                            <Row>
                                {isErrorVisible && <FormText color="danger">{props.t("FillinAllFields")}</FormText>}
                            </Row>

                        </Col>
                    </Row>
                </form>
            </div>

            <div className="modal-footer">
                <button
                    type="button"
                    onClick={handleChangeButtonClick}
                    className="btn btn-primary waves-effect waves-light"
                >
                    {props.t("Change")}
                </button>
            </div>
        </Modal>
    );
}