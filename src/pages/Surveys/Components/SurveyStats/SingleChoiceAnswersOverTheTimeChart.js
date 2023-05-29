import React from 'react';
import { toLocalDate } from '../../../../helpers/formattedDatetime';

const SingleChoiceAnswersOverTheTimeChart = ({ questionStats }) => {
    return (
        <div className="">
            <ul className="verti-timeline list-unstyled">
                {questionStats.answers.map((answer, key) => (
                    <li key={key} className="event-list">
                        <div className="event-date text-primar">
                            <small>{toLocalDate(answer.date)}</small>
                        </div>
                        <p className="text-muted"><i className="fas fa-dot-circle me-2"></i>{answer.answers.length > 0 && answer.answers[0]}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SingleChoiceAnswersOverTheTimeChart;