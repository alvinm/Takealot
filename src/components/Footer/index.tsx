import { IonCol, IonIcon, IonRow } from '@ionic/react'
import { businessOutline, cartOutline, homeOutline, personOutline, qrCodeOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import './index.css'

const Footer = (props:any) =>{
    const [getSelected, setSelected] =useState<any>('Home')

    return(
        <IonRow>
            <IonCol 
                size="2"  
            >
                <div
                    className={getSelected=='Home'?'selected ion-text-center size-10':'unselected size-10 ion-text-center'}
                    onClick={()=>{setSelected("Home"); props.result(0)}}
                >
                    <IonIcon icon={homeOutline} className='size-32'></IonIcon>
                    <div>Home</div>
                </div>
            </IonCol>
            <IonCol  
                size="2"
            >   <div
                    onClick={()=>{setSelected("Shop")}}
                    className={getSelected=='Shop'?'selected ion-text-center size-10':'unselected size-10 ion-text-center'} 
                >
                    <IonIcon icon={cartOutline} className='size-32'></IonIcon>
                    <div>Shop</div>
                </div>
            </IonCol>
            <IonCol 
                size="4" 
            >
                <div
                    className={getSelected=='Search'?'selected ion-text-center size-10':'unselected size-10 ion-text-center'} 
                    onClick={()=>{setSelected("Search")}}
                >
                    <IonIcon icon={qrCodeOutline} className='size-48'></IonIcon>
                    <div>Search</div>
                </div>
            </IonCol>
            <IonCol 
                size="2" 
            >
                <div
                    className={getSelected=='MyShop'?'selected ion-text-center size-10':'unselected size-10 ion-text-center'} 
                    onClick={()=>{setSelected("MyShop"); props.result(6)}}
                >
                    <IonIcon icon={businessOutline} className='size-32'></IonIcon>
                    <div>My Biz</div>
                </div>
            </IonCol>
            <IonCol 
                size="2" 
            >
                <div
                    className={getSelected=='Account'?'selected ion-text-center size-10':'unselected size-10 ion-text-center'}  
                    onClick={()=>{setSelected("Account"); props.result(7)}}
                >
                    <IonIcon icon={personOutline} className='size-32'></IonIcon>
                    <div>Details</div>
                </div>
            </IonCol>
        </IonRow>
    )
}
export default Footer