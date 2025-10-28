import React from "react";
import { IonGrid, IonRow, IonCol, IonText, IonBadge } from "@ionic/react";

interface DayRAGRowProps {
  weekData: ("R" | "A" | "G"| "N")[];
  showLabels?: boolean;
}

const DayRAGRow: React.FC<DayRAGRowProps> = ({ weekData, showLabels = false }) => {
  const colorMap: Record<string, string> = {
    R: "#e74c3c", // Red
    A: "#f1c40f", // Amber
    G: "#0070C0", // Green
    N: "#ddd"
  };

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  console.log(weekData)
  return (
        <IonRow style={{height: "85px"}}>
            <IonCol className="ion-text-center">
                {weekData.map((status:any, i:number) => (
                <div
                    className="ion-text-right"
                    key={i}
                    //size="auto"
                    style={{
                    float:"left",
                    width: "75px",
                    height: "75px",
                    backgroundColor: colorMap[status.status],
                    borderRadius: "4px",
                    margin: "4px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    transition: "transform 0.2s",
                    cursor: "pointer",
                    }}
                    onClick={() => console.log(`Day ${i + 1}: ${status}`)}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    <div style={{position:"relative",right:"5px", top:"5px", fontSize:"12px"}}>{status.day}</div>
                </div>
                ))}
            </IonCol>
        </IonRow>
  );
};

export default DayRAGRow;
