import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { toLocalDate, toLocalDatetime } from '../../../common/formattedDatetime';

const SurveyDetailsCard = ({ props, surveyDetails }) => {
    return (
        <Card>
            <CardBody>
                <h5>{surveyDetails.title}</h5>
                {/* <div className='text-muted'>
                    {toLocalDate(surveyDetails.startTime)}<i className="fas fa-arrow-right mx-2"></i>{toLocalDate(surveyDetails.expireTime)}
                </div> */}
                <span className='text-muted'>{surveyDetails.description}</span>
                <hr />
                <div className='mt-2'><strong>{props.t("CompletedSurvey")}</strong></div>
                <span className='text-muted'>{toLocalDatetime(surveyDetails.completedDateTime)}</span>
            </CardBody>
        </Card>
    );
}

export default SurveyDetailsCard;