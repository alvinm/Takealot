import { IonCol, IonImg, IonInput, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";

const Login = (props:any) =>{
    const [newUser, setNewUser]         = useState<any>(0)
    const [email, setEmail]             = useState<any>()
    const [password, setPassword]       = useState<any>()
    const [confirmPassword, setConfirmPassword]       = useState<any>()
    const [newPassword, setNewPassword] = useState<any>()
    const [userExists, setUserExists]   = useState<any>()
    const [loginData, setLoginData]     = useState<any>()

    const callUserExists = (email:any) =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_user_exists'+
            '&email='+email
        )
        .then((response) => response.json())
        .then(data =>{

            if(data[0].user_exists == 1){
                setUserExists(true)

                console.log("has password:"+data[0].has_password)
                console.log(data)
                console.log(data[0])

                if(data[0].has_password == 0){
                    setNewPassword(true)
                }else{
                    setNewPassword(false)
                }
            }else{
                setUserExists(false)
                setNewPassword(false)
            }
            
        })
    }
    const callLogin = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=select_login'+
            '&email='+email+
            '&password='+password
        )
        .then((response) => response.json())
        .then(data =>{
            console.log(data[0].contact_id)
            if (data[0].contact_id/1 != 0){
                props.result(data)
            }
        })
    }
    useEffect(()=>{
        if((password == confirmPassword) || !newPassword){
            setNewPassword(false)
        }else{
            setNewPassword(true)
        }
    },[password,confirmPassword])
    return(
        <div className="ion-text-center size-18">
            <IonRow>
                <IonCol></IonCol>
                <IonCol className="ion-text-center">
                    <IonImg src="/images/IntelRock.JPG" style={{width:"200px"}}></IonImg>
                </IonCol>
                <IonCol></IonCol>
            </IonRow>
            <IonRow><IonCol>&nbsp;</IonCol></IonRow>
            <IonRow><IonCol>&nbsp;</IonCol></IonRow>
            <IonRow>
                <IonCol>
                    <IonRow>
                        <IonCol>EMAIL</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <div 
                                className="ion-padding"
                                style={{border:"0.5px solid #eee", borderRadius:"20px"}}
                            >
                                <IonInput className="size-20" type="text" onKeyUp={(e)=>{callUserExists(e.currentTarget.value); setEmail(e.currentTarget.value)}}></IonInput>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                    <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                    {userExists &&
                    <div>
                        <IonRow>
                            <IonCol size="12">PASSWORD</IonCol>
                            <IonCol size="12">
                                <div 
                                    className="ion-padding"
                                    style={{border:"0.5px solid #eee", borderRadius:"20px"}}
                                >
                                    <IonInput 
                                        className="size-20" 
                                        type="password" 
                                        autocomplete="new-password"
                                        autocorrect="off"
                                        onKeyUp={(e)=>{setPassword(e.currentTarget.value)}}
                                        onIonChange={(e)=>{setPassword(e.target.value)}}
                                    ></IonInput>
                                </div>
                            </IonCol>
                        </IonRow>
                        {newPassword &&
                        <IonRow>
                            <IonCol size="12">RE-TYPE PASSWORD</IonCol>
                            <IonCol size="12">
                                <div 
                                    className="ion-padding"
                                    style={{border:"0.5px solid #eee", borderRadius:"20px"}}
                                >
                                    <IonInput className="size-20" type="password" onKeyUp={(e)=>{setConfirmPassword(e.currentTarget.value)}}></IonInput>
                                </div>
                            </IonCol>
                        </IonRow>
                        }
                        <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                        <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                        {!newPassword && 
                        <IonRow>
                            <IonCol>
                                <div 
                                    className="ion-padding ion-text-hover"
                                    style={{color:"#fff",backgroundColor:"#0070C0", borderRadius:"20px"}}
                                    onClick={()=>{callLogin()}}
                                >
                                    LOGIN
                                </div>
                            </IonCol>
                        </IonRow>
                        }
                    </div>
                    }
                </IonCol>
            </IonRow>
        </div>
    )
}
export default Login