import { IonIcon, IonLabel } from '@ionic/react';
import { analytics, apps, home} from 'ionicons/icons';
import React,{ useState,useEffect, useRef } from 'react';
import Highcharts, { isNumber } from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

const LineSeriesChart = (props:any) =>{
    const [getChart, setChart]              = useState<any>()
    const drawChart = (data:any) =>{
        console.log(data)
        let lineChart:any = {
            chart:{
                type: 'line'
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
            series:data,

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
        drawChart(props.data)

    }, [props.data]);
    return(
        <div>
            {getChart}
        </div>
    )
}

export default LineSeriesChart