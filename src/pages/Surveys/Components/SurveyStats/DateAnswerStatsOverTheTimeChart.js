import React from 'react';

import { toLocalDate, toGlobalFormatDate } from '../../../../common/formattedDatetime';

const DateAnswerStatsOverTheTimeChart = ({ questionStats }) => {
    return (
        <div className="">
            <ul className="verti-timeline list-unstyled">
                {questionStats.answers.map((answer, key) => (
                    <li key={key} className="event-list">
                        <div className="event-date text-primar">
                            <small>{toLocalDate(answer.date)}</small>
                        </div>
                        <p className="text-muted">{answer.answers.length > 0 && toGlobalFormatDate(answer.answers[0])}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DateAnswerStatsOverTheTimeChart;