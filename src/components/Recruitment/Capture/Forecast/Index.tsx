import { IonCol, IonIcon, IonInput, IonRow } from "@ionic/react";
import { addCircleOutline, chevronBack, chevronForward } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../../GlobalFunctions/Functions";

const InputForecast = (props:any) =>{
    let Controller = new AbortController();
    const [forecastData, setForecastData]                    = useState<any>([])
    const [startDate, setStartDate]                          = useState<any>()
    const [hubKey, setHubKey]                                = useState<any>(119)
    const [startDateBack, setStartDateBack]                  = useState<any>('')
    const [startDateForward, setStartDateForward]            = useState<any>('')
    const [endDate, setEndDate]                              = useState<any>('2025-06-30')
    const [targetDate, setTargetDate]                        = useState<any>('')
    const [year,setYear]                                     = useState<any>('2025')
    const [month, setMonth]                                  = useState<any>(6)
    const [week, setWeek]                                    = useState<any>(0)
    const [forecastValue, setForecastValue]                  = useState<any>(0)
    const setForecast = async () =>{
        const response = await fetch(
            props.state.secondary_host +
            "getAdminData?dbo=insert_forecast" +
            "&hub_key="+hubKey+
            "&forecast=" +forecastValue +
            '&start_date='+targetDate,
            { signal: Controller.signal }
        );
        callScanWeeks()
    }
    const callScanWeeks = async() =>{
        var start_date:any =''
        if (startDate == undefined){
            start_date = ''
        }else{
            start_date =startDate
        }
        try {
            //setLoading(true);
            Controller.abort();
            Controller = new AbortController();

            const response = await fetch(
                props.state.secondary_host +
                "getAdminData?dbo=select_scan_weeks" +
                //"&year=" +props.year +
                '&start_date='+start_date,
                { signal: Controller.signal }
            );
            const data = await response.json();
            setForecastData(data)
        }
        catch (error) {
            console.error('Download failed:', error);
        }
    }
    useEffect(() =>{
        
        callScanWeeks()
    },[startDate])
    useEffect(() => {
        if (forecastData.length > 0) {
            setStartDateBack(forecastData[0].date);
            setStartDateForward(forecastData[forecastData.length - 1].date);
        }
    }, [forecastData]);
    
    useEffect(()=>{
        setHubKey(props.hub_key)
        callScanWeeks()
    },[props])
    return(
        <div>
            <IonRow>
                <IonCol size="2" className="ion-text-bold size-20">Forecast</IonCol>
            </IonRow>    
            <IonRow>
                <IonCol size="2"></IonCol>
                <IonCol size="2">
                    <div 
                        className="ion-padding"
                        style={{border:"0.5px solid",borderRadius:"20px"}}
                    >
                        <IonInput 
                            type="number" 
                            placeholder='Enter Forecasted No.'
                            value={forecastValue}
                        ></IonInput>
                    </div>
                </IonCol>
                {/*<IonCol size="2" className="ion-text-bold size-14">
                    <div 
                        className="ion-padding"
                        style={{border:"0.5px solid",borderRadius:"20px"}}
                    >
                        <IonInput 
                            type="number" 
                            placeholder='Week No.'
                            disabled={false}
                            value={week}
                        ></IonInput>
                    </div>
                </IonCol>*/}
                <IonCol size="2" className="ion-text-bold size-14">
                    <div 
                        className="ion-padding"
                        style={{border:"0.5px solid",borderRadius:"20px"}}
                    >
                        <IonInput 
                            type="date" 
                            placeholder='Week Start Day'
                            value={targetDate}
                            disabled={true}
                        ></IonInput>
                    </div>
                </IonCol>
                <IonCol></IonCol>
                <IonCol size="1" className="ion-text-bold size-18">
                    <div 
                        className="ion-padding ion-text-center"
                        style={{border:"0.5px solid",borderRadius:"20px"}}
                        onClick={()=>{
                            setForecast()
                        }}
                    >
                        <IonRow>
                            <IonCol size="2">
                                <IonIcon icon={addCircleOutline} className = "size-32"></IonIcon>
                            </IonCol>
                            <IonCol>ADD</IonCol>
                        </IonRow>
                    </div>
                </IonCol>
                <IonCol size="2"></IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="2"></IonCol>
                <IonCol 
                    size="2" 
                    className="ion-text-left ion-text-hover"
                    onClick={()=>{setStartDate(startDateBack);}}
                >
                    <IonIcon icon={chevronBack} className="size-48" ></IonIcon>
                </IonCol>
                <IonCol></IonCol>
                <IonCol 
                    size="2" 
                    className="ion-text-right ion-text-hover" 
                     onClick={()=>{setStartDate(startDateForward);}}
                >
                    <IonIcon icon={chevronForward} className="size-48"></IonIcon>
                </IonCol>
                <IonCol size="2"></IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="2"></IonCol>
                <IonCol>
                    {forecastData &&
                        <IonRow>
                        {forecastData.map((x:any, i:number)=>{
                            
                            return(
                                <IonCol size="3" className="ion-text-center" 
                                    onClick={()=>{
                                        setWeek(x.week_no)
                                        setTargetDate(formatDate(x.date))
                                        setForecastValue(x.forecast)
                                    }}
                                >
                                    <div style={{border:"0.5px solid #ddd", borderRadius:"20px"}}>
                                    <IonRow>
                                        <IonCol className="size-48" style={{color:x.forecast == 0? "red":""}}>
                                            <b>{x.forecast}</b>
                                            <div className="size-12">Forecast No.</div>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol className="size-16">
                                            {x.week_no}
                                            <div className="size-12">Week No.</div>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol className="size-16">
                                            {formatDate(x.date)}
                                            <div className="size-12">Week Start Date</div>
                                        </IonCol>
                                    </IonRow>
                                    </div>
                                </IonCol>
                            )
                            })
                        }
                        </IonRow>
                    }
                </IonCol>
                <IonCol size="2"></IonCol>
            </IonRow>
        </div>
    )
}
export default InputForecast