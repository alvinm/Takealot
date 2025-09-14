import { IonCol, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import LineSeriesChart from "../../Charts/LineSeriesChart";
import { formatDate, HighchartsDate } from "../../GlobalFunctions/Functions";


const RecruitmentDashboard = (props:any) =>{
    const [combined, setCombined]                       = useState<any>([])
    const [selected, setSelected]                       = useState<any>(6)
    const [targetDate, setTargetDate]                   = useState<any>('')
    const [startDate, setStartDate]                     = useState<any>('2025-06-01')
    const [endDate, setEndDate]                         = useState<any>('2025-06-30')
    const [month, setMonth]                             = useState<any>(6)
    const [year,setYear]                                = useState<any>('2025')
    const [statusList, setStatusList]                   = useState<any>()
    const [forecastRequirment, setForecastRequirement]  = useState<any>()
    const [forecast, setForecast]                       = useState<any>(0)
    const [shortfall, setShortfall]                     = useState<any>(0) 
    let Controller = new AbortController();
    const callFactDriverForecastMonthly = () =>{
        // Abort any ongoing request
        Controller.abort();
        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_fact_driver_forecast_monthly'+
            "&month="+month
        )
        .then((response) => response.json())
        .then(data=>{
            var list:any = data.map((x:any,i:number)=>{
                return(
                    <IonRow 
                        key={i} 
                        className="ion-padding size-16 ion-row-hover"
                        onClick={()=>{
                            setTargetDate(formatDate(x.date_key));
                            setShortfall(x.forecast/1-x.actual/1)
                            setForecast(x.forecast)
                        }}
                    >
                        <IonCol className="ion-text-left">
                            <div>{x.week}</div>
                        </IonCol>
                        <IonCol className="ion-text-right">
                            {formatDate(x.date_key)}
                        </IonCol>
                        <IonCol className="ion-text-right">
                            {x.forecast}
                        </IonCol>
                        <IonCol className="ion-text-right">
                            {x.forecast/1-x.actual/1}
                        </IonCol>
                        <IonCol className="ion-text-right">
                            {x.verification}
                        </IonCol>
                        <IonCol className="ion-text-right">
                            {(x.forecast/1-x.actual/1)-x.verification/1}
                        </IonCol>
                    </IonRow>
                )
            })
            setForecastRequirement(list)

        }) 
    }
    const callRecruitmentSummary = () =>{
        // Abort any ongoing request
        Controller.abort();
        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getAdminData?dbo=select_recruitment_status_summary'
        )
        .then((response) => response.json())
        .then(data=>{
            var list = data.map((x:any, i:number)=>{
                return(
                    <IonRow className="size-24">
                        <IonCol>{x.status}</IonCol>
                        <IonCol>{x.count}</IonCol>
                    </IonRow>
                )
            })
            setStatusList(list)
        }) 
    }
    const callFactDriverForecastWeekly = () =>{
        // Abort any ongoing request
        Controller.abort();
        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_fact_driver_forecast_weekly'
        )
        .then((response) => response.json())
        .then(data=>{
            const forecastSeries = data.map((d: any) => [
                HighchartsDate(d.date_key),
                d.forecast * 1
            ]);
            const actualSeries = data.map((d: any) => [
                HighchartsDate(d.date_key),
                d.actual * 1
            ]);
            const varianceSeries = data.map((d: any) => [
                HighchartsDate(d.date_key),
                d.forecast * 1- d.actual * 1
            ]);
            setCombined([
                { type:"bar",name: "Forecast", data: forecastSeries,color: "#aaa",  },
                { type:"column", name: "Shortfall", data: varianceSeries,color:"red", dashStyle: "ShortDash" },
                { type:"bar", name: "Utilised", data: actualSeries,  color:"blue"},
            ]);
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
    useEffect(()=>{
            callFactDriverForecastMonthly()
        },[selected])
        
        
        useEffect(()=>{
            callFactDriverForecastWeekly()
            callRecruitmentSummary()
        },[props])
    return(
        <div>
            <IonRow>
                <IonCol
                    className="ion-padding"
                    style={{borderRight:"3px solid #0070C0",height:"80vh"}}
                >
                    <IonRow>
                        <IonCol className="size-28 ion-text-bold">
                            Weekly Driver Resource Profile
                        </IonCol>
                    </IonRow>
                    <IonRow 
                        className="ion-padding"
                        style={{borderBottom:"3px solid #0070C0",}}
                    >
                        <IonCol>
                            <LineSeriesChart
                                data={combined}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="size-28 ion-text-bold">
                            Recruit New Drivers
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="size-16 ion-text-bold">
                            <IonCol>
                                <IonRow>
                                    <IonCol>Select Month Target Month Advertise</IonCol>
                                </IonRow>
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
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonRow className="ion-padding ion-text-bold size-20">
                                <IonCol className="ion-text-left">Week</IonCol>
                                <IonCol className="ion-text-right">Date</IonCol>
                                <IonCol className="ion-text-right">Forecast</IonCol>
                                <IonCol className="ion-text-right">Shortfall</IonCol>
                                <IonCol className="ion-text-right">Verification</IonCol>
                                <IonCol className="ion-text-right">Deficit</IonCol>
                            </IonRow>
                            {forecastRequirment}
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol className="ion-padding">
                    <IonRow>
                        <IonCol className="size-28 ion-text-bold">Recruitment Status</IonCol>
                    </IonRow>
                    <IonRow 
                        className="ion-padding"
                        style={{borderBottom:"3px solid #0070C0",height:"39vh"}}
                    >
                        <IonCol>
                            <IonRow className='ion-text-bold ' style={{backgroundColor:"#0070C0",color:"#fff"}}>
                                <IonCol>Status</IonCol>
                                <IonCol>Count</IonCol>
                            </IonRow>
                            {statusList}
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default RecruitmentDashboard