import { IonCol, IonRow, IonSpinner } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { addCommas } from "../../GlobalFunctions/Functions";

const DriverDeliveryStatusListFailed = (props:any) =>{
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
            var stripe = 0
            var list:any = data.map((x:any, i:number)=>{
                var total = (x.late/1 + x.on_time/1 + x.failed/1)
                if (stripe == 0){   
                    stripe = 1
                }else{
                    stripe = 0
                }

                return(
                    <IonRow 
                        key={i}
                        className=" size-16 "
                        style={{marginBottom:"0px", backgroundColor:stripe == 1?"#eef":""}}
                        
                    >
                        <IonCol 
                            
                            className='ion-text-hover' 
                            style={{color:"#999", borderRight:"4px solid #0070C0",height:"40px"}}
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
                                background:(((x.failed/1)/(total/1)*100) > 4 && (x.failed/1)/(total/1)*100 < 5) ? "orange": ((x.failed/1)/(total/1)*100) >= 5? "red":"", 
                                float:"left"
                            }}></div>&nbsp;&nbsp;
                            {x.driver_name.toUpperCase()}
                        </IonCol>
                        <IonCol size="2" className='ion-text-right'>{addCommas(x.on_time/1)}</IonCol>
                        <IonCol 
                            size="2"
                            className='ion-text-right ion-text-hover'
                            onClick={()=>{
                                props.driver_name(x.driver_name)
                                var y:any = []
                                y.push({late:1, failed:0, driver_key:x.driver_key})
                                props.call_fact_deliveries_detail(y[0])
                            }}
                            style={{
                                color:(((x.failed/1)/(total/1)*100) > 4 && (x.failed/1)/(total/1)*100 < 5) ? "orange": ((x.failed/1)/(total/1)*100) >= 5? "red":"",
                            }}    
                        >{addCommas(x.failed/1)}</IonCol>
                        
                        <IonCol  
                            size="2" 
                            className='ion-text-right'
                        >{((x.failed/1)/(total/1)*100).toFixed(2)}</IonCol>
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
                    <IonRow>
                        <IonCol className='size-20 ion-text-left' style={{color:'#0070C0'}}>
                            <b>DRIVER FAILURE </b>
                        </IonCol>
                        <IonCol size="3">
                            {(driverKey != 0)  &&
                                <div 
                                    onClick={()=>{setDriverKey(0)}}
                                    className='size-16 ion-text-center ion-text-bold ion-text-hover'
                                    style={{backgroundColor:"#eef",borderRadius:"30px", height:"60px", width:"auto", padding:"15px", color:"#0070C0",}}
                                >
                                    VIEW ALL
                                </div>
                            }
                        </IonCol>
                    </IonRow>
                    <IonRow style={{borderBottom:"3px solid #0070C0", /*borderTop:"2px solid #0070C0"*/}}>
                        <IonCol className='size-18 ion-text-left ion-text-bold text-white ion-padding' style={{color:"#0070C0"}}>
                            DRIVER
                            {driverSpinner &&<IonSpinner className='size-28'></IonSpinner>}
                        </IonCol>
                        <IonCol size="2" style={{fontSize:"18px", padding:"15px",color:"#0070C0",fontWeight:"bold"}} className="ion-text-right ion-padding"><b>ON TIME</b></IonCol>
                        <IonCol size="2" style={{fontSize:"18px", padding:"15px",color:"#0070C0",fontWeight:"bold"}} className="ion-text-right ion-padding"><b>FAILED</b></IonCol>
                        <IonCol size="2" style={{fontSize:"18px", padding:"15px",color:"#0070C0",fontWeight:"bold"}} className="ion-text-right ion-padding"><b>%</b></IonCol>
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
                        <IonCol style={{fontSize:"20px", padding:"15px",color:"#0070C0",fontWeight:"bold"}} className="ion-text-right"></IonCol>
                        <IonCol style={{fontSize:"20px", padding:"15px",color:"#0070C0",fontWeight:"bold"}} className="ion-text-right"></IonCol>
                        <IonCol style={{fontSize:"20px", padding:"15px",color:"#0070C0",fontWeight:"bold"}} className="ion-text-right"></IonCol>
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
export default DriverDeliveryStatusListFailed