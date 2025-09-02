import { IonCol, IonInput, IonRow } from "@ionic/react";
import React, { useRef } from "react";

const CaptureResponses = (props:any) =>{
    let txtForename                     = useRef<any>()
    let txtSurname                      = useRef<any>()
    let txtEmail                        = useRef<any>()
    let txtMobile                       = useRef<any>()
    const saveResponse = () =>{
        fetch(props.state.secondary_host +"getAdminData?dbo=insert_recruitment_contact" +
            "&hub_key="+props.hub_key+
            "&status_id="+props.status_id+
            "&year="+props.year+
            "&week_no="+props.week_no+
            "&contact_type_id="+12+
            "&forename=" +txtForename.current.value+
            "&surname=" +txtSurname.current.value+
            "&email=" +txtEmail.current.value+
            "&mobile=" +txtMobile.current.value+
            "&created_by="+props.state.user_id
            ,
        )
        .then(response=>{ return response.json()})
        .then(data=>{
            props.result()
        })
    }
    return(
        <div>
            <IonRow>
                <IonCol>
                    FORENAME
                </IonCol>
                <IonCol>
                    SURNAME
                </IonCol>
                <IonCol>
                    EMAIL
                </IonCol>
                <IonCol>
                    MOBILE
                </IonCol>
                <IonCol size="1"></IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonInput placeholder="Forename" ref={txtForename}></IonInput>
                </IonCol>
                <IonCol>
                    <IonInput placeholder="Surname" ref={txtSurname}></IonInput>
                </IonCol>
                <IonCol>
                    <IonInput placeholder="Email" ref={txtEmail}></IonInput>
                </IonCol>
                <IonCol>
                    <IonInput placeholder="Mobile" ref={txtMobile}></IonInput>
                </IonCol>
                <IonCol size="1" onClick={()=>{saveResponse()}}>
                    <div className="text-container ion-padding ion-text-center">SAVE</div>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default CaptureResponses