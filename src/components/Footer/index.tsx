import { IonCol, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";

const Footer = (props:any) =>{
    const [textSelected, setTextSelected]               = useState<any>(null)
    useEffect(()=>{
        if(textSelected != null)
            props.result(textSelected)
    },[textSelected])
    return(
        <IonRow>
            <IonCol>
                <IonRow>
                    <IonCol className="ion-padding">
                        <div onClick={()=>{setTextSelected(-1)}} className={textSelected==0?"selected-container ion-padding ion-text-center size-16":"text-container ion-padding ion-text-center size-16"} >Device <br/>Usage</div>
                    </IonCol>
                    {/**<IonCol className="ion-padding">
                        <div onClick={()=>{setTextSelected(-1)}} className={textSelected==0?"selected-container ion-padding ion-text-center size-16":"text-container ion-padding ion-text-center size-16"} >Early <br/> Deliveries</div>
                    </IonCol>*/}
                    <IonCol className="ion-padding">
                        <div onClick={()=>{setTextSelected(2)}} className={textSelected==2?"selected-container ion-padding ion-text-center size-16":"text-container ion-padding ion-text-center size-16"} >Late <br/> Deliveries</div>
                    </IonCol>
                    <IonCol className="ion-padding">
                        <div onClick={()=>{setTextSelected(7)}} className={textSelected==0?"selected-container ion-padding ion-text-center size-16":"text-container ion-padding ion-text-center size-16"} >Driver <br/> Failures</div>
                    </IonCol>
                    <IonCol className="ion-padding">
                        <div onClick={()=>{setTextSelected(-1)}} className={textSelected==0?"selected-container ion-padding ion-text-center size-16":"text-container ion-padding ion-text-center size-16"} >Hub <br/> Failures</div>
                    </IonCol>
                    <IonCol className="ion-padding">
                        <div onClick={()=>{setTextSelected(-1)}} className={textSelected==0?"selected-container ion-padding ion-text-center size-16":"text-container ion-padding ion-text-center size-16"} >Milkrun <br/> Receiving</div>
                    </IonCol>
                    <IonCol>&nbsp;</IonCol>
                    <IonCol className="ion-padding">
                        <div  onClick={()=>{setTextSelected(3)}} className={textSelected==3?"selected-kpi-container ion-padding ion-text-center size-16":"kpi-container ion-padding ion-text-center size-16"} >Driver <br/> Recruitment</div>
                    </IonCol>
                    <IonCol className="ion-padding">
                        <div onClick={()=>{setTextSelected(4)}} className={textSelected==4?"selected-kpi-container ion-padding ion-text-center size-16":"kpi-container ion-padding ion-text-center size-16"} >Driver <br/> Management </div>
                    </IonCol>
                    <IonCol className="ion-padding">
                        <div onClick={()=>{setTextSelected(5)}} className={textSelected==5?"selected-kpi-container ion-padding ion-text-center size-16":"kpi-container ion-padding ion-text-center size-16"} >Driver <br/> Audit</div>
                    </IonCol>
                    <IonCol className="ion-padding">
                        <div onClick={()=>{setTextSelected(6)}} className={textSelected==5?"selected-kpi-container ion-padding ion-text-center size-16":"kpi-container ion-padding ion-text-center size-16"} >Milkrun<br/>Daily Audit</div>
                    </IonCol>
                    <IonCol className="ion-padding">
                        <div onClick={()=>{setTextSelected(-1)}}  ><br/></div>
                    </IonCol>
                    <IonCol className="ion-padding">
                        <div onClick={()=>{setTextSelected(1)}} className={textSelected==0?"selected-kpi-container ion-padding ion-text-center size-16":"kpi-container ion-padding ion-text-center size-16"} >Admin<br/>Settings</div>
                    </IonCol>
                </IonRow>
            </IonCol>
        </IonRow>
    )
}
export default Footer