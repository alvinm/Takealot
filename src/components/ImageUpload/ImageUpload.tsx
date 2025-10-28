import { IonCol, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
interface data{
    hub_key:number,
    department_id:number,
    document_type_id:number,
    reference_id:number,
    value:string,
    description:string,
    week_no:number,
    year:number
    state:[],
    result:(e: any) => void;
}
const ImageUpload: React.FC<data>= (props:any) => {
    const [imageBlob, setImageBlob] = useState<Blob | null>(null);
    const [name, setName]           = useState<any>()

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setName(file?.name)
        if (file) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = () => {
                const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
                setImageBlob(blob);
            };
        }
    };

    const handleUpload = async () => {
        if (!imageBlob) {
            console.error("No image selected");
            return;
        }

        const formData = new FormData();
        formData.append("file", imageBlob, name);
        formData.append("mime_type", (imageBlob.type));
        formData.append("hub_key", props.hub_key);
        formData.append("department_id", props.department_id);
        formData.append("document_type_id", props.document_type_id);
        formData.append("reference_id", props.reference_id);
        formData.append("year", props.year);
        formData.append("week_no", props.week_no);
        formData.append("value", props.value);
        formData.append("description", props.description);
        formData.append("created_by", props.state.user_id);

        console.log("file_name", imageBlob, name);
        console.log("mime_type", (imageBlob.type));
        console.log("hub_key", props.hub_key);
        console.log("department_id", props.department_id);
        console.log("document_type_id", props.document_type_id);
        console.log("reference_id", props.reference_id);
        console.log("year", props.year);
        console.log("week_no", props.week_no);
        console.log("value", props.value);
        console.log("description", props.description);
        console.log("created_by", props.state.user_id);

        await fetch(props.state.secondary_host+"upload_image", {
            method: "POST",
            body: formData,
        });

        console.log("Image uploaded successfully");
        props.result(1)
    };
    useEffect(()=>{

    },[props])
    return (
        <IonRow>
            <IonCol className="size-24">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </IonCol>
            <IonCol>
                <div onClick={handleUpload} className="ion-padding text-container ion-text-center">Upload Image</div>
            </IonCol>
        </IonRow>
    );
};

export default ImageUpload;
