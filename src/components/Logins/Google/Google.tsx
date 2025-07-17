import React, { useEffect } from "react";
//import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from 'react-google-login';
import { IonCol, IonIcon, IonImg, IonRow } from "@ionic/react";

const GoogleLoginComponent = (props:any) => {
  const clientId = "779619641732-bpho9hqmui661fqmubp4fgigfnvav8ah.apps.googleusercontent.com"; // Replace with your actual client ID
  const  responseGoogle = (response:any) => {
//
  //    console.log(response.profileObj);
  //    for(var prop in response.profileObj){
  //      console.log(prop)
  //    }
  //    var email:any = response.profileObj.email;
  //    var forename:any = response.profileObj.givenName;
  //    var surname:any = response.profileObj.familyName;
  //    var googleId:any = response.profileObj.googleId;
  //    var imageUrl:any = response.profileObj.imageUrl;
//
  //    fetch(props.state.secondary_host+"getData?dbo=select_authenticated_contact"+
  //      "&email="+email+
  //      "&forename="+forename+
  //      "&surname="+surname+
  //      "&image_url="+imageUrl+
  //      "&app_auth_id="+googleId,
  //      {
  //        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"}
  //      }
  //    )
  //    .then(response => response.json())
  //    .then(data =>{
  //      console.log(data[0])
  //      if(data[0].user_id > 0)
  //        props.result(data[0])
  //    })
  }
  useEffect(()=>{
    fetch(props.state.secondary_host+"getData?dbo=select_user"+
      "&app_auth_id=111803759664204166873",
      {
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"}
      }
    )
    .then(response => response.json())
    .then(data =>{
      console.log(data[0])
      if(data[0].user_id > 0)
        props.result(data[0])
    })
  })
  return (
  <IonRow>
      <IonCol>
        <IonRow>
          <IonCol className="ion-padding ion-text-center">
            &nbsp;
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-padding ion-text-center">
            &nbsp;
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-padding ion-text-center">
            <IonImg src="../../images/IntelRock.JPG" />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="2"></IonCol>
          <IonCol className="ion-padding ion-text-center">
            
              <div className="flex justify-center items-center min-h-screen">
                <GoogleLogin
                  clientId={'779619641732-bpho9hqmui661fqmubp4fgigfnvav8ah.apps.googleusercontent.com'}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                ></GoogleLogin>
              </div>
          </IonCol>
          <IonCol size="3"></IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
  );
};

export default GoogleLoginComponent;
