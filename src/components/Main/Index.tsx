import { IonCol, IonIcon, IonRow } from "@ionic/react";
import { closeCircleOutline, time } from "ionicons/icons";
import React, { useState } from "react";
import LateHome from "./LateDeliveries/Index";
import FailedHome from "./FailedDeliveries/Index";

const Deliveries = (props:any) =>{
    const [selected, setSelected]       = useState<any>(1)
    const [lateView, setLateView]       = useState<any>()
    const [failedView, setFailedView]   = useState<any>()
    const [detailView, setDetailView]   = useState<any>()
    
    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 1 :
                setLateView(true)
                setSelected(1)
                break;
            case 2 :
                setFailedView(true)
                setSelected(2)
                break;
            case 3 :
                setDetailView(true)
                break;
        }
    }
    const resetView = () =>{
        setLateView(false)
        setFailedView(false)
        setDetailView(false)
    }
    return(
        <div>
            <IonRow>
                <IonCol size="6">
                    <IonRow className="ion-text-center size-20" >
                        <IonCol onClick={()=>{setView(1)}} size="4" className="ion-padding">
                            <div 
                                className="ion-padding ion-text-hover"
                                style={{
                                    backgroundColor:selected == 1 ?"#eef":"#eee",
                                    color:selected == 1 ? "#0070C0":"#000",
                                    float:"left",
                                    borderRadius:"20px",
                                    width:"90%"
                                }}>
                                <IonRow>
                                    <IonCol size="3">
                                        <IonIcon icon={time} className="size-32"></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        Late Delivery
                                    </IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                        <IonCol onClick={()=>{setView(2)}} size="4" className="ion-padding">
                            <div
                                className="ion-padding ion-text-hover"
                                style={{
                                    backgroundColor:selected == 2 ?"#eef":"#eee",
                                    color:selected == 2 ? "#0070C0":"#000",
                                    float:"left",
                                    borderRadius:"20px",
                                    width:"90%"
                                }}>
                                <IonRow>
                                    <IonCol size="3">
                                        <IonIcon icon={closeCircleOutline} className="size-32"></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        Failed Delivery
                                    </IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    {lateView &&
                        <div>
                            <LateHome
                                state={props.state}
                                result={(e:any)=>{
                                    /** */
                                }}
                            />
                        </div>
                    }
                    {failedView &&
                        <div>
                            <FailedHome
                                state={props.state}
                                result={(e:any)=>{
                                    /** */
                                }}
                            />
                        </div>
                    }
                    {detailView&&
                        <div>
                            <FailedHome
                                state={props.state}
                                result={(e:any)=>{
                                    /** */
                                }}
                            />
                        </div>
                    }
                </IonCol>
            </IonRow>
        </div>
    )
}
export default Deliveries