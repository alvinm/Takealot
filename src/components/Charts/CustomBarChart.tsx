import { IonCol, IonRow } from "@ionic/react"
import React from "react"

interface DataItem {
  name: string;
  value: number;
}

interface Params {
    header:string,
    chart_column_1:string,
    chart_column_2:string,
    chart_column_3:string,
    data:DataItem[],
    branch:number,
    result:(e:any) => any;
}

var stripe = 0;
const CustomSimpleBarChart:React.FC<Params> = (props:any) =>{

    return(
        <div className="ion-padding" style={{border:"0.5px solid #eee", borderRadius:"10px", height:"100%"}}>
            <IonRow>
                <IonCol className="size-20 ion-text-bold ion-text-left" style={{color:"#0070C0"}}>{props.header}</IonCol>
            </IonRow>
            <div className="ion-padding" style={{marginBottom:"2px",borderBottom:"3px solid #0070C0",borderTop:"0px solid #0070C0",height:"60px"}}>
                <div style={{float:"left",width:"40%",color:"#0070C0"}} className="size-16 ellipsis-text ion-text-bold"><b>{props.chart_column_1}</b></div>
                <div style={{float:"left",width:"60%",color:"#0070C0"}} className="size-16 ion-text-right ion-text-bold"><b>{props.chart_column_3}</b></div>
            </div>
            {   
                
                props.data
                .sort((a: any, b: any) => b.value/1 - a.value/1)
                .map((x:any,i:number)=>{
                    
                    if (stripe == 1){stripe = 0}else{stripe = 1}
                    return(
                    <IonRow 
                        key={i} 
                        style={{
                            marginBottom:"0px",
                            borderBottom:"0px solid #fff", 
                            marginTop:i == 0 ? "5px":"0px",
                            backgroundColor:stripe == 1?"#eef":""
                        }}
                        className="ion-text-hover "
                        onClick={()=>{
                            var option:any = []
                            option.push({
                                hub_key:props.branch, 
                                id:x.id
                            })
                            props.result(option[0])
                        }}
                    > 
                        <div style={{float:"left",width:"27%",color:"#999", height:"30px", borderRight:"3px solid #0070C0", marginRight:"1%"}} className="ellipsis-text">
                            {x.name.toUpperCase()}
                        </div>
                        <div style={{float:"left",width:"60%", height:"30px"}} className="">
                            <div style={{height:"21px",width:(x.value/(Math.max(...props.data.map((hub:any) => Math.max(hub.value/1)))))*100+"%",backgroundColor:"#0070C0"}}></div>
                        </div>
                        <div style={{float:"left",width:"10%"}} className="ion-text-right ion-bold-text">({x.value})</div>
                    </IonRow>
            )})}
        </div>
    )
}
export default CustomSimpleBarChart