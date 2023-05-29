import React from 'react';
import SurveyQuestionHead from './SurveyQuestionHead';
import surveyQuestionType from '../../../constants/surveyQuestionType';
import { Card, CardBody } from 'reactstrap';
import {
    CompiledOpenAnswer,
    CompiledSingleAnswer,
    CompiledMultipleAnswer,
    CompiledBooleanAnswer,
    CompiledRatingAnswer,
    CompiledMoodAnswer
} from './CompiledAnswers';

const SurveyCompiledAnswerCard = ({ props, question }) => {
    return (
        <Card>
            <CardBody>
                <SurveyQuestionHead questionDetail={question} />
                {
                    <>
                        {question.type == surveyQuestionType.OPEN_ANSWER &&
                            <CompiledOpenAnswer compiledAnswers={question.compiledAnswers} />}

                        {question.type == surveyQuestionType.SINGLE_ANSWER &&
                            <CompiledSingleAnswer compiledAnswers={question.compiledAnswers} />}

                        {question.type == surveyQuestionType.MULTIPLE_ANSWERS &&
                                <CompiledMultipleAnswer compiledAnswers={question.compiledAnswers} />}

                        {question.type == surveyQuestionType.BOOLEAN &&
                            <CompiledBooleanAnswer compiledAnswers={question.compiledAnswers} props={props} />}

                        {question.type == surveyQuestionType.RATING &&
                            <CompiledRatingAnswer compiledAnswers={question.compiledAnswers} properties={question.properties} />}

                        {question.type == surveyQuestionType.MOOD &&
                            <CompiledMoodAnswer compiledAnswers={question.compiledAnswers} />}
                    </>
                }
            </CardBody>
        </Card>
    );
}

export default SurveyCompiledAnswerCard;