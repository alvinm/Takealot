import { IonCol, IonRow, IonSpinner } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { addCommas } from "../../GlobalFunctions/Functions";

const DriverDeliveryStatusListLate = (props:any) =>{
    const [driverKey,setDriverKey]              = useState<any>(0)
    const [driverSpinner, showDriverSpinner]    = useState<any>()
    const [driverList, setDriverList]           = useState<any>()

    let Controller = new AbortController();
    const callFactDeliveriesDriver = () =>{
        showDriverSpinner(true)
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_fact_deliveries_driver'+
            '&start_date				='+props.params.start_date+
            '&end_date					='+props.params.end_date+
            '&hub_key					='+props.params.hub_key+
            '&driver_key				='+driverKey+
            '&schedule_performance_key	='+props.params.schedule_performance_key+
            '&delivery_status_key		='+props.params.delivery_status_key+
            '&order_type_key			='+props.params.order_type_key+
            '&order_status_key			='+props.params.order_status_key
        )
        .then((response) => response.json())
        .then(data=>{
        
            var list:any = data.map((x:any, i:number)=>{
                var total:any = (x.on_time/1)+(x.early/1)+(x.failed/1)
                return(
                    <IonRow 
                        key={i}
                        className=" size-16 "
                        style={{marginBottom:"5px",}}
                        
                    >
                        <IonCol size="3" className='ion-text-hover' 
                            onClick={()=>{
                                props.driver_name(x.driver_name)
                                setDriverKey(x.driver_key)
                            }}>
                            <div 
                                style={{
                                width:"24px",
                                height:"24px", 
                                borderRadius:"24px", 
                                fontWeight:"bold",
                                background:(((x.late/1)/(total/1)*100) > 0.75 && (x.late/1)/(x.total/1)*100 < 1) ? "orange": ((x.late/1)/(x.total/1)*100) > 1? "red":"", 
                                float:"left"
                            }}></div>&nbsp;&nbsp;
                            {x.driver_name}
                        </IonCol>
                        <IonCol className='ion-text-right'>{addCommas(x.on_time/1)}</IonCol>
                        
                        <IonCol 
                            className='ion-text-right ion-text-hover'
                            onClick={()=>{
                                props.driver_name(x.driver_name)
                                var y:any = []
                                y.push({late:1, failed:0, driver_key:x.driver_key})
                                props.call_fact_deliveries_detail(y[0])
                            }}
                            style={{
                                color:(((x.late/1)/(total/1)*100) > 0.75 && (x.late/1)/(total/1)*100 < 1) ? "orange": ((x.late/1)/(x.total/1)*100) > 1? "red":"",
                            }}    
                        >{addCommas(x.late/1)}</IonCol>
                        <IonCol className='ion-text-right'>{((x.late/1)/(total)*100).toFixed(2)}</IonCol>
                    </IonRow>
                )
            })
            setDriverList(list)
            showDriverSpinner(false)
        }) 
    }
    useEffect(()=>{
        props.driver_key(driverKey)
    },[driverKey])
    useEffect(()=>{
        callFactDeliveriesDriver()
    },[props])
    return(
        <div>
            <IonRow>
                <IonCol>
                    <IonRow style={{backgroundColor:"#0070C0"}}>
                        <IonCol size="3"className='size-16 ion-text-center ion-text-bold text-white' style={{color:"#fff"}}>
                                Driver &nbsp;&nbsp;
                            {driverSpinner &&<IonSpinner className='size-28'></IonSpinner>}
                        </IonCol>
                        <IonCol style={{fontSize:"16px", padding:"15px",color:"#fff",fontWeight:"bold"}} className="ion-text-right">On Time</IonCol>
                        <IonCol style={{fontSize:"16px", padding:"15px",color:"#fff",fontWeight:"bold"}} className="ion-text-right">Late</IonCol>
                        <IonCol style={{fontSize:"16px", padding:"15px",color:"#fff",fontWeight:"bold"}} className="ion-text-right">% Late</IonCol>
                    </IonRow>
                    {(driverKey != 0)  &&
                    <IonRow>
                        <IonCol>
                            <div 
                                onClick={()=>{setDriverKey(0)}}
                                className='size-24 ion-text-center ion-text-bold ion-text-hover'
                                style={{backgroundColor:"#000",borderRadius:"30px", height:"60px", width:"auto", padding:"15px", color:"#fff", opacity:"0.6"}}
                            >All Drivers</div>
                        </IonCol>
                        <IonCol style={{fontSize:"28px", padding:"15px",color:"#0070C0",fontWeight:"bold"}} className="ion-text-right"></IonCol>
                        <IonCol style={{fontSize:"28px", padding:"15px",color:"#0070C0",fontWeight:"bold"}} className="ion-text-right"></IonCol>
                        <IonCol style={{fontSize:"28px", padding:"15px",color:"#0070C0",fontWeight:"bold"}} className="ion-text-right"></IonCol>
                    </IonRow>
                    }
                    <div style={{overflowY:"auto",height:"80vh"}}>
                        {driverList}
                    </div>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default DriverDeliveryStatusListLate