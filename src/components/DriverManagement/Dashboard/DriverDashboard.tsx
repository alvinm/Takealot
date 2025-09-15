import React, { useEffect, useState } from "react";
import './Index.css'
import { IonCol, IonRow } from "@ionic/react";
import PieChart2 from "../../Charts/PieChart2";


const DriverDashboard = (props:any) =>{
    const [hubKey, setHubKey]                                       = useState<any>(0)
    const [driverCountryByHubData, setDriverCountryByHubData]       = useState<any>([])
    const [driverAgeDemographicByHubData, setDriverAgeDemographicsByHubData]       = useState<any>([])

    const callDriverCountryDemographicdByHub = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_driver_demographics_country')
        .then((response) => response.json())
        .then(data=>{
            var d:any = []
            data.map((x:any)=>(
                d.push({name:x.name, y:x.y/1, hub_key:x.hub_key, hub:x.hub, id:x.country_id})
            ))
            console.log(d)
            setDriverCountryByHubData(d)
        })

    }
    const callDriverAgeRangeDemographicsByHub = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_driver_demographics_age_range')
        .then((response) => response.json())
        .then(data=>{
            setDriverAgeDemographicsByHubData(data)
        })

    }
    useEffect(()=>{
        callDriverCountryDemographicdByHub()
        callDriverAgeRangeDemographicsByHub()
    },[props])
    return(
    <div>
        <IonRow>
            <IonCol >
                {(driverCountryByHubData.length > 0) &&
                <IonRow>
                    <IonCol  className="ion-padding">
                        <PieChart2
                            data={driverCountryByHubData.filter((x: any) => x.hub_key === 119)}
                            chart_name={driverCountryByHubData.filter((x: any) => x.hub_key === 119)[0].hub}
                        />
                         <IonRow>
                            <IonCol  className="ion-padding">
                                <div style={{marginBottom:"2px",borderBottom:"1px solid #fff"}}>
                                    <div style={{float:"left",width:"20%"}} className="ellipsis-text ion-text-bold">ITEM</div>
                                    <div style={{float:"left",width:"80%"}} className="ion-text-right ion-text-bold">COUNT</div>
                                </div>
                                {driverAgeDemographicByHubData
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
                                                range:x.range
                                            })
                                            props.result(option[0])
                                        }}
                                    >
                                        <div style={{float:"left",width:"20%"}} className="ellipsis-text">{x.range}</div>
                                        <div style={{float:"left",width:"70%", height:"30px"}} className="">
                                            <div style={{height:"25px",width:(x.count/(Math.max(...driverAgeDemographicByHubData.filter((x: any) => x.hub_key === 119).map((hub:any) => Math.max(hub.count)))))*100+"%",backgroundColor:( x.range == "No Age" || x.range == "0 - 17" )?"#DC3545":"#aaa"}}></div>
                                        </div>
                                        <div style={{float:"left",width:"10%"}} className="ion-text-right ion-bold-text">({x.count})</div>
                                    </div>
                                ))}
                            </IonCol>
                        </IonRow>
                    </IonCol>

                
                    <IonCol   className="ion-padding">
                        <PieChart2
                            data={driverCountryByHubData.filter((x: any) => x.hub_key === 222)}
                            chart_name={driverCountryByHubData.filter((x: any) => x.hub_key === 222)[0].hub}
                        />
                        <IonRow>
                            <IonCol  className="ion-padding">
                                <div style={{marginBottom:"2px",borderBottom:"1px solid #fff"}}>
                                    <div style={{float:"left",width:"40%"}} className="ellipsis-text ion-text-bold">ITEM</div>
                                    <div style={{float:"left",width:"60%"}} className="ion-text-right ion-text-bold">COUNT</div>
                                </div>
                                {driverAgeDemographicByHubData
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
                                                range:x.range
                                            })
                                            props.result(option[0])
                                        }}
                                    >
                                        <div style={{float:"left",width:"20%"}} className="ellipsis-text">{x.range}</div>
                                        <div style={{float:"left",width:"70%", height:"30px"}} className="">
                                            <div style={{height:"25px",width:(x.count/(Math.max(...driverAgeDemographicByHubData.filter((x: any) => x.hub_key === 257).map((hub:any) => Math.max(hub.count)))))*100+"%",backgroundColor:( x.range == "No Age" || x.range == "0 - 17" )?"#DC3545":"#aaa"}}></div>
                                        </div>
                                        <div style={{float:"left",width:"10%"}} className="ion-text-right ion-bold-text">({x.count})</div>
                                    </div>
                                ))}
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol   className="ion-padding">
                        <PieChart2
                            data={driverCountryByHubData.filter((x: any) => x.hub_key === 257)}
                            chart_name={driverCountryByHubData.filter((x: any) => x.hub_key === 257)[0].hub}
                        />
                        <IonRow>
                            <IonCol  className="ion-padding">
                                <div style={{marginBottom:"2px",borderBottom:"1px solid #fff"}}>
                                    <div style={{float:"left",width:"20%"}} className="ellipsis-text ion-text-bold">ITEM</div>
                                    <div style={{float:"left",width:"80%"}} className="ion-text-right ion-text-bold">COUNT</div>
                                </div>
                                {driverAgeDemographicByHubData
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
                                                range:x.range
                                            })
                                            props.result(option[0])
                                        }}
                                    >
                                        <div style={{float:"left",width:"20%"}} className="ellipsis-text">{x.range}</div>
                                        <div style={{float:"left",width:"70%", height:"30px"}} className="">
                                            <div style={{height:"25px",width:(x.count/(Math.max(...driverAgeDemographicByHubData.filter((x: any) => x.hub_key === 222).map((hub:any) => Math.max(hub.count)))))*100+"%",backgroundColor:( x.range == "No Age" || x.range == "0 - 17" )?"#DC3545":"#aaa"}}></div>
                                        </div>
                                        <div style={{float:"left",width:"10%"}} className="ion-text-right ion-bold-text">({x.count})</div>
                                    </div>
                                ))}
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
                }
            </IonCol>
        </IonRow>
        
    </div>
    )
}
export default DriverDashboard