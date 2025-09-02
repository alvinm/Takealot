import React, { useEffect, useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { formatDateFromMillis } from "../GlobalFunctions/Functions";

interface ChartProp{
    chart_type          :string,
    main_title_text     :string,
    x_axis_title_text   :string,
    y_axis_text         :string,
    series_name         :string,
    series              :[],
    x_axis_type         :string,
    result              :{},
    max_value           :string,
    min_value           :string
}

const ColumnChart : React.FC<ChartProp> = (props:any) =>{
    const [isMounted, setIsMounted] = useState(false);
    Highcharts.setOptions({
        time: {
            useUTC: true
        } as any
    });
    const chartOptions = {
            chart: {
                type: props.chart_type
            },
            title: {
                text: props.main_title_text
            },
            xAxis: {
                title: {text:props.x_axis_title},
                type:props.x_axis_type
            },
            yAxis: {
                min: props.min_value,
                max: props.max_value,
                title: {
                text: props.y_axis_text
                }, 
                plotLines: [{
                    color: 'red',      // line color
                    dashStyle: 'Dash', // style (Solid, Dash, Dot, etc)
                    width: 2,          // thickness
                    value: 99,         // Y position (your KPI target)
                    label: {
                        text: 'KPI Target: 99%',
                        align: 'right',
                        style: { color: 'red', fontWeight: 'bold' }
                    },
                    zIndex: 5
                }]
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                            click: function(event:any) {
                                console.log(event.point.options.x)
                                console.log(event.point.options.y)
                                props.result(formatDateFromMillis(event.point.options.x))
                            }
                        }
                    },
                    zones: [{
                        value: 99,  // everything BELOW 80
                        color: 'red'
                    }, {
                        value: 99.6,  // everything BELOW 80
                        color: 'orange'
                    },{
                        color: '#0070C0' // everything ABOVE or EQUAL to 80
                    }
                ]
                }
            },
            series: [{
                name:props.series_name,
                data:props.series
        }]
        };
    useEffect(() => {
        setIsMounted(true);
    }, [props]);
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} ></HighchartsReact>
        </div>
    );
}
export default ColumnChart
