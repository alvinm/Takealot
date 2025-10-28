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
import Login from '../components/Logins/Standard';
import FlexibleCord from '../components/Test/FlexibleCord';
import ClickableCord from '../components/Test/ClickableCord';
import MatchingBoxes from '../components/Test/MatchingRowsCords';
import FlexibleMatchingBoxes from '../components/Test/MatchingRowsCords';
import MatchingContainers from '../components/Test/MatchingRowsCords';
import TableMatchingCords from '../components/Test/MatchingRowsCords';
import Applications from '../components/Applications/Index';
import LateHome from '../components/Main/LateDeliveries/Index';
import Deliveries from '../components/Main/Index';
import DashbordSummary from '../components/Dashbord/Summary/Index';

const Home: React.FC = () => {
  const [getUserId, setUserId]                    = useState<any>(1)
  const [getAdminView, setAdminView]              = useState<any>()
  const [getDriverManagementView, setDriverManagementView] = useState<any>()
  const [getDriverAuditView, setDriverAuditView]  = useState<any>()
  const [getApplicationsView, setApplicationsView]  = useState<any>()
  const [hubKey, setHubKey]                   = useState<any>([])
  const [departments, setDepartments]             = useState<any>([])
  const [test, setTest]                           = useState<any>()

  const [getLongitude, setLongitude]              = useState<any>()
  const [getLatitude, setLatitude]                = useState<any>()
  const [getLogin, setLogin]                      = useState<any>()
  const [loginData, setLoginData]                 = useState<any>()
  const [getHome, setHome]                        = useState<any>()
  const [recruitmentView, setRecruitmentView]     = useState<any>()
  const [milkRunView, setMilkRunView]             = useState<any>()
  const [driverFailuresView, setDriverFailuresView] = useState<any>()
  const [dashbordSummaryView, setDashboardSummaryView ] = useState<any>()
  
  const [minDate, setMinDate]                     = useState<any>('2025-07-28')
  const [maxDate, setDate]                        = useState<any>('2025-03-02')

  const getHubs = (data:any) =>{
    const distinctHubs = Array.from(
      new Map(data.map((item:any) => [item.hub_key, { hub_key: item.hub_key, hub: item.hub }])).values()
    );
    console.log(distinctHubs);
    return distinctHubs

  }
  const state:any ={
    primary_host            : 'https://www.takealot.com?',
    //secondary_host          : 'http://localhost:3000/',
    secondary_host          : 'http://localhost/',
    //secondary_host          : 'https://specifies-broken-cage-permanent.trycloudflare.com/',
    user_id                 : getUserId,
    login_data              : loginData,
    hub_key                 : hubKey,
    department              : departments
  }
  const callLocation = async () =>{
    var location = await getLocation()
    console.log(location)
    setLongitude(location.longitude)
    setLatitude(location.latitude)
  }
  
  const homeView = (v:any) =>{
    console.log(v)
    resetView()
    switch(v){
      case -1:setTest(true);break;
      case 0:setLogin(true); break;
      case 1:setAdminView(true);break;
      case 2:setHome(true);break;
      case 3:setRecruitmentView(true);break;
      case 4:setDriverManagementView(true);break;
      case 5:setDriverAuditView(true);break;
      case 6:setMilkRunView(true);break;
      case 7:setDriverFailuresView(true);break;
      case 8:setApplicationsView(true);break;
      case 9:setDashboardSummaryView(true);break;
    }
  }

  const resetView = ()=>{
    setTest(false);
    setAdminView(false);
    setLogin(false);
    setHome(false);
    setRecruitmentView(false);
    setDriverManagementView(false);
    setDriverAuditView(false);
    setMilkRunView(false);
    setDriverFailuresView(false);
    setApplicationsView(false);
    setDashboardSummaryView(false)
  }

  const setView = (v:any) =>{
    /** */
  }
  useEffect(() => {
  if (loginData && loginData.length > 0) {
    const hubs:any = getHubs(loginData);
    if (hubs.length > 0) {
      setHubKey(hubs[0].hub_key);
    }
  }
}, [loginData]);
  useEffect(()=>{
    //callLocation()
    homeView(0)
  },[])

  return (
    <div> 
      <IonRow><IonCol>&nbsp;</IonCol></IonRow>
      <IonRow>
        {!getLogin &&
          <IonCol size="1" style={{}}>
            <IonRow>
              <IonCol>
                <div 
                  style={{
                    position:"absolute",
                    top:"11vh",
                    width:"150%", 
                    left:"10%"
                  }}>
                  <IonRow>
                    <div 
                      style={{
                        width:"150%", 
                        height:"auto", 
                        overflowY:"auto",
                        border:"1px solid #ddd", 
                        borderRadius:"20px",
                      }}
                    >
                      <Applications
                        state={state}
                        result={(e:any)=>{console.log(e);homeView(e)}}
                      />
                    </div>
                  </IonRow>
                  <IonRow><IonCol>&nbsp;</IonCol></IonRow>
                  <IonRow>
                      <IonCol 
                        style={{color:"#0070C0",fontWeight:"bold"}} 
                        className="size-24"
                      >
                         <div 
                            className='ion-padding'
                            style={{
                              width:"100%", 
                              height:"auto", 
                              overflowY:"auto",
                              border:"1px solid #ddd", 
                              borderRadius:"20px",
                            }}
                          >
                          <b>HUBS</b>
                          {loginData &&
                            <div>
                              {getHubs(state.login_data).map((x:any, i:number)=>{
                                return(
                                  <IonRow className="size-16">
                                    <IonCol size="2">
                                      <div 
                                        className="ion-text-hover"
                                        onClick={()=>{setHubKey(x.hub_key)}}
                                        style={{
                                                border:"0.5px solid #ddd",
                                                height:"20px",
                                                width:"20px",
                                                backgroundColor:x.hub_key == hubKey? "#0070C0": ""
                                              }}
                                      ></div>
                                    </IonCol>
                                    <IonCol style={{color:"#999"}}>{x.hub.toUpperCase()}</IonCol>
                                  </IonRow>
                                )
                              })}
                            </div>
                            }
                          </div>
                      </IonCol>
                  </IonRow>
                </div>
              </IonCol>
            </IonRow>
          </IonCol>
        }
        <IonCol className="ion-padding">
      {test &&
      <div>
        {/**<FlexibleCord

        />
        <ClickableCord

        />
        <MatchingBoxes />
        
        <TableMatchingCords />*/ }
        <div style={{position:"absolute",top:"0vh",width:"95%", height:"auto", overflowY:"auto",left:"5%"}}>
          <Deliveries
            state={state}
            hub_key={hubKey}
          />
        </div>
      </div>
      }
      {getLogin &&
      <div >
        <IonRow><IonCol>&nbsp;</IonCol></IonRow>
        <IonRow><IonCol>&nbsp;</IonCol></IonRow>
        <IonRow><IonCol>&nbsp;</IonCol></IonRow>
        <IonRow><IonCol>&nbsp;</IonCol></IonRow>
        <IonRow><IonCol>&nbsp;</IonCol></IonRow>
        <IonRow><IonCol>&nbsp;</IonCol></IonRow>
        <IonRow>
          <IonCol size="4"></IonCol>
          <IonCol size="3" style={{border:"0.5px solid #ddd", borderRadius:"20px"}} className='ion-padding'>
            <Login 
              state={state}
              result={(e:any)=>{
                setUserId(e[0].contact_id)
                console.log(e[0].contact_id)
                setLoginData(e)
                console.log(e)
                homeView(2)
              }}
            />
          </IonCol>
          <IonCol size=""></IonCol>
        </IonRow>
      </div>
      }
      {getHome &&
          <div style={{position:"absolute",top:"0vh",width:"95%", height:"auto", overflowY:"auto",left:"5%"}}>
             {/*<Main 
              state={state}
              home={getHome}
              view={(e:any)=>{setAdminView(e)}}
            />
          </div>
         <div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>*/}
          <Deliveries
            state={state}
            hub_key={hubKey}
          />
        </div>
      
      }
      {recruitmentView &&
      <div>
        <div style={{position:"absolute",top:"10vh",width:"95%", height:"78vh", overflowY:"auto",left:"5%"}}>
          <Recruitment
            state={state}
            hub_key={hubKey}
          />
        </div>
        {/*<div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>*/}
      </div>
      }
      {dashbordSummaryView &&
      <div>
        <div style={{position:"absolute",top:"10vh",width:"95%", height:"78vh", overflowY:"auto",left:"5%"}}>
          <DashbordSummary
            state={state}
            hub_key={hubKey}
          />
        </div>
        {/*<div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>*/}
      </div>
      }
      {getAdminView &&
      <div>
        <div style={{position:"absolute",top:"-1vh",width:"95%", height:"auto", overflowY:"auto",left:"5%"}}>
          <AdminHome
            state={state}
            hub_key={hubKey}
          />
        </div>
        {/*<div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>*/}
      </div>
      }
      {getDriverManagementView &&
      <div>
        <div style={{position:"absolute",top:"0vh",width:"95%", height:"83vh", overflowY:"auto",left:"5%"}}>
          <DriverManagement
            state = {state}
            hub_key={hubKey}
          />
        </div>
        {/*<div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>*/}
      </div>
      }
      {getDriverAuditView &&
      <div>
        <div style={{position:"absolute",top:"10vh",width:"95%", height:"78vh", overflowY:"auto",left:"5%"}}>
        <DriverAudit
          state = {state}
          hub_key={hubKey}
        />
        </div>
        {/*<div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>*/}
      </div>
      }
      {milkRunView &&
      <div>
        <div style={{position:"absolute",top:"10vh",width:"95%", height:"78vh", overflowY:"auto",left:"7%"}}>
        <MilkRunAudit
          state = {state}
          hub_key={hubKey}
        />
        </div>
        {/*<div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>*/}
      </div>
      }
      {driverFailuresView &&
      <div>
        <div style={{position:"absolute",top:"10vh",width:"95%", height:"78vh", overflowY:"auto",left:"5%" }}>
          <DriverFailures
            state={state}
            home={getHome}
            hub_key={hubKey}
          />
        </div>
        {/*<div style={{position:"absolute",top:"87vh",width:"100%", height:"10vh"}}>
            <Footer 
              result={(e:any)=>{homeView(e)}}
            />
          </div>*/}
        </div>
      }
      </IonCol>
    </IonRow>
    </div>  
  )
};

export default Home;
