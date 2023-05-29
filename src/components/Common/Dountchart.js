import React from "react"
import ReactApexChart from "react-apexcharts"

const Dountchart = ({values, labels}) => {
  const options = {
    labels: labels,
    colors: [
      "#34c38f",
      "#5b73e8",
      "#f1b44c",
      "#50a5f1",
      "#f46a6a",
      "#61b4c6",
      "#316c4f",
      "#b11814",
      "#6fb66e",
      "#4513d6",
      "#24ab06",
      "#e904fd",
      "#7bb5a0",
      "#6b188b",
      "#8e5599"],
    legend: {
      show: !0,
      position: 'bottom',
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      floating: !1,
      fontSize: '14px',
      offsetX: 0
    },
    responsive: [{
      breakpoint: 600,
      options: {
        chart: {
          height: 240
        },
        legend: {
          show: !1
        },
      }
    }]
  }

  return (
    <ReactApexChart
      options={options}
      series={values}
      type="donut"
      height="320"
      className="apex-charts"
    />
  )
}

export default Dountchart
