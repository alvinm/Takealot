import { IonCol, IonRow } from "@ionic/react";
import React, { useState } from "react";
import ColumnChart from "../../Charts/ColumnChart";
import { formatDateTime, HighchartsDate } from "../../GlobalFunctions/Functions";

const DeliveryDetails = (props:any) =>{
    const [selected, setSelected]               = useState<any>(1)
    const [failedDelivery, setFailedDelivery]   = useState<any>(0)
    const [lateDelivery, setLateDelivery]       = useState<any>(0) 
    const [driverName, setDriverName]           = useState<any>()
    const [deliveryStatusList, setDeliveryStatusList]       = useState<any>()
    const [orderStatusList, setOrderStatusList]             = useState<any>()
    const [deliveryDetailList, setDeliveryDetailList]       = useState<any>()
    const [seriesDataDetail, setSeriesDataDetail]           = useState<any>()
    const [chart, showChart]                                = useState<any>()
    const [minValue, setMinValue]                           = useState<any>('2025-06-01')
    const [maxValue, setMaxValue]                           = useState<any>('2025-06-30')

    let Controller = new AbortController();
    
    const callFactDeliveriesDetail = (late:any, failed:any, driver_key:any) =>{
        //setView(2)
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_delivery_detail'+
            '&start_date				='+props.params.start_date+
            '&end_date					='+props.params.end_date+
            '&hub_key					='+props.params.hub_key+
            '&driver_key				='+props.params.driver_key+
            '&schedule_performance_key	='+props.params.schedule_performance_key+
            '&delivery_status_key		='+props.params.delivery_status_key+
            '&order_type_key			='+props.params.order_type_key+
            '&order_status_key			='+props.params.order_status_key+
            "&late                      ="+late+
            "&failed                    ="+failed
        )
        .then((response) => response.json())
        .then(data=>{
            var list = data.map((x:any,i:number)=>{
                return(
                    <IonRow key={i} className="ion-row-hover"
                        onClick={()=>{/*setDeliveryStatusKey(x.delivery_status_key)*/}}
                    >
                        <IonCol className='size-16 ion-text-bold ion-text-left' size="">{x.client}</IonCol>
                        <IonCol className='size-16 ion-text-center' size="">{(x.scheduled_date)}<br/>{(x.schedule_before)}</IonCol>
                        <IonCol className='size-16 ion-text-center' size="">{(x.mdx)}<br/>{(x.exp)}</IonCol>
                        {(late/1 != 0 || late/1==failed/1 ) &&
                            <IonCol className='size-16 ion-text-center' size="">{(x.schedule_performance)}</IonCol>
                        }
                        {(failed/1 != 0 || late/1==failed/1) &&
                            <IonCol className='size-16 ion-text-center' size="">{(x.failed_date)}</IonCol>
                        }
                        <IonCol className='size-16 ion-text-left' size="">{(x.reason_desc)}</IonCol>
                    </IonRow>
                )
            })
            setDeliveryDetailList(list)
        }) 
    }
        
    return(
        <div>
            <IonRow className="ion-text-bold" style={{backgroundColor:"#0070C0",borderRadius:"20px",color:"#fff"}}>
                <IonCol className='size-16 ion-text-bold ion-text-left' size="">Client</IonCol>
                <IonCol className='size-16 ion-text-center' size="">Sched. Date <br/>Sched. Time</IonCol>
                <IonCol className='size-16 ion-text-center' size="">MDX<br/>EXP</IonCol>
                {(lateDelivery != 0 || lateDelivery == failedDelivery) &&
                    <IonCol className='size-16 ion-text-center' size="">Schedule <br/> Performance</IonCol>
                }

                {(failedDelivery != 0 || lateDelivery == failedDelivery) &&
                    <IonCol className='size-16 ion-text-center' size="">Failed</IonCol>
                }
                <IonCol className='size-16 ion-text-left' size="">Reason</IonCol>
            </IonRow>
            {deliveryDetailList}
        </div>
    )
}
export default DeliveryDetails