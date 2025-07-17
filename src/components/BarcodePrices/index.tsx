import { IonCol, IonIcon, IonImg, IonRow, IonTextarea } from "@ionic/react"
import { addCommas } from "../GlobalFunctions/Functions";
import { useEffect, useState } from "react";
import './index.css'
import ImageController from "../ImageController/ImageController";
import { locationOutline } from "ionicons/icons";
import ShopPrices from "../Store/StorePrices";

const callBarcodeImage = async (props:any) =>{
    let stream:any = ''
    stream = await fetch(props.state.secondary_host+'getImage?dbo=select_product_image'+
        "&barcode_id="+props.barcode
    )
    
    const blob  = await stream.blob();
    const url = URL.createObjectURL(blob);
    console.log(url)
    return(url)
}

const BarcodePrices = (props:any) =>{
    const [imageUrl, setImageUrl]   = useState("");
    const [products, setProducts]   = useState<any>([])
    const [getStoreId, setStoreId]  = useState<any>()
    const [getStorePriceId, setStorePriceId]  = useState<any>()
    const [hideShopPrices, showShowPrices] = useState<any>()

    const [hideImageControllerView, showImageControllerView] = useState<any>(false)
    const [hideResults, showResults]    = useState<any>()

    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 1 :showResults(true);callBarcodeSearch();break;
            case 2 :showImageControllerView(true);break;
            case 3 :showShowPrices(true);break;
        }
    }
    const resetView = () =>{
        showResults(false);
        showImageControllerView(false);
        showShowPrices(false)
    }
        
    const callBarcodeSearch = () =>{
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=find_barcode_prices"+
            "&code="+props.barcode+
            "&longitude="+props.state.longitude+
            "&latitude="+props.state.latitude
            , 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then((response) => response.json())
        .then( async data =>{
                const list = await Promise.all(data.map(async (x: any, i: number) => {
                const z = { state: props.state, barcode: x.guid };
                const image = await callBarcodeImage(z); // Ensure you await the function
                return (
                <div 
                    key={i} 
                    style={{ minWidth: '150px', marginRight: '10px' , borderRadius:"18px",border:"1px solid #ccc", marginBottom:"15px"}} 
                    
                >
                    <IonRow style={{maxHeight:"200px"}}>
                        <IonCol size="5" className="ion-padding ion-text-center">
                            <IonRow>
                                <IonCol>
                                    <IonImg 
                                        src={image} 
                                        alt={x.product_name} 
                                        //style={{maxHeight:"50px",minHeight:"50px"}}
                                        onClick={()=>{setStoreId(x.guid);}}
                                    />
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="ellipsis-text ion-text-left">
                                    <div>{x["store type"]}</div>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol size="7" className="ion-text-hover" onClick={()=>{setStorePriceId(x.guid)}}>
                            <IonRow>
                                <IonCol>   
                                    <div className="ion-text-bold size-16">{x.store}</div>
                                    <div>{x.name}</div>
                                    <div className="ellipsis-text">{x.description}</div>
                                    <div>{x.unit}{x.unit_type}</div>
                                    <div style={{color:"orangered",fontWeight:"bold"}} className="size-14">
                                        {x.currency_type} {addCommas((x.price/1).toFixed(2))}
                                    </div>
                                    <div style={{color:"",fontWeight:"bold"}} className="size-14">
                                        <IonIcon icon={locationOutline} className="size-16"></IonIcon> {addCommas((x.distance/1).toFixed(2))}Km
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </div>
                )
        
                }))
                setProducts(list)
            })
    }
    useEffect(()=>{
        setView(3)
    },[getStorePriceId])
    useEffect(()=>{
        setView(2)
    },[getStoreId])
    useEffect(()=>{
        setView(1)
    },[props])
    return(
        <div>
            {!hideShopPrices &&
            <div>
                {!hideImageControllerView &&
                <div>
                    <IonRow>
                        <IonCol size="1"></IonCol>
                        <IonCol></IonCol>
                        <IonCol size="1"></IonCol>
                    </IonRow>
                    <div style={{height:"60%", overflowY:"auto"}}>
                        {products}
                    </div>
                </div>
                }
                {hideImageControllerView &&
                    <IonRow>
                        <IonCol size="3"></IonCol>
                        <IonCol>
                            <ImageController
                                state={props.state}
                                barcode={getStoreId}
                                results={()=>{setView(1)}}
                            />
                        </IonCol>
                        <IonCol size="3"></IonCol>
                    </IonRow>
                }
            </div>
            }

            {hideShopPrices &&
            <div>
                <ShopPrices
                     state={props.state}
                     shop_id={getStorePriceId}
                     results={()=>{setView(1)}}
                />
            </div>
            }
        </div>
    )
}
export default BarcodePrices