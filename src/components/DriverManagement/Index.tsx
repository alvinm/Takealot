import { IonCol, IonIcon, IonImg, IonRow } from "@ionic/react";
import { checkmarkCircleOutline, closeOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";

const DriverManagement = (props:any) =>{
    const [stage, setStage]         = useState<any>()
    const [driverList, setDriverList]       = useState<any>()
    const [listId, setListId]               = useState<any>()
    const callDrivers = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_driver')
        .then((response) => response.json())
        .then(data =>{
            const lists = data.map((x:any, i:number)=>{
                return(
                    <IonRow key={i}>
                        <IonCol >
                            <div className={listId==x.id?" ion-padding ion-text-center size-20":"text-container ion-padding ion-text-center size-20"} onClick={()=>{setListId(x.id)}}>
                                <IonRow>
                                    <IonCol size="1">{x.id}</IonCol>
                                    <IonCol className='ion-text-left'>{x.name}</IonCol>
                                    <IonCol ></IonCol>
                                    <IonCol size="1">
                                        <div className="ion-padding ion-text-center" style={{color:"#fff",backgroundColor:"darkgreen",borderRadius:"30px",height:"50px"}}>
                                            <IonIcon icon={checkmarkCircleOutline} className="size-32"></IonIcon>
                                        </div>
                                    </IonCol>
                                    <IonCol size="1">
                                        <div className="ion-padding ion-text-center" style={{color:"#fff",backgroundColor:"darkred",borderRadius:"30px",height:"50px"}}>
                                            <IonIcon icon={closeOutline} className="size-32"></IonIcon>
                                        </div>
                                    </IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                    </IonRow>
                )
            })
            setDriverList(lists)
        })
    }
useEffect(()=>{
    callDrivers()
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
                <IonCol></IonCol>
            </IonRow>
            </div>
            <IonRow>
                <IonCol 
                    size="3"
                    className="size-20 ion-text-bold ion-padding"
                    style={{borderRight:"3px solid #0070C0",height:"80vh"}}
                >
                    <IonRow className="size-28">
                        <IonCol>Management Options</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div className={stage==1?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setStage(1)}}>
                                <IonRow>
                                    <IonCol size="1"></IonCol>
                                    <IonCol className='ion-text-left'>VIEW ALL</IonCol>
                                    <IonCol size="2" className='ion-text-right'></IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div className={stage==1?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setStage(1)}}>
                                <IonRow>
                                    <IonCol size="1"></IonCol>
                                    <IonCol className='ion-text-left'>EXPIRED LICENSE</IonCol>
                                    <IonCol size="2" className='ion-text-right'></IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div className={stage==1?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setStage(1)}}>
                                <IonRow>
                                    <IonCol size="1"></IonCol>
                                    <IonCol className='ion-text-left'>EXPIRED PERMIT</IonCol>
                                    <IonCol size="2" className='ion-text-right'></IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow className="size-28 ion-text-bold">
                        <IonCol>Drivers</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonRow >
                                <IonCol >
                                    <div >
                                        <IonRow>
                                            <IonCol size="1">ID</IonCol>
                                            <IonCol className='ion-text-left'>DRIVER</IonCol>
                                            <IonCol ></IonCol>
                                            <IonCol size="1">
                                                ENABLE
                                            </IonCol>
                                            <IonCol size="1">
                                                DISABLE
                                            </IonCol>
                                        </IonRow>
                                    </div>
                                </IonCol>
                            </IonRow>
                            {driverList}
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default DriverManagement