import React from "react"
import { Col, Row, Card, CardBody } from "reactstrap"
import { LoadingSpinner } from "../../../components/Common/LoadingSpinner"
import SurveyCompiledAnswerCard from "./CompiledAnswerCard"
import SurveyDetailsCard from "./SurveyDetailsCard"

const SurveyResultsDetails = ({ props, surveyResults }) => {
  return surveyResults &&
    surveyResults.data &&
    surveyResults.data.completedDateTime ? (
    <Row>
      <Col xs="12">
        {surveyResults.questions.map((question, idx) => (
          <SurveyCompiledAnswerCard
            key={idx}
            question={question}
            props={props}
          />
        ))}
      </Col>
      <Col xs="12">
        <SurveyDetailsCard props={props} surveyDetails={surveyResults} />
      </Col>
    </Row>
  ) : (
    <Card>
      <CardBody className="text-muted text-center py-5">
        {props.t("SurveysNotCompiledError")}
      </CardBody>
    </Card>
  )
}

export default SurveyResultsDetails
