import { IonCol, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { checkmarkCircle, checkmarkCircleOutline, closeCircleOutline, stopCircleSharp, timerOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { formatDateTime } from "../GlobalFunctions/Functions";

const MilkRunAudit = (props:any) =>{
    const [hubKey, setHubKey]               =useState<any>(119)
    const [completed, showCompleted]        =useState<any>(false)
    const [finished, setFinished]           =useState<any>(false)
    const [fin, setFin]                     =useState<any>()

    const [resultSet, setResultSet]         =useState<any>()
    const [milkrunData, setMilkRunData]     =useState<any>()
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
    },[hubKey])
    return(
        <div>
                <div style={{position:"fixed",top:"1vh",width:"85%"}}>
                    <IonRow>
                        <IonCol size='3'>
                            <IonRow className='ion-padding'>
                                <IonCol className='ion-padding' onClick={()=>{}}>
                                    <IonImg src="../../public/images/IntelRock.JPG" style={{width:"200px"}}></IonImg>
                                </IonCol>
                            </IonRow>
                        </IonCol>

                    </IonRow>
                </div>
                <IonRow className="size-24 ion-text-bold ion-padding" >
                    <IonCol size="4">Milk Run Receiving</IonCol>
                    <IonCol size="1">
                        <div 
                            onClick={()=>{setHubKey(0)}}
                            className={hubKey == 0?"ion-text-center selected-container ion-padding":"ion-text-center text-container ion-padding"}>
                                All
                        </div>
                    </IonCol>
                    <IonCol size="2">
                        <div 
                            onClick={()=>{setHubKey(119)}}
                            className={hubKey == 119?"ion-text-center selected-container ion-padding":"ion-text-center text-container ion-padding"}>
                                Middleburg
                        </div>
                    </IonCol>
                    <IonCol size="2">
                        <div 
                            onClick={()=>{setHubKey(222)}}
                            className={hubKey == 222?"ion-text-center selected-container ion-padding":"ion-text-center text-container ion-padding"}>
                                Witbank
                        </div>
                    </IonCol>
                    <IonCol size="2">
                        <div 
                            onClick={()=>{setHubKey(257)}}
                            className={hubKey == 257?"ion-text-center selected-container ion-padding":"ion-text-center text-container ion-padding"}>
                                Secunda
                        </div>
                    </IonCol>
                </IonRow>`
                
                <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                <IonRow>
                    <IonCol size="3"></IonCol>
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
                    <IonCol size="3"></IonCol>
                    <IonCol size="6" className="ion-padding" style={{border:"0.5px solid #ccc", borderRadius:"20px"}}>
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
                            <IonCol size="4" className="ion-text-center">
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
                            <IonCol size="4"></IonCol>
                            <IonCol>
                                {resultSet}
                            </IonCol>
                            <IonCol size="4"></IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="3"></IonCol>
                    <IonCol size="6">
                        {milkrunData &&
                        <div>
                            <IonRow className="ion-padding ion-text-bold" style={{backgroundColor:"#0070C0", color:"#fff"}}>
                                <IonCol size="2" className="ion-text-center">
                                   
                                </IonCol>
                                <IonCol size="3">
                                    START DATE TIME
                                </IonCol>
                                <IonCol size="3">
                                    END DATE TIME
                                </IonCol>
                                <IonCol size="2">
                                    DURATION
                                </IonCol>
                                <IonCol size="2">
                                    CLEAR FLOOR
                                </IonCol>
                            </IonRow>
                        {milkrunData.map((x:any)=>(
                            <IonRow>
                                <IonCol size="2" className="ion-text-center">
                                    {(x.breach == 1 )?
                                        <div style={{borderRadius:"20px", height:"20px", width:"20px", backgroundColor:"red"}}></div>
                                        :
                                        <div></div>
                                    }
                                </IonCol>
                                <IonCol size="3">
                                    {formatDateTime(x.start_date)}
                                </IonCol>
                                <IonCol size="3">
                                    {formatDateTime(x.end_date)}
                                </IonCol>
                                <IonCol size="2">
                                    {x.duration}
                                </IonCol>
                                <IonCol size="2">
                                    {x.clear_floor}
                                </IonCol>
                            </IonRow>
                        ))}
                        </div>
                        }
                    </IonCol>
                </IonRow>
        </div>
    )
}
export default MilkRunAudit