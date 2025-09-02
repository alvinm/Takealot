import { IonIcon, IonLabel } from '@ionic/react';
import { analytics, apps, home} from 'ionicons/icons';
import { useState,useEffect, useRef } from 'react';
import Highcharts, { isNumber } from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'

const AreaChart = (props:any) =>{
    const [getChart, setChart]              = useState<any>()
    const [getState, setState]              = useState<any>()
    var prevState:any;
const drawChart = (data:any)=>{
    let lineChart:any = {
        chart: {
            type: "areaspline"
        },
        title:{
        text:''
        },
        subTitle:{
            text:''
        },
        xAxis: {
            type: 'datetime'
        },
        series: [{
            name: props.name,
            data: props.data,
            color: props.color,
            fill: props.fillColor
        }],

        responsive: {
            rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal'
                },
                yAxis: {
                labels: {
                    align: 'left',
                    x: 0,
                    y: -5
                },
                title: {
                    text: null
                }
                },
                subtitle: {
                text: null
                },
                credits: {
                enabled: false
                }
            }
            }]
        }
    }
    let c:any = (<HighchartsReact highcharts={Highcharts} options={lineChart}></HighchartsReact>)
    setChart(c)
}
useEffect(() => {
    console.log(props.data)
    
    setState(()=>{
        if(props.data != prevState){
            prevState = null
            drawChart(props.data)
        }}
    )
    
}, [props.data]); 
return(
    <div>
        {getChart}
    </div>
)
}

export default AreaChart