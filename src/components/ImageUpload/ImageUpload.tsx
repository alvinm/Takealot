import React, { useState } from "react";

const ImageUpload = (props:any) => {
    const [imageBlob, setImageBlob] = useState<Blob | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
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
        formData.append("file", imageBlob, "image.jpg");
        formData.append("barcode_id", props.barcode);

        await fetch(props.state.secondary_host+"upload", {
            method: "POST",
            body: formData,
        });

        console.log("Image uploaded successfully");
        props.result(1)
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <br/><br/>
            <div onClick={handleUpload} className="ion-padding text-container">Upload Image</div>
        </div>
    );
};

export default ImageUpload;
