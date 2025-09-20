import { IonCol, IonIcon, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../GlobalFunctions/Functions";
import { checkmarkCircleOutline, closeOutline, warningOutline } from "ionicons/icons";

const DriverComplianceDetail = (props:any) =>{
    const [driverComplianceList, setDriverComplianceList]   = useState<any>()
    const callDriverComplianceList = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_driver_compliance'+
            '&contact_id='+props.driver_id
        )
        .then((response) => response.json())
        .then(data=>{
            setDriverComplianceList(data)
        })
    }
    useEffect(()=>{
        callDriverComplianceList()
    },[props])
    return(
        <div>
             <IonRow>
                <IonCol
                    size="12" 
                    className="ion-padding size-20"
                >
            {driverComplianceList != undefined &&
            <div>
            {driverComplianceList.map((x:any,i:number)=>(
                <IonRow key={i}>
                    <IonCol size="">{x.compliance}</IonCol>
                    <IonCol size="2">{formatDate(x.start_date)}</IonCol>
                    <IonCol size="2">{formatDate(x.end_date)}</IonCol>
                    <IonCol size="2">
                        {(x.warning/1 == 0 && x.expired/1 == 0) ?
                            <div className="ion-text-center " style={{color:"#fff",backgroundColor:"green",borderRadius:"30px",height:"30px", width:"30px"}}>
                                <IonIcon icon={checkmarkCircleOutline} className="size-30"></IonIcon>
                            </div>
                        :(x.warning/1 > 0 && x.expired/1 == 0) ?
                            <div className="ion-text-center " style={{color:"#fff",backgroundColor:"orange",borderRadius:"30px",height:"30px", width:"30px"}}>
                                <IonIcon icon={warningOutline} className="size-24"></IonIcon>
                            </div>
                        :(x.expired/1 > 0) ?
                            <div className="ion-text-center " style={{color:"#fff",backgroundColor:"red",borderRadius:"30px",height:"30px", width:"30px"}}>
                                <IonIcon icon={closeOutline} className="size-30"></IonIcon>
                            </div>:
                            <div></div>
                        }
                    </IonCol>
                </IonRow>
            ))}
            </div>
            }
            </IonCol>
        </IonRow>
    </div>
    )
}

export default DriverComplianceDetail