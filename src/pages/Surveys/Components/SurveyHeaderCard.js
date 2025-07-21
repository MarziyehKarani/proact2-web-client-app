import React from "react"
import { Card, CardBody } from "reactstrap"


const SurveyHeaderCard = ({ props, survey }) => {

      return (
        <Card className="mb-4">
          <CardBody>

          {survey.logo && (
          <img
        src={`data:image/jpeg;base64,${survey.logo}`}
        alt="Logo"
        className="logo"
      />
          )}

      <h5>{survey.title}</h5>
      <h5>{survey.version}</h5>

      {survey.versionInEnglish && <h5>{survey.versionInEnglish}</h5>}

      {survey.description && <span className="text-muted">{survey.description}</span> }

      <br />
       <br />
      <div className="mt-3">
        <strong>{props.t("MandatoryQuestionsAlertMessage")}</strong>
        {/* <span className="text-muted">{survey.startTime}</span> */}
      </div>

          </CardBody>
          </Card>   
    )
}

export default SurveyHeaderCard;