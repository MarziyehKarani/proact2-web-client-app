import React from 'react';
import { toLocalDate } from '../../../../helpers/formattedDatetime';
import ReactApexChart from "react-apexcharts"

const RatingAnswerStatsOverTheTimeChart = ({ props, questionStats }) => {

    function getValues(questionStats) {
        var values = [];
        questionStats.answers.forEach(element => {
            var value = element.answers.length > 0 ? element.answers[0] : 0;
            values.push(value);
        });
        return values;
    }

    function getDates(questionStats) {
        var values = [];
        questionStats.answers.forEach(element => {
            var date = toLocalDate(element.date);
            values.push(date);
        });

        return values;
    }

    const series = [
        { name: props.t("RatingAnswer"), data: getValues(questionStats) }
    ]

    const options = {
        chart: { toolbar: { show: !1 } },
        colors: ['#5b73e8'],
        dataLabels: {
            enabled: !1,
        },
        stroke: {
            width: [3, 3],
            curve: 'straight'
        },
        markers: {
            style: 'inverted',
            size: 6
        },
        xaxis: {
            categories: getDates(questionStats),
        },
        yaxis:
        {
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                }
            },
            min: questionStats.properties.min,
            max: questionStats.properties.max
        }
    }

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="line"
            height="380"
            className="apex-charts"
        />
    )
}

export default RatingAnswerStatsOverTheTimeChart;