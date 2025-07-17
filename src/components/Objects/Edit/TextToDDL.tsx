import { IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect } from '@ionic/react'
import { addCircle, closeCircle, closeOutline, pencilOutline } from 'ionicons/icons'
import React, { useRef, useState } from 'react'

const TextToDDL = (props:any) =>{
    const [getViewText, setViewText]        = useState<any>(true)
    const ddlGeneral                        = useRef<any>()
    const txtAddField                       = useRef<any>()
    const [hideAddField, showAddField]      = useState<any>(true)

    return(
        <div>
            {hideAddField &&
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
                            <IonItem>
                                <IonLabel>Select Option</IonLabel>
                                <IonSelect 
                                    ref={ddlGeneral}
                                    onIonChange={(e)=>{
                                        props.result(e.detail.value)
                                        
                                    }}
                                >
                                    {props.options}
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                        <IonCol size="1">
                            <IonIcon 
                                icon={addCircle} 
                                className="size-32 ion-text-hover"
                                onClick={()=>{
                                    showAddField(!hideAddField)
                                }}
                            ></IonIcon>
                        </IonCol> 
                        <IonCol size="1">
                            <IonCol>
                                <IonIcon 
                                    icon={closeCircle} 
                                    className='size-32 ion-text-hover'
                                    onClick={()=>{setViewText(!getViewText)}}
                                ></IonIcon>
                            </IonCol>
                        </IonCol>
                    </IonRow>
                }
            </div>
            }
            {!hideAddField &&
            <IonRow>
                <IonCol size="11">
                    <IonInput 
                        ref={txtAddField}
                        className="text-container ion-padding"
                        placeholder='Add Subcategory'
                    >
                    </IonInput>
                </IonCol>
                <IonCol>
                    <IonIcon 
                        icon={addCircle} 
                        className='size-32 ion-text-hover'
                        onClick={()=>{props.add_result()}}
                    ></IonIcon>
                </IonCol>
            </IonRow>
            }
        </div>
    )
}
export default TextToDDL