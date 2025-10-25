"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrame: number;
    let time = 0;

    const drawScene = () => {
      time += 0.01;

      // Background - garage
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#2a2a3a");
      gradient.addColorStop(1, "#1a1a2a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Garage floor
      ctx.fillStyle = "#3a3a4a";
      ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);

      // Floor grid lines
      ctx.strokeStyle = "#4a4a5a";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, canvas.height * 0.7);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      // Overhead light
      const lightX = canvas.width * 0.5;
      const lightY = canvas.height * 0.15;
      const lightGradient = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, 200);
      lightGradient.addColorStop(0, "rgba(255, 255, 200, 0.3)");
      lightGradient.addColorStop(1, "rgba(255, 255, 200, 0)");
      ctx.fillStyle = lightGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.7);

      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.55;

      // Honda 350cc bike
      drawBike(ctx, centerX - 150, centerY, time);

      // Character - anime style inspired by DBZ
      drawCharacter(ctx, centerX + 80, centerY - 50, time);

      // Bucket
      drawBucket(ctx, centerX + 200, centerY + 80);

      // Shampoo spray bottle
      drawSprayBottle(ctx, centerX + 230, centerY + 60);

      // Water droplets on bike
      drawWaterDroplets(ctx, centerX - 150, centerY, time);

      // Sparkles for shine effect
      drawSparkles(ctx, centerX - 150, centerY, time);

      animationFrame = requestAnimationFrame(drawScene);
    };

    const drawBike = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number) => {
      ctx.save();

      // Bike body - main tank
      ctx.fillStyle = "#c41e3a";
      ctx.beginPath();
      ctx.ellipse(x + 80, y - 20, 60, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#8b0000";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Shine on tank
      ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.sin(time * 2) * 0.2})`;
      ctx.beginPath();
      ctx.ellipse(x + 90, y - 25, 20, 10, -0.3, 0, Math.PI * 2);
      ctx.fill();

      // Seat
      ctx.fillStyle = "#2a2a2a";
      ctx.beginPath();
      ctx.ellipse(x + 130, y - 15, 40, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Engine block
      ctx.fillStyle = "#4a4a4a";
      ctx.fillRect(x + 50, y + 10, 70, 40);
      ctx.strokeStyle = "#2a2a2a";
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 50, y + 10, 70, 40);

      // Chrome details
      ctx.fillStyle = "#d0d0d0";
      ctx.fillRect(x + 55, y + 15, 10, 30);
      ctx.fillRect(x + 105, y + 15, 10, 30);

      // Front wheel
      drawWheel(ctx, x + 20, y + 60, 35);

      // Rear wheel
      drawWheel(ctx, x + 160, y + 60, 35);

      // Front fork
      ctx.strokeStyle = "#808080";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(x + 40, y - 10);
      ctx.lineTo(x + 20, y + 60);
      ctx.stroke();

      // Rear suspension
      ctx.beginPath();
      ctx.moveTo(x + 140, y + 5);
      ctx.lineTo(x + 160, y + 60);
      ctx.stroke();

      // Handlebar
      ctx.strokeStyle = "#606060";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x + 10, y - 15);
      ctx.lineTo(x + 50, y - 15);
      ctx.stroke();

      // Exhaust pipe
      ctx.strokeStyle = "#909090";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(x + 70, y + 45);
      ctx.lineTo(x + 150, y + 50);
      ctx.stroke();

      ctx.restore();
    };

    const drawWheel = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
      // Tire
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Rim
      ctx.fillStyle = "#c0c0c0";
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Spokes
      ctx.strokeStyle = "#888888";
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * radius * 0.6, y + Math.sin(angle) * radius * 0.6);
        ctx.stroke();
      }

      // Center hub
      ctx.fillStyle = "#606060";
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawCharacter = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number) => {
      ctx.save();

      const wipeOffset = Math.sin(time * 3) * 8;

      // Legs
      ctx.fillStyle = "#2a4a8a";
      ctx.fillRect(x - 15, y + 80, 12, 50);
      ctx.fillRect(x + 5, y + 80, 12, 50);

      // Shoes
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(x - 15, y + 125, 15, 8);
      ctx.fillRect(x + 5, y + 125, 15, 8);

      // Body/torso
      ctx.fillStyle = "#ff8c00";
      ctx.fillRect(x - 20, y + 40, 42, 45);

      // Gi/training outfit details (DBZ style)
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 20, y + 45);
      ctx.lineTo(x + 22, y + 55);
      ctx.stroke();

      // Belt
      ctx.fillStyle = "#1a3a6a";
      ctx.fillRect(x - 22, y + 77, 46, 8);

      // Right arm (holding cloth)
      ctx.fillStyle = "#ffdbac";
      ctx.fillRect(x - 35, y + 45, 10, 35);

      // Left arm
      ctx.fillRect(x + 27, y + 45, 10, 35);

      // Right hand with microfiber cloth
      ctx.fillStyle = "#ffdbac";
      ctx.beginPath();
      ctx.arc(x - 30 + wipeOffset, y + 85 + wipeOffset, 8, 0, Math.PI * 2);
      ctx.fill();

      // Microfiber cloth (blue)
      ctx.fillStyle = "#4a9eff";
      ctx.beginPath();
      ctx.moveTo(x - 40 + wipeOffset, y + 80 + wipeOffset);
      ctx.lineTo(x - 25 + wipeOffset, y + 75 + wipeOffset);
      ctx.lineTo(x - 20 + wipeOffset, y + 90 + wipeOffset);
      ctx.lineTo(x - 35 + wipeOffset, y + 95 + wipeOffset);
      ctx.closePath();
      ctx.fill();

      // Left hand
      ctx.fillStyle = "#ffdbac";
      ctx.beginPath();
      ctx.arc(x + 32, y + 85, 8, 0, Math.PI * 2);
      ctx.fill();

      // Neck
      ctx.fillStyle = "#ffdbac";
      ctx.fillRect(x - 5, y + 35, 12, 10);

      // Head
      ctx.beginPath();
      ctx.arc(x + 1, y + 20, 22, 0, Math.PI * 2);
      ctx.fill();

      // Hair (spiky DBZ style)
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      // Center spike
      ctx.moveTo(x + 1, y);
      ctx.lineTo(x - 8, y - 15);
      ctx.lineTo(x + 1, y - 8);
      ctx.lineTo(x + 10, y - 15);
      ctx.closePath();
      ctx.fill();

      // Left spikes
      ctx.beginPath();
      ctx.moveTo(x - 15, y + 5);
      ctx.lineTo(x - 25, y - 5);
      ctx.lineTo(x - 15, y + 10);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x - 12, y + 8);
      ctx.lineTo(x - 22, y + 5);
      ctx.lineTo(x - 10, y + 12);
      ctx.closePath();
      ctx.fill();

      // Right spikes
      ctx.beginPath();
      ctx.moveTo(x + 17, y + 5);
      ctx.lineTo(x + 27, y - 5);
      ctx.lineTo(x + 17, y + 10);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x + 14, y + 8);
      ctx.lineTo(x + 24, y + 5);
      ctx.lineTo(x + 12, y + 12);
      ctx.closePath();
      ctx.fill();

      // Eyes (determined expression)
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.arc(x - 7, y + 18, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 9, y + 18, 3, 0, Math.PI * 2);
      ctx.fill();

      // Eyebrows (serious expression)
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 12, y + 12);
      ctx.lineTo(x - 3, y + 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 4, y + 14);
      ctx.lineTo(x + 13, y + 12);
      ctx.stroke();

      // Mouth (concentrated)
      ctx.beginPath();
      ctx.arc(x + 1, y + 27, 6, 0, Math.PI);
      ctx.stroke();

      ctx.restore();
    };

    const drawBucket = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      // Bucket body
      ctx.fillStyle = "#ff6b6b";
      ctx.beginPath();
      ctx.moveTo(x - 20, y);
      ctx.lineTo(x - 15, y + 30);
      ctx.lineTo(x + 15, y + 30);
      ctx.lineTo(x + 20, y);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#cc5555";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Water in bucket
      ctx.fillStyle = "rgba(100, 180, 255, 0.6)";
      ctx.beginPath();
      ctx.ellipse(x, y + 5, 18, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Handle
      ctx.strokeStyle = "#888888";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, 20, Math.PI, 0);
      ctx.stroke();
    };

    const drawSprayBottle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      // Bottle body
      ctx.fillStyle = "#4a90e2";
      ctx.fillRect(x - 8, y, 16, 35);
      ctx.strokeStyle = "#3a70b2";
      ctx.lineWidth = 1;
      ctx.strokeRect(x - 8, y, 16, 35);

      // Cap/nozzle
      ctx.fillStyle = "#ff6b6b";
      ctx.fillRect(x - 6, y - 8, 12, 8);

      // Trigger
      ctx.fillStyle = "#ff6b6b";
      ctx.beginPath();
      ctx.moveTo(x - 6, y - 3);
      ctx.lineTo(x - 12, y + 5);
      ctx.lineTo(x - 8, y + 8);
      ctx.lineTo(x - 4, y);
      ctx.closePath();
      ctx.fill();

      // Label
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x - 6, y + 10, 12, 10);
      ctx.fillStyle = "#2a2a2a";
      ctx.font = "6px Arial";
      ctx.fillText("SOAP", x - 5, y + 17);
    };

    const drawWaterDroplets = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number) => {
      const droplets = [
        { x: x + 60, y: y - 10, delay: 0 },
        { x: x + 80, y: y, delay: 0.5 },
        { x: x + 100, y: y - 15, delay: 1 },
        { x: x + 45, y: y + 5, delay: 1.5 },
        { x: x + 120, y: y - 5, delay: 2 },
      ];

      droplets.forEach((droplet) => {
        const dropTime = (time * 2 + droplet.delay) % 3;
        if (dropTime < 1) {
          const dropY = droplet.y + dropTime * 30;
          const opacity = 1 - dropTime;

          ctx.fillStyle = `rgba(100, 180, 255, ${opacity * 0.7})`;
          ctx.beginPath();
          ctx.ellipse(droplet.x, dropY, 3, 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const drawSparkles = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number) => {
      const sparkles = [
        { x: x + 70, y: y - 25, delay: 0, size: 3 },
        { x: x + 95, y: y - 30, delay: 0.3, size: 4 },
        { x: x + 110, y: y - 20, delay: 0.6, size: 3 },
        { x: x + 55, y: y - 15, delay: 0.9, size: 2 },
        { x: x + 130, y: y - 10, delay: 1.2, size: 3 },
      ];

      sparkles.forEach((sparkle) => {
        const sparkleTime = (time * 2 + sparkle.delay) % 2;
        const opacity = Math.sin(sparkleTime * Math.PI) * 0.8;

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(sparkle.x, sparkle.y - sparkle.size);
        ctx.lineTo(sparkle.x + sparkle.size * 0.3, sparkle.y - sparkle.size * 0.3);
        ctx.lineTo(sparkle.x + sparkle.size, sparkle.y);
        ctx.lineTo(sparkle.x + sparkle.size * 0.3, sparkle.y + sparkle.size * 0.3);
        ctx.lineTo(sparkle.x, sparkle.y + sparkle.size);
        ctx.lineTo(sparkle.x - sparkle.size * 0.3, sparkle.y + sparkle.size * 0.3);
        ctx.lineTo(sparkle.x - sparkle.size, sparkle.y);
        ctx.lineTo(sparkle.x - sparkle.size * 0.3, sparkle.y - sparkle.size * 0.3);
        ctx.closePath();
        ctx.fill();
      });
    };

    drawScene();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main className="w-screen h-screen bg-gray-900">
      <canvas
        ref={canvasRef}
        className="block"
        style={{ display: "block" }}
      />
    </main>
  );
}
