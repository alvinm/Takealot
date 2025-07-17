import { IonCol, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from '@ionic/react'
import { businessOutline, checkmarkCircleOutline, person, saveOutline } from 'ionicons/icons'
import React, { useEffect, useRef, useState } from 'react'
import TextToInputSave from '../Objects/Edit/TextToInputSave'
import ImageController from '../ImageController/ImageController'

const UserDetails = (props:any) =>{
    const [image, setImage]                                     = useState<any>('../images/IntelRock.JPG')
    const [hideImageControllerView, showImageControllerView]    = useState<any>()
    const[getEmail, setEmail]                       = useState<any>()
    const[getForename, setForename]                 = useState<any>()
    const[getSurname, setSurname]                   = useState<any>()
    const[getShopName, setShopName]                 = useState<any>("Set Shop/Service Name")
    const[getShopType, setShopType]                 = useState<any>("Set Shop/Service Type")
    const[getCurrency, setCurrency]                 = useState<any>("Set Transaction Currency")
    const[getCountry, setCountry]                   = useState<any>("Set Country")
    const[getVATNo, setVATNo]                       = useState<any>("Set VAT No.")
    const[getTaxNo, setTaxNo]                       = useState<any>("Company Tax No.")

    const[getForenameView, setForenameView]         = useState<any>()
    const[getSurnameView, setSurnameView]           = useState<any>()
    const[getShopNameView, setShopNameView]         = useState<any>()
    const[getShopTypeView, setShopTypeView]         = useState<any>()
    const[getCurrencyView, setCurrencyView]         = useState<any>()
    const[getCountryView, setCountryView]           = useState<any>()
    const[getVATNoView, setVATNoView]               = useState<any>()
    const[getTaxNoView, setTaxNoView]               = useState<any>()

    const[getShopId       , setShopId]              = useState<any>(0)
    const[getShopGUID     , setShopGUID]            = useState<any>('')
    const[getShopTypeId   , setShopTypeId]          = useState<any>(0)
    const[getCurrencyId   , setCurrencyId]          = useState<any>(0)
    const[getCountryId    , setCountryId]           = useState<any>(0)

    const [getCountryOptions, setCountryOptions]    = useState<any>()
    const [getCurrencyOptions, setCurrencyOptions]  = useState<any>()
    const [getShopTypeOptions, setShopTypeOptions]  = useState<any>()

    const ddlCountryId                              = useRef<any>(0)
    const ddlShopTypeId                             = useRef<any>(0)
    const ddlCurrencyId                             = useRef<any>(0)                             

    const callList = async (parent_id:any) =>{
        var response:any = await fetch(props.state.secondary_host+'getData?dbo=select_list'+
            "&parent_id="+parent_id,
        )
        const data = await response.json();
        const list = data.map((x: any) => ({
            id                  : x.id || 'Unknown', 
            name                : x.description || 'No Option',// Ensure fallback if name is missing
        }));
        var options : any = []
        /**Store Type */
        if(parent_id == 4){
            options =  data.map((x:any, i:number)=>{
                return(
                    <IonSelectOption key={i} value={x.id}>
                        {x.description}
                    </IonSelectOption>
                )
            })
            setShopTypeOptions(options)
        }
    }
    const callCountry = async () =>{
        var response:any = await fetch(props.state.secondary_host+'getData?dbo=select_country',
        )
        const data = await response.json();
        const list = data.map((x: any, i:number) => {
            return(
                <IonSelectOption key={i} value={x.id}>
                    {x.country}
                </IonSelectOption>
            )
        });
       setCountryOptions(list)
    }
    const callCurrency = async () =>{
        var response:any = await fetch(props.state.secondary_host+'getData?dbo=select_currency_list',
        )
        const data = await response.json();
        const list = data.map((x: any, i:number) => {
            return(
                <IonSelectOption key={i} value={x.id}>
                    {x.currency_code}
                </IonSelectOption>
            )
        });
       setCurrencyOptions(list)
    }
    const setUserDetails = () =>{
            console.log("user_id="     +props.state.user_id)
            console.log("forename="    +getForename)
            console.log("surname="     +getSurname)
            console.log("email="       +getEmail)
            console.log("shop_name="   +getShopName)
            console.log("shop_id="     +getShopId)
            console.log("shop_type_id="+getShopTypeId)
            console.log("currency_id=" +getCurrencyId)
            console.log("country_id="  +getCountryId)
            console.log("tax_no="      +getTaxNo)
            console.log("vat_no="      +getVATNo)
        
        fetch(props.state.secondary_host+'getData?dbo=update_user_details'+
            "&user_id="+props.state.user_id+
            "&forename="+getForename+
            "&surname="+getSurname+
            "&email="+getEmail+
            "&shop_name="+getShopName+
            "&shop_id="+getShopId+
            "&shop_type_id="+getShopTypeId+
            "&currency_id="+getCurrencyId+
            "&country_id="+getCountryId+
            "&tax_no="+getTaxNo+
            "&vat_no="+getVATNo
            ,
        )
        .then((response) => response.json())
        .then(data=>{
            setShopId(data[0].shop_id)
        })
    }
    const handleChange = (e:any, action:any) =>{
        const selectedValue = e.detail.value; // Get the selected value (ID)
        let selectElement:any = null; // Get the IonSelect element from ref
        if(action == 3)
            selectElement = ddlCurrencyId.current;// Get the IonSelect element from ref
        if(action == 4)
            selectElement = ddlShopTypeId.current; // Get the IonSelect element from ref
        if(action == 2)
            selectElement = ddlCountryId.current; // Get the IonSelect element from ref
        
        console.log(selectElement)

        if (selectElement) {
            // Find the selected option using the ref
            const selectedOption = selectElement.querySelector(`ion-select-option[value="${selectedValue}"]`);
            
            if (selectedOption) {
              const selectedText = selectedOption.textContent; // Get the text of the selected option
                if(action == 3){
                    setCurrency(selectedText);
                    setCurrencyId(selectedValue);
                    setCurrencyView(!getCurrencyView)
                }
                if(action == 4){
                    setShopType(selectedText);
                    setShopTypeId(selectedValue);
                    setShopTypeView(!getShopTypeView)
                }
                if(action == 2){
                    setCountry(selectedText);
                    setCountryId(selectedValue);
                    setCountryView(!getCountryView)
                }
              console.log("Selected option text:", selectedText); // Logs the selected text
              console.log("Selected option ID:", selectedValue);   // Logs the selected value (ID)
      
              
            } else {
              console.warn("No matching option found for value:", selectedValue);
            }
          } else {
            console.warn("IonSelect element not found");
          }
    }
    const callShopImage = async () =>{
        let stream:any = ''
        stream = await fetch(props.state.secondary_host+'getImage?dbo=select_product_image'+
            "&barcode_id="+getShopGUID
        )
        
        const blob  = await stream.blob();
        const url = URL.createObjectURL(blob);
        console.log(url)
        return(url)
    }

    useEffect(()=>{
            //
        console.log(getCurrency)
    },[getCurrency])
    useEffect(()=>{
        //
        console.log(getShopType)
    },[getShopType])
    useEffect(()=>{
        //
        console.log(getCountry)
    },[getCountry])
    useEffect(()=>{
        setEmail(props.state.email)
        setForename(props.state.forename)
        setSurname(props.state.surname)
        setShopName(props.state.user_store_name)
        setShopType(props.state.user_store_type)
        setShopTypeId(props.state.user_store_type_id)
        setShopId(props.state.user_store_id)
        setShopGUID(props.state.user_store_guid)
        setCurrency(props.state.user_store_currency)
        setCountry(props.state.user_store_country)
        setVATNo(props.state.user_store_vat_no)
        setTaxNo(props.state.user_store_tax_no)
        callList(4)
        callCountry()
        callCurrency()
    },[props])
    return(
        <div>
            <IonRow>
                <IonCol size="2" className="">
                    <IonIcon icon={person} className="size-36"></IonIcon>
                </IonCol>
                <IonCol size="8" className="size-24 ion-padding">
                    User Details
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="12" className="greyed-out">{getEmail}</IonCol>
                <IonCol size="12"></IonCol>
            </IonRow>
            <IonRow>
                {!getForenameView &&
                    <IonCol onClick={()=>{setForenameView(!getForenameView)}} size="12" className="cool-professional ion-padding">{getForename}</IonCol>
                }
                {getForenameView &&
                    <IonCol size="12">
                        <TextToInputSave
                            placeholder_text="Edit Forename"
                            text=""
                            result={(e:any)=>{
                                setForename(e)
                                setForenameView(!getForenameView)
                            }}
                        />
                    </IonCol>
                }
            </IonRow>
            <IonRow>
                {!getSurnameView &&
                    <IonCol onClick={()=>{setSurnameView(!getSurnameView)}} size="12" className="cool-professional ion-padding">{getSurname}</IonCol>
                }
                {getSurnameView &&
                    <IonCol size="12">
                        <TextToInputSave
                            placeholder_text="Edit Surname"
                            text={""}
                            result={(e:any)=>{
                                setSurname(e)
                                setSurnameView(!getSurnameView)
                            }}
                        />
                    </IonCol>
                }
            </IonRow>
           
                <IonRow>
                    <IonCol size="2" className="ion-padding">
                        <IonIcon icon={businessOutline} className="size-36"></IonIcon>
                    </IonCol>
                    <IonCol size="8" className="size-24 ion-padding">
                        My Shop Details
                    </IonCol>
                </IonRow>
                <IonRow>
                    {(getShopId != 0) &&
                    <div>
                        <IonCol size="3"></IonCol>
                        <IonCol>
                            <IonImg
                                src={image} 
                                alt={"Shop ID"} 
                                onClick={()=>{hideImageControllerView(!hideImageControllerView)}}
                            />
                        </IonCol>
                        <IonCol size="3"></IonCol>
                    </div>
                    }
                </IonRow>
            {!hideImageControllerView &&
            <div>
                <IonRow>
                    {!getShopNameView &&
                        <IonCol onClick={()=>{setShopNameView(!getShopNameView)}} size="12" className="cool-professional ion-padding">{getShopName}</IonCol>
                    }
                    {getShopNameView &&
                        <IonCol size="12">
                            <TextToInputSave
                                placeholder_text="Edit Shop Name"
                                text=""
                                result={(e:any)=>{
                                    setShopName(e)
                                    setShopNameView(!getShopNameView)
                                }}
                            />
                        </IonCol>
                    }
                </IonRow>
                <IonRow>
                    {!getShopTypeView &&
                        <IonCol onClick={()=>{setShopTypeView(!getShopTypeView)}} size="12" className="cool-professional ion-padding">{getShopType}</IonCol>
                    }
                    {getShopTypeView &&
                        <IonCol size="12">
                            <IonItem className="chevron-right">
                                <IonLabel position="stacked">Select Shop Type</IonLabel>
                                <IonSelect ref={ddlShopTypeId} onIonChange={(e)=>{handleChange(e,4)}}>
                                    {getShopTypeOptions}
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    }
                </IonRow>
                <IonRow>
                    {!getCountryView &&
                        <IonCol onClick={()=>{setCountryView(!getCountryView)}} size="12" className="cool-professional ion-padding">{getCountry}</IonCol>
                    }
                    {getCountryView &&
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel position="stacked">Select Your Country</IonLabel>
                                <IonSelect ref={ddlCountryId} onIonChange={(e)=>{handleChange(e,2)}}>
                                    {getCountryOptions}
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    }
                </IonRow>
                <IonRow>
                    {!getCurrencyView &&
                        <IonCol onClick={()=>{setCurrencyView(!getCurrencyView)}} size="12" className="cool-professional ion-padding">{getCurrency}</IonCol>
                    }
                    {getCurrencyView &&
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel position="stacked">Select Base Currency</IonLabel>
                                <IonSelect ref={ddlCurrencyId} onIonChange={(e)=>{handleChange(e,3)}}>
                                    {getCurrencyOptions}
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    }
                </IonRow>
                <IonRow>
                    <IonCol size="2" className="ion-padding">
                        <IonIcon icon={checkmarkCircleOutline} className="size-36"></IonIcon>
                    </IonCol>
                    <IonCol size="8" className="size-24 ion-padding">
                        Compliance 
                    </IonCol>
                </IonRow>
                <IonRow>
                    {!getTaxNoView &&
                        <IonCol onClick={()=>{setTaxNoView(!getTaxNoView)}} size="12" className="cool-professional ion-padding">{getTaxNo}</IonCol>
                    }
                    {getTaxNoView &&
                        <IonCol size="12">
                            <TextToInputSave
                                placeholder_text="Edit Company Tax No."
                                text=""
                                result={(e:any)=>{
                                    setTaxNo(e)
                                    setTaxNoView(!getTaxNoView)
                                }}
                            />
                        </IonCol>
                    }
                </IonRow>
                <IonRow>
                    {!getVATNoView &&
                        <IonCol onClick={()=>{setVATNoView(!getVATNoView)}} size="12" className="cool-professional ion-padding">{getVATNo}</IonCol>
                    }
                    {getVATNoView &&
                        <IonCol size="12">
                            <TextToInputSave
                                placeholder_text="Edit VAT/Sales Tax No."
                                text=""
                                result={(e:any)=>{
                                    setVATNo(e)
                                    setVATNoView(!getVATNoView)
                                }}
                            />
                        </IonCol>
                    }
                </IonRow>
                <IonRow>
                    <IonCol className="">
                        <div onClick={()=>{setUserDetails()}} className="ion-text-hover fresh-natural ion-text-center">
                        <IonRow>
                            <IonCol size='2' >
                                <IonIcon icon={saveOutline} className="size-20"></IonIcon>
                            </IonCol>
                            <IonCol>Save Changes</IonCol>
                        </IonRow>
                        </div>
                    </IonCol>
                </IonRow>
            </div>
            }
            {hideImageControllerView &&
            <IonRow>
                <IonCol>
                    <ImageController
                        state={props.state}
                        barcode={getShopGUID}
                        results={(e:any)=>{
                            if(e != -1){
                                callShopImage()
                                showImageControllerView(false)
                            }else{
                                showImageControllerView(false)
                            }
                        }}
                    />
                </IonCol>
            </IonRow>
            }
            
        </div>
    )
}
export default UserDetails