import React from 'react';
import { Button } from 'reactstrap';
import messageMood from '../../../constants/messageMood';
import moodVeryBadBtnImg from "../../../assets/images/messages/btn_moodVeryBad.png";
import moodBadBtnImg from "../../../assets/images/messages/btn_moodBad.png";
import moodGoodBtnImg from "../../../assets/images/messages/btn_moodGood.png";
import moodVeryGoodBtnImg from "../../../assets/images/messages/btn_moodVeryGood.png";

const CompiledOpenAnswer = ({ compiledAnswers }) => {
    var value = "";
    if (compiledAnswers && compiledAnswers.length > 0) {
        value = compiledAnswers[0].value;
    }

    return (
        <h5><small className='text-muted'>{value}</small></h5>
    );
}

const CompiledSingleAnswer = ({ compiledAnswers }) => {
    var value = "";
    if (compiledAnswers && compiledAnswers.length > 0) {
        value = compiledAnswers[0].value;
    }
    return (
        <h5><i className="fas fa-dot-circle me-2 text-primary"></i><small className='text-muted'>{value}</small></h5>
    );
}

const CompiledMultipleAnswer = ({ compiledAnswers }) => {
    return (
        <div>
            {compiledAnswers &&
                compiledAnswers.map((answer, idx) => (
                    <h5 key={idx}><i className="fas fa-check-square me-2 text-info"></i><small className='text-muted'>{answer.value}</small></h5>
                ))}
        </div>
    );
}

const CompiledBooleanAnswer = ({ props, compiledAnswers }) => {
    var value = "";
    if (compiledAnswers && compiledAnswers.length > 0) {
        value = compiledAnswers[0].value;
    }
    return (
        <Button
            disabled
            outline
            color={value === "true" ? "success" : "danger"} >
            {props.t(value)}
        </Button>
    );
}

const CompiledRatingAnswer = ({ compiledAnswers, properties }) => {
    var value = "";
    if (compiledAnswers && compiledAnswers.length > 0) {
        value = `${compiledAnswers[0].value}/${properties.max}`;
    }

    return (
        <Button
            disabled
            outline
            color="info" >
            {value}
        </Button>
    );
}

const CompiledMoodAnswer = ({ compiledAnswers }) => {
    var value = messageMood.NONE;
    var moodImage;

    if (compiledAnswers && compiledAnswers.length > 0) {
        value = compiledAnswers[0].value;
    }

    switch (value) {
        case messageMood.VERY_BAD.toString():
            moodImage = moodVeryBadBtnImg;
            break;
        case messageMood.BAD.toString():
            moodImage = moodBadBtnImg;
            break;
        case messageMood.GOOD.toString():
            moodImage = moodGoodBtnImg;
            break;
        case messageMood.VERY_GOOD.toString():
            moodImage = moodVeryGoodBtnImg;
            break;

        default:
            break;
    }

    return (
        <img
            src={moodImage}
            height="80px"
            width="80px"
        />
    );
}

export {
    CompiledOpenAnswer,
    CompiledMultipleAnswer,
    CompiledSingleAnswer,
    CompiledBooleanAnswer,
    CompiledRatingAnswer,
    CompiledMoodAnswer
};