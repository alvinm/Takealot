import { IonCol, IonIcon, IonImg, IonRow } from "@ionic/react";
import { analyticsOutline, car, checkmarkCircleOutline, closeOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import ItemButtons from "./ItemButtons/ItemButtons";
import { formatDate } from "../../GlobalFunctions/Functions";
import LastDriverAuditStatus from "./LastDriverAuditStatus";

const DriverAudit = (props:any) =>{
    const [contactId, setContactId]         = useState<any>()
    const [driverName, setDriverName]       = useState<any>()
    const [drivers, setDrivers]             = useState<any[]>([]);
    const [audits, setAudits]               = useState<any[]>([]);
    const [auditHistoryData, setAuditHistoryData]             = useState<any[]>([]);
    const [auditHistoryDetailData, setAuditHistoryDetailData]             = useState<any[]>([]);
    const [hubKey, setHubKey]               = useState<any>(119)
    const [NewAuditView, showNewAuditView]          = useState<any>()
    const [AuditHistoryView, showAuditHistoryView]  = useState<any>()
    const [AuditHistoryDetailView, showAuditHistoryDetailView]  = useState<any>()
    const callDrivers = () => {
        fetch(props.state.secondary_host + "getAdminData?dbo=select_driver"+
            "&hub_key="+hubKey

        )
            .then((res) => res.json())
            .then(setDrivers);
    };

    const callAuditList = () => {
        var z:any = []
        setAudits(z)
        fetch(props.state.secondary_host + "getAdminData?dbo=select_driver_audit_list"+
            '&contact_id='+contactId+
            '&created_by='+props.state.user_id
        )
        .then((res) => res.json())
        .then((data) => setAudits(data.sort((a: any, b: any) => a.id - b.id)));
    };
    const callAuditHistory = () =>{
        var z:any = []
        setAuditHistoryData(z)
        fetch(props.state.secondary_host+"getAdminData?dbo=select_driver_audit_summary"+
            '&contact_id='+contactId
        )
        .then((res) => res.json())
        .then((data) => setAuditHistoryData(data));
    }
    const callAuditHistoryDetail = (created_date:any) =>{
        var z:any = []
        setAuditHistoryDetailData(z) 
        fetch(props.state.secondary_host+"getAdminData?dbo=select_driver_audit_detail"+
            '&contact_id='+contactId+
            '&created_date='+created_date
        )
        .then((res) => res.json())
        .then((data) => {setAuditHistoryDetailData(data); setView(3)} );
    }

    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 1: showAuditHistoryView(true);callAuditHistory();break;
            case 2: showNewAuditView(true) ;callAuditList();break;
            case 3: showAuditHistoryDetailView(true);break;
        }
    }
    const resetView = () =>{
        showAuditHistoryView(false)     
        showNewAuditView(false)          
        showAuditHistoryDetailView(false)
    }
    useEffect(()=>{
        callDrivers()
    },[hubKey])
    useEffect(()=>{
        setView(1)
    },[contactId])
    useEffect(()=>{
        //callAuditList()
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

                </IonRow>
            </div>
            <IonRow>
                <IonCol 
                    size="3"
                    className="size-20 ion-text-bold ion-padding"
                    style={{borderRight:"3px solid #0070C0",height:"80vh"}}
                >
                    <IonRow className="size-20">
                        <IonCol>Driver List</IonCol>
                    </IonRow>
                    <IonRow style={{height:"75vh", overflowY:"auto"}}>
                        <IonCol>
                            {drivers.map((x: any) => (
                            <IonRow key={x.id}>
                                <IonCol>
                                    <div
                                        className={
                                            contactId === x.id
                                            ? "selected-container ion-padding ion-text-center size-20"
                                            : " ion-padding ion-text-center size-20"
                                        }
                                        style={{borderBottom:"0.5px solid #ddd"}}
                                        onClick={() => {setContactId(x.id);  setDriverName(x.name)}}
                                    >
                                        <IonRow>
                                            <IonCol size="2">
                                                <IonIcon icon={car} className="size-20"></IonIcon>
                                            </IonCol>
                                            <IonCol className="ion-text-left">{x.name}</IonCol>
                                            <IonCol size="1">
                                                <LastDriverAuditStatus
                                                    state={props.state}
                                                    contact_id={x.id}
                                                />
                                            </IonCol>
                                        </IonRow>
                                    </div>
                                </IonCol>
                            </IonRow>
                            ))}
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow className="size-20 ion-text-bold" style={{position:"fixed",width:"70%",zIndex:"2",backgrounColor:"#fff"}}>
                        <IonCol size="2">Audit List</IonCol>
                        <IonCol size="2">
                            <div 
                                className="ion-padding ion-text-center" 
                                style={{color:"#0070C0",borderRadius:"30px",border:"0.5px solid #ccc",height:"60px"}}
                            >
                                {driverName == undefined? "No Driver":driverName}
                            </div>
                        </IonCol>
                        <IonCol></IonCol>
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
                    <IonRow>
                        <IonCol style={{marginTop:"6vh"}} >
                            <div style={{height:"75vh", overflowY:"auto"}}>
                                {NewAuditView &&
                                <div>
                                <IonRow className="ion-text-bold ion-padding" style={{position:"fixed",width:"100%",zIndex:"2"}}>
                                    <IonCol  size="8"style={{backgroundColor:"#0070C0",color:"#fff"}}>
                                        <IonRow>
                                            <IonCol>NEW AUDIT</IonCol>
                                            <IonCol size="1"></IonCol>
                                            <IonCol size="1"></IonCol>
                                        </IonRow>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="ion-padding" >
                                    <IonCol size="8"  style={{}}>
                                        {audits.map((x: any,i:any) => (
                                        <IonRow key={i} style={{fontSize:"20px",  borderBottom:"0.5px solid #ddd",marginTop:"4vh"}}>
                                            <IonCol size="12" >
                                                <IonRow className="" >
                                                    <IonCol className="ion-text-left ion-text-bold">{i+1}). {x.item}</IonCol>
                                                </IonRow>
                                            </IonCol>
                                            <IonCol size="12">
                                                    <ItemButtons
                                                        state={props.state}
                                                        driver_audit_id={x.driver_audit_id}
                                                        contact_id={contactId}
                                                        item_id={x.item_id}
                                                    />
                                            </IonCol>
                                        </IonRow>
                                        ))}
                                    </IonCol>
                                    <IonCol>
                                        <IonRow style={{marginTop:"6vh"}}>
                                            <IonCol>
                                                <div
                                                    onClick={()=>{setView(2)}} 
                                                    className="ion-text-hover size-20 ion-padding ion-text-center" 
                                                    style={{border:"0.5px solid #ccc",borderRadius:"30px", }}>NEW AUDIT</div>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol>
                                                <div
                                                    onClick={()=>{setView(1)}} 
                                                    className="ion-text-hover size-20 ion-padding ion-text-center" 
                                                    style={{border:"0.5px solid #ccc",borderRadius:"30px", }}>SUMMARY</div>
                                            </IonCol>
                                        </IonRow>
                                    </IonCol>
                                </IonRow>
                                </div>
                                }
                                {(AuditHistoryView && auditHistoryData) &&
                                <div>
                                    <IonRow>
                                        <IonCol size="8">
                                            <IonRow 
                                                className="ion-padding size-20 ion-text-bold" 
                                                style={{backgroundColor:"#0070C0",color:"#fff",}}
                                            >
                                                <IonCol></IonCol>
                                                <IonCol size="2">LAST AUDIT</IonCol>
                                                <IonCol size="7">NAME</IonCol>
                                                <IonCol size="2" className="ion-text-right">SCORE</IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol size="8" className="ion-padding" style={{borderRight:"2px solid #0070C0"}}>
                                            {auditHistoryData.map((x:any, i:number)=>(
                                                <IonRow
                                                    onClick={()=>{callAuditHistoryDetail(formatDate(x.created_date))}}
                                                    className="ion-text-hover size-20"
                                                >
                                                    <IonCol>
                                                        {x.score == null?
                                                            <div style={{height:"20px",width:"20px",borderRadius:"10px",backgroundColor:"grey"}}></div>
                                                            :
                                                            (x.score/1)/22 < 0.90?
                                                            <div style={{height:"20px",width:"20px",borderRadius:"10px",backgroundColor:"red"}}></div>
                                                            :
                                                            <div style={{height:"20px",width:"20px",borderRadius:"10px",backgroundColor:"green"}}></div>
                                                        }
                                                    </IonCol>
                                                    <IonCol size="2">{formatDate(x.created_date)}</IonCol>
                                                    <IonCol size="7">{x.driver}</IonCol>
                                                    <IonCol size="2" className="ion-text-right">{x.score}/22 ({(x.score/22*100).toFixed(0)})%</IonCol>
                                                </IonRow>
                                            ))}
                                        </IonCol>
                                        <IonCol>
                                            <IonRow>
                                                <IonCol>
                                                    <div
                                                        onClick={()=>{setView(2)}} 
                                                        className="ion-text-hover size-20 ion-padding ion-text-center" 
                                                        style={{border:"0.5px solid #ccc",borderRadius:"30px", }}>NEW AUDIT</div>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol>
                                                    <div
                                                        onClick={()=>{setView(1)}} 
                                                        className="ion-text-hover size-20 ion-padding ion-text-center" 
                                                        style={{border:"0.5px solid #ccc",borderRadius:"30px", }}>SUMMARY</div>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                </div>
                                }
                                {AuditHistoryDetailView && 
                                <div>
                                    <IonRow>
                                        <IonCol size="8">
                                            <IonRow className="ion-padding size-20 ion-text-bold" style={{backgroundColor:"#0070C0",color:"#fff",}}>
                                                <IonCol></IonCol>
                                                <IonCol size="2">DATE</IonCol>
                                                <IonCol size="7">ITEM</IonCol>
                                                <IonCol size="2" className="ion-text-right">SCORE</IonCol>
                                            </IonRow>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol size="8"  style={{borderRight:"2px solid #0070C0"}}>
                                            {auditHistoryDetailData.map((x:any, i:number)=>(
                                                <IonRow
                                                    key={i}
                                                    onClick={()=>{/** */}}
                                                    className="ion-text-hover size-20"
                                                >
                                                    
                                                    <IonCol size="2">{formatDate(x.created_date)}</IonCol>
                                                    <IonCol size="7">{i+1}). {x.item}</IonCol>
                                                    <IonCol size="2" className="ion-text-right">{x.score}</IonCol>
                                                </IonRow>
                                            ))}
                                        </IonCol>
                                        <IonCol>
                                            <IonCol>
                                            <IonRow>
                                                <IonCol>
                                                    <div
                                                        onClick={()=>{setView(2)}} 
                                                        className="ion-text-hover size-20 ion-padding ion-text-center" 
                                                        style={{border:"0.5px solid #ccc",borderRadius:"30px", }}>NEW AUDIT</div>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol>
                                                    <div
                                                        onClick={()=>{setView(1)}} 
                                                        className="ion-text-hover size-20 ion-padding ion-text-center" 
                                                        style={{border:"0.5px solid #ccc",borderRadius:"30px", }}>SUMMARY</div>
                                                </IonCol>
                                            </IonRow>
                                        </IonCol>
                                        </IonCol>
                                    </IonRow>
                                </div>
                                }
                            </div>
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default DriverAudit