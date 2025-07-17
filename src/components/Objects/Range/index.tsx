import React, { useState } from "react";
import { IonRange, IonRow, IonCol } from "@ionic/react";
import "./DistanceSlider.css";

interface DistanceSliderProps {
    minDistance: number; // Minimum selectable distance in km
    maxDistance: number; // Maximum selectable distance in km
    onChange: (distance: number) => void; // Callback for selected distance
}

const DistanceSlider: React.FC<DistanceSliderProps> = ({ minDistance, maxDistance, onChange }) => {
  // State for the selected distance
    const [distance, setDistance] = useState(50); // Default to mid-range

    // Handle range movement with smoother updates
    const handleDistanceChange = (e: CustomEvent) => {
        requestAnimationFrame(() => {
        const newDistance = e.detail.value as number;
        setDistance(newDistance);
        onChange(newDistance);
        });
    };

    return (
        <IonRow className="distance-slider-container ion-padding">
            <IonCol size="3" className="ion-text-center distance-text-container ion-padding">
                <strong>{distance}km</strong>
            </IonCol>
            <IonCol className="ion-text-center ion-padding">
                <IonRange
                    min={minDistance}
                    max={maxDistance}
                    step={0.1} // Allow finer movement
                    value={distance}
                    debounce={0} // Remove debounce for immediate response
                    snaps={false} // Allow smooth movement
                    pin={true} // Show value above the knob
                    onIonInput={handleDistanceChange} // Update UI smoothly
                    onIonChange={handleDistanceChange} // Ensure final update on change
                    className="custom-slider"
                />
            </IonCol>
        </IonRow>
    );
};

export default DistanceSlider;
