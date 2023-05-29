import React from 'react';
import { toLocalDate } from '../../../../helpers/formattedDatetime';
import ReactApexChart from "react-apexcharts"
import { Badge } from 'reactstrap';

const BoolAnswerStatsOverTimeChart = ({ props, questionStats }) => {

    function getValues(questionStats) {
        var values = [];
        questionStats.answers.forEach(element => {
            var value = element.answers.length > 0 ? element.answers[0] : 0;
            var valueAsInt = value == "true" ? 1 : 0;
            values.push(valueAsInt);
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
        { name: props.t("BoolAnswer"), data: getValues(questionStats) }
    ]

    const options = {
        chart: { toolbar: { show: false } },
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
            min: 0,
            max: 1
        }
    }

    return (
        <>
            <h5>
                1: <Badge className='me-2' color='success'>{props.t("True")}</Badge>
                0: <Badge color='danger'>{props.t("False")}</Badge>
            </h5>
            <ReactApexChart
                options={options}
                series={series}
                type="line"
                height="380"
                className="apex-charts"
            />
        </>
    )
}

export default BoolAnswerStatsOverTimeChart;