import { IonCol, IonIcon, IonImg, IonInput, IonRow } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react'
import { formatDate, formatDateTime } from '../../GlobalFunctions/Functions';
import { addCircleOutline, arrowBack, pencilSharp, saveOutline } from 'ionicons/icons';

const AdminList = (props:any) =>{
    const [dailySpinner, showDailySpinner]      = useState<any>()

    const [parentList, setParentList]           = useState<any>()
    const [list, setList]                       = useState<any>()

    const [parentId, setParentId]               = useState<any>()
    const [listId, setListId]                   = useState<any>()
    const [listItemValue, setListItemValue]     = useState<any>()


    let txtListItem                             = useRef<any>()
    let txtParentListItem                       = useRef<any>()

    const [selected, setSelected]               = useState<any>(-1)

    const [addParentListItemView, showAddParentListItemView]    = useState<any>()
    const [addListItemView, showAddListItemView]        = useState<any>()
    const [updateListItemView, showUpdateListItemView]      = useState<any>()

    let Controller = new AbortController();
    const setListItem = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=update_list'+
            '&id				    ='+listId+
            '&name                  ='+listItemValue+
            "&updated_by            ="+props.state.user_id
        )
        .then((response) => response.json())
        .then(data =>{
            setListId(0)
            callList()
        })
    }
    const setStatus = (id:any) =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=archive_list'+
            '&id				    ='+id+
            "&archived_by            ="+props.state.user_id
        )
        .then((response) => response.json())
        .then(data =>{
            callList()
        })
    }
    const addParentListItem = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=insert_list'+
            '&parent_id				='+0+
            "&name                  ="+txtParentListItem.current.value+
            "&created_by            ="+props.state.user_id
        )
        .then((response) => response.json())
        .then(data=>{
           callParentList()
        })
    }
    const addListItem = () =>{
        fetch(props.state.secondary_host+'getAdminData?dbo=insert_list'+
            '&parent_id				='+parentId+
            "&name                  ="+txtListItem.current.value+
            "&created_by            ="+props.state.user_id
        )
        .then((response) => response.json())
        .then(data=>{
           callList()
        })
    }
    const callParentList = () =>{
        // Abort any ongoing request
        Controller.abort();
        showDailySpinner(true)
        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getAdminData?dbo=select_list'+
            '&parent_id				='+-1+
            '&admin=1'
        )
        .then((response) => response.json())
        .then(data=>{
            const lists = data.map((x:any, i:number)=>{
                return(
                    <IonRow key={i}>
                        <IonCol >
                            <div className={parentId==x.id?
                                    "selected-container ion-padding ion-text-center text-hover":
                                    "text-container ion-padding ion-text-center text-hover"
                                } 
                                onClick={()=>{setParentId(x.id)}}
                            >
                                <IonRow>
                                    <IonCol size="1">{x.id}</IonCol>
                                    <IonCol className='ion-text-left'>{x.name}</IonCol>
                                    <IonCol size="2" className='ion-text-right'>({x.children})</IonCol>
                                </IonRow>
                            </div>
                        </IonCol>
                    </IonRow>
                )
            })
            setParentList(lists)
        })
            
    }
    const callList = () =>{
        // Abort any ongoing request
        Controller.abort();
        showDailySpinner(true)
        // Create a new AbortController for this request
        Controller = new AbortController();
        fetch(props.state.secondary_host+'getAdminData?dbo=select_list'+
            '&parent_id				='+parentId+
            '&admin=1'
        )
        .then((response) => response.json())
        .then(data=>{
            /** */
            const lists = data.map((x:any, i:number)=>{
                return(
                    <IonRow key={i} className="size-20">
                        <IonCol>{x.id}</IonCol>
                        <IonCol onClick={()=>{setListId(x.id)}}>{x.name}</IonCol>
                        <IonCol>{(x.created_date)}</IonCol>
                        <IonCol>{(x.created_by)}</IonCol>
                        <IonCol>{(x.updated_date)}</IonCol>
                        <IonCol>{x.updated_by}</IonCol>
                        <IonCol 
                            onClick={()=>{
                                showAddListItemView(true)
                                setListId(x.id)
                            }}
                        >
                            <IonIcon className='size-32' icon={pencilSharp}> </IonIcon>
                        </IonCol>
                        <IonCol
                            onClick={()=>{setStatus(x.id)}}
                        >{x.status == 1?
                            <div className="ion-padding ion-text-center" style={{color:"#fff",backgroundColor:"darkgreen",borderRadius:"30px",height:"56px"}}>
                                Enabled
                            </div>:
                            <div className="ion-padding ion-text-center" style={{color:"#fff",backgroundColor:"darkred",borderRadius:"30px",height:"56px"}}>
                                Archived
                            </div>}</IonCol>
                    </IonRow>
                )
            })
            setList(lists)
        })
    }
    const setView = (v:any) =>{
        switch(v){
            case 1: callParentList();
                    break;
            case 2: callList();
                    break;
        }
    }
    useEffect(()=>{
        if(listId != 0 && listId != undefined){
            showUpdateListItemView(true)
        }else{
            showUpdateListItemView(false)
        }
    },[listId])
    useEffect(()=>{
    if(parentId != undefined)
        setView(2)
    },[parentId])
    useEffect(()=>{
        setView(1)
    },[props])
    return(
        <div>
            <IonRow>
                <IonCol></IonCol>
                <IonCol size="1">
                    <div className="text-container ion-padding ion-text-center size-24" onClick={()=>{
                        props.result(0)
                    }}>
                        <IonIcon icon={arrowBack} className="size-28"></IonIcon>&nbsp;
                        Back
                    </div>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol 
                    size="3" 
                    className="size-20 ion-text-bold ion-padding"
                    style={{borderRight:"3px solid #0070C0",height:"80vh"}}
                >
                    <IonRow 
                        style={{borderBottom:"1px solid #ddd"}}
                        className="size-20 ion-text-bold">
                        <IonCol size="9">
                            {addParentListItemView &&
                                <IonRow>
                                    <IonCol size="8" className="ion-padding">
                                        <IonInput ref={txtParentListItem} placeholder='Add list Item'></IonInput>
                                    </IonCol>
                                    <IonCol 
                                        size="4"
                                        onClick={()=>{addParentListItem()}}
                                    >
                                        <IonRow className="ion-padding ion-text-center text-hover" style={{color:"#fff",backgroundColor:"#aaa",borderRadius:"30px",height:"56px"}}>
                                            <IonCol size="3"><IonIcon icon={saveOutline} className="size-24"></IonIcon></IonCol>
                                            <IonCol>SAVE</IonCol>
                                        </IonRow>
                                    </IonCol>
                                </IonRow>
                            }
                        </IonCol>
                        <IonCol className="ion-text-center">
                            <IonRow
                                onClick={()=>{showAddParentListItemView(!addParentListItemView)}}
                            >
                                <IonCol >
                                    <IonRow className="ion-padding ion-text-center text-hover" style={{color:"#fff",backgroundColor:"#aaa",borderRadius:"30px",height:"56px"}}>
                                        <IonCol size="3"><IonIcon icon={addCircleOutline} className="size-24"></IonIcon></IonCol>
                                        <IonCol>ADD</IonCol>
                                    </IonRow>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow
                        className="ion-padding"
                    >
                        <IonCol>Parent List</IonCol>
                    </IonRow>
                    {parentList}
                </IonCol>
                <IonCol className="size-20 ion-padding">
                    <IonRow 
                        className="size-20 ion-text-bold"
                        style={{borderBottom:"1px solid #ddd"}}
                    >
                        <IonCol size="11">
                            {addListItemView &&
                                <IonRow>
                                    <IonCol 
                                        size="3"
                                       
                                    >
                                        <IonRow>
                                            <IonCol
                                                className="ion-padding"
                                                style={{border:"1px solid #ccc",borderRadius:"30px",height:"56px"}}
                                            >
                                                <IonInput 
                                                    onIonChange={(e)=>{setListItemValue(e.target.value)}}
                                                    ref={txtListItem} 
                                                    placeholder='Add list Item'></IonInput>
                                            </IonCol>
                                        </IonRow>
                                    </IonCol>
                                    {!updateListItemView &&
                                    <IonCol 
                                        size="2"
                                        onClick={()=>{addListItem()}}
                                    >
                                        <IonRow className="ion-padding ion-text-center text-hover" style={{color:"#fff",backgroundColor:"#aaa",borderRadius:"30px",height:"56px"}}>
                                            <IonCol size="3"><IonIcon icon={saveOutline} className="size-24"></IonIcon></IonCol>
                                            <IonCol>SAVE</IonCol>
                                        </IonRow>
                                    </IonCol>
                                    }
                                    {updateListItemView &&
                                    <IonCol 
                                        size="2"
                                        onClick={()=>{setListItem()}}
                                    >
                                        <IonRow className="ion-padding ion-text-center text-hover" style={{color:"#fff",backgroundColor:"#aaa",borderRadius:"30px",height:"56px"}}>
                                            <IonCol size="3"><IonIcon icon={saveOutline} className="size-24"></IonIcon></IonCol>
                                            <IonCol>UPDATE</IonCol>
                                        </IonRow>
                                    </IonCol>
                                    }
                                </IonRow>
                            }
                        </IonCol>
                        <IonCol className="ion-text-center">
                            <IonRow onClick={()=>{showAddListItemView(!addListItemView);setListId(0)}}>
                                <IonCol>
                                    <IonRow className="ion-padding ion-text-center text-hover" style={{color:"#fff",backgroundColor:"#aaa",borderRadius:"30px",height:"56px"}}>
                                        <IonCol size="3"><IonIcon icon={addCircleOutline} className="size-24"></IonIcon></IonCol>
                                        <IonCol>ADD</IonCol>
                                    </IonRow>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    
                    <IonRow className="size-20 ion-text-bold">
                        <IonCol>ID</IonCol>
                        <IonCol>NAME</IonCol>
                        <IonCol>CREATED DATE</IonCol>
                        <IonCol>CREATED BY</IonCol>
                        <IonCol>UPDATED DATE</IonCol>
                        <IonCol>UPDATED BY</IonCol>
                        <IonCol>ALTER</IonCol>
                        <IonCol className="ion-text-center">STATUS</IonCol>
                    </IonRow>
                    {list}
                </IonCol>
            </IonRow>
        </div>
    )
}
export default AdminList