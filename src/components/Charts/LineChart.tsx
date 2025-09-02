import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useState } from 'react';

const LineChart = (props:any) =>{
    const options = {
        chart: {
          type: 'spline', // Choose the chart type (line, bar, pie, etc.)
          //type: props.lineType
        },
        //title: {
        //  text: 'Sales Analysis',
        //  //text: props.xTitle
        //},
        xAxis: {
            type: 'datetime',
          //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          //categories: props.x,

        },
        yAxis: {
          title: {
            text: 'Sales in USD',
            //text:props.yTitle
          },
        },
        series: [
          {
            name: 'Sales',
            //name:props.seriesName,
            //data: [120, 200, 150, 250, 320, 180, 270], // Sales data
            data: props.data,
          },
        ],
      };
    return(
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
    )
}
export default LineChart