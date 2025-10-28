import React, { useRef, useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

interface Column {
  name: string;
  dataType: string;
  width: number;
  height: number;
  offsetY: number;
}

interface TableContainer {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  columns: Column[];
}

interface Cord {
  leftIndex: number;
  rightIndex: number;
  color: string;
  metadata: { columnName: string };
}

const getCordColor = (type1: string, type2: string): string => {
  if (type1 === type2) return "black";
  const similarTypes: Record<string, string[]> = {
    INT: ["BIGINT", "SMALLINT"],
    BIGINT: ["INT", "SMALLINT"],
    VARCHAR: ["TEXT", "CHAR"],
    TEXT: ["VARCHAR", "CHAR"],
    DATE: ["DATETIME", "TIMESTAMP"],
  };
  if (similarTypes[type1]?.includes(type2) || similarTypes[type2]?.includes(type1)) return "orange";
  return "red";
};

const leftTable: TableContainer = {
  x: 80,
  y: 120,
  width: 180,
  height: 250,
  name: "Users",
  columns: [
    { name: "id", dataType: "INT", width: 160, height: 40, offsetY: 10 },
    { name: "name", dataType: "VARCHAR", width: 160, height: 40, offsetY: 60 },
    { name: "email", dataType: "VARCHAR", width: 160, height: 40, offsetY: 110 },
    { name: "created_at", dataType: "DATETIME", width: 160, height: 40, offsetY: 160 },
  ],
};

const rightTable: TableContainer = {
  x: 500,
  y: 160,
  width: 180,
  height: 250,
  name: "Accounts",
  columns: [
    { name: "id", dataType: "BIGINT", width: 160, height: 40, offsetY: 10 },
    { name: "full_name", dataType: "TEXT", width: 160, height: 40, offsetY: 60 },
    { name: "email", dataType: "VARCHAR", width: 160, height: 40, offsetY: 110 },
    { name: "signup_date", dataType: "DATE", width: 160, height: 40, offsetY: 160 },
  ],
};

const TableMatchingCords: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [left, setLeft] = useState(leftTable);
  const [right, setRight] = useState(rightTable);
  const [dragging, setDragging] = useState<"left" | "right" | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const cords: Cord[] = left.columns
    .map((col, i) => {
      const rightIndex = right.columns.findIndex(r => r.name === col.name);
      if (rightIndex !== -1) {
        const color = getCordColor(col.dataType, right.columns[rightIndex].dataType);
        return { leftIndex: i, rightIndex, color, metadata: { columnName: col.name } };
      }
      return null;
    })
    .filter((c): c is Cord => c !== null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handleDown = (e: MouseEvent | TouchEvent) => {
      const pos = getPos(e);
      if (
        pos.x >= left.x &&
        pos.x <= left.x + left.width &&
        pos.y >= left.y &&
        pos.y <= left.y + left.height
      ) {
        setDragging("left");
      } else if (
        pos.x >= right.x &&
        pos.x <= right.x + right.width &&
        pos.y >= right.y &&
        pos.y <= right.y + right.height
      ) {
        setDragging("right");
      }
      setStartPos(pos);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      const pos = getPos(e);
      const dx = pos.x - startPos.x;
      const dy = pos.y - startPos.y;

      if (dragging === "left") setLeft(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
      if (dragging === "right") setRight(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));

      setStartPos(pos);
    };

    const handleUp = () => setDragging(null);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // cords
      cords.forEach(cord => {
        const leftCol = left.columns[cord.leftIndex];
        const rightCol = right.columns[cord.rightIndex];

        const startX = left.x + leftCol.width + 10;
        const startY = left.y + leftCol.offsetY + leftCol.height / 2;

        const endX = right.x - 10;
        const endY = right.y + rightCol.offsetY + rightCol.height / 2;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        const midX = (startX + endX) / 2;
        ctx.quadraticCurveTo(midX, startY + 40, endX, endY);
        ctx.strokeStyle = cord.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // dots on both ends
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(startX, startY, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(endX, endY, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // tables
      [left, right].forEach(table => {
        ctx.fillStyle = "#f6f6f6";
        ctx.fillRect(table.x, table.y, table.width, table.height);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(table.x, table.y, table.width, table.height);

        table.columns.forEach(col => {
          const colY = table.y + col.offsetY;
          ctx.fillStyle = "#fff";
          ctx.fillRect(table.x + 10, colY, col.width, col.height);
          ctx.strokeStyle = "#444";
          ctx.strokeRect(table.x + 10, colY, col.width, col.height);
          ctx.fillStyle = "#000";
          ctx.font = "13px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`${col.name} (${col.dataType})`, table.x + 10 + col.width / 2, colY + col.height / 2);
        });
      });
    };

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };
    animate();

    canvas.addEventListener("mousedown", handleDown);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleUp);
    canvas.addEventListener("touchstart", handleDown);
    canvas.addEventListener("touchmove", handleMove);
    canvas.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", handleDown);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleUp);
      canvas.removeEventListener("touchstart", handleDown);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleUp);
    };
  }, [left, right, dragging, startPos]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Table Matching (Freely Movable)</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <canvas
          ref={canvasRef}
          width={1000}
          height={600}
          style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }}
        />
      </IonContent>
    </IonPage>
  );
};

export default TableMatchingCords;
