import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts';
import React from "react";

const PieChart = (props:any) =>{
    const options = {
        chart: {
            type: "pie",
        },
        title: {
            text:  props.chart_name+' Compliance',
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)",
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.y}",
                },
            },
        },
        series: [
            {
                name: "Count",
                colorByPoint: true,
                data: [
                    { name: "Compliant",    y: props.data.compliant/1, color: "#28a745" },
                    { name: "Warning",      y: props.data.warning/1, color: "#ffc107" },
                    { name: "Expired",      y: props.data.expired/1, color: "#dc3545" },
                ],
            },
        ],
    };

    return(
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    )

}
export default PieChart