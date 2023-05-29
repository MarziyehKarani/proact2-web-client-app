import React from 'react'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import surveyReccurence from '../../../constants/surveyReccurence'
import { toLocalDatetime } from '../../../helpers/formattedDatetime'

const SurveyDateWithReccurenceCell = ({ props, date, reccurence }) => {
    return (
        <span>
            <small>{toLocalDatetime(date)}</small>
            {
                reccurence == surveyReccurence.Daily &&
                <Badge color='info' className='ms-2' >{props.t("Daily")}</Badge>
            }
            {
                reccurence == surveyReccurence.Weekly &&
                <Badge color='warning' className='ms-2' >{props.t("Weekly")}</Badge>
            }
            {
                reccurence == surveyReccurence.Monthly &&
                <Badge color='primary' className='ms-2' >{props.t("Monthly")}</Badge>
            }
            {
                reccurence == surveyReccurence.Once &&
                <Badge color='secondary' className='ms-2' >{props.t("Once")}</Badge>
            }
        </span>
    );
}

const SurveyTextWithReccurenceCell = ({ props, text, reccurence }) => {
    return (
        <span>
            {text}
            {
                reccurence == surveyReccurence.Daily &&
                <Badge color='info' className='ms-2' >{props.t("Daily")}</Badge>
            }
            {
                reccurence == surveyReccurence.Weekly &&
                <Badge color='warning' className='ms-2' >{props.t("Weekly")}</Badge>
            }
            {
                reccurence == surveyReccurence.Monthly &&
                <Badge color='primary' className='ms-2' >{props.t("Monthly")}</Badge>
            }
            {
                reccurence == surveyReccurence.Once &&
                <Badge color='secondary' className='ms-2' >{props.t("Once")}</Badge>
            }
        </span>
    );
}


const SurveyExpireDateWithStatusCell = ({ props, date, expired }) => {
    return (
        <span>
            <small>{new Date(date).toLocaleDateString()}</small>
            {
                expired &&
                <Badge color='danger' className='ms-2' >{props.t("Expired")}</Badge>
            }
        </span>
    );
}

const OnceSurveyActionButtons = ({ props, survey }) => {
    return (
        <div
            className="btn-group btn-group-sm"
            role="group">
            <Link to={`compiled/${survey.id}`}
                className="btn-success btn">
               <i className="fas fa-poll-h me-2"></i>{props.t("SurveysResults")}
            </Link>

            <Link to={`${survey.id}/stats`}
                type='button'
                className='btn-info btn'>
                <i className="fas fa-chart-pie me-2"></i>{props.t("SurveyStats")}
            </Link>
        </div>
    );
}

const SurveyActionButtons = ({ props, survey }) => {
    return (
        <div
            className="btn-group btn-group-sm"
            role="group">
            <Link to={`${survey.id}/patient/stats`}
                className="btn-success btn">
                <i className="fas fa-poll-h me-2"></i>{props.t("SurveysResults")}
            </Link>
        </div>
    );
}

const CompileSurveyButtonCell = ({ title, linkTo }) => {
    return (
        <Link to={linkTo}
            title={title}
            className='btn-success btn btn-sm'>
            <i className="fas fa-check-square me-2"></i>
            {title}
        </Link>
    );
}

const SurveyPatientsCodes = ({survey}) => {
    var codes = "";
    if(survey.assignedPatients == null || survey.assignedPatients.length == 0) {
        return (codes);
    }
  
    survey.assignedPatients.forEach(patient => {
        var patientCode =  patient.code ? `${patient.code} - `  : "";
        codes += patientCode
    });


    codes = codes.substring(0, codes.length - 2 );
    return(<small>{codes}</small>)
}
 
export default SurveyPatientsCodes;

export {
    SurveyDateWithReccurenceCell,
    SurveyTextWithReccurenceCell,
    SurveyExpireDateWithStatusCell,
    CompileSurveyButtonCell,
    OnceSurveyActionButtons,
    SurveyActionButtons,
    SurveyPatientsCodes
};