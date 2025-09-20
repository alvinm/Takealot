import { IonCol, IonIcon, IonRow } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React from "react";

const ContactManager = (props:any) =>{

    return(
        <div>
            <IonRow>
                <IonCol></IonCol>
                <IonCol size="1">
                    <div className="text-container ion-padding ion-text-center size-24" onClick={()=>{
                        props.result(0)
                    }}>
                        <IonIcon icon={arrowBack} className="size-28"></IonIcon>&nbsp;
                        Back
                    </div>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default ContactManager