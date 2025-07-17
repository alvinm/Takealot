import { IonCol, IonContent, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import './Home.css';
import Main from '../components/Main/Main';
import { useEffect, useState } from 'react';
import Search from '../components/Search/Search';
import { getLocation } from '../components/GlobalFunctions/Functions'
import DistanceSlider from '../components/Objects/Range';
import Footer from '../components/Footer';
import { arrowBackCircleOutline, toggleOutline } from 'ionicons/icons';
import ProductProperties from '../components/Admin/ProductProperties/ProductProperties';
import GoogleLoginComponent from '../components/Logins/Google/Google';

const Home: React.FC = () => {
  const [getUserId, setUserId]                    = useState<any>()
  const[getShopId       , setShopId]              = useState<any>(0)
  const[getShopGUID     , setShopGUID]            = useState<any>('')
  const[getShopTypeId   , setShopTypeId]          = useState<any>(0)
  const[getCurrencyId   , setCurrencyId]          = useState<any>(0)
  const[getCurrency, setCurrency]                 = useState<any>('')
  const[getCountryId    , setCountryId]           = useState<any>(0)
  const[getCountry, setCountry]                   = useState<any>('')
  const[getShopName, setShopName]                 = useState<any>('')
  const[getVATNo, setVATNo]                       = useState<any>('')
  const[getTaxNo, setTaxNo]                       = useState<any>('')

  const [getEmail, setEmail]              = useState<any>()
  const [getUserTypeId, setUserTypeId]    = useState<any>()
  const [getUserType, setUserType]        = useState<any>()
  const [getForename, setForename]        = useState<any>()
  const [getSurname, setSurname]           = useState<any>()
  const [getUserImageUrl, setUserImageUrl]    = useState<any>()
  const [getView, setView]                = useState<any>(0)
  const [getAdminView, setAdminView]      = useState<any>()
  const [getLogin, setLogin]              = useState<any>()
  const [getLongitude, setLongitude]      = useState<any>()
  const [getLatitude, setLatitude]        = useState<any>()
  const [getHome, setHome]                = useState<any>()
  const [hideRange, showRange]            = useState<any>(false)
  const [getRange, setRange]              = useState<any>(50)
  const [getCategoryList, setCategoryList]        = useState<any>()
  const [getCategoryId, setCategoryId]    = useState<any>(2)
  const [getCategoryName, setCategoryName]  = useState<any>('')
  const [getParentCategoryId, setParentCategoryId] = useState<any>()
  const [getStoreName, setStoreName]        = useState<any>('Default Store')
  const [getStoreType, setStoreType]        = useState<any>('Spaza/Kibanda/Tuck')
  const [getCurrencyType, setCurrencyType]  = useState<any>('$')
  const [hideApp, showApp]                  = useState<any>(true)

  const state:any ={
    primary_host            : 'https://www.intelrock.com?',
    //secondary_host          : 'http://localhost:3000/',
    secondary_host          : 'https://specifies-broken-cage-permanent.trycloudflare.com/',
    user_id                 : getUserId,
    forename                : getForename,
    surname                 : getSurname,
    email                   : getEmail,
    user_type_id            : getUserTypeId,
    user_type               : getUserType,
    user_image_url          : getUserImageUrl,
    view                    : getView,
    longitude               : getLongitude,
    latitude                : getLatitude,
    range                   : getRange,
    parent_category_id      : getParentCategoryId,
    category_name           : getCategoryName,
    category_id             : getCategoryId,
    user_store_id           : getShopId,
    user_store_guid         : getShopGUID,
    user_store_type_id      : getShopTypeId,
    user_store_type         : getStoreType,
    user_store_name         : getShopName,
    user_store_country_id   : getCountryId,
    user_store_country      : getCountry,
    user_store_currency_id  : getCurrencyId,
    user_store_currency     : getCurrency,
    user_store_vat_no       : getVATNo,
    user_store_tax_no       : getTaxNo

  }
  const callLocation = async () =>{
    var location = await getLocation()
    console.log(location)
    setLongitude(location.longitude)
    setLatitude(location.latitude)
  }
  const callCategory = () =>{
    fetch(state.secondary_host + "getData?dbo=select_list"+
      "&parent_id="+getCategoryId, 
    )
    .then((response) => response.json())
    .then(data=>{
      var category:any = []
      if(data.parent_id/1 >= 2)
        setParentCategoryId(data.parent_id)
      category = data.map((x:any,i:number)=>{
        return(
          <div key={i} 
            style={{
              height:"30px",
              borderRadius:"30px", 
              textAlign:"center",
              backgroundColor:"#eee",
              maxWidth:"400px",
              width:"auto",
              textWrap:"nowrap",
              marginRight:"5px",
              fontSize:"12px",
              paddingLeft:"8px",
              paddingRight:"8px"
            }}
          >
            <IonRow  onClick={()=>{
              setCategoryId(x.id);
              setParentCategoryId(x.parent_id)
              setCategoryName(x.description)
            }}>
              <IonCol className=''>{x.description}</IonCol>
            </IonRow>
          </div>
        )
      })
      setCategoryList(category)
    })
  }
  const homeView = (v:any) =>{
    resetView()
    switch(v){
      case 0:setLogin(true); break;
      case 1:setAdminView(true);break;
      case 2:setHome(true);break;
      case 3:;break;
    }
  }

  const resetView = ()=>{
    setAdminView(false);
    setLogin(false);
    setHome(false);
  }

  useEffect(()=>{
    //callCategory()
  },[getCategoryId])

  useEffect(()=>{
    //alert(getLatitude)
    if(getLatitude != undefined)
      homeView(2)
  },[getLatitude])

  useEffect(()=>{
    callCategory()
    callLocation()
    homeView(0)
  },[])

  return (
    <div> 
      <IonRow><IonCol>&nbsp;</IonCol></IonRow>
      {getLogin &&
      <div>
        <GoogleLoginComponent 
          state={state}
          result={(e:any)=>{
            setShopId(e.shop_id)
            setShopGUID(e.shop_guid)
            setShopTypeId(e.shop_type_id)
            setShopTypeId(e.shop_type)
            setShopName(e.shop_name)
            setVATNo(e.vat_no)
            setTaxNo(e.tax_no)
            setCountryId(e.country_id)
            setCountry(e.country)
            setCurrencyId(e.currency_id)
            setCurrency(e.currency_code)
            setEmail(e.email)
            setUserId(e.user_id)
            setForename(e.forename)
            setSurname(e.surname)
            setUserTypeId(e.user_type_id)
            setUserType(e.user_type)
            setUserImageUrl(e.image_url)
            //callLocation()
            //callCategory()
          }}
        />
      </div>
      }
      {getHome &&
      <div>
        <IonRow className='ion-padding'>
          <IonCol size="2" onClick={()=>{}}>
            <IonImg src="../images/IntelRock.JPG" style={{width:"50px"}} ></IonImg>
          </IonCol>
          <IonCol className="">
            <Search 
              state={state}
              result={(e:any)=>{setView(e)}}
            />
          </IonCol> 
        </IonRow>
        {hideRange && 
          <div style={{position:"fixed",top:"7vh",width:"85%"}}>
            <DistanceSlider
              minDistance={0}
              maxDistance={40}
              onChange={(e)=>{console.log(e);setRange(e)}}
            />
          </div>
        }
        {(!hideRange) &&
          <div style={{position:"fixed",top:"10vh",width:"100%",}}>
            <IonRow className='ion-padding'>
              <IonCol size="9"className="ion-text-left">
                <div style={{ display: 'flex', overflowX: 'auto', overflowY:"hidden", padding: '10px' }}>
                  {getCategoryId >= 2? 
                    <IonIcon 
                      icon={arrowBackCircleOutline} 
                      className="size-36"
                      onClick={()=>{setCategoryId(getParentCategoryId)}}>
                    </IonIcon>
                    :
                    <div></div>
                  } 
                  {getCategoryList}
                </div>
              </IonCol>
            </IonRow>
          </div>
        }
        <div style={{position:"fixed",top:"13vh",width:"15%",right:"6%",}}>
          <IonRow>
            <IonCol className="ion-text-right">
              <IonToggle onIonChange={()=>{showRange(!hideRange)}}></IonToggle>
            </IonCol>
          </IonRow>
        </div>
        <div style={{position:"absolute",top:"18vh",width:"100%", height:"70vh", overflowY:"auto"}}>
          <Main 
            state={state}
            home={getHome}
            view={(e:any)=>{setAdminView(e)}}
          />
        </div>
        <div style={{position:"absolute",bottom:"0vh",width:"100%"}}>
          <Footer
            result={(e:any)=>{setView(e)}}
          />
        </div>
      </div>
      }
      {getAdminView &&
      <div>
        <IonRow className="ion-padding">
            {!hideApp &&
            <IonCol className="ion-padding" size="4" onClick={()=>{showApp(!hideApp);setView(2);}}>
                <div className="text-container ion-padding">App</div>
            </IonCol>
            }
            {hideApp &&
            <IonCol size="4" onClick={()=>{showApp(!hideApp);setView(1);}}>
                <div className="text-container ion-padding">Admin</div>
            </IonCol>
            }
        </IonRow>
        <ProductProperties
            state={state}
        />
      </div>
      }
    </div>  
  )
};

export default Home;
