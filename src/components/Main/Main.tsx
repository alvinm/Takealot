import React, { useCallback, useEffect, useState } from 'react'
import { addCommas, formatDateTime, getLocation, HighchartsDate } from '../GlobalFunctions/Functions'
import { IonButton, IonCol, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonSelect, IonSelectModal, IonSelectOption, IonSpinner } from '@ionic/react'
import ColumnChart from '../Charts/ColumnChart'
import { dateTimeFormat } from 'highcharts'
import DateSlider from '../Objects/DateSlider/DateSlider'
import { alarmOutline, alarmSharp, alertCircleSharp, checkmarkCircleSharp } from 'ionicons/icons'


const Main = (props:any) =>{
    const [startDate, setStartDate]             = useState<any>('2025-06-01')
    const [endDate, setEndDate]                 = useState<any>('2025-06-30')
    const [minDate, setMinDate]                 = useState<any>('2025-06-01')
    const [maxDate, setDate]                    = useState<any>('2025-06-30')
    const [month, setMonth]                     = useState<any>(0)
    const [year,setYear]                        = useState<any>('2025')
    
    const [hubKey, setHubKey]                   = useState<any>(119)
    const [hubName, setHubName]                 = useState<any>('')
    const [driverKey, setDriverKey]             = useState<any>(0)
    const [driverName, setDriverName]           = useState<any>('')
    const [driverLate, setDriverLate]           = useState<any>(0)
    const [driverFailed, setDriverFailed]       = useState<any>(0)
    const [schedulePerfomanceKey, setSchedulePerformanceKey]    = useState<any>(0)
    const [deliveryStatusKey, setDeliveryStatusKey]             = useState<any>(0)
    const [orderTypeKey, setOrderTypeKey]       = useState<any>(0)
    const [orderStatusKey, setOrderStatus]      = useState<any>(0)
    const [failedDelivery, setFailedDelivery]   = useState<any>(0)
    const [lateDelivery, setLateDelivery]       = useState<any>(0)     

    const [onTime, setOnTime]                   = useState<any>(0)
    const [onTimePCT, setOnTimePCT]             = useState<any>(0)
    const [late, setLate]                       = useState<any>(0)
    const [performance, setPerformance]         = useState<any>(0)
    const [driverCount, setDriverCount]         = useState<any>(0)
    const [driverAvailableCount, setDriverAvailableCount]       = useState<any>(0)
    const [driverForecastedCount, setDriverForecastedCount]     = useState<any>(0)

    const [seriesData, setSeriesData]           = useState<any>()
    const [seriesDataDetail, setSeriesDataDetail]           = useState<any>()
    const [xAxisCategories, setXAxisCategories] = useState<any>()
    const [driverList, setDriverList]           = useState<any>()
    const [deliveryStatusList, setDeliveryStatusList]       = useState<any>()
    const [orderStatusList, setOrderStatusList]             = useState<any>()
    const [hubList, setHubList]                             = useState<any>()
    const [deliveryDetailList, setDeliveryDetailList]       = useState<any>()

    const [chart, showChart]                    = useState<any>()
    const [dateSlider, showDateSlider]          = useState<any>()
    const [driverSpinner, showDriverSpinner]    = useState<any>()
    const [dailySpinner, showDailySpinner]      = useState<any>()
    const [main, showMain]                      = useState<any>(true)
    const [detail, showDetail]                  = useState<any>(false)

    const [selected, setSelected]               = useState<any>(6)

    const [minValue, setMinValue]               = useState<any>(0)
    const [maxValue, setMaxValue]               = useState<any>(100)

    let Controller = new AbortController();

    const callFactDeliveriesDetail = (late:any, failed:any, driver_key:any) =>{
        setView(2)
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_delivery_detail'+
            '&start_date				='+startDate+
            '&end_date					='+endDate+
            '&hub_key					='+hubKey+
            '&driver_key				='+driver_key+
            '&schedule_performance_key	='+schedulePerfomanceKey+
            '&delivery_status_key		='+deliveryStatusKey+
            '&order_type_key			='+orderTypeKey+
            '&order_status_key			='+orderStatusKey+
            "&late                      ="+late+
            "&failed                    ="+failed
        )
        .then((response) => response.json())
        .then(data=>{
            var list = data.map((x:any,i:number)=>{
                return(
                    <IonRow key={i} className="ion-row-hover"
                        onClick={()=>{setDeliveryStatusKey(x.delivery_status_key)}}
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
            setLateDelivery(late)
            setFailedDelivery(failed)
            setDriverKey(driver_key)

            var series:any = []
            data.map((x:any)=>{
                console.log(formatDateTime(x.scheduled_date))
                series.push([
                    HighchartsDate(formatDateTime(x.scheduled_date)),
                    x.count
                ])
            })
            console.log(series)
            setSeriesDataDetail(series)
            callFactDeliveriesDetailDaily(late, failed, driver_key) 
        }) 

    }
    const callFactDeliveriesDetailDaily = (late:any, failed:any, driver_key:any) =>{
        setView(2)
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_delivery_detail_daily'+
            '&start_date				='+startDate+
            '&end_date					='+endDate+
            '&hub_key					='+hubKey+
            '&driver_key				='+driver_key+
            '&schedule_performance_key	='+schedulePerfomanceKey+
            '&delivery_status_key		='+deliveryStatusKey+
            '&order_type_key			='+orderTypeKey+
            '&order_status_key			='+orderStatusKey+
            "&late                      ="+late+
            "&failed                    ="+failed
        )
        .then((response) => response.json())
        .then(data=>{
            // Extract all pct values
            const pctValues = data.map((item:any) => item.count/1).filter((val:any) => val !== 0);;

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
                    x.count
                ])
            })
            console.log(series)
            setSeriesDataDetail(series)
        }) 

    }
    const callDimHub = () =>{
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_dim_hubs')
        .then((response) => response.json())
        .then(data=>{
            /** */
            var list:any = data.map((x:any, i:any)=>{
                return(
                    <IonSelectOption key={i} value={x.hub_key}>{x.name}</IonSelectOption>
                )
            })
            setHubList(list)
        }) 
    }

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
            var list = data.map((x:any,i:number)=>{
                return(
                    <IonRow key={i} className="ion-row-hover"
                        onClick={()=>{setDeliveryStatusKey(x.delivery_status_key)}}
                    >
                        <IonCol className='size-16 ion-text-bold ion-text-left' size="6">{x.delivery_status_desc}</IonCol>
                        <IonCol className='size-16 ion-text-right' size="">{addCommas(x.ontime/1)}</IonCol>
                        <IonCol className='size-16 ion-text-right' size="">{addCommas(x.late/1)}</IonCol>
                        <IonCol className='size-16 ion-text-right' size="">{addCommas(x.failed/1)}</IonCol>
                    </IonRow>
                )
            })
            setDeliveryStatusList(list)
        }) 
    }
    const callFactOrderStatusSummary = () =>{
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
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
            var list = data.map((x:any,i:number)=>{
                return(
                    <IonRow key={i} className="ion-row-hover"
                        onClick={()=>{setDeliveryStatusKey(x.delivery_status_key)}}
                    >
                        <IonCol className='size-16 ion-text-bold ion-text-left' size="6">{x.order_status_desc}</IonCol>
                        <IonCol className='size-16 ion-text-right' size="">{addCommas(x.ontime/1)}</IonCol>
                        <IonCol className='size-16 ion-text-right' size="">{addCommas(x.late/1)}</IonCol>
                        <IonCol className='size-16 ion-text-right' size="">{addCommas(x.failed/1)}</IonCol>
                    </IonRow>
                )
            })
            setOrderStatusList(list)
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
            setOnTime(addCommas(data[0].on_time/1))
            setPerformance((100 -(((data[0].late/1)/(data[0].on_time/1))*100)).toFixed(2))
            setOnTimePCT(addCommas(data[0].on_time_pct/1))
            setDriverCount(data[0].driver_count)
            setDriverAvailableCount(data[0].driver_available_count)
            setDriverForecastedCount(data[0].driver_forecasted_count)
        }) 
    }
    const callFactDeliveriesDaily = () =>{
        // Abort any ongoing request
        Controller.abort();
        showDailySpinner(true)
        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_fact_deliveries_daily'+
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
    const callFactDeliveriesDriver = () =>{
        showDriverSpinner(true)
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_fact_deliveries_driver'+
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
           
            var list:any = data.map((x:any, i:number)=>{
                return(
                    <IonRow 
                        key={i}
                        className=" size-16 "
                        style={{marginBottom:"5px",}}
                        
                    >
                        <IonCol size="3" className='ion-text-hover' 
                            onClick={()=>{
                                setDriverName(x.driver_name)
                                setDriverKey(x.driver_key)
                            }}>
                            <div 
                                style={{
                                width:"24px",
                                height:"24px", 
                                borderRadius:"24px", 
                                fontWeight:"bold",
                                background:(((x.late/1)/(x.on_time/1)*100) > 0.75 && (x.late/1)/(x.on_time/1)*100 < 1) ? "orange": ((x.late/1)/(x.on_time/1)*100) > 1? "red":"", 
                                float:"left"
                            }}></div>&nbsp;&nbsp;
                            {x.driver_name}
                        </IonCol>
                        <IonCol className='ion-text-right'>{addCommas(x.on_time/1)}</IonCol>
                        <IonCol 
                            className='ion-text-right ion-text-hover'
                            onClick={()=>{
                                setDriverName(x.driver_name)
                                callFactDeliveriesDetail(1,0,x.driver_key)
                            }}
                            style={{
                                color:(((x.late/1)/(x.on_time/1)*100) > 0.75 && (x.late/1)/(x.on_time/1)*100 < 1) ? "orange": ((x.late/1)/(x.on_time/1)*100) > 1? "red":"",
                            }}    
                        >{addCommas(x.early/1)}</IonCol>
                        <IonCol 
                            className='ion-text-right ion-text-hover'
                            onClick={()=>{
                                setDriverName(x.driver_name)
                                callFactDeliveriesDetail(1,0,x.driver_key)
                            }}
                            style={{
                                color:(((x.late/1)/(x.on_time/1)*100) > 0.75 && (x.late/1)/(x.on_time/1)*100 < 1) ? "orange": ((x.late/1)/(x.on_time/1)*100) > 1? "red":"",
                            }}    
                        >{addCommas(x.late/1)}</IonCol>
                        <IonCol 
                            className='ion-text-right ion-text-hover'
                            onClick={()=>{
                                setDriverName(x.driver_name)
                                callFactDeliveriesDetail(0,1, x.driver_key)
                            }}
                            style={{
                                color:(((x.late/1)/(x.on_time/1)*100) > 0.75 && (x.late/1)/(x.on_time/1)*100 < 1) ? "orange": ((x.late/1)/(x.on_time/1)*100) > 1? "red":"",
                            }}    
                        >{addCommas(x.failed/1)}</IonCol>
                        <IonCol className='ion-text-right'>{((x.late/1)/(x.on_time/1)*100).toFixed(2)}</IonCol>
                    </IonRow>
                )
            })
            setDriverList(list)
            showDriverSpinner(false)
        }) 
    }
    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 1 :
                showMain(true)
                callDimHub();
                callFactDeliveries();
                callFactDeliveriesDaily();
                callFactDeliveriesDriver();
                callFactDeliveryStatusSummary()
                break;
            case 2 :
                showDetail(true)
                callFactDeliveryStatusSummary()
                callFactOrderStatusSummary()
                break;
        }
    }
    
    const resetView = () =>{
        /** */
        showMain(false)
        showDetail(false)
    }
    useEffect(()=>{
        /** */
        if(detail){
            setView(2)
            callFactDeliveriesDetail(lateDelivery,failedDelivery,driverKey)
        }
    },[driverFailed])
    useEffect(()=>{
        /** */
       if(detail){
            setView(2)
            callFactDeliveriesDetail(lateDelivery,failedDelivery,driverKey)
        }
    },[driverLate])
    useEffect(()=>{
        if(main)
            setView(1)
        if(detail)
            setView(2)
    },[deliveryStatusKey])
    useEffect(()=>{
        if(main)
            setView(1)
        if(detail)
            setView(2)
    },[driverKey])
    useEffect(()=>{
        if(maxDate != null)
            showDateSlider(true)
    },[maxDate])
    useEffect(()=>{
    if (seriesData != null)
        showChart(true)
    },[seriesData])
    useEffect(()=>{
        if(main)
            setView(1)
        if(detail)
            setView(2)
    },[props])
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
    useEffect(()=>{
        console.log(startDate)
         if(main)
            setView(1)
        if(detail)
            setView(2)
    },[startDate])
    useEffect(()=>{
        console.log(endDate)
         if(main)
            setView(1)
        if(detail)
            setView(2)
    },[endDate])
    const handleDateChange = (range: { startDate: string; endDate: string }) => {
        console.log("Selected Range Parent:", range);
        setMonth(0)
        setStartDate(range.startDate)
        setEndDate(range.endDate)
    };
    return(
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
                        <IonCol size='1' className="ion-text-center ion-padding">
                            <IonItem>
                                <IonLabel>Selected</IonLabel>
                                <IonSelect 
                                    onChange={(e)=>{setHubKey(e.currentTarget.value)}}
                                    defaultValue={119}
                                >
                                    {hubList}
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </div>
            {main &&
            
            <IonRow>
                <IonCol size="6">
                    <IonRow>
                        <IonCol>
                            <div className={selected==1?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(1)}}>Jan</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==2?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(2)}}>Feb</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==3?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(3)}}>Mar</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==4?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(4)}}>Apr</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==5?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(5)}}>May</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==6?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(6)}}>Jun</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==7?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(7)}}>Jul</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==8?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(8)}}>Aug</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==9?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(9)}}>Sep</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==10?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(10)}}>Oct</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==11?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(11)}}>Nov</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==12?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(12)}}>Dec</div>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow>
                        <IonCol size="4"></IonCol>
                        <IonCol className="ion-text-center">
                            <IonRow className="ion-padding">
                                <IonCol size="3" className="">
                                    <div style={{width:"24px",height:"24px",borderRadius:"24px",border:"1px solid #ccc",backgroundColor:"white"}}></div>
                                </IonCol>
                                <IonCol className='ion-text-left'>ALL</IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol className="ion-text-center">
                            <IonRow className="ion-padding">
                                <IonCol size="3" className="">
                                    <div style={{width:"24px",height:"24px",borderRadius:"12px",border:"1px solid #fff",backgroundColor:"orange"}}></div>
                                </IonCol>
                                <IonCol className='ion-text-left'>Warning</IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol className="ion-text-center">
                            <IonRow className="ion-padding">
                                <IonCol size="3" className="">
                                    <div style={{width:"24px",height:"24px",borderRadius:"12px",border:"1px solid #fff",backgroundColor:"red"}}></div>
                                </IonCol>
                                <IonCol className='ion-text-left'>Breach</IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol></IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>}
            {main &&
            <IonRow>
                <IonCol 
                    className="ion-padding"
                    style={{borderRight:"3px solid #0070C0",height:"80vh"}}
                >
                    <IonRow 
                        className="ion-padding"
                        style={{borderBottom:"3px solid #0070C0",height:"42vh"}}
                    >
                        <IonCol size="12">
                            <IonRow>
                                <IonCol>
                                <IonLabel 
                                    className='size-24 ion-text-center ion-text-bold'
                                    style={{backgroundColor:"#0070C0",borderRadius:"30px", height:"60px", width:"auto", padding:"15px", color:"#fff"}}
                                >Daily Performance&nbsp;&nbsp;{dailySpinner &&<IonSpinner className='size-28'></IonSpinner>}
                                </IonLabel>
                                {chart &&
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
                                        result={(e:any)=>{console.log(e); setStartDate(e); setEndDate(e)}}
                                    />
                                }</IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-padding">
                        <IonCol size="6" className="ion-text-center ion-padding" >
                             <div className="ion-text-bold size-28 ion-text-left">Delivery Status Summary</div>
                             <div className="size-14 ion-text-left" style={{border:"0px solid #ccc", height:"20vh", width:"100%",borderRadius:"20px",marginLeft:"0%", overflowY:"auto"}}>
                                <div style={{}}>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonRow  className='ion-text-bold ' style={{backgroundColor:"#0070C0"}}>
                                            <IonCol size="6" style={{color:"#fff",}}className='size-16 ion-text-bold ion-text-left'>STATUS</IonCol>
                                            <IonCol size=""  style={{color:"#fff",}}className='size-16 ion-text-bold ion-text-right'>ON TIME</IonCol>
                                            <IonCol size=""  style={{color:"#fff",}}className='size-16 ion-text-bold ion-text-right'>LATE</IonCol>
                                            <IonCol size=""  style={{color:"#fff",}}className='size-16 ion-text-bold ion-text-right'>FAILED</IonCol>
                                        </IonRow>
                                        {deliveryStatusList}
                                    </IonCol>
                                </IonRow>
                                </div>
                             </div>
                        </IonCol>
                        <IonCol className="ion-text-center ion-padding">
                            <div className="ion-text-bold size-28">Late Deliveries</div>
                            <div style={{border:"1px solid #ccc", height:"20vh", width:"95%",borderRadius:"20px",marginLeft:"10%",overflowY:"auto"}}>
                                <IonRow>
                                    <IonCol style={{fontSize:'42px'}} className='ion-padding'>
                                        {performance}%
                                        <div style={{fontSize:'14px'}}>PERFORMANCE</div>
                                        <div style={{fontSize:'28px'}}>{onTime}</div>
                                        <div style={{fontSize:'14px'}}>DELIVERIES ON TIME</div>
                                        <div style={{fontSize:'32px',color:"red",fontWeight:"bold"}}>{late}</div>
                                        <div style={{fontSize:'14px'}}>LATE</div>
                                    </IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                        <IonCol className="ion-text-center ion-padding">
                            <div className="ion-text-bold size-28">Target Drivers</div>
                            <div style={{border:"1px solid #ccc", height:"20vh", width:"96%",borderRadius:"20px",marginLeft:"10%",overflowY:"auto"}}>
                                <IonRow>
                                    <IonCol style={{fontSize:'42px'}} className='ion-padding'>
                                        {driverForecastedCount}
                                        <div style={{fontSize:'14px'}}>FORECASTED DRIVERS</div>
                                        <div style={{fontSize:'28px'}}>{driverCount}</div>
                                        <div style={{fontSize:'14px'}}>DRIVERS UTILISED</div>
                                        <div style={{fontSize:'32px',color:"red",fontWeight:"bold"}}>{driverAvailableCount}</div>
                                        <div style={{fontSize:'14px'}}>DRIVERS AVAILABLE</div>
                                    </IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow>
                        <IonCol>
                            <IonRow style={{backgroundColor:"#0070C0"}}>
                                <IonCol size="3"className='size-16 ion-text-center ion-text-bold text-white' style={{color:"#fff"}}>
                                     Driver &nbsp;&nbsp;
                                    {driverSpinner &&<IonSpinner className='size-28'></IonSpinner>}
                                </IonCol>
                                <IonCol style={{fontSize:"16px", padding:"15px",color:"#fff",fontWeight:"bold"}} className="ion-text-right">On Time</IonCol>
                                <IonCol style={{fontSize:"16px", padding:"15px",color:"#fff",fontWeight:"bold"}} className="ion-text-right">Early</IonCol>
                                <IonCol style={{fontSize:"16px", padding:"15px",color:"#fff",fontWeight:"bold"}} className="ion-text-right">Late</IonCol>
                                <IonCol style={{fontSize:"16px", padding:"15px",color:"#fff",fontWeight:"bold"}} className="ion-text-right">Failed</IonCol>
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
                </IonCol>
            </IonRow>
            }
            {detail &&
            <div>
            
            <IonRow>
                {(lateDelivery != 0) &&
                <IonCol size="9" >
                    <div 
                        onClick={()=>{setLateDelivery(0);setDriverKey(0)}}
                        className='size-24 ion-text-center ion-text-bold ion-text-hover'
                        style={{backgroundColor:"#fff",borderRadius:"30px",border:"0px solid grey", height:"90px", width:"50%", padding:"15px", color:"#000"}}
                    >
                        Detail List For Status Late  
                        <div className="size-12 text-grey">({driverKey == 0? "All Drivers":driverName})</div>
                        <div className="size-12 text-grey">From {startDate} to {endDate}</div>
                    </div>
                </IonCol> 
                }
                {(failedDelivery != 0) &&
                <IonCol size="9" >
                    <div 
                        onClick={()=>{setFailedDelivery(0);setDriverKey(0)}}
                        className='size-24 ion-text-center ion-text-bold ion-text-hover'
                        style={{backgroundColor:"#fff",borderRadius:"30px",border:"0px solid grey", height:"90px", width:"50%", padding:"15px", color:"#000"}}
                    >
                        Detail List For Status Failed 
                    <div className="size-12 text-grey">({driverKey == 0? "All Drivers":driverName})</div>
                    <div className="size-12 text-grey">From {startDate} to {endDate}</div>
                    </div>
                </IonCol>
                }
                
            </IonRow>
            <IonRow style={{borderBottom:"3px solid #0070C0",marginBottom:"1vh"}}>
                <IonCol size="6">
                    <IonRow>
                        <IonCol>
                            <div className={selected==1?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(1)}}>Jan</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==2?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(2)}}>Feb</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==3?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(3)}}>Mar</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==4?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(4)}}>Apr</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==5?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(5)}}>May</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==6?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(6)}}>Jun</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==7?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(7)}}>Jul</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==8?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(8)}}>Aug</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==9?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(9)}}>Sep</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==10?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(10)}}>Oct</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==11?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(11)}}>Nov</div>
                        </IonCol>
                        <IonCol>
                            <div className={selected==12?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(12)}}>Dec</div>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol size="2">
                            <div 
                                onClick={()=>{setView(1)}}
                                className='size-24 ion-text-center ion-text-bold ion-text-hover'
                                style={{backgroundColor:"#0070C0",borderRadius:"30px", height:"60px", width:"auto", padding:"15px", color:"#fff"}}
                            >
                                Main
                            </div>
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol 
                    style={{borderRight:"3px solid #0070C0",height:"70vh"}}
                >
                    <IonRow  style={{borderBottom:"3px solid #0070C0",height:"35vh"}}>
                        <IonCol>
                            {chart &&
                                <ColumnChart
                                    chart_type="column"
                                    main_title_text={driverKey == 0? "All Drivers With Deliveries Late / Failed":"Deliveries Late / Failed - "+driverName}
                                    x_axis_type="datetime"
                                    x_axis_title_text='Time Line'
                                    y_axis_text='Delivery Count'
                                    series_name='Late / Failed'
                                    series = {seriesDataDetail}
                                    min_value={minValue}
                                    max_value={maxValue}
                                    result={(e:any)=>{console.log(e); setStartDate(e); setEndDate(e)}}
                                />
                            }
                        </IonCol>
                    </IonRow>
                    <IonRow
                        className="ion-padding"
                    >
                        <IonCol>
                            Order Status
                            <IonRow  className='ion-text-bold' style={{backgroundColor:"#c09d00ff",borderRadius:"20px"}}>
                                <IonCol size="6" style={{color:"#fff",}}className='size-16 ion-text-bold ion-text-left'>STATUS</IonCol>
                                <IonCol size=""  style={{color:"#fff",}}className='size-16 ion-text-bold ion-text-right'>ON TIME</IonCol>
                                <IonCol size=""  style={{color:"#fff",}}className='size-16 ion-text-bold ion-text-right'>LATE</IonCol>
                                <IonCol size=""  style={{color:"#fff",}}className='size-16 ion-text-bold ion-text-right'>FAILED</IonCol>
                            </IonRow>
                            {orderStatusList}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol >
                             Delivery Status
                            <IonRow  className='ion-text-bold'  style={{backgroundColor:"#0070C0",borderRadius:"20px"}}>
                                <IonCol size="6" style={{color:"#fff",}}className='size-16 ion-text-bold ion-text-left'>STATUS</IonCol>
                                <IonCol size=""  style={{color:"#fff",}}className='size-16 ion-text-bold ion-text-right'>ON TIME</IonCol>
                                <IonCol size=""  style={{color:"#fff",}}className='size-16 ion-text-bold ion-text-right'>LATE</IonCol>
                                <IonCol size=""  style={{color:"#fff",}}className='size-16 ion-text-bold ion-text-right'>FAILED</IonCol>
                            </IonRow>
                            {deliveryStatusList}
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow>
                        <IonCol>
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
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>    
            </div>
            }
        </div>
    )
}
export default Main