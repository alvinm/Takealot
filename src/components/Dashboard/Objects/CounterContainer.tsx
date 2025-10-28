import { IonCol, IonRow } from "@ionic/react";
import React from "react";
interface Properties{
    header:string,
    top_line_name:string,
    top_line_value:string,
    middle_line_name:string,
    middle_line_value:number,
    bottom_line_name:string,
    bottom_line_value:number,
    size:string,
    id:number,
    result:{}
}
const CounterContainer: React.FC<Properties> = (props:any) =>{

    return(
        <IonCol size={props.size} className="ion-text-left ion-padding">
            
            <div style={{border:"1px solid #ccc", height:"33vh", width:"95%",borderRadius:"20px",overflowY:"auto"}}>
                <IonRow className="ion-text-center">
                    <IonCol>
                        <div className="ion-text-bold size-24" style={{color:"#0070C0"}}>{props.header.toUpperCase()}</div>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-text-center">
                    <IonCol style={{fontSize:'42px'}} className='ion-padding'>
                        {props.top_line_value}
                        <div style={{fontSize:'14px'}}>{props.top_line_name.toUpperCase()}</div>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-text-center">
                    <IonCol>
                        <div style={{fontSize:'28px'}}>{props.middle_line_value}</div>
                        <div style={{fontSize:'14px'}}>{props.middle_line_name.toUpperCase()}</div>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-text-center">
                    <IonCol>
                        <div style={{fontSize:'32px',color:"red",fontWeight:"bold"}}>{props.bottom_line_value}</div>
                        <div style={{fontSize:'14px'}}>{props.bottom_line_name.toUpperCase()}</div>
                    </IonCol>
                </IonRow>
                <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                <IonRow className="ion-text-center">
                    <IonCol size="2"></IonCol>
                    <IonCol>
                        <div 
                            className="ion-text-center ion-text-hover ion-padding size-12" 
                            style={{border:"0.5px solid #ddd",borderRadius:"20px",fontWeight:"bold"}}
                            onClick={()=>{props.result(props.id)}}
                        >
                            VIEW<br/>DETAILS
                        </div>
                    </IonCol>
                    <IonCol size="2"></IonCol>
                </IonRow>
            </div>
        </IonCol>
    )
}
export default CounterContainer