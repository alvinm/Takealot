import React, { useRef, useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

interface Cord {
  ballA: any;
  ballB: any;
  length: number;
  stiffness: number;
  color: string;
  metadata?: Record<string, any>;
}

const ClickableCord: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedCord, setSelectedCord] = useState<Cord | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvasRef.current!.getContext("2d")!;
    if (!ctx) return;

    const ballA = { x: 120, y: 200, r: 20, color: "steelblue" };
    const ballB = { x: 300, y: 200, r: 20, color: "tomato" };

    const cord: Cord = {
      ballA,
      ballB,
      length: 180,
      stiffness: 0.02,
      color: "gray",
      metadata: { id: "cord1", description: "Flexible cord" },
    };

    let dragging: any = null;

    const getMousePos = (evt: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in evt ? evt.touches[0].clientX : (evt as MouseEvent).clientX;
      const clientY = "touches" in evt ? evt.touches[0].clientY : (evt as MouseEvent).clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handleDown = (evt: MouseEvent | TouchEvent) => {
      const pos = getMousePos(evt);

      // Check balls first
      if (Math.hypot(pos.x - ballA.x, pos.y - ballA.y) < ballA.r) dragging = ballA;
      else if (Math.hypot(pos.x - ballB.x, pos.y - ballB.y) < ballB.r) dragging = ballB;
      // Check if clicked on cord (distance to line)
      else {
        const { ballA, ballB } = cord;
        const dx = ballB.x - ballA.x;
        const dy = ballB.y - ballA.y;
        const length = Math.hypot(dx, dy);
        const t = ((pos.x - ballA.x) * dx + (pos.y - ballA.y) * dy) / (length * length);
        const closestX = ballA.x + t * dx;
        const closestY = ballA.y + t * dy;
        const distance = Math.hypot(pos.x - closestX, pos.y - closestY);
        if (distance < 8) {
          setSelectedCord(cord); // select cord
          console.log("Cord clicked!", cord.metadata);
        } else {
          setSelectedCord(null);
        }
      }
    };

    const handleMove = (evt: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      evt.preventDefault();
      const pos = getMousePos(evt);
      dragging.x = pos.x;
      dragging.y = pos.y;
    };

    const handleUp = () => (dragging = null);

    canvas.addEventListener("mousedown", handleDown);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleUp);
    canvas.addEventListener("touchstart", handleDown);
    canvas.addEventListener("touchmove", handleMove);
    canvas.addEventListener("touchend", handleUp);

    function update() {
      const dx = ballB.x - ballA.x;
      const dy = ballB.y - ballA.y;
      const dist = Math.hypot(dx, dy);
      const diff = dist - cord.length;
      const offsetX = (dx / dist) * diff * cord.stiffness;
      const offsetY = (dy / dist) * diff * cord.stiffness;

      if (dist !== 0) {
        if (dragging !== ballA) {
          ballA.x += offsetX;
          ballA.y += offsetY;
        }
        if (dragging !== ballB) {
          ballB.x -= offsetX;
          ballB.y -= offsetY;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cord
      ctx.beginPath();
      ctx.moveTo(ballA.x, ballA.y);
      ctx.lineTo(ballB.x, ballB.y);
      ctx.lineWidth = selectedCord === cord ? 6 : 4;
      ctx.strokeStyle = cord.color;
      ctx.stroke();

      // Draw balls
      [ballA, ballB].forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.stroke();
      });
    }

    function animate() {
      update();
      draw();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      canvas.removeEventListener("mousedown", handleDown);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleUp);
      canvas.removeEventListener("touchstart", handleDown);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleUp);
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Clickable Cord</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ textAlign: "center" }}>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            style={{
              border: "1px solid #ccc",
              background: "#f9f9f9",
              touchAction: "none",
              marginTop: "20px",
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ClickableCord;
