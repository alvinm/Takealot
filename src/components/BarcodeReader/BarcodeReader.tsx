import React, { useState } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { IonButton, IonText, IonContent } from "@ionic/react";

const NativeScanner = (props:any) => {
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  const startScan = async () => {
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (!status.granted) {
      alert("Camera permission not granted");
      return;
    }

    await BarcodeScanner.hideBackground(); // makes background transparent
    document.body.classList.add("scanner-active");

    const result = await BarcodeScanner.startScan(); // Start scanning

    document.body.classList.remove("scanner-active");
    BarcodeScanner.showBackground(); // Restore background

    if (result.hasContent) {
      setScannedCode(result.content);
      props.result(result.content)
    }
  };

  return (
    <div style={{width:"100%",height:"100%"}}>
      <IonButton expand="block" onClick={startScan}>
        Scan Barcode
      </IonButton>

      {scannedCode && (
        <IonText>
          <p>Scanned Code: {scannedCode}</p>
        </IonText>
      )}
    </div>
  );
};

export default NativeScanner;
