import React, { useState, useEffect } from "react";

import { Redirect } from "react-router-dom";
import UserRoles from "../infrastructure/session/UserRoles";
import useUserSession from "../infrastructure/session/useUserSession";
import OneSignal from "react-onesignal";

//import OneSignal from 'react-onesignal';

const AuthorizedPage = () => {

    const [isAuthorized, setIsAuthorized] = useState(true);
    const userSession = useUserSession();

    useEffect(() => {
        if (userSession) {
            var isAuth = userCanAccessToAnalystConsole();
            setIsAuthorized(isAuth);
            OneSignal.login(userSession.userId);
        }
    }, [userSession]);

    var userCanAccessToAnalystConsole = function () {
        const roles = userSession.roles;
        return roles.includes(UserRoles.MedicalProfessional)
            || roles.includes(UserRoles.MedicalTeamAdmin)
            || roles.includes(UserRoles.Researcher)
            || roles.includes(UserRoles.Patient);
    }

    return (
        <div>
            {isAuthorized ?
                ""
                :
               <Redirect to="/unauthorized"/>
            }
        </div>
    );
};

export default AuthorizedPage;