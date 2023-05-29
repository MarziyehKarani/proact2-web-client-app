import React from 'react';
import { toLocalDate } from '../../../../helpers/formattedDatetime';
import ReactApexChart from "react-apexcharts"
import moodVeryBadBtnImg from "../../../../assets/images/messages/btn_moodVeryBad.png";
import moodBadBtnImg from "../../../../assets/images/messages/btn_moodBad.png";
import moodGoodBtnImg from "../../../../assets/images/messages/btn_moodGood.png";
import moodVeryGoodBtnImg from "../../../../assets/images/messages/btn_moodVeryGood.png";

const MoodAnswerStatsOverTheTimeChart = ({ props, questionStats }) => {

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
        { name: props.t("MoodAnswer"), data: getValues(questionStats) }
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
            min: 0,
            max: 3
        }
    }

    return (
        <>
            <h5>
                3: <img src={moodVeryGoodBtnImg} width="50px" />
                2: <img src={moodGoodBtnImg} width="50px" />
                1: <img src={moodBadBtnImg} width="50px" />
                0: <img src={moodVeryBadBtnImg} width="50px" />
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

export default MoodAnswerStatsOverTheTimeChart;