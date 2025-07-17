import { IonCol, IonIcon, IonRow } from '@ionic/react'
import { barcodeOutline, cameraOutline, homeOutline, searchOutline } from 'ionicons/icons';
import React from 'react'
import './Search.css'


const Search    = (props:any) =>{

    return(
        <div className=' search-box'>
            <IonRow>
                <IonCol size="2">
                    <IonIcon 
                        icon={searchOutline} 
                        style={{fontSize:"32px"}}
                        onClick={()=>{props.result(3)}}
                        ></IonIcon>
                </IonCol>
                <IonCol></IonCol>
                <IonCol size="2" >
                    <IonIcon 
                        icon={barcodeOutline} 
                        style={{fontSize:"32px"}}
                        onClick={()=>{props.result(2)}}
                        ></IonIcon>
                </IonCol>
                <IonCol size="2">
                    <IonIcon 
                        icon={cameraOutline} 
                        style={{fontSize:"32px"}}
                        onClick={()=>{props.result(1)}}
                        ></IonIcon>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default Search