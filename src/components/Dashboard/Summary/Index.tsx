import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { addCommas } from "../../GlobalFunctions/Functions";
import CounterContainer from "../Objects/CounterContainer";
import DayRAGRow from "../Objects/DAYRAG";
import MonthSelector from "../../Main/Objects/Months/Index";

const DashbordSummary = (props:any) =>{
    const monthData1 = [
        [{status:"G",dw:18}, {status:"A",dw:2}, {status:"R",dw:3}, {status:"G",dw:4}, {status:"G",dw:5}, {status:"A",dw:6}, {status:"N",dw:7}],
        [{status:"A",dw:1}, {status:"G",dw:2}, {status:"G",dw:3}, {status:"R",dw:4}, {status:"A",dw:5}, {status:"G",dw:6}, {status:"N",dw:7}],
        [{status:"R",dw:1}, {status:"A",dw:2}, {status:"G",dw:3}, {status:"G",dw:4}, {status:"G",dw:5}, {status:"A",dw:6}, {status:"N",dw:7}],
        [{status:"G",dw:1}, {status:"G",dw:2}, {status:"A",dw:3}, {status:"R",dw:4}, {status:"G",dw:5}, {status:"A",dw:6}, {status:"N",dw:7}],
    ];
    const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [year, setYear]                                       = useState<any>(2025)
    const [month, setMonth]                                     = useState<any>(9)
    const [startDate, setStartDate]                             = useState<any>('2025-06-01')
    const [endDate, setEndDate]                                 = useState<any>('2025-06-30')
    const [hubKey, setHubKey]                                   = useState<any>(119)
    const [driverKey, setDriverKey]                             = useState<any>(0)
    const [driverName, setDriverName]                           = useState<any>('')
    const [orderTypeKey, setOrderTypeKey]                       = useState<any>(0)
    const [orderStatusKey, setOrderStatus]                      = useState<any>(0)
    const [schedulePerfomanceKey, setSchedulePerformanceKey]    = useState<any>(0)
    const [deliveryStatusKey, setDeliveryStatusKey]             = useState<any>(0)
    const [orderStatusData, setOrderStatusData]                 = useState<any>([])
    const [deliveryStatusData, setDeliveryStatusData]           = useState<any>([])
    const [monthData, setMonthData]                             = useState<any>([])
    const [params, setParams]                                   = useState<any>({
                                                                    start_date                  :startDate,
                                                                    end_date                    :endDate,
                                                                    hub_key                     :hubKey,
                                                                    driver_key                  :driverKey,
                                                                    schedule_performance_key    :schedulePerfomanceKey,
                                                                    delivery_status_key         :deliveryStatusKey,
                                                                    order_type_key              :orderTypeKey,
                                                                    order_status_key            :orderStatusKey
                                                                })
    let Controller = new AbortController();
    const [onTime, setOnTime]                                = useState<any>(0)
    const [onTimePCT, setOnTimePCT]                          = useState<any>(0)
    const [late, setLate]                                    = useState<any>(0)
    const [failed, setFailed]                                = useState<any>(0)
    const [performance, setPerformance]                      = useState<any>(0)
    const [performanceFailed, setPerformanceFailed]          = useState<any>(0)
    const [driverCount, setDriverCount]                      = useState<any>(0)
    const [driverAvailableCount, setDriverAvailableCount]    = useState<any>(0)
    const [driverForecastedCount, setDriverForecastedCount]  = useState<any>(0)
    const callSummaryMilkRun = () =>{
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getAdminData?dbo=select_summary_milkrun'+
            '&target_year				='+year+
            '&target_month			    ='+month+
            '&hub_key					='+hubKey
        )
        .then((response) => response.json())
        .then((data)=>{
            var m:any = []
            data.forEach((week:any) => {
                
                console.log(week)
                console.log(week.weekNo)
                const days = JSON.parse(week.days); 
                console.log(days)
                var w:any = [days]
                console.log(w[0])
                m.push(w[0])
                days.forEach((day:any) => {
                    //console.log(day) 
                    //console.log(day.name, day.day, day.status);
                    // render 7 squares per week
                });
            });
            console.log(m)
            setMonthData(m)
        })
    }
    const callFactDeliveries = () =>{
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_fact_deliveries'+
            '&start_date				='+startDate+
            '&end_date					='+endDate+
            '&hub_key					='+hubKey+
            '&driver_key				='+driverKey+
            '&schedule_performance_key	='+schedulePerfomanceKey+
            '&delivery_status_key		='+deliveryStatusKey+
            '&order_type_key			='+orderTypeKey+
            '&order_status_key			='+orderStatusKey
        )
        .then((response) => response.json())
        .then(data=>{
            setLate(addCommas(data[0].late/1))
            setFailed(addCommas(data[0].failed/1))
            setOnTime(addCommas(data[0].on_time/1))
            setPerformance((100 -(((data[0].late/1)/(data[0].on_time/1))*100)).toFixed(2))
            setPerformanceFailed(((((data[0].failed/1)/(data[0].on_time/1))*100)).toFixed(2))
            setOnTimePCT(addCommas(data[0].on_time_pct/1))
            setDriverCount(data[0].driver_count)
            setDriverAvailableCount(data[0].driver_available_count)
            setDriverForecastedCount(data[0].driver_forecasted_count)
        }) 
    }
    useEffect(()=>{
        setHubKey(props.hub_key)
        callFactDeliveries()
        callSummaryMilkRun()
    },[])
    return(
        <div>
        <IonRow>
            <IonCol size="6"></IonCol>
            <IonCol>
                <MonthSelector
                    year="2025"
                    month="9"
                    result={(e:any)=>{setMonth(e.month); setYear(e.year)}}
                />
            </IonCol>
        </IonRow>
        <IonRow style={{height:"85vh"}}>
            <IonCol className="ion-padding" style={{borderRight:"1px solid #ddd"}}>
                
                <IonRow style={{borderBottom:"3px solid #0070C0"}}>
                    <IonCol className="ion-text-bold size-24">PERFORMANCE</IonCol>
                </IonRow>
                <IonRow  style={{borderBottom:"1px solid #ddd"}}>
                    <CounterContainer
                        header="Late Deliveries"
                        top_line_name="Performance"
                        top_line_value={performance+'%'}
                        middle_line_name="Deliveries on time"
                        middle_line_value={onTime}
                        bottom_line_name="Late"
                        bottom_line_value={late}
                        size="4"
                        id={1}
                        result={(e:any)=>{/** */}}
                    />
                    <CounterContainer
                        header="recruitment"
                        top_line_name="FORECASTED DRIVERS"
                        top_line_value={driverForecastedCount}
                        middle_line_name="DRIVERS UTILISED"
                        middle_line_value={driverCount}
                        bottom_line_name="Drivers Available"
                        bottom_line_value={driverAvailableCount}
                        size="4"
                        id={1}
                        result={(e:any)=>{/** */}}
                    />
                    <CounterContainer
                        header="FAILED"
                        top_line_name="Failed Deliveries"
                        top_line_value={performanceFailed+'%'}
                        middle_line_name="Deliveries Performed"
                        middle_line_value={onTime}
                        bottom_line_name="Failed"
                        bottom_line_value={failed}
                        size="4"
                        id={1}
                        result={(e:any)=>{/** */}}
                    />
                </IonRow>
                <IonRow>
                    <IonCol className="ion-text-bold size-24" >
                        <IonRow className="ion-padding" style={{borderRight:"1px solid #ddd", borderBottom:"3px solid #0070C0"}}>
                            <IonCol>AUDIT STATUS SUMMARY</IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol className="ion-text-bold size-24">
                        <IonRow className="ion-padding" style={{borderBottom:"3px solid #0070C0"}}>
                            <IonCol>HR STATUS SUMMARY</IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonCol>
            <IonCol className="ion-padding" style={{borderRight:"1px solid #ddd"}}>
                <IonRow style={{height:"auto"}}>
                    <IonCol className="ion-text-bold size-24 ">
                        <IonRow style={{borderBottom:"3px solid #0070C0"}} >
                            <IonCol>MILK RUN SUMMARY</IonCol>
                        </IonRow>
                        
                        <IonRow>
                            <IonCol size="2"></IonCol>
                            <IonCol style={{}} className="size-20">
                                {dayLabels.map((x:any, i:number)=>{
                                    return(
                                        <div key={i} className="ion-padding" style={{float:"left",width:"85px", height:"25px"}}>
                                            {x}
                                        </div>
                                    )
                                })}
                            </IonCol>
                            <IonCol size="2"></IonCol>
                        </IonRow>
                        <IonRow>
                            {monthData &&
                            <IonCol size="8">
                                {monthData.map((week:any, i:number) => (
                                    <DayRAGRow key={i} weekData={week} />
                                ))}
                            </IonCol>
                            }
                            <IonCol size="4" class="size-16">
                                <IonRow>
                                    <IonCol>
                                        <div style={{height:"20px",width:"20px",backgroundColor:"#0070C0"}}></div>
                                    </IonCol>
                                    <IonCol>ALL GOOD</IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <div style={{height:"20px",width:"20px",backgroundColor:"#f1c40f"}}></div>
                                    </IonCol>
                                    <IonCol>INFRINGEMENT</IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <div style={{height:"20px",width:"20px",backgroundColor:"#e74c3c"}}></div>
                                    </IonCol>
                                    <IonCol>RETURNS</IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonCol>
            
        </IonRow>
    </div>
    )
}
export default DashbordSummary 