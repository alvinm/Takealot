import { IonCol, IonContent, IonIcon, IonPage, IonRow } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import { banOutline, cameraOutline, close, cloudUploadOutline } from "ionicons/icons";


const ImageController = (props:any) =>{
    const [hideUpload, showUpload]      = useState<any>()
    const [hideNoImage, showImage]      = useState<any>()
    return (
        <div>
        <IonRow>
            <IonCol className="ion-text-right">
                <IonIcon onClick={()=>{props.results()}} icon={close} className="size-36 ion-text-hover"></IonIcon>
            </IonCol>
        </IonRow>
        <IonRow>
            {!hideUpload &&
            <IonCol onClick={()=>{props.results(-1)}}>
                <div className="text-container ion-padding ion-text-center">
                    <IonIcon icon={banOutline} className="size-96"></IonIcon><br/>
                    No Image
                </div>
            </IonCol>
            }
        </IonRow>
        </div>
    );
};
export default ImageController