import { IonCard, IonCardContent, IonCardHeader, IonCol, IonIcon, IonImg, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import AdminList from "./ListManager";
import { listCircleOutline, peopleCircleOutline } from "ionicons/icons";
import ContactManager from "./ContactManager/Index";

const AdminHome = (props:any) =>{
    const [adminHomeView, setAdminHomeView]             = useState<any>()
    const [listManagerView, setListManagerView]         = useState<any>()
    const [contactManagerView, setContactManagerView]   = useState<any>()


    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 0: setAdminHomeView(true);         break;
            case 1: setListManagerView(true);       break;
            case 2: setContactManagerView(true);    break;
        }
    }
    const resetView = () =>{
        setAdminHomeView(false);     
        setListManagerView(false);   
        setContactManagerView(false);
    }
    useEffect(()=>{
        setView(0)
    },[props])
    return(
        <div>
            <div style={{position:"fixed",top:"1vh",width:"85%"}}>
                <IonRow>
                    <IonCol size='3'>
                        <IonRow className='ion-padding'>
                            <IonCol className='ion-padding' onClick={()=>{}}>
                                <IonImg src="../../public/images/IntelRock.JPG" style={{width:"200px"}}></IonImg>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="2"></IonCol>
                </IonRow>
            </div>
            <IonRow>
                <IonCol>
                    {listManagerView &&
                        <AdminList
                            state={props.state}
                            result={(e:any)=>{setView(e)}}
                        />
                    }
                    {contactManagerView &&
                        <ContactManager
                            state={props.state}
                            result={(e:any)=>{setView(e)}}
                        />
                    }
                    {adminHomeView &&
                    <div>
                        <IonRow>
                            <IonCol size="2" className="ion-padding">
                                <IonCard onClick={()=>{setView(1)}}>
                                    <IonCardHeader>List Manager</IonCardHeader>
                                    <IonCardContent>
                                        <IonRow>
                                            <IonCol className="ion-text-center">
                                                <IonIcon icon={listCircleOutline} className="size-72"></IonIcon>
                                            </IonCol>
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="2" className="ion-padding">
                                <IonCard  onClick={()=>{setView(2)}}>
                                    <IonCardHeader>Contact Manager</IonCardHeader>
                                    <IonCardContent>
                                        <IonRow>
                                            <IonCol className="ion-text-center">
                                                <IonIcon icon={peopleCircleOutline} className="size-72"></IonIcon>
                                            </IonCol>
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </div>
                    }
                </IonCol>
            </IonRow>
        </div>
    )
}
export default AdminHome