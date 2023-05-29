import React from 'react';
import veryBadMoodImage from "../../assets/images/messages/moodVeryBad.png";
import BadMoodImage from "../../assets/images/messages/moodBad.png";
import goodMoodImage from "../../assets/images/messages/moodGood.png";
import veryGoodMoodImage from "../../assets/images/messages/moodVeryGood.png";
import messageMood from '../../constants/messageMood';

const MessageMoodIcon = ({ mood, height }) => {
    switch (mood) {
        case messageMood.VERY_BAD:
            return (
                <img
                    src={veryBadMoodImage}
                    alt="Mood message"
                    height={height}
                />
            );
        case messageMood.BAD:
            return (
                <img
                    src={BadMoodImage}
                    alt="Mood message"
                    height={height}
                />
            );
        case messageMood.GOOD:
            return (
                <img
                    src={goodMoodImage}
                    alt="Mood message"
                    height={height}
                />
            );
        case messageMood.VERY_GOOD:
            return (
                <img
                    src={veryGoodMoodImage}
                    alt="Mood message"
                    height={height}
                />
            );

        case messageMood.NONE:
        default:
            return ("");
    }
}

export default MessageMoodIcon;