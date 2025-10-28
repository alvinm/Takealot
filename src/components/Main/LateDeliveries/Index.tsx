import { IonCol, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import MonthSelector from "../Objects/Months/Index";
import DriverDeliveryStatusListLate from "../../DriverManagement/DriverStatusList/DriverDeliveryStatusListLate";
import DeliveryChart from "../Objects/Chart/Index";
import CustomSimpleBarChart from "../../Charts/CustomBarChart";

const LateHome = (props:any) =>{
    const [startDate, setStartDate]                             = useState<any>('2025-06-01')
    const [endDate, setEndDate]                                 = useState<any>('2025-06-30')
    const [hubKey, setHubKey]                                   = useState<any>(119)
    const [driverKey, setDriverKey]                             = useState<any>(0)
    const [driverName, setDriverName]                           = useState<any>('')
    const [orderTypeKey, setOrderTypeKey]                       = useState<any>(0)
    const [orderStatusKey, setOrderStatus]                      = useState<any>(0)
    const [schedulePerfomanceKey, setSchedulePerformanceKey]    = useState<any>(0)
    const [deliveryStatusKey, setDeliveryStatusKey]             = useState<any>(0)
    const [orderStatusData, setOrderStatusData]              = useState<any>([])
    const [deliveryStatusData, setDeliveryStatusData]        = useState<any>([])
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
    const callFactDeliveryStatusSummary = () =>{
            // Abort any ongoing request
            Controller.abort();
    
            // Create a new AbortController for this request
            Controller = new AbortController();
            fetch(props.state.secondary_host+'getData?dbo=select_fact_deliveries_status_summary'+
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
                var d:any = []
                data.map((x:any)=>(
                        d.push({name:x.delivery_status_desc, y:x.late/1, hub_key:x.hub_key, hub:x.hub, id:x.country_id, branch_id:x.hub_key/1, value:x.late/1})
                    ))
                console.log(d)
                setDeliveryStatusData(d)
            }) 
        }
    const callOrderStatus = () =>{
        fetch(props.state.secondary_host+'getData?dbo=select_fact_order_status_summary'+
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
                    var d:any = []
                    data.map((x:any)=>(
                        d.push({name:x.order_status_desc, y:x.late/1, hub_key:x.hub_key, hub:x.hub, id:x.country_id, branch_id:x.hub_key/1, value:x.late/1})
                        //console.log(x.failed/(Math.max(...data.map((hub:any) => Math.max(hub.failed/1)))))
                    ))
                    console.log(d)
                    setOrderStatusData(d)
                    
                }) 
    }
    useEffect(() => {
        setParams({
            start_date: startDate,
            end_date: endDate,
            hub_key: hubKey,
            driver_key: driverKey,
            schedule_performance_key: schedulePerfomanceKey,
            delivery_status_key: deliveryStatusKey,
            order_type_key: orderTypeKey,
            order_status_key: orderStatusKey,
        });
        callFactDeliveryStatusSummary()
        callOrderStatus()
    },  [
            startDate,
            endDate,
            hubKey,
            driverKey,
            schedulePerfomanceKey,
            deliveryStatusKey,
            orderTypeKey,
            orderStatusKey
        ]
    )
    ;

    useEffect(()=>{
        /** */
    },[props])
    return(
        <div>
            <IonRow>
                <IonCol size="7">
                    <IonRow>
                        <IonCol>
                            <MonthSelector
                                result={(e:any)=>{
                                    setStartDate(e.start_date)
                                    setEndDate(e.end_date)
                                }}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <DeliveryChart
                                state={props.state}
                                params={params}
                                late={1}
                                failed={0}
                                driver_key={driverKey}
                                result={(e:any)=>{setStartDate(e);setEndDate(e)}}
                            />
                        </IonCol>   
                    </IonRow>
                    <IonRow >
                        <IonCol className="ion-padding" size="6">
                            <CustomSimpleBarChart
                                data={deliveryStatusData}
                                header="DELIVERIES BY STATUS"
                                chart_column_1="DELIVERY METRIC"
                                chart_column_2=""
                                chart_column_3="COUNT"
                                branch={hubKey}
                                result={(e:any)=>{setHubKey(e.hub_key);}}
                            />
                        </IonCol>
                        <IonCol size="6" className="ion-padding" >
                            <CustomSimpleBarChart
                                data={orderStatusData}
                                header="ORDERS BY STATUS"
                                chart_column_1="ORDER METRIC"
                                chart_column_2=""
                                chart_column_3="COUNT"
                                branch={hubKey}
                                result={(e:any)=>{setHubKey(e.hub_key);}}
                            />
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <DriverDeliveryStatusListLate
                        state={props.state}
                        params={params}
                        driver_key={(e:any)=>{setDriverKey(e)}}
                        driver_name = {(e:any)=>{setDriverName(e)}}
                        call_fact_deliveries_detail={(e:any)=>{/** */}}
                        result={(e:any)=>{/** */}}
                    />
                </IonCol>
            </IonRow>
        </div>
    )
}
export default LateHome