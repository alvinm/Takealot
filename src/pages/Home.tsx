import { IonCol, IonContent, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import './Home.css';
import Main from '../components/Main/Main';
import { useEffect, useState } from 'react';
import Search from '../components/Search/Search';
import { getLocation } from '../components/GlobalFunctions/Functions'
import { arrowBackCircleOutline, toggleOutline } from 'ionicons/icons';
import GoogleLoginComponent from '../components/Logins/Google/Google';
import DateSlider from '../components/Objects/DateSlider/DateSlider';
import Footer from '../components/Footer';
import Recruitment from '../components/Recruitment/Index';
import Admin from '../components/Admin/ListManager';
import DriverManagement from '../components/DriverManagement/Index';
import DriverAudit from '../components/DriverManagement/DriverAudit/Index';
import AdminHome from '../components/Admin/Index';
import MilkRunAudit from '../components/HubManagement/MilkRun';
import DriverDeliveryStatusListLate from '../components/DriverManagement/DriverStatusList/DriverDeliveryStatusListLate';
import DriverDeliveryStatusListFailed from '../components/DriverManagement/DriverStatusList/DriverDeliveryStatusListFailed';
import DriverFailures from '../components/DriverFailures/Index';

const Home: React.FC = () => {
  const [getUserId, setUserId]                    = useState<any>(1)
  const [getAdminView, setAdminView]              = useState<any>()
  const [getDriverManagementView, setDriverManagementView] = useState<any>()
  const [getDriverAuditView, setDriverAuditView]          = useState<any>()
  const [hub_key, setHub_key]                     = useState<any>(0)

  const [getLongitude, setLongitude]              = useState<any>()
  const [getLatitude, setLatitude]                = useState<any>()
  const [getLogin, setLogin]                      = useState<any>()
  const [getHome, setHome]                        = useState<any>()
  const [recruitmentView, setRecruitmentView]     = useState<any>()
  const [milkRunView, setMilkRunView]             = useState<any>()
  const [driverFailuresView, setDriverFailuresView] = useState<any>()
  
  const [minDate, setMinDate]                     = useState<any>('2025-07-28')
  const [maxDate, setDate]                        = useState<any>('2025-03-02')

  const state:any ={
    primary_host            : 'https://www.takealot.com?',
    secondary_host          : 'http://localhost:3000/',
    //secondary_host          : 'https://specifies-broken-cage-permanent.trycloudflare.com/',
    user_id                 : getUserId,
    hub_key                 : hub_key
  

  }
  const callLocation = async () =>{
    var location = await getLocation()
    console.log(location)
    setLongitude(location.longitude)
    setLatitude(location.latitude)
  }
  
  const homeView = (v:any) =>{
    resetView()
    switch(v){
      case 0:setLogin(true); break;
      case 1:setAdminView(true);break;
      case 2:setHome(true);break;
      case 3:setRecruitmentView(true);break;
      case 4:setDriverManagementView(true);break;
      case 5:setDriverAuditView(true);break;
      case 6:setMilkRunView(true);break;
      case 7:setDriverFailuresView(true);break;
    }
  }

  const resetView = ()=>{
    setAdminView(false);
    setLogin(false);
    setHome(false);
    setRecruitmentView(false)
    setDriverManagementView(false)
    setDriverAuditView(false);
    setMilkRunView(false);
    setDriverFailuresView(false)
  }

  const setView = (v:any) =>{
    /** */
  }

  useEffect(()=>{
    //callLocation()
    homeView(2)
  },[])

  return (
    <div> 
      <IonRow><IonCol>&nbsp;</IonCol></IonRow>
      {getLogin &&
      <div>
        <GoogleLoginComponent 
          state={state}
          result={(e:any)=>{
            setUserId(e.user_id)
        }}
        />
      </div>
      }
      {getHome &&
      <div>
          <div style={{position:"absolute",top:"10vh",width:"100%", height:"78vh", overflowY:"auto"}}>
            <Main 
              state={state}
              home={getHome}
              view={(e:any)=>{setAdminView(e)}}
            />
          </div>
          <div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>
        </div>
      }
      {recruitmentView &&
      <div>
        <div style={{position:"absolute",top:"10vh",width:"100%", height:"78vh", overflowY:"auto"}}>
          <Recruitment
            state={state}
          />
        </div>
        <div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>
      </div>
      }
      {getAdminView &&
      <div>
        <div style={{position:"absolute",top:"10vh",width:"100%", height:"78vh", overflowY:"auto"}}>
          <AdminHome
            state={state}
          />
        </div>
        <div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>
      </div>
      }
      {getDriverManagementView &&
      <div>
        <div style={{position:"absolute",top:"10vh",width:"100%", height:"78vh", overflowY:"auto"}}>
          <DriverManagement
            state = {state}
          />
        </div>
        <div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>
      </div>
      }
      {getDriverAuditView &&
      <div>
        <div style={{position:"absolute",top:"10vh",width:"100%", height:"78vh", overflowY:"auto"}}>
        <DriverAudit
          state = {state}
        />
        </div>
        <div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>
      </div>
      }
      {milkRunView &&
      <div>
        <div style={{position:"absolute",top:"10vh",width:"100%", height:"78vh", overflowY:"auto"}}>
        <MilkRunAudit
          state = {state}
        />
        </div>
        <div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>
      </div>
      }
      {driverFailuresView &&
      <div>
        <div style={{position:"absolute",top:"10vh",width:"100%", height:"78vh", overflowY:"auto"}}>
          <DriverFailures
            state={state}
            home={getHome}
          />
        </div>
        <div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>
        </div>
      }
    </div>  
  )
};

export default Home;
