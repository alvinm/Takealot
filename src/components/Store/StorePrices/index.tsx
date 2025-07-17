import { IonCol, IonIcon, IonImg, IonRow, IonTextarea } from "@ionic/react"
import { addCommas } from "../../GlobalFunctions/Functions";
import { useEffect, useState } from "react";
import './index.css'
import ImageController from "../../ImageController/ImageController";
import { locationOutline } from "ionicons/icons";

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

const ShopPrices = (props:any) =>{
    const [imageUrl, setImageUrl]   = useState("");
    const [products, setProducts]   = useState<any>([])
    const [getStoreId, setStoreId]  = useState<any>()
    const [barcode, setBarcode]     = useState<any>()

    const [hideImageControllerView, showImageControllerView] = useState<any>(false)
    const [hideResults, showResults]    = useState<any>()

    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 1 :showResults(true);callShopSearch();break;
            case 2 :showImageControllerView(true);break;
        }
    }
    const resetView = () =>{
        showResults(false);
        showImageControllerView(false);
    }
        
    const callShopSearch = () =>{
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=select_store_product_by_category"+
            "&store_id="+props.shop_id+
            "&category_id="+0
            , 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then((response) => response.json())
        .then( async data =>{
                const list = await Promise.all(data.map(async (x: any, i: number) => {
                const z = { state: props.state, barcode: x.barcode };
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
                                        onClick={()=>{setBarcode(x.barcode);}}
                                    />
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="ellipsis-text ion-text-left">
                                    <div>{x["store type"]}</div>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol size="7" className="ion-text-hover" onClick={()=>{}}>
                            <IonRow>
                                <IonCol>   
                                    <div className="ion-text-bold size-16">{x.manufacturer}</div>
                                    <div>{x.product_name}</div>
                                    <div className="ellipsis-text">
                                        {x.description}
                                    </div>
                                    <div className="ellipsis-text">
                                        {x.unit}{x.unit_type}
                                    </div>
                                    <div style={{color:"orangered",fontWeight:"bold"}} className="size-14">
                                        {x.currency_type} {addCommas((x.price/1).toFixed(2))}
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
        setView(2)
    },[barcode])
    useEffect(()=>{
        setView(1)
    },[props])
    return(
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
                    <IonCol>
                        <ImageController
                            state={props.state}
                            barcode={barcode}
                            results={()=>{setView(1)}}
                        />
                    </IonCol>
                </IonRow>
            }
        </div>
    )
}
export default ShopPrices