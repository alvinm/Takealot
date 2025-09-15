import { IonCol, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";

const DriverManagmentList = (props:any) =>{
    const [driverData, setDriverData]           = useState<any>([])
    const setArchiveDriver = (id:any) =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=archive_contact'+
            '&id='+id+
            "&archived_by="+props.state.user_id
        )
        .then((response) => response.json())
        .then(data=>{
            callDrivers()
        })
    }
    const callDrivers = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_driver')
        .then((response) => response.json())
        .then(data=>{
            setDriverData(data)
        })
    }
    useEffect(()=>{
        callDrivers()
    },[props])
    return(
        <div>
            <IonRow>
                <IonCol size="1"></IonCol>
                <IonCol>
                        <IonRow className="ion-text-bold size-20" style={{backgroundColor:"#0070C0", color:"#fff"}}>
                            <IonCol>ID</IonCol>
                            <IonCol>NAME</IonCol>
                            <IonCol>AGE</IonCol>
                            <IonCol>COUNTRY</IonCol>
                            <IonCol>WARNINGS</IonCol>
                            <IonCol>EXPIRED</IonCol>
                            <IonCol>LAST ACTIVE(DAYS)</IonCol>
                            <IonCol>STATUS</IonCol>
                            
                        </IonRow>
                    {driverData.map((x:any,i:number)=>(
                        <IonRow className="size-18">
                            <IonCol>{x.id}</IonCol>
                            <IonCol>{x.name}</IonCol>
                            <IonCol>{x.age}</IonCol>
                            <IonCol>{x.country}</IonCol>
                            <IonCol>{x.warning}</IonCol>
                            <IonCol>{x.expired}</IonCol>
                            <IonCol>{x.days_last_active}</IonCol>
                            <IonCol>{x.status == 1 ? 
                                <div onClick={()=>{setArchiveDriver(x.id)}} className="text-container ion-padding ion-text-center "  style={{border:"1px solid #fff",borderRadius:"30px",color:"white",backgroundColor:"darkgreen"}} >Active</div>: 
                                <div onClick={()=>{setArchiveDriver(x.id)}} className="text-container ion-padding ion-text-center"   style={{border:"1px solid #fff",borderRadius:"30px",color:"white",backgroundColor:"darkred"}}   >Disabled</div>
                                }
                            </IonCol>
                        </IonRow>
                    ))}
                </IonCol>
                <IonCol size="1"></IonCol>
            </IonRow>
        </div>
    )
}
export default DriverManagmentList