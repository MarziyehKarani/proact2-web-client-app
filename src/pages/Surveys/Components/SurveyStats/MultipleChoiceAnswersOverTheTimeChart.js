import React from 'react';
import { toLocalDate } from '../../../../helpers/formattedDatetime';

const MultipleChoiceAnswersOverTheTimeChart = ({ questionStats }) => {
    return (
        <div>
            <ul className="verti-timeline list-unstyled">
                {questionStats.answers.map((answer, key) => (
                    <li key={key} className="event-list">
                        <div className="event-date text-primar">
                            <small>{toLocalDate(answer.date)}</small>
                        </div>
                        {
                            answer.answers.map((item, key) => (
                                <div key={key} className="text-muted">
                                    <i className="fas fa-check-square me-2"></i>{item}
                                </div>
                            ))
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MultipleChoiceAnswersOverTheTimeChart;