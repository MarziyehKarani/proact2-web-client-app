import React from 'react';
import { useTimer } from "reactjs-countdown-hook";

const Countdown = ({ durationInSeconds, onTimerFinish }) => {

    const {
        seconds,
        minutes,
    } = useTimer(durationInSeconds, onTimerFinish);

    return (
        <>
            {(minutes && seconds) ?
                <>{minutes}.{seconds}</>
                :
                <></>
            }
        </>
    );
}

export default Countdown;