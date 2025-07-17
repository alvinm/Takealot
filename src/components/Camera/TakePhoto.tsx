import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const TakePhoto = async (barcode_id:any) => {
  try {
    const photo:any = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    console.log(photo.webPath); // Preview Image Path

    // Convert to Blob
    const imageResponse = await fetch(photo.webPath);
    const imageBlob = await imageResponse.blob();

    // Generate a unique filename (Example: BC1709876543210_20250308.jpg)
    const filename = `${barcode_id}_${Date.now()}.jpg`;

    // Send image with filename and barcode_id
    await sendImageAsVarbinary(imageBlob, barcode_id, filename);
  } catch (error) {
    console.error("Error taking photo:", error);
  }
};

export const sendImageAsVarbinary = async (imageBlob:any, barcode_id:any, filename:any) => {
  try {
    const formData = new FormData();

    // Append the image file with a dynamic name
    formData.append('file', imageBlob, filename);

    // Append barcode ID
    formData.append('barcode_id', barcode_id);

    // Send data to server
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const result = await response.json();
    console.log('Image uploaded successfully:', result);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};
