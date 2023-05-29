import React from 'react';
import Dountchart from '../../../../components/Common/Dountchart';

const SurveuDounutStats = ({answers}) => {

    function getValues(answers) {
        var values = [];
        answers.forEach(element => {
            values.push(element.count);
        });
        return values;
    }

    function getLabels(answers) {
        var labels = [];
        answers.forEach(element => {
            labels.push(element.value);
        });
        return labels;
    }

    return (
        <Dountchart
            values={getValues(answers ? answers : [])}
            labels={getLabels(answers ? answers : [])} />
    );
}

export default SurveuDounutStats;