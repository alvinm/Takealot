import { IonIcon, IonLabel } from '@ionic/react';
import { analytics, apps, home} from 'ionicons/icons';
import { useState,useEffect, useRef } from 'react';
import Highcharts, { isNumber } from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official';
import React from 'react'

const BasicLineChart = (props:any) =>{
    const [getChart, setChart]              = useState<any>()
    const [getState, setState]              = useState<any>()
    var prevState:any;

    const drawChart = (data:any) =>{
        let lineChart:any = {
            chart: {
                type: "spline"
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
            plotOptions: { 
                series: {
                    point: {
                        events: {
                            click: function(event:any) {
                                //console.log(event.point[event.point.name][0])
                                
                                console.log(event.point.options.x)
                                console.log(event.point.options.y)
                                props.result(event.point.options)
                                //setAccountForProfile(event.point[event.point.name][0])
                                
                                //callSummaryDetail(o[0])
                                //.then(response=>{return response})
                                //.then(data =>{
                                //    console.log(data)
                                //    props.setSummaryDetailTableData(data)
                                //    //setCharts(false)
                                //    //setTable1(true)
                                //    //setTable2(false)
                                //})
                                //if (previousPoint) {
                                //    previousPoint.update({ color: '#7cb5ec' });
                                //}
                                //previousPoint = this;
                                //this.update({ color: '#fe5800' });
                            }
                        }
                    }
                }
            },
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

export default BasicLineChart