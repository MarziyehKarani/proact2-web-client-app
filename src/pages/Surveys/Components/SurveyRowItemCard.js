import React from "react"
import { withTranslation } from "react-i18next"
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Badge,
} from "reactstrap"


import { OnceSurveyActionButtons, SurveyActionButtons, SurveyTextWithReccurenceCell, SurveyPatientsCodes } from './SurveysTableCells';
import { FromDateToDateCell } from "../../../components/Common/TableCells"
import surveyReccurence from '../../../constants/surveyReccurence';

const SurveyRowItemCard = ({ props, survey }) => {

  console.log("survey", survey)
  return (
     <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5"><SurveyTextWithReccurenceCell
                                text={survey.title}
                                props={props}
                                reccurence={survey.reccurence} /></CardTitle>
        <div className="d-flex align-items-center justify-content-between mb-2">
        <CardText className="text-muted font-size-16">
           {/* {props.t("SurveyExpires")}{" "} */}
         <FromDateToDateCell props={props} from={survey.startTime} to={survey.expireTime} />
        </CardText>
         {survey.reccurence == surveyReccurence.Once ?
                        <OnceSurveyActionButtons
                            props={props}
                            survey={survey} />
                        :
                        <SurveyActionButtons
                            props={props}
                            survey={survey} />

                    }
        </div>


                  <CardText className="text-muted font-size-16">
           <span className="fw-bold"> {props.t("Patients")}{": "} </span>
          <SurveyPatientsCodes survey={survey}/>
          </CardText>
      </CardBody>
    </Card>
  )
}

export default withTranslation()(SurveyRowItemCard)
