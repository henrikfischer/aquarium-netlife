"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type BubbleProps = {
  count: number;
  isNightMode: boolean;
  speed?: number; // Multiplier for bubble speed
};

type Bubble = {
  id: number;
  size: number;
  x: number;
  y: number;
  speed: number;
  delay: number;
};

const Bubbles = ({ count, isNightMode, speed = 1 }: BubbleProps) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Create initial bubbles
    const initialBubbles = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 20 + 10, // 10-30px bubbles
      x: Math.random() * 100,
      y: 100 + Math.random() * 30, // Start below the container
      speed: (Math.random() * 1 + 0.5) * speed, // Scale by speed prop
      delay: Math.random() * 15, // Random start delay
    }));
    
    setBubbles(initialBubbles);
    
    // Animation interval
    const interval = setInterval(() => {
      setBubbles(prevBubbles => 
        prevBubbles.map(bubble => {
          // If bubble is delayed, reduce delay first
          if (bubble.delay > 0) {
            return { ...bubble, delay: bubble.delay - 0.1 };
          }
          
          // Move bubble upward
          let newY = bubble.y - bubble.speed;
          
          // Reset bubble when it reaches the top
          if (newY < -20) {
            return {
              ...bubble,
              y: 100 + Math.random() * 20,
              x: Math.random() * 100,
              size: Math.random() * 20 + 10,
              speed: (Math.random() * 1 + 0.5) * speed,
            };
          }
          
          // Add slight horizontal wobble
          const wobble = Math.sin(Date.now() / 2000 + bubble.id) * 0.3;
          
          return {
            ...bubble,
            y: newY,
            x: bubble.x + wobble,
          };
        })
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={cn(
            "absolute rounded-full",
            isNightMode ? "bg-blue-400/30" : "bg-white/40"
          )}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            opacity: bubble.delay > 0 ? 0 : 0.7,
            boxShadow: `0 0 ${bubble.size / 2}px rgba(255, 255, 255, 0.3)`,
            transition: 'opacity 0.3s',
          }}
        />
      ))}
    </>
  );
};

export default Bubbles;