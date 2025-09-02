import React, { useState, useEffect } from "react";
import { IonRange, IonRow, IonCol } from "@ionic/react";
import './DateSlider.css'

interface DateSliderProps {
  minDate: Date; // Minimum selectable date
  maxDate: Date; // Maximum selectable date
  onChange: (range: { startDate: string; endDate: string }) => void; // Callback for selected range
}

const DateSlider: React.FC<DateSliderProps> = ({ minDate, maxDate, onChange },props:any) => {
  const isInitialized = React.useRef(false);

  // Get the beginning of two months prior
  const getStartOfTwoMonthsAgo = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() - 3, 1); // First day of two months ago
  };

  // Convert dates to timestamps for IonRange
  const minTimestamp = minDate.getTime();
  const maxTimestamp = maxDate.getTime();
  const startOfTwoMonthsAgoTimestamp = getStartOfTwoMonthsAgo().getTime();

  // State for the selected date range
  const [dateRange, setDateRange] = useState({ start: startOfTwoMonthsAgoTimestamp, end: maxTimestamp });
  const [tempRange, setTempRange] = useState({ start: startOfTwoMonthsAgoTimestamp, end: maxTimestamp });

  // Function to format timestamp as "YYYY-MM-DD"
  const formatDate = (timestamp: number) => new Date(timestamp).toISOString().split("T")[0];

  // Handle range movement (but do not trigger onChange yet)
  const handleTempRangeChange = (e: CustomEvent) => {
    const { lower, upper } = e.detail.value as { lower: number; upper: number };
    setTempRange({ start: lower, end: upper });
  };

  // Only trigger onChange when slider is released
  const handleRangeFinalized = (e: CustomEvent) => {
    const { lower, upper } = e.detail.value as { lower: number; upper: number };
    setDateRange({ start: lower, end: upper });
    setTempRange({start: lower, end: upper});
    // Pass selected dates to parent component only after release
    onChange({ startDate: formatDate(lower), endDate: formatDate(upper) });
  };

  //if date range is set then temp date range should change to that value
  //useEffect (()=>{
  //  setTempRange({start: dateRange.start, end: dateRange.end})
  //},[dateRange])

  // Initialize the selected range when props change
  useEffect(() => {
    // Only initialize once
    if (!isInitialized.current) {
      setDateRange({ start: startOfTwoMonthsAgoTimestamp, end: maxTimestamp });
      setTempRange({ start: startOfTwoMonthsAgoTimestamp, end: maxTimestamp });
      isInitialized.current = true;
    }
  }, [startOfTwoMonthsAgoTimestamp, maxTimestamp]);
  useEffect(()=>{
    /** */
  },[props])
  return (
    <IonRow className="date-slider-container">
      <IonCol size="2" className="ion-text-center date-text-container ion-padding">
        Start Date<br/>
        <strong>{formatDate(tempRange.start)}</strong>
      </IonCol>

      <IonCol className="ion-text-center ion-padding">
        <IonRange
          dualKnobs
          min={minTimestamp}
          max={maxTimestamp}
          step={86400000} // Step by 1 day (in milliseconds)
          value={{ lower: tempRange.start, upper: tempRange.end }}
          onIonInput={handleTempRangeChange} // Updates UI but does not trigger onChange
          onIonChange={handleRangeFinalized} // Triggers onChange when slider is released
          className="custom-slider"
        />
      </IonCol>

      <IonCol size="2" className="ion-text-center date-text-container ion-padding">
        End Date<br/>
        <strong>{formatDate(tempRange.end)}</strong>
      </IonCol>
    </IonRow>
  );
};

export default DateSlider;
