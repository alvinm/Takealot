import React, { useEffect, useState } from "react";


const LastDriverAuditStatus = (props:any) =>{
    const [auditHistoryData, setAuditHistoryData]             = useState<any>();
    const callAuditHistory = () =>{
        var z:any = []
        setAuditHistoryData(z)
        
        fetch(props.state.secondary_host+"getAdminData?dbo=select_driver_audit_summary"+
            '&contact_id='+props.contact_id
        )
        .then((res) => res.json())
        .then((data) => {
            var list = data.map((x:any, i:number)=>{
                            if(i == 0)
                            return(
                                
                                ((x.score == null || x.score == "undefined" || x.score == undefined))?
                                <div key={i} style={{height:"20px",width:"20px",borderRadius:"10px",backgroundColor:"grey"}}></div>
                                :
                                (x.score/1)/22 < 0.90?
                                <div key={i} style={{height:"20px",width:"20px",borderRadius:"10px",backgroundColor:"red"}}></div>
                                :
                                <div key={i} style={{height:"20px",width:"20px",borderRadius:"10px",backgroundColor:"green"}}></div>
                                
                            )
                        })
            setAuditHistoryData(list)
        })          
        .catch((e:any) =>{
            var list = <div style={{height:"20px",width:"20px",borderRadius:"10px",backgroundColor:"grey"}}></div>
            setAuditHistoryData(list)
        })
            
        
    }
    useEffect(()=>{
        callAuditHistory()
    },[props])
    return(
        <div>
            <div>
                {auditHistoryData}
            </div>
        </div>
    )
}
export default LastDriverAuditStatus