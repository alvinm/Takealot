import { IonCol, IonIcon, IonImg, IonInput, IonRow } from '@ionic/react'
import { analyticsOutline, cloudUploadOutline, refreshCircleOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { formatDate } from '../../GlobalFunctions/Functions'
import ImageUpload from '../../ImageUpload/ImageUpload'
import CaptureResponses from '../Capture/Index'

const RecruitmentAdmin  = (props:any) =>{
    const [listId, setListId]                   = useState<any>()
    const [mediaName, setMediaName]             = useState<any>()

    const [statusList, setStatusList]           = useState<any>()
    const [responseList, setResponseList]       = useState<any>()
    const [weeksList, setWeeksList]             = useState<any>()
    const [dailySpinner, showDailySpinner]      = useState<any>()
    const [selected, setSelected]               = useState<any>(6)
    const [forecast, setForecast]               = useState<any>(0)
    const [shortfall, setShortfall]             = useState<any>(0)  
    const [verification, setVerification]       = useState<any>(0)
    const [approved, setApproved]               = useState<any>(0)
    const [forecastRequirment, setForecastRequirement] = useState<any>()

    const [startDate, setStartDate]             = useState<any>('2025-06-01')
    const [endDate, setEndDate]                 = useState<any>('2025-06-30')
    const [targetDate, setTargetDate]           = useState<any>('')
    const [year,setYear]                        = useState<any>('2025')
    const [month, setMonth]                     = useState<any>(6)
    const [week, setWeek]                       = useState<any>(0)

    const [hubKey, setHubKey]                   = useState<any>(119)
    const [stage, setStage]                     = useState<any>(0)

    const [advertList, setAdvertList]           = useState<any>()
    
    let Controller = new AbortController();
    const callStatusList = () =>{
        // Abort any ongoing request
        Controller.abort();
        showDailySpinner(true)
        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getAdminData?dbo=select_list'+
            '&parent_id				='+1
        )
        .then((response) => response.json())
        .then(data=>{
            const sortedData = [...data].sort((a, b) => a.id - b.id);
            const lists = sortedData.map((x:any, i:number)=>{
                return(
                    <IonRow key={i}>
                        <IonCol >
                            <div className={listId==x.id?"selected-container ion-padding ion-text-center":"text-container ion-padding ion-text-center"} onClick={()=>{setStage(x.id)}}>
                                <IonRow>
                                    <IonCol size="1">{x.id}</IonCol>
                                    <IonCol className='ion-text-left'>{x.name}</IonCol>
                                    <IonCol size="2" className='ion-text-right'></IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                    </IonRow>
                )
            })
            setStatusList(lists)
        })
    }

    const callWeeks = async (m: number) => {
        try {
        //setLoading(true);
        Controller.abort();
        Controller = new AbortController();

        const response = await fetch(
            props.state.secondary_host +
            "getData?dbo=select_weeks_for_month_selected" +
            "&year=" +year +
            "&month=" +m,
            { signal: Controller.signal }
        );

        const data = await response.json();

        // For each week, also fetch its forecast
        const lists = await Promise.all(
            data.map(async (x: any, i: number) => {
            return (
                <IonCol key={i} size="2">
                <div
                    className={
                    week === x.week_of_year
                        ? "selected-container ion-text-center"
                        : "text-container ion-text-center"
                    }
                    onClick={() => {
                    setWeek(x.week_of_year);
                    setStartDate(x.start_date);
                    setEndDate(x.end_date);
                    }}
                >
                    <IonRow>
                        <IonCol>
                            Forecast
                            <div className="size-32 ion-text-bold">
                                {x.forecast}
                            </div>
                        </IonCol>
                        <IonCol>
                            Week
                            <div className="size-32 ion-text-bold">
                                {x.week_of_year}
                            </div>
                        </IonCol>
                        <IonCol className="size-12">
                            <div>
                                Start Date
                                <br />
                                <span className="ion-text-bold">
                                    {formatDate(x.start_date)}
                                </span>
                            </div>
                            <div>
                                End Date
                                <br />
                                <span className="ion-text-bold">
                                    {formatDate(x.end_date)}
                                </span>
                            </div>
                        </IonCol>
                    </IonRow>
                </div>
                </IonCol>
            );
            })
        );

        setWeeksList(lists);
        } catch (err: any) {
            if (err.name === "AbortError") {
                console.log("Weeks request aborted");
            }
        } finally {
            //setLoading(false);
        }
    }
    const setStatus = (id:any) =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=archive_recruitment_contact_status'+
            '&contact_id		     ='+id+
            "&archived_by            ="+props.state.user_id
        )
        .then((response) => response.json())
        .then(data =>{
            callRecruitmentContactStatus()
        })
    }
    const getNextStatus = (status_id:any)=>{
        switch(status_id){
            case 3: return 4; break;
            case 4: return 5; break;
            case 5: return 6; break;
            case 6: return 17;break;
        }
    }
    const setRecruitmentContactStatus = (status_id:any, contact_id:any) =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=update_recruitment_contact_status'+
            '&contact_id		     ='+contact_id+
            "&status_id              ="+status_id+
            "&updated_by             ="+props.state.user_id
        )
        .then((response) => response.json())
        .then(data =>{
            callRecruitmentContactStatus()
        })
    }
    const callRecruitmentContactStatus = () =>{
        showDailySpinner(true)
        fetch(props.state.secondary_host +"getAdminData?dbo=select_recruitment_contact_status" +
            "&hub_key=" +hubKey+
            "&status_id=" +stage+
            "&year=" +year+
            "&week_no=" +week
            ,
        )
        .then(response=>{ return response.json()})
        .then(data =>{
            var list = data.map((x:any,i:number)=>{
                return(
                    <IonRow key={i} className="size-16">
                        <IonCol>{x.forename}</IonCol>
                        <IonCol>{x.surname}</IonCol>
                        <IonCol size="1">{x.year}</IonCol>
                        <IonCol size="1">{x.week_no}</IonCol>
                        <IonCol>{x.email}</IonCol>
                        <IonCol>{x.mobile}</IonCol>
                        <IonCol
                            size="1"
                            onClick={()=>{setRecruitmentContactStatus(getNextStatus(x.status_id),x.contact_id)}}
                        >
                            <div className="ion-padding ion-text-center text-container" style={{color:"#000",borderRadius:"30px",height:"56px"}}>
                                Proceed
                            </div>
                        </IonCol>
                        <IonCol
                            size="1"
                            onClick={()=>{setStatus(x.contact_id)}}
                        >{x.status == 1?
                            <div className="ion-padding ion-text-center" style={{color:"#fff",backgroundColor:"darkgreen",borderRadius:"30px",height:"56px"}}>
                                Enabled
                            </div>:
                            <div className="ion-padding ion-text-center" style={{color:"#fff",backgroundColor:"darkred",borderRadius:"30px",height:"56px"}}>
                                Archived
                            </div>}
                        </IonCol>
                    </IonRow>
                )
            })
            setResponseList(list)
        })
    }
    const callRecruitmentStatus =  () =>{
        showDailySpinner(true)
        fetch(props.state.secondary_host +"getData?dbo=select_recruitment_status" +
            "&status_id=" +stage+
            "&year=" +year+
            "&week_no=" +week
            ,
        )
        .then(response=>{ return response.json()})
        .then(data =>{
            const list = data.map((x:any, i:number)=>{
                if(stage == 3)
                return(
                    <IonRow key={i}>
                        <IonCol>{x.media_name}</IonCol>
                        <IonCol>{x.year}</IonCol>
                        <IonCol>{x.week_no}</IonCol>
                        <IonCol>{formatDate(x.start_date)}</IonCol>
                        <IonCol>{formatDate(x.end_date)}</IonCol>
                        <IonCol>{x.file_name}</IonCol>
                    </IonRow>
                )
            })
            setAdvertList(list)
        })
    }
    
    useEffect(()=>{
        switch(month){
            case 1 : setStartDate(year+'-01-01');setEndDate(year+'-01-31');setSelected(1);callWeeks(1);break;
            case 2 : setStartDate(year+'-02-01');setEndDate(year+'-02-28');setSelected(2);callWeeks(2);break;
            case 3 : setStartDate(year+'-03-01');setEndDate(year+'-03-31');setSelected(3);callWeeks(3);break;
            case 4 : setStartDate(year+'-04-01');setEndDate(year+'-04-30');setSelected(4);callWeeks(4);break;
            case 5 : setStartDate(year+'-05-01');setEndDate(year+'-05-31');setSelected(5);callWeeks(5);break;
            case 6 : setStartDate(year+'-06-01');setEndDate(year+'-06-30');setSelected(6);callWeeks(6);break;
            case 7 : setStartDate(year+'-07-01');setEndDate(year+'-07-31');setSelected(7);callWeeks(7);break;
            case 8 : setStartDate(year+'-08-01');setEndDate(year+'-08-31');setSelected(8);callWeeks(8);break;
            case 9 : setStartDate(year+'-09-01');setEndDate(year+'-09-30');setSelected(9);callWeeks(9);break;
            case 10 : setStartDate(year+'10-01');setEndDate(year+'-10-31');setSelected(10);callWeeks(10);;break;
            case 11 : setStartDate(year+'11-01');setEndDate(year+'-11-30');setSelected(11);callWeeks(11);;break;
            case 12 : setStartDate(year+'12-01');setEndDate(year+'-12-31');setSelected(12);callWeeks(12);;break;
        }
    },[month])
    useEffect(()=>{
        if(stage == 3)
            callRecruitmentStatus()
        if(stage == 4)
            callRecruitmentContactStatus()
        if(stage == 5)
            callRecruitmentContactStatus()
        if(stage == 6)
            callRecruitmentContactStatus()
        if(stage == 17)
            callRecruitmentContactStatus()
    },[week])
    useEffect(()=>{
        if(stage == 4)
            callRecruitmentContactStatus()
        if(stage == 5)
            callRecruitmentContactStatus()
        if(stage == 6)
            callRecruitmentContactStatus()
        if(stage == 17)
            callRecruitmentContactStatus()
    },[stage])
    useEffect(()=>{
        callStatusList()
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
                    <IonCol size="2"
                        className="ion-text-center ion-padding"
                        onClick={()=>{
                            props.result(1)
                        }}
                    >
                        <IonRow className="ion-padding ion-text-center text-hover" style={{color:"#fff",backgroundColor:"#aaa",borderRadius:"30px",height:"56px"}}>
                            <IonCol size="3"className="ion-text-left"><IonIcon icon={analyticsOutline} className="size-24"></IonIcon></IonCol>
                            <IonCol className="ion-text-left"><div>Dashboard</div></IonCol>
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
                    <IonRow className="size-28">
                        <IonCol>Recruitment Status</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            {statusList}
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow>
                        <IonCol className="size-28 ion-text-bold">
                            Load Recruitment Requirements
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Select Month Target Month Advertise</IonCol>
                    </IonRow>
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
                    <IonRow>
                        <IonCol>
                            <IonRow className='ion-text-center'>
                                {weeksList}
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                    <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                   { stage == 3 &&
                    <div className="ion-padding" style={{border:"1px solid #ccc",borderRadius:"10px",margin:"5px",height:"50vh"}}>
                        <IonRow>
                            <IonCol size="4" className="ion-text-bold size-32">Advert</IonCol>
                        </IonRow>
                        <IonRow >
                            <IonCol size="1" className="ion-padding">
                                <IonIcon icon={cloudUploadOutline} className="size-32"></IonIcon>
                            </IonCol>
                            <IonCol size="6" className="size-24 ion-padding">
                                Upload Advert Receipt For Week <span className="ion-text-bold">({week})</span> starting On <span className="ion-text-bold">({formatDate(startDate)})</span>
                            </IonCol>
                            <IonCol size="2" >
                                <IonRow>
                                    <IonCol>
                                        <IonInput onKeyUp={(e)=>{setMediaName(e.currentTarget.value)}} type="text" placeholder="Type Media Outlet Name"></IonInput>
                                    </IonCol>
                                </IonRow>
                                <IonRow >
                                    <IonCol>
                                        <ImageUpload
                                            state = {props.state}
                                            hub_key={hubKey}
                                            status_id={stage}
                                            year={year}
                                            week_no={week}
                                            value="0"
                                            created_by={props.state.user_id}
                                            media_name = {mediaName}
                                            result={(e:any)=>{callRecruitmentStatus()}}
                                    />
                                   </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                        <IonRow style={{borderTop:"1px solid #ccc",}}>
                            <IonCol>
                                <IonRow className='ion-text-bold ' style={{backgroundColor:"#0070C0",color:"#fff"}}>
                                    <IonCol>OUTLET</IonCol>
                                    <IonCol>YEAR</IonCol>
                                    <IonCol>WEEK NO.</IonCol>
                                    <IonCol>WEEK START DATE</IonCol>
                                    <IonCol>WEEK END DATE</IonCol>
                                    <IonCol>FILE</IonCol>
                                </IonRow>
                                {advertList}
                            </IonCol>
                        </IonRow>
                    </div>
                    }
                    { stage == 4 &&
                    <div className="ion-padding" style={{border:"1px solid #ccc",borderRadius:"10px",margin:"5px",height:"50vh"}}>
                        <IonRow>
                            <IonCol size="4" className="ion-text-bold size-30">Responded</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="1" className="ion-padding">
                                <IonIcon icon={refreshCircleOutline} className="size-32"></IonIcon>
                            </IonCol>
                            <IonCol size="6" className="size-24 ion-padding">
                                Response Applications
                            </IonCol>
                        </IonRow>
                        <IonRow>
                             <IonCol>
                                <CaptureResponses
                                    state ={props.state}
                                    hub_key = {hubKey}
                                    year={year}
                                    week_no={week}
                                    status_id={stage}
                                    result={(e:any)=>{callRecruitmentContactStatus()}}
                                />
                             </IonCol>
                        </IonRow>
                        <IonRow className='ion-text-bold ' style={{backgroundColor:"#0070C0",color:"#fff"}}>
                            <IonCol>FORENAME</IonCol>
                            <IonCol>SURNAME</IonCol>
                            <IonCol size="1">YEAR</IonCol>
                            <IonCol size="1">MONTH</IonCol>
                            <IonCol>EMAIL</IonCol>
                            <IonCol>MOBILE</IonCol>
                            <IonCol size="1"></IonCol>
                            <IonCol size="1"></IonCol>
                        </IonRow>
                        {responseList}
                    </div>
                    }
                    { stage == 5 &&
                    <div>
                    <IonRow>
                        <IonCol size="4" className="ion-text-bold size-30">Verification</IonCol>
                    </IonRow>
                    <IonRow style={{borderBottom:"1px solid #ccc",margin:"5px"}}>
                        <IonCol>
                            <IonRow className='ion-text-bold ' style={{backgroundColor:"#0070C0",color:"#fff"}}>
                                <IonCol>FORENAME</IonCol>
                                <IonCol>SURNAME</IonCol>
                                <IonCol size="1">YEAR</IonCol>
                                <IonCol size="1">MONTH</IonCol>
                                <IonCol>EMAIL</IonCol>
                                <IonCol>MOBILE</IonCol>
                                <IonCol size="1"></IonCol>
                                <IonCol size="1"></IonCol>
                            </IonRow>
                            {responseList}
                        </IonCol>
                    </IonRow>
                    </div>
                    }
                    { stage == 6 &&
                    <div>
                    <IonRow>
                        <IonCol size="4" className="ion-text-bold size-30">Approved</IonCol>
                    </IonRow>
                    <IonRow style={{borderBottom:"1px solid #ccc",margin:"5px"}}>
                        <IonCol>
                            <IonRow className='ion-text-bold ' style={{backgroundColor:"#0070C0",color:"#fff"}}>
                                <IonCol>FORENAME</IonCol>
                                <IonCol>SURNAME</IonCol>
                                <IonCol size="1">YEAR</IonCol>
                                <IonCol size="1">MONTH</IonCol>
                                <IonCol>EMAIL</IonCol>
                                <IonCol>MOBILE</IonCol>
                                <IonCol size="1"></IonCol>
                                <IonCol size="1"></IonCol>
                            </IonRow>
                            {responseList}
                        </IonCol>
                    </IonRow>
                    </div>
                    }
                    { stage == 17 &&
                    <div>
                    <IonRow>
                        <IonCol size="4" className="ion-text-bold size-30">Training</IonCol>
                    </IonRow>
                    <IonRow style={{borderBottom:"1px solid #ccc",margin:"5px"}}>
                        <IonCol>
                            <IonRow className='ion-text-bold ' style={{backgroundColor:"#0070C0",color:"#fff"}}>
                                <IonCol>FORENAME</IonCol>
                                <IonCol>SURNAME</IonCol>
                                <IonCol size="1">YEAR</IonCol>
                                <IonCol size="1">MONTH</IonCol>
                                <IonCol>EMAIL</IonCol>
                                <IonCol>MOBILE</IonCol>
                                <IonCol size="1"></IonCol>
                                <IonCol size="1"></IonCol>
                            </IonRow>
                            {responseList}
                        </IonCol>
                    </IonRow>
                    </div>
                    }
                </IonCol>
            </IonRow>
        </div>
    )
}
export default RecruitmentAdmin