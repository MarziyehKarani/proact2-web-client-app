import React from 'react';
import surveyQuestionType from '../../../../constants/surveyQuestionType';
import BoolAnswerStatsOverTimeChart from './BoolAnswerStatsOverTimeChart';
import MoodAnswerStatsOverTheTimeChart from './MoodAnswerStatsOverTheTimeChart';
import MultipleChoiceAnswersOverTheTimeChart from './MultipleChoiceAnswersOverTheTimeChart';
import OpenAnswerStatsOverTheTimeChart from './OpenAnswerStatsOverTheTimeChart';
import RatingAnswerStatsOverTheTimeChart from './RatingAnswersOverTheTimeChart';
import SingleChoiceAnswersOverTheTimeChart from './SingleChoiceAnswersOverTheTimeChart';


const SurveyStatsOverTheTime = ({ props, questionStats }) => {

    function renderSwitch(questionStats) {

        switch (questionStats.type) {
            case surveyQuestionType.OPEN_ANSWER:
                return <OpenAnswerStatsOverTheTimeChart questionStats={questionStats} />
            case surveyQuestionType.SINGLE_ANSWER:
                return <SingleChoiceAnswersOverTheTimeChart questionStats={questionStats} />
            case surveyQuestionType.MULTIPLE_ANSWERS:
                return <MultipleChoiceAnswersOverTheTimeChart questionStats={questionStats} />
            case surveyQuestionType.BOOLEAN:
                return <BoolAnswerStatsOverTimeChart props={props} questionStats={questionStats} />
            case surveyQuestionType.MOOD:
                return <MoodAnswerStatsOverTheTimeChart props={props} questionStats={questionStats} />
            case surveyQuestionType.RATING:
                return <RatingAnswerStatsOverTheTimeChart props={props} questionStats={questionStats} />
            default:
                return ""
        }
    }

    return (
        <>
            {renderSwitch(questionStats)}
        </>
    );
}

export default SurveyStatsOverTheTime;