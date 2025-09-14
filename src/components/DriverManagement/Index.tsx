import { IonCol, IonIcon, IonImg, IonRow, IonSpinner } from "@ionic/react";
import { checkmarkCircleOutline, closeOutline, list, warningOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { formatDate } from "../GlobalFunctions/Functions";
import ComplianceDashboard from "./Dashboard/Index";

const DriverManagement = (props:any) =>{
    const [stage, setStage]                             = useState<any>()
    const [complianceList, setComplianceList]           = useState<any>([])
    const [driverList, setDriverList]                   = useState<any>([])
    const [driverComplianceList, setDriverComplianceList] = useState<any>([])
    const [driverId, setDriverId]                       = useState<any>(0)
    const [driverName, setDriverName]                   = useState<any>("")
    const [complianceSummary, setComplianceSummary]     = useState<any>([])
    const [listId, setListId]                           = useState<any>(0)
    const [contactId, setContactId]                     = useState<any>(0)
    const [hubKey, setHubKey]                           = useState<any>(0)
    const [filteredDriverList, setFilteredDriverList]   = useState<any>([]);
    const [complianceSpinner, setComplianceSpinner]     = useState<any>()   
    const [driverSpinner, setDriverSpinner]             = useState<any>()
    const [chartView, showChartView]                    = useState<any>(true)

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
    const callDriverCompliance =  () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_driver_compliance'+
            '&contact_id='+driverId
        )
        .then((response) => response.json())
        .then(data=>{
            setDriverComplianceList(data)
        })
    }
    useEffect(()=> {
        callDriverCompliance()
        callComplianceList()
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
        callComplianceList()
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
            {!chartView &&
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
                                                    onClick={()=>{setDriverId(x.id), setDriverName(x.name)}}
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
                                <IonRow>
                                    {driverComplianceList.map((x:any,i:number)=>(
                                        <IonCol 
                                            size="12" 
                                            className="ion-padding size-20"
                                        >
                                            <IonRow>
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
                                        </IonCol>
                                    ))}
                                </IonRow>
                            </IonCol>
                        </IonRow>  
                    </div>  
                    }
                </IonCol>
            </IonRow>
            }
            {chartView &&
            <div>
                <ComplianceDashboard
                    state={props.state}
                />
            </div>
            }
        </div>
    )
}
export default DriverManagement