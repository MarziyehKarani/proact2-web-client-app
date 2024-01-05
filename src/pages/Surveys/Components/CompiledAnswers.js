import React from "react"
import { Button } from "reactstrap"
import messageMood from "../../../constants/messageMood"
import moodVeryBadBtnImg from "../../../assets/images/messages/btn_moodVeryBad.png"
import moodBadBtnImg from "../../../assets/images/messages/btn_moodBad.png"
import moodGoodBtnImg from "../../../assets/images/messages/btn_moodGood.png"
import moodVeryGoodBtnImg from "../../../assets/images/messages/btn_moodVeryGood.png"

const isNotAnswer = compiledAnswers => {
  let notAnsware = compiledAnswers[0].notAnsware
  if (notAnsware !== undefined) {
    return true
  }
}

const initializeValue = (compiledAnswers, alternativeValue) => {
  return compiledAnswers && compiledAnswers.length > 0
    ? compiledAnswers[0].value
    : alternativeValue
}

const CompiledOpenAnswer = ({ compiledAnswers }) => {
  if (isNotAnswer(compiledAnswers)) return <h6>{compiledAnswers[0].value}</h6>
  var value = initializeValue(compiledAnswers, "")

  return (
    <h5>
      <small className="text-muted">{value}</small>
    </h5>
  )
}

const CompiledSingleAnswer = ({ compiledAnswers }) => {
  if (isNotAnswer(compiledAnswers)) return <h6>{compiledAnswers[0].value}</h6>
  var value = initializeValue(compiledAnswers, "")

  return (
    <h5>
      <i className="fas fa-dot-circle me-2 text-primary"></i>
      <small className="text-muted">{value}</small>
    </h5>
  )
}

const CompiledMultipleAnswer = ({ compiledAnswers }) => {
  if (isNotAnswer(compiledAnswers)) return <h6>{compiledAnswers[0].value}</h6>
  
  return (
    <div>
      {compiledAnswers &&
        compiledAnswers.map((answer, idx) => (
          <h5 key={idx}>
            <i className="fas fa-check-square me-2 text-info"></i>
            <small className="text-muted">{answer.value}</small>
          </h5>
        ))}
    </div>
  )
}

const CompiledBooleanAnswer = ({ props, compiledAnswers }) => {
  if (isNotAnswer(compiledAnswers)) return <h6>{compiledAnswers[0].value}</h6>
  var value = initializeValue(compiledAnswers, "")

  return (
    <Button disabled outline color={value === "true" ? "success" : "danger"}>
      {props.t(value)}
    </Button>
  )
}

const CompiledRatingAnswer = ({ compiledAnswers, properties }) => {
  if (isNotAnswer(compiledAnswers)) return <h6>{compiledAnswers[0].value}</h6>
  var value = `${initializeValue(compiledAnswers, "")}/${properties.max}`

  return (
    <Button disabled outline color="info">
      {value}
    </Button>
  )
}

const CompiledMoodAnswer = ({ compiledAnswers }) => {
  if (isNotAnswer(compiledAnswers)) return <h6>{compiledAnswers[0].value}</h6>
  var value = initializeValue(compiledAnswers, messageMood.NONE)

  var moodImage
  switch (value) {
    case messageMood.VERY_BAD.toString():
      moodImage = moodVeryBadBtnImg
      break
    case messageMood.BAD.toString():
      moodImage = moodBadBtnImg
      break
    case messageMood.GOOD.toString():
      moodImage = moodGoodBtnImg
      break
    case messageMood.VERY_GOOD.toString():
      moodImage = moodVeryGoodBtnImg
      break

    default:
      break
  }

  return <img src={moodImage} height="80px" width="80px" />
}

const CompiledNumericAnswer = ({ compiledAnswers }) => {
  if (isNotAnswer(compiledAnswers)) return <h6>{compiledAnswers[0].value}</h6>
  var value = initializeValue(compiledAnswers, "")

  return (
    <h5>
      <small className="text-muted">{value}</small>
    </h5>
  )
}

export {
  CompiledOpenAnswer,
  CompiledMultipleAnswer,
  CompiledSingleAnswer,
  CompiledBooleanAnswer,
  CompiledRatingAnswer,
  CompiledMoodAnswer,
  CompiledNumericAnswer
}
