import { IonButton, IonCol, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonToggle } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { addCommas, callProductImage } from '../../GlobalFunctions/Functions';
import { addCircleOutline, arrowBack, arrowBackCircleOutline, arrowForward, barcodeOutline, checkmarkCircle, checkmarkCircleOutline, closeCircle, closeOutline, locationOutline, saveOutline, searchCircleOutline, toggleOutline, trashBinOutline } from 'ionicons/icons';
import ImageController from '../../ImageController/ImageController';
import TextToDDL from '../../Objects/Edit/TextToDDL';
import TextToInput from '../../Objects/Edit/TextToInput';
import TextToCustomCategory from '../../Objects/Edit/TextToCustomCategory';
import BarcodeScannerComponent from '../../BarcodeReader/BarcodeReader';
import BarcodeReaderController from '../../BarcodeReaderController';
interface Manufacturer {
    id                  :string;
    name                :string;
}
const NewProduct = (props:any) =>{
    let Controller = new AbortController();
    
    const [image, setImage]                                 = useState<any>('../images/IntelRock.JPG')
    const [hideImageControllerView, showImageControllerView]  = useState<any>()
    const [getBarcode, setBarcode]                          = useState<any>('')
    const [getProductName, setProductName]                  = useState<any>('Product Name')
    const [getProductDescription, setProductDescription]    = useState<any>('Description')
    const [getCategory, setCategory]                        = useState<any>('Set Category')
    const [getManufacturer, setManufacturer]                = useState<any>('Set Manufacturer')
    const [getManufacturerId, setManufacturerId]            = useState<any>(0)
    const [manufacturerData, setManufacturerData]           = useState<Manufacturer[]>([])
    const [searchQueryManufacturer, setSearchQueryManufacturer]     = useState<string>("");
    const [getCategoryId, setCategoryId]                    = useState<any>(2)
    const [getParentCategoryId, setParentCategoryId]        = useState<any>(0)
    const [getUnitType, setUnitType]                        = useState<any>('Units')
    const [getUnitTypeId, setUnitTypeId]                    = useState<any>(0)
    const [getUnit, setUnit]                                = useState<any>(0)
    const [getStore, setStore]                              = useState<any>('Set Store')
    const [getStoreId, setStoreId]                          = useState<any>(0)
    const [getPrice, setPrice]                              = useState<any>('0.00')
    const [getStoreType, setStoreType]                      = useState<any>('Set Store Type')
    const [getStoreTypeId, setStoreTypeId]                  = useState<any>(0)
    const [getCurrencyType, setCurrencyType]                = useState<any>('$')
    const [getStage, setStage]                              = useState<any>(1)
    const [hideInput, showInput]                            = useState<any>(true)

    const [getNoManufacturer, setNoManufacturer]            = useState<any>(0)
    const [getNoCategory, setNoCategory]                    = useState<any>(0)

    const [hideCategoryList, showCategoryList]              = useState<any>()
    const [getCategoryList, setCategoryList]                = useState<any>()

    const [hideEditView, showEditView]                      = useState<any>(false)
    const [hideProductView, showProductView]                = useState<any>()
    const [hideBarcodeReader, showBarcodeReader]            = useState<any>()
    
    const [hideCategoryView, showCategoryView]              = useState<any>()
    const [hideAddCategoryView, showAddCatergoryView]       = useState<any>()
    const [hideAddManufacturerView, showaddManufacturerView]    = useState<any>()
    const [hideCategorization, showCategorization]          = useState<any>()

    const [getCategoryOption, setCategoryOption]            = useState<any>()
    const [getManufacturerOption, setManufacturerOption]    = useState<any>()
    const [getUnitTypeOption, setUnitTypeOption]            = useState<any>()

    

    const [getProductData, setProductData]                  = useState<any>()
    const [getCategoryData, setCategoryData]                 = useState<any>()

    const txtCategoryDescription                                 = useRef<any>("")
    const txtManufacturerDescription                             = useRef<any>("")
    const txtManufacturerSearch                                  = useRef<any>("")
    const [hideMoveCategory, showMoveCategory]              = useState<any>()

    const txtProductSearch                      = useRef<any>('')
    const [getProductSearch, setProductSearch]  = useState<any>('')

    const callProductImage = async () =>{
        let stream:any = ''
        stream = await fetch(props.state.secondary_host+'getImage?dbo=select_product_image'+
            "&barcode_id="+getBarcode
        )
        
        const blob  = await stream.blob();
        const url = URL.createObjectURL(blob);
        console.log(url)
        return(url)
    }

    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 1 :    showProductView(true);;break;
            case 2 :    showImageControllerView(true) ;break;
            case 3 :    showBarcodeReader(true);break;
            case 4 :    showCategoryView(true);
                        callCategory();
                        break;
        
        }
    }
    const resetView = () =>{
        showProductView(false)
        showImageControllerView(false)
        showBarcodeReader(false)
        showCategoryView(false)
    }
    
    const selectUnitType = () =>{
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
         fetch(props.state.secondary_host+'getData?dbo=select_list'+
            "&parent_id=1",
        )
        .then((response) => response.json())
        .then(data=>{
            var option:any = data.map((x:any, i:number)=>{
                return(
                    <IonSelectOption key={i} value={x.id}>{x.description}</IonSelectOption>
                )
            })
            setUnitTypeOption(option)
        })
    }
    const callCategory = () =>{
        fetch(props.state.secondary_host + "getData?dbo=select_list"+
            "&parent_id="+getCategoryId
            , 
        )
        .then((response) => response.json())
        .then(data=>{
        var category:any = []
        category = data.map((x:any,i:number)=>{
            setParentCategoryId(x.parent_id)
            return(
                <IonCol 
                    key={i}
                    size="6" 
                    className="ion-padding"
                    onClick={()=>{
                        setCategoryId(x.id);
                        setParentCategoryId(x.parent_id)
                        setCategory(x.description)
                    }}
                >
                    <div 
                        className='ellipsis-text ion-padding'
                        style={{
                            width:"100%",
                            borderRadius:"10px",
                            border:"1px solid #ccc"
                        
                        }}
                    >{x.description}</div>
                </IonCol>
            )
        })
        setCategoryList(category)
        })
    }
    const callUnitType = () =>{
        fetch(props.state.secondary_host + "getData?dbo=select_list"+
            "&parent_id="
            , 
        )
        .then((response) => response.json())
        .then(data=>{
        var category:any = []
        category = data.map((x:any,i:number)=>{
            setParentCategoryId(x.parent_id)
            return(
                <IonCol 
                    key={i}
                    size="6" 
                    className="ion-padding"
                    onClick={()=>{
                        setCategoryId(x.id);
                        setParentCategoryId(x.parent_id)
                        setCategory(x.description)
                    }}
                >
                    <div 
                        className='ellipsis-text ion-padding'
                        style={{
                            width:"100%",
                            borderRadius:"10px",
                            border:"1px solid #ccc"
                        
                        }}
                    >{x.description}</div>
                </IonCol>
            )
        })
        setCategoryList(category)
        })
    }
    const selectManufacturer = async () =>{
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
        try {
            var response = await fetch(props.state.secondary_host+'getData?dbo=select_manufacturer', {
                signal: Controller.signal, // Pass the signal to fetch
            })
            const data = await response.json();
            const list = data.map((x: any) => ({
                id                  : x.id || 'Unknown', 
                name                : x.name || 'No Name',// Ensure fallback if name is missing
            }));
            setManufacturerData(list)
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }  

    // Filtered items based on search query
    const filteredItemsManufacturer = manufacturerData.filter((item) =>
        item.name.toLowerCase().includes(searchQueryManufacturer)
    );

    const handleSearchChangeManufacturer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryManufacturer(event.target.value.toLowerCase());
    };

    const updateProduct = () =>{
        
        console.log("barcode="+getBarcode)
        console.log("name="+getProductName)
        console.log("description="+getProductDescription)
        console.log("category_type_id="+getCategoryId)
        console.log('manufacturer_id='+getManufacturerId)
        console.log('unit_type_id='+getUnitTypeId)
        console.log('unit='+getUnit)
        console.log('price='+getPrice)
        console.log('store_id='+getStoreId)
        console.log("user_id"+props.state.user_id)

        // // Abort any ongoing request
        // Controller.abort();

        // // Create a new AbortController for this request
        // Controller = new AbortController();
        //if(getBarcode != 0)
        //fetch(props.state.secondary_host+'getData?dbo=update_product_details'+
        //    "&barcode="+getBarcode+
        //    "&name="+getProductName+
        //    "&description="+getProductDescription+
        //    "&category_type_id="+getCategoryId+
        //    '&manufacturer_id='+getManufacturerId+
        //    '&unit_type_id='+getUnitTypeId+
        //    '&unit='+getUnit,
        //    {
        //        signal: Controller.signal, // Pass the signal to fetch
        //    }
        //)
        //.then((response) => response.json())
        //.then(data=>{
        //    if(data[0].done == 1){
        //        //selectProduct()
        //    }
        //    resetProductDetail()
        //})
        //.catch(error=>{
        //    resetProductDetail()
        //})
    }
    const insertCategory = (props:any) =>{
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
       if(getBarcode != 0)
       fetch(props.state.secondary_host+'getData?dbo=update_product_details'+
           "&description="+txtCategoryDescription.current.value+
           "&parent_id="+getCategory,
           {
               signal: Controller.signal, // Pass the signal to fetch
           }
       )
       .then((response) => response.json())
       .then(data=>{
           if(data[0].done == 1){
               //selectProduct()
           }
           resetProductDetail()
       })
       .catch(error=>{
           resetProductDetail()
       })
    }

    const insertManufacturer = (props:any) =>{
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
       if(getBarcode != 0)
       fetch(props.state.secondary_host+'getData?dbo=insert_manufacturer'+
           "&name="+txtManufacturerDescription.current.value,
           {
               signal: Controller.signal, // Pass the signal to fetch
           }
       )
       .then((response) => response.json())
       .then(data=>{
           if(data[0].done == 1){
               //selectProduct()
           }
           resetProductDetail()
       })
       .catch(error=>{
           resetProductDetail()
       })
    }
    const resetProductDetail = () =>{
        setBarcode('')
        setCategory('')
        setCategoryId(0)
        setManufacturerId(0)
        setManufacturer('')
        setProductName('')
        setProductDescription('')
        setUnitType(0)
        setUnit(0)
    }
    
    useEffect(()=>{

    },[getManufacturerId])
    useEffect(()=>{
        callCategory()
    },[getCategoryId])
   
    useEffect(()=>{
        //selectProduct()
    },[getProductSearch])

    useEffect(()=>{
        //updateProduct()
    },[getUnit])


    useEffect(()=>{
        //updateProduct()
    },[getUnitTypeId])
    
    useEffect(()=>{
        //updateProduct()
    },[getProductName])

    useEffect(()=>{
        //updateProduct()
    },[getProductDescription])

    useEffect(()=>{
        if(getBarcode != ''){
            setStage(getStage+1)
            showBarcodeReader(false)
        }
    },[getBarcode])

    useEffect(()=>{
        if(getStage > 7){
            updateProduct()
        }
    },[getStage])
    
    useEffect(()=>{
        setView(1)
        selectManufacturer()
        callUnitType()
        setCurrencyType(props.state.currency_type)
        setStoreType(props.state.user_store_type)
        setStore(props.state.user_store_name)
    },[props])
    return(
        <div>
            {!hideInput &&
            <div 
                style={{ minWidth: '150px', marginRight: '10px' , borderRadius:"18px",border:"0px solid #ccc", marginBottom:"15px"}} 
            >
                <IonRow style={{height:"auto"}}>
                    <IonCol size="12">
                        <div className="ion-text-bold size-16 cool-professional">New Product</div>
                    </IonCol>
                    <IonCol size="12" className="ion-padding ion-text-center">
                        <IonRow>
                            <IonCol>
                                <IonImg 
                                    src={image} 
                                    alt={"Select Image"} 
                                    onClick={()=>{/** */}}
                                />
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol  className="ion-text-hover" onClick={()=>{/** */}}>
                        <IonRow>
                            <IonCol>
                                {getCategory == 'Set Category' ?
                                    <div onClick={()=>{showInput(true);setStage(3)}} className="ion-text-bold size-16 soft-elegant">{getCategory}</div>
                                    :
                                    <div onClick={()=>{showInput(true);setStage(3)}} className="ion-text-bold size-16 cool-professional">{getCategory}</div>
                                }
                                {getManufacturer == 'Set Manufacturer' ?
                                    <div onClick={()=>{showInput(true);setStage(4)}} className="ion-text-bold size-16 soft-elegant">{getManufacturer}</div>
                                    :
                                    <div onClick={()=>{showInput(true);setStage(4)}} className="ion-text-bold size-16 cool-professional">{getManufacturer}</div>
                                }
                                {getProductName == 'Product Name' ?
                                    <div onClick={()=>{showInput(true);setStage(5)}} className="ion-text-bold size-16 soft-elegant">{getProductName}</div>
                                :
                                    <div onClick={()=>{showInput(true);setStage(5)}} className="ion-text-bold size-16 cool-professional">{getProductName}</div>
                                }
                                {getProductDescription == 'Description' ?
                                    <div onClick={()=>{showInput(true);setStage(5)}} className="ion-text-bold size-16 soft-elegant ">{getProductDescription}</div>
                                :
                                    <div onClick={()=>{showInput(true);setStage(5)}} className="ion-text-bold size-16 cool-professional">{getProductDescription}</div>
                                }
                                {getCategory == 'Set Category' ?
                                    <div onClick={()=>{showInput(true);setStage(3)}} className="ion-text-bold size-16 soft-elegant">{getCategory}</div>
                                    :
                                    <div onClick={()=>{showInput(true);setStage(3)}} className="ion-text-bold size-16 cool-professional">{getCategory}</div>
                                }
                                {getUnit == "0"?
                                    <div onClick={()=>{showInput(true);setStage(6)}} className="ion-text-bold size-16 soft-elegant">{getUnit}</div>
                                    :
                                    <div onClick={()=>{showInput(true);setStage(6)}} className="ion-text-bold size-16 cool-professional">{getUnit}</div>
                                }
                                {getUnitType ==  "Units"?
                                    <div onClick={()=>{showInput(true);setStage(6)}} className="ion-text-bold size-16 soft-elegant">{getUnitType}</div>
                                    :
                                    <div onClick={()=>{showInput(true);setStage(6)}} className="ion-text-bold size-16 cool-professional">{getUnitType}</div>
                                }
                                <div onClick={()=>{showInput(true);setStage(7)}} className="ion-text-bold size-16 cool-professional">
                                    {getCurrencyType}
                                </div>
                                {getPrice == '0.00'?
                                    <div onClick={()=>{showInput(true);setStage(7)}} className="ion-text-bold size-16 soft-elegant">
                                        {addCommas((getPrice/1).toFixed(2))}
                                    </div>
                                    :
                                    <div onClick={()=>{showInput(true);setStage(7)}} className="ion-text-bold size-16 cool-professional">
                                        {addCommas((getPrice/1).toFixed(2))}
                                    </div>
                                }
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </div>}
            {hideInput &&
            <div className="ion-padding">
                {getStage == 1 &&
                <div>
                    <IonLabel>Barcode / Product / Service identifier</IonLabel>
                    <IonRow>
                        <IonCol  size="9" className="size-18 ion-padding">
                            <div 
                                className="size-16 ion-padding" 
                                style={{border:"1px solid #ccc", width:"100%"}}
                                onClick={()=>{showBarcodeReader(!hideBarcodeReader)}}
                            >
                                {getBarcode}
                            </div>
                        </IonCol>
                        <IonCol 
                            className="ion-padding ion-text-hover" 
                            onClick={()=>{showBarcodeReader(!hideBarcodeReader)}}>
                            <IonIcon icon={addCircleOutline} className="size-36"></IonIcon>
                        </IonCol>
                    </IonRow>
                </div>
                }
                {getStage == 2 &&
                <div>
                    <IonLabel>Add an image</IonLabel>
                    <IonRow className="list-row ion-padding">
                        <IonCol size="12" style={{border:"1px solid #ccc", width:"100%"}}>
                            <IonImg 
                                src={image} 
                                style={{width:"100%", objectFit: "cover" }} 
                                onClick={()=>{setView(2)}}
                            />
                        </IonCol>
                    </IonRow>
                </div>
                }
                {getStage == 3 &&
                <div style={{width:"100%"}}>
                    <IonLabel>Select a category for easy searching</IonLabel>
                    <IonRow>
                        <IonCol size="2" className="ion-padding">
                            <IonIcon 
                                onClick={()=>{
                                    setCategoryId(getParentCategoryId)
                                }}
                                icon={arrowBack} 
                                className="size-32"
                            ></IonIcon>
                        </IonCol>
                        <IonCol className="size-16" >
                            <div
                                onClick={()=>{setView(4)}}
                                className='ion-padding'
                                style={{
                                    border:"1px solid #eee",
                                    borderRadius:"10px",
                                    backgroundColor:"#eee"
                                }}
                            >
                                <b>{getCategory}</b>
                            </div>
                        </IonCol>
                        <IonCol size="2" className="ion-padding">
                            {getCategoryId > 0 &&
                                <IonIcon 
                                    onClick={()=>{
                                        showInput(false);
                                        setStage(getStage+1)
                                    }}
                                    icon={checkmarkCircleOutline} 
                                    className="size-32"
                                ></IonIcon>
                            }
                        </IonCol>
                    </IonRow>
                </div>
                }
                {getStage == 4 &&
                <div>
                    <IonLabel>Select Brand / Manufacturer</IonLabel>
                    <IonRow>
                        <IonCol className="size-18 ion-padding">
                            <IonRow>
                                <IonCol>
                                    <IonInput
                                        type="text"
                                        ref={txtManufacturerSearch}
                                        placeholder="Search Manufacturer..."
                                        style={{fontSize:"18px"}}
                                        //onKeyUp={()=>{removeElementsByClass('clear-object')}}
                                        onIonChange={(e)=>{ handleSearchChangeManufacturer(e as any)}}
                                        onIonInput={(e) => {
                                            handleSearchChangeManufacturer(e as any)
                                        }}
                                        clearInput
                                    />
                                </IonCol>
                            </IonRow>
                            {/* Show What is Being Filtered */}
                            {getManufacturerId == 0 &&
                            <div 
                                style={{
                                    height:"auto", 
                                    width:"auto",
                                    overflowY:"auto", 
                                    zIndex:"10001", 
                                    position:"relative",
                                    borderRadius:"10px",
                                    fontSize:"24",
                                    backgroundColor:"#fff",
                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                }}
                                className={getCategory?"ion-padding list" :""}
                            >
                                <div>
                                {searchQueryManufacturer && filteredItemsManufacturer.length > 0 ? (
                                    filteredItemsManufacturer.map((cat:any) => (
                                    <IonRow>
                                        <IonCol 
                                            key={cat.id} 
                                            className="size-18 ion-text-hover"
                                            style={{backgroundColor:"white"}}
                                            onClick={()=>{
                                                txtManufacturerSearch.current.value = ""
                                                setManufacturer(cat.name)
                                                setManufacturerId(cat.id)
                                                setSearchQueryManufacturer(""); // Clear search to hide the list
                                            }}
                                        >
                                            {cat.name} 
                                        </IonCol>
                                    </IonRow>
                                    ))
                                ) : searchQueryManufacturer ? (
                                <IonCol>
                                    <IonCol className="text-red">No matching categories found.</IonCol>
                                </IonCol>
                                ) : null}
                                </div>
                            </div>
                            }
                            {getManufacturerId != 0 &&
                            <IonRow>
                                <IonCol className="size-16" >
                                    <div
                                        onClick={()=>{}}
                                        className='ion-padding'
                                        style={{
                                            border:"1px solid #eee",
                                            borderRadius:"10px",
                                            backgroundColor:"#eee"
                                        }}
                                    >
                                        <b>{getManufacturer}</b>
                                    </div>
                                </IonCol>
                                <IonCol size="2" className="ion-padding">
                                    {getManufacturerId > 0 &&
                                        <IonIcon 
                                            onClick={()=>{
                                                showInput(false);
                                                setStage(getStage+1)
                                            }}
                                            icon={checkmarkCircleOutline} 
                                            className="size-32"
                                        ></IonIcon>
                                    }
                                </IonCol>
                            </IonRow>
                            }
                        </IonCol>
                    </IonRow>
                </div>
                }
                {getStage == 5 &&
                <div>
                <IonLabel>Product or service and details</IonLabel>
                <IonRow>
                    <IonCol className="size-18 ion-padding">
                        <TextToInput
                            //text={""}
                            placeholder="Product Name"
                            result={(e:any)=>{
                                setProductName(e)
                            }}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="size-18 ion-padding">
                        <TextToInput
                            //text={""}
                            placeholder={getProductDescription}
                            result={(e:any)=>{
                                setProductDescription(e)
                            }}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className='ion-text-right'>
                        <IonIcon 
                            icon={checkmarkCircleOutline} 
                            className="size-36" 
                            onClick={()=>{
                                showInput(false);
                                setStage(getStage+1)
                            }}> </IonIcon>
                    </IonCol>
                </IonRow>
                </div>
                }
                {getStage == 6 &&
                <div>
                <IonLabel>Product / Service unit type</IonLabel>
                <IonRow>
                    <IonCol  size="12" className="size-18 ion-padding">
                        <TextToDDL
                            placeholder={getUnitType}
                            options= {getUnitTypeOption}
                            result={(e:any)=>{
                                setBarcode(getBarcode);
                                setUnitType(e)
                            }}
                        />
                    </IonCol>
                </IonRow>
                <IonLabel>Product / Service quantity</IonLabel>
                <IonRow>
                    <IonCol  size="12" className="size-18 ion-padding">
                        <TextToInput
                            //text={getUnit}
                            placeholder={getUnit}
                            result={(e:any)=>{
                                setBarcode(getBarcode);
                                setUnit(e)
                            }}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className='ion-text-right'>
                        <IonIcon 
                            icon={checkmarkCircleOutline} 
                            className="size-36" 
                            onClick={()=>{
                                showInput(false);
                                setStage(getStage+1)
                            }}> </IonIcon>
                    </IonCol>
                </IonRow>
                </div>
                }
                {getStage == 7 &&
                <div>
                <IonLabel>Price / </IonLabel>
                <IonLabel>Product / Service quantity</IonLabel>
                <IonRow>
                    <IonCol  size="12" className="size-18 ion-padding">
                        <TextToInput
                            placeholder={0.00}
                            result={(e:any)=>{
                                setBarcode(getBarcode);
                                setUnit(e)
                            }}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className='ion-text-right'>
                        <IonIcon 
                            icon={checkmarkCircleOutline} 
                            className="size-36" 
                            onClick={()=>{
                                showInput(false);
                                setStage(getStage+1)
                            }}> </IonIcon>
                    </IonCol>
                </IonRow>
                </div>
                }
            </div>
            }
            {hideBarcodeReader &&
                <BarcodeReaderController
                    result={(e:any)=>{setBarcode(e)}}
                    cancel={()=>{showBarcodeReader(!hideBarcodeReader)}}
                />
            }
            {hideImageControllerView &&
            <IonRow>
                <IonCol>
                    <ImageController
                        state={props.state}
                        barcode={getBarcode}
                        results={(e:any)=>{
                            //alert(e)
                            if(e != -1){
                                callProductImage()
                                showImageControllerView(false)
                            }else{
                                setStage(getStage+1)
                                showImageControllerView(false)
                            }
                        }}
                    />
                </IonCol>
            </IonRow>
            }
            {hideCategoryView &&
            <IonRow >
                {getCategoryList}
            </IonRow>
            }
        </div>
    )
}
export default NewProduct