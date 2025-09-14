import { IonCol, IonIcon, IonImg, IonRow } from "@ionic/react";
import { analyticsOutline, checkmarkCircleOutline, closeOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";

const DriverAudit = (props:any) =>{
    const [auditList, setAuditList]         = useState<any>()
    const [driverList, setDriverList]       = useState<any>()
    const [listId, setListId]               = useState<any>()
    const [drivers, setDrivers]             = useState<any[]>([]);
    const [audits, setAudits]               = useState<any[]>([]);
    const callDrivers = () => {
    fetch(props.state.secondary_host + "getAdminData?dbo=select_driver")
        .then((res) => res.json())
        .then(setDrivers);
    };

    const callAuditList = () => {
    fetch(props.state.secondary_host + "getAdminData?dbo=select_list&parent_id=22")
        .then((res) => res.json())
        .then((data) => setAudits(data.sort((a: any, b: any) => a.id - b.id)));
    };

    useEffect(()=>{
        callAuditList()
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
                        <IonCol>Driver List</IonCol>
                    </IonRow>
                    <IonRow style={{height:"75vh", overflowY:"auto"}}>
                        <IonCol>
                            {drivers.map((x: any) => (
                            <IonRow key={x.id}>
                                <IonCol>
                                    <div
                                    className={
                                        listId === x.id
                                        ? "selected-container ion-padding ion-text-center size-20"
                                        : "text-container ion-padding ion-text-center size-20"
                                    }
                                    onClick={() => setListId(x.id)}
                                    >
                                        <IonRow>
                                            <IonCol size="2">{x.id}</IonCol>
                                            <IonCol className="ion-text-left">{x.name}</IonCol>
                                        </IonRow>
                                    </div>
                                </IonCol>
                            </IonRow>
                            ))}
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow className="size-28 ion-text-bold">
                        <IonCol>Audit List</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonRow>
                                <IonCol >
                                    <div>
                                        <IonRow className="size-20 ion-text-bold">
                                            <IonCol size="1">ID</IonCol>
                                            <IonCol className='ion-text-left'>CHECK</IonCol>
                                            <IonCol ></IonCol>
                                            <IonCol size="1">
                                                PASS
                                            </IonCol>
                                            <IonCol size="1">
                                                FAIL
                                            </IonCol>
                                        </IonRow>
                                    </div>
                                </IonCol>
                            </IonRow>
                            <IonRow style={{height:"75vh", overflowY:"auto"}}>
                                <IonCol>
                                    <IonRow className="ion-padding">
                                        {audits.map((x: any) => (
                                            <IonCol size="4" key={x.id}
                                                className={ " ion-padding ion-text-center size-20"}
                                                
                                                onClick={() => setListId(x.id)}
                                            >
                                                <IonRow className="ion-padding" style={{fontSize:"20px", borderRadius:"20px", border:"1px solid"}}>
                                                    <IonCol className="ion-text-left ion-padding">{x.name}</IonCol>
                                                    <IonCol size="1">
                                                        <div className="ion-padding ion-text-center text-row">
                                                            <IonIcon icon={checkmarkCircleOutline} className="size-32" />
                                                        </div>
                                                    </IonCol>
                                                    <IonCol size="1">
                                                        <div className="ion-padding ion-text-center text-row">
                                                            <IonIcon icon={closeOutline} className="size-32" />
                                                        </div>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                        ))}
                                    </IonRow>
                                </IonCol>
                            </IonRow>
                            
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default DriverAudit