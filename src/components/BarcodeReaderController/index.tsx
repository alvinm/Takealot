import { IonCol, IonContent, IonIcon, IonInput, IonLabel, IonPage, IonRow } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { TakePhoto } from "../Camera/TakePhoto";
import ImageUpload from "../ImageUpload/ImageUpload";
import { addCircleOutline, banOutline, barcodeOutline, cameraOutline, close, closeCircleOutline, cloudUploadOutline, pencilOutline } from "ionicons/icons";
import BarcodeScannerComponent from "../BarcodeReader/BarcodeReader";


const BarcodeReaderController = (props:any) =>{
    const [hideScan, showScan]      = useState<any>()
    const [hideEnter, showEnter]    = useState<any>()
    const txtBarcode                = useRef<any>()
    return (
        <div>
        <IonRow>
            <IonCol className="ion-text-right">
                <IonIcon onClick={()=>{props.cancel()}} icon={close} className="size-36 ion-text-hover"></IonIcon>
            </IonCol>
        </IonRow>
        <IonRow>
            {(!hideScan && !hideEnter) &&
                <IonCol onClick={()=>{props.result(-1)}}>
                    <div className="text-container ion-padding ion-text-center">
                        <IonIcon icon={banOutline} className="size-96"></IonIcon><br/>
                        Has No Barcode
                    </div>
                </IonCol>
            }
            {(!hideScan || hideEnter) &&
                <IonCol onClick={()=>{showEnter(!hideEnter)}}>
                    <div className="text-container ion-padding ion-text-center">
                        <IonIcon icon={pencilOutline} className="size-96"></IonIcon><br/>
                        Enter Code
                    </div>
                </IonCol>
                
            }
            <IonCol size="12" className="ion-text-center">
                {(!hideScan  && !hideEnter) &&
                    <div className="text-container ion-padding ion-text-center" onClick={()=>{showScan(!hideScan)}}>
                        <IonIcon icon={barcodeOutline} className="size-96"></IonIcon><br/>
                        Scan Barcode
                    </div>
                }
                {hideScan &&
                    <BarcodeScannerComponent
                        state={props.state}
                        barcode={props.barcode}
                        result={(e:any)=>{props.result(e)}}
                    />
                }
            </IonCol>
        </IonRow>
        {hideEnter &&
            <IonRow>
                <IonCol size="10" className="ion-text-center">
                    <IonInput ref={txtBarcode} type="number" placeholder="Enter Barcode Here" ></IonInput>
                </IonCol>
                <IonCol className="ion-text-center">
                    <IonIcon icon={addCircleOutline} className="size-36" onClick={()=>{props.result(txtBarcode.current.value)}}></IonIcon>
                </IonCol>
            </IonRow>
        }
        </div>
    );
};
export default BarcodeReaderController