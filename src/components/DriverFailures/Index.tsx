import { IonCol, IonImg, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import DriverDeliveryStatusListFailed from "../DriverManagement/DriverStatusList/DriverDeliveryStatusListFailed";
import DateSlider from "../Objects/DateSlider/DateSlider";
import PieChart2 from "../Charts/PieChart2";
import { PieChart } from "recharts";
import PieChart3 from "../Charts/PieChart3";
import CustomSimpleBarChart from "../Charts/CustomBarChart";

const DriverFailures = (props:any) =>{
    const [selected, setSelected]                           = useState<any>(6)
    const [startDate, setStartDate]                          = useState<any>('2025-06-01')
    const [endDate, setEndDate]                              = useState<any>('2025-06-30')
    const [minDate, setMinDate]                              = useState<any>('2025-06-01')
    const [maxDate, setDate]                                 = useState<any>('2025-06-30')
    const [month, setMonth]                                  = useState<any>(0)
    const [year,setYear]                                     = useState<any>('2025')

    const [orderStatusData, setOrderStatusData]              = useState<any>([])
    const [deliveryStatusData, setDeliveryStatusData]        = useState<any>([])
    const [hubKey, setHubKey]                                = useState<any>(119)
    const [hubName, setHubName]                              = useState<any>('')
    const [driverKey, setDriverKey]                          = useState<any>(0)
    const [driverName, setDriverName]                        = useState<any>('')
    const [driverLate, setDriverLate]                        = useState<any>(0)
    const [driverFailed, setDriverFailed]                    = useState<any>(0)
    const [schedulePerfomanceKey, setSchedulePerformanceKey]    = useState<any>(0)
    const [deliveryStatusKey, setDeliveryStatusKey]             = useState<any>(0)
    const [orderTypeKey, setOrderTypeKey]                    = useState<any>(0)
    const [orderStatusKey, setOrderStatus]                   = useState<any>(0)
    const [failedDelivery, setFailedDelivery]                = useState<any>(0)
    const [lateDelivery, setLateDelivery]                    = useState<any>(0) 
    const [dateSlider, showDateSlider]                      = useState<any>()
    const [params, setParams]                               = useState<any>({
                                                                        start_date                  :startDate,
                                                                        end_date                    :endDate,
                                                                        hub_key                     :hubKey,
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
                        d.push({name:x.delivery_status_desc, y:x.failed/1, hub_key:x.hub_key, hub:x.hub, id:x.country_id, branch_id:x.hub_key/1, value:x.failed/1})
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
                        d.push({name:x.order_status_desc, y:x.failed/1, hub_key:x.hub_key, hub:x.hub, id:x.country_id, branch_id:x.hub_key/1, value:x.failed/1})
                        //console.log(x.failed/(Math.max(...data.map((hub:any) => Math.max(hub.failed/1)))))
                    ))
                    console.log(d)
                    setOrderStatusData(d)
                    
                }) 
    }
    useEffect(()=>{
        switch(month){
            case 1 : setStartDate(year+'-01-01');setEndDate(year+'-01-31');setSelected(1);break;
            case 2 : setStartDate(year+'-02-01');setEndDate(year+'-02-28');setSelected(2);break;
            case 3 : setStartDate(year+'-03-01');setEndDate(year+'-03-31');setSelected(3);break;
            case 4 : setStartDate(year+'-04-01');setEndDate(year+'-04-30');setSelected(4);break;
            case 5 : setStartDate(year+'-05-01');setEndDate(year+'-05-31');setSelected(5);break;
            case 6 : setStartDate(year+'-06-01');setEndDate(year+'-06-30');setSelected(6);break;
            case 7 : setStartDate(year+'-07-01');setEndDate(year+'-07-31');setSelected(7);break;
            case 8 : setStartDate(year+'-08-01');setEndDate(year+'-08-31');setSelected(8);break;
            case 9 : setStartDate(year+'-09-01');setEndDate(year+'-09-30');setSelected(9);break;
            case 10 : setStartDate(year+'10-01');setEndDate(year+'-10-31');setSelected(10);break;
            case 11 : setStartDate(year+'11-01');setEndDate(year+'-11-30');setSelected(11);break;
            case 12 : setStartDate(year+'12-01');setEndDate(year+'-12-31');setSelected(12);break;
        }
    },[month])
        
    const handleDateChange = (range: { startDate: string; endDate: string }) => {
        console.log("Selected Range Parent:", range);
        setMonth(0)
        setStartDate(range.startDate)
        setEndDate(range.endDate)
    };
    useEffect(()=>{
        callOrderStatus()
        callFactDeliveryStatusSummary()
    },[driverKey])
    useEffect(()=>{
        callOrderStatus()
        callFactDeliveryStatusSummary()
    },[props])
    return(
        <div>
            <div style={{overflowY:"auto"}} className="ion-padding">
            <div style={{position:"fixed",top:"1vh",width:"85%"}}>
                <IonRow>
                    <IonCol size='3'>
                        <IonRow className='ion-padding'>
                            <IonCol className='ion-padding' onClick={()=>{}}>
                                <IonImg src="../../public/images/IntelRock.JPG" style={{width:"200px"}}></IonImg>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="6" className="ion-text-center">
                        {dateSlider &&
                            <DateSlider
                                minDate={new Date('2025-04-01')}
                                maxDate={new Date(maxDate)}
                                onChange={handleDateChange}
                            />
                        }
                    </IonCol>
                    <IonCol size="2"></IonCol>
                </IonRow>
            </div>
            <IonRow><IonCol></IonCol></IonRow>
            <IonRow><IonCol></IonCol></IonRow>
            <IonRow><IonCol></IonCol></IonRow>
            <IonRow>
                <IonCol size="8">
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
                    <div className="ion-padding" style={{border:"0.5px solid #eee", borderRadius:"10px", height:"70vh",overflowY:"auto"}}>
                        <DriverDeliveryStatusListFailed
                            state={props.state}
                            params={params}
                            driver_key={(e:any)=>{setDriverKey(e)}}
                            driver_name = {(e:any)=>{setDriverName(e)}}
                            call_fact_deliveries_detail={(e:any)=>{/** */}}
                        />
                    </div>
                </IonCol>
            </IonRow>
        </div>
    </div>
    )
}
export default DriverFailures 