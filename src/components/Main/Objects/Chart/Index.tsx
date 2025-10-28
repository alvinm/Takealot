import { IonCol, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import ColumnChart from "../../../Charts/ColumnChart";
import { formatDateTime, HighchartsDate } from "../../../GlobalFunctions/Functions";
interface chartParams{
    state:[],
    params:[],
    late:number,
    failed:number,
    driver_key:number,
    result:{}
}
const DeliveryChart :React.FC<chartParams> = (props:any) =>{
    const [seriesData, setSeriesData]                       = useState<any>()
    const [minValue, setMinValue]                           = useState<any>(0)
    const [maxValue, setMaxValue]                           = useState<any>(100)
    const [dailySpinner, showDailySpinner]                  = useState<any>()
    const [startDate, setStartDate]                          = useState<any>('2025-06-01')
        const [endDate, setEndDate]                              = useState<any>('2025-06-30')
    let Controller = new AbortController();
    const callFactDeliveriesDaily = () =>{
            // Abort any ongoing request
            Controller.abort();
            showDailySpinner(true)
            // Create a new AbortController for this request
            Controller = new AbortController();
            fetch(props.state.secondary_host+'getData?dbo=select_fact_deliveries_daily'+
                '&start_date				='+props.params.start_date+
                '&end_date					='+props.params.end_date+
                '&hub_key					='+props.params.hub_key+
                '&driver_key				='+props.params.driver_key+
                '&schedule_performance_key	='+props.params.schedule_performance_key+
                '&delivery_status_key		='+props.params.delivery_status_key+
                '&order_type_key			='+props.params.order_type_key+
                '&order_status_key			='+props.params.order_status_key
            )
            .then((response) => response.json())
            .then(data=>{
                // Extract all pct values
                const pctValues = data.map((item:any) => item.on_time_pct/1).filter((val:any) => val !== 0);;
    
                // Find min and max
                const minValue = Math.min(...pctValues);
                const maxValue = Math.max(...pctValues);
                setMinValue(minValue)
                setMaxValue(maxValue)
                var series:any = []
                data.map((x:any)=>{
                    console.log(formatDateTime(x.date_key))
                    series.push([
                        HighchartsDate(formatDateTime(x.date_key)),
                        x.on_time_pct
                    ])
                })
                console.log(series)
                setSeriesData(series)
                showDailySpinner(false)
            }) 
    }
    useEffect(()=>{
        callFactDeliveriesDaily()
    },[props])
    return(
        <div>
            <IonRow>
                <IonCol>
                    <ColumnChart
                        chart_type="column"
                        main_title_text='Schedule Performance By Day'
                        x_axis_type="datetime"
                        x_axis_title_text='Time Line'
                        y_axis_text='% On Time'
                        series_name='Performance'
                        series = {seriesData}
                        min_value={minValue}
                        max_value={maxValue}
                        result={(e:any)=>{
                            console.log(e); 
                            props.result(e)
                        }}
                    />
                </IonCol>
            </IonRow>
        </div>
    )
}
export default DeliveryChart