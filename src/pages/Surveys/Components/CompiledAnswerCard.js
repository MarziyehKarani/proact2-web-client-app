import React, { useEffect, useState } from "react"
import SurveyQuestionHead from "./SurveyQuestionHead"
import surveyQuestionType from "../../../constants/surveyQuestionType"
import { Card, CardBody } from "reactstrap"
import {
  CompiledOpenAnswer,
  CompiledSingleAnswer,
  CompiledMultipleAnswer,
  CompiledBooleanAnswer,
  CompiledRatingAnswer,
  CompiledMoodAnswer,
  CompiledNumericAnswer
} from "./CompiledAnswers"

const checkNotCompiledAnswer = (compiledAnswers) => {
    //se la risposta non è definita
    //aggiungo una proprietà che si chiama notAnswer
    //quindi quando questa proprietà esiste, mostro la label
    //se invece non esiste, quindi è === undefined vuoldire che la risposta c'è e metto il normale input
    //quindi if notAnswer !== undefined mostro la label
    return compiledAnswers ?? [
      {
        answerId: null,
        value: props.t("NotAnsweredQuestion"),
        notAnsware: true,
      },
    ];
  };
  
  const getStyleNotCompiledAnswer = (compiledAnswers) => {
    return compiledAnswers ? { background: "#ffffff" } : { background: "#f5f5f5" };
  };
  

const SurveyCompiledAnswerCard = ({ props, question }) => {
    const answers = checkNotCompiledAnswer(question.compiledAnswers);
    const style = getStyleNotCompiledAnswer(question.compiledAnswers);
    
    // useEffect(() => {
    //   setAnswers(checkNotCompiledAnswer(question.compiledAnswers));
    // }, []);

  return (
    <Card style={style}>
      <CardBody>
        <SurveyQuestionHead questionDetail={question} />
        {
          <>
            {question.type == surveyQuestionType.OPEN_ANSWER && (
              <CompiledOpenAnswer compiledAnswers={answers} />
            )}

            {question.type == surveyQuestionType.SINGLE_ANSWER && (
              <CompiledSingleAnswer compiledAnswers={answers} />
            )}

            {question.type == surveyQuestionType.MULTIPLE_ANSWERS && (
              <CompiledMultipleAnswer compiledAnswers={answers} />
            )}

            {question.type == surveyQuestionType.BOOLEAN && (
              <CompiledBooleanAnswer compiledAnswers={answers} props={props} />
            )}

            {question.type == surveyQuestionType.RATING && (
              <CompiledRatingAnswer
                compiledAnswers={answers}
                properties={question.properties}
              />
            )}

            {question.type == surveyQuestionType.MOOD && (
              <CompiledMoodAnswer compiledAnswers={answers} />
            )}

            {question.type == surveyQuestionType.NUMERIC && (
              <CompiledNumericAnswer compiledAnswers={answers} />
            )}
          </>
        }
      </CardBody>
    </Card>
  )
}

export default SurveyCompiledAnswerCard
