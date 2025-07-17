import React, { useEffect, useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonImg, IonGrid, IonRow, IonCol, IonContent, IonTextarea, IonIcon } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import './GeneralTemplate.css'
import { addCommas } from '../GlobalFunctions/Functions';

const callBarcode = async (props:any) =>{
    let stream:any = ''
    stream = await fetch(props.state.secondary_host+'getImage?dbo=select_product_image'+
        "&barcode_id="+props.barcode
    )
    
    const blob  = await stream.blob();
    const url = URL.createObjectURL(blob);
    console.log(url)
    return(url)
}
  const ProductList =  (props:any) => {
    const [imageUrl, setImageUrl]   = useState("");
    const [products, setProducts]   = useState<any>([])

    const SearchByCategory = async () =>{
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=searched_products_by_category"+
            "&category_id="+props.state.parent_category_id+
            "&longitude="+props.state.longitude+
            "&latitude="+props.state.latitude
            , 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then((response) => response.json())
        .then( async data =>{
        const list = await Promise.all(data.map(async (x: any, i: number) => {
                const z = { state: props.state, barcode: x.barcode };
                const image = await callBarcode(z); // Ensure you await the function
                return (
                <IonCol size="6">
                <div 
                    key={i} 
                    style={{ minWidth: '150px', marginRight: '10px', borderRadius:"10px", border:"1px solid #ccc" }} 
                    className='general-template-container '
                    onClick={()=>{
                        var y:any = [];
                        y.push({barcode:x.barcode, target:5})
                        props.result(y[0])
                    }}
                >
                    <IonRow style={{maxHeight:"150px"}}>
                        <IonCol className="ion-padding ion-text-center">
                            <IonImg src={image} alt={x.product.name} style={{maxHeight:"120px",minHeight:"120px"}}/>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="size-12">
                            <div style={{width:"100%"}} className="ellipsis-text">{x.brand}</div>
                            <div style={{width:"100%"}} className="ion-text-bold ellipsis-text">{x.product_name}</div>
                            <div style={{width:"100%"}} className="ellipsis-text">{x.description}</div>
                            <div>{x.unit}{x.unit_type}</div>
                        </IonCol>
                    </IonRow>
                    <IonRow className="size-12">
                        <IonCol size="12" style={{color:"orangered",fontWeight:"bold"}}>
                            <div className="" style={{padding:"3px"}}> 
                                <div style={{float:"left"}}>{x.currency_symbol}</div>
                                <div style={{float:"right"}}>{addCommas((x.price/1).toFixed(2))}</div>
                            </div>
                        </IonCol>
                        <IonCol size="12" className="ion-text-bold">
                            <div className="" style={{padding:"3px"}}> 
                                <div style={{float:"left"}}>
                                    <IonIcon icon={locationOutline} className="size-16" style={{color:"blue",fontWeight:"bold"}} ></IonIcon>
                                    Km
                                </div>
                                <div style={{float:"right"}}>{addCommas(x.distance/1)}</div>
                            </div>
                        </IonCol>
                    </IonRow>
                </div>
                </IonCol>
                )

            }))
            setProducts(list)
        })
    }
    
    const MostSearchedProducts = async () =>{
        let Controller = new AbortController();
        fetch(props.state.secondary_host + "getData?dbo=report_most_searched_products"+
            //"&category_id="+2+
            "&longitude="+props.state.longitude+
            "&latitude="+props.state.latitude
            , 
        {
            signal: Controller.signal, // Pass the signal to fetch
        })
        .then((response) => response.json())
        .then( async data =>{
        const list = await Promise.all(data.map(async (x: any, i: number) => {
                const z = { state: props.state, barcode: x.barcode };
                const image = await callBarcode(z); // Ensure you await the function
                return (
                <div 
                    key={i} 
                    style={{ minWidth: '150px', marginRight: '10px', borderRadius:"10px", border:"1px solid #ccc" }} 
                    className='general-template-container '
                    onClick={()=>{
                        var y:any = [];
                        y.push({barcode:x.barcode, target:5})
                        props.result(y[0])
                    }}
                >
                    <IonRow style={{maxHeight:"150px"}}>
                        <IonCol className="ion-padding ion-text-center">
                            <IonImg src={image} alt={x.product.name} style={{maxHeight:"120px",minHeight:"120px"}}/>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="size-12">
                            <div style={{width:"100%"}} className="ellipsis-text">{x.brand}</div>
                            <div style={{width:"100%"}} className="ellipsis-text ion-text-bold">{x.product_name}</div>
                            <div style={{width:"100%"}} className="ellipsis-text">{x.description}</div>
                            <div>{x.unit}{x.unit_type}</div>
                        </IonCol>
                    </IonRow>
                    <IonRow className="size-12">
                        <IonCol size="12" style={{color:"orangered",fontWeight:"bold"}}>
                            <IonRow className=" "> 
                                <IonCol className="ion-text-left">{x.currency_symbol}</IonCol>
                                <IonCol className="ion-text-right">{addCommas((x.price/1).toFixed(2))}</IonCol>
                            </IonRow>
                        </IonCol>
                        {/*
                        <IonCol size="12" className="ion-text-bold">
                            <IonIcon icon={locationOutline} style={{color:"blue",fontWeight:"bold"}} ></IonIcon>&nbsp;
                            {addCommas(x.distance/1)}Km
                        </IonCol>*/}
                    </IonRow>
                </div>
                )

            }))
            setProducts(list)
        })
    }
    
    
    
    const setDataExtraction = (de:any) =>{
        console.log(de)
        switch(de){
            case 1: MostSearchedProducts();break;
            case 2: SearchByCategory();break;
        }
    }
    useEffect(()=>{
        console.log(props)
        setDataExtraction(props.data)
    },[props])
    return (
    <div>
        {props.state.parent_category_id == 2 &&
            <div style={{ display: 'flex', overflowX: 'auto', overflowY:"hidden", padding: '10px' }}>
            {products}
            </div>
        }
        {props.state.parent_category_id != 2 &&
            <IonRow style={{ padding: '10px' }}>
                {products}
            </IonRow>
        }
    </div>
    );
  };
  
  export default ProductList;