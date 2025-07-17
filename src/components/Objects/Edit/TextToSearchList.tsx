import { IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect } from '@ionic/react'
import { addCircle, closeCircle } from 'ionicons/icons'
import React, { useRef, useState } from 'react'

const TextToSearchList = (props:any) =>{
    const [getViewText, setViewText]        = useState<any>(true)
    const txtGeneral                        = useRef<any>()
    return(
        <div>
            {getViewText &&
                <IonRow>
                    <IonCol>
                        <div 
                            className="text-container ion-padding"
                            onClick={()=>{setViewText(!getViewText)}}
                        >
                            {props.text}
                        </div>
                    </IonCol>
                </IonRow>
            }
            {!getViewText &&
                <IonRow>
                    <IonCol>
                        <IonInput 
                            ref={txtGeneral} 
                            placeholder={props.placeholder+' '+ props.text}
                            value={props.text}
                            onKeyUp={(e)=>{props.result(e.currentTarget.value)}}
                            ></IonInput>
                    </IonCol>
                    <IonCol size="1">
                        <IonIcon 
                            icon={closeCircle} 
                            className='size-32 ion-text-hover'
                            onClick={()=>{setViewText(!getViewText)}}
                        ></IonIcon>
                    </IonCol>
                </IonRow>
            }
        </div>
    )
}
export default TextToSearchList