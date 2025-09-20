import { IonCol, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";


const ItemButtons = (props:any) =>{

    const [id, setId]                                       = useState<any>(0)
    const [conditionButtonsData, setConditionButtonData]    = useState<any>([])

    const callConditions = () =>{
        fetch(props.state.secondary_host + "getAdminData?dbo=select_driver_audit_item_score_sheet"+
            "&item_id="+props.item_id
        )
            .then((res) => res.json())
            .then(setConditionButtonData);
    }
    const setDriverAuditCondition = (id:any, score:any) =>{
        fetch(props.state.secondary_host + "getAdminData?dbo=update_driver_audit"+
            '&driver_audit_id='+props.driver_audit_id+
            '&score='+score+
            '&updated_by='+props.state.user_id
        )
            .then((res) => res.json())
            .then((data)=>{setId(id)})
    }
    useEffect(()=>{
        callConditions()
    },[props])
    return(
        <IonRow className="">
            {conditionButtonsData.map((x:any,i:number)=>(
                <IonCol size="3" >
                    <div
                        onClick={()=>{setDriverAuditCondition(x.id, x.score)}}
                        className={x.id == id? "selected-container ion-padding":"ion-padding ion-text-hover"}
                        style={{borderRadius:"30px", border:"0.5px solid #ccc",height:"70px"}}
                    >
                        {x.condition}
                    </div>
                </IonCol>
            ))}
        </IonRow>
    )
}
export default ItemButtons