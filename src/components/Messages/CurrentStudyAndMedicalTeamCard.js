import React from 'react';
import useUserSession from '../../infrastructure/session/useUserSession';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import { Card, CardBody, Row, Col, Label } from 'reactstrap';

const CurrentStudyAndMedicalTeamCard = ({ props }) => {

    const environment = useEnvironment();

    return (
        <>
            {
                environment &&
                <span className='align-middle'>
                    <Label>{props.t("MedicalTeamGroupTitle")}</Label> : {environment.projectName} - {environment.medicalTeamName}
                </span>
            }
        </>


    );
}

export default CurrentStudyAndMedicalTeamCard;