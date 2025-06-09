import React from "react"
import { withTranslation } from "react-i18next"
import { Card, CardBody, CardText, CardTitle, Badge } from "reactstrap"

import {
  SurveyDateWithReccurenceCell,
  SurveyExpireDateWithStatusCell,
  CompileSurveyButtonCell,
} from "./SurveysTableCells"
import { OpenDetailsCell } from "../../../components/Common/TableCells"

const CompiledSurveysMineCard = ({ props, survey }) => {
  console.log("survey", survey)
  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5">{survey.surveyTitle}</CardTitle>
        <div className="d-flex align-items-center justify-content-between">
          <CardText className="text-muted font-size-16 mt-2">
             {/* <div className="text-wrap" style={{ width: 10 + "rem" }}>  */}
           <p style={{ marginBottom: '4px' }}>{props.t("CompletedDateTime")}{" "}</p>   
           <p style={{ marginTop: '0' }}>
              <SurveyDateWithReccurenceCell
                props={props}
                date={survey.completedDateTime}
                reccurence={survey.reccurence}
              />
              </p>
             {/* </div>  */}
          </CardText>
          <OpenDetailsCell
            linkTo={`/surveys/compiled/mine/${survey.id}`}
            title={props.t("SurveysResults")}
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default withTranslation()(CompiledSurveysMineCard)
