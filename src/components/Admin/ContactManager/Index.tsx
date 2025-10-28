import { IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { addCircleOutline, arrowBack } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";

var stripe          = 0;

const ContactManager = (props:any) =>{
    const [contactData, setContactData]         = useState<any>([])
    const [contactId, setContactId]             = useState<any>(0)
    const [forename, setForename]               = useState<any>()
    const [surname, setSurname]                 = useState<any>()
    const [mobile, setMobile]                   = useState<any>()
    const [department, setDepartment]           = useState<any>()
    const [departmentId, setDepartmentId]       = useState<any>(0)
    const [contactTypeId, setContactTypeId]     = useState<any>(1080)
    const [hubKey, setHubKey]                   = useState<any>(0)
    const [email, setEmail]                     = useState<any>()
    const [roleId, setRoleId]                   = useState<any>(0)
    const [contactHubData, setContactHubData]   = useState<any>([])
    const [contactDepartmentData, setContactDepartmentData] = useState<any>([])
    const [roleData, setRoleData]               = useState<any>([])

    const txtForename                           = useRef<any>()
    const txtSurname                            = useRef<any>()
    const txtEmail                              = useRef<any>()
    const txtMobile                             = useRef<any>()

    const createContact = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=insert_contact'+
            "&contact_id="+contactId+
            "&contact_type_id="+contactTypeId+
            "&forename="+forename+
            "&surname="+surname+
            "&email="+email+
            "&mobile="+mobile+
            "&created_by="+props.state.user_id
        )
        .then((response) => response.json())
        .then(data =>{
            resetContactForm()
            callContacts()
        })
    }

    const callContacts = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_contacts&contact_type_id=1080')
        .then((response) => response.json())
        .then(setContactData)
    }

    const callContactDepartment = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_contact_department'+
            '&contact_id='+contactId
        )
        .then((response) => response.json())
        .then(data => {setContactDepartmentData(data)})
    }

    const callContactHub = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_contact_hub'+
            '&contact_id='+contactId
        )
        .then((response) => response.json())
        .then(data =>{setContactHubData(data)})
    }
    
    const callStaffRole = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_list'+
            '&parent_id='+ 1095
        )
        .then((response) => response.json())
        .then(data =>{/** */})
    }
    const setContactStatus = (contact_id:any) =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=archive_contact'+
            '&contact_id='+contactId+
            '&archived_by='+props.state.user_id
        )
        .then((response) => response.json())
        .then(data =>{
           callContacts()
        })
    }
    const setContactDepartment = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=insert_contact_department'+
            '&contact_id='+contactId+
            '&department_id='+departmentId
        )
        .then((response) => response.json())
        .then(data =>{callContactDepartment()})
    }

    const setContactHub = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=insert_contact_hub'+
            '&contact_id='+contactId+
            '&hub_key='+hubKey
        )
        .then((response) => response.json())
        .then(data =>{callContactHub()})
    }
    const resetContactForm = () =>{
        setContactId(0)
        setForename("")
        setSurname("")
        setEmail("")
        setMobile("")
        txtForename.current.value = ''
        txtSurname.current.value = '' 
        txtEmail.current.value = ''   
        txtMobile.current.value = ''  
    }
    useEffect(()=>{
        setContactDepartment()
    },[departmentId])
    useEffect(()=>{
        setContactHub()
    },[hubKey])
    useEffect(()=>{
        callContactDepartment()
        callContactHub()
        callStaffRole()
    },[contactId])

    useEffect(()=>{
        callContacts()
    },[props])
    return(
        <div>
            
            <IonRow>
                <IonCol size="6">
                    {contactData &&
                    <div 
                        className="ion-padding"
                        style={{border:"0.5px solid #ddd", borderRadius:"20px",height:"85vh", overflow:"auto"}}>
                        <IonRow>
                            <IonCol style={{color:"#0070C0",fontWeight:"bold",size:"20px"}} className="size-24">
                                <b>USER LIST</b>
                            </IonCol>
                        </IonRow>
                        <IonRow style={{borderBottom:"3px solid #0070C0"}}>
                            <IonCol className="" style={{color:"#0070C0",fontWeight:"bold",fontSize:"20px"}}>NAME <br/>EMAIL</IonCol>
                            <IonCol className=" ion-text-center" style={{color:"#0070C0",fontWeight:"bold",fontSize:"20px"}} >MOBILE</IonCol>
                            <IonCol className="" size="2" ></IonCol>
                        </IonRow>
                        {contactData.map((x:any, i:number)=>{
                            if(stripe == 0){
                                stripe = 1
                            }else{
                                stripe = 0
                            }
                            return(
                                <IonRow 
                                    key={i}
                                    className="ion-padding" 
                                    style={{backgroundColor:stripe == 1? "#eef" : "", fontSize:"20px"}}
                                    onClick={()=>{
                                        setContactId(x.id)
                                        setForename(x.forename)
                                        setSurname(x.surname)
                                        setEmail(x.email)
                                        setMobile(x.mobile)
                                        setRoleId(x.role_id)
                                    }}
                                >
                                    <IonCol>{x.name.toLowerCase()}<br/>{x.email.toLowerCase()}</IonCol>
                                    <IonCol className="ion-text-center">{x.mobile}</IonCol>
                                    <IonCol 
                                        size="2" 
                                        className="size-18"
                                        onClick={()=>{
                                            setContactStatus(x.id)
                                        }}
                                    >
                                        {x.status == 1?
                                            <div className="ion-text-center ion-padding ion-text-hover" style={{color:"#fff",borderRadius:"20px", backgroundColor:"#0070C0", height:"50px"}}>ENABLED</div>
                                            :
                                            <div className="ion-text-center ion-padding ion-text-hover" style={{color:"#fff",borderRadius:"20px", backgroundColor:"darkred", height:"50px"}}>DISABLED</div>
                                        }
                                    </IonCol>
                                </IonRow>
                            )
                        })}
                    </div>
                    }
                </IonCol>
                <IonCol size="5">
                <div 
                    className="ion-padding"
                    style={{border:"0.5px solid #ddd", borderRadius:"20px"}}
                >
                    <IonRow>
                        <IonCol style={{color:"#0070C0",fontWeight:"bold",size:"20px"}} className="size-24">
                            <b>USER MANAGEMENT</b>
                        </IonCol>
                    </IonRow>
                    <IonRow style={{borderBottom:"3px solid #0070C0"}}>
                        <IonCol style={{color:"#0070C0",fontWeight:"bold",fontSize:"20px"}} className="size-24">
                            <b>CREATE | ALTER SYSTEM USER</b>
                        </IonCol>
                        <IonCol 
                            className="ion-text-right size-20"
                            style={{color:"#0070C0",fontWeight:"bold",fontSize:"20px"}}
                            onClick={()=>{
                                setContactId(0)
                                setForename("")
                                setSurname("")
                                setEmail("")
                                setMobile("")
                                setRoleId(0)
                            }}
                        >   <b>ADD USER</b> &nbsp;
                            <IonIcon icon={addCircleOutline} className="size-32"></IonIcon>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">
                            <IonItem>
                                <IonLabel position="floating" >Forename</IonLabel>
                                <IonInput 
                                    className="ion-padding size-20"
                                    ref={txtForename}
                                    onKeyUp={(e)=>{
                                        setForename(e.currentTarget.value)
                                    }}
                                    placeholder={forename}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating" >Surname</IonLabel>
                                <IonInput 
                                    className="ion-padding size-20"
                                    ref={txtSurname}
                                    onKeyUp={(e)=>{
                                        setSurname(e.currentTarget.value)
                                    }}
                                    placeholder={surname}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6">
                            <IonItem>
                                <IonLabel position="floating" >Email</IonLabel>
                                <IonInput 
                                    className="ion-padding size-20"
                                    ref={txtEmail}
                                    onKeyUp={(e)=>{
                                        setEmail(e.currentTarget.value)
                                    }}
                                    placeholder={email}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating" >Mobile</IonLabel>
                                <IonInput 
                                    className="ion-padding size-20"
                                    ref={txtMobile}
                                    onKeyUp={(e)=>{
                                        setMobile(e.currentTarget.value)
                                    }}
                                    placeholder={mobile}
                                ></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                        {contactId != 0 &&
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol 
                                size="4"
                                onClick={()=>{createContact()}}
                            >
                                <div style={{height:"50px",borderRadius:"20px", border:"0.5px solid #0070C0"}} className="ion-padding">
                                    <IonRow>
                                        <IonCol className="ion-text-center">UPDATE</IonCol>
                                    </IonRow>
                                </div>
                            </IonCol>
                        </IonRow>
                        }
                        {contactId == 0 &&
                        <IonRow>
                            <IonCol></IonCol>
                            <IonCol 
                                size="4"
                                onClick={()=>{createContact()}}
                            >
                                <div style={{height:"50px",borderRadius:"20px", border:"0.5px solid #0070C0"}} className="ion-padding">
                                    <IonRow>
                                        <IonCol className="ion-text-center">CREATE</IonCol>
                                    </IonRow>
                                </div>
                            </IonCol>
                        </IonRow>
                        
                        }
                    </div>
                    <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                    <div 
                        className="ion-padding"
                        style={{border:"0.5px solid #ddd", borderRadius:"20px"}}
                    >
                    <IonRow>
                        <IonCol size="12" style={{color:"#0070C0",fontWeight:"bold",fontSize:"20px",borderBottom:"3px solid #0070C0"}} className="size-20">STAFF ROLE</IonCol>
                        <IonCol>
                            <IonRow>
                                {roleData.map((x:any, i:any)=>{
                                    return(
                                        <IonCol 
                                            key={i} 
                                            size="4"
                                            className="ion-text-hover size-18"
                                            onClick={()=>{/** */}}
                                        >
                                        <div 
                                            style={{float:"left",height:"18px",width:"18px",border:"0.5px solid #0070C0",backgroundColor:x.role_id == roleId? "#0070C0":""}}
                                            ></div> 
                                        &nbsp;&nbsp;{x.name.toUpperCase()}
                                        </IonCol>
                                    )})}
                            </IonRow>
                            
                        </IonCol>
                    </IonRow>
                    </div>
                    <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                    <div 
                        className="ion-padding"
                        style={{border:"0.5px solid #ddd", borderRadius:"20px"}}
                    >
                    <IonRow>
                        <IonCol size="12" style={{color:"#0070C0",fontWeight:"bold",fontSize:"20px",borderBottom:"3px solid #0070C0"}} className="size-20">HUB ACCESS</IonCol>
                        <IonCol>
                            <IonRow>
                                {contactHubData.map((x:any, i:any)=>{
                                    return(
                                        <IonCol 
                                            key={i} 
                                            size="4"
                                            className="ion-text-hover size-18"
                                            onClick={()=>{setHubKey(x.hub_key)}}
                                        >
                                        <div 
                                            style={{float:"left",height:"18px",width:"18px",border:"0.5px solid #0070C0",backgroundColor:x.checked == 1? "#0070C0":""}}
                                            ></div> 
                                        &nbsp;&nbsp;{x.name.toUpperCase()}
                                        </IonCol>
                                    )})}
                            </IonRow>
                            
                        </IonCol>
                    </IonRow>
                    </div>
                    <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                    <div 
                        className="ion-padding"
                        style={{border:"0.5px solid #ddd", borderRadius:"20px"}}
                    >
                    <IonRow>
                        <IonCol size="12"style={{color:"#0070C0",fontWeight:"bold",fontSize:"20px",borderBottom:"3px solid #0070C0"}} className="size-20">DEPARTMENT ACCESS</IonCol>
                        <IonCol>
                            <IonRow>
                                {contactDepartmentData.map((x:any, i:any)=>{
                                    return(
                                        <IonCol 
                                            key={i} 
                                            size="4"
                                            className="ion-text-hover size-18"
                                            onClick={()=>{setDepartmentId(x.id)}}
                                        >
                                        <div style={{float:"left",height:"18px",width:"18px",border:"0.5px solid #0070C0",backgroundColor:x.checked == 1? "#0070C0":""}}></div> 
                                        &nbsp;&nbsp;{x.name.toUpperCase()}
                                        </IonCol>
                                    )})}
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    </div>
                </IonCol>
            </IonRow>
        </div>
    )
}
export default ContactManager