import { IonButton, IonCol, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { callProductImage } from "../../GlobalFunctions/Functions";
import React, { useEffect, useRef, useState } from "react";
import { addCircleOutline, searchCircleOutline } from "ionicons/icons";
import TextToInput from "../../Objects/Edit/TextToInput";
import TextToInputSave from "../../Objects/Edit/TextToInputSave";

interface Product {
    barcode: string;
    name: string;
    description: string;
    category: string;
}

interface Category {
    name                :string;
    parent_id           :string;
    category_id         :string;
    parent_category     :string;
    full_category_path  :string;
    product_count       :string;
}

const ProductCategory = (props: any) => {
    let Controller = new AbortController();
    const [getProductList, setProductList]      = useState<JSX.Element[]>([]); // Store JSX elements
    const [droppedItems, setDroppedItems]       = useState<Product[]>([]); // Store dropped product data
    const [items, setItems]                     = useState<Product[]>([]); // Store product data for searching and filtering
    const [itemsCategory, setItemsCategory]     = useState<Category[]>([]); // Store product data for searching and filtering
    const [searchQuery, setSearchQuery]         = useState<string>("");
    const [searchQueryCategory, setSearchQueryCategory] = useState<string>("");
    const [images, setImages]                   = useState<{ [key: string]: string }>({}); // To store image URLs by barcode
    const [getCategory, setCategory]            = useState<any>()
    const [getCategoryTree, setCategoryTree]    = useState<any>()
    const [getCategoryId, setCategoryId]        = useState<any>()
    const [getParentCategory, setParentCategory]    = useState<any>()
    const [getParentCategoryId, setParentCategoryId]    = useState<any>()
    const [previousItems, setPreviousItems]     = useState<any>()
    const [currentPage, setCurrentPage]         = useState(1);
    const [totalPages, setTotalPages]           = useState(1);
    const itemsPerPage                          = 50; // Define page size
    const [data, setData] = useState<string[]>([]);
    const txtProductSearch                      = useRef<any>()
    const txtCategorySearch                     = useRef<any>()
    const [getBarcode, setBarcode]              = useState<any>()

    //const txtProductSearch                      = useRef<any>('')
    const [getProductSearch, setProductSearch]  = useState<any>('')
    const [visibleList, setVisibleList]         = useState<any>()
    useEffect(()=>{
        callPreviousProductCategory()
    },[getCategory])
    useEffect(() => {
        callProductCategory();
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
            product_count       :x.product_count
          }));
          setItemsCategory(categoryList)
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    
    const callPreviousProductCategory = async () => {
        Controller.abort(); // Abort any ongoing request
        Controller = new AbortController(); // Create a new controller

        try {
        const response = await fetch(props.state.secondary_host + "getData?dbo=select_products"+
        "&category_id="+getCategoryId
        , 
        {
            signal: Controller.signal, // Pass the signal to fetch
        });

        const data = await response.json();

        // Ensure data has the necessary structure
        const productList = data.map((x: any) =>{ 
            return(
                <IonCol size="3" className="ion-padding">
                    <div className="ion-padding text-container ">
                        {x.product}
                    </div>
                </IonCol>
            )
        });

        // Store product data for filtering and search
        setPreviousItems(productList);


        } catch (error) {
        console.error("Fetch error:", error);
        }
    };

    const callProductCategory = async (page = 1) => {
        //Controller.abort(); // Abort any ongoing request
        //Controller = new AbortController(); // Create a new controller

        try {
            const response = await fetch(props.state.secondary_host + "getData?dbo=select_products"+
                "&search_text="+getProductSearch+
                "&no_category="+props.no_category+
                "&no_manufacturer="+props.no_manufacturer+
                "&page="+page+
                "&page_size="+itemsPerPage, 
            );

            const data = await response.json(); // Expecting structured response
            console.log(items)
            console.log(data[0].total)
            // Ensure data has the necessary structure
            const productList = data.map((x: any) => ({
                barcode: x.barcode,
                name: x.product || 'Unknown', // Ensure fallback if name is missing
                description: x.description || 'No description available',
                category: x.category || 'Uncategorized',
            }));

            // Store product data for filtering and search
            setItems(productList);
            setTotalPages(Math.ceil(data[0].total_records / itemsPerPage)); // Calculate total pages

            // Fetch images for each product
            const imageUrls: { [key: string]: string } = {};
            for (const x of data) {
                const z = { state: props.state, barcode: x.barcode };
                const image = await callProductImage(z); // Fetch product image
                imageUrls[x.barcode] = image || 'https://via.placeholder.com/150'; // Fallback image
            }

            setImages(imageUrls); // Store image URLs

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, barcode: string) => {
        event.dataTransfer.setData("text/plain", barcode);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const itemId = event.dataTransfer.getData("text/plain");

        // Find the product based on barcode
        const droppedItem = items.find((item) => item.barcode === itemId);

        if (droppedItem) {
            setDroppedItems((prev) => [...prev, droppedItem]);
            setItems((prev) => prev.filter((item) => item.barcode !== itemId)); // Remove from main list
        }
        console.log(droppedItem)
        console.log(itemId)
        //setBarcode(itemId)
        setProductCategory(itemId)
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    // Filtered items based on search query
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
    );

    const handleSearchChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryCategory(event.target.value.toLowerCase());
    };

    // Filtered items based on search query
    const filteredItemsCategory = itemsCategory.filter((item) =>
        item.full_category_path.toLowerCase().includes(searchQueryCategory)
    );
    
    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        callProductCategory(newPage);
    };
    
    const removeElementsByClass = (className: string) => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => element.remove());
      };

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
    const setProductCategory = async (barcode:any) =>{
        try {
            const response = await fetch(props.state.secondary_host + "getData?dbo=update_product_category"+
                "&barcode="+barcode+
                "&category_id="+getCategoryId, 
            );

            const data = await response.json(); // Expecting structured response
            callFullCategoryList()
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    useEffect(() => {
        console.log("Updated Items:", items);
    }, [items]);
    return (
        <div>
        <IonRow className="ion-padding">
            <IonCol size="8" className="ion-padding" style={{border:"1px solid #ccc", borderRadius:"18px"}}>
                <IonRow>
                    <IonCol className="size-22 ion-text-bold">Category</IonCol>
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
                                    onKeyUp={()=>{removeElementsByClass('clear-object')}}
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
                                height:"auto", 
                                width:"auto",
                                overflowY:"auto", 
                                zIndex:"10001", 
                                position:"fixed",
                                borderRadius:"10px",
                                fontSize:"24",
                                backgroundColor:"#fff",
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
                                            txtCategorySearch.current.clearInput; // Clear input field
                                            txtCategorySearch.current.value = "";
                                            
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
                    <IonCol size="12">
                        <div
                            className="ion-padding"
                            style={{
                                border      : "2px solid #ccc",
                                padding     : "20px",
                                marginTop   : "20px",
                                textAlign   : "center",
                                width       : "100%",
                                height      : "15vh",
                                overflowY   : "auto"
                            }}
                        >
                            <h3>Exisiting Items</h3>
                        <IonRow>
                            {previousItems}
                        </IonRow>
                        </div>
                    </IonCol>
                    <IonCol size="12">
                        <div
                            className="ion-padding"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            style={{
                            border: "2px dashed #ccc",
                            padding: "20px",
                            marginTop: "20px",
                            textAlign: "center",
                            width: "100%",
                            height: "30vh",
                            overflowY:"auto"
                            }}
                        >
                            <IonRow className="ion-padding ion-text-left">
                                {droppedItems.map((item) => (
                                    <IonCol className="" key={item.barcode} size="2">
                                        <div className="ellipses-text text-container ion-padding clear-object">{item.name}</div>
                                    </IonCol>
                                ))}
                            </IonRow>
                        </div>
                    </IonCol>
                </IonRow>
            </IonCol>
            <IonCol></IonCol>
            {true &&
            <IonCol size="3" className="ion-padding" style={{border:"1px solid #ccc", borderRadius:"18px"}}>
                <IonRow>
                    <IonCol className="size-22 ion-text-bold">Product</IonCol>
                    <IonCol className="ion-text-right"></IonCol>
                </IonRow>    
                <IonRow className="ion-padding">
                    {/* Search Bar */}
                    <IonCol size="10">
                    <IonInput
                        type="text"
                        ref={txtProductSearch}
                        placeholder="Search products..."
                        onIonInput={(e) =>{ 
                            handleSearchChange(e as any)
                            setProductSearch(txtProductSearch.current.value)
                        }}
                        clearInput
                    />
                    </IonCol>
                    <IonCol size="2">
                        <IonIcon 
                            icon={searchCircleOutline} 
                            className="size-36 ion-text-hover"
                            onClick={()=>{callProductCategory()}}
                        ></IonIcon>
                    </IonCol>
                </IonRow>
                <IonRow className="pagination-controls ion-padding">
                    <IonCol>
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
                <div style={{ height: "50vh", overflowY: "auto" }}>
                    {/* Render filtered product list */}
                    <IonRow className="ion-padding">
                    {filteredItems.map((item, i) => (
                        <IonCol key={i} size="6" className="ion-padding" >
                            <div
                                style={{border:"1px solid #ccc",borderRadius:"10px"}}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item.barcode)}
                                title={item.name + " " + item.description + " " + item.category}
                            >
                                <IonRow>
                                    <IonCol size="12">
                                        <IonImg
                                        src={images[item.barcode] || 'https://via.placeholder.com/150'} // Use fetched image or fallback
                                        style={{ width: "100%", objectFit: "cover" }}
                                        />
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol className="size-12 ion-text-bold ellipses-text">{item.name}</IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol className="size-10 ion-text-bold">{item.category}</IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                    ))} 
                    </IonRow>
                </div>
            </IonCol>
            }
        </IonRow>
        </div>
    );
};

export default ProductCategory;
