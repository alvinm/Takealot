import { IonCol, IonIcon, IonImg, IonItem, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { formatDate, formatDateTime, HighchartsDate } from "../GlobalFunctions/Functions";
import LineSeriesChart from "../Charts/LineSeriesChart";
import ImageUpload from "../ImageUpload/ImageUpload";
import { cloudUploadOutline, refreshCircleOutline, settingsOutline } from "ionicons/icons";
import RecruitmentAdmin from "./Admin/Index";
import RecruitmentDashboard from "./Dashboard/Index";


const Recruitment = (props:any) =>{
   
    
    
    
    const [hubKey, setHubKey]                   = useState<any>(119)
    const [driverKey, setDriverKey]             = useState<any>(0)
    const [schedulePerfomanceKey, setSchedulePerformanceKey]    = useState<any>(0)
    const [deliveryStatusKey, setDeliveryStatusKey]             = useState<any>(0)
    const [orderTypeKey, setOrderTypeKey]       = useState<any>(0)
    const [orderStatusKey, setOrderStatus]      = useState<any>(0)
    const [seriesData, setSeriesData]           = useState<any>()
    const [dailySpinner, showDailySpinner]      = useState<any>()

    const [combined, setCombined]               = useState<any>([])
     
    const [verification, setVerification]       = useState<any>(0)
    const [approved, setApproved]               = useState<any>(0)
    

    const [dashboardView, showDashboardView]     = useState<any>()
    const [adminView, showAdminView]             = useState<any>()

    
    

    let Controller = new AbortController();
    
    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 1: showDashboardView(true) ;break;
            case 2: showAdminView(true) ;break;
        }
    }
    const resetView = () =>{
        showDashboardView(false)
        showAdminView(false)
    }
    useEffect(()=>{
        setView(1)
    },[props])
    return(
           
            <div>
                <div style={{position:"fixed",top:"1vh",width:"95%"}}>
                    <IonRow>
                        <IonCol size='2'>
                            <IonRow className='ion-padding'>
                                <IonCol className='ion-padding' onClick={()=>{}}>
                                    <IonImg src="../../public/images/IntelRock.JPG" style={{width:"200px"}}></IonImg>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol size="8" className="ion-text-center"></IonCol>
                        <IonCol 
                            size="2"
                            className="ion-padding"
                            onClick={()=>{
                                if(dashboardView)
                                    setView(2)
                                if(adminView)
                                    setView(1)
                            }}
                        >
                            <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                            <IonRow className="ion-padding ion-text-center text-hover" style={{color:"#fff",backgroundColor:"#aaa",borderRadius:"30px",height:"56px"}}>
                                <IonCol className="ion-text-left" size="2"><IonIcon icon={settingsOutline} className="size-24"></IonIcon></IonCol>
                                <IonCol className="ion-text-left size-24">{dashboardView ? <div>Admin</div>:<div>Dashboard</div>}</IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </div>
            
             {dashboardView &&
            <div>
                <RecruitmentDashboard
                    state   = {props.state}
                    result  = {(e:any)=>{setView(e)}}
                />
            </div>
            }
            {adminView &&
            <div>
                <IonRow>
                    <IonCol>
                        <RecruitmentAdmin
                            state = {props.state}
                            result={(e:any)=>{setView(e)}}
                        />
                    </IonCol>
                </IonRow>
                
            </div>
            }

        </div>
    )
}
export default Recruitment