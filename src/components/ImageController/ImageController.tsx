import { IonCol, IonContent, IonIcon, IonPage, IonRow } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { TakePhoto } from "../Camera/TakePhoto";
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
            <IonCol onClick={()=>{TakePhoto(props.barcode)}}>
                <div className="text-container ion-padding ion-text-center">
                    <IonIcon icon={cameraOutline} className="size-96"></IonIcon><br/>
                    Take Photo
                </div>
            </IonCol>
            }
            {!hideUpload &&
            <IonCol onClick={()=>{props.results(-1)}}>
                <div className="text-container ion-padding ion-text-center">
                    <IonIcon icon={banOutline} className="size-96"></IonIcon><br/>
                    No Image
                </div>
            </IonCol>
            }
            <IonCol onClick={()=>{TakePhoto(props.barcode)}}>
                {!hideUpload &&
                    <div className="text-container ion-padding ion-text-center" onClick={()=>{showUpload(!hideUpload)}}>
                        <IonIcon icon={cloudUploadOutline} className="size-96"></IonIcon><br/>
                        Select Image
                    </div>
                }
                {hideUpload &&
                    <ImageUpload
                        state={props.state}
                        barcode={props.barcode}
                        result={()=>{props.results()}}
                    />
                }
            </IonCol>
        </IonRow>
        </div>
    );
};
export default ImageController