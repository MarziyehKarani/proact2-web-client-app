import React from "react"
import { withTranslation } from "react-i18next"
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Badge,
} from "reactstrap"

import {
  SurveyDateWithReccurenceCell,
  SurveyExpireDateWithStatusCell,
  CompileSurveyButtonCell,
} from "./SurveysTableCells"

const NotCompiledSurveysMineCard = ({ props, survey }) => {
  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5" className="mb-3">{survey.title}</CardTitle>
       
          <CardText className="text-muted font-size-16">
            {props.t("SurveyCompleted")}{" "}
            <SurveyDateWithReccurenceCell
              props={props}
              date={survey.startTime}
              reccurence={survey.reccurence}
            />
          </CardText>
       
       
         <div className="d-flex align-items-center justify-content-between">
        <CardText className="text-muted font-size-16">
           {props.t("SurveyExpires")}{" "}
          <SurveyExpireDateWithStatusCell
            props={props}
            date={survey.expireTime}
            expired={survey.expired}
          />
        </CardText>
           <CompileSurveyButtonCell
            linkTo={`/surveys/compile/${survey.surveyId}/${survey.id}`}
            title={props.t("CompileSurvey")}
          />

           </div>
      </CardBody>
    </Card>
  )
}

export default NotCompiledSurveysMineCard
