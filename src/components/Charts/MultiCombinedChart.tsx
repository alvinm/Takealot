import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useEffect, useState } from 'react';

// Define types for props
//interface MultiCombinedChartProps {
//    chart_name: string;
//    series: any[]; // Define specific types for series if possible
//    xAxisType: string;
//    xAxis?: any[]; // Optional if categories are passed
//    result:any ;
//}

const MultiCombinedChart = (props:any) => {
    const chartOptions = {
        title: {
            text: props.chart_name
        },
        subTitle: {
            text: 'Your SubTitle Here' // You can dynamically populate this if needed
        },
        xAxis: {
            type:'datetime', // Use 'datetime' by default
            //categories: props.xAxis  // Only include categories if passed
        },
        yAxis: [{ // Primary Y-Axis
            title: {
              text: 'Sales'
            }
          }, { // Secondary Y-Axis for CoS
            title: {
              text: 'Cost of Sales'
            },
            opposite: true
          }],
        series: props.series,
        plotOptions: { 
            series: {
                point: {
                    events: {
                        click: function(e:any) {
                            console.log(e.point.x)
                            let date = new Date(e.point.x); // Convert timestamp to Date object
                            let formattedDate = Highcharts.dateFormat('%Y-%m-%d', e.point.x);
                            alert('Selected Date: ' + formattedDate);
                            console.log('Selected Date:', formattedDate);
                            props.result(formattedDate)
                            
                        }
                    }
                }
            }
        },
    };
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} ></HighchartsReact>
        </div>
    );
};

export default MultiCombinedChart;
