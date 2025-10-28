import { IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { addCircleOutline, arrowBack, attachOutline, camera, cameraOutline } from "ionicons/icons";
import React, { useEffect, useReducer, useRef, useState } from "react";
import ImageUpload from "../../ImageUpload/ImageUpload";
import { formatDate } from "../../GlobalFunctions/Functions";

const MilkRUnDiscrepancies = (props:any) =>{
    const [optionsData, setOptionsData]             = useState<any>([])
    const [listData, setListData]                   = useState<any>([])
    const [uploadImage, showUploadImage]            = useState<any>() 
    const [documentTypeId, setDocumentTypeId]       = useState<any>()
    const [referenceId, setReferenceId]             = useState<any>()
    const [hubKey, setHubKey]                       = useState<any>()
    const [departmentId,setDepartmentId]            = useState<any>(13)
    const [description, setDescription]             = useState<any>()
    const [AWB, setAWB]                             = useState<any>()

    const txtIssueTxt                               = useRef<any>()
    const txtAWB                                    = useRef<any>()

    const [addDiscrepancyView, showDiscrepancyView] = useState<any>()
    const callDocument = async(id:any) =>{
         try {
            const response = await fetch(
            `${props.state.secondary_host}getDocument?dbo=select_document&id=${id}`,
            
            );

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Get the file as a blob
            const blob = await response.blob();

            // Create an object URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a temporary <a> element
            const a = document.createElement('a');
            a.href = url;

        // Optional: get filename from response headers, fallback to default
        const contentDisposition = response.headers.get('content-disposition');
        console.log(response.headers)
        let filename = `file_${id}`;
        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?(.+)"?/);
            if (match?.[1]) {
                filename = match[1];
            }
        }
        filename = filename.replaceAll('"','')
        console.log(filename)
            //
            //// Add file extension if needed (PDF as an example)
            //if (!filename.includes('.')) {
            //    filename += '.pdf'; 
            //}
            //
                a.download = filename;

                // Append, trigger click, and clean up
                document.body.appendChild(a);
                a.click();
                a.remove();

                // Revoke the object URL
                window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Download failed:', error);
        }
    }
    const callMilkRunDiscrepancyDetail = () =>{
         fetch(props.state.secondary_host+'getAdminData?dbo=select_milk_run_descrepancies'+
            '&reference_id				    ='+props.reference_id         
        )
        .then((response) => response.json())
        .then(data =>{
            setListData(data)
        })
    }
    const callMilkRunDiscrepancyTypes = () =>{
         fetch(props.state.secondary_host+'getAdminData?dbo=select_list'+
            '&parent_id				    ='+72           
        )
        .then((response) => response.json())
        .then(data =>{
            setOptionsData(data)
            callMilkRunDiscrepancyDetail()
        })
    }
    useEffect(()=>{
        callMilkRunDiscrepancyTypes()
        
        setReferenceId(props.reference_id)
        setHubKey(props.hub_key)
    },[props])
    return(
        <div style={{borderBottom:"0px solid #ccc", fontSize:"20px"}}>
            <IonRow style={{borderBottom:"1px solid"}} className="ion-padding">
                <IonCol size="3">
                    <div 
                        className="ion-padding size-20"
                        style={{height:"60px", borderRadius:"20px", border:"1px solid #0070C0", color:"#0070C0"}}
                    >
                        MILKRUN DISCREPANCIES
                    </div>
                </IonCol>
                <IonCol></IonCol>
                <IonCol size="2" style={{ color:"#0070C0",borderRight:"1px solid"}} className="size-24 ion-padding ion-text-hover">
                    <IonIcon 
                        icon={addCircleOutline} 
                        className="size-36 ion-text-hover" 
                        style={{color:"#0070C0",}}
                        onClick={()=>{showDiscrepancyView(!addDiscrepancyView)}}
                    ></IonIcon>
                    &nbsp;
                    ADD
                </IonCol>
                <IonCol size="2" onClick={()=>{props.result(1)}} style={{color:"#0070C0"}} className="size-24 ion-padding ion-text-hover">
                    <IonIcon 
                        icon={arrowBack} 
                        className="size-36 ion-text-hover" 
                        style={{color:"#0070C0"}}
                        
                    ></IonIcon>
                    &nbsp;
                    BACK
                </IonCol>
            </IonRow>
            {addDiscrepancyView &&
            <div>
            {optionsData &&
            <IonRow>
                <IonCol size="2" className="ion-padding size-20">
                    <IonItem>
                        <IonLabel position="fixed"className="size-20">Issue Identified</IonLabel>
                        <IonSelect className="size-20" onIonChange={(e)=>{setDocumentTypeId(e.target.value); setDescription(e.target.innerText) }}>
                            {optionsData.map((x:any,i:number)=>(
                                <IonSelectOption ref={txtIssueTxt} key={i} value={x.id}>{x.name}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                </IonCol>
                <IonCol size="2" className="ion-padding size-20">
                    <IonItem>
                        <IonLabel position="floating"className="size-20">AWB/Reference Number</IonLabel>
                        <IonInput ref={txtAWB} onKeyUp={(e)=>{setAWB(e.currentTarget.value)}} className="size-20"></IonInput>
                    </IonItem>
                </IonCol>
                <IonCol>
                    &nbsp;
                </IonCol>
                <IonCol size="2">
                    <div 
                        style={{height:"60px", borderRadius:"20px", border:"0.5px solid #ccc"}} 
                        className="ion-text-center ion-padding "
                        onClick={()=>{showUploadImage(!uploadImage)}}
                    >
                        <IonRow>
                            <IonCol size="2">
                                <IonIcon icon={cameraOutline} className="size-32"></IonIcon>
                            </IonCol>
                            <IonCol>
                                Image
                            </IonCol>
                        </IonRow>
                    </div>
                </IonCol>
            </IonRow>
            }
            {uploadImage &&
            <IonRow>
                <IonCol></IonCol>
                <IonCol size="2">
                    <ImageUpload
                        state={props.state}
                        hub_key={hubKey}
                        department_id={departmentId}
                        document_type_id={documentTypeId}
                        reference_id={referenceId}
                        value={AWB}
                        description={AWB}
                        week_no={0}
                        year={0}
                        result={(e:any)=>{callMilkRunDiscrepancyDetail(); showDiscrepancyView(false)}}
                    />
                </IonCol>
            </IonRow>
            }
            </div>
            }
            {!addDiscrepancyView &&
            <IonRow>
                
                <IonCol>
                    <IonRow style={{backgroundColor:"#0070C0", color:"#fff"}}>
                        <IonCol>DATE</IonCol>
                        <IonCol>AREA</IonCol>
                        <IonCol>WAYBILL</IonCol>
                        <IonCol>ISSUE</IonCol>
                    </IonRow>
                    {listData.map((x:any, i:number)=>(
                        <IonRow>
                            <IonCol>{formatDate(x.created_date)}</IonCol>
                            <IonCol>{x.department}</IonCol>
                            <IonCol>{x.value}</IonCol>
                            <IonCol 
                                onClick={()=>{callDocument(x.file_id)}}
                                style={{color:"#0070C0",}}
                                className="ion-text-hover"
                            >
                                <IonIcon icon={attachOutline} className="size-32"></IonIcon> &nbsp;
                                {x.document_type}
                            </IonCol>
                        </IonRow>
                    ))}
                </IonCol>
            </IonRow>    
            }
        </div>
    )
}
export default MilkRUnDiscrepancies