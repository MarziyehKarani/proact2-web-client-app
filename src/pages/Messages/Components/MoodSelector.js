import React from 'react';
import { useState, useEffect } from 'react';
import moodVeryBadBtnImg from "../../../assets/images/messages/btn_moodVeryBad.png";
import moodBadBtnImg from "../../../assets/images/messages/btn_moodBad.png";
import moodGoodBtnImg from "../../../assets/images/messages/btn_moodGood.png";
import moodVeryGoodBtnImg from "../../../assets/images/messages/btn_moodVeryGood.png";

import messageMood from "../../../constants/messageMood";

const MoodSelector = ({ onMoodChange }) => {

    const [mood, setMood] = useState(messageMood.NONE);

    const unselectedMoodClass = "mx-2";
    const selectedMoodClass = "mx-2 border border-warning";

    const [veryBadClass, setVeryBadClass] = useState(unselectedMoodClass);
    const [BadClass, setBadClass] = useState(unselectedMoodClass);
    const [goodClass, setGoodClass] = useState(unselectedMoodClass);
    const [veryGoodClass, setVeryGoodClass] = useState(unselectedMoodClass);

    useEffect(() => {
        if (mood >= 0) {
            updateUI();
            onMoodChange(mood);
        }
    }, [mood]);

    function updateUI() {
        unselectAll();
        switch (mood) {
            case messageMood.VERY_BAD:
                setVeryBadClass(selectedMoodClass);
                break;
            case messageMood.BAD:
                setBadClass(selectedMoodClass);
                break;
            case messageMood.GOOD:
                setGoodClass(selectedMoodClass);
                break;
            case messageMood.VERY_GOOD:
                setVeryGoodClass(selectedMoodClass);
                break;
        }
    }

    function unselectAll() {
        setVeryBadClass(unselectedMoodClass);
        setBadClass(unselectedMoodClass);
        setGoodClass(unselectedMoodClass);
        setVeryGoodClass(unselectedMoodClass);
    }

    function onMoodClick(selectedMood){
        if(selectedMood == mood){
            setMood(messageMood.NONE);
        }
        else{
            setMood(selectedMood);
        }
    }


    return (
        <>
            <a  onClick={() => onMoodClick(messageMood.VERY_BAD)}>
                <img
                    src={moodVeryBadBtnImg}
                    height="80px"
                    width="80px"
                    className={veryBadClass}
                />
            </a>
            <a  onClick={() => onMoodClick(messageMood.BAD)}>
                <img
                    src={moodBadBtnImg}
                    height="80px"
                    width="80px"
                    className={BadClass}
                />
            </a>
            <a  onClick={() => onMoodClick(messageMood.GOOD)}>
                <img
                    src={moodGoodBtnImg}
                    height="80px"
                    width="80px"
                    className={goodClass}
                />
            </a>
            <a  onClick={() => onMoodClick(messageMood.VERY_GOOD)}>
                <img
                    src={moodVeryGoodBtnImg}
                    height="80px"
                    width="80px"
                    className={veryGoodClass}
                />
            </a>
        </>
    );
}

export default MoodSelector;