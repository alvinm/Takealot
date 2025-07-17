import { IonButton, IonCol, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonToggle } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { addCommas, callProductImage } from '../../GlobalFunctions/Functions';
import { addCircleOutline, checkmarkCircle, checkmarkCircleOutline, closeCircle, closeOutline, saveOutline, searchCircleOutline, trashBinOutline } from 'ionicons/icons';
import ImageController from '../../ImageController/ImageController';
import TextToDDL from '../../Objects/Edit/TextToDDL';
import TextToInput from '../../Objects/Edit/TextToInput';
import TextToCustomCategory from '../../Objects/Edit/TextToCustomCategory';
import ProductCategory from '../ProductCategory';
import MoveCategory from '../MoveCategory';

const ProductProperties = (props:any) =>{
    let Controller = new AbortController();
    const [getImage, setImage]                              = useState<any>()
    const [getBarcode, setBarcode]                          = useState<any>('')
    const [getProductName, setProductName]                  = useState<any>('')
    const [getProductDescription, setProductDescription]    = useState<any>('')
    const [getCategory, setCategory]                        = useState<any>(0)
    const [getCategoryButton, setCategoryButton]            = useState<any>()
    const [getCategoryButton2, setCategoryButton2]            = useState<any>()
    const [getCategoryButton3, setCategoryButton3]            = useState<any>()
    const [getManufacturer, setManufacturer]                = useState<any>(0)
    const [getUnitType, setUnitType]                        = useState<any>(0)
    const [getUnit, setUnit]                                = useState<any>(0)

    const [getNoManufacturer, setNoManufacturer]            = useState<any>(0)
    const [getNoCategory, setNoCategory]                    = useState<any>(0)

    const [hideEditView, showEditView]                      = useState<any>(false)
    const [hideProductView, showProductView]                = useState<any>()
    const [hideImageControllerView, showImageControllerView]  = useState<any>()
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
    const [hideMoveCategory, showMoveCategory]              = useState<any>()

    const [currentPage, setCurrentPage]         = useState(1);
    const [totalPages, setTotalPages]           = useState(1);
    const itemsPerPage                          = 50; // Define page size

    const txtProductSearch                      = useRef<any>('')
    const [getProductSearch, setProductSearch]  = useState<any>('')
    
    const setView = (v:any) =>{
        resetView()
        switch(v){
            case 1 : showProductView(true);selectCategory() ;break;
            case 2 : showImageControllerView(true) ;break;
            case 3 : showCategorization(true);break;
            case 4 : showMoveCategory(true);break;
        }
    }
    const resetView = () =>{
        showProductView(false)
        showImageControllerView(false)
        showCategorization(false)
        showMoveCategory(false)
    }
    
    const selectCategory = () =>{
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
         fetch(props.state.secondary_host+'getData?dbo=select_category'+
            "&parent_id=2",
        )
        .then((response) => response.json())
        .then(data=>{
            setCategoryData(data)
            var option:any = data.map((x:any, i:number)=>{
                return(
                    <IonSelectOption key={i} value={x.id}>{x.description}</IonSelectOption>
                )
            })
            var option2:any = data.map((x:any, i:number)=>{
                return(
                    <IonCol 
                        key={i} 
                        size="3"
                    >
                        <IonRow>
                            <IonCol 
                                onClick={()=>{callSubCategory(x.category_id)}}
                                className="ion-padding text-container ellipsis-text"
                            >
                                {x.category}
                                <br/>({x.count})
                            </IonCol> 
                            <IonCol>
                                <IonIcon 
                                    icon={checkmarkCircleOutline} 
                                    className="size-32 ion-text-hover"
                                    onClick={()=>{setCategory(x.category_id)}}
                                ></IonIcon>
                                <IonIcon 
                                    icon={addCircleOutline} 
                                    className="size-32 ion-text-hover"
                                    onClick={()=>{
                                        setCategory(x.category_id)
                                        showAddCatergoryView(!hideAddCategoryView)
                                        showCategoryView(!hideCategoryView)
                                    }}
                                ></IonIcon>
                                <IonIcon icon={trashBinOutline} className="size-32 ion-text-hover"></IonIcon>
                            </IonCol>
                        </IonRow> 
                    </IonCol>
                )
            })
            setCategoryOption(option)
            setCategoryButton(option2)
        }) 
    }
    const callSubCategory = (id:any) =>{
        var y:any = null
        setCategoryButton3(y)
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_category'+
            "&parent_id="+id
        )
        .then((response) => response.json())
        .then(data=>{
            var category:any = data.map((x:any, i:number)=>{
                return(
                    <IonCol key={i} size="3">
                        <IonRow>
                            <IonCol 
                                onClick={()=>{callSubSubCategory(x.category_id)}}
                                className="ion-padding text-container ellipsis-text"
                            >
                                {x.category}
                                <br/>({x.count})
                            </IonCol> 
                            <IonCol>
                                <IonIcon 
                                    icon={checkmarkCircleOutline} 
                                    className="size-32 ion-text-hover"
                                    onClick={()=>{setCategory(x.category_id)}}
                                ></IonIcon>
                                <IonIcon 
                                    icon={addCircleOutline} 
                                    className="size-32 ion-text-hover"
                                    onClick={()=>{
                                        setCategory(x.category_id)
                                        showAddCatergoryView(!hideAddCategoryView)
                                        showCategoryView(!hideCategoryView)
                                    }}
                                ></IonIcon>
                                <IonIcon icon={trashBinOutline} className="size-32 ion-text-hover"></IonIcon>
                            </IonCol>
                        </IonRow> 
                    </IonCol>
                )
            })
            setCategoryButton2(category)
        })
    }
    const callSubSubCategory = (id:any) =>{
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_category'+
            "&parent_id="+id
        )
        .then((response) => response.json())
        .then(data=>{
            var category:any = data.map((x:any, i:number)=>{
                return(
                    <IonCol key={i} size="3">
                        <IonRow>
                            <IonCol 
                                onClick={()=>{/** */}}
                                className="ion-padding text-container ellipsis-text"
                            >
                                {x.category}
                                <br/>({x.count})
                            </IonCol> 
                            <IonCol>
                                <IonIcon 
                                    onClick={()=>{
                                        setCategory(x.category_id)
                                    }}
                                    icon={checkmarkCircleOutline} 
                                    className="size-32 ion-text-hover"
                                    ></IonIcon>
                                <IonIcon 
                                    icon={addCircleOutline} 
                                    className="size-32 ion-text-hover"
                                    onClick={()=>{
                                        setCategory(x.category_id)
                                        showAddCatergoryView(!hideAddCategoryView)
                                        showCategoryView(!hideCategoryView)
                                    }}
                                ></IonIcon>
                                <IonIcon icon={trashBinOutline} className="size-32 ion-text-hover"></IonIcon>
                            </IonCol>
                        </IonRow> 
                    </IonCol>
                )
            })
            setCategoryButton3(category)
        })
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
    const selectManufacturer = () =>{
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
         fetch(props.state.secondary_host+'getData?dbo=select_manufacturer'
        )
        .then((response) => response.json())
        .then(data=>{
            var option:any = data.map((x:any, i:number)=>{
                return(
                    <IonSelectOption key={i} value={x.id}>{x.name}</IonSelectOption>
                )
            })
            setManufacturerOption(option)
        })
    }
    const selectProduct =  (page=1) =>{
        // Abort any ongoing request
        Controller.abort();
        //const { items: data, total } = await response.json(); // Expecting structured response

        // Create a new AbortController for this request
        Controller = new AbortController();
       fetch(props.state.secondary_host+'getData?dbo=select_products'+
        "&search_text="+getProductSearch+
        "&no_category="+getNoCategory+
        "&no_manufacturer="+getManufacturer+
        "&page="+page+
        "&page_size="+itemsPerPage, 
           {
               signal: Controller.signal, // Pass the signal to fetch
           }
       )
       .then((response) => response.json())
       .then( async data =>{

            const list = await Promise.all(data.map(async (x: any, i: number) => {
                const z = { state: props.state, barcode: x.barcode };
                const image = await callProductImage(z); // Ensure you await the function
                return (
                    <IonRow key={i} className="list-row ion-padding">
                        <IonCol size="1">
                            <IonImg 
                                src={image} 
                                style={{width:"100px", objectFit: "cover" }} 
                                onClick={()=>{
                                    setView(2)
                                    setBarcode(x.barcode)
                                }}
                            />
                        </IonCol>
                        <IonCol  size="1" className="size-18 ion-padding">
                            <div className="size-16 ion-padding">{x.barcode}</div>
                        </IonCol>
                        <IonCol className="size-18 ion-padding">
                            <TextToCustomCategory
                                text={x.category}
                                barcode={x.barcode}
                                size="3"
                                state={props.state}
                                result={(e:any)=>{
                                    setBarcode(x.barcode);
                                    showCategoryView(true)
                                }}
                            />
                        </IonCol>
                        <IonCol className="size-18 ion-padding">
                            <TextToDDL
                                text={x.manufacturer}
                                options= {getManufacturerOption}
                                result={(e:any)=>{
                                    setBarcode(x.barcode);
                                    setManufacturer(e)
                                }}
                            />
                        </IonCol>
                        <IonCol className="size-18 ion-padding">
                            <TextToInput
                                text={x.product}
                                result={(e:any)=>{
                                    setBarcode(x.barcode);
                                    setProductName(e)
                                }}
                            />
                        </IonCol>
                        <IonCol className="size-18 ion-padding">
                            <TextToInput
                                text={x.description}
                                result={(e:any)=>{
                                    setBarcode(x.barcode);
                                    setProductDescription(e)
                                }}
                            />
                        </IonCol>
                        <IonCol  size="1" className="size-18 ion-padding">
                            <TextToDDL
                                text={x.unit_type}
                                options= {getUnitTypeOption}
                                result={(e:any)=>{
                                    setBarcode(x.barcode);
                                    setUnitType(e)
                                }}
                            />
                        </IonCol>
                        <IonCol  size="1" className="size-18 ion-padding">
                            <TextToInput
                                text={x.unit}
                                result={(e:any)=>{
                                    setBarcode(x.barcode);
                                    setUnit(e)
                                }}
                            />
                        </IonCol>
                    </IonRow>
                );
            }))
            var header:any = <IonRow key={-1} className="list-row header-row size-32 ion-text-bold">
                                <IonCol className="size-20"  size="1"></IonCol>
                                <IonCol className="size-20"  size="1">BARCODE</IonCol>
                                <IonCol className="size-20" >CATEGORY</IonCol>
                                <IonCol className="size-20" >MANUFACTURER</IonCol>
                                <IonCol className="size-20" >PRODUCT</IonCol>
                                <IonCol className="size-20" >DESCRIPTION</IonCol>
                                <IonCol className="size-20"  size="1" >UNIT TYPE</IonCol>
                                <IonCol className="size-20"  size="1">UNIT</IonCol>
                            </IonRow>
            var all:any = [header, list]
            setProductData(all)
            resetProductDetail()
            showEditView(false)
            setTotalPages(Math.ceil(data[0].total_records/1 / itemsPerPage));
        })
   }
    const updateProduct = () =>{
         // Abort any ongoing request
         Controller.abort();

         // Create a new AbortController for this request
         Controller = new AbortController();
        if(getBarcode != 0)
        fetch(props.state.secondary_host+'getData?dbo=update_product_details'+
            "&barcode="+getBarcode+
            "&name="+getProductName+
            "&description="+getProductDescription+
            "&category_type_id="+getCategory+
            '&manufacturer_id='+getManufacturer+
            '&unit_type_id='+getUnitType+
            '&unit='+getUnit,
            {
                signal: Controller.signal, // Pass the signal to fetch
            }
        )
        .then((response) => response.json())
        .then(data=>{
            if(data[0].done == 1){
                selectProduct()
            }
            resetProductDetail()
        })
        .catch(error=>{
            resetProductDetail()
        })
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
               selectProduct()
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
       fetch(props.state.secondary_host+'getData?dbo=insert_category'+
           "&description="+txtManufacturerDescription.current.value,
           {
               signal: Controller.signal, // Pass the signal to fetch
           }
       )
       .then((response) => response.json())
       .then(data=>{
           if(data[0].done == 1){
               selectProduct()
           }
           resetProductDetail()
       })
       .catch(error=>{
           resetProductDetail()
       })
    }
    const resetProductDetail = () =>{
        setBarcode('')
        setCategory(0)
        setManufacturer(0)
        setProductName('')
        setProductDescription('')
        setUnitType(0)
        setUnit(0)
    }
    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        selectProduct(newPage);
    };
    useEffect(()=>{
        selectProduct()
    },[getProductSearch])
    useEffect(()=>{
        selectProduct()
    },[getManufacturerOption])

    useEffect(()=>{
        selectManufacturer()
    },[getUnitTypeOption])

    useEffect(()=>{
        selectUnitType()
    },[getCategoryOption])

    useEffect(()=>{
        updateProduct()
    },[getUnit])
    useEffect(()=>{
        updateProduct()
    },[getManufacturer])
    useEffect(()=>{
        updateProduct()
    },[getUnitType])
    useEffect(()=>{
        updateProduct()
    },[getCategory])
    useEffect(()=>{
        updateProduct()
    },[getProductName])
    useEffect(()=>{
        updateProduct()
    },[getProductDescription])
    useEffect(()=>{
        //showEditView(true)
    },[getBarcode])

    useEffect(()=>{
        
        setView(1)
    },[])
    return(
        <div className="ion-padding">
            {hideCategorization &&
            <div className="ion-padding">
            <IonRow className="ion-padding" style={{border:"1px solid #ccc", borderRadius:"18px"}}>
                <IonCol size="1">
                    <div 
                        className="ion-padding text-container"
                        onClick={()=>{showCategorization(!hideCategorization);setView(1)}}
                    >
                        Normal Admin
                    </div>
                </IonCol>
                {hideCategorization &&
                <IonCol size="1">
                    <div 
                        className="ion-padding text-container"
                        onClick={()=>{setView(4)}}
                    >
                        Move Category
                    </div>
                </IonCol>
                }
                <IonCol size="1" className=""></IonCol>
                <IonCol size="2" className="ion-padding">
                    <IonToggle
                        style={{ transform: "scale(1.3)" }} // Increase toggle size by 50%
                        onIonChange={(e)=>{if(e.detail.checked){setNoCategory(1)}else{setNoCategory(0)}}}
                    >
                        No Category
                    </IonToggle>
                </IonCol>
                <IonCol size="1" className=""></IonCol>
                <IonCol size="2" className="ion-padding">
                    <IonToggle
                        style={{ transform: "scale(1.3)" }} // Increase toggle size by 50%
                        onIonChange={(e)=>{if(e.detail.checked){setNoManufacturer(1)}else{setNoManufacturer(0)}}}
                    >
                        No Manufacterer
                    </IonToggle>
                </IonCol>
            </IonRow>
            </div>
            }
            {!hideCategorization && !hideMoveCategory &&
            <IonRow>
                <IonCol size="2">
                <div 
                    className="ion-padding text-container"
                    onClick={()=>{showCategorization(!hideCategorization);setView(3)}}
                >
                    Fast Categorization
                </div>
                </IonCol>
            </IonRow>
            }
            {hideMoveCategory &&
            <div className="ion-padding">
            <IonRow className="ion-padding" style={{border:"1px solid #ccc", borderRadius:"18px"}}>
                
                <IonCol size="2">
                <div 
                    className="ion-padding text-container"
                    onClick={()=>{showCategorization(!hideCategorization);setView(3)}}
                >
                    Fast Categorization
                </div>
                </IonCol>
                <IonCol size="1">
                    <div 
                        className="ion-padding text-container"
                        onClick={()=>{showCategorization(!hideCategorization);setView(1)}}
                    >
                        Normal Admin
                    </div>
                </IonCol>
            </IonRow>
            </div>
            }
            {hideCategorization &&
                <div>
                    <ProductCategory
                        state={props.state}
                        no_category={getNoCategory}
                        no_manufacturer={getNoManufacturer}
                    />
                </div>
            }
            {hideMoveCategory &&
                <div>
                    <MoveCategory
                        state={props.state}
                        no_category={getNoCategory}
                        no_manufacturer={getNoManufacturer}
                    />
                </div>
            }
            {hideAddCategoryView &&
                <div>
                    <IonRow>
                        <IonCol className="size-32 ion-text-bold ion-text-left">Add Category</IonCol>
                    </IonRow>
                </div>
            }
            {hideAddManufacturerView &&
                <div>
                    <IonRow>
                        <IonCol className="size-32 ion-text-bold ion-text-left">Add Manufacturer</IonCol>
                    </IonRow>
                </div>
            }
            {hideCategoryView &&
                <div 
                    style={{
                            position:"fixed",
                            top:"5%",
                            left:"20%",
                            width:"60%",
                            height:"60vh",
                            zIndex:"9999",
                            backgroundColor:"#fff",
                            border:"1px solid #ccc",
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            borderRadius:"10px"
                        }}
                >
                    <IonRow>
                        <IonCol className="size-24 ion-text-bold">Category</IonCol>
                        <IonCol className="ion-text-right">
                            <IonIcon icon={closeOutline} className='size-36 ion-text-hover' onClick={()=>{showCategoryView(!hideCategoryView)}}></IonIcon>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol> 
                            <IonRow>
                                {getCategoryButton}
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol> 
                            <IonRow>
                                {getCategoryButton2}
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol> 
                            <IonRow>
                                {getCategoryButton3}
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </div>
            }
            {hideProductView &&
            <div>
                {!hideEditView &&
                <div>
                <IonRow className="pagination-controls">
                    <IonCol size="3">
                        <IonRow className="ion-padding">
                            {/* Search Bar */}
                            <IonCol size="10">
                            <IonInput
                                type="text"
                                ref={txtProductSearch}
                                placeholder="Search products..."
                                clearInput
                            />
                            </IonCol>
                            <IonCol>
                                <IonIcon 
                                    icon={searchCircleOutline} 
                                    className="size-36  ion-text-hover"
                                    onClick={()=>{
                                        setProductSearch(txtProductSearch.current.value)
                                    }}
                                ></IonIcon>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    <IonCol size="6"></IonCol>
                    <IonCol>
                        <IonRow>
                            <IonCol size="3">
                                <IonButton disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                                &lt;  Prev
                                </IonButton>
                            </IonCol>
                            <IonCol>
                                <span>Page {currentPage} of {totalPages}</span>
                            </IonCol>
                            <IonCol>
                                <IonButton disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                                    Next &gt;
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <div style={{overflowY:"auto",height:"60%"}}>
                            {getProductData}
                        </div>
                    </IonCol>
                </IonRow>
                </div>
                }
            </div>
            }
            {hideImageControllerView &&
            <IonRow>
                <IonCol>
                    <ImageController
                        state={props.state}
                        barcode={getBarcode}
                        
                        results={()=>{setView(1)}}
                    />
                </IonCol>
            </IonRow>
                
            }
        </div>
    )
}
export default ProductProperties