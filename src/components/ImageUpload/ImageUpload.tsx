import { IonCol, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";

const ImageUpload = (props:any) => {
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
        formData.append("status_id", props.status_id);
        formData.append("year", props.year);
        formData.append("week_no", props.week_no);
        formData.append("value", props.value);
        formData.append("media_name", props.media_name);
        formData.append("created_by", props.created_by);

        await fetch(props.state.secondary_host+"upload_advert", {
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
