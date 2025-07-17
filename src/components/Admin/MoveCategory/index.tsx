import { IonButton, IonCol, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { callProductImage } from "../../GlobalFunctions/Functions";
import React, { useEffect, useRef, useState } from "react";
import { addCircleOutline, archiveOutline, arrowRedoCircleOutline, searchCircleOutline, trashBinOutline } from "ionicons/icons";
import TextToInput from "../../Objects/Edit/TextToInput";
import TextToInputSave from "../../Objects/Edit/TextToInputSave";


interface Category {
    name                :string;
    parent_id           :string;
    category_id         :string;
    parent_category     :string;
    full_category_path  :string;
    product_count       :string;
}
interface ParentCategory {
    name                :string;
    parent_id           :string;
    category_id         :string;
    parent_category     :string;
    full_category_path  :string;
    product_count       :string;
}

const MoveCategory = (props: any) => {
    let Controller = new AbortController();
    const [getProductList, setProductList]              = useState<JSX.Element[]>([]); // Store JSX elements
     const [droppedItems, setDroppedItems]              = useState<ParentCategory[]>([]); // Store dropped product data
    const [itemsParentCategory, setItemsParentCategory]     = useState<ParentCategory[]>([]); // Store product data for searching and filtering
    const [itemsCategory, setItemsCategory]             = useState<Category[]>([]); // Store product data for searching and filtering
    const [searchQuery, setSearchQuery]                 = useState<string>("");
    const [searchQueryCategory, setSearchQueryCategory] = useState<string>("");
    const [getCategory, setCategory]                    = useState<any>()
    const [getCategoryTree, setCategoryTree]            = useState<any>()
    const [getSourceCategoryId, setSourceCategoryId]    = useState<any>()
    const [getSourceCategoryArchiveId, setSourceCategoryArchiveId]    = useState<any>() 
    const [getCategoryId, setCategoryId]                = useState<any>()
    const [getParentCategory, setParentCategory]        = useState<any>()
    const [getParentCategoryId, setParentCategoryId]    = useState<any>()
    const [previousItems, setPreviousItems]             = useState<any>()
    const txtProductSearch                              = useRef<any>()
    const txtCategorySearch                             = useRef<any>()

    //const txtProductSearch                            = useRef<any>('')
    const [getProductSearch, setProductSearch]          = useState<any>('')
    useEffect(()=>{
        archiveCategory()
    },[getSourceCategoryArchiveId])
    useEffect(()=>{
        moveCategory()
    },[getSourceCategoryId])
    useEffect(() => {
        callFullCategoryList();
    }, [props]);

    // Fetch product category and images
    const callFullCategoryList = async () =>{
        
        //setItemsCategory(z)
        Controller.abort(); // Abort any ongoing request
        Controller = new AbortController(); // Create a new controller

        try {
            const response = await fetch(props.state.secondary_host + "getData?dbo=select_category_full", {
            signal: Controller.signal, // Pass the signal to fetch
        });

        const data = await response.json();

        const categoryList = data.map((x: any) => ({
            name                : x.category || 'Unknown', // Ensure fallback if name is missing
            parent_id           : x.parent_id || 'No description available',
            category_id         : x.category_id || 'Uncategorized',
            parent_category     :x.parent_category,
            full_category_path  :x.full_category_path,
            product_count: x.product_count
          }));
          setItemsCategory(categoryList)
          setItemsParentCategory(categoryList)
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, category_id: string) => {
        event.dataTransfer.setData("text/plain", category_id);
        console.log(category_id)
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    const handleDrop = (d:any,e:any) =>{
        console.log(d)
        console.log(e)
        switch (e){
            case 1  :handleDropMove(d);break;
            case 2  :handleDropArchive(d);break;
        }
    }

    const handleDropMove = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const itemId = event.dataTransfer.getData("text/plain");

        // Find the product based on barcode
        const droppedItem = itemsCategory.find((item) => item.category_id === itemId);

        if (droppedItem) {
            setDroppedItems((prev) => [...prev, droppedItem]);
            setItemsCategory((prev) => prev.filter((item) => item.category_id !== itemId)); // Remove from main list
        }
        console.log(itemId)
        setSourceCategoryId(itemId)
    };
    const handleDropArchive = (event: React.DragEvent<HTMLDivElement>) => {
        console.log(event)
        event.preventDefault();
        const itemId = event.dataTransfer.getData("text/plain");

        // Find the product based on category id
        const droppedItem = itemsCategory.find((item) => item.category_id === itemId);

        if (droppedItem) {
            setDroppedItems((prev) => [...prev, droppedItem]);
            setItemsCategory((prev) => prev.filter((item) => item.category_id !== itemId)); // Remove from main list
        }
        console.log(itemId)
        setSourceCategoryArchiveId(itemId)
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    

    const handleSearchChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryCategory(event.target.value.toLowerCase());
    };

    // Filtered items based on search query
    const filteredItemsCategory = itemsCategory.filter((item) =>
        item.full_category_path.toLowerCase().includes(searchQueryCategory)
    );
    
    const addSubCategory = async (parent_id:any, category_name:any) =>{
        try {
            const response = await fetch(props.state.secondary_host + "getData?dbo=insert_sub_category"+
                "&parent_id="+parent_id+
                "&category_name="+category_name, 
            {
                signal: Controller.signal, // Pass the signal to fetch
            });

            const data = await response.json(); // Expecting structured response
            callFullCategoryList()
        } catch (error) {
            console.error("Fetch error:", error);
        }
        
    }
    
    const moveCategory = async () =>{
        //console.log(category_id)
        console.log("source category id:"+getSourceCategoryId)
        console.log("target category id:"+getCategoryId)
        const response = await fetch(props.state.secondary_host + "getData?dbo=update_category_parent"+
            "&source_category_id="+getSourceCategoryId+
            "&parent_category_id="+getCategoryId, 
        );

        const data = await response.json(); // Expecting structured response
        callFullCategoryList()
    }
    const archiveCategory = async () =>{
        console.log("archive category id:"+getSourceCategoryArchiveId)
        const response = await fetch(props.state.secondary_host + "getData?dbo=update_category_parent"+
            "&source_category_id="+getSourceCategoryArchiveId,
        );

        const data = await response.json(); // Expecting structured response
        callFullCategoryList()
    }
    return (
        <div>
        <IonRow className="ion-padding">
            <IonCol size="5" className="ion-padding" style={{border:"1px solid #ccc", borderRadius:"18px"}}>
                <IonRow>
                    <IonCol className="size-22 ion-text-bold">Source Category</IonCol>
                    <IonCol className="ion-text-right">
                    </IonCol>
                </IonRow>    
                
                <div style={{ height: "60vh", overflowY: "auto" }}>
                    {/* Render filtered product list */}
                    {itemsCategory.map((item, i) => (
                    <IonRow key={i}>
                        <IonCol>
                            <div
                                draggable
                                onDragStart={(e) => handleDragStart(e, item.category_id)}
                                title={item.full_category_path}
                                style={{border:"1px solid #ccc", borderRadius:"18px"}}
                            >
                                <IonRow>
                                    <IonCol className="size-22 ion-text-bold">{item.name}</IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol className="size-16 ion-text-bold">{item.full_category_path} ({item.product_count})</IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                    </IonRow>
                    ))}
                </div>
            </IonCol>
            <IonCol className="ion-padding ion-text-center">
                <IonIcon icon={arrowRedoCircleOutline} className="size-72"></IonIcon>
            </IonCol>
            <IonCol size="6" className="ion-padding" style={{border:"1px solid #ccc", borderRadius:"18px"}}>
                <IonRow>
                    <IonCol className="size-22 ion-text-bold">Target Parent Category</IonCol>
                </IonRow>
                <IonRow className="ion-padding">
                    {/* Search Bar */}
                    <IonCol size="3">
                        <IonRow>
                            <IonCol>
                                <IonInput
                                    type="text"
                                    ref={txtCategorySearch}
                                    placeholder="Search category..."
                                    style={{fontSize:"18px"}}
                                    onIonInput={(e) => {
                                        handleSearchChangeCategory(e as any)
                                    }}
                                    clearInput
                                />
                            </IonCol>
                        </IonRow>
                        {/* Show What is Being Filtered */}
                        <div 
                            style={{
                                height:"30vh", 
                                overflowY:"auto", 
                                zIndex:"10001", 
                                position:"fixed",
                                borderRadius:"10px",
                                fontSize:"24",
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            }}
                            className={getCategory?"ion-padding list" :""}
                            
                        >
                          
                                {searchQueryCategory && filteredItemsCategory.length > 0 ? (
                                    filteredItemsCategory.map((cat:any) => (
                                    <IonRow>
                                        <IonCol 
                                            key={cat.category_id} 
                                            className="size-18 ion-text-hover"
                                            style={{backgroundColor:"white"}}
                                            onClick={()=>{
                                               
                                                setCategoryTree(cat.full_category_path)
                                                setParentCategory(cat.parent_category)
                                                setParentCategoryId(cat.parent_id)
                                                setCategory(cat.name)
                                                setCategoryId(cat.category_id)
                                                setSearchQueryCategory(""); // Clear search to hide the list
                                                
                                                txtCategorySearch.current.value = ""; // Clear input field
                                            }}
                                        >
                                           {cat.full_category_path} ({cat.product_count})
                                        </IonCol>
                                    </IonRow>
                                    ))
                                ) : searchQueryCategory ? (
                                <IonCol>
                                    <IonCol className="text-red">No matching categories found.</IonCol>
                                </IonCol>
                                ) : null}
                        </div>
                    </IonCol>
                    <IonCol size="4">
                        <div className="ion-padding text-container">{getCategoryTree}</div>
                    </IonCol>
                    <IonCol >
                        {/*<IonRow>
                            <IonCol><div className="ion-padding text-container">{getParentCategory}</div></IonCol>
                            <IonCol><IonIcon icon={addCircleOutline} className="size-36 ion-text-hover"></IonIcon></IonCol>
                        </IonRow>*/}
                        <TextToInputSave
                            text={getParentCategory}
                            placeholder_text="Add Sub To"
                            result={(e:any)=>{
                                addSubCategory(getParentCategoryId, e)
                            }}
                        />
                    </IonCol>
                    <IonCol >
                        {/*<IonRow>
                            <IonCol><div className="ion-padding text-container">{getCategory}</div></IonCol>
                            <IonCol><IonIcon icon={addCircleOutline} className="size-36 ion-text-hover"></IonIcon></IonCol>
                        </IonRow>*/}
                        <TextToInputSave
                            text={getCategory}
                            placeholder_text="Add Sub To"
                            result={(e:any)=>{
                                addSubCategory(getCategoryId, e)
                            }}
                        />
                    </IonCol>
                </IonRow>
                <IonRow className="ion-padding">
                    <IonCol>
                        <div
                            className="ion-padding"
                            onDragOver={handleDragOver}
                            onDrop={(e)=>handleDrop(e,1)}
                            style={{
                            border: "2px dashed #ccc",
                            padding: "20px",
                            marginTop: "20px",
                            textAlign: "center",
                            width: "100%",
                            height: "20vh",
                            }}
                        >
                            <h3>
                                <IonIcon icon={addCircleOutline} className="size-36"></IonIcon>&nbsp;
                                Add Categories Here
                            </h3>
                            <IonRow className="ion-padding">
                                {droppedItems.map((item) => (
                                    <IonCol 
                                        style={{margin:"20px"}} 
                                        className="ion-padding text-container ellipses-text" 
                                        key={item.category_id} 
                                        size="2"
                                    >
                                        {item.name}
                                    </IonCol>
                                ))}
                            </IonRow>
                        </div>

                    </IonCol>
                </IonRow>
                <IonRow className="ion-padding">
                    <IonCol>
                        <div
                            className="ion-padding"
                            onDragOver={handleDragOver}
                            onDrop={(e)=>handleDrop(e,2)}
                            style={{
                                border: "2px dashed #ccc",
                                padding: "20px",
                                marginTop: "20px",
                                textAlign: "center",
                                width: "100%",
                                height: "20vh",
                            }}
                        >
                            <h3>
                                <IonIcon icon={trashBinOutline} className="size-36"></IonIcon>&nbsp;
                                Archive Categories Here
                            </h3>
                            <IonRow className="ion-padding">
                                {droppedItems.map((item) => (
                                    <IonCol 
                                        style={{margin:"20px"}} 
                                        className="ion-padding text-container ellipses-text" 
                                        key={item.category_id} 
                                        size="2"
                                    >
                                        {item.name}
                                    </IonCol>
                                ))}
                            </IonRow>
                        </div>

                    </IonCol>
                </IonRow>
            </IonCol>
        </IonRow>
        </div>
    );
};

export default MoveCategory;
