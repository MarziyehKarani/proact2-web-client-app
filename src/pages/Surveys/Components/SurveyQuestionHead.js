import React from "react"
import { Badge } from "reactstrap"

const SurveyQuestionHead = ({ questionDetail }) => {
  return (
    <div>
      <h4>
        {questionDetail.title}{" "}
        {questionDetail.isRequired && <span style={{ color: "red" }}>*</span>}
      </h4>
      <h5>
        <small className="text-muted">{questionDetail.question}</small>
      </h5>
      <hr />
    </div>
  )
}

export default SurveyQuestionHead
