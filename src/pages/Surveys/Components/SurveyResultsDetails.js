import React from 'react';
import { Col, Row } from 'reactstrap';
import { LoadingSpinner } from '../../../components/Common/LoadingSpinner';
import SurveyCompiledAnswerCard from './CompiledAnswerCard';
import SurveyDetailsCard from './SurveyDetailsCard';

const SurveyResultsDetails = ({props,surveyResults}) => {
    return ( 
        <Row>
          <Col xs="8">
            {
              surveyResults.questions.map((question, idx) => (
                <SurveyCompiledAnswerCard key={idx} question={question} props={props} />
              ))
            }
          </Col>
          <Col xs="4" >
            <SurveyDetailsCard
              props={props}
              surveyDetails={surveyResults} />
          </Col>
        </Row>
     );
}
 
export default SurveyResultsDetails;