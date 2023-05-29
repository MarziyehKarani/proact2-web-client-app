import React from 'react';
import SurveyQuestionHead from './SurveyQuestionHead';
import surveyQuestionType from '../../../constants/surveyQuestionType';
import { Card, CardBody } from 'reactstrap';
import {
    NotCompiledOpenAnswer,
    NotCompiledSingleAnswer,
    NotCompiledMultipleAnswer,
    NotCompiledBooleanAnswer,
    NotCompiledRatingAnswer,
    NotCompiledMoodAnswer
} from './NotCompiledAnswers';

const SurveyQuestionCard = ({ props, question, addCompiledQuestion }) => {
    return (
        <Card>
            <CardBody>
                <SurveyQuestionHead questionDetail={question} />
                {
                    <>
                        {question.type == surveyQuestionType.OPEN_ANSWER &&
                            <NotCompiledOpenAnswer
                                question={question}
                                addCompiledQuestion={addCompiledQuestion} />}

                        {question.type == surveyQuestionType.SINGLE_ANSWER &&
                            <NotCompiledSingleAnswer
                                question={question}
                                addCompiledQuestion={addCompiledQuestion} />}

                        {question.type == surveyQuestionType.MULTIPLE_ANSWERS &&
                            <NotCompiledMultipleAnswer
                                question={question}
                                addCompiledQuestion={addCompiledQuestion} />}

                        {question.type == surveyQuestionType.BOOLEAN &&
                            <NotCompiledBooleanAnswer
                                props={props}
                                question={question}
                                addCompiledQuestion={addCompiledQuestion} />}

                        {question.type == surveyQuestionType.RATING &&
                            <NotCompiledRatingAnswer
                                question={question}
                                addCompiledQuestion={addCompiledQuestion} />}

                        {question.type == surveyQuestionType.MOOD &&
                            <NotCompiledMoodAnswer
                                question={question}
                                addCompiledQuestion={addCompiledQuestion} />}
                    </>
                }
            </CardBody>
        </Card>
    );
}

export default SurveyQuestionCard;