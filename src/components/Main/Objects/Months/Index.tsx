import { IonCol, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";

const MonthSelector = (props:any) =>{
    const [startDate, setStartDate]                          = useState<any>('2025-06-01')
    const [endDate, setEndDate]                              = useState<any>('2025-06-30')
    const [month, setMonth]                                  = useState<any>(0)
    const [year,setYear]                                     = useState<any>('2025')
    const [selected, setSelected]                            = useState<any>(6)
    useEffect(()=>{
        var x = []
        x.push({start_date:startDate, end_date:endDate, year:year, month:month})
        props.result(x[0])
    },[startDate, endDate])
    useEffect(()=>{
        switch(month){
            case 1 : setStartDate(year+'-01-01');setEndDate(year+'-01-31');setSelected(1);break;
            case 2 : setStartDate(year+'-02-01');setEndDate(year+'-02-28');setSelected(2);break;
            case 3 : setStartDate(year+'-03-01');setEndDate(year+'-03-31');setSelected(3);break;
            case 4 : setStartDate(year+'-04-01');setEndDate(year+'-04-30');setSelected(4);break;
            case 5 : setStartDate(year+'-05-01');setEndDate(year+'-05-31');setSelected(5);break;
            case 6 : setStartDate(year+'-06-01');setEndDate(year+'-06-30');setSelected(6);break;
            case 7 : setStartDate(year+'-07-01');setEndDate(year+'-07-31');setSelected(7);break;
            case 8 : setStartDate(year+'-08-01');setEndDate(year+'-08-31');setSelected(8);break;
            case 9 : setStartDate(year+'-09-01');setEndDate(year+'-09-30');setSelected(9);break;
            case 10 : setStartDate(year+'10-01');setEndDate(year+'-10-31');setSelected(10);break;
            case 11 : setStartDate(year+'11-01');setEndDate(year+'-11-30');setSelected(11);break;
            case 12 : setStartDate(year+'12-01');setEndDate(year+'-12-31');setSelected(12);break;
        }
    },[month])
    useEffect(()=>{
        setYear(props.year)
        setMonth(props.month)
    },[props])
    return(
        <div>
            <IonRow>
                <IonCol>
                    <div className={selected==1?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(1)}}>Jan</div>
                </IonCol>
                <IonCol>
                    <div className={selected==2?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(2)}}>Feb</div>
                </IonCol>
                <IonCol>
                    <div className={selected==3?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(3)}}>Mar</div>
                </IonCol>
                <IonCol>
                    <div className={selected==4?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(4)}}>Apr</div>
                </IonCol>
                <IonCol>
                    <div className={selected==5?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(5)}}>May</div>
                </IonCol>
                <IonCol>
                    <div className={selected==6?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(6)}}>Jun</div>
                </IonCol>
                <IonCol>
                    <div className={selected==7?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(7)}}>Jul</div>
                </IonCol>
                <IonCol>
                    <div className={selected==8?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(8)}}>Aug</div>
                </IonCol>
                <IonCol>
                    <div className={selected==9?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(9)}}>Sep</div>
                </IonCol>
                <IonCol>
                    <div className={selected==10?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(10)}}>Oct</div>
                </IonCol>
                <IonCol>
                    <div className={selected==11?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(11)}}>Nov</div>
                </IonCol>
                <IonCol>
                    <div className={selected==12?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setMonth(12)}}>Dec</div>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default MonthSelector 