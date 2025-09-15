import { IonAccordion, IonAccordionGroup, IonBadge, IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,  } from "recharts";
import './Index.css'
import PieChart from "../../Charts/PieChart";

const ComplianceDashboard = (props:any) =>{
    const [hubKey, setHubKey]                                                   = useState<any>(0)
    const [complianceStatsByHubData, setComplianceStatsByHubData]               = useState<any>([])
    const [complianceItemStatsByHubData, setComplianceItemStatsByHubData]       = useState<any>([])
    const callDriverComplianceStatsByHub = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_driver_compliance_stats_by_hub'+
            "&hub_key="+hubKey
        )
        .then((response) => response.json())
        .then(data=>{
            const maxAll:any = Math.max(...data.map((hub:any) => Math.max(hub.expired, hub.warning, hub.compliance)));
            const maxExpired:any = Math.max(...data.map((hub:any) => Math.max(hub.expired)));
            const maxWarning:any = Math.max(...data.map((hub:any) => Math.max(hub.warning)));
            const maxCompliance:any = Math.max(...data.map((hub:any) => Math.max(hub.compliance)));
            setComplianceStatsByHubData(data)
            
        })

    }
    const callDriverComplianceItemStatsByHub = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_driver_compliance_items_stats_by_hub'+
            "&hub_key="+hubKey
        )
        .then((response) => response.json())
        .then(data=>{
            const maxAll:any = Math.max(...data.map((hub:any) => Math.max(hub.count)))
            setComplianceItemStatsByHubData(data)
            
        })

    }
   
    useEffect(()=>{
        callDriverComplianceStatsByHub()
        callDriverComplianceItemStatsByHub()
    },[props])
    return(
    <div>
        <IonRow>
            {(complianceStatsByHubData.length > 0) &&
            <IonCol>
                <IonRow>
                    <IonCol  className="ion-padding">
                        <PieChart
                            data={complianceStatsByHubData[0]}
                            chart_name={complianceStatsByHubData[0].hub}
                        />
                    </IonCol>
                    <IonCol   className="ion-padding">
                        <PieChart
                            data={complianceStatsByHubData[1]}
                            chart_name={complianceStatsByHubData[1].hub}
                        />
                    </IonCol>
                    <IonCol   className="ion-padding">
                        <PieChart
                            data={complianceStatsByHubData[2]}
                            chart_name={complianceStatsByHubData[2].hub}
                        />
                    </IonCol>
                </IonRow>
            </IonCol>
            }
        </IonRow>
        <IonRow>
            <IonCol size="4">
                <IonRow>
                    <IonCol  className="ion-padding">
                        <div style={{marginBottom:"2px",borderBottom:"1px solid #fff"}}>
                            <div style={{float:"left",width:"40%"}} className="ellipsis-text ion-text-bold">ITEM</div>
                            <div style={{float:"left",width:"60%"}} className="ion-text-right ion-text-bold">EXPIRED COUNT</div>
                        </div>
                        {complianceItemStatsByHubData
                        .filter((x: any) => x.hub_key === 119)
                        .sort((a: any, b: any) => b.count - a.count)
                        .map((x:any,i:number)=>(
                            <div 
                                key={i} 
                                style={{marginBottom:"2px",borderBottom:"1px solid #fff"}} 
                                className="ion-text-hover"
                                onClick={()=>{
                                    var option:any = []
                                    option.push({
                                        hub_key:119, 
                                        compliance_id:x.compliance_id
                                    })
                                    props.result(option[0])
                                }}
                            >
                                <div style={{float:"left",width:"40%"}} className="ellipsis-text">{x.compliance}</div>
                                <div style={{float:"left",width:"50%", height:"30px"}} className="">
                                    <div style={{height:"25px",width:(x.count/(Math.max(...complianceItemStatsByHubData.filter((x: any) => x.hub_key === 119).map((hub:any) => Math.max(hub.count)))))*100+"%",
                                        backgroundColor:(x.compliance_id == 59 || x.compliance_id == 69 || x.compliance_id == 64)?"#DC3545":"#aaa"}}></div>
                                </div>
                                <div style={{float:"left",width:"10%"}} className="ion-text-right ion-bold-text">({x.count})</div>
                            </div>
                        ))}
                    </IonCol>
                </IonRow>
            </IonCol>
             <IonCol size="4">
                <IonRow>
                    <IonCol  className="ion-padding">
                        <div style={{marginBottom:"2px",borderBottom:"1px solid #fff"}}>
                            <div style={{float:"left",width:"40%"}} className="ellipsis-text ion-text-bold">ITEM</div>
                            <div style={{float:"left",width:"60%"}} className="ion-text-right ion-text-bold">EXPIRED COUNT</div>
                        </div>
                        {complianceItemStatsByHubData
                        .filter((x: any) => x.hub_key === 257)
                        .sort((a: any, b: any) => b.count - a.count)
                        .map((x:any,i:number)=>(
                            <div 
                                key={i} 
                                style={{marginBottom:"2px",borderBottom:"1px solid #fff"}} 
                                className="ion-text-hover"
                                onClick={()=>{
                                    var option:any = []
                                    option.push({
                                        hub_key:257, 
                                        compliance_id:x.compliance_id
                                    })
                                    props.result(option[0])
                                }}
                            >
                                <div style={{float:"left",width:"40%"}} className="ellipsis-text">{x.compliance}</div>
                                <div style={{float:"left",width:"50%", height:"30px"}} className="">
                                    <div style={{height:"25px",width:(x.count/(Math.max(...complianceItemStatsByHubData.filter((x: any) => x.hub_key === 257).map((hub:any) => Math.max(hub.count)))))*100+"%",
                                        backgroundColor:(x.compliance_id == 59 || x.compliance_id == 69 || x.compliance_id == 64)?"#DC3545":"#aaa"}}></div>
                                </div>
                                <div style={{float:"left",width:"10%"}} className="ion-text-right ion-bold-text">({x.count})</div>
                            </div>
                        ))}
                    </IonCol>
                </IonRow>
            </IonCol>
             <IonCol size="4">
                <IonRow>
                    <IonCol  className="ion-padding">
                        <div style={{marginBottom:"2px",borderBottom:"1px solid #fff"}}>
                            <div style={{float:"left",width:"40%"}} className="ellipsis-text ion-text-bold">ITEM</div>
                            <div style={{float:"left",width:"60%"}} className="ion-text-right ion-text-bold">EXPIRED COUNT</div>
                        </div>
                        {complianceItemStatsByHubData
                        .filter((x: any) => x.hub_key === 222)
                        .sort((a: any, b: any) => b.count - a.count)
                        .map((x:any,i:number)=>(
                            <div 
                                key={i} 
                                style={{marginBottom:"2px",borderBottom:"1px solid #fff"}} 
                                className="ion-text-hover"
                                onClick={()=>{
                                    var option:any = []
                                    option.push({
                                        hub_key:222, 
                                        compliance_id:x.compliance_id
                                    })
                                    props.result(option[0])
                                }}
                            >
                                <div style={{float:"left",width:"40%"}} className="ellipsis-text">{x.compliance}</div>
                                <div style={{float:"left",width:"50%", height:"30px"}} className="">
                                    <div style={{height:"25px",width:(x.count/(Math.max(...complianceItemStatsByHubData.filter((x: any) => x.hub_key === 222).map((hub:any) => Math.max(hub.count)))))*100+"%",
                                        backgroundColor:(x.compliance_id == 59 || x.compliance_id == 69 || x.compliance_id == 64)?"#DC3545":"#aaa"}}></div>
                                </div>
                                <div style={{float:"left",width:"10%"}} className="ion-text-right ion-bold-text">({x.count})</div>
                            </div>
                        ))}
                    </IonCol>
                </IonRow>
            </IonCol>
        </IonRow>
    </div>
    )
}
export default ComplianceDashboard