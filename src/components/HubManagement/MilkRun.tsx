import { IonBadge, IonCol, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { apps, attachOutline, checkmarkCircle, checkmarkCircleOutline, closeCircleOutline, stopCircleSharp, timerOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { formatDateTime } from "../GlobalFunctions/Functions";
import MilkRUnDiscrepancies from "./Discrepancies/Index";

var stripe      = 0
const MilkRunAudit = (props:any) =>{
    const [hubKey, setHubKey]               =useState<any>(119)
    const [referenceId, setReferenceId]     =useState<any>(0)
    const [completed, showCompleted]        =useState<any>(false)
    const [finished, setFinished]           =useState<any>(false)
    const [fin, setFin]                     =useState<any>()

    const [resultSet, setResultSet]         =useState<any>()
    const [milkrunData, setMilkRunData]     =useState<any>()

    const [milkRunView, setMilkRunView]         = useState<any>()
    const [descrepancyView, setDescrepancyView] = useState<any>() 
    
    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 1: setMilkRunView(true)    ;break;
            case 2: setDescrepancyView(true);break;
        }
    }
    const resetView = () =>{
        setMilkRunView(false)    
        setDescrepancyView(false)
    }
    const callMilkRun = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_milkrun_daily_audit'+
            '&hub_key				    ='+hubKey           
        )
        .then((response) => response.json())
        .then(data =>{
            setMilkRunData(data)
        })
    }
    const setMilkRun = (clear_floor:any) =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=update_milkrun_daily_audit'+
            '&hub_key				    ='+hubKey+
            "&clear_floor               ="+clear_floor+
            "&created_by                ="+props.state.user_id               
        )
        .then((response) => response.json())
        .then(data =>{
            showCompleted(true)
            setResultSet(data[0].duration)
            setFin(clear_floor)
        })
    }
    useEffect(()=>{
        showCompleted(false)
        setFinished(false)
        callMilkRun()
        setView(1)
    },[props])
    return(
        <div>
            {milkRunView &&
            <div>
            <IonRow>
                <IonCol size="6">
                    <IonRow>
                        <IonCol size="4" className="ion-text-center">START RECEIVING</IonCol>
                        <IonCol size="4" className="ion-text-center"> 
                            {completed &&
                                <IonLabel>COMPLETED</IonLabel>
                            }
                        </IonCol>
                        <IonCol size="4" className="ion-text-center"> 
                            {finished &&
                                <IonLabel>CLEAR FLOOR</IonLabel>
                            }
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="8" className="ion-padding" style={{border:"0.5px solid #ccc", borderRadius:"20px"}}>
                    <IonRow>
                        <IonCol size="4" className="ion-text-center">
                            <div className={completed? "selected-container ion-text-hover ion-text-center ion-padding size-20 disabled-div":"text-container ion-text-hover ion-text-center ion-padding size-20"}
                                    onClick={()=>{
                                        setMilkRun(-1)
                                    }}
                            >
                                <IonIcon icon={timerOutline} className="size-32"></IonIcon>&nbsp;
                                Received
                            </div>
                        </IonCol>
                        
                        <IonCol size="4" className="ion-text-center">
                            {completed &&
                                <div className={finished? "selected-container text-containter ion-text-center ion-padding size-20 disabled-div":"text-container ion-text-hover ion-padding ion-text-center size-20"}
                                    onClick={()=>{
                                        setMilkRun(-1)
                                        setFinished(true)
                                    }}
                                >
                                    <IonIcon icon={stopCircleSharp} className="size-32"></IonIcon>&nbsp;
                                    Completed
                                </div>
                            }
                        </IonCol>
                        <IonCol size="2" className="ion-text-center">
                            {finished &&
                            <IonRow>
                                <IonCol>
                                    <div className={fin==1? "selected-container text-containter ion-text-center ion-padding size-20 disabled-div":"text-container ion-text-hover ion-padding ion-text-center size-20"}
                                        onClick={()=>{
                                            setMilkRun(1)
                                            setFinished(true)
                                        }}
                                    >
                                        <IonIcon icon={checkmarkCircleOutline} className="size-32 text-green"></IonIcon>&nbsp;
                                        Yes
                                    </div>
                                </IonCol>
                                <IonCol>
                                    <div className={fin==0? "selected-container text-containter ion-text-center ion-padding size-20 disabled-div":"text-container ion-text-hover ion-padding ion-text-center size-20"}
                                        onClick={()=>{
                                            setMilkRun(0)
                                            setFinished(true)
                                        }}
                                    >
                                        <IonIcon icon={closeCircleOutline} className="size-32 text-red"></IonIcon>&nbsp;
                                        No
                                    </div>
                                </IonCol>
                            </IonRow>
                            }
                        </IonCol>
                    </IonRow>
                    
                    <IonRow>
                        <IonCol size="2"></IonCol>
                        <IonCol>
                            {resultSet}
                        </IonCol>
                        <IonCol size="2"></IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="8">
                    {milkrunData &&
                    <div>
                        <IonRow className="ion-padding ion-text-bold" style={{backgroundColor:"#0070C0", color:"#fff"}}>
                            <IonCol size="1" className="ion-text-center">
                                
                            </IonCol>
                            <IonCol size="2" className="ion-text-left">
                                START DATE
                            </IonCol>
                            <IonCol size="2" className="ion-text-lrft">
                                END DATE
                            </IonCol>
                            <IonCol size="1" className="ion-text-right">
                                DURATION
                            </IonCol>
                            <IonCol size="2" className="ion-text-right">
                                CLEAR FLOOR
                            </IonCol>
                            <IonCol size="2" className="ion-text-right">
                                DISCREPANCIES
                            </IonCol>
                        </IonRow>
                        {milkrunData.map((x:any)=>{
                            if(stripe == 0){stripe =1}else{stripe = 0}
                        return(
                        <IonRow style={{backgroundColor:stripe == 1?"#eef":""}}>
                            <IonCol size="1" className="ion-text-center ion-padding">
                                {(x.breach == 1 )?
                                    <div style={{borderRadius:"20px", height:"20px", width:"20px", backgroundColor:"red"}}></div>
                                    :
                                    <div></div>
                                }
                            </IonCol>
                            <IonCol size="2" className="ion-text-left">
                                {formatDateTime(x.start_date)}
                            </IonCol>
                            <IonCol size="2" className="ion-text-left">
                                {formatDateTime(x.end_date)}
                            </IonCol>
                            <IonCol size="1" className="ion-text-right">
                                {x.duration}
                            </IonCol>
                            <IonCol size="2" className="ion-text-right">
                                {x.clear_floor}
                            </IonCol>
                            <IonCol 
                                size="2" 
                                className="ion-text-right"
                                onClick={()=>{setView(2); setReferenceId(x.id)}}
                            >
                                {(x.count == undefined || x.count == null) || x.count == 0?
                                    <div>
                                        <IonIcon icon={attachOutline} className="size-32"></IonIcon>&nbsp;
                                    </div>
                                    :
                                    <div>
                                        <IonIcon icon={attachOutline} className="size-32"></IonIcon>&nbsp;
                                        <IonBadge style={{position:"relative",top:"-50%",right:"0%"}}>{x.count}</IonBadge>
                                    </div>
                                }   
                            </IonCol>
                        </IonRow>
                    )})}
                    </div>
                    }
                </IonCol>
            </IonRow>
            </div>
            }
            {descrepancyView &&
            <div>
                <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                <IonRow>
                    <IonCol size="2"></IonCol>
                    <IonCol>
                        <MilkRUnDiscrepancies
                            state={props.state}
                            reference_id= {referenceId}
                            hub_key={hubKey}
                            result={(e:any)=>{setView(e)}}
                        />
                    </IonCol>
                    <IonCol size="2"></IonCol>
                </IonRow>
            </div> 
            }
        </div>
    )
}
export default MilkRunAudit