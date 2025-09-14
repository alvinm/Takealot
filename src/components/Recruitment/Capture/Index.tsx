import { IonCol, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";

const CaptureResponses = (props:any) =>{
    const[gender, setGender]            = useState<any>()
    const[genderId, setGenderId]        = useState<any>()
    let txtForename                     = useRef<any>()
    let txtSurname                      = useRef<any>()
    let txtEmail                        = useRef<any>()
    let txtMobile                       = useRef<any>()
    let txtDOB                          = useRef<any>()

    const callGender = () =>{
        fetch(props.state.secondary_host +"getAdminData?dbo=select_list" +
            "&parent_id="+46
            ,
        )
        .then(response=>{ return response.json()})
        .then(data=>{
            var list = data.map((x:any, i:number)=>{
                return(
                    <IonSelectOption key={i} value={x.id}>{x.name}</IonSelectOption>
                )
            })
            setGender(list)
        })
    }
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
            "&gender_id=" +genderId+
            "&dob="+txtDOB.current.value+
            "&created_by="+props.state.user_id
            ,
        )
        .then(response=>{ return response.json()})
        .then(data=>{
            props.result()
        })
    }
    useEffect(()=>{
        callGender()
    },[props])
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
                <IonCol>
                    GENDER
                </IonCol>
                <IonCol>
                    DOB
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
                <IonCol>
                    <IonItem>
                        <IonLabel>Select Gender</IonLabel>
                        <IonSelect onIonChange={(e)=>{setGenderId(e.detail.value)}}>
                            {gender}
                        </IonSelect>
                    </IonItem>
                </IonCol>
                <IonCol>
                    <IonInput placeholder="DOB" type="date"></IonInput>
                </IonCol>
                <IonCol size="1" onClick={()=>{saveResponse()}}>
                    <div className="text-container ion-padding ion-text-center">SAVE</div>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default CaptureResponses