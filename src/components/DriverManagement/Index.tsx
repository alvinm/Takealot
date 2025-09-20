import { IonCol, IonIcon, IonImg, IonRow, IonSpinner } from "@ionic/react";
import { analyticsOutline, checkmarkCircleOutline, closeOutline, list, listOutline, warningOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { formatDate } from "../GlobalFunctions/Functions";
import ComplianceDashboard from "./Dashboard/ComplianceManagementDashboard";
import DriverDashboard from "./Dashboard/DriverDashboard";
import DriverManagmentList from "./HR/Index";
import DriverComplianceDetail from "./DriverComlianceDetail/Index";

const DriverManagement = (props:any) =>{
    const [countryId, setCountryId]                     = useState<any>()
    const [complianceList, setComplianceList]           = useState<any>([])
    const [driverList, setDriverList]                   = useState<any>([])
    const [driverComplianceList, setDriverComplianceList]                   = useState<any>([])
    const [driverId, setDriverId]                       = useState<any>(0)
    const [driverName, setDriverName]                   = useState<any>("")
    const [complianceSummary, setComplianceSummary]     = useState<any>([])
    const [listId, setListId]                           = useState<any>(0)
    const [contactId, setContactId]                     = useState<any>(0)
    const [hubKey, setHubKey]                           = useState<any>(0)
    const [filteredDriverList, setFilteredDriverList]   = useState<any>([]);
    const [complianceSpinner, setComplianceSpinner]     = useState<any>()   
    const [driverSpinner, setDriverSpinner]             = useState<any>()
    const [complianceChartView, showComplianceChartView]                    = useState<any>(true)
    const [complianceDetailView, showComplianceDetailView]                  = useState<any>()
    const [driverDemographicChartView, showDriverDemographicChartView]      = useState<any>(true)
    const [driverDemographicDetailView, showDriverDemographicDetailView]    = useState<any>()

    const filterByWarning = () => {
        const filtered = driverList.filter((x:any) => x.warning > 0);
        setFilteredDriverList(filtered);
    };

    const filterByExpired = () => {
        const filtered = driverList.filter((x:any) => x.expired > 0);
        setFilteredDriverList(filtered);
    };

    // Optional: Reset filter
    const resetFilter = () => {
        setFilteredDriverList(driverList);
    };
    //const callDriverComplianceList = (id:any) =>{
    //    fetch(props.state.secondary_host+'getAdminData?dbo=select_driver_compliance'+
    //        '&contact_id='+id
    //    )
    //    .then((response) => response.json())
    //    .then(data=>{
    //        setDriverComplianceList(data)
    //        setDriverId(id)
    //    })
    //}
    const callComplianceList = () =>{
        var z:any = []
        setComplianceList(z)
        setComplianceSpinner(true)
        fetch(props.state.secondary_host+'getAdminData?dbo=select_driver_compliance_stats'+
        "&contact_id="+driverId+
        "&type_id="+listId+
        "&hub_key="+hubKey

        )
        .then((response) => response.json())
        .then(data=>{setComplianceList(data); setComplianceSpinner(false)})
    }
    const callDrivers = () =>{
        setDriverSpinner(true)
        fetch(props.state.secondary_host+'getAdminData?dbo=select_driver'+
            "&type_id="+listId+
            "&hub_key="+hubKey
        )
        .then((response) => response.json())
        .then(data =>{setDriverList(data); setDriverSpinner(false)})
    }
    const callDriverCompliance =  (id:any) =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_driver_compliance'+
            '&contact_id='+id
        )
        .then((response) => response.json())
        .then(data=>{
            setDriverComplianceList(data)
        })
    }
    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 1 : showComplianceDetailView(true)         
                    callComplianceList()
                    callDrivers()
                    ;break;
            case 2 : showComplianceChartView(true)          ;break;
            case 3 : showDriverDemographicChartView(true)   ;break;
            case 4 : showDriverDemographicDetailView(true)  ;break;
        }
    }
    const resetView = () =>{
        showComplianceDetailView(false)      
        showComplianceChartView(false)       
        showDriverDemographicChartView(false)
        showDriverDemographicDetailView(false)
    }
    useEffect(()=> {
        //callDriverCompliance()
        //callComplianceList()
    },[driverId])
    useEffect(() => {
        callComplianceList()
        callDrivers()
    }, [hubKey]);
    useEffect(() => {
        setFilteredDriverList(driverList);
    }, [driverList]);
    useEffect(()=>{
        callComplianceList()
        callDrivers()
    },[listId])
    useEffect(()=>{
        setHubKey(props.state.hub_key)
        setView(2)
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
                <IonCol size="6">
                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol size="4">
                            {(complianceChartView ) &&
                                
                                <div className="text-container ion-padding" onClick={()=>{setView(1)}}>
                                    <IonIcon icon={listOutline} className="size-20"></IonIcon> &nbsp;
                                    Compliance Detail
                                </div>
                            }
                            {(!complianceChartView ) &&
                                <div className="text-container ion-padding" onClick={()=>{setView(2)}}>
                                    <IonIcon icon={analyticsOutline} className="size-20"></IonIcon> &nbsp;
                                    Compliance Chart
                                </div>
                            }
                        </IonCol>
                        <IonCol size="4">
                            {(!driverDemographicChartView) &&
                                <div className="text-container ion-padding" onClick={()=>{setView(3)}}>
                                    <IonIcon icon={analyticsOutline} className="size-20"></IonIcon> &nbsp;
                                    Driver Demographic Chart
                                </div>
                            }
                            {(driverDemographicChartView) &&
                                <div className="text-container ion-padding" onClick={()=>{setView(4)}}>
                                    <IonIcon icon={listOutline} className="size-20"></IonIcon> &nbsp;
                                    Driver Demographic Detail
                                </div>
                            }
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
            </div>
            {complianceDetailView &&
            <IonRow>
                <IonCol 
                    size="3"
                    className="size-20 ion-padding"
                    style={{borderRight:"3px solid #0070C0",height:"80vh"}}
                >
                    <IonRow className="size-24">
                        <IonCol>Management Options</IonCol>
                    </IonRow>
                    <IonRow className="size-28">
                        <IonCol>&nbsp;</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div className={listId==0?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} 
                                onClick={()=>{resetFilter(); setListId(0)}}
                            >
                                <IonRow>
                                    <IonCol size="1"></IonCol>
                                    <IonCol className='ion-text-left'>VIEW ALL</IonCol>
                                    <IonCol size="2" className='ion-text-right'>
                                        {complianceSpinner&&<IonSpinner className="size-24"></IonSpinner>}
                                    </IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                    </IonRow>
                    <div style={{overflowY:"auto", height:"70vh"}}>
                    {complianceList.map((x:any, i:number)=>(
                        <IonRow>
                            <IonCol>
                                <div style={{borderBottom:"0.5px solid #ccc", paddingTop:"1vh"}} className={x.id==listId?" ion-padding ion-text-center":" ion-padding ion-text-center"} onClick={()=>{setListId(x.id)}}>
                                    <IonRow>
                                        <IonCol size="1" className='ion-padding'>
                                            {x.expired != 0 ? 
                                                <div style={{height:"20px",width:"20px", borderRadius:"20px",backgroundColor:"red"}}></div> :
                                                x.warning != 0 ?<div style={{height:"20px",width:"20px", borderRadius:"20px",backgroundColor:"orange"}}></div> :
                                                <div></div>
                                            } 
                                        </IonCol>
                                        <IonCol className='ion-padding ion-text-left ellipsis-text'>{x.name}</IonCol>
                                        <IonCol size="2" className='ion-text-right text-orange'
                                            onClick={()=>{
                                               filterByWarning()
                                            }}
                                        >
                                            <div className="ion-padding ion-text-center" style={{borderRadius:"20px",border:"1px solid #ccc"}}>{x.warning}</div>
                                        </IonCol>
                                        <IonCol size="2" className='ion-text-right text-red'
                                            onClick={()=>{
                                               filterByExpired()
                                            }}
                                        >
                                            <div className="ion-padding ion-text-center" style={{borderRadius:"20px",border:"1px solid #ccc"}}>{x.expired}</div>
                                        </IonCol>
                                    </IonRow>
                                </div>
                            </IonCol>
                        </IonRow>
                        ))
                    }
                    </div>
                </IonCol>
                <IonCol>
                    <IonRow className="size-24 ">
                        <IonCol size="1" className="ion-padding ">
                            Drivers&nbsp;
                            {driverSpinner&&<IonSpinner className="size-24 text-blue"></IonSpinner>}
                        </IonCol>
                        <IonCol size="2">
                            {(driverId != 0)&&
                                <div 
                                    onClick={()=>{setDriverId(0)}}
                                    className="text-container ion-text-container ion-padding text-black"
                                    style={{height:"60px",width:"auto"}}
                                >
                                    {driverName}
                                </div>
                            }
                        </IonCol>
                        <IonCol>&nbsp;</IonCol>
                        <IonCol size="1">
                            <div 
                                onClick={()=>{setHubKey(0)}}
                                className={hubKey == 0?"ion-text-center selected-container ion-padding":"ion-text-center text-container ion-padding"}>
                                    All
                            </div>
                        </IonCol>
                        <IonCol size="2">
                            <div 
                                onClick={()=>{setHubKey(119)}}
                                className={hubKey == 119?"ion-text-center selected-container ion-padding":"ion-text-center text-container ion-padding"}>
                                    Middleburg
                            </div>
                        </IonCol>
                        <IonCol size="2">
                            <div 
                                onClick={()=>{setHubKey(222)}}
                                className={hubKey == 222?"ion-text-center selected-container ion-padding":"ion-text-center text-container ion-padding"}>
                                    Witbank
                            </div>
                        </IonCol>
                        <IonCol size="2">
                            <div 
                                onClick={()=>{setHubKey(257)}}
                                className={hubKey == 257?"ion-text-center selected-container ion-padding":"ion-text-center text-container ion-padding"}>
                                    Secunda
                            </div>
                        </IonCol>
                    </IonRow>
                    {(driverId == 0) &&
                    <IonRow>
                        <IonCol>
                            <IonRow >
                                <IonCol >
                                    <div >
                                        <IonRow>
                                            <IonCol>&nbsp;</IonCol>
                                        </IonRow>
                                    </div>
                                </IonCol>
                            </IonRow>
                            <IonRow style={{height:"75vh",overflowY:"auto"}}>
                            {filteredDriverList.map((x:any, i:number)=>
                                (
                                    <IonCol size="3" key={i}>
                                        <div 
                                            style={{border:"0.5px solid #eee",borderRadius:"20px"}}
                                            className={listId==x.id?" ion-padding ion-text-center ":" ion-padding ion-text-center "} 
                                        >
                                            <IonRow >
                                                <IonCol size="1"></IonCol>
                                                <IonCol 
                                                    className='ion-text-left ion-text-hover'
                                                    onClick={()=>{setDriverId(x.id); setDriverName(x.name)}}
                                                >
                                                    {x.name}
                                                </IonCol>
                                                <IonCol size="2">
                                                    <IonRow>
                                                        <IonCol>{x.warning}</IonCol>
                                                        <IonCol>{x.expired}</IonCol>
                                                    </IonRow>
                                                </IonCol>
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
                                        </div>
                                    </IonCol>
                                )
                            )}
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    }
                    {(driverId != 0) &&
                    <div>
                        <IonRow>
                            <IonCol>
                                <IonRow >
                                    <IonCol >
                                        <div >
                                            <IonRow>
                                                <IonCol>&nbsp;</IonCol>
                                            </IonRow>
                                        </div>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                               <DriverComplianceDetail
                                    state ={props.state}
                                    driver_id = {driverId}
                               />
                            </IonCol>
                        </IonRow>  
                    </div>  
                    }
                </IonCol>
            </IonRow>
            }
            {complianceChartView &&
            <div>
                <ComplianceDashboard
                    state={props.state}
                    result={(e:any)=>{
                        setHubKey(e.hub_key); 
                        setListId(e.compliance_id)
                        setView(1)
                    }}
                />
            </div>
            }
            {driverDemographicChartView &&
            <div>
                <DriverDashboard
                    state={props.state}
                    result={(e:any)=>{
                        setHubKey(e.hub_key); 
                        setCountryId(e.countryId)
                        setView(4)
                    }}
                />
            </div>
            }
            {driverDemographicDetailView &&
            <div>
                <DriverManagmentList
                    state={props.state}
                    result={(e:any)=>{
                        /** */
                    }}
                />
            </div>
            }
        </div>
    )
}
export default DriverManagement