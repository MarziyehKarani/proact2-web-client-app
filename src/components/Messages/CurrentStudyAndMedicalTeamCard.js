import React from 'react';
import useUserSession from '../../infrastructure/session/useUserSession';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import { Card, CardBody, Row, Col, Label } from 'reactstrap';
import projectStatus from '../../constants/projectStatus';
import medicalTeamStatus from '../../constants/medicalTeamStatus';

const CurrentStudyAndMedicalTeamCard = ({ props }) => {

    const environment = useEnvironment();

    return (
        <>
            {
                environment ?
                <span className='align-middle'>
                    <Label>{props.t("MedicalTeamGroupTitle")}</Label> :  {environment.projectName} - {environment.medicalTeamName} - {environment.medicalTeamStatus === medicalTeamStatus.OPEN ? props.t("Open") :  props.t("Closed")}
                </span>
                :
                <Card>
                    <div className="text-center text-muted m-5 p-5">
                        {props.t("NoAssignedMedicalTeam")}
                    </div>
                </Card>
            }
        </>


    );
}

export default CurrentStudyAndMedicalTeamCard;