import React from 'react';
import { ReactSession } from 'react-client-session';
import { apiErrorToast } from '../../helpers/toastHelper'
import UserRoles from './UserRoles';
import { aquireAccessToken } from '../azure/aquireAccessToken';
import { getProjects } from '../services/network/apiCalls/projectsApiService';
import { getMedicalTeams } from '../services/network/apiCalls/medicalTeamApiService';
import { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import useUserSession from './useUserSession';

const useEnvironment = () => {

    const [environment, setEnvironment] = useState();
    const [projectId, setProjectId] = useState();
    const [medicalTeamId, setmMedicalTeamId] = useState();
    const [projectName, setProjectName] = useState();
    const [medicalTeamName, setMedicalTeamName] = useState();

    const userSession = useUserSession();

    useEffect(() => {
        if (userSession) {
            userSessionHandle();
        }
    }, [userSession]);

    useEffect(() => {
        if (projectId) {
            loadMedicalTeams();
        }
    }, [projectId]);

    useEffect(() => {
        if (medicalTeamId && projectId) {
            setSessionEnvironment();
        }
    }, [medicalTeamId]);

    function userSessionHandle() {
        if (existSessionEnvironment()) {
            var environment = getSessionEnvironment();
            setEnvironment(environment);
        }
        else {
            loadProjects();
        }
    }

    function loadProjects() {
        getProjects(projectsHandle, apiErrorToast)
    }

    function projectsHandle(projects) {
        if (projects && projects.length > 0) {
            setProjectId(projects[0].projectId);
            setProjectName(projects[0].name);
        }
    }

    function loadMedicalTeams() {
        getMedicalTeams(projectId, medicalTeamsHandle, apiErrorToast);
    }

    function medicalTeamsHandle(medicalTeams) {
        if (medicalTeams && medicalTeams.length > 0) {
            var meedicalteam = medicalTeams[0];
            setMedicalTeamName(meedicalteam.name);
            setmMedicalTeamId(meedicalteam.medicalTeamId);
        }
    }

    function existSessionEnvironment() {
        var environmentStr = ReactSession.get("environment");
        if (environmentStr) {
            var environment = getSessionEnvironment();
            return userSession.userId == environment.userId;
        }
        else {
            false;
        }
    }

    function getSessionEnvironment() {
        const environmentStr = ReactSession.get("environment");
        return JSON.parse(environmentStr);
    }

    function setSessionEnvironment() {
        var environment = {
            projectId: projectId,
            medicalTeamId: medicalTeamId,
            projectName: projectName,
            medicalTeamName: medicalTeamName,
            userId: userSession.userId
        }

        var environmentStr = JSON.stringify(environment);
        ReactSession.set("environment", environmentStr);
        setEnvironment(environment);
    }

    return environment;
}

function setSessionEnvironment(userId, projectId, projectName, medicalTeamId, medicalTeamName) {
    var environment = {
        projectId: projectId,
        medicalTeamId: medicalTeamId,
        projectName: projectName,
        medicalTeamName: medicalTeamName,
        userId: userId
    }

    var environmentStr = JSON.stringify(environment);
    ReactSession.set("environment", environmentStr);
}

export default useEnvironment;
export {setSessionEnvironment} ;