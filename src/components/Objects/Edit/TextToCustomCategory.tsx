import { IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect } from '@ionic/react'
import { addCircle, closeCircle } from 'ionicons/icons'
import React, { useEffect, useRef, useState } from 'react'

const TextToCustomCategory = (props:any) =>{
    let Controller = new AbortController();
    const [getViewText, setViewText]            = useState<any>(true)
    const [getCategory, setCategory]            = useState<any>()

    const txtGeneral                            = useRef<any>()
    const callCategory = () =>{
        // Abort any ongoing request
        Controller.abort();

        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getData?dbo=select_category'+
            "&parent_id=0",
        )
        .then((response) => response.json())
        .then(data=>{
            var option:any = data.map((x:any, i:number)=>{
                return(
                    <IonCol key={i} className='ion-padding' size="12">
                        <div className='text-container ion-padding'>
                            {x.category}
                        </div>
                    </IonCol>
                )
            })
            
        }) 
    }
    const callSubCategory = (id:any) =>{
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
                    <IonCol key={i}>
                        <div className='text-container ion-padding'>
                            {x.category}
                        </div>
                    </IonCol>
                )
            })
            
        })
    }
    useEffect(()=>{
        callCategory()
    },[props])
    return(
        <div>
            {getViewText &&
                <IonRow>
                    <IonCol>
                        <div 
                            className="text-container ion-padding"
                            onClick={()=>{props.result()}}
                        >
                            {props.text}
                        </div>
                    </IonCol>
                </IonRow>
            }
            {!getViewText &&
            <div 
                style={{
                        position:"absolute",
                        top:"5%",
                        left:"20%",
                        width:"60%",
                        height:"80%",
                        zIndex:"9999",
                        backgroundColor:"black"
                    }}
            >
                <IonRow>
                    <IonCol> 
                        <IonRow className='ion-padding'>
                            {getCategory}
                        </IonRow>
                    </IonCol>
                </IonRow>
            </div>
            }
        </div>
    )
}
export default TextToCustomCategory