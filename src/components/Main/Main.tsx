import React, { useCallback, useEffect, useState } from 'react'
import { getLocation } from '../GlobalFunctions/Functions'
import { IonButton, IonCol, IonRow } from '@ionic/react'
import { TakePhoto } from '../Camera/TakePhoto'
import BarcodeScannerComponent from '../BarcodeReader/BarcodeReader'
import ProductList from '../ResultsTemplates/GeneralTemplate'
import ProductProperties from '../Admin/ProductProperties/ProductProperties'
import BarcodePrices from '../BarcodePrices'
import NewProduct from '../Store/NewProduct'
import MostSearchedProductsList from '../ResultsTemplates/MostSearchedProducts'
import SearchByCategoryList from '../ResultsTemplates/SearchByCategory'
import UserDetails from '../Users/Index'
import GoogleMap from '../GoogleMaps'


const Main = (props:any) =>{
    const [getPictureView, setPictureView]  = useState<any>()
    const [getBarcodeView, setBarcodeView]  = useState<any>()
    const [getSearchView, setSearchView]    = useState<any>()
    const [getHomeView, setHomeView]        = useState<any>()
    const [getAdminView, setAdminView]      = useState<any>()
    const [getAccountView, setAccountView]  = useState<any>()
    const [getBarcode, setBarcode]          = useState<any>('0000000000')
    const [getBarcodeSearchView, setBarcodeSearchView]  = useState<any>()
    const [getCategoryView, setCategoryView]            = useState<any>()
    const [prevView, view]                  = useState<any>()
    const [hideNewProductView, showNewProductView]   = useState<any>()

    const setView = (v:any) =>{
        view(v)
        resetView()
        switch(v){
            case 0: 
                    setHomeView(true);
                    if(props.state.category_id == 2)
                        setCategoryView(true); 
                    if(props.state.category_id != 2 && props.state.category_id != 0)
                        setCategoryView(false);
                    break;
            case 1: setPictureView(true);TakePhoto(getBarcode); break;
            case 2: setBarcodeView(true); break;
            case 3: setSearchView(true); break;
            case 4: setAdminView(true); break;
            case 5: setBarcodeSearchView(true);break;
            case 6: showNewProductView(true); break;
            case 7: setAccountView(true); break;
        }
    }
    
    const resetView = () =>{
        setAdminView(false)
        setPictureView(false)
        setBarcodeView(false)
        setSearchView(false)
        setHomeView(false)
        setBarcodeSearchView(false)
        showNewProductView(false)
        setAccountView(false)
    }
    useEffect(()=>{
        setView(0)
    },[props.state.category_id])
    useEffect(()=>{
        setView(5);
    },[getBarcode])
    useEffect(()=>{
        //alert(props.state.view)
        setView(props.state.view)
    },[props.state.view])
    const markers = [
        { lat: -17.824858, lng: 31.053028, title: 'Harare' },
        { lat: -17.82, lng: 31.06, title: 'Point 2' },
      ];
    return(
        <div style={{overflowY:"auto"}} className="ion-padding">
            <IonRow>
                <IonCol>
                    {hideNewProductView &&
                        <div>
                            <NewProduct
                                state={props.state}
                                results={(e:any)=>{/** */}}
                            />
                        </div>
                    }
                    {getBarcodeView &&
                        <div>
                            <BarcodeScannerComponent
                                result = {(e:any)=>{alert(e); setBarcode(e)}}
                                close ={(e:any)=>{setView(3)}}
                            />
                        </div>
                    }
                    {(getHomeView && getCategoryView) &&
                    <div 
                        style={{
                            height:"100vh",
                            overflowY:"auto"
                        }}
                    >
                        <div>
                            <div className="size-22 ion-text-bold">Most Searched</div>
                            <MostSearchedProductsList
                                state={props.state}
                                result={(e:any)=>{setBarcode(e.barcode); setView(e.target)}}
                            />
                        </div>
                        <br/>
                        <div>
                            <div className="size-22 ion-text-bold">Bargain Hunters</div>
                            <ProductList
                                state={props.state}
                            />
                        </div>
                    </div>
                    }
                    {(getHomeView && !getCategoryView) &&
                    <div 
                        style={{
                            height:"100vh",
                            overflowY:"auto"
                        }}
                    >
                        <div>
                            <div className="size-22 ion-text-bold">Category {props.state.category_name}</div>
                            <GoogleMap 
                                center={markers[0]} 
                                points={markers} 
                                height="500px" 
                            />
                            <SearchByCategoryList
                                state={props.state}
                                result={(e:any)=>{setBarcode(e.barcode); setView(e.target)}}
                            />
                        </div>
                    </div>
                    }
                    {getBarcodeSearchView &&
                    <div>
                        <GoogleMap 
                            center={markers[0]} 
                            points={markers} 
                            height="500px" 
                        />
                        <BarcodePrices
                            state={props.state}
                            barcode={getBarcode}
                        />
                    </div>
                    }
                    {getAccountView &&
                        <UserDetails
                            state={props.state}
                        />
                    }
                </IonCol>
            </IonRow>
        </div>
    )
}
export default Main