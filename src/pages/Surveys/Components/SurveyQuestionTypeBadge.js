import React from 'react';
import { Badge } from 'reactstrap';
import surveyQuestionType from '../../../constants/surveyQuestionType'

const SurveyQuestionTypeBadge = ({ props, questionType }) => {
    function renderQuestionType(questionType) {
        switch (questionType) {
            case surveyQuestionType.OPEN_ANSWER:
                return props.t("OpenAnswer")
            case surveyQuestionType.SINGLE_ANSWER:
                return props.t("SingleAnswer")
            case surveyQuestionType.MULTIPLE_ANSWERS:
                return props.t("MultipleAnswer")
            case surveyQuestionType.BOOLEAN:
                return props.t("BoolAnswer")
            case surveyQuestionType.RATING:
                return props.t("RatingAnswer")
            case surveyQuestionType.MOOD:
                return props.t("MoodAnswer")
            case surveyQuestionType.NUMERIC:
                return props.t("NumericAnswer")
            default:
              return ""
        }
    }

    return ( 
        <h5><Badge pill color='light'>{renderQuestionType(questionType)}</Badge></h5>
     );
}

export default SurveyQuestionTypeBadge;