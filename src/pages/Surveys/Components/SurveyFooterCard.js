import React from "react"
import { Card, CardBody } from "reactstrap"

const SurveyFooterCard = ({ props, survey }) => {

  console.log("SurveyHeaderCard", survey);

  
  return (
    <Card className="mb-4">
      <CardBody>
      {survey.footerImage && (
        <img
          src={`data:image/jpeg;base64,${survey.footerImage}`}
          alt="Footer"
          className="footer-logo"
        />
        )}
        
        {survey.footer && ( <h5>{survey.footer}</h5> )}
      </CardBody>
    </Card>
  )
}

export default SurveyFooterCard
