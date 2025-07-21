import React from "react"
import SurveyQuestionHead from "./SurveyQuestionHead"
import surveyQuestionType from "../../../constants/surveyQuestionType"
import { Card, CardBody, CardTitle } from "reactstrap"
import {
  NotCompiledOpenAnswer,
  NotCompiledSingleAnswer,
  NotCompiledMultipleAnswer,
  NotCompiledBooleanAnswer,
  NotCompiledRatingAnswer,
  NotCompiledMoodAnswer,
  NotCompiledNumericAnswer,
  NotCompiledDateAnswer,
} from "./NotCompiledAnswers"

const SurveyQuestionCard = ({
  props,
  question,
  addCompiledQuestion,
  enableNextQuestion,
  questionVisible,
  surveyLayout
}) => {

  return (
    <Card
      style={
        questionVisible
          ? {
              opacity: "1",
              height: "auto",
              visibility: " visible",
              transition: "1s",
            }
          : {
              opacity: "0",
              visibility: "hidden",
              transition: "0s",
              marginBottom: "0px",
              height: "0px",
            }
      }
    >
      <CardBody>
        <SurveyQuestionHead questionDetail={question} />
        {
          <>
            {question.type == surveyQuestionType.OPEN_ANSWER &&
              questionVisible && (
                <NotCompiledOpenAnswer
                  question={question}
                  addCompiledQuestion={addCompiledQuestion}
                  props={props}
                />
              )}

            {question.type == surveyQuestionType.SINGLE_ANSWER &&
              questionVisible && (
                <NotCompiledSingleAnswer
                  enableNextQuestion={enableNextQuestion}
                  question={question}
                  addCompiledQuestion={addCompiledQuestion}
                  surveyLayout={surveyLayout}
                   props={props}
                />
              )}

            {question.type == surveyQuestionType.MULTIPLE_ANSWERS &&
              questionVisible && (
                <NotCompiledMultipleAnswer
                  question={question}
                  addCompiledQuestion={addCompiledQuestion}
                   props={props}
                />
              )}

            {question.type == surveyQuestionType.BOOLEAN && questionVisible && (
              <NotCompiledBooleanAnswer
                props={props}
                question={question}
                addCompiledQuestion={addCompiledQuestion}
              />
            )}

            {question.type == surveyQuestionType.RATING && questionVisible && (
              <NotCompiledRatingAnswer
                question={question}
                addCompiledQuestion={addCompiledQuestion}
                 props={props}
              />
            )}

            {question.type == surveyQuestionType.MOOD && questionVisible && (
              <NotCompiledMoodAnswer
                question={question}
                addCompiledQuestion={addCompiledQuestion}
                 props={props}
              />
            )}

            {question.type == surveyQuestionType.NUMERIC &&
              questionVisible && (
                <NotCompiledNumericAnswer
                  props={props}
                  question={question}
                  addCompiledQuestion={addCompiledQuestion}
                />
              )}
               {question.type == surveyQuestionType.DATE &&
              questionVisible && (
                <NotCompiledDateAnswer
                  question={question}
                  addCompiledQuestion={addCompiledQuestion}
                  surveyLayout={surveyLayout}
                   props={props}
                />
              )}
          </>
        }
      </CardBody>
    </Card>
  )
}

export default SurveyQuestionCard
