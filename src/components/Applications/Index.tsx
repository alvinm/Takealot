import { IonCol, IonIcon, IonImg, IonRow } from "@ionic/react";
import { apps, bus, car, clipboard, construct, fileTrayFull, gift, images, imagesSharp, statsChart, woman } from "ionicons/icons";
import React, { useEffect, useState } from "react";

const Applications = (props:any) =>{
    const [contactDepartmentData, setContactDepartmentData] = useState<any>([])
    const [selected, setSelected]                           = useState<any>()

    const callContactDepartment = () =>{
        var user_id:any = 6
        if(props.state.user_id != undefined &&  props.state.user_id != 1)
            user_id = props.state.user_id

        fetch(props.state.secondary_host+'getAdminData?dbo=select_contact_department'+
            '&contact_id='+user_id
        )
        .then((response) => response.json())
        .then(data => {setContactDepartmentData(data)})
    }
    const getIcon = (id:any) =>{
        switch(id){
            case 13:    return bus;break;
            case 14:    return images;break;
            case 15:    return car;break;
            case 16:    return woman;break;
            case 44:    return clipboard;break;
            case 79:    return fileTrayFull;break;
            case 1081:  return construct; break;
            case 1082:  return statsChart; break;
            default:    return apps
            
        }
    }
    useEffect(()=>{
        switch(selected){
            case 13:    props.result(6);break;
            case 14:    props.result(3);break;
            case 15:    props.result(2);break;
            case 16:    props.result() ;break;
            case 44:    props.result(5) ;break;
            case 79:    props.result(4) ;break;
            case 1081:  props.result(1);break;
            case 1082:  props.result(9) ;break;
        }
    },[selected])
    useEffect(()=>{
        callContactDepartment()
    },[props])

    return(
        <div>
            <div style={{position:"fixed",top:"1vh",width:"85%"}}>
                <IonRow>
                    <IonCol size='3'>
                        <IonRow className='ion-padding'>
                            <IonCol className='ion-padding' onClick={()=>{}}>
                                <IonImg src="/images/IntelRock.JPG" style={{width:"200px"}}></IonImg>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="6" className="ion-text-center">
                        
                    </IonCol>
                    <IonCol size="2"></IonCol>
                </IonRow>
            </div>
            {contactDepartmentData &&
                <div>
                    <IonRow>
                        <IonCol style={{color:"#0070C0",fontWeight:"bold"}} className="size-24">
                            <b>APPS</b>
                        </IonCol>
                    </IonRow>
                {contactDepartmentData.map((x:any,i:number)=>{
                    if(x.checked == 1)
                    return(
                    <IonRow key={i} >
                        <IonCol 
                            size="12" 
                            style={{opacity:x.checked == 1? "1":"0.6"}}
                            onClick={()=>{setSelected(x.id)}}
                        >
                                <IonRow 
                                    className="ion-text-bold ion-text-hover" 
                                    style={{border:selected == x.id ? "0px solid #0070C0":"0px solid #999", 
                                        color:"#555", 
                                        borderRadius:"16px", 
                                        backgroundColor:selected == x.id ? "#eef":"#fff"}}
                                >
                                    <IonCol size="2">
                                        <IonIcon 
                                            icon={getIcon(x.id)} 
                                            className="size-32" 
                                            style={{color:selected == x.id ?"#0070C0":"#0070C0"}} 
                                        >
                                        </IonIcon>
                                    </IonCol>
                                    <IonCol 
                                        size="10" 
                                        className="size-16 ion-text-bold ion-text-left "
                                        style={{color:selected == x.id ?"#0070C0":"#999"}}
                                    >
                                        {x.name.toUpperCase()}
                                    </IonCol>
                                </IonRow> 
                        </IonCol>
                    </IonRow>
                    )
                })}
            </div>
            }
        </div>
    )
}
export default Applications