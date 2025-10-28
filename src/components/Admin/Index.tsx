import { IonCard, IonCardContent, IonCardHeader, IonCol, IonIcon, IonImg, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import AdminList from "./ListManager";
import { home, list, listCircleOutline, listOutline, peopleCircleOutline, person } from "ionicons/icons";
import ContactManager from "./ContactManager/Index";

const AdminHome = (props:any) =>{
    const [adminHomeView, setAdminHomeView]             = useState<any>()
    const [listManagerView, setListManagerView]         = useState<any>()
    const [contactManagerView, setContactManagerView]   = useState<any>()
    const [selected, setSelected]                       = useState<any>()


    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 0: setSelected(v);setAdminHomeView(true);         break;
            case 1: setSelected(v);setListManagerView(true);       break;
            case 2: setSelected(v);setContactManagerView(true);    break;
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
        <div className="ion-padding">
            <div style={{position:"fixed",top:"1vh",width:"85%"}}>
                {/*<IonRow>
                    <IonCol size='3'>
                        <IonRow className='ion-padding'>
                            <IonCol className='ion-padding' onClick={()=>{}}>
                                <IonImg src="../../public/images/IntelRock.JPG" style={{width:"200px"}}></IonImg>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="2"></IonCol>
                </IonRow>*/}
                
            </div>
            <IonRow>
                
                <IonCol>
                    <IonRow className="ion-text-center size-20" >
                        {/*<IonCol onClick={()=>{setView(0)}} size="2" className="ion-padding">
                            <div 
                                className="ion-padding"
                                style={{
                                    backgroundColor:selected == 0 ?"#eef":"#eee",
                                    color:selected == 0 ? "#0070C0":"#000",
                                    float:"left",
                                    borderRadius:"20px",
                                    width:"90%"
                                }}>
                                <IonRow>
                                    <IonCol size="3">
                                        <IonIcon icon={home} className="size-32"></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        Admin Home
                                    </IonCol>
                                </IonRow>
                            </div>
                        </IonCol>*/}
                        <IonCol onClick={()=>{setView(1)}} size="2" className="ion-padding">
                            <div 
                                className="ion-padding ion-text-hover"
                                style={{
                                    backgroundColor:selected == 1 ?"#eef":"#eee",
                                    color:selected == 1 ? "#0070C0":"#000",
                                    float:"left",
                                    borderRadius:"20px",
                                    width:"90%"
                                }}>
                                <IonRow>
                                    <IonCol size="3">
                                        <IonIcon icon={list} className="size-32"></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        List Manager
                                    </IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                        <IonCol onClick={()=>{setView(2)}} size="2" className="ion-padding">
                            <div
                                className="ion-padding ion-text-hover"
                                style={{
                                    backgroundColor:selected == 2 ?"#eef":"#eee",
                                    color:selected == 2 ? "#0070C0":"#000",
                                    float:"left",
                                    borderRadius:"20px",
                                    width:"90%"
                                }}>
                                <IonRow>
                                    <IonCol size="3">
                                        <IonIcon icon={person} className="size-32"></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        Contact Manager
                                    </IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                    </IonRow>
                    {listManagerView &&
                    <div>
                        <AdminList
                            state={props.state}
                            result={(e:any)=>{setView(e)}}
                        />
                    </div>
                    }
                    {contactManagerView &&
                        <ContactManager
                            state={props.state}
                            result={(e:any)=>{setView(e)}}
                        />
                    }
                    {adminHomeView &&
                    <div>
                        
                    </div>
                    }
                </IonCol>
            </IonRow>
        </div>
    )
}
export default AdminHome